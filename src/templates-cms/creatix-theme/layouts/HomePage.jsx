import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';

const HomePage = ({ content }) => {
  const header = content?.find(c => c.type === 'header')?.props;
  const hero = content?.find(c => c.type === 'hero')?.props;
  const categories = content?.find(c => c.type === 'categories')?.props;
  const featured = content?.find(c => c.type === 'featured')?.props;
  const footer = content?.find(c => c.type === 'footer')?.props;

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
      <Header {...header} />
      <Hero {...hero} />
      <CategoryGrid {...categories} />
      <FeaturedProducts {...featured} />
      <Footer {...footer} />
    </div>
  );
};

export default HomePage;
