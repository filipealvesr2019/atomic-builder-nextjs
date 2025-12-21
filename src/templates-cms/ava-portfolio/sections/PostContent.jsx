'use client';
import React from 'react';
import styles from './PostContent.module.css';

export default function PostContent({ 
    title = "Blog Post Title Two",
    category = "COUPLES, WEDDING",
    date = "JANUARY 4, 2024",
    mainImage = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop",
    content = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "Morbi tincidunt, erat ad litora dictumst taciti porta convallis. Pharetra id mi litora sed cras ornare. Venenatis a condimentum vitae sapien pellentesque. Nulla facilisi. In hac habitasse platea dictumst. Sed ac feugiat justo. Aliquam convallis porta convallis."
    ],
    author = {
        name: "Ava",
        bio: "Hi, I'm Ava! If you're new here, welcome! I'm a wedding and portrait photographer based in the Bay Area. I love capturing honest moments and beautiful stories.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
    }
}) {
  return (
    <article className={styles.postContent}>
      <header className={styles.header}>
        <span className={styles.category}>{category}</span>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.date}>{date}</span>
      </header>

      <div className={styles.imageWrapper}>
        <img src={mainImage} alt={title} className={styles.mainImage} />
      </div>

      <div className={styles.body}>
        {content.map((paragraph, idx) => (
            <p key={idx} className={styles.paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.authorSection}>
        <div className={styles.authorImageWrapper}>
            <img src={author.image} alt={author.name} className={styles.authorImage} />
        </div>
        <div className={styles.authorInfo}>
            <h4 className={styles.authorName}>{author.name}</h4>
            <p className={styles.authorBio}>{author.bio}</p>
        </div>
      </div>

      <div className={styles.commentSection}>
        <h3 className={styles.commentTitle}>Leave a Comment</h3>
        <form className={styles.commentForm} onSubmit={(e) => e.preventDefault()}>
            <textarea placeholder="COMMENT" className={styles.textarea}></textarea>
            <div className={styles.inputRow}>
                <input type="text" placeholder="NAME" className={styles.input} />
                <input type="email" placeholder="EMAIL" className={styles.input} />
                <input type="text" placeholder="WEBSITE" className={styles.input} />
            </div>
            <div className={styles.checkboxRow}>
                <input type="checkbox" id="saveInfo" className={styles.checkbox} />
                <label htmlFor="saveInfo" className={styles.checkboxLabel}>Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <button type="submit" className={styles.submitBtn}>SUBMIT</button>
        </form>
      </div>
    </article>
  );
}

PostContent.cmsConfig = {
    name: "Post Content",
    props: {
        title: { type: "string", label: "Title" },
        category: { type: "string", label: "Category" },
        date: { type: "string", label: "Date" },
        mainImage: { type: "string", label: "Main Image URL" },
        content: { type: "array", label: "Content Paragraphs", itemSchema: { type: "string" } },
        author: {
            type: "object",
            label: "Author",
            properties: {
                name: { type: "string", label: "Name" },
                bio: { type: "string", label: "Bio" },
                image: { type: "string", label: "Image URL" }
            }
        }
    }
};
