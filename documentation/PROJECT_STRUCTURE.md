# Documentação da Estrutura do Projeto (CMS Next.js)

Este documento detalha a estrutura de pastas e arquivos do projeto CMS Next.js, explicando o propósito de cada componente principal.

## Visão Geral Tecnológica

O projeto é construído utilizando as seguintes tecnologias principais:
- **Framework**: Next.js 16 (App Router)
- **Linguagem**: JavaScript / React
- **Banco de Dados**: MongoDB (via Mongoose)
- **Autenticação**: Clerk
- **Gerenciamento de Estado**: Jotai
- **Drag & Drop**: @dnd-kit
- **Estilização**: CSS Modules / Tailwind (onde aplicável)
- **Uploads**: Cloudinary

## Estrutura de Diretórios

### Raiz do Projeto

| Arquivo / Pasta | Descrição |
| :--- | :--- |
| `.env` / `.env.local` | Variáveis de ambiente (chaves de API, conexão com DB, etc). |
| `next.config.mjs` | Configurações do compilador Next.js. |
| `package.json` | Dependências e scripts do projeto (`npm run dev`, etc). |
| `public/` | Arquivos estáticos acessíveis publicamente (imagens, ícones, SVGs). |
| `src/` | Código fonte principal da aplicação. |
| `template-demos/` | Arquivos de demonstração para templates (HTML estático ou exemplos). |
| `documentation/` | Documentação do projeto (este arquivo). |

### Diretório `src/`

O diretório `src` contém a lógica da aplicação.

#### `src/app/`
Utiliza o **App Router** do Next.js. Cada pasta representa uma rota na URL.
- `api/`: Rotas de API (Backend) executadas no servidor (ex: CRUD de produtos, usuários).
- `(admin)/`: Grupo de rotas protegidas ou administrativas (painel de controle).
- `layout.js`: Layout principal da aplicação.
- `page.js`: Página inicial (`/`).

#### `src/components/`
Componentes React reutilizáveis.
- `admin/`: Componentes específicos do painel administrativo (Sidebar, Cards, Gráficos).
- `builder/`: Componentes do construtor de páginas (Drag & Drop, blocos editáveis).
- `ui/`: Componentes de interface genéricos (Botões, Modais, Inputs).

#### `src/lib/`
Bibliotecas e utilitários auxiliares.
- `db.js`: Configuração e conexão com o banco de dados MongoDB.

#### `src/models/`
Modelos de dados (Schemas) do Mongoose.
- `Page.js`: Estrutura de uma página criada no CMS.
- `Product.js`: Estrutura de um produto (e-commerce).
- `Template.js`: Definição de templates disponíveis.
- `User.js`: Dados de usuários (complementar ao Clerk).

#### `src/store/`
Gerenciamento de estado global utilizando **Jotai**.
- `editorStore.js`: Estado do editor visual (blocos selecionados, lista de blocos, metadados da página).

#### `src/templates/` & `src/templates-cms/`
Lógica de renderização e registro dos templates.
- **templates-cms/**: Registro dos componentes disponíveis para uso no CMS.
- **templates/**: Implementação dos temas (ex: Rustic Store, Business Theme), contendo os componentes visuais reais que são renderizados nas páginas.

## Fluxo de Dados Principal

1.  **Editor Visual**: Usa `src/store/editorStore.js` para manter o estado da página sendo editada.
2.  **Persistência**: Ao salvar, os dados são enviados para rotas em `src/app/api/` e salvos no MongoDB usando os modelos de `src/models/`.
3.  **Renderização**: O Next.js renderiza as páginas usando os componentes de `src/templates/` baseados na configuração salva no banco.
