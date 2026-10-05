# Đặc tả Yêu cầu (Requirements Specification)

## 1. Yêu cầu chức năng
- **Welcome & Navigation**: Ứng dụng phải có màn hình Home chào mừng người dùng và cho phép điều hướng đến các khu vực khác.
- **Hiển thị Profile**: Màn hình Profile phải hiển thị thông tin người dùng bao gồm tên (name), tiểu sử (bio) và ảnh đại diện (avatar).
- **Chỉnh sửa Profile**: Màn hình Edit Profile phải cho phép người dùng sửa đổi dữ liệu cá nhân thông qua một biểu mẫu (form).
- **Xác thực Form (Validation)**: Biểu mẫu chỉnh sửa profile phải kiểm tra dữ liệu đầu vào trước khi lưu (ví dụ: tên không được để trống).
- **Theo dõi Hoạt động/Sở thích**: Màn hình Activity hoặc Interests phải hiển thị danh sách các mục bằng danh sách cuộn. Người dùng phải có thể tương tác với danh sách (ví dụ: chọn, đánh dấu, hoặc lọc danh sách).
- **Cài đặt & Tùy chọn**: Màn hình Settings phải cho phép người dùng bật/tắt các tùy chọn toàn ứng dụng, chẳng hạn như giao diện Sáng/Tối (Light/Dark theme).
- **Lưu trữ Dữ liệu (Persistence)**: Dữ liệu profile, cài đặt giao diện và các tùy chọn toàn ứng dụng khác phải được lưu cục bộ để có thể giữ nguyên sau khi khởi động lại ứng dụng.

## 2. Yêu cầu kỹ thuật
- **Framework**: React Native với Expo.
- **Ngôn ngữ**: JavaScript.
- **Điều hướng (Navigation)**: Stack Navigation (hoặc cấu hình tương đương) kết nối ít nhất 5 màn hình.
- **Quản lý Trạng thái (State Management)**: Dùng `useState` cho state cục bộ và Context API cho global state.
- **Forms**: Dùng Controlled inputs cho biểu mẫu (có thể dùng Formik/Yup hoặc tự viết validation).
- **Danh sách (Lists)**: Dùng `FlatList` hoặc `SectionList` để render dữ liệu collection.
- **Lưu trữ**: Dùng `AsyncStorage` để lưu trữ dữ liệu cục bộ.
- **Giao diện (UI)**: Dùng `StyleSheet` hoặc Styled Components kết hợp Flexbox.
- **Thành phần UI (Components)**: Phải sử dụng các component có thể tái sử dụng.

## 3. Các ràng buộc
- Tên project phải đặt theo quy ước `TênSinhViên_MãLớp` hoặc quy ước của lớp.
- Không được làm thay đổi trực tiếp (mutate) state (không mutate object/array trực tiếp).
- Cấu trúc thư mục phải sạch sẽ, tách biệt màn hình (screens), thành phần (components), và dịch vụ (services).

## 4. Các yêu cầu ngoài phạm vi
- **Backend & APIs**: Không yêu cầu dùng Firebase, backend, hoặc API thật.
- **Xác thực (Authentication)**: Không yêu cầu hệ thống đăng nhập/xác thực thực tế.
- **Quản lý State phức tạp**: Không yêu cầu Redux (Context API là đủ).
- **TypeScript**: Không yêu cầu trong bài tập này.
- **Animation phức tạp**: Các hiệu ứng chuyển động cao cấp hoặc thư viện ngoài bằng chứng cốt lõi không được yêu cầu hoặc đánh giá quá cao.

## 5. Các trường hợp lỗi & Ngoại lệ (Edge Cases)
- **Chạy lần đầu (First Run)**: Khi `AsyncStorage` chưa có dữ liệu, ứng dụng phải tải an toàn với các giá trị mặc định hợp lý và không bị crash.
- **Dữ liệu bị lỗi**: Nếu dữ liệu cục bộ bị thiếu hoặc lỗi cú pháp JSON (corrupt data), ứng dụng phải chuyển về giá trị mặc định (fallback) một cách mượt mà, không bị crash.
- **Lỗi xác thực (Validation Errors)**: Nếu người dùng gửi tên trống hoặc không hợp lệ, hệ thống phải chặn việc lưu và hiển thị thông báo lỗi rõ ràng.
- **Hủy chỉnh sửa (Cancel Editing)**: Thay đổi thông tin nhưng nhấn 'Cancel' phải hủy bỏ các thay đổi và khôi phục lại trạng thái đã lưu trước đó, không ảnh hưởng đến dữ liệu lưu trữ.
- **Danh sách trống (Empty Lists)**: Nếu danh sách hoạt động/sở thích trống, phải hiển thị một thông báo "empty state" thân thiện với người dùng.
