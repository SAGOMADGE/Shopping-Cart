import { useCart } from '@/context/CartContext';
import CartItem from './components/CartItem';
import { NavLink } from 'react-router-dom';
import styles from './Cart.module.css';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
    toast,
    showNotification,
  } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      clearCart();
      showNotification('✅ Заказ успешно оформлен!');
    }
  };

  const emptyCart = cartItems.length === 0;

  if (emptyCart && !toast.show) {
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
      {toast.show && (
        <div className={styles.toast} role="alert">
          {toast.message}
        </div>
      )}

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}

      <p className={styles.cartTotal}>Итого: ${totalPrice.toFixed(2)}</p>

      {!emptyCart && (
        <div className={styles.cartActions}>
          <button
            className={styles.clearCartBtn}
            type="button"
            onClick={clearCart}
          >
            Очистить корзину
          </button>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Оформить заказ
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
