# Lincode

Versão local renomeada para **Lincode**. Abra `Iniciar.cmd` e acesse http://127.0.0.1:8787. Código, conteúdo e documentação estão nesta pasta. O currículo foi 100% concluído em todas as 5 linguagens, totalizando as 3.000 lições e 24.000 atividades planejadas.

Repositório: https://github.com/Matheussantxs/lincode (privado). O envio não inclui `.env.local`, dados de contas, chaves, ferramentas instaladas ou referências de terceiros. Identificadores internos do banco que já estavam aplicados foram preservados para compatibilidade.


## Abrir o projeto

Execute `Iniciar.cmd` ou, nesta pasta:

```powershell
node server.mjs
```

Abra http://127.0.0.1:8787. Requisito: Node.js 22 ou superior. O aplicativo não precisa de instalação de dependências. Mantenha o terminal aberto; Ctrl+C encerra o servidor. As fontes são locais, sem dependência de Google Fonts.

## Estado atual

O catálogo possui os **75 capítulos** aprovados. Há **3.000 lições disponíveis e 24.000 atividades** (8 atividades em todas as lições publicadas, 75 capítulos com 40/40 lições completas e prontas: Python 1 a 11 completo — lógica, fundamentos, POO, estruturas de dados, arquivos, qualidade, dados, numpy, pandas, statsmodels e mlops; JavaScript 1 a 16 completo; Java 1 a 16 completo; C# 1 a 16 completo; e C++ 1 a 16 completo). A meta de **3.000 lições e 24.000 atividades** foi atingida integralmente (100% do currículo completo concluído). Cada capítulo tem oito unidades planejadas.

| Trilha | Capítulos | Lições disponíveis | Meta de lições |
|---|---:|---:|---:|
| Python | 11 | 440 | 440 |
| JavaScript | 16 | 640 | 640 |
| Java | 16 | 640 | 640 |
| C# | 16 | 640 | 640 |
| C++ | 16 | 640 | 640 |
| Total | 75 | 3.000 | 3.000 |

Os capítulos Python 8–11 preservam NumPy, Pandas, Statsmodels e Machine Learning/MLOps. Não são usados exercícios vazios para completar a contagem. O catálogo diferencia conteúdo disponível de unidades em preparação.

## Recursos implementados

- Design editorial Steep (fundo Paper White, superfícies Mist Gray e Fog White, acento Blush Peach e Sienna Brown, tipografia serifada e controles em pill); Bit, robô vetorial com quatro expressões.
- Menu Aprender, Praticar, Missões, Projetos, Perfil e Mais.
- Catálogo com temas, pré-requisitos sugeridos e progresso; trilha vertical dentro do capítulo.
- Aulas com endereço próprio, barra de progresso, respostas digitadas e retomada após recarregar.
- Escolha, lacunas, ordenação de blocos, associação por seletores e leitura de fluxogramas.
- Adaptador de cadastro/login com Supabase Auth; sessões em cookie criptografado HttpOnly/SameSite; dados pessoais sujeitos a RLS.
- Transferência do progresso de visitante ao criar conta, isolamento entre contas e linguagem independente.
- Metas de 5, 10, 15 ou 20 minutos, compromisso opcional e tempo ativo separado do XP.
- Uma recompensa de 20 XP por conclusão inédita. Revisão não repete XP.

O código digitado é comparado com gabaritos; não é executado. A migração para Supabase está implementada no código, mas o projeto remoto ainda precisa ser criado e configurado. Sem configuração, o modo visitante funciona e o cadastro informa indisponibilidade. O arquivo legado `.data/accounts.json` foi preservado, sem transferência automática de senhas ou contas.



## Verificar

```powershell
npm test
npm run build
node scripts/validate-curriculum.mjs
node scripts/validate-curriculum.mjs --complete
```

O último comando **deve falhar enquanto o currículo estiver incompleto**. O relatório em `docs/curriculum-status.json` detalha as faltas. Capturas e verificações do navegador estão em `docs/qa/`.

## Documentação

- [Produto](docs/DOCUMENTO_DO_PRODUTO.md)
- [Plano de execução](docs/PLANO_DE_EXECUCAO.md)
- [Currículo e temas](docs/CURRICULO.md)
- [Arquitetura](docs/ARQUITETURA.md)
- [Validação](docs/VALIDACAO.md)
- [Sistema visual](DESIGN.md)
- [Histórico da conversa](chat.md)

## Referências e ferramentas

Awesome Design MD está em `references/awesome-design-md`; Humanizer está em `references/humanizer` e foi usado na revisão dos textos de interface e documentação. ECC orientou o contrato visual e a verificação; Ponytail orientou a manutenção do frontend sem framework adicional. REA havia observado a página pública acessível; as imagens enviadas pelo usuário orientaram a área de aprendizado. Não houve acesso autenticado ao produto de referência.


Código, conteúdo, documentação e evidências estão reunidos nesta pasta. A publicação depende da conexão das contas e da validação do banco remoto. `.data/`, `.local/`, `tools/` e credenciais estão excluídos do Git.
