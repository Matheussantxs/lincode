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

  const lang = "javascript";
  const chId = "javascript-c04";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "js-c04-u1-l2",
        title: "Condicionais encadeadas: if, else if e else",
        subtitle: "Fluxo de controle · Bifurcações e ramificações múltiplas",
        theory: "Condicionais encadeadas com if, else if e else avaliam uma sequência de predicados booleanos de cima para baixo. O primeiro bloco cuja condição for truthy é executado exclusivamente, ignorando todos os demais. Caso nenhuma premissa seja atendida, o bloco residual opcional else é acionado.",
        questions: [
          q("Como o JavaScript avalia uma cadeia de blocos if ... else if ... else?", "Testa as condições sequencialmente e executa apenas o primeiro bloco verdadeiro, ignorando o resto", ["Executa todos os blocos simultaneamente","Executa apenas o último bloco else"], "A primeira condição verdadeira consome o fluxo, encerrando a avaliação da cadeia condicional."),
          q("O que acontece se nenhuma condição dos blocos if e else if avaliar para truthy?", "O código dentro do bloco opcional else é executado como comportamento de contingência", ["O programa encerra com erro fatal","Todas as variáveis viram undefined"], "O bloco else atua como cláusula de salvaguarda para qualquer caso residual não coberto."),
          q("Por que a ordem das condições em uma cadeia if ... else if é crítica?", "Condições mais específicas devem anteceder as mais genéricas para não serem ocultadas precocemente", ["Porque o interpretador lê de baixo para cima","Porque a ordem altera o nome das variáveis"], "Se a condição mais ampla for avaliada primeiro, as ramificações mais específicas nunca serão alcançadas."),
          q("Quantos blocos else if podem existir em uma mesma estrutura condicional?", "Quantos forem necessários para cobrir as categorias de negócio do problema", ["Apenas um bloco no máximo","Exatamente três"], "Não há limite sintático na especificação, embora cadeias muito longas devam ser refatoradas."),
          t("Qual combinação de palavras-chave cria uma ramificação condicional intermediária?", ["else if"], "else if conecta novas verificações após um if inicial.", "# ramificacao intermediaria condicional"),
          g("Complete a classificação etária com a ramificação intermediária correta:", ["if (idade < 12) {\n    tipo = \"criança\";\n} else if (idade < 18) {\n    tipo = \"jovem\";\n}"], "else if testa a faixa intermediária caso a primeira condição seja falsa.", "if (idade < 12) {\n    tipo = \"criança\";\n} ____ (idade < 18) {\n    tipo = \"jovem\";\n}"),
          o("Ordene a estrutura sequencial recomendada para faixas de pontuação:", ["if (pontos >= 90): condição mais restritiva de faixa máxima (Nota A)","else if (pontos >= 70): condição intermediária média (Nota B)","else if (pontos >= 50): condição intermediária baixa (Nota C)","else: contingência para todos os valores abaixo de 50 (Nota D)"], "Hierarquia de classificação por faixas numéricas decrescentes."),
          p("Associe a entrada de pontuação à faixa resolvida pelo encadeamento:", [["pontos = 95","Nota A (executa o primeiro if)"],["pontos = 80","Nota B (ignora primeiro, atende o segundo)"],["pontos = 60","Nota C (ignora os dois primeiros, atende o terceiro)"],["pontos = 30","Nota D (aciona o bloco de fallback else)"]], "Mapeamento de valores em estruturas condicionais encadeadas.")
        ]
      },
      {
        id: "js-c04-u1-l3",
        title: "Cláusulas de guarda (Guard Clauses) e retorno antecipado",
        subtitle: "Boas práticas · Eliminando aninhamento profundo (arrow anti-pattern)",
        theory: "Cláusulas de guarda (Guard Clauses) utilizam verificações no início da função para testar pré-condições ou erros, retornando imediatamente (early return) se a entrada for inválida. Esse padrão elimina o anti-padrão da seta (código com múltiplos ifs aninhados em formato de flecha), mantendo a lógica plana.",
        questions: [
          q("Qual é o benefício primário de utilizar cláusulas de guarda (Guard Clauses) em funções?", "Elimina o aninhamento profundo de if/else, mantendo o fluxo principal plano e legível no nível zero", ["Acelera a compilação do arquivo","Permite rodar sem o interpretador Node.js"], "Funções planas são muito mais fáceis de ler, manter e testar do que pirâmides de blocos indentados."),
          q("O que caracteriza a técnica de \"early return\" (retorno antecipado)?", "Retornar imediatamente da função assim que uma condição de erro ou caso trivial for detectado", ["Retornar antes do início da função","Retornar sempre o número zero"], "Descarta fluxos inválidos logo no topo, permitindo que o restante do corpo foque apenas no caminho feliz."),
          q("O que é o anti-padrão da seta (arrow anti-pattern ou pyramid of doom) em código estruturado?", "Código excessivamente indentado com ifs aninhados dentro de ifs formando uma pirâmide horizontal", ["Uso excessivo de arrow functions","Nomes de variáveis com símbolos"], "Prejudica gravemente a leitura ao empurrar a lógica de negócio para a margem direita da tela."),
          q("Como uma cláusula de guarda deve tratar uma entrada inválida?", "Verificando o caso inválido com if (!entradaValida) e disparando throw new Error() ou return cedo", ["Criando um novo laço de repetição","Esperando o usuário corrigir"], "Aplica o princípio Fail-Fast: falhe o mais cedo e visivelmente possível."),
          t("Qual instrução interrompe imediatamente a execução da função retornando ao chamador?", ["return"], "return encerra o fluxo da função no ponto da chamada.", "# encerra execucao e retorna"),
          g("Complete a cláusula de guarda que rejeita usuários desativados no início:", ["function processar(user) {\n    if (!user.ativo) return false;\n    salvar(user);\n}"], "A guarda rejeita imediatamente a execução antes de prosseguir.", "function processar(user) {\n    if (!user.ativo) ____ false;\n    salvar(user);\n}"),
          o("Ordene a estrutura canônica de uma função refatorada com Guard Clauses:", ["Validar parâmetros obrigatórios ausentes e retornar ou lançar erro imediatamente","Validar permissões e autorizações do usuário com retorno precoce em caso de recusa","Verificar casos triviais de borda (ex: listas vazias) retornando resultado padrão","Executar a lógica de negócio principal no escopo principal sem nenhum if aninhado"], "Anatomia profissional de funções desenhadas com o padrão Guard Clause."),
          p("Associe o estilo arquitetural ao seu impacto na legibilidade do código:", [["Guard Clauses (Early Return)","Código linear, plano e fácil de manter"],["Ifs aninhados em cascata","Código com alta complexidade ciclomática e indentação profunda"],["Fail-Fast","Filosofia de rejeitar anomalias na borda do componente"],["Caminho feliz (Happy Path)","Fluxo de sucesso desimpedido executado no corpo da função"]], "Conceitos centrais de refatoração e boas práticas de fluxo de controle.")
        ]
      },
      {
        id: "js-c04-u1-l4",
        title: "Operador ternário aninhado vs if tradicional",
        subtitle: "Legibilidade · Quando ramificar por expressão ou comando",
        theory: "Embora o operador ternário seja excelente para seleções binárias simples de valores, aninhar ternários (a ? b : c ? d : e) degrada a legibilidade humana do código. A engenharia moderna recomenda reservar o ternário para atribuições inline de uma linha e adotar if/else ou switch para múltiplas opções.",
        questions: [
          q("Por que a maioria dos linters e guias de estilo proíbem ternários aninhados?", "Porque obscurecem as ramificações lógicas, tornando a revisão e o rastreamento difíceis e propensos a falhas", ["Porque o JavaScript não permite dois pontos seguidos","Porque ocupam o dobro de memória RAM"], "A clareza de comunicação para o time de engenharia sempre prevalece sobre a concisão excessiva."),
          q("Qual é a diferença estrutural entre um comando if e uma expressão ternária?", "if é uma instrução de controle que não gera valor; o ternário é uma expressão que avalia para um valor", ["if só aceita booleanos puros","O ternário é executado em paralelo"], "Expressões podem ser passadas diretamente como argumentos de funções ou atribuições em linha."),
          q("Qual alternativa idiomática substitui com elegância um ternário aninhado com 4 opções?", "Instrução switch, encadeamento if/else limpo ou um mapa de despacho com objeto literal", ["Um único laço while infinito","Comentários explicativos"], "Tabelas de lookup ou if/else com guard clauses expressam escolhas múltiplas com clareza cristalina."),
          q("Quando o uso do operador ternário é considerado a melhor escolha de design?", "Para escolhas binárias simples entre dois valores literais (ex: const cor = escuro ? \"black\" : \"white\")", ["Para funções com mais de 50 linhas","Para substituir todas as funções do projeto"], "Mantém o código conciso e elegante sem comprometer a compreensão imediata do leitor."),
          t("Qual caractere interroga a condição inicial em um operador ternário simples?", ["?"], "Sintaxe: condicao ? valorSim : valorNao.", "# marcador de condicao ternaria"),
          g("Complete o operador ternário simples para escolher a taxa de frete:", ["const frete = isExpress ? 25 : 10;"], "Ternário binário claro para atribuição direta de valor.", "const frete = isExpress ____ 25 : 10;"),
          o("Ordene as abordagens de decisão da mais legível para a menos legível para 4 opções:", ["Tabela de despacho com objeto literal: mapa[opcao] ?? padrao","Cadeia tradicional if ... else if ... else com indentação clara","Estrutura formal switch/case com break e default","Ternários aninhados em cascata a ? b : c ? d : e"], "Hierarquia de legibilidade para decisões de múltiplas opções em JavaScript."),
          p("Associe o construto de decisão ao seu cenário de aplicação ótimo:", [["Ternário simples (a ? b : c)","Atribuição condicional binária de uma única linha"],["if/else com retorno","Funções com validação de regras de negócio complexas"],["Objeto de mapeamento { [k]: v }","Substituição limpa de múltiplos ramos por despacho de dados"],["Switch/case com break","Despacho de comandos com base em códigos ou enums discretos"]], "Critérios de seleção para estruturas de controle condicional.")
        ]
      },
      {
        id: "js-c04-u1-l5",
        title: "Condições com coalescência e checagens seguras",
        subtitle: "Robustez · if combinando checagens de integridade e tipo",
        theory: "A escrita de condicionais robustas combina checagens de tipo (typeof), integridade com operadores modernos (?. e ??) e validação de limites numéricos. Esse arranjo impede que valores como 0, false ou strings vazias quebrem regras de validação por coerção indevida para falsy.",
        questions: [
          q("Por que validar if (usuario.idade) pode causar bugs se o usuário for um recém-nascido de 0 anos?", "Porque o número 0 é um valor falsy, fazendo com que a condicional considere a idade como ausente", ["Porque o JavaScript não aceita idade zero","Porque o número vira texto"], "Validar se a chave existe com usuario.idade !== undefined é estritamente necessário para números."),
          q("Como verificar se uma variável é definida e possui tipo numérico válido dentro de uma condicional?", "typeof valor === \"number\" && Number.isFinite(valor)", ["valor == \"number\"","Boolean(valor)"], "Combina checagem de tipo primitivo com validação contra NaN e Infinity."),
          q("Qual é o benefício de combinar encadeamento opcional dentro de um if (ex: if (user?.isAdmin))?", "Avalia com segurança para false se user for nulo, executando o if apenas se user existir e isAdmin for truthy", ["Executa o código mesmo sem memória","Cria o usuário se ele não existir"], "Elimina a necessidade do antigo padrão redundante if (user && user.isAdmin)."),
          q("Como testar se uma propriedade de texto foi preenchida rejeitando strings só com espaços?", "typeof texto === \"string\" && texto.trim().length > 0", ["texto === true","Boolean(texto)"], "trim() descarta espaços acidentais antes de medir o comprimento real do conteúdo digitado."),
          t("Qual método estático de Number valida simultaneamente tipo e finitude numérica em condicionais?", ["Number.isFinite"], "Number.isFinite(x) rejeita NaN e infinitos.", "# checagem segura de numero finito"),
          g("Complete a condicional que testa se o desconto foi definido numericamente (incluindo 0%):", ["if (typeof desconto === \"number\" && Number.isFinite(desconto)) {\n    aplicar(desconto);\n}"], "Garante que zero seja aceito como desconto legítimo.", "if (typeof desconto === \"number\" && ____(desconto)) {\n    aplicar(desconto);\n}"),
          o("Ordene as etapas de uma validação condicional rigorosa de payload:", ["Verificar se o objeto raiz foi informado: payload != null","Validar campos com Optional Chaining: payload?.dados?.valor","Validar tipo primitivo e integridade: typeof valor === \"number\"","Validar regras de negócio específicas: valor >= 0 e valor <= 1000"], "Pipeline defensivo de validação condicional em APIs JavaScript."),
          p("Associe a verificação condicional ao bug que ela impede:", [["valor !== undefined && valor !== null","Evita descartar o número zero como ausente"],["Number.isFinite(total)","Impede cálculos corrompidos com NaN ou Infinity"],["Array.isArray(lista) && lista.length > 0","Evita invocar métodos de array em objetos comuns"],["str?.trim().length > 0","Impede cadastro de textos vazios ou formados apenas por espaços"]], "Padrões de checagem condicional defensiva para código corporativo.")
        ]
      }
    ],
    2: [
      {
        id: "js-c04-u2-l1",
        title: "Estrutura do switch/case e cláusula break",
        subtitle: "Decisões múltiplas · Despachando por valor discreto",
        theory: "A estrutura switch(expressao) compara uma expressão com múltiplos rótulos case utilizando o operador de igualdade estrita (===). A cláusula break é obrigatória ao final de cada case para impedir o vazamento sequencial (fall-through) para os blocos subsequentes, garantindo execução isolada.",
        questions: [
          q("Qual operador de comparação o switch utiliza internamente para casar o valor com os cases?", "Operador de igualdade estrita (===) sem nenhuma coerção de tipos", ["Operador de igualdade frouxa (==)","Operador de atribuição (=)"], "switch(\"5\") não casará com case 5, pois a comparação exige tipos rigorosamente idênticos."),
          q("Qual é o papel fundamental da instrução break ao final de um bloco case?", "Interromper a execução do switch e saltar imediatamente para fora de sua estrutura de controle", ["Reiniciar o computador","Retornar um valor para a função"], "Sem o break, o motor JavaScript continua executando as linhas dos cases abaixo incondicionalmente."),
          q("O que acontece se o programador esquecer de colocar a cláusula break em um case?", "Ocorre fall-through: as instruções do próximo case serão executadas mesmo que sua condição não confira", ["O navegador trava com SyntaxError","O switch é cancelado"], "O fall-through acidental é uma das causas mais comuns de bugs em estruturas switch em JavaScript."),
          q("Uma expressão avaliada no switch pode ser de qualquer tipo primitivo?", "Sim, pode avaliar strings, números, booleanos ou enums discretos", ["Apenas números inteiros","Apenas variáveis globais"], "Strings são amplamente utilizadas em switches para despacho de tipos de ações (ex: em Redux)."),
          t("Qual instrução de comando interrompe a execução de um bloco case evitando o fall-through?", ["break"], "break sai da estrutura switch imediatamente.", "# interrompe execucao do case"),
          g("Complete o encerramento do case com a instrução de saída obrigatória:", ["case \"salvar\":\n    salvarDados();\n    break;"], "break garante que o case seguinte não seja executado indevidamente.", "case \"salvar\":\n    salvarDados();\n    ____;"),
          o("Ordene as etapas de processamento de uma estrutura switch/case:", ["Avaliar a expressão informada nos parênteses do comando switch","Comparar o resultado com cada rótulo case usando igualdade estrita (===)","Ao encontrar correspondência, executar as instruções daquele bloco","Encontrar a instrução break e saltar para fora do switch"], "Fluxo formal de avaliação do comando de controle switch em JavaScript."),
          p("Associe a palavra-chave do switch ao seu papel sintático:", [["switch(expr)","Inicia a estrutura avaliando a expressão central de teste"],["case valor:","Declara um rótulo de comparação estrita de correspondência"],["break","Instrução de saída que impede o vazamento para o próximo bloco"],["default:","Rótulo residual executado caso nenhum case anterior confira"]], "Anatomia e sintaxe fundamental da estrutura switch/case.")
        ]
      },
      {
        id: "js-c04-u2-l2",
        title: "A cláusula default e tratamento de casos residuais",
        subtitle: "Completude · Garantindo resposta previsível a valores inesperados",
        theory: "A cláusula default em uma estrutura switch define o bloco executado quando nenhum dos rótulos case coincide com o valor avaliado. Ela funciona como o bloco else final de uma cadeia de ifs, garantindo completude no tratamento de erros, estados não mapeados ou novos enums ainda não suportados.",
        questions: [
          q("Qual é o papel da cláusula default em um bloco switch/case?", "Executar instruções de contingência quando nenhum dos rótulos case anteriores conferir com a expressão", ["Executar antes de todos os cases","Apagar as variáveis do switch"], "Garante que entradas inválidas ou desconhecidas recebam tratamento explícito e auditável."),
          q("A cláusula default precisa obrigatoriamente ser a última declaração dentro do switch?", "Não é obrigatório pela sintaxe, mas é a convenção recomendada por legibilidade e padrão comunitário", ["Sim, colocar em outro lugar é SyntaxError","Deve ser sempre a primeira linha"], "Se colocada no meio sem break, o fluxo vazará para os cases inferiores."),
          q("Qual prática de excelência é recomendada no default ao lidar com enums estritos?", "Lançar uma exceção de erro não tratado (throw new Error(`Ação desconhecida: ${acao}`))", ["Ignorar silenciosamente","Reiniciar o aplicativo"], "Alerta imediatamente a equipe caso um novo tipo de ação seja adicionado sem o devido handler."),
          q("O que acontece se nenhum case conferir e o switch não possuir a cláusula default?", "O switch é concluído silenciosamente e a execução segue para a próxima linha fora dele", ["Dispara TypeError automático","O programa entra em loop"], "A omissão de default pode ocultar dados corrompidos que passam despercebidos pelo sistema."),
          t("Qual palavra-chave define o bloco residual padrão executado no switch?", ["default"], "default captura todos os casos não correspondidos.", "# rotulo residual do switch"),
          g("Complete o bloco residual com a palavra-chave que trata casos inesperados:", ["default:\n    console.warn(\"Opção desconhecida\");\n    break;"], "default captura qualquer entrada que não casou com os cases anteriores.", "____:\n    console.warn(\"Opção desconhecida\");\n    break;"),
          o("Ordene a estrutura recomendada de um switch que lida com estados de pedido:", ["switch(pedido.status): avaliação do status do pedido","case \"pendente\": processar pagamento pendente e break","case \"pago\": emitir nota fiscal e despachar pedido e break","default: registrar log de erro e lançar exceção para status desconhecido"], "Estruturação resiliente com tratamento obrigatório de estados residuais."),
          p("Associe o cenário do switch ao comportamento esperado:", [["Valor coincide com case \"pago\"","Executa as instruções de \"pago\" e sai no break"],["Valor não coincide com nenhum case","Salta diretamente para as instruções do bloco default"],["Switch sem default e sem match","Não executa nenhum bloco e segue para a linha seguinte"],["default com throw new Error()","Padrão defensivo contra estados inválidos de domínio"]], "Comportamento da cláusula default em tempo de execução.")
        ]
      },
      {
        id: "js-c04-u2-l3",
        title: "Fall-through deliberado e agrupamento de cases",
        subtitle: "Técnica · Compartilhando a mesma ação entre múltiplos rótulos",
        theory: "O vazamento de execução (fall-through) pode ser utilizado de forma intencional e benéfica para agrupar múltiplos rótulos case que compartilham rigorosamente a mesma lógica de negócio. Empilhar cases consecutivos sem código nem break entre eles cria uma operação lógica equivalente ao operador OR (||).",
        questions: [
          q("Como utilizar o fall-through de forma positiva para agrupar múltiplos rótulos case?", "Empilhando os cases desejados uns sobre os outros sem comandos nem break entre eles", ["Usando o operador || dentro dos parênteses do case","Separando os rótulos por ponto e vírgula"], "Exemplo: case \"sab\": case \"dom\": executarFimDeSemana(); break; compartilha a ação entre ambos."),
          q("Por que a sintaxe case 1 || 2: não funciona como a maioria dos novatos espera?", "Porque avalia a expressão 1 || 2 primeiro (resultando no número 1), casando apenas com 1", ["Porque o operador || é proibido no JavaScript","Gera SyntaxError imediato"], "O rótulo case espera um único valor; para múltiplos valores deve-se empilhar cases consecutivos."),
          q("Qual é a recomendação de documentação ao usar fall-through com código entre os cases?", "Inserir um comentário explícito como // fall through para sinalizar que o vazamento foi deliberado", ["Apagar os nomes dos métodos","Desativar o linter globalmente"], "Impede que colegas de equipe ou linters automáticos interpretem a ausência de break como um bug acidental."),
          q("Quantos rótulos case podem ser agrupados para a mesma execução em série?", "Quantos forem necessários para representar o grupo de opções compartilhadas", ["Apenas dois rótulos","No máximo dez"], "Técnica muito limpa para classificar códigos de status HTTP em categorias (200, 201, 204)."),
          t("Qual termo em inglês designa a passagem contínua da execução de um case para o próximo?", ["fall-through"], "Fall-through é o vazamento sequencial entre cases consecutivos.", "# vazamento sequencial de cases no switch"),
          g("Complete o agrupamento de casos para dias úteis utilizando empilhamento de cases:", ["case \"segunda\":\ncase \"terça\":\ncase \"quarta\":\n    tipo = \"útil\";\n    break;"], "Empilhar cases consecutivos associa todos eles à mesma ação.", "case \"segunda\":\ncase \"terça\":\n____ \"quarta\":\n    tipo = \"útil\";\n    break;"),
          o("Ordene as etapas do agrupamento de códigos HTTP de sucesso em um switch:", ["case 200: (sem break, continua para a linha seguinte)","case 201: (sem break, continua para a linha seguinte)","case 204: (último caso da família de sucesso)","status = \"Sucesso\"; break; (ação compartilhada por todos os códigos 2xx)"], "Padrão de agrupamento limpo de múltiplos cases para uma mesma resposta."),
          p("Associe a estrutura do switch ao seu efeito prático:", [["case 1: case 2: acao(); break;","Agrupamento deliberado: 1 ou 2 disparam a mesma acao"],["case 1: acao1(); break; case 2: acao2(); break;","Casos independentes com quebra estrita de fluxo"],["// fall through","Comentário formal de intenção para linters e revisores"],["case \"a\" || \"b\":","Antipadrão incorreto que só avalia para o primeiro valor \"a\""]], "Padrões de agrupamento de rótulos e controle de fall-through.")
        ]
      },
      {
        id: "js-c04-u2-l4",
        title: "Escopo de bloco dentro de cases com chaves {}",
        subtitle: "Escopo léxico · Prevenindo colisões de identificadores let/const",
        theory: "Por padrão, todo o interior de uma estrutura switch compartilha um único escopo de bloco. Declarar let ou const com o mesmo nome em cases diferentes resulta em SyntaxError. Para isolar variáveis localmente em cada case, é mandatório delimitar o corpo do case com seu próprio par de chaves {}.",
        questions: [
          q("Por que declarar const mensagem = ... em dois cases distintos de um switch gera SyntaxError?", "Porque todo o switch compartilha um único escopo léxico de bloco delimitado por suas chaves externas", ["Porque const só pode existir em classes","Porque o switch apaga variáveis"], "Identificadores let e const não podem ser redeclarados dentro do mesmo bloco léxico."),
          q("Como solucionar a colisão de nomes de variáveis declaradas em cases diferentes?", "Envolvendo as instruções de cada case dentro de seu próprio par de chaves { ... }", ["Usando var em vez de const","Renomeando a função"], "O par de chaves cria um escopo de bloco isolado e independente para aquele case específico."),
          q("O que acontece com uma variável let declarada dentro de case \"a\": { let total = 10; break; }?", "A variável total existe exclusivamente dentro do bloco do case \"a\" e é inacessível nos outros cases", ["Ela vaza para o objeto global window","Ela pode ser lida no case \"b\""], "Garante total encapsulamento léxico impedindo vazamento de variáveis temporárias entre opções."),
          q("Onde a instrução break deve ser posicionada quando o case utiliza chaves {}?", "Preferencialmente dentro das chaves, imediatamente antes do fechamento }", ["Obrigatório fora das chaves","Não se usa break com chaves"], "Manter o break dentro do bloco de chaves fecha a unidade de execução de forma limpa."),
          t("Qual símbolo de pontuação delimita um escopo de bloco léxico próprio para um case?", ["{}"], "Chaves criam escopo de bloco para isolar variáveis locais.", "# delimitador de escopo de bloco"),
          g("Complete o isolamento do case com seu próprio escopo de bloco:", ["case \"exportar\": {\n    const formato = \"pdf\";\n    gerarArquivo(formato);\n    break;\n}"], "As chaves evitam colisão do nome formato com outros cases.", "case \"exportar\": ____\n    const formato = \"pdf\";\n    gerarArquivo(formato);\n    break;\n}"),
          o("Ordene a estrutura recomendada de um case isolado com escopo de bloco:", ["case \"calcular\": { (abertura do rótulo e do bloco léxico isolado)","const total = base * fator; (variável local encapsulada no bloco)","exibirResultado(total); (utilização da variável no escopo local)","break; } (interrupção do fluxo e fechamento das chaves de escopo)"], "Anatomia de cases higienizados com escopo de bloco explícito."),
          p("Associe a estrutura do case ao seu comportamento de escopo:", [["case 1: let x = 10; break;","Vaza a declaração de x para todo o escopo do switch"],["case 1: { const x = 10; break; }","Encapsula x exclusivamente dentro daquele case"],["SyntaxError: Identifier has already been declared","Erro gerado ao declarar o mesmo let/const em dois cases sem chaves"],["Escopo léxico do switch","Espaço delimitado pelas chaves externas switch(e) { ... }"]], "Regras de escopo de identificadores em estruturas switch/case.")
        ]
      },
      {
        id: "js-c04-u2-l5",
        title: "Switch vs Dicionário de despacho (Object Lookup)",
        subtitle: "Padrão de projeto · Substituindo switches longos por tabelas literais",
        theory: "Em JavaScript moderno, estruturas switch longas e com muitos cases repetitivos costumam ser substituídas pelo padrão Object Lookup (dicionário de despacho). Mapear chaves para funções de retorno direto tabela[chave]?.() ?? fallback torna o código declarativo, extensível e com busca em tempo O(1).",
        questions: [
          q("Como funciona o padrão Object Lookup (dicionário de despacho) em substituição ao switch?", "Cria um objeto mapeando chaves literais para handlers ou valores, acessados via objeto[chave]", ["Executa um laço for procurando a string","Converte o código para SQL"], "O acesso por chave de objeto é direto e evita estruturas imperativas longas e verbosas."),
          q("Qual é a complexidade de tempo de busca de uma chave em um dicionário de despacho de objeto?", "O(1) (tempo constante, acesso direto via tabela hash interna)", ["O(n) (tempo linear que percorre todos os casos)","O(n²)"], "Diferente de um switch longo com dezenas de cases, o lookup não precisa avaliar comparações sequenciais."),
          q("Como definir o comportamento equivalente à cláusula default no padrão Object Lookup?", "Utilizando o operador Nullish Coalescing: const handler = acoes[tipo] ?? handlerPadrao;", ["Escrevendo a palavra default no objeto","Usando try/catch obrigatório"], "?? seleciona a função ou valor de contingência caso a chave solicitada não exista no objeto."),
          q("Por que o padrão Object Lookup facilita testes unitários e modularidade?", "Permite exportar a tabela de despacho separadamente e adicionar novos casos sem editar ifs", ["Porque remove todos os tipos do arquivo","Porque fecha o navegador"], "Respeita o princípio Open/Closed (aberto para extensão, fechado para modificação)."),
          t("Qual notação de colchetes permite acessar propriedades dinamicamente pelo nome em string?", ["[]"], "objeto[chaveDinamica] acessa a propriedade pelo valor da variável.", "# indexador dinamico de objetos"),
          g("Complete o despacho dinâmico com fallback usando a tabela de ações:", ["const acao = tabelaAcoes[comando] ?? acaoPadrao;\nacao();"], "O dicionário busca a função e o operador ?? garante o fallback seguro.", "const acao = tabelaAcoes[comando] ____ acaoPadrao;\nacao();"),
          o("Ordene as etapas para implementar um despachante com Object Lookup:", ["Criar o objeto mapeando strings para funções: const handlers = { a: fnA, b: fnB }","Receber o identificador dinâmico vindo da entrada ou payload","Recuperar a função executável aplicando fallback: const fn = handlers[tipo] ?? fallback","Invocar a função selecionada passando os argumentos necessários"], "Pipeline padrão do padrão de projeto Object/Map Lookup em JavaScript."),
          p("Associe a estrutura de controle à sua característica arquitetural:", [["switch/case tradicional","Controle imperativo clássico, bom para poucas opções de fluxo"],["Object Lookup { [k]: fn }","Mapeamento declarativo O(1), ideal para despacho de ações"],["Map de funções","Tabela de despacho com chaves de qualquer tipo (objetos ou números)"],["tabela[tipo]?.()","Invocação segura do handler correspondente sem quebrar por nulo"]], "Comparação de arquitetura entre despacho imperativo e declarativo.")
        ]
      }
    ],
    3: [
      {
        id: "js-c04-u3-l1",
        title: "Tabelas-verdade e operadores lógicos AND, OR e NOT",
        subtitle: "Lógica formal · Combinando predicados complexos em testes",
        theory: "Os operadores lógicos fundamentam a tomada de decisões booleanas. O operador AND (&&) exige que ambos os operandos sejam verdadeiros para resultar em true. O operador OR (||) exige que pelo menos um operando seja verdadeiro. O operador NOT (!) inverte o valor lógico booleano de seu operando único.",
        questions: [
          q("Qual é a condição necessária para que uma expressão com o operador lógico && retorne true?", "Ambos os operandos da esquerda e da direita devem avaliar obrigatoriamente para truthy", ["Apenas um dos operandos ser verdadeiro","Nenhum dos operandos ser número"], "Se qualquer um dos operandos for falso, toda a conjunção lógica é falsa."),
          q("Qual é a condição suficiente para que uma expressão com o operador lógico || retorne true?", "Basta que pelo menos um dos operandos avalie para truthy", ["Ambos os operandos serem falsy","Ambos serem strings"], "A disjunção lógica só resulta em falsidade se todos os operandos envolvidos forem falsos."),
          q("Qual é o resultado da expressão lógica: !(true && false)?", "true (pois true && false é false, e a negação !false resulta em true)", ["false","TypeError"], "A operação interna é avaliada primeiro, e a negação externa inverte o resultado final."),
          q("Quantas linhas possui a tabela-verdade completa de uma operação com duas variáveis booleanas (A e B)?", "4 linhas (combinações: V/V, V/F, F/V, F/F)", ["2 linhas","8 linhas"], "Uma tabela-verdade com n variáveis possui 2^n combinações de estados possíveis."),
          t("Qual operador booleano binário representa a disjunção lógica em JavaScript?", ["||"], "|| exige apenas um operando verdadeiro.", "# operador logico OR"),
          g("Complete a condicional que exige que o usuário esteja autenticado e com email confirmado:", ["if (usuario.isLogado && usuario.emailVerificado) {\n    liberarPainel();\n}"], "&& conecta as duas premissas obrigatórias.", "if (usuario.isLogado ____ usuario.emailVerificado) {\n    liberarPainel();\n}"),
          o("Ordene os resultados da conjunção lógica (A && B) para as 4 combinações possíveis:", ["true && true: resulta em true (único caso verdadeiro)","true && false: resulta em false","false && true: resulta em false","false && false: resulta em false"], "Tabela-verdade canônica da operação lógica AND (conjunção)."),
          p("Associe a operação lógica ao seu resultado formal booleano:", [["true && true","Avalia para true por conjunção pura"],["true && false","Avalia para false por termo contraditório"],["false || true","Avalia para true por disjunção satisfeita"],["false || false","Avalia para false por ausência de termos verdadeiros"]], "Resultados fundamentais de operadores lógicos em JavaScript.")
        ]
      },
      {
        id: "js-c04-u3-l2",
        title: "Leis de De Morgan aplicadas a código JavaScript",
        subtitle: "Simplificação · !(A && B) vs (!A || !B) em refatorações",
        theory: "As Leis de De Morgan são teoremas da lógica booleana usados para simplificar condicionais negativas complexas: !(A && B) equivale a (!A || !B), e !(A || B) equivale a (!A && !B). Aplicar essas leis permite inverter e eliminar negações confusas de ifs, tornando o código mais legível e direto.",
        questions: [
          q("Segundo as Leis de De Morgan, a qual expressão a negação !(A && B) é estritamente equivalente?", "(!A || !B) (a negação da conjunção é a disjunção das negações)", ["(!A && !B)","(A || B)"], "Distribuir a negação inverte os termos individuais e troca o operador && por ||."),
          q("Segundo as Leis de De Morgan, a qual expressão a negação !(A || B) é estritamente equivalente?", "(!A && !B) (a negação da disjunção é a conjunção das negações)", ["(!A || !B)","!(A && B)"], "Distribuir a negação sobre o OR transforma a expressão em um AND de termos negados."),
          q("Como simplificar a condicional confusa if (!(idade >= 18 && temAutorizacao))?", "if (idade < 18 || !temAutorizacao)", ["if (idade >= 18 || temAutorizacao)","if (idade < 18 && temAutorizacao)"], "Inverte as condições internas individualmente eliminando o parêntese com negação externa."),
          q("Por que aplicar as Leis de De Morgan melhora a manutenção do código?", "Elimina duplas negações cognitivas que exigem esforço mental para serem decifradas por revisores", ["Porque reduz o uso de CPU","Porque transforma if em while"], "Condições afirmativas diretas são compreendidas muito mais rápido do que negações agrupadas."),
          t("Qual matemático britânico do século XIX formulou as leis de dualidade lógica entre conjunção e disjunção?", ["De Morgan"], "Augustus De Morgan formalizou as regras de equivalência lógica.", "# teoremas de De Morgan"),
          g("Complete a simplificação da negação !(temSaldo || temLimite):", ["if (!temSaldo && !temLimite) {\n    recusarCompra();\n}"], "A negação do OR equivale ao AND das negações individuais.", "if (!temSaldo ____ !temLimite) {\n    recusarCompra();\n}"),
          o("Ordene os passos para refatorar uma condicional negativa usando De Morgan:", ["Identificar a expressão negada externamente: !(condicaoA && condicaoB)","Remover a exclamação externa e os parênteses envolventes","Inverter individualmente cada termo: condicaoA vira !condicaoA","Trocar o operador central: inverter && para || (ou vice-versa)"], "Roteiro de simplificação lógica aplicando equivalências de De Morgan."),
          p("Associe a expressão original à sua forma simplificada equivalente:", [["!(ativo && valido)","!ativo || !valido"],["!(admin || moderador)","!admin && !moderador"],["!(!temErro)","temErro (eliminação de dupla negação)"],["!(idade >= 18)","idade < 18 (inversão relacional direta)"]], "Aplicações práticas das Leis de De Morgan na simplificação de código.")
        ]
      },
      {
        id: "js-c04-u3-l3",
        title: "Curto-circuito na prática e efeitos colaterais",
        subtitle: "Execução condicional · Invocando funções auxiliares de forma segura",
        theory: "A avaliação em curto-circuito (short-circuit) interrompe a análise de expressões lógicas assim que o resultado final se torna inevitável. Em a && b(), se a for falsy, a função b() jamais é invocada. Em c || d(), se c for truthy, d() é ignorada, permitindo proteger chamadas com efeitos colaterais.",
        questions: [
          q("O que acontece com a função registrarLog() em: false && registrarLog()?", "A função registrarLog() nunca é executada nem avaliada", ["A função executa com argumentos nulos","O programa trava"], "O motor JavaScript detecta que o primeiro operando é false e aborta a avaliação do operador &&."),
          q("O que acontece com a função conectarBanco() em: true || conectarBanco()?", "A função conectarBanco() nunca é executada", ["A função conecta duas vezes","O banco é desconectado"], "Como o primeiro operando do OR é true, o resultado já está garantido e o segundo termo é pulado."),
          q("Qual é o risco de colocar funções com efeitos colaterais (como gravação de dados) no segundo operando?", "A função pode deixar de executar silenciosamente caso o primeiro operando defina o curto-circuito", ["A função perde seus parâmetros","O código vira TypeScript"], "Chamadas que alteram estado devem preferencialmente residir em blocos if explícitos para clareza."),
          q("Como o padrão de curto-circuito é usado para invocar callbacks opcionais com segurança?", "cb && cb() ou no padrão moderno cb?.()", ["cb || cb()","call(cb)"], "Garante que a função cb só seja invocada se ela for uma referência truthy válida."),
          t("Qual operador lógico executa a segunda instrução apenas se a primeira for truthy?", ["&&"], "expressao && acao() avalia a ação condicionalmente.", "# operador de execucao condicional em curto-circuito"),
          g("Complete o disparo condicional do evento apenas se o ouvinte estiver registrado:", ["temOuvinte && dispararEvento();"], "dispararEvento só roda se temOuvinte avaliar para truthy.", "temOuvinte ____ dispararEvento();"),
          o("Ordene a sequência de avaliação da expressão (validar() && autenticar() && autorizar()):", ["Executar a primeira função validar(): retorna true","Como foi truthy, o operador && prossegue e executa autenticar(): retorna false","Operador && identifica o valor falsy e interrompe imediatamente a cadeia","A função autorizar() é ignorada e nunca é executada"], "Propagação de curto-circuito em cadeias encadeadas de validação."),
          p("Associe o padrão de curto-circuito ao seu comportamento:", [["flag && executar()","Executa a função exclusivamente quando flag for truthy"],["dado || fallback()","Executa fallback exclusivamente quando dado for falsy"],["Curto-circuito no AND","Interrompe na detecção do primeiríssimo valor falsy"],["Curto-circuito no OR","Interrompe na detecção do primeiríssimo valor truthy"]], "Padrões operacionais de curto-circuito em código JavaScript.")
        ]
      },
      {
        id: "js-c04-u3-l4",
        title: "Precedência de operadores lógicos (! antes de && antes de ||)",
        subtitle: "Expressões · Agrupando condições booleanas com parênteses",
        theory: "A precedência dos operadores lógicos define a ordem de avaliação: a negação unária (!) possui a maior precedência, seguida pela conjunção (&&) e, por último, pela disjunção (||). Expressões sem parênteses avaliam o && antes do ||, o que frequentemente causa comportamentos inesperados.",
        questions: [
          q("Qual é a ordem correta de precedência entre os operadores lógicos em JavaScript?", "1º NOT (!), 2º AND (&&) e 3º OR (||)", ["1º OR, 2º AND e 3º NOT","Todos possuem a mesma precedência"], "O operador && possui prioridade hierárquica sobre o operador ||, comportando-se como uma multiplicação booleana."),
          q("Como a expressão A || B && C é interpretada pelo JavaScript na ausência de parênteses?", "A || (B && C)", ["(A || B) && C","A && B || C"], "O operador && se liga mais fortemente aos operandos adjacentes do que o operador ||."),
          q("Qual é o resultado de true || false && false em JavaScript?", "true (pois false && false avalia para false, e true || false avalia para true)", ["false","TypeError"], "Se a avaliação fosse da esquerda para a direita sem precedência, o resultado seria incorreto."),
          q("Por que é mandatório usar parênteses ao misturar && e || na mesma expressão?", "Elimina ambiguidades cognitivas e garante que a lógica de negócio execute na ordem desejada pelo autor", ["Porque o interpretador lança SyntaxError sem parênteses","Para economizar memória"], "Parênteses explícitos comunicam com certeza absoluta a intenção do desenvolvedor."),
          t("Qual operador lógico binário possui precedência estritamente superior ao operador ||?", ["&&"], "&& avalia antes de || na tabela de precedência.", "# operador logico de maior precedencia binaria"),
          g("Complete o agrupamento com parênteses para exigir que a regra A ou B seja combinada com ativo:", ["if ((regraA || regraB) && usuario.isAtivo) {\n    permitir();\n}"], "Os parênteses forçam a avaliação do OR antes do AND com isAtivo.", "if (____regraA || regraB) && usuario.isAtivo) {\n    permitir();\n}"),
          o("Ordene a resolução da expressão lógica: false && true || true && !false", ["Avaliar a negação unária !false: resulta no valor booleano true","Avaliar a primeira conjunção false && true: resulta em false","Avaliar a segunda conjunção true && true: resulta em true","Avaliar a disjunção final false || true: resulta em true"], "Passo a passo estrito de resolução baseado na hierarquia de operadores lógicos."),
          p("Associe a expressão com parênteses ao seu resultado booleano:", [["(true || false) && false","Avalia para false por agrupamento explícito"],["true || (false && false)","Avalia para true por precedência natural"],["!true || true","Avalia para true (negação avalia antes do OR)"],["!(true || true)","Avalia para false (parênteses invertidos pela negação)"]], "Comparação de precedência natural versus precedência agrupada por parênteses.")
        ]
      },
      {
        id: "js-c04-u3-l5",
        title: "Predicados compostos para regras de negócio",
        subtitle: "Expressividade · Extraindo condições complexas para variáveis nomeadas",
        theory: "Condicionais com múltiplas cláusulas lógicas aninhadas tornam-se ilegíveis e difíceis de depurar. A boa prática de engenharia recomenda extrair predicados compostos para variáveis booleanas descritivas (ex: const podePublicar = isAutor && isRevisado && !bloqueado), tornando o if autoexplicativo.",
        questions: [
          q("Qual é a melhor estratégia ao se deparar com um if contendo 5 condições lógicas na mesma linha?", "Extrair conjuntos de condições para constantes booleanas com nomes descritivos de domínio", ["Deletar duas condições para simplificar","Escrever a função inteira em uma linha só"], "Variáveis nomeadas documentam a intenção da regra sem necessidade de comentários supérfluos."),
          q("Como nomear adequadamente uma variável booleana que armazena o resultado de um predicado composto?", "Usar prefixos verbais ou afirmativos como podeEditar, temPermissao ou elegivelParaDesconto", ["Nomear como var1 ou temp","Usar apenas verbos no infinitivo"], "Nomes em forma de predicado integram-se perfeitamente com condicionais if (elegivelParaDesconto)."),
          q("Qual benefício de depuração a extração de predicados traz ao usar breakpoints ou logs?", "Permite inspecionar o valor individual de cada sub-regra isoladamente durante a execução", ["Permite que o teste passe mesmo com erros","Acelera a conexão com a internet"], "O desenvolvedor pode ver com precisão cirúrgica qual das 5 premissas causou a negação do acesso."),
          q("O que caracteriza uma função pura de predicado (predicate function)?", "Uma função que recebe dados de entrada e retorna estritamente um valor booleano (true ou false)", ["Uma função que não recebe argumentos","Uma função que só roda uma vez"], "Predicados encapsulam regras de negócio reutilizáveis em filtros e condicionais."),
          t("Qual prefixo interrogativo comum da língua inglesa é padrão para nomear predicados booleanos?", ["is"], "Exemplo: isValid, isActive, isAdmin.", "# prefixo comum de predicado booleano"),
          g("Complete a extração limpa da regra de negócio para a variável descritiva:", ["const podeAcessar = isAutenticado && (isAdmin || isEditor);\nif (podeAcessar) {\n    abrirPainel();\n}"], "A variável intermediária documenta a intenção de negócio com clareza.", "const podeAcessar = isAutenticado && (isAdmin || isEditor);\nif (____) {\n    abrirPainel();\n}"),
          o("Ordene as etapas para refatorar uma condicional de negócio densa:", ["Identificar a expressão complexa com múltiplos operadores lógicos no if","Separar as regras em blocos conceituais (ex: validade de idade, saldo disponível)","Declarar constantes booleanas nomeadas com const regraNomeada = ...","Reescrever o if consumindo apenas os identificadores de alto nível limpos"], "Fluxo de refatoração para legibilidade e expressividade de domínio."),
          p("Associe o predicado nomeado à sua regra semântica de negócio:", [["const isMaiorDeIdade = idade >= 18","Validação de precondição etária legal"],["const temSaldo = saldo >= totalPedido","Validação de capacidade financeira de pagamento"],["const podeComprar = isMaiorDeIdade && temSaldo","Predicado consolidado de elegibilidade"],["if (podeComprar)","Condicional autoexplicativa e limpa de alto nível"]], "Padrões de design de código expressivo com predicados nomeados.")
        ]
      }
    ],
    4: [
      {
        id: "js-c04-u4-l1",
        title: "O laço for clássico: inicialização, condição e passo",
        subtitle: "Iteração indexada · Percorrendo intervalos com contadores inteiros",
        theory: "O laço for tradicional for(inicializacao; condicao; incremento) gerencia iterações com controle numérico direto. A variável contadora deve ser declarada com let para obter escopo de bloco próprio a cada iteração, garantindo que closures capturadas mantenham o valor correto correspondente àquele passo.",
        questions: [
          q("Quais são as três partes separadas por ponto e vírgula no cabeçalho do laço for tradicional?", "Inicialização (let i = 0), Condição de permanência (i < limite) e Passo de incremento (i++)", ["Entrada, Processamento e Saída","Início, Meio e Fim"], "A inicialização roda uma vez; a condição é testada antes de cada ciclo; o passo roda após cada iteração."),
          q("O que acontece se declararmos o contador com var em vez de let em um laço for assíncrono?", "A variável var vaza para o escopo da função, fazendo com que todos os callbacks vejam o valor final de i", ["O laço roda mais rápido","O laço é ignorado"], "let cria uma nova ligação léxica a cada iteração, preservando o valor correto de i em closures e timeouts."),
          q("Quando a condição de permanência do laço for é avaliada?", "No início de cada iteração, antes de executar as instruções internas do bloco", ["Apenas após o término de todas as voltas","No meio da execução do bloco"], "Se a condição inicial já for falsa logo na primeira verificação, o corpo do laço nunca será executado."),
          q("Como percorrer todos os índices de um array lista de tamanho length?", "for (let i = 0; i < lista.length; i++)", ["for (let i = 1; i <= lista.length; i++)","for (i = 0; i == length; i++)"], "Como arrays em JavaScript são indexados a partir de zero, a condição deve ser estritamente menor (<)."),
          t("Qual operador de incremento aritmético soma 1 ao contador a cada ciclo do laço?", ["++"], "i++ equivale a i = i + 1.", "# operador de pos-incremento"),
          g("Complete o cabeçalho do laço iterando 5 vezes a partir do índice 0:", ["for (let i = 0; i < 5; i++) {\n    console.log(i);\n}"], "Laço padrão com let, condição menor que 5 e incremento unitário.", "for (let i = 0; i < 5; ____) {\n    console.log(i);\n}"),
          o("Ordene as etapas executadas em cada ciclo de um laço for clássico:", ["Avaliar a condição de permanência (se falsa, encerra o laço imediatamente)","Executar o corpo de instruções contido dentro das chaves do laço","Executar o passo de incremento ou decremento declarado no cabeçalho","Retornar à avaliação da condição para o próximo ciclo"], "Ciclo de vida interno da execução do laço for tradicional."),
          p("Associe a seção do cabeçalho do laço for à sua função:", [["let i = 0","Inicialização: define o valor inicial da variável contadora"],["i < lista.length","Condição de permanência testada antes de cada volta"],["i++","Passo de atualização executado ao término de cada volta"],["{ ... }","Corpo de instruções executadas a cada ciclo válido"]], "Anatomia formal do laço for em JavaScript.")
        ]
      },
      {
        id: "js-c04-u4-l2",
        title: "Laço decrescente e iteração reversa",
        subtitle: "Percurso · Percorrendo coleções do fim para o início com i--",
        theory: "A iteração reversa percorre um intervalo ou coleção de trás para frente. Iniciando no último índice válido (lista.length - 1) e decrementando com i-- até atingir i >= 0, esse padrão é útil para operações em ordem cronológica inversa e remoções de elementos em arrays in-place sem desalinhar índices.",
        questions: [
          q("Qual é o índice inicial correto para percorrer um array de trás para frente?", "lista.length - 1", ["lista.length","0"], "Como os índices iniciam em 0, o último elemento válido reside na posição length - 1."),
          q("Qual condição de permanência deve ser usada ao decrementar o contador até o primeiro elemento?", "i >= 0", ["i > 0","i == 0"], "Usar i >= 0 garante que o índice 0 (primeiro elemento) seja processado na última volta do laço."),
          q("Por que remover itens de um array com splice() durante um laço reverso é seguro?", "Porque remover um elemento afeta apenas os índices à sua direita, que já foram previamente processados", ["Porque o array é congelado","Porque o splice inverte o array"], "Em laços normais para a frente, o splice reduz os índices seguintes, pulando elementos adjacentes."),
          q("Como decrementar o contador em 2 unidades a cada passo em vez de 1?", "i -= 2", ["i--","i - 2"], "Operadores de atribuição composta customizam o passo do laço conforme a necessidade algorítmica."),
          t("Qual operador aritmético unário decrementa o valor da variável contadora em 1?", ["--"], "i-- subtrai 1 da variável.", "# operador de decremento"),
          g("Complete o cabeçalho do laço para percorrer o array em ordem reversa:", ["for (let i = lista.length - 1; i >= 0; i--) {\n    processar(lista[i]);\n}"], "Inicia no último índice e para em zero decrementando a cada volta.", "for (let i = lista.length - 1; ____; i--) {\n    processar(lista[i]);\n}"),
          o("Ordene os valores assumidos pela variável i em um laço reverso em array de tamanho 3:", ["Primeira iteração: i = 2 (acessa o último elemento lista[2])","Segunda iteração: i = 1 (acessa o elemento intermediário lista[1])","Terceira iteração: i = 0 (acessa o primeiro elemento lista[0])","Quarta verificação: i = -1 (condição i >= 0 falha e encerra o laço)"], "Rastreamento passo a passo de um laço de iteração decrescente."),
          p("Associe o parâmetro do laço reverso ao seu valor:", [["Índice de partida","arr.length - 1"],["Critério de término","i >= 0"],["Operação de passo","i-- (decremento unitário)"],["Índice após encerramento","-1 (primeiro valor que quebra a condição)"]], "Valores limites do padrão de percurso reverso em arrays.")
        ]
      },
      {
        id: "js-c04-u4-l3",
        title: "Laço for...of para iteráveis modernos",
        subtitle: "Coleções · Acessando valores diretamente em arrays, strings e sets",
        theory: "O laço for...of (introduzido no ES2015) itera diretamente sobre os valores de qualquer objeto iterável (que implementa o protocolo [Symbol.iterator]), incluindo arrays, strings, Sets e Maps. Ele elimina a necessidade de controle manual de índices, proporcionando código limpo e idiomático.",
        questions: [
          q("Qual é a principal vantagem de for...of sobre o laço for tradicional em arrays?", "Entrega os valores dos elementos diretamente sem necessidade de declarar índices manuais ou acessar arr[i]", ["Roda na GPU","Não aceita arrays grandes"], "Simplifica a leitura e elimina bugs de off-by-one ou manipulação errônea de contadores."),
          q("O laço for...of funciona sobre objetos literais comuns (ex: const obj = { a: 1 })?", "Não, objetos comuns não são iteráveis por padrão e lançam TypeError: obj is not iterable", ["Sim, itera sobre as chaves","Sim, itera sobre os valores"], "Para iterar sobre objetos, deve-se usar Object.keys(), Object.values() ou Object.entries() com for...of."),
          q("Como obter tanto o índice quanto o elemento simultaneamente usando for...of?", "Utilizando o método array.entries() com desestruturação: for (const [i, item] of arr.entries())", ["Usando a palavra index no laço","Não é possível"], "array.entries() produz pares [índice, valor] iteráveis com máxima ergonomia."),
          q("Podemos usar as instruções break e continue dentro de um laço for...of?", "Sim, break e continue são plenamente suportados para controle de fluxo dentro de for...of", ["Não, break só funciona em for comum","Apenas no Node.js"], "Ao contrário de array.forEach() que não pode ser interrompido, for...of oferece controle total de parada."),
          t("Qual palavra-chave do JavaScript conecta a variável ao iterável no laço for...of?", ["of"], "Sintaxe: for (const x of iteravel).", "# conectivo do laco for of"),
          g("Complete a iteração limpa sobre a coleção de usuários:", ["for (const usuario of listaUsuarios) {\n    enviarEmail(usuario);\n}"], "for...of acessa cada elemento sequencialmente.", "for (const usuario ____ listaUsuarios) {\n    enviarEmail(usuario);\n}"),
          o("Ordene as etapas internas do protocolo de iteração acionado por for...of:", ["Invocar o método especial colecao[Symbol.iterator]() para obter o iterador","Invocar repetidamente o método iterador.next() a cada ciclo","Verificar se o objeto retornado possui { done: true } para encerrar o laço","Extrair o valor da propriedade { value } e atribuir à variável do laço"], "Mecanismo interno do protocolo de iteração do ECMAScript."),
          p("Associe a estrutura ao método de percurso ótimo com for...of:", [["for (const item of array)","Itera diretamente sobre os valores do array"],["for (const char of string)","Itera sobre caracteres considerando pares substitutos Unicode"],["for (const [k, v] of map)","Itera sobre pares chave-valor de uma instância de Map"],["for (const [i, el] of arr.entries())","Itera recebendo simultaneamente o índice e o elemento"]], "Aplicações idiomáticas do laço for...of sobre diferentes iteráveis.")
        ]
      },
      {
        id: "js-c04-u4-l4",
        title: "Laço for...in e armadilhas com protótipos",
        subtitle: "Objetos · Enumerando propriedades enumeráveis e Object.keys()",
        theory: "O laço for...in itera sobre todas as chaves (propriedades enumeráveis) de um objeto, incluindo aquelas herdadas de sua cadeia de protótipos. Por não garantir ordem de iteração em arrays e enumerar métodos herdados, a comunidade moderna prefere Object.keys(), Object.values() e Object.entries().",
        questions: [
          q("O que a variável recebe a cada volta em um laço for (const chave in objeto)?", "Uma string representando o nome da chave ou propriedade enumerável do objeto", ["O valor da propriedade diretamente","Um número inteiro"], "for...in entrega chaves; para acessar o valor deve-se usar objeto[chave]."),
          q("Por que o laço for...in NUNCA deve ser usado para iterar sobre arrays?", "Itera sobre índices como strings, inclui propriedades herdadas no protótipo e não garante ordem sequencial", ["Porque apaga os elementos do array","Porque trava o navegador"], "Em arrays deve-se usar sempre for, for...of ou métodos funcionais como forEach e map."),
          q("Como se proteger contra a enumeração de propriedades herdadas da cadeia de protótipos em for...in?", "Utilizando a checagem Object.hasOwn(obj, chave) para filtrar apenas propriedades próprias", ["Usando typeof chave === \"own\"","Desativando o protótipo"], "Object.hasOwn() verifica se a propriedade pertence diretamente àquela instância específica."),
          q("Qual método utilitário estático moderno é a alternativa recomendada para iterar sobre chaves de objetos?", "Object.keys(objeto) combinado com for...of", ["Object.dump()","Array.fromKeys()"], "Object.keys() retorna um array contendo exclusivamente as chaves próprias enumeráveis do objeto."),
          t("Qual método nativo estático moderno substituiu hasOwnProperty para testar propriedades próprias?", ["Object.hasOwn"], "Object.hasOwn(obj, prop) é seguro contra objetos sem protótipo.", "# checagem moderna de propriedade propria"),
          g("Complete o filtro de propriedades próprias no laço for...in:", ["for (const chave in config) {\n    if (Object.hasOwn(config, chave)) {\n        salvar(chave, config[chave]);\n    }\n}"], "Object.hasOwn impede a invasão de propriedades herdadas do protótipo.", "for (const chave in config) {\n    if (____(config, chave)) {\n        salvar(chave, config[chave]);\n    }\n}"),
          o("Ordene as alternativas para percurso de objetos da mais recomendada para a legada:", ["for (const [chave, valor] of Object.entries(obj)): padrão moderno declarativo","for (const chave of Object.keys(obj)): padrão limpo para apenas nomes de propriedades","for (const chave in obj) com filtro Object.hasOwn(obj, chave): clássico protegido","for (const chave in obj) sem filtro: antipadrão perigoso sujeito a poluição de protótipo"], "Classificação de segurança e modernidade no percurso de chaves de objetos."),
          p("Associe o método de inspeção de propriedades ao seu retorno:", [["Object.keys(obj)","Array contendo todos os nomes de chaves próprias enumeráveis"],["Object.values(obj)","Array contendo todos os valores das propriedades próprias"],["Object.entries(obj)","Array de pares [chave, valor] das propriedades próprias"],["Object.hasOwn(obj, \"k\")","Booleano que confirma se a propriedade pertence à instância"]], "Conjunto de métodos estáticos de Object para iteração segura.")
        ]
      },
      {
        id: "js-c04-u4-l5",
        title: "Laços for aninhados e matrizes bidimensionais",
        subtitle: "Grades · Percorrendo linhas e colunas de tabelas e grids",
        theory: "Laços aninhados (um laço dentro de outro) são utilizados para processar matrizes bidimensionais, tabelas e coordenadas (linha e coluna). O laço externo percorre as linhas com o índice i, enquanto o laço interno percorre as colunas com o índice j, resultando em complexidade de tempo quadrática O(n × m).",
        questions: [
          q("Como acessar um elemento específico na linha i e coluna j de uma matriz bidimensional?", "matriz[i][j]", ["matriz[i, j]","matriz[i:j]"], "O primeiro colchete seleciona a linha (que é um array); o segundo colchete seleciona a coluna naquele array."),
          q("Qual é a convenção padrão de nomenclatura de variáveis de contadores para dois laços aninhados?", "i para o laço externo (linhas) e j para o laço interno (colunas)", ["a e b","x1 e x2"], "Convenção matemática clássica adotada universalmente por programadores."),
          q("Qual é o número total de iterações executadas por uma matriz de 4 linhas e 5 colunas?", "20 iterações (4 linhas × 5 colunas)", ["9 iterações","40 iterações"], "O laço interno executa todas as suas voltas completas para cada volta individual do laço externo."),
          q("Qual cuidado de desempenho deve ser tomado ao projetar laços profundamente aninhados (ex: 3 níveis)?", "A complexidade cúbica O(n³) pode degradar severamente o tempo de resposta em coleções grandes", ["O computador desliga a tela","O JavaScript proíbe 3 laços"], "Sempre avalie se a estrutura não pode ser pré-indexada com um Map ou dicionário para busca em O(1)."),
          t("Qual índice por convenção é utilizado no laço interno quando o externo utiliza i?", ["j"], "A letra j segue o i na convenção clássica.", "# contador do laco interno aninhado"),
          g("Complete o laço aninhado para percorrer as colunas da linha atual:", ["for (let i = 0; i < grade.length; i++) {\n    for (let j = 0; j < grade[i].length; j++) {\n        processar(grade[i][j]);\n    }\n}"], "grade[i].length mede a quantidade de colunas daquela linha.", "for (let i = 0; i < grade.length; i++) {\n    for (let j = 0; j < ____.length; j++) {\n        processar(grade[i][j]);\n    }\n}"),
          o("Ordene a cronologia de execução em uma grade 2x2 com índices (i, j):", ["Volta 1: i = 0, j = 0 (processa célula [0][0])","Volta 2: i = 0, j = 1 (processa célula [0][1], encerra laço j)","Volta 3: i = 1, j = 0 (inicia nova linha, processa célula [1][0])","Volta 4: i = 1, j = 1 (processa célula [1][1], conclui a matriz)"], "Rastreamento passo a passo da travessia de uma matriz 2x2."),
          p("Associe o elemento do laço de matriz ao seu papel:", [["Laço externo (i)","Controla o avanço vertical percorrendo cada linha"],["Laço interno (j)","Controla o avanço horizontal percorrendo cada coluna da linha"],["grade[i][j]","Acessa a célula individual na interseção da linha e coluna"],["Complexidade O(n * m)","Custo computacional total proporcional ao produto das dimensões"]], "Dinâmica de funcionamento de laços aninhados em estruturas bidimensionais.")
        ]
      }
    ],
    5: [
      {
        id: "js-c04-u5-l1",
        title: "O laço while e repetições baseadas em condição",
        subtitle: "Fluxo indeterminado · Repetindo até que uma premissa mude de estado",
        theory: "O laço while(condicao) repete um bloco de instruções enquanto a expressão booleana de teste permanecer truthy. Ao contrário do laço for que é ideal para contagens conhecidas, o laço while é indicado para repetições com número indeterminado de ciclos, dependendo de eventos externos ou alterações de dados.",
        questions: [
          q("Quando o uso do laço while é preferível em relação ao laço for tradicional?", "Quando o número total de iterações não é conhecido antecipadamente, dependendo de uma condição dinâmica", ["Quando o array tem tamanho fixo","Apenas para programas em tela cheia"], "Exemplos incluem aguardar uma conexão de rede, ler pacotes até o fim de um fluxo ou esperar ação do usuário."),
          q("O que acontece se a condição do while já for false na primeira avaliação?", "O corpo do laço nunca é executado e o programa segue imediatamente para a linha seguinte", ["O corpo executa exatamente uma vez","Dispara erro em tempo de execução"], "A condição do while é pré-testada antes de ingressar no bloco."),
          q("Qual é a diferença fundamental entre o laço while e o laço do...while?", "while testa a condição antes da primeira execução; do...while executa o bloco pelo menos uma vez antes do teste", ["do...while não aceita booleanos","while só roda no servidor"], "do...while garante a execução obrigatória do primeiro ciclo mesmo que a premissa seja falsa."),
          q("O que deve obrigatoriamente acontecer dentro do corpo de um laço while?", "Pelo menos uma instrução deve alterar o estado de variáveis que compõem a condição de parada", ["Uma chamada ao console.log","Uma conversão de tipos"], "Sem mutação no estado monitorado, a condição nunca mudará para false, travando o processo."),
          t("Qual palavra-chave inicia uma estrutura de repetição pré-testada baseada em condição?", ["while"], "while(condicao) { ... } repete enquanto a condição for truthy.", "# laco condicional pre-testado"),
          g("Complete o laço while que executa enquanto houver saldo disponível:", ["while (saldo > 0) {\n    efetuarPagamento();\n}"], "while avalia se saldo é positivo antes de cada ciclo.", "____ (saldo > 0) {\n    efetuarPagamento();\n}"),
          o("Ordene as etapas executadas em cada ciclo de um laço while:", ["Avaliar a expressão condicional presente nos parênteses do while","Se for falsy: interromper o laço e avançar para a linha após as chaves","Se for truthy: executar as instruções contidas no corpo do bloco","Retornar ao topo para nova avaliação da expressão condicional"], "Ciclo de controle de fluxo de um laço while pré-testado."),
          p("Associe a estrutura de repetição ao seu comportamento de entrada:", [["while (condicao)","Testa a condição antes da primeira volta (pode rodar zero vezes)"],["do { ... } while (condicao)","Executa o corpo primeiro e testa depois (roda no mínimo uma vez)"],["Condição permanentemente true","Gera laço infinito a menos que contenha break interno"],["Condição inicialmente false","Pula todo o bloco sem executar nenhuma instrução"]], "Características operacionais de laços de repetição baseados em condição.")
        ]
      },
      {
        id: "js-c04-u5-l2",
        title: "Prevenção de laços infinitos e atualização de estado",
        subtitle: "Convergência · Garantindo que a condição atinja o critério de parada",
        theory: "Um laço infinito ocorre quando a condição de parada do laço jamais se torna falsa, congelando a thread principal do JavaScript e travando o navegador ou servidor. Prevenir laços infinitos exige garantir a convergência matemática do estado em direção ao critério de parada a cada iteração.",
        questions: [
          q("Qual é a causa mais comum de um laço infinito em JavaScript?", "Esquecer de incrementar ou atualizar a variável de controle dentro do corpo do laço", ["Usar let em vez de const","Comparar strings com ==="], "Se o contador nunca avança, a condição inicial de permanência permanece eternamente verdadeira."),
          q("Qual é o sintoma imediato de um laço infinito síncrono em uma página web no navegador?", "A aba do navegador congela completamente, para de responder a cliques e o consumo de CPU atinge 100%", ["O navegador fecha sozinho","A tela fica preta"], "Como o JavaScript roda em uma thread única (single-thread), o laço infinito bloqueia o event loop indefinidamente."),
          q("Como proteger laços que dependem de condições complexas contra travamentos permanentes?", "Implementando um contador de segurança de iterações máximas (guarda de segurança de loop)", ["Aumentando a memória do computador","Trocando while por if"], "Se o contador atingir um teto (ex: 10.000 voltas), o laço aborta e lança uma exceção preventiva."),
          q("Por que decrementos mal planejados podem levar a laços infinitos?", "Se o contador decrementar sem atingir a condição de corte ou extrapolar o tipo, o laço nunca para", ["Porque o computador não aceita números negativos","Porque o decremento é assíncrono"], "Erros de lógica nos operadores relacionais (< em vez de >) invertem o sentido de convergência."),
          t("Qual componente fundamental do motor JavaScript é bloqueado e congelado por um laço infinito síncrono?", ["event loop"], "O event loop fica impedido de processar cliques, eventos e renderização.", "# fila de eventos do JavaScript"),
          g("Complete o incremento indispensável para evitar o laço infinito:", ["let contador = 0;\nwhile (contador < 5) {\n    contador++;\n}"], "contador++ assegura que o laço atinja a condição de saída 5.", "let contador = 0;\nwhile (contador < 5) {\n    ____;\n}"),
          o("Ordene as boas práticas para projetar um laço while convergente e seguro:", ["Definir claramente o critério de término ou estado meta da operação","Inicializar a variável de controle com valor válido antes do laço","Garantir que cada volta aproxime o estado um passo mais perto da saída","Incluir uma trava de segurança com limite máximo de voltas permitidas"], "Metodologia preventiva para construção de laços convergentes e blindados."),
          p("Associe o erro de laço à sua consequência operacional:", [["Falta de incremento no contador","Travamento do processo em laço infinito"],["Condição invertida (i > 10 com i = 0)","O laço nunca executa nenhuma iteração"],["Contador de segurança excedido","Disparo de erro prevenindo travamento da thread"],["Mutação concorrente de lista","Comportamento errático ou percurso inconsistente"]], "Diagnósticos comuns em defeitos de laços de repetição.")
        ]
      },
      {
        id: "js-c04-u5-l3",
        title: "Valores sentinela para encerramento de laços",
        subtitle: "Sinais de parada · Detectando entradas especiais de encerramento",
        theory: "Um valor sentinela é um dado especial predefinido (como -1, null ou \"SAIR\") utilizado como sinal explícito para interromper um laço de repetição. Esse padrão é clássico em fluxos de leitura contínua, onde a quantidade de entradas é desconhecida e o término é comunicado por um marcador delimitador.",
        questions: [
          q("O que é um \"valor sentinela\" em estruturas de repetição?", "Um valor especial pré-acordado cuja presença indica que a leitura ou o laço deve ser encerrado", ["Uma variável que guarda a senha","Um tipo de dado exclusivo do Node.js"], "Exemplo clássico: ler números até que o usuário digite -1 para calcular a média."),
          q("Qual cuidado essencial deve ser tomado ao escolher um valor sentinela para um sistema?", "O valor sentinela não pode coincidir com um dado válido pertencente ao domínio legítimo da aplicação", ["Deve ser sempre uma letra maiúscula","Deve ser gerado aleatoriamente"], "Se -1 puder ser uma temperatura ou saldo válido, ele não pode ser o sentinela de parada."),
          q("Como implementar a parada ao detectar um valor sentinela dentro de um laço while?", "Verificando if (entrada === SENTINELA) break; imediatamente após a leitura do dado", ["Chamando a função stop()","Desligando o computador"], "A detecção precoce impede que o valor sentinela seja processado como se fosse dado real de negócio."),
          q("Por que valores sentinelas não devem entrar em cálculos de acumuladores ou médias?", "Porque o sentinela não é um dado real e corromperia os resultados matemáticos finais", ["Porque o computador não soma strings","Porque causaria erro de sintaxe"], "O teste deve ocorrer antes de somar a entrada ao acumulador geral."),
          t("Qual instrução de desvio encerra o laço imediatamente ao detectar o valor sentinela?", ["break"], "break interrompe o laço assim que o sentinela for lido.", "# encerra laco no valor sentinela"),
          g("Complete a verificação que interrompe o laço ao encontrar o sentinela -1:", ["if (valorLido === -1) {\n    break;\n}"], "O break impede que o sentinela -1 entre na contabilidade dos dados.", "if (valorLido === -1) {\n    ____;\n}"),
          o("Ordene as etapas do algoritmo clássico de leitura com valor sentinela:", ["Ler a primeira entrada de dados do fluxo","Avaliar se o dado recebido coincide estritamente com o sentinela de parada","Se coincidir: interromper o laço imediatamente sem processar o sentinela","Se não coincidir: processar o dado, atualizar o acumulador e ler a próxima entrada"], "Fluxo canônico de controle baseado em sinal sentinela de término."),
          p("Associe o sentinela ao seu contexto clássico de uso:", [["Valor -1","Sentinela numérico em coleções de números estritamente positivos"],["String \"SAIR\"","Sentinela textual em interfaces de linha de comando (CLI)"],["Valor null","Sentinela de esgotamento de leitura em fluxos de objetos"],["EOF (End Of File)","Sentinela do sistema operacional sinalizando fim de arquivo"]], "Padrões de valores sentinelas adotados na engenharia de software.")
        ]
      },
      {
        id: "js-c04-u5-l4",
        title: "Processamento de filas e pilhas com while",
        subtitle: "Estruturas dinâmicas · Esvaziando buffers com array.shift() e pop()",
        theory: "O laço while é a estrutura ideal para drenar e processar filas (FIFO) e pilhas (LIFO). A condição while(fila.length > 0) extrai elementos dinamicamente com fila.shift() (primeiro a entrar, primeiro a sair) ou pilha.pop() (último a entrar, primeiro a sair), permitindo adicionar novos itens durante a execução.",
        questions: [
          q("Qual método de array combinado com while remove e retorna o primeiro elemento de uma fila (FIFO)?", "array.shift()", ["array.push()","array.slice()"], "FIFO (First-In, First-Out): shift extrai o item mais antigo da fila na ordem de chegada."),
          q("Qual método de array combinado com while remove e retorna o elemento do topo de uma pilha (LIFO)?", "array.pop()", ["array.unshift()","array.concat()"], "LIFO (Last-In, First-Out): pop desempilha o último item inserido na estrutura."),
          q("Qual condição simples e idiomática esvazia uma fila de tarefas completamente?", "while (fila.length > 0) ou simplesmente while (fila.length)", ["while (fila == true)","for (let i = 0; i < fila; i++)"], "A cada iteração o tamanho da fila diminui até atingir zero (falsy), encerrando o laço naturalmente."),
          q("O que acontece se uma tarefa processada dentro do while adicionar duas novas subtarefas à fila?", "O laço processará as novas subtarefas normalmente, estendendo o tempo de execução dinamicamente", ["O JavaScript trava por estouro","As novas tarefas são ignoradas"], "Padrão essencial para algoritmos de busca em largura (BFS) e rastreadores (crawlers) de páginas."),
          t("Qual método de array remove o primeiro elemento da fila no padrão FIFO?", ["shift"], "array.shift() remove o índice 0 da fila.", "# remove primeiro elemento da fila"),
          g("Complete o desempilhamento contínuo das tarefas pendentes:", ["while (pilha.length > 0) {\n    const tarefa = pilha.pop();\n    executar(tarefa);\n}"], "pop extrai o item do topo da pilha até esgotar o tamanho.", "while (pilha.length > 0) {\n    const tarefa = pilha.____();\n    executar(tarefa);\n}"),
          o("Ordene o fluxo de processamento de uma fila de mensagens de background:", ["Inserir mensagens recebidas no final da fila com fila.push(msg)","Abrir o laço consumidor com while (fila.length > 0)","Extrair a mensagem mais antiga da frente com const msg = fila.shift()","Processar e despachar a mensagem liberando o buffer"], "Ciclo de vida do processamento de filas de mensageria com arrays em JavaScript."),
          p("Associe a estrutura de dados ao seu padrão de extração com while:", [["Fila (Queue - FIFO)","while (fila.length) { const item = fila.shift(); }"],["Pilha (Stack - LIFO)","while (pilha.length) { const item = pilha.pop(); }"],["Buffer circular","Estrutura de tamanho fixo que sobrescreve os mais antigos"],["Tamanho fila.length === 0","Critério natural de encerramento do esvaziamento"]], "Padrões de manipulação de buffers e filas dinâmicas.")
        ]
      },
      {
        id: "js-c04-u5-l5",
        title: "Polling e tentativas com contadores de timeout",
        subtitle: "Resiliência · Limitando tentativas em loops assíncronos",
        theory: "O padrão de polling executa verificações repetidas em intervalos até que uma condição assíncrona seja atendida ou o limite de tentativas expire. Para evitar laços eternos em falhas de rede, o loop deve conter um contador estrito de tentativas máximas (maxRetries) e espera progressiva (backoff).",
        questions: [
          q("Por que loops de polling devem sempre conter um limite máximo de tentativas (maxRetries)?", "Para evitar que o programa fique preso eternamente consumindo recursos caso o serviço externo caia", ["Para gastar menos bytes no código","Porque o navegador bloqueia laços com mais de 3 voltas"], "Se o serviço falhar definitivamente, o laço atinge o limite e dispara um erro de timeout auditável."),
          q("O que é a técnica de \"Exponential Backoff\" em loops de tentativas de conexão?", "Aumentar o tempo de espera exponencialmente entre cada tentativa falha (ex: 1s, 2s, 4s, 8s)", ["Diminuir o tempo de espera para zero","Tentar todas as conexões ao mesmo tempo"], "Previne sobrecarregar o servidor que já está instável com uma enxurrada de requisições imediatas."),
          q("Como estruturar a condição de um laço de polling seguro?", "while (!sucesso && tentativas < maxTentativas)", ["while (true)","while (tentativas == 0)"], "Combina o indicador de sucesso com a trava de segurança numérica de tentativas."),
          q("O que o código deve fazer ao sair do laço de polling com tentativas esgotadas sem sucesso?", "Lançar uma exceção de Timeout (throw new Error(\"Limite de tentativas excedido\"))", ["Fingir que a operação deu certo","Reiniciar o computador"], "Comunica formalmente ao chamador que a operação não pôde ser completada no prazo estipulado."),
          t("Qual termo em inglês designa a espera exponencial progressiva entre tentativas consecutivas de repetição?", ["backoff"], "Exponential backoff é o padrão de resiliência em redes.", "# estrategia de espera progressiva entre retries"),
          g("Complete a condição que limita as tentativas no laço de espera:", ["while (!conectado && tentativas < maximoTentativas) {\n    tentativas++;\n}"], "Garante que o loop termine caso as tentativas se esgotem.", "while (!conectado && tentativas < ____) {\n    tentativas++;\n}"),
          o("Ordene as etapas de uma rotina de retry com backoff exponencial:", ["Tentar executar a operação de rede inicial","Se falhar, verificar se o contador de tentativas atingiu o limite máximo","Calcular o tempo de espera com crescimento exponencial (espera = base * 2 ** tentativas)","Aguardar o intervalo e incrementar o contador antes de tentar novamente"], "Pipeline profissional de repetição resiliente para chamadas assíncronas."),
          p("Associe o parâmetro de polling à sua respectiva responsabilidade:", [["maxRetries","Número máximo permitido de tentativas antes do descarte"],["tentativas++","Incremento obrigatório a cada ciclo de falha"],["TimeoutError","Exceção lançada ao atingir o teto de tentativas"],["Exponential Backoff","Multiplicação da pausa para dar tempo de recuperação ao servidor"]], "Elementos fundamentais de algoritmos de resiliência e polling em JavaScript.")
        ]
      }
    ],
    6: [
      {
        id: "js-c04-u6-l1",
        title: "Interrompendo laços prematuramente com break",
        subtitle: "Otimização · Abortando a busca assim que o item for localizado",
        theory: "A instrução break encerra imediatamente a execução do laço de repetição corrente (for, while ou do...while), transferindo o fluxo para a primeira linha fora do bloco do laço. Esse recurso é essencial para otimizar buscas lineares, evitando iterar inutilmente sobre milhares de itens após encontrar o resultado.",
        questions: [
          q("O que acontece quando a instrução break é executada dentro de um laço for?", "O laço é interrompido imediatamente e o controle salta para a instrução após o fechamento do laço", ["O laço pula apenas a volta atual","A função inteira é encerrada"], "Cancela qualquer ciclo restante, liberando a CPU assim que a meta é atingida."),
          q("Por que usar break em uma busca linear em um array de 100.000 itens é uma otimização crítica?", "Se o item for o terceiro da lista, evita rodar as 99.997 voltas restantes desnecessariamente", ["Porque reduz o consumo de internet","Porque o break ordena o array"], "Reduz drasticamente o tempo médio de execução em algoritmos de busca e localização."),
          q("Qual é a diferença entre a instrução break e a instrução return dentro de um laço em uma função?", "break sai apenas do laço continuando na função; return encerra a função inteira devolvendo o valor", ["break devolve valores","Não há diferença"], "break preserva a execução de tarefas subsequentes planejadas dentro da mesma função."),
          q("A instrução break pode ser utilizada fora de laços e switches em JavaScript?", "Não, utilizar break isolado fora de estruturas iterativas ou switch resulta em SyntaxError", ["Sim, funciona em qualquer if","Sim, em qualquer bloco"], "break é reservado estritamente para quebra de laços e blocos switch."),
          t("Qual palavra-chave interrompe e encerra imediatamente a execução de um laço?", ["break"], "break quebra a estrutura iterativa no ponto da invocação.", "# instrucao de quebra de laco"),
          g("Complete a interrupção precoce da busca assim que o usuário for localizado:", ["if (usuario.id === idBuscado) {\n    usuarioEncontrado = usuario;\n    break;\n}"], "break encerra o laço sem examinar os próximos elementos.", "if (usuario.id === idBuscado) {\n    usuarioEncontrado = usuario;\n    ____;\n}"),
          o("Ordene a cronologia de uma busca linear em array de 10 elementos onde o item está no índice 2:", ["Iteração i = 0: verifica item e não encontra correspondência","Iteração i = 1: verifica item e não encontra correspondência","Iteração i = 2: encontra correspondência e aciona a instrução break","Pula os índices de 3 a 9 e salta direto para fora das chaves do laço"], "Economia de iterações proporcionada pelo comando break em buscas lineares."),
          p("Associe a instrução de controle de fluxo à sua consequência:", [["break","Interrompe o laço de repetição imediatamente"],["continue","Pula para o próximo ciclo do mesmo laço"],["return","Encerra a função inteira e devolve um valor"],["throw","Aborta o fluxo normal lançando uma exceção"]], "Diferenças de escopo entre instruções de desvio e interrupção em JavaScript.")
        ]
      },
      {
        id: "js-c04-u6-l2",
        title: "Pulando iterações atuais com continue",
        subtitle: "Filtros rápidos · Avançando o laço ao encontrar itens inválidos",
        theory: "A instrução continue encerra prematuramente apenas a iteração atual do laço de repetição, saltando as instruções restantes daquela volta e avançando imediatamente para a avaliação do próximo ciclo (executando o passo de incremento no laço for). É amplamente utilizada para ignorar itens inválidos ou nulos.",
        questions: [
          q("Qual é o efeito da execução de continue dentro de um laço for?", "Ignora as instruções restantes da volta atual e salta direto para o passo de incremento e próxima condição", ["Encerra o laço inteiro definitivamente","Reinicia o laço a partir do zero"], "O laço continua vivo, apenas descarta a execução do trecho inferior naquele elemento específico."),
          q("Como continue ajuda a manter o código de processamento mais plano e sem ifs profundos?", "Ignora casos inválidos no topo com if (!valido) continue;, deixando o processamento principal no nível zero", ["Apaga as linhas de código","Transforma números em booleanos"], "Atua como uma cláusula de guarda (guard clause) local para cada volta de repetição do loop."),
          q("O que acontece se a instrução continue for executada dentro de um laço while?", "Salta para a avaliação da condição do while (atenção: o incremento deve ocorrer antes do continue)", ["O computador desliga","O laço for vira switch"], "Cuidado crucial: se o contador do while estiver após o continue, ocorrerá um laço infinito."),
          q("Qual é a diferença funcional entre break e continue?", "break aborta o laço por completo; continue descarta apenas a iteração atual e avança para a próxima", ["continue para o laço","Ambos são idênticos"], "break encerra; continue pula para o próximo item da fila."),
          t("Qual palavra-chave salta as instruções restantes da volta atual avançando para o próximo ciclo?", ["continue"], "continue pula direto para o passo da próxima iteração.", "# pula volta atual do laco"),
          g("Complete o descarte de números ímpares no laço de contabilidade:", ["if (numero % 2 !== 0) {\n    continue;\n}\nprocessarPar(numero);"], "continue ignora números ímpares sem processar as linhas seguintes.", "if (numero % 2 !== 0) {\n    ____;\n}\nprocessarPar(numero);"),
          o("Ordene as etapas executadas ao encontrar continue em um laço for (let i = 0; i < 5; i++):", ["A condição no topo if (i === 2) avalia para true","A instrução continue é acionada","As instruções restantes abaixo de continue naquele bloco são ignoradas","O passo i++ é executado e o laço avalia i < 5 para o índice 3"], "Fluxo sequencial de salto e atualização acionado pela instrução continue."),
          p("Associe a instrução ao seu comportamento específico no laço:", [["continue no for","Pula o restante da volta e executa o passo de incremento do cabeçalho"],["continue no while","Pula o restante da volta e salta direto para o teste condicional"],["break no for","Cancela o laço definitivamente sem executar o incremento"],["if (!item) continue;","Padrão idiomático de guarda para descartar entradas nulas"]], "Comportamento da instrução continue em diferentes laços de repetição.")
        ]
      },
      {
        id: "js-c04-u6-l3",
        title: "Rótulos (Labels) em laços aninhados",
        subtitle: "Controle multinível · Interrompendo laços externos com break rotulo",
        theory: "Um rótulo (label) é um identificador seguido por dois pontos colocado antes de uma estrutura de repetição (ex: externo: for(...)). Ele permite que instruções como break rotulo ou continue rotulo controlem diretamente o laço mais externo a partir de dentro de um laço aninhado profundo.",
        questions: [
          q("Qual é a principal utilidade de um rótulo (label) em JavaScript?", "Permitir que uma instrução break ou continue atue sobre um laço externo a partir de um laço aninhado", ["Nomear funções anônimas","Criar variáveis globais"], "Sem rótulos, um break dentro de laços aninhados só consegue interromper o laço mais interno imediato."),
          q("Como definir a sintaxe de um rótulo antes de um laço de repetição?", "identificador: seguido imediatamente pela instrução do laço (ex: loopExterno: for(...))", ["label(loopExterno) {","#loopExterno"], "A sintaxe com dois pontos associa o identificador léxico àquela estrutura de controle específica."),
          q("O que o comando break loopExterno; faz quando executado dentro do laço interno?", "Interrompe tanto o laço interno quanto o externo, saltando para fora de toda a estrutura aninhada", ["Reinicia o laço externo","Interrompe apenas o laço interno"], "Permite abortar buscas em matrizes bidimensionais instantaneamente assim que a célula for encontrada."),
          q("Por que rótulos não devem ser usados indiscriminadamente em código simples?", "Podem assemelhar-se a comandos de goto legados, dificultando a rastreabilidade do fluxo de execução", ["Porque o navegador cobra créditos por label","Porque quebram as classes"], "Prefira extrair a matriz para uma função dedicada e utilizar a instrução return quando possível."),
          t("Qual símbolo de pontuação sucede o identificador do rótulo na declaração de um label?", [":"], "Sintaxe: loopExterno: for (...).", "# pontuacao de declaracao de label"),
          g("Complete o encerramento do laço externo usando a referência rotulada:", ["buscaMatriz: for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n        if (grade[i][j] === alvo) break buscaMatriz;\n    }\n}"], "break buscaMatriz salta para fora de ambos os laços.", "buscaMatriz: for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n        if (grade[i][j] === alvo) break ____;\n    }\n}"),
          o("Ordene as etapas de uma interrupção multinível usando laços rotulados:", ["Declarar o rótulo antes do laço pai: externo: for (...)","Abrir o laço filho aninhado: interno: for (...)","Localizar o elemento procurado na matriz com if (condicao)","Executar break externo; para encerrar os dois laços simultaneamente"], "Fluxo de escape multinível de repetições aninhadas com labels."),
          p("Associe a instrução com rótulo ao seu efeito correspondente:", [["break rotulo","Interrompe o laço associado ao rótulo saltando para fora dele"],["continue rotulo","Avança para a próxima iteração do laço indicado pelo rótulo"],["rotulo: for(...)","Associa um nome de controle àquela estrutura de repetição"],["break sem rótulo","Interrompe exclusivamente o laço mais interno imediato"]], "Operação de rótulos de controle de fluxo multinível em JavaScript.")
        ]
      },
      {
        id: "js-c04-u6-l4",
        title: "Break e continue em laços while e for...of",
        subtitle: "Compatibilidade · Controle de fluxo unificado em diferentes laços",
        theory: "As instruções break e continue operam de maneira uniforme em laços for clássicos, while, do...while e for...of. Essa consistência semântica permite aplicar as mesmas técnicas de interrupção precoce e filtro rápido em qualquer estrutura de iteração da linguagem JavaScript.",
        questions: [
          q("O que acontece se usarmos a instrução break dentro de um laço for (const item of colecao)?", "O laço for...of é encerrado imediatamente e os itens restantes da coleção não são processados", ["Lança TypeError: break is not defined","O array é esvaziado"], "O for...of implementa suporte nativo completo ao protocolo de interrupção e desvio de laços."),
          q("Qual cuidado crítico deve ser tomado ao usar continue dentro de um laço while?", "Garantir que a instrução de incremento da variável de controle ocorra antes do continue para não travar em laço infinito", ["Usar sempre números pares","Converter o contador para string"], "Se o incremento ficar abaixo do continue, ele será pulado e o laço repetirá a mesma condição eternamente."),
          q("Por que o método funcional array.forEach() NÃO suporta as instruções break e continue?", "forEach recebe uma função de callback separada por elemento; break e continue não funcionam através de fronteiras de função", ["Porque forEach roda em assembly","Porque forEach só aceita números"], "Para interromper iterações funcionais precocemente, deve-se usar .some(), .every() ou retornar ao laço for...of."),
          q("Como simular o efeito de um continue dentro do callback de um array.forEach()?", "Utilizando a instrução return dentro da função de callback para encerrar apenas aquela chamada individual", ["Usando a palavra skip","Usando exit()"], "O return encerra a execução do callback daquele elemento e o forEach avança para o próximo."),
          t("Qual método de array funcional permite interrupção precoce retornando false ao encontrar o item?", ["every"], "array.every() interrompe o percurso no primeiro retorno falsy.", "# metodo funcional com parada precoce"),
          g("Complete o descarte de itens nulos dentro do laço for...of moderno:", ["for (const item of lista) {\n    if (item == null) continue;\n    processar(item);\n}"], "continue pula elementos nulos no percurso do for...of.", "for (const item of lista) {\n    if (item == null) ____;\n    processar(item);\n}"),
          o("Ordene as alternativas para iterar sobre um array com suporte nativo a interrupção precoce:", ["for...of com break: idiomático, legível e com quebra imediata nativa","for clássico com contador e break: controle numérico de índice e parada","array.some(callback): para quando o callback retornar true","array.forEach: NÃO suporta break, obriga percurso de 100% dos elementos"], "Comparação de estruturas quanto à flexibilidade de interrupção precoce."),
          p("Associe o laço ao seu suporte a break nativo:", [["for...of","Suporta break e continue nativamente com sintaxe limpa"],["while (cond)","Suporta break e continue (exige atenção ao incremento)"],["for (;;)","Suporta break e continue nativamente no escopo de bloco"],["array.forEach","Não aceita break nem continue por fronteira de closure"]], "Capacidades de interrupção precoce através de diferentes tipos de laços.")
        ]
      },
      {
        id: "js-c04-u6-l5",
        title: "Substituindo continue por funções de alta ordem",
        subtitle: "Estilo funcional · Comparando loops manuais com .filter() e .some()",
        theory: "Em JavaScript idiomático, muitos laços imperativos que combinam continue e break para filtragem e localização podem ser refatorados para métodos de alta ordem (higher-order functions). Métodos como .filter(), .find() e .some() tornam o código declarativo, expressivo e livre de mutações de estado manuais.",
        questions: [
          q("Qual método de array substitui um laço de busca que utiliza break para retornar o primeiro item encontrado?", "array.find(predicado)", ["array.map()","array.push()"], "find() itera até o primeiro elemento que satisfaz a condição e o retorna, interrompendo o percurso."),
          q("Qual método de array substitui um laço que usa continue para ignorar itens que não atendem a um filtro?", "array.filter(predicado)", ["array.reduce()","array.pop()"], "filter() retorna um novo array contendo exclusivamente os elementos aprovados pelo teste booleano."),
          q("Qual método verifica se pelo menos um elemento satisfaz uma condição (equivalente a break ao achar true)?", "array.some(predicado)", ["array.every()","array.includes()"], "some() faz curto-circuito e retorna true imediatamente no primeiro elemento compatível."),
          q("Quando um laço tradicional com break/continue ainda é preferível em relação a métodos funcionais?", "Em seções críticas de desempenho em processamento de milhões de itens com alocação zero de arrays intermediários", ["Nunca, laços são proibidos","Apenas no Node.js antigo"], "Loops imperativos evitam a criação de novos arrays na memória heap em loops de altíssima frequência."),
          t("Qual método de array retorna o índice do primeiro elemento que satisfaz o predicado ou -1 se não encontrar?", ["findIndex"], "array.findIndex(callback) busca o índice com interrupção precoce.", "# busca indice com predicado funcional"),
          g("Complete a busca funcional do primeiro usuário administrador:", ["const admin = usuarios.find(u => u.isAdmin);"], "find() localiza o elemento de forma declarativa e concisa.", "const admin = usuarios.____(u => u.isAdmin);"),
          o("Ordene as abordagens de filtragem por estilo (do mais imperativo ao mais declarativo):", ["Laço for manual acumulando em array com if e continue de descarte","Laço for...of iterando valores com push condicional","Método funcional array.filter(u => u.ativo): declarativo puro","Pipeline combinada: array.filter(...).map(...): transformação composta"], "Evolução paradigmática de filtros em JavaScript do estilo imperativo ao funcional."),
          p("Associe o método funcional ao seu equivalente imperativo com break/continue:", [["array.find()","Laço com if (condicao) { resultado = item; break; }"],["array.filter()","Laço com if (!condicao) continue; acumulando no array"],["array.some()","Laço com if (condicao) return true; break;"],["array.every()","Laço com if (!condicao) return false; break;"]], "Mapeamento semântico entre métodos funcionais de array e laços imperativos.")
        ]
      }
    ],
    7: [
      {
        id: "js-c04-u7-l1",
        title: "Padrão de acumulação de soma e produto",
        subtitle: "Totalizadores · Somando e multiplicando sequências numéricas",
        theory: "O padrão acumulador inicializa uma variável antes do laço e a atualiza a cada iteração com valores da sequência. Para somatórios, o acumulador inicia no elemento neutro da adição (0). Para produtórios (como cálculos de juros ou fatorial), deve obrigatoriamente iniciar no elemento neutro da multiplicação (1).",
        questions: [
          q("Qual deve ser o valor inicial de um acumulador utilizado para calcular a soma total de itens?", "0 (zero, elemento neutro da adição)", ["1","-1"], "Iniciar a soma com zero garante que nenhuma quantidade espúria altere o somatório."),
          q("Qual deve ser o valor inicial de um acumulador utilizado para calcular o produto (multiplicação)?", "1 (um, elemento neutro da multiplicação)", ["0","10"], "Se o acumulador de produto for inicializado com zero, todas as multiplicações resultarão em zero."),
          q("Como acumular a soma das notas dentro de um laço for...of?", "soma += nota; (ou soma = soma + nota)", ["soma = nota;","soma++;"], "O operador += combina o valor acumulado anterior com o elemento atual do ciclo."),
          q("O que acontece se declararmos o acumulador com const no início do laço (ex: const soma = 0)?", "Lança um erro em tempo de execução: TypeError: Assignment to constant variable", ["O laço roda normalmente","O resultado é multiplicado por 2"], "Variáveis acumuladoras precisam sofrer mutação a cada volta e devem ser declaradas com let."),
          t("Qual número representa o elemento neutro para inicializar acumuladores de produto?", ["1"], "1 * x = x, preservando a multiplicação.", "# elemento neutro da multiplicacao"),
          g("Complete a inicialização correta do acumulador para cálculo de média:", ["let soma = 0;\nfor (const valor of notas) {\n    soma += valor;\n}"], "let permite a reatribuição e 0 inicializa o somatório neutro.", "____ soma = 0;\nfor (const valor of notas) {\n    soma += valor;\n}"),
          o("Ordene as etapas do algoritmo clássico de acumulação de soma:", ["Declarar a variável acumuladora let total = 0 antes de abrir o laço","Percorrer os elementos da coleção com for (const item of colecao)","Acrescentar o valor do item ao acumulador com total += item.valor","Ao término do laço, consumir ou retornar o valor consolidado de total"], "Estrutura formal do padrão de engenharia para acumulação de dados."),
          p("Associe a operação de acumulação ao seu valor inicial neutro:", [["Acumulador de soma","Inicializa com 0 (zero)"],["Acumulador de produto","Inicializa com 1 (um)"],["Acumulador de texto","Inicializa com \"\" (string vazia)"],["Acumulador de lista","Inicializa com [] (array vazio)"]], "Elementos neutros de inicialização para diferentes tipos de acumuladores.")
        ]
      },
      {
        id: "js-c04-u7-l2",
        title: "Padrão de busca de valor máximo e mínimo",
        subtitle: "Extremos · Rastreando picos sem ordenar toda a coleção",
        theory: "A busca de extremos (máximo e mínimo) percorre a lista comparando cada elemento com o melhor valor registrado até então. A variável de controle deve ser inicializada com o primeiro elemento da coleção ou com -Infinity (para máximo) e Infinity (para mínimo), evitando erros causados por listas só com números negativos.",
        questions: [
          q("Por que inicializar a variável de valor máximo com let max = 0 pode gerar bugs graves?", "Se todos os números da lista forem negativos (ex: [-10, -5, -20]), o algoritmo dirá erroneamente que o máximo é 0", ["Porque o computador não aceita o número zero","Porque trava o laço"], "O zero não pertence à lista e mascara o verdadeiro extremo quando todos os dados forem negativos."),
          q("Qual é o valor numérico ideal para inicializar a variável max na busca de máximo caso a lista não esteja vazia?", "O primeiro elemento da própria coleção (ex: let max = lista[0]) ou -Infinity", ["Zero obrigatoriamente","O tamanho do array"], "Garante que o ponto de partida pertença à distribuição real dos dados examinados."),
          q("Qual é o valor inicial recomendado para a variável min na busca de menor valor?", "lista[0] ou Infinity", ["0","-Infinity"], "Qualquer número real válido será menor que Infinity, atualizando o mínimo no primeiro elemento."),
          q("Qual é a complexidade de tempo de encontrar o maior elemento com um único laço for?", "O(n) (tempo linear, percorre cada elemento exatamente uma vez)", ["O(n log n)","O(n²)"], "É muito mais rápido do que ordenar todo o array com .sort() (que custa O(n log n))."),
          t("Qual constante numérica especial embutida no JavaScript deve ser usada como partida para máximo?", ["-Infinity"], "-Infinity é menor que qualquer número real representável.", "# menor valor numerico possivel"),
          g("Complete a atualização condicional do valor máximo encontrado:", ["if (valor > maior) {\n    maior = valor;\n}"], "Atualiza a variável de pico quando um número maior é detectado.", "if (valor > maior) {\n    ____ = valor;\n}"),
          o("Ordene as etapas do algoritmo de busca de valor máximo:", ["Verificar se a lista contém elementos (retornar erro ou null se vazia)","Inicializar a variável let maior = lista[0]","Percorrer os elementos restantes comparando com if (item > maior)","Atualizar maior = item sempre que um número superar o pico anterior"], "Algoritmo canônico em tempo linear O(n) para localização de valor máximo."),
          p("Associe o extremo procurado à sua inicialização segura correspondente:", [["Busca de Máximo (sem elemento inicial)","Inicializa com -Infinity"],["Busca de Mínimo (sem elemento inicial)","Inicializa com Infinity"],["Busca com coleção conhecida","Inicializa com o elemento no índice 0 (arr[0])"],["Math.max(...arr)","Função built-in para coleções pequenas"]], "Estratégias de inicialização segura para rastreamento de extremos numéricos.")
        ]
      },
      {
        id: "js-c04-u7-l3",
        title: "Contadores condicionais e frequências",
        subtitle: "Estatística · Contabilizando ocorrências que satisfazem um predicado",
        theory: "Contadores condicionais contabilizam a frequência de eventos específicos dentro de um conjunto de dados. Um contador inteiro é incrementado apenas quando um predicado avalia para true. Mapas de frequência utilizam objetos ou Maps para contabilizar múltiplas categorias concorrentes em uma única passagem.",
        questions: [
          q("Como funciona um contador condicional dentro de um laço de repetição?", "Um contador numérico (let total = 0) é incrementado com total++ apenas quando uma condição if for satisfeita", ["Conta todos os itens sem exceção","Multiplica o tamanho do array por dois"], "Permite responder a perguntas de negócio como \"quantos pedidos foram cancelados?\"."),
          q("Como criar um mapa de frequências de palavras em um texto utilizando um objeto JavaScript?", "freq[palavra] = (freq[palavra] ?? 0) + 1 a cada palavra iterada", ["palavras.length * 2","Criando um switch por palavra"], "Se a palavra já existir, soma 1; se for a primeira vez (undefined), o ?? 0 fornece a base neutra."),
          q("Qual é a vantagem de utilizar uma instância de Map em vez de um objeto comum para frequências?", "O Map aceita chaves de qualquer tipo (inclusive números e objetos) e não sofre colisão com chaves de protótipo", ["O Map gasta menos CPU","O Map é imutável"], "Map evita conflitos históricos com propriedades herdadas de Object.prototype como \"toString\"."),
          q("Qual é o valor final de aprovados para as notas [4, 7, 9, 3] com filtro nota >= 6?", "2 (as notas 7 e 9 satisfazem a condição)", ["4","1"], "O contador condicional incrementou exatamente duas vezes."),
          t("Qual método de Map deve ser utilizado para recuperar a frequência anterior de uma chave?", ["get"], "map.get(chave) recupera o valor associado à chave.", "# recupera valor de chave em Map"),
          g("Complete o incremento seguro da contagem de ocorrências usando coalescência:", ["contagens[categoria] = (contagens[categoria] ?? 0) + 1;"], "?? 0 garante que a primeira ocorrência parta de zero somando 1.", "contagens[categoria] = (contagens[categoria] ____ 0) + 1;"),
          o("Ordene as etapas para construir um histograma de categorias com laço for...of:", ["Inicializar um objeto vazio de frequências: const contagem = {}","Iterar sobre cada item da coleção: for (const item of colecao)","Atualizar a frequência da categoria: contagem[item.tipo] = (contagem[item.tipo] ?? 0) + 1","Retornar o objeto consolidado com os totais de cada grupo"], "Pipeline padrão de agregação estatística e contagem de frequências."),
          p("Associe a pergunta analítica ao tipo de acumulador correspondente:", [["Quantos clientes estão ativos?","Contador condicional simples (let totalAtivos = 0)"],["Quantas vendas ocorreram por região?","Mapa de frequências agrupado (objeto ou Map)"],["Qual foi a receita total da empresa?","Acumulador de soma contínua"],["Existe algum item fora de estoque?","Flag booleana acumulada com short-circuit"]], "Mapeamento de demandas analíticas para tipos de acumuladores imperativos.")
        ]
      },
      {
        id: "js-c04-u7-l4",
        title: "Acumulando em novos arrays e strings",
        subtitle: "Coleta · Filtrando e transformando dados manualmente em laços",
        theory: "Acumuladores não precisam ser apenas numéricos. Inicializar arrays vazios (const aprovados = []) ou strings vazias e anexar elementos com .push() ou concatenação a cada iteração forma o mecanismo fundamental de filtragem e mapeamento imperativo de coleções.",
        questions: [
          q("Como funciona um acumulador de coleção para filtragem manual de elementos?", "Inicia-se com const resultado = [] e executa-se resultado.push(item) apenas para itens que atendem ao filtro", ["Substitui o array original","Deleta itens do array"], "Gera uma nova lista com os itens selecionados sem alterar o array original de entrada."),
          q("Por que é recomendável declarar o array acumulador com const (ex: const resultado = [])?", "A referência do array permanece estável enquanto seu conteúdo interno é mutado com .push()", ["Porque const impede o array de crescer","Porque o let é mais lento"], "const garante que o identificador resultado não seja reatribuído acidentalmente a outra estrutura."),
          q("Como construir uma representação textual de lista com marcadores (bullet points) usando acumulador de string?", "Inicia com let texto = \"\" e concatena texto += `* ${item}\\n` a cada iteração", ["Chamando toString() direto","Usando um acumulador numérico"], "Permite formatar e decorar saídas personalizadas linha por linha."),
          q("O que acontece se esquecermos de chamar .push() dentro do laço acumulador de array?", "O array final terminará vazio ([]), sem nenhum dos elementos processados", ["Lança TypeError imediato","O array copia o original"], "A coleta explícita via push é o que efetivamente armazena o dado filtrado."),
          t("Qual método de array insere um novo elemento no final do array acumulador?", ["push"], "array.push(novoItem) adiciona o elemento ao fim da coleção.", "# anexa item ao array acumulador"),
          g("Complete o acúmulo dos nomes válidos no novo array de destino:", ["if (usuario.nome) {\n    nomesValidos.push(usuario.nome);\n}"], "push anexa o elemento filtrado no array acumulador.", "if (usuario.nome) {\n    nomesValidos.____(usuario.nome);\n}"),
          o("Ordene as etapas da transformação manual de dados (mapeamento com laço):", ["Criar o array de destino vazio: const transformados = []","Percorrer a coleção de entrada com for (const item of entrada)","Calcular ou transformar o dado: const novoDado = converter(item)","Armazenar no acumulador com transformados.push(novoDado)"], "Implementação imperativa básica da operação funcional de mapeamento (map)."),
          p("Associe o método de acúmulo ao seu tipo de coleção resultante:", [["arr.push(item)","Acumulação em lista dinâmica de array"],["str += pedaco","Acumulação progressiva em string textual"],["set.add(item)","Acumulação com eliminação automática de duplicatas"],["map.set(k, v)","Acumulação em estrutura indexada de chave e valor"]], "Técnicas de acúmulo em diferentes estruturas de dados em JavaScript.")
        ]
      },
      {
        id: "js-c04-u7-l5",
        title: "Acumuladores vs Array.prototype.reduce",
        subtitle: "Paradigma · Mapeando o padrão imperativo para o equivalente funcional",
        theory: "O método funcional Array.prototype.reduce(callback, valorInicial) abstrai formalmente o padrão acumulador. O callback recebe o acumulador e o elemento atual a cada ciclo (acc, curr => ...), retornando o novo estado. O reduce unifica somas, contagens e transformações em uma única chamada imutável.",
        questions: [
          q("Qual método funcional embutido de Array é o equivalente formal do padrão acumulador?", "Array.prototype.reduce()", ["Array.prototype.map()","Array.prototype.filter()"], "reduce condensa todos os itens de um array em um único valor final de qualquer tipo."),
          q("Quais são os dois parâmetros centrais passados para a função de callback de um reduce?", "O acumulador (acc) e o elemento corrente (curr) da iteração", ["O índice e o tamanho","A chave e a senha"], "O valor retornado pelo callback em cada volta torna-se o acumulador da volta seguinte."),
          q("Por que é uma boa prática estrita sempre informar o segundo argumento (valorInicial) no reduce?", "Garante o tipo correto do acumulador e evita erros com arrays vazios (TypeError: Reduce of empty array)", ["Porque reduz pela metade o uso de memória","Para obrigar o array a ser numérico"], "Sem valorInicial, o reduce assume o primeiro elemento como acumulador, gerando falhas em listas vazias."),
          q("Como calcular a soma de [10, 20, 30] usando o método reduce?", "[10, 20, 30].reduce((total, n) => total + n, 0)", ["[10, 20, 30].reduce(total + n)","[10, 20, 30].sum()"], "O acumulador total inicia em 0 e recebe a soma de cada número da lista."),
          t("Qual método de alta ordem de Array unifica o padrão acumulador em estilo funcional?", ["reduce"], "array.reduce((acc, x) => acc + x, 0).", "# metodo funcional acumulador de array"),
          g("Complete o cálculo do somatório funcional usando reduce com base zero:", ["const total = numeros.reduce((acc, n) => acc + n, 0);"], "0 define a base de inicialização neutra do acumulador no reduce.", "const total = numeros.reduce((acc, n) => acc + n, ____);"),
          o("Ordene as etapas da execução de um reduce([1, 2, 3], (acc, n) => acc + n, 0):", ["Inicializar acc = 0 (valor informado no segundo argumento)","Ciclo 1: acc = 0 + 1 => retorna 1 para a próxima volta","Ciclo 2: acc = 1 + 2 => retorna 3 para a próxima volta","Ciclo 3: acc = 3 + 3 => entrega o resultado final 6"], "Rastreamento passo a passo da propagação de estado no método reduce."),
          p("Associe a estrutura do acumulador à sua expressão equivalente com reduce:", [["let total = 0; total += n;","numeros.reduce((total, n) => total + n, 0)"],["const res = []; res.push(fn(n));","arr.reduce((acc, n) => { acc.push(fn(n)); return acc; }, [])"],["let max = -Infinity; if (n > max) max = n;","arr.reduce((max, n) => Math.max(max, n), -Infinity)"],["let count = 0; if (pred(n)) count++;","arr.reduce((count, n) => pred(n) ? count + 1 : count, 0)"]], "Tradução idiomática entre laços imperativos acumuladores e reduce funcional.")
        ]
      }
    ],
    8: [
      {
        id: "js-c04-u8-l1",
        title: "Tabelas de teste de mesa (Trace Tables)",
        subtitle: "Depuração manual · Acompanhando valores de variáveis passo a passo",
        theory: "Um teste de mesa (trace table) é uma ferramenta conceitual onde cada linha registra o estado exato de todas as variáveis do programa após a execução de uma instrução. Rastrear manualmente contadores, acumuladores e condições permite diagnosticar bugs lógicos antes mesmo de executar o código.",
        questions: [
          q("O que é um \"teste de mesa\" (trace table) na ciência da computação?", "Uma tabela onde se anota o valor de cada variável a cada linha e ciclo de repetição executado", ["Um teste físico da mesa do escritório","Um benchmark de velocidade de hardware"], "Permite simular o comportamento exato do interpretador mentalmente ou no papel."),
          q("Quais colunas devem obrigatoriamente constar em uma tabela de teste de mesa de um laço?", "Número da linha/iteração, valor das variáveis de controle, condição lógica (V/F) e acumuladores", ["Apenas o nome do arquivo","Apenas a hora do sistema"], "Exibe com transparência como os estados internos se transformam ao longo do tempo."),
          q("Qual benefício imediato o rastreamento em tabela traz na resolução de bugs complexos?", "Revela com precisão matemática em qual ciclo exato a variável assumiu um valor incorreto", ["Gera o código automaticamente","Remove comentários do código"], "Localiza discrepâncias entre a intenção do desenvolvedor e o que o motor de fato executa."),
          q("Qual é o valor final de x após o laço: let x = 1; for (let i = 0; i < 3; i++) x *= 2;?", "8 (1 * 2 = 2, 2 * 2 = 4, 4 * 2 = 8 após 3 iterações)", ["6","16"], "O teste de mesa rastreia os três ciclos consecutivos de multiplicação."),
          t("Qual termo em inglês designa a tabela de rastreamento manual de variáveis de um algoritmo?", ["trace table"], "Trace table (teste de mesa) é a ferramenta clássica de rastreamento.", "# tabela de teste de mesa"),
          g("Complete o rastreamento calculando o valor final de total após 4 ciclos com total += 2:", ["let total = 0;\nfor (let i = 0; i < 4; i++) {\n    total += 2;\n}\n// total vale 8"], "4 voltas somando 2 resultam em 8.", "let total = 0;\nfor (let i = 0; i < 4; i++) {\n    total += 2;\n}\n// total vale ____"),
          o("Ordene as etapas para construir um teste de mesa rigoroso de um algoritmo:", ["Criar uma tabela com colunas para cada variável e para a condição de repetição","Registrar na primeira linha os valores iniciais antes da entrada no laço","Preencher linha por linha os valores atualizados ao final de cada volta","Registrar a linha onde a condição se torna falsa e o estado final das variáveis"], "Roteiro metódico de elaboração de teste de mesa para validação de algoritmos."),
          p("Associe o ciclo do laço (let x = 0; x += 3) ao valor assumido por x:", [["Início (antes do laço)","x = 0 (estado inicial de partida)"],["Após iteração 1","x = 3 (primeira adição executada)"],["Após iteração 2","x = 6 (segunda adição executada)"],["Após iteração 3","x = 9 (terceira adição consolidada)"]], "Mapeamento temporal dos valores de um acumulador em teste de mesa.")
        ]
      },
      {
        id: "js-c04-u8-l2",
        title: "Rastreando laços aninhados e contadores cruzados",
        subtitle: "Complexidade · Mapeando o produto cartesiano de iterações duplas",
        theory: "Laços aninhados multiplicam o número de operações: para cada avanço do contador externo i, o contador interno j executa todo o seu ciclo do início ao fim. O rastreamento de laços aninhados exige acompanhar ambos os índices e prever a quantidade exata de pares gerados pelo produto cartesiano.",
        questions: [
          q("Quantas vezes a instrução interna console.log(i, j) roda em: for(let i=0; i<3; i++) for(let j=0; j<4; j++)?", "12 vezes (3 iterações externas × 4 iterações internas)", ["7 vezes","24 vezes"], "O número total de voltas do miolo é o produto estrito das quantidades de iterações de cada laço."),
          q("Qual é o valor de j logo na primeira instrução da segunda volta do laço externo (i = 1)?", "j = 0 (pois o laço interno é reinicializado do zero a cada volta do laço externo)", ["j = 4","j = 1"], "O cabeçalho let j = 0 é reexecutado toda vez que o laço externo avança uma iteração."),
          q("O que acontece se o programador esquecer let e declarar i e j globalmente com a mesma variável i?", "O laço interno altera a variável i do laço externo, provocando comportamento caótico ou laço infinito", ["O código roda mais rápido","O compilador corrige sozinho"], "Colisão acidental de identificadores é uma das maiores fontes de falhas em loops aninhados."),
          q("Como rastrear eficientemente laços onde o laço interno depende do externo (ex: for(let j = i; j < n; j++))?", "Mapeando como uma matriz triangular onde a quantidade de passos diminui a cada volta de i", ["Multiplicando por dois","Ignorando o j"], "Algoritmos clássicos de ordenação como Bubble Sort exibem esse padrão triangular."),
          t("Qual estrutura matemática representa o conjunto de todas as combinações de dois laços (i, j)?", ["produto cartesiano"], "O produto cartesiano reúne todos os pares ordenados possíveis.", "# produto cartesiano de indices"),
          g("Complete o rastreamento identificando o total de iterações da grade 3 por 3:", ["const totalVoltas = 3 * 3; // total de 9 execuções"], "Produto de 3 linhas por 3 colunas.", "const totalVoltas = 3 * ____; // total de 9 execuções"),
          o("Ordene a sequência de pares (i, j) para for(let i=0; i<2; i++) for(let j=0; j<2; j++):", ["Par inicial: (i = 0, j = 0)","Segundo par: (i = 0, j = 1)","Terceiro par: (i = 1, j = 0) com reinício de j","Quarto par: (i = 1, j = 1) com término do processo"], "Ordem canônica de percurso de pares em laços duplamente aninhados."),
          p("Associe a configuração de laços aninhados ao total de iterações do bloco interno:", [["i de 0 a 2 e j de 0 a 4","Total de 15 voltas (3 * 5)"],["i de 0 a 9 e j de 0 a 9","Total de 100 voltas (10 * 10)"],["i de 0 a 3 e j fixo de 0 a 0","Total de 4 voltas (4 * 1)"],["i de 0 a 0 e j de 0 a 0","Total de 1 única volta (1 * 1)"]], "Cálculo de volume de iterações em laços duplamente aninhados.")
        ]
      },
      {
        id: "js-c04-u8-l3",
        title: "Invariantes de laço: verificando a corretude",
        subtitle: "Teoria da computação · Afirmações verdadeiras antes, durante e após o loop",
        theory: "Um invariante de laço é uma propriedade lógica que permanece estritamente verdadeira antes do início do laço, a cada iteração de sua execução e imediatamente após seu término. Ele é a principal ferramenta formal da ciência da computação para provar matematicamente que um algoritmo produz o resultado correto.",
        questions: [
          q("O que é formalmente um \"invariante de laço\" na teoria da computação?", "Uma afirmação lógica sobre o estado do algoritmo que é verdadeira antes, durante e após o laço", ["Uma variável que não pode ser reatribuída","Uma função sem retorno"], "Serve como prova indutiva da corretude de algoritmos e laços de repetição."),
          q("Quais são as três etapas necessárias para demonstrar a validade de um invariante de laço?", "Inicialização (base), Manutenção (passo indutivo) e Término (conclusão correta)", ["Entrada, Meio e Saída","Passado, Presente e Futuro"], "Estrutura idêntica à demonstração matemática por indução finita."),
          q("Qual é o invariante clássico em um laço de somatório let soma = 0; soma += arr[i]?", "No início de cada iteração i, soma armazena a soma exata de todos os elementos de arr[0] até arr[i-1]", ["soma é sempre maior que zero","soma nunca muda de valor"], "Essa propriedade se mantém a cada passo, garantindo que no término soma contenha o total completo."),
          q("O que a etapa de \"Término\" do invariante de laço assegura?", "Que quando o laço encerra, o invariante combinado com a condição de saída prova que o resultado é o esperado", ["Que a memória RAM foi liberada","Que o computador pode ser desligado"], "Transforma a propriedade invariante preservada no objetivo final do algoritmo."),
          t("Qual método matemático formal fundamenta a demonstração de invariantes de laço?", ["inducao"], "Indução matemática valida a base e a manutenção do passo.", "# prova por inducao matematica"),
          g("Complete a asserção que verifica o invariante de que a soma acumulada nunca é negativa:", ["console.assert(soma >= 0, \"Invariante violado\");"], "Asserções de invariante garantem a integridade lógica contínua.", "console.assert(soma >= 0, \"____ violado\");"),
          o("Ordene as etapas da prova por indução de um invariante de laço:", ["Inicialização: provar que a afirmação é verdadeira antes da primeira volta do laço","Manutenção: provar que se é verdadeira antes de uma volta, continuará verdadeira após a volta","Execução do passo do laço e atualização das variáveis envolvidas","Término: analisar o estado na parada e constatar que a propriedade prova o resultado"], "Roteiro de demonstração formal de corretude de invariantes de laço."),
          p("Associe o estágio da prova do invariante ao seu momento de validação:", [["Inicialização","Verificação da premissa antes do laço iniciar"],["Manutenção","Preservação da verdade lógica entre voltas consecutivas"],["Término","Constatação da corretude do resultado na saída do laço"],["Corretude do algoritmo","Garantia matemática de que o código cumpre a especificação"]], "Elementos fundamentais da análise formal de invariantes em ciência da computação.")
        ]
      },
      {
        id: "js-c04-u8-l4",
        title: "Identificando erros clássicos de Off-By-One (< vs <=)",
        subtitle: "Casos extremos · Limites de índices de arrays e intervalos",
        theory: "Erros de Off-By-One (deslocamento por um) ocorrem quando um laço itera uma vez a mais ou uma vez a menos do que o planejado. A confusão entre os operadores < e <= em índices de arrays em JavaScript é a causa mais comum, resultando em leituras de undefined no índice array.length.",
        questions: [
          q("O que acontece ao iterar um array de tamanho 5 com a condição errônea i <= arr.length?", "O laço tentará acessar arr[5], que não existe e retorna o valor indesejado undefined na última volta", ["O navegador fecha com erro fatal","O array ganha um elemento extra"], "Como os índices vão de 0 a 4 (length - 1), a condição deve ser estritamente menor que length (i < arr.length)."),
          q("Qual é a causa típica de um erro de Off-By-One em intervalos numéricos fechados [inicio, fim]?", "Usar o operador < em vez de <=, deixando de processar o último número do intervalo", ["Usar números ímpares","Trocar o nome da variável"], "Intervalos que devem incluir o número final exigem o operador de inclusão menor ou igual (<=)."),
          q("Como prevenir erros de Off-By-One em percursos modernos de coleções em JavaScript?", "Preferir laços declarativos for...of ou métodos como forEach/map, que gerenciam os limites automaticamente", ["Nunca usar números maiores que 10","Escrever testes sem asserções"], "Delegar o percurso para iteradores nativos elimina a possibilidade de erros manuais de contadores."),
          q("Qual é o número de voltas de um laço for (let i = 1; i <= 5; i++)?", "5 voltas (números 1, 2, 3, 4 e 5)", ["4 voltas","6 voltas"], "Iniciando em 1 com operador <= 5, exatamente 5 iterações são processadas."),
          t("Qual operador relacional de inclusão é frequentemente trocado por < gerando erros de Off-By-One?", ["<="], "<= inclui o valor limite na verificação.", "# operador relacional menor ou igual"),
          g("Complete o limite do laço para evitar o acesso indevido ao índice fora dos limites:", ["for (let i = 0; i < lista.length; i++) {\n    processar(lista[i]);\n}"], "O operador < impede que i alcance lista.length.", "for (let i = 0; i ____ lista.length; i++) {\n    processar(lista[i]);\n}"),
          o("Ordene os índices acessados em um array de 3 elementos [\"a\", \"b\", \"c\"]:", ["Índice 0: acessa o primeiro elemento \"a\"","Índice 1: acessa o elemento intermediário \"b\"","Índice 2: acessa o último elemento válido \"c\"","Índice 3: fora dos limites (arr[3] resulta em undefined)"], "Mapeamento de limites de índices válidos versus acesso off-by-one."),
          p("Associe a condição de laço ao número exato de iterações executadas:", [["for (let i = 0; i < 5; i++)","Executa exatamente 5 iterações (0, 1, 2, 3, 4)"],["for (let i = 0; i <= 5; i++)","Executa exatamente 6 iterações (0, 1, 2, 3, 4, 5)"],["for (let i = 1; i < 5; i++)","Executa exatamente 4 iterações (1, 2, 3, 4)"],["for (let i = 1; i <= 5; i++)","Executa exatamente 5 iterações (1, 2, 3, 4, 5)"]], "Contagem comparativa de ciclos para diferentes limites de laços.")
        ]
      },
      {
        id: "js-c04-u8-l5",
        title: "Projeto integrado: motor de busca e agregação",
        subtitle: "Síntese prática · Combinando condições, laços, quebras e acumuladores",
        theory: "Neste projeto prático de consolidação, implementamos um motor de consulta e agregação sobre uma base de registros em memória. Utilizamos laços for...of, cláusulas de guarda com continue para filtrar registros inválidos, quebra precoce com break em limites de paginação e acumuladores de contagem e soma.",
        questions: [
          q("Como implementar paginação com limite máximo de resultados (limit) dentro do laço de busca?", "Incrementando um contador de resultados encontrados e acionando break ao atingir o limite desejado", ["Deletando os outros itens da memória","Reiniciando o array"], "O break interrompe a busca assim que o número de itens solicitados para a página for alcançado."),
          q("Qual é o papel da instrução continue na etapa de filtragem do motor de agregação?", "Descartar imediatamente registros cancelados ou fora dos critérios sem computá-los no totalizador", ["Encerrar o script","Voltar para a página inicial"], "Permite ignorar dados espúrios antes de submeter os registros válidos aos cálculos de somatório."),
          q("Como calcular a média de valores em uma única passagem pelo conjunto de dados?", "Mantendo dois acumuladores sincronizados (somaTotal e quantidadeItens) e dividindo no final", ["Calculando a soma e depois rodando outro laço para contar","Multiplicando por 100"], "Calcular soma e contagem em uma única volta preserva tempo de CPU e percorre o array uma única vez O(n)."),
          q("Como prevenir divisão por zero ao calcular a média após o término do laço?", "Verificando if (quantidade === 0) return 0; antes de efetuar a operação de divisão", ["Somando 1 à quantidade","Deixando o resultado virar Infinity"], "Garante que coleções vazias ou filtros que não encontraram itens entreguem 0 com segurança."),
          t("Qual instrução interrompe o laço assim que o número de resultados atinge o limite da página?", ["break"], "break limita a quantidade de resultados de paginação.", "# limita resultados com interrupcao precoce"),
          g("Complete o cálculo da média prevenindo divisão por zero:", ["const media = quantidade > 0 ? soma / quantidade : 0;"], "O ternário impede a divisão por zero quando a contagem for nula.", "const media = quantidade > 0 ? soma / quantidade : ____;"),
          o("Ordene as etapas do algoritmo de busca e agregação em tempo real:", ["Inicializar acumuladores: let soma = 0, let encontrados = 0","Iterar sobre cada transação da base com for...of","Ignorar transações canceladas com if (transacao.cancelada) continue;","Somar o valor, incrementar encontrados e aplicar break ao atingir limiteMaximo"], "Pipeline consolidada de busca, filtro, paginação e agregação em uma passagem."),
          p("Associe o componente do motor de busca à sua funcionalidade algorítmica:", [["if (!valido) continue;","Filtro de exclusão de registros inconsistentes"],["if (encontrados === limit) break;","Controle de paginação e corte precoce de busca"],["soma += item.valor;","Acumulação de métrica financeira agregada"],["encontrados++","Contador de correspondências válidas selecionadas"]], "Elementos constitutivos do motor consolidado de busca e agregação de dados.")
        ]
      }
    ]
  });
})();
