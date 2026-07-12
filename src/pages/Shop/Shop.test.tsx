import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getAllProducts } from '@/api/products';
import { CartProvider } from '@/context/CartContext';
import { createProduct } from '@/tests/fixtures';
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
  createProduct({
    id: 1,
    title: 'Test Product',
    price: 19.99,
    image: 'https://example.com/product.jpg',
  }),
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

  it('рендерит 8 скелетон карточек при загрузке', async () => {
    mockedGetAllProducts.mockReturnValue(new Promise(() => {}));

    renderShop();

    expect(screen.getAllByRole('article')).toHaveLength(8);

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: /добавить в корзину/i,
      })
    ).not.toBeInTheDocument();

    expect(mockedGetAllProducts).toHaveBeenCalled();
  });

  it('при ошибке рендерит состояние ошибки', async () => {
    mockedGetAllProducts.mockRejectedValue(new Error('Server Error'));

    renderShop();

    expect(screen.getAllByRole('article')).toHaveLength(8);

    expect(
      await screen.findByRole('heading', { name: 'Ошибка' })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Проблемы с соединением. Проверьте подключение к интернету.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /повторить/i,
      })
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: /добавить в корзину/i,
      })
    ).not.toBeInTheDocument();

    expect(mockedGetAllProducts).toHaveBeenCalledTimes(1);
  });

  it('после клика по кнопке "Повторить" повторяет запрос и рендерит товары', async () => {
    mockedGetAllProducts
      .mockRejectedValueOnce(new Error('Server Error'))
      .mockResolvedValueOnce(mockProducts);

    const user = userEvent.setup();

    renderShop();

    expect(
      await screen.findByRole('heading', { name: 'Ошибка' })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: /повторить/i,
      })
    );

    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Ошибка' })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /добавить в корзину/i,
      })
    );

    expect(
      screen.queryByRole('button', {
        name: /повторить/i,
      })
    ).not.toBeInTheDocument();

    expect(mockedGetAllProducts).toHaveBeenCalledTimes(2);
  });
});
