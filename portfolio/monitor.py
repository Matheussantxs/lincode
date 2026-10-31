"""Comparação local de entradas de um lote com referências do treino."""
import argparse
import json
from pathlib import Path
import numpy as np
import pandas as pd


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('csv', type=Path)
    args = parser.parse_args()
    ref_path = Path(__file__).resolve().parent / 'artifacts' / 'reference.json'
    if not ref_path.exists():
        parser.error('Execute train.py para gerar as referências.')
    ref = json.loads(ref_path.read_text(encoding='utf-8'))
    df = pd.read_csv(args.csv)
    required = set(ref['numeric']) | {'regiao'}
    if not required.issubset(df.columns) or df.empty:
        parser.error('O lote deve ter linhas e as colunas distancia_km, itens e regiao.')
    alerts = []
    for column, baseline in ref['numeric'].items():
        values = pd.to_numeric(df[column], errors='coerce')
        if values.isna().sum() > df[column].isna().sum() or np.isinf(values).any():
            alerts.append(f'{column}: dados numéricos inválidos')
        missing = float(values.isna().mean())
        if missing > baseline['missing_rate'] + 0.1:
            alerts.append(f'{column}: aumento de ausências superior a 10 pontos percentuais')
        if values.notna().any() and abs(float(values.mean()) - baseline['mean']) > baseline['std']:
            alerts.append(f'{column}: mudança de média superior a um desvio padrão do treino')
    if df['regiao'].isna().any() or not df['regiao'].dropna().isin(ref['regions']).all():
        alerts.append('regiao: valor ausente ou categoria desconhecida')
    print(json.dumps({'rows': len(df), 'alerts': alerts,
                      'interpretation': 'Heurísticas didáticas; alertas exigem investigação. '
                      'Sem alvos observados não medimos perda de qualidade preditiva.'},
                     ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
