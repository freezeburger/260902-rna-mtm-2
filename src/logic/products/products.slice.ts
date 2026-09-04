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
};

const initialState: ProductsState = {
  items: initialProducts,
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
  },
  selectors: {
    selectProducts: (state) => state.items,
    selectProductById: (state, productId: Product['id']) =>
      state.items.find((item) => item.id === productId),
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;

export const { selectProducts, selectProductById } = productsSlice.selectors;

export default productsSlice.reducer;
