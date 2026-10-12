# Debug Log (Nhật ký gỡ lỗi thực tế)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

Quy trình debug tuân thủ chuẩn 5 bước của kỹ sư:
1. **Mô tả triệu chứng** quan sát được.
2. **Khoanh vùng** screen / component / state / service liên quan.
3. **Kiểm tra** input / state hiện tại.
4. **Kiểm tra** điểm biến đổi (transformation) / lời gọi bất đồng bộ (async call).
5. **Sửa đổi nhỏ nhất (minimal fix)** → chạy lại test case → kiểm tra hồi quy (regression).

---

## Lỗi 1: Sau khi Save ở EditProfileScreen, quay lại ProfileScreen nhưng UI vẫn hiển thị tên cũ

- **Triệu chứng (Symptom):** Người dùng nhập tên mới, nhấn nút "Lưu thay đổi", màn hình tự động quay lại `ProfileScreen` bằng lệnh `navigation.goBack()`, nhưng text hiển thị tên người dùng vẫn là tên cũ. Phải tắt app bật lại thì mới thấy cập nhật.
- **Giả thuyết (Hypothesis):** State của Profile ở `ProfileScreen` đang đọc từ local `useState` khởi tạo 1 lần hoặc `updateProfile` chỉ ghi vào AsyncStorage mà chưa cập nhật giá trị trong React Context state.
- **Cách kiểm tra (Investigation):**
  - Đặt `console.log('Context profile value:', profile)` tại `ProfileScreen`.
  - Kiểm tra hàm `saveProfile` trong `ProfileContext.jsx` xem có gọi `setProfile(updatedProfile)` đồng thời với `appStorage.saveProfile(updatedProfile)` hay không.
- **Nguyên nhân gốc rễ (Root Cause):** Trong `ProfileContext.jsx`, hàm `updateProfile` gọi `await appStorage.saveProfile(newData)` thành công nhưng quên cập nhật local state của Provider `setProfile(newData)`. Do đó, các component con đăng ký lắng nghe context không nhận được tín hiệu re-render.
- **Cách sửa (Fix):**
  ```javascript
  // ProfileContext.jsx
  const updateProfile = async (newProfileData) => {
    // 1. Cập nhật React State ngay lập tức để UI re-render
    setProfile(newProfileData);
    // 2. Lưu bền vững vào AsyncStorage
    await appStorage.saveProfile(newProfileData);
  };
  ```
- **Kiểm tra lại (Retest):** Nhập tên mới "Trương Hoàng Khang VIP" → Bấm Save → `navigation.goBack()` → `ProfileScreen` hiển thị ngay lập tức tên mới mà không cần reload. Kết quả: **Pass**.

---

## Lỗi 2: Ứng dụng bị văng (Crash) khi AsyncStorage chứa dữ liệu JSON bị hỏng hoặc null

- **Triệu chứng (Symptom):** Khi chạy app trên một môi trường mới hoặc khi giả lập dữ liệu AsyncStorage bị lỗi cú pháp (`"undefined"` hoặc `{ corrupted: `), ứng dụng gặp lỗi đỏ `SyntaxError: JSON Parse error: Unexpected token` và dừng ứng dụng tại bước khởi động.
- **Giả thuyết (Hypothesis):** Hàm `JSON.parse` được gọi trực tiếp trên giá trị trả về từ `AsyncStorage.getItem()` mà không kiểm tra giá trị `null` hoặc không được bọc trong khối `try...catch`.
- **Cách kiểm tra (Investigation):**
  - Mở file `src/storage/appStorage.js`.
  - Kiểm tra hàm `getProfile()` và `getTheme()`.
- **Nguyên nhân gốc rễ (Root Cause):** `appStorage.js` gọi `const data = JSON.parse(storedValue)` trực tiếp. Khi `storedValue` là dữ liệu không hợp lệ hoặc chuỗi lỗi thời, `JSON.parse` bắn ngoại lệ chưa được xử lý (unhandled exception).
- **Cách sửa (Fix):**
  ```javascript
  // src/storage/appStorage.js
  export const getProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
      return DEFAULT_PROFILE; // Safe fallback cho first-run
    } catch (error) {
      console.warn('Lỗi đọc AsyncStorage profile, sử dụng default:', error);
      return DEFAULT_PROFILE; // Fallback an toàn, không để app crash
    }
  };
  ```
- **Kiểm tra lại (Retest):** Cố ý ghi một chuỗi rác vào AsyncStorage (`"{bad_json"`) rồi reload app. Ứng dụng không crash, tự động chuyển về `DEFAULT_PROFILE` an toàn và hiển thị thông báo nhẹ nhàng cho người dùng. Kết quả: **Pass**.
