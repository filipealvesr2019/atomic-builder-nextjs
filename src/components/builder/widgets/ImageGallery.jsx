import React, { useState } from 'react';
import styles from './ImageGallery.module.css';
import { X } from 'lucide-react';

export default function ImageGallery({ settings }) {
    const {
        images = [],
        layout = 'grid', // grid, masonry, justified
        columns = { desktop: 4, tablet: 2, mobile: 1 },
        gap = '15px',
        aspectRatio = '1/1', // square, video, etc
        rowHeight = '200px',
        objectFit = 'cover',
        borderRadius = '0px',
        shadow = 'none',
        enableLightbox = true,
        caption = false,
        shuffle = false,
        columnGap, // sometimes separated
        rowGap
    } = settings || {};

    // Generate valid images array
    const validImages = Array.isArray(images) 
        ? images.filter(img => img && (typeof img === 'string' ? img : img.src)) 
        : [];
        
    // Default placeholders if empty (12 items for proper Masonry effect)
    const displayImagesList = validImages.length > 0 ? validImages : [
        { src: 'https://placehold.co/400x300/ff7b7b/ffffff?text=1+Landscape', alt: 'Landscape' },
        { src: 'https://placehold.co/300x500/7bff7b/ffffff?text=2+Portrait', alt: 'Portrait' },
        { src: 'https://placehold.co/400x400/7b7bff/ffffff?text=3+Square', alt: 'Square' },
        { src: 'https://placehold.co/300x600/ffb347/ffffff?text=4+Tall', alt: 'Tall' },
        { src: 'https://placehold.co/500x300/c23b22/ffffff?text=5+Wide', alt: 'Wide' },
        { src: 'https://placehold.co/400x500/fdfd96/000000?text=6+Portrait', alt: 'Portrait 2' },
        { src: 'https://placehold.co/300x300/aec6cf/ffffff?text=7+Square', alt: 'Square 2' },
        { src: 'https://placehold.co/400x300/836953/ffffff?text=8+Landscape', alt: 'Landscape 2' },
        { src: 'https://placehold.co/300x400/779ecb/ffffff?text=9+Med+Port', alt: 'Medium Portrait' },
        { src: 'https://placehold.co/600x300/ff6961/ffffff?text=10+Wide', alt: 'Wide 2' },
        { src: 'https://placehold.co/400x400/cb99c9/ffffff?text=11+Square', alt: 'Square 3' },
        { src: 'https://placehold.co/300x500/03c03c/ffffff?text=12+Tall', alt: 'Tall 2' }
    ];
        
    // Shuffle logic
    const displayImages = React.useMemo(() => {
        if (!shuffle) return displayImagesList;
        return [...displayImagesList].sort(() => Math.random() - 0.5);
    }, [displayImagesList, shuffle]);

    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const isOpen = lightboxIndex !== null;

    // if (validImages.length === 0) {
    //    // REMOVED: Now showing placeholders
    // }

    // Helper to get image source string
    const getSrc = (img) => typeof img === 'string' ? img : img.src;
    const getAlt = (img) => typeof img === 'string' ? 'Gallery Image' : (img.alt || 'Gallery Image');
    
    // --- Styles Construction ---
    // We assume the parent renderer passes 'columns' prop resolved for the current view?
    // Actually, WidgetRenderer resolves responsive props IF they are simple values.
    // But 'columns' is an object { desktop, tablet, mobile } generally in settings.
    // We need to know the CURRENT view mode to render the correct column count if we want to do it via inline style 
    // OR we rely on WidgetRenderer resolving `columns` to a single number if we configured the prop to be responsive in Store.
    // However, usually `settings.columns` arrives here as the *resolved* value (e.g. 4) if WidgetRenderer handles it,
    // OR as the object if it doesn't.
    // Let's assume WidgetRenderer resolves it to a number/string if we defined it as such, but for complex objects 
    // we might need to handle it. 
    // **Correction**: WidgetRenderer uses `resolveResponsiveProp`. If `columns` is saved as `{ desktop: 4, mobile: 1 }` 
    // and `viewMode` is 'mobile', `settings.columns` will be `1`. Great!

    const currentCols = settings.columns || 4; 
    const currentGap = gap || '15px';
    const numGap = parseInt(currentGap) || 15;

    // Grid specific styles
    const gridStyle = layout === 'grid' ? {
        gridTemplateColumns: `repeat(${currentCols}, 1fr)`,
        gap: currentGap
    } : {};

    // Masonry specific styles
    // We use CSS columns for lightweight masonry
    const masonryStyle = layout === 'masonry' ? {
        columnCount: currentCols,
        columnGap: currentGap,
        '--gallery-gap': currentGap // used in CSS for margin-bottom
    } : {};

    // Justified specific styles
    const justifiedStyle = layout === 'justified' ? {
        gap: currentGap
    } : {};


    const openLightbox = (index) => {
        if (enableLightbox) setLightboxIndex(index);
    };

    return (
        <div className={styles.galleryContainer}>
            <div 
                className={`${styles[layout]} ${layout === 'grid' ? styles[`ratio_${aspectRatio.replace('/', '_')}`] : ''}`}
                style={{
                    ...gridStyle,
                    ...masonryStyle,
                    ...justifiedStyle
                }}
            >
                {displayImages.map((img, index) => {
                    const src = getSrc(img);
                    const alt = getAlt(img);
                    
                    // Style for individual item logic
                    const itemStyle = {};
                    if (layout === 'justified') {
                        // Trick for justified: flex-grow based on aspect ratio (if known) or just basic 1
                        // Real justified needs image dimensions. 
                        // MVP: Equal height rows, let browser fit. 
                        itemStyle.height = rowHeight;
                        // itemStyle.flexGrow = 1; // Handled in CSS
                    }

                    return (
                        <div 
                            key={index} 
                            className={styles.galleryItem}
                            style={{
                                borderRadius: borderRadius,
                                boxShadow: shadow !== 'none' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                                cursor: enableLightbox ? 'pointer' : 'default',
                                ...itemStyle
                            }}
                            onClick={() => openLightbox(index)}
                        >
                            <img 
                                src={src} 
                                alt={alt} 
                                className={styles.galleryImage} 
                                loading={settings.lazyLoad ? "lazy" : "eager"}
                            />
                            {/* Optional Overlay/Caption */}
                            <div className={styles.overlay}>
                                {caption && (
                                    <div className={styles.caption}>
                                        {getAlt(img)}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <div className={styles.lightboxOverlay} onClick={() => setLightboxIndex(null)}>
                    <button className={styles.closeButton}>
                        <X size={32} />
                    </button>
                    <img 
                        src={getSrc(displayImages[lightboxIndex])} 
                        alt="Lightbox Preview" 
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()} // Prevent close on image click
                    />
                </div>
            )}
        </div>
    );
}
