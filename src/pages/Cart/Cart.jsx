import { useCart } from '@/context/CartContext';
import CartItem from './components/CartItem';
import { NavLink } from 'react-router-dom';
import styles from './Cart.module.css';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const emptyCart = cartItems.length === 0;

  if (emptyCart) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingCart size={64} color="var(--primary)" />
        <p className={styles.emptyCartText}>Ваша корзина пуста</p>
        <NavLink to="/shop" className={styles.emptyCartNavToShop}>
          Вернуться в магазин
        </NavLink>
      </div>
    );
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
