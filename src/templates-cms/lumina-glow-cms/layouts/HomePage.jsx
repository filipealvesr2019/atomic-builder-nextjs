import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import Categories from '../sections/Categories';
import ProductCarousel from '../sections/ProductCarousel';
import ImageWithText from '../sections/ImageWithText';
import Footer from '../sections/Footer';

import { luminaGlowDefaultContent } from '../default-content';

export default function HomePage({ sections }) {
    // Use sections from centralized default content
    const defaultContent = luminaGlowDefaultContent.sections;

    // Merge provided sections with defaults
    const finalContent = sections && Object.keys(sections).length > 0 ? { ...defaultContent, ...sections } : defaultContent;

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
