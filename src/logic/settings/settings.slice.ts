import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { UserSettings } from '@/src/types';

/**
 * Component usage:
 *
 * const username = useSelector(selectUsername);
 * const settings = useSelector(selectSettings);
 * const dispatch = useDispatch<AppDispatch>();
 * dispatch(setUsername('Renaud'));
 *
 * Non-React subscription:
 *
 * const unsubscribe = rootStore.subscribe(() => {
 *   console.log(selectSettings(rootStore.getState()));
 * });
 * unsubscribe();
 */
export type SettingsState = UserSettings;

const initialState: SettingsState = {
  username: '',
  defaultOrderQuantity: 1,
  notificationsEnabled: true,
  darkModeEnabled: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setSettings(_state, action: PayloadAction<SettingsState>) {
      return action.payload;
    },
    updateSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      Object.assign(state, action.payload);
    },
    resetSettings() {
      return initialState;
    },
  },
  selectors: {
    selectSettings: (state) => state,
    selectUsername: (state) => state.username,
    selectDefaultOrderQuantity: (state) => state.defaultOrderQuantity,
    selectNotificationsEnabled: (state) => state.notificationsEnabled,
    selectDarkModeEnabled: (state) => state.darkModeEnabled,
  },
});

export const { setUsername, setSettings, updateSettings, resetSettings } = settingsSlice.actions;

export const {
  selectSettings,
  selectUsername,
  selectDefaultOrderQuantity,
  selectNotificationsEnabled,
  selectDarkModeEnabled,
} = settingsSlice.selectors;

export default settingsSlice.reducer;
