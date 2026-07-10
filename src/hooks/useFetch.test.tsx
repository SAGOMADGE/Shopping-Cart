import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useFetch from './useFetch';

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

const createDeferred = <T,>(): Deferred<T> => {
  let resolve: ((value: T) => void) | undefined;
  let reject: ((reason?: unknown) => void) | undefined;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  if (!resolve || !reject) {
    throw new Error('Deferred handlers were not initialized');
  }

  return { promise, resolve, reject };
};

const getRequest = <T,>(requests: Deferred<T>[], index: number): Deferred<T> => {
  const request = requests.at(index);
  if (!request) {
    throw new Error(`Request ${index} was not started`);
  }
  return request;
};

describe('useFetch', () => {
  it('aborts the active request on cleanup', async () => {
    const signals: AbortSignal[] = [];
    const fetchFn = vi.fn((signal: AbortSignal) => {
      signals.push(signal);
      return createDeferred<string>().promise;
    });

    const { unmount } = renderHook(() => useFetch(fetchFn, 'initial'));

    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(1));

    unmount();

    expect(signals[0]?.aborted).toBe(true);
  });

  it('does not use stale data from a previous request after refresh', async () => {
    const requests: Deferred<string>[] = [];
    const fetchFn = vi.fn(() => {
      const deferred = createDeferred<string>();
      requests.push(deferred);
      return deferred.promise;
    });

    const { result } = renderHook(() => useFetch(fetchFn, 'initial'));

    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(2));

    const firstRequest = getRequest(requests, 0);
    const secondRequest = getRequest(requests, 1);

    await act(async () => {
      firstRequest.resolve('old data');
      await firstRequest.promise;
    });

    expect(result.current.data).toBe('initial');
    expect(result.current.loading).toBe(true);

    await act(async () => {
      secondRequest.resolve('new data');
      await secondRequest.promise;
    });

    await waitFor(() => expect(result.current.data).toBe('new data'));
    expect(result.current.loading).toBe(false);
  });

  it('does not let an old aborted request clear loading for a new request', async () => {
    const requests: Deferred<string>[] = [];
    const fetchFn = vi.fn(() => {
      const deferred = createDeferred<string>();
      requests.push(deferred);
      return deferred.promise;
    });

    const { result } = renderHook(() => useFetch(fetchFn, 'initial'));

    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => expect(fetchFn).toHaveBeenCalledTimes(2));

    const firstRequest = getRequest(requests, 0);

    await act(async () => {
      firstRequest.resolve('old data');
      await firstRequest.promise;
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe('initial');
    expect(result.current.error).toBeNull();
  });
});
