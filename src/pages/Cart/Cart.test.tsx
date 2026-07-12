import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CartProvider } from '@/context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';

import type { CartItem } from '@/types/product';

const mockCart: CartItem[] = [
  {
    id: 1,
    title: 'Test Product',
    price: 25.5,
    description: 'Test product description',
    category: 'test',
    image: 'https://example.com/product.png',
    rating: {
      rate: 4.5,
      count: 10,
    },
    quantity: 2,
  },
];

const renderCart = () => {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Cart', () => {
  it('скрывает уведомление об успешном заказе через 3000 мс', () => {
    localStorage.setItem('cart', JSON.stringify(mockCart));
    renderCart();

    expect(screen.getByText('Test Product')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /оформить заказ/i,
      })
    ).toBeInTheDocument();

    expect(screen.queryByText('Ваша корзина пуста')).not.toBeInTheDocument();

    vi.useFakeTimers();

    fireEvent.click(
      screen.getByRole('button', {
        name: /оформить заказ/i,
      })
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Заказ успешно оформлен!'
    );

    act(() => {
      vi.advanceTimersByTime(2999);
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();

    expect(screen.getByText('Ваша корзина пуста')).toBeInTheDocument();
  });
});
