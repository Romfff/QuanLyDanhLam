# PHIẾU ĐĂNG KÝ ĐỀ TÀI DỰ ÁN KẾT THÚC HỌC PHẦN (MẪU PL-H)

| Nội dung | Thông tin đăng ký của Nhóm 03 (`DuLichSo`) |
|---|---|
| **Lớp học phần** | `2025-2026-CSE703073-01` – Học phần: *Lập trình ứng dụng web trong du lịch 2* (`CSE703073`) |
| **Tên nhóm** | `DuLichSo` (Nhóm 03) |
| **Mã đề tài đăng ký** | **`ĐT-12`** *(Thuộc Danh mục 20 đề tài chính thức – Phần IX Đề thi)* |
| **Tên đề tài đầy đủ** | **Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến** |
| **Danh sách thành viên (Họ tên – MSSV – Vai trò)** | 1. **Nguyễn Trung Hiếu** – `24108738` – **V1:** Trưởng nhóm & Quản trị dự án<br>2. **Hoàng Việt Anh** – `24106135` – **V2:** Kiến trúc sư dữ liệu<br>3. **Nguyễn Việt Dũng** – `24105686` – **V3:** Lập trình viên Back-end<br>4. **Phạm Tiến Nghĩa** – `24104760` – **V4:** Lập trình viên Front-end<br>5. **Nguyễn Ngọc Lan** – `24108256` – **V5 & V6:** Chuyên viên Kiểm thử & Nghiệp vụ/Tài liệu |
| **Trưởng nhóm và thông tin liên hệ** | **Nguyễn Trung Hiếu** – MSSV: `24108738`<br>Email: `24108738@st.phenikaa-uni.edu.vn` – SĐT: `0395655473` |
| **Phạm vi chức năng dự kiến (tóm tắt 5–7 dòng)** | Hệ thống thu thập, làm sạch và chuẩn hóa 874 đánh giá du khách thực tế tại 07 điểm đến trọng điểm Việt Nam; tự động phân tích sắc thái tiếng Việt theo 05 khía cạnh dịch vụ (*Cảnh quan, Dịch vụ, Ẩm thực, Giá cả, Vệ sinh*) bằng mô hình học máy PhoBERT kết hợp từ điển chuyên ngành. Hệ thống tính toán bảng xếp hạng danh tiếng công tâm bằng cận dưới khoảng tin cậy thống kê **Wilson Score 95% CI ($z = 1.96$)**, phát hiện đánh giá bất thường/spam, cảnh báo suy giảm danh tiếng theo thời gian thực, hỗ trợ đối sánh đa điểm đến và cung cấp cổng dữ liệu mở chuẩn `schema.org/TouristAttraction`, `GeoJSON` và `OpenAPI 3.0`. |
| **Công nghệ dự kiến sử dụng** | - **Front-end:** Vue 3 (Composition API) + Vite 5, 02 chủ đề Sáng/Tối, Responsive 03 khổ màn hình.<br>- **Back-end:** PHP 8.2+ / Laravel 11 RESTful API, phân quyền RBAC, bảo mật phiên & OWASP Top 10.<br>- **Mô-đun Python:** Python 3.11+ / FastAPI, Pandas, Scikit-learn, PhoBERT ABSA & Wilson Score Engine.<br>- **Cơ sở dữ liệu:** MySQL 8.0 (`utf8mb4_unicode_ci`, chuẩn hóa 3NF với 15 bảng / 10 thực thể cốt lõi). |
| **Liên kết kho Git** | https://github.com/hieuxetawng/he-thong-phan-tich-danh-gia-diem-den_DT12.git |
| **Cam kết của nhóm** | Nhóm cam kết thực hiện đúng các quy định tại Đề thi kết thúc học phần `CSE703073`, đảm bảo tỷ lệ đóng góp thực chất 20% mỗi thành viên và tuân thủ nghiêm ngặt quy định liêm chính học thuật. |
| **Ý kiến phê duyệt của giảng viên** | *Đồng ý phê duyệt đề tài ĐT-12 và phân công Nhóm 03 (DuLichSo) thực hiện theo kế hoạch 10 tuần.*<br>**Giảng viên hướng dẫn:** TS. Nguyễn Văn Tánh |
