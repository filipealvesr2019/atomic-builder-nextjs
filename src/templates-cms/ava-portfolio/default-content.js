
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
                { label: "SERVICES", href: "/admin/store/preview/ava-portfolio/services" },
                { label: "PORTFOLIO", href: "/admin/store/preview/ava-portfolio/portfolio" },
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
                name: "Ava Rose!",
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
                { label: "SERVICES", href: "/admin/store/preview/ava-portfolio/services" },
                { label: "PORTFOLIO", href: "/admin/store/preview/ava-portfolio/portfolio" },
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
            id: 'work-value-prop',
            type: 'workshop-value-prop',
            props: {
                title: "You're Ready to Transform your Business from a Part-Time Hobby to the Real Deal",
                bridgeStatement: "I'VE WORKED WITH HUNDREDS OF PHOTOGRAPHERS WHO ARE LOOKING FOR THAT EXTRA PUSH WHEN IT COMES TO GROWING A BUSINESS",
                items: [
                    { text: "You want to learn how to find and book more high-quality clients" },
                    { text: "You want to confidently charge higher rates for services" },
                    { text: "You want help with invoicing, accounting, and marketing." }
                ]
            }
        },
        {
          id: 'work-steps',
          type: 'workshop-steps',
          props: {
            title: "What You Can Expect",
            steps: [
              {
                number: "01",
                title: "VISION & STYLE",
                description: "Master the art of visual storytelling and develop a unique style that resonates with your ideal clients."
              },
              {
                number: "02",
                title: "HANDS-ON SHOOTING",
                description: "Step behind the lens in a guided editorial session, perfecting your posing and lighting techniques."
              },
              {
                number: "03",
                title: "THE EDIT",
                description: "Learn a refined post-production workflow to create consistent, high-end galleries that stand out."
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
            id: 'work-topics',
            type: 'workshop-grid-topics',
            props: {
                topics: [
                    { title: "LIGHTING", description: "Mastering the golden hour and working with challenging overcast conditions." },
                    { title: "COMPOSITION", description: "Finding the perfect angle and framing to pull the viewer into the story." },
                    { title: "DIRECTION", description: "How to guide couples naturally to capture raw, authentic connection." },
                    { title: "WORKFLOW", description: "From backup strategies to the final gallery delivery, streamlined for success." }
                ]
            }
        },
        {
            id: 'work-overlap',
            type: 'workshop-image-overlap',
            props: {
                backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
                title: "Inspiration Everywhere",
                description: "We believe that photography is a way of life, not just a job. This workshop is designed to reignite your passion and perspective."
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
            id: 'work-info',
            type: 'workshop-info-row',
            props: {
                items: [
                    {
                        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
                        title: "Artistic Vision",
                        description: "Deepen your creative well and find your unique visual language."
                    },
                    {
                        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
                        title: "Technical Mastery",
                        description: "Master the subtle nuances of camera settings and light control."
                    },
                    {
                        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
                        title: "Client Experience",
                        description: "Create an unforgettable journey for the couples who trust you."
                    }
                ]
            }
        },
        {
            id: 'work-faq',
            type: 'workshop-accordion',
            props: {
                title: "FREQUENTLY ASKED QUESTIONS",
                items: [
                    { question: "Do I need a professional camera?", answer: "Yes, a DSLR or mirrorless camera with full manual control is required for the workshop." },
                    { question: "Is lunch included?", answer: "Absolutely! We provide artisanal meals and refreshments for both days of the workshop." },
                    { question: "Will I get to shoot with models?", answer: "Yes, specifically arranged editorial sessions with professional models are included." }
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
                imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
            }
        },
        {
          id: 'ava-footer-work',
          type: 'footer',
          props: {
              instagramImages: [
                   "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
                   "https://images.unsplash.com/photo-1519225468759-61a3346c1a90?q=80&w=1600&auto=format&fit=crop",
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
      slug: 'services',
      name: 'Services',
      layout: 'services',
      content: [
        {
          id: 'ava-header-serv',
          type: 'header',
          props: {
            logoText: "Ava",
            links: [
                { label: "ABOUT", href: "/admin/store/preview/ava-portfolio/home#about" },
                { label: "WORKSHOPS", href: "/admin/store/preview/ava-portfolio/workshops" },
                { label: "SERVICES", href: "/admin/store/preview/ava-portfolio/services" },
                { label: "PORTFOLIO", href: "/admin/store/preview/ava-portfolio/portfolio" },
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
            id: 'serv-triple-hero',
            type: 'services-triple-hero',
            props: {
                images: [
                    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
                ]
            }
        },
        {
            id: 'serv-intro',
            type: 'services-intro-ref',
            props: {
                title: "Artfully Capturing the Most Important Moments of your Story",
                description: "We believe that your love story deserves to be told with elegance and authenticity. Our approach is focused on capturing the genuine emotions and beautiful details that make your day unique.",
                buttonText: "BOOK NOW"
            }
        },
        {
            id: 'serv-process',
            type: 'services-process',
            props: {
                title: "What to Expect When we Work Together",
                text1: "Your wedding day is one of the most significant moments in your life. Our goal is to provide an experience that is as seamless as it is memorable, ensuring every detail is captured with care.",
                text2: "From our initial consultation to the final gallery delivery, we are here to support you and make sure your vision comes to life exactly as you imagined."
            }
        },
        {
            id: 'serv-grid-detailed',
            type: 'services-grid-detailed',
            props: {
                title: "Discover Our Packages",
                services: [
                    { 
                        number: "01", 
                        name: "THE WEDDING PACKAGE", 
                        description: "Full day coverage, two photographers, and a premium album to tell your story.",
                        price: "FROM $3,500"
                    },
                    { 
                        number: "02", 
                        name: "GETTING ENGAGED", 
                        description: "An intimate 2-hour session at a location of your choice with 50+ edited images.",
                        price: "FROM $650"
                    },
                    { 
                        number: "03", 
                        name: "THE ELOPEMENT", 
                        description: "4 hours of coverage for your intimate celebration, focusing on raw emotion.",
                        price: "FROM $1,800"
                    },
                    { 
                        number: "04", 
                        name: "LIFESTYLE SESSION", 
                        description: "Documenting your everyday magic in a natural and candid way at home.",
                        price: "FROM $500"
                    }
                ]
            }
        },
        {
            id: 'serv-wedding-pkg',
            type: 'services-overlap',
            props: {
                title: "The Wedding Package",
                subtitle: "TAKING BOOKINGS FOR 2025",
                description: "A comprehensive package designed to capture every moment of your big day. From the first look to the final dance, we'll be there to document it all, ensuring no detail goes unnoticed.",
                buttonText: "VIEW PORTFOLIO",
                imageLarge: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
                imageSmall: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
                mirrored: false
            }
        },
        {
            id: 'serv-banner',
            type: 'services-banner',
            props: {
                backgroundImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
                quote: "“The beauty of a moment is that it only happens once.”",
                author: "AVA ROSE | WEDDING PHOTOGRAPHER"
            }
        },
        {
            id: 'serv-engaged-pkg',
            type: 'services-overlap',
            props: {
                title: "Getting Engaged",
                subtitle: "LET'S CELEBRATE YOUR LOVE",
                description: "Capture the excitement and intimacy of your engagement with a session that truly reflects your connection. We'll find a location that means something to you and create memories you'll treasure.",
                buttonText: "LEARN MORE",
                imageLarge: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
                imageSmall: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
                mirrored: true
            }
        },
        {
            id: 'serv-faq',
            type: 'services-faq',
            props: {
                title: "Common Questions",
                questions: [
                    { 
                        q: "HOW DO WE BOOK OUR DATE?", 
                        a: "To secure your date, we require a signed agreement and a non-refundable retainer. Once both are received, your date is officially reserved in our calendar!" 
                    },
                    { 
                        q: "DO YOU TRAVEL FOR WEDDINGS?", 
                        a: "Absolutely! We love to travel and are available for destination weddings worldwide. Travel fees or specialized packages can be discussed during our consultation." 
                    },
                    { 
                        q: "WHEN WILL WE RECEIVE OUR PHOTOS?", 
                        a: "We provide a 'Sneak Peek' within 48 hours of your wedding. The full high-resolution gallery is typically delivered within 6 to 8 weeks." 
                    },
                    { 
                        q: "HOW MANY PHOTOS DO WE GET?", 
                        a: "For a full wedding day, you can expect between 500 and 800 fully edited images. For engagement sessions, the count is usually between 50 and 70 images." 
                    },
                    { 
                        q: "DO YOU PROVIDE RAW FILES?", 
                        a: "We do not provide RAW or unedited files. We believe that the editing process is a crucial part of our artistic vision and the final product you hired us to create." 
                    },
                    { 
                        q: "CAN WE PROVIDE A SHOT LIST?", 
                        a: "We certainly take requests for family groupings or specific sentimental details, but we prefer to document the day organically as it unfolds to capture true emotion." 
                    }
                ]
            }
        },
        {
            id: 'serv-featured',
            type: 'services-featured',
            props: {
                title: "Featured Galleries",
                subtitle: "VIEW PORTFOLIO",
                items: [
                    { title: "WEDDINGS", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
                    { title: "ENGAGEMENTS", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" },
                    { title: "ELOPEMENTS", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" }
                ]
            }
        },
        {
            id: 'ava-footer-serv',
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
      slug: 'portfolio',
      name: 'Portfolio',
      layout: 'portfolio',
      content: [
        {
          id: 'ava-header-port',
          type: 'header',
          props: {
            logoText: "Ava",
            links: [
                { label: "ABOUT", href: "/admin/store/preview/ava-portfolio/home#about" },
                { label: "WORKSHOPS", href: "/admin/store/preview/ava-portfolio/workshops" },
                { label: "SERVICES", href: "/admin/store/preview/ava-portfolio/services" },
                { label: "PORTFOLIO", href: "/admin/store/preview/ava-portfolio/portfolio" },
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
          id: 'port-grid',
          type: 'portfolio-grid',
          props: {
            title: "Selected Works",
            categories: ["WEDDINGS", "ELOPEMENTS", "DESTINATIONS", "LIFESTYLE"],
            images: [
              { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', category: 'WEDDINGS' },
              { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop', category: 'WEDDINGS' },
              { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop', category: 'ELOPEMENTS' },
              { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop', category: 'ELOPEMENTS' },
              { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop', category: 'DESTINATIONS' },
              { url: 'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1600&auto=format&fit=crop', category: 'LIFESTYLE' }
            ]
          }
        },
        {
          id: 'port-slider',
          type: 'portfolio-slider',
          props: {
            images: [
              { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop' }
            ]
          }
        },
        {
          id: 'port-masonry',
          type: 'portfolio-masonry',
          props: {
            images: [
              { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop' },
              { url: 'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1600&auto=format&fit=crop' }
            ]
          }
        },
        {
          id: 'ava-footer-port',
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
