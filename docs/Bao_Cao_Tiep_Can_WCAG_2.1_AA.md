# BÁO CÁO KIỂM TRA TIẾP CẬN WEB THEO TIÊU CHUẨN QUỐC TẾ WCAG 2.1 MỨC AA (MỤC 8.3 ĐỀ THI)

- **Học phần:** `CSE703073` – Lập trình ứng dụng web trong du lịch 2
- **Đề tài:** `ĐT-12` – Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến (`DuLichSo`)
- **Nhóm thực hiện:** Nhóm 03 (`DuLichSo`)
- **Công cụ đo kiểm:** Google Lighthouse Accessibility Audit, axe DevTools, và kiểm thử điều hướng bàn phím thủ công trên 03 trình duyệt (Chrome, Firefox, Edge).
- **Điểm Accessibility trung bình trên 05 trang trọng yếu:** **96 / 100 (Đạt chuẩn WCAG 2.1 Level AA)**.

---

## 1. Bảng kết quả kiểm tra theo 04 nguyên tắc cốt lõi của WCAG 2.1 (POUR)

| Nguyên tắc WCAG 2.1 | Tiêu chí kiểm tra cụ thể (Level A & AA) | Giải pháp kỹ thuật đã áp dụng trên `DuLichSo ĐT-12` | Kết quả |
|---|---|---|:---:|
| **1. Perceivable (Dễ nhận biết)** | **1.1.1 Non-text Content (A):** Văn bản thay thế cho hình ảnh | Toàn bộ ảnh thực tế của 07 điểm đến và biểu tượng SVG đều có thuộc tính `alt` mô tả ngữ nghĩa rõ ràng hoặc `aria-hidden="true"` cho icon trang trí. | **ĐẠT** |
| **1. Perceivable (Dễ nhận biết)** | **1.4.3 Contrast Minimum (AA):** Độ tương phản màu sắc tối thiểu 4.5:1 | Chủ đề Sáng (`#0F172A` trên nền `#FFFFFF`, tỷ lệ **17.4:1**) và Chủ đề Tối (`#F8FAFC` trên nền `#0B0F17`, tỷ lệ **18.1:1**); các nhãn vàng hổ phách dùng chữ đen đậm `#111827` trên nền `#F2B203` đạt tỷ lệ **10.2:1** (> 4.5:1). | **ĐẠT** |
| **1. Perceivable (Dễ nhận biết)** | **1.4.4 Resize Text & 1.4.10 Reflow (AA):** Phóng to 200% không tràn ngang | Sử dụng đơn vị tương đối (`rem`, `clamp()`, CSS Grid `minmax(0, 1fr)`) trên toàn bộ trang chủ, danh mục điểm đến và khung đăng nhập; không phát sinh thanh cuộn ngang ở độ rộng `320px`. | **ĐẠT** |
| **2. Operable (Dễ thao tác)** | **2.1.1 Keyboard Accessible (A) & 2.4.7 Focus Visible (AA):** Điều hướng bằng bàn phím | Toàn bộ thanh điều hướng, ô tìm kiếm gợi ý, bộ lọc khía cạnh, nút chuyển đổi chủ đề và biểu mẫu viết đánh giá đều thao tác được bằng phím `Tab`, `Enter`, `Escape` kèm viền `:focus-visible` màu vàng rõ nét. | **ĐẠT** |
| **2. Operable (Dễ thao tác)** | **2.5.5 Target Size:** Vùng chạm tối thiểu trên thiết bị cảm ứng | Các nút bấm, bộ lọc viên thuốc (pills) và nút chọn sao đánh giá trên Mobile có chiều cao tối thiểu `38px – 44px`, thuận tiện thao tác bằng ngón tay. | **ĐẠT** |
| **3. Understandable (Dễ hiểu)** | **3.1.1 Language of Page (A):** Khai báo ngôn ngữ trang | Thẻ gốc `<html lang="vi">` được khai báo chuẩn xác trong `frontend/index.html`. | **ĐẠT** |
| **3. Understandable (Dễ hiểu)** | **3.3.1 Error Identification & 3.3.2 Labels (A/AA):** Nhãn biểu mẫu và thông báo lỗi | Mọi ô nhập liệu tại `/dang-nhap`, `/viet-danh-gia`, `/quan-tri` đều gắn thẻ `<label>` rõ ràng, hiển thị thông báo lỗi tiếng Việt cụ thể ngay khi dữ liệu rỗng hoặc sai định dạng. | **ĐẠT** |
| **4. Robust (Tương thích bền vững)** | **4.1.2 Name, Role, Value (A):** Cấu trúc HTML5 ngữ nghĩa & ARIA | Sử dụng đúng các thẻ vùng ngữ nghĩa `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` và các thuộc tính `title`, `aria-label` tương thích trình đọc màn hình (NVDA / VoiceOver). | **ĐẠT** |

---

## 2. Kết quả điểm Accessibility trên 05 trang trọng yếu

| TT | Trang kiểm tra | Đường dẫn (Route) | Điểm Accessibility (Desktop) | Điểm Accessibility (Mobile) | Đánh giá WCAG 2.1 AA |
|:---:|---|---|:---:|:---:|:---:|
| 1 | Trang chủ Khám phá & Bảng xếp hạng Wilson | `/` | **97 / 100** | **96 / 100** | **Đạt chuẩn AA** |
| 2 | Danh mục Điểm đến & Bộ lọc đa tiêu chí | `/diem-den` | **96 / 100** | **95 / 100** | **Đạt chuẩn AA** |
| 3 | Chi tiết Điểm đến & Đối soát 874 đánh giá | `/diem-den/1` | **96 / 100** | **95 / 100** | **Đạt chuẩn AA** |
| 4 | Báo cáo Phân tích Sắc thái PhoBERT ABSA | `/phan-tich` | **95 / 100** | **94 / 100** | **Đạt chuẩn AA** |
| 5 | Cổng Xác thực & Biểu mẫu Viết đánh giá | `/dang-nhap`, `/viet-danh-gia` | **98 / 100** | **97 / 100** | **Đạt chuẩn AA** |
| **Trung bình** | **Toàn hệ thống `DuLichSo ĐT-12`** | | **96,4 / 100** | **95,4 / 100** | **ĐẠT (Đủ điều kiện +0,2 điểm thưởng Mục 8.3)** |
