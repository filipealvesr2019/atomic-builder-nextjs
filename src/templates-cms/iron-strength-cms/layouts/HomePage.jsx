import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import ClassesGrid from '../sections/ClassesGrid';
import MembershipPlans from '../sections/MembershipPlans';
import Trainers from '../sections/Trainers';
import Footer from '../sections/Footer';

const defaultContent = {
    header: {
        logo: { text: 'IRONSTRENGTH' },
        navItems: [
            { label: 'Home', href: '/' },
            { label: 'Programs', href: '#classes' },
            { label: 'Membership', href: '#membership' },
            { label: 'Team', href: '#trainers' }
        ],
        cta: { label: 'Join Now', link: '#membership' }
    },
    hero: {
        title: 'FORGE YOUR BEST SELF',
        subtitle: 'Join the community committed to excellence.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
        cta: { label: 'Start Your Journey', link: '#membership' }
    },
    classes: {
        title: 'Our Programs',
        subtitle: 'Choose your battlefield',
        items: [
            { id: 'c1', title: 'Crossfit', description: 'Functional intensity.', image: 'https://images.unsplash.com/photo-1517963879466-e1b54ebd6694?q=80&w=1470&auto=format&fit=crop' },
            { id: 'c2', title: 'Strength', description: 'Build raw power.', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1374&auto=format&fit=crop' },
            { id: 'c3', title: 'Cardio', description: 'Endurance training.', image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1450&auto=format&fit=crop' }
        ]
    },
    membership: {
        title: 'Membership Plans',
        subtitle: 'Invest in yourself',
        plans: [
            { name: 'Basic', price: '$49', period: '/mo', features: ['Gym Access', 'Locker Room'], highlight: false },
            { name: 'Pro', price: '$89', period: '/mo', features: ['All Basic', 'Unlimited Classes', 'Nutrition Plan'], highlight: true },
            { name: 'Elite', price: '$129', period: '/mo', features: ['All Pro', 'Personal Trainer', 'Massage'], highlight: false }
        ]
    },
    trainers: {
        title: 'Expert Coaches',
        subtitle: 'Learn from the pros',
        list: [
            { name: 'Alex Stone', role: 'Head Coach', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc' },
            { name: 'Sarah Connor', role: 'Crossfit Lead', image: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0' },
            { name: 'Mike Ross', role: 'Nutritionist', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61' }
        ]
    },
    footer: {
        text: '© 2024 IronStrength Gym.',
        address: '123 Fitness Blvd, Muscle City'
    }
};

export default function HomePage({ content = defaultContent }) {
    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
            <Header content={content.header} />
            <Hero content={content.hero} />
            <ClassesGrid content={content.classes} />
            <MembershipPlans content={content.membership} />
            <Trainers content={content.trainers} />
            <Footer content={content.footer} />
        </div>
    );
}
