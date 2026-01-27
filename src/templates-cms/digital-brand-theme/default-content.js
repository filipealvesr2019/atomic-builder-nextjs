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
            secondaryCTA: "View Bundles",
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
              {
                id: "1",
                name: "Chronos Display Font",
                slug: "chronos-display-font",
                price: 29,
                category: "Fonts",
                image: "/images/digital-brand/chronos.png",
                images: [
                  "/images/digital-brand/chronos.png",
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=1000"
                ],
                badge: "Trending",
                description: "A luxurious serif typeface designed for high-end branding and editorial design.",
                features: ["Uppercase & Lowercase", "Alternates & Ligatures", "Multilingual Support", "Web Font Included"]
              },
              {
                id: "2",
                name: "Abstract Gradient Pack",
                slug: "abstract-gradient-pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png",
                images: [
                  "/images/digital-brand/gradient.png",
                  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&q=80&w=1000"
                ],
                description: "A collection of 20 high-resolution vibrant gradient textures for modern backgrounds.",
                features: ["20 PNG Files", "4000x4000px Resolution", "Noise & Grain Options", "Print Ready"]
              },
              {
                id: "3",
                name: "Minimalist Brand Kit",
                slug: "minimalist-brand-kit",
                price: 45,
                category: "Templates",
                image: "/images/digital-brand/brandkit.png",
                images: [
                  "/images/digital-brand/brandkit.png",
                  "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
                ],
                description: "Complete visual identity system for professional brands and startups.",
                features: ["Logo Templates", "Business Cards", "Social Media Kits", "Vector Files Included"]
              },
              {
                id: "4",
                name: "Film Grain Overlays",
                slug: "film-grain-overlays",
                price: 15,
                category: "Effects",
                image: "/images/digital-brand/filmgrain.png",
                images: [
                  "/images/digital-brand/filmgrain.png",
                  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1519750783826-e2420f4d687c?auto=format&fit=crop&q=80&w=1000",
                  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000"
                ],
                description: "Authentic cinematic film grain overlays to add character to your photos and videos.",
                features: ["10 Unique Overlays", "4K Resolution", "Screen Blend Mode Ready", "Works in any software"]
              },
              {
                id: "5",
                name: "Abstract 3D Shapes",
                slug: "abstract-3d-shapes",
                price: 35,
                category: "3D Assets",
                image: "/images/digital-brand/abstract_3d_shapes_main.png",
                images: [
                  "/images/digital-brand/abstract_3d_shapes_main.png",
                  "/images/digital-brand/abstract_3d_shapes_detail_1.png",
                  "/images/digital-brand/abstract_3d_shapes_main.png",
                  "/images/digital-brand/abstract_3d_shapes_detail_1.png"
                ],
                description: "A premium collection of high-resolution abstract 3D geometric shapes with soft pastel lightning.",
                features: ["20 PNG Renders", "4000x4000px Resolution", "Transparent Backgrounds", "Perfect for Landing Pages"]
              },
              {
                id: "6",
                name: "Glossy 3D Icons",
                slug: "glossy-3d-icons",
                price: 24,
                category: "3D Assets",
                image: "/images/digital-brand/glossy_3d_icons_main.png",
                images: [
                  "/images/digital-brand/glossy_3d_icons_main.png",
                  "/images/digital-brand/abstract_3d_shapes_main.png",
                  "/images/digital-brand/glossy_3d_icons_main.png"
                ],
                description: "Modern, glossy 3D icons with vibrant gradients. Perfect for apps and SaaS landing pages.",
                features: ["50+ Icons", "Consistent Lighting", "Multiple Angles", "Figma & PNG"]
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
