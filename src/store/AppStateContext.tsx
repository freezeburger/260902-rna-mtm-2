/**
 * Shared application state for Product Swipe.
 *
 * A single Context + reducer holds every piece of state that must stay
 * consistent across screens (username, products, favorites, ignored
 * products, discover progress, order draft, settings and past orders).
 * Screens only keep local UI state (temporary form input, etc.).
 */
import React, { createContext, useCallback, useMemo, useReducer, type FC, type PropsWithChildren } from 'react';

import { products as initialProducts } from '@/src/data/products';
import type { AppState, Order } from '@/src/types';

const DEFAULT_ORDER_QUANTITY = 1;

const initialState: AppState = {
  username: '',
  products: initialProducts,
  favoriteProductIds: [],
  ignoredProductIds: [],
  discoverIndex: 0,
  selectedProductId: undefined,
  defaultOrderQuantity: DEFAULT_ORDER_QUANTITY,
  orderQuantity: DEFAULT_ORDER_QUANTITY,
  notificationsEnabled: true,
  darkModeEnabled: false,
  orders: [],
};

type Action =
  | { type: 'SET_USERNAME'; username: string }
  | { type: 'DISCOVER_NEXT' }
  | { type: 'DISCOVER_RESTART' }
  | { type: 'ADD_FAVORITE'; productId: string }
  | { type: 'IGNORE_PRODUCT'; productId: string }
  | { type: 'SELECT_PRODUCT_FOR_ORDER'; productId: string }
  | { type: 'SET_ORDER_QUANTITY'; quantity: number }
  | { type: 'PLACE_ORDER' }
  | {
      type: 'UPDATE_SETTINGS';
      settings: Partial<Pick<AppState, 'username' | 'defaultOrderQuantity' | 'notificationsEnabled' | 'darkModeEnabled'>>;
    };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.username };

    case 'DISCOVER_NEXT':
      return { ...state, discoverIndex: state.discoverIndex + 1 };

    case 'DISCOVER_RESTART':
      return { ...state, discoverIndex: 0 };

    case 'ADD_FAVORITE':
      return {
        ...state,
        favoriteProductIds: state.favoriteProductIds.includes(action.productId)
          ? state.favoriteProductIds
          : [...state.favoriteProductIds, action.productId],
        discoverIndex: state.discoverIndex + 1,
      };

    case 'IGNORE_PRODUCT':
      return {
        ...state,
        ignoredProductIds: state.ignoredProductIds.includes(action.productId)
          ? state.ignoredProductIds
          : [...state.ignoredProductIds, action.productId],
        discoverIndex: state.discoverIndex + 1,
      };

    case 'SELECT_PRODUCT_FOR_ORDER':
      return {
        ...state,
        selectedProductId: action.productId,
        orderQuantity: state.defaultOrderQuantity,
      };

    case 'SET_ORDER_QUANTITY':
      return { ...state, orderQuantity: Math.max(1, action.quantity) };

    case 'PLACE_ORDER': {
      if (!state.selectedProductId) {
        return state;
      }
      const product = state.products.find((item) => item.id === state.selectedProductId);
      if (!product) {
        return state;
      }
      const order: Order = {
        id: `o-${Date.now()}`,
        productId: product.id,
        quantity: state.orderQuantity,
        total: product.price * state.orderQuantity,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        orders: [order, ...state.orders],
        selectedProductId: undefined,
        orderQuantity: state.defaultOrderQuantity,
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, ...action.settings };

    default:
      return state;
  }
}

export type AppStateContextValue = {
  state: AppState;
  setUsername: (username: string) => void;
  discoverNext: () => void;
  discoverRestart: () => void;
  addFavorite: (productId: string) => void;
  ignoreProduct: (productId: string) => void;
  selectProductForOrder: (productId: string) => void;
  setOrderQuantity: (quantity: number) => void;
  placeOrder: () => void;
  updateSettings: (settings: Partial<Pick<AppState, 'username' | 'defaultOrderQuantity' | 'notificationsEnabled' | 'darkModeEnabled'>>) => void;
};

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUsername = useCallback((username: string) => dispatch({ type: 'SET_USERNAME', username }), []);
  const discoverNext = useCallback(() => dispatch({ type: 'DISCOVER_NEXT' }), []);
  const discoverRestart = useCallback(() => dispatch({ type: 'DISCOVER_RESTART' }), []);
  const addFavorite = useCallback((productId: string) => dispatch({ type: 'ADD_FAVORITE', productId }), []);
  const ignoreProduct = useCallback((productId: string) => dispatch({ type: 'IGNORE_PRODUCT', productId }), []);
  const selectProductForOrder = useCallback(
    (productId: string) => dispatch({ type: 'SELECT_PRODUCT_FOR_ORDER', productId }),
    [],
  );
  const setOrderQuantity = useCallback((quantity: number) => dispatch({ type: 'SET_ORDER_QUANTITY', quantity }), []);
  const placeOrder = useCallback(() => dispatch({ type: 'PLACE_ORDER' }), []);
  const updateSettings = useCallback(
    (settings: Partial<Pick<AppState, 'username' | 'defaultOrderQuantity' | 'notificationsEnabled' | 'darkModeEnabled'>>) =>
      dispatch({ type: 'UPDATE_SETTINGS', settings }),
    [],
  );

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      setUsername,
      discoverNext,
      discoverRestart,
      addFavorite,
      ignoreProduct,
      selectProductForOrder,
      setOrderQuantity,
      placeOrder,
      updateSettings,
    }),
    [state, setUsername, discoverNext, discoverRestart, addFavorite, ignoreProduct, selectProductForOrder, setOrderQuantity, placeOrder, updateSettings],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
