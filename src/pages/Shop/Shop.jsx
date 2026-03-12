import useFetch from '@/hooks/useFetch';
import { getAllProducts } from '@/api/products'; // Проверь путь к api
import ProductCard from '@/pages/Shop/components/ProductCard';
import styles from './Shop.module.css';
import { useCallback } from 'react';

const Shop = () => {
  const memorizedFetch = useCallback((signal) => getAllProducts(signal), []);
  const { data: products, loading, error } = useFetch(memorizedFetch);

  // Early returns для состояний
  if (loading) return <div className={styles.center}>Загрузка товаров...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>Наш ассортимент</h1>
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
