'use client';
import styles from './Testimonials.module.css';

export default function Testimonials({ 
    heading = "Showing the Love",
    quote = "Cannot imagine a more perfect photographer. From start to finish, the experience was seamless and the results are breathtaking.",
    author = "Sarah & James",
    avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=264&auto=format&fit=crop"
}) {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <h4 className={styles.subtitle}>KIND WORDS</h4>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.content}>
            <p className={styles.quote}>"{quote}"</p>
            <div className={styles.authorContainer}>
                <img src={avatar} alt={author} className={styles.avatar} />
                <span className={styles.author}>{author}</span>
            </div>
        </div>
      </div>
    </section>
  );
}

Testimonials.cmsConfig = {
    name: "Ava Testimonials",
    props: {
        heading: { type: "string", label: "Heading" },
        quote: { type: "string", label: "Quote", multiline: true },
        author: { type: "string", label: "Author Name" },
        avatar: { type: "image", label: "Author Avatar" }
    }
};
