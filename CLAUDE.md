# CLAUDE.md

## Projeto
Sistema de Inventário de TI — desafio técnico com entrega em 1 hora e meia.

## Stack
- Next.js 14 com App Router
- Tailwind CSS
- TypeScript
- Persistência em inventario.json via API Route com módulo fs do Node

## Funcionalidades
1. Formulário de cadastro (ID, Tipo, Modelo/Marca, Colaborador, Setor)
2. Tabela de listagem com zebra striping
3. API Route POST /api/inventario — adiciona item ao JSON
4. API Route GET /api/inventario — retorna todos os itens
5. Dados persistem após reload

## Padrão visual
- Layout responsivo e limpo
- Paleta de cores profissional (tons de azul/cinza)
- Feedback visual ao submeter formulário (loading + sucesso)
- Tabela com cabeçalhos claros e linhas alternadas

## Restrições
- Sem banco de dados
- Sem autenticação
- Foco em funcionalidade e UI polida
- Não escrever nada no arquivo C:\Users\Micro\Desktop\desafio-tecnico\README.md na raiz do projeto.