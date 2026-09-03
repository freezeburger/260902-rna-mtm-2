
/** React Imports */
import React, { type FC, useRef } from 'react';

/** React Native Imports */
import { Animated, PanResponder, Pressable, Text, View } from 'react-native';

/** External Libraries Imports */
import { Image } from 'expo-image';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Badge from '@/src/components/Badge';
import { styles } from './ListItem.stylesheet';
import type { ListItemProps } from './ListItem.types';

const ListItem:FC<ListItemProps> = ({
  product,
  isFavorite,
  isIgnored,
  onPress,
  onFavorite,
  onOrder,
  onIgnore,
  onUnignore,
  right,
}) => {
  const { colors } = useAppTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const closeActions = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
  };
  const revealActions = () => {
    Animated.spring(translateX, { toValue: -216, useNativeDriver: true }).start();
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 8,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(Math.max(-216, Math.min(0, gestureState.dx)));
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -60) {
          revealActions();
        } else {
          closeActions();
        }
      },
      onPanResponderTerminate: closeActions,
    }),
  ).current;

  return (
    <View style={[styles.row, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      {!isIgnored && <View style={styles.actions}>
        {onFavorite && (
          <Pressable
            accessibilityLabel={`Add ${product.title} to favorites`}
            accessibilityRole="button"
            onPress={() => {
              onFavorite();
              closeActions();
            }}
            style={[styles.action, styles.favoriteAction]}>
            <Text style={styles.actionLabel}>Favorite</Text>
          </Pressable>
        )}
        {onOrder && (
          <Pressable
            accessibilityLabel={`Order ${product.title}`}
            accessibilityRole="button"
            onPress={() => {
              onOrder();
              closeActions();
            }}
            style={[styles.action, styles.orderAction]}>
            <Text style={styles.actionLabel}>Order</Text>
          </Pressable>
        )}
        {onIgnore && (
          <Pressable
            accessibilityLabel={`Ignore ${product.title}`}
            accessibilityRole="button"
            onPress={() => {
              onIgnore();
              closeActions();
            }}
            style={[styles.action, styles.ignoreAction]}>
            <Text style={styles.actionLabel}>Ignore</Text>
          </Pressable>
        )}
      </View>}
      <Animated.View
        {...(isIgnored ? {} : panResponder.panHandlers)}
        style={[
          styles.foreground,
          { backgroundColor: colors.background, borderBottomColor: colors.border, transform: [{ translateX }] },
          isIgnored && styles.ignored,
        ]}>
        <Pressable
          accessibilityRole={onPress ? 'button' : undefined}
          onPress={onPress}
          style={styles.container}>
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
          {isIgnored && onUnignore ? (
            <Pressable
              accessibilityLabel={`Unignore ${product.title}`}
              accessibilityRole="button"
              onPress={onUnignore}
              style={[styles.action, styles.unignoreAction]}>
              <Text style={styles.actionLabel}>Unignore</Text>
            </Pressable>
          ) : right}
        </Pressable>
      </Animated.View>
    </View>
  );
};

/**
 * Memoized version of the ListItem component to prevent unnecessary re-renders.
 */
const ListItemMemoized = React.memo(ListItem);
ListItemMemoized.displayName = 'ListItemMemoized';

export default ListItemMemoized;