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

  const lang = "javascript";
  const chId = "javascript-c12";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "javascript-c12-u1-l2-arquitetura-do-v8-e-libuv",
        title: "A arquitetura do Node.js: motor V8 e libuv",
        subtitle: "Motor assíncrono · Como JavaScript roda no servidor com I/O não bloqueante",
        theory: "O Node.js combina o motor V8 do Google (que compila JavaScript para código de máquina nativo) com a biblioteca libuv em C/C++ (que gerencia o event loop e a pool de threads para operações assíncronas do sistema operacional), permitindo processar milhares de conexões simultâneas em uma única thread principal.",
        questions: [
          q("Quais são os dois componentes centrais que formam o núcleo de execução do Node.js?", "O motor Google V8 e a biblioteca de I/O libuv em C/C++", ["O interpretador Python e o servidor Apache","O compilador GCC e o banco SQLite"], "O V8 executa o código JavaScript e a libuv cuida do event loop e das operações de sistema."),
          q("Qual é o papel da biblioteca nativa libuv no runtime do Node.js?", "Gerenciar o Event Loop e coordenar a pool de threads de I/O em segundo plano", ["Compilar estilos CSS no servidor","Renderizar gráficos no canvas"], "libuv abstrai as chamadas não bloqueantes do kernel Linux, Windows e macOS de forma transparente."),
          q("Como o Node.js atinge alta concorrência utilizando uma única thread JavaScript principal?", "Delegando operações pesadas de disco e rede para a libuv via callbacks e Promises não bloqueantes", ["Criando um processo novo para cada conexão","Usando múltiplos ponteiros globais"], "A thread principal nunca para esperando respostas de disco ou rede; ela apenas despacha eventos."),
          q("Qual variável global nativa do Node.js fornece informações sobre o processo atual e o sistema?", "process", ["system","runtime"], "process expõe variáveis de ambiente, argumentos de linha de comando e controle de saída."),
          t("Qual motor do Google compila o código JavaScript para código de máquina dentro do Node.js?", ["V8"], "O motor V8 é o executor de JavaScript do Node.js e do Google Chrome."),
          g("Complete o encerramento gracioso do processo Node.js com código numérico zero de sucesso:", ["exit"], "process.exit(0) finaliza o processo Node.js.", "process.____(0);"),
          o("Ordene a jornada de uma operação assíncrona de I/O no Node.js:", ["A thread principal do V8 invoca uma operação assíncrona como readFile","A libuv delega a leitura do arquivo para uma thread em background da pool","O sistema operacional lê os bytes do disco e avisa a libuv via evento de conclusão","O Event Loop enfileira o callback e o V8 executa o resultado na thread principal"], "Invocação no V8, despacho para libuv, notificação do kernel e execução no Event Loop."),
          p("Associe o componente do Node.js à sua responsabilidade arquitetural:", [["Motor Google V8","Compila e executa o código JavaScript com alta performance"],["Biblioteca libuv","Gerencia o Event Loop e operações de I/O em pool de threads"],["Objeto process","Interface global com metadados e ciclo de vida do processo"],["Single-thread principal","Executa o código da aplicação sem bloqueios por espera de rede"]], "Compreender a dupla V8 e libuv desmistifica o modelo não bloqueante do Node.js.")
        ]
      },
      {
        id: "javascript-c12-u1-l3-modulos-commonjs-vs-ecmascript-modules",
        title: "Módulos no Node.js: CommonJS (require) vs ESM (import)",
        subtitle: "Sistemas de módulos · Migrando de require/module.exports para import/export nativo",
        theory: "Historicamente o Node.js utilizava CommonJS (com require() síncrono e module.exports). No ecossistema moderno, o padrão universal é ECMAScript Modules (ESM com import/export assíncrono). Para ativar ESM nativamente, basta configurar \"type\": \"module\" no package.json ou usar a extensão .mjs.",
        questions: [
          q("Qual propriedade deve ser configurada no package.json para habilitar o uso de import/export ESM?", "\"type\": \"module\"", ["\"esm\": true","\"syntax\": \"modern\""], "Declarar \"type\": \"module\" faz todos os arquivos .js do pacote serem tratados como módulos ESM."),
          q("Qual é a diferença fundamental no carregamento entre require() do CommonJS e import do ESM?", "require() é síncrono e bloqueia na hora da execução; import estático é assíncrono e resolvido na fase de parse", ["require() só funciona no navegador","Não há diferença técnica"], "ESM analisa dependências estaticamente antes de executar qualquer linha de código."),
          q("Como importar dinamicamente um módulo sob demanda em ESM apenas quando necessário?", "Usando a função de import dinâmico assíncrono: const m = await import(\"./modulo.js\")", ["Usando require.async()","Usando importSync()"], "import() dinâmico retorna uma Promise e carrega o arquivo apenas no momento da execução."),
          q("Quais variáveis especiais do CommonJS deixam de existir nativamente em arquivos ESM?", "__dirname e __filename (sendo substituídas por import.meta.url)", ["process e console","Array e Object"], "__dirname não existe em ESM puro; resolvemos caminhos através de new URL(\".\", import.meta.url)."),
          t("Qual extensão de arquivo força o Node.js a interpretar o código como ESM independentemente do package.json?", [".mjs"], ".mjs indica expressamente módulo ECMAScript para o runtime."),
          g("Complete a exportação nomeada da função utilitária usando a sintaxe moderna de ESM:", ["export"], "export expõe funções e valores em módulos ESM.", "____ function somar(a, b) {\n  return a + b;\n}"),
          o("Ordene a evolução dos sistemas de módulos no ecossistema Node.js:", ["Criação do Node.js em 2009 com sistema próprio de módulos CommonJS (require)","Padronização do ECMAScript Modules (ESM) pelo comitê TC39 para JavaScript universal","Introdução de suporte estável a ESM nativo no Node.js a partir da versão 12","Adoção generalizada de \"type\": \"module\" como padrão para bibliotecas modernas"], "Origem com CJS, especificação do TC39, suporte nativo no runtime e consolidação de ESM."),
          p("Associe o recurso ao seu sistema de módulos:", [["module.exports = { ... }","Padrão clássico do CommonJS para exportar entidades"],["export default / export const","Sintaxe oficial do ECMAScript Modules moderno"],["import.meta.url","Localização do arquivo do módulo atual no formato file:// em ESM"],["require(\"node:fs\")","Invocação síncrona tradicional de importação no CommonJS"]], "Dominar ESM e sua convivência com CommonJS é indispensável para trabalhar com Node moderno.")
        ]
      },
      {
        id: "javascript-c12-u1-l4-o-objeto-process-e-informacoes-de-ambiente",
        title: "O objeto process: argumentos, plataforma e controle",
        subtitle: "Interação com o sistema · process.argv, process.platform e hooks de encerramento",
        theory: "O objeto global process conecta o código JavaScript ao sistema operacional. Ele expõe process.argv com os argumentos passados no terminal, process.cwd() com o diretório atual de trabalho, process.platform com o SO hospedeiro, e emite eventos vitais como \"exit\", \"uncaughtException\" e \"unhandledRejection\".",
        questions: [
          q("O que a lista process.argv contém por convenção em suas duas primeiras posições?", "O caminho do executável node (índice 0) e o caminho do arquivo do script executado (índice 1)", ["O nome do usuário e a senha","Dois números aleatórios"], "Argumentos passados pelo usuário no terminal começam a partir do índice 2 (process.argv.slice(2))."),
          q("Qual método de process informa o diretório a partir do qual o comando node foi executado no terminal?", "process.cwd() (Current Working Directory)", ["process.dir()","process.getFolder()"], "cwd reflete a pasta onde o terminal estava posicionado ao disparar o comando."),
          q("Qual evento de process deve ser monitorado para capturar Promises rejeitadas que não tiveram bloco catch?", "process.on(\"unhandledRejection\", (motivo) => { ... })", ["process.on(\"error\", ...)","process.on(\"crash\", ...)"], "unhandledRejection previne que exceções assíncronas abandonadas passem despercebidas."),
          q("Como sinalizar que um script CLI do Node.js terminou com falha para o terminal chamador?", "Invocando process.exit(1) (qualquer código diferente de zero indica falha)", ["Invocando process.stop()","Retornando false no arquivo"], "Códigos de saída diferentes de 0 comunicam falha para pipelines de CI/CD e scripts shell."),
          t("Qual propriedade de process identifica o sistema operacional (ex: \"win32\", \"linux\", \"darwin\")?", ["platform"], "process.platform retorna a identificação do sistema hospedeiro."),
          g("Complete o descarte dos dois primeiros argumentos do sistema para ler os dados do usuário:", ["slice"], "slice(2) extrai apenas os argumentos customizados.", "const argsDoUsuario = process.argv.____(2);"),
          o("Ordene a inicialização de um script capturando argumentos e tratando saída:", ["Extrair os argumentos fornecidos pelo operador: const args = process.argv.slice(2)","Registrar interceptador defensivo: process.on(\"uncaughtException\", tratarErro)","Executar a lógica de negócio principal da ferramenta","Encerrar o script explicitamente confirmando sucesso com process.exit(0)"], "Extração de argumentos, registro de erros não tratados, execução e saída explícita."),
          p("Associe o membro de process à sua finalidade:", [["process.argv","Array com o executável, o arquivo e os argumentos de linha de comando"],["process.cwd()","Caminho absoluto do diretório onde o comando do terminal foi disparado"],["process.exit(1)","Termina imediatamente a execução indicando falha ao sistema operacional"],["unhandledRejection","Evento emitido quando uma Promise é rejeitada sem nenhum catch"]], "O objeto process é a ponte de comando para scripts e ferramentas de automação no servidor.")
        ]
      },
      {
        id: "javascript-c12-u1-l5-prefixos-node-e-modulos-nativos",
        title: "O protocolo node: e boas práticas de importação nativa",
        subtitle: "Segurança contra typosquatting · node:fs, node:path, node:os e node:crypto",
        theory: "As versões modernas do Node.js exigem e recomendam o uso explícito do prefixo node: para importar módulos nativos (ex: import fs from \"node:fs/promises\"). O prefixo previne conflitos de nomes, bloqueia ataques de typosquatting no npm e deixa imediatamente claro que a dependência pertence ao núcleo da plataforma.",
        questions: [
          q("Por que é altamente recomendado usar o prefixo \"node:\" ao importar módulos nativos (ex: node:fs)?", "Para evitar conflitos com pacotes terceiros do npm e proteger contra vulnerabilidades de typosquatting", ["Porque deixa a velocidade de disco maior","Porque é obrigatório para compilar C++"], "O prefixo garante que o resolvedor busque estritamente a biblioteca nativa embutida no runtime."),
          q("Qual módulo nativo do Node.js fornece primitivas criptográficas como criação de hashes e geração de UUIDs?", "node:crypto", ["node:security","node:hash"], "node:crypto expõe crypto.randomUUID() e utilitários de cifra rápidos baseados em OpenSSL."),
          q("Qual módulo nativo fornece informações sobre a CPU, memória RAM total e disponível da máquina?", "node:os", ["node:machine","node:hardware"], "node:os expõe os.cpus(), os.freemem(), os.totalmem() e os.homedir()."),
          q("O que acontece se uma biblioteca do npm tentar publicar um pacote com o nome \"node:path\"?", "O registro oficial do npm bloqueia a publicação de pacotes que utilizem o prefixo reservado node:", ["O pacote substitui o nativo","O npm cobra uma taxa"], "O escopo node: é permanentemente reservado pelo projeto Node.js para segurança global."),
          t("Qual módulo nativo do Node.js expõe a função randomUUID() para geração instantânea de identificadores únicos?", ["crypto"], "node:crypto fornece geração nativa de UUIDs sem pacotes externos."),
          g("Complete a importação recomendada do sistema de arquivos com prefixo de segurança:", ["node:fs/promises"], "node:fs/promises é o caminho canônico do módulo nativo.", "import { readFile } from \"____\";"),
          o("Ordene a resolução de imports adotada pelo Node.js ao carregar módulos:", ["Verificar se o identificador possui o prefixo explícito node: (resolução imediata nativa)","Verificar se o identificador inicia com caminho relativo (\"./\" ou \"../\")","Buscar pastas na hierarquia recursiva de diretórios node_modules locais","Lançar erro ERR_MODULE_NOT_FOUND se o arquivo ou pacote não existir"], "Checagem de prefixo node:, checagem de caminho relativo, busca em node_modules e falha se ausente."),
          p("Associe o módulo nativo ao seu serviço:", [["node:crypto","Geração de UUIDs v4, hashes criptográficos SHA-256 e cifras seguras"],["node:os","Inspeção de memória livre, núcleos de CPU e diretório home do usuário"],["node:path","Normalização de barras e montagem agnóstica de caminhos de arquivos"],["node:assert/strict","Verificação estrita de asserções em testes sem dependências externas"]], "Usar o prefixo node: demonstra maturidade técnica e protege a aplicação contra ataques de supply chain.")
        ]
      }
    ],
    2: [
      {
        id: "javascript-c12-u2-l1-estrutura-do-package-json",
        title: "Estrutura fundamental do arquivo package.json",
        subtitle: "Manifesto do projeto · Metadados, scripts, dependências e semver",
        theory: "O package.json é o manifesto de configuração de qualquer projeto Node.js. Ele documenta o nome, versão, ponto de entrada (main), tipo de módulo (\"type\": \"module\"), licença, scripts automatizados e as listas de dependências divididas entre dependências de produção e dependências exclusivas de desenvolvimento.",
        questions: [
          q("Qual comando do terminal cria um arquivo package.json inicial com valores padrão automaticamente?", "npm init -y", ["npm start","npm create-json"], "A flag -y responde afirmativamente a todas as perguntas criando o manifesto imediatamente."),
          q("Qual é a diferença entre as seções dependencies e devDependencies no package.json?", "dependencies são necessárias para a aplicação rodar em produção; devDependencies apenas para compilar e testar", ["devDependencies rodam mais rápido","dependencies são opcionais"], "Separar dependências mantém a imagem final de produção muito mais leve e segura."),
          q("Qual flag do comando npm install instala um pacote registrando-o em devDependencies?", "npm install -D (ou --save-dev)", ["npm install --prod","npm install -g"], "A flag -D salva o pacote no bloco de ferramentas de desenvolvimento (ex: TypeScript, linters)."),
          q("Qual campo do package.json declara qual arquivo deve ser executado quando outro pacote importar este módulo?", "\"main\" (ou \"exports\")", ["\"entrypoint\"","\"index\""], "main ou a cláusula exports definem os pontos de entrada públicos do pacote."),
          t("Qual comando do terminal inicializa um novo pacote criando o arquivo package.json interativamente?", ["npm init"], "npm init guia o desenvolvedor na criação do manifesto do projeto."),
          g("Complete o comando que salva a ferramenta de testes apenas no ambiente de desenvolvimento:", ["--save-dev"], "--save-dev registra o pacote em devDependencies.", "npm install -D vitest ____"),
          o("Ordene a inicialização e configuração de um projeto moderno com package.json:", ["Executar npm init -y para criar o esqueleto básico do arquivo package.json","Configurar o campo \"type\": \"module\" para habilitar a sintaxe nativa de ESM","Instalar dependências de produção necessárias com npm install express","Instalar dependências de desenvolvimento com npm install -D eslint"], "Geração inicial, habilitação de ESM, instalação de produção e instalação de dev."),
          p("Associe a seção do package.json à sua função:", [["\"type\": \"module\"","Ativa a sintaxe de ECMAScript Modules (import/export) em arquivos .js"],["\"scripts\"","Atalhos de linha de comando para rodar testes, build e servidor"],["dependencies","Bibliotecas indispensáveis para a execução do app em produção"],["devDependencies","Utilitários usados apenas durante o desenvolvimento e testes"]], "O package.json centraliza a governança de versões e ferramentas do ecossistema JavaScript.")
        ]
      },
      {
        id: "javascript-c12-u2-l2-versionamento-semantico-semver",
        title: "Versionamento semântico (SemVer): Major, Minor e Patch",
        subtitle: "Controle de mudanças · Entendendo 1.2.3, o acento circunflexo (^) e o til (~)",
        theory: "O padrão SemVer (MAJOR.MINOR.PATCH) organiza a evolução de software: MAJOR indica quebra de compatibilidade, MINOR adiciona recursos retrocompatíveis e PATCH corrige bugs sem novas funções. No package.json, o prefixo ^ permite atualizar MINOR e PATCH, enquanto ~ restringe atualizações apenas a PATCH.",
        questions: [
          q("Em uma versão no formato 2.4.1 segundo o SemVer, qual número representa a versão MINOR?", "O número 4", ["O número 2","O número 1"], "O primeiro dígito é MAJOR (2), o segundo é MINOR (4) e o terceiro é PATCH (1)."),
          q("Quando uma biblioteca deve obrigatoriamente incrementar sua versão MAJOR segundo o SemVer?", "Sempre que introduzir alterações incompatíveis (breaking changes) que quebrem código existente", ["Quando corrigir um erro de digitação","A cada 30 dias"], "Incrementos de MAJOR alertam os desenvolvedores de que a atualização exigirá refatoração."),
          q("O que significa o operador de acento circunflexo em \"^1.2.3\" no package.json?", "Permite instalar qualquer versão >= 1.2.3 e < 2.0.0 (atualiza minor e patch retrocompatíveis)", ["Trava exatamente na versão 1.2.3","Instala qualquer versão até o infinito"], "^ aceita melhorias que não quebrem a API pública dentro da mesma versão major."),
          q("Qual operador restringe a atualização automática exclusivamente para versões PATCH (ex: \"~1.2.3\")?", "O caractere til (~)", ["O caractere asterisco (*)","O caractere arroba (@)"], "~1.2.3 aceita correções de bugs até 1.2.9, mas rejeita a minor 1.3.0."),
          t("Qual componente do SemVer é incrementado quando são lançadas correções de bugs sem novidades na API?", ["PATCH"], "PATCH representa consertos de defeitos sem novos recursos na biblioteca."),
          g("Complete a definição exata de versão no package.json sem nenhum prefixo de tolerância:", ["1.4.0"], "Escrever a versão sem símbolos trava a versão exata.", "\"minha-lib\": \"____\""),
          o("Ordene o impacto das alterações de código na versão SemVer (do menor ao mais crítico):", ["PATCH: Conserto de um bug interno de validação sem alterar a API pública (1.0.0 -> 1.0.1)","MINOR: Adição de uma nova função utilitária retrocompatível (1.0.1 -> 1.1.0)","MAJOR: Remoção ou alteração de parâmetros em métodos existentes (1.1.0 -> 2.0.0)","Publicação de release notes alertando usuários sobre as quebras de contrato do MAJOR"], "Correção em PATCH, novidade retrocompatível em MINOR, quebra em MAJOR e release notes."),
          p("Associe o operador de tolerância do SemVer ao seu efeito:", [["^1.3.2","Permite atualizar correções e novos recursos até a versão 1.999.999"],["~1.3.2","Permite atualizar apenas consertos de bugs da linha 1.3.x (rejeita 1.4.0)"],["1.3.2 (exato)","Trava estritamente na versão indicada sem aceitar nenhuma atualização"],["Breaking Change","Mudança que quebra contratos exigindo incremento imediato do dígito MAJOR"]], "Compreender SemVer evita que atualizações automáticas silenciosas quebrem sistemas em produção.")
        ]
      },
      {
        id: "javascript-c12-u2-l3-o-papel-de-package-lock-json-e-npm-ci",
        title: "A importância de package-lock.json e o comando npm ci",
        subtitle: "Determinismo absoluto · Garantindo que todos os ambientes instalem os mesmos bytes",
        theory: "Enquanto o package.json expressa intenções e faixas de versões com SemVer, o package-lock.json registra a árvore exata de todas as dependências transitivas resolvidas com hashes criptográficos SHA-512. Em esteiras de CI/CD e servidores, usa-se o comando npm ci em vez de npm install para garantir builds determinísticos.",
        questions: [
          q("Qual é o propósito fundamental do arquivo package-lock.json no ecossistema npm?", "Travar a árvore exata de dependências e hashes garantindo instalações idênticas em qualquer computador", ["Guardar as senhas do banco de dados","Gerar o código minificado"], "O lockfile garante que dois desenvolvedores instalem exatamente os mesmos bytes."),
          q("Por que devemos utilizar o comando \"npm ci\" em vez de \"npm install\" em pipelines de integração contínua (CI)?", "Porque npm ci deleta a pasta node_modules e instala exatamente o que está no lockfile sem alterá-lo", ["Porque npm ci é mais lento","Porque npm ci não requer internet"], "npm ci aborta com erro caso o package.json e o package-lock.json estejam dessincronizados."),
          q("O arquivo package-lock.json deve ser versionado no controle de versão Git da equipe?", "Sim, obrigatoriamente; comitar o lockfile previne surpresas e discrepâncias entre ambientes", ["Não, deve ser colocado no .gitignore","Apenas em projetos de teste"], "Ignorar o lockfile faz cada máquina resolver versões diferentes gerando falhas imprevisíveis."),
          q("Como o package-lock.json protege a aplicação contra pacotes corrompidos ou alterados no registro?", "Armazenando hashes criptográficos de integridade (integrity) que conferem o checksum do download", ["Bloqueando o download de arquivos zip","Exigindo biometria do operador"], "Se o hash SHA do arquivo baixado não bater com o lockfile, o npm interrompe a instalação."),
          t("Qual comando do npm é otimizado para ambientes automatizados de CI/CD garantindo instalação determinística?", ["npm ci"], "npm ci instala estritamente as dependências travadas no lockfile."),
          g("Complete o comando de instalação limpa e ultra-rápida para ambientes de integração contínua:", ["ci"], "npm ci é o comando canônico em servidores de automação.", "npm ____"),
          o("Ordene a sequência de instalação em um servidor de produção com npm ci:", ["O runner de CI/CD realiza o checkout do código incluindo package-lock.json","O runner executa npm ci que remove qualquer resíduo anterior de node_modules","O npm valida a sincronia entre package.json e lockfile e confere os hashes SHA","A instalação conclui com integridade 100% idêntica à do ambiente de desenvolvimento"], "Checkout do lockfile, remoção de resíduos, verificação de integridade e instalação fiel."),
          p("Associe o comando do npm ao seu ambiente de uso ideal:", [["npm install","Ambiente de desenvolvimento local ao adicionar ou atualizar dependências"],["npm ci","Servidores de integração contínua (CI) e produção para reprodução idêntica"],["package-lock.json","Registro exato da árvore de versões e hashes de segurança do projeto"],["Campo \"integrity\"","Hash criptográfico que valida a autenticidade dos pacotes baixados"]], "O uso disciplinado do lockfile e de npm ci é a primeira barreira contra falhas de deploy.")
        ]
      },
      {
        id: "javascript-c12-u2-l4-auditoria-de-seguranca-com-npm-audit",
        title: "Segurança de dependências: npm audit e vulnerabilidades",
        subtitle: "Higiene de código · Identificando e corrigindo falhas na árvore de pacotes",
        theory: "Com dezenas de dependências diretas e indiretas em node_modules, o risco de vulnerabilidades conhecidas é real. O comando npm audit compara os pacotes instalados com a base de dados de vulnerabilidades de segurança (CVEs). O comando npm audit fix tenta atualizar pacotes vulneráveis sem quebrar versões major.",
        questions: [
          q("O que o comando \"npm audit\" faz ao ser executado na raiz do projeto?", "Examina todas as dependências instaladas contra o banco de dados oficial de vulnerabilidades (CVEs)", ["Mede a velocidade da internet","Formata os arquivos do projeto"], "npm audit gera um relatório categorizado por severidade: Low, Moderate, High e Critical."),
          q("Como o comando \"npm audit fix\" tenta resolver falhas de segurança detectadas?", "Atualizando automaticamente as dependências vulneráveis para versões corrigidas dentro do SemVer", ["Apagando a pasta node_modules","Desativando as funções perigosas"], "audit fix aplica correções de patch e minor seguras sem violar as regras do package.json."),
          q("O que faz o comando com flag forçada \"npm audit fix --force\" e por que ele deve ser usado com cautela?", "Ele instala versões major corrigidas mesmo que introduzam quebras de compatibilidade (breaking changes)", ["Ele apaga o banco de dados","Ele cancela a conta do npm"], "A flag --force pode quebrar a aplicação caso a versão corrigida mude métodos públicos da biblioteca."),
          q("Qual é uma excelente prática para manter a segurança do projeto em equipes modernas?", "Executar npm audit nas esteiras de pull request do Git bloqueando merges com falhas críticas", ["Nunca atualizar nenhum pacote","Instalar pacotes sem olhar o nome"], "Auditar pacotes no CI impede a entrada silenciosa de dependências comprometidas no repositório."),
          t("Qual comando nativo do npm verifica se existem vulnerabilidades conhecidas na árvore de pacotes?", ["npm audit"], "npm audit inspeciona e relata falhas conhecidas de segurança."),
          g("Complete o comando que aplica automaticamente correções seguras de vulnerabilidades:", ["audit fix"], "npm audit fix corrige dependências de acordo com o SemVer.", "npm ____"),
          o("Ordene a rotina de saneamento de vulnerabilidades em um projeto Node.js:", ["Executar npm audit no terminal e analisar as vulnerabilidades reportadas","Tentar a correção automatizada retrocompatível com npm audit fix","Para falhas restantes de quebra major, consultar o changelog e atualizar manualmente","Rodar a suíte completa de testes unitários para garantir que nada foi quebrado"], "Diagnóstico com audit, correção com fix, atualização manual de majors e execução de testes."),
          p("Associe o nível de severidade de vulnerabilidade ao seu risco:", [["Critical","Vulnerabilidade crítica de execução remota de código ou vazamento grave"],["High","Falha grave que compromete a integridade ou disponibilidade do sistema"],["Moderate","Risco controlado em cenários específicos como ataques de negação de serviço"],["npm audit fix --force","Instala correções de versão major com risco de quebrar contratos de código"]], "A segurança do software depende diretamente da vigilância constante sobre as dependências externas.")
        ]
      },
      {
        id: "javascript-c12-u2-l5-o-comando-npx-e-execucao-de-ferramentas",
        title: "O utilitário npx: execução temporária e sem instalação global",
        subtitle: "Ferramentas sob demanda · Executando pacotes descartáveis e binários locais com segurança",
        theory: "O comando npx (incluso no npm) executa binários de pacotes Node.js de forma transparente. Ele procura primeiro o executável na pasta local node_modules/.bin; se não encontrar, baixa a versão mais recente em um cache temporário na máquina, executa o comando e descarta os arquivos, dispensando o antigo npm install -g.",
        questions: [
          q("Qual é o benefício do npx em relação ao antigo comando de instalação global (npm install -g)?", "Permite executar ferramentas na versão mais recente sem poluir a máquina com pacotes globais obsoletos", ["Deixa os scripts imunes a bugs","Não precisa do Node instalado"], "npx baixa em cache descartável e roda imediatamente ferramentas ocasionais como criadores de projeto."),
          q("Onde o npx procura prioritariamente pelo executável antes de tentar baixar do registro npm?", "Na pasta local node_modules/.bin do projeto atual", ["Na pasta Documentos do usuário","No registro do Windows"], "Se o projeto já tiver o ESLint instalado localmente, npx eslint usará a versão exata do projeto."),
          q("Qual é a forma recomendada de executar um scaffolding de novo projeto como criar-app sem instalar nada antes?", "npx criar-app meu-projeto", ["npm install -g criar-app; criar-app meu-projeto","git clone criar-app"], "npx garante que a versão do gerador executada seja sempre a mais atual do ecossistema."),
          q("Como o npx ajuda a evitar o problema \"na minha máquina funciona\" em comandos de build em equipe?", "Garantindo que todos executem a versão local travada no package.json via npx em vez de versões globais", ["Compartilhando a memória RAM via rede","Compilando os binários em C#"], "Executar via npx dentro do repositório garante paridade de versão entre os membros da equipe."),
          t("Qual comando utilitário empacotado com o npm executa pacotes Node diretamente da nuvem ou do repositório local?", ["npx"], "npx executa binários locais e temporários sem instalação global."),
          g("Complete o comando que executa o linter instalado localmente na pasta do projeto:", ["npx"], "npx localiza o binário em node_modules/.bin.", "____ eslint ."),
          o("Ordene o fluxo de execução de um comando acionado via npx:", ["Operador digita comando no terminal: npx ferramenta-cli","npx verifica se o binário existe localmente em node_modules/.bin do projeto","Se não existir localmente, faz download da versão correspondente no cache efêmero","Executa o binário com os argumentos fornecidos e finaliza o processo"], "Disparo de comando, conferência local, download efêmero sob demanda e execução."),
          p("Associe o comando do ecossistema ao seu comportamento:", [["npx <pacote>","Executa o binário do pacote local ou baixa temporariamente para execução única"],["node_modules/.bin","Diretório oculto onde residem os links simbólicos dos executáveis do projeto"],["npm install -g (legado)","Instalação global que costuma causar conflitos de versões entre projetos"],["Cache efêmero do npx","Área temporária do sistema operacional que armazena ferramentas sob demanda"]], "O utilitário npx transformou a experiência de uso de CLIs e scaffolding no ecossistema JavaScript.")
        ]
      }
    ],
    3: [
      {
        id: "javascript-c12-u3-l1-secao-scripts-e-npm-run",
        title: "A seção scripts do package.json e o comando npm run",
        subtitle: "Automação declarativa · Criando comandos de compilação, testes e execução",
        theory: "A seção \"scripts\" do package.json mapeia nomes de comandos amigáveis para linhas de comando do terminal: \"scripts\": { \"dev\": \"node --watch server.js\", \"test\": \"node --test\" }. Executar npm run dev roda o comando associado com as variáveis de ambiente e o PATH apontando para os binários locais do projeto.",
        questions: [
          q("Qual é a vantagem de rodar comandos de ferramentas através de \"npm run <script>\" em vez de rodar o executável puro?", "O npm injeta automaticamente node_modules/.bin no PATH da execução, encontrando binários locais sem npx", ["O comando roda com privilégios de administrador","O terminal fecha automaticamente"], "Scripts do package.json usam diretamente os executáveis instalados localmente no repositório."),
          q("Quais nomes de scripts clássicos podem ser executados sem a palavra \"run\" (atalhos especiais)?", "npm test e npm start (além de npm stop e npm restart)", ["npm build e npm dev","npm lint e npm format"], "test e start são scripts canônicos do npm que possuem atalhos sem necessidade de digitar \"run\"."),
          q("Como passar argumentos extras do terminal para o script configurado no package.json?", "Inserindo o separador \"--\" antes dos argumentos adicionais (ex: npm test -- --coverage)", ["Colocando os argumentos entre aspas simples","Passando os argumentos em maiúsculas"], "O duplo hífen \"--\" sinaliza ao npm para repassar todos os parâmetros seguintes para o comando interno."),
          q("Qual comando do terminal exibe a lista completa de todos os scripts definidos no package.json atual?", "npm run (sem nenhum argumento)", ["npm list-scripts","npm show-commands"], "Executar apenas npm run imprime a tabela de scripts disponíveis e seus respectivos comandos."),
          t("Qual comando do npm é um atalho canônico nativo para \"npm run test\"?", ["npm test"], "npm test dispensa a palavra intermediária \"run\"."),
          g("Complete a definição do script de inicialização do servidor no package.json:", ["\"start\""], "O script start é o ponto de partida do projeto.", "{\n  \"scripts\": {\n    ____: \"node server.js\"\n  }\n}"),
          o("Ordene a criação e execução de um atalho de linting via npm scripts:", ["Abrir o package.json e localizar o objeto da propriedade \"scripts\"","Adicionar a linha: \"lint\": \"eslint src/ --max-warnings 0\"","Executar no terminal o comando padronizado: npm run lint","O npm localiza o binário eslint em node_modules/.bin e realiza a auditoria"], "Abertura do manifesto, adição do script, execução com npm run e resolução no PATH local."),
          p("Associe o comando do script ao seu comportamento:", [["npm start","Atalho padrão para iniciar a aplicação sem precisar digitar npm run"],["npm test","Atalho canônico para disparar a suíte de testes do projeto"],["Separador \"--\"","Indica ao npm para repassar argumentos seguintes para o script interno"],["PATH enriquecido","Mecanismo que permite ao script invocar binários de node_modules/.bin"]], "Scripts do package.json atuam como a documentação executável das rotinas do projeto.")
        ]
      },
      {
        id: "javascript-c12-u3-l2-hooks-de-ciclo-de-vida-pre-e-post",
        title: "Hooks de ciclo de vida automáticos: pre e post",
        subtitle: "Pipelines encadeados · Executando validações antes e depois de comandos",
        theory: "O npm possui um sistema de ganchos (lifecycle hooks) automáticos baseado em convenção de nomes: prefixar um script com \"pre\" o executa antes do script principal, e prefixar com \"post\" o executa imediatamente após. Criar pretest garante que o código passe pelo lint antes dos testes rodarem.",
        questions: [
          q("Se existirem os scripts \"prebuild\", \"build\" e \"postbuild\", qual é a ordem exata de execução ao rodar \"npm run build\"?", "Primeiro roda prebuild, em seguida build, e por fim postbuild automaticamente", ["Roda apenas o build","Roda postbuild e depois prebuild"], "O npm detecta os prefixos pre e post e orquestra a sequência sem comandos manuais extras."),
          q("O que acontece com o comando principal se o script com prefixo \"pre\" falhar com código de erro diferente de 0?", "O npm interrompe a esteira imediatamente e NÃO executa o script principal nem o post", ["O npm continua rodando normalmente","O npm apaga o package.json"], "Falhas no hook pre abortam a operação garantindo que pré-requisitos não atendidos travem a esteira."),
          q("Qual é um uso clássico e profissional para o hook \"pretest\" no package.json?", "Executar o linter e checagem de tipos (ex: \"pretest\": \"npm run lint\") antes de rodar os testes", ["Reiniciar o computador","Subir o código para o GitHub"], "Garante que os testes nem comecem a rodar caso o código viole os padrões de formatação ou tipagem."),
          q("Qual hook automático especial é acionado pelo npm imediatamente após o comando \"npm install\" terminar?", "postinstall (frequentemente usado para compilar binários ou gerar código Prisma)", ["preinstall","afterinstall"], "postinstall automatiza tarefas de montagem logo após o download de dependências."),
          t("Qual prefixo de nome de script faz o npm executá-lo imediatamente ANTES do comando principal?", ["pre"], "O prefixo pre define ações preliminares obrigatórias no npm."),
          g("Complete o hook que roda a limpeza de diretórios antes do comando de compilação build:", ["prebuild"], "prebuild prepara o ambiente antes do build.", "\"scripts\": {\n  \"____\": \"rimraf dist\",\n  \"build\": \"tsc\"\n}"),
          o("Ordene o fluxo encadeado de uma esteira automatizada com hooks:", ["O desenvolvedor digita no terminal: npm run build","O npm intercepta e aciona automaticamente o hook \"prebuild\" (limpando a pasta dist)","O script principal \"build\" compila e minifica todos os arquivos na pasta dist","O hook \"postbuild\" comprime os artefatos em gzip ou registra logs de sucesso"], "Disparo do build, execução do prebuild, processamento do build e acabamento no postbuild."),
          p("Associe o hook ao seu papel no ciclo de vida:", [["pretest","Executado compulsoriamente antes de npm test para validações preliminares"],["posttest","Executado logo após npm test para emissão de relatórios de cobertura"],["postinstall","Disparado automaticamente ao término de npm install para configurar artefatos"],["Aborto por erro","Comportamento do npm de cancelar a cadeia se o script pre falhar"]], "Lifecycle hooks garantem consistência operacional eliminando etapas manuais esquecidas.")
        ]
      },
      {
        id: "javascript-c12-u3-l3-modo-watch-nativo-no-node-js",
        title: "Recarregamento em desenvolvimento: a flag --watch nativa",
        subtitle: "Fim do Nodemon · Como reiniciar o servidor a cada alteração de arquivo",
        theory: "Nas versões modernas do Node.js, não é mais necessário instalar pacotes pesados como o Nodemon para recarregar o servidor a cada alteração. A flag nativa node --watch monitora os arquivos importados e reinicia o processo automaticamente e em milissegundos assim que detecta mudanças salvas no disco.",
        questions: [
          q("Qual comando nativo do Node.js substitui o utilitário Nodemon para reiniciar o app ao salvar arquivos?", "node --watch server.js", ["node --reload server.js","node --live server.js"], "A flag nativa --watch monitora o grafo de arquivos do módulo e reinicia sem dependências externas."),
          q("O que a flag --watch faz se você salvar um arquivo que contenha um erro de sintaxe fatal?", "O Node emite o erro no terminal, mantém o monitor ativo e aguarda a próxima correção para reiniciar", ["O processo morre e o terminal é fechado","O Node apaga o arquivo corrompido"], "O modo watch nativo é resiliente e não quebra definitivamente na primeira falha de sintaxe."),
          q("Como monitorar caminhos ou pastas específicas além do ponto de entrada com a flag watch?", "Usando a opção --watch-path (ex: node --watch --watch-path=./src index.js)", ["Passando múltiplos nomes de arquivos","Adicionando a flag --all"], "--watch-path permite incluir diretórios adicionais de assets ou templates no monitoramento."),
          q("Qual é a vantagem de adotar recursos nativos como --watch em vez de instalar ferramentas de terceiros?", "Menor consumo de disco em node_modules, zero vulnerabilidades de supply chain e paridade de runtime", ["O código fica mais lento","Apenas para sistemas Linux"], "Utilizar ferramentas embutidas reduz a sobrecarga de manutenção do projeto a longo prazo."),
          t("Qual flag do executável node reinicia o script automaticamente ao detectar alterações no código?", ["--watch"], "--watch ativa o monitoramento de arquivos nativo do Node.js."),
          g("Complete o script de desenvolvimento no package.json habilitando o recarregamento automático nativo:", ["--watch"], "--watch vigia alterações no arquivo.", "\"dev\": \"node ____ server.js\""),
          o("Ordene a rotina de trabalho em desenvolvimento usando o modo watch nativo:", ["Configurar o script no package.json: \"dev\": \"node --watch app.js\"","Iniciar o ambiente executando npm run dev no terminal","Editar o código no editor e salvar o arquivo alterado","O Node detecta a modificação, limpa os módulos e reinicia o processo instantaneamente"], "Configuração do script, inicialização, salvamento de código e reinício automático."),
          p("Associe a ferramenta ao seu modelo de monitoramento:", [["node --watch","Monitoramento nativo ultra-rápido integrado diretamente no runtime do Node"],["Nodemon (legado)","Pacote externo de terceiros que exigia instalação separada no projeto"],["--watch-path","Flag para incluir diretórios customizados na esteira de monitoramento"],["Resiliência a crash","Capacidade do watch de manter o processo esperando correção após erros"]], "A flag --watch simplifica o dia a dia eliminando pacotes redundantes de desenvolvimento.")
        ]
      },
      {
        id: "javascript-c12-u3-l4-execucao-de-testes-com-node-test-runner",
        title: "O Test Runner nativo do Node.js: node:test e node:assert",
        subtitle: "Testes sem bibliotecas extras · Suíte de testes embutida ultra-rápida",
        theory: "O Node.js possui um test runner completo embutido acessível via módulo node:test e comando node --test. Ele suporta testes assíncronos, suites com describe/it, mocks nativos e asserções estritas com node:assert/strict, permitindo criar rotinas de qualidade profissionais com zero dependências externas.",
        questions: [
          q("Qual módulo nativo do Node.js fornece as funções test, describe e it para estruturar testes unitários?", "node:test", ["node:unit","node:spec"], "node:test é o framework de testes integrado na biblioteca padrão do Node.js."),
          q("Qual comando do terminal executa automaticamente todos os arquivos que terminem com .test.js no projeto?", "node --test", ["node test-all","npm run-tests"], "node --test descobre recursivamente arquivos com padrão test.js ou spec.js e os executa."),
          q("Qual módulo de asserções estrito é o par ideal do test runner nativo do Node.js?", "node:assert/strict", ["node:expect","node:chai"], "node:assert/strict verifica igualdades sem coerção implícita de tipos."),
          q("O test runner nativo do Node.js suporta a execução de testes assíncronos com async/await?", "Sim, funções de teste assíncronas retornam Promises que o executor aguarda automaticamente", ["Não, apenas funções síncronas","Exige callbacks manuais done()"], "O runner nativo foi desenhado com suporte de primeira classe a async/await."),
          t("Qual comando do executável node roda nativamente a suíte de testes do projeto?", ["node --test"], "node --test localiza e executa os testes do repositório."),
          g("Complete a importação das funções de estruturação de testes do módulo nativo:", ["node:test"], "node:test é o módulo padrão de testes.", "import { test, describe } from \"____\";"),
          o("Ordene a estrutura de um teste unitário escrito com a suíte nativa:", ["Importar test de \"node:test\" e assert de \"node:assert/strict\"","Declarar o caso de teste: test(\"deve somar dois números\", () => { ... })","Executar a função da aplicação calculando o resultado esperado","Validar a asserção de igualdade: assert.equal(resultado, 10)"], "Importação de módulos, declaração de teste, cálculo de resultado e asserção estrita."),
          p("Associe o componente de testes ao seu papel:", [["node:test","Módulo que provê os blocos test, describe, it, before e after"],["node:assert/strict","Biblioteca de asserções com validação rigorosa de igualdade estrita"],["node --test","Comando de terminal que executa testes em paralelo com relatório limpo"],["assert.deepEqual(a, b)","Compara recursivamente a equivalência profunda de objetos e arrays"]], "O test runner nativo do Node.js elimina a necessidade de pacotes pesados para testes corporativos.")
        ]
      },
      {
        id: "javascript-c12-u3-l5-passagem-de-argumentos-e-flags-customizadas",
        title: "Passagem de parâmetros e flags customizadas em scripts",
        subtitle: "Composição de comandos · Como repassar filtros e parâmetros do terminal",
        theory: "Ao orquestrar scripts complexos no package.json, o separador especial duplo hífen (\"--\") instrui o gerenciador npm a parar de processar flags para si próprio e repassá-las integralmente para o script filho. Isso viabiliza passar filtros de teste (\"npm test -- --grep=auth\") ou portas customizadas dinamicamente.",
        questions: [
          q("Por que a chamada \"npm test --grep=usuarios\" falha ou não repassa o filtro para o executor de testes?", "Porque sem o separador \"--\", o npm tenta interpretar a flag --grep como uma opção dele próprio", ["Porque o npm proíbe filtros","Porque o terminal apaga a palavra"], "O npm consome argumentos na sua linha de comando a menos que o delimitador \"--\" seja usado."),
          q("Como repassar com segurança a flag \"--bail\" para interromper a suíte no primeiro teste que falhar?", "npm test -- --bail", ["npm test --bail","npm run test-bail"], "O duplo hífen transfere a flag --bail diretamente para o executável que roda por baixo dos panos."),
          q("Como ler variáveis de configuração passadas no terminal no formato \"node script.js --porta 8080\"?", "Inspecionando os índices do array process.argv ou utilizando o utilitário nativo parseArgs", ["Lendo process.input","Usando window.location"], "O Node.js moderno expõe util.parseArgs() em node:util para interpretar flags sem pacotes extras."),
          q("Qual utilitário nativo do módulo node:util analisa flags (--nome) e opções curtas (-f) da linha de comando?", "util.parseArgs()", ["util.getFlags()","util.cli()"], "parseArgs oferece uma solução completa para construção de CLIs robustas e tipadas no Node.js."),
          t("Qual símbolo de dois caracteres é o delimitador que transfere parâmetros do npm para o script interno?", ["--"], "O duplo hífen repassa argumentos subsequentes ao comando subjacente."),
          g("Complete o comando repassando a porta 9000 para o script de inicialização:", ["--"], "O separador -- transfere as flags ao script.", "npm run dev ____ --port=9000"),
          o("Ordene a passagem e consumo de parâmetros em um script npm:", ["O operador digita: npm test -- --test-name-pattern=\"login\"","O npm consome a primeira parte e transfere os parâmetros após o \"--\" para o processo filho","O test runner do Node.js recebe a flag --test-name-pattern=\"login\"","O runner filtra e executa exclusivamente os testes cujo título coincida com \"login\""], "Digitação com separador, transferência pelo npm, recepção pelo executor e filtragem de testes."),
          p("Associe a sintaxe de argumento ao seu efeito:", [["npm test -- <args>","Encaminha os argumentos extras diretamente para o executor de testes"],["util.parseArgs()","Utilitário nativo de node:util para parse de flags e opções CLI"],["process.argv.slice(2)","Acesso cru aos parâmetros textuais informados após o nome do script"],["Flag --test-name-pattern","Opção nativa do test runner para filtrar testes por expressão regular"]], "Dominar o repasse de parâmetros transforma scripts estáticos em ferramentas flexíveis de automação.")
        ]
      }
    ],
    4: [
      {
        id: "javascript-c12-u4-l1-leitura-assincrona-com-node-fs-promises",
        title: "Leitura assíncrona de arquivos com node:fs/promises",
        subtitle: "I/O não bloqueante · readFile, codificação UTF-8 e prevenção de gargalos de CPU",
        theory: "Para ler arquivos sem bloquear o event loop do Node.js, usamos o módulo assíncrono node:fs/promises. A função readFile(caminho, \"utf8\") lê os bytes do disco em background e resolve uma Promise com o conteúdo em texto. Sem a especificação de codificação \"utf8\", ela retorna um objeto Buffer binário cru.",
        questions: [
          q("O que acontece se você invocar await readFile(caminho) sem especificar a codificação \"utf8\"?", "A Promise resolve para um objeto Buffer de bytes brutos em vez de uma string de texto legível", ["Ocorre um SyntaxError fatal","O arquivo é deletado"], "Buffers representam sequências de memória binária; para texto legível, declare \"utf8\"."),
          q("Por que devemos evitar funções com sufixo \"Sync\" como readFileSync em servidores web em produção?", "Porque funções síncronas congelam a thread principal do Node, impedindo o atendimento a todos os outros usuários", ["Porque elas não funcionam em arquivos JSON","Porque aumentam o consumo de internet"], "Operações síncronas bloqueiam todo o event loop durante a latência de rotação do disco."),
          q("Qual exceção assíncrona é lançada por readFile quando o caminho especificado não existe no sistema de arquivos?", "Um erro com código numérico/identificador \"ENOENT\" (Error NO ENTry)", ["EEXIST","EACCES"], "ENOENT é o código padrão POSIX para arquivo ou diretório não encontrado."),
          q("Como ler o conteúdo de um arquivo JSON e transformá-lo em objeto com segurança?", "Lendo a string com await readFile(path, \"utf8\") e aplicando JSON.parse dentro de try/catch", ["Usando readFile.json()","Importando o arquivo com eval()"], "A composição de readFile assíncrono com parse defensivo garante robustez e integridade."),
          t("Qual código de erro POSIX do Node.js indica que o arquivo não existe no caminho informado?", ["ENOENT"], "ENOENT sinaliza ausência do arquivo no sistema de arquivos."),
          g("Complete a leitura assíncrona garantindo a decodificação imediata do texto em UTF-8:", ["\"utf8\""], "A especificação \"utf8\" decodifica os bytes como texto.", "const conteudo = await readFile(caminho, ____);"),
          o("Ordene a leitura de um arquivo de configuração de forma assíncrona e resiliente:", ["Importar a função readFile de \"node:fs/promises\"","Iniciar bloco try e disparar const texto = await readFile(\"config.json\", \"utf8\")","Converter a string resultante em objeto através de JSON.parse(texto)","Capturar falhas no catch tratando erros específicos como ENOENT com mensagens claras"], "Importação, leitura assíncrona com try, conversão de dados e tratamento de ENOENT no catch."),
          p("Associe o elemento de I/O de arquivos ao seu conceito:", [["node:fs/promises","API baseada em Promises para manipulação não bloqueante de arquivos"],["Codificação \"utf8\"","Instrui o leitor a traduzir os bytes brutos em caracteres de texto legíveis"],["Objeto Buffer","Representação de alocação de memória de tamanho fixo para dados binários"],["Código ENOENT","Identificador de erro que confirma que a rota do arquivo não existe no disco"]], "A leitura não bloqueante com node:fs/promises é a espinha dorsal de aplicações I/O intensivas.")
        ]
      },
      {
        id: "javascript-c12-u4-l2-escrita-e-anexacao-com-writefile-e-appendfile",
        title: "Escrita e anexação atômica: writeFile e appendFile",
        subtitle: "Persistência em disco · Sobrescrita, opções de criação e gravação de logs",
        theory: "A função writeFile(caminho, dados, \"utf8\") grava dados em um arquivo, criando-o se não existir ou sobrescrevendo seu conteúdo anterior. Para adicionar linhas sucessivas (como logs de auditoria) sem apagar o conteúdo existente, usamos appendFile(), que anexa a carga útil ao final do arquivo com máxima eficiência.",
        questions: [
          q("O que a função writeFile faz se o arquivo de destino já existir no diretório informado?", "Sobrescreve integralmente o arquivo anterior substituindo seu conteúdo pelo novo payload", ["Lança o erro EEXIST","Anexa os dados ao final"], "writeFile substitui o conteúdo por padrão; use appendFile para anexar."),
          q("Qual função de node:fs/promises deve ser utilizada para adicionar novas entradas de log ao fim de um arquivo existente?", "appendFile(caminho, novaLinha, \"utf8\")", ["writeFile.add()","pushFile()"], "appendFile anexa a string ao fim do arquivo sem reescrever todo o histórico anterior."),
          q("O que acontece se tentarmos gravar em um arquivo cujo diretório pai não existe no disco?", "A Promise rejeita com o erro ENOENT informando que a pasta onde o arquivo ficaria não existe", ["O Node cria as pastas automaticamente","O arquivo é salvo na área de trabalho"], "O arquivo pode ser novo, mas a árvore de pastas onde ele reside deve existir previamente."),
          q("Qual flag de escrita pode ser passada nas opções de writeFile para falhar caso o arquivo já exista (impedindo sobrescrita acidental)?", "{ flag: \"wx\" } (write exclusive)", ["{ flag: \"safe\" }","{ flag: \"no-overwrite\" }"], "A flag \"wx\" falha com erro EEXIST se o arquivo já existir, prevenindo perda acidental de dados."),
          t("Qual função assíncrona de node:fs/promises anexa dados ao final de um arquivo sem sobrescrevê-lo?", ["appendFile"], "appendFile concatena dados no final do arquivo."),
          g("Complete a anexação de uma nova linha de log com o módulo nativo:", ["appendFile"], "appendFile adiciona registros preservando o histórico.", "await ____(\"acessos.log\", `${mensagem}\\n`, \"utf8\");"),
          o("Ordene a persistência segura de dados em arquivo com tratamento defensivo:", ["Formatar a carga útil em formato textual (ex: JSON.stringify(dados, null, 2))","Invocar await writeFile(caminho, texto, \"utf8\") para gravar os dados no disco","Garantir que a Promise foi resolvida confirmando a persistência física","Registrar evento de sucesso confirmando a sincronização dos dados com o disco"], "Formatação de texto, execução de writeFile, confirmação de resolução e registro de sucesso."),
          p("Associe a operação de gravação à sua ação no sistema de arquivos:", [["writeFile","Cria novo arquivo ou substitui integralmente o arquivo pré-existente"],["appendFile","Preserva o conteúdo prévio e anexa novas informações no final do arquivo"],["Flag \"wx\"","Modo exclusivo que rejeita a escrita se o arquivo já existir no disco"],["Linha nova (\"\\n\")","Caractere delimitador essencial ao gravar registros sucessivos em logs"]], "Gerenciar escrita e anexação com rigor protege o histórico de transações e logs da aplicação.")
        ]
      },
      {
        id: "javascript-c12-u4-l3-gerenciamento-de-pastas-com-mkdir-e-readdir",
        title: "Criação recursiva e listagem de pastas: mkdir e readdir",
        subtitle: "Estruturação de diretórios · A opção recursive: true e inspeção com withFileTypes",
        theory: "Para criar pastas com segurança usamos mkdir(caminho, { recursive: true }): cria subpastas ausentes sem erro se a pasta já existir. Para inspecionar o conteúdo de uma pasta, readdir(caminho, { withFileTypes: true }) retorna objetos Dirent com métodos convenientes como isDirectory() e isFile().",
        questions: [
          q("Por que a opção { recursive: true } é essencial ao criar diretórios com mkdir?", "Permite criar subpastas aninhadas em cadeia e não quebra com erro se a pasta já existir", ["Acelera a gravação no SSD","Gera pastas com criptografia"], "Sem recursive: true, o mkdir falha com ENOENT se a pasta pai não existir ou com EEXIST se já existir."),
          q("Qual é o benefício de passar { withFileTypes: true } ao listar arquivos com readdir()?", "Retorna instâncias de fs.Dirent que informam imediatamente se cada item é arquivo ou pasta sem invocar stat() extra", ["Ordena os arquivos por tamanho","Lê o conteúdo de todos os arquivos"], "withFileTypes poupa dezenas de chamadas lentas ao sistema de arquivos ao entregar o tipo direto do índice."),
          q("Como verificar se uma entrada retornada por readdir com withFileTypes é um diretório?", "entry.isDirectory()", ["entry.type === \"dir\"","entry.isFolder()"], "Objetos Dirent expõem métodos utilitários booleanos como isDirectory() e isFile()."),
          q("Qual função de node:fs/promises remove um diretório e todos os seus arquivos de forma recursiva?", "rm(caminho, { recursive: true, force: true })", ["rmdir.all()","deleteFolder()"], "rm com recursive e force é a forma moderna e segura que substituiu o antigo rmdir."),
          t("Qual opção booleana deve ser configurada em mkdir para criar diretórios aninhados sem quebrar se já existirem?", ["recursive"], "A opção recursive garante a criação segura de pastas pai e filhas."),
          g("Complete a criação segura do diretório de uploads garantindo recursividade:", ["recursive"], "recursive: true cria a árvore completa.", "await mkdir(\"./uploads/fotos\", { ____: true });"),
          o("Ordene a rotina de varredura e filtro de uma pasta com readdir:", ["Executar: const itens = await readdir(\"./arquivos\", { withFileTypes: true })","Iterar sobre a lista recebendo cada objeto de entrada Dirent","Filtrar apenas os arquivos regulares verificando if (item.isFile())","Processar a lista final contendo unicamente os nomes de arquivos válidos"], "Leitura com withFileTypes, iteração, filtragem com isFile e processamento final."),
          p("Associe a operação de diretório ao seu comportamento:", [["mkdir(path, { recursive: true })","Cria toda a árvore de diretórios sem falhar se já existir"],["readdir(path, { withFileTypes: true })","Lista itens fornecendo objetos Dirent com checagem de tipo"],["entry.isFile()","Retorna true se a entrada for um arquivo regular e não uma pasta"],["rm(path, { recursive: true })","Remove um diretório e todo o seu conteúdo aninhado de forma atômica"]], "Manipular pastas com flags recursivas elimina erros de inicialização em deploys limpos.")
        ]
      },
      {
        id: "javascript-c12-u4-l4-inspecao-de-metadados-com-stat-e-lstat",
        title: "Inspeção de metadados de arquivos: stat e lstat",
        subtitle: "Propriedades do sistema · Tamanho em bytes, datas de modificação e permissões",
        theory: "A função stat(caminho) recupera os metadados do arquivo ou pasta (representados por um objeto fs.Stats). Ela informa o tamanho exato em bytes (stats.size), datas de acesso e modificação (stats.mtime) e métodos booleanos como isFile(). A variante lstat não segue links simbólicos, inspecionando o atalho em si.",
        questions: [
          q("Qual propriedade do objeto retornado por stat() informa o tamanho do arquivo em bytes?", "stats.size", ["stats.length","stats.bytes"], "stats.size reflete a contagem exata de bytes alocados pelo arquivo no disco."),
          q("Qual é a diferença entre as funções stat() e lstat() no Node.js?", "stat segue o link simbólico até o arquivo de destino real; lstat inspeciona o próprio link simbólico", ["stat só funciona em Linux","lstat só mede pastas"], "lstat é indispensável para detectar links simbólicos sem navegar involuntariamente para outro destino."),
          q("Qual propriedade de fs.Stats informa a data e hora da última modificação do arquivo no disco?", "stats.mtime (ou stats.mtimeMs em milissegundos)", ["stats.updatedAt","stats.modifiedDate"], "mtime armazena uma instância de Date com o timestamp de gravação no sistema de arquivos."),
          q("Qual método da classe fs.Stats testa se o caminho aponta para um arquivo comum de dados?", "stats.isFile()", ["stats.isRegular()","stats.checkFile()"], "isFile retorna true para arquivos normais e false para diretórios, sockets ou pipes."),
          t("Qual propriedade numérica do objeto retornado por stat() indica o tamanho do arquivo em bytes?", ["size"], "stats.size informa o peso do arquivo em bytes."),
          g("Complete a extração dos metadados do arquivo de banco de dados:", ["stat"], "stat recupera informações de tamanho e datas.", "const stats = await ____(\"dados.db\");"),
          o("Ordene a validação de tamanho antes de processar um upload:", ["Obter os metadados do arquivo gravado: const info = await stat(caminho)","Verificar se o alvo é um arquivo comum: if (!info.isFile()) throw Error","Validar se o tamanho respeita o limite de 5MB: if (info.size > 5 * 1024 * 1024)","Prosseguir com o processamento seguro do conteúdo após a aprovação das regras"], "Obtenção de metadados, validação de isFile, checagem de limite em bytes e liberação."),
          p("Associe a propriedade de fs.Stats ao seu valor:", [["stats.size","Tamanho do arquivo em bytes físicos ocupados no disco"],["stats.mtime","Instância de Date informando a data/hora da última alteração de conteúdo"],["stats.birthtime","Data e hora da criação original do arquivo no sistema operacional"],["stats.isDirectory()","Método booleano que confirma se o caminho aponta para uma pasta"]], "Inspecionar metadados com stat() viabiliza políticas de quota, cache e integridade de arquivos.")
        ]
      },
      {
        id: "javascript-c12-u4-l5-streams-de-arquivo-com-create-read-write-stream",
        title: "Processamento de grandes volumes com fs.createReadStream",
        subtitle: "Fluxo contínuo · Lendo gigabytes de dados sem estourar a memória RAM",
        theory: "Carregar arquivos gigantescos (vídeos ou bancos de dados) na memória com readFile estoura o limite da heap do V8. A solução é usar Streams: fs.createReadStream(caminho) divide a leitura em pequenos chunks de bytes (ex: 64KB). Combinado com pipe() ou pipeline(), processamos arquivos imensos com uso constante de RAM.",
        questions: [
          q("Qual é o perigo de usar readFile() para ler um arquivo de log de 4 gigabytes no Node.js?", "O processo estourará a memória máxima da heap do V8 gerando um crash fatal de \"JavaScript heap out of memory\"", ["O arquivo será deletado","O Node ficará sem conexão"], "readFile tenta carregar o arquivo inteiro na memória de uma só vez."),
          q("Como createReadStream resolve o problema de consumo de memória em arquivos gigantescos?", "Processa o arquivo como um fluxo contínuo em pequenos pedaços (chunks) de bytes sob demanda", ["Comprime o arquivo em zip antes de ler","Grava o arquivo na placa de vídeo"], "O fluxo mantém apenas alguns kilobytes na memória a cada instante, sem reter todo o volume."),
          q("Qual utilitário do módulo node:stream/promises conecta streams com encerramento e limpeza de erros segura?", "pipeline(streamLeitura, streamTransform, streamEscrita)", ["pipeSync()","streamMerge()"], "pipeline fecha todos os streams e repassa erros adequadamente, superando as limitações do antigo .pipe()."),
          q("Qual evento de uma ReadableStream tradicional do Node.js é emitido a cada novo bloco de dados recebido?", "stream.on(\"data\", (chunk) => { ... })", ["stream.on(\"byte\", ...)","stream.on(\"packet\", ...)"], "O evento \"data\" entrega o buffer do próximo bloco pronto para processamento."),
          t("Qual método do módulo node:fs cria uma stream legível para consumo em pedaços contínuos?", ["createReadStream"], "createReadStream disponibiliza o arquivo em formato de stream legível."),
          g("Complete a conexão segura entre a leitura do arquivo e a escrita de saída usando pipeline:", ["pipeline"], "pipeline orquestra o fluxo fechando streams ao final.", "await ____(streamOrigem, streamDestino);"),
          o("Ordene a cópia eficiente de um arquivo massivo de dados usando streams:", ["Criar stream de leitura a partir da fonte: const leitor = createReadStream(\"grande.csv\")","Criar stream de escrita para o destino: const escritor = createWriteStream(\"backup.csv\")","Conectar e orquestrar ambos os fluxos com a função segura await pipeline(leitor, escritor)","Aguardar o término da cópia mantendo o consumo de memória RAM baixo e estável"], "Criação de stream leitora, criação de stream escritora, conexão via pipeline e término com memória baixa."),
          p("Associe o conceito de streams ao seu funcionamento:", [["fs.createReadStream","Lê arquivos em pequenos blocos contínuos de bytes (chunks de 64KB)"],["fs.createWriteStream","Grava fluxos de bytes no disco sob demanda aliviando a memória"],["pipeline() de node:stream","Conecta streams tratando encerramento e rejeição de falhas com perfeição"],["Backpressure","Mecanismo que pausa a leitura se o escritor de destino estiver mais lento"]], "Streams são o recurso mais sofisticado do Node.js para alto desempenho em dados massivos.")
        ]
      }
    ],
    5: [
      {
        id: "javascript-c12-u5-l1-o-modulo-node-path-e-normalizacao",
        title: "O módulo node:path e montagem segura com path.join",
        subtitle: "Independência de SO · Por que concatenar caminhos com barras manuais quebra no Windows",
        theory: "Sistemas operacionais usam separadores de caminho diferentes: Linux/macOS usam barra normal (\"/\"), enquanto Windows usa barra invertida (\"\\\\\"). Concatenar caminhos manualmente gera bugs multiplataforma. O módulo node:path e o método path.join() combinam segmentos usando o separador correto do sistema.",
        questions: [
          q("Por que concatenar caminhos de arquivos como \"pasta/\" + arquivo é uma má prática no Node.js?", "Porque quebra a compatibilidade no Windows, que utiliza barra invertida (\"\\\\\") como separador padrão", ["Porque o Node proíbe o operador de soma","Porque as barras consomem muita memória"], "path.join normaliza automaticamente as barras de acordo com o sistema operacional hospedeiro."),
          q("Qual método do módulo node:path junta múltiplos segmentos de caminho normalizando barras redundantes?", "path.join(\"pasta\", \"sub\", \"arquivo.txt\")", ["path.concat()","path.merge()"], "path.join resolve caminhos relativos, remove barras duplas e aplica o separador adequado."),
          q("Como o método path.join resolve segmentos de caminho relativo como \"..\" (voltar um diretório)?", "Ele calcula a navegação resolvendo a pasta anterior e simplificando o caminho resultante", ["Ele apaga a pasta anterior","Lança um erro de permissão"], "Segmentos como \"a/b/../c\" são normalizados automaticamente para \"a/c\"."),
          q("Qual propriedade de node:path expõe o separador de diretório específico do sistema operacional em execução?", "path.sep (\"/\" no Linux/macOS e \"\\\\\" no Windows)", ["path.delimiter","path.slash"], "path.sep permite inspecionar ou manipular o caractere de divisão de pastas da máquina atual."),
          t("Qual método de node:path deve ser utilizado para juntar pedaços de caminhos com separador do sistema?", ["join"], "path.join é a forma canônica e agnóstica de juntar partes de um caminho."),
          g("Complete a montagem agnóstica do caminho do arquivo combinando o diretório e o nome:", ["join"], "path.join une os segmentos de caminho.", "const destino = path.____(pastaBase, \"relatorio.pdf\");"),
          o("Ordene a construção segura de um caminho de destino multiplataforma:", ["Importar o módulo nativo com prefixo de segurança: import path from \"node:path\"","Identificar os segmentos de diretórios: pastaRaiz, \"dados\", \"logs\" e \"app.log\"","Montar o caminho com path.join(pastaRaiz, \"dados\", \"logs\", \"app.log\")","Passar o caminho resolvido para as operações de escrita do node:fs"], "Importação de path, identificação de partes, união com join e uso nas rotinas de fs."),
          p("Associe o recurso de node:path à sua característica:", [["path.join","Junta segmentos de caminho resolvendo \"..\" e normalizando separadores"],["path.sep","Caractere de separador nativo do sistema operacional atual (\"/\" ou \"\\\\\")"],["Multiplataforma","Capacidade do código de rodar identicamente em Windows, macOS e Linux"],["Barras redundantes","Eliminadas automaticamente por path.join evitando caminhos inválidos"]], "Usar node:path garante que seus scripts funcionem sem alterações em qualquer ambiente.")
        ]
      },
      {
        id: "javascript-c12-u5-l2-path-resolve-e-caminhos-absolutos",
        title: "Caminhos absolutos e ancoragem com path.resolve",
        subtitle: "Resolução determinística · Como transformar caminhos relativos em rotas absolutas",
        theory: "A função path.resolve(...segmentos) resolve uma sequência de caminhos até formar um caminho absoluto, processando da direita para a esquerda contra o diretório de trabalho atual (process.cwd()). É a ferramenta ideal para garantir que referências a arquivos apontem sempre para uma localização absoluta e inequívoca.",
        questions: [
          q("Qual é a diferença fundamental de comportamento entre path.join() e path.resolve()?", "join apenas concatena e normaliza; resolve sempre gera e devolve um caminho absoluto completo", ["resolve só roda no Linux","join aceita apenas duas strings"], "path.resolve prefixa o caminho de trabalho atual (process.cwd()) se o resultado não for absoluto."),
          q("O que acontece se um dos argumentos passados para path.resolve for um caminho absoluto raiz (ex: \"/etc\")?", "O resolve descarta os argumentos anteriores e reinicia a ancoragem a partir desse caminho absoluto", ["Ele concatena tudo mesmo assim","Lança um TypeError"], "Um caminho absoluto no meio da sequência redefine o ponto de partida do cálculo de resolve."),
          q("Como verificar se uma string de caminho qualquer já é um caminho absoluto no sistema operacional?", "path.isAbsolute(caminho)", ["caminho.startsWith(\"/\")","path.checkAbsolute(caminho)"], "isAbsolute valida caminhos considerando letras de unidade no Windows (ex: C:\\) ou raízes POSIX."),
          q("Qual comando gera o caminho absoluto do arquivo \"schema.sql\" dentro da pasta atual do terminal?", "path.resolve(\"schema.sql\")", ["path.join(\"schema.sql\")","path.absolute(\"schema.sql\")"], "Passar apenas um arquivo relativo para resolve o ancora automaticamente em process.cwd()."),
          t("Qual método de node:path valida se um caminho fornecido já é formalmente absoluto?", ["isAbsolute"], "path.isAbsolute retorna true se a rota for absoluta no SO."),
          g("Complete a conversão do caminho relativo para uma localização absoluta inequívoca:", ["resolve"], "path.resolve gera a rota absoluta.", "const caminhoAbsoluto = path.____(\"./dados/tabela.csv\");"),
          o("Ordene a resolução de caminho absoluto com path.resolve:", ["Receber caminho relativo informado pelo usuário no terminal: \"./config.json\"","Invocar path.resolve(process.cwd(), \"./config.json\")","O método calcula a árvore de diretórios a partir da raiz do disco","Obter caminho absoluto final garantindo que o arquivo seja localizado com precisão"], "Recebimento de relativo, invocação de resolve com cwd, cálculo da raiz e obtenção de caminho absoluto."),
          p("Associe a função de node:path ao seu resultado:", [["path.resolve","Transforma sequência de caminhos em rota absoluta inequívoca"],["path.isAbsolute","Verifica se o caminho inicia na raiz do sistema operacional"],["process.cwd()","Ponto de partida default adotado por resolve para caminhos relativos"],["Caminho absoluto","Rota completa que dispensa contexto prévio de diretório atual"]], "Garantir caminhos absolutos com path.resolve evita que scripts busquem arquivos no lugar errado.")
        ]
      },
      {
        id: "javascript-c12-u5-l3-decomposicao-com-basename-dirname-e-extname",
        title: "Decomposição de arquivos: basename, dirname e extname",
        subtitle: "Análise de caminhos · Extraindo nomes, pastas, extensões e o método path.parse",
        theory: "Para extrair partes de um caminho, node:path fornece utilitários especializados: path.dirname() extrai o diretório pai, path.basename() retorna o nome do arquivo (podendo remover a extensão), e path.extname() extrai o sufixo (ex: \".json\"). Para obter tudo de uma vez, path.parse() devolve um objeto estruturado.",
        questions: [
          q("Qual método de node:path extrai a extensão de um arquivo incluindo o ponto (ex: \".pdf\")?", "path.extname(\"documento.pdf\")", ["path.extension(\"documento.pdf\")","path.suffix(\"documento.pdf\")"], "extname extrai da última ocorrência do caractere \".\" até o fim da string."),
          q("Como extrair o nome de um arquivo sem sua extensão usando o método path.basename()?", "Passando a extensão como segundo argumento: path.basename(\"foto.png\", \".png\")", ["path.basename(\"foto.png\").removeExt()","path.stripExt(\"foto.png\")"], "O segundo parâmetro de basename atua como sufixo a ser descartado da string resultante."),
          q("Qual método do módulo node:path desconstrói um caminho completo em um objeto com root, dir, base, ext e name?", "path.parse(caminho)", ["path.decompose(caminho)","path.toObject(caminho)"], "path.parse divide a rota em todas as suas propriedades atômicas em uma única chamada."),
          q("Qual é a operação inversa de path.parse, que reconstrói a string do caminho a partir de um objeto de propriedades?", "path.format(objetoDeCaminho)", ["path.stringify(objeto)","path.build(objeto)"], "path.format combina root, dir, base, ext e name de volta em uma string de caminho válida."),
          t("Qual método de node:path extrai apenas o diretório pai onde o arquivo reside?", ["dirname"], "path.dirname retorna o caminho da pasta que contém o arquivo."),
          g("Complete a extração da extensão para validação de tipo de arquivo de upload:", ["extname"], "path.extname extrai a extensão com ponto.", "const extensao = path.____(arquivoEnviado);"),
          o("Ordene a desconstrução de um caminho \"/var/www/site/index.html\" com node:path:", ["Executar: const info = path.parse(\"/var/www/site/index.html\")","Inspecionar info.dir: \"/var/www/site\" (pasta onde reside o arquivo)","Inspecionar info.name: \"index\" e info.ext: \".html\"","Validar info.base: \"index.html\" (nome completo do arquivo com extensão)"], "Execução de parse, inspeção de dir, inspeção de name/ext e validação de base."),
          p("Associe o método de node:path ao elemento extraído:", [["path.basename","Retorna o nome final do arquivo ou pasta (ex: \"relatorio.txt\")"],["path.dirname","Retorna a rota do diretório onde o arquivo está contido"],["path.extname","Retorna o sufixo de extensão incluindo o ponto (ex: \".json\")"],["path.parse","Desmonta o caminho em um objeto rico com root, dir, base, ext e name"]], "Analisar caminhos com métodos dedicados previne bugs de manipulação manual de substrings.")
        ]
      },
      {
        id: "javascript-c12-u5-l4-ancoragem-em-esm-com-import-meta-url",
        title: "Ancoragem de arquivos em ESM: import.meta.url",
        subtitle: "Fim do __dirname · Como encontrar arquivos relativos ao módulo em ECMAScript puro",
        theory: "No sistema ESM, as variáveis mágicas __dirname e __filename do CommonJS não existem. Para ancorar caminhos com segurança em relação ao arquivo de módulo atual, instanciamos a classe URL combinada com import.meta.url: new URL(\"./dados.json\", import.meta.url). Para converter em string de caminho, usamos fileURLToPath.",
        questions: [
          q("Por que a variável __dirname lança ReferenceError ao ser utilizada em um módulo ESM nativo?", "Porque __dirname é exclusiva do sistema CommonJS e não faz parte da especificação oficial do ESM", ["Porque o arquivo está em pasta protegida","Porque falta instalar o pacote dirname"], "Em módulos ECMAScript (\"type\": \"module\"), __dirname e __filename não são definidas."),
          q("O que a propriedade especial import.meta.url contém em qualquer módulo ESM?", "Uma string com a URL absoluta do arquivo no protocolo file:// (ex: \"file:///app/src/index.js\")", ["O IP do servidor de desenvolvimento","A versão do Node.js"], "import.meta.url representa a localização exata do módulo atual no formato de URL padrão."),
          q("Como ler um arquivo local de forma segura e relativa ao módulo atual em ESM moderno?", "readFile(new URL(\"./config.json\", import.meta.url), \"utf8\")", ["readFile(__dirname + \"/config.json\")","readFile(\"./config.json\") confiando no cwd"], "Passar a instância de new URL diretamente para readFile ancora a leitura no módulo sem falhar por cwd."),
          q("Qual função utilitária do módulo nativo node:url converte uma URL file:// em uma string de caminho do SO?", "fileURLToPath(import.meta.url)", ["urlToPath()","path.fromURL()"], "fileURLToPath decodifica a URL para formato nativo com barras e letras de unidade do Windows."),
          t("Qual função do módulo node:url converte URLs no esquema file:// em strings de caminho do sistema operacional?", ["fileURLToPath"], "fileURLToPath traduz URLs web para caminhos de arquivo locais."),
          g("Complete a ancoragem robusta do arquivo de schema relativo ao módulo ESM atual:", ["URL"], "new URL(relativo, import.meta.url) ancora o caminho.", "const arquivo = new ____(\"./schema.sql\", import.meta.url);"),
          o("Ordene a leitura de arquivo de template relativo ao módulo ESM:", ["Construir a URL ancorada no módulo: const url = new URL(\"./template.html\", import.meta.url)","Passar a instância de URL diretamente para a função readFile de node:fs/promises","O Node resolve os bytes no local físico exato do arquivo sem depender de onde o terminal rodou","Consumir a string de template resultante garantindo portabilidade entre diretórios"], "Construção da URL com import.meta.url, chamada de readFile, resolução física e consumo."),
          p("Associe o conceito de localização em ESM ao seu comportamento:", [["import.meta.url","Metadado nativo contendo a URL file:// do arquivo do módulo em execução"],["new URL(relativo, base)","Resolve caminhos com perfeição relativa ao arquivo do código"],["fileURLToPath","Converte a URL de arquivo em string de caminho aceita pelo sistema operacional"],["Independência de cwd","Garante que o arquivo seja encontrado mesmo que o comando rode de outra pasta"]], "Ancorar caminhos com import.meta.url elimina de vez o pesadelo de arquivos não encontrados em ESM.")
        ]
      },
      {
        id: "javascript-c12-u5-l5-path-relative-e-normalizacao-multiplataforma",
        title: "Cálculo de caminhos relativos com path.relative e namespaces",
        subtitle: "Navegação entre pastas · path.relative, path.posix e path.win32 explícitos",
        theory: "A função path.relative(de, para) calcula o caminho relativo necessário para navegar de um diretório até outro. Além disso, quando precisamos forçar barras estilo web (\"/\") mesmo rodando no Windows (como em geradores de rotas e bundlers), usamos o namespace explícito path.posix em vez do objeto path default.",
        questions: [
          q("O que a chamada \"path.relative('/dados/logs', '/dados/config/app.json')\" retorna?", "O caminho relativo para navegar do primeiro até o segundo (\"../config/app.json\")", ["O caminho absoluto somado","Um booleano"], "path.relative calcula os passos necessários (incluindo subidas \"..\") para ir de A até B."),
          q("Por que ferramentas de build e empacotadores (bundlers) costumam usar \"path.posix\" explicitamente?", "Para garantir que os caminhos gerados em manifests usem sempre barras normais (\"/\"), mesmo no Windows", ["Para rodar em navegadores antigos","Porque é mais rápido que C++"], "path.posix força a semântica POSIX padrão da web independentemente do SO que hospeda o build."),
          q("Qual namespace de node:path força especificamente a semântica de caminhos do Windows (com barras \"\\\\\")?", "path.win32", ["path.windows","path.dos"], "path.win32 permite manipular ou testar rotas Windows mesmo quando o código roda em servidores Linux."),
          q("O que a função path.normalize() faz com uma string contendo barras repetidas ou misturadas (\"a//b\\\\c\")?", "Normaliza todas as barras e remove redundâncias de acordo com as regras do sistema operacional", ["Lança um erro de formatação","Converte tudo para maiúsculas"], "normalize limpa caminhos com sujeira de digitação ou concatenações malformadas."),
          t("Qual método de node:path calcula o caminho relativo necessário para ir de uma pasta até outra?", ["relative"], "path.relative calcula a rota relativa entre dois pontos."),
          g("Complete a invocação que garante separadores estilo web usando o namespace POSIX explícito:", ["posix"], "path.posix garante barras normais.", "const rotaWeb = path.____.join(\"assets\", \"icones\", \"logo.svg\");"),
          o("Ordene o cálculo de importação relativa entre dois módulos do projeto:", ["Identificar a pasta onde o módulo consumidor reside: \"/src/controllers\"","Identificar o arquivo do serviço utilitário desejado: \"/src/services/logger.js\"","Calcular a rota relativa com path.relative(\"/src/controllers\", \"/src/services/logger.js\")","Obter o caminho relativo resultante: \"../services/logger.js\" pronto para o import"], "Identificação da origem, identificação do destino, cálculo com path.relative e uso no import."),
          p("Associe o namespace ao seu comportamento:", [["path (default)","Adota automaticamente a convenção do sistema operacional hospedeiro"],["path.posix","Força separadores universais com barra normal (\"/\") para padrões web"],["path.win32","Força convenções do Windows com barra invertida e letras de unidade"],["path.normalize","Limpa e resolve barras duplicadas ou segmentos redundantes no caminho"]], "Dominar path.relative e os namespaces específicos fecha o ciclo de manipulação profissional de caminhos.")
        ]
      }
    ],
    6: [
      {
        id: "javascript-c12-u6-l1-process-env-e-configuracao-do-ambiente",
        title: "Variáveis de ambiente com process.env e o padrão 12-Factor",
        subtitle: "Configuração externa · Segredos, portas e URLs desacoplados do código fonte",
        theory: "O objeto global process.env disponibiliza as variáveis de ambiente injetadas no processo pelo sistema operacional ou contêiner. Seguindo a metodologia 12-Factor App, nenhuma informação de credenciais, chaves de API ou portas deve estar fixa no código-fonte: todas as configurações mutáveis vêm de process.env.",
        questions: [
          q("Qual é o tipo de dado de TODAS as propriedades lidas a partir de process.env?", "São sempre strings de texto (mesmo para números e booleanos como \"8080\" ou \"true\")", ["Números viram inteiros automaticamente","Podem ser objetos complexos"], "Variáveis de ambiente do sistema operacional são exclusivamente textuais; converter tipos é responsabilidade do código."),
          q("Qual princípio do manifesto Twelve-Factor App fundamenta o uso de variáveis de ambiente?", "Armazenar a configuração estritamente no ambiente, mantendo o mesmo código-fonte para todos os estágios", ["Gravar senhas em arquivos de texto público","Criar executáveis separados por cliente"], "Desacoplar configuração de código permite promover a mesma imagem entre homologação e produção."),
          q("Como definir um valor padrão de fallback seguro para a porta da aplicação caso a variável esteja ausente?", "const porta = process.env.PORT || 3000;", ["const porta = process.env.PORT.default(3000);","const porta = process.env(3000);"], "O operador de coalescência ou ou lógico define portas padrão para facilidade no desenvolvimento local."),
          q("Por que números em variáveis de ambiente (ex: PORT=8080) exigem Number() ao serem usados em comparações?", "Porque process.env.PORT retorna a string \"8080\", que pode causar bugs em operações matemáticas", ["Porque o Node não aceita números","Para criptografar o valor"], "Converter explicitamente para número (Number(process.env.PORT)) garante tipagem limpa."),
          t("Qual objeto global do Node.js expõe o mapa de variáveis de ambiente do sistema?", ["process.env"], "process.env contém todas as variáveis de ambiente ativas."),
          g("Complete a extração da URL do banco de dados a partir das variáveis de ambiente:", ["env"], "process.env expõe as chaves injetadas.", "const dbUrl = process.____.DATABASE_URL;"),
          o("Ordene a carga e leitura de configurações via process.env:", ["O sistema operacional ou contêiner injeta variáveis como PORT e DB_HOST","A aplicação é inicializada e o Node.js popula o objeto global process.env","O módulo de configuração lê process.env com conversão de tipos e fallbacks seguros","Os serviços internos consomem os parâmetros sem nunca expor credenciais fixas no código"], "Injeção de variáveis, carga em process.env, leitura com validação e consumo pelos serviços."),
          p("Associe a variável de ambiente à sua função típica:", [["process.env.PORT","Define em qual porta TCP o servidor HTTP escutará conexões"],["process.env.DATABASE_URL","Cadeia de conexão com host, porta e credenciais do banco de dados"],["Tipo String obrigatório","Todas as variáveis em process.env são lidas em formato de texto"],["12-Factor App","Metodologia que dita a estrita separação entre código e configurações"]], "process.env é a base de sustentação para aplicações em nuvem, contêineres e microserviços.")
        ]
      },
      {
        id: "javascript-c12-u6-l2-o-suporte-nativo-a-arquivos-env-com-env-file",
        title: "Suporte nativo a arquivos .env: a flag --env-file",
        subtitle: "Fim do pacote dotenv · Carregando variáveis de ambiente nativamente no Node.js 20+",
        theory: "Historicamente o ecossistema dependia do pacote dotenv para ler arquivos .env. O Node.js moderno introduziu a flag nativa node --env-file=.env, que lê o arquivo de texto com pares CHAVE=valor e os injeta em process.env na inicialização da máquina virtual antes de executar a primeira linha de código.",
        questions: [
          q("Qual flag nativa do Node.js permite carregar arquivos .env sem precisar instalar o pacote \"dotenv\"?", "node --env-file=.env app.js", ["node --dotenv app.js","node --load-env app.js"], "--env-file é o recurso nativo oficial do Node.js moderno para leitura de arquivos de ambiente."),
          q("O que acontece se passarmos múltiplos arquivos de ambiente na inicialização (ex: --env-file=.env --env-file=.env.local)?", "O Node carrega ambos os arquivos em sequência, com os valores do último arquivo sobrescrevendo os anteriores", ["Ocorre um erro de conflito","Apenas o primeiro arquivo é lido"], "Permite compor configurações gerais com arquivos de sobreposição local com facilidade."),
          q("Em que momento o Node.js carrega as variáveis passadas pela flag --env-file?", "Antes de executar o primeiro módulo do código da aplicação, garantindo disponibilidade imediata", ["Apenas após o término do script","Durante a primeira consulta fetch"], "As variáveis estão disponíveis logo no primeiro import do projeto."),
          q("Como o arquivo .env lido pela flag nativa trata linhas iniciadas com o caractere cerquilha (\"#\")?", "Como comentários informativos, ignorando-os completamente durante o carregamento", ["Lança um SyntaxError","Gera variáveis anônimas"], "Linhas com # servem para documentar o significado de cada chave de configuração."),
          t("Qual flag do executável node carrega nativamente as variáveis de um arquivo .env para process.env?", ["--env-file"], "--env-file elimina a dependência do pacote dotenv."),
          g("Complete o script do package.json carregando o arquivo de variáveis de desenvolvimento:", ["--env-file"], "--env-file injeta as variáveis no processo.", "\"dev\": \"node ____=.env.dev server.js\""),
          o("Ordene a inicialização de um projeto com suporte nativo a arquivos .env:", ["Criar o arquivo .env contendo segredos locais no formato CHAVE=VALOR","Configurar o comando no package.json com a flag node --env-file=.env server.js","Disparar a execução no terminal via npm run dev","Acessar process.env.MINHA_CHAVE no código com os valores carregados nativamente"], "Criação do .env, inclusão da flag, disparo no terminal e consumo transparente em process.env."),
          p("Associe o recurso de configuração ao seu benefício:", [["node --env-file","Injeção nativa de variáveis de ambiente sem instalar bibliotecas externas"],["Pacote dotenv (legado)","Abordagem clássica que exigia código manual config() nos arquivos"],["Linhas com \"#\"","Comentários descartados automaticamente pelo parser de ambiente"],["Sobrescrita em cascata","Múltiplas flags --env-file permitem sobreposição hierárquica de valores"]], "A flag nativa --env-file moderniza a gestão de ambientes eliminando dependências redundantes.")
        ]
      },
      {
        id: "javascript-c12-u6-l3-validacao-obrigatoria-de-variaveis-de-ambiente",
        title: "Validação defensiva de variáveis na inicialização (Fail Fast)",
        subtitle: "Prevenção de desastres · Interrompendo a aplicação imediatamente se faltar configuração",
        theory: "Descobrir que uma variável vital (como JWT_SECRET ou DB_PASS) está ausente apenas quando um usuário tenta fazer login horas depois é uma falha grave. A prática recomendada é aplicar o princípio Fail Fast: validar todas as variáveis obrigatórias na inicialização da aplicação, abortando o processo com erro explicativo.",
        questions: [
          q("O que prega o princípio arquitetural \"Fail Fast\" (Falhe Rápido) na validação de ambiente?", "Interromper imediatamente a inicialização do app caso alguma configuração mandatória esteja faltando", ["Esperar o erro acontecer em produção","Ignorar variáveis ausentes e usar null"], "Falhar na largada impede que a aplicação suba em estado inconsistente ou vulnerável."),
          q("O que acontece se uma aplicação rodar com a variável JWT_SECRET vazia ou undefined?", "Assinaturas de tokens podem ser forjadas por atacantes usando string vazia, comprometendo toda a segurança", ["O Node gera uma chave de 512 bits sozinho","A aplicação rejeita logins automaticamente"], "Variáveis de criptografia ausentes criam brechas críticas e invisíveis de segurança."),
          q("Como estruturar um módulo de validação de ambiente (ex: env.js) em JavaScript puro?", "Verificando em um laço se as chaves existem e lançando um erro explicativo detalhando quais faltam", ["Usando console.warn sem parar o app","Criando um arquivo no disco"], "Lançar exceção interrompe o startup e imprime no log exatamente qual variável não foi configurada."),
          q("Além da presença da chave, o que mais a validação de ambiente deve checar?", "A conformidade dos tipos e valores (ex: se PORT é número válido e se DB_URL tem formato de URL)", ["A cor do monitor do desenvolvedor","A velocidade do processador"], "Validar se números estão em faixas aceitáveis previne erros inesperados durante a operação."),
          t("Qual princípio de engenharia dita que a aplicação deve abortar na inicialização se houver erro de configuração?", ["Fail Fast"], "Fail Fast previne que serviços subam em estado quebrado."),
          g("Complete a asserção defensiva que aborta a inicialização caso a chave secreta esteja ausente:", ["throw"], "throw interrompe o processo na inicialização.", "if (!process.env.CHAVE_SECRETA) {\n  ____ new Error(\"Configuração ausente: CHAVE_SECRETA\");\n}"),
          o("Ordene a rotina de validação de ambiente no módulo de entrada:", ["Definir a lista de chaves mandatórias para a execução do sistema","Filtrar quais variáveis estão ausentes ou vazias no objeto process.env","Se houver chaves ausentes, emitir log formatado e abortar com process.exit(1)","Se todas estiverem em conformidade, liberar a subida dos servidores e conexões"], "Definição de chaves, verificação de ausências, aborto em caso de falha e inicialização segura."),
          p("Associe a prática de validação ao seu benefício:", [["Princípio Fail Fast","Aborto imediato na inicialização impedindo operações com estado corrompido"],["Conversão explícita","Garante que portas sejam números e booleanos sejam tratados corretamente"],["Mensagens de erro claras","Indica com exatidão no terminal quais chaves do .env precisam de ajuste"],["Segurança de chaves","Impede que o sistema use segredos vazios ou padrões inseguros em produção"]], "Validar variáveis na largada transforma incidentes de produção em simples checagens na inicialização.")
        ]
      },
      {
        id: "javascript-c12-u6-l4-node-env-e-diferenciacao-de-ambientes",
        title: "A convenção NODE_ENV: development, test e production",
        subtitle: "Comportamento adaptativo · Como bibliotecas e frameworks ajustam desempenho e logs",
        theory: "A variável NODE_ENV é a convenção universal para definir o estágio da aplicação: \"development\" (ativa logs detalhados e mensagens de erro completas), \"test\" (silencia logs e usa mocks) e \"production\" (desativa mensagens de depuração internas e ativa caches agressivos de alta performance em frameworks).",
        questions: [
          q("Qual é o valor convencional de NODE_ENV utilizado para ligar otimizações de performance em produção?", "\"production\"", ["\"prod\"","\"live\""], "Quase todos os pacotes do ecossistema (Express, React, etc.) verificam estritamente \"production\"."),
          q("Por que rodar uma aplicação Node.js com NODE_ENV=\"development\" em produção é prejudicial?", "Porque bibliotecas acumulam logs pesados, realizam checagens lentas e desativam caches de visualização", ["Porque o código é compilado de novo","Porque o banco de dados é apagado"], "Ajustar NODE_ENV=\"production\" costuma triplicar a vazão de requisições em frameworks web."),
          q("Como testar no código se a aplicação está rodando em ambiente de desenvolvimento?", "process.env.NODE_ENV === \"development\"", ["process.isDev()","system.env.dev"], "Checar a string de NODE_ENV permite condicionar recursos como Swagger e mocks locais."),
          q("O que a maioria das bibliotecas de log (como Pino ou Winston) faz quando NODE_ENV=\"production\"?", "Gera logs em formato JSON estruturado de uma única linha otimizado para agregadores como Datadog", ["Desliga totalmente os logs","Gera arquivos HTML coloridos"], "Logs estruturados em JSON são o padrão de observabilidade para ambientes de nuvem."),
          t("Qual variável de ambiente é a convenção padrão para alternar entre desenvolvimento e produção?", ["NODE_ENV"], "NODE_ENV é a convenção mais difundida em todo o ecossistema Node.js."),
          g("Complete a checagem que habilita rotas de documentação apenas fora de produção:", ["NODE_ENV"], "NODE_ENV controla o modo operacional.", "if (process.env.____ !== \"production\") {\n  ativarDocumentacaoSwagger(app);\n}"),
          o("Ordene a adaptação de comportamento do servidor conforme o ambiente:", ["Ler a variável de ambiente: const ambiente = process.env.NODE_ENV || \"development\"","Se for \"development\", habilitar formatação colorida e rastreio completo de pilha no console","Se for \"production\", ativar caches em memória, compressão gzip e mascarar mensagens de erro","Registrar log inicial informando o modo de execução com que o servidor foi ativado"], "Leitura de NODE_ENV, configuração de modo dev, configuração de modo prod e log de inicialização."),
          p("Associe o valor de NODE_ENV ao seu perfil de execução:", [["\"development\"","Prioriza experiência do desenvolvedor com erros verbosos e sem cache"],["\"production\"","Prioriza velocidade máxima, segurança, caches ativos e logs estruturados"],["\"test\"","Otimizado para execução rápida de asserções com isolamento de efeitos colaterais"],["JSON estruturado","Formato de saída de log obrigatório em produção para ingestão em nuvem"]], "Configurar NODE_ENV corretamente é a chave para extrair a máxima velocidade da plataforma Node.")
        ]
      },
      {
        id: "javascript-c12-u6-l5-seguranca-e-arquivos-env-no-git",
        title: "Higiene e segurança: arquivos .env e o arquivo .env.example",
        subtitle: "Vazamento zero · Por que .env nunca vai para o Git e o papel do .env.example",
        theory: "Arquivos .env contêm segredos reais (senhas de banco e chaves de API) e NUNCA devem ser versionados no Git: eles devem constar no .gitignore. Para documentar quais variáveis o projeto requer, versionamos um arquivo .env.example contendo apenas os nomes das chaves com valores fictícios ou explicativos.",
        questions: [
          q("Por que o arquivo .env contendo credenciais reais NUNCA deve ser incluído em um commit do Git?", "Porque qualquer pessoa com acesso ao repositório ou histórico terá acesso permanente às senhas e segredos", ["Porque o Git rejeita arquivos que começam com ponto","Porque o arquivo .env pesa gigabytes"], "Commits são imutáveis no histórico; mesmo apagando depois, as chaves permanecem expostas."),
          q("Qual é o propósito do arquivo \".env.example\" versionado no repositório?", "Servir de modelo documentado listando todas as variáveis necessárias com valores fictícios de exemplo", ["Guardar as senhas de produção","Gerar relatórios de bugs"], ".env.example orienta novos desenvolvedores sobre quais chaves eles precisam configurar localmente."),
          q("O que deve constar no arquivo .gitignore logo no início da criação de um novo projeto?", "Linhas como \".env\", \".env.local\" e \"*.env\" para impedir o rastreamento acidental de segredos", ["A pasta src inteira","O arquivo package.json"], "Proteger o repositório contra upload acidental de arquivos de ambiente é o primeiro mandamento de segurança."),
          q("O que fazer imediatamente se uma chave de API de produção for comitada por engano no GitHub?", "Revogar a chave imediatamente no painel do provedor, gerar uma nova credencial e rotacioná-la", ["Apenas apagar o commit no Git","Mudar o nome do repositório para privado"], "Robôs escaneiam o GitHub em milissegundos; credenciais vazadas devem ser revogadas na hora."),
          t("Qual arquivo de modelo deve ser versionado no Git com as chaves necessárias sem dados sensíveis?", [".env.example"], ".env.example documenta as variáveis do projeto de forma segura."),
          g("Complete o arquivo .gitignore adicionando a regra que bloqueia arquivos de ambiente sensíveis:", [".env"], ".env nunca deve ser versionado no Git.", "# Arquivos de ambiente e segredos\n____\n.env.local\n.env.*.local"),
          o("Ordene a configuração de ambiente de um novo desenvolvedor clonando o repositório:", ["Clonar o projeto do Git (o repositório contém .env.example mas não contém .env)","Duplicar o modelo seguro executando: cp .env.example .env","Abrir o arquivo .env local e preencher as chaves com credenciais de desenvolvimento","Iniciar o projeto garantindo que suas chaves privadas permaneçam apenas na sua máquina"], "Clone do repositório, cópia do modelo, preenchimento de dados locais e inicialização segura."),
          p("Associe o arquivo à sua política de versionamento no Git:", [[".env","Totalmente proibido no Git; deve constar compulsoriamente no .gitignore"],[".env.example","Obrigatoriamente versionado no Git como documentação pública de chaves"],[".gitignore","Arquivo de configuração que instrui o Git a ignorar pastas e arquivos sensíveis"],["Rotação de credenciais","Procedimento mandatório de segurança caso algum segredo seja exposto"]], "Uma gestão rigorosa de segredos impede vazamentos catastróficos de infraestrutura e dados de clientes.")
        ]
      }
    ],
    7: [
      {
        id: "javascript-c12-u7-l1-construcao-de-scripts-executaveis-e-shebang",
        title: "Scripts executáveis no terminal e a linha Shebang",
        subtitle: "Comandos do sistema · Transformando código JavaScript em programas CLI diretos",
        theory: "Para que um script JavaScript seja executado diretamente no terminal (como um binário do sistema, sem precisar digitar \"node script.js\"), a primeira linha do arquivo deve conter a diretiva Shebang: #!/usr/bin/env node. Em sistemas POSIX (Linux/macOS), o arquivo também deve receber permissão de execução com chmod +x.",
        questions: [
          q("O que é a linha \"Shebang\" (#!/usr/bin/env node) colocada no topo de um script?", "Uma instrução para o sistema operacional informando qual interpretador deve ser usado para rodar o arquivo", ["Um comentário informativo de versão","Uma diretiva do compilador C++"], "O sistema lê a primeira linha #! e invoca o executável node passando o script como alvo."),
          q("Em sistemas operacionais Unix/Linux/macOS, qual comando concede permissão de execução a um arquivo?", "chmod +x meu-script.js", ["chmod 000 meu-script.js","make executable meu-script.js"], "A flag +x (executable) autoriza o kernel a disparar o arquivo diretamente como um processo."),
          q("Qual é a vantagem de usar \"#!/usr/bin/env node\" em vez de um caminho fixo como \"#!/usr/bin/node\"?", "Usa o utilitário \"env\" para localizar o Node no PATH do usuário, funcionando em qualquer distribuição", ["Porque env roda mais rápido","Porque o caminho fixo é proibido"], "Ambientes usam pastas diferentes (ex: /usr/local/bin ou NVM); env encontra o Node onde quer que ele esteja."),
          q("A linha Shebang causa algum erro de sintaxe quando o arquivo é executado via \"node script.js\"?", "Não; o próprio motor V8 do Node.js reconhece e ignora a linha Shebang nativamente", ["Sim, precisa comentar com //","Apenas em arquivos JSON"], "O Node trata a linha Shebang como um caso especial válido no topo de arquivos JavaScript."),
          t("Qual símbolo de dois caracteres inicia a diretiva Shebang no topo de scripts executáveis?", ["#!"], "O prefixo #! identifica o interpretador para o sistema operacional."),
          g("Complete a linha Shebang correta que torna o arquivo executável com o Node do ambiente:", ["#!/usr/bin/env node"], "A linha shebang indica o interpretador node.", "____\n\nconsole.log(\"CLI iniciada com sucesso!\");"),
          o("Ordene a criação de um script de linha de comando executável:", ["Criar o arquivo cli.js e inserir na primeira linha: #!/usr/bin/env node","Escrever a lógica do programa utilizando APIs do Node.js e console","Conceder permissões de execução no terminal via comando: chmod +x cli.js","Executar a ferramenta diretamente digitando: ./cli.js no terminal"], "Inserção do Shebang, escrita da lógica, concessão de permissão com chmod +x e execução direta."),
          p("Associe o elemento de criação de CLI ao seu papel:", [["#!/usr/bin/env node","Diretiva Shebang que aponta o Node.js como executor do script"],["chmod +x","Comando que adiciona o bit de execução ao arquivo no sistema operacional"],["Execução direta (./cli.js)","Permite disparar a ferramenta sem prefixar a palavra node no terminal"],["Resolução via PATH","Busca dinâmica do interpretador ativo no ambiente do usuário"]], "Criar binários com Shebang é o primeiro passo para desenvolver ferramentas de automação para equipes.")
        ]
      },
      {
        id: "javascript-c12-u7-l2-campo-bin-no-package-json",
        title: "Publicação de ferramentas: o campo bin do package.json",
        subtitle: "Distribuição de CLIs · Mapeando comandos executáveis para distribuição via npm",
        theory: "Para que um pacote publicado ou instalado localmente forneça comandos para o terminal, usamos o campo \"bin\" no package.json. O campo mapeia o nome do comando para o arquivo executável: \"bin\": { \"meu-gerador\": \"./bin/cli.js\" }. Ao instalar, o npm cria automaticamente os links simbólicos na pasta .bin.",
        questions: [
          q("Qual propriedade do package.json registra comandos executáveis para serem disponibilizados no terminal?", "\"bin\"", ["\"cli\"","\"executables\""], "A propriedade bin define os atalhos de comando expostos pelo pacote."),
          q("Como configurar o campo \"bin\" para disponibilizar um comando com o mesmo nome do pacote?", "Atribuindo uma string com o caminho do arquivo (ex: \"bin\": \"./bin/cli.js\")", ["\"bin\": true","\"bin\": \"all\""], "Se o bin for uma string direta, o nome do executável será exatamente o nome do pacote."),
          q("O que o npm faz com os arquivos declarados no campo \"bin\" ao executar npm install?", "Cria links simbólicos (symlinks) executáveis na pasta node_modules/.bin do projeto", ["Move os arquivos para a lixeira","Converte o código para binário C++"], "Os links em .bin permitem chamar o utilitário via npx ou scripts do package.json imediatamente."),
          q("O que é mandatório que o arquivo apontado pelo campo \"bin\" contenha na sua primeiríssima linha?", "A linha Shebang (#!/usr/bin/env node) para que o sistema operacional saiba como executá-lo", ["Uma declaração de classe","A licença MIT"], "Sem a Shebang, a execução direta no terminal falhará por falta de interpretador reconhecido."),
          t("Qual campo do package.json mapeia os nomes de comandos executáveis para seus arquivos correspondentes?", ["bin"], "O campo bin registra executáveis CLI no npm."),
          g("Complete o mapeamento de comando CLI no manifesto package.json:", ["\"bin\""], "bin expõe o comando para o terminal.", "{\n  \"name\": \"gerador-docs\",\n  ____: {\n    \"gerar\": \"./src/cli.js\"\n  }\n}"),
          o("Ordene a disponibilização de uma ferramenta CLI em um projeto Node:", ["Criar o script executável com Shebang no topo: ./bin/index.js","Mapear o comando no package.json: \"bin\": { \"minha-ferramenta\": \"./bin/index.js\" }","Instalar ou vincular localmente para testes com o comando npm link","Testar a invocação direta digitando: npx minha-ferramenta no terminal"], "Criação do script, mapeamento no campo bin, vínculo com npm link e teste via terminal."),
          p("Associe a configuração do campo bin ao seu efeito:", [["\"bin\": { \"cli\": \"./run.js\" }","Registra o comando \"cli\" apontando para o script executável run.js"],["npm link","Cria link simbólico global permitindo testar a CLI localmente antes de publicar"],["node_modules/.bin","Pasta que centraliza os links executáveis de todas as dependências"],["npx <comando>","Localiza e executa o binário registrado no campo bin do projeto"]], "O campo bin viabiliza a criação de todo o ecossistema de ferramentas de linha de comando no npm.")
        ]
      },
      {
        id: "javascript-c12-u7-l3-parse-de-argumentos-com-node-util-parseargs",
        title: "Interpretação de argumentos e flags com util.parseArgs",
        subtitle: "CLIs sem dependências · Analisando opções tipadas, booleanos e posicionais",
        theory: "Interpretar flags de linha de comando manualmente com process.argv é frágil. O Node.js introduziu a API nativa util.parseArgs (do módulo node:util): ela valida opções estritamente com schemas declarativos, suportando tipos (\"string\", \"boolean\"), atalhos curtos (ex: -f para --force) e argumentos posicionais.",
        questions: [
          q("Qual utilitário nativo do Node.js permite analisar argumentos da linha de comando com esquema declarativo?", "parseArgs() do módulo node:util", ["process.getArgs()","path.parseOptions()"], "util.parseArgs fornece análise completa de flags e opções sem bibliotecas externas."),
          q("Como declarar que a flag \"--porta\" deve ser interpretada como uma string no schema de parseArgs?", "options: { porta: { type: \"string\" } }", ["options: { porta: \"text\" }","flags: [\"--porta:str\"]"], "O schema define o tipo esperado, rejeitando opções com valores incompatíveis."),
          q("O que a opção \"allowPositionals: true\" habilita na chamada parseArgs({ options, allowPositionals })?", "Permite capturar argumentos que não começam com traço (como nomes de arquivos ou comandos) no array positionals", ["Permite flags sem nome","Desliga a validação de erros"], "Argumentos posicionais (ex: \"copiar arquivoA arquivoB\") ficam reunidos em values.positionals."),
          q("Como definir um atalho de uma única letra para uma flag longa (ex: -v para --verbose) em parseArgs?", "Configurando a propriedade short no schema: { verbose: { type: \"boolean\", short: \"v\" } }", ["{ verbose: \"alias:v\" }","{ shortFlags: [\"-v\"] }"], "A propriedade short associa a letra única à opção descritiva longa."),
          t("Qual módulo nativo do Node.js expõe a função declarativa parseArgs para construção de CLIs?", ["node:util"], "node:util contém o utilitário moderno parseArgs."),
          g("Complete o parse nativo de argumentos importando a função de node:util:", ["parseArgs"], "util.parseArgs processa argumentos CLI.", "import { ____ } from \"node:util\";\nconst { values } = parseArgs({ options });"),
          o("Ordene a estruturação de uma CLI robusta com util.parseArgs:", ["Importar { parseArgs } do módulo nativo \"node:util\"","Definir o schema de opções com tipos: { verbose: { type: \"boolean\" }, output: { type: \"string\" } }","Invocar const { values, positionals } = parseArgs({ options, allowPositionals: true })","Executar a lógica de negócio consumindo os parâmetros validados e tipados"], "Importação, definição de schema, invocação de parseArgs e consumo seguro de valores."),
          p("Associe a propriedade do schema de parseArgs ao seu papel:", [["type: \"boolean\"","Opção que atua como flag de alternância (ativa ou desativa com true/false)"],["type: \"string\"","Opção que exige e consome um valor textual após a flag"],["short: \"f\"","Permite invocar a flag com a letra única abreviada -f"],["allowPositionals","Habilita a recepção de argumentos livres que não possuem hífens"]], "parseArgs eleva o desenvolvimento de ferramentas CLI em Node.js a um novo patamar de simplicidade.")
        ]
      },
      {
        id: "javascript-c12-u7-l4-saida-formatada-e-cores-no-terminal",
        title: "Saída formatada e cores no terminal com util.styleText",
        subtitle: "Comunicação visual · stdout vs stderr e estilização sem pacotes pesados",
        theory: "Uma boa CLI formata sua saída com clareza: envia dados úteis para process.stdout e mensagens de erro para process.stderr. No Node.js moderno, estilizamos textos com a função nativa util.styleText(cor, texto) sem instalar pacotes pesados como Chalk, aplicando verde, vermelho, negrito e sublinhado no terminal.",
        questions: [
          q("Qual é a distinção crucial entre process.stdout e process.stderr na saída de programas CLI?", "stdout transmite dados normais para o operador; stderr é reservado para erros, alertas e diagnósticos", ["stderr é mais rápido","stdout só imprime números"], "Separar stdout e stderr permite que pipes do terminal (ex: cli | grep) processem dados sem poluição de erros."),
          q("Qual utilitário nativo introduzido nas versões modernas do Node.js aplica cores no terminal sem dependências?", "util.styleText(\"green\", \"Sucesso!\") do módulo node:util", ["console.color()","process.paint()"], "styleText aplica códigos de escape ANSI seguros verificando se o terminal suporta cores."),
          q("Como imprimir uma mensagem formatada em vermelho vivo para indicar erro crítico no terminal?", "console.error(util.styleText(\"red\", \"Erro fatal!\"));", ["console.log(\"<red>Erro fatal!</red>\")","process.color(\"red\")"], "styleText com \"red\" combinado com console.error garante destaque visual e roteamento para stderr."),
          q("O que a propriedade process.stdout.isTTY informa ao programa de linha de comando?", "Se o programa está conectado a um terminal interativo real ou se a saída foi redirecionada para um arquivo/pipe", ["Se o monitor suporta 4K","Se a internet está ativa"], "Consultar isTTY evita emitir códigos de cores e barras de progresso ao gravar saídas em arquivos texto."),
          t("Qual função nativa de node:util estiliza textos do terminal com cores e efeitos ANSI modernos?", ["styleText"], "util.styleText estiliza mensagens no console nativamente."),
          g("Complete a estilização da mensagem de sucesso aplicando a cor verde nativa:", ["styleText"], "styleText aplica formatação ANSI ao texto.", "console.log(util.____(\"green\", \"Operação concluída com êxito!\"));"),
          o("Ordene a emissão de mensagens padronizadas em uma ferramenta CLI:", ["Avaliar se o canal é interativo consultando process.stdout.isTTY","Se for interativo, formatar texto de sucesso com util.styleText(\"green\", \"OK\")","Emitir o resultado para o canal padrão com console.log (process.stdout)","Em caso de falha, emitir em vermelho para process.stderr via console.error"], "Checagem de isTTY, estilização com styleText, emissão em stdout e roteamento de erro para stderr."),
          p("Associe o canal ou função ao seu comportamento na CLI:", [["process.stdout","Canal padrão de saída de dados legíveis para o usuário e pipes"],["process.stderr","Canal exclusivo para emissão de diagnósticos, avisos e mensagens de erro"],["util.styleText()","Aplica cores, negrito e estilos visuais nativos via escape ANSI"],["process.stdout.isTTY","Booleano que atesta se a saída é um terminal humano interativo"]], "Projetar saídas elegantes e respeitar stdout/stderr torna suas CLIs profissionais e amigáveis.")
        ]
      },
      {
        id: "javascript-c12-u7-l5-interatividade-e-perguntas-com-node-readline",
        title: "Interatividade no terminal com node:readline/promises",
        subtitle: "Prompts interativos · Coletando respostas e confirmações do usuário via teclado",
        theory: "Para criar instaladores ou CLIs interativas que façam perguntas ao usuário, usamos o módulo nativo node:readline/promises. Com readline.createInterface({ input: process.stdin, output: process.stdout }), o método rl.question(\"Pergunta? \") pausa a execução e retorna uma Promise com a resposta digitada.",
        questions: [
          q("Qual módulo nativo do Node.js permite ler entradas digitadas pelo usuário no terminal via Promises?", "node:readline/promises", ["node:input/async","node:prompt"], "node:readline/promises oferece uma interface moderna baseada em async/await para perguntas na CLI."),
          q("Como criar uma interface de leitura interativa conectada ao teclado do terminal?", "createInterface({ input: process.stdin, output: process.stdout })", ["createReader()","new TerminalInput()"], "process.stdin atua como fluxo de entrada e process.stdout como fluxo de saída das perguntas."),
          q("O que a chamada \"const resposta = await rl.question('Qual seu nome? ')\" faz no terminal?", "Exibe a pergunta, aguarda o usuário digitar o texto e pressionar Enter, resolvendo a string digitada", ["Gera uma janela pop-up na tela","Fecha o processo do Node"], "question suspende a função assíncrona até que uma linha completa de texto seja submetida."),
          q("Por que é mandatório invocar \"rl.close()\" após terminar todas as perguntas ao usuário?", "Para liberar o stream process.stdin; sem fechar a interface, o processo Node permanecerá aberto indefinidamente", ["Para salvar as respostas no disco","Para limpar o histórico do shell"], "process.stdin mantém o event loop ativo enquanto estiver ouvindo eventos de teclado."),
          t("Qual método da interface readline/promises faz uma pergunta no terminal e aguarda a resposta digitada?", ["question"], "rl.question aguarda a submissão de texto pelo teclado."),
          g("Complete a finalização mandatória da interface de leitura para liberar o processo:", ["close"], "rl.close() encerra a escuta do teclado.", "const resposta = await rl.question(\"Confirmar? \");\nrl.____();"),
          o("Ordene o fluxo de um assistente interativo com readline/promises:", ["Importar readline de \"node:readline/promises\"","Instanciar a interface com input: process.stdin e output: process.stdout","Fazer a pergunta com await rl.question(\"Deseja prosseguir? (s/n) \")","Processar a resposta do usuário e invocar compulsoriamente rl.close()"], "Importação de módulo, instanciação de interface, pergunta assíncrona e fechamento com rl.close()."),
          p("Associe o componente de readline ao seu papel:", [["node:readline/promises","API assíncrona baseada em Promises para leitura de streams de texto"],["process.stdin","Stream legível que captura os dados digitados no teclado do terminal"],["rl.question(texto)","Exibe o prompt e aguarda o retorno da string submetida com Enter"],["rl.close()","Libera os ouvintes de stdin permitindo que o processo Node finalize normalmente"]], "Adicionar interatividade com readline/promises transforma scripts rústicos em assistentes elegantes.")
        ]
      }
    ],
    8: [
      {
        id: "javascript-c12-u8-l1-depuracao-com-a-flag-inspect-e-devtools",
        title: "Depuração moderna com a flag --inspect e Chrome DevTools",
        subtitle: "Inspeção remota · Como conectar o depurador gráfico a processos Node.js",
        theory: "Esquecer console.log e inspecionar código com depurador visual é um divisor de águas: a flag node --inspect abre um servidor WebSocket de depuração (geralmente na porta 9229). Abrindo chrome://inspect no navegador ou conectando o VS Code, podemos pausar a execução, inspecionar a memória e avaliar expressões ao vivo.",
        questions: [
          q("Qual flag do executável node ativa o servidor de depuração baseado no protocolo Chrome DevTools?", "node --inspect app.js", ["node --debug app.js","node --trace app.js"], "--inspect inicia o listener do depurador sem afetar o comportamento da aplicação."),
          q("Qual é a diferença entre a flag \"node --inspect\" e a flag \"node --inspect-brk\"?", "--inspect-brk pausa a execução imediatamente na PRIMEIRA linha de código antes de rodar qualquer coisa", ["--inspect-brk é mais lenta","--inspect-brk fecha o terminal"], "--inspect-brk é ideal para depurar códigos de inicialização que rodam rápido demais."),
          q("Qual porta de rede TCP padrão é utilizada pelo servidor de depuração do Node.js?", "Porta 9229", ["Porta 8080","Porta 3000"], "9229 é a porta padrão para comunicação via protocolo WebSocket do Chrome DevTools."),
          q("Como abrir a interface visual do depurador no navegador Google Chrome para inspecionar o Node.js?", "Navegando até o endereço chrome://inspect e clicando em \"Open dedicated DevTools for Node\"", ["Instalando uma extensão de terceiros","Abrindo o menu de favoritos"], "O Chrome possui suporte dedicado e nativo para conectar-se ao protocolo de depuração do Node."),
          t("Qual flag do Node.js pausa compulsoriamente a execução na primeiríssima linha do script para conexão do depurador?", ["--inspect-brk"], "--inspect-brk interrompe o script na primeira instrução."),
          g("Complete o comando que inicia a aplicação permitindo conectar o depurador na porta padrão:", ["--inspect"], "--inspect ativa o servidor de depuração.", "node ____ server.js"),
          o("Ordene a sessão de depuração visual com a flag inspect:", ["Iniciar a aplicação no terminal com a flag: node --inspect-brk app.js","Abrir a página chrome://inspect no navegador web","Clicar no botão \"Inspect\" ao lado do processo detectado na lista de alvos","Navegar pelo código-fonte, adicionar breakpoints visuais e avançar passo a passo"], "Início com inspect-brk, abertura de chrome://inspect, conexão ao processo e depuração passo a passo."),
          p("Associe a flag de depuração ao seu comportamento:", [["node --inspect","Habilita o depurador WebSocket na porta 9229 enquanto a aplicação executa"],["node --inspect-brk","Pausa compulsoriamente na linha 1 aguardando a conexão do depurador"],["Porta 9229","Porta TCP canônica para troca de comandos entre o Node e ferramentas DevTools"],["chrome://inspect","Painel nativo do navegador para descobrir e abrir instâncias de depuração Node"]], "Depurar visualmente com --inspect poupa horas de tentativas e erros com console.log manuais.")
        ]
      },
      {
        id: "javascript-c12-u8-l2-a-palavra-chave-debugger-e-breakpoints",
        title: "Breakpoints e a instrução debugger no código",
        subtitle: "Pausa programática · Interrompendo a execução exatamente no ponto de interesse",
        theory: "A instrução \"debugger;\" é uma palavra-chave reservada do JavaScript que atua como um breakpoint programático. Se o Node.js estiver rodando com a flag --inspect e um depurador conectado, a execução é congelada imediatamente na linha da instrução, permitindo inspecionar o escopo de variáveis e a call stack.",
        questions: [
          q("O que acontece quando o Node.js encontra a instrução \"debugger;\" com o depurador conectado?", "A execução da thread JavaScript é imediatamente congelada naquele ponto exato para inspeção", ["O programa encerra com código 1","O arquivo é salvo no disco"], "A instrução transfere o foco para a ferramenta de depuração destacando a linha atual."),
          q("O que acontece se o código contiver a instrução \"debugger;\" mas NENHUM depurador estiver conectado?", "A instrução é totalmente ignorada e o código continua rodando sem nenhum efeito colateral", ["Ocorre um SyntaxError fatal","O Node emite um alerta na tela"], "Na ausência de um depurador ativo, a declaração debugger atua como uma instrução vazia inofensiva."),
          q("Qual é o benefício de usar breakpoints condicionais nas ferramentas de desenvolvimento?", "Pausar a execução apenas quando uma condição lógica for verdadeira (ex: usuario.id === 99)", ["Acelerar o processamento de loops","Impedir vazamento de memória"], "Breakpoints condicionais evitam ter que apertar \"Continue\" centenas de vezes em loops repetitivos."),
          q("O que a pilha de chamadas (Call Stack) exibida no depurador permite ao desenvolvedor analisar?", "A cadeia de funções ativas que foram chamadas até alcançar o ponto exato da interrupção atual", ["O tamanho dos arquivos do disco","A velocidade da conexão de rede"], "A Call Stack revela a trajetória exata que o fluxo tomou para chegar até onde a pausa aconteceu."),
          t("Qual palavra-chave nativa do JavaScript define um ponto de interrupção programático no código?", ["debugger"], "debugger; é a instrução de breakpoint da linguagem."),
          g("Complete a instrução que congela a execução se o depurador estiver monitorando o processo:", ["debugger"], "debugger; pausa a execução para inspeção.", "if (valorCalculado < 0) {\n  ____;\n}"),
          o("Ordene a análise de uma variável suspeita utilizando a instrução debugger:", ["Inserir a declaração \"debugger;\" imediatamente antes do cálculo que gera o valor incorreto","Disparar a execução no terminal com a flag: node --inspect app.js","Conectar o depurador visual e reproduzir a ação que dispara a função","O código congela no ponto desejado permitindo inspecionar as variáveis no painel Scope"], "Inserção de debugger, início com --inspect, conexão do depurador e congelamento para inspeção."),
          p("Associe o recurso do depurador à sua utilidade:", [["debugger;","Declaração da linguagem que pausa a execução programaticamente"],["Painel Scope","Lista todas as variáveis locais, closures e globais ativas no momento"],["Call Stack","Mostra a árvore hierárquica de funções que conduziram à linha corrente"],["Step Over / Step Into","Controles para avançar linha a linha ou entrar no corpo de funções"]], "Dominar breakpoints e debugger transforma investigações misteriosas em diagnósticos precisos.")
        ]
      },
      {
        id: "javascript-c12-u8-l3-o-modulo-node-diagnostics-channel",
        title: "Telemetria estruturada com node:diagnostics_channel",
        subtitle: "Observabilidade desacoplada · Canais de publicação/assinatura para métricas e logs",
        theory: "Para monitorar performance sem acoplar código de telemetria diretamente na lógica de negócio, o Node.js disponibiliza o módulo nativo node:diagnostics_channel. Ele permite que bibliotecas publiquem eventos em canais nomeados (publish), enquanto ferramentas de auditoria assinam (subscribe) e coletam dados sem intrusão.",
        questions: [
          q("Qual é o propósito do módulo nativo node:diagnostics_channel no Node.js moderno?", "Permitir a publicação e subscrição de eventos de diagnóstico e telemetria de forma desacoplada", ["Compilar código C++ em segundo plano","Gerenciar senhas do sistema operacional"], "Cria um canal isolado onde dados operacionais trafegam sem poluir a arquitetura da aplicação."),
          q("Como um módulo publica dados de diagnóstico em um canal nomeado usando este recurso?", "diagnostics_channel.channel(\"meu-canal\").publish(dadosDoEvento)", ["diagnostics.emit(\"meu-canal\", dados)","channel.send(dados)"], "publish despacha a carga de telemetria de forma síncrona e segura para todos os assinantes ativos."),
          q("O que acontece se uma função publicar dados em um canal que não possui nenhum assinante conectado?", "O canal simplesmente descarta o evento com custo de processamento praticamente zero (overhead mínimo)", ["Lança um erro de canal fechado","Armazena em arquivo texto"], "Diagnostics Channel foi concebido para permanecer sempre ativo no core com altíssima performance."),
          q("Quais ferramentas amplamente utilizadas em produção utilizam diagnostics_channel sob o capô?", "Agentes de monitoramento APM como OpenTelemetry, Datadog e New Relic para rastreio de requisições", ["Editores de texto como VS Code","Compiladores de TypeScript"], "Bibliotecas APM escutam esses canais para rastrear consultas a bancos de dados e chamadas HTTP."),
          t("Qual método de um canal obtido por diagnostics_channel.channel() despacha dados para os ouvintes?", ["publish"], "channel.publish() envia os dados de telemetria para os assinantes."),
          g("Complete a assinatura de um canal de auditoria para capturar métricas de rede:", ["subscribe"], "channel.subscribe registra ouvintes no canal.", "const canal = diagnostics_channel.channel(\"api:requisicao\");\ncanal.____((dados) => console.log(dados));"),
          o("Ordene o fluxo de observabilidade com node:diagnostics_channel:", ["Criar ou obter referência ao canal nomeado: const ch = channel(\"banco:query\")","O serviço de telemetria assina o canal: ch.subscribe(gravarMetrica)","O serviço de banco de dados executa a query e dispara ch.publish({ duracaoMs: 12 })","O assinante recebe o evento e atualiza o painel de observabilidade sem tocar na lógica da query"], "Obtenção do canal, subscrição por telemetria, publicação pelo produtor e coleta transparente."),
          p("Associe o componente de diagnostics_channel ao seu papel:", [["channel.publish(dados)","Emite uma carga útil de evento de diagnóstico para os ouvintes ativos"],["channel.subscribe(fn)","Registra uma função ouvinte para receber eventos emitidos naquele canal"],["Overhead próximo de zero","Quando não há assinantes, a chamada de publicação não degrada a CPU"],["OpenTelemetry","Padrão aberto da indústria que consome diagnostics_channel nativamente"]], "diagnostics_channel é a fundação para observabilidade de padrão enterprise no ecossistema Node.js.")
        ]
      },
      {
        id: "javascript-c12-u8-l4-dump-de-memoria-e-depuracao-de-memory-leaks",
        title: "Investigação de vazamentos de memória (Memory Leaks)",
        subtitle: "Estabilidade operacional · Heap Snapshots, process.memoryUsage e Garbage Collection",
        theory: "Um Memory Leak ocorre quando objetos continuam sendo referenciados inadvertidamente (ex: em arrays globais ou listeners não removidos), impedindo que o Garbage Collector (GC) limpe a memória. Inspecionar process.memoryUsage() e capturar Heap Snapshots com node:v8 permite comparar a retenção de memória e achar a raiz.",
        questions: [
          q("O que caracteriza formalmente um Memory Leak (vazamento de memória) em uma aplicação Node.js?", "Quando a memória RAM alocada cresce indefinidamente porque objetos inúteis continuam retidos por referências", ["Quando o HD fica sem espaço","Quando a conexão de rede cai"], "Se o Garbage Collector não consegue desalocar objetos esquecidos, a heap estoura em crash fatal."),
          q("Qual método nativo de process informa o consumo detalhado de memória física e da heap do V8?", "process.memoryUsage()", ["process.getRAM()","process.heapStats()"], "memoryUsage detalha heapUsed, heapTotal, rss (Resident Set Size) e external."),
          q("Qual módulo nativo do Node.js expõe a função getHeapSnapshot() para salvar o estado da memória em arquivo?", "node:v8", ["node:memory","node:gc"], "node:v8 permite gravar instantâneos da heap em arquivos .heapsnapshot para abertura no DevTools."),
          q("Qual é uma das causas mais comuns de Memory Leaks em servidores Node.js?", "Registrar event listeners (ex: emitter.on()) sem nunca removê-los com off() ou removeListener()", ["Usar variáveis locais let","Chamar funções assíncronas com await"], "Ouvintes acumulados retêm referências para todos os objetos do seu escopo, impedindo a coleta pelo GC."),
          t("Qual propriedade de process.memoryUsage() informa o total de memória RAM atualmente ocupada por objetos na heap?", ["heapUsed"], "heapUsed reflete a quantidade real de memória alocada por objetos JavaScript."),
          g("Complete a extração das métricas detalhadas de consumo de memória do processo:", ["memoryUsage"], "process.memoryUsage reporta o uso de RAM.", "const uso = process.____();\nconsole.log(`Heap em uso: ${uso.heapUsed} bytes`);"),
          o("Ordene o diagnóstico de um vazamento de memória com Heap Snapshots:", ["Identificar que o consumo de heapUsed está subindo continuamente após sucessivas requisições","Gravar o primeiro snapshot da memória com node:v8 getHeapSnapshot()","Executar uma carga de requisições de estresse no servidor e gravar o segundo snapshot","Abrir ambos os arquivos no painel Memory do DevTools e usar a visão \"Comparison\" para achar o leak"], "Identificação de crescimento, snapshot 1, carga de estresse com snapshot 2 e comparação no DevTools."),
          p("Associe a métrica de process.memoryUsage ao seu conceito:", [["heapUsed","Volume em bytes de memória atualmente consumido por objetos vivos no JavaScript"],["heapTotal","Total de memória alocada pelo motor V8 disponível para a heap no momento"],["rss (Resident Set Size)","Total de memória física do sistema operacional ocupada pelo processo inteiro"],["Heap Snapshot","Fotografia integral de todos os grafos de objetos na memória para análise comparativa"]], "Diagnosticar vazamentos de memória garante que servidores permaneçam saudáveis por meses a fio.")
        ]
      },
      {
        id: "javascript-c12-u8-l5-sintese-arquitetural-e-boas-praticas-node",
        title: "Síntese arquitetural: boas práticas no ambiente Node.js",
        subtitle: "Engenharia de software no servidor · As dez regras essenciais para projetos profissionais",
        theory: "Desenvolver em Node.js com excelência exige: adotar ESM nativo com prefixo node:, travar dependências com package-lock.json e npm ci, usar node --watch e node --test embutidos, ancorar caminhos com import.meta.url, validar variáveis com Fail Fast, tratar unhandledRejection e nunca bloquear a thread principal.",
        questions: [
          q("Qual é a regra de ouro fundamental para manter a alta performance de qualquer servidor Node.js?", "Nunca bloquear a thread principal: delegar operações demoradas de I/O para APIs assíncronas", ["Escrever todo o código de forma síncrona","Usar loops infinitos para esperar dados"], "Bloquear a thread principal impede o processamento de requisições de todos os outros usuários do sistema."),
          q("Por que é essencial tratar o evento \"unhandledRejection\" do objeto process?", "Para garantir que falhas assíncronas sejam registradas em logs e o processo seja encerrado com segurança", ["Para impedir que o código seja modificado","Porque melhora a internet do servidor"], "Rejeições silenciosas de Promises escondem falhas graves de integridade no banco de dados."),
          q("Qual é o impacto de utilizar os recursos nativos modernos (node:test, --watch, --env-file) nos projetos?", "Projetos mais leves, redução drástica de vulnerabilidades em node_modules e compilação mais limpa", ["O código perde compatibilidade com a web","Apenas para fins acadêmicos"], "Menos dependências de terceiros significam menos risco de segurança e manutenção no futuro."),
          q("Como organizar o encerramento gracioso (Graceful Shutdown) de um servidor Node.js em produção?", "Ouvindo sinais do SO como SIGTERM, parando de receber novas conexões e finalizando as tarefas pendentes", ["Desligando o cabo de força","Invocando process.exit(0) na hora sem esperar"], "Graceful shutdown garante que transações no meio do caminho terminem antes do processo morrer."),
          t("Qual sinal POSIX é enviado por orquestradores (como Kubernetes e Docker) para solicitar encerramento gracioso?", ["SIGTERM"], "SIGTERM avisa ao processo que ele será desativado em breve."),
          g("Complete o registro do hook de encerramento gracioso ao receber o sinal do orquestrador:", ["SIGTERM"], "process.on(\"SIGTERM\") inicia o shutdown gracioso.", "process.on(\"____\", async () => {\n  await fecharServidor();\n  process.exit(0);\n});"),
          o("Ordene a rotina de encerramento gracioso de um servidor em contêiner:", ["O orquestrador emite o sinal process.on(\"SIGTERM\") informando parada iminente","O servidor HTTP para de aceitar novas requisições na porta pública","Aguardar o encerramento das requisições ativas que já estavam em processamento","Fechar conexões de banco de dados e encerrar o processo com process.exit(0)"], "Recepção de SIGTERM, interrupção de novas conexões, término de pendências e saída segura."),
          p("Associe o pilar de engenharia Node.js ao seu objetivo:", [["I/O não bloqueante","Mantém a thread principal livre para responder milhares de clientes simultâneos"],["Prefixo node:","Elimina ambiguidades de importação e bloqueia ataques de typosquatting"],["Graceful Shutdown","Finaliza requisições em voo com segurança antes de matar o contêiner"],["npm ci e Lockfile","Garante determinismo absoluto na instalação em esteiras automatizadas"]], "Dominar a plataforma Node.js capacita o engenheiro a entregar serviços confiáveis e ultrarrápidos.")
        ]
      }
    ]
  });
})();
