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
  window.LINCODE_CHAPTER_UNITS.cpp = window.LINCODE_CHAPTER_UNITS.cpp || {};
  window.LINCODE_CHAPTER_UNITS.cpp['cpp-c02'] = Object.assign(window.LINCODE_CHAPTER_UNITS.cpp['cpp-c02'] || {}, {
    5: [
      {
        id: "cpp-alg-5-1-if-else-cpp",
        title: "Desvios condicionais com if e else em C++",
        subtitle: "Apresentação · Decisões e tipos booleanos",
        theory: "Em C++, o losango de decisão é expresso pela instrução if...else. A condição é avaliada como booleana (bool): valores diferentes de zero convertem-se para true e zero converte-se para false. O fluxo de controle bifurca de forma determinística entre o ramo Sim e o ramo Não.",
        questions: [
          q("Qual instrução em C++ implementa a bifurcação de decisão do fluxograma?", "if ... else", ["for ... while","try ... catch"], "A instrução if...else avalia o predicado lógico e direciona o fluxo pelo ramo adequado."),
          q("Como o C++ avalia valores inteiros usados diretamente dentro de um if (valor)?", "Zero é avaliado como false; qualquer valor diferente de zero é avaliado como true", ["Gera erro fatal de compilação","Qualquer número positivo é sempre false"], "C++ herda as regras clássicas de conversão booleana onde zero representa falsidade."),
          q("Qual é a boa prática recomendada para evitar a atribuição acidental if (x = 5)?", "Utilizar o operador relacional de igualdade == ou posicionar a constante à esquerda: if (5 == x)", ["Nunca usar a letra x","Usar apenas números ímpares"], "O operador = atribui valor e retorna true (5 != 0); == compara sem modificar a variável."),
          q("O que acontece se omitirmos as chaves {} em um bloco if com múltiplas instruções em C++?", "Apenas a primeiríssima instrução abaixo do if fará parte do desvio condicional", ["Todas as instruções pertencerão ao if","O arquivo é deletado"], "Sem delimitadores de bloco {}, apenas uma declaração simples é governada pelo if."),
          t("Se n for 7, qual texto é impresso por: if (n % 2 == 0) std::cout << \"Par\"; else std::cout << \"Impar\";?", ["Impar"], "7 % 2 resulta em 1 (diferente de zero), logo o else imprime Impar.", "int n = 7;\nif (n % 2 == 0) std::cout << \"Par\";\nelse std::cout << \"Impar\";"),
          g("Complete o desvio condicional para verificar se o estoque é positivo:", ["if (estoque > 0)"], "A estrutura if avalia a expressão relacional entre parênteses.", "____ {\n    std::cout << \"Disponível\";\n}"),
          o("Ordene a sequência de avaliação de uma decisão if-else em C++:", ["Avaliar a expressão condicional contida entre parênteses","Se o valor for true (não zero), executar as instruções do bloco if","Se o valor for false (zero), executar as instruções do bloco else","Prosseguir com o fluxo de controle sequencial após o bloco condicional"], "Avaliação de predicado, desvio bifurcado e convergência de controle."),
          p("Associe elemento condicional em C++ ao seu comportamento:", [["if (cond)","Avalia o predicado e desvia para o ramo Sim"],["else","Executa ação alternativa caso a condição seja falsa"],["Operador ==","Compara igualdade entre dois operandos sem atribuir"],["Operador =","Atribui valor e devolve o resultado da atribuição"]], "Elementos fundamentais de decisões e bifurcações em C++.")
        ]
      },
      {
        id: "cpp-alg-5-2-operadores-logicos-curto-circuito",
        title: "Operadores lógicos e curto-circuito em C++",
        subtitle: "Prática · Conjunção (&&), disjunção (||) e negação (!)",
        theory: "Para combinar condições nos losangos, C++ disponibiliza && (E lógico), || (OU lógico) e ! (NÃO lógico). A linguagem garante avaliação em curto-circuito da esquerda para a direita: se o primeiro operando de && for falso, ou o de || for verdadeiro, o segundo termo não é executado.",
        questions: [
          q("Qual operador em C++ exige que ambos os predicados sejam verdadeiros?", "&& (operador E lógico)", ["|| (operador OU lógico)","! (operador de negação)"], "&& resulta em true unicamente se ambos os lados forem simultaneamente verdadeiros."),
          q("Como a avaliação em curto-circuito protege expressões como if (ptr != nullptr && ptr->val > 0)?", "Se ptr for nulo, a segunda parte não é avaliada, prevenindo falha de segmentação", ["O compilador substitui ponteiros nulos por zeros","A memória é realocada"], "Evitar a desreferência de ponteiros nulos é o caso clássico de proteção por curto-circuito."),
          q("Qual valor booleano o operador unário de negação ! produz para o valor 0 em C++?", "true (pois zero é false, e a negação inverte para true)", ["false","0"], "A negação inverte o valor de verdade: !0 é avaliado como true no contexto lógico."),
          q("Qual operador alternativo de texto para && e || é suportado pelo padrão de C++?", "As palavras-chave and e or (definidas na especificação da linguagem)", ["As palavras conj e disj","Os símbolos plus e minus"], "C++ suporta nativamente os operadores alternativos and, or e not como palavras-chave."),
          t("Qual resultado numérico de (1 && 0 || 1) em C++ (0 para false ou 1 para true)?", ["1"], "1 && 0 resulta em 0; 0 || 1 resulta em 1 (true).", "int res = (1 && 0 || 1);\nstd::cout << res;"),
          g("Complete o operador lógico que exige ambas as condições atendidas:", ["&&"], "&& conecta predicados em conjunção lógica estrita.", "if (usuarioValido ____ senhaCorreta) {\n    LiberarAcesso();\n}"),
          o("Ordene a avaliação em curto-circuito de (false && FuncaoPesada()):", ["Avaliar o operando esquerdo da expressão (false)","Constatar que o operador é a conjunção lógica &&","Pular imediatamente a execução da função FuncaoPesada()","Retornar false como resultado da expressão inteira"], "Curto-circuito poupa chamadas de funções e previne efeitos colaterais."),
          p("Associe operador lógico ao seu papel no fluxograma:", [["&& (and)","Exige que ambas as condições sejam verdadeiras"],["|| (or)","Avança pelo Sim se ao menos uma condição for verdadeira"],["! (not)","Inverte o veredito booleano da decisão"],["Curto-circuito","Garante avaliação segura da esquerda para a direita"]], "Álgebra de Boole e operadores lógicos aplicados a C++.")
        ]
      },
      {
        id: "cpp-alg-5-3-decisoes-aninhadas-e-else-if",
        title: "Decisões encadeadas e aninhadas em C++",
        subtitle: "Aprofundamento · Cadeia if - else if - else",
        theory: "Quando múltiplos critérios mutuamente exclusivos governam o algoritmo, encadeamos condições com if - else if - else. Apenas o bloco associado à primeira condição verdadeira é executado. O else final serve como garantia de tratamento para todos os casos não contemplados anteriormente.",
        questions: [
          q("Em uma cadeia if - else if - else, quantas ramificações podem ser executadas?", "No máximo uma única ramificação correspondente ao primeiro predicado satisfeito", ["Todas as que forem verdadeiras","Nenhuma se o else for omitido"], "O fluxo é de exclusão mútua: o primeiro caso verdadeiro encerra a avaliação da cadeia."),
          q("Ao classificar notas de alunos em faixas numéricas, qual é a ordem lógica recomendada?", "Testar os limites em ordem estritamente decrescente (ou crescente com operadores invertidos)", ["Em ordem aleatória de chegada","Apenas testando a média central"], "Testar limites baixos primeiro absorveria incorretamente notas altas no ramo errado."),
          q("Qual é o papel da cláusula final else em uma cadeia condicional em C++?", "Atuar como tratamento padrão (fallback) para valores fora das faixas mapeadas", ["Reiniciar a compilação","Apagar as variáveis"], "O else garante que nenhuma entrada válida ou anômala fique sem desfecho definido."),
          q("Como representar graficamente decisões encadeadas no fluxograma?", "Uma série de losangos conectados pelo ramo Não da decisão anterior", ["Um único retângulo com vários losangos dentro","Um círculo com linhas cruzadas"], "Cada recusa (ramo Não) desvia para o próximo teste lógico subsequente."),
          t("Para velocidade 110 em: >=120 \"Grave\", >=100 \"Media\", else \"Normal\", qual saída?", ["Media"], "110 não é >= 120, mas atende >= 100, classificando-se como Media.", "// vel = 110 -> enquadra-se em >= 100"),
          g("Complete a instrução intermediária de classificação encadeada em C++:", ["else if"], "else if insere novo teste após a falha do anterior.", "if (x > 100) {\n    // ...\n} ____ (x > 50) {\n    // ...\n}"),
          o("Ordene a análise de uma árvore de decisão de frete por distância:", ["Testar se distancia > 500 km para cálculo de tarifa interestadual","Senão, testar se distancia > 100 km para tarifa regional","Senão, aplicar tarifa mínima para entregas locais metropolitanas","Finalizar calculando o valor final e convergindo para o término"], "Hierarquia de classificação excludente com saída garantida."),
          p("Associe estrutura de decisão ao seu padrão de fluxo:", [["if simples","Ação opcional executada pontualmente sob condição"],["if / else","Bifurcação binária clássica entre duas ações"],["if / else if","Categorização entre múltiplos intervalos contíguos"],["else final","Caminho padrão para situações não contempladas"]], "Topologias condicionais para modelagem algorítmica em C++.")
        ]
      },
      {
        id: "cpp-alg-5-4-switch-e-operador-ternario",
        title: "Operador ternário e seleção com switch em C++",
        subtitle: "Prática · Expressões compactas e nós de seleção múltipla",
        theory: "C++ disponibiliza o operador ternário (cond ? v1 : v2) para expressões de atribuição condicional, além da instrução switch para chaveamento entre valores inteiros ou caracteres constantes. O switch mapeia nós seletores com múltiplos caminhos no fluxograma com alta legibilidade.",
        questions: [
          q("Como funciona a sintaxe do operador ternário em C++?", "condicao ? valorSeVerdadeiro : valorSeFalso", ["condicao : v1 ? v2","if (condicao) ? v1 : v2"], "O operador ternário é uma expressão que retorna um dos dois operandos conforme o teste."),
          q("Quais tipos de dados podem ser utilizados na expressão de controle do switch em C++?", "Tipos inteiros (int, char, short, long) e enumerações (enum/enum class)", ["Tipos de ponto flutuante como float e double","Qualquer classe ou vetor"], "switch opera sobre valores discretos integrais e não aceita números decimais flutuantes."),
          q("O que acontece se a instrução break for omitida ao final de um case no switch clássico?", "Ocorre fall-through: a execução continua caindo nos cases subsequentes", ["O compilador gera erro fatal","O programa desliga a máquina"], "Sem break, a execução avança para os blocos inferiores mesmo sem coincidir o valor."),
          q("Qual atributo introduzido no C++17 documenta formalmente o fall-through intencional?", "[[fallthrough]];", ["[[continue]];","[[ignore_break]];"], "O atributo [[fallthrough]] silencia alertas do compilador sobre queda intencional entre cases."),
          t("Se cod for 2, qual valor resulta de: (cod == 2 ? 100 : 0) em C++?", ["100"], "Como cod é igual a 2, a expressão ternária devolve o primeiro valor (100).", "int cod = 2;\nint res = (cod == 2 ? 100 : 0);"),
          g("Complete o comando que interrompe a execução dentro de um bloco switch:", ["break;"], "break impede a queda para os próximos cases.", "case 1:\n    Executar();\n    ____"),
          o("Ordene a trajetória de controle de uma estrutura switch em C++:", ["Avaliar o valor da variável de controle fornecida ao switch","Comparar com os rótulos de cada case declarado na estrutura","Coincidindo com um case, executar o bloco correspondente até encontrar break","Se nenhum coincidir, direcionar a execução para a cláusula default"], "Avaliação, casamento de casos discretos e término estruturado."),
          p("Associe elemento do comando switch à sua finalidade:", [["switch(expr)","Avalia o valor integral para seleção de ramos"],["case constante:","Define o rótulo de comparação para correspondência"],["break;","Cancela a execução contínua saltando para fora do bloco"],["default:","Tratamento padrão caso nenhum case coincida"]], "Elementos fundamentais de seleção múltipla com switch em C++.")
        ]
      },
      {
        id: "cpp-alg-5-5-projeto-classificador-sensores",
        title: "Projeto: sistema de alerta e triagem de telemetria",
        subtitle: "Consolidação · Construindo motor de decisão em C++",
        theory: "Neste projeto prático, integramos operadores relacionais, lógica composta e decisões encadeadas para classificar leituras de telemetria industrial. O algoritmo recebe temperatura e pressão, detecta anomalias de sensores com pré-condições e emite alertas com níveis de severidade auditáveis.",
        questions: [
          q("Qual é a recomendação primária para projetar sistemas de segurança em fluxogramas?", "Garantir que todas as combinações de falha conduzam a estados seguros (fail-safe)", ["Ocultar alarmes para não assustar o operador","Usar apenas números inteiros"], "Sistemas críticos exigem que qualquer anomalia direcione o controle para um estado estável e protegido."),
          q("Se temperatura > 100 E pressao > 10, para qual estado o motor de alerta deve convergir?", "Alerta Crítico com acionamento de válvulas de alívio e bloqueio imediato", ["Operação normal em modo econômico","Ignorar por 10 minutos"], "A combinação de alta temperatura e alta pressão representa risco iminente de explosão."),
          q("Como prevenir leituras de sensores corrompidas (ex: valores negativos impossíveis na escala Kelvin)?", "Inserir uma cláusula de guarda inicial que marca o sensor como defeituoso", ["Multiplicar a leitura por menos um","Somar cem graus aleatoriamente"], "Filtrar dados fisicamente impossíveis evita decisões baseadas em telemetria corrompida."),
          q("Qual estrutura em C++ expressa com eficiência a escala de níveis de alerta (1 a 4)?", "Um encadeamento if-else-if ou enum class mapeando severidades", ["Um laço infinito","Um array de caracteres soltos"], "Tipos enumerados e cadeias condicionais categorizam níveis de alarme com segurança de tipos."),
          t("Se o sistema atinge o nível máximo de emergência (nível 4), qual número registrar?", ["4"], "O código numérico 4 representa o alerta máximo do protocolo.", "// nível = 4 -> emergência máxima"),
          g("Complete a condição composta para disparo de alarme crítico em C++:", ["temp > 100 && pressao > 10"], "Ambos os parâmetros são requeridos para a emergência.", "bool critico = (____);"),
          o("Ordene as etapas do motor de telemetria de segurança:", ["Capturar leituras dos sensores de temperatura e pressão","Validar pré-condições físicas descartando sensores em pane","Avaliar regras lógicas compostas para classificar risco","Emitir nível de severidade e registrar log operacional"], "Do recebimento dos dados à classificação segura de risco."),
          p("Associe cenário de telemetria ao nível de severidade:", [["Temperatura e pressão nominais","Nível 1 (Operação Normal)"],["Apenas temperatura elevada","Nível 2 (Aviso Preventivo)"],["Temperatura e pressão elevadas","Nível 4 (Emergência Crítica)"],["Sensor com leitura desconectada","Nível 0 (Falha de Comunicação)"]], "Matriz de contingência de telemetria industrial.")
        ]
      }
    ],
    6: [
      {
        id: "cpp-alg-6-1-laco-while-cpp",
        title: "O laço while e repetições pré-testadas em C++",
        subtitle: "Apresentação · Ciclos de controle baseados em predicados",
        theory: "O laço while em C++ avalia sua condição booleana antes de cada repetição. Se o predicado for verdadeiro, o corpo de instruções é executado e o fluxo retorna para nova avaliação. Se for falso no início, as instruções não executam nenhuma vez, exatamente como no losango pré-testado do fluxograma.",
        questions: [
          q("Em que instante a condição lógica do while é avaliada em C++?", "Antes de cada repetição do corpo do laço (pré-teste)", ["Apenas ao término da última volta","Durante o processo de linkedição"], "A avaliação prévia impede a entrada no bloco caso a condição de partida já seja falsa."),
          q("O que acontece se a condição booleana de um while nunca atingir o estado false?", "Ocorre um loop infinito, ocupando o núcleo do processador indefinidamente", ["O sistema operacional encerra a aplicação com sucesso","O compilador reescreve o código"], "Laços sem condição de parada válida provocam travamentos e consumo desnecessário de CPU."),
          q("O que é indispensável dentro do corpo de um while para assegurar sua finalização?", "Modificar variáveis de controle para que a condição de parada seja eventualmente alcançada", ["Inserir comandos de impressão no console","Declarar novas variáveis locais"], "A mutação progressiva do estado de controle é o que garante a convergência do algoritmo."),
          q("Como representar graficamente um laço while em um fluxograma?", "Um losango de decisão com o ramo Sim entrando no bloco e uma linha de retorno ao losango", ["Um retângulo com uma seta para fora","Um círculo duplo com traços"], "A linha de retroalimentação fecha o circuito visual de repetição contínua."),
          t("Quantas voltas o laço executa: int i = 0; while (i < 3) { i++; }?", ["3"], "O laço executa para i = 0, 1 e 2, parando quando i atinge 3.", "int i = 0;\nwhile (i < 3) {\n    i++;\n}"),
          g("Complete o comando de laço pré-testado em C++:", ["while (ativo)"], "while repete enquanto a condição booleana permanecer true.", "____ {\n    ExecutarPasso();\n}"),
          o("Ordene o ciclo de vida operacional de um laço while em C++:", ["Avaliar a condição lógica contida entre parênteses","Se verdadeira, executar os comandos contidos no corpo do laço","Retornar pela seta de ciclo para nova avaliação do teste","Se falsa, desviar pela saída do laço e continuar o programa"], "Sequência operacional canônica de repetições pré-testadas."),
          p("Associe termo de laço ao seu significado:", [["while (cond)","Laço com verificação prévia antes de cada iteração"],["Condição de término","Expressão que sinaliza o fim das repetições"],["Loop infinito","Falha onde o laço nunca atinge a parada"],["Passo de avanço","Instrução que aproxima a variável do critério de encerramento"]], "Componentes essenciais de repetições pré-testadas em C++.")
        ]
      },
      {
        id: "cpp-alg-6-2-laco-do-while-cpp",
        title: "O laço do-while e execução pós-testada",
        subtitle: "Prática · Garantia de execução de pelo menos uma vez",
        theory: "O laço do-while em C++ executa o bloco de instruções primeiro e avalia a condição de repetição no final. Essa garantia de execução de pelo menos uma vez é ideal para rotinas de leitura de entrada, validação de dados solicitados ao usuário e menus interativos de terminal.",
        questions: [
          q("Qual é a diferença fundamental entre o laço while e o do-while em C++?", "O do-while garante que o bloco execute ao menos uma vez antes do teste", ["O do-while consome zero bytes de memória","O while só funciona com números negativos"], "Por avaliar a condição após a execução (pós-teste), a primeira passagem é incondicional."),
          q("Qual pontuação é mandatória ao final da linha do while no do-while em C++?", "Ponto e vírgula (;): do { ... } while (condicao);", ["Dois pontos (:)","Uma chave de fechamento extra"], "A sintaxe da linguagem C++ exige ponto e vírgula para delimitar o término da estrutura."),
          q("Em qual contexto o laço do-while expressa a intenção de forma mais elegante?", "Solicitar um dado de teclado e repetir a pergunta se a entrada for inválida", ["Declarar variáveis globais","Incluir bibliotecas de cabeçalho"], "A leitura do dado precisa ocorrer antes de avaliar se a entrada fornecida é aceitável."),
          q("Como representar graficamente o do-while no fluxograma?", "O fluxo entra direto no bloco de processamento e depois desce para o losango de teste", ["O losango fica antes de qualquer bloco","Usa-se um triângulo invertido"], "O bloco de ação precede a avaliação condicional no trajeto das setas."),
          t("Qual é o valor final de n após: int n = 0; do { n += 10; } while (false);?", ["10"], "O corpo executa uma vez adicionando 10; a condição false encerra o laço.", "int n = 0;\ndo {\n    n += 10;\n} while (false);"),
          g("Complete o encerramento da instrução do-while em C++:", ["while (opcao != 0);"], "do-while finaliza com a condição e o ponto e vírgula.", "do {\n    ExibirMenu();\n} ____"),
          o("Ordene as etapas da repetição pós-testada do-while:", ["Executar o corpo de instruções incondicionalmente na primeira volta","Avaliar a condição booleana no término da volta","Se true, retornar ao início do bloco do para nova iteração","Se false, prosseguir imediatamente para a próxima instrução"], "Operação sequencial de repetições com pós-teste."),
          p("Associe tipo de ciclo à sua característica de primeira execução:", [["while pré-testado","Pode não executar nenhuma vez se iniciar com false"],["do-while pós-testado","Executa compulsoriamente ao menos uma primeira volta"],["Menu de terminal","Caso de uso ideal para laço do-while"],["Ponto e vírgula final","Elemento sintático obrigatório após while no do-while"]], "Comparativo de controle de fluxo entre while e do-while em C++.")
        ]
      },
      {
        id: "cpp-alg-6-3-laco-for-canonico",
        title: "O laço for canônico com contador em C++",
        subtitle: "Prática · Iteração com inicializador, condição e passo",
        theory: "O laço for reúne a inicialização da variável contadora, a condição lógica de parada e o passo de incremento em uma única linha compacta: for (int i = 0; i < n; ++i). Essa estrutura compacta delimita o escopo de variáveis e reduz o risco de esquecimentos de incremento.",
        questions: [
          q("Quais são as três seções separadas por ponto e vírgula no cabeçalho do laço for?", "Inicialização, condição lógica de continuidade e expressão de incremento", ["Entrada, processamento e saída","Declaração, pausa e encerramento"], "for (inicializacao; condicao; incremento) unifica os componentes do ciclo iterativo."),
          q("Por que declarar a variável de controle no for: for (int i = 0; ...) é uma boa prática?", "Porque restringe o escopo de i estritamente ao laço, prevenindo vazamento de variáveis", ["Porque torna o código compatível com C arcaico","Porque acelera a compilação em 90%"], "Variáveis com escopo limitado reduzem a superfície de erros por reutilização indevida de nomes."),
          q("Por que programadores C++ tradicionalmente preferem o pré-incremento (++i) em vez de (i++)?", "Em tipos complexos (iteradores), ++i evita a criação de cópias temporárias desnecessárias", ["++i soma dois em vez de um","i++ não compila em versões modernas de C++"], "O pré-incremento incrementa o objeto in-place sem alocar um valor anterior temporário."),
          q("Quantas iterações ocorrem no laço for (int i = 0; i < 4; ++i)?", "Exatamente 4 iterações (para i = 0, 1, 2 e 3)", ["5 iterações","3 iterações"], "O intervalo de 0 a menor estrito que 4 gera exatamente 4 repetições."),
          t("Qual resultado numérico é impresso por: int s = 0; for(int i=1; i<=3; ++i) s += i;?", ["6"], "1 + 2 + 3 = 6.", "int s = 0;\nfor (int i = 1; i <= 3; ++i) s += i;\nstd::cout << s;"),
          g("Complete o cabeçalho do laço com pré-incremento em C++:", ["for (int i = 0; i < 5; ++i)"], "Formato canônico de repetição com contador em C++.", "____ {\n    Processar(i);\n}"),
          o("Ordene a cronologia de eventos na execução de um laço for em C++:", ["Executar a instrução de inicialização do contador (int i = 0)","Avaliar a condição lógica; se true, entrar no corpo","Executar os comandos contidos no bloco do laço","Executar a expressão de incremento (++i) e reavaliar a condição"], "Ciclo de vida interno da instrução for em C++."),
          p("Associe seção do cabeçalho for à sua responsabilidade:", [["int i = 0","Inicializa o contador na primeira vez"],["i < n","Testa continuidade antes de cada repetição"],["++i","Avança o contador após o término do bloco"],["Escopo de bloco","Impede vazamento da variável contadora"]], "Divisão de responsabilidades no cabeçalho do laço for em C++.")
        ]
      },
      {
        id: "cpp-alg-6-4-acumuladores-e-contadores-cpp",
        title: "Contadores, acumuladores e sentinelas em C++",
        subtitle: "Prática · Agregando grandezas e detectando marcos",
        theory: "Contadores registram ocorrências ou passos (cont++), acumuladores consolidam somas dinâmicas (total += valor) e sentinelas sinalizam eventos de parada (ex: flagAchou = true). No fluxograma, cada uma dessas variáveis possui seu retângulo de inicialização antes do início dos laços.",
        questions: [
          q("Qual é a diferença funcional entre um contador e um acumulador em algoritmos?", "Contadores somam quantidades fixas (passos); acumuladores somam grandezas variáveis", ["Acumuladores só funcionam com datas","Contadores não podem ser decrementados"], "O contador marca repetições ou ocorrências; o acumulador totaliza grandezas monetárias ou métricas."),
          q("Com qual valor um acumulador de somas deve ser inicializado antes do laço em C++?", "0 (zero), o elemento neutro da adição", ["1 (um)","-1"], "Zero garante que a soma reflita fielmente os valores agregados ao longo do percurso."),
          q("O que acontece se uma variável local primitiva for lida sem inicialização em C++?", "Provoca comportamento indefinido (UB), lendo dados residuais (lixo de memória)", ["O C++ inicializa com zero automaticamente","O programa não compila"], "Variáveis primitivas locais automáticas não são zeradas por padrão em C++."),
          q("Qual operador composto em C++ acumula o valor de forma concisa?", "+=", ["-=","*="], "total += valor é equivalente a total = total + valor."),
          t("Quantos números pares existem no intervalo de 1 a 6 (inclusive)?", ["3"], "Os números pares são 2, 4 e 6, totalizando 3 ocorrências.", "int cont = 0;\nfor (int i = 1; i <= 6; ++i) if (i % 2 == 0) cont++;"),
          g("Complete o operador para acumular o peso no total da carga:", ["total += peso;"], "+= adiciona o peso ao total acumulado existente.", "____ // acumula peso do item"),
          o("Ordene as etapas de uma rotina de contagem com acumulador de média em C++:", ["Declarar e inicializar double soma = 0.0 e int cont = 0 antes do laço","Percorrer a coleção acumulando soma += item e ++cont","Após o laço, verificar se cont > 0 para evitar divisão por zero","Calcular media = soma / cont e entregar o resultado"], "Sequência robusta de agregação estatística com proteção."),
          p("Associe papel da variável à sua atribuição inicial:", [["Contador de voltas","int cont = 0;"],["Acumulador de soma","double soma = 0.0;"],["Acumulador de produto","long long produto = 1LL;"],["Flag sentinela","bool achou = false;"]], "Padrões de inicialização de variáveis de estado em C++.")
        ]
      },
      {
        id: "cpp-alg-6-5-projeto-busca-e-corte-com-break",
        title: "Projeto: busca com break e filtro com continue",
        subtitle: "Consolidação · Construindo algoritmo de varredura eficiente",
        theory: "Neste projeto prático, combinamos laços, contadores, acumuladores e instruções break/continue em C++. O algoritmo processa um vetor de leituras, ignora valores espúrios com continue, acumula os dados confiáveis e interrompe a busca com break ao encontrar o marcador de fim de lote.",
        questions: [
          q("Qual é o efeito imediato da instrução break dentro de um laço em C++?", "Interrompe sumariamente a repetição e salta para a próxima instrução após o laço", ["Reinicia a contagem de iterações","Fecha a aplicação de terminal"], "break encerra prematuramente a estrutura de repetição ao atingir uma condição crítica."),
          q("Qual é o comportamento da instrução continue em um laço for em C++?", "Pula o restante da iteração corrente e passa para a expressão de incremento", ["Cancela todo o laço","Executa apenas a primeira linha do laço"], "continue descarta os passos finais da volta atual sem abandonar a repetição."),
          q("Em que situação o uso de break é considerado essencial para o desempenho?", "Ao localizar o registro desejado em uma busca, evitando iterações desnecessárias", ["Para formatar datas no console","Para declarar classes abstratas"], "Cessar a busca logo após atingir o objetivo economiza processamento e tempo."),
          q("Como representar graficamente a instrução continue em um fluxograma?", "Uma seta que sai de uma decisão e desvia diretamente para o ponto de incremento do laço", ["Um círculo preto fechado","Uma seta apontando para fora da página"], "A seta pula o corpo operacional e reingressa no passo de avanço do ciclo."),
          t("Se um laço de 1 a 10 usa break quando i == 5, qual último valor processado?", ["4"], "Na volta com 5 o break dispara antes de processar, logo o último foi 4.", "int ultimo = 0;\nfor (int i = 1; i <= 10; ++i) {\n    if (i == 5) break;\n    ultimo = i;\n}"),
          g("Complete o comando que pula leituras corrompidas no laço:", ["continue;"], "continue pula para a próxima iteração.", "if (leitura.Invalida()) {\n    ____\n}"),
          o("Ordene a rotina de auditoria de leituras com break e continue em C++:", ["Iniciar o laço percorrendo o vetor de amostras de telemetria","Se encontrar a sentinela de fim de transmissão, disparar break","Se o valor estiver fora da faixa física aceitável, pular com continue","Caso contrário, acumular a leitura na soma das amostras válidas"], "Lógica de auditoria combinando processamento, salto e corte."),
          p("Associe instrução de fluxo ao seu resultado operacional:", [["break;","Cancela e finaliza o laço imediatamente"],["continue;","Pula para a próxima iteração ignorando o resto do corpo"],["return;","Abandona a função inteira contendo o laço"],["loop infinito","Repetição que falha em alcançar condição de término"]], "Comandos de alteração e controle do fluxo de repetições em C++.")
        ]
      }
    ],
    7: [
      {
        id: "cpp-alg-7-1-teste-mesa-cpp",
        title: "O teste de mesa e rastreamento de memória em C++",
        subtitle: "Apresentação · Acompanhamento manual de variáveis",
        theory: "O teste de mesa é a disciplina de auditar algoritmos manualmente em papel ou tabela. Cada coluna representa uma variável, condição ou saída, e cada linha registra a mutação de estado após cada instrução. Essa simulação revela inconsistências lógicas e comportamentos indefinidos antes da compilação.",
        questions: [
          q("O que compõe uma tabela de teste de mesa na metodologia de algoritmos?", "Colunas para instruções, variáveis de estado e condições avaliadas linha a linha", ["Apenas o nome do programador","Uma lista de comentários em inglês"], "A tabela reflete a máquina de estados sequencial do processador e da memória."),
          q("Por que o teste de mesa manual previne comportamentos indefinidos (UB) em C++?", "Permite rastrear o ciclo de vida das variáveis e garantir que sejam inicializadas antes do uso", ["Porque substitui o uso do compilador C++","Porque reduz o uso de energia da tela"], "Identificar falhas de concepção no papel é muito mais rápido e econômico."),
          q("Ao registrar uma atribuição em uma variável primitiva na tabela, o que fazemos?", "Substituímos o valor antigo pelo novo dado na coluna correspondente", ["Criamos uma nova folha de papel","Multiplicamos o valor anterior por dez"], "Variáveis primitivas armazenam apenas o valor momentâneo atual na célula de memória."),
          q("Como registrar uma decisão condicional com losango na tabela de rastreamento?", "Anotar a expressão, o resultado booleano (true/false) e o ramo seguido", ["Deixar a célula em branco","Anotar apenas números pares"], "Registrar o veredito explica a razão do desvio tomado pelo fluxo de controle."),
          t("Se x=3 e executa x = x * 4 - 2, qual valor deve ser registrado para x na tabela?", ["10"], "3 * 4 = 12; 12 - 2 = 10.", "int x = 3;\nx = x * 4 - 2;\nstd::cout << x;"),
          g("Complete a instrução de saída de rastreamento de variáveis no console C++:", ["std::cout << \"a=\" << a << \" b=\" << b << std::endl;"], "Impressão simples para registrar o estado da variável no console.", "____ // log de depuração"),
          o("Ordene as etapas para realizar um teste de mesa em C++:", ["Listar todas as variáveis, laços e condições no cabeçalho da tabela","Preencher a linha inicial com os valores de entrada recebidos","Executar comando a comando atualizando o estado nas colunas","Registrar a saída final e conferir contra o gabarito esperado"], "Roteiro estruturado para auditoria analítica de código."),
          p("Associe termo do teste de mesa ao seu significado:", [["Cabeçalho","Identifica as variáveis e condições acompanhadas"],["Linha de estado","Captura os dados após a execução de uma instrução"],["Veredito booleano","Resultado que direciona o próximo ramo a ser seguido"],["Saída final","Resultado impresso ou retornado ao término da rotina"]], "Elementos estruturais do rastreamento por teste de mesa.")
        ]
      },
      {
        id: "cpp-alg-7-2-prevencao-out-of-bounds",
        title: "Prevenção de acessos fora de limites em C++",
        subtitle: "Prática · Auditoria de vetores e ponteiros",
        theory: "Arrays tradicionais em C++ não realizam checagem de limites por padrão: acessar além do tamanho provoca comportamento indefinido (UB) e falhas de segmentação. O rastreamento de limites inspeciona explicitamente o índice 0 e o índice size - 1, garantindo acessos rigorosamente seguros.",
        questions: [
          q("O que acontece se acessarmos um array além do tamanho alocado em C++ tradicional?", "Ocorre comportamento indefinido (Undefined Behavior), podendo corromper memória ou travar", ["O compilador gera erro de sintaxe","O C++ aloca mais memória automaticamente"], "Arrays clássicos em C++ não fazem checagem automática de limites em tempo de execução."),
          q("Se um vetor foi declarado como int v[5], qual é o último índice válido?", "4 (os índices válidos vão de 0 a 4)", ["5","3"], "Como a contagem inicia em zero, o índice máximo é tamanho - 1."),
          q("Qual método da classe std::vector do C++ realiza checagem de limites lançando std::out_of_range?", "v.at(indice)", ["v[indice]","v.get(indice)"], "O método at() verifica se o índice está dentro do intervalo e lança exceção em caso de desvio."),
          q("Qual condição errônea no cabeçalho for frequentemente provoca acessos ilegais?", "Escrever i <= tamanho em vez de i < tamanho", ["Escrever ++i","Declarar int i = 0"], "O operador <= tenta ler o índice igual ao tamanho, que já ultrapassa a fronteira alocada."),
          t("Quantos índices válidos possui um array com 7 elementos (de 0 até qual número)?", ["6"], "Os índices válidos vão de 0 a 6, totalizando 7 posições.", "// tamanho = 7 -> índices de 0 a 6"),
          g("Complete a condição estrita para evitar acessos fora do limite do array:", ["i < tamanho"], "O operador estrito < garante que o índice não ultrapasse o último elemento.", "for (int i = 0; ____; ++i) {\n    Processar(arr[i]);\n}"),
          o("Ordene a verificação de fronteiras em um vetor de tamanho N em C++:", ["Testar o primeiro elemento: i = 0 deve ser lido com sucesso","Testar o penúltimo elemento: i = N - 2 opera regularmente","Testar o último elemento válido: i = N - 1 consome o dado com êxito","Testar a terminação: quando i atinge N, o laço encerra sem tentar ler arr[N]"], "Análise das fronteiras de percursos indexados em coleções."),
          p("Associe forma de acesso a vetor em C++ à sua característica:", [["arr[0]","Primeiro elemento válido de qualquer array não vazio"],["arr[N - 1]","Último elemento válido contido no array"],["arr[N]","Acesso ilegal fora de limites provocando comportamento indefinido"],["vec.at(i)","Acesso seguro com checagem de limites e exceção"]], "Mapeamento de índices e limites de vetores em C++.")
        ]
      },
      {
        id: "cpp-alg-7-3-troca-variaveis-std-swap",
        title: "Troca de variáveis e std::swap em C++",
        subtitle: "Prática · Permutando memória com e sem std::swap",
        theory: "Para permutar duas variáveis em C++, podemos utilizar a variável auxiliar tradicional (temp) ou a função utilitária padrão std::swap(a, b). O teste de mesa comprova que atribuições diretas sem salvamento prévio destroem o dado da primeira variável por sobreposição acidental.",
        questions: [
          q("Por que a tentativa de troca a = b; b = a; corrompe os dados em memória?", "Porque a primeira instrução sobrescreve a com o valor de b, destruindo o dado original de a", ["Porque C++ proíbe atribuir variáveis do mesmo tipo","Porque b se torna zero"], "A atribuição destrói o dado antigo de a, impedindo que b o receba na linha seguinte."),
          q("Qual é a sequência clássica de três instruções para permutar a e b com temp em C++?", "int temp = a; a = b; b = temp;", ["a = b; b = temp; temp = a;","temp = b; a = temp; b = a;"], "Salva a em temp, transfere b para a e recupera temp para b."),
          q("Qual função da biblioteca padrão de C++ realiza a troca otimizada de duas variáveis?", "std::swap(a, b);", ["std::move(a, b);","std::exchange(a, b);"], "std::swap troca os conteúdos de forma eficiente utilizando semântica de movimento quando disponível."),
          q("Em qual cabeçalho da biblioteca padrão de C++ reside a função std::swap?", "<utility> (ou <algorithm>)", ["<iostream>","<cmath>"], "std::swap é utilitário fundamental localizado no cabeçalho <utility>."),
          t("Se a=8 e b=3, após std::swap(a, b); qual é o valor final de a?", ["3"], "A variável a recebe o valor que estava originalmente em b (3).", "#include <utility>\nint a = 8, b = 3;\nstd::swap(a, b);\nstd::cout << a;"),
          g("Complete a instrução de troca usando a biblioteca padrão em C++:", ["std::swap(a, b);"], "std::swap permuta duas variáveis de forma otimizada.", "int a = 1, b = 2;\n____ // permuta valores"),
          o("Ordene as operações de troca de variáveis com variável temporária:", ["Declarar temp e copiar o valor original de a: int temp = a;","Copiar o valor de b para dentro de a: a = b;","Copiar o valor salvo em temp para dentro de b: b = temp;","Concluir com as variáveis permutadas com sucesso"], "Operação elementar de permutação de dados na memória."),
          p("Associe técnica de troca ao seu benefício em C++:", [["int temp = a;","Lógica imperativa clássica sem dependências externas"],["std::swap(a, b)","Função padrão otimizada com semântica de movimento"],["a = b; b = a;","Falha que provoca perda irreversível do dado original"],["<utility>","Cabeçalho padrão que abriga a função std::swap"]], "Técnicas de permuta de dados na memória em C++.")
        ]
      },
      {
        id: "cpp-alg-7-4-invariantes-e-terminacao-cpp",
        title: "Invariantes de laço e garantias de término em C++",
        subtitle: "Avançado · Demonstração lógica de corretude",
        theory: "Um invariante de laço em C++ é uma asserção lógica que se conserva verdadeira antes, durante e após a execução do laço. Rastrear o invariante comprova matematicamente que cada iteração aproxima o algoritmo de seu término e que a saída gerada no encerramento é estritamente correta.",
        questions: [
          q("O que define um invariante de laço na ciência da computação?", "Uma propriedade lógica que permanece verdadeira em todas as iterações do ciclo iterativo", ["Uma variável cujo valor é congelado para sempre","Um erro que impede a compilação"], "O invariante formaliza o progresso correto e consistente do algoritmo a cada etapa."),
          q("Quais três propriedades devem ser demonstradas para validar um invariante de laço?", "Inicialização (base), Manutenção (indução) e Término (conclusão correta)", ["Declaração, compilação e execução","Entrada, pausa e encerramento"], "Idêntico à indução matemática: válido no início, preservado a cada volta e provado no término."),
          q("Qual é o invariante no algoritmo de cálculo de produto acumulado em laço?", "Em cada passo i, a variável produto contém a multiplicação dos itens de índice 0 até i - 1", ["O produto sempre é igual a zero","O produto duplica a cada volta"], "Garante que a variável produto representa a verdade matemática sobre o subconjunto percorrido."),
          q("O que garante que um laço for (int i = 0; i < n; ++i) atingirá o término se n >= 0?", "A expressão (n - i) é um variante estritamente decrescente limitado inferiormente por zero", ["O compilador encerra laços longos","O processador desliga"], "Um variante decrescente com limite inferior prova que o laço atinge o término em passos finitos."),
          t("Quantas voltas restam para finalizar um laço com i=5 e limite n=9?", ["4"], "9 - 5 = 4 voltas restantes.", "// voltas restantes = n - i"),
          g("Complete a macro de asserção que verifica o invariante de índice válido no laço:", ["assert(i >= 0 && i <= n);"], "assert valida invariantes durante a execução.", "____ // garantia de invariante de limites"),
          o("Ordene as etapas da demonstração de corretude com invariante de laço:", ["Inicialização: provar que a propriedade é verdadeira antes da primeira volta","Manutenção: provar que a propriedade se mantém verdadeira após cada volta","Demonstrar a terminação mostrando que o variante atinge a condição de parada","Término: utilizar o invariante final para provar a corretude do resultado"], "Metodologia indutiva para comprovação formal de algoritmos."),
          p("Associe estágio da prova ao seu significado formal:", [["Inicialização","Propriedade válida antes da primeira iteração"],["Manutenção","A propriedade se preserva intacta a cada nova volta"],["Variante de laço","Medida estritamente decrescente que garante a parada"],["Término","Comprovação de que o resultado final satisfaz a especificação"]], "Fundamentos da verificação de algoritmos iterativos.")
        ]
      },
      {
        id: "cpp-alg-7-5-projeto-depuracao-de-mesa",
        title: "Projeto: depuração guiada de algoritmo em C++",
        subtitle: "Consolidação · Encontrando e corrigindo bugs pelo rastreamento",
        theory: "Neste projeto prático, auditamos um algoritmo em C++ com uma discrepância oculta no cálculo de média ponderada. Utilizando a tabela de rastreamento com valores simulados, localizamos o erro de divisão inteira truncada, corrigimos a lógica para ponto flutuante e comprovamos os resultados.",
        questions: [
          q("Qual é o erro clássico que ocorre ao dividir dois inteiros em C++: int a = 5, b = 2; double r = a / b;?", "Divisão inteira truncada: a / b produz 2 (inteiro) antes de converter para double (2.0)", ["O programa gera erro de compilação","O C++ arredonda para 3.0"], "Operações entre inteiros em C++ produzem inteiros; ao menos um operando precisa ser float/double."),
          q("Como corrigir a divisão truncada para obter o resultado decimal preciso (2.5)?", "Usar static_cast<double>(a) / b para promover a operação a ponto flutuante", ["Multiplicar o resultado por dez","Trocar o nome da variável"], "static_cast promove a conversão explícita segura antes da realização da divisão."),
          q("Como a tabela de teste de mesa expõe a falha da divisão truncada?", "Ao registrar 2 em vez de 2.5 na coluna da variável de resultado esperado", ["O terminal desliga","A linha da tabela fica vazia"], "A auditoria analítica expõe a perda decimal na linha exata do cálculo."),
          q("O que deve ser realizado imediatamente após a correção do código em C++?", "Reexecutar o teste de mesa e toda a suíte de testes de regressão com sucesso", ["Publicar o executável sem validar","Apagar a documentação de testes"], "A revalidação comprova que o defeito foi eliminado sem gerar efeitos colaterais."),
          t("Qual resultado decimal deve ser registrado para a divisão de 5 por 2 com cast para double?", ["2.5"], "Com ponto flutuante, 5 / 2 produz exatamente 2.5.", "double r = static_cast<double>(5) / 2;\nstd::cout << r;"),
          g("Complete a conversão explícita para evitar divisão inteira truncada:", ["static_cast<double>(soma) / cont"], "static_cast promove o numerador para ponto flutuante.", "double media = ____;"),
          o("Ordene as etapas de diagnóstico e correção do algoritmo em C++:", ["Criar o caso de teste que reproduz a perda de precisão decimal","Montar a tabela de teste de mesa auditando instrução por instrução","Identificar a linha onde a divisão inteira truncou indevidamente o resultado","Aplicar static_cast<double> e homologar com nova rodada de testes"], "Ciclo metódico de auditoria, correção e validação de software."),
          p("Associe falha comum ao seu mecanismo de correção em C++:", [["Divisão inteira truncada","static_cast<double>(a) / b"],["Acesso fora de limite","Usar vec.at(i) ou i < size estrito"],["Variável não inicializada","Inicialização explícita int x = 0;"],["Sobrescrita precoce","Uso de variável temp ou std::swap"]], "Boas práticas profissionais no diagnóstico de software em C++.")
        ]
      }
    ],
    8: [
      {
        id: "cpp-alg-8-1-classes-equivalencia-cpp",
        title: "Casos de teste e classes de equivalência em C++",
        subtitle: "Apresentação · Particionamento inteligente de cenários",
        theory: "O particionamento em classes de equivalência divide o universo de entradas em conjuntos que recebem o mesmo tratamento pelo algoritmo. Selecionar um elemento representativo de cada classe (válida ou inválida) permite validar toda a lógica com poucos testes altamente eficientes.",
        questions: [
          q("O que é uma \"classe de equivalência\" no contexto de testes de software?", "Um subconjunto de entradas para o qual o algoritmo produz o mesmo comportamento esperado", ["Uma classe que herda de outra classe","Um arquivo com código duplicado"], "Testar um valor representativo de cada partição é suficiente para aferir o grupo todo."),
          q("Para uma função que aceita notas de 0 a 100, quais são as classes típicas?", "Notas negativas (inválidas), de 0 a 100 (válidas) e maiores que 100 (inválidas)", ["Apenas o número 50 testado vinte vezes","Todos os números reais"], "Mapear intervalos válidos e inválidos estabelece a base da cobertura funcional."),
          q("Por que é inviável testar todas as entradas numéricas possíveis de um método em C++?", "Porque o número de combinações de dados em memória tende ao infinito", ["Porque o compilador C++ impede testes múltiplos","Porque a tela queima ao rodar muitos testes"], "A amostragem inteligente por equivalência substitui a impossível exaustão total."),
          q("O que compõe a especificação completa de um caso de teste em C++?", "Entradas fornecidas, pré-condições do ambiente e o resultado esperado bem definido", ["Apenas o nome do autor do código","O horário do build"], "Sem o resultado esperado estipulado previamente, não há como aferir conformidade."),
          t("Quantos casos de teste representativos cobrem 4 classes de equivalência identificadas?", ["4"], "Um teste representativo por partição atende aos requisitos de cobertura.", "// 1 teste por classe = 4 testes"),
          g("Complete a macro de asserção que compara o resultado obtido com o gabarito esperado em C++:", ["assert(esperado == obtido);"], "assert valida a conformidade do cálculo no teste.", "____ // validação de teste"),
          o("Ordene as etapas do planejamento de testes por classes de equivalência:", ["Analisar os requisitos e especificações da regra de negócio","Particionar os dados de entrada em classes válidas e classes inválidas","Selecionar um valor representativo típico para cada classe mapeada","Executar os casos de teste registrando conformidade contra a saída esperada"], "Metodologia estruturada de projeto de testes de software."),
          p("Associe termo de teste ao seu propósito funcional:", [["Entrada de teste","Valores alimentados no algoritmo para teste"],["Saída esperada","Resultado correto previsto pela especificação"],["Classe válida","Entradas legítimas que o sistema deve processar"],["Classe inválida","Entradas anômalas que o sistema deve rejeitar"]], "Elementos constitutivos do projeto de testes por equivalência.")
        ]
      },
      {
        id: "cpp-alg-8-2-analise-valores-limite-cpp",
        title: "Análise de valores-limite e bordas em C++",
        subtitle: "Prática · Auditoria das transições críticas de regras",
        theory: "A análise de valores-limite (borda) foca nos extremos dos intervalos de entrada: o valor limite exato, o valor imediatamente anterior e o imediatamente posterior. É nessas fronteiras que os desenvolvedores cometem a maior parte dos erros relacionais (ex: confundir > com >=).",
        questions: [
          q("Por que a análise de valores-limite é a técnica mais produtiva na busca de bugs?", "Porque falhas de software concentram-se nas transições e fronteiras dos intervalos", ["Porque valores de borda exigem menos memória","Porque o compilador ignora o meio da faixa"], "Erros de off-by-one e limites inclusivos versus exclusivos manifestam-se nas bordas."),
          q("Se uma taxa é cobrada para valores estritamente maiores que 100 (valor > 100), quais valores testam a borda?", "Valores 99, 100 (fronteira exata sem taxa) e 101 (primeiro valor com taxa)", ["Valores 10, 500 e 1000","Apenas o valor zero"], "Testar a fronteira exata e seus vizinhos imediatos garante a correção do operador relacional."),
          q("Quais são as fronteiras numéricas extremas para o tipo int no cabeçalho <climits> em C++?", "INT_MIN e INT_MAX", ["Apenas -1 e 1","Zero e dez mil"], "Operações aritméticas nos limites de int podem sofrer overflow silencioso se não tratadas."),
          q("O que acontece ao estourar o limite de um signed int com overflow em C++?", "Provoca comportamento indefinido (Undefined Behavior) segundo o padrão ISO C++", ["O C++ lança uma exceção automaticamente","O número vira zero"], "Diferente de unsigned int (que faz wrap-around), overflow em signed int é UB."),
          t("Qual número inteiro testa a fronteira imediatamente anterior à condição x >= 50?", ["49"], "O número 49 é o predecessor inteiro direto de 50.", "// borda: 49, 50, 51"),
          g("Complete o teste de limite para prevenir acesso ilegal na última posição do vetor:", ["i < vec.size()"], "Menor estrito evita a leitura na fronteira de estouro.", "for (size_t i = 0; ____; ++i) {\n    Processar(vec[i]);\n}"),
          o("Ordene a seleção de valores de borda para testar a regra saldo >= 100:", ["Testar o valor imediatamente abaixo da borda: saldo = 99 (resultado: false)","Testar a fronteira exata do critério: saldo = 100 (resultado: true)","Testar o valor imediatamente acima da borda: saldo = 101 (resultado: true)","Homologar que o operador relacional é >= e não >"], "Auditoria de transição de regras por valores de fronteira."),
          p("Associe cenário de fronteira ao valor de teste correspondente:", [["Borda estrita (> 0)","Testar 0 (falso) e 1 (verdadeiro)"],["Borda inclusiva (>= 18)","Testar 17 (falso) e 18 (verdadeiro)"],["Limite de vetor","size() - 1 (último válido) e size() (exceção/UB)"],["Extremo de int em C++","INT_MAX e INT_MIN"]], "Mapeamento de valores de fronteira em testes algorítmicos em C++.")
        ]
      },
      {
        id: "cpp-alg-8-3-cobertura-ramos-cpp",
        title: "Cobertura de código e ramos em C++",
        subtitle: "Aprofundamento · Garantindo que cada bifurcação seja exercitada",
        theory: "No teste de caixa-branca, inspecionamos os caminhos de controle do algoritmo para assegurar que nenhuma ramificação fique esquecida. A cobertura de ramos exige que cada saída booleana (true e false) de cada losango de decisão do fluxograma seja percorrida por ao menos um caso de teste.",
        questions: [
          q("O que mede a métrica de cobertura de ramos (branch coverage) em C++?", "A porcentagem de saídas booleanas (true e false) de decisões exercitadas pelos testes", ["O número de linhas comentadas no arquivo .cpp","A quantidade de arquivos no projeto"], "Cobertura total de ramos assegura que nenhum desvio condicional ficou sem validação."),
          q("Quantos casos de teste no mínimo são requeridos para cobrir uma decisão if/else?", "Pelo menos dois casos: um que atenda à condição (true) e outro que a viole (false)", ["Apenas um caso com true","Quatro casos"], "Um caso testa o ramo Sim e o outro caso testa o ramo Não do losango."),
          q("Por que ter 100% de cobertura de linhas não é sinônimo de 100% de cobertura de ramos?", "Porque decisões sem bloco else executam a linha seguinte sem exercitar o ramo falso explicitamente", ["Porque o compilador desconsidera linhas de teste","Porque linhas de código não têm relação com testes"], "Ramos implícitos de escape podem ocultar falhas se não forem mapeados e testados."),
          q("O que a complexidade ciclomática indica ao desenvolvedor sobre a testabilidade?", "Indica a quantidade mínima de caminhos independentes que precisam de testes para cobertura total", ["Indica o tempo de compilação","Indica o número de métodos na classe"], "Quanto maior a complexidade ciclomática, mais testes são necessários para cobrir o fluxo."),
          t("Quantos caminhos resultam de duas estruturas if-else aninhadas independentes?", ["4"], "2 decisões * 2 ramos cada = 4 combinações de caminhos possíveis.", "// 2^2 = 4 caminhos no grafo de controle"),
          g("Complete o teste para cobrir o ramo falso da condição if (isValido):", ["isValido = false;"], "Testar com false exercita a ramificação alternativa da decisão.", "bool ____\nProcessar(isValido);"),
          o("Ordene os passos para atingir cobertura completa de ramos em C++:", ["Mapear todos os operadores relacionais, if, switch e laços do método","Listar os caminhos de Verdadeiro e Falso de cada estrutura condicional","Elaborar casos de teste cobrindo ambas as ramificações de cada nó","Executar a ferramenta de cobertura (como gcov) e auditar o relatório"], "Metodologia para alcance de alta cobertura de ramos em C++."),
          p("Associe tipo de cobertura ao seu objetivo:", [["Cobertura de linhas","Verifica se cada linha de código foi executada"],["Cobertura de ramos","Garante que todas as saídas de decisão foram visitadas"],["Complexidade ciclomática","Número mínimo de caminhos para cobertura total"],["Grafo de fluxo","Mapa de nós e arestas que representam o código"]], "Conceitos de auditoria estrutural e cobertura de código em C++.")
        ]
      },
      {
        id: "cpp-alg-8-4-assercoes-cassert",
        title: "Asserções com cassert e programação defensiva em C++",
        subtitle: "Prática · Macro assert e validação fail-fast",
        theory: "Programação defensiva estabelece que métodos devem blindar-se contra estados corrompidos aplicando o princípio fail-fast. Em C++, utilizamos a macro assert() do cabeçalho <cassert> para checagem de invariantes internas em desenvolvimento e exceções para entradas externas.",
        questions: [
          q("Qual é o comportamento da macro assert(condicao) do cabeçalho <cassert> em C++?", "Avalia a condição em builds com depuração e aborta a execução exibindo a falha se for false", ["Imprime mensagem no console e continua normalmente","Desliga a máquina"], "assert valida suposições internas do código e interrompe a execução caso violadas."),
          q("Qual macro de pré-processador desativa todas as macros assert() em builds de release em C++?", "#define NDEBUG", ["#define RELEASE","#define NO_ASSERT"], "Definir NDEBUG antes de <cassert> instrui o pré-processador a remover as asserções em produção."),
          q("Qual é o objetivo do princípio \"fail-fast\" na arquitetura de software?", "Interromper a operação imediatamente ao detectar anomalia, evitando corrupção silenciosa", ["Fazer o programa rodar mais rápido pulando verificações","Desligar a máquina automaticamente"], "Falhar rápido facilita o diagnóstico da causa raiz e previne danos cumulativos."),
          q("Qual classe de exceção da biblioteca padrão de C++ deve ser lançada para argumentos inválidos?", "std::invalid_argument (do cabeçalho <stdexcept>)", ["std::bad_alloc","std::ios_base::failure"], "std::invalid_argument documenta expressamente que um argumento recebido viola o contrato."),
          t("Quantos alertas assert(true) exibe na tela durante o teste?", ["0"], "Como a condição é verdadeira, nenhuma asserção é violada.", "#include <cassert>\nassert(true); // nenhum alerta"),
          g("Complete a inclusão do cabeçalho padrão de asserções em C++:", ["#include <cassert>"], "cassert disponibiliza a macro assert.", "____ // cabeçalho de asserções"),
          o("Ordene a estrutura defensiva de uma função em C++:", ["Validar parâmetros de entrada e lançar std::invalid_argument se inválidos","Executar o algoritmo central realizando transformações de estado","Validar invariantes internas através de assert(condicao)","Entregar o resultado final auditado e consistente para o chamador"], "Arquitetura fail-fast: blindagem de entrada, núcleo de cálculo e garantia de saída."),
          p("Associe mecanismo de defesa ao seu contexto apropriado:", [["std::invalid_argument","Validação mandatória de parâmetros recebidos do exterior"],["assert(condicao);","Verificação de invariantes internas em ambiente de depuração"],["#define NDEBUG","Desativa asserções em compilações otimizadas de produção"],["fail-fast","Princípio de interrupção imediata perante inconsistências"]], "Estratégias de confiabilidade e resiliência em código C++.")
        ]
      },
      {
        id: "cpp-alg-8-5-projeto-homologacao-completa",
        title: "Projeto: homologação final e entrega do algoritmo em C++",
        subtitle: "Consolidação · Suíte completa de testes executada com 100% de sucesso",
        theory: "A etapa conclusiva do projeto de algoritmo executa a suíte completa de validação contra a implementação C++. Todos os casos da matriz — cenários típicos, classes inválidas e valores de fronteira — são auditados com asserções automáticas, comprovando matematicamente a entrega do software.",
        questions: [
          q("O que significa a homologação de um algoritmo de software em C++?", "A comprovação formal e automatizada de que a implementação satisfaz 100% dos requisitos estipulados", ["Apenas rodar o código uma vez no terminal","Criar um instalador bonito"], "Homologar é certificar a conformidade técnica contra a especificação e a matriz de testes."),
          q("Qual é a atitude exigida perante a falha de um único caso na suíte de homologação?", "Investigar e corrigir a causa raiz antes de considerar o projeto concluído", ["Ignorar a falha se os outros 99% passarem","Desativar o caso de teste"], "A integridade da engenharia exige que nenhum defeito conhecido seja negligenciado na entrega."),
          q("Como a documentação do fluxograma aliada à suíte de testes valoriza o trabalho de engenharia?", "Demonstra profissionalismo, rigor técnico, rastreabilidade e facilidade de manutenção futura", ["Serve apenas para acumular pastas no repositório","Aumenta o consumo de papel"], "Projetos bem documentados e testados possuem custo de manutenção drasticamente inferior."),
          q("Qual é o próximo passo natural após a conclusão bem-sucedida do projeto de lógica e algoritmos?", "Avançar para o estudo de tipos primitivos, operadores aritméticos e memória em C++", ["Parar de estudar programação para sempre","Reescrever tudo em outra linguagem"], "A base sólida de lógica e fluxo prepara o terreno para dominar os recursos avançados da linguagem."),
          t("Quantos testes devem passar para certificar uma suíte de homologação de 8 casos?", ["8"], "Todos os 8 cenários devem ser aprovados com êxito para conferir a certificação.", "// 8 casos com 100% de aprovação"),
          g("Complete o veredito final que consolida a homologação bem-sucedida do projeto em C++:", ["assert(sucesso && \"Homologação do projeto concluída com 100% de aprovação\");"], "Asserção de encerramento atestando a qualidade da entrega.", "____ // homologação do algoritmo"),
          o("Ordene a jornada completa do projeto de algoritmo em C++:", ["Especificar os requisitos e regras de negócio com precisão","Desenhar o fluxograma completo com caminhos convergentes","Planejar a matriz de casos de teste com classes de equivalência e bordas","Codificar a solução em C++ e homologar a suíte com 100% de sucesso"], "Do problema abstrato à solução verificada com rigor de engenharia de software."),
          p("Associe artefato do projeto ao seu legado de qualidade:", [["Especificação","Garante que o problema correto foi atacado"],["Fluxograma","Fornece o mapa visual claro de todo o fluxo lógico"],["Matriz de testes","Evidencia a cobertura de cenários e fronteiras"],["Código homologado","Software confiável, testado e pronto para produção"]], "Entregáveis fundamentais de excelência em algoritmos com C++.")
        ]
      }
    ]
  });
})();
