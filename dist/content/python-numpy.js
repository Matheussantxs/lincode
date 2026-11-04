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
  window.PYTHON_CHAPTER_UNITS.numpy = Object.assign(window.PYTHON_CHAPTER_UNITS.numpy || {}, {
    1: [
      {
        id: "py-np-1-4-ndarrays-multidimensionais",
        title: "Matrizes multidimensionais e ndarrays",
        subtitle: "Estrutura · O objeto ndarray como contêiner homogêneo n-dimensional",
        theory: "O objeto central do NumPy é o ndarray: uma estrutura homogênea multidimensional alocada em bloco contíguo de memória. Diferente das listas nativas de Python que guardam ponteiros para objetos dispersos, o ndarray armazena elementos do mesmo tipo em sequência compacta, viabilizando cálculos vetoriais em C.",
        questions: [
          q("Qual é a principal diferença estrutural entre um ndarray do NumPy e uma lista nativa do Python?", "O ndarray é homogêneo em bloco contíguo de memória; a lista guarda ponteiros para objetos variados", ["A lista do Python é mais rápida para matrizes","O ndarray só aceita números inteiros pares"], "A homogeneidade em bloco contíguo elimina overhead de ponteiros e permite operações diretas via instruções SIMD."),
          q("O que acontece se criarmos um array NumPy a partir de uma lista com tipos mistos [1, 2.5, \"3\"]?", "O NumPy converte (upcasting) todos os elementos para um tipo comum, transformando tudo em strings", ["Lança um TypeError imediato","Cria três arrays separados"], "Para manter a homogeneidade obrigatória da estrutura, o NumPy converte tudo para o tipo mais genérico."),
          q("Qual módulo da biblioteca padrão do Python é substituído pelo NumPy em computação numérica?", "Nenhum; NumPy é uma biblioteca externa de alta performance compilada em C/Fortran para álgebra vetorial", ["O módulo sys","O módulo random padrão"], "NumPy é o alicerce fundamental do ecossistema científico e analítico de dados em Python."),
          q("Como um array bidimensional (matriz) é conceitualmente representado em um ndarray?", "Uma grade retangular organizada em linhas (eixo 0) e colunas (eixo 1) em bloco de memória", ["Uma lista circular sem fim","Um conjunto não ordenado de tuplas"], "Arrays 2D mapeiam dados em linhas e colunas indexadas de forma direta e previsível."),
          t("Qual é o nome da classe fundamental de arrays multidimensionais fornecida pelo NumPy?", ["ndarray"], "np.ndarray é o contêiner central da biblioteca NumPy.", "# numpy.ndarray"),
          g("Complete a criação de um array a partir de uma lista Python:", ["np.array([10, 20, 30])"], "np.array converte sequências iteráveis em ndarrays homogêneos.", "import numpy as np\narr = ____"),
          o("Ordene as etapas da criação e inspeção inicial de um array NumPy:", ["Importar a biblioteca NumPy sob o alias canônico np","Criar o ndarray a partir de listas com a função np.array()","Inspecionar o formato dimensional com o atributo .shape","Verificar o tipo primitivo de dado através do atributo .dtype"], "Fluxo básico de inicialização e diagnóstico de ndarrays em NumPy."),
          p("Associe a estrutura de dados à sua propriedade de representação em memória:", [["Lista nativa Python","Array dinâmico de ponteiros para objetos heterogêneos dispersos na heap"],["NumPy ndarray","Bloco contíguo de bytes homogêneos com metadados de dimensionalidade"],["np.array()","Função construtora que infere dimensões e tipo a partir de iteráveis"],["Homogeneidade","Regra obrigatória de que todos os elementos devem compartilhar o mesmo dtype"]], "Comparativo de arquitetura de memória entre estruturas nativas e vetoriais.")
        ]
      },
      {
        id: "py-np-1-5-construtoras-fabrica",
        title: "Funções de fábrica: zeros, ones, arange e linspace",
        subtitle: "Inicialização · Pré-alocando matrizes sem laços manuais lentos",
        theory: "Criar arrays vazios ou pré-inicializados sem laços for é essencial em computação de alto desempenho. O NumPy provê funções de fábrica otimizadas: np.zeros preenche com 0, np.ones com 1, np.arange gera faixas com passo aritmético, e np.linspace divide intervalos em pontos uniformemente espaçados.",
        questions: [
          q("Qual é a diferença fundamental entre np.arange(inicio, fim, passo) e np.linspace(inicio, fim, num)?", "arange define o tamanho do passo; linspace define a quantidade exata de pontos no intervalo", ["arange só aceita strings","linspace só funciona com números negativos"], "arange(0, 10, 2) gera passo 2; linspace(0, 1, 5) gera 5 pontos equidistantes no intervalo fechado."),
          q("Por que np.empty é mais rápido do que np.zeros para alocar grandes matrizes?", "Porque np.empty reserva a memória sem inicializar os bytes, mantendo o conteúdo residual prévio", ["Porque ele usa a nuvem para armazenar","Porque apaga o sistema operacional"], "np.empty não gasta ciclos de CPU preenchendo zeros, sendo ideal quando os dados serão sobrescritos em seguida."),
          q("Qual é o tipo padrão (dtype) atribuído aos elementos criados por np.zeros((3, 3))?", "float64 (números de ponto flutuante de 64 bits)", ["int32","bool"], "Por padrão, funções como zeros e ones inicializam elementos como floats de dupla precisão."),
          q("Qual função gera uma matriz identidade quadrada onde a diagonal principal contém 1 e o restante 0?", "np.eye(n) ou np.identity(n)", ["np.ones((n, n))","np.diagflat()"], "np.eye(N) produz a matriz identidade N x N neutra da multiplicação matricial."),
          t("Qual função do NumPy gera uma sequência de valores com passo constante análoga ao range nativo?", ["arange","np.arange"], "np.arange aceita passos fracionários contínuos ao contrário do range nativo.", "# np.arange(0, 5, 0.5)"),
          g("Complete a criação de uma grade com 100 pontos uniformemente espaçados entre 0.0 e 1.0:", ["np.linspace(0.0, 1.0, 100)"], "np.linspace divide o intervalo em número exato de amostras.", "import numpy as np\npontos = ____"),
          o("Ordene as chamadas de fábrica da menor para a maior quantidade de elementos gerados:", ["np.zeros(5) -> vetor unidimensional com 5 elementos","np.ones((3, 3)) -> matriz bidimensional com 9 elementos","np.arange(0, 20) -> sequência contendo 20 inteiros","np.zeros((10, 10)) -> matriz retangular contendo 100 elementos"], "Comparativo de volume de elementos alocados por funções de fábrica."),
          p("Associe a função construtora do NumPy à sua respectiva finalidade:", [["np.zeros((l, c))","Aloca matriz preenchida integralmente com zeros em ponto flutuante"],["np.ones((l, c))","Aloca matriz preenchida integralmente com uns"],["np.arange(i, f, p)","Gera sequência com passo definido pelo usuário"],["np.linspace(i, f, n)","Gera número n fixo de pontos uniformemente distribuídos"]], "Catálogo de rotinas de fabricação e inicialização de arrays.")
        ]
      }
    ],
    2: [
      {
        id: "py-np-2-1-shape-ndim-size",
        title: "Atributos fundamentais: shape, ndim, size e itemsize",
        subtitle: "Metadados · Inspecionando dimensões, eixos e consumo de memória",
        theory: "Os metadados de um ndarray descrevem sua geometria sem acessar os dados internos. O atributo .shape retorna uma tupla com o tamanho de cada dimensão; .ndim indica o número de eixos; .size expressa a quantidade total de elementos; e .itemsize informa a quantidade de bytes ocupada por cada elemento individual.",
        questions: [
          q("O que o atributo .shape de um array bidimensional retorna?", "Uma tupla com a quantidade de linhas e colunas, no formato (linhas, colunas)", ["O total de megabytes ocupados","O tipo de processador da máquina"], "Uma matriz de 4 linhas e 5 colunas possui shape igual a (4, 5)."),
          q("O que o atributo .ndim indica sobre o ndarray?", "O número de dimensões (eixos) do array (ex: 1 para vetor, 2 para matriz, 3 para tensor)", ["O total de elementos da lista","O valor máximo encontrado no array"], "ndim é equivalente a len(arr.shape), medindo a dimensionalidade geométrica do contêiner."),
          q("Como a quantidade total de elementos de um ndarray (.size) se relaciona com seu .shape?", "O atributo .size é rigorosamente igual ao produto de todos os inteiros da tupla .shape", ["É a soma dos inteiros da tupla shape","Não possui relação com o shape"], "Para shape (3, 4, 5), size é igual a 3 * 4 * 5 = 60 elementos totais."),
          q("O que o atributo .nbytes de um ndarray expressa em termos de recursos?", "A memória total em bytes consumida pelos elementos (size multiplicado por itemsize)", ["O número de threads de execução","O tempo de processamento em segundos"], "arr.nbytes calcula a pegada de memória do bloco de dados alocado."),
          t("Qual atributo de um ndarray do NumPy retorna a tupla de dimensões da estrutura?", ["shape"], "O atributo arr.shape expõe as dimensões do array em uma tupla.", "# arr.shape"),
          g("Complete a checagem da quantidade de eixos de um tensor tridimensional:", ["arr.ndim == 3"], "ndim afere a quantidade de eixos da estrutura.", "def eh_tensor_3d(arr):\n    return ____"),
          o("Ordene os arrays pelo valor crescente de sua dimensionalidade .ndim:", ["np.array(42) -> escalar unidimensional com ndim = 0","np.array([1, 2, 3]) -> vetor unidimensional com ndim = 1","np.zeros((4, 4)) -> matriz bidimensional com ndim = 2","np.zeros((2, 3, 4)) -> tensor tridimensional com ndim = 3"], "Hierarquia de eixos dimensionais de escalares a tensores em NumPy."),
          p("Associe o atributo de metadados à sua informação correspondente:", [["arr.shape","Tupla contendo o comprimento de cada dimensão estrutural"],["arr.ndim","Número inteiro de eixos ou dimensões do contêiner"],["arr.size","Contagem total de elementos armazenados em todas as dimensões"],["arr.itemsize","Tamanho em bytes alocado por cada elemento individualmente"]], "Metadados essenciais de geometria e alocação de memória no ndarray.")
        ]
      },
      {
        id: "py-np-2-2-dtype-precisao",
        title: "Tipos de dados (dtype) e precisão numérica",
        subtitle: "Tipagem · Inteiros sinalizados, ponto flutuante IEEE 754 e bool",
        theory: "Cada ndarray possui um dtype que fixa o layout de bits de seus elementos. O NumPy oferece tipos inteiros sinalizados (int8 a int64), não sinalizados (uint8 para imagens), pontos flutuantes (float32 e float64) e booleanos (bool). A escolha correta equilibra precisão numérica e consumo de memória RAM.",
        questions: [
          q("Qual é a faixa de valores inteiros representável pelo dtype np.int8 (8 bits com sinal)?", "De -128 até +127", ["De 0 até 255","De -32768 até +32767"], "Com 8 bits e representação em complemento de dois, 1 bit é reservado para o sinal."),
          q("Qual dtype é amplamente utilizado em processamento de imagens para representar intensidades de pixels [0, 255]?", "np.uint8 (inteiro não sinalizado de 8 bits)", ["np.float64","np.int8"], "uint8 cobre perfeitamente a escala de 0 a 255 de canais RGB economizando memória."),
          q("O que acontece se somarmos 1 ao valor 127 em um array com dtype np.int8 em operações C sem checagem?", "Ocorre overflow aritmético silencioso, e o valor transborda para -128", ["Lança uma exceção OverflowError","O valor fica travado em 127"], "O NumPy prioriza desempenho em C; transbordamentos em dtypes inteiros fixos sofrem wrap-around."),
          q("Por que float32 é amplamente adotado em redes neurais em vez do padrão float64?", "Reduz o uso de memória pela metade e acelera a vazão de processamento em GPUs", ["Porque float32 não tem números negativos","Porque float64 é proibido em inteligência artificial"], "Modelos profundos toleram a menor precisão de float32 em troca de expressivo ganho de velocidade."),
          t("Qual atributo de um array informa o tipo primitivo dos elementos armazenados?", ["dtype"], "arr.dtype exibe o tipo de dado e a largura em bits.", "# arr.dtype"),
          g("Complete a criação de um array de inteiros de 16 bits explícito:", ["dtype=np.int16"], "O parâmetro dtype especifica o tipo exato no construtor.", "arr = np.array([1, 2, 3], ____)"),
          o("Ordene os tipos de ponto flutuante por precisão e consumo de bits crescente:", ["np.float16 (meia precisão com 16 bits)","np.float32 (precisão simples com 32 bits padrão em GPUs)","np.float64 (dupla precisão com 64 bits padrão científico)","np.float128 (precisão quádrupla estendida suportada por certas CPUs)"], "Escalada de precisão de representação em ponto flutuante IEEE 754."),
          p("Associe o dtype à sua característica de bits e aplicação:", [["np.uint8","8 bits sem sinal (0 a 255), padrão para imagens e bytes brutos"],["np.int32","32 bits com sinal, padrão para indexação inteira ampla"],["np.float64","64 bits de ponto flutuante, precisão científica padrão em Python"],["np.bool_","1 byte por valor booleano (True ou False) para máscaras"]], "Especificação de dtypes e perfis de alocação de memória no NumPy.")
        ]
      },
      {
        id: "py-np-2-3-astype-casting",
        title: "Conversão de tipos com astype e coerção",
        subtitle: "Casting · Criando cópias convertidas com segurança e controle de overflow",
        theory: "A conversão explícita de tipos no NumPy é realizada com o método .astype(). Diferente de operações in-place, astype gera por padrão uma nova cópia do array com o tipo solicitado. A coerção deve ser feita com cautela, pois converter floats em inteiros trunca a parte decimal sem arredondamento.",
        questions: [
          q("Qual método do ndarray converte os elementos para um novo dtype especificado?", ".astype()", [".convert()",".cast()"], "arr.astype(np.float32) gera um novo array com o tipo solicitado."),
          q("O que acontece ao converter um array de floats [1.9, 2.1, 3.8] para inteiros com .astype(int)?", "Os valores sofrem truncamento estrito em direção a zero, virando [1, 2, 3]", ["Os valores são arredondados para [2, 2, 4]","Ocorre um ValueError"], "A coerção de ponto flutuante para inteiro descarta as frações decimais sem arredondamento."),
          q("O método .astype() altera o array original in-place por padrão?", "Não, ele aloca e retorna uma nova cópia do array com o novo tipo de dados", ["Sim, ele altera os bytes originais diretamente","Apenas se o array for unidimensional"], "Por segurança, astype preserva a integridade do array de origem gerando um novo contêiner."),
          q("Como prevenir a perda de dados por overflow ao converter int64 com valores altos para int8?", "Verificar previamente se os valores mínimo e máximo cabem no intervalo [-128, 127]", ["Usar o método .trim()","Multiplicar o array por zero"], "Converter números maiores que a capacidade do dtype alvo corrompe os dados por transbordamento."),
          t("Qual método do ndarray realiza a conversão explícita para um novo tipo especificado?", ["astype",".astype"], ".astype() é a rotina canônica de coerção de tipo em NumPy.", "# arr.astype(np.int32)"),
          g("Complete a conversão segura de um array booleano para inteiros (True -> 1, False -> 0):", ["arr.astype(int)"], "Converter bool para int mapeia True para 1 e False para 0.", "arr_int = ____"),
          o("Ordene as etapas recomendadas para converter um array numérico com segurança de tipo:", ["Inspecionar os valores extremos mínimo e máximo do array atual com .min() e .max()","Verificar se a faixa de valores é compatível com os limites do novo dtype pretendido","Chamar o método .astype(novo_dtype) capturando o novo array resultante","Validar se o novo .dtype e a integridade dos dados correspondem ao esperado"], "Procedimento de coerção defensiva de tipos numéricos no NumPy."),
          p("Associe a operação de casting ao seu resultado direto:", [["np.array([1.9]).astype(int)","Truncamento resultando no array de inteiro [1]"],["np.array([0, 1]).astype(bool)","Mapeamento para array booleano [False, True]"],["np.array([\"42\"]).astype(int)","Parsing de texto para número inteiro [42]"],["arr.astype(arr.dtype, copy=False)","Retorna o próprio array sem alocar cópia se o tipo for igual"]], "Comportamentos fundamentais do método astype em conversões de dados.")
        ]
      },
      {
        id: "py-np-2-4-ordem-memoria",
        title: "Ordem de memória: C-order versus Fortran-order",
        subtitle: "Layout · Armazenamento linha a linha versus coluna a coluna",
        theory: "Na memória física linear, matrizes multidimensionais podem ser dispostas em Row-Major (C-order), onde linhas contíguas ficam juntas, ou Column-Major (Fortran-order), onde colunas ficam contíguas. O NumPy suporta ambos os formatos via flags, influenciando drasticamente a velocidade de iteração e percursos.",
        questions: [
          q("Qual é o layout padrão de armazenamento em memória adotado pelo NumPy na criação de arrays?", "C-order (Row-Major: elementos de uma mesma linha são gravados sequencialmente na memória)", ["Fortran-order (Column-Major)","Armazenamento aleatório"], "Por padrão, avançar no último eixo (coluna) corresponde a saltar para o byte imediatamente adjacente."),
          q("Como os elementos de uma matriz 2D são alocados no padrão Fortran-order (F-order)?", "Column-Major: elementos de uma mesma coluna são dispostos contiguamente na memória física", ["Em forma de espiral triangular","Em blocos criptografados"], "O layout Fortran é histórico da computação científica e padrão em bibliotecas como LAPACK e MATLAB."),
          q("Por que iterar por linhas em um array C-order é muito mais veloz do que iterar por colunas?", "Aproveita o pré-carregamento contíguo de linhas nas linhas de cache L1/L2 da CPU (localidade espacial)", ["Porque a linguagem C é mais recente que Fortran","Porque colunas gastam mais energia elétrica"], "Acessar bytes vizinhos na RAM maximiza cache hits; saltar distâncias gera penalidades de cache miss."),
          q("Qual atributo de um ndarray expõe informações sobre layout de memória e contiguidade?", "arr.flags (com propriedades como C_CONTIGUOUS e F_CONTIGUOUS)", ["arr.hardware","arr.memory_map"], "O objeto .flags detalha se o array é contíguo em C, Fortran ou se é uma visão não alinhada."),
          t("Como se denomina a convenção onde elementos de uma mesma linha ocupam endereços contíguos na memória?", ["row-major","c-order"], "Row-Major (C-order) aloca linhas sequencialmente na memória linear.", "# ordem linha-a-linha"),
          g("Complete a verificação para confirmar se um array é contíguo no padrão da linguagem C:", ["arr.flags.c_contiguous"], "A flag c_contiguous atesta alocação contígua em C.", "eh_contiguo_c = ____"),
          o("Ordene as posições na memória física linear de uma matriz 2x2 [[1, 2], [3, 4]] em C-order:", ["Primeiro byte: elemento [0, 0] (valor 1)","Segundo byte: elemento [0, 1] (valor 2 completando a primeira linha)","Terceiro byte: elemento [1, 0] (valor 3 iniciando a segunda linha)","Quarto byte: elemento [1, 1] (valor 4 completando a segunda linha)"], "Disposição contígua linear Row-Major na memória do computador."),
          p("Associe a ordem de memória à sua característica distintiva:", [["C-order (Row-Major)","Linhas contíguas em memória; padrão nativo de C e do NumPy"],["Fortran-order (Column-Major)","Colunas contíguas em memória; padrão do Fortran e LAPACK"],["Localidade espacial","Aproveitamento eficiente de cache ao acessar dados vizinhos"],["arr.flags","Objeto de metadados que relata se o bloco é gravável e contíguo"]], "Diferenciação de layouts de armazenamento de matrizes em memória.")
        ]
      },
      {
        id: "py-np-2-5-coercao-compatibilidade",
        title: "Coerção implícita e compatibilidade em operações",
        subtitle: "Upcasting · Regras de promoção de tipos em operações aritméticas mistas",
        theory: "Ao operar com arrays de dtypes distintos (ex: int32 somado a float64), o NumPy aplica upcasting implícito, promovendo o resultado para o tipo mais abrangente sem perda de precisão. Conhecer a hierarquia de tipos evita surpresas de consumo de memória causadas pela conversão involuntária de int em float.",
        questions: [
          q("O que acontece ao somar um array int32 com um array float64 no NumPy?", "O resultado é promovido automaticamente (upcasting) para um novo array float64", ["Lança TypeError por incompatibilidade de tipos","Os floats são truncados para inteiros"], "O NumPy preserva a precisão elevando a expressão ao tipo mais geral e preciso disponível."),
          q("Qual é a consequência prática do upcasting involuntário em pipelines que processam gigabytes de dados?", "A duplicação imediata do consumo de memória RAM ao converter int32 (4 bytes) em float64 (8 bytes)", ["O travamento do processador por calor","A perda de dados no disco"], "Promoções indesejadas dobram a pegada de memória, podendo estourar o limite da máquina."),
          q("O que a função np.can_cast(tipo_origem, tipo_destino) permite verificar?", "Se é possível converter o tipo sem violar a segurança de dados e sem perda de precisão (safe casting)", ["Se a internet está conectada","Se o Python está instalado"], "np.can_cast(\"int32\", \"float64\", casting=\"safe\") retorna True; no sentido inverso retorna False."),
          q("Como realizar uma operação aritmética entre dois arrays garantindo que o resultado permaneça em int32?", "Utilizar o parâmetro out= com array de destino pré-alocado ou converter explicitamente ao final", ["Declarar as variáveis em maiúsculas","Multiplicar o resultado por um booleano"], "O parâmetro out direciona os cálculos para um contêiner fixo com o dtype desejado."),
          t("Qual função do NumPy afere formalmente se uma conversão entre dtypes é segura sem perda?", ["can_cast","np.can_cast"], "np.can_cast valida regras de promoção e segurança de tipos.", "# np.can_cast(from, to)"),
          g("Complete a verificação se a conversão de float64 para int32 é considerada segura:", ["np.can_cast(np.float64, np.int32, casting=\"safe\")"], "A conversão de float para int não é segura pois descarta decimais.", "eh_seguro = ____"),
          o("Ordene a hierarquia de promoção de tipos (upcasting) do tipo mais restrito ao mais abrangente:", ["np.bool_ (booleano básico de 1 bit lógico)","np.int32 (números inteiros de precisão padrão)","np.float64 (ponto flutuante de dupla precisão)","np.complex128 (números complexos com partes real e imaginária)"], "Hierarquia de promoção automática de tipos aritméticos no motor NumPy."),
          p("Associe a operação mista ao seu dtype resultante após a promoção automática:", [["int32 + int64","Promovido para int64 (maior capacidade inteira)"],["int32 + float32","Promovido para float64 (preserva resolução aritmética)"],["bool_ + int8","Promovido para int8 (interpreta True como 1 e False como 0)"],["float32 + float64","Promovido para float64 (dupla precisão dominante)"]], "Regras universais de coerção e upcasting em expressões vetoriais.")
        ]
      }
    ],
    3: [
      {
        id: "py-np-3-1-fatiamento-multidimensional",
        title: "Fatiamento básico em uma e múltiplas dimensões",
        subtitle: "Slicing · Sintaxe [start:stop:step] estendida para matrizes",
        theory: "O fatiamento no NumPy estende a sintaxe nativa [start:stop:step] para múltiplos eixos separados por vírgula: arr[linhas, colunas]. Índices negativos contam a partir do final e passos negativos invertem a direção. Diferente das listas Python, o fatiamento básico em NumPy cria visões (views) sem copiar dados.",
        questions: [
          q("Como extrair a segunda linha inteira de uma matriz bidimensional de nome mat?", "mat[1, :]", ["mat[:, 1]","mat[1][1]"], "O índice 1 seleciona a linha de índice 1 (segunda linha) e : seleciona todas as colunas."),
          q("Como extrair a terceira coluna inteira de uma matriz bidimensional mat?", "mat[:, 2]", ["mat[2, :]","mat[2, 2]"], ": no primeiro eixo seleciona todas as linhas e 2 no segundo eixo fixa a terceira coluna."),
          q("O que a instrução arr[::-1, :] executa sobre uma matriz bidimensional?", "Inverte a ordem de todas as linhas de cima para baixo preservando a ordem das colunas", ["Inverte a ordem das colunas da esquerda para a direita","Apaga os números negativos"], "Passo -1 no primeiro eixo percorre as linhas de trás para frente, espelhando a matriz verticalmente."),
          q("O que a expressão mat[0:2, 1:4] extrai de uma matriz retangular?", "Uma submatriz com as linhas 0 e 1 e as colunas 1, 2 e 3 (o limite stop é exclusivo)", ["As linhas 0, 1 e 2 e colunas 1 a 4","Apenas quatro números isolados"], "Assim como em fatiamentos padrão de Python, o limite superior de corte é estritamente exclusivo."),
          t("Qual símbolo de pontuação separa os fatiamentos de diferentes eixos em um array multidimensional?", [","], "A vírgula separa as especificações de cada dimensão nos colchetes de indexação.", "# arr[linha, coluna]"),
          g("Complete a extração de uma submatriz 2x2 dos cantos superiores esquerdos de mat:", ["mat[:2, :2]"], "Fatiar :2 seleciona os dois primeiros elementos de cada dimensão.", "canto = ____"),
          o("Ordene as etapas para extrair um bloco central 3x3 de uma matriz 10x10:", ["Identificar a matriz bidimensional de entrada com suas 10 linhas e 10 colunas","Especificar o intervalo de linhas centrais nos índices de 3 a 6 com [3:6, ...]","Especificar o intervalo de colunas centrais nos índices de 3 a 6 com [..., 3:6]","Executar a fatia combinada mat[3:6, 3:6] obtendo a submatriz 3x3 resultante"], "Construção sintática de fatiamento bidimensional simultâneo."),
          p("Associe a notação de fatiamento à região extraída da matriz bidimensional:", [["mat[0, :]","Primeira linha inteira em toda sua extensão horizontal"],["mat[:, 0]","Primeira coluna inteira em toda sua extensão vertical"],["mat[::2, ::2]","Submatriz amostrada saltando de duas em duas linhas e colunas"],["mat[-1, -1]","Elemento escalar individual situado no canto inferior direito"]], "Sintaxe canônica de fatiamento cartesiano de arrays multidimensionais.")
        ]
      },
      {
        id: "py-np-3-2-view-versus-copy",
        title: "Diferença entre visão (view) e cópia (copy)",
        subtitle: "Memória · Modificando fatias sem alocação versus duplicação explícita",
        theory: "No NumPy, fatiamentos básicos geram visões (views), e não cópias dos dados. Uma visão compartilha o mesmo buffer de memória do array original: alterar um elemento na visão modifica instantaneamente o original. Para isolar alterações sem afetar o objeto de origem, deve-se chamar explicitamente .copy().",
        questions: [
          q("O que acontece com o array original se alterarmos um valor em uma submatriz obtida por fatiamento simples?", "O array original é modificado imediatamente, pois a fatia compartilha o mesmo buffer de memória (view)", ["O array original permanece inalterado","Gera um erro de permissão"], "Fatiamentos básicos criam visões (views) que apontam para os mesmos bytes do contêiner pai."),
          q("Por que o NumPy adota a criação de visões (views) em vez de cópias por padrão em fatiamentos?", "Para economizar memória RAM e eliminar o custo de tempo de duplicar gigabytes de dados", ["Porque cópias são proibidas na linguagem C","Para dificultar a vida do programador"], "Retornar views com ponteiros recalculados tem custo temporal zero O(1) independente do tamanho da matriz."),
          q("Como criar uma cópia totalmente independente que possa ser alterada sem afetar a matriz original?", "Chamar explicitamente o método .copy() sobre a fatia (ex: sub = mat[:2, :2].copy())", ["Atribuir a fatia a uma nova variável com o sinal =","Passar a fatia para uma lista"], "Atribuição simples apenas cria novo identificador; .copy() aloca novo bloco de memória isolado."),
          q("Como verificar programaticamente se um array b é uma visão que compartilha memória com a?", "Verificando se b.base is a ou utilizando a função np.shares_memory(a, b)", ["Comparando se len(a) == len(b)","Conferindo se ambos são do mesmo tipo"], "O atributo .base aponta para o array proprietário do buffer de memória original."),
          t("Qual método do ndarray aloca um novo bloco de memória duplicando os dados de forma independente?", ["copy",".copy()"], ".copy() garante isolamento completo de mutações futuras.", "# arr.copy()"),
          g("Complete o teste que confirma se dois arrays compartilham o mesmo espaço de memória:", ["np.shares_memory(arr1, arr2)"], "np.shares_memory analisa sobreposição de memória física.", "compartilham = ____"),
          o("Ordene as etapas que demonstram o comportamento de uma visão (view) em NumPy:", ["Criar uma matriz original arr com valores inteiros sequenciais","Extrair uma fatia simples sub = arr[:2, :2] sem chamar o método copy","Atribuir novo valor a um elemento da fatia com a instrução sub[0, 0] = 999","Inspecionar o array original constatando que arr[0, 0] também passou a valer 999"], "Demonstração empírica de mutação compartilhada em visões de memória."),
          p("Associe o conceito ao seu impacto na gestão de memória:", [["Visão (view)","Nova janela dimensional compartilhando os mesmos bytes subjacentes"],["Cópia (.copy())","Alocação de novo bloco independente na memória duplicando dados"],["arr.base","Atributo de referência que indica o array proprietário da memória original"],["np.shares_memory(a, b)","Função booleana que detecta se dois arrays dividem o mesmo buffer"]], "Diretrizes críticas de integridade de dados e mutabilidade em NumPy.")
        ]
      },
      {
        id: "py-np-3-3-ellipsis-avancado",
        title: "O objeto Ellipsis (...) e fatiamentos avançados",
        subtitle: "Eixos · Compactando dimensões intermediárias sem declarar múltiplos dois-pontos",
        theory: "O objeto Ellipsis (...) simplifica a indexação de tensores com muitas dimensões. Ele expande para quantos dois-pontos (:) forem necessários para preencher os eixos intermediários não declarados, permitindo acessar o primeiro ou o último eixo sem precisar conhecer antecipadamente o total exato de dimensões do tensor.",
        questions: [
          q("O que a sintaxe de reticências (...) representa na indexação multidimensional do NumPy?", "O objeto Ellipsis, que substitui quantos eixos completos (:) forem necessários entre dimensões", ["Um erro de digitação do desenvolvedor","A exclusão definitiva dos dados intermediários"], "arr[0, ..., 2] seleciona o índice 0 no primeiro eixo, todos os eixos do meio, e o índice 2 no último."),
          q("Quantas vezes o objeto Ellipsis (...) pode ser utilizado em uma mesma expressão de indexação?", "Apenas uma única vez por expressão de indexação", ["Quantas vezes o programador desejar","Exatamente duas vezes"], "Usar mais de uma elipse geraria ambiguidade matemática sobre quantos eixos cada uma deveria absorver."),
          q("Em um tensor quadridimensional de shape (10, 20, 30, 40), o que a expressão tensor[..., 0] extrai?", "O primeiro elemento de cada vetor no último eixo, mantendo as três primeiras dimensões: (10, 20, 30)", ["Apenas o elemento [0, 0, 0, 0]","Uma matriz bidimensional plana"], "A elipse absorve as três primeiras dimensões completas, fixando o índice zero no quarto eixo."),
          q("Qual é a forma equivalente tradicional da expressão arr[0, ...] para um array 3D?", "arr[0, :, :]", ["arr[0, 0, 0]","arr[:, :, 0]"], "A elipse substitui as duas dimensões restantes por fatias completas com dois-pontos."),
          t("Qual símbolo literal do Python é interpretado como o objeto Ellipsis em fatiamentos?", ["..."], "As reticências ... são convertidas no objeto built-in Ellipsis.", "# arr[..., 0]"),
          g("Complete a extração do último canal de cor de um lote de imagens de shape (N, H, W, C) usando elipse:", ["lote[..., -1]"], "A elipse preserva todas as dimensões espaciais e de lote iniciais.", "canal_final = ____"),
          o("Ordene as equivalências de fatiamento para um tensor tridimensional com shape (2, 3, 4):", ["tensor[0, ...] com elipse equivalente formal a tensor[0, :, :]","tensor[..., 0] com elipse equivalente formal a tensor[:, :, 0]","tensor[0, ..., 0] com elipse equivalente formal a tensor[0, :, 0]","tensor[...] com elipse equivalente formal à seleção de todos os elementos"], "Mapeamento de equivalências sintáticas do objeto Ellipsis em três eixos."),
          p("Associe a notação à sua interpretação dimensional correspondente:", [["arr[..., 0]","Fixa o índice 0 no último eixo após percorrer todas as dimensões anteriores"],["arr[0, ...]","Fixa o índice 0 no primeiro eixo e seleciona todas as dimensões subsequentes"],["Ellipsis","Constante singleton embutida no Python representada pela sintaxe ..."],["Regra de unicidade","Proibição de usar mais de uma elipse na mesma chamada de indexação"]], "Operações dimensionais compactas com o objeto Ellipsis no NumPy.")
        ]
      },
      {
        id: "py-np-3-4-newaxis-expansao",
        title: "Adição de eixos com np.newaxis e None",
        subtitle: "Dimensionalidade · Promovendo vetores 1D a matrizes coluna ou linha",
        theory: "Para compatibilizar matrizes em operações de broadcasting, frequentemente é necessário adicionar dimensões unitárias (tamanho 1) a um array. O NumPy permite inserir eixos usando np.newaxis (que é um alias para None) na indexação, transformando um vetor 1D de shape (N,) em matriz linha (1, N) ou coluna (N, 1).",
        questions: [
          q("O que a instrução vetor[:, np.newaxis] faz com um array unidimensional de shape (5,)?", "Transforma o vetor em uma matriz bidimensional coluna com novo shape (5, 1)", ["Duplica todos os elementos do vetor","Apaga os números negativos"], "Adicionar um eixo na segunda posição promove o vetor unidimensional a vetor-coluna."),
          q("Qual é a relação entre np.newaxis e a constante None em indexações do NumPy?", "np.newaxis é exatamente um alias explícito para None; arr[:, None] produz o mesmo efeito", ["São objetos concorrentes e incompatíveis","newaxis só aceita inteiros e None aceita floats"], "NumPy implementa newaxis como None para permitir uma escrita semanticamente legível."),
          q("O que a instrução vetor[np.newaxis, :] produz sobre um vetor 1D de shape (5,)?", "Uma matriz bidimensional linha com shape (1, 5)", ["Um escalar dimensional com shape ()","Um tensor tridimensional (5, 5, 5)"], "Adicionar o novo eixo na primeira posição cria uma linha única contendo os 5 elementos originais."),
          q("Qual método alternativo atinge o mesmo objetivo de adicionar dimensões de tamanho 1?", "np.expand_dims(vetor, axis=1)", ["np.squeeze()","np.flatten()"], "np.expand_dims insere formalmente um novo eixo na posição indicada pelo parâmetro axis."),
          t("Qual constante do NumPy atua como alias para None ao expandir dimensões em indexações?", ["newaxis","np.newaxis"], "np.newaxis insere um eixo de comprimento 1 na posição especificada.", "# arr[:, np.newaxis]"),
          g("Complete a promoção de um vetor x de shape (N,) para vetor-linha de shape (1, N):", ["x[np.newaxis, :]"], "np.newaxis no primeiro índice insere a dimensão de linha unitária.", "linha_2d = ____"),
          o("Ordene a progressão dimensional ao expandir sucessivamente novos eixos sobre um array:", ["Vetor 1D original com shape inicial (4,)","Vetor coluna 2D com shape (4, 1) após primeira expansão arr[:, np.newaxis]","Tensor 3D com shape (4, 1, 1) após segunda expansão arr[:, np.newaxis, np.newaxis]","Tensor 4D com shape (1, 4, 1, 1) adicionando dimensão de lote frontal"], "Sequência de elevação dimensional com np.newaxis para alinhamento vetorial."),
          p("Associe a operação à sua transformação de shape:", [["arr[:, np.newaxis]","Converte shape (N,) em vetor coluna bidimensional (N, 1)"],["arr[np.newaxis, :]","Converte shape (N,) em vetor linha bidimensional (1, N)"],["np.squeeze(arr)","Remove todas as dimensões unitárias de tamanho 1 da estrutura"],["np.expand_dims(arr, axis=0)","Insere uma nova dimensão unitária no início do shape"]], "Manipulação de eixos unitários e adequação geométrica de tensores.")
        ]
      },
      {
        id: "py-np-3-5-fancy-indexing",
        title: "Indexação por inteiros (fancy indexing)",
        subtitle: "Seleção · Extraindo elementos em posições arbitrárias com arrays de índices",
        theory: "Fancy indexing é a indexação avançada onde se passam listas ou arrays de inteiros para selecionar elementos em posições arbitrárias. Diferente do fatiamento básico que retorna visões, o fancy indexing aloca e retorna sempre uma cópia independente dos dados, permitindo reordenar e duplicar itens livremente.",
        questions: [
          q("Qual é a diferença crucial entre fatiamento básico (slicing) e fancy indexing quanto à memória?", "Fatiamento básico retorna uma visão (view); fancy indexing retorna sempre uma cópia nova (copy)", ["Fatiamento básico retorna uma cópia; fancy indexing retorna uma visão","Ambos retornam cópias"], "Fancy indexing copia os dados porque as posições selecionadas não formam um bloco regular contíguo."),
          q("O que a instrução arr[[0, 2, 4]] retorna a partir de um vetor unidimensional?", "Um novo array contendo os elementos dos índices 0, 2 e 4 na ordem especificada", ["Apenas os elementos pares do array","A soma desses três índices"], "Passar uma lista de inteiros seleciona e reorganiza os elementos na ordem declarada na lista."),
          q("O que acontece se passarmos índices repetidos no fancy indexing, como arr[[1, 1, 1]]?", "Retorna um novo array contendo o elemento de índice 1 replicado três vezes", ["Lança um IndexError por índice duplicado","Apaga o elemento do array"], "O fancy indexing reproduz fielmente as posições requisitadas, permitindo reamostragem com reposição."),
          q("Como o fancy indexing se comporta com matrizes 2D ao passar dois arrays de índices arr[[0, 1], [2, 3]]?", "Combina os pares de coordenadas, selecionando os elementos pontuais (0, 2) e (1, 3)", ["Seleciona um bloco retangular 2x2","Inverte as linhas e colunas"], "Dois arrays de índices inteiros são emparelhados elemento a elemento como coordenadas cartesianas."),
          t("Qual termo consagrado no ecossistema NumPy designa a indexação através de arrays de inteiros?", ["fancy indexing"], "Fancy indexing é o termo padrão para indexação baseada em vetores de posições inteiras.", "# fancy indexing"),
          g("Complete a extração das linhas 3, 0 e 2 de uma matriz na ordem informada:", ["mat[[3, 0, 2]]"], "Passar a lista de índices reorganiza as linhas de mat.", "linhas_selecionadas = ____"),
          o("Ordene as etapas executadas pelo NumPy durante uma operação de fancy indexing:", ["Receber o array de índices inteiros especificado pelo desenvolvedor","Avaliar se todos os índices estão dentro dos limites válidos de dimensionalidade","Alocar um novo bloco de memória com o shape compatível com a seleção","Copiar os dados das posições requisitadas para o novo contêiner independente"], "Mecanismo interno de execução e alocação do fancy indexing."),
          p("Associe o estilo de indexação à sua respectiva propriedade de retorno:", [["arr[0:5]","Fatiamento básico retornando uma visão (view) contígua de memória"],["arr[[0, 2, 4]]","Fancy indexing retornando uma cópia independente alocada"],["arr[[0, 0, 0]]","Fancy indexing replicando elementos para reamostragem"],["arr[linhas, colunas]","Indexação avançada por pares de coordenadas pontuais"]], "Comparação entre mecanismos básicos e avançados de indexação em NumPy.")
        ]
      }
    ],
    4: [
      {
        id: "py-np-4-1-filtragem-booleana",
        title: "Filtragem com arrays booleanos e predicados",
        subtitle: "Predicados · Aplicando condições lógicas elementwise para seleção",
        theory: "Aplicações de operadores relacionais sobre um ndarray produzem uma máscara booleana de mesmo shape com True ou False em cada posição. Indexar o array original com essa máscara seleciona apenas as posições onde o predicado é verdadeiro, gerando um novo array 1D com os elementos filtrados.",
        questions: [
          q("O que a expressão arr > 0 retorna quando aplicada a um ndarray numérico?", "Um novo array booleano de mesmo shape com True onde o elemento for maior que zero e False caso contrário", ["O número de elementos maiores que zero","Apenas o primeiro elemento positivo"], "A comparação é aplicada elemento a elemento (elementwise), gerando uma máscara booleana."),
          q("O que a instrução arr[arr > 0] produz sobre o array original?", "Um novo array 1D contendo exclusivamente os elementos que atenderam à condição lógica", ["A modificação de todos os números negativos para zero","Uma matriz cheia de valores booleanos"], "Passar a máscara booleana como índice extrai os elementos verdadeiros em um vetor unidimensional."),
          q("A filtragem por máscara booleana retorna uma visão (view) ou uma cópia (copy)?", "Retorna sempre uma cópia independente (copy), pois as posições filtradas não formam fatias contíguas", ["Retorna uma visão compartilhada","Retorna uma tupla imutável"], "Assim como o fancy indexing por inteiros, a seleção booleana aloca um novo contêiner de memória."),
          q("Como contar rapidamente quantos elementos atendem a uma condição booleana mascara?", "np.sum(mascara) ou mascara.sum(), pois o Python interpreta True como 1 e False como 0", ["len(mascara)","mascara.count(True)"], "Somar um array booleano acumula as ocorrências de True de forma vetorizada instantânea."),
          t("Qual dtype é atribuído ao array resultante de uma comparação relacional como arr == 42?", ["bool","bool_","numpy.bool_"], "Comparações produzem ndarrays com dtype booleano.", "# dtype booleano"),
          g("Complete o filtro para selecionar apenas valores estritamente positivos de um array:", ["arr[arr > 0]"], "A máscara booleana arr > 0 filtra elementos dentro dos colchetes.", "positivos = ____"),
          o("Ordene as etapas da filtragem condicional por máscara booleana no NumPy:", ["Definir a condição lógica desejada sobre a variável (ex: arr >= 100)","Avaliar a expressão gerando a máscara booleana intermediária de mesmo shape","Indexar o array original passando a máscara entre os colchetes arr[mascara]","Receber o array unidimensional resultante contendo os elementos aprovados"], "Fluxo algorítmico de filtragem booleana elementwise em arrays NumPy."),
          p("Associe a operação booleana ao seu resultado correspondente:", [["arr > 50","Máscara booleana elementwise com valores True e False"],["arr[arr > 50]","Array 1D com os elementos que superam o limiar 50"],["(arr > 50).sum()","Contagem inteira da quantidade de elementos maiores que 50"],["(arr > 50).mean()","Proporção percentual (fração entre 0 e 1) de elementos aprovados"]], "Padrões de manipulação e sumarização com máscaras booleanas.")
        ]
      },
      {
        id: "py-np-4-2-operadores-bitwise",
        title: "Operadores bitwise elementwise (&, |, ~) em máscaras",
        subtitle: "Lógica · Combinando predicados compostos com parênteses obrigatórios",
        theory: "Para combinar condições lógicas em NumPy, não se utilizam as palavras-chave and, or e not, mas os operadores bitwise elementwise: & para conjunção, | para disjunção e ~ para negação. Parênteses em torno de cada condição são estritamente obrigatórios devido à precedência aritmética.",
        questions: [
          q("Por que a expressão arr > 0 and arr < 10 falha com ValueError em arrays NumPy?", "Porque as palavras and/or exigem verdade sobre o array inteiro, enquanto & e | atuam elemento a elemento", ["Porque o NumPy proíbe números menores que dez","Porque and só funciona com strings"], "As palavras-chave lógicas do Python avaliam a verdade global do objeto; NumPy exige operadores bitwise elementwise."),
          q("Por que os parênteses são estritamente obrigatórios na expressão (arr > 0) & (arr < 10)?", "Porque o operador bitwise & tem precedência matemática superior aos operadores de comparação > e <", ["Porque o interpretador Python exige parênteses por estética","Para transformar a expressão em tupla"], "Sem parênteses, Python tentaria avaliar 0 & arr antes das comparações, gerando erro de sintaxe lógica."),
          q("Qual operador do NumPy realiza a negação lógica elemento a elemento de uma máscara booleana?", "O operador til ~ (ex: ~mascara inverte todos os valores de True para False e vice-versa)", ["A palavra-chave not","O sinal de exclamação !"], "O operador unário til inverte a verdade de cada posição na máscara vetorial."),
          q("Como expressar a condição \"valores menores que 0 OU maiores que 100\" em NumPy?", "(arr < 0) | (arr > 100)", ["arr < 0 or arr > 100","arr < 0 || arr > 100"], "A barra vertical | realiza a união lógica disjuntiva elemento a elemento."),
          t("Qual símbolo de operador bitwise realiza a conjunção lógica elemento a elemento (E lógico)?", ["&"], "& realiza o E lógico entre arrays booleanos.", "# (cond1) & (cond2)"),
          g("Complete a seleção de elementos pares maiores que 10 com parênteses corretos:", ["(arr > 10) & (arr % 2 == 0)"], "Conjunção lógica vetorizada exige parênteses e operador &.", "mascara = ____\nselecao = arr[mascara]"),
          o("Ordene a precedência de avaliação da instrução (x > 0) & (x < 100):", ["Avaliar o predicado do primeiro parêntese (x > 0) gerando máscara booleana A","Avaliar o predicado do segundo parêntese (x < 100) gerando máscara booleana B","Aplicar o operador bitwise & combinando as máscaras A e B elemento a elemento","Produzir a máscara final composta onde ambas as condições são satisfeitas"], "Ordem de execução de expressões lógicas compostas com precedência correta."),
          p("Associe o operador bitwise à sua operação booleana correspondente:", [["&","Conjunção lógica elementwise (E lógico: ambas verdadeiras)"],["|","Disjunção lógica elementwise (OU lógico: ao menos uma verdadeira)"],["~","Negação lógica elementwise (inversão de True para False)"],["^","Disjunção exclusiva elementwise (XOR: exatamente uma verdadeira)"]], "Operadores fundamentais para composição de predicados lógicos em NumPy.")
        ]
      },
      {
        id: "py-np-4-3-np-where-condicional",
        title: "Seleção e substituição condicional com np.where",
        subtitle: "Ternário · Vetorizando o if-else com três argumentos ou obtendo coordenadas",
        theory: "A função np.where atua em dois modos fundamentais. Com três argumentos np.where(condicao, valor_se_v, valor_se_f), opera como um if-else vetorizado instantâneo. Com apenas um argumento np.where(condicao), retorna uma tupla de arrays contendo as coordenadas dos índices onde a condição é atendida.",
        questions: [
          q("Como funciona a instrução np.where(arr >= 0, arr, 0) sobre um array numérico?", "Substitui todos os números negativos por zero mantendo inalterados os números positivos", ["Apaga todos os números positivos","Multiplica a matriz por zero"], "O if-else vetorizado avalia a condição elemento a elemento, escolhendo o valor do segundo ou terceiro argumento."),
          q("O que a chamada np.where(arr > 50) com um único argumento retorna?", "Uma tupla de arrays de inteiros contendo as coordenadas ou índices onde a condição é True", ["Apenas o valor booleano True","A soma dos elementos maiores que 50"], "Com um argumento, np.where atua como localizador de índices de elementos que satisfazem o predicado."),
          q("Qual é a vantagem de np.where sobre laços for com if/else em Python puro?", "Executa inteiramente em código de máquina C vetorizado, sendo ordens de magnitude mais veloz", ["Gera relatórios impressos no terminal","Permite usar variáveis sem inicialização"], "Vetorizar a seleção condicional elimina o overhead do interpretador em milhões de iterações."),
          q("É possível utilizar arrays completos no segundo e terceiro argumentos de np.where?", "Sim, os argumentos podem ser escalares ou arrays, desde que compatíveis por broadcasting", ["Não, apenas números inteiros são aceitos","Apenas strings são permitidas"], "Se passarmos duas matrizes A e B, np.where mescla elementos de A e B segundo a máscara."),
          t("Qual função do NumPy atua como a versão vetorizada da expressão condicional if-else ternária?", ["where","np.where"], "np.where é a rotina canônica de decisão condicional vetorizada.", "# np.where(cond, x, y)"),
          g("Complete a binarização de dados transformando valores >= 10 em 1 e os demais em 0:", ["np.where(dados >= 10, 1, 0)"], "np.where seleciona 1 para True e 0 para False.", "binario = ____"),
          o("Ordene as etapas executadas pelo np.where(cond, x, y) internamente:", ["Avaliar a expressão lógica de primeiro argumento gerando a máscara booleana","Validar a compatibilidade de dimensionalidade (broadcasting) entre cond, x e y","Alocar o array de saída com o formato e dtype comum determinado","Preencher cada posição com elemento de x (se True) ou de y (se False)"], "Lógica de execução da seleção condicional vetorizada com np.where."),
          p("Associe a assinatura de np.where ao seu comportamento correspondente:", [["np.where(cond, x, y)","If-else vetorizado escolhendo elemento de x se verdadeiro ou y se falso"],["np.where(cond)","Retorna tupla com as coordenadas inteiras dos elementos verdadeiros"],["np.where(arr < 0, -arr, arr)","Cálculo do valor absoluto elementwise via substituição condicional"],["np.where(np.isnan(x), 0, x)","Tratamento de valores NaN substituindo-os por zero com segurança"]], "Modos de operação e aplicações analíticas da função np.where.")
        ]
      },
      {
        id: "py-np-4-4-np-any-all",
        title: "Redução lógica com np.any e np.all",
        subtitle: "Quantificadores · Verificando existência (existe um) versus universalidade (todos)",
        theory: "As funções np.any e np.all reduzem arrays booleanos a um único resultado lógico. np.any avalia se ao menos um elemento é verdadeiro (equivalente ao quantificador existencial); np.all verifica se todos os elementos são estritamente verdadeiros (quantificador universal). Ambos aceitam o parâmetro axis.",
        questions: [
          q("O que a instrução np.any(arr < 0) verifica sobre um conjunto de dados?", "Se existe ao menos um elemento negativo em qualquer posição do array", ["Se todos os elementos são negativos","Quantos elementos negativos existem"], "np.any atua como quantificador existencial (OR generalizado), retornando True na primeira ocorrência."),
          q("O que a instrução np.all(arr > 0) verifica sobre um array?", "Se rigorosamente todos os elementos do array são estritamente maiores que zero", ["Se a média é maior que zero","Se o primeiro elemento é positivo"], "np.all atua como quantificador universal (AND generalizado), falhando para False se houver um único não positivo."),
          q("Como o parâmetro axis afeta o comportamento de np.any em uma matriz bidimensional?", "Executa a redução lógica ao longo do eixo indicado, retornando um vetor de booleanos", ["Transforma a matriz em texto","Inverte as linhas e colunas"], "np.any(mat > 0, axis=1) informa linha a linha se existe algum elemento positivo naquela linha."),
          q("Qual função equivalente da biblioteca padrão do Python é substituída por np.any em arrays?", "A função built-in any(), mas np.any opera em código compilado e aceita o parâmetro axis", ["A função sum()","A função map()"], "A versão do NumPy é altamente veloz e otimizada para contêineres multidimensionais."),
          t("Qual função do NumPy retorna True apenas se todos os elementos avaliados forem verdadeiros?", ["all","np.all"], "np.all é a redução lógica universal do NumPy.", "# np.all(condicao)"),
          g("Complete o teste que verifica se alguma linha da matriz contém valor nulo (NaN):", ["np.any(np.isnan(mat), axis=1)"], "np.any com axis=1 avalia presença de True por linha.", "linhas_com_nan = ____"),
          o("Ordene as avaliações lógicas por rigor de exigência para aprovação (do mais tolerante ao mais restrito):", ["np.any(mascara): exige apenas um único elemento True para aprovar","np.sum(mascara) >= limite: exige uma cota mínima predefinida de True","np.mean(mascara) > 0.5: exige maioria estrita de elementos True","np.all(mascara): exige unanimidade total de todos os elementos True"], "Escala de critérios de agregação e redução lógica de predicados."),
          p("Associe a função de redução lógica à sua propriedade matemática:", [["np.any(arr)","Quantificador existencial (True se houver pelo menos um True)"],["np.all(arr)","Quantificador universal (True somente se todos forem True)"],["np.any(arr, axis=0)","Redução existencial por coluna produzindo vetor booleano"],["np.all(arr, axis=1)","Redução universal por linha produzindo vetor booleano"]], "Operações de agregação lógica e checagem de invariantes no NumPy.")
        ]
      },
      {
        id: "py-np-4-5-atribuicao-mascara",
        title: "Atribuição e mutação in-place por máscara booleana",
        subtitle: "Mutação · Alterando fatias condicionais sem gerar novos arrays",
        theory: "Além da leitura e filtragem, máscaras booleanas podem ser usadas no lado esquerdo de atribuições para modificar valores in-place. A instrução arr[arr < 0] = 0 substitui diretamente todos os valores negativos por zero no próprio buffer de memória do array, sem alocar uma cópia intermediária.",
        questions: [
          q("O que a instrução arr[arr < 0] = 0 executa sobre o array original?", "Substitui diretamente in-place todos os valores estritamente negativos pelo número zero", ["Cria um novo array positivo e descarta o original","Lança um erro de atribuição inválida"], "A atribuição por máscara modifica diretamente as posições de memória selecionadas pelo predicado."),
          q("Por que a atribuição in-place por máscara arr[mascara] = valor é eficiente em memória?", "Porque altera os bytes no próprio buffer alocado existente, sem duplicar a matriz na memória RAM", ["Porque desativa o processador da máquina","Porque salva os dados na memória ROM"], "Evitar alocações adicionais é crucial ao limpar matrizes de grande porte em pipelines intensivos."),
          q("É possível atribuir um vetor de valores correspondentes usando máscara booleana?", "Sim, desde que a quantidade de novos valores seja idêntica à quantidade de posições True na máscara", ["Não, apenas escalares simples podem ser atribuídos","Apenas valores nulos são aceitos"], "Podemos injetar uma sequência de valores específicos exatamente nas posições aprovadas pelo filtro."),
          q("Como substituir todos os valores NaN (Not a Number) de uma matriz por zero in-place?", "arr[np.isnan(arr)] = 0.0", ["arr[arr == None] = 0","np.clear_nan(arr)"], "np.isnan gera a máscara booleana que detecta valores ausentes IEEE 754 de forma infalível."),
          t("Qual função do NumPy detecta elementos com valor especial NaN em arrays de ponto flutuante?", ["isnan","np.isnan"], "np.isnan identifica pontualmente valores não numéricos.", "# np.isnan(arr)"),
          g("Complete a normalização que limita (clampa) todos os valores acima de 100 para exatamente 100 in-place:", ["arr[arr > 100] = 100"], "Atribuição por máscara aplica o limite superior no próprio array.", "____ // clampa valores superiores a 100"),
          o("Ordene as etapas executadas durante uma atribuição por máscara booleana:", ["Avaliar a condição lógica gerando a máscara booleana de posições True e False","Mapear os endereços físicos de memória correspondentes às posições aprovadas","Gravar o novo valor escalar diretamente sobre os bytes dos endereços mapeados","Preservar os valores das posições onde a máscara avaliou para False"], "Ciclo de processamento da mutação in-place por indexação booleana."),
          p("Associe a operação de mutação in-place ao seu efeito direto:", [["arr[arr < 0] = 0","Retificação de valores negativos para zero (função ReLU)"],["arr[np.isnan(arr)] = 0.0","Imputação de valores nulos por zero no próprio contêiner"],["arr[arr > teto] = teto","Truncamento superior (clamping / winsorização) de extremos"],["arr[mascara] *= -1","Inversão aritmética de sinal apenas nos elementos selecionados"]], "Técnicas de transformação e limpeza in-place com indexação booleana.")
        ]
      }
    ],
    5: [
      {
        id: "py-np-5-1-regras-broadcasting",
        title: "As regras formais de broadcasting no NumPy",
        subtitle: "Vetorização · Compatibilizando arrays de formatos distintos sem copiar dados",
        theory: "O broadcasting descreve como o NumPy opera entre arrays de shapes diferentes sem duplicar dados na memória. Alinhando as dimensões a partir da direita, duas dimensões são compatíveis se forem estritamente iguais ou se uma delas for igual a 1. Dimensões unitárias são virtualmente esticadas sem alocação física.",
        questions: [
          q("Qual é a regra áurea do alinhamento de dimensões no broadcasting do NumPy?", "O alinhamento é feito da direita para a esquerda (do último eixo para o primeiro)", ["O alinhamento é feito da esquerda para a direita","Os shapes devem ser exatamente idênticos"], "Comparar de trás para frente alinha eixos de menor ordem, padronizando vetores com matrizes."),
          q("Sob quais condições duas dimensões alinhadas são consideradas compatíveis para broadcasting?", "Se os comprimentos dos eixos forem estritamente iguais, ou se um dos eixos tiver comprimento 1", ["Se a soma dos eixos for par","Se ambos forem maiores que dez"], "Quando um dos eixos mede 1, o NumPy virtualiza a repetição daquele dado sem alocar cópias na RAM."),
          q("Um array de shape (3, 4) pode operar por broadcasting com um array de shape (4,)?", "Sim; o vetor (4,) é promovido para (1, 4) e compatibilizado com a matriz (3, 4) resultando em (3, 4)", ["Não, dimensões diferentes sempre geram erro","Sim, mas o resultado terá shape (4, 3)"], "O shape (4,) alinha com a última dimensão 4, e o eixo faltante é tratado como 1 e expandido."),
          q("O broadcasting duplica fisicamente os dados na memória RAM para igualar os formatos?", "Não, o NumPy ajusta os strides com passo zero, lendo o mesmo byte repetidamente sem alocação extra", ["Sim, ele copia a matriz centenas de vezes","Sim, cria arquivos temporários no disco"], "Essa virtualização elegante com strides zero garante altíssima velocidade e baixíssimo consumo de memória."),
          t("Como se denomina o mecanismo do NumPy que equaliza shapes de arrays para operações aritméticas?", ["broadcasting"], "Broadcasting é o termo canônico da expansão dimensional virtual no NumPy.", "# broadcasting de eixos"),
          g("Complete a previsão do shape resultante da soma de matrizes com shapes (5, 1) e (1, 8):", ["(5, 8)"], "Ambas as dimensões unitárias expandem, resultando em (5, 8).", "# shape final: ____"),
          o("Ordene as etapas do algoritmo de verificação de broadcasting entre dois arrays:", ["Comparar as tuplas shape alinhando as dimensões a partir da extremidade direita","Se um array tiver menos dimensões, preencher as dimensões faltantes à esquerda com 1","Verificar se cada par de dimensões é igual ou se pelo menos uma delas mede 1","Determinar o shape final de saída contendo o valor máximo de cada par alinhado"], "Algoritmo formal de compatibilização dimensional de broadcasting."),
          p("Associe o par de shapes à viabilidade de operação por broadcasting:", [["(4, 3) e (3,)","Compatíveis resultando em shape final (4, 3)"],["(5, 1) e (1, 6)","Compatíveis resultando em matriz bidimensional (5, 6)"],["(3, 4) e (3,)","Incompatíveis gerando ValueError (4 não alinha com 3 na direita)"],["(2, 3, 4) e (4,)","Compatíveis resultando no tensor tridimensional (2, 3, 4)"]], "Diagnóstico de compatibilidade de formatos sob as regras de broadcasting.")
        ]
      },
      {
        id: "py-np-5-2-escalares-matrizes",
        title: "Operações entre escalares e matrizes",
        subtitle: "Aritmética · Multiplicação, soma e transformações elementares",
        theory: "O caso mais simples e frequente de broadcasting ocorre entre um escalar e uma matriz. O número escalar (shape ()) é tratado como se possuísse formato unitário em todas as dimensões, sendo projetado sobre cada elemento da matriz em código de máquina otimizado com vetorização SIMD.",
        questions: [
          q("O que a instrução mat * 2.0 faz com uma matriz bidimensional no NumPy?", "Multiplica cada elemento individual da matriz pelo escalar 2.0 (operação elementwise)", ["Duplica a quantidade de linhas da matriz","Multiplica apenas a primeira linha"], "O escalar sofre broadcasting sobre toda a geometria da matriz de forma uniforme."),
          q("Como a operação de subtração mat - media_amostral atua quando media_amostral é um escalar?", "Centraliza os dados subtraindo a média escalar de todos os elementos da matriz", ["Subtrai apenas do primeiro elemento","Lança um erro de tipos incompatíveis"], "A subtração escalar é o passo elementar de centralização estatística em álgebra vetorial."),
          q("Qual vantagem de velocidade a multiplicação matricial por escalar no NumPy tem sobre loops Python?", "Executa em loops de baixo nível em linguagem C utilizando instruções vetoriais da CPU (AVX/SIMD)", ["Nenhuma, pois Python é interpretado linha a linha","Funciona apenas se houver GPU dedicada"], "Instruções vetoriais processam múltiplos números de ponto flutuante em um único ciclo de clock."),
          q("O que a expressão 1.0 / mat calcula elemento a elemento?", "O inverso multiplicativo de cada elemento não nulo da matriz", ["A divisão da matriz por si mesma","A transposta da matriz"], "Todas as operações aritméticas padrão (+, -, *, /, //, **, %) atuam elementwise com escalares."),
          t("Qual termo técnico descreve a capacidade de processadores modernos de aplicar uma instrução a múltiplos dados?", ["SIMD","vetorizacao"], "SIMD (Single Instruction, Multiple Data) acelera cálculos vetoriais em hardware.", "# instrucoes SIMD da CPU"),
          g("Complete a conversão de uma matriz de temperaturas de Celsius para Fahrenheit:", ["mat_celsius * 1.8 + 32"], "Operações com escalares combinam multiplicações e somas vetorizadas.", "mat_fahrenheit = ____"),
          o("Ordene as operações da normalização Min-Max de uma matriz por escalares (min e max):", ["Calcular o valor escalar mínimo min_val com o método mat.min()","Calcular o valor escalar máximo max_val com o método mat.max()","Subtrair o escalar min_val de toda a matriz mat - min_val","Dividir a matriz resultante pela amplitude escalar (max_val - min_val)"], "Sequência de transformações escalares para normalização de escala em matrizes."),
          p("Associe a operação escalar ao seu efeito analítico na matriz:", [["mat + 10","Deslocamento de nível somando uma constante a todos os elementos"],["mat * 0.001","Mudança de escala (ex: convertendo miligramas em gramas)"],["mat ** 2","Elevação quadrática individual de cada elemento da matriz"],["mat > 0","Binarização lógica comparando todos os elementos contra o limiar"]], "Aplicações práticas de broadcasting de escalares em dados multidimensionais.")
        ]
      },
      {
        id: "py-np-5-3-vetores-linha-coluna",
        title: "Combinação de vetores coluna e vetores linha",
        subtitle: "Grades · Construindo tabelas e matrizes de distâncias cartesianas",
        theory: "Quando um vetor coluna de shape (M, 1) opera aritmeticamente com um vetor linha de shape (1, N), o broadcasting expande ambos simultaneamente, gerando uma matriz bidimensional completa de shape (M, N). Essa técnica permite construir grades de coordenadas, tabelas cruzadas e matrizes de distância sem nenhum laço for.",
        questions: [
          q("Qual é o shape da matriz resultante da operação entre a de shape (5, 1) e b de shape (1, 8)?", "(5, 8), pois a expande suas 5 linhas nas 8 colunas e b expande suas 8 colunas nas 5 linhas", ["(5, 1)","(1, 8)"], "Ambas as dimensões unitárias sofrem expansão mútua cobrindo toda a grade cartesiana."),
          q("Como construir uma grade bidimensional de coordenadas X e Y a partir de dois vetores 1D x e y?", "Utilizando np.meshgrid(x, y) ou operando com x[:, None] e y[None, :]", ["Multiplicando x e y com operador ponto","Somando as duas listas com o sinal +"], "O produto cartesiano de eixos unitários gera uma malha retangular completa instantaneamente."),
          q("Qual é a utilidade do broadcasting de linha e coluna no cálculo de matrizes de distâncias euclidianas?", "Permite subtrair todos os pares de pontos (x_i - x_j) de uma só vez sem laços for aninhados", ["Apenas serve para inverter cores de imagens","Elimina números primos"], "A diferença entre X[:, None] e X[None, :] produz a matriz de diferenças entre todos os pares de observações."),
          q("Qual função de conveniência do NumPy cria diretamente malhas indexadas prontas para broadcasting?", "np.ogrid ou np.meshgrid(indexing=\"ij\")", ["np.arange_grid()","np.matrix_loop()"], "np.ogrid (open meshgrid) devolve arrays com eixos unitários perfeitos para broadcasting econômico."),
          t("Qual função do NumPy gera grades cartesianas completas de coordenadas a partir de dois vetores?", ["meshgrid","np.meshgrid"], "np.meshgrid projeta pares de eixos em matrizes bidimensionais coordenadas.", "# np.meshgrid(x, y)"),
          g("Complete o produto cartesiano entre vetor coluna col e vetor linha lin para gerar matriz retangular:", ["col * lin"], "Multiplicar (M, 1) por (1, N) gera matriz de shape (M, N) via broadcasting.", "matriz_grade = ____"),
          o("Ordene as etapas para calcular a matriz de diferenças entre todos os elementos de um vetor v de tamanho N:", ["Promover o vetor para matriz coluna com shape (N, 1) usando v[:, np.newaxis]","Promover o vetor para matriz linha com shape (1, N) usando v[np.newaxis, :]","Executar a subtração vetorizada dif = v[:, None] - v[None, :]","Receber a matriz antissimétrica de shape (N, N) contendo todas as diferenças par a par"], "Construção vetorizada de matrizes de diferenças pareadas com broadcasting."),
          p("Associe o shape de entrada ao mecanismo de expansão do broadcasting:", [["(N, 1) com (1, N)","Expansão cruzada bidirecional gerando matriz de distâncias (N, N)"],["(N, 1) com (N,)","O segundo vetor alinha à direita (1, N) gerando matriz (N, N)"],["np.ogrid[0:5, 0:5]","Gera tupla de vetores abertos (5, 1) e (1, 5) com consumo mínimo"],["(M, N) com (1, N)","Vetor linha expande verticalmente operando em cada linha da matriz"]], "Padrões de pareamento e expansão de dimensões ortogonais em NumPy.")
        ]
      },
      {
        id: "py-np-5-4-erros-incompatibilidade",
        title: "Diagnóstico e erros de broadcasting incompatível",
        subtitle: "Depuração · Entendendo a mensagem ValueError: operands could not be broadcast",
        theory: "Quando dois arrays possuem dimensões alinhadas que não são iguais e nenhuma delas é igual a 1, o NumPy interrompe a execução com ValueError informando que os operandos não podem ser combinados por broadcasting. Diagnosticar esse erro exige inspecionar os shapes alinhados da direita para a esquerda e ajustar eixos.",
        questions: [
          q("O que significa a mensagem \"ValueError: operands could not be broadcast together with shapes (3, 4) (3,)\"?", "O vetor (3,) alinha seu tamanho 3 com a última dimensão 4 da matriz; como 3 != 4 e 3 != 1, a operação falha", ["A memória RAM da máquina acabou","A biblioteca NumPy foi corrompida"], "Alinhar da direita para a esquerda confronta a dimensão 4 com 3, violando a regra de igualdade ou unidade."),
          q("Como corrigir o erro ao subtrair uma média calculada por linha de shape (3,) de uma matriz (3, 4)?", "Expandir a dimensão do vetor promovendo-o para shape (3, 1) com media[:, np.newaxis]", ["Inverter o sinal da matriz","Apagar a última coluna da matriz"], "Com shape (3, 1), a dimensão 1 expande para 4, alinhando perfeitamente com a matriz (3, 4)."),
          q("Qual atributo deve ser inspecionado imediatamente pelo programador ao se deparar com erro de broadcasting?", "O atributo .shape de cada um dos arrays participantes da operação aritmética", ["O nome das variáveis no script","A velocidade da conexão de rede"], "Confrontar visualmente as tuplas de shape revela instantaneamente o eixo conflitante."),
          q("Dois arrays com shapes (2, 3, 5) e (3, 1) podem ser operados por broadcasting?", "Sim; o segundo array alinha suas dimensões (3, 1) com os eixos finais (3, 5) da direita", ["Não, tensores 3D nunca operam com matrizes 2D","Apenas se os elementos forem inteiros"], "O alinhamento da direita resulta em (3=3) e (1 expande para 5), produzindo shape final (2, 3, 5)."),
          t("Qual exceção nativa do Python é disparada pelo NumPy quando regras de broadcasting são violadas?", ["ValueError"], "ValueError: operands could not be broadcast together.", "# ValueError de broadcasting"),
          g("Complete o ajuste de shape para subtrair médias de linhas (shape (N,)) de uma matriz (N, M):", ["mat - medias[:, np.newaxis]"], "Promover para (N, 1) compatibiliza com as M colunas da matriz.", "mat_centrada = ____"),
          o("Ordene os passos diagnósticos para resolver um erro de broadcasting em NumPy:", ["Ler a mensagem de erro identificando as duas tuplas de shape informadas pelo NumPy","Escrever os shapes um sobre o outro alinhando as dimensões estritamente pela direita","Localizar o primeiro par de dimensões onde os números discordam e nenhum é 1","Inserir np.newaxis ou aplicar .reshape() para introduzir o eixo unitário necessário"], "Roteiro sistemático de depuração e correção de incompatibilidade dimensional."),
          p("Associe o par de shapes conflitante à sua causa de erro:", [["(3, 4) e (3,)","Vetor 3 alinha com coluna 4 na direita gerando conflito (3 != 4)"],["(5, 2) e (5, 3)","Segunda dimensão conflitante onde 2 e 3 discordam sem unidade"],["(10, 4) e (4, 10)","Tentativa de operar sem transpor uma das matrizes retangulares"],["(8,) e (6,)","Vetores 1D de comprimentos distintos impossíveis de alinhar"]], "Anatomia de erros clássicos de broadcasting e diagnóstico dimensional.")
        ]
      },
      {
        id: "py-np-5-5-economia-memoria",
        title: "Desempenho e economia de memória com broadcasting",
        subtitle: "Eficiência · Processamento veloz sem matrizes intermediárias redundantes",
        theory: "O broadcasting não apenas simplifica o código: evita alocar matrizes temporárias redundantes na RAM. Ao operar com passos virtuais (strides = 0), a CPU lê repetidamente o mesmo valor a partir de registradores rápidos de hardware, atingindo velocidades próximas ao limite de largura de banda da memória física do sistema.",
        questions: [
          q("Qual é a vantagem de usar broadcasting em vez de replicar manualmente linhas com np.tile ou np.repeat?", "Economiza gigabytes de memória RAM e elimina o custo computacional de copiar dados redundantes", ["Gera gráficos com maior resolução","Dispensa a necessidade de compilar código em C"], "np.tile aloca memória física duplicando dados; broadcasting atinge o mesmo cálculo sem alocar nada."),
          q("Como o NumPy consegue aplicar broadcasting sem duplicar fisicamente os elementos na memória?", "Configura o passo (stride) da dimensão unitária para zero bytes, relendo o mesmo endereço de memória", ["Comprimindo os dados com gzip em tempo real","Usando computação em nuvem invisível"], "Stride zero significa que avançar no índice daquele eixo não desloca o ponteiro na memória física."),
          q("Qual métrica de hardware é maximizada ao evitar alocações intermediárias através de broadcasting?", "A eficiência da hierarquia de cache de memória da CPU (L1, L2, L3) e largura de banda do barramento", ["A velocidade de rotação do cooler","A quantidade de portas USB"], "Manter o volume de dados pequeno permite que os arrays caibam inteiramente nos caches rápidos da CPU."),
          q("O que a função np.broadcast_to(arr, novo_shape) faz com um array?", "Retorna uma visão com o novo shape expandido sem alocar memória adicional (usando stride zero)", ["Aloca uma cópia gigantesca no disco","Apaga os elementos repetidos"], "np.broadcast_to projeta o array em uma geometria maior como visão pura somente leitura."),
          t("Qual atributo interno de um array informa o salto em bytes necessário para avançar uma posição em cada dimensão?", ["strides"], "arr.strides contém a contagem de bytes saltados em cada eixo.", "# arr.strides"),
          g("Complete a criação de uma visão expandida de shape (1000, 50) a partir de um vetor de shape (50,):", ["np.broadcast_to(vetor, (1000, 50))"], "np.broadcast_to projeta shapes com stride zero sem gastar RAM.", "visao_expandida = ____"),
          o("Ordene as abordagens de normalização de dados por eficiência de memória e desempenho:", ["Loop for nativo em Python puro iterando elemento por elemento (pior eficiência)","Duplicação manual com np.tile alocando matrizes redundantes na RAM (intermediário)","Operação vetorizada com broadcasting nativo de strides zero (alta eficiência)","Broadcasting in-place com parâmetro out= reutilizando buffer prévio (máxima eficiência)"], "Escalada de maturidade e otimização de memória em computação científica."),
          p("Associe a técnica de manipulação ao seu comportamento de alocação de recursos:", [["np.tile(arr, reps)","Alocação física pesada duplicando arrays na memória RAM"],["Broadcasting nativo","Expansão virtual instantânea de eixos com strides iguais a zero"],["np.broadcast_to","Criação explícita de visão expandida somente leitura sem cópia física"],["Stride zero","Ponteiro de memória que permanece imóvel ao avançar no eixo unitário"]], "Mecanismos de baixo nível e economia de memória em operações vetoriais.")
        ]
      }
    ],
    6: [
      {
        id: "py-np-6-1-conceito-eixo-axis",
        title: "O conceito de eixo (axis 0, 1 e -1) em reduções",
        subtitle: "Direção · O colapso dimensional ao longo de linhas e colunas",
        theory: "O parâmetro axis define a direção ao longo da qual uma operação de agregação é calculada. Em matrizes 2D, axis=0 colapsa as linhas calculando estatísticas por coluna; axis=1 colapsa as colunas calculando estatísticas por linha. O índice negativo axis=-1 aponta para o último eixo da estrutura.",
        questions: [
          q("Qual dimensão é colapsada quando executamos mat.sum(axis=0) sobre uma matriz 2D de shape (4, 5)?", "O eixo 0 (linhas) é colapsado, resultando em um vetor de shape (5,) com a soma de cada coluna", ["O eixo 1 (colunas) é colapsado","A matriz é zerada"], "A agregação ao longo de axis=0 \"esmaga\" as linhas, deixando um valor agregado para cada coluna."),
          q("O que a chamada mat.mean(axis=1) retorna sobre uma matriz bidimensional de alunos e notas (30, 4)?", "Um vetor de shape (30,) contendo a nota média de cada um dos 30 alunos (médias por linha)", ["A média de cada uma das 4 provas","Um único número escalar global"], "Colapsar o eixo 1 (provas) resume as 4 colunas em um único valor médio para cada aluno."),
          q("O que acontece se chamarmos mat.sum() sem especificar o parâmetro axis?", "Calcula a soma agregada de absolutamente todos os elementos da matriz, retornando um único escalar", ["Lança uma exceção TypeError","Calcula a soma apenas da diagonal"], "Sem axis declarado, a redução achata (flattens) o array e calcula a agregação global."),
          q("O que o valor axis=-1 expressa genericamente em qualquer tensor multidimensional?", "A redução ao longo do último eixo da estrutura, independentemente de quantas dimensões existam", ["A exclusão do primeiro eixo","Uma direção invertida na memória"], "axis=-1 é a forma idiomática de atingir a dimensão mais interna (ex: canais de cor ou features)."),
          t("Qual parâmetro nomeado das funções de agregação do NumPy especifica a dimensão a ser colapsada?", ["axis"], "O argumento axis dita o eixo ao longo do qual a operação atua.", "# arr.sum(axis=0)"),
          g("Complete o cálculo da média por coluna em uma matriz bidimensional mat:", ["mat.mean(axis=0)"], "axis=0 calcula a redução vertical coluna a coluna.", "medias_colunas = ____"),
          o("Ordene os resultados de agregação de uma matriz (100, 10) pelo formato do retorno:", ["mat.sum() sem axis -> escalar único com shape () contendo a soma total","mat.mean(axis=0) -> vetor de médias com shape (10,) representando cada coluna","mat.std(axis=1) -> vetor de desvios com shape (100,) representando cada linha","mat.sum(axis=1, keepdims=True) -> matriz bidimensional preservada com shape (100, 1)"], "Comportamento dimensional e dimensionalidade resultante sob diferentes parâmetros de agregação."),
          p("Associe a chamada de agregação ao seu significado geométrico em matrizes 2D:", [["mat.sum(axis=0)","Redução vertical colapsando linhas e produzindo totais por coluna"],["mat.sum(axis=1)","Redução horizontal colapsando colunas e produzindo totais por linha"],["mat.sum()","Redução global totalizante colapsando todos os eixos em um escalar"],["mat.sum(axis=-1)","Redução sobre a última dimensão da geometria multidimensional"]], "Direcionalidade e semântica de eixos em operações de redução do NumPy.")
        ]
      },
      {
        id: "py-np-6-2-metricas-reducao",
        title: "Métricas de redução: sum, mean, std, var e prod",
        subtitle: "Estatísticas · Computação vetorial agregada com alta precisão numérica",
        theory: "NumPy fornece funções de redução compiladas em C que operam sobre eixos de ndarrays: np.sum para somas, np.mean para médias aritméticas, np.std e np.var para desvios e variâncias, e np.prod para produtórios. O parâmetro ddof=1 ajusta os graus de liberdade para desvios amostrais não enviesados.",
        questions: [
          q("Qual é a diferença fundamental entre np.std(dados) padrão do NumPy e statistics.stdev() do Python?", "O NumPy adota por padrão ddof=0 (amostra populacional), enquanto stdev() usa ddof=1 (amostra não enviesada)", ["O NumPy calcula a mediana em vez do desvio","NumPy não aceita números decimais"], "Para calcular o desvio padrão amostral clássico com n - 1 no NumPy, deve-se declarar ddof=1."),
          q("O que o parâmetro ddof (delta degrees of freedom) controla no cálculo de variâncias e desvios no NumPy?", "O divisor utilizado: o cálculo divide por (N - ddof), permitindo alternar entre N e N - 1", ["O número de casas decimais do resultado","A quantidade de threads da CPU"], "ddof=0 divide por N (populacional); ddof=1 divide por N - 1 (amostral com correção de Bessel)."),
          q("Por que somar milhões de números de ponto flutuante com np.sum é mais preciso que a função sum() nativa?", "NumPy utiliza algoritmos de acumulação pareada (pairwise summation) que minimizam perdas de precisão", ["Porque o NumPy arredonda todos os números para inteiros","Porque a função nativa ignora decimais"], "A soma pareada soma números de magnitudes semelhantes, reduzindo o erro de cancelamento catastrófico."),
          q("Qual função de agregação calcula o produto acumulado de todos os elementos ao longo de um eixo?", "np.prod()", ["np.multiply()","np.fact()"], "np.prod multiplica todos os elementos ao longo do eixo especificado."),
          t("Qual parâmetro das funções np.std e np.var define a correção de graus de liberdade amostrais?", ["ddof"], "ddof=1 aplica a correção de Bessel dividindo por n - 1.", "# np.std(arr, ddof=1)"),
          g("Complete o cálculo do desvio padrão amostral (divisor n - 1) de um conjunto de dados:", ["np.std(dados, ddof=1)"], "ddof=1 calcula o desvio padrão amostral não enviesado.", "desvio_amostral = ____"),
          o("Ordene as operações estatísticas do cálculo da variância amostral executadas por np.var(dados, ddof=1):", ["Calcular a média aritmética dos elementos ao longo do eixo com np.mean()","Subtrair a média de cada elemento elevando a diferença individual ao quadrado","Somar todas as diferenças quadráticas com algoritmo de acumulação precisa","Dividir a soma quadrática por N - ddof (onde ddof=1 na estimativa amostral)"], "Fluxo algorítmico do cálculo de variância com graus de liberdade ajustados."),
          p("Associe a função de agregação à métrica calculada:", [["np.mean(arr)","Média aritmética simples dos elementos ao longo do eixo"],["np.std(arr, ddof=1)","Desvio padrão amostral com correção de Bessel (graus de liberdade n - 1)"],["np.var(arr, ddof=0)","Variância populacional dividida pelo tamanho total N"],["np.prod(arr)","Produtório multiplicativo de todos os elementos avaliados"]], "Funções estatísticas essenciais de redução numérica no NumPy.")
        ]
      },
      {
        id: "py-np-6-3-argmin-argmax",
        title: "Localização de extremos: min, max, argmin e argmax",
        subtitle: "Extremos · Encontrando magnitudes e os índices de suas ocorrências",
        theory: "Enquanto .min() e .max() retornam a magnitude dos valores extremos de um array, .argmin() e .argmax() retornam os índices (posições) onde ocorrem os valores mínimo e máximo. Em arrays multidimensionais com axis especificado, retornam vetores com os índices dos extremos ao longo daquele eixo.",
        questions: [
          q("O que o método arr.argmax() retorna quando executado sobre um array?", "O índice da posição onde ocorre o valor máximo (ou o primeiro índice em caso de empate)", ["O valor numérico do maior elemento","A quantidade de elementos positivos"], "argmax devolve a coordenada inteira do índice do maior elemento encontrado no contêiner."),
          q("Qual é a utilidade central de argmax em tarefas de aprendizado de máquina e classificação?", "Identificar a classe predita pelo modelo selecionando o índice de maior probabilidade na saída softmax", ["Calcular o erro quadrático médio","Treinar os pesos da rede neural"], "A classe vencedora em redes neurais corresponde ao índice de maior ativação via argmax."),
          q("O que mat.argmin(axis=0) retorna a partir de uma matriz bidimensional?", "Um vetor contendo o índice da linha de menor valor para cada uma das colunas da matriz", ["O menor número da matriz inteira","O índice da coluna de menor valor"], "Para cada coluna, argmin identifica a linha onde se encontra o valor mínimo local."),
          q("O que a função np.unravel_index(indice_plano, shape) faz com o índice retornado por argmax sem axis?", "Converte o índice linear unidimensional na tupla de coordenadas multidimensionais correspondente", ["Apaga o elemento da matriz","Multiplica o índice pelo shape"], "argmax global retorna um índice linear (0 a N-1); unravel_index mapeia em (linha, coluna)."),
          t("Qual método do ndarray retorna o índice do menor elemento presente no array?", ["argmin",".argmin()"], "arr.argmin() localiza a posição inteira do menor valor.", "# arr.argmin()"),
          g("Complete a identificação da classe predita com maior probabilidade em vetor de logits:", ["np.argmax(probabilidades)"], "np.argmax seleciona a classe de maior probabilidade.", "classe_predita = ____"),
          o("Ordene as etapas para localizar o elemento máximo de uma matriz 2D e suas coordenadas (linha, coluna):", ["Executar argmax global mat.argmax() obtendo o índice linear plano do maior valor","Consultar o formato dimensional da matriz original através de mat.shape","Chamar np.unravel_index(idx_plano, mat.shape) obtendo a tupla de coordenadas","Acessar o valor do elemento no ponto localizado confirmando mat[linha, coluna] == mat.max()"], "Procedimento de mapeamento de índices lineares em coordenadas multidimensionais."),
          p("Associe a função ao tipo de informação retornada:", [["arr.max()","Magnitude numérica do maior valor contido no conjunto"],["arr.argmax()","Índice de posição inteira onde reside o maior valor"],["arr.min(axis=1)","Vetor com os valores mínimos apurados em cada uma das linhas"],["np.unravel_index(idx, shape)","Conversão de índice plano linear em coordenadas cartesianas"]], "Rotinas de consulta e localização de extremos numéricos no NumPy.")
        ]
      },
      {
        id: "py-np-6-4-keepdims-preservacao",
        title: "Preservação de dimensionalidade com keepdims=True",
        subtitle: "Broadcasting · Mantendo eixos unitários após reduções para alinhamento",
        theory: "Por padrão, operações de redução eliminam o eixo sobre o qual foram computadas, reduzindo a dimensionalidade .ndim do array. O parâmetro keepdims=True preserva a quantidade original de eixos, deixando o eixo reduzido com comprimento 1, o que viabiliza operações imediatas de broadcasting sem reshape.",
        questions: [
          q("O que acontece com o shape de uma matriz (10, 5) ao executar mat.mean(axis=1) sem keepdims?", "O eixo 1 é eliminado e o shape resultante passa a ser um vetor 1D com shape (10,)", ["O shape permanece (10, 5)","O shape vira (1, 1)"], "Por padrão, reduções descartam a dimensão agregada, encolhendo o número de eixos .ndim em 1."),
          q("Qual é o shape retornado por mat.mean(axis=1, keepdims=True) para uma matriz de shape (10, 5)?", "Uma matriz bidimensional com shape (10, 1), preservando os dois eixos originais", ["Um vetor unidimensional (10,)","Um escalar ()"], "O eixo reduzido é mantido com dimensão unitária 1, mantendo ndim = 2."),
          q("Por que usar keepdims=True é fundamental ao subtrair a média por linha da matriz original: mat - mat.mean(axis=1)?", "Permite que o broadcasting alinhe automaticamente (10, 5) com (10, 1) sem erros de dimensão", ["Para que o Python não arredonde os números","Porque o NumPy proíbe subtrair vetores 1D"], "Com shape (10, 1), o eixo unitário expande para 5, viabilizando a subtração direta em cada linha."),
          q("Qual operação manual seria necessária caso keepdims=True não estivesse disponível?", "Adicionar o eixo unitário manualmente via media[:, np.newaxis] ou media.reshape(-1, 1)", ["Duplicar a matriz com laços for","Converter tudo para listas nativas"], "keepdims poupa código defensivo e elimina a necessidade de manipular eixos manualmente."),
          t("Qual parâmetro booleano de funções de agregação mantém eixos reduzidos com tamanho unitário?", ["keepdims"], "keepdims=True preserva a dimensionalidade original após reduções.", "# arr.sum(axis=1, keepdims=True)"),
          g("Complete a normalização de matriz subtraindo a média de cada coluna com keepdims:", ["mat - mat.mean(axis=0, keepdims=True)"], "keepdims=True mantém shape (1, C) alinhando com (L, C).", "mat_centrada = ____"),
          o("Ordene as etapas da centralização de linhas de uma matriz com keepdims=True:", ["Identificar a matriz original de dados numéricos com shape inicial (L, C)","Calcular a média ao longo das colunas com mat.mean(axis=1, keepdims=True) gerando shape (L, 1)","Subtrair a matriz de médias da matriz original aproveitando o broadcasting automático","Obter a matriz final de dados centralizados preservando o shape original (L, C)"], "Fluxo elegante de normalização por linha com preservação de eixos dimensionais."),
          p("Associe a assinatura de agregação ao shape resultante para matriz (4, 6):", [["mat.sum(axis=0)","Vetor 1D com shape (6,) sem preservação dimensional"],["mat.sum(axis=0, keepdims=True)","Matriz 2D com shape (1, 6) com eixo unitário preservado"],["mat.mean(axis=1)","Vetor 1D com shape (4,) colapsando as colunas"],["mat.mean(axis=1, keepdims=True)","Matriz 2D com shape (4, 1) pronta para broadcasting horizontal"]], "Comparação de geometrias de saída com e sem o parâmetro keepdims.")
        ]
      },
      {
        id: "py-np-6-5-cumsum-cumprod",
        title: "Funções cumulativas: cumsum, cumprod e diff",
        subtitle: "Séries · Acumulando somas, produtos e calculando diferenças discretas",
        theory: "Funções cumulativas transformam sequências computando totais progressivos preservando o shape do array. np.cumsum calcula somas acumuladas ao longo de um eixo; np.cumprod calcula produtos acumulados; e np.diff computa a derivada discreta (diferença entre elementos adjacentes x[i+1] - x[i]).",
        questions: [
          q("O que a instrução np.cumsum(np.array([1, 2, 3, 4])) produz como resultado?", "Um novo array com as somas acumuladas parciais: [1, 3, 6, 10]", ["A soma total escalar igual a 10","A média dos elementos [2.5]"], "Cada posição recebe a soma de todos os elementos anteriores até o índice atual inclusive."),
          q("Qual é a aplicação comum de np.cumsum em séries temporais financeiras?", "Calcular o saldo acumulado diário a partir de uma série de fluxos de caixa pontuais", ["Estimar a inflação dos próximos dez anos","Inverter a ordem cronológica"], "Somar cumulativamente receitas e despesas gera a curva de evolução patrimonial líquida."),
          q("O que a função np.diff(np.array([10, 15, 25, 40])) calcula?", "A diferença discreta entre elementos adjacentes: [15-10, 25-15, 40-25] = [5, 10, 15]", ["A soma de todos os números","A média ponderada da lista"], "np.diff calcula x[i+1] - x[i], retornando um array cujo comprimento é n - 1."),
          q("Qual é o tamanho do array resultante de np.diff(arr) aplicado a um vetor 1D de tamanho N?", "N - 1 elementos, pois não há elemento posterior para subtrair do último item", ["N elementos com zero no final","N + 1 elementos"], "A primeira diferença discreta consome um grau de liberdade dimensional na fronteira."),
          t("Qual função do NumPy calcula a soma cumulativa progressiva ao longo de um eixo?", ["cumsum","np.cumsum"], "np.cumsum gera a sequência de somas parciais acumuladas.", "# np.cumsum(arr)"),
          g("Complete o cálculo da variação diária discreta entre preços consecutivos de fechamento:", ["np.diff(precos)"], "np.diff calcula a diferença entre dias consecutivos.", "variacoes = ____"),
          o("Ordene a evolução dos valores na aplicação de np.cumsum sobre a sequência [2, 4, 6, 8]:", ["Primeiro elemento acumulado: 2","Segundo elemento acumulado: 2 + 4 = 6","Terceiro elemento acumulado: 6 + 6 = 12","Quarto elemento acumulado: 12 + 8 = 20"], "Passo a passo da acumulação progressiva linear com np.cumsum."),
          p("Associe a função analítica cumulativa à sua operação matemática:", [["np.cumsum(arr)","Soma acumulada progressiva onde y[k] = sum(x[0...k])"],["np.cumprod(arr)","Produto acumulado progressivo onde y[k] = prod(x[0...k])"],["np.diff(arr)","Primeira diferença discreta adjacente onde y[k] = x[k+1] - x[k]"],["np.cumsum(arr, axis=0)","Soma acumulada vertical ao longo das linhas mantendo colunas"]], "Operações cumulativas e diferenciais para modelagem de séries no NumPy.")
        ]
      }
    ],
    7: [
      {
        id: "py-np-7-1-produto-escalar-arroba",
        title: "Produto escalar (dot product) e o operador @",
        subtitle: "Álgebra · Da soma de produtos de vetores à contração de tensores",
        theory: "O produto escalar entre dois vetores calcula a soma dos produtos de seus elementos correspondentes, resultando em um escalar. No Python 3.5+, o operador infixo @ executa multiplicação matricial e produto escalar, sendo sinônimo elegante da função np.dot() e método .dot().",
        questions: [
          q("O que o operador @ executa entre dois vetores unidimensionais a e b no NumPy?", "Calcula o produto escalar (dot product) somando os produtos elemento a elemento", ["Calcula a divisão elemento a elemento","Concatena os dois vetores em uma lista"], "Para vetores 1D, a @ b computa sum(a * b), resultando em um valor escalar."),
          q("Qual é o resultado do produto escalar entre os vetores [1, 2] e [3, 4]?", "O valor escalar 11, pois (1*3) + (2*4) = 3 + 8 = 11", ["O vetor [3, 8]","O escalar 24"], "O produto escalar multiplica elementos correspondentes e soma os termos resultantes."),
          q("O que significa o produto escalar de dois vetores não nulos ser exatamente igual a zero?", "Os vetores são ortogonais (perpendiculares) entre si no espaço vetorial", ["Os vetores são paralelos e idênticos","Os vetores possuem números complexos"], "Dois vetores a e b com a @ b == 0 formam um ângulo de 90 graus entre si."),
          q("Qual função histórica do NumPy é equivalente ao operador infixo @?", "np.dot() ou np.matmul()", ["np.cross()","np.outer()"], "O operador @ foi adicionado na PEP 465 para simplificar a sintaxe de álgebra linear."),
          t("Qual símbolo de caractere único atua como o operador infixo de multiplicação matricial em Python?", ["@"], "O caractere arroba @ é o operador de multiplicação matricial e dot product.", "# matriz_a @ matriz_b"),
          g("Complete o cálculo do produto escalar entre os vetores u e v usando o operador @:", ["u @ v"], "O operador @ realiza a contração linear dos vetores.", "resultado_escalar = ____"),
          o("Ordene as etapas do cálculo do produto escalar entre dois vetores de tamanho N:", ["Multiplicar elemento a elemento a[i] * b[i] gerando os produtos pareados","Acumular a soma de todos os N produtos individuais gerados","Aplicar redução numérica com alta precisão evitando perda por cancelamento","Retornar o valor escalar final representando a projeção euclidiana"], "Fluxo matemático do produto escalar euclidiano entre vetores."),
          p("Associe a operação vetorial à sua respectiva expressão sintática:", [["a @ b","Operador infixo para produto escalar de vetores ou produto matricial"],["np.dot(a, b)","Função de biblioteca clássica para dot product e contração de eixos"],["a * b","Multiplicação de Hadamard puramente elementwise sem acumulação"],["np.inner(a, b)","Produto interno padrão de espaços vetoriais reais"]], "Diferenciação de operadores de produto em computação científica com NumPy.")
        ]
      },
      {
        id: "py-np-7-2-multiplicacao-matrizes",
        title: "Multiplicação de matrizes e compatibilidade",
        subtitle: "Matrizes · Linhas por colunas e a exigência de dimensões internas iguais",
        theory: "A multiplicação matricial de A (M x K) por B (K x N) exige que a dimensão interna K seja idêntica em ambas as matrizes. Cada elemento da matriz de saída C (M x N) é o produto escalar da linha i de A pela coluna j de B, diferindo completamente da multiplicação elementwise com *.",
        questions: [
          q("Qual é a condição estrita para que duas matrizes A e B possam ser multiplicadas matricialmente (A @ B)?", "O número de colunas da primeira matriz A deve ser rigorosamente igual ao número de linhas da segunda matriz B", ["Ambas as matrizes devem ter o mesmo número de linhas","Ambas devem ser matrizes quadradas"], "As dimensões internas devem casar: (M, K) multiplicado por (K, N) gera matriz resultante (M, N)."),
          q("Qual é a forma (shape) da matriz resultante da multiplicação de A (5, 3) por B (3, 7)?", "A matriz resultante C terá shape exatamente (5, 7)", ["(3, 3)","(5, 3)"], "As dimensões externas (5 e 7) determinam as linhas e colunas do resultado C."),
          q("Qual é a diferença entre a multiplicação elementwise A * B e a multiplicação matricial A @ B?", "A * B multiplica elementos na mesma posição; A @ B calcula o produto linha por coluna", ["A * B só funciona em inteiros","Não há diferença conceitual"], "A * B é o produto de Hadamard (exige shapes iguais ou broadcasting); A @ B é a álgebra linear."),
          q("A multiplicação matricial A @ B é comutativa (ou seja, A @ B é sempre igual a B @ A)?", "Não, a multiplicação matricial não é comutativa; em geral, A @ B != B @ A", ["Sim, a ordem dos fatores nunca altera o produto","Apenas para matrizes de números primos"], "Além de gerar resultados distintos, trocar a ordem frequentemente torna a operação dimensionalmente impossível."),
          t("Como se denomina a multiplicação elemento a elemento de matrizes diferindo da matricial?", ["hadamard","produto de hadamard"], "O produto de Hadamard multiplica posições coincidentes sem soma cruzada.", "# produto elementwise"),
          g("Complete a multiplicação de uma matriz de características X (N, D) por pesos W (D, K):", ["X @ W"], "O operador @ contrai a dimensão D gerando previsões de shape (N, K).", "projecao = ____"),
          o("Ordene as etapas para calcular o elemento C[i, j] da multiplicação matricial C = A @ B:", ["Extrair a linha de índice i da primeira matriz A como vetor de comprimento K","Extrair a coluna de índice j da segunda matriz B como vetor de comprimento K","Calcular o produto escalar entre o vetor linha extraído e o vetor coluna","Armazenar o escalar resultante na posição C[i, j] da matriz de saída"], "Mecanismo canônico de computação da multiplicação matricial linha por coluna."),
          p("Associe o par de dimensões à viabilidade de multiplicação matricial A @ B:", [["(10, 4) @ (4, 2)","Válida gerando matriz de saída com shape (10, 2)"],["(3, 5) @ (3, 5)","Inválida gerando ValueError (dimensões internas 5 e 3 discordam)"],["(5, 5) @ (5, 5)","Válida entre matrizes quadradas gerando matriz (5, 5)"],["(1, N) @ (N, 1)","Válida entre vetor linha e vetor coluna gerando escalar 1x1"]], "Análise dimensional e verificação de compatibilidade matricial.")
        ]
      },
      {
        id: "py-np-7-3-transposicao-swapaxes",
        title: "Transposição de matrizes (.T) e permutações de eixos",
        subtitle: "Geometria · Trocando linhas por colunas sem custo de memória",
        theory: "A transposição inverte os eixos de uma matriz, transformando linhas em colunas e colunas em linhas. No NumPy, o atributo arr.T e a função np.transpose() invertem os eixos instantaneamente como visão (view), alterando apenas a ordem dos strides sem movimentar bytes físicos na memória.",
        questions: [
          q("O que o atributo mat.T faz com uma matriz bidimensional de shape (3, 5)?", "Retorna a matriz transposta com shape (5, 3), onde as linhas viraram colunas", ["Apaga a última linha da matriz","Inverte o sinal de todos os números"], "A transposição espelha a matriz sobre sua diagonal principal, invertendo as dimensões."),
          q("A operação de transposição mat.T copia fisicamente os dados na memória RAM?", "Não, mat.T retorna uma visão (view) instantânea alterando apenas os metadados de strides", ["Sim, aloca o dobro da memória original","Apenas se a matriz for quadrada"], "Inverter a ordem dos strides e do shape permite ler colunas como linhas com custo computacional O(1)."),
          q("O que o atributo .T faz quando aplicado a um vetor unidimensional de shape (N,)?", "Não altera nada; o vetor continua com shape (N,), pois transposição exige ao menos duas dimensões", ["Converte em vetor coluna (N, 1)","Lança um erro de dimensionalidade"], "Vetores 1D têm apenas um eixo; para torná-los vetores coluna deve-se usar newaxis ou reshape."),
          q("Qual função permite reordenar eixos de tensores multidimensionais em qualquer sequência arbitrária?", "np.transpose(tensor, axes=(2, 0, 1)) ou tensor.transpose(...)", ["np.rotate()","np.shift_axes()"], "np.transpose com tupla de eixos permuta as dimensões de tensores em modelos de visão computacional."),
          t("Qual atributo abreviado de uma letra do ndarray retorna a matriz transposta?", ["T",".T"], "arr.T é o atalho canônico para transposição matricial no NumPy.", "# arr.T"),
          g("Complete a transposição de uma matriz para compatibilizá-la na multiplicação X @ W.T:", ["X @ W.T"], "W.T inverte linhas e colunas alinhando para produto matricial.", "saida = ____"),
          o("Ordene as propriedades geométricas da transposição de matrizes na álgebra linear:", ["Transpor duas vezes (A.T).T reconduz rigorosamente à matriz original A","A transposta da soma (A + B).T equivale à soma das transpostas A.T + B.T","A transposta do produto (A @ B).T inverte a ordem dos fatores: B.T @ A.T","A transposta de uma matriz simétrica é idêntica à própria matriz: A.T == A"], "Propriedades matemáticas fundamentais da transposição de operadores lineares."),
          p("Associe a operação geométrica ao seu efeito na estrutura dimensional:", [["mat.T","Transposição bidimensional invertendo linhas e colunas instantaneamente"],["np.swapaxes(arr, 0, 2)","Troca de posição entre dois eixos específicos em um tensor"],["np.transpose(arr, perm)","Permutação arbitrária de todos os eixos de um contêiner multidimensional"],["vetor.reshape(-1, 1)","Promoção de vetor 1D para matriz coluna bidimensional formal"]], "Operações de transformação geométrica e rotação de eixos no NumPy.")
        ]
      },
      {
        id: "py-np-7-4-determinantes-inversas",
        title: "Determinantes e matrizes inversas com np.linalg",
        subtitle: "Inversão · Verificando invertibilidade e estabilidade com álgebra linear",
        theory: "O submódulo np.linalg provê rotinas de álgebra linear para matrizes quadradas. O determinante (np.linalg.det) mede o fator de escala de volume; se for nulo, a matriz é singular e não possui inversa (np.linalg.inv). Em problemas numéricos reais, matrizes mal condicionadas exigem cautela com ruídos de precisão.",
        questions: [
          q("O que indica um determinante rigorosamente igual a zero (det = 0) em uma matriz quadrada?", "A matriz é singular e não admite matriz inversa, pois suas linhas são linearmente dependentes", ["A matriz possui apenas números pares","A matriz tem determinante negativo"], "Determinante nulo significa que a transformação linear colapsa ao menos uma dimensão no espaço."),
          q("Qual função do submódulo np.linalg calcula a inversa de uma matriz quadrada invertível?", "np.linalg.inv(mat)", ["np.linalg.reverse()","np.linalg.det()"], "np.linalg.inv calcula a matriz A^(-1) tal que A @ A^(-1) produz a matriz identidade I."),
          q("Por que especialistas em computação científica desaconselham calcular a inversa explícita para resolver sistemas?", "Inverter matrizes explicitamente é numericamente instável e mais custoso do que decomposições (LU/Cholesky)", ["Porque a inversa apaga o disco rígido","Porque o NumPy não sabe calcular inversas"], "Resolver sistemas via np.linalg.solve é muito mais preciso, estável e rápido do que multiplicar por inv()."),
          q("O que afere o número de condição (np.linalg.cond) de uma matriz em análise numérica?", "A sensibilidade da solução do sistema a pequenas perturbações ou erros de arredondamento nos dados", ["A temperatura do computador durante a conta","O número de valores positivos"], "Números de condição astronômicos denunciam matrizes mal condicionadas propensas a erros catastróficos."),
          t("Qual submódulo do NumPy concentra funções de álgebra linear como inv, det e eig?", ["linalg","numpy.linalg"], "np.linalg reúne as rotinas de álgebra linear vetorial compiladas.", "# np.linalg"),
          g("Complete o cálculo do determinante de uma matriz quadrada usando np.linalg:", ["np.linalg.det(mat)"], "np.linalg.det computa o determinante escalar da matriz.", "determinante = ____"),
          o("Ordene as etapas para testar se uma matriz quadrada A é invertível com segurança numérica:", ["Verificar se a matriz é estritamente quadrada conferindo se shape[0] == shape[1]","Calcular o determinante ou inspecionar o número de condição com np.linalg.cond(A)","Confirmar que a matriz não é singular avaliando se |det| > limiar de tolerância","Computar a matriz inversa com np.linalg.inv(A) ou resolver o sistema diretamente"], "Protocolo de verificação de invertibilidade e sanidade numérica de matrizes."),
          p("Associe a função de np.linalg ao seu papel em álgebra linear:", [["np.linalg.det(A)","Cálculo do determinante escalar indicando singularidade da matriz"],["np.linalg.inv(A)","Cálculo da matriz inversa multiplicativa para matrizes não singulares"],["np.linalg.cond(A)","Cálculo do número de condição indicando estabilidade numérica"],["np.linalg.matrix_rank(A)","Cálculo do posto (número de linhas linearmente independentes)"]], "Ferramentas de diagnóstico e manipulação do submódulo np.linalg.")
        ]
      },
      {
        id: "py-np-7-5-sistemas-lineares",
        title: "Resolução de sistemas lineares e mínimos quadrados",
        subtitle: "Sistemas · Resolvendo Ax = b e ajustando regressões com np.linalg.solve",
        theory: "Sistemas lineares da forma Ax = b são resolvidos de forma eficiente com np.linalg.solve(A, b), que emprega fatoração LU e eliminação gaussiana. Quando o sistema é sobredeterminado (mais equações que incógnitas), np.linalg.lstsq encontra a solução de mínimos quadrados ordinários que minimiza o resíduo euclidiano.",
        questions: [
          q("Qual função do NumPy é a mais indicada para resolver o sistema linear quadrado exato Ax = b?", "np.linalg.solve(A, b)", ["np.linalg.inv(A) * b","np.solve_system()"], "np.linalg.solve é muito mais rápida e numericamente estável que a inversão matricial direta."),
          q("O que a função np.linalg.lstsq(X, y, rcond=None) calcula em problemas sobredeterminados?", "A solução de mínimos quadrados ordinários que minimiza a soma dos resíduos quadráticos ||y - Xb||²", ["O determinante de matrizes retangulares","O maior autovalor da matriz"], "lstsq resolve regressões lineares encontrando o vetor de coeficientes que melhor ajusta os dados."),
          q("Qual é a forma canônica dos resíduos quadráticos minimizados pelo método dos mínimos quadrados?", "A soma das distâncias verticais ao quadrado entre os valores observados e as predições do modelo", ["A média das diferenças absolutas","O produto dos erros"], "Minimizar a soma dos quadrados viabiliza a solução analítica elegante via equações normais."),
          q("O que acontece se chamarmos np.linalg.solve(A, b) passando uma matriz A singular?", "Lança uma exceção LinAlgError: Singular matrix", ["Retorna um vetor preenchido com zeros","Retorna None silenciosamente"], "Matrizes singulares não possuem solução única, disparando erro explícito na rotina LAPACK."),
          t("Qual função do NumPy resolve sistemas de regressão linear via mínimos quadrados?", ["lstsq","np.linalg.lstsq"], "np.linalg.lstsq computa a solução de mínimos quadrados de forma vetorizada.", "# np.linalg.lstsq(X, y)"),
          g("Complete a resolução exata do sistema linear Ax = b usando np.linalg.solve:", ["np.linalg.solve(A, b)"], "np.linalg.solve encontra o vetor x exato do sistema.", "solucao_x = ____"),
          o("Ordene as etapas para ajustar uma reta de regressão y = a*x + b usando np.linalg.lstsq:", ["Construir a matriz de projeto X empilhando o vetor x e uma coluna de uns com np.column_stack","Receber o vetor coluna de valores de resposta observados y","Executar np.linalg.lstsq(X, y, rcond=None) calculando os coeficientes ótimos","Extrair o coeficiente angular e o intercepto linear do vetor de coeficientes obtido"], "Lógica de formulação e resolução de regressão linear por mínimos quadrados no NumPy."),
          p("Associe a rotina de np.linalg ao problema matemático resolvido:", [["np.linalg.solve(A, b)","Resolução exata e estável de sistemas lineares quadrados"],["np.linalg.lstsq(X, y)","Ajuste de mínimos quadrados ordinários para sistemas retangulares"],["np.linalg.eig(A)","Cálculo de autovalores e autovetores de matrizes quadradas"],["np.linalg.norm(v)","Cálculo da norma euclidiana (comprimento vetorial L2)"]], "Aplicações avançadas de álgebra computacional em ciência de dados com NumPy.")
        ]
      }
    ],
    8: [
      {
        id: "py-np-8-1-vetorizacao-desempenho",
        title: "Vetorização versus laços for em Python puro",
        subtitle: "Performance · Comparando a velocidade de instruções C com o interpretador",
        theory: "A vetorização substitui laços explícitos em Python por operações em lote delegadas ao motor em C do NumPy. Enquanto loops interpretados sofrem com verificação dinâmica de tipos e overhead de bytecode a cada iteração, operações vetorizadas processam blocos contínuos na velocidade do hardware.",
        questions: [
          q("Por que operações vetorizadas no NumPy chegam a ser centenas de vezes mais rápidas que laços for em Python?", "Eliminam o overhead do interpretador dinâmico, rodando loops compilados em C com instruções SIMD", ["Porque usam processadores quânticos","Porque não realizam verificações matemáticas"], "Em Python puro, cada iteração checa tipos e busca métodos; em C, o laço roda em código de máquina."),
          q("O que caracteriza o código escrito em estilo vetorizado?", "Expressar operações diretamente sobre arrays inteiros sem escrever estruturas for ou while explícitas", ["Usar exclusivamente letras maiúsculas","Escrever código em arquivos binários"], "a + b soma milhões de elementos de uma vez com sintaxe limpa e desempenho máximo."),
          q("Qual ferramenta mágica do Jupyter mede com precisão estatística o tempo de execução de expressões?", "%timeit", ["%debug","%save"], "%timeit roda a instrução múltiplas vezes, descartando outliers e calculando média e desvio de tempo."),
          q("Quando um laço for em Python puro ainda é aceitável em fluxos de trabalho com NumPy?", "Apenas no controle externo de alto nível (ex: iterar sobre 5 épocas de treino ou 3 arquivos)", ["Nunca, laços são proibidos por lei","Em cálculos matemáticos pesados"], "Laços externos que executam poucas iterações não causam impacto mensurável na latência total."),
          t("Qual comando mágico do IPython/Jupyter realiza medições automatizadas de benchmarking de código?", ["%timeit","timeit"], "%timeit executa repetições calibradas para medir tempo de CPU.", "# %timeit arr * 2"),
          g("Complete a soma vetorizada direta de dois arrays substituindo um laço for tradicional:", ["arr_a + arr_b"], "A soma com operador + executa em código compilado vetorizado.", "resultado = ____"),
          o("Ordene as abordagens de processamento de dados por velocidade crescente de execução:", ["Laço for em Python puro concatenando listas nativas dinâmicas (mais lento)","List comprehension em Python puro operando sobre dados nativos","Laço for em Python iterando sobre elementos individuais de um ndarray","Operação vetorizada nativa em C do NumPy com paralelismo SIMD (mais veloz)"], "Comparativo de desempenho entre modelos de iteração em computação numérica."),
          p("Associe a abordagem de computação ao seu gargalo característico:", [["Loop em Python puro","Overhead de despacho dinâmico e checagem de tipos a cada iteração"],["Operação vetorizada NumPy","Execução em código nativo de máquina com eficiência próxima ao hardware"],["Laço for sobre ndarray","Pior combinação possível: overhead de boxing e extração contínua"],["%timeit","Benchmark com dezenas de repetições automáticas para aferição de latência"]], "Conceitos fundamentais de vetorização e análise de desempenho em Python.")
        ]
      },
      {
        id: "py-np-8-2-localidade-cache-cpu",
        title: "Localidade espacial e cache de memória da CPU",
        subtitle: "Hardware · O impacto da arquitetura de cache L1, L2 e L3 na velocidade",
        theory: "Processadores modernos dependem de hierarquias de cache ultrarrápidas (L1, L2, L3) para superar a latência lenta da memória RAM. Acessar dados em sequência contígua favorece a localidade espacial: quando a CPU busca um byte, ela pré-carrega toda a linha de cache (64 bytes) adjacente.",
        questions: [
          q("O que afirma o princípio da localidade espacial no acesso à memória do computador?", "Se um endereço de memória foi acessado, endereços fisicamente vizinhos serão acessados em breve", ["Todos os dados ocupam o mesmo espaço físico","A memória só funciona em linha reta"], "Softwares com alta localidade espacial aproveitam as linhas de cache pré-carregadas pelo hardware."),
          q("Por que percorrer uma matriz C-order por colunas (saltando linhas) é dramaticamente mais lento?", "Provoca constantes falhas de cache (cache misses), forçando a CPU a esperar dados da lenta memória RAM", ["Porque o computador não entende números verticais","Porque o NumPy trava com colunas"], "Saltar distâncias maiores que a linha de cache (64 bytes) anula o benefício do prefetcher da CPU."),
          q("O que acontece durante um \"Cache Miss\" na execução de um algoritmo numérico?", "A CPU paralisa temporariamente sua execução aguardando a chegada dos dados da memória principal", ["O computador desliga imediatamente","Os dados são apagados do cache"], "A latência da RAM é centenas de vezes maior que a do cache L1; misses degradam o throughput."),
          q("Qual é o tamanho típico da linha de cache (cache line) na grande maioria das CPUs modernas x86 e ARM?", "64 bytes (o que equivale a 8 números float64 de 8 bytes lidos em conjunto)", ["1 megabyte","4 bits"], "A cada leitura, 64 bytes contíguos são transferidos da RAM para os registradores de cache."),
          t("Como se denomina a falha que ocorre quando a CPU não encontra o byte necessário no cache rápido?", ["cache miss"], "Cache miss obriga o processador a recorrer à memória principal RAM.", "# falha de cache miss"),
          g("Complete o teste de layout confirmando se a matriz está alinhada para percursos rápidos por linha:", ["mat.flags.c_contiguous"], "Matrizes contíguas em C maximizam a localidade espacial por linha.", "alinhado_para_linhas = ____"),
          o("Ordene a hierarquia de memória da mais veloz e menor capacidade para a mais lenta e maior capacidade:", ["Registradores da CPU (tempo de acesso de fração de nanossegundo)","Cache L1 / L2 (residente no núcleo da CPU com latência ínfima)","Cache L3 compartilhado (intermediário entre núcleos)","Memória RAM principal (capacidade em gigabytes com latência maior)"], "Hierarquia de armazenamento de memória em sistemas computacionais modernos."),
          p("Associe o fenômeno de hardware ao seu impacto na execução do NumPy:", [["Localidade espacial","Aproveitamento máximo de linhas de cache ao iterar em blocos contíguos"],["Cache hit","Encontro imediato do dado no cache de silício sem espera de barramento"],["Cache miss","Atraso na execução enquanto a CPU requisita novos blocos da RAM externa"],["Linha de cache (64B)","Unidade mínima de transferência de bytes entre RAM e caches"]], "Relação entre arquitetura de hardware e eficiência em computação numérica.")
        ]
      },
      {
        id: "py-np-8-3-strides-contiguo",
        title: "Passos de memória (strides) e blocos contíguos",
        subtitle: "Internals · Como o NumPy navega pela memória usando passos em bytes",
        theory: "O segredo da flexibilidade do ndarray reside na tupla de strides: o número de bytes a avançar na memória física para saltar um elemento em cada dimensão. Compreender strides desmistifica transposição instantânea, visões fatiadas e o impacto do método .as_strided() em janelas deslizantes.",
        questions: [
          q("O que os strides de um ndarray representam formalmente em baixo nível?", "A quantidade de bytes que o ponteiro deve saltar na memória física para avançar um índice em cada eixo", ["A quantidade de linhas da matriz","O número de elementos descartados"], "Em uma matriz float64 (8 bytes) de shape (3, 4) em C-order, os strides são (32, 8)."),
          q("Por que os strides de uma matriz float64 de shape (3, 4) em C-order são iguais a (32, 8)?", "Avançar uma linha exige pular 4 colunas * 8 bytes = 32 bytes; avançar uma coluna pula 8 bytes", ["Porque 32 dividido por 8 dá 4","É uma constante aleatória do sistema"], "Para passar para a próxima linha, deve-se avançar toda a extensão da linha atual em bytes."),
          q("Como a operação de transposição mat.T é implementada internamente via strides?", "Simplesmente invertendo a ordem dos strides: se mat tinha (32, 8), a transposta terá (8, 32)", ["Copiando os elementos em ordem invertida","Alocando uma nova matriz no disco"], "Inverter a tupla de strides faz a leitura navegar verticalmente sem mover nenhum byte físico."),
          q("O que a função np.as_strided do módulo lib.stride_tricks permite realizar?", "Criar visões avançadas com qualquer geometria e passos customizados (como janelas deslizantes sem cópia)", ["Apagar os passos de memória","Acelerar a velocidade da placa de vídeo"], "Stride tricks viabiliza convoluções e janelas deslizantes (rolling windows) com custo de memória zero."),
          t("Qual atributo de um array informa os passos em bytes de cada dimensão estrutural?", ["strides"], "arr.strides contém a tupla com os saltos de bytes por eixo.", "# arr.strides"),
          g("Complete a cópia forçada que reorganiza um array com strides desalinhados em bloco contíguo:", ["np.ascontiguousarray(arr)"], "np.ascontiguousarray reorganiza os dados em layout C contíguo puro.", "arr_contiguo = ____"),
          o("Ordene a progressão de cálculo de endereço de memória para o elemento arr[i, j] com strides (s0, s1):", ["Identificar o endereço de memória base inicial do buffer ponteiro_base","Calcular o deslocamento de linha multiplicando o índice i pelo stride s0: i * s0","Calcular o deslocamento de coluna multiplicando o índice j pelo stride s1: j * s1","Acessar o byte final no endereço calculado: ponteiro_base + (i * s0) + (j * s1)"], "Mapeamento aritmético de índices multidimensionais em endereços lineares na memória."),
          p("Associe o comportamento de strides à sua operação geométrica:", [["arr.strides","Tupla com os saltos de bytes requeridos para navegar em cada eixo"],["Inversão de strides","Mecanismo que implementa a transposição matricial com custo O(1)"],["Stride igual a zero","Mecanismo interno que viabiliza o broadcasting sem copiar dados"],["np.ascontiguousarray","Reorganização física dos bytes em bloco contíguo sequencial"]], "Engenharia de strides e layout de memória no motor interno do ndarray.")
        ]
      },
      {
        id: "py-np-8-4-operacoes-in-place-out",
        title: "Operações in-place e reutilização de buffers (out=)",
        subtitle: "Alocação · Evitando coleta de lixo e reaproveitando contêineres na RAM",
        theory: "A instrução a = a + b cria um array temporário antes de reatribuir a variável, enquanto o operador in-place a += b modifica o buffer existente diretamente. Para controle total em pipelines críticos, funções universais (ufuncs) aceitam o parâmetro out=, gravando resultados em buffers pré-alocados sem coleta de lixo.",
        questions: [
          q("Qual é a diferença fundamental entre as instruções a = a + b e a += b em arrays NumPy?", "a = a + b aloca um novo array temporário na memória; a += b altera o buffer existente in-place", ["a += b é mais lenta que a soma simples","Ambas alocam cópias idênticas"], "Operadores in-place (+=, *=, -=, /=) economizam alocações e poupam ciclos do coletor de lixo."),
          q("Como o parâmetro out= das funções universais do NumPy auxilia na economia de recursos?", "Permite direcionar o resultado do cálculo diretamente para um array pré-alocado pelo desenvolvedor", ["Exporta o resultado diretamente para arquivo texto","Imprime a saída no console do terminal"], "np.add(a, b, out=a) reaproveita o contêiner existente sem alocar nenhum byte adicional."),
          q("Em laços de processamento massivo com milhares de iterações, por que alocar matrizes dentro do loop é nocivo?", "Gera constante alocação e desalocação na heap, fragmentando a RAM e sobrecarregando o Garbage Collector", ["Porque o Python limita o total de loops a cem","Porque a CPU perde a calibração de fábrica"], "Pré-alocar contêineres fora do laço e reutilizá-los com out= maximiza estabilidade e vazão de dados."),
          q("Qual método de ufunc aplica uma redução in-place acumulativa ao longo de um eixo?", "ufunc.reduce (ex: np.add.reduce(arr) é equivalente otimizado a np.sum)", ["ufunc.accumulate_copy()","ufunc.expand()"], "Métodos de ufuncs (.reduce, .accumulate, .at) concedem controle refinado de alocação e mutação."),
          t("Qual parâmetro nomeado de funções ufunc do NumPy direciona a gravação da saída para um array pré-alocado?", ["out"], "O parâmetro out especifica o contêiner de destino pré-alocado.", "# np.multiply(x, y, out=res)"),
          g("Complete a multiplicação de a e b gravando o resultado diretamente no próprio array a in-place:", ["np.multiply(a, b, out=a)"], "O parâmetro out=a reutiliza o buffer do primeiro operando.", "____ // executa a multiplicacao in-place"),
          o("Ordene as etapas recomendadas para estruturar um loop intensivo de alta performance em NumPy:", ["Pré-alocar todos os arrays de saída e buffers intermediários fora do laço principal","Garantir que os contêineres pré-alocados possuam shapes e dtypes compatíveis com os cálculos","Executar os cálculos dentro do laço direcionando resultados com o parâmetro out=","Consolidar os dados finais sem provocar nenhuma chamada nova de alocação de memória"], "Padrão de engenharia de software para pipelines de alto throughput e baixa latência."),
          p("Associe a forma sintática ao seu comportamento de alocação de memória:", [["arr = arr + 1","Alocação de nova matriz temporária intermediária na memória RAM"],["arr += 1","Mutação in-place imediata sobre o mesmo buffer de bytes original"],["np.sqrt(x, out=x)","Cálculo de raiz quadrada gravando no próprio contêiner de entrada"],["Garbage Collector","Mecanismo que consome tempo de CPU para limpar arrays temporários descartados"]], "Estratégias de gerenciamento de buffers e mitigação de alocações transitórias.")
        ]
      },
      {
        id: "py-np-8-5-boas-praticas-numericas",
        title: "Boas práticas e diagnóstico de computação numérica",
        subtitle: "Engenharia · Nan-safety, estabilidade e perfilamento de código científico",
        theory: "A computação numérica exige cuidados de integridade como nan-safety, tratamento de divisão por zero com np.errstate e escolha criteriosa de algoritmos estáveis. Evitar cópias ocultas, monitorar contiguidade de memória e encapsular validações garante pipelines de processamento resilientes.",
        questions: [
          q("Como o gerenciador de contexto np.errstate auxilia no controle de anomalias aritméticas?", "Permite configurar o comportamento de avisos (ex: ignore, raise, warn) para divisões por zero ou overflow", ["Aumenta a velocidade do processador","Desliga a checagem de tipos"], "with np.errstate(divide=\"ignore\", invalid=\"ignore\"): permite suprimir warnings em cálculos esperados."),
          q("Por que a comparação x == np.nan sempre retorna False para qualquer valor de x (inclusive se x for NaN)?", "O padrão IEEE 754 define formalmente que NaN é incomparável consigo mesmo; deve-se usar np.isnan(x)", ["Porque NaN é uma string e não um número","Porque o Python esquece o valor de NaN"], "Comparar x == np.nan é um bug sutil clássico; apenas np.isnan() detecta a presença de NaNs com exatidão."),
          q("O que a função np.allclose(a, b, rtol=1e-5, atol=1e-8) faz ao comparar dois arrays de ponto flutuante?", "Verifica se todos os elementos são aproximadamente iguais dentro de uma tolerância relativa e absoluta", ["Compara se ambos têm o mesmo nome de variável","Exige igualdade binária exata bit a bit"], "Comparações de floats nunca devem usar == devido a pequenas imprecisões de arredondamento inerentes."),
          q("Qual ferramenta ou profiler do ecossistema Python monitora linha a linha o consumo de memória em NumPy?", "memory_profiler (com o decorador @profile e comando mprof)", ["cProfile básico apenas de tempo","pdb tradicional de depuração"], "memory_profiler rastreia picos de consumo de memória causados por alocações indesejadas no código."),
          t("Qual função do NumPy compara dois arrays de ponto flutuante com tolerância numérica de arredondamento?", ["allclose","np.allclose"], "np.allclose afere igualdade aproximada respeitando tolerâncias numéricas.", "# np.allclose(a, b)"),
          g("Complete o contexto para tratar divisões por zero ignorando avisos de runtime:", ["np.errstate(divide=\"ignore\")"], "np.errstate isola configurações de tratamento de exceções de ponto flutuante.", "with ____:\n    resultado = arr_a / arr_b"),
          o("Ordene as boas práticas de qualidade e robustez para código científico em NumPy:", ["Substituir comparações exatas de floats (==) por aproximações com np.allclose()","Diagnosticar e tratar valores ausentes ou infinitos com np.isnan() e np.isinf()","Gerenciar avisos de divisão por zero deliberadamente com np.errstate","Auditar a presença de cópias ocultas conferindo as flags de contiguidade dos arrays"], "Diretrizes de excelência e confiabilidade em desenvolvimento de software numérico."),
          p("Associe a prática recomendada à sua justificativa técnica correspondente:", [["np.allclose(a, b)","Prevenção de falsos negativos causados por imprecisão de ponto flutuante"],["np.isnan(arr)","Detecção fidedigna de valores não numéricos que falham na igualdade direta"],["with np.errstate()","Controle granular e contextualizado de avisos de overflow e divisão por zero"],["assert arr.flags.c_contiguous","Garantia explícita de contiguidade física antes de chamadas de C/Cython"]], "Padrões de engenharia e confiabilidade em sistemas de computação numérica.")
        ]
      }
    ]
  });
})();
