# Quy trình End-to-End Workflow

Tài liệu này mô tả toàn bộ hành trình người dùng và luồng dữ liệu của ứng dụng.

## 1. Khởi động & Khôi phục dữ liệu (Startup & Hydration)
- **Kích hoạt**: Người dùng mở app.
- **Hành động**: App cố gắng đọc `profile`, `theme`, và các tùy chọn khác từ `AsyncStorage`.
- **Kết quả**: 
  - Nếu dữ liệu tồn tại và hợp lệ, state của app được cập nhật bằng dữ liệu đã lưu.
  - Nếu không có dữ liệu (chạy lần đầu) hoặc dữ liệu hỏng (lỗi JSON parse), app an toàn dùng giá trị mặc định.
- **Bước tiếp**: App hiển thị `HomeScreen`.

## 2. Xem Profile (Profile Read)
- **Kích hoạt**: Người dùng chuyển đến `ProfileScreen` từ trang chủ.
- **Hành động**: Màn hình đọc global state (từ Context) chứa dữ liệu profile.
- **Kết quả**: Thông tin profile (tên, bio, avatar) được hiển thị.

## 3. Chỉnh sửa & Xác thực (Profile Edit & Validation)
- **Kích hoạt**: Người dùng bấm nút "Edit" trên `ProfileScreen`.
- **Hành động**: Chuyển tới `EditProfileScreen`. Form được điền sẵn dữ liệu profile hiện tại.
- **Nhập liệu**: Người dùng sửa văn bản (tên, bio).
- **Xác thực (Validation)**: Khi lưu, form kiểm tra đầu vào (ví dụ: tên không được trống).
  - Nếu **Không hợp lệ**: Báo lỗi trên UI. State KHÔNG được lưu.
  - Nếu **Hợp lệ**: Chuyển qua bước lưu.

## 4. Lưu thay đổi (Save Changes)
- **Kích hoạt**: Người dùng nộp form hợp lệ.
- **Hành động**: 
  1. Profile global state được cập nhật ngay lập tức.
  2. Object profile mới được chuyển sang chuỗi JSON và lưu xuống `AsyncStorage`.
- **Kết quả**: App quay lại `ProfileScreen`. Giao diện cập nhật ngay lập tức mà không cần khởi động lại.

## 5. Hủy chỉnh sửa (Cancel Edit)
- **Kích hoạt**: Người dùng bấm "Cancel" hoặc nút back khi đang chỉnh sửa.
- **Hành động**: State cục bộ của form bị bỏ đi. Global state và `AsyncStorage` không bị ảnh hưởng.
- **Kết quả**: App quay lại `ProfileScreen` hiển thị dữ liệu gốc.

## 6. Tương tác với Hoạt động / Sở thích (Activity / Interests)
- **Kích hoạt**: Người dùng vào màn hình `Activity/Interests`.
- **Hành động**: Màn hình lấy dữ liệu danh sách và render bằng `FlatList` hoặc `SectionList`.
- **Tương tác**: Người dùng tương tác với một mục (ví dụ: đánh dấu yêu thích, xóa, lọc).
- **Kết quả**: State của danh sách cập nhật, khiến UI render lại hiển thị thay đổi.

## 7. Cài đặt & Chuyển đổi Theme (Settings & Theme)
- **Kích hoạt**: Người dùng vào `SettingsScreen`.
- **Hành động**: Người dùng đổi theme (Sáng/Tối) hoặc cài đặt khác.
- **Kết quả**: 
  1. `ThemeContext` cập nhật ngay lập tức.
  2. Toàn bộ UI app thay đổi theo theme mới.
  3. Cài đặt mới được lưu bất đồng bộ xuống `AsyncStorage`.

## 8. Khởi động lại (Restart Persistence)
- **Kích hoạt**: Người dùng tắt hẳn app và mở lại.
- **Kết quả**: Trong giai đoạn Startup, Profile và Theme vừa lưu được tải lại từ `AsyncStorage`. App khôi phục trạng thái đúng như trước khi đóng.

## 9. Khắc phục lỗi Storage (Missing / Corrupted Storage Fallback)
- **Kích hoạt**: Khi hydrate, `AsyncStorage.getItem()` trả về null, hoặc `JSON.parse()` quăng lỗi.
- **Kết quả**: Khối `try-catch` bắt lỗi. Hàm trả về một object mặc định (ví dụ: `defaultProfile = { name: "Guest", bio: "" }`). App vẫn chạy tiếp bình thường, không bị crash.
