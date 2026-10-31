# Lincode — contrato visual

Atualizado em 31/10/2026. A decisão vigente do usuário substitui a identidade anterior de superfícies claras.

## Superfície e tarefa

Aplicativo de estudo, com a trilha como primeira tela após escolher o ritmo. O aluno precisa localizar o próximo exercício, compreender a explicação, responder e retomar sem perder sua posição. A ação principal na trilha é abrir a próxima lição; dentro dela é verificar uma resposta e continuar.

Hierarquia: navegação persistente; linguagem e estatísticas; capítulo atual; unidades; nós das aulas. No desktop, a coluna direita apresenta Bit e a meta diária. No celular, os seis destinos ficam na navegação inferior e metas completas continuam em Missões e Perfil.

Viewports de homologação: 1440x900 e 390x844. Títulos longos precisam quebrar dentro dos cartões sem rolagem horizontal. Campos e botões têm rótulos persistentes, foco visível e alvos de pelo menos 44 px. Código pode ter rolagem interna horizontal para preservar sintaxe.

## Tokens

| Papel | Cor |
|---|---|
| Fundo de todas as telas | #08090b |
| Superfície | #111419 |
| Superfície elevada | #191e25 |
| Texto principal | #eef1f6 |
| Texto secundário | #a7b0bf |
| Ação e capítulo | #ff8c78 |
| Progresso e foco | #75e3ee |
| Bordas | #2b323c |

Tipografia: Inter quando instalada, Segoe UI e sans-serif como alternativas locais; Consolas para código. Não carregar fontes externas. Estados corretos e incorretos devem usar texto explícito, além da cor. Respeitar movimento reduzido.

Bit é um robô original desenhado em SVG na interface, com expressões de explicação, incentivo, dúvida e comemoração. Nenhum personagem ou logotipo do Duolingo foi incorporado.

## Referências observadas

As imagens do usuário fundamentam o menu lateral, a trilha vertical e a aula dedicada com barra de progresso. O projeto conserva marca, textos, conteúdo e paleta próprios. Awesome Design MD (Claude e Linear) contribuiu com hierarquia e uso de bordas; a preferência posterior por fundo preto prevalece sobre suas cores. ECC fornece o contrato de evidências; Humanizer orienta textos diretos.

## Estados verificáveis

| Estado | Gatilho | Feedback | Próxima ação |
|---|---|---|---|
| Carregando | Inicialização e consulta de conta | Mensagem no main com aria-busy | Aguardar ou recarregar |
| Vazio | Praticar sem conclusões | Explicação e botão para a trilha | Iniciar primeira aula |
| Erro | Credenciais incorretas | Mensagem na região role=alert, formulário preservado | Corrigir e reenviar |
| Parcial | Unidade sem lições publicadas | Conteúdo em preparação e quantidade prevista | Explorar aulas disponíveis |
| Sucesso | Concluir última atividade | Resumo, acertos e XP concedido | Voltar à trilha |
| Acesso | Visitante abre Perfil | Explicação da conta local e ações de cadastro/login | Entrar, criar conta ou continuar visitante |

Evidências reais e limites da verificação ficam em `docs/qa/` e `docs/VALIDACAO.md`. Um registro válido de evidências não equivale a auditoria completa de acessibilidade.
