# Arquitetura

## Supabase conectado — 31/10/2026

Projeto **Lincode** criado na organização **Kavolt**, região São Paulo, referência `oxkjuwnqzsdwzvyxdnpm`. Migração aplicada. RLS ativada e forçada nas três tabelas; seis políticas para perfis e progresso. Testes SQL com dois usuários passaram, incluindo isolamento, bloqueio de troca de titular e acesso anônimo; transação desfeita, sem usuários de teste restantes. Chamadas REST anônimas para perfis e progresso retornaram 401. RPC do limitador aceitou a primeira chamada e bloqueou a repetida acima do limite. Auth acessível, com confirmação de e-mail obrigatória.

URL, chave publishable e segredo de sessão configurados em `.env.local`, ignorado pelo Git. Falta configurar a chave secreta do limitador no ambiente privado do servidor antes de produção. Não enviar essa chave pelo chat. Teste de cadastro/login pelo navegador com e-mail real ainda pendente.

Verificador Supabase: somente aviso informativo de ausência de políticas na tabela privada do limitador, intencional para negar acesso direto. Não é um relatório Strix. Vercel está instalado, mas suas ferramentas ainda não foram disponibilizadas nesta sessão. GitHub/Vercel ainda não publicados.

Evidências: `docs/qa/supabase-results.json`. Este estado substitui menções anteriores a projeto não criado ou RLS não executada.


Atualizado em 31/10/2026. Frontend HTML/CSS/JavaScript e backend Node 22+ sem dependências npm de execução. O adaptador Supabase está implementado; falta provisionar e homologar o banco remoto.

## Fluxo de dados

Navegador → API no mesmo domínio → Supabase Auth e Postgres. `auth-server.mjs` valida a identidade no provedor. `supabase-client.mjs` usa chave publishable e JWT do usuário para dados; `user_id` vem da identidade verificada. Políticas SQL restringem leitura e escrita ao titular e impedem troca de proprietário. A chave administrativa só é usada pelo código na RPC privada de rate limit.

`security.mjs` aplica CSRF assinado vinculado à sessão, valida origem e Fetch Metadata, limita requisições e cifra cookies com AES-256-GCM. Chaves derivadas distintas assinam e cifram. Cookies HttpOnly, SameSite=Strict e Secure em HTTPS. Produção recusa iniciar sem segredo persistente e limitador compartilhado.

`http-handler.mjs` compartilha a API entre `server.mjs` e `api/index.mjs`. Dados privados e arquivos de backend ficam fora da lista pública. `validation.mjs` limita campos, tipos, comprimentos e tamanho do corpo (8 KiB normal; 1 MiB progresso). SQL usa JSON e parâmetros, sem concatenar consultas.

## Progresso

Visitantes usam localStorage. Contas usam cache por ID e sincronizam com Supabase. Cadastro com confirmação adia a transferência até o login do e-mail correspondente. Conclusões usam IDs estáveis; a RPC une conclusões e mantém os maiores contadores diários em uma transação com bloqueio de linha. Retomadas e preferências usam updatedAt.

XP é derivado das conclusões únicas. Tempo ativo é separado. Isso não é antifraude: o titular pode alterar seu próprio progresso. Não usar esses valores para prêmios financeiros ou rankings competitivos sem validação de atividades no servidor.

## API

GET /api/csrf, GET /api/health, POST /api/register, POST /api/login, POST /api/logout, GET /api/me, PATCH /api/profile, GET e PUT /api/progress. Toda mutação exige token CSRF. Respostas omitem tokens, hashes e metadados internos.

## Conteúdo e ferramentas

`catalog.js` organiza 75 capítulos/600 unidades. Conteúdo publicado: 111 lições/348 atividades. `progress.js` implementa correção local e retomada; código digitado não é executado. 9Router/Ruflo são ferramentas de desenvolvimento, não dependências de produção.

O arquivo legado `.data/accounts.json` foi preservado, mas não é mais lido pelo backend. Consulte SUPABASE_E_PUBLICACAO.md para provisionamento e limitações.
