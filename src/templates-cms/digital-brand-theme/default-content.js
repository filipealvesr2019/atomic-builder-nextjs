export const digitalBrandDefaultContent = {
  templateId: 'digital-brand-theme',
  pages: [
    {
      slug: 'home',
      name: 'Home',
      content: [
        {
          id: 'brand-header',
          type: 'header',
          props: {
            logo: {
              text: "RELEVATES",
              image: ""
            },
            menu: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Fonts", href: "/category/fonts" },
              { label: "Graphics", href: "/category/graphics" },
              { label: "Textures", href: "/category/textures" },
              { label: "Mockups", href: "/category/mockups" },
              { label: "3D Assets", href: "/category/3d-assets" }
            ],
            buttons: {
              login: "Login",
              buy: "All Access Pass"
            }
          }
        },
        {
          id: 'brand-hero',
          type: 'hero',
          props: {
            badge: "New Collection: Abstract 3D",
            headline: "Elevate your visuals with premium digital assets",
            subheadline: "Curated fonts, textures, and graphic kits designed for modern creators and brands.",
            primaryCTA: "Browse Collection",
            // secondaryCTA: "View Bundles",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2400"
          }
        },
        {
          id: 'brand-categories',
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
          id: 'brand-featured',
          type: 'featured',
          props: {
            title: "New Releases",
            subtitle: "Fresh assets for your next project",
            products: [
              // --- FONTS ---
              {
                id: "1",
                name: "Chronos Display Font",
                slug: "chronos-display-font",
                price: 29,
                category: "Fonts",
                image: "/images/digital-brand/chronos.png",
                images: ["/images/digital-brand/chronos.png"],
                badge: "Trending",
                description: "A luxurious serif typeface designed for high-end branding and editorial design.",
                features: ["Uppercase & Lowercase", "Alternates & Ligatures", "Multilingual Support", "Web Font Included"]
              },
              {
                id: "7",
                name: "Helix Modern Sans",
                slug: "helix-modern-sans",
                price: 24,
                category: "Fonts",
                image: "/images/digital-brand/helix_modern_sans_font_1769553465607.png",
                images: ["/images/digital-brand/helix_modern_sans_font_1769553465607.png"],
                description: "A minimalist geometric sans-serif font inspired by Swiss design principles.",
                features: ["7 Weights", "Clean Geometry", "Variable Font File", "App Ready"]
              },
              {
                id: "8",
                name: "Vintura Script",
                slug: "vintura-script",
                price: 22,
                category: "Fonts",
                image: "/images/digital-brand/vintura_script_font_1769553479318.png",
                images: ["/images/digital-brand/vintura_script_font_1769553479318.png"],
                description: "An elegant vintage script font perfect for luxury logos and wedding invitations.",
                features: ["Opentype Features", "Gold Texture Action", "Swashes", "Vintage Feel"]
              },
              {
                id: "9",
                name: "Techno Mono",
                slug: "techno-mono",
                price: 26,
                category: "Fonts",
                image: "/images/digital-brand/techno_mono_font_1769553493767.png",
                images: ["/images/digital-brand/techno_mono_font_1769553493767.png"],
                badge: "New",
                description: "A futuristic monospace font designed for coding, sci-fi themes, and tech branding.",
                features: ["Coding Ligatures", "Cyberpunk Style", "3 Weights", "Terminal Ready"]
              },

              // --- GRAPHICS ---
              {
                id: "3",
                name: "Minimalist Brand Kit",
                slug: "minimalist-brand-kit",
                price: 45,
                category: "Graphics", // Reclassified
                image: "/images/digital-brand/brandkit.png",
                images: ["/images/digital-brand/brandkit.png"],
                description: "Complete visual identity system for professional brands and startups.",
                features: ["Logo Templates", "Business Cards", "Social Media Kits", "Vector Files Included"]
              },
              {
                id: "10",
                name: "Botanical Illustrations",
                slug: "botanical-illustrations",
                price: 19,
                category: "Graphics",
                image: "/images/digital-brand/botanical_illustrations_1769553519865.png",
                images: ["/images/digital-brand/botanical_illustrations_1769553519865.png"],
                description: "Fine line art vector leaves and flowers for minimal organic branding.",
                features: ["50+ Vector Elements", "AI & EPS Files", "Scalable", "Clean Lines"]
              },
              {
                id: "11",
                name: "Bauhaus Geometric Pack",
                slug: "bauhaus-geometric",
                price: 25,
                category: "Graphics",
                image: "/images/digital-brand/bauhaus_geometric_shapes_1769553533343.png",
                images: ["/images/digital-brand/bauhaus_geometric_shapes_1769553533343.png"],
                description: "Abstract geometric shapes and compositions inspired by the Bauhaus movement.",
                features: ["Primary Colors", "Vintage Modern Aesthetic", "Poster Templates", "Vector Shapes"]
              },
              {
                id: "12",
                name: "Street Art Vectors",
                slug: "street-art-vectors",
                price: 28,
                category: "Graphics",
                image: "/images/digital-brand/street_art_vectors_1769553550292.png",
                images: ["/images/digital-brand/street_art_vectors_1769553550292.png"],
                badge: "Popular",
                description: "Gritty graffiti tags, drip effects, and urban sticker elements.",
                features: ["Spray Paint Textures", "Grunge Vectors", "High Energy", "Transparent PNG"]
              },

              // --- TEXTURES ---
              {
                id: "2",
                name: "Abstract Gradient Pack",
                slug: "abstract-gradient-pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png",
                images: ["/images/digital-brand/gradient.png"],
                description: "A collection of 20 high-resolution vibrant gradient textures for modern backgrounds.",
                features: ["20 PNG Files", "4000x4000px Resolution", "Noise & Grain Options", "Print Ready"]
              },
              {
                id: "4",
                name: "Film Grain Overlays",
                slug: "film-grain-overlays",
                price: 15,
                category: "Textures", // Reclassified
                image: "/images/digital-brand/filmgrain.png",
                images: ["/images/digital-brand/filmgrain.png"],
                description: "Authentic cinematic film grain overlays to add character to your photos and videos.",
                features: ["10 Unique Overlays", "4K Resolution", "Screen Blend Mode Ready", "Works in any software"]
              },
              {
                id: "13",
                name: "Paper Textures Pack",
                slug: "paper-textures-pack",
                price: 14,
                category: "Textures",
                image: "/images/digital-brand/paper_textures_pack_1769553577086.png",
                images: ["/images/digital-brand/paper_textures_pack_1769553577086.png"],
                description: "High-resolution scanned paper textures including wrinkled, folded, and kraft paper.",
                features: ["300 DPI Scans", "Realistic Detail", "Overlay Ready", "Various Paper Types"]
              },
              {
                id: "14",
                name: "Liquid Marble Textures",
                slug: "liquid-marble-textures",
                price: 20,
                category: "Textures",
                image: "/images/digital-brand/liquid_marble_textures_1769553591166.png",
                images: ["/images/digital-brand/liquid_marble_textures_1769553591166.png"],
                badge: "Colorful",
                description: "Psychedelic holographic liquid textures resembling swirling oil paint.",
                features: ["Iridescent Colors", "Abstract Flow", "High Res Backgrounds", "Trippy Aesthetics"]
              },

              // --- MOCKUPS ---
              {
                id: "15",
                name: "iPhone 15 Clay Mockup",
                slug: "iphone-15-mockup",
                price: 16,
                category: "Mockups",
                image: "/images/digital-brand/iphone_15_mockup_1769553604476.png",
                images: ["/images/digital-brand/iphone_15_mockup_1769553604476.png"],
                description: "Minimalist clay iPhone 15 mockup for clean app interface presentations.",
                features: ["Matte Finish", "Editable Screen", "4K Resolution", "Isolated Object"]
              },
              {
                id: "16",
                name: "Canvas Tote Bag Mockup",
                slug: "tote-bag-mockup",
                price: 14,
                category: "Mockups",
                image: "/images/digital-brand/tote_bag_mockup_1769553632177.png",
                images: ["/images/digital-brand/tote_bag_mockup_1769553632177.png"],
                description: "Realistic canvas tote bag hanging on a wall for eco-friendly branding.",
                features: ["Natural Texture", "Smart Object Layer", "Shadow Control", "Neutral Background"]
              },
              {
                id: "17",
                name: "Editorial Magazine Mockup",
                slug: "magazine-spread-mockup",
                price: 18,
                category: "Mockups",
                image: "/images/digital-brand/magazine_spread_mockup_1769553645603.png",
                images: ["/images/digital-brand/magazine_spread_mockup_1769553645603.png"],
                description: "Top-view open magazine spread for high-fashion and editorial print design.",
                features: ["Realistic Paper Curve", "Smart Objects", "Soft Shadows", "High Detail"]
              },
              {
                id: "18",
                name: "Kraft Box Packaging",
                slug: "packaging-box-mockup",
                price: 15,
                category: "Mockups",
                image: "/images/digital-brand/packaging_box_mockup_1769553659621.png",
                images: ["/images/digital-brand/packaging_box_mockup_1769553659621.png"],
                description: "Isometric square cardboard box mockup perfectly suited for retail packaging.",
                features: ["Kraft Texture", "Sharp Details", "Customizable Sides", "Studio Lighting"]
              },

              // --- 3D ASSETS ---
              {
                id: "5",
                name: "Abstract 3D Shapes",
                slug: "abstract-3d-shapes",
                price: 35,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_shapes_main.png",
                images: ["/images/digital-brand/abstract_3d_shapes_main.png"],
                description: "A premium collection of high-resolution abstract 3D geometric shapes.",
                features: ["20 PNG Renders", "4000x4000px", "Transparent Backgrounds", "Pastel Lighting"]
              },
              {
                id: "6",
                name: "Glossy 3D Icons",
                slug: "glossy-3d-icons",
                price: 24,
                category: "3D Assets",
                image: "/images/digital-brand/glossy_3d_icons_main.png",
                images: ["/images/digital-brand/glossy_3d_icons_main.png"],
                description: "Modern, glossy 3D icons with vibrant gradients. Perfect for apps.",
                features: ["50+ Icons", "Consistent Lighting", "Multiple Angles", "Figma & PNG"]
              },
              {
                id: "19",
                name: "Glass Morphism Icons",
                slug: "glass-morphism-icons",
                price: 22,
                category: "3D Assets",
                image: "/images/digital-brand/glass_morphism_icons_1769553676603.png",
                images: ["/images/digital-brand/glass_morphism_icons_1769553676603.png"],
                badge: "Trendy",
                description: "Frosted glass UI elements with soft blur effects and translucent layers.",
                features: ["Glass Texture", "Soft Blur", "Modern UI", "PNG Renders"]
              },
              {
                id: "20",
                name: "Abstract 3D Fluids",
                slug: "abstract-3d-fluids",
                price: 30,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_fluids_1769553689227.png",
                images: ["/images/digital-brand/abstract_3d_fluids_1769553689227.png"],
                description: "Surreal chrome liquid metal shapes with iridescent reflections.",
                features: ["Liquid Metal", "Chrome Finish", "High Res", "Wallpaper Ready"]
              }
            ]
          }
        },
        {
          id: 'brand-benefits',
          type: 'benefits',
          props: {
            title: "Why Relevates?",
            items: [
              {
                title: "Commercial License",
                description: "Use our assets in unlimited personal and commercial projects.",
                icon: "ShieldCheck"
              },
              {
                title: "High Resolution",
                description: "Crystal clear assets optimized for print and high-DPI screens.",
                icon: "Maximize"
              },
              {
                title: "Curated Quality",
                description: "Every item is hand-picked to ensure premium design standards.",
                icon: "Star"
              },
              {
                title: "Free Updates",
                description: "Get access to future additions and improvements at no extra cost.",
                icon: "RefreshCcw"
              }
            ]
          }
        },
        {
          id: 'brand-footer',
          type: 'footer',
          props: {
            brandName: "RELEVATES",
            description: "Premium digital resources for makers, designers, and visionaries.",
            links: [
              {
                title: "Categories",
                items: [
                  { label: "Fonts", href: "/category/fonts" },
                  { label: "Graphics", href: "/category/graphics" },
                  { label: "Textures", href: "/category/textures" },
                  { label: "Mockups", href: "/category/mockups" }
                ]
              },
              {
                title: "Support",
                items: [
                  { label: "License", href: "/license" },
                  { label: "FAQ", href: "/faq" },
                  { label: "Contact", href: "/contact" }
                ]
              }
            ],
            social: ["Instagram", "Pinterest", "Behance", "Twitter"]
          }
        }
      ]
    }
  ]
};
