# Learning Map & Chuẩn bị Vấn đáp (Interview Preparation)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

## 1. Bản đồ Năng lực (CLO Mapping)

- **CLO1 (Understand Mobile Architecture):** Hiểu rõ vòng đời ứng dụng di động, kiến trúc React Native, luồng render và cơ chế Bridge/Fabric.
- **CLO2 (Navigation & Routing):** Làm chủ Stack Navigator, cấu hình route, truyền tham số và quản lý Back stack.
- **CLO3 (Component Hierarchy):** Xây dựng component phân cấp: Presentational (Dumb) Components (`ActivityItem`, `ThemeToggle`, `ScreenContainer`) và Container / Screen Components.
- **CLO4 (State Management):** Phân biệt chính xác Local State (`useState`), Shared State (Context API) và Persistent State (AsyncStorage).
- **CLO5 (Forms & Validation):** Xử lý Controlled Components, lắng nghe sự kiện `onChangeText`, kiểm tra validation đa điều kiện và chặn submit khi có lỗi.
- **CLO6 (Lists & Performance):** Hiển thị danh sách động với `FlatList`, cấu hình `renderItem`, `keyExtractor` duy nhất và thiết kế Empty State thân thiện.
- **CLO7 (Responsive Styling & Theming):** Bố cục giao diện với Flexbox, `StyleSheet` linh hoạt, hỗ trợ Light/Dark mode toàn ứng dụng.
- **CLO9 (Local Persistence):** Quản lý lưu trữ không đồng bộ với AsyncStorage, serialize/deserialize JSON an toàn và xử lý fallback dữ liệu.

---

## 2. Rehearsal Checklist (Mở file trong ≤ 30 giây)

| Yêu cầu vấn đáp của Giảng viên | File cần mở ngay lập tức | Dòng code / Khối logic trọng tâm |
| :--- | :--- | :--- |
| **1. Mở Navigation config và chỉ các route** | `src/navigation/AppNavigator.jsx` | Khối `createNativeStackNavigator()` và các `Stack.Screen` |
| **2. Mở Theme Context và chỉ Provider / Value** | `src/context/ThemeContext.jsx` | Khối `createContext()`, `ThemeContext.Provider` và giá trị `colors` |
| **3. Mở Profile Context và chỉ Provider / Value** | `src/context/ProfileContext.jsx` | `ProfileContext.Provider value={{ profile, updateProfile, isLoading }}` |
| **4. Mở logic Save / Validation của Edit Profile** | `src/screens/EditProfileScreen.jsx` & `src/utils/profileValidation.js` | Hàm `handleSave()` và hàm `validateProfileForm()` |
| **5. Mở AsyncStorage helper và Hydration logic** | `src/storage/appStorage.js` & `src/context/ProfileContext.jsx` | Hàm `getProfile()`, `saveProfile()` và hook `useEffect` gọi `loadStoredProfile()` |
| **6. Mở FlatList renderItem và keyExtractor** | `src/screens/ActivityScreen.jsx` | Khối thẻ `<FlatList data={...} renderItem={renderItem} keyExtractor={(item) => item.id} />` |
| **7. Mở Reusable Components** | `src/components/ScreenContainer.jsx`, `ThemeToggle.jsx` | Các components nhận `children`, `style`, `props` và áp dụng màu theme động |

---

## 3. Khung 5 Tầng Giải Thích Code (5-Layer Code Explanation)

Khi giảng viên chỉ vào bất kỳ đoạn code nào, trả lời theo 5 bước:
1. **Purpose:** Khối code này giải quyết nhiệm vụ gì? (ví dụ: xác thực dữ liệu đầu vào người dùng trước khi lưu).
2. **Input:** Nhận dữ liệu / props / state nào đi vào? (ví dụ: `name`, `bio`, `email`).
3. **Trigger:** Sự kiện / hook nào kích hoạt nó chạy? (ví dụ: sự kiện `onPress` của nút "Lưu thay đổi").
4. **Transform:** Logic xử lý / biến đổi dữ liệu là gì? (ví dụ: hàm `trim()`, kiểm tra rỗng, kiểm tra độ dài chuỗi).
5. **Output / Failure Path:** Kết quả trả về là gì? Nếu lỗi thì đi theo nhánh nào? (ví dụ: Nếu lỗi gán `errors` và dừng lại; Nếu hợp lệ thì gọi `updateProfile` và `navigation.goBack()`).
