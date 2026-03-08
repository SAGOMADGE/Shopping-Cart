import { NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Fake Store</div>
      <ul className={styles.menu}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Shop
          </NavLink>
        </li>
        <li className={styles.cartIcon}>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Cart ({totalItems})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
