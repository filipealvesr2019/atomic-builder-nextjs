import React from 'react';
import Header from '../sections/Header';
import FeaturedProducts from '../sections/FeaturedProducts'; // Reuse product grid logic
import Footer from '../sections/Footer';

const AllProductsPage = ({ content }) => {
  return (
    <div className="digital-brand-theme">
      <Header content={content?.header} />
      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#0F172A',
            marginBottom: '3rem'
          }}>
            Nossos Produtos
          </h1>
        </div>
        <FeaturedProducts content={{
          title: "",
          subtitle: "Explore nossa coleção completa de ativos digitais.",
          products: content?.products || []
        }} />
      </main>
      <Footer content={content?.footer} />
    </div>
  );
};

export default AllProductsPage;
