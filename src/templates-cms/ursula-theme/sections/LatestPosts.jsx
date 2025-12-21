'use client';

import styles from './LatestPosts.module.css';
import Link from 'next/link';

export default function LatestPosts({ 
  subtitle = "Our Blog",
  title = "Latest Post",
  posts = [
    { 
       id: 1, 
       date: "12", 
       month: "Sept", 
       category: "Decoration", 
       title: "The Journey Of A Thousand Miles Begins With A Single Step", 
       excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...",
       image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80"
    },
    { 
       id: 2, 
       date: "10", 
       month: "Sept", 
       category: "Design", 
       title: "Use Lifestyle To Make Someone Fall In Love With You", 
       excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
       image: "https://images.unsplash.com/photo-1595856714088-348e353592c3?w=500&q=80"
    },
    { 
       id: 3, 
       date: "05", 
       month: "Sept", 
       category: "Travel", 
       title: "How To Prove When You're Making A Huge Mistake", 
       excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim...",
       image: "https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?w=500&q=80"
    }
  ],
  forceMobile
}) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h2 className={styles.title}>{title}</h2>
      </header>
      
      <div className={`${styles.grid} ${forceMobile ? 'ursula-mobile-grid' : ''}`}>
          {posts.map((post, idx) => (
             <article key={idx} className={styles.post}>
                 <Link href="/admin/demo-preview/ursula-demo/single-post" className={styles.linkWrapper}>
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
