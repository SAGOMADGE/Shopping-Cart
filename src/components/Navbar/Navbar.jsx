import { NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SAGOMADGE</div>
      <ul className={styles.menu}>
        <li className={styles.menuLink}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.menuLink}>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Shop
          </NavLink>
        </li>

        <li className={`${styles.menuLink} ${styles.cartIcon}`}>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
