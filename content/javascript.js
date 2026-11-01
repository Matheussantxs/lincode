/* Authored JavaScript core seeds (16 chapters). The 40-lesson chapter target is NOT yet fully authored.
 * Adapted from authored curriculum seeds in scripts/content-js-java.mjs to the 8-unit chapter structure.
 */
(function () {
  'use strict';
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
  const o = (prompt, steps, explanation, code) => {
    const order = steps.map((_, i) => i).reverse();
    return {
      type: 'order',
      prompt,
      options: order.map(i => steps[i]),
      answer: steps.map((_, i) => order.indexOf(i)),
      explanation,
      ...(code ? { code } : {})
    };
  };
  const p = (prompt, pairs, explanation) => ({ type: 'pairs', prompt, pairs, explanation });
  const chapters = [];
  function chapter(title, unitNames, lessonTitle, theory, activities) {
    const n = chapters.length + 1;
    const prefix = `javascript-c${String(n).padStart(2, '0')}`;
    chapters.push({
      id: prefix,
      title,
      description: theory.split('. ')[0] + '.',
      targetLessonCount: 40,
      authoringStatus: 'partial',
      reviewStatus: 'technical-review-pending',
      units: unitNames.map((name, i) => ({
        id: `${prefix}-u${i + 1}`,
        title: name,
        objective: `Aplicar ${name.toLowerCase()} em um problema de JavaScript e explicar o resultado.`,
        targetLessonCount: 5,
        authoringStatus: i === 0 ? 'partial' : 'planned',
        lessons: i === 0 ? [{
          id: `${prefix}-u1-l1`,
          title: lessonTitle,
          theory,
          activities: activities.map((a, j) => ({ ...a, id: `${prefix}-u1-l1-a${j + 1}` }))
        }] : []
      }))
    });
  }

  const c01Code = 'const nome = "Lia";\nconst minutos = 5;\nconsole.log(nome);\nconsole.log(minutos * 2);';
  chapter(
    'Introdução à linguagem, navegador e ambiente',
    ['Web e JavaScript', 'HTML, CSS e JavaScript', 'Console do navegador', 'Primeira saída', 'Editor e arquivos', 'Erros no console', 'Scripts e páginas', 'Primeiro programa'],
    'Do arquivo ao console',
    'JavaScript é uma linguagem executada em ambientes como navegadores e Node.js. A linguagem define valores e operações; o ambiente fornece recursos como document no navegador ou acesso a arquivos no Node.js. Um script pode mostrar resultados no console sem depender do DOM.',
    [
      t('Qual nome a primeira chamada de console.log mostra no script inicial?', 'Lia', 'A variável nome contém a string Lia; aspas delimitam o texto, mas não fazem parte do valor exibido.', c01Code),
      t('Qual número a segunda chamada de console.log exibe?', '10', 'A multiplicação usa o valor numérico 5 e produz 10.', c01Code),
      q('Para que serve console.log neste primeiro script?', 'Exibir informações para inspeção no console', ['Criar automaticamente uma página HTML', 'Salvar uma conta no servidor remoto'], 'console.log envia informações ao console do ambiente; ele não cria interface nem persistência.', c01Code),
      q('Em uma página web, onde consultar as saídas de console.log?', 'No console das ferramentas de desenvolvimento', ['Na barra de endereço do navegador', 'Apenas no código-fonte HTML bruto'], 'As ferramentas de desenvolvimento do navegador têm um console que exibe as mensagens do script.'),
      p('Relacione cada recurso do ecossistema JavaScript ao seu papel.', [['JavaScript', 'Linguagem que descreve valores e comportamento'], ['Navegador', 'Ambiente que oferece a página web e o DOM'], ['Node.js', 'Ambiente que executa JavaScript fora da página']], 'Linguagem e ambiente são conceitos distintos; as APIs disponíveis dependem do ambiente.'),
      q('O comando document.querySelector existe por fazer parte de qual recurso?', 'Do DOM oferecido pelo navegador', ['De uma operação matemática nativa da linguagem', 'Do banco de dados interno do JavaScript'], 'document é uma API de documentos do ambiente web; ele não existe automaticamente em todo runtime.'),
      g('Complete a declaração de uma ligação que não será reatribuída.', 'const', 'const impede reatribuir a ligação, mas não torna imutável todo objeto associado.', '____ nome = "Lia";'),
      o('Ordene os passos de um primeiro experimento local no navegador.', ['Escrever o script', 'Abrir a página que carrega o script', 'Ler o resultado no console', 'Alterar uma linha e testar novamente'], 'Escrevemos, executamos, observamos a saída e usamos essa observação para o próximo teste.')
    ]
  );

  const c02Code = 'const idade = 18;\nconst permitido = idade >= 18;\nconsole.log(permitido ? "permitido" : "restrito");';
  chapter(
    'Lógica, algoritmos e fluxogramas',
    ['Entradas e saídas', 'Sequência de passos', 'Símbolos de fluxogramas', 'Montagem de fluxos', 'Decisões', 'Repetições', 'Rastreamento de variáveis', 'Validação de algoritmos'],
    'Uma decisão de acesso desenhada',
    'Um algoritmo deve definir entrada, processamento e saída com clareza. Em um fluxograma, paralelogramo representa entrada ou saída, retângulo representa processamento, losango representa decisão e oval marca início ou fim. Considere receber uma idade inteira e permitir acesso a partir de 18 anos.',
    [
      t('Qual palavra será exibida quando idade vale 18?', 'permitido', 'A comparação >= inclui a igualdade: 18 satisfaz o limite mínimo.', c02Code),
      t('Qual palavra será exibida se idade mudar para 17?', 'restrito', '17 >= 18 é falso; o operador ternário escolhe a segunda alternativa.', c02Code),
      q('Qual dado representa a entrada do algoritmo de acesso?', 'A variável idade recebida', ['A palavra permitido exibida ao final', 'O próprio objeto console'], 'A idade recebida é o dado de entrada usado para tomar a decisão.', c02Code),
      p('Associe cada símbolo de fluxograma à sua função.', [['Oval', 'Início ou fim do fluxo'], ['Losango', 'Decisão lógica com ramos'], ['Retângulo', 'Etapa de processamento'], ['Paralelogramo', 'Operação de entrada ou saída']], 'Os formatos distinguem a função de cada passo; as setas mostram a direção.'),
      o('Ordene o caminho geral do algoritmo de verificação de idade.', ['Início', 'Ler idade', 'Avaliar idade >= 18', 'Exibir a mensagem escolhida', 'Fim'], 'É necessário ler a entrada antes de avaliar a decisão e produzir a saída.'),
      q('Quantos ramos da decisão são percorridos em uma única execução desse exemplo?', 'Apenas um: o ramo verdadeiro ou o falso', ['Os dois ramos ao mesmo tempo', 'Nenhum, porque há uma comparação'], 'Cada execução escolhe exatamente um ramo conforme o resultado booleano.'),
      q('Por que testar as idades 17, 18 e 19 é útil na validação?', 'Verifica valores próximos à fronteira, incluindo a igualdade', ['Prova que qualquer entrada possível no mundo está correta', 'Dispensa validar o tipo da entrada'], 'Testes de fronteira encontram erros clássicos como usar > quando a regra exige >=.'),
      g('Complete o operador relacional que inclui o limite de 18 anos.', '>=', 'Maior ou igual inclui quem tem exatamente 18 anos.', 'const permitido = idade ____ 18;')
    ]
  );

  const c03Code = 'const entrada = "10";\nlet total = Number(entrada) + 2;\nconst itens = ["caderno"];\nitens.push("lápis");\nconsole.log(total, entrada + 2, itens.length);';
  chapter(
    'Variáveis, tipos e operadores',
    ['Let e const', 'Números', 'Strings', 'Booleanos', 'Null e undefined', 'Conversões', 'Comparações', 'Expressões compostas'],
    'Evite confundir texto com número',
    'JavaScript possui valores de diferentes tipos primitivos e objetos. O operador + pode somar números ou concatenar strings, por isso conversões explícitas deixam a intenção mais clara. O operador === compara sem coerção implícita, e const impede reatribuir a variável sem congelar mutações internas de um array.',
    [
      t('Qual é o valor numérico final de total no trecho?', '12', 'Number converte a string "10" em número; a soma numérica com 2 produz 12.', c03Code),
      t('Qual texto resulta da expressão entrada + 2?', '102', 'Como entrada é string, o operador + concatena "10" com "2".', c03Code),
      q('Por que itens.push("lápis") funciona apesar de itens ser declarado com const?', 'A referência não foi reatribuída; apenas o array interno mudou', ['const proíbe somente valores numéricos', 'push ignora todas as regras de escopo da linguagem'], 'A ligação continua apontando para o mesmo array; const não congela seu conteúdo.', c03Code),
      q('Qual é o resultado da comparação estrita "10" === 10 em JavaScript?', 'false', ['true', 'Uma exceção de tipo em tempo de execução'], 'String e número são tipos diferentes; === não converte um operando no outro.'),
      g('Complete a conversão explícita de texto numérico para número.', 'Number', 'Number cria um valor numérico a partir de uma string numérica válida.', 'const idade = ____("18");'),
      q('Como verificar corretamente que Number("abc") resultou em NaN?', 'Number.isNaN(resultado)', ['resultado === NaN', 'resultado === "NaN"'], 'NaN não é igual nem a si mesmo com ===; Number.isNaN testa esse valor especial.'),
      p('Associe cada literal JavaScript ao seu tipo.', [['"false"', 'string'], ['false', 'boolean'], ['10', 'number']], 'Aspas fazem toda a diferença: "false" é texto não vazio, não booleano.'),
      o('Ordene o processamento seguro de uma quantidade vinda de um campo de texto.', ['Ler a string bruta do campo', 'Converter explicitamente com Number()', 'Verificar com Number.isNaN() se a conversão falhou', 'Calcular o total somente com número válido'], 'Converter e validar antes do cálculo evita concatenações acidentais e propagação de NaN.')
    ]
  );

  const c04Code = 'let soma = 0;\nfor (let i = 1; i <= 4; i++) {\n  if (i === 3) continue;\n  soma += i;\n}\nconsole.log(soma);';
  chapter(
    'Condições, laços e rastreamento',
    ['If e else', 'Switch', 'Operadores lógicos', 'For', 'While', 'Break e continue', 'Acumuladores', 'Rastreamento'],
    'Acompanhe cada iteração',
    'Um laço altera o estado das variáveis a cada passagem. A instrução continue pula o restante da iteração atual, enquanto break encerra o laço imediatamente. Como a condição é verificada repetidamente, acompanhar uma tabela de rastreamento evita erros de limite.',
    [
      t('Qual valor final de soma será exibido no console?', '7', 'Entram na soma 1, 2 e 4; o continue pula a adição quando i vale 3.', c04Code),
      t('Quantas vezes o corpo do for é iniciado nessa execução?', '4', 'O corpo começa para i igual a 1, 2, 3 e 4, mesmo que i === 3 acione continue.', c04Code),
      q('Se continue fosse trocado por break em if (i === 3), qual seria a soma final?', '3', ['7', '10'], 'break encerraria o laço quando i chegasse a 3; apenas 1 e 2 teriam sido somados.', c04Code),
      g('Complete a condição para incluir o valor 4 na repetição.', '<=', 'O operador <= permite executar a iteração com o próprio limite superior.', 'for (let i = 1; i ____ 4; i++) { soma += i; }'),
      q('Se a condição fosse i < 4 mantendo continue para i === 3, qual seria a soma?', '3', ['6', '7'], 'A iteração i = 4 não ocorreria, e i = 3 continuaria pulada, restando 1 + 2.'),
      o('Ordene uma passagem normal do laço for após a inicialização.', ['Testar a condição de continuidade', 'Executar o corpo do laço', 'Incrementar a variável de controle i', 'Voltar ao teste da condição'], 'O teste precede o corpo; ao fim do bloco ocorre o incremento e o próximo teste.'),
      p('Relacione cada comando ou conceito de repetição ao seu efeito.', [['continue', 'Pula o restante da iteração atual e vai à atualização'], ['break', 'Interrompe o laço atual imediatamente'], ['Acumulador', 'Variável que reúne resultados parciais como soma']], 'Distinguir interrupção total, pulo de iteração e acumulação evita bugs de fluxo.'),
      q('Qual prática ajuda a diagnosticar um erro lógico em um laço?', 'Registrar i e soma a cada passagem em um rastreamento', ['Alterar o limite aleatoriamente até parar de falhar', 'Remover a condição de parada do for'], 'Uma tabela de rastreamento mostra como o estado muda passo a passo.')
    ]
  );

  const c05Code = 'function criarContador(inicio = 0) {\n  let valor = inicio;\n  return function () {\n    valor += 1;\n    return valor;\n  };\n}\nconst a = criarContador(2);\nconst b = criarContador();\nconsole.log(a(), a(), b());';
  chapter(
    'Funções, escopo e closures',
    ['Parâmetros', 'Retorno', 'Arrow functions', 'Escopo léxico', 'Closures', 'Callbacks', 'Funções puras', 'Composição'],
    'Uma função que lembra seu estado',
    'Uma closure mantém acesso ao ambiente léxico em que a função foi criada, mesmo depois que a função externa terminou. Assim, duas chamadas de uma função fábrica criam estados independentes. Parâmetros padrão entram em ação quando o argumento é omitido ou undefined.',
    [
      t('Qual valor a primeira chamada de a() retorna?', '3', 'O estado de a começa em 2 e é incrementado em 1 antes do retorno.', c05Code),
      t('Qual valor a segunda chamada de a() retorna?', '4', 'A closure conserva o valor 3 da chamada anterior e soma mais 1.', c05Code),
      t('Qual valor b() retorna nessa execução?', '1', 'b possui outro ambiente léxico independente, iniciado com o padrão 0.', c05Code),
      q('É possível ler diretamente a variável valor fora de criarContador?', 'Não; o identificador valor pertence ao escopo interno da função', ['Sim, toda variável declarada com let é global', 'Sim, depois que criarContador executa return'], 'O escopo léxico restringe onde o identificador valor está visível.', c05Code),
      p('Associe cada mecanismo de funções em JavaScript ao seu papel.', [['Parâmetro padrão', 'Valor assumido quando o argumento é omitido'], ['Closure', 'Função que preserva acesso ao escopo léxico de criação'], ['Retorno', 'Valor entregue de volta a quem invocou a função']], 'Esses três mecanismos cooperam na fábrica de contadores, mas têm papéis distintos.'),
      q('Por que os contadores a e b não interferem um no outro?', 'Cada chamada de criarContador cria uma nova ligação valor', ['const copia automaticamente o código da função', 'console.log reinicia variáveis locais'], 'Cada invocação da fábrica instancia seu próprio ambiente léxico.'),
      g('Complete a instrução que entrega a função interna ao chamador.', 'return', 'Sem retornar a função interna, quem chamou criarContador receberia undefined.', 'function criarContador(inicio = 0) {\n  let valor = inicio;\n  ____ function () { return ++valor; };\n}'),
      o('Ordene o ciclo de vida da closure a = criarContador(2) até retornar 3.', ['Invocar criarContador(2) inicializando valor com 2', 'Retornar a função interna ligada a esse escopo', 'Chamar a() incrementando valor para 3', 'Devolver o novo número 3 ao chamador'], 'A captura ocorre na criação da função interna e a mutação acontece a cada chamada de a().')
    ]
  );

  const c06Code = 'const pedidos = [\n  { cliente: "Ana", total: 20, pago: true },\n  { cliente: "Bia", total: 30, pago: false },\n  { cliente: "Caio", total: 10, pago: true }\n];\nconst pagos = pedidos.filter(p => p.pago);\nconst nomes = pagos.map(p => p.cliente);\nconst receita = pagos.reduce((s, p) => s + p.total, 0);';
  chapter(
    'Arrays, objetos e transformação de dados',
    ['Índices', 'Métodos de arrays', 'Objetos', 'Desestruturação', 'Map', 'Filter', 'Reduce', 'Dados imutáveis'],
    'Transforme uma lista de pedidos',
    'Em pipelines de arrays, filter seleciona elementos que atendem a um critério, map transforma cada item em um novo valor de mesmo comprimento e reduce acumula um único resultado. Novo array não significa cópia profunda: referências aos objetos internos continuam compartilhadas.',
    [
      t('Quantos objetos existem no array pagos?', '2', 'Ana e Caio têm pago igual a true; o pedido de Bia é filtrado.', c06Code),
      t('Qual é o número final calculado em receita?', '30', 'Somamos os totais pagos de Ana (20) e Caio (10) partindo de 0.', c06Code),
      q('Qual array corresponde ao valor de nomes?', '["Ana", "Caio"]', ['["Bia"]', '[20, 10]'], 'map projeta apenas a propriedade cliente de cada pedido já filtrado em pagos.', c06Code),
      p('Associe cada método de array à transformação que ele expressa.', [['filter', 'Selecionar subconjunto de elementos por predicado'], ['map', 'Transformar cada elemento em um item correspondente'], ['reduce', 'Acumular todos os elementos em um único valor']], 'Escolher o método adequado comunica imediatamente o formato do resultado.'),
      q('A comparação pagos[0] === pedidos[0] avalia para qual booleano?', 'true', ['false', 'Lança erro de referência'], 'filter cria um novo array externo, mas preserva as referências aos objetos selecionados.', c06Code),
      g('Complete o valor inicial neutro da soma em reduce.', '0', 'Iniciar em 0 garante soma numérica correta e evita falha caso pagos esteja vazio.', 'const receita = pagos.reduce((s, p) => s + p.total, ____);'),
      q('Qual resultado reduce((s, p) => s + p.total, 0) devolve para uma lista vazia?', '0', ['undefined', 'Uma exceção TypeError'], 'Quando não há elementos para iterar, reduce devolve diretamente o acumulador inicial.'),
      o('Ordene o pipeline para obter a soma apenas dos pedidos pagos.', ['Partir da lista completa pedidos', 'Filtrar os itens com p.pago verdadeiro', 'Acumular p.total com reduce iniciando em 0', 'Usar o número resultante em receita'], 'Filtrar antes de acumular mantém cada etapa simples e legível.')
    ]
  );

  const c07Code = 'const form = document.querySelector("#cadastro");\nconst campo = document.querySelector("#nome");\nconst mensagem = document.querySelector("#mensagem");\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  const nome = campo.value.trim();\n  mensagem.textContent = nome ? "Olá, " + nome : "Informe seu nome";\n});';
  chapter(
    'DOM, eventos e formulários',
    ['Seletores', 'Texto e atributos', 'Criar elementos', 'Eventos', 'Delegação', 'Formulários', 'Validação', 'Acessibilidade'],
    'Receba texto sem interpretar HTML',
    'O DOM representa a estrutura viva da página HTML. Um formulário emite o evento submit tanto por clique quanto pela tecla Enter; preventDefault impede o recarregamento padrão para que o script valide os dados. Usar textContent insere texto puro sem interpretá-lo como marcação HTML.',
    [
      q('Qual evento captura o envio do formulário inclusive ao pressionar Enter?', 'submit no elemento form', ['mouseover no campo de texto', 'scroll na janela principal'], 'Ouvir submit no formulário preserva a acessibilidade por teclado.', c07Code),
      t('Qual mensagem aparece se a pessoa digitar apenas espaços e enviar?', 'Informe seu nome', 'trim() remove espaços nas pontas, resultando em string vazia (falsy).', c07Code),
      q('Qual é sempre o tipo de campo.value lido de um input HTML?', 'string', ['number quando há dígitos', 'HTMLElement'], 'Valores de inputs chegam como string; números exigem conversão explícita.'),
      q('Por que gravar a saudação em mensagem.textContent em vez de innerHTML?', 'O texto do usuário não será interpretado como tags HTML', ['textContent executa scripts embutidos com segurança', 'textContent valida CPF e e-mail sozinho'], 'textContent trata caracteres como < e > literalmente, prevenindo injeção de HTML (XSS).', c07Code),
      g('Complete a chamada que cancela a navegação padrão do formulário.', 'preventDefault', 'preventDefault impede o envio HTTP tradicional para o script assumir o fluxo.', 'form.addEventListener("submit", event => {\n  event.____();\n});'),
      q('Se o seletor #cadastro não existir na página, o que document.querySelector retorna?', 'null', ['Um formulário vazio recém-criado', 'false'], 'querySelector devolve null quando nenhum elemento casa com o seletor.'),
      p('Associe cada elemento de interface acessível à sua responsabilidade.', [['label associado ao campo', 'Dar nome acessível ao controle de entrada'], ['button type="submit"', 'Disparar o envio padrão do formulário'], ['Elemento de mensagem de status', 'Exibir feedback textual ao usuário']], 'Semântica HTML correta facilita navegação por teclado e leitores de tela.'),
      o('Ordene o tratamento seguro do evento submit no navegador.', ['Interceptar submit com event.preventDefault()', 'Ler campo.value e limpar extremidades com trim()', 'Decidir a mensagem conforme o nome estar preenchido ou vazio', 'Atualizar mensagem.textContent com texto seguro'], 'Cancelar o recarregamento, higienizar a leitura e escrever via textContent formam o fluxo básico.')
    ]
  );

  const c08Code = 'class Contador {\n  constructor(inicio = 0) { this.valor = inicio; }\n  incrementar() { this.valor += 1; return this.valor; }\n}\nconst a = new Contador(3);\nconst b = new Contador();\na.incrementar();\nconsole.log(a.valor, b.valor);';
  chapter(
    'Classes, objetos e protótipos',
    ['Objetos e identidade', 'Construtores', 'This', 'Métodos', 'Encapsulamento', 'Protótipos', 'Herança', 'Composição'],
    'Estado e comportamento em uma classe',
    'A sintaxe class organiza construtores e métodos, mas o modelo de objetos de JavaScript continua baseado em protótipos. Métodos declarados no corpo da classe residem em Classe.prototype, enquanto propriedades atribuídas a this no construtor pertencem a cada instância individual.',
    [
      t('Qual é o número em a.valor após a.incrementar()?', '4', 'A instância a iniciou com 3 e incrementar() somou 1 ao seu estado.', c08Code),
      t('Qual é o número em b.valor ao final do trecho?', '0', 'b foi construído com o padrão 0 e não sofreu incremento.', c08Code),
      q('Onde fica armazenado o método incrementar definido na classe Contador?', 'Em Contador.prototype, compartilhado pelas instâncias', ['Copiado em uma variável global valor', 'Apenas dentro de uma string interna'], 'Métodos de instância em class são instalados no objeto Contador.prototype.', c08Code),
      q('O que this referencia durante a chamada a.incrementar()?', 'A instância a que recebeu a chamada', ['Sempre a própria classe Contador', 'Sempre o objeto global window'], 'O objeto antes do ponto na invocação a.incrementar() define o receptor this.', c08Code),
      g('Complete o operador que instancia um novo objeto da classe.', 'new', 'new cria o objeto ligado a Contador.prototype e executa o constructor.', 'const c = ____ Contador(10);'),
      q('O que acontece ao extrair const f = a.incrementar; e chamar f() sem receptor?', 'this fica undefined em modo estrito e ler this.valor lança erro', ['a.valor passa para 5 normalmente', 'b.valor é incrementado no lugar de a'], 'Corpos de classe executam em strict mode; chamar o método solto perde o this.'),
      p('Associe cada termo de orientação a objetos em JS ao trecho correspondente.', [['Classe', 'Contador'], ['Instância', 'Objeto referenciado por a'], ['Estado da instância', 'Propriedade a.valor'], ['Comportamento no protótipo', 'Método incrementar']], 'A classe descreve o molde e o protótipo; cada instância guarda seus próprios dados.'),
      o('Ordene o que ocorre ao avaliar const a = new Contador(3).', ['Criar um novo objeto vazio', 'Vincular o protótipo do objeto a Contador.prototype', 'Executar constructor com this apontando para o novo objeto', 'Atribuir a referência resultante à constante a'], 'Entender os passos de new desmistifica a ligação entre instância e protótipo.')
    ]
  );

  const c09Code = '// calculo.js\nexport function total(precos) {\n  return precos.reduce((s, p) => s + p, 0);\n}\n// app.js\nimport { total } from "./calculo.js";\nconsole.log(total([10, 5]));';
  chapter(
    'Módulos e organização de aplicações',
    ['Import e export', 'Responsabilidades', 'Dependências', 'ES modules', 'Configuração', 'Camadas', 'Contratos', 'Refatoração'],
    'Separe cálculo de interface',
    'Módulos ES (ESM) permitem exportar apenas o contrato público e importar dependências explicitamente. Separar regras puras de cálculo da manipulação de interface facilita testes automatizados. No navegador usa-se script type="module"; no Node.js usa-se .mjs ou "type": "module".',
    [
      t('Qual número app.js imprime no console ao chamar total([10, 5])?', '15', 'A função importada de calculo.js soma 10 e 5 a partir de 0.', c09Code),
      g('Complete a palavra-chave que expõe a função para outros módulos.', 'export', 'export torna a declaração importável por outros arquivos ESM.', '____ function total(precos) {\n  return precos.reduce((s, p) => s + p, 0);\n}'),
      q('Por que usamos chaves em import { total } from "./calculo.js"?', 'Porque total foi exposto como uma exportação nomeada', ['Porque estamos clonando a função dentro de um objeto literal', 'Porque chaves importam todos os arquivos do diretório'], 'Importações nomeadas usam chaves com o identificador exato exportado pelo módulo.', c09Code),
      q('Qual tarefa deve ficar fora de calculo.js para manter boa separação de camadas?', 'Ler inputs do DOM e exibir alertas na tela', ['Somar os números do array recebido', 'Retornar 0 quando a lista estiver vazia'], 'Manter calculo.js livre de DOM permite testar a regra direto no Node.js.'),
      q('Em relação a quê o caminho "./calculo.js" é resolvido em um ES module?', 'Em relação à localização do módulo que faz o import', ['Sempre à pasta Downloads do sistema', 'Sempre ao diretório raiz do disco'], 'Especificadores relativos em ESM são resolvidos a partir da URL do módulo importador.'),
      p('Associe cada arquivo da arquitetura modular à sua responsabilidade.', [['calculo.js', 'Regra pura de soma de preços'], ['app.js', 'Ponto de entrada que integra dependências'], ['calculo.test.js', 'Verificação automatizada com entradas controladas']], 'Fronteiras claras permitem trocar a interface sem reescrever a regra de negócio.'),
      q('Qual atributo HTML habilita import e export no script carregado pelo navegador?', 'type="module"', ['type="commonjs"', 'defer="module"'], 'Sem type="module", o navegador trata o arquivo como script clássico e rejeita import.'),
      o('Ordene o fluxo para extrair e consumir uma função pura em outro módulo.', ['Definir e marcar a função com export em calculo.js', 'Declarar import { total } no módulo consumidor app.js', 'Carregar o ponto de entrada como módulo no ambiente', 'Invocar total() passando os dados de entrada'], 'Exportar, importar, carregar em modo modular e invocar compõem o ciclo ESM.')
    ]
  );

  const c10Code = 'console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");';
  chapter(
    'Promises, async/await e event loop',
    ['Pilha de chamadas', 'Callbacks', 'Promises', 'Async e await', 'Erros assíncronos', 'Concorrência', 'Microtarefas', 'Cancelamento'],
    'Entenda a ordem das mensagens',
    'Uma função marcada com async sempre retorna uma Promise. O operador await pausa apenas a continuação daquela função assíncrona sem travar o event loop. Callbacks de .then() e continuações após await entram na fila de microtarefas, rodando após o código síncrono atual.',
    [
      o('Ordene as letras exibidas no console pela execução deste código.', ['A', 'C', 'B'], 'A e C rodam no passo síncrono atual; o callback de .then() roda logo depois, na fila de microtarefas.', c10Code),
      q('O que qualquer função declarada com async retorna ao ser chamada?', 'Uma instância de Promise', ['Apenas strings já resolvidas', 'Uma nova thread do sistema operacional'], 'Mesmo que retorne um número literal, uma função async embrulha o resultado em uma Promise.'),
      g('Complete a palavra-chave que aguarda a resolução de uma Promise em função async.', 'await', 'await suspende a função async até a Promise cumprir ou rejeitar.', 'async function iniciar() {\n  const dados = ____ carregar();\n  return dados;\n}'),
      q('Como capturar uma rejeição lançada por await carregar() dentro de uma função async?', 'Envolvendo o await em um bloco try / catch', ['Testando if (carregar) sem chamar a função', 'Usando apenas const em vez de let'], 'Dentro de funções async, Promises rejeitadas em await propagam como exceções capturáveis por try/catch.'),
      q('Como coordenar duas buscas HTTP independentes sem esperar uma terminar para iniciar a outra?', 'Disparar ambas e aguardar Promise.all([p1, p2])', ['É impossível, pois async obriga fila única sequencial', 'Usar dois loops while vazios'], 'Iniciar as duas Promises antes do await permite aguardar ambas concorrentemente com Promise.all.'),
      q('O que ocorre com Promise.all([p1, p2]) se p1 rejeitar imediatamente?', 'A Promise retornada por Promise.all rejeita com o erro de p1', ['Os erros são convertidos em null sem rejeição', 'p2 é revertida no banco de dados automaticamente'], 'Promise.all falha rápido (fail-fast) assim que qualquer Promise de entrada rejeita.'),
      p('Associe cada estado de uma Promise ao seu significado.', [['pending', 'Operação assíncrona ainda em andamento'], ['fulfilled', 'Operação concluída com um valor disponível'], ['rejected', 'Operação encerrada com motivo de falha']], 'Uma vez estabelecida como fulfilled ou rejected, uma Promise não muda mais de estado.'),
      t('Qual letra é impressa por último no trecho com Promise.resolve().then(...)?', 'B', 'A microtarefa que imprime B só executa quando a pilha síncrona esvazia após imprimir C.', c10Code)
    ]
  );

  const c11Code = 'async function carregarTarefas() {\n  const response = await fetch("/api/tarefas");\n  if (!response.ok) throw new Error("Falha HTTP " + response.status);\n  return await response.json();\n}';
  chapter(
    'HTTP, Fetch, JSON e APIs',
    ['HTTP', 'JSON', 'Fetch', 'Status e erros', 'Cabeçalhos', 'Parâmetros', 'AbortController', 'Integração'],
    'Trate resposta HTTP e formato separadamente',
    'A função fetch retorna uma Promise que resolve para um objeto Response assim que os cabeçalhos chegam. Respostas HTTP 404 ou 500 não rejeitam o fetch automaticamente: é indispensável checar response.ok ou response.status antes de ler o corpo assíncrono com response.json().',
    [
      q('Uma resposta HTTP 404 do servidor faz fetch("/api/tarefas") rejeitar sozinho?', 'Não; fetch resolve a Response e o código deve testar response.ok', ['Sim, qualquer status acima de 200 rejeita o fetch', 'Apenas quando o cabo de rede está desconectado'], 'fetch só rejeita em erro de rede ou aborto; status HTTP 4xx/5xx exigem checagem explícita.', c11Code),
      q('O que a propriedade booleana response.ok indica?', 'Que o status HTTP está na faixa de sucesso 200 a 299', ['Que o corpo certamente contém JSON válido', 'Que o usuário possui permissão de administrador'], 'response.ok resume status >= 200 && status < 300, sem inspecionar o corpo.', c11Code),
      g('Complete a leitura assíncrona que converte o corpo HTTP em objeto a partir de JSON.', 'json', 'response.json() lê o stream do corpo e faz o parse como JSON.', 'const dados = await response.____();'),
      q('Qual método HTTP é o padrão semântico para enviar dados e criar uma nova tarefa?', 'POST', ['GET apagando registros pela query string', 'HEAD enviando senha na URL'], 'POST submete uma carga útil ao servidor para criação ou processamento.'),
      q('Ao enviar JSON no corpo de um fetch POST, qual cabeçalho informa o formato?', 'Content-Type: application/json', ['Accept-Language: json-utf8', 'Authorization: application/json'], 'Content-Type declara ao servidor a mídia presente no corpo da requisição.'),
      p('Associe cada parte de uma troca HTTP ao seu papel no contrato.', [['Método HTTP', 'Indica a ação semântica como GET ou POST'], ['Código de status', 'Comunica o resultado da requisição como 200 ou 404'], ['Corpo (body)', 'Transporta a representação dos dados enviados ou recebidos']], 'Método, status e corpo formam a espinha dorsal da comunicação REST/HTTP.'),
      q('Qual API web permite cancelar uma chamada fetch em andamento?', 'AbortController passando controller.signal ao fetch', ['JSON.stringify com segundo argumento null', 'Atribuir response.ok = false após a resposta'], 'Chamar controller.abort() sinaliza cancelamento para o fetch associado àquele signal.'),
      o('Ordene o consumo seguro de um endpoint JSON com fetch.', ['Chamar await fetch("/api/tarefas")', 'Verificar se response.ok é verdadeiro', 'Ler e converter o corpo com await response.json()', 'Entregar os dados validados para a interface'], 'Checar o status HTTP antes do parse evita tentar ler páginas de erro HTML como JSON.')
    ]
  );

  const c12Code = 'import { readFile } from "node:fs/promises";\nconst arquivo = new URL("./config.json", import.meta.url);\nconst texto = await readFile(arquivo, "utf8");\nconst config = JSON.parse(texto);\nconsole.log(config.metaMinutos);\n// config.json: {"metaMinutos": 15}';
  chapter(
    'Node.js, arquivos e ferramentas',
    ['Runtime Node.js', 'Npm', 'Scripts', 'Sistema de arquivos', 'Paths', 'Variáveis de ambiente', 'CLI', 'Depuração'],
    'Leia um arquivo com contexto de caminho',
    'Node.js fornece módulos nativos com prefixo node: para acessar arquivos, caminhos e processos. Com node:fs/promises lemos arquivos sem bloquear a thread principal. Construir new URL("./config.json", import.meta.url) ancora o caminho no módulo atual em vez de depender de onde o comando node foi chamado.',
    [
      t('Qual número será impresso no terminal com o config.json mostrado?', '15', 'JSON.parse transforma o texto JSON em objeto e acessamos metaMinutos (15).', c12Code),
      q('Para que serve o argumento "utf8" em readFile(arquivo, "utf8")?', 'Decodificar os bytes do arquivo como string UTF-8', ['Criptografar o conteúdo no disco', 'Corrigir automaticamente erros de sintaxe JSON'], 'Sem codificação textual, readFile retornaria um Buffer de bytes brutos.', c12Code),
      q('Se config.json não existir no disco, o que ocorre com await readFile(...)?', 'A Promise rejeita com erro (ex.: ENOENT) e precisa de tratamento', ['Retorna silenciosamente "{}"', 'Cria o arquivo vazio automaticamente'], 'Leitura de arquivo inexistente lança erro assíncrono que deve ser tratado.'),
      g('Complete a chamada que converte a string lida em objeto JavaScript.', 'parse', 'JSON.parse interpreta texto JSON válido e lança SyntaxError se estiver malformado.', 'const config = JSON.____(texto);'),
      q('new URL("./config.json", import.meta.url) resolve o caminho relativo a quê?', 'Ao arquivo de módulo JavaScript atual', ['Sempre ao diretório inicial do usuário', 'Sempre à pasta de onde o terminal executou node'], 'import.meta.url contém a URL file:// exata do módulo em execução.', c12Code),
      p('Associe cada recurso do ambiente Node.js à sua responsabilidade.', [['node:fs/promises', 'Leitura e escrita assíncrona de arquivos'], ['process.cwd()', 'Diretório de trabalho atual onde o processo iniciou'], ['package.json', 'Manifesto de scripts, metadados e dependências']], 'Distinguir diretório corrente do processo e caminho do módulo evita falhas de caminho relativo.'),
      q('Após JSON.parse abrir o arquivo sem erro de sintaxe, o que ainda devemos fazer?', 'Validar se metaMinutos existe, é número e está em faixa aceitável', ['Confiar cegamente em qualquer valor vindo do disco', 'Executar o texto com eval para ganhar desempenho'], 'JSON válido pode conter tipos inesperados como null, string ou números negativos.'),
      o('Ordene a leitura segura de uma configuração JSON em Node.js.', ['Resolver o caminho do arquivo com new URL e import.meta.url', 'Ler o texto UTF-8 com await readFile', 'Converter o texto com JSON.parse', 'Validar os campos esperados antes de usar na aplicação'], 'Resolver caminho, ler bytes como texto, parsear e validar o esquema formam o fluxo confiável.')
    ]
  );

  const c13Code = 'import http from "node:http";\nhttp.createServer((req, res) => {\n  if (req.method === "GET" && req.url === "/api/meta") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify({ minutos: 10 }));\n    return;\n  }\n  res.writeHead(404);\n  res.end();\n}).listen(8787, "127.0.0.1");';
  chapter(
    'Servidores e APIs com Node.js',
    ['Servidor HTTP', 'Rotas', 'Corpo da requisição', 'Validação', 'Respostas', 'Erros', 'Autenticação', 'Testes da API'],
    'Defina um contrato de recurso',
    'Um servidor HTTP em Node.js inspeciona método e URL da requisição para decidir a rota, valida entradas e escreve status, cabeçalhos e corpo na resposta. Escutar em 127.0.0.1 restringe o acesso direto à interface local (loopback), e rotas de escrita devem limitar o tamanho do payload recebido.',
    [
      t('Qual código de status HTTP esse servidor envia para GET /api/meta?', '200', ' método GET combinado com /api/meta entra no if e escreve status 200.', c13Code),
      t('Qual código de status HTTP é retornado para GET /api/inexistente?', '404', 'Quando nenhuma rota coincide, o fluxo cai no padrão final writeHead(404).', c13Code),
      q('Por que envolver { minutos: 10 } em JSON.stringify antes de res.end?', 'Porque a resposta HTTP transmite texto ou bytes, não objetos JS vivos', ['Porque JSON.stringify autentica o token do cliente', 'Porque cria automaticamente uma tabela no banco'], 'Serializar para string JSON permite enviar a estrutura pela rede com Content-Type adequado.', c13Code),
      g('Complete o método de ServerResponse que conclui o envio da resposta HTTP.', 'end', 'res.end() envia o trecho final opcional e sinaliza ao cliente que a resposta terminou.', 'res.writeHead(200, { "Content-Type": "application/json" });\nres.____(JSON.stringify({ ok: true }));'),
      q('Escutar em "127.0.0.1" expõe o servidor diretamente para outras máquinas na internet?', 'Não; 127.0.0.1 aceita conexões apenas da própria máquina (loopback)', ['Sim, qualquer IP do planeta alcança a porta 8787', 'Sim, sempre que o caminho começa com /api'], 'O endereço de loopback isola o processo localmente durante o desenvolvimento.'),
      p('Associe cada código de status HTTP ao seu significado semântico em uma API.', [['201', 'Novo recurso criado com sucesso'], ['400', 'Dados de entrada inválidos na requisição'], ['401', 'Credencial ausente ou autenticação inválida'], ['403', 'Identidade conhecida, porém sem permissão para o recurso']], 'Usar códigos de status consistentes torna o contrato da API claro para clientes e testes.'),
      q('A requisição GET /api/meta?unidade=min casa com req.url === "/api/meta"?', 'Não; req.url inclui a query string completa', ['Sim; o Node remove tudo após ? automaticamente', 'Casa apenas quando a porta é 80'], 'Para aceitar query strings, faça o parse com new URL(req.url, "http://localhost") e compare pathname.', c13Code),
      o('Ordene o processamento de uma requisição GET /api/meta no servidor.', ['Receber req e res no callback do servidor', 'Conferir método HTTP e caminho da rota', 'Definir status 200 e cabeçalho Content-Type JSON', 'Serializar os dados e encerrar com res.end()'], 'Roteamento, cabeçalhos e encerramento da resposta seguem uma sequência bem definida.')
    ]
  );

  const c14Code = 'function lerMeta(storage) {\n  try {\n    const valor = Number(storage.getItem("meta"));\n    return [5, 10, 15, 20].includes(valor) ? valor : 10;\n  } catch {\n    return 10;\n  }\n}';
  chapter(
    'Persistência e segurança de aplicações',
    ['Modelagem', 'SQL', 'Consultas parametrizadas', 'Transações', 'Senhas e sessões', 'Validação de entrada', 'Permissões', 'Backup'],
    'Armazene preferências sem confundir autorização',
    'No navegador, localStorage guarda pares chave-valor em string por origem, podendo falhar em modos restritos ou ser editado livremente pelo usuário. Por isso ele serve para preferências locais com fallback seguro, jamais como prova de identidade ou permissão. No servidor, senhas exigem hash forte com salt e toda rota deve checar autorização por recurso.',
    [
      t('Se storage.getItem("meta") devolver "15", qual número lerMeta retorna?', '15', 'Number("15") produz 15, que pertence à lista permitida [5, 10, 15, 20].', c14Code),
      t('Se o usuário editar o localStorage para "999", qual número lerMeta retorna?', '10', 'Como 999 não pertence à whitelist de metas, a função aplica o padrão seguro 10.', c14Code),
      q('Salvar isAdmin="true" no localStorage comprova que a pessoa é administradora?', 'Não; qualquer pessoa pode alterar dados no cliente pelas DevTools', ['Sim, desde que o valor passe por JSON.stringify', 'Sim, quando o botão administrativo fica oculto no CSS'], 'Autorização confiável sempre ocorre no servidor a partir da sessão verificada.'),
      q('Qual técnica é apropriada para guardar senhas de usuários no banco do servidor?', 'Hash lento específico para senhas (ex.: Argon2 ou scrypt) com salt único', ['Texto puro em coluna privada', 'Codificação Base64 reversível'], 'Base64 não é criptografia nem hash; algoritmos dedicados protegem senhas contra força bruta.'),
      p('Associe cada defesa de segurança ao risco principal que ela mitiga.', [['textContent no DOM', 'Execução de HTML/JS injetado (XSS)'], ['Cookie de sessão HttpOnly', 'Leitura do token de sessão via script na página'], ['Checagem de dono do recurso no servidor', 'Acesso indevido a dados de outra conta (IDOR)']], 'Segurança em profundidade combina defesas na interface, no transporte e na autorização.'),
      q('Estar autenticado com sessão válida autoriza ler qualquer /api/usuarios/:id?', 'Não; o servidor precisa verificar se a sessão tem permissão sobre aquele ID', ['Sim; autenticação e autorização significam exatamente a mesma coisa', 'Sim, se o ID for um número grande'], 'Autenticação identifica quem você é; autorização verifica o que você pode acessar.'),
      g('Complete a propriedade segura para exibir texto vindo do usuário sem criar HTML.', 'textContent', 'textContent escapa qualquer caractere especial de marcação.', 'elemento.____ = comentarioDoUsuario;'),
      o('Ordene a leitura defensiva da preferência salva em storage no cliente.', ['Tentar ler a string bruta dentro de um bloco try', 'Converter o texto lido para número com Number()', 'Conferir se o número pertence à lista de valores permitidos', 'Retornar o valor validado ou cair no padrão 10'], 'Tratar exceções de acesso e validar contra valores permitidos evita estados corrompidos.', c14Code)
    ]
  );

  const c15Code = 'import assert from "node:assert/strict";\nfunction metaValida(minutos) {\n  return [5, 10, 15, 20].includes(minutos);\n}\nassert.equal(metaValida(10), true);\nassert.equal(metaValida(7), false);';
  chapter(
    'Testes, depuração e acessibilidade',
    ['Asserções', 'Testes unitários', 'Integração', 'Mocks', 'Depurador', 'Teclado', 'Rótulos e contraste', 'Auditoria'],
    'Teste o comportamento que importa',
    'Bons testes verificam o comportamento observável e casos de borda, como tipos incorretos e valores fora da faixa. A depuração eficiente parte de uma reprodução mínima e hipóteses testáveis. Na interface, qualidade também inclui acessibilidade real: controles nativos focáveis por teclado, rótulos claros e avisos compreensíveis.',
    [
      q('Qual comportamento o segundo assert do trecho protege?', 'A rejeição de uma duração que não pertence às metas válidas', ['A aceitação de qualquer inteiro positivo', 'O contraste visual do botão salvar'], '7 não está em [5, 10, 15, 20], logo metaValida(7) precisa retornar false.', c15Code),
      q('Qual asserção adicional garante que a string "10" não seja aceita por engano?', 'assert.equal(metaValida("10"), false)', ['assert.equal(metaValida(10), true) repetido duas vezes', 'assert.equal(metaValida(15), true)'], 'Array.prototype.includes usa igualdade estrita (SameValueZero), diferenciando "10" de 10.', c15Code),
      g('Complete a asserção estrita do módulo node:assert/strict.', 'equal', 'No modo strict, assert.equal verifica igualdade estrita (como Object.is / ===).', 'assert.____(metaValida(20), true);'),
      t('Qual booleano metaValida("10") retorna ao receber texto em vez de número?', 'false', 'Como includes não faz coerção de string para número, "10" não casa com 10.', c15Code),
      p('Associe cada tipo de verificação à camada que ela exercita.', [['Chamar metaValida() com entradas limites', 'Teste unitário de regra pura'], ['Preencher formulário, salvar na API e recarregar', 'Teste ponta a ponta (E2E) do fluxo'], ['Operar toda a página usando apenas Tab, Enter e Espaço', 'Inspeção de acessibilidade por teclado']], 'Combinar testes unitários, fluxo integrado e revisão de teclado cobre falhas distintas.'),
      q('Qual elemento HTML oferece foco e ativação por Enter e Espaço nativamente?', '<button type="button">', ['<div> com evento onclick apenas', '<span> estilizado com cursor: pointer'], 'Elementos button nativos já trazem papel semântico e suporte completo a teclado.'),
      q('Passar 100% em um verificador automático de acessibilidade prova ausência total de barreiras?', 'Não; testes manuais com teclado e leitor de tela continuam indispensáveis', ['Sim; ferramentas automáticas avaliam toda compreensão humana', 'Sim, desde que a página não tenha imagens'], 'Analisadores estáticos detectam erros objetivos, mas não julgam ordem lógica de foco ou clareza de textos.'),
      o('Ordene o ciclo disciplinado para corrigir um bug com segurança.', ['Reproduzir a falha de forma consistente', 'Escrever um teste automatizado que falha demonstrando o bug', 'Corrigir a causa raiz no código', 'Executar a suíte confirmando que o novo teste e os antigos passam'], 'Reproduzir antes de editar garante que a correção realmente resolveu o defeito.')
    ]
  );

  const c16Code = '// Resposta de POST /api/tarefas\n{ "id": "t-17", "titulo": "Revisar funções", "concluida": false }\n\n// Atualização parcial\n// PATCH /api/tarefas/t-17\n{ "concluida": true }';
  chapter(
    'Projeto completo: aplicação web',
    ['Requisitos do gerenciador', 'Interface de estudos', 'Formulários', 'API de tarefas', 'Persistência', 'Sessões', 'Testes completos', 'Entrega documentada'],
    'Do formulário ao estado persistido',
    'O projeto integrador conecta interface acessível, API HTTP e banco de dados em um gerenciador de estudos. O contrato define tarefas com id, titulo e concluida; o servidor vincula cada registro à sessão autenticada, valida limites e garante que uma conta jamais leia ou altere tarefas de outra.',
    [
      q('Ao criar uma tarefa via POST /api/tarefas, quem deve definir o dono do registro?', 'O servidor, a partir da identidade da sessão autenticada', ['Um campo usuarioId enviado livremente pelo navegador sem validação', 'O arquivo de estilos CSS da página'], 'Confiar em ownerId enviado pelo cliente permitiria criar tarefas em nome de terceiros.', c16Code),
      q('Qual verificação comprova que a tarefa foi realmente persistida e não ficou só em memória da tela?', 'Criar a tarefa, recarregar a página e confirmar que a API a devolve', ['Mudar apenas a classe CSS do item na lista', 'Ler a variável local antes do fetch'], 'Recarregar descarta variáveis voláteis da aba e exige leitura real da camada persistente.'),
      g('Complete o método HTTP usado no contrato para atualizar parcialmente o campo concluida.', 'PATCH', 'PATCH aplica modificação parcial sobre o recurso /api/tarefas/t-17.', 'await fetch("/api/tarefas/t-17", {\n  method: "____",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ concluida: true })\n});'),
      t('No JSON retornado por POST /api/tarefas, qual é o identificador da tarefa criada?', 't-17', 'O campo "id" na resposta de criação traz o valor "t-17".', c16Code),
      o('Ordene o fluxo confiável de criação de tarefa com confirmação do servidor.', ['Usuário preenche o título e envia o formulário', 'Interface valida preenchimento básico e desabilita reenvio duplicado', 'Cliente envia POST /api/tarefas com JSON', 'Servidor autentica, valida e grava no banco', 'Interface exibe a tarefa confirmada com o id retornado'], 'Confirmar sucesso após a persistência evita iludir o usuário quando a rede falha.'),
      p('Associe cada entregável do projeto final à sua finalidade.', [['Modelagem e contrato da API', 'Definir rotas, formatos JSON e regras de domínio'], ['Estados visuais da UI', 'Comunicar carregamento, sucesso e erro com clareza'], ['Suíte de testes de API', 'Comprovar persistência e isolamento entre contas'], ['README do projeto', 'Documentar como instalar, rodar e testar localmente']], 'Software pronto para entrega une código funcional, verificação automatizada e documentação.'),
      q('Se a requisição PATCH falhar com erro 500, como a interface deve reagir?', 'Exibir mensagem clara de falha e permitir tentar novamente sem fingir que salvou', ['Mostrar aviso verde de Tarefa salva mesmo assim', 'Apagar todas as tarefas da tela sem explicação'], 'A interface deve refletir fielmente o estado real confirmado pelo servidor.'),
      q('Qual requisito de segurança é obrigatório no aceite de um gerenciador multiusuário?', 'Uma conta autenticada não consegue ler, editar nem excluir tarefas de outra conta', ['Todas as tarefas ficam públicas sem login', 'A validação existe apenas no atributo required do HTML'], 'Isolamento por proprietário no servidor impede vazamento e adulteração cruzada de dados.')
    ]
  );

  window.LINCODE_CONTENT = window.LINCODE_CONTENT || {};
  window.LINCODE_CONTENT.javascript = chapters;
})();
