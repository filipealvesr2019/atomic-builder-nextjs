'use client';
import styles from './BlogGrid.module.css';

export default function BlogGrid({ 
    title = "From the Journal",
    posts = []
}) {
    // Fallback posts if none provided via props
    const defaultPosts = [
        { id: 1, title: "Big Day Title One", category: "Wedding", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
        { id: 2, title: "Big Day Title Two", category: "Elopement", image: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1976&auto=format&fit=crop" },
        { id: 3, title: "Big Day Title Three", category: "Engagement", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" }
    ];

    const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section className={styles.blogSection}>
      <h4 className={styles.subtitle}>LATEST POSTS</h4>
      <h2 className={styles.heading}>{title}</h2>
      
      <div className={styles.grid}>
        {displayPosts.map((post, index) => (
            <div key={index} className={styles.card}>
                <div 
                    className={styles.imageWrapper}
                    style={{ backgroundImage: `url(${post.image})` }}
                >
                </div>
                <div className={styles.content}>
                    <span className={styles.category}>{post.category}</span>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}

BlogGrid.cmsConfig = {
    name: "Ava Blog Grid",
    props: {
        title: { type: "string", label: "Title" },
        posts: { 
            type: "array", 
            label: "Blog Posts",
            itemSchema: {
                title: { type: "string", label: "Post Title" },
                category: { type: "string", label: "Category" },
                image: { type: "image", label: "Image" }
            }
        }
    }
};
