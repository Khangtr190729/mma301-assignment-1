# Ma trận Truy xuất Yêu cầu (RTM)

| ID  | Yêu cầu | Bằng chứng UI | Khu vực Code | Test Case | Bằng chứng mong đợi |
| --- | --- | --- | --- | --- | --- |
| **R01** | Project Expo/React Native chạy đúng | ✅ Khởi động nguội (Cold start) | `package.json`, App config | Chạy app từ terminal | Ứng dụng mở lên không bị lỗi crash |
| **R02** | Điều hướng giữa ≥5 màn hình | ✅ Chuyển màn hình / Nút Back | Cấu hình Navigation (`App.js` hoặc `navigation/`) | Mở từng màn hình & quay lại | Chuyển mượt; không thiếu màn hình |
| **R03** | Hiển thị dữ liệu Profile | ProfileScreen với dữ liệu mặc định/đã lưu | `ProfileScreen.js` | Đọc profile khi khởi động | Hiển thị đúng tên/bio/avatar |
| **R04** | Edit Profile + validation | Luồng Hợp lệ/Lỗi/Hủy | Form component / state logic | Nộp tên trống, nộp tên hợp lệ, hủy sửa | Báo lỗi khi sai; Cập nhật khi đúng; Không đổi khi hủy |
| **R05** | Shared Theme/Preference | Chuyển đổi theme qua lại | `ThemeContext.js` | Bật/Tắt chế độ Tối/Sáng trong Settings | UI cập nhật toàn app ngay lập tức |
| **R06** | FlatList/SectionList | Màn hình Activity/Interests | `ActivityScreen.js` (FlatList/SectionList) | Xem danh sách có mục; danh sách trống | Hiển thị danh sách; có thông báo khi trống (0 items) |
| **R07** | Persistence (AsyncStorage) | Lưu giữ sau khi restart & chạy lần đầu | Storage helper, `useEffect` | Khởi động lại app sau khi lưu profile/theme | Dữ liệu được khôi phục từ bộ nhớ |
| **R08** | Reusable Components | Render/tái sử dụng component | Thư mục `components/` | Kiểm tra các yếu tố lặp lại trên UI | Components được import và dùng lại sạch sẽ |
| **R09** | Responsive Flexbox/Style | Bố cục dọc, kích cỡ cơ bản | Stylesheets trong màn hình/components | Chạy trên nhiều kích thước màn hình | Các thành phần căn chỉnh chuẩn bằng flex |
| **R10** | Error/Fallback State | Dữ liệu cục bộ lỗi hoặc không có | Phân tích Storage / Validation | Cố tình làm hỏng storage / xóa data | App tự động fallback về giá trị mặc định không bị crash |
