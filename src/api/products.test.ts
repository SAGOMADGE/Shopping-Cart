import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createProduct } from '@/tests/fixtures';
import { getAllProducts } from './products';

const createJsonResponse = (data: unknown, status = 200): Response => {
  return new Response(JSON.stringify(data), { status });
};

describe('getAllProducts', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns products for a valid API response', async () => {
    const products = [createProduct()];
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse(products));

    await expect(
      getAllProducts(new AbortController().signal)
    ).resolves.toEqual(products);
  });

  it('throws a clear error for an invalid API response structure', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createJsonResponse([{ ...createProduct(), id: 0 }]));

    await expect(
      getAllProducts(new AbortController().signal)
    ).rejects.toThrow('Invalid products response structure');
  });
});
