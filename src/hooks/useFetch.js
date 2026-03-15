// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // reloads the page when error appears
  const [retry, setRetry] = useState(0);

  // using callback to refresh the page on button click
  const refresh = useCallback(() => {
    setRetry((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn(controller.signal);
        setData(result);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [fetchFn, retry]);

  return { data, loading, error, refresh };
};

export default useFetch;
