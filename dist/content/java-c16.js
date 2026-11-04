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

  const lang = "java";
  const chId = "java-c16";
  window.LINCODE_CHAPTER_UNITS = window.LINCODE_CHAPTER_UNITS || {};
  window.LINCODE_CHAPTER_UNITS[lang] = window.LINCODE_CHAPTER_UNITS[lang] || {};
  window.LINCODE_CHAPTER_UNITS[lang][chId] = Object.assign(window.LINCODE_CHAPTER_UNITS[lang][chId] || {}, {
    1: [
      {
        id: "java-c16-u1-l2-politicas-de-devolucao-e-multas",
        title: "Políticas de devolução, prazos e cálculo de multas diárias",
        subtitle: "Regras de negócio · Controlando atrasos e penalidades financeiras no domínio",
        theory: "O cálculo de multas por atraso na biblioteca compara a data prevista de entrega com a data real da devolução através de java.time.LocalDate. Dias de atraso multiplicam a taxa diária definida na regra institucional, aplicando isenções automáticas para finais de semana e feriados cadastrados no calendário do sistema.",
        questions: [
          q("Qual classe moderna do pacote java.time representa apenas a data da devolução sem informações de fuso ou horário?", "LocalDate", ["LocalDateTime","Instant"], "LocalDate representa apenas ano, mês e dia, formato ideal para controle de calendário de empréstimos."),
          q("Como a regra institucional de multas deve tratar os dias de atraso que coincidem com fins de semana fechados?", "Ignorar os dias fechados calculando apenas dias úteis de penalidade previstos em contrato", ["Cobrar o triplo do valor nos domingos","Excluir o cadastro do leitor do sistema"], "Regras amigáveis de biblioteca geralmente descontam dias em que a devolução física era inviável."),
          q("Qual estrutura numérica em Java é indicada para representar valores monetários de multas evitando erros de arredondamento?", "BigDecimal", ["double","float"], "BigDecimal garante precisão decimal exata para cálculos financeiros e taxas monetárias."),
          q("Se a devolução ocorre rigorosamente dentro do prazo acordado, qual deve ser o valor da multa gerada?", "Zero, registrando a quitação sem pendência financeira", ["Um centavo simbólico de taxa","O valor integral da caução"], "Devoluções tempestivas liberam o exemplar sem gerar encargos para o associado."),
          t("Qual método estático de ChronoUnit calcula a quantidade de dias entre duas instâncias de LocalDate?", ["ChronoUnit.DAYS.between","between"], "ChronoUnit.DAYS.between(dataPrevista, dataReal) retorna a diferença numérica em dias."),
          g("Complete o cálculo de dias de atraso usando ChronoUnit.DAYS entre o prazo e a entrega:", ["between"], "ChronoUnit.DAYS.between mede o intervalo exato de dias corridos entre duas datas.", "long atraso = ChronoUnit.DAYS.____(prazoPrevisto, dataEntrega);"),
          o("Ordene o processo de cálculo de penalidade ao receber uma devolução com atraso:", ["Obter a data de entrega e comparar com o prazo acordado no registro do empréstimo","Calcular a quantidade líquida de dias úteis em atraso aplicando o calendário","Multiplicar os dias apurados pela taxa diária configurada em BigDecimal","Gerar a pendência financeira associada ao cadastro do usuário"], "Comparar prazos, calcular dias úteis, multiplicar pela taxa e gerar a pendência."),
          p("Associe os termos do cálculo de multas ao seu papel no domínio da biblioteca:", [["LocalDate","Armazena data civil de prazo ou devolução"],["ChronoUnit.DAYS","Calcula a distância em dias entre datas"],["BigDecimal","Evita imprecisão em valores monetários"],["Taxa diária","Valor unitário cobrado por dia vencido"]], "Entender esses tipos garante integridade nas regras contábeis do projeto.")
        ]
      },
      {
        id: "java-c16-u1-l3-limites-de-emprestimos-por-categoria",
        title: "Limites de empréstimos simultâneos por categoria de usuário",
        subtitle: "Autorização de negócio · Diferenciando cotas para alunos, pesquisadores e professores",
        theory: "O domínio da biblioteca estabelece limites distintos de livros em posse simultânea: estudantes de graduação podem retirar até 3 obras por 7 dias, enquanto professores retiram até 10 obras por 30 dias. A validação consulta a contagem de empréstimos ativos do usuário antes de liberar a concessão de um novo título.",
        questions: [
          q("O que deve ocorrer se um estudante que já possui 3 livros ativos tentar realizar um quarto empréstimo?", "O serviço rejeita a operação lançando uma exceção de negócio com mensagem clara", ["O sistema exclui o primeiro livro emprestado","O sistema empresta normalmente sem avisar"], "Respeitar a cota impede sobrecarga do acervo e garante equidade entre os usuários."),
          q("Qual padrão em Java é ideal para representar as categorias de usuário com suas respectivas cotas máximas?", "Um enum Java com campos para cota máxima e prazo permitido", ["Múltiplos números mágicos espalhados pelo código","Variáveis globais do sistema operacional"], "Enums em Java encapsulam constantes de domínio com atributos e comportamentos associados."),
          q("Qual consulta deve anteceder a aprovação de uma nova concessão de livro?", "Contagem de empréstimos com status ATIVO vinculados ao identificador do associado", ["Soma de todas as páginas lidas no ano","Verificação de status do servidor de e-mail"], "Apenas empréstimos em aberto contam contra a cota máxima permitida do usuário."),
          q("Se o associado possuir multas vencidas em aberto, qual regra defensiva deve ser acionada?", "Bloqueio preventivo de novos empréstimos até a regularização financeira do débito", ["Aumento automático da cota de livros","Empréstimo concedido em dobro"], "Bloquear novos empréstimos para associados inadimplentes protege o patrimônio da instituição."),
          t("Qual tipo de dado Java agrupa constantes com atributos como cotaMaxima e diasPrazo?", ["enum","Enum"], "Enums são ideais para modelar categorias fixas de associados e suas regras associadas."),
          g("Complete a verificação do limite de empréstimos comparando a contagem atual com a cota permitida:", ["cotaMaxima"], "Garante que o total de ativos não ultrapasse a cota configurada.", "if (totalAtivos >= categoria.____()) throw new LimiteExcedidoException();"),
          o("Ordene a verificação de elegibilidade antes de autorizar um novo empréstimo:", ["Carregar o cadastro do usuário e sua respectiva categoria institucional","Verificar se o associado possui pendências financeiras ou multas não quitadas","Contar quantos empréstimos ativos estão registrados em nome do associado","Validar se o total atual é estritamente menor que a cota permitida da categoria"], "Identificar usuário, checar pendências, contar ativos e validar cota da categoria."),
          p("Relacione a categoria do usuário à respectiva regra no modelo da biblioteca:", [["Estudante","Cota de até 3 livros com prazo de 7 dias"],["Pesquisador","Cota de até 5 livros com prazo de 14 dias"],["Professor","Cota de até 10 livros com prazo de 30 dias"],["Visitante","Acesso restrito a consulta local no recinto"]], "Categorizar perfis permite flexibilizar políticas de circulação no acervo.")
        ]
      },
      {
        id: "java-c16-u1-l4-renovacao-de-emprestimos-e-reservas",
        title: "Renovação de empréstimos com trava para livros com reservas ativas",
        subtitle: "Rotatividade de acervo · Garantindo prioridade para usuários na fila de espera",
        theory: "A renovação de um empréstimo prorroga o prazo de entrega por período idêntico, desde que o associado não tenha ultrapassado o número máximo de renovações consecutivas e não existam reservas pendentes para a obra. A existência de uma reserva ativa na fila confere prioridade ao próximo leitor cadastrado.",
        questions: [
          q("Por que um livro com reserva solicitada por outro usuário não pode ser renovado?", "Para garantir a rotatividade do acervo e respeitar a fila de espera dos leitores", ["Porque o banco de dados desativa o livro","Porque a biblioteca encerra o expediente"], "Priorizar reservas ativas evita retenção indefinida de obras disputadas por outros associados."),
          q("Qual campo no registro de Emprestimo ajuda a limitar renovações consecutivas exageradas?", "Um contador inteiro de renovacoesRealizadas incrementado a cada extensão", ["Uma flag booleana que nunca muda","O preço de capa do livro"], "Controlar o número de renovações (ex: máximo 3) previne monopolização do acervo."),
          q("Se a data de entrega original já expirou gerando atraso, a renovação simples pode ser autorizada?", "Não, a renovação exige situação regular sem atrasos correntes no empréstimo", ["Sim, renovar anula qualquer atraso passado","Apenas se o livro for digital"], "Empréstimos já vencidos exigem regularização física ou quitação antes de nova prorrogação."),
          q("Qual status da reserva indica que ela ainda está aguardando a devolução do livro para ser atendida?", "PENDENTE", ["CONCLUIDA","CANCELADA"], "Reservas pendentes indicam demanda ativa aguardando retorno de exemplares ao acervo."),
          t("Qual status identifica um empréstimo em curso antes da devolução do livro?", ["ATIVO","Ativo"], "Empréstimos com status ATIVO mantêm o exemplar bloqueado para circulação."),
          g("Complete a checagem que impede renovação se houver reservas pendentes para o exemplar:", ["temReservasPendentes"], "Impede renovar quando outro associado aguarda na fila de espera.", "if (reservaService.____(livroId)) throw new LivroReservadoException();"),
          o("Ordene as validações necessárias para aprovar a renovação de um empréstimo:", ["Localizar o empréstimo ativo pelo identificador informado na requisição","Verificar se a devolução está no prazo sem atraso corrente registrado","Conferir se o total de renovações ainda não atingiu o teto permitido","Consultar o serviço de reservas para confirmar ausência de leitores na fila","Prorrogar a data prevista de entrega e registrar o incremento da renovação"], "Localizar empréstimo, checar atraso, checar cota, verificar reservas e prorrogar."),
          p("Associe os cenários de renovação às respectivas respostas do domínio:", [["Sem reservas e no prazo","Renovação aprovada com novo prazo estendido"],["Com reserva de terceiro","Renovação negada por prioridade na fila"],["Com atraso já ocorrido","Renovação negada exigindo devolução física"],["Teto de renovações atingido","Renovação negada por limite de concessão"]], "Essas regras blindam o acervo contra retenções indevidas.")
        ]
      },
      {
        id: "java-c16-u1-l5-invariantes-do-dominio-e-encapsulamento",
        title: "Invariantes do domínio de biblioteca e encapsulamento em serviços puros",
        subtitle: "Design de software · Mantendo o estado consistente antes de tocar no banco",
        theory: "Invariantes são condições que devem permanecer verdadeiras durante todo o ciclo de vida da aplicação: exemplares disponíveis nunca podem ser negativos e empréstimos devem possuir data e associado válidos. Encapsular essas regras no núcleo de domínio protege o sistema contra dados corrompidos por chamadas externas.",
        questions: [
          q("O que caracteriza um invariante de domínio em uma aplicação de biblioteca?", "Uma regra essencial que nunca pode ser violada, como saldo de exemplares não negativo", ["Uma cor de botão na interface gráfica","Um arquivo temporário no sistema de logs"], "Invariantes garantem consistência estrutural e semântica aos dados de negócio."),
          q("Onde as regras essenciais de validação de negócio devem ser prioritariamente expressas?", "No modelo de domínio e em serviços de aplicação desacoplados de frameworks", ["Diretamente no JavaScript da tela do navegador","Em triggers manuais desordenadas no banco"], "Validar no núcleo de aplicação garante testes rápidos e independência de tecnologia."),
          q("O que acontece quando uma entidade tenta transicionar para um estado inválido?", "Lança uma exceção de domínio informando a inconsistência e aborta a mutação", ["Salva silenciosamente para corrigir depois","Desliga a máquina virtual Java"], "Falhar rápido com exceções expressivas impede propagação de estados inconsistentes."),
          q("Por que atributos mutáveis de entidades devem ter visibilidade privada com métodos de intenção clara?", "Para impedir que código externo altere valores internos contornando as regras de validação", ["Para obrigar o programador a escrever mais código","Porque o compilador Java proíbe campos públicos"], "Encapsulamento garante que o estado da entidade só mude através de métodos que fiscalizam invariantes."),
          t("Qual palavra-chave Java define variáveis ou métodos acessíveis apenas na própria classe?", ["private"], "Campos private protegem o estado interno contra mutações externas indevidas."),
          g("Complete o método de domínio que protege o invariante de estoque mínimo:", ["saldoDisponivel"], "Evita que exemplares caiam abaixo de zero em operações de circulação.", "if (this.____ <= 0) throw new ExemplarIndisponivelException();"),
          o("Ordene as etapas de uma transição segura de estado em uma entidade de domínio:", ["Receber os parâmetros da operação através de método com intenção clara","Validar se os parâmetros atendem às regras e se o estado atual permite a operação","Alterar os atributos internos da entidade preservando os invariantes","Emitir eventual evento de domínio notificando a transição bem-sucedida"], "Receber intenção, validar pré-condições, atualizar estado e notificar evento."),
          p("Relacione os pilares de consistência de domínio às suas finalidades:", [["Invariante","Condição estrutural sempre verdadeira"],["Encapsulamento","Proteção do estado interno via métodos"],["Exceção de domínio","Notificação expressiva de quebra de regra"],["Método com intenção","Substitui setters anêmicos por ações de negócio"]], "Um domínio rico e protegido previne bugs complexos em sistemas enterprise.")
        ]
      }
    ],
    2: [
      {
        id: "java-c16-u2-l1-modelagem-entidade-livro-jpa",
        title: "Modelagem da entidade Livro com JPA e chave primária UUID/Long",
        subtitle: "Mapeamento objeto-relacional · Definindo tabelas, atributos e chaves primárias",
        theory: "A entidade Livro mapeia os metadados do acervo para a tabela livros via anotações Jakarta Persistence: @Entity, @Table e @Id com chave gerada. Campos como isbn, titulo, autor e anoPublicacao são anotados com @Column, definindo restrições de nulidade e unicidade essenciais diretamente no esquema relacional.",
        questions: [
          q("Qual anotação marca uma classe Java comum como uma entidade gerenciada pelo JPA?", "@Entity", ["@TableOnly","@ManagedModel"], "@Entity informa ao provedor JPA que a classe possui mapeamento em tabela relacional."),
          q("Qual estratégia de @GeneratedValue gera identificadores autoincrementais pelo banco relacional?", "GenerationType.IDENTITY", ["GenerationType.AUTO","GenerationType.UUID"], "GenerationType.IDENTITY delega ao mecanismo de chave primária identity do banco."),
          q("Como garantir no mapeamento JPA que a coluna ISBN não aceitará valores duplicados na tabela?", "Configurando unique = true no atributo @Column do campo isbn", ["Criando duas variáveis com o mesmo nome","Usando apenas comentários no código"], "unique = true adiciona uma restrição de unicidade na tabela gerada."),
          q("Por que entidades JPA exigem um construtor padrão (sem argumentos)?", "Para permitir que o provedor JPA instancie o objeto por reflexão ao hidratar dados do banco", ["Porque o compilador exige em todas as classes","Para apagar o estado do objeto automaticamente"], "O provedor JPA cria instâncias vazias via reflexão antes de preencher as propriedades."),
          t("Qual anotação do JPA especifica explicitamente o nome da tabela no banco de dados?", ["@Table","Table"], "@Table(name = \"livros\") define o nome exato da tabela de persistência."),
          g("Complete a definição da chave primária autoincrementada da entidade Livro:", ["@GeneratedValue","GeneratedValue"], "@GeneratedValue define a estratégia de criação automática de chaves.", "@Id\n____(strategy = GenerationType.IDENTITY)\nprivate Long id;"),
          o("Ordene a anatomia básica de uma entidade Livro mapeada com JPA:", ["Anotar a classe com @Entity e @Table(name = 'livros')","Declarar o atributo identificador com @Id e @GeneratedValue","Declarar atributos como titulo, autor e isbn com anotações @Column","Fornecer construtor sem argumentos protegido e construtor com parâmetros"], "Definir entidade/tabela, chave primária, colunas mapeadas e construtores."),
          p("Associe as anotações JPA da entidade Livro às suas atribuições:", [["@Entity","Registra a classe como entidade persistente"],["@Id","Indica o atributo de chave primária"],["@Column(nullable = false)","Obriga presença de valor na coluna SQL"],["@Column(unique = true)","Impede duplicidade de valores na coluna"]], "Mapear corretamente os metadados previne erros em tempo de execução.")
        ]
      },
      {
        id: "java-c16-u2-l2-entidades-emprestimo-e-exemplar-relacionamentos",
        title: "Entidades Empréstimo e Exemplar com relacionamentos ManyToOne",
        subtitle: "Mapeamento relacional · Modelando associações entre cópias físicas e contratos",
        theory: "A separação entre Livro e Exemplar reflete o mundo real: a biblioteca possui um título abstrato (ISBN) e vários itens físicos com código de barras próprio. A entidade Emprestimo vincula um Exemplar e um Usuario via anotações @ManyToOne com @JoinColumn, permitindo rastrear o histórico individual de cada exemplar.",
        questions: [
          q("Por que uma biblioteca deve modelar a entidade Exemplar separada da entidade Livro?", "Porque um mesmo título catalogado possui vários exemplares físicos com estados e históricos individuais", ["Porque bancos de dados não aceitam livros com mais de 100 páginas","Para duplicar o título a cada compra"], "Exemplares representam cópias físicas individuais de uma mesma obra catalogada."),
          q("Qual anotação JPA mapeia a relação de muitos empréstimos apontando para um mesmo usuário?", "@ManyToOne", ["@OneToMany","@ManyToMany"], "Muitos registros de Emprestimo referenciam um único registro de Usuario no banco."),
          q("Qual estratégia de carregamento (FetchType) é a melhor prática recomendada para relacionamentos @ManyToOne?", "FetchType.LAZY", ["FetchType.EAGER","FetchType.ALL"], "LAZY adia a consulta até que o relacionamento seja acessado, evitando joins custosos e o problema N+1."),
          q("Qual anotação define o nome da coluna de chave estrangeira (FK) na tabela de empréstimos?", "@JoinColumn(name = \"exemplar_id\")", ["@ForeignKeyColumn","@ExternalId"], "@JoinColumn customiza a coluna relacional que referencia a tabela pai."),
          t("Qual valor do enum FetchType deve ser usado em @ManyToOne para evitar carregamento automático desnecessário?", ["LAZY","FetchType.LAZY"], "FetchType.LAZY evita carregamento antecipado de associações pesadas."),
          g("Complete a associação ManyToOne configurando carregamento preguiçoso na entidade Emprestimo:", ["LAZY"], "FetchType.LAZY adia a busca até o uso explícito da associação.", "@ManyToOne(fetch = FetchType.____)\n@JoinColumn(name = \"usuario_id\")\nprivate Usuario usuario;"),
          o("Ordene a estrutura de navegação entre as entidades no relacionamento de circulação:", ["Livro contém metadados gerais da obra como título e ISBN","Exemplar referencia o Livro e possui código de barras físico único","Emprestimo associa um Exemplar ativo a um Usuario associado","Devolucao encerra o Emprestimo e atualiza o estado do Exemplar"], "Do catálogo abstrato ao exemplar físico e ao contrato de empréstimo."),
          p("Relacione as anotações de associação JPA às suas funções:", [["@ManyToOne","Múltiplas instâncias filhas apontam para um pai"],["@JoinColumn","Define o nome físico da chave estrangeira"],["FetchType.LAZY","Carrega a associação sob demanda"],["@OneToMany(mappedBy = ...)","Lado inverso da associação bidirecional"]], "Mapear relacionamentos com clareza sustenta queries eficientes.")
        ]
      },
      {
        id: "java-c16-u2-l3-records-java-para-dtos-imutaveis",
        title: "Records Java para DTOs imutáveis de entrada (Request) e saída (Response)",
        subtitle: "Contratos de API · Criando transportes leves, imutáveis e sem boilerplate",
        theory: "Introduzidos modernamente no Java, records fornecem sintaxe concisa para criar classes imutáveis transportadoras de dados (DTOs). Um record gera automaticamente construtor canônico, métodos acessores (sem prefixo get), equals, hashCode e toString, servindo como contrato ideal para requisições e respostas JSON.",
        questions: [
          q("Qual recurso da linguagem Java é o padrão recomendado para representar DTOs imutáveis modernos?", "Records", ["JavaBeans com setters públicos","Classes anônimas"], "Records definem portadores de dados transparentes, imutáveis e concisos por padrão."),
          q("Como os métodos de acesso aos atributos são nomeados em um record Java?", "Com o próprio nome do atributo (ex: dto.titulo()) sem o prefixo get", ["Sempre com o prefixo getTitulo()","Com o prefixo fetchTitulo()"], "Records eliminam convenções antigas de JavaBeans usando nomes de métodos diretos."),
          q("Os atributos de um record podem ser alterados após sua instanciação?", "Não, todos os campos de um record são final e imutáveis por padrão", ["Sim, chamando setters automáticos","Apenas se estiver conectado ao banco"], "Imutabilidade previne efeitos colaterais e alterações acidentais de estado no transporte."),
          q("Por que usar records como DTOs melhora a segurança da API Spring Boot?", "Impede mass assignment garantindo que apenas campos explicitamente mapeados sejam trafegados", ["Desativa o firewall do servidor","Faz com que senhas sejam públicas"], "DTOs atuam como uma barreira de segurança protegendo o modelo interno de entidades."),
          t("Qual palavra-chave Java declara um record com seus componentes imutáveis?", ["record"], "A palavra-chave record introduz uma classe portadora de dados imutável em Java."),
          g("Complete a declaração do record de entrada para cadastro de livros na API:", ["record"], "Declara o record com seus componentes contratuais imutáveis.", "public ____ NovoLivroRequest(String titulo, String autor, String isbn) {}"),
          o("Ordene a estrutura canônica de um record de resposta em uma API Spring Boot:", ["Definir os componentes de saída no cabeçalho do record","Adicionar anotações de serialização ou documentação se necessário","Criar construtor secundário para converter a partir da entidade JPA","Utilizar os métodos acessores limpos na camada de serviço ou controle"], "Componentes, anotações, método conversor e consumo nos endpoints."),
          p("Associe os benefícios dos records Java às suas características:", [["Imutabilidade","Campos declarados como final por padrão"],["Concisão","Dispensa getters, setters, equals e toString manuais"],["Contrato explícito","Expõe claramente apenas os dados negociados na API"],["Segurança","Isola a entidade JPA contra mutações indevidas"]], "Records transformaram o design de camadas de dados e DTOs no ecossistema Java.")
        ]
      },
      {
        id: "java-c16-u2-l4-mapeamento-entre-entidades-e-dtos",
        title: "Mapeamento entre entidades e DTOs via métodos de conversão ou mappers",
        subtitle: "Desacoplamento de camadas · Convertendo requisições em entidades e vice-versa",
        theory: "A conversão entre DTOs e entidades protege o núcleo da aplicação. Um DTO de requisição é transformado em entidade por um método de fábrica ou mapper especializado, enquanto entidades salvas no banco são convertidas em DTOs de resposta, ocultando detalhes de persistência e chaves técnicas desnecessárias ao cliente.",
        questions: [
          q("Qual é a principal desvantagem de devolver entidades JPA diretamente nos controladores REST?", "Vazar detalhes de persistência, acoplar o banco à API e arriscar erros de recursão cíclica com LAZY", ["Fazer a JVM travar por falta de memória","Bancos relacionais proíbem controladores de lerem entidades"], "Devolver entidades expõe atributos internos e frequentemente dispara LazyInitializationException."),
          q("Onde é apropriado colocar métodos simples de conversão de DTO para entidade?", "Em métodos de conveniência no próprio record/classe DTO ou em classes Mapper dedicadas", ["No arquivo pom.xml da aplicação","Em comandos shell do sistema operacional"], "Mappers centralizam as regras de transformação de dados entre camadas."),
          q("Qual biblioteca do ecossistema Java gera implementações seguras de mappers em tempo de compilação?", "MapStruct", ["Hibernate","Spring Security"], "MapStruct gera código Java nativo em tempo de compilação, rápido e sem sobrecarga de reflexão."),
          q("Como evitar expor o ID interno de chave estrangeira ao devolver um livro emprestado?", "Mapeando apenas os atributos de negócio no DTO de resposta como título e data prevista", ["Retornando null em todas as requisições","Criptografando o banco inteiro"], "O DTO seleciona com precisão cirúrgica o que faz sentido para o consumidor da API."),
          t("Qual método estático de fábrica é comum em DTOs para gerar a resposta a partir da entidade?", ["from","of"], "from(entidade) ou of(entidade) são convenções amplamente adotadas no ecossistema Java."),
          g("Complete o método estático do record de resposta que converte uma entidade Livro:", ["from"], "Método de fábrica converte a entidade persistida em DTO de saída.", "public static LivroResponse ____(Livro livro) {\n    return new LivroResponse(livro.getId(), livro.getTitulo(), livro.getIsbn());\n}"),
          o("Ordene o fluxo de dados em uma requisição POST que utiliza mapeamento de DTOs:", ["Controlador recebe o JSON e desserializa em record NovoLivroRequest","Serviço ou mapper converte o Request em uma nova instância da entidade Livro","Repositório salva a entidade no banco de dados e obtém o ID gerado","Mapper transforma a entidade persistida em LivroResponse","Controlador devolve 201 Created com o LivroResponse no corpo"], "Request DTO -> Entidade -> Banco -> Entidade salva -> Response DTO."),
          p("Relacione as estratégias de mapeamento de objetos às suas características:", [["Conversão manual","Total controle sem dependências extras"],["MapStruct","Mapeamento veloz gerado em tempo de compilação"],["Record de resposta","Filtra exatamente os campos exibidos ao cliente"],["Record de requisição","Restringe a entrada aos campos autorizados"]], "O desacoplamento de camadas mantém a arquitetura flexível e manutenível.")
        ]
      },
      {
        id: "java-c16-u2-l5-protecao-e-visibilidade-em-apis",
        title: "Proteção contra sobre-exposição de dados e controle de visibilidade em APIs",
        subtitle: "Segurança de dados · Blindando informações institucionais e atributos confidenciais",
        theory: "O controle rigoroso de visibilidade impede o vazamento de dados sensíveis, como histórico de multas não quitadas, documentos cadastrais e metadados de auditoria. A API pública deve devolver apenas atributos autorizados pelo papel do consumidor, aplicando projeções e contratos específicos para cada perfil de acesso.",
        questions: [
          q("O que caracteriza a vulnerabilidade de exposição excessiva de dados (Mass Assignment / Over-exposure)?", "Permitir que o cliente leia ou modifique campos internos não autorizados que a API expôs indevidamente", ["Usar HTTPS na comunicação com o cliente","Autenticar requisições com senhas fortes"], "Exposição indevida ocorre quando atributos internos de entidades são transitados sem filtro."),
          q("Como impedir que um usuário comum veja o histórico disciplinar confidencial de outro leitor?", "Retornando DTOs específicos de perfil público e restringindo acessos via regras de segurança", ["Criando um alerta popup no navegador","Conectando o banco sem senha"], "Filtrar os dados por DTOs e validar autorização no backend blinda dados confidenciais."),
          q("Qual boa prática de modelagem de DTO evita que campos como 'ativo' ou 'administrador' sejam alterados pelo cliente?", "Omitir esses campos do DTO de requisição, atribuindo-os exclusivamente no serviço interno", ["Deixar o cliente enviar qualquer JSON e aceitar tudo","Excluir esses campos do banco de dados"], "Se o campo não está no DTO de entrada, o cliente não consegue forçar sua alteração."),
          q("Em que camada a decisão de autorização baseada em papéis de usuário deve ser validada?", "No backend (controladores e serviços), antes de consultar ou manipular os dados", ["Apenas no frontend visual em JavaScript","No cabo de rede do roteador"], "Segurança deve residir prioritariamente no backend, pois o cliente HTTP pode ser facilmente forjado."),
          t("Qual anotação do Spring Security autoriza a execução de um método baseando-se em expressão de papel (role)?", ["@PreAuthorize","PreAuthorize"], "@PreAuthorize(\"hasRole('ADMIN')\") fiscaliza permissões antes de chamar o método."),
          g("Complete a anotação que restringe a consulta do relatório de multas apenas a bibliotecários:", ["PreAuthorize"], "Anotação avalia a permissão do usuário autenticado antes da execução.", "@____(\"hasRole('BIBLIOTECARIO')\")\npublic RelatorioMultasResponse gerarRelatorio() { ... }"),
          o("Ordene as barreiras de proteção ao expor dados de um associado da biblioteca:", ["Autenticar o token da requisição HTTP identificando o usuário solicitante","Verificar se o solicitante é o próprio titular da conta ou um bibliotecário autorizado","Consultar o banco recuperando a entidade com os dados necessários","Construir o DTO de resposta específico suprimindo dados sensíveis ou restritos","Retornar a representação filtrada com status 200 OK"], "Autenticar, verificar perfil, consultar banco, projetar DTO seguro e responder."),
          p("Associe os tipos de dados às suas políticas de visibilidade na API da biblioteca:", [["Título e autor do livro","Público para qualquer visitante"],["Histórico de empréstimos","Restrito ao titular e a bibliotecários"],["Documento de identificação","Privado e visível apenas a administradores"],["Senha e hash de segurança","Estritamente interno, jamais devolvido na API"]], "Classificar os dados assegura conformidade com leis de privacidade e segurança.")
        ]
      }
    ],
    3: [
      {
        id: "java-c16-u3-l1-endpoints-get-e-paginacao-pageable",
        title: "Endpoints GET para listagem de catálogo com paginação (Pageable)",
        subtitle: "Performance e usabilidade · Evitando sobrecarga com listagens paginadas",
        theory: "Consultar o catálogo inteiro de uma biblioteca de uma só vez provocaria estouro de memória e lentidão extrema. No Spring Boot, injetamos a interface Pageable nos métodos anotados com @GetMapping, delegando a paginação eficiente ao banco relacional via LIMIT e OFFSET gerenciados automaticamente pelo Spring Data.",
        questions: [
          q("Por que uma API enterprise jamais deve retornar listas ilimitadas de um catálogo de livros?", "Para evitar consumo excessivo de memória, lentidão de rede e degradação do banco de dados", ["Porque clientes HTTP só aceitam até 10 caracteres","Porque bancos SQL proíbem tabelas com muitas linhas"], "Paginar resultados garante estabilidade, baixo consumo de memória e respostas ágeis."),
          q("Qual interface do Spring Data é injetada no controlador para receber parâmetros de página, tamanho e ordenação?", "Pageable", ["SortableOnly","ListCollector"], "Pageable encapsula número da página, quantidade de elementos por página e critérios de ordenação."),
          q("Qual interface de retorno do Spring Data encapsula os registros paginados com metadados como total de páginas e elementos?", "Page", ["Array","Vector"], "Page<T> carrega a lista da página atual e metadados como totalElements e totalPages."),
          q("Qual anotação do Spring MVC mapeia uma rota de consulta para listagens paginadas?", "@GetMapping", ["@PostMapping","@DeleteMapping"], "@GetMapping atende a requisições HTTP GET destinadas à recuperação de dados."),
          t("Qual anotação no parâmetro do controlador define configurações padrão de paginação como tamanho 20?", ["@PageableDefault","PageableDefault"], "@PageableDefault(size = 20, sort = \"titulo\") padroniza a paginação caso não informada."),
          g("Complete a assinatura do método de consulta de catálogo paginado no controlador:", ["Pageable"], "Injeta a paginação configurada na requisição HTTP.", "@GetMapping\npublic Page<LivroResponse> listar(@PageableDefault(size = 20) ____ pageable) { ... }"),
          o("Ordene a jornada de uma consulta de catálogo paginada na API:", ["Cliente envia requisição GET /livros?page=0&size=10&sort=titulo,asc","Spring MVC instancia o objeto Pageable a partir dos parâmetros de query","Serviço delega a busca ao repositório LivroRepository.findAll(pageable)","Repositório executa consulta paginada com count total no banco relacional","Mapear a Page<Livro> para Page<LivroResponse> e devolver 200 OK"], "Receber query params, instanciar Pageable, consultar repositório, mapear e responder."),
          p("Relacione os parâmetros de paginação às suas funções na URL:", [["page=0","Primeira página da consulta (base zero)"],["size=10","Quantidade de registros exibidos por página"],["sort=titulo,asc","Ordenação alfabética crescente por título"],["totalElements","Contagem total de registros no banco"]], "Compreender os metadados de paginação viabiliza navegação fluida em interfaces ricas.")
        ]
      },
      {
        id: "java-c16-u3-l2-filtros-de-busca-no-catalogo",
        title: "Filtros de busca por título, autor, categoria e ISBN",
        subtitle: "Consultas dinâmicas · Localizando obras com parâmetros opcionais",
        theory: "O catálogo da biblioteca deve permitir pesquisas combinadas por título parcial, nome do autor, categoria e ISBN exato. Com Spring Data JPA, podemos utilizar métodos derivados de consulta (findByTituloContainingIgnoreCase) ou Specifications do JPA para compor predicados dinâmicos sem concatenar strings de SQL.",
        questions: [
          q("Qual método derivado do Spring Data JPA busca livros cujo título contenha um trecho de texto ignorando maiúsculas/minúsculas?", "findByTituloContainingIgnoreCase", ["searchTitulo","getTituloBySubstring"], "O Spring Data gera automaticamente a consulta com LIKE %...% e lower()."),
          q("Por que concatenar parâmetros do usuário diretamente em strings SQL é uma prática terminantemente proibida?", "Porque introduz vulnerabilidade crítica de Injeção de SQL (SQL Injection)", ["Porque o Java não aceita concatenação de strings","Porque deixa o texto sempre em maiúsculas"], "Parâmetros não sanitizados permitem que invasores alterem a estrutura da consulta SQL."),
          q("Qual recurso do JPA Criteria permite compor filtros dinâmicos opcionais no Spring Data?", "JpaSpecificationExecutor com Specification", ["Arquivos .bat no servidor","Constantes globais no modelo"], "Specifications permitem encadear predicados condicionais de forma tipada e segura."),
          q("Quando a busca por ISBN é realizada, qual comportamento é esperado quanto à multiplicidade de resultados?", "Retornar no máximo um único título catalogado, pois o ISBN é um identificador único internacional", ["Retornar todos os livros da biblioteca","Retornar apenas livros com capa vermelha"], "ISBN identifica unicamente uma edição bibliográfica no mundo editorial."),
          t("Qual anotação indica que um parâmetro do método de controle vem da query string da URL (ex: ?titulo=Java)?", ["@RequestParam","RequestParam"], "@RequestParam extrai valores passados na URL de consulta da requisição."),
          g("Complete o método derivado que busca por autor e categoria no Spring Data JPA:", ["findByAutorAndCategoria"], "Spring Data deriva a consulta combinada baseando-se no nome do método.", "Page<Livro> ____(String autor, Categoria categoria, Pageable pageable);"),
          o("Ordene a execução de uma busca com múltiplos filtros opcionais:", ["Receber parâmetros opcionais de título, autor e categoria no controlador","Construir a Specification encadeando os predicados informados pelo cliente","Executar a busca no repositório combinando Specification e Pageable","Converter a página de entidades resultante em DTOs LivroResponse","Retornar a lista paginada filtrada com status HTTP 200 OK"], "Receber filtros, construir Specification, executar consulta, mapear e devolver."),
          p("Associe os recursos de consulta aos seus propósitos:", [["ContainingIgnoreCase","Busca textual parcial sem diferenciar caixa"],["@RequestParam(required=false)","Permite que o filtro seja opcional na requisição"],["Specification","Monta filtros dinâmicos sob demanda"],["Pageable","Evita explosão de resultados nas buscas"]], "Projetar buscas dinâmicas e seguras é pilar de qualquer sistema de acervo.")
        ]
      },
      {
        id: "java-c16-u3-l3-cadastro-de-titulos-e-unicidade-de-isbn",
        title: "Cadastro de novos títulos com verificação de unicidade de ISBN",
        subtitle: "Consistência de dados · Garantindo que cada edição possua registro único",
        theory: "O cadastro de livros na API recebe dados essenciais e fiscaliza a unicidade do ISBN antes da persistência. O serviço consulta se o código já existe no repositório; caso positivo, lança uma exceção de conflito de negócio que o handler global traduz em status 409 Conflict, impedindo cadastros duplicados no acervo.",
        questions: [
          q("Qual status HTTP deve ser retornado ao tentar cadastrar um livro com ISBN já existente no catálogo?", "409 Conflict", ["200 OK","500 Internal Server Error"], "409 Conflict expressa que a requisição conflita com o estado corrente de unicidade do banco."),
          q("Qual anotação do Bean Validation valida se uma string de ISBN atende ao padrão esperado de tamanho e dígitos?", "@Pattern ou anotações específicas como @ISBN", ["@NotNull apenas","@Size(max=2)"], "Anotações declarativas fiscalizam o formato sintático do ISBN antes de tocar no serviço."),
          q("O que deve acontecer com a requisição de cadastro se o título vier em branco?", "Ser rejeitada pelo Bean Validation no controlador retornando 400 Bad Request", ["Ser cadastrada como livro sem nome","Apagar todos os livros antigos"], "A anotação @NotBlank no DTO rejeita strings vazias ou com espaços em branco."),
          q("Qual status HTTP indica que o livro foi cadastrado com sucesso e está pronto no sistema?", "201 Created", ["204 No Content","301 Moved Permanently"], "201 Created é a resposta padrão para criação bem-sucedida de novos recursos em REST."),
          t("Qual método de LivroRepository verifica rapidamente se já existe registro com determinado ISBN?", ["existsByIsbn"], "existsByIsbn executa uma contagem otimizada (SELECT 1 ...) sem carregar a entidade completa."),
          g("Complete a checagem no serviço que impede duplicidade de ISBN no catálogo:", ["existsByIsbn"], "Garante que o ISBN seja exclusivo antes de prosseguir com o cadastro.", "if (livroRepository.____(dto.isbn())) throw new IsbnDuplicadoException();"),
          o("Ordene o fluxo de cadastro de um novo livro na API da biblioteca:", ["Receber o JSON no endpoint @PostMapping e validar formato com @Valid","Verificar no repositório se já existe título com o mesmo ISBN cadastrado","Instanciar a entidade Livro populando dados a partir do DTO validado","Persistir a entidade no banco de dados através do repositório","Retornar status 201 Created acompanhado do cabeçalho Location e do DTO de saída"], "Validar formato, checar unicidade de ISBN, instanciar, persistir e retornar 201."),
          p("Relacione os códigos HTTP e mensagens às respostas do cadastro de livros:", [["201 Created","Livro cadastrado com sucesso no acervo"],["400 Bad Request","Dados de entrada inválidos ou ISBN mal formatado"],["409 Conflict","ISBN já cadastrado em outra obra"],["Location Header","URI que aponta para o novo recurso criado"]], "Seguir a semântica REST enriquece a clareza e previsibilidade da API.")
        ]
      },
      {
        id: "java-c16-u3-l4-atualizacao-parcial-de-metadados",
        title: "Atualização parcial de metadados do livro e status de disponibilidade",
        subtitle: "Manutenção do catálogo · Aplicando mutações controladas sem corromper o histórico",
        theory: "Atualizar os dados de um livro envolve alterar metadados informativos (sinopse, edição, editora) sem permitir a troca indevida de identificadores imutáveis como o ISBN já consolidado. O método PATCH ou PUT valida a existência do recurso pelo ID, aplica as alterações autorizadas e confirma a transação com segurança.",
        questions: [
          q("Por que o identificador primário (ID) e o ISBN geralmente não devem ser alterados na atualização de um livro?", "Porque são chaves de identidade e unicidade que sustentam relacionamentos de empréstimos históricos", ["Porque o compilador Java apaga o banco ao alterar IDs","Porque o protocolo HTTP proíbe alterar números"], "Alterar chaves de identidade quebra integridade referencial com empréstimos e histórico."),
          q("Qual método HTTP é semanticamente mais apropriado para aplicar alterações parciais em um recurso?", "PATCH", ["GET","DELETE"], "PATCH aplica modificações pontuais em propriedades sem exigir envio do documento integral."),
          q("O que o serviço deve fazer se o ID informado na URL de atualização não existir no banco?", "Lançar uma exceção de recurso não encontrado que resulte em 404 Not Found", ["Criar um novo livro com ID aleatório","Retornar 200 OK com corpo vazio"], "404 Not Found comunica ao cliente que a entidade a ser alterada não existe."),
          q("Qual anotação garante que a operação de atualização execute dentro de uma transação aberta do Spring?", "@Transactional", ["@Stateful","@PersistNow"], "@Transactional comanda abertura, commit e rollback automático em caso de exceções não checadas."),
          t("Qual verbo HTTP é tradicionalmente utilizado em REST para substituição completa de uma representação?", ["PUT"], "PUT envia a representação integral de um recurso para substituir a existente."),
          g("Complete a anotação que vincula o ID presente na URL ao parâmetro do método de atualização:", ["PathVariable"], "@PathVariable extrai variáveis dinâmicas da rota HTTP.", "@PatchMapping(\"/{id}\")\npublic ResponseEntity<LivroResponse> atualizar(@____ Long id, @RequestBody AtualizaLivroRequest dto)"),
          o("Ordene as etapas de uma atualização segura de metadados de livro:", ["Extrair o ID da URL e validar o corpo da requisição de atualização","Localizar a entidade existente no banco ou lançar RecursoNaoEncontradoException","Atualizar apenas os atributos permitidos através de métodos de domínio da entidade","Confirmar a transação persistindo o novo estado no banco de dados","Devolver status 200 OK contendo os metadados atualizados do livro"], "Extrair ID, localizar entidade, atualizar campos autorizados, persistir e responder."),
          p("Associe os verbos e status HTTP aos cenários de manutenção de acervo:", [["PATCH /livros/{id}","Atualização parcial de dados específicos"],["PUT /livros/{id}","Substituição integral da representação do livro"],["404 Not Found","Livro não encontrado para o ID especificado"],["200 OK","Atualização executada com sucesso"]], "Tratar atualizações com precisão impede corrupção acidental de dados.")
        ]
      },
      {
        id: "java-c16-u3-l5-desativacao-logica-soft-delete",
        title: "Desativação lógica (soft delete) de livros do catálogo ativo",
        subtitle: "Rastreabilidade e integridade · Preservando integridade histórica sem apagar registros",
        theory: "Excluir permanentemente uma obra do banco violaria chaves estrangeiras de empréstimos antigos e apagaria relatórios históricos. Em aplicações profissionais de biblioteca, implementamos a exclusão lógica (soft delete) por meio de um atributo ativo=false, ocultando o livro das buscas sem destruir seu histórico.",
        questions: [
          q("Qual é o principal risco de executar exclusão física (DELETE FROM livros) em um acervo real?", "Violar chaves estrangeiras com empréstimos antigos ou destruir o histórico institucional", ["Fazer a placa-mãe do servidor queimar","Apagar a internet da biblioteca"], "Exclusão física destrói a trilha de auditoria e pode falhar por restrições de integridade referencial."),
          q("Como a desativação lógica (soft delete) é implementada no modelo de dados?", "Adicionando uma coluna booleana 'ativo' ou timestamp 'desativado_em' na tabela de livros", ["Mudando a fonte do título para itálico","Renomeando o autor para null"], "Uma coluna booleana ou data de desativação marca o registro como inativo para novas operações."),
          q("Como as consultas de busca devem se comportar após um livro ser desativado logicamente?", "Filtrar por padrão apenas livros onde ativo=true, ocultando itens baixados das buscas gerais", ["Continuar exibindo o livro normalmente","Exibir o livro com preço negativo"], "Buscas públicas só devem apresentar títulos disponíveis para circulação ativa."),
          q("Qual anotação do Hibernate pode filtrar automaticamente entidades com soft delete em todas as buscas?", "@SQLRestriction ou @Where", ["@SoftDeleteOnly","@HiddenEntity"], "@SQLRestriction(\"ativo = true\") aplica o predicado de filtro automaticamente no Hibernate."),
          t("Qual status HTTP expressa que uma exclusão foi processada com sucesso sem retornar corpo?", ["204 No Content","204"], "204 No Content é o retorno padrão para exclusões bem-sucedidas em REST."),
          g("Complete o método de domínio que executa a desativação lógica do livro:", ["ativo"], "Altera a flag booleana de controle para false.", "public void desativar() {\n    this.____ = false;\n}"),
          o("Ordene o processo de desativação lógica de uma obra na biblioteca:", ["Receber requisição DELETE /livros/{id} com o identificador do título","Verificar se o livro possui empréstimos ativos com exemplares ainda em posse de leitores","Se houver empréstimos em aberto, rejeitar a operação informando o impedimento","Se livre, alterar o atributo ativo para false e registrar o timestamp de baixa","Retornar status HTTP 204 No Content confirmando a desativação"], "Receber DELETE, verificar empréstimos abertos, rejeitar se em uso, marcar inativo e retornar 204."),
          p("Relacione as abordagens de exclusão às suas consequências arquiteturais:", [["Exclusão física (Hard Delete)","Remove os bytes do disco e quebra histórico"],["Exclusão lógica (Soft Delete)","Mantém auditoria e oculta o registro de buscas"],["204 No Content","Resposta limpa para exclusão sem corpo de retorno"],["Flag booleana ativo","Mecanismo simples para controlar disponibilidade"]], "Soft delete é a escolha padrão em sistemas com exigência de conformidade e auditoria.")
        ]
      }
    ],
    4: [
      {
        id: "java-c16-u4-l1-registrar-emprestimo-e-reserva-de-exemplar",
        title: "Operação de registrar empréstimo e reserva de exemplar disponível",
        subtitle: "Circulação de acervo · Vinculando associado a uma cópia física disponível",
        theory: "O registro de um empréstimo associa um usuário a um exemplar físico específico do livro solicitado. O serviço busca o primeiro exemplar disponível com status DISPONIVEL, altera seu estado para EMPRESTADO, calcula a data prevista de entrega de acordo com a categoria do leitor e grava o novo contrato no repositório.",
        questions: [
          q("O que o serviço de empréstimos deve fazer caso não existam exemplares com status DISPONIVEL?", "Lançar uma exceção de exemplar indisponível que resulte em 409 Conflict ou 422", ["Emprestar um exemplar de outro livro qualquer","Esperar 24 horas travando a requisição"], "Não havendo exemplares livres, a concessão deve ser rejeitada imediatamente."),
          q("Qual é o estado correto que o exemplar deve assumir assim que o empréstimo é consolidado?", "EMPRESTADO", ["DISPONIVEL","EXTRAVIADO"], "Mudar o status para EMPRESTADO garante que novas buscas não aloquem o mesmo exemplar físico."),
          q("Qual informação no contrato de empréstimo define a data limite em que o leitor deve devolver a obra?", "Data prevista de entrega (dataPrevistaDevolucao)", ["Data de fundação da biblioteca","Ano de nascimento do autor"], "A data prevista delimita o prazo contratual e serve de referência para cômputo de multas."),
          q("Qual código HTTP o endpoint POST /emprestimos deve emitir após registrar o empréstimo com êxito?", "201 Created", ["200 OK","302 Found"], "201 Created notifica que um novo recurso de contrato de empréstimo foi gerado no sistema."),
          t("Qual status identifica um exemplar físico pronto e liberado para ser emprestado a qualquer leitor?", ["DISPONIVEL","Disponivel"], "O status DISPONIVEL indica que o exemplar está nas estantes apto a circulação."),
          g("Complete a alteração de status do exemplar ao aprovar a saída da obra:", ["EMPRESTADO"], "Modifica o estado do exemplar para impedir empréstimos concorrentes.", "exemplar.setStatus(StatusExemplar.____);"),
          o("Ordene as etapas para registrar um novo empréstimo de exemplar:", ["Receber a requisição informando o ID do livro e o ID do associado","Validar a elegibilidade do leitor quanto a cotas e ausência de débitos","Localizar um exemplar do livro com status DISPONIVEL","Alterar o status do exemplar para EMPRESTADO e instanciar o Emprestimo com prazos","Salvar as alterações no banco de dados e devolver status 201 Created"], "Receber IDs, validar elegibilidade, localizar exemplar, mudar status e salvar."),
          p("Associe os estados do exemplar aos seus significados no sistema:", [["DISPONIVEL","Exemplar em estante pronto para retirada"],["EMPRESTADO","Exemplar atualmente em posse de um leitor"],["RESERVADO","Exemplar retido aguardando retirada prioritária"],["MANUTENCAO","Exemplar em reparo na encadernação"]], "Controlar o ciclo de vida do exemplar físico impede falhas na circulação do acervo.")
        ]
      },
      {
        id: "java-c16-u4-l2-transacao-atomica-transactional",
        title: "Transação atômica (@Transactional) debitando acervo e gerando recibo",
        subtitle: "Confiabilidade ACID · Garantindo que todas as etapas se completem ou nada seja salvo",
        theory: "A concessão de empréstimo exige atomicidade: se o exemplar tiver seu status alterado para EMPRESTADO, mas a gravação do registro falhar, o banco deve reverter tudo automaticamente. No Spring Boot, a anotação @Transactional em métodos de serviço assegura o princípio do 'tudo ou nada' das transações ACID.",
        questions: [
          q("O que aconteceria se a alteração do exemplar fosse comitada, mas a gravação do empréstimo falhasse sem transação?", "Inconsistência grave: o exemplar ficaria bloqueado sem nenhum empréstimo correspondente", ["O sistema iria imprimir o recibo em papel","O banco corrigiria o erro sozinho"], "Sem controle transacional, falhas parciais corrompem o estado consistente do banco de dados."),
          q("Qual propriedade ACID garante que todas as operações de uma transação sejam executadas ou todas revertidas?", "Atomicidade", ["Consistência","Durabilidade"], "Atomicidade estabelece a regra do 'tudo ou nada' em transações de banco de dados."),
          q("Qual anotação do Spring comanda a abertura, commit e rollback automático de transações?", "@Transactional", ["@TransactionalSpringOnly","@AtomicBlock"], "@Transactional instrui o Spring a gerenciar o ciclo de vida da transação através de proxies."),
          q("Por padrão, quais tipos de exceção disparam rollback automático em um método anotado com @Transactional?", "Exceções não checadas (RuntimeException e subclasses) e erros", ["Apenas exceções checadas declaradas no throws","Nenhuma exceção causa rollback"], "Por padrão, o Spring executa rollback para RuntimeException e Error, salvo configuração explícita."),
          t("Qual propriedade ACID assegura que uma transação finalizada com sucesso persista mesmo após queda de energia?", ["Durabilidade"], "Durabilidade garante a persistência indelével dos dados gravados em disco."),
          g("Complete a anotação de serviço que delimita a fronteira transacional da operação:", ["Transactional"], "Marca o método para execução atômica gerenciada pelo Spring.", "@____\npublic EmprestimoResponse realizarEmprestimo(NovoEmprestimoRequest request) { ... }"),
          o("Ordene a execução do mecanismo de proxy do Spring em um método @Transactional:", ["Cliente HTTP invoca o método do serviço através do proxy gerado pelo Spring","Proxy intercepta a chamada e inicia uma nova transação no EntityManager","Método de serviço executa operações de negócio e acessa repositórios","Se tudo correr bem, proxy comita a transação persistindo alterações","Se ocorrer RuntimeException, proxy aborta e executa rollback integral"], "Interceptar chamada, abrir transação, executar código, comitar se OK ou rollback em falha."),
          p("Relacione as siglas ACID às suas definições no contexto da biblioteca:", [["Atomicidade","Todas as alterações gravam juntas ou nada grava"],["Consistência","Invariantes de negócio são rigorosamente respeitados"],["Isolamento","Transações concorrentes não interferem entre si"],["Durabilidade","Empréstimo gravado permanece após reinício do servidor"]], "Propriedades ACID formam a fundação da engenharia de dados em aplicações críticas.")
        ]
      },
      {
        id: "java-c16-u4-l3-devolucao-de-livro-e-liberacao-de-exemplar",
        title: "Operação de devolução de livro e liberação imediata do exemplar",
        subtitle: "Conclusão de ciclo · Atualizando status, registrando multas e liberando itens",
        theory: "A operação de devolução encerra o ciclo do empréstimo. O serviço busca o empréstimo ativo, registra a data de entrega, calcula eventuais multas por atraso e atualiza o exemplar de volta para DISPONIVEL (ou RESERVADO se houver leitor na fila). O encerramento correto do empréstimo restaura a cota do associado.",
        questions: [
          q("O que deve ocorrer com o status do exemplar após uma devolução sem reservas ativas na fila?", "Retornar imediatamente ao status DISPONIVEL para novas consultas e retiradas", ["Ser excluído do catálogo da biblioteca","Permanecer como EMPRESTADO para sempre"], "Liberar o exemplar como DISPONIVEL reabastece as estantes da biblioteca."),
          q("O que deve acontecer se houver outro leitor aguardando em reserva ativa para a mesma obra?", "O exemplar transiciona para RESERVADO e o sistema notifica o leitor prioritário", ["O exemplar é vendido imediatamente","A reserva é cancelada sem aviso"], "Mudar para RESERVADO assegura prioridade ao próximo solicitante cadastrado na fila."),
          q("Qual status deve ser gravado no registro de Emprestimo para atestar que o livro retornou?", "CONCLUIDO (ou DEVOLVIDO)", ["ATIVO","CANCELADO"], "Marcar como CONCLUIDO formaliza que a custódia do livro foi devolvida à instituição."),
          q("O associado devolveu o livro com 5 dias de atraso. O que a operação de devolução deve fazer com o débito?", "Calcular a multa devida, gerar o registro de cobrança e informar o valor ao associado", ["Perdoar silenciosamente sem registrar nada","Recusar o recebimento do livro físico"], "Registrar a multa devida na devolução garante acerto de contas justo e documentado."),
          t("Qual status formal atesta que o exemplar devolvido foi devolvido com sucesso e não está mais com o leitor?", ["DEVOLVIDO","CONCLUIDO"], "DEVOLVIDO marca a conclusão do ciclo de empréstimo no histórico do sistema."),
          g("Complete a definição da data de devolução efetiva no objeto Emprestimo:", ["now"], "LocalDate.now() captura a data corrente civil do momento da entrega.", "emprestimo.setDataDevolucaoEfetiva(LocalDate.____());"),
          o("Ordene o processo de recebimento de uma devolução no balcão da biblioteca:", ["Localizar o empréstimo ativo através do código do exemplar devolvido","Registrar a data efetiva de entrega no contrato de empréstimo","Calcular dias de atraso e gerar pendência financeira caso haja multa","Verificar fila de reservas: se houver leitor, marcar RESERVADO; senão DISPONIVEL","Salvar alterações no banco e devolver comprovante com status 200 OK"], "Localizar contrato, registrar data, apurar multa, atualizar exemplar e responder."),
          p("Associe os resultados da devolução às ações correspondentes do sistema:", [["Sem atraso e sem reservas","Exemplar fica DISPONIVEL e cota do leitor é liberada"],["Com atraso e sem reservas","Gera multa financeira e exemplar fica DISPONIVEL"],["Com leitor na fila de reserva","Exemplar fica RESERVADO para o próximo leitor"],["Empréstimo já devolvido","Operação rejeitada com erro de empréstimo já baixado"]], "O fechamento de empréstimos integra estoque, cobrança e filas de espera.")
        ]
      },
      {
        id: "java-c16-u4-l4-historico-de-emprestimos-e-pendencias",
        title: "Histórico de empréstimos por usuário e consulta de pendências",
        subtitle: "Rastreabilidade e auditoria · Consultando empréstimos correntes e passados",
        theory: "O histórico de circulação permite aos associados e bibliotecários auditar obras já lidas, empréstimos ativos com prazos correntes e pendências financeiras de multas. Endpoints dedicados retornam listas paginadas e filtradas por status, garantindo visibilidade total sobre a situação cadastral do leitor na instituição.",
        questions: [
          q("Qual rota REST segue as melhores práticas para consultar os empréstimos de um usuário específico?", "GET /usuarios/{id}/emprestimos", ["GET /todosOsLivrosDoMundo","POST /consultarEmprestimo"], "Rotas aninhadas em REST representam recursos subordinados (empréstimos do usuário)."),
          q("Por que um usuário comum só deve ter permissão para visualizar o próprio histórico de empréstimos?", "Para garantir a privacidade individual de leitura e conformidade com leis de proteção de dados", ["Porque o banco de dados só aceita consultas de uma linha","Para forçar os leitores a irem pessoalmente ao balcão"], "Privacidade de leitura é um direito fundamental protegido por leis como LGPD/GDPR."),
          q("Como a API pode diferenciar os empréstimos que o leitor ainda está com o livro dos já devolvidos?", "Disponibilizando um filtro opcional por status na query string (?status=ATIVO)", ["Criando dois bancos de dados diferentes","Apagando os empréstimos concluídos"], "Filtros por status facilitam listar apenas livros atualmente em posse do associado."),
          q("Qual informação financeira é vital expor na consulta da situação cadastral do associado?", "O somatório total de multas pendentes de quitação e o detalhamento de cada uma", ["O saldo bancário da conta corrente pessoal do leitor","A renda familiar informada na matrícula"], "Apresentar o total de multas ativas permite ao leitor regularizar seus débitos com clareza."),
          t("Qual código HTTP representa a recuperação bem-sucedida do histórico de empréstimos?", ["200 OK","200"], "200 OK confirma o retorno dos dados solicitados no corpo da resposta."),
          g("Complete o método de repositório que busca empréstimos ativos filtrados por usuário:", ["findByUsuarioIdAndStatus"], "Spring Data deriva consulta por ID do usuário e status do empréstimo.", "List<Emprestimo> ____(Long usuarioId, StatusEmprestimo status);"),
          o("Ordene a jornada de uma consulta de pendências de um leitor na API:", ["Cliente envia requisição GET /usuarios/{id}/pendencias autenticado","Serviço fiscaliza se o solicitante possui autorização para ver o cadastro","Repositório busca empréstimos em atraso e multas não quitadas do usuário","Serviço totaliza os débitos e compõe o DTO PendenciasUsuarioResponse","Controlador retorna o resumo com status 200 OK"], "Autenticar, checar permissão, consultar atrasos e multas, compor DTO e responder."),
          p("Relacione os filtros de histórico aos objetivos de consulta do usuário:", [["?status=ATIVO","Exibe livros que o leitor precisa devolver"],["?status=DEVOLVIDO","Histórico de obras já devolvidas no passado"],["/pendencias","Relatório de livros em atraso e multas abertas"],["Pageable","Permite navegar por centenas de leituras antigas"]], "Consultas estruturadas conferem autonomia e transparência aos usuários da biblioteca.")
        ]
      },
      {
        id: "java-c16-u4-l5-concorrencia-otimista-version",
        title: "Concorrência otimista (@Version) para evitar empréstimo duplo de mesmo exemplar",
        subtitle: "Consistência concorrente · Impedindo que duas pessoas retirem a mesma cópia física",
        theory: "Em ambientes de alta concorrência, dois usuários podem tentar emprestar o mesmo exemplar simultaneamente. O bloqueio otimista via @Version adiciona um número de versão na tabela. Se duas transações lerem a mesma versão, a primeira a comitar atualiza o número, fazendo a segunda falhar com OptimisticLockException.",
        questions: [
          q("O que aconteceria se duas pessoas clicassem simultaneamente em emprestar o último exemplar sem controle de concorrência?", "Ambas poderiam ter o empréstimo aprovado, gerando um empréstimo duplo do mesmo livro físico", ["O servidor reiniciaria o sistema operacional","O livro físico seria clonado na prateleira"], "Condição de corrida provoca inconsistência onde o mesmo item físico aparece concedido a dois usuários."),
          q("Qual anotação do JPA ativa o mecanismo de bloqueio otimista automático em uma entidade?", "@Version", ["@OptimisticOnly","@LockConcurrency"], "@Version marca um atributo inteiro ou timestamp usado para detectar conflitos de atualização."),
          q("O que ocorre quando o Hibernate detecta que a versão do registro no banco mudou desde que a transação leu os dados?", "Lança OptimisticLockException abortando a segunda transação com segurança", ["Substitui os dados da primeira transação silenciosamente","Desliga a máquina virtual"], "OptimisticLockException avisa que os dados foram alterados por outra transação concorrente."),
          q("Como a camada de controle/serviço deve responder ao cliente quando ocorre um conflito de concorrência otimista?", "Retornar status 409 Conflict convidando o cliente a tentar novamente com outro exemplar", ["Retornar 500 sem mensagem clara","Forçar o empréstimo mesmo sem o livro"], "409 Conflict comunica que a operação falhou por concorrência de estado com outro usuário."),
          t("Qual anotação JPA marca o campo numérico de controle de versão para concorrência otimista?", ["@Version","Version"], "@Version habilita a verificação otimista no UPDATE relacional."),
          g("Complete a declaração do campo de versionamento na entidade Exemplar:", ["@Version","Version"], "@Version sinaliza ao JPA o controle automático de concorrência.", "@____\nprivate Long versao;"),
          o("Ordene o ciclo de detecção de conflito em concorrência otimista com @Version:", ["Transação A e Transação B leem o Exemplar com versão = 1 e status DISPONIVEL","Transação A altera status para EMPRESTADO e comita com sucesso, subindo a versão para 2","Transação B tenta comitar alteração de status enviando UPDATE onde versao = 1","Banco de dados reporta que nenhuma linha foi atualizada porque a versão agora é 2","JPA lança OptimisticLockException e serviço retorna 409 Conflict para o usuário B"], "Leitura simultânea v1, commit A v2, tentativa B v1, detecção de zero linhas e OptimisticLockException."),
          p("Associe os conceitos de concorrência às suas definições em JPA:", [["@Version","Atributo que rastreia mutações na linha do banco"],["Bloqueio Otimista","Assume conflito raro e valida versão no commit"],["OptimisticLockException","Exceção de colisão de versão concorrente"],["409 Conflict","Status HTTP retornado ao detectar colisão"]], "Concorrência otimista protege a integridade do acervo sem travar leituras concorrentes.")
        ]
      }
    ],
    5: [
      {
        id: "java-c16-u5-l1-bean-validation-declarativo",
        title: "Anotações Bean Validation (@NotNull, @NotBlank, @Size, @Positive)",
        subtitle: "Integridade de entrada · Validando contratos JSON antes da lógica de negócio",
        theory: "O Bean Validation (Jakarta Validation) permite declarar regras de integridade diretamente nos atributos dos DTOs com anotações padronizadas. Quando o método do controlador anota o parâmetro com @Valid, o Spring aciona o validador automaticamente, rejeitando payloads inválidos antes de invocar o serviço de domínio.",
        questions: [
          q("Qual anotação do Bean Validation rejeita valores nulos, vazios ou compostos exclusivamente por espaços em branco?", "@NotBlank", ["@NotNull","@NotEmpty"], "@NotBlank valida que o texto contenha ao menos um caractere não espaço."),
          q("Qual anotação garante que um valor numérico seja estritamente maior que zero?", "@Positive", ["@Min(0)","@NonZero"], "@Positive assegura que o número seja positivo (> 0), ideal para contagens de exemplares."),
          q("O que ocorre se o cliente enviar um JSON com título nulo em um DTO anotado com @NotBlank e @Valid?", "O Spring interrompe a requisição e dispara MethodArgumentNotValidException", ["O Spring salva null no banco de dados","O servidor desliga imediatamente"], "O framework intercepta a falha e dispara a exceção de validação de argumentos."),
          q("Qual anotação delimita o comprimento mínimo e máximo de uma cadeia de caracteres?", "@Size(min = 3, max = 100)", ["@LengthOfOnly","@RangeChars"], "@Size delimita limites inferior e superior para strings ou coleções."),
          t("Qual anotação deve acompanhar o @RequestBody no método do controlador para ativar a validação do DTO?", ["@Valid","Valid"], "@Valid dispara o mecanismo de validação declarativa do Bean Validation no Spring MVC."),
          g("Complete a restrição que exige que o ISBN possua exatamente 13 caracteres:", ["Size"], "@Size(min = 13, max = 13) restringe o tamanho exato da cadeia.", "@____(min = 13, max = 13, message = \"O ISBN deve conter exatamente 13 dígitos\")\nprivate String isbn;"),
          o("Ordene o fluxo de validação declarativa quando uma requisição chega ao controlador:", ["Cliente envia payload JSON na requisição POST /livros","Spring MVC faz o parse do JSON para a classe ou record do DTO","Mecanismo do Bean Validation avalia as restrições declaradas (@NotBlank, @Size)","Se houver violações, dispara MethodArgumentNotValidException interrompendo o fluxo","Se os dados forem válidos, o método do controlador é finalmente executado"], "Receber JSON, desserializar DTO, avaliar restrições, interromper se inválido ou executar método."),
          p("Associe as anotações do Bean Validation às suas restrições contratuais:", [["@NotNull","Impede valor null mas aceita string vazia"],["@NotBlank","Rejeita null, string vazia ou espaços em branco"],["@Positive","Exige número estritamente maior que zero"],["@Size(max=500)","Limita o tamanho máximo de caracteres"]], "Validar na fronteira HTTP protege o sistema contra dados corrompidos.")
        ]
      },
      {
        id: "java-c16-u5-l2-validacoes-customizadas-constraintvalidator",
        title: "Validações customizadas com ConstraintValidator e anotações próprias",
        subtitle: "Regras especializadas · Criando validadores sob medida para regras de negócio",
        theory: "Quando anotações padrão não cobrem regras específicas (como formato do ISBN-13 ou verificação de dígitos verificadores), criamos anotações customizadas implementando ConstraintValidator. O Spring injeta dependências no validador se necessário, unindo validação declarativa e lógica algorítmica especializada.",
        questions: [
          q("Qual interface do Jakarta Validation deve ser implementada para criar a lógica de uma anotação customizada?", "ConstraintValidator<A, T>", ["ValidatorCustom","ValidationRule"], "ConstraintValidator define o método isValid(T value, ConstraintValidatorContext context)."),
          q("Como uma anotação customizada é vinculada à sua classe de validação concreta?", "Através da metanotação @Constraint(validatedBy = ValidadorIsbn.class)", ["Por herança direta com extends","Através de arquivo texto .txt"], "@Constraint vincula a anotação à implementação responsável por avaliá-la."),
          q("Qual parâmetro do método isValid permite adicionar mensagens dinâmicas de erro de validação?", "ConstraintValidatorContext", ["HttpServletRequest","EntityManager"], "ConstraintValidatorContext permite desativar a mensagem padrão e construir mensagens parametrizadas."),
          q("Um validador customizado gerenciado pelo Spring pode injetar outros beans e serviços?", "Sim, o Spring Boot gerencia o ciclo de vida do validador permitindo injeção de dependências", ["Não, validadores só aceitam código estático","Apenas se estiver sem anotações"], "Validadores integrados ao Spring participam da injeção de dependências normalmente."),
          t("Qual anotação de meta-nível associa uma anotação customizada à classe ConstraintValidator?", ["@Constraint","Constraint"], "@Constraint declara a classe que executa a lógica de checagem da anotação."),
          g("Complete a assinatura da classe que valida o formato customizado de ISBN:", ["ConstraintValidator"], "ConstraintValidator conecta a anotação à checagem de lógica.", "public class IsbnValidator implements ____<IsbnValido, String> {\n    public boolean isValid(String valor, ConstraintValidatorContext ctx) { ... }\n}"),
          o("Ordene os passos para criar uma validação declarativa customizada em Java:", ["Declarar a interface de anotação com @Target e @Retention RUNTIME","Anotar a interface com @Constraint(validatedBy = MeuValidator.class)","Implementar ConstraintValidator sobrescrevendo o método isValid","Aplicar a nova anotação customizada nos atributos dos DTOs que exigem a checagem"], "Criar anotação, vincular com @Constraint, implementar isValid e usar nos DTOs."),
          p("Relacione os componentes de uma validação customizada às suas funções:", [["@Target(FIELD)","Indica que a anotação pode ser usada em atributos"],["@Retention(RUNTIME)","Mantém a anotação acessível em tempo de execução"],["isValid(...)","Método que devolve true se a restrição for satisfeita"],["ConstraintValidatorContext","Permite customizar mensagens e templates de erro"]], "Anotações customizadas tornam o código expressivo e evitam repetição de regras.")
        ]
      },
      {
        id: "java-c16-u5-l3-tratamento-de-erros-no-controlador",
        title: "Tratamento de MethodArgumentNotValidException no controlador",
        subtitle: "Respostas elegantes · Capturando exceções e extraindo mensagens úteis de validação",
        theory: "Quando o Bean Validation rejeita uma requisição, o Spring MVC lança MethodArgumentNotValidException. Capturar essa exceção em uma classe anotada com @RestControllerAdvice permite interceptar o erro globalmente, extrair os nomes dos campos inválidos com suas mensagens e responder com status 400 Bad Request limpo.",
        questions: [
          q("Qual anotação do Spring declara um interceptador global de exceções para todos os controladores REST?", "@RestControllerAdvice", ["@GlobalError","@ExceptionWatcher"], "@RestControllerAdvice centraliza o tratamento de exceções de toda a camada web."),
          q("Qual anotação marca um método específico dentro do advice para tratar determinada classe de exceção?", "@ExceptionHandler", ["@CatchException","@InterceptError"], "@ExceptionHandler(MethodArgumentNotValidException.class) direciona a exceção ao handler."),
          q("Como obter a lista de campos que violaram as regras a partir de MethodArgumentNotValidException?", "Invocando ex.getBindingResult().getFieldErrors()", ["Lendo o arquivo de log do disco","Lendo a URL da requisição"], "getFieldErrors() lista cada atributo com seu respectivo erro de validação associado."),
          q("Qual status HTTP é o padrão universal para comunicar dados de entrada sintaticamente ou semanticamente inválidos?", "400 Bad Request", ["500 Internal Server Error","200 OK"], "400 Bad Request sinaliza que o cliente enviou uma requisição com parâmetros incorretos."),
          t("Qual anotação centraliza o tratamento global de exceções para endpoints REST (inclua @)?", ["@RestControllerAdvice","RestControllerAdvice"], "@RestControllerAdvice combina @ControllerAdvice e @ResponseBody."),
          g("Complete a captura da exceção de validação de argumentos no handler global:", ["ExceptionHandler"], "Associa o método à captura da exceção disparada pelo Bean Validation.", "@____(MethodArgumentNotValidException.class)\npublic ResponseEntity<Object> tratarValidacao(MethodArgumentNotValidException ex) { ... }"),
          o("Ordene o tratamento de um payload inválido pelo interceptador global:", ["Spring dispara MethodArgumentNotValidException após reprovação do Bean Validation","@RestControllerAdvice intercepta a chamada através do método com @ExceptionHandler","Handler itera sobre os FieldErrors extraindo o nome do campo e a mensagem de erro","Estrutura um corpo de resposta padronizado contendo a lista dos erros encontrados","Devolve ResponseEntity com status HTTP 400 Bad Request e o JSON explicativo"], "Disparo da exceção, interceptação pelo advice, extração de erros, montagem do JSON e resposta 400."),
          p("Associe os elementos de tratamento de erros no Spring às suas funções:", [["@RestControllerAdvice","Centralizador global de tratamento de erros REST"],["@ExceptionHandler","Define o método que trata uma exceção específica"],["FieldError","Contém o nome do campo com falha e a mensagem de validação"],["400 Bad Request","Status de resposta para requisições com dados inválidos"]], "Erros bem estruturados facilitam a integração dos desenvolvedores clientes.")
        ]
      },
      {
        id: "java-c16-u5-l4-respostas-padronizadas-problemdetail-rfc7807",
        title: "Respostas de erro padronizadas RFC 7807 (ProblemDetail)",
        subtitle: "Padrões enterprise · Adotando a especificação RFC 7807 na API Spring Boot",
        theory: "O Spring Boot oferece suporte nativo à especificação RFC 7807 por meio da classe ProblemDetail. Esse padrão define formato universal para respostas de erro HTTP, com atributos padronizados como status, title, detail, instance e type, além de permitir propriedades customizadas para elencar erros específicos por campo.",
        questions: [
          q("Qual especificação da IETF padroniza a representação JSON de detalhes de erros em APIs HTTP?", "RFC 7807 (Problem Details for HTTP APIs)", ["RFC 2616","RFC 9999"], "RFC 7807 estabelece um formato consistente para respostas de falhas na web."),
          q("Qual classe introduzida no Spring Framework 6 encapsula a estrutura da RFC 7807 nativamente?", "ProblemDetail", ["ErrorResponseDTO","ApiFault"], "ProblemDetail oferece fábrica estática e atributos em total conformidade com a RFC 7807."),
          q("Qual campo da RFC 7807 descreve a explicação textual legível específica daquela ocorrência de erro?", "detail", ["title","status"], "detail traz a descrição humana do motivo específico da falha naquela requisição."),
          q("Como adicionar uma lista de campos com falha de validação a um objeto ProblemDetail?", "Utilizando o método problemDetail.setProperty(\"erros\", listaDeErros)", ["Alterando o cabeçalho Content-Type","Não é permitido adicionar campos"], "setProperty permite estender o payload com campos customizados úteis para o cliente."),
          t("Qual classe nativa do Spring implementa a estrutura de erro Problem Details da RFC 7807?", ["ProblemDetail"], "ProblemDetail é o modelo padrão de representação de erros no Spring moderno."),
          g("Complete a criação de um ProblemDetail com status 404 e mensagem explicativa:", ["forStatusAndDetail"], "Método de conveniência instancia o ProblemDetail padronizado.", "ProblemDetail problem = ProblemDetail.____(HttpStatus.NOT_FOUND, \"Livro não encontrado\");"),
          o("Ordene a montagem de uma resposta de erro estruturada com ProblemDetail:", ["Identificar a exceção e mapear para o código de status HTTP correspondente","Instanciar ProblemDetail.forStatusAndDetail com o status e a mensagem resumida","Definir a URI de instance indicando a rota onde a falha ocorreu","Adicionar propriedades adicionais como timestamp e lista de campos violados","Retornar o ProblemDetail encapsulado no corpo da resposta HTTP"], "Mapear status, instanciar ProblemDetail, definir URI/instância, enriquecer e responder."),
          p("Relacione as propriedades da RFC 7807 aos seus papéis na resposta de erro:", [["status","Código de status HTTP numérico (ex: 404, 400)"],["title","Resumo curto e legível do tipo do problema"],["detail","Explicação detalhada e contextual da falha ocorrida"],["instance","URI relativa que identifica o recurso onde ocorreu a falha"]], "Padronizar erros com RFC 7807 eleva a maturidade arquitetural da API.")
        ]
      },
      {
        id: "java-c16-u5-l5-validacao-defensiva-no-servico",
        title: "Validação defensiva de regras complexas na camada de serviço",
        subtitle: "Regras de negócio · Verificando pré-condições que dependem do banco de dados",
        theory: "Nem todas as regras podem ser validadas por anotações estáticas nos DTOs: checagens que exigem consultas ao banco (como limites de livros, ausência de multas e disponibilidade física) devem residir na camada de serviço. Validar defensivamente essas pré-condições impede operações inválidas de prosseguirem no fluxo.",
        questions: [
          q("Por que validações como 'usuário não pode ter mais de 3 livros ativos' não devem ficar em anotações de DTO?", "Porque dependem do estado atual do banco de dados e devem ser avaliadas transacionalmente pelo serviço", ["Porque o Java não aceita anotações em DTOs","Porque DTOs rodam somente no frontend"], "Regras que consultam dados dinâmicos do banco pertencem à camada de serviço."),
          q("Qual é a conduta recomendada quando uma pré-condição de negócio é violada no serviço?", "Lançar uma exceção de negócio específica (ex: LimiteEmprestimosExcedidoException)", ["Imprimir um print no terminal e continuar","Retornar false sem explicar o motivo"], "Exceções específicas comunicam a falha com precisão e ativam rollbacks automáticos."),
          q("Como organizar o código do método de serviço para máxima legibilidade e segurança?", "Aplicando o padrão Guard Clauses (cláusulas de guarda) no início do método", ["Colocando toda a lógica em um único bloco try-catch gigante","Usando múltiplos ifs aninhados com 10 níveis"], "Cláusulas de guarda validam e falham rápido no topo, mantendo o caminho feliz limpo e direto."),
          q("Se a validação defensiva do serviço falhar, as operações anteriores da transação são gravadas?", "Não, a exceção não checada aciona rollback automático de tudo na transação", ["Sim, o banco grava metade dos dados","Apenas se o servidor for reiniciado"], "Rollback automático assegura que nenhuma mutação parcial seja salva em caso de falha."),
          t("Qual padrão de código valida condições e falha rápido no início do método antes da lógica principal?", ["Guard Clauses","Guarda","Guard clause"], "Guard Clauses limpam o código eliminando aninhamento excessivo de ifs."),
          g("Complete a cláusula de guarda que valida se o associado possui pendências financeiras:", ["temPendenciasFinanceiras"], "Impede avanço do fluxo caso haja débitos abertos.", "if (usuarioService.____(usuarioId)) throw new UsuarioComPendenciaException();"),
          o("Ordene a aplicação de cláusulas de guarda em um método de concessão de empréstimo:", ["Verificar se o associado possui pendências financeiras e barrar se houver","Verificar se a cota de empréstimos ativos da categoria já foi atingida","Verificar se o livro possui ao menos um exemplar com status DISPONIVEL","Com todas as pré-condições atendidas, prosseguir para a efetivação do empréstimo"], "Checar débitos, checar cota, checar exemplar livre e prosseguir."),
          p("Associe os tipos de validação às suas camadas adequadas:", [["Bean Validation no DTO","Valida formato, nulidade e limites de tamanho"],["Validação no Serviço","Verifica estado do banco, cotas e regras de negócio"],["Constraint no Banco (FK/Unique)","Última linha de defesa garantindo integridade referencial"],["Filtro na Web","Fiscaliza autenticação e formato básico do cabeçalho"]], "A estratégia de defesa em profundidade protege o sistema em todos os níveis.")
        ]
      }
    ],
    6: [
      {
        id: "java-c16-u6-l1-repositorios-spring-data-jparepository",
        title: "Repositórios Spring Data com JpaRepository e métodos de consulta",
        subtitle: "Persistência ágil · Interfaces poderosas com operações CRUD e paginação embutidas",
        theory: "Com Spring Data JPA, declaramos interfaces que estendem JpaRepository<Entidade, ID> para obter automaticamente operações de salvar, buscar por ID, listar com paginação e excluir. Além disso, criamos consultas derivadas simplesmente seguindo convenções de nomenclatura de métodos (query methods) sem escrever SQL manual.",
        questions: [
          q("Qual interface do Spring Data JPA fornece métodos CRUD, ordenação e paginação para uma entidade?", "JpaRepository", ["CrudBasic","SqlHelper"], "JpaRepository herda PagingAndSortingRepository e CrudRepository com recursos adicionais."),
          q("Como o Spring Data JPA gera consultas quando nomeamos um método como findByIsbn(String isbn)?", "Analisa o nome do método e sintetiza a consulta JPQL correspondente em tempo de inicialização", ["Executa um script Python externo","Procura um arquivo texto com o mesmo nome"], "O interpretador de query methods deriva a consulta inspecionando as palavras-chave do nome."),
          q("Qual método de JpaRepository é utilizado tanto para inserir quanto para atualizar uma entidade?", "save(entidade)", ["insert(entidade)","update(entidade)"], "save() persiste novas entidades ou executa merge caso a entidade já possua identificador."),
          q("Qual tipo de retorno o método findById(id) utiliza para lidar com a possível ausência do registro?", "Optional<T>", ["List<T>","T diretamente arriscando NullPointerException"], "Optional<T> obriga o chamador a tratar explicitamente a existência ou ausência do registro."),
          t("Qual interface base do Spring Data JPA combina operações de persistência e paginação?", ["JpaRepository"], "JpaRepository é a interface central para repositórios de entidades no ecossistema Spring."),
          g("Complete a declaração da interface do repositório de livros com chave primária Long:", ["JpaRepository"], "Estende JpaRepository com o tipo da entidade e o tipo da chave primária.", "public interface LivroRepository extends ____<Livro, Long> { ... }"),
          o("Ordene a criação e uso de um repositório no Spring Data JPA:", ["Declarar a interface estendendo JpaRepository<Livro, Long>","Adicionar métodos derivados de consulta conforme a necessidade do domínio","Injetar o repositório na camada de serviço via injeção por construtor","Invocar métodos como findById, save e findAll nas operações de negócio"], "Declarar interface, definir query methods, injetar no serviço e executar operações."),
          p("Relacione os métodos de JpaRepository às suas ações:", [["save(entidade)","Grava ou atualiza a entidade no banco de dados"],["findById(id)","Recupera a entidade encapsulada em Optional"],["findAll(pageable)","Retorna página de registros com metadados"],["deleteById(id)","Exclui a entidade pelo seu identificador primário"]], "JpaRepository elimina toneladas de código boilerplate de acesso a dados.")
        ]
      },
      {
        id: "java-c16-u6-l2-consultas-customizadas-com-query-jpql",
        title: "Consultas customizadas com @Query (JPQL e SQL nativo)",
        subtitle: "Consultas avançadas · Expressando operações complexas com JPQL seguro e tipado",
        theory: "Para consultas complexas com agregações, filtros dinâmicos e projeções, usamos a anotação @Query com JPQL (Java Persistence Query Language). O JPQL opera sobre classes e atributos do modelo Java em vez de nomes de tabelas SQL, mantendo a portabilidade entre bancos de dados e evitando riscos de injeção de SQL.",
        questions: [
          q("Sobre o que opera a linguagem de consulta JPQL utilizada em anotações @Query?", "Sobre as entidades e atributos do modelo orientado a objetos Java", ["Sobre as tabelas e colunas físicas do banco diretamente","Sobre arquivos binários do sistema operacional"], "JPQL consulta a camada conceitual de entidades (ex: 'SELECT l FROM Livro l'), não tabelas físicas."),
          q("Como passamos parâmetros de forma segura para dentro de uma consulta declarada com @Query?", "Utilizando parâmetros nomeados com a anotação @Param (ex: :isbn)", ["Concatenando as variáveis na string com o operador +","Escrevendo o valor fixo no texto"], "Parâmetros nomeados (:param) garantem parametrização automática contra injeção de SQL."),
          q("Como forçar o Spring Data JPA a executar uma consulta SQL nativa específica do banco de dados?", "Configurando o atributo nativeQuery = true na anotação @Query", ["Mudando a extensão do arquivo para .sql","Desativando o Hibernate"], "nativeQuery = true instrui o Spring a repassar a consulta crua diretamente ao banco de dados."),
          q("Qual cláusula do JPQL permite carregar associações LAZY de forma ansiosa em uma única consulta otimizada?", "JOIN FETCH", ["LAZY NOW","FORCE EAGER"], "JOIN FETCH carrega relacionamentos em um único SELECT, solucionando o problema N+1."),
          t("Qual anotação vincula um parâmetro do método Java a uma variável nomeada na query JPQL?", ["@Param","Param"], "@Param(\"titulo\") vincula o parâmetro do método à variável :titulo da consulta."),
          g("Complete a anotação @Query com parâmetro nomeado para busca de exemplares disponíveis:", ["Param"], "Liga o parâmetro do método à variável referenciada no JPQL.", "@Query(\"SELECT e FROM Exemplar e WHERE e.livro.id = :livroId AND e.status = 'DISPONIVEL'\")\nList<Exemplar> buscarDisponiveis(@____(\"livroId\") Long livroId);"),
          o("Ordene a estrutura de uma consulta customizada segura com @Query e JPQL:", ["Anotar o método com @Query contendo a expressão JPQL parametrizada","Referenciar entidades pelo nome Java e utilizar parâmetros nomeados com :nome","Anotar cada argumento do método com @Param correspondente ao parâmetro","Definir o tipo de retorno adequado como List, Optional ou Page","Testar a consulta com um teste de integração de repositório"], "Anotar @Query, usar JPQL/parâmetros, anotar com @Param, definir retorno e testar."),
          p("Associe as diretivas e cláusulas de consulta avançada aos seus papéis:", [["JPQL","Linguagem orientada a objetos independente do banco SQL"],["nativeQuery = true","Permite usar recursos e dialetos proprietários do banco"],["@Param(\"nome\")","Mapeia argumento seguro prevenindo SQL Injection"],["JOIN FETCH","Carrega entidades associadas em um único SELECT"]], "Dominar @Query viabiliza consultas eficientes e seguras em projetos corporativos.")
        ]
      },
      {
        id: "java-c16-u6-l3-paginacao-e-ordenacao-no-spring-data",
        title: "Paginação, ordenação e contagem otimizada no banco relacional",
        subtitle: "Desempenho de leitura · Otimizando queries com contagens inteligentes e paginação",
        theory: "Ao executar buscas paginadas com Pageable, o Spring Data JPA executa duas consultas: uma para recuperar os dados da página atual e outra (SELECT count) para calcular o total de registros. Para grandes volumes de dados, o uso de Slice ou consultas count customizadas evita degradação de performance no banco.",
        questions: [
          q("Por que o Spring Data JPA executa duas consultas quando um método devolve Page<T>?", "Uma consulta recupera os itens da página corrente e a outra conta o total de registros para paginação", ["Uma consulta busca no banco e a outra no Google","Uma consulta verifica se o servidor está online"], "Calcular totalPages e totalElements exige um SELECT count(*) sobre a mesma base de dados."),
          q("Qual interface de retorno do Spring Data pode ser usada para paginação sem executar o SELECT count total?", "Slice<T>", ["Chunk<T>","Partial<T>"], "Slice<T> verifica apenas se existe um próximo item (limit + 1), ideal para scroll infinito sem count."),
          q("Como passar múltiplos critérios de ordenação dinâmicos através da interface Sort?", "Combinando chamadas como Sort.by(\"autor\").ascending().and(Sort.by(\"titulo\").descending())", ["Escrevendo um loop while com comparações","Criando um banco de dados para cada ordem"], "Sort permite encadear múltiplos campos e direções de ordenação tipadas."),
          q("O que acontece quando o número da página solicitado no Pageable ultrapassa a quantidade de páginas existentes?", "Retorna uma página vazia válida sem registros e sem disparar erro", ["O banco de dados apaga a tabela","O servidor reinicia"], "Spring Data retorna Page vazia (content = []), permitindo que a UI apresente tela de sem resultados."),
          t("Qual interface de retorno do Spring Data é ideal para paginação infinita sem custo de contagem total?", ["Slice"], "Slice economiza a execução do SELECT count, otimizando consultas em tabelas com milhões de linhas."),
          g("Complete a criação de uma ordenação composta por autor ascendente e ano descendente:", ["and"], "Combina múltiplos critérios de ordenação no objeto Sort.", "Sort ordenacao = Sort.by(\"autor\").ascending().____(Sort.by(\"anoPublicacao\").descending());"),
          o("Ordene o processamento de uma consulta paginada com contagem pelo Spring Data:", ["Cliente solicita página 2 com tamanho 10 e ordenação por título","Spring Data gera consulta SQL com ORDER BY titulo ASC LIMIT 10 OFFSET 20","Spring Data gera consulta paralela ou subsequente de SELECT count(*)","Resultados são encapsulados em uma implementação de Page<T> com metadados","Controlador devolve o objeto com a lista e contadores para o cliente"], "Requisição da página, execução do LIMIT/OFFSET, execução do COUNT, encapsulamento e resposta."),
          p("Relacione os tipos de retorno paginado aos seus cenários de uso:", [["Page<T>","Listagem clássica com navegação por números de página"],["Slice<T>","Scroll infinito onde basta saber se existe próxima página"],["Sort","Ordenação dinâmica por um ou mais atributos"],["Pageable","Encapsula página, tamanho e ordenação na mesma chamada"]], "Escolher entre Page e Slice equilibra precisão na interface e desempenho no banco.")
        ]
      },
      {
        id: "java-c16-u6-l4-relacionamentos-e-prevencao-n-mais-um",
        title: "Estratégias de relacionamento e prevenção do problema N+1 com JOIN FETCH",
        subtitle: "Otimização de ORM · Eliminando consultas excessivas em associações LAZY",
        theory: "O problema N+1 ocorre quando o JPA executa 1 consulta para listar N livros e depois dispara N consultas adicionais para buscar o autor ou exemplares de cada um. A solução padrão no Spring Data é usar consultas com JOIN FETCH ou anotações @EntityGraph, carregando as associações necessárias em um único comando SQL.",
        questions: [
          q("O que caracteriza o problema de desempenho conhecido como 'N+1 queries' no JPA?", "Executar 1 consulta inicial para N registros e depois disparar N consultas adicionais para carregar relacionamentos", ["Ter N servidores e apenas 1 banco de dados","Escrever N linhas de código para 1 teste"], "N+1 sobrecarrega o banco de dados com centenas de viagens de rede (round-trips) repetitivas."),
          q("Como a cláusula JOIN FETCH resolve o problema N+1 em consultas JPQL?", "Realiza um JOIN SQL que traz a entidade principal e seus relacionamentos juntos em uma única consulta", ["Desativa o Hibernate e usa arquivos de texto","Apaga os relacionamentos do banco"], "JOIN FETCH instrui o mecanismo JPA a hidratar os relacionamentos na mesma consulta inicial."),
          q("Qual anotação do Spring Data JPA permite configurar carregamento antecipado de atributos sem escrever JPQL manual?", "@EntityGraph", ["@FetchAllNow","@BatchSelect"], "@EntityGraph(attributePaths = {\"exemplares\"}) configura os atributos a serem trazidos na busca."),
          q("Por que configurar relacionamentos como EAGER por padrão em @ManyToOne ou @OneToMany é considerado um antipadrão?", "Porque força o carregamento de associações em todas as consultas do sistema, mesmo quando desnecessárias", ["Porque o compilador Java rejeita a palavra EAGER","Porque o banco de dados desliga o log"], "EAGER global causa perda de controle sobre quais dados são transferidos da rede em cada operação."),
          t("Qual cláusula do JPQL une tabelas e hidrata relacionamentos em um único SELECT (duas palavras)?", ["JOIN FETCH","join fetch"], "JOIN FETCH força o carregamento imediato das associações na consulta especificada."),
          g("Complete a query JPQL que previne N+1 carregando livros com seus respectivos exemplares:", ["JOIN FETCH"], "Realiza a junção antecipada das entidades associadas.", "@Query(\"SELECT l FROM Livro l ____ l.exemplares\")\nList<Livro> buscarTodosComExemplares();"),
          o("Ordene o diagnóstico e resolução do problema N+1 em uma listagem de livros:", ["Identificar no log SQL de desenvolvimento dezenas de SELECTs disparados em sequência","Constatar que cada consulta subsequente busca dados de um relacionamento LAZY acessado","Substituir a consulta simples por método com @Query e JOIN FETCH ou @EntityGraph","Executar a listagem novamente e verificar no log a emissão de apenas 1 consulta unificada"], "Identificar consultas repetitivas, diagnosticar causa LAZY, aplicar JOIN FETCH e conferir redução."),
          p("Associe os termos de carregamento do JPA às suas características:", [["Problema N+1","Degradação de performance por excesso de consultas secundárias"],["JOIN FETCH","Junção JPQL que hidrata relacionamentos na mesma query"],["@EntityGraph","Configuração declarativa de atributos carregados juntos"],["FetchType.LAZY","Carregamento sob demanda que deve ser padrão nas associações"]], "Eliminar o problema N+1 é competência fundamental de engenharia em projetos Spring.")
        ]
      },
      {
        id: "java-c16-u6-l5-migracoes-de-esquema-com-flyway",
        title: "Migrações de esquema versionadas com Flyway no Spring Boot",
        subtitle: "Evolução do banco de dados · Controlando versões de DDL com scripts auditáveis",
        theory: "Permitir que o Hibernate crie tabelas (ddl-auto=update) em produção é arriscado. O Flyway gerencia migrações versionadas via scripts SQL (V1__criar_tabelas.sql) executados em ordem estrita na inicialização do Spring Boot, registrando o histórico na tabela flyway_schema_history com checksum e data para auditoria.",
        questions: [
          q("Por que a propriedade spring.jpa.hibernate.ddl-auto=update jamais deve ser utilizada em produção?", "Porque pode alterar ou corromper o esquema sem controle de versão, histórico auditável ou possibilidade de rollback", ["Porque o Spring Boot não inicializa com essa propriedade","Porque bancos relacionais proíbem DDL"], "Atualizações automáticas do ORM são imprevisíveis e podem destruir dados em produção."),
          q("Como o Flyway nomeia seus scripts de migração versionados por convenção padrão?", "V{versao}__{descricao}.sql com dois underscores separando versão e nome", ["script.sql apenas","migracao.txt"], "A convenção V1__criar_tabelas.sql permite ao Flyway ordenar a aplicação dos scripts."),
          q("O que ocorre se alguém alterar o conteúdo de um script de migração do Flyway que já foi aplicado anteriormente?", "O Flyway detecta divergência de checksum na inicialização e interrompe o boot da aplicação com erro", ["O Flyway apaga o banco e recomeça do zero","O Flyway ignora a alteração silenciosamente"], "Validação de checksum impede que scripts já executados sejam modificados retroativamente."),
          q("Qual tabela interna do banco de dados o Flyway utiliza para registrar quais migrações já foram aplicadas?", "flyway_schema_history", ["migration_log","schema_table"], "flyway_schema_history guarda versão, descrição, tipo, checksum e data de cada migração executada."),
          t("Qual prefixo em maiúscula inicia o nome de arquivos de migração versionados do Flyway?", ["V"], "Arquivos versionados começam com 'V', seguidos do número e dois underscores (ex: V1__)."),
          g("Complete o nome do script Flyway para criar a tabela de empréstimos na versão 2:", ["__"], "Dois underscores separam a versão da descrição da migração.", "V2____criar_tabela_emprestimos.sql"),
          o("Ordene o fluxo de execução do Flyway ao iniciar a aplicação Spring Boot:", ["Spring Boot inicializa a fonte de dados (DataSource) configurada","Flyway verifica ou cria a tabela de controle flyway_schema_history","Lê os scripts SQL na pasta db/migration e calcula os checksums","Aplica em ordem crescente as migrações que ainda não foram executadas","Registra o sucesso de cada script na tabela de histórico e libera o boot"], "Iniciar DataSource, checar tabela de histórico, ler scripts, executar pendentes e registrar histórico."),
          p("Relacione os elementos do Flyway às suas responsabilidades:", [["db/migration","Diretório padrão de localização dos scripts SQL"],["flyway_schema_history","Tabela que guarda o histórico de migrações aplicadas"],["Checksum","Hash que garante integridade contra edições posteriores"],["ddl-auto=validate","Valida se o modelo JPA bate com o esquema criado pelo Flyway"]], "Gerenciar migrações com Flyway garante deploys de banco reproduzíveis e seguros.")
        ]
      }
    ],
    7: [
      {
        id: "java-c16-u7-l1-testes-unitarios-junit5-mockito",
        title: "Testes de unidade de serviços de domínio com JUnit 5 e Mockito",
        subtitle: "Qualidade de software · Testando regras de biblioteca de forma rápida e isolada",
        theory: "Testes unitários validam a lógica dos serviços de domínio sem depender de banco de dados ou servidor web ativo. Com JUnit 5 (@Test) e Mockito (@Mock, @InjectMocks, when().thenReturn()), simulamos respostas de repositórios, verificamos regras de limites e multas e comprovamos que exceções são lançadas corretamente.",
        questions: [
          q("Qual é a principal vantagem de testes unitários com Mockito sobre testes com banco de dados real?", "Execução extremamente rápida em milissegundos e isolamento completo da lógica de regras", ["Permitem testar se o cabo de rede está conectado","Garantem que o CSS da página está bonito"], "Testes unitários isolam dependências externas, rodando centenas de cenários em segundos."),
          q("Qual anotação do Mockito injeta os mocks simulados dentro da instância do serviço que será testado?", "@InjectMocks", ["@AutowiredMock","@ServiceInject"], "@InjectMocks instancia a classe de teste e preenche seus atributos com os @Mock declarados."),
          q("Qual método do Mockito simula o comportamento de um repositório retornando um valor pré-determinado?", "when(mock.metodo()).thenReturn(valor)", ["mock.returnValue(valor)","simulate(mock)"], "when(...).thenReturn(...) define o dublê de teste programado para a chamada."),
          q("Qual método de asserção do JUnit 5 comprova que determinada exceção de negócio foi lançada?", "assertThrows(TipoExcecao.class, () -> servico.metodo())", ["assertException()","checkError()"], "assertThrows captura a exceção e permite inspecionar detalhes e mensagens da falha."),
          t("Qual anotação do JUnit 5 identifica um método como um caso de teste executável?", ["@Test","Test"], "@Test marca o método para execução pela engine do JUnit 5."),
          g("Complete a verificação do Mockito que comprova que o método salvar do repositório foi chamado exatamente 1 vez:", ["verify"], "verify() confere interações com os objetos simulados (mocks).", "____(livroRepository, times(1)).save(any(Livro.class));"),
          o("Ordene a estrutura canônica de um teste de unidade com o padrão Arrange-Act-Assert (AAA):", ["Configurar o cenário simulando respostas de repositórios com when/thenReturn (Arrange)","Executar a chamada do método de serviço que está sendo testado (Act)","Verificar o retorno obtido usando asserções como assertEquals ou assertNotNull (Assert)","Verificar se métodos essenciais do repositório foram chamados com verify (Assert)"], "Preparar mocks (Arrange), executar ação (Act) e verificar resultados/interações (Assert)."),
          p("Associe as anotações e utilitários de teste aos seus papéis:", [["@Test","Marca método executável no JUnit 5"],["@Mock","Cria dublê simulado de dependência com Mockito"],["@InjectMocks","Injeta os mocks na classe que está sob teste"],["assertThrows","Assegura que uma regra de negócio rejeita operação com exceção"]], "Testes unitários sólidos sustentam refatorações com confiança e velocidade.")
        ]
      },
      {
        id: "java-c16-u7-l2-testes-fatiados-webmvctest-mockmvc",
        title: "Testes de controladores REST fatiados com @WebMvcTest e MockMvc",
        subtitle: "Testes de camada web · Validando rotas, validações e status sem subir a aplicação toda",
        theory: "O teste fatiado com @WebMvcTest carrega apenas a camada web do Spring (controladores, serialização JSON e validações), deixando de fora banco e serviços pesados. Utilizamos MockMvc para simular requisições HTTP reais, testando se status 200, 201 ou 400 são devolvidos com cabeçalhos e payloads adequados.",
        questions: [
          q("Por que usar @WebMvcTest em vez de @SpringBootTest para testar a camada de controladores?", "Porque é muito mais rápido, carregando apenas os componentes web sem inicializar banco ou serviços pesados", ["Porque @SpringBootTest proíbe requisições HTTP","Porque controladores só funcionam com @WebMvcTest"], "@WebMvcTest faz o slicing (fatiamento) da aplicação, instanciando somente a infraestrutura web."),
          q("Qual classe do Spring Test é utilizada para disparar requisições simuladas contra o controlador?", "MockMvc", ["HttpClientMock","WebTestRunner"], "MockMvc simula a entrada de requisições HTTP no dispatcher servlet sem abrir porta TCP real."),
          q("Qual anotação do Spring Boot substitui um bean de serviço por um mock do Mockito no contexto de teste?", "@MockBean", ["@FakeBean","@ServiceReplacement"], "@MockBean registra um mock gerenciado no ApplicationContext do Spring Test."),
          q("Qual método de MockMvc builders prepara uma requisição HTTP POST com corpo JSON?", "MockMvcRequestBuilders.post(\"/livros\").contentType(MediaType.APPLICATION_JSON).content(json)", ["MockMvc.doPost()","postJsonRequest()"], "MockMvcRequestBuilders constrói requisições com verbo, URI, headers e payloads."),
          t("Qual classe é injetada para simular requisições HTTP nos testes de controladores com @WebMvcTest?", ["MockMvc"], "MockMvc é a ferramenta central de testes de controladores REST no ecossistema Spring."),
          g("Complete a asserção que verifica se o status HTTP retornado na resposta MockMvc é 201 Created:", ["isCreated"], "status().isCreated() confere se o código HTTP é 201.", "mockMvc.perform(post(\"/livros\").content(json))\n    .andExpect(status().____());"),
          o("Ordene o fluxo de execução de um teste fatiado com MockMvc:", ["Configurar o comportamento simulado do serviço anotado com @MockBean","Construir a requisição simulada via MockMvcRequestBuilders com verbo, URL e corpo","Executar a chamada via mockMvc.perform(...) disparando o controlador","Encadear verificações com andExpect conferindo status HTTP e conteúdo JSON"], "Configurar mock, construir requisição, executar chamada e validar com andExpect."),
          p("Relacione os recursos de testes de controladores às suas finalidades:", [["@WebMvcTest","Inicializa apenas a camada web e controladores"],["MockMvc","Simula requisições e respostas HTTP no dispatcher servlet"],["@MockBean","Injeta mock gerenciado no contexto de teste do Spring"],["status().isBadRequest()","Verifica se o retorno HTTP foi código 400"]], "Testes de controladores garantem contratos de API estáveis e conformes com a especificação.")
        ]
      },
      {
        id: "java-c16-u7-l3-validacao-de-contratos-com-jsonpath",
        title: "Validação de contratos JSON com jsonPath e asserções de status HTTP",
        subtitle: "Inspeção de payload · Assegurando que a estrutura da resposta atenda ao contrato",
        theory: "O utilitário jsonPath integrado ao MockMvc permite inspecionar propriedades específicas do payload de resposta JSON através de expressões de caminho. Com ele, validamos a existência de campos ($), tipos de dados, valores específicos e itens de listas ($.conteudo[0].titulo), assegurando a fidelidade do contrato da API.",
        questions: [
          q("O que representa o símbolo '$' no início de uma expressão de consulta jsonPath?", "A raiz (root) do documento JSON que está sendo inspecionado", ["O final do arquivo","Uma variável em dólar"], "O símbolo $ indica a raiz do objeto ou array JSON avaliado."),
          q("Como acessar o atributo 'titulo' localizado na raiz do objeto JSON de resposta com jsonPath?", "$.titulo", ["root.titulo","//titulo"], "$.propriedade navega diretamente para atributos do nó raiz do JSON."),
          q("Como verificar se o primeiro elemento de um array de livros possui o campo 'isbn' preenchido?", "jsonPath(\"$[0].isbn\").exists() ou is(\"978-0134685991\")", ["jsonPath(\"isbn.primeiro\")","jsonPath(\"livro#1\")"], "$[0].propriedade acessa o primeiro item do array indexado em zero."),
          q("Qual biblioteca de matchers é comumente combinada com jsonPath para asserções ricas?", "Hamcrest (is, hasSize, containsString)", ["Lombok","Hibernate"], "Matchers do Hamcrest oferecem asserções expressivas e legíveis para testes."),
          t("Qual método de andExpect avalia expressões de caminho no JSON da resposta?", ["jsonPath"], "jsonPath(\"$.campo\") inspeciona a estrutura do payload de retorno."),
          g("Complete a asserção que verifica se o total de elementos retornado na lista é igual a 3:", ["hasSize"], "hasSize confere a quantidade exata de itens em arrays JSON.", ".andExpect(jsonPath(\"$.conteudo\", ____(3)));"),
          o("Ordene as asserções de contrato de um endpoint de consulta de livro por ID:", ["Disparar requisição GET /livros/1 através do mockMvc.perform","Conferir se o status HTTP retornado é 200 OK via status().isOk()","Verificar se o cabeçalho Content-Type é application/json","Inspecionar com jsonPath('$.id').value(1) e jsonPath('$.titulo').value('Clean Code')","Garantir que campos internos proibidos não constem no JSON retornado"], "Disparar GET, conferir status 200, checar Content-Type, validar atributos com jsonPath e conferir ausência de vazamentos."),
          p("Associe expressões jsonPath aos dados que elas inspecionam:", [["$.id","Propriedade 'id' na raiz do objeto JSON"],["$.itens[0]","Primeiro elemento do array de itens"],["$.itens.length()","Quantidade de elementos presentes no array"],["$.erros[*].campo","Todos os nomes de campos dentro da lista de erros"]], "jsonPath garante que qualquer quebra inadvertida de contrato de API seja detectada em CI.")
        ]
      },
      {
        id: "java-c16-u7-l4-testes-integrados-springboottest",
        title: "Testes de integração de ponta a ponta com @SpringBootTest e Testcontainers",
        subtitle: "Confiabilidade máxima · Executando a pilha inteira com banco de dados real em container",
        theory: "Testes de integração com @SpringBootTest inicializam o ApplicationContext completo do Spring Boot. Combinado com Testcontainers, o teste sobe uma instância descartável e real do PostgreSQL em container Docker, exercitando controllers, services, queries JPQL e migrações Flyway em um ambiente idêntico ao de produção.",
        questions: [
          q("Qual é o principal benefício de usar Testcontainers com PostgreSQL em vez de banco em memória H2 nos testes integrados?", "Garante paridade total com o ambiente de produção, suportando funções, dialetos e tipos reais do banco", ["Dispensa a necessidade do Docker no computador","Executa sem consumir memória RAM"], "H2 possui dialeto diferente do PostgreSQL e não detecta certas falhas de SQL ou migração."),
          q("Qual anotação marca um teste como teste integrado que carrega o contexto completo da aplicação?", "@SpringBootTest", ["@PartialBoot","@OnlyCoreTest"], "@SpringBootTest sobe todo o grafo de dependências do Spring Boot para testes ponta a ponta."),
          q("Como o Spring Boot configura dinamicamente o DataSource para apontar para a porta do container do Testcontainers?", "Através da anotação @DynamicPropertySource vinculando url, username e password do container", ["Editando manualmente o arquivo application.properties em tempo real","Criando um arquivo bat temporário"], "@DynamicPropertySource injeta as propriedades dinâmicas do container no ambiente de teste."),
          q("O que acontece com os containers criados pelo Testcontainers após a finalização da bateria de testes?", "São encerrados e destruídos automaticamente, liberando portas e recursos da máquina", ["Permanecem rodando para sempre","Movem os dados para a nuvem"], "Testcontainers garante limpeza e isolamento automático ao final da suíte."),
          t("Qual anotação do Spring Boot carrega a aplicação inteira para execução de testes de integração?", ["@SpringBootTest","SpringBootTest"], "@SpringBootTest inicializa a aplicação completa para validações de ponta a ponta."),
          g("Complete a configuração de porta dinâmica do container PostgreSQL para a suíte de integração:", ["DynamicPropertySource"], "Sobrescreve propriedades do DataSource com os parâmetros do container.", "@____\nstatic void registrarPropriedades(DynamicPropertyRegistry registry) {\n    registry.add(\"spring.datasource.url\", postgres::getJdbcUrl);\n}"),
          o("Ordene a execução de um teste de integração de ponta a ponta com Testcontainers:", ["Testcontainers inicializa um container real do banco de dados (ex: PostgreSQL)","@DynamicPropertySource registra a URL e credenciais dinâmicas do container","Spring Boot sobe o contexto executando as migrações Flyway no banco do container","O teste executa operações reais através de chamadas HTTP ou injeção de serviços","Asserções verificam integridade no banco e o container é descartado ao término"], "Iniciar container, registrar propriedades, subir Spring/Flyway, executar testes e descartar container."),
          p("Relacione as ferramentas de teste integrado às suas vantagens:", [["@SpringBootTest","Carrega toda a árvore de componentes da aplicação"],["Testcontainers","Sobe serviços e bancos reais em containers temporários"],["Flyway no teste","Valida se os scripts DDL executam sem erro no banco real"],["DynamicPropertyRegistry","Conecta a aplicação ao container sem portas fixas"]], "Testes integrados robustos são a maior salvaguarda contra quebras em produção.")
        ]
      },
      {
        id: "java-c16-u7-l5-concorrencia-e-idempotencia",
        title: "Testes de carga, concorrência e idempotência em operações de empréstimo",
        subtitle: "Resiliência sob estresse · Comprovando que condições de corrida não corrompem dados",
        theory: "Operações concorrentes exigem testes automatizados com múltiplas threads: usamos ExecutorService e CountDownLatch para disparar 20 tentativas simultâneas de empréstimo do último exemplar disponível. O teste comprova que exatamente 1 empréstimo é concedido e as outras 19 falham com conflito, sem corromper o estoque.",
        questions: [
          q("Qual classe do pacote java.util.concurrent permite sincronizar várias threads para que disparem simultaneamente?", "CountDownLatch", ["ArrayList","Scanner"], "CountDownLatch aguarda a liberação de uma contagem, sincronizando a largada de múltiplas threads."),
          q("O que o teste de concorrência de empréstimo deve afirmar ao final de 20 requisições simultâneas para 1 exemplar?", "Que exatamente 1 requisição obteve sucesso (201) e as outras 19 receberam conflito (409)", ["Que todas as 20 conseguiram pegar o mesmo exemplar","Que o banco de dados apagou a tabela"], "Garante que o estoque não negativou e que apenas um leitor recebeu o exemplar."),
          q("O que define uma operação de API como idempotente?", "Produzir o mesmo resultado no servidor mesmo se executada repetidas vezes consecutivas", ["Executar mais rápido que 10 milissegundos","Só funcionar com o verbo POST"], "Idempotência garante que retentativas de rede não gerem cobranças ou duplicidades indevidas."),
          q("Qual classe Java gerencia um pool de threads para disparar requisições concorrentes em testes?", "ExecutorService", ["ThreadSolo","SingleProcess"], "ExecutorService gerencia tarefas assíncronas executadas em paralelo por um pool de threads."),
          t("Qual classe de sincronização de threads em Java possui os métodos countDown() e await()?", ["CountDownLatch"], "CountDownLatch é o mecanismo clássico para simular largadas simultâneas em testes."),
          g("Complete a trava que faz todas as threads de teste aguardarem o sinal unificado de largada:", ["await"], "await() bloqueia a thread até que o latch chegue a zero.", "latchLargada.____();"),
          o("Ordene as etapas de um teste automatizado de concorrência em empréstimo de exemplar:", ["Preparar 1 livro com apenas 1 exemplar com status DISPONIVEL no banco de dados","Configurar ExecutorService com 20 threads e instanciar um CountDownLatch de largada","Cada thread se prepara e aguarda no latch.await() pelo sinal sincronizado","Thread principal chama latch.countDown() liberando as 20 chamadas simultâneas","Aguardar o término e verificar que exatamente 1 empréstimo foi gravado no banco"], "Preparar estoque de 1, configurar threads/latch, aguardar largada, liberar e verificar resultado unitário."),
          p("Associe os conceitos de resiliência às suas aplicações em testes:", [["CountDownLatch","Sincroniza threads para dispararem no mesmo instante"],["Idempotência","Garante que retentativas de requisições não dupliquem operações"],["Teste de concorrência","Comprova que travas e versionamento impedem estados inconsistentes"],["AtomicInteger","Contador thread-safe para somar sucessos e falhas nos testes"]], "Testar concorrência comprova que a aplicação sobrevive ao tráfego do mundo real.")
        ]
      }
    ],
    8: [
      {
        id: "java-c16-u8-l1-documentacao-openapi-swagger",
        title: "Documentação viva da API com OpenAPI 3 e Swagger UI (springdoc-openapi)",
        subtitle: "Contratos navegáveis · Gerando documentação interativa e contratos padronizados",
        theory: "Documentar APIs manualmente gera documentação desatualizada. A biblioteca springdoc-openapi inspeciona controladores e DTOs em tempo de execução, gerando a especificação OpenAPI 3 em JSON (/v3/api-docs) e uma interface interativa no navegador (/swagger-ui.html) para testes diretos das rotas da biblioteca.",
        questions: [
          q("Qual biblioteca do ecossistema Spring Boot gera automaticamente documentação OpenAPI 3 e Swagger UI?", "springdoc-openapi", ["hibernate-doc","maven-javadoc"], "springdoc-openapi integra OpenAPI 3 e Swagger UI ao Spring Boot de forma transparente."),
          q("Qual URL padrão permite acessar a interface visual interativa do Swagger UI gerada pelo springdoc?", "/swagger-ui.html (ou /swagger-ui/index.html)", ["/index.php","/docs.txt"], "Swagger UI oferece uma interface web interativa para navegar e testar endpoints."),
          q("Qual anotação do OpenAPI adiciona descrições e resumos legíveis a um método de controlador REST?", "@Operation(summary = \"Cadastrar livro\", description = \"...\")", ["@DescribeMethod","@DocEndpoint"], "@Operation descreve a intenção, resumo e comportamento do endpoint na documentação."),
          q("Qual anotação descreve os possíveis códigos de retorno HTTP e seus significados na documentação?", "@ApiResponse", ["@StatusDesc","@HttpCodeLabel"], "@ApiResponse(responseCode = \"201\", description = \"Livro cadastrado com sucesso\") documenta os retornos."),
          t("Qual padrão internacional mantido pela Linux Foundation padroniza descrições de contratos de APIs REST?", ["OpenAPI","OpenAPI 3"], "A especificação OpenAPI padroniza a descrição legível por humanos e máquinas de serviços REST."),
          g("Complete a anotação que documenta a finalidade do endpoint de devolução no Swagger:", ["Operation"], "@Operation descreve o resumo da rota na interface Swagger.", "@____(summary = \"Realizar devolução de livro\", description = \"Calcula multas e libera exemplar\")"),
          o("Ordene a integração do springdoc-openapi ao projeto Spring Boot:", ["Adicionar a dependência org.springdoc:springdoc-openapi-starter-webmvc-ui no pom.xml","Configurar metadados gerais da API (título, versão, contato) na classe OpenAPI config","Anotar controladores e DTOs com @Operation, @ApiResponse e @Schema","Executar a aplicação e acessar /swagger-ui.html no navegador para inspecionar os contratos"], "Adicionar dependência, configurar bean OpenAPI, anotar métodos e navegar na interface."),
          p("Relacione as anotações do OpenAPI às suas utilidades:", [["@Operation","Descreve a ação e o resumo do endpoint"],["@ApiResponse","Documenta códigos de status esperados e esquemas"],["@Schema","Descreve atributos e exemplos nos DTOs"],["/v3/api-docs","Endpoint que entrega o contrato bruto em formato JSON"]], "Documentação viva e interativa reduz atritos na integração de clientes e parceiros.")
        ]
      },
      {
        id: "java-c16-u8-l2-perfis-de-ambiente-profiles",
        title: "Configuração de perfis de ambiente (application-dev.yml, application-prod.yml)",
        subtitle: "Configuração desacoplada · Separando credenciais e parâmetros por ambiente de execução",
        theory: "A aplicação da biblioteca deve funcionar em múltiplos ambientes sem alteração de código: desenvolvimento com banco local e logs detalhados, testes automatizados e produção com credenciais seguras. O Spring Profiles permite alternar configurações usando arquivos application-{perfil}.yml e variáveis de ambiente.",
        questions: [
          q("Por que credenciais de produção (senhas de banco e chaves secretas) nunca devem ser gravadas em arquivos no Git?", "Porque expõe dados confidenciais a qualquer leitor do repositório, violando princípios básicos de segurança", ["Porque o Git não aceita senhas","Porque o compilador recusa compilar se tiver senha"], "Segredos devem ser injetados exclusivamente em tempo de execução via variáveis de ambiente."),
          q("Qual propriedade do Spring define qual perfil de configuração está ativo no momento da inicialização?", "spring.profiles.active", ["spring.environment","app.mode"], "spring.profiles.active=prod define que o perfil 'prod' carregará application-prod.yml."),
          q("Qual arquivo de configuração YAML é carregado como base comum compartilhada por todos os perfis?", "application.yml (ou application.properties)", ["base.txt","system.yml"], "application.yml contém propriedades padrão sobrepostas pelas configurações do perfil ativo."),
          q("Como referenciar uma variável de ambiente do sistema operacional dentro do arquivo YAML do Spring com valor padrão?", "${DB_PASSWORD:senhaPadrao}", ["%DB_PASSWORD%","@env(DB_PASSWORD)"], "${NOME_VARIAVEL:padrao} interpola a variável do SO ou usa o valor após os dois pontos."),
          t("Qual propriedade no application.yml ativa um perfil específico como 'dev' ou 'prod'?", ["spring.profiles.active"], "spring.profiles.active instrui o Spring a carregar o arquivo de perfil correspondente."),
          g("Complete a interpolação que lê a URL do banco da variável de ambiente com fallback para localhost:", ["DB_URL"], "Permite customizar a URL em contêineres e servidores de produção.", "url: ${____:jdbc:postgresql://localhost:5432/biblioteca}"),
          o("Ordene a precedência de configuração no Spring Boot do menor para o maior impacto:", ["Propriedades padrão definidas no application.yml genérico","Propriedades específicas do perfil ativo no application-{perfil}.yml","Variáveis de ambiente do sistema operacional (ex: export DB_PASSWORD=...)","Argumentos passados na linha de comando ao executar o jar (--spring.datasource.password=...)"], "application.yml -> perfil ativo -> variáveis de ambiente -> argumentos de CLI."),
          p("Associe os perfis de ambiente às suas configurações características:", [["application-dev.yml","Logs SQL ativados e banco local de desenvolvimento"],["application-test.yml","Configurações para Testcontainers ou bancos descartáveis"],["application-prod.yml","Logs em JSON, credenciais por variáveis e HTTPS forçado"],["spring.profiles.active","Seleciona o perfil que assume a execução da aplicação"]], "Separar ambientes viabiliza deploys limpos de acordo com o manifesto Twelve-Factor.")
        ]
      },
      {
        id: "java-c16-u8-l3-metricas-e-health-check-actuator",
        title: "Métricas, observabilidade e health checks com Spring Boot Actuator",
        subtitle: "Operação em produção · Monitorando saúde, métricas e telemetria da aplicação",
        theory: "Aplicações em produção precisam fornecer telemetria a orquestradores como Kubernetes. O Spring Boot Actuator expõe endpoints essenciais como /actuator/health (liveness e readiness probes) e /actuator/metrics, permitindo monitorar conectividade com o banco, consumo de memória da JVM e taxas de requisição HTTP.",
        questions: [
          q("Qual endpoint do Spring Boot Actuator informa o status operacional de saúde dos componentes (ex: banco e disco)?", "/actuator/health", ["/actuator/status","/health-check.html"], "/actuator/health retorna UP se o banco e outros serviços essenciais estiverem operacionais."),
          q("Qual é a utilidade das sondas de prontidão (readiness probes) e vivacidade (liveness probes) em orquestradores como Kubernetes?", "Informar se a aplicação está viva e se já concluiu a inicialização para receber tráfego de usuários", ["Verificar se o código tem comentários suficientes","Medir a velocidade da internet local"], "Probes evitam que o orquestrador envie tráfego a instâncias que ainda não subiram completamente."),
          q("Por que endpoints administrativos como /actuator/beans ou /actuator/env não devem ficar abertos publicamente na internet?", "Porque expõem informações sensíveis da arquitetura e configuração que facilitam invasões", ["Porque deixam a tela do navegador lenta","Porque o Java cobra taxa por acesso público"], "Apenas /health deve ser público; endpoints administrativos exigem autenticação restrita."),
          q("Qual biblioteca integrada ao Actuator exporta métricas dimensionais para sistemas como Prometheus?", "Micrometer", ["Hibernate","Jackson"], "Micrometer é a fachada padrão de instrumentação de métricas do ecossistema Spring Boot."),
          t("Qual endpoint do Actuator verifica a disponibilidade e prontidão dos serviços conectados (ex: /actuator/____)?", ["health"], "/actuator/health é a rota universal para verificação de integridade operacional."),
          g("Complete a configuração que expõe apenas os endpoints de saúde e métricas no application.yml:", ["health,metrics"], "Limita a exposição pública de endpoints administrativos.", "management.endpoints.web.exposure.include: ____"),
          o("Ordene a jornada de uma verificação de saúde pelo orquestrador na API da biblioteca:", ["Kubernetes envia requisição GET /actuator/health/readiness para o container","Actuator verifica internamente a conexão com o banco de dados e espaço em disco","Todos os componentes reportam status UP com latências dentro do esperado","Actuator responde com status HTTP 200 OK e JSON {\"status\": \"UP\"}","Orquestrador começa a rotear requisições de usuários para a instância pronta"], "Consulta do orquestrador, checagem de banco/disco, consolidação, resposta 200 e liberação de tráfego."),
          p("Relacione os endpoints do Actuator aos seus objetivos de observabilidade:", [["/actuator/health","Verifica se a aplicação e seus recursos estão saudáveis"],["/actuator/metrics","Exibe dados estatísticos de memória, CPU e conexões"],["/actuator/prometheus","Entrega métricas formatadas para raspagem pelo Prometheus"],["Micrometer","Instrumenta timers e contadores customizados de negócio"]], "Observabilidade profissional garante identificação proativa de incidentes em produção.")
        ]
      },
      {
        id: "java-c16-u8-l4-empacotamento-jar-e-docker",
        title: "Empacotamento executável (jar autocontido) e imagens Docker com buildpacks",
        subtitle: "Entrega contínua · Construindo artefatos autocontidos e imagens OCI prontas para nuvem",
        theory: "O Spring Boot compila a aplicação em um arquivo fat JAR executável contendo todas as dependências e o servidor embutido (Tomcat). Usando o comando 'mvn spring-boot:build-image' com Cloud Native Buildpacks, geramos uma imagem Docker OCI otimizada em camadas sem precisar escrever um Dockerfile manual inseguro.",
        questions: [
          q("O que é um 'fat JAR' (ou uber JAR) produzido pelo plugin do Spring Boot?", "Um arquivo JAR executável que empacota o código da aplicação, todas as dependências e o servidor HTTP embutido", ["Um arquivo que só pode ser aberto em computadores com muita memória","Um arquivo que contém apenas o código-fonte"], "O fat JAR contém tudo o que é necessário para rodar com o comando java -jar app.jar."),
          q("Qual comando da CLI do Maven executa a aplicação empacotada gerando uma imagem Docker via Cloud Native Buildpacks?", "mvn spring-boot:build-image", ["mvn compile docker","mvn run-in-cloud"], "build-image cria uma imagem OCI de produção segura em camadas automaticamente."),
          q("Por que imagens Docker de produção devem rodar com usuário sem privilégios (non-root)?", "Para limitar o impacto de segurança caso a aplicação sofra invasão ou execução remota de código", ["Porque o root consome o dobro de espaço no disco","Porque o Java só compila como non-root"], "Práticas de segurança exigem que o processo da JVM rode com usuário restrito no container."),
          q("Como a organização de um JAR em camadas (layered JAR) otimiza o cache de imagens Docker?", "Permite que apenas a camada de código da aplicação seja baixada em novos deploys, reaproveitando as dependências pesadas", ["Apaga o histórico de commits do repositório","Diminui o tamanho das fontes na tela"], "Camadas imutáveis de dependências permanecem em cache, acelerando downloads de deploys para segundos."),
          t("Qual comando básico do Java inicia a execução de um JAR executável empacotado no terminal (ex: java -____ app.jar)?", ["jar"], "java -jar app.jar inicia o fat JAR com seu runtime e servidor embutido."),
          g("Complete o comando do Maven que empacota o projeto gerando o fat JAR no diretório target:", ["package"], "mvn package compila, testa e empacota o artefato executável final.", "mvn clean ____ -DskipTests"),
          o("Ordene as etapas da construção de um artefato de produção para nuvem:", ["Compilar o código-fonte Java e validar todos os testes automatizados","Empacotar o executável em JAR layered contendo dependências e classes separadas","Gerar a imagem OCI utilizando Cloud Native Buildpacks ou Dockerfile multi-stage","Publicar a imagem em um registro corporativo (ex: GitHub Packages ou Docker Hub)","Executar o container em ambiente de staging para testes de fumaça"], "Compilar e testar, gerar JAR em camadas, empacotar imagem OCI, publicar no registro e validar."),
          p("Associe os termos de empacotamento às suas funções:", [["Fat JAR","Arquivo único autocontido com Tomcat e bibliotecas"],["Layered JAR","Separa dependências e aplicação para otimizar cache"],["Buildpacks","Gera imagens de container sem precisar de Dockerfile manual"],["non-root user","Usuário restrito que eleva a segurança no container"]], "Artefatos padronizados e reprodutíveis viabilizam pipelines modernos de CI/CD.")
        ]
      },
      {
        id: "java-c16-u8-l5-checklist-final-e-documentacao-de-entrega",
        title: "Checklist final de entrega: auditoria de segurança, logs estruturados e README",
        subtitle: "Excelência de entrega · Consolidando documentação, conformidade e encerramento",
        theory: "A entrega do projeto integrador coroa a maturidade do engenheiro: valida se o README explica como rodar a API em um único comando, confere ausência de credenciais em código com scanners de segredos, assegura logs em JSON estruturado e atesta 100% de conformidade com todos os requisitos de negócio e testes.",
        questions: [
          q("Qual é o papel fundamental do arquivo README.md na entrega de uma API de biblioteca profissional?", "Explicar claramente os pré-requisitos, como subir a aplicação localmente e como executar a bateria de testes", ["Guardar cópias de senhas do banco de dados","Substituir o arquivo pom.xml da aplicação"], "O README é o cartão de visitas e o guia de execução primordial para qualquer desenvolvedor."),
          q("Por que logs de produção devem ser emitidos em formato estruturado (ex: JSON) em vez de texto puro livre?", "Facilita a ingestão, indexação e busca automatizada em plataformas de observabilidade como Elasticsearch ou Datadog", ["Porque o terminal só aceita caracteres em formato JSON","Porque economiza tinta da impressora"], "Logs estruturados em JSON permitem filtrar eventos por usuário, tempo de resposta e correlação em segundos."),
          q("Qual verificação prévia de segurança é obrigatória antes de qualquer commit ou push para repositórios?", "Rodar um scanner de segredos para garantir que senhas, tokens ou chaves privadas não foram commitadas acidentalmente", ["Desativar a autenticação de dois fatores","Apagar os testes unitários do projeto"], "Scanners de segredos impedem que credenciais vazem para repositórios públicos ou privados."),
          q("O que atesta que o projeto da biblioteca está tecnicamente pronto para entrega final com aprovação máxima?", "A aprovação de 100% dos testes automatizados, zero vulnerabilidades conhecidas e aderência rigorosa ao design proposto", ["Conter mais de 1 milhão de linhas de código","Ter sido feito em apenas 10 minutos sem testes"], "Qualidade comprovada por testes contínuos, documentação clara e segurança atestam entrega profissional."),
          t("Qual arquivo em Markdown na raiz do projeto orienta o desenvolvedor sobre como rodar e testar o sistema?", ["README.md","README"], "O README.md é o padrão universal de documentação e orientação de projetos de software."),
          g("Complete a instrução padrão de execução local no README para rodar a aplicação em terminal:", ["run"], "mvn spring-boot:run inicializa o projeto diretamente pelo Maven.", "mvn spring-boot:____"),
          o("Ordene o checklist de verificação final antes de formalizar a entrega da API:", ["Executar a suíte completa de testes automatizados garantindo 100% de aprovação","Rodar o scanner de segredos conferindo que nenhuma chave ou senha foi exposta","Conferir se o README.md descreve requisitos, portas e comandos de inicialização","Verificar no Swagger UI se todos os endpoints estão documentados e funcionando","Criar a tag de release com commit semântico formalizando a entrega do projeto"], "Testes 100%, scan de segredos, documentação no README, Swagger verificado e tag de release."),
          p("Relacione os pilares de uma entrega madura de software aos seus impactos:", [["README.md completo","Garante onboarding imediato de qualquer engenheiro"],["Scanner de segredos","Protege a organização contra vazamento de credenciais"],["Logs em JSON estruturado","Permite investigação ágil de anomalias em produção"],["Suíte de testes verde","Comprova que todas as regras de negócio foram atendidas"]], "Concluir o projeto com rigor e método consolida a formação técnica do desenvolvedor.")
        ]
      }
    ]
  });
})();
