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
              { text: 'HOME', href: '#' },
              { text: 'SERVICES', href: '#services' },
              { text: 'ABOUT', href: '#about' },
              { text: 'CONTACT', href: '#contact' }
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
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            buttonText: 'SHOP NOW',
            image: '/images/emma-hero.jpg' // Placeholder will be used or user uploaded image
          }
        },
        {
          id: 'emma-intro',
          type: 'introduction',
          props: {
            title: 'Hello!',
            subtitle: 'Not only with coaching!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            buttonText: 'READ MORE',
            image: '/images/emma-intro.jpg'
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
                image: '/images/emma-service1.jpg'
              },
              {
                title: 'Coaching 1:1',
                description: 'Get personal guidance to grow your business.',
                buttonText: 'READ MORE',
                image: '/images/emma-service2.jpg'
              },
              {
                title: 'My guides to help you grow',
                description: 'Download our free guides to boost your sales.',
                buttonText: 'SEE GUIDES',
                image: '/images/emma-service3.jpg'
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
            image: '/images/emma-steps.jpg'
          }
        },
        {
          id: 'emma-podcast',
          type: 'podcast',
          props: {
            title: 'The Podcast',
            subtitle: 'ABout EMMA',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            buttonText: 'LISTEN NOW',
            image: '/images/emma-podcast.jpg'
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
                title: 'My Winter pcks',
                excerpt: 'My favorite items for this winter season.',
                image: '/images/emma-post1.jpg',
                link: '#'
              },
              {
                title: 'Spring podcast',
                excerpt: 'Listen to our new episode about spring trends.',
                image: '/images/emma-post2.jpg',
                link: '#'
              },
              {
                title: 'New podcast',
                excerpt: 'How to start your own podcast in 2024.',
                image: '/images/emma-post3.jpg',
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
              '/images/emma-impact1.jpg',
              '/images/emma-impact2.jpg',
              '/images/emma-impact3.jpg'
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
             copyright: '© 2024 Emma Theme. All rights reserved.',
             socialLinks: [
               { platform: 'instagram', url: '#' },
               { platform: 'tiktok', url: '#' },
               { platform: 'youtube', url: '#' }
             ]
          }
        }
      ]
    }
  ]
};
