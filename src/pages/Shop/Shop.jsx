import useFetch from '@/hooks/useFetch';
import { getAllProducts } from '@/api/products';
import ProductCard from '@/pages/Shop/components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import styles from './Shop.module.css';
import { useCallback } from 'react';

const Shop = () => {
  const memorizedFetch = useCallback((signal) => getAllProducts(signal), []);
  const { data: products, loading, error } = useFetch(memorizedFetch);

  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>Наш ассортимент</h1>
      <div className={styles.productsGrid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Shop;
