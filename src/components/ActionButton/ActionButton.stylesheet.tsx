

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 6,
  },
  container: {
    alignItems: 'center',
    borderRadius: 32,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    width: 64,
  },
    label: {
      fontSize: 12,
      fontWeight: '600',
    },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    opacity: 0.4,
  },
});