import { describe, expect, it } from 'vitest';
import { createCartItem } from '@/tests/fixtures';
import { isCart, isCartItem } from './cart';

describe('cart validators', () => {
  it('accepts a valid cart item', () => {
    expect(isCartItem(createCartItem({ quantity: 2 }))).toBe(true);
  });

  it('rejects invalid quantity values', () => {
    expect(isCartItem(createCartItem({ quantity: 0 }))).toBe(false);
    expect(isCartItem(createCartItem({ quantity: 1.5 }))).toBe(false);
    expect(isCartItem(createCartItem({ quantity: Number.POSITIVE_INFINITY }))).toBe(
      false
    );
  });

  it('rejects cart items that are not valid products', () => {
    expect(isCartItem({ ...createCartItem(), id: -1 })).toBe(false);
  });

  it('accepts only arrays of valid cart items', () => {
    expect(isCart([createCartItem()])).toBe(true);
    expect(isCart([createCartItem(), createCartItem({ quantity: -1 })])).toBe(
      false
    );
    expect(isCart({ items: [createCartItem()] })).toBe(false);
  });
});
