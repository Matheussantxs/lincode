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
  const chId = "cpp-c04";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "cpp-c04-u1-l2",
        title: "Cadeias if, else if, else e hierarquia de regras",
        subtitle: "Controle de fluxo · Avaliação condicional sequencial em C++",
        theory: "As estruturas condicionais encadeadas if, else if e else avaliam uma sequência de expressões booleanas em C++. Apenas o primeiro bloco cuja condição avaliar para true é executado, ignorando as ramificações subsequentes. Caso nenhuma condição seja satisfeita, o bloco else final fornece a rota de contingência.",
        questions: [
          q("Como o compilador C++ avalia uma cadeia if ... else if ... else?", "Testa as condições em ordem sequencial e executa apenas a primeira verdadeira, ignorando as demais", ["Executa todas as ramificações simultaneamente","Executa sempre o bloco else primeiro"], "Assim que uma condição verdadeira é encontrada, o fluxo desvia para fora de toda a estrutura condicional."),
          q("O que acontece se todas as condições de if e else if forem falsas e não existir bloco else?", "O programa prossegue normalmente para a próxima instrução seguinte sem executar nenhum bloco da cadeia", ["O compilador gera erro fatal","A aplicação encerra com código de falha"], "O bloco else é opcional; sua omissão significa que nenhuma ação de contingência foi exigida."),
          q("Por que a ordem das condições em uma cadeia if/else if é crucial para a correção do código?", "Condições mais específicas devem anteceder as mais genéricas para não serem mascaradas prematuramente", ["Porque o compilador lê de baixo para cima","Porque altera o nome das variáveis"], "Se uma condição ampla vier antes, ramificações mais específicas tornam-se código morto inalcançável."),
          q("Em C++, qual valor numérico é convertido implicitamente para false em um teste condicional if?", "O número zero (0), enquanto qualquer outro valor diferente de zero é convertido para true", ["Apenas números negativos","Apenas o valor 1"], "Em C++, tipos inteiros convertem-se implicitamente para bool, onde 0 é false e qualquer outro é true."),
          t("Qual combinação de duas palavras declara uma ramificação condicional intermediária em C++?", ["else if"], "else if introduz um novo teste após um if inicial.", "# ramificacao condicional intermediaria"),
          g("Complete o encadeamento condicional com a cláusula intermediária:", ["if (pontos >= 90) {\n    grau = \"A\";\n} else if (pontos >= 75) {\n    grau = \"B\";\n}"], "else if avalia o segundo critério se o primeiro falhar.", "if (pontos >= 90) {\n    grau = \"A\";\n} ____ (pontos >= 75) {\n    grau = \"B\";\n}"),
          o("Ordene a hierarquia sequencial recomendada para categorizar cargas industriais:", ["if (peso > 5000): verificação mais restritiva de carga extrapesada","else if (peso > 1000): faixa intermediária para fretes industriais médios","else if (peso > 100): categoria básica para encomendas comerciais padrão","else: contingência final para remessas leves ou pacotes expressos"], "Hierarquia lógica ordenada de condições em C++."),
          p("Associe o valor da entrada à ramificação alcançada no encadeamento em C++:", [["peso = 6500","Ramificação do if inicial de carga extrapesada"],["peso = 2200","Ramificação do primeiro else if de frete médio"],["peso = 450","Ramificação do segundo else if de encomenda padrão"],["peso = 30","Ramificação de contingência do bloco final else"]], "Roteamento em cadeia condicional em C++.")
        ]
      },
      {
        id: "cpp-c04-u1-l3",
        title: "If com inicializador no C++17 (if with initializer)",
        subtitle: "Escopo restrito · if (init; condicao) limitando o tempo de vida",
        theory: "Desde o C++17, a instrução if suporta um inicializador prévio: if (init; condicao). Isso permite declarar variáveis no escopo estrito da condicional, tornando-as visíveis apenas dentro dos blocos if e else. A prática evita poluição do escopo externo e reduz o risco de reutilizar dados desatualizados no código.",
        questions: [
          q("Qual é o benefício primário da sintaxe if (init; condicao) introduzida no C++17?", "Limitar o escopo da variável estritamente aos blocos if/else onde ela é necessária", ["Acelerar a velocidade da GPU","Permitir execução concorrente sem locks"], "Variáveis auxiliares deixam de existir assim que a estrutura if/else é encerrada, prevenindo vazamentos de estado."),
          q("No bloco if (auto it = mapa.find(chave); it != mapa.end()), onde a variável \"it\" permanece acessível?", "Exclusivamente dentro do corpo do if e em eventuais ramificações else if e else vinculadas", ["Em toda a função chamadora","Apenas no cabeçalho do if"], "O escopo da variável declarada no inicializador estende-se por todo o constructo if/else associado."),
          q("O que acontece se tentarmos acessar a variável declarada no inicializador do if logo após o término do bloco?", "Ocorre erro de compilação porque o identificador não está mais em escopo", ["O compilador retorna zero","O valor é convertido para nullptr"], "A variável é destruída ao sair do bloco if/else, garantindo liberação imediata de recursos RAII."),
          q("Qual delimitador separa a declaração do inicializador da expressão condicional de teste no if do C++17?", "O ponto e vírgula (;)", ["A vírgula (,)","Dois-pontos (:)"], "A sintaxe espelha o cabeçalho do laço for: if (inicializacao; condicao_de_teste)."),
          t("Qual símbolo de pontuação separa o inicializador da condição na sintaxe do if moderno do C++17?", [";"], "O ponto e vírgula separa as duas partes.", "# separador de inicializacao no if"),
          g("Complete o if com inicializador para limitar o escopo da busca no C++17:", ["if (auto res = calcular(); res > 0) {\n    std::cout << res << std::endl;\n}"], "O inicializador declara e avalia a variável no mesmo comando.", "if (auto res = calcular()____ res > 0) {\n    std::cout << res << std::endl;\n}"),
          o("Ordene as etapas de execução de uma instrução if com inicializador no C++17:", ["Executar a declaração e atribuição do inicializador (init)","Avaliar a expressão booleana de teste subsequente","Executar o bloco if se a condição for estritamente verdadeira","Destruir a variável local ao sair do escopo if/else"], "Ciclo de vida de variáveis no if com init do C++17."),
          p("Associe o elemento do if com inicializador à sua função técnica em C++17:", [["auto it = busca()","Declaração e inicialização local de recurso"],["it != fim","Condição booleana inspecionada para ramificação"],["Corpo do else","Escopo que ainda enxerga o recurso inicializado"],["Instrução após o if","Ponto onde a variável local já foi destruída"]], "Mecanismo de escopo no if com init em C++17.")
        ]
      },
      {
        id: "cpp-c04-u1-l4",
        title: "Cláusulas de guarda (guard clauses) e retorno precoce",
        subtitle: "Engenharia limpa · Redução de aninhamento e caminho feliz plano",
        theory: "Cláusulas de guarda (Guard Clauses) utilizam verificações no início de funções para tratar parâmetros inválidos ou condições de borda, retornando imediatamente. Esse padrão elimina o anti-padrão da flecha (múltiplos ifs aninhados em pirâmide), mantendo o fluxo principal de sucesso plano e de fácil manutenção.",
        questions: [
          q("Qual é o benefício primário de adotar cláusulas de guarda em funções C++?", "Manter o fluxo principal no nível zero de indentação e simplificar a leitura do código", ["Permitir inline automático pelo compilador","Desabilitar checagem de tipos"], "Evita aninhamentos profundos que empurram o código crítico para a direita do editor."),
          q("O que prega a filosofia Fail-Fast aplicada através de Guard Clauses?", "Validar pré-condições na entrada e abortar ou retornar imediatamente diante de dados inválidos", ["Aguardar o fim da função para reportar erro","Silenciar exceções da biblioteca padrão"], "Impede que dados espúrios ou ponteiros nulos corrompam o estado interno do algoritmo."),
          q("O que caracteriza o \"anti-padrão da flecha\" (arrow anti-pattern)?", "Uma pirâmide de blocos if/else aninhados que prejudica a legibilidade e manutenibilidade", ["O uso de ponteiros em excesso","A definição de múltiplos destrutores"], "Cada nível extra de if aumenta a complexidade ciclomática e dificulta testes unitários."),
          q("Como uma cláusula de guarda deve tratar um ponteiro de entrada nulo em uma função C++?", "Retornar precocemente ou lançar std::invalid_argument antes de desreferenciar", ["Desreferenciar o ponteiro imediatamente","Converter o ponteiro em inteiro"], "Desreferenciar ponteiro nulo em C++ é comportamento indefinido fatal; a guarda impede o desastre."),
          t("Qual instrução em C++ finaliza a execução da função atual devolvendo controle ao chamador?", ["return"], "return encerra a execução da função imediatamente.", "# instrucao de retorno precoce"),
          g("Complete a cláusula de guarda que rejeita ponteiros nulos logo na entrada:", ["void processar(Sensor* s) {\n    if (s == nullptr) return;\n    s->atualizar();\n}"], "O retorno antecipado protege contra dereferência nula.", "void processar(Sensor* s) {\n    if (s == nullptr) ____;\n    s->atualizar();\n}"),
          o("Ordene a estrutura recomendada de uma função projetada com Guard Clauses:", ["Validar nulidade de ponteiros e referências na entrada","Verificar limites e pré-condições numéricas dos parâmetros","Tratar casos triviais de borda retornando valores neutros","Executar a lógica de negócio central no caminho feliz plano"], "Anatomia de funções robustas e limpas em C++."),
          p("Associe o conceito de design ao seu impacto no código C++:", [["Guard Clause","Retorno precoce na entrada eliminando aninhamento"],["Happy Path","Caminho principal de sucesso sem indentação excessiva"],["Fail-Fast","Rejeição imediata de entradas ilegais ou nulas"],["Arrow Anti-Pattern","Estrutura piramidal aninhada de difícil manutenção"]], "Padrões de controle de fluxo e qualidade em C++.")
        ]
      },
      {
        id: "cpp-c04-u1-l5",
        title: "O operador ternário (? :) e expressões condicionais",
        subtitle: "Expressões inline · Atribuição compacta e inicialização imutável",
        theory: "O operador ternário (? :) avalia uma condição e retorna uma entre duas expressões: condicao ? valor_true : valor_false. Em C++, o ternário é uma expressão que produz um valor, sendo essencial para inicializar variáveis const que não poderiam receber atribuição posterior dentro de blocos if/else convencionais.",
        questions: [
          q("Por que o operador ternário é fundamental para a inicialização de variáveis const em C++?", "Porque variáveis const precisam ser inicializadas na declaração e o ternário é uma expressão com valor", ["Porque const só aceita operadores aritméticos","Porque o if não aceita tipos primitivos"], "Variáveis const não podem ser declaradas vazias para posterior atribuição em blocos if."),
          q("Qual exigência o compilador C++ impõe sobre os tipos dos dois ramos do operador ternário?", "Ambos devem possuir tipos idênticos ou tipos que possam ser convertidos para um tipo comum válido", ["Ambos devem ser inteiros puros","Não há restrição nenhuma de tipo"], "A expressão inteira precisa ter um tipo estático único bem definido em tempo de compilação."),
          q("Qual é a diferença conceitual entre uma instrução if e o operador ternário em C++?", "if é um comando de controle de fluxo; o ternário é uma expressão que devolve um resultado avaliado", ["O ternário consome mais memória stack","if só roda em modo release"], "O ternário pode ser passado diretamente como argumento de funções ou em inicializações imutáveis."),
          q("Por que ternários profundamente aninhados (múltiplos níveis de ? :) são desaconselhados?", "Prejudicam a legibilidade e obscurecem a hierarquia lógica para futuros desenvolvedores", ["Aumentam o tamanho do binário gerado","Desativam otimizações do compilador"], "Código ilegível aumenta a incidência de falhas; aninhamentos devem dar lugar a if/else ou switch."),
          t("Qual símbolo de pontuação sucede o teste booleano no operador ternário em C++?", ["?"], "A interrogação sucede o teste condicional.", "# operador condicional ternario"),
          g("Complete a inicialização imutável compacta com o operador ternário:", ["const int limite = express ? 100 : 20;"], "O operador ternário define o valor imutável na declaração.", "const int limite = express ____ 100 : 20;"),
          o("Ordene a estrutura léxica de uma expressão ternária em C++:", ["Expressão condicional de teste booleano","Operador de interrogação (?)","Expressão avaliada e retornada se verdadeiro","Dois-pontos (:) seguido da expressão alternativa"], "Anatomia sintática do operador ternário em C++."),
          p("Associe o fragmento ternário à sua função sintática no C++:", [["(ativo == true)","Expressão booleana testada como condição"],["?","Delimitador entre o teste e o ramo verdadeiro"],["valor_ativo","Expressão devolvida caso a condição seja satisfeita"],["valor_inativo","Expressão devolvida como alternativa no ramo falso"]], "Partes constitutivas da expressão ternária em C++.")
        ]
      }
    ],
    2: [
      {
        id: "cpp-c04-u2-l1",
        title: "Anatomia da instrução switch e tipos integrais",
        subtitle: "Decisão multiterminal · Despacho direto por tabela de saltos em C++",
        theory: "A instrução switch em C++ seleciona um bloco de execução comparando uma expressão integral com múltiplos rótulos case de valor constante conhecido em compilação. Compiladores frequentemente otimizam o switch gerando jump tables (tabelas de salto O(1)), tornando-o mais eficiente que cadeias longas de if/else.",
        questions: [
          q("Quais tipos de dados podem ser utilizados na expressão de controle de um switch em C++?", "Tipos integrais (char, int, short, long, enum e enum class)", ["Apenas std::string e float","Qualquer ponteiro de função"], "C++ tradicional exige tipos que possam ser convertidos em inteiros para resolução estática de rótulos."),
          q("O que o compilador exige a respeito dos valores associados aos rótulos case?", "Devem ser expressões constantes integrais conhecidas e fixas em tempo de compilação", ["Podem ser variáveis locais modificáveis","Devem ser ponteiros dinâmicos"], "Rótulos case não podem depender de variáveis cujo valor só é determinado durante a execução."),
          q("Qual é a finalidade da cláusula default em uma estrutura switch?", "Fornecer o bloco de execução padrão quando nenhum dos rótulos case corresponder ao valor testado", ["Encerrar o programa imediatamente","Reiniciar o switch do início"], "A cláusula default garante que estados inesperados recebam tratamento adequado."),
          q("Por que um switch com dezenas de casos consecutivos pode ser mais rápido que múltiplos if/else?", "O compilador pode sintetizar uma jump table indexada direta, permitindo desvio em tempo constante O(1)", ["Porque desativa verificações de memória","Porque roda em paralelo na CPU"], "A jump table salta diretamente para o endereço do código correspondente sem testar condição por condição."),
          t("Qual palavra-chave define o bloco de contingência padrão em uma instrução switch em C++?", ["default"], "default captura os casos não correspondidos.", "# clausula padrao de switch"),
          g("Complete o rótulo de contingência da instrução switch:", ["switch (codigo) {\n    case 1: processar(); break;\n    default: registrar_erro(); break;\n}"], "default trata valores não mapeados nos cases anteriores.", "switch (codigo) {\n    case 1: processar(); break;\n    ____: registrar_erro(); break;\n}"),
          o("Ordene a estrutura canônica de uma instrução switch em C++:", ["Avaliar a expressão integral no cabeçalho switch (expressao)","Comparar com os rótulos constantes case VALOR:","Executar o bloco correspondente e interromper com break","Tratar exceções na cláusula de contingência default:"], "Anatomia estrutural de um switch em C++."),
          p("Associe o termo sintático ao seu papel no switch em C++:", [["switch (valor)","Expressão integral inspecionada para seleção"],["case CONSTANTE:","Rótulo estático testado para casamento exato"],["default:","Bloco de escape executado caso nenhum case case"],["break;","Desvio para fora do switch evitando queda ao próximo"]], "Elementos fundamentais do switch em C++.")
        ]
      },
      {
        id: "cpp-c04-u2-l2",
        title: "Controle de fallthrough e a necessidade do break",
        subtitle: "Comportamento histórico · Queda sequencial não intencional entre cases",
        theory: "Em C++, quando um bloco case termina sem uma instrução de interrupção (break ou return), a execução \"cai\" (fallthrough) imediatamente para o próximo case subsequente, ignorando o rótulo deste. Embora útil para agrupar rótulos que compartilham ações, o fallthrough acidental é uma fonte clássica de falhas graves.",
        questions: [
          q("O que acontece em C++ se um desenvolvedor omitir o break ao final de um case no switch?", "A execução continua sequencialmente no código do case seguinte (fallthrough acidental)", ["O compilador gera erro e para","O switch é cancelado imediatamente"], "O comportamento herdado do C clássico executa instruções seguintes até encontrar um break ou fim do bloco."),
          q("Qual é o uso legítimo e intencional do mecanismo de fallthrough em um switch?", "Empilhar múltiplos rótulos case consecutivos para que compartilhem exatamente o mesmo bloco de código", ["Aumentar o uso de memória RAM","Forçar execução concorrente"], "Rótulos empilhados (ex: case 1: case 2: acao(); break;) são padrões idiomáticos limpos."),
          q("Por que omitir acidentalmente um break é considerado um dos bugs mais insidiosos em C++?", "Porque o código compila perfeitamente sem erros, mas executa ações indevidas em silêncio", ["Porque o computador desliga","Porque o arquivo-fonte é corrompido"], "O compilador assume que o desenvolvedor pretendia a queda a menos que avisos específicos sejam ativados."),
          q("Além de break, qual outra instrução comum encerra com segurança o fluxo de um case?", "return, que devolve o controle diretamente ao chamador da função", ["continue","goto sem rótulo"], "Instruções de salto como return e throw evitam a queda para o case adjacente."),
          t("Qual instrução em C++ desvia o fluxo para fora do switch, impedindo o fallthrough?", ["break"], "break interrompe a execução e sai do switch.", "# instrucao de quebra de fluxo"),
          g("Complete o encerramento do case evitando a queda para o rótulo seguinte:", ["switch (opcao) {\n    case 10:\n        iniciar();\n        break;\n    case 20:\n        parar();\n        break;\n}"], "break finaliza o case e salta para fora do bloco switch.", "switch (opcao) {\n    case 10:\n        iniciar();\n        ____;\n    case 20:\n        parar();\n        break;\n}"),
          o("Ordene a progressão do fluxo de execução com queda (fallthrough) em um switch:", ["Casamento bem-sucedido com o rótulo case 1:","Execução das instruções correspondentes do case 1","Ausência da instrução break ao término do bloco","Invasão e execução direta das instruções do case 2"], "Mecanismo de fallthrough sequencial em C++."),
          p("Associe o padrão de switch ao comportamento esperado em tempo de execução:", [["case com break;","Executa as instruções e sai imediatamente do switch"],["case empilhado vazio","Compartilha as ações do próximo rótulo abaixo"],["case sem break acidental","Invade indevidamente o próximo case (fallthrough)"],["case com return;","Finaliza a rotina e devolve controle ao chamador"]], "Padrões de controle de saída em switch C++.")
        ]
      },
      {
        id: "cpp-c04-u2-l3",
        title: "O atributo [[fallthrough]] do C++17",
        subtitle: "Intenção explícita · Supressão padronizada de avisos do compilador",
        theory: "O C++17 padronizou o atributo [[fallthrough]] para documentar quedas intencionais entre cases de um switch. Posicionado onde o break normalmente estaria, o atributo informa explicitamente aos analisadores estáticos e ao compilador que a queda sequencial é desejada, suprimindo avisos como -Wimplicit-fallthrough.",
        questions: [
          q("Qual é o propósito fundamental do atributo [[fallthrough]] padronizado no C++17?", "Indicar ao compilador e aos leitores que a queda para o próximo case é intencional, silenciando avisos", ["Interromper o switch como um break","Duplicar a velocidade do processador"], "Remove falsos positivos em ferramentas de análise estática sem alterar a semântica de execução."),
          q("Onde exatamente o atributo [[fallthrough]] deve ser posicionado dentro do switch?", "Como uma instrução imediatamente antes do próximo rótulo case ou default", ["No cabeçalho do switch","Após a declaração da função main"], "O atributo deve anteceder o ponto onde a transição para o case seguinte ocorre."),
          q("O que acontece se [[fallthrough]] for colocado no último case de um switch sem case posterior?", "O compilador emite um erro ou aviso de sintaxe porque não há bloco seguinte para onde cair", ["O compilador cria um case falso","O programa roda em loop infinito"], "O padrão C++ exige que [[fallthrough]] sempre preceda outro rótulo case ou default válido."),
          q("Qual bandeira de compilação em g++ e clang++ detecta quedas não marcadas com [[fallthrough]]?", "-Wimplicit-fallthrough", ["-Wall-quiet","-fno-switch"], "Essa flag é essencial em bases de código modernas para garantir que nenhuma queda acidental passe despercebida."),
          t("Digite o atributo padronizado do C++17 usado para marcar quedas intencionais no switch.", ["[[fallthrough]]"], "[[fallthrough]] documenta a intenção explícita de queda.", "# atributo padronizado c++17"),
          g("Complete a instrução com o atributo C++17 de queda explícita entre cases:", ["switch (nivel) {\n    case 1:\n        ajustar_potencia();\n        [[fallthrough]];\n    case 2:\n        ativar_refrig();\n        break;\n}"], "[[fallthrough]] sinaliza intenção e elimina alertas do compilador.", "switch (nivel) {\n    case 1:\n        ajustar_potencia();\n        ____;\n    case 2:\n        ativar_refrig();\n        break;\n}"),
          o("Ordene a estrutura de um case com queda intencional documentada no C++17:", ["Declaração do rótulo case de entrada (ex: case Nível::Medio:)","Execução das instruções específicas daquela etapa inicial","Inserção do atributo padronizado [[fallthrough]];","Continuação imediata no rótulo subsequente (ex: case Nível::Alto:)"], "Uso correto de [[fallthrough]] segundo o padrão ISO C++."),
          p("Associe o atributo ou diretiva à sua finalidade em conformidade com C++17:", [["[[fallthrough]]","Suprime avisos de queda intencional entre cases"],["-Wimplicit-fallthrough","Sinaliza compilação com verificação estrita de break"],["break;","Comando imperativo que cancela a queda no switch"],["default:","Ponto de recepção final para valores não previstos"]], "Diretrizes de atributos modernos em C++.")
        ]
      },
      {
        id: "cpp-c04-u2-l4",
        title: "Switch com enum class e verificação de exaustividade",
        subtitle: "Segurança de tipos · Garantia de tratamento de todos os enumeradores",
        theory: "Combinar switch com enum class (scoped enums) oferece segurança robusta de tipos em C++. Compiladores modernos avisam quando um dos valores do enum não é tratado em nenhum case (aviso de exaustividade). Evitar default em enums fechados força o compilador a alertar imediatamente quando novos estados são adicionados ao sistema.",
        questions: [
          q("Por que enum class é superior a enum tradicional ao ser utilizado em instruções switch?", "Exige qualificação de escopo (ex: Status::Ativo), impedindo colisões de nomes e coerção acidental para int", ["Porque roda mais rápido na memória RAM","Porque não precisa de compilação"], "Scoped enums mantêm forte tipagem estática e não poluem o escopo global com identificadores soltos."),
          q("Como a omissão deliberada do default auxilia na manutenção de um switch sobre enum class?", "Faz o compilador emitir aviso (-Wswitch) se um novo valor for adicionado ao enum e não for tratado", ["Causa falha de segmentação imediata","Impede a compilação do executável"], "Garante verificação de exaustividade em tempo de compilação quando novas opções surgem no modelo."),
          q("Qual aviso do compilador g++/clang alerta sobre valores de enum esquecidos no switch?", "-Wswitch ou -Wswitch-enum", ["-Wno-enum","-Wpointer-arith"], "Esses avisos asseguram que todas as ramificações possíveis sejam mapeadas explicitamente."),
          q("Como se referencia um enumerador de um enum class chamado Prioridade com item Alta?", "Prioridade::Alta", ["Prioridade.Alta","Prioridade->Alta"], "O operador de resolução de escopo (::) é obrigatório para acessar membros de scoped enums."),
          t("Qual operador de dois caracteres acessa o valor de um enum class em C++?", ["::"], "Os dois-pontos duplos representam a resolução de escopo.", "# operador de resolucao de escopo"),
          g("Complete o switch qualificando o valor do enum class com seu escopo correto:", ["switch (estado) {\n    case Estado::Conectado:\n        enviar();\n        break;\n}"], "O escopo do enum class antecede o operador :: no case.", "switch (estado) {\n    case Estado____Conectado:\n        enviar();\n        break;\n}"),
          o("Ordene o fluxo de desenvolvimento para adicionar um novo estado com checagem de exaustividade:", ["Adicionar novo enumerador na definição do enum class","Compilar o projeto com avisos estritos (-Wswitch ativado)","Receber aviso do compilador indicando switchs sem cobertura","Implementar o novo case correspondente em cada switch"], "Ciclo de manutenção segura com exaustividade em C++."),
          p("Associe a prática com enum class ao seu efeito na qualidade do código:", [["enum class com ::","Isola identificadores evitando colisões globais"],["Omissão de default","Ativa avisos do compilador para cases ausentes"],["Aviso -Wswitch","Alerta em compilação sobre estados não mapeados"],["Conversão int proibida","Impede passagem acidental de números mágicos"]], "Garantias arquiteturais com scoped enums em C++.")
        ]
      },
      {
        id: "cpp-c04-u2-l5",
        title: "Switch com inicializador no C++17 e boas práticas",
        subtitle: "Escopo limpo · switch (init; expressao) e declaração de variáveis",
        theory: "Assim como o if, o switch no C++17 aceita um inicializador: switch (init; expressao). Além disso, declarar variáveis locais dentro de um bloco switch exige chaves explícitas nos cases onde ocorrem inicializações, impedindo que o compilador recuse o código por pular inicializações com rótulos subsequentes.",
        questions: [
          q("Por que o compilador C++ proíbe saltar sobre a inicialização de uma variável em um switch?", "Porque entrar em um case posterior deixaria a variável em escopo com estado indefinido ou corrompido", ["Porque variáveis locais são proibidas","Porque o switch só aceita ponteiros"], "Regra fundamental do C++: saltar sobre uma inicialização com escopo ativo é erro estrito de compilação."),
          q("Como um desenvolvedor pode declarar e inicializar variáveis locais dentro de um case específico?", "Envolvendo o corpo daquele case específico entre chaves {} para criar um escopo local fechado", ["Adicionando static em todas as variáveis","Declarando a variável fora do arquivo"], "As chaves delimitam a vida útil da variável estritamente àquele ramo case, permitindo inicialização limpa."),
          q("Qual é a vantagem de utilizar switch (init; expressao) introduzido no C++17?", "Permite obter e inspecionar um recurso temporário mantendo seu escopo restrito apenas ao switch", ["Acelera a compilação em 50%","Permite usar switch com floats"], "Recursos como locks ou valores retornados por chamadas não vazam para o restante da função."),
          q("O que acontece se uma variável for declarada sem inicialização (ex: int x;) antes dos cases?", "É permitido, mas a prática é desaconselhada pois x pode ser lido sem valor inicial definido", ["O compilador gera erro fatal","A variável é inicializada com zero"], "Variáveis primitivas sem inicializador contêm lixo de memória na stack, criando riscos de segurança."),
          t("Qual delimitador em par deve ser usado para isolar variáveis locais dentro de um case em C++?", ["{}"], "As chaves criam um bloco de escopo local.", "# delimitador de escopo em bloco"),
          g("Complete o bloco do case isolando a variável local com chaves de escopo:", ["switch (tipo) {\n    case 1: {\n        int total = calcular();\n        std::cout << total;\n        break;\n    }\n}"], "Chaves criam um escopo delimitado permitindo inicialização local.", "switch (tipo) {\n    case 1: ____\n        int total = calcular();\n        std::cout << total;\n        break;\n    }\n}"),
          o("Ordene as etapas corretas para instanciar objetos locais dentro de um switch em C++:", ["Definir o rótulo case de correspondência","Abrir chaves ({) criando um novo bloco de escopo local","Declarar e inicializar os objetos necessários com segurança","Finalizar o processamento, invocar break e fechar chaves (})"], "Isolamento de escopo e variáveis locais em switch C++."),
          p("Associe a construção em switch à regra de compilação em C++:", [["switch (init; exp)","Limita variáveis auxiliares ao escopo do switch"],["case { int x = 1; }","Permite inicialização local protegida por chaves"],["Salto sem chaves","Erro do compilador por ignorar inicialização"],["default no final","Garante escape seguro para valores inesperados"]], "Diretrizes de escopo e compilação em switch C++.")
        ]
      }
    ],
    3: [
      {
        id: "cpp-c04-u3-l1",
        title: "Anatomia do laço for tradicional de três cláusulas",
        subtitle: "Iteração determinística · Inicialização, condição e incremento no cabeçalho",
        theory: "O laço for clássico em C++ estrutura o controle de repetição em três partes: for (init; condicao; passo). O bloco de inicialização executa uma única vez, a condição é verificada antes de cada iteração e o passo é executado ao final de cada ciclo. Manter a variável de controle no cabeçalho reduz o escopo.",
        questions: [
          q("Qual é a sequência exata de avaliação das três cláusulas no laço for tradicional?", "Inicialização (uma vez), teste da condição, execução do corpo e execução do passo", ["Condição, passo, inicialização e corpo","Passo, corpo, inicialização e condição"], "A inicialização só roda no início; o passo roda após cada ciclo imediatamente antes do próximo teste."),
          q("O que acontece com o escopo da variável declarada no cabeçalho for (int i = 0; ...)?", "Fica estritamente confinada ao corpo do laço for, deixando de existir após o término", ["Permanece viva na função inteira","Torna-se uma constante global"], "Declarar a variável no cabeçalho evita poluir o escopo da função chamadora com índices obsoletos."),
          q("Qual é o operador preferível para incremento de iteradores e inteiros em laços C++?", "O pré-incremento (++i), pois evita cópias desnecessárias em tipos complexos e iteradores", ["O pós-incremento (i++)","A soma i = i + 1 obrigatória"], "Em tipos customizados e iteradores, ++i altera o objeto diretamente sem criar cópias temporárias."),
          q("O que significa a omissão da condição de teste em um for em C++ (ex: for (;;))?", "Cria um laço infinito intencional que necessita de break, return ou exceção para sair", ["O compilador gera erro de compilação","Executa apenas uma iteração e encerra"], "No padrão ISO C++, a ausência de expressão na condição do for avalia implicitamente para true."),
          t("Qual símbolo de pontuação separa as três cláusulas no cabeçalho do laço for?", [";"], "O ponto e vírgula separa inicialização, condição e passo.", "# separador de clausulas no for"),
          g("Complete o cabeçalho do laço com o operador de pré-incremento padrão:", ["for (int i = 0; i < 10; ++i) {\n    std::cout << i;\n}"], "++i incrementa diretamente a variável de controle.", "for (int i = 0; i < 10; ____) {\n    std::cout << i;\n}"),
          o("Ordene o fluxo cronológico de execução em uma iteração típica do laço for:", ["Avaliar a condição de continuidade do cabeçalho","Executar as instruções contidas no corpo do laço","Executar a cláusula de passo (incremento ou avanço)","Retornar ao cabeçalho para reavaliar a condição"], "Ciclo de repetição passo a passo do laço for em C++."),
          p("Associe a seção do cabeçalho for ao momento de sua execução no C++:", [["for (int i = 0; ...","Executada uma única vez antes de qualquer repetição"],["...; i < limite; ...","Avaliada antes do início de cada ciclo do corpo"],["...; ++i)","Executada após o término de cada iteração do corpo"],["Corpo entre { }","Executado a cada ciclo em que a condição for true"]], "Mecanismo de avaliação do laço for em C++.")
        ]
      },
      {
        id: "cpp-c04-u3-l2",
        title: "Range-based for loop e iteradores modernos",
        subtitle: "C++11 em diante · Sintaxe for (declaracao : colecao) limpa e segura",
        theory: "O range-based for loop introduzido no C++11 permite iterar sobre todos os elementos de uma coleção (arrays nativos, std::vector, etc.) de forma elegante: for (tipo elem : colecao). O compilador traduz a estrutura utilizando begin() e end(), eliminando erros clássicos de índices fora dos limites da memória.",
        questions: [
          q("Qual é a vantagem primária do range-based for sobre laços indexados clássicos?", "Elimina completamente erros de índice fora dos limites (off-by-one errors) e melhora a legibilidade", ["Garante compilação 10 vezes mais rápida","Permite usar memória sem ponteiros"], "Não há manipulação manual de índices numéricos nem cálculo explícito de tamanhos."),
          q("Como o compilador C++ expande internamente um range-based for loop?", "Utiliza um par de iteradores obtidos por begin() e end() da coleção alvo", ["Converte em recursão profunda de chamadas","Aloca uma matriz de ponteiros na Heap"], "O range-for opera sob o protocolo de iteradores padrão da biblioteca padrão C++."),
          q("Quais tipos de estruturas podem ser percorridas com a sintaxe range-based for em C++?", "Qualquer estrutura que forneça funções membro ou livres begin() e end(), além de arrays brutos", ["Apenas vetores estáticos de inteiros","Exclusivamente classes com herança"], "Qualquer tipo que cumpra o conceito de Range na STL é percorrível por range-for."),
          q("Qual palavra-chave deduz automaticamente o tipo do elemento na declaração do range-for?", "auto (ex: for (auto x : colecao))", ["var","dynamic"], "auto permite que o compilador deduza a tipagem estática exata do valor contido na coleção."),
          t("Qual símbolo de pontuação separa o elemento iterador da coleção no range-based for?", [":"], "Os dois-pontos separam a variável da coleção iterada.", "# separador do range-based for"),
          g("Complete o range-for moderno iterando sobre a lista de sensores:", ["for (const auto& sensor : sensores) {\n    sensor.ler();\n}"], "Os dois-pontos separam o identificador do container percorrido.", "for (const auto& sensor ____ sensores) {\n    sensor.ler();\n}"),
          o("Ordene as etapas internas que o compilador executa ao processar um range-based for:", ["Obter o iterador inicial via std::begin(colecao)","Obter o iterador sentinela final via std::end(colecao)","Verificar se o iterador atual não alcançou o sentinela final","Desreferenciar o elemento e avançar o iterador com ++it"], "Mecanismo interno do range-based for loop em C++."),
          p("Associe a construção em range-for à sua característica técnica:", [["for (auto x : v)","Copia cada elemento da coleção para variável local"],["std::begin(c)","Retorna o iterador apontando para o primeiro item"],["std::end(c)","Retorna a sentinela apontando além do último item"],["++it interno","Avança o iterador para a posição do próximo elemento"]], "Componentes do range-based for no padrão moderno C++.")
        ]
      },
      {
        id: "cpp-c04-u3-l3",
        title: "Iteração por valor versus referência constante (const auto&)",
        subtitle: "Eficiência e semântica · Evitando cópias desnecessárias na iteração",
        theory: "Ao percorrer coleções com range-based for, iterar por valor for (auto x : lista) cria uma cópia completa de cada elemento. Para tipos não primitivos, como std::string ou std::vector, deve-se usar referência constante for (const auto& x : lista) para inspecionar os dados sem cópias e garantindo imutabilidade.",
        questions: [
          q("Qual é a recomendação padrão das C++ Core Guidelines para leitura de coleções de objetos?", "Usar for (const auto& elemento : colecao) para evitar cópias e garantir proteção de escrita", ["Usar for (auto elemento : colecao) sempre","Copiar os objetos para uma pilha manual"], "Referências constantes evitam alocações de memória e chamadas ao construtor de cópia."),
          q("O que acontece se iterarmos um std::vector<std::string> com a assinatura for (auto s : v)?", "Cada string do vetor sofre uma cópia individual completa na memória a cada iteração", ["Ocorre erro fatal de compilação","As strings são deletadas do vetor original"], "Para strings longas, cópias repetidas causam intensa alocação dinâmica na heap e degradação de performance."),
          q("Quando iterar por valor puro (for (auto x : colecao)) é perfeitamente adequado e idiomático?", "Para tipos primitivos pequenos e triviais como int, double, bool ou enum", ["Para vetores que guardam imagens gigabytes","Para ponteiros inteligentes gerenciados"], "Tipos de tamanho menor ou igual a um ponteiro cabem em registradores de CPU sem custo de cópia."),
          q("Uma iteração declarada como const auto& permite alterar o estado interno do elemento?", "Não; o modificador const impõe proteção estrita contra modificações e compilação falha se tentar", ["Sim, se usar ponteiro interno","Sim, em modo release"], "O compilador impede a invocação de métodos não const ou modificações diretas de membros."),
          t("Qual modificador de dois caracteres declara uma referência vinculada a um objeto em C++?", ["&"], "O e-comercial declara uma referência a um tipo.", "# declarador de referencia em c++"),
          g("Complete o range-for com referência constante para evitar cópias:", ["for (const auto& registro : tabela) {\n    std::cout << registro.nome;\n}"], "const auto& inspeciona sem duplicar objetos na memória.", "for (const auto____ registro : tabela) {\n    std::cout << registro.nome;\n}"),
          o("Ordene a análise de desempenho na escolha da forma de iteração em C++:", ["Avaliar o tamanho e peso de cópia do tipo armazenado","Verificar se a rotina necessita apenas de leitura observacional","Declarar const auto& para tipos pesados ou classes gerais","Usar passagem por valor direto (auto) apenas para tipos primitivos"], "Tomada de decisão em iterações de alta performance em C++."),
          p("Associe a assinatura do laço à sua implicação de desempenho:", [["for (auto x : c)","Copia cada item individualmente a cada repetição"],["for (const auto& x : c)","Observa diretamente o objeto na coleção sem cópias"],["for (auto& x : c)","Permite modificar os elementos originais in-place"],["for (auto&& x : c)","Encaminha referências universais com flexibilidade"]], "Diretrizes de performance em laços de repetição C++.")
        ]
      },
      {
        id: "cpp-c04-u3-l4",
        title: "Modificação in-place de elementos com referências não const",
        subtitle: "Mutabilidade direta · for (auto& elemento : colecao) transformando dados",
        theory: "Quando os elementos de uma coleção precisam ser alterados ou normalizados diretamente em sua estrutura de armazenamento, utiliza-se a referência não constante: for (auto& elem : colecao). Cada modificação aplicada em elem afeta imediatamente a posição de memória correspondente na coleção original.",
        questions: [
          q("Como garantir que as modificações realizadas no corpo do laço alterem a coleção original?", "Declarando a variável do range-for como referência não constante: for (auto& item : colecao)", ["Declarando como const auto&","Declarando como auto puro"], "Sem o modificador &, qualquer alteração afetará apenas uma cópia local temporária descartada ao fim do ciclo."),
          q("O que acontece se tentarmos modificar uma coleção declarada como const usando for (auto& x : c)?", "Ocorre erro de compilação porque referências não const não podem vincular-se a objetos const", ["A imutabilidade é ignorada em silêncio","O programa encerra bruscamente"], "O sistema de tipos do C++ garante que dados constantes não sofram escrita acidental."),
          q("Qual é uma aplicação prática comum de for (auto& item : colecao)?", "Normalizar dados, como converter textos em maiúsculas ou aplicar taxas sobre valores monetários", ["Consultar apenas o tamanho da lista","Destruir a estrutura sem aviso"], "Permite transformações in-place diretas sem alocar uma segunda coleção auxiliar."),
          q("Por que não se deve inserir ou remover elementos da coleção durante um range-for?", "Porque redimensionar a coleção invalida iteradores internos, gerando comportamento indefinido", ["Porque a linguagem C++ proíbe listas mutáveis","Porque diminui o clock da placa mãe"], "Inserções e exclusões durante o loop causam descolamento de memória e acessos ilegais (dangling iterators)."),
          t("Qual símbolo associado ao tipo do elemento permite alterar os itens da coleção diretamente?", ["&"], "O e-comercial cria uma referência modificável.", "# referencia modificavel em loop"),
          g("Complete o laço que duplica os valores do vetor modificando-os diretamente:", ["for (auto& valor : numeros) {\n    valor *= 2;\n}"], "auto& vincula uma referência direta a cada número da lista.", "for (auto____ valor : numeros) {\n    valor *= 2;\n}"),
          o("Ordene as etapas para normalizar uma lista de leituras analógicas in-place:", ["Garantir que a coleção não seja qualificada como const","Iterar com for (auto& leitura : sensores)","Aplicar o cálculo de calibração atribuindo diretamente à variável","Concluir o laço deixando o container com dados normalizados"], "Processo de modificação in-place segura em C++."),
          p("Associe o comportamento à declaração correspondente no for:", [["for (auto& x : v)","Modifica diretamente o elemento contido no vetor"],["for (auto x : v)","Modifica apenas uma variável temporária descartada"],["v.push_back(x) no loop","Perigo de invalidação de iteradores em tempo de execução"],["const std::vector<int>","Bloqueia qualquer tentativa de mutação in-place"]], "Regras de mutabilidade de coleções em loops C++.")
        ]
      },
      {
        id: "cpp-c04-u3-l5",
        title: "Range-based for com inicializador no C++20",
        subtitle: "Escopo limpo · for (init; declaracao : colecao) prevenindo dangling references",
        theory: "No C++20, o range-based for foi aprimorado para suportar uma declaração de inicialização: for (init; tipo elem : colecao). Isso resolve um perigo clássico de variáveis temporárias: ao iterar sobre o retorno de uma função, armazenar o objeto temporário no init impede referências suspensas (dangling references).",
        questions: [
          q("Qual problema crítico o range-based for com init do C++20 foi projetado para resolver?", "Impedir dangling references ao iterar sobre coleções temporárias retornadas por funções", ["Permitir compilar programas sem a função main","Remover a necessidade do compilador"], "Antes do C++20, iterar sobre f().get_itens() destruía f() antes do término do loop, corrompendo a memória."),
          q("Qual é a sintaxe correta de um range-based for com inicializador no C++20?", "for (auto registros = obter_dados(); const auto& r : registros)", ["for (r : obter_dados() : init)","for (init -> r : dados)"], "A parte inicial (init;) declara o proprietário do recurso que viverá durante todo o tempo do loop."),
          q("Até quando as variáveis declaradas na cláusula init do range-for do C++20 permanecem vivas?", "Até o término completo do laço for, sendo destruídas exatamente ao fim da última iteração", ["Apenas durante a primeira iteração","Por toda a duração do programa"], "O tempo de vida estende-se por todas as iterações, garantindo acesso seguro aos elementos iterados."),
          q("Qual é o benefício de escopo proporcionado pelo range-for com init no C++20?", "Evita poluir o escopo externo com variáveis intermediárias que só são úteis durante a iteração", ["Reduz o tamanho do disco rígido","Desativa otimizações de compilação"], "Mantém as variáveis estritamente limitadas ao bloco onde seu processamento ocorre."),
          t("Qual símbolo de pontuação separa o init da declaração do range-for no C++20?", [";"], "O ponto e vírgula separa a inicialização da iteração.", "# separador de init no range-for"),
          g("Complete o range-for com inicializador protegendo o recurso temporário:", ["for (auto dados = carregar(); const auto& item : dados) {\n    processar(item);\n}"], "O init preserva o container temporário durante todo o ciclo.", "for (auto dados = carregar()____ const auto& item : dados) {\n    processar(item);\n}"),
          o("Ordene as etapas de execução do range-for com inicializador no C++20:", ["Executar a cláusula de inicialização criando o container","Vincular iteradores begin() e end() ao container criado","Percorrer os elementos mantendo o container em memória","Destruir o container inicializado ao sair do laço"], "Ciclo de vida do range-for com init no C++20."),
          p("Associe a funcionalidade ao seu impacto no C++20:", [["for (init; elem : c)","Preserva objetos temporários durante todo o loop"],["Dangling reference","Acesso ilegal a container destruído prematuramente"],["Escopo local do init","Impede que variáveis temporárias vazem na função"],["const auto& no C++20","Lê com segurança elementos do container no init"]], "Evolução e estabilidade do range-for no padrão C++20.")
        ]
      }
    ],
    4: [
      {
        id: "cpp-c04-u4-l1",
        title: "Anatomia do laço while e avaliação de pré-condição",
        subtitle: "Repetição orientada a condição · Execução zero ou mais vezes em C++",
        theory: "A instrução while em C++ repete um bloco de código enquanto uma expressão booleana avaliar como verdadeira: while (condicao). A condição é inspecionada antes de cada ciclo; se for falsa logo na entrada inicial, o corpo do laço nunca é executado (execução zero ou mais vezes).",
        questions: [
          q("Quantas vezes o corpo de um laço while é executado caso sua condição seja falsa logo na entrada?", "Zero vezes; o fluxo desvia imediatamente para além do bloco do while", ["Pelo menos uma vez","Infinitas vezes"], "O laço while é baseado em pré-condição estrita; a conferência precede a primeira iteração."),
          q("O que acontece se a variável de controle da condição nunca for modificada dentro do corpo do while?", "O laço entrará em repetição infinita (loop infinito), travando a thread corrente de execução", ["O compilador interrompe o programa sozinho","O laço converte em for"], "Cabe ao desenvolvedor assegurar que o estado interno do algoritmo convirja para a condição de parada."),
          q("Quando o uso de while é preferível ao uso de um laço for tradicional em C++?", "Quando o número total de iterações é indeterminado e depende de eventos ou leituras externas", ["Quando se quer iterar arrays de tamanho fixo","Quando não se usam ponteiros"], "while expressa com naturalidade loops orientados a estados dinâmicos e fluxos assíncronos."),
          q("Qual tipo de dado é esperado na condição de controle de um laço while em C++?", "Qualquer expressão avaliável como bool (onde inteiros não nulos são true e zero é false)", ["Apenas o tipo double","Exclusivamente ponteiros de classe"], "Expressões relacionais, lógicas e numéricas são convertidas para bool na entrada do laço."),
          t("Qual palavra-chave inicia a estrutura de repetição com teste prévio em C++?", ["while"], "while introduz o laço de pré-condição.", "# comando de repeticao while"),
          g("Complete a estrutura while que aguarda a calibração do sensor:", ["while (!sensor.calibrado()) {\n    sensor.aguardar();\n}"], "while repete enquanto a condição permanecer verdadeira.", "____ (!sensor.calibrado()) {\n    sensor.aguardar();\n}"),
          o("Ordene a rotina executada a cada ciclo de um laço while em C++:", ["Avaliar o valor booleano da expressão de teste no cabeçalho","Desviar para fora do laço caso a avaliação resulte em false","Executar sequencialmente as instruções do corpo do laço","Atualizar os dados de controle e retornar ao teste de cabeçalho"], "Dinâmica de repetição em laço while."),
          p("Associe o estado da condição ao comportamento imediato do while:", [["Condição inicial false","Pula o corpo e segue sem executar nenhuma vez"],["Condição true","Executa o bloco e retorna para nova avaliação"],["Sem alteração de estado","Gera laço infinito travando a execução da thread"],["Fim do bloco atingido","Volta ao cabeçalho para reavaliar a condição"]], "Comportamento operacional do laço while em C++.")
        ]
      },
      {
        id: "cpp-c04-u4-l2",
        title: "Padrão idiomático de leitura com fluxos (while std::cin >> x)",
        subtitle: "I/O como predicado · Conversão de streams para bool na entrada",
        theory: "Em C++, o operador de extração de fluxo std::cin >> var retorna uma referência ao próprio stream (std::istream&). Quando utilizado na condição de um while (std::cin >> x), o stream converte-se implicitamente para bool (via operador bool()), avaliando para true se a leitura foi bem-sucedida e false ao encontrar falha ou EOF.",
        questions: [
          q("Por que o idioma while (std::cin >> dado) é amplamente consagrado em C++?", "Combina a extração de dados e a validação de sucesso do fluxo em uma única expressão elegante", ["Porque compila mais rápido que funções em C","Porque ignora erros de digitação"], "Se o usuário digitar texto inválido ou atingir o fim de arquivo (EOF), o stream falha e o loop encerra limpo."),
          q("O que acontece se uma entrada incompatível (ex: digitar \"texto\" onde se espera um int) for lida?", "O stream ativa a bandeira failbit, a expressão converte para false e o laço while se encerra", ["O programa sofre abort() fatal","O computador emite um bipe sonoro"], "O estado de falha protege o programa contra leituras de lixo e interrompe a extração com segurança."),
          q("Qual método da classe de stream informa se o fim do fluxo foi alcançado?", "std::cin.eof()", ["std::cin.finish()","std::cin.stopped()"], "A bandeira eofbit indica que não há mais caracteres a serem lidos na fonte de entrada."),
          q("O que deve ser feito caso se queira reutilizar o stream std::cin após uma falha de entrada?", "Chamar std::cin.clear() para limpar os bits de erro e descartar caracteres inválidos com ignore()", ["Reiniciar o sistema operacional","Declarar um novo std::cin local"], "Sem limpar as bandeiras de erro, todas as leituras subsequentes continuarão falhando silenciosamente."),
          t("Qual método de um stream em C++ restaura suas bandeiras de erro para o estado normal?", ["clear"], "clear reseta as bandeiras de erro do stream.", "# restauracao de estado de stream"),
          g("Complete o loop padrão de leitura de inteiros da entrada padrão:", ["int valor;\nwhile (std::cin >> valor) {\n    processar(valor);\n}"], "std::cin >> valor avalia para false quando o fluxo encerra ou falha.", "int valor;\nwhile (std::cin ____ valor) {\n    processar(valor);\n}"),
          o("Ordene o processamento do idioma while (stream >> x):", ["Executar a extração dos próximos caracteres do fluxo de entrada","Armazenar o dado extraído na variável informada","Avaliar a conversão implícita do stream para o tipo booleano","Prosseguir no corpo do laço se o stream permanecer em estado válido"], "Mecanismo de validação de streams em C++."),
          p("Associe a bandeira de stream ao seu significado técnico em C++:", [["failbit","Falha de formatação na extração de um tipo"],["eofbit","Fim do arquivo ou fluxo atingido pelo leitor"],["badbit","Erro crítico irrecuperável de integridade no fluxo"],["good()","Estado saudável sem nenhuma bandeira de erro ativa"]], "Diagnóstico de fluxos de entrada e saída em C++.")
        ]
      },
      {
        id: "cpp-c04-u4-l3",
        title: "Laços orientados a sentinelas e controle por flags",
        subtitle: "Sinais de parada · Valores sentinela versus flags booleanas em C++",
        theory: "Um valor sentinela é uma constante especial (como -1 ou EOF) que sinaliza o encerramento de uma série de dados. Alternativamente, flags booleanas expressam estados complexos de controle dentro de laços while. O projeto cuidadoso de sentinelas evita colisões com entradas válidas do domínio de negócio.",
        questions: [
          q("O que é um valor sentinela em algoritmos de repetição?", "Um valor de dado específico reservado exclusivamente para sinalizar o fim da entrada", ["O endereço de um ponteiro na stack","A velocidade máxima de uma iteração"], "O loop processa as entradas continuamente até detectar o valor sentinela, momento em que finaliza."),
          q("Qual é o perigo de escolher um número comum (como zero) como valor sentinela?", "Zero pode ser uma leitura válida legítima no domínio da aplicação (ex: temperatura de 0 graus)", ["Faz o compilador travar","Otimiza o código em excesso"], "Se o sentinela pertencer ao conjunto de dados válidos, leituras reais serão descartadas precocemente."),
          q("Quando uma flag booleana (ex: bool executando = true) é mais indicada que sentinelas?", "Quando o encerramento do laço depende de múltiplos eventos concorrentes ou comandos de parada", ["Quando o programa não usa memória","Apenas para matrizes bidimensionais"], "Flags encapsulam condições compostas tornando a intenção do código legível e configurável."),
          q("Em aplicações modernas de C++, qual tipo representa a ausência de valor de forma mais segura que sentinelas numéricos?", "std::optional (da biblioteca <optional> do C++17)", ["void*","char nulo"], "std::optional indica se há um valor válido presente sem reservar valores mágicos que possam colidir."),
          t("Qual palavra em português define a variável booleana usada para sinalizar status em um laço?", ["bandeira"], "Bandeira ou flag sinaliza o estado de execução.", "# sinalizador de controle em loop"),
          g("Complete o while orientado a flag booleana de interrupção:", ["bool continuar = true;\nwhile (continuar) {\n    if (evento_fim()) continuar = false;\n}"], "A alteração da flag para false encerra a repetição no próximo ciclo.", "bool continuar = true;\nwhile (____) {\n    if (evento_fim()) continuar = false;\n}"),
          o("Ordene o fluxo de processamento de uma série com sentinela de fim (-1):", ["Ler a próxima medição do sensor","Verificar se a medição corresponde ao valor sentinela (-1)","Interromper o laço caso o sentinela seja confirmado","Processar e computar o dado caso seja um valor legítimo"], "Padrão de processamento com sentinela em C++."),
          p("Associe a técnica de controle ao seu cenário de aplicação no C++:", [["Valor Sentinela","Sinal de parada embutido na própria sequência de dados"],["Flag Booleana","Variável explícita de controle de estado do processo"],["std::optional","Encapsula ausência de dados sem números mágicos"],["break direto","Aborta imediatamente ao detectar comando de encerramento"]], "Estratégias de sinalização de encerramento de repetição.")
        ]
      },
      {
        id: "cpp-c04-u4-l4",
        title: "Prevenção de laços infinitos e atualização de variáveis",
        subtitle: "Correção algorítmica · Garantindo convergência e terminação estrita",
        theory: "Um laço infinito involuntário ocorre quando a condição de parada de um while jamais avalia para false, tipicamente por esquecimento da instrução de incremento ou atualização. Para garantir a terminação, o algoritmo deve comprovar que cada iteração reduz a distância em relação ao critério de parada.",
        questions: [
          q("Qual é a causa mais frequente de laços infinitos acidentais em repetições while?", "Esquecer de atualizar a variável de controle no corpo do laço (ex: esquecer o ++contador)", ["Declarar variáveis locais com chaves","Usar includes da biblioteca padrão"], "Se a variável testada no cabeçalho permanecer estática, a condição será eternamente verdadeira."),
          q("Como provar matematicamente que um laço while irá convergir e terminar com certeza?", "Demonstrando uma função variante: um valor inteiro estritamente decrescente limitado inferiormente", ["Medindo os GHz do processador","Compilando com -O3"], "Se a variante diminui a cada passo e tem limite inferior fixo, o laço obrigatoriamente encerrará."),
          q("O que acontece se uma variável de controle do tipo unsigned int for decrementada indefinidamente?", "Ocorre wraparound para 4.294.967.295 quando atinge zero, mantendo i >= 0 eternamente verdadeiro", ["A CPU dispara uma interrupção de erro","A variável fica congelada em zero"], "Bugs de unsigned em laços regressivos são causas clássicas de laços infinitos na indústria de software."),
          q("Qual ferramenta pode ajudar a detectar laços infinitos ou bloqueios durante a execução?", "Timeouts monitorados por temporizadores, watchdogs de hardware ou depuradores interativos", ["Formatador automático de texto","Calculadora de bits"], "Watchdogs e temporizadores reiniciam ou interrompem rotinas que excedem o tempo máximo estipulado."),
          t("Qual termo técnico define a função numérica estritamente decrescente que garante a parada do laço?", ["variante"], "A função variante comprova a convergência do algoritmo.", "# funcao variante de laco"),
          g("Complete o corpo do laço assegurando a convergência do contador:", ["int tentativas = 5;\nwhile (tentativas > 0) {\n    processar();\n    --tentativas;\n}"], "O decremento aproxima a variável de zero, garantindo a parada.", "int tentativas = 5;\nwhile (tentativas > 0) {\n    processar();\n    ____;\n}"),
          o("Ordene a análise de garantia de terminação de um algoritmo com while:", ["Identificar a condição de término estipulada no cabeçalho","Localizar a variável de controle inspecionada","Verificar se o corpo modifica a variável em direção ao encerramento","Confirmar que nenhuma ramificação interna ignora a atualização"], "Auditoria de convergência e término em C++."),
          p("Associe o defeito lógico ao sintoma manifestado no laço:", [["Sem incremento na variável","Loop infinito travando o fluxo da aplicação"],["Unsigned em regressão","Underflow que mantém i >= 0 permanentemente verdadeiro"],["Condição invertida (> vs <)","Não execução do corpo ou repetição descontrolada"],["Atualização dentro de if falso","Variável congelada por ramificação não alcançada"]], "Análise de falhas em repetições e convergência em C++.")
        ]
      },
      {
        id: "cpp-c04-u4-l5",
        title: "Invariantes de laço e comprovação algorítmica",
        subtitle: "Engenharia formal · Afirmações verdadeiras na entrada, no ciclo e na saída",
        theory: "Um invariante de laço é uma asserção lógica que permanece verdadeira antes do laço, no início de cada iteração e imediatamente após o encerramento. Invariantes são a base da verificação formal de algoritmos e garantem que o estado acumulado (como somatórios e contagens) preserve a correção do programa.",
        questions: [
          q("O que é formalmente um invariante de laço na ciência da computação?", "Uma propriedade lógica que é verdadeira antes e depois de cada iteração do laço", ["Uma variável cujo valor é fixo e nunca muda","Um erro detectado em tempo de compilação"], "Invariantes garantem que a transição de cada estado intermediário conduza ao resultado final correto."),
          q("Quais são as três etapas obrigatórias para demonstrar a correção por invariante de laço?", "Inicialização (base), Manutenção (passo indutivo) e Término (conclusão do algoritmo)", ["Alocação, compilação e execução","Entrada, saída e impressão"], "Espelha o princípio da indução matemática: provar a base, a preservação do passo e o estado final."),
          q("No algoritmo de busca binária, qual é o invariante fundamental sobre o intervalo [inicio, fim]?", "O elemento buscado (se existir na coleção) estará contido no intervalo fechado [inicio, fim]", ["O intervalo sempre terá tamanho par","O elemento estará sempre na posição zero"], "Ao encolher o intervalo pela metade a cada ciclo, o invariante assegura que o alvo não foi descartado."),
          q("Qual macro da biblioteca padrão <cassert> pode ser utilizada para validar invariantes em depuração?", "assert(expressao) (desativada quando NDEBUG está definido)", ["check(expressao)","verify(expressao)"], "assert verifica premissas em tempo de desenvolvimento sem impor custo de execução em builds de release."),
          t("Qual cabeçalho da biblioteca padrão do C++ fornece a macro assert para conferir invariantes?", ["cassert"], "<cassert> fornece a macro de asserção.", "# cabecalho de assercoes da stl"),
          g("Complete a asserção que protege o invariante de índice não negativo no laço:", ["assert(indice >= 0);\nwhile (indice < tamanho) {\n    consumir(itens[indice]);\n    ++indice;\n}"], "assert valida asserções lógicas durante testes e depuração.", "____(indice >= 0);\nwhile (indice < tamanho) {\n    consumir(itens[indice]);\n    ++indice;\n}"),
          o("Ordene as três etapas formais de verificação de um invariante de repetição:", ["Inicialização: invariante é verdadeiro antes da primeira repetição","Manutenção: se for verdadeiro antes da iteração, permanece após ela","Término: na saída do laço, o invariante prova a correção do resultado","Pós-condição: assert formal garantindo o estado esperado dos dados"], "Etapas da prova de correção por indução de invariantes."),
          p("Associe a fase do invariante de laço ao seu significado no C++:", [["Inicialização","Verdadeiro antes de entrar na primeira iteração"],["Manutenção","Preservado intacto após o processamento do corpo"],["Término","Entrega a propriedade desejada ao encerrar o laço"],["assert de invariante","Checagem ativa em compilações de teste e debug"]], "Fundamentos formais de invariantes de laço.")
        ]
      }
    ],
    5: [
      {
        id: "cpp-c04-u5-l1",
        title: "Anatomia do laço do...while e garantia de execução mínima",
        subtitle: "Pós-condição · Garantia estrita de ao menos uma iteração em C++",
        theory: "A estrutura do...while em C++ executa o bloco de instruções antes de inspecionar a condição: do { ... } while (condicao);. Isso assegura que o corpo rode pelo menos uma vez, sendo a escolha ideal quando a verificação depende de dados gerados ou coletados na primeira passagem do algoritmo.",
        questions: [
          q("Qual é a garantia fundamental que distingue o laço do...while do laço while clássico?", "O corpo do laço do...while sempre é executado obrigatoriamente pelo menos uma vez", ["O laço do...while não precisa de compilação","O laço do...while nunca pode ser infinito"], "Como a expressão condicional fica posicionada ao final, a primeira iteração acontece incondicionalmente."),
          q("Qual caractere de pontuação obrigatório encerra a declaração de um laço do...while em C++?", "O ponto e vírgula (;) imediatamente após o parêntese da condição while", ["Dois-pontos (:)","Não leva nenhuma pontuação"], "Esquecer o ponto e vírgula ao final de do { ... } while (cond); é um erro clássico de sintaxe em C++."),
          q("O que acontece se uma variável for declarada dentro do bloco { } do laço do...while?", "Seu escopo fica restrito ao interior das chaves e ela NÃO pode ser usada na condição while", ["Ela pode ser lida na condição sem problemas","Torna-se global"], "Variáveis necessárias para o teste condicional final devem ser declaradas antes de entrar no do."),
          q("Quando o laço do...while é a solução mais natural no design de algoritmos?", "Quando a condição de parada depende de um dado que só pode ser produzido dentro do próprio laço", ["Ao iterar vetores somente de leitura","Ao calcular matrizes imutáveis"], "Casos clássicos incluem ler do teclado ou de um socket até obter um valor válido."),
          t("Qual símbolo de pontuação deve obrigatoriamente finalizar o laço do...while em C++?", [";"], "O ponto e vírgula encerra o comando do...while.", "# finalizador de sintaxe do while"),
          g("Complete o encerramento sintático correto da instrução do...while:", ["int tentativas = 0;\ndo {\n    conectar();\n    ++tentativas;\n} while (tentativas < 3);"], "O ponto e vírgula fecha a instrução após o parêntese da condição.", "int tentativas = 0;\ndo {\n    conectar();\n    ++tentativas;\n} while (tentativas < 3)____"),
          o("Ordene o fluxo cronológico das etapas em um laço do...while em C++:", ["Entrar diretamente no bloco do executando o corpo pela primeira vez","Processar cálculos ou coletar dados de entrada de usuários","Avaliar a condição booleana no while de encerramento","Retornar ao bloco do se a condição for true ou prosseguir se false"], "Ciclo de avaliação pós-condicional do...while em C++."),
          p("Associe a estrutura de repetição à sua característica de teste em C++:", [["do ... while","Testa a condição ao final garantindo ao menos uma execução"],["while clássico","Testa a condição antes da primeira execução (0 ou mais)"],["for clássico","Concentra inicialização, teste prévio e passo no cabeçalho"],["Ponto e vírgula final","Exigência sintática exclusiva que encerra o do...while"]], "Comparativo de estruturas de repetição em C++.")
        ]
      },
      {
        id: "cpp-c04-u5-l2",
        title: "Validação de entradas interativas com do...while",
        subtitle: "Filtro de entrada · Repetição até que o dado fornecido seja legítimo",
        theory: "Um dos usos mais consagrados de do...while em C++ é a validação de dados interativos digitados pelo usuário. Como é necessário solicitar e ler o valor ao menos uma vez antes de conferir sua validade, o loop repete a solicitação continuamente até que o dado atenda a todas as faixas e regras estipuladas.",
        questions: [
          q("Por que o laço do...while é ideal para validação de formulários e leituras em console?", "Porque é indispensável solicitar e ler o dado pelo menos uma vez antes de avaliar a validade", ["Porque bloqueia vírus no sistema operacional","Porque dispensa o uso de variáveis"], "Evita duplicar o código de leitura antes do loop e dentro do corpo como ocorreria em um while puro."),
          q("Se a condição de validação de nota escolar for (nota < 0.0 || nota > 10.0), quando o laço repete?", "Repete enquanto a nota for inválida (menor que zero ou maior que dez)", ["Repete quando a nota for válida","Nunca repete"], "A condição do while expressa o critério de continuidade: \"continue solicitando enquanto for inválido\"."),
          q("Como prevenir leituras incorretas caso o usuário digite letras onde se espera um número?", "Verificar o estado de std::cin, limpar as bandeiras com clear() e descartar lixo com ignore()", ["Reiniciar o computador","Desligar o console"], "Tratar falhas de stream evita loops infinitos causados por caracteres espúrios no buffer de entrada."),
          q("Qual operador lógico é comumente usado para combinar múltiplos critérios de rejeição?", "O operador OU lógico (||), repetindo se qualquer uma das regras for violada", ["O operador XOR binário (^)","O operador de bits (~)"], "Se violar o limite inferior OU violar o limite superior, a entrada deve ser solicitada novamente."),
          t("Qual método do stream std::cin descarta caracteres inválidos do buffer de entrada?", ["ignore"], "ignore limpa os caracteres residuais do buffer.", "# descarte de caracteres no buffer"),
          g("Complete o teste de validação exigindo que a quantidade seja estritamente positiva:", ["int qtd;\ndo {\n    std::cout << \"Informe valor positivo: \";\n    std::cin >> qtd;\n} while (qtd <= 0);"], "O laço repete enquanto o número fornecido for menor ou igual a zero.", "int qtd;\ndo {\n    std::cout << \"Informe valor positivo: \";\n    std::cin >> qtd;\n} while (qtd ____ 0);"),
          o("Ordene as etapas recomendadas para validação robusta de entrada com do...while:", ["Exibir mensagem descritiva solicitando o valor ao usuário","Efetuar a leitura do valor na variável com std::cin >> valor","Validar se a leitura teve sucesso ou se o valor viola a regra","Repetir a solicitação caso os dados não atendam ao critério estipulado"], "Padrão de validação de dados com do...while em C++."),
          p("Associe a ação à etapa de validação com do...while no C++:", [["while (x < 1 || x > 100)","Critério de continuidade para entrada fora da faixa"],["std::cout << \"Inválido\\n\"","Feedback imediato orientando nova tentativa"],["std::cin.clear()","Restauração do stream após entrada alfabética incorreta"],["std::cin.ignore(...)","Descarte dos caracteres residuais travados no buffer"]], "Estratégia completa de validação em console no C++.")
        ]
      },
      {
        id: "cpp-c04-u5-l3",
        title: "Menus de console e máquinas de estados simples",
        subtitle: "Navegação interativa · Laço principal de despacho até a opção de saída",
        theory: "Aplicações interativas de terminal frequentemente utilizam do...while para gerenciar o laço principal de interação. O menu exibe as opções disponíveis, coleta a escolha do operador, despacha a ação correspondente via switch e repete o ciclo continuamente até que a opção de encerramento seja selecionada.",
        questions: [
          q("Qual é o papel do laço do...while no controle do menu principal de um console?", "Manter a aplicação aberta e interativa até que o usuário escolha explicitamente sair", ["Gerar gráficos 3D na tela","Traduzir strings para assembly"], "Garante que após a execução de cada funcionalidade o menu seja reapresentado para nova escolha."),
          q("Em um menu com opções 1 a 4, onde 4 encerra, qual é a condição de parada no while?", "while (opcao != 4);", ["while (opcao == 4);","while (true); sem break"], "A repetição continua ativa enquanto o usuário não digitar a opção delimitada para término."),
          q("Como organizar o tratamento das escolhas do usuário dentro do laço do menu?", "Utilizar uma instrução switch (opcao) com um case para cada comando e default para opção inválida", ["Usar múltiplos loops while aninhados","Reiniciar a função main"], "O switch organiza o despacho de comandos de forma limpa, modular e extensível."),
          q("O que deve ser feito ao final da execução de cada opção para evitar que a tela role sem leitura?", "Exibir mensagem de conclusão e aguardar confirmação antes de reapresentar o menu limpo", ["Fechar o executável","Apagar a memória flash"], "Melhora a experiência de uso permitindo ao operador inspecionar os resultados antes do próximo menu."),
          t("Qual instrução comumente trata as opções selecionadas dentro do laço do menu?", ["switch"], "switch despacha a opção selecionada.", "# despacho de opcoes de menu"),
          g("Complete a condição que mantém o menu em execução até a escolha da opção 0 (sair):", ["int opcao;\ndo {\n    exibir_menu();\n    std::cin >> opcao;\n    processar(opcao);\n} while (opcao != 0);"], "O menu repete enquanto a opção for diferente de zero.", "int opcao;\ndo {\n    exibir_menu();\n    std::cin >> opcao;\n    processar(opcao);\n} while (opcao ____ 0);"),
          o("Ordene a rotina padrão de execução de um laço de menu interativo em C++:", ["Apresentar as opções textuais numeradas na saída padrão","Coletar a opção numérica digitada pelo usuário no teclado","Executar a funcionalidade associada através de um switch","Conferir se a opção digitada não foi o comando de saída do sistema"], "Fluxo do ciclo de vida de menus em console C++."),
          p("Associe o componente do menu interativo ao seu papel no sistema:", [["do { ... }","Garante a exibição do menu logo na inicialização"],["switch (opcao)","Despacha a ação selecionada pelo usuário"],["default no menu","Alerta o usuário sobre opção numérica inexistente"],["while (opcao != SAIR)","Condição que sustenta o ciclo ativo da aplicação"]], "Arquitetura de menus em console com C++.")
        ]
      },
      {
        id: "cpp-c04-u5-l4",
        title: "O idioma macro do { ... } while (0) em C++",
        subtitle: "Higiene sintática · Encapsulamento seguro de múltiplas instruções",
        theory: "O idioma do { ... } while (0) é uma técnica clássica utilizada na definição de macros multi-instruções. Ele garante que um grupo de comandos comporte-se sintaticamente como uma única instrução individual terminada em ponto e vírgula, evitando quebras catastróficas ao ser utilizado em blocos if sem chaves.",
        questions: [
          q("Qual problema o idioma macro do { ... } while (0) resolve em código C/C++?", "Garante que uma macro de múltiplas instruções funcione com segurança em instruções if sem chaves", ["Acelera a compilação de cabeçalhos","Permite usar memória sem restrições"], "Sem esse encapsulamento, uma expansão em if (cond) MACRO(); else quebraria o par if/else com erro fatal."),
          q("Quantas vezes o corpo de do { ... } while (0) é executado em tempo de execução?", "Exatamente uma única vez, pois a condição constante (0) é avaliada como false logo no primeiro teste", ["Zero vezes","Infinitas vezes"], "O compilador otimiza o código eliminando qualquer teste em tempo de execução por ser constante 0."),
          q("Por que substituir do { ... } while (0) por um simples bloco { ... } em macros é arriscado?", "Porque a sintaxe { ... }; gera um ponto e vírgula vazio subsequente que quebra construções if/else", ["Porque chaves não são aceitas em macros","Porque desliga o otimizador"], "Em if (ok) BLOCO(); else ..., o ponto e vírgula após a chave fecha o if prematuramente, deixando o else órfão."),
          q("Qual é a recomendação moderna das C++ Core Guidelines a respeito do uso de macros?", "Evitar macros; utilizar funções inline, templates e funções constexpr que respeitam escopo e tipos", ["Usar macros para toda a lógica","Proibir funções inline"], "C++ moderno oferece abstrações de tipagem e compilação que tornam o pré-processador obsoleto para lógica."),
          t("Qual número constante é avaliado como falso na condição do idioma do { ... } while (0)?", ["0"], "Zero avalia para false encerrando o laço.", "# condicao constante de parada"),
          g("Complete o idioma clássico de proteção de macro em C++:", ["#define LOG(x) do { std::cout << x; } while (0);"], "while (0) garante execução única e consumo correto do ponto e vírgula.", "#define LOG(x) do { std::cout << x; } while (____);"),
          o("Ordene a análise de expansão sintática de uma macro protegida por do...while(0):", ["Definição da macro encapsulada com do { acao1(); acao2(); } while (0)","Chamada da macro com ponto e vírgula: MACRO();","Expansão do pré-processador formando do { ... } while (0);","Compilação segura como instrução única sem romper blocos if/else"], "Funcionamento do idioma idiomático do...while(0)."),
          p("Associe o formato da macro ao seu risco potencial de compilação:", [["do { ... } while (0)","Sintaxe segura que aceita ponto e vírgula final"],["{ a(); b(); } com ponto e vírgula","Gera erro de else órfão em condicionais sem chaves"],["a(); b(); sem chaves","Executa apenas a primeira instrução sob o if"],["inline constexpr em C++","Alternativa moderna e tipada superior a macros"]], "Higiene sintática de abstrações em C++.")
        ]
      },
      {
        id: "cpp-c04-u5-l5",
        title: "Critérios arquiteturais de escolha de estruturas de laço",
        subtitle: "Engenharia de software · Decisão entre for, while, do...while e algoritmos STL",
        theory: "A escolha da estrutura de repetição comunica a intenção do algoritmo. Utiliza-se range-for para varredura de coleções, for clássico quando o índice é necessário, while para iterações orientadas a condições dinâmicas e do...while quando a execução prévia é indispensável. Em C++, algoritmos da STL frequentemente superam loops manuais.",
        questions: [
          q("Quando a escolha de um range-based for é estritamente a melhor decisão arquitetural?", "Ao percorrer todos os elementos de um container sem necessidade de manipular índices numéricos", ["Quando se quer alterar o tamanho do vetor durante o laço","Ao ler dados de teclado"], "Garante simplicidade, clareza e imunidade contra violações de memória e índices incorretos."),
          q("Qual estrutura de repetição deve ser escolhida quando a condição de parada depende de eventos?", "O laço while orientado a pré-condição", ["O laço for tradicional com três cláusulas vazias","Recursão irrestrita"], "while reflete diretamente a semântica \"enquanto o evento persistir, continue executando\"."),
          q("Por que as C++ Core Guidelines recomendam preferir algoritmos da STL (std::ranges) a laços crus?", "Algoritmos padronizados (std::ranges::for_each, etc.) expressam intenção clara e evitam bugs triviais", ["Loops crus são proibidos pelo compilador","A STL desativa a memória cache"], "Algoritmos declarativos comunicam instantaneamente se a intenção é busca, transformação, soma ou ordenação."),
          q("Em qual cenário o laço do...while é indispensável em relação ao while tradicional?", "Quando os dados inspecionados pela condição só passam a existir após a primeira iteração", ["Ao ler uma lista imutável","Ao somar constantes em compilação"], "Elimina redundância de código garantindo execução preliminar obrigatória."),
          t("Qual biblioteca de C++20 oferece algoritmos modernos e encadeáveis que substituem laços crus?", ["ranges"], "std::ranges introduz pipelines funcionais de algoritmos.", "# biblioteca de ranges do c++20"),
          g("Complete a busca moderna substituindo um laço for cru por algoritmo STL:", ["auto it = std::find(v.begin(), v.end(), 42);"], "std::find substitui laços manuais de busca sequencial.", "auto it = std::____(v.begin(), v.end(), 42);"),
          o("Ordene a hierarquia de preferência de código segundo as C++ Core Guidelines:", ["Preferir algoritmos padronizados da STL e std::ranges","Usar range-based for loop com const auto& para leitura de dados","Usar for clássico indexado quando o índice numérico for imprescindível","Usar while ou do...while para fluxos baseados em eventos e I/O"], "Hierarquia de escolha de repetição moderna em C++."),
          p("Associe o problema à estrutura de repetição mais idiomática em C++:", [["Percorrer vetor de strings","range-based for com const auto&"],["Coletar e validar senha do usuário","do...while com leitura obrigatória inicial"],["Consumir fila de mensagens de rede","while orientado ao estado da conexão"],["Transformar todos os itens da coleção","std::ranges::transform ou for com auto&"]], "Mapeamento de padrões de repetição idiomáticos em C++.")
        ]
      }
    ],
    6: [
      {
        id: "cpp-c04-u6-l1",
        title: "A instrução break e a interrupção prematura de laços",
        subtitle: "Saída antecipada · Otimização de busca e terminação imediata",
        theory: "A instrução break em C++ encerra imediatamente a execução do laço de repetição mais interno (for, while ou do...while), desviando o controle do programa para a primeira instrução seguinte após o bloco. É amplamente empregada em buscas para interromper o processamento assim que o elemento é localizado.",
        questions: [
          q("Qual é o efeito imediato da instrução break quando executada dentro de um laço em C++?", "Encerra o laço mais interno imediatamente e transfere o controle para a instrução seguinte fora dele", ["Reinicia o laço a partir do primeiro índice","Pula para a próxima iteração do mesmo laço"], "Interrompe o ciclo de repetição sem avaliar a condição de término do cabeçalho novamente."),
          q("Por que o uso de break é considerado uma otimização fundamental em algoritmos de busca linear?", "Evita continuar percorrendo o restante de uma coleção extensa após o item desejado já ter sido achado", ["Reduz o uso de memória estática","Converte a busca em binária"], "Se o alvo estiver no primeiro elemento de uma lista de um milhão de registros, economiza 999.999 passos."),
          q("O que acontece se um break for acionado dentro de laços aninhados (um laço dentro de outro)?", "Interrompe apenas o laço imediatamente circundante mais interno, mantendo o laço externo rodando", ["Interrompe todos os laços aninhados simultaneamente","Causa erro de sintaxe"], "Em C++, o comando break opera com escopo estrito ao loop mais próximo no qual reside."),
          q("Em quais estruturas da linguagem C++ a instrução break é sintaticamente válida?", "Dentro de laços for, while, do...while e blocos case da instrução switch", ["Dentro de qualquer bloco if solto","Em declarações de structs"], "O compilador gera erro de sintaxe se um break for colocado fora de laços ou de um switch."),
          t("Qual instrução em C++ aborta imediatamente o laço de repetição em andamento?", ["break"], "break interrompe e sai do loop atual.", "# comando de quebra de loop"),
          g("Complete a busca interrompendo o laço assim que o alvo for identificado:", ["for (int id : lista) {\n    if (id == alvo) {\n        encontrado = true;\n        break;\n    }\n}"], "break encerra o laço assim que o registro correspondente é encontrado.", "for (int id : lista) {\n    if (id == alvo) {\n        encontrado = true;\n        ____;\n    }\n}"),
          o("Ordene a sequência de eventos ao disparar um break em uma busca linear:", ["Iterar sobre o elemento atual da coleção","Detectar que o elemento atende ao critério de busca","Executar a instrução imperativa break","Desviar o ponteiro de instrução para fora do bloco do laço"], "Dinâmica de interrupção com break em C++."),
          p("Associe o comportamento da interrupção à estrutura onde reside:", [["break em loop simples","Sai imediatamente para a linha seguinte fora do bloco"],["break em loop aninhado","Finaliza apenas o laço interno mantendo o externo ativo"],["break em switch","Impede a invasão indesejada no case seguinte (fallthrough)"],["break fora de laço ou switch","Erro de compilação apontado pelo analisador sintático"]], "Escopos de atuação da instrução break em C++.")
        ]
      },
      {
        id: "cpp-c04-u6-l2",
        title: "A instrução continue e o salto da iteração corrente",
        subtitle: "Filtro de dados · Descarte imediato e avanço para o próximo ciclo",
        theory: "A instrução continue em C++ encerra prematuramente apenas a iteração atual do laço mais interno, saltando o restante do código do corpo e avançando imediatamente para a próxima iteração. É uma ferramenta indispensável para filtrar ruídos, ignorar registros nulos e manter o corpo do laço limpo.",
        questions: [
          q("Qual é a diferença fundamental entre as instruções break e continue em C++?", "break encerra o laço definitivamente; continue apenas salta para a próxima iteração do mesmo laço", ["break reinicia o contador em zero; continue não","continue fecha o programa"], "continue descarta apenas o ciclo presente, continuando com os ciclos subsequentes da sequência."),
          q("Como o uso de continue auxilia na redução de aninhamento de código dentro de laços?", "Permite tratar e descartar entradas indesejadas no topo do corpo sem envolver o resto em if gigantes", ["Elimina a necessidade de compilação","Substitui todas as variáveis locais"], "Atua como uma cláusula de guarda iterativa, mantendo a lógica de processamento no nível zero de indentação."),
          q("O que acontece se uma instrução continue for acionada em um laço com múltiplos níveis?", "Apenas a iteração do laço mais interno no qual reside é antecipada", ["Todos os laços avançam em sincronia","O laço externo é cancelado"], "Assim como o break, continue atua estritamente sobre a estrutura de repetição mais interna."),
          q("Em qual contexto o continue é especialmente idiomático em pipelines de processamento?", "Filtros de dados: ignorar itens inativos, elementos nulos ou dados com flags de descarte", ["Cálculo de médias totais obrigatórias","Alocação de arquivos de sistema"], "Permite ignorar dados espúrios logo no primeiro teste, preservando o caminho feliz de processamento."),
          t("Qual instrução em C++ desvia a execução para o próximo ciclo de repetição do laço?", ["continue"], "continue avança para o próximo ciclo.", "# comando de salto de iteracao"),
          g("Complete o filtro descartando números ímpares com a instrução continue:", ["for (int n : numeros) {\n    if (n % 2 != 0) continue;\n    somar_par(n);\n}"], "continue descarta os ímpares sem executar o somatório abaixo.", "for (int n : numeros) {\n    if (n % 2 != 0) ____;\n    somar_par(n);\n}"),
          o("Ordene a linha do tempo de execução de uma iteração que aciona continue:", ["Entrar na iteração atual do laço com os dados vigentes","Avaliar uma condição de filtro no topo do corpo","Acionar a instrução continue ao constatar dado irrelevante","Saltar o restante do corpo e transferir controle para o próximo ciclo"], "Ciclo de processamento com continue em C++."),
          p("Associe o efeito da instrução de salto ao controle de repetição:", [["continue","Ignora as instruções restantes e avança ao próximo ciclo"],["break","Aborta definitivamente a estrutura inteira de repetição"],["Filtro de guarda","Combinação de if com continue para rejeitar dados inválidos"],["Corpo abaixo do continue","Linhas de código ignoradas durante o ciclo presente"]], "Mecanismos de controle de fluxo de iteração em C++.")
        ]
      },
      {
        id: "cpp-c04-u6-l3",
        title: "Diferenças de salto do continue em laços for versus while",
        subtitle: "Comportamento sutil · Para onde o continue desvia em cada constructo",
        theory: "Um detalhe crucial em C++ é o destino exato da instrução continue: no laço for, ela desvia para a expressão de passo (ex: ++i) antes do teste condicional; já no laço while, desvia diretamente para a reavaliação da condição de teste. Se a atualização do while estiver abaixo do continue, cria-se um laço infinito.",
        questions: [
          q("Para onde a instrução continue desvia o fluxo quando executada dentro de um laço for?", "Para a cláusula de passo no cabeçalho (ex: ++i), executando o incremento normalmente", ["Diretamente para fora do for","Para a inicialização int i = 0"], "No for, o incremento é executado mesmo quando a iteração é pulada por um continue."),
          q("Por que usar continue em um laço while exige cuidado redobrado com a variável de controle?", "Se a instrução ++i estiver após o continue, o incremento será pulado e o laço ficará infinito", ["Porque o while trava o sistema operacional","Porque a condição vira zero"], "Como o continue salta diretamente para o teste no cabeçalho do while, a variável pode nunca mudar de valor."),
          q("Como prevenir laços infinitos ao usar continue dentro de uma estrutura while?", "Garantir que a variável de controle seja incrementada antes do continue ou usar for clássico", ["Declarar o contador como float","Remover a condição do while"], "Migrar para o laço for é a forma mais idiomática e segura de garantir o incremento regular."),
          q("No laço do...while, para onde o comando continue transfere o controle do programa?", "Para a expressão condicional no while (...) ao final do bloco", ["Para o topo do do sem testar nada","Para fora da função"], "No do...while, o teste pós-condicional é invocado imediatamente após o salto do continue."),
          t("Qual parte do cabeçalho do laço for é executada imediatamente após um continue?", ["passo"], "A cláusula de passo (++i) é avaliada.", "# clausula de atualizacao do for"),
          g("Complete o while garantindo o incremento do contador antes de acionar o continue:", ["while (i < 10) {\n    if (ignorar(i)) {\n        ++i;\n        continue;\n    }\n    processar(i);\n    ++i;\n}"], "O contador precisa ser atualizado antes de pular a iteração.", "while (i < 10) {\n    if (ignorar(i)) {\n        ____;\n        continue;\n    }\n    processar(i);\n    ++i;\n}"),
          o("Ordene a trajetória de controle de um continue dentro de um laço for tradicional:", ["Execução do comando continue no corpo do laço","Desvio imediato para a cláusula de passo (++i) no cabeçalho","Execução do incremento da variável de controle","Avaliação da condição lógica para autorizar o próximo ciclo"], "Trajetória do continue no for tradicional em C++."),
          p("Associe a estrutura de repetição ao destino do comando continue:", [["for clássico","Desvia para a cláusula de passo (++i) no cabeçalho"],["while clássico","Desvia diretamente para a condição de teste no cabeçalho"],["do ... while","Desvia diretamente para a condição final while(...)"],["Incremento após continue no while","Código inalcançável gerando risco de loop infinito"]], "Destinos exatos do continue em cada estrutura de controle C++.")
        ]
      },
      {
        id: "cpp-c04-u6-l4",
        title: "Interrupção em laços aninhados e técnicas de escape",
        subtitle: "Múltiplos níveis · Flags de parada, return antecipado e goto controlado",
        theory: "Como a instrução break encerra apenas o laço mais interno em C++, escapar de múltiplos laços aninhados exige padrões específicos: isolar os laços em uma função dedicada e emitir return antecipado, utilizar flags booleanas de controle ou empregar um salto goto para um rótulo claramente posicionado na saída.",
        questions: [
          q("Qual é a técnica mais elegante e idiomática em C++ moderno para escapar de laços aninhados?", "Extrair os laços para uma função separada e utilizar return precoce no ponto de saída", ["Usar 10 instruções break seguidas","Desligar a checagem de tipos"], "O retorno de função finaliza imediatamente todos os níveis de laços de forma limpa e sem efeitos colaterais."),
          q("Como funciona a técnica de controle por flags booleanas para escapar de laços bidimensionais?", "Uma flag booleana é marcada como false no laço interno e o laço externo inspeciona a flag para dar break", ["A flag reinicia o processador","As variáveis são apagadas"], "Permite que a intenção de interrupção seja propagada hierarquicamente entre os níveis de repetição."),
          q("Por que o uso de goto é aceito pelas C++ Core Guidelines em escapes de laços multinível?", "Porque um goto para frente para um rótulo logo após o fim dos laços é limpo e legível", ["Porque goto roda mais rápido que funções","Porque goto permite criar loops infinitos"], "Regra ES.76: o uso de goto restrito a saltos para frente para escape de laços complexos é aceitável."),
          q("Qual perigo o salto por goto pode introduzir se mal utilizado em C++?", "Saltar sobre a declaração de variáveis com construtores que não tenham escopo fechado", ["Corromper o binário em disco","Impedir o uso da GPU"], "O compilador impede saltos sobre inicializações de objetos ativos no mesmo escopo."),
          t("Qual instrução em C++ desvia o fluxo para um identificador de rótulo específico?", ["goto"], "goto transfere controle para um rótulo.", "# comando de salto incondicional"),
          g("Complete o escape limpo de laço duplo através de retorno antecipado de função:", ["bool buscar_matriz(const Matriz& m, int alvo) {\n    for (const auto& linha : m) {\n        for (int valor : linha) {\n            if (valor == alvo) return true;\n        }\n    }\n    return false;\n}"], "return antecipado finaliza ambos os laços instantaneamente.", "bool buscar_matriz(const Matriz& m, int alvo) {\n    for (const auto& linha : m) {\n        for (int valor : linha) {\n            if (valor == alvo) ____ true;\n        }\n    }\n    return false;\n}"),
          o("Ordene as alternativas de escape multinível por ordem de preferência segundo as boas práticas:", ["Extração dos laços para função dedicada com return precoce","Sinalização hierárquica por flag booleana inspecionada","Salto controlado com goto para frente logo após o término dos loops","Múltiplos breaks desordenados com variáveis globais soltas"], "Hierarquia de preferência arquitetural de escapes em C++."),
          p("Associe a técnica de escape ao seu benefício principal no C++:", [["Função com return precoce","Escape limpo e imediato sem necessidade de flags extras"],["Flag booleana de parada","Controle explícito de fluxo sem uso de instruções de salto"],["goto para frente","Salto direto de escape sem aninhamento adicional de ifs"],["break simples","Insuficiente por interromper apenas o laço interno"]], "Estratégias de saída de múltiplos laços em C++.")
        ]
      },
      {
        id: "cpp-c04-u6-l5",
        title: "Boas práticas de legibilidade e complexidade ciclomática",
        subtitle: "Engenharia de código · Mantendo funções coesas e de baixo acoplamento",
        theory: "Laços de repetição densos com múltiplos breaks e continues elevam a complexidade ciclomática de um algoritmo. Boas práticas ditam manter laços pequenos e focados em uma única responsabilidade. Decompor blocos internos em funções auxiliares bem nomeadas torna o código autoexplicativo e facilmente testável.",
        questions: [
          q("O que mede a métrica de complexidade ciclomática em uma função C++?", "O número de caminhos de execução linearmente independentes através do código", ["O peso em megabytes do arquivo compilado","A velocidade do clock da CPU"], "Cada if, for, while, switch e operador ternário adiciona um novo caminho de ramificação."),
          q("Por que uma função com alta complexidade ciclomática é prejudicial à saúde de um projeto?", "Dificulta a leitura, multiplica os casos de testes necessários e facilita o surgimento de bugs sutis", ["Impede que o executável seja copiado","Gera sobrecarga no cabo de rede"], "Funções com muitos caminhos tornam praticamente impossível atingir 100% de cobertura de testes segura."),
          q("Como a técnica de refatoração \"Extract Method\" ajuda a simplificar um laço volumoso?", "Move o código do corpo para uma função auxiliar com nome expressivo, tornando o laço limpo e legível", ["Apaga as variáveis redundantes","Junta todos os arquivos em um"], "O laço passa a ler como uma sequência de alto nível, ocultando detalhes de implementação."),
          q("Qual diretriz das C++ Core Guidelines trata do tamanho e responsabilidade de funções?", "Funções devem ser curtas, fazer apenas uma coisa e ter nomes que reflitam claramente sua intenção", ["Funções devem ter no mínimo 200 linhas","Toda função deve ter variáveis estáticas"], "Regra F.2 e F.3: funções pequenas e focadas são mais fáceis de raciocinar, testar e otimizar."),
          t("Qual métrica de engenharia quantifica a quantidade de ramificações independentes no código?", ["ciclomatica"], "A complexidade ciclomática mede caminhos de código.", "# metrica de complexidade de caminhos"),
          g("Complete o laço limpo delegando a lógica interna para uma função auxiliar expressiva:", ["for (const auto& pacote : fila) {\n    if (!pacote.valido()) continue;\n    processar_pacote(pacote);\n}"], "A delegação para funções bem nomeadas mantém o laço enxuto.", "for (const auto& pacote : fila) {\n    if (!pacote.valido()) continue;\n    ____(pacote);\n}"),
          o("Ordene os passos para refatorar um laço de repetição excessivamente complexo:", ["Calcular ou observar a alta complexidade ciclomática do trecho","Identificar responsabilidades secundárias no corpo do laço","Extrair os blocos internos para funções auxiliares nomeadas","Validar o comportamento através de testes unitários focados"], "Fluxo de refatoração para redução de complexidade."),
          p("Associe o princípio de engenharia ao seu efeito no código C++:", [["Complexidade ciclomática baixa","Menos caminhos e facilidade de testes unitários"],["Extração de funções","Corpo de laço expressivo e documentado pelo nome"],["Responsabilidade única","Função focada exclusivamente em uma tarefa"],["Cláusulas de guarda no loop","Redução do nível de aninhamento e pirâmides"]], "Princípios de design e manutenibilidade em C++.")
        ]
      }
    ],
    7: [
      {
        id: "cpp-c04-u7-l1",
        title: "Padrões de acumulação aditiva e somatórios numéricos",
        subtitle: "Acumuladores · Inicialização com zero neutro e perigos de overflow",
        theory: "A acumulação aditiva em C++ combina uma série de valores numéricos em uma única variável totalizadora: soma += valor. O acumulador deve ser inicializado obrigatoriamente com o elemento neutro da adição (zero) e possuir um tipo suficientemente largo (como long long) para prevenir overflow aritmético.",
        questions: [
          q("Qual elemento neutro deve obrigatoriamente inicializar um acumulador de soma aditiva?", "O número zero (0 ou 0.0), que não altera o valor do primeiro termo somado", ["O número um (1)","O valor -1"], "Iniciar com qualquer valor diferente de zero insere viés incorreto no total final calculado."),
          q("O que acontece se uma variável acumuladora inteira local for declarada sem inicializador (int total;)?", "Ela conterá lixo aleatório de memória da pilha, produzindo somatórios imprevisíveis e incorretos", ["O compilador zera a variável sozinho","Ela é tipada como booleana"], "Em C++, variáveis locais primitivas não são zeradas automaticamente na stack."),
          q("Por que somar uma lista longa de inteiros int de 32 bits pode exigir um acumulador long long de 64 bits?", "Para evitar overflow aritmético, pois a soma cumulativa pode facilmente exceder 2 bilhões", ["Para a GPU aceitar a operação","Porque int não aceita números ímpares"], "O estouro de inteiros com sinal (signed overflow) em C++ é comportamento indefinido estrito."),
          q("Qual operador composto de atribuição é o padrão idiomático para somatórios em C++?", "O operador += (ex: soma += parcela)", ["O operador =+","O operador :="], "+= aplica a soma e reatribuição diretamente ao registrador ou endereço de memória da variável."),
          t("Qual número inteiro representa o elemento neutro para acumulações de soma?", ["0"], "Zero é o neutro aditivo.", "# elemento neutro da adicao"),
          g("Complete o somatório acumulando o valor da leitura analógica:", ["int total = 0;\nfor (int v : leituras) {\n    total += v;\n}"], "+= soma a parcela ao total acumulado.", "int total = 0;\nfor (int v : leituras) {\n    total ____ v;\n}"),
          o("Ordene as etapas corretas para calcular o somatório de uma sequência de dados:", ["Declarar a variável acumuladora com tipo amplo de 64 bits","Inicializar explicitamente o acumulador com zero neutro {0}","Percorrer a coleção somando cada parcela com o operador +=","Retornar ou inspecionar o montante consolidado final"], "Ciclo de acumulação aditiva segura em C++."),
          p("Associe o aspecto da acumulação ao seu princípio técnico em C++:", [["Acumulador = 0","Elemento neutro da soma prevenindo lixo da stack"],["long long soma","Tipo de 64 bits imune a overflow de 32 bits"],["Operador +=","Sintaxe idiomática de agregação direta in-place"],["Overflow com sinal","Comportamento indefinido por estouro de capacidade"]], "Diretrizes de integridade em somas cumulativas.")
        ]
      },
      {
        id: "cpp-c04-u7-l2",
        title: "Acumulação multiplicativa: produtórios e fatoriais",
        subtitle: "Escala exponencial · Inicialização com um neutro e crescimento rápido",
        theory: "A acumulação multiplicativa combina fatores através do operador *=: produto *= fator. Diferente da soma, o elemento neutro da multiplicação é o número 1. Por crescerem exponencialmente, produtórios como fatoriais estouram rapidamente a capacidade de inteiros primitivos, exigindo tipos de 64 bits.",
        questions: [
          q("Qual valor neutro deve inicializar um acumulador multiplicativo em C++?", "O número um (1 ou 1.0), pois qualquer número multiplicado por 1 preserva sua identidade", ["O número zero (0)","O valor 2"], "Se inicializado com zero, o resultado permanecerá perpetuamente zerado em qualquer multiplicação."),
          q("Qual é o maior fatorial que cabe precisamente dentro de um inteiro sem sinal uint64_t de 64 bits?", "20! (fatorial de 20), pois 21! ultrapassa 18 quintilhões (2^64 - 1)", ["100!","50!"], "Fatoriais crescem em ritmo superexponencial, ultrapassando os limites da arquitetura em poucos passos."),
          q("O que acontece se multiplicarmos qualquer valor por um acumulador acidentalmente zerado?", "O acumulador é zerado instantaneamente e nunca mais se recupera nas multiplicações seguintes", ["O programa lança exceção","O compilador gera aviso"], "Zero é o elemento absorvente da multiplicação, corrompendo irreversivelmente a série de fatores."),
          q("Qual operador composto aplica a multiplicação acumulada sobre a variável em C++?", "O operador *= (ex: prod *= fator)", ["O operador **=","O operador ^="], "*= multiplica o valor atual pelo fator à direita e armazena o produto in-place."),
          t("Qual número representa o elemento neutro obrigatório em acumulações multiplicativas?", ["1"], "Um é o neutro multiplicativo.", "# elemento neutro da multiplicacao"),
          g("Complete o cálculo multiplicativo de produto de taxas:", ["double produto = 1.0;\nfor (double taxa : taxas) {\n    produto *= taxa;\n}"], "*= acumula os múltiplos preservando o histórico.", "double produto = 1.0;\nfor (double taxa : taxas) {\n    produto ____ taxa;\n}"),
          o("Ordene os passos para calcular o produto cumulativo de uma série de coeficientes:", ["Declarar a variável de produto com tipo de precisão adequada","Inicializar obrigatoriamente o acumulador com o valor 1","Iterar sobre a sequência multiplicando cada coeficiente com *=","Conferir limites numéricos antes de retornar o resultado"], "Fluxo de cálculo multiplicativo determinístico em C++."),
          p("Associe a operação matemática à regra de acumulação correspondente:", [["Neutro multiplicativo (1)","Preserva o primeiro fator na operação inicial"],["Elemento absorvente (0)","Zera todo o produto caso inserido na multiplicação"],["Operador *=","Aplica multiplicação composta na variável local"],["Fatorial de 20 (20!)","Limite máximo de representação em inteiros de 64 bits"]], "Conceitos de acumulação multiplicativa em C++.")
        ]
      },
      {
        id: "cpp-c04-u7-l3",
        title: "Acumulação de textos e concatenação com std::string",
        subtitle: "Construção de buffers · Pré-alocação reserve() e operador +=",
        theory: "A acumulação de texto em C++ constrói strings longas a partir de fragmentos: texto += fragmento. Para evitar realocações frequentes na heap que degradam a performance, recomenda-se estimar o tamanho e chamar reserve() previamente, ou utilizar std::ostringstream para composições estruturadas complexas.",
        questions: [
          q("Por que acumular strings chamando s += trecho repetidamente sem reserve() pode ser lento?", "Porque cada estouro de capacidade aloca um novo bloco maior na heap e copia todos os caracteres anteriores", ["Porque a memória de vídeo satura","Porque a string trava a compilação"], "Realocações dinâmicas sucessivas causam fragmentação de memória heap e cópias redundantes O(N^2)."),
          q("Qual método da classe std::string pré-aloca capacidade na heap sem alterar seu tamanho lógico?", "str.reserve(tamanho_estimado)", ["str.resize(tamanho_estimado)","str.allocate()"], "reserve() aloca memória interna antecipadamente mantendo size() == 0, pronto para receber += sem cópias."),
          q("Qual é a diferença fundamental entre os métodos reserve() e resize() de std::string?", "reserve apenas reserva capacidade na memória; resize altera o tamanho lógico e preenche caracteres", ["resize não aloca memória","reserve apaga a string"], "Usar resize cria caracteres vazios ('\\0'), fazendo += anexar após o tamanho estipulado em vez do início."),
          q("Qual classe de fluxo em <sstream> é indicada para acumular textos com formatação mista?", "std::ostringstream", ["std::istringstream","std::stringstream_view"], "std::ostringstream suporta operadores << com números, caracteres e formatadores com facilidade."),
          t("Qual método de std::string aloca capacidade interna prévia para evitar realocações na heap?", ["reserve"], "reserve pré-aloca capacidade de memória.", "# pre alocacao de capacidade de string"),
          g("Complete a pré-alocação de memória antes do laço de acumulação de texto:", ["std::string log;\nlog.reserve(1024);\nfor (const auto& msg : eventos) {\n    log += msg;\n}"], "reserve prepara o buffer interno para 1024 caracteres.", "std::string log;\nlog.____(1024);\nfor (const auto& msg : eventos) {\n    log += msg;\n}"),
          o("Ordene a rotina eficiente para construção de uma string composta extensa:", ["Estimar o comprimento em bytes final aproximado do texto","Invocar str.reserve() para alocar o buffer na heap uma única vez","Percorrer as mensagens anexando trechos com o operador +=","Consumir a string montada sem nenhuma realocação adicional"], "Construção otimizada de strings em alta performance C++."),
          p("Associe o método de manipulação de texto ao seu comportamento:", [["str.reserve(n)","Aloca capacidade interna prévia sem alterar size()"],["str.resize(n)","Modifica o tamanho lógico preenchendo novos caracteres"],["operador +=","Anexa caracteres no final da string existente"],["std::ostringstream","Buffer de fluxo para concatenação e formatação mista"]], "Gerenciamento de strings dinâmicas em C++.")
        ]
      },
      {
        id: "cpp-c04-u7-l4",
        title: "Acumulação em coleções dinâmicas com std::vector",
        subtitle: "Agregação estruturada · reserve() e construção in-place com emplace_back",
        theory: "Filtrar ou transformar dados acumulando os resultados em um std::vector é um padrão essencial em C++. Para atingir máxima eficiência, utiliza-se reserve() para pré-alocar o espaço contíguo de memória e emplace_back() para construir os novos elementos diretamente no destino final, eliminando cópias temporárias.",
        questions: [
          q("Qual é a vantagem de chamar emplace_back() em vez de push_back() ao acumular objetos em std::vector?", "emplace_back constrói o objeto diretamente no vetor in-place, repassando argumentos ao construtor", ["emplace_back não usa memória RAM","push_back só funciona para int"], "Evita criar um objeto temporário na stack seguido de construtor de movimento ou cópia no vetor."),
          q("Por que invocar reserve() antes de acumular milhares de itens em um std::vector melhora a performance?", "Impede múltiplas realocações de capacidade que duplicam e movem toda a memória do vetor", ["Desativa a necessidade de ponteiros","Permite usar o vetor em tempo de compilação"], "Sem reserve, o vetor dobra de capacidade repetidamente, invalidando ponteiros e copiando dados."),
          q("O que acontece se utilizarmos o operador v[i] = item para inserir em um vetor vazio?", "Ocorre violação de limite e comportamento indefinido (possível falha de segmentação crash)", ["O vetor expande seu tamanho sozinho","O item é inserido na posição zero"], "O operador de indexação [] não altera a capacidade nem o tamanho; ele assume que a posição já existe."),
          q("Qual método limpa todos os elementos acumulados em um std::vector preservando sua capacidade alocada?", "v.clear()", ["v.shrink_to_fit()","v.destroy()"], "clear() remove os elementos destruindo-os, mas preserva a capacidade (capacity()) para reutilização imediata."),
          t("Qual método moderno de std::vector constrói o elemento diretamente in-place no final do container?", ["emplace_back"], "emplace_back constrói o item no destino.", "# insercao in place no vetor"),
          g("Complete o filtro populando o vetor de aprovados com construção in-place:", ["std::vector<Item> aprovados;\naprovados.reserve(itens.size());\nfor (const auto& i : itens) {\n    if (i.valido()) aprovados.emplace_back(i);\n}"], "emplace_back insere o elemento no final da lista.", "std::vector<Item> aprovados;\naprovados.reserve(itens.size());\nfor (const auto& i : itens) {\n    if (i.valido()) aprovados.____(i);\n}"),
          o("Ordene as etapas profissionais para coletar dados filtrados em um std::vector:", ["Declarar o vetor de destino tipado std::vector<T>","Chamar reserve() com a estimativa máxima da coleção","Percorrer a fonte e testar as condições de inclusão","Inserir os itens qualificados utilizando emplace_back"], "Padrão profissional de acumulação em std::vector."),
          p("Associe a operação com std::vector ao seu impacto de alocação:", [["v.reserve(1000)","Reserva espaço para mil itens sem alterar o size()"],["v.emplace_back(...)","Constrói o elemento diretamente no buffer in-place"],["v.clear()","Zera o tamanho mas mantém a memória alocada viva"],["v.shrink_to_fit()","Libera a capacidade excedente não utilizada na heap"]], "Operações eficientes de coleção em C++.")
        ]
      },
      {
        id: "cpp-c04-u7-l5",
        title: "Acumulação funcional com std::accumulate e std::reduce",
        subtitle: "Algoritmos da STL · <numeric>, redução paralela e funções de dobra (fold)",
        theory: "A biblioteca padrão de C++ provê algoritmos consolidados de redução em <numeric>. Enquanto std::accumulate realiza acúmulo estritamente sequencial da esquerda para a direita, std::reduce (introduzido no C++17) permite execução paralela e reordenação das operações associativas, extraindo máximo poder de CPUs modernas.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão do C++ fornece o algoritmo std::accumulate?", "#include <numeric>", ["#include <algorithm>","#include <iterator>"], "Funções numéricas e estatísticas especializadas residem em <numeric>."),
          q("Qual é a diferença fundamental entre std::accumulate e std::reduce do C++17?", "std::reduce não impõe ordem estrita de avaliação e pode rodar em paralelo com políticas de execução", ["std::accumulate só funciona com floats","std::reduce só aceita vetores vazios"], "Para operadores associativos e comutativos (+, *), std::reduce divide a tarefa em múltiplos núcleos com facilidade."),
          q("Como passar uma operação de acumulação customizada (como multiplicação) para std::accumulate?", "Passando uma expressão lambda ou o functor std::multiplies<T> como quarto argumento", ["Criando uma nova classe estática","Alterando o operador global"], "std::accumulate aceita qualquer invocável binário f(acumulador, elemento)."),
          q("Qual política de execução em <execution> instrui algoritmos como std::reduce a paralelizar o cálculo?", "std::execution::par", ["std::execution::fast","std::execution::auto_mode"], "A flag de política de execução paraleliza automaticamente a redução vetorial."),
          t("Qual cabeçalho da STL deve ser incluído para ter acesso ao algoritmo std::accumulate?", ["numeric"], "<numeric> contém algoritmos de redução.", "# cabecalho de funcoes numericas da stl"),
          g("Complete a chamada funcional que soma todos os inteiros do vetor:", ["int soma = std::accumulate(v.begin(), v.end(), 0);"], "std::accumulate acumula os itens a partir do valor neutro 0.", "int soma = std::____(v.begin(), v.end(), 0);"),
          o("Ordene a estrutura dos argumentos passados para a função std::accumulate:", ["Iterador inicial marcando o começo do intervalo (v.begin())","Iterador final sentinela marcando o término (v.end())","Valor inicial de partida para a variável acumuladora (ex: 0)","Operação binária opcional (lambda ou functor de redução)"], "Assinatura estruturada de std::accumulate em C++."),
          p("Associe o algoritmo da STL à sua característica principal:", [["std::accumulate","Redução sequencial estrita da esquerda para a direita"],["std::reduce (C++17)","Redução paralela com reordenação de operações"],["std::multiplies<T>()","Functor que calcula o produtório dos elementos"],["std::execution::par","Política que divide o trabalho entre threads de CPU"]], "Algoritmos numéricos avançados da STL em C++.")
        ]
      }
    ],
    8: [
      {
        id: "cpp-c04-u8-l1",
        title: "Invariantes de contagem e rastreamento de estados",
        subtitle: "Rigor lógico · Garantia de consistência numérica durante transformações",
        theory: "Um invariante de contagem em C++ assegura que balanços e proporções fundamentais de um sistema mantenham-se coerentes a cada iteração. Em transações financeiras ou balanceamento de parênteses em parsers, verificar se a soma de créditos menos débitos permanece constante detecta corrupções instantaneamente.",
        questions: [
          q("Qual é o invariante fundamental em um analisador léxico que confere o balanceamento de chaves {}?", "O contador de chaves abertas deve ser não negativo em todo o percurso e exatamente zero ao final", ["O contador deve ser sempre maior que dez","Deve haver mais chaves que parênteses"], "Se o contador ficar negativo em qualquer ponto, uma chave foi fechada antes de abrir; se for > 0 ao fim, faltou fechar."),
          q("Por que validar invariantes linha a linha em modo de depuração (debug) é superior a checar só no fim?", "Detecta o ponto exato onde a primeira inconsistência se originou, antes que dados corrompidos se propaguem", ["Acelera a compilação","Reduz o uso de HD"], "Localizar a origem exata da falha economiza horas de investigação em depuração de sistemas complexos."),
          q("Qual macro C++ é ideal para documentar e checar invariantes de contagem durante testes?", "assert(expressao) de <cassert>", ["printf(expressao)","goto invariante"], "assert falha ruidosamente abortando o programa na primeira quebra da condição assumida."),
          q("Em processamento de inventário, qual afirmação representa um invariante estrito de estoque?", "Estoque inicial + Entradas - Saídas == Estoque atual em qualquer instante do processamento", ["Entradas devem ser menores que zero","Saídas devem ser infinitas"], "A preservação estrita do balanço de massas é o invariante formal de qualquer sistema transacional."),
          t("Qual macro da biblioteca padrão deve disparar caso o invariante seja violado?", ["assert"], "assert interrompe se a premissa falhar.", "# macro de validacao de invariantes"),
          g("Complete a checagem que protege contra saldo financeiro inconsistente:", ["assert(saldo >= 0);\nprocessar_saque();"], "assert interrompe se o saldo ficar negativo.", "____(saldo >= 0);\nprocessar_saque();"),
          o("Ordene as fases de validação de invariante de contagem durante uma transferência de fundos:", ["Calcular a soma consolidada das contas de origem e destino antes do evento","Debitar a quantia da conta de saída e creditar na conta receptora","Calcular a nova soma consolidada de ambas as contas","Validar com assert que o saldo total permanece rigorosamente inalterado"], "Preservação de invariante transacional em C++."),
          p("Associe o domínio do problema ao seu invariante característico:", [["Parser de colchetes","Contador de abertos >= 0 durante e == 0 ao final"],["Transferência bancária","Soma total dos saldos inalterada antes e depois"],["Fila de processamento","Total de atendidos mais pendentes igual ao total"],["assert em debug","Verificação ativa de sanidade sem custo em release"]], "Modelagem de invariantes de contagem em software.")
        ]
      },
      {
        id: "cpp-c04-u8-l2",
        title: "Invariantes na busca binária e intervalos ordenados",
        subtitle: "Divisão e conquista · A premissa de ordenação e contração de limites",
        theory: "A busca binária é o exemplo clássico de algoritmo orientado a invariantes. Sua pré-condição exige uma sequência estritamente ordenada. Seu invariante de laço garante que, se o elemento alvo estiver presente, ele residirá obrigatoriamente dentro do intervalo ativo [inicio, fim], reduzindo o espaço pela metade a cada ciclo.",
        questions: [
          q("Qual pré-condição indispensável deve ser satisfeita para que a busca binária funcione corretamente?", "A sequência de elementos deve estar previamente ordenada segundo o critério de comparação", ["O vetor deve conter apenas números pares","O tamanho deve ser potência de dois"], "Sem ordenação prévia, a premissa de descartar metade da coleção gera conclusões completamente errôneas."),
          q("Qual é o invariante de laço preservado na busca binária sobre o intervalo [esquerda, direita]?", "Se o valor procurado existe na coleção, seu índice está dentro do intervalo fechado [esquerda, direita]", ["O valor procurado é sempre o elemento do meio","O intervalo cresce a cada repetição"], "Ao inspecionar o ponto médio e descartar metade, o algoritmo garante que o elemento não foi jogado fora."),
          q("Como calcular com segurança o ponto médio entre inicio e fim evitando overflow de inteiros em C++?", "int meio = inicio + (fim - inicio) / 2;", ["int meio = (inicio + fim) / 2;","int meio = inicio * fim / 2;"], "A fórmula clássica (inicio + fim) pode ultrapassar INT_MAX (2 bilhões) se o array for enorme, gerando overflow."),
          q("Qual é a complexidade assintótica de tempo garantida pelo invariante de contração da busca binária?", "O(log N), reduzindo o espaço de busca pela metade a cada iteração", ["O(N^2)","O(N) linear"], "Mesmo para 4 bilhões de itens, o invariante encontra qualquer valor em no máximo 32 comparações."),
          t("Qual função da STL de C++ verifica se uma coleção está ordenada atendendo à pré-condição?", ["is_sorted"], "std::is_sorted confere se a lista está em ordem.", "# algoritmo de checagem de ordenacao"),
          g("Complete o cálculo seguro do índice médio sem perigo de estouro numérico:", ["int meio = inicio + (fim - inicio) / 2;"], "A subtração impede que a soma dos índices exceda o limite de int.", "int meio = inicio + (fim ____ inicio) / 2;"),
          o("Ordene as etapas da busca binária orientada a invariantes:", ["Verificar pré-condição de ordenação dos dados (std::is_sorted)","Calcular o índice mediano de forma imune a overflow","Comparar o elemento mediano com o valor do alvo procurado","Ajustar os limites [inicio, fim] estreitando o intervalo pela metade"], "Mecanismo rigoroso de busca binária em C++."),
          p("Associe o elemento da busca binária ao seu papel algorítmico:", [["Pré-condição","Ordenação estrita de todos os elementos da coleção"],["Invariante de laço","O alvo reside dentro dos limites ativos [inicio, fim]"],["meio = inicio + (fim-inicio)/2","Cálculo robusto imune a estouro de inteiros"],["Complexidade O(log N)","Resultado matemático da redução pela metade por ciclo"]], "Análise formal da busca binária em C++.")
        ]
      },
      {
        id: "cpp-c04-u8-l3",
        title: "Contratos de software: pré-condições e pós-condições",
        subtitle: "Design by Contract · Expectativas do chamador e garantias da função",
        theory: "O paradigma de Design by Contract estabelece funções como contratos formais: a função exige pré-condições do chamador (como argumentos válidos e não nulos) e assegura pós-condições ao retornar (como resultados corretos e estado consistente). Violar o contrato na entrada é falha do cliente; na saída, da função.",
        questions: [
          q("O que define uma pré-condição em um contrato formal de função em C++?", "Uma condição que o chamador da função é estritamente obrigado a garantir antes de invocá-la", ["Uma instrução de impressão no console","Um destrutor de objeto"], "Se a pré-condição for violada pelo chamador, a função não tem obrigação de manter comportamento previsível."),
          q("O que define uma pós-condição na execução de uma função?", "Uma garantia formal que a função promete ter cumprido no momento em que retorna ao chamador", ["A velocidade de download da rede","A cor de fundo do terminal"], "Assegura que o estado da memória e o valor retornado refletem o compromisso estabelecido na assinatura."),
          q("Quem é o responsável quando uma asserção de pré-condição falha logo na primeira linha de uma função?", "O código chamador (cliente), que passou argumentos ilegais ou violou o protocolo da API", ["O compilador C++","A biblioteca padrão"], "A pré-condição delimita a fronteira de responsabilidade entre chamador e implementador."),
          q("Como as C++ Core Guidelines recomendam documentar e reforçar pré-condições em APIs?", "Utilizando macros de expectativa (como gsl::Expects) ou assert explícito logo no início do corpo", ["Usando comentários em texto solto apenas","Apagando os parâmetros"], "Checagens ativas em compilação de depuração interceptam o erro no instante em que ele é gerado."),
          t("Qual termo formal define as garantias que uma função promete cumprir ao término de sua execução?", ["poscondicao"], "Pós-condição expressa a garantia do retorno.", "# compromisso formal de retorno"),
          g("Complete a asserção que protege a pré-condição de raio positivo:", ["double area_circulo(double raio) {\n    assert(raio > 0.0);\n    return 3.14159 * raio * raio;\n}"], "assert valida a pré-condição na entrada do cálculo geométrico.", "double area_circulo(double raio) {\n    ____(raio > 0.0);\n    return 3.14159 * raio * raio;\n}"),
          o("Ordene o fluxo cronológico de uma função governada por Design by Contract:", ["Recepção dos argumentos passados pelo chamador da função","Auditoria ativa de pré-condições na fronteira de entrada (Expects/assert)","Execução da computação ou transformação lógica interna","Auditoria ativa de pós-condições garantindo resultado íntegro (Ensures)"], "Ciclo de vida de execução por contratos em C++."),
          p("Associe a categoria de contrato à sua definição técnica:", [["Pré-condição (Expects)","Obrigação imposta ao chamador antes da chamada"],["Pós-condição (Ensures)","Garantia cumprida pela função ao finalizar o retorno"],["Violação de pré-condição","Bug de responsabilidade do cliente chamador"],["Violação de pós-condição","Defeito de implementação da própria rotina interna"]], "Pilares de Design by Contract aplicados ao C++.")
        ]
      },
      {
        id: "cpp-c04-u8-l4",
        title: "Invariantes de classe e encapsulamento em POO C++",
        subtitle: "Classes robustas · Construtores estabelecem e métodos preservam a integridade",
        theory: "Um invariante de classe é uma regra de integridade que deve ser estabelecida pelo construtor e preservada por todos os métodos públicos de uma classe. Através do encapsulamento com private, atributos sensíveis (como ponteiros, denominadores ou ponteiros de arquivo) ficam protegidos contra adulteração externa inválida.",
        questions: [
          q("Qual é o papel do construtor em relação ao invariante de uma classe em C++?", "Estabelecer o invariante pela primeira vez, garantindo que o objeto nasça em estado consistente e válido", ["Imprimir o nome da classe na tela","Alocar todo o disco rígido"], "Se o construtor falhar em estabelecer o invariante (ex: argumento ilegal), deve lançar exceção."),
          q("Qual é o compromisso de cada método público em relação ao invariante de classe?", "Pode alterar temporariamente os membros durante o trabalho interno, mas deve restaurar o invariante antes de sair", ["Pode deixar a classe em estado corrompido","Deve zerar todos os membros"], "Qualquer cliente que invoque um método encontrará o objeto íntegro e o deixará igualmente íntegro."),
          q("Por que os atributos membros de uma classe que possui invariantes estritos devem ser declarados como private?", "Para impedir que código externo modifique os valores diretamente, contornando as regras de validação", ["Para acelerar o tempo de compilação","Porque C++ proíbe membros públicos"], "O modificador private assegura que toda modificação passe por métodos que inspecionam as regras."),
          q("O que deve acontecer se os parâmetros passados para o construtor violarem o invariante da classe?", "O construtor deve lançar uma exceção (como std::invalid_argument) para impedir a criação de objeto inválido", ["O programa deve continuar com objeto quebrado","O compilador apaga o arquivo"], "Em C++, lançar exceção no construtor é a forma canônica de sinalizar falha na criação da instância."),
          t("Qual modificador de acesso protege membros de classe garantindo a preservação de seus invariantes?", ["private"], "private encapsula o estado interno da classe.", "# modificador de protecao de membros"),
          g("Complete o construtor garantindo o invariante de denominador não nulo em uma fração:", ["class Fracao {\n    int num, den;\npublic:\n    Fracao(int n, int d) : num(n), den(d) {\n        if (den == 0) throw std::invalid_argument(\"Denominador zero\");\n    }\n};"], "Lançar exceção no construtor impede instanciar fração inválida.", "class Fracao {\n    int num, den;\npublic:\n    Fracao(int n, int d) : num(n), den(d) {\n        if (den == 0) ____ std::invalid_argument(\"Denominador zero\");\n    }\n};"),
          o("Ordene a jornada de vida de um objeto respeitando seus invariantes de classe:", ["Execução do construtor estabelecendo o estado íntegro inicial","Invocação de método público que encontra o objeto consistente","Mutação controlada de campos respeitando regras internas","Restauração completa do invariante antes de devolver o controle"], "Ciclo de integridade de invariantes de classe em POO C++."),
          p("Associe o elemento de POO à sua responsabilidade com o invariante:", [["Construtor da classe","Estabelece o invariante de integridade inicial"],["Métodos públicos","Preservam o invariante na entrada e na saída"],["Membros private","Blindam campos contra mutações externas espúrias"],["Lançamento de exceção","Impede a conclusão de instância em estado corrompido"]], "Encapsulamento e invariantes de classe em C++.")
        ]
      },
      {
        id: "cpp-c04-u8-l5",
        title: "Projeto integrado: monitor de telemetria e análise de sensores",
        subtitle: "Síntese prática completa · Condicionais, laços, acumuladores e invariantes C++",
        theory: "Neste projeto integrado, consolidamos controle de fluxo, laços de repetição, acumuladores robustos e verificação de invariantes construindo um monitor de telemetria automotiva em C++. O sistema filtra ruídos com continue, detecta falhas críticas com break, acumula médias e garante integridade absoluta.",
        questions: [
          q("Por que o monitor deve utilizar continue ao identificar uma medição de telemetria corrompida?", "Para descartar o pacote com ruído imediatamente e prosseguir para a leitura dos pacotes seguintes", ["Para abortar toda a viagem do veículo","Para zerar todos os acumuladores"], "Permite filtrar interferências eletromagnéticas esporádicas sem interromper o monitoramento contínuo."),
          q("Como garantir que o cálculo da velocidade média acumulada não sofra divisão por zero caso todas as leituras sejam ruído?", "Verificando com if (leituras_validas > 0) antes de executar a divisão do somatório acumulado", ["Dividindo normalmente, pois a CPU ignora zero","Somando 1 ao denominador sempre"], "Divisão inteira por zero é comportamento indefinido fatal; a conferência prévia garante estabilidade total."),
          q("Qual invariante formal o acumulador de telemetria deve preservar a todo instante do trajeto?", "A distância percorrida acumulada deve ser estritamente não decrescente ao longo do tempo", ["A velocidade média deve ser zero","As medições devem ser todas negativas"], "Veículos físicos não retrocedem no odômetro em avanço contínuo; uma diminuição acusa violação de integridade."),
          q("Como interromper o processamento em tempo real se o sensor indicar alerta crítico de temperatura?", "Disparando break imediatamente para abortar o laço de coleta e acionar a rotina de segurança", ["Aumentando o valor da temperatura","Esperando o laço terminar naturalmente"], "A interrupção imediata evita danos ao motor do veículo antes que novas leituras tardias ocorram."),
          t("Qual instrução descarta ruídos no monitor avançando para a próxima leitura do sensor?", ["continue"], "continue salta o ruído na telemetria.", "# descarte de ruidos com continue"),
          g("Complete o descarte de pacotes de telemetria com sinal zerado ou nulo:", ["for (const auto& pacote : fluxo_sensores) {\n    if (pacote.sinal == 0) continue;\n    processar_leitura(pacote);\n}"], "continue pula leituras sem sinal sem quebrar o monitoramento.", "for (const auto& pacote : fluxo_sensores) {\n    if (pacote.sinal == 0) ____;\n    processar_leitura(pacote);\n}"),
          o("Ordene as etapas da pipeline de processamento do monitor integrado de telemetria:", ["Inicializar acumuladores de soma e contadores de amostras válidas com zero","Ler a próxima amostra do fluxo contínuo de sensores veiculares","Filtrar ruídos descartando pacotes nulos através da instrução continue","Acumular medições válidas e calcular médias preservando invariantes"], "Pipeline completa do monitor automotivo de telemetria em C++."),
          p("Associe a estrutura de controle ao seu papel no monitor de telemetria:", [["continue em ruído","Descarte rápido de medições com interferência de sinal"],["break em superaquecimento","Interrupção imediata do loop acionando freio de emergência"],["Acumulador com +=","Soma de quilometragem e consumo para cálculo de médias"],["Invariante de odômetro","Garantia estrita de que a distância nunca é decrescente"]], "Arquitetura de controle e monitoramento veicular em C++.")
        ]
      }
    ]
  });
})();
