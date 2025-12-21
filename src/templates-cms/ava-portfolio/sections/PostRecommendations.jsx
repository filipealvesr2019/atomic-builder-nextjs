'use client';
import React from 'react';
import styles from './PostRecommendations.module.css';

export default function PostRecommendations({ 
    title = "You May Also Like",
    posts = [
        { id: 1, title: "Blog Post Title One", date: "JANUARY 5, 2024", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" },
        { id: 3, title: "Blog Post Title Three", date: "JANUARY 3, 2024", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" }
    ]
}) {
  return (
    <section className={styles.postRecommendations}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.grid}>
            {posts.map((post, idx) => (
                <a key={post.id || idx} href={post.link} className={styles.recCard}>
                    <div className={styles.imageWrapper}>
                        <img src={post.image} alt={post.title} className={styles.image} />
                    </div>
                    <div className={styles.meta}>
                        <h4 className={styles.postTitle}>{post.title}</h4>
                        <span className={styles.date}>{post.date}</span>
                    </div>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
}

PostRecommendations.cmsConfig = {
    name: "Post Recommendations",
    props: {
        title: { type: "string", label: "Title" },
        posts: {
            type: "array",
            label: "Recommendations",
            itemSchema: {
                title: { type: "string", label: "Post Title" },
                date: { type: "string", label: "Date" },
                image: { type: "string", label: "Image URL" }
            }
        }
    }
};
