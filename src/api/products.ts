import type { Product } from '@/types/product';
import { isProductArray } from '@/validators/product';

const BASE_URL = 'https://fakestoreapi.com';

export const getAllProducts = async (
  signal: AbortSignal
): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`, { signal });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const rawData: unknown = await response.json();

    if (!isProductArray(rawData)) {
      throw new Error('Invalid products response structure');
    }

    return rawData;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error while fetching products:', message);
    throw error;
  }
};
