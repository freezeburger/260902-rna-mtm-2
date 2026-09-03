
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Pressable, Text, View } from 'react-native';

/** External Libraries Imports */
import { Image } from 'expo-image';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Badge from '@/src/components/Badge';
import { styles } from './ListItem.stylesheet';
import type { ListItemProps } from './ListItem.types';

const ListItem:FC<ListItemProps> = ({ product, isFavorite, isIgnored, onPress, right }) => {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={[styles.container, { borderColor: colors.border }, isIgnored && styles.ignored]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} contentFit="cover" />
      <View style={styles.texts}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: isIgnored ? colors.textMuted : colors.text }]}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: isIgnored ? colors.textMuted : colors.primary }]}>
          {product.price.toFixed(2)} €
        </Text>
        <View style={styles.badges}>
          {isFavorite && <Badge label="Favorite" variant="favorite" />}
          {isIgnored && <Badge label="Ignored" variant="ignored" />}
        </View>
      </View>
      {right}
    </Pressable>
  );
};

/**
 * Memoized version of the ListItem component to prevent unnecessary re-renders.
 */
const ListItemMemoized = React.memo(ListItem);
ListItemMemoized.displayName = 'ListItemMemoized';

export default ListItemMemoized;