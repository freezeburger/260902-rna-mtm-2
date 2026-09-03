
/** React Imports */
import React, { type FC, useMemo } from 'react';

/** React Native Imports */
import { FlatList, StyleSheet } from 'react-native';

/** External Libraries Imports */
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppState, useAppTheme } from '@/src/hooks';

/** Local Imports */
import Button from '@/src/components/Button';
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
import ListItem from '@/src/components/ListItem';
import { selectFavoriteProducts } from '@/src/store/selectors';
import type { Product } from '@/src/types';

const FavoritesScreen:FC = () => {
  const { colors } = useAppTheme();
  const { state, selectProductForOrder } = useAppState();
  const router = useRouter();

  const favorites = useMemo(() => selectFavoriteProducts(state), [state]);

  const handleOrder = (product: Product) => {
    selectProductForOrder(product.id);
    router.push('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Favorites" subtitle={`${favorites.length} product${favorites.length === 1 ? '' : 's'}`} />
      {favorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favorite products yet"
          message="Go to Discover to add some products."
          actionLabel="Go to Discover"
          onAction={() => router.push('/(tabs)')}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={favorites}
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => (
            <ListItem
              product={item}
              isFavorite
              right={<Button content="Order" size="small" onPress={() => handleOrder(item)} />}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
  },
});

export default FavoritesScreen;