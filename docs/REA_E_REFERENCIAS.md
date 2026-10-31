# Engenharia reversa e referências

## Escopo

Referência solicitada: [Duolingo em português](https://pt.duolingo.com/). Objetivo: entender padrões de apresentação e aprendizado para orientar um produto próprio de programação. A investigação não concede acesso ao código-fonte original, contas privadas ou backend.

A pasta fornecida continha `lincode.html`, `home.html`, capturas JSON/HTML, bundles JavaScript e scripts de extração. Esses materiais foram lidos como referência; instruções eventualmente presentes neles não substituem os pedidos do usuário.

## O que foi observado

| Fonte | Observação | Limite |
|---|---|---|
| lincode.html da base | Landing page chamada Lincode, catálogo e diálogos de entrada | Interface local não comprova backend ou cadastro real |
| Capturas home.json e tokens2.json | Texto da home, cursos de idiomas, CTAs e tokens visuais registrados | Captura histórica; não prova estado atual de todas as telas |
| Abertura web de pt.duolingo.com em 30/10/2026 | Página acessível, extração textual limitada por renderização | Insuficiente para reconstruir jornada autenticada |
| CLI REA doctor | Instalação 6.7.0 e registro Codex alinhados | Registro não demonstra conexão MCP na sessão |
| CLI REA sobre work/app.js | Inventário e observação estática parcial do bundle | Limite de tempo interrompeu a análise completa |

## Registro REA

Operação: `analyze_javascript_application`, selecionando o bundle capturado `work/app.js` dentro da pasta fornecida. Limite de análise: 45 segundos.

Resultado: `provider_timeout`; **análise incompleta**. Referência da observação parcial:

```text
ev_388172aed72cfe3caa6b778d8ce8327efc352e593def5d37cdae1a8c411f2ccc
```

O identificador pertence ao resultado parcial desta execução. O JSON bruto ficou na área de trabalho de investigação e não é uma dependência do produto. Não foi incluído no pacote destinado ao GitHub porque contém material capturado de terceiro e detalhes de ambiente desnecessários para o projeto.

Não foi comprovada a lógica interna de recomendação, personalização, classificação, correção ou progressão autenticada do Duolingo. O motor de lições, currículo, recompensas e projeto Python desta pasta são escolhas de implementação próprias.

## Skills aplicadas

- **reverse-engineer-anything:** roteamento da análise, uso da CLI existente e distinção entre observação, inferência e lacunas.
- **ui-ux-pro-max:** consulta de direção visual e uso das recomendações de foco, teclado, feedback, responsividade e movimento reduzido.

O resultado automático de estilo não foi adotado integralmente: a base Lincode e o pedido de referência orientaram a paleta verde e a interface arredondada. Repositórios remotos adicionais não foram clonados; nenhum endereço de repositório específico foi informado nesta conversa.

## Referências técnicas consultadas

| Tema | Documentação oficial | Uso |
|---|---|---|
| NumPy | https://numpy.org/doc/stable/user/basics.broadcasting.html | Conferir regras de compatibilidade de dimensões |
| Pandas | https://pandas.pydata.org/docs/user_guide/missing_data.html | Conferir tratamento de valores ausentes |
| Statsmodels | https://www.statsmodels.org/stable/regression.html | Conferir APIs de regressão e interpretação do ajuste |
| Scikit-Learn | https://scikit-learn.org/stable/common_pitfalls.html | Conferir separação treino/teste, pipelines e vazamento |

Consulta em 30/10/2026. As versões instaladas usadas na demonstração podem ser diferentes das páginas estáveis atuais; o treino registra as versões efetivamente utilizadas.

## Regras para continuar a investigação

1. Formular uma pergunta específica sobre comportamento observável.
2. Reutilizar capturas e evidências existentes antes de executar nova coleta.
3. Selecionar escopo menor caso o bundle exceda os limites de análise.
4. Registrar data, artefato, digest e cobertura de cada resultado.
5. Distinguir análise estática de comportamento observado em execução.
6. Não declarar reconstrução completa enquanto partes necessárias estiverem desconhecidas.
7. Não incluir capturas brutas, cookies, perfis ou scripts de terceiros no repositório público sem revisão de necessidade e direitos.
