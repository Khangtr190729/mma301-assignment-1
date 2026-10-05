# Kiến trúc Ứng dụng (Architecture Design)

Dựa trên các đặc tả yêu cầu ở Phase 1, đây là bản thiết kế kiến trúc toàn diện nhưng vẫn giữ được sự đơn giản, rõ ràng, phù hợp cho bài tập nền tảng MMA301.

## 1. Cấu trúc Thư mục (Folder Structure)
```
/
├── App.js                  # Entry point, Root Providers, Navigation Container
├── src/
│   ├── components/         # Các UI component có thể tái sử dụng
│   │   ├── ProfileCard.js
│   │   ├── ThemeToggle.js
│   │   └── ActivityItem.js
│   ├── contexts/           # Global state Contexts
│   │   ├── ThemeContext.js
│   │   └── ProfileContext.js
│   ├── screens/            # Các màn hình chính
│   │   ├── HomeScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── EditProfileScreen.js
│   │   ├── ActivityScreen.js
│   │   └── SettingsScreen.js
│   ├── services/           # Xử lý các tác vụ side-effects
│   │   └── storage.js      # AsyncStorage helpers (load/save)
│   └── constants/          # Constants của app (màu sắc, mock data)
│       └── theme.js
```

## 2. Cấu trúc Điều hướng (Navigation Architecture)
Sử dụng thư viện `@react-navigation/native-stack`.
- **Stack Navigator**: Quản lý ngăn xếp các màn hình. Đơn giản, trực quan và dễ giải thích.
- Các route chính:
  - `Home` (Màn hình chính - Welcome)
  - `Profile` (Hiển thị thông tin)
  - `EditProfile` (Màn hình form chỉnh sửa)
  - `Activity` (Danh sách sở thích/hoạt động)
  - `Settings` (Cấu hình)

## 3. Trách nhiệm của các Screen (Screen Responsibilities)
- **HomeScreen**: Điểm khởi đầu. Chứa các nút (buttons) để điều hướng tới Profile, Activity và Settings. KHÔNG chứa logic state phức tạp.
- **ProfileScreen**: Lấy `profile` từ `ProfileContext` và hiển thị qua component `ProfileCard`. Chứa nút chuyển hướng sang `EditProfileScreen`.
- **EditProfileScreen**: Nơi duy nhất giữ state cục bộ của form (tên, bio). Xử lý logic validation khi bấm "Save". Nếu hợp lệ, nó sẽ gọi hàm cập nhật Context và Storage, sau đó điều hướng quay về Profile.
- **ActivityScreen**: Quản lý mảng danh sách các hoạt động (bằng `useState`). Sử dụng `FlatList` để render. Chứa hàm xử lý sự kiện khi người dùng tương tác (như đánh dấu yêu thích một hoạt động).
- **SettingsScreen**: Truy cập `ThemeContext` để lấy chế độ hiện tại. Chứa nút gạt (Switch) để thay đổi theme, hành động này cập nhật Context ngay lập tức.

## 4. Cấu trúc Component Tái sử dụng
Các component này được thiết kế theo dạng "Dumb Component" (chỉ nhận `props` và render), không tự gọi trực tiếp Context hoặc Storage.
- **ProfileCard**: Nhận `name`, `bio`, `avatarUrl` qua `props`. Đảm nhiệm UI cho thẻ thông tin người dùng.
- **ActivityItem**: Nhận `item` (dữ liệu 1 mục) và sự kiện `onToggle`. Hiển thị giao diện của một mục trong FlatList.

## 5. Cấu trúc Context
- **ThemeContext**: Cung cấp `theme` (ví dụ: 'light' hoặc 'dark') và hàm `toggleTheme()`. Bao bọc toàn bộ App để mọi screen có thể sử dụng.
- **ProfileContext**: Cung cấp `profile` object và hàm `updateProfile()`. Việc đặt ở Context là hợp lý vì cả `ProfileScreen` (để xem) và `EditProfileScreen` (để sửa) đều cần chung nguồn dữ liệu này.

## 6. Quyền sở hữu State (State Ownership)
- **Toàn cục (Global - Shared)**: Dữ liệu Profile và Theme (Nằm ở Context).
- **Cục bộ (Local - Screen level)**: Dữ liệu nháp đang gõ trong form (`EditProfile`), mảng dữ liệu danh sách (`ActivityScreen`). Dữ liệu này không cần thiết phải bung ra toàn cục.

## 7. Trách nhiệm của AsyncStorage (Persistence)
- Chỉ tương tác tại hai thời điểm để tránh lỗi đồng bộ (sync errors):
  1. **Khởi động (Startup/Hydration)**: `App.js` hoặc các Provider đọc từ Storage để gán vào Context ngay khi app mở.
  2. **Ghi (Save)**: Khi người dùng bấm lưu (chỉnh sửa profile hoặc thay đổi theme), gọi hàm ghi xuống Storage từ `services/storage.js`.
- Việc tách riêng file `storage.js` giúp code sạch sẽ và dễ viết fallback (mặc định) khi JSON lỗi.

## 8. Luồng Dữ liệu (Data Flow)
**Ví dụ luồng cập nhật Profile:**
1. Người dùng gõ text (UI) → 2. Kích hoạt Event (`onChangeText`) → 3. Cập nhật State cục bộ trong Form → 4. Bấm "Save" (Event `onSubmit`) → 5. Xác thực (nếu Pass) → 6. Cập nhật vào `ProfileContext` (Shared) VÀ lưu bằng `AsyncStorage` (Persistence) → 7. React tự động kích hoạt Re-render toàn bộ các UI dùng Context (ProfileScreen cập nhật).

## 9. Cây Component (Component Tree)
```text
App
 └─ ThemeProvider
     └─ ProfileProvider
         └─ NavigationContainer
             └─ Stack.Navigator
                 ├─ HomeScreen
                 ├─ ProfileScreen
                 │   └─ ProfileCard (Reusable)
                 ├─ EditProfileScreen
                 ├─ ActivityScreen
                 │   └─ FlatList
                 │       └─ ActivityItem (Reusable)
                 └─ SettingsScreen
```

## 10. Chiến lược Xử lý lỗi (Error/Fallback Strategy)
- **Hydration Fallback**: Khi `storage.js` đọc dữ liệu trả về `null` (chạy lần đầu) hoặc lỗi (JSON sai định dạng) -> `catch` lỗi và trả về dữ liệu mẫu mặc định (`Guest User`). Nhờ đó app không bị crash.
- **Validation Fallback**: Form `EditProfileScreen` kiểm tra rỗng. Nếu `!name.trim()`, hàm gọi `setError('Tên không được rỗng')` -> UI hiện viền đỏ hoặc text cảnh báo. Tiến trình Save bị dừng.

## 11. Chiến lược Layout Responsive (Flexbox)
- **Không hard-code pixel**: Sử dụng `flex: 1` làm tiêu chuẩn cho container của các màn hình để chiếm trọn khung hình.
- **Căn giữa linh hoạt**: Dùng `justifyContent: 'center'` và `alignItems: 'center'` cho màn hình Home/Settings.
- **Bố cục dọc/ngang**: Sử dụng `flexDirection: 'row'` (mặc định là column) để dàn xếp ngang các phần tử (ví dụ: Icon và chữ trong danh sách).

---

## 12. Ghi chú Quyết định Thiết kế (Design Decision Record)

1. **Điều hướng (Navigation)**
   - **Quyết định**: Sử dụng Native Stack Navigator.
   - **Tại sao**: Phù hợp cho luồng tuyến tính rõ ràng (Home → Profile → EditProfile). Code đơn giản, sinh viên dễ dàng theo dõi và debug sự thay đổi của Navigation Stack.
   - **Thay thế**: Tab Navigator.
   - **Trade-off**: Người dùng phải bấm Back để về Home, không chuyển tab tức thời được, nhưng bù lại luồng đi rõ ràng và tránh lỗi trùng lặp state ngầm giữa các tab.
   - **Khi yêu cầu đổi**: Có thể dễ dàng bọc Stack trong Tab sau này nếu ứng dụng phức tạp hơn.

2. **Quyền sở hữu State (State ownership)**
   - **Quyết định**: Dùng `Context API` cho Profile/Theme, dùng `useState` cho Form Edit.
   - **Tại sao**: Vừa đủ mạnh để giải quyết bài toán chia sẻ state qua nhiều màn hình (tránh prop-drilling) mà không bị "over-engineer". Form được tách riêng state để tránh re-render global khi người dùng gõ phím.
   - **Thay thế**: Dùng Redux.
   - **Trade-off**: Context sẽ render lại toàn bộ component con khi đổi state. Tuy nhiên với app nhỏ, điều này không ảnh hưởng hiệu năng và tránh được hàng chục dòng boilerplate code rườm rà của Redux.
   - **Khi yêu cầu đổi**: Nếu app phình to, có thể dùng Redux hoặc Zustand dễ dàng vì tư tưởng quy hoạch state đã chuẩn xác.

3. **Lưu trữ / Khôi phục (Persistence/hydration)**
   - **Quyết định**: Xử lý logic đọc (hydrate) ở cấp Provider trên cùng (hoặc App.js).
   - **Tại sao**: Dữ liệu cần được nạp ngay trước khi cây Component render để tránh hiện tượng nhấp nháy giao diện (flash of default state).
   - **Thay thế**: Đọc storage riêng lẻ ở mỗi màn hình.
   - **Trade-off**: Phải thêm trạng thái `isLoading` lúc ban đầu. Nhóm lại một chỗ làm code dễ debug hơn là rải rác gọi `getItem` ở nhiều nơi.
   - **Khi yêu cầu đổi**: Có thể ghép chung với SplashScreen (chờ đọc storage xong mới tắt màn hình splash).

4. **Cấu trúc List item (List item structure)**
   - **Quyết định**: Sử dụng `FlatList` với prop `keyExtractor` gán theo `id` duy nhất. UI của từng mục tách ra thành `ActivityItem` component.
   - **Tại sao**: `FlatList` tối ưu hóa bộ nhớ cho danh sách dài. ID duy nhất giúp React cập nhật UI chính xác khi bấm "Yêu thích".
   - **Thay thế**: Dùng `ScrollView` + `Array.map()`.
   - **Trade-off**: Phải setup mảng dữ liệu có cấu trúc từ trước (cần prop `data`, `renderItem`), nhưng mang lại hiệu năng hoàn hảo và đúng chuẩn bài tập.
   - **Khi yêu cầu đổi**: Có thể thay bằng `SectionList` chỉ bằng cách nhóm lại data array và cấu hình một chút mà không phải đập bỏ.

5. **Tái sử dụng Component (Folder/component reuse)**
   - **Quyết định**: Gom các UI thuần túy vào folder `src/components`.
   - **Tại sao**: Tách biệt rõ ràng logic (ở Screens) và hiển thị (ở Components). Dễ trình bày năng lực thiết kế trong buổi phỏng vấn đánh giá.
   - **Thay thế**: Viết tất cả mọi đoạn UI JSX ngay trong các file Screen.
   - **Trade-off**: Tốn thêm thời gian tạo file, định nghĩa props, và import, nhưng đổi lại code cực kỳ sạch và dễ đọc.
   - **Khi yêu cầu đổi**: Rất dễ tận dụng `ProfileCard` cho một chức năng tương tự (như màn hình danh bạ) nếu yêu cầu mới đòi hỏi.

---
## Kiểm tra độ phủ với Yêu cầu (Verification against RTM)
Tất cả các requirement từ RTM đều được thể hiện trong kiến trúc này:
- **R01**: App chạy → Có cấu trúc `App.js` làm điểm khởi đầu.
- **R02**: >= 5 màn hình → Kiến trúc Navigation có 5 màn hình.
- **R03**: Profile Data hiển thị → Thể hiện ở luồng `ProfileContext` -> `ProfileScreen`.
- **R04**: Edit Profile + Validation → Form state và Validation Fallback tại `EditProfileScreen`.
- **R05**: Shared Theme → Sử dụng `ThemeContext`.
- **R06**: FlatList → Quản lý tại `ActivityScreen` & `ActivityItem`.
- **R07**: Persistence → Cấu trúc service `storage.js` + Hydration logic.
- **R08**: Reusable component → Folder `src/components` với `ProfileCard`.
- **R09**: Responsive Flexbox → Mô tả rõ trong Chiến lược Flexbox.
- **R10**: Error/Fallback State → Giải quyết ở Hydration Fallback và Form Validation.

*(Không phát hiện Requirement nào bị mâu thuẫn hay bỏ sót trong bản thiết kế này)*
