# Tài liệu hợp đồng API — Phiên bản 0.1
## Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến (ĐT-12)
Nhóm: [số nhóm] — [tên nhóm]
Ngày ban hành: [ngày Buổi 4]
Người soạn: Nguyễn Việt Dũng (V3)
Đã đối chiếu và cập nhật khớp schema.sql: [ngày cập nhật]

---

## PHẦN 1 — QUY ƯỚC CHUNG

### 1.1. Định dạng gốc
Toàn bộ API tuân theo chuẩn REST, dữ liệu trao đổi định dạng JSON, mã hoá UTF-8.

### 1.2. Tiền tố đường dẫn (base URL)
- Môi trường phát triển: `http://localhost:8000/api`
- Môi trường trực tuyến: `https://<ten-mien-cua-nhom>/api`

### 1.3. Xác thực
Mọi endpoint yêu cầu đăng nhập phải gửi kèm header:

Token được cấp từ endpoint `/api/auth/login`, có hiệu lực theo phiên, huỷ khi gọi `/api/auth/logout` hoặc khi đổi mật khẩu.

### 1.4. Định dạng phản hồi thành công
```json
{
  "data": "...",
  "message": "..."
}
```

### 1.5. Định dạng phản hồi lỗi
```json
{
  "error": "ma_loi_ngan_gon",
  "message": "Mô tả lỗi dễ hiểu cho người dùng"
}
```

### 1.6. Phân trang
Áp dụng cho mọi endpoint `GET` trả về danh sách.
Tham số: `?trang=1&so_dong=20` (mặc định `trang=1`, `so_dong=20`, tối đa `so_dong=100`)

**Quy tắc xử lý giá trị biên của phân trang:**
- Nếu `so_dong` > 100: hệ thống tự đặt `so_dong = 100`, vẫn trả mã 200 
  (không báo lỗi). Trường `meta.so_dong` phản ánh giá trị thực tế đã dùng (100).
- Nếu `trang` > `tong_trang`: trả mã 200, `data` là mảng rỗng `[]`, 
  `meta.tong_trang` và `meta.tong_ban_ghi` giữ nguyên giá trị thật.
- Nếu `trang` < 1, `so_dong` < 1, hoặc không phải số nguyên: trả mã 400, 
  `error = "yeu_cau_khong_hop_le"`.

Phản hồi kèm khối `meta`:
```json
{
  "data": ["..."],
  "meta": {
    "trang": 1,
    "so_dong": 20,
    "tong_trang": 8,
    "tong_ban_ghi": 152
  }
}
```

### 1.7. Vai trò và quyền hạn

Hệ thống có **4 vai trò**, đúng theo enum `vai_tro` trong bảng `nguoi_dung_he_thong` của schema.sql:

- **`admin`** — Toàn quyền trên mọi tài nguyên: tạo/sửa/xoá điểm đến, quản trị danh mục khía cạnh, xử lý mọi cảnh báo, quản lý tài khoản người dùng.

- **`quan_ly_diem_den`** — Quyền hạn CHỈ giới hạn trong phạm vi các điểm đến được gán phụ trách (cột `diem_den.nguoi_phu_trach_id = id của người này`):
  - Được: xem chi tiết, sửa thông tin điểm đến mình phụ trách; xem đánh giá và cảnh báo thuộc điểm đến mình phụ trách; đánh dấu xử lý cảnh báo của điểm đến mình phụ trách.
  - Không được: tạo điểm đến mới; xoá điểm đến; truy cập/sửa điểm đến không thuộc mình phụ trách; quản trị danh mục khía cạnh; quản lý tài khoản người dùng.

- **`chuyen_vien_pt`** — Phân tích viên: xem toàn bộ dữ liệu ở mọi điểm đến, được nhập/nạp đánh giá (kể cả nạp hàng loạt), nhưng KHÔNG được xoá/sửa danh mục hệ thống (điểm đến, khía cạnh) và không xử lý cảnh báo.

- **`du_khach`** — Chỉ xem dữ liệu công khai (dashboard tổng quan theo điểm đến), không truy cập bất kỳ chức năng quản trị nào.

**Mã lỗi riêng khi vi phạm phạm vi phụ trách** (áp dụng cho `quan_ly_diem_den`):
```json
{"error": "ngoai_pham_vi_phu_trach", "message": "Bạn không phụ trách điểm đến này"}
```
(trả về mã trạng thái `403`)

### 1.8. Quy tắc tự động sinh cảnh báo suy giảm danh tiếng

Hệ thống chạy kiểm tra mỗi ngày một lần (tác vụ định kỳ) cho từng điểm đến:

1. Tính tỷ lệ đánh giá có `sac_thai_tong = 'tieu_cuc'` trong 7 ngày gần nhất (kỳ A) và trong 7 ngày liền trước đó (kỳ B).
2. Chỉ xét khi mỗi kỳ có tối thiểu 10 đánh giá.
3. Mức tăng tương đối = (tỷ lệ kỳ A − tỷ lệ kỳ B) / tỷ lệ kỳ B.
4. Ghi 1 bản ghi vào bảng `canh_bao_danh_tieng` theo mức tăng:
   - Từ 15%: `muc_do = 'thap'`
   - Từ 25%: `muc_do = 'trung_binh'`
   - Từ 40%: `muc_do = 'cao'`
   - Từ 60%: `muc_do = 'nghiem_trong'`
5. Trạng thái ban đầu của cảnh báo là `'chua_xu_ly'`.
6. Không tạo cảnh báo mới nếu điểm đến đã có cảnh báo `'chua_xu_ly'` hoặc `'dang_xu_ly'` trong 7 ngày gần nhất.

Cảnh báo sinh ra được đọc qua `GET /api/canh-bao` (E3) và xử lý qua `PUT /api/canh-bao/{id}` (E4).

---

## PHẦN 2 — DANH SÁCH ENDPOINT THEO NHÓM

---

### NHÓM A — XÁC THỰC (AUTH)

**A1. Đăng ký tài khoản**

POST /api/auth/register

Body:
{
"ten_dang_nhap": "nguyenvana",
"ho_ten": "Nguyễn Văn A",
"email": "a@example.com",
"mat_khau": "matkhau123"
}

Phản hồi 201:
{
"data": {"id": 5, "ten_dang_nhap": "nguyenvana", "ho_ten": "Nguyễn Văn A", "email": "a@example.com", "vai_tro": "du_khach"},
"message": "Đăng ký thành công"
}

Phản hồi 422 (dữ liệu không hợp lệ, ví dụ email hoặc tên đăng nhập đã tồn tại):
{
"error": "du_lieu_khong_hop_le",
"message": "Email hoặc tên đăng nhập đã được sử dụng"
}
> Ghi chú: `ten_dang_nhap` là trường bắt buộc theo schema (`NOT NULL UNIQUE`). Vai trò mặc định khi tự đăng ký luôn là `du_khach`; các vai trò khác (`admin`, `quan_ly_diem_den`, `chuyen_vien_pt`) chỉ được `admin` gán thủ công.

**A2. Đăng nhập**
POST /api/auth/login

Body:
{
"email": "a@example.com",
"mat_khau": "matkhau123"
}

Phản hồi 200:
{
"data": {
"token": "1|abcXYZ123...",
"nguoi_dung": {"id": 5, "ho_ten": "Nguyễn Văn A", "vai_tro": "du_khach"}
}
}

Phản hồi 401 (sai email hoặc mật khẩu):
{
"error": "xac_thuc_that_bai",
"message": "Email hoặc mật khẩu không đúng"
}


**A3. Đăng xuất**

POST /api/auth/logout
Yêu cầu: header Authorization

Phản hồi 200:
{"message": "Đăng xuất thành công"}

Phản hồi 401 (chưa đăng nhập hoặc token hết hạn):
{"error": "chua_dang_nhap", "message": "Phiên đăng nhập không hợp lệ"}


**A4. Lấy thông tin người dùng hiện tại**
GET /api/auth/me
Yêu cầu: header Authorization

Phản hồi 200:
{
"data": {
"id": 8,
"ten_dang_nhap": "tranthib",
"ho_ten": "Trần Thị B",
"email": "b@example.com",
"vai_tro": "quan_ly_diem_den",
"diem_den_phu_trach": [3, 7]
}
}

> Ghi chú: trường `diem_den_phu_trach` (mảng id điểm đến) chỉ có giá trị khác rỗng khi `vai_tro = quan_ly_diem_den`; các vai trò khác trả về mảng rỗng `[]`.

Phản hồi 401: `{"error": "chua_dang_nhap", "message": "..."}`

---

### NHÓM B — ĐIỂM ĐẾN (`diem_den`)

**B1. Danh sách điểm đến**
GET /api/diem-den?tinh_thanh=&loai_hinh=&trang=1&so_dong=20

Phản hồi 200:
{
"data": [
{
"id": 3,
"ma_dinh_danh": "DD_HOIAN",
"ten": "Hội An",
"tinh_thanh": "Quảng Nam",
"loai_hinh": "di_tich",
"diem_danh_tieng_tb": 4.35,
"tong_luot_danh_gia": 152
}
],
"meta": {"trang": 1, "so_dong": 20, "tong_trang": 1, "tong_ban_ghi": 15}
}

> Ghi chú phân quyền: `admin`/`chuyen_vien_pt`/`du_khach` xem đầy đủ danh sách. `quan_ly_diem_den` mặc định chỉ nhìn thấy điểm đến mình phụ trách trừ khi truyền `?xem_tat_ca=1` (chỉ để tham khảo, không sửa được điểm đến ngoài phạm vi).

**B2. Chi tiết 1 điểm đến**
GET /api/diem-den/{id}

Phản hồi 200:
{
"data": {
"id": 3,
"ma_dinh_danh": "DD_HOIAN",
"ten": "Hội An",
"tinh_thanh": "Quảng Nam",
"loai_hinh": "di_tich",
"vi_do": 15.8801000,
"kinh_do": 108.3380000,
"mo_ta": "Phố cổ di sản UNESCO...",
"hinh_anh_url": "https://.../hoian.jpg",
"diem_danh_tieng_tb": 4.35,
"tong_luot_danh_gia": 152,
"nguoi_phu_trach_id": 8
}
}

Phản hồi 404: {"error": "khong_tim_thay", "message": "Không tìm thấy điểm đến"}


**B3. Tạo điểm đến mới**

POST /api/diem-den
Yêu cầu: header Authorization, vai_tro = admin

Body:
{
"ma_dinh_danh": "DD_HALONG",
"ten": "Vịnh Hạ Long",
"tinh_thanh": "Quảng Ninh",
"loai_hinh": "canh_quan",
"mo_ta": "Di sản thiên nhiên thế giới...",
"nguoi_phu_trach_id": 8
}

Phản hồi 201: {"data": {"id": 16, "..."}, "message": "Tạo điểm đến thành công"}
Phản hồi 403: {"error": "khong_co_quyen", "message": "Chỉ admin được thực hiện"}
Phản hồi 422: {"error": "du_lieu_khong_hop_le", "message": "Trường 'ma_dinh_danh' là bắt buộc"}

> Ghi chú: `nguoi_phu_trach_id` là tuỳ chọn, có thể gán sau bằng B4.

**B4. Sửa điểm đến**
PUT /api/diem-den/{id}
Yêu cầu: header Authorization

vai_tro = admin (mọi điểm đến), HOẶC
vai_tro = quan_ly_diem_den VÀ diem_den.nguoi_phu_trach_id = id người gọi

Body: giống B3 (các trường muốn sửa; riêng "nguoi_phu_trach_id" chỉ admin được đổi)

Phản hồi 200: {"data": {"..."}, "message": "Cập nhật thành công"}
Phản hồi 403:
{"error": "ngoai_pham_vi_phu_trach", "message": "Bạn không phụ trách điểm đến này"}
Phản hồi 404: {"error": "khong_tim_thay", "message": "..."}

**B5. Xoá điểm đến**
DELETE /api/diem-den/{id}
Yêu cầu: header Authorization, vai_tro = admin

Phản hồi 200: {"message": "Xoá thành công"}
Phản hồi 403: {"error": "khong_co_quyen", "message": "Chỉ admin được xoá điểm đến"}
Phản hồi 404: {"error": "khong_tim_thay", "message": "..."}


**B6. Danh sách điểm đến của tôi** *(mới thêm — phục vụ vai trò `quan_ly_diem_den`)*
GET /api/diem-den/cua-toi
Yêu cầu: header Authorization, vai_tro = quan_ly_diem_den

Phản hồi 200:
{"data": [{"id": 3, "ten": "Hội An", "..."}, {"id": 7, "ten": "Đà Nẵng", "..."}]}

---

### NHÓM C — ĐÁNH GIÁ (`danh_gia`)

**C1. Danh sách đánh giá, lọc đa tiêu chí**

GET /api/danh-gia?
diem_den_id=&khia_canh_id=&sac_thai=&tu_ngay=&den_ngay=&trang=1&so_dong=20

diem_den_id (int, tuỳ chọn): lọc theo điểm đến
khia_canh_id (int, tuỳ chọn): lọc theo khía cạnh (join qua bảng danh_gia_khia_canh)
sac_thai (enum: tich_cuc|tieu_cuc|trung_tinh, tuỳ chọn): lọc theo sac_thai_tong
tu_ngay, den_ngay (date, định dạng YYYY-MM-DD, tuỳ chọn)

Phản hồi 200:
{
"data": [
{
"id": 152,
"diem_den": {"id": 3, "ten": "Hội An"},
"diem_so": 2,
"tieu_de": "Đông quá",
"noi_dung": "Quá đông, giá dịch vụ ăn uống cao...",
"ngay_dang": "2026-05-12",
"ngay_trai_nghiem": "2026-05-08",
"nguon": "Google Maps",
"sac_thai_tong": "tieu_cuc",
"do_tin_cay_mo_hinh": 0.83,
"khia_canh": [
{"ten": "gia_ca", "sac_thai": "tieu_cuc", "do_tin_cay": 0.79, "doan_trich": "giá dịch vụ ăn uống cao"},
{"ten": "qua_tai_dong_duc", "sac_thai": "tieu_cuc", "do_tin_cay": 0.88, "doan_trich": "quá đông"}
]
}
],
"meta": {"trang": 1, "so_dong": 20, "tong_trang": 8, "tong_ban_ghi": 152}
}
> Ghi chú ánh xạ CSDL: Trường doan_trich trong dữ liệu JSON phản hồi của API được ánh xạ trực tiếp từ cột doan_trich_noi_dung trong bảng danh_gia_khia_canh của cơ sở dữ liệu.

**C2. Chi tiết 1 đánh giá**
GET /api/danh-gia/{id}

Phản hồi 200: cấu trúc giống 1 phần tử trong C1, kèm nghi_ngo_gia_mao nếu có:
{
"data": {
"id": 152,
"...(như trên)...": "",
"nghi_ngo_gia_mao": {
"diem_nghi_ngo": 0.12,
"ly_do_nghi_ngo": "Không phát hiện dấu hiệu bất thường"
}
}
}

Phản hồi 404: {"error": "khong_tim_thay", "message": "Không tìm thấy đánh giá"}

> Ghi chú: `ly_do_nghi_ngo` luôn có giá trị (NOT NULL theo schema), không bao giờ trả về `null`.

**C3. Nạp 1 đánh giá mới (thủ công)**

POST /api/danh-gia
Yêu cầu: header Authorization

Body:
{
"diem_den_id": 3,
"nguon_id": 1,
"diem_so": 4,
"noi_dung": "Cảnh đẹp, nhân viên nhiệt tình...",
"ngay_dang": "2026-09-01",
"ngay_trai_nghiem": "2026-08-28"
}

Phản hồi 201:
{
"data": {"id": 153, "sac_thai_tong": null, "..."},
"message": "Đã nạp đánh giá, đang chờ phân tích sắc thái"
}
Ghi chú: sac_thai_tong = null lúc mới tạo, hệ thống sẽ gọi
dịch vụ Python bất đồng bộ để phân tích rồi cập nhật sau.

Phản hồi 403 (nếu quan_ly_diem_den nạp cho điểm đến ngoài phạm vi):
{"error": "ngoai_pham_vi_phu_trach", "message": "Bạn không phụ trách điểm đến này"}
Phản hồi 422: {"error": "du_lieu_khong_hop_le", "message": "Trường 'diem_so' phải từ 1 đến 5"}


**C4. Nạp nhiều đánh giá từ file CSV**

POST /api/danh-gia/nhap-hang-loat
Yêu cầu: header Authorization

vai_tro = admin | chuyen_vien_pt (nạp cho bất kỳ điểm đến nào), HOẶC
vai_tro = quan_ly_diem_den (chỉ nạp được cho điểm đến mình phụ trách —
dòng nào trong CSV có diem_den_id ngoài phạm vi sẽ bị từ chối riêng dòng đó)
Content-Type: multipart/form-data
Body: file (CSV theo mẫu cột đã quy định)
Phản hồi 202 (đã nhận, đang xử lý nền):
{
"data": {"ma_tien_trinh": "job_20260901_001"},
"message": "Đã nhận file, đang xử lý. Kiểm tra tiến trình tại /api/danh-gia/tien-trinh/{ma_tien_trinh}"
}

Phản hồi 403: {"error": "ngoai_pham_vi_phu_trach", "message": "File chứa điểm đến bạn không phụ trách"}
Phản hồi 422: {"error": "file_khong_hop_le", "message": "File thiếu cột 'noi_dung'"}

**C5. Kiểm tra tiến trình xử lý nhập hàng loạt**
GET /api/danh-gia/tien-trinh/{ma_tien_trinh}

Phản hồi 200:
{
"data": {
"trang_thai": "dang_xu_ly | hoan_thanh | loi",
"so_dong_da_xu_ly": 120,
"tong_so_dong": 300
}
}

---

### NHÓM D — KHÍA CẠNH & CHỦ ĐỀ

**D1. Danh mục khía cạnh**
GET /api/khia-canh

Phản hồi 200:
{
"data": [
{"id": 1, "ma_khia_canh": "ve_sinh", "ten_khia_canh": "Vệ sinh"},
{"id": 2, "ma_khia_canh": "gia_ca", "ten_khia_canh": "Giá cả"},
{"id": 3, "ma_khia_canh": "thai_do_nv", "ten_khia_canh": "Thái độ nhân viên"}
]
}

**D2. Thêm khía cạnh mới**
POST /api/khia-canh
Yêu cầu: header Authorization, vai_tro = admin

Body: {"ma_khia_canh": "an_ninh", "ten_khia_canh": "An ninh"}

Phản hồi 201: {"data": {"id": 7, "ma_khia_canh": "an_ninh", "ten_khia_canh": "An ninh"}}
Phản hồi 403: {"error": "khong_co_quyen", "message": "Chỉ admin được quản trị danh mục khía cạnh"}
Phản hồi 422: {"error": "trung_lap", "message": "Khía cạnh đã tồn tại"}

**D3. Danh sách chủ đề nổi bật**
GET /api/chu-de?diem_den_id=&tu_ngay=&den_ngay=

Phản hồi 200:
{
"data": [
{
"id": 4,
"ten_chu_de": "Quá tải dịp lễ",
"tu_khoa_chinh": "đông, quá tải, chen chúc, xếp hàng",
"muc_do_quan_tam": "nong",
"trang_thai": "dang_theo_doi",
"ngay_phat_hien": "2026-04-30",
"so_danh_gia_lien_quan": 27
}
]
}
> Ghi chú: đã đổi trường `mo_ta` (không tồn tại trong schema) thành `tu_khoa_chinh` (đúng cột NOT NULL của bảng `chu_de`); bổ sung thêm `muc_do_quan_tam` và `trang_thai`.

---

### NHÓM E — DASHBOARD & CẢNH BÁO

**E1. Dữ liệu xu hướng theo thời gian**
GET /api/dashboard/xu-huong?diem_den_id=&tu_ngay=&den_ngay=
Yêu cầu: header Authorization

Phản hồi 200:
{
"data": {
"theo_ngay": [
{"ngay": "2026-05-01", "tich_cuc": 12, "tieu_cuc": 3, "trung_tinh": 5},
{"ngay": "2026-05-02", "tich_cuc": 8, "tieu_cuc": 7, "trung_tinh": 2}
],
"diem_trung_binh_ky": 4.1
}
}
Phản hồi 401: {"error": "chua_dang_nhap", "message": "..."}
> Ghi chú phân quyền: `quan_ly_diem_den` chỉ truy vấn được `diem_den_id` thuộc phạm vi mình phụ trách; nếu truyền `diem_den_id` ngoài phạm vi → trả về 403.

**E2. So sánh nhiều điểm đến**
GET /api/dashboard/so-sanh?diem_den_ids=1,2,3
Yêu cầu: header Authorization

Phản hồi 200:
{
"data": [
{"diem_den_id": 1, "ten": "Hội An", "diem_danh_tieng_tb": 4.35, "ty_le_tieu_cuc": 0.12},
{"diem_den_id": 2, "ten": "Đà Nẵng", "diem_danh_tieng_tb": 4.60, "ty_le_tieu_cuc": 0.08}
]
}

**E3. Danh sách cảnh báo suy giảm danh tiếng**
GET /api/canh-bao?trang_thai=
Yêu cầu: header Authorization

Tham số:

trang_thai (enum: chua_xu_ly|dang_xu_ly|da_khac_phuc|bo_qua, tuỳ chọn): lọc theo trạng thái xử lý

Phản hồi 200:
{
"data": [
{
"id": 9,
"diem_den": {"id": 3, "ten": "Hội An"},
"tieu_de": "Tỷ lệ phàn nàn về Vệ sinh tăng đột biến",
"ngay_phat_hien": "2026-08-15",
"muc_do": "cao",
"mo_ta": "Tỷ lệ đánh giá tiêu cực về khía cạnh vệ sinh tăng 40% trong 7 ngày",
"trang_thai": "chua_xu_ly"
}
]
}
> Ghi chú phân quyền:
> - `admin`: xem toàn bộ cảnh báo mọi điểm đến.
> - `quan_ly_diem_den`: hệ thống TỰ ĐỘNG lọc chỉ trả về cảnh báo của điểm đến mình phụ trách (không cần truyền tham số riêng, backend tự áp dụng theo `nguoi_phu_trach_id`).
> - `chuyen_vien_pt`: xem toàn bộ (chỉ xem, không xử lý được — xem E4).
> - `du_khach`: không có quyền truy cập endpoint này (401/403).
>
> Đã đổi trường `da_xu_ly` (boolean, không khớp schema) thành `trang_thai` (enum 4 trạng thái, đúng cột schema); bổ sung trường `tieu_de` (NOT NULL trong schema, trước đây bị thiếu).

**E4. Đánh dấu xử lý cảnh báo**
PUT /api/canh-bao/{id}
Yêu cầu: header Authorization

vai_tro = admin (mọi cảnh báo), HOẶC
vai_tro = quan_ly_diem_den VÀ cảnh báo thuộc điểm đến mình phụ trách

Body: {"trang_thai": "da_khac_phuc"}

Phản hồi 200: {"message": "Đã cập nhật trạng thái cảnh báo"}
Phản hồi 403:
{"error": "ngoai_pham_vi_phu_trach", "message": "Bạn không phụ trách điểm đến của cảnh báo này"}

---

### NHÓM F — NỘI BỘ (Laravel gọi sang Python — Vue KHÔNG được gọi trực tiếp)

**F1. Phân tích sắc thái**
POST http://python-service:8000/phan-tich-sac-thai
Body: {"noi_dung": "Quá đông, giá dịch vụ ăn uống cao..."}

Phản hồi 200:
{
"sac_thai_tong": "tieu_cuc",
"do_tin_cay": 0.83,
"khia_canh_phat_hien": [
{"ten": "gia_ca", "sac_thai": "tieu_cuc", "do_tin_cay": 0.79, "doan_trich": "giá dịch vụ ăn uống cao"},
{"ten": "qua_tai_dong_duc", "sac_thai": "tieu_cuc", "do_tin_cay": 0.88, "doan_trich": "quá đông"}
]
}
> Ghi chú: Laravel nhận phản hồi này rồi cập nhật ngược vào 2 cột mới `danh_gia.sac_thai_tong`, `danh_gia.do_tin_cay_mo_hinh` (xem Phần 3), đồng thời ghi từng khía cạnh vào bảng `danh_gia_khia_canh`.

**F2. Phát hiện chủ đề**
POST http://python-service:8000/phat-hien-chu-de
Body: {"diem_den_id": 3, "khoang_ngay": ["2026-04-01", "2026-04-30"]}

Phản hồi 200:
{
"chu_de": [
{"ten_chu_de": "Quá tải dịp lễ", "tu_khoa_chinh": "đông, quá tải, chen chúc", "so_danh_gia_lien_quan": 27}
]
}

**F3. Phát hiện nghi ngờ giả mạo**
POST http://python-service:8000/phat-hien-gia-mao
Body: {"danh_gia_id": 152, "noi_dung": "..."}

Phản hồi 200:
{"diem_nghi_ngo": 0.12, "ly_do_nghi_ngo": "Văn phong tự nhiên, không phát hiện dấu hiệu bất thường"}

## PHẦN 3 — MA TRẬN PHÂN QUYỀN THEO ENDPOINT

| Endpoint | admin | quan_ly_diem_den | chuyen_vien_pt | du_khach |
|---|---|---|---|---|
| `GET /api/diem-den` | Tất cả | Tất cả (xem), mặc định lọc về mình phụ trách | Tất cả | Tất cả (công khai) |
| `GET /api/diem-den/{id}` | ✅ | ✅ chỉ nếu là điểm đến mình phụ trách | ✅ | ✅ |
| `POST /api/diem-den` | ✅ | ❌ | ❌ | ❌ |
| `PUT /api/diem-den/{id}` | ✅ | ✅ chỉ nếu là điểm đến mình phụ trách | ❌ | ❌ |
| `DELETE /api/diem-den/{id}` | ✅ | ❌ | ❌ | ❌ |
| `GET /api/diem-den/cua-toi` | ❌ (không cần) | ✅ | ❌ | ❌ |
| `GET /api/danh-gia` | ✅ | ✅ chỉ đánh giá của điểm đến mình phụ trách | ✅ | ✅ (bản rút gọn) |
| `POST /api/danh-gia` | ✅ | ✅ chỉ cho điểm đến mình phụ trách | ✅ | ❌ |
| `POST /api/danh-gia/nhap-hang-loat` | ✅ | ✅ chỉ cho điểm đến mình phụ trách | ✅ | ❌ |
| `GET /api/khia-canh` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/khia-canh` | ✅ | ❌ | ❌ | ❌ |
| `GET /api/chu-de` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/dashboard/xu-huong` | ✅ | ✅ chỉ điểm đến mình phụ trách | ✅ | ✅ (bản công khai) |
| `GET /api/dashboard/so-sanh` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/canh-bao` | ✅ toàn bộ | ✅ chỉ của điểm đến mình phụ trách | ✅ xem (không xử lý) | ❌ |
| `PUT /api/canh-bao/{id}` | ✅ | ✅ chỉ nếu cảnh báo thuộc điểm đến mình phụ trách | ❌ | ❌ |

---

## PHẦN 4 — BẢNG MÃ LỖI DÙNG CHUNG

| Mã trạng thái | Mã lỗi (`error`) | Khi nào xảy ra |
| :--- | :--- | :--- |
| **400** | `yeu_cau_khong_hop_le` | Tham số gửi sai định dạng (ví dụ ngày không đúng YYYY-MM-DD) |
| **401** | `chua_dang_nhap` | Thiếu token hoặc token hết hạn |
| **403** | `khong_co_quyen` | Đã đăng nhập nhưng vai trò không đủ quyền thực hiện hành động |
| **403** | `ngoai_pham_vi_phu_trach` | `quan_ly_diem_den` cố truy cập/sửa tài nguyên ngoài phạm vi điểm đến mình phụ trách |
| **404** | `khong_tim_thay` | ID không tồn tại |
| **422** | `du_lieu_khong_hop_le` | Dữ liệu gửi lên vi phạm ràng buộc (thiếu trường bắt buộc, sai kiểu) |
| **422** | `trung_lap` | Dữ liệu vi phạm ràng buộc UNIQUE (email, tên đăng nhập, mã khía cạnh trùng...) |
| **500** | `loi_he_thong` | Lỗi phía máy chủ, không do người dùng |