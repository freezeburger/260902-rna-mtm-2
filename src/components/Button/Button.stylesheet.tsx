

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1473E6',
    borderRadius: 8,
    justifyContent: 'center',
  },
  regular: {
    minHeight: 48,
    paddingHorizontal: 24,
  },
  small: {
    minHeight: 36,
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});