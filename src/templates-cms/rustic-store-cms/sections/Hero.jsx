import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero(props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default slides if not provided via props (CMS not fully list-capable yet)
  const defaultSlides = [
    {
      id: 1,
      title: "Handmade Rustic Furniture",
      subtitle: "Transform your home with unique pieces",
      description: "Discover our exclusive collection of handmade furniture with superior quality wood.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      buttonText: "View Collection",
      offer: "Up to 30% OFF"
    },
    {
      id: 2,
      title: "Industrial Lighting",
      subtitle: "Modern style for unique environments",
      description: "Lamps and pendants that combine industrial design with functionality.",
      image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&h=600&fit=crop",
      buttonText: "Explore",
      offer: "Free Shipping"
    },
    {
      id: 3,
      title: "Handmade Decor",
      subtitle: "Details that make the difference",
      description: "Vases, mirrors, and unique decorative objects to personalize your space.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop",
      buttonText: "Shop Now",
      offer: "New Arrivals"
    }
  ];

  const slides = props.slides || defaultSlides;

  // Auto-play do slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.heroSection}>
      {/* Slides */}
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`${styles.slide} ${index === currentSlide ? styles.slideVisible : styles.slideHidden}`}
          >
            {/* Background Image */}
            <div
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.overlay}></div>
            </div>

            {/* Content */}
            <div className={styles.contentContainer}>
              <div className={styles.container}>
                <div className={styles.content}>
                  {/* Offer Badge */}
                  {slide.offer && (
                    <div className={styles.offerBadge}>
                      {slide.offer}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className={styles.title}>
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <h2 className={styles.subtitle}>
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className={styles.description}>
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className={styles.ctaButtons}>
                    <button
                      className={styles.primaryButton}
                    >
                      <ShoppingBag style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
                      {slide.buttonText}
                    </button>
                    <button
                      className={styles.secondaryButton}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`${styles.navArrow} ${styles.navArrowLeft}`}
      >
        <ChevronLeft style={{ height: '1.5rem', width: '1.5rem' }} />
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.navArrow} ${styles.navArrowRight}`}
      >
        <ChevronRight style={{ height: '1.5rem', width: '1.5rem' }} />
      </button>

      {/* Dots Indicator */}
      <div className={styles.dotsIndicator}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollIndicatorContent}>
          <span className={styles.scrollText}>Scroll Down</span>
          <div className={styles.scrollIcon}>
            <div className={styles.scrollInnerDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.cmsConfig = {
  name: "Hero Section (Slider)",
  description: "Featured slider with autoplay and animations",
  props: {
    // Basic props configuration, although 'slides' list is complex to edit individually right now
    // We can expose the first slide's properties for simple editing as a fallback
    title: {
        type: "string",
        label: "Title (Slide 1)",
        default: "Handmade Rustic Furniture"
    },
    subtitle: {
        type: "string",
        label: "Subtitle (Slide 1)",
        default: "Transform your home with unique pieces"
    }
  }
};
