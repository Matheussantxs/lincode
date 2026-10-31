"""Projeto didático: pipeline reproduzível de previsão de tempo de entrega."""
from pathlib import Path
import hashlib
import json
import platform
import joblib
import numpy as np
import pandas as pd
import sklearn
import statsmodels.api as sm
from sklearn.compose import ColumnTransformer
from sklearn.dummy import DummyRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import GridSearchCV, KFold, train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROOT = Path(__file__).resolve().parent
ARTIFACTS = ROOT / 'artifacts'
FEATURES = ['distancia_km', 'itens', 'regiao']
NUMERIC = ['distancia_km', 'itens']


def create_data():
    rng = np.random.default_rng(42)
    size = 500
    distance = rng.uniform(1, 30, size)
    items = rng.integers(1, 10, size)
    region = rng.choice(['centro', 'bairro'], size)
    minutes = 12 + 2.4 * distance + 1.5 * items + (region == 'centro') * 7
    minutes += rng.normal(0, 4, size)
    df = pd.DataFrame({'distancia_km': distance, 'itens': items, 'regiao': region,
                       'tempo_minutos': minutes})
    # Ausências sintéticas apenas em uma entrada; o alvo permanece disponível.
    df.loc[rng.choice(size, 15, replace=False), 'distancia_km'] = np.nan
    return df


def main():
    ARTIFACTS.mkdir(exist_ok=True)
    df = create_data()
    dataset = ARTIFACTS / 'dados_sinteticos.csv'
    df.to_csv(dataset, index=False)
    X_train, X_test, y_train, y_test = train_test_split(
        df[FEATURES], df['tempo_minutos'], test_size=0.2, random_state=42)
    preprocess = ColumnTransformer([
        ('numeric', Pipeline([('imputer', SimpleImputer(strategy='median')),
                              ('scaler', StandardScaler())]), NUMERIC),
        ('category', OneHotEncoder(handle_unknown='ignore'), ['regiao']),
    ])
    pipeline = Pipeline([('preprocess', preprocess), ('model', Ridge())])
    search = GridSearchCV(pipeline, {'model__alpha': [0.1, 1, 10]},
                          scoring='neg_mean_absolute_error',
                          cv=KFold(n_splits=5, shuffle=True, random_state=42), n_jobs=1)
    search.fit(X_train, y_train)
    baseline = DummyRegressor(strategy='median').fit(X_train, y_train)
    predicted = search.predict(X_test)
    metrics = {
        'seed': 42, 'train_rows': len(X_train), 'test_rows': len(X_test),
        'cv_mae_minutes': -search.best_score_,
        'test_mae_minutes': mean_absolute_error(y_test, predicted),
        'baseline_test_mae_minutes': mean_absolute_error(y_test, baseline.predict(X_test)),
        'test_r2': r2_score(y_test, predicted), 'best_params': search.best_params_,
        'dataset_sha256': hashlib.sha256(dataset.read_bytes()).hexdigest(),
        'environment': {'python': platform.python_version(), 'numpy': np.__version__,
                        'pandas': pd.__version__, 'scikit-learn': sklearn.__version__},
        'limitations': ['Dados inteiramente sintéticos.',
                         'Métricas não demonstram desempenho em entregas reais.',
                         'Split aleatório supõe observações independentes.',
                         'Não há implantação nem monitoramento contínuo.'],
    }
    joblib.dump(search.best_estimator_, ARTIFACTS / 'model.joblib')
    (ARTIFACTS / 'metrics.json').write_text(json.dumps(metrics, indent=2, ensure_ascii=False), encoding='utf-8')
    reference = {'numeric': {c: {'mean': float(X_train[c].mean()),
                                'std': float(X_train[c].std()),
                                'missing_rate': float(X_train[c].isna().mean())} for c in NUMERIC},
                 'regions': sorted(X_train['regiao'].unique().tolist())}
    (ARTIFACTS / 'reference.json').write_text(json.dumps(reference, indent=2), encoding='utf-8')
    # Análise exploratória separada: casos completos apenas do treino.
    complete = X_train[NUMERIC].dropna()
    ols = sm.OLS(y_train.loc[complete.index], sm.add_constant(complete)).fit(cov_type='HC3')
    report = ('Análise didática associativa, sem conclusão causal. '
              'Região foi omitida deste modelo exploratório; examine essa limitação.\n\n'
              + ols.summary().as_text())
    (ARTIFACTS / 'statistical_report.txt').write_text(report, encoding='utf-8')
    print(json.dumps(metrics, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
