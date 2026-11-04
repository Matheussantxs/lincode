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
  window.PYTHON_CHAPTER_UNITS.qualidade = Object.assign(window.PYTHON_CHAPTER_UNITS.qualidade || {}, {
    1: [
      {
        id: "py-qual-1-1-reprodutibilidade",
        title: "Reprodutibilidade e isolamento de ambientes",
        subtitle: "Conceito · Garantindo comportamento idêntico entre máquinas",
        theory: "A reprodutibilidade assegura que uma aplicação funcione exatamente da mesma forma em computadores de outros desenvolvedores, servidores de integração contínua e ambientes de produção. O isolamento de dependências e a fixação estrita de versões evitam o clássico erro \"funciona na minha máquina\".",
        questions: [
          q("Qual é o principal objetivo da reprodutibilidade em projetos de software?", "Garantir que o código execute com os mesmos resultados em qualquer máquina", ["Acelerar o processador do computador","Permitir programar sem testar o código"], "Ambientes consistentes eliminam falhas ocultas causadas por versões conflitantes de bibliotecas."),
          q("Por que instalar bibliotecas no Python global do sistema operacional é uma má prática?", "Pode quebrar ferramentas do próprio sistema e causar conflitos entre projetos com requisitos distintos", ["Porque o Python cobra licença por biblioteca instalada no sistema","Porque a instalação global deleta o histórico do terminal"], "Diferentes projetos podem exigir versões incompatíveis da mesma biblioteca (ex: Django 3 vs Django 5)."),
          q("O que significa o termo \"pinning\" de dependências?", "Fixar a versão exata de cada biblioteca requerida pelo projeto (ex: requests==2.31.0)", ["Fixar o arquivo na barra de tarefas do sistema operacional","Proibir a adição de novas funções no código"], "O pinning impede que uma atualização automática com breaking changes quebre o sistema em produção."),
          q("Qual arquivo tradicional da comunidade Python registra dependências com suas versões?", "requirements.txt", ["dependencies.dll","config.sys"], "requirements.txt armazena os pacotes que podem ser instalados com pip install -r requirements.txt."),
          t("Qual comando do pip gera a lista de dependências instaladas com suas versões exatas?", ["pip freeze"], "pip freeze emite a lista de pacotes e versões no formato aceito pelo requirements.txt.", "# pip freeze > requirements.txt"),
          g("Complete o comando que instala as dependências declaradas no arquivo do projeto:", ["pip install -r requirements.txt"], "A flag -r lê o arquivo de manifesto de dependências.", "____ // instala todas as dependencias listadas no arquivo"),
          o("Ordene as etapas recomendadas para configurar um projeto Python reproduzível:", ["Criar um ambiente virtual isolado com python -m venv .venv","Ativar o ambiente virtual no terminal atual do projeto","Instalar os pacotes necessários utilizando o comando pip install","Congelar e versionar as dependências fixadas no arquivo requirements.txt"], "Fluxo canônico para garantir que o ambiente possa ser replicado em qualquer máquina."),
          p("Associe o conceito ao seu papel na garantia de reprodutibilidade:", [["Ambiente virtual (.venv)","Isola o interpretador e bibliotecas em uma pasta local do projeto"],["requirements.txt","Manifesto declarativo contendo os pacotes e versões fixadas"],["pip freeze","Comando que lista os pacotes atualmente presentes no ambiente ativo"],["Pinning (==)","Operador que trava a versão exata impedindo quebras inesperadas"]], "Fundamentos de gestão de ambientes e engenharia de software em Python.")
        ]
      },
      {
        id: "py-qual-1-2-anatomia-teste",
        title: "Anatomia de um caso de teste: AAA (Arrange, Act, Assert)",
        subtitle: "Estruturação · Organizando premissas, execução e verificação",
        theory: "O padrão AAA (Arrange, Act, Assert) organiza os testes automatizados em três fases claras e sequenciais. O Arrange prepara os dados, estados e premissas. O Act executa a função ou método sob avaliação. O Assert valida se o resultado obtido coincide rigorosamente com o comportamento esperado pela especificação.",
        questions: [
          q("Quais são as três fases sequenciais do padrão de teste AAA?", "Arrange (Organizar), Act (Agir) e Assert (Verificar)", ["Add, Alter e Abort","Ask, Answer e Apply"], "Essa estrutura tripartida padroniza a legibilidade e facilita a identificação imediata de defeitos."),
          q("O que é executado durante a fase \"Arrange\" de um caso de teste?", "Configuração inicial de variáveis, instanciação de objetos e preparação dos dados de entrada", ["A chamada da função principal do teste","A validação final das variáveis de saída"], "Garante que o cenário de teste parta de um estado conhecido e previsível."),
          q("O que deve acontecer preferencialmente durante a fase \"Act\"?", "Uma única ação ou invocação direta da funcionalidade que está sendo testada", ["A limpeza dos arquivos do disco","A declaração de todas as variáveis do sistema"], "Manter o foco em uma única ação evita testes ambíguos e difíceis de depurar."),
          q("Qual é a consequência de incluir múltiplos \"Asserts\" não relacionados em um único teste?", "Se o primeiro assert falhar, o teste é interrompido sem validar as demais hipóteses", ["O interpretador Python recompila o arquivo em modo estrito","O teste roda mais rápido porque pula verificações"], "Testes coesos focam em um comportamento específico facilitando o diagnóstico da falha."),
          t("Qual palavra-chave nativa do Python é utilizada para asserções diretas de validação?", ["assert"], "assert condicao, mensagem avalia se a expressão resulta em True.", "# valida condicao esperada"),
          g("Complete o teste unitário respeitando a fase Assert com a palavra-chave nativa:", ["def test_soma():\n    resultado = somar(2, 3)\n    assert resultado == 5"], "assert valida se a operação produziu o valor esperado 5.", "def test_soma():\n    resultado = somar(2, 3)\n    ____"),
          o("Ordene as etapas canônicas de execução de um teste unitário:", ["Arrange: preparar valores de entrada e instanciar dependências","Act: chamar a função ou método que se deseja avaliar","Assert: verificar se a saída ou efeito colateral confere com o esperado","Cleanup: liberar recursos alocados se necessário"], "Ciclo de vida de um caso de teste baseado nas melhores práticas da engenharia."),
          p("Associe a fase do padrão AAA à sua respectiva responsabilidade:", [["Arrange","Prepara dados de entrada, mocks e estado inicial necessário"],["Act","Executa o comportamento ou função sob avaliação pontual"],["Assert","Compara o resultado retornado com o valor esperado pelo contrato"],["AssertionError","Exceção levantada pelo Python quando o assert avalia para False"]], "Elementos centrais da arquitetura de testes automatizados.")
        ]
      },
      {
        id: "py-qual-1-3-testes-regressao",
        title: "Testes de regressão e garantia contínua",
        subtitle: "Prevenção · Blindando o código contra reaparecimento de bugs",
        theory: "Um teste de regressão é escrito especificamente para reproduzir um bug recém-descoberto antes de sua correção. Uma vez corrigido o defeito, o teste passa a rodar continuamente na suíte automatizada, impedindo de forma permanente que alterações futuras reintroduzam o mesmo erro no sistema.",
        questions: [
          q("Qual é o propósito fundamental de um teste de regressão?", "Garantir que bugs já corrigidos no passado não voltem a ocorrer no futuro", ["Deixar a execução do código mais lenta","Substituir a documentação do projeto por completo"], "A regressão protege o software contra efeitos colaterais indesejados ao introduzir novas funcionalidades."),
          q("Qual é a primeira etapa ao receber o relatório de um bug em produção?", "Escrever um teste automatizado que reproduza o erro e falhe comprovando o problema", ["Editar o código de produção imediatamente sem registrar o erro","Deletar o banco de dados para limpar o histórico"], "O teste que falha fornece a comprovação objetiva e o critério de término da correção."),
          q("Quando um bug corrigido é considerado efetivamente resolvido?", "Quando o teste de regressão passa com sucesso e todos os testes anteriores continuam verdes", ["Quando o desenvolvedor diz que testou manualmente na sua máquina","Quando o arquivo de log para de exibir avisos"], "Evita correções que quebram outros módulos do ecossistema sem aviso."),
          q("Por que suítes de regressão completas devem ser executadas antes de cada deploy?", "Para certificar que nenhuma funcionalidade existente foi danificada pelas novas alterações", ["Para verificar se o servidor de banco de dados mudou de endereço","Para gerar backups automáticos no computador do cliente"], "Proporciona confiança para refatorações e entregas contínuas em ciclos curtos."),
          t("Qual cor no terminal tradicionalmente indica que todos os testes foram aprovados?", ["verde"], "Testes verdes representam sucesso na execução (green bar).", "# green indica que todos os testes passaram"),
          g("Complete o teste de regressão para verificar se lista vazia não lança exceção:", ["def test_calculo_lista_vazia():\n    assert calcular_media([]) == 0.0"], "Garante que a função trate a lista vazia sem levantar ZeroDivisionError.", "def test_calculo_lista_vazia():\n    ____ // assert para lista vazia retornando 0.0"),
          o("Ordene o fluxo profissional de tratamento e correção de um bug:", ["Receber o relatório do bug e coletar dados do ambiente afetado","Escrever um teste automatizado que reproduza a falha exatamente","Executar o teste e constatar que ele falha (teste vermelho)","Implementar a correção no código até que o teste seja aprovado (teste verde)"], "Metodologia test-first aplicada à manutenção corretiva de software."),
          p("Associe o termo de teste ao seu significado prático:", [["Teste de regressão","Teste que blinda o sistema contra o retorno de bugs já resolvidos"],["Teste vermelho (Red)","Fase em que o teste falha, comprovando a existência da falha"],["Teste verde (Green)","Fase em que o teste passa, comprovando a correção satisfatória"],["Refatoração (Refactor)","Melhoria estrutural do código mantendo os testes aprovados"]], "Conceitos fundamentais da dinâmica de correção e evolução de código.")
        ]
      }
    ],
    2: [
      {
        id: "py-qual-2-1-criacao-venv",
        title: "Criação e ativação de ambientes com python -m venv",
        subtitle: "Operação · Isolando interpretador e bibliotecas por projeto",
        theory: "O módulo nativo venv cria ambientes virtuais leves com seus próprios diretórios de pacotes e atalhos para o interpretador. O comando python -m venv .venv cria a pasta do ambiente. Sua ativação ajusta a variável PATH no terminal atual, priorizando os executáveis daquele ambiente específico.",
        questions: [
          q("Qual comando da biblioteca padrão cria um ambiente virtual na pasta .venv?", "python -m venv .venv", ["python create env","pip venv new"], "python -m venv executa o módulo embutido venv criando a estrutura isolada no diretório."),
          q("O que a ativação de um ambiente virtual altera principalmente na sessão do terminal?", "Modifica a variável de ambiente PATH para apontar para a pasta de scripts do ambiente", ["Apaga as variáveis de sistema do computador","Desativa o firewall do sistema operacional"], "Faz com que comandos como python e pip apontem para a pasta isolada e não para o sistema global."),
          q("Qual script é executado no Windows via PowerShell para ativar um ambiente virtual?", ".venv\\Scripts\\Activate.ps1", [".venv/bin/activate.sh","python activate.exe"], "No Windows o diretório de executáveis chama-se Scripts, enquanto no Linux/macOS chama-se bin."),
          q("Por que a pasta do ambiente virtual (.venv) nunca deve ser commitada no Git?", "Porque contém binários específicos da arquitetura da máquina local e ocupa centenas de MB", ["Porque o Git rejeita pastas que começam com ponto","Porque o Python apaga o repositório se encontrar o venv"], "O repositório deve guardar apenas manifestos de dependências; o ambiente deve ser gerado sob demanda."),
          t("Qual comando desativa o ambiente virtual ativo no terminal atual?", ["deactivate"], "deactivate restaura as variáveis de ambiente originais da sessão do shell.", "# restaura o PATH original"),
          g("Complete o comando para criar um ambiente virtual chamado \"meu_env\":", ["python -m venv meu_env"], "venv é invocado com a flag -m seguida do nome da pasta desejada.", "____ // comando que invoca o modulo venv criando meu_env"),
          o("Ordene as etapas para criar, ativar e usar um ambiente virtual no Windows:", ["Abrir o terminal na pasta raiz do projeto","Executar python -m venv .venv para gerar o diretório isolado","Ativar o ambiente com .venv\\Scripts\\Activate.ps1","Instalar dependências com pip install de forma isolada"], "Sequência básica de configuração de ambiente de trabalho em Python."),
          p("Associe o comando ou pasta à sua função no ecossistema venv:", [["python -m venv .venv","Cria o diretório com a estrutura isolada do ambiente"],[".venv/Scripts (Windows)","Contém o interpretador python.exe, pip.exe e scripts de ativação"],[".venv/Lib/site-packages","Diretório onde pacotes de terceiros instalados são armazenados"],["deactivate","Comando que encerra a sessão ativa do ambiente virtual"]], "Anatomia e ciclo de vida de ambientes virtuais em Python.")
        ]
      },
      {
        id: "py-qual-2-2-pip-requirements",
        title: "Gerenciamento com pip e requirements.txt",
        subtitle: "Dependências · Fixação estrita de versões (pinning) para produção",
        theory: "O pip é o instalador de pacotes oficial do Python que baixa distribuições do PyPI (Python Package Index). O arquivo requirements.txt lista pacotes e operadores de versão. Para ambientes de produção estáveis, recomenda-se usar == para garantir que atualizações não introduzam incompatibilidades inesperadas.",
        questions: [
          q("O que significa o operador == em uma declaração de dependência no requirements.txt?", "Exige exatamente aquela versão específica (ex: flask==3.0.0)", ["Aceita qualquer versão superior à especificada","Exclui a versão indicada da instalação"], "Garante que a versão testada seja exatamente a versão utilizada em tempo de execução."),
          q("Qual operador no requirements.txt aceita atualizações compatíveis (ex: ~=2.8)?", "~=", ["==","!="], "~=2.8 aceita versões como 2.8.1 e 2.9, mas bloqueia mudanças maiores como 3.0."),
          q("O que a flag -r faz no comando pip install -r requirements.txt?", "Indica ao pip para ler e instalar os pacotes listados dentro do arquivo especificado", ["Reinstala o Python do zero","Executa os testes em modo recursivo"], "A flag -r (requirement) permite processar manifestos completos de forma automatizada."),
          q("Qual é o repositório público oficial de pacotes da comunidade Python consultado pelo pip?", "PyPI (Python Package Index)", ["Maven Central","NPM Registry"], "O PyPI hospeda centenas de milhares de pacotes de código aberto para a linguagem Python."),
          t("Qual comando do pip atualiza um pacote existente para sua versão mais recente?", ["pip install --upgrade"], "A flag --upgrade (ou -U) faz o download da versão mais recente compatível.", "# atualiza o pacote especificado"),
          g("Complete a instalação da versão exata 2.31.0 da biblioteca requests:", ["pip install requests==2.31.0"], "O operador == fixa a versão exata no comando de instalação.", "____ // comando pip instalando requests travado na 2.31.0"),
          o("Ordene as etapas para adicionar uma nova biblioteca ao projeto e atualizar o manifesto:", ["Ativar o ambiente virtual isolado do projeto no terminal","Instalar a nova biblioteca utilizando pip install nome_pacote","Verificar se a aplicação e os testes funcionam com a nova versão","Atualizar o requirements.txt com pip freeze > requirements.txt"], "Boas práticas para versionamento contínuo de dependências."),
          p("Associe o operador de versão do requirements.txt ao seu significado:", [["requests==2.31.0","Versão estritamente idêntica a 2.31.0"],["pandas>=2.0.0","Qualquer versão igual ou superior a 2.0.0"],["urllib3<3.0.0","Qualquer versão inferior a 3.0.0"],["pytest~=7.4.0","Versão compatível na mesma série menor (7.4.x)"]], "Operadores de compatibilidade e controle de versões de bibliotecas.")
        ]
      },
      {
        id: "py-qual-2-3-desinstalacao-freeze",
        title: "pip freeze, inspeção e limpeza de pacotes",
        subtitle: "Diagnóstico · Rastreando pacotes instalados e dependências transitivas",
        theory: "O comando pip freeze inspeciona o site-packages ativo e exibe todos os pacotes instalados com suas versões no formato aceito pelo requirements.txt. Dependências transitivas (bibliotecas exigidas pelas suas bibliotecas) também são listadas, permitindo capturar o estado real e determinístico da máquina.",
        questions: [
          q("O que são dependências transitivas em um projeto Python?", "Bibliotecas que suas dependências diretas precisam para funcionar", ["Pacotes que transitam entre Python e JavaScript","Módulos deletados do disco"], "Por exemplo, instalar requests baixa transitivamente urllib3, certifi, charset-normalizer e idna."),
          q("Qual é a diferença entre pip list e pip freeze?", "pip freeze formata a saída pronta para requirements.txt, enquanto pip list exibe formato tabular humano", ["pip freeze congela o computador","pip list só exibe pacotes nativos"], "pip freeze foi projetado especificamente para redirecionamento em arquivos de manifesto."),
          q("Como desinstalar um pacote que não é mais utilizado no ambiente virtual?", "pip uninstall nome_pacote", ["pip delete nome_pacote","pip remove-all"], "pip uninstall remove os arquivos do pacote do diretório site-packages com confirmação."),
          q("Qual comando do pip inspeciona os detalhes e dependências de um pacote instalado?", "pip show nome_pacote", ["pip inspect-all","pip scan"], "pip show exibe versão, autor, localização no disco e bibliotecas exigidas pelo pacote."),
          t("Qual comando do pip verifica se as dependências instaladas possuem conflitos de versão?", ["pip check"], "pip check valida a árvore de dependências procurando incompatibilidades.", "# valida integridade da arvore de dependencias"),
          g("Complete o comando que salva a lista exata de dependências em um arquivo:", ["pip freeze > requirements.txt"], "O operador > redireciona a saída do pip freeze para o arquivo.", "____ // redireciona freeze para requirements.txt"),
          o("Ordene as etapas para remover com segurança uma biblioteca obsoleta:", ["Desinstalar o pacote do ambiente virtual com pip uninstall","Executar pip check para garantir que nenhuma dependência restante foi quebrada","Rodar a suíte de testes automatizados para verificar ausência de efeitos colaterais","Regenerar o requirements.txt com pip freeze para atualizar o manifesto"], "Procedimento seguro para expurgo de dependências mortas."),
          p("Associe o comando do pip ao seu diagnóstico correspondente:", [["pip freeze","Exibe todos os pacotes e versões fixadas em formato para arquivo"],["pip list","Exibe tabela com nome e versão de todos os pacotes instalados"],["pip show requests","Mostra metadados detalhados, pasta e dependências de requests"],["pip check","Verifica se existem conflitos ou dependências quebradas no ambiente"]], "Comandos essenciais de inspeção e auditoria de pacotes com pip.")
        ]
      },
      {
        id: "py-qual-2-4-ferramentas-modernas",
        title: "Gerenciadores modernos: uv, poetry e pipx",
        subtitle: "Ecossistema · Agilidade na resolução de dependências e isolamento",
        theory: "O ecossistema moderno de ferramentas Python introduziu utilitários de alta velocidade e gerenciadores de projetos completos. O uv (escrito em Rust) resolve e instala dependências até 100 vezes mais rápido que o pip tradicional. O poetry gerencia ambientes e travas com poetry.lock, e o pipx isola aplicações de CLI.",
        questions: [
          q("Qual é a principal característica que torna o uv tão rápido comparado ao pip tradicional?", "É implementado em Rust com algoritmos de resolução otimizados e cache agressivo", ["Ele não instala pacotes de verdade","Ele só funciona em supercomputadores"], "O uv é um substituto ultra-rápido para pip e venv mantido pela Astral."),
          q("Qual é a função do arquivo poetry.lock em projetos gerenciados pelo Poetry?", "Registrar a árvore exata de dependências com hashes criptográficos para garantir instalações 100% idênticas", ["Bloquear o arquivo para edição de outros programadores","Criptografar as senhas do banco de dados"], "Garante determinismo absoluto entre diferentes ambientes de desenvolvimento e produção."),
          q("Qual ferramenta é recomendada para instalar aplicações de linha de comando Python globalmente de forma isolada?", "pipx", ["global-pip","os-install"], "pipx cria um ambiente virtual isolado para cada aplicativo de terminal (ex: ruff, black, mypy)."),
          q("Como o uv pode ser utilizado para criar um ambiente virtual instantaneamente?", "uv venv", ["uv make-env","uv new-python"], "uv venv cria a estrutura de diretórios em milissegundos."),
          t("Qual ferramenta moderna unifica empacotamento, dependências e publicação com pyproject.toml?", ["poetry"], "Poetry é um dos gerenciadores de projetos mais populares da comunidade Python.", "# gerenciador unificado com pyproject.toml"),
          g("Complete o comando do uv que instala dependências lendo um requirements.txt:", ["uv pip install -r requirements.txt"], "O uv disponibiliza a interface uv pip compatível com a sintaxe do pip tradicional.", "____ // comando uv equivalente ao pip install com flag -r"),
          o("Ordene os estágios de resolução e bloqueio de dependências com Poetry:", ["Declarar as dependências desejadas no arquivo pyproject.toml","Executar poetry lock para resolver a árvore completa e gerar hashes","Gerar o arquivo poetry.lock contendo todas as versões exatas travadas","Executar poetry install para sincronizar o ambiente virtual do projeto"], "Fluxo determinístico de gestão de projetos modernos com Poetry."),
          p("Associe a ferramenta moderna ao seu propósito principal:", [["uv","Substituto ultra-rápido em Rust para pip, venv e resolução de pacotes"],["Poetry","Gerenciador completo de projetos, resolução determinística e build"],["pipx","Executa e instala utilitários de CLI em ambientes virtuais isolados"],["poetry.lock","Arquivo de trava com versões e hashes de integridade"]], "Panorama das ferramentas de empacotamento e gestão na era moderna do Python.")
        ]
      },
      {
        id: "py-qual-2-5-dependencias-dev",
        title: "Separação de dependências: produção vs desenvolvimento",
        subtitle: "Arquitetura · Mantendo o contêiner de produção enxuto e seguro",
        theory: "Projetos profissionais separam dependências necessárias para executar a aplicação em produção daquelas usadas apenas para desenvolvimento, testes e lint (como pytest, ruff e mypy). Essa segregação reduz o tamanho das imagens de contêineres Docker, acelera deploys e diminui superfícies de ataque.",
        questions: [
          q("Por que ferramentas como pytest e black não devem ser instaladas na imagem Docker de produção?", "Porque aumentam o tamanho da imagem, consomem memória e ampliam a superfície de potenciais vulnerabilidades", ["Porque impedem o servidor de iniciar","Porque o Python proíbe testes em servidores"], "Apenas pacotes indispensáveis para a execução do serviço devem estar no contêiner de produção."),
          q("Qual é a convenção clássica para separar dependências usando múltiplos arquivos requirements?", "Criar requirements.txt (produção) e requirements-dev.txt (desenvolvimento)", ["Salvar tudo no mesmo arquivo com comentários","Criar um arquivo por cada função do projeto"], "requirements-dev.txt costuma incluir a linha -r requirements.txt para herdar a base de produção."),
          q("Como a especificação moderna PEP 621 no pyproject.toml organiza dependências de desenvolvimento?", "Na seção [project.optional-dependencies] sob chaves como dev ou test", ["Em variáveis globais de sistema","Em uma pasta oculta chamada .dev"], "Permite instalar com pip install .[dev] ou poetry install --with dev."),
          q("O que acontece ao instalar um pacote de teste com flag opcional pip install .[dev]?", "Instala o pacote base junto com o grupo opcional de ferramentas de teste declarado no pyproject.toml", ["Apaga a versão de produção do banco","Transforma os arquivos .py em binários"], "Padroniza a instalação de ferramentas extras sem duplicar manifestos no repositório."),
          t("Qual instrução em requirements-dev.txt importa todo o conteúdo do requirements.txt principal?", ["-r requirements.txt"], "Permite herdar os pacotes de produção sem duplicar linhas de dependência.", "# herda manifesto base de producao"),
          g("Complete o comando que instala as dependências de desenvolvimento a partir do manifesto:", ["pip install -r requirements-dev.txt"], "Instala tanto as ferramentas de dev quanto as bibliotecas herdadas de produção.", "____ // comando pip instalando manifesto de desenvolvimento"),
          o("Ordene as camadas de uma imagem Docker multi-estágio para Python:", ["Estágio builder: instalar compiladores e dependências de build","Estágio test: rodar linter e pytest com dependências de desenvolvimento","Estágio final: copiar apenas dependências estritas de produção para imagem limpa","Definir usuário sem privilégios de root para executar a aplicação"], "Padrão multi-stage build para segurança e redução de pegada de contêineres."),
          p("Associe o grupo de dependência ao seu ambiente de destino apropriado:", [["fastapi, uvicorn, sqlalchemy","Dependências estritas de produção (tempo de execução)"],["pytest, pytest-cov","Ferramentas de teste e métricas de cobertura (desenvolvimento/CI)"],["ruff, black, mypy","Linters, formatadores e checadores estáticos de tipos (local/CI)"],["requirements-dev.txt","Manifesto estendido para desenvolvedores e pipelines de teste"]], "Estratégias de segregação de dependências e boas práticas operacionais.")
        ]
      }
    ],
    3: [
      {
        id: "py-qual-3-1-pytest-execucao",
        title: "Introdução ao pytest: descoberta e asserções nativas",
        subtitle: "Execução · Escrevendo testes legíveis sem boilerplate",
        theory: "O framework pytest é o padrão de fato para testes em Python. Ele descobre automaticamente arquivos iniciados por test_ ou finalizados por _test.py, funções que começam com test_ e avalia asserções usando o comando assert nativo com detalhamento avançado de expressões em caso de falha.",
        questions: [
          q("Qual convenção de nomenclatura de arquivos o pytest utiliza por padrão para descoberta de testes?", "Arquivos iniciados com test_ ou terminados com _test.py", ["Arquivos com extensão .test","Qualquer arquivo com mais de 100 linhas"], "O algoritmo de discovery busca testes que sigam essa convenção no diretório atual recursivamente."),
          q("Qual é a principal vantagem das asserções no pytest em relação ao unittest clássico?", "Usa o assert nativo do Python com reescrita de bytecode para exibir diagnósticos detalhados", ["Exige aprender mais de 40 métodos como self.assertEqual","Garante que os testes rodem sem consumir CPU"], "Quando um assert falha, o pytest exibe os valores exatos de cada subexpressão avaliada."),
          q("Como executar apenas um arquivo de teste específico utilizando o pytest no terminal?", "pytest tests/test_calculadora.py", ["pytest --run-file only","python -t tests/test_calculadora.py"], "Passar o caminho do arquivo instrui o runner a executar exclusivamente a suíte informada."),
          q("Qual flag do pytest exibe a saída completa de cada teste individual (modo verboso)?", "-v (ou --verbose)", ["-q","--silent"], "O modo verboso imprime o nome de cada teste e o status individual (PASSED ou FAILED)."),
          t("Qual comando de terminal executa a suíte de testes completa do pytest no projeto?", ["pytest"], "pytest descobre e roda automaticamente todos os testes do repositório.", "# executa suite de testes"),
          g("Complete a função de teste com a convenção de nome exigida pelo pytest:", ["def test_divisao_inteira():\n    assert 10 // 2 == 5"], "Funções de teste devem iniciar com o prefixo test_.", "def ____():\n    assert 10 // 2 == 5"),
          o("Ordene as etapas do mecanismo de descoberta e execução do pytest:", ["Percorrer as pastas do projeto a partir do diretório raiz de execução","Identificar arquivos correspondentes ao padrão test_*.py ou *_test.py","Coletar funções iniciadas por test_ e classes de teste iniciadas por Test","Executar cada teste e exibir o relatório consolidado com resumo final"], "Ciclo de vida do test discovery e relatório de execução no pytest."),
          p("Associe a flag do pytest à sua respectiva finalidade:", [["-v (--verbose)","Aumenta a verbosidade listando cada caso de teste nominalmente"],["-q (--quiet)","Reduz a saída ao mínimo exibindo apenas pontos e resumo"],["-k expressao","Filtra e executa testes cujos nomes correspondam à expressão"],["-x (--exitfirst)","Interrompe a execução imediatamente na primeira falha encontrada"]], "Flags essenciais para controle e produtividade com o runner pytest.")
        ]
      },
      {
        id: "py-qual-3-2-assercoes-excecoes",
        title: "Testando falhas esperadas com pytest.raises()",
        subtitle: "Contratos · Validando lançamento de exceções e mensagens de erro",
        theory: "Funções robustas devem falhar de maneira previsível sob argumentos inválidos. O gerenciador de contexto pytest.raises() valida se uma exceção específica foi disparada durante a execução de um bloco de código. O parâmetro match permite ainda conferir mensagens e detalhes da falha com regex.",
        questions: [
          q("Qual gerenciador de contexto do pytest valida se uma função disparou a exceção correta?", "pytest.raises(TipoDeExcecao)", ["pytest.expect_error()","pytest.should_fail()"], "pytest.raises intercepta a exceção esperada; se nenhuma exceção ocorrer, o teste falha."),
          q("O que acontece com o teste se o bloco dentro de with pytest.raises(ValueError) não lançar nenhum erro?", "O teste falha com AssertionError porque a exceção esperada não foi disparada", ["O teste é marcado como ignorado (skipped)","O pytest fecha o terminal"], "A ausência do erro esperado indica uma quebra no contrato de validação da função."),
          q("Como validar o texto da mensagem de erro capturada com pytest.raises?", "Utilizar o parâmetro match=\"expressao_regular\" ou inspecionar o atributo value.args[0]", ["Ler o arquivo de log do Windows","Usar try/finally sem assert"], "match assegura não apenas o tipo da exceção, mas também que o motivo da falha confere com a especificação."),
          q("Por que não devemos encapsular a função inteira do teste dentro de pytest.raises?", "Para garantir que a exceção seja disparada exatamente pela linha pretendida e não por código auxiliar", ["Porque pytest.raises só aceita uma única linha de código","Porque gasta mais memória virtual"], "O escopo do context manager deve ser restrito cirurgicamente à operação sob avaliação."),
          t("Qual módulo externo de teste deve ser importado para usar o context manager raises?", ["pytest"], "pytest.raises é uma ferramenta do pacote pytest.", "# import pytest; with pytest.raises(...)"),
          g("Complete o teste que valida que divisão por zero lança ZeroDivisionError:", ["import pytest\nwith pytest.raises(ZeroDivisionError):\n    resultado = 10 / 0"], "pytest.raises captura a exceção de divisão por zero.", "import pytest\nwith ____:\n    resultado = 10 / 0"),
          o("Ordene os passos para testar o lançamento de uma exceção com validação de mensagem:", ["Importar o módulo pytest no arquivo de teste","Abrir o bloco with pytest.raises(ValueError, match=\"Idade negativa\") as exc_info:","Invocar a função informando o argumento que viola a regra de negócio","Verificar se exc_info.type e o texto de erro confirmam a especificação"], "Padrão profissional para validação estrita de exceções de domínio."),
          p("Associe o atributo de exc_info à informação que ele fornece sobre o erro:", [["exc_info.type","Classe ou tipo da exceção disparada (ex: ValueError)"],["exc_info.value","Objeto da instância da exceção capturada com seus argumentos"],["exc_info.traceback","Estrutura da pilha de execução no momento do disparo do erro"],["match=\"...\"","Expressão regular testada contra a representação em string do erro"]], "Inspeção profunda de exceções e diagnósticos de falha com pytest.")
        ]
      },
      {
        id: "py-qual-3-3-unittest-legado",
        title: "Módulo unittest: TestCase e métodos de asserção",
        subtitle: "Compatibilidade · Integrando com suítes corporativas da biblioteca padrão",
        theory: "O módulo unittest integra a biblioteca padrão do Python e adota o padrão xUnit baseado em classes. Classes de teste herdam de unittest.TestCase e utilizam métodos utilitários como assertEqual, assertTrue e assertRaises. O pytest também executa testes baseados em unittest nativamente sem modificações.",
        questions: [
          q("De qual classe da biblioteca padrão uma classe de teste deve herdar no framework unittest?", "unittest.TestCase", ["unittest.Suite","object.TestCase"], "unittest.TestCase fornece todos os métodos de ciclo de vida e asserções formais."),
          q("Qual método especial do unittest.TestCase é executado antes de cada teste individual?", "setUp()", ["init()","beforeAll()"], "setUp() prepara o estado e fixtures necessários para a execução do caso de teste."),
          q("Qual método especial do unittest.TestCase é executado após o término de cada teste?", "tearDown()", ["destroy()","afterAll()"], "tearDown() realiza a limpeza de arquivos, desconexões e liberação de recursos alocados."),
          q("Qual método de asserção do TestCase compara se dois valores são iguais?", "self.assertEqual(a, b)", ["self.compare(a, b)","self.is_same(a, b)"], "assertEqual compara os valores com == e gera mensagens detalhadas de diferença em caso de erro."),
          t("Qual módulo da biblioteca padrão do Python implementa o framework de testes unitários xUnit?", ["unittest"], "unittest é o framework embutido oficial do Python desde a versão 2.1.", "# modulo built-in de testes unitarios"),
          g("Complete a classe de teste herdando do padrão embutido:", ["import unittest\nclass TesteMatematica(unittest.TestCase):\n    def test_dobro(self):\n        self.assertEqual(2 * 2, 4)"], "TestCase é a classe base para suítes estruturadas em unittest.", "import unittest\nclass TesteMatematica(____):\n    def test_dobro(self):\n        self.assertEqual(2 * 2, 4)"),
          o("Ordene a sequência de ciclo de vida dos métodos de um TestCase:", ["setUpClass(): executado uma única vez antes de qualquer teste da classe","setUp(): executado antes de cada método de teste individual","test_metodo(): execução do caso de teste propriamente dito","tearDown(): executado após a conclusão de cada teste individual"], "Ciclo de vida clássico do framework xUnit implementado pelo módulo unittest."),
          p("Associe o método de asserção do TestCase à sua validação correspondente:", [["self.assertEqual(a, b)","Verifica se a é igual a b (a == b)"],["self.assertTrue(x)","Verifica se a expressão booleana x avalia para True"],["self.assertIn(item, lista)","Verifica se o item pertence à coleção informada"],["self.assertRaises(Erro)","Verifica se o bloco ou função levanta a exceção indicada"]], "Métodos canônicos de validação fornecidos por unittest.TestCase.")
        ]
      },
      {
        id: "py-qual-3-4-casos-limite",
        title: "Testando valores nulos, vazios e casos de borda",
        subtitle: "Robustez · Cobertura de limites numéricos e sequências vazias",
        theory: "A maior parte dos bugs em produção ocorre em casos de borda (edge cases), tais como listas vazias, strings com espaços em branco, zeros, números negativos e o valor None. Testar esses extremos garante que a lógica de negócio lide com dados inesperados de forma graciosa e determinística.",
        questions: [
          q("O que caracteriza um caso de borda (edge case) em uma função que calcula médias?", "Passar uma lista vazia [], onde o cálculo ingênuo tentaria dividir por zero (ZeroDivisionError)", ["Passar dez números inteiros positivos comuns","Chamar a função duas vezes seguidas"], "Casos extremos desafiam os pressupostos ingênuos de código de produção."),
          q("Como uma função que recebe strings deve se comportar diante de None caso o parâmetro seja obrigatório?", "Levantar TypeError ou ValueError com mensagem esclarecedora em vez de quebrar internamente", ["Retornar a string \"None\" silenciosamente","Apagar a variável"], "Validação de precondições no início da função (fail-fast) protege o restante do fluxo."),
          q("Quais valores compõem os limites numéricos típicos em validações de grandezas físicas?", "Zero, valores imediatamente antes e depois do limite (ex: -1, 0, 1) e números de ponto flutuante extremos", ["Apenas números primos pares","Qualquer número sorteado aleatoriamente"], "Testar os limiares exatos detecta erros clássicos de \"off-by-one\" (< versus <=)."),
          q("Por que é recomendável testar strings contendo apenas espaços em branco (\"   \")?", "Muitos códigos consideram a string preenchida (pois não é vazia \"\"), mas a informação real é nula", ["Porque consome mais memória no terminal","Porque o Python proíbe espaços"], "Testar .strip() assegura que entradas em branco não sejam aceitas como válidas indevidamente."),
          t("Qual método nativo de string remove espaços em branco antes e depois do texto?", ["strip"], "string.strip() remove espaços, tabs e quebras de linha das extremidades.", "# remove espacos das extremidades"),
          g("Complete o teste que verifica o tratamento correto de valor nulo:", ["def test_limpar_texto_com_none():\n    assert limpar_texto(None) == \"\""], "Garante que a passagem de None resulte em string vazia sem lançar AttributeError.", "def test_limpar_texto_com_none():\n    ____ // assert validando que None retorna string vazia"),
          o("Ordene os cenários recomendados ao criar uma bateria de testes completa para uma função:", ["Cenário nominal feliz (happy path): entradas típicas e saídas esperadas","Cenários de borda: coleções vazias, valores zero e strings em branco","Cenários de erro contratual: tipos incorretos (None, int no lugar de str)","Cenários de grande volume ou estresse de desempenho quando aplicável"], "Estratégia sistemática de particionamento de equivalência e análise de valor limite."),
          p("Associe o caso de borda ao risco comum que ele mitiga no código:", [["Lista vazia []","Previne ZeroDivisionError e IndexError em acessos de elementos"],["Valor None","Previne AttributeError ao tentar chamar métodos em referências nulas"],["String com espaços \"  \"","Previne cadastro de nomes vazios ou campos em branco no sistema"],["Número negativo (-1)","Previne aceitação de preços, idades ou estoques inválidos"]], "Casos de borda indispensáveis para qualquer suíte de testes de alta qualidade.")
        ]
      },
      {
        id: "py-qual-3-5-cobertura-codigo",
        title: "Métricas de cobertura de código com pytest-cov",
        subtitle: "Auditoria · Identificando ramos e linhas não testadas na suíte",
        theory: "A cobertura de código (code coverage) mede a porcentagem de linhas e ramos de decisão executados durante os testes automatizados. A ferramenta pytest-cov (baseada no coverage.py) gera relatórios no terminal e em HTML destacando linhas faltantes. Uma meta saudável de projeto situa-se entre 80% e 90%.",
        questions: [
          q("O que a métrica de cobertura de código representa em um projeto?", "A proporção de linhas e ramificações do código de produção executadas pela suíte de testes", ["A quantidade de bugs existentes no software","A velocidade de processamento da aplicação"], "Ajuda a equipe a enxergar pontos cegos e trechos nunca exercitados nos testes."),
          q("100% de cobertura de código garante que o software está livre de qualquer bug?", "Não, pois o código pode executar todas as linhas sem validar casos de borda ou regras de negócio sutis", ["Sim, cobertura total elimina qualquer possibilidade de erro","Sim, os testes substituem o código de produção"], "Cobertura mede quais linhas rodaram, mas não garante que as asserções foram profundas e corretas."),
          q("Qual flag do pytest-cov gera um relatório interativo navegável em formato web?", "--cov-report=html", ["--make-web","--export-browser"], "--cov-report=html cria a pasta htmlcov com arquivos HTML detalhados por linha."),
          q("O que é cobertura de ramificação (branch coverage)?", "Avaliação que verifica se ambos os ramos de cada condicional (True e False de ifs) foram executados", ["A cobertura de pastas do disco","A checagem de branches do Git"], "A flag --cov-branch garante que tanto o caminho positivo quanto o negativo de cada if foram testados."),
          t("Qual comando do pytest executa os testes medindo a cobertura do pacote \"meu_app\"?", ["pytest --cov=meu_app"], "A flag --cov indica o pacote que deve ser instrumentado para auditoria.", "# pytest --cov=meu_app"),
          g("Complete o comando para executar testes exigindo cobertura mínima de 85%:", ["pytest --cov=meu_app --cov-fail-under=85"], "A flag --cov-fail-under quebra o build no CI se a cobertura cair abaixo do percentual.", "____ // comando com pytest, flag --cov=meu_app e --cov-fail-under=85"),
          o("Ordene as etapas para auditar e elevar a cobertura de código de um módulo:", ["Executar pytest --cov=meu_app --cov-report=term-missing no terminal","Inspecionar as linhas listadas na coluna \"Missing\" do relatório","Escrever novos casos de teste focando nos ramos e condicionais faltantes","Reexecutar a suíte e verificar o incremento percentual na cobertura total"], "Ciclo iterativo para identificação e eliminação de pontos cegos de teste."),
          p("Associe a coluna do relatório de cobertura ao seu significado:", [["Stmts (Statements)","Número total de instruções executáveis no arquivo fonte"],["Miss (Missing)","Quantidade de instruções que não foram exercitadas em nenhum teste"],["Cover","Porcentagem consolidada de cobertura alcançada no arquivo"],["Missing lines","Números exatos das linhas do código fonte que nunca foram executadas"]], "Leitura e interpretação dos relatórios gerados pelo coverage.py e pytest-cov.")
        ]
      }
    ],
    4: [
      {
        id: "py-qual-4-1-pytest-fixtures",
        title: "Reuso de estado com @pytest.fixture",
        subtitle: "Preparação · Injeção limpa de dados e objetos de teste",
        theory: "Fixtures no pytest fornecem uma maneira modular e declarativa de preparar dados, objetos e conexões necessárias para os testes. Decoradas com @pytest.fixture, elas são injetadas automaticamente nas funções de teste como argumentos correspondentes pelo nome, eliminando duplicações de código.",
        questions: [
          q("Como uma função de teste consome uma fixture definida com @pytest.fixture?", "Declarando o nome exato da fixture como parâmetro na assinatura da função de teste", ["Importando a fixture com a instrução from fixtures import *","Instanciando uma classe herdada"], "O sistema de injeção de dependências do pytest conecta a fixture ao teste pelo nome."),
          q("Qual é o benefício de usar fixtures em vez de instanciar objetos manualmente em cada teste?", "Promove reuso consistente, legibilidade e desacopla a criação dos dados da validação", ["Faz o teste rodar sem usar memória","Garante que o banco de dados seja apagado"], "Modificações no formato do objeto exigem alterações apenas na fixture centralizadora."),
          q("Onde fixtures compartilhadas entre múltiplos arquivos de teste devem ser declaradas?", "No arquivo especial conftest.py na raiz dos testes", ["No arquivo settings.ini","No Desktop do usuário"], "conftest.py é descoberto pelo pytest sem necessidade de importações explícitas."),
          q("Uma fixture pode consumir outra fixture como argumento?", "Sim, fixtures são combináveis e podem montar hierarquias complexas de dados de teste", ["Não, cada fixture opera de forma totalmente isolada","Apenas no sistema operacional Linux"], "Permite criar fixtures especializadas a partir de fixtures mais genéricas (ex: usuario_admin depende de db)."),
          t("Qual decorator do pytest transforma uma função em um provedor de dados de teste?", ["@pytest.fixture"], "Decora a função fornecedora que será injetada como argumento.", "# decorator de fixture no pytest"),
          g("Complete a injeção da fixture usuario_padrao na função de teste:", ["def test_usuario_ativo(usuario_padrao):\n    assert usuario_padrao.ativo is True"], "O pytest injeta o retorno da fixture pelo parâmetro de mesmo nome.", "def test_usuario_ativo(____):\n    assert usuario_padrao.ativo is True"),
          o("Ordene o fluxo de injeção e execução de um teste que consome uma fixture:", ["O pytest descobre a função test_perfil(dados_usuario)","O runner localiza a fixture @pytest.fixture def dados_usuario():","A função da fixture é executada e seu valor de retorno é capturado","A função de teste é executada recebendo o valor como argumento"], "Mecanismo interno de injeção de dependências do pytest."),
          p("Associe o elemento do ecossistema de fixtures à sua respectiva responsabilidade:", [["@pytest.fixture","Decorator que registra a função como provedora de recursos de teste"],["conftest.py","Arquivo padrão para declaração de fixtures compartilhadas em todo o diretório"],["Injeção por parâmetro","Mecanismo pelo qual o teste solicita a fixture declarando seu nome"],["autouse=True","Opção que ativa a fixture automaticamente em todos os testes do escopo"]], "Arquitetura e convenções do sistema de fixtures do pytest.")
        ]
      },
      {
        id: "py-qual-4-2-escopos-fixtures",
        title: "Escopos de fixtures: function, module e session",
        subtitle: "Otimização · Compartilhando conexões e recursos caros entre testes",
        theory: "O parâmetro scope de uma fixture controla com que frequência ela é criada e destruída. O padrão é \"function\" (recriada a cada teste individual). O escopo \"module\" compartilha a instância entre os testes do mesmo arquivo, enquanto \"session\" mantém o recurso vivo durante toda a execução da suíte.",
        questions: [
          q("Qual é o escopo padrão de uma fixture se o parâmetro scope não for informado?", "\"function\" (executada e recriada antes de cada função de teste)", ["\"session\"","\"module\""], "Garante total isolamento entre os testes por padrão para evitar vazamento de estado."),
          q("Qual escopo é recomendado para inicializar recursos computacionalmente caros como um contêiner de banco de dados?", "\"session\"", ["\"function\"","\"subroutine\""], "\"session\" executa uma única vez para toda a suíte, economizando dezenas de segundos."),
          q("Qual é o risco de compartilhar uma fixture mutável com escopo \"module\" ou \"session\"?", "Um teste pode alterar o estado do objeto compartilhado e provocar falhas misteriosas em testes seguintes", ["A CPU do computador pode superaquecer","O pytest desativa as asserções nativas"], "Fixtures com escopos amplos devem preferencialmente ser imutáveis ou limpas após cada teste."),
          q("Qual escopo intermédio executa a fixture uma vez por classe de teste?", "\"class\"", ["\"package\"","\"global\""], "Ideal quando métodos da mesma classe compartilham uma configuração idêntica sem afetar outras classes."),
          t("Qual parâmetro de @pytest.fixture define o tempo de vida e compartilhamento do recurso?", ["scope"], "Sintaxe: @pytest.fixture(scope=\"session\").", "# parametro de escopo da fixture"),
          g("Complete a declaração de uma fixture compartilhada por toda a sessão:", ["import pytest\n@pytest.fixture(scope=\"session\")\ndef conexao_banco():\n    return BancoDados()"], "scope=\"session\" garante instância única compartilhada.", "import pytest\n@pytest.fixture(____)\ndef conexao_banco():\n    return BancoDados()"),
          o("Ordene os escopos de fixtures do menor (mais isolado) para o maior (mais duradouro):", ["function: recriado para cada teste individualmente","class: executado uma vez para cada classe de teste","module: executado uma vez para cada arquivo .py de teste","session: executado uma única vez para toda a bateria de testes"], "Hierarquia oficial de escopos suportados pelo framework pytest."),
          p("Associe o escopo da fixture ao seu cenário de aplicação típico:", [["scope=\"function\"","Criação de entidades mutáveis e listas que recebem inserts no teste"],["scope=\"module\"","Carregamento de um arquivo JSON estático de fixtures para aquele módulo"],["scope=\"session\"","Conexão com banco de dados real em Docker ou cliente HTTP global"],["scope=\"package\"","Compartilhamento de estado para todos os módulos dentro de um pacote"]], "Estratégias de dimensionamento de escopos de fixtures no pytest.")
        ]
      },
      {
        id: "py-qual-4-3-teardown-yield",
        title: "Finalização e limpeza com fixtures baseadas em yield",
        subtitle: "Gerenciamento · Desfazendo alterações temporárias e fechando recursos",
        theory: "Fixtures baseadas em yield combinam preparação (setup) e finalização (teardown) em uma única função. O código anterior ao yield roda antes do teste e fornece o recurso. Após a conclusão do teste, o pytest retoma a execução imediatamente após o yield, fechando conexões ou removendo arquivos temporários.",
        questions: [
          q("Qual instrução em uma fixture do pytest separa a etapa de setup da etapa de teardown?", "yield", ["return","break"], "O yield devolve o objeto para o teste; o código abaixo do yield é executado na limpeza."),
          q("O que acontece com o código após o yield se o teste que usou a fixture falhar em um assert?", "O teardown após o yield é executado com sucesso mesmo com a falha do teste", ["A limpeza é abortada e os arquivos continuam no disco","O sistema operacional encerra o processo"], "O pytest garante a execução do teardown assegurando a integridade do ambiente."),
          q("Qual fixture embutida do pytest fornece um diretório temporário autolimpante para cada teste?", "tmp_path", ["temp_dir","os_tmp"], "tmp_path injeta um objeto pathlib.Path apontando para uma pasta isolada criada sob demanda."),
          q("Por que é preferível usar a fixture tmp_path em vez de criar pastas com os.mkdir manual?", "tmp_path garante caminhos únicos por teste e remove o lixo sem risco de poluir o repositório", ["tmp_path grava os dados direto na nuvem","os.mkdir só funciona no Linux"], "Elimina a necessidade de escrever teardowns manuais propensos a falhas de remoção de arquivos."),
          t("Qual instrução do Python é usada dentro da fixture para entregar o valor e aguardar o término do teste?", ["yield"], "yield transforma a fixture em um gerador com fase de limpeza automática.", "# entrega o recurso e pausa para teardown"),
          g("Complete a fixture que cria e depois apaga um arquivo temporário após o teste:", ["@pytest.fixture\ndef arquivo_teste():\n    f = open(\"temp.txt\", \"w\")\n    yield f\n    f.close()"], "O código abaixo do yield fecha o arquivo após o término do caso de teste.", "@pytest.fixture\ndef arquivo_teste():\n    f = open(\"temp.txt\", \"w\")\n    ____\n    f.close()"),
          o("Ordene o fluxo cronológico de uma fixture que utiliza a instrução yield:", ["Execução do código anterior ao yield (criação do recurso temporário)","Entrega do recurso ao teste através do valor retornado no yield","Execução da função de teste pelo runner do pytest","Execução do código posterior ao yield (fechamento e exclusão de arquivos)"], "Ciclo de setup e teardown garantido por geradores de fixtures no pytest."),
          p("Associe a técnica de limpeza de recursos ao seu mecanismo no pytest:", [["yield na fixture","Separa a inicialização da finalização em um único bloco fluído"],["request.addfinalizer","Mecanismo programático para registrar callbacks de limpeza"],["tmp_path","Fixture built-in que fornece pasta temporária gerenciada automaticamente"],["monkeypatch","Fixture built-in que altera variáveis de ambiente e restaura ao final"]], "Recursos e padrões para gerenciamento higiênico de estado em suítes de teste.")
        ]
      },
      {
        id: "py-qual-4-4-parametrize",
        title: "Testes orientados a dados com @pytest.mark.parametrize",
        subtitle: "Escalabilidade · Multiplicando cenários sem duplicar código de teste",
        theory: "O decorator @pytest.mark.parametrize permite rodar a mesma lógica de teste com múltiplos conjuntos de entradas e saídas esperadas. Cada tupla de parâmetros vira um caso de teste independente no relatório do pytest, evitando duplicações desnecessárias e cobrindo matrizes inteiras de combinações.",
        questions: [
          q("Qual decorator do pytest parametriza uma função de teste com múltiplos casos de entrada?", "@pytest.mark.parametrize", ["@pytest.repeat","@pytest.loop"], "Permite definir nomes de argumentos em uma string e passar uma lista de tuplas com os dados."),
          q("Como o pytest reporta a execução de um teste que possui 4 tuplas no parametrize?", "Como 4 testes individuais e independentes (ex: test_funcao[caso1], test_funcao[caso2]...)", ["Como um único teste que roda 4 vezes","Apenas exibe o resultado do último caso"], "Se um caso falhar, os outros continuam rodando e o relatório indica exatamente qual tupla falhou."),
          q("Como declarar múltiplos parâmetros em @pytest.mark.parametrize(\"entrada, esperado\", [...])?", "Passar os nomes dos argumentos separados por vírgula no primeiro parâmetro do decorator", ["Passar uma lista de dicionários no terminal","Criar uma classe separada para cada argumento"], "Os nomes devem coincidir estritamente com os argumentos esperados pela função de teste."),
          q("O que acontece se um dos casos parametrizados falhar?", "Apenas aquele caso específico é marcado como FAILED; todos os demais casos continuam sendo executados", ["O teste para imediatamente e aborta o arquivo","O pytest tenta adivinhar o resultado correto"], "Isolamento de diagnósticos acelera a correção pontual de regras específicas."),
          t("Qual módulo fornece a marcação mark.parametrize para testes orientados a dados?", ["pytest"], "pytest.mark contém decoradores como parametrize, skip e xfail.", "# pytest.mark.parametrize"),
          g("Complete o decorator para parametrizar a entrada x e a saída esperada y:", ["@pytest.mark.parametrize(\"x, esperado\", [(2, 4), (3, 9)])\ndef test_quadrado(x, esperado):\n    assert x ** 2 == esperado"], "parametrize alimenta x e esperado a partir da lista de tuplas fornecida.", "@pytest.mark.____(\"x, esperado\", [(2, 4), (3, 9)])\ndef test_quadrado(x, esperado):\n    assert x ** 2 == esperado"),
          o("Ordene os passos para transformar um teste repetitivo em um teste parametrizado:", ["Identificar código de teste duplicado variando apenas entradas e saídas","Adicionar o decorator @pytest.mark.parametrize(\"entrada, esperado\", lista_tuplas)","Ajustar os parâmetros da função de teste para receber os nomes declarados","Executar o pytest e observar a geração automática de um caso por combinação"], "Refatoração de testes aplicando parametrização para ganho de cobertura e legibilidade."),
          p("Associe a marcação do pytest à sua finalidade no controle da suíte:", [["@pytest.mark.parametrize","Multiplica o teste aplicando uma lista de tuplas de entrada e saída"],["@pytest.mark.skip(reason=...)","Pula a execução do teste informando a justificativa"],["@pytest.mark.xfail","Marca que o teste é esperado falhar temporariamente por bug conhecido"],["ids=[...]","Parâmetro de parametrize que define rótulos legíveis para cada caso"]], "Controle declarativo e flexibilidade em baterias de testes com pytest.")
        ]
      },
      {
        id: "py-qual-4-5-mocks-e-patches",
        title: "Isolando efeitos colaterais com unittest.mock",
        subtitle: "Dublês de teste · Substituindo chamadas de rede e disco por mocks",
        theory: "O módulo unittest.mock fornece ferramentas para substituir dependências lentas ou imprevisíveis (como APIs HTTP externas, banco de dados ou relógio) por objetos simulados. A função patch() intercepta a importação do recurso no módulo alvo, garantindo testes rápidos, determinísticos e sem rede.",
        questions: [
          q("Qual é o propósito de usar objetos Mock em testes unitários?", "Simular dependências externas (como chamadas de API ou banco) para manter o teste rápido e determinístico", ["Substituir o desenvolvedor na escrita de testes","Deletar arquivos temporários do servidor"], "Testes unitários devem testar a lógica do seu código, não a disponibilidade da infraestrutura externa."),
          q("O que o método mock.assert_called_once_with(*args) valida?", "Garante que o mock foi invocado exatamente uma única vez com os argumentos especificados", ["Verifica se o computador possui conexão de rede","Garante que o teste rodou em paralelo"], "Valida o contrato de chamada entre o seu módulo e a biblioteca externa mockada."),
          q("Qual é a regra de ouro do caminho a ser mockado com unittest.mock.patch?", "Fazer o patch onde o objeto é utilizado/importado, e não onde ele foi originalmente definido", ["Mockar sempre a biblioteca global no Python","Fazer patch de todos os módulos do sistema operacional"], "Se meu_modulo faz from requests import get, o patch deve ser \"meu_modulo.get\"."),
          q("Qual propriedade de um objeto Mock define o valor retornado quando ele é chamado como função?", "return_value", ["output_val","expected_result"], "meu_mock.return_value = 200 faz qualquer chamada a meu_mock() retornar 200."),
          t("Qual gerenciador de contexto do módulo unittest.mock substitui um objeto temporariamente?", ["patch"], "from unittest.mock import patch; with patch(\"modulo.funcao\"): ...", "# patch substitui o recurso durante o bloco"),
          g("Complete o teste usando patch para simular a resposta de requests.get:", ["from unittest.mock import patch\nwith patch(\"meu_modulo.requests.get\") as mock_get:\n    mock_get.return_value.status_code = 200"], "patch intercepta a requisição HTTP retornando o mock com status 200.", "from unittest.mock import ____\nwith patch(\"meu_modulo.requests.get\") as mock_get:\n    mock_get.return_value.status_code = 200"),
          o("Ordene as etapas para testar uma função que consome uma API externa usando mock:", ["Identificar a chamada externa de rede ou disco dentro da função de negócio","Aplicar @patch(\"app.modulo.requests.get\") na assinatura do teste","Configurar o mock_get.return_value com a resposta simulada pretendida","Executar a função de negócio e asserir o resultado e se o mock foi chamado"], "Padrão clássico de isolamento com dublês de teste em Python."),
          p("Associe o dublê ou ferramenta de mock ao seu papel:", [["unittest.mock.Mock","Objeto genérico flexível que registra chamadas e aceita qualquer atributo"],["unittest.mock.MagicMock","Subclasse de Mock pré-configurada com métodos mágicos (__len__, __iter__)"],["mock.return_value","Define o valor retornado na invocação do objeto mock"],["mock.side_effect","Simula exceções ou retorna valores diferentes a cada invocação"]], "Conceitos centrais de dublês de teste (test doubles) no ecossistema Python.")
        ]
      }
    ],
    5: [
      {
        id: "py-qual-5-1-leitura-traceback",
        title: "Leitura crítica de tracebacks e causa raiz",
        subtitle: "Diagnóstico · Rastreando a pilha de execução de baixo para cima",
        theory: "Um traceback (rastreamento de pilha) no Python lista a sequência de chamadas ativas no momento em que ocorreu uma exceção não tratada. Ele é lido de baixo para cima: a última linha informa a classe do erro e a mensagem descritiva, enquanto os quadros acima indicam arquivos, linhas e funções percorridas.",
        questions: [
          q("Qual é a forma mais eficaz e recomendada de ler um traceback em Python?", "Começar pela última linha para identificar o tipo e a mensagem do erro, subindo para a linha que o originou", ["Ler apenas a primeira linha do topo","Ignorar o texto e reiniciar o terminal"], "A última linha resume a falha exata (ex: KeyError: \"saldo\"), direcionando o foco do desenvolvedor."),
          q("O que cada bloco \"File ..., line ..., in ...\" representa dentro de um traceback?", "Um quadro de pilha (stack frame) correspondente à chamada de uma função naquele ponto do código", ["Um arquivo deletado pelo sistema","O histórico de commits do repositório Git"], "Mostra a trilha exata de execução que o interpretador percorreu até atingir a instrução problemática."),
          q("O que significa a mensagem \"During handling of the above exception, another exception occurred\"?", "Uma nova exceção foi disparada dentro do bloco except ou finally enquanto o erro anterior era tratado", ["O computador executou dois programas ao mesmo tempo","O erro anterior foi corrigido sozinho"], "Python encadeia exceções para não perder o contexto original do erro que provocou a falha secundária."),
          q("Como o Python 3.11+ aprimorou a legibilidade dos tracebacks?", "Adicionou indicadores visuais sublinhando com circunflexos (^^^) a subexpressão exata que causou o erro", ["Eliminou todas as mensagens de erro","Passou a traduzir os erros para áudio"], "Indica com precisão cirúrgica qual atributo ou índice era nulo em expressões encadeadas (ex: a.b.c)."),
          t("Qual termo em inglês designa o rastreamento da pilha de chamadas gerado por uma exceção?", ["traceback"], "Traceback é o relatório exibido pelo interpretador no sys.stderr.", "# relatorio de pilha de excecao"),
          g("Complete o tratamento preservando a exceção original com encadeamento explícito:", ["try:\n    conectar()\nexcept ConnectionError as e:\n    raise RuntimeError(\"Falha no servico\") from e"], "A cláusula from e preserva o traceback e o contexto do erro anterior.", "try:\n    conectar()\nexcept ConnectionError as e:\n    raise RuntimeError(\"Falha no servico\") ____"),
          o("Ordene as etapas recomendadas para diagnosticar um bug a partir do traceback:", ["Localizar a última linha e ler o tipo da exceção e sua mensagem explicativa","Subir pelos quadros de pilha procurando o último arquivo pertencente ao seu próprio projeto","Abrir o arquivo na linha indicada e inspecionar o valor das variáveis envolvidas","Reproduzir a falha localmente com um teste unitário focado naquele cenário"], "Metodologia ágil e estruturada para depuração baseada em tracebacks."),
          p("Associe o elemento do traceback à sua utilidade no diagnóstico:", [["Última linha (ex: IndexError: list index out of range)","Identifica a causa e a natureza exata da falha"],["File \"app.py\", line 42","Aponta a localização precisa no código fonte onde o erro explodiu"],["in processar_dados()","Indica o escopo da função ou método em execução no momento"],["Indicadores ^^^ do Python 3.11","Sublinham a subexpressão específica responsável pelo erro"]], "Anatomia e leitura eficiente de tracebacks do interpretador Python.")
        ]
      },
      {
        id: "py-qual-5-2-breakpoint-pdb",
        title: "Depuração interativa com breakpoint() e pdb",
        subtitle: "Inspeção · Pausando a execução e inspecionando variáveis locais",
        theory: "A função nativa breakpoint() (introduzida na PEP 553 no Python 3.7) pausa a execução do programa e abre o terminal interativo do depurador pdb. No prompt (Pdb), o programador pode inspecionar valores de variáveis no momento exato da pausa, executar expressões Python livremente e testar hipóteses.",
        questions: [
          q("Qual função built-in nativa do Python pausa o programa e inicia a depuração interativa?", "breakpoint()", ["pause()","debug_now()"], "breakpoint() chama internamente sys.breakpointhook(), que por padrão inicia o pdb."),
          q("Qual é a grande vantagem do breakpoint() em relação a encher o código com print() temporários?", "Permite inspecionar qualquer variável, navegar pela pilha e avançar passo a passo sem reexecutar o script", ["Garante que o código execute 10 vezes mais rápido","Compila o código para assembly"], "O depurador oferece controle dinâmico e inspeção completa do estado em tempo de execução."),
          q("Como desativar todos os breakpoints() do projeto em produção sem precisar apagar as linhas?", "Definir a variável de ambiente PYTHONBREAKPOINT=0 no sistema operacional", ["Desinstalar o interpretador Python","Mudar o nome do arquivo para .txt"], "PYTHONBREAKPOINT=0 instrui o interpretador a ignorar chamadas a breakpoint() silenciosamente."),
          q("Qual módulo da biblioteca padrão implementa o depurador interativo padrão do Python?", "pdb", ["debugger","pytracer"], "pdb fornece o depurador interativo embutido na linguagem."),
          t("Qual função nativa embutida foi introduzida na PEP 553 para inserir pontos de interrupção?", ["breakpoint"], "breakpoint() substitui a antiga chamada import pdb; pdb.set_trace().", "# pausa a execucao e abre o depurador"),
          g("Complete o ponto de interrupção nativo na linha onde a anomalia ocorre:", ["def processar(pedido):\n    breakpoint()\n    return pedido.calcular_total()"], "breakpoint() congela o interpretador abrindo o shell interativo do pdb.", "def processar(pedido):\n    ____\n    return pedido.calcular_total()"),
          o("Ordene os passos para depurar um método problemático com breakpoint():", ["Inserir a instrução breakpoint() imediatamente antes da linha suspeita","Executar o script ou teste pelo terminal normalmente","Ao entrar no prompt (Pdb), inspecionar o estado das variáveis com print ou p","Avançar o fluxo de execução para verificar onde o valor se corrompe"], "Fluxo básico de depuração interativa no ecossistema Python."),
          p("Associe a configuração ou recurso de depuração à sua função:", [["breakpoint()","Pausa nativa que dispara o gancho interativo de depuração"],["PYTHONBREAKPOINT=0","Variável de ambiente que desativa todos os breakpoints"],["sys.breakpointhook","Hook customizável chamado internamente pela função breakpoint()"],["(Pdb) prompt","Console interativo onde comandos de depuração são avaliados"]], "Componentes e configurações de depuração embutidos no Python.")
        ]
      },
      {
        id: "py-qual-5-3-comandos-pdb",
        title: "Navegação no pdb: n, s, c, p e q",
        subtitle: "Controle de fluxo · Percorrendo linhas, entrando em funções e inspecionando",
        theory: "No console do pdb, comandos de uma letra controlam o avanço da execução. O comando n (next) executa a linha atual sem entrar em funções chamadas. O comando s (step) entra no interior da função chamada. O comando c (continue) retoma até o próximo breakpoint, p avalia variáveis e q encerra o processo.",
        questions: [
          q("Qual é a diferença fundamental entre os comandos n (next) e s (step) no pdb?", "n executa a chamada de função e vai para a próxima linha; s entra para dentro do corpo da função chamada", ["n reinicia o computador; s salva o arquivo","n avança 10 linhas; s avança 1 linha"], "Use n para pular código de bibliotecas confiáveis e s para investigar a lógica interna de uma função sua."),
          q("Qual comando do pdb retoma a execução normal do programa até o próximo breakpoint ou até o fim?", "c (ou continue)", ["r","go"], "continue libera a execução contínua da aplicação."),
          q("Qual comando do pdb imprime o valor de uma expressão ou variável no console?", "p expressao (ou pp para formatação legível/pretty-print)", ["echo","show"], "p resultado avalia a expressão e exibe o valor formatado."),
          q("Qual comando do pdb interrompe a depuração e encerra a execução do script imediatamente?", "q (ou quit)", ["exit_all","stop"], "quit aborta o processo levantando BdbQuit."),
          t("Qual comando do pdb imprime a listagem de linhas do código fonte ao redor da linha atual?", ["l"], "l (ou list) exibe 11 linhas de contexto em torno da linha pausada no depurador.", "# lista codigo ao redor da linha"),
          g("Complete o comando do pdb para avaliar de forma legível uma estrutura de dados complexa:", ["pp dicionario_dados"], "pp (pretty-print) formata dicionários e listas aninhadas no pdb.", "____ // comando pdb para impressao formatada de dados"),
          o("Ordene os comandos do pdb conforme a necessidade típica de depuração:", ["l (list): examinar o contexto das linhas de código fonte ao redor da pausa","p (print): consultar os valores recebidos pelos parâmetros da função","s (step): entrar no método interno suspeito para acompanhar a execução","c (continue): liberar a execução até a próxima parada ou conclusão"], "Sequência natural de navegação investigativa no depurador pdb."),
          p("Associe o comando do pdb à sua ação de controle correspondente:", [["n (next)","Avança para a próxima linha no mesmo nível de escopo atual"],["s (step into)","Entra no interior da função invocada na linha atual"],["c (continue)","Retoma a execução ininterrupta até o próximo breakpoint"],["q (quit)","Encerra o depurador e aborta a execução do programa"]], "Conjunto de comandos canônicos para navegação no depurador pdb.")
        ]
      },
      {
        id: "py-qual-5-4-logging-vs-print",
        title: "Logging estruturado versus depuração por print",
        subtitle: "Observabilidade · Níveis DEBUG, INFO, WARNING e ERROR em arquivos",
        theory: "Embora o comando print() seja útil em rascunhos rápidos, sistemas profissionais adotam o módulo built-in logging. Ele classifica eventos por severidade (DEBUG, INFO, WARNING, ERROR, CRITICAL), inclui data e hora, registra o nome do módulo e pode gravar simultaneamente no terminal e em arquivos rotativos.",
        questions: [
          q("Por que o uso de print() em produção é desaconselhado em favor do módulo logging?", "print polui a saída padrão sem registro de timestamp, sem nível de severidade e sem retenção em arquivo", ["Porque o print() gasta créditos de licença do Python","Porque o print() altera o tipo de retorno de funções"], "O módulo logging permite ligar e desligar níveis de detalhes sem editar uma única linha do código fonte."),
          q("Quais são os 5 níveis padrão de severidade do módulo logging, do menor para o maior?", "DEBUG, INFO, WARNING, ERROR e CRITICAL", ["LOW, MEDIUM, HIGH, FATAL e PANIC","TRACE, CHAT, NOTE, ALERT e STOP"], "Definir o nível mínimo como INFO, por exemplo, oculta automaticamente todas as mensagens de DEBUG."),
          q("Qual função básica do módulo logging inicializa a configuração de formato e nível de registro?", "logging.basicConfig()", ["logging.start()","logging.init_all()"], "basicConfig define o nível global, o padrão de formatação de string e o destino (console ou arquivo)."),
          q("O que a flag exc_info=True faz ao ser passada em logging.error(\"Falha\", exc_info=True)?", "Anexa automaticamente o traceback completo da exceção ativa na mensagem do log", ["Apaga a mensagem de erro da tela","Reinicia o serviço com falha"], "Essencial para capturar diagnósticos precisos em arquivos de log sem quebrar a aplicação."),
          t("Qual nível de severidade do logging deve ser usado para diagnósticos detalhados de desenvolvimento?", ["DEBUG"], "DEBUG é o nível mais verboso, destinado a investigações profundas.", "# logging.debug(\"Valor da variavel: ...\")"),
          g("Complete a configuração de logging com nível informativo:", ["import logging\nlogging.basicConfig(level=logging.INFO)"], "basicConfig define o patamar mínimo de severidade capturado.", "import logging\n____(level=logging.INFO)"),
          o("Ordene as etapas para implementar observabilidade com logging em um módulo:", ["Importar o módulo logging no topo do arquivo do componente","Obter o logger com logger = logging.getLogger(__name__)","Registrar eventos de sucesso operacional com logger.info()","Capturar falhas com try/except e registrar diagnósticos com logger.error()"], "Arquitetura profissional para observabilidade e rastreabilidade em módulos Python."),
          p("Associe o nível de logging ao tipo de evento correspondente:", [["DEBUG","Informações detalhadas e diagnósticos úteis apenas durante desenvolvimento"],["INFO","Confirmação de que eventos operacionais esperados ocorreram com sucesso"],["WARNING","Indicação de anomalia ou evento inesperado que ainda não quebrou o sistema"],["ERROR","Falha que impediu a execução de uma operação específica na aplicação"]], "Hierarquia de severidades para instrumentação de software em Python.")
        ]
      },
      {
        id: "py-qual-5-5-depuracao-vscode",
        title: "Configurando o depurador no editor e IDEs",
        subtitle: "Produtividade · Pontos de interrupção visuais e watch expressions",
        theory: "IDEs modernas como VS Code e PyCharm oferecem depuradores visuais com interfaces gráficas ricas. No VS Code, a extensão oficial de Python lê o arquivo .vscode/launch.json, permitindo definir breakpoints clicando na margem do editor, avaliar watch expressions e inspecionar a árvore de variáveis.",
        questions: [
          q("Qual arquivo de configuração no VS Code armazena perfis de execução e depuração do projeto?", ".vscode/launch.json", [".vscode/settings.py",".vscode/tasks.xml"], "launch.json define parâmetros como interpretador, argumentos de CLI, variáveis de ambiente e arquivo inicial."),
          q("Como definir um ponto de interrupção visual (breakpoint) na maioria dos editores de código?", "Clicando diretamente na margem esquerda (gutter) ao lado do número da linha desejada", ["Digitando a palavra STOP na linha","Pintando o texto com marca-texto"], "Uma bolinha vermelha indica visualmente que o depurador pausará a execução antes de rodar aquela linha."),
          q("O que é um \"Conditional Breakpoint\" (breakpoint condicional) no editor?", "Um ponto de interrupção que pausa a execução apenas se uma expressão booleana for verdadeira", ["Um breakpoint que só roda aos finais de semana","Um breakpoint que apaga a linha do código"], "Útil para pausar dentro de loops longos apenas quando uma variável atinge um valor específico (ex: i == 500)."),
          q("O que o painel \"Watch\" de uma IDE permite ao desenvolvedor durante a depuração?", "Monitorar continuamente o valor de expressões customizadas a cada passo da execução", ["Assistir a tutoriais no YouTube","Ver o relógio do sistema"], "Facilita acompanhar transformações em propriedades complexas de objetos sem redigitar comandos."),
          t("Qual pasta padrão abriga as configurações locais do projeto no Visual Studio Code?", [".vscode"], ".vscode centraliza launch.json e settings.json do workspace.", "# pasta de configuracoes do VS Code"),
          g("Complete o tipo de depuração de arquivo corrente no launch.json do VS Code:", ["{\n    \"name\": \"Python: Current File\",\n    \"type\": \"debugpy\",\n    \"request\": \"launch\"\n}"], "debugpy é o adaptador de depuração moderno mantido pela Microsoft.", "{\n    \"name\": \"Python: Current File\",\n    \"type\": \"____\",\n    \"request\": \"launch\"\n}"),
          o("Ordene as etapas para iniciar uma sessão de depuração visual no editor:", ["Configurar o interpretador Python ativo apontando para o ambiente .venv","Clicar na margem esquerda da linha desejada para adicionar o ponto vermelho","Pressionar F5 ou clicar em \"Start Debugging\" na aba de depuração","Inspecionar variáveis locais na barra lateral e usar a barra flutuante de controle"], "Fluxo ergonômico de depuração gráfica em ambientes de desenvolvimento modernos."),
          p("Associe o botão da barra de controle de depuração visual ao seu atalho típico:", [["Continue (F5)","Retoma a execução até o próximo breakpoint encontrado"],["Step Over (F10)","Executa a próxima linha sem entrar na função chamada"],["Step Into (F11)","Entra para dentro da função invocada na linha atual"],["Stop (Shift+F5)","Encerra a sessão de depuração e fecha o processo"]], "Atalhos universais de controle de depuração em editores de código.")
        ]
      }
    ],
    6: [
      {
        id: "py-qual-6-1-type-hints",
        title: "Dotação de tipos (type hints) na assinatura de funções",
        subtitle: "Clareza · Documentando contratos de entrada e retorno com PEP 484",
        theory: "A PEP 484 introduziu a anotação opcional de tipos (type hints) no Python. Utilizando dois pontos (:) para parâmetros e a seta (->) para o retorno, o código explicita seus contratos de dados. O Python não aplica esses tipos em tempo de execução, mas ferramentas estáticas e editores os usam para autocompletar e auditoria.",
        questions: [
          q("Qual caractere é utilizado para anotar o tipo esperado de um parâmetro de função?", "Dois pontos (:) (ex: def saudacao(nome: str):)", ["Ponto e vírgula (;)","Arroba (@)"], "Dois pontos segue o nome do parâmetro indicando o tipo esperado pela assinatura."),
          q("Qual símbolo é utilizado na assinatura de uma função para declarar o tipo de retorno?", "Seta formada por hífen e maior (->) (ex: -> int:)", ["Sinal de igual (=)","Til (~)"], "A seta posicionada antes dos dois pontos finais expressa o tipo produzido pela função."),
          q("O interpretador CPython impede a execução se você passar um tipo diferente da anotação?", "Não, anotações de tipo são ignoradas pelo interpretador em runtime e servem para análise estática", ["Sim, o Python lança TypeError imediatamente","Sim, o arquivo é deletado"], "Python permanece uma linguagem dinamicamente tipada; a checagem é terceirizada para ferramentas como mypy."),
          q("Qual benefício imediato o uso de type hints traz no dia a dia com o editor de código?", "Autocompletar inteligente (IntelliSense) com sugestões precisas de métodos e atributos do objeto", ["O editor altera a cor de fundo do tema","O código passa a rodar mais devagar"], "Ao saber que usuario é do tipo Usuario, o editor sugere usuario.email e outros atributos com agilidade."),
          t("Qual símbolo de dois caracteres declara o tipo de retorno em uma função Python?", ["->"], "Sintaxe: def func() -> int:.", "# operador de declaracao de retorno"),
          g("Complete a assinatura tipada que recebe texto e devolve inteiro:", ["def contar_vogais(texto: str) -> int:"], "texto é str e a saída é anotada com -> int.", "def contar_vogais(texto: str) ____ int:"),
          o("Ordene os componentes de uma função Python totalmente anotada com tipos:", ["Palavra-chave def acompanhada pelo nome da função e parêntese de abertura","Parâmetro com anotação de tipo via dois pontos (ex: valor: float)","Seta de retorno com o tipo resultante (ex: -> bool)","Dois pontos finais e corpo indentado com a implementação"], "Anatomia formal de funções tipadas segundo as diretrizes da PEP 484."),
          p("Associe a anotação de tipo primitivo ao tipo de dado Python correspondente:", [["x: int","Número inteiro (ex: 42, -5, 0)"],["taxa: float","Número de ponto flutuante com casas decimais (ex: 3.14)"],["ativo: bool","Valor booleano de verdade (True ou False)"],["-> None","Indica explicitamente que a função não retorna nenhum valor útil"]], "Mapeamento de tipos primitivos padrão na tipagem estática do Python.")
        ]
      },
      {
        id: "py-qual-6-2-typing-avancado",
        title: "Módulo typing: Optional, Union, Any e genéricos",
        subtitle: "Expressividade · Modelando dados complexos e valores anuláveis",
        theory: "O módulo typing expande a expressividade do sistema de tipos. No Python moderno (3.10+), a barra vertical (|) expressa uniões de tipo (str | None substitui Optional[str], e int | float substitui Union[int, float]). O tipo Any aceita qualquer dado, enquanto coleções genéricas como list[str] e dict[str, int] tipam elementos.",
        questions: [
          q("Como representar no Python 3.10+ que um parâmetro aceita uma string ou o valor None?", "str | None", ["str or None","str ? None"], "A sintaxe com operador de barra vertical substituiu o antigo Optional[str] com elegância."),
          q("O que a anotação list[str] expressa sobre a coleção?", "Que a variável é uma lista onde cada elemento individual deve ser uma string", ["Que a lista só pode ter tamanho 1","Que a lista é imutável"], "Tipos genéricos parametrizados conferem a integridade interna de contêineres e coleções."),
          q("Quando o uso do tipo Any é considerado apropriado?", "Apenas em código dinâmico legado ou integrações onde o formato exato é verdadeiramente heterogêneo", ["Em todas as funções do projeto","Sempre que não quisermos pensar no tipo"], "Usar Any excessivamente desativa os benefícios da análise estática em cascata."),
          q("Como tipar uma função de callback que recebe um inteiro e devolve uma string?", "Callable[[int], str]", ["Function(int -> str)","Callback[int, str]"], "Callable[[Argumentos], Retorno] do módulo typing modela funções de primeira classe e closures."),
          t("Qual caractere operador introduzido no Python 3.10 substitui Union e Optional para união de tipos?", ["|"], "Exemplo: int | float | None.", "# operador de uniao de tipos PEP 604"),
          g("Complete a tipagem moderna para dicionário mapeando chave string para lista de inteiros:", ["def agrupar() -> dict[str, list[int]]:"], "Coleções built-in aceitam parâmetros genéricos com colchetes desde o Python 3.9.", "def agrupar() -> dict[str, ____[int]]:"),
          o("Ordene as opções de tipagem da mais específica (melhor) para a mais genérica:", ["Tipo exato: str ou int","União restrita de tipos permitidos: int | float","Contêiner genérico parametrizado: list[str]","Tipo curinga sem garantia: Any"], "Graduação de especificidade e rigor na tipagem estática de software."),
          p("Associe o construto de tipagem ao seu propósito representativo:", [["str | None","Valor de texto opcional que pode alternativamente ser nulo"],["dict[str, int]","Dicionário onde chaves são strings e valores são inteiros"],["Callable[[int], bool]","Função ou predicado que recebe um int e retorna True ou False"],["Literal[\"r\", \"w\", \"a\"]","Restringe o valor a strings estritas de uma lista permitida"]], "Construtos de expressividade avançada do sistema de tipos do Python.")
        ]
      },
      {
        id: "py-qual-6-3-checagem-mypy",
        title: "Checagem estática de tipos com mypy e pyright",
        subtitle: "Verificação prévia · Detectando erros de tipo antes da execução",
        theory: "O mypy é o verificador estático de tipos de referência para Python. Ele analisa a árvore sintática do projeto procurando incompatibilidades, violações de contratos e acessos a atributos inexistentes em objetos nulos, tudo sem executar uma única linha da aplicação. A ferramenta pyright oferece verificação ultra-rápida integrada a IDEs.",
        questions: [
          q("Qual é o papel do mypy no ciclo de desenvolvimento de software?", "Analisar o código estaticamente e apontar erros de tipo antes que o programa entre em execução", ["Executar testes unitários com pytest","Formatar a indentação do código"], "Atua como um compilador estático de verificação, identificando falhas potenciais precocemente."),
          q("Como o mypy trata uma chamada a nome.upper() se a variável nome estiver tipada como str | None?", "Gera um erro de tipo alertando que o valor pode ser None e não ter o método upper()", ["Executa normalmente e ignora o erro","Converte None em string automaticamente"], "Obriga o desenvolvedor a escrever um guard clause if nome is not None: antes de invocar o método."),
          q("Qual flag do mypy ativa o modo estrito exigindo tipagem completa e proibindo Any implícito?", "--strict", ["--hardcore","--force-types"], "O modo estrito é altamente recomendado para projetos novos e sistemas com altos requisitos de segurança."),
          q("O que é um arquivo de interface de tipos com extensão .pyi (stub file)?", "Arquivo que contém apenas assinaturas de funções e tipos sem implementações de corpo", ["Um arquivo executável binário","Uma imagem em formato vetorial"], "Usado para fornecer tipagem para bibliotecas em C ou pacotes de terceiros sem anotações embutidas."),
          t("Qual comando de terminal executa a auditoria estática de tipos do mypy no projeto?", ["mypy"], "mypy inspeciona arquivos e pacotes reportando inconsistências de tipo.", "# mypy src/"),
          g("Complete o comando mypy auditando o pacote meu_app em modo estrito:", ["mypy --strict meu_app"], "A flag --strict ativa todas as checagens rigorosas de tipagem.", "____ // comando mypy com flag --strict no pacote meu_app"),
          o("Ordene as etapas da checagem estática de tipos com mypy em um projeto:", ["Anotar funções e estruturas de dados com type hints (PEP 484/PEP 604)","Executar mypy no terminal apontando para a pasta raiz do código","Analisar a lista de mensagens de erro de tipo exibidas com arquivo e linha","Ajustar assinaturas ou adicionar guard clauses para sanar todas as violações"], "Fluxo contínuo de verificação e endurecimento de contratos com mypy."),
          p("Associe o erro comum do mypy à sua causa típica:", [["Item \"None\" of \"str | None\" has no attribute \"strip\"","Chamada de método em variável que pode ser nula sem guard clause"],["Argument 1 to \"somar\" has incompatible type \"str\"; expected \"int\"","Passagem de argumento com tipo diferente daquele declarado na assinatura"],["Incompatible return value type","A função retornou um tipo divergente daquele especificado no -> Retorno"],["Need type annotation for \"dados\"","Variável inicializada com coleção vazia [] requer anotação explícita"]], "Diagnósticos frequentes emitidos por checadores estáticos de tipos.")
        ]
      },
      {
        id: "py-qual-6-4-docstrings-pep257",
        title: "Documentação formal com docstrings (PEP 257)",
        subtitle: "Padronização · Descrevendo argumentos, retornos e exceções",
        theory: "Docstrings são literais de string posicionados como a primeira declaração de módulos, classes ou funções, delimitados por aspas triplas (\"\"\"). A PEP 257 define boas práticas de formato. Padrões consolidados como Google Style e NumPy Style estruturam seções para Args, Returns e Raises, alimentando geradores de documentação.",
        questions: [
          q("Qual delimitador de string é utilizado por convenção para criar docstrings em Python?", "Aspas triplas duplas (\"\"\")", ["Chaves duplas ({{}})","Sinais de porcentagem (%%%)"], "Permite criar textos com múltiplas linhas sem necessidade de caracteres de escape explícitos."),
          q("Onde a docstring de uma função deve ser obrigatoriamente posicionada?", "Como a primeiríssima instrução executável dentro do corpo da função, logo abaixo de def", ["No final do arquivo após o return","Antes da palavra-chave def"], "O interpretador armazena esse texto no atributo especial __doc__ do objeto."),
          q("Qual atributo especial de uma função em tempo de execução armazena o texto de sua docstring?", "__doc__", ["__info__","__help__"], "A função embutida help(funcao) lê e exibe o conteúdo de funcao.__doc__."),
          q("Quais são as três seções centrais em uma docstring no padrão Google Style?", "Args:, Returns: e Raises:", ["Input:, Output: e Crash:","Start:, Middle: e End:"], "Organização limpa e padronizada que descreve parâmetros, resultado e exceções esperadas."),
          t("Qual função embutida do Python exibe a documentação interativa de um módulo ou função?", ["help"], "help(objeto) imprime a docstring e a assinatura formatadas no console.", "# help(math.sqrt)"),
          g("Complete o acesso ao texto da documentação da função calcular:", ["print(calcular.__doc__)"], "O atributo especial __doc__ expõe a docstring em tempo de execução.", "print(calcular.____)"),
          o("Ordene os blocos de uma docstring completa no formato Google Style:", ["Resumo de uma linha em modo imperativo terminando com ponto final","Parágrafo descritivo mais detalhado sobre o comportamento da função","Seção Args: descrevendo cada argumento, restrição e tipo esperado","Seções Returns: e Raises: descrevendo o valor devolvido e exceções possíveis"], "Estruturação canônica de documentação segundo as convenções do Google Style."),
          p("Associe a seção da docstring ao conteúdo que ela deve detalhar:", [["Args:","Lista de parâmetros recebidos com suas regras, precondições e unidades"],["Returns:","Significado e estrutura do valor entregue pela função ao chamador"],["Raises:","Exceções que a função pode disparar sob condições anormais"],["Examples:","Exemplos práticos de uso demonstrando código e resultados esperados"]], "Seções canônicas de documentação técnica de APIs em Python.")
        ]
      },
      {
        id: "py-qual-6-5-doctest",
        title: "Validação executável de documentação com doctest",
        subtitle: "Documentação viva · Garantindo que exemplos na docstring continuem válidos",
        theory: "O módulo built-in doctest transforma exemplos de uso contidos na própria docstring em testes executáveis automatizados. Imitando sessões interativas de terminal com >>>, o doctest compara a saída produzida pela função com o texto esperado, impedindo que a documentação fique obsoleta ou desincronizada com o código.",
        questions: [
          q("Qual é a premissa central do módulo doctest da biblioteca padrão?", "Verificar se os exemplos interativos de código exibidos na docstring produzem os resultados prometidos", ["Converter o Python para documentação em PDF","Impedir a edição de docstrings"], "Combina documentação pedagógica viva com verificação contínua contra obsolescência de manuais."),
          q("Qual prefixo é utilizado dentro da docstring para simular comandos do terminal interativo Python?", ">>> ", ["$$$ ","### "], "O doctest lê qualquer linha iniciada por >>> e avalia a instrução no interpretador."),
          q("O que acontece se uma alteração no código mudar o retorno da função e a docstring não for atualizada?", "O doctest falha apontando a discrepância entre a saída obtida e a saída documentada", ["O Python apaga a docstring","O interpretador ajusta a docstring automaticamente"], "Alerta o desenvolvedor de que o exemplo público da documentação tornou-se incorreto e enganoso."),
          q("Como o pytest executa testes de doctest presentes nos arquivos do projeto?", "Adicionando a flag --doctest-modules ao comando de execução do pytest", ["Renomeando o arquivo para .doc","O pytest não suporta doctests"], "pytest --doctest-modules integra doctests à mesma suíte de testes unitários com facilidade."),
          t("Qual módulo padrão do Python é responsável por executar testes embutidos em docstrings?", ["doctest"], "doctest é built-in e não requer bibliotecas de terceiros.", "# modulo nativo de testes em docstrings"),
          g("Complete o exemplo de doctest dentro da docstring que testa a soma de 2 e 3:", ["\"\"\"\n>>> somar(2, 3)\n5\n\"\"\""], "O número 5 na linha seguinte indica o resultado esperado pelo doctest.", "\"\"\"\n>>> somar(2, 3)\n____\n\"\"\""),
          o("Ordene as etapas para criar e validar um exemplo executável com doctest:", ["Escrever a função com docstring delimitada por aspas triplas","Incluir a linha >>> minha_funcao(argumento) dentro da docstring","Escrever a saída exata esperada na linha imediatamente inferior","Executar python -m doctest meu_modulo.py para validar a conformidade"], "Fluxo de trabalho para desenvolvimento de documentação executável com doctest."),
          p("Associe a linha do doctest ao seu papel interpretativo:", [[">>> dobro(10)","Instrução de invocação simulando entrada no console interativo"],["20","Saída exata esperada que será comparada com o valor retornado"],["python -m doctest script.py","Comando da biblioteca padrão que roda os testes embutidos"],["pytest --doctest-modules","Integração que roda os doctests no ecossistema pytest"]], "Componentes e sintaxe de testes executáveis de documentação em Python.")
        ]
      }
    ],
    7: [
      {
        id: "py-qual-7-1-pep8-convencoes",
        title: "Convenções PEP 8: estilo de código, espaçamento e nomes",
        subtitle: "Legibilidade · O padrão comunitário de escrita limpa em Python",
        theory: "A PEP 8 é o guia oficial de estilo para código Python. Ela padroniza convenções como 4 espaços por nível de indentação (proibindo tabs), limite de 79 ou 88 caracteres por linha, snake_case para funções e variáveis, PascalCase para classes e UPPER_CASE para constantes globais, garantindo harmonia visual.",
        questions: [
          q("Qual é a convenção recomendada pela PEP 8 para nomes de funções e variáveis?", "snake_case (palavras em minúsculas separadas por sublinhado: calcular_total)", ["camelCase","kebab-case"], "O snake_case é o padrão idiomático universal para identificadores de funções em Python."),
          q("Qual é a convenção recomendada pela PEP 8 para nomes de classes?", "PascalCase (ou CapWords, com cada palavra iniciando em maiúscula: ContaBancaria)", ["snake_case","UPPER_CASE"], "Diferencia visualmente a instanciação de tipos da invocação de funções comuns."),
          q("Quantos espaços por nível de indentação a PEP 8 estipula como regra estrita?", "4 espaços", ["2 espaços","8 espaços"], "A PEP 8 desaconselha veementemente a mistura de tabulações e espaços para indentação."),
          q("Como constantes de configuração global devem ser nomeadas conforme a PEP 8?", "UPPER_CASE (letras maiúsculas com sublinhados: TIMEOUT_PADRAO)", ["lower_case","MixedCase"], "Sinaliza a outros desenvolvedores que o valor tem semântica de constante imutável."),
          t("Qual número de PEP corresponde ao guia canônico de estilo de código do Python?", ["8"], "A PEP 8 foi redigida originalmente por Guido van Rossum e Barry Warsaw.", "# PEP de estilo de codigo Python"),
          g("Complete o nome da classe bancária respeitando a convenção PascalCase da PEP 8:", ["class ContaCorrente:\n    pass"], "Classes usam PascalCase conforme as diretrizes da PEP 8.", "class ____:\n    pass // classe ContaCorrente em PascalCase"),
          o("Ordene as convenções de nomenclatura da PEP 8 por categoria:", ["funcao_calculo_imposto(): snake_case para funções e métodos","TAXA_SELIC_ANUAL: UPPER_CASE para constantes de módulo","ProcessadorDePagamento: PascalCase para classes e tipos","_atributo_interno: sublinhado inicial para membros protegidos"], "Mapeamento de convenções de nomenclatura prescritas pela PEP 8."),
          p("Associe o identificador à sua respectiva categoria segundo a PEP 8:", [["obter_dados_usuario","Nome de função em snake_case"],["RegistroAuditoria","Nome de classe em PascalCase (CapWords)"],["LIMITE_CONEXOES","Constante global de configuração em UPPER_CASE"],["_conexao_privada","Atributo com convenção de visibilidade interna/protegida"]], "Padrões oficiais de nomenclatura da linguagem Python.")
        ]
      },
      {
        id: "py-qual-7-2-formatacao-ruff-black",
        title: "Formatação determinística com Ruff format e Black",
        subtitle: "Automação · Eliminando discussões de estilo com formatação estrita",
        theory: "Formatadores determinísticos (como Black e Ruff format) reformatam o código fonte de maneira estrita e sem concessões de estilo pessoal. Eles garantem que todos os arquivos do repositório adotem exatamente a mesma disposição visual de vírgulas, quebras de linha e aspas, eliminando discussões fúteis em revisões de PR.",
        questions: [
          q("Qual é o benefício primário de adotar um formatador opinativo como Black ou Ruff format no time?", "Elimina discussões subjetivas de estilo de código em pull requests, automatizando a formatação", ["Garante que o código nunca apresente falhas lógicas","Aumenta a memória RAM da máquina"], "Toda a base adota um padrão visual unificado gerado pela máquina sem atritos interpessoais."),
          q("O que significa dizer que um formatador de código é determinístico?", "Que dado o mesmo código fonte de entrada, ele sempre gerará exatamente a mesma saída de caracteres", ["Que ele prevê o futuro do projeto","Que ele formata aleatoriamente"], "Não há margem para ambiguidades: a saída é previsível e reproduzível matematicamente."),
          q("Como o Black lida com o tamanho máximo padrão de linha?", "Adota 88 caracteres como limite padrão, balanceando densidade de texto e legibilidade em telas modernas", ["Fixa em 20 caracteres","Não possui limite de linha"], "O valor 88 foi escolhido empiricamente para acomodar código legível com poucas quebras artificiais."),
          q("Qual é a vantagem do Ruff format em relação ao Black tradicional?", "Executa em dezenas de milissegundos por ser compilado nativamente em Rust, sendo até 100x mais veloz", ["O Ruff format só aceita arquivos sem funções","O Black foi descontinuado"], "Oferece compatibilidade estrita com a gramática visual do Black com desempenho instantâneo."),
          t("Qual ferramenta em Rust desenvolvida pela Astral unifica formatação e lint ultra-rápidos?", ["ruff"], "Ruff substitui Black, flake8, isort e dezenas de plugins.", "# ferramenta moderna de lint e formatacao em Rust"),
          g("Complete o comando que formata todos os arquivos da pasta src usando o Ruff:", ["ruff format src/"], "ruff format aplica a formatação determinística no diretório.", "____ // comando ruff formatando arquivos da pasta src/"),
          o("Ordene o fluxo de integração do formatador automático no ciclo de trabalho:", ["Configurar o editor para formatar automaticamente ao salvar o arquivo (format on save)","Executar ruff format . antes de criar o commit para verificar arquivos pendentes","Incluir a checagem ruff format --check na pipeline de integração contínua (CI)","Bloquear o merge de pull requests que apresentem arquivos fora do padrão visual"], "Estratégia corporativa para governança determinística de formatação de código."),
          p("Associe a ferramenta ou flag de formatação ao seu propósito:", [["ruff format .","Aplica formatação determinística reescrevendo os arquivos no padrão"],["ruff format --check .","Apenas valida se o código está formatado sem alterar arquivos (para CI)"],["black --diff .","Exibe as diferenças visuais que seriam aplicadas sem salvar"],["pyproject.toml [tool.ruff]","Centraliza as configurações de comprimento de linha e exceções"]], "Operação de ferramentas de formatação determinística em Python.")
        ]
      },
      {
        id: "py-qual-7-3-linter-ruff-flake8",
        title: "Análise estática de erros e boas práticas com Ruff",
        subtitle: "Velocidade · Detectando importações mortas e variáveis não usadas",
        theory: "Um linter analisa o código estaticamente procurando erros sintáticos, más práticas, variáveis não utilizadas, importações mortas e complexidade excessiva. O Ruff substituiu ferramentas legadas como Flake8, isort e pydocstyle com velocidade incomparável, suportando centenas de regras configuráveis.",
        questions: [
          q("Qual é a diferença funcional entre um linter (como Ruff) e um formatador de código?", "O linter inspeciona erros conceituais e código morto; o formatador cuida apenas do espaçamento visual", ["O formatador apaga variáveis não usadas","O linter compila o código para C"], "Formatadores ajustam a estética; linters identificam armadilhas semânticas e violações de regras."),
          q("Qual problema clássico o linter detecta imediatamente ao analisar um arquivo?", "Importações não utilizadas (código morto) e variáveis locais atribuídas mas nunca lidas", ["Arquivos com nomes com mais de 10 letras","Falta de acesso à internet"], "Eliminar importações desnecessárias acelera o tempo de carga e evita acoplamentos fantasmas."),
          q("Como o Ruff lida com a organização de importações tradicionalmente feita pelo isort?", "Ordena automaticamente os imports em blocos (built-in, terceiros e locais) com suporte nativo (regra I)", ["Exclui todas as bibliotecas de terceiros","Mistura todos os imports em uma única linha"], "A regra I do Ruff agrupa e ordena as dependências em ordem alfabética automaticamente."),
          q("Qual flag do comando ruff check aplica correções automáticas seguras no código fonte?", "--fix", ["--patch-all","--auto-heal"], "ruff check --fix remove importações mortas e reordena blocos sem intervenção manual."),
          t("Qual comando do Ruff executa a auditoria estática de regras e linter no projeto?", ["ruff check"], "ruff check inspeciona a árvore de código reportando avisos e erros.", "# ruff check ."),
          g("Complete o comando que audita e aplica correções automáticas de lint com Ruff:", ["ruff check --fix ."], "A flag --fix reescreve automaticamente trechos com soluções triviais.", "____ // comando ruff checando e corrigindo com flag --fix na pasta atual"),
          o("Ordene as etapas de saneamento de código com linter antes de submeter um PR:", ["Executar ruff check . no terminal para listar todas as infrações de lint","Aplicar correções automatizadas imediatas com ruff check --fix .","Avaliar manualmente os alertas restantes que exigem refatoração de lógica","Rodar a suíte de testes unitários para confirmar que as correções preservaram o comportamento"], "Roteiro de higienização de código com linters estáticos em Python."),
          p("Associe o código de erro clássico de lint ao problema identificado:", [["F401 (Flake8/Ruff)","Módulo ou símbolo importado mas nunca utilizado no código"],["F841 (Flake8/Ruff)","Variável local atribuída mas nunca lida na função"],["E501 (Flake8/Ruff)","Linha excedeu o limite máximo de caracteres configurado"],["B008 (Flake8-bugbear)","Chamada de função como argumento padrão na assinatura de def"]], "Códigos de violação clássicos identificados por linters em Python.")
        ]
      },
      {
        id: "py-qual-7-4-seguranca-bandit",
        title: "Auditoria de segurança estática com Bandit",
        subtitle: "Segurança · Rastreando vulnerabilidades comuns, SQLi e secrets no código",
        theory: "O Bandit é uma ferramenta voltada para localizar problemas comuns de segurança em código Python. Ele constrói uma árvore sintática abstrata (AST) e verifica padrões vulneráveis, tais como uso inseguro de eval(), injeções de SQL por concatenação, números pseudoaleatórios fracos e credenciais expostas.",
        questions: [
          q("Qual é o propósito da ferramenta de análise estática Bandit?", "Identificar vulnerabilidades conhecidas de segurança (como injeção de comandos e senhas hardcoded)", ["Medir a velocidade da conexão de rede","Criar interfaces gráficas para usuários"], "O Bandit atua como um scanner AST de segurança focado nas especificidades do ecossistema Python."),
          q("Por que o Bandit alerta com severidade alta sobre o uso da função eval() ou exec()?", "Porque executam strings arbitrárias como código Python, abrindo brechas para Remote Code Execution (RCE)", ["Porque deixam o código com muitas linhas","Porque gastam muita memória cache"], "Entradas não sanitizadas passadas para eval() permitem que invasores executem comandos no servidor."),
          q("Por que o Bandit sinaliza o uso do módulo nativo random para geração de tokens de segurança?", "O módulo random é previsível; para segurança e criptografia deve-se usar o módulo secrets", ["Porque o random só gera números negativos","Porque o random é exclusivo para jogos de tabuleiro"], "O módulo secrets produz números aleatórios criptograficamente seguros pelo sistema operacional."),
          q("Como o Bandit auxilia na prevenção de Injeção de SQL (SQL Injection)?", "Detectando construção de consultas SQL por formatação de string (f-strings) em vez de parâmetros preparados", ["Bloqueando o acesso ao banco de dados","Criptografando todas as colunas da tabela"], "Obriga a equipe a adotar consultas parametrizadas na interação com o banco de dados."),
          t("Qual comando de terminal executa a auditoria de segurança estática do Bandit no pacote \"src\"?", ["bandit -r src"], "A flag -r instrui o Bandit a escanear a pasta recursivamente.", "# auditoria recursiva de seguranca com bandit"),
          g("Complete o comando que executa o Bandit filtrando apenas severidades média e alta:", ["bandit -r src/ -ll"], "A flag -ll restringe o relatório aos alertas de severidade MEDIUM e HIGH.", "____ // comando bandit recursivo em src/ com flag -ll"),
          o("Ordene as etapas de uma auditoria preventiva de segurança de código:", ["Executar o Bandit sobre todo o código fonte para identificar pontos suspeitos","Inspecionar os alertas de uso de eval, subprocess com shell=True e SQL puro","Substituir o módulo random pelo módulo secrets em geração de tokens e senhas","Adicionar o Bandit como etapa mandatória na esteira de CI com bloqueio de falha"], "Práticas essenciais de DevSecOps aplicadas ao desenvolvimento com Python."),
          p("Associe a vulnerabilidade detectada pelo Bandit à prática correta de correção:", [["eval(entrada_usuario)","Substituir por ast.literal_eval() ou parser estruturado como json.loads"],["subprocess.run(..., shell=True)","Passar lista de argumentos e definir shell=False para evitar injeção de comandos"],["random.choice(caracteres)","Utilizar secrets.choice() para chaves de autenticação e tokens"],["f\"SELECT * WHERE id = {id}\"","Utilizar placeholders parametrizados (cursor.execute(\"... %s\", (id,)))"]], "Padrões de remediação de vulnerabilidades clássicas em Python.")
        ]
      },
      {
        id: "py-qual-7-5-pre-commit-hooks",
        title: "Automação preventiva com ganchos do pre-commit",
        subtitle: "Garantia no commit · Impedindo commits com erros de formatação ou lint",
        theory: "O framework pre-commit gerencia ganchos (hooks) do Git disparados automaticamente antes da confirmação de cada commit. Configurado no arquivo .pre-commit-config.yaml, ele roda verificações como remoção de espaços em branco, formatação com Ruff e checagem de tipos, rejeitando commits fora das regras.",
        questions: [
          q("O que acontece quando um gancho gerenciado pelo pre-commit encontra um erro de formatação?", "O commit é abortado pelo Git, permitindo ao programador aplicar o fix antes de tentar commitar novamente", ["O repositório Git é apagado","O commit é enviado diretamente para a nuvem sem testes"], "Garante que código defeituoso ou fora do padrão visual sequer entre no histórico local de commits."),
          q("Qual arquivo centraliza as regras e repositórios de hooks do framework pre-commit?", ".pre-commit-config.yaml", ["precommit.json","git-hooks.xml"], "Arquivo YAML versionado na raiz do projeto onde plugins e revisões são declarados."),
          q("Qual comando do pre-commit instala os ganchos configurados na pasta .git/hooks local?", "pre-commit install", ["pre-commit activate","git hook enable"], "Registra o script executável na pasta interna de ganchos do Git da máquina do desenvolvedor."),
          q("Como rodar todos os ganchos do pre-commit sobre todos os arquivos sem precisar criar um commit?", "pre-commit run --all-files", ["pre-commit test-now","git check-all"], "Ideal para sanar pendências em lotes grandes e verificar a base de código integralmente."),
          t("Qual comando do pre-commit instala os ganchos do Git no repositório local?", ["pre-commit install"], "Configura o gancho .git/hooks/pre-commit para interceptar commits.", "# instala hooks no Git"),
          g("Complete o comando para executar todos os ganchos do pre-commit em todos os arquivos:", ["pre-commit run --all-files"], "A flag --all-files força a validação completa do repositório.", "____ // pre-commit executando em todos os arquivos com --all-files"),
          o("Ordene as etapas para ativar o pre-commit em um novo projeto de equipe:", ["Criar o arquivo .pre-commit-config.yaml declarando hooks de ruff e trailing-whitespace","Executar pre-commit install para registrar os scripts nos hooks do Git","Fazer uma alteração de teste e disparar git commit -m \"teste\"","Observar os hooks rodando e reformatando arquivos antes do commit ser concluído"], "Fluxo de trabalho para blindagem preventiva do fluxo de commits com pre-commit."),
          p("Associe o gancho comum do pre-commit à sua verificação preventiva:", [["trailing-whitespace","Remove espaços em branco inúteis no final das linhas de texto"],["end-of-file-fixer","Assegura que todo arquivo termine com uma linha nova vazia"],["check-yaml / check-json","Valida a sintaxe estrita de arquivos de configuração declarativos"],["ruff / ruff-format","Executa linter e formatação estrita antes de permitir o commit"]], "Ganchos essenciais para manutenção de higiene em repositórios Git.")
        ]
      }
    ],
    8: [
      {
        id: "py-qual-8-1-conceitos-ci",
        title: "Princípios de Integração Contínua (CI) para projetos Python",
        subtitle: "Automação de qualidade · Executando testes a cada pull request",
        theory: "A Integração Contínua (CI) automatiza o processo de integração e verificação de alterações de código. Servidores de CI executam linters, verificadores de tipo e suítes de testes em contêineres limpos a cada commit ou pull request, garantindo que o branch principal (main) permaneça sempre estável e verde.",
        questions: [
          q("Qual é o princípio fundamental da Integração Contínua (CI)?", "Integrar e validar alterações de código frequentemente através de testes automatizados executados na nuvem", ["Deletar branches secundários a cada hora","Programar sem utilizar controle de versão"], "Detecta regressões e quebras de contrato precocemente, reduzindo o custo de correção de defeitos."),
          q("O que caracteriza uma esteira de CI saudável e confiável?", "Execução rápida, determinística, com passos isolados e feedback claro aos desenvolvedores", ["Uma esteira que demora 10 horas para rodar","Uma esteira que ignora testes que falham"], "Se a esteira for lenta ou instável (flaky), os desenvolvedores passam a ignorar seus alertas."),
          q("Qual é a política recomendada em relação ao branch principal (main) em equipes de engenharia?", "Bloquear commits diretos na main e exigir que todos os testes de CI passem antes de permitir o merge", ["Permitir que qualquer pessoa envie commits sem revisão","Desativar testes para acelerar merges"], "Branch protection rules garantem a estabilidade inegociável do código que vai para produção."),
          q("O que significa o termo \"Build Quebrado\" (broken build) em CI?", "Uma ou mais etapas da esteira (lint, tipagem ou testes) falhou durante a validação do código", ["O servidor de CI foi danificado fisicamente","O arquivo .py foi corrompido no disco"], "Indica que a alteração introduziu uma regressão ou violação de contrato e deve ser corrigida imediatamente."),
          t("Qual sigla em inglês representa a Integração Contínua no ciclo DevOps?", ["CI"], "Continuous Integration é a sigla universal para a prática de integração contínua.", "# Continuous Integration"),
          g("Complete a regra que exige que os testes passem antes do merge na branch protegida:", ["require status checks to pass before merging"], "Configuração de governança de branch em plataformas de hospedagem Git.", "____ // politica de branch protection exigindo status checks verdes"),
          o("Ordene as etapas executadas sequencialmente em uma pipeline típica de CI:", ["Disparo do gatilho pelo Git (push em branch ou abertura de Pull Request)","Provisionamento de runner limpo com checkout do código e cache de dependências","Execução de verificações estáticas rápidas (formatação com ruff e tipos com mypy)","Execução da suíte completa de testes unitários com medição de cobertura no pytest"], "Pipeline canônica de validação contínua em projetos de software."),
          p("Associe o termo de CI ao seu significado operacional:", [["Runner / Agent","Máquina virtual ou contêiner que executa os passos declarados no workflow"],["Pipeline / Workflow","Conjunto encadeado de tarefas automatizadas disparadas por eventos do repositório"],["Artifact","Arquivos produzidos pelo build mantidos para download (ex: relatórios de teste)"],["Status Badge","Selo visual no README indicando se o último build da main foi aprovado"]], "Terminologia essencial de esteiras de integração contínua.")
        ]
      },
      {
        id: "py-qual-8-2-github-actions",
        title: "Criando workflows no GitHub Actions para Python",
        subtitle: "Pipeline · Matriz de versões e instalação em runners limpos",
        theory: "O GitHub Actions é a plataforma nativa de automação do GitHub. Workflows são definidos em arquivos YAML dentro da pasta .github/workflows/. Eles utilizam ações comunitárias como actions/checkout para clonar o código e actions/setup-python para provisionar versões específicas do interpretador com cache de pacotes.",
        questions: [
          q("Em qual diretório do repositório os arquivos de workflow do GitHub Actions devem residir?", ".github/workflows/", [".actions/config/",".ci/github/"], "O GitHub monitora especificamente essa pasta para registrar e disparar automações."),
          q("Qual ação oficial do GitHub Actions configura a versão desejada do interpretador Python no runner?", "actions/setup-python", ["actions/install-cpython","actions/python-env"], "setup-python suporta instalação de múltiplas versões e cache nativo de gerenciadores como pip e poetry."),
          q("Qual evento do GitHub Actions dispara o workflow quando uma nova solicitação de merge é criada?", "pull_request", ["push_merge","git_review"], "on: [push, pull_request] garante que branches e PRs sejam devidamente testados antes do merge."),
          q("Como habilitar o cache de dependências do pip na ação setup-python para acelerar a execução?", "Definindo o parâmetro cache: \"pip\" na configuração da action setup-python", ["Digitando a palavra FAST no arquivo","Criando um arquivo zip manual"], "Evita o download repetido de centenas de MB de pacotes em cada execução do workflow."),
          t("Qual formato de arquivo declarativo é utilizado para escrever workflows do GitHub Actions?", ["YAML"], "Workflows usam a extensão .yml ou .yaml com indentação rigorosa.", "# formato YAML de workflows"),
          g("Complete a declaração da versão 3.12 do Python na action setup-python:", ["- uses: actions/setup-python@v5\n  with:\n    python-version: \"3.12\""], "with: python-version especifica a versão desejada do interpretador.", "- uses: actions/setup-python@v5\n  with:\n    ____: \"3.12\""),
          o("Ordene a estrutura básica de um arquivo de workflow no GitHub Actions:", ["name: Testes Python (identificador amigável exibido na interface)","on: [push, pull_request] (eventos que disparam a execução da automação)","jobs: test (definição do trabalho a ser executado em um runner ubuntu-latest)","steps: checkout, setup-python, install dependencies e run pytest"], "Anatomia hierárquica de um arquivo YAML do GitHub Actions."),
          p("Associe a instrução do GitHub Actions à sua ação no pipeline:", [["uses: actions/checkout@v4","Clona o repositório Git dentro da máquina do runner"],["uses: actions/setup-python@v5","Instala a versão informada do interpretador Python e configura o PATH"],["run: pip install -r requirements.txt","Executa comando de terminal no shell do sistema operacional do runner"],["runs-on: ubuntu-latest","Define o sistema operacional base da máquina virtual que executará o job"]], "Comandos e diretivas fundamentais de arquivos de workflow do GitHub Actions.")
        ]
      },
      {
        id: "py-qual-8-3-matrix-testes",
        title: "Matriz de compatibilidade: testando múltiplas versões",
        subtitle: "Portabilidade · Validando comportamento em Python 3.10, 3.11 e 3.12",
        theory: "A estratégia de matriz (matrix build) no GitHub Actions permite que o mesmo conjunto de testes seja executado em paralelo em múltiplas versões do Python e em diferentes sistemas operacionais (Ubuntu, Windows, macOS). Isso assegura que bibliotecas distribuídas funcionem perfeitamente para todos os usuários.",
        questions: [
          q("Qual é o propósito de utilizar uma matriz de testes (strategy: matrix) em CI?", "Rodar a suíte de testes em paralelo através de múltiplas versões do Python e múltiplos sistemas operacionais", ["Duplicar o código fonte do repositório","Minimizar a quantidade de testes escritos"], "Detecta incompatibilidades entre versões antigas e novos lançamentos da linguagem."),
          q("Como a diretiva strategy: matrix: python-version: [\"3.10\", \"3.11\", \"3.12\"] afeta a execução?", "O GitHub Actions dispara 3 jobs independentes e paralelos, um para cada versão de Python listada", ["Executa apenas a versão 3.12","Executa uma versão por dia da semana"], "Permite visualizar em matriz qual versão falhou de forma rápida e clara."),
          q("Qual parâmetro da matriz permite que outros jobs continuem rodando mesmo se uma das versões falhar?", "fail-fast: false", ["continue: true","ignore-errors: all"], "Por padrão fail-fast é True; desligá-lo permite ver se o erro é exclusivo de uma única versão do Python."),
          q("Por que é importante testar pacotes open-source também no sistema operacional Windows no CI?", "Porque o Windows possui particularidades em separadores de caminhos (\\ vs /) e codificações de arquivo", ["Porque o Windows é o único sistema que suporta Python","Porque o Linux não tem suporte a testes"], "Evita bugs sutis de caminhos absolutos e problemas de permissões de descritores de arquivos."),
          t("Qual chave do job no GitHub Actions define a matriz de variações paralelas?", ["matrix"], "Sintaxe: strategy: matrix: python-version: [...].", "# definicao da matriz de execucao"),
          g("Complete a matriz testando Python no Ubuntu e no Windows:", ["strategy:\n  matrix:\n    os: [ubuntu-latest, windows-latest]"], "A matriz gera combinações cartesianas entre todos os parâmetros declarados.", "strategy:\n  ____:\n    os: [ubuntu-latest, windows-latest]"),
          o("Ordene as etapas para configurar uma matriz multi-versão no GitHub Actions:", ["Declarar a chave strategy: com matrix: e a lista python-version: [\"3.10\", \"3.11\", \"3.12\"]","Configurar fail-fast: false para permitir auditoria de todas as variantes","Conectar o setup-python à variável da matriz via ${{ matrix.python-version }}","Disparar a esteira e monitorar os 3 jobs executando simultaneamente em paralelo"], "Configuração profissional de matrizes de compatibilidade em pipelines de CI."),
          p("Associe a diretiva da matriz ao seu comportamento no workflow:", [["strategy: matrix:","Declara as variáveis cujas combinações gerarão jobs paralelos"],["${{ matrix.python-version }}","Expressão que interpola a versão específica daquele runner no passo"],["fail-fast: false","Mantém os demais jobs rodando mesmo se um job da matriz falhar"],["include / exclude","Permite adicionar configurações específicas ou remover combinações indesejadas"]], "Operadores e expressões para matrizes de teste no GitHub Actions.")
        ]
      },
      {
        id: "py-qual-8-4-relatorios-artefatos",
        title: "Publicação de relatórios de cobertura e artefatos de build",
        subtitle: "Transparência · Integrando badges e alertas de qualidade no repositório",
        theory: "Pipelines avançadas de CI publicam relatórios de teste e métricas de cobertura como artefatos acessíveis ou comentários automáticos no Pull Request. Ferramentas como Codecov e Coveralls processam arquivos coverage.xml e atualizam badges dinâmicos no README, dando visibilidade imediata à saúde do projeto.",
        questions: [
          q("Qual é a função da action actions/upload-artifact no GitHub Actions?", "Salvar arquivos e relatórios gerados durante a execução do workflow para download e inspeção posterior", ["Enviar o código fonte para a lixeira","Publicar o código em redes sociais"], "Permite baixar relatórios HTML de cobertura ou logs completos gerados pelo runner."),
          q("O que representa o badge de cobertura (coverage badge) exibido no topo do README do projeto?", "Um indicador visual dinâmico com o percentual de cobertura de código auditado no último commit da main", ["O número de estrelas que o projeto tem no GitHub","A velocidade do processador do servidor"], "Demonstra publicamente a maturidade e o compromisso da equipe com testes automatizados."),
          q("Qual formato padronizado de arquivo de cobertura o pytest-cov exporta para integração com serviços de métricas?", "coverage.xml (formato padrão Cobertura XML)", ["coverage.bmp","coverage.mp3"], "A flag --cov-report=xml gera o arquivo XML interpretado por serviços como Codecov e SonarQube."),
          q("Como ferramentas como Codecov auxiliam na revisão de um Pull Request?", "Postam um comentário detalhado no PR mostrando se a cobertura aumentou ou diminuiu e quais linhas foram afetadas", ["Aprovam o PR automaticamente sem testes","Enviam mensagens de texto para os celulares dos autores"], "Facilita aos revisores identificar se o código novo veio acompanhado dos devidos testes."),
          t("Qual extensão de arquivo padronizada é gerada com a flag --cov-report=xml?", [".xml"], "coverage.xml é o formato universal de ingestão para métricas de cobertura.", "# formato XML de relatorio de cobertura"),
          g("Complete o comando pytest para gerar o relatório em formato XML para o CI:", ["pytest --cov=src --cov-report=xml"], "A flag --cov-report=xml grava o arquivo coverage.xml.", "pytest --cov=src ____=xml"),
          o("Ordene o fluxo de publicação de métricas de cobertura a partir do CI:", ["Executar pytest gerando o arquivo estruturado coverage.xml","Submeter o arquivo de métricas para a plataforma de cobertura (ex: Codecov)","A plataforma analisa as linhas alteradas e publica o relatório no Pull Request","O badge de cobertura no arquivo README.md é atualizado com a nova porcentagem"], "Ciclo completo de transparência e monitoramento de qualidade com relatórios de cobertura."),
          p("Associe a ferramenta ou arquivo ao seu papel na publicação de métricas:", [["actions/upload-artifact@v4","Armazena relatórios e logs gerados pelo workflow para download"],["coverage.xml","Relatório padronizado em formato XML com linhas executadas e ausentes"],["Codecov / Coveralls","Plataforma SaaS que analisa relatórios de cobertura e comenta em PRs"],["Status Badge no README","Imagem em SVG que exibe o percentual consolidado de cobertura do projeto"]], "Componentes do ecossistema de observabilidade de qualidade em projetos abertos.")
        ]
      },
      {
        id: "py-qual-8-5-projeto-qualidade",
        title: "Projeto integrado: suíte de qualidade de ponta a ponta",
        subtitle: "Síntese profissional · Combinando venv, pytest, tipos, ruff e CI",
        theory: "Neste projeto prático de síntese, consolidamos todos os pilares da qualidade de software em Python. Estruturamos um pacote modular moderno com venv, anotações de tipo rigorosas auditadas com mypy, testes unitários e casos de borda no pytest, formatação e linting estritos com Ruff e um workflow completo de CI.",
        questions: [
          q("Quais são as três etapas fundamentais de validação estática antes da execução de testes dinâmicos?", "Formatação estrita (Ruff format), análise de boas práticas (Ruff check) e tipos estáticos (mypy)", ["Deletar o venv, desligar a máquina e reiniciar o Git","Escrever comentários em todas as linhas"], "Validações estáticas rodam em segundos e filtram a maior parte dos erros banais antes dos testes unitários."),
          q("Em uma suíte de qualidade profissional, qual deve ser a ordem de execução no script de validação local?", "Linters e formatadores primeiro (mais rápidos), seguidos por checagem de tipos e finalmente a suíte de testes", ["Testes primeiro e linters depois","Apenas rodar testes e ignorar linters"], "A filosofia fail-fast economiza tempo ao interromper a validação logo no primeiro erro estático simples."),
          q("Qual arquivo único de configuração moderno reúne parâmetros do Ruff, mypy e pytest?", "pyproject.toml", ["settings.py","config.ini"], "As seções [tool.ruff], [tool.mypy] e [tool.pytest.ini_options] centralizam a governança do repositório."),
          q("Por que um projeto de portfólio profissional deve ter pipeline de CI verde e badges no README?", "Comprova maturidade técnica, disciplina de engenharia de software e padrões de entrega corporativos", ["Porque o GitHub exige badges para manter o projeto público","Porque aumenta a velocidade de download"], "Demonstra a recrutadores e equipes que o desenvolvedor domina o ciclo completo de vida de software."),
          t("Qual comando unificado executa pytest, checagem e cobertura em uma única chamada?", ["pytest --cov"], "Combina execução de asserções com auditoria de linhas cobertas.", "# pytest com instrumentacao de cobertura"),
          g("Complete a seção de configuração do pytest dentro do pyproject.toml:", ["[tool.pytest.ini_options]\ntestpaths = [\"tests\"]\naddopts = \"-v --strict-markers\""], "Configuração centralizada de argumentos padrão para execução do pytest.", "[tool.pytest.ini_options]\n____ = [\"tests\"]\naddopts = \"-v --strict-markers\""),
          o("Ordene as etapas da esteira de qualidade ponta a ponta em um projeto Python moderno:", ["Configurar o ambiente isolado e dependências declaradas em pyproject.toml","Aplicar formatação e lint estrito com ruff format e ruff check","Validar contratos e tipos estáticos em modo estrito com mypy","Executar testes unitários com pytest e validar cobertura com pytest-cov no CI"], "Pipeline de excelência em engenharia de software para projetos Python."),
          p("Associe a ferramenta da esteira de qualidade ao seu papel no projeto integrado:", [["Ruff (format e check)","Garante estilo uniforme, remove código morto e previne más práticas em milissegundos"],["Mypy (--strict)","Audita a consistência de tipos e impede operações em valores nulos ou incompatíveis"],["Pytest (--cov)","Executa testes unitários, valida contratos e mede a cobertura de código"],["GitHub Actions (CI)","Orquestra toda a esteira em runners limpos protegendo a integridade da branch main"]], "Pilar integrado de qualidade, robustez e entrega contínua em Python.")
        ]
      }
    ]
  });
})();
