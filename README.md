## 📄 README.md (obrigatório, feito à mão)

***Desafio Técnico***

Este projeto foi desenvolvido a partir de programação via Claude Code CLL integrada ao terminal VS Code.
Neste README.md serão apresentados todos os comandos e prompts utilizados ao IA para gerar o projeto previsto de acordo com o arquimo guia de projeto md em 'desafio_técnico'

***Tecnologias Utilizadas***

Desenvolvimento
- Claude Code: Via terminal no VS Code para execução dos comandos
- Gemini Web: Para suporte e desenvolvimento de prompts e comandos.

Stack do Projeto
- Next.js: Framework front
- React: Biblioteca para estruturação
- TypeScript: Linguagem utilizada
- Tailwindcss: Estilização

***Metodologia Utilizada***

Foi utilizado a metologia de planejamento, revisão, e desenvolvimento com utilização de multiplos agentes.
- Claude Code Sonnet 4.6 em High Efort
- Claude Web (tambem sonnet) para planejamento e revisão

O processo se definiu a:

1- Repasse do desafio ao claude web: para criação do planejamento
2- Aplicação do primeiro prompt ao  Code com modo /plan para melhorar a qualidade da aplicão
3- Revisão do planejamento e aplicação do desenvolvimento
4- Repasse dos resultados ao Claude web para planejamento dos proximos passos
5- Ciclo de execução e verificação


***Requisitos para rodar***

- Node.js - v18.17 ou superior
- npm -  versão mais recente

***Como Rodar a Aplicação***

Na raiz do projeto:

*clonar projeto do github
- https://github.com/gabrieldeespindolamartins/desafio-tecnico.git 

*Para instalar dependencias node
- npm install

*Para rodar o projeto
- npm run dev

***Decisões tecnicas tomadas***

- Utilização  ne Next.js com app router no lugar de um backend próprio visando facilitar o desenvolvimento do deseafio criando rotas e endpoiunt dentro do mesmo projeto (front e back unificado)
- Em mobile implementei cards empilhados no lugar de tabela para visualição dos conteudos em inventario.json.

***Comandos Utilizados***

1- Orientação de stack adequada para o desafio (Claude Web e Gemini Web)
- "A partir do codigo em pasted e do contexto em que estou desenvolvendo um desafio técnico com Claude Code para uma entrevista de estágio, qual seria a melhor stack de aplicação para o projeto apresentado? de forma que se alinhe ao meu plano Pro e utilize modelo de agente sonnet4.6 estendido."

Resultado: A resposta do Claude se tornou mais válida ao projeto por apresentar argumentos de uso do Next.js sem precisar subir um server Back separado, melhora a viabilidade do projeto para o desafio. O claude orientou a criar um claude.md com a stack e contexto do projeto para melhorar o escopo e desenvolvimento, já que o modelo utilizado será o Sonnet visando a economia de tokens.

2- Criação de Planejamento do projeto (Claude Web)
- "ok, a partir do contexto em que tenho aproximadamente 1 hora para desenvolver o projeto e 30 minutos para escrever o README, crie um planejamento de execução deste projeto alinhado ao desafio em PASTED e ao projeto descrito no arquivo claude.md criado por você. Em pasted está a instrução do desafio. Output em texto aqui mesmo."

Arquivo claude md: C:\Users\Micro\Desktop\desafio-tecnico\CLAUDE.md

3 - Inicio de desenvolvimento (Claude Code)
- ""Leia o CLAUDE.md. Crie a estrutura completa do projeto: a API Route em app/api/inventario/route.ts com os métodos GET (lê o inventario.json e retorna os dados) e POST (recebe um item, gera ID automático incrementando o maior ID existente, e grava no inventario.json). Use o módulo fs do Node com path.join(process.cwd(), 'inventario.json'). Crie também os tipos TypeScript em types/inventario.ts com a interface ItemInventario refletindo todos os campos do CLAUDE.md.""

*Retirado do planejamento do claude web e iniciado com /plan para melhor execução do code

4 - Validação de planejamento Code
- "Voce aprova o plano criado pelo claude code? *Plano em Pasted"

5 - Aplicação do comando de desenvolvimento de interface
- "Leia o CLAUDE.md. Substitua o app/page.tsx atual pela interface completa da aplicação. A página deve ser um Client Component com: header com título 'Inventário de TI' e subtítulo 'Gestão de ativos de hardware'; formulário de cadastro com os campos Tipo (select: Computador, Notebook, Monitor, Mouse, Teclado, Impressora), Modelo/Marca (input texto), Colaborador (input texto) e Setor (select: RH, Comercial, TI, Financeiro, Diretoria) — o ID é gerado automaticamente pelo backend, não aparece no formulário; botão de submit que mostra 'Salvando...' durante o POST e exibe mensagem de sucesso verde por 3 segundos após cadastro bem-sucedido; tabela abaixo do formulário com colunas ID, Tipo, Modelo/Marca, Colaborador e Setor, com zebra striping usando classes Tailwind odd:bg-white even:bg-gray-50, cabeçalho em azul escuro (#1e3a5f como bg personalizado ou blue-900), fonte Inter do Google Fonts, fundo geral cinza claro (gray-50), formulário e tabela em cards brancos com sombra. A lista deve ser carregada via useEffect no mount e recarregada após cada cadastro bem-sucedido."

Resultado: 15:12 Sucesso no desenvolvimento, a aplicação está funcionando e com interface moderna, simples e adequada.

6- Correção de tabela para mobile (Claude Code)
- "No arquivo app/page.tsx, corrija a responsividade da tabela para mobile. Nas colunas 'Colaborador' e 'Modelo / Marca', adicione a classe hidden sm:table-cell no <th> e nos <td> correspondentes — isso as esconde em telas pequenas e mostra em telas maiores. Nas colunas ID, Tipo e Setor, mantém visível. Isso garante que a tabela caiba na tela do celular sem overflow."

Resultad: A tabela ainda não apresenta corretamente as informações, irei mudar a orientação do Claude Web para gerar novas propostas de solução

7 - Propostas de solução da tabela
- "A tabela não esta mostando todos os campos necessarios, quais são as proipostas para que possamos corrigir este problema visual para responsividade adequada do projeto?"

Resultado: Claude gerou diferentes propostas, seguirei com a apresentação em cards para evitar oclusão de recursos.

8 - Prompt para correção
- ""No arquivo app/page.tsx, substitua a seção da tabela pela seguinte lógica responsiva: em mobile (abaixo de sm), exibir os itens como cards empilhados; em desktop (sm em diante), exibir a tabela completa com todas as 5 colunas.
Cada card mobile deve ter: borda esquerda colorida em #1e3a5f com espessura 4px, fundo branco, padding interno, e exibir as informações assim:

Linha superior: #1 · Computador em fonte semi-bold
Linha do meio: modelo/marca em texto cinza
Linha inferior: nome do colaborador e badge de setor lado a lado

A tabela desktop permanece idêntica ao que está hoje, com todas as 5 colunas e cabeçalho azul. Use block sm:hidden no container dos cards e hidden sm:block no container da tabela para alternar entre os dois. Mantenha o restante do arquivo intacto.""

Resultado: Correção bem sucedida, projeto finalizado.