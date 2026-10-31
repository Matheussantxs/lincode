# Supabase, GitHub e Vercel

## Supabase conectado — 31/10/2026

Projeto **Lincode** criado na organização **Kavolt**, região São Paulo, referência `oxkjuwnqzsdwzvyxdnpm`. Migração aplicada. RLS ativada e forçada nas três tabelas; seis políticas para perfis e progresso. Testes SQL com dois usuários passaram, incluindo isolamento, bloqueio de troca de titular e acesso anônimo; transação desfeita, sem usuários de teste restantes. Chamadas REST anônimas para perfis e progresso retornaram 401. RPC do limitador aceitou a primeira chamada e bloqueou a repetida acima do limite. Auth acessível, com confirmação de e-mail obrigatória.

URL, chave publishable e segredo de sessão configurados em `.env.local`, ignorado pelo Git. Falta configurar a chave secreta do limitador no ambiente privado do servidor antes de produção. Não enviar essa chave pelo chat. Teste de cadastro/login pelo navegador com e-mail real ainda pendente.

Verificador Supabase: somente aviso informativo de ausência de políticas na tabela privada do limitador, intencional para negar acesso direto. Não é um relatório Strix. Vercel está instalado, mas suas ferramentas ainda não foram disponibilizadas nesta sessão. GitHub/Vercel ainda não publicados.

Evidências: `docs/qa/supabase-results.json`. Este estado substitui menções anteriores a projeto não criado ou RLS não executada.


Atualizado em 31/10/2026. Código preparado; nenhum projeto remoto foi criado ou publicado nesta etapa. Supabase e Vercel ainda aparecem sem integração conectada.

## Configuração

1. Conectar Supabase e criar um projeto Lincode de desenvolvimento. Guardar a senha do banco no gerenciador de senhas.
2. Aplicar `supabase/migrations/202610310001_lincode.sql` no banco novo. A migração não é idempotente: aplicar uma única vez pelo histórico de migrations.
3. Executar `supabase/tests/rls.sql` no projeto de desenvolvimento. O teste cria dois usuários sintéticos dentro de uma transação e desfaz tudo. Só considerar RLS homologada depois da execução real.
4. Configurar Supabase Auth: confirmação de e-mail, URL do aplicativo, redirecionamentos exatos, SMTP para produção, limites do provedor e CAPTCHA. CAPTCHA ainda não está integrado ao formulário do Lincode.
5. Copiar `.env.example` para `.env.local`, fora do Git. Informar URL e chave publishable. `SUPABASE_RATE_LIMIT_KEY` deve ser uma chave moderna `sb_secret_`, exclusiva do servidor e usada pelo código somente na RPC do limitador. Essa chave possui privilégio administrativo no Supabase: o isolamento por uso no código não reduz seu privilégio real.
6. Gerar `LINCODE_SESSION_SECRET` com 32 bytes aleatórios em base64 e guardar em ambiente privado. Manter o mesmo segredo entre instâncias; rotacioná-lo invalida sessões existentes. Nunca inserir valores reais na documentação.
7. Executar `npm test`, `npm run build` e o teste de navegador. Validar contas reais de teste e isolamento antes de abrir cadastros públicos.

## Arquitetura de implantação

O navegador chama a API do próprio domínio. `api/index.mjs` adapta o backend Node às funções da Vercel. A função acessa dados com chave publishable e JWT do usuário validado; nunca usa a chave administrativa para perfis ou progresso. O cookie contém tokens criptografados com AES-GCM e não é acessível ao JavaScript.

Produção exige segredo persistente, rate limit compartilhado no Postgres, HTTPS e origem canônica. Configure as variáveis do exemplo no painel privado da Vercel, inclusive `APP_ORIGIN=https://dominio-real`. Previews usam a origem gerada pela Vercel. Use outro projeto Supabase para preview/desenvolvimento quando houver dados reais.

A pasta `public/` é recriada por uma lista explícita. Backend, SQL, `.env`, dados locais, referências e 9Router não são arquivos públicos. O aplicativo não tem dependências npm de execução. As ferramentas locais não integram o deploy.

## Publicação pendente

GitHub: repositório local inicializado, ainda sem commit ou remote. Criar repositório privado Lincode na conta conectada, revisar arquivos e segredos, enviar código. Não há histórico Git legado para limpar nesta cópia; isso não comprova ausência de segredos em outras cópias.

Vercel: importar o repositório, configurar variáveis privadas, executar build e validar o endereço HTTPS. Depois revisar cabeçalhos, cookies Secure, cadastro com confirmação, logout, retomada e isolamento entre duas contas reais.

Contas locais antigas não são migradas automaticamente. Não enviar `.data/accounts.json` ao GitHub ou à Vercel. Planejar uma migração de progresso consentida por usuário e redefinição de senha quando necessário.

## Evidências e limites

Os 12 testes Node passaram com provedor Supabase simulado. Isso prova o comportamento do backend sob essas condições, não a execução das políticas no banco real. O teste SQL está preparado, mas ainda não executado. Strix está instalado, sem varredura concluída. Nenhum endereço de produção está disponível.

Fontes: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [chaves Supabase](https://supabase.com/docs/guides/getting-started/api-keys), [cabeçalhos da Vercel](https://vercel.com/docs/headers/request-headers).
