'use client';

import React, { useState, useMemo } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import CollectionGrid from '../sections/CollectionGrid';
import { ChevronRight } from 'lucide-react';
import styles from './ProductsPage.module.css';

const ProductsPage = ({ sections = {}, baseUrl = "" }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    const categories = ['all', 'Fonts', 'Graphics', 'Textures', 'Mockups', '3D Assets'];

    const allProducts = useMemo(() => {
        return sections.featured?.products || [];
    }, [sections.featured?.products]);

    const filteredProducts = useMemo(() => {
        let products = [...allProducts];

        if (selectedCategory !== 'all') {
            products = products.filter(p => p.category === selectedCategory);
        }

        if (priceFilter !== 'all') {
            if (priceFilter === 'under-50') products = products.filter(p => p.price < 50);
            else if (priceFilter === '50-100') products = products.filter(p => p.price >= 50 && p.price <= 100);
            else if (priceFilter === 'over-100') products = products.filter(p => p.price > 100);
        }

        if (sortBy === 'price-low') products.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') products.sort((a, b) => b.price - a.price);

        return products;
    }, [allProducts, selectedCategory, priceFilter, sortBy]);

    return (
        <div className={styles.page}>
            <Header {...(sections.header || {})} baseUrl={baseUrl} />

            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Breadcrumbs */}
                    <nav className={styles.breadcrumbs}>
                        <a href={baseUrl || "/"}>Home</a>
                        <ChevronRight size={14} />
                        <span>Products</span>
                    </nav>

                    <header className={styles.header}>
                        <h1 className={styles.title}>Explore Collection</h1>
                        <p className={styles.subtitle}>
                            Premium digital assets and resources for modern design teams.
                        </p>
                    </header>

                    <div className={styles.filtersBar}>
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>Category:</span>
                            <div className={styles.categoryButtons}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                                    >
                                        {cat === 'all' ? 'All Assets' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <div className={styles.filterGroup}>
                                <span className={styles.filterLabel}>Price:</span>
                                <select
                                    className={styles.select}
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                >
                                    <option value="all">Any Price</option>
                                    <option value="under-50">Under $50</option>
                                    <option value="50-100">$50 - $100</option>
                                    <option value="over-100">Over $100</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <span className={styles.filterLabel}>Sort:</span>
                                <select
                                    className={styles.select}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <CollectionGrid products={filteredProducts} baseUrl={baseUrl} />
                    ) : (
                        <div className={styles.noResults}>
                            <h3 className={styles.noResultsTitle}>No products found</h3>
                            <p>Try adjusting your category or price filters.</p>
                            <button
                                className={styles.resetBtn}
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setPriceFilter('all');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer {...(sections.footer || {})} baseUrl={baseUrl} />
        </div>
    );
};

export default ProductsPage;
