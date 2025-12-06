import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';

export const rusticStoreDefaultContent = [
  // 1. Header (Custom Block)
  {
    id: 'header-1',
    type: 'header', // Maps to legacy section
    category: NODE_TYPES.SECTION,
    props: {}
  },
  
  // 2. Hero (Atomic Conversion)
  {
    id: 'hero-container',
    type: 'container',
    category: NODE_TYPES.CONTAINER,
    props: {
        width: '100%',
        padding: '100px 20px',
        backgroundColor: '#2d1810', // Fallback color
        backgroundImage: 'url("https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        direction: 'column',
        alignItems: 'center', // Center content
        textAlign: 'center'
    },
    children: [
        {
            id: 'hero-title',
            type: WIDGET_TYPES.HEADING,
            category: NODE_TYPES.WIDGET,
            props: {
                text: 'Decoração Rústica Artesanal',
                tag: 'h1',
                align: 'center',
                color: '#ffffff',
                fontSize: '3.5rem'
            }
        },
        {
            id: 'hero-subtitle',
            type: WIDGET_TYPES.TEXT,
            category: NODE_TYPES.WIDGET,
            props: {
                content: 'Móveis únicos feitos à mão para transformar sua casa em um lar aconchegante.',
                align: 'center',
                color: '#e5e5e5',
                fontSize: '1.25rem',
                marginBottom: '2rem'
            }
        },
        {
            id: 'hero-button',
            type: WIDGET_TYPES.BUTTON,
            category: NODE_TYPES.WIDGET,
            props: {
                text: 'Ver Coleção',
                variant: 'primary',
                align: 'center',
                backgroundColor: '#8b4513',
                color: '#ffffff',
                padding: '12px 30px',
                borderRadius: '4px'
            }
        }
    ]
  },

  // 3. Products (Custom Block - Dynamic)
  {
    id: 'products-section',
    type: 'products',
    category: NODE_TYPES.SECTION,
    props: {
        title: 'Nossos Produtos'
    }
  },

  // 4. About (Atomic Conversion - 3 Col Grid)
  {
    id: 'about-container-main',
    type: 'container',
    category: NODE_TYPES.CONTAINER,
    props: {
        width: '100%',
        padding: '80px 20px',
        backgroundColor: '#f5f5f0',
        direction: 'column',
        alignItems: 'center'
    },
    children: [
        // Title
        {
            id: 'about-title',
            type: WIDGET_TYPES.HEADING,
            category: NODE_TYPES.WIDGET,
            props: {
                text: 'Sobre a RusticStore',
                tag: 'h2',
                align: 'center',
                color: '#2d1810',
                marginBottom: '1rem'
            }
        },
        {
            id: 'about-desc',
            type: WIDGET_TYPES.TEXT,
            category: NODE_TYPES.WIDGET,
            props: {
                content: 'Somos especialistas em móveis rústicos de alta qualidade.',
                align: 'center',
                color: '#555555',
                marginBottom: '3rem'
            }
        },
        // Grid Container (Row)
        {
            id: 'about-grid',
            type: 'container',
            category: NODE_TYPES.CONTAINER,
            props: {
                width: '1000px', // Max width constraint
                direction: 'row',
                gap: '40px',
                justifyContent: 'center'
            },
            children: [
                // Col 1
                {
                    id: 'about-col-1',
                    type: 'container',
                    category: NODE_TYPES.CONTAINER,
                    props: { width: '33%', alignItems: 'center', className: 'about-item' },
                    children: [
                        { id: 'icon-1', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: '🏡', align: 'center', fontSize: '3rem' } }, // Fake Icon
                        { id: 'title-1', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: 'Feito à Mão', tag: 'h3', align: 'center', fontSize: '1.25rem' } },
                        { id: 'text-1', type: WIDGET_TYPES.TEXT, category: NODE_TYPES.WIDGET, props: { content: 'Cada peça única.', align: 'center' } }
                    ]
                },
                // Col 2
                 {
                    id: 'about-col-2',
                    type: 'container',
                    category: NODE_TYPES.CONTAINER,
                    props: { width: '33%', alignItems: 'center' },
                    children: [
                        { id: 'icon-2', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: '🚚', align: 'center', fontSize: '3rem' } },
                        { id: 'title-2', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: 'Entrega Rápida', tag: 'h3', align: 'center', fontSize: '1.25rem' } },
                        { id: 'text-2', type: WIDGET_TYPES.TEXT, category: NODE_TYPES.WIDGET, props: { content: 'Para todo Brasil.', align: 'center' } }
                    ]
                },
                // Col 3
                 {
                    id: 'about-col-3',
                    type: 'container',
                    category: NODE_TYPES.CONTAINER,
                    props: { width: '33%', alignItems: 'center' },
                    children: [
                        { id: 'icon-3', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: '🛡️', align: 'center', fontSize: '3rem' } },
                        { id: 'title-3', type: WIDGET_TYPES.HEADING, category: NODE_TYPES.WIDGET, props: { text: 'Garantia', tag: 'h3', align: 'center', fontSize: '1.25rem' } },
                        { id: 'text-3', type: WIDGET_TYPES.TEXT, category: NODE_TYPES.WIDGET, props: { content: '12 meses total.', align: 'center' } }
                    ]
                }
            ]
        }
    ]
  },

  // 5. Contact (Hybrid/Custom or Simple) -> Let's use Custom for form
  {
      id: 'contact-section',
      type: 'contact',
      category: NODE_TYPES.SECTION,
      props: {}
  },

  // 6. Footer (Custom)
  {
      id: 'footer-section',
      type: 'footer',
      category: NODE_TYPES.SECTION,
      props: {}
  }
];
