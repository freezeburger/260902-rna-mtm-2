
/** Local Imports */
import { Colors } from '@/constants/theme';
import { useAppState } from '@/src/hooks/AppState.hook';

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
  const { state, updateSettings } = useAppState();

  const isDark = state.darkModeEnabled;
  const colors = isDark ? Colors.dark : Colors.light;

  const toggleDarkMode = () => updateSettings({ darkModeEnabled: !isDark });

  return { colors, isDark, toggleDarkMode };
};