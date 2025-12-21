export const emmaDefaultContent = {
  templateId: 'emma-portfolio',
  pages: [
    {
      slug: 'home',
      name: 'Home',
      content: [
        {
          id: 'emma-header',
          type: 'header',
          props: {
                links: [
                    { text: 'HOME', href: '/admin/store/preview/emma-portfolio' },
                    { text: 'SERVICES', href: '/admin/store/preview/emma-portfolio/services' },
                    { text: 'ABOUT', href: '/admin/store/preview/emma-portfolio/about' },
                    { text: 'BLOG', href: '/admin/store/preview/emma-portfolio/blog' },
                    { text: 'CONTACT', href: '/admin/store/preview/emma-portfolio/contact' }
                ],
            socialLinks: [
              { platform: 'instagram', url: '#' },
              { platform: 'pinterest', url: '#' },
              { platform: 'youtube', url: '#' }
            ]
          }
        },
        {
          id: 'emma-hero',
          type: 'hero',
          props: {
            title: 'Launch your business easily!',
            subtitle: 'Available now for 10$',
            text: 'Transform your passion into a profitable business with our comprehensive step-by-step coaching program designed for creative entrepreneurs.',
            buttonText: 'Book NOW',
            backgroundImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
            overlayImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80'
          }
        },
        {
          id: 'emma-intro',
          type: 'introduction',
          props: {
            title: 'Hello!',
            subtitle: 'Not only with coaching!',
            text: 'I am Emma, a business coach passionate about helping women build businesses they love. With over 10 years of experience, I provide the tools and strategies you need to succeed.',
            buttonText: 'READ MORE',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'
          }
        },
        {
          id: 'emma-services',
          type: 'services',
          props: {
            title: 'My services',
            subtitle: 'Unique coaching programs for creative entrepreneurs',
            services: [
              {
                title: 'My awesome Program',
                description: 'We help you launch your business in 5 easy steps.',
                buttonText: 'SEE MORE',
                image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80'
              },
              {
                title: 'Coaching 1:1',
                description: 'Get personal guidance to grow your business.',
                buttonText: 'READ MORE',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80'
              },
              {
                title: 'My guides to help you grow',
                description: 'Download our free guides to boost your sales.',
                buttonText: 'SEE GUIDES',
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80'
              }
            ]
          }
        },
        {
          id: 'emma-steps',
          type: 'steps-newsletter',
          props: {
            title: '5 easy steps to create your brand',
            subtitle: 'Get our free guide on how to build your business from scratch.',
            placeholder: 'Your email address...',
            buttonText: 'SUBSCRIBE',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'
          }
        },
        {
          id: 'emma-podcast',
          type: 'podcast',
          props: {
            title: 'The Podcast',
            subtitle: 'About EMMA',
            text: 'Join us every week as we discuss the latest trends in business, marketing and personal growth. Real stories, real advice.',
            buttonText: 'LISTEN NOW',
            image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80'
          }
        },
        {
          id: 'emma-testimonials',
          type: 'testimonials',
          props: {
            title: 'They loved it!',
            testimonials: [
              {
                text: 'The absolute best program I have ever taken! It changed my life completely.',
                author: 'Anna Smith',
                role: 'Designer'
              },
              {
                text: 'Emma is an amazing coach! She helped me verify my business idea.',
                author: 'John Doe',
                role: 'Entrepreneur'
              }
            ]
          }
        },
        {
          id: 'emma-posts',
          type: 'recent-posts',
          props: {
            title: 'Recent posts',
            subtitle: 'From the blog',
            posts: [
              {
                title: 'My Winter picks',
                excerpt: 'My favorite items for this winter season.',
                image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&q=80',
                link: '#'
              },
              {
                title: 'Spring podcast',
                excerpt: 'Listen to our new episode about spring trends.',
                image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80',
                link: '#'
              },
              {
                title: 'New podcast',
                excerpt: 'How to start your own podcast in 2024.',
                image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500&q=80',
                link: '#'
              }
            ]
          }
        },
        {
          id: 'emma-quote',
          type: 'quote',
          props: {
            text: '« If you want something done right, do it yourself. »'
          }
        },
        {
          id: 'emma-impact',
          type: 'impact',
          props: {
            title: 'Ready to impact?',
            text: 'Join our community of creative entrepreneurs and start your journey today.',
            buttonText: 'JOIN NOW',
            images: [
              'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80',
              'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
              'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80'
            ]
          }
        },
        {
          id: 'emma-exclusive',
          type: 'exclusive-content',
          props: {
            title: 'Exclusive content!',
            subtitle: 'Join our newsletter to get exclusive tips.',
            placeholder: 'Your email address...',
            buttonText: 'SEND',
          }
        },
        {
          id: 'emma-footer',
          type: 'footer',
          props: {
              logoText: 'EMMA',
              aboutTitle: 'Emma',
              aboutText: 'I help creative entrepreneurs build businesses they love.',
              servicesTitle: 'Services',
              services: [
                { text: 'Program', href: '#' },
                { text: 'Coaching', href: '#' },
                { text: 'Resources', href: '#' }
              ],
              followTitle: 'Follow me',
              copyright: '© 2024 Emma Theme',
              credits: 'TEMPLATE BY ANTIGRAVITY',
              socialLinks: [
                { platform: 'instagram', url: '#' },
                { platform: 'tiktok', url: '#' },
                { platform: 'youtube', url: '#' }
              ]
           }
        }
      ]
    },
    {
      slug: 'services',
      name: 'Services',
      content: [
        {
            id: 'emma-header-services',
            type: 'header',
            props: {
                links: [
                    { text: 'HOME', href: '/admin/store/preview/emma-portfolio' },
                    { text: 'SERVICES', href: '/admin/store/preview/emma-portfolio/services' },
                    { text: 'ABOUT', href: '/admin/store/preview/emma-portfolio/about' },
                    { text: 'BLOG', href: '/admin/store/preview/emma-portfolio/blog' },
                    { text: 'CONTACT', href: '/admin/store/preview/emma-portfolio/contact' }
                ],
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'pinterest', url: '#' },
                    { platform: 'youtube', url: '#' }
                ]
            }
        },
        {
            id: 'emma-services-hero',
            type: 'services-hero',
            props: {
                title: "Let's work together",
                subtitle: "Ready to grow your biz?",
                text: "We provide easy steps to help you start your business today. Our custom coaching sessions are here to help you get started.",
                buttonText: "BOOK A CALL",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
            }
        },
        {
            id: 'emma-guidance-quote',
            type: 'quote',
            props: {
                text: "I'm here to guide you"
            }
        },
        {
            id: 'emma-detailed-services',
            type: 'detailed-services',
            props: {
                services: [
                    {
                        title: "Brand service",
                        subtitle: "Let's create your brand!",
                        description: "Standardize your brand identity with our comprehensive brand service. We cover logo design, color palette, typography and more.",
                        buttonText: "READ MORE",
                        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80" // Woman/Desk (Verified from Hero)
                    },
                    {
                        title: "Strategy service",
                        subtitle: "Build your foundation",
                        description: "Our strategy service helps you define your target audience, analyze your competitors, and create a roadmap for success.",
                        buttonText: "READ MORE",
                        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80" // Palm/Greenery (Verified from Podcast)
                    },
                    {
                        title: "Content Creation",
                        subtitle: "Stand out on social media",
                        description: "We create stunning visuals and engaging captions for your social media platforms. Save time and grow your audience with our consistent content strategy.",
                        buttonText: "READ MORE",
                        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&q=80" // Desktop/Creative (Verified)
                    }
                ]
            }
        },
        {
            id: 'emma-steps-services',
            type: 'steps-newsletter',
            props: {
                title: '5 easy steps to create your brand',
                subtitle: 'Get our free guide on how to launch your products perfectly.',
                placeholder: 'Your email address',
                buttonText: 'SEND ME THE LIST',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'
            }
        },
        {
            id: 'emma-testimonials-services',
            type: 'testimonials',
            props: {
                title: '',
                testimonials: [
                    {
                        text: 'I love so much Emma',
                        author: 'ANNA BLAIR',
                        role: 'DESIGNER',
                        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
                    },
                    {
                        text: 'This girl is really awesome',
                        author: 'SARA GREEN',
                        role: 'DEVELOPER',
                        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
                    }
                ]
            }
        },
        {
            id: 'emma-cta-image',
            type: 'image-cta',
            props: {
                title: "Let's talk about your project",
                subtitle: "I'm here to launch your dream business!",
                buttonText: "BOOK A CALL",
                image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=1200&q=80"
            }
        },
        {
            id: 'emma-footer-services',
            type: 'footer',
            props: {
                logoText: 'EMMA',
                copyright: '© 2024 Emma Theme. All rights reserved.',
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'tiktok', url: '#' },
                    { platform: 'facebook', url: '#' }
                ]
            }
        }
      ]
    },
    {
      slug: 'contact',
      layout: 'contact',
      content: [
        {
            id: 'emma-header-contact',
            type: 'header',
            props: {
                links: [
                    { text: 'HOME', href: '/admin/store/preview/emma-portfolio' },
                    { text: 'SERVICES', href: '/admin/store/preview/emma-portfolio/services' },
                    { text: 'ABOUT', href: '/admin/store/preview/emma-portfolio/about' },
                    { text: 'BLOG', href: '/admin/store/preview/emma-portfolio/blog' },
                    { text: 'CONTACT', href: '/admin/store/preview/emma-portfolio/contact' }
                ],
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'pinterest', url: '#' },
                    { platform: 'youtube', url: '#' }
                ]
            }
        },
        {
            id: 'emma-contact-hero',
            type: 'contact-hero',
            props: {
                title: 'Contact me',
                subtitle: 'Need more info about my services ?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
            }
        },
        {
            id: 'emma-contact-form',
            type: 'contact-form-section',
            props: {
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
                name: 'Emma Best',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
                buttonText: 'SEND'
            }
        },
        {
            id: 'emma-contact-info',
            type: 'contact-info-bar',
            props: {
                addressTitle: 'Meet me',
                address: 'Rue de la Paix\n75000 PARIS',
                phoneTitle: "Let's chat",
                phone: '+33 6 00 00 00 00',
                hoursTitle: 'Office hours',
                hours: '9:00 - 12:00 AM\n2:00 - 6:00 PM'
            }
        },
        {
            id: 'emma-contact-footer',
            type: 'footer',
            props: {
                logoText: 'EMMA',
                copyright: '© 2024 Emma Theme. All rights reserved.',
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'tiktok', url: '#' },
                    { platform: 'facebook', url: '#' }
                ]
            }
        }
      ]
    },
    {
      slug: 'about',
      layout: 'about',
      content: [
         {
            id: 'emma-header-about',
            type: 'header',
            props: {
                links: [
                    { text: 'HOME', href: '/admin/store/preview/emma-portfolio' },
                    { text: 'SERVICES', href: '/admin/store/preview/emma-portfolio/services' },
                    { text: 'ABOUT', href: '/admin/store/preview/emma-portfolio/about' },
                    { text: 'BLOG', href: '/admin/store/preview/emma-portfolio/blog' },
                    { text: 'CONTACT', href: '/admin/store/preview/emma-portfolio/contact' }
                ],
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'pinterest', url: '#' },
                    { platform: 'youtube', url: '#' }
                ]
            }
        },
        {
            id: 'emma-about-intro',
            type: 'about-intro',
            props: {
                name: 'Emma Best',
                subtitle: 'Have we met?',
                bio: '<p>I am a passionate certified business coach who helps creative entrepreneurs build profitable and sustainable businesses they love.</p><p>With over 10 years of experience in marketing and brand strategy, I provide clarity, strategy, and actionable steps to help you scale.</p>',
                profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
                heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
            }
        },
        {
            id: 'emma-about-story',
            type: 'about-story',
            props: {
                title: 'Owner & Brand strategist',
                subtitle: 'My story',
                text: '<p>It all started when I realized that many talented creatives were struggling to turn their passion into a specialized business. They had the talent but lacked the strategy.</p><p>So I decided to combine my love for design with my strategic mind to create a coaching method that works.</p>',
                buttonText: 'READ MY STORY',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'
            }
        },
        {
            id: 'emma-about-things',
            type: 'about-things',
            props: {
                title: '3 things about me',
                subtitle: 'A few fun facts about who I am.',
                things: [
                    { title: "My superpower", text: "I can organize chaos into structured plans.", icon: "sparkles" },
                    { title: "Coffee Addict", text: "I cannot start my day without a fresh brew.", icon: "coffee" },
                    { title: "Stationery Lover", text: "I have an obsession with notebooks and pens.", icon: "pen" }
                ]
            }
        },
        {
            id: 'emma-about-behind',
            type: 'about-behind',
            props: {
                title: 'Behind the scene',
                subtitle: 'Get to know me',
                text: '<p>I love working from cozy cafes, surrounded by inspiring books and good music. When I am not coaching, you can find me hiking in nature or exploring new art galleries.</p><p>I believe that balance is key to success, and I encourage my clients to build a business that supports their lifestyle.</p>',
                image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80'
            }
        },
        {
             id: 'emma-about-quote',
             type: 'about-quote',
             props: {
                 text: '« Everything is magic if you know where to look »'
             }
        },
        {
            id: 'emma-about-passion',
            type: 'about-passion',
            props: {
                title: 'My passion',
                subtitle: 'Bringing your vision to life!',
                items: ["Authentic storytelling", "Strategic growth", "Community building", "Creative excellence", "Results driven"],
                buttonText: "CONTACT ME",
                mainImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
                subImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80"
            }
        },
        {
            id: 'emma-about-footer',
            type: 'footer',
            props: {
                logoText: 'EMMA',
                copyright: '© 2024 Emma Theme. All rights reserved.',
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'tiktok', url: '#' },
                    { platform: 'facebook', url: '#' }
                ]
            }
        }
      ]
    },
    {
      slug: 'blog',
      layout: 'blog',
      content: [
         {
            id: 'emma-header-blog',
            type: 'header',
            props: {
                links: [
                    { text: 'HOME', href: '/admin/store/preview/emma-portfolio' },
                    { text: 'SERVICES', href: '/admin/store/preview/emma-portfolio/services' },
                    { text: 'ABOUT', href: '/admin/store/preview/emma-portfolio/about' },
                    { text: 'BLOG', href: '/admin/store/preview/emma-portfolio/blog' },
                    { text: 'CONTACT', href: '/admin/store/preview/emma-portfolio/contact' }
                ],
                socialLinks: [
                    { platform: 'instagram', url: '#' },
                    { platform: 'pinterest', url: '#' },
                    { platform: 'youtube', url: '#' }
                ]
            }
        },
        {
            id: 'emma-blog-hero',
            type: 'blog-hero',
            props: {
                title: 'Blog'
            }
        },
        {
            id: 'emma-blog-grid',
            type: 'blog-grid',
            props: {
                posts: [
                    {
                        title: "Healthcare podcast",
                        excerpt: "Discover how to balance your health and business life with our latest podcast episode featuring expert guests.",
                        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80",
                        category: "AYURVEDA",
                        date: "18 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    },
                    {
                        title: "Spiritual podcast",
                        excerpt: "Exploring the connection between mindfulness and productivity. Listen to our new spiritual journey.",
                        image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=500&q=80",
                        category: "AYURVEDA",
                        date: "18 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    },
                    {
                        title: "New podcast",
                        excerpt: "Launching your first product? Here is everything you need to know before you start.",
                        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80",
                        category: "AYURVEDA",
                        date: "18 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    },
                    {
                        title: "Third blog article",
                        excerpt: "Why networking is crucial for your business growth. Read our top tips for successful networking events.",
                        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80",
                        category: "AYURVEDA",
                        date: "17 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    },
                    {
                        title: "Second blog article",
                        excerpt: "Content creation made easy. Tools and strategies to streamline your social media planning.",
                        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
                        category: "AYURVEDA",
                        date: "17 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    },
                    {
                        title: "Blog article",
                        excerpt: "The future of digital marketing. Trends to watch out for in 2025.",
                        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80", // Changed to reliable fashion/blog image
                        category: "AYURVEDA",
                        date: "17 OCTOBER 2024",
                        comments: "NO COMMENTS"
                    }
                ]
            }
        },
        {
            id: 'emma-instagram-title',
            type: 'instagram-title',
            props: {
                title: 'Instagram'
            }
        },
        {
            id: 'emma-blog-footer',
            type: 'footer',
            props: {
              logoText: 'EMMA',
              aboutTitle: 'Emma',
              aboutText: 'I help creative entrepreneurs build businesses they love.',
              servicesTitle: 'Services',
              services: [
                { text: 'Program', href: '#' },
                { text: 'Coaching', href: '#' },
                { text: 'Resources', href: '#' }
              ],
              followTitle: 'Follow me',
              copyright: '© 2024 Emma Theme',
              credits: 'TEMPLATE BY ANTIGRAVITY',
              socialLinks: [
                  { platform: 'instagram', url: '#' },
                  { platform: 'tiktok', url: '#' },
                  { platform: 'facebook', url: '#' }
              ]
            }
        }
      ]
    }
  ]
};
