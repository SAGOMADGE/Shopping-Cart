import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import type { PropsWithChildren } from 'react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';
import { createProduct } from '@/tests/fixtures';

describe('ProductCard component', () => {
  const mockProduct = createProduct({
    id: 1,
    title: 'Test Laptop',
    price: 999.99,
    image: 'https://via.placeholder.com/150',
    category: 'electronics',
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders product data', () => {
    render(<ProductCard product={mockProduct} />, { wrapper });

    expect(
      screen.getByRole('heading', { name: 'Test Laptop' })
    ).toBeInTheDocument();

    expect(screen.getByText('$999.99')).toBeInTheDocument();

    const image = screen.getByAltText('Test Laptop');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(
      screen.getByRole('button', { name: 'Добавить в корзину' })
    ).toBeInTheDocument();
  });
});
