# Nhật ký sử dụng AI (AI Usage Log)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang  
**MSSV:** CE190729  
**Kho mã nguồn:** [https://github.com/Khangtr190729/mma301-assignment-1](https://github.com/Khangtr190729/mma301-assignment-1)  

---

## 07/10/2026 — M1: Khởi tạo kiến trúc điều hướng Native Stack Navigator

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ thiết lập khung điều hướng chuẩn cho ứng dụng theo đặc tả đề bài MMA301 Assignment 1: sử dụng `@react-navigation/native-stack` kết nối 5 màn hình bắt buộc (`HomeScreen`, `ProfileScreen`, `EditProfileScreen`, `ActivityScreen`, `SettingsScreen`).
- Tách biệt hoàn toàn phần cấu hình điều hướng ra file riêng (`src/navigation/AppNavigator.jsx`), giữ cho `App.jsx` đóng vai trò là root wrapper sạch sẽ.
- Phạm vi M1: Chỉ xây dựng navigation skeleton và bố cục điều hướng tuyến tính, chưa gắn Context API, chưa xử lý lưu trữ AsyncStorage và chưa làm form nhập liệu phức tạp.
- Tài liệu tham khảo: [React Navigation Native Stack Documentation](https://reactnavigation.org/docs/native-stack-navigator/) và [Expo Navigation Guide](https://docs.expo.dev/router/introduction/).

### Mục đích

Xây dựng bộ khung điều hướng phân cấp (hierarchical linear navigation) vững chắc, giúp người học hiểu rõ khái niệm Stack Navigator, cách push/pop route, header options và truyền navigation prop giữa các màn hình trước khi tích hợp logic nghiệp vụ.

### Nội dung do AI tạo đã được sử dụng

- Gợi ý cấu trúc tách file: `src/navigation/AppNavigator.jsx` độc lập với root `App.jsx`.
- Khung cấu hình `createNativeStackNavigator()` với 5 `Stack.Screen`.
- Các nút chuyển tiếp màn hình mẫu (`navigation.navigate('Profile')`, `navigation.navigate('Activity')`, `navigation.navigate('Settings')`) và nút quay lại (`navigation.goBack()`).

### Những nội dung đã điều chỉnh

- Sinh viên yêu cầu giữ nguyên tên package trong `package.json` theo quy ước của trường/bài tập, không đổi tên tùy tiện theo template bên ngoài.
- Tự chuẩn hóa quy ước đặt tên component bằng `.jsx` và `PascalCase` cho toàn bộ các màn hình và thanh điều hướng.
- Ẩn header mặc định tại `HomeScreen` (`headerShown: false`) để tự thiết kế phần chào mừng thương hiệu tùy biến, chỉ giữ lại header chuẩn cho các màn hình con.
- Đặt tiêu đề rõ ràng bằng tiếng Việt cho từng màn hình trên header: "Hồ sơ cá nhân", "Chỉnh sửa hồ sơ", "Hoạt động & Sự kiện", "Cài đặt hệ thống".

### Cách kiểm chứng và kết quả thực tế

Các bước kiểm tra được thực hiện trên PowerShell tại thư mục gốc dự án:

| Lệnh hoặc bước kiểm tra | Kết quả thực tế |
| :--- | :--- |
| `git status` trước khi làm | Nhánh `main`, working tree sạch |
| `npx expo config --type public` | Đọc cấu hình app thành công, đúng slug `TruongHoangKhang_CE190729`, Expo SDK 57 |
| Kiểm tra route cấu hình trong `AppNavigator.jsx` | Đủ 5 route hợp lệ: `Home`, `Profile`, `EditProfile`, `Activity`, `Settings` |
| Thao tác điều hướng từ `HomeScreen` | Mở đúng từng màn hình con tương ứng, không bị lỗi `Undefined route` |
| Kiểm tra nút Back từ màn hình con | Quay lại đúng màn hình trước đó theo cơ chế ngăn xếp (LIFO), không mất lịch sử navigation |

### Vấn đề đã gặp và cách xử lý

- **Triệu chứng:** Khi chuyển từ `App.js` sang `App.jsx`, Metro Bundler ưu tiên tìm file `App.js` cũ gây xung đột nội dung.
- **Giả thuyết:** Trong thư mục gốc tồn tại song song cả `App.js` và `App.jsx`.
- **Nguyên nhân gốc:** Metro resolver trên môi trường Windows ưu tiên load extension `.js` trước `.jsx` nếu cùng tên cơ sở.
- **Cách xử lý:** Xóa bỏ hoàn toàn file `App.js` cũ sau khi chuyển nội dung sang `App.jsx`.
- **Kiểm tra lại:** Metro nhận diện và nạp chính xác `App.jsx`, ứng dụng khởi động không còn cảnh báo trùng lặp.

---

## 08/10/2026 — M2: Xây dựng Theme Context & Reusable UI Foundation

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ xây dựng hệ thống giao diện đồng bộ hỗ trợ Dark / Light Mode sử dụng React Context API (`ThemeContext.jsx`).
- Thiết kế tối thiểu 3 reusable components dùng chung để giảm trùng lặp code và đảm bảo giao diện thích ứng responsive.
- Phạm vi M2: Quản lý theme mode trong bộ nhớ React State, áp dụng theme động lên background, text, card và header; chưa xử lý lưu trữ vĩnh viễn xuống đĩa.
- Tài liệu tham khảo: [React Context API Official Docs](https://react.dev/reference/react/useContext) và [React Native StyleSheet & Flexbox](https://reactnative.dev/docs/flexbox).

### Mục đích

Hiểu sâu về cơ chế chia sẻ state không cần truyền props qua nhiều tầng (prop-drilling), vai trò của `Context.Provider`, hook tùy biến `useTheme()`, và kỹ thuật tách các Presentational Component dùng lại được nhiều nơi.

### Nội dung do AI tạo đã được sử dụng

- Cấu trúc khởi tạo `createContext(null)` và hook tùy biến `useTheme()`.
- Bảng màu mẫu (color palettes) cho hai chế độ `light` và `dark` gồm các token: `background`, `cardBackground`, `textPrimary`, `textSecondary`, `primary`, `cardBorder`.
- Khung cấu trúc component `ThemeToggle.jsx` sử dụng component `Switch` của React Native.

### Những nội dung đã điều chỉnh

- Thay vì viết CSS inline rải rác, sinh viên yêu cầu xây dựng component bao bọc dùng chung `ScreenContainer.jsx` tích hợp sẵn `SafeAreaView` từ `react-native-safe-area-context` và tự động đổi màu `StatusBar` (sáng/tối) theo theme.
- Tự bổ sung thêm hai reusable component: `LoadingScreen.jsx` (hiển thị vòng xoay tiến trình khi khởi tạo) và `StorageNotice.jsx` (banner thông báo phản hồi trạng thái với các màu success, error, warning).
- Tinh chỉnh độ tương phản màu sắc (contrast ratio) của bảng Dark mode để chữ `textPrimary` (#F8FAFC) và `textSecondary` (#94A3B8) hiển thị sắc nét trên nền `#0F172A`, không gây mỏi mắt.

### Cách kiểm chứng và kết quả thực tế

| Lệnh hoặc bước kiểm tra | Kết quả thực tế |
| :--- | :--- |
| Kiểm tra Provider Tree tại `App.jsx` | `ThemeProvider` bọc ngoài `NavigationContainer`, cung cấp theme cho toàn bộ cây component |
| Bật Switch `ThemeToggle` tại Settings | Giá trị `isDark` đổi từ `false` sang `true`, toàn bộ nền app chuyển sang tông tối tức thì |
| Kiểm tra header của Native Stack | Header đổi màu nền sang `#1E293B`, màu chữ và nút Back đổi sang trắng sáng đồng bộ |
| Render component `ScreenContainer` | Nội dung được căn chỉnh an toàn trong vùng hiển thị (safe area), không bị tràn vào notch tai thỏ |

### Vấn đề đã gặp và cách xử lý

- **Triệu chứng:** Header của React Navigation không tự động đổi màu khi người dùng gạt nút chuyển đổi theme.
- **Giả thuyết:** `Stack.Navigator` được khởi tạo tĩnh nên không nhận được giá trị theme mới từ Context.
- **Nguyên nhân gốc:** Options `headerStyle` và `headerTintColor` của navigator không được đặt bên trong component con tiêu thụ `useTheme()`.
- **Cách xử lý:** Đưa `useTheme()` vào trong `AppNavigator.jsx` và gán dynamic `screenOptions` phụ thuộc vào `colors.cardBackground` và `colors.textPrimary`.
- **Kiểm tra lại:** Header đổi màu tức thì ngay khi toggle theme trên bất kỳ màn hình nào.

---

## 09/10/2026 — M3: Quản lý Profile bằng Context & Validation Form

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ thiết kế luồng quản lý thông tin hồ sơ người dùng (`ProfileContext.jsx`), màn hình xem hồ sơ (`ProfileScreen.jsx`), và form chỉnh sửa có kiểm tra dữ liệu (`EditProfileScreen.jsx`).
- Triển khai form nhập liệu controlled inputs (sử dụng local `useState`), kiểm tra hợp lệ độc lập và luồng Save / Cancel rõ ràng.
- Phạm vi M3: Xử lý dữ liệu hồ sơ trong bộ nhớ, kiểm tra validation đa điều kiện (tên không rỗng, email hợp lệ, độ dài bio); hủy bỏ thì không lưu nháp.
- Tài liệu tham khảo: [React Controlled Components](https://react.dev/reference/react-dom/components/input) và quy chuẩn R03, R04 của MMA301.

### Mục đích

Phân biệt rành mạch giữa **Local Form State** (chỉ tồn tại trong vòng đời màn hình nhập liệu) và **Shared Profile State** (chia sẻ cho cả `ProfileScreen` và `HomeScreen`). Làm chủ quy trình xác thực dữ liệu phía client trước khi ghi state.

### Nội dung do AI tạo đã được sử dụng

- Gợi ý cấu trúc trường dữ liệu hồ sơ: `name`, `email`, `role`, `bio`, `phone`, `location`, `avatarUrl`.
- Regex kiểm tra định dạng email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- Cấu trúc Provider `ProfileContext.Provider` xuất ra các hàm `profile`, `updateProfile`.

### Những nội dung đã điều chỉnh

- Từ chối đề xuất sử dụng thư viện form bên ngoài quá nặng (như Formik hay Yup) để tránh làm phình to bundle; thay vào đó, sinh viên yêu cầu tự viết module xác thực thuần túy tại `src/utils/profileValidation.js` trả về `{ isValid, errors }`.
- Thiết kế luồng hủy rõ ràng: nút **"Hủy bỏ"** chỉ gọi `navigation.goBack()`, không đụng chạm đến `ProfileContext`, đảm bảo các ký tự gõ dở bị loại bỏ hoàn toàn.
- Bổ sung thêm nút **"↺ Khôi phục giá trị form ban đầu"** để người dùng có thể xóa nháp nhanh chóng khi đang chỉnh sửa.
- Thiết kế phản hồi trực quan: khi có lỗi validation, ô nhập liệu hiện viền đỏ nổi bật kèm thông báo lỗi cụ thể bên dưới mỗi trường.

### Cách kiểm chứng và kết quả thực tế

| Kịch bản kiểm thử | Dữ liệu kiểm tra | Kết quả thực tế | Đánh giá |
| :--- | :--- | :--- | :---: |
| Nhập họ tên rỗng | Name: `""` | Báo lỗi đỏ "Họ và tên không được để trống", chặn submit | Đạt |
| Nhập bio quá dài | Bio: `> 150 ký tự` | Hiển thị cảnh báo số ký tự vượt mức quy định, chặn submit | Đạt |
| Nhập email sai định dạng | Email: `"khang_khong_hop_le"` | Báo lỗi "Định dạng email không hợp lệ", chặn submit | Đạt |
| Nhập dữ liệu hợp lệ & Lưu | Name: `"Trương Hoàng Khang VIP"` | Cập nhật context, quay về ProfileScreen thấy tên mới ngay | Đạt |
| Thay đổi dữ liệu rồi bấm Hủy | Đổi tên nhưng bấm Cancel | Trở về ProfileScreen, tên cũ vẫn được giữ nguyên vẹn | Đạt |

### Vấn đề đã gặp và cách xử lý

- **Triệu chứng:** Khi người dùng bắt đầu sửa lại lỗi trong ô text, dòng thông báo lỗi đỏ bên dưới không tự biến mất mà vẫn tồn tại cho đến khi bấm Lưu lại.
- **Giả thuyết:** Hàm `handleChange` chỉ cập nhật `formData` mà không xóa key tương ứng trong state `errors`.
- **Nguyên nhân gốc:** Thiếu thao tác xóa lỗi cục bộ của field đó trong sự kiện `onChangeText`.
- **Cách xử lý:** Trong hàm `handleChange(field, value)`, thêm đoạn code kiểm tra và xóa `delete nextErrors[field]`.
- **Kiểm tra lại:** Ngay khi người dùng gõ ký tự đầu tiên để sửa lỗi, viền đỏ và text lỗi biến mất ngay, mang lại trải nghiệm UX mượt mà.

---

## 10/10/2026 — M4: Danh sách hoạt động tương tác với FlatList

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ xây dựng màn hình `ActivityScreen.jsx` render danh sách hoạt động / sở thích bằng `FlatList`.
- Tách riêng component dòng `ActivityItem.jsx`.
- Triển khai tính năng tương tác cập nhật trạng thái hoạt động ("Tham gia" / "Hủy tham gia") đảm bảo nguyên tắc bất biến (immutability).
- Hỗ trợ thanh tìm kiếm từ khóa, thanh lọc theo danh mục (category chips) và component hiển thị khi danh sách rỗng (Empty State).
- Tài liệu tham khảo: [React Native FlatList Guide](https://reactnative.dev/docs/flatlist) và quy chuẩn R06 của môn học.

### Mục đích

Làm chủ thành phần `FlatList` tối ưu hiệu năng danh sách dài (virtualization), hiểu rõ tầm quan trọng của thuộc tính `keyExtractor`, xử lý mảng state trong React mà không dùng `push`/`splice` (tránh mutating state trực tiếp).

### Nội dung do AI tạo đã được sử dụng

- Mock dataset phong phú tại `src/data/activities.js` với 6 hoạt động đa dạng danh mục, thời gian, địa điểm và trạng thái `isJoined`.
- Mảng danh mục phân loại `ACTIVITY_CATEGORIES` phục vụ thanh lọc ngang (Horizontal ScrollView).
- Cấu trúc render item nhận `onToggleJoin(item.id)`.

### Những nội dung đã điều chỉnh

- Thay vì dùng `ScrollView` render toàn bộ dữ liệu cùng lúc, kiên quyết sử dụng `FlatList` với `keyExtractor={(item) => item.id}` để đáp ứng đúng tiêu chí R06 của rubric.
- Áp dụng phương thức bất biến `activities.map(...)` để tạo ra tham chiếu mảng mới hoàn toàn khi toggle trạng thái, giúp React nhận biết thay đổi và kích hoạt re-render chính xác.
- Tự thiết kế component Empty State với thông báo rõ ràng và nút bấm **"Đặt lại bộ lọc"** khi người dùng tìm kiếm từ khóa không có kết quả.
- Bổ sung bộ đếm realtime hiển thị tổng số hoạt động phù hợp và số lượng hoạt động mà người dùng đã tham gia.

### Cách kiểm chứng và kết quả thực tế

| Lệnh hoặc bước kiểm tra | Kết quả thực tế |
| :--- | :--- |
| Mở màn hình `ActivityScreen` | `FlatList` hiển thị 6 hoạt động cuộn mượt mà, phân loại rõ ràng |
| Nhấn nút "Tham gia hoạt động" tại item 2 | Nút chuyển thành "Hủy tham gia", trạng thái đổi thành "Đã tham gia" màu xanh lá, bộ đếm tăng thêm 1 |
| Chọn danh mục "Thể thao" | Danh sách lọc tức thì, chỉ hiển thị đúng các sự kiện thuộc danh mục Thể thao |
| Nhập từ khóa tìm kiếm `"xyz123"` | Danh sách lọc về 0 phần tử, hiển thị component Empty State trực quan kèm nút reset |
| Nhấn nút "Đặt lại bộ lọc" | Từ khóa xóa trắng, danh mục quay về "Tất cả", danh sách hiển thị đầy đủ trở lại |

### Vấn đề đã gặp và cách xử lý

- **Triệu chứng:** Khi có nhiều hoạt động, nội dung cuối danh sách bị che khuất bởi cạnh đáy màn hình điện thoại.
- **Giả thuyết:** Style `paddingBottom` được gán vào `style` của FlatList thay vì `contentContainerStyle`.
- **Nguyên nhân gốc:** Trong `FlatList`, thuộc tính `style` áp dụng cho container bên ngoài, còn vùng cuộn bên trong phải dùng `contentContainerStyle`.
- **Cách xử lý:** Chuyển `paddingBottom: 24` vào `contentContainerStyle={styles.listContent}`.
- **Kiểm tra lại:** Cuộn danh sách xuống cuối cùng hiển thị trọn vẹn item cuối cùng, không bị đè hay cắt chữ.

---

## 11/10/2026 — M5: Lưu trữ bền vững với AsyncStorage & Xử lý Fallback

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ tích hợp lưu trữ dữ liệu bền vững (persistence) cho cả Profile và Theme mode bằng thư viện `@react-native-async-storage/async-storage`.
- Tách toàn bộ logic đọc/ghi storage vào một file helper độc lập (`src/storage/appStorage.js`).
- Xây dựng cơ chế Safe Fallback: khi khởi động lần đầu (First Run - storage rỗng) hoặc khi dữ liệu cục bộ bị lỗi cú pháp/hỏng hóc (corrupted JSON), ứng dụng vẫn nạp dữ liệu mặc định an toàn mà tuyệt đối không bị crash.
- Bổ sung các nút kiểm thử trong `SettingsScreen.jsx`: Khôi phục Profile mặc định và Xóa sạch AsyncStorage để phục vụ giảng viên kiểm tra kịch bản cold start.
- Tài liệu tham khảo: [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/) và quy chuẩn R07, R10.

### Mục đích

Hiểu sâu về bản chất bất đồng bộ của lưu trữ di động, vòng đời Hydration khi ứng dụng khởi động, cách serialize/deserialize JSON an toàn, và tư duy phòng vệ (defensive programming) chống crash app.

### Nội dung do AI tạo đã được sử dụng

- Lệnh cài đặt package tương thích: `npx expo install @react-native-async-storage/async-storage`.
- Các hàm giao tiếp cơ bản: `AsyncStorage.getItem`, `AsyncStorage.setItem`, `AsyncStorage.multiRemove`.
- Hai storage key chuẩn: `@mma301_profile_v1` và `@mma301_theme_mode_v1`.

### Những nội dung đã điều chỉnh

- Người học yêu cầu **tuyệt đối không viết tay version vào package.json** mà phải dùng lệnh `npx expo install` để hệ thống tự động phân giải phiên bản `2.2.0` chuẩn SDK 57, giữ nguyên các dependencies hiện có.
- Bọc toàn bộ các hàm trong `appStorage.js` (`getProfile`, `saveProfile`, `getTheme`, `saveTheme`) bằng khối `try...catch` cẩn mật.
- Kết hợp dữ liệu đọc được với `DEFAULT_PROFILE` bằng toán tử spread `{ ...DEFAULT_PROFILE, ...parsed }` để đề phòng trường hợp cấu trúc dữ liệu cũ thiếu trường mới (schema migration).
- Tạo thông báo Alert xác nhận trước khi thực hiện hành động xóa bộ nhớ máy trong `SettingsScreen`.

### Cách kiểm chứng và kết quả thực tế

| Kịch bản kiểm thử | Thao tác thực hiện | Kết quả thực tế | Đánh giá |
| :--- | :--- | :--- | :---: |
| **First Run (Lần đầu mở)** | Chưa từng có dữ liệu lưu trong máy | App tự động nạp `DEFAULT_PROFILE` (Trương Hoàng Khang) và Light mode, không bị crash | Đạt |
| **Lưu & Khởi động lại** | Đổi tên Profile và gạt Dark Mode, tắt hoàn toàn app rồi mở lại | Profile và Dark Mode giữ nguyên vẹn sau khi reload (Hydrate thành công) | Đạt |
| **Dữ liệu hỏng (Corrupt JSON)** | Cố ý ghi chuỗi rác `"{bad_json"` vào AsyncStorage | `appStorage.js` bắt catch, nạp fallback an toàn, app hoạt động bình thường | Đạt |
| **Xóa sạch AsyncStorage** | Nhấn "Xóa sạch AsyncStorage" trong Settings | Toàn bộ key bị xóa thành công, hiển thị thông báo hướng dẫn test First Run | Đạt |

### Vấn đề đã gặp và cách xử lý

- **Triệu chứng:** Khi mở ứng dụng trên thiết bị cấu hình yếu, có hiện tượng nhấp nháy nhanh từ Light mode sang Dark mode (FOUC - Flash of unstyled content).
- **Giả thuyết:** Quá trình đọc `AsyncStorage` bất đồng bộ diễn ra sau khi render lần đầu tiên.
- **Nguyên nhân gốc:** Ban đầu state `themeMode` được khởi tạo cố định là `'light'`, sau đó `useEffect` mới đọc storage và cập nhật lại.
- **Cách xử lý:** Bổ sung state `isThemeLoading` và hiển thị component `LoadingScreen.jsx` cho đến khi quá trình hydration từ AsyncStorage hoàn tất.
- **Kiểm tra lại:** Ứng dụng hiển thị màn hình chờ mượt mà trong tích tắc, sau đó mở ra đúng giao diện Dark mode đã lưu mà không bị nhấp nháy giao diện.

---

## 12/10/2026 — M6 & M7: Tích hợp toàn diện, Bộ hồ sơ đánh giá & Kiểm chứng phát hành

### Nhiệm vụ, yêu cầu và tài liệu tham khảo

- Người học yêu cầu AI hỗ trợ rà soát toàn bộ dự án, đồng bộ hóa luồng hoạt động xuyên suốt giữa 5 màn hình.
- Chuẩn hóa bộ hồ sơ đánh giá theo đúng cấu trúc thư mục quy định của Assignment 1:
  - `docs/REQUIREMENT_TRACEABILITY_MATRIX.md` (RTM đầy đủ R01–R10).
  - `docs/DESIGN_DECISIONS.md` (Ghi nhận 5 quyết định kiến trúc, lý do, giải pháp thay thế, trade-offs và impact analysis).
  - `docs/DEBUG_LOG.md` (Nhật ký 2 lỗi thực tế theo quy trình chuẩn 5 bước).
  - `docs/TEST_MATRIX.md` (Bảng 13 kịch bản kiểm thử chi tiết gồm Normal, Negative và Edge cases).
  - `docs/LEARNING_MAP.md` (Bản đồ năng lực CLO và kịch bản luyện tập vấn đáp mở code trong ≤ 30 giây).
  - `docs/AI_USAGE_LOG.md` (Nhật ký sử dụng AI có kiểm soát theo đúng định dạng tiến trình).
  - `README.md` (Báo cáo tổng quan, hướng dẫn chạy sạch, workflow map và tuyên bố AI).
- Thực hiện chia commit logic theo từng milestone thực tế (Conventional Commits) và đẩy lên GitHub.
- Chạy công cụ chẩn đoán hệ sinh thái `npx expo-doctor` để xác nhận không có lỗi tiềm ẩn.

### Mục đích

Hoàn thiện sản phẩm bàn giao ở mức chuyên nghiệp cao nhất, minh bạch hóa toàn bộ quá trình sử dụng AI, trang bị đầy đủ tài liệu và phản xạ kỹ thuật để người học tự tin bước vào buổi phỏng vấn trực tiếp với giảng viên.

### Nội dung do AI tạo đã được sử dụng

- Tạo khung tài liệu Markdown theo đúng các bảng biểu và tiêu chí đánh giá trong Student Guide của trường.
- Hỗ trợ xây dựng các kịch bản kiểm thử biên (edge cases) và phân tích impact khi thay đổi yêu cầu kỹ thuật.
- Rà soát các cảnh báo linter và cú pháp trong các file component.

### Những nội dung đã điều chỉnh

- Người học yêu cầu tổ chức lại lịch sử Git thành chuỗi 6 commit sạch sẽ, phân tách rành mạch theo đúng thứ tự logic từ M1 đến M7 thay vì dồn toàn bộ vào một commit duy nhất (`one-shot code dump`).
- Điều chỉnh tên package trong `package.json` theo đúng định danh dự án `mma301_assignment_1`.
- Kiểm tra chéo toàn bộ đường dẫn liên kết file (`file:///...`) trong tài liệu đảm bảo trỏ chính xác vào cấu trúc thư mục thực tế của dự án.
- Tự tay thực hiện lệnh `git push` đưa toàn bộ 6 commit lên kho lưu trữ GitHub chính thức của sinh viên.

### Kiểm chứng thực tế cuối cùng

| Lệnh kiểm tra | Kết quả thực tế |
| :--- | :--- |
| `npx expo-doctor` | **21/21 checks passed. No issues detected!** |
| `git status` | `On branch main`, `Your branch is up to date with 'origin/main'`, `working tree clean` |
| `git log --oneline -n 6` | Đủ 6 commit milestone có cấu trúc thông điệp rõ ràng, không có commit rác |
| `git push` | Đẩy thành công 55 objects lên remote repository GitHub an toàn |
| Khởi động `npx expo start` | Metro Bundler khởi động bình thường tại cổng mặc định, mã QR quét tốt trên Expo Go |

### Bảng đối chiếu tiến độ cam kết và kết quả đạt được

| Milestone | Tên mốc công việc | Trạng thái kỹ thuật | Bằng chứng mã nguồn chính |
| :---: | :--- | :---: | :--- |
| **M1** | Project chạy + Navigation skeleton | Hoàn thành | `package.json`, `AppNavigator.jsx`, `App.jsx` |
| **M2** | UI Components + Theme Context | Hoàn thành | `ThemeContext.jsx`, `ScreenContainer.jsx`, `ThemeToggle.jsx` |
| **M3** | Profile read/edit + Validation | Hoàn thành | `profileValidation.js`, `ProfileContext.jsx`, `EditProfileScreen.jsx` |
| **M4** | FlatList + Collection interaction | Hoàn thành | `activities.js`, `ActivityItem.jsx`, `ActivityScreen.jsx` |
| **M5** | AsyncStorage hydrate/save + Fallback | Hoàn thành | `appStorage.js`, `SettingsScreen.jsx`, `LoadingScreen.jsx` |
| **M6** | Integration & Component Refactor | Hoàn thành | Toàn bộ 5 screens tích hợp mượt mà, layout Flexbox chuẩn |
| **M7** | Verification, Debug logs & Release Docs | Hoàn thành | 6 tài liệu trong `docs/`, `README.md`, `expo-doctor` 21/21 checks |

---

## Tuyên bố liêm chính học thuật (Academic Integrity Declaration)

Sinh viên **Trương Hoàng Khang (CE190729)** xác nhận:
1. Toàn bộ mã nguồn và tài liệu trong bài nộp này đã được tôi rà soát, kiểm chứng thực tế và làm chủ hoàn toàn.
2. Việc sử dụng AI được thực hiện có kiểm soát theo đúng quy trình **Ask → Inspect → Adapt → Run → Explain → Record**. AI đóng vai trò như một trợ lý lập trình (Pair Programmer) đưa ra gợi ý, tôi là người trực tiếp ra quyết định, kiểm tra tính đúng đắn, sửa chữa lỗi và chịu trách nhiệm cao nhất với sản phẩm.
3. Tôi sẵn sàng mở bất kỳ file mã nguồn nào và giải thích luồng thực thi (Purpose - Input - Trigger - Transform - Output / Failure path) theo yêu cầu của giảng viên trong buổi đánh giá.
