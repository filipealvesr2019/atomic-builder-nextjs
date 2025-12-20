'use client';

import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Introduction from '../sections/Introduction';
import Services from '../sections/Services';
import StepsNewsletter from '../sections/StepsNewsletter';
import Podcast from '../sections/Podcast';
import Testimonials from '../sections/Testimonials';
import RecentPosts from '../sections/RecentPosts';
import Quote from '../sections/Quote';
import Impact from '../sections/Impact';
import ExclusiveContent from '../sections/ExclusiveContent';
import Footer from '../sections/Footer';

export default function HomePage({ sections = {} }) {
  return (
    <div className="emma-theme-wrapper" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
        <Header {...(sections['header'] || {})} />
        <Hero {...(sections['hero'] || {})} />
        <Introduction {...(sections['introduction'] || {})} />
        <Services {...(sections['services'] || {})} />
        <StepsNewsletter {...(sections['steps-newsletter'] || {})} />
        <Podcast {...(sections['podcast'] || {})} />
        <Testimonials {...(sections['testimonials'] || {})} />
        <RecentPosts {...(sections['recent-posts'] || {})} />
        <Quote {...(sections['quote'] || {})} />
        <Impact {...(sections['impact'] || {})} />
        <ExclusiveContent {...(sections['exclusive-content'] || {})} />
        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
