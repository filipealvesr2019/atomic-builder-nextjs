import React from 'react';
import Header from '../sections/Header';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';

const AllProductsPage = ({ sections = {} }) => {
  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />
      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#0F172A',
            marginBottom: '3rem'
          }}>
            Our Products
          </h1>
        </div>
        <FeaturedProducts 
          title="" 
          subtitle="Explore our full collection of digital assets." 
          products={sections.featured?.products || []} 
        />
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default AllProductsPage;
