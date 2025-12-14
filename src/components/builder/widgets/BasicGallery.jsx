import React, { useState, useEffect } from 'react';
import styles from './BasicGallery.module.css';
import { X } from 'lucide-react';

export default function BasicGallery({ settings }) {
    const {
        images = [],
        columns = { desktop: 4, tablet: 3, mobile: 1 },
        spacing = '10px',
        isLink = 'media', // none, media, custom
        aspectRatio = '1/1', // 1/1, 4/3, 16/9, or 'auto'
        showCaption = 'none', // none, title, caption
        
        // Styles
        hoverAnimation = 'none', // zoom, grow, shrink, fade
        
        // Image Styles
        borderType = 'none',
        borderWidth = '0px',
        borderColor = '#000',
        borderRadius = '0px',
        boxShadow = 'none',
        
    } = settings || {};

    // --- Responsive Columns Logic ---
    const [currentColumns, setCurrentColumns] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let count = 4;
            if (typeof columns === 'object' && columns !== null) {
                if (width >= 1024) count = parseInt(columns.desktop) || 4;
                else if (width >= 768) count = parseInt(columns.tablet) || 3;
                else count = parseInt(columns.mobile) || 1;
            } else {
                count = parseInt(columns) || 4;
            }
            if (count < 1) count = 1;
            setCurrentColumns(count);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [columns]);


    // --- Data Preparation ---
    const validImages = Array.isArray(images) 
        ? images.filter(img => img && (typeof img === 'string' ? img : img.src)) 
        : [];

    const displayImages = validImages.length > 0 ? validImages : [
        { src: 'https://placehold.co/600x600?text=Image+1', alt: 'Image 1' },
        { src: 'https://placehold.co/600x600?text=Image+2', alt: 'Image 2' },
        { src: 'https://placehold.co/600x600?text=Image+3', alt: 'Image 3' },
        { src: 'https://placehold.co/600x600?text=Image+4', alt: 'Image 4' },
    ];

    // --- Lightbox ---
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const handleImageClick = (index, img) => {
        if (isLink === 'media') {
            setLightboxIndex(index);
        } else if (isLink === 'custom' && img.link) {
            window.location.href = img.link;
        }
        // 'none' does nothing
    };

    // --- Helpers ---
    const getSrc = (img) => typeof img === 'string' ? img : img.src;
    const getAlt = (img) => typeof img === 'string' ? '' : (img.alt || '');
    const getCaption = (img) => {
        if (showCaption === 'title') return img.title || getAlt(img);
        if (showCaption === 'caption') return img.caption || '';
        return '';
    };

    // --- Render ---
    return (
        <div className={styles.galleryContainer}>
            <div 
                className={styles.galleryGrid}
                style={{
                    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
                    gap: spacing,
                }}
            >
                {displayImages.map((img, index) => {
                    const src = getSrc(img);
                    const captionText = getCaption(img);
                    
                    return (
                        <div 
                            key={index}
                            className={`${styles.galleryItem} ${hoverAnimation !== 'none' ? styles[`anim_${hoverAnimation}`] : ''}`}
                            style={{
                                aspectRatio: aspectRatio === 'auto' ? 'auto' : aspectRatio,
                                borderRadius: borderRadius,
                                boxShadow: boxShadow !== 'none' ? '0px 0px 10px rgba(0,0,0,0.2)' : 'none', // Simplify shadow for now or use real prop if passed as string
                                border: borderType !== 'none' ? `${borderWidth} ${borderType} ${borderColor}` : 'none'
                             }}
                            onClick={() => handleImageClick(index, img)}
                        >
                            <img 
                                src={src} 
                                alt={getAlt(img)} 
                                className={styles.galleryImage}
                                style={{
                                    borderRadius: borderRadius // Apply to image as well if container has it
                                }}
                            />
                            {showCaption !== 'none' && captionText && (
                                <div className={styles.caption}>{captionText}</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Overlay */}
            {lightboxIndex !== null && (
                <div className={styles.lightboxOverlay} onClick={() => setLightboxIndex(null)}>
                    <button className={styles.closeButton}>
                         <X size={32} />
                    </button>
                    <img 
                        src={getSrc(displayImages[lightboxIndex])}
                        alt="Lightbox"
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
