import { useMemo } from 'react';

import { Product, SortOrder } from '../types/product';

export function useInventoryFilter(
  data: Product[],
  searchValue: string,
  sortOrder: SortOrder,
) {
  return useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    let items = data;

    if (search.length >= 3) {
      items = data.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(search);
        const tagMatch = item.tags.some(tag =>
          tag.toLowerCase().includes(search),
        );
        return titleMatch || tagMatch;
      });
    }

    if (sortOrder === 'asc') {
      return [...items].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === 'desc') {
      return [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [data, searchValue, sortOrder]);
}
