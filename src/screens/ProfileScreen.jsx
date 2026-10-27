import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import LoadingScreen from '../components/LoadingScreen';
import StorageNotice from '../components/StorageNotice';

export default function ProfileScreen({ navigation }) {
  const { profile, isProfileLoading, storageError, clearError } = useProfile();
  const { colors, isDark } = useTheme();

  if (isProfileLoading) {
    return <LoadingScreen message="Đang nạp thông tin hồ sơ..." />;
  }

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      {storageError && (
        <StorageNotice
          type="error"
          message={storageError}
          onDismiss={clearError}
        />
      )}

      {/* Profile Card Header */}
      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatarImage} />
          <View style={[styles.onlineBadge, { borderColor: colors.cardBackground }]} />
        </View>

        <Text style={[styles.name, { color: colors.textPrimary }]}>{profile.name}</Text>
        <Text style={[styles.role, { color: colors.primary }]}>{profile.role}</Text>
        <Text style={[styles.bio, { color: colors.textSecondary }]}>{profile.bio}</Text>

        {/* Nút Chỉnh sửa */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditProfile')}
          style={[styles.editButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin chi tiết */}
      <View
        style={[
          styles.infoSection,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
          Thông tin chi tiết
        </Text>

        {/* Email */}
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Email</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {profile.email}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

        {/* Số điện thoại */}
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>
              Số điện thoại
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {profile.phone || 'Chưa cập nhật'}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

        {/* Vị trí */}
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>
              Địa chỉ / Cơ sở
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {profile.location || 'Chưa cập nhật'}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

        {/* Ngày tham gia */}
        <View style={styles.infoRow}>
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: colors.textMuted }]}>
              Thời gian tham gia
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {profile.joinedDate || 'Tháng 9, 2024'}
            </Text>
          </View>
        </View>
      </View>

      {/* Storage Persistence Status */}
      <View
        style={[
          styles.statusCard,
          {
            backgroundColor: isDark ? '#1E293B' : '#EFF6FF',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.statusTitle, { color: colors.primary }]}>
          AsyncStorage Persistence Active
        </Text>
        <Text style={[styles.statusDesc, { color: colors.textSecondary }]}>
          Mọi thay đổi khi lưu sẽ được đồng bộ ngay vào AsyncStorage và giữ lại kể cả khi khởi động lại ứng dụng.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  mainCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  bio: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  editButton: {
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  infoSection: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoRow: {
    paddingVertical: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  statusCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusDesc: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
});
