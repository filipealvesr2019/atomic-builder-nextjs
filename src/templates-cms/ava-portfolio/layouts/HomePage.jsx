import React from 'react';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Introduction from '../sections/Introduction';
import Collage from '../sections/Collage';
import Services from '../sections/Services';
import AboutIntro from '../sections/AboutIntro';
import Testimonials from '../sections/Testimonials';
import BlogGrid from '../sections/BlogGrid';
import Footer from '../sections/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function HomePage({ sections = {} }) {
  return (
    <div className={`ava-theme-wrapper ${playfair.className}`} style={{ color: '#333', backgroundColor: '#ebeae6' }}>
        <Header {...(sections['header'] || {})} />
        <Hero {...(sections['hero'] || {})} />
        <Introduction {...(sections['introduction'] || {})} />
        <Collage {...(sections['collage'] || {})} />
        <Services {...(sections['services'] || {})} />
        <AboutIntro {...(sections['about-intro'] || {})} />
        <Testimonials {...(sections['testimonials'] || {})} />
        <BlogGrid {...(sections['blog-grid'] || {})} />
        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
