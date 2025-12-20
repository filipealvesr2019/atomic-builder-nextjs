'use client';
import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AboutIntro from '../sections/AboutIntro';
import AboutStory from '../sections/AboutStory';
import AboutThings from '../sections/AboutThings';
import AboutBehindScenes from '../sections/AboutBehindScenes';
import AboutPassion from '../sections/AboutPassion';
import Quote from '../sections/Quote';

export default function AboutPage({ sections }) {
  const headerProps = sections?.header || {};
  const introProps = sections?.['about-intro'] || {};
  const storyProps = sections?.['about-story'] || {};
  const thingsProps = sections?.['about-things'] || {};
  const behindProps = sections?.['about-behind'] || {};
  const quoteProps = sections?.['about-quote'] || {};
  const passionProps = sections?.['about-passion'] || {};
  const footerProps = sections?.footer || {};

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#1a1a1a" }}>
      <Header {...headerProps} />
      <AboutIntro {...introProps} />
      <AboutStory {...storyProps} />
      <AboutThings {...thingsProps} />
      <AboutBehindScenes {...behindProps} />
      <div style={{backgroundColor: '#e67e22', padding: '60px 20px'}}> 
          <Quote {...quoteProps} style={{color: 'white', fontSize: '2rem', fontStyle: 'italic', fontFamily: 'Playfair Display, serif'}}/>
      </div>
      <AboutPassion {...passionProps} />
      <Footer {...footerProps} />
    </div>
  );
}
