import React, { useState } from 'react';
import { Playfair_Display, Open_Sans } from 'next/font/google';
import Header from '../sections/Header';
import PortfolioGrid from '../sections/PortfolioGrid';
import PortfolioSlider from '../sections/PortfolioSlider';
import PortfolioMasonry from '../sections/PortfolioMasonry';
import PortfolioModal from '../sections/PortfolioModal';
import Footer from '../sections/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'] });

export default function PortfolioPage({ sections = {} }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ image: null, allImages: [], index: 0 });

  const handleImageClick = (image, allImages, index) => {
    setModalData({ image, allImages, index });
    setModalOpen(true);
  };

  return (
    <div className={`ava-theme-wrapper ${playfair.className} ${openSans.className}`} style={{ color: '#333', backgroundColor: '#ebeae6' }}>
        <Header {...(sections['header'] || {})} />
        
        <PortfolioGrid 
            {...(sections['portfolio-grid'] || {})} 
            onImageClick={handleImageClick}
        />

        <PortfolioSlider 
            {...(sections['portfolio-slider'] || {})} 
            onImageClick={handleImageClick}
        />

        <PortfolioMasonry 
            {...(sections['portfolio-masonry'] || {})} 
            onImageClick={handleImageClick}
        />

        <PortfolioModal 
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            currentImage={modalData.image}
            allImages={modalData.allImages}
            currentIndex={modalData.index}
        />

        <Footer {...(sections['footer'] || {})} />
    </div>
  );
}
