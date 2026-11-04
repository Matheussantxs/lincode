'use strict';
// Atividades extras das 8 lições legadas do capítulo de lógica (Python). Código só como texto.
window.PYTHON_LOGIC_EXTRA=(()=>{
  let serial=0;
  const q=(prompt,correct,wrong,explanation,code)=>{const options=[correct,...wrong];const answer=serial++%options.length;for(let i=0;i<answer;i++)options.unshift(options.pop());return {type:'choice',prompt,options,answer,explanation,code};};
  const t=(prompt,accepted,explanation,code)=>({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,code});
  const g=(prompt,accepted,explanation,code)=>({...t(prompt,accepted,explanation,code),type:'gap'});
  const o=(prompt,steps,explanation)=>({type:'order',prompt,options:[...steps].reverse(),answer:steps.map((_,i)=>steps.length-i-1),explanation});
  const p=(prompt,pairs,explanation)=>({type:'pairs',prompt,pairs,explanation});
  return {
  'introducao':[
  q('Qual destes é um uso de Python citado na introdução da trilha?','Automatizar tarefas e analisar tabelas',['Apenas definir a cor das páginas de um site','Substituir o sistema operacional do computador'],'Python é uma linguagem de uso geral: serve para automatizar tarefas, analisar tabelas e construir aplicações.'),
  p('Associe cada necessidade ao uso de Python que a atende.',[['Renomear centenas de arquivos de uma pasta','Automação'],['Calcular a média de uma coluna de notas','Análise de dados'],['Criar um programa com regras e telas','Construção de aplicações']],'Python cobre os três usos: automatizar rotinas, analisar dados em tabelas e construir aplicações.'),
  t('A trilha avança dos primeiros programas até um projeto de análise de quê? Digite uma palavra.',['dados','Dados'],'O projeto final da trilha é de dados (Data Science).'),
  o('Ordene o caminho de um problema até um programa em Python.',['Entender o problema','Escolher os passos que o resolvem','Escrever esses passos em Python','Executar e conferir o resultado'],'A linguagem só expressa instruções: o raciocínio vem primeiro, depois o código e por fim a conferência.'),
  q('Por que se diz que a sintaxe de Python privilegia a leitura?','O código tende a ser fácil de ler e de acompanhar passo a passo',['O código não precisa de instruções para funcionar','O computador entende qualquer frase em português'],'Uma sintaxe legível ajuda a entender o que o programa faz, mas as instruções continuam sendo necessárias.'),
  q('Alguém quer somar as vendas de um mês que estão numa tabela. Qual é o melhor primeiro passo?','Definir quais dados entram e qual resultado deve sair',['Escrever código sem saber o resultado esperado','Escolher a cor do editor de texto'],'Saber a entrada e a saída esperada orienta o raciocínio; o código vem depois.')
  ],
  'primeira-resposta':[
  t('Qual número de versão do Python deve ser instalado para praticar fora das lições? Digite só o número.','3','Para praticar fora das lições, instala-se Python 3 e usa-se um editor ou notebook.'),
  q('Qual é o papel do interpretador?','Executar o programa, lendo suas instruções',['Corrigir sozinho a lógica do programa','Guardar os arquivos na nuvem'],'O interpretador é quem executa o programa que você escreveu. Ele não decide qual lógica é correta.'),
  g('Complete o texto para que a saída seja Bom dia (sem aspas).','Bom dia','O texto entre aspas é o valor mostrado; as aspas delimitam a string e não aparecem na saída.','print("____")'),
  q('O que aparece na saída deste programa?','Ana',['"Ana"','print'],'print mostra o conteúdo da string, sem as aspas que a delimitam.','print("Ana")'),
  p('Associe cada elemento ao seu papel.',[['"10"','Texto, por estar entre aspas'],['10','Número'],['pontos','Nome de variável'],['print','Comando de saída']],'Aspas indicam texto, mesmo quando só há dígitos. pontos é um nome e print mostra valores.'),
  o('Ordene o ciclo básico de praticar com um programa.',['Escrever o programa no editor','Executar com o interpretador','Ler o que apareceu na saída','Comparar com o resultado esperado'],'Primeiro escrevemos, depois executamos, e só então conferimos a saída com o que se esperava.')
  ],
  'algoritmos':[
  t('Um algoritmo recebe as notas 4 e 6 e calcula a média. Qual é a saída?','5','A média é (4 + 6) / 2 = 10 / 2 = 5.'),
  p('Associe cada passo do algoritmo do troco à sua etapa.',[['Receber o valor pago e o preço','Entrada'],['Subtrair o preço do valor pago','Processamento'],['Mostrar o troco','Saída'],['Encerrar a execução','Fim']],'Dados recebidos são entrada, o cálculo é processamento e o resultado entregue é saída.'),
  o('Organize o algoritmo da área de um retângulo.',['Ler base e altura','Calcular área = base × altura','Mostrar a área'],'A área só pode ser calculada depois de conhecer base e altura, e só pode ser mostrada depois de calculada.'),
  q('O que torna um passo "claro" em um algoritmo?','Ele diz exatamente o que fazer, sem ambiguidade',['Ele pode ser interpretado de vários modos','Ele depende de adivinhar a intenção de quem escreveu'],'Passos claros podem ser executados do mesmo jeito por qualquer pessoa ou computador.'),
  q('Em um algoritmo que converte metros em centímetros, qual é a entrada?','O valor em metros',['O valor em centímetros calculado','A operação de multiplicar por 100'],'A entrada é o dado recebido; os centímetros são a saída, e multiplicar por 100 é o processamento.'),
  t('Um algoritmo lê o preço de um item (8) e a quantidade (3), multiplica e mostra o total. Qual é a saída?','24','O processamento é 8 × 3 = 24.')
  ],
  'variaveis':[
  t('Qual é o valor final de pontos?',['12'],'pontos começa em 10, vira 15 e depois 15 - 3 = 12.','pontos = 10\npontos = pontos + 5\npontos = pontos - 3'),
  q('Neste código, qual é o nome da variável e qual é o seu valor?','Nome nivel, valor 2',['Nome 2, valor nivel','Nome =, valor nivel'],'À esquerda do = fica o nome; à direita, o valor associado a ele.','nivel = 2'),
  g('Complete o operador para que a saída seja 11.',['+'],'moedas começa em 7; 7 + 4 = 11.','moedas = 7\nmoedas = moedas ____ 4\nprint(moedas)'),
  p('Associe cada trecho ao valor final de x.',[['x = 4; x = x + 1','x vale 5'],['x = 4; x = x * 2','x vale 8'],['x = 4; x = x - 4','x vale 0'],['x = 4; x = 10','x vale 10']],'A última atribuição define o valor atual. Em x = 10 o valor antigo é substituído, não somado.'),
  o('Ordene as linhas para que n termine valendo 7: começa em 3, dobra e depois soma 1.',['n = 3','n = n * 2','n = n + 1','print(n)'],'3 dobrado dá 6, e 6 + 1 = 7. Somar antes de dobrar daria (3 + 1) × 2 = 8.'),
  q('Por que pontos = pontos + 5 não é uma equação impossível?','O = é uma atribuição: calcula o lado direito e guarda o resultado no nome',['O Python ignora o + e mantém o valor antigo','O = compara se os dois lados são iguais'],'Primeiro calcula-se pontos + 5 com o valor atual; depois o resultado passa a ser o novo valor de pontos.')
  ],
  'decisoes':[
  t('Qual mensagem é mostrada?',['Recuperação','Recuperacao'],'nota = 6 e 6 >= 7 é falso, então segue o else.','nota = 6\nif nota >= 7:\n    print("Aprovado")\nelse:\n    print("Recuperação")'),
  q('Com temp = 30, o que aparece na saída?','Nada',['Quente','30'],'30 > 30 é falso e não há else. A condição estrita exclui a igualdade.','temp = 30\nif temp > 30:\n    print("Quente")'),
  t('Quantas linhas esse laço mostra?','4','range(4) produz 0, 1, 2 e 3: são quatro valores.','for i in range(4):\n    print(i)'),
  p('Associe cada operador ao seu significado.',[['>=','Maior ou igual'],['<','Menor que'],['==','Igual a'],['!=','Diferente de']],'Cada operador compara dois valores e resulta em verdadeiro ou falso.'),
  o('Ordene a execução de uma decisão simples.',['Ler a nota','Avaliar se nota >= 7','Seguir apenas o ramo escolhido','Mostrar a mensagem desse ramo'],'A condição só pode ser avaliada com o dado lido, e apenas um ramo é percorrido.'),
  g('Complete para mostrar 0, 1, 2, 3 e 4.',['5'],'range(5) começa em 0 e para antes de 5.','for i in range(____):\n    print(i)')
  ],
  'simbolos':[
  p('Associe cada símbolo ao seu significado.',[['Oval','Início ou fim'],['Retângulo','Processo'],['Losango','Decisão'],['Paralelogramo','Entrada ou saída'],['Seta','Direção do fluxo']],'Cada forma tem uma função fixa, e as setas indicam a ordem de leitura.'),
  q('Que símbolo representa o cálculo total = preço × quantidade?','Retângulo',['Losango','Oval'],'Um cálculo transforma dados: é um processo.'),
  q('Que símbolo representa a etapa "Mostrar total"?','Paralelogramo',['Retângulo','Losango'],'Mostrar um resultado é saída, desenhada como paralelogramo.'),
  t('Em um fluxograma básico com um único início e um único fim, quantas ovais existem?','2','Uma oval marca o início e outra marca o fim.'),
  q('Do losango "saldo >= preço?" saem quantos caminhos?','Dois: Sim e Não',['Apenas um','Quatro'],'Uma decisão separa os caminhos pela resposta verdadeira ou falsa da condição.'),
  o('Ordene os símbolos de um fluxograma que lê um preço, calcula o desconto e mostra o valor final.',['Oval (início)','Paralelogramo (ler preço)','Retângulo (calcular desconto)','Paralelogramo (mostrar valor final)','Oval (fim)'],'Início abre o fluxo, a leitura vem antes do cálculo e a exibição vem depois dele; o fim fecha o desenho.')
  ],
  'montar-fluxo':[
  o('Monte o algoritmo que calcula a média de dois números.',['Início','Ler nota 1 e nota 2','media = (nota1 + nota2) / 2','Mostrar media','Fim'],'As notas precisam ser lidas antes da média e a média calculada antes de ser mostrada.'),
  o('Monte o algoritmo que calcula o troco.',['Início','Ler valor pago e preço','troco = pago - preço','Mostrar troco','Fim'],'O troco depende dos dois valores lidos e só depois pode ser exibido.'),
  t('Ler 6 e 8; media = (n1 + n2) / 2; mostrar media. Que valor é mostrado?','7','(6 + 8) / 2 = 14 / 2 = 7.'),
  t('Com valor pago 50 e preço 35, qual troco o fluxo mostra?','15','50 - 35 = 15.'),
  q('Um fluxo mostra o resultado antes de calculá-lo. Qual é o problema?','Mostraria um valor que ainda não foi definido',['A seta ficaria com a cor errada','O início passaria a ser opcional'],'A ordem das setas deve garantir que o dado exista antes de ser usado.'),
  p('Associe cada bloco ao seu papel no fluxo do dobro.',[['Início','Oval que abre o fluxo'],['Ler número','Entrada'],['resultado = número × 2','Processamento'],['Mostrar resultado','Saída']],'Cada bloco cumpre uma função: abrir, receber, transformar e entregar.')
  ],
  'seguir-fluxo':[
  q('Com idade = 25, qual mensagem aparece?','Maior de idade',['Menor de idade','As duas mensagens'],'25 >= 18 é verdadeiro. Segue-se a seta Sim.'),
  t('Com idade = 0, qual mensagem aparece? Digite exatamente.',['Menor de idade','menor de idade'],'0 >= 18 é falso; segue a seta Não até Menor de idade.'),
  t('Considere idades inteiras. Qual é a maior idade que segue o caminho Não?','17','Só 18 ou mais torna a condição verdadeira, então 17 é a maior idade que vai pelo Não.'),
  p('Classifique cada item do fluxograma de idade.',[['idade = 30','Caminho Sim'],['idade = 12','Caminho Não'],['idade >= 18','Condição do losango'],['Maior de idade','Saída do ramo Sim']],'A condição do losango decide o ramo; cada valor de idade leva a um único caminho.'),
  o('Ordene o percurso do fluxograma para idade = 15.',['Início','Ler idade (15)','Avaliar idade >= 18: falso','Seguir a seta Não','Mostrar "Menor de idade"','Fim'],'A condição é falsa para 15, então apenas o ramo Não é percorrido antes do fim.'),
  g('Complete o operador para que idade = 18 mostre Maior de idade.',['>='],'Com >=, 18 satisfaz a condição pela igualdade. Com > mostraria Menor de idade.','if idade ____ 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")')
  ]
  };
})();
