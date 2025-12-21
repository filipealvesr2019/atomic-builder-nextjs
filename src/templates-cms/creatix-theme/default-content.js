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
              { label: "Categories", href: "#categories" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" }
            ],
            cta: "Shop now"
          }
        },
        {
          id: 'creatix-hero',
          type: 'hero',
          props: {
            headline: "Digital design assets that convert",
            subheadline: "High-quality templates, UI kits and digital resources crafted to elevate your e-commerce and brand presence.",
            primaryCTA: "Explore products",
            secondaryCTA: "Browse categories",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000"
          }
        },
        {
          id: 'creatix-categories',
          type: 'categories',
          props: {
            title: "Premium Categories",
            items: [
              { id: "ecommerce-templates", name: "E-commerce Templates", icon: "Layout", description: "Conversion-optimized store designs", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800" },
              { id: "ui-kits", name: "UI Kits", icon: "Component", description: "Comprehensive interface systems", image: "https://images.unsplash.com/photo-1581291518062-c13f277ca1bf?auto=format&fit=crop&q=80&w=800" },
              { id: "landing-pages", name: "Landing Pages", icon: "CreditCard", description: "High-impact sales pages", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
              { id: "design-systems", name: "Design Systems", icon: "Layers", description: "Scalable brand frameworks", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800" },
              { id: "presets", name: "Presets", icon: "Sliders", description: "Professional visual assets", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800" },
              { id: "graphic-assets", name: "Graphic Assets", icon: "Image", description: "High-quality raw elements", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
              { id: "frontend-code", name: "Front-end Code", icon: "Code", description: "Clean, production-ready code", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" }
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
                name: "Creatix Pro UI Kit",
                price: 129,
                category: "UI Kits",
                image: "https://images.unsplash.com/photo-1581291518062-c13f277ca1bf?auto=format&fit=crop&q=80&w=1000",
                badge: "Hot Bundle"
              },
              {
                id: "2",
                name: "E-commerce React Starter",
                price: 89,
                category: "Front-end Code",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
              },
              {
                id: "3",
                name: "Elite Landing Page",
                price: 49,
                category: "Landing Pages",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
              },
              {
                id: "4",
                name: "Brand Master System",
                price: 199,
                category: "Design Systems",
                image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1000",
                badge: "Popular"
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
