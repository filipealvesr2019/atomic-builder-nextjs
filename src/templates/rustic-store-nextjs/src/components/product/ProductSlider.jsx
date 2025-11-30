import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
import styles from './ProductSlider.module.css'; // Importar CSS Module

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductSlider = ({ products, title, onAddToCart, onViewDetails }) => {
  return (
    <div className={styles.productSliderSection}>
      <div className={styles.container}>
        {/* Título da Seção */}
        {title && (
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.titleUnderline}></div>
          </div>
        )}

        {/* Slider de Produtos */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.swiperButtonRight}`,
            prevEl: `.${styles.swiperButtonLeft}`,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: `.${styles.swiperPagination}`,
            bulletClass: styles.swiperPaginationBullet,
            bulletActiveClass: styles.swiperPaginationBulletActive,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className={styles.swiperContainer}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botões de Navegação Customizados */}
        <div className={styles.navigationButtons}>
          <button className={`${styles.swiperButton} ${styles.swiperButtonLeft}`}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className={`${styles.swiperButton} ${styles.swiperButtonRight}`}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className={styles.swiperPagination}></div> {/* Elemento para a paginação customizada */}
      </div>
    </div>
  );
};

export default ProductSlider;

