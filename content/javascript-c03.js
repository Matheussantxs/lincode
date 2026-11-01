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
  const chId = "javascript-c03";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "js-c03-u1-l2",
        title: "Diferenças entre let, const e var",
        subtitle: "Escopo · Bloco, função e içamento (hoisting)",
        theory: "As palavras-chave let e const possuem escopo de bloco e não criam propriedades no objeto global. A antiga declaração var possui escopo de função, sofre içamento (hoisting) com inicialização para undefined e permite redeclarações acidentais, sendo considerada um antipadrão em JavaScript moderno.",
        questions: [
          q("Qual é o escopo de variáveis declaradas com let e const em JavaScript?", "Escopo de bloco (delimitado por qualquer par de chaves {})", ["Escopo de função exclusivamente","Escopo global obrigatório"], "Variáveis de bloco existem apenas dentro do bloco delimitador onde foram declaradas."),
          q("O que acontece se tentarmos redeclarar a mesma variável com let no mesmo escopo?", "Ocorre um erro de sintaxe (SyntaxError: Identifier has already been declared)", ["A variável anterior é sobrescrita silenciosamente","O valor anterior é transformado em número"], "let impede que o programador declare duas variáveis idênticas no mesmo contexto por engano."),
          q("Por que a declaração com var é desaconselhada em código moderno?", "Possui escopo de função permissivo, vaza para fora de blocos if/for e sofre hoisting imprevisível", ["Porque o var foi removido dos navegadores","Porque var consome mais memória que let"], "O escopo permissivo de var provocava erros recorrentes de colisão de variáveis em laços e condicionais."),
          q("Como o hoisting afeta uma variável declarada com var?", "A declaração é içada para o topo do escopo e inicializada imediatamente como undefined", ["A variável não pode ser acessada","Gera um ReferenceError imediato"], "Acessar uma variável var antes da linha de atribuição retorna undefined em vez de lançar erro."),
          t("Qual palavra-chave clássica de declaração de variáveis sofre içamento com inicialização para undefined?", ["var"], "var é a forma legada mantida por retrocompatibilidade.", "# declaracao legada com escopo de funcao"),
          g("Complete a declaração imutável de uma constante de configuração:", ["const PI = 3.14159"], "const cria identificadores cuja referência não pode ser reatribuída.", "____ // declara a constante PI com valor 3.14159"),
          o("Ordene as palavras-chave de declaração por nível de restrição (da mais estrita para a mais permissiva):", ["const: impede reatribuição e possui escopo estrito de bloco","let: permite reatribuição e possui escopo estrito de bloco","var: permite reatribuição e possui escopo amplo de função","atribuição implícita sem palavra-chave: vaza para o escopo global"], "Hierarquia de disciplina e segurança no escopo de variáveis."),
          p("Associe a palavra-chave de declaração à sua característica principal:", [["const","Referência imutável com escopo de bloco estrito"],["let","Variável reatribuível com escopo de bloco estrito"],["var","Variável legada com escopo de função e içamento para undefined"],["globalThis","Objeto global universal unificado em todos os ambientes JS"]], "Propriedades fundamentais dos modificadores de variáveis em JavaScript.")
        ]
      },
      {
        id: "js-c03-u1-l3",
        title: "Temporal Dead Zone (TDZ)",
        subtitle: "Ciclo de vida · Acessando variáveis antes de sua inicialização",
        theory: "A Zona Morta Temporal (TDZ) é o período entre o início da execução de um bloco e a linha onde a variável let ou const é formalmente inicializada. Acessar a variável durante a TDZ resulta em ReferenceError, garantindo que o programa nunca consuma variáveis antes de sua definição deliberada.",
        questions: [
          q("O que acontece ao tentar acessar uma variável let antes da sua linha de declaração?", "Lança um erro em tempo de execução: ReferenceError: Cannot access before initialization", ["Retorna undefined silenciosamente","Retorna o número zero"], "A TDZ bloqueia leituras precoces impedindo o uso de variáveis não inicializadas."),
          q("Quando a Zona Morta Temporal (TDZ) de uma variável let ou const termina?", "No momento exato em que o interpretador atinge a instrução de sua declaração/inicialização", ["Quando o script é fechado no navegador","Ao término da função pai"], "A partir da linha de declaração a variável entra em estado acessível normal."),
          q("Por que a TDZ representa uma melhoria substancial em relação ao comportamento do var?", "Porque transforma leituras acidentais de variáveis prematuras em erros explícitos e imediatos", ["Porque acelera o download da página web","Porque impede o uso de números negativos"], "Fail-fast: identificar o acesso precoce com erro evita cálculos corrompidos com undefined."),
          q("Variáveis let e const sofrem içamento (hoisting)?", "Sim, a declaração é reconhecida no início do escopo, mas permanece não inicializada na TDZ", ["Não, elas são totalmente desconhecidas pelo interpretador","Apenas em classes e métodos"], "O interpretador reserva o identificador no bloco, impedindo o acesso ao escopo externo."),
          t("Qual tipo de erro é lançado pelo JavaScript ao tentar ler uma variável dentro da TDZ?", ["ReferenceError"], "ReferenceError indica que a referência existe no escopo mas não está inicializada.", "# ReferenceError: Cannot access before initialization"),
          g("Complete o trecho para evitar o ReferenceError causado pela TDZ:", ["let total = 100;\nconsole.log(total);"], "A inicialização deve anteceder a leitura da variável.", "____\nconsole.log(total); // inicializa let total com 100 antes de logar"),
          o("Ordene a cronologia de vida de uma variável let dentro de um bloco:", ["Entrada no escopo do bloco (o identificador é registrado no ambiente léxico)","Zona Morta Temporal (TDZ): qualquer tentativa de leitura dispara ReferenceError","Execução da linha de declaração (let valor = 42): término da TDZ","Uso normal da variável até o término do escopo do bloco delimitador"], "Linha do tempo do ciclo de vida de variáveis com escopo de bloco no motor V8."),
          p("Associe o comportamento ao momento de vida da variável:", [["Início do bloco até a declaração","Zona Morta Temporal (TDZ) ativa"],["Acesso prematuro na TDZ","Disparo de ReferenceError explícito"],["Linha let x = 10","Inicialização da variável e desativação da TDZ"],["Após a linha de declaração","Leitura e mutação permitidas normalmente"]], "Etapas de resolução léxica e temporal de identificadores em JavaScript.")
        ]
      },
      {
        id: "js-c03-u1-l4",
        title: "Imutabilidade de referência com const",
        subtitle: "Memória · Mutação de propriedades em objetos congelados vs referências",
        theory: "A declaração const impede a reatribuição do identificador a um novo endereço de memória, mas não torna o conteúdo interno de objetos ou arrays imutável. Propriedades de um objeto declarado com const podem ser alteradas livremente a menos que Object.freeze() seja aplicado explicitamente.",
        questions: [
          q("O que a declaração const impede estritamente em JavaScript?", "A reatribuição da variável a um novo valor ou nova referência de memória", ["Qualquer alteração em propriedades internas de um objeto","A leitura do valor da variável"], "const garante estabilidade de ponteiro/endereço, e não imutabilidade profunda da estrutura."),
          q("O que acontece ao executar: const itens = [1, 2]; itens.push(3);?", "O elemento 3 é adicionado com sucesso ao array sem erros", ["Lança TypeError por violar o const","O array é esvaziado"], "Modificar o conteúdo do array não altera a referência de memória mantida pela variável itens."),
          q("O que acontece ao executar: const itens = [1, 2]; itens = [3, 4];?", "Lança um erro em tempo de execução: TypeError: Assignment to constant variable", ["O array antigo é deletado do disco","Os dois arrays são fundidos"], "Reatribuir o identificador a um novo array viola diretamente a garantia de const."),
          q("Qual método utilitário nativo torna as propriedades de um objeto superficialmente imutáveis?", "Object.freeze()", ["Object.seal()","Object.lock()"], "Object.freeze() impede adicionar, editar ou remover propriedades de primeiro nível do objeto."),
          t("Qual tipo de erro ocorre ao tentar reatribuir uma variável declarada com const?", ["TypeError"], "TypeError: Assignment to constant variable.", "# erro ao reatribuir constante"),
          g("Complete o congelamento do objeto para impedir modificações em suas propriedades:", ["const config = Object.freeze({ porta: 8080 });"], "Object.freeze impede mutações nas propriedades do objeto.", "const config = ____({ porta: 8080 });"),
          o("Ordene os níveis de proteção de objetos em JavaScript do menos restritivo para o mais restritivo:", ["Objeto normal declarado com let: reatribuível e propriedades mutáveis","Objeto declarado com const: referência travada, propriedades livremente mutáveis","Object.seal(obj): impede adição/remoção de chaves, permite mudar valores existentes","Object.freeze(obj): impede adição, remoção e qualquer alteração de valores"], "Escala de contenção e imutabilidade de objetos em JavaScript."),
          p("Associe a operação com const ao seu respectivo resultado:", [["const x = 10; x = 20;","TypeError: Assignment to constant variable"],["const user = { id: 1 }; user.id = 2;","Mutação permitida com sucesso no objeto"],["Object.freeze(user); user.id = 3;","Mutação ignorada em modo comum ou TypeError em strict mode"],["const arr = [1]; arr.push(2);","Inclusão do elemento 2 bem-sucedida"]], "Comportamento da declaração const sob mutações internas vs reatribuições.")
        ]
      },
      {
        id: "js-c03-u1-l5",
        title: "Boas práticas: quando usar const e quando usar let",
        subtitle: "Padrões de projeto · Minimizando reatribuições no código",
        theory: "A convenção padrão da comunidade JavaScript moderna recomenda declarar todas as variáveis com const por padrão. Adote let exclusivamente quando o valor precisar sofrer reatribuição deliberada, como em contadores de laços for e acumuladores, tornando o fluxo de dados mais previsível e seguro.",
        questions: [
          q("Qual é a recomendação hegemônica da comunidade quanto à escolha entre const e let?", "Usar const por padrão para todas as variáveis, reservando let apenas para valores que sofrem reatribuição", ["Usar let sempre e nunca usar const","Usar var para códigos curtos"], "Usar const por padrão reduz a carga cognitiva ao indicar que aquela referência nunca mudará."),
          q("Em qual cenário a utilização de let é estritamente necessária?", "Na variável controladora de um laço tradicional for (let i = 0; i < 10; i++)", ["Na importação de módulos com import","Na declaração de funções puras"], "O contador i é reatribuído a cada iteração (i++), o que causaria TypeError se fosse const."),
          q("Por que evitar reatribuições desnecessárias torna o código mais fácil de depurar?", "Porque elimina a dúvida sobre qual versão ou estado do dado está contido na variável naquele instante", ["Porque o computador não aceita mais de 10 reatribuições","Porque o arquivo fica menor"], "Valores que não mudam reduzem efeitos colaterais temporais facilitando a leitura sequencial."),
          q("Em laços for...of que iteram sobre arrays, devemos declarar o elemento com const ou let?", "const (ex: for (const item of lista)), pois uma nova ligação de escopo é criada a cada ciclo", ["Obrigatório usar var","Proibido usar const em qualquer laço"], "Cada volta do laço for...of cria um novo escopo léxico individual, tornando const perfeitamente válido."),
          t("Qual palavra-chave deve ser sua primeira opção padrão ao declarar qualquer variável?", ["const"], "const deve ser o padrão padrão do engenheiro de software moderno.", "# declare const por padrao"),
          g("Complete o laço de iteração seguro utilizando a declaração recomendada por padrão:", ["for (const nome of usuarios) {\n    console.log(nome);\n}"], "for...of cria nova ligação a cada passo, permitindo const.", "for (____ of usuarios) {\n    console.log(nome);\n}"),
          o("Ordene a árvore de decisão para escolha da palavra-chave de declaração de variável:", ["A variável precisa de reatribuição deliberada durante o fluxo?","Se NÃO: declarar obrigatoriamente como const (regra padrão)","Se SIM: declarar como let e manter o escopo de bloco o mais restrito possível","Nunca recorrer à declaração legada com var em projetos modernos"], "Algoritmo de decisão para escolha limpa de declarações em JavaScript."),
          p("Associe o cenário ao modificador ideal:", [["Contador acumulador de laço while","let total = 0; total += valor;"],["Elemento iterado em for...of","for (const item of lista)"],["Resultado de chamada de função pura","const dados = processar(entrada);"],["Referência para serviço ou cliente de banco","const db = new DatabaseClient();"]], "Diretrizes pragmáticas de declaração de identificadores em JavaScript.")
        ]
      }
    ],
    2: [
      {
        id: "js-c03-u2-l1",
        title: "O tipo Number e o padrão IEEE 754",
        subtitle: "Representação · Ponto flutuante de precisão dupla em 64 bits",
        theory: "Em JavaScript, todos os números pertencem ao tipo Number e são representados no padrão IEEE 754 de precisão dupla (64 bits). Por representarem frações em base binária, cálculos decimais podem apresentar dízimas binárias sutis, como o famoso 0.1 + 0.2 resultando em 0.30000000000000004.",
        questions: [
          q("Qual padrão de representação de ponto flutuante o tipo Number utiliza em JavaScript?", "Padrão IEEE 754 de precisão dupla (64 bits / binary64)", ["Padrão ASCII de 8 bits","Padrão decimal puro de 128 bits"], "O tipo Number unifica inteiros e decimais sob a mesma especificação internacional de ponto flutuante."),
          q("Por que a expressão 0.1 + 0.2 === 0.3 avalia para false em JavaScript?", "Frações decimais como 0.1 e 0.2 não possuem representação binária finita exata em 64 bits", ["Porque o interpretador arredonda para cima","Porque o número 0.3 é reservado"], "O resultado real da soma binária é 0.30000000000000004, diferindo do valor 0.3 no último bit."),
          q("Como comparar cálculos decimais com segurança em JavaScript para contornar a imprecisão?", "Usando Number.EPSILON (ex: Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON)", ["Multiplicando por zero","Convertendo para string sem casas decimais"], "Number.EPSILON representa a menor diferença mensurável entre 1 e o próximo valor representável."),
          q("Qual é o maior inteiro seguro que pode ser representado com precisão exata no tipo Number?", "Number.MAX_SAFE_INTEGER (2^53 - 1 ou 9007199254740991)", ["2^32 - 1 (4294967295)","Infinito"], "Acima de 2^53 - 1, inteiros consecutivos compartilham a mesma representação de ponto flutuante."),
          t("Qual constante numérica embutida define a menor tolerância de arredondamento em JavaScript?", ["Number.EPSILON"], "Number.EPSILON (~2.22e-16) é usado para comparação de ponto flutuante.", "# tolerancia de arredondamento IEEE 754"),
          g("Complete a comparação segura de ponto flutuante usando Number.EPSILON:", ["Math.abs(resultado - 0.3) < Number.EPSILON"], "Avalia se a diferença entre os valores é desprezível.", "Math.abs(resultado - 0.3) < ____"),
          o("Ordene os componentes que formam um número IEEE 754 de 64 bits em memória:", ["1 bit para o sinal (0 para positivo, 1 para negativo)","11 bits para o expoente com viés (bias)","52 bits para a mantissa ou fração significante","1 bit implícito normalizado da representação científica binária"], "Anatomia da estrutura física de um float64 segundo o padrão IEEE 754."),
          p("Associe a constante numérica ao seu valor ou propósito:", [["Number.MAX_SAFE_INTEGER","2^53 - 1 (9.007.199.254.740.991)"],["Number.EPSILON","Menor intervalo entre 1 e o próximo número representável"],["Number.MIN_VALUE","Menor número positivo de ponto flutuante maior que zero"],["Number.POSITIVE_INFINITY","Valor especial para números que excedem o teto representável"]], "Constantes embutidas no construtor Number para limites computacionais.")
        ]
      },
      {
        id: "js-c03-u2-l2",
        title: "Casos especiais: NaN e Infinity",
        subtitle: "Casos de borda · Identificando divisões por zero e operações inválidas",
        theory: "O padrão numérico prevê valores especiais: Infinity e -Infinity ocorrem em extrapolações de limites ou divisões por zero (como 1 / 0). O valor NaN (Not a Number) resulta de operações aritméticas inválidas (como 0 / 0 ou parseInt(\"texto\")). O NaN possui a propriedade única de nunca ser igual a si mesmo.",
        questions: [
          q("Qual é o resultado da divisão numérica 10 / 0 em JavaScript?", "Infinity", ["Erro: ZeroDivisionError","NaN"], "Ao contrário de outras linguagens que lançam exceção, o JavaScript retorna o valor IEEE 754 Infinity."),
          q("Qual é o resultado da comparação NaN === NaN?", "false", ["true","TypeError"], "NaN é o único valor em toda a linguagem JavaScript que não é estritamente igual a si mesmo."),
          q("Qual função confiável deve ser usada para verificar se um valor é estritamente o número NaN?", "Number.isNaN(valor)", ["isNaN(valor)","valor == NaN"], "Number.isNaN() não faz coerção de tipo de strings, ao contrário da antiga função global isNaN()."),
          q("Qual é o retorno de typeof NaN em JavaScript?", "\"number\"", ["\"nan\"","\"undefined\""], "NaN pertence ao tipo primitivo Number, indicando um estado numérico indefinido ou com falha de cálculo."),
          t("Qual método estático de Number deve ser preferido para testar se uma variável é NaN?", ["Number.isNaN"], "Number.isNaN(x) não converte o argumento antes de testar.", "# checagem confiavel de NaN"),
          g("Complete a verificação estrita que detecta se a variável calculo resultou em NaN:", ["if (Number.isNaN(calculo)) {\n    console.log(\"Falha no calculo\");\n}"], "Number.isNaN valida especificamente se calculo é NaN sem coerção.", "if (____(calculo)) {\n    console.log(\"Falha no calculo\");\n}"),
          o("Ordene as operações aritméticas pelo valor resultante:", ["10 / 2: produz o número inteiro normal 5","10 / 0: produz o valor especial Infinity","-10 / 0: produz o valor especial -Infinity","0 / 0: produz o valor especial NaN (operação indefinida)"], "Comportamento do padrão IEEE 754 sob diferentes denominadores em JavaScript."),
          p("Associe a operação matemática ao seu resultado formal:", [["1 / 0","Infinity"],["-1 / 0","-Infinity"],["0 / 0","NaN"],["Math.sqrt(-1)","NaN (raiz quadrada de número negativo)"]], "Resultados numéricos especiais previstos na especificação ECMAScript.")
        ]
      },
      {
        id: "js-c03-u2-l3",
        title: "Métodos Number.isFinite, isNaN e parseInt",
        subtitle: "Parsing · Convertendo strings numéricas e checando validade",
        theory: "A conversão de texto para número exige ferramentas robustas. parseInt(str, radix) extrai inteiros com especificação mandatória da base numérica (como base 10). parseFloat(str) analisa decimais. Number.isFinite(n) verifica se o valor é um número real válido, rejeitando tanto NaN quanto os infinitos.",
        questions: [
          q("Por que é mandatório informar a base (radix) 10 como segundo argumento em parseInt(str, 10)?", "Para evitar ambiguidades históricas com números iniciados por zero sendo interpretados como octal", ["Para indicar que o número deve ter 10 dígitos","Para multiplicar o resultado por 10"], "Sempre declare explicitamente a base 10: parseInt(\"08\", 10)."),
          q("Qual é a diferença entre parseInt(\"10px\", 10) e Number(\"10px\")?", "parseInt ignora caracteres não numéricos ao final e retorna 10; Number(\"10px\") falha retornando NaN", ["Number(\"10px\") remove o px sozinho","parseInt falha com erro"], "parseInt faz parsing progressivo da esquerda para a direita até encontrar o primeiro caractere inválido."),
          q("O que a função Number.isFinite(valor) valida?", "Retorna true apenas se o valor for um número real válido, rejeitando Infinity, -Infinity e NaN", ["Verifica se o número é par","Verifica se o número é menor que 100"], "Função essencial para blindar regras de negócio contra divisões por zero e quebras de cálculo."),
          q("Qual é o resultado de parseInt(\"abc\", 10)?", "NaN", ["0","-1"], "Quando o primeiro caractere já não é um dígito válido na base escolhida, parseInt retorna NaN."),
          t("Qual base numérica decimal deve sempre ser passada como segundo argumento de parseInt?", ["10"], "parseInt(valor, 10) previne conversões em bases indesejadas.", "# radix decimal padrao"),
          g("Complete o parsing rigoroso da string em base decimal:", ["const valor = parseInt(\"42\", 10);"], "Passar o radix 10 é uma boa prática estrita de engenharia.", "const valor = parseInt(\"42\", ____);"),
          o("Ordene as funções de conversão e inspeção da mais tolerante para a mais estrita:", ["parseInt(\"100px\", 10): extrai dígitos até encontrar o primeiro caractere não numérico","parseFloat(\"100.5px\"): extrai ponto flutuante até o primeiro caractere não numérico","Number(\"100\"): exige que toda a string seja composta exclusivamente por caracteres numéricos","Number.isFinite(n): valida se o número já convertido é finito e diferente de NaN"], "Níveis de rigor e tolerância em conversões de strings numéricas."),
          p("Associe a chamada de conversão ao valor retornado:", [["parseInt(\"42.9\", 10)","42 (trunca as casas decimais sem arredondar)"],["parseFloat(\"42.9\")","42.9 (preserva as casas decimais)"],["Number(\"42.9\")","42.9 (conversão estrita de toda a string)"],["Number(\"42abc\")","NaN (falha estrita por conter letras)"]], "Comportamento prático das funções utilitárias de parsing numérico.")
        ]
      },
      {
        id: "js-c03-u2-l4",
        title: "O objeto Math: arredondamento e utilitários",
        subtitle: "Operações · Math.floor, Math.ceil, Math.round e Math.random",
        theory: "O objeto embutido Math fornece propriedades matemáticas e funções utilitárias. Math.floor() trunca para o menor inteiro, Math.ceil() arredonda para cima e Math.round() arredonda para o inteiro mais próximo. Math.random() gera números pseudoaleatórios no intervalo semiaberto [0, 1).",
        questions: [
          q("Qual é a diferença entre Math.floor(4.9) e Math.ceil(4.1)?", "Math.floor(4.9) retorna 4 (para baixo), enquanto Math.ceil(4.1) retorna 5 (para cima)", ["Ambos retornam o número 5","Ambos retornam o número 4"], "floor arredonda em direção a -Infinity; ceil arredonda em direção a +Infinity."),
          q("Qual método de Math realiza o arredondamento aritmético tradicional para o inteiro mais próximo?", "Math.round()", ["Math.trunc()","Math.fix()"], "Math.round(4.5) arredonda para 5, e Math.round(4.4) arredonda para 4."),
          q("O que Math.trunc(4.9) faz em relação a números decimais?", "Simplesmente remove todas as casas decimais descartando a fração sem considerar sinal", ["Arredonda sempre para o número par mais próximo","Converte para número binário"], "Diferente de floor em números negativos: Math.trunc(-4.9) retorna -4, enquanto Math.floor(-4.9) retorna -5."),
          q("Qual é o intervalo de números produzidos por Math.random()?", "Valores de ponto flutuante no intervalo semiaberto entre 0 (inclusive) e 1 (exclusive) [0, 1)", ["Valores inteiros entre 0 e 100","Números negativos entre -1 e 0"], "Para gerar inteiros entre min e max, multiplica-se a amplitude e aplica-se Math.floor."),
          t("Qual método de Math calcula a potência x elevado a y (x^y)?", ["Math.pow"], "Math.pow(x, y) ou o operador moderno x ** y.", "# calcula potencia"),
          g("Complete a fórmula para sortear um número inteiro entre 1 e 10:", ["const sorteio = Math.floor(Math.random() * 10) + 1;"], "Math.floor trunca o valor gerado para número inteiro.", "const sorteio = ____(Math.random() * 10) + 1;"),
          o("Ordene os métodos de arredondamento de Math aplicados ao número 3.2:", ["Math.floor(3.2): arredonda para baixo resultando em 3","Math.trunc(3.2): descarta a fração decimal resultando em 3","Math.round(3.2): avalia proximidade resultando em 3","Math.ceil(3.2): arredonda para cima resultando em 4"], "Comparações de arredondamento de frações positivas no objeto Math."),
          p("Associe a função do objeto Math ao seu cálculo:", [["Math.max(10, 20, 5)","Retorna o maior valor entre os argumentos (20)"],["Math.min(10, 20, 5)","Retorna o menor valor entre os argumentos (5)"],["Math.abs(-42)","Retorna o valor absoluto positivo (42)"],["Math.sqrt(64)","Retorna a raiz quadrada exata do número (8)"]], "Operações fundamentais fornecidas pelo objeto estático Math.")
        ]
      },
      {
        id: "js-c03-u2-l5",
        title: "O tipo primitivo BigInt para inteiros arbitrários",
        subtitle: "Precisão · Manipulando inteiros maiores que Number.MAX_SAFE_INTEGER",
        theory: "O BigInt é um tipo primitivo introduzido para representar inteiros com precisão arbitrária, superando o teto de 2^53 - 1 do tipo Number. Um BigInt é criado com o sufixo n (ex: 9007199254740992n) ou chamando BigInt(). Operações entre BigInt e Number não realizam coerção implícita e exigem conversão deliberada.",
        questions: [
          q("Como um literal de BigInt é representado sintaticamente no código JavaScript?", "Acrescentando a letra n no final do número inteiro (ex: 12345678901234567890n)", ["Adicionando o prefixo # antes do número","Escrevendo BIG na frente do número"], "O sufixo n indica ao compilador que aquele literal pertence ao tipo BigInt."),
          q("O que acontece se tentarmos somar um BigInt diretamente com um Number (ex: 10n + 5)?", "Lança um erro em tempo de execução: TypeError: Cannot mix BigInt and other types", ["O resultado é convertido para string","O número 5 vira zero"], "O JavaScript proíbe misturar BigInt e Number sem conversão explícita para evitar perda de precisão oculta."),
          q("Qual é o resultado de uma divisão inteira entre BigInts (ex: 5n / 2n)?", "2n (a parte decimal é truncada na divisão inteira de BigInts)", ["2.5","3n"], "BigInt opera estritamente no domínio dos números inteiros; frações são truncadas em direção a zero."),
          q("Qual operador de igualdade estrita deve ser usado ao comparar um BigInt e um Number?", "=== (ex: 0n === 0 avalia para false porque possuem tipos primitivos distintos)", ["== (compara sem checar tipo)","!="], "0n === 0 é false (bigint vs number), mas 0n == 0 avalia para true."),
          t("Qual sufixo de uma única letra transforma um inteiro literal em BigInt?", ["n"], "Exemplo: 42n.", "# sufixo literal de BigInt"),
          g("Complete a conversão explícita para permitir somar com a constante BigInt:", ["const total = 100n + BigInt(5);"], "BigInt(5) converte o Number para BigInt viabilizando a adição.", "const total = 100n + ____(5);"),
          o("Ordene os passos para processar com segurança IDs numéricos de 64 bits de bancos de dados:", ["Receber o payload da API com IDs representados como strings no JSON","Converter a string do identificador com BigInt(idString)","Executar comparações e operações de ordenação no domínio BigInt","Reconverter para string antes de serializar novamente para JSON"], "Pipeline padrão de engenharia para lidar com identificadores de alta precisão (Snowflake IDs)."),
          p("Associe o tipo numérico ao seu caso de uso ótimo:", [["Number","Cálculos de física, trigonometria, frações decimais e índices comuns"],["BigInt","Criptografia, inteiros de 64 bits, nanosegundos e contabilidade inteira"],["Number.MAX_SAFE_INTEGER","Limite máximo (9.007.199.254.740.991) para inteiros exatos no tipo Number"],["TypeError em BigInt + Number","Mecanismo de segurança para forçar o desenvolvedor a decidir onde truncar"]], "Comparação arquitetural entre Number e BigInt em JavaScript.")
        ]
      }
    ],
    3: [
      {
        id: "js-c03-u3-l1",
        title: "Strings primitivas e imutabilidade",
        subtitle: "Fundamentos · Índices, comprimento length e caracteres UTF-16",
        theory: "Strings são sequências primitivas e imutáveis de caracteres codificados em UTF-16. O comprimento é obtido pela propriedade length e caracteres individuais são lidos por índice com colchetes texto[0] ou método at(). Nenhuma operação pode alterar uma string existente no lugar; toda mutação produz uma nova string.",
        questions: [
          q("O que acontece se você tentar alterar um caractere de uma string com texto[0] = \"A\"?", "A alteração é ignorada silenciosamente (ou lança TypeError em modo estrito); strings são imutáveis", ["O caractere é alterado normalmente","A string inteira é apagada"], "Valores primitivos em JavaScript não podem sofrer mutação interna de estado."),
          q("Qual propriedade retorna a quantidade de unidades de código UTF-16 de uma string?", "length", ["size","count()"], "texto.length mede o total de unidades de código da string."),
          q("Qual método moderno permite acessar caracteres com suporte a índices negativos a partir do final?", ".at(index)", [".charAt()",".sliceOne()"], "texto.at(-1) retorna o último caractere da string sem precisar calcular texto.length - 1."),
          q("Como o JavaScript lida com emojis e caracteres especiais que usam pares substitutos (surrogate pairs)?", "Ocupam duas unidades de código UTF-16 na propriedade length (ex: emoji \"🚀\".length === 2)", ["Ocupam exatamente 1 unidade sempre","Geram erro de decodificação"], "Para contar caracteres Unicode reais independentemente de pares, converte-se com [...texto].length."),
          t("Qual propriedade de uma string informa o seu número de caracteres em unidades de código?", ["length"], "texto.length retorna a extensão numérica da string.", "# tamanho da string"),
          g("Complete o acesso ao último caractere da string usando o método moderno:", ["const ultimo = mensagem.at(-1);"], "O método .at() aceita números negativos contando a partir do final.", "const ultimo = mensagem.____(-1);"),
          o("Ordene as etapas de uma operação que transforma uma string em JavaScript:", ["A string primitiva original é mantida intacta na memória sem qualquer mutação","O método utilitário (ex: toUpperCase()) é executado sobre o valor","Uma instância totalmente nova de string contendo o resultado é alocada","A nova referência é retornada para o código ou reatribuída à variável"], "Ciclo de vida e garantia de imutabilidade de valores primitivos em JavaScript."),
          p("Associe o método ou propriedade de string à sua função:", [["texto.length","Retorna o número de unidades de código UTF-16 da string"],["texto.at(-1)","Retorna o último caractere utilizando indexação negativa"],["texto.charAt(0)","Retorna o primeiro caractere na posição informada"],["texto.charCodeAt(0)","Retorna o código numérico UTF-16 do caractere na posição"]], "Métodos fundamentais de inspeção de caracteres em strings JavaScript.")
        ]
      },
      {
        id: "js-c03-u3-l2",
        title: "Template literals e interpolação (${})",
        subtitle: "Interpolação · Criando textos dinâmicos e strings multilinha",
        theory: "Template literals (delimitados por crases ``) permitem interpolação direta de expressões com a sintaxe ${expressao} e preservam quebras de linha naturais sem caracteres de escape \\n. Essa sintaxe simplifica a montagem de strings dinâmicas e elimina concatenações frágeis com o operador +.",
        questions: [
          q("Qual caractere delimita a criação de um template literal em JavaScript?", "Crase (backtick `)", ["Aspas simples (')","Aspas duplas (\")"], "A crase ativa o suporte a interpolação e strings de múltiplas linhas na gramática do JavaScript."),
          q("Como interpolar uma variável ou expressão arbitrária dentro de um template literal?", "${expressao}", ["#{expressao}","{{expressao}}"], "Qualquer expressão válida em JavaScript pode ser inserida entre as chaves ${}."),
          q("O que acontece com quebras de linha inseridas diretamente dentro de um template literal?", "São preservadas literalmente na string resultante, sem necessidade de caracteres \\n", ["Geram SyntaxError","São convertidas em espaços comuns"], "Facilita criar templates de HTML, SQL e mensagens longas de forma limpa e legível."),
          q("O que é uma Tagged Template Function (ex: sql`SELECT * FROM users`)?", "Uma função que intercepta os fragmentos estáticos e os valores interpolados do template antes da montagem", ["Um comentário no código","Um tipo de dado exclusivo do TypeScript"], "Padrão amplamente utilizado para sanitização contra injeção de SQL e estilização CSS-in-JS."),
          t("Qual símbolo de dois caracteres abre a interpolação de variáveis em template literals?", ["${"], "Sintaxe: `${nome}`.", "# abre expressao interpolada"),
          g("Complete a interpolação elegante do nome do usuário dentro da saudação:", ["const msg = `Olá, ${usuario.nome}!`;"], "Template literals utilizam crases e chaves com cifrão.", "const msg = `Olá, ____!`; // interpola usuario.nome"),
          o("Ordene as etapas de avaliação de um template literal pelo interpretador:", ["Analisar os segmentos estáticos de texto delimitados pelas crases","Avaliar sequencialmente cada expressão contida dentro de blocos ${}","Converter os resultados das expressões avaliadas para string via coerção padrão","Concatenar os segmentos estáticos e os valores avaliados na string final"], "Algoritmo de parsing e resolução de template literals no motor JavaScript."),
          p("Associe a técnica de construção de string ao seu benefício principal:", [["`Olá, ${nome}`","Interpolação declarativa e limpa sem operadores manuais"],["Strings multilinha com ``","Preserva indentação e quebras de linha sem escapes \\n"],["Tagged templates (tag`...`)","Permite sanitização, escape e DSLs especializadas"],["\"a\" + \"b\"","Concatenação clássica legada por operador de adição"]], "Técnicas de composição e formatação de texto em JavaScript moderno.")
        ]
      },
      {
        id: "js-c03-u3-l3",
        title: "Busca e fatiamento: indexOf, includes, slice",
        subtitle: "Manipulação · Extraindo partes e verificando substrings",
        theory: "O método .includes() verifica a presença de uma substring retornando booleano. O método .indexOf() retorna a posição inicial ou -1 caso ausente. O método .slice(inicio, fim) extrai uma fatia da string sem mutação, suportando índices negativos para calcular posições a partir do fim.",
        questions: [
          q("Qual método moderno retorna true se uma substring existir dentro de uma string?", ".includes(\"termo\")", [".contains(\"termo\")",".has(\"termo\")"], "includes() devolve um booleano direto sem necessidade de comparar com -1."),
          q("O que str.indexOf(\"abc\") retorna se a substring não for encontrada na string str?", "-1", ["false","null"], "O valor -1 é a convenção clássica para indicar ausência de correspondência no índice."),
          q("Qual é o resultado de \"JavaScript\".slice(0, 4)?", "\"Java\"", ["\"JavaS\"","\"Script\""], "slice(inicio, fim) inclui o índice inicial e exclui o índice final [inicio, fim)."),
          q("O que \"documento.pdf\".slice(-3) retorna utilizando índice negativo?", "\"pdf\"", ["\"doc\"","\"\""], "Índices negativos contam a partir da extremidade final da string."),
          t("Qual método moderno de string substituiu o uso de indexOf(termo) !== -1 para checagem simples?", ["includes"], "str.includes(busca) retorna true ou false.", "# checagem booleana de substring"),
          g("Complete o fatiamento para extrair os 3 primeiros caracteres do código:", ["const prefixo = codigo.slice(0, 3);"], "slice(0, 3) seleciona os índices 0, 1 e 2.", "const prefixo = codigo.____(0, 3);"),
          o("Ordene as etapas para verificar se um email pertence a um domínio específico:", ["Localizar o caractere @ na string usando email.indexOf(\"@\")","Extrair a fatia do domínio posterior ao @ utilizando email.slice(posicao + 1)","Verificar se o domínio termina com o sufixo esperado via .endsWith(\".com\")","Retornar o resultado booleano da validação para o chamador"], "Fluxo de parsing e extração de dados usando métodos de string."),
          p("Associe o método de string ao seu comportamento:", [["str.includes(busca)","Retorna booleano indicando presença da substring"],["str.indexOf(busca)","Retorna o índice numérico da primeira ocorrência ou -1"],["str.slice(inicio, fim)","Retorna a fatia de caracteres entre os índices informados"],["str.startsWith(prefixo)","Verifica se a string inicia exatamente com o prefixo"]], "Conjunto de métodos canônicos para busca e extração de substrings.")
        ]
      },
      {
        id: "js-c03-u3-l4",
        title: "Transformação: toUpperCase, trim, replace",
        subtitle: "Sanitização · Limpando espaços e substituindo padrões",
        theory: "A sanitização de strings envolve transformações comuns. .trim() remove espaços em branco das extremidades. .toUpperCase() e .toLowerCase() normalizam caixas para comparações seguras. .replace() substitui a primeira ocorrência de um padrão, enquanto .replaceAll() substitui todas as correspondências.",
        questions: [
          q("Qual método remove espaços em branco, quebras de linha e tabulações das pontas de uma string?", ".trim()", [".clean()",".strip()"], "trim() elimina espaços redundantes sem alterar o miolo do texto."),
          q("Qual é a diferença entre str.replace(\"a\", \"b\") e str.replaceAll(\"a\", \"b\")?", "replace substitui apenas a primeira ocorrência; replaceAll substitui todas as ocorrências encontradas", ["replaceAll altera a string original no lugar","Não há diferença"], "replaceAll simplifica substituições globais sem exigir expressões regulares com flag /g."),
          q("Como fazer uma comparação de strings insensível a maiúsculas e minúsculas (case-insensitive)?", "Normalizando ambas as strings com .toLowerCase() antes de comparar com ===", ["Usando o operador ==~","Multiplicando por 1"], "Converter ambos os lados para a mesma caixa garante correspondência determinística."),
          q("Qual método remove espaços em branco exclusivamente no início da string?", ".trimStart() (ou .trimLeft())", [".trimEnd()",".trimFront()"], "trimStart() higieniza apenas a borda esquerda do texto."),
          t("Qual método moderno de string substitui todas as instâncias de um termo sem precisar de regex?", ["replaceAll"], "str.replaceAll(de, para) substitui todas as ocorrências.", "# substitui todas as correspondencias"),
          g("Complete a sanitização do texto removendo espaços e padronizando em minúsculas:", ["const limpo = entrada.trim().toLowerCase();"], "Encadeamento idiomático para normalização de entrada de usuários.", "const limpo = entrada.____().toLowerCase();"),
          o("Ordene as etapas para sanitizar uma entrada de nome digitada em um formulário:", ["Remover espaços acidentais antes e depois do texto com .trim()","Normalizar múltiplos espaços internos duplicados com .replaceAll(\"  \", \" \")","Converter a primeira letra de cada palavra para maiúscula","Salvar a string formatada no banco de dados"], "Pipeline padrão de tratamento e higienização de strings em aplicações web."),
          p("Associe o método de transformação ao seu resultado correspondente:", [["\"  js  \".trim()","\"js\" (espaços periféricos removidos)"],["\"gato\".toUpperCase()","\"GATO\" (todas as letras em caixa alta)"],["\"1-2-3\".replaceAll(\"-\", \":\")","\"1:2:3\" (todos os hífens substituídos)"],["\"SP\".toLowerCase()","\"sp\" (caracteres convertidos para minúsculas)"]], "Exemplos práticos de métodos de transformação de strings em JavaScript.")
        ]
      },
      {
        id: "js-c03-u3-l5",
        title: "Divisão e junção com split e join",
        subtitle: "Conversão · Alternando entre strings e arrays de texto",
        theory: "O método .split(separador) quebra uma string em um array de substrings delimitadas pelo separador informado. O método de array .join(delimitador) realiza o inverso, unindo elementos de um array em uma única string unificada com o conector desejado, formando uma dupla poderosa de processamento.",
        questions: [
          q("O que \"a,b,c\".split(\",\") retorna?", "[\"a\", \"b\", \"c\"] (um array de strings)", ["\"abc\"","[\"a,b,c\"]"], "split fatia a string original utilizando a vírgula como delimitador divisor."),
          q("Como transformar um array [\"JavaScript\", \"é\", \"legal\"] de volta em uma string separada por espaços?", "[\"JavaScript\", \"é\", \"legal\"].join(\" \")", [".concatAll(\" \")",".toString(\" \")"], "join une os itens do array intercalando o delimitador informado entre cada elemento."),
          q("Qual é o resultado de \"código\".split(\"\") passando uma string vazia como separador?", "[\"c\", \"ó\", \"d\", \"i\", \"g\", \"o\"] (um array contendo cada caractere individualmente)", ["[\"código\"]","\"\""], "Passar string vazia divide a string em seus caracteres constituintes."),
          q("Qual método idiomático inverte uma string usando split, reverse e join?", "str.split(\"\").reverse().join(\"\")", ["str.invert()","str.backward()"], "Converte para array, inverte as posições com reverse() e une novamente com join(\"\")."),
          t("Qual método de array une elementos transformando-os em uma única string conectada?", ["join"], "array.join(delimitador) sintetiza a string final.", "# une elementos do array em string"),
          g("Complete a quebra da linha CSV em colunas de dados:", ["const colunas = linha.split(\";\");"], "split divide o texto utilizando o ponto e vírgula como delimitador.", "const colunas = linha.____(\";\");"),
          o("Ordene as etapas do algoritmo para inverter a ordem das palavras de uma frase:", ["Dividir a frase em palavras separadas por espaço usando frase.split(\" \")","Inverter a ordem dos elementos do array com .reverse()","Unir as palavras invertidas em uma nova string com .join(\" \")","Retornar o texto resultante com as palavras reorganizadas"], "Composição clássica de métodos funcionais entre strings e arrays."),
          p("Associe a operação ao seu resultado prático:", [["\"10;20;30\".split(\";\")","[\"10\", \"20\", \"30\"]"],["[\"São\", \"Paulo\"].join(\"-\")","\"São-Paulo\""],["\"olá\".split(\"\")","[\"o\", \"l\", \"á\"]"],["[1, 2, 3].join(\"\")","\"123\""]], "Operações de conversão bidirecional entre strings e arrays em JavaScript.")
        ]
      }
    ],
    4: [
      {
        id: "js-c03-u4-l1",
        title: "O tipo booleano: true e false",
        subtitle: "Fundamentos · Valores literais de verdade e predicados lógicos",
        theory: "O tipo primitivo booleano possui apenas dois valores literais possíveis: true e false. Eles expressam o estado de verdade de premissas lógicas e o resultado de testes de comparação. Variáveis booleanas devem ser nomeadas como predicados (ex: isAtivo, temPermissao) para máxima clareza.",
        questions: [
          q("Quais são os únicos dois valores literais pertencentes ao tipo primitivo boolean?", "true e false", ["0 e 1","\"yes\" e \"no\""], "O tipo booleano é estritamente binário na especificação da linguagem."),
          q("Qual operador unário inverte o valor de verdade de um booleano (!true)?", "Operador de negação lógica de exclamação (!)", ["Operador de til (~)","Operador de menos (-)"], "!true avalia para false, e !false avalia para true."),
          q("Qual convenção de nomenclatura de variáveis é recomendada para identificar booleanos?", "Prefixos de predicado como is, has ou can (ex: isActive, hasAccess, canEdit)", ["Sufixo com número","Letras maiúsculas apenas"], "Prefixos interrogativos tornam condicionais como if (hasAccess) imediatamente legíveis."),
          q("Qual é o retorno de typeof true em JavaScript?", "\"boolean\"", ["\"bool\"","\"True\""], "A string \"boolean\" identifica o tipo primitivo retornado pelo operador typeof."),
          t("Qual valor literal booleano representa falsidade lógica no JavaScript?", ["false"], "false é o literal primitivo de negação.", "# valor booleano de falsidade"),
          g("Complete a verificação do predicado booleano no bloco condicional:", ["if (usuario.isAtivo) {\n    permitirAcesso();\n}"], "Predicados booleanos são avaliados diretamente sem necessidade de comparar com === true.", "if (usuario.____) {\n    permitirAcesso(); // condicional com isAtivo"),
          o("Ordene as avaliações de negação lógica encadeadas:", ["Valor original: true","Primeira negação (!true): resulta em false","Segunda negação (!false): resulta em true","Terceira negação (!true): resulta em false"], "Efeito cíclico de aplicações sucessivas do operador unário de negação lógica."),
          p("Associe a expressão booleana ao seu valor avaliado:", [["!false","Avalia para o valor booleano true"],["!true","Avalia para o valor booleano false"],["Boolean(1)","Coerção explícita de número positivo para true"],["Boolean(0)","Coerção explícita de número zero para false"]], "Valores e negações booleanas primitivas em JavaScript.")
        ]
      },
      {
        id: "js-c03-u4-l2",
        title: "Valores Truthy e Falsy em JavaScript",
        subtitle: "Coerção · Os 8 valores que avaliam para falso em contextos booleanos",
        theory: "Em JavaScript, todo valor se converte para true ou false quando submetido a um contexto booleano. Existem exatamente 8 valores Falsy: false, 0, -0, 0n, \"\" (string vazia), null, undefined e NaN. Absolutamente todos os demais valores da linguagem (incluindo arrays vazios [] e objetos vazios {}) são Truthy.",
        questions: [
          q("Quais valores compõem a lista completa de valores Falsy em JavaScript?", "false, 0, -0, 0n, \"\" (string vazia), null, undefined e NaN", ["Apenas false e 0","Todos os números negativos"], "Decorar os 8 valores falsy é essencial para evitar bugs de coerção em condicionais."),
          q("Qual é a avaliação de um array vazio [] quando colocado em uma condicional if ([])?", "Truthy (o bloco if será executado com sucesso)", ["Falsy","Lança TypeError"], "Todo objeto em JavaScript (incluindo arrays [] e objetos {}) é truthy, mesmo que vazio."),
          q("Qual é a avaliação de uma string contendo apenas um espaço em branco \" \" em if (\" \")?", "Truthy (porque seu comprimento não é zero e ela não é uma string vazia \"\")", ["Falsy","Indefinida"], "Apenas a string estritamente vazia \"\" é falsy; qualquer caractere a torna truthy."),
          q("Qual é a avaliação do número zero (0) em um contexto booleano?", "Falsy", ["Truthy","Neutro"], "O número zero avalia para false, o que exige cuidado ao validar variáveis numéricas."),
          t("Qual valor primitivo especial de \"Not a Number\" pertence à lista dos 8 valores Falsy?", ["NaN"], "NaN é avaliado como falsy em condicionais lógicas.", "# Not a Number e falsy"),
          g("Complete a condicional evitando que o valor numérico 0 seja considerado ausente:", ["if (valor !== undefined && valor !== null) {\n    salvar(valor);\n}"], "Verificação estrita impede que o número 0 caia na armadilha do falsy.", "if (valor !== undefined && valor !== ____) {\n    salvar(valor);\n}"),
          o("Ordene os valores de acordo com sua categoria (Truthy ou Falsy):", ["\"\" (string vazia): categoria Falsy","0 (número zero): categoria Falsy","\"0\" (string com o dígito zero): categoria Truthy","[] (array vazio): categoria Truthy"], "Diferenciação crítica entre valores Truthy e Falsy que geram pegadinhas comuns."),
          p("Associe o valor à sua respectiva classificação em contexto booleano:", [["null","Valor falsy por ausência de objeto"],["undefined","Valor falsy por falta de inicialização"],["{} (objeto vazio)","Objeto referencial que avalia para truthy"],["\"false\" (string com texto)","String preenchida não-vazia que avalia para truthy"]], "Classificação rigorosa de valores em contextos condicionais JavaScript.")
        ]
      },
      {
        id: "js-c03-u4-l3",
        title: "Conversão explícita com Boolean() e !!",
        subtitle: "Conversão · Forçando avaliação booleana com dupla negação",
        theory: "Para converter qualquer valor arbitrário explicitamente em um booleano verdadeiro (true ou false), utilizamos a função global Boolean(valor) ou o operador idiomático de dupla negação !!valor. Ambos realizam coerção estrita garantindo um tipo primitivo booleano puro na saída.",
        questions: [
          q("Como funciona o operador idiomático de dupla negação (!!)?", "A primeira negação (!) converte o valor para booleano invertido; a segunda (!) desinverte, entregando o booleano real", ["É um operador de potência matemática","Gera um erro de sintaxe"], "!!valor é a forma concisa mais rápida de forçar um valor ao seu equivalente booleano estrito."),
          q("Qual é a diferença funcional entre Boolean(x) e !!x?", "Nenhuma no resultado; ambos produzem rigorosamente o mesmo booleano primitivo verdadeiro", ["Boolean(x) cria um objeto e !!x cria um primitivo","!!x só aceita números"], "Boolean(x) costuma ser mais explícito para iniciantes, enquanto !!x é consagrado em bases de código experientes."),
          q("Qual é o resultado de !!\"\" (dupla negação de string vazia)?", "false", ["true","\"\""], "Como string vazia é falsy, a primeira exclamação vira true e a segunda devolve false."),
          q("Qual é o resultado de !![] (dupla negação de array vazio)?", "true", ["false","[]"], "Como objetos e arrays são sempre truthy, sua dupla negação resulta estritamente em true."),
          t("Qual função construtora global converte qualquer entrada explicitamente para tipo primitivo boolean?", ["Boolean"], "Boolean(x) devolve true ou false.", "# funcao global de coercao booleana"),
          g("Complete a conversão da string em booleano usando a técnica idiomática de dupla negação:", ["const temNome = !!usuario.nome;"], "!! converte qualquer valor truthy/falsy em booleano estrito.", "const temNome = ____usuario.nome;"),
          o("Ordene as etapas da conversão de um valor falsy usando dupla negação (ex: !!0):", ["Dado inicial: número 0 (valor falsy)","Primeira negação (!0): coerção para booleano e inversão resultando em true","Segunda negação (!true): nova inversão retornando ao estado lógico final false","Entrega do primitivo booleano false para o consumidor"], "Passo a passo lógico da operação com operador unário duplo."),
          p("Associe a expressão à sua saída booleana explícita:", [["Boolean(0)","Retorna false para número zero"],["Boolean(\"texto\")","Retorna true para string não vazia"],["!!null","Dupla negação de nulo avaliando para false"],["!!{}","Dupla negação de objeto avaliando para true"]], "Comportamento da coerção explícita para o tipo booleano.")
        ]
      },
      {
        id: "js-c03-u4-l4",
        title: "Operador ternário condicional (? :)",
        subtitle: "Expressões · Seleção compacta de valores em expressões inline",
        theory: "O operador condicional ternário é o único operador do JavaScript que recebe três operandos: condicao ? exprVerdadeira : exprFalsa. Ao contrário da instrução if que é um comando, o ternário é uma expressão avaliada inline, sendo ideal para atribuições diretas de variáveis e templates JSX.",
        questions: [
          q("Qual é a estrutura sintática padrão do operador condicional ternário?", "condicao ? valorSeVerdadeiro : valorSeFalso", ["if condicao then valorSeVerdadeiro else valorSeFalso","condicao -> verdadeiro | falso"], "O ponto de interrogação separa a condição da ramificação verdadeira; os dois pontos separam a ramificação falsa."),
          q("Qual é a principal vantagem do operador ternário sobre uma instrução if clássica?", "Por ser uma expressão com valor de retorno, pode ser usado diretamente em atribuições de variáveis e retornos", ["Executa mais rápido que código de máquina","Não aceita valores booleanos"], "Permite escrever const status = ativo ? \"online\" : \"offline\" em uma única linha clara."),
          q("Por que ternários aninhados excessivamente (ternários dentro de ternários) são considerados más práticas?", "Prejudicam gravemente a legibilidade do código, tornando o fluxo de decisões confuso e propenso a erros", ["Porque o interpretador limita a um ternário por arquivo","Porque causam vazamento de memória"], "Quando houver mais de duas ramificações, prefira if/else convencional ou instrução switch."),
          q("O que acontece se a condição do ternário avaliar para truthy?", "Apenas a expressão antes dos dois pontos é avaliada e retornada; a segunda expressão é ignorada", ["Ambas as expressões são executadas","O programa pausa"], "O ternário avalia apenas o ramo vencedor, evitando efeitos colaterais desnecessários."),
          t("Qual símbolo de pontuação separa o ramo verdadeiro do ramo falso no operador ternário?", [":"], "Sintaxe: condicao ? sim : nao.", "# separador do ramo falso do ternario"),
          g("Complete a atribuição do rótulo utilizando o operador ternário:", ["const rotulo = isAdmin ? \"Administrador\" : \"Usuário\";"], "O ternário avalia isAdmin e seleciona o texto correspondente.", "const rotulo = isAdmin ____ \"Administrador\" : \"Usuário\";"),
          o("Ordene as partes constituintes de uma expressão ternária completa:", ["Condição ou predicado que será avaliado para Truthy ou Falsy","Ponto de interrogação (?) sinalizando o início das alternativas","Expressão avaliada e retornada caso a condição seja verdadeira","Dois pontos (:) seguidos pela expressão alternativa para o caso falso"], "Estruturação sintática formal do operador ternário em JavaScript."),
          p("Associe a expressão ternária ao seu valor resultante:", [["10 > 5 ? \"maior\" : \"menor\"","\"maior\""],["null ? \"sim\" : \"não\"","\"não\" (null é falsy)"],["\"\" ? 1 : 2","2 (string vazia é falsy)"],["[] ? \"presente\" : \"ausente\"","\"presente\" (array é truthy)"]], "Exemplos práticos de avaliação com o operador condicional ternário.")
        ]
      },
      {
        id: "js-c03-u4-l5",
        title: "Curto-circuito lógico com && e ||",
        subtitle: "Avaliação · Retorno do primeiro valor decisivo em expressões",
        theory: "Os operadores lógicos && e || em JavaScript realizam curto-circuito (short-circuit) e não retornam necessariamente um booleano: eles retornam o valor exato do operando decisivo. O operador && retorna o primeiro valor falsy ou o último se todos forem truthy. O operador || retorna o primeiro valor truthy.",
        questions: [
          q("O que o operador a && b retorna se a for um valor Falsy?", "Retorna o próprio valor de a imediatamente sem avaliar b (curto-circuito)", ["Retorna sempre false booleano","Retorna o valor de b"], "Como o primeiro operando é falsy, a conjunção já está decidida e o restante é ignorado."),
          q("O que o operador a || b retorna se a for um valor Truthy?", "Retorna o próprio valor de a imediatamente sem avaliar b (curto-circuito)", ["Retorna sempre true booleano","Retorna o valor de b"], "Na disjunção, encontrar um único valor truthy é suficiente para encerrar a avaliação e entregá-lo."),
          q("Qual é o resultado exato da expressão \"Visitante\" || \"Anônimo\"?", "\"Visitante\" (pois a string não vazia \"Visitante\" é o primeiro valor truthy)", ["true","\"Anônimo\""], "O operador || seleciona e devolve o primeiro valor truthy encontrado da esquerda para a direita."),
          q("Qual é o risco histórico de usar || para definir valores padrão (ex: const limite = entrada || 10)?", "Se entrada for o número 0 ou string vazia \"\", o || considera falsy e aplica o padrão 10 indevidamente", ["O operador || desliga o computador","O valor 10 vira string"], "Valores válidos como 0 e false eram descartados acidentalmente pelo operador ||."),
          t("Qual operador lógico é conhecido como conjunção e interrompe no primeiro valor falsy?", ["&&"], "&& avalia até encontrar um valor falsy.", "# operador logico AND curto-circuito"),
          g("Complete a execução condicional de função usando curto-circuito com &&:", ["isValido && salvarDados();"], "salvarDados() só será chamada se isValido avaliar para truthy.", "isValido ____ salvarDados();"),
          o("Ordene as avaliações da expressão (\"\" || 0 || \"Sucesso\" || \"Fim\"):", ["Avaliar primeiro operando \"\": valor falsy, continua a busca pelo primeiro truthy","Avaliar segundo operando 0: valor falsy, continua a busca","Avaliar terceiro operando \"Sucesso\": valor truthy encontrado","Interromper a avaliação em curto-circuito e retornar o valor \"Sucesso\""], "Fluxo sequencial de curto-circuito do operador lógico OR (||)."),
          p("Associe a expressão lógica ao seu retorno exato em JavaScript:", [["null && \"ok\"","null (primeiro falsy)"],["\"user\" && \"logado\"","\"logado\" (ambos truthy, retorna o último)"],["undefined || \"padrão\"","\"padrão\" (segundo operando escolhido)"],["\"ativo\" || \"inativo\"","\"ativo\" (primeiro truthy)"]], "Retorno real de expressões lógicas avaliadas com curto-circuito.")
        ]
      }
    ],
    5: [
      {
        id: "js-c03-u5-l1",
        title: "Diferença conceitual entre null e undefined",
        subtitle: "Ausência de valor · Ausência intencional vs variável não inicializada",
        theory: "Em JavaScript, undefined indica que uma variável foi declarada mas ainda não recebeu nenhum valor atribuído, ou que uma função não retornou nada. null representa a ausência intencional de qualquer valor ou objeto, sendo atribuído deliberadamente pelo programador para indicar um estado vazio.",
        questions: [
          q("Qual é a diferença conceitual primária entre undefined e null?", "undefined é o valor padrão para variáveis não inicializadas; null é uma atribuição intencional de ausência de objeto", ["São sinônimos exatos sem nenhuma distinção","null é um número e undefined é texto"], "undefined é o estado nativo de inicialização, enquanto null expressa a decisão deliberada de reset ou vazio."),
          q("Qual é o valor padrão retornado por uma função JavaScript que não possui a instrução return explícita?", "undefined", ["null","void"], "Funções sem retorno retornam undefined por padrão na especificação da linguagem."),
          q("O que acontece ao acessar uma propriedade inexistente em um objeto (ex: const obj = {}; obj.idade)?", "Retorna undefined sem lançar erro", ["Lança NullPointerException","Retorna null"], "Acessar chaves ausentes em objetos válidos resulta em undefined sem interromper o script."),
          q("Qual é o resultado da comparação com igualdade estrita null === undefined?", "false (possuem tipos primitivos diferentes)", ["true","TypeError"], "null === undefined é false, mas a comparação frouxa null == undefined avalia para true."),
          t("Qual valor literal primitivo expressa a atribuição intencional de um valor vazio ou nulo?", ["null"], "null é a referência deliberada de ausência de valor.", "# ausencia intencional de valor"),
          g("Complete a redefinição da sessão do usuário para valor intencionalmente nulo:", ["usuarioAtual = null;"], "Atribuir null indica explicitamente que não há usuário logado na sessão.", "usuarioAtual = ____;"),
          o("Ordene os estados de uma variável no código pelo seu ciclo de vida:", ["let sessao; (variável declarada, valor inicial automático undefined)","sessao = { id: 1 }; (variável associada a uma referência de objeto)","sessao = null; (reset intencional da variável para indicar ausência de sessão)","delete sessao; (tentativa inválida em variáveis de bloco)"], "Ciclo de transição de referências entre undefined, valor ativo e null."),
          p("Associe o cenário ao valor gerado pelo JavaScript:", [["let x;","undefined (variável declarada sem atribuição inicial)"],["function teste() {} teste()","undefined (retorno padrão de função vazia)"],["const res = null;","null (atribuição explícita de ausência)"],["typeof undefined","\"undefined\" (tipo primitivo exclusivo)"]], "Origens e classificações de ausência de valor em tempo de execução.")
        ]
      },
      {
        id: "js-c03-u5-l2",
        title: "O operador typeof e a anomalia typeof null",
        subtitle: "Tipagem · Identificando tipos e o bug histórico typeof null === \"object\"",
        theory: "O operador unário typeof retorna uma string indicando o tipo do operando (\"string\", \"number\", \"boolean\", \"undefined\", \"bigint\", \"symbol\", \"object\", \"function\"). Um bug histórico na implementação inicial do JavaScript faz com que typeof null retorne \"object\", exigindo testes estritos adicionais.",
        questions: [
          q("Por que a expressão typeof null retorna a string \"object\" em JavaScript?", "Trata-se de um bug histórico da primeira versão de 1995 mantido até hoje para não quebrar a web existente", ["Porque null é uma subclasse de Object","Porque null cria um objeto em memória"], "Na representação em C original, o ponteiro de null continha o mesmo rótulo de tipo 0 que marcava objetos."),
          q("Como verificar se uma variável é estritamente null de forma 100% segura?", "valor === null", ["typeof valor === \"null\"","valor == \"null\""], "O operador de igualdade estrita === é a forma correta e infalível de testar a presença de null."),
          q("Qual é o retorno de typeof function() {}?", "\"function\"", ["\"object\"","\"method\""], "Embora funções sejam objetos especiais executáveis, o typeof possui um caso especial retornando \"function\"."),
          q("Qual é o retorno de typeof [] (array vazio) em JavaScript?", "\"object\"", ["\"array\"","\"list\""], "Arrays são instâncias de Object; para verificar se um dado é array, deve-se usar Array.isArray(arr)."),
          t("Qual método estático e confiável da classe Array valida se uma variável é um array real?", ["Array.isArray"], "Array.isArray(x) diferencia arrays de objetos comuns.", "# checagem confiavel de array"),
          g("Complete a verificação que valida se o dado é estritamente um array:", ["if (Array.isArray(dados)) {\n    dados.forEach(exibir);\n}"], "Array.isArray contorna a limitação do typeof retornando \"object\".", "if (____(dados)) {\n    dados.forEach(exibir);\n}"),
          o("Ordene os tipos primitivos e especiais pelo retorno de seus respectivos typeof:", ["typeof \"texto\": retorna \"string\"","typeof 42: retorna \"number\"","typeof true: retorna \"boolean\"","typeof null: retorna \"object\" (anomalia histórica de tipo)"], "Mapeamento de saídas canônicas do operador unário typeof."),
          p("Associe a expressão ao seu respectivo retorno do operador typeof:", [["typeof undefined","\"undefined\""],["typeof 10n","\"bigint\""],["typeof Symbol()","\"symbol\""],["typeof null","\"object\" (bug histórico preservado por compatibilidade)"]], "Tabela formal de retornos da operação typeof na especificação ECMAScript.")
        ]
      },
      {
        id: "js-c03-u5-l3",
        title: "Nullish Coalescing (??) vs OR (||)",
        subtitle: "Padrão moderno · Fornecendo valores padrão apenas para null e undefined",
        theory: "O operador de coalescência nula (??) fornece um valor de fallback apenas se o operando esquerdo for estritamente null ou undefined (valores \"nullish\"). Ao contrário do operador || que substitui qualquer valor falsy (como 0 ou \"\"), o operador ?? preserva números zero e strings vazias perfeitamente.",
        questions: [
          q("Qual é a diferença essencial entre o operador ?? (nullish coalescing) e o operador || (logical OR)?", "?? substitui apenas null e undefined; || substitui qualquer valor falsy (incluindo 0, \"\" e false)", ["?? é mais lento que ||","|| só aceita números inteiros"], "O operador ?? foi criado para resolver a armadilha clássica onde configurações com 0 ou false eram ignoradas."),
          q("Qual é o resultado da expressão: 0 ?? 100?", "0 (pois zero é um número válido e não é null nem undefined)", ["100","undefined"], "Com o operador || o resultado seria 100, demonstrando a superioridade de ?? para valores padrão numéricos."),
          q("Qual é o resultado da expressão: \"\" ?? \"texto padrão\"?", "\"\" (string vazia é preservada pois não é null nem undefined)", ["\"texto padrão\"","null"], "Strings vazias legítimas não são descartadas acidentalmente pelo operador ??."),
          q("Qual é o resultado da expressão: null ?? \"fallback\"?", "\"fallback\"", ["null","undefined"], "null é um valor nullish, acionando imediatamente a alternativa à direita do operador."),
          t("Qual operador de dois caracteres é conhecido como operador de coalescência nula?", ["??"], "O operador ?? seleciona o lado direito apenas sob null e undefined.", "# nullish coalescing operator"),
          g("Complete a definição do valor padrão de porta preservando o zero como porta dinâmica:", ["const porta = entradaPorta ?? 3000;"], "?? garante que 0 não seja substituído pelo fallback 3000.", "const porta = entradaPorta ____ 3000;"),
          o("Ordene as avaliações de expressões comparando || e ?? para a entrada 0:", ["Dado de entrada: 0 (número válido com significado de contagem)","Avaliação com ||: (0 || 50) descarta 0 por ser falsy e retorna 50","Avaliação com ??: (0 ?? 50) reconhece que 0 não é nullish e preserva 0","Conclusão: ?? é a escolha arquitetural correta para números e flags"], "Comparativo de segurança entre fallback clássico com || e moderno com ??."),
          p("Associe a expressão com operador ?? ao valor resultante:", [["false ?? true","false (false não é nullish)"],["null ?? \"padrão\"","\"padrão\" (null ativa o fallback)"],["undefined ?? 42","42 (undefined ativa o fallback)"],["NaN ?? 0","NaN (NaN é falsy mas não é nullish)"]], "Comportamento exato do operador de coalescência nula sobre diferentes valores.")
        ]
      },
      {
        id: "js-c03-u5-l4",
        title: "Optional Chaining (?.) para navegação segura",
        subtitle: "Navegação segura · Acessando propriedades aninhadas sem TypeError",
        theory: "O encadeamento opcional (?.) permite ler o valor de uma propriedade aninhada ou executar métodos sem precisar validar manualmente se cada referência intermediária é válida. Se o operando antes de ?. for null ou undefined, a expressão faz um curto-circuito elegante e retorna undefined sem lançar TypeError.",
        questions: [
          q("Qual erro clássico o operador de encadeamento opcional (?.) previne ao navegar em objetos aninhados?", "TypeError: Cannot read properties of undefined (or null)", ["SyntaxError","ReferenceError"], "Interrompe a navegação antes que o motor tente ler propriedades de uma referência nula."),
          q("Qual é o resultado de usuario?.endereco?.cidade se a propriedade endereco for undefined?", "undefined", ["Lança TypeError","null"], "A avaliação faz curto-circuito imediato no primeiro elo nulo e devolve undefined."),
          q("Como invocar uma função ou método opcional com encadeamento seguro caso ele exista?", "callback?.(dados)", ["callback?(dados)","call(callback)"], "Se callback for uma função, ela é executada; se for null ou undefined, a chamada é ignorada pacificamente."),
          q("Como acessar um índice de array ou propriedade dinâmica com segurança usando optional chaining?", "itens?.[0] ou objeto?.[chave]", ["itens?[0]","itens.[0]?"], "A sintaxe ?.[ expressa a indexação segura de coleções e chaves computadas."),
          t("Qual combinação de dois caracteres forma o operador de encadeamento opcional em JavaScript?", ["?."], "Sintaxe: user?.profile?.email.", "# operador optional chaining"),
          g("Complete o acesso seguro ao email da empresa do cliente:", ["const email = cliente?.empresa?.contato?.email;"], "O operador ?. impede quebras se cliente ou empresa forem nulos.", "const email = cliente?.empresa____contato?.email;"),
          o("Ordene as etapas de avaliação de uma expressão com Optional Chaining (a?.b?.c):", ["Avaliar o operando da esquerda (a)","Se a for null ou undefined: interromper imediatamente e retornar undefined","Se a for um objeto válido: acessar a propriedade b e verificar se é nullish","Prosseguir até o último elo (c) e retornar o valor final da folha"], "Mecanismo de curto-circuito em árvore executado pelo motor JavaScript com ?.."),
          p("Associe a variante de Optional Chaining à sua aplicação correta:", [["obj?.propriedade","Acesso seguro a propriedades estáticas de objetos"],["arr?.[indice]","Acesso seguro a índices de arrays ou chaves dinâmicas"],["funcao?.(argumentos)","Invocação segura de funções ou callbacks opcionais"],["obj?.metodo()","Invocação de método apenas se a propriedade existir no objeto"]], "Sintaxes especializadas do operador de encadeamento opcional.")
        ]
      },
      {
        id: "js-c03-u5-l5",
        title: "Estratégias defensivas contra NullPointer e undefined",
        subtitle: "Robustez · Tratamento de entradas nulas em APIs e formulários",
        theory: "A combinação de Optional Chaining (?.) com o operador Nullish Coalescing (??) forma o padrão idiomático moderno para acesso defensivo a dados externos. A expressão obj?.prop ?? fallback garante uma leitura imune a falhas com garantia de entrega de um valor padrão bem definido quando o dado for nulo.",
        questions: [
          q("Qual combinação de operadores modernos fornece o padrão definitivo de acesso seguro com fallback?", "?. combinado com ?? (ex: usuario?.perfil?.nome ?? \"Anônimo\")", ["&& combinado com ||","if encadeado com switch"], "Lê o dado se existir e, caso seja null ou undefined, substitui imediatamente pelo fallback."),
          q("Por que validar entradas de APIs com padrões defensivos é essencial em aplicações web?", "Servidores e terceiros podem omitir chaves ou retornar null inesperadamente na resposta JSON", ["Para deixar a resposta mais leve","Para criptografar as senhas"], "Previne quebras em cascata na interface do usuário provocadas por contratos quebrados no backend."),
          q("O que acontece na expressão: config?.timeout ?? 5000 se config for null?", "Retorna 5000 com segurança e sem erros", ["Retorna undefined","Lança TypeError"], "config?.timeout avalia para undefined por curto-circuito, e ?? 5000 substitui pelo padrão 5000."),
          q("Qual é a recomendação para argumentos opcionais em funções modernas?", "Definir valores padrão diretamente na assinatura da função (ex: function criar(opcoes = {}))", ["Exigir que o chamador passe null","Criar duas funções com nomes diferentes"], "Argumentos padrão eliminam verificações manuais de undefined no início do corpo da função."),
          t("Qual operador substitui o valor por um padrão quando o encadeamento opcional resulta em undefined?", ["??"], "user?.name ?? \"Visitante\".", "# fallback para optional chaining"),
          g("Complete o padrão de acesso seguro com fallback para lista vazia:", ["const itens = resposta?.dados?.produtos ?? [];"], "Garante que itens seja sempre um array iterável mesmo com falha na API.", "const itens = resposta?.dados?.produtos ____ [];"),
          o("Ordene as camadas de proteção de uma função que consome dados de clientes:", ["Definir parâmetros com valor padrão na assinatura (payload = {})","Acessar propriedades aninhadas com Optional Chaining (payload?.cliente?.id)","Aplicar fallback com Nullish Coalescing (?? \"ID_PADRAO\")","Validar o tipo final antes de repassar para a regra de negócio"], "Pipeline defensivo de alta confiabilidade contra quebras por valores nulos."),
          p("Associe a técnica de programação defensiva ao seu benefício:", [["Parâmetros padrão (x = 10)","Evita valores undefined não tratados na entrada de funções"],["Optional Chaining (?.)","Elimina TypeErrors por acesso a propriedades de nulo"],["Nullish Coalescing (??)","Define valores de fallback seguros sem descartar o zero"],["Object.freeze()","Protege objetos de configuração contra alterações indesejadas"]], "Boas práticas para programação defensiva e tolerante a falhas em JavaScript.")
        ]
      }
    ],
    6: [
      {
        id: "js-c03-u6-l1",
        title: "Coerção implícita vs conversão explícita",
        subtitle: "Tipos dinâmicos · Como o JavaScript converte tipos automaticamente",
        theory: "A conversão explícita (type casting) ocorre quando o programador invoca deliberadamente funções como Number(), String() ou Boolean() para transformar tipos. A coerção implícita ocorre automaticamente quando o motor JavaScript converte operandos nos bastidores ao avaliar expressões mistas.",
        questions: [
          q("Qual é a diferença entre conversão explícita e coerção implícita de tipos?", "A explícita é invocada intencionalmente no código; a implícita é realizada silenciosamente pelo motor JS", ["A explícita é mais rápida que código binário","A implícita só ocorre em erros"], "A conversão explícita comunica com clareza a intenção do desenvolvedor, evitando armadilhas ocultas."),
          q("Por que a coerção implícita em operações matemáticas é uma fonte recorrente de bugs?", "Converte dados automaticamente de formas nem sempre intuitivas (ex: \"5\" - 2 resulta no número 3)", ["Porque apaga as variáveis da memória","Porque o computador trava"], "Comportamentos implícitos mascaram entradas incorretas e dificultam o rastreamento da causa raiz."),
          q("Qual forma de conversão deve ser priorizada em código de produção corporativo?", "Conversão explícita clara com Number(), String() e Boolean()", ["Coerção implícita com operadores arcanos","Nunca converter tipos"], "Facilita a leitura por outros desenvolvedores e melhora a integração com checadores como TypeScript."),
          q("Qual é o resultado da expressão \"10\" - 2 em JavaScript?", "8 (o operador de subtração força coerção implícita para tipo Number)", ["\"8\"","NaN"], "Como a subtração não opera sobre strings, o motor converte \"10\" para o número 10 antes da conta."),
          t("Qual função nativa converte qualquer valor explicitamente para o tipo primitivo String?", ["String"], "String(x) produz a representação textual do argumento.", "# conversor explicito para string"),
          g("Complete a conversão explícita e segura da entrada de texto para número:", ["const total = Number(entradaTexto);"], "Number() converte strings numéricas de forma explícita e declarativa.", "const total = ____(entradaTexto);"),
          o("Ordene as operações de acordo com o tipo de conversão adotado:", ["Number(\"42\"): conversão explícita para número","String(100): conversão explícita para string","\"5\" * 2: coerção implícita pelo operador de multiplicação para o número 10","!\"\": coerção implícita pela negação para o booleano true"], "Diferenciação clara entre abordagens explícitas e coerções implícitas de tipos."),
          p("Associe a operação ao seu tipo de conversão:", [["Boolean(valor)","Conversão explícita para booleano"],["+str","Coerção implícita numérica via operador unário de adição"],["String(num)","Conversão explícita para string"],["`${num}`","Conversão para string via template literal"]], "Técnicas de conversão de dados primitivos em JavaScript.")
        ]
      },
      {
        id: "js-c03-u6-l2",
        title: "Conversão para String: String() e .toString()",
        subtitle: "Formatação · Serializando valores e diferenças para null e undefined",
        theory: "A conversão para texto pode ser feita pela função global String(v) ou pelo método .toString(). A função String(v) é mais segura pois aceita null e undefined sem falhas, produzindo \"null\" e \"undefined\". O método .toString() existe em números, booleanos e objetos, mas dispara TypeError se invocado em nulos.",
        questions: [
          q("O que acontece se executarmos valor.toString() quando valor for null ou undefined?", "Dispara um erro em tempo de execução: TypeError: Cannot read properties of null/undefined", ["Retorna a string \"null\"","Retorna string vazia \"\""], "Como null e undefined não possuem protótipo nem métodos de objeto, a chamada direta falha."),
          q("Qual é a vantagem da função global String(valor) sobre valor.toString()?", "A função String() é universal e segura, aceitando qualquer valor incluindo null e undefined sem erros", ["String() roda mais rápido no navegador","String() só aceita números"], "String(null) produz a string segura \"null\", tornando-a a escolha ideal para dados imprevisíveis."),
          q("Como o método .toString(radix) pode ser usado em números para conversão de base?", "Passando a base numérica como argumento (ex: (255).toString(16) retorna \"ff\" em hexadecimal)", ["Para escolher a cor do número","Para definir o número de casas decimais"], "Suporta bases de 2 (binário) até 36, facilitando conversões numéricas avançadas."),
          q("Qual é o resultado de String([1, 2, 3]) em JavaScript?", "\"1,2,3\"", ["\"[1, 2, 3]\"","\"array\""], "A conversão padrão de arrays para string delega para seu método join(\",\") interno."),
          t("Qual base numérica é passada em (10).toString(2) para converter um inteiro em representação binária?", ["2"], "A base 2 emite a representação binária (ex: \"1010\").", "# conversao para string binaria"),
          g("Complete a conversão universal segura do valor para string:", ["const texto = String(dadoBruto);"], "String() protege o código contra quebras por valores nulos.", "const texto = ____(dadoBruto);"),
          o("Ordene as abordagens de conversão para string pela segurança contra valores nulos:", ["String(valor): totalmente imune a erros sob qualquer entrada","Template literal `${valor}`: imune a erros sob nulos (produz \"null\" ou \"undefined\")","valor + \"\": coerção implícita por concatenação imune a erros","valor.toString(): perigoso, falha com TypeError se o valor for null ou undefined"], "Hierarquia de segurança e tolerância a falhas na conversão para texto."),
          p("Associe a entrada à sua saída produzida por String():", [["String(123)","\"123\""],["String(true)","\"true\""],["String(null)","\"null\""],["String(undefined)","\"undefined\""]], "Resultados determinísticos da função construtora global String.")
        ]
      },
      {
        id: "js-c03-u6-l3",
        title: "Conversão para Número: Number() e o unário +",
        subtitle: "Cálculos · Convertedores numéricos e regras com booleanos e strings",
        theory: "A conversão para número converte strings, booleanos e outros tipos. Number(true) retorna 1, Number(false) retorna 0, Number(null) retorna 0 e Number(undefined) retorna NaN. O operador unário + (ex: +\"42\") é um atalho idiomático conciso que executa exatamente a mesma conversão de Number().",
        questions: [
          q("Qual é o resultado de Number(true) e Number(false)?", "1 e 0 respectivamente", ["true e false","NaN e NaN"], "O padrão de coerção mapeia o booleano verdadeiro para 1 e o falso para 0."),
          q("Qual é a diferença de conversão numérica entre null e undefined (Number(null) vs Number(undefined))?", "Number(null) converte para 0; Number(undefined) converte para NaN", ["Ambos convertem para 0","Ambos convertem para NaN"], "Uma das pegadinhas clássicas da linguagem: null vira 0 em matemática, mas undefined vira NaN."),
          q("Como funciona o operador unário de adição (+valor)?", "Realiza coerção numérica estrita do operando, funcionando como atalho equivalente a Number(valor)", ["Soma 1 à variável","Inverte o sinal do número"], "+texto converte uma string numérica em número com brevidade sintática."),
          q("Qual é o resultado de Number(\"\") (conversão de string vazia)?", "0", ["NaN","null"], "Strings vazias ou compostas apenas por espaços em branco são convertidas para zero pelo Number()."),
          t("Qual operador unário de um único caractere converte uma string em número de forma concisa?", ["+"], "Exemplo: +\"42\" resulta no número 42.", "# operador unario de coercao numerica"),
          g("Complete a conversão concisa do texto numérico usando o operador unário:", ["const valor = +\"150\";"], "O unário + converte a string para o número 150.", "const valor = ____\"150\";"),
          o("Ordene os resultados de conversão numérica das entradas especificadas:", ["Number(\"10\"): produz o número inteiro 10","Number(true): produz o número 1","Number(null): produz o número 0","Number(undefined): produz o valor numérico especial NaN"], "Tabela comparativa de resultados da conversão numérica com Number()."),
          p("Associe o valor de entrada ao número produzido por Number():", [["Number(\"42\")","42"],["Number(\"\")","0 (string vazia converte para zero)"],["Number(null)","0 (null converte para zero)"],["Number(\"abc\")","NaN (falha na conversão de texto não numérico)"]], "Comportamento da função global Number em diferentes entradas primitivas.")
        ]
      },
      {
        id: "js-c03-u6-l4",
        title: "Sobrecarga do operador +: concatenação vs soma",
        subtitle: "Aritmética · Quando números e strings colidem em expressões de adição",
        theory: "O operador binário + possui sobrecarga em JavaScript: realiza adição se ambos os operandos forem numéricos, mas realiza concatenação de texto se pelo menos um dos operandos for string. Operadores como -, * e / não possuem sobrecarga textual e sempre forçam coerção numérica.",
        questions: [
          q("Qual é o resultado da expressão: 1 + \"2\"?", "\"12\" (uma string)", ["3","NaN"], "A presença da string \"2\" aciona a sobrecarga de concatenação textual do operador +."),
          q("Qual é o resultado da expressão: 1 + 2 + \"3\"?", "\"33\" (pois 1 + 2 é avaliado primeiro para o número 3, que concatena com \"3\")", ["\"123\"","6"], "A avaliação ocorre sequencialmente da esquerda para a direita: primeiro a soma numérica, depois a concatenação."),
          q("Qual é o resultado da expressão: \"1\" + 2 + 3?", "\"123\" (pois \"1\" + 2 vira a string \"12\", que então concatena com 3)", ["\"15\"","6"], "O primeiro operando string contamina o restante da cadeia de adições."),
          q("Qual é o resultado de \"10\" - 5?", "5 (o número 5)", ["\"5\"","\"10 - 5\""], "O operador de subtração não possui sobrecarga de texto e força a conversão de \"10\" para número."),
          t("Qual operador aritmético básico é o único que possui sobrecarga para concatenação de strings?", ["+"], "O operador + atua tanto em números quanto em textos.", "# operador de adicao e concatenacao"),
          g("Complete o parêntese para garantir que a soma numérica ocorra antes da concatenação:", ["const mensagem = \"Total: \" + (preco + frete);"], "Os parênteses priorizam a operação aritmética sobre a concatenação.", "const mensagem = \"Total: \" + ____preco + frete);"),
          o("Ordene a resolução passo a passo da expressão (10 + 20 + \"px\"):", ["Avaliar o primeiro par da esquerda (10 + 20): ambos são números, resultando no número 30","Avaliar o próximo operador com o operando textual (\"px\")","Operador + identifica a string e aciona a coerção de 30 para \"30\"","Concatenação final produz a string \"30px\""], "Mecanismo de avaliação e contaminação de tipos na sobrecarga do operador +."),
          p("Associe a expressão mista ao seu resultado formal:", [["10 + \"5\"","\"105\" (concatenação)"],["10 - \"5\"","5 (subtração numérica com coerção)"],["10 * \"5\"","50 (multiplicação numérica com coerção)"],["true + 1","2 (true é coagido para 1 antes da soma)"]], "Resultados práticos de expressões com colisão de tipos aritméticos.")
        ]
      },
      {
        id: "js-c03-u6-l5",
        title: "Algoritmo ToPrimitive e coerção de objetos",
        subtitle: "Aprofundamento · Symbol.toPrimitive, valueOf e toString em objetos",
        theory: "Quando um objeto é coagido para um tipo primitivo, o motor JavaScript executa o algoritmo interno ToPrimitive. Ele consulta primeiro o método [Symbol.toPrimitive](hint). Se ausente, o motor tenta valueOf() e depois toString() (ou a ordem inversa dependendo da preferência por \"number\" ou \"string\").",
        questions: [
          q("Qual símbolo especial da linguagem permite customizar integralmente a conversão de um objeto para primitivo?", "Symbol.toPrimitive", ["Symbol.iterator","Symbol.cast"], "[Symbol.toPrimitive](hint) recebe o hint (\"number\", \"string\" ou \"default\") e define o retorno."),
          q("Quais métodos tradicionais o JavaScript consulta caso Symbol.toPrimitive não esteja implementado?", "valueOf() e toString()", ["toPrimitive() e get()","parse() e serialize()"], "Para hint numérico, tenta valueOf() primeiro; para hint textual, tenta toString() primeiro."),
          q("Qual é o retorno padrão de [].toString() (array vazio para string)?", "\"\" (string vazia)", ["\"[]\"","\"Array\""], "Um array vazio vira string vazia, o que explica por que [] + 1 resulta em \"1\"."),
          q("Qual é o retorno padrão de ({}).toString() para um objeto comum em JavaScript?", "\"[object Object]\"", ["\"{}\"","\"\""], "A representação textual padrão de objetos brutos é o marcador institucional \"[object Object]\"."),
          t("Qual método clássico de objeto é chamado para obter sua representação primitiva numérica?", ["valueOf"], "obj.valueOf() é a primeira tentativa para coerções numéricas.", "# metodo de valor primitivo de objeto"),
          g("Complete a implementação do método de conversão personalizada com Symbol.toPrimitive:", ["class Moeda {\n    [Symbol.toPrimitive](hint) {\n        return this.centavos;\n    }\n}"], "Permite ao objeto comportar-se como primitivo em operações matemáticas.", "class Moeda {\n    [____](hint) {\n        return this.centavos;\n    }\n}"),
          o("Ordene a busca do algoritmo ToPrimitive ao converter um objeto para número (hint: \"number\"):", ["Verificar se o objeto possui o método [Symbol.toPrimitive]","Se existir, invocar [Symbol.toPrimitive](\"number\") e usar o resultado se for primitivo","Se não existir, tentar o método objeto.valueOf() e checar se retornou primitivo","Se valueOf não retornar primitivo, tentar objeto.toString() como último recurso"], "Sequência formal do algoritmo abstrato ToPrimitive da especificação ECMAScript."),
          p("Associe a operação com objeto ao seu comportamento padrão ToPrimitive:", [["[] + []","\"\" (duas strings vazias concatenadas)"],["[] + {}","\"[object Object]\" (string vazia mais objeto serializado)"],["{} + []","0 ou \"[object Object]\" dependendo se {} for interpretado como bloco"],["[1, 2] + 3","\"1,23\" (array vira \"1,2\" e concatena com 3)"]], "Exemplos clássicos de coerção de objetos e arrays via ToPrimitive.")
        ]
      }
    ],
    7: [
      {
        id: "js-c03-u7-l1",
        title: "Igualdade estrita (===) vs igualdade frouxa (==)",
        subtitle: "Boas práticas · Por que você deve sempre preferir === em código moderno",
        theory: "O operador de igualdade estrita (===) compara valor e tipo sem nenhuma coerção de tipos. O operador de igualdade frouxa (==) tenta converter operandos de tipos diferentes por um algoritmo complexo e imprevisível antes da comparação (ex: 0 == \"\" é true). O uso exclusivo de === é o padrão moderno.",
        questions: [
          q("Qual é a diferença fundamental entre === e == em JavaScript?", "=== compara valor e tipo sem coerção; == realiza coerção implícita de tipos antes de comparar", ["=== só funciona com números","== é mais rápido"], "=== garante previsibilidade matemática eliminando conversões automáticas indesejadas."),
          q("Qual é o resultado da comparação frouxa: 0 == \"\"?", "true (pois a string vazia \"\" é coagida para o número 0 antes da comparação)", ["false","TypeError"], "Exemplo clássico de falha de segurança que o operador estrito === impede (0 === \"\" é false)."),
          q("Qual é o resultado da comparação frouxa: false == \"0\"?", "true (ambos são coagidos para o número 0)", ["false","NaN"], "Mostra como a igualdade frouxa gera igualdades absurdas violando a transitividade lógica."),
          q("Em qual único caso muitos desenvolvedores toleram o uso de == em código existente?", "valor == null (pois compara simultaneamente se o valor é null ou undefined)", ["Nunca, em hipótese alguma","Para comparar arrays"], "Embora útil como atalho histórico, o operador ?? e testes estritos explícitos são hoje preferidos."),
          t("Qual operador de três caracteres verifica igualdade estrita de tipo e valor?", ["==="], "=== é a regra de ouro de comparação no JavaScript moderno.", "# igualdade estrita sem coercao"),
          g("Complete a validação exigindo igualdade estrita de tipo e valor:", ["if (resposta === 42) {\n    concederPremio();\n}"], "=== impede que a string \"42\" seja aceita no lugar do número 42.", "if (resposta ____ 42) {\n    concederPremio();\n}"),
          o("Ordene as avaliações de igualdade da mais segura e estrita para a mais permissiva:", ["Object.is(a, b): diferencia até mesmo NaN e sinais de zero (-0 vs +0)","a === b: compara tipo e valor sem nenhuma conversão implícita","a == b: aplica tabela complexa de coerções automáticas antes de comparar","atribuição acidental a = b: sobrescreve a variável em vez de comparar"], "Escala de rigor comparativo de igualdade em JavaScript."),
          p("Associe a comparação ao seu resultado booleano:", [["\"5\" === 5","false (tipos diferentes: string vs number)"],["\"5\" == 5","true (string \"5\" coagida para número 5)"],["null === undefined","false (tipos diferentes)"],["null == undefined","true (regra especial da especificação ECMAScript)"]], "Comparativo de igualdade estrita versus frouxa em JavaScript.")
        ]
      },
      {
        id: "js-c03-u7-l2",
        title: "Desigualdade estrita (!==) e armadilhas do !=",
        subtitle: "Validação · Comparando tipos e valores sem coerções silenciosas",
        theory: "O operador de desigualdade estrita (!==) verifica se dois operandos diferem em valor ou em tipo primitivo sem efetuar coerção. O operador frouxo != aplica regras de coerção que produzem falsos negativos perigosos, como \"0\" != 0 avaliando para false. Recomenda-se utilizar sempre !== em asserções.",
        questions: [
          q("Por que você deve sempre preferir !== no lugar de != em suas condicionais?", "!== não realiza coerção de tipos, evitando que dados de tipos distintos sejam considerados iguais", ["!= foi removido dos navegadores","!== executa na metade do tempo"], "Garante que uma string \"1\" seja considerada legitimamente diferente do número 1."),
          q("Qual é o resultado da expressão \"1\" !== 1?", "true (pois os tipos string e number são diferentes, logo são estritamente desiguais)", ["false","TypeError"], "!== retorna true se os valores OU os tipos forem divergentes."),
          q("Qual é o resultado da expressão \"0\" != 0 (desigualdade frouxa)?", "false (pois a coerção considera que são \"iguais\", logo a desigualdade é falsa)", ["true","NaN"], "Armadilha clássica que pode validar formulários incorretamente caso != seja utilizado."),
          q("Qual é o resultado de null !== undefined?", "true (pois pertencem a tipos primitivos diferentes)", ["false","null"], "null e undefined são estritamente diferentes sob o operador !==."),
          t("Qual operador de três caracteres verifica desigualdade estrita em JavaScript?", ["!=="], "!== avalia se operandos diferem em valor ou em tipo.", "# operador de desigualdade estrita"),
          g("Complete a condicional que exige que o status seja estritamente diferente de \"pendente\":", ["if (pedido.status !== \"pendente\") {\n    enviarNotificacao();\n}"], "!== previne coerções ao validar estados de negócio.", "if (pedido.status ____ \"pendente\") {\n    enviarNotificacao();\n}"),
          o("Ordene as avaliações de desigualdade passo a passo para a expressão (valor !== 10):", ["Verificar o tipo do operando da esquerda (valor)","Se o tipo for diferente de number: concluir imediatamente que são desiguais (true)","Se o tipo for number: comparar os valores numéricos","Se os números forem iguais: retornar false; caso contrário: retornar true"], "Fluxo formal de avaliação do operador de desigualdade estrita (!==)."),
          p("Associe a comparação de desigualdade ao seu valor booleano:", [["true !== 1","true (tipos diferentes: boolean vs number)"],["true != 1","false (true é coagido para 1)"],["0 !== false","true (number vs boolean)"],["0 != false","false (0 e false são considerados equivalentes por coerção)"]], "Impacto da coerção na desigualdade estrita versus frouxa.")
        ]
      },
      {
        id: "js-c03-u7-l3",
        title: "Comparações relacionais: >, <, >=, <=",
        subtitle: "Ordem · Ordem lexicográfica em strings e coerções numéricas",
        theory: "Os operadores relacionais (>, <, >=, <=) comparam a grandeza relativa de operandos. Quando ambos são números, aplicam a aritmética padrão. Quando ambos são strings, aplicam ordem lexicográfica Unicode (\"b\" > \"a\", mas \"10\" < \"2\"). Se os tipos forem mistos, o JavaScript coagirá os operandos para Number.",
        questions: [
          q("Por que a comparação entre strings \"10\" < \"2\" avalia para true em JavaScript?", "Ambos são strings, logo a comparação é lexicográfica (alfabética), e o caractere \"1\" vem antes de \"2\"", ["Porque 10 é menor que 2 na física quântica","Porque o operador inverteu a ordem"], "Comparar strings que representam números sem convertê-las para Number gera graves falhas de ordenação."),
          q("O que acontece ao comparar número com string usando operador relacional (ex: 10 > \"2\")?", "A string \"2\" é convertida implicitamente para o número 2, avaliando 10 > 2 para true", ["Lança TypeError imediato","Ambos viram strings"], "Quando há um número e uma string, a especificação força a conversão do texto para Number."),
          q("Qual é o resultado de qualquer comparação relacional com NaN (ex: NaN > 5 ou NaN <= 5)?", "Retorna false para qualquer operador relacional comparado com NaN", ["Lança erro de sintaxe","Retorna true"], "NaN nunca é maior, menor nem igual a nenhum outro número, nem a si mesmo."),
          q("Qual é a recomendação estrita ao comparar valores numéricos recebidos de inputs HTML?", "Converter explicitamente as strings para Number() antes de aplicar operadores relacionais", ["Usar operadores de texto","Deixar a coerção agir sozinha"], "Previne que o input \"100\" seja considerado menor que o input \"20\" devido à ordem alfabética."),
          t("Qual operador verifica se o operando da esquerda é maior ou igual ao da direita?", [">="], "Sintaxe: a >= b.", "# maior ou igual relacional"),
          g("Complete a conversão explícita para comparar grandezas numéricas com segurança:", ["if (Number(idade) >= 18) {\n    liberarAcesso();\n}"], "Number() protege contra armadilhas da ordem alfabética de strings.", "if (____(idade) >= 18) {\n    liberarAcesso();\n}"),
          o("Ordene as strings pela ordem lexicográfica natural do Unicode:", ["\"10\": primeiro caractere é \"1\" (código ASCII 49)","\"2\": primeiro caractere é \"2\" (código ASCII 50)","\"A\": caractere maiúsculo (código ASCII 65)","\"a\": caractere minúsculo (código ASCII 97)"], "Ordem lexicográfica de códigos na tabela de caracteres Unicode."),
          p("Associe a comparação relacional ao seu resultado booleano:", [["\"apple\" < \"banana\"","true (ordem alfabética)"],["\"12\" < \"9\"","true (ordem lexicográfica: \"1\" vem antes de \"9\")"],["12 < \"9\"","false (coerção numérica: 12 não é menor que 9)"],["NaN >= 0","false (comparações com NaN resultam sempre em false)"]], "Armadilhas e comportamentos dos operadores relacionais em JavaScript.")
        ]
      },
      {
        id: "js-c03-u7-l4",
        title: "Comparação de objetos e referências de memória",
        subtitle: "Identidade · Por que {} === {} avalia para false",
        theory: "Em JavaScript, variáveis que guardam objetos, arrays ou funções armazenam apenas referências para posições de memória heap. Comparações com === avaliam a identidade do endereço de memória, e não o conteúdo estrutural. Dois objetos com propriedades idênticas ({a: 1} === {a: 1}) resultam em false.",
        questions: [
          q("Por que a expressão {} === {} resulta em false?", "Cada literal de objeto {} aloca uma nova posição de memória distinta no heap, e === compara referências", ["Porque objetos vazios são falsy","Porque faltam propriedades"], "O operador de igualdade compara ponteiros de memória, não igualdade estrutural profunda."),
          q("Quando a comparação objA === objB avalia para true?", "Apenas quando ambas as variáveis apontam estritamente para a mesmíssima instância no heap", ["Quando possuem os mesmos nomes de chaves","Quando foram criados no mesmo arquivo"], "Identidade de referência: a atribuição const b = a faz b === a ser estritamente true."),
          q("Como verificar se dois objetos possuem o mesmo conteúdo estrutural profundo (deep equality)?", "Comparando chaves e valores recursivamente ou utilizando bibliotecas consolidadas como lodash.isEqual", ["Usando objA == objB","Convertendo com parseInt"], "Igualdade estrutural exige iterar recursivamente sobre todas as propriedades e tipos internos."),
          q("Qual é o resultado de [] === [] (comparação entre dois arrays vazios literais)?", "false (são duas instâncias distintas alocadas em endereços separados na memória)", ["true","TypeError"], "Assim como objetos, cada colchete cria uma nova referência de array independente."),
          t("Qual tipo de memória do motor JavaScript armazena objetos e arrays apontados por referências?", ["heap"], "A memória heap abriga estruturas de dados complexas e dinâmicas.", "# memoria heap de objetos"),
          g("Complete a criação de um clone superficial de objeto usando spread operator:", ["const clone = { ...original };"], "O spread cria um novo objeto superficial preservando o original.", "const clone = { ____original };"),
          o("Ordene as etapas de uma atribuição por referência em JavaScript:", ["Criar o objeto literal original: const usuarioA = { nome: \"Ana\" }","Atribuir a referência para uma nova variável: const usuarioB = usuarioA","Ambas as variáveis passam a apontar para o mesmíssimo objeto na memória","A mutação usuarioB.nome = \"Bia\" altera o valor visível em usuarioA"], "Dinâmica de referências compartilhadas e efeitos colaterais de mutação."),
          p("Associe a operação com referências ao seu comportamento:", [["const b = a; a === b","true (mesma referência de memória)"],["[1] === [1]","false (duas referências diferentes com mesmo conteúdo)"],["const clone = { ...obj }","Novo endereço de memória com cópia das propriedades de primeiro nível"],["structuredClone(obj)","Cópia profunda (deep clone) com novas referências recursivas"]], "Gerenciamento de referências e clones de objetos em JavaScript.")
        ]
      },
      {
        id: "js-c03-u7-l5",
        title: "Object.is(): comparando NaN e -0 com precisão",
        subtitle: "Algoritmo SameValue · Casos onde === não é suficiente",
        theory: "O método utilitário Object.is(a, b) implementa o algoritmo SameValue da especificação ECMAScript. Ele se comporta como o operador === na quase totalidade dos casos, exceto em duas peculiaridades: considera que NaN é igual a NaN (Object.is(NaN, NaN) é true) e que +0 e -0 são números distintos.",
        questions: [
          q("Qual é a diferença entre Object.is(NaN, NaN) e NaN === NaN?", "Object.is(NaN, NaN) retorna true; NaN === NaN retorna false", ["Ambos retornam false","Ambos retornam true"], "Object.is trata a identidade real de NaN sem a regra histórica de desigualdade do IEEE 754."),
          q("Como Object.is lida com os sinais numéricos de zero (+0 e -0)?", "Diferencia os dois: Object.is(+0, -0) retorna false, enquanto +0 === -0 retorna true", ["Considera ambos infinitos","Lança um RangeError"], "Permite diferenciar zeros com sinais matemáticos distintos provenientes de limites assintóticos."),
          q("Qual algoritmo da especificação ECMAScript o método Object.is implementa?", "Algoritmo SameValue", ["Algoritmo LooseEquality","Algoritmo BigIntCast"], "SameValue é a forma mais estrita de comparação de identidade da linguagem."),
          q("Em frameworks reativos como React, qual método é utilizado internamente para comparar props e states?", "Object.is (para detectar mudanças em estados sem cair no bug do NaN)", ["O operador == frouxo","JSON.stringify"], "Garante que atualizar um estado para NaN dispare re-renderização consistente."),
          t("Qual método estático da classe Object implementa o algoritmo SameValue de comparação?", ["Object.is"], "Object.is(a, b) compara com precisão absoluta de identidade.", "# comparador de identidade SameValue"),
          g("Complete a verificação precisa de igualdade usando Object.is:", ["const saoIdenticos = Object.is(valorA, valorB);"], "Object.is detecta identidade SameValue confiavelmente.", "const saoIdenticos = ____(valorA, valorB);"),
          o("Ordene as avaliações com Object.is pelo valor booleano resultante:", ["Object.is(42, 42): retorna true","Object.is(NaN, NaN): retorna true (diferença em relação a ===)","Object.is(+0, -0): retorna false (diferença em relação a ===)","Object.is({}, {}): retorna false (referências distintas de memória)"], "Tabela comparativa do comportamento estrito de Object.is()."),
          p("Associe a comparação ao resultado produzido por Object.is:", [["Object.is(NaN, NaN)","Retorna true por considerar NaNs idênticos"],["Object.is(+0, -0)","Retorna false por diferenciar sinais de zero"],["Object.is(\"teste\", \"teste\")","Retorna true por igualdade de tipo e conteúdo"],["Object.is(null, undefined)","Retorna false por tipos primitivos distintos"]], "Casos específicos do algoritmo SameValue fornecido por Object.is.")
        ]
      }
    ],
    8: [
      {
        id: "js-c03-u8-l1",
        title: "Precedência e associatividade de operadores",
        subtitle: "Expressões · Como parênteses desempatam a ordem de avaliação",
        theory: "A precedência determina quais operadores são avaliados primeiro em expressões complexas (multiplicação e divisão têm precedência superior à adição). A associatividade define a ordem de desempate para operadores de mesma precedência: a maioria avalia da esquerda para a direita, exceto a exponenciação e atribuição.",
        questions: [
          q("Qual é o resultado da expressão matemática: 2 + 3 * 4 em JavaScript?", "14 (a multiplicação 3 * 4 é avaliada antes da adição 2 + 12)", ["20","24"], "A precedência de operadores matemáticos respeita a aritmética clássica universal."),
          q("Qual é a associatividade do operador de exponenciação (**) em 2 ** 3 ** 2?", "Da direita para a esquerda (right-to-left): avalia 3 ** 2 = 9 primeiro, e então 2 ** 9 = 512", ["Da esquerda para a direita","Aleatória"], "A exponenciação e operadores de atribuição resolvem expressões partindo da direita."),
          q("Como forçar o interpretador a avaliar uma subexpressão com prioridade máxima?", "Envolvendo a subexpressão entre parênteses () (ex: (2 + 3) * 4 resulta em 20)", ["Usando colchetes []","Colocando espaços duplos"], "Parênteses possuem o nível mais elevado de precedência em toda a gramática do JavaScript."),
          q("Por que é recomendável usar parênteses mesmo quando a precedência padrão já faria o cálculo correto?", "Melhora a legibilidade humana do código e remove ambiguidades cognitivas para revisores", ["Porque o código executa mais rápido","Porque evita estouro de memória"], "Código explícito reduz tempo de revisão e evita erros por memorização falha de tabelas de precedência."),
          t("Qual símbolo de pontuação deve ser utilizado para agrupar e forçar a prioridade de avaliação?", ["()"], "Parênteses desempatam qualquer expressão com clareza.", "# delimitador de prioridade de expressao"),
          g("Complete o agrupamento para garantir que a soma execute antes da multiplicação:", ["const total = (base + taxa) * fator;"], "Os parênteses priorizam base + taxa antes de multiplicar por fator.", "const total = ____base + taxa) * fator;"),
          o("Ordene os operadores do maior nível de precedência para o menor:", ["Parênteses de agrupamento: ()","Multiplicação e divisão: * e /","Adição e subtração: + e -","Atribuição de variáveis: ="], "Hierarquia básica de precedência de operadores em JavaScript."),
          p("Associe a expressão ao seu resultado formal avaliado:", [["10 + 5 * 2","20 (multiplica primeiro)"],["(10 + 5) * 2","30 (parênteses primeiro)"],["2 ** 2 ** 3","256 (2 ** 8 da direita para a esquerda)"],["100 - 50 - 10","40 (subtração avaliada da esquerda para a direita)"]], "Efeito prático de precedência e associatividade em cálculos aritméticos.")
        ]
      },
      {
        id: "js-c03-u8-l2",
        title: "Operadores de atribuição composta (+=, -=, ??=)",
        subtitle: "Atalhos · Atualizando variáveis com atribuição lógica moderna",
        theory: "Operadores de atribuição composta combinam uma operação e uma atribuição (x += 5 equivale a x = x + 5). O ES2021 introduziu operadores lógicos de atribuição: ??= (atribui apenas se o valor for nullish), ||= (atribui se for falsy) e &&= (atribui se for truthy), simplificando a inicialização de estados.",
        questions: [
          q("A qual expressão completa o comando contador += 1 equivale?", "contador = contador + 1", ["contador + 1","contador == 1"], "O operador de atribuição composta combina a soma e a escrita no mesmo identificador."),
          q("O que o operador de atribuição de coalescência nula (x ??= padrao) faz?", "Atribui o valor de padrao a x apenas se x for estritamente null ou undefined", ["Atribui sempre","Apaga o valor de x"], "Se x já possuir um valor válido (como 0 ou \"ativo\"), a atribuição é ignorada."),
          q("Qual é o resultado de let config = { porta: 0 }; config.porta ??= 8080;?", "config.porta continua sendo 0 (pois 0 não é nullish)", ["config.porta vira 8080","Lança SyntaxError"], "Diferente de ||=, o operador ??= respeita valores numéricos zero como dados legítimos."),
          q("O que o operador lógico x ||= fallback faz se x for falsy?", "Atribui fallback à variável x", ["Mantém o valor anterior","Transforma x em booleano"], "Atribuição condicional sob falsidade lógica."),
          t("Qual operador de três caracteres atribui um valor à variável apenas se ela for null ou undefined?", ["??="], "Sintaxe: x ??= fallback.", "# atribuicao de coalescencia nula"),
          g("Complete a inicialização segura da lista com coalescência lógica:", ["usuario.preferencias ??= {};"], "??= instancia o objeto apenas se preferencias for nulo ou indefinido.", "usuario.preferencias ____ {};"),
          o("Ordene as operações de atribuição composta com base na entrada (let total = 10):", ["Estado inicial: total = 10","Executar total += 5: total passa a valer 15","Executar total *= 2: total passa a valer 30","Executar total ??= 100: total mantém 30 (pois não é nullish)"], "Sequência de mutações de estado aplicando operadores de atribuição compostos."),
          p("Associe o operador de atribuição lógica ao seu comportamento:", [["x ??= v","Atribui v a x apenas se x for null ou undefined"],["x ||= v","Atribui v a x apenas se x for falsy"],["x &&= v","Atribui v a x apenas se x for truthy"],["x += v","Soma v ao valor corrente de x e atualiza x"]], "Operadores modernos de atribuição aritmética e lógica em JavaScript.")
        ]
      },
      {
        id: "js-c03-u8-l3",
        title: "Operador vírgula e expressões com efeitos colaterais",
        subtitle: "Sintaxe · Avaliação sequencial descartando resultados intermediários",
        theory: "O operador vírgula (,) avalia múltiplos operandos sequencialmente da esquerda para a direita e retorna exclusivamente o valor do último operando. Embora raramente recomendado em linhas comuns devido à perda de legibilidade, é comumente utilizado em cabeçalhos de laços for com múltiplos contadores.",
        questions: [
          q("O que o operador vírgula faz ao avaliar a expressão (a = 1, b = 2, a + b)?", "Executa cada atribuição sequencialmente e retorna exclusivamente o valor da última expressão (3)", ["Retorna um array com todos os valores","Lança SyntaxError"], "A vírgula conecta expressões em série descartando todos os retornos, exceto o último."),
          q("Onde o uso do operador vírgula é idiomático e aceito na comunidade?", "Na inicialização e no passo de laços for (ex: for (let i = 0, j = 10; i < j; i++, j--))", ["Em todas as funções do projeto","Na definição de variáveis const"], "Permite avançar múltiplos contadores coordenados no mesmo incremento de laço."),
          q("Por que o uso arbitrário do operador vírgula em linhas comuns de código é desaconselhado?", "Dificulta a leitura, confunde revisores e oculta efeitos colaterais indesejados", ["Porque o compilador desativa as otimizações","Porque consome o dobro de memória"], "A divisão de expressões em linhas separadas e explícitas é sempre a melhor escolha."),
          q("Qual é o retorno da expressão: const x = (5, 10, 15)?", "15", ["5","10"], "O último operando avaliado (15) é atribuído à constante x."),
          t("Qual símbolo de pontuação separa expressões sequenciais descartando resultados intermediários?", [","], "O operador vírgula conecta expressões avaliando para o último operando.", "# operador virgula de avaliacao sequencial"),
          g("Complete o incremento duplo no laço for usando o operador vírgula:", ["for (let i = 0, j = 10; i < 5; i++, j--) {\n    console.log(i, j);\n}"], "A vírgula permite atualizar dois contadores em conjunto no passo do laço.", "for (let i = 0, j = 10; i < 5; i++____ j--) {\n    console.log(i, j);\n}"),
          o("Ordene as etapas de resolução da expressão encadeada (x = 10, y = 20, x * y):", ["Avaliar o primeiro operando da esquerda: x = 10 (atribuição executada)","Avaliar o segundo operando: y = 20 (atribuição executada)","Avaliar o terceiro e último operando: 10 * 20 resultando em 200","Retornar o número 200 como valor final da expressão agrupada"], "Fluxo cronológico de avaliação com o operador vírgula."),
          p("Associe a construção ao papel do caractere vírgula (,):", [["(x++, y++)","Operador vírgula: avalia ambos e devolve o valor do último"],["[1, 2, 3]","Separador de elementos em um literal de array"],["{ a: 1, b: 2 }","Separador de pares chave-valor em literal de objeto"],["funcao(arg1, arg2)","Separador de argumentos na invocação de função"]], "Distinção entre o operador vírgula e a vírgula como separador sintático.")
        ]
      },
      {
        id: "js-c03-u8-l4",
        title: "Desestruturação básica de arrays e objetos",
        subtitle: "Desempacotamento · Extraindo variáveis de estruturas de dados",
        theory: "A sintaxe de desestruturação (destructuring) permite desempacotar valores de arrays ou propriedades de objetos diretamente em variáveis nomeadas. Suporta valores padrão (ex: const { nome = \"Anônimo\" } = obj) e renomeação de variáveis ({ id: usuarioId }), tornando a extração de dados concisa e expressiva.",
        questions: [
          q("Como extrair as propriedades nome e idade de um objeto usuario em variáveis locais?", "const { nome, idade } = usuario;", ["const [nome, idade] = usuario;","const { nome: idade } = usuario;"], "A desestruturação de objeto utiliza chaves correspondentes aos nomes das propriedades do alvo."),
          q("Como definir um valor padrão caso a propriedade desestruturada seja undefined?", "const { tema = \"escuro\" } = config;", ["const { tema || \"escuro\" } = config;","const { tema ?? \"escuro\" } = config;"], "O sinal de igual após o nome da propriedade estabelece o valor padrão caso a chave esteja ausente."),
          q("Como renomear uma propriedade durante a desestruturação (ex: extrair id como userId)?", "const { id: userId } = usuario;", ["const { id as userId } = usuario;","const { userId = id } = usuario;"], "A sintaxe chaveOriginal: novoNome reatribui a chave interna para uma nova variável local."),
          q("Como extrair o primeiro e o segundo elementos de um array de coordenadas [10, 20]?", "const [x, y] = coordenadas;", ["const { x, y } = coordenadas;","const (x, y) = coordenadas;"], "A desestruturação de array utiliza colchetes e mapeia variáveis pela ordem de suas posições."),
          t("Qual símbolo de pontuação delimita a desestruturação de propriedades de objetos?", ["{}"], "Chaves desestruturam objetos: const { x } = ponto.", "# delimitador de desestruturacao de objetos"),
          g("Complete a extração posicional dos dois primeiros elementos do array:", ["const [primeiro, segundo] = lista;"], "Colchetes desestruturam elementos sequenciais de arrays.", "const [primeiro, ____] = lista; // extrai o segundo elemento"),
          o("Ordene as etapas de uma operação de desestruturação com renomeação e valor padrão:", ["Localizar o objeto fonte de dados a ser desempacotado","Identificar a chave original no padrão { chaveOriginal: novaVariavel = padrao }","Se o valor da chave for undefined: atribuir a constante de fallback","Criar a nova variável local no escopo com o valor final resolvido"], "Algoritmo de resolução de propriedades desestruturadas com fallback."),
          p("Associe o padrão de desestruturação à sua ação correspondente:", [["const { a, b } = obj","Extrai as chaves a e b com seus nomes originais"],["const { a: x } = obj","Extrai a chave a renomeando a variável local para x"],["const { a = 10 } = obj","Extrai a chave a com valor padrão 10 se undefined"],["const [primeiro, ...resto] = arr","Extrai o primeiro item e agrupa o restante no array resto"]], "Padrões fundamentais de desestruturação em JavaScript.")
        ]
      },
      {
        id: "js-c03-u8-l5",
        title: "Projeto integrado: validador e normalizador de payloads",
        subtitle: "Síntese prática · Combinando tipos, operadores, coerções e checagens",
        theory: "Neste projeto prático, construímos uma função profissional para validar e normalizar payloads de entrada recebidos em formato JSON. Aplicamos desestruturação com valores padrão, conferimos tipos primitivos, sanitizamos strings com .trim(), prevenimos nulos com ?? e retornamos um objeto de dados estritamente tipado.",
        questions: [
          q("Qual é o primeiro passo recomendado ao receber um payload externo não confiável em uma API?", "Desestruturar os campos com valores padrão seguros e sanitizar strings removendo espaços", ["Salvar o dado diretamente no banco sem verificar","Desligar as validações para acelerar"], "Garante que os campos obrigatórios estejam presentes e que espaços redundantes não corrompam registros."),
          q("Por que validar typeof campo === \"number\" e Number.isFinite(campo) em campos numéricos?", "Para garantir que o dado seja um número real e impedir a passagem acidental de NaN ou Infinity", ["Porque o JavaScript não permite números pares","Para transformar o número em string"], "Protege o sistema contra transações financeiras e cálculos quebrados com valores matemáticos especiais."),
          q("Como tratar um campo booleano opcional que pode vir como string \"true\", booleano ou ausente?", "Comparar com valor === true || valor === \"true\" e atribuir um booleano estrito definitivo", ["Usar eval()","Ignorar o campo"], "A normalização transforma entradas heterogêneas em um tipo consistente na borda da aplicação."),
          q("Qual benefício arquitetural uma camada de normalização de dados traz para o sistema?", "Isola regras de negócio internas de anomalias e variações dos formatos de clientes e integrações", ["Aumenta o tamanho do pacote transferido","Substitui a necessidade de banco de dados"], "Manter a lógica de domínio alimentada exclusivamente por dados limpos e previsíveis simplifica a arquitetura."),
          t("Qual método estático de Number deve ser chamado para garantir que o preço seja um número real?", ["Number.isFinite"], "Number.isFinite(preco) rejeita NaN, Infinity e valores não numéricos.", "# validador de numero real finito"),
          g("Complete a normalização do campo de email garantindo remoção de espaços e minúsculas:", ["const emailNormalizado = entrada?.email?.trim().toLowerCase() ?? \"\";"], "Combina Optional Chaining com sanitização e fallback seguro.", "const emailNormalizado = entrada?.email?.trim().toLowerCase() ____ \"\";"),
          o("Ordene as etapas da pipeline de validação e normalização de um usuário:", ["Desestruturar o payload bruto aplicando valores padrão de primeiro nível","Sanitizar campos de texto (remover espaços com trim e normalizar caixas)","Validar campos obrigatórios com guard clauses lançando exceções se ausentes","Construir e retornar o objeto de domínio normalizado e congelado com Object.freeze"], "Pipeline profissional de higienização e validação de contratos de entrada."),
          p("Associe a ferramenta ao seu papel na sanitização do payload:", [["entrada?.trim().toLowerCase()","Sanitização de strings para formato canônico"],["Number(preco)","Conversão explícita de valores de moeda para ponto flutuante"],["valor ?? valorPadrao","Garantia de fallback para campos opcionais não informados"],["Object.freeze(resultado)","Imutabilidade de dados garantindo integridade após a validação"]], "Componentes da suíte integrada de validação e sanitização de dados em JavaScript.")
        ]
      }
    ]
  });
})();
