import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { clearStorage } from '../storage/appStorage';
import StorageNotice from '../components/StorageNotice';

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();
  const { resetProfile } = useProfile();
  const [notice, setNotice] = useState(null);

  const handleResetProfile = () => {
    Alert.alert(
      'Khôi phục hồ sơ',
      'Bạn có chắc chắn muốn đặt lại hồ sơ về thông tin sinh viên mặc định ban đầu?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Khôi phục',
          style: 'destructive',
          onPress: async () => {
            await resetProfile();
            setNotice({
              type: 'success',
              text: 'Đã khôi phục hồ sơ về giá trị mặc định thành công!',
            });
          },
        },
      ]
    );
  };

  const handleClearAllStorage = () => {
    Alert.alert(
      'Xóa toàn bộ AsyncStorage (Test First Run)',
      'Hành động này sẽ xóa sạch dữ liệu Profile & Theme khỏi bộ nhớ thiết bị. Thao tác này dùng để kiểm thử kịch bản First Run.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa sạch',
          style: 'destructive',
          onPress: async () => {
            await clearStorage();
            setNotice({
              type: 'warning',
              text: 'Đã xóa AsyncStorage. Hãy khởi động lại ứng dụng để test First Run!',
            });
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
        Cài đặt & Tùy chọn
      </Text>
      <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
        Quản lý giao diện hiển thị và bộ nhớ cục bộ AsyncStorage của ứng dụng.
      </Text>

      {notice && (
        <StorageNotice
          type={notice.type}
          message={notice.text}
          onDismiss={() => setNotice(null)}
        />
      )}

      {/* Group: Giao diện (Theming - R05) */}
      <Text style={[styles.groupTitle, { color: colors.textPrimary }]}>
        GIAO DIỆN (THEMING)
      </Text>
      <ThemeToggle />

      {/* Group: Dữ liệu & Persistence (R07, R10) */}
      <Text style={[styles.groupTitle, { color: colors.textPrimary, marginTop: 24 }]}>
        DỮ LIỆU & BỘ NHỚ LƯU TRỮ
      </Text>

      <View
        style={[
          styles.actionCard,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleResetProfile}
          style={styles.actionRow}
        >
          <View style={styles.actionLeft}>
            <View>
              <Text style={[styles.actionTitle, { color: colors.textPrimary }]}>
                Khôi phục Profile mặc định
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Đặt lại thông tin mẫu của sinh viên Trương Hoàng Khang
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClearAllStorage}
          style={styles.actionRow}
        >
          <View style={styles.actionLeft}>
            <View>
              <Text style={[styles.actionTitle, { color: colors.error }]}>
                Xóa sạch AsyncStorage
              </Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Phục vụ kiểm thử Test Case 1 (First Run / Cold Start)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Group: Thông tin Assignment & Sinh viên */}
      <Text style={[styles.groupTitle, { color: colors.textPrimary, marginTop: 24 }]}>
        THÔNG TIN SINH VIÊN & HỌC PHẦN
      </Text>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.metaRow}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Sinh viên:</Text>
          <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
            Trương Hoàng Khang
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Mã số SV:</Text>
          <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
            CE190729
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Môn học:</Text>
          <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
            MMA301 – Multiplatform Mobile App Development
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={[styles.metaLabel, { color: colors.textMuted }]}>Bài nộp:</Text>
          <Text style={[styles.metaVal, { color: colors.primary }]}>
            Assignment 1 – Profile & Activity App
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  actionCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  infoCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 13,
  },
  metaVal: {
    fontSize: 13,
    fontWeight: '600',
  },
});
