import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const paperTheme = usePaperTheme();

  return (
    <IconButton
      icon={themeMode === 'light' ? 'weather-night' : 'weather-sunny'}
      iconColor={paperTheme.colors.onSurface}
      size={24}
      onPress={toggleTheme}
      style={styles.toggle}
    />
  );
};

const styles = StyleSheet.create({
  toggle: {
    marginRight: 16,
  },
});

export default ThemeToggle;
