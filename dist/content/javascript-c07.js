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
  const chId = "javascript-c07";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "javascript-c07-u1-l2-query-selector",
        title: "Seletores modernos com querySelector e querySelectorAll",
        subtitle: "DOM · Seleção precisa de nós usando sintaxe completa de seletores CSS",
        theory: "Os métodos querySelector e querySelectorAll revolucionaram o acesso ao DOM ao permitir qualquer seletor CSS válido. O querySelector retorna o primeiro nó correspondente ou null, enquanto o querySelectorAll retorna uma NodeList estática contendo todas as ocorrências encontradas no momento da consulta.",
        questions: [
          q("O que o método document.querySelector(\"#app .item\") retorna quando múltiplos elementos satisfazem a busca?", "Apenas a primeira ocorrência compatível encontrada na ordem da árvore do documento", ["Uma lista com todos os nós encontrados","Sempre o último elemento da página"], "querySelector encerra a busca imediatamente ao encontrar o primeiro elemento correspondente.", "const el = document.querySelector(\"#app .item\");"),
          q("Qual é o valor retornado por document.querySelector quando nenhum elemento satisfaz o seletor informado?", "O valor primitivo null", ["O valor undefined","Uma lista vazia []"], "null indica explicitamente que nenhum nó foi localizado na árvore com o seletor fornecido.", "const item = document.querySelector(\".inexistente\");"),
          q("Que tipo de objeto é retornado pela chamada document.querySelectorAll(\".card\")?", "Uma NodeList estática contendo os nós capturados no momento exato da execução", ["Um Array JavaScript puro com push e pop","Uma HTMLCollection viva atualizada em tempo real"], "Uma NodeList retornada por querySelectorAll não reflete adições ou remoções posteriores no DOM."),
          q("Como iterar diretamente sobre os elementos de uma NodeList em navegadores modernos?", "Utilizando o método forEach nativo suportado diretamente por instâncias de NodeList", ["Apenas através de laços while legados","Convertendo obrigatoriamente para string"], "NodeList implementa forEach nativamente na especificação moderna do DOM."),
          t("Qual seletor CSS seleciona um botão que possui o atributo data-action=\"salvar\"?", ["button[data-action=\"salvar\"]","button[data-action='salvar']","[data-action=\"salvar\"]"], "Seletores de atributos filtram nós por atributos personalizados.", "/* Seletor CSS para botão salvar */"),
          g("Complete o código para selecionar o elemento com id \"painel\":", ["#painel"], "O prefixo cerquilha (#) representa o seletor de ID em CSS.", "const painel = document.querySelector(\"____\");"),
          o("Ordene o fluxo de busca e captura de elementos via querySelectorAll:", ["Analisar a string do seletor CSS fornecido como argumento","Percorrer a árvore DOM em profundidade a partir do nó raiz","Coletar todos os elementos coincidentes no momento da consulta","Empacotar as referências em uma NodeList estática e imutável"], "Sequência de avaliação executada pela API de seletores do navegador."),
          p("Associe a chamada de seleção ao respectivo tipo de retorno obtido:", [["document.querySelector(\".ativo\")","Primeiro Element compatível ou null se ausente"],["document.querySelectorAll(\".ativo\")","NodeList estática contendo todas as correspondências"],["elemento.querySelector(\"span\")","Busca restrita aos descendentes do elemento contextual"],["document.querySelector(\"#404\")","Retorno null por seletor inexistente no documento"]], "Diferenças de retorno e escopo em consultas modernas no DOM.")
        ]
      },
      {
        id: "javascript-c07-u1-l3-seletores-legados",
        title: "Métodos clássicos versus seletores modernos",
        subtitle: "Performance · Comparando getElementById e seletores CSS estruturados",
        theory: "Antes de querySelector, o DOM fornecia métodos dedicados como getElementById e getElementsByClassName. Métodos clássicos por ID possuem altíssima performance por consultar tabelas hash internas do navegador, mas os seletores modernos oferecem expressividade e unificação incomparáveis com sintaxe CSS.",
        questions: [
          q("Por que getElementById(\"btn\") é tradicionalmente mais rápido que querySelector(\"#btn\")?", "Porque consulta diretamente uma tabela de hash de IDs mantida pelo navegador sem parse de CSS", ["Porque roda em uma thread secundária","Porque não acessa a memória RAM"], "A busca direta por ID evita o custo de interpretar a sintaxe de seletores CSS."),
          q("O que o método getElementsByTagName(\"div\") retorna como estrutura de dados?", "Uma HTMLCollection dinâmica que se atualiza automaticamente com mutações no DOM", ["Uma NodeList estática congelada","Um array comum clonado"], "Coleções de getElementsByTagName são vivas e recalculadas quando nós são adicionados ou removidos."),
          q("Qual argumento deve ser passado para document.getElementById?", "Apenas o nome puro do identificador sem qualquer caractere cerquilha (#)", ["O seletor completo com #","Uma expressão regular"], "getElementById recebe exclusivamente o valor literal do atributo id.", "const el = document.getElementById(\"cabecalho\");"),
          q("Qual método legado busca elementos pela classe CSS sem parse de expressões complexas?", "document.getElementsByClassName(\"destaque\")", ["document.findClass(\"destaque\")","document.selectByClass(\"destaque\")"], "getElementsByClassName aceita nomes de classes separados por espaço e retorna HTMLCollection viva."),
          t("Qual método nativo busca um elemento único especificamente pelo valor do atributo id?", ["getElementById","document.getElementById"], "getElementById é o seletor clássico de altíssimo desempenho por identificador único.", "// busca direta por ID"),
          g("Complete o método clássico para obter elementos com a tag parágrafo:", ["getElementsByTagName"], "getElementsByTagName retorna uma coleção viva de elementos pelo nome da tag.", "const paragrafos = document.____(\"p\");"),
          o("Ordene os seletores do mais restrito/rápido para o seletor mais flexível:", ["document.getElementById(\"alfa\")","document.getElementsByClassName(\"beta\")","document.getElementsByTagName(\"section\")","document.querySelector(\"div.beta > section[data-role]\")"], "Escalada de complexidade de resolução de seletores pelo motor do navegador."),
          p("Associe o método ao seu comportamento de captura:", [["getElementById","Busca elemento único por ID direto sem parsing de regras CSS"],["getElementsByClassName","Retorna HTMLCollection viva de nós que compartilham classes"],["querySelector","Retorna o primeiro elemento que casa com qualquer regra CSS"],["querySelectorAll","Retorna NodeList com todos os nós casados no momento da chamada"]], "Mapeamento entre métodos clássicos e modernos de busca no DOM.")
        ]
      },
      {
        id: "javascript-c07-u1-l4-closest-matches",
        title: "Navegação contextual com closest e matches",
        subtitle: "Hierarquia · Verificando regras CSS e subindo na árvore de ancestrais",
        theory: "O método el.matches(seletor) verifica se o elemento satisfaz uma regra CSS, retornando booleano. Já el.closest(seletor) sobe na hierarquia de nós a partir do elemento atual, retornando o ancestral mais próximo (ou o próprio elemento) compatível com a regra, simplificando manipulações contextuais.",
        questions: [
          q("O que elemento.matches(\".ativo\") avalia e retorna?", "Retorna true se o elemento possuir a classe ativo ou false caso contrário", ["Retorna os nós filhos do elemento","Retorna uma nova NodeList"], "matches testa se o elemento atual satisfaria o seletor CSS fornecido.", "if (el.matches(\".ativo\")) { ... }"),
          q("Qual é a direção de busca percorrida pelo método elemento.closest(\".card\")?", "Sobe em direção à raiz da árvore DOM inspecionando o elemento e seus ancestrais", ["Desce em profundidade nos elementos filhos","Varre apenas os irmãos laterais adjacentes"], "closest navega para cima na hierarquia de pais procurando a primeira correspondência."),
          q("O que acontece se o próprio elemento onde closest() foi chamado coincidir com o seletor?", "O método retorna a referência do próprio elemento imediatamente", ["Retorna null obrigatoriamente","Salta para o pai do elemento"], "closest inicia a verificação pelo elemento receptor antes de inspecionar seus pais."),
          q("O que elemento.closest(\"article\") retorna quando nenhum ancestral satisfaz o seletor?", "Retorna o valor primitivo null", ["Retorna o elemento documentElement","Lança um erro de referência"], "A ausência de ancestrais coincidentes resulta em null."),
          t("Qual método booleano testa se um elemento satisfaz determinado seletor CSS?", ["matches","element.matches"], "matches verifica compatibilidade com seletores CSS sem alterar a árvore.", "// testa se atende ao seletor"),
          g("Complete o código para encontrar o elemento pai do tipo form mais próximo:", ["closest"], "closest localiza o ancestral coincidente mais próximo subindo na árvore.", "const formPai = botao.____(\"form\");"),
          o("Ordene os passos de resolução de botao.closest(\".card-item\"):", ["Avaliar se o próprio botao possui a classe .card-item","Caso negativo, acessar o nó parentNode imediatamente superior","Avaliar se parentNode satisfaz a regra .card-item","Repetir subida até encontrar o primeiro ancestral ou atingir a raiz null"], "Algoritmo de resolução ascendente do método closest no DOM."),
          p("Associe o método de consulta contextual ao seu objetivo:", [["elemento.matches(\"button.primario\")","Testa conformidade do nó com regra CSS retornando booleano"],["elemento.closest(\".modal\")","Encontra o ancestral mais próximo compatível subindo na árvore"],["elemento.contains(outroNo)","Verifica se outro nó é descendente direto ou indireto"],["elemento.parentElement","Retorna o nó pai imediato sem aplicar filtros de seletor"]], "Operações de consulta contextual e relação genealógica no DOM.")
        ]
      },
      {
        id: "javascript-c07-u1-l5-colecoes-estaticas-vivas",
        title: "Coleções estáticas versus coleções vivas no DOM",
        subtitle: "Mutações · Comportamento de NodeList e HTMLCollection durante inserções",
        theory: "Coleções no DOM dividem-se entre vivas (live) e estáticas. getElementsByTagName retorna HTMLCollection viva, cujas mudanças no documento alteram seu tamanho e itens em tempo real. Já querySelectorAll produz uma NodeList estática, que congela a fotografia dos nós no momento da invocação inicial.",
        questions: [
          q("Qual risco existe ao iterar sobre uma HTMLCollection viva enquanto nós são removidos?", "O comprimento da coleção encolhe durante o loop podendo pular itens ou gerar loops infinitos", ["A memória do navegador é esgotada de imediato","Os nós removidos continuam visíveis"], "Mutações no DOM alteram a coleção em tempo real afetando índices e o valor de length."),
          q("Se um novo nó for inserido no DOM após a criação de uma NodeList com querySelectorAll, o que acontece com a lista?", "A NodeList permanece idêntica com o conteúdo original da captura inicial", ["O novo nó é inserido automaticamente na lista","A NodeList é invalidada"], "A NodeList gerada por querySelectorAll é estática e não rastreia alterações subsequentes."),
          q("Como converter de forma segura uma HTMLCollection ou NodeList em um Array padrão do JavaScript?", "Array.from(colecao) ou utilizando o operador spread [...colecao]", ["Invocando colecao.toArray()","Atribuindo colecao.length = 0"], "Array.from cria um array real permitindo map, filter e reduce sem vínculos com o DOM."),
          q("Qual propriedade de uma HTMLCollection reflete a quantidade atual de nós contidos nela?", "A propriedade length numérica", ["A propriedade size","O método count()"], "Tanto HTMLCollection quanto NodeList expõem a propriedade length."),
          t("Qual método estático de Array converte coleções iteráveis em arrays genuínos?", ["Array.from","from"], "Array.from cria uma nova instância de Array a partir de qualquer iterável.", "// converte coleção em array"),
          g("Complete o código convertendo a coleção de itens em array nativo via spread:", ["...itens"], "O operador spread desempacota os elementos da coleção em um array.", "const listaArray = [____];"),
          o("Ordene o comportamento de mutação ao adicionar um elemento filho no DOM:", ["Criar e anexar um novo elemento filho ao contêiner","Notificar internamente as coleções vivas HTMLCollection ativas","Atualizar automaticamente o atributo length da HTMLCollection","Preservar inalterada a quantidade de nós em NodeLists estáticas já obtidas"], "Diferenciação operacional entre coleções vivas e estáticas após mutação."),
          p("Associe a estrutura ao seu comportamento em relação a mutações no DOM:", [["HTMLCollection viva","Atualiza automaticamente quando nós são adicionados ou excluídos"],["NodeList estática","Preserva exatamente o conjunto de nós capturado na consulta inicial"],["Array.from(colecao)","Desconecta os nós da lista original criando array tradicional"],["colecao.length","Reflete o total presente na coleção naquele instante"]], "Comparativo de sincronização entre listas e o documento DOM.")
        ]
      }
    ],
    2: [
      {
        id: "javascript-c07-u2-l1-texto-inner-content",
        title: "Manipulação de texto: textContent versus innerText",
        subtitle: "Conteúdo · Diferenças entre texto bruto, renderizado e estilo CSS",
        theory: "textContent extrai ou define o conteúdo textual de todos os elementos sem interpretar HTML nem depender de layout CSS, sendo extremamente rápido. Em contraste, innerText respeita a renderização visual e estilos (como display: none), acionando recálculos de layout computados (reflow) mais pesados.",
        questions: [
          q("Qual propriedade lê todo o texto bruto de um elemento mesmo que esteja oculto por CSS com display: none?", "elemento.textContent", ["elemento.innerText","elemento.outerText"], "textContent não depende de regras de estilo ou motor de renderização."),
          q("Por que a leitura repetida de innerText dentro de laços pode degradar a performance?", "Porque força o navegador a recalcular estilos e layout (layout thrashing / reflow)", ["Porque faz requisições HTTP adicionais","Porque congela a thread do Garbage Collector"], "innerText precisa saber o que é visível na tela, disparando recálculo geométrico."),
          q("O que acontece ao atribuir el.textContent = \"<b>Olá</b>\"?", "A string \"<b>Olá</b>\" é inserida como texto puro escapado na tela sem renderizar negrito", ["O texto \"Olá\" fica em negrito","O navegador remove a tag b"], "textContent nunca interpreta strings como código HTML, impedindo injeções indesejadas."),
          q("Como innerText lida com quebras de linha e espaçamentos em comparação a textContent?", "innerText normaliza quebras de linha baseando-se em tags visíveis como <p> e <br>", ["textContent descarta todas as quebras","Ambos produzem sempre saídas idênticas"], "innerText imita a aparência do texto copiado pelo usuário na área de transferência."),
          t("Qual propriedade de elemento define conteúdo textual puro com máxima performance e segurança?", ["textContent"], "textContent é a propriedade padrão para inserção de texto seguro no DOM.", "// texto puro seguro"),
          g("Complete o código para definir o texto do título sem interpretar HTML:", ["textContent"], "textContent insere texto seguro sem risco de injeção de tags.", "titulo.____ = \"Bem-vindo ao portal\";"),
          o("Ordene o processamento ao atribuir valor à propriedade textContent:", ["Receber a nova string fornecida pelo desenvolvedor","Remover todos os nós filhos existentes no elemento de destino","Criar um único nó de texto (TextNode) contendo a string","Anexar o nó de texto como o novo conteúdo exclusivo do elemento"], "Fluxo simplificado de substituição de conteúdo via textContent."),
          p("Associe a propriedade ao seu comportamento de texto:", [["textContent","Texto puro de todos os nós sem interpretar HTML e sem forçar reflow"],["innerText","Texto visível renderizado respeitando estilos CSS e quebras visuais"],["innerHTML","Interpreta a string como marcação HTML convertendo em nós do DOM"],["outerHTML","Substitui o próprio elemento e seus filhos pelo HTML fornecido"]], "Comparativo de propriedades de conteúdo textual e estrutural.")
        ]
      },
      {
        id: "javascript-c07-u2-l2-seguranca-xss",
        title: "Prevenção de XSS e manipulação segura de strings",
        subtitle: "Segurança · Riscos do innerHTML e estratégias de inserção sanitizada",
        theory: "Inserir dados fornecidos pelo usuário diretamente via innerHTML abre brechas críticas de Cross-Site Scripting (XSS). Ataques podem injetar scripts através de tags img com onerror ou links maliciosos. A regra básica de defesa é sempre preferir textContent ou criar elementos estruturados na memória.",
        questions: [
          q("Qual vulnerabilidade crítica de segurança é introduzida ao concatenar dados de usuários em innerHTML?", "Cross-Site Scripting (XSS), permitindo execução de código JavaScript não autorizado", ["Injeção de dependência cíclica","Buffer Overflow no interpretador V8"], "Dados não sanitizados inseridos em innerHTML podem disparar vetores de ataque maliciosos."),
          q("Embora navegadores bloqueiem scripts inline <script> inseridos por innerHTML, como atacantes contornam isso?", "Utilizando elementos com manipuladores de erro embutidos como <img src=x onerror=alert(1)>", ["Usando apenas folhas de estilo CSS","Inserindo comentários HTML"], "Eventos inline em elementos de mídia executam JavaScript assim que a carga da imagem falha."),
          q("Qual é a maneira mais segura de exibir um comentário enviado por usuário no DOM?", "Atribuir a mensagem à propriedade textContent de um elemento recém-criado", ["Usar eval() para validar o texto","Inserir com innerHTML após remover a tag script"], "textContent trata qualquer conteúdo como texto plano, neutralizando caracteres especiais como < e >."),
          q("Quando o uso de HTML dinâmico é inevitável, qual prática deve ser adotada antes da inserção?", "Sanitizar a string utilizando bibliotecas consagradas de higienização como DOMPurify", ["Apenas verificar se a string termina com ponto","Executar escape() obsoleto"], "Bibliotecas de sanitização removem atributos perigosos e tags proibidas mantendo formatação segura."),
          t("Qual propriedade de nó NUNCA interpreta tags HTML e neutraliza ataques XSS em texto?", ["textContent"], "textContent converte qualquer caractere especial em texto plano.", "// insere texto sem parsing HTML"),
          g("Complete o código seguro para exibir o nome do usuário sem vulnerabilidade XSS:", ["textContent"], "Usar textContent impede que o nome do usuário seja interpretado como código.", "mensagemUsuario.____ = entradaDoCliente;"),
          o("Ordene as etapas defensivas ao renderizar conteúdo de terceiros na interface:", ["Receber o dado bruto originado da entrada do usuário ou API externa","Determinar se a renderização exige formatação rica ou apenas texto simples","Se for texto simples, atribuir diretamente através de textContent","Se for HTML rico, submeter a string a um sanitizador rigoroso antes da inserção"], "Pipeline seguro de tratamento e exibição de dados dinâmicos na interface."),
          p("Associe a técnica de exibição ao respectivo nível de segurança:", [["elemento.textContent = dado","Totalmente imune a injeção de HTML e ataques XSS"],["elemento.innerHTML = dadoBruto","Altamente vulnerável a execução maliciosa se não higienizado"],["DOMPurify.sanitize(html)","Limpeza robusta de tags perigosas e eventos inline maliciosos"],["document.createElement + append","Construção estruturada e controlada de nós no DOM"]], "Relação entre técnicas de manipulação e segurança de interface.")
        ]
      },
      {
        id: "javascript-c07-u2-l3-atributos-nativos",
        title: "Manipulação de atributos com getAttribute e setAttribute",
        subtitle: "Atributos · Leitura, escrita e remoção de atributos no DOM",
        theory: "A API de atributos permite manipular qualquer atributo HTML de forma declarativa. Métodos como getAttribute, setAttribute, hasAttribute e removeAttribute operam diretamente sobre os atributos da tag no documento, permitindo sincronizar estados visuais e configurações de elementos interativos.",
        questions: [
          q("Qual método verifica se um elemento possui determinado atributo sem precisar ler seu valor?", "elemento.hasAttribute(\"disabled\")", ["elemento.checkAttribute(\"disabled\")","elemento.isAttributePresent(\"disabled\")"], "hasAttribute retorna um booleano simples indicando a presença do atributo."),
          q("O que a chamada elemento.setAttribute(\"role\", \"button\") faz?", "Define ou substitui o atributo role com o valor string \"button\"", ["Cria um botão dentro do elemento","Remove o atributo role"], "setAttribute cria o atributo caso não exista ou atualiza seu valor atual."),
          q("Qual método é utilizado para remover completamente um atributo de um nó do DOM?", "elemento.removeAttribute(\"readonly\")", ["elemento.deleteAttribute(\"readonly\")","elemento.setAttribute(\"readonly\", null)"], "removeAttribute descarta o atributo da definição da tag HTML."),
          q("O que elemento.getAttribute(\"href\") retorna quando o elemento não possui o atributo href?", "O valor primitivo null", ["Uma string vazia \"\"","O valor undefined"], "getAttribute retorna null quando o atributo consultado inexiste no nó."),
          t("Qual método remove completamente um atributo especificado de um nó HTML?", ["removeAttribute"], "removeAttribute elimina o atributo da marcação do elemento.", "// remove o atributo"),
          g("Complete o código para verificar se a imagem possui o atributo de acessibilidade alt:", ["hasAttribute"], "hasAttribute confirma a existência do atributo na tag.", "if (!imagem.____(\"alt\")) {\n    console.warn(\"Falta alt na imagem\");\n}"),
          o("Ordene os passos para alterar o estado de um elemento via atributos:", ["Localizar a referência do elemento alvo no DOM","Verificar se o atributo desejado já existe com hasAttribute","Atualizar ou registrar o novo valor utilizando setAttribute","Confirmar a mutação através de getAttribute caso necessário"], "Ciclo de verificação e aplicação de atributos em nós HTML."),
          p("Associe a operação com atributos ao método correspondente:", [["elemento.getAttribute(\"id\")","Lê o valor textual do atributo ou retorna null"],["elemento.setAttribute(\"tabindex\", \"0\")","Grava ou substitui o valor do atributo informado"],["elemento.hasAttribute(\"hidden\")","Retorna booleano informando se o atributo existe"],["elemento.removeAttribute(\"title\")","Elimina completamente o atributo do elemento"]], "Quatro operações fundamentais da API de atributos do DOM.")
        ]
      },
      {
        id: "javascript-c07-u2-l4-propriedades-vs-atributos",
        title: "Propriedades de objeto versus atributos HTML",
        subtitle: "Sincronização · Diferença entre estado dinâmico e valor inicial no DOM",
        theory: "Atributos residem na marcação HTML inicial (DOM estático), enquanto propriedades pertencem ao objeto JavaScript do nó no DOM vivo. Por exemplo, alterar a propriedade input.value atualiza o texto digitado pelo usuário, mas o atributo getAttribute(\"value\") preserva o valor default inicial da tag.",
        questions: [
          q("O que acontece com input.value e input.getAttribute(\"value\") quando o usuário digita no campo?", "input.value reflete o texto digitado atual, enquanto getAttribute(\"value\") preserva o valor inicial do HTML", ["Ambos atualizam instantaneamente para o mesmo valor","input.value permanece inalterado"], "O atributo value define o defaultValue; a propriedade value armazena o estado dinâmico atual."),
          q("Qual a diferença entre a propriedade checkbox.checked e o atributo checkbox.getAttribute(\"checked\")?", "A propriedade é um booleano dinâmico (true/false); o atributo é a presença da palavra \"checked\" na marcação", ["Não existe diferença prática","O atributo só aceita valores numéricos"], "Propriedades booleanas refletem o estado real de interação no JavaScript."),
          q("O que a propriedade link.href retorna em comparação a link.getAttribute(\"href\")?", "A propriedade href retorna a URL absoluta resolvida; getAttribute retorna exatamente o texto escrito no HTML", ["A propriedade retorna null","Ambos retornam URLs relativas"], "O navegador resolve caminhos relativos ao consultar a propriedade de objeto."),
          q("Como resetar o valor visível de um campo de texto no formulário via JavaScript?", "Atribuindo uma string vazia diretamente à propriedade input.value = \"\"", ["Invocando input.removeAttribute(\"value\")","Deletando a variável input"], "Manipular a propriedade altera diretamente o estado computado em tempo de execução."),
          t("Qual propriedade de nó de entrada reflete o texto em tempo real digitado pelo usuário?", ["value"], "input.value armazena o valor atual digitado pelo usuário no elemento.", "// estado em tempo real"),
          g("Complete o código para marcar o checkbox como ativo via propriedade booleana:", ["checked"], "A propriedade booleana checked controla a seleção do checkbox.", "checkboxTermos.____ = true;"),
          o("Ordene o fluxo de dados entre marcação inicial e estado de interação:", ["Renderizar HTML com input value=\"inicio\" no navegador","Inicializar propriedade value com \"inicio\" e defaultValue com \"inicio\"","Usuário digita \"fim\" no campo modificando a propriedade value para \"fim\"","Inspecionar getAttribute(\"value\") que continua retornando a string \"inicio\""], "Divergência entre atributos da marcação e propriedades vivas em inputs."),
          p("Associe a consulta ao tipo de valor retornado:", [["input.value","String do estado atual digitado em tempo de execução"],["input.getAttribute(\"value\")","String do valor inicial definido na marcação HTML original"],["input.checked","Booleano indicando se o checkbox está marcado no momento"],["ancora.href","URL absoluta resolvida pelo navegador incluindo protocolo e host"]], "Distinção de resolução entre propriedades de objeto e atributos HTML.")
        ]
      },
      {
        id: "javascript-c07-u2-l5-dataset-atributos-customizados",
        title: "Armazenamento de dados customizados com dataset",
        subtitle: "Metadados · Vinculando dados semânticos em atributos data-* no HTML",
        theory: "Atributos prefixados com data-* permitem acoplar dados arbitrários aos elementos HTML de forma válida perante o W3C. O JavaScript acessa esses metadados através da propriedade el.dataset, que converte automaticamente os nomes com hífens (kebab-case) em nomes no formato camelCase.",
        questions: [
          q("Como o atributo data-user-id=\"42\" é acessado em JavaScript através da propriedade dataset?", "elemento.dataset.userId", ["elemento.dataset[\"data-user-id\"] apenas","elemento.dataset.user_id"], "dataset realiza a conversão automática de kebab-case para camelCase."),
          q("Que tipo de dado é sempre retornado pelas propriedades do objeto dataset?", "Sempre strings de texto, exigindo conversão explícita para números ou booleanos caso necessário", ["Tipos tipados automaticamente (Number, Boolean)","Objetos JSON serializados"], "Atributos HTML são essencialmente textuais no modelo do DOM."),
          q("Como registrar um novo atributo data-status=\"pendente\" em um nó usando dataset?", "Atribuindo diretamente: elemento.dataset.status = \"pendente\"", ["Invocando elemento.dataset.set(\"status\", \"pendente\")","Criando um novo objeto dataset"], "dataset é um objeto vivo que reflete escritas de volta aos atributos da tag."),
          q("Como remover completamente um atributo data-prioridade de um nó utilizando dataset?", "Utilizando o operador delete: delete elemento.dataset.prioridade", ["Atribuindo elemento.dataset.prioridade = null","Chamando dataset.remove()"], "O operador delete em propriedades de dataset remove o atributo correspondente no HTML."),
          t("Qual propriedade de elemento expõe todos os atributos data-* como objeto de fácil acesso?", ["dataset"], "dataset é a interface nativa para manipulação de metadados data-* no DOM.", "// metadados customizados"),
          g("Complete o código para ler o atributo data-codigo-produto usando camelCase:", ["codigoProduto"], "Hífens no HTML viram letras maiúsculas no objeto dataset.", "const codigo = botaoItem.dataset.____;"),
          o("Ordene a transformação de nomenclatura ao ler atributos data-*:", ["Declarar atributo data-tempo-estimado no elemento HTML","Navegador remove o prefixo data- ao povoar o objeto dataset","Navegador converte hífens e coloca letras seguintes em maiúsculo (camelCase)","Desenvolvedor acessa elemento.dataset.tempoEstimado no script"], "Regra de conversão sintática entre HTML data-* e JavaScript dataset."),
          p("Associe o atributo HTML à sua respectiva propriedade no dataset:", [["data-id=\"10\"","elemento.dataset.id"],["data-total-pontos=\"50\"","elemento.dataset.totalPontos"],["data-item-ativo=\"true\"","elemento.dataset.itemAtivo"],["data-api-endpoint=\"/v1\"","elemento.dataset.apiEndpoint"]], "Conversão automática de atributos data-* para propriedades camelCase.")
        ]
      }
    ],
    3: [
      {
        id: "javascript-c07-u3-l1-create-element",
        title: "Criação de nós na memória com createElement",
        subtitle: "Instanciação · Construindo elementos fora da árvore principal do DOM",
        theory: "document.createElement(\"tag\") instancia um novo elemento HTML completamente na memória, desvinculado da árvore do documento. Enquanto o nó não for anexado a um elemento visível, alterações em suas propriedades e filhos não disparam recalculo de layout (reflow), garantindo máxima eficiência.",
        questions: [
          q("Em que estado um nó recém-criado com document.createElement se encontra inicialmente?", "Existe apenas na memória JavaScript, desconectado da árvore de nós visível da página", ["Já é visível imediatamente no fim do body","Fica congelado até ser aprovado"], "O nó só passa a fazer parte da página quando anexado a um elemento conectado no DOM."),
          q("O que acontece se passarmos um nome de tag desconhecido para document.createElement(\"custom-box\")?", "O navegador cria uma instância genérica de HTMLUnknownElement ou HTMLElement customizado", ["O método lança uma exceção fatal","Retorna o valor null"], "O DOM permite criar elementos com nomes customizados válidos para Web Components."),
          q("Como criar um nó de texto puro na memória sem gerar uma tag HTML envoltória?", "Utilizando o método document.createTextNode(\"meu texto\")", ["Invocando document.createText()","Criando uma string solta"], "createTextNode cria uma instância de TextNode autêntica no DOM."),
          q("Qual a vantagem de configurar classes, atributos e conteúdo em um elemento antes de anexá-lo ao DOM?", "Evita múltiplos disparos de renderização e recálculo de estilo (reflow) a cada modificação", ["Garante que o elemento receba tipagem estática","Impede vazamento de memória"], "Configurar o elemento na memória é computacionalmente muito mais leve que alterar nós na tela."),
          t("Qual método do objeto document instancia um novo elemento HTML na memória?", ["createElement"], "createElement cria elementos na memória desvinculados da árvore.", "// instanciação de novo elemento"),
          g("Complete o código criando um elemento de parágrafo na memória:", ["createElement"], "createElement recebe o nome da tag desejada.", "const novoP = document.____(\"p\");"),
          o("Ordene as etapas corretas de criação e montagem de um nó antes da exibição:", ["Criar o elemento na memória com document.createElement","Configurar classes e atributos através de classList e setAttribute","Definir o conteúdo textual seguro com a propriedade textContent","Anexar o nó devidamente montado ao contêiner pai na página"], "Boas práticas de montagem de nós na memória para minimizar reflows."),
          p("Associe o método de criação à estrutura gerada:", [["document.createElement(\"div\")","Cria novo nó de elemento HTML na memória"],["document.createTextNode(\"Olá\")","Cria novo nó de texto puro sem tag envoltória"],["document.createDocumentFragment()","Cria contêiner transitório leve desprovido de nó pai"],["elemento.cloneNode(true)","Cria cópia profunda do elemento e de todos os seus descendentes"]], "APIs de instanciação e clonagem de nós no DOM.")
        ]
      },
      {
        id: "javascript-c07-u3-l2-insercao-append",
        title: "Inserção de nós no DOM: appendChild versus append",
        subtitle: "Hierarquia · Inserindo filhos no início, no fim e suportando múltiplos nós",
        theory: "O método clássico appendChild aceita apenas um único nó e o insere no final dos filhos. O método moderno append é muito mais versátil: aceita múltiplos nós de uma vez, aceita strings de texto diretamente (convertendo em nós de texto automaticamente) e não retorna nada, ao passo que prepend insere no topo.",
        questions: [
          q("Quais vantagens o método moderno elemento.append() oferece sobre o clássico appendChild()?", "Aceita múltiplos nós simultâneos e aceita strings diretamente sem necessidade de criar TextNode", ["appendChild é assíncrono","append funciona apenas em navegadores móveis"], "append modernizou a inserção de nós simplificando concatenações frequentes."),
          q("O que o método elemento.prepend(novoNo) faz em relação à ordem dos filhos?", "Insere o novo nó antes do primeiro elemento filho do contêiner", ["Insere após o último elemento filho","Substitui todos os filhos anteriores"], "prepend adiciona elementos no topo da lista de descendentes diretos."),
          q("Se um elemento já existente no DOM for passado para container.appendChild(elemento), o que ocorre?", "O elemento é movido da sua posição anterior para a nova posição sem ser duplicado", ["O elemento é clonado silenciosamente","O navegador lança um erro de hierarquia"], "Um nó do DOM só pode existir em uma única posição na árvore de nós."),
          q("Qual é o valor retornado pelo método appendChild() após a inserção?", "Retorna a referência do nó que acabou de ser anexado", ["Retorna true","Retorna undefined"], "appendChild retorna o próprio elemento inserido, útil para encadeamentos."),
          t("Qual método moderno insere nós ou strings no início da lista de filhos de um elemento?", ["prepend"], "prepend insere no início da hierarquia de filhos do elemento receptor.", "// inserção no início dos filhos"),
          g("Complete o código inserindo um título e um parágrafo simultaneamente com append:", ["append"], "append aceita múltiplos argumentos separados por vírgula.", "secao.____(titulo, paragrafo);"),
          o("Ordene a posição de elementos inseridos com prepend e append em uma lista inicialmente vazia:", ["Criar contêiner ul vazio na memória","Executar ul.append(itemB)","Executar ul.prepend(itemA)","Resultado final ordenado: itemA na primeira posição e itemB na segunda posição"], "Efeito combinado de inserções no início e no fim de uma lista."),
          p("Associe o método de inserção ao seu comportamento de posicionamento:", [["container.append(no1, no2)","Insere um ou mais nós/strings no final dos filhos"],["container.prepend(no)","Insere nó ou string antes do primeiro filho existente"],["container.appendChild(no)","Método clássico que insere nó no fim e retorna a referência"],["container.insertBefore(no, ref)","Insere novo nó imediatamente antes do nó de referência"]], "Métodos de anexação e posicionamento relativo de elementos.")
        ]
      },
      {
        id: "javascript-c07-u3-l3-document-fragment",
        title: "Otimização com DocumentFragment",
        subtitle: "Performance · Agrupando inserções em lote para evitar repinturas excessivas",
        theory: "Um DocumentFragment é um contêiner virtual extremamente leve que existe na memória e não possui nó pai. Ao adicionar dezenas de elementos a um fragmento e inseri-lo no DOM principal, apenas um único reflow é disparado na página, esvaziando o fragmento e transferindo todos os seus nós de uma vez.",
        questions: [
          q("Qual o principal benefício de usar DocumentFragment ao inserir 100 itens em uma lista?", "Dispara uma única operação de reflow e repintura no DOM em vez de 100 operações separadas", ["Reduz a complexidade de tempo de O(n) para O(1)","Impede que o Garbage Collector atue"], "Agrupar nós na memória antes de tocar o DOM vivo preserva o desempenho gráfico."),
          q("O que acontece com os nós contidos dentro de um DocumentFragment após ele ser anexado ao DOM?", "Todos os nós são transferidos para o contêiner de destino, deixando o fragmento vazio na memória", ["Os nós continuam duplicados no fragmento","O fragmento é destruído"], "O fragmento atua como envelope de transporte: entrega o conteúdo e fica vazio para reuso."),
          q("Como um novo fragmento de documento é instanciado em JavaScript?", "document.createDocumentFragment()", ["new DocumentFragment(document)","document.fragment()"], "createDocumentFragment é o método de fábrica nativo para essa estrutura."),
          q("Um DocumentFragment aparece na árvore final do documento inspecionada no DevTools?", "Não, o fragmento nunca faz parte do DOM; apenas os nós filhos contidos nele são inseridos", ["Sim, aparece como tag <fragment>","Aparece como comentário"], "O contêiner virtual é dissolvido no momento da anexação ao elemento pai."),
          t("Qual método cria um fragmento virtual leve para inserções em lote?", ["createDocumentFragment","document.createDocumentFragment"], "createDocumentFragment instancia o envelope de nós em memória.", "// criação de fragmento"),
          g("Complete o código criando o fragmento de lote:", ["createDocumentFragment"], "createDocumentFragment prepara o contêiner leve para as iterações.", "const fragmento = document.____();"),
          o("Ordene o fluxo eficiente de inserção em lote com DocumentFragment:", ["Criar o fragmento virtual com document.createDocumentFragment()","Iterar sobre a lista de dados criando nós com createElement","Anexar cada elemento filho ao fragmento em memória sem tocar a tela","Anexar o fragmento completo ao elemento pai disparando um único reflow"], "Padrão de renderização eficiente em lote com fragmentos virtuais."),
          p("Associe a ação com o comportamento do DocumentFragment:", [["document.createDocumentFragment()","Instancia o contêiner virtual leve na memória"],["fragmento.append(item)","Acumula nós na memória sem provocar recálculo visual"],["lista.append(fragmento)","Transfere todos os filhos de uma vez e esvazia o fragmento"],["fragmento.children.length","Mede a quantidade de nós acumulados aguardando inserção"]], "Operações essenciais no ciclo de vida de um DocumentFragment.")
        ]
      },
      {
        id: "javascript-c07-u3-l4-insert-adjacent",
        title: "Inserção precisa com insertAdjacentHTML e insertAdjacentElement",
        subtitle: "Posicionamento · Quatro posições cirúrgicas ao redor de elementos existentes",
        theory: "Os métodos insertAdjacentHTML e insertAdjacentElement oferecem controle posicional cirúrgico relativo a um elemento de referência. Eles aceitam quatro posições fixas: \"beforebegin\" (antes do elemento), \"afterbegin\" (primeiro filho), \"beforeend\" (último filho) e \"afterend\" (após o elemento).",
        questions: [
          q("Qual posição em insertAdjacentElement insere o novo nó como o primeiro filho do elemento?", "\"afterbegin\"", ["\"beforebegin\"","\"beforeend\""], "\"afterbegin\" posiciona o nó logo após a tag de abertura do elemento pai."),
          q("Qual posição em insertAdjacentHTML posiciona a marcação imediatamente após o fechamento do elemento?", "\"afterend\"", ["\"beforeend\"","\"afterbegin\""], "\"afterend\" posiciona o conteúdo fora do elemento, logo após seu encerramento."),
          q("Por que insertAdjacentHTML(\"beforeend\", markup) é superior a innerHTML += markup?", "Não destrói nem recria os elementos filhos já existentes, preservando seus listeners e estados", ["Porque é síncrono e innerHTML é assíncrono","Porque converte HTML em imagens"], "innerHTML += reconstrói todos os nós filhos do zero, perdendo event listeners anexados."),
          q("Qual é a diferença entre insertAdjacentHTML e insertAdjacentElement?", "insertAdjacentHTML recebe string com código HTML; insertAdjacentElement recebe uma instância de nó Element", ["insertAdjacentElement é obsoleto","insertAdjacentHTML cria iframes"], "Um opera sobre texto bruto e o outro sobre instâncias de nós pré-fabricadas na memória."),
          t("Qual string de posição insere o nó imediatamente antes da tag de abertura do elemento alvo?", ["beforebegin"], "beforebegin posiciona o novo elemento como irmão anterior ao nó de referência.", "// posição externa anterior"),
          g("Complete o código inserindo o elemento após o encerramento do bloco com posição cirúrgica:", ["afterend"], "afterend coloca o nó logo após a tag de fechamento do elemento.", "alvo.insertAdjacentElement(\"____\", novoAviso);"),
          o("Ordene as quatro posições de insertAdjacent relativas a uma tag <div>Conteudo</div>:", ["beforebegin (lado de fora, antes da abertura da div)","afterbegin (lado de dentro, logo antes do texto Conteudo)","beforeend (lado de dentro, logo após o texto Conteudo)","afterend (lado de fora, imediatamente após o fechamento da div)"], "Mapeamento espacial das quatro posições da API insertAdjacent."),
          p("Associe a constante posicional à sua localização física relativa ao elemento:", [["beforebegin","Antes da tag de abertura do elemento receptor (irmão anterior)"],["afterbegin","Primeiro elemento filho logo após a abertura da tag"],["beforeend","Último elemento filho logo antes do fechamento da tag"],["afterend","Depois da tag de fechamento do elemento receptor (irmão posterior)"]], "Quatro coordenadas posicionais de inserção adjacente no DOM.")
        ]
      },
      {
        id: "javascript-c07-u3-l5-remocao-substituicao",
        title: "Remoção e substituição de nós no DOM",
        subtitle: "Descarte · Métodos modernos remove() versus removeChild e replaceWith",
        theory: "O método moderno el.remove() permite que um elemento se autoexclua diretamente da árvore sem necessitar de referência ao seu elemento pai. Para substituições, el.replaceWith(novoNo) substitui o elemento atual de forma direta, enquanto o método clássico pai.removeChild(filho) requer acesso ao pai.",
        questions: [
          q("Qual a principal vantagem sintática de elemento.remove() sobre pai.removeChild(elemento)?", "O método remove() é chamado diretamente no próprio nó a ser excluído sem exigir acesso ao pai", ["remove() deleta o arquivo no servidor","removeChild só funciona em nós de texto"], "remove() simplificou o antigo padrão elemento.parentNode.removeChild(elemento)."),
          q("O que acontece com os event listeners de um nó removido com remove() se nenhuma variável o referenciar?", "O elemento e seus manipuladores tornam-se elegíveis para coleta pelo Garbage Collector", ["Os listeners continuam rodando em segundo plano","O navegador lança alerta de memória"], "A ausência de referências na memória permite a liberação automática dos recursos."),
          q("Qual método moderno substitui um elemento existente por um ou mais nós diretamente?", "elemento.replaceWith(novoElemento)", ["elemento.swapWith(novoElemento)","elemento.substitute(novoElemento)"], "replaceWith aceita instâncias de nós ou strings e remove o elemento substituído."),
          q("O que o método clássico pai.removeChild(filho) retorna após a exclusão?", "A referência do próprio nó filho que acabou de ser desacoplado da árvore", ["O valor true","O valor null"], "O retorno do filho removido permite reaproveitá-lo em outra posição da árvore."),
          t("Qual método moderno invocado diretamente no nó o descarta da árvore do DOM?", ["remove"], "remove() elimina o próprio elemento sem necessidade de navegar até o nó pai.", "// auto-remoção do nó"),
          g("Complete o código substituindo o elemento desatualizado pelo novo componente:", ["replaceWith"], "replaceWith realiza a troca direta de nós na árvore.", "cardAntigo.____(cardNovo);"),
          o("Ordene o processo de limpeza e liberação de nós descartados:", ["Localizar a referência do elemento a ser excluído na página","Invocar elemento.remove() para desanexá-lo da árvore viva","Anular variáveis locais que ainda sustentem referências ao nó removido","Garbage Collector desaloca a memória ocupada pelo elemento e seus handlers"], "Ciclo de remoção física e desalocação de memória no navegador."),
          p("Associe o método de exclusão ou troca ao seu comportamento específico:", [["elemento.remove()","Desacopla o nó da árvore sem necessidade de referência ao nó pai"],["pai.removeChild(filho)","Desacopla o filho através do pai e retorna o nó desanexado"],["elemento.replaceWith(novo)","Substitui o nó atual pelo novo elemento ou string informada"],["container.replaceChildren()","Remove todos os filhos atuais e opcionalmente adiciona novos"]], "Operações de exclusão, limpeza e substituição de nós do DOM.")
        ]
      }
    ],
    4: [
      {
        id: "javascript-c07-u4-l1-add-event-listener",
        title: "Registro de ouvintes com addEventListener",
        subtitle: "Eventos · Desacoplamento, múltiplos manipuladores e separação de responsabilidades",
        theory: "addEventListener é o padrão moderno e robusto para gerenciar eventos no navegador. Ao contrário de atributos HTML como onclick ou propriedades de nó como el.onclick, addEventListener permite registrar múltiplos ouvintes independentes para o mesmo evento sem sobrescrever manipuladores anteriores.",
        questions: [
          q("Por que o uso de addEventListener é preferível em relação à propriedade el.onclick = fn?", "Permite registrar múltiplos ouvintes independentes para o mesmo evento sem sobrescrever os outros", ["onclick é mais lento por padrão","addEventListener funciona sem JavaScript"], "el.onclick aceita apenas uma função; a segunda atribuição sobrescreve a primeira silenciosamente."),
          q("Qual o primeiro argumento obrigatório passado para o método addEventListener?", "Uma string contendo o nome do evento a ser monitorado (ex: \"click\", \"keydown\")", ["Uma função de callback","Um número identificador"], "O primeiro parâmetro identifica o tipo do evento sem o prefixo \"on\"."),
          q("O que acontece se registrarmos a mesma função anônima duas vezes com addEventListener?", "Ambas são registradas como ouvintes distintos e serão executadas sequencialmente a cada clique", ["A segunda sobrescreve a primeira","O navegador gera um erro"], "Funções anônimas possuem identidades de memória distintas e não são desduplicadas."),
          q("Qual o terceiro parâmetro opcional que addEventListener pode receber em sua invocação?", "Um objeto de opções de configuração (como once, capture, passive) ou um booleano de captura", ["Uma lista de variáveis globais","O tempo limite de execução em milissegundos"], "O objeto de opções permite configurar comportamentos refinados de escuta e performance."),
          t("Qual método padrão da interface EventTarget registra manipuladores de eventos em nós?", ["addEventListener"], "addEventListener é a API universal de escuta de eventos no DOM.", "// ouvinte de eventos"),
          g("Complete o código registrando um ouvinte para cliques no botão:", ["addEventListener"], "addEventListener conecta o evento à função de callback.", "botaoEnviar.____(\"click\", processarEnvio);"),
          o("Ordene as etapas de registro e execução de um manipulador de evento:", ["Obter a referência do elemento interativo alvo no documento","Invocar addEventListener passando o nome do evento e a função callback","Usuário interage com o elemento disparando o evento no navegador","Motor do navegador invoca o callback entregando o objeto Event correspondente"], "Fluxo completo de registro, disparo e tratamento de eventos no DOM."),
          p("Associe a modalidade de registro ao seu respectivo comportamento:", [["elemento.addEventListener(\"click\", fn)","Suporta múltiplos ouvintes e aceita opções avançadas"],["elemento.onclick = fn","Sobrescreve qualquer manipulador anterior atribuído na propriedade"],["<button onclick=\"fn()\">","Acoplamento rígido no HTML com escopo léxico frágil"],["options { once: true }","Garante a execução do ouvinte uma única vez com auto-remoção"]], "Comparativo de técnicas de vinculação de manipuladores de eventos.")
        ]
      },
      {
        id: "javascript-c07-u4-l2-objeto-event",
        title: "O objeto Event e suas propriedades fundamentais",
        subtitle: "Contexto · Distinguindo target de currentTarget e inspecionando detalhes",
        theory: "Quando um evento ocorre, o navegador instancia um objeto Event (ou subtipo como MouseEvent) e o entrega ao callback. As propriedades mais cruciais são target (o elemento específico que disparou o evento) e currentTarget (o elemento que possui o ouvinte registrado que está sendo executado).",
        questions: [
          q("Qual é a diferença fundamental entre event.target e event.currentTarget?", "target é o elemento que disparou o evento originalmente; currentTarget é o elemento onde o listener está anexado", ["São sempre idênticos em todas as circunstâncias","target refere-se à janela window"], "Em estruturas aninhadas, o clique em um filho faz target ser o filho e currentTarget ser o pai."),
          q("Qual propriedade do objeto Event indica o tipo do evento disparado como string?", "event.type", ["event.name","event.action"], "event.type retorna strings como \"click\", \"submit\" ou \"keydown\"."),
          q("Ao manipular eventos de teclado (keydown), qual propriedade retorna o valor legível da tecla pressionada?", "event.key (como \"Enter\", \"Escape\" ou \"a\")", ["event.keyCode (obsoleto)","event.char"], "event.key é a especificação moderna e amigável para identificação de teclas."),
          q("Qual propriedade do evento indica o momento exato em que ele ocorreu em milissegundos?", "event.timeStamp", ["event.time","event.clock"], "timeStamp registra a marcação temporal relativa ao início da navegação."),
          t("Qual propriedade do evento referencia o elemento exato onde o ouvinte está anexado?", ["currentTarget","event.currentTarget"], "currentTarget é sempre o nó receptor que registrou o listener ativo.", "// nó receptor do ouvinte"),
          g("Complete o código lendo o elemento original que sofreu a interação do usuário:", ["target"], "event.target identifica o nó de origem onde o evento aconteceu.", "function tratarClique(event) {\n    const origem = event.____;\n}"),
          o("Ordene a inspeção de propriedades em um evento de clique em <button><span>Texto</span></button>:", ["Usuário clica com o cursor sobre a palavra Texto","event.target é atribuído ao elemento <span>Texto</span> interno","event.currentTarget é atribuído ao elemento <button> receptor","event.type é verificado contendo a string \"click\""], "Relação entre target e currentTarget durante a interação do usuário."),
          p("Associe a propriedade do objeto Event ao seu significado técnico:", [["event.target","Elemento mais interno que recebeu a ação direta do usuário"],["event.currentTarget","Elemento onde a função de escuta está atualmente vinculada"],["event.type","Nome do evento que foi disparado pelo sistema"],["event.timeStamp","Registro em milissegundos da ocorrência do evento"]], "Propriedades cardinais do objeto de contexto Event.")
        ]
      },
      {
        id: "javascript-c07-u4-l3-propagacao-captura-borbulhamento",
        title: "Propagação de eventos: captura e borbulhamento",
        subtitle: "Fases · A jornada do evento da raiz até o nó alvo e de volta ao topo",
        theory: "A propagação de eventos no DOM ocorre em três fases: captura (desce da window até o nó alvo), alvo (executa no elemento atingido) e borbulhamento/bubbling (sobe do alvo de volta até a window). Por padrão, addEventListener escuta na fase de borbulhamento a menos que capture: true seja ativado.",
        questions: [
          q("Qual a direção percorrida pelo evento durante a fase de captura (capture phase)?", "Desce a partir do objeto window, passando por cada ancestral até alcançar o elemento alvo", ["Sobe do alvo até a raiz da página","Fica restrito apenas ao alvo"], "A fase de captura precede o atendimento no elemento alvo."),
          q("Qual a direção percorrida pelo evento durante a fase de borbulhamento (bubbling phase)?", "Sobe a partir do elemento alvo passando pelos seus pais sucessivamente até atingir window", ["Desce em profundidade nos filhos","Salta diretamente para a barra de endereços"], "O borbulhamento permite que elementos superiores interceptem ações ocorridas em seus filhos."),
          q("Como configurar addEventListener para escutar um evento na fase de captura em vez do padrão de borbulhamento?", "Passando { capture: true } como terceiro argumento na chamada do método", ["Invocando o método addCaptureListener","Passando a string \"capture\" como evento"], "O booleano ou propriedade capture no objeto de opções define o momento da interceptação."),
          q("Nem todos os eventos borbulham no DOM. Qual dos eventos abaixo tipicamente NÃO borbulha?", "O evento focus e o evento blur", ["O evento click","O evento keydown"], "focus e blur não sobem na árvore; seus equivalentes com borbulhamento são focusin e focusout."),
          t("Qual opção booleana ativa a escuta de eventos na descida da árvore antes do alvo?", ["capture"], "capture: true força a interceptação durante a fase de descida.", "// escuta na fase de captura"),
          g("Complete as opções do ouvinte ativando o modo de captura durante a descida:", ["capture: true"], "A opção capture determina a execução na descida do evento.", "painel.addEventListener(\"click\", tratarDescida, { ____ });"),
          o("Ordene as três fases formais de propagação de eventos no DOM:", ["Fase de captura: o evento desce da window até o nó pai do alvo","Fase de alvo: o evento atinge o elemento alvo onde a ação ocorreu","Fase de borbulhamento: o evento sobe do nó alvo percorrendo os ancestrais","Finalização: o evento atinge a raiz window encerrando o ciclo"], "Ciclo de vida completo das fases de propagação de eventos no padrão W3C."),
          p("Associe a fase de propagação ao sentido do fluxo:", [["Captura (capturing)","Fluxo descendente da raiz window até o elemento receptor"],["Alvo (target phase)","Execução direta no nó específico onde a ação foi originada"],["Borbulhamento (bubbling)","Fluxo ascendente do nó de origem subindo pelos elementos ancestrais"],["focusin / focusout","Variantes de foco que realizam borbulhamento na árvore"]], "Fases e características da propagação de eventos no navegador.")
        ]
      },
      {
        id: "javascript-c07-u4-l4-stop-propagation",
        title: "Interrupção de propagação com stopPropagation",
        subtitle: "Fluxo · Controlando e cancelando a subida de eventos na árvore",
        theory: "event.stopPropagation() interrompe imediatamente a subida (ou descida) do evento para os próximos ancestrais na árvore DOM. Para também impedir que outros ouvintes registrados no mesmíssimo elemento sejam executados, utiliza-se a forma mais agressiva: event.stopImmediatePropagation().",
        questions: [
          q("O que acontece quando event.stopPropagation() é invocado dentro de um ouvinte de clique?", "O evento deixa de borbulhar para os elementos pais, impedindo que seus ouvintes sejam acionados", ["A ação padrão do navegador é cancelada","O elemento clicado é removido do DOM"], "stopPropagation trava a transmissão do evento para os níveis superiores da árvore."),
          q("Qual a diferença entre stopPropagation() e stopImmediatePropagation()?", "stopImmediatePropagation além de impedir a subida, bloqueia outros ouvintes já anexados no mesmo elemento", ["São métodos sinônimos sem diferença","stopImmediatePropagation só funciona com mouse"], "stopImmediatePropagation interrompe imediatamente a cadeia de execução de handlers no próprio nó."),
          q("Invocar event.stopPropagation() cancela o comportamento padrão do elemento (como navegar em link)?", "Não, stopPropagation controla apenas a propagação na árvore; preventDefault cancela a ação padrão", ["Sim, cancela todas as ações padrão","Apenas em formulários"], "Propagação e ações nativas do navegador são mecanismos completamente independentes."),
          q("Por que o uso excessivo de stopPropagation é considerado um antipadrão em aplicações complexas?", "Pode quebrar delegação de eventos em contêineres superiores e ferramentas de telemetria analítica", ["Gera vazamento de memória imediato","Impede o carregamento de CSS"], "Bloquear borbulhamento pode sabotar bibliotecas e manipuladores globais que dependem de eventos."),
          t("Qual método do objeto Event interrompe a subida do evento para nós ancestrais?", ["stopPropagation","event.stopPropagation"], "stopPropagation bloqueia a continuidade da propagação na árvore.", "// interrompe borbulhamento"),
          g("Complete o código impedindo que o clique no modal feche o fundo da tela:", ["stopPropagation"], "stopPropagation evita que o clique dentro do modal chegue ao backdrop.", "conteudoModal.addEventListener(\"click\", event => {\n    event.____();\n});"),
          o("Ordene a contenção de propagação de clique em um botão dentro de um card:", ["Usuário clica no botão interno do card","Ouvinte do botão é acionado recebendo o objeto Event","Callback invoca event.stopPropagation()","Evento é contido no botão e o ouvinte de clique do card pai não é disparado"], "Sequência de bloqueio de propagação ascendente via stopPropagation."),
          p("Associe o método de controle ao seu efeito no ciclo de eventos:", [["event.stopPropagation()","Impede que o evento alcance ancestrais superiores na árvore"],["event.stopImmediatePropagation()","Impede ancestrais e bloqueia outros listeners no mesmo nó"],["event.preventDefault()","Anula a reação padrão que o navegador teria para aquele evento"],["event.defaultPrevented","Booleano que informa se preventDefault já foi acionado"]], "Mecanismos de controle e cancelamento no objeto Event.")
        ]
      },
      {
        id: "javascript-c07-u4-l5-prevent-default",
        title: "Ações padrão e preventDefault",
        subtitle: "Intercepção · Impedindo submissões automáticas, navegações e comportamentos nativos",
        theory: "Diversos elementos HTML possuem comportamentos nativos pré-programados, como links que navegam para URLs e botões de formulário que recarregam a página. Invocando event.preventDefault(), o script instrui o navegador a ignorar a ação padrão nativa, mantendo a execução sob controle do JavaScript.",
        questions: [
          q("O que acontece ao invocar event.preventDefault() dentro do evento submit de um formulário?", "O navegador não recarrega nem envia a página para a action, permitindo envio via JavaScript", ["O formulário limpa todos os campos","Os dados são salvos no LocalStorage"], "Permite validar campos e submeter dados de forma assíncrona com fetch."),
          q("O que ocorre ao chamar event.preventDefault() em um clique de uma tag de link (<a href=\"...\">)?", "O navegador não redireciona o usuário para a URL especificada no atributo href", ["O link é excluído do documento","A página entra em modo anônimo"], "Padrão essencial em SPAs (Single Page Applications) para roteamento via histórico."),
          q("Nem todo evento pode ter sua ação padrão cancelada. Qual propriedade booleana informa se o evento é cancelável?", "event.cancelable", ["event.isPreventable","event.canStop"], "Se event.cancelable for false, chamar preventDefault() não surtirá efeito algum."),
          q("Como verificar se outro ouvinte já chamou preventDefault() anteriormente no mesmo evento?", "Inspecionando a propriedade booleana event.defaultPrevented", ["Chamando event.wasCanceled()","Lendo a propriedade event.status"], "defaultPrevented retorna true caso preventDefault() tenha sido executado por qualquer handler."),
          t("Qual método do evento impede a ação padrão predefinida pelo navegador?", ["preventDefault","event.preventDefault"], "preventDefault cancela comportamentos nativos do navegador.", "// anula comportamento padrão"),
          g("Complete o código cancelando o envio tradicional do formulário:", ["preventDefault"], "preventDefault impede que o formulário recarregue a página.", "form.addEventListener(\"submit\", event => {\n    event.____();\n});"),
          o("Ordene as operações de intercepção e tratamento em um formulário moderno:", ["Usuário clica no botão de submeter ou pressiona Enter no campo","Evento submit é despachado pelo formulário","Callback executa event.preventDefault() cancelando recarregamento","Script executa validações locais e envia dados assincronamente via fetch"], "Fluxo padrão de submissão controlada em aplicações web modernas."),
          p("Associe o evento à sua respectiva ação padrão nativa no navegador:", [["submit em <form>","Recarrega a página enviando os campos para o atributo action"],["click em <a href>","Navega para a URL configurada no atributo href"],["keydown em <input>","Insere o caractere digitado na caixa de texto visível"],["contextmenu em elemento","Exibe o menu de contexto padrão com opções do navegador"]], "Ações nativas que podem ser interceptadas via preventDefault.")
        ]
      }
    ],
    5: [
      {
        id: "javascript-c07-u5-l1-padrao-delegacao",
        title: "O padrão de delegação de eventos",
        subtitle: "Arquitetura · Centralizando escuta no nó pai aproveitando o borbulhamento",
        theory: "A delegação de eventos consiste em anexar um único ouvinte em um elemento pai em vez de registrar centenas de ouvintes em cada elemento filho. Graças ao borbulhamento natural dos eventos, cliques nos nós filhos sobem até o pai, onde são tratados de forma centralizada, economizando memória substancial.",
        questions: [
          q("Qual mecanismo essencial do DOM torna viável a implementação de delegação de eventos?", "O borbulhamento (bubbling), que propaga eventos dos nós filhos em direção aos nós pais", ["A sincronização assíncrona com Web Workers","A compilação JIT de seletores CSS"], "Sem borbulhamento, o elemento ancestral jamais receberia a notificação das ações ocorridas nos filhos."),
          q("Qual a principal vantagem de performance da delegação em uma lista com 1.000 itens?", "Registra apenas 1 função ouvinte na memória em vez de instanciar 1.000 ouvintes individuais", ["Reduz o tamanho do bundle JavaScript","Elimina a necessidade de renderização no canvas"], "A economia de memória e o tempo inicial de vinculação de listeners são drasticamente otimizados."),
          q("O que acontece na delegação quando novos itens filhos são adicionados dinamicamente à lista?", "Os novos itens passam a responder imediatamente aos eventos sem exigir novo addEventListener", ["Os novos itens não respondem até a página ser recarregada","O pai para de escutar eventos"], "Como o pai já escuta todo o contêiner, qualquer nó futuro que borbulhar será automaticamente capturado."),
          q("Em qual elemento o ouvinte de eventos deve ser registrado ao implementar a delegação?", "No elemento contêiner ancestral comum que envolve todos os elementos de interesse", ["Em cada nó folha individualmente","Obrigatoriamente no elemento document.head"], "O pai atua como roteador central das interações dos seus descendentes."),
          t("Qual propriedade do evento informa o elemento exato onde o clique originou na delegação?", ["target","event.target"], "event.target indica o nó folha que sofreu o toque ou clique original.", "// origem do evento"),
          g("Complete o código registrando o manipulador no contêiner comum da lista:", ["addEventListener"], "A lista contêiner recebe o único ouvinte centralizado.", "listaTarefas.____(\"click\", tratarAcaoItem);"),
          o("Ordene as etapas do fluxo de processamento de um clique com delegação de eventos:", ["Usuário clica em um botão específico dentro de um item da lista","Evento borbulha a partir do botão subindo pela hierarquia do DOM","Elemento pai contêiner intercepta o evento em seu ouvinte registrado","Callback inspeciona event.target para identificar e executar a ação correspondente"], "Ciclo de vida de captura e despacho em uma arquitetura de delegação de eventos."),
          p("Associe o papel na delegação à sua respectiva responsabilidade técnica:", [["Contêiner pai","Hospeda o único ouvinte de eventos e gerencia o despacho central"],["event.target","Identifica o nó específico mais interno que originou a interação"],["event.currentTarget","Referencia o contêiner pai executor que contém o listener"],["Borbulhamento (bubbling)","Mecanismo físico do DOM que transporta o evento até o pai"]], "Responsabilidades e componentes fundamentais no padrão de delegação.")
        ]
      },
      {
        id: "javascript-c07-u5-l2-identificacao-target-closest",
        title: "Identificação cirúrgica com target e closest",
        subtitle: "Roteamento · Lidando com ícones internos e elementos aninhados em botões",
        theory: "Em botões com ícones internos (como <button><svg></svg> Excluir</button>), clicar no ícone faz event.target apontar para o svg e não para o button. Para contornar isso com segurança, utiliza-se const btn = event.target.closest(\"button\"), que localiza o botão relevante mesmo se o clique atingir o ícone.",
        questions: [
          q("Por que verificar if (event.target.tagName === \"BUTTON\") pode falhar ao clicar em botões estilizados?", "Porque se o botão contiver um ícone ou span interno, event.target apontará para o elemento filho", ["Porque tagName sempre retorna minúsculo","Porque botões não disparam eventos"], "O clique atinge o elemento visual mais profundo renderizado sob as coordenadas do ponteiro."),
          q("Como resolver de forma elegante e robusta o clique em botões com ícones internos?", "Utilizando const botao = event.target.closest(\"button\")", ["Removendo todos os ícones da interface","Criando um listener individual para o SVG"], "closest() sobe a partir do nó clicado procurando o elemento ancestral compatível."),
          q("O que deve ser verificado antes de executar a ação após chamar event.target.closest(\"button\")?", "Verificar se o retorno não é null e se o botão pertence ao contêiner gerenciado", ["Verificar se o botão tem mais de 10 pixels","Confirmar se o usuário está logado"], "Se o clique ocorreu fora de qualquer botão no contêiner, closest() retornará null."),
          q("Como distinguir qual ação executar quando múltiplos botões compartilham a mesma delegação?", "Inspecionando atributos semânticos como dataset (ex: botao.dataset.acao === \"excluir\")", ["Comparando a cor de fundo do botão","Lendo o número da linha no código"], "dataset permite rotular cada botão com sua respectiva ação de negócio com clareza."),
          t("Qual método DOM busca o elemento de interesse a partir do nó folha clicado?", ["closest"], "closest navega para cima na hierarquia encontrando a tag desejada.", "// navegação ascendente a partir do alvo"),
          g("Complete o código localizando com segurança o botão de ação clicado:", ["closest"], "closest garante a referência ao botão mesmo que o clique acerte o ícone.", "const btn = event.target.____(\"button[data-action]\");"),
          o("Ordene o fluxo defensivo de filtragem de cliques em uma tabela com botões:", ["Receber o evento de clique interceptado no elemento <table>","Localizar o botão alvo executando event.target.closest(\"button\")","Verificar se a referência do botão existe (não é null)","Ler botao.dataset.action e executar a rotina correspondente"], "Roteiro seguro para identificação e despacho em delegações complexas."),
          p("Associe a verificação ao seu propósito na delegação de eventos:", [["event.target.closest(\"button\")","Recupera o botão envolvente mesmo se o clique acertou nó interno"],["if (!botao) return","Aborta a execução caso o clique tenha ocorrido fora de botões"],["if (!lista.contains(botao)) return","Garante que o elemento capturado pertence ao escopo da lista"],["botao.dataset.id","Extrai o identificador único do registro associado ao botão"]], "Técnicas defensivas para roteamento e extração de dados no clique.")
        ]
      },
      {
        id: "javascript-c07-u5-l3-gerenciamento-memoria",
        title: "Vantagens de memória e elementos dinâmicos",
        subtitle: "Escalabilidade · Prevenindo vazamentos de memória em interfaces reativas",
        theory: "Vincular listeners a cada item gerado em listas longas consome referências em memória e exige limpeza manual quando itens são descartados. Com a delegação, o contêiner permanece constante e itens podem ser adicionados ou removidos sem vazamentos de memória (memory leaks) e sem overhead de registro.",
        questions: [
          q("O que causa vazamentos de memória (memory leaks) clássicos em manipulações frequentes do DOM?", "Remover nós do DOM mantendo listeners e referências ativas em variáveis no JavaScript", ["Usar arquivos CSS muito extensos","Inserir mais de dez imagens SVG"], "Se o Garbage Collector detectar referências ativas a handlers ou nós, a memória não é liberada."),
          q("Por que a delegação de eventos é a melhor amiga de listas com paginação infinita?", "Porque novos lotes de nós não necessitam de chamadas a addEventListener ao entrarem na tela", ["Porque reduz o tráfego de rede da API","Porque desativa o reflow do navegador"], "A interface permanece ágil pois nenhum custo de vinculação de eventos é pago no render."),
          q("Quando uma linha de tabela é removida com linha.remove() sob o padrão de delegação, o que é preciso limpar?", "Apenas remover o nó do DOM; não há listeners locais anexados na linha para desregistrar", ["É obrigatório reiniciar o navegador","Precisa invocar window.gc()"], "Como o ouvinte vive no pai, o filho removido é coletado sem pendências de eventos."),
          q("Qual ferramenta dos navegadores permite inspecionar event listeners ativos em nós do DOM?", "A aba Elements -> painel Event Listeners das Ferramentas do Desenvolvedor (DevTools)", ["O console Network apenas","A aba Memory em modo de texto puro"], "O painel Event Listeners exibe todos os ouvintes associados a qualquer nó inspecionado."),
          t("Como se chama o processo automático do motor JavaScript que desaloca memória sem referências?", ["Garbage Collector","coletor de lixo","garbage collector"], "O Garbage Collector libera objetos que se tornaram inacessíveis na memória.", "// desalocador automático de memória"),
          g("Complete o código removendo o nó sem se preocupar com listeners locais graças à delegação:", ["remove"], "remove() descarta o elemento diretamente da árvore.", "itemSelecionado.____();"),
          o("Ordene a evolução da memória ao renderizar 1.000 itens com delegação versus ouvintes individuais:", ["Abordagem individual cria 1.000 closures de funções no heap da memória","Abordagem com delegação cria exatamente 1 closure no elemento pai","Consumo de memória e tempo de montagem caem drasticamente com delegação","Exclusão de itens no contêiner com delegação não deixa closures órfãs no heap"], "Comparativo de alocação de recursos entre delegação e ouvintes pontuais."),
          p("Associe a prática ao seu impacto de desempenho e sustentabilidade:", [["Um listener no contêiner pai","Consumo mínimo de memória e suporte nativo a nós dinâmicos"],["Listeners em cada nó filho","Degradação em listas longas e risco de retenção órfã na memória"],["Remoção direta de filho no pai","Descarte limpo e coleta imediata pelo Garbage Collector"],["Aba Event Listeners no DevTools","Diagnóstico visual de ouvintes e delegações ativas na página"]], "Impactos arquiteturais na gestão de memória e ciclo de vida de nós.")
        ]
      },
      {
        id: "javascript-c07-u5-l4-remocao-listeners-once",
        title: "Remoção de ouvintes e a opção once",
        subtitle: "Ciclo de vida · Desregistrando manipuladores com removeEventListener e { once: true }",
        theory: "Para remover um ouvinte com removeEventListener, é obrigatório passar a mesma referência da função registrada; funções anônimas não podem ser removidas dessa forma. Quando o evento deve executar apenas uma única vez, a opção { once: true } elimina a necessidade de remoção manual pelo script.",
        questions: [
          q("Por que a chamada elemento.removeEventListener(\"click\", () => {}) falha em remover o ouvinte?", "Porque a arrow function cria uma nova referência de função diferente da registrada anteriormente", ["Porque removeEventListener não aceita arrow functions","Porque o evento click é protegido"], "removeEventListener exige estrita igualdade de referência na memória (fn === fn)."),
          q("Como registrar um evento de modo que ele seja executado uma única vez e se autoexclua automaticamente?", "Passando { once: true } no objeto de opções de addEventListener", ["Chamando elemento.listenOnce(\"click\", fn)","Atribuindo elemento.once = true"], "A opção once instrui o navegador a desanexar o listener logo após a primeira execução."),
          q("Qual a principal vantagem da opção { once: true } em animações de entrada ou transições CSS?", "Garante a limpeza automática ao término do evento transitionend ou animationend sem código extra", ["Impede que a animação seja interrompida por scroll","Acelera a placa gráfica GPU"], "Evita criar funções nomeadas complexas apenas para desregistrar ouvintes temporários."),
          q("O que acontece se invocarmos removeEventListener com parâmetros de captura (capture) divergentes?", "O ouvinte não é removido, pois a fase de escuta (captura vs borbulhamento) faz parte da assinatura", ["O navegador remove ambos os ouvintes","Gera um erro de sintaxe imediato"], "A opção capture deve coincidir exatamente com a usada no registro original."),
          t("Qual opção booleana faz com que o ouvinte seja automaticamente descartado após o primeiro disparo?", ["once"], "A propriedade once: true desregistra o handler logo após o evento ocorrer.", "// descarte automático pós-disparo"),
          g("Complete o código configurando a execução única do ouvinte no botão de confirmação:", ["once: true"], "A opção once desregistra o callback após o primeiro clique do usuário.", "btnConfirmar.addEventListener(\"click\", finalizarCompra, { ____ });"),
          o("Ordene as etapas para registrar e posteriormente desregistrar um ouvinte manualmente:", ["Declarar uma função nomeada estável na memória (ex: const tratar = () => {})","Registrar o ouvinte passando a referência: el.addEventListener(\"click\", tratar)","Executar a lógica de interação conforme necessário durante a aplicação","Desregistrar invocando el.removeEventListener(\"click\", tratar) com a mesma referência"], "Ciclo de registro e cancelamento com referências idênticas no DOM."),
          p("Associe a técnica de gerenciamento de ouvintes ao seu comportamento:", [["el.removeEventListener(\"click\", ref)","Remove o manipulador utilizando referência idêntica de função"],["options { once: true }","Auto-remoção garantida do ouvinte após sua primeira execução"],["Função anônima em listener","Impossível de ser desregistrada pontualmente via removeEventListener"],["options { capture: true }","Fase de captura que deve coincidir para permitir desregistro futuro"]], "Regras e detalhes de ciclo de vida de ouvintes no DOM.")
        ]
      },
      {
        id: "javascript-c07-u5-l5-abort-controller-eventos",
        title: "Cancelamento em lote com AbortController",
        subtitle: "Controle · Desativando múltiplos ouvintes de evento com um único comando",
        theory: "O AbortController oferece uma maneira elegante de desregistrar dezenas de ouvintes de eventos de uma só vez. Ao vincular múltiplos addEventListener ao mesmo signal (controller.signal), invocar controller.abort() cancela instantaneamente todos os ouvintes associados sem guardar referências individuais.",
        questions: [
          q("Como o AbortController facilita o cancelamento de múltiplos ouvintes de eventos simultâneos?", "Permite associar o mesmo controller.signal a vários listeners e cancelá-los com um único controller.abort()", ["Destrói a janela do navegador liberando RAM","Converte todos os eventos em Promises"], "Um único comando abort() limpa dezenas de listeners espalhados por diferentes elementos."),
          q("Como passar o sinal de aborto para o método addEventListener?", "Passando { signal: controller.signal } no objeto de opções do método", ["Passando o controller diretamente como primeiro argumento","Atribuindo elemento.signal = controller"], "A propriedade signal no terceiro argumento conecta o ouvinte ao controlador."),
          q("É possível utilizar funções anônimas com AbortController e ainda assim cancelá-las com sucesso?", "Sim, porque o cancelamento é gerenciado pelo signal do controlador e não pela referência da função", ["Não, apenas funções declaradas funcionam","Apenas com arrow functions assíncronas"], "Isso resolve definitivamente a limitação clássica de removeEventListener com funções inline."),
          q("O que acontece com novos listeners registrados passando um sinal que já foi abortado previamente?", "Eles são descartados imediatamente e nunca serão executados pelo navegador", ["Eles revertem o estado do controlador","Lançam uma exceção fatal imediata"], "Um sinal abortado impede que qualquer ouvinte futuro seja ativado com aquele sinal."),
          t("Qual método do AbortController dispara o cancelamento em cascata de todos os ouvintes vinculados?", ["abort","controller.abort"], "controller.abort() cancela todos os ouvintes conectados ao seu signal.", "// cancelamento em cascata"),
          g("Complete o código conectando o sinal do controlador ao ouvinte de rolagem:", ["controller.signal"], "A propriedade signal do controlador é informada nas opções do listener.", "window.addEventListener(\"scroll\", monitorarScroll, { signal: ____ });"),
          o("Ordene as etapas de uso do AbortController para gerenciar eventos de um componente:", ["Instanciar um novo controlador com const controller = new AbortController()","Registrar múltiplos ouvintes passando { signal: controller.signal } nas opções","Usuário navega ou fecha o componente interativo na aplicação","Invocar controller.abort() desligando todos os ouvintes do componente em lote"], "Padrão moderno de limpeza de eventos em componentes de interface."),
          p("Associe o componente da API AbortController à sua função:", [["new AbortController()","Instancia a entidade controladora de cancelamento"],["controller.signal","Objeto de sinalização repassado aos ouvintes de evento ou requisições"],["controller.abort()","Dispara a interrupção imediata de todos os ouvintes vinculados ao sinal"],["signal.aborted","Propriedade booleana que indica se o sinal já foi cancelado"]], "Mecanismos de controle e sinalização de aborto na plataforma web.")
        ]
      }
    ],
    6: [
      {
        id: "javascript-c07-u6-l1-form-elements",
        title: "Acessando campos via form.elements",
        subtitle: "Formulários · Coleção estruturada e acesso direto por nome de campo",
        theory: "A propriedade form.elements expõe uma coleção especializada contendo todos os controles de formulário (inputs, selects, textareas e buttons). É possível acessar os campos diretamente pelo atributo name (ex: form.elements.email), simplificando a leitura de formulários sem depender de múltiplos seletores.",
        questions: [
          q("Qual a principal vantagem de acessar campos via form.elements.nomeCampo em vez de document.querySelector?", "Permite acesso direto e semântico pelo atributo name dentro do escopo estrito daquele formulário", ["querySelector é restrito a IDs numéricos","form.elements executa antes do carregamento"], "Evita colisões com campos de outros formulários que compartilhem nomes semelhantes na página."),
          q("O que form.elements[\"genero\"] retorna quando existem múltiplos inputs do tipo radio com o mesmo name=\"genero\"?", "Retorna uma RadioNodeList contendo o grupo de opções de rádio compartilhadas", ["Retorna apenas o primeiro input radio","Lança um erro de duplicidade de identificador"], "RadioNodeList agrupa radios com o mesmo nome e expõe diretamente a propriedade .value do selecionado."),
          q("Quais tipos de elementos HTML são indexados dentro da coleção form.elements?", "Controles interativos de dados como input, select, textarea e button contidos no formulário", ["Apenas tags div e span","Todas as tags visíveis da página inteira"], "form.elements ignora elementos estruturais de layout filtrando apenas elementos de controle."),
          q("Como obter o valor selecionado de um grupo de radio buttons via RadioNodeList de forma direta?", "Lendo diretamente a propriedade form.elements.genero.value", ["Iterando obrigatoriamente com um laço for","Invocando getRadioValue()"], "RadioNodeList retorna a string do valor da opção checada ou string vazia se nenhuma estiver marcada."),
          t("Qual propriedade de um elemento form agrupa todos os seus controles de entrada?", ["elements","form.elements"], "form.elements contém a coleção de todos os campos interativos do formulário.", "// coleção de controles do formulário"),
          g("Complete o código lendo o campo de e-mail diretamente pelo nome através de elements:", ["elements"], "elements permite acesso indexado pelo atributo name do campo.", "const campoEmail = meuFormulario.____.email;"),
          o("Ordene os passos de extração de valores de um formulário estruturado:", ["Obter a referência do elemento <form> no documento","Acessar a coleção estruturada form.elements","Localizar o campo desejado através do identificador de nome: form.elements.usuario","Ler a propriedade value do campo para obter os dados digitados"], "Fluxo semântico de extração de dados através da API nativa de formulários."),
          p("Associe a estrutura de formulário ao seu comportamento nativo:", [["form.elements","Coleção que reúne todos os controles interativos do formulário"],["form.elements.nome.value","Lê diretamente o texto digitado no campo com atributo name=\"nome\""],["RadioNodeList","Grupo de radio buttons compartilhado que expõe o valor da opção marcada"],["form.reset()","Restaura todos os campos do formulário para seus valores iniciais"]], "Recursos e propriedades da interface HTMLFormElement.")
        ]
      },
      {
        id: "javascript-c07-u6-l2-eventos-input-change",
        title: "Eventos de entrada: input, change, focus e blur",
        subtitle: "Interação · Diferenciando digitação em tempo real de confirmação de alteração",
        theory: "O evento input dispara a cada caractere digitado, colado ou alterado em tempo real pelo usuário. Já o evento change dispara apenas quando o campo perde o foco (blur) após uma alteração confirmada ou imediatamente na seleção de um novo item em um select ou checkbox.",
        questions: [
          q("Quando o evento input é disparado em um campo de texto (<input type=\"text\">)?", "Imediatamente a cada caractere inserido, apagado ou colado pelo usuário no campo", ["Apenas quando o usuário pressiona Enter","Somente quando o campo perde o foco"], "input é o evento ideal para reatividade imediata, cálculo em tempo real e busca instantânea."),
          q("Quando o evento change é disparado em um campo de texto convencional?", "Quando o valor é alterado e o usuário remove o foco do campo (evento blur)", ["A cada letra digitada","Apenas ao enviar o formulário"], "change representa a confirmação e conclusão da edição de um campo de texto."),
          q("Qual a diferença entre os eventos focus e blur?", "focus ocorre quando o elemento ganha o foco de digitação; blur ocorre quando ele perde o foco", ["focus serve para validação; blur para estilização apenas","São sinônimos para clique"], "Esses eventos controlam realce visual e acionam validações pontuais ao sair do campo."),
          q("Em elementos do tipo <select>, qual evento dispara imediatamente ao selecionar uma nova opção?", "O evento change dispara no momento exato em que a seleção é confirmada pelo usuário", ["Apenas o evento submit","O evento drag"], "Em caixas de seleção, a escolha de um item conclui a alteração sem necessidade de perder o foco."),
          t("Qual evento dispara em tempo real a cada caractere modificado pelo usuário?", ["input"], "O evento input reflete modificações instantâneas no valor do controle.", "// alteração instantânea de texto"),
          g("Complete o código ouvindo a perda de foco do campo para validar o preenchimento:", ["blur"], "O evento blur é emitido quando o campo perde o foco do usuário.", "campoSenha.addEventListener(\"____\", validarAoSair);"),
          o("Ordene os eventos emitidos durante a edição de um campo de texto:", ["Usuário clica no campo de texto emitindo o evento focus","Usuário digita a letra \"A\" emitindo o primeiro evento input","Usuário digita a letra \"B\" emitindo o segundo evento input","Usuário clica fora do campo emitindo sucessivamente change e blur"], "Sequência temporal de eventos durante a interação com campos de entrada."),
          p("Associe o evento de formulário ao seu momento exato de disparo:", [["input","Disparado a cada caractere digitado, colado ou removido em tempo real"],["change","Disparado ao confirmar a mudança e sair do campo (ou ao alterar select)"],["focus","Disparado no instante em que o elemento recebe o foco do usuário"],["blur","Disparado no instante em que o elemento perde o foco do usuário"]], "Quatro eventos cardinais do ciclo de interação com formulários.")
        ]
      },
      {
        id: "javascript-c07-u6-l3-checkbox-radio-select",
        title: "Manipulação de checkboxes, radios e selects",
        subtitle: "Controles · Lendo seleções únicas, múltiplas e estados booleanos",
        theory: "Diferentes controles exigem leituras específicas. Checkboxes utilizam a propriedade booleana checked. Radios utilizam checked ou o valor do grupo via RadioNodeList. Selects únicos expõem a propriedade value do option escolhido, enquanto selects múltiplos requerem inspecionar select.selectedOptions.",
        questions: [
          q("Como ler o estado de seleção de uma caixa de seleção (checkbox) em JavaScript?", "Lendo a propriedade booleana elementoCheckbox.checked (retorna true ou false)", ["Lendo elementoCheckbox.value","Invocando elementoCheckbox.getState()"], "checked armazena o estado verdadeiro/falso de marcação da caixa."),
          q("Como obter todos os valores selecionados em um elemento <select multiple>?", "Iterando sobre a coleção select.selectedOptions e mapeando a propriedade value de cada option", ["Lendo apenas select.value que retorna tudo","Invocando select.getAllValues()"], "select.value em selects múltiplos retorna apenas o primeiro item selecionado."),
          q("Qual propriedade em uma tag <option> indica se ela está selecionada no momento?", "A propriedade booleana option.selected", ["A propriedade option.active","A propriedade option.checked"], "option.selected controla a ativação de itens dentro de menus select."),
          q("O que select.selectedIndex indica em um menu de opções?", "O índice numérico (base zero) do item atualmente selecionado ou -1 se nenhum estiver ativo", ["A quantidade total de opções","O valor da primeira opção"], "selectedIndex permite ler ou definir programaticamente a opção ativa por sua posição."),
          t("Qual propriedade booleana reflete se um input checkbox ou radio está marcado?", ["checked"], "checked indica se a caixa ou botão de rádio está assinalado.", "// estado booleano de marcação"),
          g("Complete o código lendo o array de opções selecionadas no select múltiplo:", ["selectedOptions"], "selectedOptions expõe uma HTMLCollection com as opções marcadas.", "const marcados = Array.from(meuSelect.____).map(o => o.value);"),
          o("Ordene os passos para extrair escolhas de um select com suporte a múltiplas seleções:", ["Localizar o elemento select com atributo multiple no documento","Acessar a coleção nativa de opções ativas via select.selectedOptions","Converter a coleção em array com Array.from","Transformar os nós em strings mapeando a propriedade option.value"], "Procedimento padrão para coleta de dados de menus multiseleção."),
          p("Associe o controle de formulário à propriedade correta para leitura de dados:", [["input[type=\"checkbox\"]","campo.checked (retorna true se assinalado ou false se desmarcado)"],["input[type=\"radio\"]","radio.checked para unitário ou grupo.value para o selecionado"],["select (simples)","select.value (string da opção atualmente escolhida)"],["select (múltiplo)","select.selectedOptions (coleção com todas as tags option ativas)"]], "Padrões de leitura para diferentes controles de entrada do HTML.")
        ]
      },
      {
        id: "javascript-c07-u6-l4-form-data",
        title: "Empacotamento e inspeção com FormData",
        subtitle: "Payloads · Coletando todos os campos do formulário para envio via fetch",
        theory: "O objeto FormData extrai e empacota automaticamente todos os campos com atributo name de um formulário. Ele suporta uploads de arquivos (File), serialização transparente para requisições com fetch e iteração via for..of, eliminando a leitura manual campo a campo.",
        questions: [
          q("Como instanciar um objeto FormData povoado automaticamente com os dados de um formulário?", "const dados = new FormData(elementoForm)", ["const dados = FormData.from(elementoForm)","const dados = elementoForm.toFormData()"], "Passar o formulário como argumento no construtor coleta todos os campos nomeados automaticamente."),
          q("Quais campos de um formulário são IGNORADOS pelo construtor do FormData?", "Campos que não possuem o atributo name configurado ou que estejam desabilitados (disabled)", ["Campos do tipo password","Campos que possuem valor numérico"], "O atributo name é o identificador obrigatório da chave no par chave-valor do FormData."),
          q("Como adicionar manualmente um novo par chave-valor a um objeto FormData existente?", "dados.append(\"categoria\", \"eletronicos\")", ["dados.setKey(\"categoria\", \"eletronicos\")","dados.push([\"categoria\", \"eletronicos\"])"], "append adiciona o valor à chave, criando a chave se não existir."),
          q("Como converter facilmente um objeto FormData em um objeto JavaScript plano serializável para JSON?", "Object.fromEntries(formData.entries())", ["formData.toJSON()","JSON.parse(formData)"], "Object.fromEntries transforma iteradores de chave-valor em objetos comuns."),
          t("Qual classe nativa do navegador empacota campos de formulário e uploads de arquivos?", ["FormData"], "FormData encapsula pares chave/valor para transmissões HTTP.", "// construtor de dados de formulário"),
          g("Complete o código empacotando os dados do formulário submetido:", ["FormData"], "new FormData(form) extrai todos os campos prontos para envio.", "const payload = new ____(event.target);"),
          o("Ordene o envio assíncrono de um formulário via fetch com FormData:", ["Interceptar o evento submit no formulário com event.preventDefault()","Construir o objeto com const formData = new FormData(form)","Disparar fetch(url, { method: \"POST\", body: formData })","Aguardar a resposta da API sem configurar manualmente Content-Type multipart"], "Fluxo padrão de envio assíncrono de formulários com FormData."),
          p("Associe o método do FormData à sua ação correspondente:", [["formData.get(\"email\")","Recupera o primeiro valor associado à chave informada"],["formData.getAll(\"tags\")","Retorna array com todos os valores vinculados à chave"],["formData.append(\"chave\", \"valor\")","Anexa um novo valor preservando entradas anteriores"],["formData.has(\"termo\")","Retorna booleano indicando a presença da chave informada"]], "Operações fundamentais da interface FormData.")
        ]
      },
      {
        id: "javascript-c07-u6-l5-desabilitacao-estados-submissao",
        title: "Desabilitando campos e estados de submissão",
        subtitle: "Feedback · Prevenindo envios duplos e comunicando processamento em andamento",
        theory: "Durante operações assíncronas de envio, é essencial desabilitar o botão de envio e campos do formulário atribuindo elemento.disabled = true. Isso previne cliques repetidos que duplicariam requisições no servidor e fornece feedback visual claro de que a ação está em processamento.",
        questions: [
          q("Qual problema grave ocorre se o botão de envio não for desabilitado durante uma requisição assíncrona?", "Cliques repetidos do usuário podem enviar requisições duplicadas gravando registros repetidos", ["O navegador congela a renderização","O token CSRF é anulado"], "Desabilitar botões de checkout ou submissão é imperativo contra envios acidentais múltiplos."),
          q("O que acontece com os valores de campos marcados com disabled quando um formulário é submetido?", "Campos desabilitados são omitidos da submissão e não entram no FormData nem na requisição", ["Eles são enviados com valor null","Lançam um erro de submissão"], "Campos desabilitados são desconsiderados pela serialização nativa do navegador."),
          q("Como desabilitar um botão via JavaScript durante o carregamento de uma requisição?", "botao.disabled = true", ["botao.setDisabled()","botao.state = \"inactive\""], "A propriedade booleana disabled controla o bloqueio de interações no controle."),
          q("Onde deve ser colocada a reabilitação dos botões para garantir retorno ao estado normal mesmo em caso de erro?", "No bloco finally da estrutura try..catch..finally que envolve a chamada assíncrona", ["No início do bloco try","Apenas dentro do bloco catch"], "O bloco finally executa obrigatoriamente independente de sucesso ou falha da requisição."),
          t("Qual propriedade booleana desativa a interatividade e submissão de um botão ou campo?", ["disabled"], "disabled impede cliques, foco e submissão do controle.", "// bloqueia interatividade"),
          g("Complete o código bloqueando o botão para evitar clique duplo durante o envio:", ["disabled = true"], "Atribuir disabled = true trava o botão imediatamente.", "btnSalvar.____;\nawait enviarDados();\nbtnSalvar.disabled = false;"),
          o("Ordene as etapas para um ciclo de envio seguro contra cliques duplos:", ["Usuário aciona o envio e o handler intercepta com preventDefault()","Desabilitar botão com btn.disabled = true e alterar texto para \"Salvando...\"","Executar requisição assíncrona com fetch dentro de bloco try/catch","No bloco finally, reativar botão com btn.disabled = false e restaurar rótulo"], "Roteiro resiliente para prevenção de submissões duplicadas em formulários."),
          p("Associe o estado do botão à sua respectiva finalidade:", [["btn.disabled = true","Trava a interação impedindo disparos adicionais durante a espera"],["btn.disabled = false","Restaura a capacidade de clique após conclusão do processamento"],["btn.textContent = \"Carregando...\"","Fornece feedback visual sobre o estado assíncrono em andamento"],["bloco finally","Garante a restauração do botão quer haja sucesso quer haja exceção"]], "Controle de fluxo e feedback de interação em envios assíncronos.")
        ]
      }
    ],
    7: [
      {
        id: "javascript-c07-u7-l1-validacao-html5-nativa",
        title: "Validação nativa declarativa do HTML5",
        subtitle: "Restrições · Atributos required, pattern, minlength e tipos semânticos",
        theory: "O HTML5 oferece validação embutida executada pelo motor do navegador sem necessitar de código JavaScript. Atributos declarativos como required, minlength, maxlength, pattern (com regex) e tipos como email, number e url realizam checagens imediatas antes da emissão do evento submit.",
        questions: [
          q("Qual o efeito de adicionar o atributo required a uma tag <input>?", "Impede a submissão do formulário se o campo estiver vazio, exibindo aviso nativo ao usuário", ["Transforma o campo em somente leitura","Criptografa o texto digitado"], "required impõe o preenchimento obrigatório para prosseguir com o envio."),
          q("Qual atributo permite definir uma expressão regular para validar o formato do texto digitado?", "O atributo pattern=\"regex\"", ["O atributo regex=\"padrao\"","O atributo match=\"expressao\""], "pattern aceita expressões regulares avaliadas contra o valor do campo."),
          q("Como desligar completamente a validação nativa do navegador em um formulário específico?", "Adicionando o atributo booleano novalidate na tag <form novalidate>", ["Definindo input.noValidation = true","Removendo todos os atributos type"], "novalidate desativa balões nativos para que scripts personalizados assumam o controle total."),
          q("O que acontece se o usuário submeter um campo <input type=\"email\"> com texto fora do formato de e-mail?", "O navegador bloqueia o envio e foca no campo exibindo um balão nativo de correção", ["O texto é apagado silenciosamente","O formulário é enviado com valor vazio"], "O motor do navegador impede a emissão de submit até que as restrições sejam satisfeitas."),
          t("Qual atributo da tag form desativa a validação nativa de restrições do navegador?", ["novalidate"], "novalidate permite que o desenvolvedor implemente sua própria validação via JS.", "// desativa validação nativa"),
          g("Complete o código HTML tornando o preenchimento do campo mandatório:", ["required"], "required impede a submissão com campo em branco.", "<input type=\"text\" name=\"nome\" ____>"),
          o("Ordene as etapas executadas pelo navegador ao validar um formulário nativo:", ["Usuário aciona o envio clicando no botão do formulário","Navegador verifica sequencialmente as restrições declarativas de cada campo","Se houver violação, cancela o envio e foca no primeiro campo inválido exibindo balão","Se todos os campos forem válidos, despacha o evento submit para o script"], "Fluxo de verificação de restrições nativas do HTML5 antes do envio."),
          p("Associe o atributo nativo de validação ao seu critério de checagem:", [["required","Exige preenchimento obrigatório antes da submissão do formulário"],["pattern=\"[0-9]{5}\"","Valida se o valor digitado satisfaz a expressão regular fornecida"],["minlength=\"8\"","Impõe quantidade mínima de caracteres no campo de texto"],["type=\"email\"","Valida sintaticamente se a string possui estrutura de endereço de e-mail"]], "Atributos declarativos de validação de restrições no HTML5.")
        ]
      },
      {
        id: "javascript-c07-u7-l2-constraint-validation-api",
        title: "Constraint Validation API: checkValidity e reportValidity",
        subtitle: "Programação · Invocando e controlando validações nativas via JavaScript",
        theory: "A Constraint Validation API permite disparar a validação nativa programaticamente. O método checkValidity() retorna booleano indicando se o campo ou formulário é válido. Já reportValidity() verifica a validade e, caso haja erro, exibe ativamente os balões nativos e posiciona o foco no campo.",
        questions: [
          q("Qual a principal diferença entre checkValidity() e reportValidity()?", "checkValidity apenas retorna booleano; reportValidity além do booleano exibe balões de erro e move o foco", ["reportValidity envia o formulário","checkValidity é assíncrono"], "reportValidity é excelente para acionar a experiência nativa de erros sob demanda via script."),
          q("O que elemento.checkValidity() retorna se o campo satisfizer todas as regras de validação?", "O valor booleano true", ["Uma string vazia \"\"","O número 1"], "Retorna true se nenhuma restrição declarada foi violada."),
          q("O método checkValidity() pode ser invocado diretamente no elemento <form>?", "Sim, valida todos os campos contidos no formulário retornando false se qualquer um falhar", ["Não, apenas em inputs individuais","Apenas se novalidate estiver ausente"], "Invocado no formulário, avalia o conjunto inteiro de controles de uma única vez."),
          q("Qual evento é disparado em cada controle do formulário quando checkValidity() detecta uma falha?", "O evento invalid", ["O evento error","O evento reject"], "O evento invalid permite interceptar erros em campos pontuais e aplicar estilos customizados."),
          t("Qual método nativo testa a validade de um campo e exibe o balão de erro caso inválido?", ["reportValidity","element.reportValidity"], "reportValidity notifica o usuário na interface com balões nativos.", "// valida e exibe balão nativo"),
          g("Complete o código verificando se o campo de texto atende a todas as restrições declaradas:", ["checkValidity"], "checkValidity retorna true se o campo estiver em conformidade.", "if (!campoCep.____()) {\n    console.warn(\"CEP fora das regras\");\n}"),
          o("Ordene os passos de validação programática usando a Constraint Validation API:", ["Usuário clica em avançar para o próximo passo de um assistente multi-etapas","Script invoca etapa1Form.checkValidity() para testar conformidade dos campos","Se inválido, script invoca etapa1Form.reportValidity() para alertar o usuário","Se válido, script avança o usuário para a etapa seguinte com segurança"], "Uso programático de validação de restrições em interfaces passo a passo."),
          p("Associe o método da Constraint Validation API ao seu resultado:", [["campo.checkValidity()","Retorna true se o campo for válido ou false se violar restrições"],["campo.reportValidity()","Avalia validade, exibe o balão de erro nativo e focaliza o campo"],["form.checkValidity()","Verifica se todos os campos filhos contidos no form são válidos"],["evento \"invalid\"","Disparado no campo quando uma validação falha durante a checagem"]], "Métodos e eventos fundamentais da Constraint Validation API.")
        ]
      },
      {
        id: "javascript-c07-u7-l3-validity-state",
        title: "Diagnóstico detalhado com ValidityState",
        subtitle: "Erros · Inspecionando propriedades booleanas como valueMissing e typeMismatch",
        theory: "A propriedade elemento.validity expõe um objeto ValidityState com mais de oito propriedades booleanas de diagnóstico. Elas indicam a causa exata da falha, como valueMissing (campo required vazio), typeMismatch (e-mail mal formatado), patternMismatch ou tooShort, além de valid (true se tudo estiver correto).",
        questions: [
          q("Qual propriedade booleana de elemento.validity acusa que um campo required foi deixado em branco?", "validity.valueMissing", ["validity.emptyField","validity.requiredError"], "valueMissing é true quando o campo obrigatório não possui valor informado."),
          q("Quando a propriedade validity.typeMismatch se torna verdadeira?", "Quando o valor digitado não coincide com a sintaxe exigida pelo tipo (ex: e-mail inválido em type=\"email\")", ["Quando o campo tem tipo desconhecido","Quando o usuário digita números em text"], "typeMismatch detecta violações de tipagem sintática como email e url."),
          q("Qual propriedade do ValidityState resume se o campo está perfeitamente em conformidade?", "validity.valid (retorna true se todas as outras propriedades de erro forem false)", ["validity.success","validity.isOk"], "valid sintetiza o estado geral: se true, nenhuma restrição foi infringida."),
          q("Qual propriedade de validity indica que a quantidade de caracteres é menor que minlength?", "validity.tooShort", ["validity.underflow","validity.minLengthError"], "tooShort identifica que o usuário digitou menos caracteres que o exigido por minlength."),
          t("Qual propriedade booleana de validity indica falha de casamento com o atributo pattern?", ["patternMismatch"], "patternMismatch se torna true se o texto não satisfizer a regex do pattern.", "// falha de regex do pattern"),
          g("Complete o código verificando se o erro foi provocado por omissão de campo obrigatório:", ["valueMissing"], "valueMissing indica ausência de dado em controle required.", "if (campo.validity.____) {\n    mensagem = \"Preenchimento obrigatório\";\n}"),
          o("Ordene a análise diagnóstica do estado de validade de um campo:", ["Acessar o objeto de diagnóstico através de input.validity","Avaliar se input.validity.valid é true (se sim, campo aprovado)","Se false, inspecionar propriedades específicas como valueMissing e typeMismatch","Construir mensagem cirúrgica de auxílio conforme o tipo exato de falha"], "Procedimento de inspeção diagnóstica utilizando o objeto ValidityState."),
          p("Associe a propriedade do ValidityState à sua respectiva causa de erro:", [["validity.valueMissing","Campo marcado com required está completamente vazio"],["validity.typeMismatch","Sintaxe incompatível com o tipo exigido (ex: e-mail ou url)"],["validity.patternMismatch","Valor digitado não coincide com a expressão regular do pattern"],["validity.valid","Indica conformidade total com todas as restrições declaradas"]], "Mapeamento de propriedades de erro no objeto ValidityState.")
        ]
      },
      {
        id: "javascript-c07-u7-l4-custom-validity",
        title: "Mensagens customizadas com setCustomValidity",
        subtitle: "Personalização · Integrando regras de negócio complexas na validação nativa",
        theory: "O método el.setCustomValidity(mensagem) permite integrar validações complexas em JavaScript com a API nativa. Ao passar uma string não vazia, o campo se torna imediatamente inválido com aquela mensagem de erro personalizada. Para torná-lo válido novamente, basta passar uma string vazia (\"\").",
        questions: [
          q("Como marcar um campo como válido novamente após usar setCustomValidity?", "Invocando elemento.setCustomValidity(\"\") com uma string vazia", ["Chamando elemento.clearError()","Passando o valor null"], "Passar string vazia limpa o erro customizado e restaura a avaliação normal de validade."),
          q("O que acontece com a propriedade validity.customError quando setCustomValidity(\"Erro!\") é invocado?", "A propriedade validity.customError se torna true imediatamente", ["Permanece false","É excluída do objeto"], "customError sinaliza que a falha foi provocada deliberadamente por script."),
          q("Qual o caso de uso clássico para setCustomValidity em formulários?", "Confirmação de senhas iguais ou validação de dígitos verificadores de CPF e CNPJ", ["Mudança de tema claro para escuro","Controle de volume de vídeo"], "Permite que validações que o HTML não calcula nativamente participem do fluxo padrão."),
          q("Onde a mensagem definida em setCustomValidity é exibida?", "No balão nativo exibido pelo navegador ao chamar reportValidity() ou ao submeter o formulário", ["Apenas no console do desenvolvedor","Em uma janela pop-up alert()"], "A mensagem customizada substitui o texto genérico do navegador no balão nativo."),
          t("Qual método do elemento de entrada define uma mensagem de erro customizada para a validação nativa?", ["setCustomValidity"], "setCustomValidity integra regras de negócio JavaScript à validação nativa.", "// erro customizado nativo"),
          g("Complete o código limpando o erro customizado após o usuário corrigir a senha:", ["setCustomValidity(\"\")"], "Passar string vazia remove o erro customizado e valida o campo.", "campoConfirmacao.____;"),
          o("Ordene as etapas para validar confirmação de senha com setCustomValidity:", ["Ler os valores digitados nos campos senha e confirmacaoSenha","Se forem diferentes, executar confirmacaoSenha.setCustomValidity(\"As senhas não conferem\")","Se forem iguais, executar confirmacaoSenha.setCustomValidity(\"\") para limpar o erro","Invocar form.reportValidity() para atualizar a interface imediatamente"], "Padrão de validação de equivalência de senhas com a API nativa."),
          p("Associe a chamada de setCustomValidity ao seu efeito no controle:", [["campo.setCustomValidity(\"Mensagem\")","Torna o campo inválido e configura mensagem personalizada"],["campo.setCustomValidity(\"\")","Remove o erro customizado e restabelece a validade normal"],["validity.customError === true","Indica que existe mensagem de erro customizada ativa"],["campo.validationMessage","Lê o texto da mensagem de erro que será apresentada ao usuário"]], "Comportamentos da API de validação customizada nativa.")
        ]
      },
      {
        id: "javascript-c07-u7-l5-feedback-tempo-real",
        title: "Feedback visual e acessível em tempo real",
        subtitle: "UX · Apresentando erros inline com CSS e atributos semânticos aria-describedby",
        theory: "Balões nativos do navegador podem ter aparência inconsistente entre sistemas operacionais. Uma experiência moderna (UX) combina validação no evento input/blur com exibição de mensagens de erro inline no DOM, utilizando aria-invalid=\"true\" e aria-describedby para manter a acessibilidade universal.",
        questions: [
          q("Por que associar a mensagem de erro ao campo através de aria-describedby=\"id-erro\"?", "Permite que leitores de tela leiam automaticamente o texto de erro quando o usuário focar no campo", ["Muda a cor da borda para vermelho sem CSS","Acelera a digitação do usuário"], "aria-describedby vincula semanticamente o elemento de entrada à sua descrição de erro."),
          q("Qual atributo deve ser configurado no input quando ele se encontra em estado de erro?", "elemento.setAttribute(\"aria-invalid\", \"true\")", ["elemento.setAttribute(\"broken\", \"true\")","elemento.className = \"invalid-only\""], "aria-invalid comunica formalmente às tecnologias assistivas que o dado contém erro."),
          q("Por que validar campos no evento blur (ao sair) costuma ser melhor que no evento input (ao digitar)?", "Evita alertar o usuário sobre campos incompletos antes mesmo de ele terminar de digitar (evita frustração)", ["Porque o evento input é obsoleto","Porque blur consome menos CPU"], "Interromper o usuário enquanto digita (por exemplo, um e-mail pela metade) causa péssima usabilidade."),
          q("Como a pseudo-classe CSS :user-invalid ajuda na estilização moderna de campos?", "Aplica estilos de erro apenas após o usuário ter interagido com o campo, evitando telas cheias de vermelho", ["Corrige erros gramaticais automaticamente","Bloqueia cópia de texto"], ":user-invalid é a evolução do :invalid, ativando estilos somente após interação deliberada."),
          t("Qual atributo de acessibilidade informa aos leitores de tela que o valor atual do campo é inválido?", ["aria-invalid"], "aria-invalid=\"true\" sinaliza o estado de erro para tecnologias assistivas.", "// atributo semântico de erro"),
          g("Complete o código vinculando o campo ao elemento span que exibe a mensagem de erro:", ["aria-describedby"], "aria-describedby conecta o campo ao texto auxiliar de erro.", "campoCpf.setAttribute(\"____\", \"erro-cpf-msg\");"),
          o("Ordene os passos para exibir feedback inline acessível ao usuário:", ["Usuário conclui digitação e remove o foco do campo emitindo o evento blur","Script executa as validações e detecta que o dado informado está inválido","Configurar campo.setAttribute(\"aria-invalid\", \"true\")","Atualizar textContent da mensagem de erro e torná-la visível inline"], "Fluxo recomendado de validação inline com foco em acessibilidade e UX."),
          p("Associe o recurso de acessibilidade e CSS ao seu benefício:", [["aria-invalid=\"true\"","Informa tecnologias assistivas que o valor do controle contém erro"],["aria-describedby=\"idErro\"","Conecta a caixa de entrada à mensagem de texto de erro correspondente"],["Validação no evento blur","Apresenta erros somente após a conclusão da edição pelo usuário"],["CSS seletor :user-invalid","Estiliza bordas de erro sem poluir campos virgens ainda não tocados"]], "Pilares de acessibilidade e boa experiência do usuário em formulários.")
        ]
      }
    ],
    8: [
      {
        id: "javascript-c07-u8-l1-gestao-foco-tabindex",
        title: "Gerenciamento de foco e navegação com tabindex",
        subtitle: "Navegação · Controlando a ordem do teclado e foco programático com focus()",
        theory: "A acessibilidade por teclado depende de uma ordem lógica de tabulação. Elementos interativos nativos (links, botões, inputs) recebem foco naturalmente. Para elementos customizados, tabindex=\"0\" os insere na ordem normal de tabulação, enquanto tabindex=\"-1\" permite foco exclusivamente programático via el.focus().",
        questions: [
          q("Qual o efeito de configurar tabindex=\"-1\" em uma tag <div> customizada?", "Permite que o elemento receba foco via JavaScript com el.focus(), mas o exclui da tabulação com tecla Tab", ["Remove a div da renderização","Torna o elemento impossível de receber foco"], "tabindex=\"-1\" é ideal para contêineres de modais ou notificações focados via script."),
          q("Qual o efeito de configurar tabindex=\"0\" em um elemento não interativo como <span>?", "Insere o elemento na ordem natural de navegação por teclado da página através da tecla Tab", ["Coloca o elemento na primeira posição de toda a página","Cria um atalho com Alt"], "tabindex=\"0\" permite que elementos customizados participem do fluxo regular de foco."),
          q("Por que o uso de valores positivos em tabindex (como tabindex=\"1\" ou tabindex=\"2\") é considerado antipadrão?", "Porque quebra a ordem natural de leitura do documento, forçando saltos imprevisíveis na navegação", ["Porque bloqueia leitores de tela","Porque é proibido pelo HTML5"], "Valores positivos desorganizam a sequência lógica de navegação do usuário de teclado."),
          q("Qual método JavaScript move programaticamente o foco do usuário para determinado elemento?", "elemento.focus()", ["elemento.activateFocus()","document.setFocus(elemento)"], "focus() direciona o cursor e o teclado para o controle especificado."),
          t("Qual valor de atributo tabindex permite receber foco via script (el.focus()) mas ignora a tecla Tab?", ["-1"], "tabindex=\"-1\" habilita foco programático sem poluir a navegação sequencial.", "// foco apenas programático"),
          g("Complete o código movendo o foco do teclado para o modal aberto:", ["focus"], "focus() transfere a atenção do teclado e leitor de tela para o elemento.", "janelaModal.____();"),
          o("Ordene os passos de gerenciamento de foco ao abrir uma caixa de diálogo modal:", ["Salvar a referência do elemento que disparou o modal com document.activeElement","Exibir o elemento modal na tela alterando classes ou estilos","Garantir que o modal ou seu primeiro campo possua tabindex=\"-1\" ou interatividade","Transferir o foco ativamente para o modal invocando elemento.focus()"], "Roteiro de captura e transferência de foco na abertura de janelas sobrepostas."),
          p("Associe o valor do atributo tabindex ao seu comportamento de navegação:", [["tabindex=\"0\"","Insere elemento no fluxo sequencial regular da tecla Tab"],["tabindex=\"-1\"","Permite foco exclusivamente via script (.focus()) sem entrar no Tab"],["tabindex positivo (ex: 5)","Antipadrão que quebra a ordem natural de tabulação da página"],["document.activeElement","Retorna a referência do elemento que detém o foco no momento"]], "Comportamentos de controle de foco e navegação sequencial por teclado.")
        ]
      },
      {
        id: "javascript-c07-u8-l2-atributos-aria-essenciais",
        title: "Atributos ARIA essenciais para interfaces dinâmicas",
        subtitle: "Semântica · Comunicando estados dinâmicos como aria-expanded e aria-hidden",
        theory: "Aplicações dinâmicas utilizam atributos WAI-ARIA para comunicar estados a leitores de tela. Atributos como aria-expanded (\"true\"/\"false\") indicam menus abertos, aria-hidden oculta nós decorativos das tecnologias assistivas e role define a função semântica de elementos interativos customizados.",
        questions: [
          q("Qual atributo ARIA deve ser alternado ao abrir e fechar um menu sanfona (accordion)?", "aria-expanded alternando entre as strings \"true\" e \"false\"", ["aria-open","aria-visible"], "aria-expanded comunica a tecnologias assistivas se o painel colapsável está expandido."),
          q("Qual atributo deve ser aplicado a ícones decorativos para que não sejam lidos por leitores de tela?", "aria-hidden=\"true\"", ["role=\"none\" apenas","aria-ignore=\"true\""], "aria-hidden=\"true\" remove o elemento da árvore de acessibilidade poupando ruído auditivo."),
          q("Por que atributos booleanos ARIA devem receber strings (\"true\"/\"false\") em setAttribute e não booleanos puros?", "Porque no DOM os atributos HTML são sempre serializados como strings na marcação", ["Porque leitores de tela rejeitam booleanos","Porque gera SyntaxError"], "setAttribute(\"aria-expanded\", \"true\") garante conformidade com a especificação W3C."),
          q("Qual a primeira regra de ouro do uso de ARIA no desenvolvimento web?", "Não use ARIA se você puder usar um elemento nativo do HTML com a semântica correta", ["Sempre use ARIA em todas as divs","ARIA substitui CSS"], "Tags nativas (<button>, <nav>, <dialog>) já possuem acessibilidade pronta de fábrica."),
          t("Qual atributo ARIA comunica se um elemento expansível ou menu colapsável está aberto?", ["aria-expanded"], "aria-expanded informa o estado de expansão de elementos retráteis.", "// estado expandido ou recolhido"),
          g("Complete o código alternando o estado de expansão do menu para recolhido:", ["\"false\""], "aria-expanded recebe a string \"false\" quando fechado.", "botaoMenu.setAttribute(\"aria-expanded\", ____);"),
          o("Ordene as ações de atualização semântica ao expandir um painel sanfona:", ["Usuário clica no botão de cabeçalho da sanfona","Script verifica o estado atual lendo botao.getAttribute(\"aria-expanded\")","Inverter o estado atribuindo botao.setAttribute(\"aria-expanded\", \"true\")","Remover atributo hidden do painel de conteúdo tornando-o visível"], "Sincronização entre visibilidade visual e estados semânticos ARIA."),
          p("Associe o atributo ARIA à sua finalidade semântica:", [["aria-expanded","Informa se um menu, gaveta ou componente colapsável está aberto"],["aria-hidden=\"true\"","Oculta nós puramente decorativos da árvore de acessibilidade"],["aria-controls=\"idPainel\"","Identifica o ID do elemento controlado por aquele acionador"],["role=\"alert\"","Indica mensagem urgente de alta prioridade que requer leitura imediata"]], "Atributos ARIA cardinais para sincronização de estados de interface.")
        ]
      },
      {
        id: "javascript-c07-u8-l3-live-regions-anuncios",
        title: "Regiões dinâmicas com aria-live",
        subtitle: "Notificações · Anunciando atualizações de tela em tempo real sem mover o foco",
        theory: "Quando dados mudam assincronamente (como contadores de carrinho, alertas ou mensagens de sucesso), leitores de tela não percebem a mudança a menos que a área use aria-live. Com aria-live=\"polite\", a novidade é lida na próxima pausa; com aria-live=\"assertive\", a leitura atual é interrompida imediatamente.",
        questions: [
          q("Qual a diferença fundamental entre aria-live=\"polite\" e aria-live=\"assertive\"?", "polite aguarda o leitor de tela concluir a fala atual; assertive interrompe a fala imediatamente", ["polite é para celulares; assertive para desktops","assertive toca um alarme sonoro"], "polite é a escolha recomendada para quase todas as atualizações sem urgência extrema."),
          q("Como funciona a detecção de mudanças dentro de uma região aria-live pelo navegador?", "O leitor de tela monitora alterações de texto injetadas dentro daquele contêiner e as vocaliza", ["O leitor tira uma foto da tela","O navegador recarrega a página em silêncio"], "Mutações de texto nos nós filhos da live region disparam anúncios sonoros automáticos."),
          q("Por que uma live region deve existir previamente na página antes de ter seu conteúdo atualizado?", "Se a tag com aria-live for injetada e preenchida no mesmo instante, o leitor pode ignorar o anúncio", ["Porque gasta muita memória","Porque exige compilação prévia de CSS"], "O contêiner deve estar registrado na árvore de acessibilidade antes da mutação de texto."),
          q("Qual papel semântico (role) nativo equivale a uma região com aria-live=\"assertive\"?", "role=\"alert\"", ["role=\"status\"","role=\"banner\""], "role=\"alert\" comunica mensagens cruciais e possui prioridade assertiva implícita."),
          t("Qual valor de aria-live aguarda educadamente uma pausa do leitor de tela antes de anunciar?", ["polite"], "aria-live=\"polite\" é a configuração mais civilizada e comum para notificações.", "// anúncio em pausa oportuna"),
          g("Complete o código HTML definindo uma região de anúncios educada para status de compras:", ["polite"], "aria-live=\"polite\" anuncia atualizações sem cortar falas ativas.", "<div id=\"notificacoes\" aria-live=\"____\"></div>"),
          o("Ordene os passos para anunciar com sucesso uma notificação de sucesso via live region:", ["Garantir que um contêiner com aria-live=\"polite\" já esteja presente no HTML","Operação assíncrona é concluída com sucesso no script","Injetar texto seguro com el.textContent = \"Dados gravados com sucesso\"","Leitor de tela detecta mutação e vocaliza a mensagem na próxima oportunidade"], "Padrão estável para notificação sonora de atualizações dinâmicas na interface."),
          p("Associe a configuração de live region ao seu comportamento vocal:", [["aria-live=\"polite\"","Anuncia a mensagem de texto na próxima pausa natural do leitor"],["aria-live=\"assertive\"","Interrompe imediatamente qualquer fala em andamento para anunciar"],["role=\"status\"","Equivalente semântico comum configurado com modo polite por padrão"],["role=\"alert\"","Equivalente semântico para avisos críticos com prioridade máxima"]], "Diferenças de urgência e comportamento em regiões dinâmicas WAI-ARIA.")
        ]
      },
      {
        id: "javascript-c07-u8-l4-teclado-atalhos-escape",
        title: "Navegação por teclado e captura de teclas essenciais",
        subtitle: "Usabilidade · Tratando Escape, setas direcionais e teclas de ação",
        theory: "Uma interface plenamente acessível permite operar todos os recursos sem o mouse. Manipuladores de keydown devem interceptar teclas essenciais: a tecla \"Escape\" para fechar modais e gavetas, as setas direcionais para menus e abas, e a tecla \"Enter\" ou \"Space\" para ativar controles customizados.",
        questions: [
          q("Qual propriedade moderna do objeto de evento de teclado deve ser lida para inspecionar a tecla?", "event.key (retornando nomes padronizados como \"Escape\", \"ArrowDown\", \"Enter\")", ["event.keyCode","event.which"], "event.key é a especificação padrão recomendada, aposentando códigos numéricos ambíguos."),
          q("Qual comportamento de teclado é universalmente esperado ao abrir qualquer caixa de diálogo modal?", "Pressionar a tecla Escape deve fechar o modal e devolver o foco ao botão que o acionou", ["Pressionar Backspace deve reiniciar o site","Pressionar Tab deve recarregar a tela"], "O cancelamento com Escape é um requisito fundamental de acessibilidade segundo o W3C."),
          q("Ao criar um botão personalizado usando uma <div> com role=\"button\", quais teclas devem ativá-lo?", "Tanto a tecla Enter quanto a tecla Space (\" \") devem acionar a ação do botão", ["Apenas o botão esquerdo do mouse","Qualquer tecla alfanumérica"], "Botões nativos respondem a Enter e Space; botões customizados devem replicar isso fielmente."),
          q("Por que é prudente verificar event.defaultPrevented ou não cancelar eventos de teclas globais desnecessariamente?", "Para não sabotar atalhos nativos do navegador como Ctrl+R (recarregar) ou F12 (DevTools)", ["Porque a memória trava","Porque desliga o teclado"], "Capturar teclas indevidamente frustra o usuário e impede navegação padrão do sistema."),
          t("Qual string de event.key representa o pressionamento da tecla Esc?", ["Escape"], "A string padronizada \"Escape\" identifica a tecla de escape no teclado.", "// tecla de escape"),
          g("Complete o código fechando o modal quando o usuário pressionar a tecla Escape:", ["Escape"], "Comparar com event.key === \"Escape\" intercepta o fechamento.", "if (event.key === \"____\") {\n    fecharModal();\n}"),
          o("Ordene as etapas de atendimento a um atalho de fechamento por teclado:", ["Ouvinte escuta evento keydown na janela ou modal ativo","Inspecionar se event.key possui o valor estrito \"Escape\"","Executar rotina de fechamento ocultando o modal visualmente","Restaurar o foco do teclado no elemento original que abriu o diálogo"], "Fluxo completo de cancelamento e fechamento acessível via tecla Escape."),
          p("Associe a tecla ao seu comportamento padrão em componentes acessíveis:", [["event.key === \"Escape\"","Fecha caixas de diálogo modais, menus suspensos ou painéis flutuantes"],["event.key === \"Enter\"","Confirma formulários ou aciona botões e links interativos"],["event.key === \" \"","Aciona botões ou alterna caixas de seleção e checkboxes"],["event.key === \"ArrowDown\"","Navega para a próxima opção em menus, abas ou listas personalizadas"]], "Convenções universais de controle por teclado para interfaces ricas.")
        ]
      },
      {
        id: "javascript-c07-u8-l5-focus-trap-restauracao",
        title: "Retenção de foco (focus trap) e restauração",
        subtitle: "Modais · Confinando a navegação por teclado e retornando ao gatilho original",
        theory: "Um modal acessível deve implementar Focus Trap: enquanto estiver aberto, pressionar Tab no último elemento deve circular o foco de volta para o primeiro, e Shift+Tab no primeiro elemento deve levar ao último. Ao fechar o diálogo, o foco deve ser obrigatoriamente restaurado no botão que o disparou.",
        questions: [
          q("O que é o padrão Focus Trap (retenção de foco) em janelas modais?", "Uma técnica que impede que o foco do teclado escape do modal e atinja elementos em segundo plano", ["Um travamento do mouse na tela","Uma criptografia de campos de senha"], "O foco circula indefinidamente entre os elementos interativos contidos no modal enquanto ele estiver ativo."),
          q("O que acontece se um modal não implementar focus trap ao ser navegado por usuário cego ou de teclado?", "O usuário pressiona Tab e navega invisivelmente por links e botões ocultos atrás do modal", ["O leitor de tela encerra a leitura","O navegador gera erro de foco"], "Sem o trap, o usuário perde o contexto navegando pela página de fundo oculta sob o modal."),
          q("Como tratar a navegação reversa (Shift + Tab) quando o foco estiver no primeiro elemento do modal?", "Interceptar a tecla e mover o foco ativamente para o último elemento interativo do modal", ["Bloquear o teclado","Fechar o modal imediatamente"], "Isso fecha o ciclo contínuo de navegação em ambas as direções."),
          q("Por que é mandatório guardar document.activeElement antes de abrir o modal e restaurá-lo ao fechar?", "Para devolver o usuário exatamente ao ponto da página onde ele estava antes de abrir o diálogo", ["Para salvar o histórico no banco de dados","Para liberar espaço de CSS"], "Garante continuidade ergonômica sem obrigar o usuário a tabilar a página inteira novamente."),
          t("Qual propriedade de document referencia o elemento que detém o foco no momento exato da chamada?", ["activeElement","document.activeElement"], "document.activeElement captura o nó focado atualmente.", "// nó que possui o foco"),
          g("Complete o código salvando o elemento gatilho antes de abrir o diálogo:", ["document.activeElement"], "Salvar activeElement permite restaurar o foco após o fechamento.", "const elementoGatilho = ____;"),
          o("Ordene o ciclo completo de gerenciamento de foco em caixas modais acessíveis:", ["Salvar o elemento gatilho atual: const gatilho = document.activeElement","Abrir o modal e transferir o foco para seu primeiro controle interativo","Interceptar a tecla Tab circulando o foco entre os limites interno do modal (trap)","Ao fechar, remover ouvintes e invocar gatilho.focus() restaurando a posição original"], "Ciclo de vida completo de retenção e devolução de foco em modais."),
          p("Associe o passo do Focus Trap à sua respectiva responsabilidade técnica:", [["const gatilho = document.activeElement","Registra o nó original para onde o foco deve retornar ao fim"],["Tab no último elemento focável","Redireciona o foco imediatamente de volta para o primeiro elemento"],["Shift + Tab no primeiro elemento","Redireciona o foco em sentido inverso para o último elemento"],["gatilho.focus()","Restaura a orientação do usuário na página de origem após fechar"]], "Etapas críticas do padrão Focus Trap e restauração ergonômica de foco.")
        ]
      }
    ]
  });
})();
