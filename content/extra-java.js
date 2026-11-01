'use strict';
// Atividades extras (6 por lição) da trilha Java. Acrescentadas depois das 2 atividades legadas.
(()=>{
  let serial=0;
  const q=(prompt,correct,wrong,explanation,code)=>{const options=[correct,...wrong];const answer=serial++%options.length;for(let i=0;i<answer;i++)options.unshift(options.pop());return {type:'choice',prompt,options,answer,explanation,code};};
  const t=(prompt,accepted,explanation,code)=>({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,code});
  const o=(prompt,steps,explanation)=>({type:'order',prompt,options:[...steps].reverse(),answer:steps.map((_,i)=>steps.length-i-1),explanation});
  const p=(prompt,pairs,explanation)=>({type:'pairs',prompt,pairs,explanation});
  const g=(prompt,accepted,explanation,code)=>({...t(prompt,accepted,explanation,code),type:'gap'});

  window.LINCODE_EXTRA=window.LINCODE_EXTRA||{};
  window.LINCODE_EXTRA.java=Object.assign(window.LINCODE_EXTRA.java||{},{

  'introducao':[
    q('Em Java, o que o compilador produz a partir do código-fonte?','Bytecode, que a máquina virtual Java executa',['Uma página HTML exibida pelo navegador','Texto que o computador lê linha a linha sem nenhuma etapa prévia'],'O código-fonte é compilado para bytecode, e a JVM (máquina virtual Java) executa esse bytecode.'),
    t('Qual sigla de três letras designa o kit usado para desenvolver programas em Java?',['JDK','jdk'],'JDK (Java Development Kit) é o kit de desenvolvimento citado na introdução da trilha.'),
    p('Associe cada termo ao seu papel.',[['JDK','Kit para desenvolver e compilar programas'],['JVM','Máquina virtual que executa o bytecode'],['main','Método onde o programa inicial começa'],['class','Estrutura que agrupa código e dados']],'Cada termo tem uma função distinta no caminho entre escrever e executar um programa Java.'),
    o('Ordene o caminho do código-fonte até o resultado.',['Escrever o código-fonte','Compilar para bytecode','Entregar o bytecode à máquina virtual Java','Ver o resultado do programa'],'O código precisa existir, ser compilado e só então é executado pela JVM, que produz o resultado.'),
    q('O que a declaração mostrada indica sobre a natureza de Java ter tipos explícitos?','pontos guarda um número inteiro, pois foi declarado como int',['O tipo de pontos só é descoberto quando o programa termina','int é o nome da variável e pontos é o tipo'],'Em Java o tipo aparece na declaração: int é o tipo e pontos é o nome da variável.','int pontos = 10;'),
    q('Um exemplo da trilha mostra só uma linha com System.out.println, sem classe. Como interpretá-la?','Num programa completo, ela ficaria dentro de um método main em uma classe',['Java dispensa classes e métodos para qualquer programa','A linha roda sozinha, sem JVM'],'A introdução avisa que os trechos podem omitir o contexto: um programa inicial normalmente tem uma classe e um método main.')
  ],

  'primeira-resposta':[
    t('Que texto o comando abaixo mostra? Digite sem aspas.',['Java'],'O comando println mostra a string entre aspas, sem as aspas: Java.','System.out.println("Java");'),
    t('Qual valor está associado a nivel? Digite somente o número.',['3'],'A atribuição liga o valor 3 ao nome nivel.','int nivel = 3;'),
    g('Complete o nome do método que mostra o texto e passa para a linha seguinte.',['println'],'println mostra o texto e depois quebra a linha; print mostraria sem quebrar.','System.out.____("Bem-vindo");'),
    q('Qual destas linhas está sintaticamente correta em Java?','System.out.println("Oi");',['System.out.println("Oi")','system.out.println("Oi");','System.out.println(Oi);'],'Java exige ponto e vírgula, diferencia maiúsculas de minúsculas (System, não system) e Oi sem aspas seria um nome de variável inexistente.'),
    p('Associe cada parte do trecho ao seu papel.',[['System.out.println','Comando de saída'],['"Olá"','Texto (string)'],['int','Tipo da variável'],[';','Fim da instrução']],'Cada parte do código tem uma função: mostrar, representar texto, declarar o tipo e encerrar a instrução.'),
    o('Ordene as linhas de um programa mínimo que mostra uma mensagem.',['Declarar a classe','Declarar o método main dentro da classe','Escrever o comando de saída dentro do main','Fechar o método e a classe'],'O comando fica dentro do main, que fica dentro da classe; as chaves são fechadas por último.')
  ],

  'saida':[
    t('Qual texto o comando abaixo mostra? Digite exatamente o que aparece na saída.',['Sala 3'],'O operador + junta o texto "Sala " ao número 3, produzindo Sala 3.','System.out.println("Sala " + 3);'),
    t('Quantas linhas de saída este trecho produz?',['2'],'print não quebra a linha: A e B ficam juntos (AB) e println encerra a linha. C ocupa a segunda linha. Total: 2.','System.out.print("A");\nSystem.out.println("B");\nSystem.out.println("C");'),
    o('Ordene as linhas do método para mostrar Olá e, em seguida, Java, cada um em uma linha.',['public static void main(String[] args) {','System.out.println("Olá");','System.out.println("Java");','}'],'As instruções executam de cima para baixo dentro do método; a chave final fecha o main.'),
    g('Complete o operador que junta o texto ao número 5 e mostra Total: 5.',['+'],'Com uma string em um dos lados, + concatena: "Total: " + 5 resulta em Total: 5.','System.out.println("Total: " ____ 5);'),
    q('Qual comando mostra o número 5 como resultado de uma conta, e não o texto 2 + 3?','System.out.println(2 + 3);',['System.out.println("2 + 3");','System.out.println("2" + "3");'],'Sem aspas, 2 + 3 é calculado (5). Com aspas, é texto: "2 + 3" aparece literalmente e "2" + "3" resulta em 23.'),
    p('Associe cada comando ao que ele mostra.',[['System.out.println("2" + "3");','23'],['System.out.println(2 + 3);','5'],['System.out.println("2 + 3");','2 + 3'],['System.out.println(2 * 3);','6']],'Strings são concatenadas, números são calculados e um texto entre aspas é exibido sem alteração.')
  ],

  'algoritmos':[
    t('Um algoritmo lê base = 6 e altura = 4 e calcula a área do retângulo (base × altura). Qual valor ele mostra?',['24'],'6 × 4 = 24.'),
    o('Ordene o algoritmo que calcula o preço final com 10 reais de desconto.',['Início','Ler o preço','preço final = preço − 10','Mostrar o preço final','Fim'],'A entrada vem primeiro, depois o processamento e, por último, a saída.'),
    p('Classifique cada etapa de um algoritmo que triplica um número.',[['Número digitado pelo usuário','Entrada'],['Multiplicar o número por 3','Processamento'],['Resultado exibido na tela','Saída']],'Entrada é o dado recebido, processamento é a transformação e saída é o resultado entregue.'),
    q('Por que “faça um cálculo com os números” não é um bom algoritmo?','Os passos não são claros: não diz qual cálculo fazer nem qual resultado entregar',['Algoritmos não podem usar números','Todo algoritmo precisa ter repetição'],'Um algoritmo exige passos claros e um resultado definido; a instrução é vaga demais para ser executada ou testada.'),
    t('Algoritmo: ler n; r = n + 4; r = r × 2; mostrar r. Para n = 3, qual valor é mostrado?',['14'],'Primeiro r = 3 + 4 = 7; depois r = 7 × 2 = 14.'),
    q('Trocando a ordem das duas contas do algoritmo anterior (primeiro × 2, depois + 4), o que acontece com a saída para n = 3?','Passa a ser 10, pois a ordem dos passos altera o resultado',['Continua 14, pois a ordem não importa','Passa a ser 7'],'Na nova ordem: 3 × 2 = 6 e 6 + 4 = 10. A ordem dos passos pode mudar o resultado.')
  ],

  'variaveis':[
    t('Qual é o valor de b ao final do trecho?',['7'],'b recebe a + 3 = 7 no momento da atribuição. Mudar a depois para 10 não altera b.','int a = 4;\nint b = a + 3;\na = 10;'),
    t('Qual é o valor de x ao final do trecho?',['9'],'x passa por 2, depois 2 × 5 = 10 e, por fim, 10 − 1 = 9.','int x = 2;\nx = x * 5;\nx = x - 1;'),
    p('Associe cada valor ao tipo Java adequado.',[['42','int'],['"Ana"','String'],['true','boolean'],['3.5','double']],'Inteiros usam int, texto usa String, verdadeiro ou falso usa boolean e números com parte decimal usam double.'),
    q('Depois de pontos = 10 e então pontos = 20, o que acontece com o valor antigo?','Ele é substituído: pontos passa a valer 20',['Os dois valores ficam guardados em pontos','pontos continua valendo 10 e o 20 é ignorado'],'Uma variável guarda um valor por vez; a nova atribuição substitui o anterior.'),
    o('Ordene os passos para trocar os valores de a e b usando uma variável auxiliar.',['aux = a','a = b','b = aux','Mostrar a e b'],'Guardar a em aux evita perder o valor original quando a recebe b; depois b recebe o valor guardado.'),
    q('Por que a = b; b = a; não troca os valores de a e b?','Depois de a = b o valor original de a se perde, e b recebe o mesmo valor',['Porque uma variável não pode receber o valor de outra','Porque o computador executa as duas linhas ao mesmo tempo'],'As linhas executam em sequência: ao fim, as duas variáveis têm o valor original de b.')
  ],

  'decisoes':[
    t('Qual texto é mostrado? Digite exatamente a mensagem.',['Recuperação','Recuperacao'],'6 >= 7 é falso, então executa o ramo else e mostra Recuperação.','int nota = 6;\nif (nota >= 7) {\n    System.out.println("Aprovado");\n} else {\n    System.out.println("Recuperação");\n}'),
    t('Quantas vezes o corpo do laço é executado?',['3'],'i vale 5, 6 e 7. Com i = 8, a condição i < 8 é falsa. Total: 3 execuções.','for (int i = 5; i < 8; i++) {\n    System.out.println(i);\n}'),
    g('Complete o operador para mostrar Menor apenas quando idade for menor que 18.',['<'],'idade < 18 é verdadeiro somente para valores abaixo de 18; com 18 a condição é falsa.','if (idade ____ 18) {\n    System.out.println("Menor");\n}'),
    o('Ordene o raciocínio para decidir se um número é par.',['Ler o número','Calcular o resto da divisão por 2','Comparar o resto com 0','Mostrar par se o resto for 0, ou ímpar caso contrário'],'A decisão só pode ser feita depois de calcular o resto e compará-lo com zero.'),
    p('Com x = 5, associe cada condição ao seu resultado.',[['x > 5','Falso: 5 não é maior que 5'],['x >= 5','Verdadeiro: a igualdade conta'],['x != 5','Falso: x é igual a 5'],['x < 9','Verdadeiro: 5 é menor que 9']],'Avalie cada comparação com x = 5, atento ao caso de igualdade.'),
    q('Em Java, qual expressão compara se dois inteiros a e b são iguais?','a == b',['a = b','a => b'],'== compara; = atribui um valor e não serve como comparação em um if com inteiros.')
  ],

  'simbolos':[
    q('Qual símbolo marca o início e o fim de um fluxograma?','Oval',['Losango','Retângulo'],'A oval indica o início ou o fim do algoritmo.'),
    p('Associe cada bloco ao símbolo correto.',[['Mostrar a média','Paralelogramo'],['total = a + b','Retângulo'],['nota ≥ 7?','Losango'],['Fim','Oval']],'Saída é paralelogramo, cálculo é retângulo (processo), pergunta é losango (decisão) e o fim é oval.'),
    t('Quantas setas saem de um losango de decisão simples, com os caminhos Sim e Não?',['2'],'Uma decisão simples tem uma saída para cada resultado da condição: Sim e Não.'),
    o('Ordene os símbolos de um fluxograma que lê dois números, soma e mostra o total.',['Oval: Início','Paralelogramo: Ler a e b','Retângulo: soma = a + b','Paralelogramo: Mostrar soma','Oval: Fim'],'Início, entrada, processamento, saída e fim, nessa ordem.'),
    q('Qual símbolo deve conter o passo contador = contador + 1?','Retângulo',['Losango','Paralelogramo'],'Atualizar um valor é processamento, representado pelo retângulo.'),
    q('Por que o losango precisa de ao menos dois caminhos rotulados?','Porque cada resultado da condição, verdadeiro ou falso, leva a um caminho diferente',['Porque o losango executa um cálculo duas vezes','Porque setas só podem sair em pares de qualquer símbolo'],'A decisão separa os fluxos conforme a condição seja verdadeira ou falsa.')
  ],

  'montar-fluxo':[
    o('Monte o algoritmo que calcula a área de um quadrado a partir do lado.',['Início','Ler lado','área = lado × lado','Mostrar área','Fim'],'Leia o lado, calcule a área e só então mostre o resultado.'),
    t('No fluxo da área do quadrado, qual é a saída para lado = 7?',['49'],'7 × 7 = 49.'),
    p('Associe cada bloco do fluxo que calcula o triplo ao seu papel.',[['Ler número','Recebe o dado de entrada'],['triplo = número × 3','Transforma a entrada em resultado'],['Mostrar triplo','Entrega a saída'],['Fim','Encerra o fluxo']],'Cada bloco tem uma responsabilidade: entrada, processamento, saída e encerramento.'),
    q('Um aluno colocou Mostrar resultado logo depois de Início. O que falta antes desse bloco?','Ler a entrada e calcular o resultado',['Uma repetição obrigatória','Um segundo bloco de Início'],'Para mostrar um resultado, ele precisa ter sido calculado a partir de uma entrada.'),
    t('Fluxo: Ler n; r = n × n; r = r + 1; Mostrar r. Para n = 5, qual é a saída?',['26'],'r = 5 × 5 = 25 e depois r = 25 + 1 = 26.'),
    q('Para ler dois números e mostrar a soma, quantos blocos de processo são necessários, no mínimo?','1 bloco: soma = a + b',['2 blocos: um para cada número lido','Nenhum, pois a soma é só entrada e saída'],'Ler e mostrar são blocos de entrada e saída; a soma é um único processamento.')
  ],

  'seguir-fluxo':[
    t('Siga o fluxo para valor = 100. Qual desconto é mostrado?',['10'],'100 ≥ 100 é verdadeiro, então segue o caminho Sim e desconto = 10.','Ler valor\nvalor ≥ 100?\n  Sim → desconto = 10\n  Não → desconto = 0\nMostrar desconto'),
    t('Siga o mesmo fluxo para valor = 99. Qual desconto é mostrado?',['0'],'99 ≥ 100 é falso, então segue o caminho Não e desconto = 0.','Ler valor\nvalor ≥ 100?\n  Sim → desconto = 10\n  Não → desconto = 0\nMostrar desconto'),
    q('Com valor = 100, quantos caminhos de saída do losango são percorridos?','Um só: o caminho Sim',['Dois: Sim e Não','Nenhum, pois a igualdade não decide'],'Apenas um caminho é seguido por decisão. A igualdade satisfaz ≥, então é o Sim.'),
    o('Ordene o percurso do fluxo para valor = 150.',['Ler valor (150)','Avaliar 150 ≥ 100 como verdadeiro','Seguir a seta Sim e fazer desconto = 10','Mostrar desconto','Fim'],'A leitura vem primeiro, depois a condição decide o caminho, o desconto é definido e então é mostrado.'),
    p('Associe cada valor ao caminho seguido.',[['valor = 40','Não, pois 40 < 100'],['valor = 100','Sim, pois 100 = 100 satisfaz ≥'],['valor = 500','Sim, pois 500 > 100']],'Compare cada valor com 100 usando ≥ para saber o ramo.'),
    q('Se alguém trocar ≥ por > no losango, qual entrada passa a seguir o caminho errado?','valor = 100',['valor = 150','valor = 50'],'Só o valor de fronteira muda: com >, 100 deixa de seguir o Sim; 150 e 50 seguem os mesmos caminhos.')
  ],

  'funcoes':[
    t('Qual número será mostrado?',['7'],'soma(3, 4) devolve 3 + 4 = 7.','static int soma(int a, int b) {\n    return a + b;\n}\n// No método main:\nSystem.out.println(soma(3, 4));'),
    t('Qual número quadrado(quadrado(2)) mostrará?',['16'],'quadrado(2) é 4; depois quadrado(4) é 16.','static int quadrado(int n) {\n    return n * n;\n}\n// No método main:\nSystem.out.println(quadrado(quadrado(2)));'),
    g('Complete o tipo de retorno do método.',['int'],'O método devolve n * 3, um valor inteiro, então o tipo de retorno é int.','static ____ triplo(int n) {\n    return n * 3;\n}'),
    p('Associe cada trecho ao seu papel.',[['int n','Parâmetro'],['return n * 3;','Devolve o resultado a quem chamou'],['triplo(5)','Chamada com o argumento 5'],['void','Indica que o método não devolve valor']],'Parâmetro recebe, return devolve, a chamada fornece o argumento e void marca ausência de retorno.'),
    o('Ordene a execução de System.out.println(dobro(4));',['O argumento 4 é copiado para o parâmetro n','O corpo calcula n * 2 = 8','return devolve 8 a quem chamou','println mostra 8'],'A chamada passa o argumento, o corpo calcula, o retorno entrega e só então o println exibe.'),
    q('Por que a linha int r = mostrar(5); não compila?','Um método void não devolve valor para guardar em r',['Porque 5 não é um int','Porque println não pode ficar dentro de métodos'],'void significa que não há retorno, então não há valor para atribuir a uma variável int.','static void mostrar(int n) {\n    System.out.println(n);\n}\n// No método main:\nint r = mostrar(5);')
  ],

  'colecoes':[
    t('Qual número notas[2] mostrará?',['9'],'Os índices são 0, 1, 2, 3. Na posição 2 está o 9.','int[] notas = {7, 3, 9, 5};\nSystem.out.println(notas[2]);'),
    t('Qual tamanho v.length mostrará?',['3'],'length informa a quantidade de elementos do array: 3.','int[] v = {10, 20, 30};\nSystem.out.println(v.length);'),
    q('O que acontece ao executar a última linha, se v tem 3 elementos?','Erro em execução: índice fora dos limites (ArrayIndexOutOfBoundsException)',['Mostra 0','Mostra o último elemento'],'Os índices válidos vão de 0 a 2. O índice 3 não existe e provoca exceção em tempo de execução.','int[] v = {10, 20, 30};\nSystem.out.println(v[3]);'),
    g('Complete o índice para mostrar 15.',['2'],'O 15 é o terceiro elemento; contando a partir de zero, seu índice é 2.','int[] v = {4, 8, 15};\nSystem.out.println(v[____]);'),
    o('Ordene os passos para somar todos os elementos de um array.',['Criar soma = 0','Percorrer cada índice do array','Somar o elemento atual à soma','Mostrar a soma depois do laço'],'O acumulador começa em zero antes do laço, recebe cada elemento durante o laço e é mostrado ao final.'),
    p('Com o array n abaixo, associe cada expressão ao seu valor.',[['n[0]','5'],['n[n.length - 1]','2'],['n.length','3'],['n[0] + n[2]','7']],'n[0] é 5, o último índice é 2 (valor 2), o tamanho é 3 e 5 + 2 é 7.','int[] n = {5, 8, 2};')
  ],

  'classes':[
    t('Qual texto é mostrado?',['azul','"azul"'],'O construtor guarda "azul" no atributo cor do objeto c, que println exibe.','class Carro {\n    String cor;\n    Carro(String cor) { this.cor = cor; }\n}\n// No método main:\nCarro c = new Carro("azul");\nSystem.out.println(c.cor);'),
    g('Complete a palavra-chave que cria um novo objeto.',['new'],'Em Java, new chama o construtor e cria o objeto.','Jogador ana = ____ Jogador("Ana");'),
    p('Associe cada elemento ao seu papel.',[['class Jogador','Molde que descreve o tipo'],['ana','Variável que referencia um objeto'],['String nome;','Atributo'],['Jogador(String nome)','Construtor']],'A classe é o molde, o objeto é criado com new, os atributos guardam estado e o construtor o inicializa.'),
    o('Ordene a construção e o uso de um objeto.',['Declarar a classe com seus atributos','Escrever o construtor que define o estado inicial','Criar o objeto com new','Ler o atributo do objeto criado'],'A classe precisa existir antes de o objeto ser criado, e o atributo só é lido depois.'),
    q('Dois objetos Jogador são criados com nomes diferentes. O que cada um tem de próprio?','Sua própria cópia dos atributos, como o nome',['Todos compartilham sempre um único nome','Nada, pois objetos não guardam atributos'],'Cada instância tem seu próprio estado; o nome de um objeto não altera o do outro.'),
    q('No construtor, para que serve this.nome = nome;?','Copia o parâmetro nome para o atributo nome do objeto',['Cria uma nova classe chamada nome','Mostra nome na saída'],'this.nome é o atributo do objeto; nome, sozinho, é o parâmetro. A linha copia o parâmetro para o atributo.','Jogador(String nome) {\n    this.nome = nome;\n}')
  ],

  'metodos':[
    t('Qual valor de c.valor será mostrado após três incrementos?',['3'],'Cada chamada soma 1 a valor, que começa em 0: depois de três chamadas, vale 3.','class Contador {\n    int valor = 0;\n    void incrementar() { valor++; }\n}\n// No método main:\nContador c = new Contador();\nc.incrementar();\nc.incrementar();\nc.incrementar();\nSystem.out.println(c.valor);'),
    t('Qual saldo final de c.saldo será mostrado?',['20'],'O primeiro saque (30 ≤ 50) leva o saldo a 20. O segundo (30 ≤ 20) é falso, então o saldo continua 20.','class Conta {\n    int saldo = 50;\n    void sacar(int valor) {\n        if (valor <= saldo) {\n            saldo = saldo - valor;\n        }\n    }\n}\n// No método main:\nConta c = new Conta();\nc.sacar(30);\nc.sacar(30);\nSystem.out.println(c.saldo);'),
    g('Complete o modificador que impede o acesso direto ao atributo fora da classe.',['private'],'private restringe o acesso ao interior da classe, base do encapsulamento.','class Conta {\n    ____ int saldo;\n}'),
    p('Associe cada elemento de encapsulamento ao seu papel.',[['private','Restringe o acesso à própria classe'],['getSaldo()','Método de leitura (getter)'],['sacar(int valor)','Comportamento que altera o estado com regra'],['return saldo;','Devolve o valor do atributo']],'O encapsulamento combina atributo protegido, leitura controlada e métodos que respeitam as regras.'),
    o('Ordene os passos de um método sacar seguro.',['Receber o valor do saque','Verificar se o valor é positivo e não passa do saldo','Subtrair o valor do saldo','Informar o novo saldo'],'A verificação deve vir antes de alterar o saldo; só depois se informa o resultado.'),
    q('Um atributo saldo é público e qualquer código pode fazer c.saldo = -500. Que problema o encapsulamento evita?','Estado inválido por alteração sem checagem das regras',['Erro de sintaxe ao declarar int','Impossibilidade de criar objetos'],'Ao controlar o acesso por métodos, a classe garante que o saldo só mude respeitando suas regras.')
  ],

  'heranca':[
    g('Complete a palavra-chave que faz Cachorro herdar de Animal.',['extends'],'Em Java, extends declara que uma classe especializa outra.','class Cachorro ____ Animal { }'),
    t('Qual texto a chamada a.som() mostra?',['miau','"miau"'],'A variável é do tipo Animal, mas o objeto é Gato; a chamada executa a versão de Gato (polimorfismo).','class Animal {\n    String som() { return "..."; }\n}\nclass Gato extends Animal {\n    String som() { return "miau"; }\n}\n// No método main:\nAnimal a = new Gato();\nSystem.out.println(a.som());'),
    p('Associe cada elemento de herança ao seu papel.',[['extends','Declara que uma classe especializa outra'],['@Override','Indica que o método redefine o da superclasse'],['super','Acessa a superclasse'],['Animal a = new Gato();','Referência geral apontando para objeto específico']],'Cada elemento participa da herança e do polimorfismo em Java.'),
    o('Ordene uma chamada polimórfica.',['Criar um objeto Cachorro','Guardá-lo em uma variável do tipo Animal','Chamar som() pela variável','O método som() de Cachorro é executado'],'O objeto é criado e referenciado como Animal; na chamada, a versão do tipo real do objeto é executada.'),
    q('Peixe não redefine som(). O que a chamada mostra?','sem som, valor herdado de Animal',['Erro de compilação por faltar som() em Peixe','null'],'Peixe herda som() de Animal; sem redefinição, usa-se a versão herdada.','class Animal {\n    String som() { return "sem som"; }\n}\nclass Peixe extends Animal { }\n// No método main:\nSystem.out.println(new Peixe().som());'),
    q('De quantas classes uma classe Java pode herdar diretamente?','De uma só: Java tem herança simples de classes',['De quantas quiser','De nenhuma'],'Uma classe estende uma única superclasse; o reuso de comportamento múltiplo é feito com interfaces.')
  ]

  });
})();
