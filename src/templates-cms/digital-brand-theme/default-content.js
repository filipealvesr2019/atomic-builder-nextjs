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
              text: "DIGITAL BRAND",
              image: ""
            },
            menu: [
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" }
            ],
            buttons: {
              login: "Login",
              buy: "Buy Now"
            }
          }
        },
        {
          id: 'brand-hero',
          type: 'hero',
          props: {
            badge: "New: Next.js Templates",
            headline: "Elevate your project with our premium digital assets",
            subheadline: "Templates, courses, and exclusive tools created to speed up your workflow and take your brand to the next level.",
            primaryCTA: "View products",
            secondaryCTA: "Explore categories",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
          }
        },
        {
          id: 'brand-categories',
          type: 'categories',
          props: {
            title: "Browse by Category",
            items: [
              { id: "templates", name: "Templates", icon: "Layout", description: "Ready-to-use designs" },
              { id: "courses", name: "Courses", icon: "BookOpen", description: "Learn new skills" },
              { id: "ebooks", name: "E-books", icon: "FileText", description: "Knowledge in your hands" },
              { id: "tools", name: "Tools", icon: "Tool", description: "Scripts and utilities" }
            ]
          }
        },
        {
          id: 'brand-featured',
          type: 'featured',
          props: {
            title: "Featured Products",
            subtitle: "Check out our most popular solutions",
            products: [
              {
                id: "1",
                name: "Next.js SaaS Starter",
                price: 199,
                category: "Templates",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
                badge: "Best Seller"
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
                category: "Courses",
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
          }
        },
        {
          id: 'brand-benefits',
          type: 'benefits',
          props: {
            title: "Why choose our brand?",
            items: [
              {
                title: "Immediate Download",
                description: "Get instant access to your files right after payment confirmation.",
                icon: "Zap"
              },
              {
                title: "100% Digital Content",
                description: "Products optimized for immediate consumption, no waiting for shipping.",
                icon: "Download"
              },
              {
                title: "Direct Support",
                description: "Talk directly to the creators to solve any questions or difficulties.",
                icon: "Headphones"
              },
              {
                title: "Updates Included",
                description: "Keep your products always up to date with the latest versions and improvements.",
                icon: "RefreshCw"
              }
            ]
          }
        },
        {
          id: 'brand-footer',
          type: 'footer',
          props: {
            brandName: "DIGITAL BRAND",
            description: "Your premium source of digital assets for modern development.",
            links: [
              {
                title: "Company",
                items: [
                  { label: "About", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" }
                ]
              },
              {
                title: "Support",
                items: [
                  { label: "Help Center", href: "/help" },
                  { label: "Terms", href: "/terms" },
                  { label: "Privacy", href: "/privacy" }
                ]
              }
            ],
            social: ["Twitter", "Instagram", "GitHub", "LinkedIn"]
          }
        }
      ]
    }
  ]
};
