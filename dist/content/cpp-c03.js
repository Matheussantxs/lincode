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

  const lang = "cpp";
  const chId = "cpp-c03";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "cpp-c03-u1-l2",
        title: "Larguras de bits e tamanhos fundamentais no C++",
        subtitle: "Modelo de dados da arquitetura · char, short, int, long e long long",
        theory: "O padrão ISO C++ define apenas tamanhos mínimos para tipos inteiros fundamentais: char (pelo menos 8 bits), short (mínimo 16 bits), int (mínimo 16, tipicamente 32), long (mínimo 32 bits) e long long (mínimo 64 bits). O operador sizeof retorna o tamanho exato de bytes ocupado pelo tipo no compilador e plataforma alvo.",
        questions: [
          q("Qual é o tamanho mínimo garantido pelo padrão C++ para o tipo long long?", "Pelo menos 64 bits (8 bytes de largura de representação)", ["Pelo menos 32 bits","Exatamente 128 bits"], "O tipo long long foi padronizado no C++11 para assegurar inteiros de no mínimo 64 bits em todas as plataformas."),
          q("Qual operador em C++ informa o número de bytes ocupado por um tipo ou variável na memória?", "sizeof (ex: sizeof(int))", ["lengthof","bytecount"], "sizeof é resolvido em tempo de compilação sem gerar sobrecarga na execução do executável."),
          q("Por que assumir que sizeof(long) é sempre 8 bytes em sistemas de 64 bits é um erro?", "No Windows x64 (modelo LLP64), long tem 4 bytes; no Linux x64 (LP64), long tem 8 bytes", ["Porque long só aceita números positivos","Porque o C++ proíbe 64 bits"], "O Windows preservou compatibilidade histórica mantendo sizeof(long) == 4 mesmo em compiladores de 64 bits."),
          q("Qual sufixo literal deve ser adicionado a um número inteiro para forçar o tipo long long?", "LL ou ll (ex: 9000000000LL)", ["L","U"], "O sufixo LL instrui o analisador léxico a tipar a constante literal como long long."),
          t("Qual operador em C++ retorna o tamanho em bytes de um tipo ou objeto?", ["sizeof"], "sizeof avalia o espaço em bytes ocupado pelo tipo.", "# operador de tamanho em bytes"),
          g("Complete a instrução que imprime a largura em bytes do tipo int na máquina:", ["std::cout << sizeof(int) << std::endl;"], "sizeof(int) retorna o número de bytes do tipo na arquitetura.", "std::cout << ____(int) << std::endl;"),
          o("Ordene os tipos inteiros pelo padrão dimensional mínimo garantido pelo ISO C++:", ["char: garantia mínima de 8 bits (1 byte fundamental de endereçamento)","short: garantia mínima de 16 bits de largura","int: garantia mínima de 16 bits (tipicamente 32 bits na prática)","long long: garantia mínima de 64 bits para representação de grandes magnitudes"], "Hierarquia dimensional mínima garantida pelo padrão ISO C++."),
          p("Associe o tipo primitivo C++ à sua largura mínima estipulada pelo padrão ISO:", [["char","Garantia mínima de 8 bits na arquitetura"],["short","Garantia mínima de 16 bits na arquitetura"],["long","Garantia mínima de 32 bits na arquitetura"],["long long","Garantia mínima de 64 bits no padrão moderno"]], "Tamanhos mínimos garantidos para tipos fundamentais em C++.")
        ]
      },
      {
        id: "cpp-c03-u1-l3",
        title: "Inteiros com e sem sinal (signed vs unsigned)",
        subtitle: "Aritmética modular · Perigos de underflow e comparações mistas",
        theory: "Em C++, inteiros podem ser signed (com sinal, em complemento de dois) ou unsigned (sem sinal, apenas não negativos). Tipos unsigned operam sob aritmética modular estrita (módulo 2^N): subtrair 1 de um unsigned 0 gera wraparound para seu valor máximo, criando graves bugs de segurança em contadores regressivos.",
        questions: [
          q("O que acontece em C++ ao subtrair 1 de uma variável unsigned int que contém o valor 0?", "Ocorre wraparound modular silencioso, e a variável assume o valor máximo representável (ex: 4.294.967.295)", ["O C++ dispara OverflowException","A variável assume -1"], "O padrão C++ determina que unsigned nunca gera comportamento indefinido; ele aplica aritmética modular (módulo 2^N)."),
          q("Por que o laço for (unsigned int i = 10; i >= 0; i--) é um laço infinito perigoso em C++?", "Porque como i é unsigned, i >= 0 é sempre permanentemente verdadeiro; após 0, i vira 4.294.967.295", ["Porque unsigned não aceita i--","Porque a condição não compila"], "Erro clássico onde a condição de parada nunca pode ser falsa porque números sem sinal nunca são negativos."),
          q("Qual é o perigo de comparar um int com sinal e um unsigned int em uma condicional (ex: int a = -1; unsigned int b = 1; if (a < b))?", "O int com sinal é promovido implicitamente para unsigned, transformando -1 em um número gigantesco e falso", ["O código não compila","A CPU reinicia"], "O compilador emite o aviso \"signed/unsigned comparison\"; -1 vira 4 bilhões, fazendo a < b avaliar como false."),
          q("Quando o uso de tipos unsigned é recomendado segundo os comitês de boas práticas de C++?", "Para campos de bits, criptografia, máscaras binárias e representação de memória física bruta", ["Para contadores de laços comuns","Para idades de pessoas"], "Para contagens aritméticas gerais, o comitê C++ e as Core Guidelines recomendam usar tipos com sinal (signed)."),
          t("Qual palavra-chave do C++ declara que um tipo inteiro não aceita números negativos?", ["unsigned"], "unsigned define tipos inteiros não negativos.", "# modificador de tipo sem sinal"),
          g("Complete a declaração do tipo de 32 bits sem sinal no padrão C++:", ["unsigned int mascaraBits = 0xFFFFFFFF;"], "unsigned int aceita valores de 0 até 4 bilhões.", "____ int mascaraBits = 0xFFFFFFFF;"),
          o("Ordene a progressão do valor de um contador unsigned ao regredir além do zero:", ["Variável contendo o valor positivo 1","Decremento alcançando exatamente o valor mínimo de zero (0)","Novo decremento disparando o wraparound de aritmética modular","Valor assumindo a capacidade máxima do tipo (UINT_MAX)"], "Ciclo de transição por underflow em tipos unsigned em C++."),
          p("Associe a operação com unsigned ao seu comportamento no padrão C++:", [["(unsigned int) 0 - 1","Assume UINT_MAX (4.294.967.295) por aritmética modular"],["signed int overflow","Comportamento indefinido (Undefined Behavior) pelo padrão"],["Comparação signed com unsigned","Promove signed para unsigned gerando potencial falso lógico"],["Bitwise shift em unsigned","Deslocamento puro de bits sem propagação de sinal aritmético"]], "Comportamentos de tipos com e sem sinal em C++.")
        ]
      },
      {
        id: "cpp-c03-u1-l4",
        title: "Tipos de largura fixa do cabeçalho <cstdint>",
        subtitle: "Portabilidade estrita · int32_t, uint64_t, size_t e std::intptr_t",
        theory: "Para eliminar a incerteza dimensional entre diferentes sistemas operacionais e compiladores, o C++11 padronizou o cabeçalho <cstdint>. Tipos como std::int32_t, std::uint64_t e std::size_t garantem a largura exata de bits em qualquer plataforma, sendo mandatórios em arquivos binários e protocolos de rede.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão de C++ deve ser incluído para usar tipos de largura fixa como int32_t?", "#include <cstdint>", ["#include <cstddef>","#include <iostream>"], "<cstdint> disponibiliza os tipos no namespace std (ex: std::int32_t, std::uint64_t)."),
          q("Qual é a garantia formal do tipo std::int32_t em qualquer compilador compatível?", "Garante ocupar exatamente 32 bits (4 bytes) com sinal e representação em complemento de dois", ["Ocupa pelo menos 64 bits","Varia conforme a placa de vídeo"], "Elimina discrepâncias entre plataformas, assegurando portabilidade determinística de dados."),
          q("Para que serve o tipo fundamental std::size_t em C++?", "Representar tamanhos e contagens de elementos em memória, capaz de indexar o maior objeto possível no sistema", ["Armazenar números fracionários","Substituir ponteiros nulos"], "std::size_t é retornado pelo operador sizeof e pelo método .size() de vetores da STL."),
          q("Qual tipo inteiro de <cstdint> tem a garantia de ser largo o suficiente para armazenar um ponteiro de memória?", "std::intptr_t ou std::uintptr_t", ["std::int32_t","std::size_t"], "Essencial para conversão e manipulação aritmética de endereços de ponteiros de baixo nível."),
          t("Qual tipo inteiro sem sinal de <cstdint> tem exatamente 64 bits de largura em qualquer plataforma?", ["uint64_t"], "uint64_t garante 64 bits exatos sem sinal.", "# tipo de largura fixa de 64 bits sem sinal"),
          g("Complete a inclusão do cabeçalho padrão de tipos inteiros com largura exata:", ["#include <cstdint>"], "cstdint define os tipos de largura fixa padronizados.", "#include <____>"),
          o("Ordene os tipos inteiros de <cstdint> pela sua largura exata em bits:", ["std::int8_t: exatamente 8 bits com sinal","std::int16_t: exatamente 16 bits com sinal","std::int32_t: exatamente 32 bits com sinal padronizado","std::int64_t: exatamente 64 bits para carimbos de data e IDs"], "Escala dimensional exata dos tipos de <cstdint> em C++."),
          p("Associe o tipo de <cstdint> ao seu papel técnico no desenvolvimento C++:", [["std::int32_t","Inteiro com sinal exatamente de 32 bits"],["std::uint64_t","Inteiro sem sinal de 64 bits para valores grandes"],["std::size_t","Tipo sem sinal capaz de indexar qualquer bloco em memória"],["std::uintptr_t","Inteiro sem sinal com largura exata de um ponteiro na máquina"]], "Papéis dos tipos de largura fixa no ecossistema C++ moderno.")
        ]
      },
      {
        id: "cpp-c03-u1-l5",
        title: "Inicialização uniforme (brace initialization {})",
        subtitle: "Segurança C++11 · Prevenção de estreitamento (narrowing) e o Most Vexing Parse",
        theory: "Introduzida no C++11, a inicialização uniforme com chaves (T x{valor}) é o padrão moderno recomendado. Ela proíbe conversões estreitantes (narrowing) em tempo de compilação (ex: int x{3.14} não compila) e resolve o clássico \"Most Vexing Parse\", onde declarações com parênteses eram interpretadas como funções.",
        questions: [
          q("O que acontece ao tentar compilar: int x{3.14}; usando inicialização uniforme com chaves em C++?", "Erro de compilação: narrowing conversion from \"double\" to \"int\" inside { } is illegal", ["O valor é truncado para 3 silenciosamente","O programa quebra em runtime"], "A sintaxe de chaves impede perdas acidentais de dados fracionários ou estouros de capacidade."),
          q("O que é o clássico problema \"Most Vexing Parse\" que a inicialização com chaves resolve?", "A ambiguidade sintática onde o compilador interpretava declarações com parênteses como protótipos de função", ["Um erro de inclusão circular","Um bug de vazamento de memória"], "Escrever Timer t(); era interpretado como uma função chamada t retornando Timer; Timer t{}; declara o objeto."),
          q("O que a inicialização com chaves vazias int x{}; faz com a variável primitivo em C++?", "Aplica valor-inicialização (zero-initialization), garantindo que x seja inicializado com 0", ["Deixa a variável com lixo de memória","Gera erro de sintaxe"], "Diferente de int x; que deixa bytes não inicializados, int x{}; zera a memória determinísticamente."),
          q("Por que a iniciativa C++ Core Guidelines recomenda adotar a inicialização com chaves como padrão?", "Garante inicialização determinística em toda a linguagem e detecta conversões perigosas no build", ["Reduz o tempo de execução pela metade","Permite usar variáveis sem tipo"], "Padroniza a sintaxe para primitivos, structs, arrays e contêineres da STL de maneira uniforme."),
          t("Qual símbolo de pontuação delimita a inicialização uniforme no C++ moderno?", ["{}"], "Chaves delimitam a inicialização uniforme segura.", "# delimitador de inicializacao uniforme"),
          g("Complete a inicialização uniforme segura que inicializa a variável com zero:", ["int contador{};"], "Chaves vazias realizam zero-initialization do tipo primitivo.", "int contador____;"),
          o("Ordene as formas de inicialização de variáveis primitivas da mais arriscada para a mais segura:", ["int x; (lixo de memória residual não inicializado na Stack)","int x = 3.14; (conversão com estreitamento e truncamento silencioso)","int x(3.14); (sintaxe de parênteses sujeita ao Most Vexing Parse)","int x{3}; (inicialização uniforme protegida contra narrowing pelo compilador)"], "Hierarquia de segurança das formas de inicialização em C++."),
          p("Associe a declaração de inicialização ao seu resultado no compilador C++:", [["int x;","Variável não inicializada contendo lixo de memória residual"],["int x{};","Zero-initialization garantindo valor inicial 0"],["int x{3.14};","Erro de compilação por narrowing conversion ilegal"],["Timer t{};","Instanciação inequívoca de objeto evitando o Most Vexing Parse"]], "Comportamento das formas de inicialização na linguagem C++.")
        ]
      }
    ],
    2: [
      {
        id: "cpp-c03-u2-l1",
        title: "Ponto flutuante: float, double e long double",
        subtitle: "Precisão e largura de hardware · 32, 64 e 80/128 bits no padrão IEEE 754",
        theory: "C++ disponibiliza três tipos fundamentais de ponto flutuante: float (mínimo 32 bits, precisão simples), double (mínimo 64 bits, precisão dupla, padrão de literais) e long double (precisão estendida de 80 bits em x86 ou 128 bits em ARM/PPC). Quase todas as plataformas implementam o padrão IEEE 754 nativamente.",
        questions: [
          q("Qual é o tipo de ponto flutuante padrão adotado pelo compilador C++ para literais como 3.14159?", "double (64 bits de precisão dupla)", ["float (32 bits)","long double"], "Qualquer literal decimal sem sufixo é interpretado como double."),
          q("Qual é a largura típica em bytes do tipo long double na arquitetura x86 em compiladores GCC/Clang?", "10 bytes (80 bits de precisão estendida em hardware x87), alinhado frequentemente para 12 ou 16 bytes", ["Exatamente 4 bytes","Exatamente 8 bytes"], "O x87 FPU provê precisão estendida de 80 bits nativa para cálculos científicos de altíssimo rigor."),
          q("Quantos dígitos significativos decimais o tipo float e o tipo double garantem aproximadamente em C++?", "float oferece cerca de 6 a 7 dígitos; double oferece cerca de 15 a 17 dígitos decimais", ["Ambos oferecem 10 dígitos","float oferece 20 e double oferece 40"], "Para simulações de engenharia e cálculos científicos, double é a escolha padrão da biblioteca."),
          q("Por que tipos de ponto flutuante IEEE 754 não devem ser usados para valores monetários em C++?", "Porque frações decimais não possuem representação binária exata finita, acumulando dízimas que perdem centavos", ["Porque ocupam muita memória","Porque o C++ proíbe em bancos"], "Para sistemas financeiros, deve-se usar inteiros armazenando centavos (ex: int64_t) ou bibliotecas de ponto fixo."),
          t("Qual tipo de ponto flutuante fundamental oferece precisão estendida na linguagem C++?", ["long double"], "long double provê precisão além dos 64 bits do double.", "# tipo de precisao estendida"),
          g("Complete a declaração da constante com precisão dupla padrão:", ["double fatorMultiplicador = 1.05;"], "double é o tipo decimal padrão da linguagem.", "____ fatorMultiplicador = 1.05;"),
          o("Ordene os tipos de ponto flutuante de C++ por sua amplitude e precisão de mantissa:", ["float: 32 bits de precisão simples no hardware","double: 64 bits de precisão dupla no hardware","long double: precisão estendida de 80 bits ou 128 bits no compilador","std::numeric_limits<double>::infinity(): representação formal de valor infinito"], "Escala dimensional dos tipos de ponto flutuante em C++."),
          p("Associe o tipo de ponto flutuante à sua respectiva precisão aproximada:", [["float","Precisão simples de 32 bits (~7 dígitos decimais)"],["double","Precisão dupla de 64 bits (~16 dígitos decimais)"],["long double","Precisão estendida para cálculos numéricos rigorosos"],["sizeof(double)","Normalmente avalia para 8 bytes na maioria das plataformas"]], "Características dos tipos de ponto flutuante em C++.")
        ]
      },
      {
        id: "cpp-c03-u2-l2",
        title: "Literais de ponto flutuante e sufixos f e L",
        subtitle: "Precisão literal · Notação científica e controle estrito de sufixos",
        theory: "Literais fracionários em C++ podem receber sufixos para definir seu tipo exato: f ou F para float (ex: 3.14f), L para long double (ex: 1.0L) e ausência de sufixo para double. Eles também aceitam notação científica com expoente e ou E (ex: 1.5e-3 para 0.0015), facilitando valores muito pequenos ou gigantescos.",
        questions: [
          q("Qual caractere de sufixo deve ser aposto a um literal numérico para que ele seja do tipo float em C++?", "f ou F (ex: 9.8f)", ["d ou D","m ou M"], "Sem o sufixo f, o compilador tipará o literal como double, podendo gerar avisos de truncamento."),
          q("O que a notação científica 2.5e4 representa em termos matemáticos?", "2.5 multiplicado por 10 elevado a 4 (25.000,0)", ["2.5 elevado a 4","2.5 dividido por 4"], "A notação com e/E representa potências de base 10 na representação numérica de ponto flutuante."),
          q("Qual sufixo literal deve ser adicionado a um número decimal para tipá-lo como long double?", "L ou l (ex: 3.14159265358979323846L)", ["LD","D"], "O sufixo L assegura que a constante literal seja carregada com a mantissa estendida suportada pelo hardware."),
          q("O que acontece se atribuirmos um literal double como 3.14 a uma variável float: float x = 3.14;?", "O compilador aceita porém pode emitir aviso de truncamento de precisão (narrowing conversion)", ["Ocorre erro fatal de sintaxe","O programa fecha em runtime"], "Adicionar o sufixo f (3.14f) elimina o aviso explicitando que o dado cabe em 32 bits."),
          t("Qual caractere sufixa literais de ponto flutuante para torná-los de precisão simples float?", ["f"], "O sufixo f define literais float.", "# sufixo literal float"),
          g("Complete a constante de aceleração da gravidade como float estrito:", ["float gravidade = 9.80665f;"], "O sufixo f evita coerção implícita a partir de double.", "float gravidade = 9.80665____;"),
          o("Ordene os literais de ponto flutuante por sua magnitude matemática:", ["1.0e-3: equivalente a 0.001 (um milésimo)","1.0f: equivalente a 1.0 em precisão simples","1.0e3: equivalente a 1000.0 (mil unidades)","1.0e6: equivalente a 1.000.000.0 (um milhão)"], "Comparação de ordens de magnitude em notação científica de ponto flutuante."),
          p("Associe a notação literal ao seu respectivo tipo no compilador C++:", [["3.14f","Literal do tipo float (32 bits)"],["3.14","Literal do tipo double (64 bits padrão)"],["3.14L","Literal do tipo long double (precisão estendida)"],["1.5e-4","Notação científica com expoente decimal de base 10"]], "Tipagem de literais fracionários no padrão C++.")
        ]
      },
      {
        id: "cpp-c03-u2-l3",
        title: "O padrão IEEE 754 no C++: NaN, Infinity e div por zero",
        subtitle: "Estados especiais · O cabeçalho <cmath> e funções std::isnan e std::isinf",
        theory: "No C++, operações de ponto flutuante que dividem por zero produzem infinitos (+inf ou -inf), e operações matematicamente indefinidas (0.0 / 0.0) produzem NaN (Not a Number) sem lançar exceções. O cabeçalho <cmath> provê as funções canônicas std::isnan e std::isinf para inspecionar esses estados com segurança.",
        questions: [
          q("O que a divisão 1.0 / 0.0 produz em C++ segundo a especificação IEEE 754?", "O valor infinito positivo (representado no console como inf ou 1.#INF)", ["Dispara divisão por zero fatal","Retorna 0.0"], "Ao contrário de inteiros, o padrão de ponto flutuante gera um valor especial de saturação infinita."),
          q("O que a operação fracionária 0.0 / 0.0 produz em C++?", "O valor especial NaN (Not a Number, indicando resultado indefinido)", ["Retorna 0.0","Dispara exceção"], "Qualquer cálculo matemático que não tenha solução real válida produz o estado NaN."),
          q("Por que a comparação x == NAN ou x == x não deve ser usada para testar NaN?", "Porque por definição formal do IEEE 754, NaN nunca é igual a nada, nem a si mesmo (NaN == NaN é false)", ["Porque NAN não compila","Porque a CPU trava"], "A única forma segura e portátil de testar NaN em C++ é chamando a função std::isnan(x)."),
          q("Qual cabeçalho da biblioteca padrão de C++ deve ser incluído para usar std::isnan e std::isinf?", "#include <cmath>", ["#include <cfloat>","#include <iostream>"], "<cmath> define funções matemáticas e utilitários de inspeção de ponto flutuante do padrão."),
          t("Qual função da biblioteca <cmath> verifica com segurança se um valor de ponto flutuante é NaN?", ["std::isnan"], "std::isnan identifica valores matemáticos indefinidos.", "# funcao verificadora de NaN"),
          g("Complete a verificação preventiva de indefinição usando o cabeçalho <cmath>:", ["if (std::isnan(resultado)) {\n    tratarErro();\n}"], "std::isnan é a forma canônica de detectar NaN.", "if (std::____(resultado)) {\n    tratarErro();\n}"),
          o("Ordene as etapas de detecção e contenção de valores anômalos de ponto flutuante:", ["Execução da computação matemática complexa sobre variáveis float ou double","Verificação se o resultado é infinito com a função std::isinf(resultado)","Verificação se o resultado é indefinido com a função std::isnan(resultado)","Acionamento de fluxo de contingência caso qualquer estado atípico seja detectado"], "Pipeline defensivo de validação de cálculos científicos em C++."),
          p("Associe a operação matemática ao estado resultante segundo o IEEE 754 em C++:", [["1.0 / 0.0","Infinito positivo (+inf) por saturação de limite"],["-1.0 / 0.0","Infinito negativo (-inf) por saturação de limite"],["0.0 / 0.0","NaN (Not a Number) por indefinição matemática"],["std::isinf(x)","Retorna true se o número for infinito positivo ou negativo"]], "Estados especiais de ponto flutuante no padrão IEEE 754 em C++.")
        ]
      },
      {
        id: "cpp-c03-u2-l4",
        title: "Formatação de saída com <iomanip>",
        subtitle: "Manipuladores de stream · std::fixed, std::scientific e std::setprecision",
        theory: "Para controlar a exibição visual de números fracionários no terminal, C++ disponibiliza o cabeçalho <iomanip>. Manipuladores de stream como std::fixed fixam o número de casas decimais após a vírgula, std::scientific ativa a notação exponencial, e std::setprecision(N) define a quantidade de dígitos impressos.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão de C++ deve ser incluído para utilizar std::setprecision?", "#include <iomanip>", ["#include <iostream>","#include <cmath>"], "<iomanip> provê manipuladores parametrizados para fluxos de entrada e saída (streams)."),
          q("Qual é a diferença no comportamento de std::setprecision(2) com e sem std::fixed?", "Com std::fixed, formata exatamente 2 casas decimais após o ponto; sem fixed, formata 2 dígitos significativos totais", ["Sem fixed não imprime nada","Não há diferença"], "A combinação std::fixed << std::setprecision(2) é o padrão canônico para formatação de moeda e tabelas."),
          q("Qual manipulador de stream formata números de ponto flutuante em notação científica de expoente?", "std::scientific", ["std::exponential","std::exponent"], "std::scientific força a impressão no formato padronizado com e+NN (ex: 1.234567e+02)."),
          q("Manipuladores como std::fixed afetam apenas a próxima impressão ou permanecem ativos na stream?", "Permanecem ativos na stream para todas as impressões subsequentes até serem explicitamente redefinidos", ["Afetam apenas a linha atual","Resetam a cada std::endl"], "Estados de formatação de stream são persistentes, exigindo que o desenvolvedor os restaure se necessário."),
          t("Qual manipulador de stream fixa o número de casas decimais após o ponto flutuante em C++?", ["std::fixed"], "std::fixed trava a contagem de casas decimais fracionárias.", "# manipulador de casas decimais fixas"),
          g("Complete a formatação para exibir duas casas decimais fixas no console:", ["std::cout << std::fixed << std::setprecision(2) << valor;"], "std::fixed fixa as casas decimais estipuladas por setprecision.", "std::cout << std::____ << std::setprecision(2) << valor;"),
          o("Ordene a sequência de manipuladores para imprimir um valor monetário de forma canônica:", ["Acesso ao fluxo de saída padrão através de std::cout","Injeção do manipulador std::fixed para fixar a contagem de casas decimais","Injeção do manipulador parametrizado std::setprecision(2)","Injeção da variável numérica a ser impressa formatada no console"], "Anatomia da pipeline de formatação de números fracionários em fluxos C++."),
          p("Associe o manipulador de stream ao seu efeito de apresentação visual:", [["std::fixed","Exibe números em notação decimal de casas fixas"],["std::setprecision(n)","Configura a precisão ou o número de casas decimais"],["std::scientific","Força a apresentação em notação científica de expoente"],["std::defaultfloat","Restaura a formatação padrão automática do compilador"]], "Manipuladores de ponto flutuante do cabeçalho <iomanip> em C++.")
        ]
      },
      {
        id: "cpp-c03-u2-l5",
        title: "Comparação tolerante com epsilon (std::abs)",
        subtitle: "Aritmética aproximada · Por que a == b falha em floats e a técnica delta",
        theory: "Devido à representação binária do IEEE 754, a soma 0.1 + 0.2 resulta em 0.30000000000000004, fazendo a comparação direta (a == b) falhar. Em C++, números de ponto flutuante devem ser comparados com tolerância de erro (epsilon) usando std::abs(a - b) <= epsilon ou std::numeric_limits<double>::epsilon().",
        questions: [
          q("Por que comparar números de ponto flutuante com o operador de igualdade direta if (a == b) é má prática em C++?", "Porque aproximações infinitesimais binárias acumuladas fazem números matematicamente iguais divergirem em bits", ["Porque o compilador C++ não permite == em float","Porque o operador == é lento"], "Mesmo pequenas divergências no último bit da mantissa fazem a comparação de igualdade estrita retornar false."),
          q("Como funciona a técnica de comparação tolerante com epsilon (diferença absoluta)?", "Verifica se a distância absoluta entre os dois números é menor que um limiar mínimo: std::abs(a - b) <= epsilon", ["Divide um pelo outro e vê se dá 1","Arredonda ambos para inteiros"], "Se a diferença for menor que a margem tolerável, os números são considerados iguais para o negócio."),
          q("Qual cabeçalho fornece a constante std::numeric_limits<double>::epsilon()?", "#include <limits>", ["#include <cmath>","#include <iostream>"], "<limits> expõe as características e tolerâncias de precisão de todos os tipos numéricos."),
          q("Para que serve a função std::abs(x) do cabeçalho <cmath> na comparação de tolerância?", "Calcula o valor absoluto da diferença descartando qualquer sinal negativo", ["Calcula a raiz quadrada","Arredonda o número para cima"], "std::abs garante que a distância entre os operandos seja sempre uma grandeza positiva mensurável."),
          t("Qual constante ou limiar mínimo aceitável de tolerância é convencionalmente chamado na computação?", ["epsilon"], "Epsilon define a margem de erro aceitável entre números reais.", "# termo para limiar de tolerancia epsilon"),
          g("Complete a função de comparação tolerante entre dois números reais:", ["bool Iguais(double a, double b, double epsilon = 1e-6) {\n    return std::abs(a - b) <= epsilon;\n}"], "std::abs calcula a diferença absoluta entre os números.", "bool Iguais(double a, double b, double epsilon = 1e-6) {\n    return std::____(a - b) <= epsilon;\n}"),
          o("Ordene as etapas para comparar dois números de ponto flutuante com tolerância epsilon:", ["Calcular a subtração entre os dois números operando a - b","Obter o valor absoluto da diferença utilizando std::abs(a - b)","Comparar se a magnitude da diferença é menor ou igual ao epsilon estipulado","Retornar true se a diferença for insignificante, ou false caso difiram"], "Algoritmo de comparação com tolerância de ponto flutuante em C++."),
          p("Associe a abordagem de comparação ao seu resultado na engenharia de software:", [["if (a == b) direto","Frágil e propenso a falsos negativos por divergência de bits da mantissa"],["std::abs(a - b) <= eps","Robusto e tolerante a resíduos de arredondamento binário"],["std::numeric_limits::epsilon","Menor valor representável tal que 1.0 + eps != 1.0"],["Comparação relativa (|a-b|/max)","Tolerância proporcional recomendada para grandezas de alta magnitude"]], "Estratégias de comparação de números de ponto flutuante em C++.")
        ]
      }
    ],
    3: [
      {
        id: "cpp-c03-u3-l1",
        title: "O tipo fundamental bool no C++",
        subtitle: "Lógica booleana nativa · true, false, sizeof(bool) e representação em memória",
        theory: "No C++, bool é um tipo fundamental nativo que aceita exclusivamente os literais booleanos true e false. O operador sizeof(bool) retorna tipicamente 1 byte (8 bits), pois embora represente apenas um bit de informação lógica, 1 byte é a menor unidade diretamente endereçável pela arquitetura da CPU.",
        questions: [
          q("Qual é o tamanho típico em memória retornado por sizeof(bool) na maioria das arquiteturas modernas?", "1 byte (8 bits de largura na memória da CPU)", ["1 bit","4 bytes"], "A CPU não consegue endereçar bits isolados individualmente; bytes são a menor unidade física de endereçamento de memória."),
          q("Quais são os dois únicos valores literais válidos nativos para o tipo bool em C++?", "true e false em letras minúsculas", ["TRUE e FALSE","0 e 1 apenas"], "true e false são palavras reservadas do padrão ISO C++ desde a sua primeira especificação."),
          q("O que acontece internamente quando um bool é promovido para int em expressões aritméticas em C++?", "true é promovido para o número inteiro 1, e false é promovido para 0", ["true vira -1","Gera erro de compilação"], "Essa promoção integral é definida pelo padrão para compatibilidade com o legado histórico da linguagem C."),
          q("Por que a biblioteca padrão de C++ especializou o contêiner std::vector<bool>?", "Para compactar cada booleano em exatamente 1 bit na memória, economizando 87.5% de espaço", ["Para rodar na GPU","Para usar strings internamente"], "std::vector<bool> é uma especialização histórica que armazena bits empacotados em palavras de memória."),
          t("Qual palavra-chave declara o tipo de dado lógico primitivo verdadeiro/falso em C++?", ["bool"], "bool é o tipo nativo para expressões booleanas em C++.", "# tipo booleano primitivo"),
          g("Complete a declaração da flag de execução de processo:", ["bool processoAtivo = true;"], "bool armazena estados lógicos nativos.", "____ processoAtivo = true;"),
          o("Ordene a estrutura de alocação e avaliação de uma variável bool na Stack:", ["Declaração da variável com inicialização uniforme (bool ativo{true})","Alocação de 1 byte de espaço físico na Stack da thread","Armazenamento do valor numérico 1 no byte de memória","Leitura do byte por instruções condicionais avaliando se é diferente de zero"], "Ciclo de vida e representação de variáveis do tipo bool em C++."),
          p("Associe o elemento do tipo bool à sua característica no padrão C++:", [["true","Literal booleano representando estado verdadeiro"],["false","Literal booleano representando estado falso"],["sizeof(bool)","Tipicamente avalia para 1 byte de endereçamento"],["std::vector<bool>","Especialização da STL que compacta dados em 1 bit por elemento"]], "Propriedades do tipo bool na linguagem C++.")
        ]
      },
      {
        id: "cpp-c03-u3-l2",
        title: "Coerção e conversão implícita entre inteiros e bool",
        subtitle: "Compatibilidade com C · 0 avalia para false, qualquer não-zero avalia para true",
        theory: "Herdado da linguagem C, o C++ realiza coerção implícita entre números inteiros e o tipo bool: o valor numérico 0 (e ponteiros nulos nullptr) é convertido para false; qualquer outro valor diferente de zero (incluindo números negativos como -1) é convertido para true em avaliações lógicas.",
        questions: [
          q("Para qual valor booleano o número inteiro -1 é convertido ao ser atribuído a um bool em C++?", "true (pois qualquer valor numérico diferente de zero avalia estritamente como verdadeiro)", ["false","Erro de compilação"], "Apenas o valor zero exato (0) converte para false; números negativos possuem bits ativos e viram true."),
          q("Qual é o resultado da conversão de um ponteiro nulo (nullptr) para o tipo bool em uma condicional?", "false (ponteiros nulos são avaliados como falsos por definição da linguagem)", ["true","Comportamento indefinido"], "Permite a clássica verificação defensiva de ponteiros em C++: if (ptr) { ptr->Executar(); }."),
          q("Por que a conversão implícita de inteiros para bool pode gerar bugs sutis em código?", "Porque erros aritméticos que produzem números acidentais diferentes de zero passam despercebidos como verdadeiros", ["Porque desliga a compilação","Porque o C++ não tem operadores lógicos"], "Escrever if (resultado) quando resultado armazena códigos de status pode mascarar erros se 0 for sucesso."),
          q("Como prevenir conversões estreitantes indesejadas de inteiros para bool no C++11?", "Utilizando inicialização uniforme com chaves: bool b{numero}; que rejeita narrowing no build", ["Usando ponteiros void","Usando macros de compilação"], "A sintaxe de chaves proíbe que inteiros sejam coagidos silenciosamente para bool sem cast explícito."),
          t("Qual número inteiro primitivo único é convertido estritamente para o valor booleano false?", ["0"], "Zero é o único valor numérico coagido para false.", "# numero inteiro equivalente a false"),
          g("Complete o teste idiomático de validade de um ponteiro antes do uso:", ["if (ponteiroRecurso) {\n    ponteiroRecurso->Processar();\n}"], "Ponteiros válidos avaliam para true e nulos avaliam para false.", "if (____) {\n    ponteiroRecurso->Processar();\n}"),
          o("Ordene os valores inteiros pelo seu valor booleano resultante após coerção implícita:", ["0: avalia para false (único número inteiro que converte para falso)","1: avalia para true","-50: avalia para true (números negativos diferem de zero)","1000: avalia para true (qualquer grandeza positiva não nula)"], "Mapeamento de inteiros para valores booleanos no padrão C++."),
          p("Associe o valor à sua avaliação booleana no C++:", [["0","Avalia para false na coerção implícita"],["nullptr","Avalia para false por representar ponteiro nulo"],["-1","Avalia para true por ser valor numérico não-zero"],["42","Avalia para true por representar grandeza positiva ativa"]], "Regras de coerção implícita para o tipo bool em C++.")
        ]
      },
      {
        id: "cpp-c03-u3-l3",
        title: "Manipulador std::boolalpha para saída textual",
        subtitle: "Formatação de console · Imprimindo \"true\" e \"false\" em vez de 1 e 0",
        theory: "Por padrão histórico, streams como std::cout imprimem variáveis do tipo bool como dígitos numéricos (1 para true e 0 para false). Injetar o manipulador de stream std::boolalpha do cabeçalho <iostream> instrui o fluxo a exibir os termos textuais literais \"true\" e \"false\", elevando a clareza de logs e depuração.",
        questions: [
          q("O que a instrução std::cout << true << std::endl; imprime no console por padrão em C++?", "Imprime o dígito 1", ["Imprime a palavra \"true\"","Imprime \"SIM\""], "Streams mantêm a formatação numérica histórica por padrão para compatibilidade com código C legado."),
          q("Qual manipulador da biblioteca padrão altera a exibição de booleans de números (1/0) para texto (\"true\"/\"false\")?", "std::boolalpha", ["std::noboolalpha","std::textmode"], "boolalpha ativa a formatação textual no fluxo de saída especificado."),
          q("Qual manipulador restaura o comportamento padrão numérico de impressão de booleans (1 e 0)?", "std::noboolalpha", ["std::resetalpha","std::defaultbool"], "noboolalpha reverte a stream para exibir os dígitos 1 e 0 novamente."),
          q("O manipulador std::boolalpha também afeta a leitura de dados com std::cin?", "Sim; com std::boolalpha ativo no cin, ele passa a interpretar as palavras textuais \"true\" e \"false\" do teclado", ["Não, funciona apenas com cout","Apenas em arquivos binários"], "Permite que o operador de extração >> leia palavras booleanas digitadas diretamente pelo usuário."),
          t("Qual manipulador de stream da biblioteca <iostream> ativa a impressão textual de valores booleanos?", ["std::boolalpha"], "std::boolalpha imprime true/false em vez de 1/0.", "# manipulador de exibicao textual de bool"),
          g("Complete a injeção do manipulador textual no fluxo de saída do console:", ["std::cout << std::boolalpha << flagAtiva << std::endl;"], "std::boolalpha força a exibição das palavras true ou false.", "std::cout << std::____ << flagAtiva << std::endl;"),
          o("Ordene as etapas para configurar e imprimir uma mensagem booleana legível no console:", ["Acessar o fluxo de saída padrão através de std::cout","Injetar o manipulador std::boolalpha no fluxo","Injetar a variável do tipo bool a ser exibida no terminal","Inserir a quebra de linha com std::endl liberando o buffer de saída"], "Anatomia da formatação textual de premissas lógicas em C++."),
          p("Associe o manipulador de stream ao seu efeito visual na impressão de bool:", [["std::boolalpha","Exibe true ou false como palavras textuais legíveis"],["std::noboolalpha","Restaura a exibição como dígitos numéricos 1 ou 0"],["std::cin >> boolalpha","Permite ler as palavras \"true\" e \"false\" diretamente do teclado"],["std::cout padrão","Imprime 1 para verdadeiro e 0 para falso"]], "Manipuladores de formatação booleana em streams de C++.")
        ]
      },
      {
        id: "cpp-c03-u3-l4",
        title: "Operadores lógicos com curto-circuito (&&, ||) e negação (!)",
        subtitle: "Avaliação eficiente · Garantias de ordem e prevenção de falhas de desreferenciamento",
        theory: "C++ implementa operadores lógicos de curto-circuito: && (conjunção) e || (disjunção). O operador && não avalia a expressão da direita se a da esquerda for false; o operador || não avalia a direita se a esquerda for true. Isso é a garantia formal que permite testar ponteiros antes do acesso: if (ptr && ptr->Valido()).",
        questions: [
          q("Como funciona a avaliação de curto-circuito no operador lógico && em C++?", "Se a expressão da esquerda for false, a expressão da direita nem sequer é avaliada pela CPU", ["Ambos os lados rodam sempre","A direita roda antes da esquerda"], "Garante que expressões perigosas à direita não sejam executadas se a guarda da esquerda falhar."),
          q("Por que a expressão: if (ptr != nullptr && ptr->Processar()) é segura contra segmentation fault?", "Porque se ptr for nulo, && interrompe a verificação sem tentar desreferenciar ptr->Processar()", ["Porque o compilador C++ cria objetos nulos","Porque o operador -> ignora ponteiros nulos"], "O operador && atua como cláusula de proteção essencial no manuseio de ponteiros e referências em C++."),
          q("Qual é a diferença entre os operadores lógicos (&&, ||) e os operadores bitwise (&, |) em C++?", "Operadores lógicos possuem curto-circuito e operam em bool; operadores bitwise operam bit a bit sem curto-circuito", ["Operadores bitwise são mais modernos","Não há diferença"], "Operadores & e | sempre avaliam ambos os lados obrigatoriamente, descartando a proteção de curto-circuito."),
          q("O que acontece se uma classe em C++ sobrecarregar os operadores operator&& ou operator||?", "Eles perdem a semântica de curto-circuito, passando a avaliar ambos os operandos como argumentos normais", ["Eles rodam duas vezes mais rápido","O compilador rejeita"], "Regra de ouro das Core Guidelines: nunca sobrecarregue &&, || ou a vírgula (,) em tipos customizados."),
          t("Qual operador de dois caracteres implementa disjunção lógica com curto-circuito em C++?", ["||"], "|| para a avaliação assim que encontra um termo verdadeiro.", "# operador de disjuncao com curto circuito"),
          g("Complete a cláusula de guarda segura que valida ponteiros com curto-circuito:", ["if (arquivo && arquivo->EstaAberto()) {\n    arquivo->Ler();\n}"], "&& protege contra desreferenciamento de ponteiro nulo.", "if (arquivo ____ arquivo->EstaAberto()) {\n    arquivo->Ler();\n}"),
          o("Ordene as etapas de execução da expressão (divisor != 0 && (100 / divisor) > 2) quando divisor vale 0:", ["Avaliar o operando da esquerda: (divisor != 0)","Constatar que o resultado é false (pois divisor é 0)","Aplicar o curto-circuito do operador && interrompendo a verificação","Retornar false sem executar a divisão (100 / divisor) prevenindo falha de hardware"], "Prevenção de falha aritmética fatal via operador de curto-circuito em C++."),
          p("Associe o operador lógico ao seu padrão de avaliação em C++:", [["&& com curto-circuito","Pula a avaliação da direita caso a esquerda seja false"],["|| com curto-circuito","Pula a avaliação da direita caso a esquerda seja true"],["! unário","Inverte o valor booleano da expressão imediatamente à direita"],["& bit a bit","Executa ambos os operandos calculando interseção bitwise sem curto-circuito"]], "Comportamento dos operadores lógicos e bitwise no padrão C++.")
        ]
      },
      {
        id: "cpp-c03-u3-l5",
        title: "Precedência de operadores e Leis de De Morgan em C++",
        subtitle: "Raciocínio lógico · Simplificação de expressões condicionais complexas",
        theory: "Na gramática de C++, operadores relacionais têm precedência maior que operadores lógicos, e ! precede &&, que precede ||. Pelas Leis de De Morgan, a negação de uma conjunção !(a && b) equivale a (!a || !b), e !(a || b) equivale a (!a && !b). O uso de parênteses é recomendado para garantir clareza e evitar ambiguidades.",
        questions: [
          q("Qual operador possui maior precedência na expressão: a || b && c no padrão C++?", "O operador && possui precedência superior ao operador || (a expressão é avaliada como a || (b && c))", ["O operador ||","Eles têm a mesma precedência e avaliam da direita"], "A conjunção lógica vincula seus operandos com maior prioridade que a disjunção."),
          q("Pelas Leis de De Morgan, qual expressão é equivalente à negação !(conectado && autenticado)?", "!conectado || !autenticado", ["!conectado && !autenticado","conectado || autenticado"], "A negação do E transforma-se no OU com os operandos individuais invertidos."),
          q("Pelas Leis de De Morgan, qual expressão equivale a !(x > 0 || y < 10)?", "x <= 0 && y >= 10", ["x <= 0 || y >= 10","x > 0 && y < 10"], "Inverte os operadores de limite relacional e substitui a disjunção por conjunção lógica."),
          q("Por que é altamente recomendado utilizar parênteses explícitos em expressões lógicas complexas em C++?", "Para tornar a intenção do código cristalina para revisores e evitar dependência de memorização de tabelas", ["Para acelerar o executável","Porque o compilador exige parênteses"], "Clareza supera concisão excessiva: expressões legíveis previnem falhas em manutenções futuras."),
          t("Qual símbolo de pontuação deve ser utilizado para forçar agrupamento prioritário em C++?", ["()"], "Parênteses agrupam subexpressões forçando a ordem desejada.", "# delimitadores de prioridade de expressao"),
          g("Complete a refatoração aplicando De Morgan para !(isAdmin || isRoot):", ["bool semAcesso = !isAdmin && !isRoot;"], "Nega ambos os operandos e troca o operador OU pelo operador E.", "bool semAcesso = !isAdmin ____ !isRoot;"),
          o("Ordene os elementos de avaliação da expressão (x + 2 > 10 && !pronto):", ["Resolução da operação aritmética prioritária (x + 2)","Avaliação do operador unário de negação (!pronto)","Avaliação do operador relacional de comparação (> 10)","Avaliação final da conjunção de curto-circuito com o operador &&"], "Hierarquia formal de resolução de operadores aritméticos e lógicos em C++."),
          p("Associe a expressão negada à sua forma equivalente direta em C++:", [["!(a && b)","(!a || !b) com disjunção dos termos negados"],["!(a || b)","(!a && !b) com conjunção dos termos negados"],["!(x == y)","(x != y) aplicando desigualdade direta"],["!(x >= 100)","(x < 100) invertendo a relação de limite"]], "Equivalências fundamentais das Leis de De Morgan em C++.")
        ]
      }
    ],
    4: [
      {
        id: "cpp-c03-u4-l1",
        title: "O qualificador const e imutabilidade de variáveis",
        subtitle: "Correção de tipos (Const-Correctness) · Protegendo dados contra mutações acidentais",
        theory: "O qualificador const em C++ impede que o valor de uma variável seja alterado após sua inicialização. Variáveis const devem ser obrigatoriamente inicializadas no ponto de declaração. A adoção rigorosa de Const-Correctness documenta a intenção do código, evita bugs de efeitos colaterais e auxilia na otimização do compilador.",
        questions: [
          q("O que o compilador C++ faz caso o código tente atribuir um novo valor a uma variável const?", "Emite erro de compilação: assignment of read-only variable, bloqueando a geração do binário", ["Permite com um aviso","Lança exceção em runtime"], "const é aplicado estritamente pelo sistema de tipos em tempo de compilação."),
          q("Onde uma variável marcada como const deve obrigatoriamente receber seu valor inicial?", "Diretamente no momento de sua declaração na mesma instrução", ["Em qualquer função posterior","Apenas no destrutor"], "Como seu valor nunca poderá ser modificado posteriormente, declará-la sem valor geraria erro imediato."),
          q("O que é o princípio de \"Const-Correctness\" na engenharia de software C++?", "A prática disciplinada de declarar como const toda variável, parâmetro ou método que não deve alterar estado", ["Um estilo de formatação de código","Um tipo de licença de software"], "Facilita a leitura, melhora o paralelismo e permite ao compilador aplicar otimizações agressivas de registradores."),
          q("Qual é a diferença entre const int* p (ponteiro para constante) e int* const p (ponteiro constante)?", "const int* p impede alterar o dado apontado; int* const p impede alterar o endereço de memória do ponteiro", ["São completamente sinônimos","O segundo não compila"], "Regra do \"leia de trás para frente\": const antes do tipo protege o dado; const após o asterisco protege o ponteiro."),
          t("Qual palavra-chave do C++ qualifica uma variável como somente leitura e imutável?", ["const"], "const protege o valor contra mutações após a inicialização.", "# qualificador de tipo somente leitura"),
          g("Complete a declaração da constante com a tipagem segura de somente leitura:", ["const int LimiteTentativas{5};"], "const impede qualquer alteração posterior no limite.", "____ int LimiteTentativas{5};"),
          o("Ordene as etapas da proteção de integridade com Const-Correctness:", ["Declaração da variável com qualificador const e inicialização uniforme imediata","Tentativa indevida de modificação do valor por outra rotina ou instrução","Interceptação pelo analisador de tipos do compilador acusando violação de leitura","Bloqueio do build antes da geração de qualquer executável corrompido"], "Ciclo de proteção estática de imutabilidade com const no compilador C++."),
          p("Associe a declaração ao seu contrato de imutabilidade em C++:", [["const int x = 10;","Variável inteira imutável protegida contra modificação"],["const int* ptr","Ponteiro que aponta para um dado inteiro que não pode ser alterado"],["int* const ptr","Ponteiro cujo endereço armazenado não pode ser reatribuído"],["const int* const ptr","Ponteiro imutável apontando para um dado inteiro imutável"]], "Variações de aplicação do qualificador const em C++.")
        ]
      },
      {
        id: "cpp-c03-u4-l2",
        title: "A palavra-chave constexpr no C++11",
        subtitle: "Metaprogramação moderna · Computação em tempo de compilação com zero custo em runtime",
        theory: "Introduzida no C++11 e enriquecida no C++14/17/20, a palavra-chave constexpr especifica que uma variável ou função pode ser avaliada completamente em tempo de compilação. Constantes constexpr são embutidas diretamente como literais no executável, garantindo zero sobrecarga de processamento na execução do programa.",
        questions: [
          q("Qual é a diferença essencial entre const e constexpr em C++ moderno?", "const garante apenas imutabilidade em tempo de execução; constexpr garante que o valor pode ser resolvido no build", ["constexpr só funciona com números inteiros","const foi depreciado pelo C++11"], "Toda variável constexpr é implicitamente const, mas nem toda const é constexpr."),
          q("Quais operações podem ser utilizadas para inicializar uma variável constexpr em C++?", "Apenas expressões constantes (constant expressions) cujos operandos sejam conhecidos em tempo de compilação", ["Leituras do teclado com std::cin","Geração de números aleatórios de SO"], "Se a expressão depender de dados fornecidos pelo usuário em runtime, o compilador rejeitará o constexpr."),
          q("O que acontece se uma função marcada como constexpr receber argumentos em tempo de execução normais?", "Ela executa normalmente em tempo de execução como uma função comum sem nenhum erro", ["O código não compila","O programa quebra"], "Funções constexpr são versáteis: rodam no build se os argumentos forem constantes, ou em runtime caso contrário."),
          q("Onde uma constante constexpr pode ser utilizada onde uma const comum seria rejeitada em C++?", "Como tamanho fixo na declaração de arrays tradicionais ou em parâmetros de templates (std::array<int, N>)", ["Apenas em funções inline","Em nenhum lugar diferente"], "Templates e arrays estáticos exigem constantes de tempo de compilação estritas que constexpr provê."),
          t("Qual palavra-chave do C++ introduz expressões avaliadas em tempo de compilação?", ["constexpr"], "constexpr ativa computação durante a fase de build.", "# palavra chave de computacao em tempo de compilacao"),
          g("Complete a definição da constante de compilação que calcula a capacidade estática:", ["constexpr int Capacidade = 64 * 1024;"], "constexpr calcula o produto durante a compilação do arquivo.", "____ int Capacidade = 64 * 1024;"),
          o("Ordene os momentos em que constantes recebem seus valores em C++:", ["Resolução de variáveis e funções constexpr pelo compilador durante a compilação","Alocação estática dos literais nas seções de dados somente leitura (.rodata) do binário","Inicialização de variáveis const comuns calculadas na inicialização do programa","Execução e consumo dos valores com velocidade máxima de literais puros"], "Linha do tempo de resolução de constantes em tempo de compilação versus execução."),
          p("Associe o qualificador ao seu comportamento no processo de compilação de C++:", [["constexpr int Tam = 100;","Resolvido no build e utilizável como dimensão de template"],["const int x = ObterDado();","Imutável em runtime porém inicializado dinamicamente"],["consteval (C++20)","Função de execução imediata que exige avaliação no build"],["constinit (C++20)","Garante inicialização estática sem exigir imutabilidade"]], "Qualificadores de constantes e avaliação em tempo de compilação no C++ moderno.")
        ]
      },
      {
        id: "cpp-c03-u4-l3",
        title: "A palavra-chave consteval (Immediate Functions) no C++20",
        subtitle: "Garantia de build · Funções que são forçadas a rodar estritamente na compilação",
        theory: "Padronizada no C++20, a palavra-chave consteval declara funções imediatas (immediate functions): toda chamada a uma função consteval DEVE obrigatoriamente produzir uma constante em tempo de compilação. Se o compilador não conseguir resolver a chamada no build, o código falha com erro de compilação garantido.",
        questions: [
          q("Qual é a diferença fundamental entre uma função constexpr e uma função consteval no C++20?", "constexpr pode rodar no build ou em runtime; consteval é forçada a rodar estritamente no build, falhando se não conseguir", ["consteval só funciona com ponteiros","consteval roda mais rápido em runtime"], "consteval garante ao arquiteto de software que a função nunca gerará instruções de máquina em runtime."),
          q("O que acontece se invocarmos uma função consteval passando uma variável comum lida do usuário em runtime?", "Erro de compilação imediato: a chamada não é uma expressão constante em tempo de compilação", ["O compilador converte para função normal","O programa roda com aviso"], "Elimina a incerteza de se o compilador de fato otimizou a função para tempo de build."),
          q("Qual é o benefício de adotar funções consteval em sistemas embarcados e motores de alta performance?", "Garante que tabelas matemáticas complexas (lookup tables) e cálculos de hashing sejam pré-computados no build", ["Reduz o uso de memória RAM a zero em runtime","Elimina o uso da CPU"], "Transfere cálculos computacionalmente pesados para o compilador na máquina de desenvolvimento."),
          q("Uma função consteval pode invocar outra função consteval dentro do seu corpo?", "Sim; funções consteval podem invocar outras funções consteval e funções constexpr normalmente", ["Não, apenas código assembly","Apenas se for inline"], "Permite compor pipelines completas de metaprogramação no build com sintaxe limpa de C++ padrão."),
          t("Qual palavra-chave do C++20 define uma função imediata de execução obrigatória no build?", ["consteval"], "consteval impõe execução estrita em tempo de compilação.", "# palavra chave de funcao imediata"),
          g("Complete a declaração da função de cálculo prévio de potências no C++20:", ["consteval int AoQuadrado(int n) {\n    return n * n;\n}"], "consteval garante que a função resolva no momento do build.", "____ int AoQuadrado(int n) {\n    return n * n;\n}"),
          o("Ordene as etapas de compilação ao processar uma chamada consteval auto hash = Hash(\"texto\"):", ["Identificação do qualificador consteval na assinatura da função invocada","Validação de que o argumento \"texto\" é uma expressão constante literal conhecida","Execução do corpo da função pelo interpretador de expressões do compilador","Substituição direta da chamada pelo valor numérico do hash calculado no binário final"], "Fluxo de resolução de funções imediatas consteval pelo compilador C++20."),
          p("Associe o qualificador do C++20 à sua regra de execução:", [["consteval","Função imediata que exige avaliação estrita no build"],["constexpr","Função flexível que roda no build se possível ou em runtime"],["constinit","Exige inicialização estática porém permite modificação posterior"],["const","Qualifica valores como imutáveis após sua definição inicial"]], "Evolução dos qualificadores de constantes no padrão C++20.")
        ]
      },
      {
        id: "cpp-c03-u4-l4",
        title: "Literais definidos pelo usuário (User-Defined Literals)",
        subtitle: "Expressividade de tipos · Sufixos customizados com operator\"\" no C++11+",
        theory: "Desde o C++11, C++ permite criar sufixos customizados para literais literais através de operator\"\" (User-Defined Literals). Isso permite que unidades de medida, durações de tempo e moedas sejam declaradas com expressividade e segurança de tipos em tempo de compilação: auto tempo = 5s; ou auto dist = 100_m;.",
        questions: [
          q("Qual é o propósito de User-Defined Literals (UDLs) introduzidos no C++11?", "Permitir que desenvolvedores definam sufixos customizados para literais numéricos e de texto associados a tipos fortes", ["Criar novas palavras-chave na linguagem","Substituir o compilador"], "Permite escrever código altamente autoexplicativo como 10_km + 500_m sem risco de misturar grandezas incompatíveis."),
          q("Qual convenção o padrão ISO C++ impõe sobre os nomes de sufixos de literais criados por desenvolvedores?", "Devem obrigatoriamente iniciar com um sublinhado (ex: _km, _seg), reservando nomes sem _ para a biblioteca padrão", ["Devem ter no máximo duas letras","Devem ser todos maiúsculos"], "Sufixos sem sublinhado (como s, ms, h da biblioteca <chrono>) são estritamente reservados pelo comitê ISO."),
          q("Qual biblioteca padrão de C++ faz uso intensivo de User-Defined Literals para representar intervalos de tempo?", "A biblioteca std::chrono com os sufixos h, min, s, ms, us, ns no namespace std::chrono_literals", ["A biblioteca <cmath>","A biblioteca <cstring>"], "Permite escrever chamadas fluentes e inequívocas como std::this_thread::sleep_for(200ms);."),
          q("Como definir formalmente a função de operador para um literal customizado de distância: 5_km?", "constexpr Distancia operator\"\"_km(unsigned long long valor) { return Distancia(valor * 1000); }", ["void operator_km(int valor)","literal _km(int)"], "A sintaxe canônica utiliza operator\"\" seguido imediatamente pelo nome do sufixo com sublinhado."),
          t("Qual combinação de palavra-chave e aspas declara um operador de literal de usuário no C++?", ["operator\"\""], "operator\"\" define o sufixo customizado do literal.", "# sintaxe de operador de literal de usuario"),
          g("Complete o uso dos literais de tempo da biblioteca padrão std::chrono:", ["using namespace std::chrono_literals;\nauto pausa = 500ms;"], "O sufixo ms cria diretamente uma instância tipada de std::chrono::milliseconds.", "using namespace std::chrono_literals;\nauto pausa = 500____;"),
          o("Ordene as etapas da definição e uso de um literal customizado em C++:", ["Criar a classe ou struct que representa a grandeza de domínio (ex: struct Metro)","Definir a função constexpr Metro operator\"\"_m(unsigned long long valor)","Calcular a conversão e retornar a instância tipada da estrutura de valor","Consumir o literal diretamente no código com máxima legibilidade: auto x = 42_m;"], "Ciclo de implementação e consumo de User-Defined Literals em C++."),
          p("Associe o literal da biblioteca padrão à sua respectiva representação no C++:", [["10s (std::chrono)","Representa intervalo de 10 segundos tipado"],["250ms (std::chrono)","Representa intervalo de 250 milissegundos"],["\"texto\"s (std::string)","Produz diretamente um objeto std::string em vez de const char*"],["\"texto\"sv (string_view)","Produz diretamente um objeto leve std::string_view"]], "Literais de usuário embutidos na biblioteca padrão de C++.")
        ]
      },
      {
        id: "cpp-c03-u4-l5",
        title: "Constantes modernas versus macros (#define)",
        subtitle: "Segurança de tipos · Por que constexpr e enums devem substituir o pré-processador",
        theory: "No C++ moderno, macros do pré-processador (#define MAX 100) são consideradas um anti-padrão obsoleto: elas não respeitam escopo, ignoram o sistema de tipos e poluem o namespace global. O uso de constexpr e inline constexpr fornece constantes fortemente tipadas, seguras em escopo e visíveis no depurador.",
        questions: [
          q("Por que a substituição de #define por constexpr é uma regra central das C++ Core Guidelines?", "#define opera por substituição textual sem tipagem nem escopo; constexpr é fortemente tipado e respeita namespaces", ["Porque o pré-processador foi removido do C++","Porque #define deixa o executável maior"], "Macros vazam para todo o código causando colisões de nomes silenciosas e erros misteriosos de compilação."),
          q("Qual é a desvantagem crítica de usar #define ao depurar um programa em uma IDE?", "O depurador não conhece o nome da macro porque o pré-processador a substituiu por números antes da compilação", ["A IDE fecha imediatamente","O depurador apaga o arquivo"], "Com constexpr, a variável existe formalmente na tabela de símbolos de depuração da IDE com nome e valor inspecionáveis."),
          q("Como definir constantes globais de cabeçalho em C++17 sem violar a regra de definição única (ODR)?", "Declarando como inline constexpr (ex: inline constexpr int MaxTentativas = 5;)", ["Usando #define no .h","Declarando como extern void"], "inline constexpr permite que a constante resida em múltiplos arquivos .h incluídos sem causar erro de símbolo duplicado no linker."),
          q("O que acontece se uma macro tiver o mesmo nome de um método de biblioteca (ex: #define min(a,b))?", "A macro substitui textualmente o nome do método quebrando a compilação de std::min ou funções de classes", ["O C++ prioriza a classe","Ocorre erro de tempo de execução"], "Problema clássico do cabeçalho <windows.h> que definia as macros min e max quebrando std::min e std::max."),
          t("Qual combinação de palavras-chave declara constantes seguras em arquivos de cabeçalho no C++17?", ["inline constexpr"], "inline constexpr permite constantes únicas em múltiplos headers.", "# especificador de constante de cabecalho C++17"),
          g("Complete a declaração moderna de constante de cabeçalho com segurança de tipos e ODR:", ["inline constexpr double Pi = 3.141592653589793;"], "inline constexpr elimina macros #define em arquivos .h.", "____ constexpr double Pi = 3.141592653589793;"),
          o("Ordene as etapas da evolução de constantes da linguagem C clássica para o C++ moderno:", ["Uso histórico de macros #define substituídas textualmente antes do compilador","Introdução de const int x = 10 no escopo de arquivos com linkage interno","Introdução de constexpr no C++11 permitindo computação em tempo de compilação","Introdução de inline constexpr no C++17 padronizando constantes em cabeçalhos compartilhados"], "Linha do tempo da evolução de constantes no ecossistema C e C++."),
          p("Associe a abordagem de constante ao seu impacto na arquitetura do software:", [["#define MAX 100","Substituição cega sem tipo, sem escopo e invisível ao depurador"],["inline constexpr int Max","Constante moderna com escopo, tipo forte e compatível com headers"],["enum class Opcao","Agrupamento fortemente tipado de constantes relacionadas"],["Violação de ODR (Linker)","Erro de símbolo duplicado gerado por constantes não inline em headers"]], "Comparativo de constantes e diretivas de pré-processador em C++.")
        ]
      }
    ],
    5: [
      {
        id: "cpp-c03-u5-l1",
        title: "Operadores aritméticos binários e precedência no C++",
        subtitle: "Cálculo fundamental · +, -, *, /, % e a ordem de avaliação da CPU",
        theory: "C++ disponibiliza os operadores aritméticos binários clássicos (+, -, *, /, %). Multiplicação, divisão e módulo possuem precedência superior sobre adição e subtração, avaliando da esquerda para a direita. Parênteses explícitos devem ser empregados para forçar a precedência e explicitar a intenção matemática.",
        questions: [
          q("Qual é a precedência do operador de multiplicação (*) em relação à adição (+) em C++?", "A multiplicação possui precedência superior e é avaliada antes da adição", ["A adição possui precedência superior","Eles possuem a mesma precedência"], "Na expressão 2 + 3 * 4, o produto 3 * 4 é calculado primeiro (12), resultando em 14."),
          q("Qual é o resultado da operação de módulo 14 % 4 em C++?", "2 (pois 14 dividido por 4 é 3 com resto 2)", ["3","1"], "O operador % calcula o resto da divisão inteira entre operandos inteiros."),
          q("O operador de módulo (%) em C++ aceita operandos de ponto flutuante (double)?", "Não; o operador % requer estritamente operandos do tipo integral (para double, usa-se std::fmod)", ["Sim, funciona normalmente","Apenas no C++20"], "Tentar aplicar % a floats resulta em erro de compilação; a função std::fmod em <cmath> é a solução adequada."),
          q("Qual é a associatividade dos operadores aritméticos binários em C++?", "Associatividade da esquerda para a direita (left-to-right)", ["Da direita para a esquerda","Não associativo"], "Em 10 - 4 - 2, a subtração avalia (10 - 4) primeiro (6), e depois 6 - 2 (4)."),
          t("Qual operador calcula o resto da divisão inteira no C++?", ["%"], "O operador % retorna o resto inteiro da divisão.", "# operador de modulo e resto"),
          g("Complete o cálculo da área retangular usando o operador aritmético correto:", ["int area = largura * altura;"], "O operador * calcula o produto das dimensões.", "int area = largura ____ altura;"),
          o("Ordene os operadores pela sua hierarquia formal de precedência na gramática C++:", ["Operadores unários de sinal (+, -) e incremento (++x)","Operadores multiplicativos (*, /, %)","Operadores aditivos binários (+, -)","Operadores de atribuição simples e composta (=, +=)"], "Hierarquia formal de precedência de operadores aritméticos em C++."),
          p("Associe a expressão aritmética ao seu resultado numérico em C++:", [["10 + 2 * 5","20 pela precedência da multiplicação sobre a adição"],["(10 + 2) * 5","60 forçado pelos parênteses de agrupamento explícito"],["15 % 4","3 correspondente ao resto da divisão inteira"],["10 - 3 - 2","5 pela associatividade da esquerda para a direita"]], "Avaliação de expressões aritméticas fundamentais em C++.")
        ]
      },
      {
        id: "cpp-c03-u5-l2",
        title: "Operadores de atribuição composta no C++",
        subtitle: "Modificação in-place · +=, -=, *=, /= e %= e prevenção de reavaliação",
        theory: "Operadores de atribuição composta (+=, -=, *=, /=, %=) modificam uma variável acumulando o resultado de uma operação em um único passo. Em C++, além da concisão sintática, a expressão da esquerda é avaliada apenas uma única vez, prevenindo efeitos colaterais repetidos em expressões indexadas complexas.",
        questions: [
          q("Qual é o benefício técnico de escrever v[ObterIndice()] += 10; em vez da forma expandida?", "A função ObterIndice() é invocada uma única vez, prevenindo recálculos e efeitos colaterais duplicados", ["Executa em modo multithread na GPU","Garante que o índice seja par"], "Na forma expandida v[idx()] = v[idx()] + 10, a função de índice seria chamada duas vezes seguidas."),
          q("Qual é a diferença entre a = a + b e a += b quando a é uma classe customizada com sobrecarga?", "a += b modifica o objeto no próprio local (in-place), enquanto a + b cria um objeto temporário intermediário", ["Não há nenhuma diferença","O segundo não compila"], "Implementar operator+= com modificação direta na referência (*this) é a melhor prática de desempenho em C++."),
          q("Qual é a associatividade dos operadores de atribuição simples e composta em C++?", "Associatividade da direita para a esquerda (right-to-left)", ["Da esquerda para a direita","Aleatória"], "Permite encadeamentos de inicialização como a = b = c = 0; onde c recebe 0 primeiro, depois b e por fim a."),
          q("O que o operador a += b retorna como resultado da expressão em C++?", "Uma referência lvalue para o próprio objeto da esquerda modificado (T&)", ["Uma cópia do valor anterior","O tipo void"], "Retornar a referência do operando esquerdo permite encadear operações sucessivas de atribuição."),
          t("Qual operador de atribuição composta multiplica a variável pelo operando fornecido?", ["*="], "*= abrevia a multiplicação in-place da variável.", "# operador composto de multiplicacao"),
          g("Complete a atribuição composta que adiciona 50 unidades ao total acumulado:", ["total += 50;"], "+= soma 50 diretamente na variável existente.", "total ____ 50;"),
          o("Ordene os passos de execução da instrução tabela[ObterChave()] += delta;: ", ["Avaliação da expressão da esquerda invocando ObterChave() uma única vez","Cálculo e resolução do valor da expressão da direita (delta)","Soma aritmética entre o valor armazenado na posição e o delta","Gravação do montante final consolidado na mesma posição da memória"], "Ciclo de controle operacional da atribuição composta em C++."),
          p("Associe a expressão composta à sua equivalência algébrica em C++:", [["x += 5","Equivalente a x = x + 5 com avaliação única da esquerda"],["x -= 3","Equivalente a x = x - 3 decrementando in-place"],["x *= 2","Equivalente a x = x * 2 duplicando a grandeza"],["x /= 4","Equivalente a x = x / 4 aplicando divisão na variável"]], "Operadores de atribuição combinada na linguagem C++.")
        ]
      },
      {
        id: "cpp-c03-u5-l3",
        title: "Operadores de incremento e decremento (++ e --)",
        subtitle: "Pré-fixado vs Pós-fixado · Semântica de lvalue, cópias temporárias e sobrecarga",
        theory: "No C++, a forma pré-fixada (++x) incrementa a variável e retorna uma referência lvalue ao valor atualizado. A forma pós-fixada (x++) cria uma cópia do valor original, incrementa a variável e retorna a cópia antiga por valor. Para iteradores e tipos customizados, deve-se preferir sempre ++it por eficiência.",
        questions: [
          q("Por que a forma pré-fixada ++it deve ser sempre preferida sobre it++ ao iterar contêineres da STL em C++?", "A forma pré-fixada altera o objeto diretamente sem criar um objeto temporário na memória", ["A forma pós-fixada foi depreciada","A forma pré-fixada não funciona em loops"], "it++ precisa alocar e copiar o estado do iterador antigo para retornar por valor, gerando sobrecarga inútil."),
          q("Qual é o valor impresso pelo código: int x{10}; std::cout << x++;?", "10 (pois a forma pós-fixada entrega a cópia do valor original antes do incremento)", ["11","9"], "Após o encerramento da instrução, a variável x na memória assume o valor 11."),
          q("Qual é o tipo de retorno da sobrecarga do operador pré-fixado operator++() em uma classe C++?", "Uma referência para o próprio objeto (Tipo&)", ["Uma cópia por valor (Tipo)","O tipo void"], "Retornar Tipo& permite encadear chamadas e utilizar a expressão como lvalue modificável."),
          q("Como o compilador C++ diferencia a sobrecarga do operador pré-fixado da do operador pós-fixado em classes?", "O operador pós-fixado recebe um parâmetro int fictício (dummy) não utilizado: operator++(int)", ["Pela palavra-chave postfix","Pelo nome do método"], "O parâmetro int fictício é a convenção sintática do C++ para sinalizar a forma pós-fixada."),
          t("Qual forma de incremento é mais eficiente para iteradores por não criar cópias temporárias?", ["pre-fixada"], "A forma pré-fixada (++i) modifica o objeto diretamente.", "# forma preferencial de incremento"),
          g("Complete o incremento pré-fixado recomendado no cabeçalho do laço:", ["for (auto it = lista.begin(); it != lista.end(); ++it) {\n    Processar(*it);\n}"], "++it avança o iterador sem gerar cópia temporária.", "for (auto it = lista.begin(); it != lista.end(); ____it) {\n    Processar(*it);\n}"),
          o("Ordene as etapas executadas na instrução int antigo = contador++; (pós-fixado):", ["Leitura do valor atual da variável contador na memória","Criação de uma cópia temporária contendo o valor antigo","Incremento da variável original contador para o novo valor","Retorno da cópia antiga para ser atribuída à variável receptora"], "Sequência operacional do operador de incremento pós-fixado em C++."),
          p("Associe a assinatura do operador à sua forma em C++:", [["Tipo& operator++()","Forma pré-fixada retornando referência ao objeto modificado"],["Tipo operator++(int)","Forma pós-fixada recebendo int dummy e retornando cópia"],["++x","Incrementa antes e entrega o valor atualizado"],["x++","Entrega o valor anterior e incrementa na sequência"]], "Mecânica e convenções de sobrecarga de incremento em C++.")
        ]
      },
      {
        id: "cpp-c03-u5-l4",
        title: "Divisão inteira, truncamento e a função std::div",
        subtitle: "Aritmética inteira · Truncamento em direção a zero e cálculo atômico de quociente/resto",
        theory: "No C++11 em diante, a divisão inteira (/) trunca estritamente em direção a zero (truncation toward zero), descartando a fração: 7 / 2 resulta em 3, e -7 / 2 resulta em -3. Para obter simultaneamente o quociente e o resto em uma única instrução de máquina da CPU, o cabeçalho <cstdlib> oferece std::div.",
        questions: [
          q("Qual é o resultado da divisão inteira: int r = -7 / 2; no C++11 e versões posteriores?", "-3 (o padrão especifica truncamento estrito em direção a zero)", ["-4 (arredondamento para baixo)","-3.5"], "Desde o C++11, a regra de truncamento em direção a zero é obrigatória para todos os compiladores."),
          q("Qual função da biblioteca padrão <cstdlib> calcula quociente e resto em uma única operação de hardware?", "std::div (retornando uma struct std::div_t com campos quot e rem)", ["std::split","std::moddiv"], "A maioria das CPUs calcula quociente e resto na mesma instrução de divisão; std::div aproveita isso diretamente."),
          q("O que acontece em C++ se o divisor em uma divisão inteira for igual a zero (x / 0)?", "Comportamento indefinido (Undefined Behavior), frequentemente resultando em falha de sinal SIGFPE pelo hardware", ["Retorna infinito","Lança exceção de divisão"], "Divisão inteira por zero em C++ não lança exceções capturáveis; a CPU aborta o processo por hardware."),
          q("Como garantir que uma divisão de inteiros preserve as casas decimais fracionárias em C++?", "Fazendo o cast de ao menos um dos operandos para double: static_cast<double>(a) / b", ["Declarando o resultado como double","Multiplicando por 1"], "Se ambos os operandos forem inteiros, a divisão é inteira mesmo que a variável receptora seja double."),
          t("Qual struct é retornada pela função std::div contendo os campos quot e rem no C++?", ["div_t"], "std::div_t abriga o quociente e o resto da divisão inteira.", "# struct de retorno de std::div"),
          g("Complete o cast seguro para que a divisão calcule o valor decimal com precisão fracionária:", ["double media = static_cast<double>(soma) / total;"], "static_cast converte soma para double promovendo a divisão.", "double media = ____<double>(soma) / total;"),
          o("Ordene as etapas do cálculo eficiente de quociente e resto com std::div:", ["Incluir o cabeçalho padrão <cstdlib> no arquivo de código-fonte","Invocar std::div passando o dividendo e o divisor inteiros","Receber o resultado na estrutura std::div_t alocada na Stack","Acessar os membros resultado.quot (quociente) e resultado.rem (resto)"], "Procedimento canônico para divisão com cálculo conjunto de resto em C++."),
          p("Associe a operação matemática de divisão inteira ao seu resultado em C++:", [["7 / 2","3 com truncamento das casas decimais em direção a zero"],["-7 / 2","-3 com truncamento em direção a zero pelo padrão C++11"],["resultado.quot","Campo da struct div_t contendo o quociente calculado"],["resultado.rem","Campo da struct div_t contendo o resto da divisão"]], "Propriedades da divisão inteira na biblioteca padrão de C++.")
        ]
      },
      {
        id: "cpp-c03-u5-l5",
        title: "Overflow de signed (Undefined Behavior) vs unsigned wraparound",
        subtitle: "Segurança de baixo nível · A fronteira perigosa do estouro aritmético",
        theory: "No padrão C++, o overflow de inteiros com sinal (signed int) é formalmente Comportamento Indefinido (Undefined Behavior): o compilador assume que ele nunca ocorre e pode otimizar ou eliminar verificações de segurança. Por outro lado, o overflow de unsigned int tem comportamento definido como wraparound modular.",
        questions: [
          q("Qual é o status formal no padrão ISO C++ para o overflow de inteiros com sinal (signed int)?", "Comportamento Indefinido (Undefined Behavior - UB)", ["Aritmética modular garantida","Lançamento de std::overflow_error"], "Como é UB, compiladores otimizadores assumem que x + 1 > x é sempre true, podendo remover verificações manuais."),
          q("Como o padrão C++ define o comportamento de estouro de capacidade em inteiros sem sinal (unsigned)?", "Comportamento estritamente definido como aritmética modular (módulo 2^N) com wraparound previsível", ["Comportamento indefinido","Disparo de exceção"], "Aritmética unsigned é garantida matematicamente por lei da especificação do C++."),
          q("Qual ferramenta de compilação moderna detecta estouro de inteiros com sinal em tempo de execução durante testes?", "UndefinedBehaviorSanitizer (UBSan), ativado com a flag de compilação -fsanitize=undefined", ["O depurador GDB apenas","Valgrind"], "UBSan injeta verificações em cada operação aritmética emitindo alerta imediato no console caso ocorra overflow."),
          q("Como verificar se uma soma entre dois inteiros com sinal a e b causará overflow antes de realizá-la?", "Testando se b > 0 && a > INT_MAX - b (ou b < 0 && a < INT_MIN - b)", ["Somando e vendo se fica negativo","Usando um bloco try-catch"], "Como somar e verificar depois é UB, o teste preventivo deve comparar com os limites prévios sem estourar."),
          t("Qual flag do compilador GCC/Clang ativa o sanitizador de comportamento indefinido?", ["-fsanitize=undefined"], "UBSan instrumenta verificações de overflow em runtime.", "# flag do compilador para UBSan"),
          g("Complete o teste preventivo que impede estouro antes de somar:", ["if (a > INT_MAX - b) {\n    tratarEstouro();\n}"], "Subtrair de INT_MAX previne a ocorrência de Undefined Behavior.", "if (a > INT_MAX ____ b) {\n    tratarEstouro();\n}"),
          o("Ordene as consequências de um overflow em signed int em C++:", ["Aritmética de variáveis calculando valor superior ao limite de 32 bits (INT_MAX)","Classificação formal como Comportamento Indefinido (UB) pelo padrão ISO","Otimizador do compilador assumindo que o caso de estouro é impossível","Remoção de verificações de segurança gerando potenciais brechas críticas"], "Cadeia de falha originada por Comportamento Indefinido em aritmética com sinal."),
          p("Associe a operação ao seu tratamento pelo padrão ISO C++:", [["signed int overflow","Comportamento Indefinido (Undefined Behavior) perigoso"],["unsigned int overflow","Aritmética modular (wraparound) garantida por especificação"],["-fsanitize=undefined","Instrumentação de build para detecção de UB em testes"],["INT_MAX (climits)","Maior valor representável por um inteiro de 32 bits com sinal"]], "Diferenças de integridade aritmética no padrão C++.")
        ]
      }
    ],
    6: [
      {
        id: "cpp-c03-u6-l1",
        title: "Conversões implícitas e promoções integrais",
        subtitle: "Hierarquia de coerção · Regras usuais de conversão aritmética e riscos",
        theory: "Quando operadores atuam sobre operandos de tipos diferentes, C++ aplica as Regras Usuais de Conversão Aritmética. Tipos menores que int (como char e short) sofrem promoção integral imediata para int. Em seguida, o tipo de menor precisão é promovido para o de maior amplitude (ex: int promovido para double).",
        questions: [
          q("O que acontece com variáveis dos tipos char e short quando participam de operações aritméticas em C++?", "Sofrem promoção integral (integral promotion) automática para o tipo int antes do cálculo", ["Permanecem com 8 bits","Convertem para float"], "A CPU opera nativamente sobre palavras inteiras de 32 bits; tipos menores são promovidos para o tamanho padrão da ALU."),
          q("Qual é o tipo do resultado da expressão aritmética: int a = 5; double b = 2.0; a / b; em C++?", "double (pois o operando int a é promovido para double antes da divisão)", ["int","float"], "O padrão promove o tipo de menor largura para o tipo de ponto flutuante de maior capacidade."),
          q("Por que a conversão implícita de float para int é classificada como estreitamento (narrowing)?", "Porque a parte fracionária é truncada e valores fora dos limites de int causam perda irreparável de dados", ["Porque gasta mais memória","Porque o C++ proíbe em classes"], "Qualquer conversão que resulte em potencial perda de magnitude ou precisão é uma conversão estreitante."),
          q("Como suprimir avisos de conversões implícitas intencionais mantendo a clareza do código?", "Tornando a conversão explícita com o operador de cast estático: static_cast<Tipo>(valor)", ["Desligando os avisos do compilador","Multiplicando por 1"], "O cast explícito documenta para revisores e compiladores que a conversão foi planejada deliberadamente."),
          t("Qual termo técnico descreve a promoção automática de tipos menores como char/short para int?", ["promocao integral"], "A promoção integral eleva tipos menores para a largura de int.", "# conceito de promocao integral"),
          g("Complete a conversão explícita recomendada que substitui a coerção implícita:", ["int resultado = static_cast<int>(valorDecimal);"], "static_cast documenta formalmente o truncamento intencional.", "int resultado = ____<int>(valorDecimal);"),
          o("Ordene os tipos conforme a hierarquia usual de conversão aritmética em C++:", ["int: tipo base após as promoções integrais de char e short","unsigned int: absorve int quando operam juntos","long long: promove tipos inteiros de menor largura","double: absorve operandos inteiros para realização de divisão real"], "Escala canônica de promoções aritméticas no compilador C++."),
          p("Associe a operação à conversão aplicada nos bastidores pelo compilador C++:", [["char + char","Promoção integral de ambos os operandos para int antes da soma"],["int + double","Promoção de int para double resultando em soma fracionária"],["float + double","Promoção de float para double garantindo precisão de 64 bits"],["signed + unsigned","Promoção perigosa de signed para unsigned"]], "Mecanismos de coerção e promoção automática na linguagem C++.")
        ]
      },
      {
        id: "cpp-c03-u6-l2",
        title: "O operador static_cast no C++ moderno",
        subtitle: "Conversões seguras · Substituindo o cast perigoso do C clássico (Tipo) valor",
        theory: "O operador static_cast<Tipo>(expressao) é o mecanismo padrão de conversão explícita em tempo de compilação no C++. Ele valida a compatibilidade entre tipos na árvore de herança e tipos aritméticos, impedindo conversões absurdas ou acidentais que o antigo cast do C ((Tipo) valor) permitia silenciosamente.",
        questions: [
          q("Por que static_cast deve substituir completamente o cast no estilo da linguagem C ((Tipo) valor)?", "static_cast é verificado pelo sistema de tipos no build e impede conversões ilegais perigosas entre ponteiros", ["static_cast roda mais rápido em runtime","Casts do C foram removidos"], "O cast do C tenta static_cast, const_cast e reinterpret_cast sequencialmente, mascarando erros gravíssimos."),
          q("Qual é a sintaxe canônica para converter uma variável double em int com static_cast?", "static_cast<int>(variavel)", ["(int) variavel","int::cast(variavel)"], "O tipo de destino é informado entre sinais de menor e maior (<Tipo>) e o operando entre parênteses."),
          q("static_cast pode converter ponteiros de classes que não possuem relação de herança entre si?", "Não; o compilador C++ rejeita com erro fatal de compilação acusando tipos não relacionados", ["Sim, converte qualquer ponteiro","Apenas se for void*"], "Essa checagem de tipos protege o desenvolvedor contra conversões sem sentido de memória."),
          q("Qual é o uso de static_cast na navegação em hierarquias de herança entre classes (Downcasting)?", "Permite converter ponteiro de classe base para classe derivada se o desenvolvedor tiver certeza do tipo real", ["Lança exceção se o tipo for errado","Verifica o tipo em runtime"], "Para conversão de classes derivadas com verificação dinâmica em tempo de execução, deve-se usar dynamic_cast."),
          t("Qual operador de cast explícito realiza conversões bem definidas e validadas em tempo de compilação?", ["static_cast"], "static_cast é o operador primário de conversão explícita em C++.", "# operador de conversao static_cast"),
          g("Complete a conversão explícita do ponteiro void* para o tipo de dados correto:", ["void* bufferBruto = ObterMemoria();\nchar* texto = static_cast<char*>(bufferBruto);"], "static_cast converte ponteiros genéricos void* de volta para tipos concretos.", "char* texto = ____<char*>(bufferBruto);"),
          o("Ordene as etapas de validação executadas pelo compilador ao processar um static_cast<T>(v):", ["Analisar o tipo de origem da expressão v e o tipo de destino T","Verificar se existe conversão padrão, construtor de conversão ou herança válida","Se os tipos forem incompatíveis: emitir erro de compilação estático","Se compatível: emitir as instruções assembly de conversão necessárias"], "Fluxo de verificação de tipos do operador static_cast no build."),
          p("Associe a conversão à sua viabilidade com static_cast em C++:", [["double para int","Válido: trunca a fração com autorização explícita do autor"],["void* para int*","Válido: converte ponteiro genérico para ponteiro tipado"],["Classes não relacionadas","Inválido: erro de compilação imediato por tipos desconexos"],["Ponteiro para número int","Inválido: rejeitado por segurança (exige reinterpret_cast)"]], "Regras de validação do operador static_cast em C++.")
        ]
      },
      {
        id: "cpp-c03-u6-l3",
        title: "O operador reinterpret_cast e manipulação de baixo nível",
        subtitle: "Reinterpretação de bits · Drivers, ponteiros de hardware e a Strict Aliasing Rule",
        theory: "O operador reinterpret_cast<Tipo>(ponteiro) instrui o compilador a reinterpretar a sequência de bits de um ponteiro como se fosse de outro tipo, sem gerar código de conversão na CPU. É indispensável para drivers de dispositivos e registradores de hardware, devendo respeitar a Strict Aliasing Rule.",
        questions: [
          q("Qual é o papel do operador reinterpret_cast na linguagem C++?", "Reinterpretar a representação binária bruta de ponteiros ou inteiros sem nenhuma conversão de formato de dados", ["Calcular a raiz quadrada de bits","Converter strings para inteiros"], "Ele simplesmente instrui a CPU: \"leia o mesmo endereço de memória como se fosse desse outro tipo de dado\"."),
          q("Em qual contexto de engenharia de software o uso de reinterpret_cast é comum e justificável?", "Programação de sistemas embarcados, drivers de dispositivos, ponteiros para registradores de hardware e buffers de rede", ["Em regras de negócio de e-commerce","Em interfaces de usuário"], "Quando se precisa mapear diretamente estruturas de dados da memória física ou de pacotes binários brutos."),
          q("O que é a \"Strict Aliasing Rule\" do padrão C++ e qual o perigo ao usar reinterpret_cast?", "Regra que dita que dois ponteiros de tipos incompatíveis não apontam para a mesma memória; violá-la gera UB", ["Uma regra sobre nomes de variáveis","Uma restrição de uso de GPU"], "Se violada, o otimizador do compilador pode reordenar instruções de escrita e leitura, gerando bugs bizarros."),
          q("Qual utilitário do C++20 (<bit>) substitui com segurança reinterpret_cast para cópia de representação binária?", "std::bit_cast<Destino>(origem)", ["std::memcpy_cast","std::byte_cast"], "std::bit_cast é constexpr, seguro contra violações de aliasing e verificado em compilação."),
          t("Qual operador do C++ realiza reinterpretação forçada de ponteiros em baixo nível?", ["reinterpret_cast"], "reinterpret_cast reinterpreta bits sem conversão de dados.", "# operador reinterpret_cast de baixo nivel"),
          g("Complete a conversão de endereço de hardware físico para ponteiro tipado:", ["auto registrador = reinterpret_cast<uint32_t*>(0x40021000);"], "reinterpret_cast converte inteiros de endereços para ponteiros.", "auto registrador = ____<uint32_t*>(0x40021000);"),
          o("Ordene as abordagens para ler os bytes brutos de um double da mais moderna para a mais arriscada:", ["std::bit_cast<uint64_t>(valor) padronizado e seguro no C++20","std::memcpy(&destino, &origem, sizeof(origem)) seguro contra aliasing","reinterpret_cast<uint64_t*>(&valor) violando potencialmente o Strict Aliasing","Type punning via union em C++ clássico com comportamento indefinido"], "Evolução das técnicas de inspeção de representação binária em C++."),
          p("Associe o operador de cast à sua respectiva finalidade técnica:", [["static_cast","Conversões explícitas seguras validadas pelo compilador"],["reinterpret_cast","Reinterpretação de baixo nível de ponteiros e endereços"],["const_cast","Adição ou remoção de qualificadores const e volatile"],["dynamic_cast","Conversão polimórfica com checagem em tempo de execução"]], "Os quatro operadores fundamentais de casting no C++ moderno.")
        ]
      },
      {
        id: "cpp-c03-u6-l4",
        title: "O operador const_cast e manipulação de imutabilidade",
        subtitle: "Remoção de qualificadores · Interoperabilidade com APIs legadas e perigos de UB",
        theory: "O operador const_cast<Tipo>(ponteiro) é o único operador de C++ capaz de adicionar ou remover os qualificadores const ou volatile de uma referência ou ponteiro. Seu caso de uso legítimo é a interoperabilidade com bibliotecas legadas de C que não possuem Const-Correctness, mas não alteram os dados internamente.",
        questions: [
          q("Qual é a finalidade técnica exclusiva do operador const_cast em C++?", "Adicionar ou remover qualificadores de somente leitura (const) ou voláteis (volatile) de ponteiros e referências", ["Converter inteiros para double","Fazer downcast de herança"], "Nenhum outro operador de cast em C++ pode alterar o qualificador de imutabilidade de uma variável."),
          q("O que acontece ao usar const_cast para modificar uma variável que foi originalmente declarada como const?", "Comportamento Indefinido (Undefined Behavior), podendo gerar falha de segmentação se a variável estiver na ROM/.rodata", ["O valor é alterado com sucesso","O compilador gera erro"], "Se a variável nasceu const, sua memória pode ser somente leitura no hardware; modificá-la é ilegal pelo padrão."),
          q("Em qual cenário o uso de const_cast é aceito como padrão de engenharia pragmático?", "Ao passar uma string const para uma API legada de C que recebe char* mas que garantidamente só realiza leitura", ["Para alterar dados de outra classe","Para economizar memória"], "Permite compatibilidade com funções antigas como legado_print(char* str) sem precisar duplicar a memória."),
          q("const_cast pode ser utilizado para converter entre tipos de dados diferentes (ex: de const int* para double*)?", "Não; const_cast altera exclusivamente os qualificadores const/volatile, mantendo os tipos idênticos", ["Sim, converte qualquer tipo","Apenas se for void*"], "Para alterar tanto o tipo quanto a constância, seriam necessárias duas conversões distintas combinadas."),
          t("Qual operador de cast em C++ remove ou adiciona qualificadores const e volatile?", ["const_cast"], "const_cast manipula qualificadores de imutabilidade.", "# operador const_cast"),
          g("Complete a remoção de const para chamar a rotina legada que não altera o buffer:", ["const char* mensagem = \"Alerta\";\nchar* bufferLegado = const_cast<char*>(mensagem);"], "const_cast remove o qualificador const para compatibilidade.", "char* bufferLegado = ____<char*>(mensagem);"),
          o("Ordene as etapas defensivas ao lidar com APIs legadas que exigem char* sem const:", ["Verificar a documentação da API legada comprovando que a rotina de fato não modifica os dados","Aplicar const_cast<char*>(dadoConstante) para adequar a assinatura da chamada","Invocar a função legada com o ponteiro ajustado","Garantir que a variável original continue sendo tratada com imutabilidade estrita no restante do código"], "Padrão defensivo de interoperabilidade de Const-Correctness com bibliotecas legadas."),
          p("Associe a operação com const_cast à sua validade legal no padrão C++:", [["const_cast em dado originalmente const com escrita","Comportamento Indefinido (Undefined Behavior) perigoso"],["const_cast em dado não-const referenciado por const&","Válido por lei se o objeto original for mutável"],["const_cast para adicionar const","Válido e seguro para reforçar imutabilidade"],["const_cast alterando tipo fundamental","Erro de compilação imediato por tipos divergentes"]], "Regras de segurança no uso do operador const_cast em C++.")
        ]
      },
      {
        id: "cpp-c03-u6-l5",
        title: "O operador dynamic_cast e polimorfismo dinâmico (RTTI)",
        subtitle: "Navegação segura em herança · Checagem em tempo de execução e ponteiros vs referências",
        theory: "O operador dynamic_cast navega em hierarquias polimórficas (classes com ao menos um método virtual) verificando o tipo real do objeto em runtime via RTTI. Em ponteiros, se o cast falhar, ele retorna nullptr com segurança; em referências, como referências não podem ser nulas, ele dispara std::bad_cast.",
        questions: [
          q("Qual requisito fundamental uma classe base deve cumprir para suportar dynamic_cast em C++?", "A classe base deve ser polimórfica, ou seja, possuir ao menos um método virtual (como o destrutor virtual)", ["A classe deve ser estática","Deve herdar de std::object"], "dynamic_cast utiliza a tabela de métodos virtuais (vtable) para inspecionar as informações de RTTI do objeto."),
          q("O que dynamic_cast<Derivada*>(ptrBase) retorna caso o objeto apontado NÃO seja do tipo Derivada?", "Retorna um ponteiro nulo (nullptr) com segurança, sem disparar exceções", ["Lança std::bad_cast","Encerra o programa"], "Permite testar a compatibilidade condicionalmente com if (auto d = dynamic_cast<Derivada*>(ptr))."),
          q("O que acontece se uma conversão de referência falhar com dynamic_cast<Derivada&>(refBase)?", "Lança a exceção std::bad_cast da biblioteca padrão (<typeinfo>)", ["Retorna referência nula","Comportamento indefinido"], "Como referências em C++ não podem assumir valor nulo por definição da linguagem, o erro é sinalizado via exceção."),
          q("Qual é o trade-off de desempenho do dynamic_cast em relação ao static_cast?", "dynamic_cast consulta a árvore de tipos em tempo de execução via RTTI, sendo mais lento que static_cast", ["dynamic_cast gasta o dobro de RAM","dynamic_cast desativa o cache"], "Em loops críticos de altíssimo desempenho, o custo da busca na vtable deve ser evitado se o tipo for garantido."),
          t("Qual exceção da biblioteca padrão é disparada quando dynamic_cast falha sobre referências?", ["std::bad_cast"], "std::bad_cast é lançada quando o cast de referência falha.", "# excecao de falha de dynamic_cast"),
          g("Complete o downcasting seguro de ponteiro polimórfico usando dynamic_cast:", ["if (auto cachorro = dynamic_cast<Cachorro*>(animal)) {\n    cachorro->Latir();\n}"], "dynamic_cast retorna nullptr caso animal não seja um Cachorro.", "if (auto cachorro = ____<Cachorro*>(animal)) {\n    cachorro->Latir();\n}"),
          o("Ordene as etapas executadas pelo runtime ao processar dynamic_cast<Derivada*>(ptr):", ["Verificar se o ponteiro de origem é nulo (retornando nullptr imediatamente se for)","Localizar o ponteiro da vtable no cabeçalho do objeto referenciado","Consultar os metadados de RTTI (Run-Time Type Information) da classe concreta","Se a classe pertencer à linhagem de Derivada: retornar o ponteiro ajustado; caso contrário: nullptr"], "Fluxo de verificação dinâmica com RTTI do operador dynamic_cast em C++."),
          p("Associe a forma do dynamic_cast ao seu comportamento em caso de falha:", [["dynamic_cast<T*>(ptr)","Retorna nullptr sinalizando falha de compatibilidade"],["dynamic_cast<T&>(ref)","Dispara std::bad_cast pois referências não aceitam nulo"],["RTTI (Run-Time Type Info)","Metadados de tipos gerados pelo compilador para classes virtuais"],["Destrutor virtual","Requisito mandatório para tornar a classe base polimórfica"]], "Aspectos operacionais do operador dynamic_cast em C++.")
        ]
      }
    ],
    7: [
      {
        id: "cpp-c03-u7-l1",
        title: "Operadores relacionais e de igualdade em C++",
        subtitle: "Comparações clássicas · <, >, <=, >=, ==, != e precedência de avaliação",
        theory: "Operadores relacionais e de igualdade em C++ comparam dois operandos e produzem um resultado booleano estrito (true ou false). Operadores relacionais de magnitude (<, >, <=, >=) possuem precedência superior aos operadores de igualdade e desigualdade (==, !=), avaliando da esquerda para a direita.",
        questions: [
          q("Qual é a precedência entre operadores relacionais de magnitude (ex: <, >) e operadores de igualdade (==, !=)?", "Operadores relacionais possuem precedência superior e são avaliados antes dos de igualdade", ["Operadores de igualdade são avaliados antes","Eles possuem a mesma precedência"], "Na expressão a < b == c < d, as comparações relacionais são calculadas primeiro, e seus resultados booleanos são então comparados."),
          q("O que acontece se compararmos dois ponteiros com o operador < em C++ se não pertencerem ao mesmo array?", "O comportamento da comparação é formalmente não especificado (unspecified behavior) pelo padrão", ["O programa quebra imediatamente","Retorna sempre true"], "Para ordenar ponteiros arbitrários com segurança total no padrão, deve-se usar o comparador std::less<T*>."),
          q("Qual operador relacional verifica se o valor da esquerda é estritamente menor que o da direita?", "<", ["<=","<>"], "O operador < verifica relação de ordem estrita."),
          q("Por que é má prática escrever a < b < c em C++ para testar se b está no intervalo entre a e c?", "Porque avalia como (a < b) < c; o booleano resultante (true ou false) é promovido para 1 ou 0 e comparado com c", ["Porque o código não compila","Porque desliga o otimizador"], "Para testar faixas contínuas, deve-se escrever explicitamente a < b && b < c."),
          t("Qual operador de dois caracteres verifica se dois valores são estritamente diferentes em C++?", ["!="], "!= retorna true se os operandos diferem em valor.", "# operador de desigualdade"),
          g("Complete a condicional de verificação de igualdade estrita:", ["if (status == 200) {\n    LiberarResposta();\n}"], "== compara a equivalência entre os operandos.", "if (status ____ 200) {\n    LiberarResposta();\n}"),
          o("Ordene os operadores pela sua hierarquia de precedência de comparação em C++:", ["Operadores aritméticos binários (+, -)","Operadores relacionais de magnitude (<, <=, >, >=)","Operadores relacionais de igualdade (==, !=)","Operadores lógicos de conjunção e disjunção (&&, ||)"], "Hierarquia formal de avaliação de comparações no C++."),
          p("Associe o operador relacional ao seu resultado se x vale 15:", [["x > 10","Avalia para true por superar o limite inferior"],["x <= 15","Avalia para true por atender a igualdade da fronteira inclusiva"],["x == 20","Avalia para false por divergência de valor"],["x != 0","Avalia para true por ser não nulo"]], "Comparações relacionais fundamentais na linguagem C++.")
        ]
      },
      {
        id: "cpp-c03-u7-l2",
        title: "O operador three-way comparison (<=>) do C++20",
        subtitle: "Spaceship operator · Ordem e igualdade em uma única operação expressiva",
        theory: "Padronizado no C++20, o operador de comparação de três vias (three-way comparison <=>), conhecido como \"spaceship operator\", avalia simultaneamente se um valor é menor, igual ou maior que outro em uma única operação. O operador retorna um objeto de categoria de ordem (como std::strong_ordering) em vez de um bool.",
        questions: [
          q("O que o operador de três vias (<=>) retorna ao comparar dois valores no C++20?", "Retorna um objeto de categoria de ordem (como std::strong_ordering) que pode ser comparado contra 0", ["Retorna um valor bool puro","Retorna -1, 0 ou 1 como inteiro int"], "O resultado é testado contra zero: (a <=> b < 0) significa a < b; (a <=> b == 0) significa equivalência."),
          q("Qual cabeçalho da biblioteca padrão de C++ deve ser incluído para utilizar as categorias de comparação do spaceship operator?", "#include <compare>", ["#include <utility>","#include <algorithm>"], "<compare> provê tipos como std::strong_ordering, std::weak_ordering e std::partial_ordering."),
          q("Qual é o benefício primário de implementar operator<=> em classes customizadas no C++20?", "O compilador gera automaticamente todos os operadores relacionais (<, <=, >, >=) a partir de uma única definição", ["Permite usar ponteiros sem deletar","Dobra a velocidade da GPU"], "Elimina dezenas de linhas de código boilerplate repetitivo de sobrecarga manual de operadores."),
          q("Como testar se o resultado de (a <=> b) indica que a é estritamente maior que b?", "(a <=> b > 0)", ["(a <=> b == 1)","(a <=> b is greater)"], "A comparação do resultado de <=> com zero determina o sentido da relação de ordem de forma canônica."),
          t("Qual símbolo de pontuação de três caracteres representa o spaceship operator no C++20?", ["<=>"], "<=> é o operador three-way comparison.", "# operador spaceship de tres vias"),
          g("Complete a expressão de ordenação usando o spaceship operator do C++20:", ["auto resultado = a <=> b;"], "<=> realiza a comparação de três vias entre operandos.", "auto resultado = a ____ b;"),
          o("Ordene a progressão de semântica do resultado de (a <=> b) ao comparar com zero:", ["(a <=> b < 0): a é estritamente menor que b","(a <=> b == 0): a e b são equivalentes na relação de ordem","(a <=> b > 0): a é estritamente maior que b","std::is_neq(a <=> b): a e b não são equivalentes"], "Mapeamento de relações de ordem a partir do spaceship operator em C++20."),
          p("Associe a expressão com spaceship operator ao seu significado relacional:", [["(a <=> b) < 0","Equivalente lógico à expressão relacional a < b"],["(a <=> b) == 0","Equivalente lógico à igualdade ou equivalência a == b"],["(a <=> b) > 0","Equivalente lógico à expressão relacional a > b"],["(a <=> b) <= 0","Equivalente lógico à fronteira inclusiva a <= b"]], "Semântica do operador three-way comparison no C++20.")
        ]
      },
      {
        id: "cpp-c03-u7-l3",
        title: "Categorias de comparação no C++20: strong, weak e partial",
        subtitle: "Rigor algébrico · std::strong_ordering vs std::weak_ordering vs std::partial_ordering",
        theory: "O C++20 divide relações de ordem em três categorias estritas no cabeçalho <compare>: std::strong_ordering (equivalência implica substitutibilidade absoluta, como inteiros), std::weak_ordering (equivalência sem substitutibilidade idêntica, como strings case-insensitive) e std::partial_ordering (alguns pares são incomparáveis, como floats e NaN).",
        questions: [
          q("Qual categoria de ordenação é retornada ao comparar números de ponto flutuante (float/double) com <=> no C++20?", "std::partial_ordering (pois valores NaN são incomparáveis com qualquer outro número)", ["std::strong_ordering","std::weak_ordering"], "Como NaN não é nem menor, nem igual, nem maior que nenhum valor, a ordenação é apenas parcial (unordered)."),
          q("O que caracteriza a categoria std::strong_ordering em C++20?", "Equivalência implica substitutibilidade perfeita: se a == b, qualquer observação f(a) produz exatamente f(b)", ["Permite valores nulos","Aceita números negativos apenas"], "É o tipo de ordenação de tipos fundamentais inteiros onde valores iguais são indistinguíveis em qualquer aspecto."),
          q("Em qual cenário de domínio a categoria std::weak_ordering é a modelagem correta?", "Ao comparar strings ignorando maiúsculas/minúsculas (\"Texto\" equivale a \"texto\", mas não são idênticos)", ["Para números inteiros puros","Para ponteiros de memória"], "Valores equivalentes sob a relação de ordem continuam tendo diferenças observáveis em outros contextos."),
          q("Qual valor estático de std::partial_ordering indica que dois valores são incomparáveis?", "std::partial_ordering::unordered", ["std::partial_ordering::none","std::partial_ordering::nan"], "Retornado sempre que um dos operandos da comparação for o valor especial NaN."),
          t("Qual categoria de ordenação em C++20 modela grandezas matemáticas com valores incomparáveis como NaN?", ["std::partial_ordering"], "partial_ordering representa ordens com elementos incomparáveis.", "# categoria de ordenacao parcial"),
          g("Complete o tipo de retorno da comparação forte entre inteiros de domínio:", ["std::strong_ordering operator<=>(const Id& outro) const = default;"], "std::strong_ordering define substitutibilidade absoluta.", "std::____ operator<=>(const Id& outro) const = default;"),
          o("Ordene as categorias de comparação de C++20 da mais restritiva e rigorosa para a mais flexível:", ["std::strong_ordering: equivalência absoluta com substitutibilidade perfeita de valores","std::weak_ordering: equivalência relativa sem garantia de igualdade de representação","std::partial_ordering: suporta pares de valores incomparáveis (estado unordered)"], "Hierarquia conceitual das categorias de ordenação no padrão C++20."),
          p("Associe o tipo de dado à categoria de ordenação nativa correspondente no C++20:", [["int32_t","std::strong_ordering com substitutibilidade perfeita"],["double / float","std::partial_ordering devido à presença de NaN incomparável"],["String insensível à caixa","std::weak_ordering por equivalência sem identidade"],["std::partial_ordering::unordered","Estado de comparação onde nenhum operando é maior ou menor"]], "Classificação de categorias de comparação na biblioteca padrão de C++.")
        ]
      },
      {
        id: "cpp-c03-u7-l4",
        title: "Geração automática de operadores com = default no C++20",
        subtitle: "Eliminação de boilerplate · Gerando todos os 6 operadores com uma única linha",
        theory: "No C++20, declarar auto operator<=>(const Tipo&) const = default instrui o compilador a gerar automaticamente o operador de três vias membro a membro e, por consequência, sintetizar os operadores ==, !=, <, <=, > e >=. O compilador infere a categoria de ordenação ideal baseada nos membros da estrutura.",
        questions: [
          q("Quantos operadores relacionais e de igualdade o compilador sintetiza ao declarar auto operator<=>(...) = default;?", "Todos os 6 operadores fundamentais: ==, !=, <, <=, > e >=", ["Apenas o operador <","Apenas == e !="], "Uma única linha de código gera a suíte completa de comparações relacionais com correção matemática garantida."),
          q("Como o operador sintetizado com = default compara os membros internos da struct?", "Compara os membros sequencialmente na ordem física em que foram declarados na definição da struct", ["Compara em ordem alfabética","Compara apenas o primeiro campo"], "Aplica ordenação lexicográfica canônica sobre cada campo da estrutura de dados."),
          q("Por que o operador == ainda deve ser declarado ou gerado junto ao <=> no C++20?", "Comparações de igualdade (==) podem ter otimizações diretas em hardware mais rápidas que a checagem de três vias", ["Porque o código não compila sem ele","Porque == é obrigatório em templates"], "Ao declarar <=> = default, o compilador automaticamente sintetiza um operator== = default otimizado."),
          q("O que acontece se um dos membros de uma struct não suportar o operador <=> ao usarmos = default?", "O compilador marca a função operator<=> como deletada (= delete) e emite erro se alguém tentar comparar", ["O membro é ignorado","O compilador gera aviso e continua"], "A síntese respeita estritamente as capacidades de comparação de todos os campos constituintes."),
          t("Qual palavra-chave instrui o compilador C++ a sintetizar a implementação padrão de um operador?", ["default"], "A sintaxe = default gera a implementação padrão.", "# palavra chave de implementacao padrao"),
          g("Complete a síntese automática completa de operadores na struct de coordenadas:", ["struct Ponto {\n    int x;\n    int y;\n    auto operator<=>(const Ponto&) const = default;\n};"], "A sintaxe = default gera todos os operadores relacionais automaticamente.", "struct Ponto {\n    int x;\n    int y;\n    auto operator<=>(const Ponto&) const = ____;\n};"),
          o("Ordene as etapas executadas pelo compilador ao sintetizar comparações com = default:", ["Análise da assinatura declarada com auto operator<=>(...) const = default","Inspeção da ordem física de declaração de cada campo da estrutura","Dedução da categoria de ordem comum mais forte suportada por todos os campos","Síntese em código de máquina dos métodos operator== e operator<=> lexicográficos"], "Fluxo de geração automática de operadores de comparação no C++20."),
          p("Associe a declaração de operador ao código sintetizado pelo compilador C++20:", [["auto operator<=>(...) = default","Gera comparação de três vias e igualdade lexicográfica completa"],["bool operator==(...) = default","Gera igualdade rápida membro a membro"],["Ordenação lexicográfica","Compara primeiro campo e só avança para o segundo em caso de empate"],["Síntese com = delete","Desativação automática caso algum campo não seja comparável"]], "Mecanismo de síntese de comparadores em C++ moderno.")
        ]
      },
      {
        id: "cpp-c03-u7-l5",
        title: "Comparações seguras de inteiros com <utility> (std::cmp_*)",
        subtitle: "Segurança C++20 · std::cmp_equal e std::cmp_less eliminando bugs de signed/unsigned",
        theory: "Comparar tipos inteiros com sinal e sem sinal (ex: int -1 < unsigned int 1) gera falsos lógicos perigosos no C++ clássico por coerção implícita. No C++20, o cabeçalho <utility> introduziu funções seguras: std::cmp_equal, std::cmp_not_equal, std::cmp_less e std::cmp_greater, que comparam sem coerções espúrias.",
        questions: [
          q("Por que a expressão clássica: int a = -1; unsigned int b = 1; (a < b) avalia como false no C++?", "Porque o int com sinal é convertido implicitamente para unsigned, transformando -1 em 4 bilhões que é maior que 1", ["Porque -1 é maior que 1 na matemática","Porque b é nulo"], "É um dos defeitos históricos mais comuns em C e C++, fonte frequente de falhas de segurança e limites de memória."),
          q("Qual função introduzida no C++20 pelo cabeçalho <utility> realiza a comparação correta entre a e b sem distorção?", "std::cmp_less(a, b)", ["std::safe_less(a, b)","std::compare(a, b)"], "std::cmp_less(-1, 1u) avalia corretamente para true, tratando valores negativos com integridade."),
          q("Quais funções compõem a família de comparadores inteiros seguros de <utility> no C++20?", "std::cmp_equal, std::cmp_not_equal, std::cmp_less, std::cmp_greater, std::cmp_less_equal e std::cmp_greater_equal", ["Apenas std::cmp","std::compare_all"], "Cobrem exaustivamente todas as relações de ordem e equivalência matemática entre tipos inteiros heterogêneos."),
          q("Qual função de <utility> no C++20 verifica se um valor inteiro cabe com segurança dentro da faixa de outro tipo?", "std::in_range<TipoDestino>(valor)", ["std::fits<Tipo>(valor)","std::safe_cast(valor)"], "std::in_range<uint8_t>(500) retorna false, permitindo checagem defensiva antes de narrowing."),
          t("Qual função do cabeçalho <utility> compara se um número é estritamente menor que outro com segurança de sinais?", ["std::cmp_less"], "std::cmp_less impede coerção perigosa entre signed e unsigned.", "# funcao de comparacao segura de inteiros"),
          g("Complete a comparação segura de inteiros heterogêneos usando a biblioteca padrão do C++20:", ["if (std::cmp_less(tamanhoAssinado, limiteNaoAssinado)) {\n    Processar();\n}"], "std::cmp_less compara sem converter -1 para unsigned.", "if (std::____(tamanhoAssinado, limiteNaoAssinado)) {\n    Processar();\n}"),
          o("Ordene as etapas executadas internamente por std::cmp_less(a, b) quando a é signed e b é unsigned:", ["Verificar se o valor do operando com sinal a é menor que zero (a < 0)","Se a for negativo: concluir imediatamente que é menor que b (retornar true)","Se a for positivo ou zero: realizar cast seguro de a para o tipo unsigned de b","Executar a comparação normal entre valores sem sinal já homogeneizados"], "Algoritmo formal das funções de comparação segura do C++20."),
          p("Associe a comparação ao seu resultado no C++20 com a = -1 e b = 1u:", [["a < b (clássico)","false por coerção espúria de -1 para unsigned gigantesco"],["std::cmp_less(a, b)","true por comparação matematicamente correta de grandezas"],["std::cmp_equal(a, b)","false constatando que grandezas diferentes não são iguais"],["std::in_range<uint8_t>(-5)","false sinalizando que número negativo não cabe em unsigned"]], "Comparativo de segurança em aritmética inteira heterogênea no C++20.")
        ]
      }
    ],
    8: [
      {
        id: "cpp-c03-u8-l1",
        title: "A classe de template std::numeric_limits (<limits>)",
        subtitle: "Introspecção de hardware · Consultando propriedades e capacidades no C++",
        theory: "O cabeçalho <limits> provê a classe de template std::numeric_limits<T>, permitindo consultar em tempo de compilação características fundamentais de qualquer tipo aritmético: limites máximos e mínimos, número de dígitos decimais, presença de sinal e suporte a infinitos e NaN no hardware.",
        questions: [
          q("Qual cabeçalho da biblioteca padrão de C++ deve ser incluído para usar std::numeric_limits?", "#include <limits>", ["#include <climits>","#include <cmath>"], "<limits> provê a interface moderna baseada em templates orientada a objetos de introspecção numérica."),
          q("Qual método estático de std::numeric_limits<int> retorna o maior valor representável por um inteiro de 32 bits?", "std::numeric_limits<int>::max()", ["std::numeric_limits<int>::highest()","std::numeric_limits<int>::limit()"], "Retorna 2.147.483.647 em tempo de compilação com zero sobrecarga."),
          q("Por que std::numeric_limits é superior às macros clássicas de C como INT_MAX ou DBL_MAX?", "numeric_limits é tipado, funciona com templates genéricos (T::max()) e previne poluição de macros no namespace", ["numeric_limits gasta menos memória","INT_MAX foi removido"], "Permite escrever código genérico: template <typename T> void Verificar(T valor) { auto max = std::numeric_limits<T>::max(); }."),
          q("Os métodos de std::numeric_limits são avaliados em tempo de compilação (constexpr)?", "Sim; todos os métodos e constantes de numeric_limits são constexpr desde o C++11", ["Não, consultam o SO em runtime","Apenas no modo release"], "Permite utilizar limites numéricos como dimensões de arrays estáticos e parâmetros de templates."),
          t("Qual classe de template do cabeçalho <limits> expõe as propriedades dos tipos aritméticos?", ["std::numeric_limits"], "std::numeric_limits inspeciona características de tipos numéricos.", "# classe de limites numericos em C++"),
          g("Complete a obtenção do valor máximo de um inteiro usando numeric_limits:", ["int maximo = std::numeric_limits<int>::max();"], "max() retorna o limite superior do tipo especificado.", "int maximo = std::numeric_limits<int>::____();"),
          o("Ordene as etapas para consultar limites numéricos de forma genérica em um template:", ["Incluir o cabeçalho padrão <limits> no arquivo de cabeçalho ou fonte","Parametrizar a consulta informando o tipo de dado de destino: std::numeric_limits<T>","Invocar o método constexpr desejado (ex: ::min(), ::max() ou ::lowest())","Utilizar o valor literal resultante em asserções de compilação ou validações"], "Fluxo de introspecção de características numéricas no C++."),
          p("Associe o membro de std::numeric_limits à sua informação fornecida:", [["::max()","Maior valor finito positivo representável pelo tipo"],["::min()","Menor valor positivo normalizado (para floats) ou menor com sinal (inteiros)"],["::lowest()","Menor valor finito negativo representável por tipos de ponto flutuante"],["::is_signed","Constante booleana indicando se o tipo suporta valores negativos"]], "Membros fundamentais da classe std::numeric_limits em C++.")
        ]
      },
      {
        id: "cpp-c03-u8-l2",
        title: "A diferença crucial entre min(), lowest() e max()",
        subtitle: "Armadilhas de limites · Por que numeric_limits::min() em double NÃO é negativo",
        theory: "Uma das maiores pegadinhas no C++ envolve std::numeric_limits<double>::min(): para tipos de ponto flutuante, min() retorna o menor número positivo normalizado (> 0), e NÃO o maior número negativo. Para obter o menor valor negativo finito em floats ou doubles, deve-se usar obrigatoriamente ::lowest().",
        questions: [
          q("O que a chamada std::numeric_limits<double>::min() retorna em C++?", "Retorna o menor número positivo normalizado representável (~2.22e-308), e NÃO um número negativo", ["Retorna o maior número negativo","Retorna zero"], "Armadilha clássica: inicializar uma busca de valor máximo com min() em double falha com listas de números negativos."),
          q("Qual método estático de std::numeric_limits deve ser usado para obter o menor valor negativo finito de um float/double?", "std::numeric_limits<double>::lowest()", ["std::numeric_limits<double>::min()","std::numeric_limits<double>::negative_max()"], "lowest() foi introduzido no C++11 especificamente para resolver essa ambiguidade histórica."),
          q("Qual é o comportamento de ::min() e ::lowest() para tipos inteiros com sinal como int?", "Para inteiros com sinal, tanto min() quanto lowest() retornam exatamente o mesmo valor negativo (ex: -2.147.483.648)", ["lowest() retorna zero","min() retorna zero"], "A divergência entre min() e lowest() existe exclusivamente para tipos de ponto flutuante (float, double, long double)."),
          q("Qual valor deve ser usado como ponto de partida neutro ao buscar o valor máximo em um vetor de double?", "std::numeric_limits<double>::lowest() (ou o primeiro elemento real do vetor colecao[0])", ["std::numeric_limits<double>::min()","0.0"], "Se todos os números forem negativos, lowest() garante que qualquer valor real superará o marco inicial."),
          t("Qual método estático de std::numeric_limits retorna o valor mais negativo para tipos de ponto flutuante?", ["lowest"], "lowest() retorna o extremo negativo finito.", "# metodo de menor valor negativo finito"),
          g("Complete a inicialização correta para encontrar o maior valor em um vetor de números decimais:", ["double maior = std::numeric_limits<double>::lowest();"], "lowest() é o ponto de partida neutro seguro para busca de máximos em ponto flutuante.", "double maior = std::numeric_limits<double>::____();"),
          o("Ordene os valores de limites de double do mais negativo para o mais positivo:", ["std::numeric_limits<double>::lowest(): menor valor finito negativo (~ -1.79e+308)","0.0: o número zero neutro","std::numeric_limits<double>::min(): menor número finito positivo normalizado (~ 2.22e-308)","std::numeric_limits<double>::max(): maior valor finito positivo (~ 1.79e+308)"], "Escala real de limites de ponto flutuante em C++."),
          p("Associe a consulta de limites ao seu valor em std::numeric_limits<double>:", [["::lowest()","Valor mais negativo finito representável (~ -1.79e308)"],["::min()","Menor valor positivo finito normalizado (~ 2.22e-308)"],["::max()","Maior valor positivo finito representável (~ 1.79e308)"],["::infinity()","Representação formal de infinito positivo (+inf)"]], "Diferenciação precisa de limites em ponto flutuante no .NET e C++.")
        ]
      },
      {
        id: "cpp-c03-u8-l3",
        title: "Números subnormais (denormais) e precisão fracionária",
        subtitle: "Arquitetura de CPU · Gradual Underflow, std::numeric_limits::denorm_min e custo de FPU",
        theory: "No IEEE 754, números subnormais (denormais) preenchem a lacuna entre 0.0 e o menor número normalizado (min()), permitindo subflow gradual (Gradual Underflow). O método std::numeric_limits<T>::denorm_min() expõe essa fronteira. Processar subnormais na FPU pode causar quedas drásticas de performance na CPU.",
        questions: [
          q("O que são \"números subnormais\" (denormais) na especificação de ponto flutuante IEEE 754?", "Números com magnitude menor que min() onde o bit implícito da mantissa torna-se zero para evitar salto abrupto para 0.0", ["Números negativos anômalos","Números imaginários"], "Garantem o princípio do \"Gradual Underflow\", permitindo que subtrações x - y == 0 ocorram apenas se x == y."),
          q("Qual é a consequência de desempenho de operações que produzem ou manipulam números subnormais na CPU?", "Podem ser até 100 vezes mais lentas, pois muitas CPUs acionam traps de microcódigo de hardware para processá-los", ["Aumentam a frequência de clock","Melhoram o consumo de energia"], "Em processamento de áudio digital (DSP) e jogos, subnormais geram picos de travamento de frames (stuttering)."),
          q("Como desenvolvedores de áudio em tempo real e jogos costumam desativar números subnormais em C++?", "Ativando os modos de hardware FTZ (Flush-To-Zero) e DAZ (Denormals-Are-Zero) nos registradores de controle da CPU (MXCSR)", ["Usando números inteiros apenas","Desativando a placa de som"], "Força qualquer número subnormal a ser truncado instantaneamente para 0.0 em tempo de instrução."),
          q("Qual método de std::numeric_limits informa o menor valor positivo absoluto representável incluindo subnormais?", "std::numeric_limits<double>::denorm_min()", ["std::numeric_limits<double>::min()","std::numeric_limits<double>::tiny()"], "denorm_min() atinge a fronteira absoluta mínima antes do zero absoluto."),
          t("Qual método de std::numeric_limits retorna o menor valor positivo considerando números subnormais?", ["denorm_min"], "denorm_min retorna o menor valor representável subnormal.", "# metodo de menor valor subnormal"),
          g("Complete a consulta ao menor valor subnormal representável do tipo float:", ["float menorSubnormal = std::numeric_limits<float>::denorm_min();"], "denorm_min atinge a fronteira antes do zero.", "float menorSubnormal = std::numeric_limits<float>::____();"),
          o("Ordene as grandezas de magnitude fracionária positiva do zero até a unidade:", ["0.0: o zero absoluto da escala","std::numeric_limits<float>::denorm_min(): menor subnormal representável (~1.4e-45)","std::numeric_limits<float>::min(): menor número normalizado com bit implícito (~1.17e-38)","1.0: a unidade fundamental"], "Escala dimensional fracionária incluindo a zona subnormal em C++."),
          p("Associe o termo de arquitetura de ponto flutuante à sua definição:", [["Gradual Underflow","Mecanismo que preenche o espaço entre zero e min() com subnormais"],["Flush-To-Zero (FTZ)","Instrução de hardware que trunca subnormais para zero por desempenho"],["denorm_min()","Menor número não nulo absoluto representável no hardware"],["Bit implícito da mantissa","Bit inicial oculto que assume 0 em subnormais e 1 em normais"]], "Conceitos de arquitetura de ponto flutuante no padrão IEEE 754.")
        ]
      },
      {
        id: "cpp-c03-u8-l4",
        title: "Operações de contagem e manipulação de bits com <bit>",
        subtitle: "C++20 moderno · std::popcount, std::countl_zero, std::has_single_bit e endianness",
        theory: "O cabeçalho <bit> padronizou no C++20 funções de hardware de manipulação de bits de altíssima velocidade: std::popcount (contagem de bits 1), std::countl_zero (zeros à esquerda), std::has_single_bit (verifica potências de 2) e o enum std::endian, substituindo instruções intrínsecas específicas de compiladores.",
        questions: [
          q("Qual função introduzida no cabeçalho <bit> do C++20 conta quantos bits estão com valor 1 (popcount) em um número?", "std::popcount(valor)", ["std::count_bits(valor)","std::bit_sum(valor)"], "Mapeia diretamente para a instrução de hardware da CPU (como POPCNT em x86), executando em 1 único ciclo de clock."),
          q("Como testar se um número inteiro é uma potência exata de dois de forma elegante no C++20?", "Invocando a função std::has_single_bit(valor)", ["Testando if (valor % 2 == 0)","Usando log2"], "std::has_single_bit verifica se o número possui exatamente um bit 1 ativo em sua representação binária."),
          q("Qual enum do cabeçalho <bit> permite verificar em tempo de compilação a ordem de bytes (endianness) do sistema?", "std::endian (com std::endian::native == std::endian::little ou big)", ["std::byte_order","std::endianness"], "Permite escrever código portável para protocolos de rede e formatos de arquivo binário sem depender de macros do SO."),
          q("O que a função std::countl_zero(valor) calcula no C++20?", "O número de bits com valor zero consecutivos a partir do bit mais significativo (zeros à esquerda)", ["A quantidade total de zeros","O menor bit"], "Mapeia para a instrução de hardware LZCNT / BSR, essencial em algoritmos de compressão e escalonamento."),
          t("Qual função do cabeçalho <bit> no C++20 conta o número de bits 1 em um inteiro?", ["std::popcount"], "std::popcount executa a instrução POPCNT no hardware.", "# funcao de contagem de bits popcount"),
          g("Complete o teste moderno para verificar se o tamanho do buffer é potência de dois no C++20:", ["if (std::has_single_bit(tamanhoBuffer)) {\n    ConfigurarBuffer();\n}"], "std::has_single_bit substitui truques manuais de bitwise.", "if (std::____(tamanhoBuffer)) {\n    ConfigurarBuffer();\n}"),
          o("Ordene as etapas para inspecionar e manipular bits de uma flag de hardware com <bit>:", ["Incluir o cabeçalho padrão <bit> introduzido no C++20","Verificar se o valor recebido é potência de dois com std::has_single_bit","Contabilizar permissões ativas em paralelo com std::popcount","Calcular alinhamento de memória identificando zeros com std::countl_zero"], "Fluxo de manipulação de representação binária de alto desempenho em C++20."),
          p("Associe a função do cabeçalho <bit> à sua operação de hardware no C++20:", [["std::popcount","Contabiliza o número de bits 1 ativos no inteiro"],["std::has_single_bit","Retorna true se o número for uma potência exata de base 2"],["std::countl_zero","Conta zeros consecutivos a partir do bit mais significativo"],["std::endian::native","Identifica se a arquitetura corrente é little-endian ou big-endian"]], "Funções de manipulação de bits de hardware no cabeçalho <bit> do C++20.")
        ]
      },
      {
        id: "cpp-c03-u8-l5",
        title: "Projeto integrado: motor de física e conversão de unidades",
        subtitle: "Síntese prática completa · Tipos estritos, constexpr, limites e comparadores C++20",
        theory: "Neste projeto integrado, consolidamos tipos primitivos, Const-Correctness, funções constexpr, o operador spaceship (<=>) e limites numéricos para construir um motor de física e conversão de grandezas em C++. O motor calcula aceleração, verifica colisões com tolerância epsilon e garante integridade estrita.",
        questions: [
          q("Por que cálculos de cinemática e colisões no motor devem utilizar comparações tolerantes com epsilon?", "Para evitar falsos negativos causados por microdivergências de representação do padrão IEEE 754 em coordenadas reais", ["Porque floats não funcionam em jogos","Para a GPU rodar sem drivers"], "Garante que objetos em contato físico sejam detectados como coincidentes mesmo com arredondamentos da FPU."),
          q("Como garantir que as tabelas de constantes físicas de conversão não consumam nenhum ciclo de CPU em runtime?", "Declarando as funções de cálculo e estruturas de coeficientes como constexpr ou consteval no C++", ["Usando variáveis globais mutáveis","Alocando na Heap"], "O compilador calcula todos os coeficientes em tempo de build, inserindo diretamente literais no executável."),
          q("Como habilitar a suíte completa de operadores relacionais sobre a estrutura Vetor3D no C++20?", "Declarando auto operator<=>(const Vetor3D&) const = default; dentro da struct", ["Escrevendo os 6 operadores manualmente","Usando herança múltipla"], "Gera comparações completas lexicográficas com zero código repetitivo e máxima correção."),
          q("Como inicializar com segurança a variável que rastreia a velocidade máxima atingida por partículas?", "Inicializando com std::numeric_limits<double>::lowest() para suportar qualquer faixa de velocidades", ["Inicializando com 0.0","Inicializando com min()"], "Assegura que qualquer grandeza registrada pelo motor superará o ponto de partida de forma determinística."),
          t("Qual palavra-chave do C++ garante que funções do motor de física executem exclusivamente durante a compilação?", ["consteval"], "consteval impõe resolução obrigatória no momento do build.", "# palavra chave de execucao estrita no build"),
          g("Complete a definição da constante física calculada no build:", ["constexpr double GravidadePadrao = 9.80665;"], "constexpr inicializa a constante de física em tempo de compilação.", "____ double GravidadePadrao = 9.80665;"),
          o("Ordene as etapas da pipeline de simulação física e detecção de limites do motor:", ["Validação de argumentos de entrada com checagem de limites numéricos (std::numeric_limits)","Cálculo de forças e aceleração utilizando constantes avaliadas em tempo de compilação (constexpr)","Atualização de posições com ponto flutuante de precisão dupla","Avaliação de contato e ordenação de partículas usando <=> e tolerância epsilon"], "Pipeline completa do motor integrado de física e conversão de grandezas em C++."),
          p("Associe a ferramenta ao seu papel na arquitetura do motor de física em C++:", [["std::numeric_limits<double>::lowest()","Ponto neutro seguro para busca de grandezas extremas"],["auto operator<=> = default","Geração declarativa dos operadores relacionais de ordenação"],["std::abs(a - b) <= epsilon","Comparação tolerante de contato entre coordenadas flutuantes"],["constexpr conversão de unidades","Computação prévia no build com zero sobrecarga na simulação"]], "Componentes fundamentais da engenharia do motor de física em C++ moderno.")
        ]
      }
    ]
  });
})();
