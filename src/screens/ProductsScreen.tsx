
/** React Imports */
import React, { type FC, useMemo, useState } from 'react';

/** React Native Imports */
import { FlatList, StyleSheet, View } from 'react-native';

/** External Libraries Imports */
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppState, useAppTheme } from '@/src/hooks';

/** Local Imports */
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
import Input from '@/src/components/Input';
import ListItem from '@/src/components/ListItem';
import { selectIsFavorite, selectIsIgnored } from '@/src/store/selectors';

const ProductsScreen:FC = () => {
  const { colors } = useAppTheme();
  const { state } = useAppState();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return state.products;
    }
    return state.products.filter((product) => product.title.toLowerCase().includes(normalizedQuery));
  }, [state.products, query]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Products" subtitle={`${state.products.length} products in catalog`} />
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
              isFavorite={selectIsFavorite(state, item.id)}
              isIgnored={selectIsIgnored(state, item.id)}
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