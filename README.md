# Personal Profile & Activity App (MMA301 Assignment 1)

**Môn học:** MMA301 – Multiplatform Mobile App Development  
**Sinh viên:** Trương Hoàng Khang  
**MSSV:** CE190729  
**Nền tảng:** React Native (0.86.3) + Expo (SDK 57)  
**Package Name:** `truonghoangkhang_ce190729`  

---

## 1. Giới thiệu tổng quan (Overview)
Ứng dụng **Personal Profile & Activity App** là sản phẩm thực hành nền tảng cho môn học MMA301. Ứng dụng triển khai một workflow di động hoàn chỉnh bao gồm quản lý hồ sơ người dùng, duyệt và tương tác danh sách hoạt động, tùy biến giao diện toàn ứng dụng (Dark/Light mode), và lưu trữ dữ liệu bền vững (persistence) bằng AsyncStorage.

---

## 2. Kiến trúc thư mục chuẩn (Folder Structure)

```text
truonghoangkhang_ce190729/
├── assets/                     # Tài nguyên hình ảnh, app icons
├── docs/                       # Bộ hồ sơ đánh giá và tài liệu kỹ thuật
│   ├── AI_USAGE_LOG.md         # Nhật ký sử dụng AI có kiểm soát
│   ├── DEBUG_LOG.md            # Nhật ký phân tích và sửa lỗi thực tế (2 bugs)
│   ├── DESIGN_DECISIONS.md     # Bản ghi 5 quyết định thiết kế cốt lõi
│   ├── LEARNING_MAP.md         # Bản đồ năng lực CLO & Checklist phỏng vấn
│   ├── REQUIREMENT_TRACEABILITY_MATRIX.md # Ma trận RTM (R01 - R10)
│   └── TEST_MATRIX.md          # Ma trận kiểm thử Normal/Negative/Edge (13 test cases)
├── src/
│   ├── components/             # Reusable UI Components
│   │   ├── ActivityItem.jsx    # Thẻ hoạt động dùng trong FlatList
│   │   ├── LoadingScreen.jsx   # Màn hình chờ khi nạp dữ liệu
│   │   ├── ScreenContainer.jsx # Safe area wrapper & theme container dùng chung
│   │   ├── StorageNotice.jsx   # Banner thông báo trạng thái/lỗi lưu trữ
│   │   └── ThemeToggle.jsx     # Nút gạt chuyển đổi Dark / Light mode
│   ├── context/                # Global State Management (Context API)
│   │   ├── ProfileContext.jsx  # Chia sẻ dữ liệu Profile toàn app
│   │   └── ThemeContext.jsx    # Chia sẻ Theme & bảng màu động
│   ├── data/
│   │   └── activities.js       # Dữ liệu mẫu danh sách hoạt động
│   ├── navigation/
│   │   └── AppNavigator.jsx    # Cấu hình Native Stack Navigation (5 screens)
│   ├── screens/                # Các màn hình chính của ứng dụng
│   │   ├── ActivityScreen.jsx  # Danh sách hoạt động (FlatList, lọc, toggle)
│   │   ├── EditProfileScreen.jsx # Form chỉnh sửa hồ sơ & validation
│   │   ├── HomeScreen.jsx      # Màn hình chào mừng & tổng quan
│   │   ├── ProfileScreen.jsx   # Hiển thị hồ sơ cá nhân chi tiết
│   │   └── SettingsScreen.jsx  # Cài đặt giao diện & quản lý bộ nhớ
│   ├── storage/
│   │   └── appStorage.js       # Helper bọc AsyncStorage có try-catch & fallback
│   └── utils/
│       └── profileValidation.js # Module kiểm tra dữ liệu form độc lập
├── .gitignore
├── app.json                    # Cấu hình Expo
├── App.jsx                     # Entry point (Root Providers & Navigation)
├── index.js                    # Đăng ký root component cho Expo
├── LICENSE
├── package.json
└── README.md
```

---

## 3. Hướng dẫn cài đặt và chạy ứng dụng (Setup & Run)

### Yêu cầu môi trường
- Node.js version 18 trở lên.
- Thiết bị cài đặt ứng dụng **Expo Go** (Android/iOS) hoặc máy ảo Android/iOS Simulator.

### Các bước thực thi
1. **Mở thư mục dự án:**
   ```bash
   cd mma301_assignment_1
   ```
2. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```
3. **Khởi động Expo Development Server:**
   ```bash
   npx expo start
   ```
4. **Trải nghiệm trên thiết bị:**
   - Dùng camera điện thoại (iOS) hoặc app **Expo Go** (Android) quét mã QR hiển thị trong terminal.
   - Hoặc nhấn phím `a` để mở trên Android Emulator.
   - Hoặc nhấn phím `w` để mở giao diện Web.

---

## 4. Bản đồ luồng công việc (Workflow Map)

1. **Khởi động (Startup / Hydration Flow):**
   - App đọc dữ liệu `profile` và `theme` từ AsyncStorage qua `src/storage/appStorage.js`.
   - Nếu là lần đầu mở app (First Run) hoặc dữ liệu rỗng: Tự động nạp `DEFAULT_PROFILE` và `light` theme mà không gây lỗi crash.
2. **Luồng Hồ sơ (Profile & Edit Flow):**
   - `HomeScreen` → Điều hướng sang `ProfileScreen` hiển thị thông tin.
   - Nhấn **"Chỉnh sửa hồ sơ"** → Chuyển sang `EditProfileScreen`.
   - Nhập liệu vào form controlled inputs → Nhấn **"Lưu thay đổi"**:
     - Kích hoạt `validateProfileForm`: Kiểm tra tên không để trống, email đúng định dạng, bio ≤ 150 ký tự.
     - Nếu lỗi: Báo viền đỏ và chặn lưu.
     - Nếu hợp lệ: Cập nhật `ProfileContext` và đồng bộ vào `AsyncStorage`, quay lại `ProfileScreen` với thông tin cập nhật tức thì.
   - Nhấn **"Hủy bỏ"**: Quay lại mà không lưu dữ liệu nháp.
3. **Luồng Danh sách & Tương tác (Activity Flow):**
   - Mở `ActivityScreen`: `FlatList` render danh sách với các trường category, time, location.
   - Nhấn nút **"Tham gia hoạt động"**: Trạng thái item đổi ngay lập tức qua immutable update (`map`).
   - Tìm kiếm từ khóa hoặc chọn filter category: Danh sách lọc realtime. Khi không có kết quả, hiển thị **Empty State** thân thiện.
4. **Luồng Giao diện & Cài đặt (Theme & Settings Flow):**
   - Mở `SettingsScreen`: Bật/tắt Dark Mode qua `ThemeToggle`.
   - Toàn bộ 5 screens và các components đổi màu nền/chữ đồng bộ.
   - Khởi động lại ứng dụng: Giao diện giữ nguyên theme đã chọn (nhờ AsyncStorage).

---

## 5. Chiến lược Quản lý State & Lưu trữ bền vững (State & Persistence)

| Tầng State | Công nghệ | Phạm vi áp dụng | Lý do thiết kế |
| :--- | :--- | :--- | :--- |
| **Local State** | `useState` | Form inputs, modal, search query | Tránh re-render toàn app khi gõ phím. |
| **Shared State** | `Context API` | `ProfileContext`, `ThemeContext` | Chia sẻ dữ liệu giữa nhiều screen mà không cần prop-drilling. |
| **Persistent State** | `AsyncStorage` | Dữ liệu Profile và Theme mode | Giữ trạng thái qua các lần khởi động lại app. |

---

## 6. Giới hạn hiện tại (Limitations)
- Sử dụng mock data cục bộ cho danh sách hoạt động, chưa kết nối API máy chủ bên ngoài.
- Dữ liệu avatar hiện đang dùng URL ảnh tĩnh, chưa tích hợp thư viện chọn ảnh native camera/gallery.

---

## 7. Sử dụng AI có trách nhiệm (AI Usage Statement)
- Sinh viên sử dụng AI hỗ trợ theo đúng quy trình 6 bước: **Ask → Inspect → Adapt → Run → Explain → Record**.
- Chi tiết mục đích sử dụng, prompt và các phần đã tự chỉnh sửa/kiểm chứng được lưu trữ đầy đủ tại [docs/AI_USAGE_LOG.md](file:///c:/Users/truon/OneDrive/Desktop/MMA/mma301_assignment_1/docs/AI_USAGE_LOG.md).
