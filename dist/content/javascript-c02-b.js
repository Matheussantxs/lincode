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
  window.LINCODE_CHAPTER_UNITS.javascript = window.LINCODE_CHAPTER_UNITS.javascript || {};
  window.LINCODE_CHAPTER_UNITS.javascript['javascript-c02'] = Object.assign(window.LINCODE_CHAPTER_UNITS.javascript['javascript-c02'] || {}, {
    5: [
      {
        id: "js-alg-5-1-bifurcacao-simples",
        title: "Desvios condicionais e bifurcações",
        subtitle: "Apresentação · Representando if e else em diagramas",
        theory: "No fluxograma, o losango representa uma decisão baseada em uma pergunta lógica. Desse bloco saem obrigatoriamente dois caminhos excludentes: \"Sim\" (Verdadeiro) e \"Não\" (Falso). O fluxo de controle bifurca e executa ações distintas dependendo da avaliação da expressão booleana.",
        questions: [
          q("Qual símbolo gráfico do fluxograma abriga perguntas que bifurcam a execução?", "Losango", ["Retângulo","Paralelogramo"], "O losango é a forma geométrica padrão para testes condicionais e bifurcações."),
          q("Quantos caminhos de saída devem obrigatoriamente emergir de um losango de decisão?", "Exatamente dois caminhos rotulados: Sim e Não", ["Apenas um caminho direto","Quatro caminhos simultâneos"], "Uma decisão lógica clássica avalia uma proposição como Verdadeira ou Falsa."),
          q("O que acontece se uma condição como idade >= 18 for falsa para o valor 16?", "O algoritmo segue imediatamente pela ramificação rotulada como \"Não\"", ["O programa trava gerando erro de sintaxe","Os dois caminhos são executados em paralelo"], "Se a expressão resulta em falso, a seta rotulada \"Não\" determina os próximos passos."),
          q("Em JavaScript, qual estrutura de controle traduz diretamente a bifurcação Sim/Não?", "if ... else", ["for ... of","try ... catch"], "A instrução if...else avalia o predicado booleano e seleciona o ramo apropriado."),
          t("Se saldo for 50 e o teste for saldo >= 100, qual ramo é seguido (Sim ou Nao)?", ["Nao"], "50 não é maior nem igual a 100, logo a condição é falsa e o fluxo segue o Não.", "let saldo = 50;\nlet teste = saldo >= 100; // falso"),
          g("Complete o desvio condicional equivalente ao losango idade >= 18:", ["if (idade >= 18)"], "O if em JavaScript implementa a verificação lógica do losango.", "____ {\n  console.log(\"Maior\");\n}"),
          o("Ordene a trajetória de execução de um fluxo condicional Sim/Não:", ["Avaliar a expressão lógica dentro do losango","Selecionar a ramificação correspondente ao resultado booleano","Executar as ações do bloco de processamento escolhido","Reconvergir as linhas de fluxo no conector de continuação"], "Avaliação, desvio pelo ramo adequado e reconvergência da execução."),
          p("Associe elemento do fluxograma ao seu significado:", [["Losango de decisão","Avalia condição lógica booleana"],["Ramo \"Sim\"","Caminho seguido quando a condição é verdadeira"],["Ramo \"Não\"","Caminho seguido quando a condição é falsa"],["Ponto de junção","Reúne os caminhos alternativos antes do próximo passo"]], "Convenções padrão de diagramação para desvios condicionais.")
        ]
      },
      {
        id: "js-alg-5-2-decisoes-compostas",
        title: "Condições lógicas compostas com E e OU",
        subtitle: "Prática · Expressões combinadas nos diagramas",
        theory: "Problemas reais exigem combinar múltiplos critérios com operadores lógicos. O operador E (&&) exige que todas as condições sejam verdadeiras para seguir pelo ramo \"Sim\". O operador OU (||) avança pelo \"Sim\" se ao menos uma das condições for satisfeita, simplificando a modelagem.",
        questions: [
          q("Qual operador lógico exige que todas as proposições sejam verdadeiras no teste?", "Operador E lógico (AND ou &&)", ["Operador OU lógico (OR ou ||)","Operador de negação NOT"], "O conectivo E só produz verdadeiro quando todas as premissas combinadas são válidas."),
          q("Em um teste de desconto: clienteVip || compraAcimaDe100, quando o desconto é concedido?", "Quando o cliente for VIP ou o valor da compra superar 100 (ou ambos)", ["Apenas quando o cliente for VIP e a compra for menor que 100","Nunca, pois operadores lógicos anulam descontos"], "O operador OU aceita qualquer uma das alternativas verdadeiras para validar o ramo Sim."),
          q("Como o operador de negação NÃO (!) altera o resultado de uma expressão booleana?", "Inverte o valor: verdadeiro torna-se falso, e falso torna-se verdadeiro", ["Multiplica o resultado por menos um","Elimina o teste tornando a condição neutra"], "A negação inverte o valor de verdade da proposição que ela acompanha."),
          q("Em JavaScript, se a primeira parte de A && B for falsa, o que o interpretador faz?", "Aplica curto-circuito e não avalia B, pois o resultado final já será falso", ["Trava o script exigindo a avaliação de B","Inverte o resultado para verdadeiro"], "A avaliação em curto-circuito otimiza tempo evitando avaliar o segundo operando."),
          t("Qual valor booleano resulta de (10 > 5 && 3 < 1) em JavaScript (true ou false)?", ["false"], "10 > 5 é verdadeiro, mas 3 < 1 é falso; com operador && o resultado é false.", "let res = (10 > 5 && 3 < 1);\nconsole.log(res);"),
          g("Complete o operador lógico que exige ambas as condições atendidas:", ["&&"], "&& representa a conjunção lógica E em JavaScript.", "if (usuarioValido ____ senhaCorreta) {\n  liberarAcesso();\n}"),
          o("Ordene a avaliação em curto-circuito da expressão (false && funcaoPesada()):", ["Avaliar o primeiro operando da expressão (false)","Constatar que o operador é a conjunção lógica &&","Interromper a avaliação dispensando funcaoPesada()","Retornar false imediatamente como resultado final"], "Curto-circuito poupa chamadas de funções quando o desfecho já é determinístico."),
          p("Associe operador lógico ao seu comportamento booleano:", [["&& (E lógico)","Verdadeiro somente se ambos forem verdadeiros"],["|| (OU lógico)","Verdadeiro se ao menos um for verdadeiro"],["! (NÃO lógico)","Inverte o valor booleano da expressão"],["Curto-circuito","Interrompe avaliação ao determinar resultado final"]], "Fundamentos da álgebra booleana aplicada à programação.")
        ]
      },
      {
        id: "js-alg-5-3-decisoes-aninhadas",
        title: "Decisões aninhadas e encadeadas",
        subtitle: "Aprofundamento · Árvores de decisão e múltiplos níveis",
        theory: "Quando uma decisão depende do resultado de outra, aninham-se losangos em cascata. Um losango colocado na ramificação \"Sim\" ou \"Não\" de um teste anterior cria uma árvore hierárquica. É vital garantir que todos os caminhos tenham saída definida e não deixem o fluxo sem destino.",
        questions: [
          q("O que caracteriza uma estrutura de decisão aninhada?", "Um losango de teste posicionado dentro de um dos caminhos de outro teste", ["Um algoritmo que não possui bifurcações","Um laço de repetição que não para"], "Decisões aninhadas subdividem um ramo inicial em novos subcritérios."),
          q("Qual estrutura em JavaScript equivale à cadeia if ... else if ... else dos fluxos?", "Estrutura condicional encadeada", ["Operador typeof","Laço do...while"], "else if permite testar hipóteses mutuamente exclusivas sequencialmente."),
          q("Qual é o risco de encadear muitos níveis de decisão aninhada (ex: mais de 4 níveis)?", "O diagrama e o código tornam-se de difícil compreensão e propensos a falhas", ["O computador se recusa a compilar","As variáveis perdem seus tipos nativos"], "Complexidade ciclomática elevada dificulta testes, leitura e manutenção."),
          q("O que a cláusula final else representa em uma cadeia de decisões?", "O caminho padrão caso nenhuma das condições anteriores seja atendida", ["Um laço que reinicia os testes desde o início","Uma confirmação de erro fatal"], "O else atua como fallback ou valor padrão para cenários não contemplados acima."),
          t("Qual conceito final é atribuído para nota 85 na cadeia: >=90 \"A\", >=80 \"B\", else \"C\"?", ["B"], "85 não é >= 90, mas satisfaz >= 80, recebendo o conceito B.", "// nota = 85 -> cai na condição >= 80"),
          g("Complete a instrução intermediária de uma decisão encadeada em JavaScript:", ["else if"], "else if testa a próxima hipótese quando a anterior falha.", "if (x > 10) {\n  // ...\n} ____ (x > 5) {\n  // ...\n}"),
          o("Ordene as etapas para desenhar uma árvore de decisões com três saídas:", ["Definir a condição de maior prioridade no primeiro losango","Direcionar o ramo Sim para a ação correspondente","Inserir um segundo losango no ramo Não do primeiro teste","Conectar todas as saídas ao encerramento comum"], "Encadeamento de condições com terminação estruturada e segura."),
          p("Associe estrutura condicional ao seu papel na modelagem:", [["if simples","Executa uma ação opcional se a condição for atendida"],["if/else","Bifurca o fluxo entre duas alternativas mutuamente exclusivas"],["if/else if/else","Classifica entradas entre múltiplas faixas possíveis"],["Decisão aninhada","Refina critérios após uma primeira validação prévia"]], "Formas de organização de caminhos lógicos em algoritmos.")
        ]
      },
      {
        id: "js-alg-5-4-multipla-escolha-switch",
        title: "Seleção múltipla e chaveamento",
        subtitle: "Prática · Mapeamento de switch/case em diagramas",
        theory: "Quando uma mesma variável é comparada com múltiplos valores discretos, uma estrutura de seleção múltipla (switch) é mais clara que vários if encadeados. No diagrama, representa-se como um nó seletor com múltiplas saídas direcionadas a ações conforme o valor casado, com uma saída default.",
        questions: [
          q("Em que situação o comando switch em JavaScript é mais apropriado que uma cadeia de if/else?", "Quando uma única variável é comparada por igualdade estrita contra múltiplos valores fixos", ["Quando comparamos faixas numéricas com operadores de maior e menor","Para repetir blocos de código infinitamente"], "switch avalia uma expressão e desvia diretamente para o case correspondente."),
          q("O que acontece se esquecermos a instrução break ao final de um bloco case no switch?", "A execução continua caindo nos casos seguintes (fall-through indesejado)", ["O navegador encerra a execução do script","O valor da variável é apagado"], "Sem break, a execução avança para as instruções do case abaixo mesmo sem casamento."),
          q("Qual é o papel da cláusula default em uma estrutura switch?", "Executar um conjunto padrão de instruções se nenhum case casar com a entrada", ["Reiniciar a máquina virtual JavaScript","Forçar a igualdade para o primeiro caso"], "default equivale ao else final de cadeias condicionais tradicionais."),
          q("Como representar graficamente uma seleção múltipla em fluxogramas avançados?", "Um bloco de seleção com múltiplas setas rotuladas com cada valor possível", ["Um círculo com três setas apontadas para dentro","Um paralelogramo girando"], "O seletor expande o fluxo em ramos paralelos rotulados pelos valores específicos."),
          t("Se opcao for \"2\", qual mensagem é selecionada: case \"1\" \"Inicio\", case \"2\" \"Perfil\", default \"Erro\"?", ["Perfil"], "O switch faz casamento direto da string \"2\" com o case correspondente.", "switch (\"2\") {\n  case \"1\": msg = \"Inicio\"; break;\n  case \"2\": msg = \"Perfil\"; break;\n}"),
          g("Complete o comando que interrompe a execução e sai do bloco switch:", ["break;"], "break impede a continuação da execução para o próximo case.", "case 1:\n  fazerAlgo();\n  ____"),
          o("Ordene as etapas da execução de um switch em JavaScript:", ["Avaliar a expressão ou variável fornecida na entrada","Comparar o valor com cada rótulo case usando igualdade estrita (===)","Executar os comandos associados ao primeiro case coincidente","Atingir a instrução break e saltar para fora do switch"], "Avaliação, casamento de casos e saída controlada com break."),
          p("Associe termo da instrução switch à sua função:", [["switch(expr)","Define a expressão a ser comparada"],["case valor:","Declara um valor específico para comparação"],["break;","Interrompe a execução evitando o fall-through"],["default:","Caminho padrão caso nenhum valor coincida"]], "Componentes fundamentais da seleção múltipla com switch em JavaScript.")
        ]
      },
      {
        id: "js-alg-5-5-projeto-elegibilidade",
        title: "Projeto: fluxo de aprovação de crédito",
        subtitle: "Consolidação · Construindo um algoritmo de decisão completo",
        theory: "Integrando bifurcações, condições compostas e caminhos alternativos, projetamos um algoritmo real de análise de crédito. O fluxo recebe renda, score e histórico, verifica restrições prévias e direciona o pedido para \"Aprovado\", \"Análise Manual\" ou \"Recusado\" de forma transparente e testável.",
        questions: [
          q("Qual é a primeira verificação recomendada no fluxo de concessão de crédito?", "Checar restrições impeditivas imediatas (ex: nome negativado) para descarte precoce", ["Calcular o limite máximo de cartão de crédito","Imprimir o contrato formalizado"], "Descartar cenários inválidos logo no início simplifica o restante do diagrama (guard clauses)."),
          q("Se renda >= 5000 e score >= 700, para qual status o algoritmo deve conduzir o cliente?", "Aprovação direta sem necessidade de análise manual", ["Recusa imediata sem justificativa","Repetir os dados do cliente indefinidamente"], "A combinação de alta renda e bom score satisfaz os critérios de menor risco."),
          q("Quando um pedido deve ser encaminhado para a ramificação de \"Análise Manual\"?", "Quando atende parcialmente aos critérios (ex: renda adequada mas score limítrofe)", ["Quando a renda for nula","Apenas aos finais de semana"], "Casos intermediários exigem validação complementar antes de deferir ou negar."),
          q("Por que é essencial que todas as ramificações de um fluxo financeiro convirjam para um término?", "Para evitar que transações fiquem pendentes ou sem status registrado no sistema", ["Para economizar espaço no papel de impressão","Porque algoritmos bancários não podem usar setas"], "Todo caminho decisório deve resultar em um estado terminal bem definido."),
          t("Para renda 6000, score 800 e sem restrições, qual status resulta (Aprovado ou Recusado)?", ["Aprovado"], "Todos os critérios de aprovação foram plenamente satisfeitos pelo cliente.", "// renda >= 5000 && score >= 700 && !restricao"),
          g("Complete a condição composta para aprovação direta de crédito:", ["renda >= 5000 && score >= 700"], "Ambos os critérios são obrigatórios para a aprovação imediata.", "let aprovado = (____ && !restricao);"),
          o("Ordene o fluxo lógico do motor de crédito:", ["Receber entradas: renda mensal, score e restrições cadastrais","Verificar se há restrição ativa; se houver, recusar imediatamente","Avaliar se renda e score atendem à faixa de aprovação automática","Emitir parecer final e registrar log do resultado"], "Do recebimento dos dados à emissão fundamentada da decisão."),
          p("Associe cenário de entrada ao veredito do motor de crédito:", [["Com restrição cadastral ativa","Recusado imediatamente"],["Renda alta e score elevado","Aprovado diretamente"],["Renda suficiente e score intermediário","Encaminhado para Análise Manual"],["Renda inferior ao salário mínimo","Recusado por critério financeiro"]], "Matriz de decisão de elegibilidade financeira estruturada.")
        ]
      }
    ],
    6: [
      {
        id: "js-alg-6-1-laco-conceito",
        title: "Repetições e ciclos no fluxograma",
        subtitle: "Apresentação · Retorno de fluxo e condições de parada",
        theory: "Uma repetição (ou laço) ocorre quando uma seta de fluxo retorna a um ponto anterior do algoritmo, executando novamente instruções enquanto uma condição for verdadeira. O losango de teste avalia se o ciclo deve continuar ou se a seta de saída deve encerrar o laço.",
        questions: [
          q("Como uma estrutura de repetição é visualmente identificada em um fluxograma?", "Por uma linha de fluxo que retorna a uma etapa anterior do diagrama criando um ciclo", ["Por um círculo tracejado que desaparece","Por setas apontando para fora da página"], "O ciclo é caracterizado pelo caminho de retorno que reexecuta ações anteriores."),
          q("O que acontece se a condição de continuidade de um laço nunca se tornar falsa?", "Ocorre um loop infinito, travando a execução ou esgotando recursos", ["O algoritmo encerra com sucesso instantaneamente","O computador desliga automaticamente"], "Todo laço precisa de um mecanismo para que a condição de parada seja inevitavelmente atingida."),
          q("Em que momento o laço do tipo while avalia sua condição em JavaScript?", "Antes de executar o corpo do laço (pré-teste)", ["Apenas após o término da função","Durante a compilação do arquivo HTML"], "O while checa a condição antes de cada iteração; se for falsa no início, não roda nenhuma vez."),
          q("Qual é a diferença do laço do...while em relação ao while tradicional?", "O do...while executa o corpo ao menos uma vez antes de testar a condição (pós-teste)", ["O do...while não aceita números inteiros","O do...while não pode ser interrompido por break"], "No do...while, o teste ocorre no final, garantindo uma execução prévia incondicional."),
          t("Quantas vezes o bloco executa para: let i = 0; while (i < 3) { i++; }?", ["3"], "O laço executa para i=0, i=1 e i=2, totalizando 3 repetições.", "let i = 0;\nwhile (i < 3) {\n  i++;\n}"),
          g("Complete o comando que cria um laço com teste prévio em JavaScript:", ["while"], "while avalia a condição antes de executar o corpo do laço.", "let cont = 0;\n____ (cont < 5) {\n  cont++;\n}"),
          o("Ordene as etapas do ciclo de repetição pré-testado (while):", ["Avaliar a condição lógica dentro do losango do laço","Se verdadeira, descer para o bloco de instruções e processá-lo","Retornar pela seta de ciclo até o losango de teste","Se falsa, desviar pela seta de saída e continuar o algoritmo"], "Mecanismo clássico de controle de laços pré-testados."),
          p("Associe tipo de laço ao seu momento de verificação:", [["while (cond)","Testa a condição antes de cada execução (pré-teste)"],["do ... while (cond)","Testa a condição após executar o corpo (pós-teste)"],["Loop infinito","Laço cuja condição nunca atinge o critério de parada"],["Seta de retorno","Representação gráfica que reexecuta o ciclo no fluxo"]], "Conceitos fundamentais de ciclos e iterações em diagramas de blocos.")
        ]
      },
      {
        id: "js-alg-6-2-contador-acumulador",
        title: "Contadores e acumuladores no ciclo",
        subtitle: "Prática · Atualizando variáveis a cada iteração",
        theory: "Dois padrões imperativos fundamentais em laços são contadores e acumuladores. Um contador incrementa um valor fixo (ex: i = i + 1) para controlar passos ou quantificar itens. Um acumulador soma valores variáveis (ex: total = total + valor) para consolidar resultados ao longo do percurso.",
        questions: [
          q("Qual é a finalidade típica de uma variável contadora em um laço?", "Registrar o número de repetições realizadas ou controlar a condição de parada", ["Armazenar o nome de quem executa o script","Multiplicar o endereço de memória"], "Contadores marcam o avanço de etapas, frequentemente com incrementos de uma unidade."),
          q("Qual é a diferença funcional entre um contador e um acumulador?", "Contadores somam quantidades fixas (passos); acumuladores somam valores dinâmicos", ["Acumuladores só operam com strings","Contadores nunca podem ser zerados"], "O contador marca \"quantas vezes\", enquanto o acumulador totaliza \"quanto somou\"."),
          q("O que deve ser feito com contadores e acumuladores antes do laço iniciar?", "Devem ser inicializados com valores neutros adequados (como 0 para somas)", ["Devem ser apagados com a instrução delete","Devem ser declarados sem valor"], "Sem inicialização prévia, somar sobre variáveis indefinidas gera NaN ou comportamentos errôneos."),
          q("Qual operador em JavaScript incrementa uma variável em uma unidade de forma concisa?", "i++", ["i--","i**"], "i++ equivale matematicamente a i = i + 1."),
          t("Qual é o valor final de total após somar os valores 10, 20 e 30 com acumulador iniciado em 0?", ["60"], "0 + 10 + 20 + 30 = 60.", "let total = 0;\ntotal += 10; total += 20; total += 30;"),
          g("Complete o operador de acumulação equivalente a total = total + item:", ["+="], "+= acumula o novo valor na variável existente.", "total ____ preco;"),
          o("Ordene a estrutura de um laço com acumulador:", ["Declarar e inicializar total = 0 e contador = 0","Testar se contador atingiu o limite estipulado","Acumular o valor da vez: total += valor","Incrementar contador e retornar ao teste do laço"], "Inicialização, controle de passos, acumulação e avanço regular."),
          p("Associe papel da variável no laço à sua inicialização padrão:", [["Contador de voltas","Inicializado com 0 ou 1 antes do laço"],["Acumulador de soma","Inicializado com 0 como elemento neutro da adição"],["Acumulador de produto","Inicializado com 1 como elemento neutro da multiplicação"],["Flag de controle","Inicializado com false aguardando disparo de evento"]], "Padrões estáveis de variáveis de controle em algoritmos iterativos.")
        ]
      },
      {
        id: "js-alg-6-3-laco-for-estruturado",
        title: "O laço for e iteração compacta",
        subtitle: "Prática · Inicialização, condição e incremento reunidos",
        theory: "O laço for reúne os três elementos essenciais da repetição em uma única linha estruturada: inicialização, condição de parada e passo de incremento: for (let i = 0; i < n; i++). Essa organização reduz o risco de esquecer a atualização da variável de controle e provocar loops infinitos.",
        questions: [
          q("Quais são as três seções separadas por ponto e vírgula no cabeçalho do laço for?", "Inicialização, condição de continuidade e expressão de incremento", ["Entrada de usuário, processamento e saída","Declaração, pausa e encerramento"], "for (inicializacao; condicao; incremento) unifica os componentes do ciclo iterativo."),
          q("Quando a expressão de incremento (ex: i++) é executada no ciclo do laço for?", "Ao final de cada repetição do corpo do laço, logo antes do próximo teste", ["Antes de testar a condição pela primeira vez","Apenas quando o laço atinge o break"], "O incremento é a última ação executada dentro de cada volta antes de reavaliar o teste."),
          q("Qual laço executa 5 vezes imprimindo os números de 0 a 4?", "for (let i = 0; i < 5; i++)", ["for (let i = 1; i < 5; i++)","for (let i = 0; i <= 5; i++)"], "Com i iniciando em 0 e menor estrito que 5, gera exatamente 0, 1, 2, 3 e 4."),
          q("O que acontece com uma variável declarada com let no cabeçalho do for após o laço terminar?", "Deixa de existir fora do laço devido ao escopo de bloco do let", ["Torna-se variável global no navegador","Seu valor é reiniciado para zero"], "Variáveis com escopo de bloco são descartadas ao sair do corpo do for."),
          t("Quantos números este laço imprime no console: for (let i = 0; i < 4; i++)?", ["4"], "Os números 0, 1, 2 e 3 são exibidos, totalizando 4 saídas.", "for (let i = 0; i < 4; i++) {\n  console.log(i);\n}"),
          g("Complete o cabeçalho do for para iterar 10 vezes a partir de zero:", ["let i = 0; i < 10; i++"], "Formato canônico de repetição com contador em JavaScript.", "for (____) {\n  processar();\n}"),
          o("Ordene a cronologia de execução do cabeçalho for (let i=0; i<3; i++):", ["Executar a inicialização let i = 0 apenas uma vez","Avaliar a condição i < 3; se verdadeira, entrar no corpo","Executar as instruções contidas dentro do corpo do laço","Executar i++ e retornar à avaliação da condição"], "Sequência exata da máquina de estados interna do comando for."),
          p("Associe seção do laço for à sua responsabilidade:", [["let i = 0","Inicializa o ponteiro de iteração uma única vez"],["i < limite","Verifica se o laço deve continuar a cada volta"],["i++","Avança a variável de controle ao final de cada volta"],["{ corpo }","Conjunto de comandos reexecutados durante a iteração"]], "Partes constituintes da instrução de repetição for padrão.")
        ]
      },
      {
        id: "js-alg-6-4-interrupcao-controle",
        title: "Controle de fluxo com break e continue",
        subtitle: "Aprofundamento · Desvios extraordinários de iteração",
        theory: "As instruções break e continue modificam o fluxo natural de um laço. break interrompe sumariamente a repetição e direciona a execução para fora do ciclo. continue salta o restante das instruções da volta atual e passa imediatamente para o próximo incremento e avaliação do laço.",
        questions: [
          q("Qual é o efeito imediato da execução da instrução break dentro de um laço for?", "Interrompe o laço por completo, saltando para a primeira instrução após ele", ["Reinicia a contagem da variável do laço","Executa apenas a próxima linha e para"], "break encerra prematuramente a repetição, muito útil em buscas onde o item foi achado."),
          q("Qual é a diferença entre continue e break em estruturas de repetição?", "continue pula apenas a volta atual; break cancela todo o laço restante", ["continue desliga o computador","break só funciona em switches"], "continue avança diretamente para a próxima iteração sem encerrar o ciclo como um todo."),
          q("Em que cenário o uso de break é considerado uma boa prática de desempenho?", "Em buscas lineares, ao encontrar o item procurado para evitar iterações inúteis", ["Para substituir todos os testes if do programa","Em laços infinitos que não devem parar"], "Parar a varredura assim que o objetivo é alcançado economiza processamento."),
          q("No fluxograma, como se representa graficamente o efeito da instrução continue?", "Uma seta que sai da condição e salta diretamente para o ponto de incremento do ciclo", ["Uma seta apontando para fora da folha","Um losango duplo"], "A seta pula o corpo de processamento e reingressa no passo de avanço do ciclo."),
          t("Se um laço de 0 a 10 usa break ao atingir i === 3, qual último valor processado?", ["2"], "A volta com 3 atinge o break antes de processar, logo o último foi 2.", "for (let i = 0; i < 10; i++) {\n  if (i === 3) break;\n  ultimo = i;\n}"),
          g("Complete o comando para ignorar números ímpares e saltar para a próxima volta:", ["continue;"], "continue pula o restante do corpo do laço.", "if (n % 2 !== 0) {\n  ____\n}"),
          o("Ordene a execução de um laço com instrução continue condicional:", ["Iniciar uma nova repetição e testar a condição do if de filtro","Condição atendida: executar a instrução continue","Ignorar os comandos subsequentes do corpo do laço","Saltar para o incremento do laço e reavaliar a continuidade"], "Salto do restante do corpo e reinício controlado na próxima iteração."),
          p("Associe instrução de desvio de laço ao seu resultado:", [["break","Aborta e encerra sumariamente o ciclo iterativo"],["continue","Salta o restante da iteração atual e passa à próxima"],["return","Encerra a função inteira que abriga o laço"],["loop infinito","Falta de break ou de condição de parada válida"]], "Instruções de controle e salto de fluxo em blocos repetitivos.")
        ]
      },
      {
        id: "js-alg-6-5-projeto-varredura-busca",
        title: "Projeto: busca linear e agregação em lista",
        subtitle: "Consolidação · Construindo um algoritmo iterativo robusto",
        theory: "Combinando laços, acumuladores, contadores e interrupção com break, projetamos um algoritmo clássico de busca e estatística. O fluxo percorre uma coleção de valores, acumula a soma, localiza o valor máximo e determina a posição do primeiro elemento que atende a um critério de busca.",
        questions: [
          q("Qual é a complexidade de tempo de uma busca linear em uma lista não ordenada de N itens?", "O(n) no pior caso, pois pode precisar examinar todos os elementos", ["O(1) instantâneo","O(n²) quadrático"], "Sem ordenação prévia, cada elemento precisa ser inspecionado sequencialmente."),
          q("Como inicializar a variável que guardará o valor máximo de uma lista de números inteiros?", "Com o primeiro elemento da própria lista (ou -Infinity)", ["Sempre com o número 0","Com uma string vazia"], "Usar 0 falha caso a lista contenha apenas números negativos; o primeiro item é seguro."),
          q("O que deve ser retornado se uma busca linear percorrer toda a lista sem encontrar o item?", "Um valor sentinela convencional como -1 ou null para indicar não encontrado", ["Lançar um erro que trave o navegador","Retornar o índice zero da lista"], "O sentinela -1 é a convenção clássica para sinalizar ausência do elemento pesquisado."),
          q("Como calcular a média aritmética ao final de uma varredura completa?", "Dividindo a variável acumuladora de soma pelo contador de elementos processados", ["Multiplicando o primeiro valor pelo último","Somando todos os índices da lista"], "Média = soma_total / total_itens."),
          t("Qual índice é retornado ao buscar linearmente o número 30 em [10, 20, 30, 40]?", ["2"], "Contando a partir do índice 0: [0]=10, [1]=20, [2]=30.", "let idx = [10, 20, 30, 40].indexOf(30);\nconsole.log(idx);"),
          g("Complete a condição que armazena o novo maior valor encontrado:", ["item > maximo"], "Se o item atual for maior que o recorde anterior, o máximo é atualizado.", "if (____) {\n  maximo = item;\n}"),
          o("Ordene as etapas de uma rotina de cálculo de média com busca de maior valor:", ["Inicializar soma = 0 e maximo = primeiro elemento da lista","Iterar sobre cada item da lista com um laço for estruturado","Acumular soma += item e atualizar maximo se item > maximo","Após o laço, calcular media = soma / lista.length e retornar"], "Algoritmo de varredura completa com agregação e máximo simultâneos."),
          p("Associe variável do projeto de varredura à sua responsabilidade:", [["soma","Acumula o total de todos os valores da coleção"],["maximo","Preserva o maior elemento encontrado até o momento"],["indiceEncontrado","Armazena a posição do item buscado ou -1"],["i (contador)","Controla o ponteiro da posição atual no percurso"]], "Papeis dos dados auxiliares em algoritmos de varredura e agregação.")
        ]
      }
    ],
    7: [
      {
        id: "js-alg-7-1-teste-de-mesa",
        title: "O teste de mesa e tabelas de rastreamento",
        subtitle: "Apresentação · Acompanhando variáveis passo a passo",
        theory: "O teste de mesa (trace table) é a técnica primordial para verificar algoritmos manualmente. Monta-se uma tabela onde cada coluna representa uma variável ou condição e cada linha registra os valores a cada instrução executada, permitindo comprovar a corretude lógica sem necessidade de computador.",
        questions: [
          q("O que é uma tabela de rastreamento (teste de mesa) na ciência da computação?", "Um registro tabular que simula a memória e o valor das variáveis passo a passo", ["Uma mesa física para apoiar o computador","Um gráfico com desenhos abstratos"], "O teste de mesa simula a execução do processador manualmente em uma folha ou tabela."),
          q("Quais elementos devem constar como colunas de uma tabela de rastreamento completa?", "A linha ou instrução atual, cada variável do programa e as condições avaliadas", ["Apenas o nome do autor do código","O horário em que o teste foi feito"], "Colunas estruturadas para variáveis e expressões garantem fidelidade na auditoria."),
          q("Qual é o maior benefício de realizar o teste de mesa antes de codificar?", "Descobrir erros lógicos e falhas conceituais antes de gastar tempo na implementação", ["Garantir que o código execute em menos de 1 milissegundo","Eliminar a necessidade de documentação"], "Detectar falhas no desenho do algoritmo é muito mais barato do que depurar código em produção."),
          q("Quando uma variável tem seu valor alterado no teste de mesa, o que devemos registrar?", "Anotar o novo valor na linha correspondente substituindo o estado mental anterior", ["Apagar todos os dados registrados nas colunas vizinhas","Reiniciar a tabela do zero"], "O teste de mesa reflete a mutação de estado sequencial da memória."),
          t("Se x inicia com 5 e executa x = x * 2 + 1, qual valor registrar na tabela para x?", ["11"], "5 * 2 = 10; 10 + 1 = 11.", "let x = 5;\nx = x * 2 + 1;\nconsole.log(x);"),
          g("Complete a instrução de saída que exibe o estado de depuração de duas variáveis:", ["console.log({ a, b })"], "Exibir o objeto com chaves facilita a inspeção de valores.", "____; // exibe { a: 1, b: 2 }"),
          o("Ordene os passos para executar um teste de mesa manual:", ["Listar todas as variáveis e condições no cabeçalho da tabela","Preencher a primeira linha com os valores iniciais de entrada","Seguir as setas do algoritmo instrução por instrução","Atualizar os valores na tabela a cada atribuição e registrar a saída final"], "Disciplina de rastreamento manual rigoroso para garantia de corretude."),
          p("Associe termo do teste de mesa ao seu significado:", [["Coluna da tabela","Representa uma variável, condição ou saída"],["Linha da tabela","Representa o estado após a execução de um passo"],["Estado de memória","Conjunto dos valores das variáveis em dado momento"],["Saída final","Resultado impresso ou retornado ao término da rotina"]], "Conceitos centrais de auditoria analítica e rastreamento de algoritmos.")
        ]
      },
      {
        id: "js-alg-7-2-erros-off-by-one",
        title: "Identificando erros off-by-one",
        subtitle: "Prática · Detectando falhas de limites no rastreamento",
        theory: "O erro off-by-one (desvio por um) é uma das falhas lógicas mais recorrentes em programação. Ocorre quando um laço executa uma vez a mais ou a menos por confusão entre operadores como < e <=, ou ao iniciar contagens em 0 versus 1. O teste de mesa expõe esse desvio com precisão absoluta.",
        questions: [
          q("O que caracteriza o clássico erro lógico denominado \"off-by-one\"?", "O algoritmo itera exatamente uma vez a mais ou uma vez a menos que o pretendido", ["A máquina desliga por falta de memória","O programa pula instruções aleatórias"], "Off-by-one é o erro de contagem por uma unidade nas fronteiras de laços."),
          q("Qual é a causa mais comum de um erro off-by-one em percursos de arrays?", "Usar i <= array.length em vez de i < array.length, acessando índice inexistente", ["Usar let em vez de var","Dar nomes longos às variáveis"], "Arrays com N itens possuem índices de 0 a N-1; o índice N ultrapassa o limite."),
          q("O que a expressão array[array.length] retorna em JavaScript quando acessada?", "undefined", ["Gera um erro fatal de compilação","Retorna o primeiro elemento do array"], "O último elemento válido está em length - 1; o índice length não existe."),
          q("Como o teste de mesa ajuda a prevenir o erro de off-by-one antes dos testes formais?", "Permite conferir explicitamente o valor do índice na primeira e na última volta do laço", ["Calcula o tempo de resposta do servidor","Gera documentação em formato PDF"], "Acompanhar a fronteira inicial e final na tabela revela desvios na contagem."),
          t("Quantos índices válidos possui um array de tamanho 5 (de 0 até qual número)?", ["4"], "Os índices válidos vão de 0 a 4 (total de 5 posições).", "let arr = [1, 2, 3, 4, 5];\n// índices: 0, 1, 2, 3, 4"),
          g("Complete o operador correto para iterar todos os itens sem ultrapassar o array:", ["i < lista.length"], "O operador estrito < evita o acesso fora dos limites válidos.", "for (let i = 0; ____; i++) {\n  processar(lista[i]);\n}"),
          o("Ordene a análise de fronteira de um laço for (let i = 0; i < n; i++):", ["Verificar a primeira iteração: i = 0 é válido para o início?","Verificar a iteração intermediária: o incremento i++ avança regularmente?","Verificar a última iteração: o laço para em i = n - 1 conforme esperado?","Verificar o estado de saída: i = n provoca a saída correta do laço?"], "Análise de caso-base e casos extremos de fronteira de repetições."),
          p("Associe condição de laço ao número de voltas produzidas:", [["for (i = 0; i < 5; i++)","Executa exatamente 5 vezes (i de 0 a 4)"],["for (i = 0; i <= 5; i++)","Executa 6 vezes (i de 0 a 5)"],["for (i = 1; i < 5; i++)","Executa 4 vezes (i de 1 a 4)"],["for (i = 1; i <= 5; i++)","Executa 5 vezes (i de 1 a 5)"]], "Comparações de limites e intervalos fechados versus semiabertos.")
        ]
      },
      {
        id: "js-alg-7-3-rastreamento-interdependente",
        title: "Rastreamento com variáveis interdependentes",
        subtitle: "Aprofundamento · Trocas de valores e sequências de Fibonacci",
        theory: "Quando variáveis dependem mutuamente umas das outras, a ordem das atribuições é crucial. O clássico algoritmo de Fibonacci ou a troca de duas variáveis exigem variáveis auxiliares temporárias. Rastrear essas operações na tabela de memória garante que nenhum dado seja sobrescrito indevidamente.",
        questions: [
          q("Para trocar os valores de duas variáveis a e b sem perdas em programação clássica:", "Usa-se uma variável temporária auxiliar: temp = a; a = b; b = temp", ["Executa-se a = b; b = a diretamente","Basta somar as duas variáveis"], "Sem a variável temporária, atribuir b a \"a\" sobrescreve e destrói o valor original de a."),
          q("Em JavaScript moderno, como podemos realizar a troca de duas variáveis sem variável temporária?", "Usando desestruturação de arrays: [a, b] = [b, a]", ["Chamando Math.swap(a, b)","Usando o operador ternário"], "A desestruturação empacota e desempacota os valores simultaneamente de forma limpa."),
          q("No cálculo de Fibonacci (a, b = b, a + b), por que a ordem de atualização é crítica?", "Porque o novo valor de b depende do valor antigo de a antes da sua atualização", ["Porque Fibonacci só funciona em números ímpares","Porque a soma é invertida no processador"], "Se \"a\" for atualizado antes, a soma a + b utilizará o dado novo em vez do estado anterior."),
          q("Como registrar na tabela de teste de mesa a troca de valores passo a passo?", "Registrar linha a linha: leitura para temp, cópia de b para a, e cópia de temp para b", ["Anotar apenas o resultado final","Criar duas tabelas em folhas diferentes"], "O registro atômico de cada atribuição garante a visualização do fluxo de dados."),
          t("Se a=10 e b=20, após temp=a; a=b; b=temp, qual é o valor final de a?", ["20"], "A variável a recebeu o valor original de b (20).", "let a = 10, b = 20;\nlet temp = a;\na = b;\nb = temp;"),
          g("Complete a troca moderna de variáveis com desestruturação em JavaScript:", ["[a, b] = [b, a]"], "A desestruturação faz a troca atômica sem variável auxiliar.", "let a = 1, b = 2;\n____;"),
          o("Ordene as operações da troca tradicional de valores entre duas variáveis:", ["Salvar o valor original de \"a\" na variável temporária \"temp\"","Copiar o valor de \"b\" para dentro de \"a\"","Copiar o valor salvo em \"temp\" para dentro de \"b\"","Finalizar a troca com os valores alternados com sucesso"], "Sequência canônica de troca de valores em memória."),
          p("Associe algoritmo interdependente ao seu padrão de memória:", [["Troca tradicional","Utiliza variável temp para preservar dado original"],["Desestruturação [a,b]","Troca atômica por meio de array intermediário"],["Passo de Fibonacci","Próximo b recebe soma do par anterior (a + b)"],["Sobrescrita acidental","Falha ao atualizar variável antes de ler seu dado"]], "Dinâmica de atualização de variáveis interdependentes em algoritmos.")
        ]
      },
      {
        id: "js-alg-7-4-invariantes-e-condicoes",
        title: "Invariantes de laço e condições de término",
        subtitle: "Avançado · Afirmações lógicas verdadeiras em cada volta",
        theory: "Um invariante de laço é uma propriedade lógica que permanece verdadeira antes da primeira iteração, a cada repetição e logo após o laço terminar. Identificar invariantes ajuda a provar matematicamente que o algoritmo funciona e que as condições de término conduzem ao resultado almejado.",
        questions: [
          q("O que é um \"invariante de laço\" na ciência da computação?", "Uma condição lógica que permanece verdadeira em todas as iterações do ciclo", ["Uma variável cujo valor nunca muda durante o programa todo","Um erro que impede a execução do laço"], "O invariante descreve o progresso correto e consistente do algoritmo a cada etapa."),
          q("Para provar a corretude de um laço com invariante, quais três etapas devem ser validadas?", "Inicialização (base), Manutenção (passo indutivo) e Término (conclusão)", ["Entrada, formatação e impressão","Compilação, teste e commit"], "Similar à indução matemática: é válido no início, se mantém a cada volta e prova o término."),
          q("Qual é o invariante no algoritmo de soma total de uma lista em laço?", "Em cada passo i, a variável total contém a soma dos elementos de índice 0 até i - 1", ["O total sempre é igual a zero","A lista dobra de tamanho a cada volta"], "A propriedade garante que o progresso acumula exatamente a fatia já percorrida da lista."),
          q("O que a condição de término combinada ao invariante de laço nos garante?", "Garante que o resultado final obtido no encerramento é matematicamente correto", ["Garante que o programa usará zero bytes de memória","Garante que o código não precisa de testes"], "No término, a propriedade do invariante atinge o tamanho total da entrada, validando a saída."),
          t("Se o invariante garante a soma de 3 itens [5, 5, 5], qual valor total é assegurado?", ["15"], "5 + 5 + 5 = 15, garantido pelo invariante de acumulação.", "// soma dos 3 primeiros elementos"),
          g("Complete a asserção que verifica o invariante de total não negativo:", ["total >= 0"], "Asserções documentam e validam invariantes em tempo de teste.", "console.assert(____, \"Total não pode ser negativo\");"),
          o("Ordene as três fases da prova por invariante de laço:", ["Inicialização: provar que o invariante é verdadeiro antes da primeira volta","Manutenção: provar que se é verdadeiro antes de uma volta, continua após ela","Execução das iterações reduzindo a distância até o critério de parada","Término: o laço encerra e o invariante fornece a prova do resultado correto"], "Raciocínio indutivo formal aplicado à verificação de programas."),
          p("Associe estágio do invariante ao seu papel de prova:", [["Inicialização","Verdadeiro antes de iniciar o laço (caso-base)"],["Manutenção","Permanece verdadeiro a cada nova iteração"],["Término","Entrega a garantia do resultado correto ao parar"],["Condição de parada","Garante que o laço eventualmente atinge o fim"]], "Pilares teóricos da verificação formal de algoritmos iterativos.")
        ]
      },
      {
        id: "js-alg-7-5-projeto-depuracao-mesa",
        title: "Projeto: depuração de algoritmo com falha oculta",
        subtitle: "Consolidação · Encontrando e corrigindo bugs pelo rastreamento",
        theory: "Neste projeto prático, aplicamos o teste de mesa para encontrar um bug sutil em um algoritmo de cálculo de frete proporcional. Ao preencher a tabela de rastreamento com valores simulados, a divergência entre o resultado esperado e o produzido salta aos olhos, guiando a correção assertiva.",
        questions: [
          q("Qual é a postura correta de um desenvolvedor ao encontrar um bug lógico no algoritmo?", "Reproduzir a falha com valores conhecidos e rastrear a execução passo a passo", ["Tentar alterar linhas aleatoriamente esperando que funcione","Culpar o sistema operacional pela inconsistência"], "A depuração sistemática identifica a causa raiz antes de qualquer intervenção."),
          q("Em uma tabela de rastreamento, como se detecta exatamente a linha onde o bug ocorre?", "Na linha onde o valor computado de uma variável diverge pela primeira vez do esperado", ["Na linha que tiver o maior número de caracteres","Apenas na última linha do algoritmo"], "A primeira divergência marca com exatidão a instrução falha ou premissa errônea."),
          q("Se uma promoção de frete exige subtotal > 100, mas o código usa subtotal >= 100, qual valor expõe o erro?", "Exatamente 100 (o caso de borda do teste)", ["O valor 500","O valor 0"], "Casos de borda expõem divergências entre maior estrito e maior-ou-igual."),
          q("Após corrigir o algoritmo no papel ou no código, qual é o próximo passo essencial?", "Rodar novamente o teste de mesa com os mesmos dados para confirmar a correção", ["Publicar imediatamente sem nova checagem","Apagar a tabela de rastreamento"], "A reverificação comprova que o defeito foi sanado sem introduzir novas anomalias."),
          t("Se o frete corrigido cobra 10 para subtotal 100, qual total final deve ser registrado?", ["110"], "100 de subtotal + 10 de frete = 110.", "let total = 100 + 10;\nconsole.log(total);"),
          g("Complete a correção da condição estrita de frete grátis para valores acima de 100:", ["subtotal > 100"], "Maior estrito exige valores a partir de 101 para frete gratuito.", "let freteGratis = (____);"),
          o("Ordene as etapas do processo de depuração por teste de mesa:", ["Identificar um caso de teste que produz resultado incorreto","Construir a tabela de rastreamento executando instrução por instrução","Localizar a primeira linha onde uma variável assume valor incorreto","Corrigir a instrução defeituosa e reexecutar a prova com sucesso"], "Metodologia científica e estruturada de diagnóstico e correção de software."),
          p("Associe etapa de depuração à sua ação correspondente:", [["Reprodução","Executa o algoritmo com a entrada que provoca a falha"],["Isolamento","Localiza a instrução exata onde o estado corrompe"],["Correção","Ajusta a regra ou operador causador da discrepância"],["Regressão","Garante que os outros casos continuam funcionando"]], "Boas práticas profissionais de manutenção e qualidade de software.")
        ]
      }
    ],
    8: [
      {
        id: "js-alg-8-1-casos-de-teste",
        title: "Casos de teste e classes de equivalência",
        subtitle: "Apresentação · Planejando entradas e saídas esperadas",
        theory: "Testar um algoritmo significa comparar o resultado observado com o resultado esperado para um conjunto planejado de entradas. Particionar as entradas em classes de equivalência permite selecionar poucos testes altamente representativos que cobrem todo o universo de possibilidades com eficácia.",
        questions: [
          q("O que compõe formalmente a especificação de um caso de teste?", "Um conjunto de dados de entrada, pré-condições e o resultado esperado bem definido", ["Apenas uma opinião sobre se o código é bonito","O tempo gasto digitando o código"], "Um teste compara se para uma dada entrada, a saída obtida iguala rigorosamente a esperada."),
          q("O que significa o conceito de \"particionamento em classes de equivalência\"?", "Agrupar entradas que o algoritmo trata da mesma forma, testando um representante de cada grupo", ["Dividir o código em arquivos de mesmo tamanho","Separar números pares de ímpares obrigatoriamente"], "Testar um elemento de cada classe é suficiente para inferir o comportamento de todo o grupo."),
          q("Para uma função que aceita idades de 0 a 120, quais seriam classes de equivalência típicas?", "Idades negativas (inválidas), idades normais (válidas) e idades > 120 (inválidas)", ["Apenas o número 18 repetido dez vezes","Todos os números reais existentes"], "Identificar entradas válidas e inválidas estabelece a base da cobertura de testes."),
          q("Por que não é viável testar todas as entradas possíveis de um programa no mundo real?", "Porque o número de combinações de dados possíveis tende ao infinito", ["Porque os computadores estragam ao rodar muitos testes","Porque linguagens modernas não permitem testes"], "A completude exaustiva é impossível; a estratégia inteligente de amostragem é indispensável."),
          t("Se a entrada é 4 e o dobro esperado é 8, qual valor a asserção assert.equal(dobro(4), 8) confere?", ["8"], "A função compara o resultado com a saída esperada 8.", "function dobro(n) { return n * 2; }\nconsole.assert(dobro(4) === 8);"),
          g("Complete o teste automatizado comparando o resultado obtido com o esperado:", ["resultado === esperado"], "A comparação de igualdade estrita valida a expectativa do teste.", "console.assert(____, \"Erro no cálculo\");"),
          o("Ordene as etapas do planejamento de casos de teste:", ["Analisar a especificação dos requisitos e limites do problema","Dividir as possíveis entradas em classes de equivalência","Selecionar um valor representativo para cada classe identificada","Definir a saída esperada para cada caso antes de executar"], "Metodologia formal de engenharia para especificação de testes de software."),
          p("Associe conceito de teste ao seu propósito:", [["Entrada de teste","Valores fornecidos ao algoritmo para processamento"],["Saída esperada","Resultado correto previsto pela regra de negócio"],["Classe de equivalência","Conjunto de entradas que compartilham o mesmo tratamento"],["Asserção","Verificação automática entre resultado obtido e esperado"]], "Elementos centrais da validação funcional de programas.")
        ]
      },
      {
        id: "js-alg-8-2-analise-de-limites",
        title: "Análise de valores-limite (borda)",
        subtitle: "Prática · Testando fronteiras e casos extremos",
        theory: "A maior parte dos defeitos em software concentra-se nas fronteiras dos intervalos de entrada. A análise de valores-limite testa exatamente os valores nas bordas, imediatamente antes e imediatamente depois das transições de regras (ex: para >= 18, testar 17, 18 e 19).",
        questions: [
          q("Por que a análise de valores-limite (fronteiras) é considerada tão crítica?", "Porque erros de programação ocorrem com frequência desproporcional nas bordas dos intervalos", ["Porque valores no meio da faixa são mais caros de processar","Porque bordas exigem hardware especializado"], "Confusões entre operadores relacionais (> vs >=) manifestam-se especificamente nas fronteiras."),
          q("Se uma regra concede gratuidade para menores de 6 anos (idade < 6), quais idades testam a borda?", "Idades 5 (dentro da gratuidade), 6 (fronteira exata de cobrança) e 7 (acima da borda)", ["Idades 20, 40 e 60","Apenas a idade 100"], "Testar o limite exato e seus vizinhos imediatos garante a integridade da decisão."),
          q("Quais são exemplos clássicos de casos extremos (edge cases) para coleções e listas?", "Lista vazia (tamanho 0), lista com um único item e lista com milhares de itens", ["Listas que só contêm números primos","Listas desenhadas em azul"], "Estruturas vazias ou unitárias são fontes comuns de quebra de algoritmos despreparados."),
          q("Como tratar entradas de borda numéricas como divisão por zero em um algoritmo?", "Inserir uma guarda prévia que verifica se o divisor é zero antes da operação", ["Deixar a divisão ocorrer para gerar Infinity silencioso","Apagar a variável dividendo"], "Validações prévias (defensive programming) blindam o algoritmo contra falhas graves."),
          t("Qual número vizinho inferior testa a fronteira imediata da condição preco >= 50?", ["49"], "O número 49 é o valor inteiro imediatamente anterior à fronteira 50.", "// borda para inteiros: 49, 50, 51"),
          g("Complete a cláusula de guarda que protege a função contra divisões por zero:", ["if (divisor === 0)"], "Verificar divisor nulo evita resultados indeterminados ou infinitos.", "function dividir(a, b) {\n  ____ return null;\n  return a / b;\n}"),
          o("Ordene a seleção de valores para testar o limite de uma faixa [10, 20]:", ["Testar valores externos logo abaixo da fronteira inferior: 9","Testar os limites exatos das duas fronteiras: 10 e 20","Testar um valor interno típico representativo da faixa: 15","Testar valor externo logo acima da fronteira superior: 21"], "Técnica rigorosa de teste em fronteiras inferiores, internas e superiores."),
          p("Associe caso de borda ao risco que ele mitiga no código:", [["Lista vazia []","Previne erros ao tentar ler o primeiro elemento em lista nula"],["Zero como divisor","Previne divisão por zero e resultados matemáticos inválidos"],["Fronteira exata (ex: 18)","Previne confusão entre operadores > e >="],["Strings vazias \"\"","Garante tratamento para campos obrigatórios não preenchidos"]], "Casos de borda comuns e sua relevância para a estabilidade do sistema.")
        ]
      },
      {
        id: "js-alg-8-3-caixa-branca-cobertura",
        title: "Teste de caixa-branca e cobertura de caminhos",
        subtitle: "Aprofundamento · Garantindo que cada linha e ramo execute",
        theory: "No teste de caixa-branca, o desenvolvedor inspeciona a estrutura interna do algoritmo. O objetivo é a cobertura de código: garantir que cada instrução seja executada ao menos uma vez e que todas as saídas de cada losango de decisão (Sim e Não) sejam percorridas por ao menos um caso de teste.",
        questions: [
          q("Qual é a premissa central do teste de caixa-branca (white-box testing)?", "Conhecer o código-fonte interno e projetar testes para exercitar caminhos específicos", ["Testar sem ter acesso ao código ou arquitetura do sistema","Pintar a tela do computador de branco"], "Caixa-branca utiliza o mapa de controle interno para assegurar a cobertura dos fluxos."),
          q("O que mede a métrica de \"cobertura de ramos\" (branch coverage)?", "A porcentagem de ramificações (Sim e Não) de cada decisão exercitadas pelos testes", ["O número de linhas comentadas no arquivo","O número de arquivos na pasta do projeto"], "Cobrir 100% dos ramos significa que nenhuma bifurcação ficou sem validação."),
          q("O que acontece se uma ramificação do código tiver 0% de cobertura nos testes?", "Pode conter erros críticos que só serão descobertos quando um usuário acioná-la", ["O compilador remove a ramificação automaticamente","A ramificação nunca causará problemas"], "Código não testado é código com confiabilidade desconhecida."),
          q("Quantos casos de teste no mínimo são necessários para cobrir um losango if/else simples?", "Pelo menos dois casos: um que torne a condição verdadeira e outro que a torne falsa", ["Apenas um caso é suficiente","Dez casos no mínimo"], "Um caso exercita o ramo Sim e o outro caso exercita o ramo Não."),
          t("Quantos ramos totais existem em um algoritmo com 2 decisões if/else independentes?", ["4"], "Cada decisão possui 2 ramos (Sim/Não); 2 x 2 ramos = 4 saídas possíveis.", "// 2 decisões independentes geram 4 ramificações totais"),
          g("Complete o caso de teste que força a execução do ramo falso para idade >= 18:", ["idade = 15"], "Um valor menor que 18 garante o percurso pelo ramo Não da decisão.", "let idade = ____; // cobre o ramo do Não"),
          o("Ordene os passos para alcançar 100% de cobertura de ramos em um fluxograma:", ["Mapear todos os losangos de decisão existentes no diagrama","Identificar as saídas Verdadeiro e Falso de cada um dos losangos","Criar casos de teste para satisfazer cada uma das alternativas mapeadas","Executar a suíte comprovando que todas as linhas e ramos foram visitados"], "Mapeamento exaustivo de grafos de controle para garantia de cobertura."),
          p("Associe técnica de teste à sua abordagem conceitual:", [["Caixa-preta","Testa entradas e saídas com base na especificação externa"],["Caixa-branca","Testa caminhos e ramos conhecendo a estrutura interna"],["Cobertura de instruções","Verifica se cada linha de código rodou ao menos uma vez"],["Cobertura de ramos","Verifica se todas as saídas de cada decisão foram visitadas"]], "Perspectivas complementares de testes na engenharia de software.")
        ]
      },
      {
        id: "js-alg-8-4-assercoes-e-validacao",
        title: "Asserções e validação defensiva",
        subtitle: "Prática · console.assert e validações de pré-condições",
        theory: "Validação defensiva envolve verificar se os dados de entrada cumprem pré-condições antes do processamento. Asserções (como console.assert em JavaScript) documentam suposições e disparam alertas imediatos se uma condição essencial for violada, facilitando a detecção precoce de anomalias.",
        questions: [
          q("Qual é o comportamento do método console.assert(condicao, mensagem) em JavaScript?", "Imprime a mensagem de erro no console apenas se a condição for falsa", ["Imprime a mensagem sempre que for executado","Trava o computador com uma tela azul"], "console.assert atua como um sentinela silencioso que só se manifesta em caso de falha."),
          q("O que caracteriza a prática de \"programação defensiva\"?", "Antecipar possíveis entradas errôneas ou estados inválidos, tratando-os preventivamente", ["Escrever código sem usar funções","Proibir qualquer alteração futura no código"], "A programação defensiva blinda o algoritmo contra comportamentos inesperados do ambiente."),
          q("Qual é a diferença entre validação de entrada de usuário e uma asserção de código?", "Validações de entrada tratam dados externos; asserções verificam a lógica interna do código", ["Não há nenhuma diferença","Asserções só rodam em servidores dedicados"], "Validação de usuário guia quem usa; asserções garantem que o programador não cometeu deslizes lógicos."),
          q("Quando uma função recebe um argumento inesperado (ex: null onde se espera número), ela deve:", "Rejeitar a operação ou retornar erro amigável em vez de produzir cálculo corrompido", ["Tentar adivinhar o número que o usuário queria digitar","Desligar o banco de dados"], "Falhar rápido e de forma controlada (fail-fast) evita que dados inconsistentes se propaguem."),
          t("Quantos erros console.assert(true, \"ops\") exibe no console do navegador?", ["0"], "Como a condição é verdadeira, nada é emitido no console.", "console.assert(true, \"Não deve aparecer\");"),
          g("Complete a verificação que assegura que o valor é um número finito antes de somar:", ["Number.isFinite(valor)"], "Number.isFinite valida números prevenindo valores NaN ou infinitos.", "if (!____) {\n  throw new Error(\"Entrada inválida\");\n}"),
          o("Ordene a estrutura de uma função com validação defensiva:", ["Receber os parâmetros fornecidos pelo chamador","Validar tipos e limites das entradas via cláusulas de guarda","Executar o algoritmo de processamento principal","Verificar asserção sobre a consistência da saída antes de retornar"], "Arquitetura fail-fast: blindagem de entrada, núcleo de cálculo e garantia de saída."),
          p("Associe mecanismo de validação ao seu papel protetivo:", [["Cláusula de guarda","Rejeita entradas anômalas no início da função"],["console.assert","Comprova suposições de desenvolvimento no console"],["fail-fast","Princípio de interromper a rotina ao menor sinal de inconsistência"],["Normalização","Ajusta formatos antes de submeter ao processamento central"]], "Estratégias de confiabilidade e resiliência em código JavaScript.")
        ]
      },
      {
        id: "js-alg-8-5-projeto-algoritmo-validado",
        title: "Projeto: algoritmo validado de ponta a ponta",
        subtitle: "Consolidação · Da concepção à suíte completa de verificação",
        theory: "No projeto final do capítulo, concebemos, diagramamos e validamos um algoritmo completo de ponta a ponta. Criamos a especificação de regras, desenhamos o fluxograma correspondente, montamos a matriz de classes de equivalência com casos de borda e comprovamos sua eficácia com asserções completas.",
        questions: [
          q("Qual é o ciclo de vida completo de desenvolvimento de um algoritmo confiável?", "Especificação de requisitos, modelagem de fluxo, codificação e suíte de testes de validação", ["Digitar código diretamente e publicar sem testar","Criar desenhos bonitos sem regras definidas"], "A engenharia metódica conecta o problema à solução verificada passo a passo."),
          q("Por que um algoritmo aprovado em casos comuns pode falhar catastroficamente em produção?", "Porque casos de borda, valores nulos e entradas anômalas não foram contemplados nos testes", ["Porque o código fica cansado com o passar do tempo","Porque servidores usam eletricidade diferente"], "Falhas graves escondem-se rotineiramente nos cantos esquecidos pela amostragem superficial."),
          q("O que a presença de testes automatizados com asserções garante durante futuras refatorações?", "Garante que alterações no código não quebrem funcionalidades que já funcionavam (regressão)", ["Garante que o código nunca mais precisará ser lido","Impede que o arquivo seja editado"], "A suíte de testes atua como uma rede de segurança que viabiliza melhorias sem sobressaltos."),
          q("Qual é o valor de documentar visualmente o fluxograma junto com os casos de teste?", "Permite que programadores e especialistas de negócio compartilhem a mesma visão do problema", ["Apenas para preencher relatórios burocráticos","Não tem nenhum valor em projetos modernos"], "A clareza visual alinha expectativas e esclarece ambiguidades antes que virem prejuízo."),
          t("Quantos testes aprovados confirmam o sucesso da suíte de 5 casos bem planejados?", ["5"], "Todos os 5 cenários devem atingir o resultado esperado para homologar a rotina.", "// 5 casos com 100% de sucesso"),
          g("Complete a asserção final que consolida o resultado do algoritmo no projeto:", ["assert.equal(calculado, esperado)"], "Asserções formais homologam a entrega de algoritmos testáveis.", "____; // homologação do caso"),
          o("Ordene a jornada de criação do projeto de algoritmo validado:", ["Definir com clareza o problema e as regras de negócio a resolver","Desenhar o fluxograma estruturando entradas, decisões e repetições","Elaborar a matriz de testes com classes de equivalência e bordas","Codificar a solução acompanhada da execução bem-sucedida de todas as asserções"], "Da abstração inicial à entrega de software verificado com excelência."),
          p("Associe etapa do projeto à sua evidência de qualidade:", [["Especificação","Regras de negócio sem ambiguidades ou contradições"],["Fluxograma","Diagrama sem nós soltos e com saídas convergentes"],["Matriz de testes","Cobertura de casos típicos, nulos e valores de fronteira"],["Asserções","Verificação automatizada garantindo 100% de sucesso"]], "Padrões de rigor e excelência na engenharia de algoritmos com JavaScript.")
        ]
      }
    ]
  });
})();
