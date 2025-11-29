'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { blogPosts } from '../../../data/blog'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import styles from './blog-post.module.css'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug

  const post = blogPosts.find(post => post.slug === slug)

  if (!post) {
    return (
      <div className={styles.appContainer}>
        <Header />
        <main style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h1>Post não encontrado</h1>
          <p>O artigo que você está procurando não existe.</p>
          <Link href="/blog" className={styles.backLink}>
            ← Voltar ao Blog
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <Link href="/blog" className={styles.backButton}>
              <ArrowLeft className={styles.backIcon} />
              Voltar ao Blog
            </Link>

            <div className={styles.heroContent}>
              <div className={styles.categoryBadge}>
                {post.category}
              </div>

              <h1 className={styles.title}>{post.title}</h1>

              <p className={styles.excerpt}>{post.excerpt}</p>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>{post.author}</span>
                </div>

                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>{formatDate(post.date)}</span>
                </div>

                <div className={styles.metaItem}>
                  <Clock className={styles.metaIcon} />
                  <span>{post.readTime} min de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className={styles.imageSection}>
          <div className={styles.container}>
            <img
              src={post.image}
              alt={post.title}
              className={styles.featuredImage}
            />
          </div>
        </section>

        {/* Content */}
        <section className={styles.contentSection}>
          <div className={styles.container}>
            <article className={styles.article}>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br>')
                }}
              />
            </article>

            {/* Tags */}
            <div className={styles.tagsSection}>
              <h3>Tags:</h3>
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className={styles.shareSection}>
              <button onClick={sharePost} className={styles.shareButton}>
                <Share2 className={styles.shareIcon} />
                Compartilhar
              </button>
            </div>

            {/* Related Posts */}
            <div className={styles.relatedSection}>
              <h3>Artigos Relacionados</h3>
              <div className={styles.relatedPosts}>
                {blogPosts
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 3)
                  .map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className={styles.relatedPost}
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className={styles.relatedImage}
                      />
                      <div className={styles.relatedContent}>
                        <h4>{relatedPost.title}</h4>
                        <p>{relatedPost.excerpt.substring(0, 100)}...</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}