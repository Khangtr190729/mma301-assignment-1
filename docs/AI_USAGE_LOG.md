# AI Usage Log (Nhật ký Sử dụng AI có kiểm soát)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

Tuân thủ nghiêm ngặt chính sách Academic Integrity & AI Policy của môn học (Quy trình: **Ask → Inspect → Adapt → Run → Explain → Record**):

| # | Nhiệm vụ / Yêu cầu (Task / Prompt / Ref) | Mục đích (Purpose) | Output AI đề xuất (AI Suggestion) | Tôi đã sửa và điều chỉnh gì? (Adaptations Made) | Tôi kiểm chứng như thế nào? (Verification Method) |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | Thiết kế kiến trúc thư mục chuẩn tách biệt screens, components, context, storage, utils | Tạo khung thư mục sạch sẽ, module hóa cao theo chuẩn công nghiệp | Đề xuất cấu trúc cơ bản gồm screens và context | Đã chuẩn hóa thêm thư mục `src/utils` cho validation riêng biệt và `src/storage` cho AsyncStorage helper có xử lý try-catch fallback | So sánh trực quan với hình ảnh kiến trúc mẫu của assignment và kiểm tra đường dẫn import |
| **2** | Tối ưu hóa hàm Hydration và Safe Fallback khi đọc dữ liệu AsyncStorage | Tránh tình trạng ứng dụng bị văng (crash) khi dữ liệu lưu cục bộ bị null hoặc JSON corrupt | Đưa ra hàm `AsyncStorage.getItem` đơn giản với `JSON.parse` | Bổ sung khối `try...catch` bao quanh, kiểm tra `jsonValue !== null` và trả về `DEFAULT_PROFILE` an toàn khi có lỗi ngoại lệ | Chạy thử nghiệm bằng cách ghi giá trị chuỗi rác vào AsyncStorage và reload app để xem phản ứng |
| **3** | Xây dựng bộ quy tắc Validation độc lập cho Form Edit Profile | Tách biệt logic kiểm tra dữ liệu ra khỏi UI component để tái sử dụng và kiểm thử độc lập | Gợi ý dùng thư viện bên ngoài nặng (Yup/Formik) | Quyết định tự viết mô-đun validation thuần trong `src/utils/profileValidation.js` để hiểu sâu bản chất JavaScript và tối ưu hiệu năng | Viết test case thử nghiệm với tên rỗng, tên quá dài, bio quá 150 ký tự và kiểm tra cờ `isValid` |
| **4** | Thiết kế tương tác danh sách trong FlatList không làm đột biến state (avoid state mutation) | Đảm bảo tính bất biến (immutability) trong React khi cập nhật phần tử của mảng | Gợi ý dùng `splice` hoặc `push` để cập nhật trực tiếp mảng | Thay thế hoàn toàn bằng phương thức bất biến `activities.map(item => item.id === targetId ? { ...item, joined: !item.joined } : item)` | Kiểm tra qua React DevTools và quan sát FlatList re-render chính xác khi bấm nút tương tác |
| **5** | Chuẩn bị kịch bản phỏng vấn và câu hỏi phản biện kỹ thuật (Defend preparation) | Tự luyện khả năng giải thích Purpose - Input - Trigger - Transform - Output / Failure path | Liệt kê danh sách câu hỏi lý thuyết chung về React Native | Chọn lọc và liên hệ trực tiếp với từng dòng code cụ thể trong project (Context Provider, Storage helper, Validation flow) | Thực hành bấm giờ mở file và chỉ đúng dòng code tương ứng trong thời gian dưới 30 giây |
