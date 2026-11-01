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
    1: [
      {
        id: "js-c01-u1-l5",
        title: "Linguagem ECMAScript versus APIs do ambiente",
        subtitle: "Revisão e desafio · linguagem vs ambiente",
        theory: "JavaScript é padronizado pelo ECMAScript, que define tipos, sintaxe, operadores e laços. Já APIs como document e fetch no navegador, ou fs e process no Node.js, são recursos fornecidos pelo ambiente de execução onde o código roda, não pela linguagem pura.",
        questions: [
          q("Qual destes recursos é parte integrante da especificação central ECMAScript e existe em qualquer ambiente JavaScript moderno?", "O método Array.prototype.map() para transformar coleções", ["O objeto document para consultar elementos na tela","O módulo fs para ler arquivos no disco rígido"], "Array.map() é definido no padrão da linguagem ECMAScript, funcionando em navegadores, Node.js e servidores.", "const triplos = [1, 2, 3].map(n => n * 3);\nconsole.log(triplos);"),
          q("O que acontece ao tentar executar document.getElementById(\"titulo\") dentro de um script puro no terminal do Node.js?", "Ocorre ReferenceError porque document é uma Web API do navegador inexistente no Node.js", ["O Node.js abre automaticamente uma janela oculta do navegador","O script retorna null sem gerar erro"], "O objeto global document só existe no ambiente do navegador (DOM)."),
          q("Qual objeto global do Node.js permite ler argumentos de linha de comando, mas não existe na especificação padrão de navegadores?", "process.argv", ["window.history","location.href"], "process é uma API de sistema do Node.js para interagir com o processo do sistema operacional."),
          q("Por que separar a lógica pura de negócio das chamadas ao DOM do navegador é uma boa prática de arquitetura?", "Porque permite testar e reutilizar as regras de cálculo tanto no navegador quanto em scripts de backend Node.js", ["Porque o navegador proíbe arquivos JavaScript com mais de duas funções","Porque cálculos matemáticos não funcionam dentro de tags HTML"], "Desacoplar regra de negócio do ambiente facilita testes unitários automatizados e reaproveitamento."),
          t("Qual valor a expressão ECMAScript typeof 42n retorna em qualquer ambiente moderno compatível?", ["bigint"], "O tipo primitivo BigInt foi introduzido no ECMAScript 2020 e é suportado em todos os runtimes modernos.", "console.log(typeof 42n);"),
          g("Complete o nome do padrão oficial que especifica a gramática e os tipos centrais da linguagem JavaScript:", ["ECMAScript"], "O comitê TC39 padroniza a linguagem sob o nome formal ECMAScript.", "// JavaScript é a implementação comercial da especificação ____ (TC39)"),
          o("Ordene o caminho do código desde a padronização até a renderização visual em tela:", ["Comitê TC39 define nova especificação ECMAScript","Motor do navegador (V8, SpiderMonkey) implementa a sintaxe","Desenvolvedor escreve script consumindo Web APIs e ECMAScript","Navegador interpreta o script e atualiza a árvore DOM na tela"], "Entender os papéis da especificação, do motor e das APIs consolida a visão da plataforma."),
          p("Associe cada recurso ao ambiente onde ele é fornecido por padrão:", [["Math.max(10, 20)","Especificação central da linguagem ECMAScript"],["window.localStorage","Web Storage API fornecida pelo navegador"],["process.env.PORT","Ambiente de tempo de execução do Node.js"],["alert(\"Ola!\")","Host environment interativo do navegador web"]], "Distinguir a origem de cada API evita tentar usar recursos de um ambiente em outro.")
        ]
      }
    ],
    2: [
      {
        id: "js-c01-u2-l1",
        title: "A tríade da web: HTML, CSS e JavaScript",
        subtitle: "Apresentação · Estrutura, apresentação e comportamento",
        theory: "A web moderna é construída sobre três camadas complementares: o HTML define o significado e a estrutura do conteúdo, o CSS controla a apresentação visual e o layout, e o JavaScript implementa o comportamento dinâmico e a interatividade da página.",
        questions: [
          q("Qual tecnologia da tríade da web é responsável por processar o clique do usuário e alternar o tema da página?", "JavaScript", ["HTML estrutural","CSS puro"], "JavaScript trata eventos de entrada e atualiza classes e dados em resposta às ações do usuário."),
          q("Por que estilizar cores e espaçamentos com classes CSS é melhor do que fixar estilos diretamente no JavaScript?", "Porque mantém a separação de responsabilidades e facilita a manutenção visual centralizada nas folhas de estilo", ["Porque o JavaScript não possui suporte a cores hexadecimais","Porque o CSS impede que a página seja copiada"], "Separar estilo em CSS e lógica em JS mantém o código limpo, consistente e sustentável."),
          q("Qual tag HTML é utilizada para carregar um arquivo de script externo no documento?", "<script src=\"app.js\"></script>", ["<link rel=\"script\" href=\"app.js\">","<js include=\"app.js\"></js>"], "Scripts externos são referenciados no HTML através do elemento <script> com o atributo src."),
          q("Em uma aplicação web acessível, qual camada define a hierarquia correta de títulos (h1, h2, h3)?", "HTML", ["JavaScript dinâmico","Folhas de estilo CSS"], "HTML semântico estabelece a estrutura de cabeçalhos consumida por leitores de tela e motores de busca."),
          t("Qual extensão de arquivo é a convenção universal para código-fonte JavaScript?", [".js"], "Arquivos de script usam a extensão .js, servidos com o MIME type text/javascript.", "// Exemplo: app.js, main.js, util.js"),
          g("Complete a tag HTML para vincular o script calculadora.js:", ["<script src=\"calculadora.js\"></script>"], "A tag script com o atributo src importa o arquivo para o contexto da página web.", "<!-- Carregamento do script -->\n____"),
          o("Ordene as camadas da web da base estrutural até a camada de interatividade:", ["HTML: Marcação de conteúdo e estrutura semântica","CSS: Regras visuais, cores, tipografia e layout responsivo","JavaScript: Manipulação de estado, eventos e requisições dinâmicas"], "Essa ordem reflete a progressão lógica da construção de páginas web modernas."),
          p("Associe cada tecnologia web à sua responsabilidade principal:", [["HTML","Definir botões, parágrafos e formulários estruturais"],["CSS","Definir paleta de cores escura e grid responsivo"],["JavaScript","Validar campos ao enviar e atualizar dados via API"],["DOM","Interface em memória que une o HTML ao JavaScript"]], "Compreender o papel de cada tecnologia é a base do desenvolvimento frontend.")
        ]
      },
      {
        id: "js-c01-u2-l2",
        title: "Carregamento de scripts com defer",
        subtitle: "Prática guiada · Evitando bloquear o parser HTML",
        theory: "Quando o navegador encontra uma tag script clássica no head, ele pausa o parsing do HTML para baixar e executar o arquivo. O atributo defer faz o download ocorrer em paralelo e adia a execução para o momento exato após o HTML estar completamente analisado.",
        questions: [
          q("Qual é o principal benefício de adicionar o atributo defer na tag <script src=\"main.js\" defer>?", "Permite baixar o script em segundo plano sem pausar o parse do HTML e executa antes de DOMContentLoaded", ["Faz o script rodar no servidor em vez do navegador do cliente","Apaga todos os erros do console automaticamente"], "defer não bloqueia a construção da árvore DOM e garante a execução na ordem das tags."),
          q("O que ocorre ao tentar document.querySelector(\"#btn\") em um script no <head> sem defer e sem aguardar eventos?", "Retorna null porque o elemento #btn no <body> ainda não foi analisado pelo parser", ["O navegador cria o elemento #btn automaticamente no head","Lança SyntaxError antes de abrir a página"], "Se o parser ainda não chegou ao body, o elemento não existe no DOM no momento da execução."),
          q("Qual atributo alternativo executa o script imediatamente após o download, sem garantir a ordem entre arquivos?", "async", ["defer","lazy"], "async é ideal para scripts de terceiros independentes (como analytics), mas perigoso para código que depende de ordem."),
          q("Em qual ordem dois scripts com defer no <head> (<script src=\"a.js\" defer> e <script src=\"b.js\" defer>) executam?", "Sempre na ordem do documento: primeiro a.js e depois b.js", ["Em ordem aleatória conforme quem terminar o download primeiro","Ao mesmo tempo em threads separadas da GPU"], "A especificação HTML garante que scripts com defer executam em sequência estrita de aparição."),
          t("Qual atributo booleano de <script> adia a execução garantindo a ordem relativa dos scripts?", ["defer"], "defer adia a execução até o fim do parsing sem quebrar a ordem entre scripts.", "<script src=\"logica.js\" defer></script>"),
          g("Complete a tag de cabeçalho para carregar app.js com carregamento assíncrono e execução ordenada:", ["defer"], "O atributo defer é a melhor prática para scripts dependentes no head.", "<script src=\"app.js\" ____></script>"),
          o("Ordene o ciclo de vida de uma página com script defer no cabeçalho:", ["Navegador inicia a leitura e montagem do HTML","Encontra tag script com defer e inicia download em segundo plano","Conclui a construção completa da árvore DOM","Executa o script baixado com acesso garantido aos elementos do DOM","Dispara o evento DOMContentLoaded"], "Esse fluxo demonstra como defer garante performance de renderização inicial e acesso seguro ao DOM."),
          p("Associe cada modo de script ao seu comportamento no navegador:", [["<script src=\"x.js\"> clássico","Pausa o parser HTML para baixar e executar"],["<script src=\"x.js\" defer>","Baixa em paralelo e executa ordenado após o parse do DOM"],["<script src=\"x.js\" async>","Baixa em paralelo e executa imediatamente ao terminar"],["<script type=\"module\">","Ativa módulos ES com comportamento defer por padrão"]], "Escolher a forma correta de importação otimiza a velocidade de carregamento (Core Web Vitals).")
        ]
      },
      {
        id: "js-c01-u2-l3",
        title: "Prevenindo referências nulas ao carregar o DOM",
        subtitle: "Aprofundamento · Sincronia entre árvore e código",
        theory: "Acessar propriedades de um elemento nulo (como document.querySelector(\"#alvo\").textContent) dispara TypeError se o script rodar antes do elemento existir. Usar defer ou o evento DOMContentLoaded garante que a árvore de nós esteja pronta antes da manipulação.",
        questions: [
          q("Qual erro o console do navegador exibe ao executar null.textContent = \"Olá\"?", "TypeError: Cannot set properties of null (setting 'textContent')", ["ReferenceError: null is not defined","SyntaxError: unexpected token ="], "Tentar ler ou gravar propriedades em null é uma das exceções mais frequentes em JavaScript."),
          q("Qual evento da janela sinaliza que o HTML foi totalmente processado em elementos do DOM?", "DOMContentLoaded", ["window.onload","document.onfinish"], "DOMContentLoaded dispara assim que a árvore de nós está construída, sem esperar imagens ou stylesheets."),
          q("Qual operador moderno de encadeamento opcional do ECMAScript evita quebra quando o elemento pode não existir?", "elemento?.textContent", ["elemento!.textContent","elemento##textContent"], "O encadeamento opcional (?.) avalia para undefined em vez de lançar TypeError se elemento for null."),
          q("Por que colocar scripts no final do <body> era uma prática comum antes da adoção em massa de defer?", "Porque garantia que todos os elementos anteriores do body já haviam sido lidos antes do script rodar", ["Porque os navegadores antigos não suportavam arquivos .js externos","Porque o body duplica a velocidade de execução do código"], "Posicionar no final do body era o método clássico para garantir que os elementos já existissem no DOM."),
          t("Qual valor document.querySelector(\"#inexistente\") retorna quando o seletor não casa com nenhum nó?", ["null"], "Seletor sem correspondência no DOM sempre devolve o valor primitivo null.", "const el = document.querySelector(\"#inexistente\");\nconsole.log(el);"),
          g("Complete o listener que aguarda o carregamento estrutural do DOM:", ["DOMContentLoaded"], "Ouvir DOMContentLoaded permite adiar o código de inicialização de interface.", "document.addEventListener(\"____\", () => {\n  console.log(\"DOM pronto!\");\n});"),
          o("Ordene os passos defensivos ao capturar e manipular um elemento na página:", ["Garantir carregamento com defer ou DOMContentLoaded","Executar document.querySelector com seletor específico","Verificar se o elemento capturado não é nulo antes de operar","Atualizar propriedades visuais ou textuais com segurança"], "Essa rotina defensiva previne quebras em páginas dinâmicas ou parciais."),
          p("Associe cada técnica à sua estratégia de sincronização com o DOM:", [["Atributo defer no head","Carrega em segundo plano e adia execução para o fim do parse"],["Listener DOMContentLoaded","Garante execução de callback apenas com o DOM montado"],["Script antes de </body>","Técnica legada baseada no fluxo sequencial do parser"],["Encadeamento opcional ?.","Proteção pontual contra leitura de nós nulos"]], "Combinar carregamento moderno e código defensivo garante robustez à aplicação.")
        ]
      },
      {
        id: "js-c01-u2-l4",
        title: "Organização de arquivos e responsabilidades",
        subtitle: "Aplicação · Separação de pastas em projetos web",
        theory: "Projetos frontend sustentáveis organizam arquivos em pastas dedicadas como css/, js/ e assets/. Manter o HTML livre de estilos inline (style=\"...\") e de scripts inline (onclick=\"...\") desacopla camadas, melhora a segurança com CSP e facilita testes e manutenção.",
        questions: [
          q("Por que evitar manipuladores de evento inline como <button onclick=\"salvar()\"> é recomendado em projetos modernos?", "Porque mistura marcação com lógica de execução e viola políticas rígidas de Content Security Policy (CSP)", ["Porque botões com onclick param de funcionar em navegadores móveis","Porque o onclick obriga o uso de cookies no cliente"], "Adicionar eventos via addEventListener no JS mantém o HTML semântico e permite políticas de segurança modernas."),
          q("Em qual pasta costumamos organizar as folhas de estilo de uma aplicação frontend bem estruturada?", "css/ ou styles/", ["bin/","temp/"], "Convenções de pastas como css/ ou styles/ padronizam a navegação do projeto para toda a equipe."),
          q("Qual política de segurança do navegador (CSP) pode bloquear a execução de scripts embutidos diretamente no HTML?", "Content-Security-Policy com diretiva script-src", ["Cross-Origin Resource Sharing (CORS)","Strict-Transport-Security (HSTS)"], "CSP pode proibir scripts inline (unsafe-inline), exigindo arquivos .js externos vinculados."),
          q("Como associar o clique de um botão no arquivo js/app.js sem mexer no HTML além do id?", "document.querySelector(\"#btn-salvar\").addEventListener(\"click\", salvar);", ["document.write(\"<click>salvar</click>\");","window.executar(\"salvar\");"], "O método addEventListener conecta a função de tratamento ao elemento no DOM sem poluir a marcação."),
          t("Em um projeto com pastas separadas, qual caminho relativo em index.html importa app.js da pasta js/?", ["js/app.js"], "O caminho relativo indica a subpasta js/ a partir da raiz do documento HTML.", "<script src=\"js/app.js\" defer></script>"),
          g("Complete o método moderno para registrar o evento de clique sem inline HTML:", ["addEventListener"], "addEventListener é a API padrão do W3C para registrar ouvintes de eventos.", "botao.____(\"click\", () => {\n  console.log(\"Clicado!\");\n});"),
          o("Ordene a estrutura recomendada de um projeto web estático organizado:", ["index.html na raiz como documento de entrada","pasta css/ contendo styles.css","pasta js/ contendo app.js modularizado","pasta assets/ para imagens vetoriais e fontes"], "Uma árvore limpa de pastas facilita build, cache e trabalho em equipe."),
          p("Associe o padrão de código ao seu nível de boas práticas:", [["<button onclick=\"f()\">","Antipadrão legado que mistura camadas e quebra CSP"],["botao.addEventListener(\"click\", f)","Padrão recomendado com eventos desacoplados"],["style=\"color: red\"","Estilo inline desaconselhado em escala"],["class=\"texto-destaque\"","Estilização semântica centralizada no CSS"]], "Separar camadas é requisito indispensável para aplicações frontend profissionais.")
        ]
      },
      {
        id: "js-c01-u2-l5",
        title: "Revisão e integração de HTML, CSS e JS",
        subtitle: "Revisão e desafio · Integrando a tríade sem atritos",
        theory: "Integrar as três camadas exige coerência: seletores no CSS e no JS devem casar exatamente com as classes e ids do HTML. O carregamento com defer assegura que todos os nós existam no momento em que os scripts adicionam interatividade à interface.",
        questions: [
          q("Qual conjunto de tags no <head> integra corretamente a folha de estilo e o script principal com defer?", "<link rel=\"stylesheet\" href=\"style.css\"> e <script src=\"app.js\" defer></script>", ["<style src=\"style.css\"> e <js href=\"app.js\">","<import css=\"style.css\" js=\"app.js\">"], "Folhas de estilo usam <link rel=\"stylesheet\"> e scripts externos usam <script src=\"...\">."),
          q("Se o HTML possui <div id=\"status\" class=\"alerta\"></div>, qual seletor busca o nó com maior especificidade por id?", "#status", [".alerta","div"], "O seletor por id (#status) é direto, unívoco e possui alta especificidade no DOM."),
          q("Por que alterar a aparência adicionando uma classe (el.classList.add(\"ativo\")) é melhor que modificar estilos inline no JS (el.style.display = \"block\")?", "Porque preserva as regras de design no CSS, permitindo animações e transições fáceis sem código fixo no JS", ["Porque classList consome menos energia da bateria do celular","Porque o CSS proíbe tags com atributo id"], "Modificar classes mantém o JavaScript responsável apenas pelo estado lógico e o CSS pelo visual."),
          q("O que acontece se o nome do arquivo no atributo src de <script src=\"ap.js\" defer> estiver com erro de digitação?", "O navegador falha em carregar o arquivo com erro 404 e os recursos do script não estarão disponíveis", ["O navegador adivinha o nome correto procurando na pasta","A página não abre e fica em branco"], "Erros no caminho do script impedem o download, gerando falha de rede 404 no console."),
          t("Qual propriedade de Element permite adicionar uma classe CSS sem substituir as classes já existentes?", ["classList"], "classList oferece métodos convenientes como add(), remove() e toggle().", "elemento.classList.add(\"destaque\");"),
          g("Complete o método para alternar uma classe visual no elemento com base em clique:", ["toggle"], "toggle adiciona a classe se ela não existir ou a remove se já estiver presente.", "cartao.classList.____(\"ativo\");"),
          o("Ordene o ciclo de vida completo de uma funcionalidade interativa na tríade:", ["HTML define a estrutura do botão com id semântico","CSS define as classes visuais normal e destacada","JavaScript carrega via defer e localiza o botão","Evento de clique é registrado para alternar a classe"], "As três tecnologias operam em sincronia para produzir uma experiência fluida."),
          p("Associe cada seletor ou método ao seu propósito na integração:", [["document.getElementById(\"painel\")","Captura elemento único por seu identificador"],["elemento.classList.toggle(\"aberto\")","Alterna estado visual através de classe CSS"],["elemento.textContent = \"Concluido\"","Atualiza mensagem textual de forma segura contra XSS"],["<link rel=\"stylesheet\" href=\"...\">","Vincula estilos globais antes da renderização"]], "Dominar esses seletores e métodos forma a base de toda biblioteca ou framework web.")
        ]
      }
    ],
    3: [
      {
        id: "js-c01-u3-l1",
        title: "O console das ferramentas de desenvolvedor",
        subtitle: "Apresentação · Janela de inspeção do ambiente",
        theory: "As ferramentas de desenvolvedor (DevTools) dos navegadores oferecem o Console: um ambiente interativo (REPL) para inspecionar valores, ler mensagens de log e diagnosticar exceções em tempo de execução sem afetar a visualização direta da página para o usuário final.",
        questions: [
          q("Para que serve o método console.log() em JavaScript?", "Exibir mensagens e dados no painel de ferramentas de desenvolvimento para depuração", ["Exibir um pop-up visual que interrompe a navegação do usuário","Imprimir o documento em uma impressora física"], "console.log envia dados para o console do ambiente, sendo indispensável para depuração e inspeção."),
          q("Em navegadores comuns como Chrome, Firefox e Edge, qual atalho ou menu abre diretamente as DevTools?", "Pressionar a tecla F12 ou clicar com botão direito e selecionar Inspecionar", ["Pressionar Ctrl + Alt + Del","Digitar www.devtools.com na barra de endereços"], "F12 ou o menu de contexto \"Inspecionar\" abrem as ferramentas de desenvolvimento integradas."),
          q("Uma chamada console.log(\"Carregado\") é visível para o visitante comum na página renderizada?", "Não, mensagens de console aparecem exclusivamente dentro do painel DevTools", ["Sim, substitui o título principal da página","Sim, pisca no canto superior esquerdo"], "Logs de console não geram elementos na página visual; ficam reservados aos desenvolvedores."),
          q("O console das DevTools permite apenas leitura passiva ou também avalia comandos digitados diretamente nele?", "Funciona como um REPL completo, permitindo digitar e avaliar expressões JavaScript em tempo real", ["Apenas exibe texto estático sem aceitar comandos","Permite apenas comandos em linguagem SQL"], "O console é interativo: podemos inspecionar variáveis, testar funções e avaliar expressões vivas."),
          t("Qual objeto nativo fornece as funções de impressão e diagnóstico como log, warn e error?", ["console"], "O objeto global console reúne APIs para emissão de mensagens de diagnóstico.", "console.log(\"Sistema pronto\");"),
          g("Complete o comando que exibe o valor da variável total no console:", ["console.log"], "console.log é a função padrão para imprimir valores no console do desenvolvedor.", "const total = 99;\n____(total);"),
          o("Ordene o procedimento padrão para inspecionar um erro com o console:", ["Reproduzir a ação do usuário que gerou o comportamento inesperado","Abrir as Ferramentas de Desenvolvedor (F12) na aba Console","Localizar a mensagem de erro vermelha e o arquivo/linha de origem","Inspecionar variáveis e corrigir o código-fonte"], "Consultar o console é o primeiro passo para identificar a causa raiz de qualquer bug no frontend."),
          p("Associe cada aba clássica das DevTools à sua finalidade principal:", [["Console","Visualizar logs, avisos, exceções e testar código"],["Elements / Inspetor","Examinar e editar a árvore DOM e regras de CSS"],["Network / Rede","Monitorar requisições HTTP, status e tempos de resposta"],["Sources / Depurador","Inserir breakpoints e pausar execução linha a linha"]], "Conhecer as ferramentas certas acelera o diagnóstico de qualquer problema na web.")
        ]
      },
      {
        id: "js-c01-u3-l2",
        title: "Níveis de mensagem: log, info, warn e error",
        subtitle: "Prática guiada · Categorizando diagnósticos",
        theory: "O objeto console oferece métodos com níveis de severidade distintos: console.log e info para registros gerais, console.warn com destaque amarelo para situações que exigem atenção, e console.error com ícone vermelho e stack trace para falhas críticas da aplicação.",
        questions: [
          q("Qual método do console deve ser usado para registrar que uma operação de rede falhou com código HTTP 500?", "console.error()", ["console.warn()","console.log()"], "Erros críticos e exceções que impedem o fluxo normal devem ser registrados com console.error()."),
          q("Como o navegador costuma diferenciar visualmente chamadas a console.warn() no painel de ferramentas?", "Com fundo ou texto em amarelo e um ícone triangular de alerta", ["Com texto verde piscante em negrito","Com uma janela modal bloqueante na tela"], "Avisos recebem destaque visual em amarelo para chamar atenção sem interromper o fluxo."),
          q("console.error(\"Falha ao salvar\") interrompe automaticamente a execução do restante do script?", "Não, ele apenas emite uma mensagem com formatação de erro no console, sem lançar exceção", ["Sim, funciona exatamente como a instrução throw","Sim, fecha a aba do navegador imediatamente"], "console.error apenas imprime; para interromper o fluxo por erro é necessário lançar uma exceção com throw."),
          q("Qual funcionalidade do painel de console das DevTools permite ocultar mensagens informativas e ver apenas erros?", "O filtro de níveis de log (Default levels / Errors only)", ["A opção de zoom da tela","A barra de favoritos do navegador"], "Filtros por nível permitem isolar erros e alertas em aplicações com muitos logs de depuração."),
          t("Qual método do console é convencionalmente usado para avisos de depreciação ou parâmetros suspeitos?", ["console.warn"], "console.warn emite mensagens com estilo de alerta amarelo.", "console.warn(\"Metodo depreciado: use carregarNovo()\");"),
          g("Complete o método que registra uma falha crítica de autenticação no console:", ["error"], "console.error destaca a falha em vermelho e exibe o rastreamento da pilha.", "console.____(\"Token expirado: faca login novamente\");"),
          o("Ordene os métodos do console em ordem crescente de severidade:", ["console.log: Registro informativo de rotina","console.warn: Alerta sobre condição inesperada que não travou o sistema","console.error: Registro de falha ou exceção que impediu a conclusão"], "Categorizar por severidade facilita a triagem e o monitoramento de problemas."),
          p("Associe cada cenário ao método de console mais adequado:", [["Usuário clicou no botão de fechar modal","console.log() para rastrear navegação de rotina"],["API externa lenta mas respondeu em 4 segundos","console.warn() alertando sobre latência acima da meta"],["Servidor caiu e a requisição rejeitou com erro","console.error() registrando a quebra do serviço"],["Limpar todas as mensagens acumuladas no painel","console.clear() para zerar a visualização"]], "Usar o nível adequado torna o log útil sem poluir o console com ruído desnecessário.")
        ]
      },
      {
        id: "js-c01-u3-l3",
        title: "Múltiplos argumentos e typeof no console",
        subtitle: "Aprofundamento · Rótulos e tipos primitivos",
        theory: "Passar múltiplos argumentos separados por vírgula para console.log(\"Total:\", valor) imprime os dados com um espaço separador e evita coerções indesejadas de strings. O operador typeof inspeciona o tipo do valor, ajudando a identificar tipos inesperados em depuração.",
        questions: [
          q("Qual é a saída no console ao executar console.log(\"Resultado:\", 10 + 5)?", "Resultado: 15", ["Resultado:105","Resultado: 10 + 5"], "A vírgula separa argumentos exibindo cada um com espaço; a expressão numérica 10 + 5 é calculada primeiro."),
          q("Por que console.log(\"Idade:\", idade) é mais seguro do que console.log(\"Idade: \" + idade) em depuração?", "Porque a vírgula não força conversão para string e permite inspecionar objetos vivos e números com clareza", ["Porque a vírgula impede que o script gaste memória RAM","Porque o operador + é proibido dentro de chamadas console"], "Com vírgula, o console exibe cada valor em seu tipo real; com +, tudo é coagido para string única."),
          q("O que o operador typeof \"123\" retorna no console?", "\"string\"", ["\"number\"","\"text\""], "typeof avalia o tipo primitivo da entrada, retornando o identificador textual \"string\"."),
          q("Qual peculiaridade histórica famosa do ECMAScript faz typeof null retornar \"object\"?", "É uma limitação histórica das primeiras versões do JavaScript mantida por compatibilidade reversa", ["Porque null é internamente uma instância da classe Object","Porque null cria um arquivo no disco"], "typeof null === \"object\" é um caso especial mantido para não quebrar código legado na web."),
          t("Qual string typeof true retorna no console?", ["boolean"], "Valores lógicos true e false pertencem ao tipo primitivo boolean.", "console.log(typeof true);"),
          g("Complete o comando para rotular o log de depuração separando com vírgula:", ["console.log"], "Passar múltiplos argumentos rotula a saída sem concatenar strings à força.", "____(\"Saldo atual:\", saldo);"),
          o("Ordene o processo de investigação de um valor inesperado com typeof:", ["Observar resultado bizarro como \"102\" em vez de 12","Adicionar console.log(\"Tipo:\", typeof entrada, \"Valor:\", entrada)","Verificar no console que o tipo retornado é \"string\" e não \"number\"","Aplicar Number(entrada) para converter explicitamente antes da soma"], "Inspecionar tipos no console descobre erros de coerção implícita em segundos."),
          p("Associe cada expressão ao retorno de typeof correspondente:", [["typeof 42","\"number\""],["typeof \"Ola\"","\"string\""],["typeof undefined","\"undefined\""],["typeof (() => {})","\"function\""]], "O operador typeof é a primeira ferramenta de diagnóstico de tipos em tempo de execução.")
        ]
      },
      {
        id: "js-c01-u3-l4",
        title: "Limpeza e persistência de logs no console",
        subtitle: "Aplicação · Sessões limpas e Preserve log",
        theory: "Por padrão, recarregar a página (F5) limpa o console das DevTools. Ativar a opção Preserve log retém mensagens de navegações anteriores, essencial para depurar formulários e redirecionamentos. O método console.clear() esvazia a tela programaticamente.",
        questions: [
          q("Qual configuração das DevTools permite manter as mensagens no console após recarregar a página ou navegar?", "Preserve log (Preservar registro)", ["Disable cache (Desativar cache)","Filter by origin"], "Preserve log impede a limpeza automática do console em recarregamentos e submissões de formulário."),
          q("Para que serve chamar console.clear() no código ou no REPL das DevTools?", "Limpar todas as mensagens exibidas no painel de console naquele momento", ["Apagar o histórico de navegação do usuário do computador","Reiniciar o servidor backend"], "console.clear() esvazia o console para que novos testes comecem com uma tela limpa."),
          q("Por que a opção Preserve log é indispensável ao depurar envio de formulário padrão sem preventDefault?", "Porque o envio padrão navega para uma nova URL e apagaria os logs do evento submit antes de podermos lê-los", ["Porque formulários não enviam dados se o console estiver vazio","Porque substitui a necessidade do método POST"], "Sem Preserve log, a navegação da página limpa os logs exatamente na fração de segundo do envio."),
          q("O método console.table() oferece qual vantagem ao inspecionar uma lista de objetos?", "Exibe os objetos formatados em uma tabela bidimensional com colunas ordenáveis", ["Salva os dados automaticamente em uma planilha Excel no disco","Converte os dados em tags HTML na tela do site"], "console.table() renderiza arrays de objetos em uma tabela legível diretamente no console."),
          t("Qual comando de método limpa completamente as mensagens visíveis no console?", ["console.clear()"], "console.clear() limpa o painel e emite aviso indicando que o console foi esvaziado.", "console.clear();"),
          g("Complete o método que renderiza uma lista de objetos como tabela no console:", ["table"], "console.table facilita a leitura de estruturas repetitivas como listas de clientes ou itens.", "console.____([ { nome: \"Ana\" }, { nome: \"Bia\" } ]);"),
          o("Ordene as etapas para auditar o que ocorre durante a transição de página:", ["Abrir as ferramentas de desenvolvedor na aba Console","Marcar a opção Preserve log na barra de ferramentas do console","Acionar o botão que submete a página e recarrega a URL","Examinar os logs registrados antes e depois da nova navegação"], "Essa rotina permite capturar erros que ocorrem segundos antes do descarregamento da página."),
          p("Associe cada utilitário do console ao seu uso prático:", [["console.clear()","Limpar ruído acumulado para focar no próximo teste"],["console.table(itens)","Visualizar coleções em formato tabular com cabeçalhos"],["Caixa Preserve log","Guardar mensagens através de múltiplos recarregamentos"],["Caixa de filtro de texto","Buscar palavras-chave específicas em logs extensos"]], "Dominar esses recursos transforma o console em um ambiente produtivo de trabalho.")
        ]
      },
      {
        id: "js-c01-u3-l5",
        title: "Revisão e boas práticas de depuração no console",
        subtitle: "Revisão e desafio · Depuração profissional sem poluição",
        theory: "Embora o console seja essencial no desenvolvimento, deixar dezenas de logs espalhados polui a saída e pode vazar dados confidenciais. Práticas profissionais envolvem usar logs conscientes, categorizar com métodos semânticos e remover depurações antes da entrega.",
        questions: [
          q("Por que imprimir objetos contendo senhas, tokens ou dados pessoais com console.log em produção é um risco de segurança?", "Porque qualquer usuário ou extensão instalada com acesso às DevTools pode inspecionar e copiar esses segredos", ["Porque o console criptografa os dados e bloqueia a navegação","Porque o navegador cobra taxas por megabyte de log"], "Dados confidenciais nunca devem ser expostos no console, mesmo em ambientes de homologação."),
          q("Qual comando agrupa mensagens relacionadas sob um cabeçalho retrátil no console?", "console.group() e console.groupEnd()", ["console.wrap()","console.folder()"], "console.group cria blocos colapsáveis que organizam logs de rotinas complexas."),
          q("Para medir o tempo exato de execução de um trecho de código no console, quais métodos usamos?", "console.time(\"medicao\") e console.timeEnd(\"medicao\")", ["console.clock()","console.speed()"], "console.time inicia um cronômetro e timeEnd exibe os milissegundos decorridos com alta precisão."),
          q("Qual é a conduta recomendada para comandos console.log temporários criados durante a resolução de um bug?", "Remover os logs pontuais antes de commitar para manter o histórico e o console limpos", ["Duplicar os logs em todos os outros arquivos do sistema","Mudar todos para alert()"], "Limpar logs transitórios evita poluição no terminal e mantém a suíte de desenvolvimento organizada."),
          t("Qual método fecha um grupo de mensagens aberto por console.group()?", ["console.groupEnd()"], "groupEnd encerra o recuo hierárquico das mensagens agrupadas.", "console.group(\"Operacao\");\nconsole.log(\"Passo 1\");\nconsole.groupEnd();"),
          g("Complete o método que cronometra o tempo de execução de uma operação:", ["time"], "console.time recebe um rótulo identificador para o temporizador.", "console.____(\"carga\");\n// operacao executada\nconsole.timeEnd(\"carga\");"),
          o("Ordene o ciclo de vida de uma medição de desempenho com console:", ["Iniciar o cronômetro com console.time(\"calculo\")","Executar o laço ou processamento que precisa ser medido","Finalizar o cronômetro com console.timeEnd(\"calculo\")","Avaliar o tempo em milissegundos reportado no painel"], "Medir antes e depois de otimizações fornece evidências reais de ganho de desempenho."),
          p("Associe cada função de diagnóstico avançado do console ao seu papel:", [["console.time() / timeEnd()","Medir tempo decorrido de execução em milissegundos"],["console.group() / groupEnd()","Organizar saídas em blocos visuais colapsáveis"],["console.count(\"requisicao\")","Contar quantas vezes determinado ponto do código foi atingido"],["console.assert(condicao, msg)","Imprimir erro no console apenas quando a condição for falsa"]], "Essas ferramentas tornam a depuração estruturada, mensurável e muito mais rápida.")
        ]
      }
    ],
    4: [
      {
        id: "js-c01-u4-l1",
        title: "Textos com aspas simples, duplas e números",
        subtitle: "Apresentação · Literais de texto e valor numérico",
        theory: "Em JavaScript, literais de texto (strings) podem ser delimitados por aspas simples ('texto') ou aspas duplas (\"texto\") de forma intercambiável. Valores numéricos são escritos sem aspas; colocar aspas em torno de dígitos transforma o número em texto.",
        questions: [
          q("Qual é o tipo de dado do valor \"2026\" com aspas versus 2026 sem aspas em JavaScript?", "\"2026\" é uma string textual e 2026 é um valor do tipo number", ["Ambos são exatamente o mesmo número inteiro","Ambos são tratados como booleanos"], "Dígitos entre aspas representam caracteres textuais, não quantidades numéricas para cálculo."),
          q("Existe diferença técnica de comportamento entre usar aspas simples 'exemplo' e aspas duplas \"exemplo\" em JavaScript?", "Não, ambas criam strings literais comuns com exatamente as mesmas propriedades e métodos", ["Aspas duplas são mais rápidas na compilação do que simples","Aspas simples não aceitam caracteres em português"], "A escolha entre aspas simples e duplas é puramente convenção de estilo ou necessidade de aninhamento."),
          q("Qual forma de escrita é conveniente para incluir aspas duplas dentro do texto sem usar barra de escape?", "Envolver a string inteira em aspas simples: 'Ela disse \"oi\"'", ["Usar colchetes: [\"Ela disse oi\"]","Usar números: 123 \"oi\" 456"], "Alternar o delimitador externo permite usar aspas internas como caracteres literais normais."),
          q("O que a expressão 10 + 20 produz no console versus \"10\" + \"20\"?", "10 + 20 resulta no número 30; \"10\" + \"20\" concatena os textos resultando em \"1020\"", ["Ambas produzem o número 30","Ambas produzem o texto \"30\""], "O operador + soma números, mas concatena textos quando pelo menos um operando é string."),
          t("Qual valor a expressão \"5\" + 3 produz no console do navegador?", ["53"], "O número 3 é coagido para string e concatenado com \"5\", resultando na string \"53\".", "console.log(\"5\" + 3);"),
          g("Complete a declaração da string usando aspas simples válidas:", ["'Lincode'"], "Aspas simples fecham com aspas simples para formar a string literal.", "const curso = ____;"),
          o("Ordene as expressões pelo valor numérico resultante da avaliação matemática:", ["1 + 1 (resultado 2)","2 * 3 (resultado 6)","5 + 5 (resultado 10)","4 * 5 (resultado 20)"], "Diferenciar operações matemáticas de concatenações textuais é essencial na lógica inicial."),
          p("Associe cada literal JavaScript à sua interpretação correta:", [["42","Literal numérico inteiro do tipo number"],["\"42\"","Texto com dois caracteres numéricos do tipo string"],["'true'","String contendo quatro letras, e não o valor booleano"],["true","Valor booleano verdadeiro da linguagem"]], "Reconhecer literais previne bugs clássicos de coerção involuntária.")
        ]
      },
      {
        id: "js-c01-u4-l2",
        title: "Template literals e interpolação com crases",
        subtitle: "Prática guiada · A sintaxe `${expressão}`",
        theory: "Template literals usam crases (`texto`) e permitem interpolar expressões diretamente com a sintaxe ${expressao}. Isso elimina concatenações complexas com o operador +, suporta quebras de linha automáticas e torna mensagens dinâmicas muito mais legíveis.",
        questions: [
          q("Qual caractere delimita um template literal com suporte a interpolação ${} em JavaScript?", "Crase (backtick: `)", ["Aspas simples (')","Aspas duplas (\")"], "Apenas strings delimitadas por crases ativam a interpolação de expressões com ${}."),
          q("O que é exibido no console por: const n = \"Bia\"; console.log(`Ola, ${n}!`);?", "Ola, Bia!", ["Ola, ${n}!","Ola, n!"], "A expressão dentro de ${} é avaliada e seu valor é inserido no ponto exato da string."),
          q("Podemos colocar operações aritméticas diretamente dentro de ${} em um template literal?", "Sim, qualquer expressão JavaScript válida (como ${preco * 2}) é avaliada dentro das chaves", ["Não, aceita apenas nomes de variáveis isoladas sem cálculos","Apenas se a operação estiver entre aspas"], "${} aceita qualquer expressão que retorne um valor: chamadas de função, contas, ternários, etc."),
          q("O que acontece com um texto delimitado por aspas normais (\"Ola, ${nome}\")?", "Exibe literalmente a sequência de caracteres \"${nome}\" sem fazer substituição", ["Lança SyntaxError","Substitui normalmente"], "Sem crases, ${nome} é interpretado como texto comum e não como marcador de interpolação."),
          t("Qual é a saída exata de `Total: ${4 * 5}` no console do navegador?", ["Total: 20"], "A expressão 4 * 5 dentro de ${} é calculada resultando em 20.", "console.log(`Total: ${4 * 5}`);"),
          g("Complete o template literal para interpolar o nome do usuário na saudação:", ["${nome}"], "A interpolação em template strings usa a sintaxe ${identificador}.", "const nome = \"Leo\";\nconsole.log(`Bem-vindo, ____!`);"),
          o("Ordene a construção de uma mensagem dinâmica com template literal:", ["Declarar a variável base const produto = \"Caderno\"","Declarar a variável de preço const preco = 15","Montar a string formatada `Item: ${produto} - R$ ${preco}`","Exibir o texto completo no console do desenvolvedor"], "Template literals tornam a interpolação de múltiplas variáveis limpa e elegante."),
          p("Associe cada técnica de montagem de strings à sua respectiva sintaxe:", [["\"Ola, \" + nome + \"!\"","Concatenação tradicional com operador +"],["`Ola, ${nome}!`","Template literal moderno interpolado com crases"],["\"Linha 1\\nLinha 2\"","Quebra de linha via caractere de escape manual"],["`Linha 1\nLinha 2`","Texto multilinha natural suportado por crases"]], "Template literals são o padrão moderno preferido para montar mensagens no frontend.")
        ]
      },
      {
        id: "js-c01-u4-l3",
        title: "Caracteres de escape em strings",
        subtitle: "Aprofundamento · Quebras de linha e símbolos especiais",
        theory: "A barra invertida (\\) inicia sequências de escape em strings. A sequência \\n insere uma quebra de linha, \\t insere uma tabulação, \\\" permite usar aspas duplas dentro de strings de aspas duplas, e \\\\ insere uma barra invertida literal no texto.",
        questions: [
          q("Qual sequência de escape é usada para forçar uma quebra de linha dentro de uma string JavaScript?", "\\n", ["\\t","\\b"], "\\n representa o caractere de nova linha (line feed), dividindo a saída em linhas subsequentes."),
          q("Quantas linhas aparecem na saída ao executar console.log(\"Primeira\\nSegunda\")?", "Duas linhas: uma com \"Primeira\" e outra abaixo com \"Segunda\"", ["Uma única linha contendo a barra visível","Três linhas com espaço vazio no meio"], "A sequência \\n quebra o texto exatamente naquele ponto para a linha seguinte."),
          q("Como incluir uma aspa dupla dentro de uma string já delimitada por aspas duplas (\"...\")?", "Escapando a aspa com uma barra invertida: \"Ela disse: \\\"Bom dia\\\"\"", ["Duplicando a aspa: \"\"Bom dia\"\"","Usando ponto e vírgula antes da aspa"], "A barra invertida informa ao analisador sintático que a aspa é caractere de conteúdo e não o fechamento da string."),
          q("Para exibir no console o caminho de arquivo C:\\projeto\\app, como devemos escrever a barra invertida na string?", "Duplicando cada barra: \"C:\\\\projeto\\\\app\"", ["Usando uma barra simples: \"C:\\projeto\\app\"","Usando asteriscos: \"C:*projeto*app\""], "Como a barra é o caractere de escape, para representar uma barra literal precisamos escrever \\\\."),
          t("Qual sequência de escape insere uma tabulação horizontal para alinhamento em colunas?", ["\\t"], "\\t avança o cursor até a próxima parada de tabulação.", "console.log(\"Item\\tPreco\");"),
          g("Complete a sequência de escape para exibir aspas duplas dentro de aspas duplas:", ["\\\""], "A barra invertida impede que a aspa seja interpretada como encerramento da string.", "console.log(\"Codigo: ____L12____\");"),
          o("Ordene os caracteres de escape pela sua finalidade descrita:", ["\\n: Quebra de linha vertical","\\t: Espaçamento de tabulação horizontal","\\\": Inclusão de aspa dupla literal","\\\\: Inclusão de barra invertida literal"], "Dominar escapes evita erros sintáticos ao manipular textos formatados ou caminhos de arquivos."),
          p("Associe cada sequência de escape ao seu efeito visual na impressão:", [["\\n","Passa o texto seguinte para uma nova linha"],["\\t","Insere um recuo de tabulação horizontal"],["\\'","Permite aspa simples dentro de delimitador de aspa simples"],["\\\\","Produz uma única barra invertida visível no texto"]], "As sequências de escape padronizam caracteres de controle em todas as linguagens da família C.")
        ]
      },
      {
        id: "js-c01-u4-l4",
        title: "Formatando saídas com números e arredondamento",
        subtitle: "Aplicação · Casas decimais com toFixed",
        theory: "Cálculos com pontos flutuantes em JavaScript podem gerar dízimas como 0.1 + 0.2 = 0.30000000000000004. O método preco.toFixed(2) formata o número com a quantidade de casas decimais desejada, arredondando o valor e devolvendo uma string pronta para exibição.",
        questions: [
          q("O que o método (19.9).toFixed(2) retorna em JavaScript?", "\"19.90\" como string formatada com duas casas decimais", ["19.90 como valor numérico","20 como número inteiro arredondado"], "toFixed fixa as casas decimais preenchendo com zeros à direita e devolve o resultado como string."),
          q("Por que a expressão 0.1 + 0.2 resulta em 0.30000000000000004 em JavaScript?", "Devido à representação binária de números de ponto flutuante no padrão IEEE 754 compartilhado por quase todas as linguagens", ["Porque o JavaScript foi programado com erro de matemática intencional","Porque o console adiciona dígitos aleatórios por segurança"], "Frações decimais não exatas em binário geram pequenas imprecisões no padrão IEEE 754."),
          q("Qual é o tipo de retorno de numero.toFixed(casas)?", "string", ["number","boolean"], "toFixed destina-se à formatação para exibição humana, retornando sempre uma string."),
          q("Como formatar o valor 5.6789 com apenas uma casa decimal arredondada?", "(5.6789).toFixed(1) que resulta em \"5.7\"", ["(5.6789).toFixed(0)","Math.floor(5.6789)"], "toFixed(1) arredonda a primeira casa decimal com base no dígito subsequente (7 >= 5), produzindo \"5.7\"."),
          t("Qual texto a chamada (12.3456).toFixed(2) produz? Digite exatamente o retorno com aspas ou sem aspas.", ["12.35"], "A terceira casa decimal (5) faz a segunda casa (4) arredondar para cima (5), resultando em \"12.35\".", "console.log((12.3456).toFixed(2));"),
          g("Complete o método para formatar a taxa com três casas decimais:", ["toFixed"], "toFixed recebe como argumento o número inteiro de dígitos após a vírgula/ponto.", "const taxa = 0.12345;\nconsole.log(taxa.____(3));"),
          o("Ordene os passos para calcular um total monetário e exibi-lo formatado em reais:", ["Calcular o subtotal numérico multiplicando quantidade pelo preço unitário","Aplicar taxa ou desconto com operações numéricas regulares","Formatar o número final com total.toFixed(2) obtendo texto de duas casas","Interpolar na mensagem `Total a pagar: R$ ${total.toFixed(2)}`"], "Operar matematicamente com números e só formatar no momento final de exibição é a melhor prática contábil."),
          p("Associe o método de manipulação numérica ao seu comportamento:", [["n.toFixed(2)","Formata com duas casas decimais e devolve string"],["Math.round(n)","Arredonda para o inteiro mais próximo"],["Math.floor(n)","Arredonda para baixo descartando decimais"],["Number(\"19.90\")","Converte a string formatada de volta para número puro"]], "Combinar formatação e matemática evita perda prematura de precisão em cálculos.")
        ]
      },
      {
        id: "js-c01-u4-l5",
        title: "Revisão e desafio de saídas formatadas",
        subtitle: "Revisão e desafio · Mensagens profissionais no console",
        theory: "Dominar saídas formatadas une literais consistentes, template strings elegantes, caracteres de escape para quebras de linha e formatação numérica com toFixed(). Essa base garante que qualquer relatório, mensagem ou diagnóstico de sistema seja claro e profissional.",
        questions: [
          q("Qual expressão monta a linha \"Item: Caderno | R$ 12.50\" com interpolação e duas casas decimais?", "`Item: ${item} | R$ ${preco.toFixed(2)}`", ["\"Item: \" + item + \" | R$ \" + preco","`Item: item | R$ preco`"], "Template literal com crases e preco.toFixed(2) combina legibilidade com formatação precisa."),
          q("O que é impresso por console.log(`A\\nB\\nC`) no console?", "As letras A, B e C cada uma em sua própria linha", ["A\\nB\\nC em uma única linha","Um triângulo de alerta"], "As sequências de escape \\n continuam ativas dentro de template literals, quebrando linhas sucessivas."),
          q("Qual é a saída de console.log(\"Total: \" + 10 + 20) versus console.log(\"Total: \" + (10 + 20))?", "O primeiro produz \"Total: 1020\" por concatenação sequencial; o segundo calcula parênteses e produz \"Total: 30\"", ["Ambos produzem \"Total: 30\"","Ambos produzem \"Total: 1020\""], "Sem parênteses, a concatenação com texto contamina a soma seguinte; parênteses forçam a adição numérica prioritária."),
          q("Se o usuário digitou \" 45.6 \" com espaços, como limpá-lo e formatá-lo com uma casa decimal?", "Number(entrada.trim()).toFixed(1) resultando em \"45.6\"", ["entrada.toLowerCase()","entrada.toFixed()"], "trim() remove espaços externos, Number() converte para ponto flutuante e toFixed(1) formata as casas."),
          t("Qual texto a avaliação de `Status: ${true ? \"OK\" : \"ERRO\"}` produz no console?", ["Status: OK"], "O operador ternário dentro de ${} avalia a condição verdadeira e entrega a string \"OK\".", "console.log(`Status: ${true ? \"OK\" : \"ERRO\"}`);"),
          g("Complete o template literal que exibe o total com parênteses forçando a adição:", ["(a + b)"], "Parênteses garantem a precedência da soma antes da conversão para texto.", "console.log(`Soma: ${____}`);"),
          o("Ordene a construção de um recibo de compra profissional exibido em linha única:", ["Definir cliente = \"Lia\", itens = 3 e total = 49.9","Formatar o preço com total.toFixed(2)","Interpolar tudo com crases em `Cliente: ${cliente} | ${itens} itens | R$ ${total.toFixed(2)}`","Emitir a linha final com console.log()"], "Essa composição consolida todos os tópicos de formatação aprendidos no capítulo."),
          p("Associe o recurso de string ao seu benefício principal em saídas:", [["Crases com ${}","Interpolação direta sem emaranhado de operadores +"],["Sequência \\n","Divisão em múltiplas linhas sem múltiplas chamadas console"],["Método toFixed(2)","Padronização de valores monetários com duas casas"],["Parênteses em (x + y)","Garantia de cálculo aritmético antes de concatenar"]], "Dominar esses quatro recursos assegura clareza em todas as saídas de texto e console.")
        ]
      }
    ]
  });
})();
