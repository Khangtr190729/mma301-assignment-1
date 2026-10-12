import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ActivityItem({ item, onToggleJoin }) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      {/* Category header & badge */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' },
          ]}
        >
          <Text style={[styles.categoryText, { color: item.color || colors.primary }]}>
            {item.category}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: item.isJoined
                ? isDark
                  ? '#064E3B'
                  : '#DCFCE7'
                : isDark
                ? '#334155'
                : '#F1F5F9',
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: item.isJoined ? colors.success : colors.textMuted },
            ]}
          >
            {item.isJoined ? '✓ Đã tham gia' : 'Chưa tham gia'}
          </Text>
        </View>
      </View>

      {/* Title & Description */}
      <Text style={[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
      <Text
        style={[styles.description, { color: colors.textSecondary }]}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      {/* Meta info (Thời gian, Địa điểm) */}
      <View style={styles.metaContainer}>
        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📅</Text>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            {item.date} • {item.time}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaIcon}>📍</Text>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            {item.location}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onToggleJoin(item.id)}
        style={[
          styles.actionButton,
          item.isJoined
            ? [
                styles.joinedButton,
                {
                  borderColor: colors.border,
                  backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                },
              ]
            : [
                styles.joinButton,
                { backgroundColor: colors.primary },
              ],
        ]}
      >
        <Text
          style={[
            styles.actionButtonText,
            { color: item.isJoined ? colors.textPrimary : '#FFFFFF' },
          ]}
        >
          {item.isJoined ? 'Hủy tham gia' : '+ Tham gia hoạt động'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    marginBottom: 14,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButton: {},
  joinedButton: {
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
