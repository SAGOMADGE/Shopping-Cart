import { createContext, useContext, useState, useEffect } from 'react';

// 1.Создание контекста
const CartContext = createContext(null);

// 2. Кастомный хук для удобного доступа
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Use cart must be used within a CartProvider');
  }
  return context;
};

// 3. Компонент-провайдер
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Добавление товара
  const addToCart = (product) => {
    setCartItems((prev) => {
      // 1. Проверяем, есть ли такой ID в массиве
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        // 2. Если товар найден - трансформируем массив
        return prev.map(
          (item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // создаем новый объект (иммутабельность!)
              : item // "как есть" по ссылке
        );
      }
      // 3. Если товара нет, создаем новый массив
      // Раскладываем старый массив и добавляем объект с базовым количеством
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Удаление товара целиком
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Изменение количества (+1 или -1)
  const updateQuantity = (productId, amount) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Очистка корзины
  const clearCart = () => setCartItems([]);

  // Вычисляемые данные
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Объект значения, который пойдет в контекст
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
