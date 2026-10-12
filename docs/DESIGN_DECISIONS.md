# Design Decision Record (DDR)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

Tài liệu này ghi nhận các quyết định kiến trúc và kỹ thuật chủ chốt, lý do lựa chọn, các giải pháp thay thế đã cân nhắc, và phân tích ảnh hưởng (impact analysis) khi yêu cầu thay đổi.

---

## 1. Quyết định Điều hướng (Navigation Architecture)

- **Lựa chọn:** React Navigation Native Stack Navigator (`@react-navigation/native-stack`) với cấu hình tập trung tại `src/navigation/AppNavigator.jsx`.
- **Lý do lựa chọn:**
  - Luồng ứng dụng theo dạng phân cấp tự nhiên: `Home` → `Profile` → `EditProfile`, `Home` → `Activity`, `Home` → `Settings`.
  - Native Stack tận dụng native animations (UINavigationController trên iOS / Fragment trên Android), mang lại hiệu năng cao và cảm giác mượt mà.
  - Phù hợp với phạm vi Assignment 1, giúp mã nguồn tường minh, dễ debug luồng chuyển trang và dễ giải thích trong buổi interview.
- **Giải pháp thay thế:** Bottom Tabs Navigator hoặc Drawer Navigator.
- **Đánh giá Trade-off:** Native Stack yêu cầu người dùng quay lui (Back) qua header thay vì chuyển tức thì qua thanh điều hướng đáy, nhưng loại bỏ sự phức tạp về việc đồng bộ state ngầm giữa các tab chưa active.
- **Tác động khi thay đổi yêu cầu:** Nếu giảng viên yêu cầu chuyển sang Bottom Tabs, ta chỉ cần tạo một Tab Navigator ở root và nhúng Stack con vào bên trong từng tab mà không phải sửa logic bên trong các screens.

---

## 2. Quyết định Quản lý State (State Ownership & Architecture)

- **Lựa chọn:** Phân cấp rõ ràng 3 tầng state:
  1. **Global Shared State (Context API):** `ThemeContext` (giao diện toàn ứng dụng) và `ProfileContext` (thông tin người dùng dùng chung giữa Profile, Home, Edit).
  2. **Local Form State (`useState`):** Nhập liệu, lỗi validation tại `EditProfileScreen`.
  3. **Local Collection State (`useState`):** Dữ liệu tương tác danh sách tại `ActivityScreen`.
- **Lý do lựa chọn:**
  - Tránh triệt để tình trạng prop-drilling mà không cần dùng Redux quá phức tạp cho quy mô vừa và nhỏ.
  - Tách biệt form state giúp việc gõ phím của người dùng (keystrokes) chỉ kích hoạt re-render cục bộ tại `EditProfileScreen`, không làm re-render toàn bộ ứng dụng.
- **Giải pháp thay thế:** Redux Toolkit hoặc Zustand.
- **Đánh giá Trade-off:** Context API sẽ re-render các consumer khi value thay đổi. Để tối ưu, các Context được tách riêng (`ThemeContext` và `ProfileContext`), đồng thời memoize callback với `useCallback`.
- **Tác động khi thay đổi yêu cầu:** Nếu cần thêm màn hình mới đọc thông tin Profile (ví dụ: `BadgeScreen` hoặc `AccountSummaryScreen`), chỉ cần gọi `useProfile()` mà không cần truyền props qua nhiều cấp.

---

## 3. Quyết định Lưu trữ và Phục hồi Dữ liệu (Persistence & Hydration)

- **Lựa chọn:** Tạo service chuyên trách `src/storage/appStorage.js` bọc quanh `@react-native-async-storage/async-storage` với cơ chế Try-Catch, JSON serialize/deserialize an toàn và fallback dữ liệu mặc định. Hydration được thực hiện bất đồng bộ khi khởi động thông qua `useEffect` trong từng Context Provider.
- **Lý do lựa chọn:**
  - Cách ly toàn bộ tương tác storage ra khỏi UI screens (Separation of Concerns).
  - Ngăn ngừa tình trạng crash app khi dữ liệu lưu cục bộ bị null, undefined hoặc corrupt JSON.
  - Đảm bảo first-run (người dùng mở lần đầu) luôn có dữ liệu an toàn (safe default).
- **Giải pháp thay thế:** Gọi trực tiếp `AsyncStorage.getItem/setItem` rải rác trong từng component/screen.
- **Đánh giá Trade-off:** Cần tạo các helper function (`getProfile`, `saveProfile`, `getTheme`, `saveTheme`) và quản lý cờ `isLoading`, nhưng code cực kỳ gọn, dễ viết unit test và dễ bảo trì.
- **Tác động khi thay đổi yêu cầu:** Nếu chuyển sang lưu trữ bằng SQLite hoặc Mock REST API, chỉ cần chỉnh sửa nội dung bên trong `appStorage.js`, toàn bộ giao diện và Context giữ nguyên 100%.

---

## 4. Quyết định Cấu trúc Danh sách (List Item & Interaction)

- **Lựa chọn:** Sử dụng `FlatList` trong `ActivityScreen.jsx` kết hợp với reusable component `ActivityItem.jsx`. Sử dụng `keyExtractor={(item) => item.id}` và xử lý tương tác cập nhật immutably (tạo mảng mới với `map`).
- **Lý do lựa chọn:**
  - `FlatList` chỉ render các phần tử trong khung nhìn (virtualized list), tối ưu bộ nhớ RAM và CPU trên thiết bị di động.
  - Tách `ActivityItem.jsx` giúp UI của từng dòng sạch sẽ, dễ áp dụng theme styling.
  - Tương tác toggle (tham gia / bỏ tham gia, bookmark) cập nhật state danh sách ngay lập tức mà không làm đột biến trực tiếp (mutation) mảng gốc.
- **Giải pháp thay thế:** `ScrollView` kết hợp `data.map()`.
- **Đánh giá Trade-off:** Đòi hỏi chuẩn hóa dữ liệu đầu vào với trường `id` duy nhất và viết hàm `renderItem`, nhưng mang lại hiệu năng cao và đáp ứng tiêu chí R06 của đề bài.
- **Tác động khi thay đổi yêu cầu:** Dễ dàng bổ sung tính năng lọc (Filter), tìm kiếm (Search) hoặc chuyển đổi sang `SectionList` theo từng phân loại (Category) dựa trên cấu trúc dữ liệu hiện tại.

---

## 5. Quyết định Tái sử dụng Component & Kiến trúc Thư mục

- **Lựa chọn:** Tổ chức kiến trúc mô-đun hóa cao:
  - `src/components/`: Chứa các thành phần UI dùng chung (`ScreenContainer`, `ThemeToggle`, `ActivityItem`, `LoadingScreen`, `StorageNotice`).
  - `src/context/`: Quản lý logic nghiệp vụ và state chia sẻ.
  - `src/data/`: Mock data chuẩn cho danh sách hoạt động.
  - `src/navigation/`: Cấu hình route và navigation stack.
  - `src/screens/`: 5 màn hình chức năng chính.
  - `src/storage/`: Tầng giao tiếp lưu trữ bền vững.
  - `src/utils/`: Logic xác thực form (`profileValidation.js`) thuần túy, không dính líu đến UI.
- **Lý do lựa chọn:**
  - Đạt điểm tối đa theo tiêu chuẩn đánh giá về cấu trúc mã nguồn, sạch sẽ, chuyên nghiệp.
  - Tách biệt rõ ràng giữa Presentation Component (UI) và Container / Controller Component.
  - `ScreenContainer` bọc SafeAreaView, StatusBar và Theme động cho tất cả màn hình, tránh lặp lại mã giao diện.
- **Giải pháp thay thế:** Gom toàn bộ mã nguồn vào 5 file màn hình và viết inline style.
- **Đánh giá Trade-off:** Tăng số lượng file, nhưng dễ định vị lỗi trong vòng 30 giây khi được giảng viên yêu cầu mở file chỉ code trong buổi vấn đáp.
- **Tác động khi thay đổi yêu cầu:** Bất kỳ thay đổi nào về giao diện chung (như màu chủ đạo, padding màn hình) chỉ cần sửa duy nhất tại `ScreenContainer` hoặc `ThemeContext`.
