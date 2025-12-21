import React from 'react';
import Header from '../sections/Header';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';

const CategoryPage = ({ content, categoryName }) => {
  return (
    <div className="digital-brand-theme">
      <Header content={content?.header} />
      <main style={{ paddingTop: '100px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '2rem', color: '#64748B', fontSize: '0.875rem' }}>
            Início &rarr; Categorias &rarr; {categoryName}
          </div>
          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            {categoryName}
          </h1>
          <p style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: '1.25rem', 
            color: '#475569',
            marginBottom: '3rem'
          }}>
            Confira todos os ativos digitais na categoria {categoryName}.
          </p>
        </div>
        <FeaturedProducts content={{
          title: "",
          subtitle: "",
          products: content?.products || []
        }} />
      </main>
      <Footer content={content?.footer} />
    </div>
  );
};

export default CategoryPage;
