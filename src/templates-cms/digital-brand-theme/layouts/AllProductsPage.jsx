'use client';

import React, { useState, useMemo } from 'react';
import Header from '../sections/Header';
import CollectionGrid from '../sections/CollectionGrid';
import Footer from '../sections/Footer';
import { ChevronRight, Filter } from 'lucide-react';

const AllProductsPage = ({ sections = {}, baseUrl = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'Fonts', 'Graphics', 'Textures', 'Mockups', '3D Assets'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...(sections.featured?.products || [])];

    // Apply category filter
    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Apply price filter
    if (priceFilter === '0-25') products = products.filter(p => p.price <= 25);
    else if (priceFilter === '25-50') products = products.filter(p => p.price > 25 && p.price <= 50);
    else if (priceFilter === '50-100') products = products.filter(p => p.price > 50 && p.price <= 100);
    else if (priceFilter === '100+') products = products.filter(p => p.price > 100);

    // Apply sorting
    if (sortBy === 'price-low') products.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') products.sort((a, b) => b.price - a.price);

    return products;
  }, [sections.featured?.products, selectedCategory, priceFilter, sortBy]);

  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} baseUrl={baseUrl} />

      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>
            <a href={baseUrl || "/"} style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <ChevronRight size={14} />
            <span style={{ color: '#0F172A', fontWeight: 500 }}>All Products</span>
          </nav>

          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Explore Our Collection
            </h1>
            <p style={{ color: '#475569', fontSize: '1.125rem', maxWidth: '600px' }}>
              Find the perfect digital assets for your next creative project.
            </p>
          </div>

          {/* Filters and Sorting Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 0',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '2rem',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Category Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginRight: '8px' }}>Category:</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: selectedCategory === cat ? '#6C63FF' : '#E2E8F0',
                        backgroundColor: selectedCategory === cat ? '#6C63FF' : 'white',
                        color: selectedCategory === cat ? 'white' : '#475569',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Price:</span>
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
                  <option value="all">Any Price</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">Over $100</option>
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Sort by:</span>
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
                <option value="newest">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <CollectionGrid
              products={filteredProducts}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.5rem' }}>No products match your criteria</h3>
              <p style={{ color: '#64748B' }}>Try adjusting your filters or category choice.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceFilter('all');
                }}
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
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default AllProductsPage;
