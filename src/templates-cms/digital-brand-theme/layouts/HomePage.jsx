import React from 'react';
import Header from '../sections/Header';
import Hero from '../sections/Hero';
import CategoryGrid from '../sections/CategoryGrid';
import FeaturedProducts from '../sections/FeaturedProducts';
import Benefits from '../sections/Benefits';
import Footer from '../sections/Footer';

const HomePage = ({ sections = {}, forceMobile = false, baseUrl = "" }) => {
  return (
    <div className={`digital-brand-theme ${forceMobile ? 'force-mobile' : ''}`}>
      <Header {...(sections.header || {})} baseUrl={baseUrl} />
      <main>
        <Hero {...(sections.hero || {})} baseUrl={baseUrl} />
        <CategoryGrid {...(sections.categories || {})} baseUrl={baseUrl} />
        <FeaturedProducts {...(sections.featured || {})} baseUrl={baseUrl} />

        {/* Category Showcases */}
        {(() => {
          const allProducts = sections.featured?.products || [];
          const assets3D = allProducts.filter(p => p.category === '3D Assets');
          const fonts = allProducts.filter(p => p.category === 'Fonts');
          const graphics = allProducts.filter(p => p.category === 'Graphics');

          return (
            <>
              {assets3D.length > 0 && (
                <FeaturedProducts
                  title="3D Assets"
                  subtitle="Premium 3D models and renders"
                  products={assets3D}
                  exploreLink={`${baseUrl}/category/3d-assets`}
                  baseUrl={baseUrl}
                />
              )}
              {fonts.length > 0 && (
                <FeaturedProducts
                  title="Fonts"
                  subtitle="Unique typefaces for your brand"
                  products={fonts}
                  exploreLink={`${baseUrl}/category/fonts`}
                  baseUrl={baseUrl}
                />
              )}
              {graphics.length > 0 && (
                <FeaturedProducts
                  title="Graphics"
                  subtitle="Vectors, illustrations, and more"
                  products={graphics}
                  exploreLink={`${baseUrl}/category/graphics`}
                  baseUrl={baseUrl}
                />
              )}
            </>
          );
        })()}
        <Benefits {...(sections.benefits || {})} baseUrl={baseUrl} />
      </main>
      <Footer {...(sections.footer || {})} baseUrl={baseUrl} />
    </div>
  );
};

export default HomePage;
