import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

/**
 * Карточка товара для страницы магазина.
/**
 * @param {Object} props
 * @param {Object} props.product - Объект товара
 * @param {string} props.product.title - Название
 * @param {number} props.product.price - Цена
 * @param {string} props.product.image - Изображение
 * @param {string} props.product.category - Категория
 */

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { addToCart } = useCart(); // - вытаскиваем ф-ию с контекста

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
        <span className={styles.price}>${Number(price).toFixed(2)}</span>
        <button className={styles.addBtn} onClick={() => addToCart(product)}>
          Добавить в корзину
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
