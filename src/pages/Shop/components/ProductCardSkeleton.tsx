import styles from './ProductCardSkeleton.module.css';

const ProductCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={`${styles.imageWrapper} ${styles.skeleton}`} />

      <div className={`${styles.titleLine1} ${styles.skeleton}`} />
      <div className={`${styles.titleLine2} ${styles.skeleton}`} />

      <div className={styles.footer}>
        <div className={`${styles.price} ${styles.skeleton}`} />
        <div className={`${styles.button} ${styles.skeleton}`} />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
