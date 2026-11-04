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
  const chId = "java-c05";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "java-c05-u1-l3-modificadores-acesso",
        title: "Modificadores de acesso em métodos",
        subtitle: "Assinaturas · Visibilidade com public, protected, package-private e private",
        theory: "A visibilidade de um método em Java é governada por quatro níveis de controle de acesso: private (restrito à classe), package-private (sem palavra-chave, visível no pacote), protected (pacote e subclasses) e public (visível globalmente). A boa prática orienta expor apenas o necessário para manter o encapsulamento.",
        questions: [
          q("Qual modificador de acesso restringe a invocação do método estritamente à classe em que foi declarado?", "private", ["public","protected","package-private"], "O modificador private impede qualquer invocação externa à classe, garantindo proteção total ao encapsulamento interno."),
          q("Quando nenhum modificador de acesso é fornecido na declaração do método, qual nível passa a vigorar?", "package-private (visibilidade limitada a classes do mesmo pacote)", ["public (aberto a todo o projeto)","private (fechado para todo mundo)","protected"], "A ausência explícita de modificador aplica o nível padrão (package-private), acessível a todas as classes do mesmo pacote."),
          q("Qual nível permite que subclasses em pacotes distintos invoquem o método herdado?", "protected", ["private","package-private","default"], "O modificador protected permite acesso por classes do mesmo pacote e por subclasses em qualquer pacote."),
          q("Por que os métodos auxiliares de cálculo interno devem geralmente ser declarados como private?", "Para isolar detalhes de implementação e prevenir dependências externas indevidas", ["Porque private executa mais rápido na JVM","Para obrigar que subclasses reescrevam o método","Para permitir acesso em qualquer pacote"], "Tornar métodos auxiliares privados preserva a flexibilidade de refatorar o código sem quebrar clientes externos."),
          t("Qual palavra-chave em Java torna um método acessível a partir de qualquer outra classe do projeto?", ["public"], "A palavra public garante visibilidade irrestrita em todos os pacotes e módulos autorizados.", "____ void emitirRelatorio() { }"),
          g("Complete a declaração tornando o método visível apenas dentro da sua própria classe.", ["private"], "O modificador private restringe o método estritamente à própria classe.", "____ void recalcularTotais() { }"),
          o("Ordene os níveis de acesso em Java do mais restritivo para o mais permissivo.", ["private","package-private (padrão)","protected","public"], "A hierarquia vai do mais fechado (private) até o acesso universal (public)."),
          p("Associe cada modificador de acesso ao seu respectivo raio de visibilidade em Java.", [["private","Apenas a própria classe declarante"],["package-private","Classes situadas no mesmo pacote"],["protected","Mesmo pacote e subclasses externas"],["public","Qualquer classe de qualquer pacote"]], "Cada modificador define uma fronteira clara de acesso e encapsulamento em Java.")
        ]
      },
      {
        id: "java-c05-u1-l4-metodos-estaticos",
        title: "Métodos estáticos vs métodos de instância",
        subtitle: "Assinaturas · O modificador static e o contexto sem ponteiro this",
        theory: "Métodos declarados com o modificador static pertencem à classe e não a uma instância individual. Eles podem ser chamados diretamente pelo nome da classe, sem exigir instanciação com new. Por não operarem sobre um objeto específico, métodos estáticos não possuem acesso ao ponteiro this nem a variáveis de instância.",
        questions: [
          q("Qual é a principal distinção de um método estático em relação a um método de instância?", "Pertence à classe e pode ser executado sem instanciar objetos", ["Só pode aceitar tipos primitivos como parâmetro","Executa em uma thread separada"], "Métodos estáticos são ligados ao molde da classe, permitindo chamadas diretas como Math.sqrt() ou Classe.metodo()."),
          q("Por que uma tentativa de acessar this dentro de um método estático resulta em erro de compilação?", "Porque métodos estáticos não estão vinculados a nenhuma instância concreta", ["Porque this é uma palavra exclusiva de construtores","Porque a JVM desativa referências estáticas"], "Como não há objeto em execução para a chamada estática, inexiste contexto de instância representado por this."),
          q("Qual classe utilitária da biblioteca padrão de Java é um exemplo clássico de métodos estáticos?", "java.lang.Math", ["java.util.Scanner","java.util.ArrayList","java.lang.StringBuilder"], "A classe Math agrupa apenas funções utilitárias estáticas puras, como min, max, pow e sqrt."),
          q("Como é realizada a invocação canônica de um método estático somar na classe Calculadora?", "Calculadora.somar(a, b);", ["new Calculadora().this.somar(a, b);","somar.Calculadora(a, b);","Calculadora->somar(a, b);"], "A sintaxe recomendada e segura é qualificar o método com o próprio identificador da classe."),
          t("Qual modificador deve ser adicionado à assinatura para permitir chamar o método sem criar um objeto?", ["static"], "A palavra static associa a função diretamente à classe.", "public ____ int calcularArea(int lado) { return lado * lado; }"),
          g("Complete o método utilitário estático para calcular o dobro de um número.", ["static"], "Métodos utilitários que não dependem de estado interno devem ser static.", "public ____ int dobro(int n) { return n * 2; }"),
          o("Ordene as etapas para projetar e invocar um método utilitário estático em Java.", ["Identificar que a lógica não depende de estado interno","Declarar o método com modificadores public static","Compilar a classe utilitária","Invocar a função usando NomeDaClasse.metodo()"], "A convenção utilitária prevê declaração estática e invocação qualificada pelo nome da classe."),
          p("Associe o tipo de método ao seu comportamento correspondente.", [["Método estático","Invocado via nome da classe sem requerer new"],["Método de instância","Opera sobre o estado específico do objeto this"],["Variável estática","Compartilhada globalmente por todas as instâncias"],["Variável de instância","Armazenada isoladamente dentro de cada objeto"]], "A distinção entre contexto de classe e de objeto é pilar central da arquitetura Java.")
        ]
      },
      {
        id: "java-c05-u1-l5-retorno-void-retorno-tipado",
        title: "Métodos void vs métodos com tipo de retorno",
        subtitle: "Assinaturas · Procedimentos que causam efeitos vs funções que entregam valores",
        theory: "A assinatura do método especifica o que ele devolve. Se realiza ações sem produzir resultado de cálculo, declara-se void. Se calcula um resultado, deve especificar o tipo exato (primitivo ou referência) e incluir instruções return coerentes em todos os caminhos.",
        questions: [
          q("O que indica a presença do tipo void na assinatura de um método?", "Que o método não retorna nenhum valor para quem o invocou", ["Que o método aceita qualquer tipo de argumento","Que o método é executado de forma síncrona"], "void sinaliza uma operação puramente procedural focada em realizar ações, como gravação ou impressão."),
          q("O que acontece se um método declarado com tipo int terminar seu bloco de código sem um return?", "Ocorrerá erro de compilação por ausência de instrução de retorno válida", ["O método retornará 0 por padrão silenciosamente","O compilador gera uma exceção de runtime"], "O compilador Java exige estritamente que todo caminho de execução de método não-void termine com um return compatível."),
          q("É permitido utilizar a instrução return sem argumentos dentro de um método void?", "Sim, para encerrar a execução do método prematuramente sob certas condições", ["Não, a palavra return é proibida em métodos void","Sim, mas apenas dentro de blocos try-catch"], "Em métodos void, return; funciona como um ponto de saída antecipada sem propagar nenhum valor."),
          q("Qual é o tipo de retorno adequado para um método que precisa verificar se um número é positivo?", "boolean", ["int","void","String"], "Métodos de verificação lógica (predicados) devem devolver boolean (true ou false)."),
          t("Qual palavra-chave indica formalmente que o método não produz valor de retorno?", ["void"], "void denota a ausência de valor devolvido.", "public static ____ imprimirCabecalho() { System.out.println(\"Lincode\"); }"),
          g("Complete o método garantindo a saída antecipada caso o valor seja inválido.", ["return"], "return isolado interrompe a execução do método void imediatamente.", "if (valor < 0) { ____; }"),
          o("Ordene a estrutura da declaração de um método em Java da esquerda para a direita.", ["Modificadores de visibilidade e estado","Tipo de retorno","Nome identificador do método","Lista de parâmetros entre parênteses"], "A assinatura segue a sintaxe: [acesso] [static] [tipoRetorno] nome([parametros])."),
          p("Associe o tipo de retorno à finalidade de cada método.", [["void","Apenas emite mensagens no console ou salva dados"],["boolean","Valida se uma regra de negócio foi atendida"],["int","Calcula e fornece uma contagem ou total acumulado"],["String","Formata e devolve uma representação textual de dados"]], "Definir o tipo de retorno correto reforça a segurança estática de tipos do Java.")
        ]
      }
    ],
    2: [
      {
        id: "java-c05-u2-l1-passagem-parametros",
        title: "Declaração e uso de parâmetros formais",
        subtitle: "Parâmetros · Especificando tipos e identificadores na lista de entrada",
        theory: "Parâmetros formais atuam como variáveis locais inicializadas pelos argumentos passados na chamada do método. Em Java, cada parâmetro exige explicitamente seu tipo e seu nome na assinatura, separados por vírgulas. A checagem estática garante que os tipos dos argumentos na invocação sejam compatíveis com a assinatura.",
        questions: [
          q("Como são declarados múltiplos parâmetros formais na assinatura de um método em Java?", "Separando cada par tipo-nome por vírgula dentro dos parênteses", ["Separando os tipos por ponto e vírgula","Listando todos os nomes e apenas um tipo no fim"], "A sintaxe de parâmetros exige vírgulas separando cada declaração individual: (int a, double b, String c)."),
          q("Qual é o tempo de vida (ciclo de existência) de um parâmetro formal em Java?", "Existe apenas durante a execução do método, sendo desalocado ao término", ["Permanece em memória até o encerramento da JVM","Fica armazenado no heap até a coleta de lixo"], "Parâmetros ocupam espaço no stack frame do método e deixam de existir quando a execução retorna ao chamador."),
          q("O que acontece se passarmos um argumento int para um parâmetro declarado como double?", "A promoção numérica implícita converte o int em double sem perda de integridade", ["Ocorre erro de compilação por incompatibilidade estrita","O valor é truncado para zero"], "Java realiza conversões primitivas alargadoras (widening) de forma automática e segura."),
          q("O que acontece ao tentar passar um argumento double para um parâmetro int sem cast explícito?", "Erro de compilação por possível perda de precisão (narrowing)", ["O valor fracionário é descartado silenciosamente","O programa compila mas lança exceção em runtime"], "Conversões estreitadoras (narrowing) exigem cast manual para confirmar a intenção do desenvolvedor."),
          t("Qual símbolo de pontuação separa os parâmetros formais na assinatura de um método?", [","], "Parâmetros são separados exclusivamente por vírgulas.", "void processar(int codigo____ String nome) { }"),
          g("Complete a lista de parâmetros para receber um identificador numérico e uma taxa decimal.", [","], "Vírgulas separam os parâmetros na assinatura.", "public void aplicarDesconto(int id____ double taxa) { }"),
          o("Ordene os componentes de um método com múltiplos parâmetros.", ["Modificadores e tipo de retorno","Nome identificador do método","Abertura de parênteses","Parâmetros com seus respectivos tipos","Fechamento de parênteses e corpo em chaves"], "A declaração do método segue a ordem rigorosa estabelecida pela gramática da linguagem Java."),
          p("Associe o termo relacionado a parâmetros ao seu conceito correto.", [["Parâmetro formal","Variável declarada na assinatura para receber dados"],["Argumento real","Valor ou expressão concreta fornecida na chamada"],["Stack frame","Área de pilha que abriga parâmetros durante a invocação"],["Promoção automática","Ajuste de tipo numérico menor para maior sem cast"]], "Diferenciar parâmetros formais de argumentos reais evita ambiguidades na comunicação técnica.")
        ]
      },
      {
        id: "java-c05-u2-l2-argumentos-variaveis-varargs",
        title: "Parâmetros variáveis com varargs (...)",
        subtitle: "Parâmetros · Flexibilidade no recebimento de múltiplos argumentos homogêneos",
        theory: "O recurso de varargs (introduzido no Java 5) permite que um método aceite zero ou mais argumentos de um mesmo tipo usando a sintaxe de reticências (ex: int... numeros). Internamente, o compilador empacota esses argumentos em um array unidimensional, permitindo percorrê-los diretamente com um laço for-each.",
        questions: [
          q("Qual é a sintaxe correta para declarar um parâmetro varargs de inteiros em Java?", "int... valores", ["int[]...","...int valores","params int valores"], "A sintaxe oficial usa o tipo seguido por três pontos e o nome da variável: int... valores."),
          q("Qual é a regra mandatória de posicionamento do parâmetro varargs na assinatura?", "Deve ser obrigatoriamente o último parâmetro da lista", ["Deve ser sempre o primeiro parâmetro","Pode estar em qualquer posição se houver apenas um"], "O compilador exige varargs na última posição para saber onde termina a lista de argumentos fixos."),
          q("Quantos parâmetros varargs um mesmo método pode possuir em sua assinatura?", "No máximo um", ["Até dois, se forem de tipos diferentes","Quantos forem necessários"], "Permite-se no máximo um único parâmetro varargs por método, sempre situado na última posição."),
          q("O que acontece se invocarmos um método void calcular(int... vals) sem passar nenhum argumento?", "O método executa normalmente recebendo um array de tamanho zero", ["Ocorre erro de compilação exigindo ao menos um item","A variável vals é inicializada com null"], "A chamada sem argumentos instancia um array vazio (length == 0), evitando NullPointerException."),
          t("Quantos pontos consecutivos formam o operador de varargs na declaração de parâmetro?", ["...","três","tres"], "Três pontos consecutivos caracterizam a sintaxe de varargs.", "public static int somar(int____ numeros) { return 0; }"),
          g("Complete a assinatura para aceitar uma quantidade dinâmica de textos.", ["String..."], "O tipo seguido de reticências cria o parâmetro varargs.", "public void concatenar(____ termos) { }"),
          o("Ordene as operações que a JVM realiza ao processar uma chamada com varargs.", ["Compilador detecta os múltiplos argumentos na chamada","JVM aloca um array contendo os argumentos passados","O array gerado é entregue ao método como parâmetro","O corpo do método itera sobre o array recebido"], "Varargs é um açúcar sintático do compilador que simplifica a passagem de arrays."),
          p("Associe a assinatura de varargs à forma como pode ser invocada.", [["somar(int... n)","somar(1, 2, 3) ou somar()"],["exibir(String msg, int... n)","exibir(\"Total\", 10, 20)"],["juntar(char sep, String... t)","juntar('-', \"a\", \"b\", \"c\")"],["listar(Object... itens)","Aceita qualquer combinação de objetos"]], "Varargs traz comodidade na construção de métodos com número indeterminado de entradas.")
        ]
      },
      {
        id: "java-c05-u2-l3-modificador-final-parametros",
        title: "Parâmetros imutáveis com o modificador final",
        subtitle: "Parâmetros · Garantindo que referências e primitivos recebidos não sejam reatribuídos",
        theory: "Declarar um parâmetro formal com a palavra-chave final impede que seu valor ou referência seja reatribuído no interior do corpo do método. Qualquer tentativa de sobrescrever o parâmetro provocará erro de compilação. Essa prática previne efeitos colaterais indesejados e reforça a clareza e previsibilidade do algoritmo.",
        questions: [
          q("Qual é o efeito de declarar um parâmetro como final int taxa na assinatura de um método?", "Impede que a variável taxa receba uma nova atribuição dentro do método", ["Faz com que taxa seja compartilhada entre threads","Garante que taxa seja calculada em tempo de compilação"], "O modificador final transforma o parâmetro formal em uma constante local do método."),
          q("Se um parâmetro for declarado como final Pessoa p, o que ainda é permitido fazer com ele?", "Alterar os atributos internos do objeto através de seus métodos setters", ["Reatribuir a variável p para apontar para new Pessoa()","Reatribuir p para null"], "final protege apenas a ligação da referência; os membros internos do objeto referenciado permanecem mutáveis."),
          q("Por que muitos guias de estilo recomendam marcar parâmetros como final?", "Para assegurar que o método trate as entradas exclusivamente como leitura imutável", ["Porque melhora o uso de memória no garbage collector","Para dispensar a necessidade de tipos explícitos"], "Tratar parâmetros como constantes previne bugs acidentais causados por mutação de variáveis de entrada."),
          q("O que o compilador Java faz se encontrar a linha x = 10; onde x foi declarado com final int x?", "Interrompe o processo e emite um erro de compilação", ["Converte a atribuição em uma operação condicional","Gera um aviso mas conclui a compilação"], "Reatribuição de variável ou parâmetro final é estritamente proibida pelo compilador Java."),
          t("Qual palavra reservada impede a reatribuição de parâmetros formais em Java?", ["final"], "A palavra-chave final bloqueia nova atribuição.", "public void validar(____ int limite) { }"),
          g("Complete a assinatura tornando o parâmetro formal imutável contra reatribuições.", ["final"], "final assegura a imutabilidade da referência ou primitivo recebido.", "public void processar(____ String documento) { }"),
          o("Ordene a análise que o compilador faz ao encontrar um parâmetro final.", ["Identifica o modificador final na assinatura do método","Inicializa o parâmetro com o argumento passado pelo chamador","Varre as linhas do método em busca de reatribuições","Emite erro caso encontre operador de atribuição sobre o parâmetro"], "O compilador valida a imutabilidade estática em toda a extensão do bloco do método."),
          p("Associe o impacto de final sobre diferentes tipos de parâmetros.", [["final int count","O valor numérico primitivo não pode ser reatribuído"],["final List<String> itens","A referência à lista é fixa, mas itens podem ser adicionados"],["final String texto","A referência é fixa e o objeto String já é imutável"],["int count (sem final)","Permite reatribuição livre dentro do corpo do método"]], "Compreender o alcance de final sobre primitivos e objetos evita falsas sensações de imutabilidade.")
        ]
      },
      {
        id: "java-c05-u2-l4-validacao-de-argumentos",
        title: "Validação defensiva de argumentos recebidos",
        subtitle: "Parâmetros · Protegendo métodos contra valores nulos e estados inconsistentes",
        theory: "Métodos robustos validam argumentos logo no início (fail-fast). Em Java, verifica-se nulos lançando NullPointerException e faixas numéricas com IllegalArgumentException. A partir do Java 9, a classe utilitária java.util.Objects simplifica checagens com requireNonNull.",
        questions: [
          q("Qual exceção padrão deve ser lançada ao detectar que um argumento numérico viola as regras de negócio?", "IllegalArgumentException", ["NullPointerException","IndexOutOfBoundsException","ClassCastException"], "IllegalArgumentException é a exceção padrão da biblioteca Java para valores de entrada inválidos."),
          q("Qual método utilitário da classe java.util.Objects verifica se uma referência não é nula?", "Objects.requireNonNull(obj)", ["Objects.isNotNull(obj)","Objects.validate(obj)","Objects.checkNull(obj)"], "requireNonNull lança NullPointerException imediatamente com mensagem customizada se a referência for null."),
          q("O que caracteriza a filosofia fail-fast na validação de parâmetros de métodos?", "Detectar e rejeitar entradas inválidas no primeiro instante antes de iniciar qualquer processamento", ["Tentar contornar erros e continuar silenciosamente","Executar o algoritmo e checar erros apenas no final"], "Falhar rápido impede que estados corrompidos se propagem para o restante da aplicação."),
          q("Qual exceção deve ser lançada se um método de paginação receber um índice de página negativo?", "IllegalArgumentException", ["NullPointerException","IllegalStateException","ArithmeticException"], "Argumentos numéricos fora do domínio válido configuram violação de argumento ilegal."),
          t("Qual classe de exceção padrão de Java sinaliza que um argumento é nulo de forma indevida?", ["NullPointerException"], "NullPointerException é a exceção típica ao exigir referências válidas.", "throw new ____(\"O nome não pode ser nulo\");"),
          g("Complete o teste de guarda para impedir valores de salário menores ou iguais a zero.", ["IllegalArgumentException"], "IllegalArgumentException sinaliza que o parâmetro numérico foi rejeitado pela regra de negócio.", "if (salario <= 0) throw new ____(\"Salário deve ser positivo\");"),
          o("Ordene a estrutura canônica de um método seguro com validação defensiva.", ["Checagem de pré-condições dos parâmetros","Lançamento de exceção explicativa se inválido","Execução da lógica central do negócio","Retorno do resultado processado"], "Validar pré-condições no início do método impede anomalias durante a execução."),
          p("Associe a violação de parâmetro à exceção adequada em Java.", [["Argumento null obrigatório","NullPointerException"],["Valor menor que o mínimo permitido","IllegalArgumentException"],["Operação em objeto fechado","IllegalStateException"],["Índice fora do tamanho da lista","IndexOutOfBoundsException"]], "O uso correto de exceções semânticas enriquece o diagnóstico de bugs no software.")
        ]
      },
      {
        id: "java-c05-u2-l5-convencoes-de-nomenclatura-parametros",
        title: "Convenções e expressividade em parâmetros",
        subtitle: "Parâmetros · Clareza semântica, padrão camelCase e diferenciação com this",
        theory: "Identificadores de parâmetros em Java devem seguir estritamente o padrão camelCase e descrever com precisão o dado recebido, evitando abreviações crípticas como a, x ou temp. Quando o nome do parâmetro coincide com o nome de um campo de instância da classe, utiliza-se a palavra-chave this para desambiguar a atribuição.",
        questions: [
          q("Qual convenção de nomenclatura de variáveis é o padrão oficial para parâmetros em Java?", "lowerCamelCase (ex: taxaJuros, saldoInicial)", ["snake_case (ex: taxa_juros)","UPPER_SNAKE_CASE","PascalCase"], "O padrão de código Java preconiza lowerCamelCase para variáveis, métodos e parâmetros formais."),
          q("Como desambiguar a atribuição quando o parâmetro possui o mesmo nome do campo da classe?", "this.saldo = saldo;", ["saldo = saldo;","super.saldo = saldo;","saldo = this;"], "O qualificador this.saldo referencia a variável de instância, enquanto saldo referencia o parâmetro local."),
          q("Por que parâmetros de tipo boolean devem preferencialmente usar prefixos como is, has ou should?", "Para comunicar imediatamente a natureza de pergunta ou predicado do parâmetro", ["Porque o compilador exige esses prefixos em booleanos","Para otimizar o empacotamento de bits na JVM"], "Prefixos semânticos em booleanos tornam a chamada mais intuitiva e autodocumentada."),
          q("Qual identificador de parâmetro é mais expressivo para receber um período em dias?", "diasPermanencia", ["d","num","valorTemporario","temp"], "Nomes claros e expressivos tornam a leitura do código fluida sem necessidade de comentários excessivos."),
          t("Qual palavra-chave referencia o membro da classe quando há conflito de nome com o parâmetro?", ["this"], "this referencia o objeto atual em métodos de instância.", "this.nome = ____;"),
          g("Complete a atribuição do campo de instância diferenciando-o do parâmetro homônimo.", ["this"], "this aponta explicitamente para o campo de instância.", "____.idade = idade;"),
          o("Ordene as etapas recomendadas para escolher nomes de parâmetros.", ["Identificar a responsabilidade e tipo do dado recebido","Escolher um substantivo ou frase substantiva clara","Formatar em camelCase iniciando com letra minúscula","Verificar se o nome desambigua claramente campos internos"], "Boas escolhas lexicais elevam significativamente o nível de manutenibilidade do código."),
          p("Associe a qualidade do nome do parâmetro à avaliação de boas práticas.", [["prazoEmMeses","Excelente clareza semântica e unidade explícita"],["p","Ruim por ser abreviação críptica e sem significado"],["estaAtivo","Boa formulação para predicado booleano"],["param1","Péssimo por não descrever a função do dado no método"]], "Nomes de parâmetros claros funcionam como contratos vivos na interface de programação.")
        ]
      }
    ],
    3: [
      {
        id: "java-c05-u3-l1-instrucao-return",
        title: "A instrução return e fluxos de controle",
        subtitle: "Retornos · Encerrando a chamada e entregando resultados à pilha de execução",
        theory: "A instrução return cumpre duas funções essenciais: encerra imediatamente a execução do método atual e devolve o controle (e opcionalmente um valor resultante) ao ponto chamador na pilha de execução. Em métodos não-void, a expressão retornada deve ser rigorosamente compatível com o tipo anunciado na assinatura.",
        questions: [
          q("O que acontece com as instruções que aparecem após um return incondicional no mesmo bloco?", "O compilador emite um erro de código inalcançável (unreachable code)", ["São executadas em segundo plano","São ignoradas sem qualquer aviso"], "O compilador Java detecta código estaticamente inalcançável e aborta o processo de compilação."),
          q("Como a JVM recupera o valor resultante produzido por um método invocado?", "Desempilha o frame do método e posiciona o valor no topo do frame do método chamador", ["Escreve o resultado em um arquivo temporário no disco","Armazena em uma lista global da aplicação"], "A transferência de retorno é realizada através da pilha de execução (call stack) da thread ativa."),
          q("Em um método com múltiplos desvios condicionais (if/else), o que é obrigatório para compilar?", "Que todos os caminhos possíveis de execução terminem em um return ou lancem uma exceção", ["Basta que o primeiro if tenha um return","Apenas o bloco else precisa ter return"], "O compilador verifica exaustivamente todos os ramos de controle para assegurar a devolução de valor."),
          q("É possível retornar o resultado de uma expressão complexa diretamente no return?", "Sim, a expressão é avaliada primeiro e seu resultado final é entregue como retorno", ["Não, deve-se sempre salvar o resultado em variável intermediária","Apenas para expressões com números inteiros"], "O comando return avalia a expressão à sua direita antes de transferir o controle ao chamador."),
          t("Qual instrução em Java encerra a execução do método e entrega o valor calculado?", ["return"], "A palavra return finaliza a rotina entregando o resultado.", "____ resultado * 2;"),
          g("Complete o retorno devolvendo o dobro do valor calculado.", ["return"], "return devolve o valor avaliado.", "public int calcular(int n) { ____ n * 2; }"),
          o("Ordene a sequência de eventos ao atingir uma instrução return com expressão.", ["Avaliação da expressão matemática ou lógica à direita","Compatibilização do tipo resultante com a assinatura","Desalocação do stack frame das variáveis locais","Devolução do valor calculado ao chamador na pilha"], "A avaliação precede o desempilhamento e a transferência do fluxo de controle."),
          p("Associe a estrutura do método ao comportamento da instrução return.", [["Método void","return sem argumentos para término antecipado"],["Método int","Obrigatório retornar expressão de tipo int ou compatível"],["Código após return incondicional","Erro de compilação por unreachable code"],["Operador ternário no return","Avalia a condição e devolve um de dois valores"]], "A disciplina no uso do return garante clareza no fluxo de término das rotinas.")
        ]
      },
      {
        id: "java-c05-u3-l2-retorno-primitivo-vs-objeto",
        title: "Retorno de tipos primitivos vs retorno de referências",
        subtitle: "Retornos · Cópia de bits vs compartilhamento de ponteiros no heap",
        theory: "Ao retornar um tipo primitivo (int, double), uma cópia de bits é entregue ao chamador. Ao retornar um objeto (lista ou entidade), o que é devolvido é uma cópia da referência que aponta para o heap, permitindo que o chamador observe ou modifique o mesmo objeto compartilhado.",
        questions: [
          q("O que exatamente é devolvido quando um método tem como retorno uma classe ou objeto?", "Uma cópia da referência que aponta para o objeto residente na memória heap", ["Uma cópia profunda (clone) de todo o conteúdo do objeto","Uma cópia serializada dos bytes em disco"], "Java trabalha sempre com passagem e retorno por valor; para objetos, esse valor é a referência de memória."),
          q("O que acontece se um método retornar uma variável primitiva int e o chamador modificar o resultado recebido?", "A variável interna do método que forneceu o valor não é de forma alguma afetada", ["Ambas as variáveis permanecem sincronizadas","Ocorre erro de acesso à memória"], "Tipos primitivos residem no stack frame e suas cópias são totalmente independentes."),
          q("Qual é o perigo de retornar diretamente uma referência de array interno mutável de uma classe?", "Quebra de encapsulamento, pois o chamador pode alterar os elementos do array original", ["Causa travamento imediato do garbage collector","Erro de compilação por tipo inseguro"], "Expor estruturas internas mutáveis permite alterações externas não controladas pela classe dona dos dados."),
          q("Qual técnica previne que o chamador altere estruturas internas retornadas por um método?", "Cópia defensiva (defensive copy) antes de retornar os dados", ["Declarar o método como synchronized","Marcar o array interno como transient"], "Retornar uma cópia isolada garante que o estado interno original permaneça inviolado."),
          t("O que um método com retorno de tipo referência devolve caso não aponte para objeto algum?", ["null"], "null representa a ausência de instância referenciada.", "public Conta buscarPorId(int id) { return ____; }"),
          g("Complete o retorno criando uma cópia defensiva da lista de nomes.", ["new ArrayList<>(nomes)"], "Instanciar uma nova coleção isola o estado interno de mutações externas.", "return ____;"),
          o("Ordene as etapas para implementar um retorno seguro com cópia defensiva.", ["Identificar que a estrutura interna de dados é mutável","Criar uma nova instância independente contendo os mesmos dados","Preencher a nova instância com os elementos originais","Retornar a nova referência preservando o encapsulamento interno"], "A cópia defensiva é o padrão seguro para devolução de coleções e arrays internos."),
          p("Associe o tipo de dado devolvido ao comportamento de memória.", [["Retorno de tipo primitivo","Cópia de bits independente na pilha do chamador"],["Retorno de objeto mutável","Referência compartilhada apontando para a mesma instância no heap"],["Retorno de objeto imutável","Referência segura compartilhada sem risco de mutação"],["Retorno de null","Sinaliza explicitamente a ausência de referência a um objeto"]], "Compreender a diferença entre valores primitivos e ponteiros de referência é vital em Java.")
        ]
      },
      {
        id: "java-c05-u3-l3-evitando-null-com-optional",
        title: "Modelando ausência de valor com Optional<T>",
        subtitle: "Retornos · Substituindo referências nulas por contêineres expressivos do Java 8",
        theory: "Retornar null para indicar que um resultado não foi encontrado é uma fonte comum de NullPointerException. Desde o Java 8, a classe java.util.Optional<T> fornece um contêiner formal que expressa explicitamente a presença ou ausência de um valor, forçando o chamador a lidar conscientemente com ambos os cenários.",
        questions: [
          q("Qual é o objetivo principal da classe Optional em Java?", "Representar explicitamente em assinaturas de métodos a possibilidade de ausência de resultado", ["Aumentar o desempenho de busca em coleções","Substituir todos os tipos primitivos em Java"], "Optional foi desenhado como tipo de retorno para tornar explícita a possibilidade de valor ausente."),
          q("Como se instancia um Optional contendo um valor garantidamente não-nulo?", "Optional.of(valor)", ["Optional.empty()","Optional.ofNullable(null)","new Optional(valor)"], "Optional.of exige um valor não-nulo; caso receba null, lança NullPointerException imediatamente."),
          q("Qual método de Optional permite obter o valor encapsulado ou um padrão se estiver vazio?", "opt.orElse(valorPadrao)", ["opt.getOrDefault(valorPadrao)","opt.fallback(valorPadrao)","opt.valueOr(valorPadrao)"], "orElse devolve o dado se presente ou o valor alternativo estipulado no parâmetro."),
          q("Como se instancia um Optional que pode legitimamente receber tanto um objeto quanto null?", "Optional.ofNullable(objeto)", ["Optional.of(objeto)","Optional.maybe(objeto)","Optional.wrap(objeto)"], "ofNullable cria um Optional com o valor se não-nulo, ou um Optional.empty() se for null."),
          t("Qual método de Optional cria uma instância explicitamente vazia sem lançar exceção?", ["empty","Optional.empty"], "Optional.empty() representa formalmente a ausência de valor.", "return Optional.____();"),
          g("Complete o retorno para fornecer um valor alternativo seguro caso o Optional esteja vazio.", ["orElse"], "orElse entrega um valor padrão caso o contêiner não possua valor.", "String resultado = opt.____(\"Desconhecido\");"),
          o("Ordene as etapas recomendadas ao consumir um método que devolve Optional.", ["Invocar o método que retorna Optional<T>","Verificar se o valor está presente com isPresent ou orElse","Extrair o conteúdo fornecendo uma alternativa segura","Processar o valor sem risco de NullPointerException"], "Optional orienta o programador a tratar a ausência de dados de forma declarativa e segura."),
          p("Associe o método de Optional à sua operação correspondente.", [["Optional.empty()","Cria um contêiner expressamente vazio"],["Optional.of(val)","Cria contêiner e exige que val não seja nulo"],["Optional.ofNullable(val)","Cria contêiner tolerando val como nulo ou preenchido"],["opt.isPresent()","Retorna true se houver um valor contido"]], "Optional transforma a ausência de valores em uma verificação obrigatória em tempo de projeto.")
        ]
      },
      {
        id: "java-c05-u3-l4-early-return-e-guard-clauses",
        title: "Retorno antecipado e cláusulas de guarda",
        subtitle: "Retornos · Reduzindo aninhamento de ifs com saídas precoces e limpas",
        theory: "A técnica de early return (retorno antecipado) utiliza cláusulas de guarda no topo do método para tratar casos especiais, entradas inválidas ou condições de borda, retornando imediatamente. Isso elimina múltiplos níveis de indentação gerados por if/else aninhados, tornando o fluxo principal reto e fácil de ler.",
        questions: [
          q("Qual é o principal benefício estético e estrutural de adotar a técnica de early return?", "Reduz drasticamente o aninhamento profundo de blocos if/else no código", ["Gera código binário mais compacto no compilador","Impede que o método lance qualquer exceção"], "Cláusulas de guarda mantêm o fluxo feliz (happy path) na coluna mais à esquerda do editor."),
          q("Onde devem ser posicionadas as cláusulas de guarda dentro de um método bem estruturado?", "Nas primeiras linhas do corpo do método, antes da lógica de processamento", ["No final do método, após todas as contas","Espalhadas aleatoriamente em cada bloco else"], "Tratar exceções e casos extremos no início limpa o terreno para o fluxo principal de negócio."),
          q("Em contraste com o padrão estruturado rígido antigo de ponto único de saída, o early return prega que:", "Múltiplos retornos pontuais são benéficos quando simplificam a lógica de leitura", ["Nunca se deve utilizar a palavra return mais de uma vez","Toda função deve ter exatamente 10 linhas"], "A engenharia moderna valoriza a legibilidade e simplicidade promovida por saídas antecipadas."),
          q("O que uma cláusula de guarda costuma fazer quando detecta uma violação inaceitável?", "Retornar um valor padrão imediato ou lançar uma exceção de interrupção", ["Entrar em loop infinito aguardando correção","Chamar System.exit(0)"], "A cláusula de guarda rejeita a precondição de forma rápida e limpa."),
          t("Como é chamada a instrução condicional no topo do método que encerra o fluxo precocemente?", ["guarda","clausula de guarda","guard clause"], "Cláusulas de guarda inspecionam precondições no início do método.", "if (usuario == null) return false; // clausula de ____"),
          g("Complete a cláusula de guarda para interromper o cálculo se a quantidade for menor que um.", ["return"], "A saída antecipada simplifica os caminhos restantes de execução.", "if (quantidade < 1) { ____ 0.0; }"),
          o("Ordene a estrutura recomendada de um método aplicando cláusulas de guarda.", ["Verificação de precondições nulas ou vazias com saída rápida","Validação de faixas numéricas com retorno antecipado","Cálculo do fluxo principal de negócio sem aninhamento","Retorno do resultado final processado"], "A leitura do método torna-se linear e intuitiva."),
          p("Associe a abordagem ao estilo de organização do código.", [["Ponto único de saída clássico","Acúmulo de ifs aninhados em árvore profunda"],["Cláusulas de guarda (guard clauses)","Validações no topo com retornos imediatos"],["Happy path linear","Fluxo principal de sucesso sem indentação excessiva"],["Fail-fast antecipado","Detecção e rejeição imediata de entradas corrompidas"]], "Early returns favorecem a manutenção a longo prazo e a redução da complexidade ciclomática.")
        ]
      },
      {
        id: "java-c05-u3-l5-retorno-de-multiplos-valores-records",
        title: "Retornando múltiplos valores com Records",
        subtitle: "Retornos · Modelando resultados compostos de forma concisa e tipada no Java 16+",
        theory: "Como Java permite retornar apenas um único valor por método, historicamente criavam-se classes utilitárias para agrupar múltiplos dados. A partir do Java 16, a introdução de Records resolveu isso, fornecendo portadores de dados imutáveis, fortemente tipados e declarados em uma linha.",
        questions: [
          q("Qual construção moderna do Java (16+) é ideal para métodos que precisam devolver dois ou mais valores?", "record", ["tuple","pair","struct"], "Java não possui tuplas primitivas nativas; Records preenchem essa função com tipagem nominal segura."),
          q("Qual é uma característica fundamental dos campos gerados automaticamente por um record?", "São imutáveis (declarados como private final com getters automáticos)", ["São públicos e reatribuíveis livremente","São variáveis estáticas compartilhadas"], "Records são imutáveis por padrão, gerando acessores, equals, hashCode e toString automaticamente."),
          q("Como os métodos de acesso (getters) aos componentes de um record são nomeados?", "Pelo próprio nome do componente, sem o prefixo get (ex: resultado.total())", ["Usando o padrão getNome()","Apenas por acesso direto a atributo público","Usando método value()"], "Em Records, um componente chamado total é acessado simplesmente por total(), sem o prefixo get."),
          q("É permitido declarar um record localmente dentro do corpo de um método em Java?", "Sim, records locais são perfeitamente válidos e úteis para escopos restritos", ["Não, records só podem ser declarados no topo do arquivo","Apenas se o método for estático"], "Records locais permitem empacotar dados temporários sem poluir o escopo global da classe."),
          t("Qual palavra-chave do Java moderno define uma estrutura imutável de dados concisa?", ["record"], "record define um portador de dados imutável.", "public ____ ResultadoCalculo(int soma, double media) { }"),
          g("Complete a declaração do record para empacotar as coordenadas x e y de um ponto.", ["record"], "record declara classes transparentes de transporte de dados.", "public ____ Ponto(int x, int y) { }"),
          o("Ordene os passos para retornar e consumir múltiplos valores com um record em Java.", ["Declarar o record com seus componentes constitutivos","Executar o cálculo de todos os valores no método","Instanciar o record com new NomeRecord(val1, val2)","Receber a instância no chamador e ler os acessores nomeados"], "Records promovem tipagem nominal explícita e elegante para retornos compostos."),
          p("Associe a estratégia de retorno de múltiplos dados à sua avaliação.", [["record Nomeado(int x, int y)","Abordagem moderna, imutável e com nomes claros de campos"],["Array Object[] {x, y}","Insegura por exigir casts manuais e perder nomes de campos"],["Parâmetros mutáveis de saída","Má prática que induz efeitos colaterais ocultos"],["Map<String, Object>","Perda de tipagem estática e suscetível a erros de digitação"]], "Records conferem segurança sem a sobrecarga de escrever classes convencionais com boilerplate.")
        ]
      }
    ],
    4: [
      {
        id: "java-c05-u4-l1-escopo-de-bloco",
        title: "Escopo de bloco e visibilidade de variáveis",
        subtitle: "Escopo · Como chaves delimitam a vida e o alcance de identificadores locais",
        theory: "Em Java, qualquer par de chaves {} estabelece um bloco com escopo próprio. Variáveis declaradas dentro de um bloco nascem no ponto de sua declaração e deixam de existir imediatamente quando a execução cruza a chave de fechamento, ficando inacessíveis para qualquer instrução externa.",
        questions: [
          q("O que define as fronteiras físicas de um escopo léxico em Java?", "O par de chaves delimitador {} onde a variável foi declarada", ["A indentação por tabulações no início da linha","O final do arquivo-fonte .java"], "Em Java, blocos delimitados por chaves {} estabelecem rigidamente as fronteiras de visibilidade de identificadores."),
          q("O que acontece ao tentar acessar uma variável de controle de um laço for fora do laço?", "Erro de compilação, pois a variável deixa de existir fora do corpo do for", ["O valor assume null automaticamente","A variável retém o último valor iterado"], "Variáveis declaradas no cabeçalho de um for têm escopo restrito estritamente à execução daquele laço."),
          q("É permitido utilizar uma variável antes da linha em que ela foi declarada no mesmo método?", "Não, em Java identificadores locais não sofrem hoisting e só existem após sua linha de declaração", ["Sim, variáveis locais são hoisted para o topo do método","Apenas para tipos numéricos primitivos"], "A declaração deve preceder obrigatoriamente qualquer menção à variável no fluxo sequencial."),
          q("O que ocorre com a memória ocupada por variáveis locais de um bloco após seu término?", "Os valores no stack frame tornam-se elegíveis para reutilização imediata na pilha", ["São enviadas para o heap para serem coletadas pelo GC","Ficam retidas até o final do programa"], "Variáveis locais residem na pilha de chamadas e são descartadas instantaneamente pelo ponteiro de stack."),
          t("Quais caracteres delimitadores criam um novo bloco de escopo léxico em Java?", ["chaves","{}","{ }"], "O par de chaves {} abre e fecha blocos de escopo.", "void testar() ____ int x = 10; ____"),
          g("Complete a declaração do bloco condicional que isola o escopo da variável temporária.", ["{"], "A abertura de chaves inicia um novo escopo restrito.", "if (ativo) ____ int temp = 42; processar(temp); }"),
          o("Ordene o ciclo de vida de uma variável local delimitada por um bloco if.", ["Execução avalia a condição do bloco como verdadeira","Chave de abertura do bloco é cruzada","Variável é declarada e alocada na pilha","Corpo do bloco é executado utilizando a variável","Chave de fechamento é atingida e variável deixa de existir"], "O tempo de vida de identificadores de bloco é estritamente casado com as fronteiras de chaves."),
          p("Associe o escopo da variável ao seu ponto de desalocação.", [["Variável de controle do laço for","Desalocada logo após a última iteração do laço"],["Parâmetro formal do método","Desalocado no encerramento da execução do método"],["Variável dentro de um bloco if","Desalocada assim que o bloco condicional fecha"],["Campo de instância de classe","Permanece vivo enquanto o objeto estiver no heap"]], "Entender onde cada dado vive e morre é essencial para gestão eficiente de memória.")
        ]
      },
      {
        id: "java-c05-u4-l2-sombreamento-shadowing",
        title: "Sombreamento de variáveis (variable shadowing)",
        subtitle: "Escopo · Conflito entre variáveis locais e campos de instância",
        theory: "O sombreamento ocorre quando uma variável declarada em um escopo interno possui o mesmo nome de um campo pertencente ao escopo da classe. O identificador local oculta o campo externo dentro daquele bloco, exigindo o uso explícito da palavra-chave this para referenciar a variável de instância da classe.",
        questions: [
          q("O que caracteriza o fenômeno de shadowing em métodos Java?", "Uma variável local ou parâmetro tem o mesmo identificador de um campo da classe", ["Uma variável estática sobrepõe uma classe inteira","Duas variáveis locais têm o mesmo nome no mesmo bloco"], "O sombreamento ocorre pela sobreposição de nomes entre campos de classe e variáveis locais."),
          q("É permitido em Java declarar duas variáveis locais com o mesmo nome em blocos aninhados de um mesmo método?", "Não, Java proíbe expressamente redeclarar o mesmo nome em escopos locais sobrepostos", ["Sim, o bloco interno simplesmente oculta a variável externa","Apenas se os tipos forem diferentes"], "Diferente de C++, Java não permite que uma variável local interna mascare outra variável local externa no mesmo método."),
          q("Como acessar um campo de instância x sombreado por um parâmetro formal homônimo x?", "this.x", ["super.x","x.this","Class.x"], "A palavra-chave this aponta explicitamente para a instância atual, contornando o sombreamento local."),
          q("Em métodos estáticos, é possível usar this para desambiguar um campo estático sombreado?", "Não, pois this inexiste em contexto estático; deve-se usar NomeDaClasse.campo", ["Sim, this funciona igualmente em métodos estáticos","Não, campos estáticos não podem sofrer sombreamento"], "Em métodos estáticos, a desambiguação deve ser feita pelo identificador da própria classe."),
          t("Qual palavra-chave desfaz o sombreamento de um campo estático na classe Usuario?", ["Usuario","Nome da classe"], "Usa-se o nome da classe para qualificar campos estáticos sombreados.", "____.contador = contador;"),
          g("Complete o código usando a referência de instância para resolver o sombreamento do atributo idade.", ["this.idade"], "this.idade diferencia o atributo da classe do parâmetro idade.", "____ = idade;"),
          o("Ordene a precedência de resolução de identificadores adotada pelo compilador Java.", ["Variáveis locais declaradas no bloco atual mais interno","Parâmetros formais recebidos pelo método","Campos de instância do objeto atual (this)","Campos herdados de superclasses"], "A busca de resolução léxica vai sempre do escopo mais específico para o mais abrangente."),
          p("Associe o identificador à forma correta de acessá-lo quando sombreado.", [["Campo de instância da classe","this.campo"],["Campo estático da classe","NomeClasse.campo"],["Parâmetro formal do método","campo (sem prefixo)"],["Campo de instância da superclasse","super.campo"]], "A qualificação explícita afasta ambiguidades e previne atribuições equivocadas.")
        ]
      },
      {
        id: "java-c05-u4-l3-pilha-de-execucao-call-stack",
        title: "A pilha de chamadas e o ciclo de vida dos métodos",
        subtitle: "Escopo · Empilhamento e desempilhamento de stack frames na JVM",
        theory: "Cada invocação de método cria um stack frame exclusivo na pilha de chamadas (call stack) da thread, contendo seus parâmetros, variáveis locais e o ponteiro de retorno. Quando o método termina, seu frame é desempilhado e destruído, restaurando o contexto do chamador sem deixar resíduos na memória de pilha.",
        questions: [
          q("O que a JVM aloca na pilha de chamadas toda vez que um método é invocado?", "Um stack frame contendo variáveis locais, parâmetros e controle de fluxo", ["Uma nova cópia de todos os arquivos de classe do projeto","Uma região dedicada de memória heap"], "Stack frames são alocações ultrarrápidas de tamanho estaticamente calculado para gerenciar execuções."),
          q("Qual estrutura de dados governa o comportamento da call stack em Java?", "LIFO (Last-In, First-Out: o último método chamado é o primeiro a retornar)", ["FIFO (First-In, First-Out)","Árvore binária de busca balanceada","Fila de prioridades com heap"], "A pilha de chamadas opera sob o princípio LIFO, desempilhando o método mais recente ao atingir return."),
          q("O que acontece se métodos se invocarem em cascata profunda sem atingir condição de término?", "Ocorre um erro irrecuperável do tipo java.lang.StackOverflowError", ["O heap é expandido automaticamente para acomodar a pilha","A JVM encerra os métodos sem aviso"], "Esgotar a capacidade de memória da pilha reservada pela thread dispara StackOverflowError."),
          q("Variáveis primitivas declaradas dentro de um método são alocadas em qual região de memória?", "Diretamente no stack frame do método na pilha de execução", ["No espaço de classes da memória permanente","No heap compartilhado entre threads"], "Primitivos locais vivem diretamente na pilha, proporcionando acesso de velocidade imediata."),
          t("Qual erro fatal é lançado quando o número de frames excede o limite físico da pilha da JVM?", ["StackOverflowError"], "StackOverflowError indica o esgotamento do espaço reservado para a call stack.", "Exception in thread \"main\" java.lang.____"),
          g("Complete o conceito: a pilha opera segundo o princípio de primeiro que entra, último que sai.", ["LIFO"], "A sigla LIFO resume a disciplina operacional da pilha.", "A call stack organiza frames segundo a política ____."),
          o("Ordene os eventos de uma chamada de método aninhada (A chama B, B executa e retorna).", ["Método A inicia execução e ocupa seu frame na pilha","Método A invoca o método B","Novo frame para B é empilhado no topo da pilha","B conclui a execução e seu frame é desempilhado","A retoma a execução com o resultado no ponto onde pausou"], "O fluxo de frames na pilha orquestra com perfeição as chamadas aninhadas de sub-rotinas."),
          p("Associe a região de memória da JVM ao tipo de dado que abriga.", [["Stack frame (pilha)","Variáveis locais primitivas e referências de ponteiros locais"],["Heap memory","Instâncias reais de objetos e arrays compartilhados"],["Metaspace","Metadados de classes e códigos de métodos compilados"],["Contador de programa (PC)","Endereço da próxima instrução de bytecode a executar"]], "Distinguir a pilha do heap é o divisor de águas na compreensão do modelo de execução da JVM.")
        ]
      },
      {
        id: "java-c05-u4-l4-inferencia-de-tipos-var",
        title: "Inferência de tipos locais com a palavra-chave var",
        subtitle: "Escopo · Concisão com tipagem estática e segura a partir do Java 10",
        theory: "Introduzida no Java 10, a palavra-chave var permite que o compilador deduza automaticamente o tipo estático de uma variável local a partir de sua expressão inicializadora. Importante ressaltar que Java continua fortemente tipado: var não cria tipos dinâmicos e seu uso é restrito a variáveis locais com atribuição.",
        questions: [
          q("O uso de var em Java transforma a linguagem em uma plataforma de tipagem dinâmica?", "Não, o compilador infere o tipo estático exato na compilação e ele jamais muda", ["Sim, a variável pode receber strings e depois números livremente","Apenas dentro de blocos de teste unitário"], "var é mera conveniência sintática de compilação; a checagem de tipos estática permanece 100% rígida."),
          q("Onde é permitido utilizar a palavra-chave var em Java?", "Exclusivamente em variáveis locais dentro de métodos, laços e blocos com inicializador", ["Em parâmetros de métodos, retornos e campos de classes","Em atributos públicos de interfaces"], "O escopo de var é deliberadamente restrito a variáveis locais declaradas com valor inicial explícito."),
          q("Por que a instrução var total; resulta em erro imediato de compilação?", "Porque var exige obrigatoriamente um inicializador para que o compilador possa deduzir o tipo", ["Porque a palavra var foi descontinuada","Porque falta o modificador final"], "Sem uma expressão inicializadora na mesma instrução, o compilador não tem como inferir o tipo."),
          q("Qual é um exemplo consagrado de boa prática ao usar var?", "Ao instanciar classes com nomes longos (ex: var lista = new ArrayList<Usuario>();)", ["Ao receber retorno de métodos genéricos sem tipo visível","Para mascarar tipos complexos"], "var brilha quando o tipo está explicitamente manifesto no lado direito da atribuição."),
          t("A partir de qual versão do Java a palavra-chave var para variáveis locais foi introduzida?", ["10","Java 10","JDK 10"], "O Java 10 oficializou a inferência de tipos para variáveis locais (JEP 286).", "// Recurso adicionado no Java ____"),
          g("Complete a declaração utilizando inferência de tipo local para instanciar a lista.", ["var"], "var deduz o tipo estático a partir do lado direito.", "____ mapa = new HashMap<String, Integer>();"),
          o("Ordene a verificação que o compilador realiza ao compilar uma linha com var.", ["Identifica o uso da palavra-chave reservada contextual var","Analisa a expressão de atribuição do lado direito","Deduz o tipo estático mais específico da expressão","Fixa o tipo estático da variável pelo resto de sua existência"], "A inferência ocorre integralmente em tempo de compilação, sem sobrecarga em runtime."),
          p("Associe a declaração à sua validade segundo as regras do Java 10+.", [["var total = 100;","Válida: int inferido a partir do literal"],["var nome = \"Ana\";","Válida: String inferida com precisão"],["var semValor;","Inválida: falta de inicializador impede a inferência"],["public var taxa = 0.1;","Inválida: proibido usar var em campos de classe"]], "Dominar as fronteiras de var garante legibilidade sem comprometer a robustez estática.")
        ]
      },
      {
        id: "java-c05-u4-l5-constantes-locais-final",
        title: "Constantes locais com o modificador final",
        subtitle: "Escopo · Bloqueando reatribuições e promovendo design imutável em métodos",
        theory: "O modificador final aplicado a variáveis locais de um método impede que seu valor seja reatribuído após a primeira inicialização. Variáveis que nunca mudam de valor durante o escopo, mesmo que não marcadas explicitamente com final, são consideradas \"efetivamente finais\" pelo compilador a partir do Java 8.",
        questions: [
          q("O que acontece se tentarmos reatribuir uma variável local declarada como final int MAX = 10;?", "O compilador emite um erro de compilação proibindo nova atribuição", ["O valor é atualizado normalmente em tempo de execução","A JVM lança uma RuntimeException"], "Variáveis marcadas com final tornam-se constantes estritas de atribuição única."),
          q("O que significa o conceito de variável \"efetivamente final\" (effectively final) em Java?", "Uma variável que nunca teve seu valor reatribuído após a inicialização, mesmo sem a palavra final", ["Uma variável estática declarada no nível do pacote","Uma variável que pode mudar apenas uma vez por segundo"], "O conceito foi introduzido no Java 8 para permitir o uso em expressões lambda e classes anônimas."),
          q("Por que expressões lambda e classes anônimas exigem que variáveis locais externas sejam finais?", "Para garantir consistência e evitar problemas de concorrência com o stack frame desalocado", ["Porque a JVM não suporta ponteiros no heap","Para reduzir o tamanho dos arquivos .class"], "Como a lambda pode viver mais que o stack frame do método, o valor precisa ser imutável para ser capturado com segurança."),
          q("É permitido declarar final var total = 200; combinando ambos os modificadores?", "Sim, combina inferência de tipo local com garantia de imutabilidade estrita", ["Não, final e var são mutuamente exclusivos","Apenas a partir do Java 21"], "A combinação final var é 100% válida e encorajada para variáveis locais imutáveis inferidas."),
          t("Qual modificador garante que uma variável local receba valor apenas uma única vez?", ["final"], "final impede qualquer modificação posterior do valor.", "____ double PI = 3.14159;"),
          g("Complete a declaração combinando final e var para criar uma constante local inferida.", ["final var"], "final var cria uma constante local fortemente tipada por inferência.", "____ limite = 1000;"),
          o("Ordene os estados de uma variável final no ciclo de compilação.", ["Declaração da variável com o modificador final","Primeira atribuição obrigatória de valor","Tentativa de reatribuição no código subsequente","Compilador detecta violação e cancela a compilação com erro"], "A regra do blank final exige atribuição única e definitiva."),
          p("Associe o modificador à restrição imposta à variável.", [["final int x = 5;","Constante local primitiva inalterável"],["final var lista = new ArrayList<>();","Referência fixa, mas elementos da lista podem ser adicionados"],["int x = 5; (sem reatribuição)","Efetivamente final, pode ser capturada por lambdas"],["int x = 5; x++;","Variável mutável, proibida de ser capturada em lambdas"]], "Imutabilidade local simplifica o raciocínio sobre o fluxo do código e previne defeitos sutis.")
        ]
      }
    ],
    5: [
      {
        id: "java-c05-u5-l1-conceito-sobrecarga-assinatura",
        title: "Fundamentos da sobrecarga de métodos (overloading)",
        subtitle: "Sobrecarga · Múltiplos métodos homônimos diferenciados pela lista de parâmetros",
        theory: "A sobrecarga (overloading) permite que uma mesma classe possua dois ou mais métodos com o mesmo identificador, desde que suas listas de parâmetros difiram em quantidade, tipos ou ordem dos tipos. Em Java, a assinatura formal que desambigua métodos é composta unicamente pelo nome e pelos tipos dos parâmetros.",
        questions: [
          q("Quais elementos constituem formalmente a assinatura de um método para fins de sobrecarga?", "O nome do método e a lista ordenada dos tipos de seus parâmetros", ["O nome do método, tipos de parâmetros e tipo de retorno","O modificador de acesso e os nomes dos parâmetros"], "Em Java, modificadores e tipo de retorno NÃO fazem parte da assinatura usada para desambiguar sobrecarga."),
          q("O que acontece ao declarar dois métodos com o mesmo nome e parâmetros iguais, mas retornos diferentes?", "Erro de compilação, pois tipo de retorno não diferencia sobrecargas", ["O compilador escolhe o método com retorno mais abrangente","Ambos compilam normalmente"], "O compilador rejeita métodos homônimos com listas idênticas de parâmetros, gerando erro de método já definido."),
          q("Mudar apenas o nome dos parâmetros (ex: int a vs int b) permite sobrecarregar um método?", "Não, os nomes dos identificadores são ignorados na diferenciação das assinaturas", ["Sim, nomes diferentes criam novas assinaturas","Apenas se os nomes tiverem tamanhos diferentes"], "O que importa são exclusivamente os tipos dos parâmetros e sua sequência, não os rótulos de nomes."),
          q("Qual é um exemplo de sobrecarga clássica encontrada na classe PrintStream (System.out)?", "Múltiplas versões de println: println(int), println(String), println(boolean)", ["Método println que recebe qualquer dado sem tipagem","Um único println com casting implícito"], "System.out.println exemplifica sobrecarga com dezenas de variantes para todos os tipos primitivos e objetos."),
          t("Em qual momento do ciclo de software a resolução da sobrecarga de métodos é decidida?", ["compilação","tempo de compilação","compile-time"], "A sobrecarga é estática e resolvida 100% durante a compilação.", "A sobrecarga é resolvida em tempo de ____."),
          g("Complete o segundo método sobrecarregado para aceitar uma mensagem textual descritiva.", ["String"], "Alterar o tipo de parâmetro cria uma sobrecarga válida.", "void log(int codigo) { }\nvoid log(____ mensagem) { }"),
          o("Ordene os critérios que o compilador usa para validar a legalidade de uma sobrecarga.", ["Verifica se o nome de ambos os métodos é idêntico","Compara o número total de parâmetros em cada declaração","Compara a ordem e os tipos de cada parâmetro correspondente","Confirma que as listas de tipos diferem em ao menos um parâmetro"], "O compilador valida se existe distinção inequívoca nas listas de tipos."),
          p("Associe o par de declarações à classificação de validade da sobrecarga.", [["void f(int x) e void f(double x)","Sobrecarga válida por tipos de parâmetros distintos"],["void f(int x) e void f(int x, int y)","Sobrecarga válida por quantidade distinta de parâmetros"],["void f(int a) e int f(int b)","Inválida: parâmetros idênticos, retorno não desambigua"],["void f(String s, int n) e void f(int n, String s)","Sobrecarga válida por ordenação diferente dos tipos"]], "Sobrecarga oferece interfaces polimórficas estáticas limpas e expressivas.")
        ]
      },
      {
        id: "java-c05-u5-l2-regras-de-resolucao-sobrecarga",
        title: "Hierarquia de resolução de sobrecarga pelo compilador",
        subtitle: "Sobrecarga · Correspondência exata, promoção, boxing e varargs",
        theory: "Ao encontrar uma chamada a método sobrecarregado, o compilador Java percorre uma hierarquia rigorosa em três fases para eleger o método mais específico: 1) correspondência exata ou alargamento primitivo; 2) autoboxing/unboxing; 3) argumentos variáveis (varargs). O método de maior especificidade sempre vence.",
        questions: [
          q("Qual correspondência tem prioridade máxima na escolha de um método sobrecarregado?", "Correspondência exata do tipo de parâmetro primitivo ou de referência", ["Autoboxing para a classe Wrapper","Passagem via varargs","Conversão via String.valueOf()"], "A correspondência de tipo exato tem a maior precedência de todas na tabela de resolução."),
          q("Entre promoção primitiva (widening) e autoboxing, qual mecanismo o compilador prioriza?", "Promoção primitiva (widening) tem precedência estrita sobre autoboxing", ["Autoboxing sempre vence a promoção primitiva","Ocorrerá erro de ambiguidade em todos os casos"], "Por compatibilidade histórica com Java pré-1.5, o compilador prefere alargamento numérico a boxing."),
          q("Qual mecanismo de parâmetros tem a menor prioridade na resolução de sobrecarga?", "Varargs (argumentos variáveis)", ["Promoção primitiva","Autoboxing","Correspondência exata"], "Métodos com varargs são sempre a última alternativa considerada pelo compilador."),
          q("Se houver calcular(long x) e calcular(Integer x), qual é chamado ao passar calcular(5)?", "calcular(long x), pois o int sofre alargamento primitivo antes de tentar autoboxing", ["calcular(Integer x), pois o valor é inteiro","Nenhum, o código não compila por ambiguidade"], "Alargamento de int para long é testado na fase 1; autoboxing para Integer só seria testado na fase 2."),
          t("Qual termo em inglês descreve a conversão automática de tipo primitivo menor para maior?", ["widening","promocao"], "Widening promove tipos sem perda de grandeza.", "A conversão de int para long chama-se ____ primitivo."),
          g("Complete o tipo do parâmetro que permite sobrecarga por promoção automática de int.", ["double"], "double recebe int por alargamento automático na fase 1.", "void processar(____ valor) { }"),
          o("Ordene as fases de resolução de sobrecarga do compilador Java da mais prioritária para a menos prioritária.", ["Correspondência exata sem conversão","Alargamento primitivo (widening)","Autoboxing / Unboxing para wrappers","Parâmetros com reticências (varargs)"], "A hierarquia em 3 fases garante previsibilidade na resolução de chamadas sobrecarregadas."),
          p("Associe a chamada ao método selecionado para a instrução exibir(10).", [["exibir(int x)","Correspondência exata: prioridade 1 absoluta"],["exibir(long x)","Selecionado por alargamento caso exibir(int) não exista"],["exibir(Integer x)","Selecionado por autoboxing se primitivos maiores não existirem"],["exibir(int... x)","Selecionado como último recurso via varargs"]], "Entender a ordem de precedência evita surpresas no comportamento de código sobrecarregado.")
        ]
      },
      {
        id: "java-c05-u5-l3-ambiguidade-em-sobrecarga",
        title: "Erros de ambiguidade em métodos sobrecarregados",
        subtitle: "Sobrecarga · Quando dois métodos são igualmente específicos e o compilador falha",
        theory: "Um erro de compilação por ambiguidade ocorre quando o compilador encontra dois ou mais métodos compatíveis com a invocação, mas nenhum deles é estritamente mais específico que os concorrentes. Para solucionar a ambiguidade, o desenvolvedor deve realizar um cast explícito no argumento da chamada.",
        questions: [
          q("O que gera a mensagem de erro \"reference to method is ambiguous\" em Java?", "O compilador não consegue decidir qual sobrecarga é a mais específica entre candidatos viáveis", ["Dois métodos foram declarados em classes diferentes","O método foi invocado com argumentos em número incorreto"], "A ambiguidade surge do empate técnico na árvore de especificidade das assinaturas."),
          q("Se existirem print(int, double) e print(double, int), o que ocorre ao chamar print(10, 20)?", "Erro de compilação por ambiguidade, pois 10 e 20 exigem promoções simétricas conflitantes", ["Chama a primeira declaração que encontrar no código","Chama print(double, int) por convenção"], "Ambos os métodos exigem um alargamento primitivo em posições alternadas, gerando empate absoluto."),
          q("Como o desenvolvedor resolve um conflito de ambiguidade na chamada do método?", "Aplicando um casting explícito em um dos argumentos para forçar a escolha da assinatura", ["Alterando a ordem dos imports no arquivo","Renomeando a classe que contém os métodos"], "O casting explicita ao compilador o tipo exato pretendido, desfazendo o empate."),
          q("O que acontece se chamarmos teste(null) existindo teste(String s) e teste(Integer i)?", "Erro de compilação por ambiguidade, pois null é compatível com ambos os tipos de referência", ["String é escolhida por ordem alfabética","Integer é escolhido por ser numérico"], "Tanto String quanto Integer herdam de Object no mesmo nível de hierarquia em relação a null."),
          t("Qual operação manual resolve uma ambiguidade de chamada forçando o tipo do argumento?", ["cast","casting"], "O casting direciona o compilador à assinatura correta.", "calcular((____) 10, 20.0);"),
          g("Complete o casting resolvendo a ambiguidade para invocar a versão com parâmetro double.", ["(double)"], "O casting explícito remove a dúvida do compilador.", "processar(____ valor, 10);"),
          o("Ordene as etapas para diagnosticar e corrigir um erro de ambiguidade de compilação.", ["Identificar na mensagem de erro os métodos concorrentes apontados","Analisar os tipos dos argumentos passados na linha da chamada","Verificar por que nenhum candidato é estritamente mais específico","Inserir casting explícito em um dos argumentos na invocação"], "Desambiguar com casting explícito é a solução imediata para empates de compilação."),
          p("Associe o cenário de sobrecarga ao seu desfecho.", [["f(String) e f(Object) com f(\"texto\")","Chama f(String) por ser subtipo mais específico"],["f(String) e f(Integer) com f(null)","Erro de ambiguidade: ambos são subtipos de Object"],["f(int, long) e f(long, int) com f(1, 1)","Erro de ambiguidade por promoção simétrica"],["f(double, double) com f(1, 1)","Chama f(double, double) sem qualquer ambiguidade"]], "A regra do mais específico dita a resolução; na ausência de vencedor claro, a compilação falha.")
        ]
      },
      {
        id: "java-c05-u5-l4-sobrecarga-construtores-telescopicos",
        title: "Sobrecarga de construtores e o padrão this()",
        subtitle: "Sobrecarga · Encadeamento de construtores para evitar duplicação de inicializações",
        theory: "Classes Java frequentemente sobrecarregam construtores para fornecer diferentes combinações de valores iniciais. Para evitar duplicação de código, um construtor pode delegar a inicialização para outro construtor da mesma classe através da chamada this(...), que deve ser impreterivelmente a primeira instrução do corpo.",
        questions: [
          q("Qual instrução permite que um construtor chame outro construtor sobrecarregado da mesma classe?", "this(...) com os argumentos apropriados", ["self(...)","new this(...)","super.this(...)"], "this(...) invoca outro construtor da classe atual, reaproveitando a lógica de inicialização."),
          q("Qual é a regra mandatória de posicionamento para a chamada this(...) dentro de um construtor?", "Deve ser obrigatoriamente a primeira instrução executável dentro do construtor", ["Pode estar em qualquer linha antes do return","Deve ser sempre a última linha do bloco"], "O compilador exige que a delegação de construtor ocorra antes de qualquer outra instrução."),
          q("O que acontece se o construtor A chamar this() chamando o construtor B que por sua vez chama A?", "Erro de compilação por chamada recursiva de construtor (recursive constructor invocation)", ["Loop infinito em tempo de execução","A JVM ignora a segunda chamada"], "O compilador Java detecta ciclos de delegação entre construtores e bloqueia a compilação."),
          q("Qual é o benefício do padrão de construtores telescópicos encadeados via this(...)?", "Concentra a validação e atribuição dos campos em um único construtor canônico mestre", ["Dispensa o uso de atributos privados na classe","Melhora o tempo de carregamento no ClassLoader"], "Centralizar a inicialização no construtor mais completo reduz duplicação de regras de negócio."),
          t("Qual chamada delega a inicialização para outro construtor da própria classe?", ["this()","this"], "this(...) invoca outro construtor na primeira linha.", "public Conta(String titular) { ____(titular, 0.0); }"),
          g("Complete o construtor encadeando para o construtor principal com saldo zero por padrão.", ["this"], "this(...) delega a execução ao construtor com dois parâmetros.", "public Conta(int numero) { ____(numero, 0.0); }"),
          o("Ordene as instruções de um construtor sobrecarregado secundário.", ["Abertura do construtor secundário com menos parâmetros","Invocação obrigatória de this(...) na primeira linha com valores padrão","Execução de lógica específica complementar se necessário","Fechamento do bloco do construtor"], "A delegação via this(...) deve encabeçar o fluxo do construtor secundário."),
          p("Associe a modalidade de invocação de construtor à sua finalidade.", [["this(...)","Chama outro construtor sobrecarregado da mesma classe"],["super(...)","Chama o construtor da superclasse direta"],["new Classe(...)","Instancia um novo objeto a partir do chamador"],["Construtor padrão implícito","Criado pelo compilador quando nenhum construtor é declarado"]], "Encadear construtores com this(...) é a técnica primordial para evitar duplicação de boilerplate.")
        ]
      },
      {
        id: "java-c05-u5-l5-boas-praticas-design-sobrecarga",
        title: "Boas práticas e armadilhas no design de sobrecargas",
        subtitle: "Sobrecarga · Evitando métodos confusos, autoboxing inesperado e designs frágeis",
        theory: "Embora poderosa, a sobrecarga deve ser usada com critério. Métodos sobrecarregados devem realizar a mesma operação conceitual. Misturar sobrecargas com números idênticos de parâmetros que dependem de conversões sutis (como int vs Integer em List.remove) cria armadilhas clássicas que confundem o desenvolvedor.",
        questions: [
          q("Qual é o risco emblemático do método remove sobrecarregado na interface java.util.List?", "Confusão entre remove(int index) e remove(Object element)", ["Perda silenciosa de dados no garbage collector","Erro de compilação quando a lista armazena números"], "Em List<Integer>, chamar remove(2) remove o índice 2; para remover o número 2, exige-se remove(Integer.valueOf(2))."),
          q("Qual princípio de design deve guiar a criação de sobrecargas em uma API Java?", "Todas as variantes do método devem desempenhar a mesma semântica fundamental", ["Criar sobrecargas com comportamentos completamente diferentes para economizar nomes","Evitar tipos primitivos"], "Se dois métodos fazem coisas conceitualmente distintas, eles devem receber nomes diferentes."),
          q("Quando duas sobrecargas possuem o mesmo número de parâmetros, o que é altamente recomendado?", "Que ao menos um parâmetro em cada par correspondente seja radicalmente incompatível", ["Que ambos usem o tipo Object para aceitar qualquer valor","Que um método lance exceção e o outro não"], "Tipos radicalmente diferentes (ex: String e int) impedem conflitos de ambiguidade e dúvidas de leitura."),
          q("Se um método precisa de configurações muito variadas com múltiplos tipos opcionais, qual padrão supera a sobrecarga excessiva?", "O padrão de projeto Builder ou métodos estáticos de fábrica (Static Factory Methods)", ["Criar dezenas de sobrecargas com parâmetros nulos","Usar variáveis globais estáticas"], "Builders fornecem nomes expressivos para cada parâmetro, eliminando listas indecifráveis de sobrecarga."),
          t("Qual método da classe Integer converte primitivo em objeto para invocar remove(Object)?", ["valueOf","Integer.valueOf"], "valueOf cria o objeto Integer para selecionar a sobrecarga por elemento.", "lista.remove(Integer.____(valor));"),
          g("Complete o código forçando a remoção do objeto e não pelo índice posicional na lista.", ["Integer.valueOf"], "O encapsulamento explícito seleciona a sobrecarga correta em coleções.", "lista.remove(____(5));"),
          o("Ordene a análise recomendada antes de introduzir uma nova sobrecarga de método.", ["Verificar se a ação realizada é semanticamente idêntica à do método existente","Testar se os novos tipos de parâmetros evitam ambiguidades com as versões anteriores","Avaliar se um método com nome descritivo próprio não seria mais legível","Implementar a sobrecarga delegando para a versão mais genérica"], "Projetar APIs claras poupa horas de depuração e evita armadilhas para os consumidores do código."),
          p("Associe a armadilha de sobrecarga à sua solução técnica recomendada.", [["remove(int) vs remove(Object)","Usar Integer.valueOf(n) para remover por valor"],["Muitos parâmetros opcionais","Substituir por padrão Builder com nomes fluentes"],["Comportamentos conceituais distintos","Criar métodos com nomes diferentes e autoexplicativos"],["Ambiguidade com null","Passar variável tipada ou casting explícito"]], "APIs limpas e inequívocas são a marca registrada de projetos Java bem arquitetados.")
        ]
      }
    ],
    6: [
      {
        id: "java-c05-u6-l1-passagem-estrita-por-valor",
        title: "O modelo de passagem estritamente por valor em Java",
        subtitle: "Passagem por valor · A regra universal e imutável que rege todos os métodos da JVM",
        theory: "Em Java tudo é passado estritamente por valor (pass-by-value). Não existe passagem por referência real como em C++ (&). O que é copiado para o parâmetro é sempre o valor contido na variável: os bits literais para tipos primitivos, ou os bits do endereço para referências a objetos.",
        questions: [
          q("Qual é o modelo oficial e exclusivo de passagem de parâmetros adotado pela linguagem Java?", "Estritamente passagem por valor (pass-by-value) em todas as situações sem exceção", ["Passagem por referência para objetos e por valor para primitivos","Passagem por nome avaliada sob demanda"], "Java passa estritamente cópias de valores; em objetos, o valor copiado é o endereço da referência."),
          q("Existe na linguagem Java algum operador de parâmetro análogo ao \"&\" de C++ para criar referências a variáveis locais?", "Não, em Java é impossível criar apelidos (aliases) para variáveis locais do chamador", ["Sim, a palavra-chave ref cria ponteiros diretos","Sim, através do operador de ponteiro *"], "Java não permite manipular diretamente ponteiros de variáveis locais nem passá-las por referência real."),
          q("O que é copiado para o stack frame do método quando passamos uma variável de tipo objeto?", "Uma cópia da referência de memória (endereço que aponta para a instância no heap)", ["Uma cópia binária profunda de todos os dados do objeto","O nome da variável como texto"], "O parâmetro recebe uma nova referência que aponta para o mesmo objeto compartilhado no heap."),
          q("Se um método atribuir null ao seu parâmetro p (p = null;), o que ocorre com o objeto original no chamador?", "Absolutamente nada; apenas a variável local do método deixa de apontar para ele", ["O objeto no chamador também se torna null","O objeto é destruído imediatamente pelo GC"], "Como p é uma cópia da referência, anular p não afeta a variável de referência do chamador."),
          t("Qual é o termo técnico para a passagem de parâmetros onde sempre se copiam os bits do valor?", ["pass-by-value","por valor","passagem por valor"], "Java adota exclusivamente o modelo pass-by-value.", "Em Java, a avaliação de argumentos é estritamente ____."),
          g("Complete a afirmação: em Java, variáveis de objetos armazenam referências copiadas por ____.", ["valor"], "As referências são valores numéricos de endereçamento passados por valor.", "Referências a objetos são transmitidas por ____."),
          o("Ordene os passos da passagem de parâmetro de objeto em Java.", ["Variável original no chamador guarda a referência para o objeto no heap","Ao chamar o método, o valor da referência é copiado para o parâmetro","O parâmetro passa a apontar para o mesmo objeto que a variável do chamador","Operações no objeto via parâmetro alteram o estado compartilhado no heap"], "O compartilhamento de estado decorre de duas referências apontando para o mesmo objeto no heap."),
          p("Associe o tipo de dado ao valor exato transmitido na chamada.", [["int, double, boolean","Cópia dos bits literais do valor numérico primitivo"],["String, List, Objeto","Cópia dos bits da referência que aponta para o heap"],["Parâmetro reatribuído com novo objeto","Afeta apenas a variável local do método invocado"],["Mutação de campo via setter no parâmetro","Altera o estado do objeto compartilhado no heap"]], "Desmistificar a passagem por valor é fundamental para evitar bugs de mutação indesejada.")
        ]
      },
      {
        id: "java-c05-u6-l2-passagem-de-tipos-primitivos",
        title: "Isolamento total na passagem de tipos primitivos",
        subtitle: "Passagem por valor · Prova de que métodos não alteram variáveis primitivas externas",
        theory: "Quando variáveis primitivas (int, long, double) são passadas a um método, uma réplica exata de seus bits é gravada na pilha. Qualquer cálculo ou reatribuição executado sobre esse parâmetro afeta unicamente a cópia local, deixando a variável original do chamador totalmente intacta.",
        questions: [
          q("Se x = 10 e passamos x para um método que executa x = x + 5, qual será o valor de x após o retorno?", "x continuará valendo 10 no chamador", ["x passará a valer 15","x valerá 5","x será redefinido para zero"], "Como apenas a cópia local foi alterada, a variável primitiva original permanece imutável."),
          q("Por que é impossível implementar em Java um método clássico swap(int a, int b) que troque os valores originais?", "Porque a e b são cópias de valores primitivos e a troca afeta apenas as variáveis locais", ["Porque Java não possui variáveis temporárias","Porque números inteiros são imutáveis na JVM"], "Trocar os valores de dois parâmetros primitivos altera apenas o stack frame atual do método."),
          q("Onde residem os dados dos parâmetros primitivos durante a execução do método?", "No stack frame privativo da thread atual, isolados do restante do programa", ["No pool de constantes estáticas da classe","Em um bloco compartilhado do heap"], "A pilha de execução mantém as variáveis primitivas em áreas estritamente privativas."),
          q("Como um método pode entregar um novo valor calculado a partir de um primitivo recebido?", "Retornando o novo valor calculado através da instrução return", ["Usando ponteiros de memória em código nativo","Lançando o valor dentro de uma exceção"], "A forma canônica de atualizar dados a partir de primitivos é receber o retorno e atribuí-lo no chamador."),
          t("Qual instrução deve ser usada para repassar o valor alterado de volta à variável do chamador?", ["return"], "O return transporta o novo valor para a variável original.", "total = recalcular(total); // o método devolve via ____"),
          g("Complete o método para retornar o valor incrementado sem tentar mutar a variável externa.", ["return"], "Retornar a expressão calculada é a prática correta.", "public static int incrementar(int n) { ____ n + 1; }"),
          o("Ordene a execução de um método que recebe um primitivo e faz alterações.", ["Chamador armazena o valor 10 na variável a","Chamada copia o valor 10 para o parâmetro n do método","Método altera n para 99 no seu stack frame","Método encerra e seu stack frame é descartado","Variável a no chamador continua com o valor 10"], "O isolamento na pilha impede qualquer contaminação da variável do chamador."),
          p("Associe a ação à consequência na variável primitiva do chamador.", [["Incremento n++ dentro do método","Variável do chamador não sobre nenhuma alteração"],["Atribuição n = 0 dentro do método","Afeta estritamente o parâmetro local da função"],["Atribuição x = metodo(x) no chamador","Atualiza a variável do chamador com o retorno"],["Passagem de literal como metodo(50)","Aloca a cópia 50 diretamente no stack frame"]], "Primitivos desfrutam de segurança e independência garantidas pela arquitetura de memória.")
        ]
      },
      {
        id: "java-c05-u6-l3-passagem-de-referencias-objetos",
        title: "Compartilhamento de objetos via cópia de referências",
        subtitle: "Passagem por valor · Como métodos alteram o estado de instâncias no heap",
        theory: "Embora a referência em si seja passada por valor (copiada na pilha), o endereço de memória que ela contém aponta para o exato mesmo objeto no heap. Por conseguinte, quando o método executa uma operação de mutação (como obj.setNome() ou lista.add()), a alteração reflete imediatamente no objeto visto pelo chamador.",
        questions: [
          q("O que acontece se um método invocar um setter (ex: aluno.setNome(\"Ana\")) em um objeto recebido?", "O objeto compartilhado no heap é modificado e a alteração fica visível para o chamador", ["Apenas uma réplica do objeto é alterada","Ocorre erro de acesso por violação de thread"], "Como ambas as variáveis apontam para a mesma instância no heap, mutações nos campos são globais àquele objeto."),
          q("Por que passar uma lista mutável para um método desconhecido requer cautela?", "Porque o método pode inserir, remover ou limpar elementos da lista compartilhada", ["Porque a lista pode mudar de tipo estático","Porque a lista é convertida em array primitivo"], "Métodos que recebem coleções mutáveis podem introduzir efeitos colaterais silenciosos no chamador."),
          q("Se dois parâmetros apontam para o mesmo objeto no heap, qual termo descreve essa situação?", "Aliasing (referenciamento mútuo ao mesmo objeto)", ["Polimorfismo estrutural","Herança múltipla de tipos","Shadowing"], "Aliasing ocorre quando múltiplas variáveis ou referências compartilham o mesmo objeto na memória heap."),
          q("Objetos da classe String sofrem mutações internas quando passados como parâmetro?", "Não, pois instâncias de String são 100% imutáveis na linguagem Java", ["Sim, através de métodos como concat()","Apenas se forem menores que 10 caracteres"], "Qualquer método de String produz uma nova String, jamais alterando os caracteres do objeto original."),
          t("Em qual área de memória da JVM residem os objetos cujos estados são compartilhados?", ["heap","memoria heap"], "Objetos e seus estados internos são armazenados na memória heap.", "Instâncias mutáveis residem na memória ____."),
          g("Complete o código adicionando um elemento à lista compartilhada no heap.", ["add"], "O método add muta a coleção apontada pela referência.", "public void registrar(List<String> log) { log.____(\"OK\"); }"),
          o("Ordene a propagação de uma mutação em um objeto compartilhado.", ["Chamador instancia objeto no heap e guarda sua referência","Chamador passa a referência como argumento do método","Método invoca um método mutador sobre a referência recebida","O estado interno do objeto é alterado diretamente no heap","Chamador inspeciona o objeto e observa os novos valores"], "O objeto é único no heap; múltiplas referências na pilha observam a mesma alteração."),
          p("Associe a classe ao seu comportamento ao ser passada a um método.", [["ArrayList<T>","Mutável: o método pode adicionar ou remover elementos"],["String","Imutável: nenhum caractere original pode ser alterado"],["Integer (Wrapper)","Imutável: não permite alteração de seu valor encapsulado"],["Objeto de classe própria com setters","Mutável: campos podem ser reatribuídos via métodos"]], "Saber se a classe recebida é mutável ou imutável é a chave para evitar mutações acidentais.")
        ]
      },
      {
        id: "java-c05-u6-l4-reatribuicao-de-referencias",
        title: "Reatribuição de parâmetros vs mutação de objetos",
        subtitle: "Passagem por valor · Por que atribuir new ao parâmetro não afeta o chamador",
        theory: "Há uma distinção crucial entre modificar o estado de um objeto e reatribuir a variável de referência com new. Se executamos p = new Pessoa(), o parâmetro p passa a apontar para nova instância, mas a referência original do chamador continua apontando firmemente para o objeto anterior.",
        questions: [
          q("O que acontece no chamador se um método fizer lista = new ArrayList<>(); em seu parâmetro?", "Nada; a variável do chamador continua apontando para a lista antiga", ["A lista do chamador se torna uma lista vazia","A lista antiga é apagada do heap"], "Reatribuir a variável do parâmetro quebra a ligação local, sem alterar o ponteiro do chamador."),
          q("Por que a reatribuição de parâmetro não se propaga para fora do método?", "Porque o parâmetro é uma variável local independente na pilha que continha apenas uma cópia da referência", ["Porque o coletor de lixo impede novas alocações","Porque new cancela o método"], "Mudar o conteúdo da variável de pilha local afeta unicamente o stack frame corrente."),
          q("Qual é a diferença fundamental entre mutação de objeto e reatribuição de referência?", "Mutação altera o conteúdo no heap; reatribuição altera para qual endereço a variável local aponta", ["Mutação só funciona em primitivos","Reatribuição altera todos os objetos do projeto"], "Entender essa diferença elimina a maior fonte de confusão sobre passagem de parâmetros em Java."),
          q("Se quisermos que o chamador passe a utilizar a nova instância criada com new, o que devemos fazer?", "Retornar a nova instância através do return e atribuí-la explicitamente no chamador", ["Declarar o parâmetro como public","Invocar System.gc()"], "O retorno de método é o mecanismo projetado para transferir novas instâncias ao chamador."),
          t("Qual operador cria uma nova instância de objeto no heap, gerando um novo endereço?", ["new"], "new aloca memória no heap para uma nova instância.", "p = ____ Pessoa(\"Carlos\");"),
          g("Complete o retorno da nova instância criada para disponibilizá-la ao chamador.", ["return"], "Devolver o novo objeto via return atualiza o chamador.", "public List<String> resetar() { ____ new ArrayList<>(); }"),
          o("Ordene os acontecimentos quando um método reatribui um parâmetro de objeto.", ["Método recebe a cópia da referência original","Instrução param = new Objeto() aloca nova instância no heap","O parâmetro local passa a apontar para a nova instância","O método termina e o parâmetro local deixa de existir","A variável original do chamador continua intacta apontando para o objeto anterior"], "A reatribuição local é descartada com a destruição do stack frame do método."),
          p("Associe a linha de código ao seu efeito no chamador.", [["obj.setValor(50);","Efeito visível: o estado do objeto no heap foi alterado"],["obj = new Objeto(50);","Sem efeito externo: apenas a referência local foi apontada para outro local"],["obj = null;","Sem efeito externo: apenas o parâmetro local perdeu o apontamento"],["return new Objeto(50);","Transfere formalmente a nova instância criada para quem chamou"]], "Distinguir alteração de campo de reatribuição de referência previne defeitos lógicos sutis.")
        ]
      },
      {
        id: "java-c05-u6-l5-defesa-contra-efeitos-colaterais",
        title: "Estratégias defensivas contra efeitos colaterais",
        subtitle: "Passagem por valor · Coleções imutáveis e cópias defensivas em parâmetros",
        theory: "Para evitar que métodos chamados corrompam coleções e objetos passados como argumento, desenvolvedores aplicam duas estratégias fundamentais: criar cópias defensivas locais antes de operar sobre os dados, ou envolver coleções em invólucros imutáveis com List.copyOf() ou Collections.unmodifiableList().",
        questions: [
          q("Como proteger uma lista passada a um método contra inserções ou remoções indevidas?", "Envolvê-la com List.copyOf(lista) ou Collections.unmodifiableList(lista)", ["Marcar o método com final","Tornar a lista privada no chamador"], "Invólucros imutáveis lançam UnsupportedOperationException caso qualquer operação de escrita seja tentada."),
          q("O que acontece se um método tentar chamar .add() em uma coleção retornada por List.copyOf()?", "Lança UnsupportedOperationException em tempo de execução", ["O elemento é inserido normalmente","A coleção ignora a operação sem avisar"], "Coleções imutáveis do Java bloqueiam ativamente métodos mutadores com exceções explicativas."),
          q("O que caracteriza a prática de cópia defensiva ao receber um parâmetro mutável?", "Instanciar uma nova coleção interna para armazenar os itens antes de manipulá-los", ["Copiar o código-fonte da classe","Converter a coleção em JSON"], "A cópia defensiva garante que o método trabalhe em um espaço de dados isolado e seguro."),
          q("Por que tipos de dados imutáveis (como Records e Strings) são ideais para trânsito em métodos?", "Porque eliminam completamente o risco de efeitos colaterais acidentais entre chamador e chamado", ["Porque ocupam zero bytes de memória","Porque desativam o coletor de lixo"], "Objetos cujo estado nunca muda podem ser compartilhados livremente sem receio de corrupção."),
          t("Qual exceção é disparada ao tentar modificar uma lista criada por List.of() ou List.copyOf()?", ["UnsupportedOperationException"], "UnsupportedOperationException sinaliza que a mutação é proibida na coleção imutável.", "throw new ____(\"Modificacao nao permitida\");"),
          g("Complete o código gerando uma visualização imutável e segura da lista recebida.", ["List.copyOf"], "List.copyOf cria uma coleção 100% imutável a partir do Java 10.", "List<String> segura = ____(entrada);"),
          o("Ordene as medidas para blindar um método contra mutações indesejadas.", ["Receber o argumento de coleção potencialmente mutável","Gerar cópia defensiva ou contêiner imutável com List.copyOf","Executar operações de leitura e ordenação na cópia isolada","Devolver o resultado final sem contaminar o chamador"], "Programar com imunidade a efeitos colaterais eleva a robustez de sistemas concorrentes."),
          p("Associe a técnica de defesa ao benefício arquitetural.", [["List.copyOf(colecao)","Garante que a coleção não seja alterada por ninguém"],["new ArrayList<>(colecao)","Cria cópia independente que pode ser mutada sem afetar a original"],["final List<T> lista","Impede reatribuir a variável lista, mas permite adicionar itens"],["Objetos Record / String","Imutabilidade intrínseca: seguros por projeto"]], "Eliminar efeitos colaterais imprevistos é a pedra angular da programação defensiva e funcional em Java.")
        ]
      }
    ],
    7: [
      {
        id: "java-c05-u7-l1-papel-vital-caso-base",
        title: "O papel fundamental do caso-base na recursão",
        subtitle: "Caso-base · A condição de parada que impede recursões infinitas",
        theory: "O caso-base é a condição em uma função recursiva que é resolvida diretamente, sem realizar novas chamadas a si mesma. Ele atua como o ponto de ancoragem de todo o algoritmo recursivo: sem um caso-base bem formulado, a função chama a si mesma eternamente até estourar a pilha da JVM com StackOverflowError.",
        questions: [
          q("Qual é a função primordial do caso-base em um método recursivo?", "Interromper o encadeamento de chamadas recursivas e fornecer uma resposta direta", ["Acelerar a alocação de memória no heap","Compilar a classe em bytecode especial"], "O caso-base é a condição de término essencial que impede a recursão de continuar indefinidamente."),
          q("O que acontece se um método recursivo for executado sem definir um caso-base?", "A pilha de chamadas se esgota rapidamente, lançando java.lang.StackOverflowError", ["O laço retorna zero automaticamente","A JVM detecta em tempo de compilação e avisa"], "Sem parada, frames são empilhados continuamente até estourar a cota de memória de pilha da thread."),
          q("Onde deve ser posicionado o teste do caso-base dentro do método recursivo?", "Logo nas primeiras linhas de execução do método, antes de qualquer passo recursivo", ["No final do método, após a chamada recursiva","Em uma subclasse separada"], "Testar o caso-base logo no início garante que o algoritmo avalie se o trabalho já está concluído antes de dividir."),
          q("No cálculo do fatorial de n (n!), qual é o caso-base padrão?", "Quando n <= 1, cujo resultado direto e imediato é 1", ["Quando n == 100","Quando n é um número par"], "Por definição matemática, 0! = 1 e 1! = 1, constituindo a condição elementar de parada do fatorial."),
          t("Qual condição condicional no topo do método recursivo encerra o encadeamento?", ["caso-base","caso base"], "O caso-base encerra o ciclo de auto-invocações.", "if (n <= 1) return 1; // identificamos aqui o ____"),
          g("Complete o caso-base do fatorial para retornar 1 quando n for menor ou igual a 1.", ["return 1"], "O caso-base devolve a resposta imediata.", "if (n <= 1) { ____; }"),
          o("Ordene o fluxo de execução de um método recursivo ao atingir o caso-base.", ["Método recebe o argumento que satisfaz a condição de parada","Condicional do caso-base é avaliada como verdadeira","Resultado terminal é devolvido imediatamente sem nova invocação","Stack frame do caso-base é desempilhado entregando a resposta ao chamador"], "Ao encontrar o caso-base, a pilha para de crescer e inicia a fase de retorno."),
          p("Associe o algoritmo recursivo ao seu respectivo caso-base canônico.", [["Fatorial de n","n <= 1 devolve 1"],["Contagem regressiva até zero","n == 0 emite término e retorna"],["Busca binária em array","inicio > fim indica elemento inexistente"],["Tamanho de lista encadeada","no == null devolve 0"]], "Identificar a resposta elementar imediata é o primeiro passo de qualquer projeto recursivo.")
        ]
      },
      {
        id: "java-c05-u7-l2-identificando-paradas-triviais",
        title: "Identificando e formulando soluções triviais",
        subtitle: "Caso-base · Reduzindo problemas complexos à sua versão mais simples e óbvia",
        theory: "Projetar um caso-base exige identificar a menor entrada concebível para o problema, cuja solução seja conhecida de antemão sem exigir nenhum cálculo. Em estruturas lineares, essa condição trivial costuma ser a lista vazia (tamanho zero) ou uma coleção contendo um único elemento já ordenado por definição.",
        questions: [
          q("Qual é a condição trivial imediata para verificar se uma palavra é um palíndromo recursivamente?", "Se a string tiver 0 ou 1 caractere, ela é palíndromo por definição", ["Se a string tiver mais de 10 caracteres","Se todos os caracteres forem maiúsculos"], "Palavras com comprimento menor ou igual a 1 são espelhadas por definição trivial."),
          q("Qual é a resposta trivial para a soma de elementos de um array vazio?", "0 (zero)", ["null","1","-1"], "Um conjunto vazio de números possui soma acumulada igual a zero por axioma matemático elementar."),
          q("Ao somar recursivamente os dígitos de um número inteiro positivo, quando a resposta é trivial?", "Quando o número é menor que 10, pois ele já é um único dígito", ["Quando o número é múltiplo de 2","Quando o número possui 3 dígitos"], "Números de 0 a 9 dispensam qualquer decomposição adicional."),
          q("Qual é o risco de escolher uma condição de parada que não seja a menor possível?", "O algoritmo pode falhar para entradas mínimas legítimas, como listas vazias ou zeros", ["O compilador recusa a compilação","O código consome mais memória heap"], "Cobrir o zero e o caso vazio garante que o algoritmo trate todas as entradas válidas de borda."),
          t("Quantos caracteres restam em uma string quando ela atinge a condição trivial de palíndromo?", ["0 ou 1","1","0"], "Strings de tamanho 0 ou 1 são palíndromos automáticos.", "if (str.length() <= 1) return true; // condicao trivial com ____ char"),
          g("Complete o teste para o caso trivial da soma recursiva de dígitos.", ["< 10"], "Números menores que 10 já representam sua própria soma.", "if (n ____) return n;"),
          o("Ordene os passos mentais para isolar a solução trivial de um problema recursivo.", ["Analisar a menor entrada concebível (vazia, nula, zero ou unitária)","Determinar a resposta imediata e irrefutável para essa entrada","Escrever a condicional de parada no topo do método","Testar a função com essa entrada de borda antes de prosseguir"], "Projetar a base antes do passo indutivo é a regra de ouro do pensamento recursivo."),
          p("Associe a estrutura ao seu caso trivial mais comum.", [["Lista encadeada","Nó atual ser null"],["Cadeia de texto (String)","String vazia com length() == 0"],["Número natural n","n == 0 ou n == 1"],["Intervalo de busca [inicio, fim]","inicio > fim"]], "Condições triviais sólidas evitam indexação incorreta e exceções de ponteiro nulo.")
        ]
      },
      {
        id: "java-c05-u7-l3-multiplos-casos-base",
        title: "Algoritmos com múltiplos casos-base",
        subtitle: "Caso-base · Bifurcações de término em sequências e árvores de decisão",
        theory: "Muitos problemas recursivos não possuem apenas um, mas múltiplos pontos de terminação. Um exemplo clássico é a sequência de Fibonacci, que possui dois casos-base distintos: F(0) = 0 e F(1) = 1. Em buscas e navegação em árvores, há tipicamente um caso-base para sucesso (encontrado) e outro para fracasso (inexistente).",
        questions: [
          q("Por que a definição clássica de Fibonacci recursivo exige dois casos-base distintos?", "Porque cada termo depende da soma dos dois anteriores, exigindo âncoras para 0 e 1", ["Porque Fibonacci opera com números pares e ímpares","Para acelerar a JVM"], "F(n) = F(n-1) + F(n-2) exige duas sementes iniciais conhecidas: F(0) = 0 e F(1) = 1."),
          q("Em uma busca recursiva, quais costumam ser os dois casos-base fundamentais?", "Um caso de sucesso (elemento encontrado) e um de fracasso (fim da estrutura sem sucesso)", ["Dois casos de sucesso simultâneos","Um caso para inteiros e outro para decimais"], "O algoritmo deve saber quando celebrar o encontro e quando admitir que a busca terminou sem sucesso."),
          q("O que acontece se omitirmos o caso-base de fracasso em uma busca binária recursiva?", "O método tentará acessar índices inválidos ou entrará em recursão infinita se o item não existir", ["O elemento será encontrado na posição zero","O compilador rejeita o método"], "Sem detectar inicio > fim, o método continuará dividindo intervalos inexistentes."),
          q("Como organizar múltiplos casos-base no código de forma limpa?", "Usando cláusulas de guarda sequenciais no topo do método com retornos diretos", ["Aninhando múltiplos blocos switch dentro de laços while","Em variáveis globais"], "Guardas simples e lineares no início do método comunicam todos os pontos de saída com elegância."),
          t("Quantos casos-base são estritamente necessários para ancorar a recursão de Fibonacci?", ["2","dois"], "Fibonacci necessita de exatamente dois casos-base: 0 e 1.", "A série de Fibonacci possui ____ casos-base essenciais."),
          g("Complete o segundo caso-base de Fibonacci para a entrada n igual a 1.", ["1"], "F(1) retorna 1.", "if (n == 0) return 0;\nif (n == 1) return ____;"),
          o("Ordene a avaliação de múltiplos casos-base em uma busca em árvore.", ["Verifica se o nó atual é nulo (caso de fracasso)","Verifica se o valor do nó é o procurado (caso de sucesso)","Nenhum caso-base atendido: decide se busca no ramo esquerdo ou direito","Dispara a chamada recursiva no ramo escolhido"], "A ordenação das guardas protege contra NullPointerException e atalha o sucesso."),
          p("Associe o algoritmo aos seus múltiplos casos de término.", [["Fibonacci(n)","n == 0 devolve 0; n == 1 devolve 1"],["Busca Binária","inicio > fim (não achou); arr[meio] == alvo (achou)"],["Palíndromo","tamanho <= 1 (verdadeiro); pontas diferentes (falso)"],["Navegação em Labirinto","atingiu saída (sucesso); bateu em parede (recuo)"]], "Cobrir com precisão todos os ramos de terminação garante a exatidão lógica do algoritmo.")
        ]
      },
      {
        id: "java-c05-u7-l4-validacao-defensiva-contra-saltos",
        title: "Prevenindo saltos acidentais sobre o caso-base",
        subtitle: "Caso-base · Usando operadores de desigualdade para blindar condições de parada",
        theory: "Um erro sutil ocorre quando o caso-base usa igualdade estrita (if (n == 0)) e o passo recursivo decrementa n em passos de 2. Se a entrada for ímpar, n salta para -1, ultrapassando o caso-base e causando recursão infinita. Usar desigualdades amplas (n <= 0) blinda o código contra saltos.",
        questions: [
          q("Por que é mais seguro escrever if (n <= 0) em vez de if (n == 0) como caso-base?", "Porque previne recursão infinita caso n receba negativos ou decresça em saltos maiores que 1", ["Porque <= compila mais rápido na JVM","Porque == é proibido em inteiros"], "Desigualdades funcionam como redes de segurança que capturam valores que possam ter saltado o zero."),
          q("O que acontece ao chamar uma função com if (n == 0) se passarmos o argumento inicial -5?", "O método decrementar para -6, -7... e continuará eternamente até StackOverflowError", ["O compilador converte -5 para positivo","A função retorna zero imediatamente"], "Como -5 nunca será igual a 0 ao ser decrementado, a condição de parada jamais será atingida."),
          q("Qual é a boa prática recomendada para validar entradas negativas antes de iniciar a recursão?", "Validar na entrada pública com IllegalArgumentException ou absorver no caso-base com <= 0", ["Ignorar e permitir o estouro da pilha","Substituir a recursão por um print"], "Validação defensiva impede que dados absurdos corrompam a integridade da pilha."),
          q("Se uma recursão divide um número por 2 (n / 2), qual é o caso-base seguro?", "n <= 1", ["n == 0","n == 2","n % 2 == 0"], "Divisões sucessivas de inteiros chegam a 1 e depois a 0; n <= 1 captura com precisão o término."),
          t("Qual operador relacional de duas letras impede que números negativos ultrapassem o zero?", ["<="], "<= captura zero e qualquer valor abaixo dele.", "if (n ____ 0) return 0; // protecao ampla"),
          g("Complete o teste de guarda para capturar qualquer valor menor ou igual a zero com segurança.", ["<="], "<= previne saltos sobre o valor zero.", "if (n ____ 0) return resultado;"),
          o("Ordene os cuidados para blindar um caso-base contra saltos indesejados.", ["Analisar o tamanho e direção do passo de decréscimo ou divisão","Verificar se entradas ímpares ou pares podem saltar o ponto de parada","Substituir comparações estritas (==) por desigualdades amplas (<= ou >=)","Adicionar validação antecipada contra argumentos iniciais fora do domínio"], "Blindagem defensiva é a assinatura de código robusto para ambientes de produção."),
          p("Associe a condição de caso-base à sua vulnerabilidade.", [["if (n == 0) com passo n -= 2","Frágil: entradas ímpares saltam para -1 e causam estouro de pilha"],["if (n <= 0) com passo n -= 2","Robusto: captura o zero e quaisquer valores que o ultrapassarem"],["if (n == 1) com passo n / 2","Frágil se n iniciar em 0, pois 0 / 2 permanece 0 em loop"],["if (n <= 1) com passo n / 2","Robusto: encerra tanto para 1 quanto para 0"]], "Condições defensivas eliminam armadilhas ocultas em casos de borda.")
        ]
      },
      {
        id: "java-c05-u7-l5-testando-casos-base-isoladamente",
        title: "Testes unitários isolados para condições de base",
        subtitle: "Caso-base · Validando a correção matemática das âncoras antes do passo indutivo",
        theory: "Na metodologia de testes orientada a recursão, os casos-base devem ser testados antes de qualquer cenário de múltiplos passos. Validar entradas unitárias, listas vazias, nulos e limites numéricos assegura que a fundação do algoritmo esteja matematicamente correta, permitindo isolar bugs recursivos com clareza.",
        questions: [
          q("Qual é o primeiro conjunto de casos de teste a ser escrito para uma função recursiva?", "Entradas triviais que acionam imediatamente os casos-base (ex: 0, 1, lista vazia)", ["Casos que geram mais de 10.000 chamadas na pilha","Testes de estresse com multithreading"], "Se os casos-base falharem, qualquer passo indutivo construído sobre eles estará automaticamente incorreto."),
          q("Por que testar a entrada zero ou vazia em métodos recursivos revela a maioria dos bugs?", "Porque muitas implementações assumem implicitamente que a entrada sempre terá dados", ["Porque o compilador desativa testes em valores zero","Porque listas vazias causam travamento do JUnit"], "Assumir que entradas nunca são vazias é a causa raiz da vasta maioria das exceções em produção."),
          q("Se um teste unitário de recursão demora minutos e termina com StackOverflowError, o que falhou?", "A execução não encontrou o caso-base e empilhou chamadas indefinidamente", ["O framework JUnit foi configurado incorretamente","A memória heap da máquina acabou"], "StackOverflowError em testes unitários é o sintoma clássico de caso-base ausente ou inatingível."),
          q("O que assertEqual(1, Fatorial.calcular(0)) valida em uma suíte de testes?", "Que a convenção matemática de 0! = 1 está corretamente ancorada no caso-base", ["Que o método sabe lidar com números primos","Que a função rejeita números pares"], "Confirma que a âncora inicial do domínio fatorial responde conforme a especificação matemática."),
          t("Qual anotação do JUnit 5 identifica formalmente um método de teste de unidade?", ["@Test"], "@Test assinala rotinas de verificação automatizada.", "____ void deveRetornarUmParaZeroFatorial() { }"),
          g("Complete o teste validando que uma string vazia é reconhecida como palíndromo.", ["assertTrue"], "assertTrue valida que o predicado retornou true para o caso trivial.", "____(Palindromo.verificar(\"\"));"),
          o("Ordene a pirâmide de testes para uma rotina recursiva recém-criada.", ["Testar entradas de borda direta (caso-base trivial)","Testar entrada mínima que executa exatamente um passo recursivo","Testar cenários típicos com múltiplos desdobramentos de pilha","Testar entradas inválidas e verificar o lançamento das exceções esperadas"], "A progressão dos testes da base para o topo simplifica o isolamento de defeitos."),
          p("Associe a entrada de teste à finalidade da verificação.", [["Entrada 0 em Fatorial","Verifica ancoragem matemática do caso-base"],["Entrada vazia \"\" em Inversor","Verifica comportamento para coleção de tamanho zero"],["Entrada negativa -1","Verifica se rejeita argumento inválido com exceção"],["Entrada normal 5","Verifica se a recursão encadeia e desempilha com precisão"]], "Uma suíte de testes que cobre a base garante tranquilidade para refatorações futuras.")
        ]
      }
    ],
    8: [
      {
        id: "java-c05-u8-l1-anatomia-chamada-recursiva",
        title: "Anatomia da chamada recursiva e aproximação",
        subtitle: "Recursão · O passo indutivo que reduz o problema rumo ao caso-base",
        theory: "A anatomia de todo método recursivo divide-se em duas partes complementares: o caso-base que interrompe a auto-invocação, e o passo indutivo recursivo. No passo indutivo, a função divide o problema original em uma versão estritamente menor de si mesma, garantindo que cada chamada se aproxime do caso-base.",
        questions: [
          q("Quais são as duas partes estruturais mandatórias em todo método recursivo correto?", "O caso-base de ancoragem e a chamada recursiva de passo indutivo", ["O bloco try-catch e o bloco finally","A declaração de variáveis estáticas e o laço for"], "A união harmoniosa entre âncora de parada e passo de redução constitui a essência da recursão."),
          q("Qual é a regra mandatória aplicada aos argumentos na chamada recursiva?", "Devem ser estritamente mais próximos do caso-base do que a entrada recebida", ["Devem ser maiores do que o argumento original","Devem ser convertidos em texto"], "Se o argumento não convergir rumo à condição de parada, o algoritmo entrará em ciclo infinito."),
          q("No cálculo recursivo de soma(n), qual é a redução típica do passo indutivo?", "return n + soma(n - 1);", ["return n + soma(n);","return n + soma(n + 1);","return soma(n * 2);"], "Passar n - 1 reduz o valor sucessivamente até que ele atinja o caso-base n <= 1."),
          q("O que caracteriza o princípio da indução matemática aplicado à computação recursiva?", "Se a base é verdadeira e o passo n garante a verdade para n-1, todo o domínio está correto", ["Todo cálculo deve usar números primos","Toda função deve ter retorno booleano"], "A indução matemática é o fundamento teórico que valida a correção de algoritmos recursivos."),
          t("Como se chama a fase do método recursivo onde ele invoca a si mesmo com entrada reduzida?", ["passo indutivo","passo recursivo"], "O passo indutivo aproxima o cálculo da solução elementar.", "return n * fatorial(n - 1); // ____ indutivo"),
          g("Complete a chamada recursiva que aproxima a contagem decrescente do zero.", ["n - 1"], "Subtrair 1 garante a convergência rumo ao caso-base zero.", "contarRegressivo(____);"),
          o("Ordene a execução do método recursivo no primeiro passo de redução.", ["Método recebe entrada n maior que o caso-base","Condicional de caso-base avalia como falso","Método calcula n - 1 reduzindo o escopo do problema","Invoca a si mesmo passando a versão simplificada do problema"], "A redução sistemática conduz inevitavelmente o algoritmo à terminação graciosa."),
          p("Associe a operação recursiva ao seu sentido de convergência.", [["subtrair 1 (n - 1)","Aproxima contagens de números naturais rumo a zero"],["dividir por 2 (n / 2)","Aproxima intervalos binários logarítmicos rumo a 1"],["pegar cauda (subList(1, size))","Aproxima coleções lineares da lista vazia"],["navegar para no.proximo","Aproxima percursos encadeados do ponteiro null"]], "A convergência estrita é a garantia absoluta contra estouros de memória.")
        ]
      },
      {
        id: "java-c05-u8-l2-pilha-winding-unwinding",
        title: "Desdobramento da pilha: empilhamento e desempilhamento",
        subtitle: "Recursão · Visualizando as fases de descida (winding) e subida (unwinding)",
        theory: "A execução recursiva opera em duas fases temporais distintas: na fase de descida (winding), novos stack frames são empilhados na call stack até alcançar o caso-base. Em seguida, na fase de retorno (unwinding), a pilha é sucessivamente desempilhada, combinando os resultados parciais até entregar a resposta final.",
        questions: [
          q("Como se chama a fase em que a recursão acumula frames sucessivos na pilha?", "Winding (fase de empilhamento ou expansão da recursão)", ["Unwinding","Coleta de lixo","Compilação JIT"], "Winding é a jornada de ida, onde chamadas aninhadas empilham frames aguardando resolução."),
          q("O que acontece durante a fase de retorno (unwinding) de um algoritmo recursivo?", "Os métodos desempilham seus frames e retornam valores parciais aos chamadores anteriores", ["A JVM aloca mais memória de heap","Todos os métodos são executados novamente"], "Unwinding é a jornada de volta, onde cada método recolhe a resposta do próximo e conclui sua conta."),
          q("Se chamarmos fatorial(4), quantos frames existirão na pilha no momento em que o caso-base for atingido?", "Cinco frames (main, fatorial(4), fatorial(3), fatorial(2), fatorial(1))", ["Apenas um frame compartilhado","Dezesseis frames"], "Cada invocação retém seu frame intacto na pilha até que o método chamado por ele finalize e retorne."),
          q("Em que ponto do algoritmo o primeiro cálculo de multiplicação de fatorial(4) é de fato executado?", "Na fase de desempilhamento (unwinding), após o retorno do caso-base", ["Antes de empilhar o primeiro frame","Enquanto o método main é compilado"], "O cálculo depende do resultado da chamada filha; portanto, opera durante a fase de retorno."),
          t("Qual termo em inglês designa a fase de retorno e destruição dos frames da pilha recursiva?", ["unwinding"], "Unwinding é a resolução retroativa da pilha de execução.", "A fase de retorno dos métodos chama-se ____."),
          g("Complete o conceito: a fase de descida recursiva é chamada de ____.", ["winding"], "Winding é o empilhamento das invocações até a âncora.", "A fase de acúmulo de frames na pilha chama-se ____."),
          o("Ordene a linha do tempo completa de uma chamada fatorial(3).", ["Chamada fatorial(3) empilha seu frame","fatorial(3) chama fatorial(2) empilhando segundo frame","fatorial(2) chama fatorial(1) atingindo o caso-base","fatorial(1) retorna 1 iniciando o desempilhamento (unwinding)","fatorial(2) calcula 2 * 1 = 2 e desempilha","fatorial(3) calcula 3 * 2 = 6 e encerra entregando o resultado final"], "Visualizar ida e volta elimina qualquer mistério sobre como a recursão sintetiza resultados."),
          p("Associe a fase recursiva ao seu comportamento em relação à pilha.", [["Winding (empilhamento)","Pilha cresce em profundidade rumo ao caso-base"],["Atingimento do caso-base","Ponto de profundidade máxima da pilha de chamadas"],["Unwinding (desempilhamento)","Pilha encolhe conforme as multiplicações são concluídas"],["Retorno ao chamador original","Pilha volta ao seu estado de repouso inicial"]], "Compreender o vaivém da pilha é fundamental para estimar a pegada de memória do software.")
        ]
      },
      {
        id: "java-c05-u8-l3-recursao-direta-vs-indireta",
        title: "Recursão direta vs recursão indireta (mútua)",
        subtitle: "Recursão · Quando métodos colaboram chamando-se reciprocamente em ciclo",
        theory: "A recursão é dita direta quando um método contém uma chamada explícita a si mesmo em seu próprio corpo. Já a recursão indireta (ou mútua) ocorre quando o método A invoca o método B, e o método B, por sua vez, invoca o método A (ou através de uma cadeia mais longa), estabelecendo um ciclo recursivo compartilhado.",
        questions: [
          q("O que define uma recursão indireta ou mútua entre rotinas?", "Um método A invoca um método B que subsequentemente chama o método A de volta", ["Um método que se chama duas vezes na mesma linha","Uma rotina que só executa em threads separadas"], "A recursão mútua distribui a lógica do ciclo por duas ou mais funções colaborativas."),
          q("Qual é o clássico exemplo didático de recursão mútua?", "Determinar se um número natural é par ou ímpar delegando alternadamente entre ehPar e ehImpar", ["Calcular raiz quadrada com método de Newton","Inverter uma string em memória"], "ehPar(n) retorna ehImpar(n-1), e ehImpar(n) retorna ehPar(n-1), com bases em 0."),
          q("Recursões indiretas estão sujeitas ao erro StackOverflowError?", "Sim, exatamente da mesma forma que recursões diretas, caso faltem casos-base válidos", ["Não, pois a alternância de métodos limpa a pilha","Apenas em sistemas operacionais legados"], "Não importa a rota das chamadas: acumular frames na pilha sem retorno esgota a memória igualmente."),
          q("Onde a recursão mútua é amplamente empregada na indústria de software?", "Em analisadores sintáticos descendentes recursivos (recursive descent parsers) para compiladores", ["Em drivers de impressoras matriciais","Em bancos de dados relacionais para salvar logs"], "Gramáticas livres de contexto com regras entrelaçadas são modeladas naturalmente por métodos mútuos."),
          t("Qual adjetivo classifica a recursão onde um método chama a si mesmo diretamente?", ["direta","recursao direta"], "Recursão direta invoca o próprio identificador.", "f() { f(); } é um exemplo de recursão ____."),
          g("Complete o método mutuamente recursivo para delegar a verificação da paridade.", ["ehImpar"], "ehPar delega para ehImpar reduzindo a magnitude.", "public static boolean ehPar(int n) {\n  if (n == 0) return true;\n  return ____(n - 1);\n}"),
          o("Ordene o fluxo de execução de um ciclo de recursão mútua com n = 2.", ["ehPar(2) é invocado e avalia que 2 != 0","ehPar(2) invoca ehImpar(1)","ehImpar(1) é invocado e avalia que 1 != 0","ehImpar(1) invoca ehPar(0)","ehPar(0) atinge o caso-base e retorna true","A cadeia de retornos entrega true de volta à origem"], "A alternância entre as funções compõe um grafo recursivo elegante."),
          p("Associe a modalidade de recursão à sua topologia.", [["Recursão direta","Grafo com auto-laço simples (A -> A)"],["Recursão mútua binária","Ciclo alternado entre dois nós (A -> B -> A)"],["Recursão mútua em anel","Cadeia fechada circular (A -> B -> C -> A)"],["Parser de expressões","Métodos de regras gramaticais chamando-se recursivamente"]], "Reconhecer ciclos indiretos é vital para depurar problemas de fluxo em sistemas complexos.")
        ]
      },
      {
        id: "java-c05-u8-l4-recursao-de-cauda-e-jvm",
        title: "Recursão de cauda e as particularidades da JVM",
        subtitle: "Recursão · Tail call optimization e o status da HotSpot Virtual Machine",
        theory: "Uma função possui recursão de cauda (tail recursion) quando a auto-chamada é a última operação realizada, dispensando cálculos pendentes após o retorno. Em linguagens funcionais, compiladores aplicam TCO para reutilizar o frame de pilha; contudo, a JVM HotSpot padrão não realiza TCO.",
        questions: [
          q("O que caracteriza formalmente uma chamada recursiva de cauda (tail call)?", "A auto-chamada é a última ação executada, sem exigir cálculos adicionais com o retorno", ["A chamada fica no início do arquivo","A chamada ocorre dentro de um bloco catch"], "Em tail recursion, o chamador simplesmente repassa o resultado do filho sem nenhuma operação residual."),
          q("Por que a expressão return n * fatorial(n - 1); NÃO é recursão de cauda?", "Porque após o retorno da chamada recursiva ainda resta a multiplicação por n a executar", ["Porque n é um tipo primitivo","Porque multiplicação não é permitida em retornos"], "O método não pode encerrar seu frame porque precisa esperar o retorno para efetuar a multiplicação."),
          q("A JVM HotSpot padrão implementa Tail Call Optimization (TCO) automaticamente?", "Não, a JVM padrão mantém todos os stack frames para preservar a fidelidade de stack traces", ["Sim, Java sempre otimiza recursão de cauda desde a versão 1.0","Apenas quando compilado com a flag -O3"], "Por questões de segurança e integridade de rastreamento de pilha (stack trace), a JVM não descarta frames em chamadas de cauda."),
          q("Como se reescreve uma função recursiva em formato de cauda?", "Introduzindo um parâmetro acumulador que carrega o resultado parcial adiante", ["Transformando todas as variáveis em static","Usando streams paralelos"], "Acumuladores transferem o estado para a próxima chamada, livrando o frame atual de pendências de cálculo."),
          t("Qual sigla em inglês designa a otimização que reaproveita stack frames em chamadas finais?", ["TCO","Tail Call Optimization"], "Tail Call Optimization (TCO) previne o crescimento da pilha.", "Mecanismo conhecido pela sigla ____."),
          g("Complete o formato de cauda passando o resultado acumulado para a próxima etapa.", ["n * acumulador"], "O acumulador recebe o cálculo antes da invocação recursiva.", "return fatorialCauda(n - 1, ____);"),
          o("Ordene a evolução do cálculo com acumulador em recursão de cauda.", ["Chamada inicial passa n e acumulador com valor semente 1","Caso-base verifica se n <= 1 e retorna o acumulador diretamente","Se n > 1, multiplica o acumulador atual por n","Invoca recursivamente passando n - 1 e o novo acumulador calculado"], "O acumulador carrega o produto pronto, dispensando qualquer operação no desempilhamento."),
          p("Associe a forma de cálculo à sua classificação estrutural.", [["return n * f(n - 1);","Recursão comum: multiplicação pendente impede cauda"],["return fCauda(n - 1, n * acc);","Recursão de cauda: resultado da chamada é o próprio retorno"],["JVM HotSpot","Não realiza eliminação automática de frames de cauda"],["Compiladores de Scala / Kotlin","Podem converter tailrec em laços de repetição planos"]], "Entender as limitações de TCO na JVM evita suposições errôneas sobre segurança de pilha.")
        ]
      },
      {
        id: "java-c05-u8-l5-recursao-vs-iteracao-custos",
        title: "Recursão vs iteração: trade-offs de desempenho e memória",
        subtitle: "Recursão · Quando adotar loops imperativos ou elegância recursiva",
        theory: "Qualquer algoritmo recursivo pode ser transformado em laço iterativo usando pilha explícita. Na JVM, loops imperativos (for/while) oferecem consumo de memória constante O(1), enquanto a recursão brilha na clareza expressiva ao manipular estruturas ramificadas como árvores e grafos.",
        questions: [
          q("Qual é a grande vantagem computacional de laços iterativos em relação à recursão em Java?", "Consumo constante de memória na pilha O(1) e ausência de risco de StackOverflowError", ["Capacidade de manipular grafos sem código auxiliar","Legibilidade sempre superior em árvores"], "Loops reaproveitam as mesmas variáveis locais sem sobrecarregar a call stack da thread."),
          q("Qual estrutura de dados pode ser usada explicitamente para converter qualquer recursão em iteração?", "Uma pilha (Stack ou Deque) alocada na memória heap", ["Uma fila circular FIFO","Uma tabela hash de strings"], "Simular manualmente a pilha de execução com um Deque no heap contorna as limitações de tamanho da call stack."),
          q("Em quais cenários a abordagem recursiva é amplamente preferida na engenharia de software?", "Ao navegar e transformar estruturas naturalmente recursivas, como árvores e documentos JSON/XML", ["Em cálculos matemáticos em loops de alta frequência","Em leitura contínua de buffers de rede"], "Estruturas ramificadas possuem definição recursiva natural, resultando em código limpo e intuitivo."),
          q("Qual é o custo de overhead associado a cada chamada recursiva na JVM?", "Alocação de um novo stack frame e salvamento de contexto de registradores na thread", ["Compilação de uma nova classe pelo ClassLoader","Gravação de arquivo de log em disco"], "Criar frames tem custo em nanossegundos e consome kilobytes preciosos da pilha da thread."),
          t("Qual estrutura de dados Java do pacote java.util simula a call stack na versão iterativa?", ["Deque","ArrayDeque","Stack"], "ArrayDeque é a classe moderna recomendada para implementar pilhas no heap.", "____<No> pilha = new ArrayDeque<>();"),
          g("Complete o laço iterativo que processa elementos enquanto a pilha não estiver vazia.", ["!pilha.isEmpty()"], "Processar enquanto houver itens empilhados substitui a chamada recursiva.", "while (____) { No atual = pilha.pop(); }"),
          o("Ordene os critérios para decidir entre implementar via recursão ou iteração.", ["Avaliar a natureza dos dados (árvores e grafos favorecem recursão)","Estimar a profundidade máxima esperada da recursão","Se a profundidade puder exceder milhares de níveis, converter para iteração","Se a profundidade for pequena e a legibilidade for prioritária, manter recursão"], "A escolha deve equilibrar elegância de design e segurança operacional sob carga extrema."),
          p("Associe o paradigma ao seu perfil operacional em Java.", [["Iteração com while/for","Memória O(1), desempenho máximo, zero risco de estouro de pilha"],["Recursão em árvores binárias","Código limpo, elegante e intuitivo para profundidades logarítmicas"],["Recursão linear profunda","Arriscada na JVM devido à ausência de TCO nativo"],["Pilha explícita no heap","Escalabilidade para milhões de nós sem limitações da call stack"]], "Dominar os compromissos entre legibilidade e escalabilidade define a maturidade da engenharia de software.")
        ]
      }
    ]
  });
})();
