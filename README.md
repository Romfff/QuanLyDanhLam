# Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến — TripAdvisor Intelligence Platform (ĐT-12)

## 1. Giới thiệu đề tài
- **Mã đề tài:** ĐT-12
- **Tên đề tài:** Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến (TripAdvisor Intelligence Platform)
- **Học phần:** CSE703073 – Lập trình ứng dụng web trong du lịch 2
- **Lớp:** CSE703073

## 2. Danh sách thành viên và phân công vai trò
| STT | Họ và tên | Mã sinh viên | Vai trò chuẩn | Email trường |
|---|---|---|---|---|
| 1 | Nguyễn Trung Hiếu (Nhóm trưởng) | 24108738 | V1: Quản trị dự án & Điều phối | 24108738@st.phenikaa-uni.edu.vn |
| 2 | Hoàng Việt Anh | 24106135 | V2: Kiến trúc sư dữ liệu | 24106135@st.phenikaa-uni.edu.vn |
| 3 | Nguyễn Việt Dũng | 24105686 | V3: Lập trình viên Back-end | 24105686@st.phenikaa-uni.edu.vn |
| 4 | Phạm Tiến Nghĩa | 24104760 | V4: Lập trình viên Front-end | 24104760@st.phenikaa-uni.edu.vn |
| 5 | Nguyễn Ngọc Lan | 24108256 | V5 & V6: Kiểm thử & Báo cáo nghiệp vụ | 24108256@st.phenikaa-uni.edu.vn |

## 3. Kiến trúc hệ thống
Hệ thống được thiết kế theo mô hình 3 tầng hiện đại:
- **Front-end:** Vue 3 + Vite, giao diện thương mại chuẩn TripAdvisor Việt Nam kết hợp trí tuệ nhân tạo PhoBERT & Wilson Score 95%.
- **Back-end:** Laravel 11 (PHP 8.3), kiến trúc RESTful API, phân quyền theo vai trò (RBAC), kiểm soát cookie bảo mật.
- **Dịch vụ dữ liệu / AI:** FastAPI (Python 3.11+), mô hình ABSA (Aspect-Based Sentiment Analysis) phân tích sắc thái ý kiến du khách và phát hiện giả mạo/khủng hoảng.
- **Cơ sở dữ liệu:** MySQL 8.0, hỗ trợ mã hóa UTF-8 đầy đủ (`utf8mb4_unicode_ci`).

## 4. Hướng dẫn cài đặt và khởi chạy nhanh
```bash
# 1. Cài đặt Back-end
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed

# 2. Cài đặt Front-end
cd ../frontend
npm install
npm run dev

# 3. Khởi chạy Dịch vụ Python
cd ../python-service
pip install -r requirements.txt
uvicorn app.main:app --port 8001 --reload
```
