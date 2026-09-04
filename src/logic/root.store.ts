import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from './api/products.api';
import notificationsReducer, {
  addNotification,
  postNotification,
  removeNotification,
  selectNotificationError,
  selectNotificationById,
  selectNotifications,
  selectNotificationRequestStatus,
  updateNotification,
} from './notifications/notifications.slice';
import ordersReducer, {
  placeOrder,
  selectOrderDraft,
  selectOrderQuantity,
  selectOrders,
  selectProductForOrder,
  selectSelectedProductId,
  setOrderQuantity,
} from './orders/orders.slice';
import productsReducer, {
  addFavorite,
  addProduct,
  discoverNext,
  discoverRestart,
  ignoreProduct,
  removeProduct,
  removeFavorite,
  selectCurrentDiscoverProduct,
  selectDiscoverRemainingCount,
  selectFavoriteProducts,
  selectFavoriteProductIds,
  selectIgnoredProductIds,
  selectIsFavorite,
  selectIsIgnored,
  selectProductById,
  selectProducts,
  unignoreProduct,
  updateProduct,
} from './products/products.slice';
import settingsReducer, {
  resetSettings,
  selectDarkModeEnabled,
  selectDefaultOrderQuantity,
  selectNotificationsEnabled,
  selectSettings,
  selectUsername,
  setSettings,
  setUsername,
  updateSettings,
} from './settings/settings.slice';
import { logMiddleware } from './logger.middleware';
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin';

export const rootStore = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    notifications: notificationsReducer,
    orders: ordersReducer,
    products: productsReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logMiddleware, productsApi.middleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devtoolsEnhancer()),
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

/**
 * Normalized access point for domain logic.
 *
 * Component usage:
 *
 * const products = useSelector(logic.products.selectors.selectProducts);
 * const dispatch = useDispatch<AppDispatch>();
 * dispatch(logic.products.actions.addProduct(product));
 *
 * Non-React usage:
 *
 * rootStore.dispatch(logic.settings.actions.updateSettings({ darkModeEnabled: true }));
 * const unsubscribe = rootStore.subscribe(() => {
 *   console.log(logic.settings.selectors.selectSettings(rootStore.getState()));
 * });
 * unsubscribe();
 */
export const logic = {
  api: {
    products: productsApi,
  },
  notifications: {
    actions: { addNotification, updateNotification, removeNotification },
    thunks: { postNotification },
    selectors: {
      selectNotifications,
      selectNotificationById,
      selectNotificationRequestStatus,
      selectNotificationError,
    },
  },
  products: {
    actions: {
      addProduct,
      updateProduct,
      removeProduct,
      discoverNext,
      discoverRestart,
      addFavorite,
      removeFavorite,
      ignoreProduct,
      unignoreProduct,
    },
    selectors: {
      selectProducts,
      selectProductById,
      selectFavoriteProductIds,
      selectIgnoredProductIds,
      selectFavoriteProducts,
      selectIsFavorite,
      selectIsIgnored,
      selectCurrentDiscoverProduct,
      selectDiscoverRemainingCount,
    },
  },
  orders: {
    actions: { selectProductForOrder, setOrderQuantity, placeOrder },
    selectors: { selectOrderDraft, selectSelectedProductId, selectOrderQuantity, selectOrders },
  },
  settings: {
    actions: { setUsername, setSettings, updateSettings, resetSettings },
    selectors: {
      selectSettings,
      selectUsername,
      selectDefaultOrderQuantity,
      selectNotificationsEnabled,
      selectDarkModeEnabled,
    },
  },
} as const;
