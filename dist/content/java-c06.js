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

  const lang = "java";
  const chId = "java-c06";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "java-c06-u1-l3-instanciacao-e-tamanho-fixo",
        title: "Instanciação e dimensão fixa de arrays",
        subtitle: "Arrays · Alocação no heap, operador new e imutabilidade de tamanho",
        theory: "Em Java, arrays são objetos alocados na memória heap com dimensão fixa e imutável definida na criação. Ao declarar int[] numeros = new int[5];, a JVM reserva espaço contíguo para cinco inteiros. A propriedade length informa o tamanho total do array, não sendo possível expandi-lo ou reduzi-lo após a alocação.",
        questions: [
          q("Qual é o comportamento do tamanho de um array em Java após sua criação com new?", "O tamanho é estritamente fixo e imutável durante toda a existência do array", ["O tamanho dobra automaticamente ao atingir o limite","Pode ser alterado reatribuindo a propriedade length"], "Arrays em Java possuem tamanho fixo determinado no momento da instanciação no heap."),
          q("Como se obtém a quantidade total de posições disponíveis em um array arr?", "arr.length (propriedade pública final sem parênteses)", ["arr.length()","arr.size()","arr.count"], "Em arrays, length é um atributo público final; em Strings, length() é um método com parênteses."),
          q("O que acontece se tentarmos executar arr.length = 10; em tempo de execução?", "Erro de compilação, pois length é um campo final de leitura exclusiva", ["O array é redimensionado para 10 posições","A JVM lança IllegalArgumentException"], "A propriedade length é constante e não pode receber atribuições."),
          q("Qual estrutura da biblioteca padrão deve ser usada quando o número de elementos varia dinamicamente?", "java.util.ArrayList", ["int[] tradicional","java.lang.String","char[]"], "ArrayList encapsula um array interno e gerencia redimensionamentos automáticos."),
          t("Qual atributo público informa a dimensão total de um array em Java?", ["length"], "length sem parênteses armazena a dimensão do array.", "int tamanho = dados.____;"),
          g("Complete a alocação instanciando um array de 10 elementos inteiros no heap.", ["new int[10]"], "new int[10] reserva o espaço contíguo na memória.", "int[] notas = ____;"),
          o("Ordene as etapas para alocar e inspecionar a dimensão de um array em Java.", ["Declarar a variável de referência com colchetes","Alocar a memória no heap com o operador new e o tamanho","Atribuir a referência do objeto à variável local","Ler o atributo length para confirmar a capacidade"], "A criação de arrays combina declaração de referência e alocação contígua no heap."),
          p("Associe a estrutura à forma de obter sua quantidade de elementos.", [["Array nativo (ex: int[])","propriedade .length sem parênteses"],["String de texto","método .length() com parênteses"],["Coleção List ou Set","método .size() para itens de coleções"],["Mapa Map<K, V>","método .size() para pares de entradas"]], "Diferenciar length, length() e size() previne erros de compilação cotidianos.")
        ]
      },
      {
        id: "java-c06-u1-l4-valores-padrao-inicializacao",
        title: "Valores padrão e inicializadores literais",
        subtitle: "Arrays · Valores default da JVM e sintaxe compacta com chaves",
        theory: "Quando um array é instanciado sem dados explícitos, a JVM inicializa automaticamente cada posição com o valor padrão do tipo: 0 para inteiros, 0.0 para decimais, false para booleanos e null para tipos de referência. Alternativamente, pode-se usar literais com chaves {1, 2, 3} para inicialização direta.",
        questions: [
          q("Qual é o valor padrão de cada elemento ao instanciar boolean[] flags = new boolean[3]?", "false", ["true","null","0"], "Tipos primitivos booleanos recebem false por padrão em qualquer array recém-criado."),
          q("Qual é o valor inicial das posições de um array de objetos String[] nomes = new String[4]?", "null em todas as posições", ["String vazia \"\"","\"null\"","Espaço em branco \" \""], "Arrays de referências a objetos inicializam suas posições com null até que instâncias sejam atribuídas."),
          q("Qual sintaxe inicializa um array de inteiros com valores literais em uma única instrução?", "int[] valores = { 10, 20, 30 };", ["int[] valores = [10, 20, 30];","int[] valores = new int(10, 20, 30);","int valores[] = (10, 20, 30);"], "A sintaxe com chaves { ... } permite declarar e popular o array concisamente."),
          q("Qual é o valor padrão de posições em um array de double recém-alocado?", "0.0", ["null","NaN","1.0"], "Tipos numéricos de ponto flutuante recebem zero com casa decimal (0.0)."),
          t("Qual valor padrão a JVM atribui a posições de arrays de objetos antes de qualquer atribuição?", ["null"], "null representa ausência de referência inicial.", "String s = nomes[0]; // valor default ____"),
          g("Complete o literal inicializando o array com os números 1, 2 e 3.", ["{ 1, 2, 3 }","{1, 2, 3}","{1,2,3}"], "Chaves delimitam literais de inicialização de array.", "int[] primos = ____;"),
          o("Ordene os estados de um elemento no array desde a instanciação até o uso.", ["JVM aloca bloco de memória contíguo no heap","Preenche cada posição com o valor padrão do tipo (ex: 0)","Programa atribui um valor concreto à posição via índice","Instruções subsequentes leem o dado atualizado"], "A inicialização padrão garante que posições nunca contenham lixo de memória."),
          p("Associe o tipo de dado do array ao seu respectivo valor padrão.", [["int[] e long[]","0 numérico"],["double[] e float[]","0.0 de ponto flutuante"],["boolean[]","false lógico"],["Object[] e String[]","null (ausência de referência)"]], "Conhecer os valores padrão previne NullPointerException e cálculos corrompidos.")
        ]
      },
      {
        id: "java-c06-u1-l5-clonagem-e-copia-de-arrays",
        title: "Cópia defensiva e clonagem com System.arraycopy",
        subtitle: "Arrays · Duplicando buffers de memória com clone() e Arrays.copyOf",
        theory: "Como arrays são objetos mutáveis, atribuir uma variável a outra (b = a;) apenas copia a referência, criando aliasing. Para duplicar os dados de verdade, Java oferece a.clone(), Arrays.copyOf() e o método nativo de alto desempenho System.arraycopy(), que realiza cópias em bloco de memória.",
        questions: [
          q("O que acontece ao executar int[] b = a; em Java?", "Ambas as variáveis passam a apontar para o mesmíssimo array no heap", ["Um novo array idêntico é criado no heap","Os elementos são duplicados em profundidade"], "Atribuição simples copia unicamente o ponteiro de referência, compartilhando o mesmo objeto."),
          q("Qual método utilitário da classe java.util.Arrays cria uma cópia com tamanho ajustável?", "Arrays.copyOf(origem, novoTamanho)", ["Arrays.duplicate(origem)","Arrays.clone(origem)","Arrays.slice(origem)"], "Arrays.copyOf duplica os elementos e trunca ou preenche com zeros conforme o novo tamanho."),
          q("Qual método nativo de baixo nível na classe System realiza cópias ultrarrápidas de trechos de array?", "System.arraycopy(...)", ["System.copyMemory(...)","System.bufferCopy(...)","System.cloneArray(...)"], "System.arraycopy é uma rotina nativa otimizada que copia blocos contíguos de memória."),
          q("A clonagem com arr.clone() em um array de objetos realiza cópia rasa ou profunda?", "Cópia rasa (shallow copy): o array é novo, mas os objetos apontados continuam compartilhados", ["Cópia profunda automática","Serialização binária completa"], "Apenas o array recipiente é duplicado; os elementos internos continuam sendo as mesmas referências."),
          t("Qual método da classe Arrays duplica um array existente a partir de sua origem?", ["Arrays.copyOf","copyOf"], "Arrays.copyOf é o método padrão da biblioteca para clonar arrays.", "int[] copia = ____(original, original.length);"),
          g("Complete a instrução duplicando o array notas através do método clone.", ["notas.clone()"], "clone() cria uma cópia independente do array primitivo.", "int[] backup = ____;"),
          o("Ordene os parâmetros do método nativo System.arraycopy.", ["Array de origem (src)","Posição inicial de leitura na origem (srcPos)","Array de destino (dest)","Posição inicial de escrita no destino (destPos)","Quantidade total de elementos a copiar (length)"], "A assinatura de System.arraycopy exige fonte, índice de leitura, destino, índice de escrita e contagem."),
          p("Associe a técnica de duplicação à sua característica.", [["b = a;","Aliasing puro: nenhuma cópia de dados é realizada"],["a.clone()","Cria novo array contendo os mesmos elementos"],["Arrays.copyOf(a, n)","Cria cópia podendo redimensionar o tamanho final"],["System.arraycopy(...)","Operação nativa otimizada para copiar fatias específicas"]], "Dominar a clonagem correta protege o estado interno de mutações indesejadas.")
        ]
      }
    ],
    2: [
      {
        id: "java-c06-u2-l1-laco-for-tradicional-e-indices",
        title: "Percurso com laço for tradicional indexado",
        subtitle: "Percursos · Acesso posicional de 0 a length - 1 com controle fino",
        theory: "O percurso com o laço for tradicional utiliza uma variável de índice que varia de 0 até array.length - 1 com incremento unitário. Essa abordagem fornece controle total sobre a posição atual, sendo indispensável quando o algoritmo necessita ler o índice, modificar elementos ou percorrer passos não lineares.",
        questions: [
          q("Qual é a condição de parada canônica para iterar sobre todo o array arr com for indexado?", "i < arr.length", ["i <= arr.length","i < arr.length()","i != arr.size"], "Como os índices vão de 0 a length - 1, a condição rigorosa é i < arr.length."),
          q("O que acontece se a condição do laço for for escrita como i <= arr.length?", "Lança ArrayIndexOutOfBoundsException na última iteração", ["O laço termina graciosamente","O último elemento é ignorado"], "Acessar o índice igual a length extrapola a fronteira física do array."),
          q("Quando o laço for tradicional indexado é mandatório em vez do for-each simplificado?", "Quando precisamos modificar posições do array ou acessar o índice numérico do elemento", ["Apenas quando o array tem mais de 100 itens","Nunca, for-each substitui em 100% dos casos"], "O laço for-each não expõe o índice nem permite reatribuir posições do array original."),
          q("Como percorrer um array em ordem inversa utilizando o for indexado?", "Iniciando com i = arr.length - 1 e decrementando com i >= 0; i--", ["Iniciando em i = arr.length e indo até i > 0","Usando for (int i : arr.reverse())"], "A ordem inversa começa no último índice válido (length - 1) e desce até o zero inclusive."),
          t("Qual operador relacional garante que o índice i não atinja o valor de arr.length?", ["<"], "O operador menor que (<) impede o acesso fora dos limites.", "for (int i = 0; i ____ arr.length; i++) { }"),
          g("Complete o cabeçalho do laço para percorrer todos os índices válidos do array.", ["i < dados.length"], "i < dados.length garante que todos os elementos sejam visitados.", "for (int i = 0; ____; i++) { }"),
          o("Ordene as três expressões do cabeçalho de um laço for tradicional.", ["Inicialização da variável de índice (int i = 0)","Condição de continuidade booleana (i < arr.length)","Expressão de atualização de passo (i++)"], "A sintaxe canônica é for (inicializacao; condicao; incremento)."),
          p("Associe a variação do laço for indexado ao seu propósito prático.", [["for (int i = 0; i < len; i++)","Percurso direto do primeiro ao último elemento"],["for (int i = len - 1; i >= 0; i--)","Percurso reverso do último até o primeiro elemento"],["for (int i = 0; i < len; i += 2)","Percurso saltando posições alternadas (índices pares)"],["arr[i] = arr[i] * 2;","Mutação in-place permitida pelo acesso ao índice"]], "O for indexado é a ferramenta fundamental para algoritmos que requerem controle de posição.")
        ]
      },
      {
        id: "java-c06-u2-l2-laco-for-each-enhanced",
        title: "Percurso declarativo com laço for-each (enhanced for)",
        subtitle: "Percursos · Sintaxe limpa para leitura sequencial de todos os elementos",
        theory: "Introduzido no Java 5, o laço for aprimorado (for-each) simplifica a iteração sobre arrays e coleções eliminando a gestão manual de índices. A sintaxe for (Tipo elemento : colecao) lê sequencialmente cada item do primeiro ao último, evitando erros clássicos de off-by-one e tornando o código imensamente mais legível.",
        questions: [
          q("Qual é a principal vantagem de utilizar o laço for-each para percorrer um array?", "Elimina o risco de erros de limites de índices (off-by-one) e torna o código conciso", ["Permite alterar os valores primitivos contidos no array","Executa em threads paralelas na CPU"], "O for-each oculta a mecânica de contadores, garantindo visitas seguras do início ao fim."),
          q("É possível alterar o valor de uma posição de int[] numeros usando a variável do for-each?", "Não, a variável de iteração recebe apenas uma cópia de cada elemento por valor", ["Sim, reatribuir a variável atualiza o array","Apenas com arrays de boolean"], "Como primitivos são copiados por valor, reatribuir a variável do loop não afeta o array subjacente."),
          q("Qual símbolo separa a declaração da variável temporária do nome do array no for-each?", "Dois-pontos (:)", ["Ponto e vírgula (;)","Seta (->)","Palavra in"], "A sintaxe oficial do enhanced for em Java utiliza dois-pontos: for (int n : numeros)."),
          q("O que acontece se tentarmos executar um for-each sobre uma variável de array que é null?", "Lança java.lang.NullPointerException imediatamente ao tentar iniciar a iteração", ["O laço simplesmente não executa e pula","O laço itera uma vez com valor null"], "Iterar sobre referências nulas dispara NullPointerException na tentativa de avaliar a coleção."),
          t("Qual símbolo de pontuação é usado no cabeçalho do for-each em Java?", [":","dois pontos","dois-pontos"], "Dois pontos separam a variável do array alvo.", "for (String nome ____ nomes) { }"),
          g("Complete o cabeçalho do laço for-each para iterar sobre o array de preços.", [":"], "Dois-pontos delimitam a iteração em enhanced for.", "for (double preco ____ precos) { total += preco; }"),
          o("Ordene os elementos sintáticos de um cabeçalho for-each em Java.", ["Palavra-chave for e abertura de parênteses","Tipo e identificador da variável receptora","Símbolo de dois-pontos (:)","Identificador do array ou coleção a ser percorrido","Fechamento de parênteses e bloco de instruções"], "A leitura intuitiva é: \"para cada elemento em coleção faça...\"."),
          p("Associe o estilo de laço ao seu caso de uso ideal.", [["for-each (for (T x : arr))","Leitura limpa de todos os itens sem necessidade de índice"],["for indexado (for (int i=0;...))","Quando precisamos do índice ou de alterar o array nativo"],["while com sentinela","Quando o critério de parada não depende do tamanho total"],["do-while","Quando o corpo precisa executar ao menos uma vez obrigatoriamente"]], "Escolher o laço adequado equilibra legibilidade e capacidade de mutação.")
        ]
      },
      {
        id: "java-c06-u2-l3-acumuladores-e-estatisticas",
        title: "Padrão acumulador para estatísticas em arrays",
        subtitle: "Percursos · Calculando somas, médias, máximos e mínimos em percurso único",
        theory: "O padrão acumulador percorre um array atualizando variáveis auxiliares de agregação para derivar métricas consolidadas. Em uma única passagem O(n), é possível acumular o somatório total para derivar a média aritmética, bem como rastrear os valores máximo e mínimo através de comparações condicionais sucessivas.",
        questions: [
          q("Com qual valor a variável de rastreamento do maior elemento (max) deve preferencialmente ser inicializada?", "Com o primeiro elemento do array (arr[0])", ["Com zero (0)","Com Integer.MAX_VALUE","Com null"], "Iniciar com arr[0] previne erros graves quando todos os números do array forem negativos."),
          q("Com qual valor a variável de menor elemento (min) deve ser inicializada caso não se use arr[0]?", "Integer.MAX_VALUE", ["0","-1","Integer.MIN_VALUE"], "Inicializar com o maior valor concebível garante que qualquer elemento do array seja menor."),
          q("Qual é a complexidade temporal de calcular soma, média, mínimo e máximo em uma única varredura?", "O(n) - tempo linear proporcional ao número de posições do array", ["O(n^2)","O(log n)","O(1)"], "Uma única passagem pelo array visita cada elemento exatamente uma vez."),
          q("Como calcular a média com precisão decimal a partir da soma inteira e do tamanho do array?", "Fazendo cast de soma para double antes da divisão: (double) soma / arr.length", ["Dividindo soma / arr.length diretamente","Usando Math.round(soma / arr.length)"], "Divisão entre dois inteiros em Java realiza truncamento para inteiro se não houver cast explícito."),
          t("Qual constante da classe Integer representa o maior inteiro possível de 32 bits?", ["Integer.MAX_VALUE","MAX_VALUE"], "Integer.MAX_VALUE (2.147.483.647) serve como âncora inicial para busca de mínimo.", "int menor = ____;"),
          g("Complete a condição para atualizar o maior elemento encontrado.", ["> maior"], "Se o item atual for maior que o acumulador, atualiza-se o maior.", "if (item ____) maior = item;"),
          o("Ordene as etapas para calcular a média de um array não vazio com segurança.", ["Validar que o array não é nulo e possui tamanho maior que zero","Inicializar a variável acumuladora de soma com zero","Percorrer todos os elementos somando cada valor ao acumulador","Dividir a soma convertida para double pelo tamanho do array"], "O cálculo defensivo previne divisões por zero e perda de casas decimais."),
          p("Associe a métrica estatística à sua inicialização padrão.", [["Soma acumulada","Inicia com 0"],["Produto acumulado","Inicia com 1"],["Maior valor (max)","Inicia com arr[0] ou Integer.MIN_VALUE"],["Menor valor (min)","Inicia com arr[0] ou Integer.MAX_VALUE"]], "A inicialização correta de acumuladores é a garantia de exatidão matemática.")
        ]
      },
      {
        id: "java-c06-u2-l4-reversao-e-troca-in-place",
        title: "Inversão in-place de arrays com dois ponteiros",
        subtitle: "Percursos · Algoritmo de dois ponteiros convergentes com consumo O(1) de memória",
        theory: "A inversão de array in-place reorganiza seus elementos na ordem oposta sem criar array auxiliar, consumindo O(1) de memória extra. Utiliza-se a técnica de dois ponteiros: um inicia no índice zero e outro no último índice, trocando seus conteúdos e convergindo até se cruzarem no meio.",
        questions: [
          q("Qual é a condição de parada do laço while na inversão com dois ponteiros (esq e dir)?", "esq < dir", ["esq <= dir","esq != dir","dir > 0"], "Quando esq cruza ou iguala dir, todos os pares simétricos já foram devidamente invertidos."),
          q("Por que é necessária uma variável temporária auxiliar durante a troca de dois elementos?", "Para guardar temporariamente o primeiro valor antes que ele seja sobrescrito pelo segundo", ["Porque Java exige três variáveis em qualquer cálculo","Para evitar estouro de pilha"], "Sem a variável temporária temp = arr[i]; arr[i] = arr[j];, o valor original de arr[i] seria perdido."),
          q("Qual é a complexidade espacial de inverter um array utilizando a técnica in-place?", "O(1) - consome espaço constante independente do tamanho do array", ["O(n) de memória auxiliar","O(log n)","O(n^2)"], "Como não se aloca nenhum novo array no heap, o consumo adicional de memória é estritamente constante."),
          q("Quantas trocas físicas de elementos são executadas para inverter um array de tamanho n?", "n / 2 trocas", ["n trocas","2 * n trocas","n - 1 trocas"], "Cada operação de troca acomoda simultaneamente dois elementos nas suas posições definitivas."),
          t("Quantos ponteiros móveis são coordenados simultaneamente nessa técnica de inversão?", ["2","dois"], "O padrão opera com dois ponteiros convergentes nas extremidades.", "A técnica utiliza ____ ponteiros móveis."),
          g("Complete o incremento e decremento simétrico dos dois ponteiros.", ["esq++; dir--;","esq++;dir--;"], "Os ponteiros convergem para o centro do array a cada iteração.", "int temp = arr[esq]; arr[esq] = arr[dir]; arr[dir] = temp; ____"),
          o("Ordene os passos da operação de troca (swap) entre arr[i] e arr[j].", ["Armazenar arr[i] na variável temporária int temp","Atribuir o valor de arr[j] na posição arr[i]","Atribuir o valor de temp na posição arr[j]"], "A tríade clássica do swap realiza a permuta perfeita de dois dados na memória."),
          p("Associe o ponteiro à sua posição inicial na reversão do array.", [["Ponteiro esquerdo (esq)","Inicia no índice 0 e avança com incremento (esq++)"],["Ponteiro direito (dir)","Inicia em length - 1 e retrocede com decremento (dir--)"],["Ponto de encontro central","Ocorre em n / 2 onde a inversão é concluída"],["Variável temporária temp","Mantém um elemento vivo durante a troca mútua"]], "A técnica de dois ponteiros é um dos padrões algorítmicos mais eficientes da computação.")
        ]
      },
      {
        id: "java-c06-u2-l5-filtragem-e-compactacao-arrays",
        title: "Filtragem e redimensionamento de arrays",
        subtitle: "Percursos · Extraindo subconjuntos e transferindo para arrays de tamanho exato",
        theory: "Como arrays possuem tamanho imutável, filtrar elementos com base em um predicado exige uma estratégia em duas etapas: primeiro conta-se quantos itens satisfazem o critério para alocar o array de destino no tamanho exato; em seguida, realiza-se um segundo percurso preenchendo as posições filtradas.",
        questions: [
          q("Por que a filtragem em arrays nativos geralmente exige duas passagens pelo array de origem?", "Para saber a contagem exata de itens compatíveis e alocar o array destino no tamanho justo", ["Porque a JVM exige checagem dupla em loops","Para ordenar os itens antes de copiar"], "Como o tamanho do array resultante deve ser conhecido na alocação, a contagem prévia é mandatória."),
          q("Se tentarmos alocar o array destino com o tamanho máximo original e preenchê-lo parcialmente, qual é o problema?", "As posições não utilizadas conterão valores padrão espúrios (como 0 ou null)", ["O array não compilará","A memória será corrompida"], "Arrays com posições vazias poluem o processamento posterior com dados sentinela indesejados."),
          q("Qual método de Arrays.copyOf pode ser usado para ajustar o tamanho após uma única passagem?", "Arrays.copyOf(bufferTemporario, contagemReal)", ["Arrays.trim(bufferTemporario)","Arrays.compact(bufferTemporario)"], "Alocar um buffer do tamanho máximo e encolhê-lo com Arrays.copyOf evita a primeira contagem."),
          q("No Java 8+, qual API moderna substitui toda essa manipulação manual de filtros em arrays?", "Stream API (Arrays.stream(arr).filter(...).toArray())", ["Java Collections Toolkit","Reflections API"], "Streams abstraem a contagem e redimensionamento interno com operações declarativas limpas."),
          t("Quantas passagens manuais pelo array original o algoritmo canônico sem buffer temporário executa?", ["2","duas"], "Uma passagem conta os itens e a segunda copia os dados.", "O algoritmo clássico executa ____ passagens."),
          g("Complete o incremento do ponteiro de escrita no array filtrado.", ["k++"], "O pós-incremento grava o item e avança o índice do array destino.", "if (item % 2 == 0) { pares[____] = item; }"),
          o("Ordene as etapas da filtragem canônica de arrays nativos.", ["Contar quantos elementos satisfazem a condição do filtro","Alocar novo array com tamanho igual à contagem obtida","Percorrer novamente o array original copiando os dados válidos","Retornar o novo array filtrado com dimensionamento exato"], "A estratégia em duas fases garante arrays sem posições residuais nulas ou zeradas."),
          p("Associe a abordagem de filtragem à sua característica.", [["Contagem prévia + alocação exata","Consumo mínimo de memória: aloca apenas o tamanho necessário"],["Buffer máximo + Arrays.copyOf","Mais rápido: realiza apenas uma iteração sobre a origem"],["Arrays.stream(arr).filter(...)","Código declarativo e expressivo da Stream API"],["ArrayList dinâmico intermediário","Flexível e simples, com pequena sobrecarga de boxing"]], "Saber manipular filtros em baixo nível consolida o entendimento sobre gestão de memória.")
        ]
      }
    ],
    3: [
      {
        id: "java-c06-u3-l1-declaracao-e-acesso-bidimensional",
        title: "Declaração e indexação de matrizes bidimensionais",
        subtitle: "Matrizes · Coordenadas de linha e coluna com notação [linha][coluna]",
        theory: "Matrizes bidimensionais em Java representam tabelas ou grades estruturadas em linhas e colunas. Declaram-se com pares duplos de colchetes, como int[][] grade = new int[linhas][colunas];. O acesso posicional utiliza a notação grade[i][j], onde o primeiro índice i indica a linha e o segundo índice j especifica a coluna.",
        questions: [
          q("Qual é a sintaxe correta para instanciar uma matriz de inteiros com 3 linhas e 4 colunas em Java?", "int[][] matriz = new int[3][4];", ["int matriz[3, 4];","int[3][4] matriz = new int[][];","matrix<int> m = new matrix(3, 4);"], "Em Java, as dimensões da matriz são declaradas em colchetes separados: new int[linhas][colunas]."),
          q("Na instrução valor = tabuleiro[2][5];, o que indicam os números 2 e 5?", "Linha de índice 2 e coluna de índice 5", ["Coluna 2 e linha 5","Dois elementos a partir do quinto índice"], "Por convenção matemática e computacional em Java, a primeira coordenada é a linha e a segunda é a coluna."),
          q("Como descobrir a quantidade de linhas e de colunas de uma matriz retangular m?", "m.length informa as linhas e m[0].length informa as colunas", ["m.rows e m.cols","m.length(0) e m.length(1)","m.size() e m[0].size()"], "A matriz principal guarda referências a arrays de linhas; portanto, m[0].length mede a largura da coluna."),
          q("Qual é a capacidade total de elementos em uma matriz declarada como new int[4][5]?", "20 elementos", ["9 elementos","16 elementos","25 elementos"], "A capacidade é o produto de suas dimensões: 4 linhas * 5 colunas = 20 posições."),
          t("Quantos pares de colchetes identificam uma estrutura matricial bidimensional em Java?", ["2","dois","[][]"], "Dois pares de colchetes definem duas dimensões.", "int____ grade = new int[3][3];"),
          g("Complete o acesso ao elemento localizado na linha 1 e coluna 2 da matriz.", ["tabela[1][2]"], "A notação [linha][coluna] acessa a célula.", "int celula = ____;"),
          o("Ordene os componentes de uma matriz bidimensional.", ["Declaração do tipo base com colchetes duplos","Identificador de nome da matriz","Operador new seguido do tipo base","Dimensão da quantidade de linhas entre colchetes","Dimensão da quantidade de colunas entre colchetes"], "A construção segue a gramática estrita de tipos multidimensionais da linguagem."),
          p("Associe a expressão matricial ao dado que ela fornece.", [["matriz.length","Quantidade total de linhas da matriz"],["matriz[0].length","Quantidade de colunas da primeira linha"],["matriz[i][j]","Valor contido na célula da linha i e coluna j"],["matriz[i]","Array unidimensional que representa a linha i completa"]], "Compreender a hierarquia de coordenadas é vital para manipular grades, mapas e tabelas.")
        ]
      },
      {
        id: "java-c06-u3-l2-natureza-arrays-de-arrays-jagged",
        title: "A natureza de \"arrays de arrays\" e matrizes denteadas (jagged)",
        subtitle: "Matrizes · Linhas independentes com tamanhos e alocações distintas",
        theory: "Java não implementa matrizes como blocos planos contíguos de memória. Em Java, uma matriz multidimensional é literalmente um \"array de referências para outros arrays\". Isso possibilita a criação de matrizes denteadas (jagged arrays), onde cada linha possui comprimento próprio e independente.",
        questions: [
          q("Como matrizes bidimensionais são fisicamente estruturadas na memória da JVM?", "Como um array principal contendo referências que apontam para arrays independentes no heap", ["Como um único bloco plano e contíguo de bytes","Como tabelas relacionais indexadas"], "Java trata dimensões adicionais como arrays de ponteiros apontando para outros arrays no heap."),
          q("O que caracteriza uma matriz denteada ou irregular (jagged array)?", "Uma matriz onde cada linha possui uma quantidade diferente de colunas", ["Uma matriz com elementos nulos no meio","Uma matriz que só aceita números ímpares"], "Como cada linha é um array independente, linhas podem ter tamanhos totalmente assimétricos."),
          q("Qual declaração é válida para instanciar a estrutura primária de uma matriz denteada?", "int[][] matriz = new int[3][]; // define 3 linhas sem fixar colunas", ["int[][] matriz = new int[][3];","int[][] matriz = new int[];","jagged int[][] matriz = new int[3];"], "Pode-se omitir a dimensão da coluna na alocação inicial para definir cada linha posteriormente."),
          q("Qual é uma aplicação prática clássica de matrizes denteadas em computação?", "O Triângulo de Pascal, onde a linha n possui exatamente n + 1 elementos", ["Vetores tridimensionais em física","Processamento de pixels em telas Full HD"], "O Triângulo de Pascal economiza memória alocando apenas as posições estritamente necessárias por linha."),
          t("Qual termo em inglês descreve matrizes com linhas de tamanhos desiguais?", ["jagged","jagged array","ragged"], "Jagged array descreve matrizes irregulares.", "Estrutura conhecida como ____ array."),
          g("Complete a alocação da primeira linha de uma matriz irregular com 5 elementos.", ["new int[5]"], "Cada linha é alocada como um array independente no heap.", "matriz[0] = ____;"),
          o("Ordene os passos para construir uma matriz denteada personalizada.", ["Alocar o array principal definindo apenas o número de linhas (new int[linhas][])","Criar laço para percorrer cada índice de linha","Instanciar individualmente o array de cada linha com seu tamanho específico","Popular as células com dados calculados"], "A independência das linhas confere total flexibilidade de dimensionamento geométrico."),
          p("Associe a característica ao modelo de matriz em Java.", [["new int[3][3]","Matriz retangular uniforme: todas as linhas têm tamanho 3"],["new int[3][]","Array mestre alocado, linhas secundárias ainda são null"],["matriz[i] = new int[i + 1]","Linhas crescentes formando triângulo geométrico"],["m[0] == m[1]","Geralmente false, pois cada linha é um objeto distinto"]], "A arquitetura de arrays de arrays permite estruturas de dados triangulares com economia de RAM.")
        ]
      },
      {
        id: "java-c06-u3-l3-percursos-aninhados-em-matrizes",
        title: "Percursos bidimensionais com laços for aninhados",
        subtitle: "Matrizes · Iterando por linhas e colunas com for tradicional e for-each",
        theory: "Para percorrer matrizes bidimensionais, usam-se laços aninhados: o laço externo itera sobre as linhas (índice i) e o laço interno percorre as colunas daquela linha (índice j de 0 a matriz[i].length - 1). Essa formulação percorre com perfeição tanto matrizes regulares quanto denteadas.",
        questions: [
          q("Qual expressão governa a condição de parada do laço interno de colunas em matrizes?", "j < matriz[i].length", ["j < matriz.length","j < colunas","j <= matriz[i].size()"], "Acessar matriz[i].length garante que o percurso respeite o tamanho exato da linha corrente."),
          q("Qual é a complexidade de tempo de percorrer uma matriz retangular de dimensões N x M?", "O(N * M) - proporcional ao produto total de células", ["O(N + M)","O(log(N * M))","O(1)"], "Visitar cada célula exige N iterações externas multiplicadas por M iterações internas."),
          q("Como fica o percurso de uma matriz bidimensional utilizando a sintaxe do laço for-each?", "for (int[] linha : matriz) { for (int elemento : linha) { ... } }", ["for (int x : matriz) { ... }","for (int x, y : matriz) { ... }"], "O for externo recebe cada array de linha; o for interno extrai os elementos individuais daquela linha."),
          q("Qual é a ordem de percurso padrão quando o laço externo varia o índice i de linha?", "Percurso por linhas (row-major order)", ["Percurso por colunas (column-major order)","Percurso em espiral","Percurso diagonal"], "Iterar linha por linha é o padrão nativo em Java, favorecendo localidade espacial de referência."),
          t("Quantos laços for são tipicamente aninhados para percorrer uma matriz bidimensional?", ["2","dois"], "Um laço para linhas e outro para colunas.", "Utilizam-se ____ laços aninhados."),
          g("Complete o cabeçalho do laço interno garantindo respeito ao tamanho da linha atual.", ["j < grade[i].length"], "grade[i].length mede o comprimento da linha corrente.", "for (int j = 0; ____; j++) { }"),
          o("Ordene a estrutura canônica de laços para imprimir uma matriz em formato de grade.", ["Laço externo percorre o índice de linha i","Laço interno percorre o índice de coluna j imprimindo grade[i][j]","Término do laço interno de colunas","Impressão de quebra de linha System.out.println() para formatar a grade"], "A quebra de linha entre as linhas da matriz organiza visualmente a tabela na tela."),
          p("Associe a variável do laço à sua função dimensional.", [["i (laço externo)","Rastreia o índice da linha vertical atual"],["j (laço interno)","Rastreia o índice da coluna horizontal dentro da linha"],["matriz[i].length","Informa quantas colunas existem na linha i atual"],["matriz[i][j]","Acessa o dado primitivo na intersecção da célula"]], "Laços aninhados são a base de algoritmos de imagem, jogos e simulações científicas.")
        ]
      },
      {
        id: "java-c06-u3-l4-diagonais-principal-e-secundaria",
        title: "Operações em matrizes quadradas: diagonais principal e secundária",
        subtitle: "Matrizes · Propriedades geométricas e relações entre índices i e j em N x N",
        theory: "Em matrizes quadradas (N x N), as diagonais possuem propriedades diretas: a diagonal principal reúne elementos onde linha é igual a coluna (i == j); a diagonal secundária reúne elementos onde a soma dos índices é constante (i + j == N - 1). Isso permite processá-las em laço único.",
        questions: [
          q("Qual relação matemática identifica os elementos da diagonal principal de uma matriz quadrada?", "i == j (índice de linha idêntico ao índice de coluna)", ["i + j == n","i > j","i < j"], "Os elementos [0][0], [1][1], [2][2] compõem a diagonal principal de cima para baixo à direita."),
          q("Qual relação matemática identifica os elementos da diagonal secundária em uma matriz N x N?", "i + j == N - 1 (ou j == N - 1 - i)", ["i == j","i * j == N","i - j == 1"], "A soma dos índices nas células da diagonal secundária é sempre igual à dimensão N menos um."),
          q("Quantos laços for são necessários para somar a diagonal principal em tempo O(N)?", "Apenas um laço simples: soma += matriz[i][i];", ["Dois laços for aninhados","Três laços","Nenhum, faz-se em O(1)"], "Como os índices são iguais, um único laço for (int i = 0; i < n; i++) visita todos os elementos da diagonal."),
          q("Como se chama a matriz quadrada onde todos os elementos fora da diagonal principal são zeros?", "Matriz diagonal (ou matriz identidade se os elementos da diagonal forem todos 1)", ["Matriz nula","Matriz denteada","Matriz esparsa"], "Matrizes diagonais concentram seus valores não nulos estritamente na reta i == j."),
          t("Em uma matriz quadrada, qual índice de coluna é acessado na linha i da diagonal principal?", ["i"], "Na diagonal principal a linha e a coluna são ambas i.", "int elemento = matriz[i][____];"),
          g("Complete o acesso ao elemento da diagonal secundária em uma matriz de ordem n.", ["n - 1 - i"], "O índice complementar n - 1 - i acessa a diagonal secundária.", "soma += matriz[i][____];"),
          o("Ordene os passos para calcular a soma de ambas as diagonais em um único laço O(N).", ["Inicializar acumuladores para diagonal principal e secundária","Abrir laço único for de 0 até N - 1 com índice i","Acumular matriz[i][i] na soma principal","Acumular matriz[i][N - 1 - i] na soma secundária"], "Um único percurso O(N) extrai ambas as diagonais com máxima eficiência."),
          p("Associe a região da matriz quadrada à sua condição algébrica de índices.", [["Diagonal principal","i == j"],["Diagonal secundária","i + j == N - 1"],["Triângulo superior (acima da principal)","i < j"],["Triângulo inferior (abaixo da principal)","i > j"]], "As relações algébricas de índices resolvem problemas clássicos de álgebra linear.")
        ]
      },
      {
        id: "java-c06-u3-l5-transposicao-e-rotacao-matrizes",
        title: "Transposição e transformação de matrizes",
        subtitle: "Matrizes · Trocando linhas por colunas e manipulando planos bidimensionais",
        theory: "A transposição de uma matriz de ordem M x N resulta em uma nova matriz transposta N x M, onde cada linha da matriz original transforma-se em coluna na matriz transposta (transposta[j][i] = original[i][j]). Essa operação é a base para rotações de imagens de 90 graus e operações de álgebra linear.",
        questions: [
          q("Se uma matriz original possui 3 linhas e 5 colunas, quais serão as dimensões da sua transposta?", "5 linhas e 3 colunas", ["3 linhas e 5 colunas","5 linhas e 5 colunas","15 linhas e 1 coluna"], "A transposição inverte as dimensões: linhas tornam-se colunas e colunas tornam-se linhas."),
          q("Qual atribuição realiza a transposição da célula original[i][j] na nova matriz transposta?", "transposta[j][i] = original[i][j];", ["transposta[i][j] = original[j][i];","transposta[i][i] = original[j][j];"], "Inverter os índices de coordenadas [j][i] mapeia a antiga coluna para a nova linha."),
          q("Como rotacionar uma matriz quadrada em 90 graus no sentido horário?", "Transpor a matriz e em seguida inverter a ordem dos elementos em cada uma de suas linhas", ["Multiplicar todos os valores por -1","Inverter apenas as diagonais"], "A rotação horária de 90° equivale geometricamente à transposição seguida de reversão horizontal de linhas."),
          q("É possível transpor uma matriz quadrada in-place sem alocar uma matriz auxiliar?", "Sim, basta trocar matriz[i][j] com matriz[j][i] para todas as células onde i < j", ["Não, Java proíbe mutação in-place em matrizes","Apenas para matrizes de booleanos"], "Iterar sobre o triângulo superior (i < j) realizando swap com o simétrico transpõe in-place."),
          t("Qual operação geométrica transforma linhas em colunas na álgebra matricial?", ["transposicao","transposta"], "A transposição permuta as linhas com as colunas.", "A operação chama-se ____ de matriz."),
          g("Complete a instrução de transposição mapeando a linha original para a coluna de destino.", ["original[i][j]"], "A célula [i][j] é gravada na posição transposta [j][i].", "transposta[j][i] = ____;"),
          o("Ordene as etapas para transpor uma matriz retangular original M x N.", ["Descobrir linhas M = original.length e colunas N = original[0].length","Alocar nova matriz transposta com dimensões N linhas por M colunas","Executar laços aninhados i de 0 a M-1 e j de 0 a N-1","Copiar transposta[j][i] = original[i][j] em cada iteração"], "O algoritmo transfere cada elemento para suas novas coordenadas rotacionadas."),
          p("Associe a operação matricial ao seu efeito prático.", [["Transposição M x N","Produz matriz N x M com linhas e colunas invertidas"],["Rotação 90° horária","Transposição seguida da inversão da ordem de cada linha"],["Transposição in-place","Permuta pares simétricos de matriz quadrada sem memória extra"],["Espelhamento vertical","Inverte a ordem das linhas de cima para baixo"]], "Transformações bidimensionais formam a base de motores gráficos e processamento de imagem.")
        ]
      }
    ],
    4: [
      {
        id: "java-c06-u4-l1-string-pool-e-operador-new",
        title: "O String Constant Pool e a criação de objetos literais",
        subtitle: "Strings imutáveis · Reutilização de literais no pool de memória da JVM",
        theory: "A JVM mantém uma área especial no heap chamada String Constant Pool. Literais idênticos como \"Java\" compartilham a mesmíssima referência de memória para poupar espaço. No entanto, ao usar explicitamente new String(\"Java\"), força-se a alocação de um novo objeto separado fora do pool, ignorando o reuso.",
        questions: [
          q("O que acontece na JVM quando duas variáveis recebem o mesmo literal \"Texto\"?", "Ambas apontam para a mesma instância compartilhada no String Constant Pool", ["Duas instâncias idênticas são criadas em endereços separados","Ocorre erro de compilação por duplicação"], "O String Pool reaproveita literais idênticos automaticamente para otimizar o uso da memória heap."),
          q("Qual é o efeito de instanciar uma string usando new String(\"Olá\")?", "Cria um novo objeto independente no heap fora do pool, mesmo que \"Olá\" já exista lá", ["Adiciona duas cópias no pool","Desativa o garbage collector para a string"], "O operador new sempre força a criação de uma nova instância distinta na memória heap."),
          q("Qual método da classe String move ou busca uma string no pool manualmente?", "str.intern()", ["str.pool()","str.cache()","str.share()"], "O método intern() devolve a referência canônica do String Pool para o conteúdo da string."),
          q("Onde residia o String Pool historicamente e onde reside na JVM moderna (Java 7+)?", "Residia na PermGen (espaço permanente) e foi movido para o heap padrão", ["Sempre residiu na pilha da thread","Reside no disco rígido do sistema"], "Desde o Java 7, o String Pool fica no heap comum, sujeito à coleta de lixo normal pelo GC."),
          t("Qual método da classe String recupera a referência canônica do pool de constantes?", ["intern","intern()"], "intern() conecta a string ao pool da JVM.", "String canonica = s.____();"),
          g("Complete o código usando o método intern para reaproveitar a instância do pool.", ["intern()"], "intern() pesquisa ou registra a string no pool compartilhado.", "String s = new String(\"teste\").____;"),
          o("Ordene as etapas da criação de uma string com literal \"Lincode\".", ["Compilador registra o literal \"Lincode\" na tabela de constantes da classe","JVM carrega a classe e verifica se \"Lincode\" já reside no String Pool","Se não existir, aloca a instância no pool; se existir, reaproveita a referência","A variável local na pilha recebe o endereço da string do pool"], "O pooling de literais é um dos pilares de otimização de memória em Java."),
          p("Associe a declaração de String ao seu comportamento na memória.", [["String a = \"Dado\"; String b = \"Dado\";","a == b é true (ambas compartilham o mesmo objeto do pool)"],["String a = new String(\"Dado\");","Aloca novo objeto isolado no heap; a == \"Dado\" é false"],["String c = a.intern();","c == \"Dado\" é true (retorna a instância do pool)"],["Garbage Collector moderno","Coleta strings do pool se não forem mais referenciadas"]], "Entender o String Pool esclarece de imediato as nuances de consumo de memória textual.")
        ]
      },
      {
        id: "java-c06-u4-l2-imutabilidade-e-seguranca",
        title: "A imutabilidade de java.lang.String e suas garantias",
        subtitle: "Strings imutáveis · Por que strings não podem ser alteradas após a criação",
        theory: "Instâncias da classe String em Java são 100% imutáveis: uma vez criadas, seu conteúdo de caracteres jamais pode ser alterado. Qualquer método de manipulação (como toUpperCase() ou replace()) não modifica a string original, mas aloca e devolve uma nova instância de String com as alterações aplicadas.",
        questions: [
          q("O que acontece com a string original s quando executamos s.toUpperCase() sem reatribuir?", "A string original s permanece intacta em minúsculas; o resultado transformado é descartado", ["A string s muda internamente para maiúsculas","Ocorre erro de compilação"], "Como String é imutável, seus métodos nunca alteram o objeto em si, apenas retornam novos objetos."),
          q("Por que a classe String foi projetada como imutável e declarada com o modificador final?", "Para garantir thread-safety inerente, segurança de rede/banco e consistência no String Pool", ["Porque a JVM não suporta caracteres dinâmicos","Para impedir que o usuário use acentos"], "A imutabilidade permite compartilhamento seguro entre threads sem sincronização e protege chaves em HashMaps."),
          q("Se String fosse mutável, qual seria o risco de usá-la como chave em uma HashMap?", "Se o texto mudasse, o hashCode mudaria, tornando o valor irrecuperável no mapa", ["O mapa aumentaria de tamanho indefinidamente","O garbage collector travaria"], "Chaves em mapas dependem de hashCode imutável para localizar o bucket correto de forma determinística."),
          q("Como fazer para que a variável s passe a apontar para o resultado de s.toUpperCase()?", "Reatribuindo a variável: s = s.toUpperCase();", ["Usando o método s.mutate()","Passando s por referência"], "Reatribuir a referência substitui o apontamento da variável local para a nova string gerada."),
          t("Qual modificador de classe na declaração de java.lang.String impede a criação de subclasses?", ["final"], "A classe String é declarada como public final class String.", "public ____ class String implements Serializable { }"),
          g("Complete o código reatribuindo a variável com o novo texto em maiúsculas.", ["s = s.toUpperCase()"], "Reatribuir a variável salva o novo objeto devolvido.", "String s = \"ola\"; ____;"),
          o("Ordene as operações executadas na instrução s = s.concat(\" mundo\");.", ["Leitura do conteúdo do objeto s original (\"ola\")","Alocação de um novo objeto String no heap contendo \"ola mundo\"","O objeto original \"ola\" permanece intacto na memória","A variável de referência s é atualizada para apontar para o novo objeto"], "Mutações de texto produzem novas instâncias, preservando a imutabilidade do original."),
          p("Associe o benefício de segurança ao fato de String ser imutável.", [["Thread-safety intrínseca","Múltiplas threads leem o mesmo texto sem condições de corrida"],["Chaves seguras em HashMap","O código hash nunca varia após o primeiro cálculo em cache"],["Segurança de conexões e URLs","Parâmetros de portas e arquivos não podem ser fraudados por ponteiros"],["String Constant Pool","Reaproveitamento seguro de instâncias sem risco de mutação alheia"]], "A imutabilidade é a decisão de arquitetura mais acertada da biblioteca básica de Java.")
        ]
      },
      {
        id: "java-c06-u4-l3-comparacao-equals-vs-operador",
        title: "Comparação de strings: equals() vs operador ==",
        subtitle: "Strings imutáveis · Conteúdo semântico vs identidade de endereços de memória",
        theory: "O operador == compara se duas variáveis apontam para o mesmo endereço de memória no heap. Para comparar o conteúdo textual de duas strings, usa-se obrigatoriamente equals() (ou equalsIgnoreCase()). Usar == para comparar texto gera falsos negativos quando objetos vêm de fontes distintas.",
        questions: [
          q("Qual método deve ser utilizado para comparar se duas strings contêm os mesmos caracteres?", "str1.equals(str2)", ["str1 == str2","str1.isSame(str2)","str1.compare(str2)"], "O método equals() verifica o conteúdo caractere por caractere, garantindo igualdade semântica."),
          q("O que o operador a == b avalia quando a e b são variáveis de tipo String?", "Se ambas as variáveis referenciam o exato mesmo objeto na memória heap", ["Se as duas strings têm o mesmo tamanho","Se as strings têm as mesmas letras"], "O operador == compara identidade de ponteiros, não o conteúdo textual armazenado."),
          q("Se criarmos a = \"Java\" e b = new String(\"Java\"), qual é o resultado de a == b e a.equals(b)?", "a == b é false; a.equals(b) é true", ["Ambos são true","Ambos são false","a == b é true e a.equals(b) é false"], "Eles têm conteúdos iguais (equals true), mas residem em endereços de memória distintos (== false)."),
          q("Qual método compara strings ignorando diferenças entre letras maiúsculas e minúsculas?", "str.equalsIgnoreCase(outra)", ["str.equalsLower(outra)","str.compareCase(outra)","str.equals(outra, true)"], "equalsIgnoreCase realiza comparação insensível à caixa sem necessidade de conversão prévia."),
          t("Qual método da classe Object sobrescrito por String compara o conteúdo semântico?", ["equals","equals()"], "equals() é o método canônico de comparação de igualdade.", "if (nome.____(\"admin\")) { liberarAcesso(); }"),
          g("Complete a condição para comparar o texto de forma segura e insensível à caixa.", ["equalsIgnoreCase"], "equalsIgnoreCase aceita maiúsculas e minúsculas indiferentemente.", "if (resposta.____(\"sim\")) { continuar(); }"),
          o("Ordene a verificação que o método String.equals(obj) realiza internamente.", ["Testa se this == obj (se for o mesmo endereço de memória, retorna true imediatamente)","Testa se obj instanceof String (se não for string, retorna false)","Compara se o tamanho de ambas as strings é idêntico","Percorre caractere por caractere verificando correspondência exata"], "A implementação de equals é altamente otimizada com saídas precoces para velocidade."),
          p("Associe a comparação ao resultado com s1 = \"ola\" e s2 = new String(\"ola\").", [["s1 == s2","false (endereços de memória distintos)"],["s1.equals(s2)","true (conteúdo idêntico caractere por caractere)"],["s1.equalsIgnoreCase(\"OLA\")","true (ignora maiúsculas e minúsculas)"],["\"admin\".equals(entrada)","Boa prática (evita NullPointerException se entrada for null)"]], "Escrever \"constante\".equals(variavel) blinda o código contra NullPointerException.")
        ]
      },
      {
        id: "java-c06-u4-l4-metodos-essenciais-inspecao",
        title: "Métodos fundamentais de inspeção em strings",
        subtitle: "Strings imutáveis · charAt, length, indexOf, lastIndexOf e substring",
        theory: "A classe String disponibiliza métodos essenciais de inspeção: length() devolve a contagem de caracteres, charAt(i) acessa o caractere no índice i, indexOf(termo) localiza a primeira ocorrência devolvendo -1 se ausente, e substring(inicio, fim) extrai recortes textuais com índice final exclusivo.",
        questions: [
          q("Qual método retorna o caractere localizado em uma posição específica de uma string?", "str.charAt(indice)", ["str[indice]","str.get(indice)","str.char(indice)"], "Em Java não é permitido usar colchetes em Strings; usa-se exclusivamente o método charAt(i)."),
          q("O que o método str.indexOf(\"x\") devolve quando a letra x não está presente na string?", "-1", ["0","null","Lança exceção IndexOutOfBoundsException"], "Retornar -1 é a convenção padrão para sinalizar ausência de ocorrência do termo buscado."),
          q("Na chamada s.substring(2, 6), quais índices de caracteres são de fato incluídos no recorte?", "Índices 2, 3, 4 e 5 (o índice inicial 2 é inclusivo e o índice final 6 é exclusivo)", ["Índices 2, 3, 4, 5 e 6","Apenas os índices 2 e 6"], "Em Java, intervalos de substring seguem o padrão semiaberto: [início, fim)."),
          q("O que acontece se invocarmos s.charAt(10) em uma string com apenas 5 caracteres?", "Lança java.lang.StringIndexOutOfBoundsException", ["Retorna o caractere de espaço ' '","Retorna o caractere nulo '\\0'"], "Acessar índices menores que zero ou maiores ou iguais a length() dispara exceção imediata."),
          t("Qual método devolve o número total de caracteres de uma String em Java?", ["length()","length"], "length() com parênteses informa o comprimento da String.", "int qtd = texto.____;"),
          g("Complete a extração dos três primeiros caracteres da string (índices 0, 1 e 2).", ["substring(0, 3)"], "substring(0, 3) inclui os índices 0, 1 e 2 excluindo o 3.", "String prefixo = codigo.____;"),
          o("Ordene as operações para verificar se uma string contém a palavra \"Java\" e extrair seu sufixo.", ["Inspecionar a posição com int pos = str.indexOf(\"Java\")","Verificar se pos != -1 confirmando a presença da palavra","Calcular o início do sufixo pos + \"Java\".length()","Extrair o restante do texto com str.substring(inicioSufixo)"], "A combinação de indexOf e substring resolve tarefas clássicas de parsing textual."),
          p("Associe o método de String à sua ação correspondente.", [["charAt(3)","Lê o quarto caractere (índice 3 posicional)"],["indexOf(\"abc\")","Devolve o índice da primeira ocorrência ou -1"],["lastIndexOf(\"abc\")","Devolve o índice da última ocorrência ou -1"],["substring(4)","Recorta a string a partir do índice 4 até o final"]], "Dominar os métodos básicos de inspeção é requisito para qualquer processamento de texto.")
        ]
      },
      {
        id: "java-c06-u4-l5-metodos-modernos-transformacao",
        title: "Recursos textuais modernos: strip, repeat e isBlank",
        subtitle: "Strings imutáveis · Melhorias de produtividade introduzidas a partir do Java 11",
        theory: "A partir do Java 11, a classe String recebeu métodos modernos de alta produtividade: isBlank() verifica se a string está vazia ou contém apenas espaços em branco, strip() remove espaços Unicode nas pontas superando o legado trim(), e repeat(n) duplica a string n vezes de forma concisa e eficiente.",
        questions: [
          q("Qual é a diferença fundamental entre str.isEmpty() e str.isBlank() em Java?", "isEmpty() exige tamanho zero; isBlank() retorna true também se houver apenas espaços em branco", ["isEmpty() ignora pontuação; isBlank() não","Ambos são 100% idênticos"], "isBlank() valida strings que contêm apenas espaços, tabulações ou quebras de linha em branco."),
          q("Por que o método str.strip() (Java 11+) é superior ao clássico str.trim()?", "strip() reconhece todos os tipos de espaços em branco da tabela Unicode (como NBSP)", ["strip() modifica a string original in-place","trim() foi removido da linguagem Java"], "trim() só reconhecia caracteres ASCII <= 32; strip() é totalmente aderente ao padrão Unicode moderno."),
          q("O que a chamada \"=\".repeat(10) produz em Java 11+?", "\"==========\" (uma string composta por 10 sinais de igual repetidos)", ["Uma lista de 10 strings","Erro de compilação"], "repeat(n) gera uma nova string multiplicando o conteúdo n vezes sem necessidade de loops manuais."),
          q("Qual método substitui todas as ocorrências de um caractere ou texto literal por outro?", "str.replace(antigo, novo)", ["str.substitute(antigo, novo)","str.swap(antigo, novo)"], "replace() aceita sequências literais (CharSequence) e substitui todas as ocorrências encontradas."),
          t("Qual método moderno do Java 11 testa se a string tem tamanho zero ou apenas espaços?", ["isBlank","isBlank()"], "isBlank() detecta se a string não possui caracteres visíveis.", "if (entrada.____()) { throw new IllegalArgumentException(); }"),
          g("Complete a validação para rejeitar strings preenchidas puramente por espaços em branco.", ["isBlank()"], "isBlank() valida strings em branco de forma completa.", "if (usuario.____) return false;"),
          o("Ordene o tratamento moderno de sanitização de uma entrada de formulário.", ["Receber a string bruta digitada pelo usuário","Verificar se está em branco com isBlank()","Remover espaços excedentes nas pontas com strip()","Persistir o texto limpo e validado"], "A tríade isBlank() e strip() simplifica rotinas de sanitização de dados."),
          p("Associe o método textual moderno à sua utilidade.", [["str.isBlank()","Valida se o texto é vazio ou composto só por espaços"],["str.strip()","Remove espaços em branco nas pontas com suporte Unicode"],["str.repeat(3)","Cria cópia repetida 3 vezes do texto"],["str.lines()","Devolve um Stream<String> dividindo o texto em linhas"]], "As adições modernas de String tornam a manipulação textual em Java extremamente concisa.")
        ]
      }
    ],
    5: [
      {
        id: "java-c06-u5-l1-problema-desempenho-concatenacao",
        title: "O problema de desempenho da concatenação com + em loops",
        subtitle: "StringBuilder · Como a criação de objetos transitórios degrada a CPU e memória",
        theory: "Usar o operador + em loops repetidos causa gargalo severo de tempo O(n²). Como strings são imutáveis, cada iteração copia toda a cadeia acumulada gerando milhares de objetos transitórios que sobrecarregam o Garbage Collector. Para acumular texto em laços, deve-se adotar StringBuilder.",
        questions: [
          q("Por que concatenar strings com o operador + dentro de um laço com muitas iterações é má prática?", "Gera complexidade quadrática O(n²) e satura a memória com milhares de objetos transitórios", ["Porque strings concatenadas perdem a codificação UTF-8","Porque o operador + é proibido em loops pelo compilador"], "Cada iteração copia todos os caracteres anteriores novamente, degradando rapidamente o desempenho."),
          q("Qual é a complexidade temporal de concatenar n caracteres utilizando o operador + em loop?", "O(n²) - tempo quadrático no número de iterações", ["O(n) - tempo linear","O(log n)","O(1)"], "A soma das cópias progressivas (1 + 2 + 3 + ... + n) resulta matematicamente em complexidade quadrática."),
          q("O que o compilador Java faz automaticamente para instruções simples como String s = a + b + c;?", "Converte a instrução para StringBuilder ou invokedynamic em tempo de compilação", ["Cria cinco strings transitórias no heap","Lança exceção de concatenação"], "Em expressões lineares simples, o compilador otimiza automaticamente; em loops, contudo, ele não pode."),
          q("Qual classe da biblioteca padrão deve ser usada para acumular texto dentro de loops?", "java.lang.StringBuilder", ["java.lang.String pura","java.util.Scanner","java.io.File"], "StringBuilder foi projetada especificamente para acumular texto de forma mutável e eficiente."),
          t("Qual classe padrão de Java é a solução ideal para acumular texto com alta performance?", ["StringBuilder"], "StringBuilder fornece buffer mutável de caracteres.", "____ sb = new StringBuilder();"),
          g("Complete a instanciação do acumulador de texto de alta eficiência.", ["StringBuilder"], "StringBuilder evita a sobrecarga de memória em repetições.", "____ buffer = new StringBuilder();"),
          o("Ordene os eventos que causam lentidão ao usar s += texto em um laço for.", ["Laço for atinge a instrução de concatenação s += item","Um novo StringBuilder temporário é instanciado no heap","A string s antiga e o novo item são adicionados ao buffer temporário","O método toString() aloca uma nova String no heap","A string s antiga vira lixo no heap aguardando o Garbage Collector"], "Repetir esse ciclo em milhares de iterações satura a memória e paralisa a aplicação."),
          p("Associe o método de concatenação ao seu cenário de aplicação.", [["Operador + em linha única (a + b)","Excelente: o compilador otimiza automaticamente"],["Operador + dentro de laço for","Péssimo: causa alocação massiva de lixo e lentidão O(n²)"],["StringBuilder em laço for","Excelente: acumula caracteres em buffer com tempo linear O(n)"],["String.format(...)","Bom para formatação expressiva, com custo moderado"]], "Identificar concatenações dentro de repetições é o primeiro passo da otimização de rotinas textuais.")
        ]
      },
      {
        id: "java-c06-u5-l2-anatomia-e-metodos-stringbuilder",
        title: "A classe StringBuilder e buffer dinâmico mutável",
        subtitle: "StringBuilder · Modificando sequências de caracteres sem gerar novos objetos",
        theory: "A classe java.lang.StringBuilder encapsula um array interno mutável de caracteres (ou bytes compactados desde o Java 9). Ela permite modificar, acrescentar e reordenar dados textuais no mesmo espaço de memória, convertendo o resultado em String através do método toString() apenas ao final do processamento.",
        questions: [
          q("Qual é a principal característica estrutural de StringBuilder em relação a String?", "É mutável, permitindo alterar seu conteúdo sem criar novos objetos na memória a cada edição", ["É imutável e thread-safe por padrão","Só aceita números inteiros"], "StringBuilder mantém um buffer mutável que cresce sob demanda sem recriar o contêiner."),
          q("Qual método de StringBuilder é utilizado para adicionar novos dados ao final da sequência?", "sb.append(...)", ["sb.add(...)","sb.push(...)","sb.concat(...)"], "append(...) é o método central de acúmulo, sobrecarregado para todos os primitivos e objetos."),
          q("Como se extrai a String final definitiva a partir de uma instância de StringBuilder?", "sb.toString()", ["sb.getString()","sb.asString()","sb.build()"], "toString() materializa a sequência de caracteres acumulada em uma nova instância final de String."),
          q("Qual é o padrão de design adotado pelos métodos de StringBuilder que permite chamadas encadeadas?", "Fluent Interface (Method Chaining: os métodos retornam this)", ["Singleton Pattern","Factory Method","Observer Pattern"], "Retornar this ao final de cada método permite encadear chamadas como sb.append(\"A\").append(\"B\")."),
          t("Qual método de StringBuilder converte o buffer mutável na String imutável final?", ["toString","toString()"], "toString() produz a String imutável a partir do buffer.", "String resultado = sb.____();"),
          g("Complete o acréscimo de uma nova linha ao StringBuilder com método encadeado.", ["append"], "append insere novos dados no final do buffer.", "sb.____(\"Linha 1\n\");"),
          o("Ordene as etapas recomendadas para acumular texto com StringBuilder.", ["Instanciar StringBuilder sb = new StringBuilder()","Iterar em laço invocando sb.append(dado) para cada item","Executar métodos de ajuste como insert ou delete se necessário","Chamar sb.toString() para produzir o resultado textual imutável"], "O fluxo preserva a eficiência da mutabilidade local e entrega uma String imutável e segura ao final."),
          p("Associe o método de StringBuilder à sua ação no buffer.", [["sb.append(valor)","Acrescenta o valor ao final do buffer"],["sb.insert(offset, valor)","Insere o valor na posição de índice indicada"],["sb.delete(inicio, fim)","Remove o trecho de caracteres no intervalo semiaberto"],["sb.reverse()","Inverte a ordem de todos os caracteres in-place"]], "StringBuilder disponibiliza operações de edição completas com altíssima performance.")
        ]
      },
      {
        id: "java-c06-u5-l3-capacidade-e-redimensionamento",
        title: "Capacidade interna e estratégia de redimensionamento",
        subtitle: "StringBuilder · Evitando realocações de buffers prevendo o tamanho com capacity",
        theory: "Um StringBuilder possui duas medidas distintas: length() (quantidade de caracteres gravados) e capacity() (tamanho do array interno reservado, cujo padrão inicial é 16). Quando o conteúdo excede a capacidade atual, o buffer dobra de tamanho automaticamente ((capacidade * 2) + 2) e copia os dados para um novo array.",
        questions: [
          q("Qual é a capacidade interna inicial padrão de um StringBuilder instanciado com new StringBuilder()?", "16 caracteres", ["0 caracteres","32 caracteres","128 caracteres"], "O construtor sem argumentos aloca um buffer inicial de 16 posições por padrão na JVM."),
          q("O que acontece internamente quando o texto adicionado excede a capacidade atual do buffer?", "A JVM aloca um novo array interno maior, copia os dados e descarta o array anterior", ["Lança exceção BufferOverflowException","O texto excedente é truncado"], "O crescimento automático garante espaço contínuo, mas acarreta custo de cópia de memória."),
          q("Como prevenir alocações e cópias repetidas de buffer quando sabemos que o texto terá cerca de 1000 caracteres?", "new StringBuilder(1000) (especificando a capacidade inicial estimada)", ["sb.setCapacity(1000)","sb.expand(1000)","new StringBuilder().capacity(1000)"], "Pré-alocar a capacidade necessária garante zero realocações de memória durante todo o processo."),
          q("Qual é a diferença conceitual entre sb.length() e sb.capacity()?", "length mede os caracteres úteis gravados; capacity mede o tamanho do array interno alocado", ["capacity é em bytes e length é em bits","Ambos devolvem o mesmo valor sempre"], "length() é a porção preenchida do buffer; capacity() é a capacidade física total disponível antes de expandir."),
          t("Qual construtor de StringBuilder aceita um número inteiro para definir a capacidade inicial?", ["new StringBuilder(int)","new StringBuilder(capacidade)","StringBuilder(int)"], "Passar um inteiro no construtor dimensiona a capacidade inicial.", "StringBuilder sb = new StringBuilder(____); // capacidade estimada"),
          g("Complete o método que consulta a capacidade física alocada do buffer interno.", ["capacity()"], "capacity() informa o tamanho atual do buffer antes de expandir.", "int espaco = sb.____;"),
          o("Ordene os eventos do redimensionamento automático de um StringBuilder.", ["sb.append() detecta que length + novoTexto > capacity","Calcula nova capacidade expandida ((capacidadeAtual * 2) + 2)","Aloca novo array com a nova capacidade no heap","Copia os caracteres antigos para o novo array","Armazena os novos caracteres no espaço liberado"], "Compreender o custo do redimensionamento reforça o valor de dimensionar capacidades previamente."),
          p("Associe a inicialização do StringBuilder à sua capacidade.", [["new StringBuilder()","Capacidade inicial padrão de 16 caracteres"],["new StringBuilder(100)","Capacidade inicial pré-alocada de 100 posições"],["new StringBuilder(\"Texto\")","Capacidade inicial de 16 + tamanho da string (\"Texto\".length())"],["sb.trimToSize()","Reduz o buffer interno para casar exatamente com o length atual"]], "Dimensionar buffers previamente é um dos segredos da alta performance em processamento de dados.")
        ]
      },
      {
        id: "java-c06-u5-l4-edicao-insert-delete-reverse",
        title: "Operações avançadas de edição no buffer",
        subtitle: "StringBuilder · Inserções intermediárias, deleções por faixa e reversão in-place",
        theory: "Além do append, StringBuilder suporta manipulações cirúrgicas: sb.insert(i, dado) abre espaço e insere texto na posição i; sb.delete(inicio, fim) remove um intervalo de caracteres; sb.deleteCharAt(i) remove um único caractere pontual; e sb.reverse() inverte todo o texto in-place sem alocação extra.",
        questions: [
          q("Qual método de StringBuilder inverte toda a sequência de caracteres diretamente no buffer?", "sb.reverse()", ["sb.invert()","sb.flip()","sb.backwards()"], "reverse() executa a inversão in-place com algoritmo de dois ponteiros sobre o array interno."),
          q("O que faz a instrução sb.delete(2, 5) em um buffer com o texto \"01234567\"?", "Remove os caracteres nos índices 2, 3 e 4, resultando em \"01567\"", ["Remove os índices 2 e 5 apenas","Remove os índices de 2 até 5 inclusive"], "A deleção segue a convenção de intervalos semiabertos em Java: início inclusivo e fim exclusivo."),
          q("Qual método remove um caractere em uma posição específica sem precisar passar intervalo?", "sb.deleteCharAt(indice)", ["sb.removeChar(indice)","sb.drop(indice)","sb.pop(indice)"], "deleteCharAt(i) é a forma canônica e direta para remover um único caractere."),
          q("Qual é o custo computacional de invocar sb.insert(0, \"A\") em um StringBuilder grande?", "O(n), pois todos os caracteres existentes precisam ser deslocados para a direita na memória", ["O(1) instantâneo","O(log n)"], "Inserções no início ou meio exigem mover blocos de array com System.arraycopy interno."),
          t("Qual método de StringBuilder remove um único caractere no índice fornecido?", ["deleteCharAt","deleteCharAt()"], "deleteCharAt() remove pontualmente um elemento do buffer.", "sb.____(0); // remove o primeiro caractere"),
          g("Complete a instrução para inverter toda a palavra contida no StringBuilder.", ["reverse()"], "reverse() inverte os caracteres in-place.", "sb.____;"),
          o("Ordene as operações para verificar se uma palavra é um palíndromo usando StringBuilder.", ["Instanciar StringBuilder com a palavra original","Invocar sb.reverse() para inverter o buffer de caracteres in-place","Converter o buffer em String com sb.toString()","Comparar o resultado com a palavra original usando equals()"], "StringBuilder oferece a forma mais concisa de inverter strings para checagem de palíndromos."),
          p("Associe o método de edição ao seu resultado prático.", [["sb.insert(0, \"[INFO] \")","Prefixa o texto no início do buffer deslocando o conteúdo"],["sb.deleteCharAt(sb.length() - 1)","Remove o último caractere (útil para eliminar vírgulas extras)"],["sb.setCharAt(0, 'X')","Sobrescreve diretamente um único caractere no índice informado"],["sb.reverse()","Inverte todos os caracteres de ponta a ponta"]], "As funções de edição fornecem poder total de processamento textual sem a sobrecarga de imutabilidade.")
        ]
      },
      {
        id: "java-c06-u5-l5-stringbuilder-vs-stringbuffer",
        title: "StringBuilder vs StringBuffer e concorrência",
        subtitle: "StringBuilder · Desempenho sem travas vs sincronização thread-safe histórica",
        theory: "Historicamente, a primeira classe de texto mutável em Java foi java.lang.StringBuffer (Java 1.0), cujos métodos são todos synchronized para segurança em multithreading. No Java 5, introduziu-se StringBuilder, idêntica em API mas sem sincronização, sendo muito mais rápida e a escolha unânime para escopos locais.",
        questions: [
          q("Qual é a diferença fundamental entre StringBuilder e StringBuffer em Java?", "StringBuffer é sincronizado (thread-safe); StringBuilder não é sincronizado e é mais rápido", ["StringBuilder é imutável e StringBuffer é mutável","StringBuilder só existe no Android"], "StringBuilder removeu as travas de sincronização desnecessárias, ganhando máxima velocidade."),
          q("Por que 99% das manipulações textuais na indústria utilizam StringBuilder e não StringBuffer?", "Porque buffers textuais costumam viver em variáveis locais de métodos, onde concorrência inexiste", ["Porque StringBuffer foi descontinuado e apagado da JVM","Porque StringBuffer consome o dobro de RAM"], "Variáveis locais vivem no stack frame privativo da thread, tornando travas de sincronização mero desperdício."),
          q("Em que raro cenário StringBuffer ainda pode ser considerado?", "Quando múltiplas threads compartilham e editam concorrentemente a mesma instância de buffer", ["Em código executado no navegador","Para ler arquivos de texto do disco"], "Se houver compartilhamento concorrente real entre threads, métodos synchronized protegem o estado."),
          q("O que acontece se duas threads acessarem e executarem .append() no mesmo StringBuilder simultaneamente?", "Condições de corrida corromperão o array interno ou lançarão exceções de índice", ["O StringBuilder bloqueia automaticamente a segunda thread","A JVM serializa as chamadas"], "A ausência de sincronização no StringBuilder exige que ele seja mantido confinado em uma única thread."),
          t("Qual palavra-chave torna os métodos de StringBuffer seguros para concorrência?", ["synchronized"], "synchronized impõe travas de exclusão mútua em métodos compartilhados.", "public ____ StringBuffer append(String str) { }"),
          g("Complete o conceito: StringBuilder é a escolha moderna por não ter o overhead de ____.", ["sincronizacao","sincronização"], "A ausência de sincronização confere máxima velocidade ao StringBuilder.", "Livre de travas de ____ entre threads."),
          o("Ordene a evolução histórica das classes de texto mutável em Java.", ["Java 1.0 lança StringBuffer com sincronização intrínseca em todos os métodos","Desenvolvedores notam perda de performance por travas em escopos locais","Java 5 introduz StringBuilder com a mesma API, porém sem sincronização","StringBuilder torna-se o padrão incontestável para código de alta performance"], "Compreender essa evolução histórica explica a coexistência pacífica de ambas as classes no JDK."),
          p("Associe a classe de texto ao seu perfil operacional.", [["String","Imutável, thread-safe por projeto, reuso no String Pool"],["StringBuilder","Mutável, não sincronizada, ultrarrápida, ideal para uso local"],["StringBuffer","Mutável, sincronizada (thread-safe), legada do Java 1.0"],["StringJoiner","Formatador moderno para unir coleções com delimitadores"]], "A escolha acertada entre String, StringBuilder e StringBuffer alinha desempenho e corretude concorrente.")
        ]
      }
    ],
    6: [
      {
        id: "java-c06-u6-l1-busca-linear-em-arrays",
        title: "Busca linear sequencial em arrays não ordenados",
        subtitle: "Busca · Varredura exaustiva elemento por elemento com complexidade O(n)",
        theory: "A busca linear é o algoritmo mais simples para localizar um elemento em uma coleção não ordenada. Ela percorre o array a partir do índice 0, comparando cada posição com o alvo desejado. Se encontrar correspondência, retorna o índice imediatamente; se alcançar o fim do array sem encontrar, devolve -1.",
        questions: [
          q("Qual é a complexidade de tempo de pior caso da busca linear em um array com n elementos?", "O(n) - tempo linear proporcional ao tamanho do array", ["O(1) - tempo constante","O(log n)","O(n²)"], "No pior caso (elemento na última posição ou inexistente), o algoritmo precisa inspecionar todas as n posições."),
          q("Qual é a grande vantagem da busca linear em relação a algoritmos mais sofisticados?", "Funciona em coleções totalmente desordenadas sem exigir pré-processamento", ["É o algoritmo mais rápido para coleções com milhões de itens","Executa em tempo O(1)"], "Não requer que os dados estejam ordenados nem exige estruturas auxiliares indexadas."),
          q("Qual valor convenciona-se retornar quando o elemento alvo não é encontrado no array?", "-1", ["0","Integer.MIN_VALUE","null"], "O índice -1 sinaliza com clareza ausência posicional, pois índices válidos em Java vão de 0 a length - 1."),
          q("Para arrays de objetos (ex: String[]), qual comparação deve ser feita na busca linear?", "alvo.equals(arr[i]) (ou Objects.equals(alvo, arr[i]))", ["alvo == arr[i]","alvo != arr[i]","alvo.compareTo(arr[i]) == 1"], "Objetos exigem comparação por conteúdo semântico com equals(), evitando falsos negativos do operador ==."),
          t("Qual convenção de número negativo representa a ausência de índice em buscas?", ["-1"], "-1 indica que o item buscado não existe na coleção.", "if (!encontrado) return ____;"),
          g("Complete o teste de igualdade para a busca linear de um número inteiro no array.", ["arr[i] == alvo"], "A correspondência imediata com o alvo encerra a busca.", "if (____) return i;"),
          o("Ordene os passos da busca linear clássica com saída antecipada.", ["Inicializar laço for com índice i variando de 0 até length - 1","Comparar o elemento da posição atual com o valor procurado","Se forem iguais, retornar o índice i imediatamente","Se o laço terminar sem encontrar, retornar o sentinela -1"], "A saída precoce ao encontrar o alvo transforma o caso médio em n / 2 comparações."),
          p("Associe o caso da busca linear ao número de comparações necessárias.", [["Melhor caso (Best Case)","1 comparação (o alvo é o primeiro elemento no índice 0)"],["Pior caso (Worst Case)","n comparações (o alvo está na última posição ou não existe)"],["Caso médio (Average Case)","Aproximadamente n / 2 comparações"],["Coleção não ordenada","Cenário ideal onde busca linear é a única opção direta"]], "A busca linear é a base de comparação para todos os algoritmos de pesquisa.")
        ]
      },
      {
        id: "java-c06-u6-l2-busca-com-saida-antecipada-e-sentinela",
        title: "Otimização com sentinela e saídas antecipadas",
        subtitle: "Busca · Eliminando checagens de limites de laço para máxima performance",
        theory: "Testar a fronteira do array (i < length) a cada iteração consome ciclos de CPU. A busca com sentinela grava temporariamente o alvo na última posição do array, permitindo um laço sem teste de limite; ao final, restaura-se o valor original e confere-se se o encontro ocorreu antes do final.",
        questions: [
          q("Qual instrução é eliminada na condição do laço while ao utilizar o algoritmo de busca com sentinela?", "A verificação contínua de limite de índice (i < arr.length)", ["A comparação de igualdade com o alvo","O incremento de índice i++"], "Ao garantir que o alvo estará no fim da coleção, o laço tem parada garantida sem testar limites."),
          q("Qual é o primeiro passo para preparar um array para a busca linear com sentinela?", "Salvar o último elemento original em uma variável e gravar o alvo na última posição", ["Ordenar todo o array com QuickSort","Alocar um novo array no heap"], "Gravar o alvo na última posição atua como \"guarda de trânsito\" (sentinela) contra estouros de índice."),
          q("Após o término do laço com sentinela, qual verificação final confirma se o elemento existia de fato?", "Se o índice i parou antes do último índice, ou se o valor original do último era igual ao alvo", ["Se o índice i for igual a zero","Se a memória heap foi desalocada"], "Como o alvo foi gravado na última posição, deve-se conferir se o encontro foi legítimo ou artificial."),
          q("Em que contextos essa micro-otimização com sentinela é vantajosa?", "Em rotinas de altíssima frequência de busca em sistemas de tempo real ou drivers de baixo nível", ["Em aplicações web comuns com poucos dados","Em buscas de texto no banco de dados"], "Eliminar um desvio condicional por iteração em bilhões de repetições produz ganho mensurável."),
          t("Como se chama o valor fictício posicionado na fronteira para garantir a parada do laço?", ["sentinela"], "O elemento colocado para forçar a parada atua como sentinela.", "Técnica conhecida como busca com ____."),
          g("Complete o laço que percorre o array com parada garantida pela sentinela.", ["arr[i] != alvo"], "O laço itera sem testar i < len porque o alvo certamente será encontrado.", "while (____) { i++; }"),
          o("Ordene as etapas da busca linear com elemento sentinela.", ["Armazenar o último elemento original em int ultimoOriginal = arr[len - 1]","Posicionar o alvo na última célula arr[len - 1] = alvo","Executar while (arr[i] != alvo) com simples i++","Restaurar arr[len - 1] = ultimoOriginal","Avaliar se i < len - 1 ou se ultimoOriginal == alvo para retornar i ou -1"], "A sentinela exemplifica como criatividade algorítmica remove instruções de máquina redundantes."),
          p("Associe a técnica de busca à sua característica de verificação.", [["Busca linear padrão","Duas comparações por iteração: teste de limite (i < n) e de valor (arr[i] == x)"],["Busca com sentinela","Uma única comparação por iteração: apenas teste de valor (arr[i] != x)"],["Saída antecipada (break/return)","Interrompe a busca assim que o elemento é localizado"],["Restauração da sentinela","Passo mandatório para não deixar o array original corrompido"]], "Otimizações de sentinela demonstram como economizar instruções na camada de bytecode.")
        ]
      },
      {
        id: "java-c06-u6-l3-busca-binaria-em-arrays-ordenados",
        title: "Busca binária em coleções ordenadas O(log n)",
        subtitle: "Busca · Divisão e conquista com espaço de busca reduzido pela metade a cada passo",
        theory: "A busca binária é um algoritmo de alta eficiência para arrays previamente ordenados. Ela compara o alvo com o elemento central da faixa: se for igual, encerra com sucesso; se o alvo for menor, descarta a metade direita; se for maior, descarta a metade esquerda. Isso garante complexidade de tempo O(log n).",
        questions: [
          q("Qual é o pré-requisito mandatório e inegociável para aplicar a busca binária em um array?", "O array deve estar estritamente ordenado de acordo com o critério de comparação", ["O array deve ter tamanho par","Todos os elementos devem ser números inteiros"], "Se o array não estiver ordenado, o algoritmo descartará a metade errada e falhará silenciosamente."),
          q("Qual é a complexidade de tempo de pior caso da busca binária em um array com 1.000.000 de elementos?", "Aproximadamente 20 comparações (tempo logarítmico O(log₂ n))", ["1.000.000 de comparações","500.000 de comparações","1 comparação"], "Como 2²⁰ ≈ 1.048.576, a busca binária examina no máximo 20 elementos em uma lista de 1 milhão de itens."),
          q("Como calcular o índice do meio de forma segura para evitar estouro de inteiros positivos?", "int meio = inicio + (fim - inicio) / 2;", ["int meio = (inicio + fim) / 2;","int meio = (inicio * fim) / 2;","int meio = fim - inicio;"], "A fórmula clássica (inicio + fim) pode sofrer overflow aritmético se a soma ultrapassar Integer.MAX_VALUE."),
          q("O que acontece com os limites inicio e fim quando o valor do meio é menor que o alvo?", "O limite inicio avança para meio + 1, descartando toda a metade esquerda", ["O limite fim recua para meio - 1","Ambos voltam para zero"], "Como o meio é menor que o alvo, nenhum valor à esquerda do meio pode ser a resposta."),
          t("Qual fórmula evita o estouro aritmético de inteiros no cálculo do ponto central?", ["inicio + (fim - inicio) / 2"], "Essa formulação matemática impede que valores grandes estourem o limite de 32 bits.", "int meio = ____;"),
          g("Complete o avanço da fronteira inferior quando o elemento central é menor que o alvo.", ["meio + 1"], "Descartamos a metade esquerda e o próprio meio avançando para meio + 1.", "if (arr[meio] < alvo) inicio = ____;"),
          o("Ordene as etapas da busca binária em cada ciclo de iteração.", ["Calcular o índice central seguro meio = inicio + (fim - inicio) / 2","Comparar arr[meio] com o alvo procurado","Se igual, retornar meio celebrando o sucesso","Se arr[meio] < alvo, ajustar inicio = meio + 1; senão ajustar fim = meio - 1"], "A divisão sucessiva por 2 encolhe o espaço de busca com velocidade exponencial."),
          p("Associe a comparação do elemento central ao ajuste de fronteira na busca binária.", [["arr[meio] == alvo","Retorna o índice meio imediatamente (sucesso)"],["arr[meio] < alvo","Ajusta inicio = meio + 1 (alvo está na metade direita)"],["arr[meio] > alvo","Ajusta fim = meio - 1 (alvo está na metade esquerda)"],["inicio > fim","Encerra o laço e retorna -1 (alvo inexistente no array)"]], "A busca binária é um dos algoritmos fundamentais mais reverenciados da ciência da computação.")
        ]
      },
      {
        id: "java-c06-u6-l4-arrays-binarysearch-e-ponto-insercao",
        title: "O método Arrays.binarySearch e ponto de inserção",
        subtitle: "Busca · Decodificando índices negativos -(pontoDeInsercao + 1) da biblioteca padrão",
        theory: "A classe java.util.Arrays fornece o método Arrays.binarySearch(arr, chave). Quando a chave é encontrada, seu índice >= 0 é retornado. Quando ausente, o método devolve um valor negativo codificado pela fórmula -(pontoDeInserção + 1), revelando exatamente onde a chave deveria ser inserida para manter o array ordenado.",
        questions: [
          q("O que significa o retorno de um número negativo no método Arrays.binarySearch(arr, chave)?", "A chave não foi encontrada, e o valor negativo codifica onde ela deveria ser inserida", ["Ocorreu um erro de compilação ou arquivo corrompido","O array continha números negativos"], "Valores negativos comunicam simultaneamente ausência e o ponto exato de inserção futura."),
          q("Se Arrays.binarySearch devolver -1, qual é o ponto de inserção do elemento buscado?", "Índice 0 (pois -(-1) - 1 = 0: o elemento é menor que todos os itens do array)", ["Índice 1","Último índice","Array corrompido"], "Pela fórmula -(ponto + 1), o valor -1 decodifica para -(0 + 1) = -1; portanto, ponto = 0."),
          q("Como recuperar o índice real de inserção a partir do retorno negativo ret?", "int pontoInsercao = -ret - 1;", ["int pontoInsercao = Math.abs(ret);","int pontoInsercao = ret * -1;","int pontoInsercao = -ret;"], "A inversão algébrica da fórmula -(ponto + 1) é dada por -ret - 1."),
          q("O que acontece se invocarmos Arrays.binarySearch em um array que não está ordenado?", "O resultado é indefinido (pode retornar índice errado ou valor negativo falso)", ["Lança IllegalArgumentException imediatamente","A JVM ordena o array antes de buscar"], "A documentação oficial alerta que os resultados são imprevisíveis se o array estiver desordenado."),
          t("Qual método utilitário estático da classe Arrays executa busca binária nativa?", ["Arrays.binarySearch","binarySearch"], "Arrays.binarySearch é o método padrão da plataforma.", "int idx = ____(numeros, 42);"),
          g("Complete a fórmula matemática para extrair o ponto de inserção do valor negativo.", ["-resultado - 1","-res - 1"], "A fórmula reconverte a codificação em índice posicional válido.", "int insercao = ____;"),
          o("Ordene a interpretação do retorno de Arrays.binarySearch(arr, chave).", ["Executar int res = Arrays.binarySearch(arr, chave)","Avaliar se res >= 0 (se verdadeiro, item existe no índice res)","Se negativo, calcular int ponto = -res - 1","Utilizar a posição ponto para inserção ordenada sem quebrar a sequência"], "Essa codificação elegante economiza métodos adicionais na API padrão do Java."),
          p("Associe o valor retornado por Arrays.binarySearch à sua interpretação.", [["res >= 0","Elemento encontrado exatamente no índice res"],["res == -1","Não encontrado: deveria ser inserido no índice 0"],["res == -(len + 1)","Não encontrado: é maior que todos, deve ir para o fim"],["Array desordenado","Comportamento indefinido: viola o contrato da busca"]], "Compreender o ponto de inserção negativo transforma buscas em rotinas de inserção ordenada.")
        ]
      },
      {
        id: "java-c06-u6-l5-busca-de-padroes-regex-matcher",
        title: "Busca de padrões textuais com Pattern e Matcher",
        subtitle: "Busca · Expressões regulares compiladas e varredura de padrões no Java",
        theory: "Para buscas textuais avançadas onde alvos literais são insuficientes, o Java disponibiliza o pacote java.util.regex com Pattern e Matcher. Compilar a expressão com Pattern.compile() e avaliar com matcher.find() permite percorrer sequencialmente todas as ocorrências de padrões complexos como datas, e-mails ou números.",
        questions: [
          q("Por que deve-se compilar expressões regulares com Pattern.compile() em vez de usar str.matches() em loops?", "Pattern.compile() cria a máquina de estados uma única vez, evitando recompilações caras", ["str.matches() não suporta caracteres alfanuméricos","Pattern é o único compatível com números"], "str.matches() recompila a regex a cada invocação; Pattern.compile() permite reaproveitamento eficiente."),
          q("Qual método do Matcher é usado em um laço while para iterar por todas as ocorrências do padrão no texto?", "matcher.find()", ["matcher.matches()","matcher.next()","matcher.hasNext()"], "find() localiza a próxima subsequência que satisfaz o padrão, avançando o cursor de leitura."),
          q("Qual método do Matcher extrai o texto exato capturado pela ocorrência atual de find()?", "matcher.group()", ["matcher.value()","matcher.text()","matcher.extract()"], "group() devolve a substring casada pela iteração atual do analisador léxico."),
          q("Qual é a diferença entre matcher.matches() e matcher.find()?", "matches() exige que o texto inteiro corresponda à regex; find() procura ocorrências em trechos do texto", ["matches() é para números e find() é para letras","São sinônimos idênticos"], "matches() valida a cadeia de ponta a ponta; find() funciona como localizador de substrings."),
          t("Qual método da classe Pattern compila a expressão regular em uma máquina de estados reutilizável?", ["Pattern.compile","compile"], "Pattern.compile gera a representação compilada da regex.", "Pattern p = ____(\"\\\\d+\");"),
          g("Complete o laço que processa todas as ocorrências encontradas pelo Matcher no texto.", ["matcher.find()"], "matcher.find() avança o cursor até a próxima ocorrência.", "while (____) { String item = matcher.group(); }"),
          o("Ordene as etapas canônicas para buscar padrões em texto com java.util.regex.", ["Compilar a regex com Pattern p = Pattern.compile(regex)","Criar o motor de correspondência com Matcher m = p.matcher(texto)","Iterar sobre o texto com while (m.find())","Obter o trecho casado em cada volta com m.group()"], "O fluxo Pattern-Matcher é a fundação para validações e extrações textuais robustas em Java."),
          p("Associe o método de Matcher à sua respectiva função.", [["matcher.find()","Busca a próxima ocorrência do padrão no texto"],["matcher.group()","Retorna o texto da correspondência encontrada"],["matcher.start()","Retorna o índice inicial da correspondência no texto"],["matcher.matches()","Valida se o texto completo obedece ao padrão"]], "Dominar expressões regulares e a API de Matcher expande a capacidade de parsing de logs e dados.")
        ]
      }
    ],
    7: [
      {
        id: "java-c06-u7-l1-bubble-sort-trocas-adjacentes",
        title: "Bubble Sort e a mecânica de trocas adjacentes",
        subtitle: "Ordenação · Borbulhando os maiores valores para o final com complexidade O(n²)",
        theory: "O Bubble Sort é o algoritmo didático clássico de ordenação. Ele percorre o array comparando pares adjacentes e trocando-os de posição se estiverem fora de ordem. A cada passagem completa, o maior elemento remanescente \"borbulha\" para sua posição definitiva no final do array. Uma flag de troca permite parada antecipada.",
        questions: [
          q("Como o algoritmo Bubble Sort posiciona os elementos em ordem crescente?", "Compara elementos adjacentes sucessivamente e troca se o da esquerda for maior que o da direita", ["Divide o array ao meio e mescla as partes","Seleciona sempre o menor elemento de todo o array"], "O movimento contínuo de trocas adjacentes empurra o maior item para o fim da sequência a cada passagem."),
          q("Qual é a complexidade temporal de pior caso do algoritmo Bubble Sort?", "O(n²) - tempo quadrático no número de elementos", ["O(n log n)","O(n)","O(1)"], "Quando o array está em ordem decrescente reversa, são necessárias n * (n - 1) / 2 comparações e trocas."),
          q("Como otimizar o Bubble Sort para alcançar tempo linear O(n) no melhor caso?", "Usando uma variável booleana que detecta se nenhuma troca ocorreu durante uma passagem completa", ["Dividindo o array em três partes","Usando laço while infinito"], "Se nenhuma troca for realizada em uma passagem, o array já está 100% ordenado e o laço pode ser interrompido."),
          q("O Bubble Sort é classificado como um algoritmo de ordenação estável?", "Sim, porque ele não troca elementos adjacentes que possuem valores estritamente iguais", ["Não, ele sempre inverte elementos iguais","Apenas para números pares"], "A estabilidade preserva a ordem relativa original de elementos com chaves de mesmo valor."),
          t("Qual variável booleana de controle permite interromper o Bubble Sort precocemente?", ["trocou","houveTroca","swapped"], "Uma flag booleana detecta a ausência de trocas em um array já ordenado.", "boolean ____ = false;"),
          g("Complete o teste de adjacência que aciona a troca no Bubble Sort.", ["arr[j] > arr[j + 1]"], "Se o elemento atual for maior que o próximo adjacente, deve ocorrer a troca.", "if (____) { trocar(arr, j, j + 1); trocou = true; }"),
          o("Ordene as etapas de uma passagem do Bubble Sort otimizado.", ["Definir a variável booleana houveTroca como false no início da rodada","Percorrer pares adjacentes de j = 0 até n - 1 - i","Trocar elementos adjacentes se arr[j] > arr[j+1] e marcar houveTroca = true","Se houveTroca permanecer false ao fim da passagem, interromper o algoritmo"], "A flag de controle reduz o tempo para O(n) caso os dados já estejam ordenados."),
          p("Associe o cenário do Bubble Sort à sua complexidade correspondente.", [["Melhor caso (array já ordenado com flag)","O(n) linear: encerra na primeira passagem"],["Pior caso (array em ordem inversa)","O(n²) quadrático: executa o número máximo de trocas"],["Caso médio","O(n²) quadrático com metade das trocas do pior caso"],["Consumo de memória auxiliar","O(1) constante: opera in-place"]], "O Bubble Sort é ideal para aprendizado de fundamentos de ordenação e trocas in-place.")
        ]
      },
      {
        id: "java-c06-u7-l2-selection-sort-menor-elemento",
        title: "Selection Sort e a seleção sucessiva do mínimo",
        subtitle: "Ordenação · Minimizando a quantidade de trocas com seleção posicional O(n²)",
        theory: "O Selection Sort divide o array conceitualmente em duas partes: a sublista ordenada à esquerda e a sublista não ordenada à direita. A cada iteração, ele busca o menor elemento da porção não ordenada e o troca com o primeiro elemento dessa porção, executando no máximo n trocas em toda a ordenação.",
        questions: [
          q("Qual é a estratégia central do algoritmo Selection Sort?", "Localizar o menor elemento remanescente e posicioná-lo no início da fatia não ordenada", ["Comparar elementos adjacentes aos pares continuamente","Inserir itens como em uma mão de cartas de baralho"], "O algoritmo \"seleciona\" repetidamente o menor valor e o coloca em sua posição definitiva."),
          q("Quantas trocas físicas de elementos o Selection Sort executa no pior caso em um array de tamanho n?", "No máximo n - 1 trocas", ["n² trocas","n / 2 trocas","n log n trocas"], "Diferente do Bubble Sort, o Selection Sort faz apenas uma única troca ao final de cada varredura de busca de mínimo."),
          q("Qual é a complexidade temporal de comparações do Selection Sort em qualquer cenário?", "Sempre O(n²), tanto no melhor quanto no pior caso", ["O(n) no melhor caso","O(n log n)","O(1)"], "O algoritmo obrigatoriamente inspeciona todos os elementos não ordenados para ter certeza de qual é o menor."),
          q("Por que o Selection Sort tradicional é considerado instável?", "Porque a troca de longa distância pode saltar sobre elementos de mesmo valor, invertendo sua ordem", ["Porque ele altera o tamanho do array","Porque lança exceções aleatórias"], "Trocas distantes podem reposicionar um elemento igual atrás de outro, quebrando a estabilidade."),
          t("Quantas trocas físicas de posição no máximo o Selection Sort realiza por passagem?", ["1","uma"], "O algoritmo faz no máximo uma troca por iteração externa.", "Executa exatamente ____ troca por ciclo."),
          g("Complete a atualização do índice do menor elemento encontrado na varredura.", ["arr[j] < arr[minIdx]"], "Se o item atual for menor que o mínimo corrente, o índice do mínimo é atualizado.", "if (____) minIdx = j;"),
          o("Ordene as etapas de uma iteração do Selection Sort.", ["Marcar o início da fatia não ordenada como o índice mínimo provisório (minIdx = i)","Percorrer o restante do array de j = i + 1 até n - 1","Atualizar minIdx se encontrar algum elemento menor que arr[minIdx]","Se minIdx != i, trocar os elementos das posições i e minIdx"], "A separação entre busca do mínimo e troca única é a assinatura do Selection Sort."),
          p("Associe a característica ao algoritmo correspondente.", [["Selection Sort","No máximo n trocas físicas; sempre O(n²) comparações"],["Bubble Sort","Até n² trocas; O(n) no melhor caso com flag de parada"],["Espaço auxiliar de ambos","O(1) in-place: nenhuma memória adicional no heap"],["Troca de longa distância","Causa da instabilidade do Selection Sort"]], "Selection Sort é vantajoso quando o custo de escrever na memória é substancialmente alto.")
        ]
      },
      {
        id: "java-c06-u7-l3-insertion-sort-cartas-de-baralho",
        title: "Insertion Sort e ordenação por inserção incremental",
        subtitle: "Ordenação · Eficiência máxima O(n) para dados quase ordenados e coleções pequenas",
        theory: "O Insertion Sort funciona de forma análoga à organização de cartas de baralho na mão: ele percorre o array da esquerda para a direita, pegando um elemento (chave) e deslocando para a direita todos os itens maiores já ordenados para abrir espaço e inserir a chave em sua posição correta.",
        questions: [
          q("Qual é o comportamento do Insertion Sort ao processar um array que já está previamente ordenado?", "Executa em tempo linear O(n), realizando apenas uma comparação por elemento sem deslocamentos", ["Executa em tempo quadrático O(n²)","Lança erro de compilação"], "Para dados já ordenados ou quase ordenados, o Insertion Sort é um dos algoritmos mais rápidos existentes."),
          q("Qual metáfora do mundo real descreve perfeitamente o funcionamento do Insertion Sort?", "Organizar cartas de baralho na mão, inserindo cada nova carta na posição correta entre as anteriores", ["Uma bolha de ar subindo na água","Uma fila de banco"], "Pega-se uma carta de cada vez e abre-se espaço entre as cartas já ordenadas para encaixá-la."),
          q("O que acontece durante a fase de deslocamento do Insertion Sort?", "Elementos maiores que a chave são copiados uma posição à direita no array (arr[j + 1] = arr[j])", ["Os elementos são somados","Os elementos são removidos da memória"], "O deslocamento abre uma lacuna física no índice adequado para a gravação da chave."),
          q("O Insertion Sort é um algoritmo estável e in-place?", "Sim, ele é estável (preserva posições de iguais) e in-place (consome apenas O(1) de memória extra)", ["Não, ele exige um array auxiliar","Ele é in-place mas não é estável"], "Como elementos iguais não são deslocados uns sobre os outros, a ordem relativa original é preservada."),
          t("Qual termo em inglês designa o elemento atual retirado temporariamente para inserção correta?", ["key","chave"], "A variável que guarda o item corrente a ser inserido chama-se chave.", "int ____ = arr[i];"),
          g("Complete a condição que desloca os elementos maiores para abrir espaço para a chave.", ["arr[j] > chave"], "Desloca-se à direita enquanto o elemento à esquerda for maior que a chave.", "while (j >= 0 && ____) { arr[j + 1] = arr[j]; j--; }"),
          o("Ordene as instruções para inserir o elemento arr[i] na fatia já ordenada à sua esquerda.", ["Salvar int chave = arr[i] e iniciar j = i - 1","Enquanto j >= 0 e arr[j] > chave, deslocar arr[j + 1] = arr[j]","Decrementar j a cada deslocamento realizado","Gravar a chave na lacuna encontrada arr[j + 1] = chave"], "A técnica de deslocamento evita o overhead de múltiplas operações completas de swap."),
          p("Associe o algoritmo de ordenação ao seu melhor cenário de uso.", [["Insertion Sort","Conjuntos pequenos de dados ou arrays quase 100% ordenados"],["QuickSort","Grandes conjuntos de dados com tipos primitivos em memória"],["TimSort (Java Arrays.sort)","Ordenação padrão de objetos combinando Insertion e Merge Sort"],["Bubble Sort","Fins estritamente didáticos e demonstração de trocas adjacentes"]], "Insertion Sort é a base dos algoritmos híbridos de alta performance modernos.")
        ]
      },
      {
        id: "java-c06-u7-l4-arrays-sort-dual-pivot-timsort",
        title: "A arquitetura de ordenação em Java: Dual-Pivot Quicksort e TimSort",
        subtitle: "Ordenação · Algoritmos de produção em Arrays.sort() para primitivos e objetos",
        theory: "O método oficial java.util.Arrays.sort() não usa algoritmos simples. Para tipos primitivos (int[], double[]), emprega o Dual-Pivot Quicksort de Vladimir Yaroslavskiy, com complexidade O(n log n). Para arrays de objetos (T[]), adota o TimSort, um algoritmo estável híbrido que combina Merge Sort e Insertion Sort.",
        questions: [
          q("Qual algoritmo a JVM utiliza ao ordenar arrays de tipos primitivos com Arrays.sort(int[])?", "Dual-Pivot Quicksort (QuickSort com dois pivôs simultâneos)", ["Bubble Sort otimizado","TimSort híbrido","HeapSort simples"], "O Dual-Pivot Quicksort divide o array em três partições a cada passo, oferecendo velocidade superior em cache de CPU."),
          q("Qual algoritmo a JVM utiliza ao ordenar arrays de objetos com Arrays.sort(Object[])?", "TimSort (algoritmo híbrido e estável baseado em Merge Sort e Insertion Sort)", ["Dual-Pivot Quicksort","Radix Sort","Selection Sort"], "Objetos exigem ordenação estritamente estável (garantida pelo TimSort), para não desordenar campos previamente alinhados."),
          q("Qual é a complexidade temporal média do método Arrays.sort() em Java?", "O(n log n)", ["O(n²)","O(n)","O(log n)"], "Ambos os algoritmos operam no patamar ótimo assintótico de comparações O(n log n)."),
          q("Por que a estabilidade é indispensável ao ordenar arrays de objetos, mas irrelevante para primitivos?", "Porque em primitivos valores iguais são idênticos em bits; em objetos, possuem outros campos associados", ["Porque primitivos não suportam memória heap","Porque o compilador proíbe estabilidade em primitivos"], "Se dois clientes têm a mesma idade, a estabilidade preserva a ordem anterior de cadastro."),
          t("Qual algoritmo híbrido e estável ordena arrays de objetos na biblioteca padrão do Java?", ["TimSort"], "TimSort foi criado por Tim Peters e adotado pelo Java no JDK 7.", "Algoritmo conhecido como ____."),
          g("Complete a instrução ordenando o array de notas com o algoritmo de produção do Java.", ["Arrays.sort"], "Arrays.sort é o ponto de entrada oficial para ordenações de alta performance.", "____(notas);"),
          o("Ordene a decisão interna tomada pelo método Arrays.sort() ao receber um array.", ["Verificar se o array é de tipo primitivo ou de tipo objeto","Se for primitivo, acionar o Dual-Pivot Quicksort focado em velocidade de CPU","Se for objeto, acionar o TimSort garantindo estabilidade","Retornar o array devidamente ordenado in-place em tempo O(n log n)"], "O JDK seleciona dinamicamente a melhor estratégia conforme a natureza da memória."),
          p("Associe o algoritmo nativo de Arrays.sort() à sua característica.", [["Dual-Pivot Quicksort","Usado para primitivos; instável; altíssima localidade de cache"],["TimSort","Usado para objetos; estritamente estável; aproveita sequências já ordenadas"],["Arrays.parallelSort()","Utiliza ForkJoinPool para ordenar grandes arrays em múltiplos núcleos"],["Arrays.sort(arr, de, ate)","Ordena apenas uma fatia específica do array no intervalo semiaberto"]], "Arrays.sort() representa o estado da arte em engenharia de algoritmos de ordenação.")
        ]
      },
      {
        id: "java-c06-u7-l5-comparable-e-comparator",
        title: "Ordenação customizada com Comparable e Comparator",
        subtitle: "Ordenação · Ordem natural vs múltiplos critérios com lambdas modernas",
        theory: "Java oferece duas interfaces para ordenação de objetos: Comparable<T>, que define a \"ordem natural\" através de compareTo(), e Comparator<T>, que possibilita criar critérios externos dinâmicos. A partir do Java 8, métodos estáticos como Comparator.comparing() simplificam a criação de comparadores compostos e reversos.",
        questions: [
          q("Qual método da interface java.lang.Comparable<T> deve ser implementado para ordem natural?", "public int compareTo(T outro)", ["public boolean compare(T outro)","public int equals(T outro)"], "compareTo devolve negativo se this < outro, zero se forem iguais, e positivo se this > outro."),
          q("O que significa o retorno de um número negativo no método compareTo(outro)?", "O objeto atual (this) deve preceder o objeto outro na ordenação crescente", ["O objeto atual deve suceder o outro","Os objetos são considerados iguais"], "Retorno negativo indica que o elemento da esquerda é menor que o da direita."),
          q("Como criar um Comparator de alunos por idade usando a sintaxe moderna do Java 8+?", "Comparator.comparing(Aluno::getIdade)", ["new Comparator().by(Aluno::getIdade)","Aluno.comparator(\"idade\")"], "Comparator.comparing com Method Reference cria comparadores limpos e fortemente tipados."),
          q("Como ordenar uma lista em ordem decrescente a partir de um comparador existente?", "comparador.reversed()", ["comparador.invert()","comparador.descending()","comparador.flip()"], "O método reversed() inverte a polaridade de qualquer comparador instantaneamente."),
          t("Qual interface funcional permite definir critérios de ordenação externos e múltiplos em Java?", ["Comparator"], "Comparator permite criar múltiplos critérios desacoplados da classe.", "____<Produto> porPreco = Comparator.comparing(Produto::getPreco);"),
          g("Complete o comparador ordenando produtos pelo valor do preço em ordem natural.", ["Comparator.comparing"], "Comparator.comparing gera comparadores a partir de extratores de chaves.", "Arrays.sort(produtos, ____(Produto::getPreco));"),
          o("Ordene as diretrizes do contrato de retorno do método compareTo(a, b).", ["Devolver valor negativo (< 0) se a for menor que b","Devolver zero (0) se a for considerado igual a b","Devolver valor positivo (> 0) se a for maior que b","Garantir consistência matemática com equals (se compareTo == 0, equals deve ser true)"], "Seguir rigorosamente o contrato de sinal previne anomalias em árvores e ordenações."),
          p("Associe a interface ao seu propósito arquitetural.", [["Comparable<T> (compareTo)","Ordem natural intrínseca da classe (implementada por ela mesma)"],["Comparator<T> (compare)","Critério de ordenação customizado, externo e intercambiável"],["comp.thenComparing(...)","Desempate secundário encadeado quando o primeiro critério empata"],["Comparator.reverseOrder()","Comparador universal para inverter a ordem natural"]], "A combinação de Comparable e Comparator confere flexibilidade ilimitada na organização de dados.")
        ]
      }
    ],
    8: [
      {
        id: "java-c06-u8-l1-metodo-split-divisao-tokens",
        title: "Divisão de texto em tokens com String.split()",
        subtitle: "Transformação · Quebrando strings com expressões regulares e delimitadores",
        theory: "O método str.split(regex) divide uma string em um array de substrings (tokens) utilizando uma expressão regular como delimitador. É a ferramenta canônica para interpretar linhas CSV, logs estruturados ou frases. O parâmetro opcional limit controla quantas vezes a quebra deve ocorrer e preserva vazios finais.",
        questions: [
          q("O que o método \"banana;maca;uva\".split(\";\") devolve em Java?", "Um array String[] contendo [\"banana\", \"maca\", \"uva\"]", ["Uma lista List<String>","Uma única string compactada"], "split divide o texto em cada encontro do delimitador e empacota os fragmentos em um array de strings."),
          q("Por que split(\".\") requer escape duplo (\"\\\\.\") para quebrar texto em pontos?", "Porque o ponto \".\" é um caractere curinga reservado em regex que casa com qualquer caractere", ["Porque o compilador não reconhece o ponto","Para indicar ponto decimal"], "Como split aceita regex, caracteres especiais (^, $, ., |, ?, *, +, (, )) exigem escape para casamento literal."),
          q("O que acontece por padrão com strings vazias resultantes no final do array quando usamos split(regex)?", "São descartadas silenciosamente pela versão padrão sem o parâmetro limit", ["Permanecem no array normalmente","Lançam exceção"], "Por padrão (limit = 0), fragmentos vazios no final da cadeia são truncados pelo split."),
          q("Como forçar o método split a reter todos os campos vazios finais em uma linha CSV?", "Passando um limite negativo como segundo argumento: str.split(\";\", -1)", ["Usando splitClean(\";\")","Usando str.splitAll(\";\")"], "Passar limit negativo desativa o descarte de strings vazias na cauda do array resultante."),
          t("Qual símbolo de pontuação exige escape com barra dupla \"\\\\\" ao ser usado como separador no split?", [".","ponto"], "O ponto é metacaractere de regex que representa qualquer símbolo.", "String[] partes = ip.split(\"\\\\____\");"),
          g("Complete a divisão da linha CSV em campos preservando eventuais colunas vazias finais.", ["-1"], "O limite -1 preserva todas as colunas vazias na cauda.", "String[] colunas = linha.split(\";\", ____);"),
          o("Ordene as etapas para processar uma linha de texto delimitada por vírgulas.", ["Ler a string bruta contendo dados separados por delimitador","Aplicar str.split(\",\") passando limite quando necessário","Iterar sobre o array String[] resultante","Sanitizar cada fragmento removendo espaços residuais com strip()"], "A quebra em tokens seguida de sanitização é o padrão básico de ingestão de arquivos de dados."),
          p("Associe o separador de split à sintaxe correta com escape.", [["Quebrar por ponto final \".\"","str.split(\"\\\\.\")"],["Quebrar por barra vertical pipe \"|\"","str.split(\"\\\\|\")"],["Quebrar por espaço simples \" \"","str.split(\" \")"],["Quebrar por qualquer sequência de espaços","str.split(\"\\\\s+\")"]], "Lembrar que split opera sobre expressões regulares previne comportamentos acidentais.")
        ]
      },
      {
        id: "java-c06-u8-l2-unindo-strings-com-join-e-stringjoiner",
        title: "União de elementos com String.join e StringJoiner",
        subtitle: "Transformação · Montando listas delimitadas sem separadores residuais na ponta",
        theory: "Unir elementos separados por vírgula historicamente exigia laços trabalhosos para evitar a vírgula sobressalente no final. Desde o Java 8, o método estático String.join(delimitador, itens) e a classe utilitária java.util.StringJoiner resolvem isso perfeitamente, suportando inclusive prefixos e sufixos elegantes.",
        questions: [
          q("Qual método estático de String introduzido no Java 8 une múltiplos textos com um separador?", "String.join(delimitador, elementos)", ["String.merge(delimitador, elementos)","String.concatAll(delimitador, elementos)"], "String.join une arrays ou coleções inserindo o separador estritamente entre os itens."),
          q("Qual é a grande comodidade de String.join(\" - \", \"A\", \"B\", \"C\") em relação a um laço for?", "Não insere o separador no final da sequência nem exige testes condicionais manuais", ["Executa em hardware gráfico","Converte automaticamente para maiúsculas"], "Garante que o delimitador só apareça entre os pares de itens, gerando \"A - B - C\" sem sujeira na ponta."),
          q("Qual classe dedicada do Java 8 permite configurar separador, prefixo inicial e sufixo final?", "java.util.StringJoiner", ["java.lang.StringBuilder","java.util.Scanner","java.text.MessageFormat"], "StringJoiner permite configurar pontuações como new StringJoiner(\", \", \"[\", \"]\") gerando \"[1, 2, 3]\"."),
          q("É possível passar um Iterable (como List<String>) diretamente para String.join?", "Sim, String.join aceita tanto varargs de textos quanto qualquer coleção Iterable<CharSequence>", ["Não, aceita exclusivamente arrays nativos","Apenas se a lista tiver menos de 10 itens"], "A sobrecarga com Iterable facilita a união direta de listas recuperadas de bancos ou arquivos."),
          t("Qual método estático da classe String une elementos textuais com um separador intermediário?", ["String.join","join"], "String.join formata sequências delimitadas em uma única chamada.", "String csv = ____(\",\", nomes);"),
          g("Complete a instrução unindo os nomes das cidades com hífen e espaços.", ["String.join"], "String.join formata a cadeia com o delimitador especificado.", "String rota = ____(\" - \", cidades);"),
          o("Ordene a estrutura gerada por new StringJoiner(\", \", \"[\", \"]\").add(\"1\").add(\"2\").", ["Adição do prefixo delimitador de abertura \"[\"","Adição do primeiro elemento \"1\"","Inserção do separador intermediário \", \"","Adição do segundo elemento \"2\"","Adição do sufixo delimitador de fechamento \"]\""], "StringJoiner produz formatações estruturadas como \"[1, 2]\" com altíssima elegância."),
          p("Associe a ferramenta de união à sua sintaxe correspondente.", [["String.join(\", \", lista)","União direta e simples de coleção com separador"],["new StringJoiner(\", \", \"(\", \")\")","União avançada com controle de prefixo e sufixo"],["Collectors.joining(\"; \")","Coletor da Stream API para redução final de pipelines"],["StringBuilder manual","Controle em baixo nível com necessidade de limpar o último separador"]], "Eliminar laços manuais de formatação reduz defeitos de formatação em relatórios e APIs.")
        ]
      },
      {
        id: "java-c06-u8-l3-transformacao-funcional-streams",
        title: "Transformação funcional com Arrays.stream()",
        subtitle: "Transformação · Mapeando, filtrando e reduzindo coleções no Java 8+",
        theory: "A Stream API do Java 8 possibilita transformar arrays com estilo declarativo e funcional. Com Arrays.stream(arr), obtemos um fluxo de dados que suporta operadores como .filter() para filtrar, .map() para transformar valores, e coletores ou .toArray() para recompor a estrutura final sem laços manuais.",
        questions: [
          q("Qual método converte um array primitivo ou de objetos em um Stream do Java 8?", "Arrays.stream(array)", ["array.toStream()","Stream.from(array)","array.stream()"], "Arrays.stream(arr) é a ponte canônica entre o mundo de arrays estáticos e a Stream API funcional."),
          q("Para um array int[], qual tipo especializado de Stream é gerado por Arrays.stream(arr)?", "IntStream (stream especializada em primitivos que evita o overhead de boxing)", ["Stream<Integer>","PrimitiveStream","NumberStream"], "Streams primitivas (IntStream, LongStream, DoubleStream) oferecem máximo desempenho de CPU."),
          q("Qual operação intermediária da Stream API transforma cada elemento em um novo valor calculado?", ".map(...)", [".filter(...)",".distinct()",".peek(...)"], "map aplica uma função matemática ou de conversão a cada elemento do fluxo."),
          q("Como reconverter um IntStream filtrado de volta em um array nativo int[]?", ".toArray()", [".toList()",".collect()",".asArray()"], "O método terminal .toArray() materializa os elementos do fluxo de volta em um array contíguo."),
          t("Qual operação intermediária da Stream API seleciona apenas os itens que atendem a um predicado?", ["filter","filter()"], "filter retém apenas os elementos com retorno booleano true.", "Arrays.stream(nums).____(n -> n > 0);"),
          g("Complete o encadeamento funcional para elevar todos os elementos ao quadrado.", ["map"], "map transforma cada elemento aplicando a função fornecida.", "int[] quadrados = Arrays.stream(nums).____(n -> n * n).toArray();"),
          o("Ordene as etapas de um pipeline de transformação funcional sobre um array.", ["Criar o fluxo a partir do array com Arrays.stream(arr)","Aplicar operações intermediárias de filtro (.filter)","Aplicar transformações de mapeamento (.map)","Executar a operação terminal de coleta (.toArray)"], "Pipelines de streams separam a definição das regras de sua execução preguiçosa."),
          p("Associe a operação da Stream API à sua função no pipeline.", [["Arrays.stream(arr)","Gera o fluxo inicial a partir da fonte de dados"],[".filter(x -> x >= 10)","Descarta elementos que não atendem ao predicado"],[".map(String::toUpperCase)","Transforma cada item do fluxo em novo valor"],[".toArray()","Operação terminal que materializa o resultado final em array"]], "A Stream API revoluciona a clareza e manutenibilidade na manipulação de arrays e coleções.")
        ]
      },
      {
        id: "java-c06-u8-l4-conversao-entre-arrays-e-listas",
        title: "Interoperabilidade: conversão entre arrays e listas",
        subtitle: "Transformação · Arrays.asList(), List.of() e o método toArray()",
        theory: "A conversão entre arrays e coleções é frequente em Java. Arrays.asList(arr) cria uma lista apoiada pelo array original (tamanho fixo, mas mutável em valores). List.of(arr) cria lista 100% imutável. Já lista.toArray(new String[0]) converte coleções em arrays tipados com eficiência.",
        questions: [
          q("Qual é a peculiaridade de uma lista criada via Arrays.asList(arr)?", "Tem tamanho fixo: não suporta add() ou remove(), mas alterações de valores refletem no array", ["É uma cópia independente profunda","Pode crescer livremente sem limites"], "Arrays.asList é apenas uma \"visão\" (wrapper) do array original; mutações de elementos afetam o array."),
          q("O que acontece se tentarmos chamar .add(\"novo\") em uma lista criada por List.of() ou Arrays.asList()?", "Lança UnsupportedOperationException em tempo de execução", ["O elemento é adicionado normalmente","A JVM fecha silenciosamente"], "Ambas as listas proíbem redimensionamento estrutural, disparando exceção."),
          q("Qual é a forma recomendada e com melhor desempenho no Java moderno para converter uma List<String> em String[]?", "lista.toArray(new String[0]);", ["lista.toArray(new String[lista.size()]);","lista.toArray(); com cast forçado","(String[]) lista.toArray();"], "Passar new String[0] permite que a JVM use otimizações intrínsecas de alocação de tamanho exato no heap."),
          q("Qual método cria uma lista totalmente imutável a partir de elementos ou array no Java 9+?", "List.of(...)", ["Arrays.asList(...)","Collections.list(...)","new ArrayList<>(...)"], "List.of produz coleções estritamente imutáveis que não aceitam elementos nulos."),
          t("Qual exceção ocorre ao tentar adicionar itens em uma lista gerada por Arrays.asList?", ["UnsupportedOperationException"], "A modificação estrutural é proibida na lista de tamanho fixo.", "throw new ____();"),
          g("Complete a conversão da lista de clientes para um array tipado de String.", ["new String[0]"], "new String[0] é o padrão moderno recomendado para toArray.", "String[] arr = clientes.toArray(____);"),
          o("Ordene os passos para converter um array em uma lista mutável e dinâmica de verdade.", ["Receber o array de objetos original","Encapsular o array em uma visão inicial com Arrays.asList(arr)","Passar a visão para o construtor dinâmico new ArrayList<>(...)","Adicionar ou remover itens livremente na nova lista independente"], "O construtor de ArrayList clona os dados, permitindo redimensionamento dinâmico sem restrições."),
          p("Associe a técnica de conversão ao seu perfil de mutabilidade.", [["Arrays.asList(arr)","Tamanho fixo, elementos mutáveis refletem no array original"],["List.of(arr)","100% imutável: proíbe adições, deleções e alterações de elementos"],["new ArrayList<>(Arrays.asList(arr))","Totalmente mutável e independente do array original"],["lista.toArray(new T[0])","Converte a coleção em um novo array nativo tipado"]], "Dominar a ponte entre arrays e listas garante flexibilidade e segurança em projetos corporativos.")
        ]
      },
      {
        id: "java-c06-u8-l5-pipelines-de-dados-estruturados",
        title: "Pipelines completos: de texto bruto a dados estruturados",
        subtitle: "Transformação · Ingestão, parsing, validação e agregação em objetos de domínio",
        theory: "A união harmoniosa de arrays, strings e coleções atinge seu ápice na construção de pipelines de dados. A partir de linhas brutas de texto (como arquivos CSV), o algoritmo divide campos com split, sanitiza caracteres com strip, converte tipos com wrappers e constrói registros tipados imutáveis (Records) para agregação.",
        questions: [
          q("Qual é a ordem correta de operações ao processar uma linha CSV bruta para criar uma entidade de domínio?", "Divisão em tokens -> Sanitização e validação -> Parsing de tipos -> Instanciação da entidade", ["Instanciação da entidade antes da leitura dos dados","Parsing de tipos antes de dividir o texto"], "O pipeline segue um fluxo linear e seguro, tratando precondições antes da conversão de tipos."),
          q("Qual método deve ser usado para converter a string \"123\" em um valor numérico primitivo int?", "Integer.parseInt(\"123\")", ["Integer.valueOf(\"123\")","String.toInt(\"123\")","(int) \"123\""], "Integer.parseInt é a rotina dedicada de parsing para primitivos inteiros na biblioteca padrão."),
          q("Qual exceção deve ser tratada defensivamente caso o texto recebido para parsing não seja um número válido?", "NumberFormatException", ["NullPointerException","ClassCastException","ArithmeticException"], "NumberFormatException é uma subclasse de IllegalArgumentException disparada quando o formato numérico é inválido."),
          q("Por que os Records do Java moderno são o destino ideal para o resultado final de um pipeline de parsing?", "Porque são portadores de dados imutáveis, autoexplicativos e dispensam boilerplate de classes", ["Porque executam parses automáticos de arquivos","Porque gravam dados no banco automaticamente"], "Records consolidam os dados parseados em entidades imutáveis e seguras para trânsito no sistema."),
          t("Qual método converte uma sequência de texto em um número decimal primitivo double?", ["Double.parseDouble","parseDouble"], "Double.parseDouble analisa o texto e produz o valor double.", "double valor = ____(colunaTexto);"),
          g("Complete o bloco defensivo que captura falhas de conversão numérica de texto.", ["NumberFormatException"], "NumberFormatException protege o pipeline contra entradas de texto malformadas.", "catch (____ e) { registrarErro(); }"),
          o("Ordene as fases de um pipeline corporativo de transformação de texto em lote.", ["Leitura da linha de texto bruto a partir da fonte de dados","Quebra dos campos pelo delimitador com split(\";\", -1)","Sanitização de cada campo textual com strip()","Conversão de strings em primitivos tipados (parseInt/parseDouble)","Instanciação e armazenamento do Record de domínio final"], "O pipeline transforma texto não estruturado em informações sólidas e confiáveis."),
          p("Associe a ferramenta de processamento ao seu papel no pipeline.", [["str.split(\";\")","Segmentação da linha em colunas de array de strings"],["col.strip()","Eliminação de espaços residuais e caracteres de controle"],["Integer.parseInt(col)","Conversão de representação textual para grandeza matemática"],["record Registro(...)","Armazenamento estruturado, tipado e imutável dos dados finais"]], "Pipelines robustos são o alicerce de qualquer arquitetura de ingestão de dados em Java.")
        ]
      }
    ]
  });
})();
