'use strict';
// Atividades extras das lições legadas de Estatística, NumPy, Pandas, Statsmodels e ML/MLOps (Python).
(() => {
  let serial = 0;
  const q = (prompt, correct, wrong, explanation, code) => {
    const options = [correct, ...wrong];
    const answer = serial++ % options.length;
    for (let i = 0; i < answer; i++) options.unshift(options.pop());
    return { type: 'choice', prompt, options, answer, explanation, code };
  };
  const t = (prompt, accepted, explanation, code) => ({
    type: 'text',
    prompt,
    accepted: Array.isArray(accepted) ? accepted : [accepted],
    explanation,
    code
  });
  const g = (prompt, accepted, explanation, code) => ({ ...t(prompt, accepted, explanation, code), type: 'gap' });
  const o = (prompt, steps, explanation) => ({
    type: 'order',
    prompt,
    options: [...steps].reverse(),
    answer: steps.map((_, i) => steps.length - i - 1),
    explanation
  });
  const p = (prompt, pairs, explanation) => ({ type: 'pairs', prompt, pairs, explanation });

  window.LINCODE_EXTRA = window.LINCODE_EXTRA || {};
  window.LINCODE_EXTRA.python = Object.assign(window.LINCODE_EXTRA.python || {}, {
    'py-estatistica': [
      t(
        'Ordene os valores [12, 4, 8, 6] e informe a mediana.',
        ['7', '7.0', '7,0'],
        'Ordenando a lista obtemos [4, 6, 8, 12]. Com quantidade par de elementos, a mediana é a média dos dois valores centrais: (6 + 8) / 2 = 7.'
      ),
      q(
        'Nos tempos de entrega [20, 22, 24, 94], a média é 40 e a mediana é 23. Por que os dois resumos diferem tanto?',
        'O valor extremo 94 puxa a média para cima, enquanto a mediana depende só dos valores centrais',
        [
          'A mediana sempre soma apenas o menor e o maior valor da sequência',
          'A média descarta automaticamente números muito próximos entre si'
        ],
        'A soma é 160 e a média 160 / 4 = 40 incorpora o extremo 94; já a mediana usa apenas os dois elementos centrais: (22 + 24) / 2 = 23.'
      ),
      g(
        'Complete o cálculo da média aritmética em Python com a função que informa a quantidade de itens da lista.',
        ['len'],
        'len(notas) retorna 3, permitindo dividir a soma 24 pelo total de observações para obter 8.0.',
        'notas = [6, 8, 10]\nmedia = sum(notas) / ____(notas)\nprint(media)'
      ),
      q(
        'A turma A teve notas [7, 7, 7, 7] e a turma B teve [4, 6, 8, 10]. O que é correto afirmar sobre centro e dispersão?',
        'As duas turmas têm média 7, mas a turma A tem desvio padrão zero e a turma B tem dispersão maior',
        [
          'A turma B tem média maior porque alcançou a nota máxima 10',
          'Duas sequências com mesma média possuem obrigatoriamente o mesmo desvio padrão'
        ],
        'Ambas somam 28 em 4 notas (média 7). Na turma A todos os desvios em relação a 7 valem 0; na turma B os desvios são -3, -1, +1 e +3.'
      ),
      o(
        'Ordene os passos para calcular o desvio padrão de uma coleção numérica.',
        [
          'Calcular a média aritmética dos valores',
          'Subtrair a média de cada valor para obter os desvios',
          'Elevar os desvios ao quadrado e calcular a variância',
          'Extrair a raiz quadrada da variância'
        ],
        'Os desvios partem da média; o quadrado impede que desvios positivos e negativos se cancelem na variância, e a raiz devolve a unidade original.'
      ),
      p(
        'Associe cada medida descritiva ao que ela resume nos dados.',
        [
          ['Média aritmética', 'Soma de todos os valores dividida pela quantidade'],
          ['Mediana', 'Valor central que divide a sequência ordenada ao meio'],
          ['Desvio padrão', 'Dispersão típica em torno da média, na mesma unidade dos dados'],
          ['Amplitude (máximo − mínimo)', 'Distância total entre os dois extremos observados']
        ],
        'Média e mediana resumem o centro com diferentes sensibilidades a extremos; desvio padrão e amplitude descrevem o espalhamento.'
      )
    ],

    'numpy-vetores': [
      q(
        'Diferente da concatenação de listas comuns em Python, qual resultado c = a + b produz em ndarrays?',
        'array([3, 7, 11])',
        ['array([2, 4, 6, 1, 3, 5])', '21'],
        'Em ndarrays de mesmo shape (3,), o operador + soma elemento a elemento: [2+1, 4+3, 6+5] = [3, 7, 11].',
        'import numpy as np\na = np.array([2, 4, 6])\nb = np.array([1, 3, 5])\nc = a + b'
      ),
      t(
        'Qual número inteiro é exibido pelo produto escalar entre precos e quantidades?',
        ['62'],
        'Para vetores 1D de mesmo tamanho, @ soma os produtos posição a posição: 10×3 + 5×4 + 2×6 = 30 + 20 + 12 = 62.',
        'import numpy as np\nprecos = np.array([10, 5, 2])\nquantidades = np.array([3, 4, 6])\nprint(precos @ quantidades)'
      ),
      g(
        'Complete o atributo do ndarray que retorna a tupla (2, 3) com o tamanho de cada dimensão.',
        ['shape'],
        'O atributo shape informa (2, 3): 2 linhas no eixo 0 e 3 colunas no eixo 1.',
        'import numpy as np\nm = np.array([[1, 2, 3], [4, 5, 6]])\nprint(m.____)'
      ),
      q(
        'Uma matriz A tem shape (4, 3) e uma matriz B tem shape (3, 2). Qual é o shape do produto matricial A @ B?',
        '(4, 2)',
        ['(3, 3)', 'Erro de dimensões incompatíveis'],
        'Em (m, k) @ (k, n), as dimensões internas k = 3 coincidem e o resultado assume as dimensões externas (4, 2).'
      ),
      p(
        'Para x = np.array([[2, 0], [1, 3]]) e y = np.array([[1, 4], [2, 5]]), associe cada expressão ao resultado.',
        [
          ['x * y', '[[2, 0], [2, 15]] (multiplicação posição a posição)'],
          ['x @ y', '[[2, 8], [7, 19]] (produto matricial linha por coluna)'],
          ['x.ndim', '2 (quantidade de eixos do array)'],
          ['x.size', '4 (quantidade total de elementos)']
        ],
        'Em x @ y, a linha [1, 3] combinada às colunas [1, 2] e [4, 5] gera 1×1+3×2 = 7 e 1×4+3×5 = 19; já x * y apenas multiplica pares de mesma posição.'
      ),
      o(
        'Ordene os passos para calcular a receita líquida total de itens com operações vetoriais no NumPy.',
        [
          'Converter preços, descontos e quantidades em ndarrays de mesmo shape',
          'Subtrair vetorialmente o vetor de descontos do vetor de preços',
          'Aplicar o operador @ entre preços líquidos e quantidades',
          'Conferir o escalar resultante com a receita líquida total'
        ],
        'A subtração vetorial ajusta cada preço unitário sem laços explícitos, e @ multiplica pelas quantidades somando o total em uma única operação.'
      )
    ],

    'numpy-indexacao': [
      t(
        'Como fatias básicas no NumPy retornam uma view, qual número é impresso por print(a[1])?',
        ['99'],
        'fatia = a[1:3] compartilha o mesmo bloco de memória de a nas posições 1 e 2; alterar fatia[0] modifica diretamente a[1] para 99.',
        'import numpy as np\na = np.array([10, 20, 30, 40])\nfatia = a[1:3]\nfatia[0] = 99\nprint(a[1])'
      ),
      g(
        'Complete o método para criar um array independente a partir da fatia, preservando base sem alterações.',
        ['copy'],
        'copy() duplica os dados fatiados em nova memória, impedindo que independente[0] = 0 afete base[0].',
        'import numpy as np\nbase = np.array([5, 10, 15, 20])\nindependente = base[:2].____()\nindependente[0] = 0'
      ),
      q(
        'Quais valores e formato compõem sub = m[:2, 1:] na matriz 3×3 abaixo?',
        '[[20, 30], [50, 60]], com shape (2, 2)',
        [
          '[[10, 20], [40, 50]], com shape (2, 2)',
          '[[50, 60], [80, 90]], com shape (2, 2)'
        ],
        'O corte :2 seleciona as linhas 0 e 1, enquanto 1: seleciona as colunas a partir do índice 1 (colunas 1 e 2).',
        'import numpy as np\nm = np.array([[10, 20, 30],\n              [40, 50, 60],\n              [70, 80, 90]])\nsub = m[:2, 1:]'
      ),
      q(
        'Qual expressão filtra corretamente os valores de um ndarray v situados entre 10 e 20, inclusive?',
        'v[(v >= 10) & (v <= 20)]',
        ['v[v >= 10 and v <= 20]', 'v[v >= 10 & v <= 20]'],
        'Máscaras booleanas exigem o operador elemento a elemento & e parênteses em cada comparação, pois & tem precedência maior que >= e <=.'
      ),
      p(
        'Para m = np.array([[2, 4, 6], [8, 10, 12]]), associe cada seleção ao retorno correspondente.',
        [
          ['m[0, -1]', 'Escalar 6 (primeira linha, última coluna)'],
          ['m[:, 1]', 'Vetor [4, 10] (segunda coluna completa)'],
          ['m[1, :2]', 'Vetor [8, 10] (dois primeiros itens da segunda linha)'],
          ['m[m % 4 == 0]', 'Vetor 1D [4, 8, 12] filtrado pela máscara booleana']
        ],
        'Índices negativos contam a partir do final, : percorre todo o eixo, :2 para antes do índice 2 e a indexação booleana achata os itens selecionados em 1D.'
      ),
      o(
        'Ordene os passos para recortar uma submatriz, zerar seus números negativos e manter a matriz original intacta.',
        [
          'Selecionar o intervalo de linhas e colunas desejado na matriz original',
          'Chamar .copy() sobre a fatia para desvincular a memória da view',
          'Construir uma máscara booleana identificando valores menores que zero na cópia',
          'Atribuir 0 às posições verdadeiras da máscara na cópia'
        ],
        'Copiar antes de atribuir via máscara garante que a limpeza local não sobrescreva os elementos da matriz de origem.'
      )
    ],

    'numpy-broadcasting': [
      q(
        'O que acontece ao avaliar M + v quando M tem shape (2, 3) e v tem shape (2,)?',
        'Ocorre ValueError, pois alinhando pela direita a dimensão 3 de M é incompatível com 2 de v',
        [
          'v é somado a cada coluna de M e o resultado tem shape (2, 3)',
          'A última coluna de M é descartada e o resultado tem shape (2, 2)'
        ],
        'O broadcasting compara dimensões da direita para a esquerda: (2, 3) com (2,) confronta 3 e 2 no último eixo. Para somar por linha, v precisa ter shape (2, 1).'
      ),
      t(
        'Quantos elementos no total possui o array grade resultante da soma entre shapes (4, 1) e (1, 3)?',
        ['12'],
        'Comparando pela direita: 1 com 3 resulta em 3, e 4 com 1 resulta em 4. O shape final é (4, 3), totalizando 4 × 3 = 12 elementos.',
        'import numpy as np\ncol = np.array([[10], [20], [30], [40]])\nlin = np.array([[1, 2, 3]])\ngrade = col + lin\nprint(grade.size)'
      ),
      g(
        'Complete o argumento axis para somar os valores ao longo das colunas de cada linha, gerando array([60, 150]).',
        ['1'],
        'axis=1 colapsa o eixo das colunas dentro de cada linha: 10 + 20 + 30 = 60 e 40 + 50 + 60 = 150.',
        'import numpy as np\nvendas = np.array([[10, 20, 30],\n                   [40, 50, 60]])\npor_linha = vendas.sum(axis=____)'
      ),
      q(
        'Qual será o shape de y após executar x.reshape(3, -1) em um vetor com 12 elementos?',
        '(3, 4)',
        ['(4, 3)', '(3, 12)'],
        'reshape preserva os 12 elementos; o marcador -1 instrui o NumPy a deduzir a dimensão restante (12 ÷ 3 = 4).',
        'import numpy as np\nx = np.arange(12)\ny = x.reshape(3, -1)'
      ),
      p(
        'Considere uma matriz M com shape (3, 4). Associe cada expressão ao shape do resultado.',
        [
          ['M.mean(axis=0)', '(4,) — uma média para cada coluna'],
          ['M.mean(axis=1, keepdims=True)', '(3, 1) — média por linha preservando duas dimensões'],
          ['M - M.mean(axis=0)', '(3, 4) — matriz centralizada pela média de cada coluna'],
          ['M.reshape(2, 6)', '(2, 6) — mesmos 12 elementos reorganizados']
        ],
        'axis=0 reduz as 3 linhas a 4 valores; keepdims=True mantém o eixo reduzido com tamanho 1; (3, 4) − (4,) é válido por broadcasting à direita.'
      ),
      o(
        'Ordene os passos para centralizar cada linha de uma matriz M de shape (3, 4) pela média da própria linha.',
        [
          'Partir da matriz M com shape (3, 4)',
          'Calcular a média por linha reduzindo o eixo 1',
          'Manter ou remodelar o vetor de médias para o shape (3, 1)',
          'Subtrair o array (3, 1) de M (3, 4) via broadcasting'
        ],
        'Um vetor (3,) falharia ao alinhar 3 com 4 pela direita; no formato (3, 1), o eixo de tamanho 1 expande-se sobre as 4 colunas de cada linha.'
      )
    ],

    'pandas-limpeza': [
      t(
        'Qual número inteiro é impresso ao somar a máscara booleana de ausências na coluna preco?',
        ['2'],
        'isna() marca as duas entradas None como True; na soma, True conta como 1 e False como 0, totalizando 2.',
        'import pandas as pd\ndf = pd.DataFrame({"preco": [10.0, None, 25.0, None, 40.0]})\nprint(df["preco"].isna().sum())'
      ),
      q(
        'Em df.dtypes, uma coluna de receita apareceu como texto porque trazia "N/D" em dias sem coleta. Qual tratamento inicial é adequado antes de calcular resumos?',
        'Converter entradas inválidas em ausentes com pd.to_numeric(..., errors="coerce") e avaliar o motivo dos nulos',
        [
          'Trocar todo "N/D" por 0 imediatamente, assumindo faturamento zero nesses dias',
          'Chamar mean() diretamente na coluna textual para o Pandas ignorar "N/D"'
        ],
        'Ausência de registro não equivale a receita zero; converter marcadores textuais em NaN explicita a falta de dado sem distorcer a média para baixo.'
      ),
      g(
        'Complete o método do DataFrame que descarta linhas repetidas pelo identificador pedido_id, mantendo a primeira ocorrência.',
        ['drop_duplicates'],
        'drop_duplicates(subset=["pedido_id"], keep="first") evita que registros duplicados na carga sejam contabilizados duas vezes.',
        'limpo = df.____(subset=["pedido_id"], keep="first")'
      ),
      q(
        'Em um projeto de Machine Learning, por que calcular a mediana de imputação no DataFrame completo antes da divisão treino/teste é incorreto?',
        'Porque estatísticas do conjunto de teste vazam para o pré-processamento do treino',
        [
          'Porque fillna remove automaticamente todas as colunas numéricas',
          'Porque a mediana só pode ser calculada quando não existem valores ausentes'
        ],
        'O teste deve representar dados futuros inéditos; parâmetros de imputação precisam ser estimados exclusivamente no subconjunto de treino.'
      ),
      p(
        'Associe cada comando do Pandas à verificação ou limpeza realizada no DataFrame.',
        [
          ['df.dtypes', 'Inspecionar o tipo de dado armazenado em cada coluna'],
          ['df.isna().sum()', 'Contar valores ausentes coluna por coluna'],
          ['df.duplicated().sum()', 'Contar linhas inteiras repetidas na tabela'],
          ['df["idade"].fillna(mediana_treino)', 'Devolver série com ausências preenchidas por um parâmetro definido']
        ],
        'Diagnosticar tipos, nulos e duplicatas prepara a tabela antes de aplicar qualquer regra justificada de remoção ou imputação.'
      ),
      o(
        'Ordene um fluxo responsável de preparação de tabela com nulos antes de treinar um modelo.',
        [
          'Inspecionar dtypes, duplicatas de carga e contagem de ausentes por coluna',
          'Corrigir tipos mal formatados e eliminar duplicações comprovadamente acidentais',
          'Separar os registros em conjuntos de treino e de teste',
          'Estimar o valor de imputação apenas no treino e aplicá-lo a treino e teste'
        ],
        'Problemas estruturais de leitura e duplicação vêm primeiro, mas qualquer estatística aprendida para preencher ausências só deve usar o treino.'
      )
    ],

    'pandas-transformacao': [
      t(
        'Quantas linhas terá o DataFrame junto após o merge muitos-para-muitos pela chave id = 1?',
        ['6'],
        'A chave id = 1 aparece 2 vezes em a e 3 vezes em b; o merge gera todas as combinações correspondentes: 2 × 3 = 6 linhas.',
        'import pandas as pd\na = pd.DataFrame({"id": [1, 1], "item": ["A", "B"]})\nb = pd.DataFrame({"id": [1, 1, 1], "cupom": ["X", "Y", "Z"]})\njunto = pd.merge(a, b, on="id")\nprint(len(junto))'
      ),
      g(
        'Complete o indexador do Pandas que filtra linhas por condição booleana e seleciona colunas pelos seus nomes.',
        ['loc'],
        'df.loc[condicao, colunas] seleciona simultaneamente as linhas que satisfazem a máscara e a lista explícita de rótulos de coluna.',
        'aprovados = df.____[df["nota"] >= 7, ["aluno", "nota"]]'
      ),
      q(
        'Datas em texto no formato "DD/MM/AAAA" foram ordenadas sem conversão e "02/12/2025" apareceu antes de "15/01/2025". Como corrigir?',
        'Converter a coluna com pd.to_datetime informando o formato dia/mês/ano antes de ordenar ou subtrair datas',
        [
          'Inverter a ordenação textual com ascending=False mantendo o tipo string',
          'Substituir as barras por pontos e dividir a coluna por 365'
        ],
        'Strings são comparadas caractere a caractere ("02" vem antes de "15"); pd.to_datetime cria carimbos temporais que obedecem à cronologia.'
      ),
      q(
        'Você quer cruzar vendas (várias por cliente) com um cadastro de clientes (esperado 1 por cliente), mantendo todas as vendas e falhando se o cadastro tiver chaves duplicadas. Qual chamada usar?',
        'vendas.merge(clientes, on="cliente_id", how="left", validate="many_to_one")',
        [
          'vendas.merge(clientes, on="cliente_id", how="inner", validate="one_to_many")',
          'vendas.merge(clientes, on="cliente_id", how="right", validate="one_to_one")'
        ],
        'how="left" preserva todas as linhas de vendas à esquerda, e validate="many_to_one" exige unicidade de cliente_id na tabela da direita.'
      ),
      p(
        'Associe cada operação de transformação no Pandas ao seu comportamento.',
        [
          ['df.loc[df["preco"] > 0, ["id", "preco"]]', 'Filtra linhas com preço positivo e retém apenas duas colunas pelo nome'],
          ['pd.to_datetime(df["envio"]).dt.dayofweek', 'Converte texto em data-hora e extrai o dia da semana'],
          ['pd.merge(a, b, on="id", how="inner")', 'Mantém apenas chaves presentes nas duas tabelas ao mesmo tempo'],
          ['pd.merge(a, b, on="id", validate="one_to_one")', 'Interrompe com erro se a chave se repetir em qualquer uma das tabelas']
        ],
        'loc explicita filtro e colunas, .dt expõe propriedades de datas e how/validate tornam as regras da junção auditáveis.'
      ),
      o(
        'Ordene os passos para calcular o prazo de entrega em dias e enriquecer a tabela com dados da transportadora sem multiplicar linhas.',
        [
          'Converter as colunas de envio e entrega para datetime com pd.to_datetime',
          'Calcular o prazo subtraindo a data de envio da data de entrega',
          'Conferir se transportadora_id é único na tabela cadastral de transportadoras',
          'Executar o merge com validação de cardinalidade e conferir a contagem final de linhas'
        ],
        'Converter datas viabiliza a aritmética temporal, enquanto validar unicidade da chave e tamanho pós-junção protege contra multiplicação silenciosa.'
      )
    ],

    'pandas-analise': [
      t(
        'Qual número inteiro é impresso para a média de minutos da região "sul"?',
        ['28'],
        'Os registros da região "sul" têm 20, 25 e 39 minutos; a soma é 84 e a média para 3 observações é 84 / 3 = 28.',
        'import pandas as pd\ndf = pd.DataFrame({\n    "regiao": ["sul", "norte", "sul", "sul", "norte"],\n    "minutos": [20, 40, 25, 39, 50]\n})\nmedias = df.groupby("regiao")["minutos"].mean()\nprint(int(medias["sul"]))'
      ),
      g(
        'Complete o método que aplica várias funções de resumo (contagem, média, mediana e desvio) de uma só vez ao agrupamento.',
        ['agg', 'aggregate'],
        'agg (ou aggregate) produz uma tabela comparativa unindo volume, centro e dispersão para cada categoria.',
        'resumo = df.groupby("categoria")["valor"].____(["count", "mean", "median", "std"])'
      ),
      q(
        'No DataFrame abaixo, qual é a diferença entre df.groupby("turma")["nota"].count() e df.groupby("turma")["nota"].size() para a turma A?',
        'count() retorna 2 por descartar o valor ausente, enquanto size() retorna 3 por contar todas as linhas do grupo',
        [
          'Os dois métodos retornam 3, pois ausências são contadas como nota válida',
          'count() devolve a soma 18.0, enquanto size() devolve a média 9.0'
        ],
        'Em agrupamentos do Pandas, count() contabiliza apenas valores não nulos da coluna selecionada, ao passo que size() mede o total de linhas do grupo.',
        'import pandas as pd\ndf = pd.DataFrame({\n    "turma": ["A", "A", "A"],\n    "nota": [8.0, None, 10.0]\n})'
      ),
      q(
        'Em uma análise por filial, a filial X teve venda média de R$ 950 (n = 2) e a filial Y teve média de R$ 220 (n = 1.400, mediana = R$ 215). Qual leitura é mais prudente?',
        'A média da filial X apoia-se em apenas 2 vendas e não basta para concluir desempenho estruturalmente superior ao da filial Y',
        [
          'A filial X é comprovadamente quatro vezes mais eficiente e causa vendas maiores',
          'A filial Y deve ser excluída da análise por apresentar média muito próxima da mediana'
        ],
        'Grupos minúsculos sofrem grandes oscilações com uma única venda alta; avaliar contagem e dispersão junto da média evita conclusões frágeis.'
      ),
      p(
        'Associe cada sinal encontrado em uma tabela agregada por grupo à interpretação exploratória adequada.',
        [
          ['Média bem maior que a mediana no grupo', 'Assimetria à direita ou presença de valores altos extremos'],
          ['Contagem n = 2 em uma categoria', 'Grupo pequeno com estimativa de centro altamente instável'],
          ['Desvio padrão muito superior ao dos outros grupos', 'Maior heterogeneidade interna das observações daquele grupo'],
          ['Diferença expressiva entre size() e count()', 'Proporção relevante de registros com valor ausente no grupo']
        ],
        'Combinar tamanho, média, mediana, desvio padrão e nulos revela distorções que um único indicador resumido ocultaria.'
      ),
      o(
        'Ordene uma comparação exploratória consistente do tempo de atendimento entre canais de suporte.',
        [
          'Agrupar os chamados pela coluna de canal com groupby',
          'Calcular em conjunto contagem, média, mediana e desvio padrão do tempo',
          'Inspecionar canais com amostra pequena ou grande distância entre média e mediana',
          'Registrar achados descritivos e hipóteses sem afirmar causalidade apenas pelo resumo'
        ],
        'Observar volume e variabilidade antes de interpretar protege a análise contra extremos, grupos raros e saltos indevidos para causalidade.'
      )
    ],

    'stats-ols': [
      t(
        'Qual número inteiro é impresso para a soma dos quadrados dos resíduos da reta y_hat = 50 + 10 * x nos dois pontos abaixo?',
        ['25'],
        'Para x1 = 8, a previsão é 130 e o resíduo é 133 − 130 = 3 (quadrado 9). Para x2 = 10, a previsão é 150 e o resíduo é 146 − 150 = −4 (quadrado 16). Logo, 9 + 16 = 25.',
        'x1, y1 = 8, 133\nx2, y2 = 10, 146\nr1 = y1 - (50 + 10 * x1)\nr2 = y2 - (50 + 10 * x2)\nprint(r1 ** 2 + r2 ** 2)'
      ),
      g(
        'Complete o método que estima os coeficientes por mínimos quadrados ordinários e retorna o objeto de resultados.',
        ['fit'],
        'sm.OLS(...) define o modelo; a chamada .fit() realiza a estimação dos parâmetros que minimizam a soma dos quadrados dos resíduos.',
        'import statsmodels.api as sm\nX = sm.add_constant(df[["distancia", "itens"]])\nresultado = sm.OLS(df["minutos"], X).____()\nprint(resultado.params)'
      ),
      q(
        'Na API matricial sm.OLS(y, X), qual é a consequência de esquecer sm.add_constant(X) quando X só contém variáveis preditoras?',
        'O modelo é ajustado sem intercepto (forçado a passar pela origem), o que pode enviesar a inclinação estimada',
        [
          'O Statsmodels adiciona automaticamente uma coluna de 1s como na API de fórmulas',
          'A soma dos quadrados dos resíduos torna-se obrigatoriamente igual a zero'
        ],
        'Na API matricial, o Statsmodels usa apenas as colunas presentes em X; sem a constante, o intercepto fica fixado em zero.'
      ),
      q(
        'Qual é a ordem correta dos dois argumentos principais ao instanciar sm.OLS na API matricial do Statsmodels?',
        'Primeiro a variável resposta y (endog) e depois a matriz de preditores X (exog): sm.OLS(y, X)',
        [
          'Primeiro a matriz X e depois o vetor y: sm.OLS(X, y), igual ao Scikit-Learn',
          'Apenas um DataFrame único com y na última coluna, sem separar alvo e preditores'
        ],
        'Diferente do padrão fit(X, y) do Scikit-Learn, o construtor do Statsmodels segue a convenção sm.OLS(endog, exog), isto é, y antes de X.'
      ),
      p(
        'Em resultado = sm.OLS(y, X).fit(), associe cada elemento ao seu papel no ajuste linear.',
        [
          ['sm.add_constant(X)', 'Adiciona coluna de valor 1 para permitir estimar o intercepto'],
          ['resultado.params', 'Coeficientes estimados para constante e preditores'],
          ['resultado.fittedvalues', 'Valores previstos y_hat para cada linha usada no ajuste'],
          ['resultado.resid', 'Resíduos observados y − y_hat em cada observação']
        ],
        'A matriz X com constante alimenta o ajuste; params guarda os betas estimados, fittedvalues entrega y_hat e resid armazena os erros na amostra.'
      ),
      o(
        'Ordene os passos para ajustar uma regressão linear com intercepto na API matricial do Statsmodels.',
        [
          'Separar a série alvo y e as colunas preditoras da tabela',
          'Acrescentar a coluna constante à matriz de preditores com sm.add_constant',
          'Criar o modelo com sm.OLS(y, X) respeitando a ordem (alvo, preditores) e chamar .fit()',
          'Inspecionar os parâmetros estimados e os resíduos resultantes'
        ],
        'Preparar X com constante e passar (y, X) na ordem esperada garante que intercepto, inclinações e resíduos sejam estimados corretamente.'
      )
    ],

    'stats-inferencia': [
      t(
        'Mantendo itens = 2 fixo na equação ajustada abaixo, qual inteiro é impresso para o aumento previsto quando a distância sobe 4 km?',
        ['10'],
        'Com itens constante, cada quilômetro extra soma 2,5 minutos na previsão do modelo; para +4 km (de 10 para 14), a diferença é 4 × 2,5 = 10 minutos.',
        'def prever_minutos(distancia_km, itens):\n    return 12 + 2.5 * distancia_km + 3 * itens\n\ndiferenca = prever_minutos(14, 2) - prever_minutos(10, 2)\nprint(int(diferenca))'
      ),
      q(
        'No teste bilateral da hipótese nula β = 0 para um preditor, qual é a definição correta do p-valor?',
        'A probabilidade, supondo β = 0 e as premissas do modelo válidas, de observar uma estatística de teste tão ou mais extrema que a obtida',
        [
          'A probabilidade de o parâmetro verdadeiro β valer exatamente zero na população',
          'A porcentagem dos resíduos individuais que caíram dentro de zero desvio padrão'
        ],
        'O p-valor é calculado assumindo que a hipótese nula e as premissas do modelo valem; ele mede surpresa amostral sob esse cenário, não a probabilidade de H₀ ser verdadeira.'
      ),
      g(
        'Complete o método do resultado do Statsmodels que devolve os limites inferior e superior do intervalo de confiança dos coeficientes.',
        ['conf_int'],
        'resultado.conf_int() retorna por padrão os intervalos de confiança de 95% de cada parâmetro estimado.',
        'ic_95 = resultado.____()\nprint(ic_95)'
      ),
      q(
        'O intervalo de confiança de 95% para o coeficiente de distância (em min/km) foi [-0,4; 2,8]. Como interpretar esse resultado?',
        'A estimativa tem incerteza relevante: sob o modelo, os dados são compatíveis tanto com efeito nulo quanto com efeitos entre -0,4 e +2,8 min/km',
        [
          'Fica demonstrado que a distância tem efeito rigorosamente igual a zero sobre o tempo',
          '95% das entregas individuais terão tempo total entre -0,4 e 2,8 minutos'
        ],
        'Como o intervalo inclui 0 e se estende até 2,8, não rejeitamos β = 0 a 5%, mas a amplitude mostra imprecisão amostral — não prova de efeito nulo.'
      ),
      p(
        'Associe cada componente da tabela de inferência à leitura estatística apropriada.',
        [
          ['Coeficiente em regressão múltipla', 'Associação condicional prevista por +1 unidade no preditor, mantendo os demais do modelo constantes'],
          ['Erro padrão do coeficiente', 'Medida da variabilidade amostral da estimativa sob as premissas do modelo'],
          ['Intervalo de confiança de 95%', 'Faixa produzida por um método que cobriria o parâmetro real em 95% das amostras repetidas sob o modelo'],
          ['p-valor baixo com coeficiente minúsculo', 'Sinal estatístico detectável contra β = 0, mas que pode não ter relevância prática']
        ],
        'Ler coeficiente, erro padrão, intervalo e p-valor em conjunto evita confundir precisão amostral com tamanho de efeito ou causalidade.'
      ),
      o(
        'Ordene os passos para interpretar com rigor um coeficiente em um relatório estatístico.',
        [
          'Conferir unidades de medida do alvo, do preditor e quais variáveis estão incluídas no modelo',
          'Avaliar sinal e magnitude prática do coeficiente estimado condicionado aos demais controles',
          'Examinar a precisão da estimativa pelo erro padrão e pela largura do intervalo de confiança',
          'Ler o p-valor sob as premissas adotadas, explicitando que associação condicional não prova causa'
        ],
        'Unidades e magnitude dão sentido substantivo ao número, o intervalo quantifica a incerteza e o cuidado com premissas evita afirmações causais indevidas.'
      )
    ],

    'stats-diagnostico': [
      t(
        'Com soma dos quadrados dos resíduos sq_res = 50 e soma total sq_tot = 200, qual inteiro é impresso para o R² em porcentagem?',
        ['75'],
        'Pela definição R² = 1 − (sq_res / sq_tot) = 1 − (50 / 200) = 0,75, ou seja, 75% da variância amostral do alvo.',
        'sq_res = 50\nsq_tot = 200\nr2_percentual = int((1 - sq_res / sq_tot) * 100)\nprint(r2_percentual)'
      ),
      q(
        'No gráfico de resíduos versus valores ajustados, o espalhamento abre em formato de funil conforme a previsão aumenta. O que isso sugere e qual é o alcance de erros padrão robustos (HC3)?',
        'Sugere heterocedasticidade; HC3 ajusta erros padrão para variância não constante, mas não corrige um modelo mal especificado',
        [
          'Sugere homocedasticidade ideal; HC3 altera os coeficientes para eliminar todos os resíduos',
          'Garante ausência de variáveis omitidas; HC3 assegura R² alto em qualquer amostra futura'
        ],
        'A abertura em cone indica variância do erro dependente do nível previsto. Erros padrão robustos recalibram a inferência para a variância, sem resolver forma funcional incorreta ou omissão relevante.'
      ),
      g(
        'Complete o nome do parâmetro de fit() no Statsmodels usado para estimar erros padrão robustos como "HC3".',
        ['cov_type'],
        'fit(cov_type="HC3") mantém os coeficientes OLS, mas calcula erros padrão, intervalos e p-valores robustos à heterocedasticidade.',
        'resultado = sm.OLS(y, X).fit(____="HC3")'
      ),
      q(
        'Um modelo inclui simultaneamente "área em m²" e "área em pés²" (quase proporcionais). O R² global é alto, mas os dois coeficientes têm erros padrão gigantes. Qual fenômeno explica isso?',
        'Multicolinearidade forte entre preditores redundantes, inflando a incerteza sobre a parcela individual de cada um',
        [
          'Ausência completa de correlação entre área do imóvel e preço observado',
          'Falha aritmética do OLS sempre que o DataFrame possui mais de um preditor'
        ],
        'Colunas quase colineares competem pela mesma variação explicada: a previsão conjunta continua estável, mas separar os coeficientes individuais torna-se instável.'
      ),
      p(
        'Associe cada evidência diagnóstica à limitação correspondente no modelo linear.',
        [
          ['Resíduos desenhando um arco em U contra y_hat', 'Relação não linear ou termo funcional ausente na especificação'],
          ['Variância dos resíduos crescendo em cone', 'Heterocedasticidade nos erros do modelo'],
          ['Resíduos vizinhos no tempo fortemente correlacionados', 'Violação de independência por autocorrelação serial'],
          ['R² de 0,98 obtido com dezenas de colunas ruído em amostra pequena', 'Sobreajuste na amostra sem capacidade real de generalização']
        ],
        'Os diagnósticos distinguem problemas de forma funcional, variância, dependência temporal e ajuste artificial por excesso de parâmetros.'
      ),
      o(
        'Ordene uma rotina de diagnóstico antes de publicar conclusões ou previsões de um modelo linear.',
        [
          'Plotar e inspecionar resíduos contra valores ajustados e contra preditores',
          'Checar se padrões sistemáticos apontam não linearidade ou omissão de variável essencial',
          'Avaliar multicolinearidade, dependência entre observações e heterocedasticidade',
          'Testar o erro preditivo fora da amostra em vez de confiar apenas no R² do ajuste'
        ],
        'Verificar especificação e premissas nos resíduos e depois medir desempenho em dados novos evita confundir bom ajuste aparente com modelo confiável.'
      )
    ],

    'ml-pipeline': [
      t(
        'Com SimpleImputer(strategy="mean") ajustado apenas em X_treino, qual número inteiro substitui o np.nan da segunda linha de X_teste?',
        ['20'],
        'No treino, os valores observados são 10, 20 e 30, com média (10 + 20 + 30) / 3 = 20. O transform no teste reutiliza 20 sem incluir o 100 do teste.',
        'import numpy as np\nfrom sklearn.impute import SimpleImputer\n\nX_treino = np.array([[10.0], [20.0], [np.nan], [30.0]])\nX_teste = np.array([[100.0], [np.nan]])\nimp = SimpleImputer(strategy="mean")\nimp.fit(X_treino)\nprint(int(imp.transform(X_teste)[1, 0]))'
      ),
      g(
        'Complete o método chamado em X_teste para aplicar a escala já aprendida no treino, sem reestimar média e desvio no teste.',
        ['transform'],
        'Em dados de teste usa-se apenas transform(), preservando os parâmetros calculados durante fit_transform(X_treino).',
        'X_treino_esc = scaler.fit_transform(X_treino)\nX_teste_esc = scaler.____(X_teste)'
      ),
      q(
        'Mesmo tendo separado X_teste antes, qual vazamento ainda existe na validação cruzada abaixo?',
        'O StandardScaler foi ajustado nas 5 dobras de X_treino juntas, vazando média e desvio de cada dobra de validação',
        [
          'cross_val_score mistura automaticamente X_teste dentro de y_treino quando cv=5',
          'Ridge falha quando recebe variáveis com média próxima de zero'
        ],
        'Transformar X_treino inteiro fora da Pipeline faz cada rodada de validação usar estatísticas que já viram aquela dobra; o scaler deve entrar na Pipeline.',
        'X_esc = StandardScaler().fit_transform(X_treino)\nnotas = cross_val_score(Ridge(), X_esc, y_treino, cv=5)'
      ),
      q(
        'Sua tabela combina colunas numéricas com nulos e colunas categóricas. Como organizar o pré-processamento e o modelo no Scikit-Learn sem vazamento?',
        'Encapsular um ColumnTransformer (com pipelines numérica e categórica) e o estimador final dentro de uma única Pipeline',
        [
          'Rodar fillna e get_dummies no DataFrame completo antes do train_test_split',
          'Chamar fit() separadamente em uma Pipeline para X_treino e em outra Pipeline para X_teste'
        ],
        'Com ColumnTransformer dentro da Pipeline, imputação, escala e codificação de categorias são ajustadas somente nos dados de treino de cada divisão.'
      ),
      p(
        'Associe cada chamada envolvendo Pipeline no Scikit-Learn ao que ocorre internamente.',
        [
          ['train_test_split(X, y, random_state=42)', 'Isola o conjunto de teste antes de qualquer cálculo de estatísticas'],
          ['pipe.fit(X_treino, y_treino)', 'Executa fit_transform nos transformadores e fit no estimador final'],
          ['pipe.predict(X_teste)', 'Executa apenas transform nos passos iniciais e predict no estimador final'],
          ['cross_val_score(pipe, X_treino, y_treino, cv=5)', 'Reajusta toda a Pipeline apenas nas 4 dobras de treino a cada rodada']
        ],
        'A Pipeline garante simetria entre treino e inferência sem deixar que dobras de validação ou o teste influenciem imputadores e escalas.'
      ),
      o(
        'Ordene o fluxo livre de vazamento para construir e avaliar um modelo com Pipeline.',
        [
          'Dividir os dados brutos em treino e teste antes de qualquer transformação aprendida',
          'Montar a Pipeline encadeando imputação, padronização e estimador',
          'Validar a Pipeline por validação cruzada usando apenas o conjunto de treino',
          'Ajustar a Pipeline final no treino completo e medir o desempenho no teste reservado'
        ],
        'Reservar o teste no início e manter todas as transformações dentro da Pipeline protege tanto a validação cruzada quanto a avaliação final.'
      )
    ],

    'ml-avaliacao': [
      t(
        'Qual número inteiro é impresso para o MAE (erro absoluto médio, em minutos) das quatro entregas abaixo?',
        ['5'],
        'Os erros absolutos são |30−34| = 4, |45−40| = 5, |25−28| = 3 e |50−42| = 8. A soma é 20 e a média é 20 / 4 = 5 minutos.',
        'from sklearn.metrics import mean_absolute_error\n\ny_real = [30, 45, 25, 50]\ny_prev = [34, 40, 28, 42]\nprint(int(mean_absolute_error(y_real, y_prev)))'
      ),
      g(
        'Complete o parâmetro de DummyRegressor que configura o baseline para sempre prever a mediana do alvo de treino.',
        ['strategy'],
        'DummyRegressor(strategy="median") cria um ponto de partida simples e alinhado ao MAE sem usar nenhum preditor.',
        'from sklearn.dummy import DummyRegressor\nbaseline = DummyRegressor(____="median")\nbaseline.fit(X_treino, y_treino)'
      ),
      q(
        'No mesmo conjunto de teste, um baseline de mediana obteve MAE de 6,0 minutos e um modelo complexo obteve MAE de 6,9 minutos. O que concluir?',
        'O modelo complexo teve erro maior que o chute constante da mediana e não agregou ganho preditivo',
        [
          'O modelo complexo é melhor porque MAE mais alto indica maior capacidade explicativa',
          'O resultado do baseline é inválido porque ele não utiliza hiperparâmetros'
        ],
        'Como MAE mede erro absoluto médio na unidade do alvo, 6,9 minutos é pior que 6,0 minutos; sem superar o baseline, a complexidade extra não se justifica.'
      ),
      q(
        'Por que usar divisão aleatória comum em uma série temporal diária ou em dados com várias compras do mesmo cliente pode enganar a avaliação?',
        'Porque treina com dias futuros ao prever o passado ou espalha o mesmo cliente entre treino e validação, inflando o desempenho aparente',
        [
          'Porque divisões aleatórias impedem matematicamente o cálculo do MAE',
          'Porque TimeSeriesSplit e GroupKFold só aceitam tabelas sem variáveis numéricas'
        ],
        'A estratégia de validação precisa refletir o cenário real de uso: corte cronológico para prever o futuro e separação por grupo para generalizar a novos clientes.'
      ),
      p(
        'Associe cada ferramenta de avaliação à finalidade correspondente no Scikit-Learn.',
        [
          ['DummyRegressor(strategy="median")', 'Estabelecer erro de referência prevendo sempre a mediana do treino'],
          ['mean_absolute_error(y_teste, y_prev)', 'Expressar o erro médio na mesma unidade física do alvo'],
          ['TimeSeriesSplit', 'Respeitar a ordem temporal treinando no passado e validando em períodos seguintes'],
          ['GroupKFold', 'Garantir que todas as linhas de um mesmo grupo fiquem juntas na mesma partição']
        ],
        'Escolher métrica interpretável, baseline coerente e esquema de divisão fiel à dependência dos dados sustenta comparações honestas.'
      ),
      o(
        'Ordene o processo de escolha de modelo e avaliação final contra um baseline.',
        [
          'Separar treino e teste respeitando a estrutura temporal ou de grupos dos dados',
          'Ajustar o baseline simples no treino para definir a referência mínima de qualidade',
          'Selecionar algoritmo e hiperparâmetros via validação cruzada apenas no treino',
          'Comparar o modelo escolhido e o baseline uma única vez no conjunto de teste final'
        ],
        'Manter o teste intocado até o encerramento das escolhas evita ajustar hiperparâmetros ao conjunto de avaliação final.'
      )
    ],

    'ml-portfolio': [
      g(
        'Complete o parâmetro de train_test_split que fixa a semente para tornar a separação de dados reproduzível.',
        ['random_state'],
        'Definir random_state=42 permite reproduzir exatamente a mesma divisão entre treino e teste em novas execuções.',
        'X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, ____=42)'
      ),
      t(
        'Quando os tempos reais chegam em produção, mede-se o erro efetivo do modelo. Qual inteiro é impresso para o MAE (em minutos) desse lote?',
        ['9'],
        'Os erros absolutos são |20−29| = 9, |35−44| = 9 e |50−59| = 9; logo o MAE do lote atingiu 9 minutos, acima dos 4 minutos da referência.',
        'from sklearn.metrics import mean_absolute_error\n\n# MAE de referência na validação final: 4 minutos\nreais_lote = [20, 35, 50]\nprevistos_lote = [29, 44, 59]\nprint(int(mean_absolute_error(reais_lote, previstos_lote)))'
      ),
      q(
        'O modelo de entregas foi treinado para distâncias de 1 a 30 km e 1 a 9 itens. Ao receber distancia = -4 km e itens = 0 na inferência, qual deve ser a resposta do sistema?',
        'Rejeitar a requisição na validação de entrada com mensagem clara, antes de executar a previsão',
        [
          'Calcular normalmente a equação linear e devolver o número resultante sem aviso',
          'Substituir silenciosamente o alvo real por zero no histórico de monitoramento'
        ],
        'Validar esquema, tipos e domínio na fronteira evita extrapolação sem sentido físico sobre entradas corrompidas ou fora da faixa suportada.'
      ),
      q(
        'O monitoramento detectou que a proporção de entregas em uma região dobrou na semana, mas os tempos reais de entrega desse lote ainda não foram apurados. O que esse alerta significa?',
        'Indica mudança no perfil das entradas (drift) que pede investigação, mas não comprova perda de MAE sem avaliar os alvos reais',
        [
          'Prova que o modelo perdeu toda a utilidade e obriga a retreinar sem validação',
          'Garante que o MAE caiu pela metade por haver mais pedidos naquela região'
        ],
        'Alertas de distribuição de entrada avisam que o contexto mudou; confirmar queda de qualidade e decidir retreinamento exige métricas com alvos reais e critérios objetivos.'
      ),
      p(
        'Associe cada prática de portfólio e MLOps ao problema concreto que ela previne.',
        [
          ['Model card com escopo, dados sintéticos e limitações', 'Interpretação exagerada das métricas ou aplicação fora do uso pretendido'],
          ['Registro de versões do ambiente e hash do dataset', 'Treino irreproduzível por mudança silenciosa de dados ou bibliotecas'],
          ['Validação de domínio nas entradas do script de predição', 'Previsões absurdas causadas por valores negativos, nulos inesperados ou categorias inválidas'],
          ['Carregar apenas artefatos joblib gerados por fonte confiável', 'Execução de código malicioso durante a desserialização do arquivo de modelo']
        ],
        'Documentação transparente, rastreabilidade, contratos de entrada e segurança de artefatos transformam um experimento em entrega confiável.'
      ),
      o(
        'Ordene o ciclo completo de construção, entrega e acompanhamento de um projeto de Machine Learning para portfólio.',
        [
          'Definir pergunta, domínio das variáveis, semente e versões reproduzíveis do ambiente',
          'Treinar e validar Pipeline contra baseline sem vazamento, registrando métricas e artefatos',
          'Entregar script de inferência com validação de entradas e model card com limitações',
          'Monitorar mudanças nas entradas e o erro em alvos reais antes de decidir retreinar'
        ],
        'Da reprodutibilidade inicial à validação na inferência e ao monitoramento com critérios de retreinamento, cada etapa sustenta a confiabilidade do sistema.'
      )
    ]
  });
})();
