import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import ImageWithText from '../sections/ImageWithText';
import Values from '../sections/Values';
import Ingredients from '../sections/Ingredients';
import Footer from '../sections/Footer';
import { luminaGlowDefaultContent } from '../default-content';

const defaultAboutContent = {
    header: luminaGlowDefaultContent.sections.header,
    story: luminaGlowDefaultContent.sections.aboutPage?.story || luminaGlowDefaultContent.sections.imageWithText,
    values: luminaGlowDefaultContent.sections.aboutPage?.values || {},
    ingredients: luminaGlowDefaultContent.sections.aboutPage?.ingredients || luminaGlowDefaultContent.sections.ingredients,
    footer: luminaGlowDefaultContent.sections.footer
};

export default function AboutPage({ sections }) {
    // Merge provided sections with defaults
    const finalContent = sections && Object.keys(sections).length > 0 ? { ...defaultAboutContent, ...sections } : defaultAboutContent;

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1f1f1f', paddingTop: '80px' }}>
            <Header content={finalContent.header} />
            <ImageWithText content={finalContent.story} />
            <Values content={finalContent.values} />
            <Ingredients content={finalContent.ingredients} />
            <Footer content={finalContent.footer} />
        </div>
    );
}
