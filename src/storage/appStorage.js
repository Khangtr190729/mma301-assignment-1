import AsyncStorage from '@react-native-async-storage/async-storage';

export const PROFILE_STORAGE_KEY = '@mma301_profile_v1';
export const THEME_STORAGE_KEY = '@mma301_theme_mode_v1';

export const DEFAULT_PROFILE = {
  name: 'Trương Hoàng Khang',
  email: 'khangthce190729@fpt.edu.vn',
  bio: 'Sinh viên ngành Kỹ thuật Phần mềm (SE) tại Đại học FPT Cần Thơ. Đam mê xây dựng ứng dụng di động hiệu năng cao với React Native.',
  phone: '0912345678',
  location: 'Cần Thơ, Việt Nam',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  role: 'Mobile Developer Student',
  joinedDate: 'Tháng 9, 2024',
};

export const DEFAULT_THEME = 'light';

/**
 * Đọc dữ liệu Profile từ AsyncStorage với Safe Fallback
 * @returns {Promise<typeof DEFAULT_PROFILE>}
 */
export const getProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
    if (jsonValue !== null) {
      const parsed = JSON.parse(jsonValue);
      // Kết hợp với DEFAULT_PROFILE để đảm bảo không thiếu field nếu dữ liệu cũ
      return { ...DEFAULT_PROFILE, ...parsed };
    }
    return DEFAULT_PROFILE;
  } catch (error) {
    console.warn('[appStorage] Lỗi đọc Profile từ AsyncStorage, sử dụng fallback an toàn:', error);
    return DEFAULT_PROFILE;
  }
};

/**
 * Lưu dữ liệu Profile vào AsyncStorage
 * @param {object} profileData
 * @returns {Promise<boolean>}
 */
export const saveProfile = async (profileData) => {
  try {
    const jsonValue = JSON.stringify(profileData);
    await AsyncStorage.setItem(PROFILE_STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('[appStorage] Lỗi lưu Profile vào AsyncStorage:', error);
    return false;
  }
};

/**
 * Đọc cài đặt Theme từ AsyncStorage
 * @returns {Promise<'light' | 'dark'>}
 */
export const getTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return DEFAULT_THEME;
  } catch (error) {
    console.warn('[appStorage] Lỗi đọc Theme từ AsyncStorage, fallback light:', error);
    return DEFAULT_THEME;
  }
};

/**
 * Lưu cài đặt Theme vào AsyncStorage
 * @param {'light' | 'dark'} themeMode
 * @returns {Promise<boolean>}
 */
export const saveTheme = async (themeMode) => {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode);
    return true;
  } catch (error) {
    console.error('[appStorage] Lỗi lưu Theme vào AsyncStorage:', error);
    return false;
  }
};

/**
 * Xóa dữ liệu để phục vụ kiểm thử First Run
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove([PROFILE_STORAGE_KEY, THEME_STORAGE_KEY]);
    return true;
  } catch (error) {
    console.error('[appStorage] Lỗi clearStorage:', error);
    return false;
  }
};
