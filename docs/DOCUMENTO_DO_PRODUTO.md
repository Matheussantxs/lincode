> Atualização 31/10/2026: backend migrado no código para Supabase; provisionamento e validação remota pendentes. Publicação GitHub/Vercel autorizada e ainda não realizada. Descrições antigas de contas locais abaixo são históricas. Consulte SUPABASE_E_PUBLICACAO.md.

# Documento do produto — Lincode

Atualizado em 31/10/2026. As decisões deste documento refletem o plano aprovado pelo usuário; o estado da implementação está separado dos requisitos.

## Proposta

Ensinar programação em português por meio de explicações curtas, exercícios e progressão por linguagem. Público inicial: pessoas começando a programar, incluindo estudantes que precisam compreender lógica e ler fluxogramas antes de trabalhar com código mais complexo.

Linguagens: Python, JavaScript, Java, C# e C++. Cada aluno escolhe uma trilha e um ritmo diário, podendo alternar de linguagem sem perder conclusões.

## Escopo aprovado

| Trilha | Capítulos | Lições previstas | Atividades previstas |
|---|---:|---:|---:|
| Python | 11 | 440 | 3.520 |
| JavaScript | 16 | 640 | 5.120 |
| Java | 16 | 640 | 5.120 |
| C# | 16 | 640 | 5.120 |
| C++ | 16 | 640 | 5.120 |
| Total | 75 | 3.000 | 24.000 |

Cada capítulo possui oito unidades de cinco lições. Cada lição completa precisa de oito atividades. As etapas de unidade são apresentação, prática guiada, aprofundamento, aplicação e desafio de revisão, com objetivo observável.

Formatos: resposta digitada, lacuna, associação, ordenação de código/passos, previsão de saída, identificação de erro e fluxograma. Os formatos devem servir ao objetivo da aula. Não completar contagens por duplicação de perguntas ou troca superficial de números.

Lógica inclui símbolos, montagem, leitura, condições, repetições e rastreamento de variáveis. Python preserva NumPy, Pandas, Statsmodels e Machine Learning/MLOps nos capítulos 8–11. Os temas dos 75 capítulos e 600 unidades estão em CURRICULO.md.

## Experiência

Fundo preto em todas as telas; superfícies grafite, coral e ciano. Bit é o robô original com expressões de explicação, incentivo, dúvida e comemoração. Navegação: Aprender, Praticar, Missões, Projetos, Perfil e Mais.

Catálogo mostra descrição, pré-requisito e progresso de cada capítulo. Aulas têm endereço próprio, barra de progresso e retomada. Ao sair, o aluno retorna à posição da trilha. Conteúdo ainda não publicado é identificado como preparação, sem botões de exercício falsos.

Cadastro e login usam o backend local. A criação de conta transfere o progresso do visitante. Login em uma conta existente carrega apenas os dados dessa conta. As metas são 5, 10, 15 ou 20 minutos; o compromisso de dias é opcional. Tempo ativo e XP possuem registros separados. Uma conclusão inédita concede 20 XP; revisões não repetem a recompensa.

## Projetos finais

- Python: portfólio de Data Science com análise, avaliação e monitoramento.
- JavaScript: gerenciador de estudos com interface, formulários, API e persistência.
- Java: API de biblioteca com empréstimos, validação, persistência e testes.
- C#: API de controle de despesas com consultas, persistência e testes.
- C++: inventário com arquivos, classes, gerenciamento de recursos e testes.

Cada projeto deve ser desenvolvido ao longo das 40 lições do capítulo final. A interface apresenta as etapas previstas; a autoria integral permanece pendente.

## Estado e aceite

Implementado: fluxo local de contas, persistência, menu, catálogo, telas de aulas, retomada, motor dos formatos publicados, Bit e tema escuro. Disponíveis: 111 lições e 348 atividades. Há 21 lições com oito atividades e 90 lições legadas com duas.

O currículo só poderá ser considerado completo quando as 3.000 lições tiverem oito atividades válidas, gabaritos e pré-requisitos revisados. O comando de validação `--complete` permanece reprovado. Contagem estrutural não comprova qualidade pedagógica.

GitHub e hospedagem pública permanecem para uma etapa posterior. O produto local não possui recuperação de senha por e-mail, execução arbitrária de código ou sincronização em nuvem. O Ruflo com OpenRouter ainda precisa de um teste real de inferência.
