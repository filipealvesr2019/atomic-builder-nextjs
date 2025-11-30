'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import BlogCard from '../../components/blog/BlogCard'
import { featuredPosts, recentPosts } from '../../data/blog'
import styles from './novidades.module.css'

export default function Novidades() {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Novidades</h1>
              <p className={styles.heroSubtitle}>
                Fique por dentro das últimas tendências, lançamentos e dicas exclusivas
              </p>
            </div>
          </div>
        </section>

        {/* Posts em Destaque */}
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Em Destaque</h2>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.featuredGrid}>
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Posts Recentes */}
        <section className={styles.recentSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Posts Recentes</h2>
              <div className={styles.divider}></div>
            </div>

            <div className={styles.recentGrid}>
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className={styles.viewAllContainer}>
              <a href="/blog" className={styles.viewAllButton}>
                Ver Todos os Artigos →
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>Não Perca Nenhuma Novidade</h2>
              <p className={styles.newsletterDescription}>
                Receba em primeira mão dicas exclusivas, lançamentos e ofertas especiais.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}