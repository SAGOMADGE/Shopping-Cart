const BASE_URL = 'https://fakestoreapi.com';

/**
 * @returns {Promise<Array>}
 */

export const getAllProducts = async (signal) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, { signal });

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении товара:', error.message);
    throw error;
  }
};
