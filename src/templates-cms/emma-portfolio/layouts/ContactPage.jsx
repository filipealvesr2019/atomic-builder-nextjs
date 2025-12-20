'use client';
import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import ContactHero from '../sections/ContactHero';
import ContactFormSection from '../sections/ContactFormSection';
import ContactInfoBar from '../sections/ContactInfoBar';

export default function ContactPage({ sections }) {
  const headerProps = sections?.header || {};
  const heroProps = sections?.['contact-hero'] || {};
  const formSectionProps = sections?.['contact-form-section'] || {};
  const infoBarProps = sections?.['contact-info-bar'] || {};
  const footerProps = sections?.footer || {};
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#1a1a1a" }}>
      <Header {...headerProps} />
      <ContactHero {...heroProps} />
      <ContactFormSection {...formSectionProps} />
      <ContactInfoBar {...infoBarProps} />
      <Footer {...footerProps} />
    </div>
  );
}
