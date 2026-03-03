const BASE_URL = 'https://fakestoreapi.com';

/**
 * Получает список всех товаров
 * @returns {Promise<Array>} Массив объектов товара
 */

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Логируем для разраба
    // Пробрасываем дальше для UI
    console.error('Ошибка при получении товара:', error.message);
    throw error;
  }
};
