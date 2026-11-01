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

  const lang = 'cpp';
  const chId = 'cpp-c02';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    2: [
      {
        id: "cpp-c02-u2-l3",
        title: "Transição de estados e mutação de variáveis em C++",
        subtitle: "Aprofundamento · transição de estados e memória de variáveis",
        theory: "Em C++, variáveis locais ocupam espaço físico direto na pilha da função (stack frame). Atribuições modificam os bytes correspondentes na memória em tempo de execução. Já o qualificador const impede alterações posteriores, fixando o valor do identificador com total segurança.",
        questions: [
        q("Qual valor a variável inteira saldo armazenará após: int saldo = 150; saldo += 50; saldo -= 30;?", "170", ["200","150"], "150 mais 50 totaliza 200; deduzindo 30 temos o estado final 170.", "int saldo = 150;\nsaldo += 50;\nsaldo -= 30;"),
        q("Qual palavra-chave do C++ torna uma variável imutável, gerando erro de compilação se houver nova atribuição?", "const", ["static","volatile"], "const declara imutabilidade e integridade para o identificador no código."),
        q("O que acontece ao tentar compilar taxa = 0.20; se taxa foi declarada como const double taxa = 0.10;?", "O compilador g++ emite erro informando que a variável é somente leitura (read-only)", ["O compilador aceita e altera o valor","O programa roda mais rápido"], "Atribuir a uma variável const é barrado estaticamente pelo compilador."),
        q("Qual operador aritmético combinado multiplica o valor corrente da variável inteira por dois em C++?", "*=", ["=+","++="], "O operador *= multiplica o valor atual da variável pelo operando fornecido à direita."),
        t("Qual qualificador de tipo torna variáveis imutáveis e protegidas contra atribuição em C++?", ["const"], "const fixa o valor do dado na compilação e execução.", "// Variavel imutavel: ____ int LIMITE = 50;"),
        g("Complete o operador combinado que deduz 10 unidades da variável de estoque:", ["-="], "O operador -= subtrai e reatribui na mesma operação.", "estoque ____ 10;"),
        o("Ordene a evolução temporal dos valores da variável contador no código C++:", ["A variável inteira contador é declarada e inicializada com o valor zero","A instrução contador += 6 eleva o valor do estado para 6","A multiplicação contador *= 2 atualiza o estado para 12","std::cout imprime o valor final 12 no terminal de controle"], "Rastrear a mutação cronológica na pilha elucida a mecânica de execução do C++."),
        p("Associe o operador de atribuição combinada em C++ ao seu respectivo efeito:", [["n += 8;","Adiciona oito unidades ao valor corrente da variável n"],["n -= 4;","Subtrai quatro unidades do valor corrente da variável n"],["n *= 5;","Multiplica o valor corrente da variável n por cinco"],["n /= 2;","Divide o valor inteiro da variável n por dois"]], "Operadores combinados unem clareza sintática e geração eficiente de assembly.")
        ]
      },
      {
        id: "cpp-c02-u2-l4",
        title: "Algoritmos clássicos de troca e acumuladores em C++",
        subtitle: "Aplicação · algoritmos de troca e acumuladores em C++",
        theory: "Em C++, a função std::swap (do cabeçalho <utility>) realiza a troca otimizada entre duas variáveis utilizando semântica de movimento. No algoritmo clássico, uma variável temporária temp evita a perda destrutiva do valor original durante a cópia.",
        questions: [
        q("Qual função da biblioteca padrão C++ realiza a troca eficiente entre duas variáveis com semântica de movimento?", "std::swap(a, b);", ["std::exchange(a, b);","std::replace(a, b);"], "std::swap troca os valores das variáveis de forma rápida sem cópias desnecessárias.", "#include <utility>\nstd::swap(a, b);"),
        q("No algoritmo clássico manual de troca, por que precisamos de uma variável auxiliar temp?", "Para reter o valor original da primeira variável antes que ele seja sobrescrito pelo valor da segunda", ["Para evitar vazamento de memória","Para aumentar a velocidade do disco"], "Sem a variável intermediária, a atribuição a = b destruiria o valor de a antes da passagem para b."),
        q("Qual cabeçalho da biblioteca padrão C++ declara a função utilitária std::swap?", "#include <utility> (ou <algorithm>)", ["#include <iostream>","#include <string>"], "<utility> fornece funções essenciais de sistema e utilitários fundamentais como std::swap."),
        q("Qual valor inicial neutro deve ser atribuído a um acumulador que somará valores em C++?", "0 (zero)", ["1","-1"], "Zero é o elemento neutro da adição aritmética em qualquer algoritmo de consolidação."),
        t("Qual função da biblioteca padrão C++ troca os valores de duas variáveis?", ["std::swap"], "std::swap é a função padrão para permuta de valores em C++.", "// Trocar valores: ____(x, y);"),
        g("Complete o algoritmo clássico de troca preservando o valor inicial da variável a:", ["temp"], "temp preserva o dado original durante a troca.", "int temp = a;\na = b;\nb = ____;"),
        o("Ordene as instruções para acumular o total de despesas em uma variável com C++:", ["Declarar a variável double totalDespesas inicializada com 0.0","Receber cada valor financeiro individual através de std::cin","Somar o valor lido ao acumulador através de totalDespesas += valor","Emitir o montante final acumulado formatado através de std::cout"], "A mecânica do acumulador é o alicerce de processamento de séries numéricas."),
        p("Associe a técnica de troca ao seu respectivo comportamento operacional em C++:", [["std::swap(a, b)","Troca idiomática da STL utilizando semântica de movimento otimizada"],["int temp = a;","Armazenamento temporário na pilha da troca algorítmica clássica"],["double soma = 0.0;","Acumulador de ponto flutuante inicializado com o elemento neutro"],["const int TETO","Constante imutável de referência para delimitar o acumulador"]], "Dominar padrões de troca e acumulação é a base da programação algorítmica em C++.")
        ]
      },
      {
        id: "cpp-c02-u2-l5",
        title: "Linearidade e dependência de dados em C++",
        subtitle: "Revisão e desafio · linearidade e dependência de passos",
        theory: "Em C++, ler uma variável primitiva local não inicializada resulta em Comportamento Indefinido (Undefined Behavior), lendo lixo de memória residual da pilha. A ordem estrita de inicialização antes do uso é a primeira regra de sobrevivência do programador C++.",
        questions: [
        q("O que acontece se lermos uma variável local inteira antes de inicializá-la como em int x; std::cout << x;?", "Ocorre Comportamento Indefinido (Undefined Behavior), exibindo lixo imprevisível de memória", ["O valor é sempre zero","O compilador apaga o arquivo"], "C++ não zera variáveis locais na pilha por padrão em nome da performance, gerando leituras espúrias."),
        q("Qual flag do compilador g++ avisa sobre o uso perigoso de variáveis locais não inicializadas?", "-Wuninitialized (ou parte de -Wall)", ["-O0","-s"], "As flags -Wall e -Wextra alertam precocemente sobre leituras de variáveis sem inicialização."),
        q("Qual é a recomendação de modernidade do C++ sobre onde declarar e inicializar variáveis?", "Declarar a variável o mais próximo possível do seu primeiro uso, inicializando-a imediatamente", ["Declarar todas as variáveis na primeira linha do arquivo sem valor","Usar variáveis globais para tudo"], "Declarar próximo ao uso com inicialização imediata previne escopos zumbis e acessos a lixo."),
        q("Qual sequência expressa a ordem correta para calcular a energia cinética de um projétil (E = m * v^2 / 2)?", "Ler massa -> Ler velocidade -> Calcular velocidade ao quadrado -> Multiplicar pela massa e dividir por dois", ["Calcular energia -> Ler massa -> Ler velocidade","Dividir por dois antes de saber a massa"], "A dependência dos operandos na fórmula física impõe a cronologia rigorosa dos passos."),
        t("Qual termo em inglês descreve a execução imprevisível por leitura de memória não inicializada em C++?", ["Undefined Behavior"], "Undefined Behavior (comportamento indefinido) é o estado anômalo onde o padrão não garante nada.", "// Risco critico: ____"),
        g("Complete a declaração com inicialização imediata por chaves (uniform initialization) em C++:", ["{}"], "A inicialização por chaves {} zera o valor por padrão com segurança.", "int contador____; // Inicializado com zero"),
        o("Ordene os passos sequenciais para calcular o valor de uma viagem rodoviária em C++:", ["Declarar e inicializar a distância em km e o consumo médio do veículo","Calcular a quantidade de litros necessários dividindo distância por consumo","Multiplicar os litros pelo preço unitário do combustível obtendo o custo","Imprimir o custo estimado da viagem no console com std::cout"], "Seguir a sequência canônica de pré-requisitos impede cálculos com dados incompletos."),
        p("Associe a falha de fluxo ao seu sintoma correspondente em C++:", [["Leitura de variável não inicializada","Undefined Behavior: exibe lixo de memória e gera avisos de -Wall"],["Divisão inteira por zero","Crash imediato do processo por sinal SIGFPE (Floating Point Exception)"],["Atribuição a const","Erro fatal de compilação: assignment of read-only variable"],["Inicialização uniforme (int x{0})","Garante estado seguro e previne conversões estreitas (narrowing)"]], "A disciplina de inicialização imediata é a muralha defensiva do desenvolvedor C++.")
        ]
      }
    ],
    3: [
      {
        id: "cpp-c02-u3-l1",
        title: "Símbolos gráficos: Terminal e Bloco de Processamento",
        subtitle: "Apresentação · terminal e blocos de processo retangulares",
        theory: "No desenho técnico de algoritmos (norma ANSI/ISO), o Terminal oval representa os limites de Início e Término da execução. O Retângulo convencional representa o Bloco de Processamento, no qual residem cálculos matemáticos nativos, mutações de estado e transformações numéricas.",
        questions: [
        q("Qual forma geométrica representa os limites de Início e Fim em um fluxograma de software?", "Retângulo com cantos arredondados (ou elipse / terminal)", ["Triângulo","Pentágono"], "O terminal oval delimita onde o algoritmo começa e onde ele se encerra."),
        q("Qual símbolo geométrico é convencionado para indicar operações de cálculo e processamento interno?", "Retângulo com cantos retos", ["Círculo pequeno","Losango"], "Retângulos retos abrigam instruções aritméticas e transformações de estado da máquina."),
        q("O que deve estar escrito no interior de um bloco de processamento em um algoritmo de física?", "Expressões de cálculo como \"velocidade = distancia / tempo\" ou \"forca = massa * aceleracao\"", ["Apenas o nome do autor","Uma pergunta com ponto de interrogação"], "Processamentos expressam instruções matemáticas e mutações de variáveis concretas."),
        q("Quantos terminais de Início um diagrama determinístico deve apresentar?", "Apenas um ponto de Início", ["Quantos arquivos tiverem no projeto","Nenhum"], "Um fluxo com múltiplos inícios geraria incerteza sobre o ponto de partida do sistema."),
        t("Qual símbolo de quatro lados retos abriga operações de cálculo e processamento?", ["retângulo"], "O retângulo delimita ações de cálculo e atribuição interna.", "// Simbolo de processamento: ____"),
        g("Complete o texto do terminal que demarca a conclusão do percurso do fluxograma:", ["Fim"], "Fim é a convenção textual para término de fluxogramas.", "[Terminal: ____]"),
        o("Ordene a estrutura canônica de um fluxograma elementar de cálculo do triplo de um número:", ["Terminal de cantos arredondados demarcando o Início do fluxo","Paralelogramo de leitura capturando o número informado","Retângulo reto de processamento calculando triplo = numero * 3","Terminal de cantos arredondados finalizando com a palavra Fim"], "A clareza dos símbolos visuais facilita a comunicação interdisciplinar em equipes técnicas."),
        p("Associe a forma geométrica do fluxograma ao seu papel semântico oficial:", [["Terminal (cantos arredondados)","Demarca o Início ou o Término absoluto da execução"],["Retângulo com cantos retos","Processamento interno: cálculos, transformações e atribuições"],["Linha com seta direcionada","Indica o sentido direcional da execução rumo ao próximo passo"],["Texto no bloco","Descreve de forma concisa e direta a instrução executada"]], "A padronização internacional confere uniformidade à documentação de sistemas.")
        ]
      },
      {
        id: "cpp-c02-u3-l2",
        title: "Paralelogramo de Entrada e Saída de dados",
        subtitle: "Prática guiada · paralelogramo de entrada e saída de dados",
        theory: "A interface com o mundo exterior é ilustrada pelo Paralelogramo. Ele distingue operações que capturam dados de fora (como std::cin >> valor no C++) ou que projetam informações no console (como std::cout << total), isolando a entrada e saída das operações de cálculo interno.",
        questions: [
        q("Qual forma geométrica inclinada é a convenção oficial para Entrada e Saída em fluxogramas?", "Paralelogramo", ["Retângulo reto","Trapézio"], "O paralelogramo isola operações de I/O de processamentos internos de cálculo."),
        q("Qual trecho de código C++ corresponde a um paralelogramo de leitura de dados?", "std::cin >> valorEntrada;", ["int dobro = valor * 2;","if (valor > 10)"], "std::cin consome dados fornecidos pelo usuário no canal de entrada padrão."),
        q("Qual instrução C++ é representada graficamente por um paralelogramo de saída?", "std::cout << \"Resultado: \" << total << '\\n';", ["double total = 100.0;","total = subtotal - desconto;"], "std::cout projeta dados calculados para o terminal do usuário."),
        q("Por que é essencial diferenciar blocos de entrada de blocos de processamento no diagrama?", "Porque dados de entrada vêm de fontes externas imprevisíveis e exigem validação prévia", ["Porque paralelogramos ocupam menos memória","Porque o compilador C++ exige paralelogramos"], "Operações de E/S tocam fronteiras externas e requerem atenção defensiva contra dados maliciosos."),
        t("Qual polígono inclinado de quatro lados representa leitura e escrita em fluxogramas?", ["paralelogramo"], "O paralelogramo demarca operações de comunicação externa.", "// Simbolo de entrada e saida: ____"),
        g("Complete o paralelogramo de saída emitindo a confirmação de cálculo no terminal:", ["Calculo Concluido"], "Blocos de saída contêm o texto ou variável exibida.", "[Paralelogramo: Exibir: \"____\"]"),
        o("Ordene os blocos de um fluxograma para calcular a área de um círculo em C++:", ["Terminal Início demarcando o começo da execução","Paralelogramo de entrada: Ler raio através de std::cin","Retângulo de processamento: calcular area = 3.14159 * raio * raio","Paralelogramo de saída: Exibir area através de std::cout"], "A separação sistemática entre entrada, cálculo e saída garante código modular."),
        p("Associe o comando do C++ ao respectivo símbolo de fluxograma:", [["std::cin >> x;","Paralelogramo de Entrada (leitura externa digitada pelo usuário)"],["std::cout << total;","Paralelogramo de Saída (emissão de dados e relatórios na tela)"],["area = base * altura;","Retângulo de Processamento (cálculo aritmético interno)"],["int main()","Terminal de Início (ponto de entrada da aplicação executável)"]], "Mapear fluxos de I/O aos símbolos visuais torna a lógica do programa transparente.")
        ]
      },
      {
        id: "cpp-c02-u3-l3",
        title: "O Losango de Decisão e ramificações Sim e Não",
        subtitle: "Aprofundamento · losango de decisão e caminhos verdadeiro/falso",
        theory: "O Losango de Decisão introduz escolhas ao fluxo algorítmico. Ele abriga uma expressão lógica que avalia como Verdadeira ou Falsa. Cada vértice de saída deve ser rotulado com Sim e Não, guiando para rotas alternativas que correspondem às estruturas if e else em código C++.",
        questions: [
        q("Qual símbolo gráfico é utilizado para representar uma bifurcação condicional com dois caminhos?", "Losango", ["Retângulo reto","Elipse"], "O losango abriga a comparação relacional ou booleana que direciona o fluxo."),
        q("O que deve constar obrigatoriamente nas duas saídas que partem de um losango de decisão?", "Rótulos claros indicando \"Sim\" (Verdadeiro) e \"Não\" (Falso)", ["Nenhum texto","O horário do sistema"], "Identificar Sim e Não é imperativo para eliminar qualquer ambiguidade no percurso."),
        q("Qual estrutura em C++ traduz diretamente a bifurcação gráfica desenhada em um losango?", "Estrutura condicional if-else", ["Declaração namespace","Diretiva #include"], "if-else bifurca o fluxo em dois caminhos exclusivos de acordo com a condição lógica."),
        q("O que deve ser colocado no interior de um losango de teste em um sistema de controle de caldeiras?", "Uma pergunta condicional como \"temperatura > 100.0 ?\"", ["Uma instrução de alocação de memória","Apenas a palavra \"C++\""], "O interior do losango expressa a comparação lógica que resulta em verdadeiro ou falso."),
        t("Qual símbolo de quatro lados pontiagudos abriga bifurcações condicionais em fluxogramas?", ["losango"], "O losango avalia condições direcionando para rotas alternativas.", "// Simbolo condicional: ____"),
        g("Complete os rótulos obrigatórios de saída que partem de um losango condicional:", ["Sim e Nao"], "Rótulos explícitos de Sim e Não conferem determinismo ao diagrama.", "// Rotulos de saida do losango: ____"),
        o("Ordene os elementos de um algoritmo de alarme de temperatura no fluxograma:", ["Paralelogramo de entrada com a instrução \"Ler temperaturaAtual\"","Losango de decisão avaliando a condição \"temperaturaAtual > 80.0 ?\"","Ramo Sim conduzindo a saída \"Exibir: ALERTA DE SUPERAQUECIMENTO\"","Ramo Não conduzindo a saída \"Exibir: Temperatura Normal\""], "A modelagem gráfica com losangos cobre caminhos de operação segura e emergencial."),
        p("Associe o elemento do bloco condicional ao seu papel estrutural em C++:", [["Condição interna no losango","Expressão booleana testada nos parênteses do if (ex: pressao > 50)"],["Ramo Sim","Bloco de chaves executado quando a condição for verdadeira"],["Ramo Não","Bloco de chaves do else executado quando a condição for falsa"],["Ponto de unificação de fluxo","Instrução após o fechamento do bloco condicional"]], "Modelar bifurcações com rigor previne falhas em sistemas de tempo real.")
        ]
      },
      {
        id: "cpp-c02-u3-l4",
        title: "Conectores circulares e redução de cruzamentos",
        subtitle: "Aplicação · conectores circulares e redução de cruzamentos",
        theory: "Em fluxogramas complexos, linhas extensas cruzando blocos prejudicam a leitura. O Conector circular (com letra ou número interno) divide a linha de fluxo em um ponto e a retoma em outro com a mesma identificação, simplificando diagramas com laços de repetição ou múltiplas saídas.",
        questions: [
        q("Qual símbolo é utilizado para evitar cruzamento de linhas de fluxo na mesma página?", "Pequeno círculo contendo letra ou número identificador (conector)", ["Um quadrado tracejado","Um triângulo"], "O conector circular quebra linhas longas mantendo a continuidade lógica por identificadores idênticos."),
        q("Como o desenvolvedor deve interpretar uma linha de fluxo que termina no círculo rotulado com \"C\"?", "Deve localizar no diagrama outro círculo rotulado com \"C\" de onde a linha recomeça", ["Deve abortar a execução do programa","Deve apagar o executável"], "Conectores operam em pares como portais lógicos de continuidade do diagrama."),
        q("Por que cruzar linhas de fluxo desordenadamente é prejudicial à documentação de software?", "Gera poluição visual e aumenta a probabilidade de erros de interpretação na codificação", ["Aumenta o tempo de compilação do g++","Porque diagramas com linhas cruzadas são ilegais"], "A clareza do diagrama reduz custos de comunicação entre arquitetos e programadores."),
        q("Qual conector com formato pentagonal é adotado quando o fluxo deve prosseguir em outra página?", "Conector de fora de página (off-page connector)", ["Terminal oval","Bloco de processo"], "O conector off-page indica que a sequência do diagrama está documentada na página seguinte."),
        t("Qual símbolo gráfico de formato redondo interliga trechos de fluxo sem cruzar linhas?", ["círculo"], "O conector circular despolui diagramas complexos.", "// Conector na mesma pagina: pequeno ____"),
        g("Complete o identificador correspondente para fechar o elo do conector [Z]:", ["Z"], "Conectores vinculados compartilham rigorosamente o mesmo identificador.", "Origem: [Z] -> Destino: [____]"),
        o("Ordene as etapas para aplicar um conector circular e eliminar uma linha cruzada em C++:", ["Identificar a linha de fluxo que cruza múltiplos blocos causando confusão","Cortar a linha e posicionar um conector circular contendo a letra \"E\"","Inserir outro conector com a mesma letra \"E\" junto ao bloco receptor","Ligar a saída do segundo conector à entrada do bloco de destino"], "O uso estratégico de conectores transforma diagramas ilegíveis em documentação profissional."),
        p("Associe o tipo de conector de fluxo à sua aplicação prática no projeto:", [["Conector circular na página","Elimina linhas longas e cruzamentos no mesmo documento"],["Conector off-page","Direciona a continuidade do fluxo para outra folha ou tela"],["Letras em pares (ex: [A] e [A])","Vincula a origem e o destino da conexão sem ambiguidades"],["Linhas com cantos ortogonais","Mantém a geometria do diagrama organizada e elegante"]], "Conectores limpos facilitam a leitura ágil de fluxogramas por equipes inteiras.")
        ]
      },
      {
        id: "cpp-c02-u3-l5",
        title: "Padronização ANSI/ISO e revisão de diagramação",
        subtitle: "Revisão e desafio · padronização ANSI e legibilidade de diagramas",
        theory: "A norma ANSI/ISO para fluxogramas estabelece diretrizes de qualidade essenciais: fluxo prioritário de cima para baixo e da esquerda para a direita, ausência de nós órfãos, setas direcionais em todas as linhas e conformidade estrita entre a especificação visual e o código C++.",
        questions: [
        q("Qual é o sentido padrão internacional recomendado para a orientação de fluxogramas?", "De cima para baixo e da esquerda para a direita", ["De baixo para cima em espiral","Apenas da direita para a esquerda"], "A leitura alinha-se ao padrão cognitivo ocidental garantindo interpretação imediata."),
        q("O que a existência de um bloco sem linha de saída no fluxograma acarreta?", "Indica um erro grave de modelagem, pois a execução ficaria travada sem saber onde prosseguir", ["Uma melhoria de performance no C++","Um novo recurso de compilador"], "Todo bloco operacional deve obrigatoriamente convergir rumo ao Terminal Fim."),
        q("Por que validar o fluxograma com antecedência protege o cronograma de projetos de sistemas?", "Detectar falhas de lógica na diagramação é mais rápido e barato do que refatorar código C++ compilado", ["Porque dispensa a escrita de testes de unidade","Porque o fluxograma compila para binário diretamente"], "Erros arquiteturais prevenidos na prancheta economizam dias de depuração em produção."),
        q("O que deve ser colocado obrigatoriamente nas linhas de fluxo que convergem para um mesmo bloco?", "Setas direcionais apontando o sentido do percurso", ["O carimbo do desenvolvedor","A cor verde"], "Setas removem qualquer ambiguidade sobre qual é o próximo passo a ser percorrido."),
        t("Qual conjunto de normas internacionais regula a simbologia padrão de diagramas e fluxogramas?", ["ANSI/ISO"], "A padronização ANSI/ISO garante uniformidade técnica global.", "// Normas de diagramacao: padrao ____"),
        g("Complete o sentido canônico de fluxo de processos técnicos ocidentais:", ["cima para baixo"], "O fluxo deve descer de cima para baixo de forma linear.", "Fluxo principal: de ____"),
        o("Ordene a lista de checagem para auditar a qualidade técnica de um fluxograma C++:", ["Confirmar a existência de um Terminal Início único e bem posicionado no topo","Validar se todos os losangos possuem saídas Sim e Não explicitamente rotuladas","Assegurar que todas as linhas possuem setas indicando o sentido de fluxo","Conferir se todos os caminhos convergem com sucesso para o Terminal Fim"], "A auditoria formal do fluxograma blinda a equipe contra retrabalho de desenvolvimento."),
        p("Associe a regra de ouro de fluxogramas ao seu benefício técnico direto:", [["Sentido top-down","Leitura intuitiva e alinhada ao fluxo sequencial de instruções"],["Setas em todas as linhas","Garante determinismo direcional sem margem para dúvidas"],["Rotulação das decisões","Elimina ambiguidades sobre quais instruções atendem a true e false"],["Convergência para o Fim","Assegura encerramento controlado de todas as rotas do algoritmo"]], "A precisão técnica na diagramação reflete maturidade profissional em engenharia.")
        ]
      }
    ],
    4: [
      {
        id: "cpp-c02-u4-l1",
        title: "Do enunciado textual ao rascunho de fluxo",
        subtitle: "Apresentação · do enunciado ao rascunho de fluxo",
        theory: "A engenharia de software em C++ parte da tradução de requisitos de negócio para modelos computacionais exatos. Substantivos indicam dados de entrada e entidades; verbos sinalizam processamentos e funções; e conjunções condicionais delimitam losangos de decisão.",
        questions: [
        q("Ao analisar um problema em texto, o que termos como \"calcular volume\" ou \"aplicar taxa\" representam?", "Retângulos de processamento contendo expressões aritméticas de cálculo", ["Terminais de início","Paralelogramos de leitura"], "Ações ativas de transformação e cálculo pertencem a blocos de processamento."),
        q("O que substantivos como \"pressão\", \"vazão\" e \"tempo de retenção\" indicam?", "As variáveis de entrada que precisam ser capturadas pelo sistema", ["Os nomes das bibliotecas padrão do C++","O diretório de compilação"], "Substantivos representam os dados de entrada fornecidos ao algoritmo."),
        q("O que expressões como \"se o nível atingir o limite\" ou \"caso o sensor esteja ativo\" apontam?", "A necessidade de inserir um losango de decisão condicional", ["A criação de uma interface gráfica","A exclusão do arquivo .cpp"], "Conjunções condicionais delimitam bifurcações onde o fluxo precisa tomar rumos distintos."),
        q("Qual é a recomendação ao rascunhar o primeiro desenho de um fluxo de dados complexo?", "Desenhar primeiramente o caminho de sucesso (caminho feliz) e acrescentar validações depois", ["Iniciar tentando colocar 200 blocos sem testar","Começar compilando com -O3"], "Mapear a espinha dorsal do caso de sucesso facilita o refinamento de exceções e bordas."),
        t("Qual classe gramatical de palavras normalmente aponta os dados de entrada em requisitos de software?", ["substantivo"], "Substantivos nomeiam variáveis e parâmetros recebidos pelo algoritmo.", "// Entradas de dados: identificadas por ____"),
        g("Complete o teste condicional no losango para a regra \"se a pressão for maior que 120\":", ["pressao > 120"], "O interior do losango transcreve a regra lógica em formato relacional.", "[Losango: ____ ?]"),
        o("Ordene a metodologia para converter um requisito de negócio em diagrama visual em C++:", ["Ler atentamente a especificação identificando dados de entrada e saídas esperadas","Identificar os pontos de bifurcação e regras de negócio com losangos de decisão","Esboçar o fluxograma sequencial ligando blocos com setas direcionais","Testar o diagrama com valores numéricos para confirmar a aderência à regra"], "A decomposição metódica de enunciados é o pilar da engenharia de requisitos."),
        p("Associe o fragmento textual de requisito ao símbolo gráfico adequado:", [["\"O operador digita a temperatura do reator\"","Paralelogramo de Entrada (leitura externa)"],["\"Se a temperatura exceder o limite crítico...\"","Losango de Decisão (bifurcação de fluxo)"],["\"Calcular vazão de resfriamento necessária\"","Retângulo de Processamento (cálculo interno)"],["\"Emitir aviso sonoro no console\"","Paralelogramo de Saída (emissão de mensagem)"]], "Saber decompor prosa em símbolos visuais transforma problemas ambíguos em sistemas exatos.")
        ]
      },
      {
        id: "cpp-c02-u4-l2",
        title: "Identificação de pré-condições e casos de borda",
        subtitle: "Prática guiada · identificação de precondições e fronteiras",
        theory: "Casos de borda (edge cases) testam os limites exatos das regras de negócio (como subtotal igual a 100 em regras de >= 100). Em C++, validar pré-condições logo na entrada da função (princípio fail-fast com assert ou exceções) impede que dados inconsistentes gerem cálculos errôneos.",
        questions: [
        q("Em uma regra de negócio que concede frete grátis para compras de R$ 100 ou mais, qual valor é a fronteira crítica?", "Exatamente R$ 100,00", ["R$ 1.000,00","R$ 0,00"], "Valores exatos de limite testam se o algoritmo utiliza >= (correto) ou > (incorreto)."),
        q("O que é uma pré-condição em uma função de cálculo de densidade em C++?", "Uma condição obrigatória que deve ser satisfeita antes da divisão (ex: volume > 0.0)", ["O compilador utilizado","A cor do terminal"], "Pré-condições garantem que a operação só seja iniciada se os parâmetros forem seguros e válidos."),
        q("O que o algoritmo deve fazer se a quantidade de produtos informada for negativa (-1)?", "Rejeitar a entrada imediatamente com mensagem de erro defensiva antes de alterar o estoque", ["Aceitar e multiplicar por menos um","Desligar o computador"], "Rejeitar precocemente dados anômalos (fail-fast) protege a integridade transacional do sistema."),
        q("Por que testar valores imediatamente vizinhos à borda (como 99.99 e 100.01) é mandatório?", "Porque erros de comparação com sinais trocados (< versus <=) são frequentes nesses pontos", ["Porque números decimais quebram a memória RAM","Porque o compilador exige testes com centavos"], "Erros de off-by-one em fronteiras de faixas são responsáveis pela maior parte dos bugs contábeis."),
        t("Qual princípio arquitetural prega rejeitar dados inválidos logo na entrada antes de prosseguir?", ["fail-fast"], "O princípio fail-fast falha rápido e com clareza ao menor sinal de inconsistência.", "// Principio defensivo: ____"),
        g("Complete a validação que protege a função contra volumes negativos ou nulos em C++:", ["volume <= 0.0"], "Bloquear volumes não positivos protege contra divisão por zero.", "if (____) { throw std::invalid_argument(\"Volume invalido\"); }"),
        o("Ordene os passos de um algoritmo defensivo com validação rigorosa de pré-condições:", ["Ler os parâmetros de entrada fornecidos pelo usuário no início","Avaliar em um losango de decisão se os dados atendem às pré-condições mínimas","Se inválidos (Não): emitir mensagem de alerta e conduzir ao Terminal Fim","Se válidos (Sim): prosseguir com segurança para as rotinas de cálculo do negócio"], "Validar na entrada blinda as rotinas de processamento de regras complexas."),
        p("Associe o dado de teste à sua função na verificação de limites do algoritmo:", [["Valor exato de corte (100.00)","Testa a fronteira exata e a inclusão correta com operador >= ou <="],["Valor imediatamente abaixo (99.99)","Testa se a condição não está englobando valores não autorizados"],["Valor negativo (-50.00)","Testa o bloqueio preventivo de pré-condição contra entradas absurdas"],["Valor intermediário típico (250.00)","Testa o caminho comum regular da regra de negócio"]], "Projetar testes de borda assegura que nenhuma falha oculta passe despercebida para a produção.")
        ]
      },
      {
        id: "cpp-c02-u4-l3",
        title: "Encadeamento de bifurcações e decisões compostas",
        subtitle: "Aprofundamento · encadeamento de bifurcações sem ambiguidades",
        theory: "Quando um problema possui múltiplos critérios excludentes (como escalonamento tributário ou classificação de clientes), conectamos losangos sucessivos. O ramo \"Não\" do primeiro losango conduz ao teste do losango seguinte, traduzindo-se fielmente na estrutura if-else if-else em C++.",
        questions: [
        q("Como modelamos em fluxograma uma classificação com quatro faixas de desconto excludentes?", "Encadeando três losangos sucessivos, onde cada ramo \"Não\" conduz ao teste da faixa seguinte", ["Colocando quatro retângulos paralelos sem losangos","Desenhando um círculo com quatro setas"], "Bifurcações encadeadas avaliam faixas em cascata de forma determinística e hierárquica."),
        q("Qual estrutura em C++ espelha perfeitamente a cascata sequencial de losangos de decisão?", "if (...) { ... } else if (...) { ... } else { ... }", ["switch vazio sem case","while loop simples"], "if-else if modela a árvore binária de decisões excludentes no código C++."),
        q("O que acontece se uma faixa mais ampla for colocada antes de uma faixa mais restrita na cascata?", "A faixa ampla interceptará valores que pertenciam à faixa restrita, gerando cálculos incorretos", ["O compilador g++ gera erro fatal","O terminal fecha a aplicação"], "A hierarquia deve avaliar condições mais específicas primeiro para evitar captura indevida de dados."),
        q("Qual é o papel do bloco else final após uma sequência de verificações com else if em C++?", "Fornecer uma rota padrão de contingência para qualquer dado que não atenda às faixas anteriores", ["Apagar as variáveis da memória","Reiniciar o programa"], "O else final cobre o universo residual de casos, garantindo cobertura total de cenários."),
        t("Qual estrutura de controle de duas palavras encadeia novas condições no fluxo condicional C++?", ["else if"], "else if permite testar uma condição alternativa caso a anterior tenha sido falsa.", "if (x > 10) {} ____ (x > 5) {}"),
        g("Complete o encadeamento categorizando pontuações a partir de 90 como \"Excelente\":", ["else if (pontos >= 90)"], "else if avalia a faixa subsequente após a primeira comparação falhar.", "if (pontos == 100) { cat = \"Perfeito\"; } ____ { cat = \"Excelente\"; }"),
        o("Ordene as faixas de um cálculo progressivo de desconto do menor para o maior limite:", ["Avaliar se o subtotal qualifica para a faixa básica de desconto inicial","Avaliar na ramificação Não se o subtotal atinge a faixa intermediária de desconto","Avaliar na ramificação Não subsequente se alcança o patamar máximo de desconto","Aplicar o desconto padrão mínimo no bloco residual de contingência final do else"], "Organizar faixas em ordem lógica evita cruzamentos indevidos de alíquotas."),
        p("Associe a ramificação de cascata ao seu respectivo desfecho operacional em C++:", [["Primeira condição verdadeira","Executa o bloco imediato e pula todas as verificações inferiores"],["Condições intermediárias","Avaliadas sucessivamente por blocos else if caso as anteriores falhem"],["Nenhuma condição satisfeita","Executa compulsoriamente as instruções do bloco residual else"],["Ponto de unificação final","Reúne os caminhos após o término de toda a estrutura if-else"]], "Decisões encadeadas bem projetadas conferem robustez a sistemas de alto desempenho.")
        ]
      },
      {
        id: "cpp-c02-u4-l4",
        title: "Modelagem de algoritmo de frete e desconto em C++",
        subtitle: "Aplicação · modelagem de fluxo para cálculo de frete e desconto",
        theory: "Consolidando a diagramação em um algoritmo de checkout em C++: o fluxo lê subtotal e cupom; avalia se subtotal >= 100.0 para frete grátis (0.0) ou cobrança fixa (15.0); avalia se o cupom é \"DESC10\" para desconto de 10%; calcula total = subtotal - desconto + frete; e exibe o extrato final.",
        questions: [
        q("Qual fórmula em C++ calcula o montante final da compra com subtotal, desconto e frete?", "double total = (subtotal - desconto) + frete;", ["double total = subtotal * frete - desconto;","double total = frete - subtotal;"], "O desconto é subtraído do subtotal das mercadorias e o frete é somado ao montante de envio."),
        q("Se subtotal for 150.0 e o cupom for \"DESC10\" (10% de desconto), qual é o total com frete grátis?", "135.0 (subtotal 150 - desconto 15 + frete 0)", ["150.0","140.0"], "10% de 150 é 15; 150 menos 15 resulta em 135 com frete zerado.", "double subtotal = 150.0;\ndouble desconto = 15.0;\ndouble frete = 0.0;\nstd::cout << (subtotal - desconto + frete) << \"\\n\";"),
        q("Se subtotal for 60.0 sem cupom e a regra estipula frete 15.0 para compras abaixo de 100, qual é o total?", "75.0 (subtotal 60.0 + frete 15.0)", ["60.0","100.0"], "Como 60 < 100, o frete de 15.0 incide integralmente, totalizando 75.0."),
        q("Como comparar strings de forma segura e idiomática em C++?", "Utilizando o operador == sobre objetos std::string (ex: cupom == \"DESC10\")", ["Chamando strcmp em ponteiros nulos","Usando o operador &"], "std::string sobrecarrega o operador == para comparação lexicográfica segura de conteúdo."),
        t("Qual operador compara a igualdade de conteúdo entre duas instâncias de std::string em C++?", ["=="], "O operador == compara o conteúdo textual das strings de forma direta e segura.", "if (cupom ____ \"DESC10\") { ... }"),
        g("Complete o cálculo ternário do frete em C++ concedendo isenção para compras a partir de 100:", ["subtotal >= 100.0 ? 0.0 : 15.0"], "O operador ternário condensa decisões binárias simples de cálculo.", "double frete = ____;"),
        o("Ordene a esteira de execução de um checkout de compras em console C++:", ["Paralelogramo de entrada: ler subtotal com std::cin e cupom com std::cin","Losango de decisão: checar se subtotal >= 100.0 definindo frete como 0.0 ou 15.0","Losango de decisão: checar se cupom == \"DESC10\" para calcular desconto de 10%","Retângulo de processamento: calcular total = subtotal - desconto + frete","Paralelogramo de saída: imprimir extrato formatado com std::cout"], "Essa arquitetura estruturada garante precisão comercial e ausência de bugs de cálculo."),
        p("Associe a regra de checkout à sua respectiva representação no fluxograma:", [["Ler subtotal e cupom","Paralelogramo de Entrada capturando valores digitados pelo cliente"],["subtotal >= 100.0 ?","Losango de Decisão para elegibilidade à isenção do frete"],["desconto = subtotal * 0.10","Retângulo de Processamento com a redução conferida pelo cupom"],["std::cout << total;","Paralelogramo de Saída apresentando o valor total consolidado"]], "A clareza dos passos desacoplados simplifica a implementação e os testes em C++.")
        ]
      },
      {
        id: "cpp-c02-u4-l5",
        title: "Validação de integridade e teste de mesa em C++",
        subtitle: "Revisão e desafio · validação de integridade do fluxograma",
        theory: "A validação de integridade do fluxograma culmina no teste de mesa (desk checking): simular a execução com uma tabela contendo colunas para variáveis (subtotal, frete, desconto, total) e condições booleanas. Esse ensaio manual garante que todos os casos cheguem ao Fim com precisão matemática.",
        questions: [
        q("O que caracteriza a técnica de \"teste de mesa\" aplicada a um fluxograma de algoritmo?", "Executar manualmente no papel cada instrução do diagrama com dados simulados, rastreando variáveis", ["Testar se a mesa de trabalho está nivelada","Uma ferramenta de benchmarking da CLI"], "O teste de mesa verifica a consistência do algoritmo na ponta do lápis antes de digitar código."),
        q("O que indica se durante o teste de mesa uma variável é lida antes de ter recebido qualquer valor?", "Um defeito grave de dependência de dados que em C++ causaria Comportamento Indefinido (lixo)", ["Uma otimização recomendada","Um recurso de computação concorrente"], "Variáveis devem ser estritamente inicializadas antes de serem consumidas em expressões."),
        q("Quantos cenários de teste no mínimo devem ser aplicados para auditar um losango condicional simples?", "Dois cenários: um que produza resultado Verdadeiro e outro que produza Falso", ["Apenas um cenário","Nenhum cenário"], "Auditar os dois caminhos comprova que ambas as rotas operam conforme a especificação do sistema."),
        q("Por que a prática do teste de mesa é amplamente incentivada na formação de engenheiros de software?", "Desenvolve o raciocínio determinístico e reduz drasticamente o tempo gasto em depurações em produção", ["Porque o C++ não possui depurador","Porque testes automatizados são proibidos"], "Compreender o percurso exato das instruções forma profissionais analíticos e resolutivos."),
        t("Qual prática manual clássica simula o percurso do algoritmo anotando valores em uma tabela?", ["teste de mesa"], "O teste de mesa rastreia a evolução das variáveis passo a passo.", "// Validacao manual: ____"),
        g("Complete o teste de mesa anotando o valor final de total para subtotal 80 e frete 15:", ["95"], "80 + 15 resulta em 95.", "// Resultado final do teste de mesa: \"____\""),
        o("Ordene os passos para conduzir um teste de mesa rigoroso sobre um algoritmo:", ["Construir a tabela com colunas para cada variável, entrada, cálculo e condição","Definir os casos de teste contemplando caminho feliz, limites e dados inválidos","Percorrer bloco a bloco anotando a evolução exata de cada variável a cada linha","Comparar as saídas obtidas na tabela com os resultados formalmente especificados"], "A disciplina do teste de mesa comprova o determinismo absoluto do algoritmo."),
        p("Associe a constatação do teste de mesa à sua causa técnica correspondente:", [["Loop interminável na tabela","A condição do laço nunca se torna falsa para permitir a saída"],["Divisão por zero detectada","Ausência de pré-condição validando se o denominador é maior que zero"],["Valor incorreto na fronteira","Operador relacional equivocado no losango (> em vez de >=)"],["Gabarito 100% conferido","Algoritmo validado e perfeitamente pronto para implementação em código"]], "A validação estrutural na prancheta é o maior escudo de qualidade em engenharia de software.")
        ]
      }
    ]
  });
})();
