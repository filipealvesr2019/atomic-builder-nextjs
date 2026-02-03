import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ content }) {
    const { text, newsletterTitle, newsletterText } = content || {
        text: '© 2024 Lumina.',
        newsletterTitle: 'Join the list',
        newsletterText: 'Updates, news, and more.'
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.column}>
                    <h3>LUMINA.</h3>
                    <p style={{ color: '#BDBDBD', lineHeight: 1.6, maxWidth: '300px' }}>
                        Clean, conscious skincare formulated to restore your skin's natural balance and glow.
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Shop</h3>
                    <ul className={styles.links}>
                        <li><a href="#">Skincare</a></li>
                        <li><a href="#">Body</a></li>
                        <li><a href="#">Sets</a></li>
                        <li><a href="#">Gift Cards</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>About</h3>
                    <ul className={styles.links}>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Ingredients</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>{newsletterTitle}</h3>
                    <p style={{ color: '#BDBDBD', marginBottom: '1.5rem' }}>{newsletterText}</p>
                    <input type="email" placeholder="Email address" className={styles.newsletterInput} />
                    <button className={styles.submitBtn}>Subscribe</button>
                </div>
            </div>

            <div className={styles.bottom}>
                <span>{text}</span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <span>Instagram</span>
                    <span>TikTok</span>
                </div>
            </div>
        </footer>
    );
}
