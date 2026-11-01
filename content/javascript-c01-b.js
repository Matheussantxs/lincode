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

  const lang = 'javascript';
  const chId = 'javascript-c01';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    5: [
      {
        id: "js-c01-u5-l1",
        title: "Extensão de arquivos e ambiente de edição",
        subtitle: "Apresentação · extensões e estrutura de arquivos .js",
        theory: "Arquivos de código JavaScript utilizam a extensão .js por padrão em projetos web e Node.js. Editores modernos como o VS Code oferecem realce de sintaxe, autocompletar inteligente e avisos de linting que facilitam a detecção precoce de erros estruturais no código.",
        questions: [
        q("Qual é a extensão convencional utilizada para salvar scripts em JavaScript puro?", ".js", [".script",".jscript"], "A extensão padronizada para scripts JavaScript em sistemas operacionais e navegadores é .js.", "console.log(\"Arquivo app.js carregado\");"),
        q("Qual benefício direto um editor com realce de sintaxe oferece ao desenvolvedor JavaScript?", "Diferencia visualmente palavras-chave, literais de texto e variáveis com cores específicas", ["Compila o script em binário executável do Windows","Garante que o código nunca terá erros lógicos em tempo de execução"], "O realce de sintaxe colore elementos gramaticais da linguagem, facilitando a leitura imediata."),
        q("Qual ferramenta estática é comumente integrada ao editor para apontar más práticas e estilos incorretos?", "Linter (como ESLint)", ["Desfragmentador de disco","Compactador ZIP"], "Linters analisam o código-fonte em tempo real apontando potenciais falhas de estilo ou bugs."),
        q("O que acontece se um arquivo de script for nomeado como script.txt em vez de script.js?", "O editor e as tags do navegador podem tratá-lo como texto sem formatação e sem realce padrão", ["O navegador recusa-se a abrir qualquer página HTML","O sistema operacional bloqueia o salvamento do arquivo"], "A extensão indica ao editor e aos servidores o MIME type correto para interpretação do arquivo."),
        t("Qual extensão de três caracteres deve ser atribuída a um arquivo de script padrão em JavaScript?", [".js"], "Arquivos JavaScript recebem a extensão .js por convenção universal da plataforma web.", "// Exemplo de arquivo: app.____"),
        g("Complete o comando com o nome do arquivo JavaScript principal padrão indicado no console:", ["app.js"], "app.js é o nome padrão mais consagrado para o ponto de entrada principal de um script.", "console.log(\"Inicializando o modulo: \" + \"____\");"),
        o("Ordene as etapas para criar e abrir um script JavaScript em um ambiente de desenvolvimento:", ["Criar um novo arquivo nomeado como index.js no diretório do projeto","Abrir o arquivo no editor de código com realce de sintaxe ativo","Digitar a instrução console.log(\"Ola mundo\"); no documento","Salvar as alterações no disco rígido com codificação UTF-8"], "A criação estruturada garante integridade dos arquivos e configuração adequada no ambiente."),
        p("Associe a extensão de arquivo à sua finalidade no ecossistema de desenvolvimento web:", [[".js","Arquivo contendo instruções e lógica em JavaScript"],[".html","Documento estrutural com marcação de conteúdo para o navegador"],[".css","Folha de estilos visuais e posicionamento de elementos"],[".json","Formato estruturado de troca e armazenamento de dados em texto"]], "Cada extensão reflete um propósito específico na pilha de tecnologias da web moderna.")
        ]
      },
      {
        id: "js-c01-u5-l2",
        title: "Organização de diretórios e caminhos relativos",
        subtitle: "Prática guiada · organização de scripts e pastas",
        theory: "Em projetos web organizados, scripts JavaScript costumam residir em pastas dedicadas como js ou scripts. Ao referenciar esses arquivos a partir do HTML ou de outros módulos, empregam-se caminhos relativos como ./js/app.js para garantir portabilidade em qualquer servidor.",
        questions: [
        q("Qual caminho relativo acessa corretamente o arquivo main.js localizado dentro de uma subpasta js?", "./js/main.js", ["../sistema/raiz/main.js","/disco_local/c/main.js"], "O prefixo ./ indica o diretório atual, seguido da subpasta js e do arquivo desejado."),
        q("O que significa o prefixo ../ em um caminho de importação ou referência de arquivo?", "Subir um nível na hierarquia de diretórios para a pasta pai", ["Acessar a pasta raiz do disco operacional","Criar uma pasta nova automaticamente"], "Dois pontos com barra (../) referenciam o diretório pai acima da pasta atual."),
        q("Por que é desaconselhável usar caminhos absolutos locais como C:\\projetos\\app.js na web?", "Porque o caminho absoluto falhará quando o projeto for hospedado na internet ou rodar em outro PC", ["Porque o JavaScript não permite caminhos com mais de 8 caracteres","Porque navegadores bloqueiam arquivos com letras maiúsculas"], "Caminhos absolutos locais quebram a portabilidade da aplicação em servidores remotos."),
        q("Qual convenção de nomenclatura de pastas é amplamente adotada para conter os arquivos de script?", "src ou js", ["binarios_exec","windows_system"], "As pastas src (source) e js são padrões da indústria para código-fonte JavaScript."),
        t("Qual símbolo de dois caracteres seguido de barra representa subir um nível no diretório?", ["../"], "O identificador ../ navega para a pasta imediatamente superior na árvore de arquivos.", "// Caminho para a pasta pai: ____/config.json"),
        g("Complete o caminho relativo para carregar o arquivo util.js dentro da pasta scripts atual:", ["./scripts/util.js"], "O caminho relativo parte da pasta corrente usando ./scripts/util.js.", "<script src=\"____\"></script>"),
        o("Ordene a resolução de um caminho relativo que sobe um nível e entra em outra pasta:", ["Identificar a pasta onde o arquivo HTML chamador está localizado","Subir para o diretório superior utilizando a instrução ../","Navegar para a subpasta de destino especificada no caminho","Localizar o arquivo JavaScript final alvo da importação"], "Compreender a resolução relativa de diretórios evita falhas de carregamento 404."),
        p("Associe o trecho de caminho relativo ao seu respectivo comportamento de navegação:", [["./app.js","Busca o arquivo app.js exatamente na mesma pasta do arquivo atual"],["./js/app.js","Entra na subpasta js a partir do diretório atual e busca o script"],["../app.js","Sobe um nível para a pasta pai e localiza o script"],["../../app.js","Sobe dois níveis na árvore de diretórios antes de localizar o arquivo"]], "Caminhos relativos permitem que a aplicação funcione em qualquer servidor sem ajustes.")
        ]
      },
      {
        id: "js-c01-u5-l3",
        title: "Codificação de caracteres UTF-8 e quebras de linha",
        subtitle: "Aprofundamento · codificação UTF-8 e quebras de linha",
        theory: "A codificação UTF-8 é o padrão absoluto para scripts JavaScript e documentos web. Salvar arquivos em UTF-8 evita corrupção de acentos em português e caracteres especiais. Sistemas operacionais também variam em quebras de linha: LF no Linux/macOS e CRLF no Windows.",
        questions: [
        q("Qual codificação de caracteres deve ser configurada no editor para salvar scripts com acentuação correta?", "UTF-8", ["ASCII puro de 7 bits","ISO-8859-1 incompatível"], "UTF-8 suporta todos os caracteres internacionais e evita problemas com palavras acentuadas.", "const mensagem = \"Olá, programação em português!\";"),
        q("Qual é a diferença entre quebras de linha LF e CRLF entre sistemas operacionais?", "LF usa apenas Line Feed (\\n), enquanto CRLF usa Carriage Return seguido de Line Feed (\\r\\n)", ["LF é exclusivo para áudio e CRLF é para vídeo","LF só funciona em servidores de banco de dados"], "Linux e macOS adotam LF (\\n), enquanto o ambiente Windows utiliza tradicionalmente CRLF (\\r\\n)."),
        q("O que acontece se uma string com acentos for salva em uma codificação legada e lida como UTF-8?", "Aparecem caracteres corrompidos conhecidos como mojibake na tela do usuário", ["O processador queima por sobrecarga de decodificação","O navegador converte os acentos em números primos"], "Incompatibilidade de charset distorce símbolos gráficos em caracteres ilegíveis."),
        q("Qual ferramenta de versionamento pode converter automaticamente finais de linha com core.autocrlf?", "Git", ["Navegador Chrome","Bloco de Notas"], "O Git oferece diretivas como core.autocrlf para harmonizar finais de linha entre equipes multiplataforma."),
        t("Qual sigla de codificação universal de caracteres é o padrão da web moderna?", ["UTF-8"], "UTF-8 é o padrão universal que abrange caracteres latinos, acentos, emojis e alfabetos globais.", "// Arquivo salvo em formato: ____"),
        g("Complete o escape de caractere que representa uma quebra de linha em strings JavaScript:", ["\\n"], "A sequência de escape \\n representa o caractere de nova linha (Line Feed).", "console.log(\"Linha 1____Linha 2\");"),
        o("Ordene as etapas para configurar a integridade de codificação em um projeto de software:", ["Configurar o editor de código para salvar arquivos em UTF-8 por padrão","Definir arquivo de configuração .editorconfig especificando charset e end_of_line","Configurar o controle de versão Git para tratamento consistente de finais de linha","Validar se textos acentuados e comentários são renderizados sem distorção"], "Padronização prévia do ambiente previne conflitos de caracteres em repositórios compartilhados."),
        p("Associe o termo de formatação ao seu significado no desenvolvimento de scripts:", [["UTF-8","Padrão universal de codificação com suporte completo a acentos e emojis"],["LF","Quebra de linha padrão do Unix e macOS baseada no caractere \\n"],["CRLF","Quebra de linha padrão do Windows baseada na sequência \\r\\n"],[".editorconfig","Arquivo que padroniza indentação e codificação entre diferentes editores"]], "Configurações de formatação mantêm uniformidade entre colaboradores no mesmo projeto.")
        ]
      },
      {
        id: "js-c01-u5-l4",
        title: "Separação de responsabilidades em múltiplos arquivos",
        subtitle: "Aplicação · modularização e carregamento local",
        theory: "Manter todo o código em um único arquivo gigantesco torna a manutenção inviável. A separação em módulos ou múltiplos scripts organiza funções por responsabilidade: cálculos matemáticos em um arquivo, manipulação de interface em outro e inicialização no script principal.",
        questions: [
        q("Qual é o benefício primário de dividir o código de uma aplicação web em múltiplos arquivos?", "Facilita a manutenção, legibilidade e reutilização de partes independentes do sistema", ["Reduz obrigatoriamente a velocidade de download de imagens","Permite que o navegador execute cálculos sem usar memória RAM"], "A modularidade isola responsabilidades, tornando o sistema testável e extensível."),
        q("Se o arquivo calculos.js declara a função somar(a, b), como ela se torna útil no projeto?", "Sendo carregada antes do script que precisa executar a operação de soma", ["Sendo excluída do servidor após o carregamento da página","Sendo convertida em folha de estilos CSS"], "Scripts dependentes precisam que as funções necessárias estejam carregadas na memória global ou importadas."),
        q("O que acontece se um script chamar uma função antes do arquivo que a define ter sido carregado?", "Ocorre ReferenceError indicando que o nome da função não foi encontrado", ["A função executa normalmente por telepatia do interpretador","O computador reinicia para tentar encontrar o arquivo"], "O interpretador JavaScript avalia o código sequencialmente; identificadores não declarados lançam erro."),
        q("Em que pasta costumam ficar funções utilitárias compartilhadas entre várias partes de um projeto?", "utils ou helpers", ["trash_bin","os_core"], "Pastas nomeadas utils ou helpers agrupam rotinas auxiliares reutilizáveis."),
        t("Qual tipo de erro é gerado no console ao invocar uma função cujo arquivo não foi carregado?", ["ReferenceError"], "ReferenceError ocorre quando tentamos acessar um identificador inexistente no escopo.", "somar(2, 3); // Lanca: ____: somar is not defined"),
        g("Complete a tag HTML com o atributo que especifica a origem do script externo:", ["src"], "O atributo src (source) aponta a localização do arquivo JavaScript no servidor.", "<script ____=\"js/matematica.js\"></script>"),
        o("Ordene a sequência recomendada de carregamento de scripts dependentes no documento:", ["Carregar biblioteca ou script com funções utilitárias auxiliares","Carregar script contendo as regras de negócio centrais da aplicação","Carregar script principal responsável pela inicialização do sistema","Disparar a execução inicial a partir do ponto de entrada configurado"], "Garantir a ordem de dependências impede falhas de referência na execução."),
        p("Associe a responsabilidade ao nome convencional do arquivo em uma arquitetura limpa:", [["math.js","Contém funções de cálculo numérico e operações matemáticas puras"],["ui.js","Contém manipulações visuais e atualização de dados na interface gráfica"],["storage.js","Gerencia a persistência e recuperação de dados no localStorage"],["app.js","Ponto de entrada que coordena a inicialização dos módulos do sistema"]], "Dividir responsabilidades por arquivos é o pilar da arquitetura de software manutenível.")
        ]
      },
      {
        id: "js-c01-u5-l5",
        title: "Boas práticas de estrutura de arquivos e revisão",
        subtitle: "Revisão e desafio · boas práticas de ambiente e arquivos",
        theory: "Organizar projetos web exige rigor: nomes de arquivos em letras minúsculas separados por hífen (kebab-case), ausência de espaços ou caracteres acentuados nos caminhos e uma estrutura clara de pastas. Esse cuidado previne inconsistências entre servidores Linux e máquinas Windows.",
        questions: [
        q("Por que é altamente recomendado nomear arquivos JavaScript em minúsculas como usuario-service.js?", "Porque servidores Linux diferenciam maiúsculas de minúsculas, evitando quebras de links em produção", ["Porque o interpretador JavaScript não consegue ler letras maiúsculas em arquivos","Porque nomes com maiúsculas ocupam o dobro de espaço no disco rígido"], "Sistemas de arquivos baseados em Unix são case-sensitive; padronizar em minúsculas evita bugs em deploys."),
        q("Qual padrão de nomenclatura utiliza palavras minúsculas separadas por traço?", "kebab-case", ["SCREAMING_SNAKE_CASE","PascalCase"], "O formato kebab-case (ex: meu-arquivo.js) é o padrão mais seguro e recomendado para URLs e arquivos web."),
        q("Qual é o risco de utilizar espaços em branco no nome de um arquivo como meu script.js na web?", "Espaços geram sequências como %20 em URLs e frequentemente causam falhas de carregamento em servidores", ["O arquivo é deletado automaticamente pelo antivírus do sistema","O navegador exige pagamento de licença para abrir o arquivo"], "Caracteres de espaço necessitam de codificação em URLs e frequentemente produzem erros 404."),
        q("Onde deve residir a documentação sobre como instalar e executar os scripts do projeto?", "Em um arquivo README.md na raiz do repositório", ["Escondida dentro do arquivo de estilos CSS","No histórico de chamadas do console"], "O arquivo README.md fornece instruções claras e padronizadas para qualquer desenvolvedor que acesse o projeto."),
        t("Qual convenção de formato de texto é chamada kebab-case em nomes de arquivos?", ["kebab-case"], "kebab-case utiliza palavras em minúsculas unidas por hífens, ideal para a web.", "// Exemplo de padrao seguro: relatorio-mensal.js (estilo ____)"),
        g("Complete o nome do arquivo de documentação padrão presente na raiz de projetos Git:", ["README.md"], "README.md é a convenção internacional para instruções e visão geral de projetos de código.", "// Arquivo de introducao: ____"),
        o("Ordene os critérios de auditoria para validar a estrutura de arquivos de um projeto antes do deploy:", ["Verificar se todos os arquivos utilizam apenas letras minúsculas e hífens","Assegurar que nenhum nome de arquivo ou diretório contém espaços ou acentos","Confirmar que todos os scripts foram salvos na codificação UTF-8","Validar se os caminhos relativos no HTML resolvem sem erros 404 de carregamento"], "A checagem preventiva de nomes e caminhos garante estabilidade multiplataforma."),
        p("Associe a convenção de nomenclatura ao seu respectivo exemplo prático:", [["kebab-case","calculadora-financeira.js (ideal para arquivos e rotas web)"],["camelCase","calcularImpostoTotal (ideal para funções e variáveis em JavaScript)"],["PascalCase","RelatorioContabil (ideal para nomes de classes e construtores)"],["UPPER_SNAKE","LIMITE_MAXIMO_TENTATIVAS (ideal para constantes globais fixas)"]], "Cada contexto no ecossistema JavaScript possui sua convenção estilística consolidada.")
        ]
      }
    ],
    6: [
      {
        id: "js-c01-u6-l1",
        title: "Visão geral de erros em JavaScript",
        subtitle: "Apresentação · tipos comuns de erros em JavaScript",
        theory: "Erros em JavaScript são representados por instâncias do objeto global Error e suas subclasses especializadas. Quando uma condição anômala é encontrada, uma exceção é lançada. Se não for capturada, o fluxo do script atual é interrompido e uma mensagem informativa aparece no console.",
        questions: [
        q("Qual objeto nativo serve de protótipo base para todas as exceções padronizadas em JavaScript?", "Error", ["FailCondition","BugTracker"], "Error é o construtor nativo que dá origem a erros específicos como TypeError e SyntaxError.", "const falha = new Error(\"Algo deu errado\");\nconsole.log(falha.name);"),
        q("O que acontece com a execução do script se uma exceção for lançada e não houver tratamento try/catch?", "A execução daquele fluxo de código é imediatamente interrompida e o erro é registrado no console", ["O computador entra em suspensão para evitar danos físicos","O JavaScript inventa um valor falso e continua executando sem avisar"], "Exceções não tratadas encerram o processamento subsequente da pilha atual de execução."),
        q("Qual propriedade de um objeto de erro contém o texto explicativo sobre o que falhou?", "message", ["secretDescription","soundEffect"], "A propriedade error.message armazena a string descritiva fornecida ao criar o erro."),
        q("Qual das opções abaixo representa uma subclasse nativa de Error em JavaScript?", "ReferenceError", ["MemoryFreezeError","PixelOverflowError"], "ReferenceError, TypeError, SyntaxError e RangeError são subclasses oficiais de Error."),
        t("Qual propriedade de uma instância de erro armazena a mensagem textual descritiva da falha?", ["message"], "A propriedade message fornece o detalhe explicativo do que motivou a exceção.", "const e = new Error(\"Falha na rede\");\nconsole.log(e.____); // Exibe: Falha na rede"),
        g("Complete a instrução usada para disparar intencionalmente uma nova exceção no código:", ["throw"], "A palavra-chave throw lança uma exceção interrompendo o fluxo normal.", "if (valor < 0) { ____ new Error(\"Valor nao pode ser negativo\"); }"),
        o("Ordene os eventos que ocorrem quando uma exceção é lançada em uma função sem captura:", ["A condição inválida é detectada durante a execução da linha de código","A instrução throw instancia e dispara um objeto derivado de Error","O interpretador interrompe a execução imediata da função corrente","O erro sobe a pilha de chamadas e é emitido no console do navegador"], "Compreender o percurso de uma exceção é essencial para depurar aplicações com precisão."),
        p("Associe a categoria de erro ao seu significado fundamental em JavaScript:", [["SyntaxError","Código viola as regras gramaticais da linguagem antes de ser executado"],["ReferenceError","Tentativa de ler ou escrever em uma variável que não existe no escopo"],["TypeError","Operação incompatível executada sobre um tipo de dado inadequado"],["RangeError","Valor numérico excede o intervalo permitido por uma função ou array"]], "Cada subclasse de erro sinaliza um tipo distinto de falha no desenvolvimento.")
        ]
      },
      {
        id: "js-c01-u6-l2",
        title: "SyntaxError versus ReferenceError",
        subtitle: "Prática guiada · SyntaxError versus ReferenceError",
        theory: "SyntaxError ocorre na fase de análise do código quando o interpretador encontra caracteres inválidos ou parênteses não fechados. Já o ReferenceError ocorre em tempo de execução quando o código tenta acessar um identificador que nunca foi declarado no escopo acessível.",
        questions: [
        q("Qual tipo de erro é gerado ao esquecer de fechar as chaves de um bloco de instrução no código?", "SyntaxError", ["ReferenceError","RangeError"], "Erros na gramática do código impedem a análise sintática, gerando SyntaxError.", "function teste() { console.log(\"ola\"); // falta fechar chave"),
        q("Qual tipo de erro ocorre ao executar console.log(precoTotal) se precoTotal nunca foi declarado?", "ReferenceError", ["SyntaxError","URIError"], "Tentar ler uma variável inexistente dispara ReferenceError em tempo de execução."),
        q("Em que momento o interpretador identifica um erro do tipo SyntaxError em um script comum?", "Na fase de parsing e compilação inicial, antes mesmo de executar qualquer linha do arquivo", ["Apenas após o usuário clicar em um botão na tela","Somente quando a memória do computador atinge 100% de uso"], "A análise sintática precede a execução; se houver SyntaxError, nada do script é executado."),
        q("O que acontece se você declarar let x; e depois executar console.log(x); no terminal?", "Exibe undefined normalmente, sem disparar ReferenceError", ["Dispara ReferenceError porque x não possui texto atribuído","Lança SyntaxError por ausência de valor"], "A variável existe no escopo, logo não há ReferenceError; seu valor inicial é undefined."),
        t("Qual erro é disparado ao invocar uma variável que não foi declarada em nenhum escopo?", ["ReferenceError"], "O interpretador avisa que a referência não foi localizada no escopo corrente.", "console.log(variavelInexistente); // Gera: ____"),
        g("Complete o código para corrigir a declaração e evitar o ReferenceError:", ["let"], "Declarar a variável no escopo com let ou const evita o ReferenceError.", "____ contador = 10;\nconsole.log(contador);"),
        o("Ordene a análise que o interpretador faz ao encontrar um script com erro gramatical:", ["O motor do navegador recebe o arquivo de texto para processamento","A etapa de parsing analisa a gramática e a estrutura dos tokens de código","O analisador detecta parêntese ou operador ausente e interrompe a leitura","O console emite SyntaxError indicando a linha e coluna exatas da infração"], "SyntaxErrors são barrados precocemente na fase de compilação/análise do motor JS."),
        p("Associe o fragmento de código ao tipo de erro que ele inevitavelmente produz:", [["console.log(\"Oi\"","SyntaxError (falta fechar o parêntese da função)"],["console.log(taxaJuros);","ReferenceError (taxaJuros nunca foi declarada)"],["let 1a = 10;","SyntaxError (identificadores não podem iniciar com dígitos)"],["usuario.nome = \"Ana\";","ReferenceError (se o objeto usuario não existir no escopo)"]], "Diferenciar falhas de sintaxe e de referência acelera a correção de bugs no dia a dia.")
        ]
      },
      {
        id: "js-c01-u6-l3",
        title: "TypeError e leitura da pilha de chamadas",
        subtitle: "Aprofundamento · TypeError e leitura de stack trace",
        theory: "TypeError acontece quando uma operação é incompatível com o tipo de dado fornecido, como tentar invocar null() como função ou ler propriedades de undefined. A pilha de chamadas (stack trace) mostra a linha do erro e a cadeia de funções executadas até o momento da falha.",
        questions: [
        q("Qual exceção ocorre ao tentar executar a instrução const x = null; x(); no console?", "TypeError", ["ReferenceError","SyntaxError"], "null não é uma função chamável; tentar invocá-lo como tal gera TypeError.", "const acao = null;\nacao();"),
        q("O que a mensagem \"Cannot read properties of undefined (reading 'nome')\" significa?", "O código tentou acessar a propriedade nome em um valor que atualmente é undefined", ["A variável nome foi apagada pelo antivírus do computador","O navegador não tem permissão para ler strings em português"], "Acessar propriedades em null ou undefined é a causa número um de TypeError em JavaScript."),
        q("O que a pilha de chamadas (stack trace) exibida abaixo da mensagem de erro indica?", "A sequência exata de funções e linhas de código percorridas até o disparo da exceção", ["O histórico de todos os sites acessados pelo usuário na internet","A lista de todos os arquivos salvos na pasta Downloads"], "O stack trace rastreia o caminho de chamada função por função até a origem do problema."),
        q("Qual operador moderno do JavaScript permite acessar propriedades com segurança sem disparar TypeError se o objeto for nulo?", "Encadeamento opcional (?.)", ["Incremento duplo (++)","Negação lógica (!)"], "O operador de encadeamento opcional (?.) avalia como undefined em vez de lançar TypeError se o alvo for null ou undefined."),
        t("Qual tipo de erro ocorre ao tentar chamar uma propriedade numérica como se fosse uma função?", ["TypeError"], "Invocar um número como função viola as capacidades do tipo primitivo, lançando TypeError.", "const idade = 25;\nidade(); // Dispara: ____: idade is not a function"),
        g("Complete com o operador de encadeamento opcional que previne TypeError em dados nulos:", ["?."], "O encadeamento opcional ?. evita exceções ao ler propriedades de valores possivelmente nulos.", "const nome = usuario____endereco?.cidade;"),
        o("Ordene os passos para inspecionar um TypeError utilizando o stack trace do console:", ["Ler atentamente a mensagem principal do erro para entender qual tipo foi violado","Observar a primeira linha do stack trace para identificar o arquivo e a linha do disparo","Abrir a linha indicada no editor e examinar os valores das variáveis que a compõem","Inserir validação preventiva ou encadeamento opcional para assegurar dados válidos"], "A leitura metódica do stack trace economiza horas de suposição durante a depuração."),
        p("Associe a mensagem clássica de erro à causa correspondente no código JavaScript:", [["is not a function","Tentativa de invocar uma variável que guarda número, texto ou objeto"],["Cannot read properties of null","Tentativa de acessar propriedade em uma variável cujo valor é null"],["Assignment to constant variable","Tentativa de reatribuir um novo valor a uma variável declarada com const"],["Maximum call stack size exceeded","Recursão infinita que estourou a memória da pilha de chamadas"]], "Interpretar mensagens de erro transforma mensagens intimidadoras em correções rápidas.")
        ]
      },
      {
        id: "js-c01-u6-l4",
        title: "Depuração com console e linhas de comando",
        subtitle: "Aplicação · depuração orientada a linhas e mensagens",
        theory: "Depurar é o processo metódico de localizar e remover anomalias no código. O console do navegador disponibiliza console.warn() para alertas, console.error() para falhas graves, console.table() para dados tabulares e a instrução debugger para pausar a execução em um ponto exato.",
        questions: [
        q("Qual instrução em JavaScript faz o navegador pausar a execução e abrir o depurador nas Ferramentas do Desenvolvedor?", "debugger;", ["pauseNow();","haltComputer();"], "A palavra-chave debugger age como um ponto de interrupção (breakpoint) no navegador se o DevTools estiver aberto."),
        q("Qual método do console formata listas de objetos em uma tabela visual organizada por colunas?", "console.table()", ["console.columns()","console.grid()"], "console.table() exibe arrays de objetos de forma clara e estruturada no console."),
        q("Qual é a principal desvantagem de depender exclusivamente de console.log() para depurar sistemas grandes?", "Polui o código-fonte com impressões temporárias que podem ser esquecidas e enviadas para produção", ["Consome toda a memória do processador permanentemente","Impede que o código seja compactado em formato zip"], "Logs provisórios acumulam ruído e revelam dados internos se não forem higienizados antes da entrega."),
        q("Qual método do console imprime o stack trace atual sem a necessidade de lançar um erro?", "console.trace()", ["console.history()","console.path()"], "console.trace() registra no console a trilha completa de chamadas ativas no momento."),
        t("Qual palavra-chave do JavaScript pausa a execução do código no DevTools quando aberto?", ["debugger"], "debugger suspende o script permitindo inspecionar variáveis passo a passo.", "// Pausa a execucao aqui:\n____;"),
        g("Complete o comando do console utilizado para exibir alertas visuais destacados em amarelo:", ["warn"], "console.warn() destaca mensagens com ícone de aviso e fundo amarelado.", "console.____(\"Aviso: este recurso sera descontinuado em breve.\");"),
        o("Ordene os passos de uma sessão eficiente de depuração com pontos de interrupção:", ["Abrir as Ferramentas do Desenvolvedor na aba Fontes (Sources)","Localizar o arquivo do script e inserir um breakpoint na linha suspeita","Interagir com a página para disparar a execução do fluxo desejado","Inspecionar o valor das variáveis na barra lateral enquanto o código está pausado"], "Depurar com breakpoints visuais é infinitamente superior a tentativas cegas no escuro."),
        p("Associe o método do console ao seu formato visual característico:", [["console.error()","Emite mensagem com fundo avermelhado e ícone de erro crítico"],["console.warn()","Emite mensagem com fundo amarelado e triângulo de alerta"],["console.table()","Renderiza coleção de dados em formato de planilha bidimensional"],["console.trace()","Imprime a cadeia de funções ativas na pilha no momento da chamada"]], "Conhecer os métodos do console enriquece a capacidade diagnóstica do desenvolvedor.")
        ]
      },
      {
        id: "js-c01-u6-l5",
        title: "Diagnóstico preventivo e tratamento estruturado",
        subtitle: "Revisão e desafio · diagnóstico preventivo e tratamento",
        theory: "Tratamento de exceções com blocos try, catch e finally permite que o programa se recupere graciosamente de falhas imprevistas. Erros previsíveis devem ser tratados ou validados preventivamente, garantindo que o usuário receba mensagens amigáveis em vez de uma tela quebrada.",
        questions: [
        q("Qual bloco de código é executado obrigatoriamente, ocorra ou não uma exceção no bloco try?", "finally", ["always","retry"], "O bloco finally executa invariavelmente ao final, ideal para liberar recursos e resetar estados.", "try { conectar(); } catch (e) { alert(e); } finally { desconectar(); }"),
        q("Qual variável recebe o objeto de erro capturado na cláusula catch?", "A variável declarada nos parênteses do catch (como em catch (erro))", ["A variável global window.lastBug","Nenhuma, o erro é apagado da memória"], "O identificador passado ao catch recebe a instância da exceção disparada no bloco try."),
        q("Por que é uma má prática escrever blocos catch vazios sem registrar nem tratar a exceção?", "Porque silencia falhas críticas, tornando quase impossível diagnosticar o motivo de bugs em produção", ["Porque o JavaScript gera SyntaxError se o catch não tiver instruções","Porque o navegador recarrega a página automaticamente"], "Silenciar exceções mascara defeitos que continuarão se propagando pelo sistema silenciosamente."),
        q("Quando se deve preferir validação condicional com if em vez de try/catch?", "Para checar condições esperadas e frequentes como validar se um campo de formulário foi preenchido", ["Apenas em sistemas operacionais legados de 32 bits","Nunca, todo if deve ser substituído por try/catch"], "try/catch deve ser reservado para situações excepcionais e operações incertas (como rede ou parse de JSON)."),
        t("Qual cláusula do try/catch é executada sempre, mesmo após o término bem-sucedido ou com erro?", ["finally"], "O bloco finally roda sempre, sendo perfeito para rotinas de limpeza e encerramento.", "try { processar(); } catch(e) { log(e); } ____ { fechar(); }"),
        g("Complete o bloco utilizado para capturar exceções disparadas dentro do escopo protegido:", ["catch"], "O bloco catch intercepta a exceção e permite executar uma rota de recuperação.", "try {\n  analisarDados();\n} ____ (erro) {\n  console.error(\"Falha ao analisar:\", erro.message);\n}"),
        o("Ordene a estrutura completa de proteção e recuperação de erros em JavaScript:", ["Abrir o bloco try contendo as operações potencialmente arriscadas","Definir o bloco catch (erro) para interceptar e tratar possíveis exceções","Fornecer mensagem compreensível de feedback ou alternativa de dados ao usuário","Encerrar com o bloco finally executando a limpeza e fechamento de conexões"], "A estrutura try-catch-finally garante robustez e resiliência em aplicações web."),
        p("Associe o componente do mecanismo de exceções ao seu papel defensivo:", [["try","Contém as instruções monitoradas onde exceções podem ocorrer"],["catch","Captura e trata a exceção gerada, evitando a queda do programa"],["finally","Executa invariavelmente ao término, garantindo liberação de recursos"],["throw","Instancia e lança intencionalmente uma exceção ao detectar estado inválido"]], "O uso correto do mecanismo de exceções assegura confiabilidade à aplicação web.")
        ]
      }
    ],
    7: [
      {
        id: "js-c01-u7-l1",
        title: "Inclusão de scripts na página HTML",
        subtitle: "Apresentação · inclusão de scripts com tag script",
        theory: "A tag <script> é o elo que conecta o código JavaScript a uma página HTML. O código pode ser escrito inline diretamente entre a abertura e fechamento da tag, ou referenciar um arquivo externo por meio do atributo src. Arquivos externos facilitam cache e organização.",
        questions: [
        q("Qual elemento HTML é utilizado para incorporar ou referenciar scripts JavaScript em um documento?", "<script>", ["<javascript>","<code>"], "A tag padronizada pelo consórcio W3C para inclusão de scripts é <script>.", "<script src=\"app.js\"></script>"),
        q("Qual atributo da tag <script> indica a localização do arquivo externo de script a ser carregado?", "src", ["href","link"], "O atributo src define a URI do arquivo externo contendo o código JavaScript."),
        q("Qual é a principal vantagem de usar arquivos de script externos em vez de código inline no HTML?", "Permite que o navegador armazene o script em cache, reduzindo o tempo de carregamento de visitas seguintes", ["Garante que o script rode mesmo se o JavaScript estiver desativado no navegador","Aumenta obrigatoriamente a memória de vídeo do computador"], "Scripts externos são cacheados pelos navegadores e desacoplam marcação visual de lógica."),
        q("O que acontece se uma tag possuir simultaneamente o atributo src e código inline entre as tags?", "O código inline interno é totalmente ignorado pelo navegador e apenas o arquivo do src é executado", ["Os dois códigos são mesclados aleatoriamente pelo motor do navegador","O navegador gera SyntaxError e bloqueia a aba"], "A especificação HTML dita que se o atributo src estiver presente, o conteúdo inline é descartado."),
        t("Qual atributo da tag script especifica o caminho para um arquivo JavaScript externo?", ["src"], "O atributo src (source) aponta para o endereço do script a ser baixado.", "<script ____=\"scripts/principal.js\"></script>"),
        g("Complete a tag de fechamento obrigatória após referenciar um script externo no HTML:", ["</script>"], "A tag script em HTML requer fechamento explícito com </script>.", "<script src=\"app.js\">____"),
        o("Ordene a estrutura recomendada de um documento HTML ao integrar um script externo:", ["Declarar a tag doctype e a estrutura básica com as tags html e head","Montar o conteúdo visual da página dentro do elemento body","Incluir a tag script referenciando o arquivo externo na posição adequada","Salvar os arquivos e testar a integração visualizando o console do navegador"], "A montagem estruturada garante que o script encontre os elementos da página disponíveis."),
        p("Associe a forma de inclusão à sua característica primordial na arquitetura web:", [["Script externo (src)","Mantém código em arquivo isolado, aproveitando o cache HTTP do navegador"],["Script inline","Código escrito diretamente dentro do HTML, útil apenas para configurações pontuais"],["Tag no head","Carrega o script antes do início da renderização do corpo da página"],["Tag no final do body","Permite que o conteúdo HTML seja renderizado antes do bloqueio do script clássico"]], "Saber onde e como incluir scripts impacta diretamente a performance da aplicação.")
        ]
      },
      {
        id: "js-c01-u7-l2",
        title: "Atributos async e defer na tag script",
        subtitle: "Prática guiada · atributos async e defer",
        theory: "Por padrão, scripts bloqueiam o parser HTML. O atributo defer baixa o script em paralelo e adia sua execução até que todo o documento HTML seja analisado, respeitando a ordem das tags. Já async executa o script assim que o download termina, sem garantia de ordem.",
        questions: [
        q("Qual atributo de script garante o download em paralelo e execução após o parsing do HTML respeitando a ordem?", "defer", ["async","blocking"], "defer adia a execução para depois do parseamento do HTML preservando a ordem relativa dos scripts.", "<script src=\"app.js\" defer></script>"),
        q("Qual atributo faz o script ser executado imediatamente assim que o download terminar, podendo quebrar a ordem?", "async", ["defer","lazy"], "async executa assim que o arquivo é baixado, independentemente da ordem e do parsing do HTML."),
        q("Por que o uso de defer na tag script localizada no head é amplamente considerado uma boa prática moderna?", "Porque não bloqueia a renderização visual do HTML e garante que o DOM estará pronto ao executar", ["Porque comprime o script automaticamente em 90% sem perdas","Porque transforma o JavaScript em código C++ no servidor"], "defer permite colocar a tag no head com download antecipado sem travar o parser visual do documento."),
        q("Para que tipo de script o atributo async é idealmente indicado?", "Scripts de análise e métricas que não dependem de outros scripts nem modificam a estrutura essencial do DOM", ["Scripts de inicialização de interface com muitas dependências","Scripts contendo funções matemáticas essenciais"], "Scripts analíticos independentes (ex: Google Analytics) são casos perfeitos para async."),
        t("Qual atributo booleano de script adia a execução garantindo a ordem relativa dos arquivos?", ["defer"], "defer adia a execução até a conclusão da análise do HTML preservando a ordem declarada.", "<script src=\"modulo.js\" ____></script>"),
        g("Complete a tag com o atributo que executa o script analítico imediatamente ao finalizar o download:", ["async"], "O atributo async é ideal para contadores e scripts de terceiros desvinculados do DOM.", "<script src=\"metricas.js\" ____></script>"),
        o("Ordene o comportamento do navegador ao carregar um script com o atributo defer:", ["O navegador localiza a tag script com atributo defer no cabeçalho do documento","O download do arquivo JavaScript é iniciado em paralelo sem travar o parser HTML","O navegador conclui a construção visual completa da árvore DOM do documento","O script é executado em ordem antes do disparo do evento DOMContentLoaded"], "O ciclo com defer assegura carregamento rápido e acesso seguro aos elementos visuais."),
        p("Associe o atributo de carregamento de scripts ao seu comportamento no navegador:", [["Sem atributo (padrão)","Bloqueia o parser HTML imediatamente até baixar e executar o arquivo"],["defer","Baixa em segundo plano e executa após o parser HTML mantendo a ordem das tags"],["async","Baixa em segundo plano e executa imediatamente ao terminar o download, sem ordem garantida"],["type=\"module\"","Habilita módulos ECMAScript e adota comportamento defer por padrão"]], "Dominar o carregamento assíncrono é um dos grandes segredos da performance web moderna.")
        ]
      },
      {
        id: "js-c01-u7-l3",
        title: "Eventos de ciclo de vida DOMContentLoaded e load",
        subtitle: "Aprofundamento · ciclo de vida DOMContentLoaded versus load",
        theory: "O evento DOMContentLoaded dispara assim que a árvore DOM está montada, sem esperar imagens ou folhas de estilo terminarem o download. Já o evento load da janela window aguarda o carregamento de absolutamente todos os recursos da página, incluindo fotos e mídias pesadas.",
        questions: [
        q("Qual evento do document sinaliza que os elementos HTML já foram analisados e estão prontos para consulta?", "DOMContentLoaded", ["load","beforeunload"], "DOMContentLoaded avisa que o DOM foi totalmente montado e nós podem ser selecionados.", "document.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"DOM pronto!\");\n});"),
        q("Qual evento do objeto window aguarda o término do download de todas as imagens, estilos e frames externos?", "load", ["DOMContentLoaded","ready"], "O evento load da janela window indica que todos os recursos externos foram concluídos com sucesso."),
        q("Qual evento é mais rápido para inicializar botões e interatividade de formulários na tela?", "DOMContentLoaded", ["load","finalRender"], "DOMContentLoaded ocorre muito antes de load porque não fica bloqueado esperando downloads de imagens."),
        q("O que acontece se um script tentar acessar um elemento HTML antes do evento DOMContentLoaded ou defer?", "O método de busca como document.querySelector retorna null porque o elemento ainda não foi criado", ["O computador emite um bipe de erro de hardware","O navegador cria o elemento no início do documento sozinho"], "Acessar nós do DOM antes de serem lidos pelo parser resulta em valores nulos."),
        t("Qual é o nome do evento disparado no document quando a árvore HTML está completamente montada?", ["DOMContentLoaded"], "DOMContentLoaded indica prontidão da árvore de elementos sem esperar imagens externas.", "document.addEventListener(\"____\", iniciarApp);"),
        g("Complete o objeto no qual se costuma escutar o evento load para checar o carregamento de recursos globais:", ["window"], "O evento load completo de todos os recursos externos é escutado no objeto global window.", "____.addEventListener(\"load\", () => console.log(\"Pagina totalmente carregada\"));"),
        o("Ordene a linha do tempo dos eventos fundamentais de carregamento de uma página web:", ["O navegador inicia a leitura e montagem sequencial da árvore de nós HTML","O parser conclui o documento e dispara o evento DOMContentLoaded","Imagens, fontes tipográficas e mídias pesadas concluem seus downloads","O objeto global window dispara o evento load finalizando o ciclo"], "Compreender essa cronologia previne seletores que retornam nulo ao inicializar a interface."),
        p("Associe o evento do ciclo de vida ao momento exato em que ele é disparado:", [["DOMContentLoaded","Dispara assim que a estrutura HTML está processada, antes das imagens"],["window.load","Dispara quando o HTML, folhas de estilo e todas as imagens foram baixados"],["beforeunload","Dispara quando o usuário tenta fechar ou atualizar a aba no navegador"],["readyState == \"interactive\"","Estado do documento que precede o disparo do evento DOMContentLoaded"]], "Sincronizar scripts com o ciclo de vida garante estabilidade visual para a aplicação.")
        ]
      },
      {
        id: "js-c01-u7-l4",
        title: "Scripts inline versus arquivos externos",
        subtitle: "Aplicação · scripts inline versus arquivos externos",
        theory: "Embora scripts inline sejam fáceis para prototipagem rápida, projetos profissionais priorizam arquivos externos. Arquivos externos permitem reutilização de código entre múltiplas páginas, reduzem o peso das requisições via cache e atendem a políticas de segurança modernas como CSP.",
        questions: [
        q("Qual política de segurança do navegador costuma desabilitar scripts inline para evitar ataques XSS?", "Content Security Policy (CSP)", ["Hypertext Transfer Security (HTS)","Digital Rights Management (DRM)"], "Uma CSP rigorosa bloqueia scripts inline não autorizados para prevenir injeção maliciosa de código (XSS)."),
        q("Por que carregar um script externo de 20KB em 10 páginas HTML é melhor do que repetir o código inline em todas elas?", "Porque o navegador baixa os 20KB apenas uma vez e reaproveita do cache local nas demais páginas", ["Porque scripts inline aumentam a temperatura do processador","Porque o HTML proíbe páginas com mais de 50 linhas de código"], "O cache HTTP evita transferências redundantes de rede, poupando dados do usuário e do servidor."),
        q("Em que cenário raro um pequeno script inline pode ser justificável em uma página de alta performance?", "Para configurar o tema visual escuro ou claro antes de renderizar a tela, evitando cintilação visual", ["Para minerar criptomoedas enquanto o usuário visualiza o rodapé","Para substituir a necessidade de instalar um navegador"], "Scripts inline minúsculos e críticos de configuração inicial previnem o indesejado efeito Flash of Unstyled Content (FOUC)."),
        q("Qual atributo de tag HTML antiga colocava código JavaScript misturado no próprio elemento, hoje desencorajado?", "Atributos de manipuladores de eventos como onclick=\"...\"", ["Atributos alt e title","Atributos id e class"], "Manipuladores inline como onclick ferem a separação entre conteúdo visual e lógica comportamental."),
        t("Qual política de cabeçalho HTTP é conhecida pela sigla CSP na segurança de scripts?", ["Content Security Policy"], "CSP (Content Security Policy) define quais fontes de script têm permissão para rodar no navegador.", "// Politica de seguranca de conteudo: ____"),
        g("Complete o atributo que antigamente misturava ação de clique diretamente na tag do botão:", ["onclick"], "Manipuladores inline como onclick devem ser substituídos por addEventListener em arquivos externos.", "<button ____=\"executarAcao()\">Confirmar</button>"),
        o("Ordene as etapas para refatorar um script inline misturado para uma arquitetura moderna e segura:", ["Remover atributos onclick e trechos de scripts inline existentes nas tags HTML","Criar um arquivo dedicado nomeado como main.js na pasta de scripts do projeto","Utilizar seletores e addEventListener dentro do arquivo externo para capturar eventos","Referenciar o script no cabeçalho utilizando a tag script com o atributo defer"], "A refatoração desacopla o comportamento do documento, elevando a segurança e organização."),
        p("Associe o modelo de inclusão de código ao seu impacto correspondente em projetos reais:", [["Arquivo externo em cache","Download único compartilhado por várias páginas, economizando banda"],["Script inline no HTML","Enviado repetidamente a cada página carregada, sem proveito de cache"],["Manipulador inline onclick","Dificulta a manutenção e costuma ser bloqueado por políticas CSP"],["addEventListener em arquivo","Padrão recomendado pela indústria para registrar interações dinâmicas"]], "Adotar padrões recomendados de carregamento evita retrabalho e riscos de segurança.")
        ]
      },
      {
        id: "js-c01-u7-l5",
        title: "Estratégias modernas de carregamento e revisão",
        subtitle: "Revisão e desafio · estratégias modernas de carregamento",
        theory: "No desenvolvimento web moderno, a combinação de <script type=\"module\"> com empacotadores ou import maps revolucionou a distribuição de código. Scripts com type=\"module\" adotam defer por padrão, escopo isolado por arquivo e suporte nativo a importações e exportações.",
        questions: [
        q("Qual comportamento de carregamento é adotado automaticamente quando usamos <script type=\"module\">?", "Comportamento deferido (defer) por padrão, baixando em paralelo e aguardando o DOM", ["Bloqueio síncrono total da interface gráfica","Execução em segundo plano em uma thread de áudio"], "Módulos JavaScript são avaliados automaticamente de forma adiada (defer) sem travar o parser HTML.", "<script type=\"module\" src=\"app.js\"></script>"),
        q("Qual é o escopo padrão de variáveis declaradas dentro de um arquivo carregado como type=\"module\"?", "Escopo de módulo restrito àquele arquivo, não poluindo o objeto global window", ["Escopo global compartilhado por todas as abas abertas","Escopo exclusivo de variáveis numéricas"], "Módulos isolam seu escopo superior, impedindo colisões acidentais de nomes globais."),
        q("Em que modo de execução estrita os módulos JavaScript operam obrigatoriamente por especificação?", "Strict Mode (\"use strict\") automático", ["Modo permissivo descontinuado","Modo de compatibilidade Internet Explorer 6"], "Todo módulo ECMAScript opera intrinsecamente no modo estrito sem necessidade de declarar \"use strict\"."),
        q("Qual recurso moderno em HTML permite mapear nomes curtos de bibliotecas para URLs sem empacotadores?", "Import maps (<script type=\"importmap\">)", ["CSS Keyframes","Tags meta de SEO"], "Import maps definem tabelas de resolução de módulos diretamente no documento HTML."),
        t("Qual valor de atributo type transforma um script em módulo com escopo isolado e defer por padrão?", ["module"], "O atributo type=\"module\" habilita o padrão oficial de módulos ECMAScript.", "<script type=\"____\" src=\"index.js\"></script>"),
        g("Complete o valor do atributo type que define um mapa de importação de módulos no HTML:", ["importmap"], "Import maps permitem mapear identificadores de módulos nativamente no navegador.", "<script type=\"____\">\n{\n  \"imports\": { \"lodash\": \"/vendor/lodash.js\" }\n}\n</script>"),
        o("Ordene a transição histórica das estratégias de inclusão de scripts em páginas web:", ["Scripts síncronos espalhados inline ao longo do corpo do documento","Scripts externos alocados no rodapé imediatamente antes do fechamento do body","Scripts no cabeçalho com o uso explícito dos atributos async e defer","Módulos nativos com type=\"module\" e suporte declarativo a import maps"], "Compreender a evolução das técnicas permite tomar decisões fundamentadas em performance."),
        p("Associe a tecnologia moderna ao seu benefício primordial no carregamento de scripts:", [["type=\"module\"","Garante escopo fechado por arquivo e modo estrito sem poluir o objeto global"],["import maps","Permite importar pacotes por nome no navegador sem necessitar de build prévio"],["dynamic import()","Carrega módulos pesados sob demanda apenas quando o usuário solicita a ação"],["preload / modulepreload","Informa ao navegador para antecipar o download de scripts críticos"]], "Estratégias modernas entregam máxima velocidade e excelente experiência ao usuário.")
        ]
      }
    ],
    8: [
      {
        id: "js-c01-u8-l1",
        title: "Estrutura completa de um programa JavaScript",
        subtitle: "Apresentação · estrutura de um programa JavaScript completo",
        theory: "Um programa JavaScript bem estruturado organiza seu fluxo em três momentos fundamentais: captura de dados de entrada, processamento lógico por meio de operações ou transformações, e exibição dos resultados ao usuário. Manter essa sequência lógica clara simplifica testes e evolução.",
        questions: [
        q("Quais são as três etapas fundamentais que compõem o ciclo básico de um programa computacional?", "Entrada de dados, processamento lógico e saída de resultados", ["Download, upload e formatação do disco","Compilação, desinstalação e reinicialização"], "A tríade clássica entrada-processamento-saída rege a arquitetura de programas fundamentais.", "const entrada = 10;\nconst processamento = entrada * 2;\nconsole.log(processamento);"),
        q("No contexto de um script de navegador, qual exemplo ilustra a etapa de entrada de dados?", "Ler o texto digitado por uma pessoa dentro de um campo de formulário", ["Imprimir um relatório no terminal do servidor","Salvar o código-fonte em um pendrive"], "A leitura de campos interativos, cliques ou parâmetros de URL constitui a entrada de dados do usuário."),
        q("Qual exemplo ilustra a etapa de processamento lógico em um programa de e-commerce?", "Calcular o valor do frete e aplicar o cupom de desconto sobre o subtotal", ["Exibir o logotipo da empresa no topo da página","Carregar o arquivo de fontes do Google"], "O cálculo das regras de negócio sobre as entradas representa o processamento da aplicação."),
        q("Qual instrução representa a forma mais direta de saída de diagnóstico para o desenvolvedor?", "console.log()", ["document.clear()","history.back()"], "console.log() transmite a saída do processamento diretamente para a tela do desenvolvedor no console."),
        t("Qual etapa do programa realiza os cálculos e transformações sobre as informações recebidas?", ["processamento"], "A fase de processamento aplica a lógica de negócio sobre os dados de entrada.", "// Ciclo: entrada -> ____ -> saida"),
        g("Complete o código com a variável que armazena a saída final do processamento:", ["total"], "O valor resultante do cálculo é repassado à instrução de saída.", "const preco = 50;\nconst frete = 15;\nconst total = preco + frete;\nconsole.log(____);"),
        o("Ordene a sequência de passos para calcular e exibir a média aritmética de dois valores:", ["Definir as variáveis de entrada contendo as notas do estudante","Somar os valores e dividir o resultado pelo número total de avaliações","Armazenar a média calculada em uma constante descritiva no escopo","Exibir a média final formatada na tela por meio do console"], "Seguir a sequência canônica de passos impede o uso de dados antes de sua definição."),
        p("Associe o trecho de código à respectiva etapa no ciclo do programa:", [["const valor = 100;","Entrada de dados (definição de valor inicial de operação)"],["const resultado = valor * 1.10;","Processamento lógico (aplicação de taxa sobre o valor)"],["console.log(resultado);","Saída de dados (apresentação do valor final ao usuário)"],["if (resultado > 500) { ... }","Decisão condicional (bifurcação no processamento)"]], "Identificar as etapas de processamento confere clareza ao raciocínio algorítmico.")
        ]
      },
      {
        id: "js-c01-u8-l2",
        title: "Entrada, processamento e saída na prática",
        subtitle: "Prática guiada · entrada, processamento e saída",
        theory: "Ao construir o primeiro script prático, definimos dados iniciais em constantes, realizamos cálculos com operadores aritméticos padronizados e geramos saídas descritivas com template literals. O uso de crases (` `) permite interpolar variáveis de forma limpa e legível.",
        questions: [
        q("Qual recurso do JavaScript permite intercalar variáveis dentro de strings usando ${variavel}?", "Template literals (delimitados por crases ` `)", ["Aspas simples comuns","Parênteses duplos"], "Template literals permitem interpolação de expressões através da sintaxe ${expressao}.", "const nome = \"Lucas\";\nconsole.log(`Ola, ${nome}!`);"),
        q("Qual é a saída gerada por const a = 6; const b = 4; console.log(`Soma: ${a + b}`);?", "Soma: 10", ["Soma: 64","Soma: a + b"], "Expressões matemáticas inseridas em ${} são avaliadas antes da conversão para texto."),
        q("Por que é recomendável utilizar const para valores de entrada que não sofrerão alteração?", "Garante a imutabilidade da referência, evitando reatribuições acidentais que causariam bugs", ["Obriga o computador a rodar o código mais rápido","Impede que o código seja inspecionado no DevTools"], "const protege a integridade das referências contra alterações indesejadas no fluxo."),
        q("O que acontece se esquecermos de usar crases e usarmos aspas simples com a sintaxe ${variavel}?", "O texto literal ${variavel} é impresso exatamente como digitado, sem interpolar o valor", ["O JavaScript converte as aspas em crases automaticamente","Dispara um SyntaxError fatal"], "Interpolação de variáveis só é processada pelo interpretador se a string for cercada por crases."),
        t("Qual caractere de pontuação delimita uma string do tipo template literal no JavaScript?", ["`"], "A crase (backtick `) é o delimitador exclusivo das template literals.", "const frase = ____Mensagem: ${valor}____;"),
        g("Complete a interpolação para exibir o resultado da variável dobro dentro do template literal:", ["${dobro}"], "A sintaxe ${expressao} interpola valores no interior de template literals.", "const dobro = 14 * 2;\nconsole.log(`O dobro de 14 e: ____`);"),
        o("Ordene a construção de um script que converte temperatura de Celsius para Fahrenheit:", ["Declarar a constante com o valor da temperatura em graus Celsius","Multiplicar o valor de Celsius por 9/5 e somar 32 na fórmula matemática","Armazenar a temperatura resultante em uma nova constante fahrenheit","Imprimir no console o texto interpolado com o valor convertido"], "A execução estruturada de fórmulas matemáticas consolida o domínio de operadores fundamentais."),
        p("Associe o delimitador de string à sua respectiva propriedade de avaliação:", [["Crases (` `)","Template literal: suporta interpolação com ${} e strings multilinhas"],["Aspas duplas (\" \")","String literal clássica: requer concatenação com operador + para unir variáveis"],["Aspas simples (' ')","String literal clássica: não processa interpolação interna de variáveis"],["Operador +","Usado para somar números ou concatenar strings literais clássicas"]], "Escolher a sintaxe correta de texto melhora a clareza e manutenção do código-fonte.")
        ]
      },
      {
        id: "js-c01-u8-l3",
        title: "Comentários didáticos e legibilidade de código",
        subtitle: "Aprofundamento · boas práticas de clareza e comentários",
        theory: "Bons comentários esclarecem o porquê de uma decisão de negócio não óbvia, e não o que o código já expressa visualmente. Em JavaScript, barras duplas (//) criam comentários de uma linha, enquanto a combinação /* */ delimita blocos de comentários de múltiplas linhas.",
        questions: [
        q("Qual sintaxe cria um comentário de linha única em código JavaScript?", "// Comentario aqui", ["# Comentario aqui","<!-- Comentario aqui -->"], "Duas barras consecutivas (//) marcam o restante daquela linha como comentário ignorado pelo interpretador.", "// Este e um comentario de linha unica"),
        q("Qual sintaxe é utilizada para delimitar comentários de bloco em múltiplas linhas?", "/* Comentario em bloco */", ["{{ Comentario }}","[[ Comentario ]]"], "A combinação /* abre o bloco de comentário e */ encerra o bloco, abrangendo várias linhas."),
        q("Qual é o papel ideal de um comentário em um projeto de software profissional?", "Explicar a motivação ou a razão por trás de uma regra de negócio que não seja óbvia na leitura do código", ["Traduzir cada linha de código palavra por palavra para o português","Copiar a documentação inteira da biblioteca dentro do arquivo"], "Bons comentários respondem ao porquê, já que um código limpo e bem nomeado deve explicar o como."),
        q("O que o interpretador JavaScript faz com comentários ao executar um script?", "Ignora-os completamente durante a execução, sem impacto no resultado lógico", ["Converte comentários em instruções de depuração","Envia os comentários para a tela do usuário"], "Comentários são descartados pelo analisador sintático, não afetando a lógica executável."),
        t("Quais dois caracteres consecutivos iniciam um comentário de uma linha em JavaScript?", ["//"], "O prefixo // marca comentários de linha única em JavaScript, C, Java e C#.", "____ Este texto e ignorado pelo interpretador"),
        g("Complete o delimitador de fechamento para encerrar o bloco de comentário em múltiplas linhas:", ["*/"], "Comentários de bloco são abertos com /* e fechados com */.", "/* Bloco de explicacao\n   com multiplas linhas\n____"),
        o("Ordene a estrutura recomendada de um cabeçalho explicativo em um script profissional:", ["Abrir um bloco de comentário multilinhas no topo do arquivo","Descrever o objetivo do módulo e o problema de negócio que ele soluciona","Indicar referências de especificações ou regras tributárias aplicadas","Fechar o bloco de comentário e iniciar as importações e o código executável"], "Documentar a finalidade do arquivo no topo guia novos colaboradores na equipe."),
        p("Associe a categoria de comentário à sua recomendação de qualidade na engenharia:", [["Comentário explicativo de porquê","Boa prática: elucida decisões de regras complexas ou contornos técnicos"],["Comentário redundante óbvio","Má prática: apenas repete em texto o que a própria instrução já diz"],["Código morto comentado","Má prática: trechos desativados que deveriam ser excluídos no Git"],["JSDoc (/** */)","Boa prática: documenta tipos de parâmetros e retorno de funções"]], "A clareza do código e a sobriedade dos comentários são marcas de maturidade profissional.")
        ]
      },
      {
        id: "js-c01-u8-l4",
        title: "Construção de utilitário interativo simples",
        subtitle: "Aplicação · construção de utilitário interativo",
        theory: "Combinando funções puras de cálculo com leitura de variáveis, construímos pequenos utilitários interativos. Uma função pura recebe parâmetros de entrada, processa a regra e retorna um resultado previsível sem causar efeitos colaterais indesejados no restante da aplicação.",
        questions: [
        q("Qual é a definição essencial de uma função pura em JavaScript?", "Uma função que para os mesmos argumentos sempre retorna o mesmo resultado, sem efeitos colaterais", ["Uma função que não pode ser escrita em arquivos externos","Uma função que apaga variáveis da memória RAM"], "Funções puras são previsíveis e desacopladas, facilitando testes e reutilização.", "function calcularDesconto(preco, taxa) {\n  return preco * (1 - taxa);\n}"),
        q("Qual palavra-chave do JavaScript finaliza a execução de uma função e devolve o valor calculado?", "return", ["output","send"], "return devolve o valor de saída ao ponto de chamada e encerra a execução da função."),
        q("O que acontece se uma função JavaScript não declarar uma instrução return explícita?", "Ela executa todas as instruções e retorna undefined ao final", ["Ela devolve o número zero automaticamente","O código gera TypeError no momento da chamada"], "Funções sem retorno explícito devolvem undefined por convenção da linguagem."),
        q("Qual benefício imediato obtemos ao encapsular uma regra de cálculo dentro de uma função nomeada?", "Reutilização do mesmo cálculo em vários pontos sem duplicar código-fonte", ["Aumento da velocidade da placa de vídeo do computador","Bloqueio de caracteres especiais na entrada de dados"], "Encapsular regras em funções evita duplicação de lógica (princípio DRY)."),
        t("Qual palavra-chave encerra a função e envia a resposta para o chamador?", ["return"], "return encerra o fluxo da função devolvendo o resultado especificado.", "function dobrar(n) { ____ n * 2; }"),
        g("Complete a chamada da função utilitária passando o valor 100 como argumento de entrada:", ["100"], "Argumentos são fornecidos entre parênteses na chamada da função.", "function calcularImposto(valor) { return valor * 0.15; }\nconst imposto = calcularImposto(____);"),
        o("Ordene as etapas para planejar e implementar uma função de utilitário financeiro:", ["Definir o nome claro e os parâmetros que a função deve receber como entrada","Escrever a expressão matemática necessária dentro do corpo da função","Retornar o resultado do cálculo através da palavra-chave return","Invocar a função com valores de teste e validar o retorno no console"], "O processo sistemático de criação de funções garante robustez e facilidade de teste."),
        p("Associe o termo de funções ao seu elemento sintático correspondente no código:", [["Parâmetro","Variável declarada na assinatura da função que recebe os dados (ex: taxa)"],["Argumento","Valor concreto enviado na chamada da função ao ser executada (ex: 0.10)"],["return","Instrução que expede o resultado e encerra a execução do bloco"],["Invocação","Ato de executar a função utilizando parênteses (ex: calcular())"]], "Distinguir parâmetros de argumentos é essencial para a comunicação precisa entre engenheiros.")
        ]
      },
      {
        id: "js-c01-u8-l5",
        title: "Integração final do primeiro capítulo",
        subtitle: "Revisão e desafio · integração final do primeiro capítulo",
        theory: "Chegamos à conclusão do primeiro capítulo unindo todos os fundamentos: arquivos estruturados, inclusão assíncrona com defer, diagnóstico analítico de erros no console e o ciclo canônico de entrada, processamento e saída. Esse alicerce prepara você para tópicos avançados de lógica.",
        questions: [
        q("Qual conjunto de práticas resume um ambiente de desenvolvimento JavaScript moderno e seguro?", "Arquivos em UTF-8 com nomes kebab-case, inclusão por defer/module e validação de erros no console", ["Tudo em um único arquivo de 5.000 linhas com scripts inline e sem logs","Salvar arquivos como .txt e executá-los sem testar no navegador"], "Organização modular, tipografia UTF-8 e diagnósticos estruturados garantem código profissional."),
        q("Qual é o primeiro local onde um desenvolvedor deve procurar respostas ao se deparar com uma tela em branco?", "Na aba Console das Ferramentas do Desenvolvedor do navegador para checar erros em vermelho", ["No manual impresso do fabricante do computador","Na caixa de entrada de e-mails do provedor"], "O console do navegador revela erros de sintaxe, rede ou referências que explicam a falha."),
        q("O que a presença de um erro não tratado no console causa em scripts que dependem daquele fluxo?", "Interrompe a execução daquele trecho, impedindo que instruções subsequentes sejam executadas", ["Gera uma cobrança automática na fatura do desenvolvedor","Fecha a aba do navegador imediatamente sem aviso"], "Falhas não interceptadas abortam a continuidade da cadeia lógica do script corrente."),
        q("Por que dominar a distinção entre linguagem (ECMAScript) e ambiente (Web APIs) é crucial?", "Permite entender onde cada recurso funciona (navegador versus Node.js) e escrever código portátil", ["Garante que o desenvolvedor nunca precise usar funções matemáticas","Obriga o programador a utilizar navegadores exclusivos"], "Saber os limites do padrão da linguagem evita o uso inadequado de APIs específicas de um ambiente em outro."),
        t("Qual ferramenta embutida no navegador é o principal instrumento diário de teste e diagnóstico do programador?", ["DevTools"], "O DevTools (Ferramentas do Desenvolvedor) reúne console, depurador e inspetor de rede.", "// Abrir Ferramentas do Desenvolvedor: ____"),
        g("Complete o comando que emite uma mensagem final comemorando a conclusão do primeiro capítulo:", ["log"], "console.log é a saída clássica para validar marcos e conclusões de processos.", "console.____(\"Parabens! Capitulo 1 de JavaScript concluido com sucesso!\");"),
        o("Ordene o fluxo completo de entrega de um script web desde a concepção até a validação final:", ["Planejar o algoritmo decompondo a lógica em entrada, processamento e saída","Escrever o código em arquivo .js modular utilizando funções puras e const","Integrar o script ao documento HTML com a tag script e atributo defer","Validar a execução no navegador conferindo ausência de erros no console"], "Seguir o ciclo completo de engenharia consolida o aprendizado e previne retrabalho."),
        p("Associe cada pilar estudado no capítulo à sua respectiva contribuição para o desenvolvedor:", [["Console e DevTools","Ambiente interativo de inspeção, emissão de dados e depuração de falhas"],["Tag script com defer","Carregamento não bloqueante que preserva o tempo de resposta visual da página"],["Subclasses de Error","Diagnóstico preciso entre falhas gramaticais (Syntax) e de escopo (Reference)"],["Funções e const","Imutabilidade, encapsulamento e reaproveitamento de regras de negócio"]], "A união harmoniosa desses conceitos forma a base indispensável para a jornada na programação web.")
        ]
      }
    ]
  });
})();
