# Cấu trúc Dữ liệu Activity / Interest

Tài liệu này định nghĩa cấu trúc dữ liệu cho mảng danh sách được hiển thị trên màn hình `Activity/Interests`.

## 1. Cấu trúc dữ liệu

Collection sẽ là một mảng (array) chứa các objects. Mỗi object đại diện cho một activity hoặc interest.

```javascript
const ActivityItemModel = {
  id: "String",         // Định danh duy nhất
  title: "String",      // Tên hoạt động/sở thích
  description: "String",// Mô tả ngắn
  isFavorite: "Boolean",// Trạng thái tương tác/sở thích của người dùng
  category: "String",   // (Tùy chọn) Hữu ích nếu dùng SectionList để gom nhóm
}
```

**Ví dụ Dữ liệu mẫu:**
```javascript
const initialActivities = [
  {
    id: "a1",
    title: "Phát triển React Native",
    description: "Xây dựng ứng dụng di động đa nền tảng.",
    isFavorite: true,
    category: "Tech"
  },
  {
    id: "a2",
    title: "Đọc sách Khoa học viễn tưởng",
    description: "Khám phá các ý tưởng tương lai qua văn học.",
    isFavorite: false,
    category: "Hobby"
  },
  // ... thêm nhiều mục khác
];
```

## 2. Chiến lược Định danh và Key (Item Identity and Key Strategy)

- **Chiến lược Key**: React Native `FlatList` và `SectionList` yêu cầu key duy nhất để đảm bảo hiệu suất và đồng bộ state khi re-render.
- **Triển khai**: Thuộc tính `id` (ví dụ: `"a1"`, `"a2"`) sẽ được làm unique key.
- **Cách dùng trong code**: Prop `keyExtractor` trên FlatList sẽ trỏ vào ID này: 
  `keyExtractor={(item) => item.id}`
- **Tại sao?**: Dùng ID duy nhất thay vì chỉ số mảng (index) giúp ngăn ngừa lỗi render khi các mục bị đổi chỗ, bị lọc (filter) hoặc bị đổi trạng thái (như bấm `isFavorite`).

## 3. Tương tác với State
- Nếu người dùng đánh dấu Favorite, hàm sẽ chạy qua (map) mảng, tìm mục có `id` tương ứng và đảo ngược giá trị `isFavorite` (từ true thành false hoặc ngược lại).
- **Quy tắc bất biến (Immutability)**: Sẽ phải tạo ra một mảng *mới* kèm theo object đã cập nhật chứ không thay đổi trực tiếp (mutate) trên mảng cũ, đảm bảo React Native nhận diện được sự thay đổi và kích hoạt việc render lại.
