'use strict';
// Atividades extras (6 por lição legada) da trilha JavaScript. São acrescentadas depois das 2 existentes.
(()=>{
  let serial=0;
  const q=(prompt,correct,wrong,explanation,code)=>{const options=[correct,...wrong];const answer=serial++%options.length;for(let i=0;i<answer;i++)options.unshift(options.pop());return {type:'choice',prompt,options,answer,explanation,code};};
  const t=(prompt,accepted,explanation,code)=>({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,code});
  const o=(prompt,steps,explanation)=>({type:'order',prompt,options:[...steps].reverse(),answer:steps.map((_,i)=>steps.length-i-1),explanation});
  const p=(prompt,pairs,explanation)=>({type:'pairs',prompt,pairs,explanation});
  const g=(prompt,accepted,explanation,code)=>({...t(prompt,accepted,explanation,code),type:'gap'});

  window.LINCODE_EXTRA=window.LINCODE_EXTRA||{};
  window.LINCODE_EXTRA.javascript=Object.assign(window.LINCODE_EXTRA.javascript||{},{
  'introducao':[
    q('Em uma página web, qual tecnologia é responsável pela aparência, como cores e espaçamentos?','CSS',['HTML','JavaScript'],'HTML organiza o conteúdo, CSS define a aparência e JavaScript programa a interação.'),
    p('Associe cada tecnologia ao seu papel na web.',[['HTML','Organiza o conteúdo da página'],['CSS','Define a aparência'],['JavaScript','Programa a interação'],['Node.js','Executa JavaScript fora do navegador']],'Cada tecnologia cuida de uma parte: estrutura, estilo, comportamento e, no caso do Node.js, a execução fora do navegador.'),
    o('Ordene os passos para testar uma linha de JavaScript no console do navegador.',['Abrir o console do navegador','Digitar uma linha de JavaScript','Pressionar Enter para executá-la','Ler o resultado exibido'],'Primeiro abrimos o ambiente, depois escrevemos, executamos e só então lemos o resultado.'),
    t('Qual ambiente, citado na lição, permite executar scripts JavaScript fora do navegador?',['Node.js','Node','NodeJS','nodejs','node.js'],'O Node.js é o ambiente que executa JavaScript fora do navegador.'),
    t('A linha abaixo é executada no console. Que número aparece na saída?','5','A expressão 2 + 3 é calculada antes de ser mostrada, resultando em 5.','console.log(2 + 3);'),
    q('Por que um botão que troca o texto da página ao ser clicado depende de JavaScript?','Responder a um clique é um comportamento, e comportamentos são programados',['O HTML não consegue exibir nenhum texto','O CSS proíbe a existência de botões'],'JavaScript é a tecnologia que programa a interação, como reagir a cliques e atualizar o conteúdo.')
  ],
  'primeira-resposta':[
    t('Qual texto o comando abaixo exibe? Responda sem as aspas.','Boa tarde!','O comando mostra o conteúdo da string, sem as aspas: Boa tarde!','console.log("Boa tarde!");'),
    g('Complete o comando que mostra uma mensagem no console.',['console.log'],'console.log é o comando de saída usado nesta trilha.','____("Olá, mundo!");'),
    q('O que o código abaixo mostra?','3',['nivel','Nada é mostrado'],'Sem aspas, nivel é o nome da variável; o comando mostra o valor associado, 3.','let nivel = 3;\nconsole.log(nivel);'),
    q('Considere let pontos = 10;. Qual é a diferença entre console.log("pontos") e console.log(pontos)?','O primeiro mostra o texto pontos; o segundo mostra 10',['Os dois mostram 10','O primeiro mostra 10; o segundo mostra o texto pontos'],'Entre aspas é uma string literal. Sem aspas, o nome é substituído pelo valor da variável.','let pontos = 10;'),
    p('Associe cada trecho ao seu papel.',[['console.log','Comando de saída'],['"Olá"','String (texto)'],['let pontos = 10;','Declaração com valor inicial'],['pontos','Nome da variável']],'Cada parte da linha tem uma função: comando, valor textual, declaração e identificador.'),
    o('Ordene os passos para executar um script com Node.js.',['Escrever a linha console.log no arquivo','Salvar o arquivo','Executar o arquivo com o Node.js','Ler a saída no terminal'],'O código precisa existir e estar salvo antes de ser executado; a saída é lida por último.')
  ],
  'saida':[
    t('Que texto aparece na saída? Digite exatamente o que é mostrado, sem aspas.','Olá mundo','O operador + junta as duas strings: "Olá" e " mundo" formam Olá mundo.','console.log("Olá" + " mundo");'),
    q('O que a concatenação "3" + "4" mostra?','34',['7','"34"'],'Entre aspas, 3 e 4 são strings; o + concatena os textos em vez de somar. Na saída aparece 34, sem aspas.','console.log("3" + "4");'),
    g('Complete o nome do método que exibe a saída.',['log'],'O objeto console possui o método log, que mostra o valor recebido.','console.____("Pronto!");'),
    o('Ordene as partes para formar um comando de saída válido.',['console.log','(','"Até logo"',')',';'],'O nome do comando vem primeiro, depois o parêntese que abre, o texto entre aspas, o parêntese que fecha e o ponto e vírgula.'),
    p('Associe cada comando ao que ele mostra.',[['console.log(2 + 2)','4'],['console.log("2" + "2")','22'],['console.log("2 + 2")','2 + 2'],['console.log(10 - 3)','7']],'Números são calculados; strings são concatenadas ou mostradas literalmente.'),
    q('Por que o código abaixo gera erro?','Falta a aspa que fecha o texto',['console.log não aceita texto','Falta uma variável antes do comando'],'Uma string precisa começar e terminar com aspas; aqui a aspa de fechamento não existe.','console.log("Olá);')
  ],
  'algoritmos':[
    q('Para calcular a área de um retângulo, quais dados o algoritmo precisa receber?','A base e a altura',['Somente a área','O resultado em metros quadrados'],'A área é calculada a partir da base e da altura; ela é a saída, não a entrada.'),
    t('Com base = 6 e altura = 4, qual é o resultado de área = base × altura?','24','6 × 4 = 24.'),
    o('Ordene o algoritmo que calcula o troco de uma compra.',['Início','Ler o valor pago e o preço','troco = pago − preço','Mostrar o troco','Fim'],'É preciso conhecer o valor pago e o preço antes de calcular o troco, e só depois exibi-lo.'),
    p('Classifique cada item de um algoritmo de troco.',[['Valor pago e preço','Entrada'],['troco = pago − preço','Processamento'],['Mostrar o troco','Saída'],['Passos finitos e sem ambiguidade','Característica de um algoritmo']],'Entrada, processamento e saída organizam o algoritmo, e cada passo deve ser claro.'),
    t('Um cliente paga 50 por uma compra de 37. Qual é o troco?','13','50 − 37 = 13.'),
    q('Qual instrução é clara o bastante para ser um passo de algoritmo?','Multiplicar a base pela altura',['Calcular de algum jeito','Fazer o que parecer certo'],'Um passo de algoritmo precisa ser preciso e executável sem interpretação livre.')
  ],
  'variaveis':[
    t('Qual valor é mostrado na saída?','12','saldo começa em 20; depois recebe 20 − 8 = 12, e esse valor é mostrado.','let saldo = 20;\nsaldo = saldo - 8;\nconsole.log(saldo);'),
    t('Qual valor de b é mostrado na saída?','3','b recebe uma cópia do valor de a (3). Mudar a depois não altera b.','let a = 3;\nlet b = a;\na = 7;\nconsole.log(b);'),
    q('O que acontece ao executar o código abaixo?','Ocorre um erro, pois uma const não pode ser reatribuída',['limite passa a valer 6','limite passa a valer 11'],'const impede nova atribuição ao mesmo nome. A segunda linha lança um TypeError.','const limite = 5;\nlimite = 6;'),
    g('Complete com a palavra-chave recomendada nesta trilha para uma variável cujo valor vai mudar.',['let'],'let declara uma variável que pode receber novos valores.','____ contador = 0;\ncontador = contador + 1;'),
    p('Associe cada trecho ao seu significado.',[['let x = 5;','Declara a variável x com valor inicial 5'],['x = 9;','Reatribui um novo valor a x'],['const x = 5;','Declara um nome que não será reatribuído'],['x + 1','Expressão que usa o valor atual de x']],'Declarar, reatribuir, proteger contra reatribuição e usar o valor são operações diferentes.'),
    o('Ordene os passos para trocar os valores de a e b usando uma variável temporária.',['temp recebe o valor de a','a recebe o valor de b','b recebe o valor de temp'],'Guardamos o valor de a antes de sobrescrevê-lo; do contrário ele seria perdido.')
  ],
  'decisoes':[
    q('Qual mensagem aparece na saída?','Recuperação',['Aprovado','Aprovado e Recuperação'],'6 >= 7 é falso, então o ramo else é executado.','let nota = 6;\nif (nota >= 7) {\n  console.log("Aprovado");\n} else {\n  console.log("Recuperação");\n}'),
    t('Qual valor final de soma o laço for mostra?','10','O laço soma 1, 2, 3 e 4: 1 + 2 + 3 + 4 = 10. Com i = 5 a condição i <= 4 é falsa.','let soma = 0;\nfor (let i = 1; i <= 4; i++) {\n  soma = soma + i;\n}\nconsole.log(soma);'),
    t('Qual valor de n é mostrado após o while?','4','n passa de 10 para 7 e depois para 4. Como 4 > 4 é falso, o laço termina com n = 4.','let n = 10;\nwhile (n > 4) {\n  n = n - 3;\n}\nconsole.log(n);'),
    g('Complete o operador para mostrar "Menor" somente quando a idade for estritamente abaixo de 18.',['<'],'Estritamente abaixo de 18 exige <. O operador <= incluiria o próprio 18.','let idade = 17;\nif (idade ____ 18) {\n  console.log("Menor");\n}'),
    p('Associe cada operador ao seu significado.',[['>=','Maior ou igual'],['<=','Menor ou igual'],['===','Igual em valor e tipo'],['!==','Diferente em valor ou tipo']],'Cada operador de comparação produz verdadeiro ou falso conforme esta regra.'),
    o('Ordene a execução de um if/else.',['Avaliar a condição','Escolher apenas um dos ramos','Executar o bloco escolhido','Continuar o programa após o if/else'],'A condição decide o ramo; só ele é executado, e o fluxo segue adiante.')
  ],
  'simbolos':[
    q('Qual símbolo representa o bloco de fim do algoritmo?','Oval',['Paralelogramo','Losango'],'A oval marca o início e o fim do fluxograma.'),
    q('Qual símbolo contém o processamento total = preço × 3?','Retângulo',['Losango','Paralelogramo'],'Um cálculo ou atribuição é um processo, representado pelo retângulo.'),
    p('Associe cada bloco ao símbolo adequado.',[['Início','Oval'],['média = (a + b) / 2','Retângulo'],['nota ≥ 7?','Losango'],['Mostrar média','Paralelogramo']],'Início usa oval, cálculo usa retângulo, pergunta usa losango e saída usa paralelogramo.'),
    q('Em uma decisão de sim ou não, quantas setas de saída o losango tem?','Duas: Sim e Não',['Uma só','Quatro'],'Uma pergunta de sim ou não separa o fluxo em dois caminhos.'),
    t('Um fluxo tem: Início, Ler nota, Ler peso, média = ..., Mostrar média, Fim. Quantos paralelogramos ele usa?','3','Ler nota, Ler peso e Mostrar média são entradas ou saídas: 3 paralelogramos.'),
    o('Ordene os símbolos de um fluxo que dobra o preço lido.',['Oval: Início','Paralelogramo: Ler preço','Retângulo: total = preço × 2','Paralelogramo: Mostrar total','Oval: Fim'],'O fluxo começa na oval, lê o dado, processa, mostra o resultado e termina na oval.')
  ],
  'montar-fluxo':[
    o('Monte o algoritmo que calcula a área de um retângulo.',['Início','Ler base','Ler altura','área = base × altura','Mostrar área','Fim'],'As duas leituras precedem o cálculo, e o cálculo precede a exibição.'),
    o('Monte o fluxo que decide a situação de uma nota.',['Início','Ler nota','Decidir: nota ≥ 7?','Mostrar a mensagem do ramo escolhido','Fim'],'A decisão só pode ser avaliada depois que a nota é lida; a mensagem depende do ramo seguido.'),
    t('No bloco resultado = número × 2, qual é o resultado se o número lido for 15?','30','15 × 2 = 30.'),
    p('Associe cada bloco à sua posição no fluxo da área.',[['Ler base e altura','Antes do cálculo'],['área = base × altura','Entre a leitura e a exibição'],['Mostrar área','Depois do cálculo'],['Fim','Último bloco']],'Cada bloco ocupa uma posição definida pelas suas dependências.'),
    q('Um fluxo mostra o resultado e só depois lê o número. Qual é o defeito?','O resultado é mostrado antes de existir',['Faltou um losango obrigatório','O Fim aparece cedo demais'],'Uma saída só pode usar um valor depois que ele foi lido ou calculado.'),
    q('O fluxo é Início → Ler base → Ler altura → Mostrar área → Fim. Qual bloco falta?','Um retângulo com área = base × altura',['Um losango com base > altura','Um segundo Início'],'Sem o processamento, a área nunca é calculada antes de ser mostrada.')
  ],
  'seguir-fluxo':[
    q('Regra: se total ≥ 100, mostrar "Frete grátis"; senão, "Frete R$ 15". Qual mensagem aparece com total = 100?','Frete grátis',['Frete R$ 15','As duas mensagens'],'100 ≥ 100 é verdadeiro, então a seta Sim é seguida.'),
    q('Na regra total ≥ 100 → "Frete grátis", senão "Frete R$ 15", qual mensagem aparece com total = 99?','Frete R$ 15',['Frete grátis','Nenhuma mensagem'],'99 ≥ 100 é falso, então a seta Não é seguida.'),
    t('Na regra total ≥ 100, com total = 250, qual caminho é seguido? Responda Sim ou Não.',['Sim','sim'],'250 ≥ 100 é verdadeiro; o caminho é Sim.'),
    t('Se o losango fosse total > 100 e o total lido fosse 100, qual caminho seria seguido? Responda Sim ou Não.',['Não','Nao','não','nao'],'100 > 100 é falso, pois a igualdade não satisfaz >. Segue o caminho Não.'),
    p('Regra: nota fora de 0 a 10 é inválida; 9 ou mais é Excelente; 7 ou mais é Aprovado; senão, Recuperação. Associe cada entrada ao resultado.',[['nota = 9','Excelente'],['nota = 7','Aprovado'],['nota = 6','Recuperação'],['nota = -1','Entrada inválida']],'A validação vem primeiro; depois as faixas são testadas da maior para a menor.'),
    o('Ordene o percurso do fluxo com total = 100 e a regra total ≥ 100.',['Ler o total 100','Avaliar total ≥ 100','Seguir a seta Sim','Mostrar Frete grátis','Chegar ao Fim'],'Lemos, avaliamos a condição, seguimos o ramo verdadeiro, mostramos a mensagem e terminamos.')
  ],
  'funcoes':[
    t('Qual número é mostrado na saída?','15','triplo(5) devolve 5 × 3 = 15.','function triplo(n) {\n  return n * 3;\n}\nconsole.log(triplo(5));'),
    t('Qual número a expressão soma(2, 3) * 2 mostra?','10','soma(2, 3) devolve 5, e 5 × 2 = 10.','function soma(a, b) {\n  return a + b;\n}\nconsole.log(soma(2, 3) * 2);'),
    q('O que console.log(saudar("Ana")) mostra sem return?','undefined',['Oi, Ana','Ana'],'A função cria a mensagem, mas não usa return; por isso devolve undefined.','function saudar(nome) {\n  const msg = "Oi, " + nome;\n}\nconsole.log(saudar("Ana"));'),
    g('Complete a palavra que devolve o resultado da função a quem a chamou.',['return'],'return entrega o valor calculado ao ponto da chamada.','function dobro(n) {\n  ____ n * 2;\n}'),
    p('Associe cada termo ao seu papel.',[['Parâmetro','Nome que recebe o valor na definição'],['Argumento','Valor passado na chamada'],['return','Entrega o resultado a quem chamou'],['dobro(4)','Chamada da função']],'Parâmetros aparecem na definição; argumentos, na chamada; return devolve o resultado.'),
    o('Ordene o que acontece quando uma função é chamada.',['O código chama a função com um argumento','O parâmetro recebe o valor do argumento','O corpo da função é executado','O return devolve o resultado a quem chamou'],'A chamada passa o argumento, o corpo roda e o resultado volta ao ponto da chamada.')
  ],
  'colecoes':[
    t('Qual letra de letras[3] é mostrada na saída?','d','O índice 3 é a quarta posição, cujo valor é d.','const letras = ["a", "b", "c", "d"];\nconsole.log(letras[3]);'),
    t('Qual número v.length mostra na saída?','3','length informa a quantidade de elementos do array, que é 3.','const v = [4, 8, 15];\nconsole.log(v.length);'),
    q('O que o acesso v[3] fora do fim do array mostra?','undefined',['15','Um erro de execução'],'O último índice válido é 2. A posição 3 não existe, e o acesso devolve undefined.','const v = [4, 8, 15];\nconsole.log(v[3]);'),
    g('Complete o método que acrescenta um elemento ao fim do array.',['push'],'push adiciona o valor ao final: o array passa a ser [1, 2, 3].','const nums = [1, 2];\nnums.____(3);'),
    p('Associe cada expressão ao seu significado em um array arr.',[['arr[0]','Primeiro elemento'],['arr.length - 1','Índice do último elemento'],['arr.push(x)','Acrescenta x ao fim'],['arr.length','Quantidade de elementos']],'Os índices começam em 0; length conta os elementos, por isso o último índice é length - 1.'),
    o('Ordene o algoritmo que soma os elementos de um array.',['soma = 0','Percorrer cada elemento do array','Somar o elemento atual a soma','Mostrar a soma depois do percurso'],'O acumulador começa em zero, recebe cada elemento e só é mostrado ao final do percurso.')
  ],
  'classes':[
    t('Qual texto é mostrado na saída?','azul','O constructor guarda "azul" em this.cor, e c.cor lê esse atributo.','class Carro {\n  constructor(cor) {\n    this.cor = cor;\n  }\n}\nconst c = new Carro("azul");\nconsole.log(c.cor);'),
    g('Complete a palavra que cria um objeto a partir da classe.',['new'],'new cria uma instância e chama o constructor da classe.','const c = ____ Carro("azul");'),
    q('Qual é a relação entre classe e objeto?','A classe é o molde; o objeto é uma instância criada a partir dela',['O objeto é o molde; a classe é uma cópia dele','Classe e objeto são sempre a mesma coisa'],'A classe descreve a estrutura; cada new cria um objeto concreto com seu próprio estado.'),
    q('Qual cor de a.cor é mostrada após alterar b.cor?','azul',['preto','verde'],'a e b são objetos distintos. Alterar b.cor não modifica o estado de a.','const a = new Carro("azul");\nconst b = new Carro("preto");\nb.cor = "verde";\nconsole.log(a.cor);'),
    p('Associe cada elemento à sua função.',[['class','Declara o molde dos objetos'],['constructor','Define o estado inicial'],['this.cor','Atributo do objeto atual'],['new','Cria uma instância']],'Cada elemento participa da definição ou da criação de objetos.'),
    o('Ordene os passos para usar uma classe.',['Declarar a classe Carro','Escrever o constructor que guarda a cor','Criar um objeto com new Carro("azul")','Ler o atributo cor do objeto'],'A classe precisa ser declarada antes de criar objetos, e o atributo só é lido depois da criação.')
  ],
  'metodos':[
    t('Qual valor de c.valor aparece após duas chamadas de incrementar()?','2','Cada chamada de incrementar soma 1 em valor. Duas chamadas levam o valor de 0 a 2.','class Contador {\n  constructor() { this.valor = 0; }\n  incrementar() { this.valor++; }\n}\nconst c = new Contador();\nc.incrementar();\nc.incrementar();\nconsole.log(c.valor);'),
    t('Qual saldo final de c.saldo aparece após os dois saques?','70','O primeiro saque (30) é permitido e deixa 70. O segundo (80) excede o saldo e é ignorado.','class Conta {\n  constructor() { this.saldo = 100; }\n  sacar(v) {\n    if (v <= this.saldo) { this.saldo -= v; }\n  }\n}\nconst c = new Conta();\nc.sacar(30);\nc.sacar(80);\nconsole.log(c.saldo);'),
    g('Complete o símbolo que torna o campo saldo privado em uma classe JavaScript.',['#'],'Campos que começam com # só podem ser acessados dentro da classe.','class Conta {\n  ____saldo = 0;\n}'),
    q('O que acontece ao acessar c.#saldo fora da classe?','Erro, pois o campo privado não pode ser acessado fora da classe',['Mostra 50','Mostra undefined'],'Um campo com # só existe para o código dentro da classe; acessá-lo de fora é um erro de sintaxe.','class Conta {\n  #saldo = 50;\n}\nconst c = new Conta();\nconsole.log(c.#saldo);'),
    p('Associe cada conceito ao seu papel.',[['Método','Comportamento do objeto'],['this','Objeto que recebeu a chamada'],['Campo privado #','Estado acessível só dentro da classe'],['Validação no método','Protege uma regra do objeto']],'Métodos usam this para acessar o estado; campos privados e validações protegem as regras.'),
    o('Ordene a execução de sacar(v) com validação.',['Receber o valor do saque','Verificar se o valor não passa do saldo','Subtrair o valor do saldo','Retornar ao código que chamou o método'],'A validação precisa acontecer antes da alteração do saldo.')
  ],
  'heranca':[
    t('Qual texto new Gato().falar() mostra na saída?','miau','Gato sobrescreve falar; a versão de Gato é a usada.','class Animal {\n  falar() { return "som"; }\n}\nclass Gato extends Animal {\n  falar() { return "miau"; }\n}\nconsole.log(new Gato().falar());'),
    g('Complete a palavra que chama o constructor da classe pai.',['super'],'Em uma classe derivada, super(...) executa o constructor de Animal.','class Animal {\n  constructor(nome) { this.nome = nome; }\n}\nclass Cachorro extends Animal {\n  constructor(nome) {\n    ____(nome);\n  }\n}'),
    q('Qual texto new Cachorro().falar() mostra ao herdar de Animal?','som',['Cachorro','undefined'],'Cachorro não define falar; ele herda a versão de Animal.','class Animal {\n  falar() { return "som"; }\n}\nclass Cachorro extends Animal {}\nconsole.log(new Cachorro().falar());'),
    q('Cachorro tem falar() que devolve "au" e Gato tem falar() que devolve "miau". O que o laço mostra?','au e miau, nesta ordem',['miau e au, nesta ordem','au duas vezes'],'Cada objeto executa a própria versão de falar; essa é a ideia do polimorfismo.','const bichos = [new Cachorro(), new Gato()];\nfor (const b of bichos) {\n  console.log(b.falar());\n}'),
    p('Associe cada termo ao seu significado.',[['extends','Declara uma especialização'],['super','Acessa o construtor ou método da classe pai'],['Sobrescrita','Método filho substitui o do pai'],['Polimorfismo','Mesma chamada, comportamentos diferentes']],'Esses termos descrevem como uma subclasse reutiliza e adapta o comportamento do pai.'),
    o('Ordene o que acontece em new Cachorro("Rex").',['new Cachorro("Rex") é executado','O constructor de Cachorro chama super(nome)','O constructor de Animal guarda o nome','O constructor de Cachorro termina e o objeto é devolvido'],'A classe derivada precisa chamar super antes de concluir sua construção.')
  ]
  });
})();
