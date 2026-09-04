import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Order, Product } from '@/src/types';

export type OrderDraft = {
  productId: Product['id'] | undefined;
  quantity: number;
};

export type OrdersState = {
  draft: OrderDraft;
  items: Order[];
};

const initialState: OrdersState = {
  draft: {
    productId: undefined,
    quantity: 1,
  },
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    selectProductForOrder(state, action: PayloadAction<{ productId: Product['id']; quantity: number }>) {
      state.draft = action.payload;
    },
    setOrderQuantity(state, action: PayloadAction<number>) {
      state.draft.quantity = Math.max(1, action.payload);
    },
    placeOrder(state, action: PayloadAction<Product>) {
      if (state.draft.productId !== action.payload.id) {
        return;
      }

      state.items.unshift({
        id: `o-${Date.now()}`,
        productId: action.payload.id,
        quantity: state.draft.quantity,
        total: action.payload.price * state.draft.quantity,
        createdAt: new Date().toISOString(),
      });
      state.draft = { productId: undefined, quantity: 1 };
    },
  },
  selectors: {
    selectOrderDraft: (state) => state.draft,
    selectSelectedProductId: (state) => state.draft.productId,
    selectOrderQuantity: (state) => state.draft.quantity,
    selectOrders: (state) => state.items,
  },
});

export const { selectProductForOrder, setOrderQuantity, placeOrder } = ordersSlice.actions;
export const { selectOrderDraft, selectSelectedProductId, selectOrderQuantity, selectOrders } =
  ordersSlice.selectors;

export default ordersSlice.reducer;
