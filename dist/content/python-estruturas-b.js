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
    5: [
      {
        id: "py-est-5-1-iter-protocolo",
        title: "O protocolo de iteração em Python",
        subtitle: "Apresentação · Métodos __iter__ e __next__",
        theory: "O protocolo de iteração fundamenta laços e percursos em Python. Qualquer objeto iterável fornece um iterador por meio de iter() ou __iter__(). O iterador produz itens sucessivos com next() ou __next__() e sinaliza o término levantando a exceção padrão StopIteration.",
        questions: [
          q("Qual método especial transforma um objeto iterável em um iterador em Python?", "__iter__()", ["__next__()","__len__()"], "O método __iter__() devolve o iterador associado que gerencia o estado da travessia."),
          q("Qual exceção built-in é levantada quando um iterador atinge o final dos dados?", "StopIteration", ["IndexError","KeyError"], "StopIteration indica o esgotamento dos elementos para laços e consumidores automáticos."),
          q("O que acontece ao chamar next(it) em um iterador que já chegou ao fim sem fornecer valor padrão?", "Levanta a exceção StopIteration imediatamente", ["Reinicia a iteração do primeiro item","Retorna None silenciosamente"], "Sem um segundo argumento de fallback, next() levanta StopIteration quando o iterador se esgota."),
          q("Qual função built-in aceita um iterável e chama internamente seu método __iter__()?", "iter()", ["next()","list()"], "iter(obj) invoca obj.__iter__() e retorna o iterador pronto para percurso."),
          t("Qual número next() retorna na primeira chamada sobre o iterador de [10, 20]?", ["10"], "O iterador começa apontando para o primeiro item da lista, retornando 10.", "it = iter([10, 20])\nprint(next(it))"),
          g("Complete a função para obter o próximo elemento do iterador:", ["next(it)"], "A função built-in next avança o iterador retornando o item atual.", "it = iter([1, 2])\nprimeiro = ____"),
          o("Ordene as etapas do protocolo de iteração executadas por um laço for:", ["Obter o iterador chamando iter() no objeto","Invocar next() para recuperar o próximo elemento","Executar o corpo do laço com o valor obtido","Capturar StopIteration e encerrar o laço com segurança"], "O for obtém o iterador, avança item a item e captura StopIteration ao encerrar."),
          p("Associe elemento do protocolo de iteração à sua responsabilidade:", [["iter(obj)","Obtém o iterador a partir de um objeto iterável"],["next(it)","Produz o próximo item do percurso"],["StopIteration","Exceção que sinaliza o fim dos elementos"],["__iter__","Método mágico que viabiliza o protocolo"]], "Cada peça compõe o mecanismo padrão de percurso em Python.")
        ]
      },
      {
        id: "py-est-5-2-iter-customizado",
        title: "Criando classes iteradoras personalizadas",
        subtitle: "Prática · Implementando __iter__ e __next__ em classes",
        theory: "Para criar um iterador personalizado em Python, define-se uma classe com os métodos __iter__() e __next__(). O método __iter__() geralmente retorna self, enquanto __next__() calcula o próximo elemento, atualiza o estado interno e lança StopIteration quando a condição de parada é atingida.",
        questions: [
          q("Qual valor o método __iter__() de uma classe iteradora deve comumente retornar?", "self", ["None","Uma nova lista vazia"], "Uma classe que já atua como iterador retorna sua própria instância (self) em __iter__()."),
          q("Qual método da classe é responsável por calcular o próximo valor e atualizar o ponteiro interno?", "__next__()", ["__iter__()","__step__()"], "__next__() faz o avanço de estado e entrega o dado correspondente."),
          q("O que deve ser executado dentro de __next__() quando a contagem ultrapassar o limite estabelecido?", "raise StopIteration", ["return False","break"], "raise StopIteration comunica formalmente aos laços externos que a sequência acabou."),
          q("Por que iteradores consomem pouca memória comparados a listas completas pré-alocadas?", "Porque geram cada valor sob demanda em vez de armazenar todos em memória", ["Porque compactam arquivos em disco","Porque desativam o coletor de lixo"], "A computação sob demanda (lazy evaluation) mantém apenas o estado atual na memória RAM."),
          t("Quantos números este iterador personalizado Contador(3) produz antes de parar?", ["3"], "Com limite 3, o contador produz 1, 2 e 3 antes de levantar StopIteration.", "class Contador:\n    def __init__(self, n): self.n = n; self.i = 0\n    def __iter__(self): return self\n    def __next__(self):\n        if self.i < self.n: self.i += 1; return self.i\n        raise StopIteration"),
          g("Complete o retorno do método __iter__ no iterador customizado:", ["self"], "O iterador retorna a si mesmo para satisfazer a interface de iteração.", "def __iter__(self):\n    return ____"),
          o("Ordene a estrutura de uma classe iteradora personalizada:", ["Definir __init__ inicializando limites e estado atual","Implementar __iter__ retornando self","Implementar __next__ verificando limites de parada","Lançar StopIteration se o limite for atingido"], "A classe prepara o estado, viabiliza iteração e controla a parada."),
          p("Associe termo de classe iteradora à sua função:", [["self.atual","Armazena o estado momentâneo da iteração"],["__iter__","Retorna a instância do iterador"],["__next__","Calcula o próximo valor da sequência"],["raise StopIteration","Encerra a geração de novos valores"]], "Elementos essenciais de classes iteradoras sob demanda.")
        ]
      },
      {
        id: "py-est-5-3-iter-sentinela",
        title: "A função iter() com valor sentinela",
        subtitle: "Exploração · iter(chamável, sentinela) para leitura e I/O",
        theory: "A função iter() possui uma segunda assinatura: iter(chamável, sentinela). Ela invoca repetidamente uma função sem argumentos até que o valor retornado seja igual ao sentinela. Esse padrão é ideal para leitura de arquivos em blocos, fluxos de rede e sensores sem usar laços infinitos manuais.",
        questions: [
          q("O que a forma iter(funcao, sentinela) faz a cada iteração?", "Invoca funcao() até que ela retorne o valor sentinela", ["Passa o sentinela como parâmetro para funcao","Compara o tamanho da função com o sentinela"], "iter() chama a função repetidamente e interrompe o percurso assim que o valor retornado iguala o sentinela."),
          q("Qual é o benefício de usar iter(arquivo.readline, \"\") ao ler arquivos?", "Itera linha por linha até o fim do arquivo sem laço while True manual", ["Fecha o arquivo na primeira linha lida","Lê todo o arquivo para uma única string"], "A string vazia \"\" indica fim de arquivo em readline(), funcionando como sentinela limpo."),
          q("Quando o iterador com sentinela levanta StopIteration?", "Assim que o chamável retorna um valor estritamente igual ao sentinela", ["Apenas após 1000 chamadas","Quando a função gera uma exceção de sintaxe"], "A igualdade com o sentinela desencadeia o término automático da iteração."),
          q("Qual tipo de primeiro argumento a assinatura de dois parâmetros de iter() exige?", "Um chamável (função ou lambda que não exige parâmetros)", ["Uma lista ou tupla estática","Um número inteiro positivo"], "O primeiro argumento deve ser invocável sem parâmetros, como um método ou closure."),
          t("Quantas chamadas são feitas se a função retornar 5, 8 e 0 com sentinela 0?", ["2"], "Os valores 5 e 8 são produzidos e entregues; quando retorna 0, a iteração para imediatamente.", "# produz 5, depois 8, depois 0 (sentinela)"),
          g("Complete o sentinela para ler linhas até a string vazia de fim de arquivo:", ["\"\""], "A string vazia representa EOF para readline().", "for linha in iter(arquivo.readline, ____): pass"),
          o("Ordene a leitura de fluxo com iterador sentinela:", ["Definir a função ou método de leitura sem parâmetros","Identificar o valor sentinela que indica encerramento","Criar o iterador com iter(leitor, sentinela)","Consumir os dados em um laço for idiomático"], "Configuração e consumo de iteradores sentinela para fluxos contínuos."),
          p("Associe argumento de iter(chamavel, sentinela) ao seu propósito:", [["chamável","Função invocada a cada passo do iterador"],["sentinela","Valor especial que encerra o percurso"],["StopIteration","Sinal emitido quando o sentinela é produzido"],["laço for","Estrutura que consome o iterador de sentinela"]], "Componentes fundamentais da iteração orientada a sentinela.")
        ]
      },
      {
        id: "py-est-5-4-itertools-infinitos",
        title: "Iteradores infinitos com itertools",
        subtitle: "Aprofundamento · count, cycle e repeat para geração contínua",
        theory: "O módulo itertools oferece iteradores eficientes para sequências contínuas. count(start, step) gera uma contagem aritmética infinita, cycle(iteravel) repete ciclicamente os itens de uma coleção e repeat(elem, n) emite o mesmo elemento repetidamente ou de forma ilimitada com baixíssimo custo.",
        questions: [
          q("Qual função de itertools produz uma progressão aritmética infinita de números?", "itertools.count()", ["itertools.cycle()","itertools.repeat()"], "count(inicio, passo) gera números indefinidamente a partir do valor inicial."),
          q("Qual função de itertools repete indefinidamente os elementos de uma sequência finita?", "itertools.cycle()", ["itertools.chain()","itertools.accumulate()"], "cycle() memoriza os elementos e reinicia o percurso ao atingir o último item."),
          q("Como evitar um laço infinito ao consumir um iterador gerado por itertools.count()?", "Usando uma condição com break ou combinando com itertools.islice()", ["Desativando o processador com sys.exit()","Iteradores infinitos sempre terminam sozinhos"], "Laços sobre iteradores infinitos precisam de interrupção explícita ou fatiamento com islice."),
          q("Qual é a finalidade principal de itertools.repeat(item, vezes)?", "Repetir um valor imutável por um número de vezes especificado ou indefinidamente", ["Duplicar chaves de um dicionário","Criar cópias profundas em disco"], "repeat() é ideal para passar valores fixos a funções mapeadoras e preenchimentos."),
          t("Qual terceiro número é emitido por itertools.count(10, 5)?", ["20"], "A sequência inicia em 10, passa para 15 e atinge 20 no terceiro elemento.", "import itertools\nc = itertools.count(10, 5) # 10, 15, 20..."),
          g("Complete a função para ciclar entre os estados \"ativo\" e \"inativo\":", ["itertools.cycle"], "cycle repete continuamente a coleção fornecida.", "import itertools\nestados = ____([\"ativo\", \"inativo\"])"),
          o("Ordene os passos para limitar com segurança um iterador infinito:", ["Importar o módulo itertools","Criar o iterador infinito como itertools.count()","Aplicar itertools.islice(iterador, limite)","Consumir os elementos com segurança em um for ou list()"], "islice permite consumir uma porção finita de fluxos sem limites."),
          p("Associe função de itertools ao seu comportamento:", [["count(1, 2)","Gera 1, 3, 5, 7... indefinidamente"],["cycle([A, B])","Alterna A, B, A, B... continuamente"],["repeat(X, 3)","Produz o elemento X exatamente 3 vezes"],["islice(it, 5)","Extrai os 5 primeiros itens de um iterador"]], "Ferramentas de itertools para fluxos e sequências geradas sob demanda.")
        ]
      },
      {
        id: "py-est-5-5-itertools-combinacoes",
        title: "Combinatória e agrupamento com itertools",
        subtitle: "Consolidação · chain, zip_longest, groupby e permutations",
        theory: "Para trabalhar com múltiplos fluxos, itertools traz chain() para concatenar iteráveis sem criar listas intermediárias, zip_longest() para emparelhar coleções de tamanhos distintos com valor de preenchimento e groupby() para agrupar elementos adjacentes com chaves comuns.",
        questions: [
          q("Qual função de itertools une múltiplos iteráveis em um único fluxo contínuo sem copiar listas?", "itertools.chain()", ["itertools.append()","itertools.join()"], "chain() percorre sequencialmente cada coleção fornecida sem concatenar em memória."),
          q("O que zip_longest faz quando um dos iteráveis acaba antes dos demais?", "Continua preenchendo os valores ausentes com fillvalue (padrão None)", ["Lança IndexError imediatamente","Interrompe o percurso no iterável menor"], "Ao contrário de zip(), zip_longest aguarda a exaustão do iterável mais longo preenchendo o restante."),
          q("Qual pré-requisito fundamental é exigido por itertools.groupby() para agrupar corretamente?", "Os dados de entrada precisam estar previamente ordenados pela chave de agrupamento", ["Os dados devem ser tuplas de inteiros","O iterador precisa ter tamanho par"], "groupby agrupa apenas itens consecutivos; se não estiver ordenado, chaves repetidas criam múltiplos grupos."),
          q("Qual é a diferença entre permutations e combinations no módulo itertools?", "permutations considera a ordem dos elementos; combinations ignora a ordem", ["combinations aceita repetição de elementos idênticos","permutations só funciona com strings"], "Em permutações (A, B) difere de (B, A); em combinações representam o mesmo subconjunto."),
          t("Quantos elementos totais o iterador itertools.chain([1, 2], [3, 4, 5]) produz?", ["5"], "chain encadeia os 2 itens da primeira lista com os 3 da segunda, somando 5.", "import itertools\ntotal = list(itertools.chain([1, 2], [3, 4, 5]))"),
          g("Complete o preenchimento padrão para coleções de comprimentos desiguais:", ["itertools.zip_longest"], "zip_longest percorre até a coleção mais longa com preenchimento.", "pares = ____([1, 2], [10], fillvalue=0)"),
          o("Ordene as etapas para agrupar registros de alunos por turma com groupby:", ["Definir a lista com dicionários contendo turma e nome","Ordenar a lista pela chave \"turma\" usando sorted()","Invocar itertools.groupby(lista, key=lambda x: x[\"turma\"])","Iterar sobre cada grupo gerado processando seus itens"], "A pré-ordenação é indispensável para agrupamentos contíguos com groupby."),
          p("Associe função combinatória ao seu efeito:", [["chain(a, b)","Concatena fluxos de forma transparente"],["zip_longest(a, b)","Pareia coleções até a mais longa esgotar"],["groupby(dados, key)","Agrupa elementos contíguos com a mesma chave"],["combinations(itens, 2)","Gera pares sem repetição e sem importar ordem"]], "Mecanismos de agrupamento e combinação expressivos em Python.")
        ]
      }
    ],
    6: [
      {
        id: "py-est-6-1-yield-basico",
        title: "Funções geradoras com yield",
        subtitle: "Apresentação · Pausa e retomada na execução de funções",
        theory: "Uma função geradora utiliza a instrução yield em vez de return. Quando yield é executado, a função produz um valor, suspende seu estado local (incluindo variáveis e ponteiro de execução) e retorna o controle ao chamador. Uma nova chamada a next() retoma a execução exatamente onde parou.",
        questions: [
          q("Qual palavra-chave transforma uma função comum em uma função geradora em Python?", "yield", ["return","generator"], "A simples presença de yield no corpo da função faz com que ela retorne um objeto gerador."),
          q("O que acontece com as variáveis locais da função geradora quando yield é acionado?", "São preservadas no estado atual para a próxima retomada", ["São apagadas da memória do computador","Tornam-se variáveis globais do módulo"], "O gerador congela seu frame de execução, guardando variáveis e contexto para a chamada seguinte."),
          q("Qual objeto é retornado ao invocar uma função que contém yield em seu corpo?", "Um objeto gerador (generator object)", ["O primeiro valor gerado imediatamente","Uma tupla com todos os resultados"], "Chamar a função apenas cria o gerador; nenhum código executa até next() ser invocado."),
          q("Qual exceção o gerador levanta automaticamente quando termina sua execução?", "StopIteration", ["RuntimeError","GeneratorExit"], "O encerramento natural do corpo da função geradora levanta StopIteration."),
          t("Qual primeiro valor a função contagem() entrega ao chamador?", ["1"], "A primeira instrução yield entrega 1 e congela a função.", "def contagem():\n    yield 1\n    yield 2\ng = contagem()\nprint(next(g))"),
          g("Complete a instrução que produz o item e pausa a execução da função geradora:", ["yield"], "yield emite o valor e suspende o gerador.", "def pares():\n    ____ 2"),
          o("Ordene o ciclo de vida de uma chamada a uma função geradora:", ["Definir a função contendo a instrução yield","Invocar a função para instanciar o objeto gerador","Chamar next() no gerador para executar até o primeiro yield","Repetir chamadas a next() até o término com StopIteration"], "Criação, avanço sob demanda e término natural de geradores."),
          p("Associe termo de gerador ao seu papel:", [["yield","Produz valor e suspende a função"],["next(gen)","Retoma a execução até o próximo yield"],["Objeto gerador","Iterador leve retornado pela função"],["StopIteration","Indica fim do fluxo do gerador"]], "Elementos centrais do funcionamento de funções geradoras.")
        ]
      },
      {
        id: "py-est-6-2-expressoes-geradoras",
        title: "Expressões geradoras compactas",
        subtitle: "Prática · Sintaxe (x for x in seq) e economia de memória",
        theory: "Expressões geradoras oferecem uma sintaxe concisa para criar geradores sem definir funções com def. Usam parênteses no lugar de colchetes: (item for item in colecao). Ao contrário das compreensões de lista, elas não alocam toda a sequência em memória, computando cada valor sob demanda.",
        questions: [
          q("Qual é a sintaxe correta para criar uma expressão geradora de quadrados?", "(x**2 for x in numeros)", ["[x**2 for x in numeros]","{x**2 for x in numeros}"], "Expressões geradoras utilizam parênteses, produzindo itens de forma preguiçosa (lazy)."),
          q("Qual é a principal vantagem de uma expressão geradora sobre uma list comprehension?", "Consumo constante e mínimo de memória mesmo para milhões de itens", ["Execução multithread automática","Possibilidade de indexação direta com [0]"], "Como os valores não são armazenados simultaneamente, o consumo de memória é estável e baixo."),
          q("O que acontece se tentarmos acessar gen[0] em uma expressão geradora?", "Gera um TypeError porque geradores não suportam indexação direta", ["Retorna o primeiro elemento sem consumi-lo","Converte automaticamente o gerador em lista"], "Geradores são fluxos unidirecionais sob demanda; não possuem tamanho fixo nem índices."),
          q("Quando uma expressão geradora é passada diretamente como único argumento para sum(), podemos:", "Omitir os parênteses extras da expressão geradora", ["Converter compulsoriamente para conjunto","Usar chaves duplas"], "sum(x for x in seq) é sintaxe válida e idiomática em Python."),
          t("Qual resultado da soma dos quadrados dos números 1, 2 e 3 via expressão geradora?", ["14"], "1**2 + 2**2 + 3**2 = 1 + 4 + 9 = 14.", "resultado = sum(x**2 for x in [1, 2, 3])\nprint(resultado)"),
          g("Complete a expressão geradora que dobra cada número da lista:", ["(n * 2 for n in numeros)"], "Expressões geradoras utilizam delimitadores de parênteses.", "numeros = [1, 2, 3]\ndobros = ____"),
          o("Ordene as etapas para processar um arquivo volumoso com expressão geradora:", ["Abrir o arquivo para leitura linha a linha","Criar expressão geradora limpando espaços de cada linha","Filtrar apenas as linhas de interesse com if na expressão","Consumir os resultados com um laço for ou agregador como sum()"], "Processamento em pipeline com consumo mínimo de recursos."),
          p("Associe estrutura à sua característica de consumo de memória:", [["[x for x in seq]","Aloca todos os elementos na memória de uma vez"],["(x for x in seq)","Gera itens sob demanda com uso mínimo de memória"],["sum(gen)","Consome o gerador acumulando o total"],["list(gen)","Materializa todo o gerador em uma nova lista"]], "Comparação direta entre estruturas preguiçosas e ávidas.")
        ]
      },
      {
        id: "py-est-6-3-yield-from",
        title: "Delegação de subgeradores com yield from",
        subtitle: "Aprofundamento · Composição transparente de múltiplos iteráveis",
        theory: "A instrução yield from delega a iteração diretamente para outro gerador ou iterável. Ela produz automaticamente todos os valores do subgerador sem exigir um laço for interno manual, repassando também valores retornados com return e permitindo comunicação bidirecional com facilidade.",
        questions: [
          q("Para que serve a instrução yield from em funções geradoras Python?", "Para delegar a produção de valores para um subgerador ou iterável", ["Para reiniciar o gerador a partir do zero","Para encerrar a função e descartar erros"], "yield from consome o subiterável e transmite seus itens transparentemente para o chamador."),
          q("Qual código é semanticamente equivalente a: yield from colecao?", "for item in colecao: yield item", ["return colecao","yield colecao"], "yield from substitui o laço for explícito de repasse com maior desempenho e suporte a retorno."),
          q("Se o subgerador encerrar com return \"sucesso\", como o gerador pai obtém esse valor?", "Armazenando o resultado de yield from em uma variável: res = yield from sub()", ["O valor de retorno é descartado","O valor é impresso no terminal"], "O valor do return em um gerador torna-se o resultado da expressão yield from no gerador chamador."),
          q("O que acontece se aplicarmos yield from em uma string como \"PY\"?", "Produz cada caractere separadamente: \"P\" e depois \"Y\"", ["Lança TypeError por não ser lista","Produz a palavra inteira de uma vez"], "Como strings são iteráveis, yield from emite caractere por caractere sucessivamente."),
          t("Quantos números totais são gerados pela cadeia composta por yield from [1, 2] e yield from [3, 4]?", ["4"], "Os dois subiteráveis produzem 2 elementos cada, totalizando 4 itens.", "def cadeia():\n    yield from [1, 2]\n    yield from [3, 4]\nprint(len(list(cadeia())))"),
          g("Complete a instrução de delegação para o subgerador de dígitos:", ["yield from"], "yield from repassa todos os elementos do iterável diretamente.", "def mestre():\n    ____ subgerador()"),
          o("Ordene a execução de um gerador que delega com yield from:", ["O gerador pai inicia e atinge a linha yield from sub()","O subgerador assume o controle e produz itens para o cliente","O cliente chama next() consumindo valores do subgerador","O subgerador encerra e o gerador pai retoma na linha seguinte"], "Delegação fluida e retorno de controle entre geradores e subgeradores."),
          p("Associe padrão de delegação à sua vantagem:", [["yield from sub()","Delegação direta sem boilerplate de laço for"],["res = yield from sub()","Captura o valor de encerramento do subgerador"],["yield from \"texto\"","Itera caractere a caractere de forma transparente"],["yield from gen_a(), gen_b()","Encadeia pipelines de geradores com facilidade"]], "Padrões de delegação de iteráveis em arquiteturas funcionais.")
        ]
      },
      {
        id: "py-est-6-4-comunicacao-geradores",
        title: "Comunicação bidirecional com send()",
        subtitle: "Avançado · Enviando dados para dentro de geradores ativos",
        theory: "Geradores em Python não apenas produzem dados, mas também podem recebê-los via método send(valor). A instrução x = yield valor permite que o gerador entregue um dado e capture a resposta injetada pelo chamador, servindo como base para corrotinas cooperativas e máquinas de estado.",
        questions: [
          q("Qual método envia um valor para dentro de um gerador e retoma sua execução?", "gerador.send(valor)", ["gerador.next(valor)","gerador.push(valor)"], "send() retoma a execução atribuindo o valor enviado ao resultado da expressão yield."),
          q("O que deve ser enviado na primeiríssima chamada de send() em um gerador recém-criado?", "None (gerador.send(None)) ou usar next(gerador) primeiro para inicializá-lo", ["O primeiro dado de negócio","Um número zero obrigatoriamente"], "Um gerador não iniciado ainda não parou em um yield para receber dados, exigindo priming com None."),
          q("Qual método encerra forçadamente um gerador levantando GeneratorExit dentro dele?", "gerador.close()", ["gerador.stop()","gerador.exit()"], "close() lança GeneratorExit no ponto onde o gerador estava pausado, liberando recursos."),
          q("Como um gerador pode interceptar ou reagir ao seu encerramento via close()?", "Usando um bloco try/finally ao redor das expressões yield", ["Desativando o garbage collector","Redefinindo o método __del__"], "O bloco finally garante limpeza de arquivos, conexões e recursos quando o gerador é fechado."),
          t("Qual número acumulado é retornado após enviar 10 para um acumulador inicializado?", ["10"], "O gerador recebe 10 via send e atualiza o total para 10.", "# acumulador recebe 10 e emite o novo total"),
          g("Complete o comando que inicializa o gerador antes de enviar dados com send:", ["next(g)"], "next(g) ou g.send(None) avança o gerador até o primeiro yield.", "g = processador()\n____ # priming inicial"),
          o("Ordene o fluxo de comunicação bidirecional com um gerador:", ["Criar a instância do gerador contendo atribuição de yield","Executar next(gen) para avançar a execução até o primeiro yield","Chamar gen.send(dado) para injetar uma entrada no gerador","Chamar gen.close() para finalizar o ciclo de vida do gerador"], "Inicialização, injeção de valores sob demanda e encerramento limpo."),
          p("Associe método de controle de geradores ao seu propósito:", [["send(dado)","Injeta um valor na expressão yield e avança o gerador"],["close()","Lança GeneratorExit para encerrar a corrotina"],["throw(tipo)","Lança uma exceção no ponto de pausa do gerador"],["next(gen)","Avança o gerador sem enviar nenhum valor (envia None)"]], "Métodos avançados para orquestração de corrotinas com geradores.")
        ]
      },
      {
        id: "py-est-6-5-pipeline-geradores",
        title: "Pipelines de dados com geradores",
        subtitle: "Consolidação · Encadeamento de estágios para grandes volumes",
        theory: "Encadear geradores cria pipelines de processamento elegantes e escaláveis para grandes volumes de dados. Cada estágio consome itens sob demanda do estágio anterior, aplica filtros ou transformações e entrega o resultado ao próximo estágio sem gerar coleções intermediárias na memória.",
        questions: [
          q("Qual é o benefício arquitetural de encadear múltiplos geradores em pipeline?", "Processar dados linha a linha com baixo uso de memória e baixo acoplamento", ["Executar cada estágio em uma máquina remota diferente","Garantir que os dados fiquem salvos em disco"], "Cada estágio opera como um filtro leve sobre o fluxo contínuo do estágio anterior."),
          q("Em um pipeline gerador: linhas -> limpas -> filtradas -> somadas, quando os cálculos acontecem?", "Apenas quando o consumidor final (ex: sum) solicita o próximo item", ["No instante em que as funções são chamadas e conectadas","Quando o interpretador Python carrega o arquivo"], "O fluxo é completamente orientado pela demanda do estágio terminal (pull-based)."),
          q("O que acontece com a memória se processarmos um log de 50 GB usando pipeline de geradores?", "A memória utilizada permanece pequena e constante durante todo o processamento", ["A memória RAM é consumida até travar a máquina","O arquivo é duplicado na pasta temporária"], "Apenas uma linha ou registro transita pela cadeia a cada instante."),
          q("Qual função built-in terminal é ideal para agregar valores numéricos de um pipeline de geradores?", "sum()", ["str()","chr()"], "sum() consome o fluxo de números do gerador iterativamente acumulando o total."),
          t("Quantos itens saem de um pipeline que filtra números pares de [1, 2, 3, 4, 5, 6]?", ["3"], "Os pares 2, 4 e 6 passam pelo filtro, resultando em 3 elementos.", "numeros = range(1, 7)\npares = (n for n in numeros if n % 2 == 0)\nprint(len(list(pares)))"),
          g("Complete o estágio de transformação do pipeline para converter linhas em inteiros:", ["(int(linha) for linha in linhas)"], "Expressões geradoras encadeiam transformações com eficiência.", "valores = ____"),
          o("Ordene as camadas de um pipeline de auditoria de logs com geradores:", ["Gerador leitor: extrai linhas brutas do arquivo em disco","Gerador normalizador: remove quebras de linha e espaços","Gerador validador: filtra apenas linhas com código de erro 500","Consumidor final: conta as ocorrências ou grava em relatório"], "Do dado bruto ao resultado analítico através de estágios modulares."),
          p("Associe estágio de pipeline ao seu papel no fluxo:", [["Leitor","Extrai registros brutos de arquivos ou rede"],["Transformador","Aplica mapeamento e conversão de formato aos itens"],["Filtro","Descarta registros que não cumprem o critério"],["Consumidor","Acumula métricas ou grava o resultado final"]], "Separação de responsabilidades em arquiteturas de streaming.")
        ]
      }
    ],
    7: [
      {
        id: "py-est-7-1-sorted-basico",
        title: "Ordenação com sorted() e sort()",
        subtitle: "Apresentação · Diferenças entre ordenação in-place e nova lista",
        theory: "Python oferece duas abordagens para ordenação: o método list.sort() que ordena a lista original in-place sem alocar nova lista (retornando None), e a função built-in sorted() que aceita qualquer iterável e retorna uma nova lista ordenada preservando a coleção original intacta.",
        questions: [
          q("Qual é a principal diferença entre lista.sort() e a função sorted(lista)?", "sort() altera a lista in-place; sorted() retorna uma nova lista ordenada", ["sort() ordena em ordem decrescente obrigatoriamente","sorted() só funciona com inteiros"], "sort() modifica a lista original e retorna None; sorted() cria e entrega uma nova lista."),
          q("O que a chamada numeros.sort() retorna em Python?", "None", ["A própria lista ordenada","O tamanho da lista ordenada"], "Como a alteração é feita in-place na lista, o método sort() retorna None por convenção."),
          q("Qual argumento opcional inverte a ordenação para ordem decrescente em ambas as funções?", "reverse=True", ["order=\"desc\"","descending=True"], "O parâmetro booleano reverse=True instrui o algoritmo a inverter a sequência."),
          q("Qual algoritmo de ordenação estável é utilizado pelo Python nativamente?", "Timsort (combinação de Merge Sort e Insertion Sort)", ["QuickSort tradicional","Bubble Sort"], "Timsort é altamente otimizado para dados do mundo real que já possuem trechos ordenados."),
          t("Qual número fica na posição de índice 0 após sorted([9, 2, 7])?", ["2"], "A ordenação padrão é crescente; o menor valor (2) ocupa o índice 0.", "res = sorted([9, 2, 7])\nprint(res[0])"),
          g("Complete o argumento para ordenar a lista em ordem decrescente:", ["reverse=True"], "reverse=True ordena do maior para o menor elemento.", "valores = sorted([1, 5, 2], ____)"),
          o("Ordene os passos para ordenar dados mantendo a lista de entrada inalterada:", ["Criar a lista de dados brutos original","Invocar a função sorted(dados_originais)","Armazenar a nova lista ordenada em outra variável","Constatar que a lista original continua na ordem inicial"], "Uso de sorted() para garantir a imutabilidade do dado original."),
          p("Associe ferramenta de ordenação à sua característica:", [["lista.sort()","Modifica a lista in-place e retorna None"],["sorted(iterável)","Retorna uma nova lista ordenada a partir de qualquer iterável"],["reverse=True","Inverte a ordem padrão para decrescente"],["Timsort","Algoritmo de ordenação híbrido e estável do Python"]], "Distinções fundamentais de ordenação no ecossistema Python.")
        ]
      },
      {
        id: "py-est-7-2-sort-key",
        title: "Ordenação customizada com key",
        subtitle: "Prática · Parâmetro key, len, str.lower e funções lambda",
        theory: "O parâmetro key permite personalizar o critério de ordenação em sorted() e sort(). Ele recebe uma função unária aplicada a cada elemento antes da comparação. Funções comuns incluem len para ordenar por tamanho, str.lower para ignorar maiúsculas/minúsculas e lambdas para chaves específicas.",
        questions: [
          q("Qual é o papel do parâmetro key nas funções de ordenação do Python?", "Define uma função de transformação cujo resultado servirá de base na comparação", ["Define o número de threads do algoritmo","Filtra itens que devem ser removidos da lista"], "O valor devolvido por key(elemento) determina a prioridade de ordenação."),
          q("Como ordenar uma lista de palavras pelo seu comprimento em caracteres?", "sorted(palavras, key=len)", ["sorted(palavras, order=\"size\")","palavras.sort(by_length=True)"], "Passar key=len compara as strings com base no número de caracteres retornado por len()."),
          q("Por que passar key=str.lower é importante ao ordenar strings alfabeticamente?", "Evita que letras maiúsculas venham antes de minúsculas pela tabela ASCII", ["Converte a lista original permanentemente para minúsculas","Melhora o desempenho do Timsort em 50%"], "Na tabela ASCII letras maiúsculas possuem códigos menores; key=str.lower equaliza o critério."),
          q("Como ordenar uma lista de tuplas (nome, idade) pela idade usando lambda?", "sorted(pessoas, key=lambda p: p[1])", ["sorted(pessoas, key=\"idade\")","pessoas.sort(index=1)"], "lambda p: p[1] extrai o segundo elemento de cada tupla para atuar como critério de ordenação."),
          t("Qual palavra fica em primeiro ao ordenar [\"banana\", \"uva\", \"abacaxi\"] com key=len?", ["uva"], "Uva tem 3 letras, sendo a menor palavra da lista.", "frutas = [\"banana\", \"uva\", \"abacaxi\"]\nres = sorted(frutas, key=len)\nprint(res[0])"),
          g("Complete o parâmetro para ordenar ignorando distinção entre maiúsculas e minúsculas:", ["key=str.lower"], "key=str.lower compara as versões normalizadas de cada string.", "nomes = sorted([\"ana\", \"Bruno\", \"Carlos\"], ____)"),
          o("Ordene as etapas para ordenar uma lista de produtos por preço com lambda:", ["Definir a lista de produtos como dicionários com nome e preco","Criar a função lambda p: p[\"preco\"] como extratora do critério","Chamar sorted(produtos, key=lambda p: p[\"preco\"])","Obter a nova lista ordenada pelo valor numérico do preço"], "Definição e uso de chaves personalizadas de ordenação."),
          p("Associe chave de ordenação ao resultado produzido:", [["key=len","Ordena strings ou coleções pelo tamanho"],["key=str.lower","Ordena alfabeticamente sem distinguir maiúsculas"],["key=lambda x: x[1]","Ordena tuplas pelo segundo elemento"],["key=abs","Ordena números por sua magnitude absoluta"]], "Transformações aplicadas pelo parâmetro key em ordenações.")
        ]
      },
      {
        id: "py-est-7-3-operator-module",
        title: "Critérios eficientes com operator",
        subtitle: "Aprofundamento · itemgetter e attrgetter para alta performance",
        theory: "O módulo operator fornece funções de extração escritas em C que superam lambdas em legibilidade e desempenho. operator.itemgetter(\"chave\") extrai campos de dicionários ou índices de sequências, enquanto operator.attrgetter(\"atributo\") extrai propriedades de objetos complexos.",
        questions: [
          q("Por que usar operator.itemgetter(\"preco\") é preferível a lambda x: x[\"preco\"]?", "É implementado em C, sendo mais rápido e expressando intenção declarativa", ["Permite alterar o valor do item em disco","Garante ordenação aleatória de alta segurança"], "itemgetter é otimizado em código nativo, evitando o overhead de criar closures em Python puro."),
          q("Qual função de operator deve ser usada para ordenar uma lista de objetos pela propriedade obj.data?", "operator.attrgetter(\"data\")", ["operator.itemgetter(\"data\")","operator.get_field(\"data\")"], "attrgetter acessa atributos de objetos diretamente via getattr() otimizado."),
          q("Como ordenar uma coleção por múltiplos campos (ex: setor e depois salario decrescente)?", "itemgetter(\"setor\", \"salario\") para chave composta ou ordenações estáveis sucessivas", ["Usando duas funções sort concorrentes","O Python não suporta ordenação por múltiplos campos"], "itemgetter pode extrair tuplas com múltiplos critérios, respeitados na ordem pelo Timsort estável."),
          q("O que a estabilidade do algoritmo Timsort garante quando dois itens têm a mesma chave?", "Mantém a ordem relativa original entre eles exatamente como estavam na entrada", ["Inverte a ordem dos itens com chaves idênticas","Lança um aviso de colisão de ordenação"], "A estabilidade preserva a relação original de elementos com chaves de ordenação idênticas."),
          t("Qual cidade fica em primeiro ao ordenar por itemgetter(\"idade\") se Ana tem 20 e Bia 30?", ["20"], "O itemgetter extrai a idade 20 de Ana, vindo antes da idade 30 de Bia.", "from operator import itemgetter\npessoas = [{\"nome\":\"Ana\",\"idade\":20},{\"nome\":\"Bia\",\"idade\":30}]\nres = sorted(pessoas, key=itemgetter(\"idade\"))"),
          g("Complete a extração do atributo nota usando o módulo operator:", ["attrgetter(\"nota\")"], "attrgetter recupera atributos de objetos de forma eficiente.", "from operator import attrgetter\nordenados = sorted(alunos, key=____)"),
          o("Ordene as etapas para ordenar registros com itemgetter por dois campos:", ["Importar itemgetter do módulo operator","Definir a lista de registros de vendas","Configurar o critério duplo com itemgetter(\"regiao\", \"valor\")","Executar sorted() obtendo ordenação por região e desempate por valor"], "Ordenação composta com estabilidade e alto desempenho nativo."),
          p("Associe função de operator ao seu caso de uso:", [["itemgetter(\"chave\")","Extrai valor de dicionário ou índice de sequência"],["attrgetter(\"prop\")","Extrai atributo de instâncias de classes e objetos"],["itemgetter(0, 1)","Extrai tupla com múltiplos campos para desempate"],["methodcaller(\"metodo\")","Invoca método do objeto como chave de comparação"]], "Utilitários de operator para pipelines e ordenação performática.")
        ]
      },
      {
        id: "py-est-7-4-busca-binaria-bisect",
        title: "Busca e inserção eficiente com bisect",
        subtitle: "Aprofundamento · Otimizando buscas em listas já ordenadas",
        theory: "O módulo bisect implementa busca binária sobre listas previamente ordenadas. Com complexidade logarítmica O(log n), bisect_left() e bisect_right() encontram o ponto exato de inserção de um elemento, enquanto insort() insere o item na posição correta mantendo a lista ordenada.",
        questions: [
          q("Qual é o pré-requisito mandatório para utilizar as funções do módulo bisect?", "A lista deve estar previamente ordenada", ["A lista deve conter apenas números inteiros pares","A lista não pode ter elementos repetidos"], "A busca binária pressupõe que os elementos estejam ordenados para descartar metades do espaço de busca."),
          q("Qual é a complexidade de tempo de busca das funções bisect em uma lista ordenada de tamanho N?", "O(log n)", ["O(n)","O(1)"], "A divisão sucessiva por 2 garante custo logarítmico para localização do índice."),
          q("Qual é a diferença entre bisect_left() e bisect_right() ao encontrar um elemento já existente?", "bisect_left retorna o índice antes das duplicatas; bisect_right retorna após", ["bisect_left só busca números negativos","bisect_right remove as duplicatas encontradas"], "bisect_left insere à esquerda dos iguais; bisect_right insere à direita preservando a ordem."),
          q("Qual função de bisect encontra o índice e já insere o novo item na lista in-place?", "bisect.insort()", ["bisect.insert_sorted()","bisect.append_bin()"], "insort() localiza a posição correta via busca binária e executa a inserção."),
          t("Em qual índice bisect.bisect_left([10, 20, 30], 20) localiza o número 20?", ["1"], "O número 20 já existe no índice 1, sendo este o ponto de inserção à esquerda.", "import bisect\nidx = bisect.bisect_left([10, 20, 30], 20)\nprint(idx)"),
          g("Complete o método para inserir o número 15 mantendo a lista ordenada:", ["bisect.insort"], "insort insere diretamente na posição correta da lista ordenada.", "import bisect\nlista = [10, 20, 30]\n____(lista, 15)"),
          o("Ordene as etapas para implementar faixas de notas (A, B, C) usando bisect:", ["Definir os pontos de corte numéricos em uma lista ordenada: [60, 70, 80, 90]","Definir a lista de conceitos correspondentes: [\"F\", \"D\", \"C\", \"B\", \"A\"]","Calcular o índice da faixa usando bisect.bisect_right(cortes, nota)","Recuperar o conceito correspondente no índice obtido"], "Tabela de faixas de valores baseada em busca binária limpa e rápida."),
          p("Associe função de bisect ao seu comportamento:", [["bisect_left(seq, x)","Índice de inserção de x à esquerda de iguais"],["bisect_right(seq, x)","Índice de inserção de x à direita de iguais"],["insort(seq, x)","Localiza e insere x mantendo a lista ordenada"],["O(log n)","Complexidade da localização binária do índice"]], "Operações fundamentais do módulo bisect para dados ordenados.")
        ]
      },
      {
        id: "py-est-7-5-projeto-ordenacao-busca",
        title: "Projeto: ranking e catálogo pesquisável",
        subtitle: "Consolidação · Construindo busca e classificação performática",
        theory: "Integrando sorted, operator e bisect, construímos sistemas robustos de ranking e consulta. Uma estrutura bem desenhada separa o armazenamento ordenado para busca rápida da transformação sob demanda de relatórios e exibições, reduzindo a complexidade de algoritmos de dados no dia a dia.",
        questions: [
          q("Qual estrutura e técnica combinadas oferecem ranking sempre atualizado com inserções rápidas?", "Lista ordenada mantida com bisect.insort() e consulta por bisect", ["Recriar e reordenar uma lista do zero a cada consulta","Usar um conjunto sem ordenação garantida"], "Manter a lista ordenada incrementalmente com bisect evita o custo de reordenação total a cada entrada."),
          q("Como buscar produtos em um intervalo de preços [min, max] de forma eficiente em lista ordenada?", "Localizar o índice inicial com bisect_left(min) e final com bisect_right(max), fatiando a lista", ["Fazer um laço for completo por todos os produtos da loja","Converter todos os preços para string"], "A busca binária encontra as extremidades do intervalo em O(log n), extraindo a fatia diretamente."),
          q("O que acontece com o custo computacional se uma lista de 100.000 itens for reordenada a cada inserção?", "O custo cresce para O(n log n) por inserção, degradando gravemente a aplicação", ["O Timsort executa em O(1)","O coletor de lixo cancela as inserções"], "Reordenar uma lista inteira a cada item adicionado é um gargalo clássico que bisect resolve."),
          q("Como ordenar jogadores por pontuação decrescente e desempate por nome alfabético?", "sorted(jogadores, key=lambda j: (-j[\"pontos\"], j[\"nome\"]))", ["jogadores.sort(reverse=True, key=lambda j: j[\"nome\"])","jogadores.sort(by=[\"pontos\", \"nome\"])"], "A tupla com pontuação negativada inverte apenas o critério numérico mantendo o nome em ordem crescente."),
          t("Quantos jogadores compõem o top 3 extraído de um ranking ordenado por pontuação?", ["3"], "O fatiamento [:3] recupera os três primeiros classificados do ranking.", "ranking = [\"Primeiro\", \"Segundo\", \"Terceiro\", \"Quarto\"]\ntop3 = ranking[:3]\nprint(len(top3))"),
          g("Complete o desempate de ranking com tupla de pontuação decrescente e nome crescente:", ["(-pontos, nome)"], "Negativar o valor numérico inverte a direção daquele campo na tupla de chave.", "chave = lambda j: ____"),
          o("Ordene as etapas de uma consulta de catálogo por faixa de preço com bisect:", ["Garantir que a lista de produtos esteja ordenada pelo atributo preco","Encontrar o índice do preço mínimo com bisect_left(precos, p_min)","Encontrar o índice do preço máximo com bisect_right(precos, p_max)","Extrair a fatia produtos[i_min:i_max] correspondente ao filtro"], "Consulta de intervalos em tempo logarítmico em catálogos ordenados."),
          p("Associe desafio de catálogo à sua solução idiomática:", [["Consulta por faixa de preço","Fatiamento de lista ordenada delimitada por bisect"],["Ranking com desempate","Chave com tupla de critérios de direções opostas"],["Inserção de novo score","bisect.insort para inclusão na posição exata"],["Exibição dos líderes","Fatiamento simples [:limite] da lista ordenada"]], "Padrões de alto desempenho para catálogos e rankings em Python.")
        ]
      }
    ],
    8: [
      {
        id: "py-est-8-1-map-filter-compreensao",
        title: "Transformações com map, filter e compreensões",
        subtitle: "Apresentação · Comparando estilo funcional e Python idiomático",
        theory: "Python oferece map() e filter() para transformações funcionais de sequências, mas compreensões de listas e geradores são geralmente preferidas por legibilidade. map e filter retornam iteradores preguiçosos, enquanto compreensões expressam mapeamento e filtragem em uma única instrução concisa.",
        questions: [
          q("Qual é o equivalente idiomático com compreensão de lista para: list(map(f, lista))?", "[f(x) for x in lista]", ["[x for x in f(lista)]","{f(x): x for x in lista}"], "[f(x) for x in lista] aplica a transformação de forma clara e direta."),
          q("Qual é o equivalente idiomático com compreensão para: list(filter(predicado, lista))?", "[x for x in lista if predicado(x)]", ["[predicado(x) for x in lista]","filter([x in lista])"], "O if na compreensão de lista atua exatamente como o predicado de filtragem."),
          q("O que map() e filter() retornam no Python 3 em vez de listas prontas?", "Iteradores preguiçosos (map object e filter object)", ["Listas completas de dados alocadas","Tuplas imutáveis"], "No Python 3, map e filter produzem itens sob demanda e exigem consumo ou conversão explícita."),
          q("Qual é a recomendação do guia de estilo PEP 8 sobre o uso de map/filter versus compreensões?", "Preferir compreensões de lista ou geradores por clareza sintática", ["Proibir totalmente compreensões de lista","Exigir map apenas com lambdas anônimas"], "Compreensões são amplamente consideradas mais legíveis e idiomáticas no ecossistema Python."),
          t("Quantos números pares resultam do filtro filter(lambda x: x % 2 == 0, [1, 2, 3, 4])?", ["2"], "Apenas 2 e 4 atendem à condição de resto zero.", "res = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4]))\nprint(len(res))"),
          g("Complete a compreensão equivalente a map(str.upper, palavras):", ["[p.upper() for p in palavras]"], "A compreensão aplica o método upper() a cada palavra da coleção.", "nomes = [\"a\", \"b\"]\nmaiusculas = ____"),
          o("Ordene a evolução da transformação de dados em Python:", ["Laço for manual com lista.append() para acumular itens","Uso funcional de map() e filter() com funções auxiliares","Compreensão de lista unindo mapeamento e filtragem","Expressão geradora para streaming com uso mínimo de memória"], "Evolução de estilo: do imperativo tradicional ao streaming idiomático."),
          p("Associe expressão funcional à sua contraparte idiomática:", [["map(func, seq)","(func(x) for x in seq)"],["filter(cond, seq)","(x for x in seq if cond(x))"],["list(map(f, seq))","[f(x) for x in seq]"],["list(filter(c, seq))","[x for x in seq if c(x)]"]], "Equivalências diretas entre padrões funcionais e compreensões.")
        ]
      },
      {
        id: "py-est-8-2-functools-reduce",
        title: "Acumulações com functools.reduce",
        subtitle: "Prática · Reduções, agregadores e acumuladores funcionais",
        theory: "A função functools.reduce() aplica cumulativamente uma função de dois argumentos aos elementos de uma sequência, reduzindo toda a coleção a um único valor final. Embora funções como sum(), min() e any() resolvam casos comuns, reduce brilha em acumulações customizadas de dados.",
        questions: [
          q("De qual módulo da biblioteca padrão do Python devemos importar reduce()?", "functools", ["itertools","collections"], "reduce foi movida da built-in para o módulo functools no Python 3."),
          q("O que a função de redução passada para reduce(f, colecao) deve receber como parâmetros?", "Dois parâmetros: o acumulador do estado atual e o próximo item da coleção", ["Apenas um parâmetro com a lista inteira","Três parâmetros incluindo o índice"], "A cada passo, f(acumulador, item) calcula o novo valor do acumulador."),
          q("Para que serve o terceiro argumento opcional initializer em reduce(f, seq, initial)?", "Define o valor inicial do acumulador antes do primeiro elemento ser processado", ["Define o número máximo de iterações permitidas","Filtra os elementos menores que initial"], "O inicializador evita erros em sequências vazias e estabelece o ponto de partida."),
          q("Por que somar números com sum(lista) é preferível a reduce(lambda a, b: a + b, lista)?", "sum() é implementada em C, mais rápida e muito mais legível que o reduce equivalente", ["reduce não aceita números decimais","sum aloca menos variáveis locais"], "Agregadores nativos específicos (sum, any, all) devem sempre ter prioridade sobre reduce genérico."),
          t("Qual resultado de reduce(lambda a, b: a * b, [1, 2, 3, 4], 1)?", ["24"], "1 * 1 * 2 * 3 * 4 = 24 (cálculo de fatorial).", "import functools\nres = functools.reduce(lambda a, b: a * b, [1, 2, 3, 4], 1)\nprint(res)"),
          g("Complete a importação necessária para utilizar reduce:", ["from functools import reduce"], "reduce reside dentro do módulo functools.", "____\ntotal = reduce(lambda a, b: a + b, [1, 2])"),
          o("Ordene os passos executados internamente por reduce([1, 2, 3], f, 0):", ["Inicializar o acumulador com o valor 0","Calcular acumulador = f(0, 1) resultando em 1","Calcular acumulador = f(1, 2) resultando em 3","Calcular acumulador = f(3, 3) e retornar o valor final 6"], "Processamento cumulativo passo a passo do acumulador."),
          p("Associe ferramenta de agregação ao seu cenário ideal:", [["sum(seq)","Totalizar elementos numéricos de forma performática"],["any(seq)","Verificar se ao menos um item é verdadeiro (curto-circuito)"],["all(seq)","Verificar se todos os elementos cumprem o predicado"],["functools.reduce()","Acumulações complexas sem função nativa pronta"]], "Estratégias de redução e agregação no ecossistema Python.")
        ]
      },
      {
        id: "py-est-8-3-compreensoes-aninhadas",
        title: "Compreensões aninhadas e matrizes",
        subtitle: "Aprofundamento · Aplainamento, matrizes e múltiplos laços",
        theory: "Compreensões de listas podem conter múltiplos laços for e condições if aninhadas. Uma matriz pode ser aplainada (flatten) com [item for linha in matriz for item in linha]. A regra fundamental de leitura é seguir a mesma ordem sequencial em que os laços for seriam escritos de forma imperativa.",
        questions: [
          q("Como aplainar uma matriz 2D (lista de listas) em uma lista 1D usando compreensão?", "[item for linha in matriz for item in linha]", ["[for item in linha for linha in matriz]","matriz.flatten()"], "A ordem dos laços for na compreensão espelha a ordem dos laços imperativos equivalentes."),
          q("Como transpor uma matriz (trocar linhas por colunas) de tamanho NxM?", "[[linha[i] for linha in matriz] for i in range(len(matriz[0]))]", ["matriz.reverse()","[[item] for item in matriz]"], "A compreensão externa itera sobre as colunas e a interna extrai os elementos das linhas correspondentes."),
          q("Qual é a recomendação sobre a complexidade de compreensões com muitos for e if aninhados?", "Se tiver mais de dois laços for ou condições complexas, prefira laços tradicionais legíveis", ["Sempre comprimir o máximo possível em uma linha única","Nunca usar mais de um if em código Python"], "Compreensões excessivamente complexas prejudicam a manutenibilidade do código."),
          q("Como criar uma matriz 3x3 preenchida com zeros sem compartilhar referências de linhas?", "[[0 for _ in range(3)] for _ in range(3)]", ["[[0] * 3] * 3","[0] * 9"], "O operador [[0]*3]*3 cria referências duplicadas à mesma lista interna; a compreensão aloca novas listas."),
          t("Quantos elementos totais possui a lista aplainada de [[1, 2], [3, 4]]?", ["4"], "Os 2 elementos da primeira linha e os 2 da segunda somam 4.", "m = [[1, 2], [3, 4]]\nplana = [x for linha in m for x in linha]\nprint(len(plana))"),
          g("Complete a criação de uma linha com 4 zeros via compreensão:", ["[0 for _ in range(4)]"], "Compreensão de lista garante novas instâncias isoladas.", "linha = ____"),
          o("Ordene a leitura mental da compreensão [x for linha in matriz for x in linha]:", ["Primeiro for: para cada linha presente na matriz","Segundo for: para cada elemento x dentro daquela linha","Expressão inicial: emitir x para compor a nova lista final","Resultado: sequência linear unidimensional com todos os itens"], "Mapeamento mental da sintaxe de múltiplos laços em compreensões."),
          p("Associe estrutura matricial ao seu padrão de construção:", [["[[0]*3 for _ in range(3)]","Matriz com linhas independentes sem referências cruzadas"],["[x for linha in m for x in linha]","Aplainamento de matriz 2D em lista 1D"],["[linha[c] for linha in m]","Extração de uma coluna específica da matriz"],["[[item*2 for item in l] for l in m]","Transformação elemento a elemento preservando o formato 2D"]], "Padrões de manipulação e transformação de dados tabulares bidimensionais.")
        ]
      },
      {
        id: "py-est-8-4-zip-enumerate-transform",
        title: "Transformações combinadas com zip e enumerate",
        subtitle: "Prática · Pareamento de sequências e rastreamento de índices",
        theory: "As funções built-in zip() e enumerate() são pilares da manipulação idiomática de dados. enumerate(seq, start=0) fornece pares (índice, elemento) sem contadores manuais. zip(seq1, seq2) combina elementos em tuplas emparelhadas, permitindo criar dicionários com facilidade através de dict(zip(chaves, valores)).",
        questions: [
          q("Como criar um dicionário a partir de uma lista de chaves e outra lista de valores correspondentes?", "dict(zip(chaves, valores))", ["chaves + valores","{chaves: valores}"], "zip emparelha as listas em tuplas (chave, valor) e dict() constrói o mapa instantaneamente."),
          q("Qual parâmetro opcional de enumerate permite iniciar a contagem a partir de 1 em vez de 0?", "start=1 (enumerate(seq, start=1))", ["index=1","offset=1"], "start=1 ajusta o valor inicial do índice gerado para numerações amigáveis."),
          q("O que acontece se as coleções passadas para zip() tiverem tamanhos desiguais?", "Interrompe no final da coleção mais curta descartando o excedente", ["Lança exceção de tamanho diferente","Preenche com zeros automaticamente"], "Por padrão zip() opera no menor comprimento comum (a menos que strict=True no Python 3.10+)."),
          q("Como desempacotar uma lista de pares (x, y) de volta em duas sequências separadas?", "xs, ys = zip(*pares)", ["xs, ys = split(pares)","xs = pares[0]; ys = pares[1]"], "O operador * desempacota os pares como argumentos para zip(), realizando a transposição reversa."),
          t("Qual valor está associado à chave \"nome\" em dict(zip([\"nome\"], [\"Carlos\"]))?", ["Carlos"], "zip cria o par (\"nome\", \"Carlos\"), mapeado pelo construtor dict.", "d = dict(zip([\"nome\"], [\"Carlos\"]))\nprint(d[\"nome\"])"),
          g("Complete o desempacotamento de pares usando zip com operador de estrelas:", ["zip(*pontos)"], "zip(*pontos) inverte o emparelhamento separando as coordenadas.", "x_coords, y_coords = ____"),
          o("Ordene as etapas para mapear produtos a identificadores numéricos com enumerate:", ["Definir a lista de nomes de produtos disponíveis","Usar enumerate(produtos, start=101) para gerar códigos","Criar o dicionário {codigo: nome for codigo, nome in ...}","Consultar o catálogo pelos novos identificadores criados"], "Associação de identificadores através de enumerate e compreensões de dicionário."),
          p("Associe função built-in de percurso ao seu comportamento:", [["enumerate(seq)","Emite tuplas (indice, elemento) sequenciais"],["zip(seq1, seq2)","Emparelha elementos correspondentes em tuplas"],["dict(zip(k, v))","Constrói dicionário combinando chaves e valores"],["zip(strict=True)","Exige comprimentos rigorosamente iguais (Python 3.10+)"]], "Utilitários para iteração coordenada e sincronização de dados.")
        ]
      },
      {
        id: "py-est-8-5-projeto-pipeline-etl",
        title: "Projeto: pipeline de transformação e agregação (ETL)",
        subtitle: "Consolidação · Extração, limpeza, enriquecimento e carga em Python",
        theory: "Unindo todas as técnicas do capítulo — geradores para extração, compreensões para filtragem e mapeamento, operator e bisect para ordenação e busca, e agregações finais —, construímos um pipeline ETL completo e idiomático que processa dados sem sobrecarregar a memória e com alta expressividade.",
        questions: [
          q("Qual arquitetura de código em Python puro processa grandes volumes sem esgotar a RAM?", "Pipeline em streaming baseado em funções geradoras e expressões preguiçosas", ["Carregar arquivos inteiros em listas globais com append","Gravar tudo em strings gigantescas"], "Geradores processam registro a registro mantendo o consumo de memória constante e previsível."),
          q("Quais são as três etapas fundamentais de um processo ETL de dados?", "Extract (extração), Transform (transformação) e Load (carga ou saída)", ["Execute, Terminate e Log","Edit, Test e Launch"], "ETL extrai dados de fontes, aplica regras e validações e entrega o resultado ao destino."),
          q("Como lidar com registros corrompidos ou mal formatados em uma etapa do pipeline?", "Filtrar registros inválidos gerando um log de anomalias sem interromper o pipeline", ["Parar imediatamente o programa apagando o arquivo fonte","Substituir todos os dados por zeros silenciosamente"], "Resiliência de dados exige descarte controlado e rastreabilidade sem quebrar a esteira."),
          q("Qual é a forma ideal de calcular totais e médias no estágio final do pipeline?", "Usar funções acumuladoras em streaming ou functools.reduce sem armazenar todos os itens", ["Recarregar o arquivo do disco para cada cálculo","Duplicar o gerador na memória"], "Calcular agregados diretamente sobre o fluxo preserva a eficiência do pipeline."),
          t("Quantos registros válidos passam pelo pipeline se 2 de 10 registros forem inválidos?", ["8"], "10 registros menos 2 inválidos resultam em 8 registros processados.", "dados = range(10)\nvalidos = [x for x in dados if x >= 2]\nprint(len(validos))"),
          g("Complete o estágio de carga (Load) persistindo o resumo final no dicionário de métricas:", ["metricas[\"total\"] = sum(vendas)"], "sum consome o fluxo final consolidando o total apurado.", "metricas = {}\n____"),
          o("Ordene as etapas completas de um pipeline de ETL em Python:", ["Extract: ler dados brutos sob demanda via gerador","Clean: filtrar registros nulos e normalizar strings","Transform: enriquecer e calcular campos derivados","Load: agregar métricas e gravar saída estruturada"], "Ciclo de vida completo de engenharia de dados em Python."),
          p("Associe etapa do projeto ETL à ferramenta Python apropriada:", [["Extração preguiçosa","Funções geradoras com yield"],["Limpeza e normalização","Compreensões e lambdas com operador str"],["Enriquecimento de chaves","dict(zip(colunas, valores))"],["Agregação analítica","sum, min, max ou functools.reduce"]], "Mapeamento das ferramentas de estruturas de dados aplicadas ao projeto de ponta a ponta.")
        ]
      }
    ]
  });
})();
