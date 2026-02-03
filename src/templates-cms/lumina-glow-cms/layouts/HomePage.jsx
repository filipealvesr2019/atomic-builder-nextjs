import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import Ingredients from '../sections/Ingredients';
import ProductCarousel from '../sections/ProductCarousel';
import ImageWithText from '../sections/ImageWithText';
import Footer from '../sections/Footer';

const defaultContent = {
    header: {
        logo: { text: 'LUMINA.' },
        navItems: [
            { label: 'Shop', href: '#shop' },
            { label: 'About', href: '#about' },
            { label: 'Ingredients', href: '#ingredients' },
            { label: 'Journal', href: '#journal' }
        ],
        cta: { label: 'Cart (0)', link: '#cart' }
    },
    hero: {
        title: 'Radiance meant to be shared.',
        subtitle: 'Clean, vegan formulations for your best skin yet.',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1974&auto=format&fit=crop',
        cta: { label: 'Shop The Collection', link: '#shop' }
    },
    marquee: {
        text: 'CRUELTY FREE • VEGAN • ORGANIC • SUSTAINABLE PACKAGING • DERMATOLOGIST TESTED • '
    },
    ingredients: {
        title: 'Key Ingredients',
        subtitle: 'Powered by nature',
        items: [
            { id: 'i1', name: 'Hyaluronic Acid', image: 'https://images.unsplash.com/photo-1615397349754-08a8031d27fa?q=80&w=1974&auto=format&fit=crop' },
            { id: 'i2', name: 'Vitamin C', image: 'https://images.unsplash.com/photo-1610449557262-42173f328905?q=80&w=1974&auto=format&fit=crop' },
            { id: 'i3', name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1596704017389-96e85557d560?q=80&w=1974&auto=format&fit=crop' },
            { id: 'i4', name: 'Rosehip Oil', image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    productCarousel: {
        title: 'Best Sellers',
        items: [
            { id: 'p1', name: 'Glow Serum', price: '$48.00', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop' },
            { id: 'p2', name: 'Daily Moisturizer', price: '$32.00', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1974&auto=format&fit=crop' },
            { id: 'p3', name: 'Night Cream', price: '$55.00', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1887&auto=format&fit=crop' },
            { id: 'p4', name: 'Purifying Cleanser', price: '$24.00', image: 'https://images.unsplash.com/photo-1556228578-8d89482d8c97?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    imageWithText: {
        title: 'Nature meets Science',
        subtitle: 'We believe in the power of plants backed by clinical results. Our formulas are designed to balance and nourish.',
        image: 'https://images.unsplash.com/photo-1556228720-1957be83f7be?q=80&w=1974&auto=format&fit=crop',
        imagePosition: 'left',
        cta: { label: 'Our Story', link: '#about' }
    },
    footer: {
        text: '© 2024 Lumina Glow. Designed for radiance.',
        newsletterTitle: 'Join the inner circle',
        newsletterText: 'Subscribe for exclusive offers and skincare tips.'
    }
};

export default function HomePage({ content }) {
    // Merge provided content with defaults
    const finalContent = content ? { ...defaultContent, ...content } : defaultContent;

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1f1f1f' }}>
            <Header content={finalContent.header} />
            <Hero content={finalContent.hero} />
            <Marquee content={finalContent.marquee} />
            <Ingredients content={finalContent.ingredients} />
            <ProductCarousel content={finalContent.productCarousel} />
            <ImageWithText content={finalContent.imageWithText} />
            <Footer content={finalContent.footer} />
        </div>
    );
}
