import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
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
