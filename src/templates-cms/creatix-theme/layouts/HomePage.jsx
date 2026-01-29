import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';

const HomePage = ({ sections = {}, baseUrl = "" }) => {
  const allProducts = sections.featured?.products || [];

  const fonts = allProducts.filter(p => p.category === "Fonts");
  const graphics = allProducts.filter(p => p.category === "Graphics");
  const textures = allProducts.filter(p => p.category === "Textures");

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header {...(sections.header || {})} baseUrl={baseUrl} />
      <Hero {...(sections.hero || {})} baseUrl={baseUrl} />
      <CategoryGrid {...(sections.categories || {})} baseUrl={baseUrl} />
      <FeaturedProducts {...(sections.featured || {})} baseUrl={baseUrl} limit={3} />

      <FeaturedProducts
        title="Premium Fonts"
        products={fonts}
        baseUrl={baseUrl}
        limit={3}
        viewAllLink={`${baseUrl}/category/fonts`}
        viewAllText="Explore Fonts"
        variant="white"
      />

      <FeaturedProducts
        title="Visual Graphics"
        products={graphics}
        baseUrl={baseUrl}
        limit={3}
        viewAllLink={`${baseUrl}/category/graphics`}
        viewAllText="Explore Graphics"
      />

      <FeaturedProducts
        title="Artistic Textures"
        products={textures}
        baseUrl={baseUrl}
        limit={3}
        viewAllLink={`${baseUrl}/category/textures`}
        viewAllText="Explore Textures"
        variant="white"
      />

      <Footer {...(sections.footer || {})} baseUrl={baseUrl} />
    </div>
  );
};

export default HomePage;
