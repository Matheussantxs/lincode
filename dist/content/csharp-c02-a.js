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

  const lang = 'csharp';
  const chId = 'csharp-c02';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    2: [
      {
        id: "cs-c02-u2-l3",
        title: "Transição de estados e mutação de variáveis em C#",
        subtitle: "Aprofundamento · transição de estados e memória de variáveis",
        theory: "No ecossistema C# e .NET, tipos por valor (value types) como int e decimal residem diretamente na pilha (stack). Variáveis locais sofrem mutações de estado previsíveis e cronológicas a cada instrução de atribuição, enquanto modificadores como const criam ligações imutáveis permanentes.",
        questions: [
        q("Qual valor a variável pontuacao terá após executar: int pontuacao = 50; pontuacao += 30; pontuacao -= 15;?", "65", ["80","50"], "50 mais 30 resulta em 80; subtraindo 15 temos o estado final 65.", "int pontuacao = 50;\npontuacao += 30;\npontuacao -= 15;"),
        q("Qual palavra-chave do C# define constantes literais imutáveis cujo valor é fixado em tempo de compilação?", "const", ["readonly","fixed"], "A palavra-chave const define valores constantes imutáveis conhecidos na compilação."),
        q("Qual é a diferença entre const e readonly para declarar imutabilidade em C#?", "const é avaliado na compilação; readonly permite atribuição na inicialização ou no construtor em runtime", ["readonly não aceita números","const só funciona em jogos"], "readonly confere flexibilidade ao permitir atribuição durante o runtime do construtor."),
        q("Qual operador de atribuição composta divide o valor da variável por dois em C#?", "/=", ["=/","//="], "O operador /= divide a variável pelo valor fornecido e reatribui o resultado."),
        t("Qual palavra-chave em C# define campos imutáveis que podem ser atribuídos no construtor?", ["readonly"], "readonly permite fixar valores dinâmicos no construtor impedindo alterações posteriores.", "// Campo imutavel em runtime: ____ int taxa;"),
        g("Complete o operador combinado que subtrai 25 unidades da variável saldo em C#:", ["-="], "O operador -= subtrai e reatribui na mesma expressão.", "saldo ____ 25;"),
        o("Ordene a linha do tempo do estado de uma variável de desconto em C#:", ["A variável decimal desconto é declarada e inicializada com zero","A primeira regra comercial atribui o abatimento inicial de 10.0m","Uma bonificação de fidelidade soma 5.0m através do operador +=","Console.WriteLine exibe o desconto total final consolidado em 15.0m"], "Rastrear a linha do tempo das variáveis é a base do raciocínio analítico em C#."),
        p("Associe o operador de atribuição combinada em C# à sua respectiva operação:", [["total += 20;","Soma vinte unidades ao valor atual da variável total"],["total -= 10;","Subtrai dez unidades do valor atual da variável total"],["total *= 3;","Multiplica o valor atual da variável total por três"],["total %= 2;","Atribui à variável o resto da divisão inteira por dois"]], "Operadores combinados unem clareza sintática e eficiência no código C#.")
        ]
      },
      {
        id: "cs-c02-u2-l4",
        title: "Algoritmos clássicos de troca e acumuladores em C#",
        subtitle: "Aplicação · algoritmos de troca e acumuladores em C#",
        theory: "Em C# moderno (C# 7+), tuplas permitem a permuta atômica de variáveis sem variável auxiliar temporária com a sintaxe (a, b) = (b, a). Acumuladores e contadores formam a espinha dorsal de agregações aritméticas em laços e fluxos transacionais.",
        questions: [
        q("Como trocar os valores de duas variáveis a e b em C# moderno sem declarar uma variável temporária?", "(a, b) = (b, a);", ["a = b; b = a;","swap(a, b);"], "A sintaxe de desconstrução de tuplas (a, b) = (b, a) troca valores de forma atômica e elegante.", "int a = 1, b = 2;\n(a, b) = (b, a);"),
        q("No algoritmo tradicional clássico com variável temporária temp, qual é a ordem estrita de atribuição?", "temp = a; a = b; b = temp;", ["a = b; temp = a; b = temp;","b = temp; a = b; temp = a;"], "Guardar o valor original em temp antes de sobrescrever a é o padrão histórico fundamental."),
        q("Qual tipo de dado numérico do C# é obrigatório para acumuladores financeiros de moeda?", "decimal (128 bits com sufixo m)", ["float","double"], "decimal elimina imperfeições de arredondamento inerentes ao ponto flutuante binário."),
        q("Qual valor numérico inicial neutro deve ser atribuído a um acumulador de somas em C#?", "0 (ou 0m para decimais)", ["1","-1"], "Zero é o elemento neutro da adição, garantindo que o primeiro incremento seja exato."),
        t("Qual delimitador de pontuação em pares é usado para desempacotar tuplas na troca atômica em C#?", ["()"], "Parênteses () delimitam literais de tupla permitindo permuta direta de valores.", "// Troca atômica: ____a, b____ = (b, a);"),
        g("Complete o acumulador contábil inicializado com o zero neutro do tipo decimal:", ["0.0m"], "O sufixo m denota literais do tipo decimal.", "decimal montante = ____;\nmontante += fatura;"),
        o("Ordene as etapas para calcular a soma de despesas de um projeto em C#:", ["Declarar a variável decimal totalDespesas inicializada com 0m","Receber cada lançamento financeiro individual durante a iteração","Somar o valor do lançamento ao acumulador com totalDespesas += valor","Exibir o montante total com interpolação formatada $\"Total: {totalDespesas:C}\""], "A disciplina do acumulador organiza a consolidação financeira em aplicações de gestão."),
        p("Associe a variável ao seu papel funcional no algoritmo C#:", [["(a, b) = (b, a)","Permuta atômica instantânea de duas variáveis via tupla nativa"],["int temp","Variável temporária intermediária da troca algorítmica clássica"],["decimal saldo","Acumulador de alta precisão para valores contábeis e monetários"],["int contador","Variável que computa repetições e passos de um algoritmo"]], "Dominar papéis de variáveis confere maturidade à escrita de algoritmos em .NET.")
        ]
      },
      {
        id: "cs-c02-u2-l5",
        title: "Linearidade e fluxo de dados em C#",
        subtitle: "Revisão e desafio · linearidade e dependência de passos",
        theory: "O compilador Roslyn do C# aplica análise rigorosa de atribuição definida (definite assignment analysis). Tentar ler uma variável local antes de ela ter recebido um valor atribuído resulta no erro de compilação CS0165, forçando a ordem lógica de execução.",
        questions: [
        q("Qual erro o compilador C# emite ao tentar ler uma variável local não inicializada?", "CS0165: Use of unassigned local variable", ["NullReferenceException","IndexOutOfRangeException"], "O compilador Roslyn proíbe estaticamente a leitura de variáveis sem valor garantido."),
        q("Qual é a recomendação ao organizar instruções com dependência mútua de dados em C#?", "Assegurar que variáveis de cálculo bruto sejam definidas antes de cálculos de descontos e impostos", ["Colocar Console.WriteLine na primeira linha do arquivo","Deixar as variáveis com valor null"], "O princípio de causalidade exige que premissas sejam computadas antes de seus desdobramentos."),
        q("Por que computadores não conseguem executar instruções fora da ordem lógica pretendida?", "Porque processadores executam sequências de instruções de forma estritamente determinística", ["Porque o sistema operacional precisa de internet para ordenar","Porque o C# é uma linguagem interpretada"], "O computador segue fielmente as instruções na ordem escrita pelo desenvolvedor."),
        q("Qual sequência expressa a ordem canônica para faturar um pedido com desconto e tributo?", "Obter valor do pedido -> Calcular desconto -> Calcular base tributável -> Aplicar alíquota fiscal", ["Aplicar alíquota fiscal -> Obter valor do pedido -> Calcular desconto","Calcular tributo antes de saber o valor"], "A coerência fiscal e contábil depende estritamente da precedência linear das operações."),
        t("Qual código de erro de compilação clássico do Roslyn avisa sobre variável local não atribuída?", ["CS0165"], "CS0165 avisa: Use of unassigned local variable.", "// Erro de compilacao: ____"),
        g("Complete a inicialização de uma variável inteira local para satisfazer o compilador:", ["0"], "Inicializar na declaração satisfaz a análise estática de atribuição.", "int totalItens = ____;\ntotalItens += 5;"),
        o("Ordene as etapas sequenciais para calcular a média de consumo de combustível em C#:", ["Declarar e ler a distância percorrida em quilômetros","Declarar e ler a quantidade de combustível consumida em litros","Validar se os litros consumidos são estritamente maiores que zero","Dividir a distância pelos litros e exibir o consumo médio formatado"], "A verificação contra divisão por zero evita exceções em tempo de execução."),
        p("Associe a falha de fluxo ao seu respectivo sintoma técnico em C#:", [["Leitura de variável não atribuída","Erro de compilação CS0165 acusando variável local sem atribuição"],["Divisão inteira por zero","Exceção em runtime System.DivideByZeroException"],["Atribuição a variável const","Erro de compilação CS0131 informando que o lado esquerdo deve ser mutável"],["Sequência lógica linear","Compilação limpa com código executado de forma determinística"]], "A análise estática do compilador C# é uma das mais avançadas da indústria de software.")
        ]
      }
    ],
    3: [
      {
        id: "cs-c02-u3-l1",
        title: "Símbolos gráficos: Terminal e Bloco de Processamento",
        subtitle: "Apresentação · terminal e blocos de processo retangulares",
        theory: "No desenho de algoritmos (padrão ANSI/ISO), o Terminal oval ou de cantos arredondados indica onde o fluxo inicia e termina. O Retângulo convencional representa o Bloco de Processamento, no qual residem operações de cálculo, mutações de estado e transformações numéricas.",
        questions: [
        q("Qual forma geométrica representa os limites de Início e Término em um fluxograma de software?", "Retângulo com cantos arredondados (ou elipse / terminal)", ["Triângulo","Pentágono"], "O terminal oval demarca a fronteira inicial e final de execução do algoritmo."),
        q("Qual símbolo geométrico é convencionado para indicar operações de cálculo e atribuições internas?", "Retângulo com cantos retos", ["Círculo pequeno","Losango"], "Retângulos convencionais abrigam passos de processamento interno da máquina."),
        q("O que deve estar escrito no interior de um bloco de processamento em um algoritmo financeiro?", "Ações ativas como \"juros = capital * taxa\" ou \"saldo = saldo + deposito\"", ["Apenas o nome da empresa","Uma pergunta com ponto de interrogação"], "Processamentos expressam instruções matemáticas e mutações de dados concretas."),
        q("Quantos terminais de Início um diagrama de fluxo com comportamento determinístico deve possuir?", "Exatamente um início", ["Quantos arquivos tiverem no projeto","Nenhum"], "Um fluxo com múltiplos inícios geraria incerteza sobre o ponto de partida do sistema."),
        t("Qual símbolo de quatro lados retos abriga operações de cálculo e processamento?", ["retângulo"], "O retângulo delimita ações de cálculo e atribuição interna.", "// Simbolo de processamento: ____"),
        g("Complete o texto do terminal que demarca a conclusão do percurso do fluxograma:", ["Fim"], "Fim é a convenção textual para término de fluxogramas.", "[Terminal: ____]"),
        o("Ordene a estrutura canônica de um fluxograma elementar de cálculo do dobro de um número:", ["Terminal de cantos arredondados demarcando o Início do fluxo","Paralelogramo de leitura capturando o número informado","Retângulo reto de processamento calculando dobro = numero * 2","Terminal de cantos arredondados finalizando com a palavra Fim"], "A clareza dos símbolos visuais facilita a comunicação interdisciplinar em equipes técnicas."),
        p("Associe a forma geométrica do fluxograma ao seu papel semântico oficial:", [["Terminal (cantos arredondados)","Demarca o Início ou o Término absoluto da execução"],["Retângulo com cantos retos","Processamento interno: cálculos, transformações e atribuições"],["Linha com seta direcionada","Indica o sentido direcional da execução rumo ao próximo passo"],["Texto no bloco","Descreve de forma concisa e direta a instrução executada"]], "A padronização internacional confere uniformidade à documentação de sistemas.")
        ]
      },
      {
        id: "cs-c02-u3-l2",
        title: "Paralelogramo de Entrada e Saída de dados",
        subtitle: "Prática guiada · paralelogramo de entrada e saída de dados",
        theory: "A fronteira de comunicação externa é ilustrada pelo Paralelogramo. Ele distingue operações que capturam dados de fora (como Console.ReadLine no C#) ou que projetam informações para o usuário (como Console.WriteLine), isolando a entrada e saída das operações de cálculo interno.",
        questions: [
        q("Qual forma geométrica inclinada é a convenção oficial para Entrada e Saída em fluxogramas?", "Paralelogramo", ["Retângulo reto","Trapézio"], "O paralelogramo isola operações de I/O de processamentos internos de cálculo."),
        q("Qual trecho de código C# corresponde a um paralelogramo de leitura de dados?", "string? entrada = Console.ReadLine();", ["int dobro = valor * 2;","if (valor > 10)"], "Console.ReadLine captura dados externos fornecidos pelo usuário no terminal."),
        q("Qual instrução C# é representada graficamente por um paralelogramo de saída?", "Console.WriteLine($\"Total: {total:C}\");", ["decimal total = 100m;","total = subtotal - desconto;"], "Console.WriteLine projeta dados calculados para o terminal do usuário."),
        q("Por que é essencial diferenciar blocos de entrada de blocos de processamento no diagrama?", "Porque dados de entrada vêm de fontes externas imprevisíveis e exigem validação prévia", ["Porque paralelogramos ocupam menos memória","Porque o compilador C# exige paralelogramos"], "Operações de E/S tocam fronteiras externas e requerem atenção defensiva contra dados maliciosos."),
        t("Qual polígono inclinado de quatro lados representa leitura e escrita em fluxogramas?", ["paralelogramo"], "O paralelogramo demarca operações de comunicação externa.", "// Simbolo de entrada e saida: ____"),
        g("Complete o paralelogramo de saída emitindo a confirmação de cadastro no terminal:", ["Cadastro Concluido"], "Blocos de saída contêm o texto ou variável exibida.", "[Paralelogramo: Exibir: \"____\"]"),
        o("Ordene os blocos de um fluxograma para calcular o quadrado de um número em C#:", ["Terminal Início demarcando o começo da execução","Paralelogramo de entrada: Ler valor com Console.ReadLine()","Retângulo de processamento: calcular quadrado = valor * valor","Paralelogramo de saída: Exibir quadrado através de Console.WriteLine"], "A separação sistemática entre entrada, cálculo e saída garante código modular."),
        p("Associe o comando da classe Console em C# ao respectivo símbolo de fluxograma:", [["Console.ReadLine()","Paralelogramo de Entrada (leitura externa digitada pelo usuário)"],["Console.WriteLine()","Paralelogramo de Saída (emissão de dados e relatórios na tela)"],["total = preco * qtd;","Retângulo de Processamento (cálculo aritmético interno)"],["public static void Main()","Terminal de Início (ponto de entrada da aplicação de console)"]], "Mapear a classe Console aos símbolos visuais torna a lógica do programa transparente.")
        ]
      },
      {
        id: "cs-c02-u3-l3",
        title: "O Losango de Decisão e ramificações Sim e Não",
        subtitle: "Aprofundamento · losango de decisão e caminhos verdadeiro/falso",
        theory: "O Losango de Decisão introduz escolhas ao fluxo algorítmico. Ele abriga uma expressão lógica que avalia como Verdadeira ou Falsa. Cada vértice de saída deve ser rotulado com Sim e Não, guiando para rotas alternativas que correspondem às estruturas if e else em código C#.",
        questions: [
        q("Qual símbolo gráfico é utilizado para representar uma bifurcação condicional com dois caminhos?", "Losango", ["Retângulo reto","Elipse"], "O losango abriga a comparação relacional ou booleana que direciona o fluxo."),
        q("O que deve constar obrigatoriamente nas duas saídas que partem de um losango de decisão?", "Rótulos claros indicando \"Sim\" (Verdadeiro) e \"Não\" (Falso)", ["Nenhum texto","O horário do sistema"], "Identificar Sim e Não é imperativo para eliminar qualquer ambiguidade no percurso."),
        q("Qual estrutura em C# traduz diretamente a bifurcação gráfica desenhada em um losango?", "Estrutura condicional if-else", ["Declaração namespace","Diretiva using"], "if-else bifurca o fluxo em dois caminhos exclusivos de acordo com a condição lógica."),
        q("O que deve ser colocado no interior de um losango de teste em um sistema de controle de frotas?", "Uma pergunta condicional como \"combustivelRestante > 10 ?\"", ["Uma instrução de desligamento do motor","Apenas a palavra \"C#\""], "O interior do losango expressa a comparação lógica que resulta em verdadeiro ou falso."),
        t("Qual símbolo de quatro lados pontiagudos abriga bifurcações condicionais em fluxogramas?", ["losango"], "O losango avalia condições direcionando para rotas alternativas.", "// Simbolo condicional: ____"),
        g("Complete os rótulos obrigatórios de saída que partem de um losango condicional:", ["Sim e Nao"], "Rótulos explícitos de Sim e Não conferem determinismo ao diagrama.", "// Rotulos de saida do losango: ____"),
        o("Ordene os elementos de um algoritmo de validação de saldo bancário no fluxograma:", ["Paralelogramo de entrada com a instrução \"Ler valorSaque\"","Losango de decisão avaliando a condição \"saldo >= valorSaque ?\"","Ramo Sim conduzindo a processamento \"saldo -= valorSaque\" e saque aprovado","Ramo Não conduzindo a saída \"Exibir: Saldo Insuficiente\""], "A modelagem gráfica com losangos cobre caminhos de sucesso e de contingência."),
        p("Associe o elemento do bloco condicional ao seu papel estrutural em C#:", [["Condição interna no losango","Expressão booleana testada nos parênteses do if (ex: idade >= 18)"],["Ramo Sim","Bloco de chaves executado quando a condição for verdadeira"],["Ramo Não","Bloco de chaves do else executado quando a condição for falsa"],["Ponto de unificação de fluxo","Instrução após o fechamento do bloco condicional"]], "Modelar bifurcações com rigor previne lacunas em regras de negócio corporativas.")
        ]
      },
      {
        id: "cs-c02-u3-l4",
        title: "Conectores circulares e redução de cruzamentos",
        subtitle: "Aplicação · conectores circulares e redução de cruzamentos",
        theory: "Em fluxogramas complexos, linhas extensas cruzando blocos prejudicam a leitura. O Conector circular (com letra ou número interno) divide a linha de fluxo em um ponto e a retoma em outro com a mesma identificação, simplificando diagramas com laços de repetição ou múltiplas saídas.",
        questions: [
        q("Qual símbolo é utilizado para evitar cruzamento de linhas de fluxo na mesma página?", "Pequeno círculo contendo letra ou número identificador (conector)", ["Um quadrado tracejado","Um triângulo"], "O conector circular quebra linhas longas mantendo a continuidade lógica por identificadores idênticos."),
        q("Como o desenvolvedor deve interpretar uma linha de fluxo que termina no círculo rotulado com \"B\"?", "Deve localizar no diagrama outro círculo rotulado com \"B\" de onde a linha recomeça", ["Deve abortar a execução do programa","Deve apagar o arquivo .csproj"], "Conectores operam em pares como portais lógicos de continuidade do diagrama."),
        q("Por que cruzar linhas de fluxo desordenadamente é prejudicial à documentação de software?", "Gera poluição visual e aumenta a probabilidade de erros de interpretação na codificação", ["Aumenta o tempo de compilação do Roslyn","Porque imagens com linhas cruzadas são ilegais"], "A clareza do diagrama reduz custos de comunicação entre arquitetos e programadores."),
        q("Qual conector com formato pentagonal é adotado quando o fluxo deve prosseguir em outra página?", "Conector de fora de página (off-page connector)", ["Terminal oval","Bloco de processo"], "O conector off-page indica que a sequência do diagrama está documentada na página seguinte."),
        t("Qual símbolo gráfico de formato redondo interliga trechos de fluxo sem cruzar linhas?", ["círculo"], "O conector circular despolui diagramas complexos.", "// Conector na mesma pagina: pequeno ____"),
        g("Complete o identificador correspondente para fechar o elo do conector [M]:", ["M"], "Conectores vinculados compartilham rigorosamente o mesmo identificador.", "Origem: [M] -> Destino: [____]"),
        o("Ordene as etapas para aplicar um conector circular e eliminar uma linha cruzada em C#:", ["Identificar a linha de fluxo que cruza múltiplos blocos causando confusão","Cortar a linha e posicionar um conector circular contendo a letra \"D\"","Inserir outro conector com a mesma letra \"D\" junto ao bloco receptor","Ligar a saída do segundo conector à entrada do bloco de destino"], "O uso estratégico de conectores transforma diagramas ilegíveis em documentação profissional."),
        p("Associe o tipo de conector de fluxo à sua aplicação prática no projeto:", [["Conector circular na página","Elimina linhas longas e cruzamentos no mesmo documento"],["Conector off-page","Direciona a continuidade do fluxo para outra folha ou tela"],["Letras em pares (ex: [A] e [A])","Vincula a origem e o destino da conexão sem ambiguidades"],["Linhas com cantos ortogonais","Mantém a geometria do diagrama organizada e elegante"]], "Conectores limpos facilitam a leitura ágil de fluxogramas por equipes inteiras.")
        ]
      },
      {
        id: "cs-c02-u3-l5",
        title: "Padronização ANSI/ISO e revisão de diagramação",
        subtitle: "Revisão e desafio · padronização ANSI e legibilidade de diagramas",
        theory: "A norma ANSI/ISO para fluxogramas estabelece diretrizes de qualidade essenciais: fluxo prioritário de cima para baixo e da esquerda para a direita, ausência de nós órfãos, setas direcionais em todas as linhas e conformidade estrita entre a especificação visual e o código C#.",
        questions: [
        q("Qual é o sentido padrão internacional recomendado para a orientação de fluxogramas?", "De cima para baixo e da esquerda para a direita", ["De baixo para cima em espiral","Apenas da direita para a esquerda"], "A leitura alinha-se ao padrão cognitivo ocidental garantindo interpretação imediata."),
        q("O que a existência de um bloco sem linha de saída no fluxograma acarreta?", "Indica um erro grave de modelagem, pois a execução ficaria travada sem saber onde prosseguir", ["Uma melhoria de performance no .NET","Um novo recurso de compilador"], "Todo bloco operacional deve obrigatoriamente convergir rumo ao Terminal Fim."),
        q("Por que validar o fluxograma com antecedência protege o cronograma de projetos corporativos?", "Detectar falhas de lógica na diagramação é mais rápido e barato do que refatorar código C# compilado", ["Porque dispensa a escrita de testes automatizados","Porque o fluxograma compila para binário diretamente"], "Erros arquiteturais prevenidos na prancheta economizam dias de depuração em produção."),
        q("O que deve ser colocado obrigatoriamente nas linhas de fluxo que convergem para um mesmo bloco?", "Setas direcionais apontando o sentido do percurso", ["O carimbo do desenvolvedor","A cor verde"], "Setas removem qualquer ambiguidade sobre qual é o próximo passo a ser percorrido."),
        t("Qual conjunto de normas internacionais regula a simbologia padrão de diagramas e fluxogramas?", ["ANSI/ISO"], "A padronização ANSI/ISO garante uniformidade técnica global.", "// Normas de diagramacao: padrao ____"),
        g("Complete o sentido canônico de fluxo de processos técnicos ocidentais:", ["cima para baixo"], "O fluxo deve descer de cima para baixo de forma linear.", "Fluxo principal: de ____"),
        o("Ordene a lista de checagem para auditar a qualidade técnica de um fluxograma C#:", ["Confirmar a existência de um Terminal Início único e bem posicionado no topo","Validar se todos os losangos possuem saídas Sim e Não explicitamente rotuladas","Assegurar que todas as linhas possuem setas indicando o sentido de fluxo","Conferir se todos os caminhos convergem com sucesso para o Terminal Fim"], "A auditoria formal do fluxograma blinda a equipe contra retrabalho de desenvolvimento."),
        p("Associe a regra de ouro de fluxogramas ao seu benefício técnico direto:", [["Sentido top-down","Leitura intuitiva e alinhada ao fluxo sequencial de instruções"],["Setas em todas as linhas","Garante determinismo direcional sem margem para dúvidas"],["Rotulação das decisões","Elimina ambiguidades sobre quais instruções atendem a true e false"],["Convergência para o Fim","Assegura encerramento controlado de todas as rotas do algoritmo"]], "A precisão técnica na diagramação reflete maturidade profissional em engenharia.")
        ]
      }
    ],
    4: [
      {
        id: "cs-c02-u4-l1",
        title: "Do enunciado textual ao rascunho de fluxo",
        subtitle: "Apresentação · do enunciado ao rascunho de fluxo",
        theory: "A engenharia de software em C# parte da tradução de requisitos de negócio para modelos computacionais exatos. Substantivos indicam dados de entrada e entidades; verbos sinalizam processamentos e métodos; e conjunções condicionais delimitam losangos de decisão.",
        questions: [
        q("Ao analisar um problema em texto, o que termos como \"calcular subtotal\" ou \"aplicar taxa\" representam?", "Retângulos de processamento contendo expressões aritméticas de cálculo", ["Terminais de início","Paralelogramos de leitura"], "Ações ativas de transformação e cálculo pertencem a blocos de processamento."),
        q("O que substantivos como \"faturamento\", \"alíquota\" e \"quantidade de itens\" indicam?", "As variáveis de entrada que precisam ser capturadas pelo sistema", ["Os nomes das DLLs do .NET","O diretório de instalação do SDK"], "Substantivos representam os dados de entrada fornecidos ao algoritmo."),
        q("O que expressões como \"se o cliente for VIP\" ou \"quando o estoque estiver zerado\" apontam?", "A necessidade de inserir um losango de decisão condicional", ["A criação de uma janela visual","A exclusão do arquivo .cs"], "Conjunções condicionais delimitam bifurcações onde o fluxo precisa tomar rumos distintos."),
        q("Qual é a recomendação ao rascunhar o primeiro desenho de um fluxo de dados complexo?", "Desenhar primeiramente o caminho de sucesso (caminho feliz) e acrescentar validações depois", ["Iniciar tentando colocar 200 blocos sem testar","Começar compilando em modo Release"], "Mapear a espinha dorsal do caso de sucesso facilita o refinamento de exceções e bordas."),
        t("Qual classe gramatical de palavras normalmente aponta os dados de entrada em requisitos de software?", ["substantivo"], "Substantivos nomeiam variáveis e parâmetros recebidos pelo algoritmo.", "// Entradas de dados: identificadas por ____"),
        g("Complete o teste condicional no losango para a regra \"se o faturamento for maior que 5000\":", ["faturamento > 5000"], "O interior do losango transcreve a regra lógica em formato relacional.", "[Losango: ____ ?]"),
        o("Ordene a metodologia para converter um requisito de negócio em diagrama visual em C#:", ["Ler atentamente a especificação identificando dados de entrada e saídas esperadas","Identificar os pontos de bifurcação e regras de negócio com losangos de decisão","Esboçar o fluxograma sequencial ligando blocos com setas direcionais","Testar o diagrama com valores numéricos para confirmar a aderência à regra"], "A decomposição metódica de enunciados é o pilar da engenharia de requisitos."),
        p("Associe o fragmento textual de requisito ao símbolo gráfico adequado:", [["\"O operador digita o código do cupom\"","Paralelogramo de Entrada (leitura externa)"],["\"Se o saldo da conta for insuficiente...\"","Losango de Decisão (bifurcação de fluxo)"],["\"Calcular rendimento líquido da aplicação\"","Retângulo de Processamento (cálculo interno)"],["\"Imprimir comprovante no terminal\"","Paralelogramo de Saída (emissão de mensagem)"]], "Saber decompor prosa em símbolos visuais transforma problemas ambíguos em sistemas exatos.")
        ]
      },
      {
        id: "cs-c02-u4-l2",
        title: "Identificação de pré-condições e casos de borda",
        subtitle: "Prática guiada · identificação de precondições e fronteiras",
        theory: "Casos de borda (edge cases) testam os limites exatos das regras de negócio (como subtotal igual a 100 em regras de >= 100). Em C#, validar pré-condições logo na entrada do método (princípio fail-fast com exceções ou guards) impede que dados inconsistentes gerem cálculos errôneos.",
        questions: [
        q("Em uma regra de negócio que concede frete grátis para compras de R$ 100 ou mais, qual valor é a fronteira crítica?", "Exatamente R$ 100,00", ["R$ 1.000,00","R$ 0,00"], "Valores exatos de limite testam se o algoritmo utiliza >= (correto) ou > (incorreto)."),
        q("O que é uma pré-condição em um método de débito em conta corrente em C#?", "Uma condição obrigatória que deve ser satisfeita antes do débito (ex: valor > 0 && saldo >= valor)", ["A versão do sistema operacional Windows","A cor do terminal"], "Pré-condições garantem que a operação só seja iniciada se os parâmetros forem seguros e válidos."),
        q("O que o algoritmo deve fazer se a quantidade de produtos informada for negativa (-3)?", "Rejeitar a entrada imediatamente com mensagem de erro defensiva antes de alterar o estoque", ["Aceitar e multiplicar por menos um","Desligar o computador"], "Rejeitar precocemente dados anômalos (fail-fast) protege a integridade transacional do sistema."),
        q("Por que testar valores imediatamente vizinhos à borda (como 99.99 e 100.01) é mandatório?", "Porque erros de comparação com sinais trocados (< versus <=) são frequentes nesses pontos", ["Porque números decimais quebram a memória RAM","Porque o compilador exige testes com centavos"], "Erros de off-by-one em fronteiras de faixas são responsáveis pela maior parte dos bugs contábeis."),
        t("Qual princípio arquitetural prega rejeitar dados inválidos logo na entrada antes de prosseguir?", ["fail-fast"], "O princípio fail-fast falha rápido e com clareza ao menor sinal de inconsistência.", "// Principio defensivo: ____"),
        g("Complete a validação que protege o método contra saques de valores negativos ou nulos em C#:", ["saque <= 0m"], "Bloquear saques não positivos protege a integridade contábil.", "if (____) { throw new ArgumentException(\"Valor invalido\"); }"),
        o("Ordene os passos de um algoritmo defensivo com validação rigorosa de pré-condições:", ["Ler os parâmetros de entrada fornecidos pelo usuário no início","Avaliar em um losango de decisão se os dados atendem às pré-condições mínimas","Se inválidos (Não): emitir mensagem de alerta e conduzir ao Terminal Fim","Se válidos (Sim): prosseguir com segurança para as rotinas de cálculo do negócio"], "Validar na entrada blinda as rotinas de processamento de regras complexas."),
        p("Associe o dado de teste à sua função na verificação de limites do algoritmo:", [["Valor exato de corte (100.00)","Testa a fronteira exata e a inclusão correta com operador >= ou <="],["Valor imediatamente abaixo (99.99)","Testa se a condição não está englobando valores não autorizados"],["Valor negativo (-50.00)","Testa o bloqueio preventivo de pré-condição contra entradas absurdas"],["Valor intermediário típico (250.00)","Testa o caminho comum regular da regra de negócio"]], "Projetar testes de borda assegura que nenhuma falha oculta passe despercebida para a produção.")
        ]
      },
      {
        id: "cs-c02-u4-l3",
        title: "Encadeamento de bifurcações e decisões compostas",
        subtitle: "Aprofundamento · encadeamento de bifurcações sem ambiguidades",
        theory: "Quando um problema possui múltiplos critérios excludentes (como escalonamento tributário ou classificação de clientes), conectamos losangos sucessivos. O ramo \"Não\" do primeiro losango conduz ao teste do losango seguinte, traduzindo-se fielmente na estrutura if-else if-else em C#.",
        questions: [
        q("Como modelamos em fluxograma uma classificação com quatro faixas de desconto excludentes?", "Encadeando três losangos sucessivos, onde cada ramo \"Não\" conduz ao teste da faixa seguinte", ["Colocando quatro retângulos paralelos sem losangos","Desenhando um círculo com quatro setas"], "Bifurcações encadeadas avaliam faixas em cascata de forma determinística e hierárquica."),
        q("Qual estrutura em C# espelha perfeitamente a cascata sequencial de losangos de decisão?", "if (...) { ... } else if (...) { ... } else { ... }", ["switch vazio sem case","while loop simples"], "if-else if modela a árvore binária de decisões excludentes no código C#."),
        q("O que acontece se uma faixa mais ampla for colocada antes de uma faixa mais restrita na cascata?", "A faixa ampla interceptará valores que pertenciam à faixa restrita, gerando cálculos incorretos", ["O compilador Roslyn gera erro de compilação","O terminal fecha a aplicação"], "A hierarquia deve avaliar condições mais específicas primeiro para evitar captura indevida de dados."),
        q("Qual é o papel do bloco else final após uma sequência de verificações com else if em C#?", "Fornecer uma rota padrão de contingência para qualquer dado que não atenda às faixas anteriores", ["Apagar as variáveis da memória","Reiniciar o programa"], "O else final cobre o universo residual de casos, garantindo cobertura total de cenários."),
        t("Qual estrutura de controle de duas palavras encadeia novas condições no fluxo condicional C#?", ["else if"], "else if permite testar uma condição alternativa caso a anterior tenha sido falsa.", "if (x > 10) {} ____ (x > 5) {}"),
        g("Complete o encadeamento categorizando pontuações a partir de 90 como \"Excelente\":", ["else if (pontos >= 90)"], "else if avalia a faixa subsequente após a primeira comparação falhar.", "if (pontos == 100) { cat = \"Perfeito\"; } ____ { cat = \"Excelente\"; }"),
        o("Ordene as faixas de um cálculo progressivo de desconto do menor para o maior limite:", ["Avaliar se o subtotal qualifica para a faixa básica de desconto inicial","Avaliar na ramificação Não se o subtotal atinge a faixa intermediária de desconto","Avaliar na ramificação Não subsequente se alcança o patamar máximo de desconto","Aplicar o desconto padrão mínimo no bloco residual de contingência final do else"], "Organizar faixas em ordem lógica evita cruzamentos indevidos de alíquotas."),
        p("Associe a ramificação de cascata ao seu respectivo desfecho operacional em C#:", [["Primeira condição verdadeira","Executa o bloco imediato e pula todas as verificações inferiores"],["Condições intermediárias","Avaliadas sucessivamente por blocos else if caso as anteriores falhem"],["Nenhuma condição satisfeita","Executa compulsoriamente as instruções do bloco residual else"],["Ponto de unificação final","Reúne os caminhos após o término de toda a estrutura if-else"]], "Decisões encadeadas bem projetadas conferem robustez a sistemas empresariais.")
        ]
      },
      {
        id: "cs-c02-u4-l4",
        title: "Modelagem de algoritmo de frete e desconto em C#",
        subtitle: "Aplicação · modelagem de fluxo para cálculo de frete e desconto",
        theory: "Consolidando a diagramação em um algoritmo de checkout em C#: o fluxo lê subtotal e cupom; avalia se subtotal >= 100m para frete grátis (0m) ou cobrança fixa (15m); avalia se o cupom é \"DESC10\" para desconto de 10%; calcula total = subtotal - desconto + frete; e exibe o extrato final.",
        questions: [
        q("Qual fórmula em C# calcula o montante final da compra com subtotal, desconto e frete?", "decimal total = (subtotal - desconto) + frete;", ["decimal total = subtotal * frete - desconto;","decimal total = frete - subtotal;"], "O desconto é subtraído do subtotal das mercadorias e o frete é somado ao montante de envio."),
        q("Se subtotal for 150m e o cupom for \"DESC10\" (10% de desconto), qual é o total com frete grátis?", "135m (subtotal 150 - desconto 15 + frete 0)", ["150m","140m"], "10% de 150 é 15; 150 menos 15 resulta em 135 com frete zerado.", "decimal subtotal = 150m;\ndecimal desconto = 15m;\ndecimal frete = 0m;\nConsole.WriteLine(subtotal - desconto + frete);"),
        q("Se subtotal for 60m sem cupom e a regra estipula frete 15m para compras abaixo de 100, qual é o total?", "75m (subtotal 60m + frete 15m)", ["60m","100m"], "Como 60 < 100, o frete de 15m incide integralmente, totalizando 75m."),
        q("Qual método da classe string em C# permite comparar cupons ignorando se são maiúsculas ou minúsculas?", "string.Equals(cupom, \"DESC10\", StringComparison.OrdinalIgnoreCase)", ["cupom.ignore()","cupom == \"DESC10\""], "OrdinalIgnoreCase compara o texto ignorando variações de maiúsculas e minúsculas com alta performance."),
        t("Qual tipo primitivo do C# é obrigatório para representar valores de frete e desconto com precisão?", ["decimal"], "decimal é o tipo padrão de alta precisão financeira no .NET.", "// Tipo monetario: ____ frete = 15.0m;"),
        g("Complete o cálculo ternário do frete em C# concedendo isenção para compras a partir de 100:", ["subtotal >= 100m ? 0m : 15m"], "O operador ternário condensa decisões binárias simples de cálculo.", "decimal frete = ____;"),
        o("Ordene a esteira de execução de um checkout de compras em console C#:", ["Paralelogramo de entrada: ler subtotal e código de cupom com Console.ReadLine()","Losango de decisão: checar se subtotal >= 100m definindo frete como 0m ou 15m","Losango de decisão: checar se cupom confere desconto de 10% com StringComparison","Retângulo de processamento: calcular total = subtotal - desconto + frete","Paralelogramo de saída: imprimir extrato formatado com Console.WriteLine"], "Essa arquitetura estruturada garante precisão comercial e ausência de bugs de cálculo."),
        p("Associe a regra de checkout à sua respectiva representação no fluxograma:", [["Ler subtotal e cupom","Paralelogramo de Entrada capturando valores digitados pelo cliente"],["subtotal >= 100m ?","Losango de Decisão para elegibilidade à isenção do frete"],["desconto = subtotal * 0.10m","Retângulo de Processamento com a redução conferida pelo cupom"],["Console.WriteLine($\"Total: {total:C}\")","Paralelogramo de Saída apresentando o valor total consolidado"]], "A clareza dos passos desacoplados simplifica a implementação e os testes em C#.")
        ]
      },
      {
        id: "cs-c02-u4-l5",
        title: "Validação de integridade e teste de mesa em C#",
        subtitle: "Revisão e desafio · validação de integridade do fluxograma",
        theory: "A validação de integridade do fluxograma culmina no teste de mesa (desk checking): simular a execução com uma tabela contendo colunas para variáveis (subtotal, frete, desconto, total) e condições booleanas. Esse ensaio manual garante que todos os casos cheguem ao Fim com precisão matemática.",
        questions: [
        q("O que caracteriza a técnica de \"teste de mesa\" aplicada a um fluxograma de algoritmo?", "Executar manualmente no papel cada instrução do diagrama com dados simulados, rastreando variáveis", ["Testar se a mesa de trabalho está nivelada","Uma ferramenta de benchmarking da CLI"], "O teste de mesa verifica a consistência do algoritmo na ponta do lápis antes de digitar código."),
        q("O que indica se durante o teste de mesa uma variável é lida antes de ter recebido qualquer valor?", "Um defeito grave de dependência de dados que em C# causaria erro de compilação CS0165", ["Uma otimização recomendada","Um recurso de computação concorrente"], "Variáveis devem ser estritamente inicializadas antes de serem consumidas em expressões."),
        q("Quantos cenários de teste no mínimo devem ser aplicados para auditar um losango condicional simples?", "Dois cenários: um que produza resultado Verdadeiro e outro que produza Falso", ["Apenas um cenário","Nenhum cenário"], "Auditar os dois caminhos comprova que ambas as rotas operam conforme a especificação do sistema."),
        q("Por que a prática do teste de mesa é amplamente incentivada na formação de engenheiros de software?", "Desenvolve o raciocínio determinístico e reduz drasticamente o tempo gasto em depurações em produção", ["Porque o C# não possui depurador","Porque testes automatizados são proibidos"], "Compreender o percurso exato das instruções forma profissionais analíticos e resolutivos."),
        t("Qual prática manual clássica simula o percurso do algoritmo anotando valores em uma tabela?", ["teste de mesa"], "O teste de mesa rastreia a evolução das variáveis passo a passo.", "// Validacao manual: ____"),
        g("Complete o teste de mesa anotando o valor final de total para subtotal 80 e frete 15:", ["95"], "80 + 15 resulta em 95.", "// Resultado final do teste de mesa: \"____\""),
        o("Ordene os passos para conduzir um teste de mesa rigoroso sobre um algoritmo:", ["Construir a tabela com colunas para cada variável, entrada, cálculo e condição","Definir os casos de teste contemplando caminho feliz, limites e dados inválidos","Percorrer bloco a bloco anotando a evolução exata de cada variável a cada linha","Comparar as saídas obtidas na tabela com os resultados formalmente especificados"], "A disciplina do teste de mesa comprova o determinismo absoluto do algoritmo."),
        p("Associe a constatação do teste de mesa à sua causa técnica correspondente:", [["Loop interminável na tabela","A condição do laço nunca se torna falsa para permitir a saída"],["Divisão por zero detectada","Ausência de pré-condição validando se o denominador é maior que zero"],["Valor incorreto na fronteira","Operador relacional equivocado no losango (> em vez de >=)"],["Gabarito 100% conferido","Algoritmo validado e perfeitamente pronto para implementação em código"]], "A validação estrutural na prancheta é o maior escudo de qualidade em engenharia de software.")
        ]
      }
    ]
  });
})();
