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
              {
                id: "8",
                name: "Vintura Script",
                slug: "vintura-script",
                price: 22,
                category: "Fonts",
                image: "/images/digital-brand/vintura_script_font_1769553479318.png"
              },
              {
                id: "9",
                name: "Techno Mono",
                slug: "techno-mono",
                price: 26,
                category: "Fonts",
                image: "/images/digital-brand/techno_mono_font_1769553493767.png",
                badge: "New"
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
              {
                id: "10",
                name: "Botanical Illustrations",
                slug: "botanical-illustrations",
                price: 19,
                category: "Graphics",
                image: "/images/digital-brand/botanical_illustrations_1769553519865.png"
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

              // --- TEXTURES ---
              {
                id: "2",
                name: "Abstract Gradient Pack",
                slug: "abstract-gradient-pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png"
              },
              {
                id: "4",
                name: "Film Grain Overlays",
                slug: "film-grain-overlays",
                price: 15,
                category: "Textures",
                image: "/images/digital-brand/filmgrain.png"
              },
              {
                id: "13",
                name: "Paper Textures Pack",
                slug: "paper-textures-pack",
                price: 14,
                category: "Textures",
                image: "/images/digital-brand/paper_textures_pack_1769553577086.png"
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

              // --- MOCKUPS ---
              {
                id: "15",
                name: "iPhone 15 Clay Mockup",
                slug: "iphone-15-mockup",
                price: 16,
                category: "Mockups",
                image: "/images/digital-brand/iphone_15_mockup_1769553604476.png"
              },
              {
                id: "16",
                name: "Canvas Tote Bag Mockup",
                slug: "tote-bag-mockup",
                price: 14,
                category: "Mockups",
                image: "/images/digital-brand/tote_bag_mockup_1769553632177.png"
              },
              {
                id: "17",
                name: "Editorial Magazine Mockup",
                slug: "magazine-spread-mockup",
                price: 18,
                category: "Mockups",
                image: "/images/digital-brand/magazine_spread_mockup_1769553645603.png"
              },
              {
                id: "18",
                name: "Kraft Box Packaging",
                slug: "packaging-box-mockup",
                price: 15,
                category: "Mockups",
                image: "/images/digital-brand/packaging_box_mockup_1769553659621.png"
              },

              // --- 3D ASSETS ---
              {
                id: "5",
                name: "Abstract 3D Shapes",
                slug: "abstract-3d-shapes",
                price: 35,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_shapes_main.png"
              },
              {
                id: "6",
                name: "Glossy 3D Icons",
                slug: "glossy-3d-icons",
                price: 24,
                category: "3D Assets",
                image: "/images/digital-brand/glossy_3d_icons_main.png"
              },
              {
                id: "19",
                name: "Glass Morphism Icons",
                slug: "glass-morphism-icons",
                price: 22,
                category: "3D Assets",
                image: "/images/digital-brand/glass_morphism_icons_1769553676603.png",
                badge: "Trendy"
              },
              {
                id: "20",
                name: "Abstract 3D Fluids",
                slug: "abstract-3d-fluids",
                price: 30,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_fluids_1769553689227.png"
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
