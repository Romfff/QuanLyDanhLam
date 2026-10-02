# BẢNG ĐỐI CHIẾU HỢP ĐỒNG API VÀ MÔ HÌNH CSDL (ĐT-12)

**Người thực hiện:** V2 - Kiến trúc sư dữ liệu  
**Mục tiêu:** Rà soát tính nhất quán giữa dữ liệu API trả về (JSON Response) và các bảng trong MySQL.

| STT | Điểm cuối API (Endpoint) | Phương thức | Trường dữ liệu API (Response JSON) | Cột & Bảng tương ứng trong MySQL | Trạng thái đối chiếu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/api/v1/destinations` | GET | `id`, `ten`, `tinh_thanh`, `loai_hinh` | `diem_den(id, ten, tinh_thanh, loai_hinh)` | Khớp 100% |
| 2 | `/api/v1/destinations/{id}/stats` | GET | `tong_so_danh_gia`, `diem_trung_binh` | `v_thong_ke_diem_den(tong_so_danh_gia, diem_trung_binh)` | Khớp 100% |
| 3 | `/api/v1/reviews` | GET | `id`, `noi_dung`, `diem_so`, `ngay_dang` | `danh_gia(id, noi_dung, diem_so, ngay_dang)` | Khớp 100% |
| 4 | `/api/v1/reviews/aspects` | GET | `ten_khia_canh`, `sac_thai`, `do_tin_cay` | `khia_canh.ten_khia_canh`, `danh_gia_khia_canh(sac_thai, do_tin_cay)` | Khớp 100% |
| 5 | `/api/v1/alerts` | GET | `id`, `ngay_phat_hien`, `muc_do`, `mo_ta` | `canh_bao_danh_tieng(id, ngay_phat_hien, muc_do, mo_ta)` | Khớp 100% |
| 6 | `/api/v1/fake-reviews` | GET | `danh_gia_id`, `diem_nghi_ngo`, `ly_do` | `nghi_ngo_gia_mao(danh_gia_id, diem_nghi_ngo, ly_do)` | Khớp 100% |

**KẾT LUẬN RÀ SOÁT:**
- Không phát hiện trường dữ liệu nào trong API mà CSDL chưa có.
- CSDL 12 bảng hiện tại đáp ứng 100% truy vấn của hệ thống API v0.1.
