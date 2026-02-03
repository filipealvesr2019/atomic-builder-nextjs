export const translations = {
    en: {
        sidebar: {
            dashboard: 'Dashboard',
            store: 'Store',
            plugins: 'Plugins',
            templates: 'Templates',
            settings: 'Settings',
            products: 'Products',
            pages: 'Pages',
            support: 'Support'
        },
        dashboard: {
            welcome: 'Welcome back',
            overview: 'Overview',
            sales: 'Total Sales',
            visitors: 'Total Visitors',
            totalPages: 'Total Pages',
            activeProducts: 'Active Products',
            salesToday: 'Sales Today'
        },
        templates: {
            title: 'Templates',
            import: 'Import Folder',
            importModalTitle: 'Import Theme (Folder)',
            uploadTitle: 'Upload CMS-Compatible Template',
            selectFolder: 'Select your template folder. It must contain a <code>template.json</code> and follow the CMS structure.',
            expectedStructure: 'Expected Structure:',
            loading: 'Loading...',
            deleteConfirm: 'Are you sure you want to delete this template?',
            viewTheme: 'View Theme',
            edit: 'Edit',
            config: 'Modules',
            delete: 'Delete',
            pagesCount: 'page(s)'
        },
        store: {
            title: 'Template Store',
            subtitle: 'Browse and install beautiful themes for your website.',
            preview: 'Preview',
            liveDemo: 'Live Demo',
            viewDetails: 'View Details',
            install: 'Install Theme',
            installing: 'Installing...',
            installed: 'Installed',
            categories: {
                all: 'All',
                fitness: 'Fitness',
                cosmetics: 'Cosmetics',
                digital: 'Digital Products',
                lifestyle: 'Lifestyle',
                'home-decor': 'Furniture & Home Decor',
                coaching: 'Coaching',
                weddings: 'Weddings'
            },
            items: {
                'iron-strength-cms': {
                    name: 'IronStrength',
                    description: 'A high-energy fitness theme designed for gyms, crossfit boxes, and personal trainers. Bold, aggressive, and conversion-focused.',
                    target: 'Gyms, Crossफिट studios, Personal Trainers, and Fitness Centers.',
                    features: ['Class Schedule Grid', 'Membership Pricing Tables', 'Trainer Team Showcase', 'High-Impact Hero Section'],
                    sections: ['Hero', 'Classes Grid', 'Membership Plans', 'Trainer Team', 'Footer']
                },
                'rustic-store-cms': {
                    name: 'Rustic Store',
                    description: 'A premium e-commerce template for high-end furniture and home decor brands. Features a warm, industrial aesthetic that emphasizes craftsmanship.',
                    target: 'Furniture stores, interior designers, and decor boutiques looking for a sophisticated online presence.',
                    features: ['Product Gallery', 'Inventory Management', 'Responsive Mobile Design', 'Custom Newsletter Section'],
                    sections: ['Hero', 'Product List', 'About Us', 'Newsletter', 'Contact']
                },
                'digital-brand-theme': {
                    name: 'Digital Brand',
                    description: 'The ultimate template for selling digital assets like mockup kits, graphics, and templates. Designed for high conversion and visual impact.',
                    target: 'Graphic designers, UI/UX artists, and creative agencies selling digital products.',
                    features: ['Dynamic Product Grid', 'Shopping Bag Integration', 'Dark/Light Mode Ready', 'Quick Install System'],
                    sections: ['Hero', 'Categories Grid', 'Featured Products', 'Benefits', 'Footer']
                },
                'creatix-theme': {
                    name: 'Creatix',
                    description: 'A modern, clean typography-focused template ideal for font foundries and digital product creators.',
                    target: 'Type designers and creative sellers who value minimalism and elite typography.',
                    features: ['Advanced Font Showcase', 'Interactive Product Detail Page', 'Bespoke Category Filtering', 'Customer Portal'],
                    sections: ['Hero', 'Categories', 'Featured Content', 'Interactive Gallery', 'Product Page']
                },
                'emma-portfolio': {
                    name: 'Emma Portfolio',
                    description: 'A high-converting coaching and portfolio template designed to turn visitors into clients. Direct, elegant, and professional.',
                    target: 'Life coaches, business consultants, and professional speakers.',
                    features: ['Service Breakdown', 'Podcast Integration', 'Client Testimonials', 'Contact Management'],
                    sections: ['Hero', 'Services', 'Podcast Section', 'Testimonials', 'Contact Form']
                },
                'business-theme-cms': {
                    name: 'Fitness Pro',
                    description: 'A robust and energetic template designed for fitness professionals and gyms to showcase their programs and services.',
                    target: 'Personal trainers, yoga studios, and gym owners.',
                    features: ['Class Schedules', 'Training Programs Section', 'Trainer Profiles', 'Contact Form'],
                    sections: ['Hero', 'Features', 'Training Programs', 'Contact Section']
                },
                'minimal-business': {
                    name: 'Cosmetic Minimal',
                    description: 'An elegant, minimalist landing page for beauty and cosmetic brands focusing on high-quality product presentation.',
                    target: 'Skincare brands, makeup artists, and beauty influencers.',
                    features: ['Feature Highlights', 'Clean Product Showcase', 'Responsive Layout', 'CTA Optimized'],
                    sections: ['Hero', 'Key Features', 'Product Spotlight', 'Footer']
                },
                'ursula-theme': {
                    name: 'Ursula Blog',
                    description: 'A sophisticated blog template for lifestyle influencers and content creators who want a classic, editorial feel.',
                    target: 'Lifestyle bloggers, travelers, and editorial writers.',
                    features: ['Multi-category Support', 'Featured Newsletter', 'Clean Typography', 'Social Media Sync'],
                    sections: ['Hero', 'Category Index', 'Featured Posts', 'Newsletter Signup']
                },
                'ava-portfolio': {
                    name: 'Ava Portfolio',
                    description: 'A romantic and elegant portfolio template specifically crafted for wedding photographers and event planners.',
                    target: 'Wedding photographers, event planners, and creative professionals.',
                    features: ['Photo Collage Layout', 'Workshop Management', 'Detailed Service Pages', 'Testimonial Slider'],
                    sections: ['Hero', 'Photo Collage', 'Services', 'Workshops', 'Client Reviews']
                }
            },
            types: {
                all: 'All Types',
                ecommerce: 'E-commerce',
                landing: 'Landing Page',
                blog: 'Blog',
                portfolio: 'Portfolio',
                portfolio: 'Portfolio',
                institutional: 'Institutional',
                fonts: 'Fonts',
                graphics: 'Graphics'
            },
            filterByType: 'Filter by Type'
        },
        plugins: {
            title: 'Plugins',
            subtitle: 'Extend the functionality of your site with powerful plugins.',
            install: 'Install',
            installed: 'Installed',
            items: {
                'ecommerce-core': {
                    name: 'E-commerce Core',
                    description: 'Add products, cart, and checkout functionality to your site.'
                },
                'seo-booster': {
                    name: 'SEO Booster',
                    description: 'Optimize your pages for search engines with advanced meta tags and sitemaps.'
                },
                'analytics-pro': {
                    name: 'Analytics Pro',
                    description: 'Track visitor behavior and get detailed insights directly in your dashboard.'
                },
                'form-builder': {
                    name: 'Form Builder',
                    description: 'Create contact forms, surveys, and newsletters with drag-and-drop.'
                },
                'stripe-payments': {
                    name: 'Stripe Payments',
                    description: 'Accept credit card payments securely with Stripe Checkout integration.'
                }
            }
        },
        editor: {
            loading: 'Loading editor...',
            notFound: 'Template not found',
            elements: 'Elements',
            basic: 'Basic',
            sections: 'Sections',
            save: 'Save',
            saving: 'Saving...',
            back: 'Back to list',
            add: 'Add Elements',
            theme: 'Global Style',
            viewDesktop: 'Desktop',
            viewTablet: 'Tablet',
            viewMobile: 'Mobile',
            undo: 'Undo',
            redo: 'Redo',
            edit: 'Edit',
            backToLib: 'Back to library',
            moving: 'Moving Block',
            newItem: 'New Element',
            saved: 'Template saved successfully!',
            error: 'Error saving template',
            pages: 'Pages',
            newPage: 'New Page',
            pageName: 'Page Name',
            createPage: 'Create Page',
            managePages: 'Manage Pages',
            deletePage: 'Delete Page',
            blocks: {
                heading: 'Heading',
                text: 'Text Editor',
                button: 'Button',
                image: 'Image',
                container: 'Container',
                productList: 'Product List',
                iconBox: 'Icon Box',
                iconList: 'Icon List',
                imageBox: 'Image Box',
                divider: 'Divider',
                spacer: 'Spacer'
            }
        },
        settings: {
            title: 'Theme Settings',
            general: 'General',
            store: 'Store',
            physical: 'Physical Products',
            digital: 'Digital Products',
            social: 'Social Media',
            seo: 'SEO & Analytics',
            advanced: 'Advanced',
            save: 'Save Changes',
            saving: 'Saving...',
            templateName: 'Template Name',
            description: 'Description',
            success: 'Settings saved successfully!',
            error: 'Error saving settings',
            labels: {
                currency: 'Currency',
                productsPerPage: 'Products per Page',
                facebook: 'Facebook URL',
                instagram: 'Instagram URL',
                twitter: 'Twitter URL',
                gaId: 'Google Analytics ID',
                metaTitle: 'Meta Title',
                metaDescription: 'Meta Description'
            }
        }
    },
    pt: {
        sidebar: {
            dashboard: 'Dashboard',
            store: 'Loja',
            plugins: 'Plugins',
            templates: 'Templates',
            settings: 'Configurações',
            products: 'Produtos',
            pages: 'Páginas',
            support: 'Suporte'
        },
        dashboard: {
            welcome: 'Bem-vindo de volta',
            overview: 'Visão Geral',
            sales: 'Vendas Totais',
            visitors: 'Visitantes Totais',
            totalPages: 'Total de Páginas',
            activeProducts: 'Produtos Ativos',
            salesToday: 'Vendas Hoje'
        },
        templates: {
            title: 'Templates',
            import: 'Importar Pasta',
            importModalTitle: 'Importar Tema (Pasta)',
            uploadTitle: 'Upload de Template CMS-Compatível',
            selectFolder: 'Selecione a pasta do seu template. O template deve conter um arquivo <code>template.json</code> e seguir a estrutura CMS-compatível.',
            expectedStructure: 'Estrutura esperada:',
            loading: 'Carregando...',
            deleteConfirm: 'Tem certeza que deseja excluir este template?',
            viewTheme: 'Ver Tema',
            edit: 'Editar',
            config: 'Config',
            delete: 'Excluir',
            pagesCount: 'página(s)'
        },
        store: {
            title: 'Loja de Temas',
            subtitle: 'Navegue e instale temas bonitos para seu site.',
            preview: 'Prévia',
            liveDemo: 'Ver Demo',
            viewDetails: 'Ver Detalhes',
            install: 'Instalar Tema',
            installing: 'Instalando...',
            installed: 'Instalado',
            categories: {
                all: 'Todos',
                fitness: 'Fitness',
                cosmetics: 'Cosméticos',
                digital: 'Produtos Digitais',
                lifestyle: 'Estilo de Vida',
                'home-decor': 'Móveis e Decoração',
                coaching: 'Coaching',
                weddings: 'Casamentos'
            },
            items: {
                'iron-strength-cms': {
                    name: 'IronStrength',
                    description: 'Um tema de fitness de alta energia projetado para academias, boxes de crossfit e personal trainers. Ousado, agressivo e focado em conversão.',
                    target: 'Academias, Estúdios de Crossfit, Personal Trainers e Centros de Fitness.',
                    features: ['Grade de Horários de Aulas', 'Tabelas de Preços de Planos', 'Destaque da Equipe de Treinadores', 'Seção Hero de Alto Impacto'],
                    sections: ['Hero', 'Grade de Aulas', 'Planos de Afiliação', 'Equipe de Treinadores', 'Rodapé']
                },
                'rustic-store-cms': {
                    name: 'Rustic Store',
                    description: 'Um template de e-commerce premium para marcas de móveis e decoração de alto padrão. Possui uma estética industrial acolhedora que enfatiza o artesanato.',
                    target: 'Lojas de móveis, designers de interiores e boutiques de decoração que buscam uma presença online sofisticada.',
                    features: ['Galeria de Produtos', 'Gerenciamento de Estoque', 'Design Responsivo', 'Seção de Newsletter Personalizada'],
                    sections: ['Hero', 'Lista de Produtos', 'Sobre Nós', 'Newsletter', 'Contato']
                },
                'digital-brand-theme': {
                    name: 'Digital Brand',
                    description: 'O template definitivo para vender ativos digitais como kits de mockup, gráficos e templates. Projetado para alta conversão e impacto visual.',
                    target: 'Designers gráficos, artistas de UI/UX e agências criativas que vendem produtos digitais.',
                    features: ['Grade de Produtos Dinâmica', 'Integração com Carrinho', 'Pronto para Modo Escuro/Claro', 'Sistema de Instalação Rápida'],
                    sections: ['Hero', 'Grade de Categorias', 'Produtos em Destaque', 'Benefícios', 'Rodapé']
                },
                'creatix-theme': {
                    name: 'Creatix',
                    description: 'Um template moderno focado em tipografia limpa, ideal para fundições de fontes e criadores de produtos digitais.',
                    target: 'Designers de tipos e vendedores criativos que valorizam o minmalismo e a tipografia de elite.',
                    features: ['Vitrine de Fontes Avançada', 'Página de Detalhes Interativa', 'Filtragem por Categoria Sob Medida', 'Portal do Cliente'],
                    sections: ['Hero', 'Categorias', 'Conteúdo em Destaque', 'Galeria Interativa', 'Página de Produto']
                },
                'emma-portfolio': {
                    name: 'Emma Portfolio',
                    description: 'Um template de coaching e portfólio de alta conversão, projetado para transformar visitantes em clientes. Direto, elegante e profissional.',
                    target: 'Life coaches, consultores de negócios e palestrantes profissionais.',
                    features: ['Detalhamento de Serviços', 'Integração com Podcast', 'Depoimentos de Clientes', 'Gerenciamento de Contato'],
                    sections: ['Hero', 'Serviços', 'Seção de Podcast', 'Depoimentos', 'Formulário de Contato']
                },
                'business-theme-cms': {
                    name: 'Fitness Pro',
                    description: 'Um template robusto e energético projetado para profissionais de fitness e academias mostrarem seus programas e serviços.',
                    target: 'Personal trainers, estúdios de yoga e donos de academia.',
                    features: ['Horários de Aulas', 'Seção de Programas de Treino', 'Perfis de Treinadores', 'Formulário de Contato'],
                    sections: ['Hero', 'Destaques', 'Programas de Treino', 'Seção de Contato']
                },
                'minimal-business': {
                    name: 'Cosmetic Minimal',
                    description: 'Uma landing page elegante e minimalista para marcas de beleza e cosméticos, com foco na apresentação de produtos de alta qualidade.',
                    target: 'Marcas de cuidados com a pele, maquiadores e influenciadores de beleza.',
                    features: ['Destaques de Recursos', 'Vitrine de Produtos Limpa', 'Layout Responsivo', 'Otimizado para Conversão (CTA)'],
                    sections: ['Hero', 'Recursos Chave', 'Destaque de Produto', 'Rodapé']
                },
                'ursula-theme': {
                    name: 'Ursula Blog',
                    description: 'Um template de blog sofisticado para influenciadores de estilo de vida e criadores de conteúdo que desejam uma sensação editorial clássica.',
                    target: 'Blogueiros de lifestyle, viajantes e escritores editoriais.',
                    features: ['Suporte a Múltiplas Categorias', 'Newsletter em Destaque', 'Tipografia Limpa', 'Sincronização com Redes Sociais'],
                    sections: ['Hero', 'Índice de Categorias', 'Posts em Destaque', 'Assinatura de Newsletter']
                },
                'ava-portfolio': {
                    name: 'Ava Portfolio',
                    description: 'Um template de portfólio romântico e elegante, criado especificamente para fotógrafos de casamento e organizadores de eventos.',
                    target: 'Fotógrafos de casamento, organizadores de eventos e profissionais criativos.',
                    features: ['Layout de Colagem de Fotos', 'Gerenciamento de Workshops', 'Páginas de Serviço Detalhadas', 'Slider de Depoimentos'],
                    sections: ['Hero', 'Colagem de Fotos', 'Serviços', 'Workshops', 'Depoimentos']
                }
            },
            types: {
                all: 'Todos os Tipos',
                ecommerce: 'E-commerce',
                landing: 'Landing Page',
                blog: 'Blog',
                portfolio: 'Portfólio',
                institutional: 'Institucional',
                fonts: 'Fontes',
                graphics: 'Gráficos'
            },
            filterByType: 'Filtrar por Tipo'
        },
        plugins: {
            title: 'Plugins',
            subtitle: 'Estenda a funcionalidade do seu site com plugins poderosos.',
            install: 'Instalar',
            installed: 'Instalado',
            items: {
                'ecommerce-core': {
                    name: 'E-commerce Core',
                    description: 'Adicione produtos, carrinho e checkout ao seu site.'
                },
                'seo-booster': {
                    name: 'SEO Booster',
                    description: 'Otimize suas páginas para buscadores com meta tags avançadas.'
                },
                'analytics-pro': {
                    name: 'Analytics Pro',
                    description: 'Rastreie visitantes e obtenha insights detalhados no painel.'
                },
                'form-builder': {
                    name: 'Construtor de Formulários',
                    description: 'Crie formulários, pesquisas e newsletters com arrastar e soltar.'
                },
                'stripe-payments': {
                    name: 'Pagamentos Stripe',
                    description: 'Aceite pagamentos com cartão seguramente com Stripe.'
                }
            }
        },
        editor: {
            loading: 'Carregando editor...',
            notFound: 'Template não encontrado',
            elements: 'Elementos',
            basic: 'Básico',
            sections: 'Seções',
            save: 'Salvar',
            saving: 'Salvando...',
            back: 'Voltar para lista',
            add: 'Adicionar Elementos',
            theme: 'Estilo Global',
            viewDesktop: 'Desktop',
            viewTablet: 'Tablet',
            viewMobile: 'Mobile',
            undo: 'Desfazer',
            redo: 'Refazer',
            edit: 'Editar',
            backToLib: 'Voltar para biblioteca',
            moving: 'Movendo Bloco',
            newItem: 'Novo Elemento',
            saved: 'Template salvo com sucesso!',
            error: 'Erro ao salvar template',
            pages: 'Páginas',
            newPage: 'Nova Página',
            pageName: 'Nome da Página',
            createPage: 'Criar Página',
            managePages: 'Gerenciar Páginas',
            deletePage: 'Excluir Página',
            blocks: {
                heading: 'Título',
                text: 'Editor de Texto',
                button: 'Botão',
                image: 'Imagem',
                container: 'Container',
                productList: 'Lista de Produtos',
                iconBox: 'Caixa de Ícone',
                iconList: 'Lista de Ícones',
                imageBox: 'Caixa de Imagem',
                divider: 'Divisor',
                spacer: 'Espaçador'
            }
        },
        settings: {
            title: 'Configurações do Tema',
            general: 'Geral',
            store: 'Loja',
            physical: 'Produtos Físicos',
            digital: 'Produtos Digitais',
            social: 'Redes Sociais',
            seo: 'SEO & Analytics',
            advanced: 'Avançado',
            save: 'Salvar Alterações',
            saving: 'Salvando...',
            templateName: 'Nome do Template',
            description: 'Descrição',
            success: 'Configurações salvas com sucesso!',
            error: 'Erro ao salvar configurações',
            labels: {
                currency: 'Moeda',
                productsPerPage: 'Produtos por Página',
                facebook: 'URL do Facebook',
                instagram: 'URL do Instagram',
                twitter: 'URL do Twitter',
                gaId: 'ID do Google Analytics',
                metaTitle: 'Meta Título',
                metaDescription: 'Meta Descrição'
            }
        }
    }
};
