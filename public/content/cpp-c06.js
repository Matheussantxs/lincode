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

  const lang = "cpp";
  const chId = "cpp-c06";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "cpp-c06-u1-l3-declaracao-tamanho-inicializacao-agregada",
        title: "Declaração e inicialização agregada de arrays C clássicos",
        subtitle: "Arrays · Tamanho fixo em tempo de compilação e inicialização entre chaves",
        theory: "Em C++, um array nativo aloca elementos contíguos de mesmo tipo na stack com tamanho imutável fixado na compilação. A inicialização agregada com chaves {1, 2, 3} preenche as posições iniciais; se menos elementos forem fornecidos que o tamanho total, as posições restantes são preenchidas automaticamente com zero.",
        questions: [
          q("Qual é a forma correta de declarar um array nativo de 5 inteiros inicializado com zeros em C++?", "int arr[5] = {};", ["int arr(5) = {0};","int arr[5] = new int;","array int arr[5];"], "As chaves vazias {} acionam value-initialization, zerando todos os 5 elementos na memória stack."),
          q("O que acontece se inicializarmos int arr[5] = {10, 20}; em C++?", "Os dois primeiros elementos recebem 10 e 20, e os três restantes são zerados automaticamente", ["Os três restantes contêm lixo de memória","Erro de compilação por tamanho insuficiente"], "Quando a lista de inicializadores é menor que o array, os elementos omitidos recebem zero por padrão."),
          q("O tamanho de um array C clássico declarado na stack pode ser uma variável comum em C++ padrão?", "Não, o tamanho deve ser uma constante conhecida em tempo de compilação (constexpr)", ["Sim, qualquer int mutável serve","Apenas se for float"], "Arrays de comprimento variável (VLAs) do C99 não fazem parte da especificação ISO do C++ padrão."),
          q("O que acontece se declararmos int arr[5]; dentro de uma função sem inicialização?", "Os elementos conterão lixo residual de memória com valores indeterminados", ["Todos os elementos iniciam com zero","Ocorre erro de compilação"], "Variáveis locais automáticas não são zeradas por padrão em C++, exigindo inicialização explícita."),
          t("Qual símbolo de pontuação delimita a lista de valores na inicialização agregada de arrays?", ["{}","chaves"], "Chaves delimitam inicializadores agregados.", "int valores[] = ____ 1, 2, 3 };"),
          g("Complete a declaração do array deixando o compilador inferir o tamanho automaticamente.", ["[]"], "Colchetes vazios delegam a contagem de elementos ao compilador.", "int primos____ = {2, 3, 5, 7, 11};"),
          o("Ordene a inicialização de um array com 4 elementos no C++ padrão.", ["Definir a constante com o tamanho: constexpr int N = 4;","Declarar o array com o tipo e a dimensão: int dados[N] = {10, 20};","Compilador preenche os dois primeiros itens com 10 e 20","Compilador zera automaticamente os dois índices restantes"], "A inicialização agregada garante previsibilidade total aos bytes do array."),
          p("Associe a declaração de array ao seu conteúdo inicial na memória.", [["int a[3];","Três inteiros com valores indeterminados (lixo de memória)"],["int b[3] = {};","Três inteiros estritamente zerados por value-initialization"],["int c[3] = {1};","Primeiro elemento 1 e os outros dois zerados"],["int d[] = {4, 5};","Tamanho 2 inferido automaticamente pelo compilador"]], "Dominar a inicialização de arrays nativos previne leituras de memória indefinida.")
        ]
      },
      {
        id: "cpp-c06-u1-l4-decaimento-array-ponteiro-sizeof",
        title: "Decaimento de array para ponteiro e o operador sizeof",
        subtitle: "Arrays · Como passagens para funções convertem T[] em T* e perdem o tamanho",
        theory: "Ao passar um array clássico para uma função, o C++ aplica array-to-pointer decay: o array converte-se implicitamente em um ponteiro para seu primeiro elemento (T*). Com isso, sizeof dentro da função retorna apenas o tamanho do ponteiro (8 bytes em 64 bits), perdendo a quantidade real de itens do array.",
        questions: [
          q("O que acontece quando passamos um array nativo int arr[10] para uma função void f(int a[])?", "O array sofre decaimento para ponteiro int*, perdendo a informação do tamanho original", ["O array é copiado integralmente por valor","O compilador gera erro de tipo"], "A sintaxe int a[] em parâmetros é apenas um disfarce do compilador para int* a."),
          q("Se sizeof(arr) retorna 40 bytes na main (onde arr tem 10 ints), o que retorna dentro de f(int a[])?", "8 bytes (o tamanho do ponteiro em arquitetura de 64 bits)", ["40 bytes","10 bytes","4 bytes"], "Dentro da função, o identificador é apenas um ponteiro para a memória, medindo 8 bytes."),
          q("Como calcular o número de elementos de um array clássico no mesmo escopo de sua declaração?", "sizeof(arr) / sizeof(arr[0]) ou com a função moderna std::size(arr)", ["arr.length","arr.count()","sizeof(arr)"], "std::size() (C++17) fornece contagem segura e falha na compilação se for passado um ponteiro."),
          q("Qual é a solução idiomática do C++ moderno para evitar os perigos do decaimento para ponteiro?", "Utilizar std::array, std::vector ou std::span em vez de arrays nativos da linguagem C", ["Usar ponteiros void*","Usar macros #define"], "Contêineres modernos encapsulam o tamanho e impedem decaimento involuntário de tipos."),
          t("Qual operador nativo do C++ retorna o tamanho em bytes ocupado por um tipo ou array?", ["sizeof"], "sizeof mede a quantidade de bytes na memória.", "size_t bytes = ____(dados);"),
          g("Complete a passagem de função que recebe o ponteiro e o número de elementos separadamente.", ["size_t"], "size_t é o tipo padrão de C++ para expressar contagens e tamanhos.", "void imprimir(const int* ptr, ____ tamanho) { }"),
          o("Ordene a mecânica de decaimento de array ao invocar uma função em C++.", ["Array int numeros[5] é declarado na stack com 20 bytes","Função exibir(numeros) é chamada pelo código","Compilador converte o argumento numeros no ponteiro &numeros[0]","Dentro da função sizeof(numeros) avalia para 8 bytes em vez de 20"], "O decaimento automático é uma herança histórica da linguagem C que exige atenção no C++."),
          p("Associe a expressão ao resultado em uma máquina de 64 bits com int de 4 bytes.", [["sizeof(int arr[10]) no escopo local","40 bytes (10 elementos multiplicados por 4 bytes)"],["sizeof(ptr) em void f(int* ptr)","8 bytes (tamanho do endereço de memória de 64 bits)"],["std::size(arr) (C++17)","10 (número exato de elementos do array)"],["sizeof(arr) / sizeof(arr[0])","Cálculo clássico da quantidade de itens de um array"]], "Compreender o decaimento para ponteiro explica por que contêineres modernos são preferidos.")
        ]
      },
      {
        id: "cpp-c06-u1-l5-arrays-multidimensionais-row-major",
        title: "Arrays multidimensionais e disposição contígua em memória (Row-Major)",
        subtitle: "Arrays · Matrizes bidimensionais e a organização em linhas contíguas na RAM",
        theory: "No C++, matrizes multidimensionais como int m[3][4] são armazenadas na memória em ordem de linhas principais (row-major order). Todos os elementos da linha 0 ficam contíguos aos da linha 1, formando um único bloco plano na RAM. Percorrer por linhas aproveita o cache L1/L2 da CPU com máxima eficiência.",
        questions: [
          q("Como os elementos de um array bidimensional int m[2][3] estão organizados fisicamente na memória RAM?", "Em ordem de linhas principais (row-major), com toda a linha 0 seguida de toda a linha 1 contiguamente", ["Em colunas separadas no heap","Espalhados aleatoriamente com ponteiros"], "C++ alinha matrizes bidimensionais em um bloco de bytes estritamente plano e linear."),
          q("Qual forma de percorrer a matriz int m[LINHAS][COLS] maximiza a performance do processador?", "Loop externo pelas linhas e loop interno pelas colunas (acessando m[i][j] sequencialmente)", ["Loop externo pelas colunas e interno pelas linhas","Acessar índices aleatórios"], "O percurso em linha coincide com a ordem física na RAM, maximizando acertos de cache L1."),
          q("Por que passar uma matriz para uma função exige especificar todas as dimensões exceto a primeira?", "Porque o compilador precisa saber o tamanho de cada linha para calcular o salto de memória: m + (i * COLS + j)", ["Por exigência do linker","Para evitar recursão"], "A fórmula de endereço depende estritamente do número de colunas para indexar cada linha."),
          q("Quantos bytes são alocados na pilha para a matriz int grade[4][5] considerando inteiros de 4 bytes?", "80 bytes (4 linhas * 5 colunas = 20 inteiros * 4 bytes)", ["20 bytes","40 bytes","160 bytes"], "O cálculo dimensional multiplica a quantidade total de células pelo tamanho unitário do tipo."),
          t("Como se chama a ordem de armazenamento de matrizes em C++ onde as linhas são gravadas contiguamente?", ["row-major","row major","ordem de linhas"], "Row-major armazena linha após linha na memória.", "Disposição física na RAM: ____-major"),
          g("Complete a assinatura de função aceitando uma matriz bidimensional com 4 colunas.", ["[4]"], "As colunas devem ser especificadas para o cálculo de offset.", "void processar(int matriz[][____], int linhas) { }"),
          o("Ordene a disposição física dos elementos de int m[2][2] na memória.", ["m[0][0] no endereço base &m[0][0]","m[0][1] no endereço seguinte imediato","m[1][0] logo após o último item da linha zero","m[1][1] fechando o bloco de 4 inteiros contíguos"], "A ordem row-major organiza matrizes como sequências lineares contínuas."),
          p("Associe a coordenada da matriz m[3][4] ao offset linear de memória (i * 4 + j).", [["m[0][0]","Offset 0 (primeiro elemento físico da matriz)"],["m[0][3]","Offset 3 (último elemento da primeira linha)"],["m[1][0]","Offset 4 (primeiro elemento da segunda linha)"],["m[2][3]","Offset 11 (último elemento físico da matriz)"]], "Percorrer matrizes respeitando a ordem row-major é mandatório para código de alta performance.")
        ]
      }
    ],
    2: [
      {
        id: "cpp-c06-u2-l1-introducao-std-array-cpp11",
        title: "Introdução a std::array: contêiner fixo moderno no C++11",
        subtitle: "Std::array · Segurança, semântica de valor e zero custo em relação a arrays C",
        theory: "Introduzido no C++11 através do cabeçalho <array>, std::array<T, N> é um encapsulamento fino sobre um array C clássico que elimina o decaimento involuntário para ponteiro. Ele combina performance nativa (alocação estática na pilha e zero sobrecarga de runtime) com interface padronizada da STL.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão do C++ provê a classe de template std::array?", "<array>", ["<vector>","<memory>","<list>"], "<array> define a estrutura de dados de tamanho fixo com interface moderna da STL."),
          q("Qual é o custo de sobrecarga de performance de std::array<int, 10> em relação a int arr[10]?", "Zero sobrecarga (zero overhead): ambos possuem idêntico tamanho em bytes e alocação na pilha", ["std::array é 50% mais lento","std::array aloca no heap"], "std::array segue o princípio de custo zero do C++: abstração limpa sem pagar nenhum byte extra."),
          q("O que acontece ao passar um std::array por valor para uma função em C++?", "O array completo é copiado por valor, ao contrário dos arrays C que decaem para ponteiro", ["Ele decai para ponteiro","Ocorre erro de compilação"], "std::array comporta-se como um objeto comum de primeira classe com semântica de valor."),
          q("Como declarar um std::array de 5 números do tipo double inicializados no C++11?", "std::array<double, 5> valores = {1.1, 2.2, 3.3, 4.4, 5.5};", ["std::array(double, 5) valores;","std::array<5, double> valores;"], "A sintaxe recebe o tipo dos elementos no primeiro parâmetro de template e a quantidade no segundo."),
          t("Qual cabeçalho deve ser incluído para utilizar a classe std::array em programas C++?", ["<array>","array"], "<array> provê o contêiner de tamanho estático.", "#include ____"),
          g("Complete a declaração criando um std::array de 4 inteiros.", ["int, 4"], "Os parâmetros de template são o tipo T e a dimensão N.", "std::array<____> dados = {1, 2, 3, 4};"),
          o("Ordene a evolução da declaração de coleções estáticas do C para o C++ moderno.", ["C clássico adota int arr[10]; com risco de decaimento para ponteiro","C++98 herda arrays C sem melhorias na semântica de cópia","C++11 padroniza std::array<int, 10> unindo segurança e desempenho","C++17 introduz dedução automática de templates (CTAD) com std::array{1, 2, 3}"], "std::array profissionaliza o tratamento de sequências de tamanho fixo no C++."),
          p("Associe a estrutura ao seu comportamento na linguagem C++.", [["int arr[10]","Decai para ponteiro ao ser passado para funções"],["std::array<int, 10>","Objeto completo da STL com tamanho embutido e semântica de valor"],["std::vector<int>","Contêiner dinâmico redimensionável alocado no heap"],["std::span<int>","Visualização leve de dados contíguos de qualquer array"]], "std::array oferece a melhor combinação entre velocidade bruta e segurança estática.")
        ]
      },
      {
        id: "cpp-c06-u2-l2-metodos-size-empty-data-iteradores",
        title: "Métodos size(), empty(), data() e iteradores em std::array",
        subtitle: "Std::array · A interface comum da STL aplicada a arrays estáticos",
        theory: "std::array oferece a interface canônica dos contêineres da STL. O método .size() retorna o número de elementos como constexpr em O(1); .empty() indica se N é zero; .data() fornece o ponteiro bruto T* para chamadas C; e .begin()/.end() habilitam iteradores e algoritmos padrão como std::sort.",
        questions: [
          q("Qual é a complexidade de tempo de arr.size() em um objeto std::array?", "O(1) instantâneo (e avaliado em tempo de compilação como constexpr)", ["O(n) linear","O(log n)"], "O tamanho N é um parâmetro fixo de template embutido na própria definição de tipo."),
          q("O que o método arr.data() de um std::array retorna?", "Um ponteiro bruto para o primeiro elemento contíguo na memória (T*)", ["Uma cópia dos dados no heap","Uma string formatada"], "data() permite interoperar std::array diretamente com APIs que exigem ponteiros clássicos."),
          q("O que arr.empty() retorna para um std::array<int, 4>?", "false (pois N é 4, maior que zero)", ["true","Lança exceção","Retorna 0 bytes"], "empty() retorna verdadeiro apenas quando a capacidade N do template é formalmente zero."),
          q("Como ordenar um std::array com a biblioteca padrão <algorithm>?", "std::sort(arr.begin(), arr.end());", ["arr.sort();","std::order(arr);"], "std::array provê iteradores begin() e end() compatíveis com toda a biblioteca de algoritmos da STL."),
          t("Qual método do std::array retorna o ponteiro direto para o buffer contíguo de memória?", ["data()","data"], "data() expõe o ponteiro bruto para funções C.", "const int* ptr = arr.____;"),
          g("Complete o retorno do método para inspecionar a quantidade de itens no contêiner.", ["size()"], "size() retorna o número de itens N em O(1).", "std::cout << arr.____;"),
          o("Ordene a utilização de std::array com algoritmos da STL.", ["Declarar std::array<int, 5> nums = {5, 2, 8, 1, 9};","Incluir o cabeçalho <algorithm>","Invocar std::sort(nums.begin(), nums.end())","Elementos são ordenados in-place sem alocações adicionais"], "A uniformidade de iteradores integra std::array a todos os algoritmos da STL."),
          p("Associe o método do std::array à sua função primordial.", [["arr.size()","Retorna a quantidade fixa de elementos N como constexpr"],["arr.data()","Fornece ponteiro bruto T* para interoperar com código C"],["arr.front()","Acessa a referência ao primeiro elemento da coleção"],["arr.back()","Acessa a referência ao último elemento da coleção"]], "Dominar a interface de std::array confere fluência em todo o ecossistema STL.")
        ]
      },
      {
        id: "cpp-c06-u2-l3-acesso-colchetes-vs-metodo-at",
        title: "Acesso por colchetes [] vs método .at() em std::array",
        subtitle: "Std::array · Velocidade pura versus checagem de limites com std::out_of_range",
        theory: "No std::array, o operador [] acessa elementos com velocidade máxima da CPU sem verificar limites; acessar um índice inválido gera comportamento indefinido (UB). O método .at(), por outro lado, valida se o índice está na faixa [0, size() - 1], lançando a exceção std::out_of_range em caso de violação.",
        questions: [
          q("Qual é a diferença fundamental entre arr[i] e arr.at(i) em um std::array?", "arr[i] não checa limites para máxima velocidade; arr.at(i) valida o índice e lança std::out_of_range se for inválido", ["arr[i] é mais lento","arr.at(i) só funciona com floats"], "operator[] prioriza performance pura; .at() prioriza segurança lançando exceção em falhas."),
          q("O que acontece se executarmos arr.at(10) em um std::array de tamanho 5?", "O método lança a exceção std::out_of_range", ["Retorna zero silenciosamente","O computador reinicia"], "A validação interna de limites aborta a operação antes que haja corrupção de memória."),
          q("O que acontece se executarmos arr[10] em um std::array de tamanho 5?", "Comportamento indefinido (Undefined Behavior), podendo ler memória alheia ou causar crash fatal", ["Compilação é impedida","Retorna nulo"], "Sem verificação de limites, a instrução lê o offset de memória diretamente na stack."),
          q("Quando o desenvolvedor C++ deve preferir .at() em vez de []?", "Quando o índice provém de fontes externas não confiáveis (como entrada de usuário ou arquivos) sem pré-validação", ["Sempre em laços for conhecidos","Nunca"], "Usar .at() em pontos de fronteira evita brechas de segurança causadas por dados corrompidos."),
          t("Qual classe de exceção da STL é disparada quando .at() detecta um índice fora dos limites?", ["std::out_of_range","out_of_range"], "out_of_range sinaliza violação de limites em contêineres.", "catch (const std::____& e) { }"),
          g("Complete o bloco capturando a exceção disparada pelo método com checagem de limites.", ["std::out_of_range"], "out_of_range herda de std::logic_error na hierarquia da STL.", "try { arr.at(99); } catch (const ____& e) { }"),
          o("Ordene o fluxo de execução ao utilizar o método com verificação de limites arr.at(i).", ["Código cliente chama arr.at(i) passando o índice desejado","Método at testa internamente: if (i >= size())","Condição de violação é detectada como verdadeira","Método lança throw std::out_of_range(\"array::at\");"], "O método .at() transforma violações de memória em exceções controláveis."),
          p("Associe a operação ao seu perfil de segurança e velocidade.", [["arr[i]","Acesso direto sem checagem: ideal para loops com limites conhecidos"],["arr.at(i)","Acesso seguro com checagem: ideal para entradas externas e testes"],["std::out_of_range","Exceção disparada por .at() ao violar os limites do array"],["Acesso negativo arr[-1]","Comportamento indefinido em [] e exceção imediata em .at()"]], "Escolher entre [] e .at() equilibra performance de baixo nível e segurança estrutural.")
        ]
      },
      {
        id: "cpp-c06-u2-l4-passagem-por-valor-vs-const-ref",
        title: "Passagem de std::array: valor vs referência constante",
        subtitle: "Std::array · Evitando cópias volumosas na pilha com const std::array<T, N>&",
        theory: "Como std::array é um objeto de primeira classe, passá-lo por valor (void f(std::array<int, 1000> a)) copia todos os elementos para um novo frame da pilha. Para coleções com dezenas ou centenas de elementos, a boa prática de engenharia em C++ exige passar por referência constante (const std::array<T, N>&).",
        questions: [
          q("Por que passar std::array<int, 1000> por valor para uma função pode ser ineficiente?", "Porque todos os 1000 inteiros (4000 bytes) são copiados elemento por elemento na pilha de execução", ["Porque std::array aloca no heap","Porque altera o array original"], "A passagem por valor duplica todos os dados locais, onerando a call stack e gastando ciclos da CPU."),
          q("Qual é a forma recomendada de passar um std::array para uma função apenas para leitura?", "Por referência constante: const std::array<T, N>& arr", ["Por valor: std::array<T, N> arr","Como ponteiro void*"], "A referência constante transfere apenas um endereço (8 bytes) e impede modificações acidentais."),
          q("Se quisermos que uma função altere os elementos do std::array original, como declaramos o parâmetro?", "Por referência não-constante: std::array<T, N>& arr", ["Por valor","const std::array<T, N>&"], "A referência mutável permite que alterações feitas na função reflitam no chamador sem cópias."),
          q("Qual é uma limitação da passagem de std::array como parâmetro de função em C++?", "A dimensão N faz parte do tipo; funções que recebem std::array<int, 5> não aceitam std::array<int, 10>", ["Não aceita tipos primitivos","Não compila com templates"], "Tamanhos distintos representam tipos de dados completamente diferentes para o compilador C++."),
          t("Qual símbolo indica passagem por referência em parâmetros de funções C++?", ["&","e comercial"], "O e-comercial & cria uma referência em vez de uma cópia.", "void analisar(const std::array<int, 10>____ dados);"),
          g("Complete a assinatura de leitura evitando cópias desnecessárias na memória.", ["const"], "const garante que a coleção seja acessada somente para leitura.", "void imprimir(____ std::array<int, 50>& colecao) { }"),
          o("Ordene a análise de custo ao decidir a assinatura de função para std::array.", ["Avaliar a quantidade de elementos N e o sizeof(T) do tipo interno","Se o tamanho total for minúsculo (ex: 2 ints = 8 bytes), passagem por valor é aceitável","Se o tamanho for maior ou o tipo for pesado, adotar const std::array<T, N>&","Se a função precisar aceitar arrays de qualquer tamanho, usar std::span<const T>"], "A escolha consciente da passagem de parâmetros otimiza a ocupação de registradores e cache."),
          p("Associe a assinatura ao seu comportamento com std::array<int, 100>.", [["void f(std::array<int, 100> a)","Copia 400 bytes na pilha a cada invocação"],["void f(const std::array<int, 100>& a)","Passa ponteiro de 8 bytes com proteção somente leitura"],["void f(std::array<int, 100>& a)","Passa referência mutável para alterar o contêiner original"],["void f(std::span<const int> a)","Abstrai a dimensão fixa aceitando fatias de qualquer tamanho"]], "Usar referências constantes é o padrão ouro para contêineres de tamanho estático.")
        ]
      },
      {
        id: "cpp-c06-u2-l5-comparacao-copia-e-atribuicao-std-array",
        title: "Comparação lexicográfica e atribuição direta com std::array",
        subtitle: "Std::array · Operadores ==, !=, < e atribuição por valor sem laços manuais",
        theory: "Diferente dos arrays C onde a comparação (a == b) compara apenas os endereços de memória dos ponteiros, std::array sobrecarrega operadores relacionais (==, !=, <, <=, >, >=). Ele realiza comparação lexicográfica elemento por elemento e suporta atribuição direta com operator=, copiando os dados com elegância.",
        questions: [
          q("O que a expressão arr1 == arr2 avalia quando ambos são std::array<int, 3>?", "Compara se todos os elementos correspondentes são rigorosamente iguais em valor", ["Compara se os endereços de memória na pilha são iguais","Compara apenas o tamanho"], "std::array implementa equality operator que inspeciona o conteúdo dos elementos, não os ponteiros."),
          q("O que acontece se tentarmos executar arr1 == arr2 entre arrays de tamanhos diferentes (ex: 3 e 5)?", "Erro de compilação: std::array<int, 3> e std::array<int, 5> são tipos distintos e incompatíveis", ["Retorna false automaticamente","Retorna true se os 3 primeiros forem iguais"], "A dimensão N faz parte do tipo estático; o compilador recusa a comparação entre tipos diferentes."),
          q("Como funciona o operador menor (<) entre dois objetos std::array em C++?", "Realiza comparação lexicográfica elemento por elemento (ordem de dicionário)", ["Compara apenas a soma de todos os números","Compara o tamanho dos tipos"], "A comparação para no primeiro par de elementos desiguais, exatamente como em ordem alfabética."),
          q("Qual é o resultado de executar arr2 = arr1; onde ambos são std::array<int, 4>?", "Copia todos os 4 elementos de arr1 para arr2 através do operator= embutido", ["Copia apenas o ponteiro do primeiro item","Gera erro de compilação"], "std::array provê atribuição por cópia completa sem necessidade de invocar memcpy manualmente."),
          t("Qual operador compara se duas coleções possuem elementos exatamente idênticos?", ["=="], "== compara o conteúdo dos arrays elemento por elemento.", "if (arr1 ____ arr2) { }"),
          g("Complete a atribuição direta copiando todos os elementos do primeiro array.", ["="], "O operador de atribuição copia todo o conteúdo do array de mesmo tipo.", "copia ____ original;"),
          o("Ordene a mecânica da comparação lexicográfica arr1 < arr2.", ["Compilador compara o primeiro par de elementos arr1[0] e arr2[0]","Se forem desiguais, o resultado do par decide a comparação imediatamente","Se forem iguais, o algoritmo avança para arr1[1] e arr2[1]","Se todos os pares forem iguais até o fim, retorna falso (são idênticos)"], "A comparação lexicográfica é determinística e formalizada na biblioteca padrão."),
          p("Associe a operação com std::array ao resultado produzido.", [["arr1 == arr2","Verdadeiro se todos os elementos nas mesmas posições forem idênticos"],["arr1 < arr2","Compara elementos lexicograficamente do índice 0 até o final"],["arr2 = arr1;","Copia integral de todos os valores de arr1 para arr2"],["arr1 != arr2","Verdadeiro se existir ao menos um elemento diferente"]], "Operadores relacionais nativos tornam std::array um cidadão de primeira classe em C++.")
        ]
      }
    ],
    3: [
      {
        id: "cpp-c06-u3-l1-std-string-dinamico-vs-const-char-raii",
        title: "std::string dinâmico vs const char* e o princípio RAII",
        subtitle: "Std::string · Gerenciamento automático de heap, expansão dinâmica e segurança de memória",
        theory: "No C++, std::string é uma classe que gerencia sequências mutáveis de caracteres aplicando RAII. Diferente de literais const char* que possuem tamanho fixo e exigem cuidados manuais com terminação nula e buffers, std::string redimensiona sua memória no heap dinamicamente e desaloca os bytes no destrutor.",
        questions: [
          q("Qual é o benefício de std::string em relação aos arrays de caracteres const char* da linguagem C?", "Gerenciamento automático de memória via RAII, expansão dinâmica e ausência de risco de buffer overflow", ["Menor consumo de bytes que o C","Execução em tempo de compilação apenas"], "std::string gerencia alocação e liberação de memória no heap de forma totalmente transparente."),
          q("O que acontece com a memória do heap de uma std::string quando a variável sai de escopo?", "O destrutor de std::string é invocado automaticamente, liberando a memória sem vazamentos", ["A memória fica perdida no heap","É necessário chamar delete manual"], "O paradigma RAII (Resource Acquisition Is Initialization) garante que a destruição libere recursos."),
          q("O que é a otimização de pequenas strings (Small String Optimization - SSO) presente na maioria das implementações de std::string?", "Strings curtas (tipicamente até 15 ou 22 caracteres) são guardadas diretamente no objeto na stack sem alocação no heap", ["Strings são compactadas com zip","Strings são salvas em registradores"], "SSO elimina a sobrecarga de alocar memória no heap para textos curtos, acelerando a execução."),
          q("Qual cabeçalho deve ser incluído para trabalhar com a classe std::string em C++?", "<string>", ["<cstring>","<string.h>","<stdlib.h>"], "<string> define a classe std::string e seus operadores modernos."),
          t("Qual cabeçalho da biblioteca padrão provê a classe std::string em C++?", ["<string>","string"], "<string> provê a classe de strings dinâmicas.", "#include ____"),
          g("Complete a criação de uma string dinâmica vazia utilizando a classe padrão.", ["std::string"], "std::string provê strings dinâmicas seguras com RAII.", "____ mensagem = \"Lincode\";"),
          o("Ordene o ciclo de vida de uma std::string em uma função local.", ["std::string texto = \"Engenharia de Software\"; é instanciada na função","Construtor aloca buffer no heap (ou utiliza SSO para textos curtos)","Operações de concatenação e busca manipulam o texto com segurança","Função encerra e destrutor desaloca automaticamente a memória alocada no heap"], "O ciclo RAII garante que vazamentos de memória de strings sejam virtualmente impossíveis."),
          p("Associe a abstração de string ao seu modelo de gerenciamento de memória.", [["const char* literal = \"Ola\";","Armazenado em segmento de código somente leitura (.rodata)"],["char buffer[100];","Buffer fixo na stack sujeito a overflow se ultrapassar 99 chars"],["std::string texto;","Gerenciamento dinâmico com RAII e SSO automático"],["std::string_view visao;","Visualização leve sem cópia e sem posse de memória"]], "Compreender std::string é fundamental para manipular textos modernos com alta confiabilidade.")
        ]
      },
      {
        id: "cpp-c06-u3-l2-concatenacao-append-reserve",
        title: "Concatenação com +, +=, método append e pré-alocação com reserve()",
        subtitle: "Std::string · Otimizando o crescimento de strings para evitar realocações repetidas",
        theory: "No C++, strings podem ser concatenadas com os operadores + e += ou com o método .append(). Cada ampliação pode provocar realocação no heap e cópia dos dados existentes. Quando o tamanho final aproximado é conhecido, usar .reserve(n) pré-aloca a capacidade interna em uma única operação, acelerando laços.",
        questions: [
          q("Qual é o impacto de concatenar strings repetidamente dentro de um laço sem chamar .reserve()?", "Múltiplas realocações sucessivas no heap com cópia e descarte de buffers intermediários", ["O código trava o sistema operacional","Nenhum impacto de performance"], "Cada estouro de capacidade força a alocação de um novo bloco maior e a migração de todos os caracteres."),
          q("O que o método str.reserve(1000) faz em uma std::string?", "Aloca capacidade para acomodar ao menos 1000 caracteres no heap sem alterar o size() atual da string", ["Preenche a string com 1000 espaços","Limpa o texto existente"], "reserve altera a propriedade capacity() sem alterar o tamanho lógico retornado por size()."),
          q("Qual é a diferença entre os métodos str.size() e str.capacity() em std::string?", "size() é o número atual de caracteres; capacity() é a quantidade que cabe sem nova realocação", ["São rigorosamente a mesma coisa","capacity mede bytes de ponteiro"], "Uma string pode ter size() igual a 10 e capacity() igual a 64, acomodando mais adições sem custo."),
          q("Qual expressão concatena um caractere char no final de uma std::string de forma mais eficiente?", "str += 'A'; ou str.push_back('A');", ["str = str + \"A\";","str.insert(0, 'A');"], "+= e push_back evitam a criação de objetos temporários intermediários."),
          t("Qual método pré-aloca capacidade interna em std::string sem alterar seu tamanho lógico?", ["reserve()","reserve"], "reserve pré-aloca memória no heap.", "texto.____(500);"),
          g("Complete a operação adicionando o sufixo à string original de forma eficiente.", ["+="], "+= anexa texto sem criar instâncias temporárias desnecessárias.", "url ____ \"/api/usuarios\";"),
          o("Ordene a rotina otimizada para construir uma string longa em um laço.", ["Estimar o volume total de caracteres que serão adicionados","Invocar resultado.reserve(totalEstimado); para alocar o buffer único","Executar o laço anexando trechos com resultado += trecho; ou append()","Finalizar o processamento sem nenhuma realocação intermediária no heap"], "Pré-alocar com reserve() transforma algoritmos de montagem de strings em operações O(n) limpas."),
          p("Associe o método de std::string ao seu comportamento.", [["str.reserve(n)","Garante capacidade interna de ao menos n caracteres no heap"],["str.append(s)","Anexa a string s ao final da string atual mutável"],["str.push_back(c)","Anexa um único caractere c ao final da string"],["str.capacity()","Retorna o total de caracteres acomodáveis antes da próxima realocação"]], "Otimizar o crescimento de strings reduz drasticamente o esforço do alocador de memória.")
        ]
      },
      {
        id: "cpp-c06-u3-l3-busca-find-npos-contains",
        title: "Busca textual com find(), rfind(), std::string::npos e contains()",
        subtitle: "Std::string · Localizando padrões e tratando sentinelas de ausência no C++20/23",
        theory: "A classe std::string provê métodos de busca como .find(alvo) para varredura do início ao fim e .rfind(alvo) para varredura reversa. Se o padrão não for localizado, esses métodos retornam a constante sentinela std::string::npos. A partir do C++23, o método .contains(alvo) oferece checagem booleana direta.",
        questions: [
          q("O que o método str.find(\"termo\") retorna caso o padrão não seja encontrado no texto?", "A constante sentinela std::string::npos", ["Retorna -1","Retorna 0","Lança exceção std::out_of_range"], "npos é uma constante estática de valor size_t(-1), indicando formalmente ausência de correspondência."),
          q("Como verificar se uma substring foi localizada com sucesso utilizando .find()?", "if (str.find(\"alvo\") != std::string::npos)", ["if (str.find(\"alvo\") > 0)","if (str.find(\"alvo\") == true)"], "Comparar com != std::string::npos é o padrão canônico para validar ocorrência de buscas em C++."),
          q("Qual método do C++23 permite testar se uma string contém uma substring retornando um booleano?", "str.contains(\"termo\")", ["str.has(\"termo\")","str.includes(\"termo\")","str.exists(\"termo\")"], "contains() foi adicionado no C++23 simplificando testes condicionais rápidos."),
          q("O que o método str.rfind(\"x\") faz de diferente em relação a str.find(\"x\")?", "Realiza a busca da direita para a esquerda, encontrando a última ocorrência do padrão", ["Substitui o caractere por x","Inverte a string antes da busca"], "rfind varre a string reversamente, localizando a ocorrência mais próxima do final."),
          t("Qual constante estática sentinela de std::string sinaliza que o padrão não foi encontrado?", ["std::string::npos","npos"], "npos representa índice inexistente.", "if (pos == std::string::____) { }"),
          g("Complete a condição verificando se o termo foi localizado na string.", ["std::string::npos"], "Comparar com npos valida o sucesso da busca.", "if (pos != ____) { processar(); }"),
          o("Ordene a validação de presença de substring com métodos tradicionais do C++.", ["Executar a busca: auto pos = email.find(\"@\");","Comparar o resultado com a sentinela: if (pos == std::string::npos)","Se igual a npos, tratar o erro de padrão inexistente","Se diferente de npos, utilizar pos como índice válido para extração"], "Tratar rigorosamente std::string::npos evita que o valor sentinela seja usado como índice."),
          p("Associe o método de busca à sua funcionalidade.", [["str.find(\"abc\")","Localiza a primeira ocorrência da esquerda para a direita"],["str.rfind(\"abc\")","Localiza a última ocorrência da direita para a esquerda"],["str.contains(\"abc\")","Retorna true/false indicando presença do padrão (C++23)"],["std::string::npos","Constante sentinela que sinaliza padrão ausente"]], "Dominar buscas textuais e a sentinela npos previne exceções e acessos ilegais à memória.")
        ]
      },
      {
        id: "cpp-c06-u3-l4-substr-replace-erase-mutabilidade",
        title: "Manipulação de conteúdo: substr(), replace() e erase()",
        subtitle: "Std::string · Extraindo fatias e realizando mutações in-place em buffers textuais",
        theory: "No C++, std::string é mutável por concepção, permitindo alterações in-place. O método .substr(pos, count) extrai uma nova string contendo count caracteres a partir de pos; .replace(pos, count, novo) sobrescreve trechos existentes; e .erase(pos, count) remove caracteres encurtando o buffer.",
        questions: [
          q("O que a chamada str.substr(2, 4) produz em C++?", "Uma nova std::string contendo 4 caracteres a partir do índice 2", ["Uma string do índice 2 até o índice 4 (2 caracteres)","Altera a string original in-place"], "O segundo argumento de substr é a quantidade de caracteres (count), não o índice de encerramento."),
          q("O que acontece ao chamar str.substr(5) omitindo o segundo argumento?", "Retorna todos os caracteres a partir do índice 5 até o final da string", ["Retorna apenas 1 caractere","Retorna string vazia"], "O segundo argumento possui como valor padrão std::string::npos, fatiando até o término do texto."),
          q("O que o método str.erase(0, 3) faz na string original?", "Remove os 3 primeiros caracteres (índices 0, 1 e 2) modificando a string in-place", ["Preenche os 3 primeiros caracteres com nulo","Retorna uma nova string sem alterar a original"], "erase altera a string localmente, deslocando os caracteres restantes para a esquerda."),
          q("Como substituir a primeira palavra de 4 caracteres por \"Ola\" usando replace?", "str.replace(0, 4, \"Ola\");", ["str.substitute(0, 4, \"Ola\");","str.set(0, 4, \"Ola\");"], "replace remove a quantidade especificada de caracteres e insere o novo texto no lugar."),
          t("Qual método de std::string extrai uma fatia de caracteres gerando uma nova string?", ["substr()","substr"], "substr recorta um trecho do texto.", "std::string prefixo = codigo.____(0, 2);"),
          g("Complete o comando removendo todo o conteúdo restante a partir do quinto caractere.", ["erase"], "erase encurta a string in-place.", "texto.____(5);"),
          o("Ordene a extração de domínio a partir de um e-mail em std::string.", ["Encontrar a posição do arroba: auto pos = email.find(\"@\");","Verificar se o símbolo existe comparando com std::string::npos","Extrair a substring a partir da posição seguinte: email.substr(pos + 1);","Armazenar o domínio resultante em uma nova variável"], "Combinar find() com substr() é a receita clássica de parsing de texto em C++."),
          p("Associe o método mutador à sua operação em std::string.", [["str.substr(pos, n)","Cria e retorna nova string com n caracteres a partir de pos"],["str.erase(pos, n)","Remove n caracteres a partir de pos alterando str in-place"],["str.replace(pos, n, s)","Substitui n caracteres a partir de pos pelo texto s"],["str.clear()","Remove todos os caracteres deixando size() igual a zero"]], "Métodos mutadores in-place de std::string evitam alocações extras comuns em linguagens gerenciadas.")
        ]
      },
      {
        id: "cpp-c06-u3-l5-interoperabilidade-c-str-data-nulo",
        title: "Interoperabilidade com C: c_str(), data() e caractere nulo",
        subtitle: "Std::string · Conectando strings modernas a bibliotecas nativas e APIs de sistema",
        theory: "Para interoperar com APIs de sistema operacional e bibliotecas legadas em C (como fopen ou printf), a classe std::string provê o método .c_str(). Ele retorna um ponteiro const char* para um buffer garantidamente terminado pelo caractere nulo ('\\0'). O ponteiro é válido enquanto a string não sofrer mutações.",
        questions: [
          q("O que o método str.c_str() retorna em C++?", "Um ponteiro const char* terminado em caractere nulo ('\\0') apontando para o buffer interno da string", ["Uma cópia da string alocada com malloc","Um array de inteiros"], "c_str() viabiliza a passagem direta de std::string para funções C legadas como fopen e strlen."),
          q("Por quanto tempo o ponteiro retornado por str.c_str() permanece válido?", "Enquanto a string original não for destruída nem sofrer mutações que possam realocar seu buffer", ["Para sempre","Apenas até o final da linha"], "Se a string for modificada ou sair de escopo, o ponteiro torna-se um dangling pointer perigoso."),
          q("No C++11 em diante, qual garantia a biblioteca padrão estabeleceu sobre str.data()?", "str.data() passou a garantir obrigatoriamente a presença da terminação nula, assim como c_str()", ["str.data() foi removido","str.data() aloca no heap"], "Desde o C++11, str.data() e str.c_str() produzem resultados equivalentes com terminação nula."),
          q("Como abrir um arquivo com std::ifstream passando o caminho armazenado em std::string no C++98 vs C++11?", "No C++98 exigia-se arq.open(caminho.c_str()); no C++11 em diante aceita arq.open(caminho) diretamente", ["Sempre exigiu ponteiro void*","Nunca suportou std::string"], "C++ moderno aceita std::string e std::string_view diretamente na maioria das streams de E/S."),
          t("Qual método de std::string obtém um ponteiro const char* terminado em nulo para interoperar com C?", ["c_str()","c_str"], "c_str expõe o buffer com terminação nula.", "printf(\"%s\\n\", texto.____);"),
          g("Complete a chamada à função legada em C passando a representação terminada em nulo.", ["c_str()"], "c_str() provê compatibilidade com APIs em C.", "FILE* f = fopen(nomeArquivo.____, \"r\");"),
          o("Ordene os cuidados ao passar c_str() para uma biblioteca externa.", ["Verificar se a std::string contém os dados textuais válidos","Invocar str.c_str() diretamente no argumento da função externa consumidora","Não armazenar o ponteiro resultante para uso posterior assíncrono","Garantir que a std::string dona do buffer sobreviva durante toda a execução da chamada C"], "Respeitar a validade do buffer interno de std::string afasta bugs de ponteiro pendente."),
          p("Associe o método ou conceito à sua semântica de interoperabilidade.", [["str.c_str()","Ponteiro const char* terminado em '\\0' para consumo em código C"],["str.data() (C++11+)","Ponteiro contíguo terminado em nulo equivalente a c_str()"],["Caractere '\\0'","Byte zero sentinela que marca o final de strings em estilo C"],["Dangling pointer em c_str()","Risco ao salvar o ponteiro e destruir a std::string de origem"]], "Interoperar com bibliotecas em C através de c_str() é um pilar cotidiano da programação de sistemas.")
        ]
      }
    ],
    4: [
      {
        id: "cpp-c06-u4-l1-perigo-undefined-behavior-acesso-fora-limites",
        title: "Comportamento Indefinido (UB) em acessos fora dos limites",
        subtitle: "Índices e limites · Por que C++ não previne estouros de array em runtime por padrão",
        theory: "No C++, acessar além das fronteiras de um array via colchetes [] gera Comportamento Indefinido (Undefined Behavior - UB). A CPU não checa limites para poupar ciclos de clock. Efeitos variam de leituras de dados corrompidos a falhas de segmentação (SIGSEGV) e brechas de segurança críticas.",
        questions: [
          q("O que acontece formalmente na linguagem C++ ao executar int x = arr[10]; em um array de 5 elementos?", "Comportamento Indefinido (Undefined Behavior): o compilador não garante nenhum comportamento específico", ["O programa sempre encerra com tela azul","O compilador gera zero automaticamente"], "UB significa ausência total de garantias da especificação ISO, podendo funcionar, travar ou corromper dados."),
          q("Por que a linguagem C++ não impõe checagem obrigatória de limites no operador [] por padrão?", "Por fidelidade ao princípio de custo zero: não penalizar a performance de laços com instruções de teste na CPU", ["Porque computadores não conseguem testar números","Por falha de projeto esquecida"], "A filosofia de C++ é dar controle total ao programador, permitindo que código crítico rode em velocidade máxima."),
          q("Qual é o perigo de segurança mais destrutivo associado à escrita fora dos limites de um array?", "Buffer Overflow: sobreescrita da memória adjacente, que pode corromper o endereço de retorno e permitir injeção de código", ["A tela do monitor apagar","A bateria descarregar"], "Buffer overflows históricos em C/C++ são a causa primária de exploits e invasões de sistemas operacionais."),
          q("O que acontece se uma função escrever acidentalmente em uma posição além do final de um array na stack?", "Pode sobrescrever o stack frame da função, o frame pointer (RBP) e o endereço de retorno (RIP)", ["Apenas o array é limpo","O compilador reverte a escrita"], "Corromper o endereço de retorno provoca falhas catastróficas ao executar ret em assembly."),
          t("Como se chama a classificação formal do padrão C++ para operações sem comportamento previsível?", ["undefined behavior","comportamento indefinido","UB"], "Undefined Behavior permite que qualquer efeito ocorra.", "Acesso fora da faixa gera: ____"),
          g("Complete o conceito de vulnerabilidade: a escrita além do limite é conhecida como buffer ____.", ["overflow"], "Buffer overflow corrompe a memória ao redor do array.", "Vulnerabilidade de segurança: buffer ____"),
          o("Ordene as consequências potenciais de uma escrita fora dos limites na pilha.", ["Array local na stack é ultrapassado por um laço com índice excessivo","Bytes adjacentes na memória da stack são sobrescritos silenciosamente","O endereço de retorno empilhado pela instrução call é adulterado","A instrução ret desvia para memória corrompida disparando Segmentation Fault ou exploit"], "A ausência de bounds checking em [] exige vigilância redobrada do engenheiro."),
          p("Associe o evento ao seu efeito no sistema operacional.", [["Leitura fora dos limites","Pode ler lixo, expor dados sigilosos ou causar SIGSEGV"],["Escrita fora dos limites","Buffer overflow, corrupção de variáveis e vulnerabilidades críticas"],["Acesso dentro dos limites [0, N-1]","Operação segura e previsível em tempo constante O(1)"],["Undefined Behavior (UB)","Situação onde a especificação do C++ não garante nenhuma regra"]], "Entender o peso do Comportamento Indefinido é o primeiro passo para escrever C++ defensivo.")
        ]
      },
      {
        id: "cpp-c06-u4-l2-tipos-indices-size-t-conversoes-avisos",
        title: "Tipos de índices: size_t, avisos de conversão e signedness",
        subtitle: "Índices e limites · Inteiros sinalizados vs não-sinalizados e comparações perigosas",
        theory: "No C++, o tipo padrão para tamanhos e índices de contêineres é std::size_t, um inteiro não-sinalizado (unsigned) de 64 bits. Comparar int sinalizado com size_t dispara alertas do compilador (-Wsign-compare), pois números negativos sofrem conversão implícita para valores gigantescos (ex: -1 vira 18 quintilhões).",
        questions: [
          q("Qual é o tipo padrão retornado pelos métodos .size() de contêineres da STL no C++?", "std::size_t (definido em <cstddef>)", ["int","long","short"], "size_t é um inteiro sem sinal projetado para representar a capacidade máxima de endereçamento da arquitetura."),
          q("Por que a comparação int i = -1; if (i < vec.size()) é uma armadilha perigosa em C++?", "Porque -1 é promovido para unsigned, tornando-se o maior número positivo de 64 bits, avaliando a condição como falsa", ["Porque o compilador recusa a compilar","Porque i é zerado"], "A conversão aritmética usual promove o tipo sinalizado para sem sinal, invertendo a lógica da comparação."),
          q("Como percorrer um contêiner STL indexado com laço for tradicional sem gerar avisos de compilação?", "Usando std::size_t como tipo da variável de controle: for (std::size_t i = 0; i < c.size(); ++i)", ["Usando char","Usando double"], "Utilizar o mesmo tipo da dimensão do contêiner elimina avisos de -Wsign-compare e previne bugs."),
          q("Qual flag de compilador no GCC/Clang ativa alertas sobre comparações perigosas entre signed e unsigned?", "-Wsign-compare (incluído em -Wall e -Wextra)", ["-O3","-g","-std=c++20"], "-Wsign-compare sinaliza imediatamente comparações entre tipos com e sem sinal."),
          t("Qual tipo inteiro sem sinal da biblioteca padrão é utilizado para indexar coleções em C++?", ["std::size_t","size_t"], "size_t é o tipo padrão para dimensões.", "for (std::____ i = 0; i < total; ++i) { }"),
          g("Complete o tipo do índice do laço for alinhado com o contêiner.", ["std::size_t"], "std::size_t previne avisos de disparidade de sinal.", "for (____ i = 0; i < dados.size(); ++i) { }"),
          o("Ordene a progressão de conversão de sinal perigosa no C++.", ["Desenvolvedor declara int indice = -1;","Compara com o tamanho: if (indice < lista.size())","Compilador aplica regras de promoção aritmética convertendo indice para size_t","O valor -1 transforma-se em 18446744073709551615 (0xFFFFFFFFFFFFFFFF)"], "Misturar inteiros sinalizados e não sinalizados é uma das causas mais comuns de loops infinitos e falhas."),
          p("Associe o tipo à sua característica de sinal em C++.", [["std::size_t","Inteiro sem sinal (unsigned) que nunca armazena números negativos"],["int","Inteiro sinalizado de 32 bits comum que aceita valores positivos e negativos"],["std::ptrdiff_t","Inteiro sinalizado usado para representar a distância entre dois ponteiros"],["-Wsign-compare","Flag de compilador que adverte sobre comparações entre signed e unsigned"]], "Manter consistência de tipos em índices blinda o software contra armadilhas de promoção aritmética.")
        ]
      },
      {
        id: "cpp-c06-u4-l3-defesa-ativa-validacao-faixa-pre-indexacao",
        title: "Defesa ativa: validação de faixa antes da indexação",
        subtitle: "Índices e limites · Cláusulas de guarda para garantir 0 <= indice < tamanho",
        theory: "A abordagem mais limpa e veloz para evitar acessos ilegais é a validação prévia de limites (bounds checking preventivo). Antes de usar o operador [] com índices dinâmicos, o código deve avaliar uma cláusula de guarda: if (indice < colecao.size()), rejeitando ou tratando índices fora do intervalo semiaberto [0, size()).",
        questions: [
          q("Qual é a condição lógica para garantir que um índice i seja válido para acessar um contêiner em C++?", "0 <= i e i < colecao.size() (ou apenas i < colecao.size() se i for do tipo sem sinal size_t)", ["i <= colecao.size()","i > 0"], "Como índices iniciam em 0, o último elemento legítimo reside estritamente em size() - 1."),
          q("O que é uma cláusula de guarda (guard clause) na validação de limites de coleções?", "Uma verificação condicional no início da função que aborta ou retorna erro se o índice for inválido", ["Uma trava física de processador","Um comentário no código"], "Cláusulas de guarda mantêm o fluxo principal linear e protegem contra acessos fora de faixa."),
          q("Se o índice recebido for um int sinalizado, por que validar apenas i < tamanho é insuficiente?", "Porque índices negativos como -1 ou -5 passariam despercebidos se não houver checagem de i >= 0", ["Porque int é maior que size_t","Porque números negativos são convertidos em zero"], "Se o tipo for sinalizado, a verificação deve cobrir ambas as extremidades: menor que zero e maior/igual ao tamanho."),
          q("Como retornar com elegância a ausência de valor quando um índice solicitado for inválido no C++17?", "Retornando std::optional<T> com std::nullopt em caso de índice inexistente", ["Lançando exceção fatal","Retornando ponteiro void*"], "std::optional expressa com extrema clareza a possibilidade de ausência sem penalidade de exceções."),
          t("Qual símbolo de desigualdade estrita valida se o índice está abaixo do limite superior da coleção?", ["<"], "O índice deve ser estritamente menor que size().", "if (indice ____ colecao.size()) { acessar(); }"),
          g("Complete a cláusula de guarda que rejeita índices fora da faixa válida.", [">= colecao.size()"], "Índices iguais ou superiores ao tamanho estão fora da coleção.", "if (indice < 0 || indice ____) return std::nullopt;"),
          o("Ordene as etapas da validação defensiva antes de indexar um array.", ["Receber o índice solicitado pelo usuário ou módulo externo","Validar extremidade inferior se sinalizado: if (indice < 0) return erro;","Validar extremidade superior: if (indice >= colecao.size()) return erro;","Acessar o elemento com segurança total: auto item = colecao[indice];"], "Bounds checking explícito confere segurança determinística com impacto mínimo na performance."),
          p("Associe a faixa de índice ao seu estado operacional em coleção de tamanho 5.", [["Índice 0","Primeiro elemento válido da coleção"],["Índice 4","Último elemento válido da coleção (size - 1)"],["Índice 5","Fora dos limites: violação que deve ser barrada pela guarda"],["Índice -1","Índice negativo inválido para tipos sinalizados"]], "Praticar programação defensiva em limites elimina grande parte dos defeitos de sistemas em C++.")
        ]
      },
      {
        id: "cpp-c06-u4-l4-metodo-at-excecoes-out-of-range",
        title: "O método .at() e tratamento com std::out_of_range",
        subtitle: "Índices e limites · Capturando violações de limites em blocos try/catch estruturados",
        theory: "Tanto std::array quanto std::vector e std::string oferecem o método .at(i). Quando um índice fora da faixa legítima é fornecido, ele lança a exceção std::out_of_range (definida em <stdexcept>). Isso permite capturar o erro em um bloco try-catch, registrar um log amigável e recuperar o fluxo sem derrubar a aplicação.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão define a classe de exceção std::out_of_range?", "<stdexcept>", ["<exception>","<limits>","<cassert>"], "<stdexcept> reúne as exceções padrão de lógica e runtime como out_of_range e invalid_argument."),
          q("Qual método da exceção capturada (catch (const std::exception& e)) expõe a mensagem descritiva?", "e.what()", ["e.message()","e.details()","e.toString()"], "what() retorna um const char* descrevendo a falha capturada pela hierarquia de exceções."),
          q("Por que contêineres de alta performance preferem [] em vez de .at() em laços numéricos internos?", "Porque .at() adiciona uma instrução de branch condicional a cada iteração, penalizando o pipeline da CPU", ["Porque .at() aloca memória dinâmica","Porque .at() foi descontinuado"], "Em algoritmos com milhões de acessos, a checagem redundante de limites reduz o throughput de dados."),
          q("Qual é o benefício arquitetural de usar .at() em código de validação de configuração ou arquivos?", "Permite isolar erros de entrada e tratá-los de forma centralizada sem arriscar corrupção de memória", ["Gera binários menores","Acelera a compilação"], "Capturar exceções de borda protege a integridade de servidores e serviços contínuos."),
          t("Qual método da classe de exceção expõe a descrição em texto do erro capturado?", ["what()","what"], "what() retorna a mensagem explicativa da exceção.", "std::cout << e.____ << std::endl;"),
          g("Complete o bloco try-catch capturando a exceção de violação de limites por referência.", ["std::out_of_range"], "Capturar por const ref evita cópias e preserva polimorfismo de exceção.", "try { v.at(i); } catch (const ____& e) { }"),
          o("Ordene a jornada de uma chamada com índice fora de faixa usando o método .at().", ["Aplicação invoca dados.at(indiceInvalido) dentro de um bloco try","Método at detecta que o índice viola a fronteira do contêiner","Instancia e lança throw std::out_of_range(\"indice invalido\");","Bloco catch captura a exceção e emite log de recuperação graciosa"], "O tratamento estruturado com out_of_range impede que falhas de limite abortem o processo abruptamente."),
          p("Associe o componente de tratamento ao seu papel.", [[".at(i)","Acesso com checagem interna de limites e lançamento de exceção"],["std::out_of_range","Tipo de exceção lançado quando o índice viola [0, size())"],["e.what()","Mensagem diagnóstica da exceção em formato const char*"],["bloco catch","Captura e trata o erro sem derrubar o executável"]], "Utilizar .at() e out_of_range é a resposta canônica para tolerância a falhas em entradas externas.")
        ]
      },
      {
        id: "cpp-c06-u4-l5-deteccao-asan-e-debug-iterators",
        title: "Detecção de violações com AddressSanitizer e Debug STL",
        subtitle: "Índices e limites · Encontrando bugs de limites com -fsanitize=address e _GLIBCXX_DEBUG",
        theory: "Erros de limites sutis em acessos com [] podem passar despercebidos em testes manuais. O AddressSanitizer (-fsanitize=address no GCC/Clang/MSVC) intercepta buffer overflows instantaneamente, enquanto macros como _GLIBCXX_DEBUG forçam checagem estrita de limites nos contêineres e iteradores da STL.",
        questions: [
          q("O que a flag de compilação -fsanitize=address (ASan) faz em programas C++?", "Instrumenta o binário para interceptar qualquer leitura ou escrita fora dos limites de arrays em tempo de execução", ["Acelera a velocidade do código em 200%","Comprime o executável final"], "ASan insere sentinelas de memória (red zones) que disparam relatório detalhado ao menor desvio de ponteiro."),
          q("Qual é a sobrecarga típica de performance ao rodar uma bateria de testes com AddressSanitizer ativado?", "O programa roda tipicamente cerca de 2x mais lento, sendo ideal para suítes de testes automatizados e CI", ["O programa roda 1000x mais lento","Zero impacto"], "A instrumentação do ASan é rápida o suficiente para ser executada em testes contínuos em pipelines de CI/CD."),
          q("O que a macro _GLIBCXX_DEBUG ativa na biblioteca padrão libstdc++ do GCC?", "Modo de depuração que adiciona bounds checking automático no operador [] e valida iteradores", ["Desativa todos os templates","Habilita multithreading"], "Debug iterators e contêineres instrumentados convertem UB de limites em asserções visíveis em tempo de debug."),
          q("Qual asserção padrão do C++ (<cassert>) pode ser incluída antes do acesso [] para conferência rápida?", "assert(indice < colecao.size());", ["verify(indice);","check(indice);"], "assert valida a expressão em compilações de Debug e é desativada em compilações de Release (-DNDEBUG)."),
          t("Qual flag do GCC e Clang habilita a instrumentação do AddressSanitizer durante o build?", ["-fsanitize=address","fsanitize=address"], "ASan detecta corrupções e estouros de memória.", "g++ -O1 ____ main.cpp"),
          g("Complete a macro clássica de asserção de depuração validando o limite superior.", ["assert"], "assert confere condições em builds de desenvolvimento.", "____(pos < dados.size());"),
          o("Ordene o fluxo de trabalho com AddressSanitizer no ciclo de desenvolvimento em C++.", ["Compilar o projeto com as flags de depuração: -g -fsanitize=address","Executar a suíte de testes unitários automatizados","Se houver acesso fora dos limites, ASan aborta e imprime call stack exato com linha","Corrigir o índice incorreto e reexecutar até o pipeline passar com zero alertas"], "Ferramentas de sanitização de memória são o padrão da indústria para garantir integridade do software."),
          p("Associe a ferramenta de depuração ao seu diagnóstico primordial.", [["-fsanitize=address (ASan)","Detecta buffer overflow na stack, no heap e variáveis globais"],["_GLIBCXX_DEBUG","Ativa validação de limites e iteradores na STL em tempo de teste"],["assert(expressao)","Valida invariantes em builds de depuração sem custo em Release"],["Valgrind (Memcheck)","Analisa binários compilados em busca de acessos ilegais à memória"]], "Adotar sanitizadores modernos garante que nenhum acesso fora dos limites chegue a produção.")
        ]
      }
    ],
    5: [
      {
        id: "cpp-c06-u5-l1-definicao-structs-acesso-ponto",
        title: "Definição de structs em C++ e acesso a membros com operador ponto",
        subtitle: "Structs · Agrupando variáveis heterogêneas e acessando campos com .",
        theory: "No C++, a palavra-chave struct agrupa variáveis de tipos heterogêneos sob um único registro lógico. Ao declarar uma struct, cria-se um novo tipo de dado definido pelo usuário. Os campos membros de uma instância são acessados ou modificados através do operador ponto (.) com tempo constante e segurança estática.",
        questions: [
          q("Qual é o propósito fundamental de uma struct na linguagem C++?", "Agrupar variáveis heterogêneas (de tipos distintos) sob uma única estrutura de dados coesa", ["Alocar memória exclusivamente no heap","Criar laços de repetição automáticos"], "Structs modelam entidades do mundo real agrupando propriedades correlacionadas em um registro único."),
          q("Qual operador é utilizado para acessar um membro de uma instância de struct em C++?", "O operador ponto (.)", ["O operador seta (->)","O operador de dois pontos (::)","O operador arroba (@)"], "O operador ponto acessa diretamente os membros de valores ou referências a structs."),
          q("Como declarar e instanciar uma struct Ponto contendo int x e int y no C++ moderno?", "struct Ponto { int x; int y; }; Ponto p = {10, 20};", ["Ponto = struct(x, y);","new struct Ponto(10, 20);"], "Em C++, o nome da struct torna-se um identificador de tipo de primeira classe sem exigir a palavra typedef."),
          q("Qual caractere de pontuação obrigatório deve encerrar a definição de uma struct em C++?", "Ponto e vírgula (;)", ["Dois pontos (:)","Ponto (.)","Nenhum caractere"], "Esquecer o ponto e vírgula após a chave de fechamento da struct gera um dos erros clássicos de compilação em C++."),
          t("Qual operador de caractere único acessa membros de uma struct por valor ou referência?", [".","ponto"], "O ponto acessa campos de instâncias de struct.", "jogador.____pontos = 100;"),
          g("Complete a definição da struct adicionando o ponto e vírgula de encerramento.", [";"], "A definição de structs exige ponto e vírgula final.", "struct Jogador { int id; }____"),
          o("Ordene a definição e o uso de uma struct em C++.", ["Definir o modelo com struct Usuario { int id; std::string nome; };","Instanciar uma variável do tipo Usuario na pilha: Usuario u1;","Atribuir valor ao primeiro membro: u1.id = 101;","Atribuir valor ao segundo membro: u1.nome = \"Lincode\";"], "Structs oferecem tipagem forte e organização impecável a registros de negócio."),
          p("Associe o termo de struct ao seu significado em C++.", [["struct Ponto { ... };","Declaração do modelo do novo tipo de dado"],["p.x = 5;","Acesso e mutação de campo membro via operador ponto"],["sizeof(Ponto)","Tamanho total em bytes ocupado pela struct na memória"],["Ponto p1, p2;","Instanciação de duas variáveis independentes do tipo Ponto"]], "Structs são o bloco construtor fundamental de estruturas compostas no ecossistema C++.")
        ]
      },
      {
        id: "cpp-c06-u5-l2-structs-vs-classes-visibilidade-padrao",
        title: "Structs vs Classes em C++: a visibilidade padrão",
        subtitle: "Structs · A única diferença conceitual: membros public por padrão vs private",
        theory: "Em C++, structs e classes são tecnicamente idênticas com apenas uma diferença conceitual: membros e herança de struct são públicos (public) por padrão, enquanto em class são privados (private). Qualquer recurso de classe (métodos, construtores, templates e polimorfismo) funciona perfeitamente em structs.",
        questions: [
          q("Qual é a única diferença formal entre struct e class na especificação da linguagem C++?", "Em struct a visibilidade e herança padrão são public; em class a visibilidade e herança padrão são private", ["Struct não suporta métodos","Class roda apenas no heap"], "Structs e classes compartilham a mesma mecânica interna; diferem apenas no especificador de acesso padrão."),
          q("Se declararmos int valor; dentro de uma struct sem nenhum especificador de acesso, ele será:", "Público (public), acessível diretamente de fora da estrutura", ["Privado (private)","Protegido (protected)"], "Por padrão de design, structs facilitam acesso livre aos seus dados agregados."),
          q("É permitido declarar métodos, construtores e operadores dentro de uma struct em C++?", "Sim, structs em C++ possuem plenas capacidades de orientação a objetos, igual às classes", ["Não, apenas dados brutos são permitidos","Apenas com herança múltipla"], "Diferente do C puro, no C++ structs são classes completas com visibilidade pública inicial."),
          q("Qual é a convenção idiomática adotada pela comunidade C++ para escolher entre struct e class?", "Usa-se struct para agregados de dados passivos (Data Transfer Objects) e class quando há encapsulamento rígido e invariantes", ["Usa-se struct apenas para números","Usa-se class apenas para strings"], "A convenção reserva struct para estruturas transparentes e class para abstrações com controle estrito de estado."),
          t("Qual é o modificador de acesso implícito para membros declarados dentro de uma struct?", ["public","publico","público"], "Membros de struct são públicos por convenção e regra.", "Visibilidade padrão: ____"),
          g("Complete a alteração de visibilidade tornando o membro da struct privado.", ["private:"], "private restringe o acesso aos membros subsequentes.", "struct Conta {\n____\n  double saldo;\n};"),
          o("Ordene a visibilidade implícita de struct e class em C++.", ["Declarar struct S { int x; }; -> x é público por padrão","Código externo pode ler e modificar s.x livremente","Declarar class C { int y; }; -> y é privado por padrão","Código externo tentando acessar c.y sofre erro fatal de compilação"], "Compreender a paridade entre struct e class elimina falsas dicotomias em C++."),
          p("Associe a estrutura à sua visibilidade padrão na linguagem.", [["struct Dados { int a; };","a é público por padrão em structs"],["class Objeto { int b; };","b é privado por padrão em classes"],["struct D : Base { };","Herança pública por padrão (public Base)"],["class E : Base { };","Herança privada por padrão (private Base)"]], "Structs no C++ moderno unem o pragmatismo de dados abertos ao poder do paradigma OO.")
        ]
      },
      {
        id: "cpp-c06-u5-l3-valores-padrao-default-member-initializers",
        title: "Inicializadores padrão de membros (Default Member Initializers)",
        subtitle: "Structs · Garantindo valores iniciais consistentes a partir do C++11",
        theory: "No C++11 em diante, é possível definir valores padrão diretamente na declaração dos campos de uma struct (ex: int vida = 100;). Esse recurso (Default Member Initializer) garante que instâncias criadas sem argumentos recebam valores válidos e seguros por construção, eliminando lixo de memória na stack.",
        questions: [
          q("Qual é a vantagem de utilizar Default Member Initializers (ex: int idade = 0;) em structs C++11+?", "Garante que o membro receba um valor inicial previsível, prevenindo leituras acidentais de lixo de memória", ["Acelera a velocidade dos laços de repetição","Diminui o tamanho da struct em bytes"], "Membros com inicializadores padrão eliminam o risco de variáveis não-inicializadas."),
          q("O que acontece se uma struct tiver int nivel = 1; e for instanciada com Jogador j{ .nivel = 5 };?", "O valor explícito (5) sobrescreve o valor padrão (1) da declaração", ["Ocorre erro de compilação","O valor final é somado (6)"], "Valores fornecidos explicitamente no ponto de instanciação têm precedência sobre os padrões."),
          q("Se uma struct possuir membros com valores padrão e membros sem padrão, o que ocorre com os não especificados na inicialização agregada?", "Membros omitidos na inicialização agregada assumem seus valores padrão ou são zerados", ["Permanecem com lixo de memória","A compilação falha"], "A inicialização agregada preenche os campos omitidos respeitando seus defaults declarados."),
          q("Valores padrão de membros são computados em tempo de compilação ou de execução?", "Expressões constantes são computadas em tempo de compilação; expressões dinâmicas rodam ao instanciar", ["Sempre apenas em tempo de execução","Apenas no linker"], "Inicializadores literais são processados estaticamente sem sobrecarga de runtime."),
          t("Qual símbolo de atribuição associa o valor inicial padrão na declaração de um membro de struct?", ["="], "O sinal de igual associa o default.", "struct Monstro { int vida ____ 100; };"),
          g("Complete a definição da struct atribuindo o estado booleano ativo padrão como true.", ["true"], "Valores booleanos padrão asseguram estados válidos.", "struct Servico { bool ativo = ____; };"),
          o("Ordene a instanciação de uma struct com valores padrão.", ["Definir struct Configuracao { int timeout = 30; bool log = false; };","Instanciar variável sem argumentos: Configuracao config;","Membro timeout recebe 30 automaticamente por definição padrão","Membro log recebe false automaticamente sem lixo de memória"], "Default member initializers formam uma barreira de segurança vital em C++ moderno."),
          p("Associe a instanciação ao valor final do membro timeout.", [["Configuracao c1;","timeout assume 30 por valor padrão"],["Configuracao c2{ 60 };","timeout assume 60 sobrescrevendo o padrão"],["Configuracao c3{ .timeout = 90 };","timeout assume 90 via inicialização designada"],["Configuracao c4{};","timeout assume 30 preservando o valor padrão"]], "Inicializadores em linha tornam structs robustas e imunes a esquecimentos de inicialização.")
        ]
      },
      {
        id: "cpp-c06-u5-l4-funcoes-membros-e-metodos-em-structs",
        title: "Funções membros e métodos auxiliares em structs C++",
        subtitle: "Structs · Adicionando comportamento, formatação e validação de invariantes",
        theory: "No C++, structs podem conter funções membros completas que operam sobre os dados da própria instância. Métodos como .calcularTotal() ou .exibir() encapsulam operações diretamente onde os dados residem. Quando um método não altera nenhum membro, marcá-lo com const assegura sua invocação em instâncias imutáveis.",
        questions: [
          q("Como um método definido dentro de uma struct acessa os campos da própria instância em C++?", "Acessa diretamente pelo nome do membro ou explicitamente através do ponteiro this->membro", ["Exige passar a struct como parâmetro","Através de variáveis globais"], "Funções membros possuem acesso implícito a todos os campos da instância através do ponteiro this."),
          q("Por que é essencial qualificar métodos de leitura de uma struct com a palavra-chave const?", "Para permitir que instâncias constantes (const Struct&) possam invocar o método sem erro de compilação", ["Para acelerar a compilação","Para impedir que o método retorne dados"], "Instâncias const só podem executar funções membros formalmente declaradas com const."),
          q("Onde o corpo de um método de struct pode ser implementado no C++?", "Diretamente dentro da struct (sendo implicitamente inline) ou externamente usando Struct::metodo()", ["Exclusivamente em arquivos .asm","Apenas no mesmo arquivo .h"], "Métodos declarados fora da struct usam o operador de resolução de escopo :: para vinculação."),
          q("Métodos dentro de structs em C++ aumentam o tamanho em bytes (sizeof) da instância se não forem virtuais?", "Não, métodos normais residem no segmento de código de texto (.text) e não ocupam espaço na instância", ["Sim, cada método adiciona 8 bytes","Sim, ocupam memória na stack"], "Funções membros não-virtuais têm custo zero de armazenamento por instância na memória RAM."),
          t("Qual palavra-chave no final da assinatura de um método de struct garante que ele não altera os dados?", ["const"], "const após os parênteses assegura pureza de leitura.", "double calcularArea() ____;"),
          g("Complete o método de leitura garantindo compatibilidade com instâncias constantes.", ["const"], "const habilita a invocação em objetos imutáveis.", "void imprimir() ____ { std::cout << id; }"),
          o("Ordene a execução de um método membro de struct em C++.", ["Instância retangulo é criada na stack com largura e altura","Chamada retangulo.area() invoca a função membro correspondente","Endereço da instância é passado implicitamente no registrador do ponteiro this","Método calcula this->largura * this->altura e retorna o resultado"], "Métodos membros unem coesão de dados e comportamento com máxima eficiência de chamada."),
          p("Associe o método ao seu qualificador de estado em struct.", [["double getSaldo() const;","Método de consulta somente leitura que não altera membros"],["void depositar(double v);","Método mutador que altera o estado interno da struct"],["Ponto transladar(int dx) const;","Retorna novo Ponto calculado sem alterar o objeto atual"],["bool ehValido() const noexcept;","Consulta de integridade que garante não lançar exceções"]], "Incorporar funções membros em structs eleva o nível semântico e a coesão do modelo de domínio.")
        ]
      },
      {
        id: "cpp-c06-u5-l5-ponteiros-para-structs-operador-seta",
        title: "Ponteiros para structs e o operador seta (->)",
        subtitle: "Structs · Simplificando (*ptr).membro com a sintaxe canônica ptr->membro",
        theory: "Ao manipular uma struct através de um ponteiro (Ponto* ptr), o acesso aos seus membros exige desreferenciar o ponteiro antes de usar o ponto: (*ptr).x. Para eliminar os parênteses obrigatórios decorrentes da precedência de operadores, o C++ provê o operador seta (ptr->x), tornando a notação limpa e idiomática.",
        questions: [
          q("Por que a expressão *ptr.x gera erro de compilação quando ptr é um ponteiro para struct?", "Porque o operador ponto tem precedência maior que o asterisco, tentando avaliar ptr.x antes de desreferenciar", ["Porque asterisco é proibido em structs","Porque x precisa ser estático"], "A precedência elevada do ponto (.) exige parênteses obrigatórios: (*ptr).x."),
          q("A expressão ptr->membro é rigorosamente equivalente a qual sintaxe expandida em C++?", "(*ptr).membro", ["*(ptr.membro)","&ptr.membro","ptr::membro"], "O operador seta é um atalho sintático canônico para desreferenciação seguida de acesso."),
          q("O que acontece se aplicarmos o operador seta em um ponteiro nulo (ex: ptr = nullptr; ptr->x = 10)?", "Falha de segmentação (Segmentation Fault) imediata por desreferenciação de ponteiro nulo", ["O valor é descartado sem erro","Cria uma struct automática"], "Desreferenciar nullptr viola a integridade de acesso à memória, derrubando o processo."),
          q("O operador seta (->) funciona com ponteiros inteligentes modernos como std::unique_ptr e std::shared_ptr?", "Sim, ponteiros inteligentes sobrecarregam operator-> reproduzindo o comportamento exato de ponteiros brutos", ["Não, apenas ponteiros brutos funcionam","Apenas com std::weak_ptr"], "A sobrecarga de operator-> permite que smart pointers atuem como ponteiros nativos com RAII."),
          t("Qual símbolo de pontuação de dois caracteres representa o operador de acesso através de ponteiro?", ["->","seta"], "O traço seguido de maior forma a seta.", "ptr____valor = 42;"),
          g("Complete o acesso ao campo através do ponteiro utilizando o operador seta.", ["->"], "A seta desreferencia e acessa o membro em um único operador.", "int idAtual = usuario____id;"),
          o("Ordene a resolução do operador seta no compilador C++.", ["Compilador identifica a expressão ptr->campo no código fonte","Verifica se o tipo de ptr é ponteiro para struct (ou tipo com operator->)","Desreferencia o endereço de memória base da instância (*ptr)","Aplica o offset em bytes do campo para ler ou escrever o valor"], "O operador seta simplifica expressivamente o manuseio de referências indiretas em C++."),
          p("Associe a expressão à sua semântica de acesso em C++.", [["instancia.x","Acesso direto a membro de objeto alocado por valor"],["ptr->x","Acesso a membro através de ponteiro usando operador seta"],["(*ptr).x","Forma expandida equivalente a ptr->x com desreferenciação"],["&instancia","Obtém o endereço físico da struct gerando um ponteiro"]], "O operador seta é indispensável no trato cotidiano de referências e ponteiros em C++.")
        ]
      }
    ],
    6: [
      {
        id: "cpp-c06-u6-l1-conceito-agregados-inicializacao-chaves",
        title: "Conceito de Agregados (Aggregates) e inicialização por chaves",
        subtitle: "Agregados · Regras formais para inicialização direta sem construtores explícitos",
        theory: "Em C++, um Agregado é um tipo estruturado (array ou struct/class) sem construtores declarados pelo usuário, sem membros privados e sem classes bases virtuais. Agregados suportam inicialização por lista entre chaves (aggregate initialization), permitindo preenchimento direto e posicional de seus membros.",
        questions: [
          q("O que caracteriza um tipo Agregado (Aggregate Type) na especificação do C++?", "Uma struct ou array sem construtores explícitos declarados pelo usuário, sem membros privados e sem herança virtual", ["Uma classe com múltiplos destrutores","Um tipo alocado no heap"], "Agregados possuem layout simples e direto, dispensando lógica complexa de inicialização."),
          q("Como funciona a inicialização por chaves Config cfg = {10, \"localhost\", true}; em uma struct agregada?", "Os valores são atribuídos sequencialmente aos membros na exata ordem em que foram declarados na struct", ["Os valores são ordenados alfabeticamente","Ocorre sorteio de posições"], "A correspondência posicional direta atribui o primeiro valor ao primeiro membro e assim sucessivamente."),
          q("O que acontece se uma struct declarar um construtor explícito (ex: Ponto(int x, int y)) no C++11/17?", "Ela deixa de ser um agregado formal, passando a exigir chamadas através do construtor declarado", ["Ela ganha mais velocidade","Ela se torna um array C"], "Declarar construtores customizados desativa as regras formais de inicialização agregada pura."),
          q("O que o compilador faz se a lista de chaves contiver menos argumentos que os membros do agregado?", "Os membros restantes recebem seus valores padrão declarados ou são zerados (value-initialization)", ["A compilação falha imediatamente","Os membros restantes contêm lixo"], "A omissão de argumentos na inicialização por chaves aciona preenchimento seguro com zeros ou defaults."),
          t("Qual símbolo de pontuação delimita a lista de inicialização agregada no C++?", ["{}","chaves"], "Chaves delimitam a lista de agregados.", "Vetor v = ____ 1.0, 2.0, 3.0 };"),
          g("Complete a inicialização agregada de uma struct com dois números inteiros.", ["{10, 20}"], "Chaves posicionais preenchem os membros na ordem.", "Ponto p = ____;"),
          o("Ordene a mecânica de inicialização agregada pelo compilador C++.", ["Compilador confere se a struct atende aos critérios formais de agregado","Lê a sequência de expressões fornecida dentro das chaves {}","Atribui cada expressão ao membro correspondente na ordem da declaração","Aplica value-initialization (zeros) para quaisquer membros omitidos"], "A inicialização agregada simplifica o código eliminando construtores burocráticos."),
          p("Associe o tipo à sua classificação como agregado no C++17.", [["struct S { int a; double b; };","Agregado válido: sem construtor de usuário e membros públicos"],["int arr[5];","Agregado nativo: arrays são agregados por definição"],["class C { private: int x; };","Não é agregado: possui membro privado"],["struct T { T(int); int a; };","Não é agregado: declarou construtor explícito"]], "Compreender o conceito formal de agregados permite tirar proveito das modernizações de sintaxe.")
        ]
      },
      {
        id: "cpp-c06-u6-l2-designated-initializers-cpp20",
        title: "Inicializadores designados (Designated Initializers) no C++20",
        subtitle: "Agregados · Clareza e documentação explícita com a sintaxe .campo = valor",
        theory: "No C++20, os Designated Initializers trouxeram a capacidade de inicializar membros nomeando-os explicitamente: Ponto p = {.x = 10, .y = 20};. Diferente do C puro, no C++20 a ordem dos membros nomeados nas chaves deve seguir rigorosamente a ordem em que foram declarados na struct, impedindo ambiguidades.",
        questions: [
          q("Qual versão do padrão C++ oficializou o suporte a Designated Initializers (.campo = valor)?", "C++20", ["C++11","C++98","C++03"], "Designated initializers foram integrados na especificação ISO no C++20."),
          q("Qual regra estrita o C++20 impõe sobre a ordem dos inicializadores designados nas chaves?", "Devem seguir obrigatoriamente a mesma ordem de declaração dos membros na definição da struct", ["Podem ser colocados em qualquer ordem aleatória","A ordem deve ser alfabética"], "Ao contrário da linguagem C99, o C++20 proíbe inversão de ordem para evitar ambiguidades com destrutores."),
          q("O que acontece com membros omitidos em uma inicialização designada (ex: Janela j = {.largura = 800};)?", "Assumem seus valores padrão declarados na struct ou são zerados por value-initialization", ["Contêm lixo de memória residual","Erro de compilação por campos faltantes"], "Campos não citados na lista designada são inicializados seguramente com seus valores default."),
          q("Por que os Designated Initializers aumentam drasticamente a manutenibilidade do código?", "Eliminam erros ao inverter argumentos de mesmo tipo (ex: x e y inteiros) e tornam a intenção autoexplicativa", ["Reduzem o executável em 50%","Aceleram o tempo de compilação"], "Nomear os campos documenta o código no ponto de chamada, evitando bugs sutis de troca de parâmetros."),
          t("Qual símbolo precede o nome do membro na sintaxe de inicializadores designados do C++20?", [".","ponto"], "O ponto inicia o nome do campo.", "Servidor s = { .porta = 8080, ____ativo = true };"),
          g("Complete a inicialização designada do campo largura com 1920 pixels.", [".largura"], "O ponto associa o valor diretamente ao campo declarado.", "Resolucao res = { ____ = 1920, .altura = 1080 };"),
          o("Ordene a inicialização designada válida de uma struct no C++20.", ["Declarar struct Botao { int x; int y; int largura; int altura; };","Instanciar abrindo chaves: Botao b = {","Nomear os campos na exata ordem de declaração: .x = 0, .y = 0, .largura = 100, .altura = 50","Fechar chaves com ponto e vírgula finalizando a instrução"], "Seguir a ordem de declaração é mandatório para compilação limpa em C++20."),
          p("Associe a inicialização ao seu status de compilação em struct { int a; int b; } no C++20.", [["{ .a = 1, .b = 2 }","Válida: segue rigorosamente a ordem de declaração"],["{ .b = 2, .a = 1 }","Inválida: ordem invertida proibida no C++20 (permitida apenas em C)"],["{ .a = 5 }","Válida: campo b omitido recebe zero automaticamente"],["{ 1, .b = 2 }","Inválida: misturar argumentos posicionais e designados é proibido"]], "Designated initializers no C++20 trazem expressividade de ponta à criação de objetos agregados.")
        ]
      },
      {
        id: "cpp-c06-u6-l3-structured-binding-cpp17-desempacotamento",
        title: "Desempacotamento de structs com Structured Binding (C++17)",
        subtitle: "Agregados · Decompondo membros diretamente em variáveis com auto [x, y]",
        theory: "Introduzido no C++17, o Structured Binding permite desempacotar membros de agregados (structs, arrays e pares) diretamente em variáveis individuais com a sintaxe auto [a, b] = objeto;. Usando referências (auto& [a, b]), é possível mutar os membros originais sem criar cópias intermediárias.",
        questions: [
          q("Qual versão do C++ introduziu a sintaxe de Structured Binding com colchetes auto [x, y] = ponto;?", "C++17", ["C++11","C++98","C++20"], "O C++17 introduziu structured binding para desempacotar estruturas e tuplas com extrema elegância."),
          q("Como desempacotar uma struct permitindo modificar os dados do objeto original?", "Utilizando referência: auto& [x, y] = ponto;", ["Usando ponteiro: auto* [x, y]","Usando cópia: auto [x, y]"], "O qualificador & cria aliases de referência para os campos membros originais da struct."),
          q("Qual é a forma recomendada de desempacotar uma struct pesada apenas para leitura eficiente?", "const auto& [x, y] = objeto;", ["auto [x, y]","volatile auto [x, y]"], "const auto& evita qualquer custo de cópia e impede alterações acidentais nos dados."),
          q("Quantos identificadores devem ser fornecidos dentro dos colchetes no structured binding?", "Exatamente o mesmo número de membros não-estáticos presentes na struct", ["Qualquer quantidade desejada","Pelo menos um identificador"], "O compilador exige casamento exato entre a contagem de identificadores e o número de campos do agregado."),
          t("Qual palavra-chave inicia a dedução de tipo no desempacotamento por structured binding?", ["auto"], "auto é obrigatório em structured bindings.", "const ____& [nome, idade] = usuario;"),
          g("Complete o desempacotamento dos membros x e y do ponto bidimensional.", ["[x, y]"], "Colchetes recebem a lista de identificadores.", "auto ____ = obterCoordenada();"),
          o("Ordene o fluxo de desempacotamento com structured binding no C++17.", ["Função retorna uma struct Ponto contendo int x e int y","Chamador captura o retorno com auto [posX, posY] = lerPonto();","Compilador cria um objeto temporário anônimo para armazenar o agregado","posX e posY passam a funcionar como apelidos para os membros do temporário"], "Structured binding elimina a necessidade de variáveis intermediárias burocráticas."),
          p("Associe o modificador de structured binding ao seu comportamento.", [["auto [x, y] = p;","Copia a struct e cria variáveis com cópias dos membros"],["auto& [x, y] = p;","Cria referências mutáveis que alteram a struct original p"],["const auto& [x, y] = p;","Cria referências imutáveis para leitura eficiente sem cópia"],["auto&& [x, y] = p;","Universal reference ideal para encaminhamento e temporários"]], "Structured binding revolucionou o retorno de múltiplos valores e a iteração sobre mapas no C++.")
        ]
      },
      {
        id: "cpp-c06-u6-l4-alinhamento-padding-sizeof-structs",
        title: "Alinhamento de memória (Memory Alignment), Padding e sizeof",
        subtitle: "Agregados · Como a CPU alinha dados e por que sizeof(Struct) pode surpreender",
        theory: "Processadores modernos acessam memória com maior velocidade quando tipos residem em endereços múltiplos de seu tamanho (alinhamento natural). O compilador C++ insere bytes de preenchimento (padding) invisíveis entre membros de uma struct, fazendo sizeof ser maior que a soma individual dos campos.",
        questions: [
          q("Por que sizeof de uma struct com char (1 byte) e int (4 bytes) geralmente resulta em 8 bytes?", "Porque o compilador insere 3 bytes de padding após o char para alinhar o int em endereço múltiplo de 4", ["Porque o char cresce para 4 bytes","Por causa de bugs no compilador"], "A CPU lê blocos de 32 ou 64 bits alinhados; o compilador adiciona padding para maximizar a velocidade."),
          q("Como reordenar os membros de uma struct para minimizar o padding e economizar memória na RAM?", "Agrupando os membros do maior para o menor tamanho em bytes (ex: double, int, short, char)", ["Ordenando os membros em ordem alfabética","Colocando todos os chars no topo"], "Organizar campos em ordem decrescente de tamanho aproveita os limites de alinhamento com zero ou mínimo padding."),
          q("Qual operador do C++11 informa o requisito de alinhamento em bytes de um tipo ou variável?", "alignof(Tipo)", ["align(Tipo)","sizeof_align(Tipo)","padof(Tipo)"], "alignof retorna o valor em bytes da fronteira de alinhamento exigida pelo tipo na arquitetura."),
          q("Qual especificador permite forçar um alinhamento customizado de memória em C++11+?", "alignas(N)", ["pragma align","force_align","__packed__"], "alignas(64) é muito comum em motores de jogos para alinhar structs na fronteira de linha de cache da CPU."),
          t("Qual operador nativo do C++11 retorna o requisito de alinhamento de memória de um tipo?", ["alignof"], "alignof consulta o requisito de alinhamento em bytes.", "size_t alinhamento = ____(double);"),
          g("Complete o especificador alinhando a struct na fronteira de 16 bytes para instruções SIMD.", ["alignas(16)"], "alignas define alinhamentos específicos para hardware.", "struct ____ Vetor4D { float x, y, z, w; };"),
          o("Ordene a análise de layout de memória de uma struct com char c, int i e short s.", ["char c ocupa 1 byte no offset 0","Compilador insere 3 bytes de padding para que o int inicie no offset 4","int i ocupa 4 bytes dos offsets 4 a 7","short s ocupa 2 bytes dos offsets 8 a 9, mais 2 bytes de padding final totalizando 12 bytes"], "O padding garante que todos os acessos à memória sejam perfeitamente alinhados para a CPU."),
          p("Associe o conceito de layout ao seu efeito físico na memória.", [["Padding","Bytes invisíveis inseridos pelo compilador para satisfazer o alinhamento"],["alignof(T)","Retorna a fronteira de alinhamento requerida pelo tipo T em bytes"],["alignas(64)","Força o alinhamento da struct em fronteira de linha de cache (cache line)"],["sizeof(Struct)","Soma dos bytes dos membros úteis somados aos bytes de padding"]], "Compreender alinhamento e padding é vital para programadores de jogos, drivers e sistemas embarcados.")
        ]
      },
      {
        id: "cpp-c06-u6-l5-passagem-structs-funcoes-valor-vs-ref",
        title: "Passagem de structs para funções: valor vs const Struct&",
        subtitle: "Agregados · Diretrizes de performance: quando copiar e quando referenciar",
        theory: "No C++, structs pequenas que cabem em registradores da CPU (até 16 bytes, como um par int x, y) devem ser passadas por valor (Ponto p), conferindo velocidade pura sem indireção. Para structs maiores ou contendo strings e contêineres pesados, deve-se adotar referência constante (const Struct&), evitando cópias.",
        questions: [
          q("Qual é a recomendação canônica do C++ Core Guidelines para structs pequenas (até 16 bytes)?", "Passar por valor (T), pois cabem diretamente nos registradores da CPU sem o custo de indireção de ponteiro", ["Sempre passar por ponteiro void*","Sempre alocar no heap"], "Passar structs minúsculas por valor permite que o compilador use registradores RAX/RDX diretamente."),
          q("Por que structs grandes que contêm std::string ou std::vector nunca devem ser passadas por valor?", "Porque passar por valor aciona cópias profundas de todos os contêineres e novas alocações no heap", ["Porque a compilação falha","Porque o C++ não suporta structs com texto"], "Duplicar vetores e strings desnecessariamente causa degradação severa de performance no sistema."),
          q("Qual é a assinatura de parâmetro ideal para inspecionar um registro complexo Usuario apenas para leitura?", "void analisarUsuario(const Usuario& u)", ["void analisarUsuario(Usuario u)","void analisarUsuario(Usuario* const u)"], "A referência constante garante que nenhum byte do usuário seja copiado e protege os dados contra escrita."),
          q("Se uma função precisa preencher os dados de uma struct criada pelo chamador, como deve recebê-la?", "Por referência não-constante: void carregarDados(Configuracao& cfg)", ["Por valor","const Configuracao&"], "A referência mutável permite que as alterações feitas pela função modifiquem o objeto do chamador."),
          t("Qual palavra-chave garante que uma struct passada por referência não será adulterada?", ["const"], "const assegura leitura pura do registro.", "void exibir(____ Relatorio& rel);"),
          g("Complete a passagem de leitura eficiente da struct de grande porte.", ["const"], "const com referência evita cópias e protege dados.", "void auditar(____ DadosTransacao& t) { }"),
          o("Ordene a decisão de assinatura de parâmetro para structs em C++.", ["Calcular sizeof(Struct) e inspecionar se possui membros com gerenciamento dinâmico","Se a struct tiver até 16 bytes e tipos triviais -> passar por valor (T)","Se a struct for grande ou contiver contêineres RAII -> passar por const T&","Se a função precisar modificar a struct original -> passar por T&"], "Seguir as diretrizes do C++ Core Guidelines maximiza a eficiência de chamadas de funções."),
          p("Associe a struct à sua melhor forma de passagem para leitura.", [["struct Ponto { int x, y; }; (8 bytes)","Passagem por valor: Ponto p (cabe em registradores da CPU)"],["struct Documento { std::string corpo; };","Passagem por referência constante: const Documento& d"],["struct Matriz4x4 { float m[16]; }; (64 bytes)","Passagem por referência constante: const Matriz4x4& m"],["Preencher dados retornando via parâmetro","Passagem por referência mutável: Struct& s"]], "Projetar assinaturas conscientes do custo de cópia distingue código amador de código sênior em C++.")
        ]
      }
    ],
    7: [
      {
        id: "cpp-c06-u7-l1-range-based-for-loop-cpp11",
        title: "Range-based for loop: percursos idiomáticos no C++11",
        subtitle: "Percursos · Iterando sobre arrays, vetores e contêineres sem índices manuais",
        theory: "Introduzido no C++11, o range-based for loop simplifica o percurso de qualquer coleção que possua begin() e end(). A sintaxe for (const auto& item : colecao) elimina variáveis de índice manuais e riscos de off-by-one. Para modificar os elementos in-place, basta utilizar referências mutáveis: for (auto& item : colecao).",
        questions: [
          q("Qual é a forma recomendada de percorrer uma coleção apenas para leitura com range-based for no C++?", "for (const auto& item : colecao)", ["for (auto item : colecao)","for (auto* item : colecao)"], "const auto& evita cópias desnecessárias de cada elemento e garante segurança somente leitura."),
          q("Como percorrer uma coleção modificando cada elemento in-place utilizando range-based for?", "for (auto& item : colecao)", ["for (const auto& item : colecao)","for (auto item : colecao)"], "auto& cria uma referência direta para o elemento real no contêiner, permitindo mutações."),
          q("O que acontece se utilizarmos for (auto item : colecao) onde os itens são std::string?", "Cada string da coleção é copiada integralmente para uma nova variável local a cada iteração", ["O código roda mais rápido","Os elementos originais são apagados"], "Usar auto por valor duplica os elementos, causando desperdício severo de memória e tempo."),
          q("O range-based for loop funciona com arrays clássicos nativos int arr[5] além dos contêineres STL?", "Sim, o compilador deduz os limites do array nativo via ponteiros arr e arr + N automaticamente", ["Não, apenas com std::vector","Apenas com std::array"], "O compilador calcula begin e end do array clássico automaticamente quando a dimensão é conhecida."),
          t("Qual símbolo de pontuação separa a variável de iteração da coleção no range-based for?", [":","dois pontos"], "Os dois pontos separam o elemento da coleção.", "for (const auto& x ____ numeros) { }"),
          g("Complete o laço moderno modificando os elementos do array in-place.", ["auto&"], "auto& vincula a referência mutável a cada elemento.", "for (____ n : notas) { n *= 2; }"),
          o("Ordene a evolução do percurso de coleções em C++.", ["C++98 laço com índice: for (size_t i = 0; i < n; ++i) com risco de limites","C++98 iteradores verbosos: for (vector<int>::iterator it = v.begin(); ...)","C++11 range-based for conciso: for (const auto& x : v)","C++20 range views com filtros: for (const auto& x : v | views::filter(...))"], "Range-based for transformou a legibilidade e segurança de percursos na linguagem C++."),
          p("Associe a assinatura do range-based for ao seu efeito.", [["for (const auto& x : v)","Leitura segura e rápida sem cópias de elementos"],["for (auto& x : v)","Modificação direta de cada elemento in-place na coleção"],["for (auto x : v)","Copia cada elemento por valor para a variável local de iteração"],["for (auto&& x : v)","Universal reference para proxy iterators (ex: vector<bool>)"]], "Adotar range-based for com referências adequadas é prática mandatória de C++ moderno.")
        ]
      },
      {
        id: "cpp-c06-u7-l2-iteradores-classicos-begin-end-desref",
        title: "Iteradores clássicos: begin(), end(), desreferenciação e avanço",
        subtitle: "Percursos · A abstração universal de ponteiros que unifica contêineres e algoritmos",
        theory: "Iteradores generalizam a ideia de ponteiros para navegar sobre contêineres da STL. O método .begin() retorna um iterador apontando para o primeiro elemento, enquanto .end() aponta para a posição sentinela imediatamente posterior ao último elemento. Acessar o valor exige desreferenciação (*it) e o avanço usa ++it.",
        questions: [
          q("Para onde aponta o iterador retornado por colecao.end() em contêineres da STL?", "Para a posição sentinela além do final (past-the-end), um elemento após o último legítimo", ["Para o último elemento","Para o primeiro elemento","Para nullptr"], "end() atua como sentinela de parada do intervalo semiaberto [begin, end), nunca devendo ser desreferenciado."),
          q("O que acontece se o desenvolvedor tentar desreferenciar (*it) o iterador retornado por .end()?", "Comportamento Indefinido (Undefined Behavior), frequentemente resultando em falha de segmentação", ["Retorna zero silenciosamente","Retorna o tamanho do contêiner"], "A posição past-the-end não contém dados válidos, constituindo violação de memória desreferenciá-la."),
          q("Qual é a forma preferida de avançar um iterador em loops C++: it++ ou ++it?", "Prefere-se pré-incremento (++it), pois evita a criação de um objeto cópia temporário do estado anterior", ["Prefere-se pós-incremento (it++)","Tanto faz"], "Para tipos de iteradores customizados pesados, o pré-incremento é estritamente mais eficiente."),
          q("Qual função auxiliar da biblioteca padrão (em <iterator>) deve ser preferida no C++11 para obter iteradores?", "std::begin(c) e std::end(c)", ["c.start()","get_iter(c)"], "std::begin e std::end funcionam de forma homogênea tanto com contêineres quanto com arrays C nativos."),
          t("Qual operador é utilizado para ler o elemento atual apontado por um iterador?", ["*","asterisco"], "O asterisco desreferencia o iterador.", "std::cout << ____it << std::endl;"),
          g("Complete a condição de término do loop clássico com iteradores.", ["!= dados.end()"], "Iterar enquanto for diferente de end() cobre todo o contêiner.", "for (auto it = dados.begin(); it ____; ++it) { }"),
          o("Ordene as etapas do percurso de um contêiner com iteradores clássicos.", ["Obter o início: auto it = lista.begin();","Comparar com a sentinela: if (it != lista.end())","Ler ou escrever o dado apontado desreferenciando: *it;","Avançar para a próxima posição na memória com ++it;"], "Iteradores formam a cola conceitual que conecta algoritmos aos dados na STL."),
          p("Associe o iterador à sua posição no contêiner com elementos [A, B, C].", [["c.begin()","Aponta diretamente para o primeiro elemento (A)"],["c.end()","Aponta para a posição sentinela após o último elemento (past C)"],["*c.begin()","Avalia para o valor do primeiro elemento (A)"],["std::next(c.begin())","Retorna iterador apontando para o segundo elemento (B)"]], "Dominar iteradores clássicos é requisito para entender a arquitetura interna da biblioteca padrão.")
        ]
      },
      {
        id: "cpp-c06-u7-l3-iteradores-reversos-rbegin-rend",
        title: "Iteradores reversos com rbegin() e rend()",
        subtitle: "Percursos · Navegando do final para o início sem alterar índices aritméticos manuais",
        theory: "Para percorrer contêineres em ordem inversa, a STL provê iteradores reversos com .rbegin() e .rend(). O método .rbegin() aponta para o último elemento da coleção, e ++it caminha para trás na memória física. O laço termina quando o iterador alcança a sentinela anterior ao primeiro elemento (.rend()).",
        questions: [
          q("O que o método colecao.rbegin() retorna em um contêiner da STL?", "Um reverse_iterator que aponta para o último elemento físico da coleção", ["O primeiro elemento","A sentinela após o fim"], "rbegin inverte a semântica de direção: o último elemento do contêiner é o início do percurso reverso."),
          q("Em um reverse_iterator, qual é o efeito físico de executar a instrução ++it?", "O iterador desloca-se para o elemento fisicamente anterior no contêiner (em direção ao início)", ["Avança para o próximo elemento","Dobra o valor do dado"], "Iteradores reversos invertem o operador ++ para que o avanço lógico retroceda na memória."),
          q("Para onde aponta a sentinela retornada por colecao.rend()?", "Para a posição virtual imediatamente anterior ao primeiro elemento da coleção", ["Para o último elemento","Para o elemento central"], "rend marca o término do percurso reverso, equivalente conceitual ao end() em ordem normal."),
          q("Como converter um reverse_iterator de volta para um iterador normal (base iterator)?", "Invocando o método it.base()", ["Com static_cast","Chamando it.forward()"], "base() retorna o iterador convencional correspondente na estrutura de dados."),
          t("Qual método obtém o iterador reverso inicial apontando para o último elemento?", ["rbegin()","rbegin"], "rbegin inicia a varredura reversa.", "auto it = v.____;"),
          g("Complete o loop reverso percorrendo a coleção do último até o primeiro elemento.", ["rbegin()"], "rbegin combinado com rend realiza a travessia regressiva.", "for (auto it = v.____; it != v.rend(); ++it) { }"),
          o("Ordene a travessia reversa sobre o vetor {10, 20, 30}.", ["Iniciar iterador reverso no final: auto it = v.rbegin(); (aponta para 30)","Imprimir o valor atual com *it (exibe 30)","Executar ++it deslocando o iterador para 20","Continuar até it igualar v.rend() encerrando o laço sem underflow"], "Iteradores reversos blindam o código contra erros clássicos de underflow de unsigned em loops for decrescentes."),
          p("Associe o método reverso ao seu papel.", [["v.rbegin()","Início da iteração reversa: aponta para o último elemento"],["v.rend()","Término da iteração reversa: sentinela antes do primeiro elemento"],["++it_reverso","Caminha em direção ao início da coleção"],["it_reverso.base()","Converte o reverse_iterator para o iterator padrão correspondente"]], "Iteradores reversos eliminam os riscos de laços decrescentes manuais com size_t.")
        ]
      },
      {
        id: "cpp-c06-u7-l4-algoritmos-stl-foreach-count-accumulate",
        title: "Algoritmos da STL: std::for_each, std::count e std::accumulate",
        subtitle: "Percursos · Substituindo loops manuais por funções de alta ordem expressivas",
        theory: "A biblioteca <algorithm> e <numeric> do C++ provê funções canônicas que substituem laços for manuais. std::for_each aplica uma função lambda a cada elemento; std::count(inicio, fim, valor) calcula a frequência de ocorrência em O(n); e std::accumulate (em <numeric>) realiza somatórios e reduções com valor inicial.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão define a função std::accumulate?", "<numeric>", ["<algorithm>","<vector>","<cmath>"], "<numeric> reúne operações matemáticas sobre sequências como accumulate, inner_product e reduce."),
          q("Como somar todos os elementos inteiros de um vetor com std::accumulate?", "std::accumulate(v.begin(), v.end(), 0);", ["std::accumulate(v);","v.sum();","std::sum(v.begin(), v.end());"], "O terceiro argumento (0) define o valor inicial da acumulação e o tipo do retorno."),
          q("O que a função std::count(v.begin(), v.end(), 7) retorna?", "A quantidade de vezes que o valor 7 aparece no intervalo especificado", ["O índice onde 7 está","true ou false"], "count percorre a faixa e calcula a contagem exata de correspondências do valor alvo."),
          q("Qual é a vantagem de utilizar algoritmos da STL com funções lambdas em vez de laços for manuais?", "Reduzem código repetitivo, expressam intenção declarativa imediata e viabilizam paralelização (C++17)", ["São executados na placa de som","Eliminam a necessidade de includes"], "Algoritmos padronizados documentam o propósito do código e suportam Execution Policies paralelas."),
          t("Qual cabeçalho deve ser incluído para usar a função std::accumulate?", ["<numeric>","numeric"], "<numeric> provê accumulate e reduções numéricas.", "#include ____"),
          g("Complete o somatório dos elementos inteiros iniciando em zero.", ["0"], "O acumulador inicializa a soma.", "int soma = std::accumulate(v.begin(), v.end(), ____);"),
          o("Ordene o uso de std::for_each com uma função lambda em C++.", ["Incluir os cabeçalhos <algorithm> e <iostream>","Definir o contêiner com os dados: std::vector<int> dados = {1, 2, 3};","Chamar std::for_each(dados.begin(), dados.end(), [](int n) { ... });","A lambda executa para cada elemento sequencialmente"], "Substituir loops imperativos por algoritmos da STL eleva o rigor da base de código."),
          p("Associe o algoritmo da STL ao seu propósito.", [["std::for_each(b, e, fn)","Aplica a função fn a cada elemento do intervalo"],["std::count(b, e, val)","Calcula a contagem de ocorrências do valor val"],["std::accumulate(b, e, init)","Calcula a redução/somatório da faixa com valor inicial"],["std::count_if(b, e, pred)","Conta elementos que atendem a um predicado booleano"]], "Adotar algoritmos da STL é a assinatura do desenvolvedor C++ fluente e idiomático.")
        ]
      },
      {
        id: "cpp-c06-u7-l5-visualizacoes-std-span-cpp20",
        title: "Visualizações de sequências com std::span (C++20)",
        subtitle: "Percursos · Uma visão unificada e sem cópia sobre arrays C, std::array e std::vector",
        theory: "Introduzido no C++20 através de <span>, std::span<T> é uma visão leve não-proprietária que encapsula um ponteiro e um tamanho para qualquer sequência contígua. Funções que recebem std::span aceitam perfeitamente arrays C, std::array e std::vector com zero cópia de dados e suporte a fatiamento seguro (.subspan()).",
        questions: [
          q("Qual é a principal motivação para usar std::span<T> (C++20) como parâmetro de função?", "Permite que uma única função aceite arrays nativos, std::array e std::vector sem duplicar assinaturas e sem cópias", ["Permite ordenar matrizes mais rápido","Aloca memória dinâmica segura"], "std::span unifica todas as coleções contíguas sob uma interface leve de dois ponteiros (16 bytes)."),
          q("std::span aloca ou desaloca memória no heap?", "Não, std::span nunca aloca memória: é apenas uma visão (view) emprestada de dados já existentes", ["Sim, aloca com new[]","Aloca apenas se tiver mais de 10 itens"], "span é não-dono (non-owning), devendo ser passado diretamente por valor nos registradores."),
          q("Como definir um std::span que impede que a função modifique os elementos do contêiner?", "Declarando como std::span<const T>", ["Declarando como const std::span<T>","Usando span<void>"], "const T protege os elementos apontados contra mutação; const span apenas tornaria a visão imutável."),
          q("O que o método fatia.subspan(1, 3) retorna em um std::span?", "Um novo std::span representando uma janela de 3 elementos a partir do índice 1", ["Uma cópia em std::vector","Um ponteiro T*"], "subspan cria fatias contíguas instantâneas em O(1) sem alocar um único byte."),
          t("Qual cabeçalho do C++20 define a classe de template std::span?", ["<span>","span"], "<span> provê a visualização contígua.", "#include ____"),
          g("Complete a assinatura moderna aceitando qualquer sequência contígua de inteiros para leitura.", ["std::span<const int>"], "std::span<const T> é o padrão ouro moderno para parâmetros de leitura.", "void analisar(____ dados) { }"),
          o("Ordene a flexibilidade de std::span ao invocar uma única função void exibir(std::span<const int> s).", ["Declarar a função uma única vez recebendo std::span<const int>","Passar array nativo: int arr[3] = {1, 2, 3}; exibir(arr);","Passar contêiner estático: std::array<int, 4> a = {1, 2, 3, 4}; exibir(a);","Passar contêiner dinâmico: std::vector<int> v = {1, 2}; exibir(v);"], "std::span atua como a interface universal para dados contíguos no C++ moderno."),
          p("Associe o tipo à sua semântica de propriedade (ownership).", [["std::vector<int>","Dono proprietário da memória com alocação dinâmica no heap"],["std::array<int, N>","Dono proprietário com tamanho fixo alocado na stack"],["std::span<int>","Visão emprestada de dados contíguos com permissão de escrita"],["std::span<const int>","Visão emprestada somente leitura com zero cópia"]], "Adotar std::span é a prática consagrada da engenharia de software C++ contemporânea.")
        ]
      }
    ],
    8: [
      {
        id: "cpp-c06-u8-l1-leitura-segura-getline-cin-ignore",
        title: "Leitura segura de strings com std::getline e cin.ignore()",
        subtitle: "Validação de entrada · Evitando estouros de buffer e consumindo quebras de linha pendentes",
        theory: "No C++, ler textos com std::cin >> str para no primeiro espaço em branco. Para ler linhas inteiras contendo espaços, utiliza-se std::getline(std::cin, str). Quando uma leitura numérica precede o getline, a quebra de linha '\\n' residual no buffer deve ser descartada com o método std::cin.ignore().",
        questions: [
          q("Por que utilizar std::cin >> str é inadequado para capturar nomes completos ou frases com espaços?", "Porque o operador >> interrompe a leitura no primeiro espaço em branco (whitespace), deixando o restante no buffer", ["Porque o operador >> só aceita números","Porque o operador >> aloca no heap"], "O operador de extração trata espaços e tabs como delimitadores de tokens."),
          q("Qual função da biblioteca padrão lê uma linha de texto completa incluindo espaços até o Enter?", "std::getline(std::cin, str)", ["std::cin.read(str)","std::cin.scan(str)"], "getline consome todos os caracteres até o delimitador de quebra de linha, armazenando-os na std::string."),
          q("O que acontece se chamarmos std::getline logo após std::cin >> numero sem usar cin.ignore()?", "getline consome o caractere '\\n' residual deixado pelo >> e retorna imediatamente uma string vazia", ["O programa trava para sempre","O número é lido novamente"], "O operador >> lê o número mas deixa o Enter pendente no fluxo de entrada do console."),
          q("Qual comando descarta com segurança qualquer caractere residual pendente na stream até o fim de linha?", "std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');", ["std::cin.clear()","std::cin.flush()"], "numeric_limits::max() com '\\n' descarta o buffer por completo até encontrar o final da linha."),
          t("Qual função lê uma linha inteira do fluxo de entrada padrão para dentro de uma std::string?", ["std::getline","getline"], "getline lê o texto até o Enter.", "std::____(std::cin, linha);"),
          g("Complete o descarte de resíduos de fluxo consumindo a quebra de linha remanescente.", ["std::cin.ignore()"], "ignore consome o caractere pendente no buffer.", "std::cin >> idade;\n____;"),
          o("Ordene o fluxo correto de leitura alternada de número e texto no console.", ["Ler o dado numérico: std::cin >> idade;","Limpar o '\\n' residual do buffer: std::cin.ignore();","Ler o texto completo com espaços: std::getline(std::cin, nomeCompleto);","Processar os dados lidos com segurança sem capturas vazias"], "Limpar o fluxo entre leituras numéricas e textuais elimina um dos defeitos mais comuns em consoles C++."),
          p("Associe a operação de fluxo ao seu comportamento.", [["std::cin >> valor","Extrai token individual delimitado por espaço ou quebra de linha"],["std::getline(std::cin, str)","Lê toda a linha até encontrar o caractere '\\n'"],["std::cin.ignore()","Descarta caracteres pendentes no buffer de entrada"],["std::cin.fail()","Verifica se a última operação de leitura falhou"]], "Dominar getline e manipulação de buffers confere robustez imediata a programas interativos.")
        ]
      },
      {
        id: "cpp-c06-u8-l2-conversoes-seguras-stoi-from-chars",
        title: "Conversões de texto para número: stoi vs std::from_chars (C++17)",
        subtitle: "Validação de entrada · Da facilidade de std::stoi à performance de custo zero com from_chars",
        theory: "No C++, std::stoi e std::stod convertem strings em números lançando exceções (std::invalid_argument e std::out_of_range) em entradas defeituosas. No C++17, o cabeçalho <charconv> introduziu std::from_chars: conversão de altíssima performance, sem alocação, sem exceções e independente de locale.",
        questions: [
          q("Quais exceções a função std::stoi(\"abc\") pode lançar se a string não contiver dígitos válidos?", "std::invalid_argument (se não houver dígitos) ou std::out_of_range (se o número ultrapassar int)", ["std::overflow_error","std::logic_error apenas"], "stoi valida o formato e a grandeza, disparando exceções se a conversão for matematicamente impossível."),
          q("Qual é o benefício primário de std::from_chars (C++17) em relação a std::stoi e sscanf?", "Zero alocação, zero exceções, velocidade máxima e independência total de locale cultural", ["Aceita textos em formato binário apenas","Converte apenas números pares"], "from_chars é projetado para parsing em escala massiva (JSON, CSV), rodando até 10x mais rápido que stoi."),
          q("Como std::from_chars sinaliza se a conversão teve sucesso ou falhou?", "Retorna uma struct std::from_chars_result contendo um ponteiro ptr e um código de erro ec (std::errc)", ["Lança exceção","Retorna -1"], "O retorno por valor com código de erro elimina o custo de despacho de exceções da CPU."),
          q("Qual cabeçalho da biblioteca padrão provê as funções modernas std::from_chars e std::to_chars?", "<charconv>", ["<algorithm>","<cstdlib>","<iomanip>"], "<charconv> provê rotinas de conversão rápida e determinística entre texto e números."),
          t("Qual cabeçalho do C++17 provê as funções de conversão de alto desempenho std::from_chars?", ["<charconv>","charconv"], "<charconv> provê from_chars e to_chars.", "#include ____"),
          g("Complete o tratamento capturando a exceção de formato inválido de std::stoi.", ["std::invalid_argument"], "invalid_argument sinaliza ausência de números.", "try { std::stoi(txt); } catch (const ____& e) { }"),
          o("Ordene a validação de conversão de texto para inteiro com std::from_chars.", ["Obter a fatia de texto: std::string_view str = \"2026\"; int valor = 0;","Chamar std::from_chars(str.data(), str.data() + str.size(), valor);","Verificar o código de erro: if (resultado.ec == std::errc{})","Se igual a zero, a conversão foi bem-sucedida e valor contém 2026"], "from_chars viabiliza parsing seguro com consumo nulo de memória adicional."),
          p("Associe a ferramenta de conversão ao seu perfil.", [["std::stoi(s)","Simples e direto, mas lança exceções em entradas malformadas"],["std::from_chars(...)","Ultrarrápido, sem exceções e sem alocações no C++17"],["std::stod(s)","Converte string para ponto flutuante de precisão dupla (double)"],["std::errc::invalid_argument","Código de erro retornado quando from_chars não acha dígitos"]], "Escolher a ferramenta de conversão correta alinha conveniência e performance no C++.")
        ]
      },
      {
        id: "cpp-c06-u8-l3-validacao-caracteres-cctype",
        title: "Classificação de caracteres com a biblioteca <cctype>",
        subtitle: "Validação de entrada · Inspecionando dígitos, letras e pontuações com funções padrão",
        theory: "O cabeçalho <cctype> do C++ provê funções para validar e classificar caracteres individuais. Funções como std::isdigit(c), std::isalpha(c), std::isalnum(c) e std::isspace(c) retornam valores booleanos. Elas permitem auditar strings caractere a caractere, rejeitando caracteres ilegais antes de parsing.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão provê funções de classificação de caracteres como isdigit e isalpha?", "<cctype>", ["<ctype.h>","<cstring>","<cstddef>"], "<cctype> é o cabeçalho C++ moderno para a biblioteca de tipos de caracteres."),
          q("Qual função de <cctype> verifica se um caractere é um dígito decimal entre '0' e '9'?", "std::isdigit(c)", ["std::isnumber(c)","std::isnum(c)","std::check_digit(c)"], "isdigit retorna valor não-nulo para caracteres numéricos de zero a nove."),
          q("Qual cuidado sênior de conversão deve ser tomado ao passar char para funções de <cctype>?", "Fazer cast para unsigned char: std::isdigit(static_cast<unsigned char>(c)) para evitar índices negativos na tabela ASCII", ["Fazer cast para float","Usar apenas ponteiros"], "Valores negativos de char com acentuação estouram a tabela de busca interna se não forem convertidos para unsigned."),
          q("Como verificar se todos os caracteres de uma std::string são números utilizando a STL?", "std::all_of(str.begin(), str.end(), [](unsigned char c) { return std::isdigit(c); });", ["str.isAllDigits()","std::count(str) == str.size()"], "Combinar std::all_of com std::isdigit expressa validação total em uma linha funcional limpa."),
          t("Qual função de <cctype> verifica se o caractere é uma letra do alfabeto (A-Z ou a-z)?", ["isalpha","std::isalpha"], "isalpha valida se o caractere é alfabético.", "if (std::____(c)) { }"),
          g("Complete o teste validando se o caractere é um espaço em branco ou tabulação.", ["std::isspace"], "isspace detecta espaços, quebras de linha e tabs.", "if (____(c)) { pularEspaco(); }"),
          o("Ordene a validação de sanitização de um código de produto com <cctype>.", ["Receber a string de entrada do usuário: std::string codigo;","Verificar se o tamanho não é vazio: if (codigo.empty()) return false;","Percorrer cada caractere aplicando a validação com std::isalnum;","Se algum caractere não for letra nem número, rejeitar a entrada"], "Sanitizar caracteres protege o sistema contra caracteres invisíveis e formatações corruptas."),
          p("Associe a função de <cctype> ao seu teste booleano.", [["std::isdigit(c)","Verifica se o caractere é um dígito decimal ('0' a '9')"],["std::isalpha(c)","Verifica se o caractere é uma letra alfabética"],["std::isalnum(c)","Verifica se o caractere é alfanumérico (letra ou número)"],["std::isspace(c)","Verifica se o caractere é espaço, tabulação ou quebra de linha"]], "Classificar caracteres com <cctype> é a fundação para sanitização de entrada em C++.")
        ]
      },
      {
        id: "cpp-c06-u8-l4-validacao-limites-integridade-structs",
        title: "Validação de limites numéricos e integridade em structs",
        subtitle: "Validação de entrada · Blindando structs contra valores inconsistentes ou fora de faixa",
        theory: "Após ler e converter os dados, o software deve garantir que as variáveis obedeçam às regras de negócio antes de preencher as structs. Isso inclui testar se idades são positivas, saldos não são negativos ou coordenadas respeitam limites. Funções validadoras atuam como fábricas que auditam as invariantes.",
        questions: [
          q("O que é uma \"invariante de domínio\" em uma estrutura de dados de negócio?", "Uma regra ou restrição lógica que deve permanecer rigorosamente verdadeira durante toda a existência do objeto", ["Uma variável constante no código","Um tipo de dado de rede"], "Exemplos: um percentual deve estar entre 0.0 e 1.0; a idade deve estar entre 0 e 130 anos."),
          q("Onde deve residir a lógica de validação de dados antes de popular uma struct agregada?", "Em uma função fábrica validadora (ex: criarUsuario(...)) que retorna o objeto pronto ou erro", ["Dentro do destrutor","No arquivo Makefile"], "Fábricas validadoras isolam as regras de negócio e impedem a criação de structs com estado corrompido."),
          q("Qual cabeçalho da STL provê os limites numéricos de máquina através de std::numeric_limits<T>?", "<limits>", ["<climits>","<algorithm>","<cmath>"], "<limits> provê constantes como max(), min() e lowest() para qualquer tipo primitivo."),
          q("O que fazer quando uma função validadora detecta um número fora do intervalo aceitável?", "Rejeitar a operação retornando std::nullopt ou um código de erro descritivo para o chamador tratar", ["Atribuir zero e continuar calado","Desligar o computador"], "Falhar explicitamente com relatório claro previne a propagação de dados corrompidos no banco."),
          t("Qual cabeçalho da biblioteca padrão define a classe de template std::numeric_limits?", ["<limits>","limits"], "<limits> expõe as fronteiras numéricas do hardware.", "#include ____"),
          g("Complete o teste validando se a pontuação informada reside dentro do intervalo legítimo de 0 a 100.", ["pontos <= 100"], "Testar ambas as extremidades preserva a invariante.", "if (pontos >= 0 && ____) { salvar(); }"),
          o("Ordene o fluxo de construção segura de um registro a partir de dados brutos.", ["Receber as strings brutas digitadas pelo usuário no console ou formulário","Converter para números e validar se os tipos básicos foram respeitados","Checar regras de negócio e limites com cláusulas de guarda defensivas","Instanciar e retornar a struct populada com garantia de integridade"], "Validar antes de instanciar assegura que apenas registros válidos trafeguem no sistema."),
          p("Associe a regra de integridade ao seu teste condicional.", [["Idade biológica humana","if (idade < 0 || idade > 130) return erro;"],["Percentual de desconto","if (taxa < 0.0 || taxa > 1.0) return erro;"],["Texto de login obrigatório","if (login.empty() || login.size() > 50) return erro;"],["Porta de rede TCP","if (porta < 1 || porta > 65535) return erro;"]], "Blindar as structs na camada de entrada impede que dados inválidos alcancem o banco ou a lógica central.")
        ]
      },
      {
        id: "cpp-c06-u8-l5-retorno-seguro-std-optional-cpp17",
        title: "Padrão de retorno seguro com std::optional (C++17)",
        subtitle: "Validação de entrada · Substituindo sentinelas -1 e nullptr pelo tipo std::optional<T>",
        theory: "No C++17, std::optional<T> (definido em <optional>) fornece o padrão canônico para funções que podem falhar ao tentar produzir um valor. Em vez de recorrer a ponteiros soltos, sentinelas arbitrárias (como -1) ou exceções pesadas, a função retorna std::optional<T>, devolvendo o valor ou std::nullopt com clareza.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão provê a classe de template std::optional no C++17?", "<optional>", ["<memory>","<utility>","<variant>"], "<optional> define std::optional e a constante sentinela std::nullopt."),
          q("Como verificar se uma variável std::optional<int> resultado contém um valor válido?", "Utilizando o método resultado.has_value() ou simplesmente if (resultado)", ["Verificando se resultado != 0","Com sizeof"], "std::optional converte-se contextualmente em booleano, avaliando true se houver valor encapsulado."),
          q("Como extrair com segurança o valor de um std::optional fornecendo um substituto padrão caso esteja vazio?", "resultado.value_or(valorPadrao)", ["resultado.get()","resultado.or_default()"], "value_or retorna o valor encapsulado se existir, ou o valor alternativo fornecido caso contrário."),
          q("O que acontece se executarmos resultado.value() em um std::optional que contém std::nullopt?", "O método lança a exceção std::bad_optional_access", ["Retorna zero","Retorna lixo de memória"], "Ao contrário do operador *, o método .value() valida a presença e dispara exceção se estiver vazio."),
          t("Qual constante do cabeçalho <optional> representa a ausência formal de valor?", ["std::nullopt","nullopt"], "nullopt sinaliza opcional desprovido de valor.", "return std::____;"),
          g("Complete o retorno seguro indicando que a conversão falhou em produzir a struct.", ["std::nullopt"], "std::nullopt expressa formalmente o fracasso de validação.", "if (!valido) return ____;"),
          o("Ordene a jornada de uma função que utiliza std::optional para validação.", ["Função receberDadosBrutos(...) tenta validar e converter a entrada","Se alguma regra de integridade for violada, executa return std::nullopt;","Se todos os testes passarem, instancia a struct e retorna o objeto pronto","Chamador testa if (res) e consome os dados com *res ou res->membro"], "std::optional torna o contrato de sucesso ou falha perfeitamente explícito na assinatura."),
          p("Associe o método de std::optional<T> ao seu propósito.", [["opt.has_value()","Retorna true se o opcional encapsular um valor legítimo"],["opt.value()","Retorna o valor ou lança std::bad_optional_access se vazio"],["opt.value_or(default)","Retorna o valor se existir, ou o default se vazio"],["std::nullopt","Constante sentinela que representa ausência de valor"]], "Adotar std::optional coroa o design de validação moderna em C++ com elegância e eficiência.")
        ]
      }
    ]
  });
})();
