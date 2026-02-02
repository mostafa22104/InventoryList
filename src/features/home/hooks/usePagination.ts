import { useEffect, useState, useCallback } from 'react';

export function usePagination<T>(data: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setItems(data.slice(0, pageSize));
  }, [data, pageSize]);

  const loadMore = useCallback(() => {
    if (loading) return;

    const start = page * pageSize;
    if (start >= data.length) return;

    setLoading(true);

    setItems(prev => [...prev, ...data.slice(start, start + pageSize)]);

    setPage(prev => prev + 1);
    setLoading(false);
  }, [data, page, pageSize, loading]);

  return { items, loadMore, loading, hasMore: items.length < data.length };
}
