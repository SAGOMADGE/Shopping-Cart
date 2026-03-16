import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.errorScreen}>
      <div className={styles.errorPage}>
        <h1 className={styles.errorPageTitle}>УПС!</h1>
        <p className={styles.errorPageDescription}>
          Вы перешли по невалидному URL.
          <br /> Следуйте ссылке ниже⬇️
        </p>
        <Link to="/shop" end className={styles.errorPageLink}>
          Вернуться в магазин
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
