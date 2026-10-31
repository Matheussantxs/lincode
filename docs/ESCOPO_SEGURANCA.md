# Escopo de segurança autorizado

Alvo: Lincode nesta pasta. Código HTML/JS e backend Node que encaminha autenticação e persistência ao Supabase. O usuário solicitou testes de segurança, com prioridade em CSRF, rate limit e RLS.

Usar somente cópia sanitizada do código e ambiente de teste. Não testar Duolingo, 9Router, projetos Supabase de terceiros nem dados reais. Não publicar relatórios brutos com tokens. Não implantar na produção para testar exploração.

Cobrir: sessão criptografada HttpOnly, token CSRF assinado, validação de origem, limites antes de autenticação, contador compartilhado entre funções Vercel, isolamento entre duas contas, proibição de troca de user_id, grants e RLS em ambos os lados do UPDATE, mass assignment, exposição de arquivos, respostas excessivas e credenciais.

Supabase ainda precisa ser conectado e provisionado. Os testes locais com fake-supabase validam a integração do aplicativo; NÃO provam que as políticas foram aplicadas ao banco remoto. Executar supabase/tests/rls.sql em um projeto descartável após aplicar a migração.

Strix 1.7.0 instalado. Docker e provedor local não encontrados; sessão Strix Cloud não autenticada. Nenhum pentest Strix concluído até haver um relatório real.
