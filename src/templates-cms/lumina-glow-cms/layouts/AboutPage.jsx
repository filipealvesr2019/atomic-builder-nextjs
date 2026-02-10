import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import ImageWithText from '../sections/ImageWithText';
import Ingredients from '../sections/Ingredients';
import Footer from '../sections/Footer';
import { luminaGlowDefaultContent } from '../default-content';

const defaultAboutContent = {
    header: luminaGlowDefaultContent.sections.header,
    hero: luminaGlowDefaultContent.sections.aboutPage?.hero || luminaGlowDefaultContent.sections.hero,
    marquee: luminaGlowDefaultContent.sections.marquee,
    story: luminaGlowDefaultContent.sections.aboutPage?.story || luminaGlowDefaultContent.sections.imageWithText,
    values: luminaGlowDefaultContent.sections.aboutPage?.values || luminaGlowDefaultContent.sections.ingredients,
    footer: luminaGlowDefaultContent.sections.footer
};

export default function AboutPage({ sections }) {
    // Merge provided sections with defaults
    const finalContent = sections && Object.keys(sections).length > 0 ? { ...defaultAboutContent, ...sections } : defaultAboutContent;

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1f1f1f' }}>
            <Header content={finalContent.header} />
            <Hero content={finalContent.hero} />
            <Marquee content={finalContent.marquee} />
            <ImageWithText content={finalContent.story} />
            <Ingredients
                content={{
                    title: finalContent.values.title,
                    subtitle: finalContent.values.subtitle,
                    items: finalContent.values.items
                }}
            />
            <Footer content={finalContent.footer} />
        </div>
    );
}
