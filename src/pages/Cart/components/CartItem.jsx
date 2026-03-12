import styles from './CartItem.module.css';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imgWrapper}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>${item.price}</p>

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
        x
      </button>
    </div>
  );
};

export default CartItem;
