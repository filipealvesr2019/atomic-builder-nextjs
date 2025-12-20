'use client';
import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import BlogHero from '../sections/BlogHero';
import BlogGrid from '../sections/BlogGrid';
import InstagramTitle from '../sections/InstagramTitle';

export default function BlogPage({ sections }) {
  const headerProps = sections?.header || {};
  const heroProps = sections?.['blog-hero'] || {};
  const gridProps = sections?.['blog-grid'] || {};
  const instaProps = sections?.['instagram-title'] || {};
  const footerProps = sections?.footer || {};

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#1a1a1a" }}>
      <Header {...headerProps} />
      <BlogHero {...heroProps} />
      <BlogGrid {...gridProps} />
      <div style={{marginTop: 50}}>
        <InstagramTitle {...instaProps} />
      </div>
      <Footer {...footerProps} />
    </div>
  );
}
