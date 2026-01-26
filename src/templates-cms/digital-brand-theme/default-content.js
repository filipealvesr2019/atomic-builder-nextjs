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
              { label: "Mockups", href: "/category/mockups" }
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
              { id: "mockups", name: "Mockups", icon: "Box", description: "High-res Presentations" }
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
                price: 29,
                category: "Fonts",
                image: "/images/digital-brand/chronos.png",
                badge: "Trending"
              },
              {
                id: "2",
                name: "Abstract Gradient Pack",
                price: 18,
                category: "Textures",
                image: "/images/digital-brand/gradient.png"
              },
              {
                id: "3",
                name: "Minimalist Brand Kit",
                price: 45,
                category: "Templates",
                image: "/images/digital-brand/brandkit.png"
              },
              {
                id: "4",
                name: "Film Grain Overlays",
                price: 15,
                category: "Effects",
                image: "/images/digital-brand/filmgrain.png"
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
