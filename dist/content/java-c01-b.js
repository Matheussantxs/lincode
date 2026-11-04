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
    5: [
      {
        id: "jv-c01-u5-l1",
        title: "O compilador javac e a geração de bytecode",
        subtitle: "Apresentação · o compilador javac e a criação de bytecodes",
        theory: "O comando javac é o compilador oficial da plataforma Java. Ele analisa arquivos .java com código-fonte legível por humanos e os converte em arquivos .class contendo bytecode intermediário otimizado para ser interpretado ou compilado via JIT pela Máquina Virtual Java.",
        questions: [
        q("Qual comando da linha de comando do JDK é responsável por compilar código-fonte Java?", "javac", ["javadoc","jdb"], "O utilitário javac compila código .java em arquivos .class contendo bytecode portátil.", "javac OlaMundo.java"),
        q("Qual arquivo é gerado no disco após compilar com sucesso a classe Programa declarada em Programa.java?", "Programa.class", ["Programa.exe","Programa.bin"], "O compilador javac produz arquivos binários com a extensão .class para cada classe declarada."),
        q("O que o arquivo .class contém internamente?", "Bytecodes intermediários padronizados compreendidos pela JVM", ["Instruções de máquina exclusivas do processador Intel x86","Uma cópia do texto do código-fonte em formato zip"], "Bytecode é um conjunto de instruções intermediárias portáteis executadas em qualquer JVM."),
        q("O que acontece se o código-fonte possuir um erro de sintaxe durante a execução do comando javac?", "O compilador emite mensagens de erro no terminal e não gera o arquivo .class", ["O compilador cria um arquivo vazio executável","O Windows desliga o computador para evitar falhas"], "Se houver erros léxicos ou sintáticos, o javac interrompe o processo e aponta a linha exata."),
        t("Qual comando do JDK é invocado no terminal para compilar um arquivo com código Java?", ["javac"], "javac (Java Compiler) compila arquivos .java em bytecode executável pela JVM.", "// Comando para compilar: ____ App.java"),
        g("Complete a extensão gerada pelo compilador javac ao processar uma classe Java:", [".class"], "A extensão de bytecode compilado oficial do ecossistema Java é .class.", "// Resultado da compilacao: App____"),
        o("Ordene as etapas da compilação de um arquivo de código-fonte com o utilitário javac:", ["Escrever o código-fonte na classe e salvar como Exemplo.java","Abrir o terminal do sistema no diretório onde o arquivo está salvo","Executar a instrução javac Exemplo.java na linha de comando","Verificar se o arquivo binário Exemplo.class foi gerado na pasta"], "O ciclo canônico de compilação converte texto em bytecode executável de forma determinística."),
        p("Associe a ferramenta ou arquivo do ecossistema Java ao seu respectivo papel na compilação:", [["javac","Compilador padrão do JDK que converte código-fonte .java em bytecode"],[".java","Arquivo de texto puro legível contendo declarações de classes e métodos"],[".class","Arquivo binário compilado contendo instruções de bytecode para a JVM"],["Bytecode","Conjunto de instruções intermediárias neutras em relação ao hardware"]], "Compreender cada componente do ciclo de compilação Java evita confusões entre compilar e rodar.")
        ]
      },
      {
        id: "jv-c01-u5-l2",
        title: "Parâmetros e opções do compilador javac",
        subtitle: "Prática guiada · comando javac no terminal e flags comuns",
        theory: "O comando javac suporta parâmetros essenciais como -d para direcionar arquivos compilados a uma pasta separada (ex: -d bin), -encoding para fixar UTF-8 e -cp para indicar bibliotecas externas. Separar fontes e binários mantém a estrutura do projeto limpa.",
        questions: [
        q("Qual flag do javac é utilizada para definir a pasta de destino onde os arquivos .class serão salvos?", "-d", ["-dest","-outdir"], "A opção -d (directory) especifica a pasta onde as classes compiladas serão gravadas.", "javac -d bin src/App.java"),
        q("Qual opção do javac garante que o compilador leia o código-fonte interpretando acentos em UTF-8?", "-encoding UTF-8", ["-charset ASCII","-unicode true"], "Definir -encoding UTF-8 evita avisos de caracteres corrompidos em sistemas com locale diferente."),
        q("Por que é uma boa prática separar os arquivos .java na pasta src e os .class na pasta bin?", "Mantém o código-fonte limpo, facilita a limpeza de builds e o versionamento no Git", ["Obrigatório porque a JVM recusa arquivos na mesma pasta","Aumenta a velocidade do processador do computador"], "Separar código-fonte de artefatos de compilação é um padrão fundamental de engenharia de software."),
        q("Qual parâmetro do javac permite compilar todos os arquivos Java de uma pasta de uma só vez?", "Curinga com asterisco (*.java)", ["Flag -all-files","Comando copy"], "Informar *.java instrui o compilador a processar todos os fontes Java do diretório."),
        t("Qual flag do compilador javac direciona a saída dos arquivos binários gerados?", ["-d"], "A opção -d define o diretório de destino das classes compiladas.", "// javac ____ out src/Principal.java"),
        g("Complete o comando javac especificando o diretório de saída bin para o arquivo App.java:", ["-d bin"], "A flag -d seguida do nome da pasta bin organiza os artefatos compilados.", "javac ____ src/App.java"),
        o("Ordene os passos para compilar um projeto Java organizando fontes e binários em pastas distintas:", ["Criar a pasta src contendo os arquivos .java do código-fonte","Criar ou apontar a pasta bin destinada a receber os binários gerados","Executar javac -d bin src/*.java no terminal do sistema","Conferir a geração dos arquivos de bytecode organizados dentro de bin"], "Adotar a separação entre src e bin desde o início evita poluição do repositório."),
        p("Associe a flag do comando javac ao seu efeito correspondente durante a compilação:", [["-d <diretório>","Especifica a pasta onde os arquivos .class gerados serão gravados"],["-encoding <charset>","Define a codificação de caracteres do código-fonte (ex: UTF-8)"],["-cp <caminho>","Informa o classpath de classes e bibliotecas necessárias para a compilação"],["-version","Exibe a versão instalada do compilador javac no terminal"]], "Dominar flags essenciais do javac é crucial para construir scripts de build eficientes.")
        ]
      },
      {
        id: "jv-c01-u5-l3",
        title: "Inspeção de bytecode com a ferramenta javap",
        subtitle: "Aprofundamento · arquivos .class e inspeção com javap",
        theory: "O JDK inclui o descompilador de bytecode javap, também conhecido como Java Class File Disassembler. Ele permite inspecionar métodos, assinaturas e instruções de baixo nível contidas em um arquivo .class compilado, revelando como a JVM realmente enxerga o programa.",
        questions: [
        q("Qual utilitário oficial incluído no JDK permite inspecionar as instruções de bytecode de um .class?", "javap", ["javadoc","jstat"], "javap desmonta arquivos de classe e exibe suas assinaturas e instruções internas de bytecode.", "javap -c App"),
        q("Qual flag do comando javap exibe as instruções literais de bytecode (mnemônicos) de cada método?", "-c", ["-bytes","-dump"], "A opção -c desmonta os métodos exibindo as instruções da máquina virtual Java."),
        q("O que a inspeção com javap revela sobre o construtor padrão em classes que não o declararam?", "Mostra que o compilador javac inseriu automaticamente um construtor público sem argumentos", ["Mostra que a classe é inválida e será rejeitada","Mostra que o arquivo foi corrompido"], "O javac gera automaticamente o construtor padrão invocando super() na ausência de outro."),
        q("Por que engenheiros de software seniores utilizam o javap na depuração avançada?", "Para entender otimizações do compilador, concatenação de strings e custo de instruções", ["Para mudar a cor da fonte no terminal do Windows","Para transformar arquivos Java em páginas HTML"], "Inspecionar bytecode confirma como expressões de alto nível são convertidas na JVM."),
        t("Qual utilitário do JDK é o desmontador oficial de arquivos de classe (.class)?", ["javap"], "javap desmonta classes compiladas permitindo visualizar o bytecode gerado.", "// Desmontar classe compilada: ____ -c MinhaClasse"),
        g("Complete o comando javap com a flag que exibe as instruções de código desmontadas:", ["-c"], "A flag -c habilita a exibição do bytecode de cada método.", "javap ____ Calculadora.class"),
        o("Ordene os passos para compilar uma classe e inspecionar suas instruções de bytecode com javap:", ["Escrever o código-fonte da classe em um arquivo Java estruturado","Compilar o código-fonte executando javac na linha de comando","Executar javap -c apontando para o arquivo de classe gerado","Analisar os mnemônicos de bytecode como getstatic e invokevirtual"], "A desmontagem de classes ilumina o funcionamento interno da JVM."),
        p("Associe o mnemônico clássico de bytecode da JVM à sua ação fundamental:", [["getstatic","Obtém o valor de um campo estático de uma classe (ex: System.out)"],["invokevirtual","Invoca um método de instância comum baseado em despacho dinâmico"],["ldc","Carrega uma constante (como um literal de string ou número) na pilha"],["return","Finaliza a execução do método corrente devolvendo o fluxo da thread"]], "Reconhecer mnemônicos básicos do bytecode aprofunda a compreensão da arquitetura Java.")
        ]
      },
      {
        id: "jv-c01-u5-l4",
        title: "Compilação de múltiplos arquivos interdependentes",
        subtitle: "Aplicação · compilação de múltiplos arquivos interdependentes",
        theory: "Projetos reais dividem responsabilidades entre várias classes em arquivos distintos. Ao compilar uma classe que depende de outra, o javac localiza e compila automaticamente as dependências necessárias no mesmo diretório ou no classpath configurado.",
        questions: [
        q("Se a classe Principal utiliza a classe Mensageiro, o que o javac faz ao compilar Principal.java?", "Localiza Mensageiro.java no diretório, compila ambas as classes e gera os dois arquivos .class", ["Gera erro fatal exigindo que todo o código esteja em um único arquivo","Ignora a classe Mensageiro e substitui por null"], "O compilador Java resolve referências cruzadas automaticamente no mesmo caminho de busca."),
        q("O que acontece se a classe auxiliar Mensageiro.java contiver um erro de digitação durante a compilação?", "O javac relata o erro ocorrido em Mensageiro.java e aborta a compilação de ambas as classes", ["A classe Principal compila com sucesso e o erro é esquecido","O terminal apaga os dois arquivos"], "Dependências com erro impedem a geração dos artefatos binários de todo o conjunto interdependente."),
        q("Qual convenção deve ser estritamente seguida entre o nome do arquivo e a classe pública contida nele?", "O nome do arquivo deve ser rigorosamente idêntico ao nome da classe pública, incluindo maiúsculas", ["O arquivo deve ter nome diferente da classe para evitar colisão","O nome do arquivo deve ser sempre em minúsculas"], "Em Java, uma classe pública chamada Usuario exige residir em um arquivo chamado Usuario.java."),
        q("Qual ferramenta moderna automatiza a compilação de centenas de arquivos em projetos Java profissionais?", "Maven ou Gradle", ["Wordpad","Paintbrush"], "Gerenciadores de compilação como Maven e Gradle orquestram dependências e builds corporativos."),
        t("Em qual arquivo deve ser declarada uma classe pública chamada Pedido em Java?", ["Pedido.java"], "Classes públicas exigem arquivo com nome estritamente correspondente em Java.", "// Arquivo para public class Pedido: ____"),
        g("Complete o comando javac para compilar dois arquivos interdependentes em uma única chamada:", ["javac"], "javac pode receber múltiplos arquivos de uma só vez na linha de comando.", "____ Usuario.java Autenticacao.java"),
        o("Ordene os passos para estruturar e compilar duas classes colaboradoras em Java:", ["Criar a classe de serviço em Servico.java com seus métodos auxiliares","Criar a classe executável em App.java invocando métodos de Servico","Executar javac App.java Servico.java no terminal do projeto","Constatar a criação bem-sucedida de App.class e Servico.class"], "A compilação de múltiplas classes alinha a estrutura física dos arquivos com o design orientado a objetos."),
        p("Associe a regra de estrutura de arquivos em Java à sua consequência correspondente:", [["public class Cliente","Exige residir obrigatoriamente no arquivo Cliente.java"],["class Auxiliar (sem public)","Pode residir no mesmo arquivo de outra classe no mesmo pacote"],["Compilação sem dependência","javac falha com erro cannot find symbol se a dependência faltar"],["Classpath (-cp)","Informa ao compilador onde buscar classes externas compiladas"]], "Seguir as regras canônicas de arquivos Java assegura compilação sem percalços.")
        ]
      },
      {
        id: "jv-c01-u5-l5",
        title: "Boas práticas no ciclo de compilação Java",
        subtitle: "Revisão e desafio · boas práticas no ciclo de compilação Java",
        theory: "Dominar o processo de compilação envolve entender a diferença entre erros de compilação (detectados antes de rodar) e erros de execução. Seguir convenções de nomenclatura CamelCase e manter a árvore de pastas limpa são práticas indispensáveis no ecossistema Java.",
        questions: [
        q("Qual é a maior vantagem prática de Java ser uma linguagem estaticamente tipada e compilada?", "Erros de tipos e incompatibilidades são capturados na compilação, antes do código ir para produção", ["Permite alterar a sintaxe da linguagem em tempo real","Dispensa a necessidade de declarar nomes de variáveis"], "A verificação estática de tipos no javac impede uma vasta categoria de bugs em tempo de execução."),
        q("Qual mensagem clássica do javac indica que uma variável ou método chamado não foi encontrado?", "cannot find symbol", ["segmentation fault","pointer null exception"], "cannot find symbol indica que o identificador referenciado não existe no escopo ou não foi importado."),
        q("Qual convenção de capitalização é obrigatória por padrão para nomes de classes em Java?", "PascalCase (Primeira letra de cada palavra em maiúscula)", ["kebab-case com hífens","snake_case com sublinhados"], "Nomes de classes e interfaces em Java utilizam convencionalmente o formato PascalCase."),
        q("O que deve ser adicionado ao arquivo .gitignore de um projeto Java?", "A pasta de binários compilados (como bin ou target) e arquivos .class", ["Os arquivos de código-fonte .java escritos pelo desenvolvedor","A documentação README do projeto"], "Artefatos compilados são recriáveis a qualquer momento e nunca devem ser commitados no Git."),
        t("Qual convenção de capitalização inicia cada palavra com letra maiúscula em nomes de classes?", ["PascalCase"], "Classes em Java utilizam PascalCase (ex: ContaCorrente, ValidadorCpf).", "// Formato de classe em Java: ____"),
        g("Complete o comando que compila o arquivo de teste e gera os binários na pasta out:", ["javac -d out"], "A opção -d direciona a compilação preservando o diretório de saída.", "____ Teste.java"),
        o("Ordene as boas práticas de ciclo de vida de compilação antes de compartilhar o código:", ["Garantir que todas as classes públicas correspondam ao nome exato do arquivo","Limpar a pasta de binários compilados para assegurar um build do zero","Executar a compilação completa validando ausência de warnings e erros","Ignorar os arquivos .class e pastas de saída no versionamento com Git"], "Manter higiene no processo de compilação previne conflitos em equipes de engenharia."),
        p("Associe o tipo de erro ao momento específico em que ele se manifesta:", [["Erro de compilação","Detectado pelo javac antes de gerar o bytecode (ex: ponto e vírgula ausente)"],["Erro de execução","Disparado pela JVM durante a execução do bytecode (ex: divisão por zero)"],["Erro lógico","O programa roda sem falhas técnicas mas produz resultados incorretos"],["cannot find symbol","Erro do javac sinalizando identificador ou classe inexistente"]], "Diagnosticar a natureza do erro permite aplicar a correção certa no momento correto.")
        ]
      }
    ],
    6: [
      {
        id: "jv-c01-u6-l1",
        title: "Inicialização da JVM com o comando java",
        subtitle: "Apresentação · inicialização da máquina virtual com comando java",
        theory: "O comando java inicializa a Máquina Virtual Java (JVM), carrega a classe especificada na memória, verifica a integridade do bytecode e invoca o método public static void main(String[] args). Ao contrário do javac, ao executar informamos apenas o nome da classe, sem a extensão .class.",
        questions: [
        q("Qual comando do terminal é utilizado para inicializar a JVM e executar uma classe compilada?", "java", ["javac","jvm-start"], "O comando java inicia o runtime da JVM e executa o ponto de entrada da classe indicada.", "java OlaMundo"),
        q("Como deve ser passado o nome da classe compilada ao comando java para execução?", "Apenas o nome da classe sem a extensão (ex: java MinhaClasse)", ["O nome com a extensão .class (ex: java MinhaClasse.class)","O caminho completo com .java (ex: java MinhaClasse.java.exe)"], "Passar .class ao comando java gera erro de ClassNotFoundException pois a JVM busca o nome qualificado da classe."),
        q("O que acontece se a classe passada ao comando java não possuir o método main padrão?", "A JVM emite um erro informando que o método main não foi encontrado na classe", ["A JVM executa a primeira linha da classe aleatoriamente","O computador reinicia automaticamente"], "A JVM exige a assinatura estrita do método main para saber onde iniciar a execução do programa."),
        q("Qual é a assinatura canônica obrigatória do método de entrada para que a JVM consiga executá-lo?", "public static void main(String[] args)", ["private int main()","protected void start()"], "A assinatura pública, estática, sem retorno e com array de strings é o contrato exigido pela JVM."),
        t("Qual comando do terminal dispara a execução de uma classe na Máquina Virtual Java?", ["java"], "O comando java inicializa a JVM e executa o bytecode da classe fornecida.", "// Para executar a classe App: ____ App"),
        g("Complete o comando no terminal para executar a classe compilada SistemaFinanceiro:", ["java"], "A execução no terminal é realizada invocando o comando java seguido do nome da classe.", "____ SistemaFinanceiro"),
        o("Ordene as etapas internas da JVM ao executar o comando java MinhaClasse no terminal:", ["A JVM é inicializada pelo sistema operacional na memória","O ClassLoader localiza e carrega o bytecode de MinhaClasse.class","O Bytecode Verifier checa a segurança e integridade das instruções","O motor de execução invoca o método public static void main"], "O ciclo interno garante execução segura, controlada e isolada do código na máquina."),
        p("Associe o comando da linha de comando à sua respectiva função operacional no JDK:", [["javac App.java","Compila o código-fonte em linguagem Java gerando App.class"],["java App","Inicia a JVM e executa o método main contido no bytecode de App"],["java -version","Exibe a versão e distribuição da Máquina Virtual Java ativa"],["javap -c App","Desmonta e exibe as instruções de bytecode da classe compilada"]], "Distinguir comandos de desenvolvimento e de execução é o primeiro degrau da proficiência em Java.")
        ]
      },
      {
        id: "jv-c01-u6-l2",
        title: "Classpath e localização de classes compiladas",
        subtitle: "Prática guiada · classpath e localização de classes compiladas",
        theory: "O Classpath é o parâmetro que informa à JVM em quais diretórios ou arquivos compactados (.jar) ela deve procurar as classes compiladas. O parâmetro -cp ou -classpath define esses caminhos; o ponto (.) representa o diretório atual de trabalho.",
        questions: [
        q("Qual flag do comando java define os locais onde a JVM deve procurar arquivos de classes?", "-cp (ou -classpath)", ["-search","-lookup"], "A flag -cp configura o classpath de busca de classes da Máquina Virtual.", "java -cp bin com.exemplo.App"),
        q("O que o símbolo de ponto (.) significa quando incluído no classpath de execução?", "Representa o diretório atual de trabalho onde o comando está sendo executado", ["Representa a raiz do disco rígido do sistema","Informa que a JVM deve baixar classes da internet"], "No classpath, o ponto (.) instrui a JVM a buscar classes na pasta corrente."),
        q("Qual erro a JVM lança se o comando java não encontrar o arquivo .class no classpath?", "ClassNotFoundException ou NoClassDefFoundError", ["FileIsCorruptedError","DiskMemoryFullException"], "Se a classe não estiver presente nos caminhos definidos no classpath, a JVM não consegue carregá-la."),
        q("Qual separador de caminhos é utilizado no classpath em sistemas Windows?", "Ponto e vírgula (;)", ["Dois pontos (:)","Arroba (@)"], "No Windows o separador de entradas no classpath é o ponto e vírgula (;), enquanto no Linux é dois pontos (:)."),
        t("Qual flag curta configura o classpath de execução no comando java?", ["-cp"], "A flag -cp (abreviação de classpath) define a lista de diretórios de busca de classes.", "// Executar apontando pasta bin: java ____ bin App"),
        g("Complete o comando para executar a classe App localizada dentro do diretório bin:", ["-cp bin"], "A flag -cp bin indica à JVM que as classes compiladas residem na pasta bin.", "java ____ App"),
        o("Ordene a resolução de uma classe pela JVM quando o classpath está configurado:", ["A JVM recebe o pedido para carregar a classe informada no comando","O ClassLoader examina ordenadamente cada caminho especificado no classpath","O arquivo .class correspondente é localizado na pasta de destino","Os bytes da classe são lidos e integrados à área de memória do runtime"], "Entender a mecânica do ClassLoader evita erros recorrentes de classe não encontrada."),
        p("Associe o elemento do Classpath ao seu respectivo significado de configuração:", [["-cp bin","Instrui a JVM a buscar classes compiladas dentro da pasta bin"],[".","Indica o diretório corrente de trabalho na hierarquia de busca"],["libs/*","Inclui todos os arquivos compactados .jar presentes na pasta libs"],["ClassNotFoundException","Exceção lançada quando a JVM não localiza o .class no classpath"]], "Configurar o classpath corretamente é a chave para rodar aplicações Java sem erros.")
        ]
      },
      {
        id: "jv-c01-u6-l3",
        title: "Execução de arquivos Java sem compilação prévia",
        subtitle: "Aprofundamento · execução direta de arquivos .java em versões modernas",
        theory: "Desde o Java 11, o comando java permite executar diretamente arquivos .java contendo código-fonte de classe única (ex: java App.java) sem necessidade de executar javac previamente no terminal. A compilação ocorre em memória de forma transparente.",
        questions: [
        q("Qual recurso foi introduzido no Java 11 para simplificar o aprendizado e testes rápidos de scripts?", "Capacidade de executar diretamente um arquivo .java com o comando java sem gerar .class no disco", ["Eliminação definitiva do método main em qualquer software","Execução de código sem ter o Java instalado"], "A funcionalidade Single-File Source-Code Programs permite rodar scripts Java diretamente pelo comando java."),
        q("Ao executar java App.java no Java 11+, o que acontece com o arquivo .class compilado?", "Ele é compilado em memória RAM de forma volátil, sem gravar nenhum arquivo .class no disco", ["Ele é gravado na pasta de documentos do sistema","Ele é enviado por e-mail para o desenvolvedor"], "A compilação em memória deixa a pasta limpa, ideal para scripts utilitários rápidos."),
        q("Qual comando executa diretamente o arquivo de script OláMundo.java em uma versão moderna do Java?", "java OláMundo.java", ["run OláMundo.java","execute OláMundo.java"], "Passar o nome completo com extensão .java instrui a JVM moderna a compilar e rodar em memória."),
        q("Qual é a limitação dessa execução direta de arquivo único no Java?", "Projetos complexos com dezenas de pacotes e dependências externas exigem build com Maven/Gradle", ["Não permite usar variáveis numéricas","Só funciona se o computador estiver desconectado da rede"], "A execução de arquivo único é voltada para scripts, protótipos e aprendizado inicial."),
        t("A partir de qual versão maior do Java é possível executar arquivos .java diretamente?", ["11"], "O Java 11 introduziu a especificação JEP 330 para programas Java em arquivo único.", "// Recurso introduzido no Java ____"),
        g("Complete o comando moderno que executa o arquivo de código-fonte diretamente sem compilar antes no disco:", ["java"], "O comando java com o arquivo .java compila e roda diretamente em memória.", "____ CalculadoraRapida.java"),
        o("Ordene o fluxo de execução direta de arquivo único no Java moderno (JEP 330):", ["O desenvolvedor digita java Script.java no terminal de comandos","A JVM detecta a extensão .java e compila o código em memória RAM","O bytecode volátil é verificado e carregado no ClassLoader","O método main é executado diretamente apresentando a saída ao usuário"], "A execução direta modernizou a experiência de escrita e experimentação em Java."),
        p("Associe a forma de execução ao seu respectivo comportamento operacional:", [["javac App.java seguido de java App","Fluxo clássico corporativo: gera artefato .class permanente no disco"],["java App.java","Fluxo moderno (Java 11+): compila em memória RAM sem salvar .class"],["Scripts utilitários","Cenário ideal para o uso de programas em arquivo único"],["Projetos empresariais","Utilizam ferramentas de automação como Maven e Gradle com múltiplos módulos"]], "Conhecer as duas modalidades de execução confere agilidade aos estudos e ao trabalho.")
        ]
      },
      {
        id: "jv-c01-u6-l4",
        title: "Empacotamento e execução de arquivos JAR",
        subtitle: "Aplicação · empacotamento e execução de arquivos JAR",
        theory: "Um arquivo JAR (Java Archive) é um pacote compactado no formato ZIP contendo arquivos .class e metadados. Um arquivo MANIFEST.MF define a classe principal que possui o método main. O comando java -jar executa o arquivo empacotado de maneira autônoma.",
        questions: [
        q("Qual é o formato de empacotamento padrão para distribuir aplicações compiladas em Java?", "Arquivo JAR (.jar)", ["Arquivo RAR (.rar)","Arquivo ISO (.iso)"], "O formato .jar agrupa bytecodes, imagens e configurações em um único arquivo compactado."),
        q("Qual arquivo interno de metadados no JAR especifica qual classe contém o método main de entrada?", "META-INF/MANIFEST.MF", ["config.txt","entrypoint.json"], "O manifesto MANIFEST.MF declara atributos como Main-Class para identificar o ponto de partida da aplicação."),
        q("Qual comando do terminal executa diretamente um arquivo JAR executável?", "java -jar meu-programa.jar", ["javac meu-programa.jar","java meu-programa.jar --start"], "A opção -jar instrui a JVM a ler o manifesto e executar a classe principal definida no arquivo."),
        q("Qual utilitário de linha de comando do JDK é utilizado para criar e manipular arquivos JAR?", "jar", ["zip-java","pack-jvm"], "A ferramenta jar do JDK cria, atualiza e extrai arquivos no formato Java Archive."),
        t("Qual flag do comando java é utilizada para executar um arquivo de pacote .jar?", ["-jar"], "A opção -jar informa à JVM que o alvo é um pacote executável autônomo.", "// Comando para executar pacote: java ____ aplicacao.jar"),
        g("Complete o comando para executar o pacote distribuível sistema.jar no terminal:", ["java -jar"], "java -jar é a instrução padrão para rodar aplicações empacotadas em Java.", "____ sistema.jar"),
        o("Ordene as etapas para compilar, empacotar e executar uma aplicação em formato JAR:", ["Compilar os arquivos de código-fonte .java gerando os arquivos .class","Criar o arquivo de manifesto declarando o atributo Main-Class correspondente","Executar a ferramenta jar para gerar o arquivo compactado app.jar","Distribuir e executar a aplicação com o comando java -jar app.jar"], "O empacotamento em JAR simplifica a distribuição e o deploy de software em Java."),
        p("Associe o conceito de empacotamento à sua função essencial na plataforma Java:", [["Arquivo .jar","Arquivo compactado ZIP contendo bytecodes e recursos da aplicação"],["MANIFEST.MF","Arquivo de manifesto com metadados e definição da classe Main-Class"],["java -jar","Comando para disparar uma aplicação encapsulada diretamente"],["jar cvfe","Comando do utilitário jar para criar arquivo especificando a classe principal"]], "O domínio de arquivos JAR é indispensável para a entrega de aplicações profissionais em Java.")
        ]
      },
      {
        id: "jv-c01-u6-l5",
        title: "Ciclo completo de execução na JVM",
        subtitle: "Revisão e desafio · ciclo completo de execução na JVM",
        theory: "A execução de um programa Java encerra uma jornada fascinante: escrita em .java, compilação estática em .class via javac, carregamento seguro por ClassLoaders na JVM, e interpretação inicial combinada com compilação Just-In-Time (JIT) para máxima velocidade em tempo de execução.",
        questions: [
        q("Qual componente da JVM compila trechos de bytecode altamente executados em código de máquina nativo?", "Compilador JIT (Just-In-Time)", ["Garbage Collector","Security Manager"], "O JIT monitora o código em tempo real e compila partes críticas (hotspots) diretamente em código nativo."),
        q("Qual é o lema histórico de portabilidade da plataforma Java garantido pela JVM?", "\"Write Once, Run Anywhere\" (Escreva uma vez, execute em qualquer lugar)", ["\"Write C++, Run on Windows\"","\"Compile Once, Delete Forever\""], "A JVM abstrai as peculiaridades do sistema operacional, permitindo que o mesmo bytecode rode em qualquer plataforma."),
        q("Qual componente da JVM gerencia a memória liberando objetos que não possuem mais referências ativas?", "Garbage Collector (GC)", ["Compilador javac","Desmontador javap"], "O coletor de lixo (GC) automatiza o gerenciamento de memória, prevenindo vazamentos comuns em C e C++."),
        q("Por que o bytecode Java é considerado intermediário?", "Porque não é nem código-fonte legível por humanos, nem código de máquina dependente de um hardware específico", ["Porque só funciona na metade dos computadores existentes","Porque é um formato que dura apenas 30 segundos na memória"], "Bytecode é uma representação binária abstrata, executada com segurança e rapidez pela JVM."),
        t("Qual componente da JVM compila dinamicamente bytecode frequente em código de máquina nativo?", ["JIT"], "O compilador JIT (Just-In-Time) garante alta performance durante a execução.", "// Compilador interno da JVM: ____"),
        g("Complete o acrônimo da máquina que executa bytecodes Java em qualquer sistema operacional:", ["JVM"], "A JVM (Java Virtual Machine) é o ambiente de execução da plataforma Java.", "// Maquina Virtual Java: ____"),
        o("Ordene a jornada completa de uma instrução Java desde o teclado até o processador:", ["O desenvolvedor digita código-fonte com tipagem estática no arquivo .java","O compilador javac valida a sintaxe e produz o arquivo de bytecode .class","O runtime java inicializa a JVM e carrega a classe pelo ClassLoader","O motor da JVM executa o bytecode via interpretação e otimização por JIT"], "Essa arquitetura em camadas une segurança, portabilidade e performance em larga escala."),
        p("Associe o pilar da arquitetura Java à sua responsabilidade primordial:", [["JVM","Máquina virtual que executa bytecodes com isolamento e segurança"],["JIT","Compila trechos frequentes de bytecode em código de máquina nativo"],["Garbage Collector","Gerencia a alocação e liberação automática de memória na heap"],["ClassLoader","Carrega classes compiladas do disco ou da rede para a memória da JVM"]], "Entender a máquina virtual Java capacita o programador a criar aplicações robustas e escaláveis.")
        ]
      }
    ],
    7: [
      {
        id: "jv-c01-u7-l1",
        title: "Saída de dados formatada com System.out",
        subtitle: "Apresentação · saída formatada com System.out",
        theory: "A classe System oferece o fluxo estático System.out para exibição no console. O método println() imprime o conteúdo e salta uma linha, print() imprime sem quebra, e printf() permite interpolação com especificadores de formato (%s para strings, %d para inteiros, %.2f para decimais).",
        questions: [
        q("Qual método de System.out imprime a mensagem fornecida e avança o cursor para a linha seguinte?", "System.out.println()", ["System.out.print()","System.out.writeChar()"], "println adiciona automaticamente uma quebra de linha ao final da mensagem.", "System.out.println(\"Linha concluida\");"),
        q("Qual especificador de formato no método printf é utilizado para interpolar valores inteiros?", "%d", ["%s","%f"], "O marcador %d (decimal integer) formata números inteiros no método printf.", "int idade = 20;\nSystem.out.printf(\"Idade: %d anos%n\", idade);"),
        q("Qual especificador de formato formata números com ponto flutuante exibindo exatamente duas casas decimais?", "%.2f", ["%2d","%s.2"], "%.2f especifica formatação com duas casas após a vírgula para números decimais."),
        q("Qual caractere de escape no printf gera uma quebra de linha independente do sistema operacional?", "%n", ["\\t","%b"], "%n produz a quebra de linha nativa do sistema em que a JVM está rodando (CRLF no Windows, LF no Linux)."),
        t("Qual método de System.out permite imprimir textos com especificadores de formato?", ["printf"], "printf (print formatted) interpola variáveis com precisão e controle de layout.", "// Saida formatada: System.out.____(\"Total: %.2f\", valor);"),
        g("Complete o comando para imprimir um texto no console sem quebrar a linha ao final:", ["print"], "O método print() mantém o cursor na mesma linha para a próxima exibição.", "System.out.____(\"Digite seu nome: \");"),
        o("Ordene as instruções para exibir um resumo financeiro formatado com duas casas decimais:", ["Declarar a variável double contendo o valor monetário total","Invocar o método System.out.printf no código Java","Inserir a string de formato com o especificador %.2f e a quebra %n","Passar a variável numérica como argumento após a string de formato"], "A formatação correta de saídas confere polimento e clareza a relatórios em console."),
        p("Associe o especificador de formato do printf ao tipo de dado que ele representa:", [["%d","Formata valores numéricos inteiros (int, long, short)"],["%s","Formata sequências textuais e objetos convertidos em String"],["%.2f","Formata números decimais com exatamente duas casas de precisão"],["%n","Insere quebra de linha portátil de acordo com o sistema operacional"]], "O uso correto de especificadores de formato viabiliza interfaces de terminal elegantes.")
        ]
      },
      {
        id: "jv-c01-u7-l2",
        title: "Leitura de dados do teclado com a classe Scanner",
        subtitle: "Prática guiada · leitura de dados com a classe Scanner",
        theory: "A classe Scanner, localizada no pacote java.util, lê dados a partir de fluxos de entrada como System.in. Para utilizá-la, devemos importá-la com import java.util.Scanner;, instanciá-la com new Scanner(System.in) e chamar métodos como nextLine(), nextInt() ou nextDouble().",
        questions: [
        q("Qual instrução de importação deve ser adicionada no topo do arquivo para utilizar a classe Scanner?", "import java.util.Scanner;", ["import java.io.Printer;","import java.lang.Keyboard;"], "Scanner pertence ao pacote java.util e requer importação explícita.", "import java.util.Scanner;"),
        q("Qual fluxo padrão do sistema é repassado ao construtor do Scanner para ler digitações do teclado?", "System.in", ["System.out","System.err"], "System.in representa a entrada padrão do console conectada ao teclado do usuário."),
        q("Qual método da classe Scanner lê uma linha inteira de texto digitada pelo usuário até o Enter?", "nextLine()", ["nextInt()","nextChar()"], "nextLine() consome e retorna todos os caracteres digitados até a quebra de linha."),
        q("Qual método da classe Scanner faz a leitura direta de um número inteiro no console?", "nextInt()", ["nextString()","nextBoolean()"], "nextInt() interpreta a próxima sequência de dígitos do fluxo de entrada como um int."),
        t("Qual pacote do Java contém a classe Scanner utilizada para leitura de dados?", ["java.util"], "A classe Scanner reside no pacote utilitário central java.util.", "// Importacao: import ____.Scanner;"),
        g("Complete a instanciação do Scanner associando-o à entrada padrão do teclado:", ["System.in"], "System.in fornece o fluxo de bytes digitados no console para o leitor.", "Scanner leitor = new Scanner(____);"),
        o("Ordene os passos para ler e exibir o nome informado por uma pessoa no console:", ["Importar a classe Scanner do pacote java.util no início do arquivo","Instanciar o objeto Scanner associado ao fluxo padrão System.in","Solicitar o nome com System.out.print e ler a resposta com leitor.nextLine()","Exibir uma saudação personalizada utilizando o texto lido"], "Seguir a sequência canônica de leitura com Scanner evita bloqueios inesperados de entrada."),
        p("Associe o método da classe Scanner ao tipo de dado que ele captura do fluxo:", [["nextLine()","Lê uma linha completa de texto digitada pelo usuário"],["nextInt()","Lê o próximo valor numérico e o converte para int"],["nextDouble()","Lê o próximo número decimal de ponto flutuante"],["nextBoolean()","Lê o próximo token avaliando como true ou false"]], "Escolher o método de leitura correto do Scanner garante parsing confiável no terminal.")
        ]
      },
      {
        id: "jv-c01-u7-l3",
        title: "Tratamento do buffer e conversão de entradas",
        subtitle: "Aprofundamento · conversão de tipos de entrada e validações",
        theory: "Ao chamar nextInt() antes de nextLine(), a tecla Enter digitada pelo usuário permanece pendente no buffer do teclado. Para evitar que o próximo nextLine() leia essa quebra de linha vazia, devemos consumir o buffer com uma chamada extra a nextLine() ou usar Integer.parseInt().",
        questions: [
        q("O que acontece se chamarmos leitor.nextInt() e imediatamente depois leitor.nextLine()?", "O nextLine() consome o Enter restante no buffer e retorna uma string vazia imediatamente", ["O programa encerra com erro irrecuperável de memória","O terminal apaga todo o texto anterior da tela"], "nextInt() consome apenas os dígitos, deixando o caractere de nova linha (Enter) pendente no buffer."),
        q("Qual é a solução consagrada para evitar o problema de quebra de linha pendente após nextInt()?", "Fazer uma chamada leitor.nextLine() para consumir a quebra pendente antes da próxima leitura", ["Reiniciar a máquina virtual Java a cada pergunta","Proibir o usuário de pressionar a tecla Enter"], "Uma chamada vazia a nextLine() esvazia o buffer residual, liberando a leitura seguinte."),
        q("Qual método estático de Integer converte uma string de texto contendo dígitos em um valor int primitivo?", "Integer.parseInt()", ["Integer.toString()","Integer.castInt()"], "Integer.parseInt() converte representações textuais em inteiros primitivos."),
        q("Qual exceção é lançada por Integer.parseInt(\"abc\") quando o texto não contém um número válido?", "NumberFormatException", ["NullPointerException","IndexOutOfBoundsException"], "Se a string contiver caracteres alfabéticos ou formato inválido, NumberFormatException é disparada."),
        t("Qual exceção ocorre quando Integer.parseInt tenta converter um texto não numérico?", ["NumberFormatException"], "NumberFormatException sinaliza que a conversão de string para número falhou.", "// Tentativa de converter texto invalido dispara: ____"),
        g("Complete o comando para converter a string idadeTexto para o tipo primitivo int:", ["Integer.parseInt"], "Integer.parseInt converte strings com dígitos em números inteiros.", "int idade = ____(idadeTexto);"),
        o("Ordene a rotina recomendada para ler dados numéricos evitando sujeira de buffer:", ["Ler a resposta do usuário sempre como texto através do método nextLine()","Validar se o texto recebido não está em branco com o método trim()","Converter a string resultante para o número desejado com Integer.parseInt()","Prosseguir com os cálculos matemáticos seguros na lógica do programa"], "Ler linhas completas e converter manualmente com parseInt é o padrão mais seguro contra bugs de buffer."),
        p("Associe a técnica de conversão ao seu benefício na leitura de entradas de usuário:", [["Integer.parseInt()","Converte texto em int primitivo validando o formato numérico"],["Double.parseDouble()","Converte texto em double primitivo para operações com decimais"],["Consumo com nextLine()","Esvazia o caractere de nova linha residual deixado por nextInt()"],["leitor.hasNextInt()","Verifica previamente se o próximo token é um inteiro sem travar a leitura"]], "Tratar o buffer e converter tipos com método previne dores de cabeça recorrentes em Java.")
        ]
      },
      {
        id: "jv-c01-u7-l4",
        title: "Fechamento de recursos e try-with-resources",
        subtitle: "Aplicação · fluxo interativo com Scanner e fechamento de recursos",
        theory: "Objetos que manipulam fluxos de entrada implementam a interface AutoCloseable. O recurso try-with-resources, introduzido no Java 7, garante que o Scanner e seus fluxos associados sejam fechados automaticamente ao término do bloco, prevenindo vazamentos de recursos no sistema operacional.",
        questions: [
        q("Qual estrutura da linguagem Java garante o fechamento automático de recursos ao final do bloco?", "try-with-resources", ["synchronized block","while infinito"], "O try-with-resources declara o recurso entre parênteses logo após o try, fechando-o automaticamente.", "try (Scanner leitor = new Scanner(System.in)) {\n  // uso seguro\n}"),
        q("Qual interface uma classe deve implementar para poder ser gerenciada pelo try-with-resources?", "AutoCloseable (ou Closeable)", ["Serializable","Cloneable"], "Qualquer classe que implemente java.lang.AutoCloseable pode ser declarada no cabeçalho do try."),
        q("O que acontece se uma aplicação abrir dezenas de fluxos de arquivos e nunca invocar o método close()?", "Ocorre vazamento de descritores de arquivos (resource leak), podendo esgotar os limites do sistema", ["O processador queima por sobrecarga de voltagem","O código-fonte é corrompido no disco rígido"], "Não fechar recursos de I/O bloqueia descritores no sistema operacional e degrada a performance."),
        q("Por que ao fechar um Scanner associado a System.in o fluxo padrão do teclado também é fechado?", "Porque o método close() do Scanner fecha em cascata o fluxo subjacente fornecido a ele", ["Porque a JVM desliga o teclado fisicamente","Porque o Java impede novas linhas de código"], "Fechar um leitor fecha o fluxo System.in; por isso em programas de console simples ele deve ser fechado apenas ao final."),
        t("Qual interface oficial permite o fechamento automático em blocos try-with-resources?", ["AutoCloseable"], "A interface AutoCloseable exige a implementação do método close().", "// Interface padrao para recursos gerenciados: java.lang.____"),
        g("Complete a sintaxe do try-with-resources que gerencia o ciclo do leitor Scanner:", ["try (Scanner leitor = new Scanner(System.in))"], "O recurso a ser liberado é declarado entre parênteses após a palavra-chave try.", "____ {\n  String texto = leitor.nextLine();\n}"),
        o("Ordene o fluxo de execução gerenciado por um bloco try-with-resources:", ["O recurso que implementa AutoCloseable é instanciado no cabeçalho do try","As instruções dentro do corpo do bloco try são executadas normalmente","Ao sair do bloco (com sucesso ou por exceção), a JVM invoca o método close()","Os descritores de sistema são liberados sem intervenção manual do desenvolvedor"], "A automação do fechamento de recursos confere confiabilidade e segurança a operações de I/O."),
        p("Associe o elemento do gerenciamento de recursos ao seu papel na estabilidade do sistema:", [["try-with-resources","Garante a invocação garantida do método close() ao sair do escopo"],["AutoCloseable","Contrato formal que define a existência do método close() na classe"],["leitor.close()","Invocação explícita que fecha o leitor e libera o fluxo de entrada"],["Resource Leak","Vazamento de recursos decorrente de fluxos não fechados adequadamente"]], "O domínio do try-with-resources diferencia o código amador de software corporativo de ponta.")
        ]
      },
      {
        id: "jv-c01-u7-l5",
        title: "Boas práticas de I/O em console e revisão",
        subtitle: "Revisão e desafio · boas práticas de I/O de console em Java",
        theory: "Um programa de console profissional deve oferecer prompts amigáveis antes de cada leitura, validar entradas numéricas com métodos defensivos (como hasNextInt()) e formatar os resultados com clareza. Essa disciplina constrói a fundação para lidar com I/O de arquivos e redes.",
        questions: [
        q("Qual método da classe Scanner verifica se o próximo valor digitado é um inteiro antes de lê-lo?", "hasNextInt()", ["isInt()","checkInt()"], "hasNextInt() inspeciona o token sem consumi-lo, permitindo validação condicional preventiva.", "if (leitor.hasNextInt()) {\n  int n = leitor.nextInt();\n}"),
        q("Por que é uma boa prática exibir uma mensagem clara com print() antes de ler uma entrada do usuário?", "Informa ao usuário o que é esperado dele, evitando que ele ache que o programa travou", ["Porque sem o print o comando Scanner não compila","Porque o console só aceita números se houver mensagem prévia"], "Prompts de texto orientam a interação humana e definem expectativas de formato de dados."),
        q("Qual fluxo estático da classe System é reservado especificamente para emitir mensagens de erro?", "System.err", ["System.out","System.panic"], "System.err direciona saídas de erro para o canal de erro padrão (stderr), frequentemente colorido em vermelho no terminal."),
        q("Qual é a diferença funcional entre os canais System.out e System.err?", "System.out envia saídas normais da aplicação, enquanto System.err canaliza mensagens e diagnósticos de falha", ["System.err só aceita texto em inglês","System.out só funciona quando executado como administrador"], "Separar stdout de stderr permite que scripts redirecionem relatórios e mensagens de erro para arquivos distintos."),
        t("Qual canal padrão da classe System é dedicado à exibição de mensagens de falha e erro?", ["System.err"], "System.err é o fluxo padrão de erros (stderr) da plataforma Java.", "// Canal de saida de erros: ____.println(\"Erro grave!\");"),
        g("Complete a instrução com o método que checa preventivamente se há um número inteiro no leitor:", ["hasNextInt"], "hasNextInt previne InputMismatchException validando antes do consumo.", "if (scanner.____()) {\n  int valor = scanner.nextInt();\n}"),
        o("Ordene a construção de um ciclo interativo seguro de leitura de dados no console:", ["Exibir mensagem de orientação solicitando o número inteiro desejado","Checar com hasNextInt() se o valor digitado condiz com o formato numérico","Ler o valor validado e executar o cálculo correspondente na lógica","Emitir o resultado formatado ou avisar em System.err se a entrada for inválida"], "A validação preventiva com hasNext impede travamentos por exceções de formato."),
        p("Associe o canal padrão da classe System à sua respectiva finalidade técnica:", [["System.in","Canal padrão de entrada (stdin), comumente ligado ao teclado"],["System.out","Canal padrão de saída (stdout), utilizado para emissão normal de dados"],["System.err","Canal padrão de erro (stderr), destinado a alertas e mensagens de falha"],["Scanner","Leitor utilitário que consome e converte bytes dos fluxos de entrada"]], "Dominar os canais de E/S é a porta de entrada para a programação de sistemas em Java.")
        ]
      }
    ],
    8: [
      {
        id: "jv-c01-u8-l1",
        title: "Erros de compilação versus exceções em runtime",
        subtitle: "Apresentação · erros de compilação versus exceções em runtime",
        theory: "Na plataforma Java, erros de compilação impedem a geração do bytecode pelo javac, acusando erros gramaticais ou incompatibilidade de tipos. Já as exceções em tempo de execução (runtime) ocorrem com o programa em execução na JVM, herdando de RuntimeException ou Exception.",
        questions: [
        q("Qual é a principal distinção temporal entre um erro reportado pelo javac e uma exceção da JVM?", "O erro do javac ocorre antes da geração do bytecode; a exceção da JVM ocorre enquanto o programa está rodando", ["O javac só aponta erros depois que o programa roda por 10 minutos","A JVM só aponta erros se o código estiver perfeito"], "Erros de compilação são estáticos; exceções em runtime manifestam-se na execução com dados reais."),
        q("Qual das opções abaixo representa um erro típico detectado estaticamente na fase de compilação?", "Tentar atribuir uma String literal a uma variável declarada como int", ["Dividir um número por zero em tempo de execução","Tentar ler um arquivo inexistente no disco"], "Incompatibilidade de tipos é barrada estaticamente pelo compilador javac."),
        q("Qual classe raiz da hierarquia Java representa qualquer evento anômalo que possa ser lançado?", "Throwable", ["ErrorCondition","Bug"], "java.lang.Throwable é a superclasse direta de Error e Exception no ecossistema Java.", "Throwable t = new Exception(\"Falha detectada\");"),
        q("Qual ramo da árvore de Throwable engloba problemas graves da JVM dos quais o programa não costuma se recuperar?", "Error (como OutOfMemoryError ou StackOverflowError)", ["CheckedException","UserWarning"], "Instâncias de Error sinalizam falhas catastróficas de infraestrutura do runtime da JVM."),
        t("Qual classe ancestral direta de Error e Exception encabeça a hierarquia de exceções em Java?", ["Throwable"], "Throwable é o tipo ancestral supremo de todos os erros e exceções tratáveis em Java.", "// Raiz da arvore de excecoes: java.lang.____"),
        g("Complete a instrução que instancia e dispara uma nova exceção em tempo de execução:", ["throw"], "A palavra-chave throw dispara a exceção interrompendo o fluxo comum.", "if (valor < 0) {\n  ____ new IllegalArgumentException(\"Valor negativo\");\n}"),
        o("Ordene a categorização de um problema desde a digitação até a execução do programa:", ["O programador comete um engano de sintaxe ou tipo no código-fonte","O compilador javac bloqueia o processo emitindo mensagem descritiva de erro","Após a correção, o código é compilado com sucesso em arquivos .class","A JVM executa o programa e pode disparar exceções caso receba dados anômalos"], "Compreender o momento de detecção dos erros torna o processo de desenvolvimento metódico."),
        p("Associe a categoria de problema em Java à sua característica correspondente:", [["Erro de compilação","Bloqueia a criação do arquivo .class apontando falha na sintaxe ou nos tipos"],["RuntimeException","Exceção não checada disparada pela JVM durante a execução do programa"],["Error (ex: StackOverflow)","Falha crítica da própria Máquina Virtual da qual a aplicação não se recupera"],["Checked Exception","Exceção que o compilador exige que seja explicitamente tratada ou declarada"]], "A hierarquia rigorosa de erros do Java confere segurança inigualável a sistemas corporativos.")
        ]
      },
      {
        id: "jv-c01-u8-l2",
        title: "Exceções comuns: NullPointer e ArrayIndexOutOfBounds",
        subtitle: "Prática guiada · diagnóstico de NullPointerException e ArrayIndexOutOfBounds",
        theory: "NullPointerException (NPE) ocorre quando invocamos um método ou acessamos atributos através de uma referência que aponta para null. ArrayIndexOutOfBoundsException acontece ao tentar ler ou gravar em um índice de array que não existe (negativo ou igual/maior que array.length).",
        questions: [
        q("O que causa a famosa exceção java.lang.NullPointerException no código Java?", "Tentar invocar um método ou ler um atributo em uma variável de referência que contém null", ["Declarar mais de três classes no mesmo projeto","Esquecer de instalar o compilador javac"], "Referenciar membros a partir de referências nulas é a causa primordial de NullPointerException.", "String texto = null;\ntexto.toUpperCase(); // Dispara NullPointerException"),
        q("Qual exceção ocorre ao tentar acessar numeros[5] em um array declarado como int[] numeros = new int[3];?", "ArrayIndexOutOfBoundsException", ["NullPointerException","ArithmeticException"], "Os índices válidos para tamanho 3 são 0, 1 e 2; o índice 5 está fora dos limites do array."),
        q("Em Java, os índices de coleções e arrays iniciam obrigatoriamente a partir de qual número?", "0 (zero-based indexing)", ["1","-1"], "Arrays em Java utilizam indexação baseada em zero; o primeiro elemento reside na posição 0."),
        q("Como prevenir de forma simples um NullPointerException antes de invocar um método sobre um objeto?", "Adicionar uma checagem condicional if (objeto != null) antes da invocação", ["Apagar a classe do projeto","Usar a palavra-chave const"], "Verificar se a referência é diferente de null previne a maioria das ocorrências de NPE."),
        t("Qual é o primeiro índice válido de qualquer array na plataforma Java?", ["0"], "Arrays utilizam indexação baseada em zero em Java, C, C# e JavaScript.", "// Primeiro elemento: array[____]"),
        g("Complete a verificação preventiva que impede a ocorrência de NullPointerException:", ["!= null"], "Checar se a referência não é nula evita a quebra imediata na invocação.", "if (usuario ____) {\n  System.out.println(usuario.getNome());\n}"),
        o("Ordene a verificação de segurança antes de acessar uma posição específica de um array:", ["Obter o tamanho total do array através da propriedade array.length","Validar se o índice desejado é maior ou igual a zero","Validar se o índice é estritamente menor do que array.length","Acessar com segurança o elemento contido naquela posição do array"], "A verificação rigorosa de limites afasta bugs de índice fora dos limites em tempo de execução."),
        p("Associe a exceção clássica de tempo de execução à sua respectiva causa no código:", [["NullPointerException","Invocação de método sobre uma referência cujo valor atual é null"],["ArrayIndexOutOfBoundsException","Acesso a uma posição de array inexistente ou fora dos limites"],["ArithmeticException","Operação aritmética matematicamente inválida, como divisão inteira por zero"],["InputMismatchException","Leitura com Scanner onde o token digitado não bate com o tipo esperado"]], "Diagnosticar exceções corriqueiras capacita o desenvolvedor a escrever código defensivo.")
        ]
      },
      {
        id: "jv-c01-u8-l3",
        title: "Leitura de stack trace e diagnóstico de causa raiz",
        subtitle: "Aprofundamento · leitura de stack traces e rastreamento de causa raiz",
        theory: "O stack trace (rastreamento de pilha) impresso pela JVM quando uma exceção não é tratada é o mapa do tesouro para o desenvolvedor. Ele lista a classe da exceção, a mensagem descritiva e a cadeia exata de métodos, arquivos e linhas percorridas até o momento do disparo.",
        questions: [
        q("O que a primeira linha de um stack trace emitido pela JVM informa ao desenvolvedor?", "A classe da exceção lançada e a mensagem descritiva que detalha a causa da falha", ["A quantidade de memória RAM disponível no computador","O horário em que o computador foi fabricado"], "A primeira linha traz a identificação do erro (ex: java.lang.ArithmeticException: / by zero)."),
        q("O que os blocos iniciados por \"at\" abaixo da mensagem no stack trace representam?", "As chamadas de métodos ativas na pilha, indicando a classe, o arquivo e o número exato da linha", ["As senhas criptografadas do banco de dados","Os programas instalados no menu Iniciar do Windows"], "Cada linha com \"at\" mostra o método que estava executando e o arquivo onde ele reside."),
        q("Em qual ponto do stack trace o programador deve focar primeiramente para corrigir um defeito?", "Na linha mais ao topo da lista que referencia uma classe do próprio código da sua aplicação", ["Na última linha que faz parte do código interno da JVM","Em nenhuma, pois o stack trace é gerado aleatoriamente"], "A linha do seu próprio código mais próxima do topo indica o exato local onde o problema eclodiu."),
        q("O que significa a cláusula \"Caused by:\" frequentemente encontrada em stack traces complexos?", "Indica a causa raiz original que provocou o encapsulamento e relançamento de uma nova exceção", ["Indica que o desenvolvedor causou o problema por imperícia","Indica que a placa de rede perdeu o sinal"], "A causa raiz (root cause) aponta a exceção primária original que desencadeou a sequência de falhas."),
        t("Qual cláusula de duas palavras no stack trace aponta a exceção primária original em cascata?", ["Caused by"], "A seção Caused by: expõe a causa raiz que originou a cadeia de exceções.", "// Exibicao no terminal: ____: java.io.IOException"),
        g("Complete o método que imprime o stack trace completo do objeto de erro no canal de erro:", ["printStackTrace"], "printStackTrace() exibe a pilha completa de execução associada àquela exceção.", "try {\n  processar();\n} catch (Exception e) {\n  e.____();\n}"),
        o("Ordene as etapas analíticas para interpretar um stack trace emitido pelo terminal:", ["Identificar a classe da exceção e a mensagem textual explicativa no topo do trace","Rastrear as linhas \"at\" buscando a primeira menção a uma classe do seu projeto","Abrir o arquivo fonte no editor exatamente no número da linha indicada","Examinar as variáveis envolvidas e implementar a proteção condicional ou tratamento"], "Saber ler o stack trace economiza horas de suposição e conduz direto à linha da falha."),
        p("Associe a parte constituinte do stack trace à sua utilidade no diagnóstico:", [["Nome da exceção","Revela a natureza técnica da falha (ex: NullPointerException)"],["Mensagem do erro","Fornece contexto específico do que causou a falha naquele instante"],["Linha \"at Pacote.Classe(Linha)\"","Aponta a coordenada geográfica exata do código onde a falha ocorreu"],["Caused by:","Mostra a exceção original encapsulada por frameworks em camadas"]], "A leitura cirúrgica de stack traces é a habilidade mestra de diagnóstico na plataforma Java.")
        ]
      },
      {
        id: "jv-c01-u8-l4",
        title: "Tratamento de exceções com try-catch-finally em Java",
        subtitle: "Aplicação · tratamento de exceções com blocos try-catch em Java",
        theory: "O tratamento estruturado de exceções em Java utiliza blocos try, catch e finally. O código sob risco é monitorado no try; falhas específicas são interceptadas em blocos catch correspondentes; e o bloco finally é executado incondicionalmente para encerramentos críticos.",
        questions: [
        q("Qual é a finalidade principal de capturar exceções com try-catch em vez de deixá-las quebrar o programa?", "Permitir que a aplicação se recupere com elegância, registre o ocorrido e continue atendendo o usuário", ["Tornar o código 100% livre de qualquer necessidade de teste","Permitir executar programas sem ter o Java instalado"], "Tratar exceções protege o usuário contra encerramentos abruptos e telas crípticas de erro."),
        q("Em que ordem os blocos catch devem ser organizados quando capturamos múltiplas exceções relacionadas?", "Das subclasses mais específicas para as superclasses mais genéricas", ["Da mais genérica Exception para a mais específica","A ordem não importa para o compilador"], "O Java exige que classes filhas venham antes de ancestrais genéricos para não ocultar os blocos inferiores."),
        q("O que acontece se uma exceção ocorrer dentro do try mas nenhum bloco catch corresponder ao tipo lançado?", "A exceção continua subindo a pilha de execução até encontrar outro tratador ou derrubar a thread", ["O programa finge que nada aconteceu e zera as variáveis","O compilador reescreve a classe automaticamente"], "Exceções não compatíveis com os blocos catch continuam propagando para o método chamador."),
        q("Qual recurso moderno do Java 7 permite capturar múltiplos tipos de exceções no mesmo bloco catch usando pipe (|)?", "Multi-catch (ex: catch (IOException | SQLException e))", ["Operador ternário","Expressão lambda"], "O multi-catch reduz duplicação de código ao tratar exceções distintas com a mesma rotina de recuperação."),
        t("Qual bloco do tratamento de exceções é executado sempre, ocorrendo ou não um erro?", ["finally"], "O bloco finally roda invariavelmente, sendo crucial para encerramentos e limpezas.", "try { conectar(); } catch (Exception e) { log(e); } ____ { desconectar(); }"),
        g("Complete o bloco catch para capturar a exceção aritmética de divisão por zero:", ["ArithmeticException"], "ArithmeticException captura divisões inteiras por zero.", "try {\n  int r = 10 / 0;\n} catch (____ e) {\n  System.out.println(\"Divisao por zero!\");\n}"),
        o("Ordene a organização estrutural completa de tratamento e limpeza em Java:", ["Abrir o bloco try contendo operações sensíveis de arquivo ou rede","Capturar exceções específicas (ex: FileNotFoundException) no primeiro catch","Capturar exceções genéricas remanescentes (ex: IOException) no catch seguinte","Garantir liberação e encerramento incondicional de conexões no bloco finally"], "A hierarquia ordenada de captura garante tratamento específico para cada categoria de falha."),
        p("Associe a palavra-chave de controle de fluxo de exceções ao seu respectivo papel:", [["try","Demarca o bloco de código protegido onde anomalias podem ser disparadas"],["catch","Intercepta exceções compatíveis e executa o plano de contingência"],["finally","Executa incondicionalmente ao final, garantindo rotinas de limpeza"],["throws","Declara na assinatura do método que ele pode propagar aquela exceção"]], "Tratar exceções com precisão é marca indelével de software confiável e resiliente.")
        ]
      },
      {
        id: "jv-c01-u8-l5",
        title: "Consolidação e encerramento do primeiro capítulo",
        subtitle: "Revisão e desafio · consolidação e encerramento do primeiro capítulo",
        theory: "Parabéns pela conclusão do primeiro capítulo de Java! Você percorreu o ciclo completo da linguagem: fundamentos da JVM, estrutura de classes e método main, compilação via javac, execução com java e classpath, I/O interativo com Scanner e printf, e depuração orientada a exceções.",
        questions: [
        q("Qual sequência sintetiza com exatidão a jornada canônica do desenvolvedor na plataforma Java?", "Código .java -> Compilação javac -> Bytecode .class -> Execução e JIT na JVM", ["Código .exe -> Compactação zip -> Leitura em C++","Script .html -> Browser -> Gravação em pendrive"], "Essa cadeia determinística é a espinha dorsal de todo o ecossistema empresarial da linguagem Java."),
        q("Qual benefício prático a forte tipagem estática e a JVM oferecem a sistemas bancários e de grande porte?", "Confiabilidade, previsibilidade de memória, segurança em runtime e alta performance sustentada", ["Visual mais colorido nas janelas do sistema operacional","Dispensa o uso de computadores com teclado"], "Robustez estática e gerenciamento maduro de memória fazem de Java o padrão ouro em missão crítica."),
        q("Qual é o próximo passo natural no aprendizado após dominar o ciclo de compilação e E/S em Java?", "Estudo aprofundado de tipos primitivos, estruturas condicionais e laços de repetição", ["Criação imediata de jogos 3D sem conhecer variáveis","Desinstalação do JDK para aprender outra linguagem"], "Consolidar tipos, operadores e estruturas de controle de fluxo forma a base para a Programação Orientada a Objetos."),
        q("Qual atitude define o programador maduro diante de um erro no terminal durante a compilação ou execução?", "Ler atentamente o nome da exceção, o arquivo e a linha no stack trace para diagnosticar a causa real", ["Deletar o projeto e recomeçar do zero sem ler a mensagem","Reclamar que o Java não funciona no seu computador"], "Mensagens de erro são ferramentas diagnósticas que apontam com exatidão cirúrgica onde agir."),
        t("Qual comando do JDK é utilizado para compilar o código Java em bytecode?", ["javac"], "javac compila o código-fonte humano em bytecode portátil.", "// Compilador oficial da linguagem Java: ____"),
        g("Complete a instrução com o comando de saída que celebra a conclusão do capítulo no terminal:", ["println"], "println finaliza a emissão adicionando quebra de linha comemorativa.", "System.out.____(\"Capitulo 1 de Java concluido com sucesso!\");"),
        o("Ordene os marcos fundamentais dominados ao longo deste primeiro capítulo de Java:", ["Compreensão do papel da JVM e da independência de plataforma com bytecode","Criação da primeira classe pública e assinatura do método estático main","Compilação via javac e execução da classe apontando o classpath correto","Manipulação de entradas e saídas de console e depuração estruturada de erros"], "Dominar esses quatro marcos consolida a fundação necessária para tópicos avançados em Java."),
        p("Associe o pilar fundamental do primeiro capítulo de Java ao seu valor técnico:", [["Compilação Estática","Garante tipagem rigorosa e detecção precoce de inconsistências"],["Máquina Virtual (JVM)","Proporciona portabilidade e otimização dinâmica via compilador JIT"],["Entrada com Scanner","Permite construir utilitários interativos com captura de dados do usuário"],["Tratamento de Exceções","Assegura tolerância a falhas e recuperação elegante em sistemas reais"]], "Com esses fundamentos consolidados, você está pronto para dominar qualquer desafio na linguagem Java.")
        ]
      }
    ]
  });
})();
