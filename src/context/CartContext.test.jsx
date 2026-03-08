import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/context/CartContext';
import { describe, it, expect, vi } from 'vitest';

// Обёртка — все хуки запускаем внутри провайдера
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

// Тестовые данные
const mockProduct = { id: 1, name: 'Футболка', price: 500 };
const mockProduct2 = { id: 2, name: 'Кроссовки', price: 2000 };

// ─────────────────────────────────────────────
describe('CartContext', () => {
  // 1. Начальное состояние
  it('корзина изначально пустая', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  // 2. addToCart — новый товар
  it('addToCart: добавляет новый товар с quantity 1', () => {
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

  // 3. addToCart — товар уже есть
  it('addToCart: увеличивает quantity если товар уже в корзине', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  // 4. removeFromCart
  it('removeFromCart: удаляет товар по id', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(mockProduct2.id);
  });

  // 5. updateQuantity — увеличение
  it('updateQuantity: увеличивает quantity на +1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 1);
    });

    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  // 6. updateQuantity — удаление когда quantity = 0
  it('updateQuantity: удаляет товар когда quantity доходит до 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct); // quantity: 1
    });

    act(() => {
      result.current.updateQuantity(mockProduct.id, -1); // quantity: 0 → удалён
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  // 7. clearCart
  it('clearCart: очищает всю корзину', () => {
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

  // 8. Вычисляемые данные
  it('totalItems и totalPrice считаются правильно', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct); // qty:1, price:500
      result.current.addToCart(mockProduct); // qty:2, price:500
      result.current.addToCart(mockProduct2); // qty:1, price:2000
    });

    expect(result.current.totalItems).toBe(3); // 2 + 1
    expect(result.current.totalPrice).toBe(3000); // 500*2 + 2000*1
  });

  // 9. Защита хука
  it('useCart бросает ошибку если вызван вне провайдера', () => {
    // Подавляем console.error чтобы не засорять вывод
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow('Use cart must be used within a CartProvider');

    spy.mockRestore();
  });
});
