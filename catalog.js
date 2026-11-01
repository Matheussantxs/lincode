'use strict';
// The catalog describes the approved scope. Empty lesson slots are never published as exercises.
const COURSE_PLAN = {
 javascript:[
 ['Introdução à linguagem, navegador e ambiente','Web e JavaScript|HTML, CSS e JavaScript|Console do navegador|Primeira saída|Editor e arquivos|Erros no console|Scripts e páginas|Primeiro programa'],
 ['Lógica, algoritmos e fluxogramas','Entradas e saídas|Sequência de passos|Símbolos de fluxogramas|Montagem de fluxos|Decisões|Repetições|Rastreamento de variáveis|Validação de algoritmos'],
 ['Variáveis, tipos e operadores','Let e const|Números|Strings|Booleanos|Null e undefined|Conversões|Comparações|Expressões compostas'],
 ['Condições, laços e rastreamento','If e else|Switch|Operadores lógicos|For|While|Break e continue|Acumuladores|Rastreamento'],
 ['Funções, escopo e closures','Parâmetros|Retorno|Arrow functions|Escopo léxico|Closures|Callbacks|Funções puras|Composição'],
 ['Arrays, objetos e transformação de dados','Índices|Métodos de arrays|Objetos|Desestruturação|Map|Filter|Reduce|Dados imutáveis'],
 ['DOM, eventos e formulários','Seletores|Texto e atributos|Criar elementos|Eventos|Delegação|Formulários|Validação|Acessibilidade'],
 ['Classes, objetos e protótipos','Objetos e identidade|Construtores|This|Métodos|Encapsulamento|Protótipos|Herança|Composição'],
 ['Módulos e organização de aplicações','Import e export|Responsabilidades|Dependências|ES modules|Configuração|Camadas|Contratos|Refatoração'],
 ['Promises, async/await e event loop','Pilha de chamadas|Callbacks|Promises|Async e await|Erros assíncronos|Concorrência|Microtarefas|Cancelamento'],
 ['HTTP, Fetch, JSON e APIs','HTTP|JSON|Fetch|Status e erros|Cabeçalhos|Parâmetros|AbortController|Integração'],
 ['Node.js, arquivos e ferramentas','Runtime Node.js|Npm|Scripts|Sistema de arquivos|Paths|Variáveis de ambiente|CLI|Depuração'],
 ['Servidores e APIs com Node.js','Servidor HTTP|Rotas|Corpo da requisição|Validação|Respostas|Erros|Autenticação|Testes da API'],
 ['Persistência e segurança de aplicações','Modelagem|SQL|Consultas parametrizadas|Transações|Senhas e sessões|Validação de entrada|Permissões|Backup'],
 ['Testes, depuração e acessibilidade','Asserções|Testes unitários|Integração|Mocks|Depurador|Teclado|Rótulos e contraste|Auditoria'],
 ['Projeto completo: aplicação web','Requisitos do gerenciador|Interface de estudos|Formulários|API de tarefas|Persistência|Sessões|Testes completos|Entrega documentada']
 ],
 java:[
 ['Introdução, JDK, JVM e primeiro programa','JDK e JVM|Instalação|Classe inicial|Método main|Compilação|Execução|Entrada e saída|Diagnóstico de erros'],
 ['Lógica, algoritmos e fluxogramas','Problemas e algoritmos|Entradas e saídas|Símbolos|Montagem de fluxos|Condições|Repetições|Rastreamento|Validação'],
 ['Variáveis, tipos e operadores','Tipos primitivos|Declarações|Strings|Conversões|Aritmética|Comparações|Booleanos|Precisão numérica'],
 ['Condições, laços e rastreamento','If e else|Switch|For|While|Do while|Break e continue|Acumuladores|Depuração de laços'],
 ['Métodos, escopo e recursão','Assinaturas|Parâmetros|Retornos|Escopo|Sobrecarga|Passagem por valor|Caso-base|Recursão'],
 ['Arrays, strings e manipulação de dados','Arrays|Percursos|Matrizes|Strings imutáveis|StringBuilder|Busca|Ordenação|Transformação'],
 ['Classes, objetos e encapsulamento','Classes|Instâncias|Construtores|Métodos|Visibilidade|Invariantes|Estado estático|Composição'],
 ['Herança, interfaces e polimorfismo','Especialização|Super|Sobrescrita|Classes abstratas|Interfaces|Despacho dinâmico|Contratos|Composição'],
 ['Collections, generics e comparadores','List|Set|Map|Iteradores|Generics|Wildcards|Comparable|Comparator'],
 ['Lambdas, Streams e Optional','Interfaces funcionais|Lambdas|Referências de método|Stream|Map e filter|Collectors|Optional|Efeitos colaterais'],
 ['Exceções, arquivos e serialização','Exceções|Try e catch|Finally|Try-with-resources|Paths|Leitura|Escrita|Serialização'],
 ['Concorrência e execução assíncrona','Threads|Estado compartilhado|Sincronização|Executors|Futures|CompletableFuture|Cancelamento|Testes concorrentes'],
 ['HTTP, APIs e integração entre sistemas','HTTP|JSON|HttpClient|Status|Timeouts|Contratos|Retentativas|Testes de integração'],
 ['SQL, JDBC e persistência','Modelagem relacional|SQL|Conexões JDBC|PreparedStatement|Resultados|Transações|Repositórios|Migrações'],
 ['Testes, depuração e ferramentas de build','JUnit|Asserções|Testes parametrizados|Mocks|Depurador|Maven|Gradle|Integração contínua'],
 ['Projeto completo: API com Spring Boot','Regras da biblioteca|Entidades e DTOs|Catálogo de livros|Empréstimos|Validação|Persistência|Testes de API|Entrega documentada']
 ],
 cpp:[
 ['Introdução, compilador e primeiro programa','Código e binário|Compilador|Função main|Includes|Saída|Entrada|Compilar e executar|Diagnóstico'],
 ['Lógica, algoritmos e fluxogramas','Especificação|Sequências|Símbolos|Construção de fluxos|Decisões|Repetições|Rastreamento|Casos de teste'],
 ['Tipos, variáveis e operadores','Inteiros|Ponto flutuante|Booleanos|Constantes|Aritmética|Conversões|Comparações|Limites de representação'],
 ['Condições, laços e rastreamento','If e else|Switch|For|While|Do while|Break e continue|Acumulação|Invariantes'],
 ['Funções, referências e recursão','Declarações|Parâmetros|Retornos|Referências|Const reference|Sobrecarga|Caso-base|Recursão'],
 ['Arrays, strings e estruturas','Arrays|Std::array|Std::string|Índices e limites|Structs|Agregados|Percursos|Validação de entrada'],
 ['Classes, objetos e encapsulamento','Classes|Construtores|Membros privados|Métodos const|Invariantes|Inicialização|Destrutores|Composição'],
 ['Herança, polimorfismo e composição','Herança pública|Métodos virtuais|Override|Interfaces abstratas|Destrutor virtual|Object slicing|Composição|Contratos'],
 ['Memória, ponteiros e RAII','Endereços|Ponteiros|Tempo de vida|Ownership|RAII|Unique_ptr|Shared_ptr|Referências pendentes'],
 ['Biblioteca padrão e algoritmos','Vector|Map|Set|Iteradores|Sort|Find|Transform|Ranges'],
 ['Templates e programação genérica','Templates de função|Dedução|Templates de classe|Especialização|Constraints|Concepts|Mensagens de erro|Algoritmos genéricos'],
 ['Semântica de movimento e recursos','Lvalues e rvalues|Cópia|Move constructor|Move assignment|Std::move|Regra de zero|Regra de cinco|Validade após movimento'],
 ['Exceções, arquivos e tratamento de erros','Throw|Try e catch|Garantias de exceção|Streams|Leitura de arquivos|Escrita|Validação|RAII e erros'],
 ['Estruturas de dados e complexidade','Big O|Vetores dinâmicos|Listas|Pilhas|Filas|Árvores|Hash tables|Escolha de estrutura'],
 ['Testes, depuração, CMake e concorrência','Testes unitários|Casos extremos|Depurador|Sanitizers|CMake|Threads|Mutex|Data races'],
 ['Projeto completo: aplicação C++ modular','Regras do inventário|Modelo de produtos|Operações de estoque|Arquivos|Gerenciamento de recursos|Módulos e build|Testes|Entrega documentada']
 ]
};
const courseCache = new Map();
const PYTHON_UNITS=[
 'Introdução e primeiros algoritmos|Símbolos e leitura de fluxos|Fluxogramas na prática|Variáveis e expressões|Condições compostas|Repetições e sentinelas|Decomposição de problemas|Projeto de lógica',
 'Saída, funções e coleções|Tipos e conversões|Operadores e strings|Condições em Python|Laços e iteração|Funções e escopo|Documentação e módulos|Programa de terminal',
 'Classes, métodos e herança|Construtores e estado|Encapsulamento|Propriedades|Composição|Polimorfismo|Métodos especiais|Modelagem de objetos',
 'Dicionários e compreensões|Listas e tuplas|Conjuntos|Dicionários aninhados|Iteradores|Geradores|Ordenação e busca|Transformações de dados',
 'Arquivos e exceções|Texto e codificação|CSV e JSON|Paths e diretórios|Exceções específicas|Context managers|Módulos e pacotes|Importação robusta',
 'Ambientes e testes|Venv e dependências|Testes de unidade|Fixtures e parametrização|Depuração|Tipos e documentação|Lint e formatação|Integração contínua',
 'Perguntas e dados|Tipos de variáveis|Qualidade dos dados|Estatística descritiva|Visualização|Amostragem|Correlação e causalidade|Relatório exploratório',
 'Arrays e operações vetoriais|Shape e dtype|Indexação e slicing|Máscaras booleanas|Broadcasting|Agregações e eixos|Álgebra matricial|Desempenho e memória',
 'Leitura, limpeza e análise|Índices e seleção|Dados ausentes|Datas e categorias|Transformações|Groupby e agregações|Merge e cardinalidade|Pipeline de limpeza',
 'Regressão e interpretação|Fórmulas e matrizes|Ajuste de modelos|Intervalos de confiança|Resíduos e diagnósticos|Comparação de modelos|Limitações e pressupostos|Relatório estatístico',
 'Treino, avaliação e monitoramento|Problema e critérios|Exploração e baseline|Pré-processamento sem vazamento|Validação e escolha de modelo|Pipeline reproduzível|Inferência e monitoramento|Portfólio e documentação'
];
function courseChapters(lang) {
  if(courseCache.has(lang.id))return courseCache.get(lang.id);
  const old=getChapters(lang);
  let result;
  if(lang.id==='python') {
    result=old.map((c,n)=>({...c,title:c.label,units:PYTHON_UNITS[n].split('|').map((title,i)=>({id:`${c.id}-u${i+1}`,title,objective:`Aplicar ${title.toLowerCase()} e explicar o resultado de um exemplo em Python.`,lessons:i===0?c.lessons:[]}))}));
    result[0].units[2].lessons=window.PYTHON_FLOW_LESSONS||[];
    // Novas atividades das lições legadas e lições novas, por número de unidade (1-based).
    for(const l of result[0].units[0].lessons)l.questions.push(...(window.PYTHON_LOGIC_EXTRA?.[l.id]||[]));
    for(const [n,lessons] of Object.entries(window.PYTHON_LOGIC_UNITS||{}))result[0].units[n-1].lessons.push(...lessons);
    for(const [chId,map] of Object.entries(window.PYTHON_CHAPTER_UNITS||{})){const ch=result.find(c=>c.id===chId);if(ch)for(const [n,ls] of Object.entries(map))ch.units[n-1].lessons.push(...ls);}
  }
  else {
    const seeds=window.LINCODE_CONTENT?.[lang.id];
    result=seeds?seeds.map(c=>({...c,label:c.title,units:c.units.map(u=>({...u,lessons:u.lessons.map(l=>({...l,questions:l.activities,subtitle:u.title}))}))})):
      COURSE_PLAN[lang.id].map(([title,topics],i)=>({id:`${lang.id}-c${String(i+1).padStart(2,'0')}`,title,label:title,description:`Estude ${title.charAt(0).toLowerCase()+title.slice(1)} com exemplos e prática.`,units:topics.split('|').map((topic,j)=>({id:`${lang.id}-c${i+1}-u${j+1}`,title:topic,objective:`Aplicar ${topic.toLowerCase()} em um problema de ${lang.name} e explicar o resultado.`,lessons:[]}))}));
    // Stable legacy lesson IDs retain previous completion records after the reorganization.
    for(const ch of old) for(const lesson of ch.lessons) {
      let target=ch.id==='poo'?(lang.id==='javascript'?7:6):ch.id==='fundamentos'?5:1;
      if(['introducao','primeira-resposta','saida'].includes(lesson.id))target=0;
      if(lesson.id==='funcoes')target=4;
      result[target].units[0].lessons.push(lesson);
    }
    for(const [chId,map] of Object.entries(window.LINCODE_CHAPTER_UNITS?.[lang.id]||{})){const ch=result.find(c=>c.id===chId);if(ch)for(const [n,ls] of Object.entries(map))ch.units[n-1].lessons.push(...ls);}
  }
  result.forEach((c,i)=>{
    c.targetLessonCount=40;c.prerequisites=i?[result[i-1].id]:[];
    for(let u=0;u<c.units.length-1;u++)if(c.units[u].lessons.length>5)c.units[u+1].lessons.unshift(...c.units[u].lessons.splice(5));
    c.lessons=c.units.flatMap(u=>u.lessons);
    c.lessons.forEach(l=>l.questions.push(...(window.LINCODE_EXTRA?.[lang.id]?.[l.id]||[])));
    c.lessons.forEach(l=>l.questions.forEach((q,j)=>{q.id=q.id||`${lang.id}:${l.id}:a${j+1}`;}));
    c.authoringStatus=c.lessons.length===40&&c.lessons.every(l=>l.questions.length===8)?'ready':'partial';
  });
  courseCache.set(lang.id,result);return result;
}
