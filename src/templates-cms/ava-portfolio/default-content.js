
export const avaDefaultContent = {
  templateId: 'ava-portfolio',
  pages: [
    {
      slug: 'home',
      name: 'Home',
      content: [
        {
          id: 'ava-header',
          type: 'header',
          props: {
            logoText: "Ava",
            links: [
                { label: "ABOUT", href: "#about" },
                { label: "WORKSHOPS", href: "/admin/store/preview/ava-portfolio/workshops" },
                { label: "SERVICES", href: "#services" },
                { label: "CONTACT", href: "#contact" },
                { label: "THE BLOG", href: "#blog" }
            ],
            socialLinks: [
                { icon: "instagram", href: "#" },
                { icon: "pinterest", href: "#" },
                { icon: "vimeo", href: "#" }
            ]
          }
        },
        {
          id: 'ava-hero',
          type: 'hero',
          props: {
             backgroundImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
          }
        },
        {
          id: 'ava-intro',
          type: 'introduction',
          props: {
             heading: "Forever Cherish The Most Important Moments in Your Life",
             subheading: "INTRODUCING THE BRANDING",
             buttonText: "Learn More"
          }
        },
        {
            id: 'ava-collage',
            type: 'collage',
            props: {
                images: [
                     "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
                ],
                title: "Every Part of Your Love Story",
                description: "Capturing life's most precious moments with elegance and grace. We believe in the power of storytelling through imagery.",
                buttonText: "Sound interesting?"
            }
        },
        {
            id: 'ava-services',
            type: 'services',
            props: {
                services: [
                    {
                        number: "01",
                        title: "Wedding Photography",
                        description: "Capturing the magic of your special day with a timeless and artistic approach."
                    },
                    {
                        number: "02",
                        title: "Portrait Sessions",
                        description: "Creating beautiful and authentic portraits that reveal your true personality."
                    },
                    {
                        number: "03",
                        title: "Lifestyle Shoots",
                        description: "Documenting real-life moments in a natural and candid style."
                    }
                ]
            }
        },
        {
            id: 'ava-about-intro',
            type: 'about-intro',
            props: {
                title: "It's Nice to Meet You, I'm",
                name: "Ave Rose!",
                description: "Capturing life's perfect moments with grace and style. I turn your memories into timeless art that you will cherish forever.",
                buttonText: "Read My Story",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
            }
        },
        {
            id: 'ava-testimonials',
            type: 'testimonials',
            props: {
                heading: "Showing the Love",
                quote: "Capturing the perfect photo is an art. Ava and her team are true artists.",
                author: "Sarah Johnson",
                role: "Happy Client",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=264&auto=format&fit=crop"
            }
        },
        {
            id: 'ava-blog-grid',
            type: 'blog-grid',
            props: {
                title: "From the Journal",
                posts: [
                    {
                        title: "Big Day Title One",
                        category: "Wedding",
                        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                    },
                    {
                        title: "Big Day Title Two",
                        category: "Elopement",
                        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
                    },
                    {
                        title: "Big Day Title Three",
                        category: "Engagement",
                        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"
                    }
                ]
            }
        },
        {
            id: 'ava-footer',
            type: 'footer',
            props: {
                instagramImages: [
                     "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1600&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
                ],
                copyright: "© 2024 Ava Portfolio. All rights reserved."
            }
        }
      ]
    },
    {
      slug: 'workshops',
      name: 'Workshops',
      layout: 'workshops',
      content: [
        {
          id: 'ava-header-work',
          type: 'header',
          props: {
            logoText: "Ava",
            links: [
                { label: "ABOUT", href: "/admin/store/preview/ava-portfolio/home#about" },
                { label: "WORKSHOPS", href: "/admin/store/preview/ava-portfolio/workshops" },
                { label: "SERVICES", href: "/admin/store/preview/ava-portfolio/home#services" },
                { label: "CONTACT", href: "/admin/store/preview/ava-portfolio/home#contact" },
                { label: "THE BLOG", href: "/admin/store/preview/ava-portfolio/home#blog" }
            ],
            socialLinks: [
                { icon: "instagram", href: "#" },
                { icon: "pinterest", href: "#" },
                { icon: "vimeo", href: "#" }
            ]
          }
        },
        {
          id: 'work-hero',
          type: 'workshop-hero',
          props: {
            title: "Elevate Your Narrative",
            subtitle: "MASTERCLASS BY AVA ROSE",
            description: "Go beyond the basics. Learn how to harness natural light, master artistic composition, and discover your unique voice in the world of high-end wedding photography.",
            buttonText: "RESERVE YOUR SEAT",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
          }
        },
        {
          id: 'work-statement',
          type: 'workshop-statement',
          props: {
            text: "Capturing the raw, unscripted moments that define a lifetime of love and legacy."
          }
        },
        {
          id: 'work-features',
          type: 'workshop-features',
          props: {
            features: [
              "Harnessing Golden Hour",
              "Intentional Storytelling",
              "Editorial Post-Processing"
            ]
          }
        },
        {
          id: 'work-steps',
          type: 'workshop-steps',
          props: {
            title: "THE CURRICULUM",
            steps: [
              {
                number: "01",
                title: "Vision & Style",
                description: "Deep dive into developing a signature aesthetic that attracts your dream clientele."
              },
              {
                number: "02",
                title: "Hands-on Shooting",
                description: "Live editorial session with a professional couple, focusing on posing and light direction."
              },
              {
                number: "03",
                title: "The Edit",
                description: "Comprehensive workflow session using Lightroom and Photoshop to achieve a timeless look."
              }
            ]
          }
        },
        {
            id: 'work-about',
            type: 'workshop-about',
            props: {
                title: "Crafting Timeless Art From Real Life",
                description: "With over a decade spent documenting love stories across the globe, I've realized that the most powerful images are found in the quiet, in-between moments. My mission is to teach you how to see the beauty in the mundane and the extraordinary in the simple.",
                buttonText: "LEARN THE PHILOSOPHY",
                imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
            }
        },
        {
            id: 'work-pricing',
            type: 'workshop-pricing',
            props: {
                title: "SELECT YOUR EXPERIENCE",
                plans: [
                    {
                        name: "The Essentialist",
                        price: "$450",
                        features: [
                            "Full Day Intensive",
                            "Posing & Lighting Guide",
                            "Live Group Shooting",
                            "Artisan Lunch"
                        ],
                        buttonText: "SELECT ESSENTIALIST"
                    },
                    {
                        name: "The Visionary",
                        price: "$850",
                        features: [
                            "2-Day Immersive",
                            "1-on-1 Portfolio Critique",
                            "Workflow Masterclass",
                            "Sunset Editorial Session",
                            "Personal Brand Strategy"
                        ],
                        buttonText: "SELECT VISIONARY",
                        highlighted: true
                    }
                ]
            }
        },
        {
            id: 'work-cta',
            type: 'workshop-final-cta',
            props: {
                title: "Your Journey to Mastery Starts Here",
                description: "Our Spring 2025 cohort is almost full. Join a community of dedicated artists and transform your creative process in an intimate, 2-day immersive experience.",
                buttonText: "APPLY FOR THE MASTERCLASS",
                imageUrl: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
          id: 'ava-footer-work',
          type: 'footer',
          props: {
              instagramImages: [
                   "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1600&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
              ],
              copyright: "© 2024 Ava Portfolio. All rights reserved."
          }
        }
      ]
    }
  ]
};
