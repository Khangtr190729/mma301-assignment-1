import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ showLabel = true, style }) {
  const { themeMode, isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
        style,
      ]}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: isDark ? '#1E3A8A' : '#FEF3C7' },
          ]}
        >
          <Text style={styles.iconText}>{isDark ? '🌙' : '☀️'}</Text>
        </View>
        {showLabel && (
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {isDark ? 'Chế độ tối (Dark Mode)' : 'Chế độ sáng (Light Mode)'}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {isDark ? 'Bật giao diện bảo vệ mắt' : 'Giao diện sáng tiêu chuẩn'}
            </Text>
          </View>
        )}
      </View>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: '#CBD5E1', true: colors.primary }}
        thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginVertical: 6,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
