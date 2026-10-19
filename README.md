# Oficina Lume

Site de marketing e área de cliente para uma oficina de bicicletas fictícia em Lisboa. Frontend puro: sem backend, os dados vivem em ficheiros TypeScript e no `localStorage`.

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Início: hero, serviços, "Como funciona", testemunhos |
| `/precos` | Planos (mensal/anual com 15% de desconto) e FAQ |
| `/marcar` | Formulário de marcação (validação zod, guarda no localStorage) |
| `/area-cliente` | Lista de marcações, estados, resumo e gráfico por mês |
| `/sobre` | Equipa, mapa e horário |
| qualquer outra | Página 404 |

Routing uses TanStack Router (file-based, `src/routes/`), the router fixed by this stack.

## Variáveis de ambiente

| Variável | Predefinição |
| --- | --- |
| `VITE_SHOP_NAME` | `Oficina Lume` |
| `VITE_SHOP_PHONE` | `+351 218 123 456` |

Defina-as num ficheiro `.env` na raiz, ex.: `VITE_SHOP_PHONE="+351 912 000 000"`.

## Dados locais

- Marcações: `localStorage["oficina-lume:bookings"]`
- Tema claro/escuro: `localStorage["oficina-lume:theme"]`


teste 10 a
