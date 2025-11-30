import { Calendar, Clock, User } from 'lucide-react'
import styles from './BlogCard.module.css'

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <article className={`${styles.blogCard} ${featured ? styles.featured : ''}`}>
      <div className={styles.imageContainer}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.blogImage}
        />
        <div className={styles.categoryBadge}>
          {post.category}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h3>

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
            <span>{post.readTime} min</span>
          </div>
        </div>

        <div className={styles.tags}>
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        <a href={`/blog/${post.slug}`} className={styles.readMore}>
          Ler mais →
        </a>
      </div>
    </article>
  )
}

export default BlogCard