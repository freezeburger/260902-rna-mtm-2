
/** React Imports */
import React, { type FC, useState } from 'react';

/** React Native Imports */
import { Alert, ScrollView, StyleSheet } from 'react-native';

/** External Libraries Imports */
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';
import { type AppDispatch, logic } from '@/src/logic/root.store';

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
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector(logic.settings.selectors.selectSettings);

  const [draftUsername, setDraftUsername] = useState(settings.username);
  const [draftQuantity, setDraftQuantity] = useState(settings.defaultOrderQuantity);

  const hasChanges =
    draftUsername.trim() !== settings.username ||
    draftQuantity !== settings.defaultOrderQuantity;

  const handleSave = () => {
    dispatch(logic.settings.actions.updateSettings({
      username: draftUsername.trim() || settings.username,
      defaultOrderQuantity: draftQuantity,
    }));
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
            value={settings.notificationsEnabled}
            onValueChange={(notificationsEnabled) =>
              dispatch(logic.settings.actions.updateSettings({ notificationsEnabled }))
            }
          />
          <Switch
            label="Dark mode"
            icon="moon-outline"
            value={settings.darkModeEnabled}
            onValueChange={(darkModeEnabled) =>
              dispatch(logic.settings.actions.updateSettings({ darkModeEnabled }))
            }
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