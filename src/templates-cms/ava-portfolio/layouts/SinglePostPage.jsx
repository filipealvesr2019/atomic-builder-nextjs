'use client';
import React from 'react';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Header from '../sections/Header';
import PostContent from '../sections/PostContent';
import PostSidebar from '../sections/PostSidebar';
import PostRecommendations from '../sections/PostRecommendations';
import Footer from '../sections/Footer';
import styles from './SinglePostPage.module.css';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function SinglePostPage({ sections = {} }) {
  return (
    <div className={`ava-theme-wrapper ${playfair.className} ${openSans.className}`} style={{ color: '#333', backgroundColor: '#fff' }}>
        <Header {...(sections['header'] || {})} />
        
        <main className={styles.mainContent}>
            <div className={styles.container}>
                <div className={styles.layoutGrid}>
                    <div className={styles.postArea}>
                        <PostContent {...(sections['post-content'] || {})} />
                    </div>
                    <aside className={styles.sidebarArea}>
                        <PostSidebar {...(sections['post-sidebar'] || {})} />
                    </aside>
                </div>
            </div>
        </main>

        <PostRecommendations {...(sections['post-recommendations'] || {})} />

        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
