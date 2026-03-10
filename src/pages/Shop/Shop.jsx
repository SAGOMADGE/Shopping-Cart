import { useState, useEffect } from 'react';
import { getAllProducts } from '@/api/products'; // Проверь путь к api
import ProductCard from '@/pages/Shop/components/ProductCard';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]); // Изначально пустой массив
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Функция очистки (cleanup)
    return () => {
      controller.abort(); // размонтирование -> отменяем
    };
  }, []);

  // Early returns для состояний
  if (loading) return <div className={styles.center}>Загрузка товаров...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <h1>Наш ассортимент</h1>
      <div className={styles.productsGrid}>
        {/* Прохожусь по массиву products , возвращаю одну карточку товара и передаю каждой ProductCard обьект product для последующего ее использования */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
