import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { ShoppingBag } from 'lucide-react';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <ShoppingBag size={64} color="var(--primary)" />
      <h1 className={styles.homeHeadline}>Uzbek Store</h1>
      <h2 className={styles.homeDescription}>Лучшие цены</h2>
      <NavLink to="/shop" end className={styles.homeToShopLink}>
        В магазин
      </NavLink>
    </div>
  );
};

export default Home;
