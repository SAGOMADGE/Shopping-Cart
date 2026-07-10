import type { CartItem } from '@/types/product';
import { isProduct } from './product';

const hasQuantity = (value: unknown): value is { quantity: unknown } => {
  return typeof value === 'object' && value !== null && 'quantity' in value;
};

export const isCartItem = (value: unknown): value is CartItem => {
  if (!isProduct(value) || !hasQuantity(value)) return false;

  return (
    typeof value.quantity === 'number' &&
    Number.isFinite(value.quantity) &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
};

export const isCart = (value: unknown): value is CartItem[] => {
  return Array.isArray(value) && value.every(isCartItem);
};
