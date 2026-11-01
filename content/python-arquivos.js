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

  window.PYTHON_CHAPTER_UNITS = window.PYTHON_CHAPTER_UNITS || {};
  window.PYTHON_CHAPTER_UNITS.arquivos = Object.assign(window.PYTHON_CHAPTER_UNITS.arquivos || {}, {
    1: [
      {
        id: "py-arq-1-3-modos-abertura",
        title: "Modos de abertura de arquivos",
        subtitle: "Prática · Modos r, w, a e variações",
        theory: "A função open() aceita diferentes modos de operação. O modo \"r\" abre exclusivamente para leitura, \"w\" abre para escrita truncando o arquivo existente e \"a\" acrescenta dados ao final. O sufixo \"b\" indica modo binário (como \"rb\"), essencial para imagens, áudio e arquivos compactados.",
        questions: [
          q("Qual modo de abertura apaga todo o conteúdo prévio do arquivo ao abrir?", "\"w\" (escrita com truncamento)", ["\"r\" (leitura)","\"a\" (anexo)"], "O modo \"w\" trunca o arquivo para zero bytes antes de escrever os novos dados."),
          q("Qual modo preserva os dados existentes e grava novas informações no final do arquivo?", "\"a\" (append / anexo)", ["\"r\" (read)","\"w\" (write)"], "O modo append posiciona o cursor de escrita no fim do arquivo sem sobrescrever o conteúdo."),
          q("Para abrir uma imagem JPEG ou arquivo ZIP, qual modo deve ser utilizado?", "\"rb\" (leitura em modo binário)", ["\"rt\"","\"w+\""], "Arquivos não textuais devem ser lidos em modo binário para evitar conversões indesejadas de quebras de linha."),
          q("O que acontece se tentarmos abrir um arquivo inexistente com o modo \"r\"?", "Levanta a exceção FileNotFoundError imediatamente", ["Cria um arquivo vazio silenciosamente","Retorna None"], "O modo de leitura estrita exige que o arquivo já exista no caminho indicado."),
          t("Qual modo abre para leitura e escrita simultânea sem truncar de imediato?", ["r+"], "O modo r+ permite ler e escrever preservando os dados pré-existentes.", "with open(\"dados.txt\", \"r+\") as f: pass"),
          g("Complete o modo para abrir arquivo em anexo preservando o histórico:", ["\"a\""], "\"a\" anexa novos dados no fim do arquivo.", "with open(\"log.txt\", ____) as arq: pass"),
          o("Ordene as etapas de uma rotina de escrita segura em arquivo:", ["Abrir o arquivo com with open(\"saida.txt\", \"w\", encoding=\"utf-8\")","Escrever as linhas de texto com o método write() ou writelines()","Executar a lógica de processamento complementar","Sair do bloco with garantindo o fechamento e flush automático"], "Abertura com contexto, escrita de dados e fechamento garantido."),
          p("Associe modo de abertura ao seu efeito no arquivo:", [["\"r\"","Abre para leitura; falha se não existir"],["\"w\"","Abre para escrita; trunca arquivo existente"],["\"a\"","Abre para escrita adicionando dados ao final"],["\"rb\"","Abre dados brutos em modo binário"]], "Modos de abertura da função built-in open() em Python.")
        ]
      },
      {
        id: "py-arq-1-4-leitura-fatiada",
        title: "Métodos de leitura: read, readline e readlines",
        subtitle: "Prática · Escolhendo a granularidade da leitura",
        theory: "Python oferece três métodos principais de leitura. read() carrega todo o arquivo para uma string única (ou N caracteres), readline() lê uma única linha até o delimitador de quebra e readlines() devolve uma lista com todas as linhas. Para grandes arquivos, iterar sobre o arquivo diretamente é o padrão recomendado.",
        questions: [
          q("Qual método carrega o arquivo inteiro em uma única string na memória?", "arquivo.read()", ["arquivo.readline()","arquivo.readall()"], "read() sem parâmetros lê todo o fluxo de caracteres até EOF em uma única string."),
          q("Por que iterar diretamente for linha in arquivo: é preferível a arquivo.readlines()?", "Porque lê linha por linha sob demanda sem carregar todo o arquivo na memória RAM", ["Porque readlines() é proibido na PEP 8","Porque for linha in arquivo só lê números"], "O objeto arquivo atua como um iterador preguiçoso com consumo mínimo de memória."),
          q("O que o método readline() retorna quando atinge o final do arquivo (EOF)?", "Uma string vazia (\"\")", ["None","StopIteration"], "A string vazia indica término; uma linha em branco com quebra de linha retorna \"\\n\"."),
          q("Qual método é ideal para limitar a leitura a um bloco de bytes (ex: 1024 bytes)?", "arquivo.read(1024)", ["arquivo.readline(1024)","arquivo.slice(1024)"], "Passar um argumento numérico para read() delimita o tamanho exato do bloco lido."),
          t("Quantas linhas contém a lista retornada por readlines() de um arquivo com 5 quebras?", ["5"], "readlines() retorna uma lista onde cada elemento corresponde a uma linha do arquivo.", "# arquivo com 5 linhas\nlinhas = arq.readlines()"),
          g("Complete a iteração recomendada linha por linha sobre o arquivo aberto:", ["for linha in arquivo:"], "Iterar diretamente sobre o arquivo consome sob demanda em streaming.", "with open(\"dados.txt\") as arquivo:\n    ____\n        processar(linha)"),
          o("Ordene os métodos de leitura do menor para o maior consumo de memória em arquivos grandes:", ["Iteração direta linha a linha: for linha in arquivo","Leitura em blocos de tamanho fixo: arquivo.read(4096)","Leitura linha a linha com readline() em laço controlado","Leitura integral com readlines() ou read() na memória"], "Estratégias de menor para maior pressão sobre a memória RAM."),
          p("Associe método de leitura ao seu tipo de retorno:", [["read()","String única contendo todo o conteúdo lido"],["readline()","String única contendo a próxima linha"],["readlines()","Lista de strings com todas as linhas"],["iter(arquivo)","Fluxo sob demanda linha a linha"]], "Assinaturas e retornos dos métodos de leitura de arquivo em Python.")
        ]
      },
      {
        id: "py-arq-1-5-fechamento-e-flush",
        title: "Gerenciamento de buffer e o método flush",
        subtitle: "Aprofundamento · Sincronização de dados em disco",
        theory: "Sistemas operacionais utilizam buffers de memória para otimizar operações de disco. Quando executamos write(), os dados podem permanecer no buffer intermediário antes de serem gravados fisicamente. O método flush() força a gravação imediata sem fechar o arquivo, garantindo persistência em tempo real.",
        questions: [
          q("Para que serve o método flush() em um descritor de arquivo aberto para escrita?", "Força a gravação imediata dos dados acumulados no buffer para o disco físico", ["Apaga os dados gravados recentemente","Fecha o arquivo imediatamente"], "flush esvazia o buffer de memória interna sincronizando com o sistema de arquivos."),
          q("Por que os sistemas operacionais utilizam buffers para escrita em arquivos?", "Porque gravar pequenos blocos repetidamente em disco é muito mais lento que acumular em memória", ["Porque arquivos só aceitam bytes aos pares","Para impedir que o usuário leia os dados"], "O buffering reduz drasticamente o número de chamadas de sistema (syscalls) caras."),
          q("Quando um arquivo é fechado via close() ou saída do bloco with, o flush é executado?", "Sim, o fechamento do arquivo executa um flush automático antes de liberar o descritor", ["Não, os dados são descartados","Apenas no Windows"], "O fechamento correto garante que nenhum dado pendente no buffer seja perdido."),
          q("Qual parâmetro da função open() controla o comportamento de buffering?", "buffering (ex: buffering=0 para desativar em modo binário, ou buffering=1 para buffer por linha)", ["flush_mode","sync"], "O parâmetro buffering permite ajustar o tamanho e o tipo de buffer alocado."),
          t("Qual método força a escrita dos dados do buffer para o disco sem fechar o arquivo?", ["flush"], "flush() esvazia o buffer gravando em disco mantendo o arquivo aberto.", "arquivo.write(\"log importante\\n\")\narquivo.flush()"),
          g("Complete o comando que força a sincronização imediata com o disco:", ["arquivo.flush()"], "flush garante a persistência imediata em logs e fluxos contínuos.", "arquivo.write(mensagem)\n____"),
          o("Ordene a trajetória dos dados desde a chamada write() até a gravação definitiva:", ["A aplicação Python executa arquivo.write(texto)","Os dados são temporariamente retidos no buffer de memória do Python","O buffer atinge o limite ou é acionado arquivo.flush()","O sistema operacional recebe os bytes e grava fisicamente no dispositivo"], "Fluxo de persistência através de buffers e sincronização de disco."),
          p("Associe termo de gerenciamento de I/O ao seu conceito:", [["Buffer","Área de memória rápida que acumula dados antes da gravação"],["flush()","Comando que descarrega o buffer forçando a gravação"],["close()","Descarrega o buffer e libera o handle do sistema operacional"],["Syscall","Chamada ao núcleo do sistema para operações de I/O"]], "Conceitos de entrada e saída física no sistema operacional.")
        ]
      }
    ],
    2: [
      {
        id: "py-arq-2-1-encoding-utf8",
        title: "Codificação de caracteres e UTF-8",
        subtitle: "Apresentação · A importância de encoding=\"utf-8\"",
        theory: "Arquivos de texto representam caracteres como bytes por meio de tabelas de codificação. O padrão universal é UTF-8, capaz de codificar qualquer caractere Unicode. Em Python, especificar explicitamente encoding=\"utf-8\" na função open() evita corrupções de acentos e divergências entre sistemas operacionais.",
        questions: [
          q("Qual é o padrão de codificação universal recomendado para arquivos de texto?", "UTF-8", ["ASCII puro","Latin-1 isolado"], "UTF-8 codifica caracteres de qualquer idioma e é o padrão da web e de sistemas modernos."),
          q("O que acontece se abrirmos um arquivo UTF-8 contendo acentos usando a codificação ASCII?", "Levanta a exceção UnicodeDecodeError por caractere fora do intervalo aceito", ["Converte acentos para maiúsculas","Apaga o arquivo"], "ASCII só suporta códigos de 0 a 127; caracteres acentuados utilizam múltiplos bytes no UTF-8."),
          q("Por que nunca devemos omitir o parâmetro encoding ao abrir arquivos de texto em Python?", "Porque a codificação padrão do sistema (locale) varia entre Windows, Linux e macOS", ["Porque o código não compila sem encoding","Porque o Python proíbe acentos"], "No Windows o padrão histórico pode ser cp1252, que falha ao ler arquivos UTF-8 de outros sistemas."),
          q("Como inspecionar a codificação padrão utilizada pelo interpretador Python no ambiente?", "sys.getdefaultencoding() ou locale.getpreferredencoding()", ["os.get_encoding()","open.encoding"], "O módulo sys ou locale expõem a codificação configurada na plataforma."),
          t("Quantos bits compõem a tabela de caracteres ASCII clássica original?", ["7"], "ASCII original define 128 códigos (0 a 127), ocupando 7 bits.", "# ASCII básico utiliza 7 bits"),
          g("Complete a abertura de arquivo garantindo codificação universal:", ["encoding=\"utf-8\""], "Definir encoding=\"utf-8\" garante portabilidade entre plataformas.", "with open(\"artigo.txt\", \"r\", ____) as f: pass"),
          o("Ordene a decodificação de um texto acentuado a partir do disco:", ["Ler os bytes brutos armazenados no arquivo físico","Identificar a tabela de codificação especificada (ex: UTF-8)","Mapear as sequências de bytes para os caracteres Unicode corretos","Entregar a string Python em memória pronta para manipulação"], "Transformação de bytes brutos em caracteres através da codificação."),
          p("Associe codificação à sua característica técnica:", [["ASCII","7 bits; suporta apenas o alfabeto inglês básico e controles"],["UTF-8","Tamanho variável (1 a 4 bytes); padrão universal da web"],["Latin-1 (ISO-8859-1)","1 byte por caractere; cobre línguas da Europa ocidental"],["UnicodeDecodeError","Exceção lançada ao falhar a conversão de bytes em string"]], "Tabelas de codificação e padrões de caracteres em sistemas de arquivos.")
        ]
      },
      {
        id: "py-arq-2-2-erros-decodificacao",
        title: "Tratamento de erros de decodificação",
        subtitle: "Prática · Parâmetros strict, ignore e replace",
        theory: "Ao lidar com arquivos legados ou corrompidos, o parâmetro errors da função open() define a estratégia de recuperação. O padrão \"strict\" lança exceções, \"ignore\" descarta bytes ilegíveis silenciosamente e \"replace\" substitui bytes problemáticos pelo caractere de substituição oficial  (U+FFFD).",
        questions: [
          q("Qual é o comportamento padrão do parâmetro errors em open() se for omitido?", "\"strict\" (levanta UnicodeDecodeError ao encontrar qualquer byte inválido)", ["\"ignore\"","\"replace\""], "\"strict\" falha imediatamente para alertar que os dados não conferem com a codificação esperada."),
          q("O que a estratégia errors=\"replace\" faz com sequências de bytes corrompidas?", "Substitui os bytes ilegíveis pelo caractere especial  (marcador de substituição)", ["Apaga o arquivo inteiro do disco","Gera um aviso e para a leitura"], "Permite visualizar o restante do texto sem abortar o script, marcando pontos danificados."),
          q("Quando a estratégia errors=\"ignore\" pode ser perigosa em pipelines de dados?", "Pode descartar caracteres silenciosamente, alterando o significado ou integridade dos dados", ["Porque consome o dobro de memória","Porque trava o processador"], "Ignorar erros oculta dados ausentes e pode gerar relatórios incompletos sem aviso."),
          q("Qual valor de errors codifica bytes defeituosos como sequências de escape legíveis?", "\"backslashreplace\"", ["\"escape\"","\"hex\""], "\"backslashreplace\" converte bytes desconhecidos em strings legíveis como \\xNN."),
          t("Qual código de ponto de código Unicode representa o caractere oficial de substituição (Replacement Character)?", ["U+FFFD","FFFD"], "U+FFFD é o ponto de código Unicode oficial reservado para substituir bytes ou caracteres inválidos.", "# Ponto de código Unicode de substituição: U+FFFD"),
          g("Complete o parâmetro para substituir caracteres corrompidos durante a leitura:", ["errors=\"replace\""], "errors=\"replace\" garante continuidade na leitura substituindo anomalias.", "with open(\"log.txt\", \"r\", encoding=\"utf-8\", ____) as f: pass"),
          o("Ordene as estratégias de tratamento de erro da mais rigorosa para a mais permissiva:", ["errors=\"strict\": aborta a operação com UnicodeDecodeError","errors=\"backslashreplace\": preserva bytes como sequências de escape","errors=\"replace\": substitui anomalias pelo símbolo  de marcação","errors=\"ignore\": omite e descarta bytes desconhecidos sem aviso"], "Políticas de erro em decodificação de texto ordenadas por tolerância."),
          p("Associe política de erro em open() ao seu comportamento:", [["errors=\"strict\"","Levanta exceção na primeira falha de conversão"],["errors=\"replace\"","Insere o caractere  no lugar do byte defeituoso"],["errors=\"ignore\"","Salta bytes inválidos sem interromper o fluxo"],["errors=\"backslashreplace\"","Converte o byte no formato de escape \\x.."]], "Opções do parâmetro errors para leitura e escrita de texto em Python.")
        ]
      },
      {
        id: "py-arq-2-3-bytes-e-bytearray",
        title: "Operações binárias com bytes e bytearray",
        subtitle: "Prática · Tipos imutáveis e mutáveis para dados brutos",
        theory: "Dados binários em Python são manipulados com os tipos bytes (sequência imutável) e bytearray (sequência mutável). Literais de bytes usam o prefixo b (ex: b\"dados\"). Strings são convertidas para bytes com o método encode(\"utf-8\") e bytes viram strings com decode(\"utf-8\").",
        questions: [
          q("Qual é a diferença fundamental entre os tipos built-in bytes e bytearray?", "bytes é imutável; bytearray pode ter seus elementos alterados in-place", ["bytes só aceita números pares","bytearray não suporta indexação"], "bytearray permite modificar fatias e posições específicas sem criar novos objetos."),
          q("Como converter uma string de texto em sua representação binária UTF-8?", "texto.encode(\"utf-8\")", ["bytes(texto)","texto.to_bytes()"], "encode() aplica a tabela de codificação gerando a sequência correspondente de bytes."),
          q("Como converter uma sequência de bytes recebida da rede de volta para string?", "dados_bytes.decode(\"utf-8\")", ["str(dados_bytes)","dados_bytes.to_str()"], "decode() interpreta os bytes brutos segundo o padrão fornecido e recria a string."),
          q("Qual prefixo identifica um literal de bytes diretamente no código Python?", "O caractere b antes das aspas: b\"conteudo\"", ["O caractere u","O caractere f"], "Literais como b\"ABC\" criam objetos do tipo bytes com os valores ASCII correspondentes."),
          t("Quantos bytes compõem a palavra b\"Python\" em memória?", ["6"], "Cada caractere ASCII da palavra ocupa exatamente 1 byte, totalizando 6.", "b = b\"Python\"\nprint(len(b))"),
          g("Complete a conversão da string em bytes com codificação UTF-8:", ["mensagem.encode(\"utf-8\")"], "encode transforma strings de caracteres em sequências binárias de bytes.", "dados = ____"),
          o("Ordene as etapas do ciclo de transmissão de texto em formato binário:", ["Criar a string de texto com caracteres Unicode em Python","Converter a string para bytes usando o método encode(\"utf-8\")","Gravar os bytes em disco com modo \"wb\" ou transmitir pela rede","Ler os bytes brutos e reconstruir a string com decode(\"utf-8\")"], "Do caractere legível aos bytes trafegados e de volta ao texto."),
          p("Associe tipo ou método binário à sua função:", [["b\"texto\"","Literal de sequência binária imutável (bytes)"],["bytearray","Sequência binária mutável com suporte a atribuição"],["str.encode()","Transforma string de texto em objeto bytes"],["bytes.decode()","Transforma sequência de bytes em string de texto"]], "Operações elementares com dados binários e codificação em Python.")
        ]
      },
      {
        id: "py-arq-2-4-quebras-de-linha",
        title: "Quebras de linha e modo newline",
        subtitle: "Aprofundamento · Diferenças entre CRLF, LF e newline=\"\"",
        theory: "Sistemas operacionais adotam diferentes convenções para quebra de linha: Windows utiliza \"\\r\\n\" (CRLF), enquanto Linux e macOS utilizam \"\\n\" (LF). Por padrão, Python traduz automaticamente todas as variantes para \"\\n\" em modo texto. O parâmetro newline=\"\" preserva quebras originais sem conversão.",
        questions: [
          q("Qual convenção de quebra de linha é padrão no ecossistema Unix/Linux?", "\"\\n\" (Line Feed ou LF)", ["\"\\r\\n\" (CRLF)","\"\\r\" isolado"], "Sistemas baseados em Unix adotam o caractere único de nova linha LF (\"\\n\")."),
          q("Qual convenção de quebra de linha é historicamente utilizada pelo sistema Windows?", "\"\\r\\n\" (Carriage Return seguido de Line Feed)", ["Apenas \"\\n\"","\"\\t\""], "O Windows preserva a tradição do MS-DOS utilizando o par CRLF para marcar o fim de linhas."),
          q("O que o modo universal de quebras de linha do Python faz por padrão ao ler arquivos?", "Converte automaticamente qualquer variação (\"\\r\\n\", \"\\r\", \"\\n\") para \"\\n\" na memória", ["Gera um erro de compatibilidade de sistema","Remove todas as quebras"], "Essa normalização garante que o código trate quebras de linha de forma consistente em qualquer OS."),
          q("Por que devemos abrir arquivos CSV com newline=\"\" ao usar o módulo csv em Python?", "Para impedir que o Python gere linhas em branco duplicadas no Windows", ["Porque CSV proíbe o uso de vírgulas","Para converter todos os campos em float"], "A documentação oficial do módulo csv exige newline=\"\" para gerenciar quebras internamente."),
          t("Quantos caracteres compõem a sequência física de quebra de linha CRLF do Windows?", ["2"], "CRLF é composto por dois caracteres: \\r (13) e \\n (10).", "# \"\\r\\n\" possui 2 caracteres físicos"),
          g("Complete a abertura de arquivo CSV desativando a tradução de quebras de linha:", ["newline=\"\""], "newline=\"\" preserva o controle de linhas sob responsabilidade do módulo csv.", "with open(\"tabela.csv\", \"w\", encoding=\"utf-8\", ____) as arq: pass"),
          o("Ordene a leitura e normalização de um arquivo originado no Windows:", ["Arquivo gravado em disco com sequência física \"\\r\\n\" (CRLF)","open() executa a leitura com modo de tradução universal ativado","O interpretador converte \"\\r\\n\" para \"\\n\" na string em memória","A aplicação processa linhas terminadas uniformemente com \"\\n\""], "Normalização transparente de quebras de linha pelo runtime do Python."),
          p("Associe formato de quebra de linha à sua plataforma de origem:", [["\"\\n\" (LF)","Padrão moderno em Linux, macOS e web"],["\"\\r\\n\" (CRLF)","Padrão tradicional de arquivos no Microsoft Windows"],["\"\\r\" (CR)","Padrão de sistemas Mac clássicos pré-OSX"],["newline=\"\"","Preserva as quebras originais sem tradução automática"]], "Convenções de terminação de linha em sistemas computacionais.")
        ]
      },
      {
        id: "py-arq-2-5-projeto-auditor-codificacao",
        title: "Projeto: auditor e conversor de codificação de arquivos",
        subtitle: "Consolidação · Normalizando arquivos legados para UTF-8",
        theory: "Neste projeto prático, construímos uma ferramenta para auditar e normalizar arquivos de texto. O script lê arquivos legados em Latin-1 ou CP1252 com tolerância a erros, normaliza quebras de linha para LF e regrava o conteúdo em UTF-8 estrito, eliminando inconsistências em repositórios.",
        questions: [
          q("Qual é a estratégia segura para converter um arquivo de codificação desconhecida para UTF-8?", "Ler os bytes brutos, testar decodificações comuns (UTF-8, Latin-1) e regravar em UTF-8", ["Sobrescrever o arquivo diretamente no disco sem ler","Mudar apenas a extensão do arquivo"], "A validação progressiva identifica a tabela correta antes de salvar o arquivo convertido."),
          q("Por que Latin-1 (ISO-8859-1) consegue decodificar qualquer sequência de bytes sem erro?", "Porque mapeia todos os 256 valores possíveis de um byte (0 a 255) para caracteres válidos", ["Porque é a codificação mais moderna do mundo","Porque ignora números"], "Latin-1 nunca falha com UnicodeDecodeError, embora possa exibir caracteres bizarros (mojibake)."),
          q("O que é o fenômeno denominado \"mojibake\"?", "A exibição distorcida de caracteres quando um texto é decodificado com a tabela errada", ["Um vírus de computador japonês","A compactação excessiva de arquivos"], "Ocorre tipicamente quando bytes UTF-8 de acentos (2 bytes) são lidos como se fossem Latin-1."),
          q("Como prevenir a perda de dados durante a conversão em lote de arquivos?", "Gravar o resultado em um arquivo temporário novo e substituir o original apenas após o sucesso", ["Apagar o original antes da conversão","Ignorar mensagens de erro"], "A gravação atômica via arquivo temporário impede que falhas a meio caminho corrompam o original."),
          t("Quantos arquivos convertidos com sucesso se 3 de 3 arquivos forem normalizados?", ["3"], "Todos os 3 arquivos foram reescritos em conformidade com UTF-8.", "// 3 arquivos auditados e convertidos com sucesso"),
          g("Complete a regravação definitiva com codificação UTF-8 padrão:", ["encoding=\"utf-8\""], "Garante a saída normalizada no padrão moderno da plataforma.", "with open(\"destino.txt\", \"w\", ____) as f:\n    f.write(conteudo)"),
          o("Ordene as etapas da conversão segura de arquivos legados para UTF-8:", ["Abrir o arquivo original lendo os dados com a codificação de origem identificada","Normalizar quebras de linha substituindo \"\\r\\n\" por \"\\n\"","Gravar o conteúdo decodificado em um arquivo temporário com encoding=\"utf-8\"","Renomear o arquivo temporário substituindo o arquivo legado original de forma atômica"], "Pipeline profissional de migração e sanitização de dados textuais."),
          p("Associe problema de texto à sua causa raiz:", [["Mojibake (ex: \"AÃ§Ã£o\")","Texto UTF-8 decodificado incorretamente como Latin-1/CP1252"],["UnicodeDecodeError","Tentativa de ler bytes UTF-8 usando a tabela ASCII estrita"],["Linhas em branco duplas","Arquivo CSV aberto sem newline=\"\" no ambiente Windows"],["Truncamento de acentos","Uso indevido de errors=\"ignore\" descartando bytes"]], "Diagnósticos fundamentais de manipulação de texto e arquivos.")
        ]
      }
    ],
    3: [
      {
        id: "py-csv-reader-writer",
        title: "Leitura e escrita de CSV com o módulo csv",
        subtitle: "Apresentação · Manipulando tabelas delimitadas por vírgula",
        theory: "O módulo built-in csv trata peculiaridades do formato de valores separados por delimitadores. csv.reader() itera sobre linhas convertendo cada registro em uma lista de strings. csv.writer() grava sequências formatando vírgulas, aspas e quebras de linha com conformidade com a especificação RFC 4180.",
        questions: [
          q("Qual módulo da biblioteca padrão de Python é especializado em arquivos tabulares delimitados?", "csv", ["table","pandas_lite"], "O módulo csv é built-in e não requer instalação de bibliotecas externas."),
          q("O que cada linha iterada por csv.reader(arquivo) retorna para a aplicação?", "Uma lista de strings correspondentes a cada coluna daquela linha", ["Uma string única separada por espaços","Um dicionário com chaves numéricas"], "csv.reader fatia a linha respeitando aspas e delimitadores, devolvendo listas de campos."),
          q("Qual método de csv.writer grava uma única linha de dados no arquivo CSV?", "escritor.writerow(linha)", ["escritor.write(linha)","escritor.append_row(linha)"], "writerow() aceita um iterável e grava os campos com o delimitador configurado."),
          q("Como gravar múltiplos registros de uma só vez utilizando csv.writer?", "escritor.writerows(lista_de_linhas)", ["escritor.write_many(lista)","escritor.dump(lista)"], "writerows() recebe uma lista de listas e escreve todas as linhas sequencialmente."),
          t("Quantos campos possui uma linha CSV \"nome,idade,cidade\"?", ["3"], "A linha possui três colunas separadas por vírgulas.", "# linha com 3 colunas"),
          g("Complete a criação do leitor CSV sobre o arquivo aberto:", ["csv.reader(arquivo)"], "csv.reader analisa o fluxo de texto delimitado.", "import csv\nwith open(\"dados.csv\") as arquivo:\n    leitor = ____"),
          o("Ordene as etapas da escrita de uma tabela com o módulo csv:", ["Abrir o arquivo com open(\"saida.csv\", \"w\", newline=\"\", encoding=\"utf-8\")","Instanciar o objeto gravador com escritor = csv.writer(arquivo)","Gravar a linha de cabeçalho com escritor.writerow([\"id\", \"nome\"])","Gravar as linhas de dados usando writerow() ou writerows()"], "Ciclo canônico de gravação de arquivos CSV em Python."),
          p("Associe classe ou função do módulo csv à sua função:", [["csv.reader(f)","Itera sobre o arquivo devolvendo listas de strings"],["csv.writer(f)","Cria gravador para formatar dados tabulares"],["writerow(seq)","Escreve uma linha individual no formato CSV"],["writerows(seqs)","Escreve múltiplas linhas a partir de uma coleção"]], "Interfaces fundamentais de manipulação do módulo csv.")
        ]
      },
      {
        id: "py-dictreader-dictwriter",
        title: "Mapeamento com DictReader e DictWriter",
        subtitle: "Prática · Mapeando colunas diretamente para dicionários",
        theory: "csv.DictReader e csv.DictWriter operam sobre dicionários em vez de listas de posições. DictReader utiliza a primeira linha como nomes de campos, transformando cada linha subsequente em um dicionário {coluna: valor}. DictWriter exige a declaração de fieldnames e grava linhas a partir de dicionários.",
        questions: [
          q("Qual é a principal vantagem de usar csv.DictReader em vez de csv.reader?", "Permite acessar os dados pelo nome da coluna em vez de depender de índices numéricos", ["Converte todos os números para float automaticamente","Executa dez vezes mais rápido"], "O acesso nomeado torna o código imune a mudanças na ordem das colunas do arquivo CSV."),
          q("Qual método de csv.DictWriter grava a linha inicial contendo os nomes das colunas?", "escritor.writeheader()", ["escritor.writerow_header()","escritor.create_titles()"], "writeheader() utiliza a lista passada em fieldnames para emitir o cabeçalho."),
          q("O que acontece se passarmos um dicionário com uma chave inexistente em fieldnames para DictWriter?", "Levanta a exceção ValueError indicando campo não mapeado (por padrão)", ["Grava a coluna extra no final","Ignora a linha toda silenciosamente"], "DictWriter valida que as chaves do dicionário correspondam estritamente aos fieldnames definidos."),
          q("Como ler um arquivo CSV sem cabeçalho usando DictReader com nomes personalizados?", "Passando a lista de colunas no parâmetro fieldnames=colunas de DictReader", ["Renomeando o arquivo em disco","Não é possível ler sem cabeçalho"], "Especificar fieldnames manualmente permite mapear arquivos que não trazem títulos na primeira linha."),
          t("Qual valor leitor[\"nome\"] exibe para a linha \"Ana,30\" com cabeçalho \"nome,idade\"?", ["Ana"], "O DictReader associa o valor da primeira coluna à chave correspondente do cabeçalho.", "# DictReader mapeia coluna nome para \"Ana\""),
          g("Complete o comando que grava os títulos das colunas no arquivo CSV:", ["escritor.writeheader()"], "writeheader escreve a primeira linha de títulos baseada em fieldnames.", "escritor = csv.DictWriter(f, fieldnames=[\"id\", \"nome\"])\n____"),
          o("Ordene a rotina de exportação de dados com csv.DictWriter:", ["Definir a lista de campos: colunas = [\"id\", \"produto\", \"preco\"]","Abrir o arquivo de saída com newline=\"\" e encoding=\"utf-8\"","Criar escritor = csv.DictWriter(arquivo, fieldnames=colunas)","Chamar escritor.writeheader() e em seguida escritor.writerows(registros)"], "Fluxo completo de escrita orientada a dicionários com DictWriter."),
          p("Associe classe do módulo csv ao seu comportamento:", [["DictReader","Lê linhas transformando registros em dicionários"],["DictWriter","Grava dicionários mapeando chaves para colunas"],["writeheader()","Emite a linha com os nomes das colunas"],["fieldnames","Lista com a ordem e os nomes oficiais das colunas"]], "Ferramentas de serialização tabular orientada a mapas em Python.")
        ]
      },
      {
        id: "py-json-loads-dumps",
        title: "Serialização de strings com json.loads e json.dumps",
        subtitle: "Prática · Conversão entre strings JSON e estruturas Python",
        theory: "O módulo json serializa estruturas de dados no formato padrão da web. json.dumps() converte dicionários e listas Python em strings JSON (com suporte a indent para formatação legível). json.loads() recebe uma string formatada em JSON e a desserializa para objetos e dicionários nativos equivalentes.",
        questions: [
          q("Qual função converte uma estrutura Python (dicionário ou lista) em uma string JSON?", "json.dumps(obj)", ["json.dump_str(obj)","json.serialize(obj)"], "O sufixo \"s\" em dumps significa \"dump to string\"."),
          q("Qual função converte uma string JSON recebida de volta em objetos nativos Python?", "json.loads(texto_json)", ["json.load_str(texto_json)","json.parse(texto_json)"], "O sufixo \"s\" em loads significa \"load from string\"."),
          q("Qual parâmetro de json.dumps() formata a string JSON com recuos e quebras de linha legíveis?", "indent=2 (ou qualquer número de espaços)", ["format=True","pretty=True"], "O parâmetro indent ativa o modo pretty-print para formatação amigável."),
          q("Por que o parâmetro ensure_ascii=False é importante ao serializar textos com acentos em JSON?", "Permite que acentos sejam gravados como caracteres legíveis em vez de sequências \\uXXXX", ["Acelera a conversão em 50%","Compacta o arquivo em disco"], "ensure_ascii=False preserva acentos UTF-8 diretos na string de saída."),
          t("Qual tipo Python resulta de json.loads('{\"ativo\": true}')[\"ativo\"]?", ["True"], "true do JSON é convertido para o valor booleano True do Python.", "import json\ndado = json.loads('{\"ativo\": true}')\nprint(dado[\"ativo\"])"),
          g("Complete a serialização de dados para string JSON com recuo legível:", ["json.dumps(dados, indent=2)"], "dumps serializa objetos para strings formatadas.", "import json\ntexto = ____"),
          o("Ordene a troca de mensagens em formato JSON entre dois sistemas:", ["Estruturar o payload como dicionário com dados em Python","Serializar o dicionário em string usando json.dumps(payload)","Transmitir a string JSON pela rede ou salvar temporariamente","O receptor decodifica a string com json.loads(mensagem) para dicionário"], "Ciclo de serialização, transporte e desserialização de mensagens JSON."),
          p("Associe termo do módulo json ao seu tipo correspondente em Python:", [["json.dumps()","Converte objeto Python em string no formato JSON"],["json.loads()","Converte string JSON em objeto Python equivalente"],["true (no JSON)","Convertido para True booleano em Python"],["null (no JSON)","Convertido para None em Python"]], "Mapeamento de tipos entre JSON e Python.")
        ]
      },
      {
        id: "py-json-load-dump-arquivos",
        title: "Persistência direta em arquivos com json.load e json.dump",
        subtitle: "Prática · Lendo e gravando arquivos JSON em disco",
        theory: "Para trabalhar diretamente com arquivos em disco sem strings intermediárias, usamos json.dump() e json.load(). json.dump(obj, arquivo) escreve os dados no arquivo aberto, enquanto json.load(arquivo) lê diretamente do arquivo. Essa abordagem consome menos memória que carregar strings inteiras.",
        questions: [
          q("Qual é a diferença entre json.dump() e json.dumps() no módulo json de Python?", "dump() escreve diretamente em um arquivo; dumps() retorna uma string na memória", ["dump() só aceita números inteiros","dumps() grava em formato binário"], "As funções sem \"s\" final operam diretamente sobre objetos de arquivo (file-like objects)."),
          q("Como carregar uma configuração salva no arquivo \"config.json\" diretamente para um dicionário?", "with open(\"config.json\", \"r\", encoding=\"utf-8\") as f: cfg = json.load(f)", ["cfg = json.read(\"config.json\")","cfg = json.file_load(\"config.json\")"], "json.load(f) lê o arquivo aberto e desserializa o objeto diretamente."),
          q("O que acontece se tentarmos ler um arquivo com sintaxe JSON corrompida usando json.load()?", "Levanta a exceção json.JSONDecodeError informando a linha e coluna do erro", ["Retorna um dicionário vazio silenciosamente","Apaga o arquivo defeituoso"], "JSONDecodeError fornece diagnóstico preciso sobre a posição da falha de sintaxe no arquivo."),
          q("Como gravar um dicionário com acentuação legível diretamente no arquivo \"dados.json\"?", "json.dump(dados, f, ensure_ascii=False, indent=2)", ["json.dump(dados, f, utf8=True)","json.save(dados, f)"], "A combinação de ensure_ascii=False com indent produz arquivos JSON perfeitamente legíveis."),
          t("Quantos elementos possui a lista carregada de um arquivo contendo \"[10, 20, 30]\" via json.load?", ["3"], "O array JSON é desserializado em uma lista Python de 3 itens.", "# lista com 3 inteiros"),
          g("Complete a gravação direta do objeto no arquivo aberto:", ["json.dump(dados, arquivo)"], "dump grava a estrutura Python diretamente no descritor de arquivo.", "import json\nwith open(\"out.json\", \"w\") as arquivo:\n    ____"),
          o("Ordene as etapas de gravação de um arquivo de configuração JSON:", ["Montar o dicionário de configurações com preferências do usuário","Abrir o arquivo de destino com open(\"config.json\", \"w\", encoding=\"utf-8\")","Invocar json.dump(config, f, indent=4, ensure_ascii=False)","Sair do bloco with garantindo o flush e encerramento do arquivo"], "Persistência estruturada de configurações em formato JSON."),
          p("Associe função de arquivo JSON à sua assinatura padrão:", [["json.dump(obj, f)","Grava o objeto diretamente no arquivo aberto f"],["json.load(f)","Lê e desserializa a partir do arquivo aberto f"],["JSONDecodeError","Exceção disparada perante JSON mal formatado"],["ensure_ascii=False","Instrui gravação de caracteres acentuados legíveis"]], "Operações de persistência com o módulo json em Python.")
        ]
      },
      {
        id: "py-projeto-conversor-csv-json",
        title: "Projeto: conversor bidirecional de CSV e JSON",
        subtitle: "Consolidação · Integrando csv e json em um pipeline de dados",
        theory: "Neste projeto prático, construímos um utilitário de conversão entre CSV e JSON. O script lê arquivos CSV via DictReader, converte tipos numéricos e booleanos e exporta um arquivo JSON estruturado. O processo inverso também é suportado, exportando coleções de dicionários para CSV com cabeçalhos consistentes.",
        questions: [
          q("Qual é o primeiro passo para converter uma tabela CSV em um arquivo JSON de registros?", "Ler as linhas do CSV com csv.DictReader e acumular os dicionários em uma lista", ["Converter cada caractere para hexadecimal","Apagar a primeira linha com Del"], "csv.DictReader transforma cada registro tabular em um dicionário mapeado por colunas."),
          q("Por que os valores lidos por csv.DictReader vêm todos no tipo string por padrão?", "Porque o formato CSV não embute metadados sobre tipos de dados nas suas colunas", ["Porque Python não suporta números em tabelas","Para economizar memória no Windows"], "Toda célula CSV é texto puro; conversões para int ou float exigem sanitização explícita."),
          q("Como garantir que chaves ausentes em alguns registros não quebrem a exportação para CSV?", "Definir uma união prévia de todas as chaves existentes para compor fieldnames do DictWriter", ["Excluir os registros incompletos","Lançar uma exceção de parada"], "Mapear todos os campos presentes na coleção permite que DictWriter preencha lacunas com vazio."),
          q("Qual parâmetro de DictWriter preenche automaticamente valores para chaves ausentes no dicionário?", "restval=\"\"", ["fillvalue=None","default_cell=\"\""], "restval define o texto padrão inserido nas colunas onde o registro não contém a chave correspondente."),
          t("Quantos objetos terá a lista JSON gerada a partir de um CSV com 4 linhas de dados e 1 cabeçalho?", ["4"], "O cabeçalho fornece os nomes das chaves; as 4 linhas restantes viram 4 objetos.", "# 4 registros convertidos"),
          g("Complete a serialização da lista de registros para o arquivo JSON:", ["json.dump(registros, f_json, indent=2)"], "dump exporta a lista de dicionários convertida.", "with open(\"saida.json\", \"w\") as f_json:\n    ____"),
          o("Ordene as etapas da conversão de CSV para JSON estruturado:", ["Abrir o arquivo CSV de entrada com encoding=\"utf-8\" e newline=\"\"","Ler os dados com csv.DictReader e converter strings numéricas para int/float","Abrir o arquivo de saída JSON e invocar json.dump(dados, f, indent=2)","Verificar a integridade do JSON gerado comparando o total de registros"], "Fluxo completo de transformação e enriquecimento de formatos de dados."),
          p("Associe etapa do pipeline de conversão à ferramenta empregada:", [["Leitura tabular","csv.DictReader(f)"],["Conversão de tipos","int(v) se v.isdigit() senão v"],["Exportação hierárquica","json.dump(dados, f, indent=2)"],["Garantia de quebras","newline=\"\" no open() do CSV"]], "Padrões de engenharia para conversão bidirecional de dados.")
        ]
      }
    ],
    4: [
      {
        id: "py-arq-4-1-pathlib-introducao",
        title: "Orientação a objetos no sistema de arquivos com pathlib",
        subtitle: "Apresentação · A classe Path e o operador de barra /",
        theory: "O módulo pathlib oferece uma interface orientada a objetos para o sistema de arquivos. Um objeto Path encapsula caminhos e permite concatenar diretórios intuitivamente usando o operador de divisão: caminho = Path(\"dados\") / \"relatorio.txt\", funcionando de maneira portável entre Windows e POSIX.",
        questions: [
          q("Qual módulo padrão moderno substitui o uso do antigo os.path em Python?", "pathlib", ["sys.path","file_tools"], "pathlib introduz a classe Path com semântica orientada a objetos para arquivos e pastas."),
          q("Como concatenar diretórios e arquivos de forma portável usando pathlib.Path?", "Usando o operador de barra normal /: Path(\"pasta\") / \"arquivo.txt\"", ["Usando o operador de soma + com barras invertidas","Chamando str.concat()"], "O operador / é sobrecarregado na classe Path para montagem idiomática de caminhos."),
          q("Qual propriedade de um objeto Path retorna o nome do arquivo com sua extensão?", "path.name", ["path.filename","path.basename"], "name retorna a string com o nome completo do arquivo (ex: \"dados.csv\")."),
          q("Qual propriedade de um objeto Path retorna exclusivamente a extensão do arquivo?", "path.suffix", ["path.ext","path.extension"], "suffix devolve a extensão com o ponto (ex: \".csv\" ou \".json\")."),
          t("Qual sufixo path.suffix retorna para o caminho Path(\"relatorio.pdf\")?", [".pdf"], "A propriedade suffix extrai a extensão acompanhada do ponto.", "from pathlib import Path\np = Path(\"relatorio.pdf\")\nprint(p.suffix)"),
          g("Complete a criação de um caminho concatenando subdiretórios com pathlib:", ["Path(\"projetos\") / \"src\" / \"app.py\""], "O operador / encadeia pastas de forma portável.", "from pathlib import Path\narquivo = ____"),
          o("Ordene as etapas de manipulação de um caminho com pathlib:", ["Importar a classe Path do módulo pathlib","Instanciar o caminho base com Path.cwd() ou caminho relativo","Concatenar diretórios e nomes de arquivo com o operador /","Consultar propriedades como name, stem, suffix e parent"], "Construção e inspeção de caminhos com objetos Path em Python."),
          p("Associe propriedade de Path ao dado extraído:", [["path.name","Nome completo do arquivo com extensão (ex: \"app.py\")"],["path.stem","Nome do arquivo sem a extensão (ex: \"app\")"],["path.suffix","Extensão do arquivo precedida de ponto (ex: \".py\")"],["path.parent","Objeto Path representando o diretório pai"]], "Propriedades fundamentais da classe pathlib.Path.")
        ]
      },
      {
        id: "py-arq-4-2-verificacao-e-criacao",
        title: "Verificação, criação e remoção de diretórios",
        subtitle: "Prática · Métodos exists, is_file, mkdir e unlink",
        theory: "A classe Path fornece métodos diretos para manipular o sistema de arquivos. p.exists() testa existência, p.is_file() e p.is_dir() conferem tipos. p.mkdir(parents=True, exist_ok=True) cria diretórios aninhados sem erro caso já existam. p.unlink() remove arquivos e p.rmdir() remove pastas vazias.",
        questions: [
          q("Qual método verifica se o caminho especificado existe no sistema de arquivos?", "path.exists()", ["path.is_valid()","path.check()"], "exists() retorna um booleano confirmando se o alvo existe fisicamente no disco."),
          q("Por que os parâmetros parents=True e exist_ok=True são recomendados em path.mkdir()?", "Criam toda a árvore de diretórios pais e evitam erro se a pasta já existir", ["Aceleram o disco em 10x","Apagam o conteúdo prévio"], "Essa combinação replica o comportamento seguro do comando unix mkdir -p."),
          q("Qual método de um objeto Path apaga (remove) um arquivo físico do disco?", "path.unlink()", ["path.delete()","path.remove_file()"], "unlink() desfaz o vínculo do arquivo no sistema de arquivos removendo-o."),
          q("Qual método de um objeto Path remove um diretório estritamente vazio?", "path.rmdir()", ["path.unlink()","path.purge()"], "rmdir() remove diretórios vazios; diretórios com conteúdo exigem shutil.rmtree()."),
          t("Qual booleano p.is_file() retorna para uma pasta existente (True ou False)?", ["False"], "is_file() retorna False para diretórios, identificando apenas arquivos comuns.", "from pathlib import Path\np = Path.cwd()\nprint(p.is_file())"),
          g("Complete a criação segura de pastas aninhadas com pathlib:", ["p.mkdir(parents=True, exist_ok=True)"], "parents e exist_ok garantem criação idempotente sem exceções.", "from pathlib import Path\np = Path(\"logs/2026/novembro\")\n____"),
          o("Ordene as etapas para criar com segurança uma pasta de saída para relatórios:", ["Definir o caminho do diretório de destino com pasta = Path(\"saida\")","Verificar se a pasta existe usando pasta.exists()","Executar pasta.mkdir(parents=True, exist_ok=True)","Gravar arquivos dentro da pasta garantida com (pasta / \"resumo.txt\")"], "Padrão idempotente de criação e uso de diretórios de trabalho."),
          p("Associe método de Path à sua operação no sistema de arquivos:", [["path.exists()","Retorna True se o arquivo ou diretório existir"],["path.is_dir()","Confirma se o caminho aponta para um diretório"],["path.mkdir()","Cria o diretório correspondente no disco"],["path.unlink()","Exclui o arquivo correspondente do sistema"]], "Operações de consulta e mutação de sistema de arquivos via pathlib.")
        ]
      },
      {
        id: "py-arq-4-3-glob-e-rglob",
        title: "Busca de arquivos com glob e rglob",
        subtitle: "Prática · Localizando padrões em árvores de diretórios",
        theory: "A busca por padrões em pastas é simplificada pelos métodos glob() e rglob() de pathlib. p.glob(\"*.csv\") localiza arquivos no diretório atual, enquanto p.rglob(\"*.py\") realiza uma varredura recursiva em todas as subpastas. Ambos devolvem iteradores eficientes de objetos Path sob demanda.",
        questions: [
          q("Qual método de Path realiza varredura recursiva em todas as subpastas por um padrão?", "path.rglob(\"padrao\")", ["path.search(\"padrao\")","path.find_all(\"padrao\")"], "O prefixo \"r\" em rglob significa recursive glob."),
          q("Qual padrão de caracteres curinga encontra todos os arquivos com extensão .json?", "\"*.json\"", ["\"?json\"","\"[json]\""], "O asterisco * casa com qualquer sequência de caracteres de qualquer comprimento."),
          q("O que os métodos glob() e rglob() retornam em vez de listas pré-alocadas?", "Um iterador preguiçoso de objetos Path", ["Uma tupla imutável com strings","Um dicionário de caminhos"], "Retornar um iterador consome memória mínima mesmo em diretórios com milhares de arquivos."),
          q("Qual padrão recursivo em glob(\"**/*.txt\") equivale à chamada rglob(\"*.txt\")?", "O curinga duplo ** seguido de barra e padrão", ["O padrão ??.txt","O prefixo ~~"], "** representa qualquer profundidade de subpastas em buscas com glob."),
          t("Quantos arquivos .py são encontrados se uma pasta contiver 3 scripts e 2 imagens?", ["3"], "O padrão *.py filtra estritamente os arquivos com extensão Python.", "# 3 scripts casam com *.py"),
          g("Complete a busca recursiva de todos os arquivos de configuração YAML:", ["pasta.rglob(\"*.yaml\")"], "rglob varre recursivamente toda a árvore de subdiretórios.", "from pathlib import Path\npasta = Path(\"configs\")\narquivos = list(____)"),
          o("Ordene as etapas de uma rotina que renomeia arquivos em lote com rglob:", ["Instanciar o objeto Path da pasta raiz do projeto","Iterar sobre os alvos usando for arq in raiz.rglob(\"*.tmp\"):","Construir o novo nome ou extensão do arquivo usando with_suffix()","Executar arq.rename(novo_caminho) aplicando a renomeação física"], "Fluxo de varredura recursiva e transformação em lote de arquivos."),
          p("Associe padrão glob ao seu alcance de busca:", [["glob(\"*.csv\")","Arquivos CSV apenas no diretório imediato"],["rglob(\"*.csv\")","Arquivos CSV no diretório e em todas as subpastas"],["glob(\"dados_??.txt\")","Arquivos com exatamente dois caracteres após dados_"],["with_suffix(\".bak\")","Gera novo Path alterando a extensão do arquivo"]], "Padrões de correspondência e transformação de extensões em pathlib.")
        ]
      },
      {
        id: "py-arq-4-4-leitura-escrita-rapida",
        title: "Leitura e escrita rápida com read_text e write_text",
        subtitle: "Prática · Métodos utilitários de uma linha em Path",
        theory: "Para operações rápidas sem boilerplate de blocos with, Path oferece read_text() e write_text(). p.read_text(encoding=\"utf-8\") abre, lê e fecha o arquivo automaticamente. p.write_text(\"dados\", encoding=\"utf-8\") cria ou trunca, grava o conteúdo e fecha o recurso em uma única instrução concisa.",
        questions: [
          q("Qual método de Path lê todo o conteúdo de um arquivo de texto em uma linha de código?", "path.read_text(encoding=\"utf-8\")", ["path.read()","path.load_str()"], "read_text() encapsula o open(), read() e close() de forma transparente e segura."),
          q("Qual método de Path grava uma string de texto em um arquivo em uma única instrução?", "path.write_text(conteudo, encoding=\"utf-8\")", ["path.write(conteudo)","path.save(conteudo)"], "write_text() abre, grava o texto fornecido e garante o fechamento do arquivo."),
          q("Quais métodos equivalentes existem em Path para manipulação direta de dados binários?", "path.read_bytes() e path.write_bytes(dados)", ["path.read_bin() e path.write_bin()","path.raw_read()"], "read_bytes() e write_bytes() tratam sequências do tipo bytes sem exigir encoding."),
          q("Quando o uso de read_text() NÃO é recomendado em aplicações de produção?", "Ao ler arquivos muito volumosos (gigabytes), pois carrega todo o conteúdo na memória de uma vez", ["Ao ler pequenos arquivos de configuração","Ao ler arquivos de código-fonte"], "Arquivos grandes devem ser lidos em streaming linha a linha com open() para não esgotar a RAM."),
          t("Quantos caracteres possui a string retornada por Path(\"vazio.txt\").read_text() em arquivo vazio?", ["0"], "Um arquivo sem bytes resulta em uma string vazia de comprimento 0.", "# arquivo vazio -> string vazia \"\""),
          g("Complete a gravação concisa de uma string no arquivo via pathlib:", ["p.write_text(relatorio, encoding=\"utf-8\")"], "write_text grava e fecha em um único comando conciso.", "from pathlib import Path\np = Path(\"saida.txt\")\n____"),
          o("Ordene as operações executadas internamente pela chamada path.write_text(texto):", ["Abrir o arquivo no modo de escrita de texto \"w\" com encoding informado","Despejar a totalidade da string fornecida no buffer do arquivo","Executar o flush dos dados para o disco físico","Fechar o descritor de arquivo garantindo liberação imediata do recurso"], "Mecanismo interno automatizado pelo método write_text()."),
          p("Associe método conciso de Path ao seu propósito:", [["path.read_text()","Lê todo o arquivo como string e fecha automaticamente"],["path.write_text()","Grava string no arquivo e fecha em uma única linha"],["path.read_bytes()","Lê arquivo como sequência binária do tipo bytes"],["path.write_bytes()","Grava sequência binária de bytes diretamente no disco"]], "Métodos utilitários de alta produtividade da classe pathlib.Path.")
        ]
      },
      {
        id: "py-arq-4-5-projeto-organizador-arquivos",
        title: "Projeto: organizador automático de arquivos por extensão",
        subtitle: "Consolidação · Construindo um script de triagem de diretórios",
        theory: "Neste projeto prático, integramos todos os recursos de pathlib para construir um organizador de arquivos. O script varre uma pasta de downloads com glob, identifica extensões (ex: .pdf, .jpg, .csv), cria as pastas de categorias correspondentes com mkdir e move os arquivos usando o método rename().",
        questions: [
          q("Qual método da classe Path move ou renomeia um arquivo para um novo destino?", "origem.rename(destino)", ["origem.move(destino)","origem.relocate(destino)"], "rename() transfere o arquivo no sistema de arquivos para o novo caminho especificado."),
          q("Como evitar que um arquivo sobrescreva outro de mesmo nome na pasta de destino?", "Verificar if destino.exists(): e renomear com contador sufixado antes de mover", ["Apagar o arquivo que já estava no destino","Lançar uma exceção de parada"], "Tratar colisões de nomes é mandatório para evitar perda acidental de dados de usuários."),
          q("Como ignorar subpastas ao varrer apenas os arquivos soltos em um diretório com pathlib?", "Filtrando com if item.is_file(): dentro do laço de percurso", ["Usando apenas nomes com menos de 5 letras","Desativando o disco"], "is_file() assegura que diretórios não sejam confundidos com arquivos normais."),
          q("Qual método de Path extrai a extensão em minúsculas para padronizar categorias?", "path.suffix.lower()", ["path.get_type()","path.extension()"], "suffix.lower() garante que .JPG e .jpg sejam agrupados na mesma categoria."),
          t("Quantas pastas são criadas se os arquivos encontrados tiverem apenas 2 extensões distintas (.pdf e .png)?", ["2"], "Cada extensão distinta gera sua respectiva pasta de destino.", "// 2 categorias geram 2 pastas"),
          g("Complete o comando que move o arquivo de origem para o caminho de destino:", ["origem.rename(destino)"], "rename transfere arquivos entre diretórios no mesmo sistema de arquivos.", "from pathlib import Path\n____ // move para a pasta de destino"),
          o("Ordene as etapas do organizador automático de diretórios:", ["Varredura dos arquivos na pasta de origem usando pasta.iterdir()","Filtrar apenas arquivos com item.is_file() e extrair sua extensão","Criar a pasta correspondente à categoria com pasta_cat.mkdir(exist_ok=True)","Mover o arquivo com item.rename(pasta_cat / item.name)"], "Pipeline completo de triagem, categorização e movimentação de arquivos."),
          p("Associe etapa do organizador ao método de Path utilizado:", [["Varredura de itens","pasta.iterdir()"],["Filtro de arquivos","item.is_file()"],["Criação de categorias","pasta_destino.mkdir(exist_ok=True)"],["Movimentação física","origem.rename(destino)"]], "Mapeamento de métodos de pathlib aplicados à automação de arquivos.")
        ]
      }
    ],
    5: [
      {
        id: "py-arq-5-1-hierarquia-excecoes-io",
        title: "Hierarquia de exceções de I/O em Python",
        subtitle: "Apresentação · OSError e suas especializações",
        theory: "Erros de sistema de arquivos herdam da classe base OSError. Subclasses específicas incluem FileNotFoundError (arquivo ausente), PermissionError (sem privilégios de acesso), FileExistsError (arquivo já existente) e IsADirectoryError (esperava-se arquivo, mas é pasta). Capturar subclasses específicas evita mascarar falhas.",
        questions: [
          q("Qual é a classe base de todas as exceções relacionadas a arquivos e sistema operacional?", "OSError", ["FileError","SystemException"], "OSError é a classe ancestral que unifica falhas de disco, rede e sistema operacional."),
          q("Qual exceção é levantada ao tentar ler um arquivo que não existe no caminho especificado?", "FileNotFoundError", ["KeyError","IndexError"], "FileNotFoundError especializa OSError para indicar caminhos não localizados."),
          q("Qual exceção ocorre quando o usuário não possui permissão de leitura ou escrita no arquivo?", "PermissionError", ["AuthError","SecurityException"], "PermissionError indica restrições de permissões do sistema operacional no arquivo ou diretório."),
          q("O que acontece se tentarmos abrir um diretório usando open() como se fosse um arquivo no Linux?", "Levanta IsADirectoryError", ["Abre todos os arquivos da pasta","Apaga a pasta"], "Sistemas operacionais rejeitam chamadas de leitura de fluxo aberto sobre nós de diretório."),
          t("Quantos blocos except específicos podemos encadear em uma única estrutura try?", ["Vários"], "Podemos encadear quantos blocos except forem necessários para tratar falhas distintas.", "# try seguido de múltiplos except"),
          g("Complete a captura da exceção específica de arquivo não encontrado:", ["except FileNotFoundError:"], "Capturar a exceção específica evita mascarar outros problemas inesperados.", "try:\n    open(\"dados.txt\")\n____\n    print(\"Arquivo ausente\")"),
          o("Ordene os blocos de tratamento de erro do mais específico para o mais genérico:", ["Capturar FileNotFoundError para caminhos ausentes","Capturar PermissionError para restrições de acesso","Capturar OSError para outras falhas de I/O do sistema","Capturar Exception genérica como último recurso"], "Hierarquia de tratamento: classes derivadas primeiro, classes base por último."),
          p("Associe exceção de I/O ao seu cenário disparador:", [["FileNotFoundError","Arquivo solicitado não existe no disco"],["PermissionError","Usuário sem permissão de acesso ao arquivo"],["IsADirectoryError","Tentativa de abrir um diretório como arquivo"],["FileExistsError","Tentativa de criar arquivo exclusivo que já existe"]], "Subclasses especializadas de OSError no ecossistema Python.")
        ]
      },
      {
        id: "py-arq-5-2-try-except-else-finally",
        title: "O ciclo completo try, except, else e finally",
        subtitle: "Prática · Garantias de limpeza e separação de fluxos",
        theory: "A instrução try suporta quatro blocos integrados. try abriga o código arriscado; except trata exceções específicas; else executa exclusivamente se nenhuma exceção ocorrer no try; e finally executa compulsoriamente sempre, havendo ou não falhas, sendo o local canônico para liberação de recursos.",
        questions: [
          q("Quando o bloco else de uma estrutura try-except-else-finally é executado?", "Apenas quando o bloco try termina com sucesso sem levantar nenhuma exceção", ["Sempre que houver uma exceção tratada","Apenas quando o finally falha"], "O else separa claramente o código arriscado do código que depende do sucesso daquele bloco."),
          q("Em que circunstâncias o bloco finally é executado em Python?", "Sempre, havendo ou não exceção, e mesmo se houver return dentro do try ou except", ["Apenas em caso de erro fatal","Apenas se o bloco else for omitido"], "O bloco finally garante a execução de limpeza independentemente do desfecho do try."),
          q("Por que é uma má prática usar except: vazio sem especificar a classe de exceção?", "Porque captura e silencia erros críticos como KeyboardInterrupt e SystemExit", ["Porque o código executa mais lentamente","Porque é proibido pelo compilador"], "Capturar BaseException oculta comandos de encerramento do usuário e falhas de memória."),
          q("Como capturar a instância da exceção para exibir sua mensagem técnica descritiva?", "Usando a cláusula as: except OSError as erro:", ["except OSError -> erro:","catch (OSError e)"], "A palavra-chave as vincula o objeto da exceção a uma variável acessível no bloco except."),
          t("Quantas vezes o bloco finally roda em um try que executou com sucesso total?", ["1"], "O bloco finally executa exatamente uma vez após a conclusão do fluxo.", "# finally executa compulsoriamente"),
          g("Complete o bloco executado exclusivamente se nenhuma falha ocorrer no try:", ["else:"], "else executa apenas perante o sucesso integral do try.", "try:\n    conectar()\nexcept ConnectionError:\n    tratar()\n____\n    processar()"),
          o("Ordene a execução do fluxo try-except-else-finally em cenário sem erros:", ["Executar as instruções do bloco try com sucesso","Ignorar os blocos except por ausência de exceções","Executar as instruções do bloco else com os dados obtidos","Executar o bloco finally liberando conexões e recursos"], "Ciclo de vida de tratamento estruturado de exceções em caminho de sucesso."),
          p("Associe bloco de controle ao seu momento de disparo:", [["try","Contém o código suscetível a erros e exceções"],["except Tipo as err","Trata falhas específicas capturando o objeto de erro"],["else","Executa apenas se o try for 100% bem-sucedido"],["finally","Executa compulsoriamente garantindo limpeza de recursos"]], "Estrutura completa de gerenciamento de exceções em Python.")
        ]
      },
      {
        id: "py-arq-5-3-encadeamento-raise-from",
        title: "Encadeamento de exceções com raise ... from",
        subtitle: "Aprofundamento · Rastreamento de causa raiz com context",
        theory: "Ao construir camadas de aplicação, convertemos exceções de baixo nível em erros de domínio. A sintaxe raise NovaExcecao from erro_original preserva a causa raiz através do atributo __cause__, permitindo que o desenvolvedor audite o stack trace original sem perder a abstração do negócio.",
        questions: [
          q("Para que serve a sintaxe raise NovaExcecao from excecao_original em Python?", "Para encadear exceções preservando a causa raiz original no traceback", ["Para cancelar a exceção anterior silenciosamente","Para duplicar a velocidade de execução"], "O encadeamento explícito documenta que a nova exceção foi provocada diretamente pela anterior."),
          q("Qual atributo da nova exceção armazena a referência para a exceção original causadora?", "nova_excecao.__cause__", ["nova_excecao.__root__","nova_excecao.__parent__"], "__cause__ guarda o objeto de erro que disparou a cadeia via raise from."),
          q("Como suprimir intencionalmente a exibição da exceção original no traceback do terminal?", "Usando raise NovaExcecao from None", ["Usando pass no except","Chamando sys.clear_traceback()"], "from None desativa a exibição automática da exceção anterior como causa no traceback."),
          q("Por que empacotar exceções de arquivo em exceções de domínio (ex: ConfiguracaoInvalidaError)?", "Para isolar detalhes de implementação da interface pública da sua biblioteca ou módulo", ["Porque Python proíbe usar FileNotFoundError em funções","Para economizar memória"], "A abstração de exceções permite trocar o mecanismo de armazenamento sem afetar quem chama o código."),
          t("Qual palavra-chave conecta a nova exceção à causa raiz original em um raise?", ["from"], "A instrução raise Nova from original estabelece o encadeamento formal.", "raise ErroDeNegocio(\"Falha\") from e"),
          g("Complete o encadeamento explícito preservando a exceção original e:", ["raise DadosCorrompidosError(\"Falha\") from e"], "raise from estabelece a conexão de causa raiz entre exceções.", "except json.JSONDecodeError as e:\n    ____"),
          o("Ordene a cronologia de um encadeamento de exceções em biblioteca:", ["Uma chamada de baixo nível open() levanta FileNotFoundError","O bloco except captura o erro sob a variável err","A camada de serviço executa raise RepositorioVazioError from err","O traceback exibe a nova exceção conectada explicitamente à causa raiz"], "Propagação e tradução de exceções através de camadas arquiteturais."),
          p("Associe sintaxe de raise ao seu impacto no traceback:", [["raise Novo from err","Vincula formalmente a causa raiz em __cause__"],["raise Novo from None","Suprime a exibição da exceção anterior no console"],["raise sem argumentos","Relança a exceção atual preservando o stack trace"],["__context__","Armazena a exceção ativa durante a ocorrência de outra"]], "Padrões de propagação e encadeamento de exceções em Python.")
        ]
      },
      {
        id: "py-arq-5-4-excecoes-customizadas",
        title: "Criando classes de exceção personalizadas",
        subtitle: "Prática · Modelando erros de domínio do seu projeto",
        theory: "Para expressar falhas específicas de um domínio, criamos classes derivadas de Exception. Definir uma classe base comum para o projeto (ex: class AppError(Exception)) permite que clientes capturem todas as falhas da aplicação com um único bloco except, ou tratem erros específicos separadamente.",
        questions: [
          q("De qual classe padrão do Python as exceções personalizadas de aplicação devem herdar?", "Exception", ["BaseException","SystemError"], "Exception é a raiz de todas as exceções não sistêmicas; herdar de BaseException é desaconselhado."),
          q("Por que é uma boa prática criar uma classe de exceção base para o seu próprio pacote/projeto?", "Permite que quem usa sua biblioteca capture qualquer erro dela com um único except MeuPacoteError", ["Porque o interpretador exige classes base em pacotes","Para impedir o uso de try/except"], "Uma hierarquia própria de exceções dá flexibilidade para capturas amplas ou cirúrgicas."),
          q("Como enriquecer uma exceção customizada com dados contextuais (ex: código e linha da falha)?", "Sobrescrevendo __init__ para aceitar parâmetros adicionais e salvá-los como atributos", ["Declarando variáveis globais","Criando um arquivo CSV no construtor"], "Atributos adicionais facilitam logs estruturados e depuração automatizada."),
          q("Qual método especial podemos sobrescrever para personalizar a mensagem exibida no traceback?", "__str__() (ou passar a mensagem formatada para super().__init__(msg))", ["__repr__() apenas","__print__()"], "super().__init__(mensagem) repassa a string que será exibida como descrição padrão da falha."),
          t("Qual classe ancestral comum une ValueError e FileNotFoundError em Python?", ["Exception"], "Tanto ValueError quanto OSError herdam da classe raiz Exception.", "# ancestral comum: Exception"),
          g("Complete a declaração de uma exceção personalizada de validação:", ["class SaldoInsuficienteError(Exception):"], "Classes de exceção customizadas herdam de Exception.", "____\n    pass"),
          o("Ordene a definição e uso de uma exceção de domínio personalizada:", ["Definir a classe class PedidoInvalidoError(Exception): pass","Validar as regras de negócio nos métodos da aplicação","Se uma regra for violada, disparar raise PedidoInvalidoError(\"Motivo\")","O cliente da aplicação captura a exceção em bloco except específico"], "Ciclo completo de modelagem, disparo e captura de exceções de domínio."),
          p("Associe elemento de exceção customizada ao seu papel:", [["class MeuError(Exception)","Declara novo tipo de erro rastreável"],["super().__init__(msg)","Inicializa a mensagem padrão da exceção"],["self.codigo = 404","Armazena metadados estruturados para diagnóstico"],["raise MeuError()","Interrompe o fluxo disparando a falha de domínio"]], "Componentes de classes de exceção idiomáticas em Python.")
        ]
      },
      {
        id: "py-arq-5-5-projeto-resiliencia-arquivos",
        title: "Projeto: leitor resiliente de configurações com retentativas",
        subtitle: "Consolidação · Tolerância a falhas transitórias em arquivos",
        theory: "Neste projeto prático, construímos uma rotina resiliente de leitura de arquivos sujeitos a concorrência e falhas transitórias de I/O. O algoritmo captura PermissionError e FileNotFoundError, implementa retentativas com intervalo (backoff) e lança exceções de domínio consolidadas se o limite esgotar.",
        questions: [
          q("O que caracteriza uma falha de I/O \"transitória\" em sistemas com concorrência?", "Um erro temporário (ex: arquivo bloqueado por outro processo) que se resolve em milissegundos", ["Um defeito permanente no circuito da placa-mãe","Um erro de sintaxe no código"], "Bloqueios momentâneos de leitura/escrita são frequentes em ambientes multitarefa."),
          q("Qual padrão de software é ideal para tolerar bloqueios transitórios de arquivos?", "Retry com backoff (tentar novamente após uma pequena pausa calculada)", ["Ignorar o erro e retornar None","Reiniciar o computador"], "Dar tempo para o outro processo liberar o arquivo é a solução clássica e robusta."),
          q("Qual função da biblioteca padrão é utilizada para pausar a execução entre tentativas?", "time.sleep(segundos)", ["sys.wait()","os.pause()"], "time.sleep() suspende temporariamente a thread liberando a CPU para outros processos."),
          q("O que deve acontecer se o número máximo de retentativas for esgotado sem sucesso?", "Lançar uma exceção explicativa informando que o limite de tentativas foi atingido", ["Travar o programa em laço infinito","Apagar o arquivo bloqueado"], "Falhar de forma transparente e controlada após esgotar as tentativas protege o sistema."),
          t("Quantas tentativas no máximo são executadas se definirmos max_tentativas = 3?", ["3"], "O algoritmo interrompe a rotina após esgotar as 3 execuções sem êxito.", "// limite de 3 tentativas"),
          g("Complete a captura resiliente de arquivo bloqueado para retentativa:", ["except PermissionError:"], "PermissionError captura bloqueios de concorrência no arquivo.", "try:\n    ler_arquivo()\n____\n    aguardar_retentativa()"),
          o("Ordene as etapas da rotina resiliente de leitura com retentativas:", ["Configurar contagem de tentativas = 0 e limite máximo permitido","Tentar ler o arquivo no bloco try com encoding=\"utf-8\"","Se ocorrer PermissionError, pausar com time.sleep() e tentar de novo","Se o limite for superado, levantar FalhaAcessoArquivoError consolidada"], "Arquitetura de resiliência e tolerância a falhas transitórias de I/O."),
          p("Associe elemento do padrão de retry à sua responsabilidade:", [["max_tentativas","Delimita o teto de repetições antes de desistir"],["time.sleep()","Introduz a pausa necessária para liberação do lock"],["PermissionError","Indica que o arquivo está em uso ou bloqueado"],["raise from","Preserva o último erro original ao disparar a desistência"]], "Componentes fundamentais de políticas de retentativa resiliente em Python.")
        ]
      }
    ],
    6: [
      {
        id: "py-arq-6-1-protocolo-context-manager",
        title: "O protocolo de context manager em Python",
        subtitle: "Apresentação · Métodos especiais __enter__ e __exit__",
        theory: "O gerenciador de contexto implementa o protocolo with por meio dos métodos __enter__() e __exit__(). __enter__() inicializa o recurso e seu retorno é atribuído à variável do as. Ao sair do bloco, __exit__() é invocado garantindo limpeza, mesmo em caso de exceções ou desvios do fluxo.",
        questions: [
          q("Quais dois métodos especiais uma classe deve implementar para suportar o comando with?", "__enter__() e __exit__()", ["__open__() e __close__()","__start__() e __stop__()"], "O protocolo de gerenciamento de contexto do Python exige a dupla __enter__ e __exit__."),
          q("O que acontece com o valor retornado pelo método __enter__()?", "É vinculado à variável especificada após a palavra-chave as (se houver)", ["É impresso no terminal","É descartado compulsoriamente"], "with Gerenciador() as recurso: atribui o retorno de __enter__() a recurso."),
          q("Quais argumentos o método __exit__() recebe obrigatoriamente em sua assinatura?", "self, exc_type, exc_val, exc_tb", ["Apenas self","self e uma mensagem de texto"], "__exit__ recebe o tipo da exceção, o valor do erro e o objeto traceback caso ocorra falha."),
          q("Como o método __exit__() pode sinalizar ao Python que a exceção ocorrida foi suprimida?", "Retornando True", ["Retornando None","Retornando False"], "Retornar True em __exit__ consome a exceção impedindo sua propagação para fora do with."),
          t("Quantos parâmetros além de self o método __exit__ recebe?", ["3"], "__exit__(self, exc_type, exc_val, exc_tb) recebe exatamente 3 parâmetros de exceção.", "# exc_type, exc_val, exc_tb"),
          g("Complete a definição do método de entrada do gerenciador de contexto:", ["def __enter__(self):"], "__enter__ prepara o recurso no início do bloco with.", "class Conexao:\n    ____\n        return self"),
          o("Ordene as etapas executadas pelo comando with em tempo de execução:", ["Instanciar a classe gerenciadora de contexto","Invocar o método __enter__() e vincular o retorno à variável as","Executar as instruções contidas no corpo do bloco with","Invocar compulsoriamente o método __exit__() liberando os recursos"], "Ciclo de vida determinístico de blocos gerenciados por with."),
          p("Associe argumento de __exit__ à sua informação de erro:", [["exc_type","Classe da exceção levantada (ou None se sucesso)"],["exc_val","Instância da exceção contendo a mensagem"],["exc_tb","Objeto de traceback com a pilha de chamadas"],["return True","Suprime a exceção impedindo propagação"]], "Parâmetros de controle de erros no método __exit__ de gerenciadores.")
        ]
      },
      {
        id: "py-arq-6-2-suprimindo-excecoes-exit",
        title: "Tratamento e supressão de exceções em __exit__",
        subtitle: "Prática · Decidindo a propagação de falhas",
        theory: "Dentro do método __exit__(), podemos inspecionar se ocorreu uma falha verificando se exc_type is not None. Se o gerenciador for capaz de tratar o erro com segurança, retornar True evita que a exceção suba a pilha. Se retornar False ou None, a exceção continuará sua propagação natural.",
        questions: [
          q("O que acontece se __exit__() retornar False após uma exceção dentro do bloco with?", "A exceção continua se propagando normalmente para fora do bloco with", ["A exceção é apagada","O programa trava em laço infinito"], "Qualquer retorno falso (incluindo None padrão) permite a propagação da exceção."),
          q("Como verificar dentro de __exit__() se o bloco with terminou sem nenhum erro?", "Checar if exc_type is None:", ["Checar if self.ok == True:","Checar if len(self) == 0:"], "Se nenhuma falha ocorreu no corpo do with, exc_type, exc_val e exc_tb são todos None."),
          q("Qual utilitário pronto da biblioteca standard suprime tipos específicos de exceção?", "contextlib.suppress(FileNotFoundError)", ["contextlib.ignore()","contextlib.skip()"], "contextlib.suppress captura e ignora com elegância as exceções especificadas."),
          q("Quando a supressão de exceções em __exit__ é considerada justificável?", "Em rotinas de descarte seguro, como ignorar ausência de arquivos temporários ao limpar", ["Para ocultar bugs de sintaxe do sistema","Em transações financeiras críticas"], "Suprimir erros intencionalmente deve ser restrito a falhas previstas e inócuas."),
          t("Qual booleano __exit__ deve retornar para suprimir a exceção (True ou False)?", ["True"], "Retornar True silencia formalmente a exceção perante o interpretador.", "# return True para suprimir"),
          g("Complete a verificação de ausência de falhas no encerramento do contexto:", ["if exc_type is None:"], "exc_type é None quando o bloco with executa com sucesso.", "def __exit__(self, exc_type, exc_val, exc_tb):\n    ____\n        self.confirmar()"),
          o("Ordene o fluxo quando uma exceção ocorre dentro de um bloco with:", ["A instrução no corpo do with levanta uma exceção (ex: ValueError)","O interpretador suspende o corpo e chama __exit__(ValueError, err, tb)","O método __exit__ executa a rotina de limpeza e rollback","Se __exit__ retornar False, a exceção é relançada para o chamador"], "Tratamento de exceções e liberação de recursos pelo protocolo with."),
          p("Associe cenário de __exit__ ao comportamento de propagação:", [["exc_type is None","Término bem-sucedido sem erros"],["__exit__ retorna True","Exceção tratada e suprimida no bloco"],["__exit__ retorna False","Exceção relançada para o chamador externo"],["contextlib.suppress","Gerenciador pronto que silencia erros declarados"]], "Padrões de propagação e supressão de erros em context managers.")
        ]
      },
      {
        id: "py-arq-6-3-decorador-contextmanager",
        title: "Gerenciadores concisos com @contextmanager",
        subtitle: "Prática · Transformando geradores em context managers",
        theory: "O decorador @contextlib.contextmanager permite criar gerenciadores de contexto a partir de uma função geradora simples com yield. O código antes do yield atua como __enter__(), o valor entregue é vinculado ao as e o bloco após o yield (em try/finally) atua como __exit__().",
        questions: [
          q("De qual módulo padrão importamos o decorador @contextmanager?", "contextlib", ["functools","itertools"], "contextlib reúne utilitários para gerenciamento de contexto idiomático."),
          q("Em uma função decorada com @contextmanager, o que o código antes do yield representa?", "A lógica de inicialização equivalente ao método __enter__()", ["A lógica de encerramento de __exit__()","O nome do arquivo"], "Tudo o que precede o yield prepara o recurso a ser utilizado no bloco with."),
          q("Por que é essencial envolver o yield em um bloco try/finally dentro da função?", "Para garantir que o código de limpeza do finally execute mesmo se o bloco with falhar", ["Porque a PEP 8 proíbe yield isolado","Para converter o retorno em lista"], "Se ocorrer uma exceção dentro do with, o finally garante a liberação dos recursos."),
          q("Quantas instruções yield uma função decorada com @contextmanager pode conter?", "Exatamente um yield", ["Quantos yields forem necessários","Zero"], "O gerenciador de contexto possui um único ponto de entrada e um de saída por ciclo."),
          t("Quantos yields uma função geradora de @contextmanager deve executar por invocação?", ["1"], "A execução pausa no único yield entregando o recurso e retoma na saída.", "# exatamente 1 yield"),
          g("Complete o decorador para criar gerenciador de contexto a partir de gerador:", ["@contextlib.contextmanager"], "contextmanager transforma a função em context manager.", "import contextlib\n____\ndef recurso():\n    yield"),
          o("Ordene as etapas de um context manager criado com @contextmanager:", ["Executar a inicialização antes do yield (alocar recurso)","Executar o yield entregando o recurso para a variável do as","O código do bloco with do usuário é executado","Retomar após o yield no bloco finally executando a limpeza"], "Ciclo de vida de gerenciadores de contexto baseados em geradores."),
          p("Associe seção da função com @contextmanager à sua função:", [["Código antes do yield","Equivalente a __enter__(): aloca o recurso"],["yield recurso","Entrega o objeto para o as do bloco with"],["bloco finally pós-yield","Equivalente a __exit__(): garante a liberação"],["@contextmanager","Decorador utilitário do módulo standard contextlib"]], "Estrutura de context managers funcionais com contextlib.")
        ]
      },
      {
        id: "py-arq-6-4-multiplos-contextos-exitstack",
        title: "Múltiplos contextos e contextlib.ExitStack",
        subtitle: "Aprofundamento · Gerenciando coleções dinâmicas de recursos",
        theory: "Python permite combinar múltiplos gerenciadores em um único with: with open(\"a\") as fa, open(\"b\") as fb:. Quando a quantidade de arquivos ou recursos é dinâmica (desconhecida em tempo de escrita), contextlib.ExitStack permite empilhar contextos programaticamente com garantia de fechamento inverso.",
        questions: [
          q("Como abrir dois arquivos simultaneamente em um único bloco with em Python?", "with open(\"a.txt\") as f1, open(\"b.txt\") as f2:", ["with open(\"a.txt\") and open(\"b.txt\"):","with [open(\"a\"), open(\"b\")]:"], "Gerenciadores separados por vírgula são encadeados em um único comando with."),
          q("Qual classe de contextlib gerencia uma quantidade dinâmica de contextos aberta em laço?", "contextlib.ExitStack", ["contextlib.MultiContext","contextlib.ContextList"], "ExitStack mantém uma pilha de contextos e garante o encerramento em ordem reversa LIFO."),
          q("Em qual ordem os recursos gerenciados por ExitStack são fechados ao sair?", "Ordem inversa à abertura (LIFO - Last In, First Out)", ["Ordem aleatória","Todos ao mesmo milissegundo"], "Fechar na ordem inversa evita que recursos dependentes percam suas bases precocemente."),
          q("Qual método de ExitStack registra e entra em um novo gerenciador de contexto dinâmico?", "stack.enter_context(gerenciador)", ["stack.push(gerenciador)","stack.add(gerenciador)"], "enter_context() invoca __enter__() no objeto e registra seu __exit__() na pilha."),
          t("Quantos arquivos no mínimo podem ser abertos dinamicamente com ExitStack?", ["0"], "ExitStack opera com qualquer quantidade de recursos, de zero a milhares.", "# flexibilidade de zero a N recursos"),
          g("Complete o registro dinâmico de um arquivo na pilha com ExitStack:", ["stack.enter_context(open(caminho))"], "enter_context abre e agenda o fechamento automático.", "with contextlib.ExitStack() as stack:\n    f = ____"),
          o("Ordene a abertura de 10 arquivos dinâmicos com ExitStack:", ["Criar o gerenciador mestre com with contextlib.ExitStack() as stack:","Percorrer a lista de 10 caminhos com um laço for caminho in caminhos:","Abrir e registrar cada arquivo com stack.enter_context(open(caminho))","Ao sair do with, ExitStack fecha os 10 arquivos na ordem inversa"], "Abertura programática e liberação confiável com ExitStack."),
          p("Associe ferramenta de múltiplos contextos ao seu caso de uso:", [["with A as a, B as b","Quantidade fixa e pequena de contextos conhecidos"],["ExitStack()","Quantidade dinâmica ou programática de recursos"],["enter_context(c)","Abre e empilha o contexto na pilha de saída"],["callback(funcao)","Agenda função de limpeza arbitrária na saída"]], "Padrões de composição de múltiplos recursos em Python.")
        ]
      },
      {
        id: "py-arq-6-5-projeto-contexto-cronometro",
        title: "Projeto: gerenciador de tempo e transações seguras",
        subtitle: "Consolidação · Construindo gerenciadores para auditoria e rollback",
        theory: "Neste projeto prático, criamos dois gerenciadores de contexto essenciais: Cronometro para medir tempo de execução com precisão de microssegundos via time.perf_counter(), e TransacaoArquivo que grava alterações em arquivo temporário e só efetua o commit no destino se nenhuma exceção ocorrer no bloco.",
        questions: [
          q("Qual função de medição temporal é recomendada para benchmarking em Python?", "time.perf_counter()", ["time.time()","time.clock()"], "perf_counter() utiliza o relógio de maior resolução disponível imune a ajustes de fuso horário."),
          q("Como o gerenciador TransacaoArquivo garante atomicidade na gravação?", "Escrevendo em arquivo temporário e aplicando os.replace() atômico apenas ao sair sem erros", ["Gravando metade dos dados a cada segundo","Desligando o antivírus"], "Se o bloco with falhar, o temporário é excluído e o arquivo original permanece intocado."),
          q("Qual função da biblioteca os realiza substituição atômica de arquivos no sistema operacional?", "os.replace(origem, destino)", ["os.swap(origem, destino)","os.move_force()"], "os.replace substitui o destino de forma atômica na maioria dos sistemas de arquivos modernos."),
          q("O que o context manager Cronometro deve fazer ao término do bloco?", "Calcular tempo_final - tempo_inicial e disponibilizar o delta em segundos", ["Imprimir o histórico de chamadas em PDF","Reiniciar o computador"], "Disponibilizar a duração permite auditar gargalos de desempenho em seções específicas."),
          t("Quantos segundos tem 1000 milissegundos medidos pelo cronômetro?", ["1"], "1000 milissegundos equivalem exatamente a 1 segundo.", "# 1000 ms = 1 s"),
          g("Complete o cálculo da duração decorrida no context manager de tempo:", ["self.duracao = time.perf_counter() - self.inicio"], "Calcula o tempo total decorrido durante o bloco.", "def __exit__(self, *args):\n    ____"),
          o("Ordene o fluxo de uma transação de arquivo atômica com context manager:", ["Criar arquivo temporário no mesmo disco do arquivo de destino","Entregar o descritor do temporário para escrita no corpo do with","O bloco executa cálculos e gravações; nenhuma exceção ocorre","No __exit__, fechar o temporário e executar os.replace() atômico"], "Arquitetura de persistência atômica com garantia de rollback automático."),
          p("Associe gerenciador de contexto ao seu propósito no projeto:", [["Cronometro()","Mede a duração exata do bloco com perf_counter"],["TransacaoArquivo()","Garante persistência atômica com rollback"],["os.replace()","Substituição atômica no sistema de arquivos"],["perf_counter()","Relógio monotônico de alta precisão do sistema"]], "Gerenciadores de contexto avançados para auditoria e transações.")
        ]
      }
    ],
    7: [
      {
        id: "py-arq-7-1-modulos-proprios-import",
        title: "Criando e importando módulos próprios",
        subtitle: "Apresentação · Organizando funções e classes em arquivos .py",
        theory: "Um módulo em Python é qualquer arquivo com extensão .py. Funções, classes e constantes definidas nele são reutilizadas em outros scripts via instrução import modulo ou from modulo import funcao. Ao ser importado pela primeira vez, o Python executa o arquivo e compila o bytecode em __pycache__.",
        questions: [
          q("O que constitui formalmente um módulo no ecossistema Python?", "Qualquer arquivo com extensão .py contendo definições de código Python", ["Uma pasta compactada em zip","Uma função com mais de 100 linhas"], "Qualquer arquivo Python válido pode ser importado diretamente como módulo."),
          q("Qual é a diferença entre import utilitarios e from utilitarios import formatar?", "import traz o módulo como namespace; from...import insere o símbolo no escopo local", ["from...import apaga o arquivo do disco","import utilitarios só lê variáveis"], "Usar import modulo preserva o namespace explícito (ex: utilitarios.formatar())."),
          q("Para que serve o diretório __pycache__ gerado automaticamente pelo Python?", "Armazena arquivos .pyc compilados para bytecode para acelerar importações futuras", ["Armazena fotos e arquivos estáticos","Guarda backups de versões antigas"], "O bytecode evita a necessidade de reanalisar o código-fonte se o arquivo não tiver sido alterado."),
          q("O que acontece se importarmos o mesmo módulo 10 vezes em diferentes partes do programa?", "O Python executa o módulo apenas uma vez, reutilizando a referência em sys.modules", ["Executa o código do módulo 10 vezes","Gera um erro de importação duplicada"], "sys.modules armazena módulos já carregados garantindo carregamento singleton eficiente."),
          t("Qual extensão identifica um arquivo compilado de bytecode na pasta __pycache__?", [".pyc"], "Arquivos com extensão .pyc contêm o bytecode compilado pelo interpretador.", "# extensão: .pyc"),
          g("Complete a importação seletiva da função calcular do módulo matematicas:", ["from matematicas import calcular"], "from ... import extrai o identificador diretamente para o escopo atual.", "____\nresultado = calcular(10)"),
          o("Ordene as etapas da importação de um módulo pela primeira vez:", ["Localizar o arquivo .py correspondente no diretório ou sys.path","Compilar o código-fonte em bytecode gerando o arquivo .pyc","Executar as instruções do módulo criando seu namespace interno","Armazenar o módulo em sys.modules e disponibilizar a referência"], "Ciclo de busca, compilação, execução e cache de módulos em Python."),
          p("Associe formato de importação ao seu efeito no escopo:", [["import modulo","Acessa símbolos através do prefixo modulo.nome"],["from modulo import x","Traz o símbolo x diretamente para o escopo local"],["from modulo import *","Importa símbolos públicos poluindo o escopo local"],["import modulo as m","Cria um alias conveniente para o namespace do módulo"]], "Padrões de importação de módulos em Python.")
        ]
      },
      {
        id: "py-arq-7-2-pacotes-e-init",
        title: "Pacotes e o papel de __init__.py",
        subtitle: "Prática · Agrupando módulos em diretórios hierárquicos",
        theory: "Um pacote é um diretório contendo múltiplos módulos e tradicionalmente um arquivo especial __init__.py. Esse arquivo é executado na inicialização do pacote, permitindo expor uma API limpa na raiz, agregar submarcas e controlar quais módulos internos são carregados automaticamente.",
        questions: [
          q("Qual arquivo especial identifica tradicionalmente uma pasta como um pacote em Python?", "__init__.py", ["__main__.py","package.json"], "__init__.py sinaliza ao sistema de importação que o diretório deve ser tratado como pacote."),
          q("Quando o código dentro do arquivo __init__.py de um pacote é executado?", "Automaticamente no instante em que o pacote ou qualquer submódulo é importado", ["Apenas quando o usuário clica no arquivo","Apenas no build de produção"], "__init__.py serve como rotina de inicialização e configuração do namespace do pacote."),
          q("Como o arquivo __init__.py pode simplificar o uso de uma biblioteca para clientes externos?", "Expondo classes internas diretamente na raiz: from .servico import ServicoCliente", ["Apagando os arquivos das subpastas","Bloqueando o acesso aos módulos"], "Permite que usuários façam import pacote e acessem classes sem conhecer a estrutura de pastas."),
          q("O que acontece se um arquivo __init__.py estiver completamente vazio?", "O diretório ainda é reconhecido como pacote válido sem executar inicialização extra", ["O pacote é considerado inválido","O Python gera um SyntaxError"], "Um __init__.py vazio é perfeitamente válido e muito comum em projetos Python."),
          t("Quantos caracteres sublinhados (underscores) compõem o nome de __init__.py?", ["4"], "Dois no início e dois no final, somando 4 caracteres sublinhados.", "# __init__.py (2 antes, 2 depois)"),
          g("Complete a exportação na raiz do pacote via __init__.py:", ["from .cliente import Cliente"], "Expõe o símbolo na raiz do pacote para importação direta.", "# em __init__.py\n____"),
          o("Ordene a estrutura hierárquica de um pacote Python típico no disco:", ["Diretório raiz do projeto contendo o ambiente virtual e README","Diretório do pacote principal (ex: meupacote/)","Arquivo de inicialização meupacote/__init__.py","Submódulos especializados como meupacote/modelos.py e utils.py"], "Anatomia e organização estrutural de pacotes em Python."),
          p("Associe elemento de pacote ao seu papel funcional:", [["meupacote/","Diretório que agrupa módulos sob o mesmo namespace"],["__init__.py","Inicializador do pacote e definidor da API pública"],["subpacote/","Pacote aninhado dentro de outro diretório de pacote"],["API pública","Conjunto de classes e funções destinadas ao uso externo"]], "Elementos fundamentais da organização de pacotes em Python.")
        ]
      },
      {
        id: "py-arq-7-3-guarda-main-e-name",
        title: "A variável __name__ e a guarda de execução direta",
        subtitle: "Prática · if __name__ == \"__main__\": para scripts reutilizáveis",
        theory: "A variável especial __name__ indica como o módulo está sendo executado. Se o arquivo for rodado diretamente via terminal, __name__ vale \"__main__\". Se for importado por outro script, __name__ recebe o nome do módulo. O bloco if __name__ == \"__main__\": permite criar arquivos que funcionam tanto como biblioteca quanto como executáveis.",
        questions: [
          q("Qual é o valor da variável built-in __name__ quando o arquivo é executado diretamente via terminal?", "\"__main__\"", ["\"__module__\"","O nome do arquivo"], "O interpretador atribui a string \"__main__\" ao módulo que serviu de ponto de entrada da execução."),
          q("Qual é o valor de __name__ quando o arquivo util.py é importado por outro script?", "\"util\"", ["\"__main__\"","\"imported\""], "Ao ser importado, __name__ reflete o nome do módulo pelo qual ele foi referenciado."),
          q("Por que a guarda if __name__ == \"__main__\": é fundamental em scripts Python?", "Impede que testes ou rotinas de execução direta rodem acidentalmente quando o módulo for importado", ["Acelera a execução do script em 10 vezes","Evita vazamento de memória"], "Permite que o arquivo sirva como biblioteca importável sem disparar efeitos colaterais."),
          q("Qual é a boa prática recomendada para o código dentro de if __name__ == \"__main__\":?", "Chamar uma função principal main() isolando as variáveis do escopo global do módulo", ["Colocar todo o código solto em variáveis globais","Chamar sys.exit(1) sempre"], "Encapsular em def main(): evita a poluição do namespace do módulo com variáveis residuais."),
          t("Qual string exata __name__ contém no script disparado diretamente?", ["__main__"], "__main__ é o identificador reservado para o ponto de partida do processo.", "# valor de __name__: \"__main__\""),
          g("Complete a guarda canônica de execução direta em Python:", ["if __name__ == \"__main__\":"], "Garante que o bloco só execute quando o script for chamado diretamente.", "____\n    main()"),
          o("Ordene a trajetória da variável __name__ durante a importação:", ["O usuário executa no terminal: python app.py","O Python define __name__ = \"__main__\" para o arquivo app.py","O script app.py executa a linha import servico","O interpretador define __name__ = \"servico\" durante a execução de servico.py"], "Ciclo de atribuição e diferenciação da variável mágica __name__."),
          p("Associe cenário de execução ao valor de __name__:", [["Executado via python script.py","__name__ == \"__main__\""],["Carregado via import script","__name__ == \"script\""],["Módulo dentro de pacote","__name__ == \"pacote.script\""],["def main()","Função canônica chamada dentro da guarda"]], "Comportamento da variável de contexto de execução __name__ em Python.")
        ]
      },
      {
        id: "py-arq-7-4-controle-all-exportacoes",
        title: "Controlando exportações com __all__",
        subtitle: "Aprofundamento · Definindo a interface pública do módulo",
        theory: "A variável de módulo __all__ define a lista oficial de símbolos públicos exportados quando alguém utiliza a sintaxe from modulo import *. Símbolos omitidos de __all__ permanecem privados ao módulo em importações curinga, promovendo encapsulamento e evitando que imports auxiliares vazem para quem consome.",
        questions: [
          q("Qual é o tipo de dado esperado para a variável especial de módulo __all__?", "Uma lista ou tupla de strings contendo os nomes dos identificadores públicos", ["Um dicionário de funções","Um booleano"], "__all__ recebe strings com os nomes exatos de classes, funções e constantes exportadas."),
          q("O que acontece se alguém executar from modulo import * e o módulo definir __all__ = [\"A\", \"B\"]?", "Apenas os identificadores \"A\" e \"B\" serão importados para o escopo local", ["Todos os símbolos serão importados normalmente","Ocorre um erro de sintaxe"], "__all__ atua como filtro estrito para importações com curinga asterisco."),
          q("Qual convenção de nomenclatura em Python sinaliza informalmente que um símbolo é privado?", "Prefixo de sublinhado simples: _funcao_privada", ["Sufixo com ponto de exclamação","Todas as letras maiúsculas"], "Por padrão, símbolos iniciados com sublinhado são ignorados por from modulo import *."),
          q("O que a definição de __all__ = [] vazia provoca em uma importação from modulo import *?", "Nenhum símbolo é exportado para o escopo chamador", ["Apaga todos os objetos do módulo","Provoca ImportError imediato"], "Uma lista vazia blinda o módulo contra qualquer vazamento via importação curinga."),
          t("Quantos símbolos serão importados com from m import * se __all__ tiver 3 nomes?", ["3"], "Apenas os 3 identificadores listados em __all__ entram no escopo.", "# 3 símbolos autorizados em __all__"),
          g("Complete a definição da lista oficial de exportações públicas do módulo:", ["__all__ = [\"Servico\", \"criar_servico\"]"], "__all__ restringe a API exportada em importações com curinga.", "____\n\nclass Servico:\n    pass"),
          o("Ordene os critérios de decisão sobre quais símbolos incluir em __all__:", ["Identificar a funcionalidade central que a biblioteca promete oferecer","Listar as classes e funções primárias destinadas ao usuário final","Excluir módulos utilitários importados internamente e funções auxiliares","Declarar a lista __all__ no topo do arquivo com as strings dos nomes"], "Critérios de design de API pública limpa com a variável __all__."),
          p("Associe mecanismo de exportação à sua característica:", [["__all__ = [...]","Lista explícita de nomes exportados por import *"],["Prefixo _nome","Convenção de privacidade; ignorado por import *"],["from m import *","Importação curinga governada pela lista __all__"],["import m.nome","Acesso direto por namespace sem influência de __all__"]], "Padrões de encapsulamento e controle de exportações em módulos Python.")
        ]
      },
      {
        id: "py-arq-7-5-sys-path-e-pythonpath",
        title: "Resolução de módulos: sys.path e PYTHONPATH",
        subtitle: "Aprofundamento · Onde o Python procura o que você importa",
        theory: "Ao executar uma instrução import, o interpretador busca o módulo em uma lista ordenada de diretórios armazenada em sys.path. Essa lista inclui o diretório do script atual, caminhos configurados na variável de ambiente PYTHONPATH e o diretório de pacotes instalados site-packages.",
        questions: [
          q("Em qual lista do módulo sys o Python armazena os diretórios onde pesquisa módulos?", "sys.path", ["sys.modules_dir","sys.locations"], "sys.path é uma lista de strings contendo os caminhos do sistema de arquivos consultados na ordem."),
          q("Qual diretório sempre ocupa o índice zero (primeira posição) em sys.path?", "O diretório que contém o script inicial disparado no terminal (ou diretório atual)", ["A pasta raiz do disco C:","O diretório de bibliotecas do CPython"], "Permite importar módulos irmãos localizados na mesma pasta do script principal de forma imediata."),
          q("Qual variável de ambiente do sistema operacional permite adicionar pastas extras ao sys.path?", "PYTHONPATH", ["PYTHONHOME","PATH_MODULES"], "PYTHONPATH define diretórios adicionais inseridos no sys.path antes dos pacotes de terceiros."),
          q("Qual é o perigo de manipular sys.path.append() diretamente no código de produção?", "Torna a aplicação frágil, dependente de caminhos específicos da máquina do desenvolvedor", ["Danifica o interpretador Python","Desativa as funções nativas"], "Alterações manuais de sys.path mascaram problemas estruturais de empacotamento do projeto."),
          t("Qual índice da lista sys.path é consultado primeiro na busca por um módulo?", ["0"], "A busca é sequencial da esquerda para a direita, iniciando no índice 0.", "# sys.path[0] é a primeira pasta consultada"),
          g("Complete a inspeção da lista de diretórios de busca de módulos:", ["import sys\nprint(sys.path)"], "sys.path expõe a lista de caminhos de resolução de importações.", "____ // exibe pastas de busca"),
          o("Ordene as etapas do algoritmo de busca de módulos executado pelo Python:", ["Verificar se o módulo já foi carregado no dicionário de cache sys.modules","Consultar os módulos embutidos nativos (built-in modules como sys e math)","Percorrer sequencialmente cada pasta registrada na lista sys.path","Se o arquivo não for encontrado em nenhuma pasta, levantar ModuleNotFoundError"], "Mecanismo completo de resolução e carregamento de módulos em Python."),
          p("Associe elemento do sistema de resolução ao seu papel:", [["sys.path","Lista ordenada de diretórios onde módulos são pesquisados"],["sys.modules","Dicionário de cache com módulos já importados em memória"],["PYTHONPATH","Variável de ambiente para injetar pastas no sys.path"],["ModuleNotFoundError","Exceção lançada quando o módulo não existe no sys.path"]], "Componentes fundamentais da infraestrutura de importação do CPython.")
        ]
      }
    ],
    8: [
      {
        id: "py-importacao-circular",
        title: "Importação circular e técnicas de resolução",
        subtitle: "Arquitetura · Quebrando ciclos de dependência entre módulos",
        theory: "Importações circulares ocorrem quando dois módulos importam um ao outro durante o carregamento inicial. Em Python, isso provoca erros como ImportError ou AttributeError antes que as definições sejam registradas. Soluções incluem importar no corpo da função ou refatorar o código compartilhado.",
        questions: [
          q("O que caracteriza uma dependência ou importação circular?", "Módulo A importa módulo B, enquanto módulo B importa módulo A", ["Dois módulos importando a biblioteca math","Um módulo com mais de 50 funções"], "Ciclos de importação criam um impasse temporal na resolução dos símbolos pelo interpretador."),
          q("Qual erro comum costuma denunciar uma importação circular incompleta?", "AttributeError: partially initialized module has no attribute", ["ZeroDivisionError: division by module","KeyError: symbol not found"], "O Python cria o módulo no cache sys.modules antes de terminar de executar seu corpo."),
          q("Qual técnica simples pode resolver uma importação circular sem reestruturação imediata?", "Mover a instrução import para dentro da função que efetivamente usa o recurso", ["Trocar a extensão .py por .txt","Usar sys.exit() no topo do módulo"], "Importar dentro da função atrasa a resolução para o momento da chamada, quebrando o ciclo."),
          q("Qual é a solução arquitetural ideal para eliminar importações circulares permanentemente?", "Extrair tipos e funções compartilhadas para um terceiro módulo comum", ["Duplicar todo o código fonte nos dois arquivos","Executar o interpretador com flags de debug"], "A extração para um módulo compartilhado estabelece uma hierarquia limpa e unidirecional."),
          t("Qual instrução em Python permite importar um símbolo específico de um módulo?", ["from"], "Sintaxe: from modulo import simbolo.", "# importa simbolo do modulo externo"),
          g("Complete o import tardio dentro da função para evitar ciclo na inicialização:", ["def exportar_relatorio(dados):\n    import relatorios\n    return relatorios.gerar(dados)"], "O import ocorre apenas quando a função for chamada.", "def exportar_relatorio(dados):\n    ____\n    return relatorios.gerar(dados)"),
          o("Ordene as etapas recomendadas para diagnosticar e eliminar um ciclo de importação:", ["Analisar a mensagem de partially initialized module no traceback de erro","Identificar quais símbolos do módulo A são necessários dentro do módulo B","Avaliar se o import pode ser adiado para o escopo local de um método","Refatorar classes e constantes comuns para um módulo compartilhado neutro"], "Fluxo arquitetural para sanar dependências circulares de forma definitiva."),
          p("Associe a estratégia de importação à sua indicação de uso:", [["Import local (dentro de função)","Solução pontual para contornar ciclo de dependência"],["Módulo comum compartilhado","Refatoração definitiva para desacoplar componentes"],["Import no topo do arquivo","Padrão recomendado para dependências normais e lineares"],["TYPE_CHECKING do módulo typing","Importações exclusivas para checagem estática de tipos"]], "Técnicas de arquitetura para organização de dependências em Python.")
        ]
      },
      {
        id: "py-lazy-import",
        title: "Importação tardia (lazy import) e inicialização",
        subtitle: "Performance · Carregando módulos pesados sob demanda",
        theory: "Importação tardia consiste em importar uma biblioteca apenas dentro da função ou método que a consome, e não no topo do arquivo. Esse padrão reduz drasticamente o tempo de inicialização de CLIs e ferramentas de linha de comando, além de economizar memória quando funcionalidades opcionais não são acionadas.",
        questions: [
          q("Qual é o benefício primário de aplicar lazy imports em ferramentas de terminal (CLI)?", "Acelerar o tempo de resposta inicial dos comandos que não precisam de módulos pesados", ["Garantir que o código nunca lance exceções","Aumentar o tamanho do arquivo executável compilado"], "Bibliotecas como pandas ou torch demoram centenas de milissegundos para carregar no topo."),
          q("O que acontece se uma biblioteca importada sob demanda falhar com ModuleNotFoundError?", "O erro será disparado apenas quando a funcionalidade específica for executada pelo usuário", ["O script falha antes mesmo de ler os argumentos da CLI","O interpretador ignora o erro e continua silenciosamente"], "Permite oferecer funcionalidades opcionais sem exigir que todos os usuários instalem os pacotes."),
          q("Por que não se deve usar lazy import indiscriminadamente em todas as funções?", "Pode mascarar erros de dependências ausentes até horas após o início da aplicação", ["Porque o Python cobra mais memória por imports locais","Porque o import local desativa o coletor de lixo"], "Imports no topo garantem falha precoce (fail-fast) ao subir serviços de backend."),
          q("Após a primeira importação dentro de uma função, o que o Python faz nas chamadas seguintes?", "Reaproveita o módulo já compilado em memória através do cache sys.modules", ["Recompila o módulo do zero a cada execução","Lança um aviso de importação duplicada"], "A busca no sistema de arquivos ocorre apenas uma única vez por processo."),
          t("Qual dicionário embutido em sys armazena o cache de módulos já carregados?", ["sys.modules"], "sys.modules guarda referências para todos os módulos importados.", "# cache global de modulos em memoria"),
          g("Complete a verificação de módulo opcional usando import sob demanda:", ["try:\n    import pandas as pd\nexcept ImportError:\n    pd = None"], "Padrão para suportar dependências opcionais de forma graciosa.", "____ // tenta importar pandas ou atribui None"),
          o("Ordene o fluxo de execução de uma função com importação sob demanda:", ["A aplicação inicia rapidamente sem carregar a biblioteca pesada","O usuário invoca o comando ou função que necessita do módulo","A instrução de importação local é avaliada e o módulo entra no cache","As chamadas subsequentes à função acessam o módulo diretamente do cache"], "Ciclo de vida do carregamento sob demanda em tempo de execução."),
          p("Associe padrão de carregamento ao perfil adequado de aplicação:", [["Import no topo do arquivo","Microsserviços de backend que devem falhar precocemente"],["Lazy import em função","Comandos de CLI com subcomandos especializados e pesados"],["Import protegido por try/except","Funcionalidades opcionais com suporte a fallback elegante"],["sys.modules.get()","Inspeção dinâmica do cache de módulos carregados"]], "Padrões de carregamento e estratégias de inicialização de software.")
        ]
      },
      {
        id: "py-importlib-dinamico",
        title: "Módulo importlib: importação dinâmica e plugins",
        subtitle: "Metaprogramação · Carregando módulos e plugins em tempo de execução",
        theory: "A função importlib.import_module() permite importar um módulo Python usando uma string contendo seu nome durante a execução. Esse recurso é a base de arquiteturas de plugins e extensões dinâmicas, permitindo registrar novos componentes desacoplados sem modificar os arquivos principais do núcleo.",
        questions: [
          q("Qual função da biblioteca padrão permite importar um módulo a partir de uma string?", "importlib.import_module()", ["sys.load_string()","os.import_file()"], "importlib.import_module(\"meu_modulo\") carrega o módulo especificado dinamicamente."),
          q("Qual é o caso de uso mais consagrado para importação dinâmica via importlib?", "Arquiteturas de plugins e carregamento de drivers configuráveis via JSON/YAML", ["Cálculo de raízes quadradas","Ordenação de listas de números"], "Permite estender sistemas adicionando arquivos sem editar o código central."),
          q("Qual função embutida do Python permite inspecionar se um módulo importado possui determinado atributo?", "hasattr()", ["contains()","probe()"], "hasattr(modulo, \"executar\") confere se o plugin implementa a interface esperada."),
          q("Qual função recupera o valor de um atributo ou classe de um módulo pelo seu nome em string?", "getattr()", ["setattr()","fetch()"], "getattr(modulo, \"ClassePlugin\") obtém a referência da classe a partir de seu identificador."),
          t("Qual módulo padrão do Python fornece a função import_module?", ["importlib"], "importlib é o pacote oficial para interação programática com o sistema de imports.", "# importlib.import_module(nome)"),
          g("Complete o carregamento dinâmico de um plugin configurável:", ["import importlib\nmodulo = importlib.import_module(\"plugins.relatorio\")"], "importlib.import_module instancia o módulo indicado pela string.", "____ // importa dinamicamente o plugin de relatorio"),
          o("Ordene os passos para carregar e instanciar um plugin dinamicamente:", ["Ler o nome do plugin a partir de um arquivo de configuração ou argumento","Invocar importlib.import_module() para carregar o arquivo do plugin","Validar com hasattr() se o módulo possui a classe de plugin esperada","Obter a classe com getattr() e instanciar o objeto do plugin"], "Pipeline padrão de metaprogramação para sistemas de plugins em Python."),
          p("Associe a função de introspecção à sua respectiva finalidade:", [["importlib.import_module","Carrega um módulo Python em memória a partir de seu nome em string"],["hasattr","Verifica se um módulo ou objeto possui determinado método ou atributo"],["getattr","Retorna o atributo ou função do objeto a partir do nome em string"],["dir","Lista todos os atributos, métodos e funções expostos por um módulo"]], "Ferramentas de introspecção e metaprogramação na biblioteca padrão do Python.")
        ]
      },
      {
        id: "py-empacotamento-pyproject",
        title: "Estrutura de pacotes e pyproject.toml moderno",
        subtitle: "Distribuição · Padronizando configurações para build e publicação",
        theory: "O arquivo pyproject.toml centraliza metadados, dependências e configurações de build de um pacote Python conforme a especificação PEP 621. Ele substitui os antigos setup.py e setup.cfg por uma estrutura declarativa, portável e compatível com ferramentas como pip, build, hatchling e flit.",
        questions: [
          q("Qual é o formato do arquivo de configuração moderno padronizado pela PEP 518 e PEP 621?", "pyproject.toml", ["setup.json","package.yaml"], "pyproject.toml é o padrão unificado da comunidade Python moderna para empacotamento."),
          q("Qual seção do pyproject.toml define a ferramenta responsável por compilar o pacote (build backend)?", "[build-system]", ["[project-meta]","[runtime-env]"], "[build-system] declara requires = [\"hatchling\"] e build-backend = \"hatchling.build\"."),
          q("Qual seção do pyproject.toml armazena o nome do pacote, versão, autores e dependências?", "[project]", ["[python]","[settings]"], "[project] define metadados universais padronizados para instalação e publicação no PyPI."),
          q("Qual é a vantagem do formato TOML em relação a executar scripts Python como o antigo setup.py?", "Configuração declarativa e segura sem execução de código arbitrário durante a leitura", ["O TOML é executado diretamente na GPU","Gera executáveis binários nativos automaticamente"], "Arquivos declarativos podem ser inspecionados estaticamente sem riscos de segurança."),
          t("Qual extensão de arquivo é utilizada no arquivo de configuração pyproject?", [".toml"], "pyproject.toml usa a linguagem de configuração TOML.", "# formato pyproject.toml"),
          g("Complete a definição básica de build-system no pyproject.toml:", ["[build-system]\nrequires = [\"setuptools\"]\nbuild-backend = \"setuptools.build_meta\""], "Declaração padrão para backend de compilação em pacotes Python.", "____ // secao build-system com requires e build-backend"),
          o("Ordene a estrutura recomendada de diretórios de um projeto Python moderno com layout src:", ["Criar a pasta raiz contendo pyproject.toml, README.md e .gitignore","Criar a pasta src/ para abrigar o código fonte sem conflito de importação","Criar a subpasta do pacote src/meupacote/ com o arquivo __init__.py","Criar a pasta tests/ externa à pasta src/ para testes automatizados"], "Layout src recomendado pela Python Packaging Authority (PyPA)."),
          p("Associe a seção do pyproject.toml ao seu papel específico:", [["[build-system]","Declara quais ferramentas compilam a distribuição (wheel e sdist)"],["[project]","Define nome, versão, descrição, dependências e licença do pacote"],["[project.scripts]","Registra comandos de console executáveis instalados no PATH"],["[project.optional-dependencies]","Lista pacotes opcionais para grupos como dev, test e docs"]], "Anatomia das seções padronizadas de configuração em pyproject.toml.")
        ]
      },
      {
        id: "py-pipeline-integrada",
        title: "Projeto integrado: arquivos, dados e módulos",
        subtitle: "Síntese prática · Pipeline com leitura, tratamento e exceções",
        theory: "Uma pipeline de dados profissional integra leitura com gerenciador de contexto, parsing de formatos como CSV ou JSON, tratamento cirúrgico de exceções e divisão modular em submódulos coesos. Essa arquitetura garante resiliência a falhas parciais e facilita manutenções futuras com segurança.",
        questions: [
          q("Em uma pipeline de ingestão de arquivos, como garantir que falhas em registros individuais não interrompam todo o lote?", "Tratar exceções de conversão dentro do laço de iteração de cada registro", ["Desativar todas as validações de dados","Executar o programa como superusuário"], "Capturar ValueError por linha permite registrar em log a anomalia e prosseguir com os dados válidos."),
          q("Por que é essencial usar with open() ao processar múltiplos arquivos em lote?", "Para fechar imediatamente cada descritor de arquivo e não esgotar limites do sistema operacional", ["Para duplicar o arquivo no disco rígido","Para criptografar as linhas processadas"], "Sistemas operacionais limitam o número de arquivos abertos simultaneamente por processo."),
          q("Qual formato de saída estruturado na biblioteca padrão é ideal para persistir dados tabulares limpos?", "csv ou json", ["txt sem delimitador","executável binário"], "Módulos csv e json oferecem suporte nativo, estável e interoperável com outros ecossistemas."),
          q("Qual módulo da biblioteca padrão é ideal para registrar avisos, sucessos e falhas em uma pipeline?", "logging", ["print_raw","console_stdout"], "O módulo logging oferece níveis de severidade, timestamps e múltiplos destinos de saída."),
          t("Qual método do módulo logging registra uma mensagem de severidade informativa?", ["logging.info"], "logging.info() registra eventos normais de operação.", "# logging.info(\"Processamento concluido\")"),
          g("Complete o tratamento individual de registros corrompidos em lote:", ["for linha in leitor:\n    try:\n        processar(linha)\n    except ValueError as e:\n        logging.warning(f\"Ignorando linha invalida: {e}\")"], "Resiliência contra registros malformados mantendo o pipeline ativo.", "____ // laço com try/except capturando ValueError e logando warning"),
          o("Ordene os estágios arquiteturais de uma pipeline de processamento de arquivos:", ["Localizar e validar a existência dos arquivos de entrada com pathlib.Path","Abrir os arquivos com with open() especificando a codificação utf-8","Iterar sobre os registros validando tipos e capturando exceções específicas","Escrever os dados consolidados no arquivo de destino e fechar os recursos"], "Fluxo completo de engenharia de software para processamento robusto de arquivos."),
          p("Associe o componente arquitetural à sua responsabilidade na pipeline:", [["pathlib.Path","Resolução de caminhos, verificação de existência e criação de diretórios"],["with open(..., encoding=\"utf-8\")","Gerenciamento seguro de abertura e liberação de descritores"],["csv.DictReader / json.load","Parsing estruturado de dados a partir do fluxo de texto"],["logging.getLogger","Rastreamento auditável de eventos operacionais e anomalias"]], "Componentes fundamentais de uma pipeline de ingestão de dados em Python.")
        ]
      }
    ]
  });
})();
