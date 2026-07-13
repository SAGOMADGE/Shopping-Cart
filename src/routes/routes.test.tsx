import { render, screen } from '@testing-library/react';

import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import { createMemoryRouter, Route, RouterProvider } from 'react-router-dom';

import { CartProvider } from '@/context/CartContext';
import { getAllProducts } from '@/api/products';

import { routes } from './routes';

vi.mock('@/api/products', () => ({
  getAllProducts: vi.fn(),
}));

const mockedGetAllProducts = vi.mocked(getAllProducts);

beforeEach(() => {
  mockedGetAllProducts.mockReset();
  localStorage.clear();
});

const renderRouter = (initialPath = '/') => {
  const testRouter = createMemoryRouter(routes, {
    initialEntries: [initialPath],
  });

  return render(
    <CartProvider>
      <RouterProvider router={testRouter} />
    </CartProvider>
  );
};

describe('routes', () => {
  it('переходит с главной страницы в магазин', async () => {
    const user = userEvent.setup();

    mockedGetAllProducts.mockResolvedValue([]);

    renderRouter('/');

    expect(
      screen.getByRole('heading', {
        name: 'SAGO Store',
      })
    ).toBeInTheDocument();

    const storeLink = screen.getByRole('link', {
      name: 'В магазин',
    });

    expect(storeLink).toHaveAttribute('href', '/shop');

    await user.click(storeLink);

    expect(
      await screen.findByRole('heading', {
        name: 'Наш ассортимент',
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'SAGO Store',
      })
    ).not.toBeInTheDocument();
  });

  it('переходит со страницы ошибки в магазин', async () => {
    const user = userEvent.setup();

    mockedGetAllProducts.mockResolvedValue([]);

    renderRouter('/invalid-url');

    expect(
      screen.getByRole('heading', {
        name: 'УПС!',
      })
    ).toBeInTheDocument();

    const shopLink = screen.getByRole('link', {
      name: 'Вернуться в магазин',
    });

    expect(shopLink).toBeInTheDocument();

    expect(shopLink).toHaveAttribute('href', '/shop');

    await user.click(shopLink);

    expect(
      await screen.findByRole('heading', {
        name: 'Наш ассортимент',
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'УПС!',
      })
    ).not.toBeInTheDocument();

    expect(mockedGetAllProducts).toHaveBeenCalledTimes(1);
  });
});
