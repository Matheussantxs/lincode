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
  window.LINCODE_CHAPTER_UNITS.java = window.LINCODE_CHAPTER_UNITS.java || {};
  window.LINCODE_CHAPTER_UNITS.java['java-c02'] = Object.assign(window.LINCODE_CHAPTER_UNITS.java['java-c02'] || {}, {
    5: [
      {
        id: "jv-alg-5-1-if-else-booleano",
        title: "Desvios condicionais com tipos booleanos em Java",
        subtitle: "Apresentação · Decisões com tipo boolean explícito",
        theory: "Em Java, decisões no fluxograma exigem expressões estritamente booleanas. Diferente de linguagens como C ou JS, Java não aceita inteiros como condição lógica: o if aceita apenas valores boolean (true ou false). O losango avalia o predicado e conduz a execução pelo ramo Sim ou Não.",
        questions: [
          q("Qual tipo de dado é estritamente exigido dentro da condição if em Java?", "boolean (true ou false)", ["int (0 ou 1)","String"], "Java possui tipagem estática forte e não permite números como condições booleanas."),
          q("O que acontece se tentarmos compilar if (1) { ... } em código Java?", "Ocorre um erro de compilação por tipos incompatíveis (int não converte para boolean)", ["O código compila e trata 1 como true","O programa roda e trava na execução"], "Java rejeita conversão implícita de valores numéricos para o tipo primitivo boolean."),
          q("Como representar no fluxograma um desvio onde menores de 18 pagam meia entrada?", "Um losango com a condição idade < 18 direcionando Sim para meia e Não para inteira", ["Um retângulo com idade < 18","Uma linha reta sem bifurcação"], "O losango separa visualmente os caminhos com base no predicado booleano."),
          q("Qual estrutura em Java define o bloco alternativo quando o if é falso?", "else", ["otherwise","default"], "A palavra-chave else delimita o bloco executado se a condição do if for falsa."),
          t("Se idade for 20, qual texto é impresso por: if (idade >= 18) System.out.print(\"Sim\"); else System.out.print(\"Nao\");?", ["Sim"], "20 é maior ou igual a 18, logo a condição é verdadeira e imprime Sim.", "int idade = 20;\nif (idade >= 18) System.out.print(\"Sim\");"),
          g("Complete a instrução condicional para verificar se o valor é positivo:", ["if (valor > 0)"], "A estrutura if com parênteses avalia o predicado booleano em Java.", "____ {\n    System.out.println(\"Positivo\");\n}"),
          o("Ordene as etapas de uma decisão if-else em tempo de execução em Java:", ["Avaliar a expressão booleana contida entre parênteses","Se o resultado for true, executar o bloco do if e ignorar o else","Se o resultado for false, pular o if e executar o bloco else","Continuar o fluxo de controle após a estrutura condicional"], "Avaliação, desvio excludente e continuação do fluxo sequencial."),
          p("Associe elemento condicional em Java ao seu propósito:", [["boolean","Tipo primitivo para representar true ou false"],["if (cond)","Testa uma condição e executa se for verdadeira"],["else","Executa ação alternativa se a condição for falsa"],["Losango","Símbolo gráfico padrão de decisão em fluxogramas"]], "Elementos fundamentais de controle de fluxo condicional em Java.")
        ]
      },
      {
        id: "jv-alg-5-2-operadores-logicos-curto-circuito",
        title: "Operadores lógicos e curto-circuito em Java",
        subtitle: "Prática · Conjunção (&&), disjunção (||) e negação (!)",
        theory: "Para combinar critérios no fluxograma, Java oferece && (E lógico) e || (OU lógico), além de ! (negação). Os operadores && e || operam com avaliação em curto-circuito: se o primeiro operando de && for falso, ou o de || for verdadeiro, o segundo termo nem sequer é avaliado, prevenindo falhas.",
        questions: [
          q("Qual operador em Java exige que ambas as condições sejam verdadeiras?", "&& (E lógico com curto-circuito)", ["|| (OU lógico)","! (negação)"], "O operador && resulta em true unicamente se ambos os operandos forem verdadeiros."),
          q("O que significa a avaliação em \"curto-circuito\" em uma expressão com &&?", "Se o primeiro termo for falso, o segundo não é avaliado poupando processamento", ["O código gera um curto elétrico na máquina","Os dois lados são avaliados simultaneamente"], "Curto-circuito interrompe a avaliação assim que o desfecho booleano é determinístico."),
          q("Por que expressões como if (str != null && str.length() > 0) são seguras em Java?", "Porque se str for null, str.length() não é executado evitando NullPointerException", ["Porque strings em Java nunca podem ser nulas","Porque o operador && ignora null"], "O curto-circuito protege a chamada do método contra ponteiro nulo (null pointer)."),
          q("Qual operador lógico inverte o valor de uma expressão booleana em Java?", "! (ponto de exclamação)", ["~ (til)","^ (circunflexo)"], "O operador unário ! transforma true em false e false em true."),
          t("Qual valor resulta de (true && false || true) em Java (true ou false)?", ["true"], "true && false resulta em false; false || true resulta em true.", "boolean res = (true && false || true);\nSystem.out.print(res);"),
          g("Complete o operador lógico seguro para validar objeto e propriedade:", ["&&"], "&& avalia em curto-circuito, protegendo contra acessos em nulo.", "if (conta != null ____ conta.temSaldo()) {\n    autorizar();\n}"),
          o("Ordene a avaliação em curto-circuito de (x != 0 && 100 / x > 2) com x = 0:", ["Avaliar o primeiro termo: 0 != 0 resulta em false","Constatar que o operador é a conjunção de curto-circuito &&","Descartar a avaliação de 100 / x evitando ArithmeticException","Definir false como resultado final e seguir pelo ramo Não"], "Proteção de operações perigosas através de avaliação em curto-circuito."),
          p("Associe operador lógico em Java ao seu comportamento:", [["&&","Conjunção com curto-circuito (ambos verdadeiros)"],["||","Disjunção com curto-circuito (ao menos um verdadeiro)"],["!","Inversão booleana unária"],["Curto-circuito","Interrupção antecipada da checagem condicional"]], "Operadores da álgebra de Boole aplicados à lógica em Java.")
        ]
      },
      {
        id: "jv-alg-5-3-if-else-if-encadeado",
        title: "Condições encadeadas e faixas de valores",
        subtitle: "Aprofundamento · Estruturas if - else if - else",
        theory: "Ao classificar entradas em múltiplas faixas excludentes, encadeamos condições com if - else if - else. A ordem dos testes é crucial: cada condição só é avaliada se todas as anteriores falharem. O else final atua como caso residual ou tratamento de exceção.",
        questions: [
          q("Em uma estrutura if - else if - else, quantas ramificações podem ser executadas no máximo?", "Exatamente uma única ramificação correspondente ao primeiro teste verdadeiro", ["Todas as ramificações verdadeiras","Nenhuma ramificação"], "As condições são mutuamente exclusivas; o primeiro ramo verdadeiro interrompe a cadeia."),
          q("Ao classificar notas em faixas (>= 90, >= 70, >= 50), qual ordem é a correta?", "Testar do maior para o menor (ou do menor para o maior com operadores adequados)", ["Em qualquer ordem aleatória","Apenas testando a média aritmética"], "Testar >= 50 primeiro absorveria incorretamente notas como 95 na faixa mais baixa."),
          q("Qual é o propósito da cláusula final else em uma cadeia de decisões?", "Tratar o caso padrão quando nenhuma condição prévia foi satisfeita", ["Repetir os testes do início","Declarar variáveis locais"], "O else captura qualquer cenário que não se enquadre nas condições estipuladas."),
          q("Como representar graficamente um encadeamento if-else-if em fluxograma?", "Uma sequência de losangos conectados pelo ramo Não do teste anterior", ["Vários losangos conectados em círculo fechado","Um losango com quatro saídas Sim"], "Cada ramo Não desvia para o próximo losango de teste da cadeia."),
          t("Para temperatura 28 em: >=30 \"Quente\", >=20 \"Agradavel\", else \"Frio\", qual saída?", ["Agradavel"], "28 não é >= 30, mas atende >= 20, classificando-se como Agradável.", "// temperatura = 28 -> cai no ramo >= 20"),
          g("Complete a cláusula intermediária de classificação em Java:", ["else if"], "else if conecta uma nova checagem após o insucesso da anterior.", "if (pontos >= 100) {\n    nivel = 3;\n} ____ (pontos >= 50) {\n    nivel = 2;\n}"),
          o("Ordene a análise de uma cadeia de desconto por volume:", ["Testar se pedido >= 1000 unidades para desconto máximo de 20%","Senão, testar se pedido >= 500 para desconto intermediário de 10%","Senão, testar se pedido >= 100 para desconto básico de 5%","Senão (else), aplicar preço normal sem desconto"], "Hierarquia de validação em cascata com exclusão mútua."),
          p("Associe padrão condicional ao seu caso de aplicação:", [["if simples","Ação disparada pontualmente por um critério opcional"],["if / else","Bifurcação binária clássica entre duas ações"],["if / else if","Categorização entre três ou mais intervalos excludentes"],["else final","Garante desfecho seguro para entradas não mapeadas"]], "Topologias de decisão para modelagem algorítmica em Java.")
        ]
      },
      {
        id: "jv-alg-5-4-operador-ternario-e-switch",
        title: "Operador ternário e seleção com switch",
        subtitle: "Prática · Expressões compactas e chaveamento em Java",
        theory: "Java oferece o operador ternário (condicao ? v1 : v2) para atribuições condicionais compactas, além do switch para seleção múltipla entre valores discretos (int, char, String ou enum). O switch melhora a legibilidade do fluxograma ao agrupar múltiplos casos em um único ponto de decisão.",
        questions: [
          q("Como funciona a sintaxe do operador ternário em Java?", "condicao ? valorSeVerdadeiro : valorSeFalso", ["condicao : valorSeVerdadeiro ? valorSeFalso","if (condicao) ? v1 : v2"], "O ternário avalia o predicado e devolve uma das duas expressões alternativas."),
          q("Quais tipos de dados podem ser utilizados na expressão de controle de um switch em Java?", "Tipos inteiros primitivos (byte, short, int, char), Strings e enums", ["Apenas números decimais do tipo double","Qualquer classe sem restrição"], "switch suporta valores discretos mapeáveis e não aceita float nem double diretamente."),
          q("Qual é o papel da instrução break dentro de cada case no switch clássico?", "Impedir a execução contínua dos casos subsequentes (fall-through)", ["Reiniciar a execução do método main","Converter inteiros em texto"], "Sem break, a execução avança para os blocos dos cases inferiores indevidamente."),
          q("O que a cláusula default executa dentro de um bloco switch em Java?", "O bloco de código padrão caso nenhum dos cases coincida com a entrada", ["Interrompe o computador imediatamente","Força o primeiro caso a ser verdadeiro"], "default desempenha o papel de fallback ou valor padrão do chaveador."),
          t("Se status for 1, qual valor o ternário (status == 1 ? \"Ativo\" : \"Inativo\") devolve?", ["Ativo"], "Como status é igual a 1, a expressão retorna o primeiro valor (\"Ativo\").", "int status = 1;\nString txt = (status == 1 ? \"Ativo\" : \"Inativo\");"),
          g("Complete o operador ternário para atribuir a taxa correta:", ["isVip ? 0.0 : 15.0"], "O operador ternário condensa a decisão em uma expressão única.", "double taxa = ____;"),
          o("Ordene o chaveamento de opções com switch em Java:", ["Avaliar o valor da variável de seleção passada ao switch","Comparar com o primeiro case especificado","Ao coincidir, executar as instruções e atingir a instrução break","Se nenhum coincidir, direcionar o fluxo para a cláusula default"], "Fluxo de comparação, execução de ramo e saída com break."),
          p("Associe estrutura de decisão à sua melhor utilidade:", [["Operador ternário","Atribuição condicional de uma linha (expressão)"],["switch / case","Seleção múltipla baseada em valores discretos ou enums"],["break;","Cancela o prosseguimento da execução no switch"],["default:","Tratamento padrão para opções não coincidentes"]], "Alternativas expressivas para bifurcações e decisões em Java.")
        ]
      },
      {
        id: "jv-alg-5-5-projeto-classificacao-pedidos",
        title: "Projeto: motor de priorização de pedidos",
        subtitle: "Consolidação · Construindo um classificador de regras em Java",
        theory: "Integrando operadores relacionais, lógica composta, encadeamentos e ternários, construímos um motor de regras para triagem de pedidos. O algoritmo recebe valor, modalidade de entrega e status de fidelidade, calculando prioridade de despacho e emitindo relatórios com decisões auditáveis.",
        questions: [
          q("Qual é o benefício de estruturar regras de negócio em um fluxograma antes de codificar em Java?", "Garante que nenhuma combinação de entrada fique sem tratamento ou gere ambiguidade", ["Reduz o tamanho do arquivo compilado .class","Elimina a exigência de usar variáveis"], "A modelagem gráfica visualiza lacunas na lógica de negócios antes da escrita do código."),
          q("Se um pedido tem entrega Expressa E valor > 500, para qual fila ele deve ser despachado?", "Fila de Alta Prioridade com expedição imediata", ["Fila de cancelamento automático","Aguardar processamento manual indefinido"], "A combinação de modalidade urgente e alto valor exige atendimento prioritário."),
          q("Como garantir que valores monetários inválidos (ex: valor <= 0) não gerem prioridade indevida?", "Inserir uma guarda condicional inicial que rejeita ou marca pedidos com valor inválido", ["Dividir o valor por dois silenciosamente","Ignorar o problema"], "A validação inicial preventiva blinda os estágios de cálculo contra entradas corrompidas."),
          q("Qual estrutura em Java organiza com clareza o cálculo de frete baseado no tipo de cliente?", "Um encadeamento if-else-if ou switch mapeando tipos (OURO, PRATA, COMUM)", ["Vários laços while concorrentes","Um array de caracteres soltos"], "Estruturas de seleção mapeiam categorias de clientes para suas regras tarifárias correspondentes."),
          t("Se o pedido tem prioridade máxima (nível 1), qual código numérico registrar?", ["1"], "O nível prioritário 1 identifica o despacho com máxima urgência.", "// nível = 1 -> prioridade máxima"),
          g("Complete a condição que classifica pedidos para despacho prioritário:", ["valor > 500 && expressa"], "Ambos os critérios são requeridos para a fila prioritária.", "boolean prioridade = (____);"),
          o("Ordene as etapas do motor de priorização de pedidos:", ["Receber dados do pedido: valor total, tipo de frete e categoria do cliente","Validar pré-condições garantindo que o valor é estritamente positivo","Avaliar regras compostas para determinar fila de atendimento","Atribuir código de prioridade e registrar saída para expedição"], "Da recepção e saneamento dos dados à classificação operacional."),
          p("Associe perfil de pedido à sua fila de expedição:", [["Expressa + Valor alto","Fila de Despacho Prioritário Imediato"],["Cliente Ouro + Normal","Fila de Atendimento Preferencial"],["Cliente Comum + Normal","Fila de Expedição Padrão"],["Valor menor ou igual a zero","Fila de Bloqueio para Auditoria"]], "Matriz operacional do motor de classificação de pedidos.")
        ]
      }
    ],
    6: [
      {
        id: "jv-alg-6-1-laco-while-java",
        title: "O laço while e repetições pré-testadas em Java",
        subtitle: "Apresentação · Ciclos controlados por condições lógicas",
        theory: "O laço while executa um bloco de instruções repetidamente enquanto uma expressão booleana permanecer verdadeira. A condição é avaliada antes de cada iteração: se for falsa no início, o corpo do laço não é executado nenhuma vez, seguindo a convenção do losango pré-testado em fluxogramas.",
        questions: [
          q("Em que momento a condição lógica de um laço while é avaliada em Java?", "Antes de cada iteração do corpo do laço (pré-teste)", ["Apenas após o término da primeira repetição","Apenas quando o programa encerra"], "O pré-teste garante que o corpo só executa se a condição inicial for verdadeira."),
          q("Quantas vezes o corpo de um while (false) { ... } executa em Java?", "Nenhuma vez (zero vezes)", ["Uma vez","Infinitas vezes"], "Sendo a condição inicial falsa, o fluxo desvia imediatamente para fora do laço."),
          q("O que é mandatório dentro do corpo de um while para evitar loops infinitos?", "Atualizar ao menos uma variável que influencie diretamente a condição de parada", ["Imprimir uma mensagem no terminal","Declarar novos tipos primitivos"], "Sem a atualização do estado de controle, a condição nunca atinge o critério de término."),
          q("Como representar graficamente um laço while em um fluxograma?", "Um losango de decisão com o ramo Sim entrando no bloco e uma seta retornando ao losango", ["Um retângulo com uma linha cortando o meio","Um círculo com três pontos de saída"], "A seta de retroalimentação é a marca registrada dos ciclos em diagramas de blocos."),
          t("Quantas vezes este laço repete: int i = 0; while (i < 3) { i++; }?", ["3"], "O laço executa para i = 0, 1 e 2, parando quando i atinge 3.", "int i = 0;\nwhile (i < 3) {\n    i++;\n}"),
          g("Complete o comando de repetição pré-testado em Java:", ["while (continua)"], "while repete enquanto a variável booleana for verdadeira.", "____ {\n    executarPasso();\n}"),
          o("Ordene as etapas do ciclo de execução do laço while:", ["Avaliar a expressão booleana de controle no losango","Se true, entrar no bloco e executar as instruções internas","Retornar pela seta de ciclo ao ponto de avaliação da condição","Se false, sair do ciclo e prosseguir com o código seguinte"], "Mecanismo padrão de execução de repetições pré-testadas."),
          p("Associe termo do laço while ao seu papel:", [["while (condicao)","Estrutura de repetição com teste prévio"],["Condição de parada","Expressão que determina quando o laço deve encerrar"],["Loop infinito","Falha onde o laço nunca atinge o encerramento"],["Atualização de estado","Instrução interna que avança rumo ao término"]], "Fundamentos da iteração pré-testada em algoritmos Java.")
        ]
      },
      {
        id: "jv-alg-6-2-laco-do-while-java",
        title: "O laço do-while e repetições pós-testadas",
        subtitle: "Prática · Garantia de execução mínima de um passo",
        theory: "O laço do-while executa o corpo de comandos primeiro e avalia a condição booleana no final (pós-teste). Isso garante que as instruções do bloco executem compulsoriamente ao menos uma vez. É ideal para menus interativos, validação de entradas e solicitações repetidas de leitura.",
        questions: [
          q("Qual é a diferença principal entre o laço while e o laço do-while em Java?", "O do-while garante que o bloco execute ao menos uma vez antes do teste", ["O do-while não aceita variáveis inteiras","O while só funciona com números pares"], "Como o teste é pós-fixado, a primeira iteração ocorre incondicionalmente."),
          q("O que deve obrigatoriamente constar ao final da linha do while no do-while em Java?", "Um ponto e vírgula (;): do { ... } while (condicao);", ["Dois pontos (:)","Uma chave de fechamento dupla"], "A sintaxe de Java exige ponto e vírgula após o parêntese de fechamento do do-while."),
          q("Em qual cenário o laço do-while é a escolha mais natural e legível?", "Leitura de entrada do usuário com repetição caso a validação falhe", ["Cálculo de raízes quadradas sem variáveis","Processamento assíncrono em threads"], "A leitura precisa ocorrer antes de validar se o valor digitado é aceitável."),
          q("Como representar graficamente um laço do-while em um fluxograma?", "O fluxo entra diretamente no retângulo de ação e em seguida passa pelo losango de teste", ["O losango fica antes de qualquer retângulo","Não é possível representar do-while em fluxo"], "O bloco de processamento antecede a avaliação condicional no trajeto das setas."),
          t("Quantas vezes o corpo executa em: do { x++; } while (false); com x iniciando em 0?", ["1"], "A primeira execução ocorre antes do teste da condição falsa.", "int x = 0;\ndo {\n    x++;\n} while (false);\nSystem.out.print(x);"),
          g("Complete o encerramento sintático obrigatório do laço do-while em Java:", ["while (opcao != 0);"], "do-while termina com a condição seguida de ponto e vírgula.", "do {\n    menu();\n} ____"),
          o("Ordene as etapas da repetição pós-testada do-while:", ["Executar incondicionalmente as instruções do corpo do laço","Avaliar a condição lógica após a execução do bloco","Se true, retornar ao início do bloco do para nova repetição","Se false, prosseguir imediatamente para a próxima instrução"], "Sequência operacional de laços pós-testados em Java."),
          p("Associe tipo de laço ao seu comportamento de primeira volta:", [["while (cond)","Pode executar zero vezes se a condição inicial for falsa"],["do { } while","Executa compulsoriamente ao menos uma única vez"],["Ponto e vírgula final","Exigência sintática ao término de do-while"],["Menu interativo","Exemplo clássico de uso do laço pós-testado"]], "Diferenças de arquitetura e aplicação entre laços pré e pós-testados.")
        ]
      },
      {
        id: "jv-alg-6-3-laco-for-tradicional",
        title: "O laço for tradicional com contador",
        subtitle: "Prática · Inicialização, limite e incremento unificados",
        theory: "O laço for tradicional em Java unifica a inicialização da variável contadora, a condição booleana de continuidade e o passo de atualização em um cabeçalho compacto: for (int i = 0; i < n; i++). Essa estrutura disciplinada minimiza falhas de esquecimento de incremento e delimita o escopo da variável.",
        questions: [
          q("Qual é a ordem de execução das três partes do cabeçalho for (init; cond; step)?", "init executa uma vez; cond é avaliada; se true, roda corpo; por fim executa step", ["step executa primeiro; cond é avaliada; init por último","As três partes rodam ao mesmo tempo"], "A inicialização prepara o índice, o teste valida o passo e o incremento atualiza ao término da volta."),
          q("O que acontece se declararmos int i dentro do for: for (int i = 0; ...)?", "A variável i tem escopo restrito ao laço e deixa de existir fora dele", ["A variável torna-se acessível em qualquer método da classe","A variável não pode ser incrementada"], "O escopo de bloco previne vazamento de variáveis e colisões de nomes acidentais."),
          q("Como escrever um laço for em Java para iterar de 10 até 1 em ordem decrescente?", "for (int i = 10; i >= 1; i--)", ["for (int i = 1; i <= 10; i--)","for (int i = 10; i < 1; i++)"], "Inicia em 10, continua enquanto for maior ou igual a 1 e decrementa com i--."),
          q("Quantas repetições ocorrem no laço for (int i = 0; i < 5; i++)?", "Exatamente 5 repetições (com i variando de 0 a 4)", ["6 repetições","4 repetições"], "O intervalo de 0 a menor estrito que 5 gera 0, 1, 2, 3 e 4 (5 vezes)."),
          t("Qual é o valor final impresso da soma de 1 a 3 com: int s=0; for(int i=1; i<=3; i++) s+=i;?", ["6"], "1 + 2 + 3 = 6.", "int s = 0;\nfor (int i = 1; i <= 3; i++) s += i;\nSystem.out.print(s);"),
          g("Complete o cabeçalho do laço para percorrer 10 posições em Java:", ["for (int i = 0; i < 10; i++)"], "Estrutura canônica de repetição contada em Java.", "____ {\n    processarItem(i);\n}"),
          o("Ordene o fluxo cronológico da primeira iteração de um laço for:", ["Executar a declaração e inicialização da variável contadora (int i = 0)","Avaliar a condição booleana de parada (i < n)","Executar o corpo de instruções do laço com o valor atual de i","Executar a expressão de incremento (i++) ao final da volta"], "Ciclo de vida interno da primeira volta da instrução for."),
          p("Associe termo do cabeçalho for ao seu momento:", [["int i = 0","Executa uma única vez no início do laço"],["i < limite","Avaliado antes de cada repetição"],["i++","Executado logo após o término do bloco"],["Escopo de bloco","Destrói a variável contadora ao sair do for"]], "Componentes e ciclo temporal da repetição contada em Java.")
        ]
      },
      {
        id: "jv-alg-6-4-contadores-acumuladores-java",
        title: "Contadores e acumuladores de dados",
        subtitle: "Prática · Consolidação de somas, contagens e médias",
        theory: "Contadores e acumuladores são as variáveis de trabalho mais utilizadas em laços algorítmicos. Contadores registram ocorrências ou passos (cont++), enquanto acumuladores somam grandezas variáveis (total += valor). Ambos devem ser inicializados com elementos neutros adequados antes do início do laço.",
        questions: [
          q("Qual é o valor de inicialização padrão para um acumulador de somas monetárias?", "0 (zero), o elemento neutro da adição", ["1 (um)","null"], "Iniciar com zero garante que a soma reflita fielmente os valores acumulados."),
          q("Qual é o valor de inicialização padrão para um acumulador de produtos/multiplicações?", "1 (um), o elemento neutro da multiplicação", ["0 (zero)","-1"], "Multiplicar por zero anularia todo o resultado; o número um preserva os fatores."),
          q("Como contar quantas notas acima da média existem em um conjunto de avaliações?", "Com um laço que testa if (nota >= media) e incrementa um contador: aprovados++", ["Multiplicando todas as notas entre si","Declarando uma nova classe para cada nota"], "O teste condicional dentro do laço incrementa o contador seletivamente."),
          q("O que acontece se tentarmos usar uma variável local como acumulador sem inicializá-la em Java?", "O compilador gera erro: variável pode não ter sido inicializada", ["Java inicializa com zero automaticamente","A variável recebe um valor aleatório da memória"], "Variáveis locais em Java exigem inicialização explícita antes da primeira leitura."),
          t("Quantos números pares existem no intervalo de 1 a 6 (inclusive)?", ["3"], "Os números pares são 2, 4 e 6, totalizando 3 ocorrências.", "int cont = 0;\nfor (int i = 1; i <= 6; i++) if (i % 2 == 0) cont++;"),
          g("Complete o operador de acumulação composto em Java:", ["+="], "+= acumula a adição diretamente na variável existente.", "total ____ precoItem;"),
          o("Ordene o cálculo de média aritmética de uma sequência de números:", ["Inicializar soma = 0.0 e totalElementos = 0","Percorrer os números acumulando soma += n e incrementando totalElementos++","Após o laço, verificar se totalElementos > 0 para evitar divisão por zero","Calcular media = soma / totalElementos e entregar o resultado"], "Padrão completo de contagem, acumulação e média com proteção."),
          p("Associe papel da variável à sua atribuição de largada:", [["Contador de itens","int total = 0;"],["Acumulador de soma","double soma = 0.0;"],["Acumulador de produto","long produto = 1L;"],["Flag de localização","boolean achou = false;"]], "Padrões de inicialização de variáveis de controle e acumulação.")
        ]
      },
      {
        id: "jv-alg-6-5-projeto-varredura-colecoes",
        title: "Projeto: varredura, busca e corte com break",
        subtitle: "Consolidação · Construindo algoritmo de varredura eficiente",
        theory: "Neste projeto prático, unimos laços, contadores, acumuladores e instruções break/continue. O algoritmo varre um vetor de inteiros, acumula apenas os valores válidos ignorando anomalias com continue e interrompe a busca com break assim que um registro de cancelamento for localizado.",
        questions: [
          q("Qual é o impacto de utilizar a instrução break ao localizar um elemento em uma busca linear?", "Encerra o laço imediatamente, evitando percorrer os elementos restantes da coleção", ["Reinicia a busca a partir do zero","Apaga o vetor da memória RAM"], "O break poupa iterações desnecessárias quando o objetivo já foi atingido."),
          q("Qual é a diferença de comportamento entre continue e break em um laço for em Java?", "continue salta para a próxima iteração; break encerra o laço definitivamente", ["continue fecha o programa","break só funciona dentro de switch"], "continue pula o restante do corpo da volta atual mantendo o laço ativo."),
          q("Qual valor sentinela padrão deve ser retornado caso uma busca não encontre o item?", "-1", ["0","9999"], "Por convenção em Java, o índice -1 indica que o item não existe no vetor pesquisado."),
          q("Como evitar erros de estouro de limites (ArrayIndexOutOfBoundsException) no percurso do vetor?", "Usar a condição estrita i < array.length no cabeçalho do laço", ["Usar i <= array.length","Declarar o vetor sem tamanho"], "O tamanho length representa um índice além do último válido; usar < é indispensável."),
          t("Se o item buscado está no índice 2 de um vetor, qual índice o algoritmo deve registrar?", ["2"], "A posição encontrada corresponde ao índice numérico 2.", "// item localizado no índice 2"),
          g("Complete o comando que interrompe a busca assim que o alvo for encontrado:", ["break;"], "break interrompe e finaliza o laço imediatamente.", "if (arr[i] == alvo) {\n    posicao = i;\n    ____\n}"),
          o("Ordene as etapas de uma busca linear com interrupção por sentinela:", ["Inicializar indiceEncontrado = -1 como sentinela de não localizado","Percorrer o vetor com laço for de 0 até array.length - 1","Se o elemento coincidir com o alvo, salvar o índice e disparar break","Retornar indiceEncontrado ao final do procedimento"], "Algoritmo de busca linear otimizada com sentinela e interrupção."),
          p("Associe instrução de fluxo ao seu efeito em tempo de execução:", [["break;","Cancela e finaliza o laço imediatamente"],["continue;","Pula para a próxima iteração ignorando o resto do corpo"],["return valor;","Sai do laço e encerra o método entregando a saída"],["array.length","Propriedade com o tamanho total de elementos do vetor"]], "Ferramentas de controle de fluxo de iteração em vetores Java.")
        ]
      }
    ],
    7: [
      {
        id: "jv-alg-7-1-teste-mesa-java",
        title: "Teste de mesa e simulação manual em Java",
        subtitle: "Apresentação · Rastreamento de variáveis passo a passo",
        theory: "O teste de mesa é a prática rigorosa de simular o comportamento de um algoritmo instrução por instrução. Em uma tabela, registramos o valor de cada variável e o resultado de cada condição booleana, permitindo identificar falhas lógicas e inconsistências de tipos antes da compilação.",
        questions: [
          q("O que representa uma linha em uma tabela de teste de mesa?", "O estado de todas as variáveis e condições após a execução de uma instrução", ["O número da página do livro de Java","O endereço físico de memória"], "Cada linha reflete a transformação de estado provocada por um passo do algoritmo."),
          q("Por que o teste de mesa manual continua relevante mesmo com depuradores modernos?", "Porque desenvolve o modelo mental de execução e comprova a lógica antes de codificar", ["Porque depuradores não funcionam em Java","Porque o compilador exige o teste de mesa"], "Compreender o fluxo de controle abstrato previne o vício de adivinhar correções."),
          q("Ao rastrear variáveis de tipos primitivos em Java, o que acontece a cada nova atribuição?", "O valor anterior da variável é sobrescrito pelo novo dado na coluna correspondente", ["Os dois valores são somados automaticamente","Uma nova coluna é criada na tabela"], "Variáveis primitivas guardam um único valor momentâneo por vez."),
          q("Como registrar uma bifurcação condicional if na tabela de rastreamento?", "Anotar a condição testada, se resultou em true ou false e qual linha foi executada em seguida", ["Anotar apenas \"ok\"","Pular a linha da decisão"], "Registrar o veredito booleano explica por que determinado caminho foi seguido."),
          t("Se a=2 e b=3, após a = a + b e b = a * 2, qual é o valor final de b no teste de mesa?", ["10"], "a vira 2+3=5; em seguida b vira 5*2=10.", "int a = 2, b = 3;\na = a + b; // a vira 5\nb = a * 2; // b vira 10"),
          g("Complete o comando que imprime o valor de rastreamento para depuração:", ["System.out.println(\"x=\" + x)"], "Concatenação simples para registrar o estado da variável no console.", "____; // log de rastreamento"),
          o("Ordene os passos para conduzir um teste de mesa rigoroso:", ["Escrever no cabeçalho da tabela todas as variáveis, laços e condições","Preencher a primeira linha com os parâmetros e valores de entrada","Executar cada comando na ordem das setas e atualizar as colunas","Conferir se os valores finais coincidem com os resultados esperados"], "Metodologia padrão de auditoria manual de algoritmos imperativos."),
          p("Associe termo do teste de mesa à sua definição funcional:", [["Cabeçalho","Lista as variáveis e condições monitoradas"],["Linha de estado","Captura os valores após uma instrução específica"],["Veredito booleano","Resultado (true/false) que guia a próxima seta"],["Saída final","Valor devolvido ou impresso no encerramento da rotina"]], "Componentes fundamentais da auditoria de estado por teste de mesa.")
        ]
      },
      {
        id: "jv-alg-7-2-diagnostico-fronteiras",
        title: "Diagnóstico de erros de limites em vetores",
        subtitle: "Prática · Identificando limites e exceções de índice",
        theory: "Em Java, vetores são indexados de 0 a length - 1. Acessar o índice length provoca a temida ArrayIndexOutOfBoundsException. O rastreamento de limites inspeciona exatamente a primeira iteração (índice 0) e a última iteração (índice length - 1) para certificar que nenhuma fronteira seja violada.",
        questions: [
          q("Qual exceção em tempo de execução Java lança ao tentar acessar um índice inexistente de um vetor?", "ArrayIndexOutOfBoundsException", ["NullPointerException","IllegalArgumentException"], "A máquina virtual Java impede acessos fora do intervalo alocado de vetores."),
          q("Se um vetor foi instanciado com int[] dados = new int[5], qual é o último índice válido?", "4 (os índices vão de 0 a 4)", ["5","3"], "Como a contagem inicia em zero, o índice máximo é tamanho - 1."),
          q("Qual é o erro clássico que gera ArrayIndexOutOfBoundsException em um laço for?", "Escrever i <= array.length em vez de i < array.length na condição de parada", ["Escrever i++ no incremento","Iniciar i com zero"], "A igualdade <= tenta acessar o índice igual ao tamanho, que não existe."),
          q("Como o teste de mesa previne falhas de limite em vetores?", "Rastreando formalmente o valor de i na última volta e conferindo se ele é menor que length", ["Desativando o vetor em tempo de teste","Usando apenas variáveis do tipo double"], "Simular a fronteira superior na tabela expõe a tentativa de leitura fora dos limites."),
          t("Quantos elementos comporta um vetor cujos índices válidos vão de 0 a 9?", ["10"], "De 0 a 9 existem exatamente 10 posições indexadas.", "// tamanho = 10; índices de 0 a 9"),
          g("Complete o teste de limite para percurso seguro no vetor:", ["i < v.length"], "O operador estrito < garante que o último índice lido seja length - 1.", "for (int i = 0; ____; i++) {\n    consumir(v[i]);\n}"),
          o("Ordene a verificação de fronteiras em um vetor de tamanho N:", ["Conferir a primeira posição: i = 0 é acessado com sucesso","Conferir a penúltima posição: i = N - 2 funciona sem anomalias","Conferir a última posição válida: i = N - 1 consome o dado final","Conferir a saída: quando i = N, a condição i < N é false e encerra o laço"], "Roteiro de verificação de limites inferior e superior em vetores."),
          p("Associe expressão de vetor ao seu status de validade:", [["v[0]","Primeiro elemento válido de qualquer vetor não vazio"],["v[v.length - 1]","Último elemento válido do vetor"],["v[v.length]","Índice inválido que lança ArrayIndexOutOfBoundsException"],["v.length","Quantidade total de elementos alocados no vetor"]], "Mapeamento de índices e fronteiras de estruturas indexadas em Java.")
        ]
      },
      {
        id: "jv-alg-7-3-troca-variaveis-temporarias",
        title: "Troca de valores e variáveis auxiliares",
        subtitle: "Aprofundamento · Rastreando a dependência mútua de variáveis",
        theory: "Para inverter o conteúdo de duas variáveis primitivas em Java sem perda de dados, utiliza-se obrigatoriamente uma variável temporária auxiliar (temp). Rastrear a cópia de valores na tabela de mesa ilustra por que atribuições diretas simultâneas sobrescrevem dados incorretamente.",
        questions: [
          q("Por que o código a = b; b = a; falha em trocar os valores de duas variáveis em Java?", "Porque a primeira linha sobrescreve o valor original de a, destruindo-o antes de ser copiado para b", ["Porque Java não permite atribuir uma variável a outra","Porque b vira nulo automaticamente"], "Ao sobrescrever a com o valor de b, o dado original de a é irremediavelmente perdido."),
          q("Qual é a sequência correta de três passos para trocar a e b usando a variável temp?", "temp = a; a = b; b = temp;", ["a = temp; temp = b; b = a;","b = temp; temp = a; a = b;"], "Salva-se a em temp, transfere-se b para a, e restaura-se o valor salvo de temp em b."),
          q("No teste de mesa da troca de a=10 e b=20, quais valores constam nas variáveis logo após a = b?", "a tem 20, b tem 20 e temp tem 10", ["a tem 10 e b tem 20","Todas as variáveis viram zero"], "Nesse instante intermediário, tanto a quanto b guardam 20, mas temp preserva o 10 original."),
          q("Como a troca de variáveis se aplica em algoritmos fundamentais de ordenação como Bubble Sort?", "Sempre que dois elementos adjacentes estão fora de ordem, seus valores são permutados via temp", ["Para apagar os dados duplicados","Para calcular a média das posições"], "A permutação de posições é a operação elementar de ordenações comparativas."),
          t("Se x=100 e y=200, qual é o valor final de y após a rotina correta de troca?", ["100"], "A variável y recebe o valor original de x através da variável temp.", "int x = 100, y = 200;\nint temp = x; x = y; y = temp;\nSystem.out.print(y);"),
          g("Complete a instrução que salva o valor de a antes da sobreposição:", ["int temp = a;"], "A variável temporária guarda o dado original com segurança.", "____\na = b;\nb = temp;"),
          o("Ordene as três instruções de troca com variável temporária:", ["Declarar temp e copiar o conteúdo de a: int temp = a;","Sobrescrever a com o conteúdo de b: a = b;","Copiar o valor salvo em temp para b: b = temp;","Concluir com as variáveis permutadas com sucesso"], "Sequência elementar de permutação de memória de variáveis primitivas."),
          p("Associe linha de código do swap ao seu efeito no estado:", [["int temp = a;","Preserva o dado original de a na memória auxiliar"],["a = b;","Transfere o dado de b para a"],["b = temp;","Recupera o dado salvo originalmente em a e passa a b"],["Permutação","Operação completa onde as variáveis trocam de valores"]], "Etapas da permuta de variáveis com variável temporária em Java.")
        ]
      },
      {
        id: "jv-alg-7-4-invariantes-e-termino-java",
        title: "Invariantes de laço e garantias de terminação",
        subtitle: "Avançado · Afirmações lógicas e demonstração de corretude",
        theory: "Um invariante de laço em Java é uma propriedade lógica que se mantém verdadeira antes da primeira iteração, é conservada a cada volta do laço e fornece a garantia de que o resultado final obtido no encerramento é correto. Identificar invariantes ajuda a provar que laços atingem o fim esperado.",
        questions: [
          q("O que define um invariante de laço na verificação formal de programas?", "Uma afirmação lógica sobre o estado do programa que permanece verdadeira em toda iteração", ["Um comando que nunca pode ser apagado do arquivo","Uma variável que não pode receber números"], "O invariante formaliza o progresso consistente e correto da computação a cada ciclo."),
          q("Quais são as três condições que comprovam a validade de um invariante de laço?", "Inicialização (base), Manutenção (passo indutivo) e Término (conclusão)", ["Declaração, instanciação e coleta de lixo","Compilação, empacotamento e deploy"], "Princípio similar à indução matemática que garante a integridade do algoritmo do início ao fim."),
          q("Em um algoritmo que busca o maior elemento de um vetor, qual é o invariante?", "Em cada passo i, a variável maximo contém o maior valor presente no subvetor v[0 .. i-1]", ["A variável maximo sempre é zero","O vetor é ordenado automaticamente a cada volta"], "Garante que maximo representa a verdade matemática sobre a porção já examinada do vetor."),
          q("O que assegura que um laço for (int i = 0; i < n; i++) sempre terminará para n >= 0?", "O valor de (n - i) é uma função de decrescimento estrito que atinge zero em tempo finito", ["Java encerra qualquer laço após 10 segundos","O processador desliga se o laço for longo"], "Uma função variante decrescente estrita com limite inferior prova matematicamente a terminação."),
          t("Quantas voltas restam para o término de um laço com i=7 e n=10?", ["3"], "10 - 7 = 3 voltas restantes (para i = 7, 8 e 9).", "// voltas restantes = n - i"),
          g("Complete a instrução de asserção que verifica o invariante de índice válido:", ["assert i >= 0 && i <= n;"], "assert documenta e testa formalmente o invariante em tempo de teste.", "____ // garantia de invariante de limites"),
          o("Ordene os estágios da prova de corretude com invariante de laço:", ["Inicialização: provar que a propriedade é verdadeira antes da primeira iteração","Manutenção: provar que a propriedade se mantém verdadeira na iteração subsequente","Garantir a condição de terminação mostrando que a variável atinge o limite de parada","Término: o laço encerra e o invariante prova que a saída final é a esperada"], "Demonstração indutiva de corretude de laços em ciência da computação."),
          p("Associe estágio da prova ao seu significado formal:", [["Inicialização","Propriedade válida no estado anterior à primeira iteração"],["Manutenção","A propriedade se preserva intacta após cada nova volta"],["Variante de laço","Medida estritamente decrescente que garante a parada"],["Término","Comprovação de que o resultado final satisfaz a especificação"]], "Fundamentos da verificação formal de algoritmos iterativos.")
        ]
      },
      {
        id: "jv-alg-7-5-projeto-depuracao-rastreada",
        title: "Projeto: depuração guiada por teste de mesa",
        subtitle: "Consolidação · Localizando e corrigindo falhas com rigor",
        theory: "Neste projeto prático, recebemos um algoritmo com um bug sutil no cálculo de acúmulo de bônus por produtividade. Ao construir a tabela de rastreamento com valores simulados conhecidos, localizamos com precisão a instrução defeituosa, corrigimos o código e comprovamos o sucesso da correção.",
        questions: [
          q("Qual é a primeira atitude de engenharia recomendada ao ser notificado de um bug?", "Reproduzir a falha de forma determinística utilizando valores conhecidos de entrada", ["Reescrever todo o sistema do zero","Ignorar o problema se ocorrer poucas vezes"], "A reprodução confiável é a pré-condição indispensável para qualquer diagnóstico assertivo."),
          q("Como o teste de mesa identifica se uma variável foi sobrescrita prematuramente?", "A tabela mostra o valor original sendo perdido na linha antes de ser utilizado em outra conta", ["A cor da fonte do texto muda na tabela","O computador emite um sinal sonoro"], "A auditoria linha a linha revela descompassos na cronologia de leitura e escrita de variáveis."),
          q("Se o bônus deveria incidir apenas para metas superadas (> 100), mas o código usa >= 100:", "O caso de teste com exatamente 100 expõe o bug concedendo bônus indevido", ["O caso de teste com 500 expõe o bug","O caso de teste com 0 expõe o bug"], "O valor exato da fronteira isola a discrepância entre operadores estritos e inclusivos."),
          q("Qual é a validação necessária após efetuar a alteração do código para sanar a falha?", "Reexecutar o teste de mesa e toda a suíte de testes para evitar regressão de funcionalidades", ["Pedir para um colega assinar sem testar","Publicar diretamente em produção"], "Garantir que a falha foi extinta e nenhum efeito colateral novo foi introduzido."),
          t("Se o valor corrigido para meta 100 é zero de bônus, qual bônus registrar?", ["0"], "Meta 100 não superou o critério de maior estrito (> 100), recebendo 0.", "// bônus = 0 para meta exatamente 100"),
          g("Complete a correção da condição para exigir meta estritamente superada:", ["meta > 100"], "Maior estrito (> 100) concede bônus somente a partir de 101.", "if (____) {\n    concederBonus();\n}"),
          o("Ordene as etapas da resolução sistemática de um defeito por rastreamento:", ["Elaborar um caso de teste que evidencie o comportamento incorreto","Montar a tabela de teste de mesa acompanhando passo a passo a execução","Identificar a instrução exata onde a divergência de estado acontece","Corrigir a linha defeituosa e comprovar com novo teste de mesa bem-sucedido"], "Ciclo disciplinado de diagnóstico, correção e verificação de software."),
          p("Associe etapa de manutenção de software ao seu papel:", [["Reprodução do bug","Criação de cenário com dados determinísticos que falham"],["Isolamento da causa","Localização da instrução que corrompeu o estado"],["Ajuste de código","Correção cirúrgica da linha ou operador inadequado"],["Teste de regressão","Comprovação de que as demais regras continuam válidas"]], "Boas práticas profissionais no ciclo de resolução de defeitos em Java.")
        ]
      }
    ],
    8: [
      {
        id: "jv-alg-8-1-classes-equivalencia-java",
        title: "Casos de teste e classes de equivalência em Java",
        subtitle: "Apresentação · Particionamento inteligente de entradas",
        theory: "Para validar algoritmos de forma eficiente, dividimos o universo de entradas em classes de equivalência: grupos de valores tratados de forma idêntica pela lógica. Testar um representante válido e um inválido de cada classe é suficiente para assegurar o comportamento correto do sistema.",
        questions: [
          q("O que é uma \"classe de equivalência\" na engenharia de software?", "Um subconjunto de entradas para o qual o algoritmo deve apresentar o mesmo comportamento", ["Uma classe Java que herda de Object","Uma coleção de arquivos de mesmo tamanho"], "Valores de uma mesma partição exercitam as mesmas instruções e ramificações lógicas."),
          q("Para um método que calcula desconto para compras entre R$ 100 e R$ 500, quais são as classes?", "Valores < 100 (sem desconto), entre 100 e 500 (com desconto) e > 500 (faixa especial)", ["Apenas o valor R$ 250 testado dez vezes","Todos os números reais de ponto flutuante"], "As classes cobrem as partições válidas e os cenários abaixo e acima do intervalo."),
          q("Por que o particionamento em classes de equivalência reduz o custo de testes?", "Porque permite testar poucos valores selecionados em vez de milhões de dados aleatórios", ["Porque desativa a compilação de testes lentos","Porque elimina a necessidade de asserções"], "Maximiza a cobertura com o menor número viável de casos de teste estruturados."),
          q("O que deve ser verificado em um caso de teste completo além dos dados de entrada?", "O resultado esperado e os possíveis efeitos colaterais de alteração de estado", ["Apenas se a máquina não esquenta","A velocidade com que o arquivo fecha"], "Um teste é válido apenas se puder comparar a saída obtida com um gabarito predefinido."),
          t("Quantos casos de teste representativos são suficientes para cobrir 3 classes de equivalência?", ["3"], "Um valor representativo para cada uma das 3 partições atende ao critério inicial.", "// 1 teste por classe de equivalência = 3 testes"),
          g("Complete o teste automatizado conferindo a saída esperada em Java:", ["esperado == obtido"], "A igualdade confirma se o resultado calculado atende à expectativa.", "assert (____) : \"Divergência no resultado\";"),
          o("Ordene as etapas do particionamento em classes de equivalência:", ["Identificar as restrições e faixas especificadas nos requisitos do método","Particionar as entradas em classes válidas e classes inválidas","Selecionar um valor de teste típico para representar cada partição","Executar os casos de teste e registrar os resultados em uma matriz"], "Metodologia estruturada de teste baseada em especificação de requisitos."),
          p("Associe termo de teste ao seu propósito funcional:", [["Entrada de teste","Valores alimentados no algoritmo para verificação"],["Saída esperada","Resultado correto estipulado pelas regras de negócio"],["Classe válida","Conjunto de dados legítimos esperados pelo sistema"],["Classe inválida","Conjunto de dados anômalos que devem ser rejeitados"]], "Elementos constitutivos do projeto de testes por classes de equivalência.")
        ]
      },
      {
        id: "jv-alg-8-2-analise-limites-fronteiras",
        title: "Análise de valores-limite e bordas em Java",
        subtitle: "Prática · Concentração de falhas nas transições de regras",
        theory: "A análise de valores-limite complementa as classes de equivalência testando os extremos dos intervalos: o limite exato, o valor imediatamente anterior e o imediatamente posterior. É na transição de regras que ocorrem a maioria das falhas por confusão entre operadores como < e <=.",
        questions: [
          q("Por que os testadores concentram esforços nas fronteiras dos intervalos de entrada?", "Porque a maioria dos bugs decorre de erros de operadores relacionais nas bordas", ["Porque valores de borda são processados mais rapidamente pela CPU","Porque os tipos primitivos só falham nos limites"], "Erros de off-by-one e fronteiras mal especificadas são as falhas lógicas mais frequentes."),
          q("Para um intervalo de aprovação com nota >= 60 em escala de 0 a 100, quais notas testam a borda?", "59 (imediatamente abaixo), 60 (borda exata) e 61 (imediatamente acima)", ["Apenas o número 0","Notas 10, 50 e 90"], "Testar a transição crítica de aprovação revela se 60 foi incluído corretamente."),
          q("Quais são os limites extremos essenciais ao testar um tipo primitivo int em Java?", "Integer.MIN_VALUE (-2.147.483.648) e Integer.MAX_VALUE (2.147.483.647)", ["Apenas os números 1 e 2","Zero e dez"], "Operações aritméticas nos limites de int podem sofrer overflow ou underflow silencioso."),
          q("O que acontece se somarmos 1 ao valor Integer.MAX_VALUE em Java sem proteção?", "Ocorre um overflow silencioso e o número vira o negativo Integer.MIN_VALUE", ["Java lança uma exceção de overflow imediatamente","O computador trava"], "A aritmética padrão de inteiros em Java é modular (wrap-around) e exige atenção às bordas."),
          t("Qual número inteiro testa a borda imediatamente inferior da condição valor >= 100?", ["99"], "O número 99 é o predecessor inteiro direto de 100.", "// borda: 99, 100, 101"),
          g("Complete o teste para evitar overflow antes de somar dois inteiros positivos:", ["Integer.MAX_VALUE - b < a"], "Verificar se a soma ultrapassa o limite máximo protege contra overflow.", "if (____) {\n    throw new ArithmeticException(\"Overflow de inteiros\");\n}"),
          o("Ordene os testes de valores-limite para a regra idade >= 18:", ["Testar idade = 17: valor imediatamente abaixo, esperando resultado \"Não\"","Testar idade = 18: fronteira exata, esperando resultado \"Sim\"","Testar idade = 19: valor imediatamente acima, esperando resultado \"Sim\"","Homologar que o operador utilizado foi >= e não >"], "Validação de fronteira para desambiguação de operadores relacionais."),
          p("Associe cenário de borda ao seu valor de teste:", [["Borda inferior estrita (> 0)","Testar 0 (falso) e 1 (verdadeiro)"],["Borda inclusiva (>= 18)","Testar 17 (falso) e 18 (verdadeiro)"],["Fronteira máxima de vetor","Testar tamanho - 1 (válido) e tamanho (exceção)"],["Extremo de int em Java","Integer.MAX_VALUE e Integer.MIN_VALUE"]], "Exemplos práticos de seleção de valores de borda em algoritmos Java.")
        ]
      },
      {
        id: "jv-alg-8-3-cobertura-ramos-caminhos",
        title: "Cobertura de código e ramos em Java",
        subtitle: "Aprofundamento · Caixa-branca e garantia de caminhos visitados",
        theory: "O teste de caixa-branca analisa o grafo de fluxo do programa para medir cobertura. A cobertura de instruções verifica se todas as linhas foram executadas, enquanto a cobertura de ramos garante que cada saída (true e false) de cada losango de decisão foi percorrida por ao menos um caso de teste.",
        questions: [
          q("Qual é a diferença entre cobertura de instruções e cobertura de ramos?", "Cobertura de ramos exige que cada saída booleana (true e false) seja testada", ["Cobertura de instruções só testa comentários","Não existe diferença prática"], "É possível ter 100% de linhas executadas sem ter exercitado todos os ramos do fluxo."),
          q("Quantos casos de teste são necessários no mínimo para cobrir um if (cond) sem else?", "Dois casos: um onde cond seja true e outro onde cond seja false", ["Apenas um caso com true","Três casos"], "Mesmo sem bloco else explícito, o desvio em caso de false é um ramo que precisa de teste."),
          q("O que a métrica de \"complexidade ciclomática\" de McCabe mede no algoritmo?", "A quantidade de caminhos linearmente independentes através do código-fonte", ["O número de variáveis declaradas no arquivo","O tempo de compilação em segundos"], "Calcula a quantidade mínima de testes necessários para cobrir todos os caminhos do fluxo."),
          q("Por que 100% de cobertura de código não garante que o software está 100% livre de bugs?", "Porque pode haver requisitos omitidos ou regras de negócio que nem sequer foram codificadas", ["Porque testes de caixa-branca nunca encontram defeitos","Porque Java ignora testes"], "Testes confirmam que o código existente roda, mas não criam regras faltantes."),
          t("Quantos ramos são gerados por um algoritmo com 3 estruturas if-else independentes?", ["8"], "Cada if-else gera 2 caminhos; 2 * 2 * 2 = 8 combinações totais de caminhos.", "// 2^3 = 8 caminhos possíveis no grafo de controle"),
          g("Complete o teste com valor falso para cobrir o ramo alternativo de if (ativo):", ["ativo = false"], "Testar com false exercita a ramificação oposta do losango.", "boolean ____;\nexecutarRotina(ativo);"),
          o("Ordene as etapas para atingir cobertura completa de ramos em um método Java:", ["Mapear todos os operadores relacionais, if, switch e laços do método","Contar o número total de decisões e suas respectivas ramificações","Elaborar casos de teste cobrindo true e false para cada condição","Executar a ferramenta de cobertura (como JaCoCo) e auditar o relatório"], "Metodologia estruturada para garantia de qualidade e cobertura de fluxos."),
          p("Associe métrica de teste ao seu foco de auditoria:", [["Cobertura de linhas","Percentual de declarações de código executadas"],["Cobertura de ramos","Percentual de decisões booleanas exercitadas nos dois sentidos"],["Complexidade ciclomática","Número de caminhos lógicos independentes no grafo de fluxo"],["Grafo de controle","Representação formal de nós e arestas do algoritmo"]], "Métricas formais de auditoria e verificação de software em Java.")
        ]
      },
      {
        id: "jv-alg-8-4-assercoes-programacao-defensiva",
        title: "Asserções e programação defensiva em Java",
        subtitle: "Prática · Instrução assert e validação fail-fast",
        theory: "A instrução assert condicao : \"mensagem\" verifica pré e pós-condições durante o desenvolvimento. Combinada à programação defensiva, ela aplica o princípio fail-fast: falhar imediatamente ao menor sinal de estado corrompido, impedindo que dados inconsistentes se propaguem pelo sistema.",
        questions: [
          q("Como funciona a instrução assert em Java quando habilitada com a flag -ea?", "Avalia a condição booleana e lança AssertionError se o resultado for false", ["Imprime a mensagem no terminal e continua a execução","Desliga a máquina virtual Java silenciosamente"], "assert valida suposições internas do código e interrompe a execução caso violadas."),
          q("Por que assert não deve ser usado para validar entradas de formulários de usuários em produção?", "Porque asserções podem ser desabilitadas em produção com a flag padrão da JVM", ["Porque assert só aceita números inteiros","Porque formulários não aceitam booleanos"], "Validação de usuário exige verificações com if e exceções explícitas (ex: IllegalArgumentException)."),
          q("Qual é a finalidade do princípio de design \"fail-fast\" na engenharia de software?", "Interromper a operação imediatamente assim que uma anomalia for detectada", ["Fazer o programa rodar mais rápido pulando etapas","Ocultar erros dos usuários finais"], "Falhar rápido simplifica o diagnóstico e evita corrupção cumulativa de dados."),
          q("O que deve constar após os dois pontos na instrução assert de Java?", "Uma mensagem descritiva que explique o motivo e o contexto da violação", ["O nome da classe de teste","Um comando return obrigatório"], "assert cond : \"mensagem\" enriquece o relatório de erro facilitando a depuração."),
          t("Quantos erros assert true : \"falha\" emite durante a execução com asserções ativas?", ["0"], "Como a condição avaliada é true, nenhuma asserção é violada.", "assert true : \"Não será disparado\";"),
          g("Complete a asserção que garante que o saldo nunca seja negativo:", ["assert saldo >= 0 : \"Saldo negativo detectado\";"], "Garante a invariante de conta não negativa.", "____ // verificação defensiva de saldo"),
          o("Ordene a estrutura defensiva de um método com validação e asserções:", ["Validar parâmetros de entrada com if e lançar IllegalArgumentException se inválidos","Executar o processamento central do algoritmo atualizando variáveis de estado","Verificar asserções internas comprovando que invariantes foram mantidas","Retornar o resultado garantido e auditado para o chamador"], "Arquitetura de método resiliente: validação de entrada, núcleo e asserção de saída."),
          p("Associe mecanismo defensivo à sua utilização correta:", [["IllegalArgumentException","Validação mandatória de parâmetros recebidos do exterior"],["assert cond : msg;","Verificação de invariantes internas em desenvolvimento"],["Flag -ea da JVM","Habilita a verificação ativa de asserções em tempo de execução"],["fail-fast","Princípio de interrupção imediata perante inconsistências"]], "Estratégias de confiabilidade e blindagem de código em Java.")
        ]
      },
      {
        id: "jv-alg-8-5-projeto-sistema-validado",
        title: "Projeto: algoritmo com suíte de validação completa",
        subtitle: "Consolidação · Entrega documentada e testada de ponta a ponta",
        theory: "No projeto integrador do capítulo, construímos um algoritmo de controle de limites de crédito bancário com conformidade rigorosa. Criamos o fluxograma, especificamos classes de equivalência, mapeamos casos de borda e implementamos uma suíte de testes com 100% de cobertura de ramos comprovada.",
        questions: [
          q("Quais são as etapas indispensáveis para entregar um algoritmo validado profissionalmente?", "Especificação formal, fluxograma claro, classes de equivalência, testes de borda e asserções", ["Digitar código rapidamente e testar manualmente na tela uma vez","Criar diagramas sem implementar testes"], "A excelência técnica exige a cadeia completa de modelagem, codificação e verificação."),
          q("Como a documentação do fluxograma e dos casos de teste protege o projeto a longo prazo?", "Facilita a manutenção por outros desenvolvedores e serve de especificação viva das regras", ["Impede que o código seja modificado no futuro","Aumenta o valor cobrado por linha de código"], "Diagramas e testes reduzem o tempo de onboarding e o risco de quebra em manutenções."),
          q("Se um cliente solicita limite exatamente igual ao seu teto máximo permitido, o teste de borda deve:", "Verificar se o algoritmo aprova o limite exato sem arredondamentos indevidos", ["Negar o pedido automaticamente","Exigir um novo cadastro"], "O caso de borda superior confirma a inclusão correta do limite permitido."),
          q("Por que projetar os casos de teste antes ou durante o algoritmo melhora a qualidade do código?", "Força o desenvolvedor a considerar cenários extremos e ambiguidades antes de se apegar ao código", ["Porque reduz o tempo de compilação da JVM","Porque elimina o uso de tipos primitivos"], "Pensar em como testar molda um design de código mais limpo, modular e desacoplado."),
          t("Quantos testes compõem uma suíte robusta com 4 classes de equivalência e 2 bordas?", ["6"], "4 casos representativos de equivalência + 2 testes de borda = 6 casos fundamentais.", "// 4 testes de classes + 2 testes de borda = 6 testes"),
          g("Complete a homologação que confirma o sucesso da validação do projeto em Java:", ["assert aprovado : \"Homologação de crédito falhou\";"], "Asserções validam a conclusão do caso de teste no projeto.", "____ // teste homologado com sucesso"),
          o("Ordene o fluxo completo de entrega do projeto de algoritmo validado:", ["Definir a especificação e matriz de requisitos do negócio","Desenhar o fluxograma estruturando nós de entrada, decisão e término","Planejar os casos de teste cobrindo equivalência, bordas e ramos","Implementar o código em Java e homologar com 100% de asserções aprovadas"], "Ciclo de vida completo de desenvolvimento de algoritmos de alta confiabilidade."),
          p("Associe artefato do projeto à sua finalidade de engenharia:", [["Especificação de regras","Define os limites e comportamentos exigidos pelo negócio"],["Fluxograma estruturado","Modela visualmente a topologia de controle e decisões"],["Matriz de testes","Documenta entradas, saídas esperadas e coberturas"],["Código Java homologado","Implementação estrita acompanhada de validações ativas"]], "Entregáveis fundamentais de engenharia de software com foco em qualidade.")
        ]
      }
    ]
  });
})();
