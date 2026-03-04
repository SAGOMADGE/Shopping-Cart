import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard component', () => {
  // Создаем фейковые данные товара для теста
  const mockProduct = {
    title: 'Test Laptop',
    price: 999.99,
    image: 'https://via.placeholder.com/150',
    category: 'electronics',
  };

  it('должен правильно отображать данные продукта', () => {
    // 1. Рендерим карточку
    render(<ProductCard product={mockProduct} />);

    // 2. Ищем заголовок на экране
    expect(
      screen.getByRole('heading', { name: 'Test Laptop' })
    ).toBeInTheDocument();

    // 3. Ищем цену (используем рег выражение, чтобы найти подстроку)
    expect(screen.getByText('$999.99')).toBeInTheDocument();

    // 4. Проверяем картинку по ee alt-тексту
    const image = screen.getByAltText('Test Laptop');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
    // 5. Проверяем, что кнопка просто существует в DOM
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
  });
});
