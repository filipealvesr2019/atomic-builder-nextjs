import React from 'react';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Header from '../sections/Header';
import ServicesTripleHero from '../sections/ServicesTripleHero';
import ServicesIntroRef from '../sections/ServicesIntroRef';
import ServicesProcess from '../sections/ServicesProcess';
import ServicesOverlap from '../sections/ServicesOverlap';
import ServicesBanner from '../sections/ServicesBanner';
import ServicesFAQ from '../sections/ServicesFAQ';
import ServicesFeatured from '../sections/ServicesFeatured';
import Footer from '../sections/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function ServicesPage({ sections = {} }) {
  return (
    <div className={`ava-theme-wrapper ${playfair.className} ${openSans.className}`} style={{ color: '#333', backgroundColor: '#ebeae6' }}>
        <Header {...(sections['header'] || {})} />
        <ServicesTripleHero {...(sections['services-triple-hero'] || {})} />
        <ServicesIntroRef {...(sections['services-intro-ref'] || {})} />
        <ServicesProcess {...(sections['services-process'] || {})} />
        
        {/* Wedding Package */}
        <ServicesOverlap {...(sections['wedding-package'] || {})} />
        
        {/* Banner */}
        <ServicesBanner {...(sections['services-banner'] || {})} />
        
        {/* Getting Engaged (Mirrored) */}
        <ServicesOverlap {...(sections['getting-engaged'] || { mirrored: true, title: "Getting Engaged" })} />
        
        <ServicesFAQ {...(sections['services-faq'] || {})} />
        <ServicesFeatured {...(sections['services-featured'] || {})} />
        
        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
