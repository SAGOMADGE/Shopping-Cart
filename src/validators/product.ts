import type { Product, ProductRating } from '@/types/product';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isPositiveInteger = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
};

const isNonNegativeFiniteNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
};

const isNonNegativeInteger = (value: unknown): value is number => {
  return (
    typeof value === 'number' && Number.isInteger(value) && value >= 0
  );
};

export const isProductRating = (value: unknown): value is ProductRating => {
  if (!isRecord(value)) return false;

  return (
    typeof value.rate === 'number' &&
    Number.isFinite(value.rate) &&
    isNonNegativeInteger(value.count)
  );
};

export const isProduct = (value: unknown): value is Product => {
  if (!isRecord(value)) return false;

  return (
    isPositiveInteger(value.id) &&
    typeof value.title === 'string' &&
    isNonNegativeFiniteNumber(value.price) &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    typeof value.image === 'string' &&
    isProductRating(value.rating)
  );
};

export const isProductArray = (value: unknown): value is Product[] => {
  return Array.isArray(value) && value.every(isProduct);
};
