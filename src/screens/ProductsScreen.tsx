
/** React Imports */
import React, { type FC, useMemo, useState } from 'react';

/** React Native Imports */
import { FlatList, StyleSheet, View } from 'react-native';

/** External Libraries Imports */
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';
import { type AppDispatch, logic } from '@/src/logic/root.store';

/** Local Imports */
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
import Input from '@/src/components/Input';
import ListItem from '@/src/components/ListItem';

const ProductsScreen:FC = () => {
  const { colors } = useAppTheme();

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(logic.products.selectors.selectProducts);
  const favoriteProductIds = useSelector(
    logic.products.selectors.selectFavoriteProductIds,
  );
  const ignoredProductIds = useSelector(
    logic.products.selectors.selectIgnoredProductIds,
  );
  const defaultOrderQuantity = useSelector(
    logic.settings.selectors.selectDefaultOrderQuantity,
  );

  const router = useRouter();
  
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return products;
    }
    return products.filter((product) => product.title.toLowerCase().includes(normalizedQuery));
  }, [products, query]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Products" subtitle={`${products.length} products in catalog`} />
      <View style={styles.searchWrapper}>
        <Input
          label="Search"
          value={query}
          onChangeText={setQuery}
          placeholder="Search products"
          accessibilityLabel="Search products"
        />
      </View>
      {filteredProducts.length === 0 ? (
        <EmptyState icon="search-outline" title="No product found" message="Try another search term." />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={filteredProducts}
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => (
            <ListItem
              product={item}
              isFavorite={favoriteProductIds.includes(item.id)}
              isIgnored={ignoredProductIds.includes(item.id)}
              onFavorite={() => dispatch(logic.products.actions.addFavorite(item.id))}
              onUnfavorite={() => dispatch(logic.products.actions.removeFavorite(item.id))}
              onIgnore={() => dispatch(logic.products.actions.ignoreProduct(item.id))}
              onUnignore={() => dispatch(logic.products.actions.unignoreProduct(item.id))}
              onOrder={() => {
                dispatch(
                  logic.orders.actions.selectProductForOrder({
                    productId: item.id,
                    quantity: defaultOrderQuantity,
                  }),
                );
                router.push('/(tabs)/orders');
              }}
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
  searchWrapper: {
    paddingHorizontal: 20,
  },
  list: {
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
});

export default ProductsScreen;