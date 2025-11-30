# Business Theme CMS - Versão Compatível

Este é o template **Business Theme** convertido para a estrutura CMS-compatível.

## Estrutura

```
business-theme-cms/
├── template.json          # Metadados obrigatórios
├── sections/
│   ├── Hero.jsx
│   ├── Hero.module.css
│   ├── Features.jsx
│   ├── Features.module.css
│   ├── Contact.jsx
│   └── Contact.module.css
└── layouts/
    └── HomePage.jsx
```

## Como Importar

1. Vá em **Templates** → **Importar Pasta**
2. Selecione a pasta `business-theme-cms`
3. O sistema irá:
   - Validar `template.json`
   - Copiar arquivos para `src/templates-cms/`
   - Auto-registrar no sistema
   - Salvar no banco de dados

## Features

- ✅ CSS Modules
- ✅ Props configuráveis
- ✅ Sem dependências externas
- ✅ 100% CMS-compatível

## Seções Incluídas

- **Hero**: Seção de destaque com título, subtítulo e imagem
- **Features**: Grade de recursos/serviços
- **Contact**: Informações de contato
