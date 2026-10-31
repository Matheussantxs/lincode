> Atualização 31/10/2026: backend migrado no código para Supabase; provisionamento e validação remota pendentes. Publicação GitHub/Vercel autorizada e ainda não realizada. Descrições antigas de contas locais abaixo são históricas. Consulte SUPABASE_E_PUBLICACAO.md.

# Plano de execução

Atualizado em 31/10/2026.

| Etapa | Estado | Critério restante |
|---|---|---|
| Contas e persistência local | Implementada e testada | Revisão adicional para implantação pública, quando solicitada |
| Interface e motor de aulas | Implementados nos formatos atuais | Testar com leitor de tela e mais dispositivos |
| Catálogo de cinco linguagens | 75 capítulos e 600 unidades definidos | Refinar objetivos conforme autoria das aulas |
| Autoria do currículo | 111/3.000 lições; 348/24.000 atividades | Escrever as lições restantes e expandir as 90 legadas |
| Revisão técnica e pedagógica | Parcial | Conferir todos os gabaritos, exemplos e pré-requisitos |
| Projetos graduais | Etapas e temas definidos | Desenvolver 40 aulas reais por projeto final |
| 9Router | Instalado localmente | Validar conexão ao OpenRouter e inferência |
| Ruflo | Integração pendente | Configurar provedor e executar revisão real |
| Publicação no GitHub | Adiada pelo usuário | Autorização posterior e revisão dos arquivos publicáveis |

## Ordem de trabalho

1. Completar o capítulo Python de lógica com 40 lições e oito atividades, preservando IDs existentes.
2. Revisar os exemplos, percursos de fluxogramas, limites e entradas inválidas.
3. Expandir os capítulos seguintes de Python e os capítulos introdutórios das outras linguagens com problemas específicos.
4. Concluir cada linguagem por capítulo, aplicando o validador e a revisão técnica antes de publicar conteúdo como completo.
5. Implementar os cinco projetos com evolução gradual e evidências executáveis.
6. Homologar o currículo final, inclusive retomada em contas existentes e acessibilidade com leitor de tela.

Cada unidade tem cinco lições com funções diferentes: apresentação, prática guiada, aprofundamento, aplicação e revisão. Manter objetivos observáveis e evitar questões repetidas para preencher números.

## Verificações obrigatórias

- 75 capítulos, oito unidades por capítulo, cinco lições por unidade e oito atividades por lição.
- IDs estáveis e únicos; gabaritos compatíveis com o formato; pré-requisitos existentes.
- Cadastro, login, migração de visitante, isolamento, persistência após reiniciar, retomada e recompensas idempotentes.
- Desktop e celular com títulos longos, teclado, contraste e movimento reduzido.
- Evidências locais em docs/qa, sem credenciais ou dados de usuários reais.

A documentação deve continuar separando planejado, implementado, testado e revisado. Não declarar a meta atingida enquanto o validador completo ou a revisão pedagógica estiver pendente.
