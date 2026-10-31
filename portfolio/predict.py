"""Inferência local com o artefato gerado pelo próprio projeto."""
import argparse
import json
import math
from pathlib import Path
import joblib
import pandas as pd


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--distancia', type=float, required=True)
    parser.add_argument('--itens', type=int, required=True)
    parser.add_argument('--regiao', choices=['centro', 'bairro'], required=True)
    args = parser.parse_args()
    if not math.isfinite(args.distancia) or not 1 <= args.distancia <= 30:
        parser.error('distancia deve estar entre 1 e 30 km, o domínio dos dados de treino.')
    if not 1 <= args.itens <= 9:
        parser.error('itens deve estar entre 1 e 9, o domínio dos dados de treino.')
    target = Path(__file__).resolve().parent / 'artifacts' / 'model.joblib'
    if not target.exists():
        parser.error('Execute python train.py antes da previsão.')
    model = joblib.load(target)
    row = pd.DataFrame([{'distancia_km': args.distancia, 'itens': args.itens, 'regiao': args.regiao}])
    print(json.dumps({'tempo_estimado_minutos': round(float(model.predict(row)[0]), 2),
                      'uso': 'Demonstração com dados sintéticos.'}, ensure_ascii=False))


if __name__ == '__main__':
    main()
