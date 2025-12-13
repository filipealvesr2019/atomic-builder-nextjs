'use client';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './SinglePost.module.css';

export default function SinglePost({
    category = "LIFESTYLE",
    date = "12 DEC 2024",
    title = "The Journey",
    author = "POST AUTHOR",
    comments = "0 COMMENTS",
    mainImage,
    content = [],
    gallery = [],
    quote,
    tags = []
}) {
  return (
    <article className={styles.article}>
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.metaTop}>
                    <span>{category}</span>
                    <span className={styles.divider}>—</span>
                    <span>{date}</span>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.metaBottom}>
                    <span>{author}</span>
                    <span className={styles.dot}>•</span>
                    <span>{comments}</span>
                </div>
            </header>

            {/* Main Image */}
            <div className={styles.mainImageWrapper}>
                <img src={mainImage} alt={title} className={styles.mainImage} />
            </div>

            {/* Content Part 1 */}
            <div className={styles.content}>
                {content.map((p, i) => (
                    <p key={i} className={styles.paragraph}>{p}</p>
                ))}
            </div>

            {/* Gallery */}
            <div className={styles.gallery}>
                {gallery.map((img, i) => (
                    <div key={i} className={styles.galleryItem}>
                        <img src={img} alt="Gallery" className={styles.galleryImg} />
                    </div>
                ))}
            </div>

            {/* Additional Text */}
             <div className={styles.content}>
                 <p className={styles.paragraph}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                 </p>
             </div>

            {/* Quote */}
            {quote && (
                <blockquote className={styles.quoteBlock}>
                    <span className={styles.quoteIcon}>“</span>
                    <p className={styles.quoteText}>{quote}</p>
                    <cite className={styles.quoteAuthor}>— {author}</cite>
                </blockquote>
            )}

            {/* Footer / Tags */}
            <div className={styles.footer}>
                <div className={styles.tags}>
                    <span>TAGS:</span>
                    {tags.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
                </div>
                <div className={styles.share}>
                    <Facebook size={16} /> <Twitter size={16} /> <Instagram size={16} />
                </div>
            </div>

            {/* Reply Form */}
            <div className={styles.replySection}>
                <h3 className={styles.replyTitle}>Leave a Reply</h3>
                <p className={styles.replySubtitle}>Your email address will not be published.</p>
                <form className={styles.form}>
                    <textarea placeholder="Your Comment" className={styles.textarea} rows={5}></textarea>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="Your Name" className={styles.input} />
                        <input type="email" placeholder="Your Email" className={styles.input} />
                    </div>
                    <button type="button" className={styles.button}>POST COMMENT</button>
                </form>
            </div>

        </div>
    </article>
  );
}
