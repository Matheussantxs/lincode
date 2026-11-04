/* Authored C# core. The 40-lesson chapter target is NOT yet fully authored.
 * Sources: https://learn.microsoft.com/dotnet/csharp/language-reference/
 * https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/
 * https://learn.microsoft.com/ef/core/dbcontext-configuration/
 * https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis
 * Examples are didactic fragments unless their surrounding context is included.
 */
(function () {
  'use strict';
  let serial = 0;
  const q = (prompt, correct, wrong, explanation, code) => {
    const options = [correct, ...wrong]; const answer = serial++ % options.length;
    for (let i = 0; i < answer; i++) options.unshift(options.pop());
    return {type:'choice',prompt,options,answer,explanation,...(code?{code}:{})};
  };
  const t = (prompt, accepted, explanation, code) => ({type:'text',prompt,accepted:Array.isArray(accepted)?accepted:[accepted],explanation,...(code?{code}:{})});
  const g = (prompt, accepted, explanation, code) => ({...t(prompt,accepted,explanation,code),type:'gap'});
  const o = (prompt, steps, explanation) => { const order=steps.map((_,i)=>i).reverse(); return {type:'order',prompt,options:order.map(i=>steps[i]),answer:steps.map((_,i)=>order.indexOf(i)),explanation}; };
  const p = (prompt,pairs,explanation) => ({type:'pairs',prompt,pairs,explanation});
  const chapters=[];
  function chapter(title, unitNames, lessonTitle, theory, activities) {
    const n=chapters.length+1, prefix=`csharp-c${String(n).padStart(2,'0')}`;
    chapters.push({id:prefix,title,description:theory.split('. ')[0]+'.',targetLessonCount:40,authoringStatus:'partial',reviewStatus:'technical-review-pending',
      units:unitNames.map((name,i)=>({id:`${prefix}-u${i+1}`,title:name,objective:`Aplicar ${name.toLowerCase()} em C# e explicar o resultado.`,targetLessonCount:5,authoringStatus:i===0?'partial':'planned',lessons:i===0?[{id:`${prefix}-u1-l1`,title:lessonTitle,theory,activities:activities.map((a,j)=>({...a,id:`${prefix}-u1-l1-a${j+1}`}))}]:[]}))});
  }
  chapter('Introdução ao C#, .NET e primeiro projeto',
    ['Do código ao programa','SDK e ambiente','Projeto console','Saída e mensagens','Entrada e conversão','Arquivos do projeto','Compilar e executar','Primeiro programa revisado'],
    'Uma recepção no terminal',
    'C# é uma linguagem; .NET oferece runtime, bibliotecas e ferramentas. O SDK permite desenvolver e compilar projetos. Em um projeto console moderno, instruções de nível superior permitem começar com Console.WriteLine. O arquivo .csproj descreve configurações do projeto; o arquivo .cs contém código-fonte. Uma mensagem no terminal é saída do programa, não o código-fonte em execução.',[
      q('Você quer criar e compilar um projeto novo. Qual instalação fornece as ferramentas?','O SDK do .NET',['Somente um navegador','Apenas um arquivo .cs vazio'],'O SDK contém ferramentas de desenvolvimento; o runtime isolado destina-se a executar aplicações compatíveis.'),
      t('Digite exatamente a mensagem exibida, sem aspas.','Bem-vinda, Ana!','WriteLine imprime a string e acrescenta uma quebra de linha.','Console.WriteLine("Bem-vinda, Ana!");'),
      g('Complete o nome do método que mostra a mensagem em uma linha.','WriteLine','Console.WriteLine escreve a mensagem seguida de uma nova linha.','Console.____("Cadastro iniciado");'),
      p('Relacione cada elemento à sua função.',[['C#','Linguagem de programação'],['.NET SDK','Ferramentas de desenvolvimento'],['Program.cs','Arquivo de código'],['.csproj','Configuração do projeto']],'Linguagem, ferramentas, código e configuração são partes distintas.'),
      o('Organize a criação e execução de um projeto chamado Recepcao.',['Abrir um terminal na pasta de trabalho','Executar dotnet new console -n Recepcao','Entrar na pasta Recepcao','Executar dotnet run'],'Primeiro criamos o projeto e depois executamos no diretório que contém seu arquivo de projeto.'),
      q('A mensagem aparece no terminal e depois o programa termina. Isso indica necessariamente uma falha?','Não; o programa pode ter concluído suas instruções',['Sim; todo programa deve ficar aberto para sempre','Sim; WriteLine sempre encerra o sistema'],'Um programa console simples termina normalmente após executar suas instruções.'),
      q('Um arquivo foi salvo como Program.txt. Qual extensão normalmente identifica código C#?','.cs',['.html','.sql'],'Arquivos de código C# usam normalmente a extensão .cs.'),
      t('Qual comando compila o projeto no diretório atual?','dotnet build','dotnet build compila o projeto e reporta diagnósticos de compilação.')
    ]);
  chapter('Lógica, algoritmos e fluxogramas',
    ['Entradas e decisões','Sequências e estado','Símbolos de fluxograma','Bifurcações','Repetições desenhadas','Rastreamento de variáveis','Validação de algoritmos','Projeto de algoritmo'],
    'O frete de uma livraria',
    'Um algoritmo deve definir entrada, transformação e saída. A livraria usa frete grátis quando o subtotal é pelo menos 100; abaixo disso cobra 12. Um losango representa a decisão e o caminho escolhido depende da comparação. Desenhar o fluxo antes do código ajuda a perceber limites, como exatamente 100. O resultado final soma subtotal e frete.',[
      q('Qual informação entra no algoritmo de frete?','O subtotal do pedido',['O total já calculado','O desenho do botão de compra'],'O subtotal é recebido; o total é produzido após a regra de frete.'),
      t('Para subtotal 80 e frete 12, digite o total final.','92','O total é 80 + 12 = 92.'),
      q('No limite subtotal = 100, a condição subtotal >= 100 é:','Verdadeira',['Falsa','Inválida porque usa igualdade'],'Maior ou igual inclui exatamente o valor de corte.'),
      p('Relacione símbolo e papel no algoritmo.',[['Oval','Início ou fim'],['Losango','Decisão sobre o subtotal'],['Retângulo','Calcular total'],['Paralelogramo','Ler subtotal ou mostrar total']],'Cada símbolo comunica a função de uma etapa.'),
      o('Organize o algoritmo para uma compra abaixo de 100.',['Ler subtotal','Verificar que subtotal é menor que 100','Definir frete como 12','Somar subtotal e frete','Mostrar total'],'A decisão precede a escolha do frete, que precede a soma.'),
      g('Complete a comparação para incluir compras de exatamente 100.','>=','A igualdade faz parte da regra informada.','if (subtotal ____ 100) frete = 0;'),
      q('Qual teste ajuda mais a descobrir um erro no limite do frete grátis?','Testar 99,99, 100 e 100,01',['Testar apenas 500','Alterar somente o nome da variável'],'Valores imediatamente ao redor do limite verificam as duas ramificações e a igualdade.'),
      q('Os dois caminhos chegam à mesma etapa Mostrar total. Por quê?','A saída é comum após cada caminho definir o frete',['As duas condições precisam ser verdadeiras ao mesmo tempo','Um fluxograma só pode ter um retângulo'],'Caminhos alternativos podem se reunir antes de uma etapa compartilhada.')
    ]);
  chapter('Variáveis, tipos e operadores',
    ['Valores e representação','Tipos numéricos','Strings e interpolação','Booleanos','Conversões','Operadores e precedência','Null e tipos anuláveis','Validação de entrada'],
    'Valores monetários sem surpresa',
    'Escolher um tipo faz parte de modelar o problema. decimal é apropriado a muitos cálculos financeiros de base decimal; literais usam o sufixo m. A divisão entre inteiros descarta a parte fracionária. Booleanos representam verdadeiro ou falso. Uma entrada textual pode falhar na conversão; TryParse permite testar o sucesso sem tratar texto inválido como um número válido.',[
      q('Qual declaração representa um preço decimal de forma explícita?','decimal preco = 19.90m;',['int preco = 19.90;','bool preco = "19.90";'],'O sufixo m identifica um literal decimal.'),
      t('Digite o resultado inteiro.','2','Ambos os operandos são int, então a parte fracionária da divisão é descartada.','int caixas = 7 / 3;\nConsole.WriteLine(caixas);'),
      g('Preencha o sufixo do literal decimal.','m','O sufixo m, também aceito em maiúscula, indica decimal.','decimal taxa = 0.15____;'),
      q('Qual expressão preserva a fração 7/3 como decimal?','7m / 3',['7 / 3','(decimal)(7 / 3)'],'Um operando decimal produz divisão decimal; converter depois não recupera a fração perdida.'),
      p('Relacione tipos e exemplos.',[['bool','true'],['string','"pedido"'],['int','42'],['decimal','42.50m']],'Cada literal possui forma e finalidade distintas.'),
      t('Digite o valor final de total.','14','A multiplicação é avaliada antes da adição.','int total = 2 + 3 * 4;'),
      q('int.TryParse("dez", out var quantidade) retorna:','false',['true','A string "dez"'],'A representação não é um inteiro válido; o retorno informa falha.'),
      q('Um campo opcional precisa representar um inteiro ausente. Qual tipo expressa isso?','int?',['int!','boolean'],'int? é a forma curta de Nullable<int>.')
    ]);
  chapter('Condições, laços e rastreamento',
    ['Decisões compostas','If e else','Switch e padrões','For e acumuladores','While e sentinelas','Break e continue','Escopo e invariantes','Rastreamento completo'],
    'Conferência de uma fila',
    'Laços combinam estado inicial, condição e atualização. Um for é útil quando essas três partes ficam juntas. break encerra o laço mais próximo; continue avança para a próxima iteração. Em um for, a atualização ainda ocorre após continue. Rastrear o valor do contador e do acumulador evita adivinhar resultados.',[
      t('Quantas vezes a mensagem é exibida?','3','Os valores de i são 0, 1 e 2.','for (int i = 0; i < 3; i++) Console.WriteLine("Conferir");'),
      t('Digite o total final.','6','O acumulador recebe 1, depois 2, depois 3: 0 + 1 + 2 + 3.','int total = 0;\nfor (int i = 1; i <= 3; i++) total += i;'),
      q('Um atendente deve parar ao encontrar o pedido cancelado. Qual comando encerra o laço?','break',['continue','return false sempre'],'break encerra o laço atual; continue apenas ignora o restante da iteração.'),
      q('Neste for, quais valores são exibidos?','1 e 3',['1, 2 e 3','Somente 2'],'continue pula a impressão quando i vale 2, mas a atualização i++ ocorre.','for (int i = 1; i <= 3; i++) {\n  if (i == 2) continue;\n  Console.WriteLine(i);\n}'),
      g('Complete a condição que exige autorização e saldo positivo.','&&','&& exige que as duas condições sejam verdadeiras.','if (autorizado ____ saldo > 0) Processar();'),
      p('Associe comportamento e construção.',[['Executar pelo menos uma vez','do/while'],['Escolher entre duas alternativas','if/else'],['Encerrar o laço atual','break'],['Pular o restante da iteração','continue']],'Cada construção altera o fluxo de uma maneira diferente.'),
      o('Organize uma busca sequencial na fila.',['Começar no primeiro pedido','Verificar se o pedido é o procurado','Se encontrou, encerrar a busca','Se não encontrou, avançar quando houver outro pedido'],'A decisão de parar deve ocorrer antes de avançar para outro elemento.'),
      q('Um while depende de tentativas < 3, mas tentativas nunca muda. Qual risco existe?','Repetição sem término se a condição começar verdadeira',['Compilação sempre impedida','Execução exatamente três vezes'],'A condição precisa poder tornar-se falsa, ou existir uma saída apropriada.')
    ]);
  chapter('Métodos, parâmetros e recursão',
    ['Contratos de métodos','Parâmetros e retornos','Sobrecarga','Passagem de valores','Ref e out','Funções locais','Recursão e caso-base','Composição de funções'],
    'Uma calculadora de embalagens',
    'Um método recebe entradas e produz um resultado ou efeito. return devolve o controle a quem chamou. Parâmetros comuns recebem valores por cópia; ref permite alterar a variável do chamador e exige inicialização prévia. out exige atribuição pelo método antes de retornar. Uma função recursiva precisa de um caso-base e progresso em direção a ele.',[
      t('Digite o resultado de Dobro(6).','12','O método multiplica o argumento por 2.','static int Dobro(int n) => n * 2;'),
      q('Qual informação faz parte de um contrato útil para Dividir?','O divisor precisa ser diferente de zero',['A cor do editor usado','O nome do arquivo de captura de tela'],'Pré-condições indicam quando uma operação é válida.'),
      g('Complete a instrução que devolve a soma.','return','return devolve o resultado ao código chamador.','static int Somar(int a, int b) { ____ a + b; }'),
      t('Digite o valor de caixas após a chamada.','4','O parâmetro ref referencia a variável do chamador.','static void Incrementar(ref int n) { n++; }\nint caixas = 3;\nIncrementar(ref caixas);'),
      p('Relacione termo e significado.',[['Parâmetro','Nome que recebe uma entrada no método'],['Argumento','Valor fornecido na chamada'],['Retorno','Resultado entregue ao chamador'],['Caso-base','Condição que encerra a recursão']],'Separar parâmetros e argumentos ajuda a ler definições e chamadas.'),
      q('Qual valor Fatorial(0) deve devolver segundo o caso-base usual?','1',['0','Uma chamada infinita a si mesmo'],'0! é definido como 1 e oferece um caso-base apropriado.'),
      o('Organize a avaliação de SomaAte(2), com caso-base SomaAte(0)=0.',['Solicitar SomaAte(2)','Solicitar SomaAte(1)','Obter 0 de SomaAte(0)','Retornar 1 para SomaAte(1)','Retornar 3 para SomaAte(2)'],'As chamadas descem até o caso-base e os resultados voltam para as chamadas anteriores.'),
      q('Um método com out int resultado pode retornar normalmente sem atribuir resultado?','Não; o parâmetro out deve ser atribuído',['Sim, sempre','Só quando resultado é positivo'],'A atribuição de parâmetros out é verificada pelo compilador nas saídas normais.')
    ]);
  chapter('Arrays, strings e coleções',
    ['Sequências e posições','Arrays e limites','Listas mutáveis','Strings e comparação','Percursos','Transformações de texto','Busca em coleções','Modelagem de registros'],
    'A lista de convidados',
    'Arrays têm comprimento fixo após a criação e índices a partir de zero. List<T> permite adicionar e remover elementos. Strings são imutáveis: métodos de transformação devolvem novas strings. Uma coleção vazia exige tratamento explícito antes de acessar a primeira posição.',[
      t('Qual nome está no índice 1?','Bia','O índice zero é Ana e o índice um é Bia.','string[] nomes = { "Ana", "Bia", "Caio" };'),
      q('Para três elementos, qual índice está fora dos limites?','3',['0','2'],'O maior índice válido é Length - 1, portanto 2.'),
      g('Complete a propriedade que informa o comprimento do array.','Length','Arrays usam Length; listas normalmente expõem Count.','int quantidade = nomes.____;'),
      t('Digite o valor de texto após a chamada.','ana','ToUpper devolve outra string; o retorno não foi atribuído.','string texto = "ana";\ntexto.ToUpper();'),
      p('Relacione necessidade e recurso.',[['Coleção de tamanho variável','List<T>'],['Texto imutável','string'],['Comprimento de array','Length'],['Número de itens de uma lista','Count']],'Tipos distintos possuem contratos e membros próprios.'),
      q('Qual verificação protege nomes[0] quando nomes não é nulo?','nomes.Length > 0',['nomes.Length >= 0','nomes.Length < 0'],'Comprimento zero significa que não existe elemento no índice zero.'),
      t('Quantos itens restam?','2','A lista começou com dois itens, recebeu um e removeu um.','var ids = new List<int> { 4, 8 };\nids.Add(12);\nids.Remove(8);'),
      o('Organize a preparação de um nome recebido como texto.',['Receber o texto','Verificar se está nulo ou vazio conforme a regra','Remover espaços externos com Trim','Validar o nome normalizado','Armazenar o resultado'],'A normalização e validação precisam preceder o armazenamento usado pelo sistema.')
    ]);
  chapter('Classes, objetos e encapsulamento',
    ['Estado e identidade','Classes e instâncias','Construtores','Campos e propriedades','Visibilidade','Invariantes','Métodos de domínio','Objetos colaborando'],
    'Um saldo com regras',
    'Objetos combinam estado e comportamento. Uma conta deve controlar alterações do saldo para impedir operações inválidas. Uma propriedade com private set permite leitura externa e atualização dentro da própria classe. Encapsular não significa apenas esconder campos: significa oferecer operações que preservem as regras do objeto.',[
      q('Qual declaração impede que código externo atribua diretamente Saldo?','public decimal Saldo { get; private set; }',['public decimal Saldo;','public decimal Saldo { get; set; }'],'O setter privado restringe a atribuição ao interior da classe.'),
      g('Complete o modificador do setter para restringi-lo à classe.','private','Um setter privado mantém a leitura pública sem liberar a escrita externa.','public decimal Saldo { get; ____ set; }'),
      q('O método Sacar recebe um valor negativo. Qual comportamento preserva o contrato?','Rejeitar a operação antes de alterar o saldo',['Somar automaticamente esse valor ao saldo','Ignorar a regra porque o método é público'],'A validação faz parte da operação que controla o estado.'),
      t('Dois objetos Conta distintos começam com saldo zero. Depositar 10 somente no primeiro altera quantos objetos?','1','O estado de instâncias distintas é independente, desde que não compartilhem o mesmo estado externo.'),
      p('Relacione conceito e exemplo.',[['Classe','Definição de Conta'],['Instância','Uma conta específica'],['Propriedade','Saldo'],['Comportamento','Depositar']],'A classe descreve o tipo; cada instância possui seu próprio estado de instância.'),
      q('a e b referenciam a mesma Conta. Alterar o objeto por b é visível por a?','Sim, ambos referenciam a mesma instância',['Não, atribuição sempre copia todo o objeto','Somente se Conta for static'],'Copiar uma referência de classe não clona o objeto.'),
      o('Organize um depósito com valor válido.',['Receber o valor','Verificar que o valor é positivo','Calcular o novo saldo','Atualizar o estado da conta','Informar conclusão'],'O estado deve mudar somente depois que as pré-condições forem verificadas.'),
      q('Qual é o papel do construtor?','Estabelecer um estado inicial válido',['Executar a cada leitura de propriedade','Garantir que toda classe seja imutável'],'O construtor participa da criação e pode validar dados essenciais da instância.')
    ]);
  chapter('Herança, interfaces e polimorfismo',
    ['Contratos entre objetos','Herança de classes','Membros virtuais','Sobrescrita','Interfaces','Classes abstratas','Composição','Escolha de modelagem'],
    'Notificações por diferentes canais',
    'Uma interface descreve um contrato que diferentes tipos podem implementar. Quem depende de INotificador pode usar implementações de e-mail ou de teste sem conhecer seus detalhes. Em herança de classes, virtual permite sobrescrita e override declara a substituição. Composição conecta objetos por colaboração e costuma evitar hierarquias artificiais.',[
      q('Um serviço só precisa chamar Enviar. De qual abstração deve depender?','INotificador',['Da senha de uma conta de e-mail','De todos os campos internos de NotificadorEmail'],'A interface expõe a capacidade necessária e reduz o acoplamento.'),
      g('Complete o modificador de um método que sobrescreve um membro virtual herdado.','override','override expressa a sobrescrita e permite verificação pelo compilador.','public ____ string Descrever() => "E-mail";'),
      p('Relacione recurso e intenção.',[['interface','Definir um contrato'],['abstract class','Oferecer base incompleta e possível estado compartilhado'],['virtual','Permitir sobrescrita de membro'],['override','Sobrescrever membro herdado']],'Essas palavras têm papéis diferentes na definição e implementação do contrato.'),
      q('Se NotificadorTeste implementa INotificador, ele pode ser fornecido a um método que recebe INotificador?','Sim',['Não, interfaces não podem ser tipos de parâmetro','Somente por cópia de todos os campos'],'Uma referência do tipo de interface pode apontar para uma implementação compatível.'),
      t('Qual palavra impede que uma classe seja herdada?','sealed','sealed encerra a possibilidade de derivar daquela classe.'),
      q('Um pedido usa um notificador, mas não é um notificador. Qual relação descreve melhor isso?','Composição',['Herança obrigatória','Igualdade de tipos'],'A colaboração usa um objeto de outro tipo sem afirmar relação é-um.'),
      o('Organize a integração por interface.',['Definir o contrato INotificador','Criar uma implementação concreta','Receber INotificador no serviço','Fornecer a implementação ao criar o serviço','Chamar o contrato durante a operação'],'Separar contrato de implementação facilita substituir detalhes sem reescrever o serviço.'),
      q('Usar new para ocultar um método herdado equivale a override?','Não; ocultação e sobrescrita têm comportamentos diferentes',['Sim, as palavras são intercambiáveis','Sim, desde que o método devolva string'],'Ocultar um membro não estabelece o mesmo despacho virtual de uma sobrescrita.')
    ]);
  chapter('Genéricos e coleções tipadas',
    ['Tipos como parâmetros','Métodos genéricos','Classes genéricas','Restrições','Dictionary','HashSet','Comparadores','Escolha de coleção'],
    'Catálogo identificado por código',
    'Genéricos permitem reutilizar operações preservando informação de tipo. Dictionary<TKey,TValue> associa chaves únicas a valores. TryGetValue informa se encontrou a chave e entrega o valor encontrado. HashSet<T> representa um conjunto sem duplicatas segundo seu comparador. Escolher a coleção depende de operações e regras, não somente da sintaxe.',[
      q('Qual tipo representa produtos identificados por código string?','Dictionary<string, Produto>',['List<bool>','Dictionary<Produto, string> obrigatoriamente'],'A chave string representa o código; o valor armazena o produto.'),
      g('Complete o método que consulta uma chave sem exigir que exista.','TryGetValue','TryGetValue retorna um booleano e fornece o valor via out.','if (produtos.____(codigo, out var produto)) Mostrar(produto);'),
      q('Uma chave já existe. O que Add com a mesma chave normalmente faz em Dictionary?','Lança ArgumentException',['Cria sempre uma segunda entrada com a mesma chave','Remove todas as entradas'],'Add exige uma chave ainda ausente; atribuição pelo indexador possui outra semântica.'),
      t('Quantos elementos o conjunto contém?','2','A segunda inserção de A não cria outro elemento.','var codigos = new HashSet<string> { "A", "B", "A" };'),
      p('Associe necessidade e coleção.',[['Itens únicos','HashSet<T>'],['Chave para valor','Dictionary<TKey,TValue>'],['Sequência indexada variável','List<T>'],['Primeiro a entrar, primeiro a sair','Queue<T>']],'As operações frequentes ajudam a escolher a estrutura.'),
      q('Em where T : IDisposable, o que a restrição garante ao código genérico?','T satisfaz o contrato IDisposable',['T nunca pode ser nulo em nenhuma configuração','T é obrigatoriamente uma string'],'A restrição permite usar membros do contrato exigido.'),
      t('Qual parâmetro de tipo foi escolhido na chamada Identidade<int>(8)?','int','O argumento de tipo explícito é int, independentemente do nome do parâmetro do método.'),
      q('Você precisa comparar códigos ignorando maiúsculas em um HashSet<string>. Onde expressar essa política?','No comparador fornecido ao conjunto',['Alterando a fonte do terminal','Usando List<int>'],'Um comparador como StringComparer.OrdinalIgnoreCase define a igualdade utilizada pelo conjunto.')
    ]);
  chapter('Delegates, eventos e lambdas',
    ['Comportamento como valor','Action e Func','Lambdas','Captura de variáveis','Eventos','Inscrição e remoção','Responsabilidade de notificação','Composição funcional'],
    'Aviso quando o estoque baixa',
    'Um delegate representa uma assinatura de método. Action não devolve resultado; Func inclui um tipo de retorno. Lambdas permitem escrever pequenas funções. Um evento controla a inscrição de interessados, enquanto a classe publicadora decide quando notificar. Inscrições de longa duração precisam ser removidas quando o assinante deixa de precisar delas.',[
      q('Qual tipo representa uma função que recebe int e devolve bool?','Func<int, bool>',['Action<int>','Func<bool, int>'],'Em Func, o último argumento de tipo representa o retorno.'),
      t('Digite True ou False para o resultado.','True','A lambda compara 3 com 5 e devolve verdadeiro.','Func<int, bool> baixo = n => n < 5;\nConsole.WriteLine(baixo(3));'),
      g('Complete o operador que inscreve um handler em um evento.','+=','+= adiciona a inscrição do handler.','estoque.Baixo ____ AoEstoqueBaixo;'),
      g('Complete o operador que remove a inscrição do mesmo handler.','-=','-= remove a inscrição correspondente.','estoque.Baixo ____ AoEstoqueBaixo;'),
      p('Relacione construção e papel.',[['Action<string>','Receber texto sem retorno'],['Func<int, int>','Transformar inteiro em inteiro'],['event','Controlar inscrições e publicação'],['Lambda','Expressão de função']],'As assinaturas ajudam a entender quais dados entram e saem.'),
      q('Uma lambda captura uma variável local mutável. Ela sempre captura somente o valor inicial?','Não; a captura pode observar mudanças posteriores na variável',['Sim, toda captura é uma constante','Sim, desde que a variável seja int'],'A captura de variável não equivale a uma cópia imutável de seu valor inicial.'),
      o('Organize o ciclo de um observador de estoque.',['Criar o assinante','Inscrever seu handler','Receber notificações durante o uso','Remover a inscrição ao encerrar o uso'],'A remoção evita que o publicador mantenha uma assinatura desnecessária.'),
      q('Quem normalmente pode invocar um evento declarado por uma classe?','A própria classe que declara o evento',['Qualquer assinante externo diretamente','Somente o sistema operacional'],'O evento restringe o uso externo à inscrição e remoção, preservando o controle da publicação.')
    ]);
  chapter('Consultas com LINQ',
    ['Consultas sobre sequências','Where','Select','OrderBy e ThenBy','Agregações','GroupBy','Execução adiada','Materialização e limites'],
    'Uma consulta de despesas',
    'LINQ separa filtros, projeções, ordenação e agregações. Muitas operações em IEnumerable<T> usam execução adiada: a consulta é avaliada ao enumerar. ToList materializa os resultados naquele momento. First exige ao menos um elemento; FirstOrDefault pode retornar o valor padrão, que deve ser interpretado com cuidado.',[
      t('Digite os valores produzidos separados por vírgula.',['20, 30','20,30'],'Where mantém somente valores maiores ou iguais a 20.','var valores = new[] { 10, 20, 30 };\nvar consulta = valores.Where(v => v >= 20);'),
      q('Qual operação transforma cada despesa em seu nome de categoria?','Select',['Where','OrderBy'],'Select projeta elementos; Where filtra e OrderBy ordena.'),
      g('Complete a operação que cria uma lista com os resultados atuais.','ToList','ToList enumera a consulta e materializa uma lista.','var copia = consulta.____();'),
      p('Relacione operação e resultado esperado.',[['Where','Subconjunto de elementos'],['Select','Projeção de cada elemento'],['Sum','Soma de valores'],['GroupBy','Grupos por uma chave']],'O nome da operação representa sua transformação principal.'),
      q('Uma lista muda depois de definir Where e antes de enumerar. A consulta pode refletir a mudança?','Sim, quando avaliada posteriormente sobre essa lista',['Não, Where sempre copia tudo imediatamente','Somente se ToList já foi chamado antes da mudança'],'A execução adiada observa a origem no momento da enumeração.'),
      t('Digite o resultado da soma.','60','Sum acumula os três inteiros.','int total = new[] { 10, 20, 30 }.Sum();'),
      q('First é chamado sobre uma sequência vazia. Qual é o comportamento?','Lança InvalidOperationException',['Retorna sempre zero','Cria um elemento automaticamente'],'First requer pelo menos um elemento.'),
      o('Organize a obtenção dos três maiores valores acima de 100.',['Filtrar valores maiores que 100','Ordenar em ordem decrescente','Selecionar os três primeiros com Take','Materializar os resultados'],'Filtrar e ordenar definem quais elementos devem entrar no recorte final.')
    ]);
  chapter('Exceções, arquivos e serialização',
    ['Falhas e contratos','Try e catch','Finally','Using e descarte','Leitura e escrita','JSON','Validação de dados','Recuperação de falhas'],
    'Importação de despesas em JSON',
    'Importar um arquivo envolve falhas de acesso, formato e conteúdo. Capturar exceções específicas ajuda a distinguir esses casos. using garante descarte de recursos compatíveis ao sair do escopo. Desserializar JSON não prova que os dados obedecem às regras de negócio: valores obrigatórios e limites ainda precisam ser verificados.',[
      q('O arquivo não existe. Qual falha precisa ser tratada como acesso ao arquivo, e não como JSON inválido?','FileNotFoundException',['JsonException','DivideByZeroException'],'A leitura falhou antes de analisar o conteúdo JSON.'),
      g('Complete o bloco que executa limpeza após try/catch.','finally','finally é executado quando o fluxo deixa a estrutura, salvo interrupções excepcionais do processo.','try { Importar(); } catch (IOException) { RegistrarFalha(); } ____ { FecharIndicador(); }'),
      q('Um JSON válido contém uma despesa de valor negativo. Desserializar é suficiente?','Não; é preciso validar a regra do domínio',['Sim, JSON valida qualquer regra financeira','Sim, desde que a extensão seja .json'],'Validade sintática do documento não garante validade dos dados para o negócio.'),
      p('Relacione etapa e responsabilidade.',[['Leitura','Obter bytes ou texto do arquivo'],['Desserialização','Converter representação em objetos'],['Validação','Verificar regras dos dados'],['Persistência','Guardar registros aceitos']],'Cada fronteira pode falhar por razões distintas.'),
      q('Dentro de catch, qual instrução relança a exceção atual preservando sua origem de forma adequada?','throw;',['throw ex; sempre preserva tudo igualmente','return null;'],'throw sem expressão relança a exceção atual sem reiniciar sua pilha no ponto do relançamento.'),
      o('Organize uma importação que não salva entradas inválidas.',['Ler o arquivo','Desserializar o JSON','Validar todos os registros para a operação','Persistir os registros aprovados','Informar o resultado'],'A validação deve ocorrer antes da gravação que a operação promete realizar.'),
      t('Qual classe estática do namespace System.Text.Json oferece Serialize e Deserialize?','JsonSerializer','JsonSerializer fornece as operações usuais de serialização JSON nessa biblioteca.'),
      q('Qual benefício traz using var leitor = new StreamReader(caminho)?','O leitor será descartado ao sair do escopo',['O arquivo fica automaticamente público','Todas as exceções são ignoradas'],'using cuida do descarte; não elimina falhas nem muda permissões do arquivo.')
    ]);
  chapter('Async, await, tarefas e cancelamento',
    ['Operações assíncronas','Task e Task<T>','Await','Composição de tarefas','Exceções assíncronas','CancellationToken','Timeout e cancelamento','Concorrência controlada'],
    'Uma busca que pode ser cancelada',
    'Task representa uma operação e Task<T> representa uma operação que produz um resultado. await observa a conclusão sem exigir bloqueio da thread enquanto espera. Marcar um método async não cria automaticamente uma thread. Cancelamento é cooperativo: o token deve ser propagado e observado pelas operações envolvidas.',[
      q('Um método assíncrono produz uma lista de despesas. Qual retorno expressa isso?','Task<List<Despesa>>',['void obrigatoriamente','List<Task> sempre'],'Task<T> representa a conclusão futura com um resultado de tipo T.'),
      g('Complete a palavra que observa a conclusão da tarefa.','await','await espera a conclusão lógica e permite propagar resultado e exceção.','var texto = ____ cliente.GetStringAsync(url, token);'),
      q('Adicionar async a um método garante que ele execute em outra thread?','Não',['Sim, exatamente uma nova thread por chamada','Somente quando devolve int'],'Async descreve o fluxo assíncrono; não garante criação ou uso de outra thread.'),
      p('Associe tipo e finalidade.',[['Task','Operação sem resultado tipado'],['Task<T>','Operação com resultado T'],['CancellationToken','Sinal de cancelamento'],['CancellationTokenSource','Origem que pode solicitar cancelamento']],'Fonte e token têm responsabilidades diferentes.'),
      q('O usuário cancela a busca, mas o token nunca chega ao acesso externo. Qual problema pode ocorrer?','A operação externa pode continuar executando',['O compilador transforma a chamada em sincrônica','O token encerra automaticamente todo o processo'],'Cancelamento depende da cooperação das operações e da propagação do token.'),
      o('Organize uma busca cancelável.',['Criar a fonte de cancelamento','Passar seu token à operação','Aguardar a tarefa','Tratar cancelamento de forma distinta de falha','Descartar a fonte quando não for mais necessária'],'O token precisa existir antes da chamada; os resultados são tratados após a tarefa concluir.'),
      t('Qual método combina a conclusão de várias tarefas?','Task.WhenAll','Task.WhenAll representa a conclusão conjunta; iniciar tarefas e aguardar não são a mesma etapa.'),
      q('Por que evitar async void em um método comum de serviço?','O chamador não recebe Task para aguardar e observar falhas',['Porque async void não compila em nenhum contexto','Porque void sempre abre uma conexão de rede'],'Handlers de eventos são uma exceção comum; métodos de serviço normalmente devem retornar Task.')
    ]);
  chapter('SQL, persistência e Entity Framework Core',
    ['Dados relacionais','Chaves e restrições','SQL parametrizado','DbContext','Consultas EF Core','Rastreamento e alterações','Transações','Migrações e concorrência'],
    'Salvar despesas com uma unidade de trabalho',
    'Uma tabela organiza linhas, colunas e restrições. Parâmetros SQL separam dados da estrutura do comando. No EF Core, DbContext acompanha uma unidade de trabalho; alterações rastreadas são persistidas por SaveChanges ou SaveChangesAsync. A mesma instância de DbContext não deve executar operações paralelas. Migrações descrevem mudanças de esquema e precisam ser revisadas antes de aplicação.',[
      q('Qual prática evita montar SQL concatenando diretamente o valor recebido?','Usar parâmetros para os valores',['Remover todos os espaços do valor','Trocar aspas simples por aspas duplas sem análise'],'Parâmetros mantêm dados separados da sintaxe SQL.'),
      g('Complete a chamada que persiste alterações rastreadas de forma assíncrona.','SaveChangesAsync','Adicionar uma entidade ao contexto não equivale, por si só, a gravá-la no banco.','db.Despesas.Add(despesa);\nawait db.____(token);'),
      p('Relacione termo e função.',[['Chave primária','Identificar uma linha'],['Chave estrangeira','Relacionar linhas entre tabelas'],['Transação','Agrupar alterações com garantias de consistência'],['Migração','Evoluir o esquema do banco']],'Modelagem, execução e evolução do esquema resolvem problemas distintos.'),
      q('Duas operações paralelas compartilham a mesma instância de DbContext. Isso é adequado?','Não; DbContext não é thread-safe',['Sim, sempre que usam async','Sim, porque toda consulta é somente leitura'],'Aguardar cada operação antes de reutilizar o contexto ou usar instâncias apropriadas evita compartilhamento concorrente.'),
      t('Qual palavra SQL seleciona colunas de uma consulta?','SELECT','SELECT define a projeção solicitada pela consulta.'),
      q('Uma consulta apenas exibe dados e não altera as entidades. Qual recurso pode evitar rastreamento desnecessário?','AsNoTracking()',['SaveChanges() antes da consulta','Add() para cada linha'],'Consultas sem rastreamento são apropriadas quando o estado retornado não será usado para atualização rastreada.'),
      o('Organize a gravação validada de uma despesa.',['Validar os dados recebidos','Criar a entidade válida','Adicionar a entidade ao contexto','Aguardar SaveChangesAsync','Retornar o identificador persistido'],'A resposta de sucesso deve ocorrer depois da persistência que ela representa.'),
      q('Uma migração contém remoção de coluna com dados. Qual é a próxima ação responsável?','Revisar a mudança e sua estratégia de preservação/backup',['Aplicar automaticamente em produção porque compilou','Renomear a classe e ignorar o banco'],'Compilação não garante que uma alteração de esquema preserve dados relevantes.')
    ]);
  chapter('Testes, depuração e organização da solução',
    ['Comportamento verificável','Arrange Act Assert','Casos de borda','Testes de integração','Depuração','Isolamento de dependências','Projetos e referências','Rotina de qualidade'],
    'Um teste que detecta a cobrança duplicada',
    'Um teste deve observar comportamento relevante e falhar quando ele estiver incorreto. Arrange prepara o cenário, Act executa a operação e Assert verifica o resultado. Testes unitários isolam uma unidade; testes de integração verificam colaboração real entre partes. Um breakpoint ajuda a observar estado e fluxo, mas não substitui uma verificação repetível.',[
      q('O saldo inicial é 100 e uma cobrança de 30 ocorre uma vez. Qual saldo esperado deve o teste verificar?','70',['40','100'],'O teste precisa detectar uma cobrança duplicada, que reduziria o saldo a 40.'),
      o('Organize um teste pela convenção Arrange, Act, Assert.',['Criar uma conta com saldo 100','Executar uma cobrança de 30','Verificar que o saldo é 70'],'Preparação, ação e verificação tornam o propósito do teste legível.'),
      g('Complete a asserção xUnit que compara esperado e observado.','Equal','Assert.Equal recebe o valor esperado e o valor observado.','Assert.____(70m, conta.Saldo);'),
      p('Relacione recurso e propósito.',[['Breakpoint','Pausar a execução em um ponto'],['Stack trace','Identificar caminho de chamadas de uma falha'],['Teste unitário','Verificar uma unidade isolada'],['Teste de integração','Verificar colaboração de partes reais']],'Depuração explica uma execução; testes automatizam verificações repetíveis.'),
      q('Qual caso adicional verifica uma regra de cobrança importante?','Cobrança maior que o saldo disponível',['Mudar a cor da janela','Executar somente o mesmo valor novamente'],'O limite revela se a regra rejeita uma operação inválida sem alterar o estado.'),
      t('Qual comando da CLI executa os testes da solução ou projeto atual?','dotnet test','dotnet test aciona a infraestrutura de testes configurada.'),
      q('Um teste depende do relógio real e falha apenas à meia-noite. Qual melhoria ajuda?','Fornecer uma abstração de tempo controlável ao cenário',['Repetir o teste até passar','Remover todas as asserções'],'Controlar dependências de tempo torna o cenário determinístico.'),
      q('Separar projeto de domínio e projeto de API ajuda quando:','As regras do domínio podem ser testadas sem iniciar o servidor',['Toda classe precisa conhecer HttpContext','Nenhuma referência de projeto é permitida'],'Separação de responsabilidades permite testar regras sem depender do transporte HTTP.')
    ]);
  chapter('Projeto: API de controle de despesas com ASP.NET Core',
    ['Contrato e escopo','Modelo de despesas','Endpoints e DTOs','Validação e erros','Persistência','Consultas e paginação','Testes da API','Entrega documentada'],
    'Da requisição à despesa persistida',
    'O projeto integra uma API de despesas com validação, persistência e consultas. Um DTO define os dados aceitos na fronteira HTTP; a entidade representa o estado persistido. O servidor deve validar entradas e verificar o acesso do usuário aos recursos. Os exemplos de endpoint são fragmentos didáticos, não uma implementação completa de autenticação ou implantação.',[
      q('Uma criação bem-sucedida produz uma nova despesa com URL própria. Qual status descreve normalmente essa resposta?','201 Created',['404 Not Found','500 Internal Server Error'],'201 informa criação; uma localização do recurso ajuda o cliente a consultá-lo.'),
      g('Complete o método que registra uma rota HTTP GET em Minimal APIs.','MapGet','MapGet associa um handler ao verbo GET para uma rota.','app.____("/despesas/{id:int}", BuscarDespesa);'),
      p('Relacione situação e resposta apropriada.',[['Entrada rejeitada pela validação','400 Bad Request'],['Recurso inexistente','404 Not Found'],['Criação bem-sucedida','201 Created'],['Falha inesperada do servidor','500 Internal Server Error']],'O contrato de erro deve distinguir responsabilidades sem expor detalhes internos.'),
      q('O cliente informa UsuarioId de outra pessoa ao criar uma despesa. O servidor deve confiar nesse campo?','Não; a identidade e autorização devem vir do contexto autenticado e de regras do servidor',['Sim, porque JSON é tipado','Sim, se o campo for inteiro'],'Campos enviados pelo cliente não comprovam a identidade ou o direito de acesso.'),
      o('Organize o tratamento de criação.',['Ler o DTO da requisição','Verificar identidade, autorização e dados','Criar a entidade válida','Persistir com sucesso','Responder com o recurso criado'],'A resposta de sucesso depende de validação, autorização e gravação concluídas.'),
      q('Uma lista pode conter milhões de despesas. Qual característica deve entrar no contrato de consulta?','Paginação com limites definidos',['Retorno ilimitado obrigatório','Uma pausa artificial de um minuto'],'Limites reduzem custo e permitem que clientes naveguem pelos resultados.'),
      t('Qual palavra SQL organiza linhas por uma coluna?',['ORDER BY','order by'],'Uma ordenação definida é importante para paginação consistente; usar um desempate estável quando necessário.'),
      q('Qual teste de integração é essencial antes da entrega?','Criar uma despesa válida e recuperá-la pela API, verificando os dados persistidos',['Somente conferir a cor do logo','Somente verificar que o README existe'],'O teste atravessa transporte, validação e persistência, comprovando a colaboração entre essas partes.')
    ]);
  window.LINCODE_CONTENT=window.LINCODE_CONTENT||{};
  window.LINCODE_CONTENT.csharp=chapters;
})();
