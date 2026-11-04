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

  const lang = "csharp";
  const chId = "csharp-c05";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "csharp-c05-u1-l3-modificadores-acesso-csharp",
        title: "Modificadores de acesso em métodos C#",
        subtitle: "Contratos de métodos · public, private, protected, internal e combinações",
        theory: "No ecossistema .NET, a visibilidade de métodos em C# é governada por modificadores explícitos: public (acesso irrestrito), private (apenas o tipo declarante), protected (tipo e tipos derivados), internal (restrito ao mesmo assembly compilado) e combinações como protected internal e private protected.",
        questions: [
          q("Qual modificador de acesso em C# restringe o método estritamente ao mesmo assembly compilado (.dll/.exe)?", "internal", ["private","protected","public"], "internal concede acesso a qualquer código dentro do mesmo assembly, mas bloqueia referências externas."),
          q("Qual é o nível de acesso padrão de um método declarado sem modificador dentro de uma classe em C#?", "private", ["internal","public","protected"], "Em C#, membros declarados dentro de classes são private por padrão caso nenhum modificador seja especificado."),
          q("Qual combinação de modificadores permite acesso apenas por classes derivadas situadas no mesmo assembly?", "private protected", ["protected internal","internal private","protected only"], "private protected (C# 7.2+) restringe o acesso estritamente a subclasses contidas dentro do mesmo assembly."),
          q("Por que expor o menor nível de acesso possível (privilégio mínimo) é vital no design de software?", "Para proteger o encapsulamento, ocultar detalhes internos e evitar acoplamento desnecessário", ["Para acelerar o compilador Roslyn","Para evitar que o coletor de lixo destrua a classe"], "Manter métodos privados ou internos permite refatorar a implementação sem quebrar consumidores externos da biblioteca."),
          t("Qual modificador de acesso em C# torna um método visível em todo o projeto e assemblies que o referenciam?", ["public"], "public confere acesso irrestrito a todos os consumidores autorizados.", "____ void ProcessarTransacao() { }"),
          g("Complete a declaração tornando o método utilitário visível apenas dentro do próprio assembly.", ["internal"], "internal restringe a visibilidade ao mesmo assembly compilado.", "____ class Validador { }"),
          o("Ordene os níveis de acesso em C# do mais restritivo para o mais permissivo.", ["private","private protected","internal / protected","public"], "A escala de visibilidade em .NET inicia no encapsulamento estrito (private) e vai até public."),
          p("Associe o modificador de acesso em C# ao seu raio de alcance.", [["private","Apenas dentro do corpo da própria classe declarante"],["internal","Qualquer código dentro do mesmo assembly (.dll)"],["protected","Dentro da classe declarante e em suas subclasses"],["public","Acessível por qualquer classe de qualquer assembly"]], "Dominar os modificadores de acesso é indispensável para construir bibliotecas .NET seguras.")
        ]
      },
      {
        id: "csharp-c05-u1-l4-metodos-estaticos-vs-instancia",
        title: "Métodos estáticos com o modificador static",
        subtitle: "Contratos de métodos · Chamadas vinculadas ao tipo vs operações sobre o ponteiro this",
        theory: "Métodos marcados com static pertencem ao tipo e não a uma instância individual de objeto. São invocados diretamente pelo nome da classe (ex: Math.Sqrt) sem exigir instanciação com new. Por não operarem sobre instâncias, métodos estáticos não possuem acesso ao ponteiro this nem a campos de instância.",
        questions: [
          q("Como se invoca um método estático Somar declarado dentro da classe Calculadora em C#?", "Calculadora.Somar(a, b);", ["new Calculadora().Somar(a, b);","Somar.Calculadora(a, b);","this.Calculadora.Somar(a, b);"], "Métodos estáticos são qualificados diretamente pelo identificador do tipo declarante."),
          q("Por que o uso da palavra reservada this resulta em erro de compilação dentro de um método static?", "Porque métodos estáticos não possuem contexto de instância individual associado", ["Porque this só pode ser usado em structs","Porque o coletor de lixo não rastreia métodos estáticos"], "Sem um objeto concreto em execução na chamada, inexiste instância representada por this."),
          q("Classes utilitárias que agrupam apenas métodos estáticos devem ser declaradas como:", "static class", ["sealed class","abstract class","partial struct"], "Declarar static class impede que a classe seja instanciada ou herdada, impondo apenas membros estáticos."),
          q("Qual classe da biblioteca padrão do .NET é um exemplo clássico de métodos estáticos?", "System.Math", ["System.Text.StringBuilder","System.IO.FileStream","System.Net.Http.HttpClient"], "System.Math é uma classe estática pura contendo operações como Sin, Cos, Min, Max e Clamp."),
          t("Qual modificador vincula o método diretamente à classe, dispensando o uso de new?", ["static"], "static vincula a rotina ao tipo e não à instância.", "public ____ int ObterMaximo(int a, int b) { return a > b ? a : b; }"),
          g("Complete a assinatura tornando o método de cálculo estático.", ["static"], "O modificador static elimina a necessidade de instanciar a classe.", "public ____ double CalcularJuros(double valor) { return valor * 0.05; }"),
          o("Ordene a estrutura canônica de uma chamada a método utilitário estático em C#.", ["Identificador da classe (ex: Math)","Operador de acesso ponto (.)","Nome do método estático (ex: Abs)","Argumentos delimitados por parênteses (ex: (-10))"], "A sintaxe direta Tipo.Metodo(argumentos) caracteriza chamadas estáticas em C#."),
          p("Associe o tipo de método ao seu comportamento correspondente em C#.", [["Método estático (static)","Invocado via nome da classe sem requerer new"],["Método de instância","Acessa e manipula o estado do objeto this"],["Classe estática (static class)","Não pode ser instanciada nem herdada"],["Construtor estático","Executa automaticamente uma única vez ao carregar o tipo"]], "Separar métodos utilitários puros de métodos com estado é crucial para código limpo.")
        ]
      },
      {
        id: "csharp-c05-u1-l5-expression-bodied-methods",
        title: "Métodos com corpo de expressão (expression-bodied members)",
        subtitle: "Contratos de métodos · Sintaxe concisa com operador lambda => no C# 6+",
        theory: "Introduzidos no C# 6 e expandidos nas versões seguintes, métodos com corpo de expressão substituem o bloco tradicional com chaves e return por uma seta lambda =>. Quando o método consiste em uma única instrução de cálculo ou retorno, essa sintaxe reduz o ruído visual mantendo 100% da tipagem e semântica.",
        questions: [
          q("Qual operador sintático é utilizado para declarar um método expression-bodied em C#?", "=> (operador de seta ou lambda)", ["-> (seta fina)",":: (quatro pontos)",":= (dois pontos igual)"], "O operador => liga diretamente a assinatura do método à expressão calculada e retornada."),
          q("Quando é apropriado utilizar a sintaxe de método com corpo de expressão?", "Quando a implementação do método consiste em uma única expressão de retorno ou instrução", ["Apenas em métodos que recebem exatamente dois parâmetros","Em métodos com mais de 50 linhas"], "A sintaxe => brilha na redução de boilerplate para funções simples de uma única linha."),
          q("A declaração int Dobro(int x) => x * 2; é equivalente a qual código tradicional?", "int Dobro(int x) { return x * 2; }", ["int Dobro(int x) { x = x * 2; }","int Dobro(int x) => return x * 2;"], "O operador => infere automaticamente o return para métodos com tipo de retorno não-void."),
          q("É permitido utilizar a sintaxe expression-bodied com métodos de retorno void?", "Sim, desde que o corpo consista em uma única instrução executável (como Console.WriteLine)", ["Não, métodos void só aceitam blocos com chaves","Apenas se for método estático"], "Métodos void podem usar => para despachar ações pontuais como Console.WriteLine(msg);."),
          t("Qual símbolo de dois caracteres forma o operador de corpo de expressão em C#?", ["=>"], "O operador => define métodos com corpo de expressão.", "public int Quadrado(int n) ____ n * n;"),
          g("Complete o método expression-bodied para retornar a soma dos dois números.", ["=>"], "O operador => substitui as chaves e o comando return.", "public int Somar(int a, int b) ____ a + b;"),
          o("Ordene a declaração de um método com corpo de expressão em C#.", ["Modificadores de visibilidade e tipo de retorno","Nome identificador do método e parâmetros entre parênteses","Operador de seta lambda (=>)","Expressão calculada resultante finalizada com ponto e vírgula"], "A sintaxe simplificada torna getters e cálculos matemáticos extremamente elegantes."),
          p("Associe a declaração de método à sua sintaxe correspondente.", [["int Area(int b, int h) => b * h;","Expression-bodied: conciso para expressão única"],["int Area(int b, int h) { return b * h; }","Bloco tradicional: útil quando há múltiplas instruções"],["void Log(string m) => Console.WriteLine(m);","Expression-bodied com tipo de retorno void"],["bool EhPar(int n) => n % 2 == 0;","Expression-bodied para predicado booleano"]], "Expression-bodied members conferem modernidade e concisão ao código C# corporativo.")
        ]
      }
    ],
    2: [
      {
        id: "csharp-c05-u2-l1-parametros-opcionais-valores-default",
        title: "Parâmetros opcionais e valores padrão",
        subtitle: "Parâmetros e retornos · Simplificando chamadas sem proliferação de sobrecargas",
        theory: "No C#, parâmetros podem receber valores padrão na própria assinatura (ex: int porta = 8080). Isso torna o argumento opcional na invocação: se o chamador omitir o dado, o compilador injeta automaticamente o valor default na chamada. Parâmetros opcionais devem sempre ser posicionados ao final da lista.",
        questions: [
          q("Como se define um parâmetro opcional na assinatura de um método em C#?", "Atribuindo um valor constante padrão na declaração do parâmetro (ex: int timeout = 30)", ["Usando a palavra-chave optional","Marcando o parâmetro com interrogação int?"], "A sintaxe de parâmetro opcional atribui um valor padrão em tempo de compilação."),
          q("Qual é a regra mandatória de posicionamento para parâmetros opcionais na assinatura?", "Devem ser declarados após todos os parâmetros obrigatórios da lista", ["Devem sempre ser declarados no início da lista","Podem ser intercalados aleatoriamente"], "O compilador exige que parâmetros opcionais fiquem no final para resolver argumentos posicionais sem conflitos."),
          q("Que tipo de expressão pode ser utilizada como valor padrão de um parâmetro opcional?", "Apenas expressões constantes resolvidas em tempo de compilação ou default", ["Chamadas de métodos dinâmicos","Leituras de banco de dados"], "Valores padrão são embutidos nos metadados do assembly do chamador pelo compilador em tempo de build."),
          q("O que acontece se uma biblioteca alterar o valor padrão de um parâmetro sem recompilar os clientes?", "Os clientes continuarão usando o valor padrão antigo embutido no momento do build anterior", ["Os clientes assumem o novo valor instantaneamente","Ocorre erro de runtime TypeLoadException"], "Como o compilador substitui a omissão pelo valor literal no chamador, a alteração exige recompilação."),
          t("Qual símbolo de pontuação atribui o valor padrão ao parâmetro na assinatura?", ["="], "O operador = define o valor padrão do parâmetro opcional.", "void Conectar(string host, int porta ____ 80) { }"),
          g("Complete o parâmetro tornando o tempo limite opcional com padrão de 30 segundos.", ["30"], "A atribuição define o valor padrão quando omitido.", "public void Requisitar(string url, int timeoutSegundos = ____) { }"),
          o("Ordene os parâmetros de uma assinatura combinando itens obrigatórios e opcionais.", ["Primeiro parâmetro obrigatório (string servidor)","Segundo parâmetro obrigatório (int usuarioId)","Primeiro parâmetro opcional com default (int porta = 443)","Segundo parâmetro opcional com default (bool usarSsl = true)"], "Parâmetros obrigatórios devem preceder obrigatoriamente todos os opcionais."),
          p("Associe a assinatura à chamada válida correspondente.", [["void Salvar(string doc, bool backup = true)","Salvar(\"relatorio.pdf\")"],["void Config(int nivel = 1, bool debug = false)","Config() sem argumentos"],["void Log(string msg, string modulo = \"Geral\")","Log(\"Falha no login\", \"Seguranca\")"],["void Validar(int id, int tentativas = 3)","Validar(1001)"]], "Parâmetros opcionais reduzem drasticamente a necessidade de sobrecargas manuais repetitivas.")
        ]
      },
      {
        id: "csharp-c05-u2-l2-argumentos-nomeados",
        title: "Argumentos nomeados para clareza e flexibilidade",
        subtitle: "Parâmetros e retornos · Desacoplando a chamada da ordem posicional dos argumentos",
        theory: "C# suporta argumentos nomeados na invocação de métodos, permitindo associar valores diretamente aos nomes dos parâmetros através da sintaxe nomeParametro: valor. Esse recurso aumenta a expressividade da chamada, autodocumenta valores booleanos ou numéricos confusos e dispensa argumentos opcionais intermediários.",
        questions: [
          q("Qual é a sintaxe correta para passar um argumento nomeado em uma chamada de método no C#?", "nomeDoParametro: valor", ["nomeDoParametro = valor","nomeDoParametro => valor","@nomeDoParametro(valor)"], "A sintaxe oficial utiliza o identificador do parâmetro seguido de dois-pontos e do valor correspondente."),
          q("Qual é a principal vantagem de usar argumentos nomeados ao invocar métodos com muitos parâmetros booleanos?", "Torna a chamada autoexplicativa (ex: ativarLog: true, enviarEmail: false) sem consultar a documentação", ["Aumenta a velocidade de compilação","Desativa o garbage collector"], "Argumentos booleanos puros como f(true, false, true) são indecifráveis; nomeá-los clareia a intenção."),
          q("É permitido alterar a ordem dos argumentos na chamada quando se utilizam argumentos nomeados?", "Sim, a ordem pode ser livremente alterada desde que todos os parâmetros necessários sejam supridos", ["Não, a ordem declarada deve ser respeitada rigidamente","Apenas para métodos com até 3 parâmetros"], "Argumentos nomeados desvinculam a chamada da posição física dos parâmetros na assinatura."),
          q("Como os argumentos nomeados facilitam o uso de múltiplos parâmetros opcionais?", "Permite especificar apenas o último parâmetro opcional sem precisar fornecer os intermediários", ["Obriga a preencher todos os opcionais","Converte opcionais em obrigatórios"], "Pode-se chamar Config(notificar: true) ignorando outros dez parâmetros opcionais default anteriores."),
          t("Qual símbolo de pontuação separa o nome do parâmetro de seu valor em argumentos nomeados?", [":","dois pontos","dois-pontos"], "Dois-pontos associam o nome do parâmetro ao valor fornecido.", "EnviarNotificacao(destinatario: \"Ana\", urgente____ true);"),
          g("Complete a chamada fornecendo o argumento nomeado para o parâmetro tentativas.", ["tentativas: 5"], "Argumentos nomeados utilizam o nome seguido de dois-pontos.", "ProcessarFila(____);"),
          o("Ordene os elementos de uma chamada que mistura argumentos posicionais e nomeados.", ["Argumentos posicionais iniciais respeitando a sequência","Primeiro argumento nomeado (ex: porta: 8080)","Segundo argumento nomeado fora de ordem (ex: host: \"localhost\")","Fechamento de parênteses e ponto e vírgula"], "O compilador aceita argumentos posicionais seguidos por argumentos nomeados no final."),
          p("Associe a chamada de Enviar(string para, string assunto, bool urgente = false) ao seu estilo.", [["Enviar(\"ana@email.com\", \"Relatorio\")","Chamada puramente posicional com padrão default"],["Enviar(urgente: true, para: \"ana@email.com\", assunto: \"Alerta\")","Totalmente nomeada e em ordem invertida"],["Enviar(\"ana@email.com\", assunto: \"Aviso\")","Híbrida: posicional no início e nomeada no fim"],["Enviar(para: \"ana@email.com\", \"Aviso\")","Inválida se o argumento posicional vier após o nomeado desordenado"]], "Argumentos nomeados elevam a clareza e protegem contra trocas acidentais de parâmetros homólogos.")
        ]
      },
      {
        id: "csharp-c05-u2-l3-parametros-params-arrays",
        title: "A palavra-chave params para listas variáveis de argumentos",
        subtitle: "Parâmetros e retornos · Flexibilidade no recebimento de coleções homogêneas",
        theory: "A palavra-chave params permite que um método aceite um número variável de argumentos de um mesmo tipo, ou até mesmo um array já existente. O compilador C# converte a lista de argumentos fornecidos na chamada em um array unidimensional sob os panos, proporcionando máxima comodidade sintática.",
        questions: [
          q("Qual palavra-chave em C# declara que um parâmetro recebe uma quantidade variável de argumentos?", "params", ["varargs","rest","paramsArray"], "params instrui o compilador a empacotar múltiplos argumentos homogêneos em um array."),
          q("Qual é a regra de posicionamento do parâmetro params na lista de parâmetros de um método?", "Deve ser obrigatoriamente o último parâmetro declarado na assinatura", ["Deve ser sempre o primeiro parâmetro","Pode estar em qualquer posição se houver apenas um"], "Assim como em Java e C++, o parâmetro de quantidade variável deve ser o último da assinatura."),
          q("Quantos parâmetros params um método em C# pode possuir?", "No máximo um único parâmetro params", ["Até dois, se forem de tipos diferentes","Quantos forem necessários"], "Permite-se apenas um único modificador params por assinatura para evitar ambiguidade sintática."),
          q("O que acontece se invocarmos um método void Listar(params int[] numeros) sem passar nenhum argumento?", "O método executa recebendo um array vazio de tamanho zero (Length == 0)", ["Lança ArgumentNullException","A variável numeros é atribuída com null"], "A chamada sem parâmetros aloca um array vazio, evitando exceções de referência nula."),
          t("Qual palavra-chave do C# antecede a declaração de array para habilitar argumentos variáveis?", ["params"], "params transforma a chamada em uma lista dinâmica de entradas.", "public static int Somar(____ int[] valores) { return 0; }"),
          g("Complete a assinatura para aceitar qualquer quantidade de textos com params.", ["params string[]"], "params seguido do tipo de array cria o parâmetro flexível.", "public void RegistrarLog(____ mensagens) { }"),
          o("Ordene a mecânica do compilador ao encontrar uma chamada com params Somar(1, 2, 3).", ["Identifica o modificador params na assinatura do método chamado","Gera código IL para instanciar um new int[] { 1, 2, 3 }","Passa a referência do array gerado para o método","O corpo do método itera sobre o array recebido"], "params é um açúcar sintático elegante do compilador C# que preserva a segurança estática."),
          p("Associe a assinatura de params à forma válida de invocação.", [["void Exibir(params int[] n)","Exibir(10, 20, 30) ou Exibir()"],["void Log(string msg, params object[] args)","Log(\"Erro {0}\", 404)"],["void Concat(char sep, params string[] itens)","Concat(';', \"a\", \"b\", \"c\")"],["Passagem de array explícito","Exibir(new int[] { 1, 2, 3 })"]], "A palavra params confere flexibilidade na construção de formatadores e utilitários.")
        ]
      },
      {
        id: "csharp-c05-u2-l4-retorno-tuplas-nomeadas",
        title: "Retorno de múltiplos valores com ValueTuple",
        subtitle: "Parâmetros e retornos · Retornando dados compostos leves com (int soma, double media)",
        theory: "A partir do C# 7, o suporte a tuplas baseadas em System.ValueTuple revolucionou o retorno de múltiplos valores. É possível declarar (int Minimo, int Maximo) ObterLimites(...) de forma leve e alocada na pilha (struct), acessando os valores retornados por nomes expressivos ou desconstruindo-os diretamente.",
        questions: [
          q("Como declarar a assinatura de um método que retorna uma tupla com dois valores inteiros nomeados?", "(int Minimo, int Maximo) ObterLimites(...)", ["Tuple<int, int> ObterLimites(...)","int, int ObterLimites(...)","[int, int] ObterLimites(...)"], "A sintaxe nativa do C# 7 usa parênteses com tipos e nomes de componentes: (int Minimo, int Maximo)."),
          q("Qual é a principal vantagem de ValueTuple (C# 7+) em relação à classe legada System.Tuple (C# 4)?", "ValueTuple é uma struct alocada na pilha (zero alocação no heap) e suporta nomes customizados de campos", ["System.Tuple é mais rápida","ValueTuple só aceita strings"], "ValueTuple elimina a sobrecarga de memória heap e aposenta os genéricos e feios Item1, Item2."),
          q("Como funciona a desconstrução (deconstruction) de tuplas no ponto chamador em C#?", "var (min, max) = ObterLimites(dados); atribuindo diretamente a novas variáveis locais", ["var min = ObterLimites(dados)[0];","ObterLimites(dados).Deconstruct()"], "A desconstrução extrai os membros da tupla diretamente em variáveis independentes em uma só linha."),
          q("Se os nomes dos campos da tupla forem omitidos na assinatura, quais nomes padrão a linguagem atribui?", "Item1, Item2, Item3, etc.", ["Field1, Field2","ValorA, ValorB","Left, Right"], "Sem nomes explícitos, o compilador recorre aos identificadores canônicos Item1, Item2, etc."),
          t("Quais caracteres delimitadores definem a sintaxe de tupla de retorno em C#?", ["()","parenteses"], "Parênteses envolvem os tipos e nomes da tupla.", "public ____int Linhas, int Colunas____ ObterDimensoes() { return (3, 4); }"),
          g("Complete o retorno da tupla empacotando os resultados da operação.", ["(soma, media)"], "Parênteses agrupam os dados retornados na tupla.", "return ____;"),
          o("Ordene as etapas para retornar e desconstruir uma ValueTuple em C#.", ["Declarar assinatura com tupla nomeada (int Qtd, decimal Total)","No método, devolver os valores com return (qtd, total);","No chamador, invocar desconstruindo var (q, t) = Processar();","Utilizar as variáveis q e t diretamente sem acessar membros"], "A desconstrução de tuplas torna o consumo de múltiplos resultados extremamente natural."),
          p("Associe o recurso de tupla ao seu benefício.", [["(int x, int y)","Retorno composto leve sem criar uma classe formal"],["var (x, y) = ponto;","Desconstrução direta em variáveis locais"],["ValueTuple (struct)","Armazenamento eficiente na pilha sem alocação no heap"],["_ (descarte / discard)","Ignora membros da tupla que não interessam ao chamador"]], "ValueTuples são uma das adições mais produtivas e eficientes da história moderna do C#.")
        ]
      },
      {
        id: "csharp-c05-u2-l5-retornos-assincronos-task-valuetask",
        title: "Contratos assíncronos: Task, Task<T> e ValueTask<T>",
        subtitle: "Parâmetros e retornos · Assinaturas assíncronas com async/await e eficiência na memória",
        theory: "Métodos assíncronos em C# expressam a devolução de operações não finalizadas através de Task (para métodos sem valor de retorno) ou Task<T> (quando devolvem um valor do tipo T). A partir do C# 7, ValueTask<T> foi introduzida como uma struct leve para otimizar rotinas que frequentemente concluem de forma síncrona.",
        questions: [
          q("Qual é o tipo de retorno padrão em C# para um método assíncrono que não produz nenhum valor final?", "Task", ["void","async void","Task<void>"], "Task representa uma promessa de operação assíncrona; async void deve ser evitado fora de manipuladores de eventos."),
          q("Por que o uso de async void é fortemente desencorajado em código de produção em C#?", "Porque exceções lançadas não podem ser capturadas pelo chamador, derrubando o processo da aplicação", ["Porque async void compila mais devagar","Porque o método executa de forma síncrona"], "async void atua no modelo \"dispare e esqueça\" (fire-and-forget), inviabilizando await e tratamento de exceções."),
          q("Qual é a grande vantagem de utilizar ValueTask<T> no lugar de Task<T>?", "Evita a alocação de um objeto Task no heap quando a operação é concluída de forma síncrona", ["ValueTask executa em GPU","ValueTask não exige await"], "ValueTask é uma struct que poupa alocações quando o resultado já está disponível em memória ou cache."),
          q("Qual sufixo nominal é a convenção padrão oficial da Microsoft para métodos assíncronos?", "Sufixo Async (ex: ObterDadosAsync, SalvarArquivoAsync)", ["Sufixo Task","Sufixo Awaitable","Prefixo Async_"], "O padrão TAP (Task-based Asynchronous Pattern) orienta nomear métodos assíncronos com o sufixo Async."),
          t("Qual modificador de método habilita o uso da palavra-chave await em seu corpo em C#?", ["async"], "async instrui o compilador a transformar o método em máquina de estados.", "public ____ Task<int> CalcularTotalAsync() { }"),
          g("Complete o retorno assíncrono para entregar o número inteiro de registros.", ["Task<int>"], "Task<int> representa a entrega futura de um número inteiro.", "public async ____ ContarAsync() { return await ObterCount(); }"),
          o("Ordene a estrutura canônica de um método assíncrono de consulta em C#.", ["Modificadores public async","Tipo de retorno Task<T>","Identificador do método finalizado com o sufixo Async","Invocação e espera de operações I/O com a palavra await"], "A anatomia do padrão TAP orquestra tarefas assíncronas com legibilidade linear."),
          p("Associe o tipo de retorno assíncrono ao seu cenário ideal.", [["Task<T>","Operação assíncrona com valor de entrega garantido"],["Task","Operação assíncrona sem valor de retorno (substituto de void)"],["ValueTask<T>","Alta performance onde o resultado frequentemente já está em cache"],["async void","Exclusivo para eventos de interface gráfica (event handlers)"]], "Projetar contratos assíncronos corretos é a base do desenvolvimento de APIs modernas em .NET.")
        ]
      }
    ],
    3: [
      {
        id: "csharp-c05-u3-l1-principios-sobrecarga-csharp",
        title: "Fundamentos da sobrecarga de métodos no C#",
        subtitle: "Sobrecarga · Diferenciação por nome, quantidade e tipos de parâmetros",
        theory: "A sobrecarga (overloading) permite definir métodos homônimos na mesma classe, desde que suas assinaturas difiram na quantidade, nos tipos ou na ordem de seus parâmetros. Em C#, o tipo de retorno não faz parte da assinatura usada para desambiguar métodos, gerando erro se apenas o retorno diferir.",
        questions: [
          q("O que compõe a assinatura formal de um método em C# para fins de sobrecarga?", "O nome do método e a lista ordenada dos tipos de seus parâmetros (incluindo modificadores ref/out)", ["O nome do método, tipos de parâmetros e tipo de retorno","O modificador de acesso e os nomes das variáveis"], "O tipo de retorno e os identificadores dos parâmetros NÃO participam da resolução de sobrecarga."),
          q("O que ocorre ao tentar compilar dois métodos com nomes e parâmetros idênticos, diferindo apenas pelo tipo de retorno?", "Erro de compilação: o tipo de retorno não é suficiente para diferenciar métodos", ["O compilador escolhe o retorno mais abrangente","Ambos compilam normalmente"], "O compilador C# emite erro acusando que um membro com a mesma assinatura já foi declarado."),
          q("É permitido sobrecarregar métodos alterando apenas os modificadores de ref vs out?", "Não, o compilador considera ref e out equivalentes na tabela de assinaturas de sobrecarga", ["Sim, ref e out geram sobrecargas totalmente distintas","Apenas em structs"], "ref e out são traduzidos de forma idêntica nos metadados de assinatura do compilador, impedindo sobrecarga mútua."),
          q("Qual classe utilitária do namespace System é célebre por sobrecargas com dezenas de variantes?", "System.Console (método WriteLine)", ["System.AppDomain","System.GC"], "Console.WriteLine possui dezenas de sobrecargas para todos os tipos primitivos, objetos e strings formatadas."),
          t("Em qual fase do ciclo de desenvolvimento a sobrecarga de métodos é resolvida pelo compilador C#?", ["compilação","tempo de compilação","build"], "A sobrecarga é estática e resolvida 100% durante a compilação.", "A sobrecarga em C# é resolvida em tempo de ____."),
          g("Complete a sobrecarga do método processar para aceitar um parâmetro decimal.", ["decimal"], "Alterar o tipo de entrada cria uma sobrecarga válida.", "void Processar(int codigo) { }\nvoid Processar(____ valor) { }"),
          o("Ordene a análise que o compilador C# faz para validar uma sobrecarga.", ["Compara se os identificadores dos métodos são idênticos","Analisa a quantidade total de parâmetros em cada declaração","Compara a sequência e os tipos de cada parâmetro","Confirma que as listas de tipos apresentam ao menos uma distinção"], "O compilador valida a distinção inequívoca entre as listas de parâmetros."),
          p("Associe o par de declarações à sua validade de sobrecarga em C#.", [["void F(int x) e void F(double x)","Válida: tipos de parâmetros distintos"],["void F(int x) e void F(int x, int y)","Válida: quantidade distinta de parâmetros"],["void F(int a) e string F(int b)","Inválida: retorno diferente não desambigua assinaturas idênticas"],["void F(ref int x) e void F(out int x)","Inválida: ref e out não podem sobrecarregar entre si"]], "Compreender as regras de assinatura do C# evita surpresas no design de classes.")
        ]
      },
      {
        id: "csharp-c05-u3-l2-resolucao-melhor-funcao-membro",
        title: "A regra do membro mais bem aplicável (better function member)",
        subtitle: "Sobrecarga · Como o compilador Roslyn elege a sobrecarga vencedora",
        theory: "Quando múltiplos métodos sobrecarregados são aplicáveis a uma invocação, o compilador C# aplica as regras de \"Better Function Member\". Ele prioriza correspondência de tipos exatos, seguida por conversões implícitas que preservam grandeza, preterindo parâmetros opcionais ou varargs (params) se houver opções fixas.",
        questions: [
          q("Qual sobrecarga tem preferência absoluta quando os tipos dos argumentos casam com a declaração?", "A sobrecarga com tipos exatamente idênticos, sem exigir nenhuma conversão", ["A sobrecarga que recebe object","A sobrecarga que utiliza params"], "A correspondência exata de tipos (exact match) sempre triunfa no algoritmo de melhor membro aplicável."),
          q("Se existirem Imprimir(long x) e Imprimir(object x), qual é invocada ao passar um int 42?", "Imprimir(long x), pois a conversão implícita de int para long é mais específica que para object", ["Imprimir(object x)","Erro de ambiguidade"], "Conversão implícita entre primitivos tem precedência sobre o boxing para object na hierarquia do C#."),
          q("Entre um método com parâmetros fixos e outro que depende de params int[], qual vence?", "O método com parâmetros fixos tem prioridade estrita sobre a versão com params", ["A versão com params sempre vence","Gera erro de ambiguidade"], "O compilador prefere evitar a alocação do array de params quando existe uma assinatura de parâmetros fixos."),
          q("O que acontece se nenhum método for estritamente mais específico que os demais candidatos?", "O compilador interrompe o build com erro de chamada ambígua (The call is ambiguous)", ["O compilador sorteia um método aleatoriamente","Chama o último método declarado no arquivo"], "Na ausência de um vencedor estrito, a chamada é considerada ambígua e o build falha."),
          t("Qual termo em inglês define o algoritmo de desempate de sobrecargas da especificação C#?", ["Better Function Member"], "A especificação C# define a política do \"Better Function Member\".", "Algoritmo de resolução: ____."),
          g("Complete a chamada forçando a sobrecarga double através de um cast explícito.", ["(double)"], "O cast direciona a resolução para a sobrecarga desejada.", "Calcular(____ 10);"),
          o("Ordene a precedência de seleção de sobrecargas em C# da mais prioritária para a menor.", ["Correspondência exata de tipos sem conversão","Conversão implícita numérica mais específica (ex: int -> long)","Conversão por herança / polimorfismo ou boxing (ex: int -> object)","Uso de parâmetros variáveis (params) ou valores opcionais padrão"], "A especificação garante determinismo na escolha do método mais específico."),
          p("Associe a invocação com argumento int ao método selecionado.", [["Teste(int x)","Correspondência exata: prioridade máxima"],["Teste(long x)","Selecionado por conversão implícita widening"],["Teste(params int[] x)","Selecionado apenas como último recurso via params"],["Teste(double x)","Selecionado se a versão int/long não existir"]], "Dominar o processo de desempate de sobrecarga evita comportamentos inesperados em refatorações.")
        ]
      },
      {
        id: "csharp-c05-u3-l3-ambiguidade-e-conversao-implicita",
        title: "Ambiguidade em sobrecargas e desambiguação com cast",
        subtitle: "Sobrecarga · Conflitos de conversão implícita cruzada e como solucionar",
        theory: "A ambiguidade ocorre quando dois métodos são compatíveis com os argumentos fornecidos, mas nenhum é melhor que o outro em todos os parâmetros simultaneamente. Um exemplo é f(int, double) e f(double, int) recebendo f(1, 1). A solução canônica é aplicar casting explícito em um dos argumentos.",
        questions: [
          q("O que dispara o erro CS0121 \"The call is ambiguous between the following methods\" em C#?", "Dois métodos satisfazem a chamada, mas nenhum é superior ao outro em todos os parâmetros", ["O método não existe na classe","A classe não foi instanciada"], "Ocorre empate técnico no teste de especificidade entre os métodos candidatos."),
          q("Se chamarmos f(null) existindo f(string s) e f(int[] arr), o que o compilador C# fará?", "Erro CS0121 por ambiguidade, pois null pode ser convertido implicitamente para ambos os tipos", ["Escolhe string por ordem alfabética","Escolhe int[] por ser array"], "Nem string nem int[] herdam um do outro; ambos são subtipos irmãos de object, gerando empate absoluto."),
          q("Como o desenvolvedor soluciona formalmente um erro de ambiguidade na linha de invocação?", "Aplicando um casting explícito no argumento: f((string) null)", ["Mudando o nome da classe","Declarando as variáveis como dynamic"], "O cast explícito resolve a dúvida do compilador Roslyn instantaneamente."),
          q("Se existirem f(short x) e f(byte x), qual é invocada ao passar f(5) (onde 5 é um literal int)?", "Nenhuma: erro de compilação, pois int não sofre conversão implícita estreitadora para short nem byte", ["f(short x) por ser maior","f(byte x)"], "Conversões estreitadoras (narrowing) exigem cast explícito obrigatório no C#."),
          t("Qual operação de código remove a ambiguidade forçando o tipo do argumento?", ["cast","casting"], "O casting explicita o tipo pretendido pelo desenvolvedor.", "Exibir((____) null);"),
          g("Complete o casting resolvendo a ambiguidade da chamada com null para selecionar a versão string.", ["(string)"], "O casting explícito indica a sobrecarga desejada.", "Processar(____ null);"),
          o("Ordene os passos para diagnosticar e eliminar um erro CS0121 de ambiguidade.", ["Ler os nomes dos métodos conflitantes apontados na mensagem do compilador","Inspecionar os tipos dos argumentos passados na chamada","Identificar qual parâmetro gerou empate de conversões implícitas","Inserir casting explícito no argumento para forçar o tipo desejado"], "O diagnóstico metódico poupa tempo na resolução de conflitos de compilação."),
          p("Associe o cenário de sobrecarga ao seu desfecho.", [["f(string) e f(object) com f(\"texto\")","Chama f(string) por ser mais específico que object"],["f(string) e f(Stream) com f(null)","Erro CS0121: null converte para ambos sem preferência"],["f(int, double) e f(double, int) com f(10, 20)","Erro CS0121 por conversões simétricas conflitantes"],["f(int, double) com f((int)10, (double)20)","Desambiguado com sucesso através de casts"]], "O compilador Roslyn é estrito: na dúvida, ele aborta a compilação para proteger a integridade.")
        ]
      },
      {
        id: "csharp-c05-u3-l4-sobrecarga-construtores-base-this",
        title: "Sobrecarga de construtores e o encadeamento : this()",
        subtitle: "Sobrecarga · Reaproveitamento de inicialização com construtores encadeados em C#",
        theory: "No C#, classes frequentemente sobrecarregam construtores para prover diferentes inicializações padrão. Para evitar código duplicado, um construtor pode delegar a execução para outro construtor da mesma classe utilizando a sintaxe de dois-pontos : this(...), executada antes do corpo do construtor.",
        questions: [
          q("Qual sintaxe permite que um construtor em C# delegue a inicialização para outro construtor da mesma classe?", "public MinhaClasse(string nome) : this(nome, 0) { }", ["public MinhaClasse(string nome) { this(nome, 0); }","public MinhaClasse(string nome) { base(nome, 0); }"], "Em C#, a delegação de construtor é indicada no cabeçalho após o símbolo de dois-pontos : this(...)."),
          q("Em que momento o construtor referenciado por : this(...) é executado?", "Antes que o corpo do construtor chamador inicie sua execução", ["Após o término do construtor chamador","Em uma thread separada"], "A delegação via : this(...) prepara a base da instância antes que o corpo local execute."),
          q("Qual palavra-chave é utilizada para delegar a inicialização ao construtor da classe base (superclasse)?", ": base(...)", [": super(...)",": parent(...)",": inherited(...)"], "A diretiva : base(...) aciona o construtor herdado da classe pai na hierarquia de herança."),
          q("O que acontece se dois construtores chamarem um ao outro em ciclo (A chama : this() para B e B chama A)?", "Erro de compilação por invocação circular de construtor", ["Loop infinito em tempo de execução","O objeto é alocado duas vezes"], "O compilador C# detecta ciclos diretos ou indiretos de invocação de construtores e bloqueia o build."),
          t("Qual operador de pontuação conecta a assinatura do construtor à chamada : this(...) em C#?", [":","dois pontos","dois-pontos"], "Dois-pontos introduzem a delegação de construtor no cabeçalho.", "public Conta(string titular) ____ this(titular, 0m) { }"),
          g("Complete o encadeamento do construtor secundário para o construtor principal com saldo zero.", ["this(titular, 0)"], ": this(...) delega a inicialização ao construtor mais completo.", "public Conta(string titular) : ____ { }"),
          o("Ordene a sequência de inicialização de um objeto com construtores encadeados.", ["Chamador executa new MinhaClasse(\"Texto\")","Cabeçalho : this(...) delega para o construtor mestre","Construtor mestre inicializa campos e valida dados","Corpo do construtor chamador secundário executa instruções adicionais"], "A delegação em cascata centraliza regras de negócio de inicialização em um único ponto."),
          p("Associe a diretiva de construtor ao seu papel arquitetural.", [[": this(...)","Delega para outro construtor da própria classe"],[": base(...)","Delega para o construtor herdado da classe base"],["Construtor primário (C# 12)","Parâmetros declarados diretamente no cabeçalho da classe"],["Construtor estático (static)","Inicializa membros estáticos uma única vez"]], "Construtores telescópicos bem encadeados eliminam código duplicado e centralizam validações.")
        ]
      },
      {
        id: "csharp-c05-u3-l5-metodos-extensao-e-sobrecarga",
        title: "Interação entre métodos de extensão e sobrecarga",
        subtitle: "Sobrecarga · Prioridade de métodos de instância nativos sobre extensões do C# 3+",
        theory: "Métodos de extensão adicionam operações a tipos existentes sem alterar o código original. Porém, quando um método de instância nativo possui a mesma assinatura de um método de extensão, o compilador C# sempre prioriza o método de instância nativo, ignorando o método de extensão silenciosamente.",
        questions: [
          q("Se uma classe já possui um método void Salvar() e criamos uma extensão com a mesma assinatura, qual executa?", "O método de instância nativo sempre tem prioridade absoluta sobre qualquer método de extensão", ["O método de extensão sobrescreve o nativo","Erro de compilação por ambiguidade"], "Métodos de extensão atuam como recursos de fallback; instâncias nativas sempre têm precedência total."),
          q("Qual modificador de parâmetro identifica formalmente o tipo estendido em um método de extensão?", "A palavra-chave this antes do primeiro parâmetro estático (ex: this string texto)", ["A palavra-chave extension","O modificador out","A anotação @extend"], "O modificador this no primeiro parâmetro de um método estático em classe estática define a extensão."),
          q("O que acontece com um método de extensão se a biblioteca externa adicionar um método homônimo em uma versão futura?", "O método nativo recém-adicionado \"sequestra\" as chamadas, anulando silenciosamente a extensão", ["O projeto para de compilar imediatamente","O runtime lança MethodConflictException"], "Esse é um risco arquitetural real de métodos de extensão: atualizações da classe base têm precedência."),
          q("Como invocar explicitamente o método de extensão ignorando o método nativo concorrente?", "Invocando-o como método estático tradicional: MinhaExtensao.Salvar(objeto);", ["Usando a palavra base.Salvar()","Não é possível"], "Chamar explicitamente a classe estática onde o método reside força sua execução direta."),
          t("Qual palavra-chave no primeiro parâmetro de uma classe estática cria um método de extensão?", ["this"], "this qualifica o tipo a ser estendido no C#.", "public static int ContarPalavras(____ string str) { }"),
          g("Complete o método de extensão estático para estender a classe string.", ["this string"], "this seguido do tipo declara o alvo da extensão.", "public static bool EhValido(____ texto) { return !string.IsNullOrWhiteSpace(texto); }"),
          o("Ordene os critérios de busca do compilador C# ao encontrar obj.Processar().", ["Procura por métodos de instância nativos declarados na classe do objeto","Procura por métodos herdados na cadeia de superclasses","Procura por métodos de extensão no namespace corrente","Procura por métodos de extensão em namespaces importados via using"], "A prioridade decresce da instância nativa para as extensões mais externas."),
          p("Associe a declaração ao seu papel na criação de extensões em C#.", [["static class MinhasExtensoes","Classe estática de nível superior que abriga os métodos"],["public static void Agir(this int n)","Método estático estendendo o tipo primitivo int"],["Invocação obj.Agir()","Sintaxe fluente que parece método de instância nativo"],["Invocação MinhasExtensoes.Agir(obj)","Invocação canônica estática desambiguada"]], "Métodos de extensão viabilizam APIs fluentes como LINQ mantendo o desacoplamento de tipos.")
        ]
      }
    ],
    4: [
      {
        id: "csharp-c05-u4-l1-tipos-valor-vs-tipos-referencia",
        title: "Tipos de valor (Value Types) vs tipos de referência (Reference Types)",
        subtitle: "Passagem de valores · A divisão fundamental de tipos no Common Type System (.NET)",
        theory: "No ecossistema .NET, tipos dividem-se em duas categorias primordiais: Value Types (structs, enums, tipos numéricos) e Reference Types (classes, interfaces, delegates, strings). Tipos de valor armazenam diretamente seus dados onde são declarados; tipos de referência guardam ponteiros para dados no heap gerenciado.",
        questions: [
          q("Qual estrutura em C# exemplifica a categoria de Tipos de Valor (Value Types)?", "struct (além de int, double, bool e enum)", ["class tradicional","interface","delegate"], "Structs herdam de System.ValueType e armazenam seus bytes diretamente sem sobrecarga de cabeçalho de heap."),
          q("Onde residem os dados quando declaramos uma variável local struct Ponto { int x, y; } dentro de um método?", "Diretamente no stack frame do método na pilha de execução", ["No heap gerenciado com coleta de lixo","No espaço de metadados estáticos"], "Tipos de valor locais vivem na pilha, proporcionando alocação e desalocação instantâneas."),
          q("O que acontece ao atribuir uma variável de tipo de valor a outra (b = a)?", "Uma cópia completa bit a bit de todos os campos é gravada na nova variável", ["Ambas passam a compartilhar a mesma memória","A variável a se torna null"], "Tipos de valor são totalmente independentes: alterar b jamais reflete em a."),
          q("Qual tipo clássico da BCL do .NET comporta-se como tipo de referência, embora tenha semântica imutável?", "System.String", ["System.Int32","System.DateTime","System.Guid"], "String é uma classe alocada no heap (tipo de referência), porém com imutabilidade estrita por design."),
          t("Qual palavra-chave do C# define um tipo de valor personalizado alocado na pilha?", ["struct"], "struct declara tipos de valor no C#.", "public ____ Ponto2D { public int X; public int Y; }"),
          g("Complete a declaração do tipo de valor imutável no C# moderno.", ["readonly struct"], "readonly struct garante que todos os campos sejam imutáveis na pilha.", "public ____ Vetor3D { }"),
          o("Ordene a classificação de tipos no sistema unificado do .NET (CTS).", ["System.Object (raiz universal de todos os tipos)","Bifurcação entre System.ValueType e tipos de referência puros","Structs e enums derivados de ValueType","Instâncias de classes alocadas no heap gerenciado"], "O CTS do .NET unifica todos os tipos sob uma hierarquia elegante encabeçada por Object."),
          p("Associe a estrutura ao seu perfil no Common Type System.", [["int, bool, double","Tipos primitivos de valor (Value Types na pilha)"],["class Cliente","Tipo de referência clássico (Reference Type no heap)"],["DateTime, TimeSpan","Structs da biblioteca padrão (Value Types)"],["string","Classe especial de referência com comportamento imutável"]], "Dominar a distinção entre valor e referência é crucial para prever o uso de memória em .NET.")
        ]
      },
      {
        id: "csharp-c05-u4-l2-passagem-padrao-por-valor",
        title: "A passagem padrão por valor em C#",
        subtitle: "Passagem de valores · Cópia de dados na pilha vs cópia de ponteiros de referência",
        theory: "Por padrão, todos os parâmetros em C# são passados por valor (pass-by-value). Para tipos de valor (como int ou structs), uma cópia integral dos bits do dado é colocada no frame da pilha do método. Para tipos de referência (classes), o que é copiado é o valor do endereço de memória que aponta para o heap.",
        questions: [
          q("Se passarmos uma variável int x = 10 para um método que executa x = 99;, qual é o valor de x no chamador?", "x continua valendo 10 no chamador", ["x passa a valer 99","x é redefinido para zero","Ocorre erro de runtime"], "Como int é passado por valor, o método modifica apenas a sua cópia local no stack frame."),
          q("O que exatamente é copiado na pilha quando passamos um objeto de classe para um método por padrão?", "Uma cópia da referência de memória (o endereço do ponteiro de 4 ou 8 bytes)", ["O objeto inteiro com todos os seus atributos duplicados no heap","Apenas o nome do objeto"], "A passagem é por valor; portanto, copia-se o valor da referência de memória para o parâmetro."),
          q("Por que passar structs muito grandes por valor pode impactar negativamente a performance?", "Porque todos os bytes da struct são copiados na pilha a cada chamada de método", ["Porque structs grandes vazam memória no heap","Porque o C# proíbe structs com mais de 3 campos"], "Copiar repetidamente structs com dezenas de campos consome ciclos de CPU com transferências na pilha."),
          q("Como prevenir a cópia cara de structs grandes em chamadas de métodos sem permitir que sejam alteradas?", "Utilizando o modificador in na assinatura do parâmetro (in MinhaStruct dado)", ["Declarando a struct como dynamic","Passando como string"], "O modificador in passa a struct por referência somente leitura, eliminando a cópia sem risco de mutação."),
          t("Qual é o modelo padrão de passagem de argumentos adotado pelo C# quando nenhum modificador é usado?", ["por valor","pass-by-value","valor"], "O padrão default do C# é a passagem estrita por valor.", "Parâmetros sem modificador são passados ____."),
          g("Complete a assinatura usando o modificador do C# 7.2 que passa structs por referência sem cópia e sem mutação.", ["in"], "in passa tipos de valor por referência somente leitura.", "public double CalcularDistancia(____ Ponto3D ponto) { }"),
          o("Ordene a mecânica de passagem de parâmetro padrão de uma classe em C#.", ["Chamador armazena a referência para o objeto no heap em uma variável local","Na chamada, o valor da referência é copiado para o parâmetro na pilha","Ambas as referências apontam para a mesma instância no heap","O método conclui e o parâmetro local é descartado da pilha"], "Entender a cópia da referência esclarece como o estado do heap é compartilhado entre chamadas."),
          p("Associe o tipo à consequência da passagem padrão por valor.", [["struct passada por valor","Cópia independente de bytes; chamador nunca é afetado"],["class passada por valor","Cópia da referência; objeto no heap é compartilhado"],["int passado por valor","Cópia do inteiro de 32 bits no stack frame"],["in struct (C# 7.2)","Passagem por referência leve bloqueada para escrita"]], "A clareza sobre cópias de valores evita bugs de mutação acidental em sistemas .NET.")
        ]
      },
      {
        id: "csharp-c05-u4-l3-modificando-objetos-no-heap",
        title: "Modificação de objetos no heap através de referências",
        subtitle: "Passagem de valores · Efeitos colaterais em instâncias compartilhadas",
        theory: "Mesmo que a referência em si seja copiada por valor, o ponteiro copiado aponta para a mesma instância compartilhada no heap. Se o método invocado alterar propriedades ou invocar métodos mutadores no objeto recebido, essas modificações serão imediatamente visíveis para a variável do método chamador.",
        questions: [
          q("Se um método executar cliente.Nome = \"Ana\"; em uma classe recebida por parâmetro padrão, o chamador vê a mudança?", "Sim, porque o objeto no heap foi alterado e o chamador aponta para o mesmo objeto", ["Não, apenas a cópia local do método muda","Apenas se o método tiver a palavra ref"], "A referência compartilhada permite que mutações no heap sejam observadas por todos os apontadores."),
          q("Qual é o termo técnico para duas ou mais referências apontando para o mesmo objeto no heap em .NET?", "Aliasing de referências", ["Polimorfismo estrutural","Shadowing de tipos"], "Aliasing designa a convivência de múltiplos apelidos de ponteiro para uma única entidade em memória."),
          q("Como proteger uma classe contra alterações acidentais de propriedades dentro de métodos?", "Projetando a classe com propriedades somente leitura com { get; init; } ou records", ["Tornando todos os métodos estáticos","Usando structs mutáveis"], "Propriedades imutáveis garantem que o estado do objeto jamais seja corrompido por métodos externos."),
          q("Coleções como List<int> sofrem alterações se passadas como parâmetro padrão?", "Sim, métodos como Add(), Remove() e Clear() alteram a lista compartilhada no heap", ["Não, listas são imutáveis no C#","Apenas se a lista contiver structs"], "List<T> é uma classe mutável; operações sobre ela afetam diretamente o chamador."),
          t("Qual palavra-chave do C# 9 define acessores que só podem receber valores durante a inicialização?", ["init"], "init impede alterações na propriedade após a criação do objeto.", "public string Nome { get; ____; }"),
          g("Complete a propriedade do registro para torná-la imutável após a instanciação.", ["init;"], "get; init; confere imutabilidade a propriedades no C# 9+.", "public int Codigo { get; ____ }"),
          o("Ordene a cadeia de eventos de uma mutação em objeto de classe compartilhado.", ["Chamador cria instância de Conta com Saldo = 100 no heap","Chamador invoca AplicarTaxa(conta)","Método acessa a instância compartilhada e faz conta.Saldo -= 10","Método encerra e desempilha seu parâmetro local","Chamador lê conta.Saldo e encontra o valor atualizado 90"], "A mutação persiste no heap independente do desempilhamento do método."),
          p("Associe a estrutura ao seu comportamento ao ser modificada.", [["Classe com { get; set; }","Mutável: métodos podem alterar suas propriedades livremente"],["Classe com { get; init; }","Imutável: propriedades não podem ser alteradas pós-criação"],["record class imutável","Gera novos objetos via expressão with sem mutar o original"],["IReadOnlyList<T>","Interface que oculta métodos mutadores como Add e Remove"]], "Imutabilidade por design é a melhor defesa contra bugs provocados por aliasing.")
        ]
      },
      {
        id: "csharp-c05-u4-l4-reatribuicao-de-parametros-sem-ref",
        title: "Reatribuição de parâmetros de referência sem a palavra ref",
        subtitle: "Passagem de valores · Por que instanciar new no parâmetro não substitui o objeto do chamador",
        theory: "Há uma distinção vital entre alterar os campos de um objeto e reatribuir a variável de parâmetro com new. Quando um método executa p = new Pessoa(); sem o modificador ref, apenas a variável de referência local do método passa a apontar para a nova instância. A referência original do chamador continua intacta.",
        questions: [
          q("Se um método fizer lista = new List<int>(); em um parâmetro comum, o que ocorre no chamador?", "A variável do chamador continua apontando firmemente para a lista original anterior", ["A lista do chamador é esvaziada","Ocorre erro de compilação CS001"], "Como a passagem foi por valor, reatribuir a variável local quebra o vínculo local sem afetar o chamador."),
          q("Por que a nova instância alocada com new não substitui a variável original do chamador?", "Porque o parâmetro do método é uma variável de pilha independente que recebeu apenas uma cópia do endereço", ["Porque new aloca na memória estática","Porque o C# desativa o coletor de lixo em parâmetros"], "Mudar o conteúdo da variável de pilha local afeta exclusivamente o método em execução."),
          q("Qual modificador de parâmetro seria necessário para que a reatribuição substituísse a variável do chamador?", "O modificador ref (ou out)", ["O modificador in","O modificador params","O modificador static"], "ref vincula a variável do parâmetro diretamente ao slot de memória da variável do chamador."),
          q("Qual é a forma recomendada em C# para que um método entregue uma nova instância ao chamador sem usar ref?", "Retornando a nova instância através da instrução return (ex: return new List<int>();)", ["Passando como variável global","Lançando o objeto como exceção"], "Retornar o novo objeto com return promove código funcional, puro e sem efeitos colaterais ocultos."),
          t("Qual modificador de parâmetro permite que uma reatribuição com new altere a variável do chamador?", ["ref"], "ref cria uma referência direta à própria variável do chamador.", "void Trocar(____ MinhaClasse obj) { obj = new MinhaClasse(); }"),
          g("Complete o retorno da nova lista instanciada para disponibilizá-la ao chamador de forma limpa.", ["return"], "O comando return transporta a nova instância ao chamador.", "public List<string> CriarFila() { ____ new List<string>(); }"),
          o("Ordene a mecânica quando um parâmetro de classe comum é reatribuído.", ["Método recebe uma cópia do endereço apontando para o objeto A","Instrução obj = new Objeto() aloca o objeto B no heap","A variável local do método passa a apontar para o objeto B","O método encerra e a variável local é descartada","A variável do chamador continua apontando para o objeto A"], "A reatribuição local é estritamente isolada e não contamina o contexto chamador."),
          p("Associe a linha de código ao seu efeito no chamador.", [["item.Valor = 50;","Altera o estado do objeto compartilhado no heap"],["item = new Item(50);","Sem efeito externo: apenas a variável local apontou para outro local"],["item = null;","Sem efeito externo: apenas o parâmetro local perdeu a referência"],["return new Item(50);","Devolve formalmente a nova instância para atribuição no chamador"]], "Distinguir mutação de campos de reatribuição de ponteiro é fundamental na arquitetura de código.")
        ]
      },
      {
        id: "csharp-c05-u4-l5-modificador-in-structs-readonly",
        title: "O modificador in e otimização de structs no C# 7.2+",
        subtitle: "Passagem de valores · Passagem por referência somente leitura para alta performance",
        theory: "O modificador in (introduzido no C# 7.2) passa argumentos por referência na memória, mas proíbe estritamente qualquer modificação do seu conteúdo pelo método chamado. Essa técnica é a solução definitiva para passar structs grandes sem o custo de cópia de bytes e sem abrir mão da imutabilidade.",
        questions: [
          q("Qual é a principal motivação para utilizar o modificador in em parâmetros em C#?", "Evitar a cópia onerosa de structs grandes na pilha garantindo que o método não possa modificá-las", ["Permitir que o método retorne múltiplos valores","Acelerar a serialização JSON"], "in une o ganho de desempenho da passagem por referência à segurança da garantia de imutabilidade."),
          q("O que o compilador C# faz se o método tentar alterar um campo de um parâmetro marcado com in?", "Emite um erro de compilação proibindo modificações em variáveis somente leitura", ["Permite a modificação silenciosamente","Lança exceção de runtime"], "Variáveis marcadas com in são tratadas como readonly references invioláveis pelo compilador."),
          q("É obrigatório que o chamador escreva a palavra in na chamada do método?", "Não, o uso de in na chamada é opcional pelo chamador, ao contrário de ref e out", ["Sim, é estritamente obrigatório","Apenas se for método estático"], "O compilador infere in na invocação automaticamente, facilitando a adoção do modificador em APIs."),
          q("O que são as \"cópias defensivas\" (defensive copies) que o compilador pode gerar com in?", "Cópias temporárias criadas se a struct não for readonly struct e invocar um método/propriedade", ["Backups salvos no disco rígido","Clones de classes abstratas"], "Se a struct puder sofrer mutação interna, o compilador clona a struct por segurança; use readonly struct para evitar isso."),
          t("Qual modificador de parâmetro declara uma referência somente leitura em C# 7.2+?", ["in"], "in garante passagem por referência sem permissão de escrita.", "public double CalcularMagnitude(____ Vetor4D v) { }"),
          g("Complete a assinatura usando o modificador que impede cópias e impede escrita na struct.", ["in"], "in passa por referência de leitura exclusiva.", "public static void Processar(____ Matriz4x4 m) { }"),
          o("Ordene os benefícios do modificador in aplicado a readonly structs.", ["Parâmetro recebe o modificador in na assinatura do método","Compilador passa apenas o ponteiro de memória (8 bytes em 64 bits)","Nenhuma cópia de bytes da struct é realizada na pilha","Compilador bloqueia tentativas de mutação e dispensa cópias defensivas"], "A dobradinha readonly struct + in é a fórmula canônica de alto desempenho no .NET moderno."),
          p("Associe o modificador à sua regra de permissão.", [["in","Passagem por referência somente leitura (leitura garantida)"],["ref","Passagem por referência bidirecional (leitura e escrita permitidas)"],["out","Passagem por referência de saída (escrita obrigatória antes de retornar)"],["Padrão (sem modificador)","Passagem tradicional por valor com cópia do dado"]], "O quarteto de passagem de parâmetros do C# confere controle cirúrgico sobre a memória.")
        ]
      }
    ],
    5: [
      {
        id: "csharp-c05-u5-l1-modificador-ref-passagem-referencia",
        title: "O modificador ref e a passagem real por referência",
        subtitle: "Ref e out · Criando aliases diretos para variáveis do chamador",
        theory: "O modificador ref instrui o compilador C# a passar o próprio local de armazenamento (endereço de memória) da variável, e não o seu valor. Isso permite que o método chamado leia e reatribua a variável original do chamador diretamente, tornando possível a implementação clássica da função Swap(ref a, ref b).",
        questions: [
          q("Qual é o efeito do modificador ref em um parâmetro do método em C#?", "Passa a referência direta da variável do chamador, permitindo que ela seja lida e reatribuída", ["Transforma a variável em uma constante imutável","Cria uma cópia da variável no heap"], "ref transforma o parâmetro em um apelido (alias) para a variável original na memória do chamador."),
          q("Qual é o requisito obrigatório para a variável passada como argumento com a palavra ref?", "Ela deve ser obrigatoriamente inicializada com um valor válido antes de ser passada", ["Ela deve ser obrigatoriamente nula","Ela deve ser do tipo string"], "Diferente de out, ref exige que a variável já contenha um valor previamente inicializado pelo chamador."),
          q("É obrigatório especificar a palavra-chave ref tanto na declaração do método quanto na linha da chamada?", "Sim, C# exige explicitamente a palavra ref em ambas as pontas para deixar a intenção clara", ["Não, basta colocar na declaração do método","Apenas na chamada"], "A exigência de ref na chamada documenta visualmente que a variável local pode sofrer mutação externa."),
          q("Como funciona a implementação correta de Trocar(ref int a, ref int b)?", "Usa temp = a; a = b; b = temp; alterando as variáveis reais do método chamador", ["Executa a = b sem variável temporária","Cria um novo array"], "Como a e b são referências às variáveis do chamador, as variáveis de fora são trocadas com perfeição."),
          t("Qual palavra-chave deve ser escrita antes da variável tanto na assinatura quanto na chamada?", ["ref"], "ref explicita a passagem por referência direta.", "Trocar(____ x, ____ y);"),
          g("Complete a chamada do método passando a variável por referência real.", ["ref total"], "ref deve ser repetido explicitamente no ponto de chamada.", "CalcularAcumulado(____);"),
          o("Ordene as etapas da troca de dois inteiros com método Swap usando ref.", ["Chamador declara e inicializa int x = 1 e int y = 2","Chamador executa Swap(ref x, ref y) passando os endereços das variáveis","Swap utiliza variável temporária para trocar os valores nos endereços recebidos","Ao retornar, o chamador verifica que x vale 2 e y vale 1"], "A passagem com ref conecta diretamente o método aos slots de memória do chamador."),
          p("Associe a característica ao modificador ref correspondente.", [["ref na assinatura","Declara que o parâmetro opera sobre a referência da variável"],["ref na invocação","Exige que a variável já esteja inicializada antes da chamada"],["Swap(ref a, ref b)","Exemplo canônico de troca de valores in-place no chamador"],["ref locals (C# 7)","Variáveis locais que apontam como referência para outro slot"]], "Usar ref com parcimônia preserva a previsibilidade e a facilidade de depuração.")
        ]
      },
      {
        id: "csharp-c05-u5-l2-modificador-out-multiplos-retornos",
        title: "O modificador out e parâmetros de saída obrigatórios",
        subtitle: "Ref e out · Devolvendo múltiplos dados com atribuição mandatória pelo compilador",
        theory: "O modificador out sinaliza que um parâmetro é utilizado exclusivamente para retornar dados do método para o chamador. O compilador C# impõe uma regra rígida de atribuição definitiva: o método chamado é estritamente obrigado a atribuir um valor ao parâmetro out em todos os caminhos de execução antes de retornar.",
        questions: [
          q("Qual é a regra estrita imposta pelo compilador C# ao implementar um método com parâmetro out?", "O método é obrigado a atribuir um valor ao parâmetro out antes de finalizar sua execução", ["O método não pode ler outros parâmetros","O parâmetro deve ser opcional"], "O compilador gera erro de compilação caso algum ramo de execução (if/else) retorne sem inicializar o out."),
          q("A variável passada como argumento out precisa ser inicializada antes da chamada?", "Não, ela pode ser passada sem inicialização prévia, pois será preenchida pelo método", ["Sim, deve ter valor não nulo","Apenas se for um tipo numérico"], "Diferente de ref, out ignora qualquer valor anterior e garante que a variável saia preenchida da função."),
          q("O que acontece se um método tentar ler o valor de um parâmetro out antes de atribuir um valor a ele?", "Erro de compilação por uso de variável não atribuída", ["Retorna zero ou null por padrão","Lança exceção em runtime"], "Dentro do método, o parâmetro out é considerado não inicializado até receber sua primeira atribuição."),
          q("Qual padrão de nomenclatura histórico da biblioteca .NET consagrou o uso de parâmetros out?", "O padrão Try-Parse (ex: int.TryParse, double.TryParse, DateTime.TryParse)", ["O padrão Factory Method","O padrão Singleton"], "Métodos Try retornam bool para indicar sucesso e entregam o valor processado através de um parâmetro out."),
          t("Qual palavra-chave define um parâmetro de saída cujo preenchimento é obrigatório pelo método?", ["out"], "out estabelece o contrato de saída obrigatória.", "public bool ObterCoordenadas(____ int x, ____ int y) { }"),
          g("Complete a assinatura indicando que o resultado é devolvido pelo parâmetro de saída.", ["out int"], "out seguido do tipo define o canal de devolução de dados.", "public bool TentarCalcular(string entrada, ____ valor) { }"),
          o("Ordene as obrigações do compilador ao validar um parâmetro out.", ["Detectar o modificador out na assinatura do método","Marcar a variável out como não inicializada no corpo do método","Rastrear todos os caminhos possíveis de retorno (return/throw)","Exigir que cada caminho atribua um valor à variável out antes de sair"], "A análise de atribuição definitiva (definite assignment) impede saídas corrompidas."),
          p("Associe a diferença entre os modificadores ref e out em C#.", [["modificador ref","Variável deve ser inicializada ANTES da chamada pelo chamador"],["modificador out","Variável deve ser inicializada DENTRO do método pelo chamado"],["Leitura em out","Proibida antes que o próprio método atribua um valor"],["Leitura em ref","Permitida imediatamente na primeira linha do método"]], "Distinguir ref de out esclarece os contratos de entrada e saída de dados no .NET.")
        ]
      },
      {
        id: "csharp-c05-u5-l3-padrao-tryparse-e-out-var",
        title: "O padrão TryParse e declaração out var em linha",
        subtitle: "Ref e out · Tratamento seguro de parsing sem exceções e sintaxe elegante do C# 7+",
        theory: "O padrão TryParse é a convenção em .NET para conversões seguras de texto em números ou datas. Ele devolve true se a conversão foi bem-sucedida (entregando o dado via out) e false se falhou, dispensando o custo de exceções. A partir do C# 7, a sintaxe out var permite declarar a variável diretamente na chamada.",
        questions: [
          q("Por que int.TryParse é preferível a int.Parse ao processar dados digitados por usuários?", "TryParse evita o lançamento de exceções caras em caso de formato inválido, retornando apenas false", ["TryParse compila em código nativo de GPU","Parse só funciona com números negativos"], "Lançar exceções como FormatException degrada a performance da aplicação; TryParse é limpo e rápido."),
          q("Como funciona o recurso out var introduzido no C# 7?", "Permite declarar e tipar a variável de saída diretamente na lista de argumentos da chamada", ["Permite que a variável seja global","Desativa a tipagem estática"], "Elimina a necessidade de declarar a variável na linha anterior: int.TryParse(texto, out var numero)."),
          q("Qual é o escopo da variável declarada com out var (ex: if (int.TryParse(s, out var n)))?", "Ela fica disponível dentro do bloco if e também nas instruções subsequentes do mesmo método", ["Apenas dentro dos parênteses do if","Apenas dentro do bloco else"], "A variável declarada com out var vaza para o escopo do bloco envolvente para uso imediato posterior."),
          q("Qual é o valor contido na variável out caso int.TryParse retorne false?", "O valor padrão default do tipo (zero para inteiros)", ["null","-1","Valor indefinido corrompido"], "A especificação do .NET garante que falhas de parsing atribuam o valor default do tipo à variável out."),
          t("Qual construção do C# 7 combina declaração inline e inferência de tipo no parâmetro out?", ["out var"], "out var declara a variável receptora na própria chamada.", "if (int.TryParse(entrada, ____ numero)) { }"),
          g("Complete o teste condicional usando out var para converter o texto em número inteiro.", ["out var valor"], "out var valor declara a variável no ponto de uso.", "if (int.TryParse(texto, ____)) { Processar(valor); }"),
          o("Ordene as etapas recomendadas para validar e converter texto com int.TryParse.", ["Receber a string de entrada vinda de formulário ou arquivo","Executar if (int.TryParse(entrada, out var resultado))","No bloco if de sucesso, consumir o resultado convertido","No bloco else, emitir mensagem de formato numérico inválido"], "A combinação de condicional com out var é o padrão áureo de parsing defensivo no C#."),
          p("Associe a abordagem de conversão ao seu perfil operacional.", [["int.Parse(texto)","Lança FormatException se a entrada não for número válido"],["int.TryParse(texto, out var n)","Não lança exceção; devolve booleano indicando o sucesso"],["out var n em linha","Declara e infere o tipo da variável no ponto de chamada"],["n no caso de falha","Contém o valor default 0 garantido pelo contrato do .NET"]], "O padrão TryParse protege sistemas em produção contra lentidão causada por exceções.")
        ]
      },
      {
        id: "csharp-c05-u5-l4-ref-readonly-e-ref-returns",
        title: "Retornos por referência (ref returns) e ref readonly",
        subtitle: "Ref e out · Acessando e expondo posições de memória sem cópias desnecessárias",
        theory: "O C# 7 introduziu retornos por referência (ref returns), permitindo que métodos retornem uma referência direta a uma posição de array ou campo interno, em vez de uma cópia de seu valor. Combinado com ref readonly, o chamador obtém acesso direto de leitura à memória sem custo de cópia e protegido contra escrita.",
        questions: [
          q("O que permite a sintaxe de retorno por referência (ref return) em C#?", "Permite que um método devolva a referência a uma variável ou elemento de array em vez de uma cópia", ["Permite retornar múltiplos métodos","Permite serializar ponteiros em JSON"], "O chamador recebe uma referência que pode ser usada para ler ou até modificar a posição original."),
          q("Como se declara um método que retorna uma referência somente leitura no C# 7.2+?", "public ref readonly int ObterElemento(...)", ["public readonly ref int ObterElemento(...)","public in int ObterElemento(...)"], "ref readonly garante a entrega por referência com imunidade absoluta contra modificação pelo chamador."),
          q("O que acontece se tentarmos fazer ref return de uma variável local comum declarada dentro do método?", "Erro de compilação CS8168: não é permitido retornar por referência variáveis locais de pilha", ["Compila normalmente","A variável é promovida para o heap"], "O compilador impede ref returns de variáveis locais porque seu stack frame é destruído no término do método."),
          q("Para quais cenários de engenharia de software os ref returns foram concebidos?", "Engenharia de motores de jogos, processamento de matrizes de alto desempenho e buffers de rede", ["Sistemas web CRUD convencionais","Consultas SQL"], "Evitar cópias de structs pesadas em loops de 60 FPS viabiliza desempenho comparável a C++."),
          t("Quais palavras reservadas compõem a declaração de retorno por referência imutável no C#?", ["ref readonly"], "ref readonly protege o retorno por referência contra escrita.", "public ____ int ObterMaiorElemento(int[] arr) { }"),
          g("Complete o retorno devolvendo o elemento do array por referência real.", ["ref arr[indice]"], "A instrução ref return devolve o endereço da posição.", "return ____;"),
          o("Ordene as salvaguardas que o compilador C# valida em um método com ref return.", ["Verifica se o tipo de retorno possui o modificador ref na assinatura","Analisa a expressão retornada no comando return ref","Garante que o dado retornado vive fora da pilha local do método (ex: array ou campo)","Bloqueia o build com erro caso a referência aponte para variável local de pilha"], "O compilador Roslyn garante que referências suspensas (dangling pointers) sejam impossíveis em C#."),
          p("Associe o recurso de referência avançado à sua finalidade no C#.", [["ref return","Devolve referência modificável a um elemento externo"],["ref readonly return","Devolve referência somente leitura com zero cópia"],["ref local (ref var x = ...)","Variável local que atua como alias para outra variável"],["Span<T> / ReadOnlySpan<T>","Representação segura e contígua de memória em pilha"]], "Recursos avançados de ref elevam o C# ao patamar de linguagens de programação de sistemas.")
        ]
      },
      {
        id: "csharp-c05-u5-l5-tradeoffs-ref-out-vs-tuplas",
        title: "Trade-offs de design: ref/out vs ValueTuples e Records",
        subtitle: "Ref e out · Escolhendo a melhor ferramenta para design limpo e idiomático no C# moderno",
        theory: "No passado, parâmetros out eram o único meio de retornar múltiplos valores no C#. Com ValueTuples e Records, o design moderno favorece tuplas nomeadas ou records, reservando ref e out quase que exclusivamente para cenários de alta performance extrema e o padrão clássico TryParse.",
        questions: [
          q("Qual é a recomendação de design moderna do ecossistema .NET para métodos que geram dois resultados?", "Preferir retornar uma ValueTuple nomeada (ex: (bool Sucesso, int Total)) ou um record", ["Usar sempre múltiplos parâmetros out","Criar variáveis estáticas na classe"], "Tuplas são mais fáceis de compor, desconstruir, testar e utilizar com LINQ e async/await."),
          q("Por que métodos que utilizam parâmetros ref e out não são compatíveis com async/await?", "O compilador não pode alocar parâmetros ref/out nos campos da máquina de estados assíncrona gerada", ["Porque a palavra async anula o ponteiro","Porque a rede não suporta referências"], "Métodos assíncronos não toleram ref ou out em suas assinaturas devido à mecânica da máquina de estados."),
          q("Em que cenário o padrão Try com parâmetro out ainda é a escolha mandatória da plataforma?", "Em APIs de baixo nível de parsing onde compatibilidade de convenção com a BCL é primordial", ["Em todos os métodos da camada de controle","Apenas para tipos genéricos"], "Manter aderência ao padrão consolidado TryParse preserva familiaridade para quem consome a biblioteca."),
          q("Qual é a grande desvantagem arquitetural de métodos com muitos parâmetros out?", "Dificultam a leitura fluente do código e quebram a composição de funções e linq expressions", ["Aumentam o tamanho do executável em 50%","Exigem a compra de licença especial"], "Parâmetros de saída poluem a assinatura e impedem o encadeamento direto de chamadas de métodos."),
          t("Qual estrutura leve alocada na pilha do C# 7 substitui a maioria dos usos de parâmetros out?", ["ValueTuple","tupla"], "ValueTuple tornou obsoleto o uso extensivo de out para retornos compostos.", "Prefira retornar uma ____ nomeada em vez de out."),
          g("Complete o retorno moderno substituindo out por uma tupla tipada e expressiva.", ["(true, total)"], "Retornar tuplas nomeadas é a prática idiomática moderna.", "return ____;"),
          o("Ordene a evolução histórica dos retornos múltiplos no C#.", ["C# 1.0 usa parâmetros out como único meio de retorno múltiplo","C# 4.0 introduz System.Tuple pesada alocada no heap com Item1 e Item2","C# 7.0 introduz ValueTuple na pilha com nomes semânticos e desconstrução","C# 9.0 introduz records imutáveis para transferência de dados de domínio"], "A linguagem evoluiu continuamente rumo a abstrações leves, tipadas e puramente expressivas."),
          p("Associe a técnica ao seu cenário de aplicação no C# moderno.", [["(bool Ok, T Valor) como retorno","Padrão moderno, limpo, combinável e compatível com async"],["bool TryOperar(out T valor)","Convenção clássica da BCL para parsing de alta frequência"],["record class Resultado(...)","Modelo de dados de domínio formal para transporte entre camadas"],["ref struct Span<T>","Ponteiro seguro de altíssima performance para fatiamento"]], "Saber quando usar tuplas modernas ou ref/out clássico diferencia o desenvolvedor experiente.")
        ]
      }
    ],
    6: [
      {
        id: "csharp-c05-u6-l1-introducao-funcoes-locais",
        title: "Funções locais: métodos aninhados no C# 7+",
        subtitle: "Funções locais · Métodos declarados dentro de métodos com escopo restrito",
        theory: "Introduzidas no C# 7, funções locais (local functions) permitem declarar métodos auxiliares diretamente dentro do corpo de outro método, construtor ou propriedade. Elas ficam visíveis estritamente no escopo daquele bloco, impedindo que classes sejam poluídas com rotinas privadas de uso estritamente pontual.",
        questions: [
          q("O que é uma função local (local function) no C# moderno?", "Um método declarado diretamente dentro do corpo de outro método ou membro executável", ["Uma função declarada em arquivo .js separado","Um método de extensão privado"], "Funções locais encapsulam lógica auxiliar exatamente no ponto onde ela é necessária."),
          q("Qual é o escopo de visibilidade de uma função local?", "Estritamente o corpo do método envolvente onde foi declarada", ["Toda a classe declarante","Todo o namespace"], "Nenhum outro método da classe pode enxergar ou invocar a função local, garantindo encapsulamento máximo."),
          q("Onde uma função local pode ser posicionada dentro do método envolvente?", "Em qualquer ponto do método, inclusive após a instrução return principal", ["Apenas na primeira linha do método","Apenas dentro de blocos if"], "O compilador reconhece a declaração em qualquer linha do bloco; por convenção, posiciona-se ao final."),
          q("Funções locais suportam recursão, tipos genéricos e modificadores como async e unsafe?", "Sim, funções locais suportam praticamente todos os recursos de métodos normais", ["Não, funções locais não suportam recursão","Apenas tipos primitivos são aceitos"], "Elas comportam-se como métodos completos de primeira classe dentro de seu escopo restrito."),
          t("Qual versão do C# introduziu o recurso de funções locais (local functions)?", ["7","C# 7","7.0"], "O C# 7.0 adicionou as funções locais à linguagem.", "Recurso adicionado na versão C# ____."),
          g("Complete a declaração da função local auxiliar que calcula o dobro do valor.", ["int Dobro(int n)"], "A sintaxe de função local segue a declaração usual de métodos.", "____ => n * 2;"),
          o("Ordene a estrutura recomendada de um método que utiliza função local.", ["Validação pública inicial de argumentos de entrada","Lógica principal de orquestração do método","Instrução return principal que encerra a rotina","Declaração da função local auxiliar isolada no rodapé do método"], "Posicionar funções locais no rodapé do método preserva a leitura fluente do fluxo principal."),
          p("Associe a estrutura de código ao seu nível de encapsulamento.", [["Função local","Visível exclusivamente dentro do método que a contém"],["Método private da classe","Visível por qualquer método da mesma classe"],["Método internal","Visível por qualquer classe dentro do mesmo assembly"],["Método public","Acesso irrestrito a todos os consumidores"]], "Funções locais levam o princípio do menor privilégio ao limite de granularidade do método.")
        ]
      },
      {
        id: "csharp-c05-u6-l2-funcoes-locais-vs-lambdas-desempenho",
        title: "Funções locais vs expressões lambda e delegates",
        subtitle: "Funções locais · Por que funções locais não alocam objetos de delegate no heap",
        theory: "Embora expressões lambda atribuídas a Func<T> ou Action<T> também criem lógica aninhada, elas exigem a alocação de um objeto de delegate no heap. Em contraste, funções locais são compiladas diretamente como métodos normais no bytecode IL, operando sem nenhuma alocação extra no heap quando não capturam variáveis.",
        questions: [
          q("Qual é a principal vantagem de desempenho de uma função local sobre um delegate Func/Action?", "Funções locais evitam a alocação de objetos de delegate e chamadas virtuais indiretas", ["Funções locais executam na placa de vídeo","Funções locais desativam o compilador JIT"], "A função local é emitida diretamente como instrução de chamada estática ou normal no IL da compilação."),
          q("O que acontece na memória heap ao declarar e invocar Func<int, int> dobro = x => x * 2;?", "Um objeto de delegate Func é alocado no heap gerenciado para encapsular a referência", ["Nenhuma alocação é feita","Dois threads são disparados"], "Instâncias de delegate são objetos de referência normais que demandam coleta de lixo posterior."),
          q("Como o compilador C# emite uma função local no bytecode intermediário (IL)?", "Como um método privado normal com um nome gerado pelo compilador decorado com símbolos", ["Como uma chamada de sistema operacional","Como reflexão dinâmica"], "O compilador traduz a função local para um método convencional da classe, preservando altíssima velocidade."),
          q("Qual construção permite recursão de forma muito mais simples e sem variáveis nulas intermediárias?", "Funções locais chamam a si mesmas diretamente pelo nome sem cerimônia", ["Expressões lambda exigem atribuição prévia de variável nula","Ambas são idênticas"], "Recursão em lambdas é desajeitada; funções locais suportam auto-chamadas com sintaxe nativa."),
          t("Qual objeto do heap é evitado ao substituir uma lambda anônima por uma função local?", ["delegate","objeto de delegate"], "Funções locais eliminam o overhead de instanciação de delegates.", "Evita a alocação de um ____ no heap."),
          g("Complete o código convertendo a lógica em uma função local eficiente sem alocação de delegate.", ["int Calcular(int x)"], "Funções locais utilizam a sintaxe canônica de métodos.", "____ => x * x;"),
          o("Ordene a análise de desempenho entre lambdas e funções locais.", ["Lambda anônima cria um objeto delegate e classe de fechamento se capturar dados","Compilador gera chamada indireta via ponteiro de delegate","Função local é emitida como chamada direta de método no IL","Zero alocações de delegate ocorrem no heap ao usar função local"], "A eficiência de compilação torna funções locais a melhor escolha para métodos auxiliares aninhados."),
          p("Associe a construção à sua mecânica interna de compilação.", [["Func<int, int> f = x => x * 2;","Aloca objeto System.Func no heap"],["int Dobro(int x) => x * 2;","Compilado como método convencional com zero alocação de delegate"],["Recursão em função local","Chamada recursiva direta e natural"],["Recursão em lambda","Exige inicializar a variável delegate com null previamente"]], "Funções locais combinam a elegância de lambdas com o desempenho de métodos nativos.")
        ]
      },
      {
        id: "csharp-c05-u6-l3-fechamento-lexico-closures",
        title: "Captura de variáveis locais e fechamento léxico (closures)",
        subtitle: "Funções locais · Acessando variáveis do método pai e a alocação da display class",
        theory: "Funções locais têm acesso direto a parâmetros e variáveis locais do método envolvente (recurso conhecido como fechamento léxico ou closure). Quando uma função local acessa variáveis externas, o compilador gera nos bastidores uma \"display class\" no heap ou uma struct para manter esses dados vivos durante a chamada.",
        questions: [
          q("O que é uma closure (fechamento léxico) em funções locais de C#?", "A capacidade da função local de ler e modificar variáveis pertencentes ao método envolvente", ["O encerramento do método com return","Um bloco de tratamento de exceções"], "A função local \"captura\" o ambiente léxico das variáveis do método onde foi declarada."),
          q("O que o compilador C# gera internamente quando uma função local captura variáveis externas?", "Cria uma classe ou struct oculta (\"display class\") para armazenar os campos capturados", ["Gera variáveis globais na memória estática","Converte o código para C++ nativo"], "O compilador orquestra o compartilhamento de dados através de uma estrutura auxiliar gerada automaticamente."),
          q("Se a função local for convertida em um delegate e escapar do método, onde a display class residirá?", "Obrigatoriamente no heap gerenciado, garantindo que os dados não morram com o stack frame", ["Na memória ROM","Na pilha do sistema operacional"], "Se a execução sobreviver ao método pai, os dados capturados devem ser preservados no heap."),
          q("Qual é o risco de capturar variáveis locais sem perceber dentro de loops de alto desempenho?", "Pode induzir alocações indesejadas no heap, gerando pressão no Garbage Collector", ["Pode causar tela azul no Windows","Impede a depuração de código"], "Capturas desnecessárias de contexto geram alocações de memória sutis e difíceis de rastrear."),
          t("Como se chama o conceito onde uma função aninhada retém o ambiente léxico de variáveis pai?", ["closure","fechamento lexico","fechamento léxico"], "Closures capturam o contexto circundante de execução.", "Mecanismo conhecido como ____."),
          g("Complete a função local acessando a variável fator capturada do método pai.", ["fator"], "Variáveis do método externo podem ser consumidas livremente pela função local.", "int Multiplicar(int n) => n * ____;"),
          o("Ordene a transformação realizada pelo compilador Roslyn ao capturar variáveis em uma closure.", ["Identificar quais variáveis locais do método pai são lidas pela função local","Gerar nos metadados uma classe auxiliar interna (display class)","Mover as variáveis locais capturadas para campos dessa display class","Fazer o método e a função local lerem e gravarem nos campos da display class"], "A display class gerada garante coerência mútua entre variáveis pai e filhas."),
          p("Associe o tipo de captura ao impacto na memória.", [["Função local sem capturas","Zero alocações: emitida como método normal puramente estático"],["Função local com captura síncrona","Compilador pode otimizar gerando struct na pilha"],["Função local convertida em delegate","Alocação obrigatória de display class no heap"],["Captura de parâmetros in","Permite leitura sem cópia das referências"]], "Entender closures permite desfrutar da expressividade sem custos ocultos de alocação.")
        ]
      },
      {
        id: "csharp-c05-u6-l4-funcoes-locais-estaticas",
        title: "Funções locais estáticas no C# 8+",
        subtitle: "Funções locais · O modificador static local para blindar contra alocações acidentais",
        theory: "Introduzidas no C# 8, funções locais estáticas utilizam o modificador static antes de sua assinatura. Isso impõe uma garantia formal de compilação: a função local fica terminantemente proibida de capturar qualquer variável ou parâmetro do método envolvente, garantindo zero alocações no heap e independência total.",
        questions: [
          q("Qual é o benefício do modificador static aplicado a uma função local no C# 8+?", "Garante que a função não capture variáveis do método pai, eliminando alocações acidentais no heap", ["Faz com que a função execute mais rápido em disco","Permite que outras classes a invoquem"], "Se o desenvolvedor tentar ler uma variável externa, o compilador Roslyn emite erro imediato no build."),
          q("O que acontece se uma static local function tentar acessar um parâmetro do método envolvente?", "Erro de compilação CS8429: static local functions cannot contain a reference to this or local variables", ["Compila normalmente","Gera um aviso e cria a closure"], "A palavra static funciona como uma blindagem rigorosa contra capturas de escopo acidentais."),
          q("Como uma static local function deve receber dados necessários para seus cálculos?", "Exclusivamente através de seus próprios parâmetros formais passados na chamada", ["Lendo propriedades públicas","Usando reflexão"], "Tudo o que a função precisa deve ser passado explicitamente em seus parênteses de entrada."),
          q("Qual é a recomendação de boas práticas sobre o uso de static em funções locais?", "Marcar como static por padrão toda função local que não dependa de variáveis de fora", ["Nunca usar static em funções locais","Usar static apenas se o método pai for static"], "Adotar static por padrão documenta a pureza do método e protege a alocação de memória contra regressões."),
          t("Qual modificador do C# 8 bloqueia a captura de variáveis locais em métodos aninhados?", ["static"], "static isola a função local de qualquer captura de variáveis externas.", "____ int Somar(int a, int b) => a + b;"),
          g("Complete a declaração tornando a função local estática e livre de capturas.", ["static int"], "static int define uma função local que não captura variáveis de fora.", "____ Calcular(int valor) => valor * 2;"),
          o("Ordene a análise do compilador ao encontrar uma função local estática.", ["Verifica o modificador static no cabeçalho da função local","Varre o corpo da função local em busca de menções a variáveis locais externas","Se encontrar menção a variável de fora, emite erro de compilação","Se o corpo for autossuficiente, emite o método estático puro no IL"], "A verificação estática no build garante integridade absoluta de alocação zero."),
          p("Associe a declaração de função local à sua característica.", [["static int Somar(int a, int b)","Proibida de capturar variáveis do método pai; zero alocações"],["int Somar(int a, int b)","Pode capturar variáveis de fora, podendo gerar display class"],["static void Log(string msg)","Método auxiliar aninhado autônomo e puro"],["Erro CS8429","Ocorre ao tentar ler variável externa em função local estática"]], "Funções locais estáticas promovem engenharia de alta disciplina e zero overhead.")
        ]
      },
      {
        id: "csharp-c05-u6-l5-validacao-em-iteradores-e-async",
        title: "Funções locais para validação rápida em iteradores e async",
        subtitle: "Funções locais · O padrão fail-fast em métodos com yield return e async/await",
        theory: "Iteradores (yield return) e métodos assíncronos adiam a execução até o primeiro consumo. Se a validação estiver no corpo adiado, erros estouram tardiamente. O padrão canônico do C# usa função local: o método público valida argumentos de forma síncrona e delega para a função local.",
        questions: [
          q("Qual é o problema clássico de validação de argumentos em métodos com yield return?", "A validação só é executada quando o chamador consome a primeira iteração do foreach (execução adiada)", ["A validação impede a compilação","O yield anula os parâmetros"], "Sem funções locais, passar null para um gerador não lança exceção no momento da chamada, mascarando bugs."),
          q("Como a função local resolve a validação antecipada em métodos com yield return ou async?", "O método público valida os parâmetros imediatamente e delega para uma função local com yield/async", ["A função local desativa o yield","A função local roda em segundo plano"], "Garante o comportamento fail-fast: argumentos inválidos são rejeitados no exato instante da chamada pública."),
          q("O que acontece em um método async público se a validação estiver dentro da máquina de estados?", "A exceção é capturada dentro do Task retornado e só estoura quando o chamador executa await", ["O programa fecha imediatamente","A exceção é impressa no terminal"], "O chamador pode reter o Task inválido por minutos antes do await, dificultando o rastreamento da causa raiz."),
          q("Qual é a estrutura recomendada para um método iterador seguro?", "Método público sem yield valida argumentos -> chama função local com yield e retorna o IEnumerable", ["Método público com yield e bloco try-catch","Usar arrays estáticos"], "Separar a checagem síncrona da máquina de estados iteradora é o padrão oficial do .NET Runtime."),
          t("Qual palavra-chave do C# gera iteradores cuja execução preguiçosa exige validação separada?", ["yield","yield return"], "yield cria a máquina de estados preguiçosa de iteração.", "____ return item;"),
          g("Complete o retorno do método público delegando para a função local geradora validada.", ["GerarSequenciaLocal()","GerarLocal()"], "O método público valida e imediatamente aciona a função local.", "return ____;"),
          o("Ordene o fluxo seguro de validação em métodos iteradores com funções locais.", ["Método público recebe os parâmetros de entrada","Verifica precondições lançando ArgumentNullException se nulo (fail-fast imediato)","Chama a função local iteradora auxiliar que contém yield return","Retorna o IEnumerable gerado para consumo pelo chamador"], "A técnica garante que precondições sejam validadas no momento exato da chamada da função."),
          p("Associe a abordagem de validação ao comportamento correspondente.", [["Validação dentro de yield return","Tardia: erro só ocorre quando o foreach inicia a leitura"],["Validação síncrona + função local","Imediata: erro explode na própria linha da chamada pública"],["Validação dentro de método async","Exceção encapsulada no Task só visível no await"],["Validação fora do async + função local","Exceção síncrona imediata antes de criar o Task"]], "Adotar funções locais em métodos de execução diferida é a marca registrada de código .NET profissional.")
        ]
      }
    ],
    7: [
      {
        id: "csharp-c05-u7-l1-caso-base-em-csharp",
        title: "A condição de parada do caso-base em C#",
        subtitle: "Recursão e caso-base · A âncora que previne o estouro da pilha com StackOverflowException",
        theory: "O caso-base em um algoritmo recursivo representa a condição de término imediata que dispensa chamadas recursivas. Sem uma condição de parada bem estruturada no topo do método, a pilha da thread esgota-se com rapidez, disparando uma fatal System.StackOverflowException que encerra a aplicação.",
        questions: [
          q("Qual é a finalidade precípua do caso-base em uma função recursiva no C#?", "Interromper o ciclo de auto-chamadas recursivas e entregar uma resposta direta", ["Aumentar o limite de memória do heap","Converter a função em um loop infinito"], "O caso-base fornece a saída estática imediata necessária para a terminação graciosa do algoritmo."),
          q("O que acontece no .NET quando a profundidade de recursão excede a capacidade de memória da pilha?", "Ocorre um erro fatal irrecuperável System.StackOverflowException e o processo é abortado", ["A JVM gerencia o estouro e expande a pilha","O método retorna null silenciosamente"], "Em .NET moderno, StackOverflowException não pode ser capturada por blocos try-catch normais: ela encerra o processo."),
          q("Onde deve ser posicionado o teste do caso-base no corpo do método?", "Nas primeiras instruções do método, antes de qualquer passo recursivo subsequente", ["No final do método, após a invocação recursiva","Dentro de um bloco finally"], "Testar a parada logo no início evita processamentos desnecessários e protege a integridade da pilha."),
          q("No cálculo recursivo clássico do Fatorial(n), qual é a condição de parada canônica?", "if (n <= 1) return 1;", ["if (n == 100) return 100;","if (n > 0) return 0;"], "Por definição matemática, 0! e 1! equivalem a 1, constituindo a base terminal da recursão."),
          t("Qual exceção irrecuperável do .NET ocorre quando a recursão esgota a pilha de chamadas?", ["StackOverflowException"], "StackOverflowException encerra a execução por falta de espaço na pilha.", "Fatal error: System.____"),
          g("Complete a cláusula do caso-base para encerrar a recursão quando n for menor ou igual a zero.", ["<= 0"], "O operador <= previne que números negativos saltem a condição.", "if (n ____) return 0;"),
          o("Ordene a progressão de um método recursivo ao atingir o caso-base.", ["Método recebe argumento que satisfaz a condição de parada","Condicional de caso-base avalia como verdadeira","Método retorna o valor direto sem invocar a si mesmo","Pilha de execução inicia a fase de desempilhamento e retorno dos chamadores"], "O caso-base encerra a descida na pilha e dá início à propagação dos resultados."),
          p("Associe o algoritmo ao seu caso-base clássico.", [["Fatorial(n)","n <= 1 retorna 1"],["SomaRegressiva(n)","n <= 0 retorna 0"],["Busca Binária","inicio > fim indica ausência"],["Contagem de nós em árvore","no == null retorna 0"]], "Um caso-base robusto é o pilar inegociável de qualquer solução recursiva confiável.")
        ]
      },
      {
        id: "csharp-c05-u7-l2-passo-indutivo-e-convergencia",
        title: "O passo indutivo e a garantia de convergência",
        subtitle: "Recursão e caso-base · Reduzindo a magnitude da entrada a cada chamada",
        theory: "O passo indutivo da recursão é a instrução em que a função invoca a si mesma passando uma versão simplificada do problema original. A regra mandatória e indispensável é a garantia de convergência: cada chamada deve aproximar a entrada estritamente do caso-base (ex: subtraindo 1 ou dividindo por 2).",
        questions: [
          q("Qual é a exigência formal para os argumentos passados na chamada recursiva do passo indutivo?", "Devem aproximar o estado do problema da condição de parada estabelecida no caso-base", ["Devem ser maiores que o argumento original","Devem ser convertidos em texto"], "Sem convergência estrita em direção ao caso-base, o algoritmo entra em recursão infinita."),
          q("Na função recursiva int Potencia(int baseNum, int exp), qual é a redução indutiva canônica?", "return baseNum * Potencia(baseNum, exp - 1); com caso-base em exp == 0", ["return Potencia(baseNum + 1, exp);","return Potencia(baseNum, exp);"], "Reduzir exp - 1 aproxima o expoente sucessivamente até atingir o caso-base exp == 0."),
          q("O que acontece se uma chamada recursiva passar o mesmo argumento recebido sem reduzi-lo?", "A função continuará chamando a si mesma com os mesmos dados até StackOverflowException", ["O compilador C# detecta e corrige automaticamente","A função retorna zero"], "Chamar f(n) dentro de f(n) gera um ciclo estagnado que jamais atinge a parada."),
          q("Como a indução matemática se relaciona com algoritmos recursivos?", "Provando que a base é correta e que o passo n garante a verdade para n - 1, valida-se o todo", ["Obrigando o uso de números primos","Limitando as funções a loops for"], "A indução matemática é a base teórica que assegura a exatidão e terminação de rotinas recursivas."),
          t("Como se chama a fase recursiva que divide o problema e chama o método novamente?", ["passo indutivo","passo recursivo"], "O passo indutivo aproxima o cálculo da âncora final.", "return n * Fatorial(n - 1); // ____ indutivo"),
          g("Complete o argumento da chamada recursiva garantindo convergência para a base zero.", ["n - 1"], "Subtrair 1 garante que a contagem convirja para o término.", "return n + Somar(____);"),
          o("Ordene a mecânica do passo indutivo em uma chamada recursiva.", ["Avaliar que a condição de caso-base não foi atendida","Calcular o subproblema com parâmetros reduzidos (ex: n - 1)","Empilhar nova invocação do método passando os parâmetros reduzidos","Aguardar o retorno para sintetizar o resultado da etapa atual"], "A redução sistemática conduz o algoritmo inevitavelmente ao encerramento gracioso."),
          p("Associe a operação recursiva ao seu mecanismo de redução.", [["Subtração unitária (n - 1)","Redução linear clássica para números naturais"],["Divisão inteira (n / 2)","Redução logarítmica rápida para algoritmos binários"],["Navegação para no.Proximo","Redução sequencial em listas encadeadas"],["Recursão em árvores (esq e dir)","Divisão e conquista em ramificações estruturadas"]], "Garantir convergência matemática é o selo de qualidade de algoritmos recursivos profissionais.")
        ]
      },
      {
        id: "csharp-c05-u7-l3-fibonacci-multiplos-casos-base",
        title: "Múltiplos casos-base: a árvore de Fibonacci e ramificações",
        subtitle: "Recursão e caso-base · Por que recursão binária ingênua causa explosão exponencial O(2ⁿ)",
        theory: "Algoritmos com múltiplos casos-base emergem quando a relação recursiva exige mais de um ponto de partida. A sequência de Fibonacci é o exemplo emblemático: F(0) = 0 e F(1) = 1. Sem otimizações, chamar Fib(n - 1) + Fib(n - 2) gera uma árvore de chamadas com explosão exponencial O(2ⁿ) e recalcula os mesmos nós.",
        questions: [
          q("Quantos casos-base a sequência de Fibonacci exige em sua definição recursiva elementar?", "Dois casos-base essenciais: n == 0 (devolve 0) e n == 1 (devolve 1)", ["Apenas um caso-base em n == 0","Três casos-base","Nenhum"], "Como cada termo depende dos dois imediatamente anteriores, são necessárias duas sementes de ancoragem."),
          q("Qual é a complexidade de tempo da implementação recursiva ingênua de Fibonacci no C#?", "O(2ⁿ) - tempo exponencial", ["O(n) - tempo linear","O(n log n)","O(1)"], "A árvore de chamadas dobra de tamanho a cada nível de profundidade, recalculando subproblemas repetidos."),
          q("Qual técnica armazena em cache os resultados parciais de chamadas recursivas para torná-las O(n)?", "Memoização (Memoization) através de um dicionário ou array de cache", ["Compilação Ahead-of-Time","Sincronização de threads"], "Memoização guarda f(n) na primeira vez que é calculado, devolvendo o cache nas chamadas subsequentes."),
          q("Por que a recursão ramificada em árvores binárias (ex: nós esquerdo e direito) não sofre a mesma ineficiência de Fibonacci?", "Porque em árvores os nós são únicos e distintos, não havendo recálculo do mesmo nó", ["Porque árvores usam memória estática","Porque árvores desativam a pilha"], "Em Fibonacci o mesmo número é calculado milhares de vezes; em árvores, cada nó é visitado exatamente uma vez."),
          t("Qual termo em ciência da computação designa a técnica de guardar resultados recursivos em cache?", ["memoizacao","memoização","memoization"], "Memoização elimina o retrabalho em subproblemas sobrepostos.", "Técnica conhecida como ____."),
          g("Complete o segundo caso-base de Fibonacci para a entrada n igual a 1.", ["1"], "F(1) devolve 1 como valor de parada.", "if (n == 0) return 0;\nif (n == 1) return ____;"),
          o("Ordene a estrutura de um método recursivo com memoização em C#.", ["Verificar se a resposta para n já reside no dicionário de cache","Se estiver em cache, retornar o valor salvo imediatamente sem recursão","Se não estiver, calcular o resultado combinando as chamadas recursivas","Salvar o resultado no cache antes de devolvê-lo ao chamador"], "A memoização transforma a complexidade exponencial O(2ⁿ) em tempo linear O(n)."),
          p("Associe a abordagem de Fibonacci ao seu perfil de desempenho.", [["Recursão ingênua Fib(n-1) + Fib(n-2)","Exponencial O(2ⁿ): paralisa a máquina para n > 45"],["Recursão com memoização (cache)","Linear O(n): rápida e calcula cada termo uma só vez"],["Iteração com duas variáveis","Linear O(n) e memória O(1) na pilha"],["Fórmula fechada de Binet","Tempo O(1) com precisão limitada por ponto flutuante"]], "Identificar subproblemas sobrepostos orienta a escolha entre memoização ou laço plano.")
        ]
      },
      {
        id: "csharp-c05-u7-l4-recursao-de-cauda-e-clr",
        title: "Recursão de cauda (Tail Recursion) e a CLR do .NET",
        subtitle: "Recursão e caso-base · A instrução IL tailcall e as garantias do JIT x64",
        theory: "Uma função possui recursão de cauda quando a chamada recursiva é o ato final absoluto do método, devolvendo seu resultado diretamente sem operações pendentes. No .NET, embora o compilador C# não emita automaticamente o prefixo tail. no IL, o compilador JIT x64 moderno pode otimizar certas chamadas de cauda em loops.",
        questions: [
          q("O que caracteriza rigorosamente uma chamada com recursão de cauda (tail call)?", "A auto-chamada é a última operação realizada pelo método, sem nenhum cálculo pendente pós-retorno", ["O método não tem parâmetros","O método fica no fim do arquivo"], "Em chamadas de cauda pura, o método simplesmente repassa o valor obtido do filho sem nenhuma operação residual."),
          q("Por que a instrução return n * Fatorial(n - 1); NÃO é recursão de cauda?", "Porque após a chamada recursiva retornar, ainda resta a multiplicação por n a ser executada", ["Porque fatorial não aceita cauda","Porque o operador * é assíncrono"], "O método não pode descartar seu frame porque precisa do resultado para concluir a multiplicação."),
          q("Como se reescreve uma função para formato de cauda utilizando um parâmetro acumulador?", "Passa-se o resultado parcial no parâmetro: return FatorialCauda(n - 1, n * acumulador);", ["Cria-se uma variável global","Usa-se out var"], "O acumulador transporta a conta pronta, tornando o retorno da chamada o retorno definitivo da função."),
          q("O desenvolvedor C# pode confiar que a CLR sempre eliminará frames de cauda em 100% dos ambientes?", "Não, porque a otimização de cauda pelo JIT depende da arquitetura (x64/ARM), flags e depurador", ["Sim, a especificação C# garante TCO obrigatório","Apenas no Windows 98"], "Ao contrário de linguagens como F# ou Scheme, C# não oferece garantia contratual de Tail Call Elimination no padrão."),
          t("Qual instrução em Intermediate Language (IL) do .NET solicita reaproveitamento de stack frame?", ["tail.","tailcall","tail"], "A instrução de prefixo tail. sinaliza a intenção de otimizar a cauda.", "Prefixo de instrução IL: ____"),
          g("Complete a chamada de cauda passando o produto acumulado para a próxima etapa.", ["n * acumulador"], "O acumulador recebe a conta antes da invocação final.", "return FatorialCauda(n - 1, ____);"),
          o("Ordene a evolução do cálculo de fatorial em cauda com acumulador.", ["Invocação inicial com n = 4 e acumulador = 1","Verifica caso-base n <= 1; se falso, multiplica acumulador por n","Chama FatorialCauda(3, 4) repassando o acumulador","Atinge n = 1 e devolve o acumulador diretamente sem desempilhamento complexo"], "O acumulador substitui a fase de unwinding da pilha por propagação progressiva."),
          p("Associe a forma recursiva à sua dependência de pilha.", [["return n + Soma(n - 1);","Recursão normal: soma pendente impede descarte do frame"],["return SomaCauda(n - 1, acc + n);","Recursão de cauda: resultado da chamada é o valor final"],["Compilador F#","Garante eliminação estrita de chamadas de cauda"],["Compilador C# Roslyn","Não emite o prefixo tail. de forma proativa por padrão"]], "Compreender a postura do JIT do .NET sobre TCO evita suposições infundadas sobre consumo de stack.")
        ]
      },
      {
        id: "csharp-c05-u7-l5-recursao-vs-iteracao-dotnet",
        title: "Recursão vs iteração no ecossistema .NET",
        subtitle: "Recursão e caso-base · Medindo alocação de stack frames e adotando laços eficientes",
        theory: "Qualquer algoritmo recursivo pode ser transformado em iteração plana, usando a classe Stack<T> no heap se for preciso simular a pilha de execução. Em C#, laços imperativos (for, while, foreach) têm consumo de pilha constante O(1), sendo mandatórios para operações lineares profundas sob alta carga.",
        questions: [
          q("Qual é a grande vantagem computacional dos laços iterativos sobre a recursão no .NET?", "Consumo de memória de pilha O(1) constante e imunidade absoluta contra StackOverflowException", ["Iteração aceita tipos genéricos melhores","Laços for desativam o garbage collector"], "Loops reaproveitam as mesmas variáveis locais na pilha sem acumular frames sucessivos."),
          q("Qual classe da biblioteca padrão System.Collections.Generic simula a call stack na versão iterativa?", "Stack<T>", ["Queue<T>","List<T>","HashSet<T>"], "A classe Stack<T> opera com política LIFO na memória heap, contornando os limites rígidos da call stack da thread."),
          q("Em quais cenários a elegância de métodos recursivos supera as vantagens da iteração?", "Ao processar árvores (como sintaxe de código Roslyn, JSON e XML) e algoritmos de divisão e conquista", ["Em laços de leitura de streaming de vídeo","Ao iterar arrays lineares simples"], "Estruturas ramificadas possuem definição recursiva intrínseca, tornando o código exponencialmente mais legível."),
          q("Qual é o tamanho padrão aproximado da call stack reservada para cada thread em processos .NET no Windows?", "Aproximadamente 1 MB por thread", ["100 MB","1 GB","64 KB"], "Com 1 MB de pilha, algumas milhares de chamadas aninhadas com muitos parâmetros esgotam todo o espaço."),
          t("Qual classe de coleção genérica simula a mecânica de pilha LIFO na versão iterativa?", ["Stack<T>","Stack"], "Stack<T> replica o comportamento de empilhamento de frames no heap.", "____<No> pilha = new Stack<No>();"),
          g("Complete o laço iterativo que processa elementos enquanto a pilha contiver itens.", ["pilha.Count > 0","pilha.Any()"], "O laço itera enquanto houver nós pendentes de visita.", "while (____) { var atual = pilha.Pop(); }"),
          o("Ordene os critérios para escolher entre recursão ou iteração em um projeto .NET.", ["Avaliar a estrutura dos dados (linear vs ramificada em árvore)","Estimar a profundidade máxima concebível em produção","Se a profundidade puder atingir milhares de níveis, adotar iteração ou Stack<T> no heap","Se a profundidade for rasa (ex: profundidade logarítmica de árvore), manter a elegância recursiva"], "A decisão madura de engenharia de software harmoniza legibilidade e robustez operacional."),
          p("Associe o padrão de repetição ao seu perfil de memória na thread.", [["Laço while / for plano","Memória de pilha O(1): zero risco de estouro da thread"],["Recursão profunda em linha","Risco crítico de StackOverflowException por acúmulo de frames"],["Navegação em árvore binária balanceada","Profundidade O(log n): segura na pilha comum"],["Pilha explícita Stack<T> no heap","Escala para milhões de nós suportada pela memória RAM total"]], "Dominar a migração entre recursão e iteração blinda sistemas críticos contra quedas de processo.")
        ]
      }
    ],
    8: [
      {
        id: "csharp-c05-u8-l1-delegates-func-e-action",
        title: "Delegates universais: Func<T> e Action<T>",
        subtitle: "Composição de funções · Encapsulando métodos como objetos invocáveis de primeira classe",
        theory: "No .NET, delegates atuam como ponteiros de função fortemente tipados e seguros. A biblioteca padrão consagra Action (para métodos com retorno void) e Func (para funções que retornam um valor, onde o último parâmetro genérico especifica o tipo do retorno), permitindo passar métodos como argumentos.",
        questions: [
          q("Qual é a diferença fundamental entre a família de delegates Action e a família Func em C#?", "Action representa métodos que retornam void; Func representa métodos que retornam um valor", ["Action só aceita inteiros; Func aceita strings","Action é assíncrono e Func é síncrono"], "Action<T> executa ações sem retorno; Func<T1, TResult> calcula e devolve um resultado tipado."),
          q("Na declaração Func<int, string, bool> validador;, qual é o tipo de retorno da função?", "bool (o último parâmetro genérico sempre define o tipo de retorno de um Func)", ["int","string","void"], "Por convenção universal da BCL, o último tipo em Func<...> indica o tipo do resultado devolvido."),
          q("Qual é a assinatura de um delegate que aceita um int e não retorna nada (retorno void)?", "Action<int>", ["Func<int, void>","Action<int, void>","void<int>"], "Como void não pode ser usado como argumento de tipo genérico, utiliza-se a família Action."),
          q("O que caracteriza o suporte a \"métodos como cidadãos de primeira classe\" proporcionado por delegates?", "A capacidade de armazenar métodos em variáveis, passá-los como argumentos e retorná-los de outros métodos", ["Fazer com que métodos compilem antes das classes","Permitir métodos sem nome"], "Delegates transformam blocos de lógica computacional em valores manipuláveis pelo programa."),
          t("Qual delegate genérico da BCL representa uma função que recebe um double e devolve um int?", ["Func<double, int>"], "Em Func, o último tipo é o retorno da função.", "____ conversor = d => (int)d;"),
          g("Complete o tipo do delegate que executa uma ação de log recebendo uma mensagem de texto sem retorno.", ["Action<string>"], "Action<string> modela procedimentos com parâmetro textual sem retorno.", "____ logger = msg => Console.WriteLine(msg);"),
          o("Ordene as etapas para declarar e invocar um delegate Func em C#.", ["Declarar a variável tipada com a assinatura Func<int, int>","Atribuir um método compatível ou expressão lambda à variável","Invocar a função usando a sintaxe f(10) ou f.Invoke(10)","Receber e utilizar o resultado do cálculo devolvido"], "Delegates combinam tipagem rigorosa na compilação com flexibilidade dinâmica na execução."),
          p("Associe o delegate genérico à sua respectiva assinatura de método.", [["Action","void Metodo() sem parâmetros"],["Action<string>","void Metodo(string s) recebendo texto"],["Func<int, int>","int Metodo(int n) recebendo e retornando inteiro"],["Func<bool>","bool Metodo() sem parâmetros, retornando booleano"]], "Func e Action formam o alicerce de toda a programação funcional moderna em C# e LINQ.")
        ]
      },
      {
        id: "csharp-c05-u8-l2-passando-metodos-como-argumentos",
        title: "Funções de alta ordem: métodos como parâmetros",
        subtitle: "Composição de funções · Injetando algoritmos e comportamentos personalizados em métodos",
        theory: "Funções de alta ordem (higher-order functions) são métodos que aceitam outros métodos como argumentos ou que retornam métodos como resultado. No C#, ao aceitar parâmetros do tipo Func<T, bool> (predicados) ou Action<T>, um método desacopla a mecânica de iteração das regras de negócio aplicadas.",
        questions: [
          q("O que caracteriza formalmente uma Função de Alta Ordem (Higher-Order Function)?", "Um método que recebe uma ou mais funções como argumento ou retorna uma função como resultado", ["Um método com mais de dez parâmetros","Um método que só roda com privilégios de administrador"], "Funções de alta ordem tratam lógica computacional como dado dinamicamente injetável."),
          q("Qual método célebre da biblioteca LINQ do .NET é um exemplo clássico de função de alta ordem?", "Where (recebe um Func<T, bool> para filtrar elementos)", ["ToString","GetType","Equals"], "Where, Select, Any, All e First são todas funções de alta ordem que recebem lambdas de processamento."),
          q("Qual é o benefício de aceitar um Func<int, bool> criterio em um método de busca customizado?", "Permite que quem invoca o método determine livremente a regra de seleção sem alterar a lógica de busca", ["Aumenta a velocidade de compilação da classe","Impede valores nulos"], "Desacopla a infraestrutura de navegação das regras de negócio voláteis do domínio."),
          q("Qual sintaxe concisa permite passar um método existente como argumento sem escrever uma lambda?", "Method Group (referência direta pelo nome do método, ex: lista.Where(EhValido))", ["Reflection Invoke","Dynamic Casting"], "Passar o grupo de métodos diretamente pelo nome delega a chamada sem a verbosidade de x => EhValido(x)."),
          t("Como se chama a sintaxe concisa que passa o método diretamente pelo nome sem criar lambda explícita?", ["method group","Method Group","grupo de metodos"], "Method Group vincula o identificador do método ao delegate.", "numeros.Where(____); // passando o método EhPar diretamente"),
          g("Complete a assinatura da função de alta ordem para aceitar o predicado de filtragem.", ["Func<int, bool>"], "Func<int, bool> aceita funções que avaliam inteiros e devolvem booleano.", "public List<int> Filtrar(List<int> dados, ____ criterio) { }"),
          o("Ordene os passos para implementar e consumir uma função de alta ordem em C#.", ["Declarar o método utilitário recebendo um parâmetro do tipo Func<T, R>","Implementar o laço interno invocando o delegate para cada item","No chamador, invocar o método passando uma expressão lambda com a regra","Processar o resultado retornado pela função de alta ordem"], "A injeção de comportamento torna rotinas reaproveitáveis para dezenas de finalidades distintas."),
          p("Associe a assinatura ao papel funcional desempenhado.", [["Func<T, bool> predicado","Testa uma condição lógica e decide inclusão (filtro)"],["Func<T, R> transformador","Mapeia e converte o dado de um tipo para outro"],["Action<T> consumidor","Executa uma ação ou efeito colateral sobre o item"],["Comparison<T> comparador","Determina a ordem relativa entre dois elementos"]], "Funções de alta ordem são a base de abstrações expressivas e manuteníveis em C#.")
        ]
      },
      {
        id: "csharp-c05-u8-l3-pipeline-e-encadeamento-funcoes",
        title: "Encadeamento de transformações e pipelines funcionais",
        subtitle: "Composição de funções · Construindo pipelines de dados declarativos com métodos fluentes",
        theory: "A composição de funções encadeia operações sequenciais onde a saída de uma transformação alimenta diretamente a entrada da seguinte (f(g(x))). No C#, métodos de extensão viabilizam pipelines fluentes e legíveis da esquerda para a direita, evitando aninhamentos ilegíveis de chamadas aninhadas.",
        questions: [
          q("Qual é o estilo arquitetural onde operações são encadeadas para processar dados em sequência?", "Pipeline de dados funcional (Data Pipeline)", ["Programação orientada a eventos","Arquitetura de microsserviços"], "Pipelines estruturam o fluxo em etapas claras: Entrada -> Filtro -> Mapeamento -> Agregação -> Saída."),
          q("Por que a notação encadeada dados.Filtrar().Mapear().Ordenar() é superior a Ordenar(Mapear(Filtrar(dados)))?", "Lê-se naturalmente na ordem cronológica de execução (da esquerda para a direita)", ["Executa em tempo O(1)","Usa menos memória RAM"], "A leitura fluente segue o fluxo mental de transformação dos dados sem aninhamentos confusos."),
          q("Como o C# permite que classes externas recebam métodos que se conectam em cadeias fluentes?", "Através de métodos de extensão (extension methods) estáticos declarados com this", ["Através de ponteiros nativos de C","Usando tipos dynamic"], "Métodos de extensão habilitam a sintaxe fluente x.Transformar() sobre qualquer tipo existente."),
          q("Como compor duas funções puras f e g manualmente para que h(x) execute f(g(x))?", "Func<T, R2> h = x => f(g(x));", ["Func<T, R2> h = f + g;","Func<T, R2> h = f * g;"], "A composição matemática aplica a função interna g primeiro e alimenta a externa f com o resultado."),
          t("Qual símbolo de pontuação conecta os métodos consecutivamente em uma chamada fluente?", [".","ponto"], "O ponto encadeia as chamadas na API fluente.", "var res = dados.Filtrar()____Mapear()____Ordenar();"),
          g("Complete a composição de funções aplicando g ao argumento x e depois f ao resultado.", ["f(g(x))"], "A composição clássica aninha a execução das transformações.", "Func<int, int> h = x => ____;"),
          o("Ordene as etapas conceituais de um pipeline de transformação de dados em lote.", ["Fonte de dados bruta é aberta para leitura","Etapa de filtragem descarta registros inválidos","Etapa de projeção transforma e sanitiza campos necessários","Etapa de ordenação organiza a sequência","Etapa terminal de coleta entrega o resultado estruturado"], "Pipelines lineares transformam complexidade algorítmica em etapas simples e testáveis."),
          p("Associe a operação matemática à sintaxe em C# correspondente.", [["Composição matemática f(g(x))","x => f(g(x))"],["Pipeline fluente sequencial","dado.TransformarA().TransformarB()"],["Operador de encadeamento nulo","objeto?.Propriedade?.Metodo()"],["Operador de coalescência nula","valor ?? valorAlternativo"]], "Pipelines funcionais conferem máxima legibilidade e facilidade de manutenção ao código.")
        ]
      },
      {
        id: "csharp-c05-u8-l4-delegates-multicast-e-eventos",
        title: "Delegates Multicast e a fundação de eventos",
        subtitle: "Composição de funções · Combinando múltiplos ouvintes com operadores + e +=",
        theory: "No .NET, todo delegate herda de System.MulticastDelegate, permitindo encadear múltiplos métodos em uma única variável invocável. Os operadores + e += combinam delegates criando uma lista de invocação ordenada, enquanto - e -= desregistram ouvintes. Esse mecanismo é o alicerce do sistema de eventos do C#.",
        questions: [
          q("O que acontece ao invocar um delegate multicast que contém três métodos registrados?", "Os três métodos são invocados sequencialmente na ordem exata em que foram registrados", ["Apenas o último método registrado é executado","Os métodos rodam em threads simultâneas"], "O delegate percorre sua lista de invocação interna (invocation list) chamando cada método da cadeia."),
          q("Se um delegate multicast retornar um valor (ex: Func<int>), qual resultado é devolvido ao chamador?", "O valor retornado pelo último método da lista de invocação; os retornos anteriores são descartados", ["A soma de todos os retornos","Um array com todos os resultados"], "Por essa razão, delegates multicast são utilizados primordialmente com tipos Action (retorno void)."),
          q("Qual operador em C# registra um novo método ou ouvinte em um delegate ou evento?", "+= (operador de adição e atribuição)", ["|=","&=",":="], "O operador += anexa o método ao final da lista de invocação do delegate com facilidade."),
          q("Qual método da classe Delegate permite inspecionar todos os métodos registrados na cadeia?", "meuDelegate.GetInvocationList()", ["meuDelegate.GetAll()","meuDelegate.Listeners()","meuDelegate.List()"], "GetInvocationList devolve um array Delegate[] contendo todas as funções associadas à variável."),
          t("Qual operador de dois caracteres adiciona um novo ouvinte a um delegate multicast em C#?", ["+="], "+= registra o novo método na cadeia de ouvintes.", "notificador ____ EnviarEmail;"),
          g("Complete o desregistro do ouvinte removendo o método da cadeia com o operador apropriado.", ["-="], "-= remove o método especificado da lista de invocação.", "notificador ____ EnviarEmail;"),
          o("Ordene a execução de um delegate multicast com múltiplos ouvintes cadastrados.", ["Invocação da variável do delegate pelo emissor","Primeiro método registrado (ex: GravarLog) é executado","Segundo método registrado (ex: EnviarSms) é executado em seguida","Terceiro método registrado (ex: AtualizarTela) é executado finalizando a cadeia"], "A lista de invocação garante execução estritamente sequencial e ordenada dos ouvintes."),
          p("Associe o operador à sua função em delegates multicast.", [["d += Metodo;","Adiciona o método ao final da lista de invocação"],["d -= Metodo;","Remove a primeira ocorrência do método na lista"],["d();","Dispara a execução sequencial de todos os ouvintes"],["d?.Invoke();","Disparo seguro que não lança NullReferenceException se vazio"]], "Delegates multicast estruturam o desacoplamento de eventos e notificações no .NET.")
        ]
      },
      {
        id: "csharp-c05-u8-l5-currying-e-aplicacao-parcial",
        title: "Currying e aplicação parcial de funções em C#",
        subtitle: "Composição de funções · Decompondo funções multiparâmetro em cadeias unárias",
        theory: "Currying é a técnica funcional de transformar uma função que recebe múltiplos argumentos em uma sequência de funções que recebem um único argumento por vez (f(a, b) vira a => b => a + b). Isso viabiliza a aplicação parcial, permitindo fixar parâmetros iniciais e gerar funções especializadas reutilizáveis.",
        questions: [
          q("O que caracteriza a técnica de Currying na programação funcional com C#?", "Transformar uma função de múltiplos parâmetros em uma cadeia de funções de parâmetro único", ["Converter números em texto","Dividir strings com split"], "A função curried aceita o primeiro dado e retorna uma nova função que aguarda o próximo dado."),
          q("Como expressar a soma curried de dois inteiros utilizando a sintaxe de lambdas em C#?", "Func<int, Func<int, int>> somar = a => b => a + b;", ["Func<int, int, int> somar = (a, b) => a + b;","Func somar = a + b;"], "A função externa recebe a e devolve uma função interna que recebe b e produz a soma a + b."),
          q("O que é a aplicação parcial (partial application) de uma função?", "Fixar um ou mais argumentos iniciais de uma função gerando uma nova função com menos parâmetros", ["Executar apenas metade do código do método","Interromper o método com exceção"], "Fixar parâmetros (como uma taxa de imposto ou conexão) especializa a rotina para reutilização."),
          q("Qual é uma aplicação prática de aplicação parcial em sistemas corporativos?", "Criar loggers ou validadores pré-configurados (ex: var logErro = CriarLogger(\"ERRO\");)", ["Substituir o coletor de lixo","Criar arrays multidimensionais"], "Especializar funções utilitárias evita passar configurações repetidas a cada chamada."),
          t("Qual é o tipo de retorno da função externa em uma soma curried Func<int, ____>?", ["Func<int, int>"], "A função externa retorna outra função que aguarda o segundo parâmetro.", "Func<int, ____> somarCurried = a => b => a + b;"),
          g("Complete a aplicação parcial fixando o multiplicador em 10 para criar a função multiplicaPor10.", ["multiplicar(10)"], "Chamar a função curried com o primeiro argumento gera a função especializada.", "var multiplicaPor10 = ____;"),
          o("Ordene as etapas da aplicação parcial de uma taxa em um cálculo financeiro.", ["Definir a função curried Func<double, Func<double, double>> calcularImposto","Fixar a taxa de 15% invocando var impostoPadrao = calcularImposto(0.15)","Reaproveitar a nova função gerada passando apenas o valor base impostoPadrao(1000)","Obter o cálculo especializado de 150 sem precisar reenviar a taxa"], "A especialização funcional produz APIs concisas, modulares e altamente combináveis."),
          p("Associe a assinatura ao conceito funcional correspondente.", [["(a, b) => a + b","Função não-curried convencional com múltiplos parâmetros"],["a => b => a + b","Função curried decomposta em funções unárias encadeadas"],["var f = curried(5);","Aplicação parcial gerando função especializada pré-fixada"],["f(10);","Execução final entregando o resultado da computação"]], "Currying e aplicação parcial enriquecem o repertório de design funcional no C# moderno.")
        ]
      }
    ]
  });
})();
