import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback slides if none provided
  const activeSlides = slides && slides.length > 0 ? slides : [
    {
      title: "Móveis Rústicos Artesanais",
      subtitle: "Transforme sua casa com peças únicas",
      description: "Descubra nossa coleção exclusiva de móveis feitos à mão com madeira de qualidade superior.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      buttonText: "Ver Coleção",
      buttonUrl: "#products",
      offer: "Até 30% OFF"
    },
    {
      title: "Iluminação Industrial",
      subtitle: "Estilo moderno para ambientes únicos",
      description: "Luminárias e pendentes que combinam design industrial com funcionalidade.",
      image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&h=600&fit=crop",
      buttonText: "Explorar",
      buttonUrl: "#lighting",
      offer: "Frete Grátis"
    },
    {
      title: "Decoração Artesanal",
      subtitle: "Detalhes que fazem a diferença",
      description: "Vasos, espelhos e objetos decorativos únicos para personalizar seu espaço.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop",
      buttonText: "Comprar Agora",
      buttonUrl: "#decor",
      offer: "Novidades"
    }
  ];

  // Auto-play do slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.heroSection}>
      {/* Slides */}
      <div className={styles.slideContainer}>
        {activeSlides.map((slide, index) => (
          <div
            key={index}
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
                    <a
                      href={slide.buttonUrl || "#"}
                      className={styles.primaryButton}
                    >
                      <ShoppingBag style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
                      {slide.buttonText}
                    </a>
                    <a
                      href="#"
                      className={styles.secondaryButton}
                    >
                      Saiba Mais
                    </a>
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
        {activeSlides.map((_, index) => (
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
          <span className={styles.scrollText}>Role para baixo</span>
          <div className={styles.scrollIcon}>
            <div className={styles.scrollInnerDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.cmsConfig = {
  name: "Hero Slider",
  description: "Slider de imagens com texto e ofertas",
  props: {
    slides: {
      type: 'list',
      label: 'Slides',
      itemType: {
        title: { type: 'string', label: 'Título' },
        subtitle: { type: 'string', label: 'Subtítulo' },
        description: { type: 'string', label: 'Descrição' },
        image: { type: 'image', label: 'Imagem de Fundo' },
        buttonText: { type: 'string', label: 'Texto do Botão' },
        buttonUrl: { type: 'string', label: 'Link do Botão' },
        offer: { type: 'string', label: 'Texto da Oferta' }
      }
    }
  }
};
