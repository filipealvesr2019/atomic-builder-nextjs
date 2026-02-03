
export const ironStrengthDefaultContent = {
    theme: {
        colors: {
            primary: '#ff3e3e', // Energetic Red
            secondary: '#1a1a1a', // Dark Grey
            accent: '#facc15', // Neon Yellow for highlights
            background: '#111111', // Almost Black
            text: '#ffffff',
            muted: '#9ca3af'
        },
        fonts: {
            heading: 'Inter, sans-serif',
            body: 'Roboto, sans-serif'
        }
    },
    global: {
        logo: {
            text: 'IRONSTRENGTH',
            image: null
        },
        social: {
            instagram: '#',
            facebook: '#',
            youtube: '#'
        }
    },
    sections: {
        header: {
            variant: 'transparent',
            navItems: [
                { label: 'Home', href: '/' },
                { label: 'Classes', href: '#classes' },
                { label: 'Membership', href: '#membership' },
                { label: 'Trainers', href: '#trainers' },
                { label: 'Contact', href: '#contact' }
            ],
            cta: {
                label: 'Join Now',
                link: '#membership'
            }
        },
        hero: {
            title: 'FORGE YOUR BEST SELF',
            subtitle: 'Join the elite community of athletes committed to pushing limits.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop', // Gym atmosphere
            cta: {
                label: 'Start Your Journey',
                link: '#membership'
            }
        },
        classesGrid: {
            title: 'Our Programs',
            subtitle: 'Choose your battlefield',
            items: [
                {
                    id: 'c1',
                    title: 'Crossfit',
                    description: 'High intensity functional training.',
                    image: 'https://images.unsplash.com/photo-1517963879466-e1b54ebd6694?q=80&w=1470&auto=format&fit=crop'
                },
                {
                    id: 'c2',
                    title: 'Powerlifting',
                    description: 'Build raw strength and power.',
                    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1374&auto=format&fit=crop'
                },
                {
                    id: 'c3',
                    title: 'Cardio & HIIT',
                    description: 'Boost endurance and burn calories.',
                    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1450&auto=format&fit=crop'
                },
                {
                    id: 'c4',
                    title: 'Yoga',
                    description: 'Restore balance and flexibility.',
                    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1480&auto=format&fit=crop'
                }
            ]
        },
        membershipPlans: {
            title: 'Membership Plans',
            subtitle: 'Invest in your health',
            plans: [
                {
                    name: 'Basic',
                    price: '$49',
                    period: '/month',
                    features: ['Access to Gym Floor', 'Locker Room Access', '1 Guest Pass/mo'],
                    highlight: false
                },
                {
                    name: 'Pro',
                    price: '$89',
                    period: '/month',
                    features: ['All Basic Features', 'Unlimited Classes', 'Free Solarium', 'Nutrition Plan'],
                    highlight: true
                },
                {
                    name: 'Elite',
                    price: '$129',
                    period: '/month',
                    features: ['All Pro Features', 'Personal Trainer (2x/mo)', 'Massage Therapy', 'Priority Support'],
                    highlight: false
                }
            ]
        },
        trainers: {
            title: 'Expert Coaches',
            subtitle: 'Learn from the best',
            list: [
                {
                    name: 'Alex Stone',
                    role: 'Head Coach',
                    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1374&auto=format&fit=crop'
                },
                {
                    name: 'Sarah Connor',
                    role: 'Crossfit Specialist',
                    image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=1374&auto=format&fit=crop'
                },
                {
                    name: 'Mike Ross',
                    role: 'Nutritionist',
                    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop'
                }
            ]
        },
        footer: {
            text: '© 2024 IronStrength Gym. All rights reserved.',
            address: '123 Fitness Blvd, Muscle City, CA 90210'
        }
    }
};
