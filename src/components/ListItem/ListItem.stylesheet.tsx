

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  row: {
    marginBottom: 1,
    overflow: 'hidden',
  },
  actions: {
    alignItems: 'stretch',
    bottom: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteAction: {
    backgroundColor: '#1E88E5',
  },
  orderAction: {
    backgroundColor: '#168A4A',
  },
  ignoreAction: {
    backgroundColor: '#D14343',
  },
  unignoreAction: {
    backgroundColor: '#6B7280',
    borderRadius: 6,
    paddingVertical: 8,
  },
  foreground: {
    backgroundColor: '#FFFFFF',
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