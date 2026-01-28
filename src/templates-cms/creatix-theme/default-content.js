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
            cta: "Shop now"
          }
        },
        {
          id: 'creatix-hero',
          type: 'hero',
          props: {
            headline: "Elevate your visuals with premium digital assets",
            subheadline: "Curated fonts, textures, and graphic kits designed for modern creators and brands.",
            primaryCTA: "Explore products",
            secondaryCTA: "Browse categories",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000"
          }
        },
        {
          id: 'creatix-categories',
          type: 'categories',
          props: {
            title: "Browse by Category",
            items: [
              { id: "fonts", name: "Fonts", icon: "Type", description: "Serif, Sans & Display" },
              { id: "graphics", name: "Graphics", icon: "Image", description: "Vectors & Illustrations" },
              { id: "textures", name: "Textures", icon: "Layers", description: "Paper, Noise & Gradient" },
              { id: "mockups", name: "Mockups", icon: "Box", description: "High-res Presentations" },
              { id: "3d-assets", name: "3D Assets", icon: "Box", description: "Abstract Shapes & Icons" }
            ]
          }
        },
        {
          id: 'creatix-featured',
          type: 'featured',
          props: {
            title: "New Releases",
            products: [
              // --- FONTS ---
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
              // --- GRAPHICS ---
              {
                id: "3",
                name: "Minimalist Brand Kit",
                slug: "minimalist-brand-kit",
                price: 45,
                category: "Graphics",
                image: "/images/digital-brand/brandkit.png"
              },
              // --- TEXTURES ---
              {
                id: "2",
                name: "Abstract Gradient Pack",
                slug: "abstract-gradient-pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png"
              },
              // --- MOCKUPS ---
              {
                id: "15",
                name: "iPhone 15 Clay Mockup",
                slug: "iphone-15-mockup",
                price: 16,
                category: "Mockups",
                image: "/images/digital-brand/iphone_15_mockup_1769553604476.png"
              },
              // --- 3D ASSETS ---
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
            about: "A premium digital product studio focused on modern design and high-performance assets for the next generation of brands.",
            links: [
              { label: "Terms & Privacy", href: "/terms" },
              { label: "Support", href: "/support" },
              { label: "Contact", href: "/contact" }
            ]
          }
        }
      ]
    }
  ]
};
