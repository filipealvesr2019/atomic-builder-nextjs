export const creatixDefaultContent = {
  templateId: 'creatix-theme',
  pages: [
    {
      slug: 'home',
      name: 'Home',
      content: [
        {
          id: 'creatix-header',
          type: 'header',
          props: {
            logo: "CREATIX",
            menu: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Fonts", href: "/category/fonts" },
              { label: "Graphics", href: "/category/graphics" },
              { label: "Textures", href: "/category/textures" },
              { label: "Mockups", href: "/category/mockups" },
              { label: "3D Assets", href: "/category/3d-assets" }
            ],
            cta: "Login"
          }
        },
        {
          id: 'creatix-hero',
          type: 'hero',
          props: {
            headline: "Elevate your visuals with premium digital assets",
            subheadline: "Curated fonts, textures, and graphic kits designed for modern creators and brands.",
            primaryCTA: "Browse Collection",
            secondaryCTA: "View Bundles",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2400"
          }
        },
        {
          id: 'creatix-categories',
          type: 'categories',
          props: {
            title: "Browse by Category",
            items: [
              { id: "fonts", name: "Fonts", image: "/images/creatix-theme/category_fonts_1769726993395.png" },
              { id: "graphics", name: "Graphics", image: "/images/creatix-theme/category_graphics_1769727006753.png" },
              { id: "textures", name: "Textures", image: "/images/creatix-theme/category_textures_1769727019982.png" },
              { id: "mockups", name: "Mockups", image: "/images/creatix-theme/category_mockups_1769727033010.png" },
              { id: "3d-assets", name: "3D Assets", image: "/images/creatix-theme/category_3d_assets_1769727046314.png" }
            ]
          }
        },
        {
          id: 'creatix-featured',
          type: 'featured',
          props: {
            title: "Featured Products",
            products: [
              {
                id: "1",
                name: "Chronos Display Font",
                slug: "chronos-display-font",
                price: 29,
                category: "Fonts",
                image: "/images/digital-brand/chronos.png",
                badge: "Trending"
              },
              {
                id: "7",
                name: "Helix Modern Sans",
                slug: "helix-modern-sans",
                price: 24,
                category: "Fonts",
                image: "/images/digital-brand/helix_modern_sans_font_1769553465607.png"
              },
              {
                id: "11",
                name: "Bauhaus Geometric Pack",
                slug: "bauhaus-geometric",
                price: 25,
                category: "Graphics",
                image: "/images/digital-brand/bauhaus_geometric_shapes_1769553533343.png"
              },
              {
                id: "12",
                name: "Street Art Vectors",
                slug: "street-art-vectors",
                price: 28,
                category: "Graphics",
                image: "/images/digital-brand/street_art_vectors_1769553550292.png",
                badge: "Popular"
              },
              {
                id: "2",
                name: "Abstract Gradient Pack",
                slug: "abstract-gradient-pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png"
              },
              {
                id: "14",
                name: "Liquid Marble Textures",
                slug: "liquid-marble-textures",
                price: 20,
                category: "Textures",
                image: "/images/digital-brand/liquid_marble_textures_1769553591166.png",
                badge: "Colorful"
              },
              {
                id: "15",
                name: "iPhone 15 Clay Mockup",
                slug: "iphone-15-mockup",
                price: 16,
                category: "Mockups",
                image: "/images/digital-brand/iphone_15_mockup_1769553604476.png"
              },
              {
                id: "5",
                name: "Abstract 3D Shapes",
                slug: "abstract-3d-shapes",
                price: 35,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_shapes_main.png"
              }
            ]
          }
        },
        {
          id: 'creatix-footer',
          type: 'footer',
          props: {
            brandName: "CREATIX",
            about: "Premium digital resources for makers, designers, and visionaries. Every item is hand-picked to ensure premium design standards.",
            links: [
              { label: "Fonts", href: "/category/fonts" },
              { label: "Graphics", href: "/category/graphics" },
              { label: "Textures", href: "/category/textures" },
              { label: "Mockups", href: "/category/mockups" },
              { label: "3D Assets", href: "/category/3d-assets" },
              { label: "Support", href: "/contact" }
            ]
          }
        }
      ]
    }
  ]
};
