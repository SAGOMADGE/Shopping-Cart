import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

/**
 * Карточка товара для страницы магазина.
 * @param {Object} props
 * @param {Object} props.product - Объект товара
 * @param {string} props.product.title - Название
 * @param {number} props.product.price - Цена
 * @param {string} props.product.image - Изображение
 * @param {number} props.product.id - Идентификатор
 */

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart(); // - вытаскиваем ф-ию с контекста

  if (!product) return null;

  const isInCart = cartItems.some((item) => item.id === product.id);

  const { image, title, price } = product;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.footer}>
        <span className={styles.price}>${Number(price).toFixed(2)}</span>
        <button
          disabled={isInCart}
          className={styles.addBtn}
          onClick={() => addToCart(product)}
        >
          {isInCart ? 'В корзине ✓' : 'Добавить в корзину'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
