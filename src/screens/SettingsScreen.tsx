
/** React Imports */
import React, { type FC, useState } from 'react';

/** React Native Imports */
import { Alert, ScrollView, StyleSheet } from 'react-native';

/** External Libraries Imports */
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppState, useAppTheme } from '@/src/hooks';

/** Local Imports */
import ContentCard from '@/src/components/ContentCard';
import Fieldset from '@/src/components/Fieldset';
import Header from '@/src/components/Header';
import Input from '@/src/components/Input';
import LongPressButton from '@/src/components/LongPressButton';
import NumericInput from '@/src/components/NumericInput';
import Switch from '@/src/components/Switch';

const SettingsScreen:FC = () => {
  const { colors } = useAppTheme();
  const { state, updateSettings } = useAppState();

  const [draftUsername, setDraftUsername] = useState(state.username);
  const [draftQuantity, setDraftQuantity] = useState(state.defaultOrderQuantity);

  const hasChanges = draftUsername.trim() !== state.username || draftQuantity !== state.defaultOrderQuantity;

  const handleSave = () => {
    updateSettings({
      username: draftUsername.trim() || state.username,
      defaultOrderQuantity: draftQuantity,
    });
    Alert.alert('Settings saved', 'Your preferences have been updated.');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <ContentCard title="Profile">
          <Input
            label="Username"
            value={draftUsername}
            onChangeText={setDraftUsername}
            placeholder="Your name"
            autoCapitalize="words"
            accessibilityLabel="Username"
          />
          <Fieldset label="Default order quantity">
            <NumericInput
              value={draftQuantity}
              onChange={setDraftQuantity}
              min={1}
              accessibilityLabel="default order quantity"
            />
          </Fieldset>
          <LongPressButton
            content="Save changes"
            action={handleSave}
            appearance="regular"
            disabled={!hasChanges}
            accessibilityLabel="Save changes, press and hold to confirm"
            validatedColor={colors.primary}
          />
        </ContentCard>

        <ContentCard title="Preferences" style={styles.card}>
          <Switch
            label="Notifications"
            icon="notifications-outline"
            value={state.notificationsEnabled}
            onValueChange={(value) => updateSettings({ notificationsEnabled: value })}
          />
          <Switch
            label="Dark mode"
            icon="moon-outline"
            value={state.darkModeEnabled}
            onValueChange={(value) => updateSettings({ darkModeEnabled: value })}
          />
        </ContentCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 16,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  card: {
    marginTop: 4,
  },
});

export default SettingsScreen;