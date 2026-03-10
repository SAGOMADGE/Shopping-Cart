import styles from './CartItem.module.css';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.image} />

      <p className={styles.title}>{item.title}</p>
      <p className={styles.price}>{item.price}</p>
      <p className={styles.quantity}>{item.quantity}</p>

      <button
        className={styles.substractBtn}
        onClick={() => updateQuantity(item.id, -1)}
      >
        -
      </button>
      <button
        className={styles.addBtn}
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
