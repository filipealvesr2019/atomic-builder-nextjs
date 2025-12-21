import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Benefits from '../sections/Benefits';
import Footer from '../sections/Footer';

const HomePage = ({ content }) => {
  return (
    <div className="digital-brand-theme">
      <Header content={content?.header} />
      <main>
        <Hero content={content?.hero} />
        <CategoryGrid content={content?.categories} />
        <FeaturedProducts content={content?.featured} />
        <Benefits content={content?.benefits} />
      </main>
      <Footer content={content?.footer} />
    </div>
  );
};

export default HomePage;
