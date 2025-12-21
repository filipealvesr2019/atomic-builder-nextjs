'use client';
import React from 'react';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Header from '../sections/Header';
import BlogHero from '../sections/BlogHero';
import BlogGrid from '../sections/BlogGrid';
import BlogNewsletter from '../sections/BlogNewsletter';
import Footer from '../sections/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function BlogPage({ sections = {} }) {
  return (
    <div className={`ava-theme-wrapper ${playfair.className} ${openSans.className}`} style={{ color: '#333', backgroundColor: '#fff' }}>
        <Header {...(sections['header'] || {})} />
        
        <BlogHero {...(sections['blog-hero'] || {})} />
        
        <BlogGrid {...(sections['blog-grid'] || {})} />
        
        <BlogNewsletter {...(sections['blog-newsletter'] || {})} />

        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
