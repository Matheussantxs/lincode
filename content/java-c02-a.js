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

  const lang = 'java';
  const chId = 'java-c02';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    2: [
      {
        id: "jv-c02-u2-l3",
        title: "Transição de estados e atualização de variáveis em Java",
        subtitle: "Aprofundamento · transição de estados e memória de variáveis",
        theory: "Na plataforma Java, variáveis primitivas armazenam valores na pilha de execução (stack). A cada instrução de atribuição, o estado da variável é transformado. Compreender a cronologia sequencial das mutações de variáveis é pré-requisito absoluto para depurar algoritmos.",
        questions: [
        q("Qual valor a variável saldo conterá após: int saldo = 200; saldo += 50; saldo -= 80;?", "170", ["250","200"], "200 + 50 resulta em 250; subtraindo 80 temos o estado final 170.", "int saldo = 200;\nsaldo += 50;\nsaldo -= 80;"),
        q("Qual modificador em Java impede terminantemente qualquer mutação no valor de uma variável?", "final", ["static","volatile"], "A palavra-chave final fixa o valor da variável, impedindo novas atribuições e garantindo imutabilidade."),
        q("O que acontece se tentarmos compilar saldo = 300; quando saldo foi declarado como final int saldo = 100;?", "O compilador javac emite erro informando que a variável final não pode ser reatribuída", ["O Java remove a palavra final automaticamente","O código roda gerando aviso apenas"], "Variáveis marcadas com final são constantes em tempo de compilação e execução."),
        q("Qual operador aritmético combinado multiplica o valor atual da variável e reatribui o resultado?", "*=", ["=+","++="], "O operador *= multiplica o operando atual pelo valor fornecido à direita."),
        t("Qual palavra-chave do Java torna uma variável constante impedindo novas atribuições?", ["final"], "final impede reatribuições, assegurando estabilidade ao identificador.", "// Declaracao imutavel: ____ int LIMITE = 100;"),
        g("Complete o operador combinado que incrementa o valor da variável pontos em 10 unidades:", ["+="], "+= realiza a adição e atribuição simultânea em Java.", "pontos ____ 10;"),
        o("Ordene a evolução temporal dos valores da variável contador no código Java:", ["A variável inteira contador é declarada e inicializada com zero","A instrução contador += 4 eleva o estado da variável para 4","A multiplicação contador *= 3 altera o estado da variável para 12","System.out.println imprime o valor final 12 no console"], "Rastrear a mutação cronológica de variáveis em Java elucida o fluxo de execução."),
        p("Associe o operador de atribuição combinada em Java ao seu respectivo efeito:", [["n += 5","Adiciona cinco unidades ao valor corrente da variável n"],["n -= 3","Subtrai três unidades do valor corrente da variável n"],["n *= 4","Multiplica o valor corrente da variável n por quatro"],["n /= 2","Divide o valor inteiro da variável n por dois"]], "Operadores combinados sintetizam operações aritméticas com legibilidade direta.")
        ]
      },
      {
        id: "jv-c02-u2-l4",
        title: "Algoritmos clássicos de troca e acumuladores em Java",
        subtitle: "Aplicação · algoritmos de troca e acumuladores em Java",
        theory: "Em linguagens de tipagem estática como Java, a troca clássica entre duas variáveis exige uma variável temporária auxiliar do mesmo tipo (int temp = a; a = b; b = temp;). Acumuladores e contadores são estruturas fundamentais para agregar métricas em laços e fluxos.",
        questions: [
        q("Como é realizada a permuta de valores entre duas variáveis inteiras a e b em Java padrão?", "Utilizando uma variável temporária: int temp = a; a = b; b = temp;", ["Atribuindo a = b; b = a;","Chamando o método swap(a, b) nativo da JVM"], "A variável temporária preserva o valor de a antes que este seja sobrescrito pelo valor de b.", "int temp = a;\na = b;\nb = temp;"),
        q("O que acontece ao tentar trocar a e b com as instruções a = b; b = a; em Java?", "O valor original de a é destruído na primeira linha e ambas as variáveis passam a ter o valor de b", ["A troca funciona perfeitamente","O compilador gera erro fatal"], "Sem a variável intermediária temporária, o valor original de a é perdido na atribuição inicial."),
        q("Qual tipo de dado é ideal para um acumulador financeiro de precisão que soma centavos em Java?", "double ou BigDecimal", ["boolean","char"], "Tipos numéricos de ponto flutuante ou BigDecimal são necessários para acumular valores fracionários."),
        q("Qual é o valor inicial convencional para um contador de iterações em algoritmos de percurso?", "0 (zero)", ["1","-1"], "Contadores iniciam convencionalmente em zero para registrar progressivamente cada ocorrência."),
        t("Qual variável temporária de nome comum é utilizada na permuta clássica de valores?", ["temp"], "temp (ou aux) é o nome padrão da indústria para variáveis de permuta.", "int ____ = a; a = b; b = temp;"),
        g("Complete o algoritmo clássico de troca preservando o valor inicial da variável x:", ["temp"], "temp guarda o valor original antes da sobrescrita.", "int temp = x;\nx = y;\ny = ____;"),
        o("Ordene a rotina clássica para somar uma lista de valores com um acumulador em Java:", ["Declarar a variável double soma inicializada com o valor neutro 0.0","Percorrer a coleção de dados recebendo cada valor numérico individual","Somar o valor recebido ao total corrente com soma += valor","Exibir o montante final acumulado formatado através de System.out.printf"], "A mecânica do acumulador é o bloco construtor de agregações financeiras e estatísticas."),
        p("Associe a variável ao seu papel funcional no algoritmo Java:", [["int temp","Variável temporária que retém valores durante operações de troca"],["double acumulador","Variável que reúne a soma cumulativa de valores ao longo do tempo"],["int contador","Variável que registra a contagem incremental de repetições"],["final double TAXA","Constante fixa imutável de referência para os cálculos"]], "Distinguir papéis de variáveis confere clareza estrutural a programas corporativos.")
        ]
      },
      {
        id: "jv-c02-u2-l5",
        title: "Linearidade e dependência de dados em Java",
        subtitle: "Revisão e desafio · linearidade e dependência de passos",
        theory: "Java impõe verificação estática rigorosa de atribuição (definite assignment). O compilador javac rejeita qualquer tentativa de ler uma variável local antes que ela tenha recebido um valor inicial garantido, forçando a ordem lógica dos passos algorítmicos no código-fonte.",
        questions: [
        q("Qual erro o compilador javac emite ao tentar usar uma variável local que nunca foi inicializada?", "variable might not have been initialized", ["NullPointerException","ArrayIndexOutOfBoundsException"], "O javac realiza análise de fluxo e proíbe a leitura de variáveis locais sem valor definitivo."),
        q("Qual é a postura correta ao encadear instruções com dependência de dados em um programa Java?", "Calcular previamente as variáveis de entrada antes de usá-las como argumentos em métodos subsequentes", ["Chamar métodos antes de declarar suas variáveis","Deixar o compilador inicializar números locais com valores aleatórios"], "A relação de causa e efeito exige que insumos estejam prontos antes de serem processados."),
        q("Por que variáveis locais em Java não recebem valores padrão automáticos como 0 ou null?", "Para forçar o programador a declarar explicitamente suas intenções, prevenindo bugs de esquecimento", ["Porque a memória RAM de computadores modernos não suporta zeros","Porque o Java proíbe números pares"], "A obrigatoriedade de inicialização de variáveis locais é uma salvaguarda deliberada de segurança da linguagem."),
        q("Qual sequência expressa a ordem correta para calcular imposto de renda sobre um salário bruto?", "Ler salário bruto -> Deduzir previdência -> Aplicar alíquota sobre base líquida -> Subtrair parcela isenta", ["Subtrair parcela isenta -> Aplicar alíquota -> Ler salário bruto","Deduzir imposto antes de saber o salário"], "A conformidade fiscal depende estritamente da sequência matemática canônica de deduções."),
        t("Qual regra do compilador Java exige que variáveis locais tenham valor antes do uso?", ["definite assignment"], "Definite assignment (atribuição definitiva) é a garantia estática do compilador.", "// Regra de inicializacao: ____"),
        g("Complete a inicialização da variável local para evitar erro de compilação em Java:", ["0"], "Inicializar com zero satisfaz o compilador javac antes de acumulações.", "int total = ____;\ntotal += 15;"),
        o("Ordene a cadeia determinística para calcular a média de consumo de combustível em Java:", ["Declarar e ler a distância total percorrida em quilômetros","Declarar e ler o volume de combustível consumido em litros","Validar se o volume de litros é estritamente maior que zero","Dividir a distância pelos litros calculando o consumo médio (km/l)"], "A validação prévia contra divisão por zero evita exceções aritméticas em tempo de execução."),
        p("Associe a causa ao seu reflexo direto no compilador ou na execução em Java:", [["Leitura de variável local não inicializada","Erro do javac: variable might not have been initialized"],["Divisão inteira por zero (10 / 0)","Exceção em runtime: java.lang.ArithmeticException: / by zero"],["Atribuição a variável final","Erro do javac: cannot assign a value to final variable"],["Execução sequencial canônica","Processamento determinístico e livre de inconsistências de estado"]], "A conformidade estática de Java orienta o programador a escrever código correto por construção.")
        ]
      }
    ],
    3: [
      {
        id: "jv-c02-u3-l1",
        title: "Símbolos gráficos: Terminal e Bloco de Processamento",
        subtitle: "Apresentação · terminal e blocos de processo retangulares",
        theory: "No desenho técnico de fluxogramas (norma ANSI/ISO), o Terminal com cantos arredondados representa os limites físicos de Início e Término do algoritmo. O Retângulo reto simboliza o Bloco de Processamento, no qual ocorrem cálculos matemáticos, transformações e atribuições de variáveis.",
        questions: [
        q("Qual forma geométrica representa os pontos de Início e Fim em um fluxograma de algoritmo?", "Retângulo com cantos arredondados (ou elipse / terminal)", ["Losango","Círculo"], "O terminal oval ou de cantos arredondados demarca onde a execução começa e onde é concluída."),
        q("Qual símbolo é utilizado para indicar operações de cálculo interno e alteração de variáveis?", "Retângulo convencional com cantos retos", ["Paralelogramo","Trapézio"], "Retângulos retos representam passos de processamento interno da máquina."),
        q("O que deve conter o texto dentro de um bloco de processamento em um algoritmo de banco?", "Ações claras de atribuição ou cálculo como \"novoSaldo = saldo + deposito\"", ["Perguntas como \"Qual é o seu nome?\"","Apenas pontos de exclamação"], "Blocos de processamento expressam operações matemáticas e transições de estado concretas."),
        q("Quantos blocos de Início um algoritmo bem estruturado deve apresentar?", "Apenas um ponto de Início", ["Tantos quantos forem os métodos da classe","Nenhum"], "Um fluxo com múltiplos inícios geraria indeterminação sobre onde começar a execução."),
        t("Qual figura geométrica clássica abriga operações de processamento e cálculo em diagramas?", ["retângulo"], "O retângulo delimita ações ativas de cálculo no diagrama.", "// Simbolo de calculo: ____"),
        g("Complete o texto do terminal que indica o encerramento do fluxograma:", ["Fim"], "Fim é a convenção textual universal de encerramento em algoritmos.", "[Terminal: ____]"),
        o("Ordene a estrutura canônica de um fluxograma elementar de cálculo de salário líquido:", ["Terminal de cantos arredondados indicando o Início do fluxo","Paralelogramo de leitura capturando o valor do salário bruto","Retângulo reto de processamento calculando liquido = bruto * 0.86","Terminal de cantos arredondados marcando o Fim do processo"], "Compreender as formas geométricas consolida a documentação visual de engenharia."),
        p("Associe o símbolo de fluxograma ao seu significado semântico padronizado:", [["Terminal (cantos arredondados)","Demarca o Início ou o Fim absoluto do percurso do algoritmo"],["Retângulo de processo","Representa cálculos, operações aritméticas e mutações de dados"],["Seta de fluxo","Indica o sentido direcional da execução rumo ao próximo bloco"],["Texto no bloco","Descreve de forma concisa a instrução matemática ou de controle"]], "A padronização internacional confere uniformidade entre engenheiros e analistas.")
        ]
      },
      {
        id: "jv-c02-u3-l2",
        title: "Paralelogramo de Entrada e Saída de dados",
        subtitle: "Prática guiada · paralelogramo de entrada e saída de dados",
        theory: "A interface com o mundo exterior é ilustrada pelo Paralelogramo. Ele diferencia operações que recebem dados do ambiente externo (como leitura de teclado com Scanner em Java) ou que emitem resultados para o usuário (como System.out.println), isolando E/S de lógica interna.",
        questions: [
        q("Qual forma geométrica inclinada é a convenção para Entrada e Saída (I/O) em fluxogramas?", "Paralelogramo", ["Retângulo reto","Losango"], "O paralelogramo isola operações de entrada e saída de dados de processamentos internos."),
        q("Qual trecho de código Java corresponde exatamente a um paralelogramo de leitura de dados?", "int idade = scanner.nextInt();", ["int dobro = idade * 2;","if (idade >= 18)"], "Ler dados através do Scanner representa a operação de entrada capturada pelo paralelogramo."),
        q("Qual instrução Java é representada graficamente por um paralelogramo de saída?", "System.out.println(\"Resultado: \" + total);", ["int total = 10;","total = a + b;"], "Imprimir na tela é uma operação de saída direcionada ao usuário."),
        q("Por que é crucial separar a entrada e a saída de cálculos internos no desenho do fluxo?", "Porque entradas podem conter dados inválidos que exigem validação prévia antes de cálculos", ["Porque paralelogramos ocupam menos memória","Porque o Java proíbe misturar variáveis"], "Cruzar a fronteira do sistema exige cautela defensiva para não processar dados corrompidos."),
        t("Qual polígono de quatro lados inclinados representa leitura e escrita em diagramas?", ["paralelogramo"], "O paralelogramo é o símbolo internacional de E/S de dados.", "// Simbolo de entrada e saida: ____"),
        g("Complete o paralelogramo de saída exibindo a mensagem comemorativa de aprovação:", ["Aprovado"], "Blocos de saída descrevem os textos ou variáveis mostrados ao usuário.", "[Paralelogramo: Exibir: \"____\"]"),
        o("Ordene a sequência correta de blocos em um algoritmo de conversão de moedas:", ["Terminal Início demarcando a partida da aplicação","Paralelogramo de entrada: Ler valorEmReais e cotacaoDolar","Retângulo de processamento: valorDolar = valorEmReais / cotacaoDolar","Paralelogramo de saída: Exibir valorDolar formatado"], "A separação entre entrada, cálculo e saída garante modularidade ao algoritmo."),
        p("Associe o comando em Java ao seu respectivo símbolo no fluxograma:", [["scanner.nextLine()","Paralelogramo de Entrada (leitura externa pelo teclado)"],["total = preco * quantidade;","Retângulo de Processamento (cálculo aritmético interno)"],["System.out.println(total);","Paralelogramo de Saída (emissão de dados para o usuário)"],["public static void main(...)","Terminal de Início (ponto de partida da execução do programa)"]], "Mapear instruções de Java diretamente para símbolos visuais acelera o aprendizado de algoritmos.")
        ]
      },
      {
        id: "jv-c02-u3-l3",
        title: "O Losango de Decisão e ramificações Sim e Não",
        subtitle: "Aprofundamento · losango de decisão e caminhos verdadeiro/falso",
        theory: "O Losango de Decisão introduz escolhas no algoritmo. Ele abriga uma comparação lógica que resulta em Sim (Verdadeiro) ou Não (Falso). Cada saída deve ser explicitamente rotulada, conduzindo a fluxos alternativos que espelham as instruções if e else em código Java.",
        questions: [
        q("Qual símbolo geométrico é utilizado para representar uma bifurcação condicional com dois caminhos?", "Losango", ["Retângulo reto","Elipse"], "O losango contém a pergunta lógica cujas respostas determinam a direção do fluxo."),
        q("O que deve estar escrito nas duas linhas de fluxo que partem dos vértices de um losango?", "Rótulos claros indicando \"Sim\" (Verdadeiro) e \"Não\" (Falso)", ["Nenhum texto","O nome do compilador"], "Identificar Sim e Não é indispensável para que o fluxo seja determinístico."),
        q("Qual estrutura em linguagem Java corresponde à bifurcação visual modelada por um losango?", "Estrutura condicional if-else", ["Laço for infinito","Declaração package"], "if-else bifurca o fluxo em dois blocos de código mutuamente exclusivos."),
        q("O que deve ser colocado no interior de um losango de teste em um sistema de controle de acesso?", "Uma pergunta lógica ou expressão relacional como \"senhaCorreta == true ?\"", ["Uma atribuição como \"senha = 1234\"","Apenas a palavra \"Java\""], "O losango abriga a avaliação relacional ou booleana que decide o rumo da execução."),
        t("Qual figura geométrica de quatro lados e vértices opostos abriga decisões condicionais?", ["losango"], "O losango é a representação visual universal de decisões booleanas.", "// Simbolo condicional: ____"),
        g("Complete os rótulos de ramificação que partem do losango de teste em um fluxograma:", ["Sim e Nao"], "Rótulos de Sim e Não removem a ambiguidade de caminhos.", "// Saidas do losango: ____"),
        o("Ordene os elementos de um algoritmo de verificação de maioridade no fluxograma:", ["Paralelogramo de entrada com a instrução \"Ler idade\"","Losango de decisão avaliando a condição \"idade >= 18 ?\"","Ramo Sim conduzindo a paralelogramo \"Exibir: Maior de Idade\"","Ramo Não conduzindo a paralelogramo \"Exibir: Menor de Idade\""], "A modelagem com losangos mapeia todas as ramificações de regras de negócio."),
        p("Associe o elemento do bloco de decisão à sua função estrutural:", [["Condição interna","Expressão lógica avaliada como verdadeira ou falsa no losango"],["Ramo Sim","Caminho seguido quando a expressão condicional resulta em true"],["Ramo Não","Caminho seguido quando a expressão condicional resulta em false"],["Convergência de fluxo","Ponto onde os caminhos se reúnem após o tratamento condicional"]], "Modelar bifurcações com rigor previne lacunas em regras corporativas.")
        ]
      },
      {
        id: "jv-c02-u3-l4",
        title: "Conectores circulares e redução de cruzamentos",
        subtitle: "Aplicação · conectores circulares e redução de cruzamentos",
        theory: "Em fluxogramas extensos, traçar linhas que cruzam blocos gera confusão visual. O Conector circular (com letra ou número interno) divide a linha de fluxo em um ponto e a retoma em outro com a mesma identificação, simplificando diagramas com laços de repetição ou múltiplas saídas.",
        questions: [
        q("Qual símbolo geométrico é utilizado como conector para evitar cruzamento de linhas na mesma página?", "Pequeno círculo contendo letra ou número identificador", ["Um triângulo equilátero","Um losango duplo"], "O conector circular quebra linhas longas mantendo a continuidade lógica por identificadores idênticos."),
        q("Como um leitor deve interpretar uma linha de fluxo que termina em um círculo com a letra \"A\"?", "Deve buscar imediatamente no diagrama outro círculo com a letra \"A\" de onde a linha recomeça", ["Deve encerrar o programa","Deve reiniciar o computador"], "Conectores operam em pares como portais lógicos de continuidade do diagrama."),
        q("Por que cruzar linhas de fluxo desordenadamente é prejudicial à documentação de software?", "Aumenta a probabilidade de erros de interpretação por desenvolvedores durante a codificação", ["Aumenta o custo de compilação do javac","Porque o formato PDF não aceita linhas cruzadas"], "A clareza do diagrama reduz custos de comunicação entre arquitetos e programadores."),
        q("Qual conector com formato pentagonal é adotado quando o fluxo deve prosseguir em outra página?", "Conector de fora de página (off-page connector)", ["Terminal oval","Bloco de processo"], "O conector off-page indica que a sequência do diagrama está documentada na página seguinte."),
        t("Qual símbolo gráfico de formato redondo interliga trechos de fluxo sem cruzar linhas?", ["círculo"], "O conector circular despolui diagramas complexos.", "// Conector na mesma pagina: pequeno ____"),
        g("Complete o identificador correspondente para fechar o elo do conector [K]:", ["K"], "Conectores vinculados compartilham rigorosamente o mesmo identificador.", "Origem: [K] -> Destino: [____]"),
        o("Ordene a técnica para substituir uma linha longa e confusa por um par de conectores:", ["Identificar a linha que cruza múltiplos blocos causando ruído visual","Cortar a linha e posicionar um conector circular com o identificador \"C\"","Inserir outro conector com a mesma letra \"C\" junto ao bloco receptor","Ligar a saída do segundo conector à entrada do bloco de destino"], "O uso estratégico de conectores transforma diagramas ilegíveis em documentação profissional."),
        p("Associe o tipo de conector de fluxo à sua aplicação prática no projeto:", [["Conector circular na página","Elimina linhas longas e cruzamentos no mesmo documento"],["Conector off-page","Direciona a continuidade do fluxo para outra folha ou tela"],["Letras em pares (ex: [A] e [A])","Vincula a origem e o destino da conexão sem ambiguidades"],["Linhas com cantos ortogonais","Mantém a geometria do diagrama organizada e elegante"]], "Conectores limpos facilitam a leitura ágil de fluxogramas por equipes inteiras.")
        ]
      },
      {
        id: "jv-c02-u3-l5",
        title: "Padronização ANSI/ISO e revisão de diagramação",
        subtitle: "Revisão e desafio · padronização ANSI e legibilidade de diagramas",
        theory: "A norma ANSI/ISO para fluxogramas estabelece diretrizes de qualidade essenciais: fluxo prioritário de cima para baixo e da esquerda para a direita, ausência de nós órfãos, setas direcionais em todas as linhas e conformidade estrita entre a especificação visual e o código Java.",
        questions: [
        q("Qual é o sentido padrão internacional recomendado para a orientação de fluxogramas?", "De cima para baixo e da esquerda para a direita", ["De baixo para cima em espiral","Apenas da direita para a esquerda"], "A leitura alinha-se ao padrão cognitivo ocidental garantindo interpretação imediata."),
        q("O que a existência de um bloco sem linha de saída no fluxograma acarreta?", "Indica um erro grave de modelagem, pois a execução ficaria travada sem saber onde prosseguir", ["Uma melhoria de performance no Java","Um novo recurso de garbage collection"], "Todo bloco operacional deve obrigatoriamente convergir rumo ao Terminal Fim."),
        q("Por que validar o fluxograma com antecedência protege o cronograma de projetos Java corporativos?", "Detectar falhas de lógica na diagramação é infinitamente mais rápido e barato do que refatorar código Java compilado", ["Porque dispensa a escrita de testes de unidade","Porque o fluxograma compila para bytecode diretamente"], "Erros arquiteturais prevenidos na prancheta economizam dias de depuração em produção."),
        q("O que deve ser colocado obrigatoriamente nas linhas de fluxo que convergem para um mesmo bloco?", "Setas direcionais apontando o sentido do percurso", ["O carimbo do desenvolvedor","A cor verde"], "Setas removem qualquer ambiguidade sobre qual é o próximo passo a ser percorrido."),
        t("Qual conjunto de normas internacionais regula a simbologia padrão de diagramas e fluxogramas?", ["ANSI/ISO"], "A padronização ANSI/ISO garante uniformidade técnica global.", "// Normas de diagramacao: padrao ____"),
        g("Complete o sentido canônico de fluxo de processos técnicos ocidentais:", ["cima para baixo"], "O fluxo deve descer de cima para baixo de forma linear.", "Fluxo principal: de ____"),
        o("Ordene a lista de checagem para auditar a qualidade técnica de um fluxograma Java:", ["Confirmar a existência de um Terminal Início único e bem posicionado no topo","Validar se todos os losangos possuem saídas Sim e Não explicitamente rotuladas","Assegurar que todas as linhas possuem setas indicando o sentido de fluxo","Conferir se todos os caminhos convergem com sucesso para o Terminal Fim"], "A auditoria formal do fluxograma blinda a equipe contra retrabalho de desenvolvimento."),
        p("Associe a regra de ouro de fluxogramas ao seu benefício técnico direto:", [["Sentido top-down","Leitura intuitiva e alinhada ao fluxo sequencial de instruções"],["Setas em todas as linhas","Garante determinismo direcional sem margem para dúvidas"],["Rotulação das decisões","Elimina ambiguidades sobre quais instruções atendem a true e false"],["Convergência para o Fim","Assegura encerramento controlado de todas as rotas do algoritmo"]], "A precisão técnica na diagramação reflete maturidade profissional em engenharia.")
        ]
      }
    ],
    4: [
      {
        id: "jv-c02-u4-l1",
        title: "Do enunciado textual ao rascunho de fluxo",
        subtitle: "Apresentação · do enunciado ao rascunho de fluxo",
        theory: "A construção de software em Java inicia pela tradução de requisitos descritos em linguagem natural para um modelo determinístico. Substantivos indicam variáveis de entrada e saída; verbos sinalizam processamentos e métodos; e conjunções condicionais demarcam losangos de decisão.",
        questions: [
        q("Ao analisar um problema em texto, o que termos como \"calcular média\" ou \"aplicar juros\" representam?", "Retângulos de processamento contendo expressões aritméticas de cálculo", ["Terminais de início","Paralelogramos de leitura"], "Ações ativas de transformação e cálculo pertencem a blocos de processamento."),
        q("O que substantivos como \"valor do empréstimo\", \"número de parcelas\" e \"taxa\" indicam?", "As variáveis de entrada que precisam ser capturadas pelo sistema", ["Os nomes das classes do Java","A pasta de instalação do JDK"], "Substantivos representam os dados de entrada fornecidos ao algoritmo."),
        q("O que expressões como \"se o saldo for positivo\" ou \"caso a idade seja menor que 18\" apontam?", "A necessidade de inserir um losango de decisão condicional", ["A criação de uma interface gráfica","A exclusão do arquivo fonte"], "Conjunções condicionais delimitam bifurcações onde o fluxo precisa tomar rumos distintos."),
        q("Qual é a recomendação ao rascunhar o primeiro desenho de um fluxo de dados complexo?", "Desenhar primeiramente o caminho de sucesso (caminho feliz) e acrescentar validações depois", ["Iniciar tentando colocar 200 blocos sem testar","Começar compilando bytecode"], "Mapear a espinha dorsal do caso de sucesso facilita o refinamento de exceções e bordas."),
        t("Qual classe gramatical de palavras normalmente aponta os dados de entrada em requisitos de software?", ["substantivo"], "Substantivos nomeiam variáveis e parâmetros recebidos pelo algoritmo.", "// Entradas de dados: identificadas por ____"),
        g("Complete o teste condicional no losango para a regra \"se a pontuação for maior que 100\":", ["pontuacao > 100"], "O interior do losango transcreve a regra lógica em formato relacional.", "[Losango: ____ ?]"),
        o("Ordene a metodologia para converter um requisito de negócio em diagrama visual:", ["Ler atentamente a especificação identificando dados de entrada e saídas esperadas","Identificar os pontos de bifurcação e regras de negócio com losangos de decisão","Esboçar o fluxograma sequencial ligando blocos com setas direcionais","Testar o diagrama com valores numéricos para confirmar a aderência à regra"], "A decomposição metódica de enunciados é o pilar da engenharia de requisitos."),
        p("Associe o fragmento textual de requisito ao símbolo gráfico adequado:", [["\"O cliente digita o código do produto\"","Paralelogramo de Entrada (leitura externa)"],["\"Se a quantidade em estoque for zero...\"","Losango de Decisão (bifurcação de fluxo)"],["\"Deduzir quantidade do estoque atual\"","Retângulo de Processamento (cálculo interno)"],["\"Exibir mensagem de confirmação do pedido\"","Paralelogramo de Saída (emissão de mensagem)"]], "Saber decompor prosa em símbolos visuais transforma problemas ambíguos em sistemas exatos.")
        ]
      },
      {
        id: "jv-c02-u4-l2",
        title: "Identificação de pré-condições e casos de borda",
        subtitle: "Prática guiada · identificação de precondições e fronteiras",
        theory: "Casos de borda (edge cases) testam os limites exatos das regras de negócio (como subtotal igual a 100 em regras de >= 100). Em Java, validar pré-condições logo na entrada do método (princípio fail-fast) impede que dados inconsistentes provoquem exceções em etapas posteriores.",
        questions: [
        q("Em uma regra de negócio que concede desconto para compras de R$ 100 ou mais, qual valor é a fronteira crítica?", "Exatamente R$ 100,00", ["R$ 1.000,00","R$ 0,00"], "Valores exatos de limite testam se o algoritmo utiliza >= (correto) ou > (incorreto)."),
        q("O que é uma pré-condição em um método de transferência bancária em Java?", "Uma condição obrigatória que deve ser satisfeita antes de transferir (ex: valor > 0 && saldo >= valor)", ["O modelo do processador do servidor","A cor da fonte no terminal"], "Pré-condições garantem que a operação só seja iniciada se os parâmetros forem seguros e válidos."),
        q("O que o algoritmo deve fazer se a quantidade de produtos informada for negativa (-2)?", "Rejeitar a entrada imediatamente com mensagem de erro defensiva antes de alterar o estoque", ["Aceitar e somar dois produtos ao estoque","Desligar o banco de dados"], "Rejeitar precocemente dados anômalos (fail-fast) protege a integridade transacional do sistema."),
        q("Por que testar valores imediatamente vizinhos à borda (como 99.99 e 100.01) é mandatório?", "Porque erros de comparação com sinais trocados (< versus <=) são frequentes nesses pontos", ["Porque números decimais quebram a memória RAM","Porque o compilador exige testes com centavos"], "Erros de off-by-one em fronteiras de faixas são responsáveis pela maior parte dos bugs contábeis."),
        t("Qual princípio arquitetural prega rejeitar dados inválidos logo na entrada antes de prosseguir?", ["fail-fast"], "O princípio fail-fast falha rápido e com clareza ao menor sinal de inconsistência.", "// Principio defensivo: ____"),
        g("Complete a validação que protege o método contra valores de depósito negativos ou nulos:", ["deposito <= 0"], "Bloquear depósitos não positivos protege a regra contábil.", "if (____) { throw new IllegalArgumentException(\"Valor invalido\"); }"),
        o("Ordene os passos de um algoritmo defensivo com validação rigorosa de pré-condições:", ["Ler os parâmetros de entrada fornecidos pelo usuário no início","Avaliar em um losango de decisão se os dados atendem às pré-condições mínimas","Se inválidos (Não): emitir mensagem de alerta e conduzir ao Terminal Fim","Se válidos (Sim): prosseguir com segurança para as rotinas de cálculo do negócio"], "Validar na entrada blinda as rotinas de processamento de regras complexas."),
        p("Associe o dado de teste à sua função na verificação de limites do algoritmo:", [["Valor exato de corte (100.00)","Testa a fronteira exata e a inclusão correta com operador >= ou <="],["Valor imediatamente abaixo (99.99)","Testa se a condição não está englobando valores não autorizados"],["Valor negativo (-50.00)","Testa o bloqueio preventivo de pré-condição contra entradas absurdas"],["Valor intermediário típico (250.00)","Testa o caminho comum regular da regra de negócio"]], "Projetar testes de borda assegura que nenhuma falha oculta passe despercebida para a produção.")
        ]
      },
      {
        id: "jv-c02-u4-l3",
        title: "Encadeamento de bifurcações e decisões compostas",
        subtitle: "Aprofundamento · encadeamento de bifurcações sem ambiguidades",
        theory: "Quando um problema possui múltiplos critérios excludentes (como escalonamento tributário ou classificação de clientes), conectamos losangos sucessivos. O ramo \"Não\" do primeiro losango conduz ao teste do losango seguinte, traduzindo-se fielmente na estrutura if-else if-else em Java.",
        questions: [
        q("Como modelamos em fluxograma uma classificação com quatro faixas salariais excludentes?", "Encadeando três losangos sucessivos, onde cada ramo \"Não\" conduz ao teste da faixa seguinte", ["Colocando quatro retângulos paralelos sem losangos","Desenhando um círculo com quatro setas"], "Bifurcações encadeadas avaliam faixas em cascata de forma determinística e hierárquica."),
        q("Qual estrutura em Java espelha perfeitamente a cascata sequencial de losangos de decisão?", "if (...) { ... } else if (...) { ... } else { ... }", ["switch com break obrigatório em strings","while loop simples"], "if-else if modela a árvore binária de decisões excludentes no código Java."),
        q("O que acontece se uma faixa mais ampla for colocada antes de uma faixa mais restrita na cascata?", "A faixa ampla interceptará valores que pertenciam à faixa restrita, gerando cálculos incorretos", ["O compilador javac gera erro de compilação","A máquina virtual encerra a aplicação"], "A hierarquia deve avaliar condições mais específicas primeiro para evitar captura indevida de dados."),
        q("Qual é o papel do bloco else final após uma sequência de verificações com else if em Java?", "Fornecer uma rota padrão de contingência para qualquer dado que não atenda às faixas anteriores", ["Apagar as variáveis da memória","Reiniciar o método main"], "O else final cobre o universo residual de casos, garantindo cobertura total de cenários."),
        t("Qual estrutura de controle de duas palavras encadeia novas condições no fluxo condicional Java?", ["else if"], "else if permite testar uma condição alternativa caso a anterior tenha sido falsa.", "if (x > 10) {} ____ (x > 5) {}"),
        g("Complete o encadeamento categorizando notas iguais ou superiores a 9 como \"Excelente\":", ["else if (nota >= 9)"], "else if avalia a faixa subsequente após a primeira comparação falhar.", "if (nota == 10) { res = \"Perfeito\"; } ____ { res = \"Excelente\"; }"),
        o("Ordene as faixas de um cálculo progressivo de imposto do menor para o maior limite:", ["Avaliar se o rendimento está dentro da faixa de isenção tributária","Avaliar na ramificação Não se o rendimento enquadra-se na primeira alíquota","Avaliar na ramificação Não subsequente se atinge a segunda alíquota progressiva","Aplicar a alíquota teto no bloco residual de contingência final do else"], "Organizar faixas em ordem lógica evita cruzamentos indevidos de alíquotas."),
        p("Associe a ramificação de cascata ao seu respectivo desfecho operacional em Java:", [["Primeira condição verdadeira","Executa o bloco imediato e pula todas as verificações inferiores"],["Condições intermediárias","Avaliadas sucessivamente por blocos else if caso as anteriores falhem"],["Nenhuma condição satisfeita","Executa compulsoriamente as instruções do bloco residual else"],["Ponto de unificação final","Reúne os caminhos após o término de toda a estrutura if-else"]], "Decisões encadeadas bem projetadas conferem robustez a sistemas empresariais.")
        ]
      },
      {
        id: "jv-c02-u4-l4",
        title: "Modelagem de algoritmo de frete e desconto em Java",
        subtitle: "Aplicação · modelagem de fluxo para cálculo de frete e desconto",
        theory: "Consolidando a diagramação em um algoritmo de checkout em Java: o fluxo lê subtotal e cupom; avalia se subtotal >= 100 para aplicar frete grátis (0) ou cobrança fixa (15); avalia se o cupom é \"DESC10\" para deduzir 10%; calcula total = subtotal - desconto + frete; e exibe o extrato final.",
        questions: [
        q("Qual fórmula em Java calcula o montante final da compra com subtotal, desconto e frete?", "double total = (subtotal - desconto) + frete;", ["double total = subtotal * frete - desconto;","double total = frete - subtotal;"], "O desconto é subtraído do subtotal das mercadorias e o frete é somado ao montante de envio."),
        q("Se subtotal for 150.0 e o cupom for \"DESC10\" (10% de desconto), qual é o total com frete grátis?", "135.0 (subtotal 150 - desconto 15 + frete 0)", ["150.0","140.0"], "10% de 150 é 15; 150 menos 15 resulta em 135 com frete zerado.", "double subtotal = 150.0;\ndouble desconto = 15.0;\ndouble frete = 0.0;\nSystem.out.println(subtotal - desconto + frete);"),
        q("Se subtotal for 60.0 sem cupom e a regra estipula frete 15.0 para compras abaixo de 100, qual é o total?", "75.0 (subtotal 60.0 + frete 15.0)", ["60.0","100.0"], "Como 60 < 100, o frete de 15.0 incide integralmente, totalizando 75.0."),
        q("Qual método da classe String em Java deve ser utilizado para comparar o código do cupom sem erros?", "cupom.equals(\"DESC10\")", ["cupom == \"DESC10\"","cupom.compare(\"DESC10\")"], "Em Java, a comparação de conteúdo de strings deve ser feita com equals(), não com o operador ==."),
        t("Qual método da classe String deve ser invocado em Java para comparar o conteúdo de textos?", ["equals"], "O método equals() compara o conteúdo das strings caractere por caractere.", "if (cupom.____(\"DESC10\")) { ... }"),
        g("Complete o cálculo ternário do frete em Java concedendo isenção para compras a partir de 100:", ["subtotal >= 100 ? 0.0 : 15.0"], "O operador ternário condensa decisões binárias simples de cálculo.", "double frete = ____;"),
        o("Ordene a esteira de execução de um checkout de compras em console Java:", ["Paralelogramo de entrada: ler subtotal com scanner.nextDouble() e cupom com next()","Losango de decisão: checar se subtotal >= 100 definindo frete como 0.0 ou 15.0","Losango de decisão: checar cupom.equals(\"DESC10\") para calcular desconto de 10%","Retângulo de processamento: calcular total = subtotal - desconto + frete","Paralelogramo de saída: imprimir extrato formatado com System.out.printf"], "Essa arquitetura estruturada garante precisão comercial e ausência de bugs de cálculo."),
        p("Associe a regra de checkout à sua respectiva representação no fluxograma:", [["Ler subtotal e cupom","Paralelogramo de Entrada capturando valores digitados pelo cliente"],["subtotal >= 100.0 ?","Losango de Decisão para elegibilidade à isenção do frete"],["desconto = subtotal * 0.10","Retângulo de Processamento com a redução conferida pelo cupom"],["System.out.printf(...)","Paralelogramo de Saída apresentando o valor total consolidado"]], "A clareza dos passos desacoplados simplifica a implementação e os testes em Java.")
        ]
      },
      {
        id: "jv-c02-u4-l5",
        title: "Validação de integridade e teste de mesa em Java",
        subtitle: "Revisão e desafio · validação de integridade do fluxograma",
        theory: "A validação de integridade do fluxograma culmina no teste de mesa (desk checking): simular a execução com uma tabela contendo colunas para variáveis (subtotal, frete, desconto, total) e condições booleanas. Esse ensaio manual garante que todos os casos cheguem ao Fim com precisão matemática.",
        questions: [
        q("O que caracteriza a técnica de \"teste de mesa\" aplicada a um fluxograma de algoritmo?", "Executar manualmente no papel cada instrução do diagrama com dados simulados, rastreando variáveis", ["Testar se o computador suporta o peso da tela","Uma ferramenta de benchmarking da JVM"], "O teste de mesa verifica a consistência do algoritmo na ponta do lápis antes de digitar código."),
        q("O que indica se durante o teste de mesa uma variável é lida antes de ter recebido qualquer valor?", "Um defeito grave de dependência de dados que em Java causaria erro de compilação ou cálculo incorreto", ["Uma otimização recomendada","Um recurso de computação concorrente"], "Variáveis devem ser estritamente inicializadas antes de serem consumidas em expressões."),
        q("Quantos cenários de teste no mínimo devem ser aplicados para auditar um losango condicional simples?", "Dois cenários: um que produza resultado Verdadeiro e outro que produza Falso", ["Apenas um cenário","Nenhum cenário"], "Auditar os dois caminhos comprova que ambas as rotas operam conforme a especificação do sistema."),
        q("Por que a prática do teste de mesa é amplamente incentivada na formação de engenheiros de software?", "Desenvolve o raciocínio determinístico e reduz drasticamente o tempo gasto em depurações em produção", ["Porque o Java não possui depurador","Porque testes automatizados são proibidos"], "Compreender o percurso exato das instruções forma profissionais analíticos e resolutivos."),
        t("Qual prática manual clássica simula o percurso do algoritmo anotando valores em uma tabela?", ["teste de mesa"], "O teste de mesa rastreia a evolução das variáveis passo a passo.", "// Validacao manual: ____"),
        g("Complete o teste de mesa anotando o valor final de total para subtotal 80 e frete 15:", ["95"], "80 + 15 resulta em 95.", "// Resultado final do teste de mesa: \"____\""),
        o("Ordene os passos para conduzir um teste de mesa rigoroso sobre um algoritmo:", ["Construir a tabela com colunas para cada variável, entrada, cálculo e condição","Definir os casos de teste contemplando caminho feliz, limites e dados inválidos","Percorrer bloco a bloco anotando a evolução exata de cada variável a cada linha","Comparar as saídas obtidas na tabela com os resultados formalmente especificados"], "A disciplina do teste de mesa comprova o determinismo absoluto do algoritmo."),
        p("Associe a constatação do teste de mesa à sua causa técnica correspondente:", [["Loop interminável na tabela","A condição do laço nunca se torna falsa para permitir a saída"],["Divisão por zero detectada","Ausência de pré-condição validando se o denominador é maior que zero"],["Valor incorreto na fronteira","Operador relacional equivocado no losango (> em vez de >=)"],["Gabarito 100% conferido","Algoritmo validado e perfeitamente pronto para implementação em código"]], "A validação estrutural na prancheta é o maior escudo de qualidade em engenharia de software.")
        ]
      }
    ]
  });
})();
