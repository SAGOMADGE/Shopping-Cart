import { useState, useEffect, useCallback, useRef } from 'react';
import type { FetchFunction } from '@/types/fetch';

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};

const useFetch = <T,>(fetchFn: FetchFunction<T>, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const requestId = useRef(0);

  const refresh = useCallback(() => {
    setRetry((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const currentRequestId = requestId.current + 1;
    requestId.current = currentRequestId;

    const isCurrentRequest = () => {
      return requestId.current === currentRequestId && !controller.signal.aborted;
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn(controller.signal);

        if (isCurrentRequest()) {
          setData(result);
        }
      } catch (err) {
        if (controller.signal.aborted) return;

        if (isCurrentRequest()) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isCurrentRequest()) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => controller.abort();
  }, [fetchFn, retry]);

  return { data, loading, error, refresh };
};

export default useFetch;
