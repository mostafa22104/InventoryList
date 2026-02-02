/**
 * @format
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../../../shared';

import { Product } from '../types/product';
import { Products } from '../utils/Inventory';
import { InventoryListItem } from './InventoryListItem';
import { usePagination } from '../hooks/usePagination';
import { useInventoryFilter } from '../hooks/useInventoryFilter';

type SortOrder = 'none' | 'asc' | 'desc';
const pageSize = 20;
export function InventoryList() {
  const safeAreaInsets = useSafeAreaInsets();

  const [data, setData] = useState<Product[]>(Products);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [searchValue, setSearchValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 2 : 1;
  const filteredItems = useInventoryFilter(data, searchValue, sortOrder);

  const { items, loadMore, loading, hasMore } = usePagination(
    filteredItems,
    pageSize,
  );

  const handleSort = useCallback(() => {
    setSortOrder(current => {
      if (current === 'none') return 'asc';
      if (current === 'asc') return 'desc';
      return 'none';
    });
  }, []);

  const selectItem = useCallback((id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const deleteSelectedItems = useCallback(() => {
    setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  }, [selectedIds]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <InventoryListItem
        item={item}
        isSelected={selectedIds.includes(item.id)}
        onCheck={() => selectItem(item.id)}
        isLandscape={isLandscape}
      />
    ),
    [selectedIds, selectItem, isLandscape],
  );

  const renderFooter = useCallback(() => {
    if (!loading && !hasMore) {
      return null;
    }

    return (
      <View style={{ paddingVertical: 16 }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [loading, hasMore]);

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.header}>
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search title or tag..."
          style={styles.searchInput}
        />
        <View style={styles.actions}>
          <Pressable style={styles.button} onPress={handleSort}>
            <AppText size="sm" TextWeight="semibold">
              Sort by Price ({sortOrder})
            </AppText>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              selectedIds.length === 0 && styles.buttonDisabled,
            ]}
            onPress={deleteSelectedItems}
            disabled={selectedIds.length === 0}
          >
            <AppText size="sm" TextWeight="semibold">
              Delete Selected
            </AppText>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={items}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  listContent: {
    paddingBottom: 40,
  },
});
