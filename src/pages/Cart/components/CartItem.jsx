import styles from './CartItem.module.css';
import { X } from 'lucide-react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imgWrapper}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>${Number(item.price).toFixed(2)}</p>

        <div className={styles.controls}>
          <button
            className={styles.subtractBtn}
            onClick={() => updateQuantity(item.id, -1)}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.addBtn}
            onClick={() => updateQuantity(item.id, +1)}
          >
            +
          </button>
        </div>
      </div>

      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(item.id)}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default CartItem;
