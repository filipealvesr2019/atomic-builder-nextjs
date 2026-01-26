'use client';

import React, { useState, useMemo } from 'react';
import Header from '../sections/Header';
import FeaturedProducts from '../sections/FeaturedProducts';
import Footer from '../sections/Footer';
import { ChevronRight, Filter, ChevronDown } from 'lucide-react';

const CategoryPage = ({ sections = {}, categoryId = "Templates" }) => {
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = sections.featured?.products?.filter(p => p.category === categoryId) || [];

    // Apply price filter
    if (priceFilter === '0-25') products = products.filter(p => p.price <= 25);
    else if (priceFilter === '25-50') products = products.filter(p => p.price > 25 && p.price <= 50);
    else if (priceFilter === '50-100') products = products.filter(p => p.price > 50 && p.price <= 100);
    else if (priceFilter === '100+') products = products.filter(p => p.price > 100);

    // Apply sorting
    if (sortBy === 'price-low') products.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') products.sort((a, b) => b.price - a.price);

    return products;
  }, [sections.featured?.products, categoryId, priceFilter, sortBy]);

  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />

      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <ChevronRight size={14} />
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{categoryId}</span>
          </nav>

          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              {categoryId}
            </h1>
            <p style={{ color: '#475569', fontSize: '1.125rem', maxWidth: '600px' }}>
              Browse our selection of {categoryId.toLowerCase()} assets.
            </p>
          </div>

          {/* Filters and Sorting Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '2rem',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={16} color="#64748B" />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>Filter by:</span>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="all">All Prices</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">Over $100</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#0F172A' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <FeaturedProducts
              title=""
              subtitle=""
              products={filteredProducts}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>No products found</h3>
              <p style={{ color: '#64748B' }}>Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={() => setPriceFilter('all')}
                style={{
                  marginTop: '1.5rem',
                  padding: '10px 20px',
                  backgroundColor: '#0F172A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default CategoryPage;
