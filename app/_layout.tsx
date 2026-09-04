import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { useAppTheme } from '@/src/hooks';
import { rootStore } from '@/src/logic/root.store';
import { AppStateProvider } from '@/src/store/AppStateContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigation() {
  const { isDark } = useAppTheme();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={rootStore}>
      <AppStateProvider>
        <RootNavigation />
      </AppStateProvider>
    </Provider>
  );
}
