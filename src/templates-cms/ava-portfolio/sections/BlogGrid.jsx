'use client';
import React from 'react';
import styles from './BlogGrid.module.css';

export default function BlogGrid({ 
    title = "From the Journal",
    subtitle = "READ THE LATEST",
    posts = [
        { 
            id: 1, 
            title: "Wedding Day at the Cliffs", 
            category: "WEDDING, COASTAL", 
            date: "JANUARY 5, 2024", 
            image: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1600&auto=format&fit=crop",
            link: "/admin/store/preview/ava-portfolio/blog-post"
        },
        { 
            id: 2, 
            title: "The Art of Natural Light", 
            category: "PHOTOGRAPHY, TIPS", 
            date: "JANUARY 4, 2024", 
            image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop",
            link: "/admin/store/preview/ava-portfolio/blog-post"
        },
        { 
            id: 3, 
            title: "Mountain Elopement Guide", 
            category: "ELOPEMENT, TRAVEL", 
            date: "JANUARY 3, 2024", 
            image: "https://images.unsplash.com/photo-1522673607200-164883eeca48?q=80&w=1600&auto=format&fit=crop",
            link: "/admin/store/preview/ava-portfolio/blog-post"
        }
    ]
}) {
  return (
    <section className={styles.blogGridSection}>
      <div className={styles.container}>
        <div className={styles.header}>
            <span className={styles.subtitle}>{subtitle}</span>
            <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.grid}>
            {posts.map((post, idx) => (
                <a key={post.id || idx} href={post.link} className={styles.postCard}>
                    <div className={styles.imageWrapper}>
                        <img src={post.image} alt={post.title} className={styles.image} />
                    </div>
                    <div className={styles.postMeta}>
                        <span className={styles.category}>{post.category}</span>
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        {post.date && <span className={styles.date}>{post.date}</span>}
                    </div>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
}

BlogGrid.cmsConfig = {
    name: "Ava Blog Grid",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        posts: {
            type: "array",
            label: "Posts",
            itemSchema: {
                title: { type: "string", label: "Post Title" },
                category: { type: "string", label: "Category" },
                date: { type: "string", label: "Date" },
                image: { type: "string", label: "Image URL" },
                link: { type: "string", label: "Link" }
            }
        }
    }
};
