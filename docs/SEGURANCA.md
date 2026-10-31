# Segurança — estado de implementação

## Supabase conectado — 31/10/2026

Projeto **Lincode** criado na organização **Kavolt**, região São Paulo, referência `oxkjuwnqzsdwzvyxdnpm`. Migração aplicada. RLS ativada e forçada nas três tabelas; seis políticas para perfis e progresso. Testes SQL com dois usuários passaram, incluindo isolamento, bloqueio de troca de titular e acesso anônimo; transação desfeita, sem usuários de teste restantes. Chamadas REST anônimas para perfis e progresso retornaram 401. RPC do limitador aceitou a primeira chamada e bloqueou a repetida acima do limite. Auth acessível, com confirmação de e-mail obrigatória.

URL, chave publishable e segredo de sessão configurados em `.env.local`, ignorado pelo Git. Falta configurar a chave secreta do limitador no ambiente privado do servidor antes de produção. Não enviar essa chave pelo chat. Teste de cadastro/login pelo navegador com e-mail real ainda pendente.

Verificador Supabase: somente aviso informativo de ausência de políticas na tabela privada do limitador, intencional para negar acesso direto. Não é um relatório Strix. Vercel está instalado, mas suas ferramentas ainda não foram disponibilizadas nesta sessão. GitHub/Vercel ainda não publicados.

Evidências: `docs/qa/supabase-results.json`. Este estado substitui menções anteriores a projeto não criado ou RLS não executada.


31/10/2026. Esta matriz descreve controles implementados e pendências; não é certificado de segurança nem relatório de pentest.

| Pedido | Implementação e limite |
|---|---|
| 1. Esconder API keys | Variáveis privadas no servidor, exemplo sem valores; build público por lista explícita. |
| 2. Limpar segredos do Git | Repositório local novo; arquivos privados ignorados. Verificação de padrões antes da publicação; não há histórico anterior nesta cópia. |
| 3. Chave pública do banco | Publishable/anon mais JWT do usuário nas rotas de dados. Chave privilegiada rejeitada nessa configuração. |
| 4. RLS | ENABLE/FORCE RLS, grants limitados, USING e WITH CHECK por auth.uid(); SQL de teste preparado. Aplicação e teste no banco real pendentes. |
| 5. Criptografia | Cookie AES-256-GCM; HTTPS para Supabase. Criptografia de disco e backups depende da configuração do provedor. |
| 6. Auth no servidor | Identidade verificada em Supabase Auth; JWT não é aceito apenas por decodificação. |
| 7. Restringir acesso | Dono derivado do usuário verificado; nenhum user_id arbitrário nas atualizações. |
| 8. Mass assignment | Lista de campos permitidos e grants de atualização por coluna. |
| 9. Cookies | HttpOnly, SameSite=Strict, Secure em HTTPS, prazo limitado. |
| 10. Senhas | Autenticação delegada ao Supabase; não gravar senhas no aplicativo. Migração das contas antigas ainda não realizada. |
| 11. Rate limit | 180 chamadas/min/IP, 90 mutações/min/IP, 20 logins/15min/IP, 8 tentativas/15min/e-mail, 5 cadastros/h/IP. Contador compartilhado em produção; RPC ainda precisa ser homologada. |
| 12. Bots | Honeypot e limites implementados. CAPTCHA e limites adicionais do Supabase ainda pendentes; IP/e-mail não eliminam ataques distribuídos. |
| 13. Queries parametrizadas | REST com parâmetros codificados e RPC JSON, sem SQL dinâmico. |
| 14. Inputs | Tipos, campos, limites de tamanho, datas e preferências validados; restrições adicionais no banco. |
| 15. Vazamento de conteúdo | Lista explícita de arquivos públicos, erros genéricos, dados locais privados. Gabaritos didáticos são públicos por projeto. |
| 16. Uploads | Não há recurso de upload nem bucket; métodos de escrita em arquivos estáticos retornam 405. |
| 17. Respostas de API | Projeção explícita de campos; tokens e detalhes internos não retornam ao navegador. |
| 18. Headers | CSP, nosniff, no-referrer, frame DENY, Permissions Policy e HSTS em HTTPS. CSS inline é permitido por causa das barras dinâmicas. |
| 19. HTTPS | Obrigatório em produção; cookies Secure e HSTS. Implantação real ainda não verificada. |
| 20. Dependências | Sem dependências npm de execução; lockfile incluído. Ferramentas 9Router e exemplos Python não são cobertos por esse resultado. |
| CSRF | Token assinado vinculado ao cookie de sessão, comparação constante, origem e Fetch Metadata; obrigatório em toda mutação. |

## Limites relevantes

O progresso é editável pelo próprio titular. RLS protege outros usuários, mas não prova que uma lição foi realmente resolvida. Não usar XP como prêmio com valor financeiro sem correção e concessão no servidor.

A chave secreta do limitador continua sendo administrativa no Supabase. O código a utiliza exclusivamente na RPC; isso não transforma a chave em uma credencial limitada à função. Armazenar somente nas variáveis privadas da plataforma e rotacionar se houver suspeita de exposição.

Strix 1.7.0 está instalado. Não há Docker/provedor local configurado nem login Strix Cloud confirmado; nenhuma varredura foi concluída. Antes de enviar código ao serviço, preparar cópia sanitizada e revisar o inventário do upload conforme a skill. Não afirmar ausência de vulnerabilidades com base em instalação ou teste simulado.

Doze testes locais passaram. Contas usam provedor simulado. O teste de RLS em Supabase real e a homologação do deploy são bloqueadores de abertura pública de contas.
