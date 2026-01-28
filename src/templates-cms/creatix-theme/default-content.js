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
              { label: "E-commerce", href: "/category/ecommerce" },
              { label: "UI Kits", href: "/category/ui-kits" },
              { label: "Landing Pages", href: "/category/landing" },
              { label: "Design Systems", href: "/category/design-systems" }
            ],
            cta: "Login"
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
            title: "Browse by Category",
            items: [
              { id: "ecommerce", name: "E-commerce", icon: "ShoppingCart", description: "Storefronts & Checkouts" },
              { id: "ui-kits", name: "UI Kits", icon: "Layout", description: "Components & Systems" },
              { id: "landing", name: "Landing Pages", icon: "Monitor", description: "High-converting layouts" },
              { id: "design-systems", name: "Design Systems", icon: "Grid", description: "Scalable UI foundations" }
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
                id: "c1",
                name: "Creatix Pro UI Kit",
                slug: "creatix-pro-ui-kit",
                price: 59,
                category: "UI Kits",
                image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
                badge: "Popular"
              },
              {
                id: "c2",
                name: "E-commerce React Starter",
                slug: "ecommerce-react-starter",
                price: 89,
                category: "E-commerce",
                image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
                badge: "Best Seller"
              },
              {
                id: "c3",
                name: "Elite Landing Page",
                slug: "elite-landing-page",
                price: 39,
                category: "Landing Pages",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: "c4",
                name: "Brand Master System",
                slug: "brand-master-system",
                price: 129,
                category: "Design Systems",
                image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
                badge: "New"
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
