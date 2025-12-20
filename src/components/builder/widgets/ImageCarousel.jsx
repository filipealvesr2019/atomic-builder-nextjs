import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ImageCarousel.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarousel({ settings }) {
    const {
        images = [],
        height = '400px',
        objectFit = 'cover',
        autoplay = true,
        autoplaySpeed = 3000,
        loop = true,
        showArrows = true,
        showDots = true,
        arrowColor = '#fff',
        arrowBg = 'rgba(0,0,0,0.5)',
        dotColor = 'rgba(0,0,0,0.5)',
        dotActiveColor = '#000',
        gap = '0px',
        borderRadius = '0px',
        shadow = 'none',
        // Responsive settings often come as objects { desktop: X, tablet: Y, mobile: Z } or resolved values
        // For this component, we'll try to use a simple window width check or assume `settings.slidesPerView` is already resolved by the renderer if it supports it.
        // However, standard renderer might not resolve it dynamically on resize if not set up.
        // We'll implement a basic internal responsive check.
        slidesPerView = { desktop: 1, tablet: 1, mobile: 1 },
    } = settings || {};

    // --- State and Refs ---
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isTransitioning, setIsTransitioning] = useState(false);
    const trackRef = useRef(null);
    const intervalRef = useRef(null);
    
    // Responsive Logic
    const [visibleSlides, setVisibleSlides] = useState(1);
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let count = 1;

            // Robust parsing
            if (typeof slidesPerView === 'object' && slidesPerView !== null) {
                 if (width >= 1024) count = parseInt(slidesPerView.desktop) || 1;
                 else if (width >= 768) count = parseInt(slidesPerView.tablet) || 1;
                 else count = parseInt(slidesPerView.mobile) || 1;
            } else {
                count = parseInt(slidesPerView) || 1;
            }
            if (count < 1) count = 1;
            setVisibleSlides(count);
        };
        
        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [slidesPerView]);


    // --- Data Preparation (Infinite Loop) ---
    // 1. Handle potential responsive wrapper for images
    let rawImages = images;
    if (!Array.isArray(images) && typeof images === 'object' && images !== null) {
        rawImages = images.desktop || images.mobile || [];
    }
    if (!Array.isArray(rawImages)) rawImages = [];

    // Filter valid images only
     const validImages = rawImages.filter(img => img && (typeof img === 'string' ? img : img.src));

    // If no images, show placeholder
    const displayList = validImages.length > 0 ? validImages : [
        { src: 'https://placehold.co/800x400?text=Slide+1', alt: 'Slide 1' },
        { src: 'https://placehold.co/800x400?text=Slide+2', alt: 'Slide 2' },
        { src: 'https://placehold.co/800x400?text=Slide+3', alt: 'Slide 3' }
    ];

    const totalSlides = displayList.length;
    
    // We clone slides to create the infinite effect.
    // Simplest Infinite Strategy: clone first set to end, last set to start.
    // But for "centered" or multi-view, we might need more clones.
    // Let's use a "centered buffer" strategy.
    // Actually, simpler strategy for React without complex math: 
    // Just maintain an index that can go from -1 to length.
    
    // We will use standard "Infinite Clone" approach:
    // [Clone Last] ... [Originals] ... [Clone First]
    // Index 0 maps to [Original 0]
    // We actually render: [Last Clone] [Orig 0] ... [Orig N-1] [First Clone]
    // So the internal "track index" is (currentIndex + 1)
    
    const extendedSlides = loop 
        ? [displayList[totalSlides - 1], ...displayList, displayList[0]]
        : displayList;

    // --- Helper for Image Src ---
    const getSrc = (img) => typeof img === 'string' ? img : img.src;
    const getAlt = (img) => typeof img === 'string' ? 'Slide' : (img.alt || 'Slide');


    // --- Navigation Handlers ---
    const handleNext = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    }, [isTransitioning]);

    const handlePrev = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    }, [isTransitioning]);

    const goToSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    // --- Transition End Logic (The "Infinite Jump") ---
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        // If we moved past the last real slide (to the first clone)
        if (currentIndex >= totalSlides) {
            // Jump back to real first slide (index 0) WITHOUT transition
            // Note: We need a way to 'snap' without transition.
            // React state update will trigger re-render. We need to disable transition momentarily.
            // But we can't easily do that with simple state.
            // WAIT! The standard React way is:
            // 1. Transition to 'Clone First' (index `totalSlides`)
            // 2. On transitionEnd, silently snap `currentIndex` to 0.
            setCurrentIndex(0); 
        } 
        // If we moved before the first real slide (to the last clone)
        else if (currentIndex < 0) {
            setCurrentIndex(totalSlides - 1);
        }
    };
    
    // HOWEVER! The standard `handleTransitionEnd` fires on the DOM element. 
    // If we use inline styles with `transition`, we can catch it.
    // BUT! Since we update state inside the event handler, it will trigger a re-render.
    // If `currentIndex` changes from `totalSlides` to `0`, the style will change.
    // We need to ensure that specific update is NOT animated.
    
    // Let's refine the loop strategy:
    // We only force `transition: none` when snapping.
    // We can use a ref `isSnapping`? No, state is better for rendering styles.
    
    // Actually, `isTransitioning` is not enough. We need `disableAnimation`.
    const [disableAnimation, setDisableAnimation] = useState(false);

    useEffect(() => {
        if (loop) {
             if (currentIndex >= totalSlides) {
                // We just finished animating to the clone. Now snap back.
                // We depend on `handleTransitionEnd` to set this state? 
                // No, we do it in `useEffect`? 
                // Wait. The flow is: 
                // 1. Click Next -> index increases -> Render with animation.
                // 2. Transition Ends -> Check index.
                // 3. If index is out of bounds -> Set index to valid, AND disable animation.
                // 4. Render (snapped).
                // 5. Restore animation for next click.
            }
        }
    }, [currentIndex, totalSlides, loop]);

    // Refined "Simple" Infinite Loop:
    // We won't use the complexity of `onTransitionEnd` + State + Snap in this strict React flow if we can avoid it.
    // But to get it smooth, we must.
    
    // Let's trust the `onTransitionEnd` handler on the track div.
    
    const onTrackTransitionEnd = () => {
        setIsTransitioning(false);
        if (!loop) return;

        if (currentIndex >= totalSlides) {
            setDisableAnimation(true);
            setCurrentIndex(0);
             // We need to re-enable animation after the snap renders.
             // setTimeout(..., 50) is a common hack.
             requestAnimationFrame(() => {
                 requestAnimationFrame(() => {
                     setDisableAnimation(false);
                 });
             });
        } else if (currentIndex < 0) {
            setDisableAnimation(true);
            setCurrentIndex(totalSlides - 1);
             requestAnimationFrame(() => {
                 requestAnimationFrame(() => {
                     setDisableAnimation(false);
                 });
             });
        }
    };


    // --- Autoplay ---
    useEffect(() => {
        if (autoplay && !isTransitioning) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, parseInt(autoplaySpeed));
        }
        return () => clearInterval(intervalRef.current);
    }, [autoplay, autoplaySpeed, handleNext, isTransitioning]); // Re-create if transitioning logic changes

    const stopAutoplay = () => clearInterval(intervalRef.current);
    const startAutoplay = () => {
        if (autoplay && !intervalRef.current) {
            intervalRef.current = setInterval(handleNext, parseInt(autoplaySpeed));
        }
    };


    // --- Calculation for Translate ---
    // Correct calculation for Translate
    // translateX(%) is relative to the TRACK width, not the container.
    // Each slide occupies (100 / extendedSlides.length)% of the track.
    
    // Effective index (considering clone at start if loop is true)
    const effectiveIndex = loop ? currentIndex + 1 : currentIndex;
    
    // Slide percentage width relative to the track
    const slidePerTrackPct = 100 / extendedSlides.length;
    
    const translatePct = -(effectiveIndex * slidePerTrackPct);
    
    const trackStyle = {
        transform: `translateX(${translatePct}%)`,
        transition: disableAnimation ? 'none' : 'transform 0.5s ease-in-out',
        width: `${(extendedSlides.length / visibleSlides) * 100}%`
    };


    const {
        align = 'left',
        width = ''
    } = settings || {};

    const alignVal = align || 'left';
    const isJustified = alignVal === 'stretch';

    const wrapperStyle = {
        display: 'flex',
        justifyContent: alignVal === 'center' ? 'center' : alignVal === 'right' ? 'flex-end' : 'flex-start',
        width: '100%',
        boxSizing: 'border-box'
    };

    const containerStyle = {
        height: height, 
        borderRadius: borderRadius, 
        boxShadow: shadow,
        width: isJustified ? '100%' : (width || 'auto'),
        maxWidth: '100%',
        display: isJustified ? 'block' : 'inline-block'
    };

    return (
        <div style={wrapperStyle} className="image-carousel-wrapper">
            <div 
                className={styles.carouselContainer} 
                style={containerStyle}
                onMouseEnter={stopAutoplay}
                onMouseLeave={startAutoplay}
            >
            <div 
                className={styles.carouselTrack}
                ref={trackRef}
                style={trackStyle}
                onTransitionEnd={onTrackTransitionEnd}
            >
                {extendedSlides.map((img, idx) => (
                    <div 
                        key={idx} 
                        className={styles.slide}
                        style={{ 
                            width: `${100 / extendedSlides.length}%`, // Relative to track
                            paddingLeft: parseInt(gap)/2 + 'px',
                            paddingRight: parseInt(gap)/2 + 'px',
                        }}
                    >
                         <img 
                            src={getSrc(img)} 
                            alt={getAlt(img)} 
                            className={styles.slideImage} 
                            style={{ objectFit: objectFit, borderRadius: borderRadius }}
                            draggable={false}
                        />
                         {/* Optional Caption Overlay */}
                         {(typeof img !== 'string' && img.caption) && (
                            <div className={styles.overlay}>{img.caption}</div>
                         )}
                    </div>
                ))}
            </div>

            {/* Arrows */}
            {showArrows && (
                <>
                    <button 
                        className={`${styles.navButton} ${styles.prevButton}`} 
                        onClick={handlePrev}
                        disabled={!loop && currentIndex <= 0}
                        style={{ backgroundColor: arrowBg, color: arrowColor, borderRadius: '50%', width: '40px', height: '40px' }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        className={`${styles.navButton} ${styles.nextButton}`} 
                        onClick={handleNext}
                        disabled={!loop && currentIndex >= totalSlides - visibleSlides} // Fix logic for non-loop bound
                         style={{ backgroundColor: arrowBg, color: arrowColor, borderRadius: '50%', width: '40px', height: '40px' }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Pagination */}
            {showDots && (
                <div className={styles.pagination}>
                    {displayList.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot}`}
                            onClick={() => goToSlide(idx)}
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: (loop ? (currentIndex < 0 ? totalSlides -1 : (currentIndex >= totalSlides ? 0 : currentIndex)) : currentIndex) === idx ? dotActiveColor : dotColor
                            }}
                        />
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
