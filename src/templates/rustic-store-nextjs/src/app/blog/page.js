'use client'

import { useState, useMemo } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import BlogCard from '../../components/blog/BlogCard'
import { blogPosts, categories } from '../../data/blog'
import styles from './blog.module.css'

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Blog RusticStore</h1>
              <p className={styles.heroSubtitle}>
                Dicas, tendências e inspirações para seu lar rústico
              </p>
            </div>
          </div>
        </section>

        {/* Filtros e Busca */}
        <section className={styles.filtersSection}>
          <div className={styles.container}>
            <div className={styles.filtersContainer}>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.categoryFilters}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.categoryButtonActive : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts do Blog */}
        <section className={styles.blogSection}>
          <div className={styles.container}>
            {filteredPosts.length > 0 ? (
              <>
                <div className={styles.resultsInfo}>
                  <p>Encontrados {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''}</p>
                </div>

                <div className={styles.blogGrid}>
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.noResults}>
                <h3>Nenhum artigo encontrado</h3>
                <p>Tente ajustar seus filtros de busca.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos')
                    setSearchQuery('')
                  }}
                  className={styles.clearFiltersButton}
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}