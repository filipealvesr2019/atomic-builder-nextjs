'use client';
import React from 'react';
import styles from './PostSidebar.module.css';

export default function PostSidebar({ 
    author = {
        name: "Ava",
        bio: "I love capturing honest moments and beautiful stories through my lens.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    },
    instagramImages = [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop"
    ],
    recentPosts = [
        { id: 1, title: "Blog Post Title One", date: "JANUARY 5, 2024", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop" },
        { id: 2, title: "Blog Post Title Two", date: "JANUARY 4, 2024", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=200&auto=format&fit=crop" },
        { id: 3, title: "Blog Post Title Three", date: "JANUARY 3, 2024", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop" }
    ]
}) {
  return (
    <aside className={styles.postSidebar}>
      {/* About Section */}
      <div className={styles.widget}>
        <div className={styles.aboutBox}>
            <div className={styles.aboutImageWrapper}>
                <img src={author.image} alt={author.name} className={styles.aboutImage} />
            </div>
            <h4 className={styles.widgetTitle}>Hi I'm {author.name}</h4>
            <p className={styles.aboutBio}>{author.bio}</p>
            <a href="#" className={styles.moreLink}>READ MORE</a>
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.widget}>
        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="SEARCH" className={styles.searchInput} />
            <button type="submit" className={styles.searchBtn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
        </form>
      </div>

      {/* Instagram Grid */}
      <div className={styles.widget}>
        <div className={styles.instagramGrid}>
            {instagramImages.map((img, idx) => (
                <div key={idx} className={styles.instaItem}>
                    <img src={img} alt="Instagram" className={styles.instaImg} />
                </div>
            ))}
        </div>
        <p className={styles.instaHandle}>@AVAPORTFOLIO</p>
      </div>

      {/* Current Location */}
      <div className={styles.widget}>
        <div className={styles.locationBox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <h4 className={styles.locationTitle}>Current Location</h4>
            <p className={styles.locationDetail}>SAN FRANCISCO, CA</p>
        </div>
      </div>

      {/* Categories / Links */}
      <div className={styles.widget}>
        <ul className={styles.catList}>
            <li><a href="#">THE EXPERIENCE</a></li>
            <li><a href="#">INVESTMENT</a></li>
            <li><a href="#">DESTINATIONS</a></li>
            <li><a href="#">WEDDINGS</a></li>
        </ul>
      </div>

      {/* Recent Posts */}
      <div className={styles.widget}>
        <h4 className={styles.widgetTitle}>Recent Posts</h4>
        <div className={styles.recentPosts}>
            {recentPosts.map(post => (
                <div key={post.id} className={styles.recentItem}>
                    <div className={styles.recentImgWrapper}>
                        <img src={post.image} alt={post.title} className={styles.recentImg} />
                    </div>
                    <div className={styles.recentInfo}>
                        <h5 className={styles.recentTitle}>{post.title}</h5>
                        <span className={styles.recentDate}>{post.date}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </aside>
  );
}

PostSidebar.cmsConfig = {
    name: "Post Sidebar",
    props: {
        author: {
            type: "object",
            label: "Author",
            properties: {
                name: { type: "string", label: "Name" },
                bio: { type: "string", label: "Bio" },
                image: { type: "string", label: "Image URL" }
            }
        },
        instagramImages: { type: "array", label: "Instagram Images", itemSchema: { type: "string" } },
        recentPosts: {
            type: "array",
            label: "Recent Posts",
            itemSchema: {
                title: { type: "string", label: "Post Title" },
                date: { type: "string", label: "Date" },
                image: { type: "string", label: "Image URL" }
            }
        }
    }
};
