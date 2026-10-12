# Requirement Traceability Matrix (RTM)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

| ID | Yêu cầu (Requirement) | Bằng chứng UI / Code (UI / Code Evidence) | Vị trí Source Code (Code Location) | Kịch bản kiểm thử (Test Scenario) | Kết quả mong đợi (Expected Outcome) | Trạng thái (Status) |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **R01** | Expo / React Native project chạy đúng quy ước, cold start mượt mà | Khởi động nguội ứng dụng không văng lỗi | `package.json`, `app.json`, `index.js`, `App.jsx` | Chạy lệnh `npx expo start` / `npm start` từ terminal sạch | Màn hình Splash/Loading mở lên bình thường, chuyển vào Home không crash | Pass |
| **R02** | Điều hướng liền mạch giữa ≥ 5 screens | Header, Navigation Stack chuyển màn hình, nút Back | `src/navigation/AppNavigator.jsx` | Mở lần lượt Home → Profile → Edit Profile → Activity → Settings và quay lại | Stack push/pop mượt mà, header hiển thị đúng title, không mất state | Pass |
| **R03** | Profile hiển thị thông tin đầy đủ, fallback an toàn | Profile card hiển thị avatar, name, email, bio, phone, location | `src/screens/ProfileScreen.jsx`, `src/context/ProfileContext.jsx` | Mở Profile lần đầu (chưa có dữ liệu lưu) và sau khi đã lưu | Hiển thị thông tin mặc định hợp lệ, không bị crash hoặc undefined | Pass |
| **R04** | Edit Profile có controlled inputs, validation, save / cancel flow | Form nhập liệu, thông báo lỗi validation realtime / submit | `src/screens/EditProfileScreen.jsx`, `src/utils/profileValidation.js` | 1. Nhập tên rỗng / bio quá dài<br>2. Nhập hợp lệ và Save<br>3. Thay đổi rồi Cancel | 1. Báo lỗi đỏ, chặn lưu<br>2. Cập nhật Profile tức thì<br>3. Không thay đổi dữ liệu cũ | Pass |
| **R05** | Shared Theme / Preferences qua Context API | Nút gạt Dark / Light mode, theme áp dụng toàn app | `src/context/ThemeContext.jsx`, `src/components/ThemeToggle.jsx` | Bật/tắt theme tại Settings hoặc header | Toàn bộ các screen và component đổi màu nền/chữ đồng bộ | Pass |
| **R06** | Hiển thị danh sách bằng FlatList kèm tương tác và empty state | Danh sách hoạt động / sở thích, nút toggle tham gia / bookmark | `src/screens/ActivityScreen.jsx`, `src/components/ActivityItem.jsx`, `src/data/activities.js` | 1. Render danh sách có item<br>2. Tương tác toggle state item<br>3. Filter danh sách về rỗng (0 items) | 1. FlatList cuộn mượt, key duy nhất<br>2. Cập nhật trạng thái item ngay<br>3. Hiện component Empty State trực quan | Pass |
| **R07** | Persistence dữ liệu bằng AsyncStorage | Dữ liệu profile và theme không mất sau khi restart app | `src/storage/appStorage.js`, `ProfileContext.jsx`, `ThemeContext.jsx` | 1. Lưu Profile và đổi Theme<br>2. Tắt app hoàn toàn (kill process) và mở lại | App hydrate thành công dữ liệu đã lưu, không bị nhấp nháy giao diện | Pass |
| **R08** | Reusable UI Components độc lập, tái sử dụng tốt | Container, Toggle, Card, Loading, Storage Notice | Thư mục `src/components/` | Sử dụng chung `ScreenContainer`, `ThemeToggle`, `ActivityItem`, `StorageNotice` | Giảm trùng lặp mã nguồn, nhận props và render nhất quán | Pass |
| **R09** | Bố cục Responsive Flexbox | Giao diện chuẩn portrait, tương thích các kích cỡ màn hình | `StyleSheet` trong từng screen và component | Chạy thử nghiệm trên nhiều độ phân giải màn hình khác nhau | Giao diện co giãn tự nhiên, không tràn viền (overflow), không vỡ layout | Pass |
| **R10** | Error / Fallback handling khi local storage lỗi hoặc dữ liệu hỏng | Fallback về default state, thông báo thân thiện | `src/storage/appStorage.js`, `src/components/StorageNotice.jsx` | Giả lập chuỗi JSON hỏng trong AsyncStorage | App bắt ngoại lệ (try-catch), nạp dữ liệu mặc định an toàn, không crash | Pass |
