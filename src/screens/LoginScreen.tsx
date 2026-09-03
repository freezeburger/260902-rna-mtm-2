
/** React Imports */
import React, { type FC, useState } from 'react';

/** React Native Imports */
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

/** External Libraries Imports */
import { useRouter } from 'expo-router';

/** Hooks Imports */
import { useAppState, useAppTheme } from '@/src/hooks';

/** Local Imports */
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';

const LoginScreen:FC = () => {
  const { colors } = useAppTheme();
  const { setUsername } = useAppState();
  const router = useRouter();
  const [draftUsername, setDraftUsername] = useState('');

  const canContinue = draftUsername.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }
    setUsername(draftUsername.trim());
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '700' }}>Welcome</Text>
      <Text style={{ color: colors.textMuted, fontSize: 15, marginBottom: 24, marginTop: 8 }}>
        Tell us your name to start discovering products.
      </Text>
      <View>
        <Input
          label="Username"
          value={draftUsername}
          onChangeText={setDraftUsername}
          placeholder="Enter your name"
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleContinue}
          accessibilityLabel="Username"
        />
      </View>
      <Button content="Continue" onPress={handleContinue} disabled={!canContinue} accessibilityLabel="Continue" />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;