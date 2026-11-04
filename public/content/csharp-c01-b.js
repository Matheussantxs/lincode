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

  const lang = 'csharp';
  const chId = 'csharp-c01';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    5: [
      {
        id: "cs-c01-u5-l1",
        title: "Leitura de dados no console com Console.ReadLine",
        subtitle: "Apresentação · leitura com Console.ReadLine e tipos de retorno",
        theory: "O método Console.ReadLine() pausa a execução do programa e aguarda o usuário digitar uma linha de texto no terminal até pressionar Enter. O valor retornado é sempre do tipo string? (string anulável), exigindo tratamento quando esperamos números ou valores obrigatórios.",
        questions: [
        q("Qual método da classe Console lê uma linha completa digitada pelo usuário no terminal em C#?", "Console.ReadLine()", ["Console.ReadText()","Console.Scan()"], "Console.ReadLine() captura todos os caracteres digitados no terminal até a tecla Enter.", "string? entrada = Console.ReadLine();"),
        q("Qual é o tipo de dado retornado pelo método Console.ReadLine() em C# moderno?", "string? (string que pode ser nula)", ["int","char"], "Console.ReadLine retorna string?, pois pode retornar null se o fluxo de entrada terminar."),
        q("O que acontece se o usuário apenas pressionar Enter sem digitar nenhum caractere no ReadLine?", "O método retorna uma string vazia (\"\")", ["O programa é fechado com erro fatal","O computador emite um bipe de aviso"], "Pressionar Enter sem caracteres produz uma string de comprimento zero (\"\"), não nula."),
        q("Por que não podemos atribuir diretamente Console.ReadLine() a uma variável int sem conversão?", "Porque C# é fortemente tipado e não realiza conversão implícita de string para int", ["Porque a classe Console proíbe números","Porque inteiros só podem ser lidos de arquivos"], "C# exige conversão explícita para transformar texto em tipos numéricos."),
        t("Qual método da classe Console faz a leitura de uma linha inteira digitada pelo usuário?", ["Console.ReadLine"], "Console.ReadLine captura os dados digitados pelo usuário no console.", "// Leitura de texto: string? linha = ____();"),
        g("Complete a instrução para ler a resposta digitada pelo usuário no terminal:", ["ReadLine"], "O método ReadLine lê a linha digitada do console.", "string? nome = Console.____();"),
        o("Ordene os passos para solicitar e receber o nome do usuário no console em C#:", ["Exibir uma mensagem orientadora na tela com Console.Write","Invocar o método Console.ReadLine para aguardar a digitação","Armazenar o texto retornado em uma variável do tipo string?","Exibir a saudação personalizada utilizando o valor capturado"], "Seguir a sequência de prompt e leitura garante boa experiência ao usuário no terminal."),
        p("Associe o método da classe Console ao seu respectivo comportamento de leitura/escrita:", [["Console.ReadLine()","Lê uma linha inteira de texto digitada até a tecla Enter"],["Console.ReadKey()","Captura imediatamente a próxima tecla pressionada pelo usuário"],["Console.WriteLine()","Imprime o texto informado e adiciona quebra de linha ao final"],["Console.Write()","Imprime o texto informado mantendo o cursor na mesma linha"]], "Cada método de Console atende a uma necessidade de interação no terminal.")
        ]
      },
      {
        id: "cs-c01-u5-l2",
        title: "Conversão segura de tipos com int.Parse e int.TryParse",
        subtitle: "Prática guiada · conversão com int.Parse e int.TryParse",
        theory: "Para converter strings em números inteiros, usamos int.Parse() ou int.TryParse(). Enquanto int.Parse lança FormatException se a entrada for inválida, int.TryParse() retorna um booleano de sucesso e preenche o número através de um parâmetro out, evitando falhas abruptas.",
        questions: [
        q("Qual método tenta converter um texto em inteiro sem lançar exceção em caso de texto inválido?", "int.TryParse()", ["int.Parse()","int.ForceConvert()"], "int.TryParse retorna false se a conversão falhar, dispensando blocos try-catch.", "bool ok = int.TryParse(\"abc\", out int valor);"),
        q("O que int.TryParse() retorna como resultado direto da chamada do método?", "Um valor booleano indicando se a conversão foi bem-sucedida (true) ou falhou (false)", ["O número inteiro convertido diretamente","Uma mensagem de erro em texto"], "O retorno do método é bool; o número convertido é repassado pelo modificador out."),
        q("O que acontece se executarmos int.Parse(\"texto\") com uma palavra não numérica?", "Dispara uma exceção System.FormatException interrompendo a execução se não tratada", ["Retorna o número zero silenciosamente","O compilador apaga a variável"], "Parse exige formato estritamente numérico, lançando FormatException na violação."),
        q("Qual modificador de parâmetro é obrigatório na variável que recebe o resultado do TryParse?", "out", ["ref","in"], "A palavra-chave out indica que o método atribuirá um valor à variável receptora."),
        t("Qual modificador de parâmetro é usado no TryParse para preencher o resultado numérico?", ["out"], "O modificador out passa a referência da variável receptora do resultado.", "// int.TryParse(texto, ____ int numero);"),
        g("Complete o comando TryParse com o modificador de saída que armazena a idade convertida:", ["out"], "out preenche a variável de destino durante a tentativa de conversão.", "if (int.TryParse(entrada, ____ int idade)) {\n    Console.WriteLine(idade);\n}"),
        o("Ordene a rotina recomendada para ler e validar uma idade com int.TryParse em C#:", ["Capturar a digitação do usuário através de Console.ReadLine()","Chamar int.TryParse passando a string e a variável de saída out int idade","Avaliar o retorno booleano em uma estrutura condicional if","Prosseguir com a idade validada ou emitir aviso amigável de erro"], "O uso de int.TryParse com out é a técnica idiomática de validação em C#."),
        p("Associe o método de conversão ao seu respectivo comportamento diante de dados inválidos:", [["int.Parse(\"abc\")","Lança System.FormatException interrompendo a execução"],["int.TryParse(\"abc\", out n)","Retorna false e atribui zero à variável de saída sem erros"],["Convert.ToInt32(null)","Retorna 0 com segurança quando o argumento é estritamente nulo"],["int.Parse(null)","Lança ArgumentNullException quando o argumento é nulo"]], "Conhecer as diferenças entre Parse e TryParse evita travamentos em produção.")
        ]
      },
      {
        id: "cs-c01-u5-l3",
        title: "A classe Convert versus métodos Parse em .NET",
        subtitle: "Aprofundamento · classe Convert versus métodos Parse",
        theory: "A classe estática System.Convert reúne métodos utilitários para converter entre tipos base (ex: Convert.ToInt32, Convert.ToDouble, Convert.ToBoolean). Diferente de int.Parse, se Convert.ToInt32 receber null ele devolve 0 em vez de disparar ArgumentNullException.",
        questions: [
        q("Qual valor Convert.ToInt32(null) retorna quando chamado com argumento nulo?", "0", ["Lança NullReferenceException","-1"], "A classe Convert é projetada para retornar valores padrão ao lidar com null, devolvendo 0 para inteiros.", "int n = Convert.ToInt32(null);\nConsole.WriteLine(n); // 0"),
        q("Qual é a principal vantagem da classe Convert ao trabalhar com múltiplos tipos heterogêneos?", "Oferece métodos padronizados (ToDouble, ToBoolean, ToString) sob uma mesma classe utilitária", ["Converte código C# em Python automaticamente","Não consome memória RAM"], "A classe Convert padroniza conversões entre praticamente todos os tipos fundamentais do .NET."),
        q("O que acontece se passarmos \"texto\" não numérico para Convert.ToInt32(\"texto\")?", "Lança FormatException exatamente como int.Parse", ["Retorna 0 silenciosamente","Trava o processador"], "A classe Convert protege contra null, mas strings com formato inválido continuam disparando FormatException."),
        q("Qual método da classe Convert converte valores para ponto flutuante de precisão dupla?", "Convert.ToDouble()", ["Convert.ToFloat64()","Convert.ToReal()"], "Convert.ToDouble converte strings e outros tipos numéricos em double do C#."),
        t("Qual número inteiro a chamada Convert.ToInt32(null) retorna por definição na BCL?", ["0"], "Convert.ToInt32 trata valores nulos retornando zero por especificação da plataforma .NET.", "// Retorno de Convert.ToInt32(null): ____"),
        g("Complete a instrução para converter o texto digitado em valor decimal double:", ["Convert.ToDouble"], "Convert.ToDouble converte representações em texto para números com ponto flutuante.", "double preco = ____(Console.ReadLine());"),
        o("Ordene a escolha da estratégia de conversão de acordo com o cenário prático:", ["Identificar se o dado de entrada pode ser inválido ou digitado por humanos","Optar por TryParse quando houver risco de entrada malformatada","Optar por Convert quando os dados vierem de bancos de dados com campos nulos","Optar por Parse direto apenas quando o formato for contratualmente garantido"], "A escolha informada da estratégia de conversão confere resiliência ao sistema."),
        p("Associe o método utilitário da classe Convert ao tipo de dado primitivo gerado:", [["Convert.ToInt32()","Converte para o tipo inteiro de 32 bits (int)"],["Convert.ToInt64()","Converte para o tipo inteiro longo de 64 bits (long)"],["Convert.ToBoolean()","Converte para o tipo lógico booleano (bool)"],["Convert.ToDecimal()","Converte para o tipo de alta precisão financeira (decimal)"]], "A classe Convert é uma das ferramentas utilitárias mais ricas do namespace System.")
        ]
      },
      {
        id: "cs-c01-u5-l4",
        title: "Fluxo interativo com validações defensivas",
        subtitle: "Aplicação · fluxo interativo com validação de entrada",
        theory: "Combinando laços while com int.TryParse, criamos rotinas interativas resilientes que solicitam novamente o dado até que o usuário informe um valor correto. Essa prática defensiva impede que falhas de digitação derrubem o programa de terminal.",
        questions: [
        q("Qual estrutura de controle é ideal para repetir uma pergunta até o usuário digitar um valor válido?", "Um laço while (ou do-while) com condição baseada no TryParse", ["Um comando switch vazio","Uma diretiva using"], "Laços de repetição aliados ao TryParse garantem que o programa só prossiga após entrada válida.", "while (!int.TryParse(Console.ReadLine(), out int valor)) {\n    Console.WriteLine(\"Invalido!\");\n}"),
        q("Qual operador lógico inverte o resultado do TryParse para manter o laço repetindo enquanto for falso?", "Operador de negação lógica (!)", ["Operador de módulo (%)","Operador ternário (?)"], "A exclamação (!) nega o resultado booleano: se TryParse der false, !false vira true e o laço continua."),
        q("Qual método da classe string remove espaços em branco acidentais no início e fim do texto digitado?", "string.Trim()", ["string.Cut()","string.DeleteSpaces()"], "O método Trim() higieniza a entrada removendo espaços extras antes da validação."),
        q("O que significa o conceito de \"programação defensiva\" na captura de entradas de usuários?", "Não confiar no formato fornecido externamente e validar todos os dados antes de processá-los", ["Instalar dois antivírus no servidor","Proibir a entrada de qualquer número par"], "Programação defensiva assume que dados de entrada podem conter erros e os valida preventivamente."),
        t("Qual método de string remove espaços no começo e no fim da cadeia de caracteres?", ["Trim"], "Trim remove espaços em branco periféricos facilitando o parsing.", "// Higienizar entrada: entrada.____();"),
        g("Complete a condição do while para repetir enquanto a conversão do número falhar:", ["!int.TryParse"], "A negação do TryParse faz o laço rodar enquanto a entrada for inválida.", "while (____(Console.ReadLine(), out int numero)) {\n    Console.Write(\"Digite novamente: \");\n}"),
        o("Ordene os passos de um ciclo defensivo completo de entrada no console em C#:", ["Exibir mensagem no console solicitando uma quantidade inteira positiva","Ler a string digitada e executar Trim() para higienizar espaços","Checar com TryParse se o formato é numérico e validar se é maior que zero","Prosseguir para o processamento principal com a garantia de dados válidos"], "Ciclos defensivos de repetição transformam programas amadores em utilitários à prova de falhas."),
        p("Associe o componente de validação à sua função na blindagem da entrada:", [["while (!valido)","Repete a solicitação continuamente até que os dados estejam corretos"],["int.TryParse()","Tenta realizar o parsing numérico sem quebrar a execução do sistema"],["entrada?.Trim()","Remove espaços em branco periféricos evitando falhas sutis de digitação"],["Console.WriteLine()","Fornece feedback imediato e claro sobre o motivo da invalidação"]], "Validar entradas defensivamente é o primeiro dever de um engenheiro de software confiável.")
        ]
      },
      {
        id: "cs-c01-u5-l5",
        title: "Boas práticas na leitura e tratamento de entradas",
        subtitle: "Revisão e desafio · boas práticas na leitura e tratamento de entradas",
        theory: "No C# moderno, a leitura de terminal deve respeitar a cultura regional (CultureInfo), pois o separador decimal varia: ponto em en-US e vírgula em pt-BR. Além disso, tratar strings nulas com verificações string.IsNullOrWhiteSpace assegura total robustez no ecossistema .NET.",
        questions: [
        q("Qual método estático de string verifica se uma variável é null, vazia ou contém apenas espaços?", "string.IsNullOrWhiteSpace(texto)", ["string.IsEmpty(texto)","string.CheckNull(texto)"], "IsNullOrWhiteSpace é o método padrão da BCL para validar se uma string possui conteúdo textual significativo.", "if (string.IsNullOrWhiteSpace(nome)) {\n    Console.WriteLine(\"Nome obrigatorio\");\n}"),
        q("Qual classe do namespace System.Globalization define o formato de separador decimal e monetário?", "CultureInfo", ["RegionSettings","DecimalFormat"], "CultureInfo.InvariantCulture ou CultureInfo(\"pt-BR\") especifica as regras regionais de conversão numérica."),
        q("O que acontece se convertermos \"10.5\" com double.Parse em uma máquina configurada com cultura pt-BR?", "Pode resultar em 105 ou FormatException porque o separador decimal padrão do Brasil é a vírgula", ["O computador altera o idioma do teclado para inglês","O sistema ignora o ponto e soma dez"], "Diferenças de cultura regional causam erros sutis; usar CultureInfo.InvariantCulture garante previsibilidade."),
        q("Qual objeto de cultura garante que números decimais usem sempre o ponto como separador?", "CultureInfo.InvariantCulture", ["CultureInfo.DefaultCulture","CultureInfo.LocalMachine"], "CultureInfo.InvariantCulture padroniza regras universais independentes da máquina do usuário."),
        t("Qual método estático valida se a string é nula, vazia ou composta só por espaços em C#?", ["string.IsNullOrWhiteSpace"], "IsNullOrWhiteSpace cobre todos os casos de strings vazias ou nulas em uma única checagem.", "// Validacao completa: ____(entrada)"),
        g("Complete o método que garante o uso do ponto como separador decimal universal:", ["CultureInfo.InvariantCulture"], "InvariantCulture evita variações de separador decimal entre países.", "double valor = double.Parse(texto, ____);"),
        o("Ordene as etapas para ler um número decimal de forma internacionalmente segura:", ["Importar o namespace System.Globalization no arquivo do projeto","Ler a string informada pelo usuário no terminal","Validar se a entrada não está vazia com string.IsNullOrWhiteSpace","Executar double.TryParse especificando CultureInfo.InvariantCulture"], "Tratar a cultura regional previne divergências monetárias e de cálculo em ambientes globais."),
        p("Associe a classe ou método da biblioteca base (.NET BCL) à sua responsabilidade:", [["string.IsNullOrWhiteSpace","Verifica se a string é nula, de tamanho zero ou só espaços"],["CultureInfo.InvariantCulture","Padroniza formatos numéricos com ponto decimal universal"],["Console.ReadLine","Captura dados do fluxo de entrada padrão como texto"],["double.TryParse","Converte texto em ponto flutuante com suporte a CultureInfo"]], "A biblioteca base do .NET fornece ferramentas precisas para tratamento seguro de dados.")
        ]
      }
    ],
    6: [
      {
        id: "cs-c01-u6-l1",
        title: "Estrutura do arquivo de projeto .csproj",
        subtitle: "Apresentação · estrutura do arquivo .csproj e propriedades",
        theory: "O arquivo .csproj é o coração de um projeto C#. Escrito em XML moderno simplificado (SDK-style), ele define propriedades essenciais como TargetFramework (ex: net8.0), Nullable (enable para checagem estrita de nulos) e ImplicitUsings para importações globais automáticas.",
        questions: [
        q("Qual é a extensão do arquivo de configuração do projeto em uma aplicação C# na CLI do .NET?", ".csproj", [".csconfig",".project"], "Arquivos com extensão .csproj armazenam os metadados e parâmetros de compilação em C#.", "<Project Sdk=\"Microsoft.NET.Sdk\">\n  <PropertyGroup>\n    <TargetFramework>net8.0</TargetFramework>\n  </PropertyGroup>\n</Project>"),
        q("Qual tag dentro do .csproj especifica a versão do runtime .NET para a qual o projeto será compilado?", "<TargetFramework>", ["<NetVersion>","<RuntimeSpec>"], "A propriedade TargetFramework (TFM) indica a versão alvo, como net8.0 ou net9.0."),
        q("O que a propriedade <Nullable>enable</Nullable> ativa dentro do compilador C#?", "A análise estática de referências anuláveis para alertar sobre potenciais NullReferenceExceptions", ["A permissão para criar variáveis sem nome","O desligamento do coletor de lixo"], "Nullable enable habilita o recurso de tipos de referência anuláveis (nullable reference types)."),
        q("O que a configuração <ImplicitUsings>enable</ImplicitUsings> proporciona ao desenvolvedor?", "Inclui automaticamente namespaces comuns como System e System.Collections.Generic sem using explícito", ["Importa todas as bibliotecas da internet no projeto","Esconde o código-fonte em tempo de compilação"], "ImplicitUsings reduz código repetitivo importando os namespaces fundamentais do .NET por padrão."),
        t("Qual extensão de arquivo identifica a configuração de um projeto C# no ecossistema .NET?", [".csproj"], "O arquivo .csproj contém as definições de SDK e dependências do projeto.", "// Arquivo do projeto: MeuApp.____"),
        g("Complete a tag que define o framework de destino como .NET 8 no arquivo .csproj:", ["TargetFramework"], "TargetFramework define o Target Framework Moniker (TFM) do projeto.", "<____>net8.0</____>"),
        o("Ordene os elementos fundamentais na estrutura de um arquivo .csproj em formato SDK-style:", ["Abertura da tag raiz Project com o atributo Sdk=\"Microsoft.NET.Sdk\"","Declaração do bloco PropertyGroup para abrigar propriedades de compilação","Definição de TargetFramework, Nullable e ImplicitUsings","Fechamento das tags PropertyGroup e Project"], "O formato SDK-style moderno tornou o arquivo .csproj enxuto, legível e manutenível."),
        p("Associe a propriedade do arquivo .csproj ao seu efeito prático na compilação:", [["<TargetFramework>","Define a versão do runtime e APIs do .NET suportadas pelo projeto"],["<Nullable>enable</Nullable>","Ativa avisos do compilador contra referências nulas sem checagem"],["<ImplicitUsings>enable</ImplicitUsings>","Adiciona usings globais para namespaces comuns do .NET automaticamente"],["<OutputType>Exe</OutputType>","Informa que o projeto gera um executável de terminal, não uma DLL de biblioteca"]], "Compreender o .csproj dá total controle sobre a plataforma e dependências da aplicação.")
        ]
      },
      {
        id: "cs-c01-u6-l2",
        title: "Pastas bin, obj e processo de compilação",
        subtitle: "Prática guiada · pastas bin, obj e processo de build",
        theory: "Durante a compilação, o .NET cria duas pastas essenciais: obj, que armazena arquivos intermediários e metadados de resolução do MSBuild, e bin, que recebe os binários finais (.dll e executáveis). Ambas devem ser incluídas no .gitignore para não poluir o repositório.",
        questions: [
        q("Qual pasta gerada na compilação contém os executáveis finais e DLLs prontos para rodar?", "bin", ["obj","src"], "A pasta bin (binaries) armazena os artefatos compilados finais da aplicação."),
        q("Qual pasta abriga arquivos intermediários, arquivos de cache e resoluções do processo de build do MSBuild?", "obj", ["bin","temp"], "A pasta obj (objects) contém arquivos temporários gerados durante as etapas do build."),
        q("O que acontece ao executar o comando dotnet clean no terminal do projeto?", "Remove os arquivos compilados intermediários e finais das pastas bin e obj", ["Exclui todo o código-fonte C# da máquina","Desinstala o .NET SDK do sistema operacional"], "dotnet clean limpa saídas de compilações anteriores para permitir um build do zero."),
        q("Por que as pastas bin e obj NUNCA devem ser commitadas no controle de versão Git?", "Porque são geradas automaticamente na compilação e aumentam desnecessariamente o repositório", ["Porque o Git rejeita pastas com nomes de três letras","Porque o Windows impede o commit de DLLs"], "Artefatos compilados são específicos da máquina de build e são gerados sob demanda pelo SDK."),
        t("Qual comando da CLI do .NET apaga os arquivos compilados anteriores das pastas bin e obj?", ["dotnet clean"], "dotnet clean remove saídas de compilações prévias para garantir compilação limpa.", "// Comando para limpar o projeto: ____"),
        g("Complete a regra do .gitignore que descarta os artefatos compilados da pasta bin:", ["bin/"], "Pastas bin/ e obj/ são obrigatoriamente ignoradas no controle de versão.", "# Ignorar pastas de saida no Git:\n____\nobj/"),
        o("Ordene os passos do processo de compilação interna executado pelo MSBuild:", ["Leitura do arquivo .csproj e restauração de dependências na pasta obj","Compilação do código C# pelo compilador Roslyn gerando IL intermediária","Geração dos arquivos binários finais (.dll, .exe) e dependências na pasta bin","Disponibilização do executável para teste ou execução pelo runtime do .NET"], "Entender o fluxo entre obj e bin elucida o processo determinístico de build do .NET."),
        p("Associe a pasta de compilação ao seu conteúdo correspondente no ecossistema .NET:", [["bin/Debug/net8.0","Executáveis compilados com símbolos de depuração para testes locais"],["bin/Release/net8.0","Binários finais altamente otimizados para produção"],["obj/","Arquivos intermediários, metadados de dependência e cache de build"],[".gitignore","Arquivo de configuração que impede o versionamento de bin e obj no Git"]], "A distinção entre bin e obj é essencial para manter repositórios limpos e funcionais.")
        ]
      },
      {
        id: "cs-c01-u6-l3",
        title: "Gerenciamento de pacotes NuGet no projeto",
        subtitle: "Aprofundamento · gerenciamento de pacotes NuGet no projeto",
        theory: "NuGet é o gerenciador de pacotes oficial do ecossistema .NET. Pacotes de terceiros ou bibliotecas corporativas são adicionados ao projeto via dotnet add package NomeDoPacote, gerando tags <PackageReference> dentro do arquivo .csproj de forma declarativa.",
        questions: [
        q("Qual é o gerenciador de pacotes oficial da plataforma .NET?", "NuGet", ["npm","pip"], "NuGet é o repositório central e gerenciador de bibliotecas e pacotes para .NET."),
        q("Qual comando da CLI do .NET adiciona uma dependência de pacote ao projeto atual?", "dotnet add package <NomeDoPacote>", ["dotnet get <NomeDoPacote>","dotnet install-lib <NomeDoPacote>"], "dotnet add package busca o pacote no NuGet e insere a dependência no .csproj.", "dotnet add package Newtonsoft.Json"),
        q("Onde a dependência de um pacote adicionado é declarada fisicamente no projeto?", "Em uma tag <PackageReference> dentro do arquivo .csproj", ["Em um arquivo texto oculto na área de trabalho","No registro do Windows"], "O .csproj registra referências com <PackageReference Include=\"...\" Version=\"...\" />."),
        q("Qual comando do .NET baixa e restaura todos os pacotes NuGet declarados no arquivo .csproj?", "dotnet restore", ["dotnet delete","dotnet clean-all"], "dotnet restore baixa pacotes ausentes preparando o ambiente para compilação.", "dotnet restore"),
        t("Qual comando da CLI do .NET restaura as dependências declaradas no arquivo do projeto?", ["dotnet restore"], "dotnet restore baixa e valida os pacotes NuGet especificados no projeto.", "// Restaurar dependencias: ____"),
        g("Complete a tag do .csproj que registra a dependência de uma biblioteca do NuGet:", ["PackageReference"], "PackageReference declara pacotes externos reutilizados na aplicação.", "<____ Include=\"Dapper\" Version=\"2.1.35\" />"),
        o("Ordene as etapas para adicionar e consumir uma biblioteca externa via NuGet no C#:", ["Pesquisar o pacote desejado no portal oficial nuget.org","Executar o comando dotnet add package no terminal do projeto","Verificar a inclusão da tag PackageReference no arquivo .csproj","Utilizar as classes do pacote no código C# através de diretivas using"], "O ecossistema NuGet permite integrar bibliotecas maduras com altíssima agilidade."),
        p("Associe o comando da CLI do .NET à sua ação no gerenciamento de pacotes NuGet:", [["dotnet add package X","Adiciona o pacote X ao projeto e atualiza o arquivo .csproj"],["dotnet remove package X","Remove a dependência do pacote X do arquivo do projeto"],["dotnet restore","Baixa os pacotes NuGet declarados que ainda não estão em cache local"],["dotnet list package","Exibe todos os pacotes e versões atualmente instalados no projeto"]], "A CLI unificada do .NET torna a gestão de dependências transparente e direta.")
        ]
      },
      {
        id: "cs-c01-u6-l4",
        title: "TargetFramework e compatibilidade de linguagem",
        subtitle: "Aplicação · configurações de versão da linguagem e TargetFramework",
        theory: "O Target Framework Moniker (TFM) define a versão do ecossistema .NET compatível com o projeto (ex: net8.0). Por padrão, a versão do compilador C# (LangVersion) acompanha a versão do TFM, trazendo recursos modernos como tipos de registro (records) e pattern matching avançado.",
        questions: [
        q("O que a sigla TFM representa na configuração de projetos .NET?", "Target Framework Moniker (Moniker que identifica a versão alvo do framework)", ["Terminal File Manager","Total Failure Mode"], "TFM é o identificador padronizado da versão alvo, como net8.0 ou netstandard2.0."),
        q("Qual tag no .csproj permite forçar uma versão específica da sintaxe da linguagem C#?", "<LangVersion>", ["<CSharpSyntax>","<CompilerRule>"], "A tag LangVersion permite selecionar versões como 11, 12, ou preview para novos recursos."),
        q("O que acontece se um desenvolvedor tentar usar uma sintaxe do C# 12 em um projeto configurado com LangVersion 8?", "O compilador emite um erro de compilação informando que o recurso não está disponível na versão", ["O Windows fecha o editor de código","O programa roda mais devagar"], "Recursos sintáticos mais novos são rejeitados se a versão configurada da linguagem for inferior."),
        q("Qual é o benefício de adotar versões de suporte a longo prazo (LTS) como .NET 8 no TargetFramework?", "Garante atualizações de estabilidade e segurança por três anos, ideal para sistemas corporativos", ["Permite rodar código sem ter computador","Elimina a necessidade de fazer testes"], "Versões LTS (Long-Term Support) proporcionam suporte estendido e previsibilidade empresarial."),
        t("Qual tag de configuração no .csproj define a versão da sintaxe da linguagem C#?", ["LangVersion"], "A propriedade LangVersion controla a versão da gramática C# aceita pelo compilador.", "<____>12.0</____>"),
        g("Complete o valor do TFM que aponta para a versão moderna de longo prazo .NET 8:", ["net8.0"], "net8.0 é o identificador padrão LTS da plataforma .NET 8.", "<TargetFramework>____</TargetFramework>"),
        o("Ordene os critérios de decisão ao escolher a versão do TargetFramework em um novo projeto:", ["Analisar os requisitos corporativos e a política de suporte (LTS vs STS)","Definir a tag TargetFramework no arquivo .csproj com a versão escolhida","Verificar se as bibliotecas NuGet dependentes possuem compatibilidade com o TFM","Validar a compilação do projeto com o .NET SDK correspondente instalado"], "A escolha consistente de TFM assegura compatibilidade e estabilidade no ciclo de vida do software."),
        p("Associe o TFM do .NET ao seu respectivo perfil de ciclo de vida e suporte:", [["net8.0","Versão com Suporte de Longo Prazo (LTS) mantida por três anos"],["net9.0","Versão Standard Term Support (STS) com suporte por 18 meses"],["netstandard2.0","Padrão histórico de compatibilidade entre .NET Framework e .NET Core"],["<LangVersion>latest","Instrui o compilador a adotar a última versão estável lançada da linguagem"]], "Dominar TFMs é requisito fundamental para manter sistemas atualizados e seguros.")
        ]
      },
      {
        id: "cs-c01-u6-l5",
        title: "Organização de múltiplos arquivos em C#",
        subtitle: "Revisão e desafio · organização de múltiplos arquivos no projeto .NET",
        theory: "No .NET SDK moderno, todos os arquivos .cs localizados na pasta do projeto e suas subpastas são automaticamente incluídos na compilação, sem necessidade de listá-los um a um no .csproj. Essa descoberta automática estimula organizar o código em pastas claras como Models e Services.",
        questions: [
        q("Como o .NET SDK moderno descobre quais arquivos de código C# devem ser compilados no projeto?", "Inclui automaticamente todos os arquivos com extensão .cs encontrados na pasta e subpastas do projeto", ["Exige que cada arquivo seja digitado manualmente dentro do .csproj","Compila apenas o primeiro arquivo criado"], "O modelo SDK-style adota o padrão globbing (*.cs), compilando tudo na pasta do projeto por padrão."),
        q("Qual convenção de pasta é comumente adotada para conter classes que representam dados de negócio?", "Models ou Entidades", ["Executables","TrashBin"], "A pasta Models tradicionalmente abriga classes com dados e propriedades estruturais."),
        q("O que a palavra-chave namespace define em um arquivo C# com múltiplos componentes?", "Um escopo lógico hierárquico que agrupa classes relacionadas e previne colisão de nomes", ["A pasta onde o arquivo deve ser salvo no disco","A cor do texto no terminal"], "Namespaces criam fronteiras conceituais organizando classes em bibliotecas e módulos coesos."),
        q("Qual recurso do C# 10 permite declarar o namespace para o arquivo inteiro sem abrir chaves?", "File-scoped namespaces (ex: namespace MeuProjeto.Servicos;)", ["Global classes","Inline packages"], "File-scoped namespaces eliminam um nível de indentação em todo o arquivo, aumentando a legibilidade."),
        t("Qual declaração em C# 10 define o namespace do arquivo com ponto e vírgula sem usar chaves?", ["file-scoped namespace"], "File-scoped namespaces declaram o namespace no topo terminando com ponto e vírgula.", "// namespace MeuApp.Models; (estilo ____)"),
        g("Complete a declaração moderna de namespace de escopo de arquivo no topo do código C#:", ["namespace"], "A diretiva namespace define o agrupamento lógico daquele arquivo de código.", "____ MinhaEmpresa.Servicos;"),
        o("Ordene a estrutura recomendada de um arquivo C# organizado em múltiplos módulos:", ["Declaração do namespace de escopo de arquivo no início do documento","Importação de dependências externas através de diretivas using","Declaração da classe com modificador de acesso público e nome descritivo","Implementação de métodos e propriedades seguindo convenções do C#"], "A clareza na organização física e lógica de arquivos é a marca de código manutenível."),
        p("Associe o elemento estrutural de arquivos em C# à sua finalidade:", [["namespace MeuApp.Models;","Declaração file-scoped que delimita o escopo de nomes do arquivo"],["Globbing (*.cs)","Inclusão automática de todos os fontes C# pelo SDK sem configuração manual"],["Pasta Services/","Convenção para abrigar classes com regras de negócio e processamento"],["using MeuApp.Services;","Importa o namespace permitindo usar suas classes diretamente"]], "A descoberta automática de arquivos simplifica a expansão de projetos no ecossistema .NET.")
        ]
      }
    ],
    7: [
      {
        id: "cs-c01-u7-l1",
        title: "Comandos fundamentais dotnet build e dotnet run",
        subtitle: "Apresentação · CLI do .NET com comandos dotnet build e dotnet run",
        theory: "A CLI unificada do .NET é operada pelo comando dotnet. O comando dotnet build restaura dependências necessárias e compila o código em binários executáveis. Já o comando dotnet run compila (se houver alterações) e executa o programa em um único passo ágil de desenvolvimento.",
        questions: [
        q("Qual comando da CLI do .NET compila o projeto e inicia a execução imediata da aplicação?", "dotnet run", ["dotnet compile","dotnet launch"], "dotnet run é o atalho predileto para compilar alterações e rodar o programa no terminal.", "dotnet run"),
        q("Qual comando da CLI apenas compila o código e valida se há erros sintáticos ou de tipos sem executar?", "dotnet build", ["dotnet run","dotnet verify"], "dotnet build executa a compilação gerando os artefatos na pasta bin sem inicializar a aplicação."),
        q("O que o comando dotnet run faz automaticamente se o código-fonte tiver sido modificado após o último build?", "Detecta as alterações, recompila o código automaticamente e executa a nova versão", ["Recusa-se a rodar até que o usuário execute dotnet clean","Exclui as alterações do desenvolvedor"], "dotnet run realiza a compilação incremental de forma transparente antes de iniciar o processo."),
        q("Qual parâmetro no dotnet build faz a compilação ignorar a restauração prévia de pacotes para acelerar?", "--no-restore", ["--fast-mode","--skip-all"], "A flag --no-restore pula a etapa de validação de pacotes quando já estão sincronizados."),
        t("Qual comando da CLI do .NET realiza a compilação e execução imediata do projeto?", ["dotnet run"], "dotnet run compila e executa o ponto de entrada da aplicação.", "// Rodar o projeto: ____"),
        g("Complete o comando da CLI do .NET que apenas compila a solução sem executá-la:", ["dotnet build"], "dotnet build compila os fontes e reporta erros ou warnings.", "____"),
        o("Ordene a sequência executada pela ferramenta dotnet run nos bastidores:", ["Verificação e restauração de dependências NuGet caso necessário","Compilação incremental dos arquivos C# alterados pelo compilador Roslyn","Gravação dos binários e arquivos .dll atualizados no diretório bin","Inicialização do runtime do .NET para executar o ponto de entrada da aplicação"], "Compreender o fluxo do dotnet run esclarece como o .NET acelera o ciclo de feedback."),
        p("Associe o comando da CLI do .NET ao seu propósito central no desenvolvimento:", [["dotnet new console","Cria um novo projeto de console com arquivo .csproj e Program.cs"],["dotnet build","Compila todo o código-fonte validando tipos e erros estáticos"],["dotnet run","Compila e executa o programa diretamente no console"],["dotnet test","Executa os testes automatizados da suíte de testes do projeto"]], "A CLI padronizada do .NET funciona de maneira idêntica no Windows, Linux e macOS.")
        ]
      },
      {
        id: "cs-c01-u7-l2",
        title: "Passagem de argumentos pela linha de comando",
        subtitle: "Prática guiada · passagem de argumentos pela linha de comando",
        theory: "Aplicações de console recebem argumentos passados na linha de comando através do array args (ou parâmetros do método Main). Ao utilizar dotnet run, separamos os argumentos da CLI dos argumentos do nosso programa utilizando dois traços (--), como em dotnet run -- arq.txt 100.",
        questions: [
        q("Qual separador é utilizado no comando dotnet run para diferenciar flags do .NET de argumentos do seu programa?", "-- (dois traços)", ["// (duas barras)",":: (dois pontos duplos)"], "Dois traços isolados (--) informam à CLI que tudo que vier após deve ser passado ao programa em args.", "dotnet run -- relatorio.txt 2024"),
        q("Como os argumentos passados na linha de comando são disponibilizados no código C# com Top-Level Statements?", "Em uma variável especial implicitamente declarada chamada args do tipo string[]", ["Em um arquivo JSON temporário","No registro do sistema operacional"], "Em Top-Level Statements, o compilador C# disponibiliza a variável args contendo o array de parâmetros."),
        q("O que o atributo args.Length indica sobre os argumentos de linha de comando?", "A quantidade total de argumentos passados para a aplicação pelo usuário", ["O tamanho em bytes do arquivo do programa","O número de letras da primeira palavra"], "args.Length informa o total de itens contidos no array de argumentos."),
        q("Qual índice acessa o primeiro argumento passado na linha de comando no array args?", "args[0]", ["args[1]","args[-1]"], "Arrays em C# são indexados em zero, portanto args[0] representa o primeiro parâmetro informado."),
        t("Qual variável implícita de array de strings disponibiliza os argumentos de terminal em Top-Level Statements?", ["args"], "A variável args contém os argumentos enviados pela linha de comando.", "// Total de argumentos: ____.Length"),
        g("Complete o comando dotnet run repassando o argumento \"teste\" para a aplicação:", ["-- teste"], "O separador -- delimita os argumentos da aplicação.", "dotnet run ____"),
        o("Ordene a rotina defensiva para ler um argumento obrigatório de linha de comando em C#:", ["Checar se o array args possui ao menos um item com if (args.Length == 0)","Emitir mensagem de ajuda e instruções de uso caso nenhum argumento seja informado","Capturar o valor do primeiro argumento através do índice args[0]","Processar a lógica do programa utilizando o parâmetro validado"], "Validar args.Length previne IndexError imediato ao inicializar utilitários de console."),
        p("Associe a instrução de argumento ao seu efeito em tempo de execução:", [["args.Length == 0","Indica que o usuário não passou nenhum parâmetro na linha de comando"],["args[0]","Acessa o primeiro argumento repassado à aplicação"],["dotnet run -- -v","Repassa a flag -v para a aplicação em vez de interpretá-la na CLI"],["string.Join(\" \", args)","Concatena todos os argumentos recebidos em uma única string"]], "A manipulação correta de argumentos de console é a base de ferramentas e scripts CLI.")
        ]
      },
      {
        id: "cs-c01-u7-l3",
        title: "Compilação Release versus Debug e otimizações",
        subtitle: "Aprofundamento · compilação Release versus Debug e otimizações",
        theory: "O .NET suporta diferentes configurações de compilação via flag -c. A configuração Debug (padrão) inclui símbolos completos de depuração (.pdb) e desativa otimizações agressivas. A configuração Release (-c Release) ativa otimizações de código, remove código de depuração e maximiza o desempenho.",
        questions: [
        q("Qual flag da CLI do .NET altera a configuração de compilação de Debug para Release?", "-c Release (ou --configuration Release)", ["-mode fast","--production true"], "A opção -c seleciona a configuração de compilação desejada (Debug ou Release).", "dotnet build -c Release"),
        q("Qual é o benefício primário de compilar um projeto com a configuração Release?", "O código é altamente otimizado pelo compilador Roslyn e JIT, atingindo máxima velocidade de execução", ["Reduz o uso de eletricidade do monitor","Permite usar acentos no nome de classes"], "A configuração Release remove instruções redundantes e habilita otimizações agressivas de desempenho."),
        q("Por que a configuração Debug é utilizada durante o desenvolvimento do dia a dia?", "Gera arquivos de símbolos (.pdb) detalhados que permitem breakpoints e inspeção linha a linha no depurador", ["Porque impede que o programador digite variáveis erradas","Porque só funciona em computadores novos"], "Debug mantém a correspondência exata entre o código-fonte e o binário para depuração facilitada."),
        q("Em qual subpasta os binários compilados em modo Release são gerados?", "bin/Release/<TargetFramework>", ["bin/Debug/<TargetFramework>","Desktop/Binarios"], "A estrutura de saída reflete a configuração escolhida dentro do diretório bin."),
        t("Qual flag curta define a configuração de compilação no comando dotnet build?", ["-c"], "A flag -c define a configuração de compilação (ex: -c Release).", "// Compilar para producao: dotnet build ____ Release"),
        g("Complete o comando para executar a aplicação com as otimizações do modo Release:", ["-c Release"], "A flag -c Release aplica otimizações máximas na execução.", "dotnet run ____"),
        o("Ordene as etapas para preparar um projeto C# para teste de desempenho (benchmark):", ["Finalizar a implementação do algoritmo no código-fonte","Executar a compilação especificando a configuração Release com dotnet build -c Release","Navegar até a pasta de saída bin/Release correspondente","Executar o binário otimizado sem acoplamento a ferramentas de depuração"], "Testar sempre em modo Release garante que os números de performance reflitam a produção."),
        p("Associe a configuração de compilação ao seu respectivo objetivo no ciclo de vida:", [["Debug","Prioriza facilidade de depuração com símbolos completos e sem otimizações agressivas"],["Release","Prioriza desempenho máximo e menor tamanho de binário para implantação"],["Arquivo .pdb","Contém símbolos que mapeiam instruções binárias às linhas do código-fonte"],["Roslyn","Compilador moderno de C# que aplica as transformações e otimizações de código"]], "Saber alternar entre Debug e Release é parte indispensável da disciplina profissional em .NET.")
        ]
      },
      {
        id: "cs-c01-u7-l4",
        title: "Publicação de executáveis autônomos com dotnet publish",
        subtitle: "Aplicação · publicação de executável autônomo com dotnet publish",
        theory: "O comando dotnet publish empacota a aplicação para distribuição. Em publicações autocontidas (Self-Contained com --self-contained true), o runtime do .NET é embutido no pacote, permitindo que a aplicação execute em computadores que não possuem o .NET instalado previamente.",
        questions: [
        q("Qual comando da CLI do .NET compila, agrega dependências e prepara a aplicação para distribuição?", "dotnet publish", ["dotnet export","dotnet package-all"], "dotnet publish gera os arquivos finais prontos para publicação em servidores ou desktops.", "dotnet publish -c Release"),
        q("O que caracteriza uma publicação autocontida (Self-Contained) no ecossistema .NET?", "Inclui o runtime do .NET junto com a aplicação, dispensando que o computador de destino tenha o .NET instalado", ["Apaga todos os arquivos de configuração após a execução","Impede que o programa use a internet"], "Aplicações autocontidas rodam em qualquer máquina do sistema operacional alvo sem pré-requisitos de runtime."),
        q("Qual flag define o identificador do sistema operacional e arquitetura alvo (RID) no dotnet publish?", "-r (ou --runtime)", ["-os","--target-machine"], "A opção -r especifica o Runtime Identifier (RID), como win-x64, linux-x64 ou osx-arm64."),
        q("Qual recurso permite consolidar toda a aplicação em um único arquivo executável (.exe)?", "Publicação Single-File (com /p:PublishSingleFile=true)", ["Compressão ZIP manual","Mesclagem em bloco de notas"], "A publicação em arquivo único empacota código e dependências em um executável autônomo e portátil."),
        t("Qual comando da CLI prepara a aplicação e suas dependências para distribuição e deploy?", ["dotnet publish"], "dotnet publish reúne todos os artefatos necessários para hospedar ou distribuir o software.", "// Preparar para entrega: ____ -c Release"),
        g("Complete o comando publish gerando uma compilação de produção em modo Release:", ["-c Release"], "A publicação de produção sempre deve utilizar a flag de configuração Release.", "dotnet publish ____"),
        o("Ordene as etapas para gerar um executável autônomo para Windows 64-bit com dotnet publish:", ["Executar dotnet publish -c Release especificando o runtime com -r win-x64","Adicionar o parâmetro --self-contained true para incluir o runtime .NET no pacote","Ativar o empacotamento em arquivo único com /p:PublishSingleFile=true","Testar o executável gerado na pasta publish em uma máquina sem o .NET SDK instalado"], "A geração de executáveis autocontidos facilita enormemente a distribuição para clientes finais."),
        p("Associe o parâmetro de publicação ao seu respectivo efeito na distribuição da aplicação:", [["--self-contained","Embute o runtime do .NET no pacote da aplicação"],["-r win-x64","Define a plataforma Windows de 64 bits como alvo da publicação"],["/p:PublishSingleFile=true","Agrupa todos os arquivos da aplicação em um único executável autônomo"],["Framework-Dependent","Modo padrão onde o computador de destino precisa ter o runtime .NET instalado"]], "Dominar o dotnet publish capacita o desenvolvedor a entregar software em qualquer ambiente.")
        ]
      },
      {
        id: "cs-c01-u7-l5",
        title: "Ciclo completo de entrega na CLI do .NET",
        subtitle: "Revisão e desafio · ciclo completo de entrega na CLI .NET",
        theory: "A CLI do .NET unifica todo o ciclo de vida da engenharia de software: criação (new), restauração de pacotes (restore), compilação (build), teste automatizado (test), execução local (run) e distribuição final (publish). Dominar essa cadeia confere total autonomia técnica.",
        questions: [
        q("Qual sequência sintetiza ordenadamente o ciclo de vida padrão de um projeto na CLI do .NET?", "dotnet new -> dotnet restore -> dotnet build -> dotnet test -> dotnet publish", ["dotnet run -> dotnet delete -> dotnet publish","dotnet test -> dotnet new -> dotnet clean"], "Essa cadeia canônica guia a criação desde o scaffolding inicial até a entrega em produção."),
        q("Por que a CLI do .NET é considerada multiplataforma?", "Porque opera com os exatos mesmos comandos e comportamentos no Windows, Linux e macOS", ["Porque só roda se houver três sistemas operacionais instalados","Porque foi escrita em linguagem HTML"], "A ferramenta dotnet oferece paridade absoluta de recursos em todas as principais plataformas operacionais."),
        q("Qual comando da CLI exibe os templates de projetos disponíveis para criação (web, console, lib)?", "dotnet new list", ["dotnet show templates","dotnet templates"], "dotnet new list apresenta a lista completa de modelos instalados no SDK."),
        q("O que a flag --help acrescentada a qualquer comando da CLI do .NET oferece ao desenvolvedor?", "Exibe a documentação completa com opções, parâmetros e exemplos práticos daquele comando", ["Desinstala a CLI do computador","Reinicia o terminal"], "A CLI do .NET possui ajuda contextual integrada e abrangente em todos os seus subcomandos."),
        t("Qual subcomando do dotnet cria novos projetos a partir de templates oficiais?", ["dotnet new"], "dotnet new inicializa projetos como console, webapi, classlib e outros.", "// Criar projeto de console: ____ console"),
        g("Complete o comando que executa os testes automatizados da solução no terminal:", ["dotnet test"], "dotnet test descobre e executa todas as suítes de teste do projeto.", "____"),
        o("Ordene o fluxo profissional de entrega contínua executado em servidores de CI/CD para .NET:", ["Executar dotnet restore para assegurar dependências em cache","Executar dotnet build -c Release para validar a ausência de erros de código","Executar dotnet test -c Release para validar a integridade funcional da suíte","Executar dotnet publish -c Release para gerar os artefatos prontos de produção"], "Essa esteira automatizada garante que apenas código compilado e testado chegue aos servidores."),
        p("Associe o comando da CLI do .NET ao seu papel na esteira de desenvolvimento:", [["dotnet new console","Gera a estrutura inicial com .csproj e Program.cs"],["dotnet build -c Release","Gera os binários validados e otimizados para produção"],["dotnet test","Executa baterias de testes unitários e de integração"],["dotnet publish","Compila e agrupa artefatos prontos para deploy e distribuição"]], "A padronização da CLI do .NET é um dos maiores pilares de produtividade da plataforma.")
        ]
      }
    ],
    8: [
      {
        id: "cs-c01-u8-l1",
        title: "Anatomia de uma aplicação C# moderna",
        subtitle: "Apresentação · anatomia revisada de uma aplicação C# moderna",
        theory: "No C# moderno, o código de inicialização foi simplificado com Top-Level Statements. Não é mais necessário digitar manualmente classes Program ou métodos estáticos Main para utilitários; o compilador gera a classe e o ponto de entrada nos bastidores com total performance.",
        questions: [
        q("Como o compilador trata um arquivo Program.cs escrito com Top-Level Statements em C# 10+?", "Gera internamente uma classe Program com método Main contendo as instruções de forma transparente", ["Interpreta o código linha a linha como se fosse um arquivo de script de lote .bat","Rejeita o código se não houver chaves"], "Top-Level Statements é uma comodidade sintática; o compilador produz a classe clássica internamente."),
        q("Quantos arquivos em um mesmo projeto C# podem conter instruções em nível superior (Top-Level Statements)?", "Exatamente um arquivo apenas", ["Quantos arquivos o desenvolvedor desejar","Nenhum, é proibido"], "Apenas um arquivo do projeto pode ser o ponto de entrada superior para evitar ambiguidade de inicialização."),
        q("Qual diretiva no topo do arquivo inclui namespaces para que suas classes fiquem disponíveis?", "using", ["import","require"], "A palavra-chave using importa namespaces no C# (ex: using System.Text;)."),
        q("Qual é a recomendação para variáveis locais em C# quando o tipo é evidente pelo lado direito?", "Utilizar a inferência com a palavra-chave var", ["Declarar o nome do tipo três vezes","Usar números em vez de nomes"], "A palavra-chave var confere legibilidade quando o tipo atribuído é imediatamente compreensível."),
        t("Qual palavra-chave do C# permite inferência estática de tipo em variáveis locais?", ["var"], "A palavra-chave var instrui o compilador a inferir o tipo estaticamente a partir da atribuição.", "// Declaracao com inferencia: ____ total = 100.50;"),
        g("Complete a instrução de saída clássica que finaliza a execução no terminal:", ["Console.WriteLine"], "Console.WriteLine é a instrução padrão de saída textual em C#.", "____(\"Programa C# concluido!\");"),
        o("Ordene a estrutura canônica de um script C# moderno com Top-Level Statements:", ["Diretivas using necessárias no topo para importação de bibliotecas","Declaração de constantes e variáveis com inicialização de dados","Execução da lógica de negócio, transformações e cálculos","Emissão dos resultados finais formatados no console do terminal"], "A clareza linear de Top-Level Statements simplifica a curva de entrada no ecossistema C#."),
        p("Associe o elemento do C# moderno à sua função arquitetural:", [["Top-Level Statements","Permite escrever código direto no arquivo principal sem boilerplate de classe"],["var","Inferência estática de tipos em variáveis locais sem perder a checagem de tipos"],["using","Diretiva de importação que traz namespaces para o escopo do arquivo"],["args","Array implícito com os parâmetros passados pela linha de comando"]], "A evolução do C# reduziu o ruído sintático sem comprometer o poder e a tipagem forte.")
        ]
      },
      {
        id: "cs-c01-u8-l2",
        title: "Interpolação de strings ($) e formatação monetária",
        subtitle: "Prática guiada · interpolação de strings ($) e formatação monetária",
        theory: "A interpolação de strings em C# utiliza o prefixo de cifrão ($\"texto {expressao}\"). Além de inserir variáveis diretamente, ela suporta especificadores de formato, como :C para valores monetários locais, :F2 para duas casas decimais e :D4 para números inteiros com zeros à esquerda.",
        questions: [
        q("Qual caractere deve anteceder as aspas duplas para habilitar interpolação de strings em C#?", "Cifrão ($)", ["Arroba (@)","Cerquilha (#)"], "O prefixo $ transforma uma string literal em string interpolada em C#.", "string nome = \"Carlos\";\nConsole.WriteLine($\"Ola, {nome}!\");"),
        q("Qual especificador de formato dentro da interpolação formata o número como valor monetário com moeda local?", ":C (ex: {valor:C})", [":M",":D"], "O marcador :C (Currency) formata o número no padrão monetário da cultura ativa (ex: R$ 50,00)."),
        q("Qual é o resultado impresso por double taxa = 0.05; Console.WriteLine($\"Taxa: {taxa:P1}\");?", "Taxa: 5,0% (formatado como porcentagem com uma casa decimal)", ["Taxa: 0.05","Taxa: P1"], "O especificador :P formata o número como percentual multiplicado por 100."),
        q("O que acontece se combinarmos o prefixo de verbatim (@) com o cifrão ($@\"texto\")?", "Permite interpolação de variáveis ao mesmo tempo em que preserva quebras de linha e barras invertidas", ["O compilador gera erro fatal","O texto é criptografado"], "Combinar $@ permite criar strings interpoladas multilinhas ideais para templates e consultas SQL."),
        t("Qual símbolo de pontuação prefixa uma string interpolada em C#?", ["$"], "O símbolo $ prefixa strings interpoladas habilitando a sintaxe {variavel}.", "// String interpolada: ____\"Valor: {total}\""),
        g("Complete a interpolação para exibir a variável preco formatada como moeda corrente:", ["{preco:C}"], "A sintaxe {variavel:C} formata o valor numérico como moeda local.", "Console.WriteLine($\"Total a pagar: ____\");"),
        o("Ordene os passos para formatar e exibir um extrato bancário com strings interpoladas:", ["Declarar a constante com o saldo financeiro da conta bancária","Definir a string interpolada iniciando com o prefixo $ e aspas duplas","Inserir a variável de saldo com o marcador de moeda {saldo:C}","Imprimir a linha resultante no console através de Console.WriteLine"], "A interpolação com formatadores é extremamente limpa, legível e elegante em C#."),
        p("Associe o especificador de formato da interpolação ao seu resultado visual:", [["{valor:C}","Formata como moeda corrente de acordo com o país (ex: R$ 1.500,00)"],["{numero:F2}","Formata número decimal fixando exatamente duas casas decimais"],["{indice:D4}","Formata número inteiro preenchendo com zeros à esquerda (ex: 0042)"],["{taxa:P}","Formata valor numérico como percentual multiplicado por cem (ex: 15,00%)"]], "Dominar especificadores de formato em C# confere acabamento profissional aos sistemas.")
        ]
      },
      {
        id: "cs-c01-u8-l3",
        title: "Tratamento de exceções com try-catch em C#",
        subtitle: "Aprofundamento · tratamento defensivo de exceções com try-catch",
        theory: "Em C#, exceções são manipuladas com blocos try, catch e finally. Recursos que implementam IDisposable podem ser fechados automaticamente com a instrução using. Filtros de exceção com a cláusula when permitem capturar erros apenas quando condições específicas forem verdadeiras.",
        questions: [
        q("Qual palavra-chave do C# descarta e fecha automaticamente recursos que implementam IDisposable?", "using (declaração using ou bloco using)", ["close","free"], "A instrução using garante a invocação automática do método Dispose() ao sair do escopo.", "using var leitor = new StreamReader(\"dados.txt\");"),
        q("Qual cláusula permite adicionar uma condição booleana a um bloco catch em C# moderno?", "Cláusula when (ex: catch (HttpRequestException e) when (e.StatusCode == 404))", ["Cláusula where","Cláusula if"], "Filtros de exceção com when evitam capturar e relançar exceções desnecessariamente."),
        q("Qual classe raiz de exceções da BCL deve ser evitada em blocos catch genéricos desnecessários?", "System.Exception", ["System.Object","System.String"], "Capturar System.Exception indiscriminadamente mascara erros inesperados de programação."),
        q("Qual é o papel do bloco finally no tratamento de exceções em C#?", "Executar incondicionalmente ao final do bloco try, garantindo rotinas de limpeza", ["Garantir que o programa reinicie o computador","Substituir a necessidade de testes"], "O bloco finally roda sempre, ocorra ou não uma exceção no bloco try."),
        t("Qual cláusula de filtro condicional em blocos catch foi introduzida no C# 6?", ["when"], "A cláusula when filtra a captura da exceção com base em uma condição booleana.", "// catch (Exception e) ____ (e.HResult == 10)"),
        g("Complete o bloco catch para capturar divisões por zero com a exceção correspondente:", ["DivideByZeroException"], "DivideByZeroException captura divisões inteiras por zero.", "try {\n    int zero = 0;\n    int r = 10 / zero;\n} catch (____) {\n    Console.WriteLine(\"Erro de divisao!\");\n}"),
        o("Ordene a rotina de tratamento estruturado de operações com arquivos em C#:", ["Abrir o bloco try delimitando a operação de leitura no disco","Capturar FileNotFoundException informando que o arquivo não existe","Capturar IOException genérico para falhas inesperadas de leitura","Garantir liberação de descritores e conexões no bloco finally ou using"], "Tratar exceções de forma escalonada assegura feedback preciso e ausência de travamentos."),
        p("Associe o recurso de controle de exceções em C# à sua respectiva finalidade:", [["using var recurso","Garante a execução do método Dispose() ao término do escopo da variável"],["catch (...) when (...)","Filtro que só intercepta a exceção se a condição lógica for verdadeira"],["throw;","Relança a exceção capturada preservando o stack trace original intacto"],["finally","Garante execução de código de encerramento mesmo se ocorrerem erros"]], "O mecanismo de exceções do C# é um dos mais sofisticados e seguros da engenharia de software.")
        ]
      },
      {
        id: "cs-c01-u8-l4",
        title: "Construção de utilitário contábil interativo",
        subtitle: "Aplicação · utilitário interativo de consolidação contábil",
        theory: "Para cálculos financeiros de precisão, o C# oferece o tipo primitivo decimal (128 bits com sufixo m). Diferente de float e double que utilizam aritmética binária aproximada, o tipo decimal opera em base 10, eliminando distorções de arredondamento em cálculos de dinheiro.",
        questions: [
        q("Qual tipo primitivo do C# é obrigatório para operações financeiras e contábeis de precisão?", "decimal", ["float","double"], "O tipo decimal opera em base 10 com 28 a 29 dígitos de precisão, eliminando erros de arredondamento.", "decimal saldo = 1500.50m;"),
        q("Qual caractere de sufixo deve ser adicionado a um número literal para indicar o tipo decimal?", "Sufixo m (ou M)", ["Sufixo d","Sufixo f"], "O sufixo m (money) distingue literais decimais de double em C# (ex: 29.90m)."),
        q("Por que o uso de double em cálculos bancários e de folha de pagamento é considerado um erro grave?", "Porque operações com double em base 2 acumulam pequenas imprecisões decimais com centavos", ["Porque double não aceita números maiores que cem","Porque o compilador recusa double em arquivos .cs"], "A aritmética binária de ponto flutuante (IEEE 754) introduz imprecisões inadmissíveis em finanças."),
        q("Qual método permite arredondar um valor decimal especificando duas casas e a regra de arredondamento?", "Math.Round(valor, 2, MidpointRounding.AwayFromZero)", ["Math.Floor(valor)","Math.Cut(valor, 2)"], "Math.Round com regra explícita de arredondamento confere rigor contábil ao sistema."),
        t("Qual sufixo de uma letra identifica literais do tipo decimal no código C#?", ["m"], "O sufixo m identifica literais decimais de alta precisão.", "decimal imposto = 45.80____;"),
        g("Complete a declaração da variável com o tipo financeiro de 128 bits de precisão decimal:", ["decimal"], "decimal é o tipo padrão da indústria contábil no .NET.", "____ saldoAtual = 12500.75m;"),
        o("Ordene as etapas para calcular o valor final de uma fatura com desconto em C#:", ["Declarar o valor bruto da fatura utilizando o tipo decimal com sufixo m","Calcular a taxa de desconto aplicando a porcentagem decimal (ex: 0.10m)","Subtrair o desconto do valor bruto obtendo o total líquido final","Imprimir o extrato consolidado com interpolação e formato monetário {total:C}"], "Utilizar decimal em cálculos contábeis garante conformidade com regras fiscais e bancárias."),
        p("Associe o tipo numérico em C# à sua respectiva aplicação recomendada:", [["decimal (128 bits)","Obrigatório para finanças, faturamento, impostos e dinheiro"],["double (64 bits)","Ideal para cálculos científicos, física, gráficos e medições contínuas"],["int (32 bits)","Utilizado para contadores, índices de coleções e quantidades inteiras"],["bool (1 bit lógico)","Utilizado para sinalizadores de verdadeiro ou falso"]], "A escolha acertada do tipo de dado é o fundamento de qualquer software comercial sólido.")
        ]
      },
      {
        id: "cs-c01-u8-l5",
        title: "Encerramento e consolidação do capítulo 1",
        subtitle: "Revisão e desafio · encerramento e integração final do primeiro capítulo",
        theory: "Parabéns pela conclusão do primeiro capítulo de C#! Você dominou a plataforma .NET moderna: Top-Level Statements, leitura com TryParse e ReadLine, arquivos .csproj e pacotes NuGet, comandos dotnet da CLI, tratamento robusto de exceções e cálculos financeiros com decimal.",
        questions: [
        q("Qual combinação de tecnologias resume com fidelidade o perfil de uma aplicação moderna em .NET 8?", "Top-Level Statements, C# 12, compilação na CLI dotnet e tipos seguros contra nulos (Nullable)", ["Scripts em lote .bat sem compilação","Instruções escritas em assembly puro"], "A união de C# moderno, CLI ágil e segurança contra nulos torna o .NET um dos ecossistemas mais produtivos do mundo."),
        q("Qual é a postura profissional ao planejar a arquitetura de uma solução C# empresarial?", "Separar regras de negócio em classes coesas, utilizar tipos defensivos e validar entradas nas fronteiras", ["Colocar 10.000 linhas de código no mesmo método Main","Desativar o compilador"], "Organização modular, tipagem estática rigorosa e testes contínuos sustentam aplicações escaláveis."),
        q("Qual é o próximo passo natural no aprendizado após dominar o ambiente e E/S em C#?", "Aprofundar em estruturas de decisão (switch expressions), laços avançados e coleções genéricas", ["Tentar recriar o Windows antes de aprender laços de repetição","Parar de programar"], "Dominar expressões de padrão e coleções genéricas pavimenta a estrada para LINQ e Orientação a Objetos."),
        q("Qual comando da CLI do .NET você executaria para criar uma biblioteca de classes reutilizável?", "dotnet new classlib", ["dotnet new console","dotnet new webpage"], "dotnet new classlib cria projetos de biblioteca destinados a empacotamento ou reaproveitamento."),
        t("Qual comando da CLI do .NET cria uma biblioteca de classes reutilizável para outros projetos?", ["dotnet new classlib"], "dotnet new classlib cria projetos do tipo biblioteca de classes.", "// Criar biblioteca: ____"),
        g("Complete o comando que emite uma mensagem comemorativa celebrando a conclusão do capítulo:", ["WriteLine"], "Console.WriteLine marca o encerramento do capítulo com feedback claro.", "Console.____(\"Parabens! Capitulo 1 de C# concluido com exito!\");"),
        o("Ordene os marcos fundamentais conquistados ao longo deste primeiro capítulo de C#:", ["Instalação do SDK do .NET e compreensão do runtime CLR","Escrita de código com Top-Level Statements e interpolação de strings","Leitura e validação defensiva de dados com int.TryParse e CultureInfo","Gestão de projetos via .csproj, compilação Release e publicação de executáveis"], "Essa base robusta capacita você para construir sistemas de alta performance em C#."),
        p("Associe o pilar do primeiro capítulo de C# ao seu diferencial de engenharia:", [["Top-Level Statements","Produtividade instantânea eliminando cerimônia sintática excessiva"],["int.TryParse()","Resiliência contra dados malformatados sem impacto de exceções"],["decimal","Exatidão absoluta em cálculos financeiros eliminando erros de arredondamento"],["CLI dotnet","Ferramenta unificada para compilar, testar e publicar em qualquer sistema operacional"]], "Com esses conhecimentos consolidados, sua jornada na linguagem C# começa com excelência.")
        ]
      }
    ]
  });
})();
