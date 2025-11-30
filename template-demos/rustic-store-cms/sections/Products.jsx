import styles from './Products.module.css';

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Mesa Rústica",
      price: "R$ 1.299,00",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500"
    },
    {
      id: 2,
      name: "Cadeira de Madeira",
      price: "R$ 449,00",
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500"
    },
    {
      id: 3,
      name: "Estante Artesanal",
      price: "R$ 899,00",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500"
    },
    {
      id: 4,
      name: "Banco Rústico",
      price: "R$ 349,00",
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500"
    },
    {
      id: 5,
      name: "Aparador",
      price: "R$ 749,00",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=500"
    },
    {
      id: 6,
      name: "Rack de TV",
      price: "R$ 1.099,00",
      image: "https://images.unsplash.com/photo-1556228578-dd339a145dd9?w=500"
    }
  ];

  return (
    <section id="products" className={styles.products}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos Produtos</h2>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
