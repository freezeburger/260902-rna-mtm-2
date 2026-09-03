

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  ignored: {
    opacity: 0.55,
  },
  image: {
    borderRadius: 8,
    height: 56,
    marginRight: 12,
    width: 56,
  },
  texts: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
});