'use client';

import React from 'react';
import { Playfair_Display } from 'next/font/google';
import Header from '../sections/Header';
import ServicesHero from '../sections/ServicesHero';
import Quote from '../sections/Quote';
import DetailedServices from '../sections/DetailedServices';
import StepsNewsletter from '../sections/StepsNewsletter';
import Testimonials from '../sections/Testimonials';
import ImageCTA from '../sections/ImageCTA';
import Footer from '../sections/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700', '900'], style: ['normal', 'italic'] });

export default function ServicesPage({ sections = {} }) {
  return (
    <div className={`emma-theme-wrapper ${playfair.className}`} style={{ color: '#1a1a1a', backgroundColor:'#fff' }}>
        <Header {...(sections['header'] || {})} />
        <ServicesHero {...(sections['services-hero'] || {})} />
        <Quote {...(sections['quote'] || {})} />
        <DetailedServices {...(sections['detailed-services'] || {})} />
        <StepsNewsletter {...(sections['steps-newsletter'] || {})} />
        <Testimonials {...(sections['testimonials'] || {})} />
        <ImageCTA {...(sections['image-cta'] || {})} />
        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
