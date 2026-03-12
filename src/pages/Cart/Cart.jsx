import { useCart } from '@/context/CartContext';
import CartItem from './components/CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return <p>Корзина пуста</p>;
  }

  return (
    <div className={styles.cartContainer}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}

      <p className={styles.cartTotal}>Итого: ${totalPrice.toFixed(2)}</p>
      <button className={styles.clearCartBtn} type="button" onClick={clearCart}>
        Очистить корзину
      </button>
    </div>
  );
};

export default Cart;
