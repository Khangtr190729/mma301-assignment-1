import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import LoadingScreen from '../components/LoadingScreen';

export default function HomeScreen({ navigation }) {
  const { profile, isProfileLoading } = useProfile();
  const { colors, isDark } = useTheme();

  if (isProfileLoading) {
    return <LoadingScreen message="Đang khởi tạo ứng dụng..." />;
  }

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      {/* Header Chào mừng */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>
          Xin chào mừng trở lại 👋
        </Text>
        <Text style={[styles.mainTitle, { color: colors.textPrimary }]}>
          Profile & Activity Hub
        </Text>
      </View>

      {/* Profile Summary Card */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Profile')}
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: colors.textPrimary }]}>
            {profile.name}
          </Text>
          <Text style={[styles.userRole, { color: colors.primary }]}>
            {profile.role || 'Mobile Developer'}
          </Text>
          <Text
            style={[styles.userBio, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {profile.bio}
          </Text>
        </View>
        <View style={styles.arrowIcon}>
          <Text style={{ color: colors.primary, fontSize: 18, fontWeight: '700' }}>
            →
          </Text>
        </View>
      </TouchableOpacity>

      {/* Section Menu Điều hướng */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Chức năng chính
      </Text>

      {/* Menu Cards */}
      <View style={styles.menuGrid}>
        {/* Card 1: Hồ sơ cá nhân */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
          style={[
            styles.menuCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
            <Text style={styles.icon}>👤</Text>
          </View>
          <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>
            Hồ sơ cá nhân
          </Text>
          <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
            Xem thông tin & chỉnh sửa hồ sơ
          </Text>
        </TouchableOpacity>

        {/* Card 2: Hoạt động & Sở thích */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Activity')}
          style={[
            styles.menuCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.iconBox, { backgroundColor: '#D1FAE5' }]}>
            <Text style={styles.icon}>🎯</Text>
          </View>
          <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>
            Hoạt động
          </Text>
          <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
            Khám phá & tham gia sự kiện
          </Text>
        </TouchableOpacity>

        {/* Card 3: Cài đặt hệ thống */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Settings')}
          style={[
            styles.menuCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
            <Text style={styles.icon}>⚙️</Text>
          </View>
          <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>
            Cài đặt
          </Text>
          <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
            Đổi giao diện Dark/Light & bộ nhớ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Technical Badges */}
      <View
        style={[
          styles.techCard,
          {
            backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.techTitle, { color: colors.textPrimary }]}>
          MMA301 • Technical Stack
        </Text>
        <Text style={[styles.techDesc, { color: colors.textSecondary }]}>
          React Native 0.86 • Expo SDK 57 • Context API • AsyncStorage Persistence • FlatList
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
  },
  userRole: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  userBio: {
    fontSize: 12,
    marginTop: 4,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  menuGrid: {
    gap: 12,
    marginBottom: 24,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 22,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  menuDesc: {
    fontSize: 12,
    marginTop: 2,
    flex: 1,
  },
  techCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  techTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  techDesc: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});
