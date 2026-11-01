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
  const chId = "csharp-c03";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "csharp-c03-u1-l2",
        title: "Value Types vs Reference Types no .NET",
        subtitle: "Arquitetura de memória · Stack, Heap e semântica de atribuição",
        theory: "No ecossistema .NET e C#, tipos dividem-se em Value Types (alocados diretamente na pilha de execução/stack, contendo o próprio dado) e Reference Types (alocados na heap gerenciada, contendo um ponteiro de endereço). Atribuir um value type copia o valor integral; atribuir um reference type copia apenas o ponteiro.",
        questions: [
          q("Qual é a diferença de atribuição entre um Value Type e um Reference Type em C#?", "Value Types copiam o valor bruto; Reference Types copiam a referência apontando para o mesmo objeto na Heap", ["Reference Types não podem ser alterados","Value Types usam o Garbage Collector"], "Modificar um Value Type copiado não afeta a variável original; já com Reference Types, ambos apontam para os mesmos dados."),
          q("Onde os Value Types locais costumam ser alocados em tempo de execução no CLR?", "Na Stack (pilha de execução rápida da thread)", ["Na Heap gerenciada do GC","No disco rígido"], "A pilha tem desalocação instantânea assim que o escopo do método termina, sem envolver o Garbage Collector."),
          q("Quais tipos primitivos comuns da linguagem C# são classificados como Value Types?", "int, double, bool, char e todas as structs (incluindo DateTime e decimal)", ["string e object","Arrays e delegates"], "string e arrays são classes e, portanto, Reference Types alocados na Heap gerenciada."),
          q("O que acontece na memória ao executar: int b = a; onde a é um int de valor 42?", "Uma nova área de 4 bytes é alocada na Stack contendo a cópia independente do valor 42", ["b passa a apontar para o endereço de a","Ocorre erro de compilação"], "As variáveis a e b tornam-se completamente isoladas na memória."),
          t("Qual região de memória aloca Value Types locais de métodos com alta velocidade?", ["Stack"], "A Stack (pilha) armazena variáveis locais de tipos de valor.", "# regiao de memoria Stack"),
          g("Complete a declaração de cópia por valor de um tipo numérico primitivo:", ["int original = 100;\nint copia = original;"], "Atribuir copia o valor integral diretamente na Stack.", "int original = 100;\nint copia = ____;"),
          o("Ordene as etapas da alocação de memória ao criar um Reference Type (ex: new Cliente()):", ["Reserva de espaço para os dados do objeto na Heap gerenciada pelo CLR","Execução do construtor inicializando os campos do objeto","Alocação de uma variável ponteiro na Stack da thread corrente","Armazenamento do endereço de memória da Heap dentro da variável na Stack"], "Ciclo de instanciação e referência de objetos em C#/.NET."),
          p("Associe o tipo de dado C# à sua classificação fundamental no Common Type System (CTS):", [["int / System.Int32","Value Type alocado na Stack contendo o valor bruto"],["string / System.String","Reference Type imutável armazenado na Heap"],["struct / System.ValueType","Estrutura leve copiada integralmente por valor"],["class / System.Object","Classe tradicional instanciada na Heap via referência"]], "Classificação de tipos no runtime do .NET.")
        ]
      },
      {
        id: "csharp-c03-u1-l3",
        title: "Estruturas (struct) vs Classes (class)",
        subtitle: "Modelagem de domínio · Quando optar por tipos por valor ou por referência",
        theory: "Em C#, a palavra-chave struct declara um tipo de valor, enquanto class declara um tipo de referência. Structs são ideais para dados pequenos, imutáveis e de vida curta (como coordenadas Point, frações ou registros monetários) que não justificam a sobrecarga de alocação de heap nem de coleta de lixo pelo GC.",
        questions: [
          q("Quando as diretrizes da Microsoft recomendam projetar uma struct em vez de uma class?", "Para tipos pequenos (até 16 bytes), lógicos, preferencialmente imutáveis e de ciclo de vida curto", ["Sempre que houver herança complexa","Para armazenar grandes coleções de texto"], "Structs evitam pressão no Garbage Collector ao alocar na Stack de execução."),
          q("Structs em C# suportam herança de outras structs ou classes?", "Não; structs não suportam herança de tipos (exceto herdar de System.ValueType e implementar interfaces)", ["Sim, suportam herança múltipla","Suportam herança apenas de classes"], "A ausência de polimorfismo de herança mantém a representação em memória compacta e fixa."),
          q("O que acontece se uma struct mutável for passada como argumento para um método normal (sem in/ref)?", "O método recebe uma cópia independente; qualquer alteração interna é perdida ao término do método", ["A struct original é modificada","Ocorre exceção em runtime"], "Por ser Value Type, a passagem padrão é sempre por cópia de todos os seus campos."),
          q("Qual modificador introduzido no C# 7.2 força uma struct a ser estritamente imutável?", "readonly struct", ["const struct","static struct"], "readonly struct garante em tempo de compilação que todos os campos sejam somente leitura."),
          t("Qual palavra-chave declara uma estrutura como Value Type leve em C#?", ["struct"], "struct define tipos de dados por valor em C#.", "# palavra chave de Value Type"),
          g("Complete a definição de uma estrutura de coordenadas somente leitura:", ["public readonly struct Ponto {\n    public double X { get; }\n    public double Y { get; }\n}"], "readonly struct garante imutabilidade e otimizações do compilador.", "public readonly ____ Ponto {\n    public double X { get; }\n    public double Y { get; }\n}"),
          o("Ordene os critérios de decisão para escolher struct em vez de class em C#:", ["Verificar se o dado representa conceitualmente um valor único e simples (ex: Moeda, Ponto)","Confirmar que a pegada de memória do tipo não ultrapassa cerca de 16 bytes","Garantir que a estrutura será projetada como imutável (readonly)","Constatar que o tipo não necessita de herança polimórfica de classes"], "Árvore de decisão arquitetural para modelagem de structs no .NET."),
          p("Associe a construção ao seu comportamento na plataforma .NET:", [["public struct Medida","Tipo por valor alocado na Stack e copiado integralmente"],["public class Medida","Tipo por referência instanciado na Heap gerenciada"],["readonly struct","Estrutura imutável protegida contra mutações pelo compilador"],["ref struct","Estrutura estrita de pilha que nunca pode sofrer boxing na Heap"]], "Comparativo de estruturas e classes no design de tipos em C#.")
        ]
      },
      {
        id: "csharp-c03-u1-l4",
        title: "Inferência de tipos com a palavra-chave var",
        subtitle: "Tipagem estática · var não é dinâmico; é inferência forte em tempo de compilação",
        theory: "A palavra-chave var em C# introduz inferência de tipos pelo compilador: o compilador descobre o tipo estático exato da variável a partir da expressão de inicialização no lado direito. var é fortemente tipado; a variável não aceita tipos diferentes após sua declaração e preserva segurança total.",
        questions: [
          q("A palavra-chave var em C# torna uma variável dinamicamente tipada?", "Não; var é estritamente estática: o compilador infere e fixa o tipo real em tempo de compilação", ["Sim, ela funciona como o var do JavaScript clássico","Sim, ela permite atribuir strings após inteiros"], "O bytecode IL gerado é 100% idêntico ao da declaração com o nome explícito do tipo."),
          q("O que acontece se tentarmos compilar: var x; sem fornecer uma expressão de inicialização?", "Erro de compilação: variáveis declaradas com var exigem inicialização imediata para inferir o tipo", ["A variável é inicializada como null","A variável recebe o tipo object"], "Sem um valor inicial à direita, o compilador não tem como determinar o tipo estático."),
          q("Qual é a recomendação oficial de estilo da Microsoft para o uso de var?", "Usar var quando o tipo for óbvio pela expressão à direita (ex: new Cliente()) para reduzir redundância", ["Nunca usar var em código de produção","Usar var apenas para números"], "Escrever var c = new Cliente(); é mais limpo que repetir Cliente c = new Cliente();."),
          q("O que acontece se tentarmos compilar: var total = 10; total = \"dez\";?", "Erro de compilação: cannot implicitly convert type \"string\" to \"int\"", ["O C# converte a variável para string","O programa roda e imprime \"dez\""], "Como total foi inferida como int, o compilador rejeita atribuições de qualquer outro tipo incompatível."),
          t("Qual palavra-chave instrui o compilador C# a inferir o tipo estático da variável local?", ["var"], "var ativa a inferência de tipos em variáveis locais.", "# inferencia de tipos estatica"),
          g("Complete a instanciação concisa com inferência de tipo:", ["var transacao = new TransacaoFinanceira();"], "var elimina a repetição do nome do tipo à esquerda.", "____ transacao = new TransacaoFinanceira();"),
          o("Ordene os passos do compilador Roslyn ao processar a instrução var x = 50L;:", ["Analisar a expressão literal do lado direito da atribuição (50L)","Constatar que o sufixo L identifica univocamente o tipo primitivo long (Int64)","Substituir internamente o token var pelo tipo estático definitivo long","Emitir as instruções de bytecode IL com tipagem forte idêntica a long x = 50L;"], "Etapas de resolução da inferência de tipos pelo compilador C#."),
          p("Associe a declaração ao tipo estático inferido pelo compilador C#:", [["var a = 42;","Inferido estaticamente como int (System.Int32)"],["var b = \"Lincode\";","Inferido estaticamente como string (System.String)"],["var c = 19.99m;","Inferido estaticamente como decimal (System.Decimal)"],["var d = true;","Inferido estaticamente como bool (System.Boolean)"]], "Inferência estática de tipos primitivos em C#.")
        ]
      },
      {
        id: "csharp-c03-u1-l5",
        title: "Constantes const e modificadores readonly",
        subtitle: "Imutabilidade · Tempo de compilação vs tempo de execução",
        theory: "Em C#, const declara valores constantes imutáveis conhecidos em tempo de compilação, substituídos como literais diretos no bytecode. Por outro lado, readonly permite inicializar a variável em tempo de execução (inclusive no construtor da classe ou struct), oferecendo flexibilidade com imutabilidade estrita.",
        questions: [
          q("Qual é a diferença fundamental entre const e readonly em C#?", "const é avaliado em tempo de compilação; readonly é atribuído em tempo de execução (ex: no construtor)", ["readonly só aceita números inteiros","const pode ser modificado uma vez em runtime"], "const é cozido diretamente nas chamadas dos assemblies; readonly suporta valores calculados na inicialização."),
          q("Quais tipos de dados podem ser declarados com o modificador const em C#?", "Tipos primitivos embutidos (int, double, bool, char, string, etc.) e valores enum", ["Qualquer classe complexa","Arrays e listas"], "Classes complexas que exigem alocação com new não podem ser const, com exceção de referências nulas."),
          q("O que acontece se uma biblioteca alterar o valor de uma public const e outra biblioteca consumidora não for recompilada?", "A consumidora continuará usando o valor antigo gravado no seu próprio assembly em tempo de compilação", ["A aplicação quebra com MissingFieldException","O valor é atualizado automaticamente"], "Problema clássico de versionamento; para constantes públicas de APIs compartilhadas, deve-se preferir static readonly."),
          q("Onde um campo marcado com o modificador readonly pode receber valor?", "Diretamente na sua linha de declaração ou dentro de qualquer construtor daquela classe/struct", ["Em qualquer método público","Apenas no método Main"], "Após a conclusão do construtor, o CLR proíbe qualquer alteração no valor do campo readonly."),
          t("Qual palavra-chave define valores imutáveis resolvidos estritamente em tempo de compilação em C#?", ["const"], "const define constantes estáticas de tempo de compilação.", "# constante de compilacao"),
          g("Complete a declaração de constante de limite máximo de conexões:", ["public const int MaximoConexoes = 100;"], "const cria uma constante imutável de compilação.", "public ____ int MaximoConexoes = 100;"),
          o("Ordene os momentos em que constantes e campos readonly recebem seus valores:", ["Resolução de valores literais de const pelo compilador Roslyn no build","Carregamento da classe na memória CLR inicializando campos static readonly","Execução do construtor de instância atribuindo valores aos campos readonly do objeto","Congelamento do campo readonly contra qualquer modificação subsequente"], "Linha do tempo de inicialização de imutabilidade em C#/.NET."),
          p("Associe o modificador à sua característica operacional no .NET:", [["const","Avaliado no build e embutido como literal no assembly consumidor"],["readonly","Inicializado na declaração ou construtor e imutável após a criação"],["static readonly","Constante calculada em runtime compartilhada por toda a classe"],["init (C# 9+)","Acessador de propriedade que permite escrita apenas na inicialização"]], "Estratégias de imutabilidade e proteção de campos em C#.")
        ]
      }
    ],
    2: [
      {
        id: "csharp-c03-u2-l1",
        title: "Tipos integrais no C#: com sinal e sem sinal",
        subtitle: "Larguras de bits · byte, sbyte, short, ushort, int, uint, long e ulong",
        theory: "C# fornece uma suíte completa de tipos inteiros com sinal (sbyte, short, int, long) e sem sinal (byte, ushort, uint, ulong). O tipo byte em C# é sem sinal (0 a 255) por padrão, diferindo de Java onde byte possui sinal (-128 a 127). Cada palavra-chave é um alias para um tipo formal do namespace System.",
        questions: [
          q("Qual é a faixa de valores representável pelo tipo primitivo byte em C#?", "De 0 até 255 (pois byte em C# é não-sinalizado por padrão)", ["De -128 até 127","De 0 até 65535"], "Em C#, inteiros de 8 bits com sinal utilizam a palavra-chave específica sbyte."),
          q("Qual tipo da biblioteca .NET (BCL) corresponde ao tipo primitivo int de 32 bits no C#?", "System.Int32", ["System.Int16","System.Int64"], "int é puramente um alias da linguagem para a struct System.Int32 do runtime do .NET."),
          q("Qual sufixo literal deve ser adicionado a um número para forçar o tipo ulong (64 bits sem sinal)?", "UL ou ul (ex: 5000UL)", ["L","U"], "O prefixo/sufixo U denota unsigned e L denota long."),
          q("Para que servem os tipos inteiros sem sinal (uint, ulong, ushort) na engenharia de software?", "Interoperabilidade com APIs nativas do Windows/C++, criptografia, protocolos de rede e manipulação de bits", ["Para rodar mais rápido em bancos de dados","Para substituir o tipo string"], "Quando valores negativos não têm sentido e o alcance positivo precisa ser duplicado no mesmo espaço."),
          t("Qual tipo inteiro de 8 bits COM sinal é declarado em C#?", ["sbyte"], "sbyte representa inteiros sinalizados de -128 a 127.", "# inteiro de 8 bits com sinal"),
          g("Complete a declaração do tipo integral padrão de 64 bits em C#:", ["long carimboData = 1700000000000L;"], "O sufixo L identifica o literal como inteiro de 64 bits.", "____ carimboData = 1700000000000L;"),
          o("Ordene os tipos integrais de C# por sua largura em bits:", ["byte / sbyte: 8 bits de largura em memória","short / ushort: 16 bits de largura em memória","int / uint: 32 bits de largura em memória (padrão de cálculo)","long / ulong: 64 bits de largura para grandezas elevadas"], "Hierarquia dimensional dos tipos inteiros em C#/.NET."),
          p("Associe o alias em C# ao tipo estrutural correspondente no Common Type System (.NET):", [["int","System.Int32 - inteiro de 32 bits com sinal"],["uint","System.UInt32 - inteiro de 32 bits sem sinal"],["long","System.Int64 - inteiro de 64 bits de alta capacidade"],["byte","System.Byte - inteiro de 8 bits sem sinal (0 a 255)"]], "Mapeamento de tipos primitivos de C# para o runtime .NET.")
        ]
      },
      {
        id: "csharp-c03-u2-l2",
        title: "Ponto flutuante binário: float e double",
        subtitle: "Precisão IEEE 754 · Sufixos f e d, valores especiais NaN e Infinity",
        theory: "C# implementa o padrão IEEE 754 através de float (precisão simples de 32 bits, sufixo f obrigatório) e double (precisão dupla de 64 bits, tipo padrão para números decimais literais). Ambos suportam constantes para valores matemáticos especiais como float.NaN, double.PositiveInfinity e double.NegativeInfinity.",
        questions: [
          q("Qual é o tipo padrão adotado pelo compilador C# para literais com ponto como 3.14?", "double (System.Double de 64 bits)", ["float (32 bits)","decimal (128 bits)"], "Qualquer literal decimal sem sufixo é interpretado como double."),
          q("O que acontece se tentarmos compilar: float taxa = 0.05; sem o sufixo f em C#?", "Erro de compilação: cannot implicitly convert type \"double\" to \"float\"", ["O C# converte automaticamente","O valor é arredondado para zero"], "C# exige conversão explícita ou o sufixo f/F para impedir estreitamento (narrowing) silencioso."),
          q("Qual é o resultado da expressão float/double ao calcular: 10.0 / 0.0 em C#?", "double.PositiveInfinity (infinito positivo, sem lançar exceção aritmética)", ["Dispara DivideByZeroException","Retorna zero"], "Diferente de inteiros, o padrão IEEE 754 de ponto flutuante prevê infinitos sem abortar o processo."),
          q("Como testar se o resultado de uma operação fracionária produziu um valor indefinido (NaN)?", "Usando o método estático double.IsNaN(valor) ou float.IsNaN(valor)", ["Comparando com valor == double.NaN","Usando valor is null"], "NaN nunca é igual a nada, nem a si mesmo (NaN == NaN é false segundo o padrão IEEE 754)."),
          t("Qual caractere de sufixo deve ser aposto a um número para tipá-lo como float em C#?", ["f"], "Exemplo: float velocidade = 80.5f.", "# sufixo literal do tipo float"),
          g("Complete a verificação do valor especial indefinido em ponto flutuante:", ["if (double.IsNaN(resultado)) {\n    registrarErro();\n}"], "double.IsNaN identifica valores matemáticos indefinidos.", "if (double.____(resultado)) {\n    registrarErro();\n}"),
          o("Ordene os tipos de ponto flutuante por suas capacidades e precisões decimais:", ["float (32 bits): oferece cerca de 6 a 9 dígitos significativos de precisão","double (64 bits): oferece cerca de 15 a 17 dígitos significativos de precisão","double.PositiveInfinity: saturação superior em divisões por zero positivo","double.NaN: valor representativo de indefinições como 0.0 / 0.0"], "Escala de precisão e estados especiais de ponto flutuante em C#."),
          p("Associe a operação em ponto flutuante ao valor resultante segundo o padrão IEEE 754:", [["1.0 / 0.0","double.PositiveInfinity representando overflow positivo"],["-1.0 / 0.0","double.NegativeInfinity representando overflow negativo"],["0.0 / 0.0","double.NaN representando operação indefinida"],["double.IsInfinity(x)","Método utilitário verificando se o número é infinito"]], "Comportamentos do padrão IEEE 754 na linguagem C#.")
        ]
      },
      {
        id: "csharp-c03-u2-l3",
        title: "O tipo decimal para aplicações financeiras",
        subtitle: "Precisão exata de 128 bits · Base decimal nativa e o sufixo m",
        theory: "Diferente de Java que requer uma classe de objeto externa (BigDecimal), C# possui suporte nativo de primeira classe na linguagem para cálculos financeiros através do tipo de valor decimal (System.Decimal, 128 bits). Ele opera em base 10 com 28-29 dígitos significativos, eliminando dízimas binárias.",
        questions: [
          q("Qual é a principal vantagem de C# em relação a Java no processamento financeiro e monetário?", "Possui o tipo primitivo decimal (128 bits) embutido nativamente na linguagem com operadores aritméticos comuns", ["Possui suporte apenas a inteiros","Não exige compilação"], "No C#, escreve-se decimal total = preco * qtd; com operadores normais, sem precisar invocar .multiply()."),
          q("Qual caractere de sufixo deve ser obrigatoriamente anexado a um literal decimal em C#?", "m ou M (ex: 19.99m)", ["d","f"], "A letra m deriva de monetary (monetário), identificando o tipo System.Decimal."),
          q("Quantos bits o tipo decimal ocupa na memória e qual é sua precisão decimal?", "128 bits (16 bytes), garantindo de 28 a 29 dígitos de precisão exata", ["64 bits e 10 dígitos","256 bits e 50 dígitos"], "Permite processar balanços contábeis, faturamentos e tributos com total fidelidade em centavos."),
          q("Por que o tipo decimal não é usado para coordenadas 3D ou simulações de física de jogos?", "Porque opera em base 10 na CPU por software, sendo consideravelmente mais lento que float acelerado por GPU", ["Porque o tipo decimal não aceita números negativos","Porque o C# proíbe em jogos"], "float e double têm aceleração vetorial direta em hardware; decimal prioriza precisão sobre velocidade bruta."),
          t("Qual caractere de sufixo identifica um literal como decimal monetário em C#?", ["m"], "O sufixo m denota literais do tipo decimal.", "# sufixo literal decimal monetario"),
          g("Complete a declaração do preço financeiro com o sufixo correto:", ["decimal precoUnitario = 49.90m;"], "O sufixo m instrui o compilador a usar o tipo System.Decimal.", "decimal precoUnitario = 49.90____;"),
          o("Ordene os tipos numéricos de C# do mais rápido para o de maior precisão matemática:", ["float (32 bits): altíssima velocidade em GPUs e cálculos de computação gráfica","double (64 bits): padrão do hardware de CPU para cálculos científicos gerais","long (64 bits): aritmética inteira veloz sem arredondamento decimal","decimal (128 bits): precisão estrita em base 10 para faturamento e auditoria fiscal"], "Espectro de desempenho versus exatidão em tipos numéricos no .NET."),
          p("Associe o tipo numérico do C# ao seu caso de uso ideal na arquitetura de sistemas:", [["decimal","Sistemas de faturamento bancário, e-commerce, impostos e folhas de pagamento"],["float","Motores de física de jogos (Unity/Unreal), gráficos 3D e processamento de sensores"],["double","Análise estatística geral, aprendizado de máquina e trigonometria"],["int","Contadores de laços de repetição, paginação e IDs relacionais normais"]], "Diretrizes de seleção de tipos numéricos no desenvolvimento .NET.")
        ]
      },
      {
        id: "csharp-c03-u2-l4",
        title: "Contextos checked e unchecked e overflow aritmético",
        subtitle: "Segurança de cálculo · Detectando estouro de inteiros ou permitindo wraparound",
        theory: "Por padrão de desempenho, operações aritméticas com inteiros em C# rodam em contexto unchecked: caso ocorra estouro (overflow), os bits excedentes são descartados silenciosamente (wraparound). Envolver blocos ou expressões com a palavra-chave checked força o CLR a lançar System.OverflowException ao detectar estouros.",
        questions: [
          q("O que acontece por padrão em C# ao somar int.MaxValue + 1 fora de um bloco checked?", "Ocorre overflow silencioso, e a variável \"dá a volta\" tornando-se int.MinValue (-2.147.483.648)", ["O C# lança OverflowException imediatamente","O valor trava em int.MaxValue"], "Por padrão, o compilador C# prioriza performance de CPU executando em modo unchecked."),
          q("Qual palavra-chave instrui o CLR a validar estouros aritméticos e lançar exceção em caso de overflow?", "checked (ex: checked { int a = int.MaxValue + 1; })", ["safe","validate"], "O contexto checked adiciona instruções IL de verificação aritmética que abortam o cálculo se houver overflow."),
          q("Qual exceção do .NET é disparada quando uma operação em contexto checked ultrapassa o limite do tipo?", "System.OverflowException", ["System.ArithmeticException","System.IndexOutOfRangeException"], "OverflowException alerta imediatamente o sistema sobre a corrupção do cálculo numérico."),
          q("Como configurar um projeto .NET para que todas as operações matemáticas sejam checked por padrão?", "Habilitando a propriedade <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow> no arquivo .csproj", ["Escrevendo checked no topo do arquivo .cs","Instalando um plugin externo"], "Permite auditar a integridade de todos os cálculos do sistema durante testes e homologação."),
          t("Qual palavra-chave do C# ativa a verificação rigorosa de overflow aritmético em um bloco?", ["checked"], "checked garante disparo de OverflowException se o limite estourar.", "# contexto de verificacao de overflow"),
          g("Complete o bloco seguro que impede corrupção aritmética silenciosa:", ["checked {\n    int saldo = saldoAtual + deposito;\n}"], "checked intercepta qualquer estouro do limite de 32 bits.", "____ {\n    int saldo = saldoAtual + deposito;\n}"),
          o("Ordene as reações do sistema a um overflow em int.MaxValue + 1:", ["Avaliação dos operandos de 32 bits na unidade lógica e aritmética (ALU)","Detecção de extrapolação do bit de sinal além do limite de +2.147.483.647","Verificação do contexto: modo checked ativo na instrução corrente","Disparo imediato de System.OverflowException interrompendo o fluxo"], "Mecanismo interno do CLR para contenção de overflow no modo checked."),
          p("Associe o contexto de execução ao seu comportamento na presença de overflow:", [["Contexto unchecked (padrão)","Descarta bits excedentes e aplica wraparound silencioso"],["Contexto checked explícito","Dispara System.OverflowException protegendo integridade"],["checked(expr) inline","Aplica checagem a uma expressão aritmética específica"],["int.MaxValue","Maior número inteiro representável em 32 bits (+2.147.483.647)"]], "Controle de overflow e integridade aritmética em C#.")
        ]
      },
      {
        id: "csharp-c03-u2-l5",
        title: "Literais numéricos: binário (0b), hex (0x) e separadores (_)",
        subtitle: "Expressividade léxica · Máscaras de bits, flags e legibilidade de dígitos",
        theory: "C# oferece suporte expressivo a literais numéricos em diferentes bases: prefixo 0x para hexadecimal e 0b para binário. O sublinhado (_) pode ser utilizado como separador visual de dígitos em qualquer posição numérica (ex: 1_000_000 ou 0b0001_1111), sendo completamente ignorado pelo compilador Roslyn.",
        questions: [
          q("Qual prefixo é utilizado em C# para declarar um literal numérico em formato binário direto?", "0b ou 0B (ex: 0b1010)", ["0x","0bin"], "Literais binários facilitam a criação de máscaras de bits e controle de registradores de hardware."),
          q("Qual prefixo identifica um literal numérico em base hexadecimal em C#?", "0x ou 0X (ex: 0xFF)", ["0h","#"], "Amplamente utilizado para representação de cores, endereços de memória e criptografia."),
          q("Para que serve o caractere de sublinhado (_) posicionado entre dígitos em números no C#?", "Funciona exclusivamente como separador de dígitos para facilitar a leitura humana sem alterar o valor", ["Indica que o número é negativo","Multiplica o número por 10"], "1_000_000 é compilado exatamente como o número inteiro 1000000."),
          q("É permitido colocar o separador de dígitos (_) logo após os prefixos 0x ou 0b no C# moderno?", "Sim; desde o C# 7.2 é válido escrever 0b_0001_0010 ou 0x_FF_A0", ["Não, gera erro de compilação","Apenas em arquivos XML"], "Melhora a formatação de bytes alinhados em pacotes de comunicação e protocolos."),
          t("Qual caractere de pontuação atua como separador visual de dígitos numéricos em C#?", ["_"], "O sublinhado organiza números extensos sem impacto em código.", "# separador de digitos numericos"),
          g("Complete a definição da máscara de bits em formato binário:", ["int mascaraPermissao = 0b0000_1111;"], "0b inicia o literal binário com separadores organizadores.", "int mascaraPermissao = ____0000_1111;"),
          o("Ordene os literais numéricos do menor para o maior valor matemático:", ["0b0000_0010: valor binário equivalente a 2","0b0000_1000: valor binário equivalente a 8","0x0010: valor hexadecimal equivalente a 16","1_000: valor decimal equivalente a 1000"], "Comparação de grandezas numéricas em bases distintas no C#."),
          p("Associe a notação literal ao seu formato de representação numérica:", [["0b1100_0011","Literal binário representando o byte 195"],["0x00FF_CC00","Literal hexadecimal representando cor ou máscara"],["10_000_000L","Literal decimal de 64 bits com separador de milhares"],["0.000_001f","Literal de ponto flutuante float com precisão fracionária"]], "Formatos de representação de literais numéricos no compilador C#.")
        ]
      }
    ],
    3: [
      {
        id: "csharp-c03-u3-l1",
        title: "A classe string e imutabilidade no .NET",
        subtitle: "Reference type especial · Interning de strings e segurança de memória",
        theory: "No .NET, string é um alias para a classe System.String. Embora seja um Reference Type armazenado na Heap, comporta-se com semântica de valor em comparações de igualdade (== compara o conteúdo textual). Strings são estritamente imutáveis: qualquer método de modificação cria e retorna uma nova instância na memória.",
        questions: [
          q("Por que o operador == compara o conteúdo de duas strings em C#, diferindo de Java onde compara ponteiros?", "O C# sobrecarrega o operador == na classe String para chamar internamente o método Equals de conteúdo", ["Porque string é um Value Type primitivo na Stack","Porque o .NET não tem ponteiros"], "Isso permite que \"texto\" == \"texto\" avalie intuitivamente para true sem exigir chamadas explícitas a .Equals()."),
          q("O que caracteriza o conceito de \"imutabilidade\" da classe string no .NET?", "Uma vez criada na memória, a sequência de caracteres de uma string nunca pode ser alterada", ["A string não pode ser lida por outras threads","A string é apagada após 5 segundos"], "Qualquer alteração gera uma nova alocação de objeto na Heap gerenciada, preservando a original intacta."),
          q("O que é o mecanismo de \"String Interning\" do CLR (.NET)?", "Uma tabela interna global onde literais de strings idênticos compartilham uma única instância na Heap", ["Uma biblioteca de tradução de idiomas","Um tipo de compressão de arquivos"], "Economiza memória ao reutilizar referências para literais de texto repetidos no código."),
          q("Qual método estático verifica com segurança se uma string é nula ou composta apenas por espaços?", "string.IsNullOrWhiteSpace(valor)", ["string.IsEmpty(valor)","string.Check(valor)"], "IsNullOrWhiteSpace valida null, string vazia \"\" e strings com apenas espaços (\"   \") em uma única chamada."),
          t("Qual método estático de string valida simultaneamente valores nulos ou vazios no .NET?", ["string.IsNullOrEmpty"], "string.IsNullOrEmpty checa null ou \"\".", "# validador estatico de string vazia"),
          g("Complete a validação nulo-segura recomendada para strings de formulário:", ["if (string.IsNullOrWhiteSpace(entrada)) {\n    return false;\n}"], "IsNullOrWhiteSpace rejeita nulos, vazios e espaços redundantes.", "if (string.____(entrada)) {\n    return false;\n}"),
          o("Ordene o fluxo de execução do CLR ao comparar duas strings com a == b:", ["Verificar se as duas variáveis apontam exatamente para o mesmo endereço de memória na Heap","Se os endereços forem iguais: retornar true imediatamente por identidade","Se forem referências distintas: comparar o tamanho (Length) de ambas as cadeias","Se os comprimentos coincidirem: comparar os caracteres Unicode um a um sequencialmente"], "Mecanismo interno do operador de igualdade sobrecarregado de strings em C#."),
          p("Associe o método de validação ao seu comportamento de verificação:", [["string.IsNullOrEmpty(s)","Retorna true se a string for null ou exatamente vazia \"\""],["string.IsNullOrWhiteSpace(s)","Retorna true se for null, vazia ou contiver apenas espaços em branco"],["string.Equals(a, b, OrdinalIgnoreCase)","Compara conteúdo textual ignorando diferenças entre maiúsculas e minúsculas"],["string.IsInterned(s)","Verifica se a string já reside na tabela de interning do CLR"]], "Métodos fundamentais de inspeção de strings no .NET.")
        ]
      },
      {
        id: "csharp-c03-u3-l2",
        title: "Interpolação de strings ($\"...\") e formatação",
        subtitle: "Expressividade textual · Injeção direta de expressões e especificadores de formato",
        theory: "Introduzida no C# 6, a interpolação de strings com o caractere cifrão ($\"...\") permite incorporar variáveis e expressões diretamente dentro da cadeia de caracteres entre chaves: $\"Olá, {nome}!\". O compilador traduz a interpolação para chamadas otimizadas ou DefaultInterpolatedStringHandler no C# 10+.",
        questions: [
          q("Qual símbolo prefixa uma string interpolada em C#?", "O caractere de cifrão ($)", ["O caractere de arroba (@)","O caractere de cerquilha (#)"], "O prefixo $ habilita a substituição de expressões entre chaves no corpo da string."),
          q("Como aplicar formatação monetária padrão da cultura corrente dentro de uma interpolação?", "Inserindo o especificador de formato :C após a variável: $\"{valor:C}\"", ["Usando :M","Usando :Currency"], "O especificador :C formata valores numéricos como moeda (ex: R$ 10,00 ou $10.00 conforme a região)."),
          q("Como alinhar e preencher uma string interpolada com largura fixa de 10 caracteres à direita?", "Passando a largura após uma vírgula: $\"{nome,10}\"", ["Usando $\"{nome:10}\"","Usando $\"{nome+10}\""], "Números positivos alinham à direita; números negativos alinham à esquerda (ex: $\"{nome,-10}\")."),
          q("Qual inovação de desempenho o C# 10 trouxe para as strings interpoladas?", "DefaultInterpolatedStringHandler, evitando alocações desnecessárias na Heap se a string não for consumida", ["Remoção completa de strings","Interpolação exclusiva em tempo de compilação"], "Reduz drasticamente o consumo de memória em logs e formatações condicionais."),
          t("Qual símbolo de pontuação único ativa o mecanismo de interpolação textual no C#?", ["$"], "O cifrão prefixa strings interpoladas.", "# caractere de interpolacao"),
          g("Complete a interpolação formatando o percentual com uma casa decimal:", ["string info = $\"Taxa: {taxa:P1}\";"], "O especificador :P formata o número como percentual.", "string info = ____\"Taxa: {taxa:P1}\";"),
          o("Ordene a anatomia de uma interpolação completa com alinhamento e formatação {expr,alinhamento:formato}:", ["Expressão ou variável a ser avaliada (ex: saldo)","Vírgula seguida do valor de alinhamento e largura mínima (ex: ,-12)","Dois-pontos seguidos do código especificador de formato (ex: :C2)","Fechamento da chave (}) incorporando o trecho formatado na string"], "Anatomia sintática dos especificadores em strings interpoladas em C#."),
          p("Associe o especificador de formatação ao seu resultado textual:", [["{valor:C}","Formatação de moeda com símbolo local (ex: R$ 1.500,00)"],["{taxa:P}","Formatação percentual multiplicando por 100 com símbolo %"],["{numero:D4}","Formatação inteira com preenchimento de zeros à esquerda (ex: 0042)"],["{data:yyyy-MM-dd}","Formatação de data no padrão internacional ISO"]], "Formatadores padrão de strings interpoladas no .NET.")
        ]
      },
      {
        id: "csharp-c03-u3-l3",
        title: "Verbatim (@) e Raw String Literals (\"\"\")",
        subtitle: "Expressividade de escape · Textos multilinhas, caminhos de arquivo e JSON",
        theory: "Strings verbatim (@\"...\") desativam o escape de barras invertidas, facilitando caminhos de arquivos e regex. No C# 11+, Raw String Literals com três ou mais aspas duplas (\"\"\"...\"\"\") permitem escrever blocos multilinhas, códigos JSON, SQL e XML sem necessidade de nenhum caractere de escape, preservando indentação natural.",
        questions: [
          q("Qual é a principal vantagem de usar strings verbatim com o prefixo @ em caminhos de arquivos no Windows?", "Desativa o escape de barra invertida, permitindo escrever @\"C:\\temp\\arquivo.txt\" com barras simples", ["Acelera a gravação no disco","Torna a string imutável"], "Elimina a necessidade de duplicar cada barra invertida como em \"C:\\\\temp\\\\arquivo.txt\"."),
          q("Como representar uma aspa dupla dentro de uma string verbatim (@\"...\") em C#?", "Duplicando a aspa dupla: @\"Texto com \"\"aspas\"\" dentro\"", ["Usando \\\"","Usando &quot;"], "Na sintaxe verbatim, duas aspas duplas consecutivas representam uma aspa literal."),
          q("Qual recurso introduzido no C# 11 facilitou a escrita de payloads JSON e consultas SQL multilinhas?", "Raw String Literals delimitados por ao menos três aspas duplas (\"\"\"...\"\"\")", ["Strings XML automáticas","Desativação do compilador"], "Permite copiar e colar JSONs brutos sem escapar nenhuma aspa interna nem barras invertidas."),
          q("Como combinar interpolação de variáveis com Raw String Literals no C# 11+?", "Adicionando múltiplos cifrões no prefixo (ex: $$\"\"\"{ \"id\": {{id}} }\"\"\") para controlar o escape de chaves", ["Usando $ e @ juntos","Não é suportado"], "O número de cifrões define quantas chaves consecutivas são necessárias para interpolar uma expressão."),
          t("Qual símbolo de caractere prefixa uma string verbatim em C#?", ["@"], "O arroba prefixa strings verbatim.", "# prefixo verbatim de strings"),
          g("Complete a declaração de caminho de arquivo usando string verbatim:", ["string caminho = @\"C:\\dados\\logs.txt\";"], "O prefixo @ desativa escapes de barras.", "string caminho = ____\"C:\\dados\\logs.txt\";"),
          o("Ordene as opções de representação de texto multilinhas da mais antiga para a mais moderna:", ["Concatenação tradicional com \\r\\n e o operador +","String.Format com marcadores posicionais {0}","Strings verbatim com prefixo @ suportando quebras de linha","Raw String Literals com triplas aspas (\"\"\") eliminando escapes no C# 11+"], "Evolução dos formatos literais de strings na linguagem C#."),
          p("Associe a sintaxe ao seu comportamento de manipulação de escapes em C#:", [["@\"C:\\pasta\\arquivo\"","Verbatim: ignora barras invertidas como caractere de escape"],["$\"Olá, {nome}\"","Interpolada: executa expressões dentro de chaves"],["$@\"C:\\{pasta}\\arq\"","Verbatim interpolada combinando ambos os comportamentos"],["\"\"\" { \"chave\": 1 } \"\"\"","Raw String Literal contendo aspas sem escape"]], "Variedades de literais de strings em C# moderno.")
        ]
      },
      {
        id: "csharp-c03-u3-l4",
        title: "Métodos essenciais de manipulação de strings",
        subtitle: "Operações fundamentais · Substring, Replace, Split, Trim e Contains",
        theory: "A classe string em C# disponibiliza um conjunto abrangente de métodos de instância e utilitários para transformação textual, como Substring para fatiamento, Replace para substituições, Split para separação em vetores e Trim para sanitização de espaços. Em C# 8+, o suporte a Range e Index (ex: s[1..^1]) moderniza o fatiamento.",
        questions: [
          q("Qual método remove espaços em branco das extremidades de uma string no .NET?", "Trim() (e suas variações TrimStart() e TrimEnd())", ["Strip()","Clean()"], "Essencial para sanitização de dados fornecidos pelo usuário em formulários e APIs."),
          q("Como separar uma string contendo valores delimitados por vírgula em um array de strings?", "Usando o método texto.Split(',') ou texto.Split(new[] { ',' }, StringSplitOptions.TrimEntries)", ["Usando texto.Break(',')","Usando texto.Cut()"], "StringSplitOptions permite remover entradas vazias e aparar espaços automaticamente."),
          q("Qual método verifica se uma string contém uma subsequência ignorando maiúsculas e minúsculas no .NET moderno?", "texto.Contains(\"termo\", StringComparison.OrdinalIgnoreCase)", ["texto.Has(\"termo\")","texto.Includes(\"termo\")"], "Passar explicitamente StringComparison é a melhor prática recomendada para evitar bugs de internacionalização."),
          q("Como funciona a sintaxe moderna de Range s[1..4] introduzida no C# 8?", "Retorna uma nova substring contendo os caracteres do índice 1 até o índice 3 (o índice final 4 é exclusivo)", ["Corta o array original alterando o tamanho","Gera erro de execução"], "Ranges (..) e o operador de índice a partir do final (^1) tornam o fatiamento expressivo e conciso."),
          t("Qual método da classe string substitui todas as ocorrências de um termo por outro?", ["Replace"], "Replace(\"antigo\", \"novo\") realiza a troca de termos.", "# metodo de substituicao de texto"),
          g("Complete a verificação insensível a maiúsculas usando StringComparison:", ["bool contem = texto.Contains(\"sucesso\", StringComparison.OrdinalIgnoreCase);"], "OrdinalIgnoreCase garante comparação padronizada de alta velocidade.", "bool contem = texto.Contains(\"sucesso\", StringComparison.____);"),
          o("Ordene as etapas da sanitização e quebra de uma lista de tags recebida do usuário:", ["Remover espaços periféricos da entrada global com entrada.Trim()","Fracionar o texto em array delimitado por vírgula com .Split(',')","Descartar entradas vazias e aplicar TrimEntries via StringSplitOptions","Normalizar cada fragmento para caixa padronizada com .ToLowerInvariant()"], "Pipeline padrão de limpeza e processamento de strings em C#/.NET."),
          p("Associe o método de string à sua operação no texto:", [["s.Trim()","Remove caracteres em branco do início e do final"],["s.Split(',')","Fragmenta a cadeia em um array de strings pelo delimitador"],["s.Replace(\"a\", \"b\")","Substitui todas as ocorrências do caractere ou padrão"],["s.Substring(0, 5)","Extrai uma fatia de 5 caracteres a partir da posição inicial"]], "Operações fundamentais da classe System.String.")
        ]
      },
      {
        id: "csharp-c03-u3-l5",
        title: "StringBuilder e desempenho de concatenação no .NET",
        subtitle: "Gerenciamento de buffer · Minimizando alocações na Heap em laços de repetição",
        theory: "Para cenários onde múltiplos textos são montados iterativamente dentro de laços, o uso de System.Text.StringBuilder é mandatório no .NET. Diferente de strings imutáveis que alocam novas instâncias a cada adição, o StringBuilder gerencia um buffer mutável expansível na Heap, evitando saturação do Garbage Collector.",
        questions: [
          q("Em qual cenário o uso de StringBuilder é indispensável em relação ao operador + em C#?", "Ao construir ou acumular strings repetidamente dentro de laços for, while ou processamentos volumosos", ["Ao concatenar duas variáveis simples em uma linha","Ao declarar constantes"], "Para poucas variáveis em linha única, o compilador já otimiza via string.Concat; em loops, StringBuilder é obrigatório."),
          q("Qual namespace do .NET contém a classe StringBuilder?", "System.Text", ["System.IO","System.Collections"], "Deve ser importado com using System.Text; no topo do arquivo de código-fonte."),
          q("Como definir uma capacidade inicial estimada para um StringBuilder para evitar redimensionamentos de buffer?", "Passando o tamanho estimado no construtor: new StringBuilder(1024)", ["Usando sb.SetSize(1024)","Usando sb.Alloc(1024)"], "Pré-alocar a capacidade inicial impede que a estrutura precise alocar novos arrays internos e copiar dados à medida que cresce."),
          q("Qual método de StringBuilder anexa uma quebra de linha após o texto fornecido?", "sb.AppendLine(\"linha\")", ["sb.AddLine(\"linha\")","sb.BreakLine(\"linha\")"], "AppendLine simplifica a geração de relatórios de texto e documentos formatados linha por linha."),
          t("Qual método de StringBuilder adiciona fragmentos de texto no final do seu buffer?", ["Append"], "Append adiciona dados ao buffer interno.", "# metodo de anexar texto no buffer"),
          g("Complete o acúmulo performático de linhas usando StringBuilder:", ["var sb = new StringBuilder();\nsb.AppendLine(\"Cabeçalho\");\nstring resultado = sb.ToString();"], "ToString materializa a String final consolidada.", "var sb = new StringBuilder();\nsb.AppendLine(\"Cabeçalho\");\nstring resultado = sb.____();"),
          o("Ordene as etapas para a construção eficiente de um relatório com StringBuilder:", ["Estimar o volume total de texto e instanciar new StringBuilder(capacidade)","Iterar sobre a coleção adicionando fragmentos com sucessivos métodos AppendLine","Realizar substituições ou formatações pontuais dentro do próprio buffer","Consolidar a representação imutável final invocando sb.ToString()"], "Ciclo de vida do padrão de buffer mutável com StringBuilder em C#/.NET."),
          p("Associe a abordagem de concatenação ao seu comportamento de memória no .NET:", [["texto += item em laço","Aloca novas instâncias na Heap em cada ciclo, gerando pressão de GC"],["new StringBuilder(cap)","Reutiliza buffer mutável contínuo sem alocações espúrias"],["string.Join(\",\", itens)","Utilitário nativo altamente otimizado para unir coleções"],["$\"Valor: {x}\" simples","Resolvido pelo compilador via handler otimizado sem sobrecarga"]], "Estratégias de formatação e impacto na memória do .NET.")
        ]
      }
    ],
    4: [
      {
        id: "csharp-c03-u4-l1",
        title: "O tipo primitivo bool e operadores relacionais",
        subtitle: "Lógica booleana estrita · true, false e comparações de magnitude",
        theory: "Em C#, bool é um alias para a struct System.Boolean. Ele aceita exclusivamente os literais true e false. Diferente de C/C++, inteiros como 0 ou 1 não podem ser convertidos implicitamente para bool nem usados em condições if. Operadores relacionais (==, !=, <, >, <=, >=) produzem resultados do tipo bool estrito.",
        questions: [
          q("Quais são os únicos valores válidos para uma variável do tipo bool em C#?", "Os literais true e false em letras minúsculas", ["0 e 1","TRUE, FALSE e null"], "C# impõe forte tipagem estática e proíbe a coerção de números inteiros para booleanos."),
          q("O que acontece se tentarmos compilar: if (1) { ... } em C#?", "Erro de compilação: cannot implicitly convert type \"int\" to \"bool\"", ["O bloco é executado normalmente","A JVM fecha"], "C# exige que a expressão de teste em estruturas condicionais avalie estritamente para bool."),
          q("Qual operador relacional verifica se o valor da esquerda é menor ou igual ao da direita?", "<=", ["=<","<<"], "O operador <= verifica limite superior inclusivo de comparação."),
          q("Qual é o tamanho em memória da struct System.Boolean (bool) em C#?", "1 byte (8 bits)", ["1 bit","4 bytes"], "Embora represente 1 bit lógico, a CPU endereça memória em bytes para eficiência de acesso."),
          t("Qual palavra-chave declara o tipo de dado lógico verdadeiro/falso em C#?", ["bool"], "bool é o tipo primitivo para premissas lógicas.", "# tipo booleano primitivo"),
          g("Complete a comparação que valida se a idade é suficiente para acesso:", ["bool maiorDeIdade = idade >= 18;"], ">= verifica se o número atinge ou supera 18.", "bool maiorDeIdade = idade ____ 18;"),
          o("Ordene a precedência de avaliação em expressões com comparações relacionais:", ["Cálculo das subexpressões aritméticas em ambos os lados","Avaliação dos operadores relacionais de magnitude (<, >, <=, >=)","Avaliação dos operadores relacionais de igualdade e diferença (==, !=)","Atribuição do resultado booleano final à variável designada"], "Hierarquia formal de avaliação de expressões relacionais em C#."),
          p("Associe o operador relacional ao seu significado semântico:", [["==","Igualdade verificando equivalência de valores"],["!=","Desigualdade verificando divergência de valores"],[">=","Maior ou igual delimitando fronteira mínima inclusiva"],["<=","Menor ou igual delimitando fronteira máxima inclusiva"]], "Operadores relacionais da linguagem C#.")
        ]
      },
      {
        id: "csharp-c03-u4-l2",
        title: "Operadores lógicos de curto-circuito (&&, ||)",
        subtitle: "Avaliação eficiente · Prevenção de NullReferenceException e guard clauses",
        theory: "C# fornece operadores lógicos de curto-circuito: && (conjunção) e || (disjunção). O operador && não avalia a expressão da direita se a da esquerda for false; o operador || não avalia a direita se a esquerda for true. Isso permite construir cláusulas de guarda seguras como (usuario != null && usuario.Ativo).",
        questions: [
          q("Como funciona o mecanismo de curto-circuito no operador && em C#?", "Se a expressão da esquerda for false, a da direita nem é avaliada nem executada", ["Ambos os lados sempre rodam","A expressão da direita roda primeiro"], "Padrão essencial para evitar trabalho computacional inútil e proteger chamadas a objetos."),
          q("Por que a expressão: if (cliente != null && cliente.VerificarCredito()) é segura?", "Porque se cliente for null, && para imediatamente sem invocar o método na referência nula", ["Porque o compilador inicializa o cliente","Porque . ignora nulos"], "Evita o temido disparo de System.NullReferenceException em tempo de execução."),
          q("Qual é a diferença entre usar && duplo e & simples entre dois valores booleanos em C#?", "& sempre avalia ambos os operandos mesmo que a esquerda já defina o resultado; && tem curto-circuito", ["& só funciona com números","& é mais moderno"], "& é o operador bit a bit que, aplicado a bool, desativa deliberadamente o curto-circuito."),
          q("Em qual caso a expressão (a || b) avaliará o operando b?", "Apenas quando a expressão a for avaliada como false", ["Sempre em todos os casos","Apenas quando a for true"], "Se a for true, a disjunção já tem certeza do resultado verdadeiro global e ignora b."),
          t("Qual operador de dois caracteres implementa conjunção lógica com curto-circuito em C#?", ["&&"], "&& avalia a direita apenas se a esquerda for verdadeira.", "# conjuncao com curto circuito"),
          g("Complete a cláusula de guarda segura com curto-circuito:", ["if (lista != null && lista.Count > 0) {\n    processar();\n}"], "&& impede acessar lista.Count quando lista for nula.", "if (lista != null ____ lista.Count > 0) {\n    processar();\n}"),
          o("Ordene as etapas de execução da expressão (divisor != 0 && (100 / divisor) > 5) quando divisor vale 0:", ["Avaliar o operando esquerdo: (divisor != 0)","Constatar que o resultado é false (pois divisor é 0)","Aplicar o curto-circuito do operador && interrompendo a verificação","Retornar false sem executar a divisão por zero (100 / divisor)"], "Proteção contra divisão por zero viabilizada pelo operador de curto-circuito."),
          p("Associe o operador lógico ao seu padrão de avaliação de operandos em C#:", [["&&","Curto-circuito: pula a avaliação da direita se a esquerda for false"],["||","Curto-circuito: pula a avaliação da direita se a esquerda for true"],["&","Avaliação estrita completa: executa os dois lados obrigatoriamente"],["|","Avaliação estrita de disjunção: executa os dois lados obrigatoriamente"]], "Comportamento dos operadores lógicos no runtime do .NET.")
        ]
      },
      {
        id: "csharp-c03-u4-l3",
        title: "Operadores lógicos unários (!) e exclusivos (^)",
        subtitle: "Inversão e paridade · O operador de negação e a disjunção exclusiva XOR",
        theory: "O operador unário de negação (!) inverte o valor de uma expressão booleana (!true vira false). O operador de disjunção exclusiva XOR (^) retorna true se e somente se exatamente um dos operandos for true. Ao contrário de && e ||, o operador ^ sempre avalia ambos os operandos obrigatoriamente.",
        questions: [
          q("Qual é o resultado da operação booleana: true ^ false em C#?", "true (pois os dois operandos possuem valores lógicos distintos)", ["false","Erro de compilação"], "No XOR booleano, a saída é verdadeira quando exatamente um dos lados for verdadeiro."),
          q("Qual é o resultado da operação booleana: true ^ true em C#?", "false (pois ambos os operandos possuem o mesmo valor lógico verdadeiro)", ["true","null"], "Se ambos forem verdadeiros ou ambos falsos, o XOR avalia para false."),
          q("O operador XOR (^) sobre booleanos realiza avaliação de curto-circuito?", "Não; ele é obrigado a avaliar ambos os operandos para saber se eles diferem entre si", ["Sim, ele para no primeiro true","Apenas em modo release"], "Não há como determinar exclusividade sem inspecionar ambos os termos lógicos."),
          q("Como o operador de negação unária (!) se comporta sobre uma variável booleana?", "Inverte o estado lógico: se for true torna-se false, e se for false torna-se true", ["Transforma a variável em número negativo","Torna a variável nula"], "É amplamente utilizado para testar estados negativos, como if (!usuario.Autenticado)."),
          t("Qual símbolo de caractere único executa a negação lógica unária em C#?", ["!"], "O ponto de exclamação inverte o valor booleano.", "# operador unario de negacao"),
          g("Complete a negação lógica da verificação de autorização:", ["bool bloqueado = !autorizado;"], "O operador ! inverte true para false e vice-versa.", "bool bloqueado = ____autorizado;"),
          o("Ordene a precedência lógica dos operadores em C# do mais alto para o mais baixo:", ["Operador unário de negação (!)","Operadores relacionais de magnitude e igualdade (==, !=, <, >)","Operador lógico exclusivo XOR (^)","Operador de conjunção de curto-circuito (&&)"], "Hierarquia formal de precedência de operadores lógicos em C#."),
          p("Associe a expressão booleana ao seu resultado avaliado:", [["!false","true por inversão de valor"],["true ^ false","true por disjunção exclusiva de valores opostos"],["true ^ true","false por coincidência de valores verdadeiros"],["false ^ false","false por ausência de qualquer valor verdadeiro"]], "Tabela verdade de operadores lógicos unários e exclusivos em C#.")
        ]
      },
      {
        id: "csharp-c03-u4-l4",
        title: "Precedência de operadores e Leis de De Morgan",
        subtitle: "Refatoração condicional · Parênteses explícitos e simplificação lógica",
        theory: "Expressões booleanas complexas seguem regras de precedência: ! precede comparações, que precedem &&, que por sua vez precede ||. As Leis de De Morgan provam que !(a && b) equivale a (!a || !b) e !(a || b) equivale a (!a && !b). O uso de parênteses é recomendado para garantir clareza e prevenir erros sutis.",
        questions: [
          q("Qual operador possui maior precedência na expressão: a || b && c em C#?", "&& tem precedência maior que || (a expressão é avaliada como a || (b && c))", ["|| tem precedência maior","Eles têm a mesma precedência"], "Conjunção lógica vincula com mais força que a disjunção na gramática do C#."),
          q("Pelas Leis de De Morgan, qual expressão é logicamente idêntica a !(ativo && aprovado)?", "!ativo || !aprovado", ["!ativo && !aprovado","ativo || aprovado"], "A negação de uma conjunção equivale à disjunção das negações individuais."),
          q("Pelas Leis de De Morgan, qual expressão equivale a !(x > 10 || y == 0)?", "x <= 10 && y != 0", ["x <= 10 || y != 0","x > 10 && y == 0"], "Inverte os operadores relacionais e substitui a disjunção por conjunção."),
          q("Por que revisores de código recomendam parênteses explícitos mesmo quando a precedência padrão produz o resultado pretendido?", "Para explicitar a intenção de negócio de maneira inequívoca e evitar que outros desenvolvedores interpretem mal a lógica", ["Para acelerar o processador","Porque o C# exige"], "Legibilidade humana é uma diretriz de qualidade superior à memorização estrita de tabelas de precedência."),
          t("Qual símbolo de pontuação de dois caracteres conecta termos na transformação de De Morgan para !(a || b)?", ["&&"], "!(a || b) transforma-se em (!a && !b).", "# operador de conjuncao em De Morgan"),
          g("Complete a refatoração equivalente aplicando De Morgan para !(isAdmin || isOwner):", ["bool semAcesso = !isAdmin && !isOwner;"], "Inverte a disjunção para conjunção e nega os termos.", "bool semAcesso = !isAdmin ____ !isOwner;"),
          o("Ordene as etapas para refatorar uma condicional negada complexa !(p && q):", ["Identificar a expressão global encapsulada pelo operador de negação externa","Distribuir a negação unária para cada uma das subexpressões internas","Trocar o operador de conjunção (&&) pelo operador de disjunção (||)","Substituir comparações invertidas por operadores relacionais diretos correspondentes"], "Passo a passo da aplicação prática das Leis de De Morgan em C#."),
          p("Associe a expressão negada à sua forma equivalente direta:", [["!(a && b)","(!a || !b) com disjunção dos termos negados"],["!(a || b)","(!a && !b) com conjunção dos termos negados"],["!(x < 5)","(x >= 5) invertendo a relação de limite"],["!(x == y)","(x != y) aplicando desigualdade direta"]], "Equivalências lógicas das Leis de De Morgan em C#.")
        ]
      },
      {
        id: "csharp-c03-u4-l5",
        title: "Pattern Matching booleano com is, is not e and/or",
        subtitle: "C# moderno · Expressões de padrão declarativas no C# 9+",
        theory: "Desde o C# 9, a linguagem oferece operadores de padrão lógico: and, or e not para testes com a palavra-chave is (ex: if (valor is not null e if (temperatura is >= 20 and <= 30)). Essa sintaxe moderna substitui comparações verbosas por expressões fluentes e declarativas de altíssima legibilidade.",
        questions: [
          q("Qual é a forma moderna e idiomática em C# 9+ para testar se um objeto não é nulo?", "if (objeto is not null)", ["if (!objeto.IsNull())","if (objeto != nil)"], "is not null é a recomendação oficial moderna do C# para validação defensiva de nulidade."),
          q("Como expressar um teste de faixa de valores (entre 10 e 50 inclusivos) com Pattern Matching em C#?", "if (idade is >= 10 and <= 50)", ["if (idade is 10..50)","if (10 <= idade <= 50)"], "O operador is com and permite compor verificações relacionais diretas sem repetir o nome da variável."),
          q("Qual é a diferença entre usar o operador == null e a expressão is null em C#?", "is null não pode ser sobrecarregado por operadores customizados, garantindo teste puro de referência", ["== null é mais rápido","Não há diferença"], "Classes que sobrecarregam o operador == podem mascarar a verificação de nulo; is null é à prova de falhas."),
          q("Como combinar múltiplos padrões com disjunção lógica usando Pattern Matching no C# moderno?", "Usando o operador or: if (caractere is 'a' or 'e' or 'i' or 'o' or 'u')", ["Usando || no padrão","Usando comma"], "Palavras-chave de padrão (and, or, not) são usadas em expressões is e switch patterns."),
          t("Qual palavra-chave do C# moderno realiza testes de correspondência de padrões (Pattern Matching)?", ["is"], "is avalia tipos e padrões lógicos declarativos.", "# palavra chave de pattern matching"),
          g("Complete o teste moderno de nulidade usando a sintaxe recomendada de C# 9+:", ["if (usuario is not null) {\n    usuario.Ativar();\n}"], "is not null garante teste estrito de referência.", "if (usuario is ____ null) {\n    usuario.Ativar();\n}"),
          o("Ordene as formas de verificação de não-nulo da mais antiga para a mais moderna em C#:", ["if (objeto != null) com operador tradicional de desigualdade","if (!ReferenceEquals(objeto, null)) prevenindo sobrecarga de operador","if (objeto is object) do início da introdução de pattern matching no C# 7","if (objeto is not null) padrão oficial e fluente introduzido no C# 9+"], "Evolução histórica da verificação de nulidade em C#/.NET."),
          p("Associe a expressão de Pattern Matching ao seu significado semântico:", [["x is not null","Verificação estrita de que a referência é válida e não nula"],["x is >= 18 and < 65","Validação de faixa numérica contínua em intervalo aberto/fechado"],["x is 0 or -1","Disjunção de valores literais específicos"],["x is string s","Type pattern que valida o tipo e declara variável tipada s"]], "Padrões de correspondência lógica (Pattern Matching) em C# moderno.")
        ]
      }
    ],
    5: [
      {
        id: "csharp-c03-u5-l1",
        title: "Conversões implícitas e explícitas (casting)",
        subtitle: "Alargamento e estreitamento · Widening sem perdas vs Narrowing com cast",
        theory: "Em C#, conversões implícitas ocorrem automaticamente quando não há risco de perda de magnitude ou precisão (widening, como de int para long). Conversões explícitas (narrowing, como de double para int) exigem a sintaxe de cast entre parênteses: (int) valor, pois podem truncar casas decimais ou gerar overflow.",
        questions: [
          q("Quando o compilador C# permite que uma conversão numérica seja estritamente implícita?", "Quando o tipo de destino tem capacidade igual ou maior que a origem, garantindo zero perda de dados", ["Quando o destino é menor que a origem","Apenas entre strings e números"], "Por exemplo: int (32 bits) para long (64 bits) é sempre implícito e seguro."),
          q("O que acontece ao converter um double em int usando cast explícito: int i = (int) 9.99;?", "A parte fracionária é sumariamente truncada, resultando no valor inteiro 9", ["O valor é arredondado para 10","Ocorre exceção em tempo de execução"], "Casts numéricos primitivos em C# realizam truncamento em direção a zero, e não arredondamento estatístico."),
          q("Por que a conversão de int para float pode sofrer perda de precisão sutil, mesmo sendo implícita?", "Porque ambos ocupam 32 bits, mas o float reserva bits para expoente, tendo menos bits de mantissa que o int", ["Porque float só aceita números pares","Porque o C# proíbe números grandes"], "Para inteiros maiores que 16.777.216, a conversão para float pode perder os últimos dígitos significativos."),
          q("Como prevenir estouro de capacidade em um cast de narrowing explícito em C#?", "Envolvendo a expressão em um bloco checked para que o CLR dispare System.OverflowException se estourar", ["Usando a instrução lock","Reduzindo a velocidade da CPU"], "checked transforma o truncamento silencioso de bits em uma exceção de contenção formal."),
          t("Qual símbolo de pontuação delimita o tipo de destino em um cast explícito em C#?", ["()"], "Parênteses envolvem o tipo: (int) valor.", "# delimitador de cast explicito"),
          g("Complete o cast explícito truncando o valor decimal para número inteiro:", ["double preco = 89.95;\nint precoInteiro = (int) preco;"], "O cast (int) converte explicitamente double para inteiro.", "double preco = 89.95;\nint precoInteiro = (____) preco;"),
          o("Ordene os tipos numéricos pela hierarquia natural de conversão implícita (widening):", ["byte: 8 bits sem sinal","short: 16 bits com sinal","int: 32 bits padrão com sinal","double: 64 bits de ponto flutuante de amplitude máxima"], "Cadeia canônica de alargamento automático de tipos numéricos no C#."),
          p("Associe a conversão de tipos à sua classificação no compilador C#:", [["int para long","Conversão implícita segura sem risco de perda dimensional"],["long para int","Conversão explícita com risco de overflow numérico"],["double para int","Conversão explícita que trunca a parte fracionária"],["char para int","Conversão implícita para o valor numérico do caractere Unicode"]], "Classificação de conversões numéricas em C#.")
        ]
      },
      {
        id: "csharp-c03-u5-l2",
        title: "A classe utilitária System.Convert",
        subtitle: "Conversões universais · Tratamento de nulos, arredondamento bancário e exceções",
        theory: "A classe estática System.Convert fornece métodos para converter dados entre tipos básicos do .NET (ex: Convert.ToInt32, Convert.ToBoolean). Diferente de casts diretos, Convert trata valores nulos retornando o valor padrão (ex: Convert.ToInt32(null) retorna 0) e aplica arredondamento bancário em números decimais.",
        questions: [
          q("Qual é o resultado de Convert.ToInt32(null) em comparação com um cast explícito (int) objetoNulo?", "Convert.ToInt32(null) retorna 0 de forma segura; o cast direto lança NullReferenceException", ["Ambos retornam zero","Ambos quebram com exceção"], "A classe Convert possui tratamento de tolerância a nulos embutido para todos os tipos primitivos."),
          q("Qual política de arredondamento Convert.ToInt32(double) aplica ao converter valores decimais?", "Arredondamento bancário (ToEven): arredonda para o número par mais próximo em empates com .5", ["Sempre arredonda para cima","Sempre trunca para baixo"], "Por exemplo: 2.5 é convertido para 2, enquanto 3.5 é convertido para 4, minimizando desvios estatísticos."),
          q("Qual exceção a classe Convert lança se a string de entrada não tiver formato numérico válido?", "System.FormatException", ["System.NullReferenceException","System.IndexOutOfRangeException"], "FormatException indica que a cadeia de texto possui caracteres incompatíveis com a representação numérica."),
          q("Qual exceção a classe Convert dispara se o número exceder os limites do tipo alvo?", "System.OverflowException", ["System.ArgumentException","System.DivideByZeroException"], "Convert sempre verifica estouro de limites de capacidade por padrão."),
          t("Qual classe estática do namespace System realiza conversões abrangentes entre tipos básicos?", ["Convert"], "Convert expõe métodos como ToInt32, ToDouble e ToBoolean.", "# classe utilitaria de conversao"),
          g("Complete a conversão segura de um valor booleano em texto usando Convert:", ["bool ativo = Convert.ToBoolean(\"true\");"], "Convert.ToBoolean converte texto em booleano.", "bool ativo = Convert.____(\"true\");"),
          o("Ordene as etapas executadas internamente por Convert.ToInt32(string valor):", ["Verificar se a string de entrada é null (retornando 0 se for)","Remover espaços em branco e analisar o sinal aritmético","Executar a análise dos dígitos decimais (equivalente a int.Parse)","Validar limites de 32 bits disparando OverflowException se ultrapassar"], "Mecanismo interno do método Convert.ToInt32 em C#/.NET."),
          p("Associe o método de System.Convert ao seu comportamento com valor nulo:", [["Convert.ToInt32(null)","Retorna o número inteiro 0 com segurança"],["Convert.ToBoolean(null)","Retorna o valor booleano false de contingência"],["Convert.ToDecimal(null)","Retorna 0m preservando o tipo monetário"],["Convert.ToString(null)","Retorna null sem lançar exceção"]], "Tolerância a valores nulos na classe System.Convert.")
        ]
      },
      {
        id: "csharp-c03-u5-l3",
        title: "Parsing: int.Parse versus int.TryParse com parâmetros out",
        subtitle: "Robustez de entrada · Eliminando exceções custosas em fluxos frequentes",
        theory: "Converter texto em números é essencial em APIs e interfaces. int.Parse lança FormatException se a string for inválida. O método int.TryParse retorna um booleano de sucesso e preenche o resultado via parâmetro out: int.TryParse(texto, out int valor). TryParse não lança exceções, sendo a melhor prática de desempenho.",
        questions: [
          q("Por que int.TryParse deve ser preferido em relação a int.Parse ao processar dados de usuários?", "TryParse não dispara exceções caso o texto seja inválido, evitando o alto custo de performance do CLR", ["TryParse roda na GPU","Parse não suporta números negativos"], "Tratar exceções no .NET aloca memória de stack trace; TryParse retorna false de forma quase instantânea."),
          q("Como funciona o parâmetro out em int.TryParse(texto, out int resultado)?", "O método preenche a variável resultado com o número convertido se tiver sucesso, ou com 0 se falhar", ["A variável out é apagada da memória","O parâmetro out é opcional"], "O modificador out exige que o método atribua um valor à variável antes de retornar."),
          q("Desde o C# 7, como podemos simplificar a declaração da variável out no TryParse?", "Declarando a variável inline diretamente dentro da chamada: int.TryParse(texto, out var resultado)", ["Não precisa mais de out","Usando a palavra in"], "Declarações inline de variáveis out eliminam a necessidade de declarar a variável na linha anterior."),
          q("O que int.TryParse retorna se a string contiver caracteres alfabéticos como \"123abc\"?", "Retorna false e atribui o valor 0 à variável de saída out", ["Retorna true com 123","Lança FormatException"], "Se houver qualquer caractere não numérico inválido, a conversão inteira é rejeitada com segurança."),
          t("Qual método de análise numérica em C# evita o disparo de FormatException retornando um booleano?", ["TryParse"], "TryParse retorna true para sucesso ou false para falha.", "# metodo seguro de parsing"),
          g("Complete a validação de entrada robusta com TryParse inline:", ["if (int.TryParse(entrada, out int id)) {\n    processar(id);\n}"], "Declara a variável id diretamente na cláusula de saída out.", "if (int.TryParse(entrada, out ____ id)) {\n    processar(id);\n}"),
          o("Ordene a estrutura canônica para leitura segura de números com TryParse:", ["Receber o dado bruto do formulário ou requisição HTTP como string","Invocar Tipo.TryParse passando a string e a variável receptora com out var","Avaliar o booleano de retorno: se true prosseguir usando a variável preenchida","Se false: acionar fluxo de erro e notificar usuário sobre formato inválido"], "Padrão profissional de validação de entradas numéricas em C#/.NET."),
          p("Associe a assinatura de conversão ao seu padrão de tratamento de erros:", [["int.Parse(\"abc\")","Dispara fatalmente System.FormatException"],["int.TryParse(\"abc\", out _)","Retorna false silenciosamente sem lançar exceções"],["int.Parse(\"999999999999\")","Dispara System.OverflowException por ultrapassar 32 bits"],["int.Parse(null)","Dispara System.ArgumentNullException"]], "Reações do runtime a falhas de parsing de strings em C#.")
        ]
      },
      {
        id: "csharp-c03-u5-l4",
        title: "Casting seguro com os operadores as e is",
        subtitle: "Polimorfismo seguro · Evitando InvalidCastException com checagens em tempo de execução",
        theory: "Tentar converter referências com cast explícito (Cliente) obj lança InvalidCastException se o tipo for incompatível. O operador as tenta a conversão e retorna null se falhar (exclusivo para Reference Types e Nullables). O operador is com declaração de padrão (if (obj is Cliente c)) testa e converte atomicamente.",
        questions: [
          q("Qual é o comportamento do operador as quando a conversão de tipo for incompatível em C#?", "Ele avalia para null com segurança em vez de lançar InvalidCastException", ["Ele encerra o processo","Ele lança NullReferenceException"], "Permite testar if (resultado != null) após a tentativa de conversão."),
          q("Por que o operador as NÃO pode ser utilizado diretamente com tipos de valor não anuláveis como int?", "Porque int é um Value Type puro e não pode assumir o valor null como indicador de falha", ["Porque int é primitivo","Porque as só funciona com interfaces"], "Para usar as com Value Types, é obrigatório usar a versão anulável: obj as int?."),
          q("Como o padrão de tipo moderno if (obj is Cliente c) supera o operador as em elegância?", "Ele valida o tipo e instancia a variável tipada c no escopo em uma única instrução atômica", ["Ele roda duas vezes mais rápido","Ele não precisa de chaves"], "Combina checagem de tipo, garantia de não-nulidade e casting sem código intermediário."),
          q("O que acontece se obj for null ao executar: if (obj is Cliente c)?", "A condição avalia para false e o bloco interno do if não é executado", ["Lança NullReferenceException","Atribui null a c e entra no if"], "O operador is rejeita referências nulas por definição, atuando como guarda de segurança."),
          t("Qual operador tenta converter um reference type retornando null em caso de incompatibilidade?", ["as"], "as retorna null se a conversão for inválida.", "# operador de conversao segura as"),
          g("Complete o pattern matching de tipo que testa e converte o objeto simultaneamente:", ["if (resposta is MensagemSucesso msg) {\n    exibir(msg.Texto);\n}"], "O operador is testa o tipo e declara a variável msg.", "if (resposta ____ MensagemSucesso msg) {\n    exibir(msg.Texto);\n}"),
          o("Ordene as abordagens de casting polimórfico da mais arriscada para a mais moderna e segura:", ["Cast direto explícito: (Tipo) obj (risco de quebra por InvalidCastException)","Checagem prévia manual: if (obj is Tipo) seguido de (Tipo) obj","Operador as com verificação de nulidade: var t = obj as Tipo; if (t != null)","Pattern matching declarativo moderno: if (obj is Tipo t)"], "Evolução dos padrões de casting de objetos na linguagem C#."),
          p("Associe o operador de casting à sua característica fundamental:", [["Cast direto (Tipo) obj","Lança InvalidCastException se a conversão falhar"],["Operador as","Retorna null caso a conversão não seja compatível"],["Operador is com variável","Testa o tipo, rejeita nulo e cria a variável tipada"],["InvalidCastException","Exceção disparada por tentativa inválida de coerção de tipo"]], "Mecanismos de verificação e coerção de tipos no .NET.")
        ]
      },
      {
        id: "csharp-c03-u5-l5",
        title: "Boxing e unboxing: custo de conversão para object",
        subtitle: "Arquitetura do CLR · Encapsulamento de Value Types na Heap e penalidade de GC",
        theory: "Boxing é a conversão implícita de um Value Type (como int ou struct) para o tipo object ou para uma interface implementada, alocando um invólucro na Heap gerenciada. Unboxing é a extração explícita do valor contido no objeto de volta para a Stack. Boxing repetido em laços degrada a performance da aplicação.",
        questions: [
          q("O que acontece na memória do CLR durante a operação de \"boxing\" de um inteiro (object o = 42;)?", "Uma caixa é alocada na Heap, o valor 42 é copiado para dentro dela e o ponteiro é salvo em o", ["O inteiro é mantido na Stack","O Garbage Collector é desativado"], "Transforma um Value Type leve de pilha em um objeto completo gerenciado na Heap."),
          q("O que é \"unboxing\" e qual é a sintaxe exigida em C# para realizá-lo?", "A extração explícita do valor da Heap de volta para a Stack usando cast: int i = (int) o;", ["A destruição do objeto com delete","A conversão automática para string"], "O unboxing exige um cast explícito para o tipo exato original guardado na caixa."),
          q("O que acontece se tentarmos fazer unboxing de um int encapsulado em object para o tipo short: short s = (short) o;?", "Lança System.InvalidCastException em tempo de execução", ["O CLR converte automaticamente","O valor é truncado"], "O unboxing exige compatibilidade de tipo exata; para virar short, deve-se fazer (short)(int) o."),
          q("Qual inovação introduzida no C# 2.0 e .NET eliminou a maior parte dos problemas históricos de boxing?", "Generics (Generics em classes e métodos como List<T> e Dictionary<TKey, TValue>)", ["A palavra-chave async","O compilador Roslyn"], "Coleções genéricas trabalham diretamente com Value Types na Stack sem precisar encapsular em object."),
          t("Qual é o termo técnico para a alocação de um Value Type dentro de um objeto na Heap gerenciada?", ["boxing"], "Boxing transfere dados da Stack para um envelope na Heap.", "# encapsulamento de tipos por valor"),
          g("Complete o unboxing explícito retirando o inteiro de dentro do objeto encapsulado:", ["object caixa = 100;\nint original = (int) caixa;"], "O cast (int) extrai o valor de volta para a Stack.", "object caixa = 100;\nint original = (____) caixa;"),
          o("Ordene as etapas internas executadas pelo CLR durante uma operação de boxing:", ["Leitura do valor do Value Type localizado na Stack da thread","Alocação de novo espaço de memória na Heap incluindo cabeçalho de objeto de sincronização","Cópia dos bytes brutos da Stack para o bloco recém-alocado na Heap","Retorno e atribuição do endereço de memória da Heap à variável de referência object"], "Etapas mecânicas do processo de boxing no runtime do .NET."),
          p("Associe a operação ao seu impacto na infraestrutura do .NET:", [["Boxing (int para object)","Aloca novo objeto na Heap e adiciona pressão ao Garbage Collector"],["Unboxing ((int) obj)","Copia os bytes de volta para a Stack com checagem de tipo exata"],["Coleções não-genéricas (ArrayList)","Causa boxing contínuo a cada item adicionado na lista"],["Coleções genéricas (List<int>)","Mantém os elementos em array contíguo de tipos de valor sem boxing"]], "Consequências de boxing e unboxing na arquitetura do .NET.")
        ]
      }
    ],
    6: [
      {
        id: "csharp-c03-u6-l1",
        title: "Operadores aritméticos e de atribuição composta",
        subtitle: "Cálculo e abreviação · +, -, *, /, % e operadores combinados (+=, -=, etc.)",
        theory: "C# fornece operadores aritméticos binários clássicos (+, -, *, /, %) e operadores de atribuição composta (+=, -=, *=, /=, %=). O operador de módulo (%) calcula o resto da divisão entre inteiros e também sobre tipos de ponto flutuante. Operadores compostos avaliam o operando da esquerda apenas uma vez.",
        questions: [
          q("Qual é o resultado da operação de resto de divisão inteira: 17 % 5 em C#?", "2 (pois 17 dividido por 5 é 3 com resto 2)", ["3","1"], "O operador % calcula o resto residual após a divisão inteira inteira."),
          q("Qual é a vantagem técnica de usar operadores de atribuição composta como lista[GetIndice()] += 10;?", "A expressão da esquerda (GetIndice()) é avaliada uma única vez, prevenindo efeitos colaterais duplicados", ["Executa em paralelo na GPU","Garante que o número seja par"], "Em expressões complexas, garante que funções de indexação não sejam invocadas repetidamente."),
          q("O que acontece ao dividir dois inteiros literais em C#: int x = 5 / 2;?", "O resultado é truncado para 2, descartando qualquer fração", ["O resultado é 2.5","Lança exceção de divisão"], "Para preservar casas fracionárias, ao menos um operando deve ser decimal ou float: 5.0 / 2."),
          q("O operador de módulo (%) em C# suporta operandos de ponto flutuante (double/float)?", "Sim; em C# o operador % funciona tanto com inteiros quanto com números de ponto flutuante", ["Não, apenas inteiros","Apenas no modo checked"], "Por exemplo: 5.5 % 2.0 resulta em 1.5, diferindo de outras linguagens onde fmod é obrigatório."),
          t("Qual operador aritmético calcula o resto da divisão em C#?", ["%"], "O operador % retorna o resto da divisão.", "# operador de modulo e resto"),
          g("Complete a atribuição composta que soma 50 ao saldo existente:", ["saldo += 50;"], "+= abrevia saldo = saldo + 50.", "saldo ____ 50;"),
          o("Ordene a precedência dos operadores aritméticos em C# da maior prioridade para a menor:", ["Operadores unários de sinal (+, -)","Operadores multiplicativos (*, /, %)","Operadores aditivos (+, -)","Operadores de atribuição simples e composta (=, +=, *=)"], "Hierarquia formal de precedência aritmética na gramática de C#."),
          p("Associe a operação aritmética à sua avaliação em C#:", [["10 / 4 (inteiros)","2 com truncamento das casas decimais"],["10.0 / 4 (ponto flutuante)","2.5 com casas fracionárias preservadas"],["10 % 3","1 correspondente ao resto da divisão"],["x += 5","Equivalente simplificado a x = x + 5"]], "Avaliações aritméticas na linguagem C#.")
        ]
      },
      {
        id: "csharp-c03-u6-l2",
        title: "Operadores de incremento e decremento (++ e --)",
        subtitle: "Pré-fixado versus Pós-fixado · Efeitos de avaliação em expressões compostas",
        theory: "Os operadores unários de incremento (++) e decremento (--) alteram o valor de uma variável em uma unidade. A forma pré-fixada (++x) incrementa a variável antes de fornecer seu valor na expressão; a forma pós-fixada (x++) avalia o valor corrente primeiro e só então realiza o incremento da variável.",
        questions: [
          q("Qual é o valor impresso pelo código: int x = 5; Console.WriteLine(x++);?", "5 (pois a forma pós-fixada entrega o valor original antes de realizar o incremento)", ["6","4"], "Após a linha ser concluída, o valor de x na memória torna-se 6."),
          q("Qual é o valor impresso pelo código: int y = 5; Console.WriteLine(++y);?", "6 (pois a forma pré-fixada incrementa a variável antes de avaliar a expressão)", ["5","7"], "O incremento é aplicado antes do consumo do valor pelo método."),
          q("Por que é má prática misturar operadores de incremento pós-fixado em expressões aritméticas complexas?", "Dificulta a leitura humana e gera comportamento confuso ou dependente da ordem de avaliação", ["Aumenta o tamanho do executável","Desativa o coletor de lixo"], "Escrever instruções isoladas (x++; total = a + x;) torna o código muito mais claro e auditável."),
          q("Qual instrução é recomendada na cláusula de passo de um laço for tradicional em C#?", "i++ ou ++i, sendo ambos equivalentes em efeito final quando isolados no cabeçalho", ["i += 0","i = i"], "Quando o valor de retorno não é consumido em uma expressão maior, pré e pós-fixado produzem efeito idêntico."),
          t("Qual forma do operador de incremento altera a variável antes de seu uso na expressão?", ["pre-fixada"], "A forma pré-fixada (++x) incrementa antes de entregar o valor.", "# forma pre-fixada de incremento"),
          g("Complete o incremento pós-fixado no percurso do laço:", ["for (int i = 0; i < limite; i++) {\n    processar(i);\n}"], "i++ avança o contador unitário ao final de cada volta.", "for (int i = 0; i < limite; i____) {\n    processar(i);\n}"),
          o("Ordene as etapas executadas na instrução int r = ++contador;:", ["Leitura do valor atual da variável contador na memória","Soma de uma unidade (incremento) armazenando o novo valor em contador","Entrega do novo valor incrementado como resultado da subexpressão","Atribuição do valor atualizado à variável receptora r"], "Sequência operacional do operador de incremento pré-fixado em C#."),
          p("Associe a expressão ao valor retornado imediatamente se x vale 10:", [["x++","Retorna 10 (atualiza x para 11 na sequência)"],["++x","Retorna 11 (atualiza x para 11 antes de retornar)"],["x--","Retorna 10 (atualiza x para 9 na sequência)"],["--x","Retorna 9 (atualiza x para 9 antes de retornar)"]], "Comparativo de operadores pré e pós-fixados em C#.")
        ]
      },
      {
        id: "csharp-c03-u6-l3",
        title: "O operador condicional ternário (? :)",
        subtitle: "Expressões condicionais · Seleção concisa de valores e tipagem comum",
        theory: "O operador condicional ternário (? :) avalia uma condição booleana e seleciona um entre dois resultados: condicao ? valorTrue : valorFalse. Diferente da instrução if, o ternário é uma expressão que produz um valor atribuível, exigindo que ambas as ramificações compartilhem um tipo comum compatível.",
        questions: [
          q("Qual é a principal vantagem de usar o operador ternário em vez de um bloco if/else tradicional em C#?", "Permite produzir um valor diretamente em expressões de atribuição, retorno de métodos ou interpolação", ["Acelera a compilação","Permite usar variáveis sem tipo"], "Possibilita inicializar campos e variáveis imutáveis (readonly ou const) em uma única linha elegante."),
          q("O que o compilador C# exige sobre os tipos de retorno das duas ramificações do operador ternário?", "Deve existir uma conversão implícita entre os dois tipos para que o compilador determine o tipo comum", ["Ambos os tipos devem ser obrigatoriamente strings","Não há exigência de tipos"], "Se uma ramificação retornar int e a outra string, o compilador apontará erro de incompatibilidade de tipos."),
          q("O operador ternário avalia ambas as ramificações a cada execução em C#?", "Não; ele avalia exclusivamente a ramificação correspondente ao resultado da condição booleana", ["Sim, ele executa os dois lados sempre","Depende da configuração do release"], "A ramificação não selecionada nunca é executada, evitando efeitos colaterais indesejados."),
          q("O que é o recurso de \"ref ternary\" (ref condicional) introduzido no C# 7.0?", "Permite que o operador ternário retorne uma referência (ref) para uma variável em vez de uma cópia de valor", ["Permite ternários triplos","Desativa exceções"], "Permite escrever: ref var maior = ref (a > b ? ref a : ref b); para modificar a variável original."),
          t("Qual símbolo de pontuação separa o valor verdadeiro do falso no operador ternário?", [":"], "Os dois-pontos separam a ramificação true da false.", "# separador do operador ternario"),
          g("Complete a seleção de status usando o operador ternário em C#:", ["string status = pontuacao >= 70 ? \"Aprovado\" : \"Reprovado\";"], "Os dois-pontos separam as opções de resultado da expressão.", "string status = pontuacao >= 70 ? \"Aprovado\" ____ \"Reprovado\";"),
          o("Ordene as etapas de resolução de uma expressão ternária (valido ? Calcular() : Fallback()):", ["Avaliação da expressão booleana de teste (valido)","Se true: invocação e execução exclusiva do método Calcular()","Se false: invocação e execução exclusiva do método Fallback()","Entrega do resultado da ramificação selecionada para o chamador"], "Fluxo de execução condicional com o operador ternário em C#."),
          p("Associe a expressão ternária ao valor produzido se x vale 20:", [["x > 10 ? \"Alto\" : \"Baixo\"","Produz a string \"Alto\""],["x % 2 == 0 ? 1 : 0","Produz o número inteiro 1"],["x < 0 ? -1.0 : 1.0","Produz o valor decimal 1.0"],["x == 20 ? true : false","Produz o valor booleano true"]], "Avaliações de expressões condicionais ternárias em C#.")
        ]
      },
      {
        id: "csharp-c03-u6-l4",
        title: "Coalescência nula (??) e atribuição (??=)",
        subtitle: "Tratamento de nulos · Fornecendo valores padrão sem condicionais verbosas",
        theory: "O operador de coalescência nula (??) retorna o operando da esquerda se ele não for nulo; caso contrário, avalia e retorna o operando da direita. No C# 8+, o operador de atribuição de coalescência nula (??=) atribui o valor da direita à variável da esquerda apenas se ela for atualmente nula.",
        questions: [
          q("Como funciona o operador de coalescência nula (??) em: string resultado = nome ?? \"Anônimo\";?", "Se nome não for nulo, resultado recebe nome; se for nulo, resultado recebe \"Anônimo\"", ["Se nome for nulo, lança exceção","Converte nome para maiúsculas"], "Substitui com máxima elegância a expressão mais verbosa: nome != null ? nome : \"Anônimo\"."),
          q("O que faz o operador de atribuição de coalescência nula (??=) introduzido no C# 8?", "Atribui o valor da direita à variável da esquerda somente se a variável da esquerda for null", ["Atribui sempre em todos os casos","Compara se ambos são nulos"], "Ideal para inicialização preguiçosa (lazy initialization): lista ??= new List<string>();."),
          q("O operador ?? realiza avaliação de curto-circuito na expressão da direita?", "Sim; se a expressão da esquerda não for nula, a da direita nem sequer é avaliada ou executada", ["Não, a direita sempre roda","Apenas no modo release"], "Permite colocar chamadas custosas à direita: cache ?? BuscarNoBancoDeDados();."),
          q("Podemos encadear múltiplos operadores ?? em sequência?", "Sim; C# permite cadeias como a ?? b ?? c ?? \"padrão\", retornando o primeiro valor não nulo", ["Não, apenas um ?? por linha","Gera erro de compilação"], "Avalia da esquerda para a direita até encontrar a primeira referência válida."),
          t("Qual operador de dois caracteres atribui um valor à variável exclusivamente se ela for nula?", ["??="], "??= combina coalescência nula com atribuição.", "# operador de atribuicao de coalescencia"),
          g("Complete a inicialização de contingência segura usando coalescência nula:", ["string usuarioFinal = entrada ?? \"Convidado\";"], "?? fornece o fallback caso entrada seja null.", "string usuarioFinal = entrada ____ \"Convidado\";"),
          o("Ordene as etapas executadas na instrução lista ??= new List<int>();:", ["Avaliar se a variável lista possui valor diferente de null","Se lista não for null: ignorar a instanciação da direita e manter a lista atual","Se lista for null: executar new List<int>() alocando a lista na Heap","Atribuir a nova instância diretamente à variável lista"], "Mecânica do operador de atribuição de coalescência nula em C# 8+."),
          p("Associe o operador de coalescência ao seu caso de uso no código:", [["a ?? fallback","Fornece valor de contingência imediato para variáveis nulas"],["a ??= new Objeto()","Inicialização sob demanda evitando alocações redundantes"],["a ?? b ?? c","Cadeia de resolução de fallbacks em múltiplos níveis"],["Nullable<T> com ??","Extrai o valor primitivo ou assume o padrão seguro"]], "Padrões de uso do operador de coalescência nula em C#.")
        ]
      },
      {
        id: "csharp-c03-u6-l5",
        title: "O operador null-conditional (?. e ?[])",
        subtitle: "Navegação segura · Acessando membros e índices sem NullReferenceException",
        theory: "O operador condicional nulo (?.) aplica acesso a membros e métodos apenas se a referência não for nula. Se for nula, a avaliação para imediatamente e retorna null como expressão de curto-circuito. Combinado com ?[ ], permite acessar índices de arrays e dicionários com total segurança contra falhas.",
        questions: [
          q("O que acontece se executarmos: int? tamanho = cliente?.Nome?.Length; quando cliente for nulo?", "A expressão retorna null com total segurança sem disparar nenhuma exceção", ["Lança NullReferenceException","Ocorre erro de compilação"], "O operador ?. interrompe o encadeamento no primeiro elo nulo, avaliando a cadeia para null."),
          q("Qual é o tipo da variável resultante ao acessar uma propriedade Value Type com ?., como cliente?.Idade?", "int? (Nullable<int>), pois o resultado precisa ser capaz de representar o estado nulo", ["int primitivo","object"], "O compilador encapsula automaticamente tipos de valor em Nullable<T> ao navegar com ?.."),
          q("Como funciona o operador null-conditional aplicado a coleções e arrays (?[ ])?", "Acessa o elemento no índice especificado somente se a coleção não for nula: itens?[0]", ["Acessa apenas o último item","Verifica se o índice é par"], "Previne quebras caso a referência do array ou lista seja nula."),
          q("Como invocar delegates ou eventos com segurança em C# usando o operador ?.? e Invoke?", "evento?.Invoke(this, args);", ["if (evento) evento();","evento!();"], "Padrão canônico e thread-safe para disparo de eventos no .NET."),
          t("Qual operador de dois caracteres realiza acesso a membros nulo-seguro em C#?", ["?."], "?. acessa a propriedade apenas se a referência for válida.", "# operador null-conditional"),
          g("Complete o encerramento seguro combinando navegação nula com coalescência:", ["string cidade = usuario?.Endereco?.Cidade ?? \"Desconhecida\";"], "Combina ?. com ?? para fornecer fallback direto.", "string cidade = usuario?.Endereco?.Cidade ____ \"Desconhecida\";"),
          o("Ordene os passos de resolução da cadeia usuario?.Endereco?.Logradouro:", ["Testar se a referência da variável usuario é nula","Se usuario for nulo: abortar imediatamente e retornar null para toda a expressão","Se usuario for válido: acessar a propriedade Endereco e testar sua nulidade","Se Endereco for válido: acessar Logradouro e entregar o valor textual resultante"], "Fluxo de navegação segura com operador condicional nulo em C#."),
          p("Associe a construção de navegação à sua garantia de segurança:", [["obj?.Metodo()","Invoca o método exclusivamente se obj for uma referência válida"],["arr?[0]","Acessa o primeiro índice com segurança se o array não for nulo"],["handler?.Invoke()","Disparo seguro de eventos prevenindo falha de delegate nulo"],["expr?.Prop ?? fallback","Encadeamento de leitura segura com garantia de valor padrão"]], "Mecanismos de navegação defensiva contra nulos no .NET.")
        ]
      }
    ],
    7: [
      {
        id: "csharp-c03-u7-l1",
        title: "Nullable Value Types (T?) e a struct Nullable<T>",
        subtitle: "Nulidade em tipos de valor · Permitindo null em int, bool e DateTime",
        theory: "Por padrão, tipos de valor (Value Types) não aceitam null. O C# fornece a struct genérica System.Nullable<T>, abreviada pela sintaxe de interrogação T? (ex: int?, bool?). Isso permite representar valores opcionais ou ausentes em colunas de bancos de dados relacionais e payloads JSON sem perder a tipagem.",
        questions: [
          q("O que significa a sintaxe int? na declaração de uma variável em C#?", "É um alias conciso para a struct genérica System.Nullable<int>, permitindo valor inteiro ou null", ["É um ponteiro nativo de C++","É um array de inteiros"], "Nullable Value Types permitem que structs armazenem o estado ausente sem precisar virar classes na Heap."),
          q("Qual é o tamanho adicional que uma struct Nullable<T> adiciona na Stack em relação ao tipo original?", "Adiciona um campo booleano de flag interna indicando se há valor presente (hasValue)", ["Dobra o tamanho para 64 bits sempre","Não gasta nenhum bit extra"], "A struct armazena o valor T e um booleano HasValue, ocupando a memória de ambos mais alinhamento de bytes."),
          q("O que acontece se tentarmos atribuir null a uma variável int comum sem a interrogação?", "Erro de compilação: cannot convert null to \"int\" because it is a non-nullable value type", ["O C# atribui zero silenciosamente","O programa quebra em tempo de execução"], "C# impede por padrão que tipos de valor primitivos assumam estado nulo sem declaração explícita."),
          q("Como funciona o mecanismo de boxing no CLR quando um Nullable<T> sem valor (null) sofre boxing?", "O CLR não aloca caixa na Heap e retorna uma referência nula direta (null)", ["Aloca uma caixa contendo HasValue=false","Dispara exceção"], "Recurso especial do CLR: int? nulo sofre boxing como uma referência nula pura."),
          t("Qual símbolo de pontuação transforma um Value Type em seu equivalente anulável no C#?", ["?"], "A interrogação aposta ao tipo cria o Nullable<T>.", "# modificador anulavel de tipo de valor"),
          g("Complete a declaração do identificador opcional anulável:", ["int? codigoPromocional = null;"], "int? aceita tanto números inteiros quanto null.", "int____ codigoPromocional = null;"),
          o("Ordene as etapas de verificação de um Nullable Value Type na prática:", ["Declarar a variável como anulável com a sintaxe T? (ex: decimal? taxa)","Verificar se a variável possui valor através da propriedade taxa.HasValue","Se true: acessar o valor encapsulado com segurança via taxa.Value","Se false: assumir valor padrão de contingência ou acionar fluxo alternativo"], "Ciclo de controle e desempacotamento de Nullable Value Types."),
          p("Associe a declaração de tipo ao seu comportamento de nulidade no C#:", [["int x = 10;","Tipo de valor não anulável rejeitando null estritamente"],["int? x = null;","Nullable Value Type aceitando inteiros ou estado nulo"],["Nullable<DateTime>","Forma formal genérica equivalente a DateTime?"],["int? x = 0;","Variável com HasValue=true armazenando o valor zero"]], "Comparativo de nulidade em tipos de valor em C#.")
        ]
      },
      {
        id: "csharp-c03-u7-l2",
        title: "Membros de Nullable<T>: HasValue, Value e GetValueOrDefault",
        subtitle: "Extração segura · Evitando InvalidOperationException no acesso ao valor",
        theory: "A struct Nullable<T> expõe propriedades centrais: HasValue (booleano que indica presença de dado) e Value (retorna o valor subjacente T). Se Value for acessado quando HasValue for false, o CLR lança InvalidOperationException. O método GetValueOrDefault() extrai o dado ou o valor padrão do tipo com segurança.",
        questions: [
          q("Qual exceção o CLR lança ao acessar x.Value em uma variável int? x = null;?", "System.InvalidOperationException: Nullable object must have a value", ["System.NullReferenceException","System.ArgumentNullException"], "Tentar ler a propriedade Value sem conferir previamente HasValue é um erro clássico de runtime."),
          q("Qual é a função do método utilitário x.GetValueOrDefault() em um Nullable<T>?", "Retorna o valor subjacente se HasValue for true, ou o valor padrão do tipo (ex: 0 para int) se for null", ["Apaga a variável da memória","Lança exceção se for nulo"], "Garante que o código continue executando com um valor neutro seguro sem quebras de execução."),
          q("Como especificar um valor de contingência customizado caso o Nullable<T> seja nulo?", "Invocando x.GetValueOrDefault(valorPadrao) ou usando o operador de coalescência x ?? valorPadrao", ["Usando x.SetDefault()","Passando no construtor"], "Ambas as formas são idiomáticas no C# moderno para extração nulo-segura."),
          q("Qual propriedade booleana informa se a struct Nullable<T> contém um valor preenchido?", "HasValue", ["IsPresent","IsNotNull"], "HasValue retorna true se houver dado e false se a variável estiver nula."),
          t("Qual propriedade de Nullable<T> expõe o valor primitivo real encapsulado?", ["Value"], "Value entrega o dado original se HasValue for verdadeiro.", "# propriedade de valor de Nullable"),
          g("Complete a extração segura fornecendo o valor padrão caso a idade não tenha sido informada:", ["int idadeFinal = idadeInformada.GetValueOrDefault(18);"], "GetValueOrDefault retorna 18 se idadeInformada for nula.", "int idadeFinal = idadeInformada.____(18);"),
          o("Ordene as etapas defensivas para ler o valor de um campo Nullable<T>:", ["Testar a presença de dado com a propriedade booleana if (campo.HasValue)","Se confirmada a presença: ler a propriedade de valor primitivo campo.Value","Alternativamente: usar campo.GetValueOrDefault() em uma linha única","Processar a variável com garantia de tipagem concreta não anulável"], "Fluxo recomendado para desempacotar Nullable Value Types sem exceções."),
          p("Associe o membro de Nullable<T> à sua responsabilidade técnica:", [["HasValue","Propriedade booleana que sinaliza a presença de dado"],["Value","Retorna o dado subjacente ou lança InvalidOperationException se for nulo"],["GetValueOrDefault()","Retorna o dado real ou o valor zero padrão da struct"],["GetValueOrDefault(fallback)","Retorna o dado real ou o valor customizado especificado"]], "Membros da struct genérica System.Nullable<T> no .NET.")
        ]
      },
      {
        id: "csharp-c03-u7-l3",
        title: "Nullable Reference Types (NRT) e #nullable enable",
        subtitle: "Segurança estática · Transformando referências nulas em avisos de compilação",
        theory: "Introduzido no C# 8, o recurso Nullable Reference Types (NRT) analisa estaticamente referências a objetos. Com #nullable enable, string denota uma referência não anulável que nunca deve ser nula, enquanto string? explicita que o objeto pode ser nulo. O compilador Roslyn emite avisos ao detectar potenciais desreferenciamentos.",
        questions: [
          q("O que significa habilitar Nullable Reference Types (#nullable enable) em um projeto C#?", "O compilador passa a emitir avisos ao detectar referências que podem ser nulas sem checagem prévia", ["O Garbage Collector é desligado","A aplicação rejeita strings vazias"], "Ajuda a eliminar o lendário \"erro de um bilhão de dólares\" das referências nulas em tempo de compilação."),
          q("Qual é a diferença conceitual entre string e string? em código com NRT ativo?", "string garante em compilação que não é nula; string? alerta que pode conter null e exige validação", ["string? gasta mais memória na Heap","Não há diferença"], "Permite que a intenção de arquitetura sobre aceitar ou não nulos fique registrada no próprio contrato de tipos."),
          q("O recurso Nullable Reference Types altera o bytecode IL gerado ou a execução do CLR?", "Não; NRT é puramente estático em tempo de compilação, gerando apenas metadados de anotação de atributos", ["Sim, altera os opcodes do IL","Sim, cria structs adicionais"], "Não introduz sobrecarga em runtime e mantém 100% de compatibilidade regressiva com assemblies antigos."),
          q("Como habilitar Nullable Reference Types para todo o projeto .NET?", "Adicionando a tag <Nullable>enable</Nullable> dentro do arquivo .csproj", ["Escrevendo #enable no topo de cada classe","Instalando uma biblioteca externa"], "É o padrão recomendado pela Microsoft em todos os templates de projetos modernos do .NET 6+."),
          t("Qual diretiva de compilação ativa a verificação de Nullable Reference Types em um arquivo?", ["#nullable enable"], "#nullable enable ativa a checagem estática no arquivo.", "# diretiva de ativacao de NRT"),
          g("Complete a propriedade de modelo declarando o campo de email como estritamente obrigatório (não nulo):", ["public string Email { get; set; } = string.Empty;"], "Inicializar com string vazia satisfaz o compilador NRT.", "public ____ Email { get; set; } = string.Empty;"),
          o("Ordene as reações do compilador Roslyn com NRT ativo para a linha: string s = null;:", ["Detecção de que a variável s foi declarada como string não anulável","Identificação de que a expressão de atribuição é o literal null","Emissão do aviso de compilação CS8600 (Converting null literal to non-nullable reference)","Geração do assembly compilado mantendo os avisos para correção pelo autor"], "Mecanismo de análise estática do compilador com NRT habilitado."),
          p("Associe a anotação de tipo ao seu contrato no contexto de NRT habilitado:", [["string Nome","Referência que nunca deve conter valor nulo"],["string? Apelido","Referência opcional que explicitamente pode ser nula"],["<Nullable>enable</Nullable>","Configuração global do projeto no arquivo .csproj"],["Aviso CS8602","Alerta de compilação sobre possível desreferenciamento de referência nula"]], "Contratos de nulidade estática com Nullable Reference Types em C#.")
        ]
      },
      {
        id: "csharp-c03-u7-l4",
        title: "O operador null-forgiving (!) e supressão de avisos",
        subtitle: "Diretiva do desenvolvedor · Informando ao compilador que um valor não é nulo",
        theory: "O operador null-forgiving (o ponto de exclamação pós-fixado !) instrui o compilador Roslyn a suprimir avisos de potencial nulidade em um local específico (ex: item!.Nome). Ele atua exclusivamente como uma diretiva de análise estática, devendo ser usado apenas quando o desenvolvedor tem certeza absoluta da não-nulidade.",
        questions: [
          q("Qual é a finalidade do operador null-forgiving (!) em C#?", "Suprimir avisos de nulidade do compilador quando o desenvolvedor sabe por lógica externa que o valor não é nulo", ["Lançar exceção se for nulo","Converter null em string vazia"], "Informa ao analisador do compilador: \"confie em mim, esta variável não será nula neste ponto\"."),
          q("O que acontece em tempo de execução se uma variável contendo null usar o operador ! e for desreferenciada?", "A JVM/.NET lança System.NullReferenceException normalmente, pois ! não adiciona verificações em runtime", ["O CLR ignora a chamada","O programa congela"], "O operador ! é puramente estático; ele desliga o aviso do compilador, mas não protege o runtime."),
          q("Em qual contexto o operador null-forgiving é amplamente utilizado como padrão legítimo?", "Na inicialização tardia de propriedades por frameworks de injeção de dependência ou ORMs como Entity Framework", ["Em cálculos matemáticos","Para concatenar strings"], "Por exemplo: public DbSet<Usuario> Usuarios { get; set; } = null!; onde o ORM injetará a instância em runtime."),
          q("Por que o uso indiscriminado do operador ! deve ser evitado em código de negócio?", "Porque mascara defeitos reais e neutraliza a segurança proporcionada pelos Nullable Reference Types", ["Porque deixa a aplicação 50% mais lenta","Porque gera multithread"], "Se usado sem critério, reintroduz exceções de ponteiro nulo em tempo de execução que o NRT buscava evitar."),
          t("Qual símbolo de caractere único pós-fixado atua como operador null-forgiving em C#?", ["!"], "O ponto de exclamação pós-fixado suprime o aviso de nulo.", "# operador null-forgiving"),
          g("Complete a supressão do aviso na propriedade injetada pelo framework:", ["public DbContext Contexto { get; set; } = null!;"], "null! sinaliza que o valor será atribuído antes do uso.", "public DbContext Contexto { get; set; } = null____;"),
          o("Ordene as alternativas para resolver um aviso de nulidade da melhor para a pior prática:", ["Adicionar uma verificação defensiva de guarda: if (item == null) return;","Fornecer um valor padrão com o operador de coalescência: item ?? novoItem","Anotar o tipo de retorno do método como anulável: string?","Usar o operador null-forgiving (!) suprimindo o aviso sem validação real"], "Hierarquia de boas práticas para tratamento de avisos de nulidade em C#."),
          p("Associe a construção ao seu efeito na checagem do compilador:", [["variavel!","Informa ao compilador para ignorar o risco de nulidade naquele ponto"],["if (v is not null)","Provoca smart-cast automático do compilador tratando v como não-nula"],["throw new ArgumentNullException()","Informa ao compilador que caminhos subsequentes têm certeza de não-nulo"],["null!","Padrão aceito para inicializadores de campos gerenciados por DI/ORM"]], "Mecanismos de interação com o analisador de nulidade do C#.")
        ]
      },
      {
        id: "csharp-c03-u7-l5",
        title: "Defesa contra nulos: ArgumentNullException.ThrowIfNull",
        subtitle: "Fail-Fast moderno · Cláusulas de guarda padronizadas no .NET 6+",
        theory: "No .NET 6+, a Microsoft introduziu o método estático ArgumentNullException.ThrowIfNull(argumento). Ele inspeciona a referência recebida e lança ArgumentNullException imediatamente se for nula, capturando o nome do parâmetro automaticamente via atributos de CallerArgumentExpression sem alocações extras.",
        questions: [
          q("Qual é a forma moderna e padronizada no .NET 6+ para validar argumentos nulos no início de um método?", "ArgumentNullException.ThrowIfNull(parametro);", ["if (param == null) throw;","Assert.NotNull(param);"], "Substitui o código boilerplate tradicional por uma linha única altamente otimizada."),
          q("Como o método ThrowIfNull sabe o nome exato do parâmetro passado sem que precisemos digitá-lo como string?", "Através do atributo de metadados [CallerArgumentExpression] resolvido pelo compilador Roslyn", ["Por reflexão em tempo de execução","Pelo depurador da IDE"], "O compilador injeta automaticamente o nome do identificador como literal textual no bytecode."),
          q("Qual é o benefício de adotar ThrowIfNull em relação a deixar a aplicação lançar NullReferenceException espontaneamente?", "Aplica o princípio Fail-Fast identificando o parâmetro exato de entrada que originou a falha na borda", ["Faz o programa continuar rodando","Cria logs em arquivo XML"], "NullReferenceException aponta para o meio de uma rotina; ArgumentNullException indica o contrato violado na entrada."),
          q("ArgumentException.ThrowIfNullOrWhiteSpace também está disponível no .NET 8+ para strings?", "Sim; o .NET 8 adicionou ThrowIfNullOrWhiteSpace e ThrowIfNullOrEmpty diretamente em ArgumentException", ["Não, apenas para tipos inteiros","Apenas em pacotes NuGet pagos"], "Permite validar strings completas com uma única instrução concisa e padronizada."),
          t("Qual método estático de ArgumentNullException substitui verificações de guarda manuais no .NET 6+?", ["ThrowIfNull"], "ThrowIfNull valida e lança a exceção se o argumento for nulo.", "# metodo estatico de validacao de nulo"),
          g("Complete a cláusula de guarda moderna no início do construtor:", ["public Pedido(Cliente cliente) {\n    ArgumentNullException.ThrowIfNull(cliente);\n    this.cliente = cliente;\n}"], "ThrowIfNull valida o argumento em uma linha limpa.", "public Pedido(Cliente cliente) {\n    ArgumentNullException.____(cliente);\n    this.cliente = cliente;\n}"),
          o("Ordene as etapas executadas pelo método ArgumentNullException.ThrowIfNull(arg):", ["Avaliação da referência do parâmetro recebido no início do método","Se o argumento não for nulo: prosseguir imediatamente para a linha seguinte","Se for nulo: capturar o nome do identificador da expressão de chamada","Instanciar e disparar System.ArgumentNullException com mensagem padronizada"], "Fluxo operacional de validação de argumentos nulos no .NET moderno."),
          p("Associe o método de validação ao tipo de checagem que ele executa:", [["ArgumentNullException.ThrowIfNull","Valida se o argumento passado é estritamente nulo"],["ArgumentException.ThrowIfNullOrWhiteSpace","Valida se uma string é nula, vazia ou apenas espaços"],["ArgumentOutOfRangeException.ThrowIfNegative","Valida se um número inteiro ou decimal é menor que zero"],["ArgumentOutOfRangeException.ThrowIfZero","Valida se um valor numérico é igual a zero"]], "Métodos estáticos modernos de validação de argumentos no .NET.")
        ]
      }
    ],
    8: [
      {
        id: "csharp-c03-u8-l1",
        title: "Sanitização de strings recebidas e parsing defensivo",
        subtitle: "Segurança na borda · Sanitizando payloads antes da deserialização de tipos",
        theory: "Dados textuais recebidos de APIs ou formulários podem conter espaços indevidos, caracteres invisíveis ou nulos. A pipeline defensiva de entrada aplica Trim(), valida comprimentos mínimos/máximos e utiliza métodos TryParse com cultura invariante (CultureInfo.InvariantCulture) para evitar erros de pontuação decimal.",
        questions: [
          q("Por que é essencial usar CultureInfo.InvariantCulture ao analisar números decimais em APIs web?", "Para garantir que o ponto (.) seja interpretado uniformemente como separador decimal, independentemente da cultura do servidor", ["Para acelerar a CPU","Para traduzir para o inglês"], "Se o servidor rodar em cultura pt-BR, \"10.50\" pode ser interpretado como 1050 se a cultura não for invariante."),
          q("Qual método de parsing numérico aceita a especificação explícita de formato e cultura?", "decimal.TryParse(texto, NumberStyles.Number, CultureInfo.InvariantCulture, out var valor)", ["decimal.Convert(texto)","decimal.FromString(texto)"], "Permite controle cirúrgico sobre sinais negativos, separadores decimais e espaços."),
          q("Qual é o primeiro passo recomendado ao receber um campo de texto não sanitizado em um endpoint?", "Aplicar .Trim() para remover espaços nas bordas e verificar se a string resultante não é vazia", ["Salvar imediatamente no banco de dados","Criptografar sem inspecionar"], "Previne que nomes compostos apenas por espaços passem em cadastros e filtros."),
          q("Qual classe utilitária do namespace System.Text.RegularExpressions auxilia na sanitização de formatos?", "Regex (ou os novos métodos estáticos gerados com [GeneratedRegex] no C# 7+ / .NET 7+)", ["StringValidator","TextFormatter"], "[GeneratedRegex] compila a expressão regular em tempo de build com alta performance e zero alocação."),
          t("Qual classe estática do namespace System.Globalization garante formato numérico universal independente da região?", ["CultureInfo.InvariantCulture"], "InvariantCulture padroniza separadores decimais.", "# cultura neutra invariante"),
          g("Complete o parsing numérico defensivo usando cultura neutra universal:", ["decimal.TryParse(entrada, NumberStyles.Number, CultureInfo.InvariantCulture, out decimal preco);"], "InvariantCulture garante leitura uniforme do ponto decimal.", "decimal.TryParse(entrada, NumberStyles.Number, CultureInfo.____, out decimal preco);"),
          o("Ordene as etapas da esteira de higienização de dados de formulário recebidos em C#:", ["Verificar nulidade prévia com if (string.IsNullOrWhiteSpace(dado))","Sanitizar espaços residuais com dado = dado.Trim()","Validar conformidade com limites de tamanho mínimo e máximo do contrato","Executar parsing tipado com TryParse utilizando CultureInfo.InvariantCulture"], "Pipeline padrão de higienização e conversão de dados na borda da aplicação."),
          p("Associe o parâmetro de formatação à sua função no parsing de dados:", [["CultureInfo.InvariantCulture","Padroniza ponto como separador decimal universal"],["NumberStyles.Number","Permite sinais positivos, negativos e casas fracionárias"],["StringSplitOptions.RemoveEmptyEntries","Descarta segmentos vazios ao separar listas textuais"],["StringComparison.Ordinal","Comparação binária exata caractere a caractere de alta velocidade"]], "Componentes de parsing e normalização de dados no .NET.")
        ]
      },
      {
        id: "csharp-c03-u8-l2",
        title: "Validação de limites numéricos e regras de negócio",
        subtitle: "Integridade de domínio · Checagem de faixas, limites e invariantes contratuais",
        theory: "Dados numéricos sanitizados devem ser validados contra as regras de negócio antes de alcançar a camada de persistência. Em C#, utilizamos comparações de faixa com pattern matching ou métodos defensivos para garantir que valores monetários sejam estritamente positivos, estoques não fiquem negativos e idades sejam plausíveis.",
        questions: [
          q("Como expressar a validação de que uma quantidade de itens deve ser um inteiro entre 1 e 99 usando Pattern Matching?", "if (quantidade is >= 1 and <= 99)", ["if (1 <= quantidade <= 99)","if (quantidade in 1..99)"], "Pattern matching moderno torna a validação de faixas expressiva e imune a erros de operador."),
          q("Por que quantias monetárias de transações financeiras devem ser estritamente maiores que zero (valor > 0m)?", "Para impedir ataques de saldo reverso e transferências de magnitude negativa que corrompem caixas", ["Porque o tipo decimal não aceita números negativos","Para gastar menos memória"], "Valores negativos em endpoints de depósito ou compra configuram graves vulnerabilidades de segurança financeira."),
          q("Qual exceção deve ser lançada se um argumento numérico violar os limites válidos permitidos?", "System.ArgumentOutOfRangeException", ["System.IndexOutOfRangeException","System.InvalidCastException"], "ArgumentOutOfRangeException documenta que o valor está fora do intervalo estipulado pela regra."),
          q("Como simplificar a validação de valores estritamente positivos no .NET 8+?", "ArgumentOutOfRangeException.ThrowIfNegativeOrZero(valor);", ["Argument.ValidatePositive(valor);","Check.Positive(valor);"], "Método de guarda embutido de alta performance para validação contratual instantânea."),
          t("Qual exceção padronizada do .NET deve ser disparada quando um número viola os limites de faixa esperados?", ["ArgumentOutOfRangeException"], "ArgumentOutOfRangeException sinaliza limites violados.", "# excecao de argumento fora de faixa"),
          g("Complete a validação que assegura um preço financeiro estritamente positivo:", ["if (preco <= 0m) {\n    throw new ArgumentOutOfRangeException(nameof(preco), \"O preço deve ser positivo.\");\n}"], "Rejeita valores nulos ou negativos com exceção descritiva.", "if (preco <= 0m) {\n    throw new ____(nameof(preco), \"O preço deve ser positivo.\");\n}"),
          o("Ordene as etapas para validar uma solicitação de pagamento antes da cobrança:", ["Validar se o objeto da requisição não é nulo com ThrowIfNull","Conferir se o valor da cobrança é estritamente maior que zero (valor > 0m)","Validar se a data de expiração do meio de pagamento é estritamente futura","Prosseguir para a execução da transação no gateway financeiro"], "Fluxo de verificação de regras de negócio em operações financeiras no .NET."),
          p("Associe a regra de negócio ao seu predicado de validação em C#:", [["Valor estritamente positivo","valor > 0m garantindo ausência de quantias nulas ou inversas"],["Faixa percentual de 0 a 100","taxa is >= 0m and <= 100m delimitando limites percentuais"],["Idade de consentimento comercial","idade >= 18 delimitando maioridade legal"],["Estoque não negativo","estoque >= 0 assegurando integridade física de inventário"]], "Padrões de validação de regras de domínio em sistemas .NET.")
        ]
      },
      {
        id: "csharp-c03-u8-l3",
        title: "Tuplas leves (ValueTuple) e múltiplos retornos",
        subtitle: "Composição de dados · Retornando status e dados sem alocar classes efêmeras",
        theory: "Desde o C# 7, ValueTuple (System.ValueTuple) oferece suporte a tuplas com nomes de campos: (bool Sucesso, string Erro, decimal Valor). Por serem Value Types alocados na Stack, elas eliminam o custo de alocação de classes descartáveis na Heap e tornam métodos de validação expressivos e performáticos.",
        questions: [
          q("Qual é a principal diferença entre a antiga classe Tuple e a moderna ValueTuple do C# 7+?", "ValueTuple é uma struct alocada na Stack com nomes de campos; Tuple era uma class alocada na Heap", ["ValueTuple aceita apenas dois elementos","Não há diferença"], "ValueTuple é muito mais rápida e não sobrecarrega o Garbage Collector com pequenos objetos transitórios."),
          q("Como desestruturar uma tupla retornada por um método em variáveis locais independentes?", "var (sucesso, erro, valor) = Validar(entrada);", ["var tupla = Unpack(Validar());","Validar().Deconstruct();"], "A desestruturação atribui os elementos da tupla diretamente a novas variáveis com facilidade."),
          q("Como definir nomes expressivos para os elementos no tipo de retorno de um método?", "public (bool Valido, string Motivo) ValidarEntrada(string texto)", ["public Tuple<bool, string> ValidarEntrada(string texto)","public ValueTuple ValidarEntrada()"], "Nomes descritivos facilitam o consumo da tupla pelos chamadores do método sem ambiguidade."),
          q("O que é o operador de descarte (_) ao consumir tuplas desestruturadas?", "Um identificador que descarta um elemento da tupla que o chamador não tem interesse em utilizar", ["Uma variável de número inteiro","Um comando que apaga a tupla"], "Permite ignorar campos secundários: var (sucesso, _, total) = Calcular();."),
          t("Qual estrutura de tipos de valor do .NET dá suporte às tuplas modernas com nomes de campos?", ["ValueTuple"], "System.ValueTuple armazena tuplas diretamente na Stack.", "# estrutura de tuplas na Stack"),
          g("Complete a assinatura de método retornando uma tupla nomeada de validação:", ["public (bool Sucesso, string Mensagem) Validar(string codigo)"], "Tuplas nomeadas documentam claramente o retorno do método.", "public (bool Sucesso, string Mensagem) Validar(____ codigo)"),
          o("Ordene as etapas da criação e consumo de um método validador baseado em ValueTuple:", ["Definir a assinatura do método especificando os nomes dos elementos da tupla de retorno","Avaliar as regras de negócio internas no corpo do método","Retornar a tupla de valores literais: return (true, \"Validação concluída com sucesso\")","Desestruturar o retorno no chamador com var (sucesso, msg) = Validar()"], "Ciclo operacional de métodos que utilizam ValueTuple para múltiplos retornos."),
          p("Associe a construção de tuplas à sua função em C#:", [["(bool Ok, int Id)","Assinatura com campos nomeados autoexplicativos"],["var (ok, id) = Obter()","Desestruturação direta em variáveis locais"],["var (ok, _) = Obter()","Descarte deliberado do segundo elemento da tupla"],["(1, \"Texto\", 9.9m)","Literal de tupla com inferência automática de tipos"]], "Sintaxe e uso de ValueTuples no C# moderno.")
        ]
      },
      {
        id: "csharp-c03-u8-l4",
        title: "O padrão Result<T> para fluxos sem exceções",
        subtitle: "Arquitetura funcional · Retornando sucesso ou erro tipado como valor de domínio",
        theory: "O padrão Result<T> encapsula o resultado de uma operação em um objeto que indica explicitamente sucesso ou falha, acompanhado do valor produzido ou da mensagem de erro. Essa abordagem substitui o disparo de exceções em regras de negócio previsíveis, melhorando dramaticamente a performance e clareza do fluxo.",
        questions: [
          q("Qual é o problema arquitetural de usar exceções para controlar regras de negócio previsíveis?", "Exceções são ordens de grandeza mais lentas, poluem telemetria e tratam casos normais como falhas catastróficas", ["O C# limita o número de exceções a 10 por dia","Exceções apagam as variáveis"], "Exceções devem ser reservadas para condições excepcionais reais (ex: servidor fora do ar, disco cheio)."),
          q("O que compõe uma estrutura canônica do padrão Result<T> em C#?", "Uma propriedade booleana IsSuccess, um campo de valor T Value e um campo de erro ou lista de erros", ["Apenas uma string com o código de status","Um número inteiro de erro do Windows"], "Permite que o chamador inspecione if (result.IsSuccess) e processe o valor ou trate os erros documentados."),
          q("Como o padrão Result<T> melhora a manutenibilidade de APIs e controladores em ASP.NET Core?", "Permite mapear retornos de forma determinística: 200 OK com Value ou 400 Bad Request com lista de erros", ["Substitui o banco de dados SQL","Faz a API rodar offline"], "Torna o fluxo de resposta da API explícito, legível e livre de blocos try-catch genéricos."),
          q("Como implementar um Result imutável e eficiente em C#?", "Usando readonly struct Result<T> para não gerar alocações adicionais na Heap em chamadas de alto volume", ["Usando variáveis globais static","Criando uma interface vazia"], "Structs imutáveis reduzem a zero o impacto no Garbage Collector para operações frequentes."),
          t("Qual propriedade booleana do padrão Result sinaliza que a operação foi bem-sucedida?", ["IsSuccess"], "IsSuccess indica que o valor de domínio está pronto para consumo.", "# propriedade de sucesso do padrao Result"),
          g("Complete a verificação do padrão Result antes de processar o pagamento:", ["var resultado = Processar(pagamento);\nif (resultado.IsSuccess) {\n    EmitirNota(resultado.Value);\n}"], "Value só deve ser acessado se IsSuccess for true.", "var resultado = Processar(pagamento);\nif (resultado.____) {\n    EmitirNota(resultado.Value);\n}"),
          o("Ordene o fluxo de execução de um serviço de cadastro modelado com o padrão Result<T>:", ["Receber o comando de cadastro contendo os dados brutos informados pelo cliente","Executar regras de validação retornando Result.Failure(\"Email inválido\") se falhar","Persistir a nova entidade no repositório em caso de conformidade plena","Retornar Result.Success(novoCliente) sinalizando conclusão com êxito"], "Arquitetura de processamento de domínio orientada ao padrão Result."),
          p("Associe o componente do padrão Result ao seu papel no sistema:", [["Result.Success(valor)","Fábrica estática produzindo resultado positivo com dado encapsulado"],["Result.Failure(erro)","Fábrica estática produzindo resultado com motivo da rejeição"],["resultado.IsSuccess","Predicado booleano para roteamento condicional no chamador"],["resultado.Error","Descrição amigável da falha para consumo de logs ou interface"]], "Elementos centrais do padrão de projeto Result em C#/.NET.")
        ]
      },
      {
        id: "csharp-c03-u8-l5",
        title: "Projeto integrado: validador e normalizador de transações",
        subtitle: "Aplicação prática completa · Tipos primitivos, operadores, nulos e padrão Result",
        theory: "Neste projeto prático, construímos um motor profissional de ingestão, sanitização e validação de transações comerciais em C#. Aplicamos tipos primitivos exatos (decimal, long), desconstrução de tuplas, verificação estrita de nulidade com ThrowIfNull e retorno com o padrão Result, entregando código de alta resiliência.",
        questions: [
          q("Por que a quantia monetária da transação deve ser modelada estritamente como decimal e não double?", "Para garantir conformidade fiscal exata até o último centavo sem perdas por representação binária", ["Porque double não compila em C#","Para economizar memória na Stack"], "Aplicações comerciais e bancárias auditáveis exigem determinismo em base 10 absoluto."),
          q("Como tratar o identificador de referência externa opcional da transação no contrato da classe?", "Declarando como string? com anotação de nulidade explícita e aplicando fallback se necessário", ["Declarando como object","Proibindo o campo"], "Garante que os consumidores saibam com clareza em tempo de compilação que o campo pode ser omitido."),
          q("Qual técnica é utilizada para higienizar a descrição textual da transação removendo espaços e limitando tamanho?", "descricao?.Trim() combinado com operador de coalescência e checagem de comprimento máximo", ["Usar Convert.ToInt32","Apagar a descrição"], "Protege o banco de dados contra estouros de coluna VARCHAR e entradas maliciosas."),
          q("Qual benefício arquitetural uma camada de normalização isolada traz para o sistema corporativo?", "Isola o núcleo de regras de negócio das inconsistências e formatos imperfeitos de fontes externas", ["Evita o uso de classes","Acelera a placa de vídeo"], "Garante que entidades de domínio sempre operem sobre dados garantidamente válidos e auditados."),
          t("Qual tipo de dado de 128 bits do C# deve representar montantes financeiros neste motor contábil?", ["decimal"], "decimal é o tipo padrão para grandezas monetárias no .NET.", "# tipo numerico financeiro de 128 bits"),
          g("Complete a emissão do resultado de sucesso com a transação normalizada:", ["return Result<Transacao>.Success(transacaoValida);"], "Retorna o objeto encapsulado em padrão Result positivo.", "return Result<Transacao>.____(transacaoValida);"),
          o("Ordene as etapas da pipeline completa do motor de ingestão de transações em C#:", ["Validar nulidade da requisição bruta recebida com ArgumentNullException.ThrowIfNull","Sanitizar campos de texto com Trim e verificar limites com pattern matching numérico","Converter datas e moedas garantindo cultura universal com CultureInfo.InvariantCulture","Construir a entidade de domínio imutável e retornar Result.Success(entidade)"], "Pipeline completa de ingestão, normalização e validação de transações financeiras."),
          p("Associe a ferramenta ao seu papel na construção do motor de transações:", [["decimal valor","Precisão de 128 bits para cálculos monetários e alíquotas fiscais"],["ThrowIfNull","Barreira defensiva imediata contra referências nulas na entrada"],["Result<T>","Comunicação tipada de desfecho sem uso de exceções em regras de negócio"],["CultureInfo.InvariantCulture","Garantia de leitura uniforme de separadores decimais"]], "Componentes integrados do motor de validação e normalização em C#.")
        ]
      }
    ]
  });
})();
