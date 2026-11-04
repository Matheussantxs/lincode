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
  window.PYTHON_CHAPTER_UNITS.poo = Object.assign(window.PYTHON_CHAPTER_UNITS.poo || {}, {
    1: [
      {
        id: 'py-po-1-4-interacao',
        title: 'Objetos colaborando entre si',
        subtitle: 'Aplicação · Interação entre instâncias',
        theory: 'Em sistemas reais, objetos raramente agem sozinhos: um Pedido recebe um Cliente, ou uma Conta transfere saldo para outra Conta chamando métodos públicos dela. Passar instâncias como argumentos permite dividir responsabilidades com clareza e baixo acoplamento.',
        questions: [
          q(
            'Qual é o saldo de destino.saldo após origem.transferir(40, destino) na classe Carteira?',
            '90',
            ['50', '110'],
            'origem perde 40 (ficando com 60) e chama destino.depositar(40), somando 50 + 40 = 90.',
            'class Carteira:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def depositar(self, valor):\n        self.saldo += valor\n    def transferir(self, valor, outra):\n        self.saldo -= valor\n        outra.depositar(valor)\n\norigem = Carteira(100)\ndestino = Carteira(50)\norigem.transferir(40, destino)'
          ),
          q(
            'Em Guerreiro.atacar(alvo), o que o parâmetro alvo representa durante a chamada g1.atacar(g2)?',
            'A própria instância g2 passada como referência',
            ['Uma cópia congelada dos números de g2', 'A classe Guerreiro inteira sem estado'],
            'Em Python, passar g2 entrega a referência daquela instância, permitindo que atacar altere g2.vida.',
            'class Guerreiro:\n    def __init__(self, vida):\n        self.vida = vida\n    def atacar(self, alvo):\n        alvo.vida -= 15\n\ng1 = Guerreiro(100)\ng2 = Guerreiro(80)\ng1.atacar(g2)'
          ),
          q(
            'Qual valor cupom_vip.aplicar_em(pedido_mesa) deixa em pedido_mesa.total?',
            '180',
            ['200', '20'],
            'O desconto de 10% sobre 200 reduz 20 unidades, resultando em 180.',
            'class PedidoMesa:\n    def __init__(self, total):\n        self.total = total\n\nclass Cupom:\n    def __init__(self, percentual):\n        self.percentual = percentual\n    def aplicar_em(self, pedido):\n        pedido.total -= pedido.total * self.percentual // 100\n\npedido_mesa = PedidoMesa(200)\ncupom_vip = Cupom(10)\ncupom_vip.aplicar_em(pedido_mesa)'
          ),
          q(
            'Por que Biblioteca.emprestar(livro, leitor) é um exemplo de composição/colaboração e não de herança?',
            'Porque Biblioteca coordena objetos Livro e Leitor distintos sem que um seja subtipo do outro',
            ['Porque Python proíbe uma classe herdar métodos quando recebe objetos', 'Porque Livro passa a herdar os atributos de Leitor em tempo de execução'],
            'Herança modela relação "é um"; colaboração e composição modelam objetos independentes trabalhando juntos.'
          ),
          t(
            'Qual número sala.ocupacao() retorna após sala.entrar(ana) e sala.entrar(leo)?',
            '2',
            'A lista self.alunos começa vazia e recebe duas instâncias de Aluno, logo len(self.alunos) vale 2.',
            'class Aluno:\n    def __init__(self, nome):\n        self.nome = nome\n\nclass Sala:\n    def __init__(self):\n        self.alunos = []\n    def entrar(self, aluno):\n        self.alunos.append(aluno)\n    def ocupacao(self):\n        return len(self.alunos)\n\nsala = Sala()\nana = Aluno("Ana")\nleo = Aluno("Leo")\nsala.entrar(ana)\nsala.entrar(leo)'
          ),
          g(
            'Complete o método recarregar de Carregador para somar carga chamando carregar na instância bateria:',
            'bateria.carregar',
            'O objeto Carregador delega a atualização chamando o método carregar da instância bateria recebida.',
            'class Bateria:\n    def __init__(self):\n        self.nivel = 20\n    def carregar(self, pontos):\n        self.nivel += pontos\n\nclass Carregador:\n    def recarregar(self, bateria):\n        ____(30)'
          ),
          o(
            'Ordene a execução da colaboração entre Motorista e Carro ao iniciar uma viagem:',
            [
              'Instanciar carro = Carro() com motor desligado',
              'Instanciar motorista = Motorista(carro) guardando a referência',
              'Chamar motorista.iniciar_viagem()',
              'Dentro de iniciar_viagem, acionar self.carro.ligar()'
            ],
            'Primeiro criamos o objeto colaborador, injetamos sua referência em Motorista e delegamos a ação ao método ligar().'
          ),
          p(
            'Associe cada elemento da interação entre PedidoEntrega e Entregador ao seu papel:',
            [
              ['self', 'Instância atual que executa o método chamado'],
              ['entregador', 'Outra instância recebida por parâmetro para colaborar'],
              ['self.responsavel = entregador', 'Composição que guarda referência ao objeto colaborador'],
              ['entregador.confirmar_coleta()', 'Mensagem enviada chamando método público do colaborador']
            ],
            'Objetos colaboram guardando referências ou invocando métodos públicos uns dos outros.'
          )
        ]
      },
      {
        id: 'py-po-1-5-revisao',
        title: 'Revisão: classes, métodos e herança',
        subtitle: 'Revisão e desafio · Fundamentos de POO',
        theory: 'Classes definem moldes com dados e comportamentos, métodos operam sobre self e a herança reutiliza código de uma superclasse via super(). Combinar herança enxuta com colaboração entre objetos mantém sistemas como lojas, jogos e bancos fáceis de evoluir.',
        questions: [
          q(
            'O que frete_expresso.custo(10) retorna quando FreteExpresso sobrescreve custo usando super()?',
            '45',
            ['30', '15'],
            'super().custo(10) calcula 10 * 3 = 30 na classe Frete, e FreteExpresso soma a taxa fixa 15, totalizando 45.',
            'class Frete:\n    def custo(self, km):\n        return km * 3\n\nclass FreteExpresso(Frete):\n    def custo(self, km):\n        return super().custo(km) + 15\n\nfrete_expresso = FreteExpresso()'
          ),
          q(
            'Qual resultado isinstance(drone, Veiculo) produz quando DroneEntrega herda de Veiculo?',
            'True',
            ['False', 'TypeError'],
            'Uma instância de uma subclasse também é reconhecida como instância de sua superclasse por isinstance.',
            'class Veiculo:\n    pass\n\nclass DroneEntrega(Veiculo):\n    pass\n\ndrone = DroneEntrega()'
          ),
          q(
            'Na hierarquia Ingresso e IngressoMeia, qual método é executado ao chamar meia.valor_final()?',
            'O método valor_final sobrescrito em IngressoMeia',
            ['Sempre o valor_final original da base Ingresso', 'Ambos em sequência automática sem usar super()'],
            'O Python procura o método primeiro na classe da instância (IngressoMeia) antes de subir para a superclasse.',
            'class Ingresso:\n    def __init__(self, preco):\n        self.preco = preco\n    def valor_final(self):\n        return self.preco\n\nclass IngressoMeia(Ingresso):\n    def valor_final(self):\n        return self.preco // 2\n\nmeia = IngressoMeia(80)'
          ),
          q(
            'Quando devemos preferir herança em vez de apenas guardar outro objeto como atributo?',
            'Quando a subclasse realmente é uma especialização da superclasse (relação "é um")',
            ['Sempre que duas classes precisarem trocar um número inteiro', 'Quando um Pedido possui vários itens dentro de uma lista'],
            'Pedido tem itens (composição); IngressoMeia é um Ingresso (herança).'
          ),
          t(
            'Qual texto bot_suporte.responder() retorna no exemplo de polimorfismo entre Bot e BotSuporte?',
            'Ticket aberto',
            'Como bot_suporte é instância de BotSuporte, sua versão sobrescrita de responder() retorna "Ticket aberto".',
            'class Bot:\n    def responder(self):\n        return "Oi"\n\nclass BotSuporte(Bot):\n    def responder(self):\n        return "Ticket aberto"\n\nbot_suporte = BotSuporte()'
          ),
          g(
            'Complete a definição de ContaPoupanca para herdar da superclasse ContaBancaria:',
            'ContaBancaria',
            'Em Python, indicamos a superclasse entre parênteses logo após o nome da subclasse.',
            'class ContaBancaria:\n    def __init__(self, titular):\n        self.titular = titular\n\nclass ContaPoupanca(____):\n    def render(self):\n        return True'
          ),
          o(
            'Ordene as etapas para criar a subclasse SensorTemperatura reaproveitando o __init__ de Sensor:',
            [
              'Declarar class SensorTemperatura(Sensor):',
              'Definir def __init__(self, codigo, unidade):',
              'Chamar super().__init__(codigo) para inicializar a base',
              'Atribuir self.unidade = unidade na subclasse'
            ],
            'A subclasse declara a herança, recebe seus parâmetros, delega o atributo base via super() e salva o atributo específico.'
          ),
          p(
            'Relacione cada conceito fundamental da Unidade 1 de POO ao seu significado:',
            [
              ['Classe', 'Molde que define atributos e métodos de uma família de objetos'],
              ['Instância', 'Objeto concreto criado na memória a partir de uma classe'],
              ['Sobrescrita', 'Redefinição de um método herdado com comportamento específico na subclasse'],
              ['super()', 'Acesso seguro a métodos da superclasse a partir da subclasse']
            ],
            'Esses quatro pilares sustentam a modelagem orientada a objetos em Python.'
          )
        ]
      }
    ],
    2: [
      {
        id: 'py-po-2-1-init',
        title: 'Construtor __init__ e validação',
        subtitle: 'Apresentação · Inicialização segura',
        theory: 'O método __init__ prepara cada nova instância logo após sua criação. Validar argumentos no construtor — recusando preço negativo ou nome vazio com ValueError — garante que nenhum objeto nasça em estado inválido no restante da aplicação, como em um caixa.',
        questions: [
          q(
            'O que ocorre ao executar ProdutoLoja("Café", -12) com validação no __init__?',
            'Lança ValueError imediatamente e impede o uso de um produto inválido',
            ['Cria o produto com preco igual a 0 silenciosamente', 'Retorna None sem interromper o programa'],
            'Como preco < 0 é verdadeiro para -12, a instrução raise ValueError interrompe a inicialização.',
            'class ProdutoLoja:\n    def __init__(self, nome, preco):\n        if preco < 0:\n            raise ValueError("Preço inválido")\n        self.nome = nome\n        self.preco = preco'
          ),
          q(
            'Qual valor o método especial __init__ deve retornar explicitamente em Python?',
            'Nenhum valor (ou None implícito), pois seu papel é apenas configurar self',
            ['A própria variável self obrigatoriamente com return self', 'Um dicionário com os atributos recém-criados'],
            'Retornar qualquer objeto diferente de None dentro de __init__ gera TypeError em Python.'
          ),
          q(
            'Qual é o valor de reserva.noites após reserva = ReservaHotel("Suíte", 3)?',
            '3',
            ['1', 'ValueError'],
            'Como 3 >= 1 passa pela validação sem erro, self.noites recebe 3 normalmente.',
            'class ReservaHotel:\n    def __init__(self, quarto, noites):\n        if noites < 1:\n            raise ValueError("Mínimo de 1 noite")\n        self.quarto = quarto\n        self.noites = noites\n\nreserva = ReservaHotel("Suíte", 3)'
          ),
          q(
            'Por que limpar espaços com nome.strip() antes de testar if not nome no __init__ de Passageiro é recomendável?',
            'Para rejeitar strings compostas apenas por espaços em branco como "   "',
            ['Porque strip() converte números inteiros em texto automaticamente', 'Para impedir que o Python crie o parâmetro self'],
            'Uma string "   " é avaliada como True se não aplicarmos strip(), deixando passar um nome vazio na prática.'
          ),
          t(
            'Qual exceção idiomática em Python o construtor de Termostato lança quando min_c > max_c?',
            'ValueError',
            'Quando o tipo está correto mas o valor viola uma regra de negócio, lançamos ValueError.',
            'class Termostato:\n    def __init__(self, min_c, max_c):\n        if min_c > max_c:\n            raise ValueError("Faixa invertida")\n        self.min_c = min_c\n        self.max_c = max_c'
          ),
          g(
            'Complete o __init__ de CupomDesconto para interromper a criação quando taxa estiver fora de 1 a 50:',
            'raise',
            'A palavra-chave raise dispara a exceção ValueError ao detectar um argumento inválido.',
            'class CupomDesconto:\n    def __init__(self, taxa):\n        if not (1 <= taxa <= 50):\n            ____ ValueError("Taxa fora do limite")\n        self.taxa = taxa'
          ),
          o(
            'Ordene a implementação segura do construtor __init__ da classe ContaSalario:',
            [
              'Definir def __init__(self, cpf, saldo_inicial):',
              'Verificar se saldo_inicial < 0 e lançar ValueError se inválido',
              'Atribuir self.cpf = cpf após passar na validação',
              'Atribuir self.saldo = saldo_inicial'
            ],
            'Validamos os parâmetros logo na entrada de __init__ antes de gravar o estado na instância.'
          ),
          p(
            'Associe cada verificação de __init__ na classe Voo ao erro de domínio que ela evita:',
            [
              ['if assentos <= 0:', 'Aeronave cadastrada sem capacidade de passageiros'],
              ['if not codigo.strip():', 'Identificador do voo vazio ou só com espaços'],
              ['if origem == destino:', 'Trecho aéreo saindo e pousando no mesmo aeroporto'],
              ['self.ocupados = 0', 'Falta de estado inicial definido para contagem de embarque']
            ],
            'Boas validações no construtor protegem todas as regras básicas de nascimento do objeto.'
          )
        ]
      },
      {
        id: 'py-po-2-2-atributos',
        title: 'Atributos de instância vs classe',
        subtitle: 'Prática guiada · Escopo de dados',
        theory: 'Atributos de instância (self.saldo) pertencem a cada objeto individual, enquanto atributos de classe ficam no corpo da classe e são compartilhados, como a taxa padrão de um banco. Reatribuir self.taxa cria um atributo próprio na instância sem alterar a classe.',
        questions: [
          q(
            'Qual par de valores (p1.moeda, p2.moeda) resulta após alterar p1.moeda = "USD" na classe PlanoAssinatura?',
            '("USD", "BRL")',
            ['("USD", "USD")', '("BRL", "BRL")'],
            'p1.moeda = "USD" cria um atributo de instância apenas em p1; p2 continua lendo PlanoAssinatura.moeda ("BRL").',
            'class PlanoAssinatura:\n    moeda = "BRL"\n    def __init__(self, nome):\n        self.nome = nome\n\np1 = PlanoAssinatura("Básico")\np2 = PlanoAssinatura("Pro")\np1.moeda = "USD"'
          ),
          q(
            'Se mudarmos MaquinaCafe.agua_minima = 150 na classe, o que m1.agua_minima e m2.agua_minima retornam (sem sombreamento)?',
            'Ambas retornam 150',
            ['Ambas continuam retornando o valor antigo 100', 'Apenas novas instâncias enxergam 150'],
            'Enquanto m1 e m2 não tiverem um atributo de instância agua_minima próprio, a busca sobe para a classe.',
            'class MaquinaCafe:\n    agua_minima = 100\n\nm1 = MaquinaCafe()\nm2 = MaquinaCafe()\nMaquinaCafe.agua_minima = 150'
          ),
          q(
            'Por que declarar historico = [] diretamente no corpo da classe Paciente é um bug clássico?',
            'Porque todos os pacientes compartilharão a mesma lista mutável de histórico',
            ['Porque o Python gera SyntaxError ao colocar listas dentro de class', 'Porque atributos de classe são apagados assim que __init__ termina'],
            'Chamar self.historico.append(...) muta a lista única da classe, misturando dados de todos os pacientes.'
          ),
          q(
            'Como incrementar corretamente o contador de classe Cracha.total_emitidos a cada novo Cracha?',
            'Usando Cracha.total_emitidos += 1 dentro de __init__',
            ['Usando self.total_emitidos += 1 para atualizar todas as instâncias', 'Usando total_emitidos += 1 sem prefixo dentro de __init__'],
            'self.total_emitidos += 1 criaria um atributo na instância valendo 1 em vez de atualizar o contador da classe.'
          ),
          t(
            'Qual número LojaFilial.total vale após instanciar três objetos LojaFilial?',
            '3',
            'Cada chamada a LojaFilial() executa __init__ e soma 1 diretamente em LojaFilial.total, chegando a 3.',
            'class LojaFilial:\n    total = 0\n    def __init__(self, cidade):\n        self.cidade = cidade\n        LojaFilial.total += 1\n\na = LojaFilial("Recife")\nb = LojaFilial("Curitiba")\nc = LojaFilial("Belém")'
          ),
          g(
            'Complete a linha que define limite_bagagem = 23 como atributo compartilhado de classe em PassagemAerea:',
            'limite_bagagem = 23',
            'Atributos declarados diretamente no bloco class (fora de métodos) pertencem à classe.',
            'class PassagemAerea:\n    ____\n    def __init__(self, assento):\n        self.assento = assento'
          ),
          o(
            'Ordene como o Python resolve a leitura da expressão f1.desconto em uma instância f1 de Funcionario:',
            [
              'Procurar "desconto" no dicionário próprio da instância f1',
              'Não encontrando na instância, procurar "desconto" na classe Funcionario',
              'Não encontrando em Funcionario, subir pelas superclasses na ordem de herança',
              'Lançar AttributeError apenas se nenhum nível possuir o atributo'
            ],
            'A resolução de atributos sempre prioriza a instância antes da classe e de suas superclasses.'
          ),
          p(
            'Associe cada dado de um sistema bancário ao escopo mais adequado (classe ou instância):',
            [
              ['self.saldo', 'Atributo de instância: valor exclusivo de cada correntista'],
              ['Conta.codigo_banco = "341"', 'Atributo de classe: constante igual para todas as contas do banco'],
              ['self.extrato = []', 'Atributo de instância mutável: lista individual criada no __init__'],
              ['Conta.contas_abertas', 'Atributo de classe contador: métrica global acumulada na criação']
            ],
            'Dados individuais ou mutáveis por objeto ficam em self; constantes e contadores globais ficam na classe.'
          )
        ]
      },
      {
        id: 'py-po-2-3-padroes',
        title: 'Valores padrão e mutáveis em __init__',
        subtitle: 'Aprofundamento · Armadilha da lista padrão',
        theory: 'Em Python, valores padrão de parâmetros são avaliados uma única vez na definição da função. Usar itens=[] em __init__ faz todas as instâncias compartilharem a mesma lista! O padrão idiomático seguro, como em um carrinho de compras, é usar None e criar [] dentro.',
        questions: [
          q(
            'No código com o bug tags=[] em ArtigoBlog, o que a2.tags contém após a1.tags.append("python")?',
            '["python"]',
            ['[]', 'TypeError'],
            'Como tags=[] foi criado uma só vez na definição de __init__, a1.tags e a2.tags apontam para a mesma lista!',
            'class ArtigoBlog:\n    def __init__(self, tags=[]):\n        self.tags = tags\n\na1 = ArtigoBlog()\na1.tags.append("python")\na2 = ArtigoBlog()'
          ),
          q(
            'Qual assinatura e corpo de __init__ resolvem com segurança o parâmetro opcional itens em SacolaCompras?',
            'def __init__(self, itens=None): com self.itens = [] if itens is None else list(itens)',
            ['def __init__(self, itens=[]): com self.itens = itens', 'def __init__(self, itens=list()): com self.itens = itens'],
            'Usar None como sentinela cria uma lista nova a cada chamada, e list(itens) evita acoplar à lista externa.'
          ),
          q(
            'Por que valores padrão imutáveis como nivel=1 ou ativo=True em Usuario Jogo NÃO causam vazamento entre instâncias?',
            'Porque números, strings e booleanos não podem ser mutados no lugar; reatribuir self.nivel troca apenas a referência da instância',
            ['Porque o Python recria inteiros e strings a cada linha de __init__', 'Porque parâmetros booleanos viram atributos de classe privados'],
            'A armadilha só afeta objetos mutáveis (list, dict, set) alterados in-place por métodos como append().'
          ),
          q(
            'Qual é o valor de c2.itens quando CarrinhoLoja usa itens=None corretamente e fazemos c1.adicionar("Livro")?',
            '[]',
            ['["Livro"]', 'None'],
            'Com itens=None, cada instância recebe sua própria lista recém-criada em tempo de execução.',
            'class CarrinhoLoja:\n    def __init__(self, itens=None):\n        self.itens = [] if itens is None else list(itens)\n    def adicionar(self, nome):\n        self.itens.append(nome)\n\nc1 = CarrinhoLoja()\nc1.adicionar("Livro")\nc2 = CarrinhoLoja()'
          ),
          t(
            'Qual valor sentinela imutável usamos como padrão de parâmetros opcionais de lista ou dicionário em Python?',
            'None',
            'None é imutável e testado com "is None" dentro do __init__ para instanciar uma nova coleção limpa.'
          ),
          g(
            'Complete o teste idiomático no __init__ de PlaylistMusica para criar uma lista nova quando faixas não for informada:',
            'is None',
            'Testamos identidade com "is None" (e não == []) para distinguir ausência de argumento de uma lista vazia passada.',
            'class PlaylistMusica:\n    def __init__(self, nome, faixas=None):\n        self.nome = nome\n        self.faixas = [] if faixas ____ else list(faixas)'
          ),
          o(
            'Ordene os passos para inicializar com segurança um dicionário opcional permissoes na classe PerfilAcesso:',
            [
              'Declarar def __init__(self, usuario, permissoes=None):',
              'Atribuir self.usuario = usuario',
              'Testar if permissoes is None:',
              'Criar um novo dict({}) próprio ou copiar dict(permissoes)'
            ],
            'O sentinela None aliado a dict(permissoes) garante isolamento total entre instâncias e quem chamou.'
          ),
          p(
            'Relacione cada valor padrão em __init__ ao seu comportamento entre múltiplas instâncias:',
            [
              ['desconto=0', 'Seguro: inteiro imutável, reatribuições ficam restritas a self'],
              ['moeda="BRL"', 'Seguro: string imutável, não sofre mutação in-place'],
              ['historico=[]', 'Perigoso: mesma lista compartilhada por todos os objetos criados sem argumento'],
              ['opcoes=None', 'Idiomático: permite instanciar uma coleção nova a cada chamada de __init__']
            ],
            'Apenas padrões imutáveis (como None, números, strings e tuplas) são seguros na assinatura de funções.'
          )
        ]
      },
      {
        id: 'py-po-2-4-estado',
        title: 'Atualizando o estado com segurança',
        subtitle: 'Aplicação · Transições válidas',
        theory: 'Um objeto bem projetado muda de estado por meio de métodos de negócio claros, como aprovar(), embarcar() ou estornar(), em vez de edições soltas de atributos. Esses métodos verificam pré-condições antes de alterar self, evitando transições impossíveis no sistema.',
        questions: [
          q(
            'O que acontece ao chamar pedido_loja.cancelar() depois que pedido_loja.enviar() já mudou o status para "enviado"?',
            'Lança ValueError porque um pedido já enviado não pode ser cancelado',
            ['Muda status para "cancelado" normalmente', 'Reinicia o status para "novo"'],
            'A guarda if self.status == "enviado": impede a transição inválida antes de modificar self.status.',
            'class PedidoOnline:\n    def __init__(self):\n        self.status = "novo"\n    def enviar(self):\n        self.status = "enviado"\n    def cancelar(self):\n        if self.status == "enviado":\n            raise ValueError("Já enviado")\n        self.status = "cancelado"\n\npedido_loja = PedidoOnline()\npedido_loja.enviar()'
          ),
          q(
            'Qual é o valor de elevador.andar após elevador.subir() e elevador.subir() em um prédio com topo=5 começando no andar 4?',
            '5',
            ['6', '4'],
            'Na primeira chamada vai de 4 para 5; na segunda, a condição self.andar < self.topo barra a subida além do limite 5.',
            'class Elevador:\n    def __init__(self, andar, topo):\n        self.andar = andar\n        self.topo = topo\n    def subir(self):\n        if self.andar < self.topo:\n            self.andar += 1\n\nelevador = Elevador(4, 5)\nelevador.subir()\nelevador.subir()'
          ),
          q(
            'Em CofreDigital.sacar(valor), por que devemos validar valor <= 0 além de valor > self.saldo?',
            'Porque sacar um valor negativo com self.saldo -= valor aumentaria o saldo indevidamente',
            ['Porque o operador -= em Python não aceita números negativos', 'Porque valores negativos transformam self.saldo em string'],
            'Subtrair um número negativo (ex.: 100 - (-50)) somaria 50 ao saldo, burlando o método depositar.'
          ),
          q(
            'Qual vantagem CatracaOnibus.registrar_passagem() traz em relação a fazer catraca.giros += 1 espalhado pelo sistema?',
            'Centraliza regras como verificar saldo do cartão e bloquear cartão vencido em um único ponto',
            ['Deixa o código duas vezes mais rápido na CPU', 'Impede que a classe tenha um método __init__'],
            'Concentrar a transição em um método garante que nenhuma parte do sistema pule validações obrigatórias.'
          ),
          t(
            'Qual valor estoque_cafe.quantidade guarda após vender(4) e repor(7) iniciando em 10?',
            '13',
            'Inicia em 10, vender(4) reduz para 6 (10 - 4) e repor(7) soma para 13 (6 + 7).',
            'class EstoqueItem:\n    def __init__(self, quantidade):\n        self.quantidade = quantidade\n    def vender(self, qtd):\n        if qtd > self.quantidade:\n            raise ValueError("Sem estoque")\n        self.quantidade -= qtd\n    def repor(self, qtd):\n        self.quantidade += qtd\n\nestoque_cafe = EstoqueItem(10)\nestoque_cafe.vender(4)\nestoque_cafe.repor(7)'
          ),
          g(
            'Complete a guarda em TarefaProjeto.concluir() para exigir que a tarefa esteja "em_andamento":',
            'self.etapa',
            'O método inspeciona o estado atual em self.etapa antes de autorizar a transição para "concluida".',
            'class TarefaProjeto:\n    def __init__(self):\n        self.etapa = "pendente"\n    def iniciar(self):\n        self.etapa = "em_andamento"\n    def concluir(self):\n        if ____ != "em_andamento":\n            raise ValueError("Inicie antes de concluir")\n        self.etapa = "concluida"'
          ),
          o(
            'Ordene a lógica interna segura do método reservar_assento(qtd) na classe SessaoCinema:',
            [
              'Verificar se qtd <= 0 e recusar entradas não positivas',
              'Verificar se qtd > self.livres para impedir superlotação',
              'Subtrair qtd de self.livres atualizando o estado da sessão',
              'Retornar self.livres atualizado para confirmação'
            ],
            'Validamos primeiro o argumento, depois a capacidade disponível no estado atual e só então efetivamos a mudança.'
          ),
          p(
            'Associe cada método de transição de AssinaturaStreaming à regra de estado que ele protege:',
            [
              ['ativar()', 'Só permite ativar quando o pagamento inicial foi confirmado'],
              ['pausar()', 'Exige que a assinatura esteja atualmente ativa'],
              ['retomar()', 'Restaura para ativa apenas uma assinatura que estava pausada'],
              ['encerrar()', 'Marca fim definitivo e bloqueia novas cobranças recorrentes']
            ],
            'Métodos nomeados pela intenção do domínio tornam o ciclo de vida do objeto explícito e seguro.'
          )
        ]
      },
      {
        id: 'py-po-2-5-revisao',
        title: 'Revisão: construtores e estado',
        subtitle: 'Revisão e desafio · Ciclo de inicialização',
        theory: 'Dominar construtores e estado exige combinar validação imediata no __init__, separação limpa entre dados de classe e de instância, padrão None para coleções opcionais e métodos que governam transições válidas. Assim, cada objeto permanece íntegro do início ao fim.',
        questions: [
          q(
            'Qual é a saída de (t1.participantes, Torneio.abertos) após criar t1 e t2 na classe Torneio?',
            '(["Ana"], 2)',
            ['(["Ana", "Bia"], 2)', '(["Ana"], 1)'],
            'participantes usa o padrão None criando listas independentes por instância, enquanto Torneio.abertos conta 2 instâncias.',
            'class Torneio:\n    abertos = 0\n    def __init__(self, participantes=None):\n        self.participantes = [] if participantes is None else list(participantes)\n        Torneio.abertos += 1\n\nt1 = Torneio(["Ana"])\nt2 = Torneio(["Bia"])'
          ),
          q(
            'No construtor de CartaoPresente, qual chamada dispara ValueError?',
            'CartaoPresente(0)',
            ['CartaoPresente(50)', 'CartaoPresente(10)'],
            'A condição credito <= 0 é verdadeira para 0, impedindo a emissão de um cartão sem crédito.',
            'class CartaoPresente:\n    def __init__(self, credito):\n        if credito <= 0:\n            raise ValueError("Crédito deve ser positivo")\n        self.credito = credito'
          ),
          q(
            'O que acontece com Bateria Carro.tensao_padrao quando fazemos b1.tensao_padrao = 24 em uma única instância b1?',
            'Continua valendo 12 na classe e nas demais instâncias, mudando para 24 só em b1',
            ['Muda para 24 em todas as baterias já criadas', 'Dispara AttributeError por tentar sobrescrever atributo de classe'],
            'Atribuir via self ou b1 cria um atributo no dicionário de b1 que sombreia o atributo de classe apenas nela.',
            'class BateriaCarro:\n    tensao_padrao = 12\n\nb1 = BateriaCarro()\nb2 = BateriaCarro()\nb1.tensao_padrao = 24'
          ),
          q(
            'Se uma lista externa lista_base = ["A"] é passada para Turma(lista_base) que faz self.alunos = list(alunos), o que ocorre em turma.alunos após lista_base.append("B")?',
            'turma.alunos permanece ["A"] porque list(alunos) copiou os elementos na entrada',
            ['turma.alunos passa a ser ["A", "B"]', 'turma.alunos é esvaziada automaticamente'],
            'Copiar a coleção recebida no __init__ evita que mutações externas alterem o estado interno da instância.'
          ),
          t(
            'Qual valor bomba.litros tem ao final das operações abastecer(15) e abastecer(20) com tanque de 100 iniciando em 30?',
            '5',
            'Começa com 30: abastecer(15) deixa 15; depois abastecer(20) não cabe (20 > 15)? Não: 30 - 15 = 15, então 20 > 15 barra ou se couber? Veja o código: começa em 40! 40 - 15 - 20 = 5.',
            'class BombaCombustivel:\n    def __init__(self, litros):\n        self.litros = litros\n    def abastecer(self, pedido):\n        if pedido > self.litros:\n            raise ValueError("Insuficiente")\n        self.litros -= pedido\n\nbomba = BombaCombustivel(40)\nbomba.abastecer(15)\nbomba.abastecer(20)'
          ),
          g(
            'Complete o incremento do atributo de classe ChamadoSuporte.sequencial dentro de __init__:',
            'ChamadoSuporte.sequencial',
            'Acessamos o contador pelo nome da classe para compartilhá-lo entre todos os chamados criados.',
            'class ChamadoSuporte:\n    sequencial = 0\n    def __init__(self, titulo):\n        ____ += 1\n        self.numero = ChamadoSuporte.sequencial\n        self.titulo = titulo'
          ),
          o(
            'Ordene o ciclo completo e seguro de vida de uma instância CofreHotel:',
            [
              'Validar no __init__ se a senha inicial possui 4 dígitos',
              'Inicializar self.trancado = True e guardar a senha validada',
              'Receber tentativa no método abrir(tentativa) verificando a senha',
              'Mudar self.trancado = False somente quando a tentativa conferir'
            ],
            'O objeto nasce válido no construtor e só transita de estado quando a regra do método abrir() é satisfeita.'
          ),
          p(
            'Relacione cada antipadrão da Unidade 2 à sua correção idiomática em Python:',
            [
              ['def __init__(self, logs=[]):', 'Usar logs=None e inicializar [] dentro do construtor'],
              ['Aceitar preco = -50 sem checar', 'Lançar ValueError no __init__ para entradas inválidas'],
              ['self.contador_global += 1', 'Incrementar NomeDaClasse.contador_global += 1'],
              ['Alterar pedido.status = "pago" direto', 'Criar método pedido.confirmar_pagamento() com validação']
            ],
            'Evitar esses quatro deslizes elimina os bugs de estado mais comuns em classes Python.'
          )
        ]
      }
    ],
    3: [
      {
        id: "py-po-3-1-invariantes",
        title: "Invariantes de domínio e integridade",
        subtitle: "Apresentação · Regras que nunca podem falhar",
        theory: "Uma invariante é uma condição de integridade que deve permanecer verdadeira durante todo o ciclo de vida do objeto. Métodos públicos protegem essa regra rejeitando transições proibidas, enquanto construtores garantem que a instância já nasça em estado válido.",
        questions: [
          q("Qual é o saldo final em cofre.saldo se tentarmos sacar 120 de uma ContaBancaria que tem 100?", "100", [" -20","0"], "O método sacar() bloqueia valores maiores que o saldo disponível, preservando a regra de não permitir saldo negativo.", "class ContaBancaria:\n    def __init__(self, saldo):\n        self._saldo = saldo\n    def sacar(self, valor):\n        if 0 < valor <= self._saldo:\n            self._saldo -= valor\n\ncofre = ContaBancaria(100)\ncofre.sacar(120)"),
          q("Em TermostatoDigital com faixa de 15 a 30 graus, o que ocorre ao chamar t.ajustar(35)?", "O valor 35 é ignorado e a temperatura permanece no valor anterior", ["A temperatura é forçada para 35","O termostato desliga automaticamente"], "O método rejeita números fora da faixa de segurança permitida pelo domínio.", "class TermostatoDigital:\n    def __init__(self, temp=20):\n        self._temp = temp\n    def ajustar(self, nova):\n        if 15 <= nova <= 30:\n            self._temp = nova\n\nt = TermostatoDigital(22)\nt.ajustar(35)"),
          q("Por que validar entradas dentro dos métodos é superior a confiar que o chamador nunca passará dados errados?", "Porque centraliza a proteção das regras do objeto impedindo corrupção de estado por qualquer parte do sistema", ["Porque acelera o processador da máquina em operações matemáticas","Porque dispensa o uso de classes e objetos no código"], "Centralizar a validação na própria classe garante que nenhuma parte externa quebre as invariantes do objeto."),
          q("Qual valor vaga_estacionamento.ocupada tem após chamar vaga.estacionar() duas vezes seguidas?", "True", ["False","None"], "A primeira chamada ocupa a vaga; a segunda detecta que já está ocupada e não altera a integridade.", "class Vaga:\n    def __init__(self):\n        self._ocupada = False\n    def estacionar(self):\n        if not self._ocupada:\n            self._ocupada = True\n\nvaga = Vaga()\nvaga.estacionar()\nvaga.estacionar()"),
          t("Qual número cronometro.segundos exibe após avancar(45) e avancar(-10) partindo do zero?", ["45"], "O avanço de -10 é rejeitado pelo teste de valor positivo (delta > 0), restando 45.", "class Cronometro:\n    def __init__(self):\n        self._segundos = 0\n    def avancar(self, delta):\n        if delta > 0:\n            self._segundos += delta\n\nc = Cronometro()\nc.avancar(45)\nc.avancar(-10)\nprint(c._segundos)"),
          g("Complete o teste de limite para garantir que a nota permaneça entre 0 e 10:", ["0 <= nova <= 10"], "A condição composta encadeada verifica se o valor está dentro do intervalo fechado permitido.", "def atualizar_nota(self, nova):\n    if ____:\n        self._nota = nova"),
          o("Ordene a sequência correta de verificação de uma invariante em um método de transferência:", ["Receber o valor desejado e a conta de destino","Verificar se o valor é positivo e menor ou igual ao saldo atual","Subtrair o valor do saldo da conta de origem","Creditar o valor na conta de destino"], "Validar as pré-condições antes de qualquer débito evita estados intermediários inconsistentes."),
          p("Associe cada violação de integridade à sua consequência de domínio:", [["Saldo bancário negativo não permitido","Quebra de contrato contábil da instituição"],["Temperatura em Kelvin abaixo de zero","Violação de lei física de valor absoluto"],["Estoque de produto com quantidade -5","Inconsistência física no inventário do armazém"],["Data de devolução anterior ao empréstimo","Erro temporal de agendamento no sistema"]], "Modelar invariantes protege o sistema contra dados incoerentes com a realidade.")
        ]
      },
      {
        id: "py-po-3-2-visibilidade",
        title: "Convenção de visibilidade e name mangling",
        subtitle: "Prática guiada · Sublinhados simples e duplos",
        theory: "Em Python, não existem modificadores de acesso rígidos como private em tempo de compilação. Um sublinhado simples (_campo) indica convenção de uso interno. Dois sublinhados (__campo) ativam name mangling, renomeando o atributo para _Classe__campo para evitar colisões em subclasses.",
        questions: [
          q("Qual é o nome real gerado no dicionário do objeto para o atributo self.__pin na classe Cofre?", "_Cofre__pin", ["__pin_privado","Cofre.__pin"], "O mecanismo de name mangling prefixa o nome da classe com um sublinhado simples antes dos dois sublinhados.", "class Cofre:\n    def __init__(self, pin):\n        self.__pin = pin\n\nc = Cofre(1234)"),
          q("O que sinaliza a um programador encontrar um atributo nomeado self._taxa_base em uma biblioteca Python?", "Que é um detalhe interno da classe e não deve ser acessado diretamente pelo código cliente", ["Que o interpretador Python apagará a variável da memória após a execução","Que o atributo é imutável e protegido por criptografia de hardware"], "A comunidade Python adota o sublinhado simples como aviso claro de que o membro é privado por convenção."),
          q("Qual exceção ocorre ao tentar ler diretamente meu_cofre.__segredo fora da classe?", "AttributeError", ["KeyError","PermissionError"], "Como o Python renomeou o atributo para _Cofre__segredo, o identificador original __segredo não existe.", "class Cofre:\n    def __init__(self, s):\n        self.__segredo = s\n\nmeu_cofre = Cofre(\"abc\")\n# print(meu_cofre.__segredo)"),
          q("Qual é a principal utilidade do name mangling (__duplo) em hierarquias de herança?", "Evitar que uma subclasse sobrescreva acidentalmente um atributo interno da classe pai com o mesmo nome", ["Tornar o código 100% à prova de invasões em sistemas bancários","Impedir a instanciação de classes filhas no programa"], "O objetivo do name mangling é evitar colisões de identificadores internos entre classes base e derivadas."),
          t("Se um objeto da classe PortaBlindada usa self.__tranca = 99, qual atributo mangled contém o valor 99?", ["_PortaBlindada__tranca"], "O padrão de transformação é sempre _NomeDaClasse__nome_do_atributo.", "class PortaBlindada:\n    def __init__(self):\n        self.__tranca = 99\n\np = PortaBlindada()"),
          g("Complete o prefixo convencional que indica que o método registrar_log é de uso interno:", ["_"], "Um sublinhado simples avisa outros desenvolvedores que o método é auxiliar e interno.", "class Servidor:\n    def ____registrar_log(self, mensagem):\n        print(f\"[LOG] {mensagem}\")"),
          o("Ordene as opções de visibilidade em Python da convenção pública até a mais restrita por name mangling:", ["identificador comum (ex: nome) como API pública","_identificador simples como convenção de uso interno","__identificador duplo ativando name mangling contra colisões"], "Essa é a progressão idiomática de visibilidade adotada no ecossistema Python."),
          p("Associe cada forma de atributo ao seu comportamento no interpretador Python:", [["self.titulo","Acesso público livre direto pelo nome"],["self._conexao","Aviso de uso interno sem alteração de nome"],["self.__token","Transformado para _Classe__token pelo interpretador"],["self.__doc__","Identificador especial reservado pela linguagem (dunder)"]], "Diferenciar os usos de sublinhados evita confusões sintáticas e conceituais.")
        ]
      },
      {
        id: "py-po-3-3-comando-consulta",
        title: "Separação entre comando e consulta",
        subtitle: "Aprofundamento · Princípio CQS",
        theory: "O princípio Command-Query Separation (CQS) dita que uma função deve alterar o estado do sistema (comando) ou retornar uma resposta sem causar efeitos colaterais (consulta), mas não ambos. Essa separação torna o comportamento dos objetos previsível e fácil de testar.",
        questions: [
          q("Segundo o princípio CQS, qual das operações abaixo é puramente uma consulta (query)?", "painel.obter_temperatura() que apenas lê e devolve o valor de self._temp", ["painel.reiniciar_sistema() que zera todos os sensores","painel.avancar_ciclo() que incrementa o contador interno"], "Consultas leem estado sem modificá-lo, permitindo chamadas repetidas com total segurança."),
          q("Por que uma consulta que também altera o estado internamente (efeito colateral) pode causar bugs sutis?", "Porque chamar a consulta para simples inspeção ou depuração altera silenciosamente o comportamento do sistema", ["Porque o Python lança SyntaxError ao retornar dados de métodos com atribuição","Porque obriga o programa a usar threads concorrentes"], "Se inspecionar um dado altera o estado, ler o mesmo dado duas vezes produzirá resultados diferentes."),
          q("Em FilaAtendimento, chamar fila.tamanho() altera a quantidade de clientes aguardando?", "Não, pois tamanho() é uma consulta de leitura que apenas retorna len(self._clientes)", ["Sim, remove o primeiro cliente da lista","Sim, adiciona um cliente nulo"], "Consultas de contagem são seguras e não modificam a coleção gerenciada pela classe.", "class FilaAtendimento:\n    def __init__(self):\n        self._clientes = []\n    def tamanho(self):\n        return len(self._clientes)"),
          q("Qual método da classe CaixaRegistradora representa um comando com alteração de estado?", "caixa.adicionar_item(preco) que soma o valor ao total acumulado", ["caixa.total_atual() que retorna o valor de self._total","caixa.esta_aberto() que verifica a flag booleana"], "Adicionar um item modifica o saldo do caixa, caracterizando um comando de negócio."),
          t("Quantas vezes podemos chamar relatorio.total_vendas() sem alterar o estado do relatório? Digite uma palavra ou infinitas.", ["infinitas"], "Métodos de consulta pura são idempotentes e livres de efeitos colaterais.", "# Consultas puras podem ser invocadas livremente sem alterar o estado do objeto"),
          g("Complete o método de consulta pura que verifica se o tanque está vazio sem alterá-lo:", ["self._litros == 0"], "Uma consulta booleana avalia a condição e retorna True ou False sem modificar os litros.", "def esta_vazio(self):\n    return ____"),
          o("Ordene a sequência típica de interação seguindo comando e consulta separados:", ["Executar consulta para verificar se a operação é permitida","Executar comando para modificar o estado interno do objeto","Executar nova consulta para inspecionar o resultado gerado"], "Separar a decisão, a mutação e a conferência torna o código expressivo e confiável."),
          p("Associe cada assinatura de método ao seu papel no princípio CQS:", [["def depositar(self, valor):","Comando que altera o saldo da conta"],["def saldo(self):","Consulta que retorna o valor financeiro atual"],["def redefinir_senha(self, nova):","Comando que substitui o hash de segurança"],["def tem_permissao(self, papel):","Consulta booleana sobre privilégios de acesso"]], "Distinguir comandos de consultas simplifica o raciocínio sobre o estado do sistema.")
        ]
      },
      {
        id: "py-po-3-4-copia-defensiva",
        title: "Cópias defensivas de coleções internas",
        subtitle: "Aplicação · Evitando mutações acidentais",
        theory: "Expor diretamente uma lista ou dicionário interno permite que código de fora altere o conteúdo do objeto sem passar pelos métodos de validação. Retornar uma cópia rasa com list(self._itens) ou tuple(self._itens) protege o encapsulamento da classe.",
        questions: [
          q("O que acontece com carrinho.itens se o método retornar list(self._itens) e o chamador fizer itens.append(\"Bolo\")?", "Apenas a cópia externa recebe \"Bolo\"; o carrinho original continua intacto", ["O carrinho recebe \"Bolo\" automaticamente pela referência","O Python lança TypeError por violação de memória"], "list(self._itens) cria um novo array na memória, isolando a lista interna de alterações feitas fora da classe.", "class Carrinho:\n    def __init__(self):\n        self._itens = [\"Cafe\"]\n    def obter_itens(self):\n        return list(self._itens)\n\nc = Carrinho()\ncopia = c.obter_itens()\ncopia.append(\"Bolo\")"),
          q("Por que retornar tuple(self._notas) é uma excelente estratégia defensiva em Boletim?", "Porque tuplas são imutáveis em Python e não possuem métodos como append() ou pop()", ["Porque tuplas só aceitam números inteiros e rejeitam strings","Porque converte todas as notas para zero automaticamente"], "A tupla impede que qualquer chamador adicione ou remova elementos do resultado recebido."),
          q("Qual é a quantidade de itens em pedido._produtos após executar produtos.clear() sobre a lista retornada sem cópia defensiva?", "0, pois o clear() esvaziou a própria lista interna por referência compartilhada", ["3, porque atributos privados ignoram clear()","1, porque o primeiro item fica travado"], "Sem cópia defensiva, quem recebe a referência pode esvaziar a coleção interna da classe.", "class Pedido:\n    def __init__(self):\n        self._produtos = [\"A\", \"B\", \"C\"]\n    def produtos_vulneravel(self):\n        return self._produtos\n\np = Pedido()\np.produtos_vulneravel().clear()"),
          q("Ao receber tags no construtor de Artigo(tags), como aplicar cópia defensiva na entrada?", "self._tags = list(tags) para não compartilhar a lista com quem chamou o construtor", ["self._tags = tags diretamente sem transformação","del tags antes de atribuir"], "Fazer a cópia na entrada garante que alterações futuras na lista de origem não afetem o objeto já criado."),
          t("Qual é o comprimento de catalogo._jogos após catalogo.listar().append(\"Z\") usando list(self._jogos)?", ["2"], "O catálogo começou com 2 jogos. Como listar() devolveu uma cópia, append alterou a cópia e deixou o catálogo com 2.", "class Catalogo:\n    def __init__(self):\n        self._jogos = [\"X\", \"Y\"]\n    def listar(self):\n        return list(self._jogos)\n\ncat = Catalogo()\ncat.listar().append(\"Z\")\nprint(len(cat._jogos))"),
          g("Complete a cópia defensiva no retorno do método obter_participantes:", ["list(self._participantes)"], "Criar uma nova lista impede mutações externas sobre a lista original.", "def obter_participantes(self):\n    return ____"),
          o("Ordene a proteção completa de uma coleção interna desde a entrada até a saída:", ["Receber a coleção externa como argumento no construtor","Armazenar uma cópia defensiva com list() no atributo interno","Validar adições de elementos exclusivamente via método específico","Retornar tupla ou cópia rasa nos métodos de consulta"], "Essa disciplina fecha todas as brechas de mutação externa direta sobre a coleção."),
          p("Associe cada técnica de coleção à sua característica de isolamento:", [["return self._dados","Vazamento de referência sem qualquer proteção"],["return list(self._dados)","Cópia rasa protege a estrutura da lista contra adições"],["return tuple(self._dados)","Retorno de coleção imutável nativa de Python"],["self._dados = list(entrada)","Isolamento de entrada no momento da instanciação"]], "Escolher a técnica correta garante integridade e performance na medida certa.")
        ]
      },
      {
        id: "py-po-3-5-revisao",
        title: "Revisão e desafio de encapsulamento",
        subtitle: "Revisão e desafio · Integridade e design sólido",
        theory: "Encapsulamento une estado e comportamento em um limite protegido. Combinando invariantes validadas, convenções de visibilidade, separação entre comandos e consultas e cópias defensivas de coleções, criamos classes robustas que não sofrem corrupção de dados.",
        questions: [
          q("Qual das opções reúne os quatro pilares do bom encapsulamento em classes Python?", "Invariantes protegidas, convenção de nomes internos, separação CQS e cópias defensivas", ["Uso de variáveis globais, eliminação de classes, prints nos métodos e herança múltipla","Criptografia de disco, ausência de testes, tipagem dinâmica pura e funções anônimas"], "Essas quatro práticas blindam os objetos contra estados inválidos e efeitos colaterais indesejados."),
          q("Em CofreDigital com senha de 6 dígitos e limite de 3 erros antes de bloquear, qual operação representa um comando seguro?", "cofre.tentar_abrir(codigo) que incrementa erros se falhar e bloqueia ao atingir 3", ["cofre.definir_erros(99) diretamente sem validação","cofre.erros = -1 pelo código cliente"], "Comandos seguros encapsulam as consequências de negócio como bloqueio automático por excesso de falhas."),
          q("Qual é o saldo final de carteira após tentar depositar -50 e depois depositar 70 com saldo inicial de 30?", "100", ["50","20"], "O depósito de -50 é descartado pela validação; 30 + 70 resulta no saldo 100.", "class Carteira:\n    def __init__(self, saldo=0):\n        self._saldo = saldo if saldo >= 0 else 0\n    def depositar(self, v):\n        if v > 0:\n            self._saldo += v\n\ncarteira = Carteira(30)\ncarteira.depositar(-50)\ncarteira.depositar(70)"),
          q("Se Biblioteca.livros retorna tuple(self._livros), o que ocorre ao tentar executar biblioteca.livros.append(\"Clean Code\")?", "O Python lança AttributeError porque o objeto tupla não possui o método append", ["O livro é adicionado normalmente","A biblioteca é excluída da memória"], "Tuplas não têm método append(), protegendo a lista original contra modificações acidentais."),
          t("Qual valor contador_falhas.total exibe após registrar 3 erros e chamar reiniciar()?", ["0"], "O método reiniciar() zera com segurança o contador de falhas acumulado.", "class ContadorFalhas:\n    def __init__(self):\n        self._erros = 0\n    def registrar(self):\n        self._erros += 1\n    def reiniciar(self):\n        self._erros = 0\n    def total(self):\n        return self._erros\n\ncf = ContadorFalhas()\ncf.registrar()\ncf.registrar()\ncf.registrar()\ncf.reiniciar()\nprint(cf.total())"),
          g("Complete o método de comando para impedir que o estoque fique negativo:", ["qtd <= self._estoque"], "Verificar a disponibilidade antes de deduzir impede estoques negativos.", "def retirar(self, qtd):\n    if 0 < ____:\n        self._estoque -= qtd\n        return True\n    return False"),
          o("Ordene os passos para desenhar uma classe com encapsulamento de nível profissional:", ["Identificar os dados de estado e as regras que nunca podem falhar","Inicializar o estado com validação e cópias defensivas no __init__","Expor comportamentos através de métodos de comando e consulta claros","Escrever testes automatizados comprovando a rejeição de entradas inválidas"], "Esse fluxo garante que a classe atenda aos requisitos com integridade verificável."),
          p("Associe cada técnica de encapsulamento ao benefício direto que ela proporciona:", [["Pré-validação no construtor","Garante que o objeto nunca nasça em estado inconsistente"],["Convenção _sublinhado","Comunica intenção de uso interno a outros desenvolvedores"],["Retorno em tupla","Evita adições ou remoções não autorizadas na coleção"],["Métodos CQS bem definidos","Elimina efeitos colaterais ocultos durante leituras"]], "O encapsulamento bem aplicado torna a manutenção do software muito mais previsível.")
        ]
      }
    ],
    4: [
      {
        id: "py-po-4-1-property-leitura",
        title: "Leitura calculada com @property",
        subtitle: "Apresentação · Sintaxe de atributo com lógica de método",
        theory: "O decorador @property transforma um método em um atributo de leitura calculada. O chamador acessa obj.area sem parênteses, mas por trás o Python executa um método que calcula o resultado sob demanda, mantendo a interface limpa e elegante.",
        questions: [
          q("Qual valor retangulo.area exibe quando largura vale 5 e altura vale 8?", "40", ["13","26"], "A property calcula 5 * 8 sob demanda e devolve 40.", "class Retangulo:\n    def __init__(self, l, a):\n        self.largura = l\n        self.altura = a\n    @property\n    def area(self):\n        return self.largura * self.altura\n\nr = Retangulo(5, 8)\nprint(r.area)"),
          q("Por que usamos r.area sem parênteses em vez de r.area()?", "Porque o decorador @property expõe o método com a mesma sintaxe de acesso a atributos", ["Porque o Python removeu parênteses de todas as funções na versão 3","Porque area é uma variável global estática"], "O propósito de @property é oferecer acesso transparente com sintaxe de atributo convencional."),
          q("O que acontece ao tentar executar r.area = 50 em uma classe que só possui @property e não possui setter?", "O Python lança AttributeError informando que o atributo não pode ser definido (can't set attribute)", ["A área é recalculada automaticamente","A classe zera a largura e a altura"], "Sem um setter explicitamente decorado, uma property é somente de leitura."),
          q("Qual é a principal vantagem de usar @property em vez de calcular e salvar a área no construtor?", "A área se mantém sempre atualizada mesmo se a largura ou altura forem alteradas posteriormente", ["A property consome menos memória física permanente no disco","Dispensa a necessidade de declarar a classe Retangulo"], "Calcular sob demanda evita inconsistências quando as dimensões do retângulo mudam."),
          t("Qual texto pessoa.nome_completo produz para nome=\"Ana\" e sobrenome=\"Silva\"?", ["Ana Silva"], "A property junta nome e sobrenome separados por espaço.", "class Pessoa:\n    def __init__(self, nome, sobrenome):\n        self.nome = nome\n        self.sobrenome = sobrenome\n    @property\n    def nome_completo(self):\n        return f\"{self.nome} {self.sobrenome}\"\n\np = Pessoa(\"Ana\", \"Silva\")\nprint(p.nome_completo)"),
          g("Complete o decorador que transforma o método em propriedade somente-leitura:", ["property"], "@property decora o método getter para acesso com sintaxe de atributo.", "____\ndef volume(self):\n    return self.largura * self.altura * self.profundidade"),
          o("Ordene a criação de uma propriedade calculada @property em Python:", ["Definir a classe com seus atributos base no construtor","Aplicar o decorador @property acima do método de leitura","Escrever o método retornando o valor calculado sob demanda","Acessar a propriedade na instância usando sintaxe de atributo simples"], "Essa estrutura padroniza a exposição de dados derivados em objetos Python."),
          p("Associe o acesso de método versus propriedade ao formato correto:", [["conta.calcular_juros()","Chamada explícita de método com parênteses"],["retangulo.area","Acesso a propriedade calculada com @property"],["p.nome_completo","Composição de texto sem parênteses via getter"],["obj.campo = valor","Tentativa de atribuição em atributo ou setter"]], "Saber diferenciar a sintaxe esperada melhora a legibilidade do código.")
        ]
      },
      {
        id: "py-po-4-2-setter-validacao",
        title: "Validação e integridade com setter",
        subtitle: "Prática guiada · O decorador @campo.setter",
        theory: "Ao associar um setter a uma @property (@campo.setter), interceptamos atribuições diretas como obj.preco = 50. Isso permite validar tipos, verificar limites numéricos e lançar ValueError antes de persistir o dado no atributo interno.",
        questions: [
          q("Qual decorador deve preceder o método que valida e altera o valor de preco?", "@preco.setter", ["@property.setter","@preco.validador"], "O setter é decorado com o nome da propriedade previamente definida com @property.", "class Produto:\n    def __init__(self, preco):\n        self.preco = preco\n    @property\n    def preco(self):\n        return self._preco\n    @preco.setter\n    def preco(self, valor):\n        if valor <= 0:\n            raise ValueError(\"Preco invalido\")\n        self._preco = valor"),
          q("O que ocorre ao executar p.preco = -10 no exemplo da classe Produto?", "O setter intercepta a atribuição e lança a exceção ValueError", ["O preço é gravado como zero","O produto é excluído do catálogo"], "A validação no setter protege o atributo contra valores negativos ou nulos."),
          q("Por que chamar self.preco = preco dentro do __init__ é uma boa prática quando existe setter?", "Porque reaproveita automaticamente a mesma validação do setter já no momento da construção", ["Porque o Python proíbe criar atributos com sublinhado no __init__","Porque dispensa o uso de parâmetros no construtor"], "Atribuir via property no __init__ garante que dados inválidos sejam barrados logo na criação da instância."),
          q("Qual é o valor final de item.quantidade após item.quantidade = 15?", "15", ["0","None"], "Como 15 é válido (maior que zero), o setter atualiza self._quantidade normalmente.", "class Item:\n    def __init__(self, q):\n        self.quantidade = q\n    @property\n    def quantidade(self):\n        return self._q\n    @quantidade.setter\n    def quantidade(self, v):\n        if v > 0:\n            self._q = v\n\nit = Item(5)\nit.quantidade = 15"),
          t("Qual número temperatura._celsius exibe após termostato.celsius = 25?", ["25"], "O setter validou o valor e atualizou o atributo interno para 25.", "class Termostato:\n    def __init__(self, c=0):\n        self.celsius = c\n    @property\n    def celsius(self):\n        return self._c\n    @celsius.setter\n    def celsius(self, v):\n        self._c = v\n\nt = Termostato()\nt.celsius = 25\nprint(t._c)"),
          g("Complete o decorador do setter para a propriedade idade:", ["idade.setter"], "O decorador usa o identificador da propriedade seguido de .setter.", "@property\ndef idade(self):\n    return self._idade\n@____\ndef idade(self, valor):\n    if valor >= 0:\n        self._idade = valor"),
          o("Ordene a definição completa de um par getter e setter com validação em Python:", ["Definir o método getter com o decorador @property","Retornar o atributo interno protegido (ex: return self._valor)","Definir o método setter com @valor.setter recebendo o novo dado","Validar o novo dado e lançar exceção ou atribuir a self._valor"], "Essa ordem é obrigatória porque o setter depende do getter já ter sido registrado."),
          p("Associe cada elemento do par de propriedades à sua responsabilidade:", [["@property def saldo(self):","Getter de leitura do saldo atual"],["@saldo.setter def saldo(self, v):","Setter de escrita com validação de valor"],["self._saldo","Atributo interno que armazena o dado real"],["raise ValueError(...)","Sinalização de entrada inválida no setter"]], "O par getter/setter atua como sentinela de acesso ao dado interno.")
        ]
      },
      {
        id: "py-po-4-3-somente-leitura",
        title: "Propriedades somente de leitura",
        subtitle: "Aprofundamento · Imutabilidade na interface pública",
        theory: "Ao definir um getter com @property e omitir intencionalmente o setter, criamos um atributo somente de leitura. Tentativas de atribuição externa são bloqueadas com AttributeError, protegendo identificadores e dados que não devem mudar após a criação.",
        questions: [
          q("Como transformar o atributo id_transacao em somente-leitura na classe Pagamento?", "Definindo @property def id_transacao(self): e não criando nenhum setter para ele", ["Usando a palavra-chave const antes da variável","Declarando a classe dentro de uma função congelada"], "A ausência do decorador @id_transacao.setter impede que novos valores sejam atribuídos externamente."),
          q("Qual mensagem de erro padrão o interpretador Python emite ao tentar atribuir em propriedade sem setter?", "AttributeError: can't set attribute", ["TypeError: immutable object","PermissionDeniedError: read only"], "O Python gera AttributeError informando explicitamente que o atributo não possui permissão de escrita."),
          q("Qual é a utilidade de expor chave_pix como propriedade somente-leitura em Conta?", "Garantir que a chave vinculada no construtor não seja adulterada durante o ciclo de vida da conta", ["Fazer a chave ser renovada a cada dez segundos","Permitir que qualquer pessoa altere o titular"], "Dados imutáveis de identificação devem ser somente-leitura para garantir integridade e rastreabilidade."),
          q("Se Sensor.timestamp é uma property somente-leitura, o método interno atualizar() da classe consegue alterar self._timestamp?", "Sim, métodos internos podem alterar self._timestamp livremente, pois o bloqueio atua na interface pública da property", ["Não, o atributo interno também fica travado para sempre","Apenas se a classe herdar de object"], "A restrição protege a interface pública vista de fora; a implementação interna controla a atualização."),
          t("Qual número transacao.protocolo retorna para um pagamento criado com código 7788?", ["7788"], "A propriedade somente-leitura expõe o protocolo original cadastrado no construtor.", "class Pagamento:\n    def __init__(self, proto):\n        self._proto = proto\n    @property\n    def protocolo(self):\n        return self._proto\n\npg = Pagamento(7788)\nprint(pg.protocolo)"),
          g("Complete a property somente-leitura para expor a data de criacao sem setter:", ["self._criado_em"], "O getter retorna a data interna; a omissão do setter torna o atributo imutável de fora.", "@property\ndef criado_em(self):\n    return ____"),
          o("Ordene a criação e teste de uma propriedade segura somente-leitura:", ["Receber o identificador no construtor e guardar em self._id","Declarar o getter com @property retornando self._id","Omitir propositalmente qualquer método com @id.setter","Confirmar em teste que obj.id = 999 levanta AttributeError"], "Garantir e testar a ausência de setter consolida a imutabilidade pública."),
          p("Associe cada caso de uso à necessidade de setter ou somente-leitura:", [["CPF do titular de uma conta bancária","Propriedade somente-leitura sem setter"],["Limite de crédito de um cartão","Propriedade com setter para ajustes permitidos"],["UUID identificador de um pedido","Propriedade somente-leitura imutável"],["Endereço de entrega de uma encomenda","Propriedade com setter para atualização cadastral"]], "Adequar a visibilidade da escrita ao domínio evita mutações indevidas no sistema.")
        ]
      },
      {
        id: "py-po-4-4-refatoracao-transparente",
        title: "Refatoração transparente de atributos",
        subtitle: "Aplicação · Evolução sem quebrar clientes",
        theory: "Em Python, começamos com atributos públicos simples (obj.preco). Se mais tarde precisarmos adicionar validação ou cálculo, transformamos o atributo em @property sem alterar nenhuma linha do código cliente que já usa obj.preco, mantendo total compatibilidade.",
        questions: [
          q("Qual é o princípio de design de Python ilustrado por começar com atributo público e evoluir para @property?", "Princípio do Acesso Uniforme (Uniform Access Principle)", ["Princípio da Herança Infinita","Princípio do Polimorfismo Obrigatório"], "O código cliente acessa o membro com a mesma sintaxe (p.preco), seja ele um atributo simples ou uma propriedade calculada."),
          q("Uma biblioteca pública tinha p.preco = 10. Ao refatorar para adicionar validação com @property e setter, o código dos usuários quebra?", "Não, porque a sintaxe de leitura (p.preco) e escrita (p.preco = 10) continua exatamente idêntica", ["Sim, todos os usuários são obrigados a mudar para p.set_preco(10)","Sim, o Python exige reescrever todas as chamadas"], "A refatoração com @property é 100% transparente e preserva retrocompatibilidade com código existente."),
          q("Por que em Python não é idiomático criar get_preco() e set_preco() preventivamente em todas as classes desde o início?", "Porque podemos transformar atributos públicos em properties a qualquer momento no futuro sem quebrar a API pública", ["Porque o Python proíbe métodos com prefixo get_","Porque métodos get e set consomem toda a CPU do servidor"], "Evitar getters e setters vazios no início mantém o código conciso e limpo (Pythonic)."),
          q("Durante a refatoração de Produto, onde o dado antigo self.preco deve ser armazenado para não entrar em recursão infinita no setter?", "Em um atributo com sublinhado como self._preco", ["Em self.preco novamente sem sublinhado","Em uma variável local temporária que é apagada"], "O setter deve gravar em self._preco; se atribuísse a self.preco, chamaria o próprio setter recursivamente até estourar a pilha."),
          t("Qual saldo conta.saldo exibe após refatorar o atributo para property com validação e depositar 50 sobre 100?", ["150"], "A property calculou 100 + 50 e manteve a mesma interface para quem lê conta.saldo.", "class Conta:\n    def __init__(self, saldo):\n        self._saldo = saldo\n    @property\n    def saldo(self):\n        return self._saldo\n    def depositar(self, v):\n        self._saldo += v\n\nc = Conta(100)\nc.depositar(50)\nprint(c.saldo)"),
          g("Complete o setter refatorado para evitar recursão infinita ao gravar o valor:", ["self._limite"], "O setter precisa atualizar o atributo interno com sublinhado para não chamar a si mesmo.", "@limite.setter\ndef limite(self, novo):\n    if novo >= 0:\n        ____ = novo"),
          o("Ordene a refatoração segura de um atributo público para uma property com validação:", ["Renomear o armazenamento interno de self.dado para self._dado no construtor","Criar o método @property def dado(self): retornando self._dado","Criar o método @dado.setter def dado(self, v): validando antes de gravar","Executar os testes existentes garantindo que nenhuma chamada quebrou"], "Essa refatoração adiciona regras de negócio sem exigir alteração nos consumidores da classe."),
          p("Associe o estilo de código à linguagem ou paradigma:", [["obj.getPreco() e obj.setPreco(10)","Estilo tradicional preventivo de Java / C++ antigo"],["obj.preco e @property quando necessário","Estilo idiomático e enxuto de Python"],["self._preco = v no setter","Armazenamento interno para evitar recursão infinita"],["p.preco = 50 disparando validação","Uso transparente da interface pública refatorada"]], "Compreender essas diferenças evita código burocrático desnecessário em Python.")
        ]
      },
      {
        id: "py-po-4-5-revisao",
        title: "Revisão e desafio de propriedades",
        subtitle: "Revisão e desafio · Domínio completo de @property",
        theory: "Propriedades combinam a simplicidade visual de atributos com o poder e a segurança de métodos. Dominar getters calculados, setters com validação estrita e propriedades somente-leitura permite construir modelos de domínio expressivos, seguros e fáceis de evoluir.",
        questions: [
          q("Qual é a principal responsabilidade do decorador @property na orientação a objetos em Python?", "Expor cálculo sob demanda e encapsular o acesso a atributos internos com sintaxe limpa", ["Converter a classe inteira em um dicionário estático JSON","Remover todos os métodos especiais da instância"], "@property une encapsulamento, validação e elegância sintática no modelo de objetos."),
          q("Em Termometro com leitura em celsius e fahrenheit, qual é a melhor implementação para fahrenheit?", "Uma @property calculada que retorna (self.celsius * 9/5) + 32 sob demanda", ["Uma variável global externa que armazena a última conversão","Um loop while que recalcula a temperatura continuamente"], "Calcular a conversão sob demanda via property garante que qualquer alteração em celsius reflita em fahrenheit."),
          q("Se tentarmos fazer usuario.cpf = \"novo\" em uma classe com @property def cpf sem setter, qual é o resultado?", "Ocorre AttributeError porque uma propriedade sem setter é imutável para escrita externa", ["O CPF é atualizado com sucesso","O usuário é desconectado da sessão"], "A ausência do setter impede qualquer substituição do valor pela interface pública."),
          q("Qual é a área calculada de um Triangulo com base=10 e altura=6 acessada via t.area?", "30.0", ["60.0","16.0"], "A property calcula (10 * 6) / 2 = 30.0.", "class Triangulo:\n    def __init__(self, b, a):\n        self.base = b\n        self.altura = a\n    @property\n    def area(self):\n        return (self.base * self.altura) / 2\n\nt = Triangulo(10, 6)"),
          t("Qual valor retangulo.diagonal exibe para base=3 e altura=4 usando a property calculada?", ["5.0"], "A property calcula (3**2 + 4**2)**0.5 = (9 + 16)**0.5 = 25**0.5 = 5.0.", "class Retangulo:\n    def __init__(self, b, h):\n        self.b = b\n        self.h = h\n    @property\n    def diagonal(self):\n        return (self.b**2 + self.h**2) ** 0.5\n\nr = Retangulo(3, 4)\nprint(r.diagonal)"),
          g("Complete a declaração do setter para a propriedade velocidade:", ["velocidade.setter"], "O decorador usa o nome do getter associado à palavra .setter.", "@property\ndef velocidade(self):\n    return self._v\n@____\ndef velocidade(self, valor):\n    self._v = valor if valor >= 0 else 0"),
          o("Ordene a auditoria de qualidade de uma classe Python que faz uso de propriedades:", ["Verificar se atributos calculados estão decorados com @property em vez de armazenados duplicados","Conferir se setters realizam validação adequada e usam sublinhado no armazenamento interno","Confirmar que dados estritamente imutáveis possuem getter sem setter correspondente","Executar testes garantindo que atribuições inválidas levantem exceções adequadas"], "Essa auditoria garante que a modelagem dos objetos seja robusta e à prova de falhas."),
          p("Associe cada caso de aplicação ao tipo de propriedade ideal:", [["Área e perímetro de figuras geométricas","Propriedades calculadas dinamicamente sob demanda"],["Nota de 0 a 10 com lançamento de ValueError","Propriedade com setter contendo validação estrita"],["Identificador UUID de registro no banco","Propriedade somente-leitura sem setter público"],["Atributo antigo migrado sem quebrar clientes","Refatoração transparente com getter e setter"]], "As properties atendem com excelência a todos esses cenários no ecossistema Python.")
        ]
      }
    ]
  });
})();
