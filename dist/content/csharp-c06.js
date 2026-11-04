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

  const lang = "csharp";
  const chId = "csharp-c06";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "csharp-c06-u1-l3-indices-do-final-operador-hat",
        title: "Indexação a partir do final com o operador circumflexo (^)",
        subtitle: "Sequências e posições · Acessando elementos reversos no C# 8+ sem Length - 1",
        theory: "Introduzido no C# 8, o tipo System.Index e o operador ^ permitem indexar sequências a partir do final. O índice ^1 representa o último elemento (equivalente a Length - 1), ^2 o penúltimo, e ^Length o primeiro elemento. Essa sintaxe elimina o código verboso arr[arr.Length - 1] e confere extrema clareza.",
        questions: [
          q("O que a expressão arr[^1] acessa em um array no C# 8+?", "O último elemento do array (equivalente a arr[arr.Length - 1])", ["O primeiro elemento do array","O penúltimo elemento","Lança exceção de índice negativo"], "O operador ^1 conta a partir do final, representando o último item da coleção."),
          q("Qual expressão com operador ^ é equivalente a arr[0] (o primeiro elemento)?", "arr[^arr.Length]", ["arr[^0]","arr[^1]","arr[^-1]"], "^Length conta todas as posições a partir do final, pousando no índice zero inicial."),
          q("O que acontece se executarmos arr[^0] em tempo de execução?", "Lança System.IndexOutOfRangeException", ["Retorna o último elemento","Retorna o primeiro elemento"], "^0 representaria o tamanho após o fim do array, estando estritamente fora dos limites válidos."),
          q("O operador ^ funciona apenas com arrays nativos ou com outros tipos também?", "Funciona com arrays, strings, List<T>, Span<T> e qualquer tipo com propriedade Length/Count e indexador", ["Apenas com arrays de inteiros","Apenas com strings"], "O compilador C# reconhece o padrão de indexador e aplica o tipo System.Index universalmente."),
          t("Qual símbolo de caractere único representa o operador de índice a partir do final no C# 8+?", ["^","circunflexo","chapeu"], "O caractere ^ indexa a partir do final da sequência.", "var ultimo = texto[____1];"),
          g("Complete o acesso ao penúltimo elemento do array utilizando o operador circumflexo.", ["^2"], "^2 acessa o penúltimo item da coleção.", "int penultimo = numeros[____];"),
          o("Ordene os índices pelo operador ^ do primeiro ao último elemento em um array de 3 itens.", ["arr[^3] (primeiro elemento no índice 0)","arr[^2] (segundo elemento no índice 1)","arr[^1] (último elemento no índice 2)"], "A contagem com ^ vai de ^Length até ^1."),
          p("Associe a expressão com ^ ao seu índice numérico equivalente em um array de tamanho 5.", [["arr[^1]","arr[4] (último elemento)"],["arr[^2]","arr[3] (penúltimo elemento)"],["arr[^5]","arr[0] (primeiro elemento)"],["arr[^0]","Fora dos limites: lança IndexOutOfRangeException"]], "O operador ^ moderniza a indexação reversa com zero custo de performance.")
        ]
      },
      {
        id: "csharp-c06-u1-l4-fatiamento-com-operador-range",
        title: "Fatiamento de sequências com o operador de intervalo (..)",
        subtitle: "Sequências e posições · Extraindo fatias de coleções com System.Range no C# 8+",
        theory: "O operador de intervalo .. (System.Range) introduzido no C# 8 permite extrair fatias contíguas de arrays e strings com sintaxe concisa. O intervalo [inicio..fim] opera de forma semiaberta: o índice inicial é inclusivo e o índice final é exclusivo. Omitir as pontas (ex: [1..] ou [..3]) fatia até as extremidades.",
        questions: [
          q("Na expressão arr[1..4], quais posições são de fato extraídas para o novo array?", "Índices 1, 2 e 3 (o índice inicial 1 é incluído e o índice final 4 é excluído)", ["Índices 1, 2, 3 e 4","Apenas os índices 1 e 4"], "Intervalos em C# seguem o padrão matemático semiaberto [início, fim)."),
          q("O que a expressão arr[..3] extrai da coleção?", "Os três primeiros elementos (índices 0, 1 e 2)", ["Apenas o terceiro elemento","Os elementos do índice 3 até o final"], "Omitir o início assume implicitamente o índice zero (início da coleção)."),
          q("O que a expressão arr[2..] extrai da coleção?", "Todos os elementos a partir do índice 2 até o último inclusive", ["Os dois primeiros elementos","Apenas o elemento 2"], "Omitir o fim assume implicitamente a extremidade final da sequência (^0)."),
          q("Qual é o resultado de aplicar o operador de fatia total arr[..] em um array nativo T[]?", "Gera uma cópia rasa completa (shallow copy) de todo o array em uma nova instância", ["Limpa o array original","Inverte o array"], "arr[..] copia todos os elementos de ponta a ponta em uma nova alocação de array."),
          t("Qual símbolo de pontuação de dois caracteres define o operador de intervalo (range) em C#?", ["..","dois pontos consecutivos"], "Dois pontos consecutivos .. definem intervalos.", "var miolo = dados[1____^1];"),
          g("Complete o fatiamento para extrair os elementos ignorando o primeiro e o último.", ["1..^1"], "1..^1 seleciona do segundo até o penúltimo elemento inclusive.", "int[] meio = lista[____];"),
          o("Ordene as fatias obtidas a partir de um array com 10 elementos.", ["arr[..2] (dois primeiros itens: índices 0 e 1)","arr[2..5] (três itens intermediários: índices 2, 3 e 4)","arr[5..^2] (três itens seguintes: índices 5, 6 e 7)","arr[^2..] (dois últimos itens: índices 8 e 9)"], "A combinação de ^ e .. permite particionar qualquer coleção com precisão milimétrica."),
          p("Associe a expressão de range ao seu significado prático.", [["arr[..]","Cópia integral de todos os elementos da coleção"],["arr[..5]","Os primeiros 5 elementos (índices 0 a 4)"],["arr[5..]","Todos os elementos do índice 5 em diante"],["arr[1..^1]","Todos os elementos excluindo o primeiro e o último"]], "System.Range simplifica o fatiamento de dados sem chamadas prolixas a métodos auxiliares.")
        ]
      },
      {
        id: "csharp-c06-u1-l5-padroes-de-lista-list-patterns",
        title: "Correspondência de padrões em listas (List Patterns)",
        subtitle: "Sequências e posições · Pattern matching posicional com colchetes e descarte no C# 11+",
        theory: "No C# 11, os List Patterns revolucionaram a inspeção de arrays e listas com pattern matching. Usando colchetes [ ], é possível testar tamanhos exatos [var a, var b], casar valores fixos [1, 2, ..], e usar o padrão de descarte .. (slice pattern) para capturar o restante da sequência em uma variável.",
        questions: [
          q("O que a expressão lista is [1, 2, ..] valida no C# 11+?", "Se a lista inicia com os números 1 e 2, tendo zero ou mais elementos em seguida", ["Se a lista tem exatamente dois elementos","Se a lista contém apenas números pares"], "O padrão de fatia .. casa qualquer quantidade residual de elementos no final da coleção."),
          q("Qual padrão de lista verifica se um array possui exatamente três elementos quaisquer?", "[_, _, _]", ["[3]","[..3]","[var x]"], "O caractere de descarte _ casa exatamente um elemento em cada posição posicional."),
          q("Como capturar o primeiro elemento e armazenar todo o restante da lista em uma subfatia?", "if (lista is [var primeiro, .. var resto])", ["if (lista is [primeiro: resto])","if (lista is primeiro..resto)"], "A sintaxe .. var resto empacota todos os elementos intermediários ou finais em uma nova fatia."),
          q("O que a expressão lista is [] avalia com List Patterns?", "Se a lista ou array está totalmente vazio (Count == 0)", ["Se a lista é nula","Se a lista contém zeros"], "Colchetes vazios [] casam perfeitamente com coleções de tamanho zero."),
          t("Qual símbolo de pontuação casa zero ou mais elementos em List Patterns no C# 11?", [".."], "Dois pontos .. representam o slice pattern que casa múltiplos itens.", "if (arr is [1, ____, 10]) { }"),
          g("Complete o pattern matching para validar se o array inicia com 0 e termina com 9.", ["[0, .., 9]"], "[0, .., 9] casa qualquer sequência que comece com 0 e termine com 9.", "if (numeros is ____) { }"),
          o("Ordene as cláusulas de um switch expression utilizando List Patterns.", ["Caso com lista vazia: [] => \"Vazio\"","Caso com elemento único: [var unico] => $\"Unitario: {unico}\"","Caso com dois elementos específicos: [1, 2] => \"Par 1 e 2\"","Caso geral com slice pattern: [var prim, ..] => $\"Comeca com {prim}\""], "List Patterns permitem formular analisadores sintáticos e parsers com concisão incomparável."),
          p("Associe o List Pattern ao seu critério de correspondência.", [["[]","Coleção vazia com zero elementos"],["[var x]","Coleção com exatamente um único elemento"],["[1, 2, ..]","Inicia com 1 e 2 seguidos de qualquer quantidade de itens"],["[.., var ult]","Captura o último elemento independente do tamanho"]], "List Patterns são uma das ferramentas de análise estrutural mais expressivas do C# moderno.")
        ]
      }
    ],
    2: [
      {
        id: "csharp-c06-u2-l1-arrays-unidimensionais-e-limites",
        title: "Arrays unidimensionais e checagem de limites",
        subtitle: "Arrays e limites · Alocação contígua, indexador base-zero e proteção de runtime",
        theory: "Arrays em C# são objetos alocados na memória heap gerenciada que armazenam uma sequência contígua de elementos do mesmo tipo. O acesso é estritamente indexado em base-zero de 0 até arr.Length - 1. Qualquer tentativa de acessar índices fora dessa faixa dispara imediatamente IndexOutOfRangeException.",
        questions: [
          q("Qual exceção o runtime do .NET lança ao tentar acessar uma posição fora dos limites de um array?", "System.IndexOutOfRangeException", ["System.NullReferenceException","System.ArgumentException"], "IndexOutOfRangeException protege a memória impedindo leituras ou escritas além dos limites físicos do array."),
          q("Como se obtém a quantidade total de elementos em um array unidimensional arr em C#?", "arr.Length", ["arr.Count","arr.Size()","arr.GetLength()"], "Length é a propriedade pública que informa o número total de elementos alocados no array."),
          q("O que acontece se tentarmos alterar a propriedade arr.Length de um array existente?", "Erro de compilação, pois Length é uma propriedade somente leitura", ["O array é redimensionado","O runtime limpa o array"], "O tamanho de um array em C# é rigorosamente imutável após a sua alocação no heap."),
          q("Qual é o valor padrão de cada elemento ao alocar bool[] flags = new bool[5];?", "false", ["true","null","0"], "Tipos de valor numéricos e booleanos são zerados pela CLR na alocação, recebendo 0 ou false."),
          t("Qual propriedade pública informa o número total de elementos de um array em C#?", ["Length"], "Length sem parênteses expõe o tamanho do array.", "int total = dados.____;"),
          g("Complete a alocação instanciando um array de inteiros com 50 posições no heap.", ["new int[50]"], "new int[50] aloca o buffer contíguo na memória heap.", "int[] buffer = ____;"),
          o("Ordene as etapas de criação e acesso a um array em C#.", ["Declaração da variável com colchetes int[] notas","Alocação no heap com new int[10]","Atribuição de valor na posição inicial notas[0] = 100","Leitura segura respeitando i < notas.Length"], "A alocação e indexação seguem as regras rígidas de segurança estática do ecossistema .NET."),
          p("Associe o tipo de dado ao valor padrão preenchido pelo CLR no array.", [["int[] e long[]","0"],["double[] e decimal[]","0.0 (ou 0m)"],["bool[]","false"],["string[] e object[]","null"]], "Conhecer os valores de inicialização default previne erros de lógica em buffers recém-criados.")
        ]
      },
      {
        id: "csharp-c06-u2-l2-arrays-multidimensionais-retangulares",
        title: "Arrays multidimensionais retangulares (,)",
        subtitle: "Arrays e limites · Matrizes contíguas com notação de vírgula [linhas, colunas]",
        theory: "Diferente de muitas linguagens que só possuem arrays de arrays, C# suporta matrizes retangulares reais usando vírgula entre colchetes (ex: int[,] grade = new int[3, 4];). Essa estrutura aloca um único bloco contíguo de memória no heap, oferecendo alta localidade de cache e dispensando ponteiros intermediários.",
        questions: [
          q("Qual é a sintaxe para declarar uma matriz retangular 2D com 3 linhas e 4 colunas em C#?", "int[,] matriz = new int[3, 4];", ["int[][] matriz = new int[3][4];","int[3, 4] matriz = new int[,];","matrix<int> m = new(3, 4);"], "A vírgula dentro dos colchetes [,] especifica dimensões em uma matriz retangular contígua no C#."),
          q("Como se acessa o elemento localizado na linha 1 e coluna 2 de uma matriz retangular grade?", "grade[1, 2]", ["grade[1][2]","grade(1, 2)","grade.Get(1, 2)"], "A notação de acesso utiliza coordenadas separadas por vírgula dentro dos colchetes: grade[linha, coluna]."),
          q("Qual método deve ser usado para descobrir a quantidade de linhas (dimensão 0) de uma matriz m[, ]?", "m.GetLength(0)", ["m.Length","m.Rows","m.Count(0)"], "GetLength(dimensao) informa a extensão de uma dimensão específica; Length informa o total de todas as células."),
          q("O que a propriedade m.Length devolve para uma matriz declarada como new int[3, 5]?", "15 (o total acumulado de células de todas as dimensões: 3 * 5)", ["3","5","8"], "Em matrizes multidimensionais retangulares, Length reporta o produto total de posições disponíveis."),
          t("Qual símbolo de pontuação dentro dos colchetes define uma matriz bidimensional no C#?", [",","virgula","vírgula"], "A vírgula declara dimensões adicionais no C#.", "int____ grade = new int[2, 3];"),
          g("Complete a consulta ao número de colunas (segunda dimensão, índice 1) da matriz.", ["GetLength(1)"], "GetLength(1) retorna a extensão da segunda dimensão.", "int colunas = grade.____;"),
          o("Ordene a estrutura de laços para percorrer uma matriz retangular int[,] m.", ["Obter linhas com m.GetLength(0) e colunas com m.GetLength(1)","Laço externo for (int i = 0; i < linhas; i++)","Laço interno for (int j = 0; j < colunas; j++)","Acessar a célula com m[i, j]"], "O percurso bidimensional navega sistematicamente por todas as coordenadas da grade contígua."),
          p("Associe a instrução ao dado que ela fornece em int[,] m = new int[3, 4].", [["m.GetLength(0)","3 (quantidade de linhas)"],["m.GetLength(1)","4 (quantidade de colunas)"],["m.Length","12 (total de células no bloco contíguo)"],["m[0, 0]","Primeiro elemento no canto superior esquerdo"]], "Matrizes retangulares com vírgula alocam um bloco único contíguo de memória com alta performance.")
        ]
      },
      {
        id: "csharp-c06-u2-l3-arrays-denteados-jagged",
        title: "Arrays denteados (Jagged Arrays) no C#",
        subtitle: "Arrays e limites · Arrays de arrays com colchetes separados [][] e linhas assimétricas",
        theory: "No C#, arrays denteados (jagged arrays) são representados por colchetes separados int[][] e consistem em arrays cujos elementos são outros arrays. Isso possibilita criar estruturas onde cada linha possui tamanho próprio, sendo ideais para grafos esparsos, tabelas triangulares e estruturas de dados heterogêneas.",
        questions: [
          q("Qual é a sintaxe de declaração de um array denteado de inteiros em C#?", "int[][] jagged = new int[3][];", ["int[,] jagged = new int[3, ];","int[3][] jagged = new int[][];"], "Colchetes duplos [][] denotam array de arrays, onde o tamanho das linhas é omitido na alocação mestre."),
          q("Como se inicializa a segunda linha (índice 1) de um jagged array para conter 5 elementos?", "jagged[1] = new int[5];", ["jagged[1] = 5;","jagged.Init(1, 5);","jagged[1, 5] = new int();"], "Cada linha do jagged array é um objeto independente que deve ser alocado com new no heap."),
          q("Como acessar o quarto elemento da segunda linha de um array denteado?", "jagged[1][3]", ["jagged[1, 3]","jagged[3][1]","jagged[1][4]"], "A notação encadeia colchetes independentes: [índiceLinha][índiceColuna]."),
          q("Qual é a principal vantagem de memória de jagged arrays em relação a matrizes retangulares para dados triangulares?", "Economiza memória alocando apenas as posições necessárias para cada linha", ["Executa em GPU","Não consome memória heap"], "Em estruturas onde linhas crescem progressivamente (como Pascal), jagged arrays poupam espaço."),
          t("Quantos pares de colchetes declaram a referência de um array denteado bidimensional em C#?", ["2","dois","[][]"], "Dois pares de colchetes definem o array de arrays.", "string____ linhas = new string[5][];"),
          g("Complete a alocação da primeira linha do array denteado com tamanho 4.", ["new int[4]"], "Cada subarray é alocado individualmente.", "grade[0] = ____;"),
          o("Ordene as etapas para criar e popular um array denteado no C#.", ["Instanciar o array principal de referências int[][] arr = new int[3][]","Percorrer cada linha e alocar arr[i] com new int[tamanho]","Iterar sobre as colunas da linha arr[i] gravando dados","Ler dados encadeando colchetes arr[i][j]"], "A flexibilidade de alocação das linhas permite modelar geometrias complexas."),
          p("Associe a estrutura ao modelo de memória em C#.", [["int[,] retangular","Bloco único contíguo de memória; acesso [i, j]"],["int[][] jagged","Array mestre apontando para múltiplos arrays independentes; [i][j]"],["jagged[i].Length","Mede a largura da linha i específica"],["retangular.GetLength(0)","Mede o número de linhas da matriz retangular"]], "Saber escolher entre retangulares contíguas e jagged arrays otimiza tanto memória quanto cache.")
        ]
      },
      {
        id: "csharp-c06-u2-l4-classe-system-array-utilitarios",
        title: "Métodos utilitários da classe estática System.Array",
        subtitle: "Arrays e limites · Operações nativas com Sort, BinarySearch, Copy e Clear",
        theory: "Todos os arrays em C# herdam implicitamente de System.Array, que fornece um rico conjunto de métodos estáticos: Array.Sort() para ordenação in-place, Array.BinarySearch() para busca logarítmica, Array.Copy() para transferências eficientes de fatias de memória, e Array.Clear() para zerar elementos.",
        questions: [
          q("Qual método da classe Array preenche um trecho do array com o valor default (zeros ou nulls)?", "Array.Clear(arr, indiceInicio, tamanho)", ["Array.Reset(arr)","Array.Wipe(arr)","Array.Zero(arr)"], "Array.Clear zera os elementos no intervalo especificado de forma extremamente eficiente."),
          q("Qual método estático de System.Array realiza cópias em bloco de memória entre dois arrays?", "Array.Copy(...)", ["Array.CloneTo(...)","Array.Transfer(...)","Array.Slice(...)"], "Array.Copy delega internamente para rotinas nativas de cópia contígua de memória."),
          q("Qual método estático localiza o índice da primeira ocorrência de um elemento em um array?", "Array.IndexOf(arr, valor)", ["Array.FindIndex(arr, valor)","Array.Search(arr, valor)"], "Array.IndexOf devolve o índice da primeira ocorrência ou -1 se o item estiver ausente."),
          q("O método Array.Resize<T>(ref arr, novoTamanho) redimensiona o array no mesmo endereço de memória?", "Não, ele aloca um novo array com o novo tamanho, copia os dados antigos e reatribui a variável por ref", ["Sim, ele expande a memória contígua no heap in-place","Apenas para structs"], "Como arrays têm tamanho fixo na CLR, Resize necessariamente cria um novo objeto no heap."),
          t("Qual método estático da classe Array ordena os elementos de um array in-place em ordem crescente?", ["Array.Sort","Sort"], "Array.Sort é o método oficial de ordenação de arrays nativos.", "____(meuArray);"),
          g("Complete a instrução para zerar 5 elementos do array a partir do índice 0.", ["Array.Clear"], "Array.Clear zera os elementos no intervalo.", "____(numeros, 0, 5);"),
          o("Ordene as etapas executadas pelo método Array.Resize(ref arr, novoTamanho).", ["Aloca um novo array de tipo T com o novo tamanho no heap","Copia os elementos do array original para o novo array com Array.Copy","Reatribui a variável de referência do chamador via ref para o novo array","O array antigo se torna elegível para coleta pelo Garbage Collector"], "Compreender o custo de alocação de Array.Resize orienta o uso preferencial de List<T>."),
          p("Associe o método da classe Array à sua ação.", [["Array.Sort(arr)","Ordena o array in-place em tempo O(n log n)"],["Array.BinarySearch(arr, x)","Busca binária rápida em array previamente ordenado"],["Array.Reverse(arr)","Inverte a ordem dos elementos in-place"],["Array.Empty<T>()","Retorna uma instância estática única e vazia de tamanho zero"]], "A classe System.Array é o pilar utilitário de baixo nível para todas as operações matriciais no .NET.")
        ]
      },
      {
        id: "csharp-c06-u2-l5-alocacao-zero-com-array-empty",
        title: "Otimização com Array.Empty<T>() e memória cache",
        subtitle: "Arrays e limites · Eliminando alocações desnecessárias de arrays vazios no heap",
        theory: "Retornar new int[0] repetidamente aloca múltiplos objetos inúteis de tamanho zero no heap gerenciado. A partir do .NET Framework 4.6, o método Array.Empty<T>() devolve uma instância singleton estática e compartilhada de array vazio para cada tipo T, reduzindo a zero a pressão sobre o coletor de lixo.",
        questions: [
          q("Por que Array.Empty<T>() é superior a instanciar new T[0]?", "Retorna uma instância singleton pré-alocada em cache, eliminando alocações repetidas no heap", ["Executa mais rápido em loops while","Permite adicionar elementos posteriormente"], "Array.Empty<T> reutiliza o mesmo objeto imutável de tamanho zero para toda a aplicação."),
          q("Qual é o resultado de Array.Empty<int>() == Array.Empty<int>()?", "true, pois ambas as chamadas retornam a mesmíssima referência estática compartilhada", ["false, são instâncias diferentes","Erro de compilação"], "Por ser um singleton por tipo, as referências são rigorosamente idênticas na memória."),
          q("Em que cenários é altamente recomendado adotar Array.Empty<T>()?", "Em métodos que precisam retornar coleções vazias quando nenhum dado for encontrado", ["Apenas em testes de unidade","Ao ler arquivos binários grandes"], "Retornar Array.Empty<T>() evita NullReferenceException nos clientes com custo zero de alocação de memória."),
          q("No C# 12, a sintaxe de expressão de coleção [] gera Array.Empty<T>() automaticamente quando tipada para array?", "Sim, o compilador C# 12 otimiza int[] vazio = []; gerando Array.Empty<int>() por baixo", ["Não, [] sempre usa new int[0]","Apenas para strings"], "A sintaxe moderna de Collection Expressions no C# 12 emite automaticamente Array.Empty<T>()."),
          t("Qual método estático genérico fornece um array vazio singleton sem custo de alocação?", ["Array.Empty<T>","Array.Empty"], "Array.Empty<T>() provê instâncias vazias compartilhadas.", "return ____();"),
          g("Complete o retorno seguro com zero alocação para clientes não encontrados.", ["Array.Empty<Cliente>()"], "Array.Empty evita a criação de lixo no heap para resultados vazios.", "if (lista.Count == 0) return ____;"),
          o("Ordene as vantagens de padronizar retornos vazios com Array.Empty<T>().", ["Método público não retorna null, evitando checagens repetitivas no chamador","Retorna instância singleton estática Array.Empty<T>()","Chamador pode iterar livremente com foreach sem NullReferenceException","Garbage Collector nunca é acionado porque zero bytes novos foram alocados"], "Zero alocações aliadas a contratos sem null formam a base do código moderno no .NET."),
          p("Associe a expressão de array vazio ao seu comportamento de memória.", [["new int[0]","Aloca novo objeto cabeçalho de 24 bytes no heap a cada chamada"],["Array.Empty<int>()","Instância estática singleton compartilhada: zero alocações"],["int[] a = []; (C# 12)","Compila automaticamente para Array.Empty<int>()"],["Retorno de null","Má prática que induz NullReferenceException no chamador"]], "Adotar Array.Empty<T> e coleções vazias eleva a qualidade da engenharia de software da equipe.")
        ]
      }
    ],
    3: [
      {
        id: "csharp-c06-u3-l1-classe-list-dinamica",
        title: "A classe genérica List<T> e redimensionamento dinâmico",
        subtitle: "Listas mutáveis · Lista fortemente tipada apoiada por array com crescimento geométrico",
        theory: "A classe System.Collections.Generic.List<T> é a coleção sequencial mais usada em C#. Ela encapsula um array interno nativo que cresce sob demanda: quando a capacidade atual se esgota, a lista aloca um novo array com o dobro da capacidade e copia os elementos, garantindo inserção amortizada em tempo constante O(1).",
        questions: [
          q("Qual estrutura interna a classe List<T> utiliza nos bastidores para armazenar os dados?", "Um array unidimensional comum T[] que é redimensionado sob demanda", ["Uma lista duplamente encadeada","Uma árvore binária de busca"], "List<T> é essencialmente uma abstração dinâmica construída sobre um array contíguo nativo."),
          q("Qual é o fator de crescimento padrão do array interno de List<T> ao esgotar a capacidade?", "Dobra de tamanho (multiplicação por 2 da capacidade anterior)", ["Aumenta em 1 elemento por vez","Aumenta em 10 elementos fixos"], "O crescimento geométrico exponencial garante custo amortizado O(1) para a operação de inserção Add()."),
          q("Qual é a diferença entre a propriedade lista.Count e a propriedade lista.Capacity?", "Count informa os itens válidos armazenados; Capacity informa o tamanho do array interno alocado", ["Capacity é em megabytes e Count é em bytes","Ambas são sempre idênticas"], "Count é o número de elementos adicionados; Capacity é o tamanho total alocado no heap antes de nova expansão."),
          q("Como prevenir múltiplas realocações de memória quando sabemos que a lista receberá 10.000 itens?", "new List<T>(10000) (especificando a capacidade inicial no construtor)", ["lista.SetCapacity(10000)","lista.EnsureCapacity(10000)"], "Pré-alocar a capacidade necessária garante zero cópias e zero realocações de arrays internos."),
          t("Qual método adiciona um novo elemento ao final de uma instância de List<T>?", ["Add","Add()"], "Add() insere o elemento no final da lista.", "clientes.____(novoCliente);"),
          g("Complete a instanciação da lista pré-alocando capacidade para 500 itens.", ["new List<int>(500)"], "Especificar a capacidade inicial elimina realocações repetidas.", "var lista = ____;"),
          o("Ordene os eventos internos quando lista.Add(item) excede a capacidade atual.", ["Add() detecta que Count + 1 > Capacity","Calcula nova capacidade dobrada (Capacity * 2)","Aloca um novo array T[] com a nova capacidade no heap","Copia os elementos antigos para o novo array com Array.Copy","Insere o novo item na primeira posição livre"], "O custo amortizado compensa as raras operações de cópia de redimensionamento."),
          p("Associe a propriedade ou método de List<T> à sua função.", [["lista.Count","Quantidade de elementos inseridos na lista"],["lista.Capacity","Tamanho do array interno reservado no heap"],["lista.TrimExcess()","Reduz o array interno para eliminar sobra de capacidade"],["lista.Clear()","Zera Count para 0 e limpa referências para o GC"]], "Compreender a mecânica interna de List<T> permite extrair máxima velocidade com mínimo consumo de RAM.")
        ]
      },
      {
        id: "csharp-c06-u3-l2-metodos-essenciais-de-list",
        title: "Operações fundamentais em List<T>: Add, Insert, Remove e Contains",
        subtitle: "Listas mutáveis · Manipulação, remoção por predicado e complexidades associadas",
        theory: "List<T> disponibiliza operações completas de manipulação: Add(item) adiciona ao fim em O(1); Insert(i, item) insere em posição intermediária em O(n) por exigir deslocamento de elementos; Remove(item) localiza e remove a primeira ocorrência; e RemoveAt(i) remove pelo índice posicional.",
        questions: [
          q("Qual é a complexidade temporal de inserir um elemento no início de uma List<T> com Insert(0, item)?", "O(n) - tempo linear proporcional à quantidade de itens da lista", ["O(1) - tempo constante","O(log n)","O(n²)"], "Inserir no início exige deslocar todos os n elementos existentes uma posição para a direita na memória."),
          q("Qual método remove todos os elementos que satisfazem uma condição booleana em List<T>?", "lista.RemoveAll(predicado)", ["lista.RemoveWhere(predicado)","lista.DeleteIf(predicado)","lista.Drop(predicado)"], "RemoveAll recebe um Predicate<T> e remove todos os elementos casados em uma única passagem O(n)."),
          q("O que o método lista.Contains(item) utiliza internamente para verificar igualdade de elementos?", "EqualityComparer<T>.Default (que chama Equals() evitando boxing em tipos de valor)", ["O operador == estrito","ReferenceEquals em todos os casos"], "A BCL utiliza EqualityComparer<T>.Default para garantir comparação por valor sem alocação em structs."),
          q("Qual método adiciona múltiplos elementos de outra coleção de uma só vez ao final da lista?", "lista.AddRange(outraColecao)", ["lista.AddMany(outraColecao)","lista.AppendAll(outraColecao)"], "AddRange aceita qualquer IEnumerable<T> e anexa todos os itens ao final da lista eficientemente."),
          t("Qual método remove o elemento localizado em um índice específico da lista?", ["RemoveAt","RemoveAt()"], "RemoveAt remove o item com base em sua coordenada posicional.", "lista.____(0); // remove o primeiro item"),
          g("Complete a instrução para remover todos os números ímpares da lista de uma só vez.", ["RemoveAll"], "RemoveAll elimina elementos que satisfazem o predicado.", "numeros.____(n => n % 2 != 0);"),
          o("Ordene as etapas executadas por lista.Insert(indice, item).", ["Verificar se o índice está dentro da faixa válida (0 <= indice <= Count)","Garantir capacidade expandindo o array interno se Count + 1 > Capacity","Deslocar os elementos a partir do índice uma posição à direita com Array.Copy","Gravar o novo item na lacuna aberta no índice","Incrementar a propriedade Count em 1"], "Deslocamentos na memória explicam por que inserções intermediárias frequentes custam O(n)."),
          p("Associe o método de List<T> à sua respectiva complexidade de pior caso.", [["lista.Add(item)","O(1) amortizado (inserção no final)"],["lista.Insert(0, item)","O(n) linear (desloca todos os itens à direita)"],["lista.RemoveAt(0)","O(n) linear (desloca todos os itens à esquerda)"],["lista[i] (leitura por índice)","O(1) instantâneo (acesso direto à memória)"]], "Escolher o método certo de List<T> evita degradações silenciosas de performance em coleções grandes.")
        ]
      },
      {
        id: "csharp-c06-u3-l3-listas-somente-leitura-ireadonlylist",
        title: "Interfaces de abstração: IEnumerable, IReadOnlyList e IList",
        subtitle: "Listas mutáveis · Protegendo o encapsulamento com interfaces somente leitura",
        theory: "Expor List<T> diretamente quebra o encapsulamento, pois qualquer código externo pode invocar Add() ou Clear(). O design idiomático do C# recomenda expor interfaces somente leitura como IReadOnlyList<T> ou retornar coleções protegidas com lista.AsReadOnly(), preservando o controle interno da classe.",
        questions: [
          q("Por que expor List<T> diretamente como propriedade pública de uma classe é considerado má prática?", "Porque qualquer código externo pode alterar, esvaziar ou corromper a lista sem passar pelas regras da classe", ["Porque List<T> não compila em propriedades","Porque consome o dobro de memória"], "Expor coleções mutáveis viola o princípio do encapsulamento ao permitir alterações externas não auditadas."),
          q("Qual interface do .NET expõe acesso indexado e propriedade Count sem métodos mutadores (Add/Remove)?", "IReadOnlyList<T>", ["IEnumerable<T>","IList<T>","ICollection<T>"], "IReadOnlyList<T> permite leitura por índice [i] e consulta de tamanho Count, sem expor métodos de mutação."),
          q("Qual método da classe List<T> encapsula a lista interna em um invólucro ReadOnlyCollection<T>?", "lista.AsReadOnly()", ["lista.ToReadOnly()","lista.Freeze()","lista.Lock()"], "AsReadOnly cria uma visão somente leitura que reflete alterações internas, mas bloqueia escritas externas."),
          q("Qual é a diferença entre IEnumerable<T> e IReadOnlyList<T>?", "IEnumerable só suporta iteração sequencial unidirecional; IReadOnlyList suporta acesso aleatório por índice", ["IEnumerable é mais rápida","IReadOnlyList aceita null, IEnumerable não"], "IEnumerable não garante indexação posicional rápida O(1) nem conhece seu tamanho sem iterar."),
          t("Qual interface genérica de leitura indexada deve ser preferida no retorno de propriedades de coleções?", ["IReadOnlyList<T>","IReadOnlyList"], "IReadOnlyList expõe leitura sem permitir mutações.", "public ____<Pedido> Pedidos => _pedidos;"),
          g("Complete o método para criar uma visão somente leitura da lista interna.", ["AsReadOnly()"], "AsReadOnly bloqueia mutações externas na coleção.", "return _itens.____;"),
          o("Ordene as interfaces de coleção do .NET da mais genérica para a mais específica.", ["IEnumerable<T> (apenas percurso sequencial foreach)","IReadOnlyCollection<T> (adiciona a propriedade Count)","IReadOnlyList<T> (adiciona indexador posicional [i])","IList<T> (adiciona métodos mutadores Add, Insert e Remove)"], "A hierarquia de interfaces permite dosar com precisão os privilégios concedidos aos clientes."),
          p("Associe a interface ao seu conjunto de capacidades.", [["IEnumerable<T>","Apenas percurso com laço foreach (GetEnumerator)"],["IReadOnlyCollection<T>","Percurso com foreach e consulta de tamanho Count"],["IReadOnlyList<T>","Tamanho Count e acesso aleatório indexado com [i]"],["IList<T>","Contrato completo: leitura, escrita, inserção e deleção"]], "Projetar APIs expondo IReadOnlyList<T> protege a integridade do domínio contra mutações externas.")
        ]
      },
      {
        id: "csharp-c06-u3-l4-colecoes-especializadas-linkedlist-queue-stack",
        title: "Coleções sequenciais especializadas: LinkedList, Queue e Stack",
        subtitle: "Listas mutáveis · Estruturas lineares além de arrays para cenários específicos",
        theory: "O .NET oferece coleções sequenciais para padrões específicos: Queue<T> implementa filas FIFO (primeiro a entrar, primeiro a sair), Stack<T> implementa pilhas LIFO (último a entrar, primeiro a sair), e LinkedList<T> implementa listas duplamente encadeadas com inserção O(1) em nós conhecidos.",
        questions: [
          q("Qual coleção genérica do .NET modela uma fila com disciplina FIFO (First-In, First-Out)?", "Queue<T>", ["Stack<T>","List<T>","HashSet<T>"], "Queue<T> gerencia elementos onde o primeiro inserido é o primeiro a ser processado e removido."),
          q("Quais métodos da classe Queue<T> são utilizados para enfileirar e desenfileirar elementos?", "Enqueue (para inserir) e Dequeue (para remover)", ["Push e Pop","Add e Remove","Offer e Poll"], "Enqueue insere no final da fila; Dequeue retira do início da fila em tempo constante O(1)."),
          q("Quais métodos da classe Stack<T> são utilizados para empilhar e desempilhar elementos?", "Push (para empilhar) e Pop (para desempilhar)", ["Enqueue e Dequeue","Insert e Delete"], "Push adiciona no topo da pilha; Pop remove do topo em conformidade com a política LIFO."),
          q("Em que cenário LinkedList<T> supera List<T> em desempenho?", "Ao realizar inserções e deleções frequentes no início ou meio da coleção quando já se tem o nó", ["Ao acessar elementos aleatoriamente por índice","No consumo de memória por elemento"], "LinkedList realiza inserção O(1) em qualquer posição manipulando nós, sem deslocar blocos de array."),
          t("Qual método da classe Stack<T> consulta o elemento do topo sem removê-lo da pilha?", ["Peek","Peek()"], "Peek() inspeciona o topo da pilha sem desempilhá-lo.", "var topo = pilha.____();"),
          g("Complete a instrução enfileirando uma nova mensagem de atendimento.", ["Enqueue"], "Enqueue adiciona itens ao final da fila.", "filaAtendimento.____(novaMensagem);"),
          o("Ordene o fluxo de atendimento em uma Queue<string>.", ["Mensagens de clientes chegam e são enfileiradas com fila.Enqueue(cliente)","Verificar se a fila não está vazia com fila.Count > 0","Desenfileirar o próximo cliente da vez com fila.Dequeue()","Processar o atendimento do cliente retirado"], "Filas FIFO garantem justiça temporal no atendimento sequencial de requisições."),
          p("Associe a coleção ao seu caso de uso ideal.", [["Queue<T> (Enqueue / Dequeue)","Filas de tarefas e processamento em ordem de chegada (FIFO)"],["Stack<T> (Push / Pop)","Mecanismos de desfazer (Undo), parsers e pilhas de navegação (LIFO)"],["LinkedList<T>","Inserções constantes no meio/início quando nós já são conhecidos"],["List<T>","Padrão geral para leitura aleatória e adições no final"]], "Conhecer as estruturas clássicas da BCL evita reinventar coleções para problemas resolvidos.")
        ]
      },
      {
        id: "csharp-c06-u3-l5-expressao-de-colecao-csharp12",
        title: "Expressões de coleção (Collection Expressions) no C# 12+",
        subtitle: "Listas mutáveis · Sintaxe unificada com colchetes [ ] e o operador spread ..",
        theory: "O C# 12 introduziu as Collection Expressions, unificando a inicialização de arrays, listas, spans e conjuntos com a sintaxe de colchetes [1, 2, 3]. Combinadas com o operador spread .., elas permitem concatenar coleções distintas sem criar classes auxiliares, com otimizações de compilação automáticas de alto desempenho.",
        questions: [
          q("Como se inicializa uma List<int> contendo os números 1, 2 e 3 com Collection Expressions no C# 12+?", "List<int> lista = [1, 2, 3];", ["List<int> lista = new List<int> { 1, 2, 3 };","List<int> lista = (1, 2, 3);"], "Colchetes simples [ ... ] substituem toda a verbosidade de new List<T> { ... } no C# 12."),
          q("O que o operador spread .. faz dentro de uma Collection Expression (ex: [..a, ..b])?", "Espalha e concatena todos os elementos das coleções a e b em uma única nova coleção", ["Multiplica as duas coleções","Compara a igualdade entre a e b"], "O operador spread .. itera sobre a coleção fonte e descarrega seus elementos na nova coleção receptora."),
          q("As Collection Expressions funcionam apenas com arrays e listas ou também com Span<T>?", "Funcionam com arrays, List<T>, Span<T>, ReadOnlySpan<T>, HashSet<T> e qualquer coleção compatível", ["Apenas com arrays nativos","Apenas com tipos primitivos"], "O compilador reconhece o tipo de destino e emite a inicialização mais eficiente concebível."),
          q("Qual é o benefício de performance do compilador ao usar Collection Expressions?", "Ele calcula o tamanho total prévio e aloca a coleção de destino na dimensão exata, sem realocações", ["Executa em código assíncrono","Remove o Garbage Collector"], "Ao unir coleções conhecidas, o compilador dimensiona a capacidade justa antecipadamente."),
          t("Qual operador de pontuação de dois caracteres espalha elementos em uma Collection Expression?", ["..","spread"], "Dois pontos .. representam o operador spread.", "int[] combinado = [..listaA, ____listaB];"),
          g("Complete a inicialização unificada da lista de strings no C# 12.", ["[\"Ana\", \"Bia\"]"], "Colchetes simples inicializam a coleção de forma direta.", "List<string> nomes = ____;"),
          o("Ordene a construção de uma coleção composta utilizando o operador spread no C# 12.", ["Definir a lista inicial var baseList = [10, 20]","Abrir a nova expressão de coleção com colchetes var final = [ ... ]","Prefixar o elemento inicial com spread ..baseList","Adicionar novos itens pontuais separados por vírgula como 30, 40"], "A sintaxe unificada transforma a montagem de conjuntos de dados em algo intuitivo e fluido."),
          p("Associe a Collection Expression ao tipo final gerado.", [["int[] a = [1, 2];","Array nativo contíguo alocado no heap"],["List<int> l = [1, 2];","Instância de List<int> fortemente tipada"],["Span<int> s = [1, 2];","Span alocado eficientemente na memória de pilha"],["var uniao = [..a, ..l];","Nova coleção concatenando os elementos de a e l"]], "Collection Expressions são o padrão estético e de performance definitivo para dados em C# moderno.")
        ]
      }
    ],
    4: [
      {
        id: "csharp-c06-u4-l1-imutabilidade-string-interning",
        title: "A imutabilidade de System.String e o String Interning",
        subtitle: "Strings e comparação · Reúso de memória com o pool de internamento da CLR",
        theory: "No .NET, a classe System.String é um tipo de referência estritamente imutável: seu conteúdo de caracteres jamais pode ser alterado após a alocação. A CLR mantém uma tabela interna chamada String Intern Pool, garantindo que literais idênticos compartilhem o mesmo endereço de memória para poupar espaço.",
        questions: [
          q("O que acontece na memória do .NET quando executamos texto.ToUpper() sem reatribuir a variável?", "A string original permanece inalterada; o novo texto gerado é descartado se não for salvo", ["A string original tem seus caracteres mutados in-place","Ocorre erro de compilação"], "Como String é imutável, qualquer operação produz uma nova instância, preservando a original intacta."),
          q("Qual método estático da classe string busca ou registra uma string manualmente no pool da CLR?", "string.Intern(str)", ["string.Pool(str)","string.Cache(str)","string.Register(str)"], "string.Intern consulta a tabela da CLR e retorna a referência canônica compartilhada do pool."),
          q("Qual é o benefício arquitetural de String ser um tipo imutável no .NET?", "Garante thread-safety intrínseco e permite usar strings com segurança como chaves em Dictionary", ["Acelera a placa de vídeo","Elimina o garbage collector"], "Strings imutáveis podem ser lidas concorrentemente por múltiplas threads sem riscos de corrupção."),
          q("O que o método string.IsInterned(str) devolve se a string já residir no pool de internamento?", "A referência da string que está no pool (ou null caso ela não esteja internada)", ["O valor booleano true","Um número inteiro com o hash"], "IsInterned verifica se a sequência já possui representação canônica sem forçar sua inclusão no pool."),
          t("Qual método estático da classe string obtém a referência canônica do pool de internamento?", ["string.Intern","Intern"], "string.Intern acessa a tabela da CLR.", "string canonica = ____(entrada);"),
          g("Complete o código reatribuindo a variável com o resultado da conversão para maiúsculas.", ["s = s.ToUpper()"], "A reatribuição é mandatória para reter a nova string.", "string s = \"lincode\"; ____;"),
          o("Ordene as etapas da criação e compartilhamento de um literal de texto no .NET.", ["Compilador Roslyn grava o literal na tabela de metadados do assembly","A CLR carrega o assembly e insere o texto no String Intern Pool","Variáveis que usam o mesmo literal recebem a mesma referência do pool","Comparações de referência com ReferenceEquals avaliam como true"], "O internamento economiza memória compartilhando literais idênticos entre classes."),
          p("Associe a declaração de string ao comportamento na memória.", [["string a = \"Ola\"; string b = \"Ola\";","a e b compartilham a mesma referência do pool"],["string.Intern(dinamica)","Move a string calculada para a tabela do pool"],["Imutabilidade de String","Impede qualquer alteração in-place dos caracteres"],["string.IsInterned(s)","Consulta se a string já reside no pool sem inseri-la"]], "Dominar o ciclo de vida e a imutabilidade de strings é a base para o tratamento correto de texto.")
        ]
      },
      {
        id: "csharp-c06-u4-l2-comparacao-ordinal-vs-cultural",
        title: "Comparação de strings: Ordinal vs Cultural com StringComparison",
        subtitle: "Strings e comparação · Evitando bugs de internacionalização com StringComparison.Ordinal",
        theory: "Comparar strings em C# exige atenção: comparações culturais usam regras linguísticas locais (como o \"i\" na Turquia), enquanto comparações ordinais comparam diretamente os bytes Unicode. Para identificadores internos, caminhos e chaves, deve-se usar sempre StringComparison.Ordinal.",
        questions: [
          q("Qual opção do enum StringComparison deve ser usada ao comparar identificadores de código, JSON ou URLs?", "StringComparison.Ordinal (ou StringComparison.OrdinalIgnoreCase)", ["StringComparison.CurrentCulture","StringComparison.InvariantCulture"], "A comparação ordinal compara diretamente os bytes binários, garantindo determinismo independente do idioma da máquina."),
          q("Qual é o risco de usar o método s.ToLower() == \"admin\" para autenticação de usuários?", "Em localidades com regras culturais especiais (como Turquia), \"I\" minúsculo vira \"ı\" (sem ponto), falhando o login", ["O método trava a CPU","A senha vaza na memória"], "O clássico \"Turkish-I bug\" é a vulnerabilidade mais famosa gerada por comparações sensíveis à cultura."),
          q("Qual método da classe string é o padrão oficial para comparar strings com controle de cultura?", "string.Equals(strA, strB, StringComparison.OrdinalIgnoreCase)", ["strA == strB","strA.Compare(strB)","string.Match(strA, strB)"], "Equals com enum StringComparison explicita de forma determinística e segura a regra de correspondência."),
          q("Como funciona StringComparison.InvariantCultureIgnoreCase?", "Aplica regras linguísticas baseadas no inglês (cultura neutra), útil para dados visíveis ao usuário multilocais", ["Usa a cultura da máquina local","Compara apenas números"], "A cultura invariante é estável em todo o mundo, porém mais lenta que a comparação puramente ordinal."),
          t("Qual membro do enum StringComparison realiza a comparação rápida byte a byte ignorando maiúsculas?", ["OrdinalIgnoreCase","StringComparison.OrdinalIgnoreCase"], "OrdinalIgnoreCase é o padrão recomendado para comparações corporativas.", "bool ok = string.Equals(a, b, StringComparison.____);"),
          g("Complete a comparação de strings com correspondência binária ordinal rápida e segura.", ["StringComparison.Ordinal"], "StringComparison.Ordinal compara os códigos Unicode brutos.", "if (string.Equals(tokenA, tokenB, ____)) { }"),
          o("Ordene as opções de comparação de strings da mais rápida para a mais pesada.", ["StringComparison.Ordinal (comparação binária direta de bytes)","StringComparison.OrdinalIgnoreCase (binária com conversão rápida de tabela)","StringComparison.InvariantCultureIgnoreCase (regras culturais neutras)","StringComparison.CurrentCultureIgnoreCase (regras linguísticas completas da máquina)"], "A comparação ordinal é ordens de grandeza mais veloz que comparações com regras linguísticas."),
          p("Associe o cenário de comparação ao membro de StringComparison adequado.", [["Chaves de dicionário, rotas de API, JSON","StringComparison.OrdinalIgnoreCase"],["Texto digitado pelo usuário para exibição local","StringComparison.CurrentCulture"],["Arquivos de configuração e dados persistidos","StringComparison.Ordinal"],["Comparação de nomes em catálogo global","StringComparison.InvariantCultureIgnoreCase"]], "Adotar StringComparison.Ordinal previne bugs silenciosos de localização no .NET.")
        ]
      },
      {
        id: "csharp-c06-u4-l3-interpolacao-e-raw-string-literals",
        title: "Interpolação de strings ($\"\") e literais brutos (\"\"\" \"\"\")",
        subtitle: "Strings e comparação · Formatação limpa e textos multilinha sem escapes no C# 11+",
        theory: "A interpolação de strings com $\"Texto {variavel}\" (C# 6) substituiu a verbosidade de string.Format, suportando alinhamentos e especificadores de formato. No C# 11, os Raw String Literals com três ou mais aspas \"\"\" eliminam a necessidade de escapar aspas ou barras, permitindo colar JSON e SQL diretamente.",
        questions: [
          q("Qual símbolo prefixa uma string para habilitar a interpolação de expressões em C#?", "O símbolo de cifrão ($)", ["O símbolo de arroba (@)","O símbolo de porcentagem (%)","A cerquilha (#)"], "O prefixo $ transforma o literal em uma string interpolada processada pelo compilador."),
          q("Como funcionam os Raw String Literals introduzidos no C# 11 delimitados por no mínimo três aspas \"\"\"?", "Permitem escrever textos com aspas e barras sem nenhum caractere de escape, preservando a indentação", ["Eles compilar em tempo de execução","Eles gravam o texto diretamente no disco"], "Raw String Literals facilitam embutir trechos inteiros de JSON, XML ou comandos SQL multilinhas."),
          q("Como especificar formatação de moeda e duas casas decimais em uma interpolação?", "$\"{valor:C2}\"", ["$\"{valor.Money()}\"","$\"{valor -> 2}\"","$\"{C2:valor}\""], "Os dois-pontos dentro das chaves {expressao:formato} aplicam especificadores padrão como C (moeda) ou N (número)."),
          q("Como combinar interpolação com Raw String Literals quando o próprio texto contém chaves (como JSON)?", "Prefixando com múltiplos cifrões (ex: $$\"\"\"{ \"id\": {{valor}} }\"\"\")", ["Usando barra invertida nas chaves \\{","Não é possível combinar os dois"], "A quantidade de cifrões determina quantas chaves consecutivas são necessárias para interpolar um valor."),
          t("Quantas aspas consecutivas no mínimo abrem um Raw String Literal no C# 11?", ["3","tres","três","\"\"\""], "No mínimo três aspas abrem o literal bruto.", "string json = ____\n{\n  \"status\": \"ok\"\n}\n____;"),
          g("Complete a interpolação formatando a data no padrão ano-mês-dia.", ["{hoje:yyyy-MM-dd}"], "O especificador após os dois-pontos define a máscara de formatação.", "string registro = $\"Data: ____\";"),
          o("Ordene a evolução da interpolação de texto no ecossistema C#.", ["string.Format(\"Total: {0}\", valor) com índices numéricos manuais","Interpolação $\"Total: {valor}\" introduzida no C# 6","Verbatim strings @\"C:\\caminho\" eliminando escapes de barra","Raw String Literals \"\"\"...\"\"\" no C# 11 eliminando escapes de aspas e quebras"], "O C# refinou continuamente a ergonomia na composição e formatação de texto."),
          p("Associe a sintaxe literal ao seu benefício prático.", [["$\"Nome: {nome}\"","Interpolação limpa de variáveis"],["@\"C:\\temp\\log.txt\"","Verbatim string que desativa escapes de barra invertida"],["\"\"\" { \"porta\": 80 } \"\"\"","Raw string literal que aceita aspas duplas sem escape"],["$\"{preco:N2}\"","Interpolação com formatação numérica de duas casas decimais"]], "Interpolação moderna e literais brutos trazem legibilidade imbatível para código que manipula dados.")
        ]
      },
      {
        id: "csharp-c06-u4-l4-metodos-inspecao-contain-start-index",
        title: "Métodos essenciais de inspeção: Contains, StartsWith e IndexOf",
        subtitle: "Strings e comparação · Verificações de prefixo, sufixo e posicionamento com StringComparison",
        theory: "A classe String fornece métodos rápidos de inspeção: StartsWith(prefixo) e EndsWith(sufixo) validam extremidades, Contains(termo) avalia a presença de trechos, e IndexOf(termo) localiza o índice da primeira ocorrência (retornando -1 se ausente). No .NET moderno, todos aceitam StringComparison.",
        questions: [
          q("Qual sobrecarga de str.Contains() deve ser usada para buscas insensíveis a maiúsculas no .NET Core 2.1+?", "str.Contains(\"busca\", StringComparison.OrdinalIgnoreCase)", ["str.ToLower().Contains(\"busca\")","str.ContainsIgnoreCase(\"busca\")"], "Passar StringComparison diretamente elimina a necessidade de alocar novas strings com ToLower()."),
          q("O que o método str.IndexOf(\"item\") retorna caso a palavra não esteja presente no texto?", "-1", ["0","null","Lança exceção StringNotFoundException"], "O índice -1 é a convenção universal de ausência de correspondência na BCL do .NET."),
          q("Qual método verifica se uma cadeia de caracteres inicia com um prefixo determinado?", "str.StartsWith(prefixo, StringComparison.Ordinal)", ["str.HasPrefix(prefixo)","str.BeginsWith(prefixo)","str.Prefix(prefixo)"], "StartsWith valida se o início da string corresponde exatamente ao prefixo fornecido."),
          q("Como encontrar a última ocorrência de um caractere ou texto dentro de uma string?", "str.LastIndexOf(termo)", ["str.IndexOfEnd(termo)","str.FindLast(termo)","str.ReverseIndexOf(termo)"], "LastIndexOf varre a string a partir do final em direção ao início, devolvendo o índice do último encontro."),
          t("Qual método da classe string testa se uma subsequência existe em qualquer posição do texto?", ["Contains"], "Contains verifica a existência do trecho na string.", "bool achou = texto.____(\"sucesso\");"),
          g("Complete o teste validando se a rota da URL inicia com \"/api/\" ignorando a caixa.", ["StringComparison.OrdinalIgnoreCase"], "A sobrecarga com StringComparison torna o teste limpo e performático.", "if (url.StartsWith(\"/api/\", ____)) { }"),
          o("Ordene as etapas para verificar e recortar o domínio de um e-mail.", ["Localizar a posição da arroba com int idx = email.IndexOf('@')","Garantir que idx != -1 confirmando que o e-mail possui arroba","Extrair o domínio a partir do índice seguinte com email.Substring(idx + 1)","Validar se o domínio extraído não está vazio"], "A dobradinha IndexOf e Substring é a base da extração e parsing de dados textuais simples."),
          p("Associe o método de inspeção à sua finalidade.", [["str.StartsWith(\"https\")","Verifica se o início do texto casa com o prefixo"],["str.EndsWith(\".pdf\")","Verifica se o final do texto casa com a extensão"],["str.Contains(\"erro\")","Verifica se o trecho ocorre em qualquer posição"],["str.IndexOf(':')","Retorna a coordenada posicional do primeiro dois-pontos"]], "As sobrecargas com StringComparison dispensam alocações temporárias na checagem de textos.")
        ]
      },
      {
        id: "csharp-c06-u4-l5-validacao-isnullorempty-e-whitespace",
        title: "Validação de strings nulas e em branco",
        subtitle: "Strings e comparação · string.IsNullOrEmpty e string.IsNullOrWhiteSpace com guarda defensiva",
        theory: "Para validar strings defensivamente, a BCL oferece dois métodos estáticos essenciais: string.IsNullOrEmpty(str) (retorna true se for null ou com Length == 0) e string.IsNullOrWhiteSpace(str) (retorna true também se contiver apenas espaços, quebras ou caracteres em branco Unicode).",
        questions: [
          q("Qual é a diferença fundamental entre string.IsNullOrEmpty(s) e string.IsNullOrWhiteSpace(s)?", "IsNullOrWhiteSpace retorna true também para strings preenchidas puramente por espaços \"   \"", ["IsNullOrEmpty é mais recente","São rigorosamente sinônimos"], "IsNullOrWhiteSpace protege formulários e cadastros contra strings compostas exclusivamente de espaços em branco."),
          q("Se s for declarada como string? s = null;, o que string.IsNullOrWhiteSpace(s) devolve?", "true, sem lançar nenhuma NullReferenceException", ["false","Lança exceção de argumento nulo"], "Por serem métodos estáticos que recebem a string como parâmetro, eles tratam null com total segurança."),
          q("Por que é má prática escrever if (str == null || str.Trim() == \"\") em vez de IsNullOrWhiteSpace?", "Porque str.Trim() aloca um novo objeto String no heap apenas para verificar se estava vazio", ["Porque Trim() não compila em C#","Porque == é proibido em strings"], "IsNullOrWhiteSpace percorre os caracteres existentes sem alocar nenhuma string intermediária na memória."),
          q("Qual cláusula de guarda moderna do C# 10 simplifica a validação de strings nulas em métodos?", "ArgumentException.ThrowIfNullOrWhiteSpace(str); (ou ThrowIfNullOrEmpty)", ["Validate.String(str);","Assert.IsNotNull(str);"], "A partir do .NET 7/8, os métodos estáticos ThrowIfNullOrWhiteSpace realizam validação e disparo de exceção em uma só linha."),
          t("Qual método estático de string valida se o texto é nulo, vazio ou composto unicamente de espaços?", ["string.IsNullOrWhiteSpace","IsNullOrWhiteSpace"], "IsNullOrWhiteSpace é a validação mais completa de strings em branco.", "if (____(entrada)) throw new ArgumentException();"),
          g("Complete o teste de guarda para rejeitar entradas nulas ou vazias de forma segura.", ["string.IsNullOrEmpty(codigo)"], "string.IsNullOrEmpty é o teste rápido para verificar presença de dados.", "if (____) return false;"),
          o("Ordene o fluxo defensivo na entrada de um método que recebe nome de usuário.", ["Executar if (string.IsNullOrWhiteSpace(nome))","Lançar ArgumentException com mensagem clara informando a violação","Remover eventuais espaços residuais nas pontas com nome.Trim()","Prosseguir com o processamento do nome validado"], "Validações defensivas no início previnem corrupção de banco de dados e estados inválidos."),
          p("Associe a entrada ao retorno de string.IsNullOrWhiteSpace(entrada).", [["entrada = null","true (nulo)"],["entrada = \"\"","true (tamanho zero)"],["entrada = \"   \\t\\n\"","true (composto apenas por caracteres em branco)"],["entrada = \" A \"","false (possui caractere visível válido)"]], "string.IsNullOrWhiteSpace é a guarda defensiva mandatória para entradas textuais no .NET.")
        ]
      }
    ],
    5: [
      {
        id: "csharp-c06-u5-l1-laco-foreach-e-getenumerator",
        title: "O laço foreach e o padrão GetEnumerator por convenção",
        subtitle: "Percursos · Como o compilador C# implementa iteração sem alocação através de Duck Typing",
        theory: "O laço foreach é a forma canônica de iterar coleções no C#. Notavelmente, o compilador C# não exige que a classe implemente formalmente a interface IEnumerable: basta que ela possua um método acessível chamado GetEnumerator() que retorne um objeto ou struct com a propriedade Current e o método MoveNext().",
        questions: [
          q("Como o compilador C# reconhece que um tipo pode ser percorrido com o laço foreach?", "Através do padrão de padrão estrutural (Duck Typing): basta ter um método GetEnumerator() público compatível", ["Obrigando que a classe herde de System.Array","Apenas se implementar IList"], "C# prioriza a presença do método GetEnumerator() por convenção, permitindo enumeradores em struct sem alocação."),
          q("Quais membros o enumerador retornado por GetEnumerator() deve obrigatoriamente possuir?", "A propriedade Current e o método bool MoveNext()", ["Apenas o método Next()","A propriedade Count e indexador"], "O contrato de iteração avança o cursor com MoveNext() e lê o item corrente na propriedade Current."),
          q("Por que enumeradores implementados como structs (como em List<T>.Enumerator) trazem grande benefício?", "Permitem que o laço foreach execute sem alocar nenhum objeto no heap gerenciado", ["Aumentam a segurança contra threads","Permitem alterar o tamanho da lista"], "Enumeradores em struct são alocados no stack frame, resultando em custo zero de garbage collection."),
          q("O que acontece se tentarmos modificar a lista (ex: lista.Add(x)) de dentro do corpo de um foreach que a percorre?", "Lança System.InvalidOperationException (Collection was modified)", ["A modificação é aceita normalmente","O laço ignora o novo elemento"], "Enumeradores da BCL mantêm um contador de versão interno e bloqueiam mutações concorrentes para evitar estados corrompidos."),
          t("Qual método o compilador C# procura por convenção para permitir o uso de foreach?", ["GetEnumerator","GetEnumerator()"], "GetEnumerator inicia a enumeração da coleção.", "var enumerador = colecao.____();"),
          g("Complete o laço que percorre a sequência de clientes sem expor índices manuais.", ["foreach"], "foreach itera sequencialmente sobre todos os elementos.", "____ (var c in clientes) { Processar(c); }"),
          o("Ordene a sequência de operações que o compilador C# executa por trás de um laço foreach.", ["Invoca var enumerador = colecao.GetEnumerator()","Laço while executa enumerador.MoveNext() verificando se há próximo elemento","Se true, lê a propriedade enumerador.Current e atribui à variável do loop","Se false, encerra o laço e invoca Dispose no enumerador se aplicável"], "Compreender a mecânica do enumerador explica o custo e as garantias de iteração no .NET."),
          p("Associe o componente da iteração ao seu papel no laço foreach.", [["GetEnumerator()","Cria e posiciona o enumerador antes do primeiro elemento"],["MoveNext()","Avança o cursor para o próximo item e retorna false no fim"],["Current","Propriedade que expõe o elemento sobre o qual o cursor pousou"],["InvalidOperationException","Disparada se a coleção for modificada durante o percurso"]], "O laço foreach alia elegância visual a otimizações de compilação de altíssimo nível.")
        ]
      },
      {
        id: "csharp-c06-u5-l2-span-e-readonlyspan-alocacao-zero",
        title: "Percursos de alta performance com Span<T> e ReadOnlySpan<T>",
        subtitle: "Percursos · Janelas contíguas de memória na pilha com alocação zero no C# 7.2+",
        theory: "Introduzido no C# 7.2, Span<T> e ReadOnlySpan<T> representam fatias contíguas de memória arbitrária (pilha, heap ou memória não gerenciada) com segurança de tipos e limites. Como são ref structs alocadas exclusivamente na pilha, fatiar texto ou arrays com span.Slice() tem custo de alocação rigorosamente zero.",
        questions: [
          q("Qual é a grande revolução trazida por Span<T> e ReadOnlySpan<T> para a manipulação de dados em C#?", "Permite fatiar e percorrer trechos de arrays e strings com alocação zero de novos objetos no heap", ["Substitui todas as classes do C#","Desativa o compilador JIT"], "Span representa uma janela direta sobre a memória original sem duplicar bytes nem acionar o coletor de lixo."),
          q("Por que Span<T> é declarada como uma ref struct na linguagem C#?", "Para forçar que ela resida estritamente na pilha da thread, impedindo que escape para o heap", ["Para impedir que seja usada em laços for","Para permitir herança múltipla"], "Ref structs não podem ser boxed nem colocadas em campos de classes, garantindo segurança de memória de baixo nível."),
          q("Qual método de ReadOnlySpan<char> fatia uma string sem criar uma nova instância de texto?", "span.Slice(inicio, tamanho)", ["span.Substring(inicio, tamanho)","span.Split(inicio, tamanho)"], "Slice apenas ajusta o ponteiro e o comprimento da janela de visualização em tempo constante O(1)."),
          q("O laço foreach funciona normalmente sobre instâncias de Span<T> e ReadOnlySpan<T>?", "Sim, o compilador reconhece o GetEnumerator() otimizado de Span e itera sem overhead", ["Não, spans só aceitam loops while","Apenas com arrays nativos"], "Spans oferecem uma experiência de uso fluente idêntica à de coleções tradicionais."),
          t("Qual tipo ref struct representa uma visualização de memória somente leitura de caracteres no C#?", ["ReadOnlySpan<char>","ReadOnlySpan"], "ReadOnlySpan<char> viabiliza fatiamentos de strings sem alocações.", "____ fatia = texto.AsSpan(0, 5);"),
          g("Complete a extração da fatia da string sem alocação usando a extensão AsSpan.", ["AsSpan()","AsSpan"], "AsSpan cria a janela ReadOnlySpan sobre a string original.", "ReadOnlySpan<char> span = texto.____;"),
          o("Ordene a comparação entre string.Substring e ReadOnlySpan.Slice.", ["Substring(0, 5) aloca uma nova String no heap e copia os 5 caracteres","Slice(0, 5) ajusta apenas um ponteiro e um inteiro na pilha em O(1)","Zero bytes adicionais são gerados no heap com Slice","A pressão sobre o Garbage Collector cai drasticamente em rotinas de parsing com Span"], "Span transformou o .NET na plataforma de processamento de texto de maior desempenho do mercado."),
          p("Associe a estrutura de memória à sua característica.", [["Span<T>","Visão contígua de memória mutável alocada na pilha"],["ReadOnlySpan<T>","Visão contígua de memória somente leitura na pilha"],["ref struct","Garantia de compilação de que a struct jamais residirá no heap"],["Memory<T>","Equivalente de Span compatível com métodos async no heap"]], "Span<T> é o divisor de águas da engenharia de software de alta performance no ecossistema .NET.")
        ]
      },
      {
        id: "csharp-c06-u5-l3-iteradores-yield-return-break",
        title: "Iteradores sob demanda com yield return e yield break",
        subtitle: "Percursos · Geradores preguiçosos que produzem sequências sob demanda",
        theory: "A palavra-chave yield transforma um método comum em um gerador preguiçoso de sequências (IEnumerable<T>). A instrução yield return pausa a execução e entrega um elemento individual ao consumidor; quando o laço chamador pede o próximo item, o método retoma do ponto exato onde pausou. yield break encerra a sequência.",
        questions: [
          q("Qual é o comportamento de execução de um método que utiliza a instrução yield return?", "Executa de forma preguiçosa (lazy evaluation), gerando cada elemento sob demanda quando solicitado", ["Calcula todos os elementos antecipadamente e salva em array","Roda em uma thread em segundo plano"], "O método só avança até a próxima instrução yield return a cada ciclo do MoveNext() no consumidor."),
          q("Qual instrução em C# encerra prematuramente a geração de itens em um método iterador?", "yield break;", ["yield stop;","return null;","break yield;"], "yield break sinaliza imediatamente o fim da sequência para o enumerador, fazendo MoveNext() retornar false."),
          q("Qual é a grande economia de memória promovida por geradores com yield return?", "Permite processar sequências infinitas ou arquivos de gigabytes consumindo apenas um elemento por vez na RAM", ["Elimina a memória da placa de vídeo","Desativa o sistema de arquivos"], "Como não é necessário armazenar toda a lista em memória, a pegada de RAM é constante O(1)."),
          q("É permitido utilizar a instrução yield return dentro de um bloco try que possui cláusula catch?", "Não, o compilador C# proíbe yield return dentro de blocos try/catch por restrições da máquina de estados", ["Sim, é perfeitamente válido","Apenas para números inteiros"], "A complexidade de restaurar frames com tratamento de exceções impede o uso direto de yield em try-catch."),
          t("Qual instrução composta em C# entrega um elemento individual e pausa a execução do gerador?", ["yield return"], "yield return devolve um dado sob demanda mantendo o estado da função.", "____ numeroAtual;"),
          g("Complete o encerramento da sequência quando o critério de parada for atingido no gerador.", ["yield break;"], "yield break finaliza a enumeração da coleção preguiçosa.", "if (item == null) ____"),
          o("Ordene a dança temporal entre o consumidor foreach e o gerador yield return.", ["Consumidor executa foreach chamando enumerador.MoveNext()","Gerador executa até a instrução yield return elemento","Gerador pausa seu estado e MoveNext() retorna true entregando o valor","Consumidor executa o corpo do loop com o item recebido","Consumidor pede o próximo item e gerador retoma do ponto exato da pausa"], "O controle de fluxo alterna harmoniosamente entre chamador e gerador a cada iteração."),
          p("Associe a instrução ao seu papel em iteradores C#.", [["yield return x;","Produz o elemento x e suspende a execução até nova solicitação"],["yield break;","Interrompe a sequência e sinaliza que a enumeração acabou"],["IEnumerable<T> retorno","Interface que expõe a sequência preguiçosa produzida"],["Máquina de estados","Classe oculta criada pelo compilador para rastrear a pausa"]], "Iteradores com yield são a espinha dorsal da computação preguiçosa e do LINQ no C#.")
        ]
      },
      {
        id: "csharp-c06-u5-l4-linq-consultas-e-execucao-diferida",
        title: "Consultas LINQ e o conceito de execução diferida (deferred execution)",
        subtitle: "Percursos · Where, Select e OrderBy operando sob demanda com IEnumerable<T>",
        theory: "O LINQ provê sintaxe declarativa para consulta e transformação de dados em C#. Operações como Where, Select e OrderBy usam execução diferida (deferred execution): a consulta não processa nenhum dado no momento da sua definição, executando apenas quando iterada por foreach ou .ToList().",
        questions: [
          q("O que significa o conceito de \"execução diferida\" (deferred execution) no LINQ?", "A consulta não é executada na linha de sua declaração, mas sim no momento em que os dados são de fato consumidos", ["A consulta roda em servidores remotos","A consulta executa com atraso de 5 segundos"], "A consulta LINQ é uma receita guardada; o processamento real só acontece quando o iterador é acionado."),
          q("Qual método do LINQ força a execução imediata da consulta e armazena os resultados em uma lista na memória?", ".ToList() (ou .ToArray())", [".Where()",".Select()",".OrderBy()"], "Operadores de materialização terminal (ToList, ToArray, ToDictionary) executam o pipeline e guardam os dados."),
          q("Qual operador LINQ projeta e transforma cada elemento da coleção em um novo formato ou tipo?", ".Select(...)", [".Where(...)",".Distinct()",".Skip(...)"], "Select mapeia cada item da fonte aplicando uma função de transformação correspondente ao map funcional."),
          q("O que acontece se modificarmos a lista original após declarar uma consulta com .Where() e antes de iterá-la?", "A consulta refletirá as modificações, pois ela só será executada no momento do foreach", ["A consulta ignora os novos itens","Lança exceção de consulta corrompida"], "Como a execução é diferida, a consulta sempre avalia o estado mais recente da coleção fonte."),
          t("Qual operador LINQ filtra elementos de uma sequência com base em um predicado booleano?", ["Where"], "Where retém elementos que satisfazem o predicado.", "var pares = numeros.____(n => n % 2 == 0);"),
          g("Complete o encadeamento LINQ para materializar o resultado imediatamente em uma nova lista.", ["ToList()"], "ToList força a execução e salva os dados no heap.", "var resultado = consulta.____;"),
          o("Ordene o ciclo de vida de uma consulta LINQ com execução diferida.", ["Definição da consulta var query = lista.Where(x => x > 10).Select(x => x * 2)","Nenhum dado é processado e zero elementos são iterados na linha da definição","Consumidor executa foreach (var item in query) ou chama query.ToList()","O pipeline é executado item por item aplicando os filtros e projeções sob demanda"], "Compreender a execução diferida evita reexecuções acidentais de consultas pesadas."),
          p("Associe o operador LINQ à sua categoria de execução.", [[".Where(predicado)","Execução diferida: filtra sob demanda na iteração"],[".Select(transformador)","Execução diferida: projeta novos valores sob demanda"],[".ToList()","Execução imediata: consome todo o fluxo e aloca no heap"],[".Count()","Execução imediata: itera toda a fonte e devolve um inteiro"]], "Dominar o momento exato de execução de consultas LINQ é essencial para desempenho em bancos e memória.")
        ]
      },
      {
        id: "csharp-c06-u5-l5-agregacoes-em-percurso-unico",
        title: "Agregações em percurso único: Aggregate, Sum, Min e Max",
        subtitle: "Percursos · Reduzindo sequências a métricas escalares consolidadas",
        theory: "Operações de agregação reduzem sequências a um único valor escalar. Métodos como Sum(), Average(), Min() e Max() realizam cálculos matemáticos imediatos, enquanto Aggregate() implementa o padrão funcional fold/reduce, permitindo acumular qualquer estrutura personalizada em uma só passagem.",
        questions: [
          q("Qual operador LINQ representa a função de redução funcional (fold/reduce) genérica no C#?", ".Aggregate(...)", [".Reduce(...)",".Fold(...)",".Accumulate(...)"], "Aggregate percorre a sequência aplicando uma função acumuladora sobre um acumulador e o elemento atual."),
          q("Qual é o comportamento de .Average() quando aplicado a uma coleção vazia no C#?", "Lança System.InvalidOperationException (Sequence contains no elements)", ["Retorna 0.0","Retorna null","Retorna NaN"], "Calcular média de sequência sem elementos implica divisão por zero, disparando exceção defensiva."),
          q("Como calcular o produto acumulado de uma lista de números inteiros usando LINQ?", "numeros.Aggregate(1, (acc, x) => acc * x)", ["numeros.Sum(x => x * x)","numeros.MultiplyAll()"], "Iniciar com semente 1 e multiplicar cada item constrói o produtório perfeito da sequência."),
          q("Qual é a complexidade de tempo de métodos de agregação como Sum(), Min() e Max()?", "O(n) - tempo linear no tamanho da coleção", ["O(1)","O(log n)","O(n²)"], "Para encontrar o mínimo ou somar os itens, é mandatória a inspeção exaustiva de todos os n elementos."),
          t("Qual método LINQ calcula o somatório total de uma sequência numérica?", ["Sum","Sum()"], "Sum agrega todos os valores numéricos em uma única soma.", "decimal faturamento = pedidos.____(p => p.Total);"),
          g("Complete o cálculo da maior idade na coleção de alunos.", ["Max"], "Max extrai o valor de pico da propriedade especificada.", "int maisVelho = alunos.____(a => a.Idade);"),
          o("Ordene as etapas da execução de .Aggregate(semente, (acc, item) => ...) em uma lista.", ["Inicializar a variável acumuladora acc com o valor semente fornecido","Iterar sobre o primeiro elemento da coleção e computar acc = func(acc, item1)","Passar para os elementos seguintes atualizando acc progressivamente a cada volta","Devolver o valor final consolidado em acc após esgotar a sequência"], "Aggregate exemplifica a flexibilidade máxima do paradigma funcional em percursos consolidados."),
          p("Associe o operador de agregação ao seu resultado.", [["numeros.Sum()","Soma aritmética acumulada de todos os elementos"],["numeros.Average()","Média aritmética (lança exceção se lista estiver vazia)"],["numeros.Min() e Max()","Menor e maior valor encontrado na sequência"],["numeros.Aggregate(semente, func)","Acúmulo customizado universal com valor inicial"]], "Operadores de agregação sintetizam grandes massas de dados com máxima concisão e elegância.")
        ]
      }
    ],
    6: [
      {
        id: "csharp-c06-u6-l1-stringbuilder-no-dotnet",
        title: "A classe StringBuilder e manipulação mutável de texto",
        subtitle: "Transformações de texto · Concatenação eficiente e controle de capacidade no System.Text",
        theory: "A classe System.Text.StringBuilder provê um buffer mutável de caracteres projetado para concatenações repetidas em loops. Diferente de String, cujas concatenações com + em laços geram lentidão O(n²), StringBuilder acumula dados in-place em blocos contíguos de memória, atingindo complexidade linear O(n).",
        questions: [
          q("Por que concatenar strings com + dentro de loops longos é uma má prática no C#?", "Porque cria milhares de objetos intermediários de curta duração no heap, degradando a performance O(n²)", ["Porque strings concatenadas perdem a codificação Unicode","Porque o operador + gera erro de compilação em loops"], "A imutabilidade de String exige a cópia integral do texto acumulado a cada iteração."),
          q("Qual método de StringBuilder é utilizado para anexar texto seguido de uma quebra de linha?", "sb.AppendLine(...)", ["sb.AppendBreak(...)","sb.WriteLine(...)","sb.AddLine(...)"], "AppendLine anexa o conteúdo e injeta automaticamente Environment.NewLine ao final."),
          q("Como se pré-aloca a capacidade de um StringBuilder para evitar redimensionamentos internos de buffer?", "new StringBuilder(capacidadeEstimada) passando um inteiro no construtor", ["sb.SetCapacity(1000)","sb.EnsureAllocated(1000)"], "Dimensionar previamente a capacidade inicial no construtor elimina cópias internas de realocação de buffers."),
          q("Qual método limpa todo o conteúdo acumulado em uma instância de StringBuilder para reuso?", "sb.Clear()", ["sb.Reset()","sb.Empty()","sb.Wipe()"], "Clear() redefine o comprimento para zero (Length = 0), permitindo reciclar o buffer sem novas alocações."),
          t("Qual classe do namespace System.Text implementa o buffer mutável de caracteres para alta performance?", ["StringBuilder"], "StringBuilder é o acumulador mutável oficial do .NET.", "var sb = new ____();"),
          g("Complete a adição de texto com quebra de linha ao acumulador de logs.", ["AppendLine"], "AppendLine acrescenta o texto e a quebra de linha.", "sb.____(\"[INFO] Processo iniciado\");"),
          o("Ordene as boas práticas de uso de StringBuilder no .NET.", ["Estimar a dimensão máxima do texto a ser gerado","Instanciar StringBuilder com a capacidade estimada new StringBuilder(capacidade)","Acumular dados nos laços utilizando chamadas fluentes sb.Append(...)","Chamar sb.ToString() para produzir a String imutável final"], "O ciclo de vida planejado garante velocidade máxima e zero desperdício de memória RAM."),
          p("Associe o método de StringBuilder à sua operação.", [["sb.Append(\"texto\")","Adiciona o fragmento de texto no final do buffer"],["sb.AppendLine(\"linha\")","Adiciona o texto acompanhado de quebra de linha"],["sb.Insert(0, \"prefixo\")","Insere dados no índice informado deslocando os caracteres"],["sb.ToString()","Materializa a String final imutável para uso no sistema"]], "StringBuilder é a ferramenta mandatória para montagem de relatórios e mensagens em lote.")
        ]
      },
      {
        id: "csharp-c06-u6-l2-metodo-split-e-stringsplitoptions",
        title: "Divisão de texto com string.Split e StringSplitOptions",
        subtitle: "Transformações de texto · Quebrando strings e eliminando entradas vazias com opções avançadas",
        theory: "O método str.Split() divide um texto em um array string[] com base em delimitadores de caracteres ou strings. Com o enum StringSplitOptions.RemoveEmptyEntries, fragmentos em branco resultantes de separadores consecutivos são eliminados automaticamente, e TrimEntries (C# 9+) remove espaços das pontas de cada token.",
        questions: [
          q("Qual opção de StringSplitOptions remove automaticamente fragmentos vazios gerados por delimitadores repetidos?", "StringSplitOptions.RemoveEmptyEntries", ["StringSplitOptions.IgnoreEmpty","StringSplitOptions.DropBlanks"], "RemoveEmptyEntries limpa tokens vazios indesejados originados por pontuação repetida como \";;\"."),
          q("Qual recurso adicionado no .NET 5 (C# 9) remove espaços em branco das pontas de cada token gerado no Split?", "StringSplitOptions.TrimEntries", ["StringSplitOptions.CleanWhitespace","StringSplitOptions.Strip"], "TrimEntries aplica Trim() em cada fragmento resultante na própria operação de quebra."),
          q("Como combinar múltiplas opções como remover vazios e sanitizar espaços ao mesmo tempo em string.Split?", "StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries (usando operador bitwise OR |)", ["Usando operador AND &","Passando um array de opções"], "Como o enum possui o atributo [Flags], as opções são combinadas perfeitamente com o operador pipe |."),
          q("É possível dividir uma string utilizando outra string de múltiplos caracteres como delimitador?", "Sim, string.Split aceita arrays ou spans de strings como delimitadores (ex: str.Split(\" // \"))", ["Não, apenas caracteres únicos char são aceitos","Apenas com expressões regulares"], "A BCL oferece sobrecargas completas para quebrar textos tanto por caracteres quanto por strings compostas."),
          t("Qual opção do enum StringSplitOptions elimina elementos vazios do array resultante?", ["RemoveEmptyEntries","StringSplitOptions.RemoveEmptyEntries"], "RemoveEmptyEntries limpa o resultado de tokens sem conteúdo.", "texto.Split(',', StringSplitOptions.____);"),
          g("Complete a chamada dividindo o texto por vírgulas e eliminando entradas vazias.", ["StringSplitOptions.RemoveEmptyEntries"], "A opção limpa o array de tokens vazios indesejados.", "string[] tags = linha.Split(',', ____);"),
          o("Ordene as etapas para quebrar e sanitizar uma lista de tags separadas por ponto e vírgula.", ["Receber a string bruta contendo tags como \"csharp ; ; dotnet ; web ;\"","Executar Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)","Receber o array limpo contendo exatamente [\"csharp\", \"dotnet\", \"web\"]","Iterar com segurança sobre as tags prontas para persistência"], "Combinar RemoveEmptyEntries e TrimEntries economiza dezenas de linhas de código manual."),
          p("Associe a opção de StringSplitOptions ao seu efeito no parsing.", [["None","Comportamento padrão: preserva todos os fragmentos vazios"],["RemoveEmptyEntries","Descarta strings de tamanho zero do array resultante"],["TrimEntries (.NET 5+)","Remove espaços em branco nas pontas de cada elemento"],["RemoveEmptyEntries | TrimEntries","Remove vazios e higieniza todas as pontas dos tokens"]], "Dominar StringSplitOptions simplifica a ingestão de dados em arquivos CSV e logs.")
        ]
      },
      {
        id: "csharp-c06-u6-l3-uniao-de-textos-string-join",
        title: "União de elementos com string.Join",
        subtitle: "Transformações de texto · Formatando listas e coleções delimitadas sem separador residual",
        theory: "O método estático string.Join(delimitador, colecao) concatena os elementos de um array ou IEnumerable<T> inserindo o separador especificado exclusivamente entre os itens adjacentes. Isso resolve com elegância o clássico problema da vírgula sobressalente no final, tornando o código limpo e declarativo.",
        questions: [
          q("Qual é a principal vantagem de usar string.Join(\", \", lista) em vez de um laço for manual com +?", "Garante que o separador só apareça entre os itens, sem deixar vírgulas sobrando no final", ["Executa em código assembly nativo","Converte todos os elementos para maiúsculas"], "string.Join cuida da pontuação entre pares de elementos de forma automática e precisa."),
          q("O método string.Join aceita coleções que contenham objetos complexos ou números?", "Sim, ele invoca automaticamente o método .ToString() em cada elemento da coleção", ["Não, aceita exclusivamente strings puras","Apenas tipos primitivos inteiros"], "O método aceita IEnumerable<T> genérico e converte cada elemento em sua representação textual."),
          q("O que a instrução string.Join(\" - \", new[] { \"A\", \"B\", \"C\" }) produz?", "\"A - B - C\"", ["\"A - B - C - \"","\"- A - B - C\"","\"ABC\""], "Produz uma única cadeia com o delimitador inserido estritamente no meio dos elementos."),
          q("Como unir elementos de uma consulta LINQ diretamente em uma string delimitada?", "string.Join(\", \", numeros.Where(n => n > 0))", ["numeros.Where(n => n > 0).Join(\", \")","numeros.Combine(\",\")"], "string.Join consome qualquer IEnumerable<T> gerado por pipelines LINQ diretamente."),
          t("Qual método estático da classe string concatena coleções inserindo um delimitador entre os itens?", ["string.Join","Join"], "string.Join é o formatador padrão de sequências delimitadas.", "string csv = ____(\";\", valores);"),
          g("Complete a instrução unindo os nomes das cidades com barra inclinada.", ["string.Join"], "string.Join formata a sequência intercalando o delimitador.", "string rota = ____(\"/\", cidades);"),
          o("Ordene a formatação de uma lista de identificadores para uma cláusula SQL IN.", ["Filtrar a lista de inteiros necessária","Unir os números separados por vírgula com string.Join(\", \", ids)","Inserir o resultado entre parênteses com interpolação $\"IN ({valores})\"","Produzir a consulta SQL formatada e pronta para execução"], "string.Join simplifica enormemente a montagem de cláusulas SQL e cabeçalhos CSV."),
          p("Associe a ferramenta de união ao seu cenário de aplicação.", [["string.Join(\", \", itens)","União direta e rápida de coleções na memória"],["string.Concat(a, b)","Concatena duas strings sem nenhum delimitador entre elas"],["StringBuilder.AppendJoin(...)","Anexa itens delimitados diretamente em um buffer existente"],["LINQ string.Join com Where","Filtra e une elementos em uma só instrução expressiva"]], "string.Join é indispensável para produzir saídas formatadas em APIs, arquivos e interfaces.")
        ]
      },
      {
        id: "csharp-c06-u6-l4-fatiamento-avancado-memoryextensions",
        title: "Fatiamento avançado com MemoryExtensions e regex compiladas",
        subtitle: "Transformações de texto · Divisão e busca em Span sem alocações no heap",
        theory: "A classe System.MemoryExtensions expande strings e spans com métodos modernos como Split() e EnumerateLines() que operam sem nenhuma alocação de memória. Para buscas de padrões complexos, o C# 7+ e C# 11 trazem suporte a expressões regulares compiladas via source generator ([GeneratedRegex]) com máxima performance.",
        questions: [
          q("Qual é o benefício do método texto.AsSpan().EnumerateLines() em relação a texto.Split('\\n')?", "Itera linha por linha de arquivos gigantescos gerando zero alocações de novas strings no heap", ["Lê arquivos do disco mais rápido","Converte texto em binário"], "EnumerateLines retorna fatias ReadOnlySpan<char> reutilizando a memória original sem gerar lixo."),
          q("Como declarar uma expressão regular compilada com altíssima performance no C# 7+ / C# 11?", "Usando o atributo [GeneratedRegex(\"...\")] em um método parcial estático (Source Generator)", ["Usando new Regex() em todo método","Usando RegexOptions.None"], "Source Generators analisam a regex em tempo de build e geram código C# puro e ultrarrápido para a busca."),
          q("Qual método da classe Regex permite substituir padrões casados por um novo texto?", "Regex.Replace(texto, padrao, substituto)", ["Regex.Swap(...)","Regex.Change(...)","Regex.Update(...)"], "Regex.Replace localiza todas as ocorrências que casam com o padrão e aplica a substituição."),
          q("O que a classe MemoryExtensions viabiliza no ecossistema .NET moderno?", "Permite aplicar operações como Trim, IndexOf e Split sobre Spans sem alocar objetos no heap", ["Cria threads em segundo plano","Aumenta a memória virtual"], "Estende a API fluente tradicional de strings para o mundo de alto desempenho de Spans e Memory."),
          t("Qual atributo do C# 11 instrui o gerador de código a compilar a regex em tempo de compilação?", ["GeneratedRegex","[GeneratedRegex]"], "[GeneratedRegex] compila a regex durante o build.", "[____(@\"^\\d+$\")]\nprivate static partial Regex DigitosRegex();"),
          g("Complete o laço que percorre as linhas de um texto sem alocações usando MemoryExtensions.", ["EnumerateLines()"], "EnumerateLines itera sobre quebras de linha com Spans sem alocar strings.", "foreach (var linha in texto.AsSpan().____) { }"),
          o("Ordene as etapas para implementar busca com regex moderna no .NET.", ["Declarar método parcial estático decorado com [GeneratedRegex(padrao)]","Compilador Roslyn gera o código de máquina de estados C# durante o build","Invocar MeuRegex().IsMatch(texto) ou MeuRegex().Matches(texto)","Processar as correspondências com velocidade nativa sem custo de parsing em runtime"], "GeneratedRegex une a expressividade de expressões regulares à velocidade de código C# manual."),
          p("Associe a ferramenta textual avançada ao seu benefício.", [["[GeneratedRegex(\"...\")]","Regex compilada em tempo de build com source generator"],["span.EnumerateLines()","Iteração sobre quebras de linha com zero alocações"],["MemoryExtensions.Trim(span)","Sanitização de pontas operando em fatias de pilha"],["RegexOptions.Compiled legado","Compila regex com Reflection.Emit em runtime (mais lento no startup)"]], "Técnicas de alocação zero colocam o .NET na vanguarda do processamento de dados em tempo real.")
        ]
      },
      {
        id: "csharp-c06-u6-l5-interfaces-iparsable-ispanparsable",
        title: "Parsing genérico moderno com IParsable<T> e ISpanParsable<T>",
        subtitle: "Transformações de texto · Métodos estáticos virtuais em interfaces no C# 11+",
        theory: "O C# 11 introduziu membros virtuais estáticos em interfaces, viabilizando IParsable<TSelf> e ISpanParsable<TSelf>. Agora é possível escrever algoritmos genéricos que convertem texto em qualquer tipo (como T.Parse(string, provider)) de forma padronizada, eliminando código reflexivo e unificando o tratamento de tipos.",
        questions: [
          q("Qual recurso fundamental do C# 11 viabilizou a introdução da interface IParsable<T>?", "Static Abstract Members in Interfaces (membros abstratos e virtuais estáticos em interfaces)", ["Records relacionais","Tipos genéricos dinâmicos"], "Permite que interfaces exijam métodos estáticos como Parse e TryParse nas classes implementadoras."),
          q("Qual é a principal vantagem de ISpanParsable<T> em relação a IParsable<T>?", "Permite realizar o parsing diretamente a partir de um ReadOnlySpan<char> sem criar uma String intermediária", ["Converte texto em imagens","Funciona apenas com datas"], "ISpanParsable elimina a conversão obrigatória de fatias de memória em strings antes do parsing."),
          q("Como se declara um método genérico que recebe um texto e converte para qualquer tipo numérico compatível?", "T Converter<T>(string s) where T : IParsable<T> => T.Parse(s, null);", ["T Converter<T>(string s) => (T)s;","T Converter<T>(string s) where T : struct"], "A restrição where T : IParsable<T> habilita invocar o método estático T.Parse diretamente no tipo genérico."),
          q("Quais tipos fundamentais da BCL implementam IParsable e ISpanParsable no .NET 7+?", "Todos os tipos primitivos (int, double, decimal, bool, Guid, DateTime, DateOnly, etc.)", ["Apenas a classe String","Apenas tipos de coleções"], "Praticamente todos os tipos de valor e estruturados do .NET implementam esse contrato unificado."),
          t("Qual interface do .NET 7/C# 11 padroniza o parsing seguro a partir de ReadOnlySpan<char>?", ["ISpanParsable<T>","ISpanParsable"], "ISpanParsable padroniza o parsing de spans sem alocação.", "public T Processar<T>(ReadOnlySpan<char> s) where T : ____<T> { }"),
          g("Complete o método genérico invocando o método estático da interface IParsable.", ["T.Parse"], "O método estático da interface é invocado diretamente sobre o parâmetro de tipo T.", "return ____(texto, null);"),
          o("Ordene as etapas de um conversor universal de configurações com IParsable<T>.", ["Declarar método genérico com restrição where T : IParsable<T>","Receber a string de configuração do arquivo ou ambiente","Executar if (T.TryParse(valor, CultureInfo.InvariantCulture, out var resultado))","Retornar o resultado tipado ou lançar exceção explicativa se falhar"], "Static abstract members unificam o parsing de tipos no ecossistema .NET com elegância incomparável."),
          p("Associe a interface ao seu contrato de parsing no C# moderno.", [["IParsable<TSelf>","Contrato estático para Parse e TryParse a partir de string"],["ISpanParsable<TSelf>","Contrato estático para Parse e TryParse a partir de ReadOnlySpan<char>"],["IFormattable","Contrato de instância para conversão de objeto em string com formato"],["where T : IParsable<T>","Restrição genérica que autoriza invocar T.Parse(...)"]], "IParsable representa a maturidade do sistema de tipos do .NET unindo matemática e tipagem estática.")
        ]
      }
    ],
    7: [
      {
        id: "csharp-c06-u7-l1-busca-linear-vs-binaria-bcl",
        title: "Busca linear vs busca binária na biblioteca .NET",
        subtitle: "Busca em coleções · FindIndex vs BinarySearch e requisitos de ordenação",
        theory: "No .NET, a busca linear é fornecida por métodos como lista.Find(predicado) e lista.FindIndex(), percorrendo elementos em tempo O(n). Já a busca binária via lista.BinarySearch(chave) opera em tempo O(log n), exigindo estritamente que a coleção esteja previamente ordenada pelo mesmo critério.",
        questions: [
          q("Qual é o pré-requisito indispensável para que lista.BinarySearch() funcione corretamente?", "A lista deve estar previamente ordenada segundo o critério de comparação utilizado", ["A lista deve ter número ímpar de itens","A lista não pode conter valores nulos"], "Se a lista não estiver ordenada, a busca binária tomará caminhos errados e falhará silenciosamente."),
          q("Qual método de List<T> executa busca linear retornando o primeiro elemento que atende a um predicado?", "lista.Find(x => x.Ativo)", ["lista.Search(x => x.Ativo)","lista.Lookup(x => x.Ativo)"], "Find() avalia linearmente cada item até encontrar o primeiro que retorne true no predicado."),
          q("O que o método lista.BinarySearch(valor) devolve quando o item não é encontrado na lista?", "Um número negativo com o complemento bit a bit (~ponto) do índice de inserção correta", ["Sempre -1","Zero (0)","Lança exceção"], "O número negativo codifica o índice onde o valor deveria ser inserido para manter a lista ordenada (~idx)."),
          q("Como recuperar o ponto exato de inserção a partir do retorno negativo de BinarySearch?", "int pontoInsercao = ~retornoNegativo; (usando operador bitwise NOT ~)", ["int ponto = -retornoNegativo;","int ponto = retornoNegativo * -1;"], "O operador ~ inverte os bits, decodificando instantaneamente a posição de inserção correta."),
          t("Qual método de List<T> executa a busca logarítmica O(log n) em coleções ordenadas?", ["BinarySearch","BinarySearch()"], "BinarySearch é o método padrão de busca rápida.", "int idx = numeros.____(42);"),
          g("Complete o decodificador recuperando o índice de inserção com o operador bitwise NOT (~).", ["~indice"], "O operador ~ decodifica o ponto de inserção do retorno negativo.", "if (indice < 0) { int ponto = ____; }"),
          o("Ordene as etapas da busca binária na biblioteca do .NET.", ["Garantir que a lista foi ordenada previamente com lista.Sort()","Executar int res = lista.BinarySearch(alvo)","Se res >= 0, consumir o elemento localizado no índice res","Se res < 0, calcular ~res para descobrir a posição de inserção ordenada"], "A codificação por complemento bit a bit economiza métodos adicionais na API de coleções."),
          p("Associe o método de busca à sua complexidade temporal no pior caso.", [["lista.Find(predicado)","O(n) linear: examina todos os itens sequencialmente"],["lista.BinarySearch(chave)","O(log n) logarítmico: divide o intervalo pela metade a cada passo"],["lista.Contains(item)","O(n) linear em List<T>; O(1) em HashSet<T>"],["~resultadoNegativo","O(1) cálculo do ponto exato de inserção ordenada"]], "Escolher entre busca linear flexível e binária ultraveloz depende da frequência de ordenação.")
        ]
      },
      {
        id: "csharp-c06-u7-l2-hashset-e-conjuntos-matematicos",
        title: "A classe HashSet<T> e operações de conjuntos matemáticos",
        subtitle: "Busca em coleções · Buscas em O(1), unicidade e operações com UnionWith e IntersectWith",
        theory: "A classe System.Collections.Generic.HashSet<T> é uma coleção não indexada baseada em tabela hash que armazena elementos estritamente únicos. Operações de verificação com Contains(x) executam em tempo constante O(1). Além disso, ela implementa a interface ISet<T> com operações como UnionWith e IntersectWith.",
        questions: [
          q("Qual é a complexidade temporal média da operação conjunto.Contains(item) em um HashSet<T>?", "O(1) - tempo constante independente da quantidade de elementos", ["O(n) linear","O(log n)","O(n²)"], "O cálculo de hash posiciona a verificação diretamente no bucket correto da tabela."),
          q("O que acontece se tentarmos adicionar um elemento duplicado em um HashSet<T> com Add(item)?", "O método Add retorna false e o elemento não é inserido, garantindo a unicidade", ["Lança exceção DuplicateKeyException","Substitui o elemento antigo"], "Add devolve true se o item foi inserido e false se ele já existia, sem lançar exceções."),
          q("Qual método de HashSet<T> modifica o conjunto para reter apenas os elementos presentes em ambos os conjuntos?", "conjuntoA.IntersectWith(conjuntoB);", ["conjuntoA.UnionWith(conjuntoB);","conjuntoA.ExceptWith(conjuntoB);"], "IntersectWith executa a intersecção matemática, mantendo exclusivamente os itens compartilhados."),
          q("Qual método remove de um conjunto todos os elementos presentes em outro conjunto (diferença)?", "conjuntoA.ExceptWith(conjuntoB);", ["conjuntoA.Subtract(conjuntoB);","conjuntoA.Difference(conjuntoB);"], "ExceptWith realiza a subtração de conjuntos (A - B), removendo os elementos concorrentes."),
          t("Qual classe genérica do .NET implementa conjuntos com busca em tempo O(1) constante?", ["HashSet<T>","HashSet"], "HashSet<T> fornece a tabela hash para conjuntos.", "var unicos = new ____<string>();"),
          g("Complete a instrução aplicando a união matemática dos dois conjuntos de dados.", ["UnionWith"], "UnionWith anexa elementos únicos de outra coleção ao conjunto.", "conjuntoA.____(conjuntoB);"),
          o("Ordene as operações de eliminação de duplicatas de uma lista grande usando HashSet.", ["Receber uma lista com 100.000 itens potencialmente repetidos","Instanciar var unicos = new HashSet<int>(listaOriginal)","Consultar itens instantaneamente em tempo O(1) com unicos.Contains(x)","Se necessário, converter de volta para lista com unicos.ToList()"], "O uso de tabelas hash para deduplicação reduz o tempo de minutos para milissegundos."),
          p("Associe a operação matemática ao método de HashSet<T>.", [["conjuntoA.UnionWith(B)","União matemática (A ∪ B): combina todos os itens únicos"],["conjuntoA.IntersectWith(B)","Intersecção (A ∩ B): retém apenas os itens em comum"],["conjuntoA.ExceptWith(B)","Diferença (A - B): remove itens presentes em B"],["conjuntoA.SymmetricExceptWith(B)","Diferença simétrica: retém itens que estão em A ou B, mas não em ambos"]], "HashSet<T> é a estrutura perfeita para filtragens de unicidade e operações de teoria dos conjuntos.")
        ]
      },
      {
        id: "csharp-c06-u7-l3-dictionary-e-padrao-trygetvalue",
        title: "Dicionários Dictionary<TKey, TValue> e o padrão TryGetValue",
        subtitle: "Busca em coleções · Mapeamentos chave-valor ultrarrápidos e prevenção de KeyNotFoundException",
        theory: "A classe Dictionary<TKey, TValue> mapeia chaves únicas para valores através de uma tabela hash interna, proporcionando buscas O(1). Acessar diretamente mapa[chave] quando a chave inexiste lança KeyNotFoundException; por isso, o padrão seguro canônico utiliza TryGetValue(chave, out var valor).",
        questions: [
          q("O que acontece se tentarmos ler mapa[\"inexistente\"] em um Dictionary comum em C#?", "Lança System.Collections.Generic.KeyNotFoundException", ["Retorna null silenciosamente","Retorna zero"], "O indexador de leitura exige a presença da chave; consultar chaves ausentes dispara exceção imediata."),
          q("Qual método da classe Dictionary permite verificar e recuperar o valor associado de forma segura em uma só operação?", "mapa.TryGetValue(chave, out var valor)", ["mapa.ContainsKey(chave)","mapa.GetOrDefault(chave)"], "TryGetValue realiza o cálculo de hash uma única vez, unindo teste de existência e recuperação de dados."),
          q("Por que if (mapa.ContainsKey(k)) { var v = mapa[k]; } é considerado uma má prática de desempenho?", "Porque realiza o cálculo de hash e a busca interna duas vezes consecutivas desnecessariamente", ["Porque pode travar o dicionário","Porque não compila no C# 10"], "Usar ContainsKey seguido do indexador dobra o custo computacional; TryGetValue faz tudo em uma passagem."),
          q("Qual é o comportamento do indexador de escrita mapa[chave] = novoValor; caso a chave já exista?", "Atualiza o valor antigo com o novo valor (upsert)", ["Lança exceção de chave duplicada","Ignora a atribuição"], "O indexador de atribuição cria a chave se inexistente ou atualiza seu valor se já estiver presente."),
          t("Qual método de Dictionary realiza busca e extração de valor em uma única operação sem exceções?", ["TryGetValue","TryGetValue()"], "TryGetValue é o padrão de consulta segura em dicionários.", "if (tabela.____(codigo, out var desc)) { }"),
          g("Complete a busca segura no dicionário utilizando o padrão out var.", ["TryGetValue(id, out var usuario)"], "TryGetValue combina teste de presença e extração do valor.", "if (usuarios.____) { return usuario; }"),
          o("Ordene as etapas da consulta canônica com TryGetValue em um dicionário.", ["Receber a chave de pesquisa fornecida pelo chamador","Executar if (dicionario.TryGetValue(chave, out var entidade))","No bloco if, consumir diretamente a variável entidade recuperada","No bloco else, tratar a ausência da chave sem o custo de exceções"], "TryGetValue é um dos pilares de escrita de código resiliente e veloz no ecossistema .NET."),
          p("Associe a operação de Dictionary<TKey, TValue> ao seu comportamento.", [["mapa.Add(k, v)","Insere o par chave-valor; lança ArgumentException se chave já existir"],["mapa[k] = v;","Insere ou atualiza o valor da chave sem exceções de duplicata"],["mapa.TryGetValue(k, out var v)","Busca segura em tempo O(1) com zero exceções"],["mapa[k] de leitura","Lê o valor; lança KeyNotFoundException se a chave não existir"]], "Dictionary<TKey, TValue> é a estrutura primordial para indexação e consultas em memória.")
        ]
      },
      {
        id: "csharp-c06-u7-l4-iequalitycomparer-customizado",
        title: "Comparadores customizados com IEqualityComparer<T>",
        subtitle: "Busca em coleções · Definindo regras de igualdade e GetHashCode para HashSet e Dictionary",
        theory: "Tanto HashSet<T> quanto Dictionary<TKey, TValue> aceitam uma implementação de IEqualityComparer<T> em seus construtores. Isso permite configurar critérios customizados de busca, como dicionários com chaves de strings insensíveis a maiúsculas (StringComparer.OrdinalIgnoreCase) ou comparação personalizada de entidades.",
        questions: [
          q("Quais dois métodos compõem a interface genérica IEqualityComparer<T> em C#?", "bool Equals(T x, T y) e int GetHashCode(T obj)", ["bool Compare(T x, T y)","void Hash(T obj)"], "A tabela hash depende de GetHashCode para eleger o bucket e de Equals para desambiguar colisões."),
          q("Qual é a regra matemática de ouro mandatória entre Equals e GetHashCode?", "Se Equals(a, b) retornar true, GetHashCode(a) e GetHashCode(b) devem obrigatoriamente produzir o mesmo número", ["Ambos devem retornar números positivos","GetHashCode deve retornar zero"], "Violar essa regra quebra a tabela hash: o objeto é colocado em um bucket e procurado em outro, sumindo."),
          q("Como criar um Dictionary<string, int> cujas chaves ignorem diferenças entre maiúsculas e minúsculas?", "new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)", ["new Dictionary<string, int>() { IgnoreCase = true }","new DictionaryIgnoreCase<string, int>()"], "Passar StringComparer.OrdinalIgnoreCase no construtor configura a tabela para comparar chaves sem distinção de caixa."),
          q("O que acontece se dois objetos diferentes produzirem o mesmo valor de GetHashCode?", "Ocorre uma colisão de hash normal; a tabela desambigua invocando Equals()", ["O programa encerra com erro fatal","O primeiro objeto é excluído"], "Colisões são matematicamente inevitáveis; o contrato exige apenas que iguais tenham hashes iguais."),
          t("Qual classe estática provê comparadores prontos como OrdinalIgnoreCase para coleções?", ["StringComparer"], "StringComparer implementa IEqualityComparer<string> com regras prontas.", "var mapa = new Dictionary<string, int>(____.OrdinalIgnoreCase);"),
          g("Complete o construtor do HashSet garantindo comparação insensível a maiúsculas.", ["StringComparer.OrdinalIgnoreCase"], "O comparador de igualdade é injetado no construtor.", "var emails = new HashSet<string>(____);"),
          o("Ordene as etapas da consulta em um HashSet com comparador customizado.", ["Calcular o código de dispersão com comparador.GetHashCode(item)","Localizar o bucket correspondente na tabela hash interna","Percorrer as entradas daquele bucket invocando comparador.Equals(item, existente)","Se encontrar correspondência, confirmar a presença do elemento"], "A separação rigorosa de papéis entre hash e igualdade viabiliza a velocidade O(1)."),
          p("Associe o membro de StringComparer à regra de correspondência.", [["StringComparer.Ordinal","Diferencia maiúsculas e minúsculas com base nos bytes Unicode"],["StringComparer.OrdinalIgnoreCase","Ignora maiúsculas e minúsculas com base na tabela ordinal"],["StringComparer.CurrentCulture","Aplica regras culturais linguísticas do sistema local"],["StringComparer.InvariantCulture","Aplica regras culturais universais estáveis"]], "Injetar comparadores adequados desacopla as coleções de formatações acidentais de strings.")
        ]
      },
      {
        id: "csharp-c06-u7-l5-colecoes-imutaveis-system-collections-immutable",
        title: "Coleções estritamente imutáveis do System.Collections.Immutable",
        subtitle: "Busca em coleções · ImmutableArray e ImmutableList para concorrência sem travas",
        theory: "O pacote oficial System.Collections.Immutable fornece coleções verdadeiramente imutáveis, como ImmutableArray<T> e ImmutableList<T>. Ao invocar métodos como Add() ou Remove(), a coleção original permanece inalterada e uma nova instância imutável compartilhando nós é retornada, garantindo thread-safety total.",
        questions: [
          q("O que acontece quando executamos var b = a.Add(10); em uma ImmutableList<int> a?", "A lista original a permanece rigorosamente inalterada; b aponta para uma nova lista contendo o novo item", ["A lista a é modificada in-place","Ocorre erro de compilação CS002"], "Operações em coleções imutáveis produzem novas instâncias, preservando a versão anterior intacta."),
          q("Qual é a diferença de desempenho entre ImmutableArray<T> e ImmutableList<T>?", "ImmutableArray é uma struct leve sobre array comum; ImmutableList é uma árvore AVL balanceada", ["ImmutableArray é mais lenta","ImmutableList não suporta LINQ"], "ImmutableArray tem overhead zero para leitura indexada; ImmutableList é otimizada para adições eficientes em árvore."),
          q("Por que coleções imutáveis são ideais para arquiteturas concorrentes multithreading?", "Permitem que múltiplas threads leiam e compartilhem os dados simultaneamente sem nenhuma trava de lock", ["Porque executam em GPU","Porque desativam exceções"], "Sem mutação de estado, condições de corrida (race conditions) são matematicamente impossíveis."),
          q("Como construir uma ImmutableArray de forma eficiente a partir de muitos elementos sem gerar instâncias intermediárias?", "Utilizando um construtor auxiliar com CreateBuilder() e chamando ToImmutable() ao final", ["Usando múltiplos laços for","Usando reflection"], "O Builder permite acumulação mutável local rápida antes de congelar a estrutura definitivamente."),
          t("Qual struct do namespace System.Collections.Immutable encapsula arrays imutáveis leves?", ["ImmutableArray<T>","ImmutableArray"], "ImmutableArray<T> fornece a struct leve para arrays imutáveis.", "public ____<int> Numeros { get; init; }"),
          g("Complete a instrução congelando o builder na estrutura imutável definitiva.", ["ToImmutable()"], "ToImmutable finaliza a construção da coleção imutável.", "ImmutableArray<int> resultado = builder.____;"),
          o("Ordene a construção de uma coleção imutável de alta performance com Builder.", ["Instanciar o construtor temporário var builder = ImmutableArray.CreateBuilder<int>()","Popular o builder eficientemente com laços e builder.Add(item)","Invocar builder.ToImmutable() para gerar a instância imutável definitiva","Compartilhar a coleção imutável gerada entre múltiplas threads concorrentes"], "O padrão Builder une a performance de construção mutável à segurança imutável de leitura."),
          p("Associe a coleção imutável ao seu formato estrutural.", [["ImmutableArray<T>","Struct leve envelopando array nativo: leitura indexada O(1)"],["ImmutableList<T>","Estrutura em árvore AVL balanceada: inserções O(log n)"],["ImmutableDictionary<K, V>","Mapa hash imutável seguro para concorrência"],["ImmutableHashSet<T>","Conjunto imutável com garantia de unicidade sem locks"]], "Coleções imutáveis são a chave para sistemas distribuídos e paralelos sem deadlocks.")
        ]
      }
    ],
    8: [
      {
        id: "csharp-c06-u8-l1-introducao-records-csharp9",
        title: "Modelagem declarativa de dados com Records no C# 9+",
        subtitle: "Modelagem de registros · Portadores de dados concisos, imutáveis e sem boilerplate",
        theory: "Introduzidos no C# 9, os Records são tipos projetados para atuar como portadores transparentes de dados. Com a sintaxe concisa public record Pessoa(string Nome, int Idade);, o compilador gera automaticamente propriedades, construtor, deconstruct, equals, hashCode e formatação toString.",
        questions: [
          q("Qual é a principal motivação para utilizar a declaração record em vez de uma class tradicional?", "Elimina o boilerplate gerando automaticamente propriedades imutáveis, igualdade por valor e formatação textual", ["Permite que a classe rode em modo kernel","Remove o Garbage Collector"], "Records concentram em uma só linha o que antes exigia dezenas de linhas de construtores, getters e métodos equals."),
          q("Qual declaração em C# 9+ cria um registro imutável com propriedades Nome e Idade em uma linha?", "public record Pessoa(string Nome, int Idade);", ["public class Pessoa[string Nome, int Idade];","record struct Pessoa { Nome, Idade }"], "A sintaxe de registro com parâmetros posicionais no cabeçalho é a forma canônica de declaração de Records."),
          q("Por padrão, um record declarado como public record Aluno(...) é uma classe ou uma struct?", "É uma classe (record class), sendo alocado na memória heap como tipo de referência", ["É uma struct alocada na pilha","É uma interface"], "A palavra record isolada é sinônimo de record class; a partir do C# 10, pode-se declarar explicitamente record struct."),
          q("Como os métodos de acesso das propriedades geradas pelo construtor primário do record são configurados?", "Como propriedades { get; init; }, garantindo imutabilidade após a instanciação", ["Como variáveis públicas { get; set; } mutáveis","Como campos privados"], "O acessor init garante que as propriedades só possam receber valores durante o processo de construção."),
          t("Qual palavra-chave do C# 9 declara tipos focados em modelagem declarativa e transparente de dados?", ["record"], "record declara registros orientados a dados.", "public ____ Produto(int Id, string Descricao, decimal Preco);"),
          g("Complete a declaração do record para criar um ponto com coordenadas X e Y.", ["record"], "record gera toda a infraestrutura de dados de forma concisa.", "public ____ Ponto(int X, int Y);"),
          o("Ordene os membros que o compilador Roslyn gera automaticamente para public record Item(int Id, string Nome);.", ["Propriedades públicas imutáveis Id e Nome com acessores get; init;","Construtor público recebendo os parâmetros posicionais na ordem declarada","Método Deconstruct para desconstruir em tuplas var (id, nome) = item","Sobrescritas de Equals, GetHashCode e ToString() formatado com nomes de campos"], "A automação de boilerplate é um dos maiores ganhos de produtividade do C# moderno."),
          p("Associe a modalidade de registro à sua categoria CTS.", [["public record Pessoa(...)","record class tradicional: tipo de referência no heap"],["public record struct Ponto(...)","record struct (C# 10): tipo de valor alocado na pilha"],["public readonly record struct Vetor(...)","record struct estritamente imutável na pilha"],["class tradicional","Exige escrita manual de Equals, GetHashCode e ToString"]], "Records modernizam a modelagem de entidades de domínio e DTOs no ecossistema .NET.")
        ]
      },
      {
        id: "csharp-c06-u8-l2-igualdade-por-valor-em-records",
        title: "Igualdade estrutural por valor (Value Equality) em Records",
        subtitle: "Modelagem de registros · Comparando o conteúdo dos dados e não o endereço de memória",
        theory: "Diferente de classes tradicionais, Records implementam igualdade estrutural por valor (value equality). Duas instâncias distintas de um record no heap são consideradas perfeitamente iguais com == e Equals() se todos os seus campos correspondentes tiverem valores rigorosamente idênticos.",
        questions: [
          q("Se criarmos p1 = new Ponto(1, 2) e p2 = new Ponto(1, 2) usando um record, qual é o resultado de p1 == p2?", "true, pois records comparam a igualdade estrutural de todos os seus campos e propriedades", ["false, pois residem em endereços de memória diferentes","Erro de compilação"], "Records sobrescrevem os operadores == e != e o método Equals() para comparar valor e não ponteiro."),
          q("Se Ponto fosse uma class tradicional comum sem sobrescritas, qual seria o resultado de p1 == p2?", "false, pois classes comuns comparam a identidade da referência de memória por padrão", ["true","Lança exceção"], "Em classes comuns, == compara se ambas as variáveis apontam para o mesmo objeto no heap."),
          q("Como o método GetHashCode() gerado pelo compilador para um record se comporta?", "Combina deterministicamente os códigos hash de todos os campos constitutivos do record", ["Retorna sempre zero","Retorna o endereço de memória"], "Garante que instâncias com dados idênticos produzam hashes iguais, viabilizando o uso correto em HashSets e Dictionaries."),
          q("O que acontece se um record contiver uma coleção como List<int> em um de seus campos?", "A igualdade da lista será avaliada por referência (a menos que a coleção seja customizada)", ["A lista é comparada elemento por elemento","O record não compila"], "O compilador gera Equals chamando EqualityComparer.Default em cada membro; para coleções, use ImmutableArray."),
          t("Qual conceito computacional dita que dois objetos são iguais se seus dados internos forem idênticos?", ["igualdade por valor","value equality"], "Value equality compara conteúdo e não endereço de ponteiro.", "Records adotam o modelo de ____."),
          g("Complete a validação confirmando que ambos os registros possuem o mesmo conteúdo.", ["p1 == p2","p1.Equals(p2)"], "O operador == em records avalia igualdade estrutural por valor.", "bool identicos = ____;"),
          o("Ordene a verificação que o método Equals de um record realiza internamente.", ["Verifica se as variáveis apontam para o mesmo endereço de memória (this == outro)","Verifica se ambos os objetos possuem exatamente o mesmo tipo em tempo de execução","Compara cada propriedade e campo correspondente usando seus comparadores padrão","Retorna true apenas se todos os pares de membros forem rigorosamente iguais"], "A análise membro a membro confere consistência e segurança na comparação de dados."),
          p("Associe a comparação ao resultado com r1 = new R(10) e r2 = new R(10).", [["r1 == r2 em record class","true (igualdade por valor em todos os campos)"],["r1 == r2 em class comum","false (identidade de memória: objetos distintos no heap)"],["ReferenceEquals(r1, r2)","false (endereços físicos continuam sendo diferentes no heap)"],["r1.GetHashCode() == r2.GetHashCode()","true (hashes idênticos para dados idênticos)"]], "A igualdade por valor nativa de Records simplifica testes unitários e validações de regras de negócio.")
        ]
      },
      {
        id: "csharp-c06-u8-l3-mutacao-nao-destrutiva-with",
        title: "Mutação não destrutiva com a expressão with",
        subtitle: "Modelagem de registros · Clonando registros com alterações pontuais no C# 9+",
        theory: "A imutabilidade de records previne alterações acidentais de estado. Para modificar dados de forma funcional e segura, o C# 9 introduziu a expressão with para mutação não destrutiva: ela clona o registro existente e aplica modificações pontuais nas propriedades especificadas, mantendo o objeto original intacto.",
        questions: [
          q("Como alterar o preço de um registro imutável Produto sem modificar o objeto original?", "var atualizado = original with { Preco = 150m };", ["original.Preco = 150m;","var atualizado = original.Mutate(150m);"], "A expressão with clona a instância aplicando as novas atribuições nos membros indicados."),
          q("O que acontece com o registro original após a execução de var p2 = p1 with { Idade = 30 };?", "O registro p1 permanece 100% inalterado com seus dados originais", ["O registro p1 é atualizado para 30","O registro p1 é destruído"], "A mutação não destrutiva gera um novo objeto independente, preservando o estado histórico do original."),
          q("É permitido alterar múltiplas propriedades simultaneamente dentro de uma única expressão with?", "Sim, basta separar as atribuições de propriedades por vírgula: p with { Nome = \"Ana\", Idade = 25 }", ["Não, apenas uma propriedade por vez","Apenas até duas propriedades"], "A sintaxe aceita qualquer quantidade de membros entre as chaves da expressão with."),
          q("Qual método especial do compilador a expressão with invoca nos bastidores para clonar a instância?", "Um construtor de cópia protegido (clone method) gerado pelo compilador", ["O método MemberwiseClone protegido","O método ICloneable.Clone()"], "O compilador sintetiza um construtor de cópia que duplica todos os campos de forma nativa e eficiente."),
          t("Qual palavra-chave do C# 9 viabiliza a mutação não destrutiva de records?", ["with"], "with clona e atualiza propriedades em um novo objeto.", "var novo = anterior ____ { Status = \"Concluido\" };"),
          g("Complete a clonagem não destrutiva alterando apenas o status da conta para Ativa.", ["with { Ativa = true }"], "A expressão with especifica as propriedades a serem modificadas no clone.", "var contaAtualizada = contaOriginal ____;"),
          o("Ordene as etapas executadas pelo runtime na expressão var b = a with { X = 99 }.", ["Invocação do construtor de cópia interno gerado pelo compilador","Alocação de uma nova instância idêntica ao objeto a no heap","Aplicação da nova atribuição no campo X da nova instância","Retorno da nova referência atualizada para a variável b"], "A clonagem rasa seguida de substituição pontual garante integridade imutável."),
          p("Associe o estilo de mutação ao paradigma de programação.", [["a.Status = \"Pago\";","Mutação destrutiva in-place (paradigma imperativo clássico)"],["var b = a with { Status = \"Pago\" };","Mutação não destrutiva funcional (preserva o original)"],["Construtor de cópia de record","Mecanismo interno que viabiliza a clonagem da expressão with"],["Propriedades { get; init; }","Impedem atribuições diretas fora da inicialização ou with"]], "A expressão with promove arquiteturas orientadas a eventos e rastreamento de estados históricos.")
        ]
      },
      {
        id: "csharp-c06-u8-l4-desconstrucao-e-pattern-matching-records",
        title: "Desconstrução e pattern matching com Records",
        subtitle: "Modelagem de registros · Extraindo componentes e avaliando padrões posicionais e de propriedades",
        theory: "Records declarados com construtor primário geram automaticamente um método Deconstruct(), permitindo desconstruí-los diretamente em variáveis locais var (nome, idade) = pessoa;. Além disso, integram-se perfeitamente aos recursos de Property Patterns e Positional Patterns em switch expressions do C#.",
        questions: [
          q("Como desconstruir um registro Aluno(string Nome, double Nota) diretamente em variáveis locais?", "var (nome, nota) = aluno;", ["var aluno.Deconstruct(nome, nota);","var [nome, nota] = aluno;"], "O compilador invoca o método Deconstruct() gerado automaticamente, populando as variáveis posicionais."),
          q("Como avaliar as propriedades de um record com Property Pattern dentro de um switch expression?", "pessoa switch { { Idade: >= 18 } => \"Maior\", _ => \"Menor\" }", ["pessoa switch { Idade >= 18 => \"Maior\" }","switch (pessoa.Idade)"], "Property Patterns utilizam chaves com pares propriedade: valor ou condição relacional."),
          q("Como avaliar um record com Positional Pattern aproveitando a ordem dos parâmetros primários?", "ponto switch { (0, 0) => \"Origem\", (var x, 0) => $\"Eixo X em {x}\", _ => \"Plano\" }", ["ponto switch { [0, 0] => \"Origem\" }","ponto switch { Point(0, 0) }"], "Positional Patterns usam parênteses com os valores na ordem exata do construtor primário do record."),
          q("O que acontece se utilizarmos o símbolo de descarte _ em uma desconstrução de record (ex: var (nome, _) = aluno;)?", "O segundo valor é ignorado sem alocar nenhuma variável local para ele", ["Lança exceção de argumento ignorado","O valor é salvo como nulo"], "O caractere de descarte (discard) _ sinaliza ao compilador que aquele componente não é de interesse."),
          t("Qual método gerado automaticamente pelo compilador habilita a desconstrução posicional de Records?", ["Deconstruct"], "Deconstruct descompacta os campos em variáveis individuais.", "public void ____(out string nome, out int idade) { }"),
          g("Complete o pattern matching de propriedade para casar clientes premium com compras acima de 1000.", ["{ Categoria: \"Premium\", TotalCompras: > 1000 }"], "As chaves delimitam a correspondência de propriedades do registro.", "if (cliente is ____) { AplicarDescontoVIP(); }"),
          o("Ordene as etapas da correspondência de padrões posicionais sobre um registro Coordenada(int X, int Y).", ["Switch expression recebe a instância de Coordenada","Avalia o padrão posicional de caso base (0, 0) => \"Origem\"","Avalia padrões parciais com descarte (var x, 0) => $\"No eixo horizontal em {x}\"","Cai na cláusula padrão de descarte universal _ => \"Outro ponto\""], "Pattern matching posicional transforma rotinas de decisão em tabelas de decisão declarativas."),
          p("Associe a sintaxe de pattern matching ao seu tipo.", [["var (nome, idade) = pessoa;","Desconstrução posicional direta em variáveis locais"],["aluno is { Nota: >= 7.0 }","Property pattern inspecionando uma propriedade específica"],["ponto is (0, 0)","Positional pattern avaliando coordenadas exatas"],["var (nome, _) = pessoa;","Desconstrução com descarte de campos não utilizados"]], "A sintonia entre Records e pattern matching torna o C# uma das linguagens mais expressivas para regras de negócio.")
        ]
      },
      {
        id: "csharp-c06-u8-l5-pipelines-de-registros-e-dto",
        title: "Pipelines corporativos com Records, DTOs e imutabilidade",
        subtitle: "Modelagem de registros · Do transporte na camada de rede à persistência com integridade",
        theory: "A união de arrays, strings, coleções e records culmina na arquitetura de pipelines de domínio. Records funcionam como DTOs e mensagens imutáveis entre camadas, enquanto coleções somente leitura (IReadOnlyList<T>) e o serializador System.Text.Json blindam o sistema contra efeitos colaterais.",
        questions: [
          q("Por que Records tornaram-se o padrão incontestável para implementação de DTOs em APIs ASP.NET Core?", "São imutáveis por padrão, serializam e desserializam perfeitamente com System.Text.Json e são declarados em uma linha", ["Substituem os bancos de dados relacionais","Não precisam de tipagem estática"], "Records eliminam código inútil de DTOs mantendo fidelidade total aos contratos da API JSON."),
          q("Qual é a recomendação ao expor coleções dentro de um record de domínio?", "Usar tipos imutáveis como IReadOnlyList<T> ou ImmutableArray<T> em vez de List<T>", ["Usar arrays estáticos com tamanho 100","Usar ArrayList não tipada"], "Listas mutáveis dentro de records quebram a garantia de imutabilidade profunda da estrutura."),
          q("Como o serializador moderno System.Text.Json trata Records com construtores primários?", "Mapeia as propriedades do JSON diretamente para os parâmetros do construtor primário na desserialização", ["Exige construtor sem parâmetros obrigatório","Falha a compilação"], "System.Text.Json foi projetado com suporte nativo de primeira classe para Records posicionais imutáveis."),
          q("Qual é o benefício de utilizar Records como mensagens em mensageria e eventos (ex: RabbitMQ/Kafka)?", "Mensagens de eventos representam fatos que já aconteceram no passado; logo, devem ser imutáveis e auditáveis", ["Mensagens rodam mais rápido na rede","Records ocupam metade dos bytes no TCP"], "Eventos de domínio são imutáveis por definição conceitual; records capturam essa semântica perfeitamente."),
          t("Qual biblioteca de serialização nativa de alta performance do .NET possui suporte nativo a Records?", ["System.Text.Json"], "System.Text.Json é a biblioteca padrão e veloz de serialização.", "using System.____;"),
          g("Complete o contrato da API declarando o DTO de requisição como um record conciso.", ["public record"], "public record define o DTO em uma linha.", "____ CriarUsuarioDto(string Email, string Senha);"),
          o("Ordene as etapas de um pipeline corporativo desde a requisição até o processamento com Records.", ["API recebe o payload JSON e desserializa em um record DTO imutável","Camada de serviço valida precondições com regras declarativas","Mapeia o DTO para o modelo de domínio aplicando regras de negócio","Persiste os dados e retorna um novo record de resposta com status de sucesso"], "Pipelines estruturados sobre tipos imutáveis eliminam dezenas de classes de bugs concorrentes."),
          p("Associe o componente ao seu papel arquitetural no .NET.", [["record Dto(...)","Contrato transparente e imutável para transporte de rede (JSON)"],["IReadOnlyList<T> na propriedade","Impede que clientes externos modifiquem a coleção interna"],["with { Status = \"Ativo\" }","Evolução de estado funcional e segura"],["System.Text.Json","Serialização de alta velocidade com zero alocações intermediárias"]], "Modelar sistemas com Records, Spans e coleções modernas consolida a maestria em engenharia de software C#.")
        ]
      }
    ]
  });
})();
