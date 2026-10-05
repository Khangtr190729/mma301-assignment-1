# Cấu trúc Dữ liệu Profile (Profile Model)

Tài liệu này định nghĩa cấu trúc dữ liệu và quy tắc xác thực cho User Profile.

## 1. Cấu trúc dữ liệu

Dữ liệu Profile sẽ được đại diện bởi một object JavaScript.

```javascript
const ProfileModel = {
  id: "uuid-hoac-chuoi-co-dinh", // Tùy chọn: hữu ích nếu mở rộng nhiều user sau này
  name: "String",               // Tên hiển thị người dùng
  bio: "String",                // Tiểu sử hoặc mô tả ngắn
  avatarUrl: "String",          // Đường dẫn ảnh (local asset hoặc remote URL)
  location: "String",           // (Tùy chọn) Vị trí người dùng
}
```

**Trạng thái mặc định (Fallback State):**
```javascript
const defaultProfile = {
  name: "Guest User",
  bio: "Xin chào, tôi đang dùng Profile & Activity App!",
  avatarUrl: "default_avatar_path", // Link hình mặc định
}
```

## 2. Quy tắc xác thực (Validation Rules)

Khi người dùng cố lưu trong `EditProfileScreen`, các quy tắc sau phải được đảm bảo trước khi cập nhật state hay AsyncStorage.

| Trường (Field) | Quy tắc (Rule) | Thông báo lỗi (nếu vi phạm) |
| :--- | :--- | :--- |
| `name` | **Bắt buộc**. Không được để trống, null, hoặc toàn dấu cách. | "Tên không được bỏ trống." (Name is required) |
| `name` | **Độ dài**. Tối thiểu 2 ký tự. | "Tên phải có ít nhất 2 ký tự." |
| `bio` | **Độ dài tối đa**. Tối đa 150 ký tự. (Tùy chọn, nhưng nên có). | "Tiểu sử không vượt quá 150 ký tự." |

## 3. Chiến lược Lưu trữ (Storage Strategy)
- Object sẽ được chuyển thành chuỗi dùng `JSON.stringify(profile)` trước khi lưu vào `AsyncStorage`.
- Khi lấy lên, nó sẽ được phân giải bằng `JSON.parse()`. 
- Nếu phân giải gặp lỗi, sẽ dùng lại biến `defaultProfile`.
