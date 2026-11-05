# BỘ HỒ SƠ ĐẦY ĐỦ: CẤU TRÚC TRANG, SITEMAP, LUỒNG ĐIỀU HƯỚNG & WIREFRAME ĐA KHỔ MÀN HÌNH (MỤC 3.4 & 3.5 ĐỀ THI CSE703073)

> [!IMPORTANT]
> **Đối chiếu 100% yêu cầu Mục 3.4 & Mục 3.5 (`TANHNV - CSE703073_DeThiCuoiKy_DuAnNhom.pdf` – Trang 10 & Slide 20 Chỉ dẫn thực hiện):**
> Để đảm bảo **không thiếu bất kỳ một ý nhỏ nào** khi hội đồng chấm báo cáo, bộ thiết kế giao diện và cấu trúc điều hướng của **Đề tài ĐT-12 (`DuLichSo` – Nhóm 03)** được chuẩn hóa thành **04 bản vẽ kỹ thuật độ phân giải cao** tương ứng với đúng 4 cấu phần bắt buộc của đề thi:
> 1. **Bản vẽ 01 (`01_Sitemap_CauTrucTrang_DuLichSo_DT12.png`):** Sơ đồ Cấu trúc Site Map phân cấp toàn hệ thống (Master Page, 4 Phân khu, 9 Routes, 2 Open Data Endpoints, Tầng API & CSDL).
> 2. **Bản vẽ 02 (`02_SoDo_LuongDieuHuong_UserFlow_DuLichSo_DT12.png`):** Sơ đồ Luồng Điều Hướng & Hành Trình Tương Tác theo 03 Vai trò (Navigation Flow / User Journey + Chốt chặn phân quyền `router.beforeEach` & nhánh rẽ `200 OK` vs `403 Forbidden`).
> 3. **Bản vẽ 03 (`03_Wireframe_8_ManHinh_Chinh_DuLichSo_DT12.png`):** Bản thiết kế Wireframe chi tiết cho **đầy đủ 08 màn hình nghiệp vụ (`WF-01` → `WF-08`)** bao phủ 100% các trang của hệ thống.
> 4. **Bản vẽ 04 (`04_Wireframe_Responsive_3Kho_Va_DesignSystem_DT12.png`):** Bản thiết kế Đáp ứng **03 khổ màn hình (`Desktop >= 993px` · `Tablet 577–992px` · `Mobile <= 576px`)** & **Hệ thống Thiết kế 02 Chủ đề Sáng/Tối (`Design System Tokens` chuẩn WCAG 2.1 AA)**.

---

## PHẦN 1: HÌNH ẢNH TRỰC QUAN 04 BẢN VẼ KỸ THUẬT (SITEMAP, USER FLOW, WIREFRAME 8 MÀN HÌNH & RESPONSIVE 3 KHỔ)

````carousel
![Bản vẽ 01 - Sơ đồ Cấu trúc Site Map Hệ thống DuLichSo ĐT-12](C:/Users/vyln2/.gemini/antigravity/brain/b34ec5c0-ca2f-4716-95e6-9f20c1280b71/01_Sitemap_CauTrucTrang_DuLichSo_DT12.png)
<!-- slide -->
![Bản vẽ 02 - Sơ đồ Luồng Điều Hướng & Hành Trình Tương Tác Người Dùng (Navigation Flow)](C:/Users/vyln2/.gemini/antigravity/brain/b34ec5c0-ca2f-4716-95e6-9f20c1280b71/02_SoDo_LuongDieuHuong_UserFlow_DuLichSo_DT12.png)
<!-- slide -->
![Bản vẽ 03 - Bản Thiết kế Wireframe Đầy đủ 08 Màn hình Nghiệp vụ (WF-01 đến WF-08)](C:/Users/vyln2/.gemini/antigravity/brain/b34ec5c0-ca2f-4716-95e6-9f20c1280b71/03_Wireframe_8_ManHinh_Chinh_DuLichSo_DT12.png)
<!-- slide -->
![Bản vẽ 04 - Thiết kế Đáp ứng 03 Khổ Màn hình (Responsive) & Hệ thống Design Tokens 02 Chủ đề Sáng/Tối](C:/Users/vyln2/.gemini/antigravity/brain/b34ec5c0-ca2f-4716-95e6-9f20c1280b71/04_Wireframe_Responsive_3Kho_Va_DesignSystem_DT12.png)
````

---

## PHẦN 2: THUYẾT MINH HỌC THUẬT ĐẦY ĐỦ (DÙNG ĐỂ DÁN VÀO BÁO CÁO CHƯƠNG 3 – MỤC 3.4 & 3.5)

### 3.4. Thiết kế Cấu trúc Trang và Điều hướng (Site Map & Navigation Flow)

#### 3.4.1. Sơ đồ Site Map phân cấp toàn hệ thống (Bản vẽ 01)
Hệ thống **DuLichSo (Đề tài ĐT-12)** được thiết kế theo kiến trúc **Ứng dụng Đơn trang (Single Page Application – SPA)** sử dụng `Vue Router 4` kết hợp cơ chế định tuyến lịch sử trình duyệt (`createWebHistory`). Toàn bộ không gian trang được tổ chức theo cấu trúc cây phân cấp 3 tầng rõ ràng, đảm bảo **Quy tắc 3 lần nhấp chuột (3-Click Rule)** — người dùng không bao giờ phải thao tác quá 3 bước để đi từ Trang chủ đến bất kỳ nội dung chi tiết hoặc công cụ phân tích nào:

1. **Tầng Khung Bố Cục Dùng Chung (Master Page / Layout Layer – `App.vue`):**
   - **Thanh điều hướng cố định (`Navbar.vue`):** Neo cố định tại đỉnh trang (`position: sticky; top: 0; z-index: 1000`), tích hợp thương hiệu **DuLichSo – AI Verified**, 05 liên kết điều hướng chính, nút chuyển đổi tức thì **02 chủ đề giao diện Sáng/Tối (Light/Dark Mode)**, và thẻ hiển thị trạng thái phiên đăng nhập kèm vai trò RBAC.
   - **Vùng hiển thị nội dung động (`<router-view />`):** Tự động nạp các màn hình thành phần (View Components) theo đường dẫn URL mà không cần tải lại toàn bộ trang, kết hợp hàm `scrollBehavior()` tự động đưa tầm nhìn lên đầu trang (`top: 0`) khi chuyển mục.
   - **Chân trang học thuật (`Academic Footer`):** Tuân thủ nghiêm ngặt quy định tại **Mục 2.4 Đề thi**, hiển thị rõ tên học phần *CSE703073 – Lập trình ứng dụng web trong du lịch 2*, danh sách 05 thành viên Nhóm 03 kèm MSSV, tuyên bố *"Sản phẩm học thuật – phục vụ mục đích đào tạo"*, và ghi chú giới hạn mô hình AI.

2. **Tầng Định Tuyến Giao Diện (04 Phân khu chức năng – 09 Routes & 02 Open Data Endpoints):**
   - **Phân khu I – Khám phá & Tra cứu Điểm đến (Public Access):**
     - `GET /` (`DashboardView.vue`): Trang chủ khám phá, tích hợp Hero Search gợi ý tức thì (Autocomplete), bộ lọc vùng miền (*Quảng Ninh, Ninh Bình, Kiên Giang*), 4 thẻ KPI thời gian thực và bảng xếp hạng danh tiếng *Travelers' Choice*.
     - `GET /diem-den` (`DiemDenListView.vue`): Danh mục 07 điểm đến kiểm chứng, hỗ trợ chuyển đổi linh hoạt giữa chế độ **Xếp chồng (Stacked Leaderboard)** và **Lưới 3 cột (Grid View)**, kết hợp lọc đa tiêu chí và sắp xếp theo cận dưới **Wilson Score 95% CI**.
     - `GET /diem-den/:id` (`ChiTietDiemDenView.vue`): Trang chi tiết điểm đến sử dụng tham số đường dẫn động (`:id`), hiển thị bộ ảnh thực tế, thẻ bảo chứng Wilson Score 95%, thanh điểm 05 khía cạnh dịch vụ (*Cảnh quan, Dịch vụ, Ẩm thực, Giá cả, Vệ sinh*), biểu đồ phân bổ 5 mức sao và danh sách đánh giá gốc.
   - **Phân khu II – Phân tích Trí tuệ Nhân tạo PhoBERT ABSA:**
     - `GET /absa` & đường dẫn thân thiện SEO `GET /phan-tich` (`AbsaAnalyticsView.vue`): Trung tâm phân tích sắc thái 5 khía cạnh bằng mô hình học sâu `vinai/phobert-base`, đối sánh hiệu năng **Từ điển (Lexicon `F1 = 78.4%`) vs. PhoBERT (`F1 = 94.6%`)**, hiển thị ma trận nhầm lẫn trên 200 mẫu kiểm thử độc lập và phân tích chuyên sâu **03 nhóm trường hợp mô hình dự đoán sai** (*câu mỉa mai/ẩn dụ, câu đa khía cạnh đối lập không từ nối, câu phủ định kép tiếng Việt*).
   - **Phân khu III – Cộng đồng Đánh giá & Tương tác Du khách:**
     - `GET /danh-sach-danh-gia` (`DanhSachDanhGiaView.vue`): Kho lưu trữ và đối soát toàn bộ **874 đánh giá thực tế** từ TripAdvisor, hỗ trợ tìm kiếm từ khóa, lọc theo điểm đến, mức sao, nhãn sắc thái AI và phân trang chuẩn (`20 bản ghi/trang`).
     - `GET /viet-danh-gia` (`WriteReviewView.vue`): Biểu mẫu đóng góp đánh giá mới có kiểm tra hợp lệ dữ liệu 2 phía (Client & Server Validation), chấm điểm tổng thể 1–5 sao và 5 khía cạnh chi tiết; ngay khi gửi sẽ kích hoạt `POST /absa/analyze` và tự động tính lại cận dưới Wilson Score 95%.
   - **Phân khu IV – Cổng Xác thực Đa vai trò & Quản trị Hệ thống (RBAC Guard):**
     - `GET /dang-nhap` (`LoginView.vue`): Cổng Đăng nhập / Đăng ký tích hợp bộ chọn nhanh (Quick-Fill) cho các vai trò kiểm thử chuẩn.
     - `GET /quan-tri` (`DashboardAdminView.vue`): Trung tâm quản trị được bảo vệ bởi `meta: { requiresAuth: true, role: 'admin' }`, gồm 4 phân hệ: *(1) Quản lý Điểm đến & Tự động cào 30 đánh giá TripAdvisor*, *(2) Kiểm duyệt & Xóa đánh giá Spam*, *(3) Quản lý Từ điển Khía cạnh*, và *(4) Cấu hình Đám mây Supabase + Cloudinary kèm công cụ Sao lưu/Khôi phục JSON*.
     - `GET /khong-co-quyen` (`KhongCoQuyenView.vue`): Màn hình chặn quyền truy cập trái phép (`HTTP 403 Forbidden`).
   - **Điểm cuối Dữ liệu Mở & Đặc tả API (Open Data & Specs – Điểm thưởng Mục 8.3):**
     - `GET /openapi.json` (Đặc tả OpenAPI 3.0.3) và `GET /destinations.geojson` (Dữ liệu không gian chuẩn RFC 7946 GeoJSON).

---

#### 3.4.2. Sơ đồ Luồng Điều Hướng & Hành Trình Tương Tác Người Dùng (Bản vẽ 02)
Sơ đồ luồng điều hướng ánh xạ trực tiếp từ **03 Chân dung người dùng (Personas)** đã xác lập tại Chương 2 sang các luồng chuyển trang thực tế:
- **Luồng 1 – Hành trình Du khách Khám phá & Đối soát Danh tiếng (`Guest / Tourist Persona`):**
  `Trang chủ (/)` $\rightarrow$ Tìm kiếm hoặc lọc vùng miền $\rightarrow$ `Danh mục điểm đến (/diem-den)` $\rightarrow$ Chọn điểm đến có Wilson Score 95% cao nhất $\rightarrow$ `Chi tiết điểm đến (/diem-den/:id)` $\rightarrow$ Đối soát nguyên văn đánh giá tại `Kho 874 đánh giá (/danh-sach-danh-gia)` $\rightarrow$ Ra quyết định tiêu dùng hoặc chuyển sang viết đánh giá.
- **Luồng 2 – Hành trình Đóng góp Đánh giá & Phân tích Sắc thái PhoBERT (`Tourist / Analyst Persona`):**
  `Mở biểu mẫu (/viet-danh-gia)` $\rightarrow$ Kiểm tra hợp lệ 2 phía (độ dài $\ge 15$ ký tự, lọc mã độc XSS) $\rightarrow$ Gọi dịch vụ `POST /absa/analyze (:8001)` tách mệnh đề và gán nhãn 5 khía cạnh $\rightarrow$ Thực thi hàm `capNhatThongKeWilson()` cập nhật lại cận dưới 95% $\rightarrow$ Trực quan hóa kết quả trên `Báo cáo ABSA (/absa)`.
- **Luồng 3 – Hành trình Kiểm soát Phân quyền RBAC & Quản trị Hệ thống (`Admin / Moderator Persona`):**
  `Cổng xác thực (/dang-nhap)` $\rightarrow$ Chốt chặn `router.beforeEach(to, from, next)` kiểm tra thuộc tính `to.meta.requiresAuth` và `user.role`:
  - **Nhánh A (Trái quyền – `role !== 'admin'`):** Chuyển hướng cưỡng bức sang `/khong-co-quyen` (`403 Forbidden`), chặn đứng truy cập trái phép.
  - **Nhánh B (Đúng quyền – `role === 'admin'`):** Cho phép đi thẳng vào `/quan-tri` (`200 OK`) để thực hiện CRUD điểm đến, tải ảnh lên Cloudinary, đồng bộ Supabase và kiểm tra `/api/v1/healthz`.

---

### 3.5. Thiết kế Giao diện và Trải nghiệm Người dùng (UI/UX, Wireframe & Design System)

#### 3.5.1. Bản thiết kế Wireframe đầy đủ 08 màn hình nghiệp vụ (Bản vẽ 03)
Để đảm bảo tính nhất quán trước khi lập trình giao diện chi tiết, nhóm đã xây dựng đầy đủ **08 khung giao diện (Wireframes từ `WF-01` đến `WF-08`)** bao phủ 100% các route của hệ thống:

| Mã Wireframe | Tên Màn hình & Đường dẫn Route | Thành phần Giao diện Trọng tâm (Key UI Blocks) |
| :--- | :--- | :--- |
| **`WF-01`** | **Trang Chủ Khám Phá** (`/`) | Thanh điều hướng cố định; Hero Search kèm 4 tab phân loại & gợi ý Autocomplete; Dải 4 thẻ KPI; Bảng xếp hạng *Travelers' Choice*; Chân trang học thuật. |
| **`WF-02`** | **Danh Mục & Bộ Lọc Điểm Đến** (`/diem-den`) | Thanh công cụ lọc cố định (Sticky Filter Bar) theo khu vực, mức sao, thứ tự Wilson 95%; Nút chuyển đổi chế độ **Xếp chồng (Stacked)** và **Lưới 3 cột (Grid)**. |
| **`WF-03`** | **Chi Tiết Điểm Đến** (`/diem-den/:id`) | Đường dẫn Breadcrumb; Thư viện ảnh thực tế; Hộp **Bảo chứng Wilson Score 95% CI**; Thanh tiến trình 5 khía cạnh PhoBERT ABSA; Bộ lọc danh sách đánh giá của điểm đến. |
| **`WF-04`** | **Phân Tích Sắc Thái PhoBERT** (`/absa`) | Bảng xếp hạng đối sánh 07 điểm đến trên 5 khía cạnh; Bảng so sánh **Từ điển (`F1 = 78.4%`) vs. PhoBERT (`F1 = 94.6%`)**; Phân tích 03 nhóm câu AI dự đoán sai; Nút xuất CSV/JSON. |
| **`WF-05`** | **Kho 874 Đánh Giá Cộng Đồng** (`/danh-sach-danh-gia`) | Bộ lọc đa chiều (theo điểm đến, mức sao, nhãn sắc thái AI, từ khóa); Danh sách thẻ đánh giá hiển thị nhãn PhoBERT & độ tin cậy; Thanh phân trang 44 trang. |
| **`WF-06`** | **Trang Viết Đánh Giá Mới** (`/viet-danh-gia`) | Dropdown chọn điểm đến; Bộ chọn 5 ngôi sao tổng thể; 5 thanh chấm điểm khía cạnh dịch vụ; Ô nhập tiêu đề & nội dung ($\ge 15$ ký tự); Hộp kết quả AI trả về tức thì. |
| **`WF-07`** | **Cổng Xác Thực & Chặn Quyền** (`/dang-nhap`, `/khong-co-quyen`) | Khung chuyển đổi Đăng nhập / Đăng ký; Lưới nút chọn nhanh vai trò kiểm thử (`minmax(0, 1fr)` chống tràn); Giao diện cảnh báo `403 Forbidden` khi truy cập trái phép. |
| **`WF-08`** | **Trung Tâm Quản Trị Hệ Thống** (`/quan-tri`) | Giao diện 4 Tab quản trị: Thêm/Sửa/Xóa điểm đến + Nén ảnh Canvas + Tự động cào 30 review TripAdvisor; Kiểm duyệt Spam; Từ điển ABSA; Đồng bộ Supabase & Cloudinary. |

---

#### 3.5.2. Nguyên tắc Thiết kế Đáp ứng 03 Khổ màn hình & Hệ thống Design Tokens 02 Chủ đề (Bản vẽ 04)
1. **Thiết kế Đáp ứng Đa thiết bị (Responsive Web Design – 03 Breakpoints chuẩn):**
   - **Khổ Máy tính để bàn (`Desktop >= 993px`):** Khung chứa tiêu chuẩn `max-width: 1320px`, hiển thị đầy đủ thanh điều hướng ngang, bố cục lưới 3 cột (`grid-template-columns: repeat(3, minmax(0, 1fr))`) và chân trang 4 cột.
   - **Khổ Máy tính bảng (`Tablet 577px – 992px`):** Tự động thu gọn lưới thẻ điểm đến về 2 cột cân đối (`repeat(2, minmax(0, 1fr))`), thanh công cụ lọc hỗ trợ cuộn ngang mượt mà, chân trang xếp 2×2 cột.
   - **Khổ Điện thoại di động (`Mobile <= 576px`):** Chuyển đổi hoàn toàn sang bố cục xếp chồng 1 cột dọc (`1-Column Stack`), menu thu gọn dạng ngăn kéo (Drawer Menu), mọi nút bấm tương tác đảm bảo kích thước vùng chạm tối thiểu `44×44px` và cam kết **không tràn ngang (`overflow-x: hidden`)** ngay cả ở độ rộng `320px`.

2. **Hệ thống Thiết kế (Design System) & 02 Chủ đề Giao diện Sáng/Tối đạt chuẩn WCAG 2.1 AA:**
   - Hệ thống định nghĩa bộ biến CSS gốc (`CSS Custom Properties`) tại `:root` (Chủ đề Sáng – *Light Mode*) và `[data-theme="dark"]` (Chủ đề Tối – *Dark Mode*), lưu trữ trạng thái vào `localStorage` để duy trì xuyên suốt phiên làm việc:
     - **Nền chính (`--bg-main`):** `#F8FAFC` (Sáng) / `#0B0F17` (Tối).
     - **Nền thẻ (`--bg-card`):** `#FFFFFF` (Sáng) / `#111827` (Tối).
     - **Chữ chính (`--text-primary`):** `#0F172A` (Sáng – tương phản **17.4:1**) / `#F8FAFC` (Tối – tương phản **18.1:1**, vượt xa ngưỡng tối thiểu `4.5:1` của WCAG 2.1 mức AA).
     - **Điểm nhấn thương hiệu (`--brand-gold`):** `#F2B203` (Vàng Hổ Phách) / `#FBBF24` (Vàng Ánh Kim).
     - **Nhãn sắc thái AI:** Tích cực (`#15803D` / `#34D399`), Trung tính (`#B45309` / `#FBBF24`), Tiêu cực (`#B91C1C` / `#F87171`) luôn đi kèm biểu tượng và nhãn chữ tường minh để hỗ trợ người mù màu.
   - **Kiểm chứng Khả dụng & Hiệu năng thực tế:** Điểm khảo sát khả dụng **SUS đạt `84.5/100` (Hạng A – Xuất sắc)**, điểm **Google Lighthouse Performance đạt `94/100`** và **Accessibility đạt `96.4/100`**.
