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

  const lang = 'java';
  const chId = 'java-c01';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: 'jv-c01-u1-l5',
        title: 'Do código-fonte ao bytecode na JVM',
        subtitle: 'Revisão e desafio · do .java ao bytecode na JVM',
        theory: 'Em um sistema de bilhetagem como Bilhete.java, o ciclo Java segue três etapas: você escreve o código-fonte (.java), compila com javac Bilhete.java para gerar o bytecode portátil (Bilhete.class) e executa com java Bilhete, quando a JVM valida e traduz esse bytecode para a CPU local.',
        questions: [
          q(
            'Ao compilar com sucesso o arquivo BilheteMetro.java usando javac, qual artefato intermediário é gravado no disco?',
            'BilheteMetro.class contendo bytecode portátil para a JVM',
            [
              'BilheteMetro.exe preso apenas ao sistema Windows local',
              'BilheteMetro.jar executando direto no hardware sem JVM'
            ],
            'O compilador javac traduz o código-fonte .java em um arquivo .class de bytecode independente de sistema operacional.'
          ),
          q(
            'Qual comando inicia corretamente na JVM a classe compilada a partir de CatracaTrem.java no diretório atual?',
            'java CatracaTrem',
            [
              'java CatracaTrem.class',
              'javac CatracaTrem'
            ],
            'O comando java recebe o nome da classe (CatracaTrem), sem a extensão .class; já javac serve apenas para compilar.'
          ),
          g(
            'Complete o comando de terminal que compila o código-fonte TotemRecarga.java para gerar seu bytecode:',
            ['javac'],
            'A ferramenta javac (Java Compiler) do JDK transforma o arquivo .java em TotemRecarga.class.',
            '____ TotemRecarga.java'
          ),
          t(
            'Qual texto exato a JVM imprime no console após compilar e rodar a classe ValidadorPasse abaixo?',
            ['Embarque liberado'],
            'Após javac gerar ValidadorPasse.class, java ValidadorPasse executa main e imprime Embarque liberado.',
            'public class ValidadorPasse {\n    public static void main(String[] args) {\n        System.out.println("Embarque liberado");\n    }\n}'
          ),
          q(
            'Por que o mesmo arquivo PainelLinha.class compilado no Linux consegue rodar sem recompilação em um servidor Windows?',
            'Porque cada sistema possui sua própria JVM, que traduz o mesmo bytecode para a máquina local',
            [
              'Porque o arquivo .class já contém código binário nativo de todas as CPUs existentes',
              'Porque o Windows converte automaticamente o arquivo .class de volta em .java antes de rodar'
            ],
            'O princípio Write Once, Run Anywhere funciona porque o bytecode é universal e a JVM específica de cada sistema faz a tradução final.'
          ),
          q(
            'Durante o desenvolvimento de TarifaOnibus.java, você esquece de fechar aspas em uma String. Em que etapa esse defeito é barrado?',
            'Na compilação com javac, antes mesmo de existir um arquivo TarifaOnibus.class atualizado',
            [
              'Somente quando o usuário final clica para abrir a JVM em produção',
              'No carregador de classes do JRE após o bytecode já ter sido salvo com sucesso'
            ],
            'Erros léxicos e sintáticos são detectados pelo compilador javac, impedindo a geração do bytecode.'
          ),
          o(
            'Ordene as etapas do ciclo clássico de construção e execução da classe AlertaTrilho:',
            [
              'Salvar o código-fonte legível no arquivo AlertaTrilho.java',
              'Executar javac AlertaTrilho.java para validar a sintaxe e gerar o bytecode',
              'Obter o arquivo portátil AlertaTrilho.class no diretório',
              'Invocar java AlertaTrilho para a JVM carregar e executar o programa'
            ],
            'O fluxo parte do fonte .java, passa pelo compilador javac, produz o bytecode .class e roda na JVM com o comando java.'
          ),
          p(
            'Associe cada elemento da plataforma Java ao seu papel no ciclo de execução:',
            [
              ['JDK', 'Kit completo com compilador javac, ferramentas e runtime para desenvolver'],
              ['JVM', 'Máquina virtual que carrega, verifica e executa o bytecode na plataforma'],
              ['Arquivo .java', 'Texto-fonte escrito pelo programador com classes e métodos legíveis'],
              ['Arquivo .class', 'Bytecode intermediário gerado na compilação e independente de sistema']
            ],
            'O desenvolvedor escreve .java usando o JDK, compila para .class e entrega esse bytecode para a JVM executar.'
          )
        ]
      }
    ],
    2: [
      {
        id: 'jv-c01-u2-l1',
        title: 'Verificando java e javac no terminal',
        subtitle: 'Apresentação · verificando java --version e javac --version',
        theory: 'Antes de codificar um caixa de farmácia, valide o ambiente no terminal: java --version confirma o runtime da JVM e javac --version confirma o compilador do JDK. Se java responde mas javac falha, há apenas um JRE ou o compilador não está acessível, impedindo transformar .java em .class.',
        questions: [
          q(
            'Ao preparar a máquina para o projeto CaixaFarmacia, qual comando verifica especificamente a versão do compilador Java instalado?',
            'javac --version',
            [
              'java --compiler',
              'jvm --version'
            ],
            'O executável do compilador chama-se javac, e a flag --version exibe sua versão exata na saída padrão.'
          ),
          q(
            'No notebook de um estagiário, java --version mostra OpenJDK 21.0.4, porém javac --version retorna comando não encontrado. O que isso indica?',
            'Há um runtime (JRE) acessível, mas o compilador do JDK não está instalado ou não está no PATH',
            [
              'O Java 21 aboliu o comando javac e agora compila apenas com java --build',
              'O computador está sem sistema operacional compatível com bytecode'
            ],
            'Ter java funcionando prova que o lançador da JVM existe, mas a ausência de javac mostra falta do JDK completo ou da pasta bin do JDK no PATH.'
          ),
          g(
            'Complete o comando moderno com traço duplo para consultar no terminal a versão da JVM ativa:',
            ['--version', '-version'],
            'java --version imprime na saída padrão a versão e a distribuição do runtime Java ativo.',
            'java ____'
          ),
          t(
            'Qual é o nome do executável (sem argumentos) que transforma arquivos .java em .class e deve responder ao teste de instalação do JDK?',
            ['javac'],
            'O compilador oficial incluído na pasta bin do JDK é o comando javac.'
          ),
          q(
            'Em um servidor de homologação, java --version aponta 11.0.22 enquanto javac --version aponta 21.0.3. Qual risco prático essa divergência traz?',
            'O código compilado no JDK 21 pode falhar ao rodar na JVM 11 com UnsupportedClassVersionError',
            [
              'A JVM 11 converte automaticamente o bytecode 21 sem qualquer restrição',
              'O comando javac 21 apaga o Java 11 do disco na primeira compilação'
            ],
            'Uma JVM mais antiga não executa bytecode gerado para uma versão maior do Java; ambos os comandos devem apontar para o mesmo JDK.'
          ),
          q(
            'Qual diferença prática existe entre rodar java --version (dois traços) e java -version (um traço) em versões modernas do JDK?',
            '--version escreve na saída padrão (stdout), enquanto -version escreve no fluxo de erro (stderr)',
            [
              '--version mostra a versão do JDK e -version desinstala o runtime atual',
              '--version exige permissão de administrador e -version roda como usuário comum'
            ],
            'No padrão POSIX adotado desde o Java 9, --version envia o texto para stdout, facilitando scripts de verificação.'
          ),
          o(
            'Ordene o roteiro rápido para validar no terminal se um JDK recém-instalado está pronto para compilar e rodar:',
            [
              'Abrir uma nova janela de terminal para carregar as variáveis do sistema',
              'Executar java --version para confirmar a versão do runtime da JVM',
              'Executar javac --version para confirmar o compilador na mesma versão',
              'Prosseguir para criar o primeiro arquivo .java somente após ambos coincidirem'
            ],
            'Abrir um novo terminal garante leitura do ambiente atualizado, e conferir java e javac evita conflitos de versão.'
          ),
          p(
            'Relacione cada saída ou comando de verificação ao diagnóstico correspondente:',
            [
              ['java --version', 'Exibe no stdout a versão do lançador da JVM e da distribuição ativa'],
              ['javac --version', 'Confirma a presença e a versão do compilador do JDK no terminal'],
              ['javac ausente com java ativo', 'Sinaliza ambiente apenas com JRE ou PATH sem o diretório bin do JDK'],
              ['javac 21 com java 17', 'Indica duas instalações misturadas no PATH com risco de erro de bytecode']
            ],
            'Testar ambos os executáveis garante que runtime e compilador pertencem à mesma instalação do JDK.'
          )
        ]
      },
      {
        id: 'jv-c01-u2-l2',
        title: 'Variáveis JAVA_HOME e PATH',
        subtitle: 'Prática guiada · papel de JAVA_HOME e PATH',
        theory: 'Em uma estação de desenvolvimento bancário, JAVA_HOME aponta para a pasta raiz do JDK instalado (como /opt/jdk-21), usada por ferramentas como Maven e Gradle. Já a variável PATH deve incluir a subpasta bin desse JDK para que os comandos java e javac funcionem de qualquer diretório.',
        questions: [
          q(
            'Para qual diretório exato a variável de ambiente JAVA_HOME deve apontar em uma instalação padrão do JDK 21?',
            'Para a pasta raiz da instalação do JDK, um nível acima da subpasta bin',
            [
              'Diretamente para o arquivo executável javac dentro de bin',
              'Para a pasta onde você salva os arquivos .java dos seus projetos'
            ],
            'JAVA_HOME representa a raiz do JDK, sem incluir o subdiretório bin no final.'
          ),
          q(
            'Qual subpasta do JDK precisa estar listada na variável PATH do sistema para que java e javac rodem de qualquer diretório?',
            'A subpasta bin localizada dentro de JAVA_HOME',
            [
              'A subpasta conf que guarda arquivos de propriedades',
              'A subpasta legal que armazena licenças dos módulos'
            ],
            'Os executáveis java, javac, javadoc e jar ficam dentro do diretório bin do JDK.'
          ),
          g(
            'Complete a referência Linux/macOS que adiciona os executáveis do JDK ao PATH aproveitando JAVA_HOME:',
            ['bin'],
            'Concatenar $JAVA_HOME/bin na frente do PATH faz o shell encontrar os binários do JDK escolhido primeiro.',
            'export PATH="$JAVA_HOME/____:$PATH"'
          ),
          t(
            'Qual é o nome tradicional (em letras maiúsculas com sublinhado) da variável de ambiente lida por Maven, Gradle e IDEs para localizar a raiz do JDK?',
            ['JAVA_HOME'],
            'Ferramentas do ecossistema Java consultam a variável padronizada JAVA_HOME para achar o JDK ativo.'
          ),
          q(
            'Um desenvolvedor configurou JAVA_HOME para o JDK 21 e colocou $JAVA_HOME/bin no final do PATH, mas /usr/bin já tinha um Java 8 antigo. O que ocorre ao digitar java --version?',
            'O sistema encontra primeiro o Java 8 em /usr/bin, pois percorre o PATH da esquerda para a direita',
            [
              'O terminal ignora o PATH sempre que JAVA_HOME está definida no sistema',
              'Os dois Javas são executados simultaneamente e somam suas versões'
            ],
            'O sistema operacional usa o primeiro executável compatível encontrado na ordem do PATH; por isso $JAVA_HOME/bin deve vir antes.'
          ),
          q(
            'Após alterar JAVA_HOME nas configurações do Windows, por que um terminal PowerShell que já estava aberto continua mostrando o caminho antigo?',
            'Porque cada processo de terminal herda uma cópia das variáveis no momento em que é aberto',
            [
              'Porque o Java exige formatar a partição do disco sempre que JAVA_HOME muda',
              'Porque variáveis de ambiente só funcionam dentro de arquivos .class compilados'
            ],
            'Terminais abertos não recarregam automaticamente variáveis globais do sistema; basta abrir uma nova sessão.'
          ),
          o(
            'Ordene os passos para configurar limpa e reutilizavelmente o JDK 21 nas variáveis do sistema:',
            [
              'Localizar o caminho absoluto da pasta raiz onde o JDK 21 foi instalado',
              'Definir a variável JAVA_HOME apontando para essa pasta raiz sem o sufixo bin',
              'Inserir a entrada referente a JAVA_HOME/bin no início da variável PATH',
              'Abrir um novo terminal e validar com java --version e javac --version'
            ],
            'Primeiro define-se JAVA_HOME na raiz, depois referencia-se sua pasta bin com prioridade no PATH e valida-se em nova sessão.'
          ),
          p(
            'Associe cada caminho ou variável de ambiente à sua responsabilidade no setup Java:',
            [
              ['JAVA_HOME', 'Indica a pasta raiz do JDK para ferramentas como Gradle, Maven e Tomcat'],
              ['PATH', 'Lista os diretórios onde o terminal procura comandos digitados sem caminho'],
              ['Subpasta bin', 'Guarda os utilitários executáveis como java, javac, jar e javadoc'],
              ['Nova janela de shell', 'Recarrega as variáveis de ambiente recém-salvas no sistema operacional']
            ],
            'Separar o papel de JAVA_HOME (raiz) e de PATH (binários) evita quase todos os erros iniciais de configuração.'
          )
        ]
      },
      {
        id: 'jv-c01-u2-l3',
        title: 'Escolhendo uma distribuição JDK LTS',
        subtitle: 'Aprofundamento · escolha de distribuição JDK LTS como Java 21',
        theory: 'Ao implantar um portal logístico corporativo, prefira versões LTS (Long-Term Support), como Java 17 ou Java 21, que recebem correções de segurança por anos. Distribuições como Eclipse Temurin, Oracle JDK e Amazon Corretto seguem o padrão OpenJDK, diferindo apenas em suporte e licença.',
        questions: [
          q(
            'Ao escolher o JDK para um sistema hospitalar que ficará anos em operação, o que significa optar por uma versão LTS como o Java 21?',
            'Que essa versão recebe atualizações de estabilidade e segurança por longo prazo',
            [
              'Que essa versão roda apenas em computadores sem conexão de rede local',
              'Que o código-fonte dispensa o uso de classes e do método main'
            ],
            'LTS significa Long-Term Support: versões de suporte estendido recomendadas para sistemas corporativos duradouros.'
          ),
          q(
            'Qual afirmação descreve corretamente distribuições como Eclipse Temurin, Amazon Corretto, Azul Zulu e Microsoft Build of OpenJDK?',
            'Todas são construídas a partir do código-base OpenJDK e executam o mesmo padrão da linguagem Java',
            [
              'Cada uma exige uma sintaxe própria incompatível com arquivos .java das demais',
              'Apenas uma delas possui compilador javac, enquanto as outras são editores de texto'
            ],
            'O código-base de referência é o OpenJDK; as distribuições certificadas entregam compatibilidade total com o padrão Java SE.'
          ),
          g(
            'Complete a sigla em inglês usada para identificar lançamentos Java de suporte prolongado, como Java 17 e Java 21:',
            ['LTS'],
            'Versões marcadas como LTS (Long-Term Support) contam com anos de manutenção e patches de segurança.',
            'Java 21 (____ - Long-Term Support)'
          ),
          t(
            'Entre as versões Java 19, Java 20 e Java 21, digite apenas o número daquela que é uma versão LTS consolidada:',
            ['21'],
            'Java 17 e Java 21 são marcos LTS; Java 19 e 20 foram lançamentos semestrais de suporte curto.'
          ),
          q(
            'Com qual cadência temporal a plataforma Java publica novas versões principais (feature releases) atualmente?',
            'A cada 6 meses, geralmente em março e setembro, com versões LTS espaçadas em anos',
            [
              'Uma única vez a cada 10 anos, sem versões intermediárias',
              'Semanalmente, obrigando a reescrever o método main toda segunda-feira'
            ],
            'Desde o Java 10, o OpenJDK segue um calendário previsível de lançamentos semestrais, intercalando versões regulares e LTS.'
          ),
          q(
            'O que o selo de certificação Java TCK / AqAvit em uma distribuição como Eclipse Temurin garante para sua equipe?',
            'Que o pacote passou em suítes rigorosas de conformidade e qualidade compatíveis com a especificação Java SE',
            [
              'Que o compilador ignora erros de ponto e vírgula automaticamente',
              'Que o programa rodará sem ocupar memória RAM na máquina virtual'
            ],
            'O TCK (Technology Compatibility Kit) certifica que a distribuição cumpre fielmente a especificação oficial do Java SE.'
          ),
          o(
            'Ordene o processo consciente de seleção e adoção de um JDK para um novo projeto de equipe:',
            [
              'Definir uma versão LTS estável para o projeto, como o Java 21',
              'Escolher uma distribuição OpenJDK confiável compatível com a arquitetura da máquina',
              'Instalar o pacote e alinhar JAVA_HOME e PATH em todas as estações do time',
              'Documentar a versão exigida no guia do repositório para evitar divergências'
            ],
            'Padronizar versão LTS, distribuição, variáveis e documentação garante builds reprodutíveis em toda a equipe.'
          ),
          p(
            'Conecte cada conceito de distribuição Java à sua definição precisa:',
            [
              ['OpenJDK', 'Projeto aberto de referência que implementa oficialmente a plataforma Java SE'],
              ['Versão LTS', 'Lançamento com anos de atualizações de segurança, ideal para produção'],
              ['Versão não-LTS', 'Lançamento semestral suportado por seis meses até a versão seguinte sair'],
              ['Eclipse Temurin', 'Distribuição gratuita e certificada do OpenJDK mantida pela Fundação Eclipse']
            ],
            'Conhecer o modelo OpenJDK e o ciclo LTS permite escolher um runtime seguro e sem surpresas de licenciamento.'
          )
        ]
      },
      {
        id: 'jv-c01-u2-l4',
        title: 'Organizando uma pasta de projeto limpa',
        subtitle: 'Aplicação · organizando pasta de projeto limpa',
        theory: 'Para manter o projeto de uma clínica organizado desde o início, separe o código-fonte em src/ e os bytecodes compilados em out/ ou bin/ usando javac -d out src/Triagem.java. Assim os arquivos .class não poluem a pasta de edição e você executa com java -cp out Triagem de forma limpa.',
        questions: [
          q(
            'No projeto da clínica TriagemClinica, qual opção do comando javac envia os arquivos .class gerados para uma pasta separada chamada out?',
            '-d out',
            [
              '-o src',
              '--clean out'
            ],
            'A flag -d (destination directory) instrui o javac a gravar os arquivos .class compilados no diretório de destino informado.'
          ),
          q(
            'Se Triagem.class foi compilado dentro da subpasta out/, qual comando executa essa classe a partir da raiz do projeto?',
            'java -cp out Triagem',
            [
              'java src/Triagem.java -d out',
              'java out/Triagem.class'
            ],
            'A opção -cp (classpath) informa à JVM em qual pasta procurar os arquivos .class, seguida pelo nome da classe Triagem.'
          ),
          g(
            'Complete o comando para compilar src/AgendaMedica.java salvando o bytecode na pasta bin:',
            ['-d'],
            'javac -d bin cria ou usa o diretório bin para depositar AgendaMedica.class sem sujar a pasta src.',
            'javac ____ bin src/AgendaMedica.java'
          ),
          t(
            'Qual abreviação de duas letras (precedida por traço, como -xx) define o classpath ao rodar o comando java apontando para a pasta out?',
            ['-cp'],
            'A opção -cp (ou -classpath / --class-path) indica onde a JVM localiza as classes compiladas.',
            'java -cp out PainelSenhas'
          ),
          q(
            'Por que projetos profissionais não costumam enviar a pasta out/ ou bin/ (cheia de arquivos .class) para o controle de versão Git?',
            'Porque os .class são artefatos derivados que qualquer colega regenera a partir de src/ com javac',
            [
              'Porque o Git proíbe por lei qualquer pasta com três letras no nome',
              'Porque arquivos .class apagam o código-fonte .java quando copiados de máquina'
            ],
            'Apenas o código-fonte (.java) e arquivos de configuração são versionados; binários compilados são gerados no build.'
          ),
          q(
            'O que acontece quando você roda javac -d out src/FichaPaciente.java e a pasta out ainda não existe no projeto?',
            'Nas versões atuais do JDK, o próprio javac cria o diretório out e grava FichaPaciente.class nele',
            [
              'O javac apaga a pasta src por segurança e encerra o terminal',
              'O arquivo FichaPaciente.class é gravado na área de trabalho do sistema'
            ],
            'O compilador javac cria automaticamente a hierarquia de diretórios indicada em -d quando o caminho pai é válido.'
          ),
          o(
            'Ordene os passos para estruturar, compilar separadamente e rodar o utilitário PainelExames:',
            [
              'Criar a pasta do projeto contendo a subpasta src para os arquivos-fonte',
              'Salvar o código da classe pública em src/PainelExames.java',
              'Compilar da raiz com javac -d out src/PainelExames.java',
              'Executar da raiz com java -cp out PainelExames'
            ],
            'Isolar fontes em src e bytecodes em out via -d e -cp mantém o workspace limpo desde o primeiro programa.'
          ),
          p(
            'Relacione cada pasta ou argumento de linha de comando à sua função na organização do projeto:',
            [
              ['Pasta src/', 'Armazena exclusivamente os arquivos de código-fonte .java editáveis'],
              ['Pasta out/', 'Recebe os arquivos .class gerados pela compilação, separados do fonte'],
              ['Flag -d', 'Define no javac o diretório de destino onde o bytecode será salvo'],
              ['Flag -cp', 'Indica ao comando java o caminho onde a JVM deve buscar as classes']
            ],
            'Essa estrutura espelha a organização usada depois por IDEs e ferramentas como Maven e Gradle.'
          )
        ]
      },
      {
        id: 'jv-c01-u2-l5',
        title: 'Diagnóstico completo do ambiente JDK',
        subtitle: 'Revisão e desafio · instalação, variáveis e workspace Java',
        theory: 'Um ambiente Java pronto para produção combina três pilares: um JDK LTS (como Java 21) alinhado entre java e javac, variáveis JAVA_HOME (raiz do JDK) e PATH (pasta bin) consistentes, além de um diretório de trabalho com src/ e pasta de saída -d separada para compilar e rodar sem conflitos.',
        questions: [
          q(
            'Em uma revisão do projeto EstoqueGraos, qual combinação de comandos compila src/Silo.java para build/ e executa a classe em seguida?',
            'javac -d build src/Silo.java seguido de java -cp build Silo',
            [
              'java -d build src/Silo.java seguido de javac -cp build Silo.class',
              'javac -cp src Silo seguido de java -d build Silo.java'
            ],
            'Compila-se com javac -d <destino> <fonte.java> e executa-se com java -cp <destino> <NomeDaClasse>.'
          ),
          q(
            'Qual cenário representa uma estação de trabalho 100% consistente para desenvolver com Java 21 LTS?',
            'JAVA_HOME na raiz do JDK 21, JAVA_HOME/bin no início do PATH e java/javac reportando 21.x',
            [
              'JAVA_HOME apontando para src/, PATH vazio e apenas o JRE 8 respondendo no terminal',
              'JAVA_HOME apontando para javac.exe e java --version retornando versão diferente de javac'
            ],
            'Raiz do JDK em JAVA_HOME, subpasta bin priorizada no PATH e versões idênticas em java e javac confirmam o setup correto.'
          ),
          g(
            'Complete o comando para executar a classe BalancaSilo cujo arquivo BalancaSilo.class está na pasta build:',
            ['-cp', '-classpath', '--class-path'],
            'A flag -cp (ou -classpath) aponta para build para que a JVM carregue BalancaSilo.class.',
            'java ____ build BalancaSilo'
          ),
          t(
            'Se o JDK 21 está instalado em /opt/jdk-21 e seus executáveis estão em /opt/jdk-21/bin, qual caminho exato deve ser atribuído a JAVA_HOME?',
            ['/opt/jdk-21'],
            'JAVA_HOME recebe sempre o diretório raiz do JDK (/opt/jdk-21), sem /bin.'
          ),
          q(
            'Ao rodar java -cp out ControleSafra, a JVM exibe Could not find or load main class ControleSafra. Qual causa abaixo explica esse erro?',
            'O arquivo ControleSafra.class ainda não foi gerado dentro da pasta out com javac -d out',
            [
              'Faltou escrever a extensão .class no final de java -cp out ControleSafra.class',
              'A variável JAVA_HOME proíbe nomes de classes com letras maiúsculas'
            ],
            'Quando o .class não existe no diretório listado em -cp, o classloader da JVM não encontra a classe solicitada.'
          ),
          q(
            'Para que serve manter os arquivos .java em src/ separados dos .class em out/ ao trabalhar em equipe?',
            'Facilita limpar builds antigos apagando apenas out/ sem risco de perder código-fonte',
            [
              'Faz o arquivo .java executar sem precisar de JVM instalada na máquina',
              'Dobra a quantidade de núcleos físicos do processador durante a compilação'
            ],
            'Com diretórios separados, basta remover out/ para fazer um clean build seguro e manter o controle de versão enxuto.'
          ),
          o(
            'Ordene o checklist completo de preparo de uma máquina limpa até a primeira execução organizada de PainelSafra:',
            [
              'Instalar uma distribuição OpenJDK 21 LTS compatível com o sistema',
              'Configurar JAVA_HOME na raiz do JDK e adicionar JAVA_HOME/bin ao PATH',
              'Validar no terminal novo que java --version e javac --version reportam Java 21',
              'Compilar src/PainelSafra.java com -d out e rodar a classe com java -cp out PainelSafra'
            ],
            'Da instalação LTS às variáveis de ambiente, validação de versão e build em pasta isolada, esse fluxo cobre toda a Unidade 2.'
          ),
          p(
            'Emparelhe cada problema comum de ambiente com a ação corretiva adequada:',
            [
              ['javac não reconhecido', 'Instalar um JDK completo e incluir sua subpasta bin na variável PATH'],
              ['Versão antiga no java', 'Mover JAVA_HOME/bin para antes de outros diretórios antigos no PATH'],
              ['Arquivos .class misturados em src/', 'Recompilar usando javac -d out e apagar os .class antigos da pasta src'],
              ['Mudança em JAVA_HOME ignorada', 'Fechar o terminal antigo e abrir uma nova sessão para reler o ambiente']
            ],
            'Diagnosticar rapidamente PATH, JAVA_HOME e diretórios de saída economiza horas no dia a dia com Java.'
          )
        ]
      }
    ],
    3: [
      {
        id: 'jv-c01-u3-l1',
        title: 'Declarando a primeira classe Java',
        subtitle: 'Apresentação · declaração public class App',
        theory: 'Em Java, todo código vive dentro de um tipo, como public class PainelSolar. A palavra-chave class cria o molde do componente, public permite acesso externo pela JVM e a convenção PascalCase inicia cada palavra com maiúscula, modelando entidades reais como PedidoCafe ou CatracaMuseu.',
        questions: [
          q(
            'Qual cabeçalho declara corretamente e seguindo a convenção idiomática do Java uma classe pública para representar um painel solar?',
            'public class PainelSolar',
            [
              'class public painel_solar',
              'Public Class painelsolar()'
            ],
            'Em Java, palavras-chave como public e class são minúsculas, classes não usam parênteses no cabeçalho e seguem PascalCase.'
          ),
          q(
            'Por que palavras reservadas como public e class não podem ser escritas como Public ou CLASS em um programa Java?',
            'Porque o Java é case-sensitive e reconhece suas palavras-chave exclusivamente em letras minúsculas',
            [
              'Porque letras maiúsculas só são permitidas dentro de comentários no Java',
              'Porque o compilador javac converte todo o arquivo para minúsculas antes de ler'
            ],
            'Java diferencia maiúsculas de minúsculas: todas as keywords da linguagem (public, class, static, void) são estritamente minúsculas.'
          ),
          g(
            'Complete a palavra-chave que define o bloco estrutural da entidade BombaIrrigacao:',
            ['class'],
            'A palavra reservada class declara um novo tipo de classe em Java.',
            'public ____ BombaIrrigacao {\n}'
          ),
          t(
            'Seguindo a convenção PascalCase, como deve ser escrito o identificador único de uma classe que junta as palavras "pedido" e "expresso" (sem acentos nem espaços)?',
            ['PedidoExpresso'],
            'Em PascalCase (UpperCamelCase), cada palavra começa com letra maiúscula e não há espaços ou sublinhados: PedidoExpresso.'
          ),
          q(
            'Qual dos identificadores abaixo é PROIBIDO pelo compilador Java como nome de uma classe?',
            '2ViaBoleto',
            [
              'SegundaViaBoleto',
              'Boleto2Via'
            ],
            'Identificadores em Java podem conter dígitos, mas jamais podem começar com um número como em 2ViaBoleto.'
          ),
          q(
            'Qual é o efeito do modificador public na declaração public class CatracaMuseu?',
            'Torna a classe visível sem restrição de pacote, permitindo acesso externo inclusive pelo lançador',
            [
              'Obriga todos os dados da classe a serem gravados em nuvem pública automaticamente',
              'Impede que a classe possua métodos ou comentários internos'
            ],
            'O modificador de acesso public expõe o tipo para qualquer outra classe ou pacote da aplicação.'
          ),
          o(
            'Ordene os tokens que formam uma declaração mínima válida e vazia da classe pública SensorChuva:',
            [
              'Modificador de visibilidade public',
              'Palavra reservada class',
              'Identificador em PascalCase SensorChuva',
              'Par de chaves { } delimitando o corpo da classe'
            ],
            'A sintaxe segue a sequência: modificador (public) -> keyword (class) -> nome (SensorChuva) -> corpo ({ }).'
          ),
          p(
            'Associe cada parte de public class RelogioPonto { } ao seu significado na linguagem Java:',
            [
              ['public', 'Modificador que libera visibilidade irrestrita para a classe'],
              ['class', 'Palavra-chave que declara um novo tipo ou molde no código'],
              ['RelogioPonto', 'Identificador escolhido pelo autor seguindo a convenção PascalCase'],
              ['{ }', 'Bloco que agrupa membros, métodos e estruturas pertencentes à classe']
            ],
            'Compreender cada token do cabeçalho evita decorar código sem saber o papel de cada palavra.'
          )
        ]
      },
      {
        id: 'jv-c01-u3-l2',
        title: 'Correspondência entre classe public e arquivo',
        subtitle: 'Prática guiada · classe public e nome exato do arquivo .java',
        theory: 'O compilador javac exige que toda classe declarada como public tenha exatamente o mesmo nome do seu arquivo, diferenciando maiúsculas e minúsculas: public class ReciboLuz deve ficar em ReciboLuz.java. Se o arquivo se chamar reciboluz.java, a compilação falha imediatamente com erro.',
        questions: [
          q(
            'Em qual nome de arquivo exato você deve salvar o código que declara public class ReciboEnergia?',
            'ReciboEnergia.java',
            [
              'reciboenergia.java',
              'Recibo_Energia.class'
            ],
            'Toda classe top-level marcada como public deve residir em um arquivo .java com grafia e capitalização idênticas.'
          ),
          q(
            'O arquivo NotaFiscal.java contém public class Notafiscal { } (com "f" minúsculo). O que ocorre ao rodar javac NotaFiscal.java?',
            'O compilador interrompe com erro informando que Notafiscal é public e deveria estar em Notafiscal.java',
            [
              'O javac renomeia sozinho o arquivo no disco para Notafiscal.java e prossegue',
              'A compilação funciona porque o Java ignora maiúsculas em nomes de arquivos'
            ],
            'Para o javac, NotaFiscal e Notafiscal são nomes diferentes; a correspondência da classe public com o arquivo é exata.'
          ),
          g(
            'O código abaixo está salvo no arquivo CupomPedagio.java. Complete o identificador da classe para que a compilação funcione:',
            ['CupomPedagio'],
            'Como o arquivo se chama CupomPedagio.java e a classe é public, seu nome precisa ser exatamente CupomPedagio.',
            'public class ____ {\n}'
          ),
          t(
            'Quantas classes de nível superior (top-level) declaradas com o modificador public podem coexistir dentro de um único arquivo AlertaFrota.java?',
            ['1', 'uma'],
            'Como cada classe public exige que o arquivo tenha seu próprio nome exato, um arquivo .java comporta no máximo 1 classe public.'
          ),
          q(
            'É permitido declarar uma segunda classe auxiliar sem a palavra public (ex.: class ItemRota) dentro de RotaEntrega.java junto com public class RotaEntrega?',
            'Sim, desde que apenas RotaEntrega seja public, embora em projetos reais prefira-se um arquivo por classe',
            [
              'Não, o javac aceita no máximo um par de chaves por arquivo .java em qualquer situação',
              'Sim, e ambas podem ser marcadas como public dentro de RotaEntrega.java'
            ],
            'Java permite classes auxiliares sem public no mesmo arquivo, mas somente uma classe public cujo nome bate com o arquivo.'
          ),
          q(
            'Se um colega renomear MapaAssentos.java para Principal.java no explorador de pastas sem editar public class MapaAssentos lá dentro, como corrigir?',
            'Alinhar os dois nomes: voltar o arquivo para MapaAssentos.java ou mudar a classe para public class Principal',
            [
              'Apagar a palavra class de dentro do arquivo Principal.java',
              'Trocar a extensão do arquivo fonte de .java para .class manualmente'
            ],
            'Nome da classe pública e nome base do arquivo .java devem sempre coincidir letra por letra.'
          ),
          o(
            'Ordene os passos para criar e compilar sem erro de nomenclatura a classe pública GuicheCinema:',
            [
              'Criar no diretório src um arquivo chamado exatamente GuicheCinema.java',
              'Escrever no arquivo a declaração public class GuicheCinema com a mesma capitalização',
              'Fechar o bloco da classe com chaves balanceadas e salvar o arquivo',
              'Executar javac src/GuicheCinema.java para produzir GuicheCinema.class'
            ],
            'Garantir igualdade exata entre GuicheCinema.java e public class GuicheCinema evita o erro clássico de arquivo na compilação.'
          ),
          p(
            'Relacione cada situação de arquivo e declaração ao comportamento do compilador javac:',
            [
              ['public class Voo em Voo.java', 'Compila normalmente e gera o arquivo de bytecode Voo.class'],
              ['public class Voo em voo.java', 'Falha na compilação por divergência entre V maiúsculo e v minúsculo'],
              ['Duas classes public no mesmo .java', 'Gera erro porque apenas uma classe pública pode dar nome ao arquivo'],
              ['class Trecho sem public em Voo.java', 'Compila junto e gera um segundo bytecode separado chamado Trecho.class']
            ],
            'Cada classe compilada gera seu próprio .class, mas a regra de um único public por arquivo mantém o projeto previsível.'
          )
        ]
      },
      {
        id: 'jv-c01-u3-l3',
        title: 'Chaves de bloco e ponto e vírgula',
        subtitle: 'Aprofundamento · delimitadores {} e ; na estrutura da classe',
        theory: 'Na gramática do Java, chaves { e } delimitam o início e o fim de blocos — como o corpo de uma classe Estufa ou de seus métodos —, sempre em pares balanceados. Já o ponto e vírgula (;) encerra cada instrução executável individual; cabeçalhos de classe nunca levam ; antes de abrir {.',
        questions: [
          q(
            'No trecho abaixo da classe EstufaMorango, qual erro estrutural impedirá a compilação?',
            'Falta o ponto e vírgula (;) ao final da instrução System.out.println("Umidade 70%")',
            [
              'Falta um ponto e vírgula logo depois de public class EstufaMorango',
              'As chaves de main deveriam ser substituídas por colchetes [ ]'
            ],
            'Toda instrução executável em Java deve terminar obrigatoriamente com ponto e vírgula (;).',
            'public class EstufaMorango {\n    public static void main(String[] args) {\n        System.out.println("Umidade 70%")\n    }\n}'
          ),
          q(
            'Ao compilar PainelCaldeira.java, o javac aponta "reached end of file while parsing". Qual costuma ser a causa direta dessa mensagem?',
            'Uma chave de abertura { ficou sem sua respectiva chave de fechamento } antes do fim do arquivo',
            [
              'O arquivo .java foi salvo com menos de 100 linhas de código',
              'O nome da classe contém mais de duas sílabas em português'
            ],
            'Quando falta fechar um bloco com }, o analisador sintático chega ao fim do arquivo ainda esperando encerrar a estrutura aberta.'
          ),
          g(
            'Complete o símbolo obrigatório que encerra a instrução de saída na classe SireneTurno:',
            [';'],
            'Chamadas de método como System.out.println(...) são instruções e terminam com ponto e vírgula (;).',
            'public class SireneTurno {\n    public static void main(String[] args) {\n        System.out.println("Troca de equipe")____\n    }\n}'
          ),
          t(
            'Quantas chaves de fechamento } existem ao todo em uma classe simples válida que contém apenas o cabeçalho da classe e um método main vazio?',
            ['2', 'duas'],
            'São 2 chaves de fechamento }: uma encerra o bloco do método main e a outra encerra o bloco da classe CabinePedagio.',
            'public class CabinePedagio {\n    public static void main(String[] args) {\n    }\n}'
          ),
          q(
            'O que acontece com a indentação (espaços no início das linhas) quando o javac compila a classe MedidorVazao?',
            'O compilador usa chaves e ponto e vírgula para entender a estrutura; a indentação serve para leitura humana',
            [
              'O Java define blocos pela quantidade de espaços, dispensando chaves como no Python',
              'Qualquer linha com quatro espaços de recuo é ignorada como comentário'
            ],
            'Em Java, blocos são definidos por { } e instruções por ;, mas indentar consistentemente é essencial para legibilidade.'
          ),
          q(
            'Qual destas linhas de uma classe Java NUNCA deve terminar com ponto e vírgula logo antes do seu bloco de código?',
            'O cabeçalho do método public static void main(String[] args) que possui corpo { }',
            [
              'Uma chamada System.out.println("Ok") dentro do main',
              'Uma declaração de variável int lotes = 5 dentro do main'
            ],
            'Colocar ; logo após main(String[] args) impediria a definição normal do corpo do método e causaria erro de compilação.'
          ),
          o(
            'Ordene de cima para baixo as linhas de FechaduraCofre.java para que os blocos { } e o delimitador ; fiquem balanceados:',
            [
              'public class FechaduraCofre {',
              'public static void main(String[] args) {',
              'System.out.println("Cofre trancado");',
              '} // fecha o bloco do main',
              '} // fecha o bloco da classe FechaduraCofre'
            ],
            'O bloco interno aberto pelo main deve ser fechado antes do bloco externo da classe, e a instrução interna leva ponto e vírgula.'
          ),
          p(
            'Associe cada delimitador da sintaxe Java à sua responsabilidade exata no código:',
            [
              ['Chave de abertura {', 'Inicia o escopo do corpo de uma classe, método ou bloco de controle'],
              ['Chave de fechamento }', 'Encerra o bloco mais interno atualmente aberto, mantendo o par balanceado'],
              ['Ponto e vírgula ;', 'Finaliza uma instrução executável ou declaração simples de variável'],
              ['Parênteses ( )', 'Envolvem a lista de parâmetros de um método ou argumentos de uma chamada']
            ],
            'Dominar onde usar { }, ( ) e ; elimina a grande maioria dos erros de compilação nos primeiros programas.'
          )
        ]
      },
      {
        id: 'jv-c01-u3-l4',
        title: 'Comentários de linha, bloco e Javadoc',
        subtitle: 'Aplicação · comentários //, /* */ e Javadoc /** */',
        theory: 'Em sistemas reais, comentários registram intenções sem afetar o bytecode: // ignora o restante da linha, /* ... */ cobre múltiplas linhas de notas internas e /** ... */ define documentação Javadoc antes de classes e métodos, permitindo que a ferramenta javadoc gere páginas HTML da API.',
        questions: [
          q(
            'Qual formato de comentário acima de public class CalculadoraFrete é reconhecido pela ferramenta oficial javadoc para gerar documentação HTML?',
            '/** Calcula tarifas de transporte rodoviário. */',
            [
              '/* Calcula tarifas de transporte rodoviário. */',
              '// Calcula tarifas de transporte rodoviário.'
            ],
            'Comentários Javadoc começam especificamente com barra e dois asteriscos (/**) e terminam com */.'
          ),
          q(
            'Analise a classe PlacarQuadra abaixo. Quantas linhas serão impressas no console quando o programa rodar?',
            'Apenas 1 linha: Fim de jogo',
            [
              'Todas as 4 linhas de texto na tela',
              '2 linhas: Aquecimento e Fim de jogo'
            ],
            'A primeira instrução está comentada com // e as duas seguintes estão dentro de /* ... */; somente a última é compilada e executada.',
            'public class PlacarQuadra {\n    public static void main(String[] args) {\n        // System.out.println("Aquecimento");\n        /* System.out.println("Primeiro tempo");\n           System.out.println("Intervalo"); */\n        System.out.println("Fim de jogo");\n    }\n}'
          ),
          g(
            'Complete a abertura do comentário Javadoc que documenta a classe LeitorCracha para geração de API:',
            ['/**'],
            'O delimitador /** inicia um bloco Javadoc associado à declaração imediatamente abaixo.',
            '____\n * Valida o acesso de colaboradores na portaria.\n */\npublic class LeitorCracha {\n}'
          ),
          t(
            'Quais dois caracteres iniciam um comentário de linha única em Java, fazendo o compilador ignorar tudo até a quebra de linha?',
            ['//'],
            'Duas barras seguidas (//) marcam um comentário de linha única em Java.'
          ),
          q(
            'O que acontece com os comentários // e /* */ do arquivo FolhaPonto.java quando o javac gera o bytecode FolhaPonto.class?',
            'São descartados pelo compilador e não aumentam nem lentificam a execução do bytecode na JVM',
            [
              'São impressos automaticamente no terminal antes do método main iniciar',
              'Ficam criptografados como variáveis String obrigatórias na memória RAM'
            ],
            'Comentários existem apenas para humanos e ferramentas de documentação; o compilador os ignora na geração de instruções de bytecode.'
          ),
          q(
            'Qual erro de sintaxe ocorre se você tentar aninhar um bloco /* interno */ dentro de outro bloco /* externo */ em Java?',
            'O primeiro */ encontrado já fecha o comentário externo, deixando o restante solto e quebrando a compilação',
            [
              'O Java conta níveis infinitos de /* */ aninhados sem qualquer problema',
              'O comentário aninhado transforma a classe inteira em um pacote público'
            ],
            'Comentários /* ... */ não suportam aninhamento: o primeiro */ encerra o bloco imediatamente.'
          ),
          o(
            'Ordene os trechos do arquivo BombaCombustivel.java do comentário de documentação externo até o comentário de linha interno:',
            [
              '/** Controla o abastecimento do posto. */',
              'public class BombaCombustivel {',
              'public static void main(String[] args) {',
              '// Exibe status inicial do bico',
              'System.out.println("Bico 1 pronto"); } }'
            ],
            'O Javadoc antecede a classe que ele descreve, enquanto comentários // explicam intenções pontuais dentro dos métodos.'
          ),
          p(
            'Associe cada tipo de comentário ou ferramenta ao seu uso adequado em projetos Java:',
            [
              ['// texto', 'Nota curta que vale apenas até o final da linha atual'],
              ['/* texto */', 'Comentário comum que pode abranger várias linhas seguidas'],
              ['/** texto */', 'Bloco estruturado de documentação posicionado antes de classes e métodos'],
              ['Comando javadoc', 'Utilitário do JDK que lê blocos /** */ e exporta páginas HTML da API']
            ],
            'Escolher entre //, /* */ e /** */ mantém o código limpo para colegas e documentável para consumidores da API.'
          )
        ]
      },
      {
        id: 'jv-c01-u3-l5',
        title: 'Anatomia completa de um arquivo .java',
        subtitle: 'Revisão e desafio · estrutura, arquivo, blocos e documentação',
        theory: 'Um arquivo-fonte bem formado, como EscalaVoo.java, une documentação Javadoc /** ... */ no topo, a declaração public class EscalaVoo idêntica ao nome do arquivo, chaves { } perfeitamente balanceadas, comentários claros e instruções encerradas por ponto e vírgula (;), compilando sem avisos.',
        questions: [
          q(
            'Analise o código pretendido para EscalaVoo.java abaixo. Por que ele NÃO compila da forma como está escrito?',
            'Porque existe um ponto e vírgula indevido entre EscalaVoo e a chave de abertura {',
            [
              'Porque comentários Javadoc não podem aparecer antes de public class',
              'Porque o texto "Portao B12" contém algarismos numéricos'
            ],
            'Cabeçalhos de declaração de classe (public class EscalaVoo) abrem diretamente com {, nunca com ; antes da chave.',
            '/** Exibe o portão de embarque. */\npublic class EscalaVoo; {\n    public static void main(String[] args) {\n        System.out.println("Portao B12");\n    }\n}'
          ),
          q(
            'Se o arquivo TermometroForno.java compila sem erros e contém public class TermometroForno mais um bloco Javadoc, qual arquivo o javac grava no disco?',
            'Apenas TermometroForno.class, pois o Javadoc não gera arquivo próprio durante o comando javac',
            [
              'TermometroForno.html e TermometroForno.exe ao mesmo tempo',
              'Nenhum arquivo, pois classes com Javadoc só rodam com o comando javadoc'
            ],
            'O comando javac gera o bytecode TermometroForno.class; páginas HTML só são geradas se você invocar a ferramenta javadoc.'
          ),
          g(
            'Complete o fechamento do comentário de bloco na classe AlertaBarragem para destravar a compilação:',
            ['*/'],
            'Todo comentário iniciado com /* deve ser encerrado com */, caso contrário engole o restante do código até o fim do arquivo.',
            'public class AlertaBarragem {\n    public static void main(String[] args) {\n        /* Verifica nivel de seguranca ____\n        System.out.println("Nivel estavel");\n    }\n}'
          ),
          t(
            'Qual deve ser o nome completo do arquivo (incluindo a extensão) onde está declarada public class ControlePortaria?',
            ['ControlePortaria.java'],
            'A regra da linguagem exige correspondência exata com a classe pública acrescida da extensão .java: ControlePortaria.java.'
          ),
          q(
            'Qual destes trechos internos ao método main de ReciboTaxi contém uma aparência enganosa em que o texto "// desconto" SERÁ impresso na tela?',
            'System.out.println("Total // desconto");',
            [
              '// System.out.println("Total desconto");',
              'System.out.println("Total"); // desconto'
            ],
            'Quando // aparece dentro de aspas duplas de uma String literal, faz parte do texto normal e não atua como comentário.'
          ),
          q(
            'Em uma revisão de código, qual convenção de nomenclatura e estrutura está 100% alinhada às boas práticas Java?',
            'Arquivo RelatorioCaixa.java com public class RelatorioCaixa, chaves balanceadas e Javadoc no topo',
            [
              'Arquivo relatorio_caixa.java com public class relatorio_caixa e instruções sem ponto e vírgula',
              'Arquivo Relatorio.java com duas classes public diferentes no mesmo arquivo'
            ],
            'PascalCase no tipo público, nome idêntico ao arquivo .java, blocos balanceados e documentação clara seguem o padrão Java.'
          ),
          o(
            'Ordene o roteiro de revisão para diagnosticar e corrigir um arquivo PainelDoca.java que falhou ao compilar:',
            [
              'Conferir se o nome do arquivo PainelDoca.java coincide letra por letra com public class PainelDoca',
              'Verificar se todos os comentários /* */ e /** */ foram devidamente fechados com */',
              'Confirmar que cada chave { aberta possui sua chave } correspondente',
              'Checar se todas as instruções internas terminam com ponto e vírgula ; e recompilar'
            ],
            'Nome do arquivo, comentários fechados, chaves em par e ponto e vírgula cobrem os quatro erros sintáticos essenciais da classe inicial.'
          ),
          p(
            'Conecte cada sintoma de erro do javac na Unidade 3 à sua causa exata no código:',
            [
              ['class Painel is public, should be declared in a file named Painel.java', 'Divergência entre o nome da classe pública e o nome do arquivo .java'],
              ['\';\' expected', 'Instrução executável deixada sem ponto e vírgula ao final'],
              ['unclosed comment', 'Comentário iniciado com /* ou /** sem o fechamento correspondente */'],
              ['reached end of file while parsing', 'Bloco aberto com { que ficou sem a chave de fechamento } no arquivo']
            ],
            'Ler com calma a mensagem em inglês do javac leva diretamente à linha e ao caractere que faltou fechar.'
          )
        ]
      }
    ],
    4: [
      {
        id: 'jv-c01-u4-l1',
        title: 'A porta de entrada do programa Java',
        subtitle: 'Apresentação · assinatura public static void main(String[] args)',
        theory: 'Quando você roda java MonitorCarga, a JVM procura exatamente o ponto de entrada public static void main(String[] args). Sem essa assinatura padrão — nome main em minúsculas e parâmetro do tipo vetor de String —, a classe até compila, mas a JVM recusa iniciar a execução do aplicativo.',
        questions: [
          q(
            'Qual assinatura clássica a JVM procura para iniciar a execução da classe MonitorCarga pelo comando java MonitorCarga?',
            'public static void main(String[] args)',
            [
              'public void Main(String args)',
              'static int main()'
            ],
            'O ponto de entrada padrão exige public, static, retorno void, nome main em minúsculas e parâmetro String[] (ou String...).'
          ),
          q(
            'A classe SensorFumaca abaixo compila com javac SensorFumaca.java, mas falha ao rodar java SensorFumaca. Qual é o motivo?',
            'O método foi escrito como Main com M maiúsculo; para o compilador é um método comum, mas a JVM exige main minúsculo',
            [
              'A palavra String deveria estar inteiramente em letras minúsculas',
              'Não é permitido chamar System.out.println dentro de métodos estáticos'
            ],
            'Main com M maiúsculo é um método válido qualquer, por isso compila, mas a JVM não o reconhece como ponto de entrada main.',
            'public class SensorFumaca {\n    public static void Main(String[] args) {\n        System.out.println("Ativo");\n    }\n}'
          ),
          g(
            'Complete o tipo do parâmetro do método main na classe DespachoTrem:',
            ['String[]', 'String...'],
            'O método main recebe um array de textos (String[] args) com os argumentos vindos da linha de comando.',
            'public class DespachoTrem {\n    public static void main(____ args) {\n        System.out.println("Trem liberado");\n    }\n}'
          ),
          t(
            'Qual é o nome exato do método (apenas o identificador, em letras minúsculas) que funciona como porta de entrada de um aplicativo Java?',
            ['main'],
            'A JVM busca especificamente o método chamado main para iniciar o programa.'
          ),
          q(
            'Se você trocar o nome do parâmetro args por parametros em public static void main(String[] parametros), o programa RadarPista ainda executa?',
            'Sim, pois args é apenas o nome convencional da variável; o que a JVM exige é o tipo String[]',
            [
              'Não, pois args é uma palavra reservada imutável da gramática do Java',
              'Compila, mas apaga todos os textos impressos por System.out.println'
            ],
            'O nome do parâmetro pode variar (embora args seja a convenção universal), desde que a assinatura mantenha public static void main(String[]).'
          ),
          q(
            'Uma classe utilitária como TabelaImpostos pode compilar normalmente mesmo sem possuir um método main?',
            'Sim, ela compila e pode ser usada por outras classes, mas não pode ser iniciada sozinha diretamente com java TabelaImpostos',
            [
              'Não, o compilador javac rejeita qualquer arquivo .java que não tenha main',
              'Não, toda classe Java sem main é deletada automaticamente pelo classloader'
            ],
            'Em projetos reais, dezenas de classes modelam dados e regras sem main; apenas a classe inicial executável precisa dele.'
          ),
          o(
            'Ordene os elementos que compõem o cabeçalho padrão do método de entrada antes do bloco { }:',
            [
              'Modificadores public static',
              'Tipo de retorno void',
              'Nome do método main',
              'Lista de parâmetros (String[] args)'
            ],
            'A assinatura combina modificadores (public static), retorno (void), identificador (main) e parâmetro ((String[] args)).'
          ),
          p(
            'Associe cada parte da assinatura public static void main(String[] args) ao seu papel sintático:',
            [
              ['main', 'Identificador exato em minúsculas procurado pela JVM ao iniciar a classe'],
              ['String[]', 'Tipo vetor de textos que representa os valores recebidos do terminal'],
              ['args', 'Nome convencional do parâmetro que referencia o vetor de argumentos'],
              ['Classe sem main', 'Compila como componente auxiliar, mas não inicia sozinha via comando java']
            ],
            'Distinguir o que é exigência da JVM (nome main e tipo String[]) do que é convenção (nome args) dá segurança ao programar.'
          )
        ]
      },
      {
        id: 'jv-c01-u4-l2',
        title: 'O papel de public, static e void',
        subtitle: 'Prática guiada · por que main é public, static e void',
        theory: 'Cada palavra da assinatura do main cumpre uma função técnica na partida de um serviço: public libera a chamada externa pela JVM, static permite executá-lo direto na classe sem criar um objeto com new antes, e void indica que o método não devolve valor algum ao encerrar o fluxo em Java.',
        questions: [
          q(
            'Por que o método main precisa do modificador static para que a JVM inicie a classe ServidorFila?',
            'Para que a JVM possa invocá-lo diretamente na classe ServidorFila sem instanciar um objeto antes com new',
            [
              'Para impedir que qualquer variável mude de valor dentro do programa',
              'Para congelar o arquivo .class na memória ROM da placa-mãe'
            ],
            'Métodos static pertencem à própria classe; assim a JVM chama ServidorFila.main(...) imediatamente ao carregar o tipo.'
          ),
          q(
            'O que a palavra reservada void comunica na declaração public static void main(String[] args) da classe EmissorCupom?',
            'Que o método main executa suas ações e encerra sem retornar nenhum valor na instrução return',
            [
              'Que o corpo do método main está proibido de conter qualquer linha de código',
              'Que os argumentos de String[] args chegam sempre vazios na memória'
            ],
            'Em Java, void indica ausência de valor de retorno do método.'
          ),
          g(
            'Complete o modificador que permite à JVM chamar o método main de PainelUsina sem precisar criar uma instância da classe:',
            ['static'],
            'O modificador static associa main diretamente à classe PainelUsina, permitindo a partida sem objeto prévio.',
            'public class PainelUsina {\n    public ____ void main(String[] args) {\n        System.out.println("Turbina online");\n    }\n}'
          ),
          t(
            'Qual palavra-chave na assinatura do main indica que o método NÃO devolve valor ao terminar?',
            ['void'],
            'O tipo de retorno void especifica que o método não devolve nenhum dado ao chamador.'
          ),
          q(
            'Na versão clássica padronizada do Java, o que acontece ao executar java ColetorDados se você remover a palavra static de public void main(String[] args)?',
            'A classe compila, mas a JVM aborta na partida reclamando que o método main não é static',
            [
              'O compilador javac adiciona a palavra static escondida no arquivo .java',
              'O programa roda duas vezes seguidas para compensar a falta de static'
            ],
            'Sem static no padrão tradicional public static void main(String[] args), o código é sintaticamente válido, mas falha ao iniciar na JVM.'
          ),
          q(
            'Em Java, escrever static public void main(String[] args) invertendo a ordem de public e static na classe ValidadorLote é válido?',
            'Sim, a gramática aceita os dois modificadores em qualquer ordem antes de void, embora public static seja a convenção padrão',
            [
              'Não, inverter public e static apaga o arquivo .class do diretório',
              'Apenas se void também for movido para depois de main'
            ],
            'Java permite reordenar modificadores (static public), mas void deve vir obrigatoriamente antes do nome main; prefira sempre public static.'
          ),
          o(
            'Ordene o que acontece nos bastidores quando você executa java CentralAlarme no terminal:',
            [
              'A JVM localiza e carrega o bytecode CentralAlarme.class na memória',
              'Verifica a visibilidade public do ponto de entrada na classe carregada',
              'Invoca main diretamente via vínculo static sem instanciar CentralAlarme',
              'Finaliza o método ao fim do bloco sem exigir valor de retorno graças ao void'
            ],
            'Carregamento da classe, acesso public, chamada static sem instância e término void explicam toda a assinatura do main.'
          ),
          p(
            'Relacione cada modificador ou retorno do método main à justificativa técnica de sua presença:',
            [
              ['public no main', 'Garante que o lançador externo da JVM tenha permissão para chamar o método'],
              ['static no main', 'Dispensa a criação prévia de um objeto com new antes do programa começar'],
              ['void no main', 'Estabelece que o método não devolve valor algum pela instrução return'],
              ['return; opcional em void', 'Pode encerrar o método main mais cedo, desde que não tente devolver valor']
            ],
            'Entender public, static e void antecipa conceitos essenciais de métodos e orientação a objetos.'
          )
        ]
      },
      {
        id: 'jv-c01-u4-l3',
        title: 'Argumentos de linha de comando em args',
        subtitle: 'Aprofundamento · lendo args.length e args[0]',
        theory: 'Ao iniciar java BackupDiario vendas 2026, o terminal entrega os textos extras no vetor String[] args: args.length vale 2, args[0] guarda "vendas" e args[1] guarda "2026". Como os índices começam em zero, ler args[0] sem argumentos lançaria ArrayIndexOutOfBoundsException em tempo real.',
        questions: [
          q(
            'Você executa java BackupDiario financeiro noturno no terminal. Quais são os valores de args.length e args[0] dentro do main?',
            'args.length vale 2 e args[0] vale "financeiro"',
            [
              'args.length vale 3 e args[0] vale "BackupDiario"',
              'args.length vale 2 e args[0] vale "noturno"'
            ],
            'Em Java, o nome da classe não entra no vetor args: apenas os argumentos após BackupDiario contam, logo length é 2 e args[0] é "financeiro".'
          ),
          q(
            'O que acontece ao executar java ConsultaCep (sem passar nenhum argumento extra) se a primeira linha do main imprime args[0]?',
            'O programa lança ArrayIndexOutOfBoundsException em tempo de execução, pois args.length é 0',
            [
              'Imprime automaticamente o texto "0" sem gerar nenhum erro',
              'Nem sequer compila com javac porque args[0] é sintaxe proibida'
            ],
            'Sem argumentos na linha de comando, a JVM entrega um vetor vazio (length 0); acessar o índice 0 estoura os limites do array.'
          ),
          g(
            'Complete a propriedade do vetor args usada para descobrir quantos argumentos foram passados para ImportadorCsv:',
            ['length'],
            'Em Java, arrays expõem seu tamanho pelo atributo args.length (sem parênteses).',
            'public class ImportadorCsv {\n    public static void main(String[] args) {\n        System.out.println(args.____);\n    }\n}'
          ),
          t(
            'Ao rodar java GeradorEtiqueta loteA caixa7 urgente, qual texto exato é guardado na posição args[2]?',
            ['urgente', '"urgente"'],
            'Contando a partir de zero: args[0] é loteA, args[1] é caixa7 e args[2] é urgente.',
            'public class GeradorEtiqueta {\n    public static void main(String[] args) {\n        System.out.println(args[2]);\n    }\n}'
          ),
          q(
            'Como passar o nome composto "Porto Alegre" para java ClimaCidade de modo que ele ocupe apenas args[0] em vez de ser dividido em duas posições?',
            'Envolvendo o argumento entre aspas no terminal: java ClimaCidade "Porto Alegre"',
            [
              'Digitando dois espaços entre as palavras: java ClimaCidade Porto  Alegre',
              'Escrevendo java "ClimaCidade Porto Alegre" tudo dentro do mesmo par de aspas'
            ],
            'O shell separa argumentos por espaço, mas agrupa textos cercados por aspas em um único elemento entregue a args[0].'
          ),
          q(
            'Quando o usuário executa java PingServidor 8080 no terminal, com qual tipo de dado o valor 8080 chega dentro de args[0]?',
            'Sempre como String ("8080"), exigindo conversão explícita caso você precise fazer contas numéricas',
            [
              'Diretamente como número inteiro int pronto para multiplicação',
              'Como valor booleano true por ser maior que zero'
            ],
            'O parâmetro é String[] args: todo argumento da linha de comando chega inicialmente como texto (String).'
          ),
          o(
            'Ordene a sequência segura para um utilitário CLI ler o primeiro argumento enviado pelo terminal:',
            [
              'Receber o vetor de textos no parâmetro String[] args do método main',
              'Consultar args.length para verificar se pelo menos 1 argumento foi informado',
              'Acessar args[0] somente quando a quantidade for maior que zero',
              'Exibir uma mensagem de orientação amigável caso nenhum argumento tenha sido passado'
            ],
            'Testar args.length > 0 antes de ler args[0] previne falhas abruptas com ArrayIndexOutOfBoundsException.'
          ),
          p(
            'Para a execução java Sincronizador estoque norte 50, associe cada expressão ao valor resultante:',
            [
              ['args.length', 'Inteiro 3 representando o total de argumentos após o nome da classe'],
              ['args[0]', 'Texto "estoque" posicionado no primeiro índice do vetor'],
              ['args[1]', 'Texto "norte" armazenado no segundo elemento do array'],
              ['args[2]', 'Texto "50" recebido ainda como String na última posição válida']
            ],
            'Dominar índices baseados em zero e args.length permite parametrizar utilitários sem recompilar o código.'
          )
        ]
      },
      {
        id: 'jv-c01-u4-l4',
        title: 'Execução sequencial dentro do main',
        subtitle: 'Aplicação · ordem sequencial das instruções dentro de main',
        theory: 'Dentro do bloco do main de um sistema de embarque, a JVM executa uma instrução por vez, de cima para baixo, na ordem exata em que foram escritas. Se uma linha atualiza uma variável ou imprime um recibo antes da próxima, cada passo enxerga o estado deixado imediatamente pela linha anterior.',
        questions: [
          q(
            'Qual é a saída exata na tela ao executar a classe PainelEmbarque abaixo?',
            'Primeira linha: Voo 402 - Portao C4 e segunda linha: Embarque imediato',
            [
              'Três linhas separadas, começando por Embarque imediato no topo',
              'Uma única linha juntando Voo 402 - Portao C4Embarque imediato'
            ],
            'A execução é sequencial de cima para baixo: print mantém o cursor na mesma linha para Portao C4, e println quebra para a linha seguinte.',
            'public class PainelEmbarque {\n    public static void main(String[] args) {\n        System.out.print("Voo 402 - ");\n        System.out.println("Portao C4");\n        System.out.println("Embarque imediato");\n    }\n}'
          ),
          q(
            'Rastreie a ordem sequencial em EstoquePadaria. Qual número é impresso na tela ao final do main?',
            '12',
            [
              '10',
              '15'
            ],
            'Passo a passo: cestas começa em 10, sobe para 15 na segunda linha, cai para 12 na terceira e é impressa como 12.',
            'public class EstoquePadaria {\n    public static void main(String[] args) {\n        int cestas = 10;\n        cestas = cestas + 5;\n        cestas = cestas - 3;\n        System.out.println(cestas);\n    }\n}'
          ),
          g(
            'Na execução sequencial de CronometroTreino, variáveis precisam existir antes do uso. Complete o nome da variável já declarada para imprimir 45:',
            ['segundos'],
            'A variável segundos é criada com 30, atualizada sequencialmente para 45 e lida na linha seguinte pelo println.',
            'public class CronometroTreino {\n    public static void main(String[] args) {\n        int segundos = 30;\n        segundos = segundos + 15;\n        System.out.println(____);\n    }\n}'
          ),
          t(
            'Qual texto exato a classe StatusPedido imprime por último, após a reatribuição sequencial de etapa?',
            ['Entregue'],
            'Cada atribuição sobrescreve o valor anterior na ordem de leitura; quando println roda na quarta linha, etapa vale Entregue.',
            'public class StatusPedido {\n    public static void main(String[] args) {\n        String etapa = "Recebido";\n        etapa = "Preparando";\n        etapa = "Entregue";\n        System.out.println(etapa);\n    }\n}'
          ),
          q(
            'Por que a classe ReciboLavanderia abaixo falha logo na compilação?',
            'Porque dentro de um método uma variável local não pode ser lida em uma linha anterior à sua declaração',
            [
              'Porque o método main aceita no máximo uma linha de código por vez',
              'Porque o número 8 precisa estar escrito entre aspas duplas em int'
            ],
            'O escopo de variáveis locais no main começa na linha em que são declaradas e segue apenas daquele ponto em diante.',
            'public class ReciboLavanderia {\n    public static void main(String[] args) {\n        System.out.println(pecas);\n        int pecas = 8;\n    }\n}'
          ),
          q(
            'Se duas instruções válidas forem escritas na mesma linha física separadas por ponto e vírgula, como int x = 4; System.out.println(x);, em que ordem a JVM as executa?',
            'Da esquerda para a direita na ordem sequencial das instruções, embora uma instrução por linha seja muito mais legível',
            [
              'Da direita para a esquerda, imprimindo x antes de criar a variável',
              'Ambas ao mesmo tempo em paralelo, gerando resultado aleatório'
            ],
            'O ponto e vírgula separa instruções sequenciais executadas na ordem em que aparecem, mas boas práticas pedem uma por linha.'
          ),
          o(
            'Ordene as instruções internas do main de BilheteEstacionamento para calcular e exibir o valor final sem erro de escopo:',
            [
              'int tarifa = 14;',
              'int adicional = 6;',
              'int total = tarifa + adicional;',
              'System.out.println(total);'
            ],
            'Primeiro declaram-se tarifa e adicional, depois calcula-se total usando ambas e por fim imprime-se o resultado 20.'
          ),
          p(
            'Acompanhe o estado da variável saldo em ContaCantina a cada linha sequencial executada no main:',
            [
              ['Linha 1: int saldo = 20;', 'Cria a variável local na memória com valor inicial 20'],
              ['Linha 2: saldo = saldo - 7;', 'Lê 20 da linha anterior, subtrai 7 e grava o novo estado 13'],
              ['Linha 3: System.out.println(saldo);', 'Exibe 13 no console refletindo o estado vigente naquele instante'],
              ['Linha 4: saldo = 0;', 'Zera a variável somente depois da impressão, sem alterar o 13 já exibido']
            ],
            'Rastrear linha por linha o estado da memória é a habilidade central para depurar qualquer algoritmo.'
          )
        ]
      },
      {
        id: 'jv-c01-u4-l5',
        title: 'Dominando o ponto de entrada em Java',
        subtitle: 'Revisão e desafio · assinatura, modificadores, args e fluxo do main',
        theory: 'Um utilitário CLI robusto como ConversorFrete reúne uma classe pública no arquivo correspondente, o método public static void main(String[] args), verificação segura de args.length antes de ler args[0] e instruções sequenciais encerradas por ;, formando um programa Java completo e confiável.',
        questions: [
          q(
            'Você compila ConversorFrete.java e roda java ConversorFrete expresso sul. Qual saída exata aparece no console?',
            '2:sul',
            [
              '2:expresso',
              '3:expresso'
            ],
            'Foram passados 2 argumentos após o nome da classe (args.length é 2): args[0] é "expresso" e args[1] é "sul", imprimindo 2:sul.',
            'public class ConversorFrete {\n    public static void main(String[] args) {\n        System.out.println(args.length + ":" + args[1]);\n    }\n}'
          ),
          q(
            'Analise o código de PainelPortuario.java abaixo. O que acontece ao executar java PainelPortuario navio1?',
            'Executa as atribuições sequencialmente e encerra o método main normalmente sem imprimir nada na tela',
            [
              'Falha na compilação porque métodos void proíbem escrever return; vazio',
              'Imprime automaticamente B3 porque return envia a última variável ao console'
            ],
            'Em métodos void, return; sem valor apenas encerra a execução do método; como não há System.out.println, nada é exibido.',
            'public class PainelPortuario {\n    public static void main(String[] args) {\n        String berco = "A1";\n        berco = "B3";\n        return;\n    }\n}'
          ),
          g(
            'Complete o índice do vetor args para exibir o PRIMEIRO argumento passado na chamada java RastreadorCarga LOTE99:',
            ['0'],
            'Arrays em Java são indexados a partir de zero, portanto o primeiro argumento da linha de comando fica em args[0].',
            'public class RastreadorCarga {\n    public static void main(String[] args) {\n        System.out.println(args[____]);\n    }\n}'
          ),
          t(
            'Qual número inteiro é impresso quando você executa java ContadorTurnos manha tarde noite com o código abaixo?',
            ['4'],
            'Os três argumentos (manha, tarde e noite) fazem args.length valer 3; somado a bonus (1), o resultado impresso é 4.',
            'public class ContadorTurnos {\n    public static void main(String[] args) {\n        int bonus = 1;\n        System.out.println(args.length + bonus);\n    }\n}'
          ),
          q(
            'Uma classe RelatorioFiscal possui dois métodos sobrecarregados: main(String[] args) e main(int codigo). Qual deles a JVM chama ao rodar java RelatorioFiscal?',
            'Sempre public static void main(String[] args), ignorando sobrecargas com outros tipos de parâmetro na partida',
            [
              'Sempre main(int codigo), porque números inteiros têm prioridade sobre textos',
              'A JVM recusa carregar qualquer classe que tenha mais de um método no arquivo'
            ],
            'Java permite sobrecarga de métodos com o nome main, mas o lançador da JVM invoca exclusivamente a assinatura padrão com String[].'
          ),
          q(
            'Qual conjunto reúne todos os requisitos mínimos para que AlertaSismico.java compile e rode via terminal sem erro?',
            'Arquivo AlertaSismico.java com public class AlertaSismico, método public static void main(String[] args), chaves em par e instruções com ;',
            [
              'Arquivo alertasismico.java com public class AlertaSismico, método private int main() e blocos sem chaves',
              'Arquivo AlertaSismico.class escrito à mão no bloco de notas e compilado com java --version'
            ],
            'Correspondência do arquivo com a classe public, assinatura exata do main e delimitadores válidos formam um programa Java executável.'
          ),
          o(
            'Ordene a jornada completa de execução quando o operador roda javac MonitorDique.java e depois java MonitorDique norte:',
            [
              'O javac valida chaves, ponto e vírgula e o nome MonitorDique.java, gerando MonitorDique.class',
              'O comando java carrega MonitorDique.class na JVM e entrega ["norte"] ao parâmetro String[] args',
              'A JVM chama o método public static void main diretamente na classe sem usar new',
              'As instruções internas do main rodam de cima para baixo lendo args[0] igual a "norte"'
            ],
            'Esse fluxo integra compilação para bytecode, carregamento na JVM, passagem de argumentos em args e execução sequencial do main.'
          ),
          p(
            'Relacione cada falha de execução ou compilação vista até aqui à sua origem exata:',
            [
              ['Main method not found in class', 'Falta a assinatura exata public static void main(String[] args) na classe'],
              ['ArrayIndexOutOfBoundsException em args[0]', 'Tentativa de ler o primeiro argumento quando o programa foi iniciado sem argumentos'],
              ['cannot find symbol em variável local', 'Uso de uma variável em uma linha anterior à sua declaração dentro do main'],
              ['UnsupportedClassVersionError', 'Execução do bytecode em uma JVM mais antiga que o javac usado para compilá-lo']
            ],
            'Reconhecer erros de compilação versus exceções de execução fecha com solidez a base das quatro primeiras unidades de Java.'
          )
        ]
      }
    ]
  });
})();
