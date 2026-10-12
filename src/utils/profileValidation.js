/**
 * Utility xác thực dữ liệu Profile Form độc lập
 * Tuân thủ R04: Controlled form + validation + save/cancel flow
 */

export const validateProfileForm = (formData) => {
  const errors = {};

  // 1. Kiểm tra Họ và Tên (bắt buộc, không để trống, độ dài từ 2 đến 50 ký tự)
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Họ và tên không được để trống.';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự.';
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Họ và tên không được vượt quá 50 ký tự.';
  }

  // 2. Kiểm tra Email (định dạng email cơ bản)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email không được để trống.';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Định dạng email không hợp lệ (ví dụ: name@example.com).';
  }

  // 3. Kiểm tra Tiểu sử (tối đa 150 ký tự)
  if (formData.bio && formData.bio.length > 150) {
    errors.bio = `Tiểu sử không được vượt quá 150 ký tự (hiện tại: ${formData.bio.length}).`;
  }

  // 4. Kiểm tra Số điện thoại (tùy chọn nhưng nếu có phải đúng 10 số)
  if (formData.phone && formData.phone.trim()) {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Số điện thoại phải từ 10 đến 11 chữ số.';
    }
  }

  // 5. Kiểm tra Vị trí / Địa chỉ (tối đa 100 ký tự)
  if (formData.location && formData.location.trim().length > 100) {
    errors.location = 'Địa chỉ không được vượt quá 100 ký tự.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
