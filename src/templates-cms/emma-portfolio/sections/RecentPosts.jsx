'use client';
import styles from './RecentPosts.module.css';

export default function RecentPosts({
    title = "Recent posts",
    subtitle = "From the blog",
    posts = []
}) {
    return (
        <section className={styles.posts}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.subtitle}>{subtitle}</span>
            <div className={styles.grid}>
                {posts.map((post, index) => (
                    <div key={index} className={styles.card}>
                         {post.image ? (
                           <img src={post.image} alt={post.title} className={styles.image} />
                        ) : (
                           <div style={{height:'250px', background:'#eee', marginBottom:'20px'}}></div>
                        )}
                        <h3 className={styles.postTitle}>{post.title}</h3>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <a href={post.link} className={styles.link}>Read More</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

RecentPosts.cmsConfig = {
    name: "Emma Recent Posts",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        posts: {
            type: "array",
            label: "Posts",
            itemSchema: {
                title: { type: "string", label: "Title" },
                excerpt: { type: "text", label: "Excerpt" },
                link: { type: "string", label: "Link" },
                image: { type: "image", label: "Image" }
            }
        }
    }
};
