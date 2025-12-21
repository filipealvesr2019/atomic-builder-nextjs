'use client';
import styles from './BlogGrid.module.css';

export default function BlogGrid({
    posts = [
        {
            title: "Healthcare podcast",
            excerpt: "Qui obcaecati rerum sit voluptatum laboriosam. Lorem ipsum dolor sit amet.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80",
            category: "AYURVEDA",
            date: "18 OCTOBER 2021",
            comments: "NO COMMENTS"
        },
        // ... more defaults
    ]
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.grid}>
                    {posts.map((post, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                 <img src={post.image} alt={post.title} className={styles.image} />
                                 <span className={styles.tag}>{post.category}</span>
                            </div>
                            <h3 className={styles.title}>{post.title}</h3>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <div className={styles.meta}>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.comments}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

BlogGrid.cmsConfig = {
    name: "Emma Blog Grid",
    props: {
        posts: { 
            type: "array", 
            label: "Blog Posts",
            itemSchema: {
                title: { type: "string", label: "Title" },
                excerpt: { type: "text", label: "Excerpt" },
                image: { type: "image", label: "Image" },
                category: { type: "string", label: "Category Tag" },
                date: { type: "string", label: "Date" },
                comments: { type: "string", label: "Comments Text" }
            }
        }
    }
};
