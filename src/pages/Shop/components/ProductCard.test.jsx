import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';

describe('ProductCard component', () => {
  const mockProduct = {
    title: 'Test Laptop',
    price: 999.99,
    image: 'https://via.placeholder.com/150',
    category: 'electronics',
  };

  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('должен правильно отображать данные продукта', () => {
    render(<ProductCard product={mockProduct} />, { wrapper }); // оборачиваем контекст в wrapper

    expect(
      screen.getByRole('heading', { name: 'Test Laptop' })
    ).toBeInTheDocument();

    expect(screen.getByText('$999.99')).toBeInTheDocument();

    const image = screen.getByAltText('Test Laptop');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(
      screen.getByRole('button', { name: /добавить в корзину/i })
    ).toBeInTheDocument();
  });
});
