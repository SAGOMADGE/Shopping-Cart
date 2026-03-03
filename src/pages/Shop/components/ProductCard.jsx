import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { title, price, image, category } = product;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>{Number(price).toFixed(2)}</span>
        <button className={styles.addBtn}>Add to Cart</button>
      </div>
    </article>
  );
};

export default ProductCard;
