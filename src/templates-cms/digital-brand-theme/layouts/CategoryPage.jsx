import React from 'react';
import Header from '../sections/Header';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';
import { ChevronRight } from 'lucide-react';

const CategoryPage = ({ sections = {}, categoryId = "Templates" }) => {
  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />
      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <ChevronRight size={14} />
            <a href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</a>
            <ChevronRight size={14} />
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{categoryId}</span>
          </nav>
          
          <h1 style={{ 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '3rem', 
            fontWeight: 700, 
            color: '#0F172A',
            marginBottom: '1rem'
          }}>
            {categoryId}
          </h1>
          <p style={{ color: '#475569', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px' }}>
            Browse our selection of high-quality products in the {categoryId} category.
          </p>
        </div>

        <FeaturedProducts 
          title="" 
          subtitle="" 
          products={sections.featured?.products?.filter(p => p.category === categoryId) || []} 
        />
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default CategoryPage;
