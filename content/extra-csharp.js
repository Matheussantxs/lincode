'use strict';
(()=>{
  let serial=0;
  const q=(prompt,correct,wrong,explanation,code)=>{const options=[correct,...wrong];const answer=serial++%options.length;for(let i=0;i<answer;i++)options.unshift(options.pop());return {type:'choice',prompt,options,answer,explanation,code};};
  const t=(prompt,accepted,explanation,code)=>({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,code});
  const o=(prompt,steps,explanation)=>({type:'order',prompt,options:[...steps].reverse(),answer:steps.map((_,i)=>steps.length-i-1),explanation});
  const p=(prompt,pairs,explanation)=>({type:'pairs',prompt,pairs,explanation});
  const gap=(prompt,accepted,explanation,code)=>({...t(prompt,accepted,explanation,code),type:'gap'});

  const conta='class Conta {\n    public int Saldo = 100;\n    public void Sacar(int v) {\n        if (v <= Saldo) Saldo -= v;\n    }\n}\n// Em um contexto de execução:\nConta c = new Conta();\n';
  const animal='class Animal {\n    public virtual string Som() { return "..."; }\n}\nclass Cao : Animal {\n    public override string Som() { return "Au"; }\n}\n';

  window.LINCODE_EXTRA=window.LINCODE_EXTRA||{};
  window.LINCODE_EXTRA.csharp=Object.assign(window.LINCODE_EXTRA.csharp||{},{
    'introducao':[
      q('Qual plataforma é a base da linguagem C# nesta trilha?','A plataforma .NET',['Somente o navegador','Um editor de imagens'],'A introdução apresenta C# como linguagem de uso geral da plataforma .NET.'),
      q('Quais aplicações a introdução cita para C#?','Aplicações web, desktop e jogos',['Apenas planilhas','Somente páginas estáticas sem lógica'],'C# é de uso geral: aparece em aplicações web, desktop e jogos.'),
      q('O que se usa para criar e executar um projeto C# fora das lições?','O SDK .NET',['Apenas um leitor de PDF','Nenhuma ferramenta: o código executa sozinho'],'O SDK .NET fornece as ferramentas para construir e executar projetos.'),
      p('Associe cada conceito ao seu papel em C#.',[['Tipos','Dizem que espécie de valor uma variável guarda'],['Métodos','Agrupam passos que podem ser chamados'],['Objetos','Combinam estado e comportamento'],['SDK .NET','Cria e executa projetos']],'Tipos, métodos e objetos estruturam o código; o SDK fornece as ferramentas para construir e executar.'),
      gap('Complete com o símbolo que encerra a instrução de declaração em C#.',[';'],'Em C#, instruções simples terminam com ponto e vírgula.','int pontos = 10____'),
      o('Ordene os passos para praticar C# fora das lições.',['Instalar o SDK .NET','Criar um projeto','Escrever o código','Executar o projeto','Ler a saída produzida'],'É preciso ter as ferramentas e o projeto antes de escrever e executar o código; a saída vem por último.')
    ],
    'primeira-resposta':[
      t('Digite o que aparece na saída, sem as aspas.','C# funciona','O comando mostra exatamente o texto entre aspas: C# funciona.','Console.WriteLine("C# funciona");'),
      t('Digite o tipo da variável declarada abaixo.','int','int vem antes do nome e indica que a variável guarda um número inteiro.','int vidas = 3;'),
      q('O que a linha abaixo mostra na saída?','O texto 3 + 4',['O número 7','Um erro por causa do sinal +'],'Tudo entre aspas é texto: a conta não é calculada, o texto é mostrado como está.','Console.WriteLine("3 + 4");'),
      gap('Complete o nome do comando que mostra texto e muda de linha.',['WriteLine'],'Console.WriteLine mostra o valor e passa para a próxima linha. C# diferencia maiúsculas de minúsculas.','Console.____("Oi");'),
      o('Ordene as instruções para que a tela mostre 15.',['int pontos = 10;','pontos = pontos + 5;','Console.WriteLine(pontos);'],'A variável precisa existir, depois recebe 10 + 5 = 15 e só então é mostrada.'),
      p('Associe cada parte da linha ao seu papel.',[['Console.WriteLine','Comando de saída'],['"Olá"','Texto (string)'],['pontos','Nome da variável'],['10','Valor associado à variável']],'Cada elemento tem uma função: o comando mostra, o texto vai entre aspas, o nome identifica e o valor é guardado.')
    ],
    'saida':[
      t('Quantas linhas aparecem na saída?','2','Cada WriteLine mostra o texto e muda de linha: uma linha com A e outra com B.','Console.WriteLine("A");\nConsole.WriteLine("B");'),
      q('Qual é a saída deste código?','OiAna',['Oi e Ana em linhas separadas','Oi Ana'],'Console.Write não muda de linha nem acrescenta espaço: os textos ficam juntos.','Console.Write("Oi");\nConsole.Write("Ana");'),
      gap('Complete a interpolação para mostrar Olá, Ana!',['{nome}'],'Em uma string interpolada ($"..."), o que está entre chaves é substituído pelo valor da variável.','string nome = "Ana";\nConsole.WriteLine($"Olá, ____!");'),
      q('Qual é a saída deste código com aspas escapadas?','Ela disse: "oi"',['Ela disse: \\"oi\\"','Erro de compilação'],'A sequência \\" insere uma aspa dupla no texto sem encerrá-lo; a barra não aparece.','Console.WriteLine("Ela disse: \\"oi\\"");'),
      p('Associe cada recurso de saída ao seu efeito.',[['Console.WriteLine','Mostra e muda de linha'],['Console.Write','Mostra sem mudar de linha'],['\\n dentro do texto','Quebra de linha'],['$"{x}"','Insere o valor de x no texto']],'Cada recurso controla de um modo como o texto aparece na tela.'),
      o('Ordene os passos para mostrar uma saudação com o nome.',['Guardar o nome em uma string','Montar o texto com o nome','Chamar Console.WriteLine com o texto','Ver a saudação na tela'],'O nome precisa existir antes de entrar no texto, e o texto precisa estar pronto antes de ser mostrado.')
    ],
    'algoritmos':[
      t('Um algoritmo recebe base 6 e altura 4 de um retângulo e calcula base × altura. Qual é a saída?','24','6 × 4 = 24.'),
      o('Ordene o algoritmo que calcula a média de duas notas.',['Ler as duas notas','Somar as notas','Dividir a soma por 2','Mostrar a média'],'Os dados vêm primeiro; a soma precede a divisão; a média só pode ser mostrada depois de calculada.'),
      p('Associe cada item do algoritmo da área à sua função.',[['Base e altura','Entrada'],['base × altura','Processamento'],['Valor da área exibido','Saída'],['Passos claros e ordenados','Característica de um algoritmo']],'A entrada é o dado recebido, o processamento o transforma e a saída entrega o resultado.'),
      q('Qual instrução é imprecisa para um algoritmo?','Faça uma conta com os valores',['Some a e b e guarde em r','Mostre r na tela'],'Não diz qual conta fazer nem com quais valores. Um algoritmo exige passos claros e sem ambiguidade.'),
      t('Um algoritmo lê preço 50 e desconto 10 e calcula preço − desconto. Qual é a saída?','40','50 − 10 = 40.'),
      q('Por que testar um algoritmo com uma entrada cuja saída esperada você já conhece?','Para comparar o resultado obtido com o esperado',['Para evitar definir a entrada','Para reduzir o número de passos'],'Comparar o resultado com o esperado revela se os passos estão corretos.')
    ],
    'variaveis':[
      t('Qual é o valor final de a?','14','a começa em 4; depois 4 + 3 = 7; depois 7 × 2 = 14.','int a = 4;\na = a + 3;\na = a * 2;'),
      t('Qual é o valor de y ao final?','5','y recebe uma cópia do valor de x naquele momento (5). Mudar x depois não altera y.','int x = 5;\nint y = x;\nx = 9;'),
      q('Qual declaração é válida em C#?','int idade = 20;',['idade int = 20;','int = idade 20;'],'Em C# o tipo vem antes do nome, seguido de = e do valor.'),
      gap('Complete o operador para que vidas passe de 3 para 2.',['-'],'3 − 1 = 2. A nova atribuição usa o valor anterior de vidas.','int vidas = 3;\nvidas = vidas ____ 1;'),
      p('Associe cada tipo ao que ele guarda.',[['int','Número inteiro'],['string','Texto'],['bool','Verdadeiro ou falso'],['double','Número com casas decimais']],'Cada tipo define a natureza do valor que a variável aceita.'),
      o('Ordene os passos para trocar os valores de a (1) e b (2) usando uma variável auxiliar.',['int aux = a;','a = b;','b = aux;','Mostrar a e b'],'aux guarda 1; a recebe 2; b recebe o 1 guardado em aux. Sem aux, o valor de a seria perdido.')
    ],
    'decisoes':[
      t('Qual texto é mostrado?','B','n > 5 é falso (5 não é maior que 5), então executa o ramo else.','int n = 5;\nif (n > 5) {\n    Console.WriteLine("A");\n} else {\n    Console.WriteLine("B");\n}'),
      t('Quantas vezes o corpo deste laço é executado?','4','i assume 1, 2, 3 e 4. Com i = 5, a condição i <= 4 é falsa.','for (int i = 1; i <= 4; i++) {\n    Console.WriteLine(i);\n}'),
      q('Qual é o valor mostrado?','6',['3','10'],'s acumula 1 + 2 + 3 = 6; o laço para quando i chega a 4.','int s = 0;\nfor (int i = 1; i <= 3; i++) {\n    s += i;\n}\nConsole.WriteLine(s);'),
      gap('Complete o operador para aprovar quem tem nota 7 ou mais.',['>='],'>= inclui a igualdade, então a nota 7 também é aprovada.','int nota = 7;\nif (nota ____ 7) {\n    Console.WriteLine("Aprovado");\n}'),
      p('Com x = 3, associe cada condição ao seu resultado.',[['x > 3','Falso: 3 não é maior que 3'],['x >= 3','Verdadeiro: há igualdade'],['x == 3','Verdadeiro: x é igual a 3'],['x != 3','Falso: x não é diferente de 3']],'Na fronteira, > e != são falsos, enquanto >= e == são verdadeiros.'),
      o('Ordene a execução de um for com i começando em 0 e condição i < 2.',['Inicializar i = 0','Testar i < 2','Executar o corpo','Incrementar i','Testar i < 2 novamente'],'A inicialização ocorre uma vez; depois testa, executa, atualiza e volta ao teste.')
    ],
    'simbolos':[
      q('Qual símbolo marca o início de um fluxograma?','Oval',['Losango','Retângulo'],'A oval representa início ou fim.'),
      q('Qual símbolo representa a instrução total = preço × 2?','Retângulo',['Paralelogramo','Oval'],'Um cálculo ou atribuição é um processo, representado pelo retângulo.'),
      p('Associe cada passo ao símbolo adequado.',[['Ler a temperatura','Paralelogramo'],['Temperatura > 30?','Losango'],['alerta = verdadeiro','Retângulo'],['Fim','Oval']],'Leitura é entrada, pergunta é decisão, atribuição é processo e fim usa a oval.'),
      t('Quantas setas saem de um losango em uma decisão simples de Sim e Não?',['2','duas'],'Cada resposta possível segue seu próprio caminho: uma seta Sim e uma seta Não.'),
      o('Ordene os símbolos de um fluxograma que lê um número e mostra o triplo.',['Oval: Início','Paralelogramo: Ler número','Retângulo: triplo = número × 3','Paralelogramo: Mostrar triplo','Oval: Fim'],'Início, entrada, processamento, saída e fim, nessa ordem.'),
      q('Qual é a função das setas em um fluxograma?','Indicar a direção e a ordem do fluxo',['Guardar valores','Executar cálculos'],'As setas ligam os símbolos e definem a sequência dos passos.')
    ],
    'montar-fluxo':[
      o('Monte o algoritmo que calcula a área de um quadrado a partir do lado.',['Início','Ler lado','área = lado × lado','Mostrar área','Fim'],'Início, ler o lado, calcular a área, mostrá-la e encerrar.'),
      t('Executando o fluxograma da área com lado = 7, qual valor é mostrado?','49','área = 7 × 7 = 49.'),
      q('O que acontece se "Mostrar área" vier antes de "Ler lado" no fluxo do quadrado?','A área seria mostrada sem que o lado fosse conhecido',['O fluxo passa a calcular o dobro','Nada muda no resultado'],'A saída depende do cálculo, que depende da entrada: a ordem não pode ser invertida.'),
      p('Associe cada bloco ao seu papel.',[['Ler preço','Entrada'],['total = preço × 3','Processamento'],['Mostrar total','Saída'],['Fim','Encerramento']],'Cada bloco cumpre uma função distinta do início ao fim.'),
      q('Quantos paralelogramos (entrada ou saída) há no fluxo do quadrado?','2',['1','3'],'São dois: Ler lado (entrada) e Mostrar área (saída). O cálculo é um retângulo.'),
      t('O fluxo lê a e b, calcula soma = a + b e mostra soma. Qual é a saída para a = 12 e b = 30?','42','12 + 30 = 42.')
    ],
    'seguir-fluxo':[
      t('Fluxo: ler nota; nota ≥ 6? Sim → "Aprovado"; Não → "Reprovado". Qual mensagem aparece para nota = 6?',['Aprovado','aprovado'],'6 ≥ 6 é verdadeiro, então segue o caminho Sim.'),
      q('No mesmo fluxo, qual caminho é seguido para nota = 5?','Não',['Sim','Os dois caminhos'],'5 ≥ 6 é falso; apenas o caminho Não é percorrido.'),
      t('Fluxo: ler n; n > 0? Sim → "positivo"; Não → n = 0? Sim → "zero"; Não → "negativo". Qual mensagem aparece para n = 0?','zero','0 > 0 é falso; no segundo losango, 0 = 0 é verdadeiro, então mostra zero.'),
      q('No fluxo de sinais, qual mensagem aparece para n = −4?','negativo',['positivo','zero'],'−4 > 0 é falso e −4 = 0 é falso: segue Não nos dois losangos.'),
      o('Ordene o percurso de n = 0 pelo fluxo de sinais.',['Ler n','Testar n > 0: Não','Testar n = 0: Sim','Mostrar zero','Fim'],'O primeiro teste falha, o segundo é verdadeiro e a mensagem é mostrada antes do fim.'),
      p('Associe cada valor de n ao percurso nos dois losangos.',[['n = 8','Sim no primeiro losango'],['n = 0','Não no primeiro e Sim no segundo'],['n = -1','Não nos dois losangos']],'O primeiro losango testa n > 0 e o segundo, n = 0.')
    ],
    'funcoes':[
      t('Qual número é mostrado?','25','Quadrado(5) devolve 5 × 5 = 25.','static int Quadrado(int n) {\n    return n * n;\n}\nConsole.WriteLine(Quadrado(5));'),
      t('Qual número Soma(2, Soma(3, 4)) mostra?','9','A chamada interna Soma(3, 4) devolve 7; depois Soma(2, 7) devolve 9.','static int Soma(int a, int b) {\n    return a + b;\n}\nConsole.WriteLine(Soma(2, Soma(3, 4)));'),
      gap('Complete o tipo de retorno da função.',['int'],'A função devolve n * 3, um número inteiro, então o tipo de retorno é int.','static ____ Triplo(int n) {\n    return n * 3;\n}'),
      q('O que significa void na função abaixo?','A função não devolve valor',['Devolve o texto recebido','Devolve zero'],'void indica ausência de retorno: a função apenas executa uma ação, aqui mostrar a mensagem.','static void Dizer(string msg) {\n    Console.WriteLine(msg);\n}'),
      p('Associe cada elemento ao seu papel.',[['int n','Parâmetro'],['return n * 2;','Devolve o resultado'],['Dobro(4)','Chamada com o argumento 4'],['static int','Retorno do tipo inteiro']],'O parâmetro recebe o valor, return devolve o resultado e a chamada fornece o argumento.'),
      o('Ordene o que acontece ao executar Console.WriteLine(Dobro(4));',['Dobro é chamada com o argumento 4','O parâmetro n recebe 4','return n * 2 calcula 8','O valor 8 volta ao ponto da chamada','Console.WriteLine mostra 8'],'A função precisa ser resolvida antes de o resultado ser passado a WriteLine.')
    ],
    'colecoes':[
      t('Qual valor é mostrado?','11','Os índices são 0, 1 e 2; n[2] é o terceiro elemento, 11.','int[] n = {5, 8, 11};\nConsole.WriteLine(n[2]);'),
      t('Qual é o valor de n.Length?','3','Length é a quantidade de elementos: 5, 8 e 11.','int[] n = {5, 8, 11};'),
      q('O que acontece ao executar este código?','Erro em tempo de execução: índice fora do intervalo',['Mostra 0','Mostra 11'],'Os índices válidos vão de 0 a 2. Acessar n[3] lança IndexOutOfRangeException.','int[] n = {5, 8, 11};\nConsole.WriteLine(n[3]);'),
      gap('Complete para mostrar o último elemento do array.',['1'],'O último índice é Length − 1: com 3 elementos, 3 − 1 = 2, que corresponde a 11.','int[] n = {5, 8, 11};\nConsole.WriteLine(n[n.Length - ____]);'),
      p('Associe cada expressão ao que ela representa em numeros.',[['numeros[0]','Primeiro elemento'],['numeros[1]','Segundo elemento'],['numeros.Length - 1','Índice do último elemento'],['numeros.Length','Quantidade de elementos']],'O primeiro índice é 0, e o último é sempre a quantidade menos um.'),
      o('Ordene os passos para somar os elementos de um array v.',['Iniciar s = 0 e i = 0','Verificar i < v.Length','Somar v[i] em s','Incrementar i','Mostrar s ao sair do laço'],'O acumulador começa em zero; cada iteração testa, soma e avança; o total só é mostrado no fim.')
    ],
    'classes':[
      t('Qual cor c.Cor mostra na saída?','azul','O construtor guarda "azul" no atributo Cor do objeto c, e Console.WriteLine mostra c.Cor.','class Carro {\n    public string Cor;\n    public Carro(string cor) { Cor = cor; }\n}\n// Em um contexto de execução:\nCarro c = new Carro("azul");\nConsole.WriteLine(c.Cor);'),
      q('No código abaixo, o que é c?','Uma variável que referencia um objeto da classe Carro',['A própria classe Carro','Um atributo de texto'],'Carro é a classe; new Carro("azul") cria o objeto; c guarda a referência a ele.','Carro c = new Carro("azul");'),
      gap('Complete a palavra que cria o objeto.',['new'],'new instancia a classe e chama seu construtor.','Jogador ana = ____ Jogador("Ana");'),
      t('Quantos objetos da classe Carro foram criados?','2','Cada new cria um objeto: a e b são objetos distintos.','Carro a = new Carro("azul");\nCarro b = new Carro("verde");'),
      p('Associe cada elemento da classe ao seu papel.',[['class','Descreve o tipo de objeto'],['new','Cria uma instância'],['Cor','Atributo'],['Carro(string cor)','Construtor']],'A classe é o molde, new cria o objeto, o atributo guarda o estado e o construtor o inicializa.'),
      o('Ordene a construção e o uso de uma classe.',['Declarar a classe com seus atributos','Escrever o construtor','Criar o objeto com new','Ler o atributo do objeto'],'A classe e o construtor precisam existir antes de criar o objeto, e o atributo só é lido depois.')
    ],
    'metodos':[
      t('Qual saldo é mostrado?','70','Sacar(30) passa no teste 30 <= 100 e subtrai: 100 − 30 = 70.',conta+'c.Sacar(30);\nConsole.WriteLine(c.Saldo);'),
      t('Depois de Sacar(30) e Sacar(80), qual é o saldo?','70','O primeiro saque deixa 70. Em Sacar(80), 80 <= 70 é falso, então o saldo não muda.',conta+'c.Sacar(30);\nc.Sacar(80);\nConsole.WriteLine(c.Saldo);'),
      gap('Complete o operador para permitir sacar exatamente o saldo disponível.',['<='],'<= aceita v igual a Saldo, deixando o saldo em zero, e recusa apenas valores maiores.','public void Sacar(int v) {\n    if (v ____ Saldo) Saldo -= v;\n}'),
      q('Qual declaração torna o campo acessível somente dentro da própria classe?','private int saldo;',['public int saldo;','static void saldo;'],'private restringe o acesso à classe, base do encapsulamento. Alterações passam por métodos que validam.'),
      p('Associe cada membro ao seu papel.',[['public void Depositar(int v)','Método que não devolve valor'],['public int ObterSaldo()','Método que devolve um inteiro'],['private int saldo','Campo escondido de fora da classe'],['c.Depositar(10)','Chamada de método no objeto c']],'O tipo antes do nome indica o retorno; private esconde o estado; a chamada usa o objeto.'),
      o('Ordene a execução de c.Sacar(30) com saldo 100.',['Chamar c.Sacar(30)','Testar 30 <= Saldo','Subtrair 30 do Saldo','Saldo passa a valer 70','Voltar ao ponto da chamada'],'A validação vem antes da alteração do estado, e o método retorna ao fim.')
    ],
    'heranca':[
      t('Qual som a.Som() mostra na saída?','Au','O objeto real é um Cao; como Som é virtual e foi sobrescrita, a versão de Cao é executada.',animal+'// Em um contexto de execução:\nAnimal a = new Cao();\nConsole.WriteLine(a.Som());'),
      gap('Complete o símbolo que indica que Cao herda de Animal.',[':'],'Em C#, a herança usa dois-pontos: class Cao : Animal.','class Cao ____ Animal {\n}'),
      q('Gato herda de Animal sem sobrescrever Som. Qual é a saída de new Gato().Som()?','...',['Miau','Erro de compilação'],'Sem override, Gato usa o método herdado de Animal, que devolve "...".','class Gato : Animal {\n}'),
      q('Como a classe base deve declarar um método para que uma classe derivada possa sobrescrevê-lo?','Com a palavra virtual',['Com a palavra static','Com a palavra const'],'virtual permite que a classe derivada use override para substituir o comportamento.'),
      p('Associe cada termo ao seu papel.',[['Animal','Classe base'],['Cao : Animal','Classe derivada'],['override','Substitui o comportamento herdado'],['virtual','Permite a sobrescrita']],'A base define o comportamento comum, a derivada especializa e virtual/override viabilizam o polimorfismo.'),
      o('Ordene o que ocorre em a.Som() com Animal a = new Cao();',['Criar um Cao e guardá-lo na variável Animal','Chamar a.Som()','Identificar que o objeto real é um Cao','Escolher a versão override de Cao','Mostrar Au'],'A escolha da versão depende do tipo real do objeto no momento da chamada: polimorfismo.')
    ]
  });
})();
