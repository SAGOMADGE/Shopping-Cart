import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// добавляем методы типа .toBeInTheDocument() в expect
expect.extend(matchers);

// Очищаем DOM после каждого теста, чтобы не было "мусора" от предыдущих проверок
afterEach(() => {
  cleanup();
});
