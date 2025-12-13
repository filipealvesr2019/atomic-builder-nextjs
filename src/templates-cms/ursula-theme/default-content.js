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
                 { text: 'Lifestyle', href: '#' },
                 { text: 'About', href: '#' },
                 { text: 'Contact', href: '#' }
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
                   id: 1, date: '12', month: 'Sept', category: 'Decoration', title: 'The Journey Of A Thousand Miles Begins With A Single Step', 
                   excerpt: 'Lorem ipsum dolor sit amet...', 
                   image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80'
                },
                { 
                   id: 2, date: '10', month: 'Sept', category: 'Design', title: 'Use Lifestyle To Make Someone Fall In Love With You', 
                   excerpt: 'Duis aute irure dolor in reprehenderit...', 
                   image: 'https://images.unsplash.com/photo-1595856714088-348e353592c3?w=500&q=80'
                },
                { 
                   id: 3, date: '05', month: 'Sept', category: 'Travel', title: 'How To Prove When You\'re Making A Huge Mistake', 
                   excerpt: 'Excepteur sint occaecat cupidatat...', 
                   image: 'https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=500&q=80'
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
