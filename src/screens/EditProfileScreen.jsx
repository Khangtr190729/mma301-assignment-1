import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import { validateProfileForm } from '../utils/profileValidation';
import StorageNotice from '../components/StorageNotice';

export default function EditProfileScreen({ navigation }) {
  const { profile, updateProfile } = useProfile();
  const { colors, isDark } = useTheme();

  // Controlled form state
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    bio: profile.bio || '',
    phone: profile.phone || '',
    location: profile.location || '',
    role: profile.role || '',
    avatarUrl: profile.avatarUrl || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Xóa lỗi của trường đó khi người dùng bắt đầu nhập lại
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSave = async () => {
    // 1. Thực hiện validation
    const validationResult = validateProfileForm(formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      setStatusMessage({
        type: 'error',
        text: 'Vui lòng kiểm tra lại các trường thông tin báo đỏ.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // 2. Cập nhật qua ProfileContext (vừa set state vừa lưu AsyncStorage)
      await updateProfile(formData);
      setStatusMessage({
        type: 'success',
        text: 'Đã lưu thay đổi thành công!',
      });
      // 3. Điều hướng quay lại ProfileScreen sau thời gian ngắn
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể lưu thông tin vào bộ nhớ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Hủy bỏ và quay lại không lưu
    navigation.goBack();
  };

  const handleResetForm = () => {
    // Phục hồi dữ liệu form về giá trị ban đầu của Profile
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      bio: profile.bio || '',
      phone: profile.phone || '',
      location: profile.location || '',
      role: profile.role || '',
      avatarUrl: profile.avatarUrl || '',
    });
    setErrors({});
    setStatusMessage({
      type: 'info',
      text: 'Đã hoàn tác dữ liệu form về giá trị ban đầu.',
    });
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          Chỉnh sửa thông tin cá nhân
        </Text>
        <Text style={[styles.screenSubtitle, { color: colors.textSecondary }]}>
          Thay đổi sẽ được kiểm tra hợp lệ (validation) và lưu tự động vào AsyncStorage.
        </Text>

        {statusMessage && (
          <StorageNotice
            type={statusMessage.type}
            message={statusMessage.text}
            onDismiss={() => setStatusMessage(null)}
          />
        )}

        {/* Form Container */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          {/* Field: Họ và tên */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Họ và tên <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Nhập họ và tên..."
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: errors.name ? colors.error : colors.border,
                },
              ]}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.name}
              </Text>
            )}
          </View>

          {/* Field: Email */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Email <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="example@fpt.edu.vn"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: errors.email ? colors.error : colors.border,
                },
              ]}
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Field: Vai trò / Chuyên ngành */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Vai trò / Chuyên ngành
            </Text>
            <TextInput
              value={formData.role}
              onChangeText={(text) => handleChange('role', text)}
              placeholder="Ví dụ: Mobile Developer Student"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          {/* Field: Số điện thoại */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Số điện thoại
            </Text>
            <TextInput
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
              placeholder="0912345678"
              keyboardType="phone-pad"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: errors.phone ? colors.error : colors.border,
                },
              ]}
            />
            {errors.phone && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.phone}
              </Text>
            )}
          </View>

          {/* Field: Địa chỉ / Cơ sở */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Địa chỉ / Cơ sở
            </Text>
            <TextInput
              value={formData.location}
              onChangeText={(text) => handleChange('location', text)}
              placeholder="Ví dụ: Cần Thơ, Việt Nam"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: errors.location ? colors.error : colors.border,
                },
              ]}
            />
            {errors.location && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.location}
              </Text>
            )}
          </View>

          {/* Field: Tiểu sử (Bio) */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>
                Tiểu sử (Bio)
              </Text>
              <Text
                style={[
                  styles.charCount,
                  {
                    color:
                      formData.bio.length > 150 ? colors.error : colors.textMuted,
                  },
                ]}
              >
                {formData.bio.length}/150
              </Text>
            </View>
            <TextInput
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
              placeholder="Mô tả ngắn về bạn..."
              multiline
              numberOfLines={3}
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.textPrimary,
                  borderColor: errors.bio ? colors.error : colors.border,
                },
              ]}
            />
            {errors.bio && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.bio}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            {/* Nút Save */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={isSubmitting}
              style={[
                styles.saveButton,
                { backgroundColor: colors.primary, opacity: isSubmitting ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.saveButtonText}>
                {isSubmitting ? 'Đang lưu...' : '💾 Lưu thay đổi'}
              </Text>
            </TouchableOpacity>

            {/* Nút Cancel */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCancel}
              style={[
                styles.cancelButton,
                {
                  borderColor: colors.border,
                  backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
                },
              ]}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textPrimary }]}>
                Hủy bỏ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reset form button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleResetForm}
            style={styles.resetButton}
          >
            <Text style={[styles.resetButtonText, { color: colors.textSecondary }]}>
              ↺ Khôi phục giá trị form ban đầu
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  charCount: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  buttonRow: {
    marginTop: 10,
    gap: 10,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 6,
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
