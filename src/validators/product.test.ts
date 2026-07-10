import { describe, expect, it } from 'vitest';
import { createProduct } from '@/tests/fixtures';
import { isProduct, isProductArray, isProductRating } from './product';

describe('product validators', () => {
  it('accepts a valid product rating', () => {
    expect(isProductRating({ rate: 4.5, count: 10 })).toBe(true);
  });

  it('rejects an invalid product rating', () => {
    expect(isProductRating({ rate: Number.NaN, count: 10 })).toBe(false);
    expect(isProductRating({ rate: 4.5, count: -1 })).toBe(false);
    expect(isProductRating(null)).toBe(false);
  });

  it('accepts a valid product', () => {
    expect(isProduct(createProduct())).toBe(true);
  });

  it('rejects products with invalid required fields', () => {
    expect(isProduct({ ...createProduct(), id: 0 })).toBe(false);
    expect(isProduct({ ...createProduct(), id: 1.5 })).toBe(false);
    expect(isProduct({ ...createProduct(), price: -1 })).toBe(false);
    expect(isProduct({ ...createProduct(), title: 123 })).toBe(false);
    expect(isProduct({ ...createProduct(), rating: { rate: 5 } })).toBe(false);
  });

  it('accepts only arrays of valid products', () => {
    expect(isProductArray([createProduct()])).toBe(true);
    expect(isProductArray([createProduct(), { ...createProduct(), id: -1 }])).toBe(
      false
    );
    expect(isProductArray({ products: [createProduct()] })).toBe(false);
  });
});
