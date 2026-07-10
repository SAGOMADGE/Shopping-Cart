import { findByRole, getByRole, render, screen } from '@testing-library/react';

import { vi, describe, it, expect, beforeEach } from 'vitest';

import { getAllProducts } from '@/api/products';

import { CartProvider } from '@/context/CartContext';

import Shop from './Shop';

vi.mock('@/api/products', () => ({
  getAllProducts: vi.fn(),
}));

const mockedGetAllProducts = vi.mocked(getAllProducts);

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

const renderShop = () => {
  return render(
    <CartProvider>
      <Shop />
    </CartProvider>
  );
};

const mockProducts = [
  {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    image: 'https://example.com/product.jpg',
  },
];

describe('Shop', () => {
  it('рендерит товары при успешном запросе', async () => {
    mockedGetAllProducts.mockResolvedValue(mockProducts);

    renderShop();

    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();

    const img = screen.getByRole('img', {
      name: 'Test Product',
    });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/product.jpg');

    expect(
      screen.getByRole('button', { name: 'Добавить в корзину' })
    ).toBeInTheDocument();

    expect(mockedGetAllProducts).toHaveBeenCalled();
  });
});
