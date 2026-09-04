import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { products as initialProducts } from '@/src/data/products';
import type { Product } from '@/src/types';

/**
 * Component usage:
 *
 * const products = useSelector(selectProducts);
 * const product = useSelector((state) => selectProductById(state, productId));
 * const dispatch = useDispatch<AppDispatch>();
 * dispatch(addProduct(product));
 *
 * Non-React subscription:
 *
 * const unsubscribe = rootStore.subscribe(() => {
 *   console.log(selectProducts(rootStore.getState()));
 * });
 * unsubscribe();
 */
export type ProductsState = {
  items: Product[];
  favoriteProductIds: Product['id'][];
  ignoredProductIds: Product['id'][];
  discoverIndex: number;
};

const initialState: ProductsState = {
  items: initialProducts,
  favoriteProductIds: [],
  ignoredProductIds: [],
  discoverIndex: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const productIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (productIndex !== -1) {
        state.items[productIndex] = action.payload;
      }
    },
    removeProduct(state, action: PayloadAction<Product['id']>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    discoverNext(state) {
      state.discoverIndex += 1;
    },
    discoverRestart(state) {
      state.discoverIndex = 0;
    },
    addFavorite(state, action: PayloadAction<Product['id']>) {
      if (!state.favoriteProductIds.includes(action.payload)) {
        state.favoriteProductIds.push(action.payload);
      }
      state.discoverIndex += 1;
    },
    removeFavorite(state, action: PayloadAction<Product['id']>) {
      state.favoriteProductIds = state.favoriteProductIds.filter((productId) => productId !== action.payload);
    },
    ignoreProduct(state, action: PayloadAction<Product['id']>) {
      if (!state.ignoredProductIds.includes(action.payload)) {
        state.ignoredProductIds.push(action.payload);
      }
      state.discoverIndex += 1;
    },
    unignoreProduct(state, action: PayloadAction<Product['id']>) {
      state.ignoredProductIds = state.ignoredProductIds.filter((productId) => productId !== action.payload);
    },
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductById: (state, productId: Product['id']) =>
      state.items.find((item) => item.id === productId),
    selectFavoriteProductIds: (state) => state.favoriteProductIds,
    selectIgnoredProductIds: (state) => state.ignoredProductIds,
    selectFavoriteProducts: (state) =>
      state.items.filter((product) => state.favoriteProductIds.includes(product.id)),
    selectIsFavorite: (state, productId: Product['id']) =>
      state.favoriteProductIds.includes(productId),
    selectIsIgnored: (state, productId: Product['id']) => state.ignoredProductIds.includes(productId),
    selectCurrentDiscoverProduct: (state) => state.items[state.discoverIndex],
    selectDiscoverRemainingCount: (state) => Math.max(0, state.items.length - state.discoverIndex),
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  discoverNext,
  discoverRestart,
  addFavorite,
  removeFavorite,
  ignoreProduct,
  unignoreProduct,
} = productsSlice.actions;

export const {
  selectProducts,
  selectProductById,
  selectFavoriteProductIds,
  selectIgnoredProductIds,
  selectFavoriteProducts,
  selectIsFavorite,
  selectIsIgnored,
  selectCurrentDiscoverProduct,
  selectDiscoverRemainingCount,
} = productsSlice.selectors;

export default productsSlice.reducer;
