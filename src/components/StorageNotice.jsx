import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function StorageNotice({
  type = 'info', // 'info' | 'warning' | 'error' | 'success'
  message,
  onDismiss,
  style,
}) {
  const { colors } = useTheme();

  if (!message) return null;

  const getNoticeColors = () => {
    switch (type) {
      case 'error':
        return {
          bg: colors.errorLight,
          border: colors.error,
          text: colors.error,
        };
      case 'success':
        return {
          bg: colors.successLight,
          border: colors.success,
          text: colors.success,
        };
      case 'warning':
        return {
          bg: '#FFFBEB',
          border: colors.warning,
          text: '#B45309',
        };
      case 'info':
      default:
        return {
          bg: colors.primaryLight,
          border: colors.primary,
          text: colors.primary,
        };
    }
  };

  const scheme = getNoticeColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: scheme.bg,
          borderColor: scheme.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: scheme.text }]}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.dismissText, { color: scheme.text }]}>Đóng</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  dismissText: {
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 8,
  },
});
