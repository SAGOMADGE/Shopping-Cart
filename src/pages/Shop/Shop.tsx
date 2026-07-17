import useFetch from '@/hooks/useFetch';
import { getAllProducts } from '@/api/products';
import type { Product } from '@/types/product';
import ProductCard from '@/pages/Shop/components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import styles from './Shop.module.css';
import StatusMessage from '@/components/StatusMessage/StatusMessage';

const Shop = () => {
  const {
    data: products,
    loading,
    error,
    refresh,
  } = useFetch<Product[]>(getAllProducts, []);

  if (error) {
    return (
      <StatusMessage
        type="error"
        icon="⚠️"
        title="Ошибка"
        message="Проблемы с соединением. Проверьте подключение к интернету."
        onRetry={refresh}
      />
    );
  }

  if (!loading && products.length === 0) {
    return (
      <StatusMessage
        type="info"
        icon="📦"
        title="Товаров пока нет"
        message="Ассортимент временно отсутствует"
      />
    );
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
