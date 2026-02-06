import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import Categories from '../sections/Categories';
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
        slides: [
            {
                tagline: 'Blend Beauty In You',
                title: 'Get the skin you want to feel',
                image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1974&auto=format&fit=crop',
                bgColor: '#F3D1C8',
                cta: { label: 'Shop Now', link: '#shop' },
                align: 'left'
            },
            {
                tagline: 'Pure & Organic',
                title: 'Nature in every drop',
                image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1974&auto=format&fit=crop',
                bgColor: '#E2E8D5',
                cta: { label: 'Explore All', link: '#about' },
                align: 'left'
            },
            {
                tagline: 'Sustainable Luxury',
                title: 'Elegance with a Conscience',
                image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop',
                bgColor: '#D4A373',
                cta: { label: 'Join Us', link: '#journal' },
                align: 'left'
            }
        ]
    },
    marquee: {
        text: 'CRUELTY FREE • VEGAN • ORGANIC • SUSTAINABLE PACKAGING • DERMATOLOGIST TESTED • '
    },
    categories: {
        subtitle: 'Categories',
        title: 'Shop by Collection',
        description: 'Explore our curated skincare categories, designed to bring out your natural glow',
        items: [
            { id: 'c1', name: 'Facial Serums', count: '12 items', image: '/images/lumina-glow/lumina_facial_serum_1770331852127.png' },
            { id: 'c2', name: 'Moisturizing Creams', count: '15 items', image: '/images/lumina-glow/lumina_moisturizer_cream_1770331710494.png' },
            { id: 'c3', name: 'Purifying Cleansers', count: '8 items', image: '/images/lumina-glow/lumina_purifying_cleanser_1770331727279.png' },
            { id: 'c4', name: 'Body Care', count: '10 items', image: '/images/lumina-glow/lumina_body_lotion_1770331740635.png' },
            { id: 'c5', name: 'Skincare Tools', count: '6 items', image: '/images/lumina-glow/lumina_skincare_tools_1770331672860.png' }
        ]
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
            { id: 'p1', category: 'Serum', name: 'Glow Serum', price: '$48.00', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop', badge: 'New' },
            { id: 'p2', category: 'Cream', name: 'Daily Moisturizer', price: '$32.00', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1974&auto=format&fit=crop' },
            { id: 'p3', category: 'Cream', name: 'Night Cream', price: '$55.00', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1887&auto=format&fit=crop', badge: 'Sold Out' },
            { id: 'p4', category: 'Cleanser', name: 'Purifying Cleanser', price: '$24.00', image: 'https://images.unsplash.com/photo-1556228578-8d89482d8c97?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    imageWithText: {
        title: 'Nature meets Science',
        subtitle: 'We believe in the power of plants backed by clinical results. Our formulas are designed to balance and nourish.',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1974&auto=format&fit=crop',
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
            <Categories content={finalContent.categories} />
            <ProductCarousel content={finalContent.productCarousel} />
            <ImageWithText content={finalContent.imageWithText} />
            <Footer content={finalContent.footer} />
        </div>
    );
}
