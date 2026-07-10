import { X } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/product';
import styles from './CartItem.module.css';

type CartItemProps = {
  item: CartItemType;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, amount: number) => void;
};

const CartItem = ({
  item,
  removeFromCart,
  updateQuantity,
}: CartItemProps) => {
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
