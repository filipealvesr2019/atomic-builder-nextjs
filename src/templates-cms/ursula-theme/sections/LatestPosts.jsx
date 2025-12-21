'use client';

import styles from './LatestPosts.module.css';
import Link from 'next/link';

import { useParams } from 'next/navigation';

export default function LatestPosts({ 
  subtitle = "Our Blog",
  title = "Latest Post",
  posts = [],
  forceMobile
}) {
  const params = useParams();
  const demoId = params?.id || 'ursula-demo';

  return (
    <section className={styles.section}>
      <header className={styles.header}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h2 className={styles.title}>{title}</h2>
      </header>
      
      <div className={`${styles.grid} ${forceMobile ? 'ursula-mobile-grid' : ''}`}>
          {posts.map((post, idx) => (
             <article key={idx} className={styles.post}>
                 <Link href={`/admin/demo-preview/${demoId}/post/${post.slug || 'single-post'}`} className={styles.linkWrapper}>
                     <div className={styles.imageContainer}>
                         <div className={styles.dateBadge}>
                             <span className={styles.dateDay}>{post.date}</span>
                             <span className={styles.dateMonth}>{post.month}</span>
                         </div>
                         <img src={post.image} alt={post.title} className={styles.image} />
                     </div>
                     <div className={styles.content}>
                         <span className={styles.category}>{post.category}</span>
                         <h3 className={styles.postTitle}>{post.title}</h3>
                         <p className={styles.excerpt}>{post.excerpt}</p>
                         <button className={styles.readMore}>Read More</button>
                     </div>
                 </Link>
             </article>
          ))}
      </div>
    </section>
  );
}

LatestPosts.cmsConfig = {
    name: "Ursula Latest Posts",
    props: {
        subtitle: { type: "string", label: "Subtitle" },
        title: { type: "string", label: "Title" },
        posts: {
            type: "list",
            label: "Mock Posts",
            itemType: {
                title: { type: "string", label: "Title" },
                category: { type: "string", label: "Category" },
                image: { type: "image", label: "Image" },
                excerpt: { type: "string", label: "Excerpt", multiline: true },
                date: { type: "string", label: "Day" },
                month: { type: "string", label: "Month" }
            }
        }
    }
};
