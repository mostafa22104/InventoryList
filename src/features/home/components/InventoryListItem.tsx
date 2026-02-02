import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '../../../shared';
import { Product } from '../types/product';
import FastImage from 'react-native-fast-image';

type Props = {
  item: Product;
  isSelected: boolean;
  onCheck: () => void;
  isLandscape?: boolean;
};

export function InventoryListItem({
  item,
  isSelected,
  onCheck,
  isLandscape,
}: Props) {
  return (
    <View style={[styles.card, isLandscape && styles.landscape]}>
      <FastImage
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText size="md" TextWeight="bold" numberOfLines={1}>
            {item.title}
            <AppText size="sm" TextWeight="semibold">
              ${item.price.toFixed(2)}
            </AppText>
          </AppText>
        </View>

        <AppText size="sm" TextWeight="regular" numberOfLines={2}>
          {item.description}
        </AppText>

        <View style={styles.tagsStyle}>
          {item.tags.map(item => (
            <View style={styles.tag}>
              <AppText size="xs" TextWeight="regular">
                {item}
              </AppText>
            </View>
          ))}
        </View>

        <Pressable
          onPress={onCheck}
          style={[styles.checkbox, isSelected && styles.checkboxSelected]}
        >
          <AppText size="xs" TextWeight="bold">
            {isSelected ? '✓' : ''}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    minHeight: 320,
  },
  landscape: {
    flex: 1,
    marginHorizontal: 6,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tagsStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  checkbox: {
    marginTop: 6,
    alignSelf: 'flex-start',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: '#111827',
    backgroundColor: '#E5E7EB',
  },
});
