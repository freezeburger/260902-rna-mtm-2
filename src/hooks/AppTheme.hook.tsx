
/** Local Imports */
import { Colors } from '@/constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, logic } from '@/src/logic/root.store';

/**
 * Exposes the app-wide color palette driven by the `darkModeEnabled`
 * preference set from the Settings screen, so every screen shares the same
 * coherent light/dark theme instead of relying on the OS setting only.
 *
 * @returns the active palette, whether dark mode is on, and a toggle action.
 *
 * @example
 *
 * const { colors, isDark, toggleDarkMode } = useAppTheme();
 */
export const useAppTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector(logic.settings.selectors.selectDarkModeEnabled);

  const colors = isDark ? Colors.dark : Colors.light;

  const toggleDarkMode = () =>
    dispatch(logic.settings.actions.updateSettings({ darkModeEnabled: !isDark }));

  return { colors, isDark, toggleDarkMode };
};