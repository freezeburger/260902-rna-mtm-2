
/** React Imports */
import { useContext } from 'react';

/** Local Imports */
import { AppStateContext, type AppStateContextValue } from '@/src/store/AppStateContext';

/**
 * Gives access to the shared application state (username, products,
 * favorites, ignored products, discover progress, order draft, settings and
 * past orders) together with the actions that mutate it.
 *
 * Must be used within an `AppStateProvider`.
 *
 * @returns the shared state and its actions.
 *
 * @example
 *
 * const { state, addFavorite } = useAppState();
 */
export const useAppState = (): AppStateContextValue => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }

  return context;
};