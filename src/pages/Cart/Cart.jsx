import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <p className={styles.cartItemTitle}>Название: {item.title}</p>
          <p>Цена: {item.price}</p>
          <div className={styles.quantityContainer}>
            <p>Количество: {item.quantity}</p>
            {/* + */}
            <button
              type="button"
              className={styles.updateQuantityBtn}
              onClick={() => updateQuantity(item.id, -1)}
            >
              -
            </button>
            {/* + */}
            <button
              type="button"
              className={styles.updateQuantityBtn}
              onClick={() => updateQuantity(item.id, +1)}
            >
              +
            </button>
            {/*  delete */}
            <button
              type="button"
              className={styles.removeFromCartBtn}
              onClick={() => removeFromCart(item.id)}
            >
              Удалить из корзины
            </button>
          </div>
        </div>
      ))}
      <p className={styles.cartTotal}>Итого: {totalPrice.toFixed(2)}</p>
      <button
        className={styles.clearCartBtn}
        type="button"
        onClick={() => clearCart()}
      >
        Очистить корзину
      </button>
    </div>
  );
};

export default Cart;
