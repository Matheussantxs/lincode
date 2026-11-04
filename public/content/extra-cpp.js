'use strict';
// Atividades extras (C++) das lições legadas. Cada lição recebe 6 atividades acrescentadas às 2 existentes.
(()=>{
  let serial=0;
  const q=(prompt,correct,wrong,explanation,code)=>{const options=[correct,...wrong];const answer=serial++%options.length;for(let i=0;i<answer;i++)options.unshift(options.pop());return {type:'choice',prompt,options,answer,explanation,code};};
  const t=(prompt,accepted,explanation,code)=>({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,code});
  const g=(prompt,accepted,explanation,code)=>({...t(prompt,accepted,explanation,code),type:'gap'});
  const o=(prompt,steps,explanation)=>({type:'order',prompt,options:[...steps].reverse(),answer:steps.map((_,i)=>steps.length-i-1),explanation});
  const p=(prompt,pairs,explanation)=>({type:'pairs',prompt,pairs,explanation});

  const jogador='class Jogador {\npublic:\n    std::string nome;\n    Jogador(std::string n) : nome(n) {}\n};\n';
  const contador='class Contador {\npublic:\n    int valor = 0;\n    void incrementar() { valor++; }\n};\n';
  const conta='class Conta {\nprivate:\n    int saldo = 100;\npublic:\n    void sacar(int v) {\n        if (v <= saldo) {\n            saldo -= v;\n        }\n    }\n    int getSaldo() { return saldo; }\n};\n';
  const animal='class Animal {\npublic:\n    virtual void emitirSom() { std::cout << "..."; }\n};\nclass Cachorro : public Animal {\npublic:\n    void emitirSom() override { std::cout << "Au"; }\n};\n';

  window.LINCODE_EXTRA=window.LINCODE_EXTRA||{};
  window.LINCODE_EXTRA.cpp=Object.assign(window.LINCODE_EXTRA.cpp||{}, {
    'introducao':[
      q('O que o compilador faz antes de um programa C++ ser executado?','Traduz o código-fonte em um programa executável',['Executa o código diretamente, linha a linha, sem gerar nada','Escreve o algoritmo no lugar do programador'],'C++ é uma linguagem compilada: o compilador transforma o código-fonte em um executável, que depois é rodado.'),
      q('Qual destes é um uso típico de C++ apresentado na trilha?','Motores de jogos e sistemas de alto desempenho',['Apenas definir a aparência de páginas web','Somente escrever fórmulas em planilhas'],'C++ oferece controle sobre recursos e desempenho, por isso aparece em sistemas, jogos e aplicações exigentes.'),
      p('Associe cada termo ao seu significado em C++.',[['Compilador','Traduz o código C++ em um executável'],['Código-fonte','Texto escrito pelo programador'],['Classe','Descreve um tipo de objeto'],['Função main','Ponto onde o programa começa a executar']],'Cada termo cumpre um papel diferente: escrever, traduzir, modelar e iniciar a execução.'),
      o('Ordene as etapas para rodar um programa C++.',['Escrever o código-fonte','Compilar o código','Executar o programa gerado','Observar a saída'],'O executável só existe depois da compilação; a saída só aparece depois da execução.'),
      g('Complete o cabeçalho que permite usar std::cout.','iostream','O cabeçalho iostream declara std::cout. Também são aceitas as formas <iostream> e #include <iostream>.','#include <____>\n\nint main() {\n    std::cout << "Oi";\n    return 0;\n}'),
      q('Por que os trechos da trilha podem omitir #include e main?','Para destacar o conceito; um programa completo costuma ter cabeçalhos e main',['Porque C++ dispensa a função main','Porque o compilador adivinha as instruções que faltam'],'Os trechos são didáticos. Para compilar um programa completo, normalmente precisamos de cabeçalhos e de main.')
    ].map((x,i)=>i===4?{...x,accepted:['iostream','<iostream>','#include <iostream>']}:x),
    'primeira-resposta':[
      t('Qual número aparece na saída deste trecho?','3','A variável vidas guarda 3, e std::cout envia esse valor para a saída.','int vidas = 3;\nstd::cout << vidas;'),
      q('No comando std::cout << "Olá, mundo!"; o que representa std::cout?',"O fluxo de saída padrão, normalmente o terminal",['Uma variável inteira chamada Olá','O compilador do programa'],'std::cout é o fluxo de saída padrão; o operador << envia o texto para ele.','std::cout << "Olá, mundo!";'),
      g('Complete o operador que envia o texto para a saída.','<<','O operador << encadeia valores enviados a std::cout.','std::cout ____ "Olá, mundo!";'),
      q('Qual é o defeito na primeira linha deste trecho?','Falta o ponto e vírgula no fim da instrução',['Falta declarar a variável pontos como texto','O texto deveria estar entre colchetes'],'Em C++ cada instrução termina com ponto e vírgula; sem ele o compilador acusa erro.','std::cout << "Olá, mundo!"\nint pontos = 10;'),
      p('Associe cada parte da linha int pontos = 10; ao seu papel.',[['int','Tipo do valor (inteiro)'],['pontos','Nome da variável'],['10','Valor guardado'],[';','Fim da instrução']],'A linha declara uma variável do tipo int, dá-lhe um nome e guarda um valor.'),
      o('Ordene as linhas de um programa mínimo que mostra Oi.',['#include <iostream>','int main() {','    std::cout << "Oi";','    return 0;','}'],'O cabeçalho vem primeiro; depois main abre, executa a saída, retorna e fecha.')
    ],
    'saida':[
      t('Que texto aparece na tela, incluindo o espaço?','C++ ok','Os três textos são enviados em sequência: "C++", " " e "ok", formando C++ ok.','std::cout << "C++" << " " << "ok";'),
      q('Qual é a saída deste trecho?','AnaLia, na mesma linha',['Ana e Lia em duas linhas','Ana Lia, com um espaço entre os nomes'],'std::cout não acrescenta espaço nem quebra de linha sozinho; os textos ficam colados.','std::cout << "Ana";\nstd::cout << "Lia";'),
      o('Ordene as instruções para mostrar Oi, Ana e depois quebrar a linha.',['std::cout << "Oi, ";','std::cout << "Ana";','std::cout << "\\n";'],'As instruções executam de cima para baixo; a quebra de linha vem por último para não separar Oi, de Ana.'),
      g('Complete o nome do fluxo de saída padrão.','cout','O fluxo é std::cout; o prefixo std:: indica o espaço de nomes da biblioteca padrão.','std::____ << "Fim";'),
      q('Por que este comando não mostra o texto Ola?','Sem aspas, Ola é lido como um nome (identificador) que não foi declarado',['Porque cout só mostra números','Porque falta o operador de soma entre as letras'],'Aspas indicam uma string. Sem elas, o compilador procura uma variável chamada Ola.','std::cout << Ola;'),
      p('Associe cada elemento ao seu papel na saída.',[['std::cout','Envia valores para a saída padrão'],['<<','Encadeia o que será enviado'],['"texto"','String literal'],['"\\n"','Quebra de linha']],'Cada elemento tem uma função: o destino, o operador de envio, o dado textual e o caractere de nova linha.')
    ],
    'algoritmos':[
      t('Um algoritmo recebe base 6 e altura 4 de um retângulo e calcula base × altura. Qual é a saída?','24','6 × 4 = 24. A entrada são os dois valores, o processamento é a multiplicação e a saída é a área.'),
      o('Ordene o algoritmo que calcula o troco de uma compra.',['Início','Ler o preço e o valor pago','Calcular troco = pago − preço','Mostrar o troco','Fim'],'Precisamos dos dados antes do cálculo e do cálculo antes de mostrar o resultado.'),
      p('Associe cada item do algoritmo da área à sua função.',[['Valores recebidos','Entrada'],['Cálculo realizado','Processamento'],['Resultado mostrado','Saída'],['Sequência finita de passos que resolve o problema','Algoritmo']],'Entrada, processamento e saída organizam os passos de um algoritmo.'),
      q('Qual descrição é um algoritmo bem definido?','Ler dois preços, somá-los e mostrar o total',['Calcular o total de algum jeito','Mostrar um valor que pareça razoável'],'Um algoritmo precisa de passos claros e verificáveis; as outras opções não definem entrada, cálculo nem saída.'),
      t('Um algoritmo calcula a média de duas notas: soma as notas e divide por 2. Para as notas 4 e 10, qual é a saída?','7','(4 + 10) / 2 = 14 / 2 = 7.'),
      q('Um algoritmo calcula troco = pago − preço. Para pago = 20 e preço = 20, qual é o troco?','0',['20','40'],'20 − 20 = 0. Pagar exatamente o preço não gera troco.')
    ],
    'variaveis':[
      t('Qual é o valor de pontos depois da execução deste trecho?','12','Começa em 10, passa a 15 e depois a 12 (15 − 3).','int pontos = 10;\npontos = pontos + 5;\npontos = pontos - 3;'),
      q('Qual é o valor de b ao final?','4',['9','13'],'b recebe uma cópia do valor de a (4). Mudar a depois não altera b.','int a = 4;\nint b = a;\na = 9;'),
      o('Ordene as instruções que trocam os valores de a e b usando temp.',['int temp = a;','a = b;','b = temp;'],'temp guarda o valor original de a antes de ele ser sobrescrito; depois b recebe esse valor guardado.'),
      p('Associe cada linha ao valor de x logo depois dela.',[['int x = 2;','2'],['x = x * 3;','6'],['x = x + 1;','7'],['x = x - 7;','0']],'Os valores seguem em sequência: 2, depois 2 × 3 = 6, depois 6 + 1 = 7 e por fim 7 − 7 = 0.'),
      g('Complete o operador que soma 5 ao valor atual de total.',['+=','= total +','=total+'],'total += 5; equivale a total = total + 5;.','int total = 0;\ntotal ____ 5;'),
      q('Qual destes nomes de variável é inválido em C++?','total pontos',['total_pontos','totalPontos'],'Nomes de variáveis não podem ter espaço. Sublinhado e maiúscula interna são permitidos.')
    ],
    'decisoes':[
      q('Qual é a saída deste teste de paridade com % 2?','ímpar',['par','par e ímpar'],'7 % 2 é 1, diferente de 0. A condição é falsa e o else é executado.','int n = 7;\nif (n % 2 == 0) {\n    std::cout << "par";\n} else {\n    std::cout << "ímpar";\n}'),
      t('Qual número é mostrado no final?','6','soma acumula 1, depois 3 (1 + 2) e depois 6 (3 + 3). Com i = 4 o laço termina.','int soma = 0;\nfor (int i = 1; i <= 3; i++) {\n    soma += i;\n}\nstd::cout << soma;'),
      g('Aprovado quando a nota é 7 ou mais. Complete o operador.','>=','>= inclui o caso de nota igual a 7; > o excluiria.','if (nota ____ 7) {\n    std::cout << "Aprovado";\n}'),
      p('Associe cada estrutura ao seu comportamento.',[['if','Escolhe um caminho conforme a condição'],['else','Caminho seguido quando a condição é falsa'],['for','Repete usando um contador'],['while','Repete enquanto a condição for verdadeira']],'Condicionais escolhem; laços repetem.'),
      o('Ordene a execução do laço for (int i = 0; i < 3; i++).',['Inicializar i = 0','Testar i < 3','Executar o corpo','Incrementar i','Testar i < 3 novamente'],'A inicialização ocorre uma vez; depois testamos, executamos o corpo, incrementamos e voltamos ao teste.'),
      q('Qual mensagem este trecho mostra?','B',['A','C'],'x > 5 é falso (5 não é maior que 5), mas x == 5 é verdadeiro. Executa-se só o ramo B.','int x = 5;\nif (x > 5) {\n    std::cout << "A";\n} else if (x == 5) {\n    std::cout << "B";\n} else {\n    std::cout << "C";\n}')
    ],
    'simbolos':[
      q('Qual símbolo representa a ação Mostrar a média?','Paralelogramo',['Retângulo','Losango'],'Mostrar um resultado é saída, representada pelo paralelogramo.'),
      p('Associe cada símbolo ao seu uso.',[['Oval','Início ou fim'],['Retângulo','Processo, como total = a + b'],['Losango','Decisão com Sim e Não'],['Paralelogramo','Entrada ou saída']],'Cada símbolo tem uma função padronizada nos fluxogramas.'),
      t('Quantos caminhos de saída tem um losango de decisão simples, com Sim e Não?',['2','dois'],'Uma decisão simples separa dois caminhos: Sim e Não.'),
      q('Com qual símbolo um fluxograma correto começa e termina?','Oval',['Losango','Paralelogramo'],'A oval marca o início e o fim do algoritmo.'),
      o('Ordene os símbolos de um fluxo que lê dois números, soma e mostra o total.',['Oval: Início','Paralelogramo: Ler a e b','Retângulo: soma = a + b','Paralelogramo: Mostrar soma','Oval: Fim'],'Início, entrada, processamento, saída e fim, nessa ordem.'),
      q('O que indicam as setas de um fluxograma?','A ordem em que os passos são executados',['A velocidade do computador','O tipo de dado de cada variável'],'As setas ligam os blocos e definem o caminho de execução.')
    ],
    'montar-fluxo':[
      o('Monte o algoritmo que calcula a média de duas notas.',['Início','Ler nota1 e nota2','media = (nota1 + nota2) / 2','Mostrar media','Fim'],'Leitura, cálculo e exibição seguem essa ordem; a média só existe depois do cálculo.'),
      p('Associe cada bloco ao seu tipo.',[['Ler lado','Paralelogramo (entrada)'],['area = lado × lado','Retângulo (processo)'],['lado > 0?','Losango (decisão)'],['Fim','Oval']],'Ler é entrada, calcular é processo, perguntar é decisão e encerrar é fim.'),
      t('No fluxo que calcula o dobro, qual valor é mostrado se o número lido for 7?','14','7 × 2 = 14.'),
      q('Por que Mostrar resultado não pode vir antes de resultado = número × 2?','O resultado ainda não teria sido calculado',['Porque a saída sempre vem antes do processamento','Porque o bloco Fim precisa vir primeiro'],'Um valor só pode ser mostrado depois de definido.'),
      q('Um fluxo deve calcular o triplo de um número. Qual processamento está correto?','resultado = número × 3',['resultado = número + 3','resultado = 3'],'O triplo é o número multiplicado por 3; somar 3 ou fixar 3 não depende da regra.'),
      g('Complete o operador que calcula o dobro em C++.',['*','×'],'Em C++, a multiplicação é feita com *.','int resultado = numero ____ 2;')
    ],
    'seguir-fluxo':[
      q('Se idade = 30, qual será a saída?','Maior de idade',['Menor de idade','As duas mensagens'],'30 >= 18 é verdadeiro; segue-se o caminho Sim.'),
      t('Qual é o menor número inteiro de idade que segue o caminho Sim?','18','A condição é idade >= 18; 17 é falso e 18 é verdadeiro.'),
      o('Ordene o percurso do fluxo para idade = 17.',['Início','Ler idade (17)','Avaliar 17 >= 18: falso','Seguir a seta Não','Mostrar Menor de idade','Fim'],'A condição é falsa, então só o caminho Não é percorrido antes do fim.'),
      p('Associe cada idade ao caminho e motivo na regra idade >= 18.',[['idade = 18','Sim, pela igualdade no limite'],['idade = 17','Não, logo abaixo de 18'],['idade = 65','Sim, acima de 18'],['idade = 0','Não, limite inferior zero']],'Sim ocorre para idade >= 18, inclusive no limite 18; 0 e 17 vão por Não.'),
      q('Quantas mensagens são mostradas em uma execução do fluxo?','Exatamente uma',['Sempre duas','Nenhuma, porque o losango só pergunta'],'Cada decisão segue um único caminho: ou Maior de idade ou Menor de idade.'),
      q('Se a condição fosse trocada para idade > 18, qual caminho seria seguido para idade = 18?','Não',['Sim','Nenhum, porque 18 não existe'],'18 > 18 é falso; o limite sai do conjunto que segue Sim.')
    ],
    'funcoes':[
      t('Qual número é mostrado?','7','soma(2, 5) devolve 2 + 5 = 7.','int soma(int a, int b) {\n    return a + b;\n}\n// Em main:\nstd::cout << soma(2, 5);'),
      q('Na chamada quadrado(6), o valor 6 é o quê?','O argumento, recebido pelo parâmetro n',['O tipo de retorno da função','O nome da função'],'O argumento é o valor passado na chamada; o parâmetro n o recebe.','int quadrado(int n) {\n    return n * n;\n}'),
      g('Complete o tipo de retorno da função.','int','A função devolve n * 3, um número inteiro; portanto o tipo de retorno é int.','____ triplo(int n) {\n    return n * 3;\n}'),
      q('O que a palavra void indica nesta função?','Que ela não devolve valor',['Que ela devolve texto','Que ela não pode ser chamada'],'void significa ausência de valor de retorno. A função apenas executa seus passos.','void ola() {\n    std::cout << "Oi";\n}'),
      o('Ordene o que acontece em std::cout << dobro(4);',['main chama dobro(4)','n recebe 4','return n * 2 calcula 8','o valor 8 volta para quem chamou','std::cout mostra 8'],'A chamada passa o argumento, a função calcula, devolve o resultado e só então a saída é feita.'),
      p('Associe cada elemento ao seu papel.',[['int antes do nome da função','Tipo do valor retornado'],['int n entre parênteses','Parâmetro que recebe o valor da chamada'],['return','Devolve o resultado e encerra a função'],['dobro(4)','Chamada com o argumento 4']],'Cada parte da função e da chamada tem uma responsabilidade distinta.')
    ],
    'colecoes':[
      t('Qual valor é mostrado?','9','Os índices são 0 (5), 1 (8), 2 (1) e 3 (9). v[3] vale 9.','int v[] = {5, 8, 1, 9};\nstd::cout << v[3];'),
      q('Um array tem 5 elementos. Qual é o último índice válido?','4',['5','1'],'Os índices vão de 0 a 4. O índice 5 já estaria fora do array.'),
      g('Complete o índice para mostrar 30.','2','30 é o terceiro elemento, de índice 2.','int n[] = {10, 20, 30};\nstd::cout << n[____];'),
      o('Ordene as linhas que somam os três elementos de v.',['int soma = 0;','for (int i = 0; i < 3; i++) {','    soma += v[i];','}','std::cout << soma;'],'O acumulador começa em zero, o laço percorre os índices 0, 1 e 2 e a soma só é mostrada depois do laço.'),
      p('Associe cada expressão ao valor, considerando v = {7, 3, 5}.',[['v[0]','7'],['v[1]','3'],['v[2]','5'],['v[0] + v[1]','10']],'v[0] = 7, v[1] = 3 e v[2] = 5; 7 + 3 = 10.'),
      q('Em um array de 3 elementos, o que é v[3]?','Acesso fora dos limites, pois os índices válidos são 0, 1 e 2',['O terceiro elemento','Sempre vale 0'],'Em C++ esse acesso não é verificado e tem comportamento indefinido.')
    ],
    'classes':[
      q('Qual é a função do construtor Jogador(std::string n) : nome(n) {}?','Inicializar o atributo nome quando o objeto é criado',['Repetir o nome várias vezes','Apagar o objeto'],'O construtor roda ao criar o objeto e usa a lista de inicialização para guardar n em nome.',jogador),
      t('Qual texto é mostrado?','Bia','bia.nome guarda Bia, pois cada objeto tem seu próprio estado.',jogador+'// Em main:\nJogador ana("Ana");\nJogador bia("Bia");\nstd::cout << bia.nome;'),
      p('Associe cada trecho ao seu papel.',[['class Jogador','Define o tipo'],['std::string nome;','Atributo'],['Jogador ana("Ana");','Cria um objeto'],['ana.nome','Acessa o atributo do objeto ana']],'A classe é o modelo; o atributo guarda o estado e o objeto é uma instância.'),
      g('Complete o operador que acessa o atributo de um objeto.','.','O ponto liga o objeto ao seu membro: ana.nome.','class Jogador {\npublic:\n    std::string nome;\n};\n// Em main:\nJogador ana;\nana____nome = "Ana";'),
      o('Ordene as linhas que definem uma classe e criam um objeto.',['class Jogador {','public:','    int pontos = 0;','};','Jogador j;'],'A classe precisa estar definida antes de criar o objeto; public: abre o acesso aos membros que vêm depois.'),
      q('Qual é a diferença entre classe e objeto?','A classe é o modelo; ana e bia são objetos criados a partir dela',['O objeto é o modelo e a classe é a cópia','São sinônimos sem diferença'],'Uma classe pode gerar vários objetos, cada um com seu estado.')
    ],
    'metodos':[
      t('Qual valor de c.valor aparece após três chamadas de incrementar()?','3','Cada chamada soma 1 a valor, que começa em 0: 0 → 1 → 2 → 3.',contador+'// Em main:\nContador c;\nc.incrementar();\nc.incrementar();\nc.incrementar();\nstd::cout << c.valor;'),
      q('Conta tem saldo privado e depositar(double v) rejeita v <= 0. Qual é o benefício?','O saldo só muda por uma operação que valida a regra',['Qualquer código pode alterar o saldo livremente','A classe deixa de precisar de métodos'],'Encapsular é controlar o acesso ao estado para preservar as regras do objeto.'),
      g('Complete a palavra-chave que esconde saldo de código externo.','private','Membros private só são acessíveis dentro da própria classe.','class Conta {\n____:\n    double saldo = 0;\n};'),
      t('Qual valor getSaldo() devolve ao final?','70','sacar(30) reduz 100 a 70. sacar(90) é recusado porque 90 > 70, então o saldo continua 70.',conta+'// Em main:\nConta c;\nc.sacar(30);\nc.sacar(90);\nstd::cout << c.getSaldo();'),
      o('Ordene os passos lógicos de um método sacar protegido.',['Receber o valor pedido','Verificar se valor ≤ saldo','Se couber, subtrair o valor do saldo','Informar o resultado'],'A validação vem antes de alterar o estado.'),
      p('Associe cada termo ao seu significado.',[['private','Acessível só dentro da classe'],['public','Acessível de fora da classe'],['Método','Comportamento do objeto'],['Atributo','Estado do objeto']],'Métodos e atributos compõem o objeto; a visibilidade controla quem pode usá-los.')
    ],
    'heranca':[
      q('Qual declaração diz que Cachorro herda de Animal?','class Cachorro : public Animal',['class Animal : public Cachorro','virtual class Cachorro'],'Depois dos dois pontos vem a classe base: Cachorro é derivada de Animal.',animal),
      t('Qual som a.emitirSom() mostra via referência polimórfica?','Au','emitirSom é virtual; a referência Animal& aponta para um Cachorro e usa a versão de Cachorro.',animal+'// Em main:\nCachorro c;\nAnimal& a = c;\na.emitirSom();'),
      g('Complete a palavra que indica a substituição do método da base.','override','override informa que o método substitui o virtual da classe base.','class Cachorro : public Animal {\npublic:\n    void emitirSom() ____ { std::cout << "Au"; }\n};'),
      q('Se emitirSom NÃO fosse virtual em Animal, o que a.emitirSom() chamaria?','A versão de Animal, pelo tipo da referência',['A versão de Cachorro mesmo assim','Seria um erro de compilação sempre'],'Sem virtual, a ligação é feita pelo tipo declarado (Animal&), não pelo tipo real.','Cachorro c;\nAnimal& a = c;\na.emitirSom();'),
      p('Associe cada termo de herança ao seu significado.',[['Animal','Classe base'],['Cachorro','Classe derivada'],['virtual','Permite escolher a versão pelo tipo real do objeto'],['override','Indica que o método substitui o da base']],'Base e derivada formam a hierarquia; virtual e override viabilizam o polimorfismo.'),
      o('Ordene as etapas para usar uma hierarquia de classes.',['Definir a classe base Animal','Definir Cachorro derivada de Animal','Criar o objeto Cachorro c;','Chamar c.emitirSom()'],'A base vem antes da derivada, e o objeto só pode ser criado depois das classes.')
    ]
  });
})();
