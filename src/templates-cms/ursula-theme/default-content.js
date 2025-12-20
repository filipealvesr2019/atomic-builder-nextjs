export const ursulaDefaultContent = {
  templateId: 'ursula-theme',
  pages: [
    {
      slug: 'home',
      name: 'Home',
      content: [
        {
          id: 'ursula-header',
          type: 'header',
          props: {
             logoText: 'Ursula',
             logoSub: 'Theme',
             links: [
                 { text: 'Home', href: '/admin/demo-preview/ursula-demo' },
                 { 
                     text: 'Categories', 
                     href: '#',
                     subItems: [
                         { text: 'Lifestyle', href: '/admin/demo-preview/ursula-demo/category/lifestyle' },
                         { text: 'Fashion', href: '/admin/demo-preview/ursula-demo/category/fashion' },
                         { text: 'Stories', href: '/admin/demo-preview/ursula-demo/category/stories' },
                         { text: 'Featured', href: '/admin/demo-preview/ursula-demo/category/featured' }
                     ]
                 },
                 { text: 'Our Blog', href: '/admin/demo-preview/ursula-demo/blog' },

                 { text: 'About Me', href: '/admin/demo-preview/ursula-demo/about' },
                 { text: 'Contact Us', href: '/admin/demo-preview/ursula-demo/contact' }
             ]
          }
        },
        {
          id: 'ursula-hero',
          type: 'hero',
          props: {
            title: 'We are UrsulaTheme',
            subtitle: 'New Collection',
            buttonText: 'Shop Now',
            backgroundImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        },
        {
          id: 'ursula-categories',
          type: 'categories',
          props: {
            title: 'Browse the Categories',
            subtitle: 'Home & Decor Ideas',
            categories: [
                { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80', link: '/admin/demo-preview/ursula-demo/category/lifestyle' },
                { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80', link: '/admin/demo-preview/ursula-demo/category/fashion' },
                { name: 'Stories', image: 'https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=500&q=80', link: '/admin/demo-preview/ursula-demo/category/stories' }
            ]
          }
        },
        {
          id: 'ursula-featured',
          type: 'featured-content',
          props: {
            title: 'Block Title',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            buttonText: 'Read More',
            image1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
            image2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80'
          }
        },

        {
          id: 'ursula-latest-posts',
          type: 'latest-posts',
          props: {
             title: 'Latest Post',
             subtitle: 'Our Blog',
             posts: [
                { 
                   id: 1, date: '12', month: 'Sept', category: 'Lifestyle', title: 'The Journey Of A Thousand Miles Begins With A Single Step', 
                   excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.', 
                   image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80'
                },
                { 
                   id: 2, date: '10', month: 'Sept', category: 'Fashion', title: 'Top Trends For The Upcoming Winter Season', 
                   excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
                   image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80'
                },
                { 
                   id: 3, date: '05', month: 'Sept', category: 'Stories', title: 'How To Prove When You\'re Making A Huge Mistake', 
                   excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
                   image: 'https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=500&q=80'
                },
                { 
                   id: 4, date: '01', month: 'Sept', category: 'Featured', title: 'Why You Should Travel Alone At Least Once', 
                   excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
                   image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80'
                },
                { 
                   id: 5, date: '28', month: 'Aug', category: 'Lifestyle', title: 'Morning Routines That Will Change Your Life', 
                   excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', 
                   image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80'
                },
                { 
                   id: 6, date: '25', month: 'Aug', category: 'Fashion', title: 'Sustainable Fashion: A Guide For Beginners', 
                   excerpt: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.', 
                   image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=500&q=80'
                },
                 { 
                   id: 7, date: '20', month: 'Aug', category: 'Stories', title: 'The Day I Met My Hero', 
                   excerpt: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.', 
                   image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80'
                }
             ]
          }
        },
        {
          id: 'ursula-footer',
          type: 'footer',
          props: {
             sections: {
                contact: { 
                    title: 'Contact Info', 
                    text: 'Lorem ipsum dolor sit amet', 
                    email: 'hello@ursulatheme.com', 
                    phone: '+1 234 567 890' 
                },
                about: {
                    title: 'Hello, I\'m Ursula',
                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
                    text: 'Excepteur sint occaecat cupidatat non proident'
                },
                newsletter: {
                    title: 'Newsletter',
                    text: 'Subscribe for updates'
                }
             }
          }
        }
      ]

    },
    {
      slug: 'about',
      name: 'About Me',
      content: [
        {
          type: 'header',
          props: {
             logoText: 'Ursula',
             links: [
                 { text: 'Home', href: '/admin/demo-preview/ursula-demo' },
                 { text: 'Categories', href: '#', subItems: [
                     { text: 'Lifestyle', href: '/admin/demo-preview/ursula-demo/category/lifestyle' },
                     { text: 'Fashion', href: '/admin/demo-preview/ursula-demo/category/fashion' },
                     { text: 'Stories', href: '/admin/demo-preview/ursula-demo/category/stories' },
                     { text: 'Featured', href: '/admin/demo-preview/ursula-demo/category/featured' }
                 ]},
                 { text: 'Our Blog', href: '/admin/demo-preview/ursula-demo/blog' },

                 { text: 'About Me', href: '/admin/demo-preview/ursula-demo/about' },
                 { text: 'Contact Us', href: '/admin/demo-preview/ursula-demo/contact' }
             ]
          }
        },
        {
          type: 'hero',
          props: {
            title: 'About Us',
            subtitle: '',
            buttonText: '',
            backgroundImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1350&q=80'
          }
        },
        {
            type: 'about-intro',
            props: {
                title: 'We Are Ursula', // Keeping Theme Name Consistent
                subtitle: 'ABOUT US',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae diam tristique, sodales enim in, scelerisque nibh.',
                images: [
                    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500&q=80', // Chair/Corner (Vertical)
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', // Living room (Large)
                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80'  // Desk/Accessories
                ]
            }
        },
        {
            type: 'team',
            props: {
                title: 'Our Team',
                subtitle: 'WE ARE URSULA THEME',
                members: [
                    { name: 'Amanda Lee', role: 'FOUNDER', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
                    { name: 'Adam Cheise', role: 'DESIGNER', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
                    { name: 'Mike Stuart', role: 'CEO', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80' }
                ],
                backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1350&q=80'
            }
        },
        {
            type: 'quote',
            props: {
                text: 'There is no such thing as chance in a text. Any text is the result of a repertoire, on conscious and unconscious levels.',
                author: 'IVAN ANGELO'
            }
        },
        {
            type: 'newsletter-split',
            props: {
                title: 'Newsletter',
                subtitle: 'JOIN US',
                text: 'Subscribe to the Ursula newsletter',
                buttonText: 'SIGN UP',
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80'
            }
        },
        {
            type: 'footer',
            props: {
               // Props will be merged from generic footer handling if empty, but we can pass same struct
               sections: { /* ... */ } 
            }
        }
      ]

    },
    {
      slug: 'contact',
      name: 'Contact Us',
      content: [
        {
          type: 'header',
          props: {
             logoText: 'Ursula',
             links: [
                 { text: 'Home', href: '/admin/demo-preview/ursula-demo' },
                 { text: 'Categories', href: '#', subItems: [
                     { text: 'Lifestyle', href: '/admin/demo-preview/ursula-demo/category/lifestyle' },
                     { text: 'Fashion', href: '/admin/demo-preview/ursula-demo/category/fashion' },
                     { text: 'Stories', href: '/admin/demo-preview/ursula-demo/category/stories' },
                     { text: 'Featured', href: '/admin/demo-preview/ursula-demo/category/featured' }
                 ]},
                 { text: 'Our Blog', href: '/admin/demo-preview/ursula-demo/blog' },

                 { text: 'About Me', href: '/admin/demo-preview/ursula-demo/about' },
                 { text: 'Contact Us', href: '/admin/demo-preview/ursula-demo/contact' }
             ]
          }
        },
        {
          type: 'hero',
          props: {
            title: 'Contact Us',
            subtitle: '',
            buttonText: '',
            backgroundImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1350&q=80' // Coffee/Desk top down
          }
        },
        {
            type: 'contact-section',
            props: {
                subtitle: 'SEND US',
                title: 'Contact Info',
                description: 'Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo.',
                details: {
                    address: 'Quang Trung, Thai Nguyen',
                    email: 'hello@yourgmail.com',
                    phone: '+84 979445717'
                }
            }
        },
        {
            type: 'instagram-row',
            props: {
                images: [
                    'https://images.unsplash.com/photo-1497215842964-222b430dc0a8?w=300&q=80',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
                    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80',
                    'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=300&q=80',
                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80',
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80'
                ]
            }
        },
        {
            type: 'footer',
            props: {
               sections: {} 
            }
        }
      ]

    },
    {
      slug: 'single-post',
      name: 'Single Post',
      content: [
        {
          type: 'header',
          props: {
             logoText: 'Ursula',
             links: [
                 { text: 'Home', href: '/admin/demo-preview/ursula-demo' },
                 { text: 'Categories', href: '#', subItems: [
                     { text: 'Lifestyle', href: '/admin/demo-preview/ursula-demo/category/lifestyle' },
                     { text: 'Fashion', href: '/admin/demo-preview/ursula-demo/category/fashion' },
                     { text: 'Stories', href: '/admin/demo-preview/ursula-demo/category/stories' },
                     { text: 'Featured', href: '/admin/demo-preview/ursula-demo/category/featured' }
                 ]},
                 { text: 'Our Blog', href: '/admin/demo-preview/ursula-demo/blog' },
                 { text: 'Single Post', href: '/admin/demo-preview/ursula-demo/single-post' },
                 { text: 'About Me', href: '/admin/demo-preview/ursula-demo/about' },
                 { text: 'Contact Us', href: '/admin/demo-preview/ursula-demo/contact' }
             ]
          }
        },
        {
            type: 'single-post',
            props: {
                category: 'FASHION',
                date: '12 DEC 2024',
                title: 'The journey of a thousand miles begins with a single step',
                author: 'POST AUTHOR',
                comments: '2 COMMENTS',
                mainImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80',
                content: [
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                ],
                gallery: [
                     'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500&q=80',
                     'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
                     'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80'
                ],
                quote: "There is no such thing as chance in a text. Any text is the result of a repertoire, on conscious and unconscious levels.",
                tags: ['LIFE', 'STYLE', 'ART', 'TECH']
            }
        },
        {
            type: 'instagram-row',
            props: {
                images: [
                    'https://images.unsplash.com/photo-1497215842964-222b430dc0a8?w=300&q=80',
                    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
                    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80',
                    'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=300&q=80',
                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80',
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80'
                ]
            }
        },
        {
            type: 'footer',
            props: {
               sections: {} 
            }
        }
      ]
    }
  ]
};
