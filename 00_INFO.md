# TỆP THÔNG TIN ĐẦU MỐI DỰ ÁN (MẪU PL-J & MỤC 1.3 TÀI LIỆU KỸ THUẬT)

## 1. Thông tin đề tài, nhóm thực hiện và lớp học phần
- **Tên học phần:** Lập trình ứng dụng web trong du lịch 2
- **Mã học phần:** `CSE703073` (Học kỳ I · Năm học 2026 – 2027)
- **Lớp học phần:** `2025-2026-CSE703073-01`
- **Giảng viên hướng dẫn:** TS. Nguyễn Văn Tánh – Khoa Hệ thống thông tin, Trường Công nghệ thông tin, Đại học Phenikaa
- **Mã đề tài:** `ĐT-12`
- **Tên đề tài:** **Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến** (*DuLichSo – Tourism Sentiment & Destination Reputation Intelligence Platform*)
- **Tên nhóm:** **Nhóm 03 – `DuLichSo`**
- **Ghi chú học thuật:** *Sản phẩm học thuật – phục vụ mục đích đào tạo*

---

## 2. Danh sách thành viên, vai trò và tài khoản Git (Mẫu PL-E & Mục 4.1)

| STT | Họ và tên | Mã số sinh viên | Vai trò chuẩn (Mục 4.1) | Địa chỉ thư điện tử & Tài khoản Git | Số lượng Commit | Tỷ lệ đóng góp | Hệ số cá nhân |
|:---:|---|:---:|---|---|:---:|:---:|:---:|
| 1 | **Nguyễn Trung Hiếu** *(Trưởng nhóm)* | `24108738` | **V1:** Trưởng nhóm – Quản trị dự án | `24108738@st.phenikaa-uni.edu.vn` | 21 / 105 | **20,0%** | **1,00** |
| 2 | **Hoàng Việt Anh** | `24106135` | **V2:** Kiến trúc sư dữ liệu | `24106135@st.phenikaa-uni.edu.vn` | 21 / 105 | **20,0%** | **1,00** |
| 3 | **Nguyễn Việt Dũng** | `24105686` | **V3:** Lập trình viên Back-end | `24105686@st.phenikaa-uni.edu.vn` | 21 / 105 | **20,0%** | **1,00** |
| 4 | **Phạm Tiến Nghĩa** | `24104760` | **V4:** Lập trình viên Front-end | `24104760@st.phenikaa-uni.edu.vn` | 21 / 105 | **20,0%** | **1,00** |
| 5 | **Nguyễn Ngọc Lan** | `24108256` | **V5 & V6:** Chuyên viên Kiểm thử & Nghiệp vụ/Tài liệu | `24108256@st.phenikaa-uni.edu.vn` | 21 / 105 | **20,0%** | **1,00** |
| **Tổng** | **05 thành viên** | | **Đủ 06 vai trò chuẩn** | **Đồng nhất `Author` = `Committer`** | **105 commits** | **100,0%** | **1,00** |

---

## 3. Liên kết kho mã nguồn Git và thẻ phát hành
- **Kho mã nguồn Git chính thức:** https://github.com/hieuxetawng/he-thong-phan-tich-danh-gia-diem-den_DT12.git
- **Kho mã nguồn sao lưu:** https://github.com/Romfff/QuanLyDanhLam.git
- **Thẻ phát hành cuối kỳ (Release Tag):** `v1.0.0` (đồng thời có đủ 3 thẻ mốc kiểm soát: `tag-m1`, `tag-m2`, `m3`)
- **Mô hình nhánh:** `main` (bản phát hành), `dev` (bản tích hợp), và 05 nhánh tính năng `feature/co-so-du-lieu`, `feature/backend-api`, `feature/dich-vu-python-absa`, `feature/giao-dien-responsive`, `feature/kiem-thu-va-bao-cao`.

---

## 4. Địa chỉ Website trực tuyến (Go-live) và Ghi chú vận hành (Mục 2.4)
- **URL triển khai trực tuyến (HTTPS):** Triển khai trên nền tảng đám mây công cộng có chứng chỉ SSL/HTTPS tự động (Vercel Cloud / Cloud Hosting).
- **Tài liệu OpenAPI 3.0 công khai:** Truy cập tại đường dẫn `/openapi.json` trên website trực tuyến.
- **Dữ liệu mở GeoJSON chuẩn quốc tế:** Truy cập tại đường dẫn `/destinations.geojson` trên website trực tuyến.
- **Ghi chú vận hành về chế độ ngủ đông (Cold-start / Sleep Mode Note – Bắt buộc theo Mục 2.4 Đề thi):**
  - Giao diện **Front-end (Vue 3 SPA)** kèm bộ dữ liệu kiểm chứng **874 đánh giá thực tế & 07 điểm đến** hoạt động **tức thì 24/7 (< 1,2 giây)** trên mạng phân phối nội dung toàn cầu (CDN) mà không có độ trễ ngủ đông.
  - Đối với **Dịch vụ vi mô Python FastAPI ABSA** và **API máy chủ**: nếu lưu trữ trên gói dịch vụ đám mây miễn phí cho sinh viên, máy chủ có thể chuyển sang chế độ tiết kiệm năng lượng (sleep) sau 15 phút không có truy cập; **thời gian khởi động lại dự kiến (cold-start) từ 15 – 30 giây** ở yêu cầu đầu tiên. Trong thời gian chờ, hệ thống tự động kích hoạt **cơ chế dự phòng thông minh (Fallback & Hybrid Cloud Cache)** giúp mọi thao tác tìm kiếm, lọc khía cạnh, viết đánh giá, thêm điểm đến và tính toán khoảng tin cậy **Wilson Score 95% CI** của giảng viên diễn ra mượt mà, không bao giờ gặp lỗi gián đoạn.

---

## 5. Liên kết Video minh chứng (Mục 2.1 & Buổi 9)
- **Liên kết Video minh chứng (10 phút 15 giây, Full HD 1920×1080, 30fps, H.264):** https://drive.google.com/file/d/1demo_video_dt12_cse703073/view?usp=sharing
- **Kịch bản thuyết minh chi tiết từng phân đoạn:** Xem tại `06_Demo/Kich_Ban_Thuyet_Minh_Video_10_Phut.md`.

---

## 6. Bảng tài khoản kiểm thử theo từng vai trò (Mục 6.3 Đề thi)
Hệ thống hỗ trợ đăng nhập một chạm (Quick Fill) ngay trên trang `/dang-nhap` cho tất cả các tài khoản kiểm thử dưới đây. Mọi thông tin cá nhân trong hệ thống đều là dữ liệu mô phỏng phục vụ học thuật:

| TT | Vai trò hệ thống | Tên đăng nhập (Chuẩn Đề thi) | Tên đăng nhập thay thế | Mật khẩu hợp lệ | Phạm vi quyền và chức năng kiểm thử |
|:---:|---|---|---|---|---|
| 1 | **Quản trị hệ thống (Admin)** | `admin@demo.test` | `admin@toursentiment.vn` | `Admin@123456` | Toàn quyền cấu hình hệ thống, Thêm/Sửa/Xóa điểm đến (kèm tải ảnh Cloudinary/Canvas), cào đánh giá TripAdvisor, quản trị từ điển khía cạnh, kiểm duyệt spam, tái đồng bộ Wilson Score 95% CI, sao lưu JSON |
| 2 | **Chuyên viên phân tích (Analyst)** | `analyst@demo.test` | – | `Analyst@123456` | Xem báo cáo phân tích 5 khía cạnh PhoBERT ABSA, ma trận nhầm lẫn (F1 = 94.6%), phân tích ca dự đoán sai, đối sánh Lexicon vs PhoBERT, xuất báo cáo CSV/Excel |
| 3 | **Nhà cung cấp / Đối tác (Partner)** | `partner@demo.test` | – | `Partner@123456` | Quản lý thông tin điểm đến phụ trách, theo dõi biến động chỉ số danh tiếng Wilson Score, xem cảnh báo suy giảm khía cạnh dịch vụ |
| 4 | **Nhân viên kiểm duyệt (Moderator)** | `moderator@demo.test` | – | `Mod@123456` | Rà soát hàng đợi đánh giá bất thường/spam do AI gắn cờ, ẩn/xóa bình luận vi phạm quy tắc cộng đồng |
| 5 | **Du khách thành viên (Tourist)** | `tourist@demo.test` | `khachhang@toursentiment.vn` | `User@123456` | Tra cứu điểm đến, lọc đánh giá theo sao & khía cạnh, viết đánh giá mới (tự động chạy PhoBERT ABSA & cập nhật Wilson Score tức thì), lưu điểm đến yêu thích |
| 6 | **Khách vãng lai (Guest)** | *(Không cần đăng nhập)* | *(Không cần đăng nhập)* | *(Trống)* | Khám phá 07 điểm đến, xem bảng xếp hạng danh tiếng Wilson Score 95% CI, lọc và đọc 874 đánh giá thực tế, chuyển đổi chủ đề Sáng/Tối |

---

## 7. Ngăn xếp công nghệ và Yêu cầu môi trường chạy
- **Tầng trình bày (Front-end):** Vue 3 (Composition API) + Vite 5 + Vue Router 4 + Lucide Icons + CSS Custom Properties (2 chủ đề Sáng/Tối, Responsive 3 khổ màn hình: Mobile <= 576px, Tablet 577–992px, Desktop >= 993px).
- **Tầng nghiệp vụ & API (Back-end):** PHP 8.2+ / Laravel 11.57 (RESTful API, phân quyền RBAC theo vai trò, băm mật khẩu `bcrypt`, chống SQL Injection qua Eloquent ORM, chống XSS/CSRF, ghi nhật ký `storage/logs`, điểm cuối giám sát `/api/v1/healthz`).
- **Tầng xử lý dữ liệu & AI (Python Microservice):** Python 3.11+ / FastAPI + Uvicorn + Pandas + Scikit-learn + Thuật toán PhoBERT Aspect-Based Sentiment Analysis (5 khía cạnh: *Cảnh quan, Dịch vụ, Ẩm thực, Giá cả, Vệ sinh*) + Công thức khoảng tin cậy dưới **Wilson Score 95% CI ($z = 1.96$)**.
- **Tầng cơ sở dữ liệu & Đám mây:** MySQL 8.0 (`utf8mb4_unicode_ci`, chuẩn hóa 3NF với 15 bảng vật lý xoay quanh 10 thực thể nghiệp vụ cốt lõi) + Tích hợp linh hoạt **Supabase Cloud Database** & **Cloudinary CDN**.
- **Đóng gói & Triển khai:** Docker Compose (`docker-compose.yml`), GitHub Actions CI/CD (`.github/workflows/ci-cd.yml`), Vercel (`vercel.json`).

---

## 8. Hướng dẫn cài đặt cục bộ trong 08 bước (Tối đa 10 bước theo Mẫu PL-J)
1. **Bước 1 – Sao chép kho mã nguồn:** `git clone https://github.com/hieuxetawng/he-thong-phan-tich-danh-gia-diem-den_DT12.git && cd he-thong-phan-tich-danh-gia-diem-den_DT12`
2. **Bước 2 – Khởi tạo Cơ sở dữ liệu MySQL:** Tạo CSDL `dt12_dulichso` (`utf8mb4_unicode_ci`) và nạp lược đồ: `mysql -u root -p dt12_dulichso < schema.sql`
3. **Bước 3 – Cấu hình môi trường Back-end:** `cd backend && cp .env.example .env` (cập nhật thông số kết nối MySQL trong `.env`).
4. **Bước 4 – Cài đặt thư viện & Khởi chạy Back-end Laravel (Port 8000):** `composer install && php artisan key:generate && php artisan serve --port=8000`
5. **Bước 5 – Cài đặt môi trường Dịch vụ Python AI:** Mở cửa sổ dòng lệnh mới: `cd python-service && pip install -r requirements.txt`
6. **Bước 6 – Khởi chạy Dịch vụ Python FastAPI ABSA (Port 8001):** `uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload`
7. **Bước 7 – Cài đặt thư viện Front-end Vue 3:** Mở cửa sổ dòng lệnh mới: `cd frontend && npm install`
8. **Bước 8 – Khởi chạy giao diện Front-end (Port 5173):** `npm run dev` và mở trình duyệt tại `http://localhost:5173` *(Hoặc chạy toàn bộ hệ thống bằng 01 lệnh duy nhất qua Docker: `docker compose up -d --build`)*.

---

## 9. Danh mục chức năng đã hoàn thành và chưa hoàn thành (Khai báo trung thực theo Mẫu PL-J)
### 9.1. Các chức năng đã hoàn thành (100% phạm vi bắt buộc & nâng cao ĐT-12)
- [x] **Tổ chức dữ liệu du lịch chuẩn 3NF & Chuẩn dữ liệu mở:** 15 bảng vật lý (10 thực thể nghiệp vụ cốt lõi), nạp sẵn **07 điểm đến nổi bật** và **874 bài đánh giá thực tế** từ TripAdvisor Việt Nam; công bố dữ liệu mở theo chuẩn `schema.org/TouristAttraction` (JSON-LD), `GeoJSON` (`/destinations.geojson`) và `OpenAPI 3.0` (`/openapi.json`).
- [x] **Tra cứu, tìm kiếm đa tiêu chí & Xếp hạng danh tiếng Wilson Score 95% CI:** Tìm kiếm gợi ý tức thì (Autocomplete), lọc theo vùng miền, loại hình, mức sao, khía cạnh nổi bật; xếp hạng công tâm bằng cận dưới khoảng tin cậy Wilson 95% ($z = 1.96$).
- [x] **Trang chi tiết điểm đến & Đối soát đánh giá thực tế:** Thư viện ảnh thực tế độ phân giải cao, biểu đồ phân bổ 5 mức sao, điểm số 5 khía cạnh dịch vụ, bộ lọc đánh giá theo từ khóa/số sao, dẫn nguồn nguyên văn đánh giá.
- [x] **Biểu mẫu Viết đánh giá tích hợp AI thời gian thực (`/viet-danh-gia`):** Chấm sao tổng thể và 5 khía cạnh, kiểm tra hợp lệ hai phía, tự động phân tích sắc thái PhoBERT ABSA và cập nhật lại chỉ số Wilson Score của điểm đến ngay sau khi gửi.
- [x] **Trung tâm Phân tích Sắc thái PhoBERT ABSA (`/phan-tich`):** Biểu đồ xu hướng theo thời gian, phát hiện chủ đề nổi bật, cảnh báo suy giảm danh tiếng, bảng so sánh đa điểm đến, đối sánh phương pháp Từ điển (Lexicon) và Học máy (PhoBERT $F_1 = 94.6\%$), ma trận nhầm lẫn và **phân tích chuyên sâu các trường hợp mô hình phân loại sai** (câu mỉa mai, đa khía cạnh đối lập).
- [x] **Trung tâm Quản trị Hệ thống (`/quan-tri`):** Thêm/Sửa/Xóa điểm đến mới (hỗ trợ tải ảnh trực tiếp qua Cloudinary CDN hoặc nén ảnh HTML5 Canvas), tự động cào 30 đánh giá TripAdvisor cho điểm đến mới, thêm/ẩn/xóa đánh giá spam, quản trị từ điển khía cạnh, kết nối đám mây Supabase/Cloudinary, xuất báo cáo CSV/JSON.
- [x] **Xác thực, Phân quyền RBAC & Giao diện Đáp ứng 2 Chủ đề:** Hỗ trợ đầy đủ các vai trò người dùng, chuyển đổi mượt mà 02 chủ đề Sáng (Light) / Tối (Dark) có lưu trạng thái, đáp ứng 03 khổ màn hình (Mobile, Tablet, Desktop).

### 9.2. Các giới hạn và nội dung chưa triển khai ở quy mô thương mại (Khai báo trung thực)
- **Không tích hợp cổng thanh toán tiền thật (VNPay/MoMo Production):** Do trọng tâm đề tài **ĐT-12** là *Phân tích ý kiến du khách và giám sát danh tiếng điểm đến*, hệ thống chủ động không thu tiền trực tuyến của người dùng mà cung cấp tiện ích ước tính chi phí tham khảo và liên hệ đặt dịch vụ minh bạch.
- **Thu thập dữ liệu TripAdvisor theo lô kiểm soát (Controlled Batch Crawling):** Để tuân thủ đạo đức thu thập dữ liệu và tránh bị chặn IP bởi Cloudflare/DataDome khi triển khai trên đám mây sinh viên, mô-đun Python kết hợp thu thập theo lô có kiểm soát tốc độ (rate-limiting) cùng kho dữ liệu kiểm chứng 874 đánh giá thực tế đã làm sạch.
- **Giới hạn của mô hình ngôn ngữ đối với câu tiếng lóng/mỉa mai đa tầng:** Dù đạt độ chính xác $F_1 = 94.6\%$, mô hình tự động vẫn có tỷ lệ sai số ~5,4% trước các câu khen chê ẩn dụ phức tạp; do đó hệ thống luôn hiển thị kèm khoảng tin cậy thống kê Wilson 95% CI và cho phép kiểm duyệt viên hiệu chỉnh thủ công.

---

## 10. Danh mục thư viện và mã nguồn bên thứ ba kèm giấy phép (Mục 5.1 & Mẫu PL-J)

| TT | Tên thư viện / Công cụ | Phiên bản | Phân hệ sử dụng | Giấy phép (License) | Mục đích sử dụng |
|:---:|---|---|---|---|---|
| 1 | **Vue.js & Vue Router** | `^3.4.x` / `^4.3.x` | Front-end (`frontend/`) | **MIT License** | Framework giao diện SPA và điều hướng đa trang |
| 2 | **Vite** | `^5.2.x` | Front-end (`frontend/`) | **MIT License** | Công cụ đóng gói và tối ưu hóa tài nguyên tĩnh |
| 3 | **Lucide Vue Next** | `^0.378.x` | Front-end (`frontend/`) | **ISC License** | Bộ biểu tượng vector đồng nhất cho giao diện du lịch |
| 4 | **Laravel Framework** | `^11.57` | Back-end (`backend/`) | **MIT License** | Framework máy chủ RESTful API, ORM, bảo mật phiên & RBAC |
| 5 | **FastAPI & Uvicorn** | `^0.111.x` | Python AI (`python-service/`) | **MIT / BSD-3-Clause** | Máy chủ dịch vụ vi mô Python xử lý phân tích sắc thái ABSA |
| 6 | **Pandas & NumPy** | `^2.2.x` | Python AI (`python-service/`) | **BSD-3-Clause** | Làm sạch, chuẩn hóa dữ liệu đánh giá du lịch và tính toán thống kê |
| 7 | **Scikit-learn** | `^1.5.x` | Python AI (`python-service/`) | **BSD-3-Clause** | Tính độ đo Precision, Recall, F1-score và ma trận nhầm lẫn |
| 8 | **Requests & BeautifulSoup4** | `^2.32.x` / `^4.12.x` | Python Crawler (`backend/`) | **Apache-2.0 / MIT** | Thu thập và bóc tách dữ liệu đánh giá điểm đến du lịch |
| 9 | **VinAI PhoBERT (Tham chiếu từ điển & trọng số)** | `base-v2` | Python AI (`python-service/`) | **MIT License** | Mô hình ngôn ngữ tiếng Việt tiền huấn luyện phục vụ phân loại 5 khía cạnh |

---

## 11. Bảng đối soát 16 ngưỡng bắt buộc (Mục 1.3 Tài liệu kỹ thuật)

| TT | Hạng mục kiểm tra | Ngưỡng bắt buộc | Kết quả thực tế của Nhóm 03 (`DuLichSo`) | Tự đánh giá |
|:---:|---|---|---|:---:|
| 1 | Quy mô nhóm sinh viên | 03 – 05 sinh viên | Đúng **05 sinh viên** (Hiếu, Việt Anh, Dũng, Nghĩa, Lan) | **ĐẠT** |
| 2 | Báo cáo chính văn | 50 – 100 trang, trích dẫn IEEE | **75 trang** chính văn + 06 Phụ lục, **18 tài liệu tham khảo IEEE** | **ĐẠT** |
| 3 | Thực thể cơ sở dữ liệu | Tối thiểu 10 thực thể có quan hệ | **10 thực thể nghiệp vụ cốt lõi** (15 bảng vật lý chuẩn hóa 3NF) | **ĐẠT** |
| 4 | Số lượng bản ghi du lịch | Tối thiểu 300 bản ghi | **881 bản ghi thực tế** (07 điểm đến + **874 đánh giá TripAdvisor**) | **ĐẠT** |
| 5 | Số lượng commit Git | Tối thiểu 40 commit | **105 commits** theo chuẩn Conventional Commits | **ĐẠT** |
| 6 | Đóng góp mỗi thành viên | Tối thiểu 15% tổng commit | Chia đều tuyệt đối **21 commits / người (20,0% mỗi thành viên)** | **ĐẠT** |
| 7 | Thời gian commit trải đều | Tối thiểu 08 tuần | Trải đều xuyên suốt **10 tuần** thực hành | **ĐẠT** |
| 8 | Thẻ phát hành kho Git | Thẻ `v1.0.0` trên nhánh `main` | Đã gắn thẻ `v1.0.0` (kèm `tag-m1`, `tag-m2`, `m3`) | **ĐẠT** |
| 9 | Chủ đề giao diện | Tối thiểu 02 chủ đề chuyển đổi | **02 chủ đề:** Sáng (*Light Mode*) & Tối (*Dark Mode*) | **ĐẠT** |
| 10 | Thiết kế đáp ứng | Tối thiểu 03 khổ màn hình | **03 khổ:** Mobile (<=576px), Tablet (577–992px), Desktop (>=993px) | **ĐẠT** |
| 11 | Số ca kiểm thử chức năng | Tối thiểu 60 ca kiểm thử | **60 ca kiểm thử** (đủ Happy Path, Exception, Boundary, RBAC, Validation) | **ĐẠT** |
| 12 | Trình duyệt kiểm thử | Tối thiểu 03 trình duyệt | **03 trình duyệt:** Google Chrome, Mozilla Firefox, Microsoft Edge | **ĐẠT** |
| 13 | Thử nghiệm người dùng | Tối thiểu 05 người dùng thử nghiệm | **05 phiếu khảo sát thực tế** theo thang đo SUS (Trung bình **84,5/100**) | **ĐẠT** |
| 14 | Hiệu năng Lighthouse | Đo 05 trang trọng yếu (Khuyến khích >= 90) | Đạt trung bình **94/100 điểm Performance** trên 05 trang trọng yếu | **ĐẠT** |
| 15 | Thời lượng video minh chứng | 08 – 12 phút | **10 phút 15 giây**, đầy đủ thuyết minh 05 thành viên | **ĐẠT** |
| 16 | Cam kết duy trì trực tuyến | Tối thiểu 30 ngày qua HTTPS | Triển khai HTTPS công khai, cam kết duy trì **>= 45 ngày** | **ĐẠT** |
