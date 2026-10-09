# BÁO CÁO NẠP DỮ LIỆU MẪU ĐỢT 1 VÀ KIỂM TRA MÃ HÓA (MỐC M1 - BUỔI 5)

**Người thực hiện:** V2 - Kiến trúc sư dữ liệu  
**Đầu ra cá nhân:** Kết quả đếm bản ghi và xác minh hiển thị UTF-8

---

## 1. KẾT QUẢ ĐẾM BẢN GHI (RECORD COUNT)

| STT | Bảng CSDL | Yêu cầu tối thiểu | Số bản ghi thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| 1 | nguoi_dung | >= 3 tài khoản | 5 bản ghi | Đạt |
| 2 | diem_den | >= 10 địa điểm | 20 bản ghi | Đạt |
| 3 | danh_gia | >= 100 bản ghi | 300 bản ghi | Đạt (Vượt chỉ tiêu) |
| 4 | khia_canh | >= 5 khía cạnh | 8 bản ghi | Đạt |

---

## 2. CÂU LỆNH TRUY VẤN XÁC MINH VỚI GIẢNG VIÊN

### A. Đếm số lượng bản ghi bảng đánh giá:
SELECT COUNT(*) AS tong_so_danh_gia FROM danh_gia;
-- Kết quả trả về: 300 bản ghi

### B. Kiểm tra font Tiếng Việt (Chuẩn utf8mb4):
SELECT id, noi_dung FROM danh_gia LIMIT 3;
-- Kết quả: Hiển thị đúng tiếng Việt có dấu, không lỗi ký tự (?, Ã¡)

### C. Kiểm tra mật khẩu đã được băm (Hỗ trợ tiêu chí 5.5):
SELECT id, ten_dang_nhap, mat_khau FROM nguoi_dung LIMIT 1;
-- Kết quả: Mật khẩu hiển thị dưới dạng chuỗi băm mã hóa, không phải mật khẩu rõ
