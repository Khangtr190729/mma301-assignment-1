# Sơ đồ Dữ liệu và State (State and Data Mapping)

Quản lý state đúng cách là yêu cầu cốt lõi. Tài liệu này phân loại từng phần state dùng trong app để tránh re-render toàn cục không cần thiết và hạn chế phụ thuộc chồng chéo.

## 1. Local UI State
- **Định nghĩa**: State chỉ quan trọng với một component và không cần chia sẻ ra ngoài.
- **Ví dụ**:
  - `isDropdownOpen` (boolean)
  - `isModalVisible` (boolean)
  - `isLoading` (boolean - trên từng màn hình)
- **Lý do ở đây**: Giữ UI state cục bộ giúp app không bị re-render toàn bộ khi chỉ có một yếu tố hình ảnh nhỏ thay đổi. Nên đặt trong component cụ thể dùng `useState`.

## 2. Form State (Screen State)
- **Định nghĩa**: State gắn liền với vòng đời một màn hình, chủ yếu chứa dữ liệu nhập liệu trước khi nộp form.
- **Ví dụ**:
  - `editName` (string - ở Edit Profile)
  - `editBio` (string - ở Edit Profile)
  - `validationErrors` (object/string)
- **Lý do ở đây**: Đầu vào từ form không nên làm thay đổi (mutate) global state với mỗi phím bấm. Chúng được giữ cục bộ ở `EditProfileScreen`. Global profile chỉ cập nhật sau khi bấm "Save" thành công.

## 3. Shared State
- **Định nghĩa**: State cần được truy cập hoặc thay đổi bởi nhiều màn hình khác nhau trên Navigation stack.
- **Ví dụ**:
  - `profileObject` (tên, bio, avatar)
  - `themeMode` ('light' | 'dark')
- **Lý do ở đây**: `ProfileScreen` cần hiển thị, và `EditProfileScreen` cần cập nhật. Tương tự, mọi màn hình cần biết theme hiện tại để định dạng. State này nên để trong Context Provider (ví dụ: `ProfileContext`, `ThemeContext`) bao bọc component gốc.

## 4. Persistent State
- **Định nghĩa**: State cần được duy trì sau khi tắt ứng dụng.
- **Ví dụ**:
  - `profileObject` (chuỗi JSON trong AsyncStorage)
  - `themeMode` (chuỗi trong AsyncStorage)
- **Lý do ở đây**: Để tạo trải nghiệm liền mạch, dữ liệu không nên bị mất đi. Dữ liệu này được đồng bộ với Shared State trong lúc "Lưu" (Save), và được đọc lên khi ứng dụng Khởi động (Startup/Hydration).

## Bảng Tóm tắt State Ownership

| State Item | Nơi đặt / Triển khai | Lý do (Justification) |
| :--- | :--- | :--- |
| **Input focus, dropdowns** | Local Component (`useState`) | Chỉ phục vụ UI hiện tại. Không cần chia sẻ. |
| **Form data / errors** | `EditProfileScreen` (`useState` / Formik) | Gắn liền với vòng đời form. Tránh cập nhật global quá sớm. |
| **Shared Profile Data** | `ProfileContext` | Nhiều màn hình (Profile, Home, Edit) cần đọc/ghi. |
| **Theme / Preferences** | `ThemeContext` | Cần trên toàn app để làm style. |
| **Persistent Profile/Theme**| `AsyncStorage` + Hydration logic | Phải được giữ lại qua lần restart. Load vào Context khi app mở. |
| **Activities / Interests** | `ActivityScreen` (hoặc Context riêng) | Gần nơi tiêu thụ. Nếu 1 màn hình dùng thì để local; nếu cần share thì cho vào Context. |
