# Test Matrix (Ma trận kiểm thử chi tiết)

**Học phần:** MMA301 – Multiplatform Mobile App Development  
**Assignment:** Assignment 01 – Profile & Activity App  
**Sinh viên:** Trương Hoàng Khang (CE190729)  

---

Bao gồm đầy đủ các nhóm kiểm thử: **Normal (Happy path)**, **Negative (Dữ liệu không hợp lệ)** và **Edge Cases (Tình huống biên)** theo đặc tả mục 5 của Student Guide.

---

| # | Nhóm (Group) | Case ID | Kịch bản / Thao tác kiểm thử (Test Scenario) | Dữ liệu đầu vào (Input Data) | Kết quả mong đợi (Expected Result) | Kết quả thực tế (Actual Result) | Đánh giá (Pass/Fail) |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :-: |
| 1 | **Startup** | TC_START_01 | **First Run (Lần đầu mở ứng dụng):** Thiết bị chưa từng lưu dữ liệu AsyncStorage | AsyncStorage rỗng (`null`) | App khởi động thành công, tự nạp Default Profile & Light Theme; không crash | Khởi động mượt, hiển thị Default Profile | **PASS** |
| 2 | **Profile** | TC_PROF_01 | **Read Profile:** Mở màn hình ProfileScreen từ HomeScreen | Nhấn nút "Xem Profile" | Hiển thị đầy đủ thông tin: Avatar, Tên, Email, Bio, Phone, Location | Hiển thị chính xác các thông tin | **PASS** |
| 3 | **Edit Form** | TC_EDIT_01 | **Negative Validation (Tên rỗng):** Xóa trắng trường Họ tên rồi bấm Lưu | Name: `""`, Bio: `"Lập trình viên"` | Hiển thị thông báo lỗi màu đỏ: "Họ và tên không được để trống", ngăn chặn lưu vào Context/Storage | Báo lỗi viền đỏ, chặn submit thành công | **PASS** |
| 4 | **Edit Form** | TC_EDIT_02 | **Negative Validation (Bio quá dài):** Nhập phần tiểu sử vượt quá 150 ký tự | Bio: `> 150 ký tự` | Hiển thị lỗi: "Tiểu sử không được vượt quá 150 ký tự", chặn lưu | Báo lỗi độ dài ký tự chính xác | **PASS** |
| 5 | **Edit Form** | TC_EDIT_03 | **Valid Save:** Nhập tên và thông tin hợp lệ, bấm Lưu thay đổi | Name: `"Trương Hoàng Khang"`, Bio: `"Mobile Dev"` | Lưu thành công vào Context & AsyncStorage, điều hướng về ProfileScreen và hiển thị ngay thông tin mới | Cập nhật tức thì trên UI ProfileScreen | **PASS** |
| 6 | **Edit Form** | TC_EDIT_04 | **Cancel Flow:** Thay đổi thông tin trong form nhưng bấm nút "Hủy" hoặc Back | Đổi Name thành giá trị khác, bấm "Hủy" | Thoát khỏi màn hình EditProfile, thông tin Profile cũ được giữ nguyên vẹn | Dữ liệu cũ không bị thay đổi | **PASS** |
| 7 | **Theme** | TC_THEME_01 | **Toggle Theme:** Bật Switch chuyển đổi giữa Light và Dark mode | Gạt toggle sang Dark / Light | Toàn bộ các màn hình (Home, Profile, Activity, Settings) đổi màu nền và màu chữ đồng bộ | Đổi màu toàn app tức thì | **PASS** |
| 8 | **Theme** | TC_THEME_02 | **Theme Persistence:** Đổi theme sang Dark mode, tắt hoàn toàn ứng dụng và mở lại | Kill process và cold-start lại | Theme khởi động lại vẫn giữ nguyên là Dark mode (hydrate từ AsyncStorage) | Giữ nguyên Dark mode sau khi mở lại | **PASS** |
| 9 | **List** | TC_LIST_01 | **Normal List Rendering:** Mở màn hình ActivityScreen | Mảng danh sách hoạt động mặc định (>5 items) | `FlatList` render đầy đủ danh sách thẻ hoạt động kèm icon, danh mục và trạng thái | Danh sách hiển thị cuộn mượt mà | **PASS** |
| 10 | **List** | TC_LIST_02 | **List Interaction:** Nhấn nút đánh dấu Tham gia / Yêu thích một mục | Nhấn nút tương tác trên item cụ thể | State của item đó đổi (ví dụ: "Đã tham gia" / "Chưa tham gia"), UI đổi màu nút tương ứng | Item re-render đúng trạng thái | **PASS** |
| 11 | **List** | TC_LIST_03 | **Empty State:** Bộ lọc không tìm thấy mục nào hoặc danh sách rỗng | Filter từ khóa không tồn tại (`"xxxx"`) | Không bị khoảng trắng; hiển thị component thông báo "Không tìm thấy hoạt động nào" kèm icon | Hiển thị Empty State rõ ràng | **PASS** |
| 12 | **Storage** | TC_STOR_01 | **Corrupted / Invalid Local Data:** AsyncStorage chứa chuỗi JSON bị lỗi cú pháp | Ghi `"corrupted_json_string"` vào key lưu trữ | Try-catch bắt ngoại lệ, fallback về giá trị mặc định an toàn, app không crash | Fallback an toàn, có thông báo cảnh báo | **PASS** |
| 13 | **Navigation** | TC_NAV_01 | **Full Stack Navigation:** Mở và Back xuyên suốt 5 màn hình | Bấm chuyển đổi liên tục giữa 5 screens | Chuyển trang mượt, nút Back hoạt động chính xác theo cơ chế stack | Điều hướng ổn định 100% | **PASS** |
