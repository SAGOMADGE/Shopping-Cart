import styles from './CartItem.module.css';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className={styles.cartItem}>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.price}>{item.price}</p>
      <p className={styles.quantity}>{item.quantity}</p>

      <button
        className={styles.addCartItemBtn}
        onClick={() => updateQuantity(item.id, -1)}
      >
        -
      </button>
      <button
        className={styles.substractCartItemBtn}
        onClick={() => updateQuantity(item.id, +1)}
      >
        +
      </button>

      <button
        className={styles.removeFromCart}
        onClick={() => removeFromCart(item.id)}
      >
        удалить товар
      </button>
    </div>
  );
};

export default CartItem;
