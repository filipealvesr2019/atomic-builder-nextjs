import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Benefits from '../sections/Benefits';
import Footer from '../sections/Footer';

const HomePage = ({ sections = {}, forceMobile = false }) => {
  return (
    <div className={`digital-brand-theme ${forceMobile ? 'force-mobile' : ''}`}>
      <Header {...(sections.header || {})} />
      <main>
        <Hero {...(sections.hero || {})} />
        <CategoryGrid {...(sections.categories || {})} />
        <FeaturedProducts {...(sections.featured || {})} />
        <Benefits {...(sections.benefits || {})} />
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default HomePage;
