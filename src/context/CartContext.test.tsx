import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PropsWithChildren } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { createCartItem, createProduct } from '@/tests/fixtures';

const wrapper = ({ children }: PropsWithChildren) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct = createProduct({
  id: 1,
  title: 'T-shirt',
  price: 500,
});
const mockProduct2 = createProduct({
  id: 2,
  title: 'Sneakers',
  price: 2000,
});

beforeEach(() => {
  localStorage.clear();
});

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('loads a valid cart from localStorage', () => {
    const savedItem = createCartItem({ id: 3, quantity: 2 });
    localStorage.setItem('cart', JSON.stringify([savedItem]));

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([savedItem]);
    expect(result.current.totalItems).toBe(2);
  });

  it('falls back to an empty cart for damaged JSON', () => {
    localStorage.setItem('cart', '{broken');

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
  });

  it('falls back to an empty cart for valid JSON with invalid structure', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ ...createCartItem(), quantity: 0 }])
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
  });

  it('addToCart adds a new product with quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      ...mockProduct,
      quantity: 1,
    });
  });

  it('addToCart increases quantity when product is already in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]?.quantity).toBe(2);
  });

  it('removeFromCart removes product by id', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]?.id).toBe(mockProduct2.id);
  });

  it('updateQuantity increases quantity by 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 1);
    });

    expect(result.current.cartItems[0]?.quantity).toBe(2);
  });

  it('updateQuantity removes product when quantity reaches 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, -1);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('clearCart removes all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it('calculates totalItems and totalPrice', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(3000);
  });

  it('useCart throws when called outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow('Use cart must be used within a CartProvider');

    spy.mockRestore();
  });
});
