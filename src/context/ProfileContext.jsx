import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getProfile, saveProfile, DEFAULT_PROFILE } from '../storage/appStorage';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [storageError, setStorageError] = useState(null);

  // Hydrate profile data khi app khởi động
  useEffect(() => {
    let isMounted = true;
    const hydrateProfile = async () => {
      try {
        const storedProfile = await getProfile();
        if (isMounted) {
          setProfile(storedProfile);
          setIsProfileLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setStorageError('Không thể nạp dữ liệu cá nhân từ bộ nhớ máy.');
          setIsProfileLoading(false);
        }
      }
    };
    hydrateProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Cập nhật Profile: Vừa cập nhật React state để UI re-render, vừa ghi vào AsyncStorage
   */
  const updateProfile = useCallback(async (newProfileData) => {
    const merged = { ...profile, ...newProfileData };
    // 1. Cập nhật state ngay lập tức
    setProfile(merged);
    // 2. Lưu vào AsyncStorage bất đồng bộ
    const success = await saveProfile(merged);
    if (!success) {
      setStorageError('Lỗi khi ghi dữ liệu vào AsyncStorage');
    }
    return success;
  }, [profile]);

  /**
   * Khôi phục profile về giá trị mặc định (phục vụ test)
   */
  const resetProfile = useCallback(async () => {
    setProfile(DEFAULT_PROFILE);
    await saveProfile(DEFAULT_PROFILE);
  }, []);

  const clearError = useCallback(() => {
    setStorageError(null);
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isProfileLoading,
      storageError,
      updateProfile,
      resetProfile,
      clearError,
    }),
    [profile, isProfileLoading, storageError, updateProfile, resetProfile, clearError]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile phải được sử dụng bên trong ProfileProvider');
  }
  return context;
};
