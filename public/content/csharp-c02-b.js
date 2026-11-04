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

  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS.csharp = window.LINCODE_CHAPTER_UNITS.csharp || {};
  window.LINCODE_CHAPTER_UNITS.csharp['csharp-c02'] = Object.assign(window.LINCODE_CHAPTER_UNITS.csharp['csharp-c02'] || {}, {
    5: [
      {
        id: "cs-alg-5-1-laco-while-csharp",
        title: "O laço while e ciclos desenhados em C#",
        subtitle: "Apresentação · Repetição com verificação prévia",
        theory: "O laço while em C# executa repetidamente um bloco de código enquanto sua condição booleana for avaliada como true. O teste ocorre antes de entrar no corpo do laço: se a condição for falsa logo no primeiro momento, as instruções internas não rodam nenhuma vez, espelhando a decisão pré-testada do fluxograma.",
        questions: [
          q("Em que instante a condição lógica de um laço while é avaliada em C#?", "Antes de cada repetição do corpo do laço (pré-teste)", ["Apenas ao término da última volta","Durante a compilação do assembly"], "A avaliação prévia impede a entrada no corpo caso a condição já seja false de início."),
          q("O que acontece se a condição booleana de um while (true) nunca for alterada para false?", "Ocorre um loop infinito, ocupando a CPU indefinidamente até interrupção externa", ["O programa finaliza com código de sucesso","O compilador reescreve o laço automaticamente"], "Laços sem mecanismo de saída válida travam a execução da thread corrente."),
          q("Qual tipo primitivo a condição do laço while exige obrigatoriamente em C#?", "bool (true ou false)", ["int (0 ou 1)","string"], "C# é fortemente tipado e não permite inteiros como predicados condicionais no while."),
          q("No fluxograma, como se representa o retorno do fluxo de controle em um laço while?", "Por uma seta orientada que sai do fim do bloco e reingressa no losango de teste", ["Por um ponto de exclamação vermelho","Por dois losangos paralelos"], "A linha de retroalimentação fecha o ciclo visual de repetição."),
          t("Quantas voltas o laço executa: int c = 0; while (c < 4) { c++; }?", ["4"], "O laço itera para c = 0, 1, 2 e 3, totalizando 4 execuções.", "int c = 0;\nwhile (c < 4) {\n    c++;\n}"),
          g("Complete o comando de laço pré-testado em C#:", ["while (ativo)"], "while repete as instruções enquanto a condição booleana for true.", "____ {\n    ExecutarCiclo();\n}"),
          o("Ordene as etapas da execução de um ciclo while em C#:", ["Avaliar a expressão booleana contida entre parênteses","Se true, ingressar no corpo do bloco e executar os comandos","Retornar pela seta de ciclo para nova avaliação da condição","Se false, desviar pela saída do laço e continuar a rotina"], "Sequência operacional canônica de laços pré-testados."),
          p("Associe elemento do laço while ao seu propósito:", [["while (cond)","Testa a condição antes de cada iteração"],["Condição de parada","Critério lógico que finaliza as repetições"],["Corpo do laço","Instruções executadas repetidamente"],["Variável de controle","Dado modificado para convergir ao término"]], "Componentes essenciais de repetições pré-testadas em C#.")
        ]
      },
      {
        id: "cs-alg-5-2-laco-do-while-csharp",
        title: "O laço do-while e garantia de primeiro passo",
        subtitle: "Prática · Ciclos pós-testados em C#",
        theory: "O laço do-while executa o corpo de comandos primeiro e avalia a condição booleana apenas no final da iteração. Essa garantia de execução de pelo menos uma vez é ideal para rotinas de leitura de entrada, menus interativos de terminal e validação de dados solicitados ao usuário.",
        questions: [
          q("Qual é a garantia fundamental oferecida pelo laço do-while em C#?", "Executa o corpo de instruções ao menos uma vez, mesmo se a condição inicial for false", ["Garante que não haverá consumo de memória","Impede a digitação de números negativos"], "Por ter teste no final (pós-teste), a primeira passagem ocorre incondicionalmente."),
          q("Qual pontuação é sintaticamente obrigatória ao final da instrução do-while em C#?", "Ponto e vírgula (;): do { ... } while (condicao);", ["Dois pontos (:)","Ponto final (.)"], "A sintaxe da linguagem C# exige ponto e vírgula após fechar os parênteses do while."),
          q("Em qual contexto o laço do-while expressa a intenção do algoritmo de forma mais limpa?", "Solicitar uma senha ou entrada ao usuário e validar se deve repetir a solicitação", ["Calcular raízes de matrizes estáticas","Definir propriedades de classes"], "A leitura do dado precisa ocorrer antes de avaliar se a entrada fornecida é aceitável."),
          q("Como representar o laço do-while graficamente no fluxograma?", "O fluxo entra direto no bloco de processamento e depois desce para o losango de teste", ["O losango fica antes do bloco","Usa-se um círculo sem setas"], "A ação precede a bifurcação no fluxo descendente do diagrama."),
          t("Qual é o valor final de n após: int n = 0; do { n += 5; } while (false);?", ["5"], "O corpo executa uma vez adicionando 5; a condição false encerra o laço.", "int n = 0;\ndo {\n    n += 5;\n} while (false);\nConsole.Write(n);"),
          g("Complete o encerramento da estrutura do-while em C#:", ["while (opcao != 0);"], "O do-while finaliza com a condição e o ponto e vírgula.", "do {\n    ExibirMenu();\n} ____"),
          o("Ordene as etapas da repetição pós-testada em C#:", ["Executar os comandos do corpo do laço incondicionalmente na primeira volta","Avaliar a condição booleana no término da volta","Se true, retornar ao início do bloco do para nova repetição","Se false, prosseguir imediatamente para a próxima instrução"], "Operação sequencial de repetições com pós-teste."),
          p("Associe tipo de ciclo à sua característica de disparo inicial:", [["while pré-testado","Pode não executar nenhuma vez se iniciar com false"],["do-while pós-testado","Executa compulsoriamente ao menos uma primeira volta"],["Menu de terminal","Caso de uso ideal para laço do-while"],["Ponto e vírgula final","Elemento sintático obrigatório após while no do-while"]], "Comparativo de controle de fluxo entre while e do-while em C#.")
        ]
      },
      {
        id: "cs-alg-5-3-laco-for-csharp",
        title: "O laço for canônico com contador",
        subtitle: "Prática · Iteração com inicializador, condição e passo",
        theory: "O laço for unifica as três fases da iteração em uma linha compacta: inicialização da variável contadora, condição de permanência e passo de incremento/decremento: for (int i = 0; i < n; i++). Essa estrutura compacta delimita o escopo de variáveis e reduz o risco de esquecimentos de incremento.",
        questions: [
          q("Quais são as três partes separadas por ponto e vírgula no cabeçalho do laço for?", "Inicializador, condição booleana e iterador (passo)", ["Declaração, leitura e escrita","Entrada, pausa e encerramento"], "for (inicializador; condicao; iterador) organiza os componentes do ciclo iterativo."),
          q("Qual é o escopo da variável int i declarada no cabeçalho for (int i = 0; ...)?", "Escopo local restrito exclusivamente ao corpo do laço for", ["Escopo global de toda a aplicação","Acessível em todos os métodos da classe"], "A variável de controle deixa de existir assim que a execução do laço termina."),
          q("Como escrever um laço for em C# que percorre os números de 20 até 0 de 2 em 2?", "for (int i = 20; i >= 0; i -= 2)", ["for (int i = 0; i <= 20; i += 2)","for (int i = 20; i > 0; i++)"], "Inicia em 20, permanece enquanto for maior ou igual a zero e subtrai 2 a cada volta."),
          q("Quantas iterações ocorrem no laço for (int i = 1; i <= 5; i++)?", "Exatamente 5 iterações (para i = 1, 2, 3, 4 e 5)", ["4 iterações","6 iterações"], "Com intervalo fechado [1, 5] e incremento unitário, o laço roda 5 vezes."),
          t("Qual resultado é impresso por: int soma = 0; for(int i=1; i<=4; i++) soma += i;?", ["10"], "1 + 2 + 3 + 4 = 10.", "int soma = 0;\nfor (int i = 1; i <= 4; i++) soma += i;\nConsole.Write(soma);"),
          g("Complete o cabeçalho do laço para iterar 5 vezes a partir do índice zero:", ["for (int i = 0; i < 5; i++)"], "Cabeçalho clássico de laço com contador em C#.", "____ {\n    ProcessarItem(i);\n}"),
          o("Ordene a cronologia de eventos na execução de um laço for:", ["Executar a instrução de inicialização do contador (int i = 0)","Avaliar a condição lógica; se true, entrar no corpo","Executar os comandos contidos no bloco do laço","Executar a expressão de incremento (i++) e reavaliar a condição"], "Ciclo de máquina de estados da instrução for em C#."),
          p("Associe termo do laço for à sua ação no ciclo:", [["int i = 0","Inicializa o contador na primeira vez"],["i < n","Testa continuidade antes de cada repetição"],["i++","Avança o contador após o término do bloco"],["Escopo de bloco","Impede vazamento da variável contadora"]], "Divisão de responsabilidades no cabeçalho do laço for em C#.")
        ]
      },
      {
        id: "cs-alg-5-4-acumuladores-e-contadores",
        title: "Contadores, acumuladores e sentinelas",
        subtitle: "Prática · Agregando totais e detectando marcos",
        theory: "Contadores medem quantas vezes um evento ocorreu (cont++), acumuladores consolidam somas dinâmicas (total += valor) e sentinelas sinalizam eventos de parada (ex: flagAchou = true). No fluxograma, cada uma dessas variáveis possui seu retângulo de inicialização antes do início dos laços.",
        questions: [
          q("Qual é a diferença funcional entre um contador e um acumulador em algoritmos?", "Contadores somam quantidades fixas (passos); acumuladores somam grandezas variáveis", ["Acumuladores só funcionam com datas","Contadores não podem ser decrementados"], "O contador marca repetições ou ocorrências; o acumulador totaliza grandezas monetárias ou métricas."),
          q("Com qual valor um acumulador de somas deve ser inicializado antes do laço?", "0 (zero), o elemento neutro da adição", ["1 (um)","-1"], "Zero garante que a soma reflita fielmente os valores agregados ao longo do percurso."),
          q("O que é uma variável sentinela em um algoritmo de repetição?", "Um valor especial ou flag que indica término ou detecção de um estado de parada", ["Um número que não pode ser multiplicado","Uma variável apagada da memória"], "O sentinela sinaliza que o objetivo foi atingido ou que o fluxo de entrada encerrou."),
          q("Qual operador composto em C# acumula o valor de forma concisa?", "+=", ["-=","*="], "total += valor é equivalente a total = total + valor."),
          t("Quantos números ímpares existem no intervalo de 1 a 5 (inclusive)?", ["3"], "Os números ímpares são 1, 3 e 5, totalizando 3 ocorrências.", "int cont = 0;\nfor (int i = 1; i <= 5; i++) if (i % 2 != 0) cont++;"),
          g("Complete o operador para acumular o preço no subtotal do pedido:", ["subtotal += item.Preco;"], "+= adiciona o preço ao subtotal existente.", "____ // acumula valor do produto"),
          o("Ordene as etapas de uma rotina de contagem com acumulador de média:", ["Declarar e inicializar soma = 0.0 e cont = 0 antes do laço","Percorrer a coleção acumulando soma += item e cont++","Após o laço, verificar se cont > 0 para evitar divisão por zero","Calcular media = soma / cont e entregar o resultado"], "Sequência robusta de agregação estatística com proteção."),
          p("Associe papel da variável à sua atribuição inicial:", [["Contador de voltas","int cont = 0;"],["Acumulador de saldo","decimal total = 0m;"],["Acumulador de produto","long produto = 1L;"],["Flag sentinela","bool encontrado = false;"]], "Padrões de inicialização de variáveis de estado em C#.")
        ]
      },
      {
        id: "cs-alg-5-5-projeto-varredura-interrupcao",
        title: "Projeto: busca com break e filtro com continue",
        subtitle: "Consolidação · Construindo algoritmo de varredura eficiente",
        theory: "Neste projeto prático, combinamos laços, contadores, acumuladores e instruções break/continue em C#. O algoritmo processa uma lista de pagamentos, ignora transações canceladas com continue, acumula os pagamentos legítimos e interrompe imediatamente a execução com break se detectar fraude.",
        questions: [
          q("Qual é o efeito imediato da instrução break dentro de um laço em C#?", "Interrompe sumariamente a repetição e salta para a próxima instrução após o laço", ["Reinicia a contagem de iterações","Fecha a aplicação de terminal"], "break encerra prematuramente a estrutura de repetição ao atingir uma condição crítica."),
          q("Qual é o comportamento da instrução continue em um laço for em C#?", "Pula o restante da iteração corrente e passa para a expressão de incremento", ["Cancela todo o laço","Executa apenas a primeira linha do laço"], "continue descarta os passos finais da volta atual sem abandonar a repetição."),
          q("Em que situação o uso de break é considerado essencial para o desempenho?", "Ao localizar o registro desejado em uma busca, evitando iterações desnecessárias", ["Para formatar datas no console","Para declarar classes abstratas"], "Cessar a busca logo após atingir o objetivo economiza processamento e tempo."),
          q("Como representar graficamente a instrução continue em um fluxograma?", "Uma seta que sai de uma decisão e desvia diretamente para o ponto de incremento do laço", ["Um círculo preto fechado","Uma seta apontando para fora da página"], "A seta pula o corpo operacional e reingressa no passo de avanço do ciclo."),
          t("Se um laço de 1 a 10 usa break quando i == 4, qual último valor processado?", ["3"], "Na volta com 4 o break dispara antes de processar, logo o último foi 3.", "int ultimo = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i == 4) break;\n    ultimo = i;\n}"),
          g("Complete o comando que pula transações inválidas no laço:", ["continue;"], "continue pula para a próxima iteração.", "if (transacao.Invalida) {\n    ____\n}"),
          o("Ordene a rotina de auditoria de pagamentos com break e continue:", ["Iniciar o laço percorrendo a coleção de transações financeiras","Se a transação for suspeita de fraude, disparar alarme e break","Se a transação for estorno, pular com continue sem somar","Caso contrária, acumular no total líquido regular"], "Lógica de auditoria combinando processamento, salto e corte."),
          p("Associe instrução de fluxo ao seu resultado operacional:", [["break;","Cancela e finaliza o laço imediatamente"],["continue;","Pula para a próxima iteração ignorando o resto do corpo"],["return;","Abandona o método inteiro contendo o laço"],["loop infinito","Repetição que falha em alcançar condição de término"]], "Comandos de alteração e controle do fluxo de repetições em C#.")
        ]
      }
    ],
    6: [
      {
        id: "cs-alg-6-1-teste-mesa-csharp",
        title: "O teste de mesa e rastreamento de memória em C#",
        subtitle: "Apresentação · Acompanhamento sistemático de variáveis",
        theory: "O teste de mesa é a disciplina de auditar algoritmos manualmente em papel ou tabela. Cada coluna representa uma variável, condição ou saída, e cada linha registra a mutação de estado após cada instrução. Essa simulação revela inconsistências lógicas e erros conceituais antes da codificação.",
        questions: [
          q("O que compõe uma tabela de teste de mesa na metodologia de algoritmos?", "Colunas para instruções, variáveis de estado e condições avaliadas linha a linha", ["Apenas o nome do programador","Uma lista de comentários em inglês"], "A tabela reflete a máquina de estados sequencial do processador e da memória."),
          q("Por que o teste de mesa manual previne erros caros de desenvolvimento?", "Permite comprovar a corretude lógica e casos extremos antes de gastar tempo codificando", ["Porque substitui o uso do compilador C#","Porque reduz o uso de energia da tela"], "Identificar falhas de concepção no papel é muito mais rápido e econômico."),
          q("Ao registrar uma atribuição em uma variável primitiva na tabela, o que fazemos?", "Substituímos o valor antigo pelo novo dado na coluna correspondente", ["Criamos uma nova folha de papel","Multiplicamos o valor anterior por dez"], "Variáveis primitivas armazenam apenas o valor momentâneo atual na célula de memória."),
          q("Como registrar uma decisão condicional com losango na tabela de rastreamento?", "Anotar a expressão, o resultado booleano (true/false) e o ramo seguido", ["Deixar a célula em branco","Anotar apenas números pares"], "Registrar o veredito explica a razão do desvio tomado pelo fluxo de controle."),
          t("Se x=4 e executa x = x * 3 - 2, qual valor deve ser registrado para x na tabela?", ["10"], "4 * 3 = 12; 12 - 2 = 10.", "int x = 4;\nx = x * 3 - 2;\nConsole.Write(x);"),
          g("Complete a instrução de saída de rastreamento de variáveis no console C#:", ["Console.WriteLine($\"a={a}, b={b}\");"], "Interpolação de strings em C# facilita a inspeção de estado.", "____ // log de depuração"),
          o("Ordene as etapas para realizar um teste de mesa em C#:", ["Listar todas as variáveis, laços e condições no cabeçalho da tabela","Preencher a linha inicial com os valores de entrada recebidos","Executar comando a comando atualizando o estado nas colunas","Registrar a saída final e conferir contra o gabarito esperado"], "Roteiro estruturado para auditoria analítica de código."),
          p("Associe termo do teste de mesa ao seu significado:", [["Cabeçalho","Identifica as variáveis e condições acompanhadas"],["Linha de estado","Captura os dados após a execução de uma instrução"],["Veredito booleano","Resultado que direciona o próximo ramo a ser seguido"],["Saída final","Resultado impresso ou retornado ao término da rotina"]], "Elementos estruturais do rastreamento por teste de mesa.")
        ]
      },
      {
        id: "cs-alg-6-2-prevencao-index-out-of-range",
        title: "Prevenção de IndexOutOfRangeException em C#",
        subtitle: "Prática · Auditoria de limites de arrays e coleções",
        theory: "Arrays em C# possuem índices de 0 a Length - 1. Acessar o índice Length dispara a exceção fatal IndexOutOfRangeException. O teste de mesa audita explicitamente as fronteiras: a primeira posição (índice 0) e a última posição (índice Length - 1), garantindo percursos seguros.",
        questions: [
          q("Qual exceção em tempo de execução o C# lança ao tentar acessar índice inválido de array?", "IndexOutOfRangeException", ["NullReferenceException","ArgumentException"], "O runtime do .NET bloqueia leituras ou escritas fora da área de memória alocada ao array."),
          q("Se um array foi declarado como int[] itens = new int[6], qual é o último índice válido?", "5 (os índices válidos vão de 0 a 5)", ["6","4"], "Como a contagem inicia em zero, o índice máximo é Length - 1."),
          q("Qual condição errônea no cabeçalho for frequentemente provoca IndexOutOfRangeException?", "Escrever i <= array.Length em vez de i < array.Length", ["Escrever i++","Declarar int i = 0"], "O operador <= tenta ler o índice igual a Length, que não existe no array."),
          q("Como o teste de mesa ajuda a prevenir erros de limites em coleções?", "Acompanhando a variável de índice na última volta do laço para garantir que seja menor que Length", ["Calculando o consumo de energia","Criando testes aleatórios"], "Inspecionar a fronteira superior na tabela expõe de imediato a tentativa de acesso irregular."),
          t("Quantos índices válidos possui um array com Length igual a 8 (de 0 até qual número)?", ["7"], "Os índices válidos vão de 0 a 7, totalizando 8 posições.", "// Length = 8 -> índices de 0 a 7"),
          g("Complete a condição estrita para evitar IndexOutOfRangeException:", ["i < lista.Length"], "O operador estrito < garante que o índice não ultrapasse o último elemento.", "for (int i = 0; ____; i++) {\n    Processar(lista[i]);\n}"),
          o("Ordene a verificação de fronteiras em um array de tamanho N em C#:", ["Testar o primeiro elemento: i = 0 deve ser lido com sucesso","Testar o penúltimo elemento: i = N - 2 opera regularmente","Testar o último elemento válido: i = N - 1 consome o dado com êxito","Testar a terminação: quando i atinge N, o laço encerra sem tentar ler array[N]"], "Análise das fronteiras de percursos indexados em coleções."),
          p("Associe expressão de array em C# ao seu resultado:", [["arr[0]","Primeiro elemento válido de qualquer array não vazio"],["arr[arr.Length - 1]","Último elemento válido contido no array"],["arr[arr.Length]","Acesso inválido que dispara IndexOutOfRangeException"],["arr.Length","Quantidade total de elementos alocados no array"]], "Mapeamento de índices e limites de vetores em C#.")
        ]
      },
      {
        id: "cs-alg-6-3-troca-variaveis-e-tuplas",
        title: "Troca de variáveis com temp e tuplas em C#",
        subtitle: "Prática · Permutando dados sem sobrescrita indevida",
        theory: "Para inverter duas variáveis primitivas em C#, usa-se tradicionalmente uma variável temporária auxiliar (temp). C# moderno também permite a elegante sintaxe de tuplas: (a, b) = (b, a). Rastrear essas operações na tabela de memória garante que nenhum valor seja perdido por sobreposição precoce.",
        questions: [
          q("Por que a tentativa de troca a = b; b = a; corrompe os dados em memória?", "Porque a primeira linha sobrescreve o valor de a, destruindo-o antes de ser passado para b", ["Porque C# não permite atribuir uma variável a outra","Porque b se torna null"], "A sobrescrita imediata apaga o valor anterior de a sem que b possa recuperá-lo."),
          q("Qual é a sequência clássica de três instruções para permutar a e b com temp?", "int temp = a; a = b; b = temp;", ["a = b; b = temp; temp = a;","temp = b; a = temp; b = a;"], "Salva a em temp, transfere b para a e recupera temp para b."),
          q("Qual é a sintaxe moderna e concisa de C# para trocar duas variáveis sem usar temp explícito?", "(a, b) = (b, a);", ["swap(a, b);","[a, b] = [b, a];"], "C# utiliza tuplas para atribuir e desconstruir valores simultaneamente de forma limpa."),
          q("No teste de mesa da troca (a, b) = (b, a), qual é a garantia da tupla intermediária?", "Os valores do lado direito são avaliados e empacotados antes de qualquer atribuição ao lado esquerdo", ["As variáveis são gravadas em disco","A memória RAM é reiniciada"], "A avaliação prévia dos membros da tupla impede a perda por sobrescrita."),
          t("Se a=5 e b=9, após (a, b) = (b, a); qual é o valor final de b?", ["5"], "A variável b recebe o valor original de a (5).", "int a = 5, b = 9;\n(a, b) = (b, a);\nConsole.Write(b);"),
          g("Complete a troca de variáveis com tupla desestruturada em C#:", ["(a, b) = (b, a);"], "Tupla realiza a troca atômica sem variável auxiliar temporária.", "int a = 10, b = 20;\n____ // troca de valores"),
          o("Ordene as operações de troca de variáveis com variável temporária:", ["Declarar temp e copiar o valor original de a: int temp = a;","Copiar o valor de b para dentro de a: a = b;","Copiar o valor salvo em temp para dentro de b: b = temp;","Concluir com as variáveis alternadas com sucesso"], "Operação elementar de permutação de dados na memória."),
          p("Associe padrão de troca de variáveis em C# à sua característica:", [["int temp = a;","Preserva o dado original de a na memória temporária"],["(a, b) = (b, a);","Sintaxe expressiva com tuplas do C# moderno"],["a = b; b = a;","Erro clássico que perde o valor original de a"],["Permutação","Operação onde duas variáveis invertem seus conteúdos"]], "Padrões de manipulação e troca de memória em C#.")
        ]
      },
      {
        id: "cs-alg-6-4-invariantes-e-terminacao-csharp",
        title: "Invariantes de laço e garantias de término",
        subtitle: "Avançado · Demonstração lógica de corretude",
        theory: "Um invariante de laço em C# é uma asserção lógica que se conserva verdadeira antes, durante e após a execução do laço. Rastrear o invariante comprova matematicamente que cada iteração aproxima o algoritmo de seu término e que a saída gerada no encerramento é estritamente correta.",
        questions: [
          q("O que define um invariante de laço na ciência da computação?", "Uma propriedade lógica que permanece verdadeira em todas as iterações do ciclo iterativo", ["Uma variável cujo valor é congelado para sempre","Um erro que impede a compilação"], "O invariante formaliza o progresso correto e consistente do algoritmo a cada etapa."),
          q("Quais três propriedades devem ser demonstradas para validar um invariante de laço?", "Inicialização (base), Manutenção (indução) e Término (conclusão correta)", ["Declaração, compilação e execução","Entrada, pausa e encerramento"], "Idêntico à indução matemática: válido no início, preservado a cada volta e provado no término."),
          q("Qual é o invariante no algoritmo de cálculo de produto acumulado em laço?", "Em cada passo i, a variável produto contém a multiplicação dos itens de índice 0 até i - 1", ["O produto sempre é igual a zero","O produto duplica a cada volta"], "Garante que a variável produto representa a verdade matemática sobre o subconjunto percorrido."),
          q("O que garante que um laço for (int i = 0; i < n; i++) atingirá o término se n >= 0?", "A expressão (n - i) é um variante estritamente decrescente limitado inferiormente por zero", ["O runtime encerra laços longos","O processador desliga"], "Um variante decrescente com limite inferior prova que o laço atinge o término em passos finitos."),
          t("Quantas voltas restam para finalizar um laço com i=8 e limite n=12?", ["4"], "12 - 8 = 4 voltas restantes.", "// voltas restantes = n - i"),
          g("Complete a asserção que verifica o invariante de índice válido no laço:", ["System.Diagnostics.Debug.Assert(i >= 0 && i <= n);"], "Debug.Assert valida invariantes em modo de teste.", "____ // garantia de invariante de limites"),
          o("Ordene as etapas da demonstração de corretude com invariante de laço:", ["Inicialização: provar que a propriedade é verdadeira antes da primeira volta","Manutenção: provar que a propriedade se mantém verdadeira após cada volta","Demonstrar a terminação mostrando que o variante atinge a condição de parada","Término: utilizar o invariante final para provar a corretude do resultado"], "Metodologia indutiva para comprovação formal de algoritmos."),
          p("Associe estágio da prova ao seu significado formal:", [["Inicialização","Propriedade válida antes da primeira iteração"],["Manutenção","A propriedade se preserva intacta a cada nova volta"],["Variante de laço","Medida estritamente decrescente que garante a parada"],["Término","Comprovação de que o resultado final satisfaz a especificação"]], "Fundamentos da verificação de algoritmos iterativos.")
        ]
      },
      {
        id: "cs-alg-6-5-projeto-depuracao-financeira",
        title: "Projeto: depuração guiada de algoritmo financeiro",
        subtitle: "Consolidação · Encontrando e corrigindo bugs pelo rastreamento",
        theory: "Neste projeto prático, auditamos um algoritmo financeiro de cálculo de juros compostos com uma discrepância oculta. Utilizando a tabela de rastreamento com valores simulados, localizamos o erro de sobrescrita prematura de variáveis, corrigimos a lógica e comprovamos a estabilidade dos cálculos.",
        questions: [
          q("Qual é a postura correta de um desenvolvedor ao receber um relato de bug financeiro?", "Reproduzir a falha com valores conhecidos e auditar a execução passo a passo em tabela de mesa", ["Reescrever o código do zero sem entender o bug","Ignorar se o valor da divergência for pequeno"], "A depuração sistemática identifica a causa raiz antes de qualquer alteração de código."),
          q("Como a tabela de teste de mesa expõe falhas de acumulação de valores?", "Evidencia a discrepância entre o valor calculado e o esperado na linha exata da conta defeituosa", ["O terminal emite um aviso sonoro","A tabela muda de cor automaticamente"], "A auditoria analítica linha a linha localiza a instrução causadora do desvio financeiro."),
          q("Se o juro deveria ser aplicado apenas para saldos negativos (saldo < 0), mas o código usa <= 0:", "O caso de teste com saldo exatamente zero expõe o bug tarifando indevidamente a conta", ["O caso de teste com saldo 100 expõe o bug","O caso com saldo -50 expõe o bug"], "Casos de borda no zero diferenciam operadores estritos (<) de inclusivos (<=)."),
          q("O que deve ser realizado imediatamente após a correção do código em C#?", "Reexecutar o teste de mesa e toda a suíte de testes de regressão com sucesso", ["Publicar o executável sem validar","Apagar a documentação de testes"], "A revalidação comprova que o defeito foi eliminado sem gerar efeitos colaterais."),
          t("Se a tarifa corrigida para saldo 0 é 0, qual valor deve ser registrado na tabela?", ["0"], "Saldo zero não incide juros nem tarifas no critério corrigido.", "// tarifa = 0 para saldo exatamente zero"),
          g("Complete a correção da condição para incidir juros apenas em saldos negativos:", ["saldo < 0"], "Menor estrito (< 0) incide juros apenas em valores estritamente negativos.", "if (____) {\n    AplicarJuros();\n}"),
          o("Ordene as etapas de diagnóstico e correção do algoritmo financeiro:", ["Criar o caso de teste financeiro que reproduz a falha de saldo","Montar a tabela de teste de mesa auditando instrução por instrução","Identificar a linha onde o cálculo diverge do resultado esperado","Corrigir a expressão matemática e homologar com nova rodada de testes"], "Ciclo metódico de auditoria, correção e validação de software."),
          p("Associe etapa de manutenção ao seu papel no projeto:", [["Reprodução da falha","Cenário com dados controlados que geram o erro financeiro"],["Isolamento da causa","Localização da instrução que calculou a taxa incorreta"],["Correção de código","Ajuste do operador condicional para a regra estrita"],["Teste de regressão","Garantia de que os demais cálculos continuam corretos"]], "Boas práticas profissionais no diagnóstico de software financeiro.")
        ]
      }
    ],
    7: [
      {
        id: "cs-alg-7-1-classes-equivalencia-csharp",
        title: "Casos de teste e classes de equivalência em C#",
        subtitle: "Apresentação · Particionamento inteligente de cenários",
        theory: "O particionamento em classes de equivalência divide o universo de entradas em conjuntos que recebem o mesmo tratamento pelo algoritmo. Selecionar um elemento representativo de cada classe (válida ou inválida) permite validar toda a lógica com poucos testes altamente eficientes.",
        questions: [
          q("O que é uma \"classe de equivalência\" no contexto de testes de software?", "Um subconjunto de entradas para o qual o algoritmo produz o mesmo comportamento esperado", ["Uma classe que herda de System.Object","Um arquivo com linhas duplicadas"], "Testar um valor representativo de cada partição é suficiente para aferir o grupo todo."),
          q("Para um método que aceita descontos de 0% a 100%, quais são as classes típicas?", "Porcentagens negativas (inválidas), de 0 a 100 (válidas) e maiores que 100 (inválidas)", ["Apenas o número 50 testado vinte vezes","Todos os números complexos"], "Mapear intervalos válidos e inválidos estabelece a base da cobertura funcional."),
          q("Por que é inviável testar todas as entradas numéricas possíveis de um método em C#?", "Porque o número de combinações de dados em memória tende ao infinito", ["Porque o compilador C# impede testes múltiplos","Porque a tela queima ao rodar muitos testes"], "A amostragem inteligente por equivalência substitui a impossível exaustão total."),
          q("O que compõe a especificação completa de um caso de teste em C#?", "Entradas fornecidas, pré-condições do ambiente e o resultado esperado bem definido", ["Apenas o nome do autor do código","O horário do build"], "Sem o resultado esperado estipulado previamente, não há como aferir conformidade."),
          t("Quantos casos de teste representativos cobrem 4 classes de equivalência identificadas?", ["4"], "Um teste representativo por partição atende aos requisitos de cobertura.", "// 1 teste por classe = 4 testes"),
          g("Complete a asserção que compara o resultado obtido com o gabarito esperado em C#:", ["esperado == obtido"], "A igualdade valida a conformidade do cálculo no teste.", "Debug.Assert(____, \"Resultado divergente\");"),
          o("Ordene as etapas do planejamento de testes por classes de equivalência:", ["Analisar os requisitos e especificações da regra de negócio","Particionar os dados de entrada em classes válidas e classes inválidas","Selecionar um valor representativo típico para cada classe mapeada","Executar os casos de teste registrando conformidade contra a saída esperada"], "Metodologia estruturada de projeto de testes de software."),
          p("Associe termo de teste ao seu propósito funcional:", [["Entrada de teste","Valores alimentados no algoritmo para teste"],["Saída esperada","Resultado correto previsto pela especificação"],["Classe válida","Entradas legítimas que o sistema deve processar"],["Classe inválida","Entradas anômalas que o sistema deve rejeitar"]], "Elementos constitutivos do projeto de testes por equivalência.")
        ]
      },
      {
        id: "cs-alg-7-2-analise-valores-limite",
        title: "Análise de valores-limite e bordas em C#",
        subtitle: "Prática · Auditoria das transições críticas de regras",
        theory: "A análise de valores-limite (borda) foca nos extremos dos intervalos de entrada: o valor limite exato, o valor imediatamente anterior e o imediatamente posterior. É nessas fronteiras que os desenvolvedores cometem a maior parte dos erros relacionais (ex: confundir > com >=).",
        questions: [
          q("Por que a análise de valores-limite é a técnica mais produtiva na busca de bugs?", "Porque falhas de software concentram-se nas transições e fronteiras dos intervalos", ["Porque valores de borda exigem menos memória","Porque o compilador ignora o meio da faixa"], "Erros de off-by-one e limites inclusivos versus exclusivos manifestam-se nas bordas."),
          q("Se uma taxa é cobrada para valores estritamente maiores que 100 (valor > 100), quais valores testam a borda?", "Valores 99, 100 (fronteira exata sem taxa) e 101 (primeiro valor com taxa)", ["Valores 10, 500 e 1000","Apenas o valor zero"], "Testar a fronteira exata e seus vizinhos imediatos garante a correção do operador relacional."),
          q("Quais são as fronteiras numéricas extremas para o tipo int em C#?", "int.MinValue (-2.147.483.648) e int.MaxValue (2.147.483.647)", ["Apenas -1 e 1","Zero e dez mil"], "Operações aritméticas nos limites de int podem sofrer overflow silencioso se não tratadas."),
          q("O que a palavra-chave checked faz em blocos de cálculo aritmético em C#?", "Lança uma OverflowException caso uma operação com inteiros estoure os limites do tipo", ["Arredonda o número para zero","Transforma o número em double"], "O bloco checked impede wrap-around silencioso, garantindo segurança matemática estrita."),
          t("Qual número inteiro testa a fronteira imediatamente anterior à condição x >= 50?", ["49"], "O número 49 é o predecessor inteiro direto de 50.", "// borda: 49, 50, 51"),
          g("Complete o bloco seguro que detecta estouro de limites numéricos em C#:", ["checked"], "checked força o lançamento de OverflowException em estouros.", "____ {\n    int resultado = int.MaxValue + 1;\n}"),
          o("Ordene a seleção de valores de borda para testar a regra saldo >= 100:", ["Testar o valor imediatamente abaixo da borda: saldo = 99 (resultado: false)","Testar a fronteira exata do critério: saldo = 100 (resultado: true)","Testar o valor imediatamente acima da borda: saldo = 101 (resultado: true)","Homologar que o operador relacional é >= e não >"], "Auditoria de transição de regras por valores de fronteira."),
          p("Associe cenário de fronteira ao valor de teste correspondente:", [["Borda estrita (> 0)","Testar 0 (falso) e 1 (verdadeiro)"],["Borda inclusiva (>= 18)","Testar 17 (falso) e 18 (verdadeiro)"],["Limite de array","Length - 1 (último válido) e Length (exceção)"],["Extremo de int em C#","int.MaxValue e int.MinValue"]], "Mapeamento de valores de fronteira em testes algorítmicos em C#.")
        ]
      },
      {
        id: "cs-alg-7-3-cobertura-ramos-csharp",
        title: "Cobertura de código e ramos em C#",
        subtitle: "Aprofundamento · Garantindo que cada bifurcação seja exercitada",
        theory: "No teste de caixa-branca, inspecionamos os caminhos de controle do algoritmo para assegurar que nenhuma ramificação fique esquecida. A cobertura de ramos exige que cada saída booleana (true e false) de cada losango de decisão do fluxograma seja percorrida por ao menos um caso de teste.",
        questions: [
          q("O que mede a métrica de cobertura de ramos (branch coverage) em C#?", "A porcentagem de saídas booleanas (true e false) de decisões exercitadas pelos testes", ["O número de linhas comentadas no arquivo .cs","A quantidade de arquivos no projeto"], "Cobertura total de ramos assegura que nenhum desvio condicional ficou sem validação."),
          q("Quantos casos de teste no mínimo são requeridos para cobrir uma decisão if/else?", "Pelo menos dois casos: um que atenda à condição (true) e outro que a viole (false)", ["Apenas um caso com true","Quatro casos"], "Um caso testa o ramo Sim e o outro caso testa o ramo Não do losango."),
          q("Por que ter 100% de cobertura de linhas não é sinônimo de 100% de cobertura de ramos?", "Porque decisões sem bloco else executam a linha seguinte sem exercitar o ramo falso explicitamente", ["Porque o compilador desconsidera linhas de teste","Porque linhas de código não têm relação com testes"], "Ramos implícitos de escape podem ocultar falhas se não forem mapeados e testados."),
          q("O que a complexidade ciclomática indica ao desenvolvedor sobre a testabilidade?", "Indica a quantidade mínima de caminhos independentes que precisam de testes para cobertura total", ["Indica o tempo de download do arquivo","Indica o número de métodos na classe"], "Quanto maior a complexidade ciclomática, mais testes são necessários para cobrir o fluxo."),
          t("Quantos caminhos resultam de duas estruturas if-else aninhadas independentes?", ["4"], "2 decisões * 2 ramos cada = 4 combinações de caminhos possíveis.", "// 2^2 = 4 caminhos no grafo de controle"),
          g("Complete o teste para cobrir o ramo falso da condição if (isValido):", ["isValido = false;"], "Testar com false exercita a ramificação alternativa da decisão.", "bool ____\nProcessar(isValido);"),
          o("Ordene os passos para atingir cobertura completa de ramos em C#:", ["Mapear todos os operadores relacionais, if, switch e laços do método","Listar os caminhos de Verdadeiro e Falso de cada estrutura condicional","Elaborar casos de teste cobrindo ambas as ramificações de cada nó","Executar a ferramenta de cobertura (como Coverlet) e auditar o relatório"], "Metodologia para alcance de alta cobertura de ramos em .NET."),
          p("Associe tipo de cobertura ao seu objetivo:", [["Cobertura de linhas","Verifica se cada linha de código foi executada"],["Cobertura de ramos","Garante que todas as saídas de decisão foram visitadas"],["Complexidade ciclomática","Número mínimo de caminhos para cobertura total"],["Grafo de fluxo","Mapa de nós e arestas que representam o código"]], "Conceitos de auditoria estrutural e cobertura de código em C#.")
        ]
      },
      {
        id: "cs-alg-7-4-assercoes-e-programacao-defensiva",
        title: "Asserções e programação defensiva em C#",
        subtitle: "Prática · Debug.Assert e cláusulas de guarda fail-fast",
        theory: "Programação defensiva estabelece que métodos devem blindar-se contra estados corrompidos aplicando o princípio fail-fast. Em C#, utilizamos cláusulas de guarda que lançam exceções (ex: ArgumentNullException) para dados externos e Debug.Assert para checagem de invariantes internas em desenvolvimento.",
        questions: [
          q("Qual é o comportamento do método Debug.Assert(condicao, mensagem) em C#?", "Avalia a condição em builds de Debug e interrompe o fluxo exibindo a mensagem se for false", ["Roda em builds de Release fechando o sistema","Grava o log no banco de dados"], "Debug.Assert valida suposições internas do desenvolvedor durante o ciclo de desenvolvimento."),
          q("Por que Debug.Assert não deve ser usado para validar parâmetros de API em produção?", "Porque chamadas de Debug.Assert são eliminadas pelo compilador em builds de Release", ["Porque Debug.Assert não aceita strings","Porque consome muita internet"], "Validação de parâmetros em produção exige checagens explícitas com lançamento de ArgumentException."),
          q("Qual é o objetivo do princípio \"fail-fast\" na arquitetura de software?", "Interromper a operação imediatamente ao detectar anomalia, evitando corrupção silenciosa", ["Fazer o programa rodar mais rápido pulando verificações","Desligar a máquina automaticamente"], "Falhar rápido facilita o diagnóstico da causa raiz e previne danos cumulativos."),
          q("Qual método da classe ArgumentNullException simplifica validações a partir do C# 10?", "ArgumentNullException.ThrowIfNull(parametro);", ["ArgumentNullException.Check(parametro);","ArgumentNullException.Assert(parametro);"], "ThrowIfNull é a forma moderna e expressiva de aplicar cláusula de guarda para referências nulas."),
          t("Quantos alertas Debug.Assert(true, \"falha\") exibe na tela durante o teste?", ["0"], "Como a condição é verdadeira, nenhuma asserção é violada.", "Debug.Assert(true, \"Não será disparado\");"),
          g("Complete a cláusula de guarda moderna para validar parâmetro obrigatório em C#:", ["ArgumentNullException.ThrowIfNull(pedido);"], "Validação defensiva moderna e concisa no .NET.", "____ // guarda contra nulos"),
          o("Ordene a estrutura defensiva de um método em C#:", ["Validar parâmetros de entrada através de cláusulas de guarda explícitas","Executar o algoritmo central realizando transformações de estado","Validar invariantes internas através de Debug.Assert","Entregar o resultado final auditado e consistente para o chamador"], "Arquitetura fail-fast: blindagem de entrada, núcleo de cálculo e garantia de saída."),
          p("Associe mecanismo de defesa ao seu contexto apropriado:", [["ArgumentNullException","Validação mandatória de parâmetros recebidos do exterior"],["Debug.Assert","Verificação de invariantes internas em ambiente de depuração"],["fail-fast","Princípio de interrupção imediata perante inconsistências"],["Build de Release","Otimiza o binário eliminando chamadas de depuração"]], "Estratégias de confiabilidade e resiliência em código C#.")
        ]
      },
      {
        id: "cs-alg-7-5-projeto-auditoria-de-qualidade",
        title: "Projeto: validação completa de algoritmo de desconto",
        subtitle: "Consolidação · Da especificação à homologação com asserções",
        theory: "Neste projeto prático, construímos a suíte de testes completa para um algoritmo de cálculo de desconto progressivo de frete e cupom em C#. Aplicamos classes de equivalência, mapeamos fronteiras com valores-limite e homologamos 100% de cobertura de ramos através de asserções automatizadas.",
        questions: [
          q("Quais três pilares garantem a confiabilidade de um algoritmo antes da entrega?", "Especificação sem ambiguidade, casos de teste com valores de borda e cobertura completa de ramos", ["Digitar código rápido e testar apenas um exemplo fácil","Deixar a validação para os usuários"], "A engenharia metódica conecta especificação, teste de limites e auditoria de ramos."),
          q("Se o algoritmo oferece frete grátis para compras >= 150, quais valores homologam a borda?", "149 (cobra frete), 150 (frete grátis exato) e 151 (frete grátis com folga)", ["10, 20 e 30","Apenas o valor zero"], "Testar o limite exato e os vizinhos imediatos comprova o uso correto do operador relacional."),
          q("Por que uma suíte de testes automatizados é considerada um ativo permanente do software?", "Permite refatorar e aprimorar o código no futuro com a garantia de não introduzir regressões", ["Porque ocupa espaço no disco","Porque impede que o código seja modificado"], "Testes automatizados servem como especificação executável que protege contra quebras futuras."),
          q("Qual é a recomendação ao detectar uma falha durante a execução da suíte de validação?", "Identificar o caso de teste específico, rastrear a divergência e corrigir a regra na raiz", ["Apagar o teste que falhou para o build passar","Ignorar o teste com falha"], "Testes que falham são o sinal mais valioso de que o software encontrou uma lacuna a sanar."),
          t("Quantos testes aprovados confirmam o sucesso da suíte de 5 casos planejados?", ["5"], "Todos os 5 casos devem ter aprovação integral para homologação.", "// 5 casos com 100% de aprovação"),
          g("Complete a asserção final que homologa o resultado do algoritmo no projeto:", ["Debug.Assert(resultado == esperado);"], "Asserções homologam formalmente a entrega do algoritmo testável.", "____ // homologação do teste"),
          o("Ordene as etapas da validação integral do algoritmo de desconto:", ["Definir a matriz de requisitos contendo faixas de desconto e regras de cupom","Estruturar o fluxograma visual com nós de decisão e termos convergentes","Elaborar casos de teste abrangendo equivalência, valores de borda e ramos","Codificar a rotina em C# e homologar com 100% de asserções aprovadas"], "Ciclo completo de modelagem, codificação e homologação de software."),
          p("Associe artefato do projeto à sua finalidade:", [["Matriz de requisitos","Define formalmente regras de negócio e comportamentos"],["Fluxograma","Modela visualmente a topologia de decisões e trajetórias"],["Casos de borda","Auditores das transições críticas de intervalos numéricos"],["Suíte de asserções","Verificação automatizada garantindo conformidade e segurança"]], "Padrões de rigor e excelência na engenharia de algoritmos com C#.")
        ]
      }
    ],
    8: [
      {
        id: "cs-alg-8-1-especificacao-e-requisitos",
        title: "Especificação e requisitos do algoritmo",
        subtitle: "Apresentação · Definindo entradas, regras e saídas em C#",
        theory: "A primeira etapa de um projeto de algoritmo consiste em especificar com precisão matemática entradas, pré-condições, transformações e saídas. Ambiguidade nos requisitos é a principal causa de retrabalho em software. Definir contratos claros facilita a modelagem do fluxograma e a escrita de testes assertivos.",
        questions: [
          q("Qual é o primeiro passo indispensável antes de desenhar um fluxograma ou codificar?", "Especificar formalmente as entradas, transformações e saídas esperadas sem ambiguidade", ["Escolher a cor de fundo do editor de código","Instalar novas fontes no sistema operacional"], "Compreender o problema com exatidão é o alicerce de qualquer solução de engenharia de software."),
          q("O que compõe o contrato de um método algorítmico em C#?", "Tipos dos parâmetros de entrada, restrições aceitáveis e o tipo e formato da saída devolvida", ["Apenas o nome do arquivo no disco","O número de linhas de comentários"], "O contrato estabelece o que o método exige para funcionar e o que ele garante entregar."),
          q("Por que é perigoso assumir premissas não explicitadas nos requisitos do problema?", "Porque premissas não alinhadas geram algoritmos que falham perante as reais necessidades do usuário", ["Porque o computador desliga ao detectar premissas","Porque o C# proíbe premissas"], "O alinhamento estrito de expectativas elimina discrepâncias antes que virem código defeituoso."),
          q("Como representar requisitos condicionais de forma estruturada antes do fluxograma?", "Através de tabelas de decisão com colunas de critérios e ações correspondentes", ["Escrevendo poemas explicativos","Desenhando figuras abstratas"], "Tabelas de decisão mapeiam sistematicamente todas as permutações lógicas do negócio."),
          t("Se um método exige dois inteiros positivos e devolve sua soma, quantas entradas ele possui?", ["2"], "O contrato recebe exatamente dois parâmetros inteiros.", "// entradas: int a, int b (total = 2)"),
          g("Complete a assinatura de método C# que define contrato de cálculo de frete:", ["decimal CalcularFrete(decimal subtotal, bool expressa)"], "Assinatura fortemente tipada com contrato explícito.", "public static ____ {\n    // implementação\n}"),
          o("Ordene as etapas da especificação formal de um algoritmo:", ["Compreender o problema e entrevistar as partes interessadas","Listar todas as variáveis de entrada, tipos de dados e limites válidos","Definir a tabela de decisão com as regras de transformação aplicáveis","Especificar os formatos e valores das saídas geradas para cada cenário"], "Ciclo analítico de levantamento e formalização de requisitos algorítmicos."),
          p("Associe elemento de especificação ao seu papel no contrato:", [["Entrada","Dados que o algoritmo recebe para processamento"],["Pré-condição","Restrições que os dados de entrada devem cumprir"],["Pós-condição","Garantias do resultado entregue pelo algoritmo"],["Tabela de decisão","Mapeamento de combinações de critérios para ações"]], "Elementos fundamentais da engenharia de requisitos de software.")
        ]
      },
      {
        id: "cs-alg-8-2-modelagem-do-fluxograma",
        title: "Modelagem do fluxograma completo do projeto",
        subtitle: "Prática · Construindo o diagrama de fluxo convergente",
        theory: "Com os requisitos formalizados, construímos o fluxograma integrando blocos ovais de início/fim, paralelogramos de entrada/saída, retângulos de cálculo e losangos de decisão. A boa prática exige que todas as ramificações convirjam harmonicamente para términos estruturados sem nós soltos.",
        questions: [
          q("Qual é a regra áurea de integridade de um fluxograma estruturado?", "Todas as linhas de fluxo devem ter direção clara e convergir para um término bem definido", ["O fluxograma deve ter pelo menos 50 páginas","Todas as caixas devem ser losangos"], "Nenhum caminho pode ficar interrompido ou sem destino no grafo de controle."),
          q("Como organizar o diagrama para facilitar a leitura visual por outros engenheiros?", "Manter o fluxo principal fluindo de cima para baixo e da esquerda para a direita", ["Desenhar setas cruzando em diagonal o tempo todo","Espalhar caixas aleatoriamente na tela"], "A orientação visual padronizada reduz a carga cognitiva de interpretação do diagrama."),
          q("Qual bloco geométrico recebe os dados do usuário ou do sensor no fluxograma?", "Paralelogramo (entrada e saída de dados)", ["Oval","Círculo pequeno"], "O paralelogramo representa a interface de entrada e saída com o mundo externo."),
          q("Qual é a vantagem de revisar o fluxograma com especialistas de negócio antes do código?", "Validar se a lógica modelada atende exatamente às regras do negócio sem jargões de código", ["Reduzir o custo de eletricidade da empresa","Eliminar a necessidade de compilação"], "Diagramas atuam como ponte universal de comunicação entre técnicos e gestores."),
          t("Quantos blocos de Início devem constar no fluxograma de um algoritmo regular?", ["1"], "Um algoritmo possui um único ponto de entrada canônico.", "// Início: exatamente 1 ponto de entrada"),
          g("Complete o rótulo da saída do losango que representa atendimento ao critério:", ["Sim"], "Sim indica a rota seguida quando o predicado resulta em verdadeiro.", "____ // ramo verdadeiro do losango"),
          o("Ordene a construção do fluxograma a partir da especificação:", ["Posicionar o nó oval de Início no topo do diagrama","Inserir paralelogramos para captura dos parâmetros de entrada","Conectar os losangos de decisão e retângulos de transformação operacional","Conectar todas as pontas convergindo para o nó oval de Fim"], "Desenho metódico e convergente de diagramas de algoritmos."),
          p("Associe forma geométrica ao seu papel no fluxograma:", [["Oval","Delimita o Início ou Fim do fluxo"],["Paralelogramo","Representa operações de Entrada ou Saída"],["Retângulo","Representa Processamento ou atribuição de cálculo"],["Losango","Representa Decisão condicional com bifurcação Sim/Não"]], "Padrões geométricos internacionais para modelagem de processos.")
        ]
      },
      {
        id: "cs-alg-8-3-matriz-de-testes-do-projeto",
        title: "Matriz de casos de teste do projeto",
        subtitle: "Aprofundamento · Planejamento exaustivo de cenários e bordas",
        theory: "Antes de codificar, elaboramos a matriz de casos de teste associando identificador, classe de equivalência, dados de entrada simulados e saída esperada. Essa matriz guia o desenvolvimento test-first, garantindo que o algoritmo nasça testável e com critérios objetivos de aceite.",
        questions: [
          q("O que é uma matriz de casos de teste no desenvolvimento de software?", "Uma tabela que relaciona cada cenário de teste com suas entradas e o resultado esperado exato", ["Uma lista de senhas dos desenvolvedores","Um código assembly gerado pelo compilador"], "A matriz documenta formalmente o plano de verificação e homologação do software."),
          q("Qual é a principal vantagem de planejar a matriz de testes antes de escrever o código?", "Permite pensar nos casos de borda e comportamentos anômalos sem viés de implementação", ["Permite que o computador escreva o código sozinho","Elimina o uso de variáveis locais"], "A abordagem test-first clarifica requisitos obscuros antes que virem código defeituoso."),
          q("Quantos cenários no mínimo uma matriz de testes de frete com 3 faixas deve contemplar?", "No mínimo 6 cenários: 3 valores típicos (meio da faixa) e 3 valores de borda (fronteiras)", ["Apenas 1 cenário","Zero cenários"], "Cobrir valores típicos e limites das faixas é o padrão de qualidade profissional."),
          q("O que deve ser feito se um teste da matriz apresentar resultado diferente do código?", "Investigar se a falha está na codificação do algoritmo ou na especificação do gabarito", ["Alterar o gabarito sem investigar para o teste passar","Apagar a linha da matriz"], "A discrepância deve ser analisada na raiz até restabelecer a consistência total."),
          t("Se uma matriz lista 4 casos válidos e 2 casos de erro, quantos testes existem no total?", ["6"], "4 válidos + 2 erros = 6 casos de teste planejados.", "// 4 + 2 = 6 casos na matriz de testes"),
          g("Complete o registro da matriz definindo a saída esperada do caso de teste:", ["resultadoEsperado: 25.50m"], "A saída esperada atua como gabarito determinístico do teste.", "new CasoTeste { Entrada = 100, ____ }"),
          o("Ordene as etapas da elaboração de uma matriz de casos de teste:", ["Identificar todas as classes de equivalência válidas e inválidas","Selecionar os valores de fronteira imediatamente vizinhos aos limites","Preencher a matriz com identificador, parâmetros de entrada e resultado esperado","Utilizar a matriz como guia de homologação da implementação"], "Roteiro de formalização de matrizes de testes de aceitação."),
          p("Associe coluna da matriz de teste à sua informação:", [["ID do Caso","Identificador único do teste (ex: TC-01)"],["Cenário","Descrição do comportamento auditado"],["Entrada","Dados exatos passados como parâmetros"],["Resultado Esperado","Saída correta prevista pela regra de negócio"]], "Campos fundamentais de uma matriz profissional de testes de software.")
        ]
      },
      {
        id: "cs-alg-8-4-implementacao-e-guards",
        title: "Implementação em C# com cláusulas de guarda",
        subtitle: "Prática · Codificando o fluxo com robustez e clareza",
        theory: "Ao traduzir o fluxograma para código C#, adotamos cláusulas de guarda para descarte antecipado de cenários inválidos. Isso reduz aninhamentos profundos (código em flecha) e mantém o fluxo principal linear, limpo e legível, facilitando auditoria e manutenção.",
        questions: [
          q("O que é o padrão \"Guard Clauses\" (cláusulas de guarda) em programação?", "Verificar e tratar casos de erro ou exceção logo no início do método, retornando de imediato", ["Escrever o código todo dentro de blocos try-catch","Proibir o uso de métodos públicos"], "Tratar exceções precocemente mantém o fluxo principal limpo e sem recuos excessivos de if."),
          q("Qual é o benefício visual de aplicar cláusulas de guarda em C#?", "Elimina o aninhamento excessivo de if dentro de if, mantendo o código alinhado à esquerda", ["Aumenta o número de chaves no arquivo","Torna as linhas mais compridas"], "Evita o \"código em formato de flecha\", amplamente reconhecido como antipadrão de legibilidade."),
          q("Como traduzir uma rejeição do fluxograma usando cláusulas de guarda em C#?", "if (entradaInvalida) return ResultadoErro(); logo no cabeçalho do método", ["while (true) {}","System.Environment.Exit(0);"], "Retornar imediatamente ao detectar anomalia é a essência do padrão guard clause."),
          q("Por que o código C# resultante deve refletir fielmente a topologia do fluxograma?", "Para que desenvolvedores e analistas possam rastrear cada decisão do diagrama no código", ["Para que o compilador não gere erros de sintaxe","Para reduzir o tamanho do executável"], "A rastreabilidade bidirecional entre diagrama e código acelera manutenções futuras."),
          t("Se 3 validações de guarda passam com sucesso, para qual parte do método o fluxo avança?", ["processamento central"], "Após a aprovação de todas as guardas, a execução avança para o processamento central do fluxo principal.", "// As guardas passaram -> executa o fluxo principal"),
          g("Complete a cláusula de guarda que descarta valores monetários negativos:", ["if (valor < 0) return 0m;"], "Retorno antecipado protegendo o cálculo contra números negativos.", "____ // guarda contra valor negativo"),
          o("Ordene a estrutura de um método profissional em C# com cláusulas de guarda:", ["Receber os argumentos fornecidos na assinatura do método","Validar entradas com cláusulas de guarda retornando de imediato perante falhas","Executar o cálculo e transformações do fluxo principal do algoritmo","Retornar o resultado processado com segurança e conformidade"], "Padrão canônico de codificação limpa e defensiva."),
          p("Associe estrutura de código ao seu benefício:", [["Cláusula de guarda","Retorno antecipado que evita aninhamentos profundos"],["Fluxo linear","Leitura limpa de cima para baixo no código principal"],["Tipagem estrita","Detecção precoce de incompatibilidades no build"],["Imutabilidade local","Preserva entradas originais sem mutações colaterais"]], "Padrões de qualidade de código na implementação de algoritmos C#.")
        ]
      },
      {
        id: "cs-alg-8-5-projeto-homologacao-final",
        title: "Projeto: homologação final e entrega do algoritmo",
        subtitle: "Consolidação · Suíte completa de testes executada com 100% de sucesso",
        theory: "A etapa conclusiva do projeto de algoritmo executa a suíte completa de validação contra a implementação C#. Todos os casos da matriz — cenários típicos, classes inválidas e valores de fronteira — são auditados com asserções automáticas, comprovando matematicamente a entrega do software.",
        questions: [
          q("O que significa a homologação de um algoritmo de software?", "A comprovação formal e automatizada de que a implementação satisfaz 100% dos requisitos estipulados", ["Apenas rodar o código uma vez no terminal","Criar um instalador bonito"], "Homologar é certificar a conformidade técnica contra a especificação e a matriz de testes."),
          q("Qual é a atitude exigida perante a falha de um único caso na suíte de homologação?", "Investigar e corrigir a causa raiz antes de considerar o projeto concluído", ["Ignorar a falha se os outros 99% passarem","Desativar o caso de teste"], "A integridade da engenharia exige que nenhum defeito conhecido seja negligenciado na entrega."),
          q("Como a documentação do fluxograma aliada à suíte de testes valoriza o trabalho de engenharia?", "Demonstra profissionalismo, rigor técnico, rastreabilidade e facilidade de manutenção futura", ["Serve apenas para acumular pastas no repositório","Aumenta o consumo de papel"], "Projetos bem documentados e testados possuem custo de manutenção drasticamente inferior."),
          q("Qual é o próximo passo natural após a conclusão bem-sucedida do projeto de lógica e algoritmos?", "Avançar para o estudo aprofundado de variáveis, tipos de dados e operadores em C#", ["Parar de estudar programação para sempre","Reescrever tudo em outra linguagem"], "A base sólida de lógica e fluxo prepara o terreno para dominar os recursos avançados da linguagem."),
          t("Quantos testes devem passar para certificar uma suíte de homologação de 8 casos?", ["8"], "Todos os 8 cenários devem ser aprovados com êxito para conferir a certificação.", "// 8 casos com 100% de aprovação"),
          g("Complete o veredito final que consolida a homologação bem-sucedida do projeto em C#:", ["Debug.Assert(sucesso, \"Homologação do projeto concluída com 100% de aprovação\");"], "Asserção de encerramento atestando a qualidade da entrega.", "____ // homologação do algoritmo"),
          o("Ordene a jornada completa do projeto de algoritmo em C#:", ["Especificar os requisitos e regras de negócio com precisão","Desenhar o fluxograma completo com caminhos convergentes","Planejar a matriz de casos de teste com classes de equivalência e bordas","Codificar a solução em C# e homologar a suíte com 100% de sucesso"], "Do problema abstrato à solução verificada com rigor de engenharia de software."),
          p("Associe artefato do projeto ao seu legado de qualidade:", [["Especificação","Garante que o problema correto foi atacado"],["Fluxograma","Fornece o mapa visual claro de todo o fluxo lógico"],["Matriz de testes","Evidencia a cobertura de cenários e fronteiras"],["Código homologado","Software confiável, testado e pronto para produção"]], "Entregáveis fundamentais de excelência em algoritmos com C#.")
        ]
      }
    ]
  });
})();
