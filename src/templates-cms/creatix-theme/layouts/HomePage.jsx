import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';

const HomePage = ({ sections = {}, baseUrl = "" }) => {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header {...(sections.header || {})} baseUrl={baseUrl} />
      <Hero {...(sections.hero || {})} baseUrl={baseUrl} />
      <CategoryGrid {...(sections.categories || {})} baseUrl={baseUrl} />
      <FeaturedProducts {...(sections.featured || {})} baseUrl={baseUrl} limit={3} />
      <Footer {...(sections.footer || {})} baseUrl={baseUrl} />
    </div>
  );
};

export default HomePage;
