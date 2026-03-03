import { useState, useEffect } from 'react';
import { getAllProducts } from '@/api/products'; // Проверь путь к api
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]); // Изначально пустой массив
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // Простой способ избежать проблем с гонкой данных (race conditions)

    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        if (!ignore) {
          setProducts(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchItems();

    // Функция очистки (cleanup)
    return () => {
      ignore = true;
    };
  }, []);

  // Early returns для состояний
  if (loading) return <div className={styles.center}>Загрузка товаров...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <h1>Наш ассортимент</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} $</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
