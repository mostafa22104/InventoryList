import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../shared';
import { InventoryList } from '../components/InventoryList';

export function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  return <InventoryList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
