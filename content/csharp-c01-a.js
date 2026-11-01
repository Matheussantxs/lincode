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
    1: [
      {
        id: 'cs-c01-u1-l5',
        title: 'Do arquivo .cs à execução no CLR',
        subtitle: 'Revisão e desafio · C#, IL e runtime .NET',
        theory: 'Em C#, o compilador Roslyn traduz seu arquivo Caixa.cs para Intermediate Language (IL) e metadados dentro de um assembly .dll. Ao rodar o programa, o CLR (.NET Runtime) usa o compilador JIT para converter essa IL em código nativo da CPU daquela máquina e gerencia a memória.',
        questions: [
          q(
            'Quando o compilador Roslyn processa o arquivo FolhaPagamento.cs com sucesso, o que é gravado dentro do assembly gerado?',
            'Instruções em Intermediate Language (IL) acompanhadas de metadados de tipos',
            [
              'Código de máquina exclusivo do processador onde o desenvolvedor digitou o arquivo',
              'O texto-fonte original sem análise sintática para ser interpretado linha a linha'
            ],
            'O compilador C# traduz o código-fonte para IL e metadados independentes de CPU dentro do assembly.'
          ),
          q(
            'Em qual momento o compilador JIT (Just-In-Time) do CLR converte a IL de Pedido.dll em instruções nativas da CPU?',
            'Em tempo de execução, conforme os métodos do programa são chamados na máquina-alvo',
            [
              'Antes de salvar o arquivo .cs no editor de código do desenvolvedor',
              'Apenas quando o desenvolvedor compacta a pasta do projeto para backup'
            ],
            'O JIT atua durante a execução no CLR, gerando código nativo otimizado para a arquitetura local.'
          ),
          q(
            'Qual serviço gerenciado do CLR libera automaticamente objetos que deixaram de ser usados durante a execução de um sistema C#?',
            'Garbage Collector (coletor de lixo)',
            [
              'Pré-processador de templates da CLI',
              'Analisador léxico de arquivos .csproj'
            ],
            'O Garbage Collector monitora o heap gerenciado no CLR e recolhe memória de objetos sem referências ativas.'
          ),
          g(
            'Complete o comentário técnico indicando a sigla da linguagem intermediária contida em Estoque.dll após compilar Estoque.cs:',
            ['IL', 'CIL', 'MSIL'],
            'O assembly compilado armazena Intermediate Language (IL, também chamada CIL) junto aos metadados.',
            '// Fluxo: Estoque.cs -> Compilador Roslyn -> Estoque.dll (contém ____ e metadados) -> CLR (JIT)'
          ),
          t(
            'Qual é a sigla de três letras do ambiente de execução do .NET responsável pelo JIT, segurança de tipos e coleta de lixo?',
            ['CLR', 'clr'],
            'O Common Language Runtime (CLR) é a máquina virtual de execução da plataforma .NET.'
          ),
          q(
            'Por que o mesmo arquivo Frete.dll compilado em um notebook Windows pode ser executado pelo .NET Runtime em um servidor Linux?',
            'Porque Frete.dll contém IL neutra de plataforma, traduzida para a CPU local pelo CLR de cada sistema',
            [
              'Porque o Windows embute um kernel Linux completo dentro de todo arquivo .cs',
              'Porque arquivos .dll em C# ignoram o processador e rodam direto na placa de rede'
            ],
            'A portabilidade vem da IL neutra: cada sistema operacional possui seu próprio CLR que faz a compilação JIT local.'
          ),
          o(
            'Ordene o ciclo completo desde a escrita de Caixa.cs até a execução das instruções na CPU do caixa da loja:',
            [
              'Escrever o código-fonte em C# no arquivo Caixa.cs',
              'Compilar Caixa.cs com o Roslyn gerando o assembly Caixa.dll com IL e metadados',
              'Carregar Caixa.dll no CLR (.NET Runtime) do computador de destino',
              'Traduzir a IL via JIT para código de máquina nativo e executar na CPU'
            ],
            'O código-fonte vira IL no build; na execução, o CLR carrega o assembly e o JIT gera instruções nativas.'
          ),
          p(
            'Associe cada componente da arquitetura C#/.NET ao seu papel exato na jornada do código:',
            [
              ['Caixa.cs', 'Arquivo de texto com código-fonte escrito em C#'],
              ['Roslyn', 'Compilador que valida sintaxe e tipos e emite IL'],
              ['Caixa.dll', 'Assembly portátil contendo IL compilada e metadados'],
              ['JIT do CLR', 'Tradutor que converte IL em instruções nativas em execução']
            ],
            'Cada etapa separa autoria (.cs), compilação para formato neutro (Roslyn -> .dll) e execução nativa (CLR/JIT).'
          )
        ]
      }
    ],
    2: [
      {
        id: 'cs-c01-u2-l1',
        title: '.NET SDK versus .NET Runtime',
        subtitle: 'Apresentação · SDK e Runtime',
        theory: 'O .NET Runtime contém apenas o motor necessário para executar aplicações já compiladas, como no caixa de uma farmácia. Já o .NET SDK reúne o compilador, os templates, a CLI dotnet e o próprio Runtime, sendo indispensável na máquina de quem desenvolve e compila código C#.',
        questions: [
          q(
            'Uma rede de clínicas quer apenas rodar o executável compilado AgendaClinica.dll na recepção, sem editar nem compilar código. O que basta instalar lá?',
            'Apenas o .NET Runtime compatível com a versão do aplicativo',
            [
              'Obrigatoriamente três versões diferentes do .NET SDK completo',
              'Somente um editor de texto, sem nenhum pacote da plataforma .NET'
            ],
            'Para executar um aplicativo já compilado, o .NET Runtime é suficiente e ocupa bem menos espaço que o SDK.'
          ),
          q(
            'Quando Marina instala o .NET SDK em seu notebook novo para estudar C#, ela precisa instalar o .NET Runtime separadamente para rodar seus testes?',
            'Não, porque o instalador do .NET SDK já inclui o .NET Runtime correspondente',
            [
              'Sim, pois o SDK traz apenas arquivos de ajuda em texto sem motor de execução',
              'Sim, mas somente se o código usar a classe Console no terminal'
            ],
            'O .NET SDK é um pacote completo para desenvolvimento: contém compiladores, ferramentas de CLI e o próprio Runtime.'
          ),
          g(
            'Complete o comando da CLI que só funciona quando o SDK está instalado para compilar o código da pasta atual:',
            ['build'],
            'O verbo build aciona o compilador do .NET SDK para transformar os arquivos .cs em um assembly.',
            '# Na pasta do projeto C#:\ndotnet ____'
          ),
          t(
            'Entre SDK e Runtime, qual dos dois pacotes contém o compilador C# e os templates de criação de projeto?',
            ['SDK', '.NET SDK', 'sdk', 'dotnet sdk'],
            'O Software Development Kit (SDK) concentra o compilador Roslyn, os templates e os comandos de criação e build.'
          ),
          q(
            'Em um servidor onde apenas o .NET Runtime foi instalado, o que ocorre ao tentar criar um projeto com dotnet new console?',
            'A CLI informa que nenhum SDK do .NET foi encontrado para executar comandos de desenvolvimento',
            [
              'O Runtime baixa e compila automaticamente o código usando o navegador padrão',
              'O projeto é criado normalmente, mas sem o arquivo Program.cs'
            ],
            'Sem o SDK instalado, o executável dotnet consegue rodar apps prontos (dotnet App.dll), mas não possui templates nem compilador.'
          ),
          q(
            'Qual conjunto descreve fielmente o conteúdo entregue pelo .NET SDK?',
            'Compiladores, ferramentas de linha de comando, templates de projeto e .NET Runtime',
            [
              'Apenas o Garbage Collector isolado, sem compilador nem bibliotecas básicas',
              'Somente drivers de placa de vídeo e temas visuais do sistema operacional'
            ],
            'O SDK agrega tudo o que é preciso para criar, compilar, publicar e executar aplicações .NET.'
          ),
          o(
            'Ordene as etapas entre preparar as máquinas e colocar o sistema PontoEletronico para rodar no escritório:',
            [
              'Instalar o .NET SDK na máquina da pessoa desenvolvedora',
              'Escrever e compilar o projeto PontoEletronico gerando os artefatos de saída',
              'Instalar o .NET Runtime no computador da portaria do escritório',
              'Copiar os arquivos compilados e iniciar PontoEletronico.dll pelo Runtime'
            ],
            'Desenvolve-se e compila-se com o SDK; na máquina final que apenas executa o app, basta o Runtime.'
          ),
          p(
            'Relacione cada perfil de máquina ou componente à escolha adequada entre SDK e Runtime:',
            [
              ['Notebook de quem programa em C#', 'Requer o .NET SDK para criar, compilar e depurar projetos'],
              ['Totem de autoatendimento na loja', 'Precisa apenas do .NET Runtime para rodar o app pronto'],
              ['Templates de projeto console e web', 'Recursos exclusivos incluídos na instalação do SDK'],
              ['Motor CLR com compilador JIT', 'Núcleo de execução presente tanto no Runtime quanto no SDK']
            ],
            'O SDK engloba o Runtime e adiciona as ferramentas de autoria e compilação.'
          )
        ]
      },
      {
        id: 'cs-c01-u2-l2',
        title: 'Inspecionando versões com a CLI',
        subtitle: 'Prática guiada · Versões instaladas',
        theory: 'Em equipes que mantêm sistemas antigos e novos, várias versões do .NET convivem no mesmo computador. O comando dotnet --version mostra o SDK ativo na pasta atual, enquanto dotnet --list-sdks lista todos os SDKs instalados e dotnet --list-runtimes exibe os runtimes disponíveis.',
        questions: [
          q(
            'Qual é a diferença prática entre executar dotnet --version e executar dotnet --list-sdks no terminal?',
            'dotnet --version exibe apenas a versão do SDK ativa no diretório atual, enquanto dotnet --list-sdks lista todos os SDKs instalados',
            [
              'dotnet --version desinstala versões antigas, enquanto dotnet --list-sdks atualiza o sistema',
              'dotnet --version mostra a versão do Windows, enquanto dotnet --list-sdks mostra a memória RAM'
            ],
            '--version retorna um único número de versão efetivo; --list-sdks mostra cada SDK instalado e o caminho de sua pasta.'
          ),
          g(
            'Complete a opção do comando dotnet para listar todas as versões de SDK instaladas e seus diretórios no computador:',
            ['--list-sdks'],
            'A flag --list-sdks imprime cada versão de SDK disponível seguida pelo diretório onde está instalada.',
            'dotnet ____'
          ),
          t(
            'Ao rodar o comando do trecho abaixo no terminal, qual número de versão do SDK aparece na primeira linha da saída?',
            ['8.0.403'],
            'A primeira linha listada por dotnet --list-sdks mostra a versão 8.0.403 antes do caminho entre colchetes.',
            '$ dotnet --list-sdks\n8.0.403 [C:\\Program Files\\dotnet\\sdk]\n9.0.100 [C:\\Program Files\\dotnet\\sdk]'
          ),
          q(
            'Um colega executou dotnet --list-runtimes e viu Microsoft.NETCore.App 8.0.10, mas dotnet --list-sdks não retornou nenhuma linha. O que isso indica?',
            'A máquina possui o Runtime para rodar apps .NET 8, mas não tem nenhum SDK instalado para compilar código',
            [
              'O SDK 8.0.10 está instalado e pronto para criar projetos console normalmente',
              'O comando dotnet não existe no PATH e falhou antes de consultar o sistema'
            ],
            'Saída vazia em --list-sdks combinada com presença em --list-runtimes confirma que só o Runtime foi instalado.'
          ),
          q(
            'Qual comando da CLI gera um relatório diagnóstico completo contendo versão do SDK ativo, sistema operacional, arquitetura e todos os runtimes?',
            'dotnet --info',
            [
              'dotnet --clean-all',
              'dotnet --format-disk'
            ],
            'dotnet --info consolida dados do host, SO, arquitetura, SDK ativo e listas completas de SDKs e runtimes.'
          ),
          q(
            'Se uma pasta possui um arquivo global.json fixando o SDK 8.0.403 em um PC que também tem o 9.0.100 instalado, o que dotnet --version retorna nessa pasta?',
            '8.0.403, pois dotnet --version respeita a versão selecionada para o diretório atual',
            [
              'As duas versões separadas por vírgula na mesma linha',
              'Erro fatal, já que o .NET proíbe ter dois SDKs instalados na mesma máquina'
            ],
            'Diferentes SDKs coexistem lado a lado, e dotnet --version reporta o SDK efetivo selecionado para aquela pasta.'
          ),
          o(
            'Ordene o roteiro de verificação no terminal para confirmar que um computador recém-configurado está pronto para compilar C#:',
            [
              'Abrir o terminal do sistema operacional',
              'Executar dotnet --version para confirmar que o comando responde com um SDK ativo',
              'Executar dotnet --list-sdks para conferir todas as versões de SDK disponíveis',
              'Executar dotnet --list-runtimes para revisar os runtimes instalados lado a lado'
            ],
            'Esse fluxo valida o PATH, identifica o SDK padrão e audita todos os SDKs e runtimes presentes.'
          ),
          p(
            'Conecte cada comando de inspeção da CLI dotnet à saída específica que ele produz:',
            [
              ['dotnet --version', 'Imprime somente o número do SDK ativo no diretório atual'],
              ['dotnet --list-sdks', 'Lista versões e pastas de todos os SDKs instalados'],
              ['dotnet --list-runtimes', 'Lista os runtimes instalados, como Microsoft.NETCore.App'],
              ['dotnet --info', 'Exibe painel completo com SO, arquitetura, SDKs e runtimes']
            ],
            'Conhecer as quatro flags de diagnóstico acelera qualquer verificação de ambiente em máquinas novas ou servidores.'
          )
        ]
      },
      {
        id: 'cs-c01-u2-l3',
        title: 'Organizando a pasta de projetos',
        subtitle: 'Aprofundamento · Diretório de estudo',
        theory: 'Manter uma pasta de estudos limpa evita conflitos de compilação no .NET. Cada projeto C# precisa de seu próprio subdiretório exclusivo com um único arquivo .csproj, nomes curtos sem acentos ou espaços, como C:\\Estudos\\CalculoFrete, separando pastas de código das pastas bin e obj.',
        questions: [
          q(
            'O que acontece quando alguém cria dois arquivos de projeto (Aula1.csproj e Aula2.csproj) soltos exatamente dentro da mesma pasta e roda dotnet run?',
            'A CLI acusa ambiguidade por encontrar mais de um arquivo de projeto no mesmo diretório',
            [
              'O .NET funde automaticamente os dois projetos em um único executável sem avisar',
              'O mais antigo é apagado do disco antes da compilação começar'
            ],
            'Cada projeto C# deve ficar em sua própria subpasta com um único .csproj para evitar conflito de arquivos e código.'
          ),
          q(
            'Qual caminho de diretório segue as melhores práticas de nomenclatura para organizar exercícios de C# sem dor de cabeça em scripts de terminal?',
            'C:\\EstudosDotNet\\Cap01\\ConversorMoedas',
            [
              'C:\\Meus Exercícios de Programação C# (Versão Final!)\\Módulo 1',
              'C:\\Program Files\\dotnet\\sdk\\meus testes avulsos'
            ],
            'Caminhos curtos, fora da pasta interna de instalação do SDK e sem espaços, acentos ou símbolos especiais evitam erros de escape no terminal.'
          ),
          g(
            'Complete o comando para entrar na pasta recém-criada EstudosCSharp antes de gerar seus subprojetos:',
            ['cd'],
            'Após criar o diretório com mkdir, o comando cd (change directory) move o terminal para dentro dele.',
            'mkdir EstudosCSharp\n____ EstudosCSharp'
          ),
          t(
            'Durante a compilação de um projeto C#, além da pasta bin, qual outra subpasta de 3 letras é gerada automaticamente para arquivos temporários de build?',
            ['obj', 'OBJ'],
            'O processo de build gera as pastas obj (artefatos intermediários) e bin (binários finais compilados).'
          ),
          q(
            'Ao versionar ou fazer backup manual dos seus exercícios de C#, qual atitude é correta em relação às pastas bin e obj?',
            'Não editar arquivos dentro delas manualmente, pois são recriadas pelo compilador a partir do código-fonte e do .csproj',
            [
              'Guardar seus arquivos .cs exclusivamente dentro de bin para acelerar o editor',
              'Renomear obj para codigo_principal toda vez que abrir o projeto'
            ],
            'As pastas bin e obj contêm saídas geradas automaticamente pelo SDK e podem ser reconstruídas com dotnet build.'
          ),
          q(
            'Em uma pasta raiz C:\\EstudosCSharp, qual organização mantém três exercícios do Capítulo 1 perfeitamente isolados?',
            'Três subpastas irmãs (Ex01Ola, Ex02Recibo e Ex03Frete), cada uma com seu próprio .csproj e Program.cs',
            [
              'Uma única pasta com Program1.cs, Program2.cs e Program3.cs compartilhando o mesmo .csproj com três top-level statements',
              'Colocar um projeto dentro da pasta bin do projeto anterior'
            ],
            'Subpastas independentes garantem que cada exercício tenha seu próprio ponto de entrada e seu próprio .csproj.'
          ),
          o(
            'Ordene os passos no terminal para estruturar uma pasta de estudos do zero e posicionar-se na subpasta do Capítulo 1:',
            [
              'Criar a pasta raiz de estudos com mkdir EstudosCSharp',
              'Entrar na pasta raiz com cd EstudosCSharp',
              'Criar a subpasta do capítulo com mkdir Capitulo01',
              'Acessar Capitulo01 com cd Capitulo01 para hospedar os projetos individuais'
            ],
            'Criar a hierarquia raiz -> capítulo antes de gerar subpastas de projeto mantém todo o curso organizado.'
          ),
          p(
            'Associe cada elemento da pasta de um projeto C# à sua finalidade na organização do diretório:',
            [
              ['Arquivo .csproj', 'Descreve configurações, versão do .NET e dependências do projeto'],
              ['Program.cs', 'Guarda o código-fonte em C# escrito pela pessoa desenvolvedora'],
              ['Subpasta bin', 'Recebe os assemblies finais compilados prontos para execução'],
              ['Subpasta obj', 'Armazena caches e arquivos intermediários usados durante o build']
            ],
            'Separar arquivos-fonte (.csproj e .cs) de diretórios gerados (bin e obj) mantém o projeto previsível.'
          )
        ]
      },
      {
        id: 'cs-c01-u2-l4',
        title: 'Anatomia dos comandos dotnet',
        subtitle: 'Aplicação · Estrutura da CLI',
        theory: 'A CLI dotnet segue o padrão dotnet <comando> [argumentos] [opções]. O driver dotnet invoca verbos como new, build, run e clean; argumentos indicam o alvo, como console, e opções precedidas por traços, como -n Loja ou --configuration Release, ajustam o comportamento da tarefa.',
        questions: [
          q(
            'No comando dotnet new console -n MinhaLoja, qual papel sintático cada parte desempenha na CLI?',
            'dotnet é o driver, new é o comando, console é o argumento do template e -n MinhaLoja é uma opção com valor',
            [
              'new é o driver do sistema operacional e dotnet é apenas um comentário opcional',
              'console é uma opção booleana e -n significa não compilar o arquivo'
            ],
            'A anatomia padrão é: driver (dotnet) + comando/verbo (new) + argumento (console) + opções (-n MinhaLoja).'
          ),
          g(
            'Complete a opção padrão da CLI para consultar no próprio terminal a documentação de uso e flags do verbo build:',
            ['--help', '-h'],
            'Qualquer subcomando da CLI dotnet aceita --help (ou -h) para listar seus argumentos e opções válidas.',
            'dotnet build ____'
          ),
          t(
            'No comando abaixo, qual palavra representa o verbo (subcomando principal) executado pelo driver dotnet?',
            ['clean'],
            'Logo após o driver dotnet vem o verbo clean, responsável por limpar os artefatos compilados anteriores.',
            'dotnet clean --configuration Release'
          ),
          q(
            'Qual comando remove os arquivos compilados anteriormente da pasta de saída para preparar uma recompilação limpa depois?',
            'dotnet clean',
            [
              'dotnet --list-sdks',
              'dotnet new sln'
            ],
            'O comando dotnet clean apaga as saídas geradas pelo build anterior na configuração informada.'
          ),
          q(
            'Nas opções da CLI dotnet, qual é a relação entre escrever -o PastaSaida e escrever --output PastaSaida?',
            'São as formas curta (um traço) e longa (dois traços) da mesma opção que define o diretório de saída',
            [
              'Um traço cria arquivos em C# e dois traços convertem o projeto para outra linguagem',
              '-o apaga a pasta existente, enquanto --output apenas lista seu conteúdo'
            ],
            'A CLI usa um traço para o apelido curto (-o) e dois traços para o nome completo e explícito (--output).'
          ),
          q(
            'O que dotnet run faz automaticamente quando você acabou de alterar uma linha em Program.cs?',
            'Restaura pacotes se necessário, recompila as alterações pendentes e executa a aplicação em sequência',
            [
              'Executa sempre a versão antiga ignorando qualquer mudança feita em Program.cs',
              'Apenas verifica a ortografia dos comentários sem acionar o CLR'
            ],
            'Por padrão, dotnet run verifica se o código mudou, aciona o build incremental e inicia o programa.'
          ),
          o(
            'Ordene os tokens para montar um comando válido da CLI que compila o projeto atual em modo Release:',
            [
              'dotnet',
              'build',
              '--configuration',
              'Release'
            ],
            'Começamos pelo driver dotnet, seguido do verbo build, do nome da opção --configuration e de seu valor Release.'
          ),
          p(
            'Relacione cada verbo da CLI dotnet à ação que ele executa em um projeto C#:',
            [
              ['dotnet new', 'Gera arquivos iniciais de um projeto a partir de um template'],
              ['dotnet restore', 'Baixa e resolve dependências declaradas no arquivo .csproj'],
              ['dotnet build', 'Compila o código-fonte sem iniciar a execução do programa'],
              ['dotnet run', 'Compila se houver mudanças e inicia a aplicação no terminal']
            ],
            'Dominar new, restore, build e run cobre todo o ciclo diário de trabalho com projetos C# no terminal.'
          )
        ]
      },
      {
        id: 'cs-c01-u2-l5',
        title: 'Diagnóstico completo do ambiente .NET',
        subtitle: 'Revisão e desafio · Ambiente e CLI',
        theory: 'Diagnosticar um ambiente .NET exige combinar conceitos: verificar se há um SDK completo ou só Runtime com dotnet --list-sdks e dotnet --list-runtimes, isolar cada projeto em sua pasta própria e montar comandos precisos na CLI para criar, compilar e testar aplicações sem atrito.',
        questions: [
          q(
            'Lucas baixou um pacote da plataforma .NET, mas ao rodar dotnet new console recebeu aviso de que não há SDK instalado, embora dotnet --list-runtimes mostre a versão 8.0.10. Qual é a correção exata?',
            'Instalar o .NET SDK 8.x correspondente à arquitetura de sua máquina para obter compilador e templates',
            [
              'Apagar a pasta C:\\Estudos e tentar rodar o mesmo comando na área de trabalho',
              'Trocar console por runtime na linha de comando: dotnet new runtime'
            ],
            'Ter apenas o Runtime permite executar apps prontos, mas desenvolver projetos exige instalar o .NET SDK.'
          ),
          g(
            'Complete o comando para descobrir todos os runtimes .NET presentes em um servidor antes de publicar um aplicativo nele:',
            ['--list-runtimes'],
            'A opção --list-runtimes exibe cada família de runtime instalada e suas respectivas versões.',
            'dotnet ____'
          ),
          t(
            'No comando abaixo, qual é o nome da pasta que será criada para abrigar o novo projeto?',
            ['CalculoImposto'],
            'A opção --output (ou -o) indica o diretório CalculoImposto onde os arquivos do projeto serão gerados.',
            'dotnet new console --output CalculoImposto'
          ),
          q(
            'Qual sequência de comandos verifica a versão ativa do SDK, limpa artefatos antigos e compila o projeto na pasta atual sem executá-lo?',
            'dotnet --version, seguido de dotnet clean e depois dotnet build',
            [
              'dotnet run, seguido de dotnet new console e depois dotnet --help',
              'dotnet --list-runtimes, seguido de mkdir bin e depois cd obj'
            ],
            '--version inspeciona o SDK ativo, clean remove binários anteriores e build apenas compila o projeto.'
          ),
          q(
            'Por que não se deve salvar dez exercícios independentes como dez arquivos .cs dentro de uma única pasta com um só .csproj?',
            'Porque todos são compilados juntos no mesmo assembly, gerando erro quando mais de um define ponto de entrada',
            [
              'Porque o compilador Roslyn aceita no máximo um arquivo .cs por computador',
              'Porque arquivos .csproj só enxergam arquivos salvos fora da própria pasta'
            ],
            'Por padrão, o SDK inclui todos os arquivos .cs da pasta do .csproj na mesma compilação; exercícios separados pedem pastas próprias.'
          ),
          q(
            'Qual opção curta equivale a --name ao definir o nome do projeto e de sua pasta no comando dotnet new console?',
            '-n',
            [
              '-v',
              '-r'
            ],
            'Em dotnet new, -n é o atalho curto de --name, definindo o nome do projeto e criando a pasta homônima.'
          ),
          o(
            'Ordene o fluxo completo para preparar um diretório limpo, validar o SDK e testar um projeto de diagnóstico:',
            [
              'Confirmar o SDK ativo no terminal com dotnet --version',
              'Criar e acessar a pasta de estudos com mkdir LabDotNet e cd LabDotNet',
              'Gerar um projeto isolado em subpasta com dotnet new console -n TesteAmbiente',
              'Entrar em TesteAmbiente com cd TesteAmbiente e validar a execução com dotnet run'
            ],
            'Validamos o SDK, organizamos a pasta-mãe, criamos o projeto em subpasta própria e executamos com dotnet run.'
          ),
          p(
            'Associe cada sintoma observado no terminal à causa técnica correspondente no ambiente .NET:',
            [
              ['dotnet não é reconhecido como comando no terminal', 'O diretório do .NET não está instalado ou não consta na variável PATH'],
              ['--list-sdks vazio, mas --list-runtimes preenchido', 'Somente o .NET Runtime foi instalado na máquina, faltando o SDK'],
              ['Erro de múltiplos arquivos de projeto no diretório', 'Há dois ou mais arquivos .csproj soltos na mesma pasta'],
              ['Lista de flags e exemplos impressa sem compilar nada', 'O comando foi chamado com a opção de consulta --help ou -h']
            ],
            'Ler com atenção a saída da CLI permite identificar problemas de instalação, pasta ou parâmetros em segundos.'
          )
        ]
      }
    ],
    3: [
      {
        id: 'cs-c01-u3-l1',
        title: 'Criando um app com dotnet new console',
        subtitle: 'Apresentação · Primeiro projeto console',
        theory: 'Com dotnet new console -n EstoqueApp, o SDK cria a pasta EstoqueApp contendo EstoqueApp.csproj, que define a versão do .NET e configurações de build, e Program.cs, onde fica o código inicial. Depois, basta entrar na pasta e rodar dotnet run para compilar e executar o projeto.',
        questions: [
          q(
            'Quando você está em C:\\Estudos e executa dotnet new console -n ControleCaixa, quais arquivos principais são criados dentro de C:\\Estudos\\ControleCaixa?',
            'ControleCaixa.csproj e Program.cs (além da pasta obj após a restauração inicial)',
            [
              'Apenas um arquivo ControleCaixa.txt sem extensão de código C#',
              'Somente um executável nativo pronto, sem nenhum código-fonte editável'
            ],
            'O template console gera o arquivo de projeto (<Nome>.csproj) e o arquivo inicial de código-fonte (Program.cs).'
          ),
          g(
            'Complete o comando para criar um aplicativo de terminal chamado Bilheteria em sua própria subpasta:',
            ['console'],
            'O identificador de template console instrui dotnet new a gerar um aplicativo de linha de comando.',
            'dotnet new ____ -n Bilheteria'
          ),
          t(
            'Se você está na pasta-mãe C:\\Estudos e acabou de rodar dotnet new console -n AgendaMedica, qual é o nome exato do arquivo .csproj criado lá dentro?',
            ['AgendaMedica.csproj'],
            'O parâmetro -n AgendaMedica nomeia tanto a subpasta quanto o arquivo de projeto AgendaMedica.csproj.'
          ),
          q(
            'Qual é a diferença entre rodar dotnet new console (sem -n) dentro da pasta vazia Relatorio e rodar dotnet new console -n Relatorio dentro dela?',
            'Sem -n, os arquivos são criados direto na pasta atual usando o nome dela; com -n Relatorio, cria-se outra subpasta Relatorio\\Relatorio',
            [
              'Sem -n o projeto nasce em linguagem IL pura, enquanto com -n nasce em C#',
              'Não há nenhuma diferença: os dois gravam os arquivos exatamente no mesmo caminho'
            ],
            'Omitir -n usa o diretório atual como destino e nome; passar -n cria um novo subdiretório com aquele nome.'
          ),
          q(
            'Sem sair da pasta-mãe C:\\Estudos, como você pode executar o projeto localizado na subpasta C:\\Estudos\\App?',
            'dotnet run --project App',
            [
              'dotnet new --run App',
              'dotnet --version App'
            ],
            'A opção --project permite apontar a pasta ou o arquivo .csproj do projeto que dotnet run deve executar.'
          ),
          q(
            'Em um arquivo App.csproj recém-gerado, o que a tag <OutputType>Exe</OutputType> indica ao SDK?',
            'Que o projeto produz um aplicativo executável com ponto de entrada, e não apenas uma biblioteca auxiliar',
            [
              'Que o código só pode rodar em computadores sem sistema operacional',
              'Que os comentários do código serão impressos automaticamente na tela'
            ],
            'OutputType igual a Exe instrui o compilador a exigir um ponto de entrada para iniciar a aplicação.'
          ),
          o(
            'Ordene os comandos para criar o projeto console App a partir da pasta C:\\Estudos, entrar nele e executá-lo:',
            [
              'Executar dotnet new console -n App dentro de C:\\Estudos',
              'Entrar no diretório criado com cd App',
              'Conferir Program.cs e App.csproj gerados pelo template',
              'Executar dotnet run para compilar e ver a saída no console'
            ],
            'Geramos o projeto na subpasta App, entramos nela com cd App, revisamos os arquivos e rodamos dotnet run.'
          ),
          p(
            'Conecte cada item gerado ou usado no template console à sua responsabilidade:',
            [
              ['dotnet new console -n App', 'Cria a subpasta App com os arquivos iniciais do aplicativo'],
              ['App.csproj', 'Arquivo XML com TargetFramework, OutputType e opções do SDK'],
              ['Program.cs', 'Arquivo inicial de código C# com a instrução de boas-vindas'],
              ['dotnet run --project App', 'Executa o projeto da subpasta App a partir do diretório pai']
            ],
            'Com esses quatro elementos você cria, entende e executa qualquer projeto console em C#.'
          )
        ]
      },
      {
        id: 'cs-c01-u3-l2',
        title: 'Top-level statements e método Main',
        subtitle: 'Prática guiada · Ponto de entrada',
        theory: 'Desde o C# 9, instruções de nível superior permitem escrever comandos direto em Program.cs sem cerimônia, ideal para scripts e microsserviços. Nos bastidores, o compilador gera a classe Program com static void Main(string[] args), formato clássico que apenas um arquivo pode omitir.',
        questions: [
          q(
            'Por que um Program.cs moderno com apenas Console.WriteLine("Caixa aberto"); compila e roda sem declarar explicitamente class Program?',
            'Porque o C# suporta instruções de nível superior e o compilador sintetiza a classe Program e o método Main automaticamente',
            [
              'Porque versões recentes do C# deixaram de ser orientadas a tipos e viraram scripts interpretados sem CLR',
              'Porque Console.WriteLine substitui o compilador quando está na primeira linha'
            ],
            'Com top-level statements, o compilador Roslyn envolve suas instruções em um método de entrada gerado nos bastidores.'
          ),
          q(
            'Em um projeto C# com vários arquivos .cs, quantos arquivos podem conter instruções de nível superior (top-level statements)?',
            'Apenas um único arquivo em todo o projeto, pois só pode haver um ponto de entrada desse tipo',
            [
              'Todos os arquivos .cs do projeto ao mesmo tempo, executados em ordem alfabética',
              'Exatamente dois arquivos: um para entrada e outro para saída'
            ],
            'O compilador permite top-level statements em no máximo um arquivo por projeto para evitar ambiguidade no início do programa.'
          ),
          g(
            'Complete a assinatura clássica do método que atua como ponto de entrada explícito em uma classe Program:',
            ['Main'],
            'Em C#, o método de entrada clássico chama-se Main com inicial maiúscula (case-sensitive) e modificador static.',
            'class Program\n{\n    static void ____(string[] args)\n    {\n        Console.WriteLine("Sistema iniciado");\n    }\n}'
          ),
          t(
            'Na assinatura abaixo, qual palavra-chave indica que o método pertence à classe e pode ser chamado pelo CLR sem instanciar um objeto Program?',
            ['static'],
            'O modificador static permite ao runtime invocar Main diretamente no tipo Program ao iniciar o processo.',
            'class Program\n{\n    static void Main(string[] args)\n    {\n        Console.WriteLine("Pronto");\n    }\n}'
          ),
          q(
            'Qual opção de dotnet new console gera o arquivo Program.cs já no estilo clássico com class Program e static void Main(string[] args)?',
            '--use-program-main',
            [
              '--no-clr',
              '--only-runtime'
            ],
            'Passar --use-program-main ao template console cria Program.cs com a estrutura explícita de classe e método Main.'
          ),
          q(
            'O que acontece se você escrever static void main(string[] args) com m minúsculo na estrutura clássica sem top-level statements?',
            'O compilador não o reconhece como ponto de entrada válido, pois C# diferencia maiúsculas de minúsculas e exige Main',
            [
              'O compilador corrige automaticamente o arquivo no disco para Main maiúsculo',
              'O programa roda normalmente, mas imprime todas as mensagens em letras minúsculas'
            ],
            'C# é case-sensitive: o ponto de entrada reconhecido pela especificação da linguagem precisa se chamar Main.'
          ),
          o(
            'Ordene as linhas para formar uma classe Program clássica sintaticamente válida em C#:',
            [
              'class Program',
              '{',
              '    static void Main(string[] args) { Console.WriteLine("Ativo"); }',
              '}'
            ],
            'Declaramos class Program, abrimos o bloco da classe, definimos static void Main e fechamos a chave da classe.'
          ),
          p(
            'Associe cada elemento do ponto de entrada em C# ao seu significado técnico:',
            [
              ['Top-level statements', 'Código escrito direto no topo de Program.cs sem declarar classe explícita'],
              ['Main', 'Nome obrigatório, com M maiúsculo, do método clássico de início'],
              ['void', 'Indica que o método de entrada não devolve valor numérico ao terminar'],
              ['string[] args', 'Vetor que recebe argumentos passados pela linha de comando']
            ],
            'Entender os dois formatos permite ler tanto projetos modernos enxutos quanto bases corporativas clássicas.'
          )
        ]
      },
      {
        id: 'cs-c01-u3-l3',
        title: 'Namespaces, using System e ImplicitUsings',
        subtitle: 'Aprofundamento · Diretivas using',
        theory: 'Tipos do .NET ficam organizados em namespaces: a classe Console pertence a System. Sem importá-lo, seria preciso digitar System.Console.WriteLine. A diretiva using System; libera o nome curto, e <ImplicitUsings>enable</ImplicitUsings> no .csproj já importa namespaces comuns no build.',
        questions: [
          q(
            'Para que serve a diretiva using System; no topo de um arquivo C#?',
            'Permitir usar tipos do namespace System, como Console e Math, sem repetir o prefixo System. a cada chamada',
            [
              'Instalar o sistema operacional na memória antes de rodar o programa',
              'Impedir que outros arquivos do projeto acessem o terminal'
            ],
            'A diretiva using importa a visibilidade dos nomes de um namespace, simplificando System.Console para Console.'
          ),
          g(
            'Complete a chamada totalmente qualificada para escrever no terminal quando ImplicitUsings está desativado e não há nenhuma diretiva using no arquivo:',
            ['System'],
            'A classe Console reside no namespace System; seu nome totalmente qualificado é System.Console.',
            '____.Console.WriteLine("Sem diretiva using");'
          ),
          t(
            'No arquivo .csproj abaixo, qual valor configurado dentro da tag <ImplicitUsings> ativa a importação automática de namespaces comuns?',
            ['enable'],
            'Definir <ImplicitUsings>enable</ImplicitUsings> faz o SDK gerar diretivas global using automáticas para System, System.IO e outros.',
            '<Project Sdk="Microsoft.NET.Sdk">\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n  </PropertyGroup>\n</Project>'
          ),
          q(
            'Se você alterar <ImplicitUsings>enable</ImplicitUsings> para disable no .csproj e seu Program.cs tiver apenas Console.WriteLine("Oi");, o que ocorre no build?',
            'Erro de compilação informando que o nome Console não existe no contexto atual, até adicionar using System; ou System.Console',
            [
              'O programa compila normalmente, mas não exibe nada na tela ao rodar',
              'O arquivo .csproj é ignorado pelo Roslyn em projetos console'
            ],
            'Com ImplicitUsings desabilitado, nenhum namespace é importado automaticamente; é preciso declarar using System; ou qualificar o tipo.'
          ),
          q(
            'Qual é a função principal dos namespaces na biblioteca padrão do .NET?',
            'Agrupar tipos relacionados logicamente e evitar colisões entre classes que tenham o mesmo nome em bibliotecas distintas',
            [
              'Aumentar o consumo de memória RAM para deixar o executável maior',
              'Criptografar as mensagens exibidas por Console.WriteLine'
            ],
            'Namespaces organizam milhares de tipos em áreas claras (System, System.IO, System.Text) e previnem conflitos de nomes.'
          ),
          q(
            'Em um arquivo C# que precisa declarar explicitamente suas importações, onde a diretiva using System; é posicionada por convenção?',
            'No início do arquivo .cs, antes das declarações de namespaces, classes ou instruções de nível superior',
            [
              'Na última linha do arquivo .cs, obrigatoriamente depois do fechamento de todas as chaves',
              'Dentro dos parênteses de Console.WriteLine(using System)'
            ],
            'Diretivas using de importação ficam no topo do arquivo-fonte e terminam com ponto e vírgula.'
          ),
          o(
            'Ordene o código clássico completo com importação explícita de System quando ImplicitUsings está desabilitado:',
            [
              'using System;',
              'class Program',
              '{',
              '    static void Main() { Console.WriteLine("Importado"); }',
              '}'
            ],
            'Primeiro importamos o namespace com using System;, depois declaramos a classe Program e seu bloco com Main.'
          ),
          p(
            'Relacione cada forma de escrita ou configuração ao seu efeito sobre o uso da classe Console:',
            [
              ['using System;', 'Importa o namespace System explicitamente no arquivo .cs atual'],
              ['System.Console.WriteLine("Ok");', 'Usa o nome totalmente qualificado sem depender de diretiva using'],
              ['<ImplicitUsings>enable</ImplicitUsings>', 'Gera global usings automáticos para namespaces básicos no projeto'],
              ['<ImplicitUsings>disable</ImplicitUsings>', 'Desliga importações implícitas e exige declarar cada using no código']
            ],
            'Saber como ImplicitUsings e using System; interagem evita surpresas ao alternar entre projetos novos e legados.'
          )
        ]
      },
      {
        id: 'cs-c01-u3-l4',
        title: 'Documentando código com comentários',
        subtitle: 'Aplicação · Comentários em C#',
        theory: 'Comentários explicam decisões do código sem afetar a execução: // ignora o restante da linha, /* ... */ comenta blocos de várias linhas sem permitir aninhamento, e /// cria documentação XML com tags como <summary>, exibida pelo editor ao passar o cursor sobre métodos de uma API.',
        questions: [
          q(
            'Como o compilador Roslyn trata comentários de linha (//) e de bloco (/* ... */) ao gerar a Intermediate Language (IL)?',
            'Ignora-os na emissão de IL, de modo que comentários não deixam o programa mais lento em tempo de execução',
            [
              'Converte cada comentário em uma chamada invisível de Console.WriteLine na execução',
              'Interrompe o build caso algum arquivo .cs não tenha pelo menos dez comentários'
            ],
            'Comentários comuns servem apenas para leitura humana; o compilador os descarta antes de emitir as instruções IL.'
          ),
          g(
            'Complete o marcador de três barras usado em C# para criar um comentário de documentação XML acima do método CalcularFrete:',
            ['///'],
            'Três barras seguidas (///) iniciam comentários de documentação XML que alimentam dicas do editor (IntelliSense).',
            '____ <summary>Calcula o frete com base no peso em quilos.</summary>\nstatic double CalcularFrete(double peso) => peso * 4.5;'
          ),
          t(
            'Qual texto exato é exibido no console ao executar o trecho abaixo?',
            ['Versao ativa'],
            'As duas primeiras linhas estão comentadas com // e /* */; apenas a terceira executa e imprime Versao ativa.',
            '// Console.WriteLine("Rascunho");\n/* Console.WriteLine("Teste antigo"); */\nConsole.WriteLine("Versao ativa"); // aprovado'
          ),
          q(
            'O que acontece em C# ao tentar aninhar um comentário de bloco dentro de outro, como em /* externo /* interno */ fim */?',
            'Erro de compilação, pois o primeiro */ encerra o bloco inteiro e deixa fim */ solto como sintaxe inválida',
            [
              'O C# conta quantos blocos foram abertos e fecha cada um separadamente sem erro',
              'Apenas o trecho interno é comentado e o trecho externo é executado como código'
            ],
            'Comentários /* ... */ não suportam aninhamento em C#: o primeiro */ encontrado fecha imediatamente o comentário.'
          ),
          q(
            'Qual exemplo representa uma boa prática profissional ao escrever comentários em um sistema de loja?',
            '// Desconto limitado a 15% por regra fiscal do convênio estadual',
            [
              '// Imprime uma mensagem na tela usando Console.WriteLine',
              '// Soma 1 na variável i e guarda o resultado'
            ],
            'Bons comentários explicam o porquê (regras de negócio, restrições), e não narram o óbvio que o código já mostra.'
          ),
          q(
            'Em comentários de documentação XML (///), qual tag padrão descreve resumidamente o propósito de uma classe ou método?',
            '<summary>...</summary>',
            [
              '<console>...</console>',
              '<csproj>...</csproj>'
            ],
            'A tag <summary> fornece o resumo principal exibido em tooltips de editores e geradores de documentação.'
          ),
          o(
            'Ordene as linhas para documentar a classe CalculadoraTaxa com um bloco XML <summary> válido antes de declará-la:',
            [
              '/// <summary>',
              '/// Reúne cálculos de taxas administrativas da corretora.',
              '/// </summary>',
              'class CalculadoraTaxa { }'
            ],
            'O comentário XML abre <summary>, traz a descrição precedida por ///, fecha </summary> e fica imediatamente acima do tipo.'
          ),
          p(
            'Associe cada estilo de comentário em C# ao seu comportamento e caso de uso:',
            [
              ['// nota rápida', 'Ignora tudo do marcador até o fim daquela única linha'],
              ['/* bloco longo */', 'Abrange múltiplas linhas entre a abertura e o primeiro */'],
              ['/// <summary>...</summary>', 'Gera metadados XML de documentação lidos pelo IntelliSense'],
              ['// Console.WriteLine("debug");', 'Desativa temporariamente uma instrução durante testes locais']
            ],
            'Usar //, /* */ e /// com critério mantém o código legível e bem documentado para toda a equipe.'
          )
        ]
      },
      {
        id: 'cs-c01-u3-l5',
        title: 'Dominando a estrutura do projeto console',
        subtitle: 'Revisão e desafio · Projeto console',
        theory: 'Um projeto console bem construído une arquivo .csproj enxuto com ImplicitUsings ativo, ponto de entrada único — seja com top-level statements ou static void Main — e comentários objetivos que registram regras de negócio e documentam contratos públicos com XML /// para toda a equipe.',
        questions: [
          q(
            'Um projeto possui Program.cs com Console.WriteLine("A"); no topo e você adiciona Utilitario.cs também com Console.WriteLine("B"); solto no topo. O que ocorre ao rodar dotnet build?',
            'O build falha, pois apenas um arquivo de compilação no projeto pode conter instruções de nível superior',
            [
              'O programa imprime A e depois B em sequência automática',
              'O compilador ignora Utilitario.cs por não se chamar Program.cs'
            ],
            'Em C#, o nome do arquivo não desativa o código: ter dois arquivos com top-level statements viola a regra de ponto de entrada único.'
          ),
          g(
            'Complete o comando para criar o projeto console FolhaSalarial já no formato clássico com class Program e método Main explícito:',
            ['--use-program-main'],
            'A flag --use-program-main instrui o template console a gerar class Program e static void Main(string[] args).',
            'dotnet new console -n FolhaSalarial ____'
          ),
          t(
            'Com ImplicitUsings desativado no .csproj, qual linha exata (incluindo ponto e vírgula) deve ser colocada no topo de Program.cs para importar o namespace onde fica Console?',
            ['using System;'],
            'A diretiva using System; importa o namespace System e termina obrigatoriamente com ponto e vírgula.',
            '// ImplicitUsings está definido como disable no .csproj\n// Adicione a diretiva necessária:\n\nConsole.WriteLine("Monitor ativo");'
          ),
          q(
            'No arquivo Monitor.csproj, qual tag define para qual versão da plataforma (como net8.0 ou net9.0) o projeto será compilado?',
            '<TargetFramework>',
            [
              '<Summary>',
              '<ConsoleOutput>'
            ],
            'A propriedade <TargetFramework> especifica o Target Framework Moniker (ex.: net8.0) alvo da compilação.'
          ),
          q(
            'Analise o código abaixo. Qual mensagem será impressa ao executar dotnet run?',
            'Modo producao',
            [
              'Modo manutencao seguido de Modo producao',
              'Ponto inicial do painel. seguido de Modo producao'
            ],
            'Tanto o comentário XML /// quanto o bloco /* ... */ não executam nada; apenas Console.WriteLine("Modo producao"); roda.',
            'using System;\n\nclass Program\n{\n    /// <summary>Ponto inicial do painel.</summary>\n    static void Main(string[] args)\n    {\n        /* Console.WriteLine("Modo manutencao"); */\n        Console.WriteLine("Modo producao");\n    }\n}'
          ),
          q(
            'Qual detalhe sintático é obrigatório ao final de toda instrução simples em C#, como using System; ou Console.WriteLine("Ok");?',
            'Ponto e vírgula (;)',
            [
              'Dois-pontos (:)',
              'Barra dupla (//)'
            ],
            'Em C#, instruções e diretivas using são encerradas por ponto e vírgula (;).'
          ),
          o(
            'Ordene a sequência para criar um projeto console clássico, inspecionar seu código e rodá-lo a partir da pasta-mãe:',
            [
              'Executar dotnet new console -n PainelLoja --use-program-main',
              'Abrir PainelLoja/PainelLoja.csproj para conferir TargetFramework e ImplicitUsings',
              'Revisar static void Main(string[] args) dentro de PainelLoja/Program.cs',
              'Executar dotnet run --project PainelLoja e validar a mensagem no terminal'
            ],
            'Criamos o projeto com Main clássico, conferimos o .csproj e Program.cs e executamos apontando --project PainelLoja.'
          ),
          p(
            'Relacione cada erro de compilação comum em um projeto console novo à correção adequada:',
            [
              ['O nome Console não existe no contexto atual', 'Adicionar using System; ou habilitar ImplicitUsings no .csproj'],
              ['Apenas uma unidade de compilação pode ter instruções de nível superior', 'Manter top-level statements em um só arquivo e mover o resto para classes'],
              ['O programa não contém um método Main estático adequado para ponto de entrada', 'Corrigir a grafia para static void Main com M maiúsculo'],
              ['É esperado ; ao final da linha', 'Encerrar a instrução C# com ponto e vírgula']
            ],
            'Reconhecer essas quatro mensagens do compilador Roslyn destrava os erros mais frequentes de quem começa em C#.'
          )
        ]
      }
    ],
    4: [
      {
        id: 'cs-c01-u4-l1',
        title: 'Console.WriteLine versus Console.Write',
        subtitle: 'Apresentação · Escrita no console',
        theory: 'Em painéis de terminal, controlar quebras de linha faz diferença: Console.Write imprime o texto e mantém o cursor na mesma linha, útil para montar "[OK] Banco conectado" em etapas. Já Console.WriteLine adiciona quebra ao final, e chamado vazio, Console.WriteLine(), salta uma linha.',
        questions: [
          q(
            'Qual é a saída exata produzida pelas três chamadas de saída abaixo?',
            'Status: OK! em uma única linha, movendo o cursor para a linha seguinte ao final',
            [
              'Três linhas separadas contendo Status:, OK e !',
              'OK!Status: invertido na mesma linha'
            ],
            'As duas chamadas Console.Write mantêm o cursor na mesma linha ("Status: " + "OK"), e WriteLine imprime "!" e quebra a linha.',
            'Console.Write("Status: ");\nConsole.Write("OK");\nConsole.WriteLine("!");'
          ),
          g(
            'Complete o método de Console que imprime o rótulo "Login: " mantendo o cursor na mesma linha para a próxima escrita:',
            ['Write'],
            'Console.Write escreve o argumento no fluxo de saída sem acrescentar quebra de linha ao final.',
            'Console.____("Login: ");\nConsole.WriteLine("admin");'
          ),
          t(
            'Quantas linhas visíveis com texto aparecem no terminal ao executar o código abaixo?',
            ['2', 'duas'],
            'A primeira linha junta ABC (quebrando após C) e a segunda linha junta DE (quebrando após E): são 2 linhas de texto.',
            'Console.Write("A");\nConsole.Write("B");\nConsole.WriteLine("C");\nConsole.Write("D");\nConsole.WriteLine("E");'
          ),
          q(
            'O que acontece ao chamar Console.WriteLine() sem nenhum argumento entre os parênteses?',
            'Imprime apenas uma quebra de linha, criando uma linha em branco para separar blocos no terminal',
            [
              'Gera erro de compilação porque WriteLine exige pelo menos uma string',
              'Limpa toda a tela do terminal e reinicia o programa'
            ],
            'Console.WriteLine() possui uma sobrecarga sem parâmetros que emite somente o terminador de linha do sistema.'
          ),
          q(
            'Por outro lado, o que acontece se você escrever Console.Write(); com os parênteses totalmente vazios?',
            'Erro de compilação, pois nenhuma sobrecarga do método Write aceita zero argumentos',
            [
              'Imprime um espaço em branco invisível na tela',
              'Move o cursor para o início da linha anterior'
            ],
            'Como Write não adiciona quebra de linha, chamá-lo sem dados não faria nada; por isso a classe Console não define Console.Write() vazio.'
          ),
          q(
            'Qual texto exato aparece na primeira linha da saída ao executar o trecho da Padaria Aurora?',
            '[Padaria Aurora] Pao: 12',
            [
              '[Padaria Aurora]',
              '[Padaria Aurora] Pao: 12Concluido'
            ],
            'Os dois Write concatenam "[Padaria Aurora] " e "Pao: " na mesma linha; WriteLine(12) imprime 12 e encerra a primeira linha.',
            'Console.Write("[Padaria Aurora] ");\nConsole.Write("Pao: ");\nConsole.WriteLine(12);\nConsole.WriteLine("Concluido");'
          ),
          o(
            'Ordene as instruções para exibir exatamente "Item: Cafe" na primeira linha, uma linha em branco no meio e "Fim" na terceira linha:',
            [
              'Console.Write("Item: ");',
              'Console.WriteLine("Cafe");',
              'Console.WriteLine();',
              'Console.WriteLine("Fim");'
            ],
            'Write("Item: ") + WriteLine("Cafe") formam a 1ª linha; WriteLine() salta a 2ª linha em branco; WriteLine("Fim") escreve na 3ª.'
          ),
          p(
            'Associe cada chamada da classe Console ao efeito exato sobre o texto e o cursor no terminal:',
            [
              ['Console.Write("Progresso: ");', 'Escreve o texto e deixa o cursor parado logo após o espaço'],
              ['Console.WriteLine("100%");', 'Escreve 100% na posição atual e avança o cursor para a linha de baixo'],
              ['Console.WriteLine();', 'Emite apenas uma quebra de linha para abrir espaço vertical'],
              ['Console.Write();', 'Não compila por inexistência de sobrecarga sem argumentos']
            ],
            'Combinar Write e WriteLine dá controle total sobre o layout linha a linha no console.'
          )
        ]
      },
      {
        id: 'cs-c01-u4-l2',
        title: 'Interpolação de strings com cifrão',
        subtitle: 'Prática guiada · Strings interpoladas',
        theory: 'A interpolação com $"..." substitui concatenações longas com + por mensagens legíveis, como $"Pedido {id}: {itens} itens". O C# avalia variáveis e expressões dentro de { }, como {qtd * 2}. Se precisar exibir chaves literais em uma string interpolada, basta duplicá-las com {{ e }}.',
        questions: [
          q(
            'O que é impresso se a pessoa desenvolvedora esquecer o símbolo $ antes das aspas em Console.WriteLine("Olá, {cliente}!");?',
            'Olá, {cliente}! literalmente com as chaves, sem substituir o valor da variável',
            [
              'Erro de compilação imediato por uso proibido de chaves em strings comuns',
              'Olá, ! com o trecho {cliente} removido silenciosamente'
            ],
            'Sem o prefixo $, as chaves não têm significado especial e são tratadas como caracteres comuns da string.'
          ),
          g(
            'Complete o prefixo antes das aspas para que as variáveis mesa e pessoas sejam interpoladas na mensagem do restaurante:',
            ['$'],
            'O caractere $ imediatamente antes da aspa inicial habilita a interpolação de expressões entre { e }.',
            'int mesa = 7;\nint pessoas = 4;\nConsole.WriteLine(____"Mesa {mesa} reservada para {pessoas} pessoas.");'
          ),
          t(
            'Qual texto exato o cálculo interpolado abaixo imprime no console?',
            ['Total: 18 garrafas'],
            'Dentro de { }, o C# avalia a expressão aritmética 3 * 6 = 18, produzindo "Total: 18 garrafas".',
            'int caixas = 3;\nint unidadesPorCaixa = 6;\nConsole.WriteLine($"Total: {caixas * unidadesPorCaixa} garrafas");'
          ),
          q(
            'Dentro de uma string interpolada com $, como exibir chaves literais ao redor de OK para imprimir exatamente "{OK} Etapa 1"?',
            'Console.WriteLine($"{{OK}} Etapa {etapa}");',
            [
              'Console.WriteLine($"{OK} Etapa {etapa}");',
              'Console.WriteLine($"\\{OK\\} Etapa {etapa}");'
            ],
            'Em strings interpoladas C#, chaves literais são escapadas duplicando-as: {{ gera { e }} gera }.',
            'int etapa = 1;'
          ),
          q(
            'Compare a concatenação "Item " + codigo + " - Qtd: " + qtd com a interpolação $"Item {codigo} - Qtd: {qtd}". Qual afirmação é verdadeira?',
            'Ambas produzem exatamente o mesmo texto final, mas a interpolação evita abrir e fechar várias aspas e sinais de +',
            [
              'A interpolação só aceita variáveis do tipo string, enquanto + aceita números inteiros',
              'A concatenação com + adiciona espaços automáticos entre os termos'
            ],
            'A interpolação converte números automaticamente para texto dentro das lacunas { } e torna o molde final muito mais legível.'
          ),
          q(
            'Qual saída é exibida pelo código de etiqueta logística do armazém abaixo?',
            'Posicao: B5',
            [
              'Posicao: B41',
              'Posicao: {setor}5'
            ],
            '{setor} injeta "B" e {corredor + 1} soma 4 + 1 = 5 antes de converter para texto, resultando em "Posicao: B5".',
            'string setor = "B";\nint corredor = 4;\nConsole.WriteLine($"Posicao: {setor}{corredor + 1}");'
          ),
          o(
            'Ordene as linhas para declarar os dados do ingresso e imprimir "Sala 3 - Assento 12" usando interpolação:',
            [
              'int sala = 3;',
              'int assento = 12;',
              'string bilhete = $"Sala {sala} - Assento {assento}";',
              'Console.WriteLine(bilhete);'
            ],
            'Primeiro declaramos as variáveis usadas na expressão, montamos a string interpolada com $ e a exibimos com WriteLine.'
          ),
          p(
            'Relacione cada expressão de string em C# (considerando int n = 5;) ao texto resultante:',
            [
              ['$"Nota: {n}"', 'Nota: 5'],
              ['"Nota: {n}"', 'Nota: {n}'],
              ['$"Dobro: {n * 2}"', 'Dobro: 10'],
              ['$"Chave {{n}} = {n}"', 'Chave {n} = 5']
            ],
            'O prefixo $, expressões em { } e chaves duplicadas {{ }} cobrem os casos essenciais de interpolação.'
          )
        ]
      },
      {
        id: 'cs-c01-u4-l3',
        title: 'Sequências de escape e strings verbatim',
        subtitle: 'Aprofundamento · Escapes e arroba',
        theory: 'Em strings comuns, a barra invertida inicia escapes: \\n quebra linha, \\t alinha colunas com tabulação, \\" insere aspas e \\\\ gera uma barra. Já strings verbatim com @"C:\\Dados\\notas.csv" tratam barras literalmente para caminhos de arquivo, representando aspas internas com "".',
        questions: [
          q(
            'Por que o caminho "C:\\novo\\tabela.txt" escrito sem @ em uma string comum causa comportamento inesperado no console?',
            'Porque \\n é interpretado como quebra de linha e \\t como tabulação horizontal, deformando o caminho',
            [
              'Porque a letra C maiúscula seguida de dois-pontos é proibida em strings do C#',
              'Porque strings sem @ apagam arquivos do disco ao serem impressas'
            ],
            'Em strings normais, \\n vira nova linha e \\t vira tabulação; para caminhos Windows, usa-se @"C:\\novo\\tabela.txt" ou barras duplas.'
          ),
          g(
            'Complete o prefixo antes das aspas para criar uma string verbatim que trate todas as barras invertidas do caminho literalmente:',
            ['@'],
            'O símbolo @ define uma string verbatim, desativando escapes com barra invertida e preservando o caminho como escrito.',
            'string pastaBackup = ____"C:\\Servidor\\Backups\\2026";\nConsole.WriteLine(pastaBackup);'
          ),
          t(
            'Quantas linhas de texto serão exibidas no console ao executar a instrução com escapes abaixo?',
            ['3', 'três', 'tres'],
            'Há dois escapes \\n separando o texto em 3 linhas: "Cabecalho", "Item 1" e "Item 2".',
            'Console.WriteLine("Cabecalho\\nItem 1\\nItem 2");'
          ),
          q(
            'Como representar aspas duplas internas dentro de uma string verbatim precedida por @, para produzir exatamente: Rota "Norte"?',
            '@"Rota ""Norte"""',
            [
              '@"Rota \\"Norte\\""',
              '@"Rota "Norte""'
            ],
            'Em strings verbatim (@"..."), a barra invertida não funciona como escape; para inserir uma aspa dupla, duplica-se a aspa com "".'
          ),
          q(
            'Qual sequência de escape insere um avanço de tabulação horizontal para alinhar colunas simples em uma string regular?',
            '\\t',
            [
              '\\b',
              '\\r'
            ],
            '\\t representa o caractere de tabulação horizontal (TAB), muito usado para separar colunas em saídas rápidas de console.'
          ),
          q(
            'No C# moderno (a partir do C# 8), ao combinar interpolação e string verbatim para montar um caminho com a variável usuario, qual sintaxe compila?',
            'Tanto $@"C:\\Users\\{usuario}\\Docs" quanto @$"C:\\Users\\{usuario}\\Docs" são válidos',
            [
              'É proibido combinar $ e @ na mesma string em qualquer versão do C#',
              'Somente "$@C:\\Users\\{usuario}" com os símbolos dentro das aspas compila'
            ],
            'Desde o C# 8, os prefixos $@"..." e @$"..." são ambos válidos para criar strings verbatim interpoladas.',
            'string usuario = "ana";'
          ),
          o(
            'Ordene as instruções para imprimir um cabeçalho tabulado "COD\\tPRODUTO" na primeira linha e o caminho literal "C:\\Loja\\itens.csv" na segunda:',
            [
              'string cabecalho = "COD\\tPRODUTO";',
              'string arquivo = @"C:\\Loja\\itens.csv";',
              'Console.WriteLine(cabecalho);',
              'Console.WriteLine(arquivo);'
            ],
            'Usamos string regular para interpretar \\t como tabulação e string verbatim (@) para manter as barras do caminho intactas.'
          ),
          p(
            'Associe cada construção de string em C# ao resultado ou comportamento que ela produz:',
            [
              ['"Linha A\\nLinha B"', 'Quebra o texto em duas linhas usando escape de nova linha'],
              ['"Nome:\\tAna"', 'Insere uma tabulação horizontal entre o rótulo e o nome'],
              ['"Disse \\"Oi\\""', 'Exibe aspas duplas internas dentro de uma string comum'],
              ['@"C:\\temp\\notas.txt"', 'Preserva todas as barras invertidas sem interpretá-las como escape']
            ],
            'Escolher entre escapes clássicos e @ verbatim evita erros sutis em textos formatados e caminhos de sistema.'
          )
        ]
      },
      {
        id: 'cs-c01-u4-l4',
        title: 'Formatação numérica na interpolação',
        subtitle: 'Aplicação · Especificadores de formato',
        theory: 'Dentro da interpolação, dois-pontos aplicam formatação numérica: {preco:F2} fixa duas casas decimais com arredondamento em cupons fiscais, {codigo:D4} preenche inteiros com zeros à esquerda até quatro dígitos (0042) e {taxa:P1} multiplica por 100 e exibe percentual com uma casa.',
        questions: [
          q(
            'Em uma string interpolada $"Valor: {preco:F2}", o que o especificador :F2 determina?',
            'Formatação de ponto fixo com exatamente 2 casas decimais, arredondando se houver mais casas',
            [
              'Multiplicação do valor por 2 antes de imprimir apenas a parte inteira',
              'Exibição do número em base hexadecimal com 2 dígitos'
            ],
            'O especificador Fn (Fixed-point) fixa n casas decimais, preenchendo com zeros (12.5 -> 12.50) ou arredondando (12.568 -> 12.57).'
          ),
          g(
            'Complete o especificador de formato na interpolação para exibir o preço do combustível sempre com exatamente 2 casas decimais:',
            ['F2', 'f2'],
            'Em {litro:F2}, os dois-pontos introduzem o especificador F2 para fixar duas casas decimais.',
            'double litro = 5.8;\nConsole.WriteLine($"Preco: {litro:____}");'
          ),
          t(
            'Qual texto exato de 4 dígitos é exibido no console ao formatar o número da senha com D4?',
            ['0042'],
            'O especificador D4 (Decimal para inteiros) garante largura mínima de 4 dígitos preenchendo zeros à esquerda: 0042.',
            'int senha = 42;\nConsole.WriteLine($"{senha:D4}");'
          ),
          q(
            'Considerando separador decimal com ponto (InvariantCulture), o que é impresso por Console.WriteLine($"{19.987:F2}");?',
            '19.99',
            [
              '19.98',
              '0019.987'
            ],
            'O formato F2 não trunca simplesmente os dígitos extras: como o terceiro decimal é 7, ele arredonda 19.987 para 19.99.'
          ),
          q(
            'O que acontece se você tentar aplicar o especificador inteiro :D4 em uma variável double, como double peso = 7.5; Console.WriteLine($"{peso:D4}");?',
            'Lança FormatException em tempo de execução, pois o especificador D é exclusivo para tipos inteiros',
            [
              'Imprime 0007.5000 automaticamente sem erro',
              'Converte a variável double para string vazia em tempo de compilação'
            ],
            'O especificador D (Decimal) só é suportado por tipos inteiros (int, long, etc.); números reais usam F, N ou P.'
          ),
          q(
            'Na expressão interpolada $"|{item,8}|", qual é o efeito da vírgula seguida de 8 positivo (sem dois-pontos)?',
            'Define largura mínima de 8 caracteres e alinha o conteúdo à direita preenchendo espaços à esquerda',
            [
              'Repete o texto da variável item 8 vezes seguidas',
              'Corta o texto para mostrar apenas o oitavo caractere'
            ],
            'Na sintaxe {expressao,alinhamento:formato}, a vírgula controla a largura do campo (positivo alinha à direita, negativo à esquerda).'
          ),
          o(
            'Ordene as instruções para declarar o código do pedido e o subtotal e imprimir "Pedido #0009 - R$ 45.50" em InvariantCulture:',
            [
              'using System.Globalization;',
              'int pedido = 9;',
              'double subtotal = 45.5;',
              'Console.WriteLine(string.Create(CultureInfo.InvariantCulture, $"Pedido #{pedido:D4} - R$ {subtotal:F2}"));'
            ],
            'Importamos System.Globalization, declaramos int e double e formatamos pedido com :D4 (0009) e subtotal com :F2 (45.50).'
          ),
          p(
            'Associe cada lacuna de formatação numérica (em InvariantCulture) ao resultado gerado:',
            [
              ['$"{7:D3}"', 'Inteiro preenchido com zeros à esquerda até 3 dígitos: 007'],
              ['$"{12.4:F2}"', 'Ponto fixo sem separador de milhar e 2 decimais: 12.40'],
              ['$"{1234.5:N2}"', 'Número com separador de milhar e 2 casas decimais: 1,234.50'],
              ['$"{0.25:P0}"', 'Multiplica por 100 e formata como porcentagem inteira (25%)']
            ],
            'Os especificadores D, F, N e P resolvem a quase totalidade das formatações numéricas em relatórios.'
          )
        ]
      },
      {
        id: 'cs-c01-u4-l5',
        title: 'Painéis e recibos formatados no console',
        subtitle: 'Revisão e desafio · Saída formatada',
        theory: 'Gerar recibos, logs e relatórios claros no console combina tudo o que vimos: Console.Write e WriteLine para controlar linhas, interpolação $"..." com chaves escapadas {{ }}, caminhos limpos com $@"...", tabulações \\t e especificadores como :F2 e :D4 para alinhar valores e códigos.',
        questions: [
          q(
            'Qual texto exato aparece na única linha impressa pelo trecho de monitoramento de lote abaixo?',
            '[Lote 005] Status: "Pronto"',
            [
              '[Lote 5] Status: \\"Pronto\\"',
              '[Lote 005]\\nStatus: "Pronto"'
            ],
            'Console.Write mantém a mesma linha, {lote:D3} gera 005 e \\" insere aspas duplas ao redor de Pronto.',
            'int lote = 5;\nConsole.Write($"[Lote {lote:D3}] ");\nConsole.WriteLine("Status: \\"Pronto\\"");'
          ),
          g(
            'Complete a interpolação para exibir chaves literais em torno da sigla PIX e formatar o valor com 2 casas decimais:',
            ['{{'],
            'Em uma string interpolada com $, dobramos a chave de abertura ({{) para imprimir { literal antes de PIX.',
            'double total = 89.9;\nConsole.WriteLine($"____PIX}} Total: {total:F2}");'
          ),
          t(
            'Qual caminho completo é impresso no console ao executar o trecho com string verbatim interpolada abaixo?',
            ['C:\\Cupons\\Loja012\\fechamento.txt'],
            'O prefixo $@ preserva as barras invertidas literalmente e avalia {loja:D3} como 012, gerando C:\\Cupons\\Loja012\\fechamento.txt.',
            'int loja = 12;\nConsole.WriteLine($@"C:\\Cupons\\Loja{loja:D3}\\fechamento.txt");'
          ),
          q(
            'Analise o código de geração de recibo abaixo. Em quantas linhas o texto final é distribuído no console?',
            '3 linhas: "CUPOM #01", depois "ITEM\\tVALOR" tabulado e por fim "Cafe\\t8.50" tabulado',
            [
              '4 linhas, porque cada chamada de Console.Write cria uma linha própria',
              '1 única linha contínua, porque \\n e WriteLine são ignorados após Write'
            ],
            'Os dois Write juntam "CUPOM #01" e o \\n quebra para a 2ª linha ("ITEM\\tVALOR"); o WriteLine seguinte abre a 3ª linha ("Cafe\\t8.50").',
            'Console.Write("CUPOM ");\nConsole.Write("#01\\n");\nConsole.WriteLine("ITEM\\tVALOR");\nConsole.WriteLine("Cafe\\t8.50");'
          ),
          q(
            'Qual expressão gera exatamente o texto: Arquivo "dados.json" salvo em C:\\App (sem erro de compilação)?',
            '@"Arquivo ""dados.json"" salvo em C:\\App"',
            [
              '@"Arquivo \\"dados.json\\" salvo em C:\\App"',
              '"Arquivo "dados.json" salvo em C:\\App"'
            ],
            'Com @, a barra de C:\\App permanece literal e as aspas internas precisam ser duplicadas como ""dados.json"".'
          ),
          q(
            'Um estudante escreveu Console.WriteLine("Total: {valor:F2}"); (sem $) para double valor = 30;. O que aparece na tela?',
            'Total: {valor:F2}',
            [
              'Total: 30.00',
              'Total: 30,00'
            ],
            'Sem o símbolo $ antes das aspas, nem a variável nem o especificador :F2 são avaliados: tudo é impresso literalmente.'
          ),
          o(
            'Ordene as instruções para montar e exibir um cabeçalho de log contendo "[0001] Exportando... Concluido!" em uma só linha seguido do caminho na linha de baixo:',
            [
              'int seq = 1;',
              'Console.Write($"[{seq:D4}] Exportando... ");',
              'Console.WriteLine("Concluido!");',
              'Console.WriteLine(@"Destino: C:\\Logs\\saida.log");'
            ],
            'Declaramos seq, usamos Write com :D4 para iniciar a linha, fechamos a 1ª linha com WriteLine("Concluido!") e imprimimos o caminho verbatim na 2ª.'
          ),
          p(
            'Relacione cada recurso de saída do C# ao problema prático que ele resolve em relatórios de console:',
            [
              ['Console.Write(...)', 'Compõe uma mesma linha em várias etapas sem quebrá-la antes da hora'],
              ['$"{preco:F2}"', 'Padroniza valores monetários com duas casas decimais'],
              ['$"{ticket:D5}"', 'Alinha códigos inteiros preenchendo zeros à esquerda (ex.: 00042)'],
              ['@"C:\\Relatorios\\dia.txt"', 'Escreve caminhos Windows sem precisar duplicar cada barra invertida']
            ],
            'Dominar saída, interpolação, escapes e formatação encerra a base essencial de mensagens em C#.'
          )
        ]
      }
    ]
  });
})();
