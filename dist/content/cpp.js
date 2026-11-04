/* Conteúdo autoral de C++ (C++17/20 moderno, alinhado às C++ Core Guidelines).
 * A meta de 40 lições por capítulo está em expansão; cada capítulo traz 1 lição autoral completa.
 * Os exemplos são fragmentos didáticos exibidos como texto; nenhum código do aluno é executado.
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
    const n=chapters.length+1, prefix=`cpp-c${String(n).padStart(2,'0')}`;
    chapters.push({id:prefix,title,description:theory.split('. ')[0]+'.',targetLessonCount:40,authoringStatus:'partial',reviewStatus:'technical-review-pending',
      units:unitNames.map((name,i)=>({id:`${prefix}-u${i+1}`,title:name,objective:`Aplicar ${name.toLowerCase()} em C++ e explicar o resultado.`,targetLessonCount:5,authoringStatus:i===0?'partial':'planned',lessons:i===0?[{id:`${prefix}-u1-l1`,title:lessonTitle,theory,activities:activities.map((a,j)=>({...a,id:`${prefix}-u1-l1-a${j+1}`}))}]:[]}))});
  }

  chapter('Introdução, compilador e primeiro programa',
    ['Código e binário','Compilador','Função main','Includes','Saída','Entrada','Compilar e executar','Diagnóstico'],
    'Painel de embarque na estação',
    'C++ é uma linguagem compilada que traduz arquivos de código-fonte em executáveis nativos de alto desempenho. A diretiva #include <iostream> disponibiliza os fluxos padrão std::cout para saída e std::cin para entrada, e a execução do programa começa na função int main(). Ao escrever no terminal, usar o caractere \'\\n\' adiciona quebra de linha sem forçar o esvaziamento imediato do buffer como std::endl faria. Erros de sintaxe são detectados pelo compilador antes mesmo de o binário ser gerado.',[
      q('Qual ferramenta traduz o arquivo estacao.cpp em um programa executável nativo?',
        'O compilador C++ (como g++, clang++ ou MSVC)',
        ['O navegador web ao abrir o arquivo .cpp diretamente','Apenas o editor de texto sem etapa de compilação'],
        'O compilador analisa o código-fonte C++ e, junto ao linkeditor, produz o binário executável para o sistema operacional.'),
      t('Digite exatamente o texto exibido pelo painel da estação, sem aspas e sem quebra de linha.',
        'Plataforma 4 liberada',
        'std::cout envia a sequência de caracteres entre aspas para a saída padrão.',
        '#include <iostream>\n\nint main() {\n    std::cout << "Plataforma 4 liberada" << \'\\n\';\n    return 0;\n}'),
      g('Complete a diretiva de pré-processador (incluindo #) para importar <iostream> no painel da estação.',
        '#include',
        'A diretiva #include incorpora as declarações do cabeçalho padrão <iostream> na unidade de tradução.',
        '____ <iostream>\n\nint main() {\n    std::cout << "Embarque imediato\\n";\n    return 0;\n}'),
      p('Relacione cada elemento do programa da estação ao seu papel em C++.',[
        ['int main()','Ponto de entrada onde a execução começa'],
        ['std::cout <<','Envia dados formatados para a saída padrão'],
        ['std::cin >>','Extrai dados vindos da entrada padrão'],
        ['return 0;','Informa ao sistema que o programa terminou com sucesso']
      ],'Entrada, saída, ponto de início e código de retorno cumprem papéis distintos em um executável C++.'),
      o('Organize as etapas para compilar e executar estacao.cpp pelo terminal com g++.',[
        'Salvar o código-fonte no arquivo estacao.cpp',
        'Invocar g++ -std=c++20 estacao.cpp -o estacao',
        'Corrigir eventuais erros apontados pelo compilador',
        'Executar o binário gerado no terminal'
      ],'O binário só existe e pode ser executado depois que a compilação conclui sem erros.'),
      q('Por que as C++ Core Guidelines recomendam usar \'\\n\' em vez de std::endl na saída rotineira do painel?',
        'Porque \'\\n\' quebra a linha sem forçar um flush desnecessário do buffer',
        ['Porque std::endl não adiciona quebra de linha no terminal','Porque \'\\n\' encerra a função main imediatamente'],
        'std::endl insere nova linha e força std::flush (regra SL.io.50), o que reduz o desempenho em saídas frequentes.'),
      t('Se o operador digitar 7 no teclado para o código abaixo, qual número inteiro será impresso após Vagao: ?',
        '7',
        'std::cin >> vagao lê o inteiro 7 da entrada padrão e std::cout o exibe na sequência.',
        'int vagao{0};\nstd::cin >> vagao;\nstd::cout << "Vagao: " << vagao << \'\\n\';'),
      q('Faltou o ponto e vírgula após return 0 em estacao.cpp. Em que momento essa falha aparece?',
        'Durante a compilação, impedindo a geração do executável',
        ['Somente depois que o usuário digitar um vagão inválido','Apenas após dez execuções do binário'],
        'Erros de sintaxe são diagnosticados estaticamente pelo compilador antes de qualquer execução.')
    ]);

  chapter('Lógica, algoritmos e fluxogramas',
    ['Especificação','Sequências','Símbolos','Construção de fluxos','Decisões','Repetições','Rastreamento','Casos de teste'],
    'Triagem de caixas no armazém',
    'Antes de codificar em C++, especificar entradas, decisões e saídas em um fluxograma evita erros de fronteira. Na triagem de um armazém, uma caixa com até 25 quilos segue pela esteira padrão, enquanto cargas acima de 25 quilos são desviadas para a esteira reforçada. O losango representa a comparação peso <= 25, separando claramente os fluxos verdadeiro e falso. Testar o algoritmo com valores abaixo, exatamente no corte e acima dele confirma que a especificação foi respeitada.',[
      q('Na especificação da triagem do armazém, qual dado constitui a entrada principal de cada verificação?',
        'A massa medida da caixa em quilos',
        ['O nome da esteira escolhida ao final','A cor do fluxograma impresso no mural'],
        'A massa lida na balança entra no algoritmo para que a decisão selecione a esteira correta.'),
      p('Associe cada símbolo do fluxograma de triagem à etapa que ele representa.',[
        ['Oval','Início ou término da rotina de triagem'],
        ['Paralelogramo','Leitura da massa no sensor ou exibição da esteira'],
        ['Losango','Teste lógico peso <= 25'],
        ['Retângulo','Incremento do contador de caixas processadas']
      ],'Cada forma geométrica padroniza visualmente início/fim, entrada/saída, decisão e processamento.'),
      g('Complete o operador relacional para que caixas com exatamente 25 kg permaneçam na esteira padrão.',
        '<=',
        'A regra "até 25 quilos" inclui o limite 25, portanto exige menor ou igual (<=).',
        'if (peso ____ 25) {\n    esteira = "padrao";\n} else {\n    esteira = "reforcada";\n}'),
      t('Rastreie a regra peso <= 25 para três caixas de 10, 30 e 25 quilos: quantas seguem pela esteira padrão? Digite apenas o inteiro.',
        '2',
        '10 <= 25 é verdadeiro e 25 <= 25 também é verdadeiro; apenas a caixa de 30 kg vai para a esteira reforçada.'),
      o('Ordene os passos do fluxo ao processar uma caixa de 32 quilos na balança.',[
        'Ler a massa 32 informada pelo sensor da balança',
        'Avaliar a decisão peso <= 25 como falsa',
        'Selecionar o desvio para a esteira reforçada',
        'Registrar o encaminhamento da caixa e encerrar o ciclo'
      ],'A leitura antecede a decisão, que escolhe o ramo falso para 32 kg antes da saída.'),
      q('Qual conjunto de casos de teste exercita melhor a fronteira da decisão peso <= 25?',
        '24, 25 e 26',
        ['1, 2 e 3','100, 200 e 300'],
        'Valores imediatamente ao redor e exatamente sobre o corte detectam trocas acidentais entre < e <=.'),
      t('Ao rastrear carga_total iniciando em 0 para os pesos lidos 12, 18 e 15, qual é o valor final acumulado? Digite o inteiro.',
        '45',
        'O acumulador evolui de 0 para 12, depois 12 + 18 = 30 e finalmente 30 + 15 = 45.',
        'int carga_total{0};\n// Leituras sucessivas: 12, 18, 15\n// A cada caixa: carga_total = carga_total + peso;'),
      q('Em um fluxograma com repetição controlada por caixas_restantes > 0, o que ocorre se o passo de decremento for esquecido?',
        'O fluxo entra em laço infinito quando começa com ao menos uma caixa',
        ['O algoritmo processa exatamente uma caixa e para sozinho','O losango zera automaticamente a variável na segunda volta'],
        'Sem atualizar a variável envolvida na condição de parada, ela permanece positiva indefinidamente.')
    ]);

  chapter('Tipos, variáveis e operadores',
    ['Inteiros','Ponto flutuante','Booleanos','Constantes','Aritmética','Conversões','Comparações','Limites de representação'],
    'Telemetria de bateria solar',
    'Em C++ moderno, toda variável deve ser inicializada na declaração, preferencialmente com chaves {} para impedir conversões com perda silenciosa de dados. Valores fixos conhecidos em tempo de compilação usam constexpr, deixando clara a intenção de imutabilidade. Na aritmética, dividir dois valores int descarta a parte fracionária; quando precisamos da razão real, convertemos explicitamente com static_cast<double>. Também é fundamental respeitar os limites de representação de cada tipo inteiro para evitar estouro.',[
      q('Qual declaração segue as C++ Core Guidelines para definir uma constante calculada em tempo de compilação?',
        'constexpr int tensao_maxima_mv{4200};',
        ['int tensao_maxima_mv;','#define TENSAO_MAXIMA_MV "4200"'],
        'constexpr cria uma constante fortemente tipada verificada em compilação (Con.5), evitando macros sem tipo e objetos não inicializados.'),
      t('Digite o valor inteiro armazenado em modulos_completos.',
        '4',
        'A divisão entre dois int (19 / 4) descarta a fração: cabem 4 módulos completos de 4 células em 19 células.',
        'const int celulas{19};\nconst int por_modulo{4};\nconst int modulos_completos{celulas / por_modulo};'),
      t('Qual é o valor inteiro de celulas_avulsas obtido pelo operador de resto na mesma bateria?',
        '3',
        'Como 4 * 4 = 16, restam 3 células avulsas: 19 % 4 resulta em 3.',
        'const int celulas_avulsas{19 % 4};'),
      g('Complete a conversão explícita recomendada em C++ para obter divisão em ponto flutuante sem cast no estilo C.',
        'static_cast',
        'static_cast<double>(carga_atual) realiza conversão verificada pelo compilador (regra ES.48) antes da divisão.',
        'const int carga_atual{3};\nconst int capacidade{4};\nconst double proporcao{____<double>(carga_atual) / capacidade};'),
      p('Relacione cada construção de tipos e operadores em C++ à sua característica.',[
        ['int x{3.7};','Erro de compilação por conversão estreitadora (narrowing)'],
        ['bool alerta{tensao < 3000};','Armazena resultado lógico true ou false'],
        ['2 + 5 * 3','Resulta em 17 pela precedência da multiplicação sobre a soma'],
        ['std::int64_t','Inteiro com sinal de largura fixa de 64 bits de <cstdint>']
      ],'Inicialização com chaves, booleanos, precedência aritmética e inteiros de largura fixa evitam ambiguidades numéricas.'),
      q('Por que int leitura{4.9}; falha ao compilar enquanto int leitura = 4.9; compilaria truncando o valor?',
        'A inicialização com chaves {} proíbe conversões estreitadoras que descartam precisão',
        ['Chaves {} só funcionam para std::string e nunca para tipos numéricos','O tipo int em C++ aceita apenas números negativos entre chaves'],
        'A sintaxe uniforme {} (regras ES.23 e ES.46) protege contra perda silenciosa da parte fracionária.'),
      o('Ordene a avaliação de (tensao >= 3200) && (corrente * 2 < 20) para tensao = 3500 e corrente = 8.',[
        'Avaliar o operando esquerdo tensao >= 3200 obtendo true',
        'Calcular a multiplicação corrente * 2 no operando direito obtendo 16',
        'Avaliar a comparação 16 < 20 obtendo true',
        'Combinar os dois booleanos com && produzindo true'
      ],'O operador && avalia primeiro a esquerda e, sendo verdadeira, avalia a direita respeitando a precedência de * sobre <.'),
      q('Um contador unsigned int está em 0 e sofre subtração de 1. Qual efeito ocorre em C++?',
        'O valor dá a volta (wrap-around) para o maior inteiro sem sinal representável',
        ['O tipo muda automaticamente para double valendo -1.0','A variável passa a armazenar nullptr'],
        'Tipos unsigned operam em aritmética modular 2^N; subtrair abaixo de zero produz um número positivo enorme (ES.100).')
    ]);

  chapter('Condições, laços e rastreamento',
    ['If e else','Switch','For','While','Do while','Break e continue','Acumulação','Invariantes'],
    'Monitoramento de pulsos cardíacos',
    'Estruturas de decisão e repetição permitem inspecionar séries de medições mantendo invariantes claros a cada passo. Em um monitor esportivo, enum class combinado com switch classifica zonas de esforço sem espalhar números mágicos pelo código. Durante um laço for, continue descarta leituras zeradas de ruído avançando para o próximo elemento, enquanto break interrompe a varredura ao detectar código negativo de desconexão. Rastrear contadores e acumuladores linha a linha garante médias confiáveis.',[
      t('Rastreie o laço de leituras cardíacas e digite o valor final de soma_bpm.',
        '250',
        'Soma-se 120, ignora-se 0 com continue, soma-se 130 (total 250) e para-se em -1 com break antes de alcançar 140.',
        'const int leituras[]{120, 0, 130, -1, 140};\nint soma_bpm{0};\nfor (int bpm : leituras) {\n    if (bpm == 0) continue;\n    if (bpm < 0) break;\n    soma_bpm += bpm;\n}'),
      g('Complete a instrução que impede a queda acidental (fallthrough) entre os ramos do switch de zonas.',
        'break',
        'Em C++, cada ramo case que não retorna precisa de break para não continuar executando o próximo case.',
        'switch (zona) {\n    case Zona::leve:\n        fator = 1;\n        ____;\n    case Zona::intensa:\n        fator = 2;\n        break;\n}'),
      q('Por que usar enum class Zona { repouso, leve, intensa }; em vez de constantes int soltas no switch?',
        'Porque enum class cria escopo próprio e impede conversões implícitas acidentais para int',
        ['Porque enum class executa laços while automaticamente','Porque C++ proíbe o uso do tipo int dentro de funções'],
        'Enumerações com escopo (regra Enum.3) aumentam a segurança de tipos e evitam poluição de nomes.'),
      p('Relacione cada construção de controle de fluxo em C++ ao seu comportamento exato.',[
        ['for','Concentra inicialização, condição de continuidade e passo no cabeçalho'],
        ['while','Testa a condição antes da primeira execução do corpo'],
        ['do ... while','Executa o bloco ao menos uma vez antes de verificar a condição'],
        ['continue','Salta o restante da iteração atual sem encerrar o laço']
      ],'Escolher a construção adequada deixa explícita a condição de entrada, repetição e salto.'),
      t('Quantas vezes o corpo deste laço for clássico é executado? Digite o número inteiro.',
        '4',
        'A variável i assume os valores 0, 2, 4 e 6 (4 execuções); quando sobe para 8, a condição i < 8 falha.',
        'int amostras{0};\nfor (int i{0}; i < 8; i += 2) {\n    ++amostras;\n}'),
      o('Organize a iteração mantendo o invariante "soma_bpm guarda a soma das leituras válidas processadas até aqui".',[
        'Inicializar soma_bpm e validas com zero antes de iniciar o laço',
        'Obter a próxima medição de batimentos da sequência',
        'Descartar ruído zerado ou interromper caso o sensor indique desconexão',
        'Acumular a medição aprovada em soma_bpm e incrementar validas'
      ],'O invariante permanece verdadeiro antes e depois de cada passo porque apenas leituras aprovadas atualizam os acumuladores.'),
      q('Ao final da varredura, validas vale 0 porque o sensor estava desconectado. Que verificação protege o cálculo da média inteira?',
        'Testar validas > 0 antes de calcular soma_bpm / validas',
        ['Dividir soma_bpm por 0, pois int devolve zero com segurança em C++','Multiplicar soma_bpm por validas para obter a média aritmética'],
        'Divisão inteira por zero é comportamento indefinido em C++ e precisa ser bloqueada antes da operação.'),
      q('Em for (int i{1}; i <= 3; ++i), executar continue quando i == 2 impede a atualização ++i?',
        'Não; a expressão ++i do cabeçalho ainda executa antes do próximo teste',
        ['Sim; i fica preso em 2 gerando repetição infinita','Sim; o laço reinicia voltando i para 1'],
        'No laço for, continue desvia para a etapa de atualização do cabeçalho, avançando i normalmente para 3.')
    ]);

  chapter('Funções, referências e recursão',
    ['Declarações','Parâmetros','Retornos','Referências','Const reference','Sobrecarga','Caso-base','Recursão'],
    'Roteamento de pacotes postais',
    'Funções bem projetadas em C++ expressam pelo tipo dos parâmetros se apenas leem ou se modificam dados. Tipos pequenos como int são passados por valor, enquanto objetos maiores como std::string devem ser recebidos por referência constante (const std::string&) para evitar cópias sem permitir alterações. A sobrecarga permite reutilizar o mesmo nome de função com listas de parâmetros distintas. Já na recursão, toda chamada precisa convergir para um caso-base explícito que encerre o empilhamento.',[
      q('Uma função apenas consulta um CEP armazenado em std::string sem alterá-lo. Qual assinatura segue a regra F.16 das C++ Core Guidelines?',
        'bool cep_valido(const std::string& cep);',
        ['bool cep_valido(std::string* cep_global);','bool cep_valido(std::string& cep);'],
        'Receber por const std::string& evita copiar caracteres, aceita temporários e garante imutabilidade do argumento.'),
      g('Complete o tipo do parâmetro com referência para que selar_lote incremente diretamente a variável do chamador.',
        'int&',
        'Uma referência não constante (int&) vincula o parâmetro diretamente ao objeto inteiro fornecido na chamada.',
        'void selar_lote(____ total_lacres) {\n    total_lacres += 5;\n}'),
      t('Digite o valor inteiro de lacres após a chamada de selar_lote.',
        '15',
        'Como total_lacres é int&, somar 5 altera diretamente a variável lacres inicializada com 10 (10 + 5 = 15).',
        'void selar_lote(int& total_lacres) { total_lacres += 5; }\n\nint lacres{10};\nselar_lote(lacres);'),
      t('Qual valor inteiro somar_caixas(4) retorna na função recursiva abaixo?',
        '10',
        'As chamadas empilham 4 + 3 + 2 + 1 + 0 = 10, encerrando no caso-base quando n chega a 0.',
        'int somar_caixas(int n) {\n    if (n <= 0) return 0;\n    return n + somar_caixas(n - 1);\n}'),
      p('Associe cada forma de parâmetro ou recurso de função em C++ ao seu efeito.',[
        ['int peso','Recebe uma cópia independente de um tipo pequeno e barato'],
        ['const std::string& destino','Observa o texto original sem copiá-lo e sem modificá-lo'],
        ['int& contador','Permite alterar a variável inteira passada pelo chamador'],
        ['Sobrecarga de funções','Reutiliza o mesmo nome com tipos ou quantidades de parâmetros distintos']
      ],'A assinatura comunica custo de passagem, permissão de escrita e diferenciação estática de chamadas.'),
      o('Ordene o rastreamento completo da chamada recursiva potencia_dois(2), cujo caso-base potencia_dois(0) devolve 1.',[
        'Invocar potencia_dois(2), que aguarda 2 * potencia_dois(1)',
        'Invocar potencia_dois(1), que aguarda 2 * potencia_dois(0)',
        'Atingir o caso-base potencia_dois(0) e retornar 1',
        'Multiplicar 2 * 1 em potencia_dois(1) e retornar 2',
        'Multiplicar 2 * 2 em potencia_dois(2) e retornar 4'
      ],'A pilha de chamadas desce até o caso-base e depois desempilha resolvendo cada multiplicação pendente.'),
      q('Por que nunca devemos retornar const std::string& apontando para uma variável local criada dentro da própria função?',
        'Porque a variável local é destruída ao sair da função, gerando referência pendente',
        ['Porque std::string não pode ser declarada dentro de funções C++','Porque o compilador promove toda variável local a global permanente'],
        'Retornar referência ou ponteiro para objeto local automático (regra F.43) produz dangling reference e comportamento indefinido.'),
      q('Duas funções no mesmo escopo têm nome frete e parâmetro único (int km), mudando apenas o retorno de int para double. Isso compila como sobrecarga?',
        'Não; funções sobrecarregadas em C++ precisam diferir na lista de parâmetros',
        ['Sim; o tipo de retorno isolado basta para distinguir qualquer sobrecarga','Sim, desde que ambas usem return na primeira linha'],
        'A resolução de sobrecarga em C++ considera os parâmetros da chamada, não apenas o tipo de retorno.')
    ]);

  chapter('Arrays, strings e estruturas',
    ['Arrays','Std::array','Std::string','Índices e limites','Structs','Agregados','Percursos','Validação de entrada'],
    'Leituras da estação meteorológica',
    'Para sequências de tamanho fixo conhecido em compilação, std::array<T, N> supera arrays herdados de C por conhecer seu próprio tamanho com .size() e não decair silenciosamente para ponteiro. Textos pertencentes ao objeto são modelados com std::string, enquanto um struct sem invariantes privados agrupa campos relacionados como um agregado simples. Como índices começam em zero, validar limites ou usar .at() evita acessos fora da faixa válida.',[
      t('Qual valor inteiro é lido pela expressão umidades[2] neste std::array?',
        '65',
        'A indexação começa em 0: índice 0 vale 68, índice 1 vale 72 e índice 2 vale 65.',
        '#include <array>\n\nconst std::array<int, 4> umidades{68, 72, 65, 80};'),
      g('Complete o método de std::array que acessa o índice verificando limites e lançando std::out_of_range se inválido.',
        'at',
        'O método .at(indice) confere se o índice é menor que size() antes de acessar o elemento.',
        'const std::array<int, 3> ventos{12, 18, 25};\nconst int rajada{ventos.____(1)};'),
      q('Qual vantagem std::array<int, 4> oferece sobre int leituras[4] conforme a regra SL.con.1 das C++ Core Guidelines?',
        'Preserva seu comprimento em .size() e não sofre decaimento implícito para ponteiro',
        ['Cresce dinamicamente com push_back para qualquer quantidade de itens','Passa a numerar os índices a partir de 1 em vez de 0'],
        'std::array combina desempenho idêntico ao array C com semântica de valor e interface compatível com a biblioteca padrão.'),
      t('Digite exatamente o texto armazenado em etiqueta após a concatenação, sem aspas.',
        'SUL-04',
        'O operador + de std::string concatena "SUL" com "-04", produzindo "SUL-04".',
        '#include <string>\n\nconst std::string regiao{"SUL"};\nconst std::string etiqueta{regiao + "-04"};'),
      p('Relacione cada recurso de dados do capítulo à sua responsabilidade na estação meteorológica.',[
        ['std::array<int, 24>','Sequência de tamanho fixo para as 24 medições horárias'],
        ['std::string','Objeto dono da memória de uma sequência mutável ou imutável de caracteres'],
        ['struct AmostraClima','Agregado público que reúne identificador da estação, hora e umidade'],
        ['leituras.size()','Informa a quantidade de elementos contidos no std::array']
      ],'Contêiner fixo, texto próprio, agregado de campos e consulta de tamanho formam um modelo limpo e seguro.'),
      q('Como inicializar um agregado struct Amostra { std::string id; int umidade; }; de modo idiomático em C++ moderno?',
        'const Amostra atual{"EST-1", 74};',
        ['const Amostra atual = new Amostra("EST-1", 74);','const Amostra atual(74 => "EST-1");'],
        'Agregados são inicializados diretamente na pilha com chaves {} seguindo a ordem dos membros declarados.'),
      o('Organize a validação de uma leitura externa antes de registrá-la como AmostraClima.',[
        'Confirmar que o código textual da estação não está vazio',
        'Verificar se o percentual de umidade está entre 0 e 100',
        'Construir o agregado AmostraClima com os valores validados',
        'Gravar o registro aprovado na posição correspondente do dia'
      ],'Validar entradas na fronteira impede que estados impossíveis entrem nas estruturas do programa.'),
      q('Ao percorrer const std::array<std::string, 3> nomes com for (const auto& nome : nomes), por que usar const auto&?',
        'Para inspecionar cada std::string sem copiá-la e impedir modificações acidentais',
        ['Porque o for baseado em intervalo só aceita auto& e rejeita tipos primitivos','Para esvaziar cada string automaticamente ao término da iteração'],
        'const auto& deduz referência constante para cada elemento, evitando alocações ou cópias desnecessárias.')
    ]);

  chapter('Classes, objetos e encapsulamento',
    ['Classes','Construtores','Membros privados','Métodos const','Invariantes','Inicialização','Destrutores','Composição'],
    'Termostato com faixa segura',
    'Segundo as C++ Core Guidelines, usamos class quando existe um invariante que os métodos devem proteger, mantendo os dados privados. Um construtor de argumento único deve ser declarado explicit para impedir conversões implícitas surpreendentes e usar a lista de inicialização de membros. Métodos que apenas consultam o estado, como alvo(), recebem o qualificador const ao final da assinatura. Quando um equipamento contém um termostato, modelamos essa relação direta por composição.',[
      g('Complete o especificador que impede que um int seja convertido implicitamente em Termostato.',
        'explicit',
        'Declarar construtores de um argumento como explicit (regra C.46) evita conversões silenciosas indesejadas.',
        'class Termostato {\npublic:\n    ____ Termostato(int graus) : alvo_{graus} {}\nprivate:\n    int alvo_{20};\n};'),
      q('Por que o método int alvo() const da classe Termostato recebe const após a lista de parâmetros?',
        'Para garantir que não altera o objeto e permitir chamadas sobre instâncias ou referências const',
        ['Para impedir que a classe seja alocada na pilha','Para transformar o membro privado alvo_ em variável global'],
        'Métodos observadores devem ser marcados const por padrão (regra Con.2), documentando e verificando ausência de mutação.'),
      t('O invariante de Termostato exige alvo entre 15 e 40, ignorando ajustes fora dessa faixa. Qual inteiro t.alvo() retorna ao final?',
        '22',
        'O objeto inicia válido em 22; ajustar(50) viola o limite máximo 40 e é ignorado, preservando 22.',
        'class Termostato {\npublic:\n    explicit Termostato(int g) : alvo_{(g >= 15 && g <= 40) ? g : 20} {}\n    void ajustar(int g) { if (g >= 15 && g <= 40) alvo_ = g; }\n    int alvo() const { return alvo_; }\nprivate:\n    int alvo_;\n};\nTermostato t{22};\nt.ajustar(50);'),
      p('Associe cada elemento de uma classe C++ ao seu papel no encapsulamento.',[
        ['private:','Restringe acesso direto aos atributos para proteger o invariante'],
        ['Lista de inicialização (: alvo_{g})','Constrói os membros diretamente antes do corpo do construtor'],
        ['Qualificador const no método','Autoriza a chamada em referências const Termostato&'],
        ['Destrutor (~Classe)','Executa liberação determinística ao encerrar o tempo de vida do objeto']
      ],'Visibilidade privada, inicialização direta, métodos const e destrutor sustentam o ciclo seguro de um objeto.'),
      q('Quando as C++ Core Guidelines (regra C.2) recomendam usar struct em vez de class?',
        'Quando os membros de dados podem variar independentemente, sem invariante acoplando seus valores',
        ['Somente quando o tipo não puder ser passado para funções','Apenas quando todos os métodos forem virtuais puros'],
        'Por convenção idiomática em C++, struct modela agregados abertos e class modela tipos com invariante protegido.'),
      o('Ordene as etapas do método ajustar(novo_grau) para preservar o invariante do Termostato.',[
        'Receber o argumento novo_grau solicitado pelo código cliente',
        'Verificar se novo_grau pertence ao intervalo fechado de 15 a 40',
        'Recusar a alteração caso o valor viole a faixa segura',
        'Atualizar o atributo privado alvo_ somente após aprovação na checagem'
      ],'Nenhuma escrita em membro privado deve ocorrer antes que as pré-condições do invariante sejam satisfeitas.'),
      t('Quando uma classe Incubadora possui um membro privado Termostato termostato_;, como se chama essa técnica de modelagem (uma palavra)?',
        ['Composição','composição','composicao','Composicao'],
        'Modelar um objeto contendo outro como parte interna expressa relação tem-um por composição.'),
      q('O que ocorre ao tentar chamar t.ajustar(25) através de uma referência const Termostato& t?',
        'Erro de compilação, pois ajustar não é qualificado como método const',
        ['A alteração acontece normalmente ignorando o const da referência','O compilador clona o termostato automaticamente em outra thread'],
        'O sistema de tipos impede invocar métodos mutadores sobre referências ou objetos constantes.')
    ]);

  chapter('Herança, polimorfismo e composição',
    ['Herança pública','Métodos virtuais','Override','Interfaces abstratas','Destrutor virtual','Object slicing','Composição','Contratos'],
    'Exportadores de laudo técnico',
    'Uma interface abstrata em C++ define contratos com funções virtuais puras (= 0) e deve declarar um destrutor virtual público (virtual ~ExportadorLaudo() = default;) para garantir destruição segura via classe base. Nas classes derivadas, marcamos métodos sobrescritos com override para que o compilador valide a assinatura exata. Para acionar o despacho polimórfico e evitar object slicing, objetos derivados devem ser manipulados por referência ou ponteiro inteligente para a base, nunca copiados por valor para o tipo base.',[
      g('Complete o especificador na classe derivada para que o compilador confirme a sobrescrita do método virtual da base.',
        'override',
        'override (regra C.128) faz o compilador rejeitar o código caso o método não corresponda exatamente a um virtual da base.',
        'class ExportadorCsv : public ExportadorLaudo {\npublic:\n    std::string formatar(const std::string& t) const ____ {\n        return "titulo;" + t;\n    }\n};'),
      q('Por que toda classe base polimórfica pública precisa declarar virtual ~Base() = default;?',
        'Para que destruir um objeto derivado via ponteiro para a base invoque também o destrutor derivado',
        ['Para proibir que classes derivadas tenham atributos próprios','Porque sem destrutor virtual o qualificador const deixa de funcionar'],
        'Sem destrutor virtual público na base (regra C.35), destruir via Base* (como em unique_ptr<Base>) gera comportamento indefinido.'),
      t('Digite exatamente a string retornada por emitir(csv), sem aspas.',
        'CSV: Ensaio-A',
        'Como emitir recebe const ExportadorLaudo& por referência, o despacho dinâmico executa ExportadorCsv::formatar.',
        'struct ExportadorLaudo {\n    virtual ~ExportadorLaudo() = default;\n    virtual std::string formatar(const std::string& s) const = 0;\n};\nstruct ExportadorCsv : ExportadorLaudo {\n    std::string formatar(const std::string& s) const override { return "CSV: " + s; }\n};\nstd::string emitir(const ExportadorLaudo& exp) { return exp.formatar("Ensaio-A"); }\n// Chamada com ExportadorCsv csv;'),
      q('Em que consiste o problema conhecido como object slicing em C++?',
        'Copiar um objeto derivado por valor para uma variável concreta do tipo Base, perdendo a parte derivada',
        ['Dividir uma std::string ao meio usando substr','Separar declarações em arquivo .h e definições em arquivo .cpp'],
        'A cópia por valor para um tipo Base concreto fatia os dados derivados e anula o comportamento polimórfico.'),
      p('Relacione cada mecanismo de polimorfismo e modelagem em C++ ao seu efeito.',[
        ['virtual ... = 0;','Declara função virtual pura e torna a classe abstrata'],
        ['override','Comprova em compilação a sobrescrita fiel de um método virtual'],
        ['final','Impede novas sobrescritas do método ou novas derivações da classe'],
        ['Passagem por const Base&','Preserva o despacho dinâmico sem copiar nem fatiar o objeto']
      ],'Interfaces abstratas combinam contratos puros, verificação com override e passagem indireta segura.'),
      q('É permitido instanciar diretamente uma variável concreta de uma classe que possui um método virtual puro (= 0)?',
        'Não; classes abstratas representam contratos e só podem ser instanciadas por subclasses concretas',
        ['Sim; métodos = 0 retornam string vazia automaticamente em tempo de execução','Sim, contanto que o construtor seja marcado como explicit'],
        'Enquanto restar ao menos uma função virtual pura não implementada, o tipo é abstrato e não instanciável.'),
      o('Organize a criação de um novo formato PDF em um sistema desacoplado pela interface ExportadorLaudo.',[
        'Preservar o contrato virtual puro e o destrutor virtual em ExportadorLaudo',
        'Definir ExportadorPdf herdando publicamente de ExportadorLaudo',
        'Implementar formatar qualificado com const e override em ExportadorPdf',
        'Entregar uma instância de ExportadorPdf por referência constante à rotina emitir'
      ],'O código cliente que depende apenas de const ExportadorLaudo& aceita a nova implementação sem ser reescrito.'),
      t('Qual especificador (sinal de igual seguido de dígito) ao final da declaração de um método virtual o torna virtual puro em C++?',
        ['= 0','=0'],
        'O sufixo = 0 transforma a função virtual em virtual pura, exigindo implementação nas classes derivadas concretas.')
    ]);

  chapter('Memória, ponteiros e RAII',
    ['Endereços','Ponteiros','Tempo de vida','Ownership','RAII','Unique_ptr','Shared_ptr','Referências pendentes'],
    'Controlador de sensores com RAII',
    'O idioma RAII (Resource Acquisition Is Initialization) vincula a posse de um recurso ao tempo de vida de um objeto com escopo bem definido, liberando memória, arquivos ou conexões automaticamente no destrutor. Em C++ moderno, evitamos new e delete explícitos: std::unique_ptr criado com std::make_unique expressa posse exclusiva sem sobrecusto. Ponteiros brutos (T*) atuam apenas como observadores sem posse e devem usar nullptr para representar ausência de alvo.',[
      g('Complete a função da biblioteca <memory> recomendada para alocar um SensorOptico com posse exclusiva sem escrever new.',
        'make_unique',
        'std::make_unique (regra R.11/R.21) constrói o objeto no heap e o entrega protegido em um std::unique_ptr.',
        '#include <memory>\n\nauto sensor = std::____<SensorOptico>(42);'),
      q('Segundo as regras R.20 e R.21 das C++ Core Guidelines, qual ponteiro inteligente deve ser a escolha padrão para representar posse única?',
        'std::unique_ptr<T>',
        ['std::shared_ptr<T> para qualquer variável local','void* liberado manualmente com free()'],
        'std::unique_ptr modela dono único com custo zero sobre ponteiro bruto; shared_ptr fica restrito a posse realmente compartilhada.'),
      t('Qual literal de C++ moderno representa um ponteiro nulo com segurança de tipos no lugar de NULL ou 0?',
        'nullptr',
        'nullptr (regra ES.47) possui tipo std::nullptr_t e evita ambiguidades com sobrecargas que recebem inteiros.'),
      p('Associe cada tipo ou idioma de memória ao seu papel em C++ moderno.',[
        ['std::unique_ptr<T>','Dono exclusivo que destrói o recurso automaticamente ao sair de escopo'],
        ['std::shared_ptr<T>','Posse compartilhada coordenada por contagem atômica de referências'],
        ['const T* observador','Ponteiro bruto não dono usado apenas para inspecionar um alvo opcional'],
        ['RAII','Aquisição do recurso na inicialização e liberação garantida no destrutor']
      ],'Distinguir claramente quem é dono de quem apenas observa elimina vazamentos e liberações duplas.'),
      t('Digite o valor inteiro exibido para ganho após a escrita através do ponteiro observador.',
        '95',
        'ptr recebe o endereço de ganho (&ganho); a desreferência *ptr = 95 altera o próprio inteiro ganho.',
        'int ganho{80};\nint* ptr{&ganho};\n*ptr = 95;\nstd::cout << ganho;'),
      q('O que acontece ao tentar copiar um std::unique_ptr<SensorOptico> com auto copia = sensor;?',
        'Erro de compilação, porque std::unique_ptr desabilita cópia para garantir exclusividade de posse',
        ['Os dois unique_ptr passam a dividir o mesmo objeto e ambos chamam delete sem erro','Uma cópia profunda automática de SensorOptico é alocada no heap'],
        'Para manter um único dono responsável pela destruição, unique_ptr permite transferência com std::move, mas proíbe cópia.'),
      o('Ordene o ciclo de vida RAII de um sensor alocado com std::make_unique dentro de uma função.',[
        'Adquirir o objeto SensorOptico em um std::unique_ptr local com std::make_unique',
        'Operar o sensor ou passar sensor.get() a funções observadoras que não assumem posse',
        'Alcançar o final do escopo da função por retorno normal ou exceção',
        'Executar automaticamente o destrutor de std::unique_ptr liberando o SensorOptico'
      ],'A limpeza determinística ocorre na saída do bloco independentemente do caminho de retorno.'),
      q('Um ponteiro guarda o endereço de uma variável local de uma função que já retornou. Como se denomina esse defeito?',
        'Ponteiro pendente (dangling pointer), cuja desreferência causa comportamento indefinido',
        ['Otimização automática de pilha garantida pelo compilador C++','Promoção implícita da variável local para memória estática'],
        'Encerrado o tempo de vida do objeto na pilha, qualquer ponteiro ou referência para ele torna-se inválido.')
    ]);

  chapter('Biblioteca padrão e algoritmos',
    ['Vector','Map','Set','Iteradores','Sort','Find','Transform','Ranges'],
    'Ranking de tempos de pista',
    'A biblioteca padrão do C++ separa contêineres de algoritmos conectados por iteradores e, a partir do C++20, por std::ranges. Por padrão, std::vector é o contêiner sequencial preferido graças à memória contígua amigável ao cache, enquanto std::set mantém chaves únicas ordenadas e std::map associa chaves a valores. Algoritmos como std::ranges::sort, std::find_if e std::transform substituem laços manuais propensos a erros por operações expressivas e testadas.',[
      t('Após executar std::ranges::sort(voltas), qual número inteiro fica na posição voltas[0]?',
        '78',
        'A ordenação padrão é crescente (78, 81, 85, 92), posicionando a menor volta 78 no índice 0.',
        '#include <algorithm>\n#include <vector>\n\nstd::vector<int> voltas{85, 78, 92, 81};\nstd::ranges::sort(voltas);'),
      t('Quantos elementos o conjunto pilotos contém após a construção abaixo? Digite o inteiro.',
        '3',
        'std::set armazena chaves únicas ordenadas; a duplicata de "Lia" é ignorada, restando 3 nomes.',
        '#include <set>\n#include <string>\n\nconst std::set<std::string> pilotos{"Lia", "Rui", "Lia", "Ana"};'),
      g('Complete o método de std::vector que acrescenta um novo tempo de volta ao final da sequência.',
        'push_back',
        'push_back insere o elemento ao final do vetor dinâmico, expandindo a capacidade se necessário.',
        'std::vector<int> tempos{80, 79};\ntempos.____(77);'),
      p('Relacione cada contêiner ou algoritmo da STL à tarefa correspondente na cronometragem.',[
        ['std::vector<int>','Sequência dinâmica contígua padrão para registrar voltas'],
        ['std::map<std::string, int>','Associação ordenada de cada piloto ao seu melhor tempo'],
        ['std::ranges::find_if','Localiza o primeiro elemento que satisfaz um predicado booleano'],
        ['std::ranges::transform','Produz uma sequência aplicando uma função a cada elemento de entrada']
      ],'Combinar o contêiner certo com algoritmos expressivos reduz código manual e erros de índice.'),
      q('Quando std::ranges::find(voltas, 75) não encontra o valor 75 no vetor voltas, qual resultado é retornado?',
        'O iterador de fim voltas.end()',
        ['O inteiro -1 convertido em referência','Uma cópia do último elemento voltas.back()'],
        'Em algoritmos baseados em iteradores, retornar end() sinaliza que nenhum elemento satisfez a busca.'),
      q('Por que as C++ Core Guidelines (SL.con.2 e Per.19) indicam std::vector como contêiner padrão?',
        'Porque mantém elementos contíguos na memória, maximizando a eficiência do cache da CPU',
        ['Porque ordena automaticamente os elementos a cada chamada de push_back','Porque nunca realoca memória mesmo crescendo de zero a milhões de itens sem reserve'],
        'O layout contíguo permite pré-busca previsível pela CPU, superando estruturas encadeadas na maioria dos cenários.'),
      o('Ordene a busca segura da primeira volta abaixo de 80 segundos usando std::ranges::find_if.',[
        'Chamar std::ranges::find_if passando o vetor voltas e a lambda [](int t) { return t < 80; }',
        'Armazenar o iterador devolvido em uma variável local auto it',
        'Verificar a condição it != voltas.end() para saber se houve resultado',
        'Desreferenciar *it somente dentro do ramo em que o iterador é válido'
      ],'Desreferenciar end() é comportamento indefinido; a checagem it != voltas.end() é indispensável.'),
      q('Em um std::map<std::string, int> melhores, qual é a vantagem de melhores.contains("Lia") (C++20) sobre melhores["Lia"] em uma consulta?',
        'contains apenas verifica a existência da chave sem inserir uma entrada zerada caso ela falte',
        ['contains apaga automaticamente todas as outras chaves do mapa','melhores["Lia"] não compila quando a chave é std::string'],
        'O operador [] em std::map cria a chave com valor padrão se ela não existir, enquanto contains preserva o mapa intacto.')
    ]);

  chapter('Templates e programação genérica',
    ['Templates de função','Dedução','Templates de classe','Especialização','Constraints','Concepts','Mensagens de erro','Algoritmos genéricos'],
    'Limitador genérico com Concepts',
    'Templates permitem escrever funções e estruturas genéricas uma única vez sem abrir mão da checagem estática e do desempenho em tempo de compilação. No C++20, restringimos argumentos de template com concepts, como std::integral ou std::totally_ordered, documentando exatamente o que o tipo T precisa suportar. Além de expressar intenção conforme a regra T.10 das C++ Core Guidelines, concepts produzem diagnósticos de compilação diretos na fronteira da chamada.',[
      t('Qual valor inteiro limitar(120, 0, 100) devolve? Digite o número.',
        '100',
        'Como 120 > 100, o segundo condicional retorna o teto maximo, igual a 100.',
        '#include <concepts>\n\ntemplate <std::totally_ordered T>\nconstexpr T limitar(T valor, T minimo, T maximo) {\n    if (valor < minimo) return minimo;\n    if (valor > maximo) return maximo;\n    return valor;\n}'),
      g('Complete a palavra-chave do C++20 usada para declarar a restrição nomeada Somavel.',
        'concept',
        'concept define um conjunto nomeado de requisitos verificados em tempo de compilação sobre tipos.',
        'template <typename T>\n____ Somavel = requires(T a, T b) {\n    { a + b } -> std::convertible_to<T>;\n};'),
      q('Na chamada limitar(3.5, 1.0, 5.0), para qual tipo concreto o parâmetro T é deduzido pelo compilador?',
        'double',
        ['int, truncando os três argumentos','float, mesmo sem o sufixo f'],
        'Literais de ponto flutuante sem sufixo têm tipo double em C++, levando à dedução consistente T = double.'),
      q('Por que a chamada limitar(10, 0, 5.5) falha na dedução automática quando a assinatura usa um único parâmetro T para os três valores?',
        'Porque os argumentos sugerem int e double ao mesmo tempo para o mesmo parâmetro T',
        ['Porque templates em C++ aceitam no máximo dois argumentos por função','Porque o concept std::totally_ordered rejeita o tipo double'],
        'A dedução de tipo para um único parâmetro T exige concordância; misturar int e double torna a dedução ambígua.'),
      p('Associe cada construção de programação genérica em C++20 à sua função.',[
        ['template <typename T>','Declara um parâmetro de tipo genérico para classe ou função'],
        ['std::integral','Concept padrão satisfeito apenas por tipos inteiros'],
        ['Expressão requires','Especifica operações válidas e tipos de retorno exigidos de T'],
        ['using Medida = Faixa<double>;','Define um alias de tipo moderno preferido a typedef']
      ],'Templates, concepts padrão, expressões requires e aliases using compõem código genérico legível (regras T.10, T.11 e T.43).'),
      q('Qual melhoria prática os concepts oferecem nas mensagens de erro de templates?',
        'Reportam imediatamente na chamada qual contrato o tipo argumento deixou de cumprir',
        ['Adiam todos os erros de tipos incompatíveis para a execução em produção','Desativam a verificação estática de tipos do compilador'],
        'A checagem ocorre na interface do template antes de instanciar detalhes internos profundos.'),
      o('Ordene o processamento em tempo de compilação de uma chamada a limitar(8, 0, 10).',[
        'Deduzir T = int a partir dos três argumentos inteiros da chamada',
        'Confirmar que int satisfaz o concept std::totally_ordered',
        'Instanciar a definição especializada limitar<int>',
        'Gerar o código nativo otimizado para a chamada aprovada'
      ],'Dedução, verificação de constraints e instanciação ocorrem inteiramente em tempo de compilação.'),
      t('Na instância Par<std::string, int> sensor{"A1", 50};, quantos argumentos de tipo foram fornecidos ao template Par? Digite o inteiro.',
        '2',
        'Os tipos entre colchetes angulares são std::string e int, totalizando 2 argumentos de tipo.')
    ]);

  chapter('Semântica de movimento e recursos',
    ['Lvalues e rvalues','Cópia','Move constructor','Move assignment','Std::move','Regra de zero','Regra de cinco','Validade após movimento'],
    'Transferência de buffers de imagem',
    'A semântica de movimento transfere recursos internos de objetos temporários ou prestes a serem descartados sem duplicar blocos inteiros de memória. A chamada std::move(quadro) não move bytes por conta própria: ela apenas converte um lvalue em referência rvalue para habilitar o construtor ou a atribuição de movimento. Pela Regra de Zero (C.20), classes que compõem apenas tipos RAII como std::vector e std::string ganham cópia, movimento e destruição corretos gratuitamente.',[
      q('O que std::move(origem) executa exatamente por conta própria em C++?',
        'Converte origem em uma referência rvalue em compilação para habilitar operações de movimento',
        ['Transfere os bytes pela rede e destrói imediatamente o escopo da função','Cria uma cópia profunda congelada em memória somente leitura'],
        'std::move é um cast estático para rvalue reference; a transferência real é feita pelo construtor ou operador de movimento chamado.'),
      t('Após construir destino movendo origem abaixo, qual inteiro destino.size() retorna?',
        '3',
        'O move constructor de std::vector assume o ponteiro interno dos 3 elementos de origem em tempo constante.',
        '#include <utility>\n#include <vector>\n\nstd::vector<int> origem{10, 20, 30};\nstd::vector<int> destino{std::move(origem)};'),
      g('Complete o especificador que garante que o construtor de movimento não lança exceções.',
        'noexcept',
        'Marcar operações de movimento como noexcept (regra F.6/C.66) permite que std::vector mova elementos com segurança ao realocar.',
        'Quadro(Quadro&& outro) ____ = default;'),
      p('Relacione cada conceito de categorias de valor e ciclo de recursos à sua definição em C++.',[
        ['Lvalue','Expressão com identidade estável à qual podemos nos referir repetidamente'],
        ['Rvalue','Temporário ou objeto convertido para ceder seus recursos internos'],
        ['Regra de Zero','Não escrever destrutor, cópia nem movimento quando membros RAII já fazem tudo'],
        ['Regra de Cinco','Definir ou controlar destrutor, cópia e movimento juntos ao gerir handle bruto']
      ],'Separar tipos de negócio (Regra de Zero) de wrappers de recurso de baixo nível (Regra de Cinco) simplifica o código.'),
      q('Em qual estado fica um std::string buffer após std::string salvo{std::move(buffer)}; segundo o padrão da biblioteca C++?',
        'Em estado válido, porém não especificado, podendo ser destruído ou receber novo valor',
        ['Com garantia obrigatória de manter exatamente os mesmos caracteres anteriores','Em estado inválido que causa falha fatal quando seu destrutor é chamado'],
        'Objetos movidos continuam válidos para destruição ou reatribuição, mas seu conteúdo residual não deve ser lido como se estivesse intacto.'),
      q('Uma struct Fotograma possui apenas std::string camera; e std::vector<int> pixels;. Quantos membros especiais manuais (destrutor, cópia, move) ela deve escrever?',
        'Zero; o compilador sintetiza destruição, cópia e movimento ideais automaticamente',
        ['Cinco obrigatoriamente, mesmo sem nenhum ponteiro bruto','Apenas um destrutor vazio ~Fotograma() {}, para acelerar o movimento'],
        'Declarar um destrutor vazio desnecessário violaria a Regra de Zero e suprimiria a geração automática de operações de movimento.'),
      o('Ordene o mecanismo da inicialização Quadro destino{std::move(origem)}; para um objeto dono de buffer.',[
        'Converter o lvalue origem em referência rvalue por meio de std::move',
        'Resolver a sobrecarga escolhendo o construtor Quadro(Quadro&&)',
        'Transferir os ponteiros/handles internos de origem para destino',
        'Zerar o handle interno de origem para que seu destrutor posterior seja inofensivo'
      ],'Ao assumir o recurso e neutralizar a origem, evita-se cópia cara e impede-se dupla liberação.'),
      t('Quais dois caracteres declaram uma referência rvalue na assinatura Quadro(Quadro__ outro)? Digite apenas os símbolos.',
        '&&',
        'O declarador && após o tipo identifica um parâmetro de referência rvalue.')
    ]);

  chapter('Exceções, arquivos e tratamento de erros',
    ['Throw','Try e catch','Garantias de exceção','Streams','Leitura de arquivos','Escrita','Validação','RAII e erros'],
    'Importação segura de calibração',
    'Quando uma função não consegue cumprir seu contrato, como abrir um arquivo de calibração ausente ou interpretar um ganho negativo, lançar uma exceção interrompe o caminho inválido com clareza. As C++ Core Guidelines determinam lançar objetos de exceção por valor e capturá-los por referência constante (catch (const std::exception& e)) para evitar cópias e fatiamento. Graças ao RAII, fluxos como std::ifstream e std::ofstream fecham seus arquivos automaticamente mesmo durante o desempilhamento de uma exceção.',[
      g('Complete a instrução que interrompe a calibração lançando std::invalid_argument por valor.',
        'throw',
        'throw cria e propaga o objeto de exceção até o tratador catch compatível na pilha de chamadas.',
        'if (ganho <= 0.0) {\n    ____ std::invalid_argument("Ganho deve ser positivo");\n}'),
      q('Qual cláusula catch obedece à regra E.15 das C++ Core Guidelines e evita fatiamento (slicing) da exceção?',
        'catch (const std::runtime_error& erro)',
        ['catch (std::exception erro)','catch (std::runtime_error* erro)'],
        'Capturar por referência constante evita copiar o objeto, preserva polimorfismo em what() e dispensa gerenciamento manual de ponteiro.'),
      q('Por que C++ dispensa bloco finally para fechar um std::ifstream declarado como variável local?',
        'Porque o destrutor de std::ifstream fecha o arquivo automaticamente por RAII ao sair do escopo',
        ['Porque arquivos abertos por std::ifstream nunca consomem recursos do sistema','Porque a palavra catch fecha todos os programas abertos na máquina'],
        'No desempilhamento por exceção (stack unwinding), destrutores de todos os objetos locais construídos são executados com garantia.'),
      p('Associe cada fluxo de arquivo ou garantia de exceção ao seu significado em C++.',[
        ['std::ifstream','Fluxo RAII voltado à leitura de dados de um arquivo'],
        ['std::ofstream','Fluxo RAII voltado à gravação de dados em um arquivo'],
        ['Garantia forte de exceção','Em caso de falha, o estado do programa permanece idêntico ao de antes da operação'],
        ['Garantia básica de exceção','Em caso de falha, invariantes são mantidos e nenhum recurso é vazado']
      ],'Combinar fluxos RAII com garantias claras de exceção mantém o sistema consistente diante de arquivos corrompidos.'),
      t('Qual método de const std::exception& e devolve a mensagem textual descritiva da falha? Digite apenas o nome do método.',
        ['what','what()'],
        'O método virtual what() retorna um const char* descrevendo a razão da exceção capturada.'),
      o('Ordene uma rotina de carregamento de calibração que oferece garantia forte ao vetor ativo em memória.',[
        'Abrir o arquivo com std::ifstream e confirmar que o fluxo está aberto',
        'Ler e validar todos os coeficientes em um std::vector temporário local',
        'Lançar exceção sem alterar o vetor oficial caso alguma linha seja inválida',
        'Substituir o vetor oficial com std::move do temporário somente após validar todo o arquivo'
      ],'Construir o novo estado à parte e só trocar ao final com operação noexcept assegura semântica tudo-ou-nada.'),
      q('Em um laço de leitura while (arquivo >> medida), quando a condição do while avalia como falsa?',
        'Ao tentar ler além do fim do arquivo (EOF) ou encontrar texto incompatível com o tipo de medida',
        ['Toda vez que o número válido lido no arquivo for exatamente 0','Logo após ler o primeiro caractere de espaço em branco entre dois números'],
        'O operador >> retorna o próprio stream, que converte para false quando failbit ou badbit é sinalizado.'),
      t('Dentro de um bloco catch que apenas registra o erro em log, qual instrução de 6 caracteres (com ;) relança a exceção original sem fatiá-la?',
        'throw;',
        'A instrução throw; sem expressão reativa e propaga exatamente o objeto de exceção em curso.')
    ]);

  chapter('Estruturas de dados e complexidade',
    ['Big O','Vetores dinâmicos','Listas','Pilhas','Filas','Árvores','Hash tables','Escolha de estrutura'],
    'Despacho de chamados e complexidade',
    'Escolher a estrutura de dados certa depende de como o custo cresce quando o volume de entradas N aumenta, expresso pela notação Big-O. Um std::unordered_map usa tabela de dispersão (hash table) para localizar chaves em tempo médio O(1), enquanto std::map mantém ordenação em árvore balanceada com custo O(log n). Para processar chamados na ordem de chegada usamos fila (std::queue, FIFO), e para desfazer a última operação usamos pilha (std::stack, LIFO).',[
      t('Na pilha LIFO de histórico abaixo, qual número inteiro fica guardado em topo?',
        '20',
        'Foram empilhados 10, 20 e 30; pop() retira o último que entrou (30), restando 20 no topo.',
        '#include <stack>\n\nstd::stack<int> historico;\nhistorico.push(10);\nhistorico.push(20);\nhistorico.push(30);\nhistorico.pop();\nconst int topo{historico.top()};'),
      t('Na fila FIFO de atendimento abaixo, qual número inteiro proximo recebe?',
        '101',
        'Em std::queue (First-In, First-Out), front() consulta o elemento mais antigo da fila, que é 101.',
        '#include <queue>\n\nstd::queue<int> chamados;\nchamados.push(101);\nchamados.push(102);\nconst int proximo{chamados.front()};'),
      g('Complete o método de std::vector que pré-aloca capacidade para 1000 protocolos evitando realocações repetidas.',
        'reserve',
        'reserve(1000) reserva espaço contíguo para 1000 itens mantendo size() em zero até as inserções reais.',
        'std::vector<int> protocolos;\nprotocolos.____(1000);'),
      p('Associe cada operação da biblioteca padrão C++ à sua complexidade assintótica típica.',[
        ['Acesso indexado v[i] em std::vector','Tempo constante O(1)'],
        ['Busca por chave em std::map com N elementos','Tempo logarítmico O(log N) em árvore balanceada'],
        ['Busca média por chave em std::unordered_map','Tempo constante médio O(1) via tabela hash'],
        ['Ordenação de N elementos com std::sort','Tempo linearítmico O(N log N)']
      ],'Conhecer as garantias de complexidade da STL guia a escolha objetiva de cada contêiner.'),
      q('Um algoritmo aninha dois laços comparando cada um dos N chamados com todos os N chamados. Qual é sua complexidade de tempo?',
        'O(N²)',
        ['O(1)','O(log N)'],
        'Para cada um dos N itens externos, o laço interno executa N passos, crescendo proporcionalmente a N * N.'),
      q('Por que percorrer um std::vector do início ao fim costuma ser muito mais rápido que percorrer um std::list de mesmo tamanho O(N)?',
        'Porque std::list aloca nós separados em endereços dispersos, causando falhas frequentes de cache ao seguir ponteiros',
        ['Porque std::list tem complexidade O(2^N) para avançar um único iterador','Porque std::vector compacta todos os inteiros em um único bit'],
        'Mesma ordem assintótica O(N) pode ter constantes muito diferentes; memória contígua favorece drasticamente o hardware moderno.'),
      o('Ordene as classes de complexidade Big-O da menor taxa de crescimento para a maior quando N cresce.',[
        'O(1) — constante',
        'O(log N) — logarítmica',
        'O(N) — linear',
        'O(N log N) — linearítmica',
        'O(N²) — quadrática'
      ],'Para volumes grandes de dados, O(1) < O(log N) < O(N) < O(N log N) < O(N²).'),
      q('Qual é a complexidade de tempo de push_back ao final de um std::vector graças ao crescimento geométrico de sua capacidade?',
        'O(1) amortizado',
        ['O(N²) em cada inserção individual','O(N log N) por elemento inserido'],
        'As realocações tornam-se exponencialmente mais raras conforme o vetor cresce, diluindo o custo de cópia/movimento para O(1) amortizado.')
    ]);

  chapter('Testes, depuração, CMake e concorrência',
    ['Testes unitários','Casos extremos','Depurador','Sanitizers','CMake','Threads','Mutex','Data races'],
    'Contador concorrente e build confiável',
    'Projetos C++ profissionais automatizam a compilação com CMake, validam casos extremos em testes unitários e ativam sanitizers para capturar acessos inválidos ou corridas de dados durante os testes. Quando múltiplas threads acessam estado mutável compartilhado, ler e escrever sem sincronização causa data race, que é comportamento indefinido em C++. Protegemos a seção crítica com RAII usando uma variável nomeada de std::lock_guard ou std::scoped_lock associada a um std::mutex, sem chamar lock() e unlock() manualmente.',[
      g('Complete o bloqueio RAII do C++17 que adquire dois mutexes simultaneamente sem risco de deadlock.',
        'scoped_lock',
        'std::scoped_lock (regra CP.21) trava múltiplos mutexes usando algoritmo livre de impasse e os destrava no destrutor.',
        'std::____ trava{origem.mtx, destino.mtx};'),
      q('Por que escrever std::lock_guard<std::mutex>{mtx_}; sem dar nome à variável local viola gravemente a regra CP.44?',
        'Porque cria um objeto temporário destruído na mesma linha, liberando o mutex antes do código protegido',
        ['Porque C++ exige que todo mutex tenha nome em letras maiúsculas','Porque bloqueia a thread atual eternamente mesmo após o retorno da função'],
        'Um temporário anônimo vive apenas até o ponto e vírgula da própria expressão, deixando as linhas seguintes desprotegidas.'),
      t('No arquivo CMakeLists.txt abaixo, qual é o nome exato do alvo executável definido?',
        'coletor_metricas',
        'O primeiro argumento de add_executable especifica o nome do alvo binário que o CMake construirá.',
        'cmake_minimum_required(VERSION 3.20)\nproject(Metricas LANGUAGES CXX)\nadd_executable(coletor_metricas src/main.cpp src/agregador.cpp)'),
      p('Relacione cada recurso de verificação ou concorrência em C++ à sua finalidade.',[
        ['AddressSanitizer (-fsanitize=address)','Detecta estouro de memória e uso após liberação durante os testes'],
        ['UndefinedBehaviorSanitizer (-fsanitize=undefined)','Detecta estouro de inteiro com sinal e operações indefinidas'],
        ['std::jthread (C++20)','Thread com semântica RAII que realiza join automaticamente no destrutor'],
        ['Teste unitário de caso extremo','Exercita entradas vazias, limites numéricos e fronteiras de erro']
      ],'Sanitizers, testes automatizados e primitivas RAII como std::jthread elevam a confiabilidade de sistemas concorrentes.'),
      q('Duas threads executam ++total ao mesmo tempo sobre um int comum compartilhado sem mutex nem std::atomic. O que ocorre segundo o padrão C++?',
        'Data race, resultando em comportamento indefinido (undefined behavior)',
        ['O compilador adiciona sincronização automática em torno de qualquer variável int','O resultado final é garantidamente exato em qualquer processador multicore'],
        'Acessos simultâneos sem sincronização em que pelo menos um modifica o dado constituem data race (regra CP.2).'),
      q('Declarar uma variável compartilhada como volatile int contador; resolve data races entre threads em C++?',
        'Não; volatile serve para acesso especial a hardware e não oferece atomicidade nem sincronização entre threads',
        ['Sim; volatile equivale exatamente a std::atomic<int> com std::mutex','Sim, desde que o código seja compilado em modo Release'],
        'A regra CP.8 alerta explicitamente: volatile não tem semântica de sincronização no modelo de memória concorrente de C++.'),
      o('Ordene o fluxo disciplinado para diagnosticar e eliminar uma falha intermitente em código C++.',[
        'Criar um teste unitário reproduzível focando a operação e seus casos extremos',
        'Executar a suíte compilada com sanitizers (ASan, UBSan ou TSan) habilitados',
        'Analisar o relatório e a pilha de chamadas para identificar a causa-raiz exata',
        'Aplicar a correção com RAII/sincronização adequada e revalidar todos os testes'
      ],'Reproduzir em teste automatizado com sanitizers transforma falhas silenciosas em diagnósticos objetivos.'),
      t('Duas threads protegidas pelo mesmo std::mutex somam 50 cada uma a um contador iniciado em 0. Após o join das duas threads, qual inteiro o contador guarda?',
        '100',
        'Com exclusão mútua e sincronização de término via join, as duas somas são serializadas sem perda: 0 + 50 + 50 = 100.')
    ]);

  chapter('Projeto completo: aplicação C++ modular',
    ['Regras do inventário','Modelo de produtos','Operações de estoque','Arquivos','Gerenciamento de recursos','Módulos e build','Testes','Entrega documentada'],
    'Arquitetura modular do sistema de inventário',
    'O projeto final integra modelagem, RAII, contêineres padrão, arquivos e CMake em um sistema modular de inventário. Separar a lógica de domínio em uma biblioteca própria (.h autossuficientes e .cpp) desacoplada da interface de terminal permite testar regras de estoque de forma rápida e isolada. Nos cabeçalhos, usamos guardas de inclusão e jamais escrevemos using namespace std; em escopo global para não poluir quem inclui o arquivo. Cada baixa ou reposição valida invariantes antes de alterar quantidades ou persistir dados.',[
      q('Por que a regra SF.7 das C++ Core Guidelines proíbe colocar using namespace std; no escopo global de inventario.h?',
        'Porque despeja todo o namespace std em cada arquivo que incluir inventario.h, provocando colisões de nomes',
        ['Porque arquivos .h não aceitam o caractere : usado em std::string','Porque using namespace torna privados todos os construtores da classe'],
        'Cabeçalhos devem manter o espaço de nomes limpo e qualificar explicitamente tipos como std::string e std::unordered_map.'),
      g('Complete o comando do CMakeLists.txt que empacota o núcleo do inventário em uma biblioteca reutilizável pelo app e pelos testes.',
        'add_library',
        'add_library cria um alvo de biblioteca que pode ser vinculado com target_link_libraries tanto ao CLI quanto ao binário de testes.',
        '____(inventario_core STATIC src/produto.cpp src/inventario.cpp)\ntarget_include_directories(inventario_core PUBLIC include)'),
      t('Um item começa com 18 unidades, recebe reposição de 7 e sofre baixa válida de 10. Qual saldo inteiro consultar_saldo devolve?',
        '15',
        'O saldo evolui de 18 para 18 + 7 = 25 após a reposição, e para 25 - 10 = 15 após a baixa.',
        'Inventario inv;\ninv.cadastrar("SKU-09", 18);\ninv.repor("SKU-09", 7);\ninv.baixar("SKU-09", 10);\n// inv.consultar_saldo("SKU-09")'),
      q('Um operador chama inv.baixar("SKU-09", 40) quando o saldo disponível é 15. Qual resposta preserva o invariante do domínio?',
        'Rejeitar a operação informando saldo insuficiente e manter a quantidade em 15',
        ['Atualizar o saldo para -25 e gravar normalmente no arquivo de estoque','Apagar todos os outros SKUs cadastrados no inventário'],
        'A regra de negócio de estoque não negativo deve ser validada antes de qualquer mutação no modelo.'),
      p('Relacione cada arquivo da organização modular do projeto de inventário à sua responsabilidade.',[
        ['include/inventario.h','Declara contratos públicos autossuficientes com proteção contra inclusão múltipla'],
        ['src/inventario.cpp','Implementa regras de cadastro, reposição, baixa e consulta de produtos'],
        ['src/persistencia.cpp','Lê e grava o catálogo em disco utilizando fluxos RAII validados'],
        ['tests/inventario_test.cpp','Automatiza verificações de regras de saldo, erros e reimportação']
      ],'Separar interface, domínio, persistência e testes facilita manutenção, compilação incremental e verificação.'),
      o('Ordene a gravação segura do inventário em disco para evitar perda do arquivo anterior caso ocorra falha no meio da escrita.',[
        'Serializar todos os produtos validados para um arquivo temporário usando std::ofstream',
        'Verificar que o fluxo de saída concluiu a escrita sem ativar flags de erro',
        'Fechar o arquivo temporário garantindo o descarte completo dos buffers',
        'Substituir o arquivo oficial renomeando o arquivo temporário concluído'
      ],'Escrever primeiro em arquivo temporário evita truncar o arquivo principal antes de ter os novos dados íntegros.'),
      t('Qual diretiva de duas palavras (incluindo #) no topo de produto.h evita inclusão múltipla do cabeçalho na mesma compilação?',
        '#pragma once',
        '#pragma once (assim como guardas #ifndef/#define/#endif) impede redefinições quando um cabeçalho é incluído indiretamente mais de uma vez.'),
      q('Antes da entrega final do sistema de inventário, qual teste de integração comprova o funcionamento conjunto dos módulos?',
        'Compilar com CMake limpo, cadastrar e movimentar itens, salvar em arquivo, carregar em novo Inventario e conferir os saldos',
        ['Verificar apenas se main.cpp abre sem avisos em um bloco de notas','Testar somente getters isolados sem exercitar baixas nem persistência'],
        'Recarregar os dados persistidos em uma nova instância verifica ponta a ponta modelo, invariantes, serialização e configuração de build.')
    ]);

  window.LINCODE_CONTENT=window.LINCODE_CONTENT||{};
  window.LINCODE_CONTENT.cpp=chapters;
})();
