
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
                { label: "WORKSHOPS", href: "#workshops" },
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
                        image: "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2070&auto=format&fit=crop"
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
                     "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=1000&auto=format&fit=crop",
                     "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
                ],
                copyright: "© 2024 Ava Portfolio. All rights reserved."
            }
        }
      ]
    }
  ]
};
