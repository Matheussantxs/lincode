'use strict';
(() => {
  let serial = 0;
  const q = (prompt, correct, wrong, explanation, code) => {
    const options = [correct, ...wrong];
    const answer = serial++ % options.length;
    for (let i = 0; i < answer; i++) options.unshift(options.pop());
    return { type: 'choice', prompt, options, answer, explanation, ...(code ? { code } : {}) };
  };
  const t = (prompt, accepted, explanation, code) => ({
    type: 'text',
    prompt,
    accepted: Array.isArray(accepted) ? accepted : [accepted],
    explanation,
    ...(code ? { code } : {})
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

  window.PYTHON_CHAPTER_UNITS = window.PYTHON_CHAPTER_UNITS || {};
  window.PYTHON_CHAPTER_UNITS.pandas = Object.assign(window.PYTHON_CHAPTER_UNITS.pandas || {}, {
    1: [
      {
        id: "pandas-u1-l4-series-vs-dataframe-dimensoes",
        title: "Series vs DataFrame: estruturas dimensionais centrais do Pandas",
        subtitle: "Leitura, limpeza e análise · Entendendo a anatomia de 1D vs 2D com índices compartilhados",
        theory: "No Pandas, uma Series é um vetor unidimensional rotulado capaz de armazenar qualquer tipo de dado associado a um índice explícito. Já o DataFrame é uma matriz bidimensional tabular composta por múltiplas Series compartilhando o mesmo índice de linhas, fornecendo a base para manipulação estruturada.",
        questions: [
          q("Qual é a diferença dimensional entre uma Series e um DataFrame no Pandas?", "A Series é unidimensional (1D) com índice; o DataFrame é bidimensional (2D) com linhas e colunas", ["A Series armazena apenas números inteiros","O DataFrame não suporta índices"], "Uma Series representa uma única coluna rotulada; o DataFrame organiza várias colunas em tabela."),
          q("O que acontece ao selecionar uma única coluna de um DataFrame com df[\"idade\"]?", "Retorna um objeto do tipo pandas.Series representando a coluna selecionada", ["Retorna um número escalar","Retorna uma lista pura de Python"], "Extrair uma coluna individual decompõe o DataFrame em uma Series rotulada preservando o índice."),
          q("Como inspecionar as dimensões (quantidade de linhas e colunas) de um DataFrame?", "Acessando o atributo df.shape, que devolve uma tupla no formato (linhas, colunas)", ["Invocando df.dimensions()","Chamando df.len()"], "O atributo shape fornece a contagem de eixos sem realizar cópias adicionais de memória."),
          q("Qual método exibe um resumo estatístico das colunas numéricas de um DataFrame?", "df.describe()", ["df.summary()","df.stats()","df.overview()"], "describe() gera contagem, média, desvio padrão, mínimos, máximos e quartis rapidamente."),
          t("Qual atributo de um DataFrame informa sua dimensionalidade como uma tupla (linhas, colunas)?", ["shape","df.shape"], "shape retorna o tamanho dos eixos do DataFrame.", "tupla_dimensoes = df.____"),
          g("Complete a extração da coluna \"salario\" como um objeto Series.", ["\"salario\""], "Colchetes com o nome da coluna extraem a Series correspondente.", "serie_salarios = df[____]"),
          o("Ordene as etapas para inspecionar a estrutura inicial de um novo DataFrame carregado.", ["Carregar os dados tabulares em uma variável: df = pd.read_csv(\"dados.csv\")","Verificar o número de linhas e colunas com df.shape","Visualizar os primeiros registros usando df.head()","Examinar os tipos de dados e memória com df.info()"], "Inspecionar dimensões e tipos antes de qualquer transformação evita erros de processamento."),
          p("Associe a estrutura do Pandas à sua característica primordial.", [["pandas.Series","Estrutura unidimensional rotulada com índice próprio"],["pandas.DataFrame","Estrutura bidimensional tabular formada por colunas Series"],["df.shape","Tupla com contagem de linhas e colunas (N, M)"],["df.columns","Índice contendo os rótulos de todas as colunas da tabela"]], "Dominar a distinção entre Series e DataFrame é pré-requisito para análise de dados fluente.")
        ]
      },
      {
        id: "pandas-u1-l5-tipos-de-dados-dtypes-e-memoria",
        title: "Tipos de dados internos (dtypes) e pegada de memória",
        subtitle: "Leitura, limpeza e análise · Identificando conversões implícitas e consumo de RAM",
        theory: "O Pandas atribui tipos de dados (dtypes) automáticos a cada coluna, mapeando números para int64/float64 e textos para object. O tipo object armazena ponteiros Python genéricos e consome muita memória; inspecionar com df.info(memory_usage=\"deep\") revela o consumo real de RAM do conjunto de dados.",
        questions: [
          q("O que o atributo df.dtypes informa sobre as colunas de um DataFrame?", "O tipo de dado interno de baixo nível associado a cada coluna da tabela", ["Apenas o nome das colunas","A quantidade de registros não nulos"], "dtypes mapeia cada coluna para seus tipos de dados subjacentes (int64, float64, object, etc.)."),
          q("Por que colunas de texto com tipo object costumam onerar o consumo de memória RAM?", "Porque object guarda referências para objetos Python no heap em vez de arrays contíguos de bytes", ["Porque textos são sempre compactados","Porque o Pandas duplica cada caractere"], "O tipo object atua como array de ponteiros heterogêneos, gerando overhead substancial de cache e RAM."),
          q("Qual método converte explicitamente o tipo de dado de uma coluna para outro tipo?", "serie.astype(novo_tipo)", ["serie.convert(novo_tipo)","serie.to_type(novo_tipo)"], "astype() projeta a Series para uma nova tipagem (ex: float32, int32 ou category)."),
          q("Como verificar o consumo real de memória de um DataFrame incluindo strings no heap?", "df.info(memory_usage=\"deep\")", ["df.memory()","df.bytes()"], "O parâmetro memory_usage=\"deep\" audita os bytes reais ocupados pelos objetos alocados fora do buffer."),
          t("Qual método converte a tipagem de uma coluna no Pandas para um formato mais eficiente?", ["astype","astype()"], "astype altera a representação interna de tipos da coluna.", "df[\"idade\"] = df[\"idade\"].____(\"int32\")"),
          g("Complete o comando inspecionando o consumo de memória em profundidade.", ["\"deep\""], "deep inspeciona a alocação completa de memória incluindo strings.", "df.info(memory_usage=____)"),
          o("Ordene os tipos de dados por eficiência de consumo de memória para números inteiros.", ["int8 (ocupa apenas 1 byte por valor, de -128 a 127)","int16 (ocupa 2 bytes por valor)","int32 (ocupa 4 bytes por valor)","int64 (padrão do Pandas ocupando 8 bytes por valor)"], "Escolher o subtipo inteiro correto economiza até 87% de memória em grandes tabelas."),
          p("Associe o dtype à sua representação física.", [["int64","Inteiro sinalizado de 64 bits padrão em sistemas modernos"],["float32","Ponto flutuante de precisão simples ocupando 4 bytes"],["object","Ponteiros para objetos Python gerais (usado para textos)"],["category","Tipo categórico otimizado baseado em inteiros e tabela de códigos"]], "Gerenciar dtypes conscientemente previne lentidão e estouros de memória no Pandas.")
        ]
      }
    ],
    2: [
      {
        id: "pandas-u2-l1-selecao-com-loc-rotulos",
        title: "Seleção baseada em rótulos com o indexador .loc",
        subtitle: "Índices e seleção · Acessando linhas e colunas por seus nomes nominais explícitos",
        theory: "O indexador .loc do Pandas realiza consultas e fatiamentos baseados estritamente em rótulos de linhas e nomes de colunas: df.loc[linhas, colunas]. Diferente do fatiamento padrão do Python, quando fatias são fornecidas ao .loc (ex: \"A\":\"C\"), o limite final é estritamente inclusivo em ambos os lados.",
        questions: [
          q("Qual é o critério de busca utilizado pelo indexador df.loc no Pandas?", "Baseia-se nos rótulos textuais ou índices explícitos das linhas e nomes das colunas", ["Baseia-se na posição inteira ordinal (0, 1, 2)","Baseia-se no hash MD5 dos dados"], ".loc orienta-se pelos nomes reais definidos no index e nas colunas da estrutura."),
          q("O que diferencia o fatiamento df.loc[\"a\":\"c\"] do fatiamento de listas padrão do Python?", "No .loc, tanto o rótulo inicial quanto o rótulo final são inclusivos no resultado", ["O .loc pula elementos pares","O .loc exclui o rótulo inicial"], "Como rótulos nominais não são ordinais numéricos, incluir a extremidade final evita ambiguidades."),
          q("Como selecionar todas as linhas de um DataFrame para as colunas \"nome\" e \"cidade\" usando .loc?", "df.loc[:, [\"nome\", \"cidade\"]]", ["df.loc[[\"nome\", \"cidade\"]]","df.loc[\"nome\", \"cidade\"]"], "Os dois pontos isolados : indicam a seleção integral de todas as linhas do eixo correspondente."),
          q("O que acontece se um rótulo solicitado no .loc não existir no índice do DataFrame?", "Lança uma exceção do tipo KeyError informando a ausência do rótulo", ["Retorna linhas com valores nulos silenciosamente","Retorna o primeiro item"], "Buscar rótulos inexistentes em acessos pontuais é tratado como erro estrito de chave no Pandas."),
          t("Qual indexador do Pandas realiza seleções orientadas a rótulos de linhas e colunas?", ["loc",".loc"], "loc realiza busca baseada em nomes e rótulos.", "resultado = df.____[\"cliente_10\", \"saldo\"]"),
          g("Complete a seleção de todas as linhas para a coluna \"preco\" via .loc.", [":"], "Dois pontos representam todas as linhas no primeiro argumento.", "df.loc[____, \"preco\"]"),
          o("Ordene a sintaxe de seleção de uma célula específica com o indexador .loc.", ["Escrever o identificador do DataFrame: df","Abrir colchetes no indexador: .loc[","Informar o rótulo da linha desejada seguido de vírgula: \"linha_5\",","Especificar o nome da coluna e fechar colchetes: \"valor\"]"], ".loc[linha, coluna] é a forma mais legível e segura de indexação nominal no Pandas."),
          p("Associe a expressão com .loc ao seu resultado prático.", [["df.loc[10]","Retorna a linha cujo rótulo de índice é 10 como uma Series"],["df.loc[:, \"idade\"]","Retorna todas as linhas da coluna nomeada \"idade\""],["df.loc[1:5, \"total\"]","Fatia inclusiva das linhas de rótulo 1 até 5 da coluna \"total\""],["df.loc[df[\"ativo\"], :]","Filtra linhas onde a coluna booleana \"ativo\" for True"]], "O domínio do .loc garante consultas determinísticas sobre índices customizados.")
        ]
      },
      {
        id: "pandas-u2-l2-selecao-com-iloc-posicoes",
        title: "Seleção baseada em posições numéricas com o indexador .iloc",
        subtitle: "Índices e seleção · Fatiando tabelas através de coordenadas inteiras padrão 0-indexadas",
        theory: "O indexador .iloc opera exclusivamente com posições ordinais inteiras de 0 até tamanho - 1, ignorando completamente os rótulos de texto: df.iloc[linhas_int, colunas_int]. No .iloc, o fatiamento segue a semântica canônica do Python: o índice inicial é inclusivo e o final é estritamente exclusivo.",
        questions: [
          q("Qual é o critério de busca adotado pelo indexador df.iloc no Pandas?", "Baseia-se exclusivamente nas posições ordinais inteiras (0, 1, 2...) dos eixos", ["Nos nomes textuais das colunas","Nos valores da primeira coluna"], ".iloc funciona como matriz clássica acessada puramente por índices numéricos ordinais."),
          q("Qual intervalo de linhas a expressão df.iloc[0:5, :] retorna?", "As cinco primeiras linhas físicas (índices ordinais 0, 1, 2, 3 e 4)", ["As seis primeiras linhas","Apenas as linhas 0 e 5"], "Assim como nas fatias de listas Python, o índice final em .iloc é estritamente exclusivo."),
          q("Como selecionar a última linha de um DataFrame utilizando o indexador .iloc?", "df.iloc[-1, :]", ["df.iloc[last, :]","df.iloc[end, :]"], "Índices negativos são aceitos no .iloc, contando as posições a partir do final do eixo."),
          q("O que acontece ao passar nomes de colunas em formato string para o .iloc (ex: df.iloc[:, \"nome\"])?", "Gera um erro do tipo TypeError ou ValueError, pois .iloc aceita exclusivamente números inteiros", ["Converte a string para número","Funciona normalmente"], ".iloc rejeita expressamente qualquer tipo não-inteiro em sua lista de coordenadas."),
          t("Qual indexador do Pandas utiliza apenas coordenadas inteiras para fatiamento?", ["iloc",".iloc"], "iloc trabalha exclusivamente com posições ordinais inteiras.", "primeira_linha = df.____[0]"),
          g("Complete a extração da primeira coluna para todas as linhas usando .iloc.", ["0"], "0 indica a primeira coluna na contagem posicional.", "df.iloc[:, ____]"),
          o("Ordene as fatias de linhas extraídas por .iloc em ordem cronológica de linhas.", ["df.iloc[0:2] (linhas ordinais 0 e 1)","df.iloc[2:4] (linhas ordinais 2 e 3)","df.iloc[4:6] (linhas ordinais 4 e 5)","df.iloc[6:] (da linha ordinal 6 até o término do DataFrame)"], ".iloc decompõe o DataFrame em blocos contíguos com exatidão posicional."),
          p("Associe a expressão com .iloc ao seu efeito na tabela.", [["df.iloc[0, 0]","Acessa o valor escalar da primeiríssima célula superior esquerda"],["df.iloc[-1]","Retorna a última linha física do DataFrame como Series"],["df.iloc[:, :3]","Retorna todas as linhas das três primeiras colunas (0, 1 e 2)"],["df.iloc[::2, :]","Acessa linhas alternadas com passo 2 (linhas pares)"]], "Usar .iloc viabiliza algoritmos que operam sobre posições físicas sem depender de nomes de colunas.")
        ]
      },
      {
        id: "pandas-u2-l3-indices-customizados-set-index-reset-index",
        title: "Definição e redefinição de índices: set_index e reset_index",
        subtitle: "Índices e seleção · Promovendo colunas a identificadores e retornando ao índice padrão",
        theory: "No Pandas, qualquer coluna com identificadores únicos (como CPF ou ID de cliente) pode ser promovida a índice do DataFrame através de df.set_index(\"coluna\"). Para reverter o índice de volta a uma coluna comum e restaurar o RangeIndex numérico sequencial (0, 1, 2...), utiliza-se o método df.reset_index().",
        questions: [
          q("Qual método promove uma coluna de dados a índice oficial do DataFrame no Pandas?", "df.set_index(\"nome_coluna\")", ["df.make_index(\"nome_coluna\")","df.to_index(\"nome_coluna\")"], "set_index transfere a coluna indicada para o eixo de índice de linhas do DataFrame."),
          q("O que o método df.reset_index() realiza por padrão na tabela?", "Transforma o índice atual de volta em coluna e recria um RangeIndex numérico (0 a N-1)", ["Apaga o DataFrame","Ordena a tabela alfabeticamente"], "reset_index restaura o índice padrão sequencial, mantendo os dados antigos em nova coluna."),
          q("Como descartar o índice atual sem transformá-lo em uma nova coluna ao usar reset_index?", "Passando o parâmetro drop=True: df.reset_index(drop=True)", ["Usando drop_index()","Passando inplace=False"], "drop=True remove o índice antigo completamente sem poluir a tabela com colunas adicionais."),
          q("Ter um índice bem definido e indexado (ex: hash ou ordenado) acelera buscas com .loc?", "Sim, consultas por rótulo em índices configurados operam em tempo constante O(1) ou logarítmico O(log n)", ["Não, o Pandas sempre varre todas as linhas O(n)","Apenas reduz a memória"], "Índices estruturados aceleram massivamente o tempo de resposta de filtros e buscas frequentes."),
          t("Qual método do DataFrame transforma o índice existente em uma coluna comum e recria o índice numérico?", ["reset_index","reset_index()"], "reset_index restaura o RangeIndex sequencial.", "df = df.____(drop=True)"),
          g("Complete o comando promovendo a coluna \"codigo\" a índice oficial da tabela.", ["\"codigo\""], "set_index recebe o nome da coluna que se tornará o novo índice.", "df = df.set_index(____)"),
          o("Ordene as etapas para promover uma coluna a índice e depois restaurar a tabela.", ["Identificar a coluna com chaves primárias únicas: \"matricula\"","Executar df = df.set_index(\"matricula\") para indexar","Realizar consultas ultra-rápidas com df.loc[102030]","Restaurar a estrutura tabular original chamando df = df.reset_index()"], "Manipular o índice confere agilidade analítica sem perder a integridade dos dados brutos."),
          p("Associe o método de índice à sua ação.", [["df.set_index(\"id\")","Promove a coluna \"id\" para o eixo do índice"],["df.reset_index()","Converte o índice em coluna e restaura numeração sequencial"],["df.reset_index(drop=True)","Descarta o índice atual sem criar nova coluna na tabela"],["df.index.is_unique","Verifica se todos os valores do índice são estritamente exclusivos"]], "Configurar índices adequados é um dos maiores pilares de performance no Pandas.")
        ]
      },
      {
        id: "pandas-u2-l4-indices-hierarquicos-multiindex",
        title: "Índices hierárquicos e multi-nível (MultiIndex)",
        subtitle: "Índices e seleção · Trabalhando com dados multidimensionais organizados em múltiplos níveis",
        theory: "O MultiIndex do Pandas permite que linhas ou colunas possuam múltiplos níveis de rotulação hierárquica. Ele permite representar dados de dimensões superiores (como País, Estado e Cidade) em uma tabela bidimensional plana, suportando fatiamentos agregados em diferentes níveis com sintaxe avançada.",
        questions: [
          q("O que caracteriza um MultiIndex no Pandas?", "A presença de dois ou mais níveis hierárquicos de rótulos no índice de linhas ou colunas", ["Um índice que só aceita números inteiros","Um índice temporário em disco"], "O MultiIndex organiza dados aninhados em múltiplos níveis de agregação sem perder o formato tabular."),
          q("Como criar um índice de múltiplos níveis a partir de duas colunas existentes no DataFrame?", "df.set_index([\"estado\", \"cidade\"])", ["df.multi([\"estado\", \"cidade\"])","df.group_index(\"estado\", \"cidade\")"], "Passar uma lista de colunas para set_index constrói automaticamente uma hierarquia MultiIndex."),
          q("Como acessar todos os registros pertencentes ao nível superior \"SP\" em um MultiIndex?", "df.loc[\"SP\"]", ["df.get_level(\"SP\")","df.iloc[\"SP\"]"], ".loc no nível superior extrai o subconjunto correspondente preservando os níveis internos restantes."),
          q("Qual método desfaz um nível do índice hierárquico transpondo-o para colunas?", "df.unstack()", ["df.pivot_simple()","df.flatten()"], "unstack() gira o nível interno do índice de linhas para o eixo de colunas, facilitando relatórios."),
          t("Qual método gira o nível mais interno de um MultiIndex de linhas transformando-o em colunas?", ["unstack","unstack()"], "unstack move níveis de linhas para colunas.", "tabela_larga = df.____()"),
          g("Complete a criação do índice hierárquico passando as colunas ano e mes.", ["[\"ano\", \"mes\"]"], "Listas de colunas criam índices multi-nível.", "df = df.set_index(____)"),
          o("Ordene as etapas para trabalhar com tabelas hierárquicas no Pandas.", ["Carregar dados de vendas com colunas \"regiao\", \"loja\" e \"faturamento\"","Criar o índice multinível com df.set_index([\"regiao\", \"loja\"])","Filtrar todas as lojas da região Sul com df.loc[\"Sul\"]","Reorganizar a visualização em matriz cruzada com df.unstack()"], "MultiIndex traz o poder de cubos analíticos multidimensionais para dentro do Pandas."),
          p("Associe a operação com MultiIndex ao seu resultado.", [["df.set_index([\"a\", \"b\"])","Cria estrutura de índice hierárquico com dois níveis"],["df.xs(\"Sudeste\", level=\"regiao\")","Fatia transversal extraindo linhas de um nível específico"],["df.unstack()","Pivota o nível mais interno de linhas para o eixo de colunas"],["df.stack()","Gira o nível de colunas de volta para o índice de linhas"]], "MultiIndex é fundamental para manipular séries temporais complexas e agrupamentos avançados.")
        ]
      },
      {
        id: "pandas-u2-l5-operador-at-e-iat-acesso-escalar",
        title: "Acesso escalar ultra-rápido com .at e .iat",
        subtitle: "Índices e seleção · Maximizando performance na leitura e escrita de células individuais",
        theory: "Quando é necessário consultar ou alterar uma única célula escalar isolada, os indexadores .at (por rótulos) e .iat (por inteiros) superam amplamente .loc e .iloc. Eles eliminam a sobrecarga de criação de Series ou arrays intermediários, executando com latência comparável ao acesso nativo a listas.",
        questions: [
          q("Qual é a principal vantagem de usar df.at[\"l1\", \"col\"] em vez de df.loc[\"l1\", \"col\"] para uma única célula?", "O indexador .at é estritamente otimizado para escalares, sendo muito mais rápido por evitar overhead", ["O .at funciona apenas no Linux","O .loc não permite alterar valores"], ".at tem caminho crítico reduzido no código C do Pandas, garantindo velocidade máxima para valores únicos."),
          q("Qual é a diferença entre df.at e df.iat?", ".at utiliza rótulos nominais; .iat utiliza posições inteiras ordinais", [".at é somente leitura",".iat aceita listas de colunas"], "A distinção espelha o par loc/iloc: at baseia-se em rótulo e iat em posição cardinal."),
          q("O que acontece se tentarmos passar uma fatia ou lista de colunas para df.at (ex: df.at[\"l1\", [\"a\", \"b\"]])?", "Gera um erro do tipo ValueError ou TypeError, pois .at aceita exclusivamente um único valor escalar", ["Retorna a média dos valores","Converte em DataFrame"], ".at e .iat rejeitam coleções de chaves, garantindo acesso unitário determinístico."),
          q("Qual é a melhor prática para atualizar repetidamente valores individuais em laços quando inevitável?", "Utilizar df.iat[i, j] = novo_valor em vez de df.iloc[i, j] = novo_valor", ["Usar print no laço","Usar eval()"], "A economia cumulativa de microsegundos do .iat faz diferença perceptível em laços volumosos."),
          t("Qual indexador por coordenadas ordinais inteiras é otimizado para ler ou escrever um único valor escalar?", ["iat",".iat"], "iat é o indexador escalar baseado em inteiros.", "valor = df.____[0, 1]"),
          g("Complete a atribuição ultra-rápida de célula escalar usando o rótulo de linha e coluna.", ["at"], "at acessa e altera células nominais pontuais.", "df.____[\"cliente_99\", \"status\"] = \"ativo\""),
          o("Ordene a eficiência de acesso a uma única célula escalar no Pandas.", ["df.iat[i, j] (o caminho mais veloz em tempo de execução)","df.at[rotulo_i, rotulo_j] (altamente veloz orientado a nomes)","df.iloc[i, j] (mais lento por criar objetos intermediários)","df.loc[rotulo_i, rotulo_j] (mais pesado para escalares isolados)"], "Usar o indexador certo para a granularidade da operação otimiza o pipeline de dados."),
          p("Associe o indexador ao seu caso de uso ideal.", [["df.at[\"r1\", \"c1\"]","Leitura e escrita de uma única célula por nomes de rótulo"],["df.iat[0, 3]","Leitura e escrita de uma única célula por índices inteiros"],["df.loc[\"r1\":\"r5\", \"c1\"]","Extração de fatias ou blocos com múltiplos valores por nome"],["df.iloc[:10, :2]","Fatiamento tabular de linhas e colunas por coordenadas numéricas"]], "Adotar .at e .iat em pontos críticos acelera a manipulação de matrizes de dados no Pandas.")
        ]
      }
    ],
    3: [
      {
        id: "pandas-u3-l1-identificando-nulos-isna-notna",
        title: "Identificação de valores ausentes: isna() e notna()",
        subtitle: "Dados ausentes · Mapeando valores nulos, np.nan e dados faltantes com máscaras booleanas",
        theory: "No Pandas, dados faltantes são representados por np.nan em números e None ou pd.NA em outros tipos. Os métodos df.isna() e df.isnull() retornam uma máscara booleana com True nas posições nulas; df.notna() inverte essa lógica. Combinar df.isna().sum() quantifica instantaneamente os vazios por coluna.",
        questions: [
          q("Qual método do Pandas retorna uma máscara booleana indicando onde existem valores ausentes?", "df.isna() (ou seu sinônimo idêntico df.isnull())", ["df.empty()","df.void()","df.zero()"], "isna() avalia cada elemento, marcando como True células com np.nan, None ou pd.NA."),
          q("Como calcular a quantidade total de valores nulos presentes em cada coluna de um DataFrame?", "df.isna().sum()", ["df.isna().count()","df.null_total()"], "Como booleanos somam 1 para True e 0 para False, .sum() quantifica as falhas por coluna."),
          q("Qual é a diferença prática entre os métodos df.isna() e df.isnull() no Pandas?", "Nenhuma diferença: isnull é apenas um alias (apelido) herdado do R para a função isna", ["isnull só funciona com números","isna remove as linhas nulas"], "Ambos invocam rigorosamente a mesma implementação interna do Pandas."),
          q("O que a expressão df[df[\"email\"].notna()] retorna?", "Apenas as linhas do DataFrame onde a coluna \"email\" possui valores preenchidos e válidos", ["Linhas com e-mail nulo","A contagem de linhas"], "notna() filtra a tabela preservando estritamente os registros com dados presentes."),
          t("Qual método booleano identifica a presença de valores ausentes em uma Series ou DataFrame?", ["isna","isna()","isnull","isnull()"], "isna marca células vazias com True.", "mascara = df[\"idade\"].____()"),
          g("Complete o comando calculando o total de nulos por coluna.", ["sum()"], "sum() sobre a máscara booleana totaliza os valores ausentes.", "total_vazios = df.isna().____"),
          o("Ordene as etapas do diagnóstico inicial de dados ausentes em uma tabela.", ["Carregar o DataFrame a partir do arquivo de origem","Gerar a matriz booleana de nulos com df.isna()","Calcular o total de faltantes por coluna com df.isna().sum()","Calcular o percentual de dados faltantes com (df.isna().sum() / len(df)) * 100"], "Quantificar o percentual de ausências orienta a escolha entre preencher ou descartar registros."),
          p("Associe o método de diagnóstico ao seu resultado.", [["df.isna()","Matriz de booleanos com True para cada valor nulo encontrado"],["df.notna()","Matriz com True para células preenchidas com dados legítimos"],["df.isna().sum()","Soma total de valores nulos agrupados por coluna"],["df.isna().any()","Informa para cada coluna se existe ao menos um dado ausente"]], "Mapear dados faltantes com clareza é a primeira etapa de qualquer esteira de limpeza.")
        ]
      },
      {
        id: "pandas-u3-l2-remocao-com-dropna-axis-how",
        title: "Descarte de dados faltantes com dropna(), axis e how",
        subtitle: "Dados ausentes · Eliminando linhas e colunas nulas com critérios any, all e thresh",
        theory: "O método df.dropna() elimina registros contendo dados ausentes. O parâmetro axis define se linhas (axis=0) ou colunas (axis=1) serão descartadas; how=\"any\" descarta o eixo se houver qualquer nulo, enquanto how=\"all\" exige que todos os valores sejam nulos. O parâmetro thresh estabelece o mínimo de dados válidos.",
        questions: [
          q("O que o método df.dropna() faz por padrão (sem parâmetros adicionais)?", "Remove todas as linhas que contenham ao menos um valor nulo em qualquer coluna (axis=0, how=\"any\")", ["Remove todas as colunas nulas","Substitui nulos por zero"], "Por padrão, dropna descarta preventivamente linhas incompletas para sanear a amostra."),
          q("Como descartar colunas que contenham apenas valores nulos de ponta a ponta?", "df.dropna(axis=1, how=\"all\")", ["df.dropna(axis=0, how=\"any\")","df.dropna(cols=\"all\")"], "axis=1 mira nas colunas e how=\"all\" restringe o descarte apenas quando a coluna inteira for vazia."),
          q("O que o parâmetro subset=[\"cpf\", \"email\"] faz no método df.dropna()?", "Restringe a checagem de dados nulos exclusivamente às colunas especificadas no subset", ["Descarta as colunas indicadas","Cria novas colunas"], "subset impede que a ausência de campos opcionais provoque o descarte involuntário da linha."),
          q("O que o parâmetro thresh=5 faz em df.dropna(axis=0, thresh=5)?", "Mantém apenas as linhas que possuam no mínimo 5 valores não-nulos preenchidos", ["Descarta 5 linhas","Substitui 5 valores"], "thresh atua como nota de corte de integridade: linhas com menos preenchimentos são eliminadas."),
          t("Qual método do DataFrame descarta linhas ou colunas que contêm valores faltantes?", ["dropna","dropna()"], "dropna elimina registros com dados ausentes.", "df_limpo = df.____(how=\"all\")"),
          g("Complete o descarte de linhas sem e-mail preenchido especificando a coluna alvo.", ["subset"], "subset restringe o escopo de descarte às colunas informadas.", "df = df.dropna(____=[\"email\"])"),
          o("Ordene as etapas de saneamento com dropna() para preservar o máximo de dados úteis.", ["Verificar quais colunas são mandatórias para o negócio (ex: \"id_transacao\", \"valor\")","Descartar colunas que sejam 100% nulas usando df.dropna(axis=1, how=\"all\")","Aplicar dropna apenas sobre as colunas essenciais: df.dropna(subset=[\"id_transacao\", \"valor\"])","Conferir o novo formato da base saneada com df.shape"], "O uso criterioso de subset e how evita perda acidental de registros parcialmente preenchidos."),
          p("Associe a configuração do dropna ao seu efeito de corte.", [["dropna(how=\"any\")","Elimina o eixo se houver pelo menos um único valor nulo"],["dropna(how=\"all\")","Elimina o eixo apenas se todos os seus valores forem nulos"],["dropna(axis=1)","Aplica o descarte sobre o eixo de colunas em vez de linhas"],["dropna(thresh=k)","Exige no mínimo k valores válidos preenchidos para manter o registro"]], "Dominar o dropna protege a representatividade estatística do conjunto de dados.")
        ]
      },
      {
        id: "pandas-u3-l3-imputacao-com-fillna-valores-estatisticos",
        title: "Imputação de dados com fillna(): constantes e estatísticas",
        subtitle: "Dados ausentes · Preenchendo lacunas com médias, medianas, modas ou valores fixos",
        theory: "A imputação com df.fillna() substitui valores nulos sem descartar registros. Pode-se preencher vazios com constantes (ex: fillna(0) ou fillna(\"Não Informado\")) ou valores estatísticos inferidos da própria distribuição, como média para distribuições normais ou mediana para mitigar o impacto de outliers.",
        questions: [
          q("Qual método do Pandas substitui valores nulos por um valor substituto fornecido?", "df.fillna(valor)", ["df.replace_na(valor)","df.impute(valor)"], "fillna preenche os espaços vazios mantendo o alinhamento de índices da tabela."),
          q("Por que a mediana (df[\"salario\"].median()) costuma ser preferida à média para imputar valores faltantes?", "Porque a mediana é robusta a outliers (valores discrepantes extremos), preservando a tendência central", ["Porque a mediana gasta menos memória","Porque a média é sempre nula"], "Outliers gigantescos distorcem a média aritmética, enquanto a mediana reflete a realidade da maioria."),
          q("Como preencher valores ausentes em colunas categóricas de texto de forma idiomática?", "Imputando a moda: df[\"cidade\"].fillna(df[\"cidade\"].mode()[0]) ou uma categoria fixa como \"Desconhecido\"", ["Preenchendo com zero","Preenchendo com média"], "Moda representa o valor mais frequente da distribuição categórica."),
          q("Como aplicar imputações distintas em várias colunas simultaneamente com um único fillna()?", "Passando um dicionário mapeando cada coluna para seu substituto: df.fillna({\"idade\": 0, \"status\": \"pendente\"})", ["Passando uma tupla","Usando múltiplos loops"], "Passar um dicionário para fillna centraliza as regras de saneamento em uma chamada legível."),
          t("Qual método do Pandas é utilizado para substituir dados ausentes por valores substitutos?", ["fillna","fillna()"], "fillna realiza a imputação de dados faltantes.", "df[\"pontos\"] = df[\"pontos\"].____(0)"),
          g("Complete a imputação preenchendo a idade ausente com a mediana da coluna.", ["df[\"idade\"].median()"], "A mediana é uma métrica central resiliente a anomalias.", "df[\"idade\"] = df[\"idade\"].fillna(____)"),
          o("Ordene a estratégia de imputação estatística para uma coluna contínua com outliers.", ["Calcular a mediana da coluna descartando nulos: med = df[\"renda\"].median()","Validar a razoabilidade do valor calculado para o contexto do negócio","Executar a imputação: df[\"renda\"] = df[\"renda\"].fillna(med)","Verificar com df[\"renda\"].isna().sum() se a coluna zerou os dados faltantes"], "A imputação com mediana preserva o tamanho da amostra sem introduzir viés de média."),
          p("Associe a técnica de imputação ao seu cenário recomendado.", [["fillna(0)","Preenchimento constante para quantidades e contagens ausentes"],["fillna(df[\"preco\"].median())","Imputação de variáveis numéricas contínuas com assimetria"],["fillna(df[\"cat\"].mode()[0])","Imputação pelo valor mais frequente em variáveis categóricas"],["fillna({\"a\": 1, \"b\": \"N/A\"})","Imputação múltipla customizada por dicionário de colunas"]], "Imputar dados com discernimento metodológico é vital para modelos estatísticos confiáveis.")
        ]
      },
      {
        id: "pandas-u3-l4-propagacao-ffill-bfill-series-temporais",
        title: "Propagação de valores vizinhos: ffill e bfill",
        subtitle: "Dados ausentes · Tratamento de séries temporais com forward fill e backward fill",
        theory: "Em séries temporais e dados sequenciais (como cotações de ações ou leituras de sensores), a imputação por propagação é a regra de ouro. df.ffill() (forward fill) propaga o último valor válido observado para a frente; df.bfill() (backward fill) busca o próximo valor futuro disponível para trás.",
        questions: [
          q("O que o método df.ffill() realiza ao encontrar valores nulos em uma série temporal?", "Propaga o último valor válido anterior para preencher as lacunas seguintes (Forward Fill)", ["Puxa valores futuros para trás","Preenche com zero"], "ffill mantém a última observação conhecida até que uma nova medição ocorra."),
          q("O que o método df.bfill() faz de diferente em relação ao df.ffill()?", "Propaga o próximo valor válido futuro para trás para preencher as lacunas anteriores (Backward Fill)", ["Apaga os dados futuros","Inverte a ordem das datas"], "bfill olha para a frente no tempo e preenche retrospectivamente as células faltantes."),
          q("O que acontece se o primeiríssimo valor de uma coluna for NaN e aplicarmos df.ffill()?", "O primeiro elemento continua como NaN, pois não existe nenhum valor prévio anterior para propagar", ["Lança erro fatal","Preenche com zero"], "ffill só consegue propagar a partir de um valor conhecido; se o início for nulo, a lacuna persiste."),
          q("Como limitar a quantidade de lacunas consecutivas que podem ser propagadas com ffill()?", "Utilizando o parâmetro limit=N: df.ffill(limit=3)", ["Usando max_fill=N","Com stop_at=N"], "O parâmetro limit evita propagar valores antigos por períodos excessivamente longos sem dados reais."),
          t("Qual método do Pandas propaga a última medição válida para as lacunas seguintes?", ["ffill","ffill()"], "ffill realiza a propagação para frente.", "cotacoes = cotacoes.____()"),
          g("Complete o preenchimento retrospectivo propagando o próximo valor disponível.", ["bfill()"], "bfill propaga os valores válidos para trás.", "dados_sensores = dados_sensores.____"),
          o("Ordene o tratamento de lacunas temporais combinando ffill e bfill.", ["Ordenar a série temporal em ordem cronológica estrita por data","Aplicar forward fill para manter o último estado conhecido: df = df.ffill()","Aplicar backward fill residual para preencher eventuais NaNs no topo: df = df.bfill()","Confirmar ausência total de nulos na série com df.isna().sum()"], "Combinar ffill com bfill residual fecha todas as lacunas em séries temporais organizadas."),
          p("Associe a operação de propagação à sua direção temporal.", [["df.ffill()","Propagação progressiva: último valor válido é copiado para a frente"],["df.bfill()","Propagação regressiva: próximo valor válido é copiado para trás"],["ffill(limit=2)","Propaga no máximo duas posições consecutivas para conter desvios"],["Série temporal sem ordenação","Risco crítico: propagar dados sem ordenar gera vazamento temporal"]], "Propagação temporal com ffill e bfill reflete a física de sensores e fluxos financeiros contínuos.")
        ]
      },
      {
        id: "pandas-u3-l5-interpolacao-linear-e-polinomial",
        title: "Interpolação de valores contínuos com interpolate()",
        subtitle: "Dados ausentes · Estimando lacunas em curvas numéricas contínuas com métodos matemáticos",
        theory: "Quando os dados representam uma grandeza física ou sinal contínuo (como temperatura ou altitude), substituir nulos por vizinhos abruptos introduz degraus artificiais. O método df.interpolate() calcula estimativas matemáticas graduais entre os pontos conhecidos, adotando interpolação linear por padrão.",
        questions: [
          q("Qual é a principal vantagem de df.interpolate() em relação ao ffill para grandezas contínuas?", "Estima valores intermediários suaves ao longo de uma reta ou curva, evitando degraus artificiais", ["Executa mais rápido que preencher com zero","Não consome memória RAM"], "A interpolação conecta o ponto anterior e o posterior com transição suave e gradual."),
          q("Qual é o método padrão de interpolação adotado por df.interpolate()?", "Interpolação linear (method=\"linear\")", ["Interpolação cúbica","Interpolação por vizinho mais próximo"], "Por padrão, assume progressão uniforme de primeiro grau entre os valores vizinhos válidos."),
          q("Se uma série contiver os valores [10.0, NaN, 20.0], qual valor interpolate() preencherá no meio?", "15.0 (o ponto médio linear exato entre 10 e 20)", ["10.0","20.0","0.0"], "A reta linear entre 10 e 20 cruza o ponto intermediário exatamente em 15."),
          q("Qual parâmetro de interpolate() permite utilizar datas como eixo de espaçamento real?", "method=\"time\" em um DataFrame indexado por DatetimeIndex", ["method=\"calendar\"","method=\"dates\""], "A interpolação por tempo pondera o valor considerando os intervalos reais de minutos ou dias entre as medidas."),
          t("Qual método do Pandas realiza a estimativa matemática de lacunas contínuas entre valores conhecidos?", ["interpolate","interpolate()"], "interpolate traça curvas e retas sobre valores nulos.", "sinal_limpo = sinal.____()"),
          g("Complete o comando especificando a interpolação linear clássica.", ["\"linear\""], "linear é o método padrão de interpolação matemática.", "temperaturas = temperaturas.interpolate(method=____)"),
          o("Ordene a rotina de saneamento de um sinal contínuo de sensor de temperatura.", ["Identificar que a grandeza física possui continuidade suave na natureza","Definir o timestamp como DatetimeIndex da tabela","Executar a interpolação temporal: df = df.interpolate(method=\"time\")","Examinar o gráfico da série confirmando a ausência de saltos artificiais"], "A interpolação temporal reconstitui trajetórias físicas com verossimilhança matemática."),
          p("Associe o método de interpolação à sua característica.", [["interpolate(method=\"linear\")","Calcula valores equidistantes em linha reta entre os pontos"],["interpolate(method=\"time\")","Pondera o intervalo real cronológico entre as medições"],["interpolate(method=\"polynomial\", order=2)","Ajusta uma curva parabólica quadrática sobre as lacunas"],["interpolate(limit_direction=\"both\")","Permite interpolar dados tanto para a frente quanto para trás"]], "Interpolação matemática fecha o ciclo de tratamento refinado de dados ausentes no Pandas.")
        ]
      }
    ],
    4: [
      {
        id: "pandas-u4-l1-conversao-to-datetime-errors-coerce",
        title: "Conversão temporal com pd.to_datetime e errors=\"coerce\"",
        subtitle: "Datas e categorias · Transformando textos em timestamps e tratando datas inválidas",
        theory: "No Pandas, strings com datas devem ser convertidas para o tipo datetime64[ns] através de pd.to_datetime(). Usar o parâmetro format=\"%Y-%m-%d\" acelera a conversão evitando inferência heurística; o parâmetro errors=\"coerce\" converte entradas corrompidas ou malformadas diretamente em NaT (Not a Time) com segurança.",
        questions: [
          q("Qual função do Pandas converte colunas de texto em timestamps do tipo datetime64[ns]?", "pd.to_datetime(serie)", ["pd.as_date(serie)","pd.parse_time(serie)"], "to_datetime parseia strings em múltiplos formatos, gerando objetos Timestamp de alta performance."),
          q("O que o parâmetro errors=\"coerce\" faz ao encontrar uma data inválida como \"2026-02-31\"?", "Converte o valor defeituoso em NaT (Not a Time), prevenindo que a execução aborte com erro", ["Ignora o registro mantendo a string","Converte para o primeiro dia do ano"], "coerce transforma inconsistências cronológicas em nulos sentinela (NaT) gerenciáveis."),
          q("Por que explicitar o formato exato com format=\"%d/%m/%Y\" é uma boa prática de engenharia?", "Acelera massivamente a velocidade de parsing e impede ambiguidades entre dia e mês (DD/MM vs MM/DD)", ["Garante que os dados fiquem em maiúsculas","Reduz o consumo de disco"], "Informar a máscara exata elimina a adivinhação do parser C interno do Pandas."),
          q("Como representar formalmente um valor temporal ausente ou nulo no Pandas?", "pd.NaT (Not a Time)", ["np.nan","None","pd.NullDate"], "NaT é a representação sentinela especializada para dados faltantes em eixos temporais."),
          t("Qual constante do Pandas representa um valor temporal ausente ou corrompido em datas?", ["NaT","pd.NaT"], "NaT (Not a Time) é o nulo das datas.", "data_invalida = pd.____"),
          g("Complete a conversão forçando o descarte de datas inválidas para NaT.", ["\"coerce\""], "coerce converte falhas em NaT.", "df[\"data\"] = pd.to_datetime(df[\"data\"], errors=____)"),
          o("Ordene as etapas para higienizar uma coluna de datas com formatos mistos.", ["Receber a coluna bruta com strings: df[\"data_cadastro\"]","Definir o formato esperado: mascara = \"%Y-%m-%d\"","Invocar pd.to_datetime(df[\"data_cadastro\"], format=mascara, errors=\"coerce\")","Verificar a quantidade de datas inválidas com df[\"data_cadastro\"].isna().sum()"], "Coagir falhas para NaT isola dados corrompidos para tratamento posterior."),
          p("Associe o parâmetro de pd.to_datetime ao seu comportamento.", [["errors=\"coerce\"","Converte falhas de parsing em NaT sem derrubar o programa"],["errors=\"raise\"","Comportamento padrão que levanta exceção ao encontrar erro"],["errors=\"ignore\"","Mantém a string original inalterada caso ocorra erro"],["format=\"%Y-%m-%d\"","Define o padrão estrito de leitura acelerando o processamento"]], "Converter datas para datetime64 é o alicerce para análise temporal rigorosa no Pandas.")
        ]
      },
      {
        id: "pandas-u4-l2-acessador-dt-extracao-componentes",
        title: "O acessador .dt: extraindo componentes temporais",
        subtitle: "Datas e categorias · Decompondo anos, meses, dias, horas e nomes de dias da semana",
        theory: "Colunas do tipo datetime64 expõem o acessador .dt, provendo dezenas de propriedades vetorizadas. É possível extrair o ano (.dt.year), mês (.dt.month), dia da semana (.dt.day_name()), hora (.dt.hour) ou normalizar apenas para a data pura sem horário (.dt.date) sem recorrer a laços for lentos.",
        questions: [
          q("Qual acessador do Pandas disponibiliza propriedades e métodos vetorizados sobre colunas de data?", "O acessador .dt (ex: df[\"data\"].dt.year)", ["O acessador .time","O acessador .date","O acessador .chrono"], ".dt expõe a API cronológica completa vetorizada para Series do tipo datetime64."),
          q("Como extrair o nome do dia da semana (ex: Monday, Friday) a partir de uma coluna de datas?", "df[\"data\"].dt.day_name()", ["df[\"data\"].dt.weekday_name","df[\"data\"].dt.name_of_day()"], "day_name() retorna o nome textual do dia correspondente ao timestamp."),
          q("Como normalizar timestamps removendo frações de horas, minutos e segundos?", "df[\"data\"].dt.normalize() ou df[\"data\"].dt.floor(\"D\")", ["df[\"data\"].dt.clear_time()","df[\"data\"].dt.zero()"], "normalize zera a parte de horário, mantendo todos os registros na meia-noite do respectivo dia."),
          q("Qual propriedade do .dt indica o dia da semana como número inteiro de 0 (segunda) a 6 (domingo)?", "df[\"data\"].dt.dayofweek (ou dt.weekday)", ["df[\"data\"].dt.week_index","df[\"data\"].dt.day_num"], "dayofweek segue o padrão ISO onde segunda-feira é 0 e domingo é 6."),
          t("Qual acessador de Series disponibiliza propriedades e métodos de data e hora?", ["dt",".dt"], "dt acessa o ecossistema de datas.", "df[\"ano\"] = df[\"data\"].____.year"),
          g("Complete a extração do ano da transação a partir da coluna temporal.", ["dt.year"], "dt.year extrai o ano inteiro em formato numérico.", "df[\"ano\"] = df[\"transacao\"].____"),
          o("Ordene a engenharia de atributos temporais a partir de uma data de compra.", ["Converter a coluna bruta: df[\"data\"] = pd.to_datetime(df[\"data\"])","Extrair o ano com df[\"ano\"] = df[\"data\"].dt.year","Extrair o mês com df[\"mes\"] = df[\"data\"].dt.month","Extrair o dia da semana com df[\"dia_semana\"] = df[\"data\"].dt.day_name()"], "Decompor datas em atributos independentes enriquece modelos analíticos e preditivos."),
          p("Associe a propriedade do .dt à sua informação extraída.", [["serie.dt.year","Número inteiro representando o ano (ex: 2026)"],["serie.dt.month","Número inteiro do mês de 1 (janeiro) a 12 (dezembro)"],["serie.dt.day_name()","Nome textual do dia da semana (ex: \"Wednesday\")"],["serie.dt.is_leap_year","Booleano indicando se o ano é bissexto"]], "O acessador .dt simplifica a criação de calendários analíticos sem laços manuais.")
        ]
      },
      {
        id: "pandas-u4-l3-series-temporais-date-range-resample",
        title: "Séries temporais: date_range e agregação com resample()",
        subtitle: "Datas e categorias · Criando frequências temporais e agregando por períodos com resample",
        theory: "O Pandas nasceu para séries temporais financeiras. Com pd.date_range(), geram-se sequências de timestamps regulares com frequências definidas (diária \"D\", mensal \"M\", horária \"h\"). Quando o DataFrame é indexado por datas, o método df.resample(\"M\").sum() agrega dados em intervalos regulares.",
        questions: [
          q("Qual função gera sequências contínuas de datas regulares com passos fixos no Pandas?", "pd.date_range(start, end, freq)", ["pd.create_calendar(start, end)","pd.sequence_dates()"], "date_range constrói um DatetimeIndex uniforme com extrema flexibilidade de frequência."),
          q("O que o método df.resample(\"ME\").mean() realiza em um DataFrame indexado por datas?", "Reamostra os dados agregando-os pelo final de cada mês e calcula a média mensal dos valores", ["Filtra apenas o mês atual","Apaga os dias da semana"], "resample atua como um groupby temporal, agrupando registros em baldes cronológicos."),
          q("Qual código de frequência de resample representa intervalos semanais no Pandas?", "\"W\"", ["\"D\"","\"M\"","\"Q\""], "\"W\" indica frequência semanal (Weekly), permitindo agregar dados de 7 em 7 dias."),
          q("Qual é o requisito obrigatório para invocar o método .resample() em um DataFrame?", "O índice (index) do DataFrame deve ser obrigatoriamente um DatetimeIndex válido", ["Todas as colunas devem ser floats","A tabela precisa ter mais de 1000 linhas"], "resample depende do índice cronológico estruturado para fatiar o tempo com precisão."),
          t("Qual método realiza o agrupamento e agregação temporal em DataFrames indexados por datas?", ["resample","resample()"], "resample é o groupby de séries temporais.", "vendas_mensais = df.____(\"M\").sum()"),
          g("Complete a criação de 10 datas consecutivas com frequência diária.", ["freq=\"D\""], "freq=\"D\" gera passo de um dia por registro.", "datas = pd.date_range(start=\"2026-01-01\", periods=10, ____)"),
          o("Ordene as etapas de agregação mensal de faturamento a partir de dados diários.", ["Definir a coluna de data como índice: df = df.set_index(\"data_venda\")","Garantir ordenação cronológica: df = df.sort_index()","Agrupar por fechamento de mês e somar: mensal = df.resample(\"ME\")[\"faturamento\"].sum()","Gerar relatório consolidado com total por mês"], "Resample simplifica a consolidação de métricas operacionais em qualquer granularidade."),
          p("Associe a frequência de resample ao seu intervalo correspondente.", [["df.resample(\"D\")","Reamostragem e agregação diária"],["df.resample(\"W\")","Reamostragem e agregação semanal"],["df.resample(\"M\")","Reamostragem e agregação mensal"],["df.resample(\"Q\")","Reamostragem e agregação trimestral (Quarterly)"]], "Dominar resample é essencial para engenharia de séries temporais financeiras e industriais.")
        ]
      },
      {
        id: "pandas-u4-l4-tipo-categorico-memoria-performance",
        title: "O tipo Categórico (pd.Categorical): economia de memória",
        subtitle: "Datas e categorias · Substituindo strings repetidas por inteiros codificados internamente",
        theory: "Colunas de texto com alta repetição de valores (ex: estado, status, gênero) geram desperdício de RAM quando salvas como object. Ao converter para categoria com .astype(\"category\"), o Pandas cria uma tabela interna de categorias únicas e armazena apenas inteiros compactos, reduzindo o consumo em até 95%.",
        questions: [
          q("Por que converter colunas de texto repetitivo para o tipo \"category\" é altamente benéfico?", "Reduz drasticamente o consumo de memória RAM e acelera operações de agrupamento (groupby) e ordenação", ["Torna o texto imutável para sempre","Gera backups automáticos no disco"], "Em vez de milhares de strings na memória, o Pandas armazena um índice numérico pequeno (int8/int16)."),
          q("Como converter uma coluna de status para o tipo categórico no Pandas?", "df[\"status\"] = df[\"status\"].astype(\"category\")", ["df[\"status\"].to_category()","df[\"status\"].make_categorical()"], "astype(\"category\") projeta a coluna para a representação categorizada da biblioteca."),
          q("Qual acessador expõe propriedades específicas de colunas categóricas (como códigos e categorias)?", "O acessador .cat (ex: df[\"status\"].cat.categories)", ["O acessador .category","O acessador .type","O acessador .label"], ".cat fornece acesso à tabela de categorias, códigos inteiros e métodos de reordenação."),
          q("O que acontece se tentarmos inserir um valor novo não previsto em uma coluna categórica restrita?", "Gera um erro ou atribui NaN, pois o novo valor não pertence à lista de categorias registradas", ["O Pandas aceita sem aviso","A coluna vira float"], "Categorias impõem integridade de domínio, bloqueando termos estranhos não catalogados."),
          t("Qual string de tipo deve ser passada para o método astype para converter para categórico?", ["category","\"category\""], "category ativa a otimização de variáveis categóricas.", "df[\"uf\"] = df[\"uf\"].astype(____)"),
          g("Complete o acesso aos códigos numéricos internos da coluna categórica.", ["cat.codes"], "cat.codes expõe o vetor de inteiros subjacente.", "vetor_inteiros = df[\"uf\"].____"),
          o("Ordene as etapas para otimizar a memória de um grande DataFrame com colunas textuais.", ["Identificar colunas com baixa cardinalidade (poucos valores únicos repetidos em milhares de linhas)","Verificar o consumo atual de RAM com df.memory_usage(deep=True).sum()","Converter as colunas eleitas: df[\"uf\"] = df[\"uf\"].astype(\"category\")","Reavaliar a redução drástica de pegada de memória obtida"], "A tipagem categórica é a forma mais rápida de processar tabelas gigantes em máquinas comuns."),
          p("Associe a propriedade do .cat ao seu papel.", [["serie.cat.categories","Lista de todos os valores únicos conhecidos da categoria"],["serie.cat.codes","Array de inteiros compactos que representam os dados na RAM"],["serie.cat.add_categories([\"Novo\"])","Adiciona uma nova opção permitida à lista de categorias"],["serie.cat.remove_unused_categories()","Descarta rótulos que não aparecem em nenhuma linha atual"]], "Usar o tipo category é o segredo dos cientistas de dados para trabalhar com Big Data no Pandas.")
        ]
      },
      {
        id: "pandas-u4-l5-categorias-ordenadas-e-comparacoes",
        title: "Categorias ordenadas (Ordered Categories) e relações",
        subtitle: "Datas e categorias · Modelando variáveis ordinais com precedência lógica de valores",
        theory: "Determinadas variáveis categóricas possuem ordem intrínseca (ex: escolaridade [\"Médio\", \"Superior\", \"Pós\"] ou gravidade [\"Baixa\", \"Média\", \"Alta\"]). Ao definir pd.Categorical com ordered=True, o Pandas habilita comparações relacionais (<, <=, >, >=) e ordenações lógicas automáticas no DataFrame.",
        questions: [
          q("O que o parâmetro ordered=True define ao instanciar uma variável pd.Categorical?", "Estabelece que as categorias possuem uma hierarquia ordinal lógica (ex: P < M < G)", ["Garante que a tabela fique ordenada em disco","Impede valores nulos"], "ordered=True permite avaliar se uma categoria é maior ou menor que outra matematicamente."),
          q("Se definirmos categorias=[\"Baixa\", \"Média\", \"Alta\"] com ordered=True, o que df[\"gravidade\"] >= \"Média\" faz?", "Filtra corretamente registros com gravidade \"Média\" ou \"Alta\", respeitando a ordem declarada", ["Compara por ordem alfabética de strings","Gera erro de tipo"], "O Pandas utiliza a ordem posicional da lista de categorias em vez da ordem alfabética do texto."),
          q("O que acontece se tentarmos comparar categorias com > em uma coluna categórica com ordered=False?", "Lança uma exceção TypeError informando que categorias não ordenadas não suportam comparação relacional", ["Compara por ordem alfabética","Retorna False"], "Categorias nominais comuns barram comparações relacionais para evitar falsas premissas analíticas."),
          q("Qual método permite reordenar ou alterar a ordem lógica de uma coluna categórica já existente?", "serie.cat.reorder_categories(novas_categorias, ordered=True)", ["serie.sort_cat()","serie.order()"], "reorder_categories ajusta a escala hierárquica sem necessidade de recriar a Series."),
          t("Qual parâmetro booleano torna uma variável categórica formalmente comparável por operadores relacionais?", ["ordered=True","ordered"], "ordered=True habilita relações ordinais.", "pd.Categorical(valores, categories=escala, ____)"),
          g("Complete a criação de categorias ordenadas com a hierarquia declarada.", ["ordered=True"], "ordered=True vincula a precedência à lista.", "pd.Categorical([\"P\", \"G\", \"M\"], categories=[\"P\", \"M\", \"G\"], ____)"),
          o("Ordene as etapas para criar e usar uma coluna ordinal de satisfação de clientes.", ["Definir a lista na ordem de menor para maior: escala = [\"Ruim\", \"Regular\", \"Bom\", \"Excelente\"]","Aplicar à coluna: df[\"nota\"] = pd.Categorical(df[\"nota\"], categories=escala, ordered=True)","Filtrar avaliações positivas com df[df[\"nota\"] >= \"Bom\"]","Ordenar o DataFrame respeitando a qualidade com df.sort_values(\"nota\")"], "Modelar variáveis ordinais explicitamente garante precisão matemática em análises de negócio."),
          p("Associe a configuração ordinal ao seu resultado.", [["Categorias nominais (ordered=False)","Suportam apenas igualdade (==) e desigualdade (!=)"],["Categorias ordinais (ordered=True)","Suportam operadores relacionais (<, <=, >, >=) e min/max"],["df.sort_values(\"tamanho\")","Ordena respeitando a precedência definida em categories"],["serie.min() em ordinal","Retorna a menor categoria na escala hierárquica"]], "Categorias ordenadas eliminam conversões artificiais para números inteiros na modelagem de dados.")
        ]
      }
    ],
    5: [
      {
        id: "pandas-u5-l1-operacoes-vetorizadas-aritmese-logica",
        title: "Operações vetorizadas aritméticas e lógicas entre colunas",
        subtitle: "Transformações · Computação SIMD sobre colunas inteiras com alinhamento de índices",
        theory: "No Pandas, operações aritméticas (+, -, *, /) e lógicas (&, |, ~) entre Series são vetorizadas e executadas em código C compilado de alta performance. Além da velocidade, o Pandas alinha automaticamente as linhas pelos seus índices antes de calcular; rótulos ausentes em um dos lados viram NaN com segurança.",
        questions: [
          q("Por que operações vetorizadas como df[\"total\"] = df[\"preco\"] * df[\"qtd\"] são recomendadas no Pandas?", "Porque executam em loops nativos em C/C++ (SIMD), sendo ordens de magnitude mais rápidas que laços em Python", ["Porque ocupam menos espaço no disco","Porque não exigem importar o Pandas"], "A vetorização processa blocos contínuos de memória dispensando o interpretador Python linha a linha."),
          q("O que acontece se somarmos duas Series com índices desalinhados (ex: s1 tem [A, B] e s2 tem [B, C])?", "O Pandas alinha os índices: o índice B é somado, enquanto A e C recebem NaN por não terem par", ["Lança exceção de tamanho diferente","A soma é descartada"], "O alinhamento automático de índices é um dos diferenciais mais poderosos e seguros do Pandas."),
          q("Quais operadores bitwise devem ser usados para condições lógicas vetorizadas múltiplas no Pandas?", "Os operadores & (E), | (OU) e ~ (NÃO), obrigatoriamente delimitando cada condição com parênteses", ["and, or e not convencionais","&& e ||"], "and/or avaliam o valor da verdade do objeto todo; & e | calculam a operação elemento por elemento."),
          q("Por que os parênteses são obrigatórios ao combinar filtros: (df[\"idade\"] > 18) & (df[\"ativo\"] == True)?", "Porque os operadores bitwise (&, |) possuem precedência maior que os operadores de comparação (>, ==)", ["Por exigência estética do linter","Para criar tuplas"], "Sem parênteses, o Python avaliaria 18 & df[\"ativo\"] antes de comparar a idade, gerando erro."),
          t("Qual operador bitwise representa a conjunção lógica E entre duas condições booleanas no Pandas?", ["&","e comercial"], "& calcula o E lógico elemento por elemento.", "filtro = (df[\"a\"] > 0) ____ (df[\"b\"] < 10)"),
          g("Complete o cálculo vetorizado da nova coluna calculando o valor final com desconto.", ["df[\"preco\"] * (1 - df[\"desconto\"])"], "Operações vetorizadas combinam colunas diretamente.", "df[\"valor_final\"] = ____"),
          o("Ordene a construção de um filtro booleano composto no Pandas.", ["Escrever a primeira condição entre parênteses: (df[\"salario\"] > 5000)","Inserir o operador lógico vetorizado: &","Escrever a segunda condição entre parênteses: (df[\"cargo\"] == \"Engenheiro\")","Passar a máscara composta para o indexador: df.loc[filtro]"], "Estruturar condições com parênteses e operadores bitwise garante filtragem sem erros de sintaxe."),
          p("Associe o operador lógico vetorizado ao seu propósito.", [["(c1) & (c2)","Conjunção lógica: ambas as condições devem ser verdadeiras"],["(c1) | (c2)","Disjunção lógica: pelo menos uma das condições deve ser verdadeira"],["~(condicao)","Negação lógica: inverte os valores da máscara booleana"],["s1.add(s2, fill_value=0)","Soma alinhada substituindo nulos por zero antes de somar"]], "Operações vetorizadas formam o núcleo de performance e elegância analítica no Pandas.")
        ]
      },
      {
        id: "pandas-u5-l2-metodo-apply-funcoes-e-lambdas",
        title: "Transformações flexíveis com apply() e funções lambda",
        subtitle: "Transformações · Aplicando regras customizadas ao longo de linhas ou colunas",
        theory: "Quando cálculos customizados não possuem equivalente vetorizado nativo, o método df.apply(fn) permite despachar uma função ou expressão lambda sobre o conjunto. Em uma Series, aplica a cada valor; em um DataFrame, o parâmetro axis define se a função processa colunas (axis=0) ou linhas inteiras (axis=1).",
        questions: [
          q("O que o método df.apply(fn, axis=1) realiza em um DataFrame?", "Executa a função fn passando cada linha completa da tabela como uma Series individual", ["Aplica a função apenas sobre os nomes das colunas","Exclui as linhas pares"], "axis=1 (ou axis=\"columns\") itera horizontalmente sobre cada registro da tabela."),
          q("Por que deve-se evitar df.apply(axis=1) quando uma operação puder ser vetorizada diretamente?", "Porque apply(axis=1) constrói uma Series Python a cada linha, rodando muito mais lento que código vetorizado", ["Porque apply não aceita números","Porque o apply altera o tipo de dado para texto"], "Iterar sobre linhas no Python perde todas as vantagens de compilação em C e vetorização SIMD."),
          q("Como aplicar uma formatação simples de texto a cada valor de uma Series usando lambda?", "serie.apply(lambda x: f\"R$ {x:.2f}\")", ["serie.map_values(lambda x: ...)","serie.format(lambda x: ...)"], "apply em Series despacha a função escalar para cada elemento sequencialmente."),
          q("O que a chamada df.apply(np.sum, axis=0) retorna?", "Uma Series contendo a soma calculada para cada coluna do DataFrame", ["Um número único","Uma matriz transposta"], "axis=0 aplica a função agregadora descendo verticalmente pelas linhas de cada coluna."),
          t("Qual parâmetro do método apply define que a função deve receber cada linha individual da tabela?", ["axis=1","axis=\"columns\""], "axis=1 instrui a execução horizontal linha a linha.", "df[\"status\"] = df.apply(analisar_risco, ____)"),
          g("Complete a expressão lambda dobrando o valor de cada elemento na Series.", ["lambda x: x * 2"], "Lambdas encapsulam transformações anônimas em linha.", "df[\"dobro\"] = df[\"valor\"].apply(____)"),
          o("Ordene as etapas ao criar uma classificação complexa com apply(axis=1).", ["Definir a função de negócio: def classificar(linha): ...","Acessar os campos necessários na função: linha[\"renda\"] e linha[\"idade\"]","Invocar no DataFrame: df[\"perfil\"] = df.apply(classificar, axis=1)","Verificar a distribuição das novas classes com df[\"perfil\"].value_counts()"], "Apply com funções nomeadas viabiliza regras de negócio complexas com múltiplos atributos."),
          p("Associe a variação do apply ao seu escopo de execução.", [["serie.apply(fn)","Aplica fn elemento a elemento na coluna Series"],["df.apply(fn, axis=0)","Aplica fn coluna a coluna (redução vertical de linhas)"],["df.apply(fn, axis=1)","Aplica fn linha a linha (processa o registro horizontalmente)"],["df.map(fn) (antigo applymap)","Aplica fn elemento a elemento em todas as células do DataFrame"]], "Saber quando usar apply e quando vetorizar distingue o analista júnior do engenheiro de dados.")
        ]
      },
      {
        id: "pandas-u5-l3-metodos-map-e-replace-dicionarios",
        title: "Substituição e mapeamento estruturado com map() e replace()",
        subtitle: "Transformações · Traduzindo códigos e corrigindo termos por dicionários de mapeamento",
        theory: "Para traduzir valores de códigos para rótulos (ex: {\"M\": \"Masculino\", \"F\": \"Feminino\"}), o Pandas provê .map() e .replace(). O método serie.map(dic) substitui valores estritamente mapeados e converte termos não citados em NaN; já df.replace(dic) substitui apenas os termos encontrados, preservando o restante intacto.",
        questions: [
          q("Qual é a diferença de comportamento crucial entre serie.map(dicionario) e serie.replace(dicionario)?", "map converte em NaN qualquer valor não encontrado no dicionário; replace mantém os valores não mapeados inalterados", ["replace apaga as colunas","map só aceita números"], "map é estrito: quem não estiver no dicionário é considerado indefinido (NaN)."),
          q("Como substituir os valores \"SP\" por \"São Paulo\" e \"RJ\" por \"Rio de Janeiro\" preservando os demais estados?", "df[\"uf\"].replace({\"SP\": \"São Paulo\", \"RJ\": \"Rio de Janeiro\"})", ["df[\"uf\"].map({\"SP\": \"São Paulo\", \"RJ\": \"Rio de Janeiro\"})","df[\"uf\"].rename(\"SP\", \"São Paulo\")"], "replace atualiza pontualmente os termos especificados sem corromper as demais siglas do país."),
          q("O método .map() aceita funções normais além de dicionários?", "Sim, .map() em uma Series aceita tanto dicionários quanto funções escalares e lambdas", ["Não, apenas dicionários","Apenas listas"], "map é extremamente versátil para aplicar correspondências diretas ou transformações em Series."),
          q("Como substituir valores nulos ou sentinelas (-999) por NaN em todo o DataFrame de uma só vez?", "df.replace(-999, np.nan)", ["df.clean(-999)","df.nullify(-999)"], "replace sobre o DataFrame substitui sentinelas legadas em todas as colunas simultaneamente."),
          t("Qual método substitui termos em um DataFrame mantendo valores não mencionados intactos?", ["replace","replace()"], "replace substitui mantendo valores originais não citados.", "df[\"status\"] = df[\"status\"].____({\"A\": \"Ativo\"})"),
          g("Complete o mapeamento traduzindo a sigla para o nome por extenso.", ["map"], "map mapeia todas as ocorrências via dicionário.", "df[\"genero\"] = df[\"genero\"].____({\"F\": \"Feminino\", \"M\": \"Masculino\"})"),
          o("Ordene a padronização de categorias com um dicionário de equivalências.", ["Mapear as variações existentes com df[\"plano\"].value_counts()","Construir o dicionário: de_para = {\"prem\": \"Premium\", \"gold\": \"Gold\"}","Aplicar a substituição não-destrutiva: df[\"plano\"] = df[\"plano\"].replace(de_para)","Verificar a consolidação final dos termos saneados"], "Replace centraliza regras de negócio de sinônimos com máxima transparência."),
          p("Associe a ferramenta de substituição ao seu comportamento.", [["serie.map(dict)","Mapeamento total: chaves ausentes no dicionário viram NaN"],["serie.replace(dict)","Substituição parcial: termos não citados no dicionário são preservados"],["df.replace(valor, novo)","Substituição global do valor em todas as células do DataFrame"],["df.replace(regex=True)","Permite substituir padrões textuais utilizando expressões regulares"]], "Trabalhar com map e replace padroniza bases corporativas ruidosas com elegância.")
        ]
      },
      {
        id: "pandas-u5-l4-acessador-str-limpeza-textual",
        title: "O acessador .str: vetorização de strings e expressões regulares",
        subtitle: "Transformações · Limpando espaços, convertendo caixa e extraindo padrões de texto",
        theory: "Colunas de texto no Pandas disponibilizam o acessador vetorizado .str, espelhando os métodos de strings nativas do Python. Funções como .str.strip() removem espaços nas pontas, .str.lower() padronizam caixa, .str.contains(regex) realizam buscas de padrões e .str.extract(regex) extraem dados estruturados.",
        questions: [
          q("Qual acessador do Pandas provê métodos vetorizados para manipulação de colunas de texto?", "O acessador .str (ex: df[\"nome\"].str.upper())", ["O acessador .text","O acessador .string","O acessador .re"], ".str executa operações sobre caracteres de forma vetorizada ignorando nulos (NaN) com segurança."),
          q("Como remover espaços em branco invisíveis no início e no fim de todas as strings de uma coluna?", "df[\"email\"] = df[\"email\"].str.strip()", ["df[\"email\"].trim()","df[\"email\"].strip_all()"], "strip() remove espaços, tabs e quebras de linha nas extremidades de cada texto da coluna."),
          q("O que a chamada df[\"codigo\"].str.contains(r\"^BR-\\d+\", regex=True) avalia?", "Gera uma máscara booleana testando se o texto casa com a expressão regular fornecida", ["Substitui o código por BR","Converte para número"], "contains com regex viabiliza auditorias e filtros sofisticados sobre formatos de dados."),
          q("Qual método do acessador .str divide uma string em várias colunas com base em um delimitador?", "serie.str.split(\"delimitador\", expand=True)", ["serie.str.divide()","serie.str.partition()"], "expand=True transforma as partes geradas pelo split em um novo DataFrame com colunas separadas."),
          t("Qual método do acessador .str converte todos os caracteres da coluna para letras minúsculas?", ["lower","lower()","str.lower","str.lower()"], "lower padroniza caixa baixa.", "df[\"nome\"] = df[\"nome\"].str.____()"),
          g("Complete a remoção de espaços em branco nas pontas dos textos.", ["str.strip()"], "str.strip limpa espaços excedentes.", "df[\"cidade\"] = df[\"cidade\"].____"),
          o("Ordene as etapas de sanitização de uma coluna textual de e-mails.", ["Acessar a coluna de e-mails em formato string","Remover espaços em branco acidentais com .str.strip()","Converter todo o texto para minúsculas com .str.lower()","Validar formato com expressão regular via .str.contains(\"@\")"], "Sanitizar textos logo na carga da base elimina problemas de duplicação por formatação."),
          p("Associe o método do acessador .str à sua função.", [["serie.str.strip()","Remove espaços em branco nas pontas da string"],["serie.str.lower()","Converte todos os caracteres para letras minúsculas"],["serie.str.contains(\"abc\")","Retorna máscara booleana de ocorrência do padrão textual"],["serie.str.split(\",\", expand=True)","Divide o texto criando novas colunas independentes"]], "O acessador .str transforma o Pandas em uma ferramenta incomparável de limpeza de textos.")
        ]
      },
      {
        id: "pandas-u5-l5-one-hot-encoding-get-dummies-cut-qcut",
        title: "Discretização e One-Hot Encoding: get_dummies, cut e qcut",
        subtitle: "Transformações · Preparando variáveis categóricas e contínuas para modelos analíticos",
        theory: "Para preparar dados brutos para algoritmos e modelos, o Pandas provê codificações essenciais. pd.get_dummies() realiza One-Hot Encoding gerando colunas binárias (0/1); pd.cut() discretiza valores contínuos em faixas fixas, e pd.qcut() divide por quantis com frequência balanceada.",
        questions: [
          q("O que a função pd.get_dummies(df, columns=[\"canal\"]) realiza no conjunto de dados?", "One-Hot Encoding: cria novas colunas binárias (0 ou 1) para cada valor único presente na coluna", ["Agrupa a tabela por canal","Remove as duplicatas da coluna"], "Transforma variáveis categóricas qualitativas em matrizes esparsas numéricas legíveis para modelos."),
          q("Qual é a diferença fundamental entre pd.cut() e pd.qcut() na discretização de variáveis contínuas?", "cut() divide por intervalos de valores iguais (amplitude fixa); qcut() divide por quantis com igual número de linhas", ["qcut só aceita datas","cut só aceita inteiros"], "cut define faixas numéricas fixas (ex: 0-18, 18-60); qcut equilibra a distribuição de amostras em cada faixa."),
          q("Como criar três categorias de renda (\"Baixa\", \"Média\", \"Alta\") com igual número de clientes usando qcut?", "pd.qcut(df[\"renda\"], q=3, labels=[\"Baixa\", \"Média\", \"Alta\"])", ["pd.cut(df[\"renda\"], bins=3)","pd.split_data(df[\"renda\"], 3)"], "q=3 com labels nomeia os três tercis da distribuição estatística de forma balanceada."),
          q("Por que o parâmetro drop_first=True é frequentemente utilizado em pd.get_dummies() para regressão linear?", "Para evitar a armadilha da multicolinearidade perfeita (Dummy Variable Trap), eliminando redundância", ["Para diminuir o tempo de compilação","Para não gastar memória RAM"], "A categoria omitida atua como referência de base, evitando matrizes não-invertíveis em regressões."),
          t("Qual função do Pandas converte variáveis categóricas em representação One-Hot Encoding binária?", ["get_dummies","pd.get_dummies"], "get_dummies gera colunas dummy.", "df_binario = pd.____(df, columns=[\"estado\"])"),
          g("Complete a divisão da idade em 4 faixas equilibradas por quantis.", ["q=4"], "q=4 divide os dados em quatro quartis balanceados.", "df[\"faixa\"] = pd.qcut(df[\"idade\"], ____)"),
          o("Ordene a esteira de engenharia de variáveis para preparar a coluna \"idade\".", ["Examinar a distribuição de idades com df[\"idade\"].describe()","Definir faixas lógicas de interesse: limites = [0, 18, 60, 120]","Discretizar a variável contínua com pd.cut(df[\"idade\"], bins=limites, labels=[\"Jovem\", \"Adulto\", \"Idoso\"])","Verificar a contagem em cada faixa com df[\"faixa\"].value_counts()"], "Discretizar e codificar prepara a base para modelagens e regras de negócio com rigor."),
          p("Associe a técnica de transformação ao seu objetivo.", [["pd.get_dummies(...)","One-Hot Encoding que converte categorias em colunas de zeros e uns"],["pd.cut(...)","Discretização de variáveis contínuas em faixas com limites fixos"],["pd.qcut(...)","Discretização baseada em quantis garantindo fatias equilibradas"],["drop_first=True","Elimina a primeira coluna dummy prevenindo multicolinearidade"]], "Dominar get_dummies, cut e qcut conclui a caixa de ferramentas de transformação de features no Pandas.")
        ]
      }
    ],
    6: [
      {
        id: "pandas-u6-l1-padrao-split-apply-combine-groupby",
        title: "O paradigma Split-Apply-Combine com groupby()",
        subtitle: "Groupby e agregações · Dividir, aplicar operações e combinar resultados agregados",
        theory: "O método df.groupby(\"chave\") implementa o padrão Split-Apply-Combine da análise de dados: 1) divide a tabela em grupos homogêneos baseados em valores de uma coluna; 2) aplica uma operação (como média, soma ou contagem) a cada grupo; 3) combina os resultados em uma nova estrutura indexada pelas chaves.",
        questions: [
          q("Quais são as três etapas que compõem o paradigma do método groupby no Pandas?", "Split (dividir os dados em grupos), Apply (aplicar a função em cada grupo) e Combine (unir os resultados)", ["Load, Transform e Export","Filter, Sort e Save"], "O paradigma foi formalizado por Hadley Wickham e é o motor de agregações analíticas modernas."),
          q("O que a execução isolada de df.groupby(\"categoria\") retorna antes de chamar uma função agregadora?", "Um objeto preguiçoso (lazy) do tipo DataFrameGroupBy, aguardando a definição da função agregadora", ["A tabela ordenada","Um DataFrame vazio"], "O agrupamento é preparado na memória e só executa cálculos reais quando a agregação é demandada."),
          q("Como calcular o faturamento médio por filial utilizando a sintaxe mais eficiente no Pandas?", "df.groupby(\"filial\")[\"faturamento\"].mean()", ["df.groupby(\"filial\").mean()[\"faturamento\"]","df[\"faturamento\"].mean_by(\"filial\")"], "Selecionar a coluna antes do método mean() calcula a métrica apenas sobre a coluna de interesse, poupando CPU."),
          q("Por que o resultado de um groupby tem a coluna de agrupamento como índice por padrão?", "Porque as chaves de agrupamento tornam-se os rótulos de identificação únicos das linhas agregadas", ["Por defeito de sintaxe","Para impedir consultas"], "Passar as_index=False no groupby mantém a chave como uma coluna normal comum na tabela resultante."),
          t("Qual método do DataFrame inicia a divisão de dados em grupos para agregação analítica?", ["groupby","groupby()"], "groupby divide a tabela em grupos.", "agrupado = df.____(\"departamento\")"),
          g("Complete o agrupamento mantendo a coluna agrupada como coluna comum e não como índice.", ["as_index=False"], "as_index=False preserva as colunas na tabela.", "df.groupby(\"loja\", ____)[\"vendas\"].sum()"),
          o("Ordene as etapas do ciclo Split-Apply-Combine ao calcular a média salarial por departamento.", ["Identificar a coluna categórica de agrupamento: \"departamento\"","Criar os grupos na memória: grupo = df.groupby(\"departamento\")","Selecionar a coluna numérica e aplicar a média: medias = grupo[\"salario\"].mean()","Receber a Series resultante contendo a média calculada para cada setor"], "Split-Apply-Combine organiza relatórios analíticos de alta densidade em poucas linhas."),
          p("Associe o componente do groupby ao seu papel.", [["df.groupby(\"cidade\")","Split: divide o conjunto em grupos por localidade"],["[\"vendas\"].sum()","Apply & Combine: soma as vendas de cada cidade e junta em uma Series"],["as_index=False","Configuração que impede a chave de virar índice no resultado final"],["df.groupby([\"ano\", \"mes\"])","Agrupamento multidimensional composto por mais de uma chave"]], "Compreender Split-Apply-Combine é o núcleo conceitual do processamento analítico no Pandas.")
        ]
      },
      {
        id: "pandas-u6-l2-agregacoes-multiplas-com-agg",
        title: "Agregações customizadas e múltiplas com o método agg()",
        subtitle: "Groupby e agregações · Calculando métricas simultâneas com listas e dicionários por coluna",
        theory: "O método .agg() permite executar múltiplos cálculos estatísticos em uma única passagem de agrupamento. Passando uma lista (.agg([\"min\", \"max\", \"mean\"])), calcula todas as métricas sobre as colunas; passando um dicionário (.agg({\"preco\": \"mean\", \"qtd\": \"sum\"})), atribui regras específicas para cada coluna.",
        questions: [
          q("Qual é o benefício primário de usar .agg() em vez de chamar métodos como .mean() isoladamente?", "Permite calcular simultaneamente diversas métricas estatísticas diferentes em uma única passada pelos dados", ["Executa o código em segundo plano","Cria gráficos automáticos"], ".agg() centraliza a computação de somatórios, médias, desvios e contagens de forma coesa e eficiente."),
          q("Como calcular a média, o mínimo e o máximo da coluna \"preco\" agrupada por \"setor\"?", "df.groupby(\"setor\")[\"preco\"].agg([\"mean\", \"min\", \"max\"])", ["df.groupby(\"setor\")[\"preco\"].stats(\"mean\", \"min\", \"max\")","df.agg_all()"], "Passar uma lista de strings nomeia as funções estatísticas que serão aplicadas à coluna selecionada."),
          q("Como aplicar somatório na coluna \"vendas\" e média na coluna \"desconto\" em um único groupby?", "df.groupby(\"regiao\").agg({\"vendas\": \"sum\", \"desconto\": \"mean\"})", ["df.groupby(\"regiao\").agg(\"vendas\", \"desconto\")","df.multi_agg()"], "O dicionário permite mapear de forma explícita qual cálculo deve ser computado em cada coluna."),
          q("É permitido passar funções Python customizadas (incluindo lambdas) para o método .agg()?", "Sim, .agg() aceita tanto nomes padrão de funções em string quanto funções Python customizadas ou lambdas", ["Não, apenas funções nativas do Pandas","Apenas no Python 3.12+"], "Funções personalizadas recebem a Series do grupo e devem retornar um único valor escalar agregado."),
          t("Qual método de agregação do Pandas recebe listas e dicionários de métricas estatísticas?", ["agg","agg()","aggregate","aggregate()"], "agg centraliza agregações múltiplas.", "resumo = df.groupby(\"categoria\").____([\"mean\", \"count\"])"),
          g("Complete a agregação diferenciada passando o dicionário de cálculos por coluna.", ["{\"total\": \"sum\", \"avaliacao\": \"mean\"}"], "Dicionários direcionam métricas específicas para cada coluna.", "df.groupby(\"loja\").agg(____)"),
          o("Ordene a construção de uma tabela analítica com múltiplos indicadores com .agg().", ["Definir a agregação: metricas = {\"preco\": [\"mean\", \"std\"], \"quantidade\": \"sum\"}","Agrupar pelo segmento de produto: grupo = df.groupby(\"segmento\")","Disparar os cálculos consolidados: relatorio = grupo.agg(metricas)","Aplanar colunas hierárquicas se necessário para exportação"], "O método .agg() consolida painéis executivos completos com clareza declarativa."),
          p("Associe a estrutura do .agg ao resultado obtido.", [[".agg([\"mean\", \"std\"])","Gera colunas lado a lado com média e desvio padrão para a mesma variável"],[".agg({\"a\": \"sum\", \"b\": \"max\"})","Calcula soma apenas na coluna a e valor máximo apenas na coluna b"],[".agg(amplitude=lambda x: x.max() - x.min())","Calcula métrica customizada nomeando a nova coluna diretamente"],["MultiIndex em colunas no resultado","Estrutura gerada ao aplicar múltiplas agregações sobre várias colunas"]], "Agregações compostas com .agg() formam a espinha dorsal de relatórios estatísticos corporativos.")
        ]
      },
      {
        id: "pandas-u6-l3-transformacoes-de-grupo-com-transform",
        title: "Transformações de grupo preservando dimensões com transform()",
        subtitle: "Groupby e agregações · Normalizando dados pelo grupo sem reduzir o número de linhas",
        theory: "Diferente de .agg() que colapsa cada grupo em uma única linha resumida, o método .transform() executa a operação no grupo e expande o resultado de volta para o formato original do DataFrame. Isso viabiliza comparar cada registro individual contra a média ou soma de seu próprio grupo (ex: desvio da média local).",
        questions: [
          q("Qual é a diferença fundamental entre .agg() e .transform() após um groupby?", "agg() colapsa os grupos em linhas únicas; transform() retorna uma Series com o mesmo tamanho (shape) original", ["transform só funciona com strings","agg duplica as linhas"], "transform devolve o valor calculado do grupo broadcasted para cada linha original correspondente."),
          q("Como calcular a média salarial do departamento de cada funcionário e gravar na própria linha original?", "df[\"media_depto\"] = df.groupby(\"departamento\")[\"salario\"].transform(\"mean\")", ["df[\"media_depto\"] = df.groupby(\"departamento\")[\"salario\"].mean()","df[\"media_depto\"] = df.mean_by()"], "Como o retorno de transform tem o mesmo índice e tamanho da tabela original, a atribuição é direta."),
          q("Como padronizar (Z-score) os salários dentro de cada filial subtraindo a média local e dividindo pelo desvio?", "df.groupby(\"filial\")[\"salario\"].transform(lambda x: (x - x.mean()) / x.std())", ["df[\"salario\"].std()","df.normalize()"], "Transformar por grupo viabiliza normalização de features mantendo as particularidades de cada cluster."),
          q("Como imputar dados ausentes em uma coluna utilizando a média específica de cada categoria?", "df[\"valor\"] = df[\"valor\"].fillna(df.groupby(\"categoria\")[\"valor\"].transform(\"mean\"))", ["df[\"valor\"].fillna(\"mean\")","df.fillna_by_group()"], "Combinar fillna com transform aplica imputação contextualizada respeitando os estratos do negócio."),
          t("Qual método do groupby retorna uma estrutura com o mesmo número de linhas da tabela original?", ["transform","transform()"], "transform expande o cálculo para todas as linhas.", "df[\"soma_grupo\"] = df.groupby(\"cat\")[\"val\"].____(\"sum\")"),
          g("Complete o cálculo da porcentagem que cada venda representa no total de sua respectiva filial.", ["df.groupby(\"filial\")[\"valor\"].transform(\"sum\")"], "Dividir pelo transform expressa a fatia do registro no grupo.", "df[\"pct_filial\"] = df[\"valor\"] / ____"),
          o("Ordene a detecção de funcionários que ganham acima da média do seu setor com transform.", ["Calcular a média local de cada setor: df[\"media_setor\"] = df.groupby(\"setor\")[\"salario\"].transform(\"mean\")","Criar a coluna de diferença: df[\"dif\"] = df[\"salario\"] - df[\"media_setor\"]","Filtrar colaboradores com desvio positivo: acima = df[df[\"dif\"] > 0]","Exportar lista de talentos para auditoria de remuneração"], "Transform é a ferramenta mais elegante do Pandas para análises contextuais por estrato."),
          p("Associe o método de agrupamento ao seu formato de saída.", [["df.groupby(\"g\")[\"v\"].mean()","Retorna Series reduzida com uma única linha para cada grupo único"],["df.groupby(\"g\")[\"v\"].transform(\"mean\")","Retorna Series com mesmo shape original do DataFrame"],["Imputação contextualizada","Uso clássico de transform preenchendo vazios com a média do setor"],["Cálculo de percentual relativo","Divisão do valor da linha pelo total transformado da categoria"]], "Dominar .transform() eleva a capacidade analítica para além de simples resumos tabulares.")
        ]
      },
      {
        id: "pandas-u6-l4-filtragem-de-grupos-com-filter",
        title: "Filtragem condicional de grupos inteiros com filter()",
        subtitle: "Groupby e agregações · Descartando grupos completos que não atendem a critérios agregados",
        theory: "Enquanto a indexação booleana comum filtra linhas isoladas, o método groupby.filter(fn) descarta ou preserva grupos inteiros com base em uma condição agregada. A função booleana recebe o DataFrame do grupo como argumento; se retornar True, todas as linhas daquele grupo são mantidas na tabela final.",
        questions: [
          q("O que o método groupby.filter(fn) faz em um DataFrame no Pandas?", "Filtra e preserva apenas os grupos inteiros cuja condição agregada avalie como verdadeira (True)", ["Filtra apenas as colunas pares","Ordena os grupos por tamanho"], "Se o grupo for aprovado pela função de filtro, todas as suas linhas originais sobrevivem no resultado."),
          q("Como manter apenas os dados de departamentos que possuam mais de 5 colaboradores registrados?", "df.groupby(\"depto\").filter(lambda g: len(g) > 5)", ["df[df[\"depto\"].count() > 5]","df.filter(depto_count > 5)"], "A função recebe cada sub-tabela g; len(g) > 5 testa se o efetivo do departamento supera 5 membros."),
          q("Como filtrar e reter apenas as cidades cujo faturamento total somado supere R$ 100.000?", "df.groupby(\"cidade\").filter(lambda g: g[\"faturamento\"].sum() > 100000)", ["df.filter(\"faturamento > 100000\")","df.groupby(\"cidade\").having(sum > 100000)"], "Grupos com soma inferior a 100.000 são eliminados integralmente do conjunto."),
          q("Qual cláusula do SQL clássico equivale conceitualmente ao método groupby.filter() do Pandas?", "A cláusula HAVING (ex: GROUP BY depto HAVING COUNT(*) > 5)", ["A cláusula WHERE","A cláusula JOIN","A cláusula ORDER BY"], "WHERE filtra linhas antes do agrupamento; HAVING filtra grupos após o agrupamento, igual ao filter()."),
          t("Qual método descarta grupos completos com base no teste booleano de suas métricas agregadas?", ["filter","filter()"], "filter descarta grupos com base em predicados agregados.", "apenas_grandes = df.groupby(\"loja\").____(lambda g: len(g) >= 10)"),
          g("Complete o filtro retendo apenas grupos com média de avaliação superior a 4 estrelas.", ["g[\"nota\"].mean() > 4.0"], "O predicado testa a média agregada do subconjunto.", "df.groupby(\"produto\").filter(lambda g: ____)"),
          o("Ordene a esteira de exclusão de categorias com poucas amostras para treino estatístico.", ["Agrupar os dados por categoria de produto: df.groupby(\"categoria\")","Definir o filtro de suficiência amostral: lambda grupo: len(grupo) >= 30","Aplicar o filtro: df_filtrado = df.groupby(\"categoria\").filter(lambda g: len(g) >= 30)","Verificar com df_filtrado[\"categoria\"].value_counts() que categorias raras sumiram"], "Garantir tamanho mínimo de grupo protege modelos contra instabilidade e overfitting em amostras minúsculas."),
          p("Associe o método de filtragem ao seu escopo de corte.", [["df[df[\"valor\"] > 100]","Filtro linha a linha: descarta linhas isoladas que não atendem a regra"],["df.groupby(\"g\").filter(fn)","Filtro por grupo (HAVING): preserva ou descarta o grupo inteiro"],["lambda g: len(g) > N","Critério de tamanho amostral mínimo por grupo"],["lambda g: g[\"erro\"].sum() == 0","Preserva apenas grupos que não tiveram nenhum erro registrado"]], "O método filter fecha a tríade do agrupamento no Pandas ao lado de agg e transform.")
        ]
      },
      {
        id: "pandas-u6-l5-pivot-table-e-crosstab-matrizes-cruzadas",
        title: "Tabelas dinâmicas com pivot_table() e tabulação cruzada com crosstab()",
        subtitle: "Groupby e agregações · Construindo matrizes multidimensionais cruzadas e frequências relativas",
        theory: "Para visualização executiva cruzada em duas dimensões, o Pandas provê pd.pivot_table() e pd.crosstab(). pivot_table() sintetiza valores com agregações customizadas (index, columns, values e aggfunc); já pd.crosstab() é especializada em contagens de frequência conjunta, permitindo normalização em percentuais.",
        questions: [
          q("Quais são os quatro argumentos fundamentais utilizados ao invocar pd.pivot_table()?", "index (linhas), columns (colunas), values (métrica a calcular) e aggfunc (função de agregação)", ["x, y, z e w","start, stop, step e data"], "Essa estrutura espelha a tradicional tabela dinâmica do Excel com máxima flexibilidade programática."),
          q("Qual é a função de agregação padrão utilizada por pd.pivot_table() se o parâmetro aggfunc for omitido?", "A média aritmética (aggfunc=\"mean\")", ["A soma (\"sum\")","A contagem (\"count\")"], "Por padrão analítico, tabelas dinâmicas no Pandas calculam a média das células cruzadas."),
          q("Quando utilizar pd.crosstab() em vez de pd.pivot_table()?", "Para calcular frequências de ocorrência e contagens conjuntas entre duas variáveis categóricas puras", ["Apenas para números decimais","Quando não houver colunas de texto"], "crosstab é a ferramenta estatística canônica para tabelas de contingência e testes de qui-quadrado."),
          q("Como exibir os percentuais relativos em vez de contagens absolutas em um pd.crosstab()?", "Passando o parâmetro normalize=True (ou normalize=\"index\" / normalize=\"columns\")", ["Usando as_percent=True","Dividindo por 100 manualmente"], "normalize projeta a matriz de contingência para percentuais marginais ou globais."),
          t("Qual função do Pandas gera tabelas dinâmicas multidimensionais agregadas?", ["pivot_table","pd.pivot_table"], "pivot_table cria matrizes dinâmicas multidimensionais.", "tabela = pd.____(df, index=\"regiao\", columns=\"ano\", values=\"vendas\")"),
          g("Complete a tabela dinâmica somando o faturamento cruzado de região e categoria.", ["aggfunc=\"sum\""], "aggfunc define a métrica matemática consolidada.", "pd.pivot_table(df, index=\"regiao\", columns=\"cat\", values=\"valor\", ____)"),
          o("Ordene a criação de uma matriz de contingência normalizada com crosstab.", ["Identificar as duas variáveis categóricas de interesse: \"escolaridade\" e \"faixa_renda\"","Invocar a tabulação cruzada com pd.crosstab(df[\"escolaridade\"], df[\"faixa_renda\"])","Ativar normalização por linha com normalize=\"index\" para ver proporções internas","Multiplicar por 100 e formatar para apresentação executiva"], "Matrizes de contingência revelam correlações e padrões distributivos com clareza cristalina."),
          p("Associe a ferramenta analítica à sua finalidade.", [["pd.pivot_table(...)","Tabela dinâmica que sintetiza métricas numéricas cruzadas por eixos"],["pd.crosstab(...)","Tabela de contingência para contagem de frequências conjuntas"],["margins=True","Adiciona totais gerais de linhas e colunas (All / Total) na tabela"],["normalize=\"index\"","Converte contagens em percentuais somando 100% em cada linha"]], "Dominar pivot_table e crosstab conclui com maestria a manipulação de agregações no Pandas.")
        ]
      }
    ],
    7: [
      {
        id: "pandas-u7-l1-juncoes-relacionais-pd-merge",
        title: "Junções relacionais com pd.merge(): inner, left, right e outer",
        subtitle: "Merge e cardinalidade · Integrando tabelas através de chaves relacionais no estilo SQL",
        theory: "A função pd.merge() realiza junções relacionais entre DataFrames de modo análogo ao JOIN do SQL. O parâmetro how define o tipo de união: \"inner\" (interseção de chaves), \"left\" (todas da esquerda), \"right\" (todas da direita) e \"outer\" (união total com NaNs onde não houver correspondência de chave).",
        questions: [
          q("Qual é o comportamento padrão de pd.merge(df1, df2) quando o parâmetro how é omitido?", "Executa uma junção interna (inner join), preservando apenas as linhas com chaves presentes em ambas as tabelas", ["Preserva todas as linhas da esquerda","Concatena as tabelas sem chave"], "Inner join descarta registros que não encontram par em ambos os lados por padrão."),
          q("Como especificar a coluna de chave de relacionamento quando ela possui nomes diferentes em cada tabela?", "pd.merge(df1, df2, left_on=\"id_cliente\", right_on=\"cod_cliente\")", ["pd.merge(df1, df2, keys=[\"id\", \"cod\"])","pd.merge(df1, df2, on_diff=True)"], "left_on e right_on mapeiam as chaves nominais divergentes sem necessidade de renomear colunas previamente."),
          q("Qual parâmetro adiciona uma coluna sentinela informando se o registro veio de left, right ou both?", "indicator=True (cria a coluna especial _merge)", ["source=True","origin=True","audit=True"], "indicator=True é essencial em auditorias de ETL para saber quais chaves falharam no cruzamento."),
          q("O que acontece se as tabelas possuírem colunas com nomes idênticos que não são chaves de junção?", "O Pandas anexa sufixos automáticos (ex: valor_x e valor_y), configuráveis via parâmetro suffixes=(\"_cli\", \"_ped\")", ["Lança erro de coluna duplicada","Sobrescreve a coluna da esquerda"], "suffixes desambigua atributos homônimos preservando os dados de ambas as origens."),
          t("Qual função do Pandas executa junções relacionais entre dois DataFrames com base em chaves?", ["merge","pd.merge"], "pd.merge realiza junções relacionais completas.", "unificado = pd.____(clientes, pedidos, on=\"id\")"),
          g("Complete a junção mantendo todos os clientes mesmo os que não têm compras registradas.", ["how=\"left\""], "left join preserva integralmente a tabela da esquerda.", "pd.merge(clientes, pedidos, on=\"id_cliente\", ____)"),
          o("Ordene a mecânica de execução de um Left Join entre clientes e vendas.", ["Identificar a chave comum presente em ambos os DataFrames: \"cliente_id\"","Definir a junção: resultado = pd.merge(clientes, vendas, on=\"cliente_id\", how=\"left\")","Manter todas as linhas do cadastro de clientes intactas","Preencher com NaN os dados de vendas para clientes sem compras"], "Left joins asseguram que a base primária não perca registros ao cruzar com tabelas dependentes."),
          p("Associe o tipo de junção (how) ao seu resultado relacional.", [["how=\"inner\"","Interseção estrita: mantém apenas registros com chaves coincidentes em ambos"],["how=\"left\"","Preserva todas as linhas da tabela esquerda preenchendo ausências com NaN"],["how=\"right\"","Preserva todas as linhas da tabela direita preenchendo ausências com NaN"],["how=\"outer\"","União completa: mantém todas as linhas de ambos os lados preenchendo NaNs"]], "Dominar o pd.merge é a habilidade mais exigida em engenharia de dados com Pandas.")
        ]
      },
      {
        id: "pandas-u7-l2-validacao-de-cardinalidade-validate",
        title: "Auditoria de cardinalidade com o parâmetro validate",
        subtitle: "Merge e cardinalidade · Prevenindo explosão cartesiana e chaves duplicadas acidentais",
        theory: "Um dos bugs mais silenciosos em merges é a explosão cartesiana (duplicação de linhas) por chaves repetidas em relações de 1 para N. O parâmetro validate de pd.merge() valida a cardinalidade relacional antes do cruzamento: \"one_to_one\", \"one_to_many\" ou \"many_to_one\", lançando MergeError em caso de violação.",
        questions: [
          q("Qual perigo grave o parâmetro validate de pd.merge() previne durante junções de dados?", "Explosão de registros (multiplicação indesejada de linhas) provocada por duplicatas inesperadas nas chaves", ["Erros de formatação de string","Exclusão do arquivo original"], "Se a chave tiver repetições acidentais, o merge comum duplica linhas silenciosamente corrompendo métricas."),
          q("O que validate=\"1:1\" (ou \"one_to_one\") exige estritamente das tabelas participantes do merge?", "Que as chaves de junção sejam únicas e sem nenhuma duplicata tanto na tabela esquerda quanto na direita", ["Que as tabelas tenham o mesmo número de colunas","Que não existam nulos"], "Valida que a relação é de um para um rigorosamente, falhando se houver qualquer duplicação."),
          q("Qual exceção o Pandas lança se a regra de cardinalidade especificada em validate for violada?", "pandas.errors.MergeError", ["KeyError","ValueError comum","SystemError"], "MergeError interrompe o pipeline de ETL imediatamente antes que métricas infladas sejam calculadas."),
          q("Se quisermos cruzar a tabela de Clientes (1) com a tabela de Pedidos (N), qual validate devemos declarar?", "validate=\"one_to_many\" (ou \"1:m\")", ["validate=\"many_to_many\"","validate=\"1:1\""], "Exige que cada cliente apareça uma única vez na esquerda, permitindo múltiplas compras na direita."),
          t("Qual classe de exceção do Pandas é disparada quando validate detecta quebra de cardinalidade?", ["MergeError","pandas.errors.MergeError"], "MergeError sinaliza violação de unicidade.", "except pd.errors.____: tratar_duplicata()"),
          g("Complete o merge validando que a tabela esquerda tem chaves únicas para múltiplos registros da direita.", ["validate=\"1:m\""], "1:m valida relação de um para muitos.", "pd.merge(usuarios, acessos, on=\"id\", ____)"),
          o("Ordene a esteira de auditoria de integridade relacional com validate.", ["Identificar a cardinalidade esperada pelo modelo conceitual de dados (ex: 1 para 1)","Executar a junção declarando validate=\"one_to_one\"","O Pandas inspeciona a unicidade das chaves antes de combinar as linhas","Se houver chaves repetidas, o processo aborta emitindo MergeError detalhado"], "Auditar cardinalidade impede que relatórios financeiros sofram duplicações catastróficas."),
          p("Associe o parâmetro validate à regra relacional aplicada.", [["validate=\"one_to_one\"","Garante unicidade estrita da chave na esquerda e na direita"],["validate=\"one_to_many\"","Exige chaves únicas na esquerda, permitindo repetições na direita"],["validate=\"many_to_one\"","Permite repetições na esquerda, exigindo chaves únicas na direita"],["validate=\"many_to_many\"","Permite repetições em ambos os lados (sem validação de unicidade)"]], "Usar validate em todos os merges é o diferencial do engenheiro de dados sênior.")
        ]
      },
      {
        id: "pandas-u7-l3-concatenacao-pd-concat-eixos",
        title: "Concatenação de estruturas com pd.concat(): eixos e chaves",
        subtitle: "Merge e cardinalidade · Empilhando lotes de linhas e unindo tabelas horizontalmente",
        theory: "A função pd.concat([df1, df2]) combina múltiplos DataFrames em uma única estrutura contígua. Com axis=0 (padrão), empilha lotes de linhas verticalmente; com axis=1, anexa colunas horizontalmente alinhadas pelo índice. O parâmetro ignore_index=True reconstrói o índice sequencial numérico limpo.",
        questions: [
          q("Qual é a diferença fundamental entre pd.concat() e pd.merge() no Pandas?", "concat une tabelas colando blocos por eixos físicos (0 ou 1); merge cruza dados baseado em chaves relacionais", ["concat funciona apenas com números","merge só aceita duas linhas"], "concat empilha ou justapõe estruturas; merge realiza correspondência semântica de valores de chaves."),
          q("O que acontece se concatenarmos verticalmente (axis=0) dois DataFrames com colunas diferentes?", "O resultado conterá a união de todas as colunas, preenchendo com NaN nas posições onde a outra tabela não tinha a coluna", ["Lança erro de incompatibilidade de colunas","Descarta as colunas diferentes"], "concat realiza uma união externa (outer join) de colunas por padrão."),
          q("Por que é altamente recomendável passar ignore_index=True ao empilhar arquivos mensais com pd.concat()?", "Para evitar que os índices de linhas repetidos (0, 1, 2...) de cada arquivo gerem duplicatas no índice final", ["Para acelerar a leitura do disco","Para ordenar as datas"], "ignore_index descarta os índices originais e cria um RangeIndex contínuo de 0 até N-1."),
          q("Como criar um MultiIndex que identifique a origem de cada lote no DataFrame concatenado?", "Passando o parâmetro keys=[\"jan\", \"fev\", \"mar\"]: pd.concat([df1, df2, df3], keys=[...])", ["Passando tags=[\"jan\", \"fev\"]","Usando add_source=True"], "O parâmetro keys rotula cada subconjunto adicionando um nível superior hierárquico no índice."),
          t("Qual parâmetro de pd.concat reconstrói o índice do zero evitando rótulos duplicados?", ["ignore_index=True","ignore_index"], "ignore_index zera a contagem de linhas.", "unificado = pd.concat(lotes, ____)"),
          g("Complete a concatenação de múltiplos DataFrames de vendas mensais.", ["pd.concat"], "concat consolida listas de DataFrames.", "ano_completo = ____([jan, fev, mar], ignore_index=True)"),
          o("Ordene as etapas para consolidar múltiplos arquivos CSV de uma pasta em um único DataFrame.", ["Ler todos os arquivos da pasta para uma lista de DataFrames em memória: lista_dfs","Verificar se todas as tabelas possuem as colunas mínimas compatíveis","Consolidar em bloco único com pd.concat(lista_dfs, ignore_index=True)","Auditar o volume total consolidado com df_final.shape"], "Concatenar uma lista completa de uma só vez é infinitamente mais veloz que concatenar em laço."),
          p("Associe a configuração do pd.concat ao seu efeito estrutural.", [["pd.concat([d1, d2], axis=0)","Empilhamento vertical: adiciona novas linhas ao conjunto"],["pd.concat([d1, d2], axis=1)","Justaposição horizontal: adiciona novas colunas lado a lado"],["ignore_index=True","Gera nova numeração sequencial de 0 a N-1 no índice"],["pd.concat(..., join=\"inner\")","Mantém apenas as colunas presentes em todos os DataFrames"]], "pd.concat é o comando mestre para ingestão de lotes em loteamentos de data lakes.")
        ]
      },
      {
        id: "pandas-u7-l4-juncao-por-indices-com-join",
        title: "Junção orientada a índices com o método df.join()",
        subtitle: "Merge e cardinalidade · Cruzamento conciso quando as chaves residem no próprio índice",
        theory: "O método df.join() é um atalho especializado para cruzar DataFrames utilizando diretamente seus índices de linha como chaves. Ele executa Left Join por padrão e exige os parâmetros lsuffix e rsuffix para desambiguar colunas que compartilham o mesmo nome em ambas as tabelas sem causar colisão.",
        questions: [
          q("Qual é a diferença de propósito entre df.join() e pd.merge() no Pandas?", "df.join() cruza primariamente utilizando os índices das tabelas; pd.merge() cruza primariamente por colunas", ["df.join() é mais lento","df.join() só aceita listas"], "join() foi desenhado para tabelas que já possuem chaves primárias promovidas a index."),
          q("Qual tipo de junção o método df.join(outro) executa por padrão?", "Left Join (how=\"left\")", ["Inner Join","Outer Join","Right Join"], "Ao contrário de pd.merge() que faz inner por padrão, join() preserva toda a tabela da esquerda por default."),
          q("Por que o método df.join() lança erro se houver colunas com o mesmo nome sem lsuffix ou rsuffix?", "Porque não consegue desambiguar as colunas sobrepostas sem os sufixos explícitos do desenvolvedor", ["Porque o Pandas proíbe nomes iguais","Porque o índice é apagado"], "Exige lsuffix=\"_esq\" e rsuffix=\"_dir\" para renomear colunas colidentes de forma determinística."),
          q("Como cruzar uma coluna do DataFrame esquerdo contra o índice do DataFrame direito com join()?", "df_esq.join(df_dir, on=\"id_categoria\")", ["df_esq.join(df_dir, by_index=True)","df_esq.merge_index(df_dir)"], "O parâmetro on indica que a coluna da esquerda deve casar com o índice estruturado da direita."),
          t("Qual método do DataFrame cruza tabelas utilizando os índices de linhas por padrão?", ["join","join()"], "join opera sobre os índices das estruturas.", "resultado = clientes.____(enderecos, how=\"inner\")"),
          g("Complete a resolução de colisão de colunas homônimas com sufixos explícitos.", ["lsuffix=\"_cli\", rsuffix=\"_ped\""], "lsuffix e rsuffix nomeiam colunas duplicadas.", "clientes.join(pedidos, ____)"),
          o("Ordene o fluxo de união rápida de tabelas com índices configurados.", ["Definir a chave primária como índice em ambas as tabelas com set_index(\"id\")","Invocar a junção direta com df1.join(df2)","Compilador alinha os índices instantaneamente em C","Receber o DataFrame consolidado mantendo o índice original"], "df.join() oferece uma das sintaxes mais limpas e compactas do ecossistema Pandas."),
          p("Associe o método à sua convenção de junção padrão.", [["df.join(outro)","Cruza por índices e aplica Left Join por padrão"],["pd.merge(df1, df2)","Cruza por colunas comuns e aplica Inner Join por padrão"],["lsuffix=\"_x\"","Sufixo anexado às colunas colidentes da tabela esquerda"],["join(..., on=\"chave\")","Cruza a coluna \"chave\" da esquerda com o index da direita"]], "Usar join() com índices preparados simplifica código analítico em pipelines limpos.")
        ]
      },
      {
        id: "pandas-u7-l5-fusao-temporal-merge-asof-e-combine-first",
        title: "Fusão temporal com merge_asof() e fallback com combine_first()",
        subtitle: "Merge e cardinalidade · Cruzando eventos assíncronos pelo carimbo mais próximo no tempo",
        theory: "Em dados do mundo real (cotações, logs e telemetria), eventos nunca ocorrem no exato mesmo milissegundo. A função pd.merge_asof() realiza fusão temporal pelo carimbo mais próximo anterior (direction=\"backward\"). Já o método df1.combine_first(df2) preenche nulos de df1 com dados de df2 como plano de contingência.",
        questions: [
          q("Qual problema do mundo real a função pd.merge_asof() resolve em séries temporais?", "Cruza registros que ocorreram em momentos próximos mas não exatamente no mesmo milissegundo", ["Ordena tabelas por ordem alfabética","Remove duplicatas em textos"], "merge_asof casa cada evento com a última cotação ou medição anterior disponível no tempo."),
          q("Qual é o pré-requisito estrito para executar pd.merge_asof(t1, t2, on=\"timestamp\")?", "Ambos os DataFrames devem estar rigorosamente ordenados pela coluna de tempo especificada", ["Devem ter o mesmo número de linhas","Não podem ter números float"], "O algoritmo de busca binária temporal do merge_asof exige ordenação cronológica obrigatória."),
          q("O que o método df1.combine_first(df2) realiza entre dois DataFrames?", "Preenche os valores ausentes (NaN) de df1 com os valores correspondentes de df2 como fallback", ["Substitui todas as colunas de df1","Exclui as linhas em comum"], "Atua como coalescência tabular: usa os dados de df1, recorrendo a df2 apenas onde houver nulo."),
          q("O que o parâmetro tolerance=pd.Timedelta(\"5m\") define em pd.merge_asof()?", "A janela máxima aceitável de tolerância temporal; se não houver evento em até 5 minutos, retorna NaN", ["O tempo de espera da CPU","O intervalo de autosave"], "tolerance impede cruzar dados obsoletos ocorridos há horas ou dias do evento de interesse."),
          t("Qual função do Pandas cruza dados temporais assíncronos pela observação mais próxima?", ["merge_asof","pd.merge_asof"], "merge_asof realiza junções temporais aproximadas.", "dados = pd.____(transacoes, cotacoes, on=\"hora\")"),
          g("Complete o fallback preenchendo lacunas do primeiro cadastro com os dados do cadastro reserva.", ["combine_first"], "combine_first atua como plano B para dados nulos.", "cadastro_final = cadastro_novo.____(cadastro_antigo)"),
          o("Ordene as etapas para associar cada ordem de compra à última cotação do ativo com merge_asof.", ["Ordenar ambas as tabelas cronologicamente: df_ordens.sort_values(\"timestamp\")","Ordenar a tabela de cotações de mercado: df_cotas.sort_values(\"timestamp\")","Executar a junção temporal aproximada com pd.merge_asof(df_ordens, df_cotas, on=\"timestamp\", by=\"ticker\")","Receber a ordem de compra vinculada ao preço de mercado vigente no exato momento da execução"], "merge_asof é a joia da engenharia financeira de alta frequência e telemetria de sensores no Pandas."),
          p("Associe a ferramenta ao seu caso de uso.", [["pd.merge_asof(...)","Junção temporal pela medição anterior mais próxima no tempo"],["direction=\"backward\"","Busca a última observação no passado relativo ao evento"],["tolerance=pd.Timedelta(\"1s\")","Limita a janela temporal máxima de busca do evento"],["df.combine_first(outro)","Preenche vazios de uma tabela com os valores de outra"]], "Dominar merge_asof e combine_first posiciona o profissional no topo da engenharia com Pandas.")
        ]
      }
    ],
    8: [
      {
        id: "pandas-u8-l1-method-chaining-e-metodo-pipe",
        title: "Encadeamento de métodos (Method Chaining) e o método pipe()",
        subtitle: "Pipeline de limpeza · Criando esteiras de dados funcionais, legíveis e sem variáveis temporárias",
        theory: "O encadeamento de métodos (Method Chaining) estrutura transformações de dados em uma sequência fluente entre parênteses: (df.dropna().assign(...).sort_values(...)). Para integrar funções customizadas de engenharia de forma declarativa na cadeia, o Pandas provê o método df.pipe(funcao_limpeza).",
        questions: [
          q("Qual é o benefício do padrão Method Chaining na construção de pipelines de dados no Pandas?", "Aumenta a legibilidade, elimina dezenas de variáveis intermediárias descartáveis e expressa o fluxo lógico", ["Reduz o uso de memória em 100%","Gera código executável em C"], "Encadear operações documenta visualmente a esteira de transformações do dado bruto até o resultado limpo."),
          q("Como o método df.pipe(funcao_customizada, *args, **kwargs) opera no encadeamento?", "Passa o próprio DataFrame atual como primeiro argumento para a função customizada, retornando o resultado para a cadeia", ["Executa a função em subprocesso do OS","Cria um pipe IPC no Linux"], "pipe() atua como adaptador que permite plugar qualquer função Python dentro da cadeia fluente."),
          q("Qual método deve ser utilizado dentro de uma cadeia para criar ou sobrescrever colunas sem quebrar o encadeamento?", "O método df.assign(nova_coluna=...)", ["df.create_column()","df.add_field()"], "assign() devolve um novo DataFrame com as colunas calculadas, preservando o fluxo encadeado intacto."),
          q("Por que é recomendável envolver todo o encadeamento de métodos entre parênteses em Python?", "Permite quebras de linha limpas antes de cada ponto (.) sem necessidade de barras invertidas (\\)", ["Para converter a saída em tupla","Para isolar variáveis locais"], "Parênteses ativam a continuação de linha implícita do Python, resultando em formatação impecável."),
          t("Qual método do DataFrame permite injetar funções customizadas dentro de um encadeamento fluente?", ["pipe","pipe()"], "pipe integra funções livres na cadeia fluente.", "df_final = (df.____(sanitizar_textos))"),
          g("Complete a criação encadeada de nova coluna calculando o imposto via método assign.", ["assign"], "assign cria colunas dentro da cadeia.", "df = (df.____(imposto=lambda d: d[\"valor\"] * 0.1))"),
          o("Ordene as etapas de um pipeline de limpeza moderno e idiomático com Pandas.", ["Iniciar o bloco encadeado entre parênteses com o DataFrame bruto","Remover duplicatas e descartar nulos com .drop_duplicates().dropna()","Normalizar textos e criar novas métricas com .assign()","Aplicar regras de validação customizadas do domínio com .pipe(validar_negocio)"], "Pipelines estruturados com pipe e assign são fáceis de testar, versionar e manter em produção."),
          p("Associe o método de encadeamento à sua função.", [["df.assign(total=...)","Cria ou modifica colunas retornando o DataFrame para a cadeia"],["df.pipe(funcao)","Aplica função livre externa recebendo o DataFrame e devolvendo-o transformado"],["df.rename(columns=...)","Renomeia rótulos de colunas dentro do fluxo encadeado"],["df.query(\"idade > 18\")","Filtra linhas usando expressões em string sem quebrar a cadeia"]], "Construir esteiras com method chaining e pipe é o padrão da engenharia de dados moderna.")
        ]
      },
      {
        id: "pandas-u8-l2-desduplicacao-duplicated-drop-duplicates",
        title: "Desduplicação de registros: duplicated() e drop_duplicates()",
        subtitle: "Pipeline de limpeza · Detectando linhas repetidas e controlando descarte com keep",
        theory: "Dados brutos frequentemente sofrem duplicação por reenvios de formulários ou coletas repetidas. df.duplicated() retorna uma máscara booleana marcando duplicatas; df.drop_duplicates() elimina as repetições. O parâmetro subset define as colunas chave de unicidade e keep escolhe manter a primeira ou a última ocorrência.",
        questions: [
          q("Qual método do Pandas descarta linhas duplicadas de um DataFrame?", "df.drop_duplicates()", ["df.distinct()","df.unique_rows()","df.remove_repeats()"], "drop_duplicates remove registros redundantes mantendo apenas uma ocorrência do dado."),
          q("O que o parâmetro keep=\"last\" faz no método df.drop_duplicates()?", "Descarta todas as duplicatas anteriores, preservando apenas a última ocorrência observada no DataFrame", ["Mantém a primeira ocorrência","Descarta todas as linhas"], "Útil para capturar o estado mais recente de um cadastro que sofreu atualizações ao longo do arquivo."),
          q("O que acontece se passarmos keep=False em df.drop_duplicates()?", "Descarta todas as ocorrências de registros que estejam duplicados, não preservando nenhuma delas", ["Mantém todas as duplicatas","Inverte o DataFrame"], "keep=False isola estritamente registros que nunca foram duplicados, expurgando conflitos."),
          q("Como restringir a checagem de duplicidade exclusivamente às colunas \"cpf\" e \"data_nascimento\"?", "df.drop_duplicates(subset=[\"cpf\", \"data_nascimento\"])", ["df.drop_duplicates(by=[\"cpf\", \"data\"])","df.unique(subset=[...])"], "subset restringe o teste de unicidade às chaves de negócio, ignorando diferenças em campos secundários."),
          t("Qual método do DataFrame retorna uma máscara booleana identificando quais linhas são duplicadas?", ["duplicated","duplicated()"], "duplicated sinaliza repetições com True.", "duplicados = df.____(subset=[\"email\"])"),
          g("Complete o comando descartando duplicatas mantendo apenas a primeira ocorrência de cada CPF.", ["keep=\"first\""], "keep=\"first\" preserva a primeira linha encontrada.", "df = df.drop_duplicates(subset=[\"cpf\"], ____)"),
          o("Ordene as etapas para auditar e expurgar duplicatas em uma base de usuários.", ["Verificar a quantidade total de linhas duplicadas com df.duplicated().sum()","Inspecionar as duplicatas com df[df.duplicated(keep=False)].sort_values(\"email\")","Ordenar cronologicamente se necessário para manter o evento mais recente","Executar o descarte seguro com df = df.drop_duplicates(subset=[\"email\"], keep=\"last\")"], "Auditar antes de descartar garante que nenhuma informação crítica seja perdida inadvertidamente."),
          p("Associe a configuração de desduplicação ao seu efeito.", [["drop_duplicates(keep=\"first\")","Comportamento padrão: mantém a primeira ocorrência e apaga as seguintes"],["drop_duplicates(keep=\"last\")","Preserva a última ocorrência cronológica descartando as antigas"],["drop_duplicates(keep=False)","Descarta todas as ocorrências de qualquer linha que tenha repetição"],["df.duplicated().sum()","Calcula a contagem total de registros redundantes na base"]], "Tratar duplicatas de forma consciente é essencial para manter a credibilidade de relatórios de negócio.")
        ]
      },
      {
        id: "pandas-u8-l3-deteccao-outliers-iqr-amplitude-interquartil",
        title: "Detecção e tratamento de outliers com IQR no Pandas",
        subtitle: "Pipeline de limpeza · Identificando e tratando anomalias estatísticas com quartis Q1 e Q3",
        theory: "Outliers (valores discrepantes anômalos) distorcem modelos estatísticos e agregações. O método IQR (Amplitude Interquartil) calcula a dispersão: IQR = Q3 - Q1 (com df.quantile(0.75) e df.quantile(0.25)). Limites inferior (Q1 - 1.5*IQR) e superior (Q3 + 1.5*IQR) permitem isolar ou truncar anomalias com df.clip().",
        questions: [
          q("Como calcular a Amplitude Interquartil (IQR) de uma coluna no Pandas?", "q25 = df[\"valor\"].quantile(0.25); q75 = df[\"valor\"].quantile(0.75); iqr = q75 - q25", ["iqr = df[\"valor\"].max() - df[\"valor\"].min()","iqr = df[\"valor\"].std() * 2"], "O método quantile() calcula os percentis 25% e 75%, cuja diferença define a largura do miolo da distribuição."),
          q("Quais são as fronteiras clássicas de corte de John Tukey para detecção de outliers moderados?", "Limite inferior: Q1 - 1.5 * IQR; Limite superior: Q3 + 1.5 * IQR", ["Média +/- 1 desvio padrão","Mínimo e máximo absolutos"], "Valores fora desse intervalo de 1.5 amplitudes interquartis são classificados como anomalias estatísticas."),
          q("Qual método do Pandas trunca (faz clipping de) valores extremos nas fronteiras sem descartar linhas?", "df[\"valor\"].clip(lower=lim_inf, upper=lim_sup)", ["df[\"valor\"].cap(lim_inf, lim_sup)","df[\"valor\"].truncate()"], "clip() substitui valores abaixo do piso pelo limite inferior e acima do teto pelo superior, contendo outliers."),
          q("Por que o método IQR é superior ao desvio padrão (Z-score) na presença de anomalias severas?", "Porque quartis e medianas são estatísticas não-paramétricas robustas que não são influenciadas por outliers gigantes", ["Porque IQR roda em tempo constante","Porque Z-score só aceita números inteiros"], "Outliers gigantescos inflam artificialmente a média e o desvio padrão, invalidando a régua do Z-score."),
          t("Qual método de Series calcula quantis e percentis estatísticos no Pandas?", ["quantile","quantile()"], "quantile calcula separatrizes estatísticas.", "q3 = df[\"preco\"].____(0.75)"),
          g("Complete o truncamento de valores anômalos limitando os dados entre piso e teto.", ["clip"], "clip trunca valores extremos nas bordas.", "df[\"preco_ajustado\"] = df[\"preco\"].____(lower=piso, upper=teto)"),
          o("Ordene a esteira de tratamento estatístico de outliers por IQR.", ["Calcular Q1 e Q3 com df[\"vendas\"].quantile([0.25, 0.75])","Calcular a amplitude: iqr = q3 - q1","Determinar os limites: piso = q1 - 1.5 * iqr; teto = q3 + 1.5 * iqr","Filtrar anomalias ou aplicar df[\"vendas\"].clip(lower=piso, upper=teto)"], "O tratamento com IQR e clip protege a base contra distorções sem reduzir arbitrariamente o tamanho amostral."),
          p("Associe a etapa do IQR ao seu conceito matemático.", [["Q1 (quantile 0.25)","Primeiro quartil: 25% dos dados estão abaixo deste valor"],["Q3 (quantile 0.75)","Terceiro quartil: 75% dos dados estão abaixo deste valor"],["IQR (Q3 - Q1)","Amplitude interquartil que engloba os 50% centrais da distribuição"],["df.clip(lower, upper)","Apara extremos limitando a coluna às fronteiras aceitáveis"]], "Tratar anomalias por IQR é metodologia obrigatória em saneamento de dados de machine learning.")
        ]
      },
      {
        id: "pandas-u8-l4-validacao-esquema-assercoes-query",
        title: "Validação de integridade de esquema com assert e query()",
        subtitle: "Pipeline de limpeza · Filtragem concisa e testes de invariantes de dados em produção",
        theory: "Garantir que os dados limpos atendam às regras de negócio exige validações defensivas. O método df.query(\"idade >= 18 and ativo == True\") filtra linhas por expressões textuais legíveis. Asserções (assert) antes da exportação garantem que regras mandatórias (zero nulos e chaves exclusivas) sejam satisfeitas.",
        questions: [
          q("Qual é a principal vantagem do método df.query(\"expressao\") sobre a indexação com colchetes?", "Sintaxe extremamente limpa e legível sem repetição de df[\"coluna\"], aceitando operadores and/or nativamente", ["Acelera o processamento em 100x","Aloca memória no segmento de código"], "query() avalia expressões em C usando o motor numexpr quando disponível, tornando o código elegante e veloz."),
          q("Como referenciar uma variável local do Python dentro de uma expressão string no método .query()?", "Prefixando o nome da variável com o símbolo arroba (@): df.query(\"salario > @piso_salarial\")", ["Usando f-strings","Prefixando com cifrão ($)","Usando chaves {}"], "O símbolo @ referencia variáveis do escopo local Python de forma segura e parametrizada dentro do query."),
          q("Como auditar se a base final de clientes não possui nenhum valor nulo antes de carregar no banco?", "assert df.isna().sum().sum() == 0, \"Existem dados nulos não tratados na base!\"", ["df.check_nulls()","assert df.empty"], "Instruções assert disparam AssertionError imediato se o contrato de integridade for quebrado no pipeline."),
          q("Como auditar se a coluna de chaves primárias \"id\" é estritamente única sem duplicatas?", "assert df[\"id\"].is_unique, \"Coluna id possui chaves duplicadas!\"", ["assert df[\"id\"].count() == 1","assert df.unique()"], "is_unique confere a propriedade de unicidade do índice ou coluna com alta performance."),
          t("Qual método do DataFrame permite filtrar linhas utilizando expressões booleanas em formato de string?", ["query","query()"], "query filtra linhas por expressões textuais.", "aprovados = df.____(\"nota >= 7.0 and frequencia > 75\")"),
          g("Complete a consulta referenciando a variável local limite_preco com o prefixo arroba.", ["@limite_preco"], "O prefixo arroba vincula variáveis locais.", "df.query(\"preco < ____\")"),
          o("Ordene a pirâmide de validação final antes de publicar um conjunto de dados higienizado.", ["Filtrar registros aptos usando df.query(\"status == 'aprovado'\")","Validar ausência de dados nulos: assert df.isna().sum().sum() == 0","Validar unicidade de chaves: assert df[\"id\"].is_unique","Validar intervalo de valores de negócio: assert (df[\"desconto\"] <= 1.0).all()"], "Adicionar asserções de integridade blinda a esteira de ETL contra corrupção silenciosa de dados."),
          p("Associe a ferramenta de validação ao seu papel.", [["df.query(\"idade >= 18\")","Filtragem declarativa de registros usando expressões legíveis"],["df.query(\"val > @limite\")","Injeção parametrizada de variável Python local via símbolo @"],["assert serie.is_unique","Validação estrita de ausência total de duplicatas na chave"],["assert (serie >= 0).all()","Garante que nenhum registro seja negativo por regra de negócio"]], "Pipelines com asserções estritas conferem padrão industrial de qualidade aos dados.")
        ]
      },
      {
        id: "pandas-u8-l5-exportacao-otimizada-parquet-vs-csv",
        title: "Exportação moderna e de alta performance: Parquet vs CSV",
        subtitle: "Pipeline de limpeza · Armazenamento colunar compacto com to_parquet() e compressão Snappy",
        theory: "Embora o CSV seja popular, ele é ineficiente: não preserva dtypes, consome muito espaço e tem parsing lento. O formato colunar Apache Parquet (df.to_parquet()) é o padrão da indústria moderna: preserva tipos com fidelidade, compacta arquivos com Snappy/ZSTD e acelera leituras subsequentes em até 10 vezes.",
        questions: [
          q("Por que o formato Apache Parquet (to_parquet) é amplamente superior ao CSV em pipelines profissionais?", "É colunar, preserva dtypes exatos, comprime intensamente e lê apenas as colunas necessárias na consulta", ["Pode ser aberto no Bloco de Notas","Não suporta números decimais"], "Parquet armazena metadados de tipos e dados compactados, tornando a leitura muito mais rápida e compacta."),
          q("O que acontece com os dtypes (como datas e categorias) ao salvar em CSV e recarregar depois?", "Todos os tipos são perdidos, retornando como texto puro (object), exigindo conversão manual repetida", ["São preservados intactos","São salvos em arquivo oculto"], "O formato CSV é texto plano sem metadados estruturais de tipagem de tipos complexos."),
          q("Qual algoritmo de compressão é o padrão mais balanceado (alta velocidade e boa taxa) no Parquet?", "Compressão Snappy (compression=\"snappy\")", ["Compressão ZIP","Compressão RAR","Sem compressão"], "Snappy prioriza throughput extremo de descompressão da CPU, ideal para esteiras analíticas."),
          q("Como ler apenas as colunas \"id\" e \"valor\" de um arquivo Parquet gigante sem carregar todo o arquivo?", "pd.read_parquet(\"dados.parquet\", columns=[\"id\", \"valor\"])", ["pd.read_csv(\"dados.parquet\")[\"id\", \"valor\"]","pd.load_partial()"], "A arquitetura colunar do Parquet permite que o leitor leia apenas as páginas das colunas selecionadas."),
          t("Qual método do DataFrame exporta dados no padrão colunar comprimido Apache Parquet?", ["to_parquet","to_parquet()"], "to_parquet exporta em formato colunar.", "df.____(\"dados_limpos.parquet\", compression=\"snappy\")"),
          g("Complete a leitura seletiva de apenas duas colunas a partir do arquivo Parquet.", ["columns=[\"id\", \"status\"]"], "columns lê apenas os atributos requisitados.", "pd.read_parquet(\"base.parquet\", ____)"),
          o("Ordene a rotina final de entrega de um conjunto de dados higienizado para consumo corporativo.", ["Concluir todas as transformações e validações de integridade","Converter tipos para os formatos mais compactos (ex: category e int32)","Exportar no formato colunar: df.to_parquet(\"saida.parquet\", compression=\"snappy\")","Verificar a redução drástica de tamanho em disco comparado ao CSV bruto"], "Entregar dados em Parquet economiza custos de armazenamento em nuvem e acelera análises futuras."),
          p("Associe o formato de arquivo ao seu perfil de armazenamento.", [["CSV (.csv)","Texto plano sem tipos, volumoso em disco e lento para ler"],["Parquet (.parquet)","Formato binário colunar de alta compressão que preserva dtypes"],["compression=\"snappy\"","Algoritmo de compressão padrão ultrarrápido para Parquet"],["columns=[\"a\", \"b\"]","Leitura colunar seletiva que ignora colunas não utilizadas do disco"]], "Dominar Parquet coroa o ciclo de engenharia de dados com Pandas com o padrão de excelência da indústria.")
        ]
      }
    ]
  });
})();
