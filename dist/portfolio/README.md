# Projeto de portfólio: previsão de tempo de entrega

Capítulo 11 da trilha de Python. Demonstração local com dados **inteiramente sintéticos**. O objetivo é mostrar um processo reproduzível de Data Science; as métricas não representam uma aplicação real.

## Executar

No terminal, nesta pasta, com Python e as dependências disponíveis:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python train.py
python predict.py --distancia 10 --itens 3 --regiao centro
python monitor.py artifacts/dados_sinteticos.csv
```

O treino gera `artifacts/`: dados, pipeline, referências de entrada, relatório estatístico e métricas com versões e hash do dataset. `requirements.txt` declara faixas compatíveis; use as versões de `metrics.json` para reproduzir o ambiente efetivamente testado. Carregue somente artefatos joblib produzidos por você, pois esse formato pode executar código durante a desserialização.

## Etapas e entregáveis

1. **Pergunta:** estimar minutos de entrega a partir de distância, quantidade de itens e região, disponíveis antes da entrega.
2. **Dados:** geração NumPy com semente fixa; tabela Pandas com ausências simuladas. Documentar unidades e limites.
3. **Exploração:** avaliar distribuição, ausências e agregações por região. Não tratar falta de informação como zero automaticamente.
4. **Estatística:** OLS no treino, casos completos, com erros padrão HC3. A omissão de região limita a interpretação. Associações não demonstram causalidade.
5. **Machine Learning:** separar treino/teste; imputação, escala e codificação dentro da Pipeline; selecionar Ridge por validação cruzada somente no treino.
6. **Avaliação:** comparar MAE em minutos e R² no teste com um baseline de mediana. O teste não escolhe hiperparâmetros. Para dados temporais ou agrupados, redesenhar a separação.
7. **Entrega:** script de inferência valida o domínio das entradas; salvar modelo, versões, métricas e procedência dos dados.
8. **MLOps local:** monitorar ausências e mudanças de média/categorias em lotes. Os limites são heurísticos para aprendizado, sem serviço ou monitoramento contínuo implantado.

## Model card para completar

- Uso pretendido: demonstração educacional, sem decisões operacionais.
- Origem: dados sintéticos gerados por `create_data`, semente 42.
- População e domínio: distância 1–30 km, 1–9 itens, regiões centro/bairro fictícias.
- Métricas: ver `artifacts/metrics.json` após executar o treino.
- Limitações: processo gerador simplificado, sem trânsito real, clima, sazonalidade ou validação externa.
- Monitoramento: alertas iniciam investigação; medir MAE com alvos reais quando disponíveis. Definir critérios e janela de avaliação antes de retreinar.
- Publicação: apresentar resultados e limitações em um README, incluir gráficos e permitir reproduzir o treino. Não publicar dados pessoais.

## Critérios de conclusão

- Reproduzir o treino e explicar o baseline.
- Demonstrar que imputação e escala são aprendidas só no treino.
- Interpretar MAE e as limitações do OLS.
- Fazer uma previsão válida e rejeitar entradas fora do domínio.
- Rodar uma comparação de lote e explicar por que um alerta não prova perda de desempenho.
- Registrar hipóteses, limitações e próximos experimentos na model card.

Referências: [NumPy](https://numpy.org/doc/stable/user/basics.broadcasting.html), [Pandas](https://pandas.pydata.org/docs/user_guide/missing_data.html), [Statsmodels](https://www.statsmodels.org/stable/regression.html), [Scikit-Learn](https://scikit-learn.org/stable/common_pitfalls.html).
