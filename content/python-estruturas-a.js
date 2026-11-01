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
  window.PYTHON_CHAPTER_UNITS.estruturas = Object.assign(window.PYTHON_CHAPTER_UNITS.estruturas || {}, {
    1: [
      {
        id: "py-est-u1-l3",
        title: "Métodos essenciais de dicionários em Python",
        subtitle: "Aprofundamento · métodos get, keys, values e items",
        theory: "Dicionários em Python oferecem métodos eficientes para consulta e iteração. O método get evita KeyError retornando um valor padrão se a chave não existir. Já os métodos keys(), values() e items() fornecem visões dinâmicas das chaves, dos valores e dos pares chave-valor.",
        questions: [
        q("Qual método de dicionário recupera um valor por chave sem lançar KeyError se a chave não existir?", "dict.get(chave, padrao)", ["dict.fetch(chave)","dict.find(chave)"], "O método get() retorna o valor associado à chave ou o valor padrão definido caso a chave esteja ausente.", "usuario = {\"nome\": \"Leo\"}\nprint(usuario.get(\"idade\", 0))"),
        q("O que acontece se acessarmos dados[\"email\"] usando colchetes quando \"email\" não existe no dicionário?", "Ocorre um erro de execução do tipo KeyError", ["O Python cria a chave associando a zero","O programa retorna None silenciosamente"], "O acesso direto via colchetes exige a existência da chave, levantando KeyError na ausência."),
        q("Qual método de dicionário devolve pares contendo tuplas (chave, valor) ideais para iteração?", "dict.items()", ["dict.pairs()","dict.tuples()"], "dict.items() itera simultaneamente sobre chaves e valores desempacotados no laço for."),
        q("Qual método extrai e remove uma chave do dicionário retornando seu respectivo valor?", "dict.pop(chave)", ["dict.remove(chave)","dict.delete(chave)"], "O método pop() retira a chave do mapa e retorna o valor correspondente."),
        t("Qual método de dicionário permite passar um valor padrão caso a chave pesquisada não exista?", ["get"], "O método get consulta chaves com valor padrão de contingência sem quebrar o código.", "# Busca segura: config.____(\"tema\", \"claro\")"),
        g("Complete o laço para iterar simultaneamente sobre chaves e valores do dicionário:", ["items"], "items() produz pares (chave, valor) para iteração.", "for chave, valor in dados.____():\n    print(f\"{chave}: {valor}\")"),
        o("Ordene as etapas recomendadas para consultar e atualizar a contagem de uma palavra em um dicionário:", ["Verificar se o termo já existe no dicionário com o operador de pertinência in","Utilizar o método get fornecendo valor padrão zero para palavras inéditas","Somar uma unidade ao total recuperado no processamento","Reatribuir a contagem atualizada à respectiva chave no mapa"], "Essa rotina de agregação é a espinha dorsal de contagens estatísticas em Python."),
        p("Associe o método de dicionário ao seu respectivo resultado de retorno:", [["dict.keys()","Retorna uma visão dinâmica contendo todas as chaves do dicionário"],["dict.values()","Retorna uma visão dinâmica contendo todos os valores armazenados"],["dict.items()","Retorna uma visão dinâmica de pares formados por tuplas (chave, valor)"],["dict.clear()","Esvazia completamente todos os registros contidos no dicionário"]], "As visões de dicionário refletem alterações na estrutura em tempo real sem cópias caras.")
        ]
      },
      {
        id: "py-est-u1-l4",
        title: "Compreensão de dicionários e filtragem",
        subtitle: "Aplicação · compreensão com filtros e expressões",
        theory: "A compreensão de dicionários (dictionary comprehension) permite criar novos dicionários aplicando transformações e filtros em uma única expressão elegante. A sintaxe {k: v for k, v in iteravel if condicao} substitui laços verbosos por código idiomático e veloz.",
        questions: [
        q("Qual expressão gera um dicionário contendo o quadrado dos números pares de 1 a 5?", "{x: x**2 for x in range(1, 6) if x % 2 == 0}", ["[x**2 for x in range(1, 6)]","{x**2: x for x in range(1, 6)}"], "A sintaxe de dicionário {chave: valor ...} com filtro if seleciona e transforma pares específicos."),
        q("Qual é a saída gerada por {p.upper(): len(p) for p in [\"sol\", \"lua\"]}?", "{\"SOL\": 3, \"LUA\": 3}", ["{\"sol\": 3, \"lua\": 3}","[\"SOL\": 3, \"LUA\": 3]"], "Cada palavra é convertida para maiúsculas como chave e seu comprimento é calculado como valor."),
        q("Por que compreensões de dicionários são amplamente preferidas a laços for com atribuição manual?", "São mais legíveis, expressivas e executam em velocidade nativa de bytecode em CPython", ["Porque impedem o uso de memória no computador","Porque transformam o código em linguagem JavaScript"], "Compreensões são otimizadas internamente na máquina virtual Python, superando laços manuais."),
        q("Como inverter chaves e valores de um dicionário original com valores únicos usando compreensão?", "{v: k for k, v in original.items()}", ["{k: v for v, k in original}","{v: k for k in original}"], "Iterar sobre items() invertendo a posição de k e v mapeia valores antigos para novas chaves."),
        t("Qual delimitador sintático é utilizado nas extremidades de uma compreensão de dicionário?", ["{}"], "Chaves {} delimitam tanto dicionários literais quanto compreensões de dicionários.", "# Delimitador: ____ k: v for k, v in colecao ____"),
        g("Complete a compreensão para selecionar apenas os produtos cujo preço é maior que 50:", ["if preco > 50"], "A cláusula if no final filtra os pares antes da inclusão.", "caros = {p: preco for p, preco in tabela.items() ____}"),
        o("Ordene a construção de uma compreensão de dicionário para normalizar nomes de clientes:", ["Iterar sobre a lista original de tuplas contendo identificadores e nomes brutos","Aplicar o método strip() e title() em cada string de nome para padronização","Definir o identificador numérico como chave e o nome formatado como valor","Concluir a expressão delimitada por chaves gerando o dicionário limpo"], "A construção declarativa simplifica pipelines de limpeza e higienização de dados."),
        p("Associe o tipo de compreensão à sua respectiva sintaxe delimitadora em Python:", [["{k: v for k, v in itens}","Compreensão de dicionário gerando estrutura associativa chave-valor"],["[x for x in itens]","Compreensão de lista gerando sequência indexada mutável"],["{x for x in itens}","Compreensão de conjunto gerando coleção de valores únicos"],["(x for x in itens)","Expressão geradora avaliada sob demanda (lazy evaluation)"]], "Cada par de delimitadores confere semântica e estruturas de dados específicas em Python.")
        ]
      },
      {
        id: "py-est-u1-l5",
        title: "Boas práticas em coleções associativas",
        subtitle: "Revisão e desafio · dicionários e coleções associativas",
        theory: "Dicionários em Python preservam a ordem de inserção desde a versão 3.7. Apenas objetos imutáveis e \"hashable\" (como strings, números e tuplas puras) podem ser usados como chaves. Listas ou outros dicionários não podem ser chaves porque seu conteúdo mutável inviabilizaria o cálculo de hash.",
        questions: [
        q("Qual destes tipos de dados NUNCA pode ser utilizado como chave de um dicionário em Python?", "Lista (list)", ["String (str)","Tupla contendo apenas inteiros (tuple)"], "Listas são mutáveis e não implementam __hash__ estável, levantando TypeError se usadas como chaves.", "# Isso gera TypeError:\ninvalido = {[1, 2]: \"valor\"}"),
        q("A partir de qual versão do Python a ordem de inserção das chaves nos dicionários tornou-se garantida?", "Python 3.7", ["Python 2.0","Python 3.0"], "A garantia oficial da ordem de inserção passou a fazer parte da especificação da linguagem no Python 3.7."),
        q("Qual operador verifica se uma chave existe em um dicionário com complexidade média O(1)?", "Operador in (ex: \"nome\" in usuario)", ["Método contains()","Operador has"], "O operador in consulta a existência da chave na tabela hash em tempo constante O(1)."),
        q("Qual método mescla outro dicionário no dicionário atual ou atualiza chaves existentes?", "dict.update(outro_dict)", ["dict.merge(outro_dict)","dict.append(outro_dict)"], "update() adiciona pares de outro dicionário, sobrescrevendo chaves coincidentes."),
        t("Qual operador de pertinência de duas letras checa se uma chave existe no dicionário?", ["in"], "O operador in verifica a presença de chaves em tempo constante.", "if \"codigo\" ____ catalogo: print(\"Encontrado\")"),
        g("Complete o operador moderno introduzido no Python 3.9 para fundir dois dicionários:", ["|"], "O operador de pipe (|) une dicionários gerando um novo mapa combinado.", "combinado = config_padrao ____ config_usuario"),
        o("Ordene as práticas de arquitetura recomendadas ao manipular dicionários em Python:", ["Garantir que todas as chaves sejam imutáveis e representem conceitos claros","Utilizar o método get ou operador in para evitar o lançamento de KeyError","Adotar compreensões de dicionários para transformações de dados em lote","Aproveitar o operador de união | do Python 3.9 para combinar configurações"], "Seguir padrões idiomáticos resulta em código Python limpo, seguro e altamente eficiente."),
        p("Associe a característica de integridade à regra de tipos em chaves de dicionário:", [["Chave imutável (str, int, tuple)","Permitida: possui hash fixo e seguro para indexação na tabela"],["Chave mutável (list, dict, set)","Proibida: dispara TypeError: unhashable type"],["Operador in","Consulta a presença de uma chave em complexidade média O(1)"],["Operador |","Funde dois dicionários em um novo objeto a partir do Python 3.9"]], "Compreender o conceito de hashable é fundamental para a correta modelagem em Python.")
        ]
      }
    ],
    2: [
      {
        id: "py-est-u2-l1",
        title: "Listas mutáveis versus tuplas imutáveis",
        subtitle: "Apresentação · mutabilidade de listas versus imutabilidade de tuplas",
        theory: "Listas (delimitadas por colchetes []) são sequências mutáveis que permitem adição, remoção e alteração de elementos. Já as tuplas (delimitadas por parênteses ()) são imutáveis após criadas, consumindo menos memória e garantindo que dados de configuração não sofram modificações acidentais.",
        questions: [
        q("Qual é a diferença fundamental de comportamento entre uma lista e uma tupla em Python?", "Listas são mutáveis e podem ter itens alterados; tuplas são imutáveis e fixas após a criação", ["Tuplas não aceitam números","Listas só podem armazenar até dez itens"], "A mutabilidade é a linha divisória: listas podem crescer e mudar; tuplas permanecem constantes.", "lista = [1, 2]\ntupla = (1, 2)"),
        q("O que acontece se tentarmos alterar um elemento de uma tupla como em tupla[0] = 99?", "Python dispara um erro do tipo TypeError avisando que tuplas não suportam atribuição", ["O valor é alterado silenciosamente","O computador reinicia"], "A imutabilidade impede atribuições diretas aos índices de tuplas."),
        q("Por que tuplas costumam ser escolhidas para representar registros com significado fixo (como coordenadas X, Y)?", "Garantem integridade contra alterações involuntárias e servem como chaves seguras de dicionários", ["Porque ocupam dez vezes mais memória","Porque são executadas em segundo plano"], "A imutabilidade confere segurança estrutural e permite que tuplas sejam usadas como chaves hashable."),
        q("Qual sintaxe cria uma tupla com exatamente um único elemento de valor 42?", "(42,)", ["(42)","[42]"], "A vírgula final é obrigatória para distinguir uma tupla unitária de uma expressão aritmética entre parênteses."),
        t("Qual pontuação após o valor é obrigatória para criar uma tupla de apenas um item em Python?", [","], "A vírgula distingue tuplas de expressões numéricas normais agrupadas por parênteses.", "unica = (10____)"),
        g("Complete com a função nativa que converte uma lista mutável em uma tupla imutável:", ["tuple"], "A função nativa tuple converte qualquer iterável em tupla.", "dados_fixos = ____(lista_original)"),
        o("Ordene os critérios de decisão técnica entre escolher uma lista ou uma tupla:", ["Analisar se a quantidade de elementos é conhecida e se seus valores nunca mudarão","Optar por tupla se a coleção representar um registro fixo ou for usada como chave","Optar por lista caso os itens precisem ser adicionados, ordenados ou removidos dinamicamente","Documentar o tipo nos type hints facilitando a leitura por outros desenvolvedores"], "A escolha consciente entre lista e tupla previne bugs de mutação acidental."),
        p("Associe a estrutura de sequência à sua característica predominante em Python:", [["Lista [a, b, c]","Coleção sequencial mutável ideal para listas de itens dinâmicos"],["Tupla (a, b, c)","Coleção sequencial imutável protegida contra alterações de valores"],["Tupla unitária (x,)","Exige vírgula para não ser interpretada como expressão aritmética"],["sys.getsizeof()","Revela que tuplas consomem ligeiramente menos bytes que listas na memória"]], "Dominar mutabilidade e imutabilidade é essencial para escrever código seguro em Python.")
        ]
      },
      {
        id: "py-est-u2-l2",
        title: "Fatiamento avançado e índices negativos",
        subtitle: "Prática guiada · fatiamento e operações com sequências",
        theory: "O fatiamento (slicing) em Python opera pela sintaxe sequencia[inicio:fim:passo]. Índices negativos contam a partir do final (-1 é o último item). O valor fim é exclusivo (não incluído), e o passo negativo [::-1] inverte a sequência de forma extremamente idiomática.",
        questions: [
        q("Qual fatia inverte completamente uma sequência em Python utilizando passo negativo?", "sequencia[::-1]", ["sequencia[-1:0]","sequencia.reverse_copy()"], "O passo -1 percorre a sequência de trás para frente, criando uma cópia invertida.", "texto = \"python\"\nprint(texto[::-1]) # \"nohtyp\""),
        q("Qual elemento é selecionado pela expressão itens[-1] em uma lista com cinco números?", "O último elemento da lista", ["O primeiro elemento","O penúltimo elemento"], "Índices negativos contam a partir do fim; -1 representa o elemento final da coleção."),
        q("Em uma lista valores = [10, 20, 30, 40, 50], o que a fatia valores[1:4] produz?", "[20, 30, 40]", ["[10, 20, 30]","[20, 30, 40, 50]"], "O índice final 4 é exclusivo, incluindo as posições 1, 2 e 3."),
        q("O que acontece se omitirmos os valores de início e fim no fatiamento como em lista[:]?", "Gera uma cópia rasa (shallow copy) de toda a lista", ["Apaga todos os elementos da lista","Dispara um IndexError"], "Omitir início e fim copia a coleção inteira em uma nova instância independente."),
        t("Qual índice inteiro negativo acessa o último elemento de qualquer sequência em Python?", ["-1"], "O índice -1 aponta diretamente para o último elemento sem precisar calcular len().", "ultimo = dados[____]"),
        g("Complete o fatiamento para extrair os três primeiros elementos de uma lista:", [":3"], "O fatiamento [:3] parte do início até o índice 2 inclusive (3 exclusivo).", "primeiros = notas[____]"),
        o("Ordene as etapas para extrair e inverter uma sublista de dados experimentais:", ["Localizar os índices de início e corte da janela de interesse","Extrair a sublista utilizando a fatia delimitada [inicio:fim]","Aplicar o passo negativo [::-1] para inverter a ordem dos elementos","Armazenar o resultado em uma nova variável para análise subsequente"], "O fatiamento composicional do Python oferece poder e elegância no tratamento de arrays."),
        p("Associe a sintaxe de fatiamento ao seu respectivo comportamento em sequências:", [["lista[:2]","Extrai os dois primeiros elementos a partir do índice 0"],["lista[2:]","Extrai do índice 2 em diante até o término da lista"],["lista[::2]","Percorre a sequência saltando de dois em dois elementos"],["lista[::-1]","Gera uma versão invertida completa da sequência original"]], "Fatiar sequências com precisão é uma das técnicas mais produtivas da linguagem Python.")
        ]
      },
      {
        id: "py-est-u2-l3",
        title: "Manipulação de listas: append, extend, pop e insert",
        subtitle: "Aprofundamento · métodos append, extend, pop e insert",
        theory: "Listas oferecem métodos especializados de mutação: append() adiciona um elemento único ao final em O(1); extend() adiciona múltiplos itens de outro iterável; insert() insere em um índice arbitrário em O(n); e pop() remove e retorna o elemento no índice informado.",
        questions: [
        q("Qual é a diferença entre lista.append([1, 2]) e lista.extend([1, 2])?", "append adiciona a lista inteira como um único item; extend adiciona cada elemento individualmente", ["append falha com números","Não há diferença prática"], "append aninha a lista recebida, enquanto extend itera sobre o argumento descarregando seus itens.", "a = [0]; a.append([1, 2]) # [0, [1, 2]]\nb = [0]; b.extend([1, 2]) # [0, 1, 2]"),
        q("Qual método remove o último item da lista e devolve seu valor em complexidade O(1)?", "lista.pop()", ["lista.remove()","lista.shift()"], "pop() sem argumentos remove o último elemento da lista e o retorna, ideal para pilhas."),
        q("Qual método remove a primeira ocorrência de um valor específico pesquisado pelo seu conteúdo?", "lista.remove(valor)", ["lista.pop(valor)","lista.delete(valor)"], "remove(valor) busca o primeiro item igual ao argumento e o elimina, lançando ValueError se ausente."),
        q("Qual método insere um novo item em uma posição arbitrária deslocando os seguintes?", "lista.insert(indice, valor)", ["lista.push(indice, valor)","lista.add(indice, valor)"], "insert() aloca o elemento no índice especificado, empurrando os elementos subsequentes para a direita."),
        t("Qual método de lista remove e retorna o elemento de um índice específico?", ["pop"], "pop remove pelo índice e devolve o item extraído.", "removido = tarefas.____()"),
        g("Complete o comando que adiciona todos os itens da lista novidades ao final de catalogo:", ["extend"], "extend expande a lista receptora com múltiplos elementos.", "catalogo.____(novidades)"),
        o("Ordene a simulação de uma fila de atendimento utilizando métodos de lista em Python:", ["Adicionar novos clientes ao final da fila utilizando o método append()","Verificar se a fila não está vazia conferindo o tamanho com len()","Atender e retirar o primeiro cliente da fila invocando pop(0)","Processar o atendimento do cliente retornado pelo método pop"], "Operações de pilha e fila demonstram o dinamismo dos métodos de manipulação de listas."),
        p("Associe o método de lista ao seu custo de complexidade assintótica típico:", [["lista.append(x)","Complexidade O(1) amortizada ao adicionar no fim da lista"],["lista.pop()","Complexidade O(1) amortizada ao remover o último elemento"],["lista.insert(0, x)","Complexidade O(n) linear devido ao deslocamento de todos os itens"],["lista.extend(iteravel)","Complexidade O(k) proporcional à quantidade de novos elementos"]], "Entender a complexidade dos métodos de lista evita gargalos de performance em sistemas reais.")
        ]
      },
      {
        id: "py-est-u2-l4",
        title: "Desempacotamento e tuplas nomeadas (namedtuple)",
        subtitle: "Aplicação · tuplas nomeadas e desempacotamento de dados",
        theory: "Python permite desempacotar sequências diretamente em variáveis. O operador asterisco (*resto) captura múltiplos elementos remanescentes. Além disso, namedtuple (do módulo collections) cria tuplas cujos campos são acessados por nome e por índice, aliando legibilidade e eficiência.",
        questions: [
        q("O que a instrução primeiro, *meio, ultimo = [1, 2, 3, 4, 5] armazena na variável meio?", "A lista [2, 3, 4]", ["O número 3 apenas","A tupla (2, 3, 4)"], "O asterisco (*) coleta todos os elementos intermediários em uma lista independente.", "a, *b, c = [1, 2, 3, 4, 5]\nprint(b) # [2, 3, 4]"),
        q("Qual classe utilitária do módulo collections cria tuplas com campos nomeados sem custo extra de memória?", "namedtuple", ["dict_tuple","custom_tuple"], "namedtuple gera classes leves de tuplas onde campos são acessados como atributos ou índices.", "from collections import namedtuple\nPonto = namedtuple(\"Ponto\", [\"x\", \"y\"])"),
        q("Qual é a vantagem de namedtuple em relação a dicionários simples para registros estáticos?", "Consome menos memória RAM, é imutável e permite acesso por ponto (p.x) com autocompletar", ["Pode ser alterada a qualquer momento","Executa consultas SQL automaticamente"], "namedtuple une o baixo footprint de memória da tupla com a expressividade de objetos nomeados."),
        q("O que acontece se o número de variáveis no desempacotamento simples for menor que a quantidade de itens na tupla?", "Ocorre ValueError informando que há mais valores para desempacotar do que variáveis", ["O Python descarta os itens restantes em silêncio","As variáveis recebem valores aleatórios"], "Sem o operador *, o desempacotamento estrito exige paridade exata entre variáveis e valores."),
        t("Qual símbolo de caractere único é utilizado no desempacotamento para capturar o restante dos itens?", ["*"], "O operador * agrupa itens excedentes em uma lista no desempacotamento.", "inicio, ____fim = colecao"),
        g("Complete a criação de uma tupla nomeada para representar um Produto com nome e preco:", ["namedtuple"], "namedtuple é uma fábrica de classes de tuplas do módulo collections.", "from collections import ____\nItem = namedtuple(\"Item\", [\"nome\", \"preco\"])"),
        o("Ordene as etapas para modelar e instanciar um registro financeiro com namedtuple:", ["Importar a fábrica namedtuple do pacote collections no cabeçalho","Definir a estrutura nomeando a classe e a lista de campos (ex: data, valor)","Instanciar um novo registro passando os dados como argumentos posicionais ou nomeados","Acessar os atributos de forma descritiva utilizando a notação de ponto (registro.valor)"], "namedtuple confere elegância profissional à modelagem de dados leves em Python."),
        p("Associe o recurso de desempacotamento ao seu respectivo caso de uso:", [["a, b = b, a","Troca direta de valores entre duas variáveis sem variável auxiliar temporária"],["ponto.x, ponto.y","Acesso expressivo a campos nomeados criados com namedtuple"],["cabecalho, *linhas","Separação imediata da primeira linha dos dados subsequentes de uma tabela"],["*_, ultimo = seq","Descarte dos elementos iniciais capturando apenas o último elemento"]], "O desempacotamento é um dos traços mais característicos do código Pythonico.")
        ]
      },
      {
        id: "py-est-u2-l5",
        title: "Critérios de seleção entre sequências e revisão",
        subtitle: "Revisão e desafio · escolhendo entre lista e tupla",
        theory: "A escolha entre lista e tupla pauta-se na natureza dos dados: listas são ideais para coleções homogêneas de tamanho variável que sofrerão ordenação e filtragem. Tuplas representam registros heterogêneos imutáveis de tamanho fixo, oferecendo maior proteção e menor overhead.",
        questions: [
        q("Qual coleção sequencial é mais indicada para guardar o histórico de mensagens trocadas em um chat?", "Lista, pois mensagens são adicionadas continuamente ao longo da conversa", ["Tupla, pois chats nunca recebem mensagens novas","Dicionário sem valores"], "Coleções que crescem e mudam ao longo do ciclo de vida exigem mutabilidade com listas."),
        q("Qual coleção é ideal para representar as coordenadas geográficas de latitude e longitude de uma cidade?", "Tupla, pois a coordenada é um registro fixo que não deve sofrer alteração acidental", ["Lista, para permitir adicionar uma terceira coordenada falsa","Arquivo de texto"], "Coordenadas são registros conceituais imutáveis, encaixando-se perfeitamente em tuplas."),
        q("Qual método de lista ordena os elementos in-place modificando a própria lista original?", "lista.sort()", ["sorted(lista)","lista.order()"], "sort() ordena a lista in-place sem alocar nova lista; sorted() cria e retorna uma nova lista ordenada."),
        q("Qual é a diferença entre lista.sort() e a função embutida sorted(lista)?", "sort() altera a lista existente e retorna None; sorted() não altera a original e retorna uma nova lista", ["sorted() só funciona com texto","sort() apaga os números negativos"], "sorted() é universal para qualquer iterável e imutável, enquanto sort() é exclusivo de listas mutáveis."),
        t("Qual função nativa embutida aceita qualquer iterável e devolve uma nova lista ordenada?", ["sorted"], "sorted() recebe qualquer coleção e devolve uma nova lista ordenada sem tocar na original.", "ordenados = ____(dados_brutos)"),
        g("Complete o método que ordena a lista de clientes in-place de forma decrescente:", ["sort(reverse=True)"], "sort com reverse=True ordena a própria lista do maior para o menor.", "idades.____"),
        o("Ordene a esteira de processamento para receber, limpar e ordenar uma lista de medições:", ["Receber a lista dinâmica de medições brutas através de leituras sucessivas","Filtrar valores espúrios ou negativos com uma compreensão de lista","Invocar lista.sort() para ordenar os valores remanescentes do menor para o maior","Gerar uma tupla imutável com os dados consolidados para armazenamento seguro"], "Combinar mutabilidade na preparação e imutabilidade na entrega é uma excelente prática."),
        p("Associe a operação de ordenação à sua consequência técnica na coleção:", [["lista.sort()","Ordenação in-place que modifica a lista original e retorna None"],["sorted(colecao)","Função pura que retorna uma nova lista ordenada mantendo a original intacta"],["reverse=True","Parâmetro que inverte o critério de ordenação do maior para o menor"],["key=funcao","Parâmetro que define uma função de transformação para guiar o critério de ordenação"]], "Compreender as ferramentas de ordenação em Python assegura eficiência algorítmica.")
        ]
      }
    ],
    3: [
      {
        id: "py-est-u3-l1",
        title: "O tipo set e garantia de unicidade",
        subtitle: "Apresentação · tipo set e garantia de elementos únicos",
        theory: "O tipo set em Python é uma coleção não ordenada de elementos únicos e imutáveis (hashable). Conjuntos eliminam duplicatas automaticamente na instanciação e oferecem testes de pertinência instantâneos em complexidade O(1), sendo criados com chaves {1, 2} ou com a função set().",
        questions: [
        q("Qual é a principal garantia estrutural oferecida pelo tipo set em Python?", "Garante que todos os elementos armazenados são estritamente únicos, eliminando repetições", ["Garante que os elementos fiquem sempre em ordem alfabética","Garante que os números sejam pares"], "Conjuntos baseiam-se em tabelas hash que rejeitam inserções de chaves já existentes."),
        q("Qual é a saída gerada por print(set([1, 2, 2, 3, 3, 3]))?", "{1, 2, 3}", ["[1, 2, 3]","{1, 2, 2, 3, 3, 3}"], "A conversão para set descarta automaticamente todos os valores duplicados da coleção."),
        q("Como criar um conjunto vazio em Python sem confundi-lo com um dicionário vazio?", "set()", ["{}","[]"], "A sintaxe {} cria um dicionário vazio por precedência histórica; conjuntos vazios exigem set().", "conjunto_vazio = set()\ndicionario_vazio = {}"),
        q("Qual método adiciona um novo elemento a um conjunto existente?", "conjunto.add(elemento)", ["conjunto.append(elemento)","conjunto.push(elemento)"], "O método add() insere um elemento no conjunto se ele já não estiver presente."),
        t("Qual função construtora deve ser chamada para instanciar um conjunto vazio?", ["set()"], "set() instancia um conjunto vazio sem ambiguidade com dicionários.", "novo_conjunto = ____"),
        g("Complete o comando para adicionar o identificador 404 ao conjunto de erros registrados:", ["add"], "add() insere um único item no conjunto.", "erros_detectados.____(404)"),
        o("Ordene os passos para remover duplicatas de uma lista de e-mails em Python:", ["Receber a lista original de e-mails contendo potenciais repetições","Passar a lista como argumento para o construtor set(emails) eliminando repetições","Reconverter o conjunto resultante em lista com list(unicos) caso precise de índices","Prosseguir com o envio das mensagens garantindo que nenhum usuário receba em dobro"], "A conversão lista -> conjunto -> lista é a fórmula canônica para desduplicação em Python."),
        p("Associe a declaração de conjunto à sua respectiva interpretação sintática:", [["{1, 2, 3}","Conjunto literal não ordenado contendo três inteiros únicos"],["{}","Dicionário vazio literal (atenção: NÃO é conjunto vazio)"],["set()","Instanciação oficial e inequívoca de um conjunto vazio"],["set(\"arara\")","Conjunto com as letras únicas {'a', 'r'} extraídas da string"]], "Diferenciar a notação de conjuntos e dicionários evita erros sutis de inicialização.")
        ]
      },
      {
        id: "py-est-u3-l2",
        title: "Operações matemáticas de conjuntos",
        subtitle: "Prática guiada · operações de união, interseção e diferença",
        theory: "Conjuntos suportam operadores algébricos poderosos: união (|), interseção (&), diferença (-) e diferença simétrica (^). Essas operações permitem cruzar tabelas e comparar coleções de dados sem necessidade de laços for manuais ou comparações aninhadas.",
        questions: [
        q("Qual operador realiza a união de dois conjuntos combinando todos os elementos sem repetições?", "Operador pipe (|)", ["Operador soma (+)","Operador and (&)"], "O operador | (ou método union) reúne todos os itens presentes em ao menos um dos conjuntos.", "a = {1, 2}; b = {2, 3}\nprint(a | b) # {1, 2, 3}"),
        q("Qual operador calcula a interseção retornando apenas os elementos presentes em ambos os conjuntos?", "Operador e-comercial (&)", ["Operador pipe (|)","Operador asterisco (*)"], "O operador & (ou método intersection) filtra os elementos comuns a ambos os lados.", "a = {1, 2}; b = {2, 3}\nprint(a & b) # {2}"),
        q("O que a operação a - b (diferença) calcula entre dois conjuntos?", "Retorna os elementos que estão exclusivamente no conjunto a e não pertencem ao conjunto b", ["Retorna a subtração aritmética dos números","Exclui ambos os conjuntos da memória"], "A diferença subtrai do primeiro conjunto qualquer membro que também pertença ao segundo."),
        q("Qual operador calcula a diferença simétrica (itens que estão em um ou no outro, mas não em ambos)?", "Operador circunflexo (^)", ["Operador til (~)","Operador exclamação (!)"], "O operador ^ (symmetric_difference) devolve os elementos não compartilhados."),
        t("Qual símbolo de operador calcula a interseção de dois conjuntos em Python?", ["&"], "O operador & retorna elementos que pertencem simultaneamente a ambos os conjuntos.", "comuns = grupo_a ____ grupo_b"),
        g("Complete o operador para calcular os clientes que estão na lista A mas não estão na lista B:", ["-"], "O operador de subtração (-) calcula a diferença de conjuntos.", "exclusivos_a = clientes_a ____ clientes_b"),
        o("Ordene as etapas para auditar acessos comparando permissões solicitadas e autorizadas:", ["Converter a lista de permissões solicitadas em um conjunto A","Converter a lista de permissões autorizadas em um conjunto B","Calcular a diferença A - B para isolar as permissões não concedidas","Registrar log de auditoria caso o conjunto resultante não esteja vazio"], "Operações algébricas em conjuntos simplificam regras complexas de controle de acesso."),
        p("Associe o operador de conjuntos à sua respectiva definição matemática:", [["a | b (União)","Todos os elementos pertencentes a pelo menos um dos conjuntos"],["a & b (Interseção)","Apenas os elementos presentes concomitantemente em ambos os conjuntos"],["a - b (Diferença)","Elementos que pertencem a \"a\" e que não pertencem a \"b\""],["a ^ b (Dif. Simétrica)","Elementos pertencentes a um ou ao outro, mas nunca a ambos"]], "A teoria dos conjuntos integrada nativamente ao Python torna cruzamentos de dados instantâneos.")
        ]
      },
      {
        id: "py-est-u3-l3",
        title: "Performance e busca com tabelas hash em O(1)",
        subtitle: "Aprofundamento · complexidade O(1) de busca por hashing",
        theory: "A checagem de pertinência item in conjunto possui complexidade temporal média O(1), enquanto em listas é O(n). Isso ocorre porque conjuntos utilizam tabelas hash: o Python calcula o hash do elemento e salta diretamente para o endereço de memória onde ele estaria alocado.",
        questions: [
        q("Qual é a complexidade de tempo média para verificar se um elemento existe dentro de um set?", "O(1) tempo constante", ["O(n) tempo linear","O(n^2) tempo quadrático"], "A tabela hash mapeia o valor diretamente para o bucket correspondente em tempo constante O(1)."),
        q("Por que a checagem \"x in lista\" torna-se lenta em listas com milhões de itens?", "Porque em listas o Python percorre linearmente elemento por elemento até encontrar o alvo (O(n))", ["Porque listas não cabem na memória cache","Porque a instrução in expira após um segundo"], "A busca linear em listas exige visitar potencialmente todos os n itens para atestar ausência."),
        q("Qual função nativa embutida em Python calcula o valor numérico de hash de um objeto imutável?", "hash(objeto)", ["calc_hash(objeto)","id_hash(objeto)"], "A função hash() invoca o método especial __hash__ do objeto, gerando sua assinatura de tabela."),
        q("O que acontece se tentarmos adicionar uma lista dentro de um conjunto com conjunto.add([1, 2])?", "Gera um TypeError informando que listas não são \"hashable\"", ["A lista é convertida em tupla automaticamente","O conjunto adiciona a lista com sucesso"], "Apenas objetos imutáveis com valor de hash imutável podem integrar conjuntos."),
        t("Qual notação de complexidade assintótica representa a busca em tempo constante do set?", ["O(1)"], "O tempo constante O(1) não se degrada com o aumento do volume de dados.", "// Complexidade media de busca no set: ____"),
        g("Complete com a função nativa que calcula o valor de espalhamento de um texto:", ["hash"], "A função hash calcula o código numérico de dispersão do objeto.", "codigo_dispersao = ____(\"senha_segura\")"),
        o("Ordene a rotina de validação rápida de CPFs bloqueados contra uma base de fraudes:", ["Carregar a base de CPFs bloqueados diretamente em uma estrutura do tipo set","Receber o CPF digitado pelo cliente na requisição de compra","Executar a checagem if cpf in base_bloqueados em tempo constante O(1)","Bloquear a transação imediatamente caso o CPF seja localizado no conjunto"], "Usar conjuntos para listas de bloqueio garante respostas em microssegundos em alta escala."),
        p("Associe a estrutura de dados à sua complexidade média de busca com operador in:", [["set (conjunto)","O(1) tempo constante independente do volume de registros"],["dict (dicionário)","O(1) tempo constante para verificação da presença de chaves"],["list (lista)","O(n) tempo linear que cresce proporcionalmente ao tamanho da lista"],["tuple (tupla)","O(n) tempo linear com percurso sequencial da esquerda para a direita"]], "A escolha informada de estruturas com base em complexidade assintótica define a escalabilidade do sistema.")
        ]
      },
      {
        id: "py-est-u3-l4",
        title: "Desduplicação de dados em pipelines de processamento",
        subtitle: "Aplicação · remoção eficiente de duplicatas em pipelines",
        theory: "Remover duplicatas preservando a ordem original é um desafio clássico. Enquanto set() descarta repetições mas não garante ordem, podemos usar dict.fromkeys(lista) no Python moderno para desduplicar mantendo a ordem estável dos elementos, pois dicionários preservam a sequência de inserção.",
        questions: [
        q("Qual é o efeito colateral da técnica clássica lista = list(set(lista_original))?", "Descarta repetições com alta velocidade, mas pode embaralhar a ordem relativa original dos itens", ["Apaga todos os textos deixando apenas números","Dobra o uso de processador"], "O conjunto não garante ordem sequencial; a conversão direta de set perde a ordem original."),
        q("Qual método idiomático do Python 3.7+ remove duplicatas de uma lista PRESERVANDO a ordem original?", "list(dict.fromkeys(lista))", ["lista.remove_duplicates()","set.keep_order(lista)"], "Dicionários mantêm ordem de inserção; dict.fromkeys() cria chaves únicas preservando a sequência."),
        q("Como funciona internamente a chamada dict.fromkeys([\"a\", \"b\", \"a\"])?", "Cria um dicionário usando os elementos como chaves (eliminando duplicatas) associados a None", ["Cria três arquivos no disco","Gera um erro de chave duplicada"], "As chaves recebem valores None por padrão e a duplicata da chave \"a\" é absorvida silenciosamente."),
        q("Em que cenário é preferível usar compreensão com um set auxiliar (seen) em vez de dict.fromkeys?", "Quando os dados são consumidos por um fluxo gerador lazy sob demanda sem carregar tudo na memória", ["Apenas em sistemas operacionais legados","Nunca, dict.fromkeys é obrigatório em 100% dos casos"], "Geradores com conjunto visto (seen) permitem desduplicar fluxos contínuos de stream em memória constante."),
        t("Qual método de dicionário cria um mapa a partir de uma sequência de chaves?", ["dict.fromkeys"], "fromkeys cria chaves únicas preservando a ordem de inserção da lista.", "unicos_ordenados = list(____(itens))"),
        g("Complete o comando que desduplica a lista de tags preservando a ordem de digitação:", ["dict.fromkeys"], "dict.fromkeys garante desduplicação estável em tempo O(n).", "tags_limpas = list(____(tags_originais))"),
        o("Ordene os passos de um pipeline de limpeza para desduplicar identificadores de transações:", ["Receber o fluxo de identificadores com dados duplicados vindos de múltiplos nós","Aplicar dict.fromkeys() para desduplicar preservando a cronologia de entrada","Converter a estrutura de chaves resultantes de volta para lista com list()","Prosseguir o processamento da fila com registros estritamente únicos e ordenados"], "A preservação da ordem cronológica é crítica em auditorias e logs transacionais."),
        p("Associe a estratégia de desduplicação ao seu respectivo comportamento operacional:", [["list(set(x))","Desduplicação ultra veloz O(n), mas sem garantia de preservar a ordem original"],["list(dict.fromkeys(x))","Desduplicação eficiente O(n) preservando com precisão a ordem de inserção"],["Laço duplo ingênuo","Desduplicação lenta O(n^2) que deve ser estritamente evitada em produção"],["Gerador com seen = set()","Desduplica fluxos infinitos (streams) sob demanda com memória incremental"]], "Dominar padrões de desduplicação assegura fidelidade e performance aos dados.")
        ]
      },
      {
        id: "py-est-u3-l5",
        title: "Conjuntos mutáveis e frozenset imutável",
        subtitle: "Revisão e desafio · conjuntos mutáveis e frozenset imutável",
        theory: "Assim como listas possuem a contrapartida imutável nas tuplas, os conjuntos mutáveis (set) possuem o frozenset. Um frozenset é estritamente imutável e hashable, o que permite utilizá-lo como chave de dicionários ou como elemento interno de outros conjuntos.",
        questions: [
        q("Qual é a versão imutável do tipo set que pode ser utilizada como chave de um dicionário em Python?", "frozenset", ["fixedset","immutableset"], "frozenset é a implementação imutável de conjuntos, sendo hashable por especificação.", "chave = frozenset([1, 2])\nmapa = {chave: \"dados\"}"),
        q("O que acontece se tentarmos chamar o método add() em uma instância de frozenset?", "Dispara um AttributeError informando que frozenset não possui o atributo add", ["Adiciona o elemento temporariamente","Converte o frozenset em lista"], "Instâncias de frozenset não possuem métodos de mutação como add(), remove() ou pop()."),
        q("Como criar um conjunto contendo outros subconjuntos em Python?", "Armazenando instâncias de frozenset dentro do conjunto externo set", ["Colocando sets comuns aninhados","Usando listas de sets"], "Um set só aceita elementos hashable; portanto, conjuntos aninhados exigem frozenset.", "grupo_de_grupos = {frozenset([1, 2]), frozenset([3, 4])}"),
        q("Qual construtor é chamado para instanciar um conjunto imutável a partir de uma lista?", "frozenset(iteravel)", ["freeze(iteravel)","set.frozen(iteravel)"], "O construtor oficial frozenset recebe qualquer iterável e produz a versão imutável."),
        t("Qual tipo imutável representa um conjunto protegido contra adições e remoções?", ["frozenset"], "frozenset é a versão congelada e imutável de conjuntos em Python.", "// Conjunto imutavel: config = ____([\"admin\", \"leitura\"])"),
        g("Complete a criação de uma chave composta imutável para indexar o cache de permissões:", ["frozenset"], "frozenset permite usar coleções de permissões como chaves de cache.", "cache_permissoes[____(papeis)] = True"),
        o("Ordene a criação de uma matriz de combinações de grupos utilizando frozenset:", ["Definir as coleções de elementos que compõem cada categoria isolada","Converter cada grupo em uma instância imutável com frozenset()","Inserir os grupos imutáveis como membros de um conjunto set global","Realizar consultas e pertinências cruzadas seguras sem risco de mutação"], "O uso de frozenset confere rigor formal a grafos e combinações combinatórias."),
        p("Associe a coleção mutável à sua contrapartida imutável e hashable em Python:", [["list (lista mutável)","tuple (tupla imutável com suporte a hash)"],["set (conjunto mutável)","frozenset (conjunto imutável com suporte a hash)"],["dict (dicionário mutável)","MappingProxyType (visão de leitura imutável sobre dicionário)"],["bytearray (mutável)","bytes (sequência imutável de bytes brutos)"]], "A simetria entre tipos mutáveis e imutáveis é um dos pontos altos do design de Python.")
        ]
      }
    ],
    4: [
      {
        id: "py-est-u4-l1",
        title: "Modelagem de dados hierárquicos e JSON",
        subtitle: "Apresentação · estruturas hierárquicas e modelagem de JSON",
        theory: "Aplicações modernas representam entidades complexas combinando dicionários e listas aninhadas, em uma estrutura homóloga ao formato JSON. Dicionários representam objetos com propriedades nomeadas, enquanto listas agrupam séries temporais ou coleções de registros filhos.",
        questions: [
        q("Qual estrutura em Python modela naturalmente um objeto JSON de usuário com lista de telefones?", "Um dicionário contendo campos escalares e uma chave associada a uma lista de strings", ["Uma tupla unitária","Uma variável inteira"], "A combinação de dicionários com listas aninhadas espelha a representação universal do JSON.", "usuario = {\"nome\": \"Bia\", \"telefones\": [\"119999\", \"118888\"]}"),
        q("Como acessar a primeira cidade da lista de endereços em cliente = {\"enderecos\": [{\"cidade\": \"SP\"}] }?", "cliente[\"enderecos\"][0][\"cidade\"]", ["cliente.enderecos.0.cidade","cliente[\"cidade\"][0]"], "Navega-se sequencialmente: chave do dicionário [\"enderecos\"], índice da lista [0] e subchave [\"cidade\"]."),
        q("Qual módulo da biblioteca padrão do Python serializa e desserializa estruturas de dicionários em texto JSON?", "json", ["xml","serialize"], "O módulo json nativo converte dicionários em strings JSON com json.dumps() e o inverso com json.loads()."),
        q("O que a função json.dumps(dados, indent=2) produz no terminal?", "Uma string formatada em JSON legível com indentação de 2 espaços por nível hierárquico", ["Um arquivo zip comprimido","Um erro de sistema operacional"], "O parâmetro indent gera uma visualização organizada (pretty print) de estruturas aninhadas."),
        t("Qual módulo padrão do Python converte dicionários para o formato textual JSON?", ["json"], "O módulo json é o padrão nativo para manipulação de payload web em Python.", "import ____\ntexto = json.dumps(dados)"),
        g("Complete o acesso ao segundo elemento da lista de habilidades contida no dicionário dev:", ["dev[\"habilidades\"][1]"], "Índices de listas aninhadas são acessados por colchetes sequenciais.", "segunda_habilidade = ____;"),
        o("Ordene as etapas para carregar, alterar e reinspecionar um documento JSON em Python:", ["Desserializar o texto JSON em estrutura de dicionário através de json.loads()","Navegar até a chave aninhada desejada utilizando chaves e índices colchetes","Modificar o valor da propriedade de negócio conforme a regra da aplicação","Serializar novamente a estrutura em formato texto formatado com json.dumps()"], "Essa rotina governa integrações com APIs REST e microsserviços modernos."),
        p("Associe a função do módulo json à sua respectiva transformação de formato:", [["json.loads(string)","Converte string contendo JSON para dicionário/lista em memória (parse)"],["json.dumps(objeto)","Serializa estrutura de dicionário Python em string formatada em JSON"],["json.load(arquivo)","Lê diretamente de um descritor de arquivo aberto e converte em objeto"],["json.dump(objeto, arq)","Escreve a estrutura serializada diretamente dentro de um arquivo no disco"]], "O módulo json é o elo fundamental de comunicação em arquiteturas distribuídas.")
        ]
      },
      {
        id: "py-est-u4-l2",
        title: "Navegação segura em dicionários profundos",
        subtitle: "Prática guiada · navegação segura em múltiplos níveis",
        theory: "Acessar níveis profundos como dados[\"a\"][\"b\"][\"c\"] arrisca disparar KeyError ou TypeError caso alguma chave intermediária seja ausente ou nula. Para navegar com segurança, encadeamos chamadas com dict.get() ou empregamos blocos defensivos com tratamento de exceções.",
        questions: [
        q("O que acontece se executarmos dados[\"cliente\"][\"contato\"][\"email\"] se \"contato\" não existir?", "Dispara KeyError na chave intermediária [\"contato\"] abortando a execução se não tratado", ["Retorna None com segurança","Cria a chave contato automaticamente"], "O acesso direto falha imediatamente na primeira chave ausente da cadeia hierárquica."),
        q("Como consultar com segurança o campo \"email\" usando get encadeado com valor padrão vazio?", "dados.get(\"cliente\", {}).get(\"contato\", {}).get(\"email\")", ["dados.find(\"email\")","dados[\"cliente\" ?? \"email\"]"], "Fornecer {} como padrão intermediário no get() permite que a próxima chamada não lance erro se o nível faltar."),
        q("Qual é a principal desvantagem de encadear múltiplos .get({}, default)?", "Pode tornar o código verboso e ilegível quando a profundidade ultrapassa três níveis", ["Diminui a velocidade do monitor","Gera conflito com o Git"], "Encadeamentos longos de get poluem o código; helpers de navegação ou try-except são mais elegantes."),
        q("Como tratar a navegação profunda de forma limpa em uma função utilitária com bloco try-except?", "Tentar o acesso direto dentro de try e capturar (KeyError, TypeError) retornando um valor padrão", ["Reescrever o dicionário do zero","Desligar a checagem de erros do Python"], "Capturar KeyError e TypeError em um helper resolve acessos profundos com máxima velocidade e limpeza."),
        t("Quais duas exceções devem ser capturadas ao navegar defensivamente em níveis profundos?", ["KeyError, TypeError"], "KeyError trata chaves ausentes e TypeError trata tentativa de indexar None.", "// Capturar: except (____): return padrao"),
        g("Complete o acesso seguro intermediário fornecendo um dicionário vazio caso usuario falte:", ["usuario.get(\"perfil\", {})"], "O dicionário vazio evita que o próximo get dispare exceção de atributo inexistente.", "tema = ____.get(\"tema\", \"escuro\")"),
        o("Ordene a construção de uma função utilitária para buscar chaves profundas em dicionários:", ["Definir a função obter_aninhado(dicionario, lista_chaves, padrao=None)","Iterar sobre cada chave da lista reduzindo o dicionário nível a nível","Interceptar exceções caso o valor corrente não seja mapeável ou não possua a chave","Retornar o valor localizado no nó final ou o valor padrão em caso de falha"], "Criar helpers de navegação segura reduz dezenas de checagens repetitivas na base de código."),
        p("Associe a falha de navegação à respectiva causa técnica no código:", [["KeyError: \"perfil\"","A chave \"perfil\" não existe no dicionário que está sendo indexado"],["TypeError: 'NoneType' object is not subscriptable","Tentativa de aplicar colchetes em uma variável cujo valor é None"],["d.get(\"a\", {}).get(\"b\")","Padrão defensivo de contingência com dicionário vazio intermediário"],["try / except (KeyError, TypeError)","Captura elegante de falhas de navegação em estruturas instáveis"]], "Blindar a navegação em dados externos protege o sistema contra payloads inesperados.")
        ]
      },
      {
        id: "py-est-u4-l3",
        title: "Coleções avançadas: defaultdict e Counter",
        subtitle: "Aprofundamento · defaultdict e Counter da biblioteca collections",
        theory: "O módulo collections oferece ferramentas poderosas para simplificar agrupamentos. O defaultdict instancia automaticamente um valor padrão (como list ou int) ao acessar uma chave inexistente. O Counter computa contagens de frequência de elementos de forma instantânea e idiomática.",
        questions: [
        q("Qual classe do módulo collections inicializa automaticamente uma chave com valor padrão no primeiro acesso?", "defaultdict", ["auto_dict","safedict"], "defaultdict recebe uma fábrica de tipos (como list ou int) e cria o valor automaticamente se a chave não existir.", "from collections import defaultdict\ngrupos = defaultdict(list)\ngrupos[\"frutas\"].append(\"maca\")"),
        q("Qual fábrica de tipo padrão deve ser fornecida ao defaultdict para criar um acumulador numérico?", "int (inicia automaticamente com o valor zero)", ["float","str"], "defaultdict(int) atribui zero na primeira consulta a uma nova chave, perfeito para contagens."),
        q("Qual classe de collections recebe um iterável e conta a frequência de repetição de cada elemento?", "Counter", ["FrequenceTracker","ItemCounter"], "Counter conta as ocorrências de cada item, retornando uma estrutura de dicionário de frequências."),
        q("Qual método da classe Counter retorna os N elementos mais frequentes acompanhados de suas contagens?", "counter.most_common(n)", ["counter.top(n)","counter.highest(n)"], "most_common(n) devolve uma lista de tuplas com os n itens de maior frequência na coleção."),
        t("Qual classe de collections cria um contador automático de frequências a partir de um iterável?", ["Counter"], "Counter calcula o histograma de ocorrências de qualquer coleção.", "from collections import ____\ncontagem = Counter(\"abracadabra\")"),
        g("Complete a instanciação do defaultdict agrupando itens em listas automáticas:", ["defaultdict(list)"], "A fábrica list inicializa listas vazias para cada nova chave acessada.", "from collections import defaultdict\nagrupador = ____"),
        o("Ordene as etapas para agrupar produtos por categoria utilizando defaultdict:", ["Importar a classe defaultdict do módulo utilitário collections","Instanciar o agrupador configurando a fábrica de valor como defaultdict(list)","Percorrer a lista de produtos adicionando cada um com agrupador[cat].append(produto)","Obter o dicionário consolidado sem necessidade de checar se a chave já existia"], "defaultdict elimina totalmente laços verbosos com if chave not in mapa."),
        p("Associe a estrutura do módulo collections ao seu papel primordial no processamento:", [["defaultdict(list)","Agrupa elementos em listas automáticas sem checagem prévia de chaves"],["defaultdict(int)","Cria acumulador numérico onde chaves novas iniciam automaticamente com zero"],["Counter(iteravel)","Gera mapa de frequências com método most_common para ranqueamento"],["OrderedDict","Dicionário com métodos especializados para reordenar chaves (move_to_end)"]], "As classes especializadas de collections reduzem drasticamente o ruído sintático em Python.")
        ]
      },
      {
        id: "py-est-u4-l4",
        title: "Agrupamento e agregação de dados tabulares",
        subtitle: "Aplicação · agrupamento e agregação de dados tabulares",
        theory: "Agrupar e resumir dados tabulares é uma das tarefas mais nobres na engenharia de dados. Com dicionários e listas, implementamos o padrão Map-Reduce clássico: mapeamos registros em grupos por chave categórica e depois agregamos métricas como soma, média e valores extremos.",
        questions: [
        q("Qual padrão de engenharia organiza dados agrupando por categoria antes de consolidar métricas?", "Padrão Group-By / Map-Reduce", ["Padrão Singleton","Padrão Injeção de Dependência"], "O agrupamento categórico isola partições de dados para aplicação subsequente de cálculos de agregação."),
        q("Como calcular a média salarial por departamento após agrupar salários em listas no dicionário dep_salarios?", "Iterar sobre dep_salarios.items() calculando sum(salarios) / len(salarios) para cada departamento", ["Multiplicar o maior salário por dois","Somar os nomes dos departamentos"], "A média aritmética de cada grupo divide a somatória dos itens pela contagem de colaboradores do setor."),
        q("Qual função embutida em Python calcula a soma de todos os números contidos em um iterável?", "sum()", ["total()","add_all()"], "A função sum() percorre o iterável acumulando e retornando o total aritmético."),
        q("Qual função embutida retorna o menor e o maior valor de uma coleção numérica?", "min() e max()", ["low() e high()","first() e last()"], "min() e max() identificam instantaneamente os limites extremos de valores em sequências."),
        t("Qual função embutida nativa retorna a somatória numérica total de uma lista em Python?", ["sum"], "sum() acumula todos os elementos numéricos do iterável.", "total = ____([10, 20, 30])"),
        g("Complete a expressão que calcula a média aritmética da lista de notas:", ["sum(notas) / len(notas)"], "A média é a razão direta entre a soma e o total de elementos.", "media = ____;"),
        o("Ordene as etapas para calcular o ticket médio de vendas por filial em Python puro:", ["Agrupar os valores de vendas de cada filial em listas com defaultdict(list)","Percorrer o dicionário de grupos extraindo o nome da filial e a lista de vendas","Calcular a média dividindo sum(vendas) por len(vendas) para cada filial","Armazenar os resultados em um novo dicionário de métricas consolidadas"], "Essa arquitetura analítica fundamenta operações antes de transições para pandas ou SQL."),
        p("Associe a função analítica embutida ao seu respectivo cálculo sobre coleções:", [["sum(seq)","Calcula a soma aritmética de todos os números contidos no iterável"],["len(seq)","Retorna a quantidade total de elementos presentes na coleção"],["max(seq)","Localiza o valor numérico ou alfabético máximo contido na coleção"],["min(seq)","Localiza o valor numérico ou alfabético mínimo contido na coleção"]], "Funções embutidas operam com performance de baixo nível em CPython.")
        ]
      },
      {
        id: "py-est-u4-l5",
        title: "Consolidação de boas práticas em coleções complexas",
        subtitle: "Revisão e desafio · boas práticas em coleções complexas",
        theory: "Manipular estruturas compostas exige clareza: documentar a forma dos dados com type hints (ex: dict[str, list[int]]), evitar mutações acidentais em referências compartilhadas com copy.deepcopy(), e preferir dataclasses ou TypedDict para contratos formais em projetos grandes.",
        questions: [
        q("Qual é a diferença entre uma cópia rasa (shallow copy) e uma cópia profunda (copy.deepcopy)?", "Cópia rasa copia apenas referências do primeiro nível; cópia profunda duplica recursivamente todos os subníveis", ["Cópia profunda só funciona com texto","Cópia rasa altera o arquivo no disco"], "Em cópias rasas, modificar uma lista aninhada afeta o original; deepcopy isola totalmente a nova estrutura.", "import copy\nclone = copy.deepcopy(estrutura_complexa)"),
        q("Qual módulo da biblioteca padrão fornece a função deepcopy para isolar estruturas aninhadas?", "copy", ["clone","duplicate"], "O módulo copy fornece copy() para cópias rasas e deepcopy() para duplicação recursiva completa."),
        q("Qual ferramenta moderna do módulo typing permite definir tipos esperados para chaves de dicionários?", "TypedDict", ["AnyDict","StrictMap"], "TypedDict estabelece tipagem estática sobre dicionários sem custo de runtime, guiando o linter."),
        q("Por que declarar type hints como dict[str, list[float]] melhora o ciclo de vida do software?", "Esclarece o contrato de dados para outros desenvolvedores e permite validação estática de tipos com MyPy", ["Garante que o código execute dez vezes mais rápido","Impede que o arquivo seja aberto em outros computadores"], "Type hints tornam contratos explícitos, prevenindo ambiguidades em estruturas aninhadas complexas."),
        t("Qual módulo padrão do Python fornece a função deepcopy para clonagem profunda?", ["copy"], "O módulo copy contém utilitários para clonagem de estruturas de dados em memória.", "import ____\nnovo = copy.deepcopy(original)"),
        g("Complete o type hint moderno que descreve um dicionário com chaves em string e valores em lista de inteiros:", ["dict[str, list[int]]"], "Tipos genéricos modernos usam colchetes diretos sem necessidade do módulo typing no Python 3.9+.", "def processar(tabela: ____) -> None: pass"),
        o("Ordene os critérios de governança para manter coleções complexas limpas e auditáveis:", ["Documentar o formato de dicionários complexos com type hints ou TypedDict","Utilizar copy.deepcopy ao criar instâncias de teste para evitar poluição mútua","Separar as fases de ingestão, agrupamento e agregação em funções coesas","Escrever testes automatizados validando o comportamento com estruturas vazias e ricas"], "Essa disciplina estrutural assegura estabilidade a pipelines de dados em larga escala."),
        p("Associe a ferramenta de governança de dados ao seu benefício arquitetural em Python:", [["copy.deepcopy()","Garante isolamento absoluto de memória duplicando recursivamente todos os níveis"],["TypedDict","Documenta a estrutura contratual esperada de dicionários para análise estática"],["type hints genéricos","Especifica tipos internos como list[dict[str, int]] aumentando a legibilidade"],["collections.abc","Módulo com protocolos abstratos como Iterable, Mapping e Sequence"]], "Dominar coleções estruturadas conclui com excelência a primeira etapa avançada de Python.")
        ]
      }
    ]
  });
})();
