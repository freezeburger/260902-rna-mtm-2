
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Header.stylesheet';
import type { HeaderProps } from './Header.types';

const Header:FC<HeaderProps> = ({ title, subtitle, right }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
      </View>
      {right && <View>{right}</View>}
    </View>
  );
};

/**
 * Memoized version of the Header component to prevent unnecessary re-renders.
 */
const HeaderMemoized = React.memo(Header);
HeaderMemoized.displayName = 'HeaderMemoized';

export default HeaderMemoized;