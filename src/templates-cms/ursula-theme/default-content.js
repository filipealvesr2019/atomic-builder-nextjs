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
                 { text: 'Our Blog', href: '#', subItems: [{text: 'All Posts', href: '#'}] },
                 { text: 'Single Post', href: '#' },
                 { text: 'About Me', href: '#' },
                 { text: 'Contact Us', href: '#' }
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
                { name: 'Bolero', image: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=500&q=80', link: '#' },
                { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80', link: '#' },
                { name: 'Stories', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80', link: '#' }
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
          id: 'ursula-client-love',
          type: 'client-love',
          props: {
            title: 'Client Love',
            quote: 'Ursula is a fantastic theme. It helped me create the blog of my dreams in minutes.',
            author: 'Sarah J.',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80'
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
    }
  ]
};
