
/** React Imports */
import React, { type FC, useEffect } from 'react';

/** React Native Imports */
import { ActivityIndicator, Text, View } from 'react-native';

/** External Libraries Imports */
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/** Hooks Imports */
import { useAppState, useAppTheme } from '@/src/hooks';

/** Local Imports */

/** Delay (in ms) the splash screen stays visible before redirecting. */
const SPLASH_DURATION = 1400;

const SplashScreen:FC = () => {
  const { colors } = useAppTheme();
  const { state } = useAppState();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(state.username.trim() ? '/(tabs)' : '/login');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [router, state.username]);

  return (
    <View style={{ alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center' }}>
      <Ionicons name="bag-handle" size={72} color={colors.primary} />
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 16 }}>Product Swipe</Text>
      <Text style={{ color: colors.textMuted, fontSize: 15, marginTop: 6 }}>Discover. Like. Order.</Text>
      <ActivityIndicator color={colors.primary} style={{ marginTop: 28 }} />
    </View>
  );
};

export default SplashScreen;