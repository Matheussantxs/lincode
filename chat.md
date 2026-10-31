# Memória do projeto — Lincode

Atualizado em **30/10/2026**. Resumo dos pedidos e decisões desta conversa para continuidade do trabalho. Não é uma transcrição literal nem contém instruções internas de ferramentas.

## Pedidos do usuário

1. Partir do projeto `rea-duolingo` fornecido e investigar a experiência de https://pt.duolingo.com/ com REA.
2. Adaptar o conceito ao aprendizado de programação.
3. Substituir os cursos de idiomas por trilhas de linguagens de programação.
4. Incluir capítulos de lógica de programação e programação orientada a objetos.
5. Incluir aprendizado de fluxogramas dentro de lógica de programação.
6. Utilizar repositórios e skills fornecidos que sejam relevantes.
7. Na trilha Python, adicionar os capítulos da imagem:
   - 8. Operações Vetoriais, Indexação, Broadcasting e Manipulação de Matrizes com NumPy.
   - 9. Limpeza, Transformação e Análise de Dados com Pandas.
   - 10. Análise Estatística com Statsmodels.
   - 11. Machine Learning e MLOps com Scikit-Learn — Projeto de Data Science de Ponta a Ponta para Construção de Portfólio.
8. Criar documento do produto, planejamento e documentação do projeto, além deste `chat.md`.
9. Colocar tudo em **uma única pasta**.
10. Preparar para **postar no GitHub depois**. Essa mensagem indica uma etapa futura; não autoriza publicação imediata.

## Decisões de implementação adotadas pelo assistente

Estas escolhas ainda podem ser ajustadas pelo usuário:

- Manter o nome provisório **Lincode**, encontrado na base fornecida.
- Trilhas iniciais: Python, JavaScript, Java, C# e C++.
- Protótipo com HTML, CSS e JavaScript, sem instalação de dependências de frontend.
- Três capítulos comuns: lógica com fluxogramas; fundamentos da linguagem; POO.
- Python com 11 capítulos; capítulos 4–7 conectam a base aos temas 8–11 solicitados.
- Lições curtas com teoria, dois exercícios, feedback e novas tentativas.
- Progresso local por linguagem; 20 XP pela primeira conclusão e revisão sem XP duplicado.
- Projeto de portfólio local com dados sintéticos, sem implantação externa.

## Estado entregue nesta pasta

- Protótipo com **80 lições e 160 exercícios** definidos no conteúdo.
- Documentos em `docs/` e instruções na raiz.
- Scripts Python de treino, previsão e comparação de lotes.
- `.gitignore` para evitar versionar ambientes, artefatos gerados, perfis e credenciais.
- Referências oficiais das bibliotecas nos documentos.

## Validação e limites

- Verificação sintática dos arquivos JavaScript realizada.
- Treino, inferência e comparação de lote do projeto Python executados localmente.
- A tentativa de verificação automatizada do navegador foi interrompida por indisponibilidade de conexão; não há homologação visual ou dos fluxos completos.
- A análise REA do bundle principal encontrou limite de tempo e retornou observação parcial. Não foi recuperado o backend do Duolingo.
- Os arquivos da base original não foram alterados; os novos entregáveis estão reunidos nesta pasta.
- Não foi criado repositório remoto nem publicado conteúdo.

## Próximos passos

1. Homologar o protótipo no navegador usando `docs/VALIDACAO.md`.
2. Corrigir eventuais falhas e revisar conteúdo pedagógico.
3. Confirmar nome definitivo, público, critérios de progressão e prioridade de lançamento.
4. Decidir nome, visibilidade e licença do repositório.
5. Publicar no GitHub após solicitação explícita, seguindo `docs/PUBLICACAO_GITHUB.md`.
6. Evoluir para conta e sincronização somente após definir o escopo dessa fase.

## Como retomar

Leia `README.md`, `docs/DOCUMENTO_DO_PRODUTO.md`, `docs/PLANO_DE_EXECUCAO.md` e `docs/VALIDACAO.md`. Preserve os requisitos do usuário e diferencie recursos implementados, verificados e planejados. Não apresente a demonstração local como plataforma em produção.

## Retomada: 9Router (30/10/2026)

O usuário priorizou instalar o 9Router antes de continuar a expansão do Lincode. Código oficial instalado em `tools/9router`, versão 0.5.112, commit `1fe586bb1cf35e1ed0cb2150a8ef7d1db040b21d`; 556 dependências instaladas. Criados `Iniciar9Router.cmd`, configuração local com senha aleatória e guia `docs/9ROUTER.md`.

Servidor iniciado apenas em `127.0.0.1:20128`. Status de autenticação e login retornaram 200. O painel retornou 200 no servidor após uma compilação inicial de aproximadamente três minutos, excedendo o timeout do cliente de teste. Catálogo automático também registrou timeout. Credenciais e dados locais estão excluídos do Git.

Pendente: inserir a chave OpenRouter diretamente no painel, testar uma chamada de IA e configurar/testar o Ruflo. A expansão para 75 capítulos e 24.000 atividades permanece pendente; os números anteriores são históricos, não confirmação de conclusão do plano aprovado. Nenhuma publicação no GitHub foi feita.

## 31/10/2026 — retomada da implementação

O projeto continua reunido nesta pasta. A interface foi substituída por fundo preto, grafite, coral e ciano; menu com Aprender, Praticar, Missões, Projetos, Perfil e Mais; Bit como robô vetorial com quatro expressões. As aulas usam URLs próprias e retomam respostas parciais. Há cadastro/login local, transferência do visitante ao criar conta, isolamento, metas e registro de tempo ativo separado de XP.

O catálogo agora contém 75 capítulos e 600 unidades planejadas. Conteúdo disponível: 111 lições e 348 atividades. As cinco novas lições de fluxogramas Python possuem oito atividades cada, assim como as 16 lições autorais de C#. As 90 lições legadas ainda têm duas atividades. A meta 3.000/24.000 NÃO está concluída; o validador em modo --complete deve reprovar.

Humanizer foi instalado em references/humanizer e aplicado aos textos. Awesome Design MD, ECC e Ponytail orientaram a interface e a implementação. Não houve nova observação autenticada do Duolingo, nem revisão por Ruflo com inferência comprovada. A configuração do provedor continua separada da implementação do produto.

Testes locais cobrem contas, progresso, recompensas, migração, retomada, formatos de atividade, tempo ativo e estados de interface; capturas de desktop/celular ficam em docs/qa. A verificação de contraste encontrou e corrigiu uma descrição no cabeçalho coral. Não houve auditoria com leitor de tela, homologação em todos os navegadores nem publicação no GitHub.

Próxima prioridade: completar a autoria do capítulo de lógica Python sem preencher quantidades com cópias, revisar o conteúdo e seguir pelos capítulos e projetos do plano. README, CURRICULO, PLANO_DE_EXECUCAO, ARQUITETURA e VALIDACAO documentam o estado vigente; registros anteriores deste chat.md são históricos.


## 31/10/2026 — Supabase e preparação da publicação

Backend adaptado para Supabase Auth/Postgres, CSRF assinado, cookies cifrados, RLS em migração e limitador compartilhado. Doze testes locais passaram com provedor simulado. Projeto Supabase, execução real de RLS, auditoria Strix e publicação GitHub/Vercel ainda pendentes. Contas locais preservadas sem migração automática. Currículo continua 111 lições/348 atividades, não completo.

## 31/10/2026 — Conexões confirmadas

Supabase conectado: organização Kavolt; projeto existente Kvolt inativo. Nenhuma alteração foi feita nesse projeto. A escolha da organização para criar Lincode foi solicitada, conforme exigência da ferramenta Supabase. Vercel aparece instalado no gerenciador de plugins, mas suas ferramentas ainda não estão disponíveis nesta sessão. Provisionamento, testes reais de RLS e publicação continuam pendentes.

## Supabase conectado — 31/10/2026

Projeto **Lincode** criado na organização **Kavolt**, região São Paulo, referência `oxkjuwnqzsdwzvyxdnpm`. Migração aplicada. RLS ativada e forçada nas três tabelas; seis políticas para perfis e progresso. Testes SQL com dois usuários passaram, incluindo isolamento, bloqueio de troca de titular e acesso anônimo; transação desfeita, sem usuários de teste restantes. Chamadas REST anônimas para perfis e progresso retornaram 401. RPC do limitador aceitou a primeira chamada e bloqueou a repetida acima do limite. Auth acessível, com confirmação de e-mail obrigatória.

URL, chave publishable e segredo de sessão configurados em `.env.local`, ignorado pelo Git. Falta configurar a chave secreta do limitador no ambiente privado do servidor antes de produção. Não enviar essa chave pelo chat. Teste de cadastro/login pelo navegador com e-mail real ainda pendente.

Verificador Supabase: somente aviso informativo de ausência de políticas na tabela privada do limitador, intencional para negar acesso direto. Não é um relatório Strix. Vercel está instalado, mas suas ferramentas ainda não foram disponibilizadas nesta sessão. GitHub/Vercel ainda não publicados.

Evidências: `docs/qa/supabase-results.json`. Este estado substitui menções anteriores a projeto não criado ou RLS não executada.


## Renomeação para Lincode — 31/10/2026

Interface, pacote, variáveis de ambiente, cookies, documentação e pasta renomeados. Progresso antigo do navegador é copiado para as novas chaves sem apagar o original. Identificadores já aplicados no banco permanecem compatíveis. Repositório privado Matheussantxs/lincode criado; entrega do currículo continua parcial.
