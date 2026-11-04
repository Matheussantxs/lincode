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
  const existingU1 = ((window.LINCODE_CHAPTER_UNITS[lang][chId] && window.LINCODE_CHAPTER_UNITS[lang][chId][1]) || [])
    .filter((lesson) => lesson && lesson.id !== 'cpp-c01-u1-l5');

  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      ...existingU1,
      {
        id: 'cpp-c01-u1-l5',
        title: 'Do .cpp ao executável nativo',
        subtitle: 'Revisão e desafio · do .cpp ao executável nativo',
        theory: 'Transformar um arquivo .cpp em programa nativo passa por três etapas: o pré-processador expande diretivas #include, o compilador traduz cada unidade em código objeto (.o ou .obj) e o linker une esses objetos às bibliotecas para gerar o binário final que a CPU executa direto.',
        questions: [
          q(
            'No pipeline de build de motor.cpp, qual ferramenta resolve referências cruzadas entre motor.o e a biblioteca padrão para montar o executável?',
            'O linker (linkeditor)',
            ['O pré-processador textual', 'Um interpretador de bytecode em tempo real'],
            'O linker combina arquivos de código objeto (.o/.obj) e bibliotecas, resolvendo os endereços de funções externas para formar o executável.'
          ),
          g(
            'Complete o comando que compila apenas sensor.cpp até gerar o arquivo de código objeto sensor.o, sem acionar o linker:',
            '-c',
            'A flag -c instrui o compilador a parar após gerar o código objeto (.o), adiando a etapa de linkedição.',
            'g++ -std=c++20 ____ sensor.cpp -o sensor.o'
          ),
          q(
            'Se main.cpp chama a função calcularRota() declarada no cabeçalho mas nenhum arquivo .o contém sua definição, em qual etapa ocorre a falha?',
            'Na linkedição, com erro de referência indefinida para calcularRota()',
            ['No pré-processamento, antes de ler qualquer tipo C++', 'Apenas depois que o usuário digita dados durante a execução'],
            'Como a declaração existe, a compilação de main.o passa; porém o linker falha ao não encontrar o código de máquina de calcularRota().',
            'int calcularRota();\n\nint main() {\n    return calcularRota();\n}'
          ),
          t(
            'No Windows com o compilador MSVC, qual é a extensão padrão (com o ponto) de um arquivo de código objeto antes da linkedição?',
            ['.obj', 'obj'],
            'No ecossistema Windows/MSVC, arquivos objeto usam a extensão .obj, equivalente ao .o gerado em sistemas Linux e macOS.'
          ),
          o(
            'Ordene as etapas pelas quais turbina.cpp passa até virar um processo rodando no processador:',
            [
              'Pré-processar diretivas como #include na unidade de tradução',
              'Compilar o código C++ expandido em código objeto turbina.o',
              'Linkar turbina.o com as bibliotecas para produzir o binário nativo',
              'Carregar o executável na memória pelo sistema operacional para a CPU rodar'
            ],
            'O fluxo clássico C++ vai do pré-processador ao compilador (.o), depois ao linker (executável) e por fim ao carregador do sistema operacional.'
          ),
          p(
            'Associe cada artefato da cadeia de compilação de radar.cpp ao seu conteúdo técnico:',
            [
              ['radar.cpp', 'Código-fonte escrito pelo programador em C++ legível'],
              ['Unidade pré-processada (.ii)', 'Texto C++ puro após expandir cabeçalhos e remover comentários'],
              ['radar.o', 'Código de máquina parcial com símbolos externos ainda pendentes'],
              ['Binário executável radar', 'Programa nativo completo pronto para o sistema operacional iniciar']
            ],
            'Cada fase transforma a representação: texto-fonte (.cpp), unidade expandida (.ii), código objeto (.o) e executável final.'
          ),
          q(
            'Em um projeto com 40 arquivos .cpp, você alterou apenas o corpo de uma função dentro de freio.cpp. Qual é a vantagem da compilação separada em arquivos .o?',
            'Recompilar somente freio.cpp para freio.o e relinkar com os 39 objetos já prontos',
            ['Dispensar o linker, pois arquivos .o rodam direto no terminal', 'Evitar o pré-processamento de freio.cpp na nova compilação'],
            'A compilação incremental recompila apenas as unidades modificadas e reaproveita os demais arquivos .o na etapa de linkedição.'
          ),
          q(
            'Por que um binário C++ compilado nativamente para Linux x86_64 não executa diretamente em um Mac com chip ARM64?',
            'Porque o executável contém instruções de máquina e formato binário específicos do sistema e da arquitetura alvo',
            ['Porque o arquivo .cpp original precisa estar na mesma pasta do binário', 'Porque o C++ exige instalar uma máquina virtual multiplataforma para ler o binário'],
            'Binários nativos usam o conjunto de instruções da CPU (x86_64 vs ARM64) e o formato do sistema (ELF no Linux vs Mach-O no macOS).'
          )
        ]
      }
    ],
    2: [
      {
        id: 'cpp-c01-u2-l1',
        title: 'Os compiladores g++, clang++ e MSVC',
        subtitle: 'Apresentação · g++, clang++ e MSVC no dia a dia',
        theory: 'O C++ é definido por um padrão ISO e implementado por diferentes compiladores industriais. Os três principais são o g++ (coleção GCC, comum no Linux), o clang++ (projeto LLVM, padrão no macOS e ferramentas modernas) e o MSVC (comando cl.exe do Visual Studio no Windows).',
        questions: [
          q(
            'Qual comando do projeto LLVM compila código C++ e já vincula automaticamente a biblioteca padrão de C++?',
            'clang++',
            ['javac', 'rustc'],
            'O driver clang++ compila arquivos C++ usando a infraestrutura LLVM e conecta por padrão a biblioteca padrão de C++.'
          ),
          q(
            'Por que é preferível invocar g++ em vez de gcc ao compilar e linkar um programa escrito em C++ no Linux?',
            'Porque o g++ vincula automaticamente a biblioteca padrão de C++ (libstdc++) na etapa de linkedição',
            ['Porque o gcc só aceita arquivos salvos em discos formatados em FAT32', 'Porque o g++ converte o código C++ em scripts interpretados sem gerar binário'],
            'Embora o GCC reconheça arquivos .cpp, o comando gcc não linka a libstdc++ por padrão, enquanto o g++ faz isso automaticamente.'
          ),
          g(
            'Complete o comando no Prompt de Desenvolvedor do Visual Studio para compilar painel.cpp com o compilador MSVC:',
            ['cl', 'cl.exe'],
            'No ecossistema Microsoft Visual C++ (MSVC), o executável do compilador e driver de linha de comando chama-se cl (cl.exe).',
            '____ /EHsc painel.cpp'
          ),
          t(
            'Qual comando da GNU Compiler Collection é o driver padrão para compilar programas C++ no terminal Linux?',
            'g++',
            'O comando g++ é o driver de C++ do GCC (GNU Compiler Collection).'
          ),
          p(
            'Relacione cada compilador ou referência de C++ à sua origem principal:',
            [
              ['g++', 'Driver de C++ integrante da GNU Compiler Collection (GCC)'],
              ['clang++', 'Frontend C++ construído sobre a arquitetura modular LLVM'],
              ['cl.exe (MSVC)', 'Compilador oficial da Microsoft distribuído com o Visual Studio'],
              ['Padrão ISO C++', 'Especificação técnica internacional que todos os três seguem']
            ],
            'g++ (GCC), clang++ (LLVM) e cl.exe (MSVC) são implementações independentes que seguem a mesma norma ISO C++.'
          ),
          o(
            'Ordene os passos para verificar se o g++ está instalado e compilar um teste rápido ola.cpp no Linux:',
            [
              'Abrir o terminal e consultar a versão instalada com g++ --version',
              'Salvar o arquivo-fonte ola.cpp com a função int main()',
              'Executar o compilador g++ passando o arquivo ola.cpp',
              'Rodar o binário gerado no diretório atual para conferir a saída'
            ],
            'Primeiro valida-se a disponibilidade do compilador no PATH, depois grava-se o fonte, compila-se e executa-se o binário resultante.'
          ),
          q(
            'Uma equipe testa seu código C++ tanto no g++ quanto no clang++ e no MSVC no pipeline de integração contínua. Qual benefício técnico isso traz?',
            'Detecta dependências acidentais de extensões específicas e garante portabilidade fiel ao padrão ISO',
            ['Funde os três compiladores em um único arquivo executável três vezes menor', 'Elimina a necessidade de incluir cabeçalhos como <iostream> no código-fonte'],
            'Compilar em múltiplos compiladores expõe comportamentos não portáveis e diagnósticos complementares de cada ferramenta.'
          ),
          q(
            'Ao executar g++ --version no terminal de um servidor Ubuntu, o que essa opção realiza?',
            'Exibe a edição instalada do compilador e encerra sem exigir arquivos .cpp',
            ['Atualiza automaticamente todos os arquivos .cpp da pasta para C++20', 'Inicia um console interativo REPL para executar linhas soltas de C++'],
            'A flag --version apenas imprime os metadados e número de versão do driver g++ configurado no sistema.'
          )
        ]
      },
      {
        id: 'cpp-c01-u2-l2',
        title: 'Selecionando o padrão com -std=c++20',
        subtitle: 'Prática guiada · flag -std=c++20 e versões modernas',
        theory: 'O C++ evolui a cada três anos (C++11, C++14, C++17, C++20, C++23), mas compiladores costumam usar por padrão uma edição anterior por compatibilidade. Passar -std=c++20 no g++ ou clang++ (ou /std:c++20 no MSVC) ativa recursos modernos e impede construções antigas já removidas.',
        questions: [
          g(
            'Complete a flag do clang++ para compilar motor_fisica.cpp exigindo a norma ISO C++20:',
            '-std=c++20',
            'Nos compiladores g++ e clang++, a opção -std=c++20 seleciona o padrão oficial ISO C++20.',
            'clang++ ____ motor_fisica.cpp -o motor_fisica'
          ),
          q(
            'Qual é a diferença técnica entre usar -std=c++20 e -std=gnu++20 ao compilar servidor.cpp com o g++?',
            'A opção -std=c++20 segue estritamente o ISO C++20, enquanto -std=gnu++20 habilita extensões extras não portáveis da GNU',
            ['A opção -std=gnu++20 só funciona em sistemas Windows 11 com MSVC', 'A opção -std=c++20 desativa o otimizador e impede gerar arquivos executáveis'],
            'Prefira -std=c++20 (ou -std=c++17) em código multiplataforma para não depender de extensões exclusivas do GCC.'
          ),
          t(
            'No compilador MSVC (cl.exe), qual flag seleciona o padrão C++20 usando a sintaxe com barra normal (/)?',
            ['/std:c++20', '-std:c++20'],
            'No cl.exe do Visual Studio, os padrões modernos são ativados com dois-pontos: /std:c++20 (ou /std:c++17).'
          ),
          q(
            'Um código usa std::string_view (introduzido no C++17), mas falha ao compilar em um servidor antigo cujo g++ assume C++14 por omissão. Como resolver?',
            'Adicionar explicitamente -std=c++17 ou -std=c++20 ao comando de compilação',
            ['Renomear o arquivo de .cpp para .c para destravar recursos recentes', 'Remover todos os #include do arquivo para evitar checagem de versão'],
            'Fixar a versão com -std=c++17 ou -std=c++20 garante que o compilador reconheça bibliotecas e sintaxes daquela revisão.'
          ),
          p(
            'Associe cada flag de seleção de padrão C++ ao seu comportamento:',
            [
              ['-std=c++17', 'Ativa o padrão ISO de 2017 no g++ e no clang++'],
              ['-std=c++20', 'Habilita o padrão ISO de 2020 sem extensões proprietárias no GCC/Clang'],
              ['-std=gnu++20', 'Ativa o C++20 somado às extensões específicas da GNU'],
              ['/std:c++20', 'Seleciona a norma C++20 no compilador cl.exe da Microsoft']
            ],
            'GCC e Clang utilizam -std=c++XX para ISO puro, enquanto o MSVC adota a convenção /std:c++XX.'
          ),
          o(
            'Ordene cronologicamente estas quatro edições oficiais da linguagem C++, da mais antiga para a mais recente:',
            [
              'C++11 (marco do C++ moderno com inferência auto e semântica de movimento)',
              'C++14 (refinamentos incrementais sobre a base do C++11)',
              'C++17 (adição de std::string_view, std::optional e structured bindings)',
              'C++20 (introdução de concepts, ranges e operador spaceship <=>)'
            ],
            'Desde 2011 o comitê ISO publica revisões a cada três anos: C++11, C++14, C++17 e C++20.'
          ),
          q(
            'O código abaixo usa o método starts_with de std::string, adicionado no C++20. Com qual comando do g++ ele compila sem erro?',
            'g++ -std=c++20 filtro.cpp -o filtro',
            ['g++ -std=c++11 filtro.cpp -o filtro', 'g++ -std=c++14 filtro.cpp -o filtro'],
            'O método std::string::starts_with faz parte do C++20; compilar em C++11 ou C++14 resulta em erro de membro inexistente.',
            '#include <iostream>\n#include <string>\n\nint main() {\n    std::string rota = "/api/status";\n    std::cout << rota.starts_with("/api") << \'\\n\';\n    return 0;\n}'
          ),
          q(
            'Por que projetos profissionais sempre declaram a versão como -std=c++20 nos scripts de build em vez de confiar no padrão implícito do compilador?',
            'Porque o padrão implícito muda conforme a versão instalada do g++ ou clang++ em cada máquina',
            ['Porque sem a flag -std o compilador ignora a função int main()', 'Porque a flag -std criptografa o código-fonte antes de salvar no disco'],
            'Explicitar -std=c++20 torna a compilação reproduzível entre máquinas de desenvolvedores e servidores de CI.'
          )
        ]
      },
      {
        id: 'cpp-c01-u2-l3',
        title: 'Avisos essenciais com -Wall e -Wextra',
        subtitle: 'Aprofundamento · diagnósticos -Wall, -Wextra e -Werror',
        theory: 'Código que compila nem sempre está correto: variáveis não lidas, comparações perigosas entre tipos com e sem sinal ou retornos esquecidos viram bugs silenciosos. As flags -Wall e -Wextra no g++ e clang++ (ou /W4 no MSVC) ativam avisos valiosos, e -Werror barra avisos na build.',
        questions: [
          q(
            'Apesar do nome histórico "all", por que desenvolvedores C++ combinam -Wextra junto com -Wall no g++ e no clang++?',
            'Porque -Wall ativa apenas um conjunto base de avisos comuns, e -Wextra acrescenta checagens adicionais importantes',
            ['Porque -Wall só funciona para código C puro e é ignorado em arquivos .cpp', 'Porque -Wextra apaga automaticamente as linhas com variáveis não utilizadas'],
            '-Wall não liga todos os diagnósticos existentes; somar -Wextra (e frequentemente -Wpedantic) cobre mais armadilhas reais.'
          ),
          g(
            'Complete o comando para que o g++ trate qualquer aviso emitido durante a compilação de cofre.cpp como um erro que interrompe a geração do binário:',
            '-Werror',
            'A flag -Werror transforma todos os warnings ativos em erros fatais de compilação, impedindo que avisos sejam ignorados.',
            'g++ -std=c++20 -Wall -Wextra ____ cofre.cpp -o cofre'
          ),
          q(
            'Ao compilar o trecho abaixo com g++ -std=c++20 -Wall -Wextra estoque.cpp, qual anomalia o compilador aponta como warning?',
            'A variável reserva foi declarada e inicializada, mas nunca é utilizada na função',
            ['O retorno 0 em main() é proibido quando existem variáveis inteiras', 'A constante 120 excede a capacidade de um tipo int de 32 bits'],
            'Com -Wall ativo (-Wunused-variable), o compilador alerta que reserva nunca é lida, sinalizando possível esquecimento lógico.',
            'int main() {\n    int reserva = 120;\n    return 0;\n}'
          ),
          t(
            'No compilador MSVC (cl.exe), qual flag de 3 caracteres ativa o nível alto recomendado de avisos equivalente ao uso cotidiano de -Wall -Wextra?',
            ['/W4', '-W4'],
            'No MSVC, /W4 é o nível alto recomendado para projetos (já que /Wall no MSVC liga até diagnósticos internos de cabeçalhos do sistema).'
          ),
          p(
            'Relacione cada flag de diagnóstico do g++/clang++ à sua finalidade na compilação:',
            [
              ['-Wall', 'Habilita o pacote principal de avisos sobre construções suspeitas'],
              ['-Wextra', 'Adiciona alertas complementares não cobertos pelo pacote básico'],
              ['-Wpedantic', 'Exige aderência estrita ao padrão ISO C++, alertando sobre extensões'],
              ['-Werror', 'Converte todos os avisos detectados em falha de compilação']
            ],
            'Combinar -Wall, -Wextra e -Wpedantic eleva a qualidade estática, enquanto -Werror impõe zero avisos em CI.'
          ),
          o(
            'Ordene o fluxo de trabalho recomendado ao encontrar um warning usando -Wall -Wextra em pagamento.cpp:',
            [
              'Compilar pagamento.cpp com -std=c++20 -Wall -Wextra no terminal',
              'Ler a linha, a coluna e a categoria do aviso reportado pelo compilador',
              'Corrigir a causa no código-fonte de pagamento.cpp',
              'Recompilar confirmando saída limpa com zero avisos antes de prosseguir'
            ],
            'Warnings apontam defeitos potenciais; lê-se a localização exata, corrige-se a lógica e valida-se uma compilação limpa.'
          ),
          q(
            'Qual é a diferença fundamental entre um warning (aviso) e um error (erro) durante uma compilação padrão sem -Werror?',
            'O warning alerta sobre risco mas ainda gera o executável; o error impede a geração do binário',
            ['O warning só aparece quando o usuário roda o executável; o error aparece ao salvar o arquivo', 'O warning interrompe o pré-processador; o error é corrigido sozinho pelo linker'],
            'Sem -Werror, avisos não abortam a geração do binário, razão pela qual é essencial acompanhar a saída do compilador.'
          ),
          q(
            'Na mensagem "radar.cpp:14:9: warning: unused variable \'alcance\' [-Wunused-variable]", o que significam os números 14 e 9?',
            'Linha 14 e coluna 9 do arquivo radar.cpp onde o símbolo alcance foi declarado',
            ['Código de saída 14 do linker e versão 9 do padrão C++', 'Quantidade de 14 erros graves e 9 avisos leves encontrados no projeto'],
            'O formato arquivo:linha:coluna permite localizar instantaneamente no editor o ponto exato do diagnóstico.'
          )
        ]
      },
      {
        id: 'cpp-c01-u2-l4',
        title: 'Nomeando o executável com a flag -o',
        subtitle: 'Aplicação · flag -o e execução no terminal',
        theory: 'Se você rodar apenas g++ app.cpp no Linux ou macOS, o compilador gera um binário com o nome histórico a.out (ou app.exe no cl.exe do Windows). A flag -o define o nome exato do arquivo de saída, como g++ -std=c++20 -Wall -Wextra app.cpp -o app, facilitando rodar ./app no terminal.',
        questions: [
          t(
            'No Linux ou macOS, qual é o nome padrão do arquivo executável criado quando você executa clang++ calculo.cpp sem passar a flag -o?',
            'a.out',
            'Por herança histórica do Unix ("assembler output"), g++ e clang++ gravam o executável como a.out quando -o é omitida.'
          ),
          g(
            'Complete o comando para compilar conversor.cpp e gerar o binário chamado build/conversor:',
            '-o',
            'A flag -o recebe logo a seguir o caminho e nome desejados para o arquivo binário de saída.',
            'g++ -std=c++20 -Wall -Wextra conversor.cpp ____ build/conversor'
          ),
          q(
            'Qual erro grave acontece se um iniciante digitar acidentalmente g++ -o relatorio.cpp ao tentar compilar relatorio.cpp?',
            'O compilador interpreta relatorio.cpp como arquivo de saída da flag -o, podendo sobrescrever seu código-fonte e reclamar de falta de entrada',
            ['O compilador cria automaticamente uma cópia de segurança chamada relatorio_copia e compila normalmente', 'A flag -o apenas renomeia a função main() dentro de relatorio.cpp sem tocar no disco'],
            'O argumento imediatamente após -o é sempre o destino de saída; nunca passe o nome de um arquivo .cpp logo depois de -o!'
          ),
          q(
            'Após compilar com sucesso usando g++ -std=c++20 -Wall -Wextra validador.cpp -o validador no terminal Linux, como executar esse binário na pasta atual?',
            './validador',
            ['g++ --run validador', 'cpp validador.cpp'],
            'No shell Unix, o prefixo ./ indica explicitamente o diretório atual para iniciar o executável nativo recém-criado.'
          ),
          o(
            'Ordene os elementos para montar um comando idiomático do clang++ que compila piloto.cpp em C++20 com avisos e gera o executável piloto, seguido de sua execução:',
            [
              'Invocar o compilador com padrão moderno: clang++ -std=c++20',
              'Acrescentar as flags de diagnóstico: -Wall -Wextra',
              'Informar a entrada e o destino: piloto.cpp -o piloto',
              'Executar o binário gerado no terminal: ./piloto'
            ],
            'Monta-se o comando completo de compilação com padrão, avisos, fonte e saída (-o), e só então executa-se ./piloto.'
          ),
          p(
            'Associe cada comando de terminal ao arquivo que será gerado no diretório atual:',
            [
              ['g++ -std=c++20 mapa.cpp', 'Executável com nome padrão a.out (no Linux/macOS)'],
              ['g++ -std=c++20 mapa.cpp -o rota', 'Executável nativo nomeado exatamente como rota'],
              ['g++ -std=c++20 -c mapa.cpp -o mapa.o', 'Arquivo de código objeto mapa.o ainda não linkado'],
              ['cl /std:c++20 /EHsc mapa.cpp', 'Executável mapa.exe gerado pelo MSVC no Windows']
            ],
            'Sem -o no Unix surge a.out; com -o escolhemos o nome; com -c gera-se apenas o objeto; no MSVC o padrão é <fonte>.exe.'
          ),
          q(
            'Quando um programa pequeno é dividido em main.cpp e util.cpp, como o g++ compila e linka ambos diretamente em um único executável chamado painel?',
            'g++ -std=c++20 -Wall -Wextra main.cpp util.cpp -o painel',
            ['g++ -std=c++20 -o main.cpp -o util.cpp painel', 'g++ -std=c++20 main.cpp -c util.cpp -o painel.cpp'],
            'Podemos listar múltiplos arquivos .cpp no mesmo comando e definir o nome do executável final único após -o.'
          ),
          q(
            'Por que no terminal Linux digitamos ./monitor em vez de apenas monitor para rodar o executável recém-compilado na pasta do projeto?',
            'Porque por segurança o diretório atual (.) não fica na variável PATH do shell Unix por padrão',
            ['Porque ./ ativa o modo de depuração linha a linha dentro do compilador g++', 'Porque arquivos compilados com -std=c++20 exigem dois caracteres especiais antes do nome'],
            'Sem ./, o shell procura o comando apenas nos diretórios do sistema listados em PATH, evitando executar binários locais por engano.'
          )
        ]
      },
      {
        id: 'cpp-c01-u2-l5',
        title: 'Domínio da linha de comando de compilação',
        subtitle: 'Revisão e desafio · compiladores e flags essenciais',
        theory: 'Dominar a linha de comando dá controle total antes mesmo de usar sistemas como CMake. Combinar um compilador moderno (g++, clang++ ou MSVC), o padrão explícito (-std=c++20), diagnósticos rigorosos (-Wall -Wextra) e saída nomeada (-o) forma a base profissional de qualquer build em C++.',
        questions: [
          q(
            'Qual comando abaixo aplica simultaneamente C++20 estrito, avisos ampliados, avisos tratados como erro e executável nomeado telemetria?',
            'clang++ -std=c++20 -Wall -Wextra -Werror telemetria.cpp -o telemetria',
            ['clang++ -std=gnu++11 -c telemetria.cpp -o telemetria.cpp', 'clang++ -o -Wall -Wextra telemetria.cpp -std=c++20'],
            'O comando reúne -std=c++20, -Wall -Wextra, -Werror, o arquivo-fonte telemetria.cpp e a saída -o telemetria na ordem adequada.'
          ),
          g(
            'Complete a segunda flag de avisos recomendada para acompanhar -Wall ao compilar simulador.cpp:',
            '-Wextra',
            'A dupla -Wall -Wextra é a base padrão de avisos preventivos no g++ e no clang++.',
            'g++ -std=c++20 -Wall ____ simulador.cpp -o simulador'
          ),
          t(
            'No comando g++ -std=c++20 -Wall -Wextra servidor.cpp -o api_gateway, qual é o nome exato do arquivo executável criado?',
            'api_gateway',
            'O token logo após a flag -o determina o nome do binário gerado: api_gateway.'
          ),
          q(
            'Ao compilar o código abaixo com clang++ -std=c++20 -Wall -Wextra -Werror tarifa.cpp -o tarifa, o arquivo executável tarifa será gerado?',
            'Não, pois a comparação entre int com sinal e unsigned int gera aviso em -Wextra, e -Werror aborta a compilação',
            ['Sim, porque -Werror apenas grava os avisos em um arquivo de texto separado', 'Sim, porque tipos int e unsigned int nunca geram avisos de comparação em C++'],
            '-Wextra ativa -Wsign-compare ao comparar int com unsigned int; como -Werror está presente, o aviso vira erro e nenhum binário é gerado.',
            'int main() {\n    int desconto = -1;\n    unsigned int limite = 10U;\n    if (desconto < limite) {\n        return 1;\n    }\n    return 0;\n}'
          ),
          p(
            'Relacione cada comando do g++/clang++ ao seu equivalente conceitual no compilador MSVC (cl.exe):',
            [
              ['-std=c++20', '/std:c++20 para ativar recursos da norma de 2020'],
              ['-Wall -Wextra', '/W4 para habilitar avisos rigorosos de qualidade'],
              ['-Werror', '/WX para bloquear a build caso surja qualquer aviso'],
              ['-o motor.exe', '/Fe:motor.exe para batizar o executável resultante']
            ],
            'Embora a sintaxe das flags mude entre Unix (g++/clang++) e Windows (MSVC), os quatro pilares de configuração possuem correspondentes diretos.'
          ),
          o(
            'Ordene o ciclo completo de compilação incremental de um projeto com main.cpp e calculo.cpp usando g++:',
            [
              'Compilar main.cpp em código objeto com g++ -std=c++20 -Wall -Wextra -c main.cpp -o main.o',
              'Compilar calculo.cpp em código objeto com g++ -std=c++20 -Wall -Wextra -c calculo.cpp -o calculo.o',
              'Linkar os dois objetos no binário final com g++ main.o calculo.o -o sistema',
              'Executar ./sistema no terminal para validar o programa completo'
            ],
            'Cada .cpp vira seu respectivo .o com -c e avisos ativos, depois ambos são unidos pelo driver g++ no executável sistema.'
          ),
          q(
            'Você rodou g++ -std=c++20 -Wall -Wextra agenda.cpp -o agenda, alterou agenda.cpp, mas esqueceu de recompilar antes de rodar ./agenda. O que acontece?',
            'O sistema operacional executa o binário antigo de agenda, sem refletir a alteração recém-salva no .cpp',
            ['O binário ./agenda lê agenda.cpp automaticamente ao iniciar e aplica a mudança', 'O terminal bloqueia a execução de ./agenda até que a data de modificação coincida'],
            'O executável nativo é independente do código-fonte; toda mudança no .cpp exige nova compilação para atualizar o binário.'
          ),
          q(
            'Por que sistemas de build modernos como CMake ainda exigem que você compreenda flags como -std=c++20 e -Wall -Wextra?',
            'Porque o CMake apenas gera os comandos que repassam essas mesmas flags ao g++, clang++ ou MSVC por baixo dos panos',
            ['Porque o CMake substitui o compilador e interpreta C++ diretamente sem usar g++ ou MSVC', 'Porque o CMake proíbe criar a função main() quando -o não é digitado manualmente'],
            'Ferramentas de build orquestram chamadas aos compiladores reais; entender as flags permite diagnosticar falhas e configurar alvos corretamente.'
          )
        ]
      }
    ],
    3: [
      {
        id: 'cpp-c01-u3-l1',
        title: 'Ponto de entrada: a assinatura int main()',
        subtitle: 'Apresentação · assinatura int main() no padrão ISO',
        theory: 'Todo programa C++ executável precisa de uma única função global main como ponto de entrada. Pelo padrão ISO C++, seu tipo de retorno é obrigatoriamente int: usa-se int main() quando não lemos argumentos de linha de comando, ou int main(int argc, char* argv[]) quando os recebemos.',
        questions: [
          q(
            'Por que escrever void main() em um arquivo .cpp é rejeitado por compiladores conformes ao padrão ISO C++?',
            'Porque a norma ISO C++ exige que main tenha tipo de retorno int em ambientes hospedados',
            ['Porque a palavra-chave void foi removida da linguagem C++ desde a versão C++17', 'Porque funções em C++ só podem retornar números de ponto flutuante double'],
            'Em sistemas operacionais (ambientes hosted), void main() nunca foi C++ padrão; o retorno de main deve ser sempre int.'
          ),
          g(
            'Complete a assinatura padrão do ponto de entrada deste programa mínimo em inicio.cpp:',
            'int main()',
            'A assinatura mínima e idiomática em C++ é int main(), retornando um inteiro ao sistema operacional.',
            '____ {\n    return 0;\n}'
          ),
          t(
            'Na assinatura int main(int argc, char* argv[]), qual parâmetro inteiro guarda a contagem de argumentos passados na linha de comando?',
            'argc',
            'O parâmetro argc ("argument count") armazena quantos argumentos foram entregues ao processo, contando o nome do programa.',
            'int main(int argc, char* argv[]) {\n    (void)argv;\n    return argc - argc;\n}'
          ),
          q(
            'Um projeto junta dois arquivos no mesmo comando: g++ tela.cpp rede.cpp -o cliente, e ambos definem int main(). O que acontece?',
            'O linker falha acusando definição múltipla do símbolo main',
            ['O executável roda primeiro o main de tela.cpp e em seguida o main de rede.cpp', 'O compilador escolhe automaticamente o arquivo maior e ignora o outro'],
            'Pela Regra de Definição Única (ODR), um executável só pode conter uma única função global main.'
          ),
          p(
            'Associe cada elemento relacionado à função main em C++ ao seu papel técnico:',
            [
              ['int main()', 'Assinatura padrão para programas que não leem argumentos do terminal'],
              ['int main(int argc, char* argv[])', 'Assinatura padrão que recebe contagem e vetor de argumentos de execução'],
              ['void main()', 'Forma inválida no padrão ISO C++ para programas em sistemas operacionais'],
              ['int Main()', 'Função comum distinta de main, pois C++ diferencia maiúsculas de minúsculas']
            ],
            'O C++ é case-sensitive (Main não é o ponto de entrada) e padroniza int main() ou int main(int argc, char* argv[]).'
          ),
          o(
            'Ordene o que acontece na inicialização e término de um programa C++ mínimo contendo apenas int main():',
            [
              'O sistema operacional carrega o executável e aciona a rotina interna de partida do C++',
              'A rotina de partida transfere o controle para o início de int main()',
              'As instruções dentro do corpo de main() são executadas em sequência',
              'A função main() devolve um valor int que é entregue de volta ao sistema operacional'
            ],
            'O runtime prepara o ambiente, chama int main(), executa seu bloco e repassa o inteiro retornado ao sistema operacional.'
          ),
          q(
            'Se um programador escrever int Main() com M maiúsculo em vez de int main() em alarme.cpp e tentar gerar um executável, qual será o resultado?',
            'Erro de linkedição, pois o ponto de entrada minúsculo main não foi encontrado',
            ['Compilação normal, já que o C++ converte nomes de funções para minúsculas', 'Aviso leve de estilo, gerando o executável funcional normalmente'],
            'C++ é sensível a maiúsculas e minúsculas: int Main() é tratado como uma função qualquer, deixando o binário sem ponto de entrada.'
          ),
          q(
            'Em C++ moderno, há diferença funcional entre escrever int main() e int main(void)?',
            'Ambas não aceitam parâmetros, mas int main() é a forma idiomática preferida em C++',
            ['int main() aceita infinitos argumentos, enquanto int main(void) não aceita nenhum', 'int main(void) impede o uso da instrução return 0; dentro do bloco'],
            'Diferente do C antigo, em C++ parênteses vazios () já significam zero parâmetros, tornando (void) redundante.'
          )
        ]
      },
      {
        id: 'cpp-c01-u3-l2',
        title: 'Código de saída: return 0 vs erro',
        subtitle: 'Prática guiada · return 0 e status para o sistema',
        theory: 'O inteiro retornado por main funciona como um recibo para o sistema operacional ou script que chamou seu programa. Por convenção universal, return 0; comunica sucesso total, enquanto valores diferentes de zero (como return 1;) sinalizam falha, permitindo interromper automações e pipelines.',
        questions: [
          t(
            'Qual valor numérico retornado por int main() no código abaixo é recebido pelo sistema operacional quando conexoes vale 0?',
            '2',
            'Como conexoes == 0 é verdadeiro, o bloco do if executa return 2;, encerrando main imediatamente com código de erro 2.',
            'int main() {\n    int conexoes = 0;\n    if (conexoes == 0) {\n        return 2;\n    }\n    return 0;\n}'
          ),
          g(
            'Complete a instrução final de main() em backup.cpp para informar explicitamente ao sistema operacional que a tarefa terminou com sucesso:',
            ['return 0;', 'return 0'],
            'Em main(), return 0; encerra a função devolvendo o código de status 0 (sucesso) ao sistema operacional.',
            'int main() {\n    int arquivosCopiados = 15;\n    if (arquivosCopiados < 1) {\n        return 1;\n    }\n    ____\n}'
          ),
          q(
            'O que o padrão ISO C++ define caso a execução chegue à chave de fechamento } de int main() sem encontrar nenhuma instrução return?',
            'Exclusivamente na função main, o compilador assume um return 0; implícito',
            ['Ocorre comportamento indefinido e o processo trava com falha de segmentação', 'O compilador retorna automaticamente o código de erro -1 para o terminal'],
            'A função main é uma exceção especial na norma C++: atingir o final dela equivale a return 0;, embora escrevê-lo seja comum por clareza.'
          ),
          q(
            'Em um script Linux "./validar_dados && ./enviar_lote", o programa validar_dados terminou executando return 1;. O que acontece com enviar_lote?',
            'Não será executado, pois o operador && do shell só avança quando o programa anterior retorna status 0',
            ['Será executado normalmente, pois 1 representa verdadeiro (sucesso) para códigos de saída do sistema', 'Será executado duas vezes para compensar o aviso emitido por validar_dados'],
            'Em shells do sistema operacional, status 0 indica sucesso (permitindo && prosseguir) e qualquer valor não nulo indica erro (interrompendo &&).'
          ),
          p(
            'Relacione cada situação ligada ao retorno de int main() ao seu significado prático:',
            [
              ['return 0;', 'Encerra main indicando execução bem-sucedida ao sistema operacional'],
              ['return 1;', 'Encerra main sinalizando ocorrência de erro ao processo chamador'],
              ['echo $? (no bash/zsh)', 'Inspeciona no terminal Unix o código de saída do último programa rodado'],
              ['Código após um return executado', 'Trecho inalcançável que não chega a rodar naquele fluxo']
            ],
            'O comando return finaliza main na hora, devolvendo 0 (sucesso) ou não zero (erro), consultável no shell via $?.'
          ),
          o(
            'Ordene os passos para testar no terminal Linux o código de saída retornado por checar_disco:',
            [
              'Escrever int main() retornando 1 quando o espaço livre está abaixo do mínimo',
              'Compilar checar_disco.cpp gerando o executável checar_disco',
              'Executar ./checar_disco no terminal',
              'Consultar a variável de status do shell com echo $? para confirmar o código retornado'
            ],
            'Após compilar e rodar o binário, echo $? revela o inteiro exato entregue por main ao sistema operacional.'
          ),
          q(
            'Qual valor a variável etapas possui no instante em que main() encerra no código abaixo?',
            '1, porque o primeiro return 0; encerra main() imediatamente antes da linha etapas = 5;',
            ['5, porque todas as linhas dentro de main() rodam antes de devolver o retorno', '0, porque return 0; zera todas as variáveis locais antes de sair'],
            'Assim que return 0; é executado, a função main termina naquele exato ponto; linhas posteriores no mesmo bloco não executam.',
            'int main() {\n    int etapas = 1;\n    if (etapas > 0) {\n        return 0;\n    }\n    etapas = 5;\n    return etapas;\n}'
          ),
          q(
            'Qual cuidado você deve tomar ao escolher números inteiros de erro para retornar de main() em sistemas Linux e macOS?',
            'Usar valores pequenos positivos entre 1 e 125, pois o sistema Unix reserva apenas os 8 bits inferiores (0 a 255)',
            ['Retornar múltiplos exatos de 256 (como 256 ou 512) para destacar falhas críticas', 'Usar números acima de 100000 para não colidir com portas de rede'],
            'No Unix, o código de saída é truncado para 8 bits (módulo 256): retornar 256 viraria 0 (falso sucesso!) para o shell!'
          )
        ]
      },
      {
        id: 'cpp-c01-u3-l3',
        title: 'Chaves {} e ponto e vírgula ;',
        subtitle: 'Aprofundamento · blocos {} e instruções com ;',
        theory: 'O C++ não usa indentação para definir estrutura: as chaves { e } delimitam o corpo de funções e o escopo de blocos, enquanto o ponto e vírgula ; encerra cada instrução individual. Esquecer um ; ou desalinhar uma chave altera a análise sintática e costuma apontar erro na linha seguinte.',
        questions: [
          g(
            'Complete o símbolo obrigatório que falta ao final da declaração de velocidade em turbina.cpp:',
            ';',
            'Em C++, toda declaração de variável e toda instrução de expressão ou retorno deve terminar com ponto e vírgula (;).',
            'int main() {\n    int velocidade = 900____\n    return velocidade - 900;\n}'
          ),
          q(
            'O código abaixo em uma única linha é sintaticamente válido para um compilador C++20?',
            'Sim, porque quebras de linha e espaços extras são livres quando {} e ; estão nos lugares corretos',
            ['Não, porque o C++ exige que cada chave { ocupe uma linha exclusiva', 'Não, porque duas instruções separadas por ; nunca podem dividir a mesma linha'],
            'O C++ é uma linguagem de formato livre (free-form): o compilador guia-se por tokens como {} e ;, embora a indentação limpa seja vital para humanos.',
            'int main() { int nivel = 3; return nivel - 3; }'
          ),
          q(
            'Por que o código abaixo falha ao compilar na linha return taxa;?',
            'Porque a variável taxa foi declarada dentro de um bloco interno {} e deixou de existir ao fechar }',
            ['Porque não é permitido abrir chaves {} internas dentro da função int main()', 'Porque a instrução return só aceita literais numéricos como 0 ou 1'],
            'Chaves {} criam um escopo de bloco: variáveis locais declaradas ali dentro são destruídas e ficam inacessíveis fora da chave }.',
            'int main() {\n    {\n        int taxa = 0;\n    }\n    return taxa;\n}'
          ),
          t(
            'Quantas instruções terminadas por ponto e vírgula (;) existem dentro do corpo de int main() abaixo?',
            '3',
            'Há exatamente 3 instruções encerradas por ponto e vírgula: int base = 10;, int dobro = base * 2; e return dobro - 20;.',
            'int main() {\n    int base = 10;\n    int dobro = base * 2;\n    return dobro - 20;\n}'
          ),
          p(
            'Associe cada elemento de pontuação da estrutura de um arquivo C++ à sua função sintática:',
            [
              ['Parênteses () em int main()', 'Delimitam a lista de parâmetros na assinatura da função'],
              ['Chave de abertura {', 'Inicia o corpo da função ou um novo escopo de bloco local'],
              ['Ponto e vírgula ;', 'Marca o término exato de uma declaração ou instrução'],
              ['Chave de fechamento }', 'Encerra o bloco atual e destrói variáveis locais daquele escopo']
            ],
            'Parênteses cercam parâmetros, chaves {} abrem e fecham blocos de escopo, e ; finaliza instruções.'
          ),
          o(
            'Ordene as linhas abaixo para formar uma função int main() sintaticamente válida e bem estruturada:',
            [
              'int main() {',
              '    int sensoresAtivos = 4;',
              '    return sensoresAtivos - 4;',
              '}'
            ],
            'Abre-se a assinatura com {, declara-se sensoresAtivos antes de usá-la no return, e fecha-se o bloco da função com }.'
          ),
          q(
            'O que acontece na diretiva #include <iostream> se você adicionar um ponto e vírgula no final, escrevendo #include <iostream>;?',
            'Diretivas iniciadas com # não são instruções C++ e não levam ; — adicioná-lo gera aviso de tokens extras ou erro',
            ['O ponto e vírgula é obrigatório em todos os #include a partir do padrão C++20', 'O pré-processador ignora a biblioteca <iostream> inteira quando não há ; no final'],
            'Diretivas do pré-processador terminam na quebra de linha, não com ponto e vírgula.'
          ),
          q(
            'O compilador emitiu "erro: esperado \';\' antes de \'return\'" apontando para a linha 4 de freio.cpp. Onde geralmente está o defeito real?',
            'No final da linha 3 (ou instrução imediatamente anterior ao return), onde faltou o ponto e vírgula',
            ['Na palavra int da linha 1, que deveria terminar com ponto e vírgula', 'Na chave } da linha 5, que precisa vir seguida de dois pontos e vírgulas'],
            'Como o C++ permite quebrar uma instrução em várias linhas, o parser só percebe a falta do ; ao esbarrar na palavra return da linha seguinte.'
          )
        ]
      },
      {
        id: 'cpp-c01-u3-l4',
        title: 'Comentários de linha // e de bloco /* */',
        subtitle: 'Aplicação · documentando com // e /* */',
        theory: 'Comentários explicam a intenção por trás do código — o porquê de uma regra, nunca o óbvio — e são removidos pelo pré-processador sem ocupar um único byte no executável. O C++ oferece // até o fim da linha atual e /* ... */ para trechos multilinhas (que não podem ser aninhados entre si).',
        questions: [
          t(
            'Qual valor inteiro a função main() abaixo retorna ao sistema operacional?',
            '0',
            'As linhas com // ajuste = 5; e /* ajuste = 9; */ são comentários descartados; assim ajuste permanece 0 e main retorna 0.',
            'int main() {\n    int ajuste = 0;\n    // ajuste = 5;\n    /* ajuste = 9; */\n    return ajuste;\n}'
          ),
          g(
            'Complete os dois caracteres que fecham corretamente o comentário de bloco no cabeçalho de licenca.cpp:',
            '*/',
            'Todo comentário de bloco iniciado com /* precisa ser encerrado explicitamente com */.',
            '/* Módulo de telemetria v2 ____\nint main() {\n    return 0;\n}'
          ),
          q(
            'Por que tentar aninhar um comentário de bloco dentro de outro, como /* externo /* interno */ fim */, causa erro de compilação em C++?',
            'Porque o primeiro */ encontrado já fecha o comentário aberto, deixando "fim */" exposto como código C++ inválido',
            ['Porque comentários com /* */ só são aceitos fora da função int main()', 'Porque o C++20 aboliu os comentários /* */ em favor exclusivo de //'],
            'Comentários /* */ não aninham: o pré-processador encerra o bloco no primeiro */ que aparece. Por isso // é mais seguro para comentar código.'
          ),
          q(
            'Adicionar 200 linhas de comentários explicativos em motor.cpp deixa o arquivo executável final maior ou mais lento?',
            'Não altera nem tamanho nem velocidade, pois o pré-processador substitui comentários por espaço antes da compilação',
            ['Aumenta o tamanho do binário em disco, mas não afeta a velocidade na CPU', 'Deixa a inicialização de main() ligeiramente mais lenta para pular as linhas de texto'],
            'Na fase de tradução inicial (pré-processamento), todos os comentários são descartados e nunca chegam ao código objeto nem ao binário.'
          ),
          p(
            'Relacione cada forma de uso de comentários em C++ ao seu comportamento:',
            [
              ['// Limite em milissegundos', 'Ignora tudo a partir das duas barras até a quebra de linha'],
              ['/* Nota curta */', 'Delimitador de bloco que pode cobrir uma ou várias linhas'],
              ['"Sinal // ativo"', 'Literal de string onde os caracteres // são texto comum, não comentário'],
              ['/* a /* b */ c */', 'Erro sintático por tentativa inválida de aninhar blocos /* */']
            ],
            'Fora de strings, // vale até o fim da linha e /* */ até o primeiro */; dentro de aspas duplas, // é texto comum.'
          ),
          o(
            'Ordene as etapas para revisar e limpar comentários antes de enviar calculo_ir.cpp para produção:',
            [
              'Remover trechos de código morto que haviam sido apenas comentados com // durante testes',
              'Substituir comentários redundantes que repetem o código óbvio por nomes claros de variáveis',
              'Manter comentários objetivos com // explicando o motivo de regras fiscais não triviais',
              'Recompilar com -Wall -Wextra garantindo que nenhum delimitador /* ficou mal fechado'
            ],
            'Código limpo evita código morto comentado, dispensa comentários óbvios e preserva notas sobre decisões de negócio.'
          ),
          q(
            'Qual texto é impresso por std::cout ao rodar o programa abaixo?',
            'A//B',
            ['A', 'Erro de compilação por comentário aberto dentro de std::cout'],
            'Como // aparece dentro de aspas duplas ("A//B"), o compilador o trata como caracteres normais do literal de texto.',
            '#include <iostream>\n\nint main() {\n    std::cout << "A//B";\n    return 0;\n}'
          ),
          q(
            'Entre as opções abaixo, qual representa o uso mais profissional de um comentário // em C++?',
            '// Margem extra de 15% exigida pela norma técnica NBR-5410 para picos',
            ['// Soma 1 na variável contador\n++contador;', '// Retorna o número inteiro zero\nreturn 0;'],
            'Bons comentários registram contexto externo ou restrições de domínio que o código sozinho não consegue expressar.'
          )
        ]
      },
      {
        id: 'cpp-c01-u3-l5',
        title: 'Revisão da anatomia de int main()',
        subtitle: 'Revisão e desafio · ponto de entrada, escopo e retorno',
        theory: 'Reunindo os fundamentos da função principal: int main() abre o programa com chaves {} balanceadas, executa instruções encerradas por ponto e vírgula ;, ignora comentários // e /* */ na compilação e devolve um status int ao sistema operacional — 0 para sucesso e não zero para falha.',
        questions: [
          t(
            'Qual código de saída inteiro o programa valvula.cpp abaixo entrega ao sistema operacional?',
            '0',
            'pressao inicia em 40; a linha /* pressao = 90; */ é comentário; como pressao > 80 é falso (40 > 80 é falso), main executa return 0;.',
            'int main() {\n    int pressao = 40;\n    /* pressao = 90; */\n    if (pressao > 80) {\n        return 3; // alerta de sobrepressao\n    }\n    return 0;\n}'
          ),
          g(
            'Complete o tipo de retorno obrigatório na assinatura de main() em verificador.cpp:',
            'int',
            'Pelo padrão ISO C++, main sempre possui tipo de retorno int.',
            '____ main(int argc, char* argv[]) {\n    (void)argv;\n    if (argc < 2) {\n        return 1;\n    }\n    return 0;\n}'
          ),
          q(
            'Se o usuário executar "./verificador modo_seguro" no terminal para o programa abaixo, qual código de saída será retornado?',
            '0, pois argc vale 2 ("./verificador" e "modo_seguro"), então argc < 2 é falso',
            ['1, pois argc conta apenas argumentos extras e vale 1 para "modo_seguro"', '2, pois main retorna automaticamente o valor de argc'],
            'argv[0] é o nome de invocação ("./verificador") e argv[1] é "modo_seguro", logo argc vale 2 e a função chega em return 0;.',
            'int main(int argc, char* argv[]) {\n    if (argc < 2 || argv[1][0] == \'\\0\') {\n        return 1;\n    }\n    return 0;\n}'
          ),
          q(
            'Quantos erros sintáticos impedem a compilação do rascunho abaixo?',
            'Dois erros: tipo void inválido em main e ausência de ponto e vírgula após int meta = 10',
            ['Nenhum erro, pois comentários // dispensam o ponto e vírgula na linha anterior', 'Apenas um erro: comentários // não podem aparecer dentro de chaves {}'],
            'Em ISO C++, main deve ser int main() (não void main()) e int meta = 10 exige ; antes do comentário // meta inicial.',
            'void main() {\n    int meta = 10 // meta inicial\n}'
          ),
          p(
            'Associe cada defeito em um arquivo-fonte C++ ao sintoma observado na ferramenta:',
            [
              ['Escrever int Main() sem ter int main()', 'Falha do linker reportando ponto de entrada main indefinido'],
              ['Omitir ; após int saldo = 50', 'Erro sintático do compilador apontando token inesperado na linha seguinte'],
              ['Abrir /* no topo sem nunca fechar */', 'Erro de comentário não terminado engolindo o restante do arquivo'],
              ['Terminar main() com return 4;', 'Compilação limpa, mas o processo sinaliza falha 4 ao sistema operacional']
            ],
            'Diferenciar falhas léxicas/sintáticas, erros de linkedição e códigos de saída em tempo de execução acelera qualquer depuração.'
          ),
          o(
            'Ordene a execução lógica de um int main() que inicializa tentativas = 3, testa if (tentativas > 5) return 1; e termina com return 0;:',
            [
              'Entrar em int main() abrindo o escopo principal da função',
              'Criar e inicializar a variável local tentativas com valor 3',
              'Avaliar tentativas > 5 como falso, pulando o bloco interno com return 1;',
              'Executar return 0; e encerrar o processo com status de sucesso'
            ],
            'A execução entra em main, inicializa tentativas = 3, testa a condição (falsa) e finaliza em return 0;.'
          ),
          q(
            'O que acontece com o comentário // na mesma linha em: int porta = 8080; // porta local padrão?',
            'A instrução int porta = 8080; é compilada normalmente e apenas o texto a partir de // é descartado',
            ['A linha inteira é ignorada pelo compilador, deixando porta sem declaração', 'O compilador exige fechar o comentário com // adicionais no fim da linha'],
            'O comentário de linha // atua somente da sua posição até a quebra de linha, preservando o código válido à esquerda.'
          ),
          q(
            'Qual versão abaixo escreve o menor programa C++20 padrão completo, válido e com retorno explícito de sucesso?',
            'int main() { return 0; }',
            ['main() { exit; }', 'void main() { return; }'],
            'Um programa C++ válido não exige nem #include se não usar biblioteca: int main() { return 0; } já compila e gera executável nativo.'
          )
        ]
      }
    ],
    4: [
      {
        id: 'cpp-c01-u4-l1',
        title: 'A diretiva #include <iostream>',
        subtitle: 'Apresentação · #include <iostream> e fluxos padrão',
        theory: 'O núcleo do C++ não traz comandos de tela embutidos na sintaxe: entrada e saída vêm da biblioteca padrão. A diretiva #include <iostream> instrui o pré-processador a incorporar as declarações de fluxos como std::cout (saída), std::cin (entrada) e std::cerr (erros) antes da compilação começar.',
        questions: [
          g(
            'Complete a diretiva de pré-processador necessária no topo de boas_vindas.cpp para utilizar std::cout:',
            '#include <iostream>',
            'O cabeçalho padrão <iostream> declara os objetos de fluxo de entrada e saída como std::cout, std::cin e std::cerr.',
            '____\n\nint main() {\n    std::cout << "Sistema online\\n";\n    return 0;\n}'
          ),
          q(
            'Por que em C++ padrão escrevemos #include <iostream> sem a extensão .h (ao contrário do antigo <iostream.h> pré-1998)?',
            'Porque desde o padrão ISO C++98 os cabeçalhos nativos da biblioteca padrão C++ não usam sufixo .h e declaram símbolos em std',
            ['Porque o caractere ponto é proibido em qualquer linha que comece com #', 'Porque <iostream.h> foi reservado exclusivamente para o padrão C++20'],
            '<iostream.h> era pré-padronização; em todo C++ padrão moderno usa-se <iostream> sem extensão, com símbolos dentro de std.'
          ),
          t(
            'Qual operador de dois caracteres é usado com std::cout para enviar (inserir) dados para a saída padrão?',
            '<<',
            'O operador de inserção em fluxo << direciona os valores da direita para o fluxo de saída std::cout à esquerda.',
            '#include <iostream>\n\nint main() {\n    std::cout << "OK";\n    return 0;\n}'
          ),
          q(
            'Em qual etapa da construção do programa a linha #include <iostream> é efetivamente processada?',
            'No pré-processamento, antes de o compilador analisar os tipos e funções C++',
            ['Durante a execução do programa, baixando o arquivo quando main() inicia', 'Somente após o linker gerar o executável final no disco'],
            'Toda diretiva iniciada com # é resolvida pelo pré-processador, que cola o conteúdo declarativo do cabeçalho na unidade de tradução.'
          ),
          p(
            'Associe cada fluxo declarado pelo cabeçalho <iostream> à sua finalidade:',
            [
              ['std::cout', 'Fluxo de saída padrão com buffer para mensagens normais do programa'],
              ['std::cin', 'Fluxo de entrada padrão associado tipicamente ao teclado ou pipe'],
              ['std::cerr', 'Fluxo de saída de erros sem buffer para alertas imediatos'],
              ['std::clog', 'Fluxo de saída com buffer voltado a registros de diagnóstico e log']
            ],
            '<iostream> disponibiliza os quatro fluxos clássicos: cout (saída), cin (entrada), cerr (erro imediato) e clog (log com buffer).'
          ),
          o(
            'Ordene as linhas para montar um programa C++20 completo que imprime "Pronto" seguido de quebra de linha e encerra com sucesso:',
            [
              '#include <iostream>',
              'int main() {',
              '    std::cout << "Pronto\\n";',
              '    return 0;\n}'
            ],
            'Primeiro inclui-se <iostream> no topo, depois abre-se int main(), escreve-se em std::cout e retorna-se 0.'
          ),
          q(
            'Qual texto exato aparece no terminal ao executar o programa abaixo?',
            'Setor 7 ativo',
            ['Setor7ativo', 'std::cout << Setor 7 ativo'],
            'Os três valores ("Setor ", 7 e " ativo") são encadeados no fluxo std::cout na ordem esquerda-direita, formando "Setor 7 ativo".',
            '#include <iostream>\n\nint main() {\n    std::cout << "Setor " << 7 << " ativo";\n    return 0;\n}'
          ),
          q(
            'O que ocorre ao compilar um arquivo que usa std::cout << "Teste"; mas esqueceu a linha #include <iostream>?',
            'Erro de compilação informando que cout não faz parte de std (ou que std não foi declarado)',
            ['O programa compila normalmente e apenas silencia as mensagens na tela', 'O compilador inclui <iostream> sozinho sem emitir erro nem aviso'],
            'Sem #include <iostream>, o compilador desconhece a declaração de std::cout e interrompe a compilação.'
          )
        ]
      },
      {
        id: 'cpp-c01-u4-l2',
        title: 'Cabeçalhos padrão: <string> e <cstdlib>',
        subtitle: 'Prática guiada · incluindo <string>, <cstdlib> e mais',
        theory: 'Cada recurso da biblioteca padrão mora em seu próprio cabeçalho: <string> fornece a classe de texto std::string, enquanto <cstdlib> adapta utilitários vindos da biblioteca C, como as constantes portáveis EXIT_SUCCESS e EXIT_FAILURE para o retorno de main. Sempre inclua exatamente o que você usa.',
        questions: [
          g(
            'Complete o nome do cabeçalho (com os sinais < e >) necessário para usar std::string em etiqueta.cpp:',
            '<string>',
            'O tipo std::string e suas operações de texto são garantidos pelo cabeçalho padrão <string>.',
            '#include <iostream>\n#include ____\n\nint main() {\n    std::string codigo = "AX-90";\n    std::cout << codigo << \'\\n\';\n    return 0;\n}'
          ),
          q(
            'Um código que usa std::string compilou na sua máquina apenas com #include <iostream>, sem #include <string>, mas quebrou em outro compilador. Por quê?',
            'Porque um cabeçalho padrão pode incluir outros indiretamente em uma implementação, mas o padrão ISO não garante isso entre compiladores',
            ['Porque std::string só existe no Linux e não faz parte do C++ no Windows', 'Porque #include <iostream> apaga <string> quando -std=c++20 está ativo'],
            'Nunca dependa de inclusões transitivas acidentais: se o arquivo usa std::string, ele próprio deve declarar #include <string>.'
          ),
          t(
            'No cabeçalho <cstdlib>, qual macro em letras maiúsculas representa de forma semântica um retorno de sucesso (equivalente a 0) em main()?',
            'EXIT_SUCCESS',
            'Definida em <cstdlib>, a macro EXIT_SUCCESS indica término bem-sucedido, fazendo par com EXIT_FAILURE para falhas.',
            '#include <cstdlib>\n\nint main() {\n    return EXIT_SUCCESS;\n}'
          ),
          q(
            'Por que em C++ moderno preferimos incluir <cstdlib> em vez do cabeçalho legado de C <stdlib.h>?',
            'Porque os cabeçalhos com prefixo c (como <cstdlib>) colocam as funções adaptadas dentro do namespace std',
            ['Porque arquivos .cpp recusam qualquer cabeçalho que contenha a letra h', 'Porque <stdlib.h> exige usar um compilador separado em outra janela'],
            'Em C++, cabeçalhos originados do C ganham o prefixo c e perdem o .h (<cstdlib>, <cmath>, <cstdint>), organizando funções em std::.'
          ),
          p(
            'Associe cada cabeçalho da biblioteca padrão C++ ao recurso que ele disponibiliza:',
            [
              ['<iostream>', 'Fluxos de console como std::cout, std::cin e std::cerr'],
              ['<string>', 'Classe std::string e funções como std::getline e std::stoi'],
              ['<cstdlib>', 'Constantes EXIT_SUCCESS e EXIT_FAILURE e utilitários gerais'],
              ['<cmath>', 'Funções matemáticas como std::sqrt, std::pow e std::abs']
            ],
            'Cada domínio da biblioteca padrão é modularizado em seu próprio cabeçalho para não sobrecarregar unidades que não precisam dele.'
          ),
          o(
            'Ordene os passos para escrever um programa portável que exibe uma std::string e retorna EXIT_SUCCESS:',
            [
              'Incluir explicitamente <cstdlib>, <iostream> e <string> no topo do arquivo',
              'Abrir a função int main()',
              'Declarar a variável std::string mensagem e enviá-la para std::cout',
              'Encerrar a função com return EXIT_SUCCESS;'
            ],
            'Incluir os três cabeçalhos usados diretamente evita dependências ocultas antes de usar std::string, std::cout e EXIT_SUCCESS.'
          ),
          q(
            'Qual valor é impresso no terminal pelo programa abaixo?',
            '7',
            ['6', '8'],
            'A string "Turbina" possui 7 caracteres (T-u-r-b-i-n-a), valor retornado por modulo.size().',
            '#include <iostream>\n#include <string>\n\nint main() {\n    std::string modulo = "Turbina";\n    std::cout << modulo.size() << \'\\n\';\n    return 0;\n}'
          ),
          q(
            'Ao detectar um arquivo ausente logo no início de main(), qual instrução de <cstdlib> comunica erro de forma portátil tanto no Unix quanto em outros sistemas?',
            'return EXIT_FAILURE;',
            ['return EXIT_SUCCESS;', 'return 0;'],
            'EXIT_FAILURE (de <cstdlib>) traduz-se para o código de falha adequado ao sistema operacional hospedeiro.'
          )
        ]
      },
      {
        id: 'cpp-c01-u4-l3',
        title: 'O qualificador std:: vs using namespace std',
        subtitle: 'Aprofundamento · std:: explícito e colisões de nomes',
        theory: 'Quase toda a biblioteca padrão vive dentro do namespace std para não colidir com seus próprios identificadores. Escrever std::cout e std::string deixa a origem explícita; já espalhar using namespace std; no escopo global despeja milhares de nomes (como count, data e distance) e provoca ambiguidades.',
        questions: [
          g(
            'Complete o qualificador com o operador de resolução de escopo para acessar string sem poluir o escopo global em perfil.cpp:',
            'std::',
            'O prefixo std:: usa o operador de resolução de escopo (::) para referenciar diretamente a classe string dentro do namespace std.',
            '#include <iostream>\n#include <string>\n\nint main() {\n    ____string cargo = "Piloto";\n    std::cout << cargo << \'\\n\';\n    return 0;\n}'
          ),
          q(
            'Por que colocar using namespace std; dentro de um arquivo de cabeçalho (.hpp ou .h) é considerado uma das piores práticas em C++?',
            'Porque força a poluição do escopo global em todos os arquivos .cpp que incluírem aquele cabeçalho, sem eles poderem desfazer',
            ['Porque o pré-processador proíbe a palavra namespace em arquivos .hpp', 'Porque multiplica por dez o consumo de memória RAM do programa em execução'],
            'Cabeçalhos são copiados para várias unidades de tradução; um using namespace std; ali contamina o projeto inteiro.'
          ),
          t(
            'Qual símbolo de dois caracteres conecta o nome do namespace std ao objeto cerr na expressão std::cerr?',
            '::',
            'O símbolo :: é o operador de resolução de escopo (scope resolution operator), indicando que cerr pertence ao namespace std.'
          ),
          q(
            'Um arquivo antigo tinha using namespace std; no topo e uma variável global int data = 42;. Ao atualizar para C++17/20, o código quebrou com erro de ambiguidade. Qual foi a causa?',
            'O C++17 adicionou a função std::data na biblioteca padrão, que passou a colidir com a variável global data por culpa de using namespace std;',
            ['A palavra data virou um tipo primitivo reservado equivalente a int no C++20', 'Variáveis globais do tipo int deixaram de existir a partir do padrão C++17'],
            'Novas versões do C++ adicionam símbolos em std (como std::data, std::size, std::empty); using namespace std; expõe o código a quebras futuras.'
          ),
          p(
            'Compare cada abordagem de acesso a nomes do namespace std com seu efeito no código:',
            [
              ['std::cout << valor;', 'Qualificação explícita: segura, clara e livre de colisões globais'],
              ['using namespace std; no topo de um .hpp', 'Antipadrão grave que polui todos os arquivos que incluírem o cabeçalho'],
              ['using std::cout; dentro de uma função', 'Declaração pontual restrita apenas ao bloco local daquela função'],
              ['cout << valor; sem std:: nem using', 'Erro de compilação por identificador cout não declarado no escopo']
            ],
            'Qualificar com std:: é o padrão ouro; se importar algo, prefira using pontual (using std::cout;) em escopo local, nunca global em headers.'
          ),
          o(
            'Ordene os passos para refatorar relatorio.cpp removendo um using namespace std; global com segurança:',
            [
              'Apagar a linha global using namespace std; do topo de relatorio.cpp',
              'Prefixar os tipos e objetos da biblioteca padrão usados (como std::string e std::cout) com std::',
              'Compilar relatorio.cpp com -std=c++20 -Wall -Wextra para localizar eventual símbolo esquecido',
              'Confirmar compilação limpa sem ambiguidades de nomes no escopo global'
            ],
            'Remove-se a diretiva global, qualificam-se os símbolos da biblioteca padrão com std:: e usa-se o compilador para validar todos os pontos.'
          ),
          q(
            'No código abaixo sem using namespace std;, há conflito entre a variável local count e algoritmos da biblioteca padrão?',
            'Não há conflito, pois a variável local count não colide com símbolos encapsulados dentro de std::',
            ['Sim, porque count é palavra-chave reservada pela gramática do C++', 'Sim, porque #include <iostream> proíbe declarar variáveis com nomes em inglês'],
            'É justamente para isso que o namespace std existe: proteger seus identificadores locais como count, max ou list de colisões.',
            '#include <iostream>\n\nint main() {\n    int count = 12;\n    std::cout << count << \'\\n\';\n    return 0;\n}'
          ),
          q(
            'Qual texto é exibido no console ao compilar e rodar o trecho abaixo?',
            'Rota: Sul',
            ['std::Rota: Sul', 'Sul'],
            'Tanto std::string quanto std::cout estão devidamente qualificados com std::, concatenando "Rota: " e "Sul".',
            '#include <iostream>\n#include <string>\n\nint main() {\n    std::string direcao = "Sul";\n    std::cout << "Rota: " << direcao << \'\\n\';\n    return 0;\n}'
          )
        ]
      },
      {
        id: 'cpp-c01-u4-l4',
        title: 'Ordem e organização de includes',
        subtitle: 'Aplicação · aspas vs < > e blocos organizados',
        theory: 'Organizar includes evita dependências ocultas. Usa-se "arquivo.hpp" para cabeçalhos do projeto e <biblioteca> para os do sistema. A convenção profissional ordena em grupos: 1º o cabeçalho par do .cpp, 2º outros headers locais do projeto e 3º cabeçalhos da biblioteca padrão em ordem alfabética.',
        questions: [
          q(
            'Qual é a diferença prática entre #include "motor.hpp" com aspas duplas e #include <iostream> com colchetes angulares?',
            'Aspas buscam primeiro nos diretórios locais do projeto; < > busca diretamente nos diretórios de sistema e bibliotecas configuradas',
            ['Aspas servem apenas para comentários de documentação, enquanto < > importa código real', 'Aspas compilam o arquivo em modo lento, enquanto < > ativa otimização máxima'],
            'Usamos "meu_header.hpp" para arquivos autorais do projeto e <header> para a biblioteca padrão e dependências externas de sistema.'
          ),
          q(
            'No arquivo motor.cpp, por que guias como Google C++ e LLVM recomendam colocar #include "motor.hpp" como a primeiríssima linha de include, antes até de <iostream> e <string>?',
            'Para garantir que motor.hpp seja autossuficiente e acuse erro imediato caso tenha esquecido algum #include próprio',
            ['Porque o compilador g++ recusa compilar se <iostream> vier na linha 1', 'Porque colocar motor.hpp por último apaga a função int main() do projeto'],
            'Se <string> viesse antes de "motor.hpp" em motor.cpp, ele mascararia o fato de motor.hpp usar std::string sem incluir <string>!'
          ),
          g(
            'Complete a inclusão do cabeçalho local config.hpp localizado na mesma pasta de servidor.cpp usando os delimitadores adequados:',
            '"config.hpp"',
            'Cabeçalhos pertencentes ao próprio projeto são incluídos entre aspas duplas: #include "config.hpp".',
            '#include ____\n#include <iostream>\n\nint main() {\n    return 0;\n}'
          ),
          t(
            'Organizando os cabeçalhos padrão <string>, <cstdlib> e <iostream> em ordem alfabética crescente, qual deles deve ocupar a primeira linha do grupo?',
            ['<cstdlib>', 'cstdlib'],
            'Em ordem alfabética (c -> i -> s), <cstdlib> vem primeiro, seguido por <iostream> e por fim <string>.'
          ),
          o(
            'Ordene os blocos de #include do arquivo sensor.cpp segundo a convenção moderna de organização (do topo para baixo):',
            [
              '#include "sensor.hpp" (cabeçalho correspondente ao próprio sensor.cpp)',
              '#include "calibracao.hpp" (demais cabeçalhos internos do projeto)',
              '#include <cstdlib> (primeiro cabeçalho da biblioteca padrão em ordem alfabética)',
              '#include <iostream> (cabeçalho seguinte da biblioteca padrão em ordem alfabética)'
            ],
            'A ordem canônica posiciona o header par primeiro, depois headers internos do projeto e por último a biblioteca padrão ordenada.'
          ),
          p(
            'Associe cada prática de gestão de #include em um projeto C++ à sua consequência:',
            [
              ['Incluir "rota.hpp" no topo de rota.cpp', 'Comprova na compilação que rota.hpp não depende de includes alheios'],
              ['Ordenar <cstdlib>, <iostream>, <string> alfabeticamente', 'Evita inclusões duplicadas e facilita leitura rápida da lista'],
              ['Manter dezenas de #include que o arquivo não usa mais', 'Aumenta o tempo de compilação de forma desnecessária'],
              ['Depender de <string> incluído indiretamente por outro header', 'Cria build frágil que pode quebrar ao trocar versão do compilador']
            ],
            'Includes explícitos, enxutos e ordenados aceleram o pré-processamento/compilação e blindam o projeto contra quebras transitivas.'
          ),
          q(
            'Você removeu toda impressão de console de calculo.cpp, que agora só faz contas com int, mas deixou #include <iostream> esquecido no topo. Qual é o impacto principal?',
            'O pré-processador e o compilador analisam milhares de linhas extras de <iostream> sem necessidade, deixando a compilação mais lenta',
            ['O compilador aborta com erro fatal sempre que um cabeçalho incluído não é utilizado', 'A variável de retorno de main() passa a valer 1 automaticamente'],
            '<iostream> é um cabeçalho grande; remover includes ociosos ("Include What You Use") reduz sensivelmente o tempo de build em projetos grandes.'
          ),
          q(
            'Em um arquivo .cpp que inclui tanto <string> quanto <iostream>, qual organização abaixo evita duplicatas e segue boas práticas?',
            'Agrupar os cabeçalhos padrão juntos em ordem alfabética (#include <iostream> seguido de #include <string>), uma única vez cada',
            ['Repetir #include <string> antes de cada função do mesmo arquivo .cpp', 'Misturar includes dentro do corpo de int main() logo antes de cada variável'],
            'Diretivas #include ficam concentradas e ordenadas no topo do arquivo, uma única vez por cabeçalho necessário.'
          )
        ]
      },
      {
        id: 'cpp-c01-u4-l5',
        title: 'Revisão do primeiro programa C++ completo',
        subtitle: 'Revisão e desafio · includes, std:: e primeiro programa',
        theory: 'Chegamos ao primeiro programa C++20 idiomático de ponta a ponta: cabeçalhos precisos e ordenados no topo (#include <cstdlib>, <iostream>, <string>), zero using namespace std; global, ponto de entrada int main(), uso explícito de std::cout e retorno claro de status ao sistema operacional.',
        questions: [
          t(
            'Qual texto exato é impresso por std::cout ao compilar e executar o programa painel_voo.cpp abaixo?',
            'Voo: LA-304 [0]',
            'O fluxo concatena "Voo: ", o conteúdo de codigo ("LA-304"), " [", EXIT_SUCCESS (que vale 0) e "]".',
            '#include <cstdlib>\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string codigo = "LA-304";\n    std::cout << "Voo: " << codigo << " [" << EXIT_SUCCESS << "]";\n    return EXIT_SUCCESS;\n}'
          ),
          g(
            'Complete o objeto qualificado de saída de erro imediato (sem buffer) para registrar a falha antes de retornar EXIT_FAILURE:',
            'std::cerr',
            'std::cerr (de <iostream>) é o fluxo padrão dedicado a mensagens de erro sem buffer, garantindo exibição imediata.',
            '#include <cstdlib>\n#include <iostream>\n\nint main() {\n    bool sensorFalhou = true;\n    if (sensorFalhou) {\n        ____ << "Falha critica no sensor\\n";\n        return EXIT_FAILURE;\n    }\n    return EXIT_SUCCESS;\n}'
          ),
          q(
            'Qual dos programas abaixo segue 100% das boas práticas de C++20 vistas no capítulo (includes exatos, sem poluição global de namespace e main padrão)?',
            '#include <iostream> + #include <string>, int main(), std::string e std::cout qualificados, finalizando com return 0;',
            ['#include <iostream.h>, using namespace std; global, void main() e cout sem qualificador', '#include "iostream"; com ponto e vírgula, int Main() maiúsculo e return EXIT_FAILURE para indicar sucesso'],
            'Cabeçalhos ISO sem .h, qualificação explícita std::, assinatura int main() minúscula e return 0; formam o padrão moderno.'
          ),
          q(
            'O arquivo alerta.cpp usa std::string, std::cout e EXIT_FAILURE, além de seu cabeçalho local "alerta.hpp". Qual bloco de topo está completo e bem ordenado?',
            '#include "alerta.hpp" primeiro, seguido por <cstdlib>, <iostream> e <string> em ordem alfabética',
            ['Apenas #include <iostream>, confiando que ele trará <string>, <cstdlib> e "alerta.hpp"', '#include <string> seguido de using namespace std; e #include <alerta.hpp> sem aspas'],
            'O header par "alerta.hpp" encabeça o arquivo, e os três cabeçalhos padrão efetivamente usados vêm a seguir em ordem alfabética.'
          ),
          p(
            'Relacione cada linha deste primeiro programa C++20 ao conceito estudado no capítulo:',
            [
              ['#include <iostream>', 'Diretiva do pré-processador que importa declarações de fluxos padrão'],
              ['int main() {', 'Ponto de entrada obrigatório abrindo o bloco principal de escopo'],
              ['std::cout << "Ativo\\n";', 'Instrução terminada em ; usando qualificação explícita do namespace std'],
              ['return 0;', 'Devolução do código de sucesso ao sistema operacional']
            ],
            'Essas quatro construções sintetizam pré-processamento, função principal, namespace padrão e comunicação de status com o SO.'
          ),
          o(
            'Ordene a jornada completa desde a criação de monitor.cpp até a confirmação de sua execução bem-sucedida no Linux:',
            [
              'Escrever monitor.cpp com #include <iostream>, int main(), std::cout e return 0;',
              'Compilar com g++ -std=c++20 -Wall -Wextra monitor.cpp -o monitor sem erros nem avisos',
              'Executar o binário nativo no terminal com ./monitor',
              'Conferir a mensagem impressa na tela e o código 0 em echo $?'
            ],
            'Do código-fonte idiomático passa-se pela compilação rigorosa em C++20, execução nativa e verificação do status 0.'
          ),
          q(
            'Por que em C++ moderno costuma-se preferir enviar \'\\n\' (ou "\\n" no final da string) a std::cout em vez de usar std::endl repetidamente em laços?',
            'Porque std::endl força o esvaziamento imediato do buffer (flush) a cada chamada, podendo degradar o desempenho',
            ['Porque std::endl foi removido da biblioteca padrão na edição C++20', 'Porque \'\\n\' limpa a tela inteira do terminal antes de pular de linha'],
            'Tanto "\\n" quanto std::endl quebram linha, mas std::endl também executa flush forçado do fluxo, o que raramente é necessário a cada linha.'
          ),
          q(
            'Se você remover #include <cstdlib> de um arquivo que usa apenas #include <iostream>, std::cout << "Oi\\n"; e return 0;, o código continua válido?',
            'Sim, pois o literal inteiro 0 faz parte da linguagem e não depende de <cstdlib> (que só seria necessário para EXIT_SUCCESS)',
            ['Não, pois a palavra-chave return é definida dentro do cabeçalho <cstdlib>', 'Não, pois todo arquivo C++20 precisa incluir no mínimo dois cabeçalhos padrão'],
            'return e o literal 0 são nativos da linguagem C++; remover <cstdlib> quando EXIT_SUCCESS não é usado evita um include ocioso.'
          )
        ]
      }
    ]
  });
})();
