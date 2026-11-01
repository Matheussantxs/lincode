# Validação do Lincode

## Supabase conectado — 31/10/2026

Projeto **Lincode** criado na organização **Kavolt**, região São Paulo, referência `oxkjuwnqzsdwzvyxdnpm`. Migração aplicada. RLS ativada e forçada nas três tabelas; seis políticas para perfis e progresso. Testes SQL com dois usuários passaram, incluindo isolamento, bloqueio de troca de titular e acesso anônimo; transação desfeita, sem usuários de teste restantes. Chamadas REST anônimas para perfis e progresso retornaram 401. RPC do limitador aceitou a primeira chamada e bloqueou a repetida acima do limite. Auth acessível, com confirmação de e-mail obrigatória.

URL, chave publishable e segredo de sessão configurados em `.env.local`, ignorado pelo Git. Falta configurar a chave secreta do limitador no ambiente privado do servidor antes de produção. Não enviar essa chave pelo chat. Teste de cadastro/login pelo navegador com e-mail real ainda pendente.

Verificador Supabase: somente aviso informativo de ausência de políticas na tabela privada do limitador, intencional para negar acesso direto. Não é um relatório Strix. Vercel está instalado, mas suas ferramentas ainda não foram disponibilizadas nesta sessão. GitHub/Vercel ainda não publicados.

Evidências: `docs/qa/supabase-results.json`. Este estado substitui menções anteriores a projeto não criado ou RLS não executada.


Atualizado em 31/10/2026. Os resultados abaixo se referem ao ambiente local e ao conteúdo disponível, não ao currículo completo.

## Integração Supabase: estado atual

Doze testes Node passaram em 31/10/2026: CSRF, rate limit, cookies, isolamento, validação, respostas mínimas e progresso. Os testes de contas usam provedor simulado. O teste SQL de RLS ainda não foi executado em Supabase real. Nenhum deploy ou pentest Strix está concluído. As verificações históricas de armazenamento local abaixo não validam o novo banco.

## Verificações de interface e histórico

- Contas: cadastro, e-mail duplicado, senha incorreta, login, logout, isolamento entre usuários, validação de origem e proteção dos arquivos privados.
- Persistência: gravação após reiniciar, suporte a 3.000 IDs, reconciliação de snapshots antigos e rejeição de registros diários inválidos.
- Progresso: IDs estáveis, linguagens independentes, 20 XP na primeira conclusão e zero XP adicional na revisão; tempo não é inferido do XP.
- Retomada: resposta digitada preservada após recarregar; snapshot antigo do servidor não substitui a resposta local mais recente.
- Chrome: onboarding, metas, digitação, erro e nova tentativa, fluxo de oito atividades, associação, ordenação, criação de conta com migração, saída sem vazamento de progresso, login e preferências.
- Tempo ativo: aumento durante aula ativa validado. Na execução mais recente, Chrome headless não transferiu foco entre abas; pausa em segundo plano exige nova verificação manual, registrada como skipped no relatório.
- Interface: capturas reais em 1440x900 e 390x844, inspeção visual, ausência de rolagem horizontal da página, foco de teclado, movimento reduzido, rótulos e contraste dos pares de cores auditados.
- Estados: carregamento, vazio, erro de login, conteúdo parcial, conclusão e perfil de visitante.

As imagens estão em `qa/`. `qa/browser-results.json` registra as verificações do navegador; `qa/contrast.json` registra as razões de contraste. A descrição sobre o fundo coral foi escurecida após a primeira medição ficar abaixo de 4,5:1. Os dez pares auditados agora atingem pelo menos 4,5:1.

## Currículo

Validador estrutural: 75 capítulos, oito unidades em cada capítulo, 404 lições e 3.232 atividades disponíveis (todas as 404 lições com oito atividades; 7 capítulos com 40/40 lições completas: Python lógica, fundamentos e POO, além do capítulo 1 de JavaScript, Java, C# e C++). Verifica IDs de lições e atividades, pré-requisitos, tamanho das unidades e formato dos gabaritos.

**O aceite de completude continua reprovado:** faltam 2.596 lições e 20.768 atividades para a meta. Nenhuma lição publicada permanece com menos de oito atividades, mas os outros 73 capítulos ainda precisam ser expandidos até 40 lições e revisados.

## Reproduzir

```powershell
npm test
node scripts/validate-curriculum.mjs
node scripts/validate-curriculum.mjs --complete
node tests/browser.mjs
```

O comando `--complete` retorna código 1 enquanto faltarem lições/atividades. O teste de navegador usa Chrome em `C:/Program Files/Google/Chrome/Application/chrome.exe` e o playwright-core instalado localmente (ignorado pelo Git). Ele inicia um servidor temporário, usa contas de teste e encerra seu servidor e navegador ao terminar. Não usa contas reais do projeto.

## Limites

Não houve auditoria com leitor de tela, testes em Safari/Firefox, homologação em telefone físico ou auditoria de segurança para exposição pública. As medições de contraste cobrem os pares especificados, não todos os pixels possíveis. O validador estrutural não prova correção pedagógica nem originalidade de todos os problemas.

Os pré-requisitos entre capítulos são sugestões, não bloqueios. A integração com o Supabase aguarda provisionamento; recuperação de senha ainda não possui fluxo de interface. O progresso não é antifraude. Não houve publicação no GitHub.
