import type { CartItem, Product } from '@/types/product';

export const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'A product used by tests',
  category: 'test-category',
  image: 'https://example.com/product.jpg',
  rating: {
    rate: 4.5,
    count: 12,
  },
  ...overrides,
});

export const createCartItem = (
  overrides: Partial<CartItem> = {}
): CartItem => ({
  ...createProduct(overrides),
  quantity: 1,
  ...overrides,
});
