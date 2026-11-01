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

  const lang = 'javascript';
  const chId = 'javascript-c02';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    2: [
      {
        id: "js-c02-u2-l3",
        title: "Transição de estados e mutação de variáveis",
        subtitle: "Aprofundamento · transição de estados e memória de variáveis",
        theory: "Um programa computacional transita entre diferentes estados à medida que suas variáveis são atualizadas no tempo. Em JavaScript, variáveis declaradas com let permitem reatribuição, mudando seu valor na memória a cada instrução sequencial executada pela thread principal.",
        questions: [
        q("O que a variável saldo armazena após executar: let saldo = 100; saldo = saldo + 50; saldo = saldo - 20;?", "130", ["150","100"], "O estado inicial de 100 recebe 50 (150) e em seguida deduz 20, resultando no estado final 130.", "let saldo = 100;\nsaldo += 50;\nsaldo -= 20;"),
        q("Por que entender a ordem sequencial de mutação é indispensável para evitar bugs de estado?", "Porque o valor de uma variável depende estritamente das instruções executadas antes da linha atual", ["Porque variáveis mudam sozinhas a cada segundo","Porque o navegador lê o arquivo de trás para frente"], "A computação clássica é sequencial: cada instrução transforma o estado herdado da linha anterior."),
        q("Qual operador de atribuição combinada soma um valor à própria variável em JavaScript?", "+= (ex: x += 5)", ["=+ (ex: x =+ 5)","++= (ex: x ++= 5)"], "O operador de atribuição combinada += soma o operando direito ao valor atual da variável."),
        q("O que acontece se tentarmos alterar o valor de uma constante declarada com const?", "Ocorre um TypeError indicando atribuição inválida a variável constante", ["O valor é alterado normalmente","A variável vira uma função"], "Identificadores declarados com const têm sua ligação protegida contra novas reatribuições."),
        t("Qual palavra-chave do JavaScript declara variáveis que permitem reatribuição de novos valores?", ["let"], "A palavra-chave let declara variáveis mutáveis com escopo de bloco.", "____ pontos = 0;\npontos += 10;"),
        g("Complete o operador de atribuição que subtrai 15 do valor corrente da variável estoque:", ["-="], "O operador -= subtrai e reatribui na mesma operação.", "estoque ____ 15;"),
        o("Ordene a evolução temporal dos valores da variável contador no trecho de código:", ["A variável contador é inicializada com o valor zero na declaração com let","A instrução de incremento adiciona 5 unidades elevando o contador para 5","A multiplicação por 2 altera o estado do contador para 10","A saída final do console imprime o valor 10 resultante do fluxo"], "Acompanhar a linha do tempo do estado de variáveis é a essência do rastreamento algorítmico."),
        p("Associe o operador de atribuição composta ao seu respectivo efeito na memória:", [["x += 10","Soma dez unidades ao valor atual da variável x"],["x -= 5","Subtrai cinco unidades do valor atual da variável x"],["x *= 2","Multiplica o valor atual da variável x por dois"],["x /= 4","Divide o valor atual da variável x por quatro"]], "Operadores combinados sintetizam leitura, operação e reatribuição com concisão.")
        ]
      },
      {
        id: "js-c02-u2-l4",
        title: "Algoritmos clássicos de troca e acumuladores",
        subtitle: "Aplicação · algoritmos de troca e acumuladores em JavaScript",
        theory: "Dois padrões algorítmicos essenciais são o acumulador (que reúne somas ou contagens ao longo de um percurso) e a troca de variáveis (swap). Em JavaScript moderno, desestruturação [a, b] = [b, a] permite trocar valores entre duas variáveis sem variável auxiliar temporária.",
        questions: [
        q("Como trocar os valores das variáveis a e b em JavaScript sem precisar de uma variável temporária aux?", "[a, b] = [b, a]", ["a = b; b = a;","swap(a, b)"], "A atribuição via desestruturação de array [a, b] = [b, a] realiza a troca simultânea e limpa de valores.", "let a = 1, b = 2;\n[a, b] = [b, a];"),
        q("O que acontece se tentarmos trocar a = b; b = a; sem salvar o valor original em uma variável auxiliar?", "O valor original de a é sobrescrito e perdido, fazendo com que ambas as variáveis fiquem com o valor de b", ["A troca ocorre perfeitamente","O código gera ReferenceError"], "A atribuição sequencial destrutiva a = b apaga o valor antigo de a antes que ele possa ser repassado a b."),
        q("Qual é a finalidade clássica de uma variável atuando no papel de \"acumulador\" em um algoritmo?", "Acumular a soma progressiva de múltiplos valores ao longo da repetição de um processo", ["Guardar a senha do usuário","Limpar o histórico do navegador"], "Acumuladores iniciam tipicamente com zero e recebem novos aportes sequenciais a cada passo."),
        q("Qual valor inicial neutro deve ser atribuído a um acumulador que calculará o produto (multiplicação)?", "1 (um)", ["0 (zero)","-1 (menos um)"], "O elemento neutro da multiplicação é 1; inicializar com zero anularia todo o produto."),
        t("Qual número neutro deve ser o valor inicial de um acumulador de somas em JavaScript?", ["0"], "Zero é o elemento neutro da adição, garantindo que o primeiro incremento seja fiel.", "let soma = ____;\nsoma += valor;"),
        g("Complete a sintaxe moderna de desestruturação para inverter os valores de x e y:", ["[x, y] = [y, x]"], "A desestruturação em arrays realiza a troca atômica sem variável intermediária.", "let x = 10, y = 20;\n____;"),
        o("Ordene os passos do algoritmo clássico de troca de duas variáveis utilizando variável auxiliar:", ["Copiar o valor da variável A para uma variável temporária auxiliar","Atribuir o valor da variável B diretamente para a variável A","Atribuir o valor guardado na variável auxiliar para a variável B","Conferir se os valores de A e B foram permutados com sucesso"], "Compreender o papel da variável temporária fundamenta o conceito de atribuição destrutiva."),
        p("Associe o papel da variável no algoritmo à sua finalidade canônica:", [["Acumulador de soma","Inicia com 0 e reúne a somatória contínua de valores numéricos"],["Acumulador de produto","Inicia com 1 e agrega multiplicações sucessivas sem anular a conta"],["Variável auxiliar (temp)","Armazena temporariamente um dado durante a permuta de posições"],["Contador","Inicia com 0 e avança de uma em uma unidade para registrar repetições"]], "Identificar o papel de cada variável traz clareza imediata à arquitetura de algoritmos.")
        ]
      },
      {
        id: "js-c02-u2-l5",
        title: "Linearidade e dependência de passos algorítmicos",
        subtitle: "Revisão e desafio · linearidade e dependência de passos",
        theory: "Algoritmos são sequências determinísticas: uma instrução que depende do resultado de outra não pode ser antecipada. Entender pré-requisitos lógicos garante que variáveis não sejam lidas antes de calculadas, prevenindo bugs de ReferenceError ou cálculos com valores undefined.",
        questions: [
        q("O que acontece se uma instrução tentar calcular total = preco + frete antes da variável frete ser definida?", "Em JavaScript com let/const, ocorre ReferenceError por acesso antes da inicialização (TDZ)", ["O valor do frete é presumido como zero","O navegador adia o cálculo sozinho"], "A Zona Morta Temporal (TDZ) impede ler variáveis let/const antes de sua linha de declaração."),
        q("Qual é o conceito formal que expressa quando o Passo B só pode rodar após o término bem-sucedido do Passo A?", "Dependência de dados (ou pré-requisito sequencial)", ["Independência assíncrona","Recursão cruzada"], "Dependência de dados exige que o insumo seja produzido antes de ser consumido pela etapa seguinte."),
        q("Qual é a postura correta ao planejar a ordem de instruções em um programa de faturamento?", "Obter entradas -> Validar integridade -> Calcular descontos -> Aplicar impostos -> Emitir total", ["Emitir total -> Aplicar impostos -> Obter entradas","Calcular impostos antes de saber o valor bruto"], "A cadeia de causalidade exige que valores brutos precedam deduções e totalizações."),
        q("Por que algoritmos com instruções ambíguas ou fora de ordem são perigosos em sistemas bancários?", "Podem gerar cobranças incorretas, saldos inconsistentes ou quebra da integridade contábil", ["Porque o computador desliga por precaução","Porque o CSS da página perde a cor"], "Computadores não adivinham intenções; instruções desordenadas executam cálculos imprevisíveis."),
        t("Qual sigla em inglês descreve a Zona Morta Temporal em que variáveis não podem ser acessadas antes da linha de let?", ["TDZ"], "TDZ (Temporal Dead Zone) é o período entre o início do escopo e a declaração de let/const.", "// Erro por acesso prematuro na: ____"),
        g("Complete o cálculo da área garantindo que base e altura já estejam devidamente declaradas:", ["base * altura"], "A área depende das variáveis prévias de base e altura multiplicadas.", "const base = 5;\nconst altura = 8;\nconst area = ____;"),
        o("Ordene a sequência lógica e determinística para calcular o valor final de uma compra com frete:", ["Declarar e atribuir o preço unitário do item e a quantidade comprada","Multiplicar o preço pela quantidade para calcular o subtotal da compra","Avaliar se o subtotal qualifica para isenção ou se incide o valor do frete","Somar o frete ao subtotal e exibir o valor final definitivo ao cliente"], "Seguir a cadeia estrita de precedência impede o uso de valores não consolidados."),
        p("Associe a falha de ordenação ao respectivo sintoma técnico observado no código:", [["Leitura antes de let","ReferenceError: Cannot access variable before initialization"],["Leitura de parâmetro ausente","Operação matemática resulta em NaN (Not-a-Number) por usar undefined"],["Cálculo de imposto antes do bruto","Gera valor zero ou incorreto por falta de base de cálculo"],["Sequência canônica respeitada","Execução linear, previsível e sem falhas de estado na aplicação"]], "A disciplina sequencial é a primeira lei da construção algorítmica confiável.")
        ]
      }
    ],
    3: [
      {
        id: "js-c02-u3-l1",
        title: "Símbolos gráficos: Terminal e Bloco de Processamento",
        subtitle: "Apresentação · terminal e blocos de processo retangulares",
        theory: "Fluxogramas utilizam símbolos visuais padronizados pela norma ANSI/ISO. O retângulo com cantos arredondados (ou elipse) representa o Terminal (início e término do fluxo). O retângulo tradicional representa um Bloco de Processamento, utilizado para cálculos, atribuições e transformações de estado.",
        questions: [
        q("Qual forma geométrica é utilizada no padrão de fluxogramas para indicar o Início e o Fim do algoritmo?", "Retângulo com cantos arredondados (ou elipse / terminal)", ["Losango pontiagudo","Triângulo invertido"], "O símbolo oval ou retângulo de cantos arredondados demarca as fronteiras de entrada e saída do fluxo."),
        q("Qual forma geométrica representa uma ação de cálculo, atribuição interna ou processamento de dados?", "Retângulo comum", ["Círculo pequeno","Hexágono irregular"], "Retângulos convencionais representam passos operacionais internos, como total = preco * qtd."),
        q("Quantos terminais de \"Início\" um fluxograma bem estruturado deve possuir?", "Exatamente um início", ["Quantos o desenvolvedor desejar","Nenhum"], "Um fluxo determinístico possui um único ponto de partida para evitar ambiguidade de execução."),
        q("O que deve ser escrito dentro de um retângulo de processamento em um algoritmo de vendas?", "Instruções como \"desconto = subtotal * 0.10\" ou \"total = subtotal - desconto\"", ["Apenas a palavra FIM","Uma pergunta para o usuário com ponto de interrogação"], "Processamentos representam ações ativas e transformações matemáticas concretas."),
        t("Qual símbolo geométrico clássico representa operações de cálculo e atribuição em fluxogramas?", ["retângulo"], "O retângulo delimita instruções de processamento e mutação de variáveis.", "// Forma de processamento interno: ____"),
        g("Complete o texto do terminal que marca o encerramento do percurso do fluxograma:", ["Fim"], "Terminais de encerramento são tradicionalmente rotulados como Fim ou Término.", "[Terminal: ____]"),
        o("Ordene os elementos de um fluxograma elementar que realiza o dobro de um número:", ["Terminal de Início indicando o ponto de partida do algoritmo","Bloco de entrada capturando o valor numérico fornecido","Retângulo de processamento calculando resultado = numero * 2","Terminal de Fim encerrando a trajetória do fluxo"], "A clareza gráfica do fluxograma permite validar o encadeamento antes de escrever código."),
        p("Associe a forma gráfica do fluxograma à sua respectiva função semântica:", [["Retângulo com cantos arredondados","Terminal: indica o Início ou o Fim da execução do algoritmo"],["Retângulo com cantos retos","Processamento: representa cálculos, operações e atribuições de variáveis"],["Linha com seta direcionada","Fluxo de controle: indica o sentido e a ordem dos próximos passos"],["Texto interno no bloco","Descrição concisa e objetiva da instrução a ser executada naquele passo"]], "A padronização visual internacional torna fluxogramas universais entre equipes de engenharia.")
        ]
      },
      {
        id: "js-c02-u3-l2",
        title: "Paralelogramo de Entrada e Saída de dados",
        subtitle: "Prática guiada · paralelogramo de entrada e saída de dados",
        theory: "A comunicação com o mundo exterior é representada pelo Paralelogramo (ou trapézio/documento em notações específicas). Ele sinaliza a leitura de dados vindos do usuário (entrada) ou a exibição de resultados na tela/impressora (saída), isolando E/S de cálculos internos.",
        questions: [
        q("Qual forma geométrica inclinada é convencionada para indicar Entrada ou Saída de dados em fluxogramas?", "Paralelogramo", ["Retângulo reto","Círculo"], "O paralelogramo representa operações de I/O (Input/Output), como ler digitação ou exibir relatórios."),
        q("Por que é importante diferenciar visualmente um bloco de entrada de um bloco de processamento?", "Porque entradas dependem de fatores externos e podem conter dados inválidos que exigem validação", ["Porque paralelogramos rodam mais rápido que retângulos","Porque o computador rejeita fluxogramas sem paralelogramos"], "Operações de E/S cruzam a fronteira do sistema e representam pontos de atenção na segurança do software."),
        q("Qual das instruções abaixo deve ser alocada dentro de um paralelogramo de saída?", "\"Exibir: Seu saldo atual é R$ 150,00\"", ["\"saldo = 150\"","\"if (saldo > 0)\""], "Apresentar dados para o usuário é uma operação de saída, pertencente ao paralelogramo."),
        q("Qual instrução deve residir em um paralelogramo de entrada em um sistema de autenticação?", "\"Ler nome de usuário e senha digitados\"", ["\"criptografar_senha(senha)\"","\"fechar_janela()\""], "A captura das credenciais do usuário pelo teclado constitui uma entrada de dados."),
        t("Qual figura geométrica de quatro lados inclinados representa leitura e escrita em fluxogramas?", ["paralelogramo"], "O paralelogramo demarca operações de comunicação externa (I/O).", "// Simbolo de entrada e saida: ____"),
        g("Complete o rótulo do paralelogramo que solicita a entrada do preço do combustível:", ["Ler precoLitro"], "Blocos de entrada descrevem claramente o dado externo capturado.", "[Paralelogramo: ____]"),
        o("Ordene a sequência visual de um algoritmo de soma com blocos de fluxograma adequados:", ["Terminal com cantos arredondados contendo a palavra Início","Paralelogramo de entrada com a instrução \"Ler valor A e valor B\"","Retângulo reto de processamento calculando \"soma = A + B\"","Paralelogramo de saída com a mensagem \"Exibir resultado da soma\""], "Respeitar as formas corretas de cada bloco assegura legibilidade universal ao diagrama."),
        p("Associe o evento do sistema ao símbolo correto no desenho do fluxograma:", [["Usuário digita a senha no teclado","Paralelogramo de Entrada (leitura externa de dados)"],["Computador calcula o hash da senha","Retângulo de Processamento (operação de cálculo interno)"],["Tela exibe \"Login efetuado com sucesso\"","Paralelogramo de Saída (emissão de mensagem para o usuário)"],["Início do sistema de segurança","Terminal oval (fronteira inicial de execução do fluxo)"]], "A dissociação entre ler, calcular e exibir é a espinha dorsal de qualquer algoritmo robusto.")
        ]
      },
      {
        id: "js-c02-u3-l3",
        title: "O Losango de Decisão e ramificações Sim e Não",
        subtitle: "Aprofundamento · losango de decisão e caminhos verdadeiro/falso",
        theory: "O Losango de Decisão introduz inteligência ao algoritmo. Ele contém uma expressão relacional ou lógica que avalia como Verdadeira ou Falsa. Do losango partem obrigatoriamente duas linhas de fluxo rotuladas (Sim/Não ou V/F), bifurcando o percurso conforme a condição testada.",
        questions: [
        q("Qual forma geométrica representa uma bifurcação condicional com múltiplos caminhos em fluxogramas?", "Losango", ["Trapézio","Elipse"], "O losango abriga a pergunta lógica que direciona o fluxo para caminhos distintos."),
        q("Quantas linhas de saída identificadas devem partir de um losango de decisão binária padrão?", "Exatamente duas saídas rotuladas (uma para Sim/Verdadeiro e outra para Não/Falso)", ["Apenas uma saída sem rótulo","Dez saídas aleatórias"], "Decisões binárias possuem obrigatoriamente um caminho para o caso verdadeiro e outro para o falso."),
        q("Qual texto de teste deve ser redigido dentro de um losango de avaliação de idade para votação?", "idade >= 16 ?", ["idade = 16","Exibir idade"], "O interior do losango expressa uma pergunta ou comparação lógica que resulta em sim ou não."),
        q("O que acontece se uma das ramificações de saída do losango não for rotulada com Sim ou Não?", "O fluxograma torna-se ambíguo e indeterminado, impossibilitando saber qual caminho seguir", ["O computador escolhe o caminho da direita automaticamente","O diagrama vira uma página HTML"], "Rotular as saídas do losango é mandatório para eliminar dúvidas na implementação do código."),
        t("Qual forma geométrica pontiaguda de quatro lados abriga a condição de decisão em fluxogramas?", ["losango"], "O losango bifurca o percurso de acordo com o resultado da expressão.", "// Simbolo condicional: ____"),
        g("Complete os rótulos obrigatórios que identificam as duas saídas do losango de decisão:", ["Sim e Nao"], "As saídas do losango devem identificar claramente as opções verdadeiro e falso.", "// Rotulos de saida do losango: ____"),
        o("Ordene os passos de um algoritmo de aprovação acadêmica baseado em média no fluxograma:", ["Calcular a média semestral dentro de um retângulo de processamento","Inserir o losango de decisão avaliando a condição \"media >= 7.0 ?\"","Conectar o ramo \"Sim\" ao paralelogramo de saída \"Exibir: Aprovado\"","Conectar o ramo \"Não\" ao paralelogramo de saída \"Exibir: Em Recuperação\""], "O losango introduz a bifurcação necessária para atender regras de negócio dinâmicas."),
        p("Associe o elemento do bloco de decisão à sua regra de construção gráfica:", [["Interior do losango","Contém a expressão booleana ou pergunta relacional clara (ex: estoque > 0 ?)"],["Ramo rotulado \"Sim\" (ou V)","Linha de fluxo seguida quando a avaliação lógica resulta em verdadeiro"],["Ramo rotulado \"Não\" (ou F)","Linha de fluxo seguida quando a avaliação lógica resulta em falso"],["Ponto de convergência","Local onde os ramos voltam a se unir após o término do tratamento condicional"]], "Modelar bifurcações com precisão previne lacunas de regras em sistemas corporativos.")
        ]
      },
      {
        id: "js-c02-u3-l4",
        title: "Conectores circulares e redução de cruzamentos",
        subtitle: "Aplicação · conectores circulares e redução de cruzamentos",
        theory: "Quando um diagrama se torna complexo, cruzar linhas de fluxo gera poluição visual e erros de leitura. O Conector (pequeno círculo com letra ou número interno) permite quebrar uma linha longa e reconectá-la em outro ponto do diagrama sem que as linhas precisem se cruzar fisicamente.",
        questions: [
        q("Qual símbolo gráfico é utilizado para evitar cruzamento de linhas em fluxogramas complexos?", "Pequeno círculo com identificador alfanumérico (conector)", ["Um quadrado tracejado","Uma estrela de cinco pontas"], "O conector circular quebra visualmente a linha em um ponto e a retoma em outro com a mesma letra de referência."),
        q("Como um conector rotulado com a letra \"A\" funciona na prática da leitura de um fluxograma?", "A linha que entra no conector A é retomada exatamente na linha que parte de outro conector A", ["Informa que o programa deve emitir o som da letra A","Significa que o algoritmo terminou"], "Conectores atuam como pontes conceituais com identificadores correspondentes em pares."),
        q("Por que cruzar linhas de fluxo sem conectores é considerado uma má prática no desenho técnico?", "Porque cria ilusão de interseção de caminhos e dificulta o rastreamento visual das decisões", ["Porque aumenta o tamanho do arquivo no computador","Porque os navegadores rejeitam imagens com linhas cruzadas"], "Linhas cruzadas geram confusão sobre qual caminho deve ser tomado em bifurcações densas."),
        q("Qual conector especial (semelhante a uma casinha deitada) é utilizado para conectar páginas diferentes?", "Conector de fora de página (off-page connector)", ["Conector circular comum","Terminal de fim"], "O conector off-page indica que o fluxo continua em uma folha ou página subsequente da documentação."),
        t("Qual forma geométrica simples representa o conector interno na mesma página do diagrama?", ["círculo"], "Pequenos círculos com letras identificam pontes de fluxo na mesma página.", "// Conector de fluxo na pagina: pequeno ____"),
        g("Complete com a letra correspondente para fechar a conexão de fluxo com o conector [A]:", ["A"], "Conectores funcionam em pares estritamente idênticos.", "Linha entra em [A] -> Fluxo retoma em [____]"),
        o("Ordene a aplicação correta de um conector circular para despoluir um fluxograma extenso:", ["Identificar uma linha longa de retorno que cruza múltiplos blocos de decisões","Interromper a linha desenhando um pequeno círculo conector contendo a letra \"B\"","Inserir outro conector circular idêntico com a letra \"B\" próximo ao nó de destino","Conectar a saída do segundo círculo ao bloco que deve receber a continuação do fluxo"], "Eliminar cruzamentos através de conectores preserva a elegância do projeto de software."),
        p("Associe o tipo de conector de fluxograma ao seu respectivo propósito de layout:", [["Conector circular na página","Liga trechos distantes na mesma página sem cruzar linhas físicas"],["Conector off-page (pentagonal)","Transfere a continuidade do fluxo para outra página da documentação"],["Identificador interno (ex: \"1\")","Letra ou número em comum que referencia o ponto de partida e chegada"],["Linhas ortogonais","Linhas de fluxo desenhadas apenas com ângulos retos de 90 graus para legibilidade"]], "A disciplina de desenho e uso de conectores torna diagramas complexos legíveis à primeira vista.")
        ]
      },
      {
        id: "js-c02-u3-l5",
        title: "Padronização ANSI/ISO e revisão de diagramação",
        subtitle: "Revisão e desafio · padronização ANSI e legibilidade de diagramas",
        theory: "A padronização internacional de fluxogramas (ANSI X3.5 / ISO 5807) estabelece diretrizes rigorosas: orientação de leitura de cima para baixo e da esquerda para a direita, linhas com setas explícitas, ausência de blocos soltos sem saída e coerência entre o diagrama e o código final.",
        questions: [
        q("Qual é o sentido convencional e prioritário de leitura na diagramação de fluxogramas profissionais?", "De cima para baixo (top-down) e da esquerda para a direita", ["De baixo para cima em espiral","Da direita para a esquerda apenas"], "O fluxo natural dos olhos ocidentais dita que processos comecem no topo e progridam para a base."),
        q("O que indica a presença de um bloco em um fluxograma do qual não parte nenhuma linha de conexão?", "Um erro estrutural grave (nó órfão ou beco sem saída)", ["Uma otimização de alta velocidade","Um recurso de computação quântica"], "Todo bloco (exceto o Terminal Fim) deve obrigatoriamente possuir um caminho de continuidade."),
        q("Por que desenhar e validar o fluxograma antes da programação em JavaScript acelera a entrega?", "Revela casos de borda e regras omissas antes que o tempo seja gasto em depuração de código", ["Porque o fluxograma escreve o CSS automaticamente","Porque dispensa o uso de computadores para testar"], "Descobrir falhas conceituais no desenho economiza horas de reescrita em etapas posteriores."),
        q("O que deve ser colocado obrigatoriamente nas linhas de fluxo que convergem para um mesmo bloco?", "Setas apontando o sentido do percurso para evitar dúvidas sobre o rumo da execução", ["Cores diferentes para cada dia da semana","Nomes de variáveis"], "Setas direcionais eliminam qualquer ambiguidade sobre a rota percorrida pelo fluxo."),
        t("Qual organização internacional de normas padroniza os símbolos de diagramação na engenharia?", ["ISO"], "A ISO (International Organization for Standardization) define a norma ISO 5807 de fluxogramas.", "// Padrao internacional: norma ____"),
        g("Complete o sentido fundamental de orientação da leitura dos diagramas no padrão ocidental:", ["cima para baixo"], "Fluxogramas são desenhados prioritariamente do topo para o rodapé.", "Orientacao do fluxo: de ____"),
        o("Ordene os critérios de auditoria visual de um fluxograma técnico antes da aprovação:", ["Conferir se existe apenas um terminal único de Início no topo do diagrama","Validar se todas as saídas de losangos estão explicitamente rotuladas com Sim e Não","Checar se não existem nós cegos sem saída e se todas as linhas convergem para o Fim","Testar o percurso com dados de teste confirmando se a lógica resolve o problema"], "Auditar o fluxograma assegura que a implementação em código ocorra sem retrabalho."),
        p("Associe a regra de ouro de diagramação à sua consequência na qualidade do software:", [["Fluxo de cima para baixo","Facilita a leitura sequencial rápida e alinhada à cognição humana"],["Setas em todas as linhas","Indica com clareza a direção do fluxo eliminando ambiguidades"],["Rotulação Sim/Não nos losangos","Garante determinismo absoluto nas decisões lógicas do algoritmo"],["Convergência para o Fim","Garante que todos os caminhos concluam sua execução sem loops mortos"]], "O domínio da diagramação transforma ideias abstratas em algoritmos concretos e verificáveis.")
        ]
      }
    ],
    4: [
      {
        id: "js-c02-u4-l1",
        title: "Do enunciado textual ao rascunho de fluxo",
        subtitle: "Apresentação · do enunciado ao rascunho de fluxo",
        theory: "A engenharia de software começa pela decomposição de enunciados em prosa para fluxos algorítmicos. O primeiro passo é sublinhar os substantivos que representam as Entradas (dados recebidos), os verbos que expressam o Processamento (cálculos) e os adjetivos que delimitam as Decisões.",
        questions: [
        q("Ao analisar um problema em texto, o que os substantivos fornecidos pelo cliente normalmente representam?", "As variáveis de entrada do algoritmo (ex: salário, idade, valor da compra)", ["Os comandos de desligamento da máquina","O tema visual do editor de texto"], "Substantivos nomeiam dados de entrada e entidades do domínio de negócio."),
        q("O que palavras como \"se\", \"caso\", \"quando\" ou \"maior que\" no enunciado sinalizam no fluxograma?", "A necessidade de inserir um losango de decisão condicional", ["A criação de um terminal de início adicional","A impressão de um relatório"], "Conjunções condicionais demarcam bifurcações onde o fluxo deve tomar rotas alternativas."),
        q("O que expressões como \"calcular o total\", \"somar o frete\" ou \"descontar 10%\" representam graficamente?", "Retângulos de processamento operacional", ["Paralelogramos de leitura","Círculos conectores"], "Ações ativas de cálculo e transformação de valores habitam retângulos de processamento."),
        q("Qual é a recomendação ao rascunhar o primeiro desenho de um problema complexo?", "Criar um rascunho inicial simples cobrindo o \"caminho feliz\" e refinar adicionando exceções depois", ["Tentar colocar 500 caixas na primeira tentativa sem revisar","Começar pelo código binário"], "Decompor o fluxo partindo do caso de sucesso facilita a adição progressiva de proteções."),
        t("Qual elemento gramatical no enunciado geralmente indica os dados de entrada do algoritmo?", ["substantivo"], "Substantivos nomeiam as variáveis e entradas fornecidas ao sistema.", "// Categoria gramatical de entradas: ____"),
        g("Complete o bloco de decisão baseado no enunciado \"Se a nota for menor que 5, o aluno reprova\":", ["nota < 5"], "A condição do losango espelha a regra descrita no problema.", "[Losango: ____ ?]"),
        o("Ordene as etapas para traduzir uma especificação em prosa para um diagrama de blocos:", ["Ler atentamente o texto identificando as entradas fornecidas e as saídas exigidas","Identificar os pontos de bifurcação marcados por palavras condicionais como \"se\"","Desenhar o esqueleto do fluxo organizando entradas, cálculos e decisões com setas","Validar com um exemplo numérico simples se o desenho cobre a regra descrita"], "A tradução sistemática de requisitos previne falhas de interpretação de regras de negócio."),
        p("Associe a pista textual do enunciado ao seu símbolo correspondente no fluxograma:", [["\"O usuário informa o valor do depósito\"","Paralelogramo de Entrada (leitura externa)"],["\"Se o saldo for insuficiente...\"","Losango de Decisão (bifurcação booleana)"],["\"Deduzir a taxa de transferência do saldo\"","Retângulo de Processamento (cálculo interno)"],["\"Apresentar comprovante na tela\"","Paralelogramo de Saída (emissão de dados)"]], "Mapear requisitos textuais para formas gráficas é a habilidade chave do analista de sistemas.")
        ]
      },
      {
        id: "js-c02-u4-l2",
        title: "Identificação de pré-condições e casos de borda",
        subtitle: "Prática guiada · identificação de precondições e fronteiras",
        theory: "Casos de borda (edge cases) e pré-condições testam os limites extremos das regras de negócio: valores nulos, zeros, números negativos ou limites exatos de corte (como subtotal igual a 100). Um bom algoritmo valida as pré-condições logo no início, bloqueando dados inválidos.",
        questions: [
        q("O que é uma \"pré-condição\" em um algoritmo de cálculo de empréstimo financeiro?", "Uma exigência mínima que deve ser verdadeira antes do cálculo iniciar (ex: valorSolicitado > 0)", ["A cor do botão na interface","O número da versão do navegador"], "Pré-condições delimitam as condições mínimas de validade para que o processamento possa ocorrer."),
        q("Em uma regra de \"frete grátis para compras acima de R$ 100\", qual valor representa o caso de borda crítico?", "Exatamente R$ 100,00", ["R$ 5.000,00","R$ 0,50"], "Valores limítrofes (fronteiras) exigem clareza absoluta sobre se a regra usa > 100 ou >= 100."),
        q("O que o algoritmo deve fazer imediatamente ao detectar que a idade informada é negativa (-5)?", "Interromper o cálculo e emitir mensagem de entrada inválida através de uma saída defensiva", ["Multiplicar a idade por dez","Fingir que a idade é 18 e aprovar"], "Validação de pré-condições no início (fail-fast) protege a integridade das operações subsequentes."),
        q("Por que testar valores imediatamente abaixo e acima do corte (ex: 99,99 e 100,01) é vital?", "Porque a maioria dos bugs graves em software decorre de operadores de comparação incorretos (< versus <=)", ["Porque o computador só lê centavos se forem ímpares","Porque testes com centavos são mais rápidos"], "Erros de off-by-one em limites de corte causam prejuízos financeiros substanciais em e-commerce."),
        t("Qual termo técnico em inglês designa o princípio de interromper imediatamente diante de dados inválidos?", ["fail-fast"], "O padrão fail-fast interrompe e alerta logo na primeira inconsistência detectada.", "// Padrao defensivo: ____"),
        g("Complete a condição defensiva que rejeita quantidades menores ou iguais a zero no pedido:", ["quantidade <= 0"], "Pré-condições bloqueiam quantidades inválidas antes do estoque.", "if (____) { throw new Error(\"Quantidade invalida\"); }"),
        o("Ordene a estrutura de um algoritmo defensivo com checagem de pré-condições na entrada:", ["Receber o valor do parâmetro fornecido pelo usuário na entrada","Inserir losango testando a pré-condição de validade (ex: valor > 0 ?)","Caso inválido (Não): emitir erro e conduzir diretamente ao Terminal Fim","Caso válido (Sim): prosseguir com os cálculos de negócio principais"], "Testar pré-condições na entrada blinda o coração da lógica contra dados espúrios."),
        p("Associe o valor de teste à sua classificação em testes de limites de algoritmos:", [["Subtotal = 100.00 em regra >= 100","Caso de borda exato no limite da condição de corte"],["Subtotal = 99.99","Caso de borda imediatamente abaixo da fronteira de isenção"],["Subtotal = -10.00","Violação de pré-condição que exige bloqueio na entrada"],["Subtotal = 500.00","Caso comum do caminho feliz bem no centro da regra de negócio"]], "A análise minuciosa de fronteiras separa o algoritmo ingênuo do software profissional.")
        ]
      },
      {
        id: "js-c02-u4-l3",
        title: "Encadeamento de bifurcações e decisões compostas",
        subtitle: "Aprofundamento · encadeamento de bifurcações sem ambiguidades",
        theory: "Quando um problema possui múltiplos critérios (como classificação de risco ou faixas salariais), encadeamos losangos sucessivos. Cada losango resolve uma faixa e delega o restante pelo ramo do Não, espelhando a estrutura if-else if-else em código JavaScript.",
        questions: [
        q("Como múltiplos critérios mutuamente exclusivos são modelados graficamente em fluxogramas?", "Encadeando losangos em cascata, onde a saída \"Não\" de um alimenta a entrada do losango seguinte", ["Colocando dez retângulos no mesmo ponto","Escrevendo todo o texto em um círculo"], "Bifurcações encadeadas sequenciam condições excludentes de forma hierárquica e determinística."),
        q("Qual estrutura da linguagem JavaScript traduz diretamente uma cascata de losangos sequenciais?", "if (...) { ... } else if (...) { ... } else { ... }", ["while loop infinito","try / finally"], "A estrutura if-else if modela perfeitamente a cascata visual de decisões sequenciais."),
        q("O que acontece se as faixas em uma cascata de decisões forem organizadas em ordem incorreta?", "Uma faixa mais abrangente pode capturar valores antes de faixas específicas, gerando classificações erradas", ["O computador se recusa a compilar","O monitor descalibra as cores"], "Condições mais restritivas devem ser avaliadas antes para não serem engolidas por condições gerais."),
        q("Qual cláusula de saída ao final de uma cascata atende a todos os casos não previstos nas faixas?", "O ramo final do else (caso padrão ou fallback)", ["A primeira linha do arquivo","O comando restart"], "O bloco else final captura tudo o que não se enquadrou nos filtros anteriores, garantindo cobertura total."),
        t("Qual estrutura de controle de três palavras encadeia decisões dependentes em JavaScript?", ["else if"], "else if conecta uma nova pergunta caso a condição anterior tenha resultado em falso.", "if (x > 10) {} ____ (x > 5) {}"),
        g("Complete o encadeamento para categorizar clientes com pontuação maior que 80 como VIP:", ["else if (pontos > 80)"], "else if avalia a faixa subsequente após o primeiro if falhar.", "if (pontos > 100) { nivel = \"DIAMANTE\"; } ____ { nivel = \"VIP\"; }"),
        o("Ordene a cascata de faixas etárias para ingresso gratuito, meia-entrada e inteira:", ["Avaliar no primeiro losango se a idade é menor que 6 anos (Gratuito)","No ramo Não, avaliar no segundo losango se a idade é menor que 18 anos ou estudante (Meia)","No ramo Não, avaliar se a idade é maior ou igual a 60 anos (Meia por lei)","No ramo Não restante, atribuir a tarifa regular padrão (Inteira)"], "A organização hierárquica das faixas garante que cada pessoa caia em exatamente uma tarifa."),
        p("Associe a faixa condicional à respectiva rota em uma cascata de decisões:", [["Primeiro if verdadeiro","Executa ação do topo e desvia diretamente para a convergência final"],["Primeiro if falso","Encaminha a execução para a avaliação do segundo losango com else if"],["Todos os if/else if falsos","Cai obrigatoriamente no bloco residual de fallback do else final"],["Convergência unificada","Ponto após a cascata onde todos os fluxos se reencontram para a saída"]], "Decisões encadeadas bem projetadas eliminam redundâncias e ambiguidades no software.")
        ]
      },
      {
        id: "js-c02-u4-l4",
        title: "Modelagem de algoritmo de frete e desconto",
        subtitle: "Aplicação · modelagem de fluxo para cálculo de frete e desconto",
        theory: "Integrando conceitos em um caso prático de e-commerce: o algoritmo lê o subtotal e o cupom digitado. Um losango avalia se subtotal >= 100 para aplicar frete grátis (0) ou cobrar frete fixo (15). Em seguida, outro bloco calcula desconto de 10% se o cupom for \"DESC10\", e exibe o total consolidado.",
        questions: [
        q("Qual fórmula calcula corretamente o total final considerando subtotal, valor do frete e desconto?", "total = (subtotal - desconto) + frete", ["total = subtotal * frete * desconto","total = frete - subtotal"], "O desconto abate do subtotal e o frete compõe o custo de envio final."),
        q("Se o subtotal for 120 e o cupom for \"DESC10\" (10% de desconto), qual é o valor final com frete grátis?", "108 (subtotal 120 - desconto 12 + frete 0)", ["120","100"], "10% de 120 é 12; subtraindo do subtotal com frete 0 resulta em exatamente 108.", "const subtotal = 120;\nconst desconto = 12;\nconst frete = 0;\nconsole.log(subtotal - desconto + frete);"),
        q("Se o subtotal for 80 sem cupom e a regra estipula frete 15 para compras abaixo de 100, qual é o total?", "95 (subtotal 80 + frete 15)", ["80","100"], "Como 80 < 100, incide frete de 15, totalizando 95."),
        q("Por que os cálculos de frete e desconto devem ser etapas sequenciais e desacopladas no fluxo?", "Porque facilitam a manutenção e permitem alterar as regras de frete sem quebrar o cálculo do cupom", ["Porque o computador não aguenta calcular duas coisas juntas","Porque o JavaScript proíbe somar e subtrair no mesmo dia"], "A separação de responsabilidades (SoC) em passos desacoplados torna o algoritmo modular e testável."),
        t("Para uma compra de subtotal 100 com frete grátis (0) e sem cupom (0), qual é o total final?", ["100"], "100 - 0 + 0 = 100.", "// Total calculado: ____"),
        g("Complete o cálculo do frete aplicando zero para compras iguais ou superiores a 100:", ["subtotal >= 100 ? 0 : 15"], "O operador ternário resume a decisão binária de frete com elegância.", "const frete = ____;"),
        o("Ordene as etapas completas do algoritmo de checkout de e-commerce no fluxograma:", ["Paralelogramo de entrada: ler subtotal da compra e código de cupom digitado","Losango de decisão: avaliar se subtotal >= 100 para fixar frete em 0 ou 15","Losango de decisão: checar se cupom == \"DESC10\" para calcular 10% de desconto","Retângulo de processamento: calcular total = (subtotal - desconto) + frete","Paralelogramo de saída: exibir o extrato discriminado com o total consolidado"], "Seguir essa linha de montagem garante consistência comercial e precisão fiscal."),
        p("Associe a regra de e-commerce ao respectivo componente no fluxograma:", [["Ler subtotal e cupom","Paralelogramo de Entrada de dados do carrinho"],["subtotal >= 100 ?","Losango de Decisão para definir elegibilidade ao frete grátis"],["desconto = subtotal * 0.10","Retângulo de Processamento com a redução concedida pelo cupom"],["Exibir total final","Paralelogramo de Saída com o valor cobrado do cliente"]], "Modelar regras comerciais complexas com fluxogramas previne distorções de faturamento.")
        ]
      },
      {
        id: "js-c02-u4-l5",
        title: "Validação de integridade e revisão de montagem",
        subtitle: "Revisão e desafio · validação de integridade do fluxograma",
        theory: "A validação de integridade do fluxograma é o ensaio geral antes da codificação. Submetemos o diagrama a uma \"mesa de teste\" (teste de mesa) com valores reais: casos padrão, fronteiras e dados inválidos. Se todos os caminhos alcançam o Fim com resultados previstos, o algoritmo está pronto para o código.",
        questions: [
        q("O que é um \"teste de mesa\" (desk check) na validação de um algoritmo ou fluxograma?", "Simular manualmente no papel a execução passo a passo do fluxo com dados de teste, anotando o estado", ["Usar a mesa física para calibrar o mouse","Um programa antivírus"], "O teste de mesa rastreia variáveis passo a passo confirmando o determinismo antes do código."),
        q("Qual é o primeiro sintoma que o teste de mesa revela quando há um loop infinito no diagrama?", "As setas de fluxo retornam continuamente para um bloco anterior sem que nenhuma condição mude para permitir a saída", ["O papel do desenho pega fogo","O computador perde conexão com a rede"], "Loops infinitos ocorrem quando a condição de término nunca é alcançada pelos dados rastreados."),
        q("Quantos casos de teste no mínimo devem ser aplicados para validar uma bifurcação condicional simples?", "Ao menos dois casos: um que ative o caminho Verdadeiro e outro que ative o caminho Falso", ["Apenas um caso de sucesso","Mil casos idênticos"], "Testar ambas as ramificações comprova que o sistema se comporta conforme o planejado em ambos os desfechos."),
        q("Por que validar a integridade de um algoritmo antes de escrever código é a marca de um desenvolvedor sênior?", "Reduz drasticamente o custo de retrabalho, evitando refatorações caras após o código já estar pronto", ["Porque seniores não usam computadores","Porque fluxogramas são obrigatórios por lei trabalhista"], "Prevenir defeitos na prancheta é ordens de grandeza mais barato do que corrigir bugs em produção."),
        t("Qual termo clássico designa a simulação manual de um algoritmo anotando variáveis em uma tabela?", ["teste de mesa"], "O teste de mesa (desk checking) valida o comportamento do algoritmo na ponta do lápis.", "// Simulacao manual: ____"),
        g("Complete o teste de mesa anotando o valor final de x após o laço de três repetições:", ["3"], "O contador incrementado 3 vezes atinge o valor 3.", "// Teste de mesa: valor final de x = \"____\""),
        o("Ordene os passos para conduzir um teste de mesa rigoroso sobre um fluxograma de decisão:", ["Criar uma tabela com colunas para cada variável e para as condições lógicas","Selecionar um conjunto representativo de dados de teste (comum, borda e inválido)","Percorrer o diagrama bloco a bloco anotando as alterações de valores a cada passo","Confirmar se a saída final obtida coincide rigorosamente com o gabarito esperado"], "A disciplina do teste de mesa garante entrega com zero retrabalho de lógica."),
        p("Associe a anomalia identificada no teste de mesa à sua causa correspondente:", [["Loop infinito","A variável de controle do laço não é incrementada dentro do percurso"],["Resultado indefinido (NaN)","Uma variável foi utilizada no cálculo antes de ser inicializada"],["Ramificação morta","A condição do losango é matematicamente impossível de ser alcançada"],["Teste de mesa aprovado","Todas as saídas batem com as expectativas em todos os cenários de teste"]], "Validar na prancheta antes de codificar é a marca registrada da engenharia de excelência.")
        ]
      }
    ]
  });
})();
