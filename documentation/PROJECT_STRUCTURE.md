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


### src/store/
Gerenciamento de estado global utilizando **Jotai**.
- `cartStore.js`: Gerencia o estado do carrinho de compras (itens, total, abrir/fechar) com persistência no LocalStorage via `atomWithStorage`.
- `editorStore.js`: Estado do editor visual (blocos selecionados, lista de blocos, metadados da página).
- `themeStore.js`: Gerencia o tema global do site (cores, tipografia) e permite atualizações em tempo real no editor.
- `viewModeStore.js`: Controla o modo de visualização do editor (desktop, tablet, mobile) e auxilia na resolução de propriedades responsivas.

## Árvore de Arquivos (Resumo)

```bash
/
├── public/                     # Arquivos estáticos (imagens, favicons)
├── src/
│   ├── app/                    # Rotas da aplicação (Next.js App Router)
│   │   ├── (admin)/            # Grupo de rotas administrativas
│   │   ├── api/                # Endpoints da API (Backend)
│   │   ├── checkout-success/   # Página de sucesso do checkout
│   │   ├── layout.js           # Layout raiz
│   │   └── page.js             # Página inicial
│   ├── components/             # Componentes React
│   │   ├── admin/              # UI do painel administrativo
│   │   ├── builder/            # Núcleo do construtor de páginas
│   │   │   ├── renderers/      # Renderizadores de componentes (Container, Section, Widget)
│   │   │   └── widgets/        # Componentes atômicos (Button, Text, Image, etc.)
│   │   ├── shop/               # Componentes de e-commerce (ShopCart, ProductCard)
│   │   ├── template-editor/    # Interface do editor visual (DropZone, PropsPanel)
│   │   └── ui/                 # Componentes genéricos de UI
│   ├── lib/                    # Utilitários (db.js, cloudinary.js)
│   ├── models/                 # Schemas do Mongoose (Page, Product, Template)
│   ├── store/                  # Estado global (Jotai atoms)
│   ├── templates/              # Implementação dos temas (ex: rustic-store-nextjs)
│   └── templates-cms/          # Registro de templates para o CMS
├── template-demos/             # Arquivos de demonstração
├── next.config.mjs             # Configuração do Next.js
├── package.json                # Dependências
└── README.md                   # Instruções do projeto
```

## Fluxo de Dados Principal

1.  **Editor Visual**: Usa `src/store/editorStore.js`, `src/store/viewModeStore.js` e `src/store/themeStore.js` para manter o estado da página, visualização e tema.
2.  **Persistência**: Ao salvar, os dados são sent para `src/app/api/` e salvos no MongoDB (Schemas em `src/models/`).
3.  **Renderização**: O `DropZone` e os "Renderers" (`ContainerRenderer`, `WidgetRenderer`) leem a estrutura de blocos e renderizam os componentes correspondentes dinamicamente.
4.  **E-commerce**: O estado do carrinho (`src/store/cartStore.js`) é persistido localmente e compartilhado entre o ícone do carrinho e o checkout.
