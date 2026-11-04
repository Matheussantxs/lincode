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

  const lang = 'cpp';
  const chId = 'cpp-c01';
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    5: [
      {
        id: "cpp-c01-u5-l1",
        title: "O fluxo std::cout e operador de inserção",
        subtitle: "Apresentação · fluxo std::cout e operador de inserção",
        theory: "Em C++, a saída padrão no terminal é operada pelo fluxo std::cout, declarado no cabeçalho <iostream>. Ele utiliza o operador de inserção de fluxo (<<) apontando em direção ao fluxo para emitir textos, números e variáveis encadeadas de forma limpa e tipada.",
        questions: [
        q("Qual objeto da biblioteca padrão C++ representa o fluxo de saída padrão no console?", "std::cout", ["std::cin","std::cerr_in"], "std::cout (character output) é o objeto padrão para escrita no terminal.", "std::cout << \"Ola mundo!\";"),
        q("Qual operador de dois caracteres é conhecido como operador de inserção de fluxo em C++?", "<< (menor-menor)", [">> (maior-maior)","-> (seta)"], "O operador << insere dados no fluxo apontando visualmente para o destino à esquerda."),
        q("Qual cabeçalho deve ser incluído no início do arquivo para disponibilizar std::cout?", "#include <iostream>", ["#include <vector>","#include <string>"], "<iostream> declara os fluxos de entrada e saída fundamentais (cin, cout, cerr)."),
        q("Qual recurso do C++ permite encadear múltiplas saídas como std::cout << \"A = \" << a << \"\\n\";?", "O operador << retorna uma referência ao próprio fluxo std::cout", ["O compilador cria variáveis temporárias ocultas","O terminal converte tudo em imagem"], "Retornar a referência do fluxo permite encadear sucessivas operações de inserção em uma só linha."),
        t("Qual objeto do namespace std representa o canal de saída de caracteres no console?", ["std::cout"], "std::cout canaliza a saída padrão de caracteres no ecossistema C++.", "// Fluxo de saida padrao: ____ << \"OK\";"),
        g("Complete a instrução com o operador de inserção de fluxo direcionado para std::cout:", ["<<"], "O operador << encaminha dados para o fluxo de saída.", "std::cout ____ \"Mensagem de teste\\n\";"),
        o("Ordene a emissão encadeada de texto e variável numérica para o console em C++:", ["Declarar a variável inteira contendo o número de itens processados","Iniciar a instrução referenciando o fluxo std::cout","Encadear a string descritiva utilizando o operador de inserção <<","Inserir a variável numérica e finalizar com a quebra de linha"], "O encadeamento elegante com << confere expressividade sem necessidade de formatadores manuais."),
        p("Associe o fluxo da biblioteca padrão C++ ao seu respectivo canal de comunicação:", [["std::cout","Fluxo padrão de saída (stdout) para exibição convencional no console"],["std::cin","Fluxo padrão de entrada (stdin) para leitura do teclado"],["std::cerr","Fluxo padrão de erro sem buffer (stderr) para emissão imediata de alertas"],["std::clog","Fluxo padrão de log com buffer para mensagens de auditoria"]], "A biblioteca <iostream> oferece canais especializados para cada perfil de saída de dados.")
        ]
      },
      {
        id: "cpp-c01-u5-l2",
        title: "Escape characters versus std::endl",
        subtitle: "Prática guiada · escape characters versus std::endl",
        theory: "Para quebrar linhas, podemos usar o caractere de escape \"\\n\" ou o manipulador std::endl. Além de inserir a nova linha, std::endl descarrega forçadamente o buffer do fluxo (flush). Usar \"\\n\" é significativamente mais rápido em laços intensivos.",
        questions: [
        q("Qual ação adicional o manipulador std::endl executa além de quebrar a linha no console?", "Descarrega forçadamente o buffer de saída (flush)", ["Apaga o texto digitado anteriormente","Fecha o fluxo std::cout"], "std::endl insere a quebra de linha e executa cout.flush(), o que tem custo de desempenho."),
        q("Por que é preferível usar '\\n' em vez de std::endl em loops que imprimem milhares de linhas?", "Porque descarregar o buffer a cada linha gera sobrecarga excessiva de chamadas de sistema (I/O)", ["Porque '\\n' só funciona em C++ antigo","Porque std::endl consome toda a memória RAM"], "Evitar flushes desnecessários com '\\n' pode acelerar a emissão de dados em até dez vezes."),
        q("Qual sequência de escape é utilizada para inserir uma tabulação horizontal no texto?", "\\t", ["\\n","\\r"], "A sequência \\t insere um caractere de tabulação alinhando dados em colunas."),
        q("Qual sequência de escape permite imprimir literalmente uma barra invertida (\\) em C++?", "\\\\", ["\\/","/*"], "Barras invertidas necessitam de escape duplo (\\\\) para serem impressas como texto."),
        t("Qual sequência de dois caracteres representa a quebra de linha simples sem forçar flush?", ["\\n"], "\\n adiciona a quebra de linha de maneira eficiente no buffer de saída.", "// Quebra eficiente de linha: std::cout << \"Fim\" << '____';"),
        g("Complete com o manipulador padrão que quebra linha e descarrega o buffer em C++:", ["std::endl"], "std::endl combina quebra de linha com limpeza forçada do buffer.", "std::cout << \"Linha final\" << ____;"),
        o("Ordene a escolha da técnica de quebra de linha de acordo com o requisito de desempenho:", ["Analisar se a saída ocorre em um loop intenso com milhares de iterações","Optar por \"\\n\" para permitir que o buffer de I/O acumule saídas com máxima velocidade","Optar por std::endl ou std::flush apenas quando for obrigatório exibir imediatamente","Garantir que a última linha do programa receba a quebra final adequada"], "A escolha consciente entre \"\\n\" e std::endl é um dos segredos de alta performance em C++."),
        p("Associe o caractere ou manipulador de saída ao seu respectivo comportamento operacional:", [["'\\n'","Insere caractere de nova linha no buffer sem forçar esvaziamento imediato"],["std::endl","Insere caractere de nova linha e força o esvaziamento imediato do buffer (flush)"],["'\\t'","Insere espaçamento de tabulação horizontal para alinhamento em colunas"],["std::flush","Descarrega o buffer de saída imediatamente sem adicionar quebra de linha"]], "Controlar o buffer de I/O é crucial para aplicações de alto throughput em C++.")
        ]
      },
      {
        id: "cpp-c01-u5-l3",
        title: "Formatação numérica com o cabeçalho <iomanip>",
        subtitle: "Aprofundamento · formatação numérica e cabeçalho <iomanip>",
        theory: "O cabeçalho <iomanip> (input/output manipulators) oferece manipuladores paramétricos para formatar a saída. Com std::fixed e std::setprecision(2), controlamos as casas decimais de números de ponto flutuante, garantindo precisão visual em tabelas e relatórios.",
        questions: [
        q("Qual cabeçalho da biblioteca padrão deve ser incluído para usar manipuladores como setprecision?", "#include <iomanip>", ["#include <math>","#include <format_legacy>"], "<iomanip> define manipuladores de fluxo com argumentos como setprecision e setw."),
        q("Qual combinação de manipuladores fixa exatamente duas casas decimais após a vírgula?", "std::fixed << std::setprecision(2)", ["std::setprecision(2) isolado","std::hex << std::oct"], "std::fixed força notação de ponto fixo e setprecision define a quantidade de casas após a vírgula.", "std::cout << std::fixed << std::setprecision(2) << 3.14159; // 3.14"),
        q("O que o manipulador std::setprecision(n) faz por padrão sem o modificador std::fixed?", "Define o número total de dígitos significativos do número, incluindo parte inteira e decimal", ["Multiplica o número por dez","Converte o valor em texto hexadecimal"], "Sem std::fixed, setprecision controla o total de dígitos significativos gerais do número."),
        q("Qual manipulador ativa a exibição de números inteiros em formato hexadecimal?", "std::hex", ["std::oct","std::bin"], "std::hex altera a base numérica do fluxo para hexadecimal (base 16)."),
        t("Qual manipulador do cabeçalho iomanip define o número de casas decimais em ponto fixo?", ["setprecision"], "setprecision controla a quantidade de dígitos ou casas decimais exibidas.", "// std::cout << std::____(2);"),
        g("Complete o código com o manipulador que fixa a notação de ponto fixo para decimais:", ["std::fixed"], "std::fixed assegura que setprecision controle as casas após a vírgula.", "std::cout << ____ << std::setprecision(2) << valor;"),
        o("Ordene as instruções para formatar e exibir uma média ponderada com duas casas decimais:", ["Incluir os cabeçalhos <iostream> e <iomanip> no topo do arquivo","Inserir std::fixed no fluxo std::cout para fixar a notação decimal","Inserir std::setprecision(2) para restringir a precisão em dois dígitos","Enviar a variável de média com << e finalizar com a quebra de linha"], "A formatação com manipuladores mantém o estado do fluxo para todas as saídas seguintes."),
        p("Associe o manipulador de fluxo de <iomanip> ao seu respectivo efeito visual:", [["std::fixed","Formata valores de ponto flutuante em notação decimal fixa"],["std::setprecision(N)","Define a precisão de N casas decimais quando usado com std::fixed"],["std::hex","Altera a representação de inteiros para base hexadecimal"],["std::showpoint","Força a exibição do ponto decimal mesmo para números com decimais zerados"]], "Dominar manipuladores de <iomanip> confere precisão cirúrgica à apresentação de dados numéricos.")
        ]
      },
      {
        id: "cpp-c01-u5-l4",
        title: "Impressão tabular e alinhamento de colunas",
        subtitle: "Aplicação · impressão tabular e alinhamento de colunas",
        theory: "Para organizar relatórios em colunas alinhadas, usamos os manipuladores std::setw (largura do campo), std::left e std::right (alinhamento), e std::setfill (caractere de preenchimento). Diferente de outros manipuladores, std::setw afeta apenas a próxima inserção.",
        questions: [
        q("Qual manipulador define a largura mínima em caracteres para o próximo campo impresso?", "std::setw(n)", ["std::setprecision(n)","std::setfill(c)"], "std::setw (set width) especifica a largura reservada para o próximo valor emitido."),
        q("Qual característica fundamental diferencia std::setw dos outros manipuladores de fluxo?", "std::setw afeta apenas o próximo valor inserido, voltando ao padrão após a impressão", ["std::setw só funciona uma vez em todo o programa","std::setw não aceita números"], "Enquanto fixed e left persistem no fluxo, setw precisa ser invocado antes de cada campo."),
        q("Qual manipulador alinha o texto à esquerda dentro da largura estipulada por setw?", "std::left", ["std::right","std::center"], "std::left posiciona o texto no início do campo e preenche o espaço restante à direita."),
        q("Qual manipulador altera o caractere de preenchimento padrão (espaço) para outro símbolo?", "std::setfill('.')", ["std::pad('.')","std::fillchar('.')"], "std::setfill define o caractere usado para preencher os espaços em branco gerados por setw."),
        t("Qual manipulador define a largura mínima em caracteres para a impressão do próximo item?", ["setw"], "setw (set width) reserva o espaço da coluna para a próxima emissão.", "// Largura de 10 caracteres: std::cout << std::____(10);"),
        g("Complete o comando para alinhar o texto da coluna à esquerda dentro do campo reservado:", ["std::left"], "std::left ajusta o alinhamento da coluna à margem esquerda.", "std::cout << ____ << std::setw(15) << \"Produto\";"),
        o("Ordene a construção de uma linha de tabela com código do item e preço alinhados:", ["Configurar o alinhamento à esquerda com std::left","Definir a largura da primeira coluna com std::setw(20) e imprimir o nome","Configurar o alinhamento à direita com std::right e largura std::setw(10)","Imprimir o valor monetário formatado com precisão e quebrar a linha"], "Ajustar alinhamentos opostos para texto e número cria tabelas visuais impecáveis no terminal."),
        p("Associe o manipulador de formatação tabular à sua respectiva finalidade:", [["std::setw(N)","Define a largura do campo de exibição para N caracteres (apenas próximo item)"],["std::left","Alinha o conteúdo à esquerda preenchendo espaços à direita"],["std::right","Alinha o conteúdo à direita (padrão para números em relatórios)"],["std::setfill(C)","Define o caractere C utilizado para preencher espaços vagos da coluna"]], "O domínio da formatação tabular viabiliza utilitários de console profissionais em C++.")
        ]
      },
      {
        id: "cpp-c01-u5-l5",
        title: "Boas práticas de saída de dados em C++",
        subtitle: "Revisão e desafio · boas práticas de saída de dados em C++",
        theory: "Boas práticas de saída em C++ combinam o uso de std::cout para resultados comuns, std::cerr para erros críticos não bufferizados, preferência por '\\n' para performance e a modernização com a biblioteca <format> ou std::print introduzida a partir do C++20/C++23.",
        questions: [
        q("Qual fluxo padrão deve ser utilizado para emitir mensagens de falha crítica imediatamente no terminal?", "std::cerr", ["std::cout","std::cin"], "std::cerr não possui buffer (unbuffered), garantindo que a mensagem de erro apareça mesmo se o programa travar."),
        q("Qual recurso moderno introduzido no C++20 oferece formatação no estilo Python/Rust com chaves {}?", "std::format (cabeçalho <format>)", ["printf clássico","cout sem tipos"], "std::format combina a segurança de tipos do C++ com a legibilidade de sintaxes de interpolação {}.", "std::string s = std::format(\"Total: {:.2f}\", 42.5);"),
        q("Qual função introduzida no C++23 imprime diretamente no console combinando format e cout?", "std::print / std::println", ["std::write_all","std::fast_cout"], "std::print imprime de forma tipada e altamente otimizada sem overhead de fluxos."),
        q("Por que a diretiva using namespace std; deve ser evitada em arquivos de cabeçalho (.h)?", "Porque polui o escopo global de todos os arquivos que incluírem o cabeçalho, causando colisões de nomes", ["Porque impede que o compilador crie binários","Porque desliga o coletor de lixo"], "Poluir o namespace global em cabeçalhos gera conflitos graves e imprevisíveis de símbolos."),
        t("Qual fluxo padrão não bufferizado é reservado para emissão imediata de erros críticos?", ["std::cerr"], "std::cerr emite mensagens de erro de forma imediata sem reter em buffer.", "// Emissao de erro imediato: ____ << \"Falha grave!\\n\";"),
        g("Complete a instrução com o fluxo não bufferizado ideal para emitir avisos de falha:", ["std::cerr"], "std::cerr canaliza erros críticos com entrega imediata ao terminal.", "____ << \"Erro: Arquivo nao encontrado\\n\";"),
        o("Ordene as boas práticas de engenharia ao construir a saída de uma aplicação C++:", ["Separar a saída normal de dados em std::cout e diagnósticos de erro em std::cerr","Priorizar o uso de '\\n' sobre std::endl para preservar alto rendimento de I/O","Evitar o uso indiscriminado de using namespace std em escopos globais","Validar a apresentação visual e o alinhamento de colunas no terminal"], "Adotar disciplina de I/O desde os primeiros programas previne gargalos severos em produção."),
        p("Associe a tecnologia de saída em C++ à sua respectiva era e perfil de uso:", [["std::cout <<","Padrão histórico e universal de C++ baseado em fluxos tipados"],["std::cerr <<","Fluxo não bufferizado para emissão instantânea de mensagens de falha"],["std::format","Recurso do C++20 que formata strings com alta velocidade e sintaxe {}"],["std::println","Recurso do C++23 que imprime diretamente no console com formatação"]], "A contínua evolução do C++ combina alto controle de hardware com expressividade moderna.")
        ]
      }
    ],
    6: [
      {
        id: "cpp-c01-u6-l1",
        title: "O fluxo std::cin e operador de extração",
        subtitle: "Apresentação · fluxo std::cin e operador de extração",
        theory: "O objeto std::cin lê dados digitados pelo usuário na entrada padrão. Ele utiliza o operador de extração de fluxo (>>), que aponta da fonte de entrada em direção à variável receptora. O operador >> ignora espaços em branco iniciais e quebras de linha antes do dado.",
        questions: [
        q("Qual objeto da biblioteca padrão C++ representa o fluxo padrão de entrada do teclado?", "std::cin", ["std::cout","std::cerr"], "std::cin (character input) consome dados fornecidos pelo usuário no terminal.", "int x;\nstd::cin >> x;"),
        q("Qual operador de dois caracteres é conhecido como operador de extração de fluxo em C++?", ">> (maior-maior)", ["<< (menor-menor)","-> (seta)"], "O operador >> extrai caracteres do fluxo e os direciona para a variável à direita."),
        q("O que o operador >> faz automaticamente ao encontrar espaços em branco ou quebras de linha antes do dado?", "Ignora e descarta os espaços em branco iniciais até encontrar o primeiro caractere válido", ["Lança uma exceção fatal imediata","Apaga o valor da variável receptora"], "O operador >> pula delimitadores de espaço (whitespace) por padrão antes de ler o dado."),
        q("O que acontece se o usuário digitar uma palavra alfabética quando o programa espera int com std::cin >> n;?", "O fluxo entra em estado de falha (fail state) e o valor de n não é preenchido com a entrada", ["O computador reinicia automaticamente","O compilador gera uma nova classe"], "Entrada com tipo incompatível aciona a flag failbit no fluxo, bloqueando leituras seguintes."),
        t("Qual objeto do namespace std representa o canal de entrada padrão do teclado em C++?", ["std::cin"], "std::cin é o fluxo de entrada conectado ao teclado.", "// Ler valor: ____ >> numero;"),
        g("Complete o comando com o operador de extração que direciona a leitura para a variável:", [">>"], "O operador >> extrai do fluxo para a variável receptora.", "std::cin ____ quantidade;"),
        o("Ordene a leitura básica de um valor inteiro digitado pelo usuário em C++:", ["Declarar a variável inteira que irá receber o dado lido","Exibir uma mensagem amigável no console solicitando o valor com std::cout","Invocar o fluxo std::cin com o operador de extração >> apontando para a variável","Processar o valor numérico na lógica subsequente do programa"], "Seguir a sequência com prompt orientador é regra básica de interfaces de console."),
        p("Associe o operador de fluxo ao seu sentido conceitual no código C++:", [["<< (inserção)","Direciona dados da direita para o fluxo de saída à esquerda (ex: cout << x)"],[">> (extração)","Extrai dados do fluxo da esquerda para a variável à direita (ex: cin >> x)"],["cin.fail()","Retorna true se a última operação de leitura falhou por incompatibilidade de tipo"],["cin.good()","Retorna true se o fluxo está operando normalmente sem erros ativos"]], "A sintaxe com setas visuais (<< e >>) torna o sentido dos dados intuitivo em C++.")
        ]
      },
      {
        id: "cpp-c01-u6-l2",
        title: "Leitura de strings completas com std::getline",
        subtitle: "Prática guiada · leitura de linhas completas com std::getline",
        theory: "O operador cin >> palavra para a leitura no primeiro espaço em branco encontrado. Para ler nomes completos com espaços (como \"Ana Silva\"), devemos utilizar a função std::getline(std::cin, stringVariavel), declarada no cabeçalho <string>, que consome até a quebra de linha.",
        questions: [
        q("Por que a instrução std::cin >> nome; não é adequada para ler nomes completos compostos por várias palavras?", "Porque o operador >> interrompe a leitura no primeiro espaço em branco encontrado", ["Porque C++ proíbe strings com mais de cinco letras","Porque o operador >> só aceita números inteiros"], "O operador de extração delimita palavras por whitespace (espaço, tabulação ou quebra de linha)."),
        q("Qual função da biblioteca padrão deve ser utilizada para ler uma linha inteira de texto contendo espaços?", "std::getline(std::cin, texto)", ["std::cin.readAll(texto)","std::scanf_line(texto)"], "std::getline consome todos os caracteres até o próximo \\n, armazenando em uma std::string.", "std::string nomeCompleto;\nstd::getline(std::cin, nomeCompleto);"),
        q("Qual cabeçalho da biblioteca padrão deve ser incluído para usar std::string e std::getline?", "#include <string>", ["#include <cstring>","#include <char_array>"], "<string> declara o tipo std::string e a função global utilitária std::getline."),
        q("Qual caractere delimita por padrão o término da leitura na função std::getline?", "A quebra de linha ('\\n')", ["O caractere de espaço em branco","O ponto final"], "std::getline lê até encontrar '\\n', extraindo o delimitador do fluxo sem inseri-lo na string resultante."),
        t("Qual função da biblioteca padrão lê uma linha inteira de texto preservando espaços?", ["std::getline"], "std::getline lê sequências completas incluindo espaços até o Enter.", "// Ler linha completa: ____(std::cin, linha);"),
        g("Complete a chamada de getline para ler a linha da entrada padrão e salvar em endereco:", ["std::getline(std::cin, endereco)"], "A função getline recebe o fluxo de entrada e a string de destino.", "____;"),
        o("Ordene as etapas para ler o nome completo de um usuário no terminal em C++:", ["Incluir os cabeçalhos <iostream> e <string> no início do arquivo","Declarar a variável de destino do tipo std::string","Exibir a mensagem solicitando o nome com std::cout","Chamar std::getline(std::cin, variavel) para capturar a linha inteira"], "O uso correto de std::getline evita o truncamento acidental de strings com espaços."),
        p("Associe a técnica de leitura de strings ao seu respectivo comportamento:", [["std::cin >> palavra","Lê apenas uma palavra única parando no primeiro espaço em branco"],["std::getline(std::cin, frase)","Lê a linha inteira contendo múltiplos espaços até o Enter"],["cin.get()","Lê exatamente um único caractere do fluxo de entrada"],["<string>","Cabeçalho oficial que define a classe std::string e funções associadas"]], "Dominar a distinção entre >> e getline é vital para manipular texto em C++ sem falhas.")
        ]
      },
      {
        id: "cpp-c01-u6-l3",
        title: "Limpeza de buffer com cin.ignore e falhas de stream",
        subtitle: "Aprofundamento · limpeza do buffer com cin.ignore e falhas de stream",
        theory: "Ao ler um número com cin >> idade antes de std::getline, a tecla Enter permanece pendente no buffer de entrada. Para evitar que o getline seguinte leia essa quebra vazia, usamos cin.ignore() para descartar o caractere residual antes da próxima leitura.",
        questions: [
        q("O que acontece se chamarmos std::cin >> numero e logo em seguida std::getline(std::cin, texto)?", "O getline consome imediatamente a quebra de linha residual do Enter, ficando com string vazia", ["O programa encerra com erro fatal de compilação","O computador emite um aviso sonoro"], "cin >> consome apenas os dígitos, deixando o '\\n' residual no buffer que engole o próximo getline."),
        q("Qual método do fluxo std::cin descarta caracteres pendentes no buffer de entrada?", "std::cin.ignore()", ["std::cin.erase()","std::cin.clean()"], "cin.ignore() extrai e descarta caracteres do buffer de entrada, desimpedindo leituras futuras."),
        q("Qual chamada idiomática descarta todos os caracteres restantes até a próxima quebra de linha no buffer?", "std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');", ["std::cin.ignore_all();","std::cin.clear_everything();"], "numeric_limits com '\\n' esvazia todo o lixo remanescente na linha de entrada de forma definitiva."),
        q("Qual cabeçalho deve ser incluído para usar std::numeric_limits em C++?", "#include <limits>", ["#include <math>","#include <buffer>"], "<limits> fornece traços das capacidades máximas de cada tipo fundamental da linguagem."),
        t("Qual método do fluxo cin é utilizado para ignorar e descartar caracteres residuais no buffer?", ["cin.ignore"], "cin.ignore() remove caracteres pendentes no fluxo de entrada.", "// Descartar caractere residual: std::____();"),
        g("Complete o comando que descarta a quebra de linha residual do buffer após uma leitura numérica:", ["cin.ignore()"], "cin.ignore() descarta o caractere pendente no buffer.", "std::____;"),
        o("Ordene a rotina correta para ler uma idade numérica seguida por um nome completo:", ["Solicitar e ler a idade inteira utilizando o operador std::cin >> idade","Invocar std::cin.ignore() para descartar o caractere de nova linha pendente no buffer","Solicitar o nome completo através de uma mensagem orientadora com std::cout","Ler o nome completo preservando os espaços através de std::getline(std::cin, nome)"], "Ignorar o delimitador residual é o antídoto indispensável contra leituras fantasmas em C++."),
        p("Associe o método de controle do fluxo cin à sua respectiva ação:", [["std::cin.ignore()","Descarta um ou mais caracteres pendentes no buffer de entrada"],["std::cin.clear()","Limpa os sinalizadores de erro (flags) restaurando o estado operacional do fluxo"],["std::cin.fail()","Checa se ocorreu incompatibilidade de tipo na última extração"],["std::streamsize","Tipo integral que representa tamanhos de buffers e fluxos em C++"]], "Gerenciar o estado e o buffer do fluxo cin evita os erros mais comuns de iniciantes em C++.")
        ]
      },
      {
        id: "cpp-c01-u6-l4",
        title: "Validação defensiva de entrada e recuperação de fluxo",
        subtitle: "Aplicação · validação robusta de entradas do usuário",
        theory: "Se o usuário digitar texto em uma leitura numérica, o fluxo cin ativa a flag failbit e rejeita todas as leituras seguintes. Para recuperar o programa, chamamos cin.clear() para resetar as flags de erro e cin.ignore() para descartar a digitação inválida da fila.",
        questions: [
        q("O que acontece com as leituras subsequentes com std::cin se uma leitura anterior falhar e não for limpa?", "Todas as leituras seguintes falham imediatamente sem aguardar digitação do usuário", ["O programa muda para a língua inglesa","O compilador gera um aviso no terminal"], "Quando cin.fail() é ativado, o fluxo entra em greve e rejeita qualquer nova tentativa até que clear() seja chamado."),
        q("Qual método redefine os sinalizadores de estado do fluxo cin, restaurando seu funcionamento normal?", "std::cin.clear()", ["std::cin.reset()","std::cin.reboot()"], "cin.clear() limpa os bits de falha (failbit, badbit), reabilitando o fluxo para novas operações."),
        q("Qual padrão de laço é recomendado para solicitar uma entrada numérica até o usuário digitar um valor correto?", "Um laço while com condição baseada no sucesso da leitura com cin", ["Um comando switch infinito","Uma instrução goto para o início do arquivo"], "Validar a extração em um laço while permite recuperação elegante e feedback amigável ao usuário."),
        q("Qual expressão condicional avalia como verdadeira quando a extração de dados foi bem-sucedida?", "if (std::cin >> valor)", ["if (cin.error())","if (valor == null)"], "A própria expressão cin >> valor retorna o fluxo, que se converte implicitamente em bool indicando sucesso."),
        t("Qual método do fluxo cin limpa os bits de erro e restaura o estado de prontidão para novas leituras?", ["clear"], "clear() remove o estado de falha permitindo que novas leituras aconteçam.", "// Restaurar o fluxo: std::cin.____();"),
        g("Complete a recuperação defensiva limpando os sinalizadores de erro do fluxo cin:", ["cin.clear()"], "cin.clear() reseta o estado de falha do fluxo.", "std::____;\nstd::cin.ignore(1000, '\\n');"),
        o("Ordene os passos para recuperar o fluxo de entrada após o usuário digitar texto em vez de número:", ["Detectar a falha de formato inspecionando o resultado de std::cin.fail()","Chamar std::cin.clear() para restaurar o estado operacional do fluxo","Invocar std::cin.ignore() para descartar os caracteres inválidos do buffer","Emitir mensagem de aviso solicitando que o usuário digite um número válido"], "A dobradinha clear + ignore é o padrão ouro para validação robusta em console C++."),
        p("Associe o sinalizador de estado do fluxo (iostate) ao seu respectivo significado:", [["goodbit","O fluxo está íntegro e pronto para operações de leitura e escrita"],["failbit","Ocorreu um erro lógico de formatação ou tipo na última operação de I/O"],["badbit","Ocorreu um erro grave e irrecuperável de integridade no fluxo"],["eofbit","O fim do fluxo de entrada (End-Of-File) foi atingido"]], "Conhecer os sinalizadores de fluxo capacita o engenheiro a escrever sistemas tolerantes a falhas.")
        ]
      },
      {
        id: "cpp-c01-u6-l5",
        title: "Boas práticas de entrada no console C++",
        subtitle: "Revisão e desafio · boas práticas de entrada no console C++",
        theory: "Construir utilitários de console profissionais em C++ exige princípios claros: exibir prompts expressivos com std::cout antes de ler, encapsular rotinas de validação em funções reutilizáveis, evitar misturar cin >> com getline sem ignore, e tratar o final de arquivo (EOF).",
        questions: [
        q("O que o fluxo std::cin retorna quando o usuário envia o sinal de final de arquivo (Ctrl+D no Linux ou Ctrl+Z no Windows)?", "Ativa a flag eofbit e a conversão booleana do fluxo avalia como false", ["O computador desliga o monitor","O terminal apaga o histórico de comandos"], "O sinal de EOF encerra o fluxo de entrada, permitindo encerrar loops de leitura com elegância."),
        q("Por que é uma boa prática encapsular a leitura e validação de inteiros em uma função separada?", "Centraliza a rotina de recuperação com clear e ignore, evitando repetição de código (DRY)", ["Torna o executável cinco vezes menor","Permite que o C++ rode em navegadores web"], "Encapsular leitura defensiva em funções reutilizáveis eleva a manutenibilidade do código."),
        q("Qual operador de comparação avalia se o valor lido está dentro de uma faixa aceitável (ex: entre 1 e 100)?", "Operadores relacionais combinados com AND lógico (>= 1 && <= 100)", ["Operador de atribuição simples (=)","Operador de ponteiro (*)"], "Checagens lógicas garantem que valores numéricos atendam a regras de negócio além da tipagem."),
        q("Qual é o risco de não limpar o buffer após uma falha de leitura em um laço de repetição?", "O programa entra em loop infinito consumindo 100% de CPU repetindo a mensagem de erro", ["O código-fonte é corrompido no disco rígido","O teclado para de funcionar no sistema"], "Sem descartar os caracteres inválidos, a mesma entrada quebrará o fluxo repetidamente em loop infinito."),
        t("Qual sinalizador indica que o fluxo atingiu o fim do arquivo ou stream de entrada?", ["eofbit"], "eofbit (End-Of-File bit) sinaliza que a entrada foi encerrada.", "// Fim de arquivo ativo: std::cin.____"),
        g("Complete a condição que valida se a nota está no intervalo permitido de 0 a 10:", ["nota >= 0 && nota <= 10"], "Operadores lógicos delimitam o intervalo permitido de valores.", "if (____) {\n    std::cout << \"Nota valida\\n\";\n}"),
        o("Ordene a arquitetura de uma rotina profissional de leitura de parâmetros de entrada:", ["Apresentar o prompt com orientações claras de limites e formatos aceitos","Tentar ler o valor no fluxo std::cin inspecionando falhas imediatas","Aplicar clear() e ignore() caso a entrada viole o tipo de dado","Validar se o número está dentro do intervalo permitido antes de devolvê-lo"], "Essa arquitetura estruturada previne 100% das falhas de entrada em programas de console."),
        p("Associe a regra de ouro de entrada em C++ ao seu respectivo benefício prático:", [["Prompt prévio com cout","Orienta o usuário sobre o dado esperado sem gerar sensação de travamento"],["clear() seguido de ignore()","Restaura o fluxo e descarta lixo do buffer evitando loops infinitos"],["Encapsulamento em funções","Evita duplicação de dezenas de linhas de tratamento de erros repetitivos"],["Checagem de EOF","Permite que a aplicação processe arquivos redirecionados via terminal"]], "Seguir boas práticas de E/S consolida a confiabilidade de ferramentas de sistema em C++.")
        ]
      }
    ],
    7: [
      {
        id: "cpp-c01-u7-l1",
        title: "Compilação com g++ e clang++ no terminal",
        subtitle: "Apresentação · invocação de g++ e clang++ no terminal",
        theory: "Em C++, compiladores como g++ (GCC) e clang++ (LLVM) traduzem código-fonte em binário executável nativo. A flag -o especifica o nome do executável de saída (ex: g++ main.cpp -o app). No Windows, o executável gerado recebe a extensão .exe automaticamente.",
        questions: [
        q("Qual comando da suíte GCC é o compilador oficial dedicado a programas em linguagem C++?", "g++", ["gcc-c-only","c++-make"], "g++ invoca o compilador de C++ com linkedição automática da biblioteca padrão libstdc++."),
        q("Qual flag do compilador define o nome do arquivo executável final gerado?", "-o (output)", ["-name","-bin"], "A flag -o especifica o arquivo de saída gerado (ex: g++ main.cpp -o programa).", "g++ main.cpp -o meu_app"),
        q("O que acontece se executarmos g++ main.cpp sem informar a flag -o no terminal?", "Gera um executável com nome padrão (a.out no Linux/macOS ou a.exe no Windows)", ["O código é apagado do computador","A compilação falha por falta de nome"], "Na ausência de -o, o compilador adota o nome canônico tradicional a.out ou a.exe."),
        q("Qual compilador moderno baseado na infraestrutura LLVM é amplamente utilizado como alternativa ao GCC?", "clang++", ["javac","python3"], "clang++ é o compilador da suíte Clang/LLVM, famoso por diagnósticos claros e alta modularidade."),
        t("Qual comando do GCC é utilizado no terminal para compilar arquivos de código C++?", ["g++"], "g++ compila e linka código C++ com a biblioteca padrão.", "// Compilar arquivo: ____ main.cpp -o app"),
        g("Complete o comando g++ para compilar o arquivo codigo.cpp gerando o executável saida.exe:", ["-o saida.exe"], "A flag -o define o nome do binário compilado.", "g++ codigo.cpp ____"),
        o("Ordene as etapas básicas para compilar e executar um programa C++ via terminal:", ["Criar e editar o código-fonte salvando o arquivo como main.cpp","Abrir a linha de comando no diretório do projeto","Executar o comando de compilação g++ main.cpp -o programa","Executar o binário gerado digitando ./programa (ou programa.exe no Windows)"], "Esse ciclo direto de terminal é a base da programação em linguagens de sistemas."),
        p("Associe o comando do compilador ao seu respectivo papel no desenvolvimento C++:", [["g++ main.cpp -o app","Compila main.cpp gerando o binário executável com nome app"],["clang++ main.cpp -o app","Compila utilizando o frontend Clang da infraestrutura LLVM"],["./app","Executa o binário recém-compilado no terminal do sistema"],["g++ --version","Exibe a versão e arquitetura do compilador instalado"]], "Compreender a linha de comando do compilador confere independência total de IDEs pesadas.")
        ]
      },
      {
        id: "cpp-c01-u7-l2",
        title: "Padrões de linguagem C++ (-std=c++17, -std=c++20)",
        subtitle: "Prática guiada · padrões de linguagem (-std=c++17, -std=c++20)",
        theory: "A linguagem C++ evolui através de padrões internacionais da ISO a cada três anos. A flag -std especifica a versão da linguagem aceita pelo compilador, como -std=c++17 ou -std=c++20, habilitando novos recursos como structured bindings, conceitos e módulos.",
        questions: [
        q("Qual flag do compilador g++/clang++ define a versão da especificação padrão do C++ a ser utilizada?", "-std= (ex: -std=c++20)", ["--version-cplus","-standard-iso"], "A opção -std instrui o compilador sobre a versão da gramática e biblioteca padrão (ex: -std=c++20).", "g++ -std=c++20 main.cpp -o app"),
        q("Qual padrão do C++ introduziu os recursos de Conceitos (Concepts), Corrotinas e Módulos?", "C++20", ["C++98","C++03"], "C++20 foi uma das maiores revisões da linguagem, trazendo conceitos para templates e módulos nativos."),
        q("O que acontece se você utilizar um recurso do C++20 em um compilador configurado com -std=c++11?", "O compilador gera erro de sintaxe avisando que o recurso não é suportado no padrão selecionado", ["O compilador converte o código para Java","O computador roda o programa em modo de segurança"], "Especificar um padrão mais antigo restringe a gramática, rejeitando recursos posteriores."),
        q("Qual padrão de linguagem é amplamente adotado como linha de base estável na indústria atual?", "C++17 (e progressivamente C++20)", ["C++98 legado","C++95 inexistente"], "C++17 é a versão consolidada moderna com suporte universal em compiladores industriais."),
        t("Qual flag do compilador g++ especifica a versão do padrão C++ a ser compilada?", ["-std"], "A flag -std configura a edição da norma ISO a ser aplicada na compilação.", "// Definir versao: g++ ____=c++20 main.cpp"),
        g("Complete o comando especificando a compilação no padrão moderno C++20:", ["-std=c++20"], "A flag -std=c++20 habilita os recursos modernos aprovados na norma ISO de 2020.", "g++ ____ main.cpp -o sistema"),
        o("Ordene a cronologia dos principais marcos normativos da linguagem C++ moderna:", ["C++11: Introdução de auto, smart pointers, lambdas e semântica de movimento","C++14 e C++17: Refinamento de templates, structured bindings e std::filesystem","C++20: Revolução com Concepts, Ranges, Corrotinas e cabeçalho <format>","C++23: Adição de std::print, reflexão inicial e expansão da biblioteca padrão"], "Acompanhar a evolução das normas ISO permite tirar proveito de código mais limpo e seguro."),
        p("Associe a norma do C++ ao recurso emblemático que ela introduziu na linguagem:", [["C++11","auto, expressões lambda e semântica de movimento (rvalues)"],["C++17","Structured bindings (desestruturação) e tipo std::optional"],["C++20","Concepts (restrição de templates) e suporte a Corrotinas"],["C++23","std::print e std::println para saída formatada sem fluxos"]], "O domínio das normas permite selecionar o padrão ideal para os requisitos do projeto.")
        ]
      },
      {
        id: "cpp-c01-u7-l3",
        title: "Avisos rigorosos com -Wall, -Wextra e -Werror",
        subtitle: "Aprofundamento · flags de avisos rigorosos (-Wall, -Wextra, -Werror)",
        theory: "Compiladores C++ possuem analisadores estáticos excepcionais. A flag -Wall ativa avisos comuns; -Wextra ativa avisos adicionais; e -Werror transforma todos os avisos em erros de compilação, forçando a equipe a entregar código perfeitamente limpo e sem pontas soltas.",
        questions: [
        q("Qual flag do compilador ativa os avisos mais recomendados sobre potenciais bugs e más práticas?", "-Wall", ["-Wnone","-Wsilent"], "-Wall (Warn all) ativa um conjunto abrangente de avisos de qualidade de código.", "g++ -Wall -Wextra main.cpp -o app"),
        q("Qual flag do compilador complementa o -Wall ativando avisos rigorosos ainda mais detalhados?", "-Wextra", ["-Wsuper","-Wmore"], "-Wextra adiciona verificações extras como parâmetros não utilizados e conversões arriscadas."),
        q("O que a flag -Werror faz quando o compilador encontra qualquer aviso (warning) no código?", "Transforma o aviso em um erro fatal que interrompe e impede a compilação do executável", ["Apaga o aviso da tela silenciosamente","Envia um e-mail para o suporte"], "-Werror obriga o código a ser 100% livre de warnings, adotado como padrão em equipes de ponta."),
        q("Qual aviso comum o compilador emite se uma variável for declarada mas nunca utilizada?", "unused variable", ["missing semicolon","stack overflow"], "Variáveis declaradas e não lidas indicam código morto ou esquecimento de lógica."),
        t("Qual flag do compilador transforma avisos (warnings) em erros bloqueantes de compilação?", ["-Werror"], "-Werror trata todo aviso como erro garantindo máxima qualidade.", "// Tratar warnings como erros: g++ ____ main.cpp"),
        g("Complete a instrução com as flags canônicas de qualidade rigorosa do GCC/Clang:", ["-Wall -Wextra"], "Combinar -Wall e -Wextra é a recomendação padrão de engenharia em C++.", "g++ ____ main.cpp -o programa"),
        o("Ordene as etapas para auditar e limpar o código-fonte de warnings em C++:", ["Compilar o código utilizando as flags rigorosas g++ -Wall -Wextra","Ler atentamente cada aviso emitido identificando a linha e motivo do alerta","Corrigir as causas (variáveis não usadas, comparações com sinais opostos)","Recompilar com -Werror ativado para garantir tolerância zero a defeitos"], "A disciplina de compilação limpa sem warnings elimina mais de 80% dos bugs comuns de C++."),
        p("Associe a flag de auditoria do compilador ao seu respectivo efeito:", [["-Wall","Habilita avisos fundamentais sobre construções arriscadas no código"],["-Wextra","Adiciona checagens adicionais detalhadas e minuciosas"],["-Werror","Interrompe a compilação caso qualquer aviso seja detectado"],["-pedantic","Exige conformidade estrita com o padrão ISO rejeitando extensões GNU"]], "As flags de avisos transformam o compilador em um auditor incansável de qualidade.")
        ]
      },
      {
        id: "cpp-c01-u7-l4",
        title: "Compilação de múltiplos arquivos e cabeçalhos .h",
        subtitle: "Aplicação · compilação de múltiplos arquivos com cabeçalhos .h",
        theory: "Projetos reais dividem o código entre arquivos de cabeçalho (.h/.hpp), que contêm declarações de funções e classes com include guards (#pragma once), e arquivos de implementação (.cpp). Todos os .cpp são passados ao compilador para serem compilados e linkados em um único binário.",
        questions: [
        q("Qual diretiva moderna colocada no topo de arquivos .h impede que o cabeçalho seja incluído mais de uma vez?", "#pragma once", ["#include once","#stop import"], "#pragma once é suportado por todos os compiladores modernos e evita duplicação de definições.", "#pragma once\nint somar(int a, int b);"),
        q("Qual extensão é tradicionalmente utilizada para arquivos que contêm apenas declarações e protótipos?", ".h (ou .hpp)", [".cpp",".exe"], "Arquivos de cabeçalho (.h ou .hpp) abrigam assinaturas, estruturas e declarações públicas."),
        q("Como compilamos um projeto que possui main.cpp e matematica.cpp utilizando o g++?", "Passando ambos os arquivos .cpp na linha de comando: g++ main.cpp matematica.cpp -o app", ["Compilando apenas o arquivo .h","O g++ não aceita mais de um arquivo"], "Todos os arquivos de código-fonte (.cpp) que compõem o programa devem ser fornecidos ao compilador."),
        q("Qual ferramenta de automação de build é o padrão da indústria para gerenciar compilações complexas em C++?", "CMake", ["npm","Docker Desktop"], "CMake é o gerador de sistemas de compilação universal adotado pelo ecossistema C++."),
        t("Qual diretiva de uma linha no topo do cabeçalho impede múltiplas inclusões acidentais?", ["#pragma once"], "#pragma once é o include guard mais limpo e amplamente aceito da atualidade.", "// Include guard moderno: ____"),
        g("Complete o comando g++ para compilar conjuntamente os arquivos main.cpp e util.cpp:", ["g++ main.cpp util.cpp"], "Ambos os arquivos de implementação devem ser passados ao compilador.", "____ -o sistema"),
        o("Ordene a estrutura recomendada para dividir uma funcionalidade entre cabeçalho e implementação:", ["Criar calculadora.h com #pragma once contendo os protótipos das funções","Criar calculadora.cpp incluindo \"calculadora.h\" e implementando os corpos","Criar main.cpp incluindo \"calculadora.h\" e invocando as rotinas no método main","Compilar com g++ main.cpp calculadora.cpp -o app e validar a execução"], "A separação em .h e .cpp desacopla contratos de implementação com total clareza."),
        p("Associe a extensão de arquivo em C++ à sua respectiva finalidade arquitetural:", [[".h / .hpp","Arquivo de cabeçalho com protótipos, classes e include guards"],[".cpp","Arquivo de implementação contendo o código executável dos métodos"],["#pragma once","Diretiva do pré-processador que impede inclusão redundante do cabeçalho"],["CMakeLists.txt","Arquivo de configuração que define alvos e regras de compilação com CMake"]], "Separar declarações de implementações é o pilar da arquitetura modular em C++.")
        ]
      },
      {
        id: "cpp-c01-u7-l5",
        title: "Ciclo completo de compilação e linkedição",
        subtitle: "Revisão e desafio · ciclo completo de compilação e linkedição",
        theory: "A transformação de código C++ em binário abrange quatro fases sequenciais: o Pré-processamento (resolve #include e macros), a Compilação (gera assembly), a Montagem (gera arquivos objeto .o com código de máquina) e a Linkedição (resolve símbolos entre arquivos e gera o executável).",
        questions: [
        q("Quais são as quatro etapas canônicas percorridas pelo compilador C++ até o executável final?", "Pré-processamento, Compilação, Montagem e Linkedição (Linking)", ["Digitação, Leitura, Impressão e Salvamento","Download, Descompactação, Teste e Publicação"], "Essa cadeia transforma diretivas de texto em código objeto e o consolida em um executável autônomo."),
        q("O que a etapa de pré-processamento do compilador executa no código-fonte?", "Resolve diretivas iniciadas por cerquilha (#) como #include e substituições de texto com macros", ["Verifica a velocidade da memória RAM","Cria o ícone do programa na área de trabalho"], "O pré-processador opera puramente em manipulação textual antes da análise sintática."),
        q("Qual arquivo binário intermediário é gerado na fase de montagem antes da linkedição final?", "Arquivo objeto (.o no Linux ou .obj no Windows)", [".class",".apk"], "Arquivos objeto contêm o código de máquina daquela unidade de tradução específica."),
        q("Qual é a responsabilidade central da etapa de linkedição (Linker)?", "Unir múltiplos arquivos objeto (.o) e bibliotecas, resolvendo as referências entre funções e símbolos", ["Corrigir erros gramaticais do código","Exibir animações de compilação"], "O linker costura as chamadas de métodos aos seus endereços reais nas funções compiladas."),
        t("Qual componente do processo de build une arquivos objeto (.o) gerando o binário executável final?", ["Linker"], "O Linker (ligador) resolve referências entre bibliotecas e classes.", "// Etapa final da construcao: ____"),
        g("Complete o comando que gera apenas o arquivo objeto main.o sem invocar o linker:", ["-c"], "A flag -c compila o código até arquivo objeto sem acionar o linker.", "g++ ____ main.cpp -o main.o"),
        o("Ordene a jornada de transformação de um código-fonte C++ até a execução física:", ["O pré-processador substitui os #includes pelo texto dos respectivos cabeçalhos","O compilador analisa a gramática e converte a lógica em código assembly","O montador converte as instruções assembly em arquivo binário objeto (.o)","O linker consolida os objetos e a biblioteca padrão no executável final"], "Dominar essas quatro etapas desmistifica qualquer mensagem de erro do ecossistema C++."),
        p("Associe a fase de construção do C++ ao seu respectivo produto imediato:", [["Pré-processador","Gera código-fonte expandido com inclusões e macros resolvidas"],["Compilador","Gera código em linguagem assembly a partir da árvore sintática"],["Montador (Assembler)","Gera arquivo de código de máquina objeto (.o / .obj)"],["Linker","Gera o arquivo executável final (.exe / ELF) com símbolos unificados"]], "Compreender o pipeline de build capacita o desenvolvedor a diagnosticar qualquer defeito em C++.")
        ]
      }
    ],
    8: [
      {
        id: "cpp-c01-u8-l1",
        title: "Erros de compilação versus erros de linkedição",
        subtitle: "Apresentação · erros de sintaxe versus erros do linker",
        theory: "Erros de compilação ocorrem quando a gramática do C++ é violada (ex: ponto e vírgula ausente ou tipos incompatíveis). Já erros de linkedição (linker errors) ocorrem na fase final quando o compilador não encontra a implementação real de uma função declarada no cabeçalho.",
        questions: [
        q("Qual é a diferença fundamental entre um erro emitido pelo compilador e um erro emitido pelo linker?", "O compilador acusa falhas de sintaxe e tipos; o linker acusa funções declaradas cuja implementação não foi achada", ["O linker só emite mensagens se o computador estiver desconectado","O compilador nunca aponta linhas de erro"], "Erros sintáticos barram a tradução do arquivo; erros de linker ocorrem na junção dos arquivos compilados."),
        q("Se esquecermos de colocar ponto e vírgula no final de uma instrução, qual etapa acusa o erro?", "Fase de compilação (SyntaxError)", ["Fase de linkedição","Fase de execução"], "A ausência de pontuação obrigatória viola a gramática da linguagem, acusada na análise sintática."),
        q("Se declararmos void calcular(); no .h e chamarmos calcular() no main sem implementar o corpo, quem reclama?", "O linker (com mensagem de undefined reference)", ["O pré-processador","O monitor do sistema"], "O compilador aceita a promessa da assinatura, mas o linker falha ao procurar o corpo da função."),
        q("Qual prefixo identifica comumente erros emitidos pelo linker do GCC no terminal?", "ld returned 1 exit status", ["javac exited","node exception"], "ld é o nome do linker tradicional do ecossistema Unix/GCC; \"ld returned 1\" sinaliza falha de linkedição."),
        t("Qual ferramenta de linkedição costuma emitir o aviso \"ld returned 1 exit status\"?", ["ld"], "ld é o linker padrão das ferramentas GCC e Clang.", "// Mensagem de falha do linker: ____ returned 1 exit status"),
        g("Complete o tipo de erro reportado quando uma função foi declarada mas nunca implementada:", ["undefined reference"], "O linker acusa undefined reference quando não encontra a definição da função.", "// Erro do linker: ____ to `processarDados()'"),
        o("Ordene a investigação metódica para identificar a origem de uma mensagem de erro em C++:", ["Verificar se a mensagem partiu do analisador do compilador ou do linker ld","Se for erro de sintaxe, abrir o arquivo exatamente na linha e coluna indicadas","Se for erro de linker (undefined reference), checar se o arquivo .cpp foi passado no comando","Recompilar e confirmar se a construção atinge status de saída zero com sucesso"], "Separar erros de sintaxe de falhas de linkedição conduz rapidamente à raiz do problema."),
        p("Associe a mensagem de erro clássica à respectiva fase do processo de construção:", [["expected ';' before '}'","Erro de compilação: falha de pontuação gramatical no código"],["undefined reference to `main'","Erro de linkedição: o linker não encontrou o ponto de entrada principal"],["cannot find -lcurl","Erro de linkedição: biblioteca externa não foi localizada no sistema"],["fatal error: limits: No such file","Erro de pré-processador: cabeçalho incluído não existe no caminho de busca"]], "Saber identificar qual ferramenta do pipeline gerou o erro poupa enorme tempo de depuração.")
        ]
      },
      {
        id: "cpp-c01-u8-l2",
        title: "Diagnóstico de undefined reference e ausência de símbolos",
        subtitle: "Prática guiada · undefined reference e ausência de símbolos",
        theory: "O erro undefined reference (ou LNK2019 no Visual C++) é um dos mais comuns em C++. Ele ocorre tipicamente quando esquecemos de incluir o arquivo .cpp auxiliar na linha de compilação do g++, ou quando escrevemos o nome da função com maiúsculas/minúsculas diferentes entre o .h e o .cpp.",
        questions: [
        q("Qual é a causa mais frequente de undefined reference ao trabalhar com múltiplos arquivos em C++?", "Esquecer de passar o arquivo de implementação correspondente (ex: util.cpp) no comando do g++", ["Escrever comentários em português no código","Salvar os arquivos na pasta Meus Documentos"], "Se o arquivo .cpp contendo a função não for passado ao compilador, seu código objeto não existirá para o linker."),
        q("Como corrigir o erro undefined reference to `calcular(int)' se a função existe em math.cpp?", "Adicionar math.cpp ao comando de compilação: g++ main.cpp math.cpp -o app", ["Deletar o arquivo math.cpp","Reiniciar o terminal duas vezes"], "Passar todos os fontes .cpp necessários permite que o linker encontre os símbolos de cada função."),
        q("O que acontece se a assinatura no .h declarar void testar(int) e a implementação no .cpp for void testar(double)?", "O linker acusa undefined reference para testar(int) porque C++ suporta sobrecarga e as assinaturas diferem", ["O compilador converte os tipos silenciosamente","O programa roda sem problemas"], "Em C++, o nome do símbolo no compilador (name mangling) inclui os tipos dos parâmetros."),
        q("Qual utilitário de terminal permite inspecionar a tabela de símbolos de um arquivo objeto .o?", "nm (ou objdump)", ["notepad","ping"], "O comando nm lista os símbolos exportados e requeridos por um binário ou arquivo objeto."),
        t("Qual comando de terminal lista os símbolos e funções contidos em um arquivo objeto compilado?", ["nm"], "O utilitário nm exibe a tabela de símbolos de arquivos .o e bibliotecas.", "// Listar simbolos: ____ arquivo.o"),
        g("Complete a correção incluindo o arquivo de implementação que resolve a referência indefinida:", ["servico.cpp"], "Incluir o arquivo de implementação resolve as referências do linker.", "g++ main.cpp ____ -o executavel"),
        o("Ordene as checagens para resolver definitivamente uma falha de undefined reference:", ["Ler atentamente o nome exato da função e os tipos de parâmetros reportados no erro","Verificar se o arquivo .cpp com a implementação foi incluído no comando do g++","Conferir se a assinatura do método no .cpp coincide perfeitamente com a declaração do .h","Recompilar o projeto e atestar a resolução bem-sucedida do executável"], "Seguir esse roteiro soluciona mais de 95% dos problemas de linkedição em C++."),
        p("Associe a causa ao seu reflexo em mensagens do compilador C++:", [["Falta do arquivo .cpp no build","undefined reference to `MinhaClasse::executar()'"],["Assinatura divergente entre .h e .cpp","undefined reference devido à diferença de parâmetros no mangling"],["Ausência da função main()","undefined reference to `main' ou `WinMain'"],["Falta de biblioteca externa (-l)","undefined reference to `curl_easy_init' ou similar"]], "Desvendar o linker remove o maior obstáculo técnico de quem programa em C++ moderno.")
        ]
      },
      {
        id: "cpp-c01-u8-l3",
        title: "Falhas de segmentação (Segmentation Fault) e ponteiros",
        subtitle: "Aprofundamento · falhas de segmentação (Segmentation Fault) e ponteiros",
        theory: "Segmentation Fault (ou falha de segmentação) ocorre em tempo de execução quando o programa tenta acessar uma área de memória que não lhe pertence, como desreferenciar um ponteiro nulo (nullptr), acessar ponteiro desalocado ou ultrapassar limites de vetores.",
        questions: [
        q("O que causa a famosa mensagem \"Segmentation fault (core dumped)\" durante a execução em C++?", "Tentativa de ler ou gravar em um endereço de memória inválido ou não autorizado pelo sistema operacional", ["Um erro de digitação no nome de uma variável","O computador atingir 100% de brilho"], "O sistema operacional detecta violação de acesso à memória e encerra o processo imediatamente."),
        q("Qual é o valor nulo oficial e tipado introduzido no C++11 para inicializar ponteiros com segurança?", "nullptr", ["NULL","0 (zero)"], "nullptr é uma constante tipada (std::nullptr_t), prevenindo ambiguidades com tipos inteiros."),
        q("Qual ferramenta de análise dinâmica é amplamente utilizada no Linux para detectar acessos inválidos de memória?", "Valgrind (ou AddressSanitizer)", ["Photoshop","WinRAR"], "Valgrind e AddressSanitizer (-fsanitize=address) detectam leituras ilegais e vazamentos de memória."),
        q("Qual flag do compilador ativa o AddressSanitizer para identificar a linha exata de um crash de memória?", "-fsanitize=address -g", ["-fast-memory","-safe-all"], "AddressSanitizer instrumenta o binário com checagens em tempo de execução de alta precisão.", "g++ -fsanitize=address -g main.cpp -o app"),
        t("Qual literal do C++11 representa um ponteiro nulo com segurança de tipos?", ["nullptr"], "nullptr é a representação padronizada e segura para referências e ponteiros nulos em C++.", "int* ptr = ____;"),
        g("Complete a verificação defensiva que previne desreferenciar um ponteiro nulo:", ["!= nullptr"], "Verificar se o ponteiro não é nulo previne a falha de segmentação.", "if (ponteiro ____) {\n    std::cout << *ponteiro << \"\\n\";\n}"),
        o("Ordene a rotina de prevenção contra falhas de segmentação ao manipular memória:", ["Inicializar todo ponteiro imediatamente com nullptr ou um endereço válido","Validar se o ponteiro é diferente de nullptr antes de acessar seu valor com *","Preferir smart pointers (std::unique_ptr) e std::vector a ponteiros brutos manuais","Compilar com -fsanitize=address durante a fase de desenvolvimento e testes"], "Adotar C++ moderno com ponteiros inteligentes e sanitizers praticamente elimina falhas de memória."),
        p("Associe a causa clássica à ocorrência de erro de memória em tempo de execução:", [["Desreferenciar nullptr","Gera Segmentation Fault imediato ao tentar ler endereço zero"],["Acesso além do tamanho do array","Corrompe variáveis adjacentes ou estoura os limites do processo"],["Ponteiro pendente (Dangling pointer)","Acesso a endereço de memória que já foi liberado por delete"],["AddressSanitizer (-fsanitize=address)","Ferramenta que aponta a linha exata do estouro de memória"]], "Escrever C++ moderno é utilizar abstrações seguras que blindam contra falhas de segmentação.")
        ]
      },
      {
        id: "cpp-c01-u8-l4",
        title: "Uso de assert e noções de depuração com GDB",
        subtitle: "Aplicação · uso de assert e depuração com GDB",
        theory: "A macro assert, declarada no cabeçalho <cassert>, testa invariantes durante o desenvolvimento: se a condição for falsa, o programa aborta exibindo a linha da falha. Em conjunto com o depurador GDB e a flag -g, permite inspecionar variáveis e a pilha de chamadas passo a passo.",
        questions: [
        q("Qual cabeçalho deve ser incluído para utilizar a macro de verificação assert em C++?", "#include <cassert>", ["#include <debug>","#include <verify>"], "<cassert> define a macro assert herdada do C e padronizada em C++."),
        q("O que acontece se a condição passada para assert(x > 0) for avaliada como falsa?", "O programa aborta imediatamente imprimindo no terminal a expressão, o arquivo e a linha da falha", ["O programa continua normalmente","O compilador reescreve a instrução"], "assert interrompe a execução com mensagem detalhada de diagnóstico quando uma invariante é violada."),
        q("Qual flag do compilador gera símbolos de depuração essenciais para inspecionar o código no GDB?", "-g", ["-debug-on","-symbols"], "A flag -g embute tabelas de símbolos e informações de linhas no binário compilado.", "g++ -g main.cpp -o app"),
        q("Qual comando do GDB exibe a pilha de chamadas (stack trace) no momento exato em que o programa travou?", "backtrace (ou bt)", ["list-all","show-files"], "O comando backtrace no GDB lista a cadeia completa de chamadas ativas na falha."),
        t("Qual comando do GDB exibe a pilha completa de chamadas de funções ativas?", ["backtrace"], "backtrace (ou bt) exibe o rastro de funções até a linha do crash.", "// No prompt do GDB: (gdb) ____"),
        g("Complete com a macro padrão que valida que o divisor nunca pode ser igual a zero:", ["assert"], "A macro assert verifica precondições e interrompe caso a afirmação seja falsa.", "____(divisor != 0);\nint resultado = total / divisor;"),
        o("Ordene as etapas para inspecionar um crash de execução utilizando o depurador GDB:", ["Compilar o código C++ com a flag de símbolos de depuração: g++ -g main.cpp -o app","Iniciar a sessão no terminal executando gdb ./app","Executar a aplicação dentro do depurador digitando o comando run","Executar backtrace quando o programa travar para examinar a linha do disparo"], "O uso do GDB com símbolos de depuração transforma diagnósticos misteriosos em certezas analíticas."),
        p("Associe a ferramenta ou comando de depuração à sua função no ecossistema C++:", [["assert(condicao)","Macro que aborta a execução se a precondição for falsa em modo debug"],["g++ -g","Gera binário com símbolos completos mapeados para as linhas do código-fonte"],["gdb (run)","Inicia a execução do programa monitorado pelo depurador"],["gdb (backtrace)","Imprime a cadeia de funções ativas na pilha no momento do travamento"]], "Dominar assert e GDB é a marca definitiva do engenheiro de sistemas autônomo e resolutivo.")
        ]
      },
      {
        id: "cpp-c01-u8-l5",
        title: "Consolidação e encerramento do capítulo 1",
        subtitle: "Revisão e desafio · consolidação e encerramento do primeiro capítulo",
        theory: "Parabéns pela conclusão do primeiro capítulo de C++! Você percorreu o ciclo completo da linguagem de sistemas: modelos mentais de compilação nativa, estrutura da função main, saída e entrada com fluxos cin e cout, flags rigorosas de compilação e diagnóstico analítico de erros.",
        questions: [
        q("Qual conjunto de práticas resume um fluxo de trabalho profissional em C++ moderno?", "Compilar com -Wall -Wextra, usar nullptr e tipos de C++ moderno, e separar código entre .h e .cpp", ["Usar variáveis globais sem tipo e compilar sem flags de aviso","Copiar código da internet sem testar"], "Rigor no compilador, segurança de tipos moderna e modularidade definem a engenharia de ponta em C++."),
        q("Qual é o benefício inegociável de dominar C++ para a formação de qualquer programador?", "Entender como o computador, a memória RAM e o sistema operacional operam nos níveis mais fundamentais", ["Poder criar páginas web coloridas sem código","Nunca mais precisar usar teclado"], "C++ expõe a realidade física do hardware, tornando o desenvolvedor superior em qualquer linguagem."),
        q("Qual é o próximo passo natural no aprendizado após dominar o ambiente e E/S em C++?", "Estudar tipos primitivos, estruturas condicionais, laços for/while e ponteiros de forma aprofundada", ["Tentar escrever um sistema operacional do zero em um dia","Desistir da programação"], "Consolidar tipos, operadores e estruturas de controle pavimenta a jornada rumo a Classes e Templates."),
        q("Qual atitude define o programador maduro ao se deparar com um erro do compilador ou linker?", "Ler a mensagem no terminal, identificar se partiu do compilador ou do linker, e ir direto à linha indicada", ["Apagar o arquivo do disco rígido","Achar que o compilador está com defeito"], "Mensagens de erro são aliadas fundamentais projetadas para garantir a confiabilidade do produto final."),
        t("Qual comando do terminal compila o código C++ utilizando a suíte de ferramentas GCC?", ["g++"], "g++ é o compilador de C++ padrão do ecossistema GNU.", "// Compilador GNU para C++: ____"),
        g("Complete a instrução com o manipulador que finaliza a celebração comemorativa do capítulo:", ["std::endl"], "std::endl finaliza a mensagem garantindo o esvaziamento do buffer.", "std::cout << \"Capitulo 1 de C++ concluido com sucesso!\" << ____;"),
        o("Ordene os grandes marcos conquistados ao longo deste primeiro capítulo de C++:", ["Compreensão da compilação nativa de código-fonte para binário de máquina","Domínio da saída formatada com std::cout e manipuladores de <iomanip>","Domínio da leitura defensiva de entradas com std::cin, ignore e getline","Gestão de builds com g++, flags rigorosas (-Wall, -Wextra) e diagnósticos analíticos"], "Essa fundação robusta coloca você na vanguarda da programação de alto desempenho."),
        p("Associe o pilar fundamental do primeiro capítulo de C++ ao seu valor de engenharia:", [["Compilação Nativa","Máxima eficiência sem intermediários de runtime ou máquinas virtuais"],["Fluxos de I/O (<iostream>)","Entrada e saída com segurança de tipos e flexibilidade de encadeamento"],["Flags -Wall e -Wextra","Auditoria estática rigorosa que elimina potenciais defeitos precocemente"],["Tratamento de Memória","Controle cirúrgico da máquina que viabiliza softwares velozes e escaláveis"]], "Com esse alicerce dominado, você está plenamente preparado para triunfar nos desafios futuros do C++.")
        ]
      }
    ]
  });
})();
