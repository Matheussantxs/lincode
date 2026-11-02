# Lincode para Windows

O arquivo Lincode.exe contém o aplicativo, código, conteúdo publicado, documentação e Node.js 24.20.0 x64. Não exige instalação de Node, Python ou npm. Requer Windows x64 com .NET Framework 4.5+ (presente nas versões atuais do Windows).

Abra Lincode.exe. A janela inicia um servidor apenas em 127.0.0.1:8790 e abre o navegador padrão. Mantenha a janela aberta; Encerrar fecha o servidor. O pacote é extraído em `%LOCALAPPDATA%/Lincode/app-<versão>`. Progresso de visitante é salvo no navegador nesse endereço; a versão de desenvolvimento em 8787 possui outra origem e não compartilha automaticamente esse armazenamento.

Por padrão, o executável funciona como visitante, inclusive sem internet. Para contas Supabase, configure `%LOCALAPPDATA%/Lincode/.env.local` seguindo `.env.example`, com APP_ORIGIN=http://127.0.0.1:8790. Nunca distribua essa configuração ou chaves privadas. O executável não inclui contas pessoais, senhas, chaves, ferramentas auxiliares locais ou referências de desenvolvimento.

Esta versão contém 1.715 lições e 13.720 atividades, não as 3.000 lições planejadas. Exercícios de código são corrigidos por gabarito; o aplicativo não executa Python/C#/Java/C++ digitado. Os exemplos de portfólio Python precisam do ambiente próprio descrito em portfolio/README.md.

Build reproduzível: executar `python desktop/build-windows.py` com Node instalado e o compilador C# do .NET Framework. A licença do runtime está em licenses/NODE-LICENSE.txt. O executável não possui assinatura digital comercial. Verifique seu SHA-256 no arquivo fornecido.
