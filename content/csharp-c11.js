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
  const chId = "csharp-c11";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "csharp-c11-u1-l2-universo-ienumerable-e-a-revolucao-do-linq",
        title: "O universo IEnumerable<T> e a revolução funcional do LINQ",
        subtitle: "Consultas integradas · Como o LINQ unificou coleções em memória, bancos e XML no C#",
        theory: "No C# 3.0, o Language Integrated Query (LINQ) transformou a manipulação de dados ao introduzir operadores funcionais universais sobre a interface IEnumerable<T>. Seja sobre arrays, listas, tabelas de banco de dados ou documentos XML, o LINQ provê uma sintaxe unificada, tipada e verificada pelo compilador.",
        questions: [
          q("Qual interface fundamental do ecossistema .NET viabiliza a execução de consultas LINQ em memória?", "IEnumerable<T>", ["ICollection","IComparable"], "IEnumerable<T> define o contrato universal de iteração sequencial que alimenta os operadores LINQ."),
          q("Qual é o grande benefício do LINQ em relação a loops foreach tradicionais com acumuladores manuais?", "Substitui algoritmos imperativos verbosos por consultas declarativas concisas, legíveis e imutáveis", ["Faz o processador gastar menos energia","Elimina a necessidade de tipos de dados"], "Consultas declarativas expressam \"o que\" desejamos obter em vez de \"como\" iterar manualmente."),
          q("Qual namespace do .NET deve ser importado para disponibilizar os métodos de extensão do LINQ?", "System.Linq", ["System.Collections","System.Data"], "O namespace System.Linq contém os métodos estáticos de extensão que operam sobre IEnumerable<T>."),
          q("O compilador do C# verifica a tipagem dos dados e das propriedades dentro de consultas LINQ?", "Sim; o LINQ é fortemente tipado em tempo de compilação, prevenindo erros de digitação de nomes de campos", ["Não, consultas LINQ são strings dinâmicas","Apenas se o código rodar no Windows"], "A verificação estática do compilador impede que nomes de colunas incorretos cheguem a produção."),
          t("Qual interface genérica padrão representa sequências iteráveis que suportam operadores LINQ?", ["IEnumerable"], "IEnumerable<T> é o contrato base para todas as sequências consultáveis em C#."),
          g("Complete o namespace essencial para liberar os operadores de consulta LINQ:", ["Linq"], "System.Linq disponibiliza os operadores de extensão.", "using System.____;"),
          o("Ordene a evolução do tratamento de coleções no C# até o advento do LINQ:", ["Laços for manuais indexados e checagens de limites de arrays no C# 1.0","Laços foreach com coleções genéricas fortemente tipadas no C# 2.0","Introdução de métodos de extensão e expressões lambda no C# 3.0","Operadores funcionais declarativos com LINQ unificando consultas a dados"], "Loops manuais for, foreach tipado, métodos de extensão/lambdas e revolução LINQ."),
          p("Associe o componente do LINQ ao seu papel arquitetural:", [["IEnumerable<T>","Contrato universal de sequências iteráveis em memória"],["System.Linq","Namespace com métodos de extensão para filtragem e projeção"],["Expressão Declarativa","Sintaxe que descreve o resultado desejado sem loops manuais"],["Tipagem Estática","Garantia em tempo de compilação de que tipos e membros são válidos"]], "Compreender o papel do LINQ transforma a forma de pensar e manipular coleções em C# moderno.")
        ]
      },
      {
        id: "csharp-c11-u1-l3-sintaxe-de-metodo-vs-sintaxe-de-consulta",
        title: "Sintaxe de método (Method Syntax) vs Sintaxe de consulta (Query Syntax)",
        subtitle: "Dois estilos de escrita · Expressões fluentes com lambdas vs cláusulas from ... in ... select",
        theory: "O C# oferece duas formas equivalentes de escrever LINQ: a Sintaxe de Consulta (estilo declarativo similar a SQL: from c in clientes where c.Ativo select c.Nome) e a Sintaxe de Método (chamadas fluentes de extensão com lambdas: clientes.Where(c => c.Ativo).Select(c => c.Nome)). Ambas geram o mesmo código.",
        questions: [
          q("Qual é a diferença de desempenho entre a Sintaxe de Método e a Sintaxe de Consulta no LINQ?", "Nenhuma; o compilador do C# traduz internamente a Sintaxe de Consulta em chamadas da Sintaxe de Método", ["A Sintaxe de Método é dez vezes mais rápida","A Sintaxe de Consulta gasta menos memória"], "A Sintaxe de Consulta é apenas uma camada de açúcar sintático (syntactic sugar) sobre a Sintaxe de Método."),
          q("Qual estilo de escrita é amplamente predominante na indústria e na documentação moderna de C#?", "Sintaxe de Método (Method Syntax) com encadeamento de métodos e lambdas", ["Sintaxe de Consulta antiga","Código em assembly embutido"], "A sintaxe fluente de métodos encadeados é mais flexível e cobre todos os operadores existentes."),
          q("Quais operadores do LINQ só podem ser utilizados através da Sintaxe de Método?", "Operadores como Take, Skip, Distinct, Reverse, ToList e agregações como Sum e Count", ["Where e Select","OrderBy e GroupBy"], "Muitos operadores essenciais não possuem palavras-chave reservadas na Sintaxe de Consulta."),
          q("Qual palavra-chave abre obrigatoriamente qualquer expressão na Sintaxe de Consulta do C#?", "from", ["select","where"], "Toda consulta na sintaxe de query inicia com a cláusula \"from variavel in colecao\"."),
          t("Qual cláusula inicia uma consulta escrita no estilo Query Syntax do LINQ?", ["from"], "from declara a fonte de dados e a variável de iteração no estilo SQL."),
          g("Complete a consulta em Query Syntax projetando apenas os nomes dos clientes:", ["select"], "select define a projeção final da consulta.", "var nomes = from c in clientes where c.Ativo ____ c.Nome;"),
          o("Ordene a estrutura canônica de uma consulta na Sintaxe de Consulta (Query Syntax):", ["from item in lista: identificação da fonte de dados e variável local","where item.Preco > 50: aplicação do predicado de filtragem","orderby item.Nome: especificação da ordenação desejada","select item.Nome: projeção do resultado final da sequência"], "from, where, orderby e select compõem a estrutura formal da query."),
          p("Associe o estilo de escrita LINQ à sua característica técnica:", [["Sintaxe de Consulta","Estilo declarativo inspirado em SQL (from x in col where ... select)"],["Sintaxe de Método","Encadeamento fluente com lambdas (.Where(...).Select(...))"],["Açúcar Sintático","Tradução automática que o compilador faz da query para métodos"],["Operadores Exclusivos","Métodos como Take, Skip e ToList disponíveis só na sintaxe fluente"]], "Dominar ambos os estilos permite ler códigos legados e escrever implementações fluentes modernas.")
        ]
      },
      {
        id: "csharp-c11-u1-l4-metodos-de-extensao-e-expressao-lambda",
        title: "Métodos de extensão e expressões lambda como alicerces do LINQ",
        subtitle: "Mecânica interna · Como a palavra-chave this em parâmetros estáticos viabiliza a fluência",
        theory: "A magia do LINQ repousa em dois pilares do C#: Métodos de Extensão e Expressões Lambda. Métodos estáticos declarados com \"this IEnumerable<T> source\" acoplam-se como se fossem membros nativos da coleção, recebendo delegates Func<T, bool> e viabilizando chamadas fluentes e limpas.",
        questions: [
          q("Como a linguagem C# viabiliza que métodos como .Where() pareçam pertencer à interface IEnumerable<T>?", "Através de Métodos de Extensão estáticos que utilizam o modificador \"this\" no primeiro parâmetro", ["Através de herança múltipla de classes","Através de reflexão lenta em tempo de execução"], "O modificador \"this\" permite estender tipos existentes sem alterar o código-fonte original."),
          q("Qual delegate padrão do .NET é recebido pelo método de extensão .Where() para filtragem?", "System.Func<T, bool> (uma função que recebe o elemento T e devolve um booleano)", ["System.Action<T>","System.Predicate<string>"], "Func<T, bool> é o contrato universal de predicados em coleções genéricas no .NET."),
          q("Qual é a sintaxe de expressão lambda simplificada para verificar se o preço é maior que 100?", "x => x.Preco > 100", ["x -> x.Preco > 100","function(x) { return x.Preco > 100; }"], "O operador lambda \"=>\" (lê-se \"vai para\") conecta o argumento à expressão de retorno."),
          q("Métodos de extensão do LINQ modificam a coleção de dados original?", "Não; operadores LINQ são puros e nunca modificam a coleção de origem, retornando uma nova sequência", ["Sim, removem os elementos que não casam","Apenas quando usamos ToList()"], "A pureza funcional preserva a integridade da lista original contra mutações indesejadas."),
          t("Qual modificador no primeiro parâmetro de um método estático o transforma em método de extensão?", ["this"], "O modificador this associa a função como método de extensão do tipo informado."),
          g("Complete o operador de expressão lambda que liga o parâmetro ao corpo da função:", ["=>"], "O operador => define a expressão lambda.", "var ativos = itens.Where(x ____ x.Ativo);"),
          o("Ordene as etapas de resolução de um método de extensão pelo compilador C#:", ["O desenvolvedor escreve a chamada fluente: lista.Where(x => x > 0)","O compilador verifica se o tipo da lista possui o método Where internamente","Ao não encontrar membro de instância, procura em classes estáticas no escopo do using System.Linq","Reescreve internamente a chamada estática: Enumerable.Where(lista, x => x > 0)"], "Chamada fluente, checagem de instância, busca de extensão e reescrita estática."),
          p("Associe o recurso da linguagem ao seu papel no LINQ:", [["Método de Extensão","Adiciona operadores como Where e Select em interfaces já existentes"],["Modificador this","Sintaxe que marca o primeiro parâmetro como alvo da extensão"],["Operador Lambda (=>)","Expressão concisa para passar lógica de predicados e projeções"],["Imutabilidade Funcional","Garantia de que a fonte original de dados permanece inalterada"]], "A elegância do LINQ resulta da combinação perfeita entre métodos de extensão e lambdas.")
        ]
      },
      {
        id: "csharp-c11-u1-l5-composicao-fluente-de-pipelines-de-dados",
        title: "Composição fluente de pipelines de transformação de dados",
        subtitle: "Código limpo · Encadeando filtros, transformações e limites em esteiras legíveis",
        theory: "A grande força do LINQ reside na composição: encadeamos operadores formando esteiras de processamento declarativas: dados.Where(...).OrderBy(...).Select(...).Take(10). Cada etapa alimenta a próxima como um fluxo de água, tornando regras de negócio legíveis em uma única passada sem variáveis temporárias.",
        questions: [
          q("Qual é o benefício de estruturar consultas LINQ como uma sequência fluente de operadores encadeados?", "Elimina variáveis intermediárias desnecessárias, tornando o fluxo de dados unidirecional e legível", ["Acelera a compilação em 10 vezes","Torna o software imune a falhas de energia"], "Pipelines lineares expressam com clareza o ciclo de vida da transformação da informação."),
          q("Em qual ordem lógica os operadores devem ser posicionados para maximizar o desempenho da consulta?", "Filtrar primeiro com Where, ordenar depois com OrderBy e projetar com Select antes de limitar", ["Ordenar tudo antes de filtrar","Projetar tudo antes de filtrar"], "Filtrar primeiro reduz o volume de dados que precisará ser ordenado nas etapas seguintes."),
          q("O que acontece nos bastidores quando encadeamos .Where(p1).Where(p2) consecutivamente?", "O LINQ compõe os predicados de forma que o segundo só avalia elementos que passaram pelo primeiro", ["Apenas o segundo Where é executado","O compilador gera um erro"], "Encadear filtros equivale a um operador lógico E (&&), preservando modularidade."),
          q("Por que quebrar cada operador do pipeline LINQ em uma linha separada é a boa prática da indústria?", "Aumenta significativamente a legibilidade, facilita revisões de código e simplifica a depuração passo a passo", ["Porque o compilador C# exige quebras de linha","Para gastar mais espaço de arquivo"], "Formatar uma operação por linha torna a esteira de processamento visualmente autoexplicativa."),
          t("Qual termo da engenharia define a esteira de operadores onde a saída de um alimenta a entrada do próximo?", ["pipeline"], "Pipelines conectam transformações de dados em esteiras fluidas."),
          g("Complete o encadeamento capturando os 5 primeiros itens da sequência filtrada:", ["Take"], "Take limita a quantidade de elementos que fluem na esteira.", "var top5 = lista.Where(x => x.Ativo).____(5);"),
          o("Ordene as etapas recomendadas para construir um pipeline de relatório com LINQ:", ["Filtrar elementos indesejados logo no início da esteira com Where","Ordenar a massa de dados resultante com OrderBy ou OrderByDescending","Selecionar e projetar os campos desejados para o DTO com Select","Limitar o tamanho da entrega aos primeiros colocados com Take"], "Filtragem precoce com Where, ordenação, projeção de DTO com Select e limite com Take."),
          p("Associe o operador à sua função na esteira de dados:", [["Where(predicado)","Válvula de filtro: descarta elementos que não satisfazem a condição"],["OrderBy(chave)","Reorganizador: classifica os itens restantes da esteira"],["Select(transformador)","Conversor: molda o formato e as propriedades do elemento"],["Take(quantidade)","Guilhotina: interrompe o fluxo assim que atinge a contagem estipulada"]], "Compor pipelines fluentes de dados com LINQ transforma códigos imperativos complexos em arte legível.")
        ]
      }
    ],
    2: [
      {
        id: "csharp-c11-u2-l1-filtragem-com-predicados-booleanos",
        title: "Filtragem com predicados booleanos: Where(x => x.Condicao)",
        subtitle: "Filtros essenciais · Selecionando subconjuntos de dados com expressões condicionais",
        theory: "O operador Where filtra sequências avaliando um predicado Func<T, bool> em cada item: produtos.Where(p => p.Preco > 50 && p.EmEstoque). Apenas os elementos cuja avaliação resulta em true são emitidos adiante. Itens com false são sumariamente descartados do fluxo sem gerar alocações intermediárias.",
        questions: [
          q("Qual é o papel do operador Where em uma sequência no LINQ?", "Filtrar os elementos da coleção, mantendo apenas aqueles que satisfazem a condição booleana do predicado", ["Somar todos os valores da lista","Inverter a ordem dos itens"], "Where atua como um filtro seletivo sobre o fluxo de elementos da sequência."),
          q("O que acontece com um elemento da sequência cuja expressão lambda no Where avalia como false?", "O elemento é descartado da sequência resultante e não segue para as etapas seguintes do pipeline", ["O elemento é transformado em null","Uma exceção é lançada"], "Apenas elementos que atendem rigorosamente ao predicado verdadeiro são propagados."),
          q("Se nenhum elemento da coleção atender à condição estipulada no Where, o que o método devolve?", "Devolve uma sequência IEnumerable<T> vazia, e NUNCA o valor null", ["Lança uma NullPointerException","Devolve o valor null"], "O LINQ sempre devolve sequências válidas, evitando falhas por referência nula."),
          q("Qual operador lógico do C# deve ser utilizado dentro da lambda para exigir que duas condições sejam verdadeiras?", "Operador && (E lógico condicional)", ["Operador ||","Operador =="], "O operador && exige conformidade mútua de ambas as regras para emitir o elemento."),
          t("Qual operador LINQ filtra elementos de uma sequência com base em um predicado booleano?", ["Where"], "Where é o operador canônico de filtragem em C#."),
          g("Complete o filtro selecionando apenas produtos cujo estoque seja maior que zero:", ["Where"], "Where aplica a condição booleana sobre a sequência.", "var disponiveis = produtos.____(p => p.Estoque > 0);"),
          o("Ordene as etapas de filtragem de uma lista de despesas com Where:", ["Coleção original com despesas de valores diversos e categorias mistas","Aplicação do operador Where(d => d.Valor >= 100 && d.Categoria == \"Aluguel\")","O motor do LINQ avalia o predicado para cada item durante a enumeração","Sequência filtrada emitida contendo apenas as despesas que atenderam à regra"], "Coleção inicial, aplicação do Where, avaliação em runtime e emissão dos aprovados."),
          p("Associe o predicado do Where à sua lógica de seleção:", [["p => p.Ativo","Mantém apenas registros cujo booleano Ativo seja true"],["p => !p.Cancelado","Mantém registros onde o campo Cancelado seja false"],["p => p.Preco >= 100","Mantém apenas itens com valor igual ou superior a 100"],["p => p.Nome.StartsWith(\"A\")","Mantém elementos cujo nome inicie com a letra A maiúscula"]], "Dominar o operador Where é a fundação para qualquer consulta de dados em C#.")
        ]
      },
      {
        id: "csharp-c11-u2-l2-filtragem-com-indice-posicional",
        title: "Filtragem com índice posicional: Where((item, index) => ...)",
        subtitle: "Posição na sequência · Tomando decisões com base no índice numérico do elemento",
        theory: "O Where possui uma sobrecarga poderosa que fornece o índice numérico da iteração: Where((item, index) => index % 2 == 0). O parâmetro index começa em 0 para o primeiro item emitido. Isso permite filtrar elementos em posições pares, ímpares ou limitar faixas específicas sem variáveis de contagem manuais.",
        questions: [
          q("Qual sobrecarga do operador Where fornece o índice numérico sequencial de cada elemento?", "Where((item, index) => condicaoBaseadaNoIndice)", ["WhereWithIndex","WhereIndexed"], "A sobrecarga com dois argumentos na lambda injeta o elemento e seu índice de 0 a N."),
          q("Qual é o valor do parâmetro index para o primeiro elemento examinado na sequência?", "0 (zero-based)", ["1","-1"], "A numeração de índices no C# e no LINQ segue rigorosamente a convenção baseada em zero."),
          q("Como filtrar elementos que ocupam posições pares na coleção original usando Where indexado?", "itens.Where((item, index) => index % 2 == 0)", ["itens.Where(item => item.IsEven)","itens.WhereEven()"], "O operador módulo index % 2 == 0 identifica posições 0, 2, 4, 6 com facilidade."),
          q("Se encadearmos dois operadores Where indexados seguidos, o que acontece com o índice do segundo Where?", "O segundo Where recebe o índice da nova sequência filtrada gerada pelo primeiro, e não da lista original", ["O índice continua sendo o da lista original","O compilador gera erro"], "Cada operador enxerga apenas o fluxo de elementos que chega diretamente na sua entrada."),
          t("Qual número representa o índice do primeiro elemento examinado na sobrecarga indexada do Where?", ["0"], "O índice de iteração no LINQ inicia estritamente em zero."),
          g("Complete a seleção de itens que residem nas primeiras 10 posições pelo índice:", ["index"], "O parâmetro index representa a posição ordinal do elemento.", "itens.Where((x, ____) => index < 10)"),
          o("Ordene a mecânica do Where indexado sobre uma lista de letras [A, B, C, D]:", ["Elemento \"A\" avaliado com index = 0 (0 % 2 == 0: aprovado e emitido)","Elemento \"B\" avaliado com index = 1 (1 % 2 != 0: reprovado e descartado)","Elemento \"C\" avaliado com index = 2 (2 % 2 == 0: aprovado e emitido)","Resultado final gerado: sequência contendo [\"A\", \"C\"]"], "Avaliação do índice 0, descarte do índice 1, aprovação do índice 2 e resultado filtrado."),
          p("Associe a expressão indexada ao seu efeito de filtragem:", [["index % 2 == 0","Seleciona apenas os elementos situados em posições de índice par (0, 2, 4...)"],["index % 2 != 0","Seleciona apenas os elementos situados em posições de índice ímpar (1, 3, 5...)"],["index >= 5","Descarta os primeiros 5 elementos com base estritamente em sua posição ordinal"],["Func<T, int, bool>","Assinatura do delegate que recebe o item e seu índice correspondente"]], "A sobrecarga indexada do Where resolve problemas posicionais sem a sujeira de contadores auxiliares fora do laço.")
        ]
      },
      {
        id: "csharp-c11-u2-l3-multiplos-wheres-vs-predicados-compostos",
        title: "Múltiplos operadores Where vs predicados compostos com &&",
        subtitle: "Modularidade e performance · Quando encadear chamadas e quando unificar condições",
        theory: "Filtrar por dois critérios pode ser feito de duas formas: encadeando .Where(p1).Where(p2) ou unificando com .Where(p1 && p2). No LINQ to Objects em memória, a performance é idêntica; já no Entity Framework (LINQ to Entities), múltiplos Wheres são automaticamente combinados em uma única cláusula WHERE no SQL.",
        questions: [
          q("Qual é a diferença de resultado entre lista.Where(x => x.A && x.B) e lista.Where(x => x.A).Where(x => x.B)?", "O resultado final é absolutamente idêntico: ambos mantêm apenas itens que atendem a A e B simultaneamente", ["O primeiro traz mais registros","O segundo apaga a lista"], "Ambas as formas representam a conjunção lógica E sobre a sequência."),
          q("Quando encadear múltiplos métodos .Where() é vantajoso para a qualidade do código?", "Quando aplicamos filtros dinâmicos condicionais (ex: se o usuário preencheu data, adicionamos .Where(data))", ["Nunca, é considerado um erro grave","Apenas em consoles antigos"], "Filtros encadeados viabilizam a construção de consultas dinâmicas de busca sem SQL manual."),
          q("No Entity Framework Core, o que o provedor faz ao traduzir múltiplos métodos .Where() para SQL?", "Combina todos os predicados em uma única cláusula WHERE com operadores AND na query gerada", ["Gera múltiplos comandos SELECT separados","Executa uma query em C# na memória"], "O provedor LINQ do banco otimiza a árvore de expressão gerando SQL enxuto e performático."),
          q("Qual é a boa prática ao combinar condições lógicas complexas com && e || no mesmo Where?", "Utilizar parênteses explícitos para garantir precedência matemática (ex: (a || b) && c)", ["Confiar na ordem aleatória do compilador","Nunca usar || no LINQ"], "Parênteses explícitos evitam armadilhas de precedência lógica entre operadores E e OU."),
          t("Qual operador lógico do C# combina duas condições exigindo que ambas sejam satisfeitas?", ["&&"], "&& representa o operador de conjunção lógica condicional em C#."),
          g("Complete o filtro encadeado aplicando o segundo critério de busca dinâmica:", ["Where"], "Where encadeado adiciona uma nova restrição à sequência.", "if (buscaPorNome) consulta = consulta.____(x => x.Nome.Contains(termo));"),
          o("Ordene a construção de uma busca dinâmica com múltiplos Wheres:", ["Iniciar com a consulta base total: var consulta = context.Clientes.AsQueryable()","Se filtroAtivo foi selecionado: consulta = consulta.Where(c => c.Ativo)","Se filtroCidade foi preenchido: consulta = consulta.Where(c => c.Cidade == cidade)","Materializar a consulta no banco com os filtros consolidados via ToListAsync()"], "Consulta base, acréscimo condicional de ativo, acréscimo de cidade e materialização."),
          p("Associe a estratégia de filtragem ao seu melhor cenário de uso:", [["Where(A && B)","Condições fixas de negócio conhecidas previamente no mesmo método"],["Where(A).Where(B)","Construção dinâmica de filtros em telas de busca com campos opcionais"],["Árvore de Expressão","Estrutura que o EF Core analisa para mesclar filtros em um único WHERE SQL"],["Precedência com ()","Uso de parênteses para evitar confusões lógicas entre operadores && e ||"]], "Saber combinar múltiplos Wheres viabiliza formulários de busca complexos com máxima elegância e performance.")
        ]
      },
      {
        id: "csharp-c11-u2-l4-filtragem-polimorfica-com-oftype",
        title: "Filtragem polimórfica de tipos com o operador OfType<T>()",
        subtitle: "Hierarquia de classes · Filtrando e convertendo instâncias específicas em coleções heterogêneas",
        theory: "Coleções heterogêneas misturam subclasses (ex: List<Funcionario> com Gerente e Estagiario). O operador OfType<Gerente>() realiza duas ações em uma única passada: filtra apenas os elementos que são instâncias do tipo Gerente (ou suas subclasses) e faz o cast seguro, retornando IEnumerable<Gerente>.",
        questions: [
          q("Qual é a dupla responsabilidade executada pelo operador OfType<T>() no LINQ?", "Filtrar os elementos que são do tipo T (ou subclasse de T) e convertê-los automaticamente para IEnumerable<T>", ["Somar os valores da subclasse","Apagar os objetos das outras classes"], "OfType une a filtragem de tipos com a conversão de tipos de forma segura e elegante."),
          q("Qual é a diferença fundamental entre o operador OfType<T>() e o operador Cast<T>()?", "OfType descarta silenciosamente elementos incompatíveis; Cast lança InvalidCastException ao achar tipo incompatível", ["Cast é mais novo que OfType","OfType só funciona com inteiros"], "Use OfType quando a lista tiver tipos mistos; use Cast apenas se tiver certeza de que todos casam."),
          q("Se tivermos uma lista com [10, \"texto\", 20, \"lincode\"], o que lista.OfType<string>() devolve?", "Uma sequência contendo apenas [\"texto\", \"lincode\"] tipada como IEnumerable<string>", ["Uma lista vazia","Lança uma exceção fatal"], "Elementos inteiros que não casam com string são ignorados sem falhas."),
          q("O operador OfType<T>() inclui elementos que herdam indiretamente do tipo genérico T informado?", "Sim; o operador avalia a compatibilidade de tipos equivalente ao operador \"is\" do C# (incluindo subclasses)", ["Não, apenas a classe exata idêntica","Apenas interfaces"], "A compatibilidade polimórfica respeita a árvore completa de herança do objeto."),
          t("Qual operador LINQ filtra e converte elementos compatíveis com um tipo genérico específico?", ["OfType"], "OfType filtra elementos por tipo polimórfico de forma segura."),
          g("Complete a extração segura apenas dos objetos do tipo FuncionarioCLT da lista mista:", ["OfType"], "OfType filtra elementos que herdam da classe informada.", "var clts = funcionarios.____<FuncionarioCLT>();"),
          o("Ordene o processamento de uma lista mista de formas geométricas com OfType:", ["Coleção heterogênea List<Forma> contendo Circulo, Quadrado e Triangulo","Invocação do operador especializado formas.OfType<Circulo>()","O LINQ descarta Quadrado e Triangulo avaliando a compatibilidade de tipo com is","Retorno de uma sequência IEnumerable<Circulo> permitindo acessar o método Raio()"], "Coleção heterogênea, invocação de OfType, descarte de outros tipos e retorno tipado."),
          p("Associe o operador de tipo ao seu comportamento diante de incompatibilidade:", [["OfType<T>()","Filtro seguro: ignora elementos incompatíveis e devolve apenas os válidos"],["Cast<T>()","Conversão estrita: exige que todos os itens casem, lançando InvalidCastException sob erro"],["Operador \"is\"","Mecanismo interno do C# que avalia compatibilidade de tipos em tempo de execução"],["Polimorfismo","Capacidade de tratar objetos de diferentes classes derivadas através de um tipo comum"]], "OfType<T> é a ferramenta mais limpa e segura do C# para processar coleções polimórficas sem loops manuais de cast.")
        ]
      },
      {
        id: "csharp-c11-u2-l5-efeitos-de-mutacao-e-execucao-tardia-no-where",
        title: "Efeitos de mutação da fonte e a armadilha do Where tardio",
        subtitle: "Comportamento temporal · Como alterações na lista original afetam o resultado da consulta",
        theory: "O Where não cria uma cópia dos dados: ele é uma receita avaliada apenas no momento da enumeração. Se adicionarmos itens na lista após definir o Where, a consulta enxergará os novos itens ao rodar o foreach! Para congelar os dados no estado atual, devemos materializar imediatamente com .ToList().",
        questions: [
          q("O que acontece se uma lista sofrer adições de itens após a definição de um operador .Where() e antes do foreach?", "O foreach enxergará e processará os novos itens adicionados, pois a consulta é avaliada tardiamente na enumeração", ["O código lança erro de compilação","Os novos itens são ignorados para sempre"], "A execução adiada avalia o predicado sobre a coleção no momento exato em que o laço roda."),
          q("Como \"congelar\" imediatamente o resultado de um Where para que ele não sofra alterações posteriores da lista?", "Invocando o método de materialização .ToList() ou .ToArray() logo após o Where", ["Chamando o método .Freeze()","Colocando a lista em uma variável estática"], "Materializar gera uma nova coleção isolada contendo apenas os dados daquele instante exato."),
          q("Qual bug silencioso clássico ocorre ao iterar sobre uma consulta com Where que avalia uma variável local mutável?", "A consulta usa o valor que a variável tem no momento do foreach, e não no momento em que o Where foi escrito", ["A variável local é apagada","O computador entra em suspensão"], "Lambdas capturam referências a variáveis locais, e não cópias congeladas de seu valor original."),
          q("Qual é a recomendação ao usar variáveis de controle em consultas LINQ sujeitas a execuções posteriores?", "Copiar o valor da variável de controle para uma constante ou variável local imutável antes da consulta", ["Nunca usar variáveis em LINQ","Usar apenas números inteiros"], "Isolar o valor previne alterações acidentais de comportamento decorrentes de closures tardias."),
          t("Qual método do LINQ materializa a sequência em uma lista congelando os dados naquele instante?", ["ToList"], "ToList força a avaliação imediata e materializa os resultados em memória."),
          g("Complete o congelamento da consulta para que mutações na lista original não afetem o resultado:", ["ToList"], "ToList desconecta a consulta de futuras alterações na fonte.", "var foto = lista.Where(x => x.Ativo).____();"),
          o("Ordene a cronologia de um Where com execução tardia e mutação de fonte:", ["var lista = new List<int> { 1, 2, 3 }","var consulta = lista.Where(x => x > 1); (nenhum loop roda aqui)","lista.Add(10); (a lista original de origem recebe um novo elemento)","foreach (var n in consulta): a enumeração roda e emite 2, 3 e 10!"], "Criação da lista, definição da consulta adiada, mutação com Add e enumeração com novo item."),
          p("Associe o comportamento à sua consequência técnica:", [["Execução Tardia (Deferred)","A consulta observa o estado da fonte no momento em que é enumerada"],["Materialização (.ToList())","Executa a consulta na hora e guarda os resultados em uma nova lista independente"],["Captura de Variável (Closure)","A lambda referencia a variável mutável e não o valor que ela tinha na escrita"],["Snapshot de Dados","Cópia isolada em memória imune a alterações posteriores na fonte original"]], "Compreender a relação entre mutação de fonte e execução tardia evita semanas de depuração de bugs intermitentes.")
        ]
      }
    ],
    3: [
      {
        id: "csharp-c11-u3-l1-projecao-escalar-e-transformacao-de-tipos",
        title: "Projeção escalar e transformação de tipos com Select",
        subtitle: "Mapeamento 1:1 · Transformando cada elemento de entrada em um novo formato de saída",
        theory: "O operador Select projeta dados: para cada elemento de entrada T, aplica uma função Func<T, U> e emite um elemento transformado U. Usamos Select para extrair colunas escalares (nomes.Select(u => u.Email)) ou instanciar novos tipos (pedidos.Select(p => new PedidoDTO(p.Id, p.Total))).",
        questions: [
          q("Qual é a função primordial do operador Select no LINQ?", "Projetar e transformar cada elemento de uma sequência em um novo valor ou formato de saída (mapeamento 1:1)", ["Filtrar os elementos da lista","Remover itens nulos"], "Select mapeia cada item individual para uma nova representação correspondente."),
          q("O operador Select altera a quantidade total de elementos presentes na sequência original?", "Não; o Select sempre devolve rigorosamente a mesma quantidade de elementos que recebeu na entrada", ["Sim, ele remove itens duplicados","Reduz pela metade"], "Diferente do Where que filtra, o Select mantém a contagem original de 1 para 1."),
          q("Como extrair apenas os endereços de e-mail de uma lista de usuários utilizando o Select?", "usuarios.Select(u => u.Email)", ["usuarios.Where(u => u.Email)","usuarios.GetEmails()"], "Select extrai a propriedade desejada, convertendo IEnumerable<Usuario> em IEnumerable<string>."),
          q("Podemos realizar cálculos matemáticos e transformações de texto dentro da lambda do Select?", "Sim; expressões como Select(p => p.Preco * 1.10) ou Select(p => p.Nome.ToUpper()) são plenamente válidas", ["Não, Select só aceita nomes de campos puros","Apenas no C# 12"], "Qualquer cálculo ou invocação de método pode transformar o dado durante a projeção."),
          t("Qual operador LINQ transforma elementos de um tipo de entrada em outro tipo de saída?", ["Select"], "Select aplica a função de transformação de projeção sobre a sequência."),
          g("Complete a transformação da lista de usuários obtendo apenas a propriedade Nome:", ["Select"], "Select projeta a coluna selecionada.", "var nomes = usuarios.____(u => u.Nome);"),
          o("Ordene o fluxo de transformação de dados de uma lista de clientes para DTOs:", ["Lista de entidades de domínio ricas recuperadas da base de dados","Aplicação do operador clientes.Select(c => new ClienteDTO(c.Id, c.Nome))","O motor do LINQ instancia uma nova representação de ClienteDTO para cada cliente","Emissão da sequência resultante tipada como IEnumerable<ClienteDTO>"], "Entidades de domínio, aplicação de Select, instanciação de DTOs e emissão da sequência."),
          p("Associe a operação do Select à sua categoria de transformação:", [["Select(x => x.Id)","Projeção escalar simples: extrai uma única propriedade primitiva"],["Select(x => x.Preco * 0.9)","Projeção com cálculo: aplica regra aritmética em cada item"],["Select(x => new DTO(...))","Mapeamento de domínio: converte entidades pesadas em DTOs leves"],["Mapeamento 1:1","Propriedade de que cada item de entrada gera rigorosamente um item de saída"]], "O operador Select é o motor essencial de transformação e mapeamento de dados no ecossistema C#.")
        ]
      },
      {
        id: "csharp-c11-u3-l2-projecao-de-tipos-anonimos-para-isolamento",
        title: "Projeção de tipos anônimos com new { ... } para isolamento de dados",
        subtitle: "Estruturas sob medida · Criando objetos leves sem declarar novas classes formais",
        theory: "Criar classes formais para consultas intermediárias gera poluição de código. O C# resolve isso com Tipos Anônimos no Select: produtos.Select(p => new { p.Id, NomeFormatado = p.Nome.ToUpper(), p.Preco }). O compilador cria uma classe interna imutável com getters, Equals e GetHashCode automaticamente.",
        questions: [
          q("O que são Tipos Anônimos (Anonymous Types) criados através do operador \"new { ... }\" no C#?", "Classes imutáveis geradas dinamicamente pelo compilador sem nome formal para transportar dados sob medida", ["Objetos sem tipo de dados que aceitam qualquer coisa","Ponteiros em memória C++"], "Tipos anônimos permitem agrupar propriedades em um objeto fortemente tipado sem criar arquivos de classe."),
          q("Como os Tipos Anônimos devem ser declarados na variável receptora do método?", "Obrigatoriamente utilizando inferência de tipos com a palavra-chave \"var\" (ex: var relatorio = ...)", ["Declarando Object relatorio","Declarando Dynamic relatorio"], "Como o tipo não possui nome acessível no código-fonte, a inferência var é estritamente necessária."),
          q("As propriedades de um Tipo Anônimo podem ser modificadas após a sua criação?", "Não; todas as propriedades de tipos anônimos são geradas pelo compilador como somente leitura (readonly)", ["Sim, através de setters públicos","Apenas se forem booleanas"], "A imutabilidade estrutural previne mutações colaterais de dados durante a execução da consulta."),
          q("O que acontece se omitirmos o nome da propriedade na criação do tipo anônimo (ex: new { cliente.Nome })?", "O compilador infere o nome da propriedade automaticamente usando o mesmo nome do campo de origem (\"Nome\")", ["O código gera erro de sintaxe","A propriedade recebe o nome \"Item1\""], "A projeção por inferência de membros torna a sintaxe de criação concisa e limpa."),
          t("Qual palavra-chave do C# viabiliza a criação de tipos anônimos imutáveis dentro do Select?", ["new"], "new { ... } instancia tipos anônimos em tempo de compilação."),
          g("Complete a projeção gerando um tipo anônimo com o ID e o total calculado:", ["new"], "new instancia o tipo anônimo com as propriedades indicadas.", "var resumo = pedidos.Select(p => ____ { p.Id, Total = p.Itens.Sum() });"),
          o("Ordene a criação e consumo de dados utilizando tipos anônimos no LINQ:", ["Escrever a consulta: var consulta = produtos.Select(p => new { p.Id, p.Nome })","O compilador do C# gera uma classe genérica interna com Equals e GetHashCode","Iterar sobre a consulta com foreach (var item in consulta)","Acessar com autocomplete total na IDE: Console.WriteLine(item.Nome)"], "Consulta com new {}, geração de classe pelo compilador, iteração no foreach e acesso tipado."),
          p("Associe a característica do Tipo Anônimo ao seu benefício técnico:", [["Inferência com var","Permite manipular instâncias cujo nome de classe é anônimo para o código"],["Propriedades Readonly","Garante imutabilidade de dados durante a passagem pelas esteiras"],["Equals e GetHashCode","Implementação baseada em valor: dois tipos anônimos com mesmos valores são iguais"],["Omissão de Nomes","Infere automaticamente os identificadores das propriedades a partir da origem"]], "Tipos anônimos oferecem agilidade e isolamento perfeitos para consultas intermediárias em memória.")
        ]
      },
      {
        id: "csharp-c11-u3-l3-projecao-com-indice-posicional-no-select",
        title: "Projeção com índice posicional: Select((item, index) => ...)",
        subtitle: "Sequenciamento de dados · Numerando linhas e gerando relatórios ordenados",
        theory: "Assim como no Where, o Select possui uma sobrecarga com índice: itens.Select((x, index) => new { Posicao = index + 1, x.Nome }). O parâmetro index recebe a posição (iniciando em 0). Isso viabiliza numeração de linhas em relatórios, ranking de colocações e geração de chaves compostas.",
        questions: [
          q("Qual é a utilidade da sobrecarga indexada do operador Select no LINQ?", "Acessar o índice numérico sequencial de cada elemento durante a projeção de saída", ["Inverter a ordem da lista","Pular os primeiros elementos"], "O índice permite correlacionar a posição original com o objeto projetado."),
          q("Como gerar um relatório numerado a partir do número 1 utilizando o Select indexado?", "lista.Select((item, index) => $\"{index + 1}. {item.Nome}\")", ["lista.Select(item => $\"1. {item.Nome}\")","lista.NumberFromOne()"], "Somar 1 ao índice (zero-based) transforma a contagem interna em numeração ordinal amigável."),
          q("O que acontece com o valor do índice se aplicarmos um Where ANTES do Select indexado?", "O índice refletirá a contagem da sequência filtrada pós-Where, iniciando em 0 para o primeiro item aprovado", ["O índice mantém a posição da lista original antes do Where","O índice começa em valores negativos"], "Operadores do LINQ operam estritamente sobre a sequência imediata que chega em sua entrada."),
          q("Qual é a assinatura do delegate da sobrecarga indexada do operador Select?", "System.Func<TSource, int, TResult>", ["System.Action<TSource, int>","System.Predicate<int>"], "Func recebe o elemento da fonte, o índice inteiro e devolve o tipo projetado."),
          t("Qual valor numérico inicial é atribuído ao primeiro elemento na sobrecarga indexada do Select?", ["0"], "A contagem de índices no Select inicia estritamente em zero."),
          g("Complete a projeção numerando os colocados do pódio a partir de 1:", ["index"], "O parâmetro index representa a posição ordinal do elemento.", "nomes.Select((nome, ____) => $\"{index + 1}º Lugar: {nome}\")"),
          o("Ordene a criação de um ranking ordenado com numeração posicional:", ["Ordenar a lista de competidores por pontuação com OrderByDescending","Aplicar Select((competidor, i) => new { Posicao = i + 1, competidor.Nome })","O motor projeta cada competidor com sua respectiva colocação numérica","Exibir o ranking final numerado de 1 a N no terminal"], "Ordenação prévia, aplicação de Select indexado, projeção do objeto e exibição final."),
          p("Associe o parâmetro da lambda do Select ao seu significado:", [["item (primeiro parâmetro)","Instância atual do elemento sendo transformado no fluxo"],["index (segundo parâmetro)","Posição ordinal numérica inteira (iniciando em zero) do elemento"],["index + 1","Conversão comum para exibição de numeração legível para humanos"],["Func<T, int, R>","Assinatura funcional que recebe dado e índice gerando resultado"]], "O Select indexado simplifica a geração de relatórios ordenados e rankings sem variáveis de laço.")
        ]
      },
      {
        id: "csharp-c11-u3-l4-achatamento-com-selectmany-o-flatmap-do-csharp",
        title: "Achatamento de coleções aninhadas com SelectMany (FlatMap)",
        subtitle: "Navegando em profundidade · Descompactando listas dentro de listas em um fluxo plano",
        theory: "Quando um objeto possui uma coleção filha (um Pedido tem List<Item>), usar Select(p => p.Itens) gera IEnumerable<List<Item>> (uma lista de listas indesejada). O operador SelectMany achata essa estrutura em um único nível: pedidos.SelectMany(p => p.Itens) devolve um fluxo plano IEnumerable<Item>.",
        questions: [
          q("Qual problema estrutural o operador SelectMany resolve no processamento de dados com LINQ?", "Achata coleções aninhadas (coleções dentro de coleções) em uma única sequência plana unidimensional", ["Remove elementos duplicados da lista","Ordena a sequência alfabeticamente"], "SelectMany opera como o FlatMap de linguagens funcionais, descompactando hierarquias em um fluxo contínuo."),
          q("Se aplicarmos pedidos.Select(p => p.Itens) sobre 5 pedidos com 2 itens cada, qual é o tipo de retorno?", "IEnumerable<List<Item>> (uma sequência de listas aninhadas)", ["IEnumerable<Item> plano","List<Item> consolidada"], "Select projeta a lista como um objeto único, mantendo o aninhamento estrutural."),
          q("Se aplicarmos pedidos.SelectMany(p => p.Itens) sobre os mesmos 5 pedidos com 2 itens cada, qual é o resultado?", "Uma sequência plana contendo todos os 10 itens descompactados individualmente em um único nível", ["Apenas os 2 primeiros itens","Uma lista vazia"], "SelectMany itera sobre cada lista filha e emite seus elementos diretamente no fluxo principal."),
          q("Qual é o equivalente semântico do SelectMany na Sintaxe de Consulta (Query Syntax) do C#?", "Utilizar duas cláusulas \"from\" encadeadas (ex: from p in pedidos from i in p.Itens select i)", ["Utilizar dois selects seguidos","Utilizar a cláusula join"], "Múltiplos \"from\" consecutivos atuam como SelectMany na sintaxe declarativa."),
          t("Qual operador LINQ achata coleções aninhadas em uma sequência plana contínua?", ["SelectMany"], "SelectMany descompacta coleções de múltiplos níveis em um fluxo contínuo."),
          g("Complete a extração plana de todos os números de telefone de todos os clientes:", ["SelectMany"], "SelectMany achata as listas filhas em uma única sequência.", "var todosTelefones = clientes.____(c => c.Telefones);"),
          o("Ordene a transformação de uma lista de departamentos em uma lista plana de funcionários:", ["Lista de departamentos onde cada departamento possui List<Funcionario>","Aplicação do operador departamentos.SelectMany(d => d.Funcionarios)","O LINQ percorre cada departamento e itera sobre sua lista interna de funcionários","Emissão de todos os funcionários em um fluxo plano IEnumerable<Funcionario>"], "Departamentos aninhados, chamada de SelectMany, iteração interna e emissão plana."),
          p("Associe o operador ao formato da sequência gerada:", [["Select(p => p.Filhos)","Gera IEnumerable<List<T>> mantendo coleções aninhadas separadas"],["SelectMany(p => p.Filhos)","Gera IEnumerable<T> achatando e consolidando todos os itens em um só nível"],["FlatMap Funcional","Conceito matemático de mapear e achatar estruturas monádicas"],["from a in A from b in B","Equivalente declarativo de SelectMany na sintaxe de consulta"]], "Dominar SelectMany é essencial para navegar e consultar estruturas hierárquicas e relacionamentos 1:N.")
        ]
      },
      {
        id: "csharp-c11-u3-l5-produtos-cartesianos-e-correlacoes-com-selectmany",
        title: "Produtos cartesianos e cruzamento de dados com SelectMany",
        subtitle: "Combinações múltiplas · Cruzando duas sequências com sobrecargas de resultado",
        theory: "O SelectMany também combina sequências independentes gerando produtos cartesianos: cores.SelectMany(c => tamanhos, (c, t) => new { Cor = c, Tamanho = t }). Cada cor é combinada com todos os tamanhos, gerando todas as permutações possíveis sem exigir loops aninhados manuais.",
        questions: [
          q("Como gerar o produto cartesiano (todas as combinações possíveis) entre duas listas independentes no C#?", "Utilizando o SelectMany com dois argumentos: a segunda sequência e uma função de combinação", ["Usando o operador Where","Somando as duas listas com Concat"], "SelectMany combina cada item da primeira lista com todos os itens da segunda."),
          q("Se tivermos 3 cores e 4 tamanhos, quantos elementos o produto cartesiano gerado por SelectMany terá?", "12 combinações (3 * 4 = 12 pares)", ["7 combinações","1 combinação"], "O produto cartesiano multiplica a cardinalidade de ambos os conjuntos de entrada."),
          q("Qual é a finalidade do segundo parâmetro lambda na sobrecarga do SelectMany?", "Definir o formato final do elemento combinado, recebendo o item pai e o item filho atual", ["Filtrar itens nulos","Ordenar a saída"], "A lambda (pai, filho) => new { ... } molda o objeto resultante de cada combinação gerada."),
          q("Como expressar um produto cartesiano entre duas listas usando a Sintaxe de Consulta (Query Syntax)?", "from c in cores from t in tamanhos select new { Cor = c, Tamanho = t }", ["from c in cores join t in tamanhos","select c, t from cores, tamanhos"], "Dois clauses \"from\" sem condição de junção geram o cruzamento cartesiano completo."),
          t("Como é chamado o cruzamento que combina todos os elementos de um conjunto com todos os de outro?", ["cartesiano"], "O produto cartesiano gera todas as combinações possíveis entre conjuntos."),
          g("Complete a combinação de baralhos unindo naipes e valores em cartas de jogo:", ["SelectMany"], "SelectMany gera as combinações cartesianas entre naipes e valores.", "var baralho = naipes.____(n => valores, (n, v) => new Carta(n, v));"),
          o("Ordene as etapas de geração de todas as combinações de peças de roupa:", ["Definir a lista de cores: [\"Azul\", \"Preto\"]","Definir a lista de tamanhos: [\"P\", \"M\", \"G\"]","Executar cores.SelectMany(c => tamanhos, (c, t) => $\"{c} - {t}\")","Obter a sequência final com as 6 combinações formatadas"], "Lista de cores, lista de tamanhos, execução de SelectMany e resultado com 6 itens."),
          p("Associe a estrutura de dados ao seu resultado de combinação:", [["Lista A (3 itens) x Lista B (4 itens)","Produto cartesiano gerando exatamente 12 combinações"],["(pai, filho) => new { ... }","Função projetora que recebe os dois elementos e gera a tupla"],["from x in X from y in Y","Sintaxe declarativa elegante para produto cartesiano"],["Combinação Combinatória","Cenário típico: matriz de peças, baralhos de jogos e variações de SKU"]], "SelectMany oferece uma solução elegante e compacta para geração de matrizes e permutações de dados.")
        ]
      }
    ],
    4: [
      {
        id: "csharp-c11-u4-l1-ordenacao-basica-com-orderby-e-descending",
        title: "Ordenação básica com OrderBy e OrderByDescending",
        subtitle: "Classificação estável · Ordenando sequências por critérios crescentes e decrescentes",
        theory: "Para classificar sequências, o LINQ disponibiliza operadores de ordenação: OrderBy(x => x.Preco) organiza em ordem crescente (ascendente); e OrderByDescending(x => x.Preco) organiza em ordem decrescente. O LINQ implementa ordenação estável, preservando a ordem original de itens que possuem chaves iguais.",
        questions: [
          q("Qual operador LINQ deve ser utilizado para ordenar uma sequência de produtos do mais barato ao mais caro?", "OrderBy(p => p.Preco)", ["OrderByDescending(p => p.Preco)","SortBy(p => p.Preco)"], "OrderBy classifica a sequência em ordem natural crescente (do menor para o maior)."),
          q("Qual operador LINQ organiza os registros do maior para o menor valor (ordem decrescente)?", "OrderByDescending(p => p.Data)", ["OrderByDown","OrderByInverted"], "OrderByDescending inverte a classificação natural, posicionando os maiores valores primeiro."),
          q("O que significa a garantia de \"Ordenação Estável\" (Stable Sort) provida pelo LINQ?", "Elementos que possuem chaves de ordenação idênticas mantêm a sua ordem relativa original de inserção", ["O computador nunca trava na ordenação","A lista é gravada em um arquivo físico"], "Ordenação estável evita que empates na chave causem embaralhamento aleatório nos resultados."),
          q("Qual interface especializada é retornada por OrderBy e OrderByDescending?", "IOrderedEnumerable<T>", ["IEnumerable<T> comum","ICollection<T>"], "IOrderedEnumerable<T> herda de IEnumerable<T> e armazena metadados para ordenações secundárias."),
          t("Qual operador LINQ classifica uma sequência em ordem crescente com base em uma chave?", ["OrderBy"], "OrderBy realiza a ordenação ascendente sobre a sequência."),
          g("Complete a ordenação alfabética decrescente pelo nome do cliente:", ["OrderByDescending"], "OrderByDescending ordena do maior para o menor (Z a A).", "var ordenados = clientes.____(c => c.Nome);"),
          o("Ordene as etapas de classificação de despesas por valor:", ["Coleção desordenada de despesas com valores financeiros aleatórios","Invocação do operador despesas.OrderByDescending(d => d.Valor)","O motor avalia as chaves de todos os elementos construindo a ordenação","Emissão da sequência com a maior despesa ocupando o primeiro lugar"], "Coleção inicial, aplicação de OrderByDescending, avaliação comparativa e emissão ordenada."),
          p("Associe o operador de ordenação ao seu comportamento:", [["OrderBy(chave)","Ordenação crescente: números menores primeiro, datas antigas primeiro, A-Z"],["OrderByDescending(chave)","Ordenação decrescente: números maiores primeiro, datas recentes primeiro, Z-A"],["Ordenação Estável","Preserva a posição relativa prévia entre elementos de chaves iguais"],["IOrderedEnumerable<T>","Tipo especial retornado que viabiliza encadeamento com ThenBy"]], "Dominar OrderBy e OrderByDescending é fundamental para apresentar dados de forma profissional aos usuários.")
        ]
      },
      {
        id: "csharp-c11-u4-l2-ordenacao-composta-com-thenby-e-thenbydescending",
        title: "Ordenação composta e critérios secundários com ThenBy",
        subtitle: "Desempate multinível · Ordenando por categoria e desempatando por preço ou data",
        theory: "Sistemas reais exigem múltiplos critérios de ordenação: ordenar por Departamento e, em caso de empate, por Salário. A regra de ouro é usar ThenBy ou ThenByDescending após o primeiro OrderBy: funcionarios.OrderBy(f => f.Departamento).ThenByDescending(f => f.Salario), garantindo desempates precisos.",
        questions: [
          q("Qual operador LINQ deve ser utilizado para aplicar um critério secundário de desempate na ordenação?", "ThenBy (ou ThenByDescending)", ["OrderBy secundário","SecondOrderBy"], "ThenBy atua exclusivamente sobre os empates deixados pelo critério de ordenação anterior."),
          q("Quantos operadores ThenBy podem ser encadeados consecutivamente em uma mesma consulta?", "Quantos forem necessários para atender às regras de negócio (terceiro, quarto critérios de desempate)", ["No máximo um","Apenas dois"], "Podemos encadear .OrderBy(A).ThenBy(B).ThenBy(C).ThenBy(D) livremente."),
          q("Qual é o tipo retornado pelo método ThenBy?", "IOrderedEnumerable<T>", ["IEnumerable<T> simples","List<T>"], "ThenBy preserva o contrato de IOrderedEnumerable permitindo novos encadeamentos de desempate."),
          q("Qual operador deve ser utilizado para ordenar primeiro por Estado (A-Z) e desempatar por Cidade (Z-A)?", "cidades.OrderBy(c => c.Estado).ThenByDescending(c => c.Nome)", ["cidades.OrderBy(c => c.Estado).OrderBy(c => c.Nome)","cidades.Sort()"], "Combinar OrderBy crescente com ThenByDescending resolve a ordenação mista com clareza."),
          t("Qual operador LINQ aplica um critério secundário de ordenação crescente em caso de empate?", ["ThenBy"], "ThenBy estabelece critérios subsequentes de classificação."),
          g("Complete o desempate ordenando por data de cadastro mais recente:", ["ThenByDescending"], "ThenByDescending desempata ordenando do maior para o menor.", "clientes.OrderBy(c => c.Cidade).____(c => c.DataCadastro);"),
          o("Ordene a estrutura de uma ordenação composta com três níveis de critério:", ["Primeiro critério principal: OrderBy(p => p.Categoria)","Segundo critério de desempate: ThenByDescending(p => p.Preco)","Terceiro critério de desempate: ThenBy(p => p.Nome)","Sequência final IOrderedEnumerable pronta para consumo"], "OrderBy principal, ThenByDescending secundário, ThenBy terciário e sequência consolidada."),
          p("Associe o operador ao seu nível na hierarquia de ordenação:", [["OrderBy","Define o primeiro critério de classificação prioritário da sequência"],["ThenBy","Define critérios de desempate secundários em ordem crescente"],["ThenByDescending","Define critérios de desempate secundários em ordem decrescente"],["Desempate Multinível","Resolução sistemática de empates através de cadeia de chaves"]], "ThenBy e ThenByDescending resolvem ordenações complexas com rigor e fluência incomparáveis.")
        ]
      },
      {
        id: "csharp-c11-u4-l3-o-perigo-de-encadear-multiplos-orderbys",
        title: "O perigo de encadear múltiplos OrderBys seguidos",
        subtitle: "Anti-padrão comum · Por que chamar OrderBy duas vezes destrói a primeira ordenação",
        theory: "Um dos erros mais comuns de iniciantes é escrever .OrderBy(c => c.Estado).OrderBy(c => c.Cidade). O segundo OrderBy sobrescreve e destrói completamente a ordenação do primeiro, em vez de desempatar! O critério secundário DEVE obrigatoriamente usar ThenBy, preservando a hierarquia de classificação.",
        questions: [
          q("Qual é o erro fatal do código \"lista.OrderBy(x => x.A).OrderBy(x => x.B);\"?", "O segundo OrderBy descarta e desfaz a ordenação de A, reordenando tudo do zero apenas pela chave B", ["O código não compila","O código lança NullReferenceException"], "OrderBy sempre inicia uma nova ordenação do zero; para desempatar, o método correto é ThenBy."),
          q("Por que o compilador do C# permite escrever múltiplos .OrderBy() seguidos se isso é prejudicial?", "Porque OrderBy é um método de extensão sobre IEnumerable<T>, e IOrderedEnumerable herda de IEnumerable", ["Porque é uma pegadinha da Microsoft","Para manter compatibilidade com C++"], "A herança de interfaces permite a chamada sintática, mas a semântica de negócio é violada."),
          q("Como corrigir imediatamente a instrução defeituosa \"produtos.OrderBy(p => p.Categoria).OrderBy(p => p.Nome)\"?", "Substituindo o segundo OrderBy pelo operador ThenBy: produtos.OrderBy(p => p.Categoria).ThenBy(p => p.Nome)", ["Invertendo a ordem dos métodos","Colocando ToList() entre os dois"], "ThenBy informa ao motor de ordenação que a chave Nome é um critério de desempate subordinado."),
          q("Qual ferramenta moderna de análise estática de código costuma emitir alertas sobre múltiplos OrderBys seguidos?", "Roslyn Analyzers e SonarQube", ["O Bloco de Notas","O antivírus do Windows"], "Analisadores de código estático acusam o anti-padrão sugerindo a substituição por ThenBy."),
          t("Qual método deve substituir o segundo OrderBy para preservar o critério inicial de ordenação?", ["ThenBy"], "ThenBy preserva a ordenação principal e atua apenas sobre empates."),
          g("Complete a correção eliminando a destruição da primeira ordenação:", ["ThenBy"], "Substituir OrderBy por ThenBy corrige a ordenação composta.", "itens.OrderBy(x => x.Categoria).____(x => x.Preco);"),
          o("Ordene a análise de um bug causado por múltiplos OrderBys:", ["Desenvolvedor escreve: usuarios.OrderBy(u => u.Pais).OrderBy(u => u.Idade)","O motor classifica por Pais e em seguida reordena tudo puramente por Idade","Os usuários aparecem agrupados por idade com os países totalmente embaralhados","Refatoração cirúrgica substituindo o segundo método por .ThenBy(u => u.Idade)"], "Escrita defeituosa, sobreposição de ordenação, constatação de bug e correção com ThenBy."),
          p("Associe a construção ao seu resultado real:", [["OrderBy(A).OrderBy(B)","Anti-padrão: B anula e descarta a ordenação prévia feita por A"],["OrderBy(A).ThenBy(B)","Correto: B desempata apenas os elementos que empataram na chave A"],["Roslyn Analyzer","Emite warning alertando que a chamada anterior foi sobrescrita"],["Hierarquia de Chaves","Princípio onde cada critério respeita rigorosamente o anterior"]], "Evitar múltiplos OrderBys seguidos é uma das regras mais fundamentais para a qualidade de código em C#.")
        ]
      },
      {
        id: "csharp-c11-u4-l4-iorderedenumerable-e-o-contrato-de-ordenacao",
        title: "IOrderedEnumerable<T> e a mecânica interna de ordenação",
        subtitle: "Por dentro do runtime · A interface que viabiliza ordenações multiníveis eficientes",
        theory: "A interface IOrderedEnumerable<T> é o contrato retornado por operadores de ordenação. Ela define o método CreateOrderedEnumerable, que acumula as chaves de comparação em uma cadeia de comparadores. A ordenação real só é executada quando a sequência for enumerada, avaliando todas as chaves em uma única passada.",
        questions: [
          q("O que a interface IOrderedEnumerable<T> representa no ecossistema do LINQ?", "Uma sequência ordenada que preserva a árvore de comparadores para permitir encadeamento com ThenBy", ["Uma lista imutável em disco","Um cursor de banco de dados"], "IOrderedEnumerable estende IEnumerable<T> viabilizando a adição de novas chaves de desempate."),
          q("Quando a ordenação dos elementos é REALMENTE calculada pelo LINQ?", "Apenas quando a sequência for enumerada (pelo foreach, ToList ou First), e não no momento da chamada de OrderBy", ["No instante em que OrderBy é escrito","Durante a compilação do código"], "A execução adiada se aplica também à ordenação: o algoritmo QuickSort/TimSort só roda na enumeração."),
          q("Por que a ordenação LINQ precisa carregar todos os elementos na memória durante a enumeração?", "Porque é impossível saber qual é o menor elemento sem inspecionar a totalidade da sequência de entrada", ["Para ocupar a memória RAM","Porque o C# não aceita streams"], "Diferente do Where que processa elemento a elemento, ordenação exige conhecer o conjunto todo."),
          q("Qual método da interface IOrderedEnumerable permite registrar um novo critério subordinado de ordenação?", "CreateOrderedEnumerable(...)", ["AddSortKey(...)","NextComparator(...)"], "CreateOrderedEnumerable é o método de contrato invocado internamente por ThenBy e ThenByDescending."),
          t("Qual interface herda de IEnumerable<T> e adiciona capacidade de ordenação multinível?", ["IOrderedEnumerable"], "IOrderedEnumerable viabiliza encadeamentos com ThenBy."),
          g("Complete a assinatura da variável que armazena a sequência ordenada intermediária:", ["IOrderedEnumerable"], "IOrderedEnumerable é o tipo formal retornado por OrderBy.", "____<Produto> ordenados = produtos.OrderBy(p => p.Nome);"),
          o("Ordene a mecânica interna de uma ordenação composta com IOrderedEnumerable:", ["Invocação de OrderBy: cria o IOrderedEnumerable guardando a chave principal","Invocação de ThenBy: compõe a chave secundária na árvore de comparadores","Início do laço foreach: o motor carrega os itens em buffer de memória","Execução do algoritmo de ordenação estável avaliando as chaves e emitindo os dados"], "OrderBy com chave primária, ThenBy com chave secundária, buffer no foreach e ordenação estável."),
          p("Associe a característica da ordenação ao seu impacto de execução:", [["IOrderedEnumerable<T>","Interface que retém a cadeia de chaves de comparação compostas"],["Execução Adiada","O algoritmo de ordenação só é acionado na hora da enumeração real"],["Consumo de Memória (Buffering)","Exige carregar todos os elementos em buffer para descobrir a ordem"],["CreateOrderedEnumerable","Método da interface que anexa novos comparadores de desempate"]], "Compreender IOrderedEnumerable revela como o C# compõe comparações elegantes sem perdas de desempenho.")
        ]
      },
      {
        id: "csharp-c11-u4-l5-comparadores-customizados-com-icomparer",
        title: "Comparadores customizados com IComparer<T> e StringComparer",
        subtitle: "Precisão linguística · Ordenação sensível à cultura, insensível a maiúsculas e regras sob medida",
        theory: "OrderBy aceita um IComparer<TKey> customizado para controlar como chaves são comparadas. Para textos, nunca compare strings cruas sem critério: usamos StringComparer.OrdinalIgnoreCase para ignorar maiúsculas/minúsculas de forma neutra, ou StringComparer.CurrentCulture para regras linguísticas locais.",
        questions: [
          q("Como ordenar uma lista de nomes em ordem alfabética ignorando maiúsculas e minúsculas no LINQ?", "nomes.OrderBy(n => n, StringComparer.OrdinalIgnoreCase)", ["nomes.Select(n => n.ToLower()).OrderBy()","nomes.OrderByNoCase()"], "Passar o comparador como segundo argumento evita alocações desnecessárias de ToLower()."),
          q("Qual é a diferença entre StringComparer.OrdinalIgnoreCase e StringComparer.CurrentCultureIgnoreCase?", "Ordinal compara valores de bytes binários puros; CurrentCulture respeita regras linguísticas e acentos locais", ["Ordinal só funciona no Windows","Não há diferença prática"], "Ordinal é muito mais rápido e ideal para identificadores de sistema; CurrentCulture é ideal para nomes humanos."),
          q("Qual interface do .NET deve ser implementada para criar um comparador de ordenação customizado?", "System.Collections.Generic.IComparer<T>", ["IComparable","IEqualityComparer"], "IComparer<T> define o método Compare(T x, T y) que retorna negativo, zero ou positivo."),
          q("O que o método Compare(x, y) de um IComparer deve retornar quando x deve anteceder y na ordenação?", "Um número inteiro estritamente negativo (< 0)", ["O número zero","Um número positivo (> 0)"], "A convenção universal define: negativo se x < y, zero se x == y, e positivo se x > y."),
          t("Qual comparador padrão do .NET ordena strings ignorando maiúsculas e minúsculas de forma neutra?", ["OrdinalIgnoreCase"], "StringComparer.OrdinalIgnoreCase realiza comparações binárias rápidas sem diferenciar caixa."),
          g("Complete a ordenação de códigos fornecendo o comparador ordinal insensível a maiúsculas:", ["OrdinalIgnoreCase"], "StringComparer.OrdinalIgnoreCase ignora maiúsculas e minúsculas.", "codigos.OrderBy(c => c, StringComparer.____);"),
          o("Ordene as etapas para implementar e aplicar um comparador customizado de prioridade:", ["Criar a classe: public class PrioridadeComparer : IComparer<string>","Implementar o método Compare(x, y) com regras de prioridade (ALTA, MEDIA, BAIXA)","Instanciar o comparador customizado no código da aplicação","Passar o comparador no OrderBy: tarefas.OrderBy(t => t.Prioridade, new PrioridadeComparer())"], "Declaração da classe, implementação de Compare, instanciação e passagem no OrderBy."),
          p("Associe o StringComparer ao seu cenário de aplicação:", [["StringComparer.OrdinalIgnoreCase","Ideal para códigos, tokens, URLs e chaves técnicas de sistema"],["StringComparer.CurrentCulture","Ideal para exibição de nomes próprios respeitando acentos do idioma"],["IComparer<T>","Interface para criação de regras de ordenação de domínio personalizadas"],["Compare(x, y) < 0","Retorno padrão que indica que o elemento x deve anteceder o elemento y"]], "Usar comparadores adequados garante que ordenações sejam rápidas, previsíveis e culturalmente corretas.")
        ]
      }
    ],
    5: [
      {
        id: "csharp-c11-u5-l1-operadores-de-contagem-e-existencia-count-any-all",
        title: "Operadores de contagem e existência: Count, Any e All",
        subtitle: "Agregações booleanas e numéricas · Avaliando características de coleções em C#",
        theory: "Operadores de agregação reduzem uma sequência de elementos a um valor escalar. O método Any verifica se ao menos um item atende ao predicado, interrompendo a busca no primeiro acerto. Já All exige conformidade de todos, enquanto Count calcula a quantidade total, exigindo percorrer toda a sequência.",
        questions: [
          q("Qual operador LINQ verifica a existência de ao menos um elemento sem precisar contar toda a coleção?", "Any()", ["Count() > 0","All()"], "Any() encerra a iteração no primeiro elemento encontrado, oferecendo desempenho muito superior a Count() > 0."),
          q("O que o operador All() retorna se a coleção de origem estiver completamente vazia?", "true, seguindo o princípio lógico da verdade vacuidade para conjuntos vazios", ["false","Lança InvalidOperationException"], "Em lógica matemática e no LINQ, All sobre coleção vazia sempre retorna true pois nenhum elemento viola o predicado."),
          q("Por que substituir if (lista.Count() > 0) por if (lista.Any()) é uma boa prática recomendada?", "Porque Any interrompe a iteração no primeiro item, enquanto Count varre a sequência inteira", ["Porque Any gasta menos memória do GC","Porque Count foi descontinuado"], "Em sequências grandes ou geradas sob demanda, varrer tudo apenas para saber se há itens gera desperdício de CPU."),
          q("Qual operador deve ser usado caso uma contagem ultrapasse o limite de Int32.MaxValue (2 bilhões)?", "LongCount()", ["BigCount()","Count64()"], "LongCount() retorna um valor do tipo Int64 (long) para coleções massivas."),
          t("Qual operador LINQ avalia se todos os elementos de uma sequência atendem a um predicado booleano?", ["All"], "All() retorna true somente se cada um dos elementos satisfizer a condição estipulada."),
          g("Complete com o operador ideal para verificar se existem pedidos pendentes:", ["Any"], "Any interrompe no primeiro elemento encontrado.", "bool temPendentes = pedidos.____(p => p.Status == \"Pendente\");"),
          o("Ordene a eficiência de verificação de existência em sequências com milhões de itens:", ["lista.Any(p => p.Ativo) - interrompe no primeiro elemento verdadeiro encontrado","lista.Where(p => p.Ativo).Take(1).Count() == 1 - limita a busca ao primeiro item","lista.Count(p => p.Ativo) > 0 - itera toda a sequência calculando a contagem total","lista.ToList().Count > 0 - aloca uma lista inteira em memória para checar tamanho"], "Any é a forma mais direta e veloz de testar presença de itens."),
          p("Associe o operador de verificação à sua semântica de execução:", [["Any()","Retorna true se encontrar ao menos um elemento correspondente"],["All()","Retorna true se absolutamente todos os itens satisfizerem o predicado"],["Count()","Calcula a quantidade exata de elementos na sequência"],["LongCount()","Retorna a contagem como Int64 para volumes massivos de dados"]], "Escolher o operador de agregação correto evita processamentos redundantes em coleções.")
        ]
      },
      {
        id: "csharp-c11-u5-l2-calculos-estatisticos-sum-average-min-max",
        title: "Cálculos estatísticos e extremos: Sum, Average, Min e Max",
        subtitle: "Redução numérica · Totalizando faturamentos e identificando extremos com LINQ",
        theory: "Os métodos Sum, Average, Min e Max executam operações matemáticas sobre coleções numéricas ou propriedades mapeadas via expressões lambda. Caso aplicados sobre coleções vazias, Min e Max disparam InvalidOperationException em tipos por valor não anuláveis, exigindo checagem prévia com Any.",
        questions: [
          q("O que ocorre ao executar numeros.Min() sobre uma lista IEnumerable<int> vazia?", "Lança uma InvalidOperationException informando que a sequência não contém elementos", ["Retorna zero silenciosamente","Retorna int.MinValue"], "Min e Max sobre tipos por valor não anuláveis lançam exceção se a coleção não tiver itens."),
          q("Qual tipo numérico o operador Average() retorna ao calcular a média de uma coleção de inteiros?", "double", ["int truncado","float"], "Average calcula a divisão em ponto flutuante de dupla precisão, retornando double."),
          q("Como totalizar o valor total de uma lista de objetos Pedido usando o método Sum?", "pedidos.Sum(p => p.ValorTotal)", ["pedidos.Select(p).Sum()","pedidos.Sum().ValorTotal"], "Sum aceita uma expressão lambda seletrora que indica a propriedade numérica a ser somada."),
          q("Qual método do LINQ permite obter o menor elemento baseado em uma propriedade sem alterar a ordem?", "MinBy(p => p.Preco)", ["OrderBy(p => p.Preco).Last()","Minimum(p => p.Preco)"], "Desde o .NET 6, MinBy e MaxBy retornam diretamente o objeto com o valor mínimo ou máximo."),
          t("Qual método do LINQ calcula a média aritmética dos elementos de uma sequência?", ["Average"], "Average retorna a média aritmética precisa dos valores fornecidos."),
          g("Complete com a chamada que obtém o pedido de maior valor usando C# moderno:", ["MaxBy"], "MaxBy retorna o objeto inteiro que possui a maior chave.", "var maisCaro = pedidos.____(p => p.ValorTotal);"),
          o("Ordene os passos para calcular a média de salários de um setor de forma segura:", ["Filtrar os colaboradores pertencentes ao setor desejado","Verificar se a sequência filtrada possui elementos com Any()","Executar colaboradores.Where(...).Average(c => c.Salario)","Tratar o caso de setor sem colaboradores atribuindo média zero"], "Filtrar, checar existência, calcular média e tratar caso de coleção vazia."),
          p("Associe o operador matemático à sua operação correspondente:", [["Sum","Calcula o somatório total dos valores numéricos"],["Average","Calcula a média aritmética retornando ponto flutuante"],["MinBy","Retorna o objeto com a menor propriedade avaliada"],["MaxBy","Retorna o objeto com a maior propriedade avaliada"]], "Operadores estatísticos simplificam rotinas analíticas sem necessidade de loops for manuais.")
        ]
      },
      {
        id: "csharp-c11-u5-l3-o-poderoso-operador-aggregate",
        title: "O operador funcional Aggregate: Reduções personalizadas (Fold)",
        subtitle: "Acumulação declarativa · Implementando dobras funcionais de sequências em C#",
        theory: "O método Aggregate aplica uma função acumuladora sobre cada elemento da sequência, equivalente ao fold em linguagens funcionais. É possível fornecer um valor semente inicial (seed), uma função de transição de estado e opcionalmente um transformador final do resultado acumulado.",
        questions: [
          q("A qual padrão clássico da programação funcional o operador Aggregate do LINQ corresponde?", "Fold / Reduce", ["Map / FlatMap","Filter / Slice"], "Aggregate é a implementação do padrão fold/reduce que acumula uma sequência em um único resultado."),
          q("Qual é a assinatura de um Aggregate com valor inicial (seed)?", "numeros.Aggregate(semente, (acumulado, item) => acumulado + item)", ["numeros.Aggregate((item) => item + semente)","numeros.Aggregate(semente)"], "A sobrecarga aceita a semente inicial e a lambda que recebe o acumulador e o elemento corrente."),
          q("O que acontece se executarmos Aggregate sem valor inicial sobre uma coleção vazia?", "Lança InvalidOperationException pois não existe primeiro elemento para iniciar o acumulador", ["Retorna default(T)","Retorna nulo"], "Sem semente explícita, Aggregate usa o primeiro item como valor inicial, falhando em coleções vazias."),
          q("Qual é uma aplicação prática comum de Aggregate em manipulação de texto?", "Concatenar itens formatados ou aplicar uma cadeia de transformações sucessivas a uma string", ["Filtrar números ímpares","Ordenar elementos alfabeticamente"], "Aggregate é excelente para acumular strings, calcular hashes cumulativos ou compor funções."),
          t("Qual método do LINQ realiza reduções e acumulações personalizadas sobre uma coleção?", ["Aggregate"], "Aggregate aplica uma função acumuladora iterativa sobre a sequência."),
          g("Complete a agregação para multiplicar todos os fatores começando com semente 1:", ["Aggregate"], "Aggregate acumula a multiplicação de cada elemento.", "int produto = fatores.____(1, (acc, n) => acc * n);"),
          o("Ordene o fluxo de execução do método Aggregate com semente inicial:", ["O acumulador recebe o valor inicial fornecido no parâmetro seed","O primeiro elemento da coleção é passado à função com o acumulador","O resultado retornado pela função atualiza o valor do acumulador","O processo se repete até o fim da sequência, retornando o valor final"], "Inicialização da semente, chamada com elemento, atualização e retorno final."),
          p("Associe o termo de agregação funcional ao seu papel no Aggregate:", [["Seed","Valor inicial que inicializa o estado do acumulador"],["Func<TAcc, TSource, TAcc>","Função de redução que computa o próximo estado acumulado"],["ResultSelector","Projeção opcional aplicada sobre o valor acumulado final"],["InvalidOperationException","Exceção lançada ao invocar Aggregate sem semente em lista vazia"]], "Aggregate oferece flexibilidade ilimitada para reduzir coleções a estruturas complexas.")
        ]
      },
      {
        id: "csharp-c11-u5-l4-elementos-pontuais-first-single-e-default",
        title: "Elementos pontuais e limites: First, Single, ElementAt e Default",
        subtitle: "Extração segura · Diferenças cruciais entre FirstOrDefault e SingleOrDefault",
        theory: "Para extrair um único item de uma sequência, First retorna o primeiro e FirstOrDefault retorna null/default se não houver. O método Single assegura que exista exatamente um único elemento, disparando exceção se houver zero ou mais de um, sendo crucial para integridade de IDs únicos.",
        questions: [
          q("Qual a diferença fundamental entre FirstOrDefault() e SingleOrDefault() no LINQ?", "SingleOrDefault lança exceção se houver mais de um elemento correspondente; FirstOrDefault ignora os excedentes", ["SingleOrDefault é mais rápido","Não há diferença"], "SingleOrDefault valida unicidade estrita: zero elementos retorna default, mas dois ou mais lançam exceção."),
          q("Quando devemos preferir SingleOrDefault em vez de FirstOrDefault?", "Ao consultar registros por chave primária ou identificador único no qual duplicatas representam corrupção de dados", ["Sempre que quisermos alta performance","Apenas em coleções de strings"], "Se esperamos unicidade conceitual, SingleOrDefault alerta imediatamente sobre duplicações indevidas."),
          q("O que First() lança se nenhum elemento satisfizer a condição da consulta?", "InvalidOperationException", ["NullReferenceException","IndexOutOfRangeException"], "First exige a presença de ao menos um elemento; use FirstOrDefault para evitar a falha."),
          q("O que o método DefaultIfEmpty() faz quando chamado sobre uma sequência vazia?", "Retorna uma sequência contendo um único elemento com o valor default do tipo", ["Apaga a coleção","Lança exceção"], "DefaultIfEmpty garante que a sequência tenha ao menos um elemento padrão, útil em joins."),
          t("Qual método do LINQ garante que exista exatamente um único elemento correspondente na coleção?", ["Single"], "Single lança exceção se houver zero ou mais de um elemento na sequência."),
          g("Complete com a busca do cliente por ID único com validação de duplicatas:", ["SingleOrDefault"], "SingleOrDefault assegura que não existam múltiplos clientes com o mesmo ID.", "var cliente = clientes.____(c => c.Id == idBuscado);"),
          o("Ordene as escolhas de métodos de busca conforme a rigidez de integridade:", ["Single(p => p.Id == id) - exige exatamente um elemento, falha se zero ou múltiplos","SingleOrDefault(p => p.Id == id) - tolera zero itens mas proíbe terminantemente múltiplos","First(p => p.Id == id) - aceita múltiplos mas exige pelo menos um item presente","FirstOrDefault(p => p.Id == id) - tolera ausência e ignora duplicatas silenciosamente"], "Single é o mais estrito, FirstOrDefault é o mais tolerante a ausências e duplicatas."),
          p("Associe o método de seleção à sua consequência quando múltiplos itens existem:", [["First()","Retorna o primeiro item ignorando existências posteriores"],["FirstOrDefault()","Retorna o primeiro item ou default(T) se a sequência estiver vazia"],["Single()","Lança InvalidOperationException tanto para zero quanto para mais de um item"],["SingleOrDefault()","Retorna default se zero, mas lança exceção se houver mais de um item"]], "Conhecer as garantias de First vs Single evita bugs silenciosos em consultas de banco e memória.")
        ]
      },
      {
        id: "csharp-c11-u5-l5-performance-e-multiplas-agregacoes",
        title: "Performance e armadilhas de múltiplas agregações sobre IEnumerable",
        subtitle: "Eficiência de execução · Evitando recalcular consultas caras repetidas vezes",
        theory: "Invocar sucessivamente Min, Max, Average e Count sobre uma mesma consulta LINQ não materializada reexecuta todo o pipeline a cada chamada. Se a consulta envolver chamadas de rede ou processamento pesado, a coleção deve ser materializada com ToList() antes das agregações.",
        questions: [
          q("Qual problema de performance ocorre ao chamar .Min(), .Max() e .Average() na mesma consulta IEnumerable?", "A consulta e todas as suas transformações são reexecutadas do zero três vezes distintas", ["A memória RAM estoura de imediato","O compilador gera erro de compilação"], "IEnumerable representa uma sequência preguiçosa; cada chamada de agregação itera tudo novamente."),
          q("Como prevenir a reiteração múltipla ao calcular diversas métricas estatísticas sobre um filtro LINQ?", "Materializar os dados filtrados em uma lista na memória usando .ToList() antes dos cálculos", ["Usar loops while infinitos","Desativar o coletor de lixo"], "Ao chamar ToList(), os dados são calculados uma única vez e armazenados em uma List<T> rápida."),
          q("Qual analisador de código padrão do ecossistema .NET emite aviso sobre múltiplas iterações?", "Possible multiple enumeration of IEnumerable", ["Deadlock imminent warning","Memory leak detected"], "O Roslyn e o ReSharper alertam sobre \"Possible multiple enumeration of IEnumerable\"."),
          q("Existe operador no .NET para materializar elementos em um conjunto de valores únicos?", "ToHashSet()", ["ToSetList()","ToUniqueArray()"], "ToHashSet() aloca um HashSet<T> otimizado para testes de pertinência O(1)."),
          t("Qual método converte e materializa imediatamente uma sequência LINQ em uma lista em memória?", ["ToList"], "ToList() avalia a consulta e armazena os resultados em uma List<T>."),
          g("Complete a materialização recomendada antes de calcular métricas agregadas:", ["ToList"], "Materializar com ToList previne múltiplas iterações sobre a mesma consulta.", "var aprovados = candidatos.Where(c => c.Nota >= 70).____();"),
          o("Ordene o fluxo correto para executar múltiplas análises sobre uma consulta cara:", ["Construir a expressão de filtro e ordenação sobre o IEnumerable","Materializar a sequência resultante em memória invocando .ToList()","Calcular a contagem usando a propriedade rápida .Count da lista","Calcular Min, Max e Average sobre a lista em memória sem reexecutar filtros"], "Filtro, materialização em lista, contagem O(1) e agregações sobre memória."),
          p("Associe a estrutura ao seu custo de contagem de elementos:", [["List<T>.Count","Propriedade instantânea O(1) lida diretamente do cabeçalho da lista"],["IEnumerable<T>.Count()","Método de extensão que pode precisar iterar todos os itens O(n)"],["HashSet<T>.Count","Propriedade instantânea O(1) de conjunto hash na memória"],["IQueryable<T>.Count()","Gera e envia uma instrução SELECT COUNT(*) ao banco de dados"]], "Distinguir propriedades de contagem em memória de métodos de extensão evita gargalos de CPU.")
        ]
      }
    ],
    6: [
      {
        id: "csharp-c11-u6-l1-agrupamento-de-elementos-com-groupby",
        title: "Agrupamento de elementos com GroupBy e o tipo IGrouping<TKey, TElement>",
        subtitle: "Particionamento de coleções · Organizando dados por chaves categóricas no C#",
        theory: "O operador GroupBy organiza os itens de uma sequência em lotes agrupados por uma chave comum. Cada grupo resultante implementa a interface IGrouping<TKey, TElement>, que expõe a propriedade Key e pode ser iterada como uma sequência dos elementos que compartilham aquela mesma chave.",
        questions: [
          q("Qual tipo representa cada grupo retornado pelo operador GroupBy no LINQ?", "IGrouping<TKey, TElement>", ["KeyValuePair<TKey, TElement>","Dictionary<TKey, List<T>>"], "IGrouping<TKey, TElement> estende IEnumerable<TElement> e expõe a propriedade Key."),
          q("Qual propriedade do objeto IGrouping revela a chave comum compartilhada pelo grupo?", "Key", ["GroupKey","Id"], "A propriedade Key armazena o valor que reuniu os elementos naquele grupo."),
          q("O operador GroupBy altera a ordem original dos elementos dentro de cada grupo?", "Não; preserva a ordem relativa de inserção original dos elementos dentro de cada grupo", ["Sim, ele embaralha aleatoriamente","Ordena sempre de forma decrescente"], "GroupBy mantém a estabilidade da ordem interna dos itens pertencentes ao grupo."),
          q("Como iterar os resultados de um GroupBy utilizando dois laços foreach aninhados?", "O laço externo percorre os grupos exibindo a Key; o laço interno percorre os itens do grupo", ["Ambos os laços devem iterar dicionários paralelos","Não é possível usar foreach com GroupBy"], "Cada grupo é ele próprio uma sequência IEnumerable que pode ser percorrida no laço interno."),
          t("Qual operador LINQ organiza itens em grupos que compartilham uma mesma chave categórica?", ["GroupBy"], "GroupBy particiona os elementos com base na chave extraída por uma expressão lambda."),
          g("Complete o agrupamento de produtos por categoria:", ["GroupBy"], "GroupBy particiona os produtos pela categoria.", "var grupos = produtos.____(p => p.Categoria);"),
          o("Ordene a rotina de agrupamento e exibição de pedidos por status no console:", ["Executar pedidos.GroupBy(p => p.Status) gerando uma sequência de IGrouping","Iniciar o laço foreach externo: foreach (var grupo in grupos)","Imprimir a chave no cabeçalho do bloco: Console.WriteLine(grupo.Key)","Iniciar o laço foreach interno para listar os pedidos individuais do grupo"], "Agrupamento, iteração externa de grupos, exibição da chave e iteração interna dos itens."),
          p("Associe o conceito do GroupBy à sua definição técnica:", [["GroupBy","Operador que particiona sequências em grupos por chave"],["Key","Propriedade de IGrouping que identifica o valor categórico comum"],["IGrouping<TKey, TElement>","Interface que representa uma sequência com uma chave associada"],["Laço Aninhado","Padrão comum para percorrer grupos e seus respectivos elementos"]], "GroupBy é o pilar para relatórios categorizados e sumarização de dados no C#.")
        ]
      },
      {
        id: "csharp-c11-u6-l2-projecao-de-grupos-e-relatorios-sumarizados",
        title: "Projeção de grupos e relatórios sumarizados: Chave e agregações",
        subtitle: "Pipelines analíticos · Transformando grupos em DTOs com totais e contagens",
        theory: "Após aplicar GroupBy, o padrão comum é encadear um método Select para transformar cada IGrouping em um objeto final ou tipo anônimo consolidado. Isso permite calcular contagens, somatórios e médias por grupo, gerando relatórios sumarizados diretamente no pipeline do LINQ.",
        questions: [
          q("Como transformar um agrupamento de funcionários por departamento em uma lista com Totais?", "funcionarios.GroupBy(f => f.Depto).Select(g => new { Depto = g.Key, Total = g.Count() })", ["funcionarios.Sum(f => f.Depto)","funcionarios.OrderBy(f => f.Depto)"], "Encadear Select após GroupBy projeta cada grupo em um resumo analítico."),
          q("O que a expressão g.Average(f => f.Salario) calcula dentro de uma projeção de grupo?", "A média salarial restrita apenas aos membros que pertencem quele grupo específico", ["A média de toda a empresa","O maior salário do grupo"], "Métodos de agregação invocados sobre a variável de grupo operam exclusivamente sobre o subconjunto."),
          q("É possível ordenar os grupos pelo valor agregado resultante, como departamento com mais vendas?", "Sim, encadeando OrderByDescending(g => g.Sum(v => v.Valor)) após o GroupBy", ["Não, a ordem de grupos é imutável","Apenas com SQL nativo"], "Operadores de ordenação podem ser encadeados após GroupBy usando qualquer métrica calculada."),
          q("Qual é a grande vantagem de projetar grupos em tipos anônimos ou records?", "Cria estruturas imutáveis e fortemente tipadas para transportar dados sem boilerplate de classes", ["Garante que o código execute na nuvem","Elimina o garbage collector"], "Records e tipos anônimos tornam o código conciso, imutável e expressivo."),
          t("Qual operador encadeamos após GroupBy para transformar cada grupo em um objeto resumido?", ["Select"], "Select projeta cada IGrouping em um novo formato com totais e médias calculadas."),
          g("Complete a projeção com a contagem total de itens em cada categoria:", ["Count"], "Count() no grupo retorna o número de elementos daquela categoria.", "var resumo = produtos.GroupBy(p => p.Cat).Select(g => new { Cat = g.Key, Qtd = g.____() });"),
          o("Ordene as etapas para gerar um relatório de faturamento por cliente:", ["Agrupar a sequência de vendas pelo ID do cliente: GroupBy(v => v.ClienteId)","Projetar cada grupo calculando o faturamento total com Select","Ordenar os clientes projetados do maior faturamento para o menor com OrderByDescending","Limitar o resultado aos dez clientes principais usando Take(10)"], "Agrupar, projetar agregados, ordenar por faturamento e paginar o topo."),
          p("Associe a operação analítica à sua implementação LINQ:", [["g.Key","Acesso à chave de agrupamento (ex: Categoria ou Região)"],["g.Count()","Total de ocorrências registradas dentro do grupo"],["g.Sum(x => x.Valor)","Somatório monetário ou quantitativo dos membros do grupo"],["g.Max(x => x.Data)","Identificação da data ou evento mais recente do grupo"]], "Projetar grupos é a essência da computação analítica declarativa em memória com C#.")
        ]
      },
      {
        id: "csharp-c11-u6-l3-seletores-de-elementos-e-comparadores-no-groupby",
        title: "Seletores de elementos e comparadores customizados no GroupBy",
        subtitle: "Agrupamento avançado · Controlando chaves compostas e igualdade textual",
        theory: "O método GroupBy possui sobrecargas que aceitam comparadores de igualdade IEqualityComparer<TKey>, ideais para agrupar textos ignorando maiúsculas e minúsculas. Além disso, chaves compostas podem ser criadas com tipos anônimos ou records (ex: g => new { g.Ano, g.Mes }), permitindo particionamentos multidimensionais.",
        questions: [
          q("Como agrupar strings por nome ignorando diferenças entre letras maiúsculas e minúsculas no GroupBy?", "Passando StringComparer.OrdinalIgnoreCase como argumento comparador do GroupBy", ["Chamando ToLower() em todos os textos previamente","Usando o operador Distinct"], "A sobrecarga com IEqualityComparer assegura comparações corretas sem alocar novas strings intermediárias."),
          q("Como definir uma chave composta para agrupar vendas por ano e por região simultaneamente?", "Passando um tipo anônimo na chave: GroupBy(v => new { v.Data.Year, v.Regiao })", ["Concatenando strings: GroupBy(v => v.Data.Year + v.Regiao)","Não é possível agrupar por mais de um campo"], "Tipos anônimos implementam Equals e GetHashCode estruturais, servindo perfeitamente como chaves compostas."),
          q("O que a sobrecarga GroupBy(keySelector, elementSelector) permite fazer diretamente?", "Mapear o valor dos elementos internos antes de armazená-los no grupo, descartando propriedades desnecessárias", ["Mudar o nome das colunas no banco de dados","Inverter a ordem da lista"], "O elementSelector permite que os grupos contenham apenas os campos relevantes em vez do objeto inteiro."),
          q("Por que criar chaves compostas com classes normais sem sobrescrever Equals gera grupos duplicados?", "Porque classes comparam referências de memória por padrão; duas instâncias com mesmos valores são tratadas como chaves distintas", ["Porque o C# não compila classes em chaves","Porque o LINQ exige arrays"], "Classes sem Equals por valor usam igualdade referencial; use records ou tipos anônimos para chaves compostas."),
          t("Qual classe padrão fornece comparadores de igualdade textual que ignoram maiúsculas?", ["StringComparer"], "StringComparer.OrdinalIgnoreCase provê comparação eficiente sem alocações extras."),
          g("Complete o agrupamento insensível a maiúsculas usando o comparador correto:", ["OrdinalIgnoreCase"], "StringComparer.OrdinalIgnoreCase evita discrepâncias entre maiúsculas e minúsculas.", "var grupos = tags.GroupBy(t => t, StringComparer.____);"),
          o("Ordene os passos para criar um agrupamento robusto por chave composta de ano e mês:", ["Definir a sequência de transações financeiras a ser analisada","Invocar GroupBy com tipo anônimo: t => new { t.Data.Year, t.Data.Month }","Garantir que o compilador use a igualdade estrutural gerada pelo tipo anônimo","Iterar os grupos acessando grupo.Key.Year e grupo.Key.Month com segurança"], "Sequência original, chave anônima, igualdade estrutural e consumo seguro."),
          p("Associe a técnica de agrupamento à sua utilidade prática:", [["StringComparer.OrdinalIgnoreCase","Agrupa chaves textuais unificando Maiúsculas e Minúsculas"],["Chave Composta Anônima","Particiona dados por múltiplos critérios simultâneos (Ano, Mês)"],["ElementSelector","Filtra e projeta os objetos internos dentro de cada IGrouping"],["Records em Chaves","Proporciona igualdade de valor e imutabilidade para chaves de grupo"]], "Configurar seletores e comparadores customizados confere precisão profissional ao LINQ.")
        ]
      },
      {
        id: "csharp-c11-u6-l4-juncoes-vs-agrupamentos-join-vs-groupjoin",
        title: "Junções vs Agrupamentos: Comparando Join e GroupJoin no LINQ",
        subtitle: "Relacionamento de sequências · Cruzando coleções relacionadas em memória no C#",
        theory: "O operador Join realiza uma junção interna (Inner Join) entre duas sequências com base em chaves coincidentes, retornando pares combinados. Já o GroupJoin executa o equivalente a um Left Outer Join agrupado, associando cada item da sequência primária a um grupo de elementos correspondentes da secundária.",
        questions: [
          q("Qual a principal diferença entre o operador Join e o GroupJoin no LINQ?", "Join retorna uma linha para cada combinação coincidente; GroupJoin retorna cada item pai associado a um IEnumerable de filhos", ["Join é assíncrono e GroupJoin síncrono","Join só funciona com inteiros"], "GroupJoin preserva a relação hierárquica 1 para N diretamente em memória."),
          q("Como implementar um Left Outer Join tradicional combinando GroupJoin e DefaultIfEmpty?", "Encadeando SelectMany sobre o grupo resultante com .DefaultIfEmpty()", ["Usando Join com try/catch","Invocando o método LeftJoin() que é nativo"], "O padrão clássico de Left Join no LINQ combina GroupJoin, SelectMany e DefaultIfEmpty."),
          q("Quais são os quatro parâmetros principais exigidos pelo método Join?", "Sequência externa, chave externa, chave interna e seletor do resultado", ["Nome da tabela, conexão, timeout e porta","Lista A, Lista B, Comparador e Hash"], "Join conecta duas coleções comparando seletores de chave de cada lado."),
          q("Quando duas entidades possuem relação 1 para Muitos (ex: Cliente e Pedidos), qual operador produz o modelo mais natural?", "GroupJoin", ["Join tradicional plano","Distinct"], "GroupJoin entrega diretamente o cliente acompanhado de sua lista de pedidos correspondentes."),
          t("Qual operador LINQ produz uma relação hierárquica associando cada item pai a uma coleção de itens filhos?", ["GroupJoin"], "GroupJoin entrega o equivalente a uma junção externa agrupada."),
          g("Complete a junção que associa cada categoria aos seus respectivos produtos agrupados:", ["GroupJoin"], "GroupJoin associa cada categoria a uma sequência de produtos.", "var categoriasComProdutos = categorias.____(produtos, c => c.Id, p => p.CatId, (c, prods) => new { c, prods });"),
          o("Ordene a estrutura dos argumentos do método Join no C#:", ["Sequência interna com a qual faremos o cruzamento de dados","Função que extrai a chave de junção do elemento externo","Função que extrai a chave de junção do elemento interno","Função que combina o elemento externo e o interno no resultado"], "Sequência interna, chave externa, chave interna e função de projeção combinada."),
          p("Associe o operador de cruzamento ao seu comportamento relacional:", [["Join","Equivalente a Inner Join relacional: descarta itens sem par em ambos os lados"],["GroupJoin","Equivalente a Left Outer Join agrupado: associa cada pai à lista de filhos"],["SelectMany + DefaultIfEmpty","Aplana os grupos do GroupJoin em linhas individuais de Left Join"],["Zip","Combina elementos de duas sequências pela posição de índice correspondente"]], "Dominar Join e GroupJoin permite orquestrar entidades relacionais sem depender de ORMs para dados em memória.")
        ]
      },
      {
        id: "csharp-c11-u6-l5-transformando-grupos-todictionary-vs-tolookup",
        title: "Transformando grupos em mapas: ToDictionary vs ToLookup",
        subtitle: "Indexação em memória · Escolhendo entre dicionários estritos e lookups multi-valor",
        theory: "Para indexar dados em memória para buscas rápidas O(1), ToDictionary exige que cada chave seja estritamente única, falhando com ArgumentException se houver chaves duplicadas. Quando uma mesma chave possui múltiplos elementos, o método ToLookup é a estrutura ideal, imutável e tolerante.",
        questions: [
          q("O que acontece se invocarmos ToDictionary(x => x.Categoria) e houver dois produtos na mesma categoria?", "Dispara uma ArgumentException avisando que um item com a mesma chave já foi adicionado", ["O segundo produto sobrescreve o primeiro","Cria uma lista automática"], "Dictionary exige chaves estritamente exclusivas; duplicatas causam falha fatal."),
          q("Qual estrutura de dados o operador ToLookup() produz no ecossistema .NET?", "ILookup<TKey, TElement>, um mapa imutável de 1 para N elementos", ["Dictionary<TKey, TElement>","HashSet<TKey>"], "ILookup mapeia uma chave para múltiplos valores de forma imutável e segura."),
          q("Como o ILookup se comporta quando tentamos acessar uma chave inexistente via lookup[chaveInexistente]?", "Retorna uma sequência vazia sem lançar exceção", ["Lança KeyNotFoundException","Retorna null"], "Ao contrário do Dictionary, o Lookup nunca lança KeyNotFoundException; ele simplesmente retorna um IEnumerable vazio."),
          q("Podemos modificar, adicionar ou remover elementos de uma instância de ILookup após sua criação?", "Não, instâncias de ILookup são estritamente imutáveis após a construção", ["Sim, chamando lookup.Add()","Apenas se usarmos reflection"], "ILookup é projetado para consultas somente leitura de altíssima velocidade em memória."),
          t("Qual método do LINQ cria um mapa imutável que aceita chaves duplicadas associadas a múltiplos elementos?", ["ToLookup"], "ToLookup indexa sequências em estruturas 1-para-N seguras."),
          g("Complete a criação de um índice rápido de pedidos por cliente usando lookup:", ["ToLookup"], "ToLookup indexa múltiplos pedidos sob o mesmo ID de cliente.", "var pedidosPorCliente = pedidos.____(p => p.ClienteId);"),
          o("Ordene os passos para decidir entre ToDictionary e ToLookup:", ["Analisar se a chave escolhida é garantidamente única em 100% dos cenários","Se for chave primária única e exigir mutações posteriores, escolher ToDictionary","Se a chave categorizar múltiplos itens por chave (1:N), escolher ToLookup","Aproveitar que ToLookup não lança exceção para chaves ausentes em consultas"], "Análise de unicidade, escolha de ToDictionary para 1:1 e ToLookup para 1:N seguro."),
          p("Associe a estrutura de indexação às suas propriedades:", [["ToDictionary","Requer chaves exclusivas; lança exceção se houver chave duplicada"],["ToLookup","Permite múltiplos valores por chave; imutável após a criação"],["lookup[chaveAusente]","Retorna uma sequência IEnumerable vazia de forma segura"],["dictionary[chaveAusente]","Lança KeyNotFoundException se a chave não estiver cadastrada"]], "Escolher entre Dictionary e Lookup assegura eficiência e estabilidade contra falhas de chaves repetidas.")
        ]
      }
    ],
    7: [
      {
        id: "csharp-c11-u7-l1-o-conceito-de-deferred-execution-execucao-tardia",
        title: "O conceito de Deferred Execution: Execução tardia e preguiçosa no LINQ",
        subtitle: "Avaliação sob demanda · Compreendendo quando o código da consulta realmente roda",
        theory: "No LINQ, métodos que retornam IEnumerable (como Where e Select) utilizam Deferred Execution (execução adiada). A declaração da consulta não processa nenhum elemento de imediato; ela constrói apenas uma receita de iteração. A computação ocorre exclusivamente quando a sequência é consumida.",
        questions: [
          q("Quando uma consulta LINQ com .Where() e .Select() realmente começa a processar dados?", "Apenas quando for explicitamente iterada (por um foreach) ou materializada (como ToList)", ["No momento exato em que a variável da consulta é declarada","Em segundo plano pelo compilador"], "A consulta é uma árvore de iteração sob demanda; nada executa até que os itens sejam solicitados."),
          q("O que acontece se modificarmos a lista de origem após definir a consulta LINQ mas antes de iterá-la?", "A consulta refletirá os novos dados adicionados pois sua execução só ocorrerá no momento da iteração", ["A consulta usará uma cópia dos dados antigos","O código lançará erro de concorrência"], "Como a execução é diferida, a consulta lê a fonte no estado em que ela estiver no momento do consumo."),
          q("Qual termo em ciência da computação descreve essa característica de computar valores apenas quando estritamente necessários?", "Lazy Evaluation (Avaliação Preguiçosa)", ["Eager Evaluation","Static Dispatch"], "Lazy Evaluation posterga o esforço computacional até o instante de consumo real do dado."),
          q("Quais tipos de operadores LINQ forçam a execução imediata (Eager) em vez de diferida?", "Operadores de materialização (ToList, ToArray) e agregações escalares (Count, Sum, Any, First)", ["Where e Select","Take e Skip"], "Métodos que retornam valores finais ou coleções concretas precisam rodar imediatamente para obter a resposta."),
          t("Qual é o termo técnico para a execução postergada de consultas LINQ até o momento do consumo?", ["adiada"], "Execução adiada (Deferred Execution) calcula itens apenas sob demanda."),
          g("Complete o método que encerra o adiamento forçando a execução imediata da consulta:", ["ToList"], "ToList materializa a consulta imediatamente.", "var resultadoImediato = consultaAdiada.____();"),
          o("Ordene a linha do tempo da execução adiada no LINQ:", ["Definição da consulta LINQ: var q = itens.Where(x => x.Ativo); (nenhum item processado)","Inclusão de um novo item ativo na coleção itens original","Início do consumo via foreach (var item in q)","Os itens são filtrados um a um sob demanda, incluindo o novo item adicionado"], "Definição da receita, alteração na origem, início do loop e filtragem sob demanda."),
          p("Associe a categoria do operador ao seu momento de execução:", [["Where / Select / Take","Execução Adiada (Deferred): computa itens um a um durante a iteração"],["ToList / ToArray","Execução Imediata (Eager): processa e aloca toda a coleção na memória"],["Count / Sum / Any","Execução Imediata (Eager): itera a sequência para calcular o escalar"],["OrderBy","Execução Adiada com Buffer: aguarda a iteração, mas precisa ler tudo para ordenar"]], "Entender a fronteira entre execução adiada e imediata é vital para performance e correção lógica.")
        ]
      },
      {
        id: "csharp-c11-u7-l2-armadilhas-de-closures-e-variaveis-capturadas",
        title: "Armadilhas de closures e variáveis capturadas em consultas diferidas",
        subtitle: "Captura de variáveis · O perigo de modificar variáveis antes da iteração da consulta",
        theory: "Expressões lambda em consultas LINQ capturam variáveis locais por referência (closure). Devido à execução adiada, se o valor da variável capturada for alterado antes de a consulta ser executada, o LINQ utilizará o valor final modificado, gerando comportamentos inesperados se o desenvolvedor não estiver atento.",
        questions: [
          q("O que acontece se uma variável capturada em uma lambda de consulta for modificada antes do foreach?", "O LINQ executará a consulta usando o último valor que a variável assumiu antes da iteração", ["O LINQ usará o valor que a variável tinha no momento da declaração","O código não compila"], "Lambdas capturam a referência da variável; a leitura do valor ocorre somente no momento da avaliação."),
          q("Como evitar o problema clássico de captura de variável de laço for em versões antigas do C#?", "Copiar o valor da variável de iteração para uma variável local interna antes de usá-la na lambda", ["Usar goto","Declarar a variável como estática"], "Criar uma variável local dentro do escopo do bloco garante que cada iteração capture sua própria instância isolada."),
          q("O que o compilador do C# gera nos bastidores para sustentar uma closure?", "Uma classe anônima gerada internamente contendo os campos capturados e o método de invocação", ["Uma thread separada no sistema operacional","Um ponteiro nativo em C++"], "O compilador gera uma classe oculta (display class) para armazenar o estado das variáveis capturadas."),
          q("Se uma consulta LINQ capturar uma instância pesada de serviço, por quanto tempo ela ficará viva na memória?", "Ficará viva enquanto a referência da consulta LINQ estiver viva, impedindo a coleta pelo GC", ["Será destruída imediatamente","Por 5 segundos"], "Enquanto a consulta existir e guardar a closure, os objetos capturados permanecem retidos no Heap."),
          t("Qual conceito permite que expressões lambda capturem variáveis de seu escopo circundante?", ["closure"], "Closures retêm variáveis do escopo léxico externo para uso posterior."),
          g("Complete com a criação de uma variável local isolada para evitar efeitos colaterais de closure:", ["var"], "Isolar em variável local protege contra mutações tardias.", "int limiteAtual = 100; ____ copiaLimite = limiteAtual; var q = lista.Where(x => x > copiaLimite);"),
          o("Ordene a mecânica de uma falha de closure por mutação tardia:", ["Variável limite é declarada com valor 10","Consulta LINQ é criada: var q = numeros.Where(n => n > limite);","A variável limite tem seu valor alterado para 100 logo em seguida","Ao iterar q no foreach, o filtro avalia n > 100 em vez de n > 10"], "Declaração, definição da consulta com closure, mutação posterior e execução com valor modificado."),
          p("Associe o aspecto da closure ao seu comportamento:", [["Captura por Referência","A lambda acessa o local da variável, não uma cópia estática do momento"],["Display Class","Classe gerada pelo compilador para hospedar variáveis capturadas"],["Retenção de Memória","Objetos capturados não podem ser coletados pelo GC enquanto a consulta existir"],["Isolamento de Escopo","Criar variável local impede que mutações externas afetem a consulta"]], "Dominar closures garante previsibilidade ao misturar estado mutável com código declarativo.")
        ]
      },
      {
        id: "csharp-c11-u7-l3-iteradores-e-a-magia-do-yield-return",
        title: "Iteradores e a mecânica interna do yield return nos bastidores",
        subtitle: "Máquinas de estado · Como o C# implementa fluxos preguiçosos sem alocar listas",
        theory: "Operadores como Where e Select utilizam internamente a instrução yield return. O compilador do C# transforma métodos com yield return em máquinas de estado que implementam IEnumerator<T>, pausando a execução a cada item emitido e retomando-a apenas quando o consumidor invoca MoveNext().",
        questions: [
          q("Como o compilador do C# reescreve um método que contém instruções yield return?", "Gera uma classe interna privada que implementa IEnumerator<T> estruturada como uma máquina de estados", ["Cria um processo independente no sistema","Transforma o método em código C++ nativo"], "O compilador gera uma máquina de estados finita que lembra a posição onde a execução pausou."),
          q("Qual método da interface IEnumerator avança a máquina de estados para o próximo elemento da sequência?", "MoveNext()", ["Next()","Step()"], "MoveNext() executa o código até o próximo yield return, retornando true se houver item ou false se encerrou."),
          q("O que acontece com a execução do método no momento exato em que ele atinge um yield return?", "A execução do método é pausada, o valor é entregue ao consumidor e o estado atual é preservado", ["O método encerra definitivamente","A memória do método é limpa"], "A execução congela até que o consumidor chame MoveNext() novamente para solicitar o próximo dado."),
          q("Qual instrução em C# pode ser usada dentro de um iterador para encerrar a iteração antecipadamente?", "yield break", ["break loop","return null"], "yield break sinaliza o término definitivo da sequência iterável."),
          t("Qual comando do C# emite um elemento sob demanda e pausa a execução do método iterador?", ["yield return"], "yield return emite um valor e suspende o método até a próxima requisição de item."),
          g("Complete o comando que emite itens sob demanda em um iterador customizado:", ["yield return"], "yield return constrói sequências preguiçosas sem listas intermediárias.", "if (item.Ativo) ____ item;"),
          o("Ordene o ciclo de vida de consumo de um iterador com yield return:", ["O consumidor chama MoveNext() no enumerador","O método iterador executa até atingir a instrução yield return","O valor emitido é disponibilizado na propriedade Current e o método pausa","O consumidor lê Current e depois chama MoveNext() para o próximo item"], "Chamada de MoveNext, execução até o yield, disponibilização em Current e pausa."),
          p("Associe o membro do IEnumerator ao seu papel na iteração:", [["MoveNext()","Avança a máquina de estados até o próximo elemento, retornando booleano"],["Current","Propriedade que expõe o elemento atual onde a execução está pausada"],["yield return","Instrução do C# que produz um valor para Current e congela o método"],["yield break","Instrução que finaliza a máquina de estados indicando fim da sequência"]], "Compreender yield return desmistifica como o LINQ processa gigabytes de dados com pegada mínima de RAM.")
        ]
      },
      {
        id: "csharp-c11-u7-l4-consultas-idempotentes-vs-recursos-efemeros",
        title: "Consultas idempotentes vs Recursos efêmeros e chamadas de rede",
        subtitle: "Efeitos colaterais · Riscos de consultas diferidas ligadas a streams e I/O",
        theory: "Consultas LINQ puras sobre coleções imutáveis em memória são idempotentes (podem ser iteradas várias vezes com mesmo resultado). Porém, se a fonte de dados for efêmera (como um StreamReader, socket de rede ou conexão de banco descartável), a reexecução da consulta causará falhas graves.",
        questions: [
          q("Por que iterar uma consulta LINQ ligada a um StreamReader após fechá-lo gera falha?", "Porque a execução diferida tentará ler o stream somente no foreach, quando o recurso já estará descartado", ["Porque LINQ não funciona com arquivos","Porque o coletor de lixo apaga strings"], "Se a consulta diferida executar após o bloco using do StreamReader, haverá ObjectDisposedException."),
          q("O que caracteriza uma consulta LINQ idempotente?", "Produzir exatamente o mesmo resultado a cada execução sem provocar efeitos colaterais no sistema", ["Executar em menos de 1 milissegundo","Exigir sempre banco de dados"], "Idempotência garante que reavaliar a consulta não altere o estado nem entregue dados divergentes."),
          q("Como garantir que os dados de uma consulta que consome um recurso efêmero fiquem salvos antes do descarte?", "Materializar a consulta em uma coleção com .ToList() ou .ToArray() antes de fechar o recurso", ["Adicionar um Thread.Sleep","Remover o bloco using"], "Materializar consome todos os dados imediatamente enquanto o canal de comunicação ainda está aberto."),
          q("Qual exceção comum é lançada ao tentar ler dados diferidos de um contexto de banco de dados já encerrado?", "ObjectDisposedException", ["NullReferenceException","StackOverflowException"], "Tentar ler de um contexto descartado dispara ObjectDisposedException."),
          t("Qual método força a leitura imediata de todos os itens de uma consulta antes que um recurso seja fechado?", ["ToList"], "ToList materializa os dados antes do descarte do recurso de I/O."),
          g("Complete a materialização obrigatória antes do fechamento do leitor de arquivo:", ["ToList"], "Materializar dentro do escopo using impede leitura sobre stream descartado.", "using var reader = new StreamReader(caminho); return Linhas(reader).____();"),
          o("Ordene a abordagem correta para consultar recursos de I/O efêmeros:", ["Abrir a conexão ou stream de dados dentro de uma cláusula using","Construir a expressão LINQ de leitura e filtragem sobre o recurso","Materializar a consulta chamando .ToList() antes do encerramento do escopo","Fechar com segurança o recurso e devolver a lista materializada ao chamador"], "Abertura no using, construção da consulta, materialização obrigatória e fechamento seguro."),
          p("Associe o tipo de fonte de dados à sua característica de consumo:", [["List<T> em Memória","Fonte estável e idempotente; pode ser iterada múltiplas vezes sem surpresas"],["StreamReader de Arquivo","Fonte efêmera; se percorrida após fechar o arquivo lança ObjectDisposedException"],["DbContext do EF Core","Exige conexão aberta; iteração diferida requer que o contexto ainda esteja ativo"],["Sequência de Números Aleatórios","Fonte não idempotente; cada iteração gera valores completamente distintos"]], "Saber quando materializar recursos efêmeros previne falhas críticas de conexão e I/O em produção.")
        ]
      },
      {
        id: "csharp-c11-u7-l5-operadores-com-buffer-orderby-e-reverse",
        title: "Operadores com buffer: Por que OrderBy e Reverse quebram o streaming puro",
        subtitle: "Pipelines híbridos · Identificando operadores que precisam engolir toda a sequência",
        theory: "Enquanto Where e Select transmitem elementos em fluxo contínuo (streaming) item a item com consumo O(1) de memória, operadores de ordenação como OrderBy e Reverse exigem bufferizar a sequência completa em memória antes de poder emitir o primeiro elemento, alterando a complexidade de espaço.",
        questions: [
          q("Por que o operador OrderBy não consegue emitir seu primeiro elemento em streaming puro?", "Porque é impossível determinar qual é o menor item sem antes examinar absolutamente toda a sequência", ["Porque ele roda em outra CPU","Por uma limitação do C#"], "Para saber quem vem primeiro, todos os itens precisam ser lidos e comparados em um buffer interno."),
          q("Qual é o impacto de memória de usar OrderBy sobre um IEnumerable de 10 milhões de itens?", "Aloca um buffer interno na memória para armazenar todos os 10 milhões de elementos durante a ordenação", ["Nenhum impacto de memória","Consome apenas 16 bytes"], "Operadores que exigem bufferização completa armazenam temporariamente toda a sequência no Heap."),
          q("Se encadearmos itens.OrderBy(...).Take(5), o OrderBy ainda precisará ler a coleção inteira?", "Sim; o OrderBy consome toda a sequência para ordenar, e só então o Take extrai os 5 primeiros", ["Não, ele lê apenas 5 itens","O compilador transforma em erro"], "Mesmo com Take(5), a ordenação completa precisa ser realizada a menos que haja um índice de banco no caso de IQueryable."),
          q("Quais destes operadores operam em streaming puro sem bufferizar a coleção inteira?", "Where, Select, Take, Skip", ["OrderBy, GroupBy, Reverse","Distinct, ToList"], "Where, Select, Take e Skip processam e repassam itens um a um sem reter a totalidade."),
          t("Qual método do LINQ inverte a ordem dos itens exigindo bufferização prévia da sequência?", ["Reverse"], "Reverse precisa ler todos os itens até o final antes de poder emitir o último como primeiro."),
          g("Complete com o operador que requer bufferizar toda a sequência antes de emitir o primeiro item:", ["OrderBy"], "OrderBy precisa de todos os elementos para saber qual é o menor.", "var ordenados = fluxoGigante.____(x => x.Data);"),
          o("Ordene os operadores conforme o consumo de memória em pipelines LINQ:", ["Where - streaming puro; consome O(1) de memória avaliando item a item","Take - streaming limitado; interrompe após N itens com memória constante O(1)","Distinct - streaming com memória proporcional aos itens únicos já vistos","OrderBy - buffer completo; retém O(n) de todos os elementos da fonte antes de emitir"], "Where e Take são streaming constante, Distinct retém conjunto e OrderBy bufferiza tudo."),
          p("Associe o operador LINQ ao seu modelo de processamento de fluxo:", [["Where","Streaming puro: avalia e entrega elementos individualmente sob demanda"],["Take","Streaming limitado: entrega N itens e finaliza sem ler o restante"],["OrderBy","Buffer total: carrega toda a sequência em memória para realizar a ordenação"],["Reverse","Buffer total: consome toda a sequência para emitir na ordem inversa"]], "Entender quais operadores quebram o streaming evita estouros de memória em processamento de grandes lotes.")
        ]
      }
    ],
    8: [
      {
        id: "csharp-c11-u8-l1-materializando-colecoes-com-tolist-toarray-tohashset",
        title: "Materializando coleções com ToList, ToArray e ToHashSet",
        subtitle: "Congelando dados · Convertendo fluxos efêmeros em estruturas concretas de alta velocidade",
        theory: "A materialização converte uma consulta diferida em uma estrutura de dados concreta em memória. ToList cria uma lista dinâmica redimensionável, ToArray gera um array de tamanho fixo com sobrecarga mínima, e ToHashSet elimina duplicatas criando uma tabela hash com buscas O(1).",
        questions: [
          q("Qual método de materialização deve ser escolhido se o tamanho do resultado for imutável e a economia de memória for prioritária?", "ToArray()", ["ToList()","ToQueue()"], "Arrays alocam um único bloco contíguo de memória sem a capacidade ociosa de redimensionamento de listas."),
          q("Qual estrutura materializada provê testes de existência (Contains) em tempo constante O(1)?", "ToHashSet()", ["ToList()","ToArray()"], "HashSet utiliza tabelas hash para checar pertinência em O(1), enquanto List e Array exigem busca linear O(n)."),
          q("O que acontece com os dados materializados se a coleção de origem original for alterada posteriormente?", "A coleção materializada permanece inalterada, funcionando como um snapshot estático do momento da materialização", ["Ela se atualiza automaticamente","Lança exceção"], "A materialização desvincula os dados do pipeline LINQ, isolando os resultados obtidos."),
          q("Qual é o custo computacional de materializar uma sequência de N elementos?", "O(n) em tempo e O(n) em espaço de memória", ["O(1) instantâneo","O(n²)"], "Materializar percorre toda a sequência alocando memória proporcional ao volume de dados coletados."),
          t("Qual método materializa elementos em uma coleção com garantia de ausência de duplicatas e busca O(1)?", ["ToHashSet"], "ToHashSet constrói um conjunto hash a partir da sequência."),
          g("Complete a conversão para array de tamanho fixo de alta performance:", ["ToArray"], "ToArray aloca um vetor contíguo.", "int[] primos = sequencia.Where(EhPrimo).____();"),
          o("Ordene a escolha da coleção de destino ideal conforme o caso de uso:", ["Se precisará adicionar ou remover itens frequentemente: escolher ToList()","Se o volume for somente leitura e de tamanho conhecido: escolher ToArray()","Se precisará consultar Contains(x) milhões de vezes com rapidez: escolher ToHashSet()","Se precisar associar chaves únicas a registros de busca rápida: escolher ToDictionary()"], "ToList para flexibilidade, ToArray para menor footprint, ToHashSet para buscas e ToDictionary para chaves."),
          p("Associe o método de materialização ao seu principal benefício:", [["ToList()","Estrutura mutável e dinâmica; permite adições e remoções posteriores"],["ToArray()","Menor overhead de memória para dados de tamanho imutável"],["ToHashSet()","Eliminação imediata de duplicatas e checagem de Contains em O(1)"],["ToDictionary()","Indexação por chave exclusiva para recuperação de dados em O(1)"]], "Escolher a estrutura de materialização certa otimiza tempo de CPU e consumo de memória RAM.")
        ]
      },
      {
        id: "csharp-c11-u8-l2-paginacao-eficiente-com-skip-e-take",
        title: "Paginação eficiente com Skip, Take, TakeWhile e SkipWhile",
        subtitle: "Fatiamento de dados · Controlando lotes e páginas de resultados em C#",
        theory: "Para fatiar grandes volumes de dados, Take(n) extrai os primeiros n elementos e Skip(n) salta n elementos. A combinação .Skip((pagina - 1) * tamanho).Take(tamanho) é o padrão universal de paginação. Já TakeWhile e SkipWhile operam com base em predicados booleanos até o primeiro falso.",
        questions: [
          q("Qual é a fórmula canônica para obter uma página de resultados usando Skip e Take?", ".Skip((pagina - 1) * tamanhoPagina).Take(tamanhoPagina)", [".Take(pagina).Skip(tamanhoPagina)",".Skip(pagina * tamanhoPagina).Take(pagina)"], "Essa fórmula pula as páginas anteriores e coleta exatamente a quantidade de itens da página solicitada."),
          q("Qual a diferença entre Take(5) e TakeWhile(x => x.Ativo)?", "Take coleta até 5 itens fixos; TakeWhile coleta itens enquanto a condição for verdadeira, parando no primeiro falso", ["TakeWhile roda em paralelo","Não há diferença"], "TakeWhile avalia a sequência elemento a elemento e encerra a coleta no primeiro item que violar a condição."),
          q("Por que é indispensável aplicar OrderBy antes de Skip e Take em paginação de dados?", "Para garantir estabilidade determinística das páginas, evitando que itens troquem de página entre requisições", ["Porque senão o código não compila","Para economizar memória do servidor"], "Sem ordenação determinística, a ordem de retorno pode variar, repetindo ou omitindo itens entre páginas."),
          q("Como obter os últimos 10 elementos de uma coleção no .NET moderno com LINQ?", "colecao.TakeLast(10)", ["colecao.Reverse().Skip(10)","colecao.Last(10)"], "TakeLast e SkipLast permitem fatiar o final da sequência de forma limpa e direta."),
          t("Qual método do LINQ pula uma quantidade específica de elementos antes de repassar o restante?", ["Skip"], "Skip pula a quantidade de elementos indicada."),
          g("Complete com a paginação de 20 itens por página para a página 3 (pular 40 itens):", ["Skip"], "Pular 40 itens corresponde a (3 - 1) * 20.", "var pagina3 = produtos.OrderBy(p => p.Id).____(40).Take(20);"),
          o("Ordene a construção de um endpoint paginado seguro no C#:", ["Validar se o número da página é >= 1 e se o tamanho do lote está dentro de limites seguros","Aplicar uma ordenação determinística clara sobre a fonte (ex: OrderBy(x => x.Id))","Aplicar o cálculo de salto e coleta: .Skip((page - 1) * pageSize).Take(pageSize)","Materializar a página com .ToList() e retornar junto com os metadados de paginação"], "Validação de parâmetros, ordenação determinística, cálculo Skip/Take e materialização."),
          p("Associe o operador de fatiamento à sua regra de parada:", [["Take(n)","Coleta até n elementos e finaliza a iteração imediatamente"],["Skip(n)","Ignora os primeiros n elementos e transmite todos os subsequentes"],["TakeWhile(cond)","Coleta elementos enquanto a condição for true; encerra no primeiro false"],["SkipWhile(cond)","Ignora elementos enquanto a condição for true; transmite todos após o primeiro false"]], "Operadores de fatiamento fornecem controle fino sobre janelas de processamento de dados.")
        ]
      },
      {
        id: "csharp-c11-u8-l3-operacoes-de-conjunto-distinct-union-intersect-except",
        title: "Operações de conjunto: Distinct, Union, Intersect e Except",
        subtitle: "Álgebra de conjuntos · Manipulando uniões, interseções e diferenças com LINQ",
        theory: "O LINQ oferece operadores de teoria dos conjuntos. Distinct remove duplicatas. Union une duas sequências eliminando duplicatas entre elas. Intersect retorna apenas os itens presentes em ambas as fontes, e Except retorna os itens da primeira fonte que não constam na segunda.",
        questions: [
          q("Qual a diferença entre Concat e Union no LINQ?", "Concat apenas junta as duas sequências preservando duplicatas; Union junta eliminando elementos repetidos", ["Concat só aceita strings","Union não compila em C#"], "Union aplica semântica de conjunto matemático, descartando duplicatas automaticamente."),
          q("Qual operador do LINQ retorna apenas os elementos que existem simultaneamente em duas listas A e B?", "Intersect", ["Except","Union"], "Intersect extrai a interseção matemática entre dois conjuntos de dados."),
          q("Se a lista A possui [1, 2, 3] e a lista B possui [2, 3, 4], o que A.Except(B) retornará?", "[1]", ["[4]","[1, 4]"], "Except retorna os elementos exclusivos do primeiro conjunto que não existem no segundo."),
          q("Como remover duplicatas de uma lista de objetos baseando-se em uma propriedade específica como CPF?", "Usando DistinctBy(p => p.Cpf)", ["Usando Distinct() comum","Usando OrderBy(p => p.Cpf)"], "Desde o .NET 6, DistinctBy permite remover repetições avaliando uma chave de domínio selecionada."),
          t("Qual método do LINQ extrai a diferença entre dois conjuntos retornando itens exclusivos do primeiro?", ["Except"], "Except subtrai os itens do segundo conjunto da primeira sequência."),
          g("Complete com o operador que unifica duas sequências descartando duplicatas:", ["Union"], "Union realiza a união de conjuntos sem duplicações.", "var todosUnicos = listaA.____(listaB);"),
          o("Ordene os resultados das operações para ListaA [1, 2] e ListaB [2, 3]:", ["ListaA.Concat(ListaB) resulta em [1, 2, 2, 3] (junção direta preservando duplicatas)","ListaA.Union(ListaB) resulta em [1, 2, 3] (união matemática sem duplicatas)","ListaA.Intersect(ListaB) resulta em [2] (apenas o elemento presente em ambas)","ListaA.Except(ListaB) resulta em [1] (elementos da primeira ausentes na segunda)"], "Concat junta tudo, Union dediplica, Intersect pega comuns e Except calcula a diferença."),
          p("Associe o operador de conjunto à sua representação matemática:", [["Distinct","Apenas elementos únicos dentro de uma mesma sequência"],["Union","União de dois conjuntos: A ∪ B sem duplicações"],["Intersect","Interseção de dois conjuntos: A ∩ B"],["Except","Diferença de conjuntos: A - B (exclusivos de A)"]], "Operações de conjunto resolvem cruzamentos complexos de listas em uma única linha legível.")
        ]
      },
      {
        id: "csharp-c11-u8-l4-a-armadilha-do-multiple-enumeration",
        title: "A armadilha do Multiple Enumeration e diagnósticos de código",
        subtitle: "Consumo repetido · Por que o ReSharper e o Roslyn alertam sobre iterações múltiplas",
        theory: "Iterar uma mesma variável IEnumerable múltiplas vezes pode parecer inofensivo, mas se a consulta contiver filtros pesados ou leituras remotas, cada passagem reexecutará todo o processo do zero. Analisadores estáticos do C# sinalizam o alerta \"Possible multiple enumeration\" para prevenir esse desperdício.",
        questions: [
          q("Por que os analisadores de código como Roslyn e ReSharper alertam sobre \"Possible multiple enumeration of IEnumerable\"?", "Porque iterar a mesma sequência adiada mais de uma vez pode disparar múltiplas consultas lentas e gerar bugs se a fonte mudar", ["Porque o compilador proíbe dois laços foreach no mesmo método","Porque a memória do computador é corrompida"], "Se o IEnumerable vier de um banco ou cálculo caro, cada iteração repete todo o custo de rede e processamento."),
          q("Qual é a correção recomendada quando nos deparamos com o aviso de múltipla enumeração?", "Materializar o IEnumerable em uma List<T> ou array logo no início do método usando .ToList()", ["Ignorar o aviso desligando o compilador","Substituir por um laço goto"], "Armazenar em uma coleção concreta permite iterar quantas vezes forem necessárias sem reexecutar a consulta."),
          q("Iterar um array ou List<T> passado como IEnumerable dispara o aviso de múltipla enumeração?", "Sim, pois o compilador analisa o tipo declarado IEnumerable<T>, sem saber em tempo de compilação qual é a implementação concreta", ["Não, o compilador adivinha a instância","Apenas no Linux"], "O analisador estático avalia a assinatura estática da variável; se o tipo é IEnumerable<T>, o risco existe."),
          q("Qual risco existe se a fonte do IEnumerable for mutável entre duas enumerações sucessivas?", "A primeira enumeração pode ver um conjunto de itens e a segunda enumeração ver dados totalmente diferentes e inconsistentes", ["Nenhum risco","O código trava no BIOS"], "Inconsistência de leitura pode levar a falhas de negócio graves caso decisões sejam tomadas com base em dados divergentes."),
          t("Qual estrutura de coleção estática recomendada elimina o alerta de múltipla enumeração?", ["List"], "Materializar para List armazena o resultado em memória e resolve a múltipla enumeração."),
          g("Complete a sanitização do parâmetro para evitar o aviso de múltipla enumeração:", ["ToList"], "Materializar a entrada garante que os laços subsequentes operem em memória.", "var itensSeguros = itens.____(); if (itensSeguros.Any()) { Processar(itensSeguros); }"),
          o("Ordene a prevenção profissional do Multiple Enumeration:", ["Receber um parâmetro do tipo IEnumerable<T> na assinatura do método","Constatar que o parâmetro será verificado em uma checagem (Any) e depois percorrido em laço","Materializar o parâmetro na primeira linha: var lista = param.ToList();","Executar todas as validações e iterações subsequentes sobre a lista materializada"], "Recepção de IEnumerable, identificação de múltiplos usos, materialização inicial e consumo seguro."),
          p("Associe a situação de enumeração ao seu impacto no sistema:", [["IEnumerable de EF Core","Múltipla enumeração envia múltiplas consultas SQL idênticas ao banco"],["IEnumerable com Yield Return","Múltipla enumeração reexecuta toda a lógica e cálculos do gerador"],["Materialização com .ToList()","Consome a fonte uma única vez e serve as demais iterações da memória RAM"],["Aviso do Roslyn","Alerta estático em tempo de design prevenindo desperdício e inconsistências"]], "Tratar o Multiple Enumeration é sinal de maturidade técnica no desenvolvimento em C#.")
        ]
      },
      {
        id: "csharp-c11-u8-l5-boas-praticas-ienumerable-vs-ireadonlylist-em-apis",
        title: "Boas práticas de arquitetura: Retornar IEnumerable<T> vs IReadOnlyList<T>",
        subtitle: "Design de contratos · Definindo assinaturas de métodos previsíveis e limpas em C#",
        theory: "Na fronteira pública de APIs e serviços, expor IEnumerable<T> sinaliza uma sequência sob demanda que pode exigir iteração única. Se os dados já foram buscados e armazenados em memória, retornar IReadOnlyList<T> é a melhor prática: comunica imutabilidade, contagem O(1) e acesso rápido por índice.",
        questions: [
          q("Por que expor IReadOnlyList<T> em vez de IEnumerable<T> em métodos de serviços com dados em memória é preferível?", "Porque IReadOnlyList garante acesso indexado O(1), contagem imediata sem iteração e comunica que os dados estão prontos", ["Porque IEnumerable foi descontinuado","Porque IReadOnlyList ocupa menos memória que int"], "IReadOnlyList comunica clareza semântica: os dados estão materializados, contados e prontos para leitura sem surpresas."),
          q("Quando é semanticamente apropriado retornar IEnumerable<T> em um método público?", "Quando o método gera um fluxo sob demanda potencialmente infinito ou quando implementa paginação streaming preguiçosa", ["Sempre, em todas as situações","Apenas em métodos assíncronos"], "IEnumerable é perfeito para fluxos contínuos sob demanda (como leituras de logs linha a linha)."),
          q("Qual interface do C# expõe métodos mutáveis como Add e Remove que devem ser evitados em retornos de encapsulamento?", "IList<T> ou List<T>", ["IReadOnlyCollection<T>","IEnumerable<T>"], "Expor List<T> diretamente permite que o consumidor adicione ou limpe itens, violando o encapsulamento do domínio."),
          q("Como converter uma List<T> interna para um contrato de somente leitura IReadOnlyList<T>?", "Retornando-a diretamente (pois List<T> implementa IReadOnlyList<T>) ou usando .AsReadOnly()", ["Fazendo um cast para string","Clonando o disco rígido"], "List<T> já implementa IReadOnlyList<T> nativamente, permitindo retorno direto com segurança de tipo."),
          t("Qual interface genérica de somente leitura expõe acesso indexado e propriedade Count O(1)?", ["IReadOnlyList"], "IReadOnlyList<T> é o padrão ouro para coleções de retorno somente leitura em C#."),
          g("Complete o retorno recomendado que preserva o encapsulamento de leitura:", ["IReadOnlyList"], "IReadOnlyList expressa imutabilidade pública com alta performance.", "public ____<Produto> ObterProdutos() => _produtos;"),
          o("Ordene a evolução do design de contratos de coleções em C#:", ["Retornar ArrayList não genérico com necessidade de casts arriscados (C# 1.0)","Retornar List<T> expondo métodos mutáveis Add/Remove que quebram encapsulamento","Retornar IEnumerable<T> causando avisos de múltipla enumeração no consumidor","Retornar IReadOnlyList<T> oferecendo imutabilidade, contagem O(1) e acesso limpo"], "Evolução de coleções brutas até interfaces expressivas de somente leitura."),
          p("Associe o contrato de retorno ao seu compromisso de API:", [["IEnumerable<T>","Sinaliza sequência potencialmente preguiçosa e sob demanda"],["IReadOnlyList<T>","Garante dados materializados com contagem e índice O(1) somente leitura"],["List<T>","Expõe mutabilidade completa (Add, Clear, Remove); evite na fronteira de domínio"],["IAsyncEnumerable<T>","Representa fluxos assíncronos sob demanda transmitidos via await foreach"]], "Definir os tipos de retorno corretos torna bibliotecas e APIs .NET robustas, limpas e idiomáticas.")
        ]
      }
    ]
  });
})();
