import { configureStore } from '@reduxjs/toolkit';

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
import productsReducer, {
  addProduct,
  removeProduct,
  selectProductById,
  selectProducts,
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
    notifications: notificationsReducer,
    products: productsReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logMiddleware),
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
    actions: { addProduct, updateProduct, removeProduct },
    selectors: { selectProducts, selectProductById },
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
