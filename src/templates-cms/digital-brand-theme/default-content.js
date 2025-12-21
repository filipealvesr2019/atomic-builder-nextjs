export const digitalBrandDefaultContent = {
  header: {
    logo: {
      text: "DIGITAL BRAND",
      image: ""
    },
    menu: [
      { label: "Início", href: "/" },
      { label: "Produtos", href: "/products" },
      { label: "Sobre", href: "/about" },
      { label: "Contato", href: "/contact" }
    ],
    buttons: {
      login: "Entrar",
      buy: "Comprar agora"
    }
  },
  hero: {
    badge: "Novidade: Templates Next.js",
    headline: "Impulsione seu projeto com nossos ativos digitais premium",
    subheadline: "Templates, cursos e ferramentas exclusivas criadas para acelerar seu fluxo de trabalho e elevar sua marca ao próximo nível.",
    primaryCTA: "Ver produtos",
    secondaryCTA: "Explorar categorias",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  categories: {
    title: "Navegue por Categoria",
    items: [
      { id: "templates", name: "Templates", icon: "Layout", description: "Design pronto para usar" },
      { id: "courses", name: "Cursos", icon: "BookOpen", description: "Aprenda novas habilidades" },
      { id: "ebooks", name: "E-books", icon: "FileText", description: "Conhecimento em suas mãos" },
      { id: "tools", name: "Ferramentas", icon: "Tool", description: "Scripts e utilitários" }
    ]
  },
  featured: {
    title: "Produtos em Destaque",
    subtitle: "Confira nossas soluções mais populares",
    products: [
      {
        id: "1",
        name: "Next.js SaaS Starter",
        price: 199,
        category: "Templates",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        badge: "Mais Vendido"
      },
      {
        id: "2",
        name: "UI Kit - Brand Pro",
        price: 49,
        category: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1000"
      },
      {
        id: "3",
        name: "Mastering React Native",
        price: 147,
        category: "Cursos",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000"
      },
      {
        id: "4",
        name: "Dev Performance Guide",
        price: 29,
        category: "E-books",
        image: "https://images.unsplash.com/photo-1544391496-1ca7c97457cd?auto=format&fit=crop&q=80&w=1000"
      }
    ]
  },
  benefits: {
    title: "Por que escolher nossa marca?",
    items: [
      {
        title: "Download Imediato",
        description: "Obtenha acesso instantâneo aos seus arquivos logo após a confirmação do pagamento.",
        icon: "Zap"
      },
      {
        title: "Conteúdo 100% Digital",
        description: "Produtos otimizados para consumo imediato, sem espera por frete ou logística.",
        icon: "Download"
      },
      {
        title: "Suporte Direto",
        description: "Fale diretamente com os criadores para resolver qualquer dúvida ou dificuldade.",
        icon: "Headphones"
      },
      {
        title: "Atualizações",
        description: "Mantenha seus produtos sempre atualizados com as últimas versões e melhorias.",
        icon: "RefreshCw"
      }
    ]
  },
  footer: {
    brandName: "DIGITAL BRAND",
    description: "Sua fonte premium de ativos digitais para o desenvolvimento moderno.",
    links: [
      {
        title: "Empresa",
        items: [
          { label: "Sobre", href: "/about" },
          { label: "Carreiras", href: "/careers" },
          { label: "Contato", href: "/contact" }
        ]
      },
      {
        title: "Suporte",
        items: [
          { label: "Central de Ajuda", href: "/help" },
          { label: "Termos", href: "/terms" },
          { label: "Privacidade", href: "/privacy" }
        ]
      }
    ],
    social: ["Twitter", "Instagram", "GitHub", "LinkedIn"]
  }
};
