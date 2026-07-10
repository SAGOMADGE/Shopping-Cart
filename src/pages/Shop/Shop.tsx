import { useCallback } from 'react';
import useFetch from '@/hooks/useFetch';
import { getAllProducts } from '@/api/products';
import type { Product } from '@/types/product';
import type { FetchFunction } from '@/types/fetch';
import ProductCard from '@/pages/Shop/components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import styles from './Shop.module.css';
import StatusMessage from '@/components/StatusMessage/StatusMessage';

const Shop = () => {
  const memorizedFetch = useCallback<FetchFunction<Product[]>>(
    (signal) => getAllProducts(signal),
    []
  );
  const { data: products, loading, error, refresh } = useFetch<Product[]>(
    memorizedFetch,
    []
  );

  if (error) {
    return <StatusMessage type="error" icon="⚠️" onRetry={refresh} />;
  }

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>Наш ассортимент</h1>
      <div className={styles.productsGrid}>
        {loading
          ? Array(8)
              .fill(null)
              .map((_, i) => <ProductCardSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Shop;
