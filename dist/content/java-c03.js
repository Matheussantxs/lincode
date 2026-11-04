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

  const lang = "java";
  const chId = "java-c03";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "java-c03-u1-l2",
        title: "Tipos integrais: byte, short, int e long",
        subtitle: "Representação · Faixas de bits com complemento de dois e sufixo L",
        theory: "A linguagem Java define quatro tipos primitivos para números inteiros sinalizados em complemento de dois: byte (8 bits, -128 a 127), short (16 bits), int (32 bits, padrão da linguagem) e long (64 bits). Literais do tipo long exigem obrigatoriamente o sufixo L (maiúsculo) para evitar que o compilador os interprete como int.",
        questions: [
          q("Qual é o tamanho em memória e o tipo integral padrão para números inteiros em Java?", "int, ocupando exatamente 32 bits (4 bytes) com sinal", ["long, com 64 bits","short, com 16 bits"], "O tipo int é o padrão para literais inteiros sem sufixo e para expressões aritméticas em Java."),
          q("Qual é a faixa de valores representável pelo tipo primitivo byte (8 bits)?", "De -128 até 127", ["De 0 até 255","De -32768 até 32767"], "Como utiliza representação em complemento de dois com sinal, 1 bit é reservado para o sinal."),
          q("Por que devemos preferir o sufixo L maiúsculo em vez de l minúsculo em literais long?", "A letra l minúscula é visualmente quase indistinguível do dígito 1 em muitas fontes de código", ["Porque o compilador Java rejeita l minúsculo com erro","Porque l minúsculo gasta menos memória"], "Boa prática consagrada: 1000L é imediatamente legível como long, enquanto 1000l confunde revisores."),
          q("Como o Java 7+ permite melhorar a legibilidade visual de números literais extensos?", "Inserindo sublinhados (_) entre os dígitos numéricos (ex: 1_000_000_000L)", ["Colocando pontos entre os números","Separando por vírgula"], "Sublinhados são ignorados pelo compilador e servem puramente para organização visual humana."),
          t("Qual sufixo de uma única letra deve ser anexado ao final de um literal numérico para defini-lo como long?", ["L"], "O sufixo L instrui o compilador a tratar o literal como inteiro de 64 bits.", "# sufixo literal do tipo long"),
          g("Complete a declaração da constante com o sufixo obrigatório para long:", ["long populacaoMundial = 8_000_000_000L;"], "O sufixo L é obrigatório para números que excedem 32 bits.", "long populacaoMundial = 8_000_000_000____;"),
          o("Ordene os tipos primitivos integrais de Java do menor para o maior em bits:", ["byte: ocupa 8 bits de memória","short: ocupa 16 bits de memória","int: ocupa 32 bits de memória","long: ocupa 64 bits de memória"], "Hierarquia formal dos tipos integrais com sinal na máquina virtual Java (JVM)."),
          p("Associe o tipo integral primitivo à sua capacidade de armazenamento:", [["byte","8 bits com faixa de -128 a 127"],["short","16 bits com faixa de -32.768 a 32.767"],["int","32 bits padrão para contagens inteiras"],["long","64 bits para carimbos de data e IDs de alta magnitude"]], "Dimensões e finalidades dos tipos inteiros em Java.")
        ]
      },
      {
        id: "java-c03-u1-l3",
        title: "Ponto flutuante: float e double",
        subtitle: "Precisão · Padrão IEEE 754 e sufixos f e d",
        theory: "Java implementa o padrão IEEE 754 para números fracionários através dos tipos float (32 bits, precisão simples) e double (64 bits, precisão dupla). Literais decimais são double por padrão na linguagem. Declarar um float exige o sufixo f (ex: 3.14f); a omissão do sufixo resulta em erro de compilação por narrowing.",
        questions: [
          q("Qual é o tipo padrão adotado pelo compilador Java para qualquer número literal decimal como 3.14?", "double (64 bits de precisão dupla)", ["float (32 bits)","BigDecimal"], "Todo literal com ponto decimal é tipado como double a menos que contenha o sufixo f."),
          q("O que acontece se tentarmos compilar a linha: float preco = 19.90; sem o sufixo f?", "Erro de compilação: incompatibilidade de tipos (possible loss of precision / narrowing de double para float)", ["O Java converte silenciosamente","O número é arredondado para inteiro"], "A atribuição de double para float exige conversão explícita ou o sufixo f na declaração."),
          q("Quantos dígitos significativos de precisão decimal o tipo float e o tipo double garantem aproximadamente?", "float oferece cerca de 6 a 7 dígitos; double oferece cerca de 15 a 17 dígitos decimais", ["Ambos oferecem 10 dígitos","float oferece 20 e double oferece 50"], "O tipo double oferece o dobro da largura da mantissa em bits, reduzindo erros de truncamento."),
          q("Por que tipos de ponto flutuante binário (float e double) não devem ser usados para valores monetários?", "Porque frações decimais sofrem imprecisão binária no padrão IEEE 754, gerando dízimas indesejadas em centavos", ["Porque ocupam muita memória","Porque o Java proíbe números negativos neles"], "Para cálculos financeiros estritos, a plataforma Java exige a utilização da classe BigDecimal."),
          t("Qual caractere de sufixo deve ser aposto a um literal decimal para atribuí-lo a uma variável float?", ["f"], "Exemplo: float taxa = 0.05f.", "# sufixo literal do tipo float"),
          g("Complete a declaração do tipo float com o sufixo correto:", ["float altura = 1.75f;"], "O sufixo f evita o erro de compilação por tentativa de atribuir double a float.", "float altura = 1.75____;"),
          o("Ordene os tipos de ponto flutuante pelas suas características técnicas:", ["float: precisão simples de 32 bits, exige sufixo f obrigatório","double: precisão dupla de 64 bits, tipo decimal padrão da linguagem","Double.POSITIVE_INFINITY: extrapolação de limite superior positivo","Double.NaN: resultado de operação matemática indefinida (0.0 / 0.0)"], "Hierarquia e propriedades dos tipos de ponto flutuante em Java."),
          p("Associe o literal numérico à sua tipagem correta no compilador Java:", [["3.14","Tipo double padrão por inferência literal"],["3.14f","Tipo float de precisão simples com sufixo explícito"],["100","Tipo int padrão para inteiros"],["100L","Tipo long com sufixo de 64 bits"]], "Identificação estrita de literais numéricos em código Java.")
        ]
      },
      {
        id: "java-c03-u1-l4",
        title: "O tipo char e codificação UTF-16",
        subtitle: "Caracteres · Literais com aspas simples e tabela Unicode",
        theory: "O tipo primitivo char em Java armazena um único caractere de 16 bits (2 bytes) codificado em UTF-16, cobrindo o Plano Multilíngue Básico (BMP) do Unicode com valores de 0 a 65.535. Literais de char utilizam aspas simples ('A'), enquanto literais de String utilizam aspas duplas (\"A\").",
        questions: [
          q("Quantos bits e qual codificação o tipo primitivo char utiliza em Java?", "16 bits sem sinal (unsigned) representando unidades de código UTF-16", ["8 bits em tabela ASCII pura","32 bits em UTF-32"], "O tipo char é o único primitivo estritamente não-sinalizado de Java, com valores de 0 a 65.535 (\\u0000 a \\uffff)."),
          q("Qual delimitador sintático é obrigatório para representar um literal do tipo char?", "Aspas simples ('A')", ["Aspas duplas (\"A\")","Crase (`A`)"], "Aspas simples delimitam um char único; aspas duplas delimitam objetos da classe String."),
          q("O que acontece ao somar um char com um inteiro em Java (ex: 'A' + 1)?", "O char é promovido numericamente para int (código 65 + 1), resultando no número inteiro 66", ["Concatena como texto \"A1\"","Gera erro de compilação"], "Como char é compatível com números inteiros, operadores aritméticos acionam a promoção para int."),
          q("Como representar um caractere especial em char utilizando sua sequência de escape Unicode?", "\\u followed por 4 dígitos hexadecimais (ex: '\\u0041' para a letra 'A')", ["&U41;","#x41;"], "Permite inserir qualquer caractere Unicode de 16 bits de forma independente de teclado ou locale."),
          t("Qual delimitador de um único caractere envolve literais do tipo char em Java?", ["'"], "Aspas simples delimitam caracteres literais.", "# delimitador de literal char"),
          g("Complete a declaração do caractere de quebra de linha com a sequência de escape:", ["char quebraLinha = '\\n';"], "\\n representa o caractere de nova linha em Java.", "char quebraLinha = '____';"),
          o("Ordene as etapas de representação de um caractere char na JVM:", ["Código fonte com literal delimitado por aspas simples: 'Z'","Compilador traduz o glifo para seu ponto de código UTF-16 correspondente (90)","Armazenamento em 16 bits na pilha de execução da JVM","Impressão formatada decodificando os 16 bits de volta para o glifo visual"], "Ciclo de vida e conversão do tipo primitivo char em Java."),
          p("Associe a sequência de escape de char ao seu caractere correspondente:", [["'\\n'","Caractere de nova linha (Line Feed)"],["'\\t'","Caractere de tabulação horizontal"],["'\\\\'","Caractere de barra invertida literal"],["'\\''","Caractere de aspa simples literal"]], "Sequências de escape fundamentais para o tipo char em Java.")
        ]
      },
      {
        id: "java-c03-u1-l5",
        title: "O tipo boolean em Java e estipulação estrita",
        subtitle: "Lógica · true e false puros sem conversão para inteiros",
        theory: "O tipo primitivo boolean em Java admite exclusivamente dois valores literais: true e false. Diferente de linguagens como C ou C++, boolean em Java não é um número: 0 e 1 não podem ser convertidos para boolean nem implicitamente nem com casting, tornando condicionais como if (1) ilegais no compilador.",
        questions: [
          q("Por que o código if (1) { ... } não compila em Java, diferentemente de C e C++?", "Java exige uma expressão estritamente booleana; números inteiros não podem ser convertidos para boolean", ["Porque o número 1 é reservado para loops","Porque o if exige aspas"], "Segurança de tipos: proibir a coerção de números para booleanos elimina erros clássicos como if (x = 1)."),
          q("Quais são os únicos dois valores literais pertencentes ao tipo boolean em Java?", "true e false (ambos em minúsculas como palavras reservadas)", ["0 e 1","TRUE e FALSE em maiúsculas"], "São literais primitivos padronizados pela especificação da linguagem."),
          q("O que acontece se tentarmos fazer um cast explícito de int para boolean com (boolean) 0?", "Erro de compilação: tipos incompatíveis não podem ser convertidos por cast (inconvertible types)", ["O valor vira false","O programa roda normalmente"], "O compilador rejeita conversões entre o tipo boolean e qualquer outro tipo primitivo de Java."),
          q("Qual convenção de nomenclatura de métodos é padrão para getters de propriedades booleanas?", "Prefixar com is em vez de get (ex: isAtivo(), isDisponivel())", ["Prefixar com has","Prefixar com check"], "Convenção oficial dos JavaBeans adotada universalmente em frameworks e bibliotecas."),
          t("Qual palavra-chave literal representa a falsidade lógica do tipo boolean em Java?", ["false"], "false é o literal booleano negativo em minúsculas.", "# valor booleano negativo"),
          g("Complete a condicional que testa a variável booleana de forma idiomática:", ["boolean autenticado = true;\nif (autenticado) {\n    carregarDados();\n}"], "Variáveis booleanas são testadas diretamente sem comparar com == true.", "boolean autenticado = true;\nif (____) {\n    carregarDados();\n}"),
          o("Ordene as afirmações sobre o tipo boolean em Java pela sua veracidade:", ["boolean aceita exclusivamente true ou false literais","Não possui conversão para int nem mesmo via cast explícito","Getters de classes seguem a convenção isPropriedade()","Operadores lógicos como && e || exigem operandos estritamente booleanos"], "Princípios fundamentais da tipagem estrita booleana em Java."),
          p("Associe a expressão booleana ao seu resultado na JVM:", [["!true","Avalia para o primitivo false"],["!false","Avalia para o primitivo true"],["10 > 5","Expressão relacional que produz o booleano true"],["if (ativo)","Condicional que consome diretamente o predicado"]], "Comportamento da tipagem booleana em expressões e controle de fluxo.")
        ]
      }
    ],
    2: [
      {
        id: "java-c03-u2-l1",
        title: "Declaração e inicialização de variáveis",
        subtitle: "Escopo e ciclo · Por que variáveis locais não têm valor padrão",
        theory: "Em Java, variáveis locais declaradas dentro de métodos não recebem valores padrão automáticos. Tentar ler uma variável local antes de atribuir um valor resulta em erro de compilação (variable might not have been initialized). Em contraste, campos de classe (atributos) são inicializados automaticamente para zero, false ou null.",
        questions: [
          q("O que acontece se tentarmos ler uma variável local de método antes de atribuir um valor a ela em Java?", "Erro de compilação estrito: variable might not have been initialized", ["Ela assume o valor 0 ou null silenciosamente","Lança NullPointerException em runtime"], "Java exige a atribuição prévia definitiva (definite assignment) para variáveis locais para evitar lixo de memória."),
          q("Quais valores padrão os atributos de instância (campos de classe) recebem automaticamente se não inicializados?", "Tipos numéricos recebem 0/0.0, boolean recebe false e referências de objetos recebem null", ["Todas recebem null","Recebem valores aleatórios"], "Apenas campos de instância e de classe no heap recebem inicialização automática com valores zero/nulo."),
          q("Qual é a sintaxe fundamental para declarar uma variável em Java com tipo explícito?", "Tipo identificador = valorInicial; (ex: int contador = 0;)", ["identificador := valor","var Tipo = valor"], "Java é fortemente e estaticamente tipado: o tipo precede obrigatoriamente o nome da variável."),
          q("Uma variável local pode ser declarada e inicializada em linhas separadas?", "Sim, declarar em uma linha e atribuir em outra é válido desde que a atribuição ocorra antes da primeira leitura", ["Não, a inicialização deve ser obrigatória na mesma linha","Apenas para strings"], "A análise de fluxo do compilador confere se todos os caminhos de execução inicializam a variável antes do uso."),
          t("Qual valor padrão automático é atribuído a um campo booleano de instância não inicializado?", ["false"], "Campos booleanos de classe recebem false por padrão.", "# valor default de boolean de classe"),
          g("Complete a inicialização da variável local antes de sua leitura obrigatória:", ["int total;\ntotal = 100;\nSystem.out.println(total);"], "A atribuição antes da leitura satisfaz a regra de definite assignment do compilador.", "int total;\n____ = 100;\nSystem.out.println(total);"),
          o("Ordene as etapas de vida de uma variável local dentro de um método:", ["Declaração do identificador com seu tipo associado (int contador;)","Inicialização atribuindo um valor definitivo (contador = 0;)","Leitura e manipulação do valor em cálculos e chamadas de métodos","Destruição da variável ao término da execução do bloco ou método"], "Ciclo de vida e regras de inicialização de variáveis de pilha em Java."),
          p("Associe o tipo de variável ao seu comportamento de inicialização:", [["Variável local de método","Exige inicialização explícita obrigatória antes da leitura"],["Campo de instância numérico","Inicializado automaticamente pela JVM com o valor 0"],["Campo de instância de objeto","Inicializado automaticamente pela JVM com a referência null"],["Campo de instância booleano","Inicializado automaticamente pela JVM com o literal false"]], "Diferenças de inicialização entre escopo local e escopo de instância em Java.")
        ]
      },
      {
        id: "java-c03-u2-l2",
        title: "A palavra-chave final e constantes",
        subtitle: "Imutabilidade · Impedindo reatribuições e constantes estáticas",
        theory: "A palavra-chave final impede que uma variável tenha sua referência ou valor primitivo reatribuído após a primeira inicialização. Constantes globais de classe são declaradas com a combinação public static final em maiúsculas (ex: public static final int TIMEOUT_SEGUNDOS = 30;), garantindo imutabilidade compartilhada.",
        questions: [
          q("O que a palavra-chave final impede quando aplicada a uma variável local ou atributo?", "Impede qualquer reatribuição a um novo valor após a inicialização, tornando a ligação imutável", ["Impede que o valor seja lido por outros métodos","Obriga a variável a ser estática"], "Tentar reatribuir uma variável final gera erro de compilação (cannot assign a value to final variable)."),
          q("Como constantes de classe compartilhadas e imutáveis são convencionalmente declaradas em Java?", "public static final Tipo NOME_CONSTANTE = valor;", ["const Tipo nome = valor;","final global Tipo nome;"], "static garante uma única cópia por classe; final impede modificações; public expõe o valor."),
          q("Declarar um objeto como final (ex: final List<String> lista = new ArrayList<>()) impede a adição de itens?", "Não; o final protege apenas a referência do array/objeto contra reatribuição, mas seus dados internos continuam mutáveis", ["Sim, a lista torna-se totalmente imutável","Gera erro de compilação"], "final garante estabilidade de ponteiro de memória, não a imutabilidade profunda das propriedades da instância."),
          q("O que é uma variável \"blank final\" em Java?", "Uma variável final que é declarada sem valor e inicializada posteriormente no construtor da classe", ["Uma variável que não tem nome","Uma variável que contém string vazia"], "Permite parametrizar constantes de instância com valores diferentes passados em construtores distintos."),
          t("Qual modificador de Java impede a reatribuição de variáveis e a sobrescrita de métodos?", ["final"], "final confere imutabilidade a variáveis e sela classes/métodos.", "# modificador de imutabilidade em Java"),
          g("Complete a declaração da constante com o modificador de imutabilidade correto:", ["public static final int TAMANHO_PADRAO = 100;"], "final impede que o valor da constante seja modificado.", "public static ____ int TAMANHO_PADRAO = 100;"),
          o("Ordene os modificadores de uma constante global de classe na convenção padrão:", ["public: nível de visibilidade pública acessível por todo o projeto","static: pertencente à classe, existindo em uma única cópia no Metaspace","final: modificador de imutabilidade que trava o valor atribuído","int MAX_TENTATIVAS = 5: tipo primitivo e identificador em caixa alta"], "Anatomia canônica de declaração de constantes públicas em Java."),
          p("Associe a aplicação do modificador final ao seu efeito específico:", [["final em variável primitiva","O valor numérico/booleano nunca mais pode ser alterado"],["final em variável de referência","A variável não pode apontar para outro objeto no Heap"],["final em método","Impede que subclasses sobrescrevam (@Override) o método"],["final em classe","Impede que a classe seja estendida por herança (ex: classe String)"]], "Múltiplas aplicações do modificador final na linguagem Java.")
        ]
      },
      {
        id: "java-c03-u2-l3",
        title: "Inferência de tipos locais com var (Java 10+)",
        subtitle: "Produtividade · Quando usar var sem perder legibilidade",
        theory: "Introduzida no Java 10, a palavra-chave var permite inferência de tipos em variáveis locais. O compilador deduz o tipo estático estrito a partir da expressão do lado direito da atribuição. Java permanece 100% estaticamente tipado: o tipo inferido é travado em tempo de compilação e não muda em runtime.",
        questions: [
          q("O uso da palavra-chave var no Java 10+ torna a linguagem dinamicamente tipada?", "Não, o tipo estático é deduzido em tempo de compilação e permanece estritamente fixo e imutável", ["Sim, Java passa a se comportar como Python","Sim, a variável pode mudar de tipo"], "var é apenas açúcar sintático para reduzir verbosidade em declarações locais de variáveis."),
          q("Onde o uso de var é estritamente proibido pela gramática da linguagem Java?", "Em atributos de classe, parâmetros de métodos e tipos de retorno de funções", ["Dentro de laços for","Em blocos try-with-resources"], "var só é permitido em variáveis locais de método com inicialização imediata explícita."),
          q("Por que a declaração var x; sem inicializador gera erro de compilação?", "O compilador não tem como inferir o tipo estático sem analisar a expressão de atribuição à direita", ["Porque var exige números","Porque x é uma letra reservada"], "A inicialização na mesma linha é mandatória para permitir a dedução do tipo pelo compilador."),
          q("Quando o uso de var é altamente recomendado por boas práticas de engenharia?", "Quando o tipo é óbvio pela chamada do construtor (ex: var cliente = new ClienteRepository())", ["Quando o tipo é retornado por um método obscuro","Em todas as variáveis do projeto"], "Elimina a redundância repetitiva do nome da classe em ambos os lados da atribuição."),
          t("Qual palavra reservada introduzida no Java 10 permite inferência de tipos em variáveis locais?", ["var"], "var simplifica declarações locais preservando tipagem estática.", "# inferencia de tipo local"),
          g("Complete a declaração concisa da lista utilizando inferência de tipos:", ["var lista = new ArrayList<String>();"], "var deduz que o tipo estático da variável é ArrayList<String>.", "____ lista = new ArrayList<String>();"),
          o("Ordene as etapas do processo de compilação ao utilizar var em Java:", ["O desenvolvedor escreve var servico = new ServicoEmail() no método","O compilador analisa a expressão à direita e identifica o tipo exato ServicoEmail","O compilador substitui internamente var pelo tipo formal ServicoEmail no bytecode","O arquivo .class binário gerado possui tipagem estática idêntica à declaração explícita"], "Processo de inferência estática e geração de bytecode com var no Java."),
          p("Associe o cenário de uso do var à sua viabilidade no compilador:", [["var total = 100;","Declaração local válida com inferência para int"],["var itens = new HashMap<String, List<Integer>>();","Uso ideal eliminando redundância de generics verbosos"],["public var valor = 10;","Erro de compilação: var proibido em atributos de classe"],["public void metodo(var x)","Erro de compilação: var proibido em parâmetros de método"]], "Regras de permissão e restrição sintática da palavra-chave var em Java.")
        ]
      },
      {
        id: "java-c03-u2-l4",
        title: "Convenções de nomenclatura da linguagem Java",
        subtitle: "Estilo · camelCase, PascalCase e UPPER_SNAKE_CASE",
        theory: "A comunidade Java segue rigorosamente as convenções de código oficiais da Sun/Oracle. Nomes de classes e interfaces usam PascalCase (ex: ContaCorrente), nomes de métodos e variáveis usam camelCase (ex: calcularSaldoTotal), constantes globais usam UPPER_SNAKE_CASE e pacotes usam minúsculas com domínio invertido.",
        questions: [
          q("Qual convenção de nomenclatura é oficial para classes e interfaces em Java?", "PascalCase (ou UpperCamelCase, iniciando cada palavra com maiúscula: ProcessadorDePagamento)", ["snake_case","camelCase"], "Diferencia tipos e classes de identificadores de métodos e variáveis locais."),
          q("Qual convenção é mandatória para nomes de métodos e variáveis em Java?", "camelCase (primeira palavra em minúscula, subsequentes com inicial maiúscula: obterSaldoAtual)", ["kebab-case","UPPER_CASE"], "Convenção hegemônica da plataforma Java para facilitar a leitura de chamadas de métodos."),
          q("Como constantes public static final devem ser nomeadas conforme o padrão oficial?", "UPPER_SNAKE_CASE (letras maiúsculas separadas por sublinhados: LIMITE_MAXIMO_TENTATIVAS)", ["camelCase","PascalCase"], "Sinaliza visualmente a qualquer leitor que o identificador possui semântica imutável e estática."),
          q("Qual é o padrão recomendado para nomes de pacotes (packages) em projetos corporativos Java?", "Letras minúsculas sem sublinhados seguindo o domínio reverso da empresa (ex: com.minhaempresa.projeto)", ["PascalCase com hífen","Caixa alta"], "Domínios reversos garantem unicidade global de nomes de pacotes evitando colisões de classes."),
          t("Qual convenção de capitalização inicia com minúscula e capitaliza as palavras seguintes?", ["camelCase"], "camelCase é o padrão para métodos e variáveis em Java.", "# convencao camelCase oficial"),
          g("Complete o identificador do método seguindo rigorosamente a convenção camelCase:", ["public void processarPagamentoCartao() {}"], "processarPagamentoCartao inicia com minúscula e agrupa palavras em maiúsculas.", "public void ____Cartao() {} // método processarPagamento em camelCase"),
          o("Ordene as convenções de nomenclatura do Java por elemento sintático:", ["com.empresa.faturamento: minúsculas para nomes de pacotes","NotaFiscalEletronica: PascalCase para classes, records e interfaces","calcularImpostoDevido(): camelCase para métodos e funções","ALIQUOTA_PADRAO_ICMS: UPPER_SNAKE_CASE para constantes estáticas"], "Mapeamento das convenções de nomenclatura da especificação de código Java."),
          p("Associe o identificador à sua categoria formal segundo as convenções Java:", [["UsuarioService","Nome de classe ou interface em PascalCase"],["consultarExtratoBancario","Nome de método em camelCase"],["QUANTIDADE_MAXIMA_ITENS","Constante pública estática em UPPER_SNAKE_CASE"],["br.com.banco.seguranca","Estrutura de pacote corporativo em minúsculas"]], "Padrões de nomenclatura oficiais do ecossistema Java.")
        ]
      },
      {
        id: "java-c03-u2-l5",
        title: "Escopo de variáveis: bloco, método e instância",
        subtitle: "Visibilidade · Sombreamento (shadowing) e ciclo de vida",
        theory: "O escopo determina a visibilidade e o tempo de vida de uma variável em Java. Variáveis de bloco existem apenas entre as chaves delimitadoras {}. Variáveis de método (parâmetros e locais) residem na pilha. Campos de instância vivem no heap enquanto o objeto existir. O sombreamento ocorre quando parâmetros ocultam atributos.",
        questions: [
          q("O que acontece se tentarmos acessar uma variável declarada dentro de um bloco if após o fechamento de suas chaves }?", "Erro de compilação: cannot find symbol (a variável deixa de existir fora do bloco)", ["A variável retorna null","A variável continua acessível"], "O escopo léxico de bloco delimita estritamente o tempo de vida da variável na pilha."),
          q("O que é o conceito de \"sombreamento de variável\" (variable shadowing) em Java?", "Quando um parâmetro de método possui o mesmo nome de um atributo de instância, ocultando o atributo no escopo local", ["Quando uma variável é deletada da memória","Quando o tipo é alterado"], "No construtor, o parâmetro nome oculta o atributo nome da classe."),
          q("Como desambiguar e acessar explicitamente o atributo de instância quando ele for sombreado por um parâmetro?", "Utilizando a palavra-chave this (ex: this.nome = nome;)", ["Usando super.nome","Colocando a variável entre aspas"], "this referencia a instância corrente da classe, distinguindo o campo do parâmetro local."),
          q("Onde variáveis locais primitivas e variáveis de instância residem na memória da JVM?", "Variáveis locais residem na pilha de execução (Stack); atributos de objetos residem no Heap", ["Todas residem no disco rígido","Todas residem na pilha"], "A pilha gerencia quadros de métodos de forma ultrarrápida; o Heap armazena o estado de longa duração dos objetos."),
          t("Qual palavra-chave referencia a instância atual do objeto desfazendo o sombreamento de atributos?", ["this"], "this.campo acessa o atributo de instância da classe.", "# referencia para a instancia atual"),
          g("Complete a atribuição do construtor desfazendo o sombreamento com a palavra-chave correta:", ["public Cliente(String nome) {\n    this.nome = nome;\n}"], "this.nome refere-se ao atributo da instância recebendo o parâmetro local nome.", "public Cliente(String nome) {\n    ____.nome = nome;\n}"),
          o("Ordene as variáveis pelo seu tempo de vida (da mais efémera para a mais duradoura):", ["Variável declarada dentro de um bloco de laço for { int temp = 0; }","Parâmetro de método recebido na assinatura da função","Campo de instância que vive no Heap enquanto o objeto tiver referências ativas","Campo estático (static) que sobrevive durante todo o ciclo de vida da JVM"], "Hierarquia de persistência e tempo de vida de variáveis na arquitetura da JVM."),
          p("Associe o escopo da variável ao seu local de residência física na JVM:", [["Variável local de método","Armazenada no quadro de pilha da thread (Thread Stack)"],["Atributo de instância de classe","Armazenado no Heap junto com o objeto instanciado"],["Constante public static final","Armazenada na área de metadados de classe (Metaspace)"],["this.propriedade","Desambiguação explícita de atributo contra sombreamento local"]], "Mapeamento de escopo e localização em memória na máquina virtual Java.")
        ]
      }
    ],
    3: [
      {
        id: "java-c03-u3-l1",
        title: "A classe String e o String Constant Pool",
        subtitle: "Memória · Imutabilidade profunda e reúso no Heap",
        theory: "Objetos da classe String em Java são profundamente imutáveis. Para otimizar memória, a JVM mantém uma área especial no Heap chamada String Constant Pool. Literais de texto com o mesmo conteúdo compartilham a mesma instância na memória através do mecanismo de interning automático executado pela JVM.",
        questions: [
          q("O que acontece internamente quando uma String é modificada em Java (ex: str.toUpperCase())?", "Uma instância totalmente nova de String contendo o texto modificado é criada e retornada no Heap", ["A string original é alterada no lugar","Os caracteres antigos são apagados da memória"], "Strings em Java são imutáveis; nenhum método pode alterar o array interno de caracteres da instância existente."),
          q("O que é o \"String Constant Pool\" mantido pela Máquina Virtual Java (JVM)?", "Uma tabela de cache no Heap que reutiliza instâncias idênticas de strings literais para economizar memória", ["Uma pasta temporária no disco do servidor","Uma lista de strings bloqueadas para escrita"], "Quando o código usa literais como \"Java\", a JVM pesquisa no pool e reutiliza a referência existente."),
          q("Qual é a diferença entre String s1 = \"olá\"; e String s2 = new String(\"olá\");?", "s1 reutiliza a instância do String Pool; s2 força a alocação de um novo objeto separado fora do pool", ["s2 é mais rápida que s1","s1 não ocupa memória"], "Usar new String(\"...\") é um antipadrão em Java porque duplica instâncias sem necessidade."),
          q("Qual método da classe String adiciona ou recupera programaticamente uma string do pool de constantes?", "intern()", ["pool()","register()"], "str.intern() retorna a referência canônica do String Pool para aquela sequência de caracteres."),
          t("Qual método da classe String move ou busca a instância correspondente dentro do pool de constantes?", ["intern"], "str.intern() garante o reúso da referência compartilhada.", "# metodo de interning de strings"),
          g("Complete a reutilização da referência canônica no String Pool:", ["String canonica = textoDinamico.intern();"], "intern() devolve o ponteiro unificado da string armazenada no pool.", "String canonica = textoDinamico.____();"),
          o("Ordene as etapas de resolução de um literal de String pelo carregador da JVM:", ["Encontrar o literal \"Java\" no bytecode da classe em execução","Consultar o String Constant Pool no Heap procurando a sequência correspondente","Se já existir: retornar imediatamente a referência existente na memória","Se não existir: criar a nova instância no pool e disponibilizar seu endereço"], "Ciclo de vida do algoritmo de interning automático de strings em Java."),
          p("Associe a declaração de String à sua alocação de memória:", [["String a = \"dados\"","Alocação gerenciada e reutilizada no String Constant Pool"],["String b = new String(\"dados\")","Alocação forçada de novo objeto redundante no Heap"],["String c = a.toUpperCase()","Nova instância de String criada em tempo de execução"],["a.intern()","Retorno da referência canônica compartilhada daquele texto"]], "Comportamento de alocação de strings no Heap e no String Pool da JVM.")
        ]
      },
      {
        id: "java-c03-u3-l2",
        title: "Comparação de Strings com .equals() vs ==",
        subtitle: "Identidade · Comparando conteúdo textual vs endereços de memória",
        theory: "Em Java, o operador == compara se duas referências apontam para o mesmíssimo endereço de memória. Para comparar o conteúdo textual de duas strings, é mandatório utilizar o método .equals() ou .equalsIgnoreCase(). Usar == em strings causa bugs intermitentes que passam em testes locais mas quebram em produção.",
        questions: [
          q("Por que você NUNCA deve comparar o conteúdo de Strings usando o operador == em Java?", "Porque == compara apenas se os endereços de memória são idênticos, e não o texto contido nos objetos", ["Porque o operador == foi removido do Java","Porque == inverte os caracteres"], "Duas strings criadas separadamente com o mesmo texto possuem referências de memória diferentes."),
          q("Qual método deve ser utilizado para comparar se duas Strings possuem exatamente os mesmos caracteres?", "str1.equals(str2)", ["str1.isSame(str2)","str1.compare(str2)"], "O método equals() compara caractere por caractere a sequência de unidades de código das strings."),
          q("Qual método compara duas strings ignorando diferenças entre letras maiúsculas e minúsculas?", "str1.equalsIgnoreCase(str2)", ["str1.caseEquals(str2)","str1.equalsAny(str2)"], "Compara \"JAVA\" e \"java\" retornando true sem necessidade de alocar novas strings com toLowerCase()."),
          q("Como prevenir NullPointerException ao comparar uma variável potencialmente nula com uma constante literal?", "Invocando o equals a partir do literal constante (ex: \"ADMIN\".equals(usuario.getPerfil()))", ["Colocando a variável entre parênteses","Usando == null primeiro"], "O padrão \"literal\".equals(variavel) (conhecido como Yoda condition) é imune a NullPointerException."),
          t("Qual método canônico da classe String compara se o conteúdo de dois objetos é idêntico?", ["equals"], "strA.equals(strB) avalia a igualdade de conteúdo textual.", "# metodo canonico de comparacao de igualdade"),
          g("Complete a comparação defensiva segura contra NullPointerException:", ["if (\"ATIVO\".equals(status)) {\n    processar();\n}"], "Invocar equals no literal imutável previne NPE se status for null.", "if (\"ATIVO\".____(status)) {\n    processar();\n}"),
          o("Ordene as etapas da comparação de strings executada internamente por equals():", ["Verificar se as referências de memória são idênticas com == (se sim, retorna true imediatamente)","Verificar se o objeto comparado é uma instância de String (se não, retorna false)","Verificar se ambas as strings possuem o mesmo length() (se não, retorna false)","Iterar caractere por caractere comparando códigos UTF-16 até a confirmação final"], "Algoritmo de validação de igualdade implementado na classe java.lang.String."),
          p("Associe a comparação de Strings ao seu respectivo resultado:", [["\"java\" == \"java\"","true por coincidirem no String Constant Pool"],["new String(\"java\") == \"java\"","false por possuírem endereços de memória distintos"],["new String(\"java\").equals(\"java\")","true por possuírem conteúdo textual idêntico"],["\"java\".equalsIgnoreCase(\"JAVA\")","true por desconsiderar diferenças de caixa"]], "Diferenças cruciais entre comparação por referência e por valor em Java.")
        ]
      },
      {
        id: "java-c03-u3-l3",
        title: "Métodos essenciais: length, charAt, substring",
        subtitle: "Inspeção · Fatiamento e busca em sequências de caracteres",
        theory: "A classe String fornece métodos robustos de inspeção e manipulação. O método length() retorna o total de caracteres. charAt(indice) obtém o caractere naquela posição (0 a length-1). substring(inicio, fim) extrai uma fatia do texto no intervalo semiaberto [inicio, fim), lançando StringIndexOutOfBoundsException se os limites forem violados.",
        questions: [
          q("Qual é a diferença sintática entre obter o tamanho de um array e o tamanho de uma String em Java?", "Array usa o atributo length sem parênteses; String usa o método length() com parênteses", ["Ambos usam size()","Array usa length() e String usa count()"], "Pegadinha clássica de iniciantes: array.length vs string.length()."),
          q("Qual método da classe String extrai uma fatia de texto informando índice inicial e final?", "substring(inicio, fim)", ["slice(inicio, fim)","substr(inicio, fim)"], "Retorna a subsequência incluindo o índice inicio e excluindo o índice fim [inicio, fim)."),
          q("O que acontece se tentarmos acessar str.charAt(str.length())?", "Dispara a exceção StringIndexOutOfBoundsException em tempo de execução", ["Retorna o último caractere","Retorna null"], "Como os índices iniciam em 0, o último caractere válido situa-se estritamente na posição length() - 1."),
          q("Qual método verifica se uma String contém determinada sequência de caracteres retornando booleano?", "contains(CharSequence s)", ["hasString(s)","includes(s)"], "str.contains(\"termo\") verifica a presença sem precisar de checagens manuais com indexOf."),
          t("Qual método de String extrai um caractere primitivo char específico informando seu índice?", ["charAt"], "str.charAt(0) recupera o primeiro caractere da cadeia.", "# metodo de extracao de caractere por indice"),
          g("Complete o fatiamento seguro para extrair o código de DDD de um telefone \"(11)99999\":", ["String ddd = telefone.substring(1, 3);"], "substring(1, 3) seleciona os caracteres nas posições 1 e 2.", "String ddd = telefone.____(1, 3);"),
          o("Ordene as operações de manipulação na string \"Java Moderno\":", ["Medir a quantidade total de caracteres: \"Java Moderno\".length() => 12","Extrair o primeiro caractere da cadeia: \"Java Moderno\".charAt(0) => 'J'","Extrair a primeira palavra com fatiamento: \"Java Moderno\".substring(0, 4) => \"Java\"","Verificar a presença de substring: \"Java Moderno\".contains(\"Moderno\") => true"], "Operações canônicas de leitura e inspeção de texto na classe String."),
          p("Associe o método da classe String à sua função:", [["str.length()","Retorna o número de caracteres contidos na string"],["str.charAt(i)","Retorna o primitivo char localizado na posição i"],["str.substring(ini, fim)","Retorna nova String com os caracteres no intervalo indicado"],["str.indexOf(\"alvo\")","Retorna o índice da primeira ocorrência da substring ou -1"]], "Métodos indispensáveis para manipulação de texto em Java.")
        ]
      },
      {
        id: "java-c03-u3-l4",
        title: "StringBuilder vs concatenação com +",
        subtitle: "Desempenho · Evitando alocações massivas em loops",
        theory: "O operador + para concatenação de Strings é conveniente para linhas simples, onde o compilador o otimiza internamente. Porém, concatenar strings repetidamente dentro de loops com o operador + cria milhares de instâncias intermediárias de String descartáveis, degradando severamente a memória e o coletor de lixo.",
        questions: [
          q("Por que concatenar strings com o operador += dentro de um laço com 10.000 voltas é um problema grave?", "Cria milhares de instâncias intermediárias no Heap, resultando em complexidade O(n²) e sobrecarga do Garbage Collector", ["Porque o Java limita a 100 concatenações","Porque o arquivo .class fica corrompido"], "Cada volta aloca uma nova String inteira copiando todos os caracteres anteriores novamente."),
          q("Qual classe mutável de alta performance deve ser utilizada para construir strings dentro de laços?", "StringBuilder", ["StringBuffer","StringAccumulator"], "StringBuilder opera sobre um buffer de caracteres mutável interno, redimensionando sob demanda em O(n)."),
          q("Qual é a diferença entre StringBuilder e a antiga classe StringBuffer?", "StringBuilder não é sincronizada (mais rápida); StringBuffer é sincronizada (thread-safe, porém mais lenta)", ["StringBuilder é só para números","StringBuffer não existe mais"], "StringBuilder é a escolha padrão para 99% dos casos onde a montagem de texto ocorre em uma única thread."),
          q("Qual método da classe StringBuilder é utilizado para anexar novos dados ao final do buffer?", "append()", ["add()","push()"], "sb.append(dado) aceita números, caracteres, booleanos e objetos, retornando a própria instância para encadeamento."),
          t("Qual método da classe StringBuilder converte o buffer acumulado final em uma String imutável?", ["toString"], "sb.toString() gera o objeto String definitivo.", "# conversao final do StringBuilder para String"),
          g("Complete o acúmulo de texto com StringBuilder de alta performance no laço:", ["StringBuilder sb = new StringBuilder();\nfor (String item : itens) {\n    sb.append(item).append(\", \");\n}"], "append() anexa dados diretamente no buffer mutável sem alocações extras.", "StringBuilder sb = new StringBuilder();\nfor (String item : itens) {\n    sb.____(item).append(\", \");\n}"),
          o("Ordene as etapas da montagem de um relatório longo com StringBuilder:", ["Instanciar o construtor com capacidade inicial estimada: new StringBuilder(1024)","Percorrer a coleção de registros anexando linhas com sb.append(linha).append(\"\\n\")","Consolidar a representação textual final invocando sb.toString()","Liberar o StringBuilder para coleta de lixo e entregar a String gerada"], "Padrão profissional de alta eficiência para composição de texto em Java."),
          p("Associe a ferramenta de composição de texto ao seu cenário de aplicação ótimo:", [["Operador + simples","Concatenação de duas ou três variáveis em uma única linha"],["StringBuilder","Construção de strings dinâmicas em laços e métodos locais"],["StringBuffer","Ambientes legados multi-thread com compartilhamento de buffer"],["String.join(\",\", lista)","Junção limpa de elementos de coleções com delimitador"]], "Diretrizes de performance para composição de texto em Java.")
        ]
      },
      {
        id: "java-c03-u3-l5",
        title: "Text Blocks (Java 15+): strings multilinha com \"\"\"",
        subtitle: "Sintaxe moderna · Formatando JSON, SQL e HTML sem escapes",
        theory: "Introduzidos no Java 15, os Blocos de Texto (Text Blocks) utilizam três aspas duplas (\"\"\") para declarar strings que abrangem múltiplas linhas. Eles gerenciam automaticamente a indentação incidental através de algoritmo de normalização de espaços e dispensam o escape de aspas duplas internas comuns.",
        questions: [
          q("Qual delimitador sintático inicia e encerra um Bloco de Texto (Text Block) em Java?", "Três aspas duplas consecutivas (\"\"\")", ["Três crases (```)","Três aspas simples (''')"], "Abertura exige que a linha das três aspas termine com uma quebra de linha obrigatória."),
          q("O que a regra de abertura de um Text Block exige imediatamente após as três aspas iniciais?", "Uma quebra de linha obrigatória; nenhum caractere de texto pode residir na mesma linha das aspas de abertura", ["Um ponto e vírgula","O nome da classe"], "Garante que a indentação relativa do bloco de texto seja calculada com clareza a partir da próxima linha."),
          q("Como os Text Blocks tratam aspas duplas comuns (\") presentes no interior do texto?", "Podem ser usadas diretamente sem necessidade de caracteres de escape de barra invertida (\\\")", ["Exigem escape obrigatório com \\\"","Geram erro de compilação"], "Facilita incrivelmente a colagem direta de fragmentos de JSON, XML e queries SQL no código Java."),
          q("Como o compilador Java remove a \"indentação incidental\" em um Text Block?", "Calcula o recuo comum à esquerda compartilhado por todas as linhas e o remove da string final", ["Remove todos os espaços do texto","Alinha o texto à direita"], "Preserva a formatação visual do código fonte no editor sem poluir a string resultante com espaços inúteis."),
          t("Quantas aspas duplas consecutivas compõem o delimitador de um Text Block em Java?", ["3"], "Três aspas duplas abrem e fecham blocos de texto.", "# quantidade de aspas no delimitador"),
          g("Complete a declaração do bloco de texto moderno em Java:", ["String json = \"\"\"\n{\n    \"status\": \"ok\"\n}\n\"\"\";"], "Três aspas duplas delimitam strings multilinha sem necessidade de escapes.", "String json = ____\n{\n    \"status\": \"ok\"\n}\n\"\"\";"),
          o("Ordene as etapas do algoritmo de normalização de indentação de um Text Block:", ["Dividir o conteúdo textual do bloco em linhas individuais","Calcular a menor quantidade de espaços em branco antes do primeiro caractere em cada linha","Subtrair essa quantidade comum de espaços incidentais de todas as linhas","Remover espaços em branco redundantes no final de cada linha e emitir a String"], "Algoritmo de compilação e higienização de Text Blocks em Java."),
          p("Associe o recurso de Text Block ao seu benefício direto:", [["Três aspas duplas (\"\"\")","Delimitação de texto multilinha sem caracteres \\n explícitos"],["Aspas duplas internas puras","Colagem de JSON e SQL sem poluição visual por barras \\\""],["Normalização de indentação","Remove espaços incidentais preservando a estética do código"],["Escape de barra final (\\)","Suprime a quebra de linha naquela linha específica do bloco"]], "Características e vantagens sintáticas dos Text Blocks em Java.")
        ]
      }
    ],
    4: [
      {
        id: "java-c03-u4-l1",
        title: "Promoção numérica e alargamento (Widening)",
        subtitle: "Conversão implícita · De tipos menores para tipos maiores sem perda",
        theory: "A conversão por alargamento (widening primitive conversion) ocorre automaticamente quando um valor de menor capacidade é atribuído a uma variável de maior capacidade (ex: int para long, ou float para double). Não exige operador de casting e preserva a magnitude numérica do dado original com segurança.",
        questions: [
          q("O que caracteriza uma conversão por alargamento (widening) em Java?", "Conversão automática e segura de um tipo primitivo de menor capacidade para outro de maior capacidade", ["Conversão que exige o operador (Tipo) explícito","Conversão de String para número"], "Ocorre sem risco de perda de magnitude (ex: byte -> short -> int -> long -> float -> double)."),
          q("O que acontece na linha: long valor = 42;?", "O literal int 42 sofre alargamento implícito automático para o tipo long de 64 bits sem erros", ["Erro de compilação por falta do L","O compilador trunca o número"], "Como 42 cabe confortavelmente em 32 bits, sua promoção para 64 bits é garantida pelo compilador."),
          q("Qual é a regra de promoção numérica automática em operações aritméticas envolvendo tipos menores que int?", "Operandos byte, short e char são promovidos automaticamente para int antes da operação aritmética", ["São convertidos para double","Permanecem no tipo menor"], "Por isso a soma de dois bytes byte a = 1, b = 2; resulta em um valor do tipo int, exigindo cast para voltar a byte."),
          q("Uma conversão implícita de long para float pode sofrer alguma forma de perda?", "Pode perder os dígitos menos significativos da mantissa devido à precisão de 24 bits do float, mantendo a magnitude", ["Não, a conversão é 100% perfeita","Gera erro de compilação"], "Embora widening, a transição de inteiros de 64 bits para float de 32 bits pode perder precisão de casas menos significativas."),
          t("Qual tipo primitivo integral é o destino padrão de promoção aritmética para byte, short e char?", ["int"], "Operações aritméticas em tipos menores promovem automaticamente para int.", "# destino de promocao numerica padrao"),
          g("Complete a atribuição com promoção automática de int para double:", ["int idade = 25;\ndouble d = idade;"], "A promoção de int para double é implícita e automática.", "int idade = 25;\ndouble d = ____;"),
          o("Ordene a cadeia completa de conversão por alargamento (widening) em Java:", ["byte (8 bits com sinal)","short (16 bits) ou char (16 bits unsigned)","int (32 bits com sinal padrão)","long (64 bits com sinal) -> float (32 bits) -> double (64 bits)"], "Hierarquia formal de conversão implícita de tipos primitivos em Java."),
          p("Associe a atribuição ao seu tipo de conversão:", [["int a = 10; long b = a;","Widening implícito de 32 para 64 bits"],["float f = 100L;","Widening implícito de inteiro para ponto flutuante"],["double d = 3.14f;","Widening implícito de float para double"],["byte b1 = 1, b2 = 2; int s = b1 + b2;","Promoção aritmética automática para int"]], "Exemplos práticos de alargamento e promoção numérica em Java.")
        ]
      },
      {
        id: "java-c03-u4-l2",
        title: "Estreitamento e coerção explícita (Narrowing Cast)",
        subtitle: "Casting explícito · (int) d e riscos de truncamento e overflow",
        theory: "A conversão por estreitamento (narrowing primitive conversion) converte tipos de maior capacidade para menor (ex: double para int, ou long para short). Exige o operador de casting explícito (Tipo) e pode provocar perda de informação, truncamento de casas decimais e inversão de sinais por estouro de bits.",
        questions: [
          q("Por que o compilador Java exige o operador de casting explícito (Tipo) em conversões de estreitamento?", "Para alertar que aquela conversão pode acarretar perda de dados, truncamento ou overflow de bits", ["Para acelerar a execução na CPU","Porque o Java proíbe conversões"], "O desenvolvedor deve assinar deliberadamente que está ciente do risco de perda de informação."),
          q("Qual é o resultado numérico do casting de ponto flutuante para inteiro (int) 9.99?", "9 (a parte fracionária é sumariamente truncada, sem arredondamento)", ["10","9.0"], "Casting para inteiro descarta a fração decimal em direção a zero sem realizar arredondamento aritmético."),
          q("O que acontece se convertermos o número int 130 para o tipo byte via (byte) 130?", "Ocorre overflow: os bits excedentes são descartados e o valor resultante vira o número negativo -126", ["O Java lança ArithmeticException","O valor vira 127"], "O tipo byte varia apenas de -128 a 127; o bit de sinal é ativado pelo bit 128, invertendo o valor."),
          q("Qual é a sintaxe correta para realizar um cast explícito para o tipo short?", "(short) expressao", ["short(expressao)","expressao as short"], "O operador de cast em Java utiliza parênteses envolvendo o tipo de destino desejado."),
          t("Qual símbolo de pontuação envolve o tipo de destino na operação de casting explícito em Java?", ["()"], "Exemplo: (int) meuDouble.", "# delimitador de operador de casting"),
          g("Complete o casting explícito para truncar o valor decimal para número inteiro:", ["double preco = 49.90;\nint inteiro = (int) preco;"], "(int) descarta as casas decimais convertendo para int.", "double preco = 49.90;\nint inteiro = ____ preco;"),
          o("Ordene as etapas executadas pela JVM durante o casting (int) 3.85:", ["Avaliar a expressão de ponto flutuante: valor 3.85 do tipo double","Reconhecer a instrução de bytecode d2i (double to int)","Descartar sumariamente todas as casas decimais fracionárias (.85)","Gravar o valor inteiro resultante 3 na variável de destino"], "Mecanismo interno de execução de conversão por estreitamento com truncamento."),
          p("Associe o casting explícito ao seu efeito colateral potencial:", [["(int) 4.95","Truncamento puro da fração decimal (resulta em 4)"],["(byte) 300","Estouro de capacidade (overflow) com descarte de bits superiores"],["(char) -1","Interpretação de sinal negativo como código Unicode unsigned positivo"],["(float) meuDouble","Perda potencial de precisão na mantissa de 64 para 32 bits"]], "Riscos e comportamentos do narrowing cast em tipos primitivos.")
        ]
      },
      {
        id: "java-c03-u4-l3",
        title: "Classes Wrapper (Integer, Double) e Autoboxing",
        subtitle: "Tipos de referência · Conversão automática e armadilhas de performance",
        theory: "Cada tipo primitivo possui uma classe wrapper correspondente em java.lang (int -> Integer, double -> Double, etc.) para permitir o uso em coleções e generics. O Autoboxing converte primitivos em wrappers automaticamente, e o Unboxing faz o caminho inverso, podendo disparar NullPointerException se o wrapper for null.",
        questions: [
          q("Por que as classes Wrapper (como Integer e Boolean) são indispensáveis em Java?", "Coleções da Java Collections Framework (como List e Map) só aceitam objetos de referência e não primitivos", ["Porque executam mais rápido que primitivos","Porque substituem o Garbage Collector"], "List<Integer> é válida, enquanto List<int> é proibida pela gramática de generics da linguagem."),
          q("O que é o mecanismo de \"Autoboxing\" em Java?", "A conversão automática e transparente de um tipo primitivo para sua respectiva classe wrapper feita pelo compilador", ["O empacotamento de arquivos .jar","A compressão de strings"], "Exemplo: Integer obj = 10; é traduzido internamente pelo compilador para Integer.valueOf(10)."),
          q("O que acontece se uma variável wrapper com valor null sofrer Unboxing automático (ex: Integer x = null; int y = x;)?", "Dispara a exceção NullPointerException em tempo de execução", ["A variável y assume o valor 0","O compilador gera erro"], "Ao tentar chamar x.intValue() em uma referência nula, a JVM dispara NPE imediatamente."),
          q("Qual é o impacto de performance do Autoboxing excessivo dentro de laços grandes?", "Cria milhões de objetos de curta duração no Heap, consumindo memória e sobrecarregando o Garbage Collector", ["Faz a internet cair","Desativa os testes unitários"], "Para contadores e acumuladores de alto desempenho em laços, use sempre primitivos puros."),
          t("Qual método estático da classe Integer é invocado pelo compilador durante o Autoboxing?", ["valueOf"], "Integer.valueOf(primitivo) é a chamada canônica de empacotamento.", "# metodo oficial de autoboxing de Integer"),
          g("Complete a conversão da lista de objetos para primitivo com unboxing seguro:", ["Integer wrapper = 42;\nif (wrapper != null) {\n    int primitivo = wrapper.intValue();\n}"], "intValue() extrai o primitivo com proteção prévia contra nulos.", "Integer wrapper = 42;\nif (wrapper != null) {\n    int primitivo = wrapper.____();\n}"),
          o("Ordene a correspondência entre tipo primitivo e sua respectiva classe Wrapper:", ["primitivo byte -> classe java.lang.Byte","primitivo int -> classe java.lang.Integer (nome estendido)","primitivo char -> classe java.lang.Character (nome estendido)","primitivo boolean -> classe java.lang.Boolean"], "Mapeamento canônico entre tipos primitivos e tipos de referência em Java."),
          p("Associe o conceito de empacotamento ao seu mecanismo correspondente:", [["Autoboxing","Conversão automática de primitivo para wrapper (int -> Integer)"],["Unboxing","Conversão automática de wrapper para primitivo (Integer -> int)"],["NullPointerException","Risco crítico ao realizar unboxing sobre referência nula"],["Integer.valueOf(10)","Método formal de instanciação com cache de inteiros"]], "Conceitos fundamentais da relação entre primitivos e classes wrapper em Java.")
        ]
      },
      {
        id: "java-c03-u4-l4",
        title: "Parsing de Strings: Integer.parseInt e Double.parseDouble",
        subtitle: "Parsing seguro · Tratamento de NumberFormatException",
        theory: "Para converter strings recebidas de entradas de usuário ou arquivos em números primitivos, utilizamos métodos estáticos de parsing como Integer.parseInt(str) e Double.parseDouble(str). Se o texto contiver caracteres não numéricos ou formato inválido, a JVM lança a exceção unchecked NumberFormatException.",
        questions: [
          q("Qual método estático converte uma String contendo dígitos em um número primitivo int?", "Integer.parseInt(str)", ["Integer.toInt(str)","String.toInt(str)"], "Integer.parseInt retorna o primitivo int puro, enquanto Integer.valueOf retorna o wrapper Integer."),
          q("Qual exceção em tempo de execução é disparada quando parseInt recebe um texto não numérico como \"abc\"?", "NumberFormatException", ["IllegalArgumentException","ParseException"], "NumberFormatException é uma subclasse de IllegalArgumentException e deve ser tratada para robustez."),
          q("Como fazer parsing de uma String numérica que representa um número em formato hexadecimal ou binário?", "Passando a base numérica (radix) como segundo argumento: Integer.parseInt(\"FF\", 16)", ["Usando Hex.parse()","Adicionando 0x na frente"], "Integer.parseInt(str, radix) aceita qualquer base entre 2 (binário) e 36."),
          q("Qual método deve ser utilizado para converter uma String com casas decimais em primitivo double?", "Double.parseDouble(str)", ["Double.toFloat(str)","Double.parse(str)"], "Converte textos formatados com ponto decimal (ex: \"3.14\") em um double de 64 bits."),
          t("Qual exceção de formato numérico inválido é lançada quando o parsing de string falha?", ["NumberFormatException"], "NumberFormatException alerta sobre strings não numéricas.", "# excecao de falha de parsing numerico"),
          g("Complete o bloco defensivo que captura falhas de conversão de texto para inteiro:", ["try {\n    int valor = Integer.parseInt(entrada);\n} catch (NumberFormatException e) {\n    System.err.println(\"Entrada não numérica\");\n}"], "Captura NumberFormatException caso a entrada contenha caracteres inválidos.", "try {\n    int valor = Integer.parseInt(entrada);\n} catch (____ e) {\n    System.err.println(\"Entrada não numérica\");\n}"),
          o("Ordene as etapas recomendadas para realizar o parsing seguro de uma entrada de usuário:", ["Sanitizar o texto de entrada removendo espaços periféricos com .trim()","Abrir um bloco try para envolver a chamada do método de parsing","Invocar Integer.parseInt(textoLimpo) na linha sob monitoramento","Capturar NumberFormatException no bloco catch para tratamento gracioso"], "Pipeline profissional para conversão e validação de strings numéricas em Java."),
          p("Associe o método de parsing ao tipo retornado:", [["Integer.parseInt(\"10\")","Retorna o tipo primitivo int puro (10)"],["Integer.valueOf(\"10\")","Retorna um objeto wrapper da classe Integer"],["Double.parseDouble(\"3.14\")","Retorna o tipo primitivo double puro (3.14)"],["Boolean.parseBoolean(\"true\")","Retorna o tipo primitivo boolean puro (true)"]], "Diferenças de retorno entre métodos parse e valueOf em classes wrapper.")
        ]
      },
      {
        id: "java-c03-u4-l5",
        title: "A classe BigDecimal para cálculos financeiros exatos",
        subtitle: "Precisão monetária · Eliminando erros de arredondamento de float/double",
        theory: "A classe BigDecimal em java.math representa números decimais com precisão arbitrária e controle explícito de arredondamento. Instanciada obrigatoriamente a partir de String (new BigDecimal(\"0.1\")) ou BigDecimal.valueOf(), ela elimina os erros binários do IEEE 754, sendo a escolha mandatória para moedas e juros.",
        questions: [
          q("Por que você NUNCA deve instanciar BigDecimal utilizando new BigDecimal(0.1) com um double?", "Porque o literal double 0.1 já ingressa com a imprecisão binária do IEEE 754 antes mesmo do construtor rodar", ["Porque o Java rejeita números menores que 1","Porque o construtor é privado"], "new BigDecimal(0.1) produz exatamente 0.1000000000000000055511151231257827021181583404541015625."),
          q("Quais são as duas formas corretas e seguras de instanciar um objeto BigDecimal com exatidão?", "new BigDecimal(\"0.1\") (com string) ou BigDecimal.valueOf(0.1)", ["new BigDecimal(0.1) e (BigDecimal) 0.1","BigDecimal.parse(0.1)"], "O construtor que recebe String e o método factory valueOf preservam com exatidão a representação decimal."),
          q("Como realizar operações matemáticas básicas com objetos BigDecimal (como adição e multiplicação)?", "Utilizando métodos orientados a objetos como .add(), .subtract(), .multiply() e .divide()", ["Usando os operadores + e * comuns","Usando Math.add()"], "Em Java não há sobrecarga de operadores; operações em BigDecimal devem invocar métodos explícitos."),
          q("Qual parâmetro é obrigatório ao dividir valores em BigDecimal com o método .divide()?", "Modo de arredondamento (RoundingMode) e escala de casas decimais para evitar ArithmeticException em dízimas", ["A moeda corrente do país","A taxa de câmbio"], "Dividir 1 por 3 sem especificar RoundingMode lança ArithmeticException (Non-terminating decimal expansion)."),
          t("Qual enumeração em java.math define estratégias de arredondamento como HALF_UP e HALF_EVEN?", ["RoundingMode"], "RoundingMode.HALF_UP é o padrão financeiro bancário.", "# enum de arredondamento do BigDecimal"),
          g("Complete a divisão financeira exata especificando o modo de arredondamento bancário:", ["BigDecimal resultado = valor.divide(divisor, 2, RoundingMode.HALF_UP);"], "RoundingMode.HALF_UP evita que dízimas infinitas quebrem o cálculo monetário.", "BigDecimal resultado = valor.divide(divisor, 2, RoundingMode.____);"),
          o("Ordene as etapas para calcular um desconto monetário com BigDecimal:", ["Instanciar o preço base com BigDecimal.valueOf(100.00)","Instanciar a alíquota de desconto a partir de texto: new BigDecimal(\"0.10\")","Calcular a dedução multiplicando com preco.multiply(taxa)","Subtrair a dedução do preço base invocando preco.subtract(deducao)"], "Fluxo correto de cálculo financeiro imutável com a classe BigDecimal."),
          p("Associe a operação com BigDecimal ao seu método correspondente:", [["Adição monetária","a.add(b)"],["Subtração monetária","a.subtract(b)"],["Multiplicação monetária","a.multiply(b)"],["Divisão monetária com escala","a.divide(b, 2, RoundingMode.HALF_EVEN)"]], "Métodos essenciais de aritmética decimal exata na classe BigDecimal.")
        ]
      }
    ],
    5: [
      {
        id: "java-c03-u5-l1",
        title: "Operadores aritméticos básicos (+, -, *, /, %)",
        subtitle: "Cálculos · Divisão inteira vs divisão decimal em Java",
        theory: "Java fornece operadores aritméticos binários clássicos. A divisão entre dois inteiros (int / int) realiza estritamente divisão inteira truncada em direção a zero, descartando casas decimais (ex: 5 / 2 resulta em 2). Para obter resultado fracionário, pelo menos um dos operandos deve ser do tipo float ou double.",
        questions: [
          q("Qual é o resultado da divisão 7 / 2 entre números inteiros em Java?", "3 (o tipo resultante é int e a fração decimal é truncada)", ["3.5","4"], "Como ambos os operandos são do tipo int, a JVM realiza a divisão euclidiana inteira."),
          q("Como forçar a divisão entre duas variáveis inteiras dividendo e divisor a produzir um resultado decimal double?", "Realizando o casting de pelo menos um operando para double: (double) dividendo / divisor", ["Dividindo por 1.0 depois","Declarando a variável com final"], "Promover um dos operandos para double força a promoção de toda a operação para precisão de 64 bits."),
          q("O que o operador de resto ou módulo (%) calcula em Java?", "Retorna o resto da divisão inteira entre dois números (ex: 7 % 2 resulta em 1)", ["Calcula a porcentagem","Eleva o número ao quadrado"], "Muito utilizado para identificar se números são pares (n % 2 == 0) e em funções hash."),
          q("Qual é o resultado da divisão inteira de número positivo por zero (10 / 0) em Java?", "Dispara a exceção ArithmeticException: / by zero em tempo de execução", ["Retorna Infinity","Retorna NaN"], "Divisão inteira por zero é ilegal na JVM e gera interrupção imediata via ArithmeticException."),
          t("Qual operador aritmético calcula o resto da divisão inteira entre dois operandos?", ["%"], "% é o operador módulo.", "# operador modulo em Java"),
          g("Complete o casting para que a divisão resulte em número decimal:", ["double resultado = (double) a / b;"], "(double) a promove a operação para divisão de ponto flutuante.", "double resultado = ____ a / b;"),
          o("Ordene as operações aritméticas pelo tipo do resultado produzido:", ["10 / 4: produz o número inteiro int 2","10.0 / 4: produz o número decimal double 2.5","10 % 3: produz o resto inteiro int 1","10.0 / 0.0: produz o valor especial double Double.POSITIVE_INFINITY"], "Comparativo de tipos resultantes em operações aritméticas em Java."),
          p("Associe a operação aritmética em Java ao seu resultado formal:", [["5 / 2","2 (divisão inteira truncada)"],["5.0 / 2","2.5 (divisão com ponto flutuante)"],["5 % 2","1 (resto da divisão inteira)"],["10 / 0","Disparo de ArithmeticException em tempo de execução"]], "Resultados fundamentais de operações aritméticas em Java.")
        ]
      },
      {
        id: "java-c03-u5-l2",
        title: "Operadores de incremento e decremento (++ e --)",
        subtitle: "Pré e pós-incremento · Diferença entre ++i e i++ em expressões",
        theory: "Os operadores unários ++ e -- incrementam ou decrementam uma variável inteira em 1. O pré-incremento (++i) atualiza a variável antes de fornecer seu valor para a expressão que a envolve. O pós-incremento (i++) fornece o valor atual para a expressão primeiro e só depois atualiza a variável na memória.",
        questions: [
          q("Qual é a diferença entre int b = ++a; (pré-incremento) e int b = a++; (pós-incremento)?", "++a incrementa a variável primeiro e depois entrega o valor; a++ entrega o valor original e depois incrementa", ["Não há nenhuma diferença","a++ incrementa 2 unidades"], "O momento de atualização em relação à avaliação da expressão muda conforme a posição do operador."),
          q("Se int x = 5; qual será o valor de y após executar int y = x++;?", "y = 5 e x = 6 (y recebe o valor original 5 antes de x ser incrementado)", ["y = 6 e x = 6","y = 5 e x = 5"], "No pós-incremento, o valor antes da soma é copiado para y antes de x virar 6."),
          q("Se int x = 5; qual será o valor de y após executar int y = ++x;?", "y = 6 e x = 6 (x é incrementado para 6 primeiro e depois atribuído a y)", ["y = 5 e x = 6","y = 7 e x = 6"], "No pré-incremento, a variável é alterada antes de ser utilizada na expressão de atribuição."),
          q("Por que a instrução complexa a = a++ + ++a; é considerada um grave antipadrão de código?", "Gera código obscuro, confuso e altamente propenso a erros de precedência e legibilidade", ["Porque o Java proíbe somar duas vezes","Porque o arquivo .class trava"], "Operadores de incremento devem ser usados isoladamente como instruções autônomas (i++;)."),
          t("Qual operador unário adiciona 1 unidade à variável inteira?", ["++"], "i++ ou ++i soma 1 à variável.", "# operador de incremento"),
          g("Complete o incremento unitário do contador de laço:", ["contador++;"], "contador++ atualiza a contagem para a próxima volta.", "contador____;"),
          o("Ordene a sequência de passos da expressão: int a = 1; int b = a++ * 2;", ["Avaliar o valor corrente de a (que vale 1)","Calcular a multiplicação 1 * 2 resultando em 2 para a variável b","Incrementar a variável a na memória de 1 para 2","Concluir com a valendo 2 e b valendo 2"], "Linha do tempo de avaliação de pós-incremento em expressões compostas."),
          p("Associe a instrução ao comportamento do operador:", [["++i (pré-incremento)","Incrementa a variável antes de avaliar a expressão circundante"],["i++ (pós-incremento)","Avalia a expressão com o valor original e incrementa após"],["--i (pré-decremento)","Subtrai 1 da variável antes de avaliar a expressão circundante"],["i-- (pós-decremento)","Avalia a expressão com o valor original e decrementa após"]], "Distinção formal entre operadores pré-fixados e pós-fixados em Java.")
        ]
      },
      {
        id: "java-c03-u5-l3",
        title: "Operadores de atribuição composta (+=, -=, *=)",
        subtitle: "Atalhos · Casting implícito escondido em atribuições compostas",
        theory: "Operadores de atribuição composta (+=, -=, *=, /=, %=) atualizam a variável com o resultado da operação. Uma peculiaridade crítica de Java é que atribuições compostas realizam casting implícito oculto: a expressão x += y é compilada internamente como x = (TipoDeX)(x + y), ocultando potenciais overflows.",
        questions: [
          q("A qual instrução completa a atribuição composta x += 5 equivale em Java?", "x = (TipoDeX)(x + 5) (com um casting implícito automático para o tipo original de x)", ["x = x + 5 estrito","x + 5;"], "O casting implícito do operador composto pode mascarar truncamentos silenciosos de tipo."),
          q("Por que byte b = 1; b = b + 1; não compila, mas b += 1; compila perfeitamente?", "b + 1 vira int por promoção automática; b += 1 injeta o cast implícito (byte)(b + 1) automaticamente", ["Porque o operador += é mais novo","Porque 1 é um byte"], "Exemplo clássico da linguagem: operadores compostos possuem casting embutido na especificação da JLS."),
          q("O que acontece ao executar: short s = 32767; s += 1;?", "Ocorre overflow silencioso e s passa a valer o número negativo -32768 sem alertas do compilador", ["Lança ArithmeticException","O valor trava em 32767"], "O cast implícito (short)(32767 + 1) trunca os bits superiores sem lançar exceção."),
          q("Qual operador de atribuição composta multiplica a variável pelo valor informado e atualiza seu estado?", "*=", ["**=","*+="], "saldo *= taxa atualiza a variável multiplicando seu conteúdo anterior."),
          t("Qual operador de dois caracteres combina adição e escrita com cast implícito em Java?", ["+="], "x += y atualiza x somando y.", "# operador de atribuicao composta de soma"),
          g("Complete a atualização compacta da contagem acumulada:", ["totalAcumulado += novoValor;"], "+= soma o novo valor ao total acumulado.", "totalAcumulado ____ novoValor;"),
          o("Ordene a desconstrução compilada da instrução byte b = 10; b += 5;:", ["Leitura do valor atual de b (10)","Promoção numérica e cálculo da soma (10 + 5 = 15 do tipo int)","Aplicação do casting de estreitamento implícito: (byte) 15","Gravação do valor convertido de volta na variável b"], "Ciclo de expansão e compilação de atribuições compostas pelo javac."),
          p("Associe a atribuição composta à sua equivalência exata:", [["x += y","x = (TipoDeX)(x + y)"],["x -= y","x = (TipoDeX)(x - y)"],["x *= y","x = (TipoDeX)(x * y)"],["x /= y","x = (TipoDeX)(x / y)"]], "Mapeamento de operadores de atribuição compostos na especificação da JLS.")
        ]
      },
      {
        id: "java-c03-u5-l4",
        title: "A classe Math: métodos estáticos e constantes",
        subtitle: "Funções matemáticas · Math.sqrt, Math.pow, Math.abs e Math.PI",
        theory: "A classe java.lang.Math reúne métodos estáticos e constantes para cálculos matemáticos universais. Seus métodos não exigem instanciação (o construtor é privado). Dentre as funções mais comuns estão Math.sqrt() para raiz quadrada, Math.pow() para potenciação, Math.abs() para valor absoluto e a constante Math.PI.",
        questions: [
          q("Por que não podemos criar uma instância da classe Math com new Math()?", "A classe Math possui construtor privado e é composta exclusivamente por constantes e métodos estáticos", ["Porque é uma interface abstrata","Porque a classe foi depreciada"], "Projetada como classe utilitária pura conforme as melhores práticas de orientação a objetos."),
          q("Qual método da classe Math calcula a raiz quadrada de um número double?", "Math.sqrt(d)", ["Math.root(d)","Math.radic(d)"], "Math.sqrt(25.0) retorna 5.0 do tipo double."),
          q("Qual é o tipo retornado pelo método de potenciação Math.pow(base, expoente)?", "double (mesmo se passarmos inteiros, o retorno de Math.pow é sempre double)", ["int","long"], "Para calcular potências inteiras com resultado int, deve-se aplicar cast explícito (int) Math.pow(x, y)."),
          q("Qual método de Math realiza o arredondamento matemático tradicional para o inteiro long mais próximo?", "Math.round(d)", ["Math.floor(d)","Math.ceil(d)"], "Math.round(4.6) retorna o valor 5L, enquanto Math.floor() trunca sempre para baixo."),
          t("Qual método da classe Math retorna o valor absoluto positivo descartando o sinal negativo?", ["Math.abs"], "Math.abs(-10) retorna 10.", "# metodo de valor absoluto de Math"),
          g("Complete o cálculo da hipotenusa usando o método de raiz quadrada da classe Math:", ["double hipotenusa = Math.sqrt(a * a + b * b);"], "Math.sqrt calcula a raiz quadrada com precisão dupla.", "double hipotenusa = Math.____(a * a + b * b);"),
          o("Ordene as constantes e métodos da classe Math por funcionalidade:", ["Math.PI e Math.E: constantes matemáticas de precisão dupla","Math.abs(x): cálculo de módulo ou distância absoluta","Math.pow(x, y): cálculo de potenciação fracionária ou inteira","Math.random(): geração de pseudoaleatórios no intervalo [0.0, 1.0)"], "Conjunto de utilitários centrais fornecidos por java.lang.Math."),
          p("Associe a chamada da classe Math ao seu resultado numérico:", [["Math.abs(-42)","42 (valor absoluto positivo)"],["Math.sqrt(64.0)","8.0 (raiz quadrada precisa)"],["Math.pow(2.0, 3.0)","8.0 (potência em ponto flutuante)"],["Math.max(10, 20)","20 (seleção do maior argumento)"]], "Operações matemáticas fundamentais da classe java.lang.Math.")
        ]
      },
      {
        id: "java-c03-u5-l5",
        title: "Estouro numérico (Overflow e Underflow)",
        subtitle: "Limites · Comportamento cíclico silencioso e Math.addExact()",
        theory: "Operações com tipos primitivos em Java não lançam exceção quando extrapolam o limite de sua capacidade (overflow): os bits excedentes são descartados silenciosamente e o valor dá a volta (wrap around) para números negativos. O Java 8 introduziu métodos como Math.addExact() que disparam ArithmeticException em estouros.",
        questions: [
          q("O que acontece se somarmos 1 ao maior inteiro positivo possível (Integer.MAX_VALUE + 1) em Java?", "Ocorre overflow silencioso e o valor vira o menor inteiro negativo possível (Integer.MIN_VALUE)", ["Lança ArithmeticException imediata","O computador trava"], "A representação em complemento de dois faz o valor ciclar diretamente para o negativo sem erros nativos."),
          q("Como prevenir cálculos que extrapolam limites sem aviso em operações aritméticas críticas?", "Utilizando métodos seguros da classe Math como Math.addExact() e Math.multiplyExact()", ["Usando o operador ++ duas vezes","Desativando o coletor de lixo"], "Os métodos *Exact() realizam checagem estrita de estouro e lançam ArithmeticException caso ocorra overflow."),
          q("Qual exceção os métodos Math.addExact(), Math.subtractExact() e Math.multiplyExact() disparam em overflow?", "ArithmeticException (com a mensagem \"integer overflow\")", ["NullPointerException","BufferOverflowException"], "Permite capturar falhas de limite e tomar medidas de proteção ou escalar para BigInteger."),
          q("Qual constante estática da classe Integer define o valor teto de um inteiro de 32 bits?", "Integer.MAX_VALUE (2.147.483.647 ou 2^31 - 1)", ["Integer.TOP","Integer.LIMIT"], "Ponto crítico de fronteira para validação de integridade em sistemas financeiros e contadores."),
          t("Qual método da classe Math soma dois inteiros disparando ArithmeticException caso ocorra overflow?", ["Math.addExact"], "Math.addExact(x, y) previne estouro silencioso de inteiros.", "# soma com protecao contra overflow"),
          g("Complete a soma segura de inteiros com proteção contra estouro de bits:", ["int total = Math.addExact(a, b);"], "Math.addExact garante falha explícita caso a soma exceda Integer.MAX_VALUE.", "int total = Math.____(a, b);"),
          o("Ordene os estados de um contador de 32 bits sofrendo overflow clássico:", ["Estado limite máximo positivo: Integer.MAX_VALUE (2.147.483.647)","Instrução de soma executada: Integer.MAX_VALUE + 1","Inversão de bit de sinal no complemento de dois na ALU","Estado pós-estouro: Integer.MIN_VALUE (-2.147.483.648)"], "Mecanismo físico do estouro de bits (wrap around) no padrão complemento de dois."),
          p("Associe o comportamento à estratégia de tratamento de overflow:", [["Operador + tradicional","Estouro silencioso cíclico sem aviso (wrap around)"],["Math.addExact()","Disparo de ArithmeticException prevenindo corrupção de dados"],["BigInteger","Estrutura de dados imutável com crescimento de precisão dinâmica"],["Integer.MAX_VALUE","Limite máximo positivo de representação em 32 bits"]], "Estratégias de mitigação e comportamentos de overflow em Java.")
        ]
      }
    ],
    6: [
      {
        id: "java-c03-u6-l1",
        title: "Operadores relacionais (==, !=, <, >, <=, >=)",
        subtitle: "Comparações primitivas · Avaliando igualdade e ordem numérica",
        theory: "Operadores relacionais comparam operandos primitivos e retornam estritamente um valor primitivo boolean (true ou false). Os operadores == e != comparam igualdade e diferença de valores. Os operadores <, >, <= e >= comparam grandezas relativas, aplicando promoção numérica prévia se os tipos forem mistos.",
        questions: [
          q("Qual é o tipo de dado do resultado de qualquer comparação feita com operadores relacionais em Java?", "Tipo primitivo boolean (exclusivamente true ou false)", ["Tipo int (0 ou 1)","Tipo String"], "Java é fortemente tipado e não admite coerção de booleanos para inteiros."),
          q("O que o compilador faz ao avaliar uma comparação relacional entre tipos mistos (ex: 5 < 5.5)?", "Promove o inteiro 5 automaticamente para double 5.0 antes de efetuar a comparação relacional", ["Rejeita com erro de compilação","Trunca o 5.5 para 5"], "Aplica a regra de promoção numérica padrão, comparando os valores na precisão do tipo mais amplo."),
          q("Qual é o resultado da comparação relacional entre caracteres: 'a' < 'b'?", "true (pois o código Unicode de 'a' é 97 e de 'b' é 98)", ["false","Erro de compilação"], "Caracteres primitivos char são compatíveis com ordenação numérica através de seus códigos UTF-16."),
          q("O operador == compara o conteúdo interno quando aplicado a dois arrays (ex: arr1 == arr2)?", "Não; compara apenas se ambos apontam para o mesmo endereço de memória no Heap", ["Sim, compara os elementos","Lança exceção"], "Para comparar o conteúdo de arrays primitivos em Java, deve-se utilizar Arrays.equals(arr1, arr2)."),
          t("Qual método utilitário da classe java.util.Arrays compara o conteúdo de dois arrays?", ["Arrays.equals"], "Arrays.equals(a, b) compara os elementos internos dos arrays.", "# comparador de conteudo de arrays"),
          g("Complete a condicional usando o operador relacional maior ou igual:", ["if (saldo >= valorSaque) {\n    efetuarSaque();\n}"], ">= valida se o saldo é suficiente cobrindo a igualdade exata.", "if (saldo ____ valorSaque) {\n    efetuarSaque();\n}"),
          o("Ordene as avaliações relacionais pelo resultado booleano:", ["10 > 5: resulta no booleano true","10 == 10: resulta no booleano true","10 != 10: resulta no booleano false","10 <= 5: resulta no booleano false"], "Avaliações fundamentais de operadores relacionais em tipos primitivos Java."),
          p("Associe a comparação relacional ao seu resultado booleano:", [["10 >= 10","true (satisfaz a igualdade)"],["10 > 10","false (valores estritamente iguais)"],["'A' == 65","true (char 'A' promovido coincide com código 65)"],["false == false","true (ambos são literais idênticos)"]], "Exemplos práticos de comparação com operadores relacionais em Java.")
        ]
      },
      {
        id: "java-c03-u6-l2",
        title: "Armadilha de igualdade com Wrappers e cache de Integer",
        subtitle: "Cache de -128 a 127 · Por que Integer == Integer falha fora do cache",
        theory: "A JVM mantém um cache interno de instâncias para a classe Integer na faixa de -128 a 127. Comparar wrappers com == na faixa do cache (Integer a = 100, b = 100; a == b) resulta em true por reaproveitamento de instâncias. Acima de 127 (Integer a = 200, b = 200; a == b), o resultado é false, exigindo sempre .equals().",
        questions: [
          q("Por que a comparação Integer a = 127, b = 127; a == b retorna true, mas para 128 retorna false?", "A JVM armazena em cache objetos Integer de -128 a 127; acima disso, instâncias separadas são alocadas no Heap", ["Porque 128 é um número primo","Porque o Java limita a memória"], "Armadilha clássica de entrevistas e produção: comparar objetos Wrapper com == compara endereços de memória."),
          q("Qual método deve ser OBRIGATORIAMENTE utilizado para comparar dois objetos Wrapper (como Integer ou Long)?", ".equals() (ex: a.equals(b))", ["O operador ==","compareTo() obrigatoriamente"], "O método equals() compara o valor primitivo empacotado sem depender da coincidência de cache."),
          q("Qual faixa de valores inteiros a especificação da Java Language Specification (JLS) obriga a estar no cache?", "De -128 até 127 inclusive", ["De 0 até 255","De -1000 até 1000"], "Instâncias nessa faixa são criadas na inicialização da JVM pelo método Integer.valueOf()."),
          q("O que acontece se compararmos um primitivo int com um wrapper Integer usando == (ex: int a = 200; Integer b = 200; a == b)?", "Retorna true porque o wrapper b sofre unboxing automático para int antes da comparação numérica", ["Retorna false","Gera erro de compilação"], "Quando há um primitivo e um wrapper no operador ==, a JVM desembala o wrapper para primitivo."),
          t("Qual método canônico de comparação de igualdade deve ser usado em classes Wrapper?", ["equals"], "objA.equals(objB) compara o valor contido no wrapper com segurança.", "# comparacao segura de wrappers"),
          g("Complete a comparação segura entre dois objetos Integer fora da faixa de cache:", ["Integer a = 500;\nInteger b = 500;\nif (a.equals(b)) {\n    System.out.println(\"Valores iguais\");\n}"], "equals() compara os valores 500 sem cair na armadilha de referências distintas.", "Integer a = 500;\nInteger b = 500;\nif (a.____(b)) {\n    System.out.println(\"Valores iguais\");\n}"),
          o("Ordene a análise de comparação de dois Wrappers (Integer a, Integer b) com ==:", ["Verificar se os valores estão na faixa de cache de -128 a 127","Se estiverem na faixa: a JVM reutilizou o mesmo ponteiro (a == b avalia para true)","Se estiverem fora da faixa: novas instâncias foram alocadas (a == b avalia para false)","Regra definitiva de engenharia: nunca use == para comparar objetos Wrapper"], "Diagnóstico e análise do comportamento do Integer Cache em Java."),
          p("Associe a comparação entre Wrappers ao seu resultado formal:", [["Integer.valueOf(100) == Integer.valueOf(100)","true por reaproveitamento de instância no cache"],["Integer.valueOf(200) == Integer.valueOf(200)","false por alocação de objetos separados fora do cache"],["Integer.valueOf(200).equals(Integer.valueOf(200))","true por comparação de conteúdo com equals"],["new Integer(10) == new Integer(10)","false pois new sempre força nova referência separada"]], "Comparações de igualdade e armadilhas do IntegerCache em Java.")
        ]
      },
      {
        id: "java-c03-u6-l3",
        title: "A interface Comparable e o método compareTo()",
        subtitle: "Ordem natural · Retornando negativo, zero ou positivo",
        theory: "A interface java.lang.Comparable<T> define a ordem natural de ordenação de objetos através do método int compareTo(T o). O contrato estipula: retorna número negativo se this < o, zero se this for equivalente a o, e número positivo se this > o. Classes fundamentais como String, Integer e LocalDate a implementam.",
        questions: [
          q("Quais são os três valores contratuais que o método compareTo(T outro) pode retornar?", "Número negativo (menor), zero (igual) e número positivo (maior)", ["Apenas -1, 0 e 1 estritos","true, false e null"], "Qualquer inteiro negativo (ex: -5) indica menor; qualquer positivo (ex: 42) indica maior."),
          q("Qual é a relação recomendada entre o método compareTo() e o método equals() de uma classe?", "Devem ser consistentes: (a.compareTo(b) == 0) deve ser equivalente a a.equals(b) == true", ["Devem ser opostos","Não possuem relação"], "Inconsistência entre compareTo e equals causa comportamentos anômalos em coleções como TreeSet e TreeMap."),
          q("Como comparar dois objetos String alfabeticamente utilizando compareTo?", "str1.compareTo(str2)", ["str1.isBefore(str2)","str1.order(str2)"], "Compara lexicograficamente os códigos dos caracteres, retornando negativo se str1 vier antes de str2."),
          q("Qual classe utilitária do Java 8 facilita a criação de comparadores compostos sem cálculos manuais?", "java.util.Comparator (com métodos factory como Comparator.comparing())", ["Collections.sorter()","OrderUtil"], "Permite criar ordenações declarativas e encadeadas: Comparator.comparing(Pessoa::getNome).thenComparing(...)"),
          t("Qual interface da biblioteca padrão de Java exige a implementação do método compareTo?", ["Comparable"], "public interface Comparable<T> { int compareTo(T o); }.", "# interface de ordem natural"),
          g("Complete a verificação que confirma se a data anterior precede a data posterior:", ["if (data1.compareTo(data2) < 0) {\n    System.out.println(\"Data 1 é anterior\");\n}"], "Menor que zero indica que data1 é anterior a data2 na ordem natural.", "if (data1.compareTo(data2) ____ 0) {\n    System.out.println(\"Data 1 é anterior\");\n}"),
          o("Ordene as etapas da implementação do método compareTo em uma classe Produto:", ["Comparar o campo de prioridade primário (ex: categoria)","Se a comparação primária não for zero: retornar imediatamente o valor apurado","Se for zero: prosseguir para o desempate pelo campo secundário (ex: preco)","Retornar o resultado final do desempate para o chamador"], "Estruturação canônica do método compareTo com múltiplos critérios."),
          p("Associe o retorno de a.compareTo(b) ao seu significado semântico:", [["Retorno negativo (< 0)","O objeto a é menor e precede o objeto b na ordem"],["Retorno zero (== 0)","O objeto a possui a mesma grandeza relativa do objeto b"],["Retorno positivo (> 0)","O objeto a é maior e sucede o objeto b na ordem"],["Comparator.naturalOrder()","Comparador pré-fabricado que delega para a ordem Comparable"]], "Convenções de retorno e semântica do método compareTo em Java.")
        ]
      },
      {
        id: "java-c03-u6-l4",
        title: "A classe utilitária java.util.Objects",
        subtitle: "Robustez · Objects.equals() e Objects.requireNonNull()",
        theory: "A classe utilitária java.util.Objects (introduzida no Java 7) centraliza métodos estáticos seguros contra valores nulos. O método Objects.equals(a, b) compara dois objetos tolerando referências nulas sem disparar NullPointerException. O método Objects.requireNonNull(obj) valida precondições mandatórias em construtores.",
        questions: [
          q("Qual é o benefício primário de utilizar Objects.equals(a, b) em vez de a.equals(b)?", "Objects.equals é nulo-seguro (null-safe): retorna true se ambos forem null e false se um for null sem disparar NPE", ["Executa em paralelo","Ignora maiúsculas e minúsculas"], "Elimina verificações manuais prolixas de if (a != null && a.equals(b))."),
          q("Qual é a função do método Objects.requireNonNull(objeto, \"Mensagem\")?", "Valida se o argumento não é nulo; se for null, lança imediatamente NullPointerException com a mensagem customizada", ["Converte o objeto para String","Remove os atributos nulos"], "Padrão idiomático de excelência para validação de parâmetros obrigatórios em construtores."),
          q("Qual método de Objects gera um código de dispersão (hash code) seguro combinando múltiplos atributos?", "Objects.hash(campo1, campo2, campo3)", ["Objects.createHash()","Objects.md5()"], "Facilita a implementação limpa e robusta do método hashCode() em classes Java."),
          q("O que Objects.isNull(obj) e Objects.nonNull(obj) retornam?", "Retornam valores booleanos, sendo altamente úteis como referências de métodos em Streams (filter(Objects::nonNull))", ["Lançam erro se for null","Retornam o próprio objeto"], "Promovem estilo funcional limpo na manipulação de fluxos de dados com coleções."),
          t("Qual classe utilitária do pacote java.util centraliza métodos estáticos null-safe de comparação e validação?", ["Objects"], "java.util.Objects reúne utilitários nulo-seguros fundamentais.", "# classe utilitaria java util Objects"),
          g("Complete a validação obrigatória de parâmetro no construtor:", ["this.email = Objects.requireNonNull(email, \"O email não pode ser nulo\");"], "requireNonNull assegura que a instância nunca receba estado nulo inválido.", "this.email = Objects.____(email, \"O email não pode ser nulo\");"),
          o("Ordene a lógica de validação executada internamente por Objects.equals(a, b):", ["Verificar se a == b (se são a mesmíssima referência ou ambos null, retorna true)","Verificar se o operando da esquerda (a) não é nulo","Invocar e retornar o resultado da chamada a.equals(b)","Se a for nulo e b não for nulo, retornar false"], "Algoritmo nulo-seguro implementado em java.util.Objects.equals."),
          p("Associe o método da classe Objects à sua utilidade:", [["Objects.equals(a, b)","Comparação de igualdade segura contra referências nulas"],["Objects.requireNonNull(x)","Validação de pré-condição com disparo de NPE imediato"],["Objects.hash(...args)","Cálculo de hash code consolidado para múltiplos campos"],["Objects.nonNull(x)","Predicado booleano para filtragem segura em Streams"]], "Métodos utilitários fundamentais da classe java.util.Objects.")
        ]
      },
      {
        id: "java-c03-u6-l5",
        title: "Comparação de ponto flutuante: Double.compare()",
        subtitle: "Padrão IEEE 754 · Comparando NaN e -0.0 com precisão",
        theory: "Comparar números de ponto flutuante com operadores relacionais (== ou <) falha diante de valores especiais do IEEE 754: NaN == NaN é false, e 0.0 == -0.0 é true. O método estático Double.compare(d1, d2) implementa a ordem estrita canônica, tratando NaN como igual a si mesmo e maior que todos os números.",
        questions: [
          q("Por que você deve preferir Double.compare(d1, d2) em vez do operador relacional == para ponto flutuante?", "Double.compare implementa a ordem estrita do IEEE 754, tratando corretamente valores NaN e diferenciando -0.0 de +0.0", ["Porque o operador == é proibido com double","Double.compare é mais rápido"], "Garante consistência matemática ao ordenar coleções ou comparar resultados científicos."),
          q("Qual é o retorno de Double.compare(Double.NaN, Double.NaN)?", "0 (zero, indicando que são considerados iguais na ordem estrita)", ["-1","ArithmeticException"], "Ao contrário de NaN == NaN (que é false), Double.compare considera NaNs equivalentes para ordenação."),
          q("Como Double.compare trata a relação entre +0.0 e -0.0?", "Considera -0.0 menor que +0.0 (retorna positivo se comparado +0.0 com -0.0)", ["Considera perfeitamente iguais","Lança exceção"], "Permite distinguir zeros com sinais originados de aproximações de limites assintóticos."),
          q("Qual é a convenção de retorno numérico do método Double.compare(d1, d2)?", "Retorna negativo se d1 < d2, zero se d1 for igual a d2, e positivo se d1 > d2", ["Retorna true ou false","Retorna a diferença em módulo"], "Adota a mesma assinatura de contrato da interface Comparable."),
          t("Qual classe wrapper fornece o método estático compare para ponto flutuante de 64 bits?", ["Double"], "Double.compare(d1, d2) compara ponto flutuante estritamente.", "# classe do metodo compare para double"),
          g("Complete a comparação de precisão entre duas métricas de ponto flutuante:", ["if (Double.compare(metricaA, metricaB) == 0) {\n    System.out.println(\"Métricas equivalentes\");\n}"], "Double.compare lida com todas as anomalias do padrão IEEE 754 com segurança.", "if (____.compare(metricaA, metricaB) == 0) {\n    System.out.println(\"Métricas equivalentes\");\n}"),
          o("Ordene os valores de ponto flutuante conforme a ordenação canônica de Double.compare (do menor para o maior):", ["-Double.MAX_VALUE (número negativo de maior magnitude)","-0.0 (zero negativo)","+0.0 (zero positivo)","Double.NaN (considerado maior que todos os números e que Double.POSITIVE_INFINITY)"], "Ordenação total estrita implementada por Double.compare no ecossistema Java."),
          p("Associe a comparação ao resultado de Double.compare(d1, d2):", [["Double.compare(Double.NaN, Double.NaN)","0 (NaN considerado equivalente a NaN)"],["Double.compare(0.0, -0.0)","Positivo (zero positivo é considerado maior que zero negativo)"],["Double.compare(1.5, 2.5)","Negativo (1.5 é menor que 2.5)"],["Double.compare(3.14, 3.14)","0 (valores numéricos idênticos)"]], "Resultados contratuais do método estático Double.compare em Java.")
        ]
      }
    ],
    7: [
      {
        id: "java-c03-u7-l1",
        title: "O tipo primitivo boolean e operadores lógicos",
        subtitle: "Lógica booleana · true, false e operadores de conjunção e negação",
        theory: "Em Java, o tipo primitivo boolean aceita estritamente apenas dois literais: true e false. Diferente de linguagens como C ou Python, inteiros (0 ou 1) não podem ser convertidos para boolean nem usados como condições em if ou while. O compilador Java impõe checagem estrita de tipos para operações lógicas.",
        questions: [
          q("Quais são os únicos valores literais válidos para o tipo primitivo boolean em Java?", "true e false em letras minúsculas", ["0 e 1","TRUE, FALSE e NULL"], "Java não aceita inteiros nem valores numéricos em avaliações booleanas condicionais."),
          q("O que acontece ao tentar compilar o código: if (1) { System.out.println(\"Ok\"); }?", "Erro de compilação: incompatibilidade de tipos (int não pode ser convertido para boolean)", ["Imprime \"Ok\" normalmente","Lança NullPointerException em runtime"], "Java é fortemente tipado e não possui o conceito de valores truthy/falsy como JavaScript ou Python."),
          q("Qual operador unário inverte o valor lógico de uma expressão booleana em Java?", "O operador de exclamação (!)", ["O operador til (~)","A palavra-chave not"], "O operador ! inverte true para false e vice-versa."),
          q("Qual é a finalidade do operador lógico XOR (^) aplicado a valores booleanos?", "Retornar true se e somente se os dois operandos tiverem valores lógicos opostos", ["Retornar true quando ambos forem true","Elevar uma base lógica ao quadrado"], "No XOR booleano: true ^ false é true, enquanto true ^ true é false."),
          t("Qual palavra-chave literal representa o estado verdadeiro de um boolean em Java?", ["true"], "Os dois literais booleanos de Java são true e false.", "# literal booleano verdadeiro"),
          g("Complete a negação lógica da flag de bloqueio:", ["boolean usuarioLiberado = !usuarioBloqueado;"], "O operador unário ! inverte o valor da variável booleana.", "boolean usuarioLiberado = ____usuarioBloqueado;"),
          o("Ordene a precedência lógica dos operadores em Java do mais prioritário para o menor:", ["Operador unário de negação (!)","Operadores relacionais e de comparação (==, !=, <, >)","Operador de conjunção lógica (&&)","Operador de disjunção lógica (||)"], "Hierarquia formal de avaliação de operadores lógicos em Java."),
          p("Associe o operador lógico à sua respectiva semântica:", [["!","Negação unária invertendo o valor booleano"],["^","Disjunção exclusiva retornando true para operandos distintos"],["==","Igualdade lógica verificando se dois booleans possuem mesmo valor"],["!=","Desigualdade lógica verificando se os valores diferem"]], "Operadores fundamentais de manipulação booleana em Java.")
        ]
      },
      {
        id: "java-c03-u7-l2",
        title: "Curto-circuito: && e || versus & e |",
        subtitle: "Desempenho e segurança · Evitando execução desnecessária e exceções",
        theory: "Java oferece operadores de curto-circuito (&& e ||) e operadores completos (& e |). Com &&, se o primeiro operando for false, o segundo nem é avaliado. Com ||, se o primeiro for true, a avaliação para imediatamente. Isso protege contra NullPointerException ao testar referências antes de invocar métodos.",
        questions: [
          q("O que caracteriza o comportamento de curto-circuito no operador && em Java?", "Se o primeiro operando for false, o segundo não é avaliado nem executado", ["Ambos os lados sempre são executados","A JVM inverte os operandos antes do cálculo"], "Evita trabalho computacional desnecessário e chamadas nulas perigosas."),
          q("Por que a expressão (usuario != null && usuario.isAtivo()) é segura contra NullPointerException?", "Porque se usuario for null, && interrompe a checagem sem executar usuario.isAtivo()", ["Porque o compilador Java inicializa objetos automaticamente","Porque o operador . ignora null"], "O operador && atua como uma cláusula de guarda essencial na programação orientada a objetos."),
          q("Qual é a diferença funcional entre usar & simples e && duplo entre dois booleans?", "& sempre avalia ambos os operandos mesmo que o primeiro já determine o resultado final", ["& só funciona com números inteiros","& é mais rápido"], "& é o operador bit a bit que, com booleans, desativa o curto-circuito propositalmente."),
          q("Em qual situação a expressão (a || b) avaliará o operando b?", "Apenas se o operando a for avaliado como false", ["Sempre, independente do valor de a","Apenas se a for true"], "Se a for true, o operador || já tem certeza do resultado global e ignora b."),
          t("Qual operador de conjunção de dois caracteres implementa avaliação de curto-circuito?", ["&&"], "&& avalia a direita apenas se a esquerda for verdadeira.", "# conjuncao com curto circuito"),
          g("Complete a cláusula de guarda segura com o operador de curto-circuito correto:", ["if (lista != null && !lista.isEmpty()) {\n    processar();\n}"], "&& impede invocar .isEmpty() quando lista for nula.", "if (lista != null ____ !lista.isEmpty()) {\n    processar();\n}"),
          o("Ordene os passos de execução da expressão (x != 0 && (100 / x) > 2) quando x vale 0:", ["Avaliar o operando esquerdo: (x != 0)","Constatar que o resultado é false (pois x vale 0)","Aplicar o curto-circuito do operador &&","Retornar false imediatamente sem executar a divisão (100 / x)"], "Passos do curto-circuito prevenindo divisão por zero em tempo de execução."),
          p("Associe o operador ao seu padrão de avaliação de operandos:", [["&&","Curto-circuito: pula a direita se a esquerda for false"],["||","Curto-circuito: pula a direita se a esquerda for true"],["&","Avaliação completa: executa ambos os lados independentemente"],["|","Avaliação completa de disjunção: executa ambos os lados"]], "Diferenças de avaliação de curto-circuito versus completa em Java.")
        ]
      },
      {
        id: "java-c03-u7-l3",
        title: "Precedência de operadores lógicos e parênteses",
        subtitle: "Clareza sintática · Evitando ambiguidades em expressões condicionais",
        theory: "Na gramática de Java, operadores possuem ordem estrita de precedência: operadores aritméticos precedem relacionais, que precedem o operador unário !, seguido por && e por último ||. Parênteses explícitos devem ser empregados para garantir legibilidade e assegurar a intenção de negócio do desenvolvedor.",
        questions: [
          q("Qual operador possui maior precedência na expressão: a || b && c?", "O operador && possui precedência superior a ||", ["O operador ||","Eles possuem a mesma precedência e avaliam da direita para a esquerda"], "A expressão é interpretada pela JVM como a || (b && c)."),
          q("Por que é altamente recomendado usar parênteses explícitos mesmo quando a precedência padrão produz o resultado desejado?", "Para tornar a intenção do código inequívoca para revisores humanos e ferramentas de análise", ["Para que a JVM execute o código em multithreading","Porque o compilador exige parênteses"], "Legibilidade supera o conhecimento enciclopédico da tabela de precedência dos operadores."),
          q("Qual é o resultado da expressão lógica: false && true || true?", "true (pois false && true resulta em false, e false || true resulta em true)", ["false","Erro de sintaxe"], "Demonstra a avaliação sequencial com base na precedência de && sobre ||."),
          q("Como os operadores relacionais (ex: >, <, ==) se comportam em relação aos lógicos (&&, ||)?", "Operadores relacionais têm precedência mais alta e são avaliados antes dos lógicos", ["Operadores lógicos são avaliados primeiro","A precedência varia conforme os tipos"], "Assim, em x > 0 && y < 10, as comparações são calculadas antes da conjunção."),
          t("Qual símbolo de pontuação deve ser utilizado para agrupar e forçar a precedência desejada em uma expressão?", ["()"], "Parênteses agrupam subexpressões.", "# delimitadores de precedencia"),
          g("Complete o agrupamento que prioriza a disjunção antes da conjunção:", ["boolean elegivel = (ativo || pendente) && pontuacao > 50;"], "Parênteses forçam a avaliação do OU antes do E.", "boolean elegivel = ____ativo || pendente____ && pontuacao > 50;"),
          o("Ordene os elementos da expressão pela ordem de resolução do compilador Java:", ["Cálculo aritmético interno nos operandos","Avaliação dos operadores relacionais de comparação","Resolução das conjunções com o operador &&","Resolução final das disjunções com o operador ||"], "Fluxo de prioridade padrão na avaliação de expressões condicionais em Java."),
          p("Associe a expressão à sua interpretação canônica com parênteses explícitos:", [["!ativo && logado","(!ativo) && logado"],["a && b || c","(a && b) || c"],["a || b && c","a || (b && c)"],["x > 5 && y < 3","(x > 5) && (y < 3)"]], "Mapeamento de precedência implícita para parênteses explícitos em Java.")
        ]
      },
      {
        id: "java-c03-u7-l4",
        title: "Expressões booleanas compostas e Leis de De Morgan",
        subtitle: "Refatoração lógica · Simplificando condicionais complexas e negadas",
        theory: "As Leis de De Morgan definem que a negação de uma conjunção equivale à disjunção das negações: !(a && b) equivale a (!a || !b). Da mesma forma, !(a || b) equivale a (!a && !b). Aplicar essas leis permite refatorar condicionais difíceis de ler em expressões diretas, eliminando negações aninhadas no código.",
        questions: [
          q("De acordo com as Leis de De Morgan, qual expressão é logicamente equivalente a !(a && b)?", "!a || !b", ["!a && !b","!(a) && !(b)"], "A negação do E transforma-se no OU com os operandos individuais negados."),
          q("Qual é a forma equivalente simplificada para a condição negada: !(idade >= 18 && possuiTitulo)?", "idade < 18 || !possuiTitulo", ["idade < 18 && !possuiTitulo","idade >= 18 || possuiTitulo"], "Inverte o operador relacional de maior/igual para menor e nega a segunda cláusula com OU."),
          q("Qual expressão equivale a !(x == 0 || y == 0) pelas Leis de De Morgan?", "x != 0 && y != 0", ["x != 0 || y != 0","x == 0 && y == 0"], "Exige simultaneamente que nem x nem y sejam iguais a zero."),
          q("Qual é o benefício prático de aplicar De Morgan na refatoração de guard clauses em métodos?", "Torna as condições de saída antecipada intuitivas e remove blocos else aninhados", ["Gera menos bytecode compilado","Permite usar variáveis sem inicialização"], "Melhora sensivelmente a manutenibilidade e reduz a complexidade ciclomática do método."),
          t("Qual operador lógico conecta os termos negados ao transformar !(a || b)?", ["&&"], "!(a || b) transforma-se em (!a && !b).", "# operador de De Morgan para disjuncao negada"),
          g("Complete a refatoração equivalente aplicando De Morgan para !(isAdmin || isOwner):", ["boolean semAcesso = !isAdmin && !isOwner;"], "Nega ambos os termos e troca o operador OU pelo operador E.", "boolean semAcesso = !isAdmin ____ !isOwner;"),
          o("Ordene as etapas para refatorar uma condicional negada !(p && q):", ["Identificar a expressão global encapsulada pela negação externa","Distribuir o operador de negação para cada um dos operandos internos","Inverter o operador de conjunção (&&) para o operador de disjunção (||)","Substituir comparações invertidas por operadores diretos correspondentes"], "Procedimento formal para aplicação prática das Leis de De Morgan."),
          p("Associe a expressão negada à sua forma equivalente direta:", [["!(a && b)","(!a || !b) com disjunção dos termos negados"],["!(a || b)","(!a && !b) com conjunção dos termos negados"],["!(x > 10)","(x <= 10) invertendo a relação de ordem"],["!(x == y)","(x != y) aplicando desigualdade direta"]], "Equivalências lógicas clássicas de De Morgan.")
        ]
      },
      {
        id: "java-c03-u7-l5",
        title: "Wrapper Boolean e armadilhas de boxing",
        subtitle: "Objetos e valores · Autoboxing, unboxing e risco de NullPointerException",
        theory: "A classe java.lang.Boolean encapsula o tipo primitivo boolean como um objeto de referência. Embora o compilador realize autoboxing e unboxing transparentes, converter uma referência Boolean com valor null em uma condição primitiva lança NullPointerException em tempo de execução, exigindo cautela no uso.",
        questions: [
          q("O que acontece se uma variável Boolean (objeto wrapper) contendo null for testada em if (flag)?", "Lança NullPointerException em runtime durante o unboxing implícito", ["A condição avalia para false","O compilador impede com erro léxico"], "Ao avaliar o if, o compilador tenta invocar flag.booleanValue(), o que falha se flag for null."),
          q("Qual método estático de Boolean deve ser usado para obter instâncias cacheadas em vez de new Boolean()?", "Boolean.valueOf(true) ou Boolean.TRUE", ["Boolean.create()","new Boolean(true)"], "O construtor new Boolean() foi depreciado no Java 9; valueOf reutiliza instâncias estáticas."),
          q("Como funciona o método estático Boolean.parseBoolean(String s)?", "Retorna true se a string for igual a \"true\" ignorando maiúsculas; retorna false para qualquer outro valor ou null", ["Lança exceção se a string for inválida","Retorna um objeto Boolean"], "parseBoolean é tolerante a falhas e não lança exceção para strings desconhecidas."),
          q("Quando é justificável utilizar a classe wrapper Boolean em vez do tipo primitivo boolean?", "Quando o valor é opcional e precisa representar o estado ausente ou não informado (três estados: true, false, null)", ["Sempre, pois classes são mais rápidas","Nunca"], "Comum em mapeamentos ORM (JPA/Hibernate) de colunas de banco de dados anuláveis e DTOs de APIs."),
          t("Qual constante estática pública da classe Boolean representa a instância de valor verdadeiro?", ["Boolean.TRUE"], "Boolean.TRUE fornece o singleton imutável de true.", "# constante singleton de Boolean verdadeiro"),
          g("Complete o teste nulo-seguro de uma flag do tipo wrapper Boolean:", ["boolean ativo = Boolean.TRUE.equals(flagWrapper);"], "Boolean.TRUE.equals(null) retorna false com segurança sem lançar exceção.", "boolean ativo = Boolean.TRUE.equals(____);"),
          o("Ordene os estados e operações envolvidos no unboxing de um Boolean:", ["Declaração da variável wrapper: Boolean flag = null;","Tentativa de uso em contexto condicional primitivo: if (flag)","Chamada implícita de flag.booleanValue() pelo bytecode compilado","Disparo de java.lang.NullPointerException por desreferenciamento nulo"], "Ciclo de falha clássico do unboxing automático de wrappers nulos."),
          p("Associe o método ou constante da classe Boolean ao seu papel:", [["Boolean.TRUE","Instância estática singleton do valor verdadeiro"],["Boolean.valueOf(\"true\")","Retorna o wrapper a partir de parsing de texto"],["Boolean.parseBoolean(\"TRUE\")","Retorna o primitivo boolean true ignorando caixa"],["Boolean.FALSE","Instância estática singleton do valor falso"]], "Utilitários e membros da classe wrapper java.lang.Boolean.")
        ]
      }
    ],
    8: [
      {
        id: "java-c03-u8-l1",
        title: "Limitações do IEEE 754 e a classe BigDecimal",
        subtitle: "Precisão monetária · Por que float e double falham em cálculos financeiros",
        theory: "Computadores representam números de ponto flutuante (float e double) em base binária, impossibilitando a representação exata de frações decimais simples como 0.1 ou 0.2. A soma 0.1 + 0.2 resulta em 0.30000000000000004. Para aplicações financeiras e fiscais, Java disponibiliza a classe imutável BigDecimal no pacote java.math.",
        questions: [
          q("Qual é a causa raiz da imprecisão ao somar double a = 0.1; double b = 0.2; em Java?", "Frações decimais não possuem representação binária exata finita na especificação IEEE 754", ["O Java arredonda números ímpares para baixo","Limitação da arquitetura de 32 bits"], "Assim como 1/3 é uma dízima periódica em base 10, 1/10 é uma dízima periódica em base 2."),
          q("Qual classe da biblioteca padrão de Java deve ser obrigatoriamente utilizada em cálculos monetários e fiscais?", "java.math.BigDecimal", ["java.lang.Double","java.lang.Float"], "BigDecimal fornece representação decimal exata com controle total sobre arredondamento."),
          q("Qual é a característica fundamental dos objetos da classe BigDecimal quanto à sua mutabilidade?", "São estritamente imutáveis: cada operação matemática produz uma nova instância de BigDecimal", ["São totalmente mutáveis para economizar memória","Podem mudar apenas a escala"], "A imutabilidade garante segurança em ambientes concorrentes multithread."),
          q("Em qual pacote da biblioteca padrão do JDK a classe BigDecimal está localizada?", "java.math", ["java.util","java.lang"], "Deve ser importada explicitamente com: import java.math.BigDecimal;"),
          t("Qual classe do pacote java.math fornece precisão decimal exata e arbitrária em Java?", ["BigDecimal"], "BigDecimal é a classe padrão de cálculos monetários.", "# classe de precisao decimal exata"),
          g("Complete o import obrigatório para utilizar a classe BigDecimal:", ["import java.math.BigDecimal;"], "BigDecimal pertence ao pacote java.math.", "import java.math.____;"),
          o("Ordene as abordagens de representação monetária da mais arriscada para a mais segura:", ["float: precisão de apenas 32 bits propensa a perdas imediatas de centavos","double: precisão de 64 bits que acumula dízimas binárias imperceptíveis inicialmente","long armazenando centavos: abordagem rápida porém limitada a escalas inteiras fixas","BigDecimal: controle absoluto sobre casas decimais e políticas formais de arredondamento"], "Hierarquia de segurança e precisão para sistemas financeiros em Java."),
          p("Associe a estrutura numérica à sua adequação no desenvolvimento de software:", [["float","Gráficos 3D e processamento de sensores onde velocidade supera precisão"],["double","Cálculos científicos gerais com tolerância a aproximações infinitesimais"],["long","Contagem de moedas em centavos inteiros quando a escala é pré-fixada"],["BigDecimal","Sistemas bancários, contábeis, faturamento fiscal e cálculo de tributos"]], "Casos de uso para diferentes tipos numéricos em Java.")
        ]
      },
      {
        id: "java-c03-u8-l2",
        title: "Instanciação de BigDecimal: Strings versus doubles",
        subtitle: "Armadilhas de construção · Por que new BigDecimal(0.1) quebra a exatidão",
        theory: "A forma correta de instanciar um BigDecimal com valor decimal é passando uma String em seu construtor, como new BigDecimal(\"0.1\"), ou através do método estático BigDecimal.valueOf(0.1). Passar um literal double diretamente para o construtor new BigDecimal(0.1) preserva a imprecisão binária nativa do double.",
        questions: [
          q("Qual é o problema de usar new BigDecimal(0.1) passando um double literal no construtor?", "O construtor converte o valor binário impreciso do double, criando um BigDecimal de 0.10000000000000000555...", ["O código não compila","O valor é arredondado para zero"], "Como 0.1 já é impreciso no tipo double, o construtor reflete com exatidão a própria imprecisão."),
          q("Qual é a recomendação oficial do JavaDoc para instanciar BigDecimal a partir de literais conhecidos?", "Usar o construtor que recebe String: new BigDecimal(\"0.1\") ou BigDecimal.valueOf(0.1)", ["Usar sempre new BigDecimal(double)","Fazer cast de (BigDecimal) 0.1"], "A String preserva exatamente a representação decimal desejada sem passar por binário."),
          q("Como o método estático BigDecimal.valueOf(0.1) trata o número double passado como parâmetro?", "Ele converte internamente o double para String usando Double.toString(d) antes de instanciar", ["Ignora as casas decimais","Chama o construtor de double nativo"], "valueOf protege o desenvolvedor contra a dízima binária do literal double."),
          q("Quais constantes pré-construídas a classe BigDecimal disponibiliza para valores frequentes?", "BigDecimal.ZERO, BigDecimal.ONE e BigDecimal.TEN", ["BigDecimal.PI e BigDecimal.E","BigDecimal.MAX_VALUE"], "Reutilizar essas constantes estáticas evita alocações redundantes na heap do Java."),
          t("Qual método estático de fábrica converte um double com segurança para BigDecimal?", ["BigDecimal.valueOf"], "BigDecimal.valueOf(10.5) utiliza a representação textual do valor.", "# metodo de fabrica seguro para BigDecimal"),
          g("Complete a instanciação canônica de BigDecimal a partir de representação textual:", ["BigDecimal taxa = new BigDecimal(\"0.05\");"], "Usar String no construtor garante precisão exata de 5 centésimos.", "BigDecimal taxa = new BigDecimal(____);"),
          o("Ordene as formas de criação de BigDecimal da pior para a melhor prática:", ["new BigDecimal(0.1): incorpora a dízima binária do IEEE 754 no objeto","BigDecimal.valueOf(d): seguro para variáveis double já existentes","new BigDecimal(\"0.1\"): garante a representação decimal exata pretendida","BigDecimal.ZERO / ONE / TEN: reutilização de singletons estáticos em memória"], "Classificação de boas práticas na criação de instâncias de BigDecimal."),
          p("Associe a instanciação de BigDecimal ao seu comportamento resultante:", [["new BigDecimal(0.1)","Armazena a aproximação binária imperfeita do IEEE 754"],["new BigDecimal(\"0.1\")","Armazena exatamente um décimo com escala 1"],["BigDecimal.valueOf(0.1)","Converte via Double.toString preservando casas visuais"],["BigDecimal.ZERO","Singleton cacheado com valor zero e escala 0"]], "Diferenças de instanciação na classe BigDecimal.")
        ]
      },
      {
        id: "java-c03-u8-l3",
        title: "Operações e RoundingMode em BigDecimal",
        subtitle: "Aritmética e escala · add, subtract, multiply, divide e arredondamento",
        theory: "Como BigDecimal é um objeto, suas operações utilizam métodos: add, subtract, multiply e divide. Como a divisão pode produzir dízimas infinitas (ex: 1 / 3), o método divide exige que se especifique a escala (número de casas decimais) e o modo de arredondamento através do enum java.math.RoundingMode.",
        questions: [
          q("O que acontece se invocarmos a.divide(b) em BigDecimal quando o resultado for uma dízima infinita (ex: 10 / 3)?", "Lança java.lang.ArithmeticException: Non-terminating decimal expansion", ["O Java arredonda para zero","Retorna Double.POSITIVE_INFINITY"], "Sem especificar a escala e o RoundingMode, a JVM não pode adivinhar onde cortar a dízima."),
          q("Qual modo de arredondamento do enum RoundingMode é conhecido como \"arredondamento bancário\"?", "RoundingMode.HALF_EVEN", ["RoundingMode.UP","RoundingMode.DOWN"], "HALF_EVEN arredonda para o vizinho par mais próximo em caso de empate, minimizando viés estatístico."),
          q("Como se realiza a multiplicação entre dois objetos BigDecimal (a e b)?", "a.multiply(b)", ["a * b","a.times(b)"], "Java não suporta sobrecarga de operadores; métodos explícitos são sempre exigidos."),
          q("Como comparar a magnitude de dois objetos BigDecimal ignorando diferenças de escala (ex: 2.0 vs 2.00)?", "Usando a.compareTo(b) == 0 em vez de a.equals(b)", ["Usando o operador ==","Usando a.equals(b)"], "equals() exige que tanto o valor quanto a escala sejam idênticos; compareTo avalia apenas a magnitude."),
          t("Qual enum do pacote java.math define as estratégias de arredondamento em divisões?", ["RoundingMode"], "RoundingMode define modos como HALF_UP, HALF_EVEN e DOWN.", "# enum de modo de arredondamento"),
          g("Complete a divisão especificando 2 casas decimais e arredondamento financeiro:", ["BigDecimal resultado = valor.divide(divisor, 2, RoundingMode.HALF_UP);"], "HALF_UP arredonda frações >= 0.5 para cima, padrão comum no varejo.", "BigDecimal resultado = valor.divide(divisor, 2, RoundingMode.____);"),
          o("Ordene as etapas para calcular uma divisão financeira segura com BigDecimal:", ["Obter os operandos numericos como instancias de BigDecimal validas","Definir a escala desejada de casas decimais (ex: 2 centavos ou 4 fiscal)","Escolher a política de arredondamento apropriada (ex: RoundingMode.HALF_EVEN)","Invocar o método divide passando divisor, escala e RoundingMode"], "Etapas para cálculo de divisão monetária sem exceções de dízima em Java."),
          p("Associe o método de BigDecimal à sua operação matemática:", [["add","Soma algébrica gerando uma nova instância de BigDecimal"],["subtract","Subtração algébrica entre os dois operandos"],["multiply","Multiplicação com soma automática das escalas"],["divide","Divisão exigindo escala e modo de arredondamento em dízimas"]], "Operações aritméticas fundamentais da classe BigDecimal.")
        ]
      },
      {
        id: "java-c03-u8-l4",
        title: "BigInteger para inteiros de precisão arbitrária",
        subtitle: "Aritmética inteira · Criptografia, fatoriais e números que superam 64 bits",
        theory: "Quando um cálculo inteiro ultrapassa os limites do tipo primitivo long (maior que 9 quintilhões), Java oferece a classe java.math.BigInteger. BigInteger suporta inteiros de magnitude arbitrária, limitados apenas pela memória física da JVM, sendo indispensável em criptografia assimétrica, fatoriais e chaves RSA.",
        questions: [
          q("Qual é o limite teórico de magnitude que um objeto BigInteger pode armazenar?", "Não possui limite fixo em bits; é limitado apenas pela memória heap disponível na JVM", ["64 bits","128 bits"], "Permite manipular números com milhares de dígitos decimais com exatidão absoluta."),
          q("O que acontece em tipos primitivos como int ou long quando ocorre overflow aritmético?", "Ocorre overflow silencioso, \"dando a volta\" para valores negativos sem aviso", ["A JVM lança ArithmeticException","O sistema operacional congela"], "Tipos primitivos não verificam overflow por padrão; BigInteger elimina esse risco de estouro."),
          q("Como instanciar um BigInteger a partir de uma representação textual de número grande?", "new BigInteger(\"123456789012345678901234567890\")", ["BigInteger.fromInt()","(BigInteger) 1234567890"], "O construtor recebe uma String contendo os dígitos em base 10 ou em qualquer base de 2 a 36."),
          q("Qual método de BigInteger realiza exponenciação modular, fundamental em algoritmos criptográficos como RSA?", "a.modPow(expoente, modulo)", ["a.pow(expoente)","a.modularMultiply()"], "modPow calcula (a ^ expoente) % modulo de forma extremamente otimizada sem gerar números intermediários gigantescos."),
          t("Qual classe do pacote java.math deve ser utilizada para inteiros de magnitude infinita?", ["BigInteger"], "BigInteger representa inteiros de precisão arbitrária.", "# classe de inteiros arbitrarios"),
          g("Complete a multiplicação de dois objetos BigInteger:", ["BigInteger produto = fatorA.multiply(fatorB);"], "Assim como BigDecimal, BigInteger utiliza métodos em vez de operadores aritméticos.", "BigInteger produto = fatorA.____(fatorB);"),
          o("Ordene a capacidade máxima de representação inteira em Java do menor para o maior:", ["int: 32 bits, limite aproximado de 2,14 bilhões","long: 64 bits, limite aproximado de 9,22 quintilhões","Long.MAX_VALUE: ápice absoluto de tipos primitivos em hardware nativo","BigInteger: precisão dinâmica expansível ilimitada em memória heap"], "Escala de capacidade de armazenamento inteiro em Java."),
          p("Associe a operação com BigInteger à sua finalidade principal:", [["multiply","Produto exato entre inteiros gigantes sem perigo de overflow"],["divideAndRemainder","Retorna array com quociente e resto em uma única passagem"],["isProbablePrime","Teste probabilístico de primalidade de Miller-Rabin para chaves"],["gcd","Máximo divisor comum entre duas magnitudes inteiras"]], "Operações especializadas da classe BigInteger em Java.")
        ]
      },
      {
        id: "java-c03-u8-l5",
        title: "Projeto integrado: calculadora financeira e contábil",
        subtitle: "Aplicação prática · Juros compostos, alíquotas fiscais e arredondamento",
        theory: "Neste projeto prático, consolidamos tipos primitivos, operadores relacionais, lógica booleana e a classe BigDecimal para construir um motor contábil completo. A aplicação calcula parcelas de financiamento com juros compostos, aplica alíquotas progressivas de tributos e formata o demonstrativo fiscal com precisão monetária.",
        questions: [
          q("Por que é essencial manter a taxa percentual de juros em BigDecimal em vez de converter para double?", "Para impedir perdas decimais acumuladas ao longo de dezenas ou centenas de parcelas de cálculo", ["Porque o código roda mais rápido","Porque bancos proíbem primitivos"], "Em financiamentos longos, frações de centavos perdidas por aproximação geram discrepâncias graves de saldo devedor."),
          q("Como calcular (1 + taxa) elevado a n períodos em uma fórmula financeira usando BigDecimal?", "BigDecimal fator = BigDecimal.ONE.add(taxa).pow(periodos);", ["Math.pow(1 + taxa, periodos)","taxa ^ periodos"], "O método .pow(int) de BigDecimal calcula a potência inteira exata sem recorrer ao tipo double."),
          q("Qual é o procedimento correto para arredondar o valor final de uma fatura para 2 casas decimais?", "valor.setScale(2, RoundingMode.HALF_EVEN)", ["Math.round(valor)","(double) valor"], "setScale ajusta a escala com a política formal de arredondamento contábil especificada."),
          q("Como estruturar a checagem que valida se um cliente é elegível a crédito e se o valor é positivo?", "cliente.isElegivel() && valorSolicitado.compareTo(BigDecimal.ZERO) > 0", ["cliente.isElegivel() & valorSolicitado > 0","valorSolicitado == 0"], "Combina curto-circuito seguro com comparação de magnitude via compareTo em relação a zero."),
          t("Qual método de BigDecimal ajusta a escala de casas decimais aplicando um RoundingMode?", ["setScale"], "setScale(2, RoundingMode.HALF_EVEN) ajusta casas decimais.", "# metodo para ajustar escala de casas decimais"),
          g("Complete a validação que assegura saldo suficiente para débito contábil:", ["boolean saldoSuficiente = saldoConta.compareTo(valorDebito) >= 0;"], "compareTo >= 0 verifica se o saldo é maior ou igual ao débito.", "boolean saldoSuficiente = saldoConta.____(valorDebito) >= 0;"),
          o("Ordene as etapas do cálculo e liquidação de uma transação financeira contábil:", ["Validar pré-condições do cliente e limites com operadores lógicos e curto-circuito","Calcular acréscimos ou juros usando multiply, add e pow sobre instâncias de BigDecimal","Ajustar o montante final com setScale para 2 casas decimais usando RoundingMode formal","Retornar o registro contábil imutável garantindo conformidade matemática e fiscal"], "Ciclo operacional completo de uma transação financeira em Java."),
          p("Associe a prática contábil à ferramenta de código correspondente em Java:", [["new BigDecimal(\"100.50\")","Instanciação segura de saldo inicial sem desvios binários"],["setScale(2, RoundingMode.HALF_EVEN)","Padronização oficial para fechamento de balanços em centavos"],["compareTo(BigDecimal.ZERO) > 0","Verificação estrita de valor monetário estritamente positivo"],["cliente != null && cliente.isAtivo()","Cláusula de guarda com curto-circuito protegendo o fluxo"]], "Elementos-chave da engenharia de software financeiro com Java.")
        ]
      }
    ]
  });
})();
