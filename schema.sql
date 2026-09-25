-- =============================================================================
-- HỌC PHẦN: CSE703073 - LẬP TRÌNH ỨNG DỤNG WEB TRONG DU LỊCH 2
-- ĐỀ TÀI: ĐT-12 - HỆ THỐNG PHÂN TÍCH Ý KIẾN DU KHÁCH VÀ GIÁM SÁT DANH TIẾNG ĐIỂM ĐẾN
-- BẢN QUYỀN THIẾT KẾ: NHÓM DỰ ÁN 5 THÀNH VIÊN (V2 - HOÀNG VIỆT ANH & V3 - NGUYỄN VIỆT DŨNG)
-- MÔ TẢ: KỊCH BẢN TẠO CẤU TRÚC CƠ SỞ DỮ LIỆU (SCHEMA.SQL) - 12 THỰC THỂ ĐẠT CHUẨN 3NF
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================================
-- 0. XÓA BẢNG NẾU TỒN TẠI (THỨ TỰ TỪ PHỤ THUỘC ĐẾN ĐỘC LẬP ĐỂ TRÁNH LỖI KHÓA NGOẠI)
-- =============================================================================
DROP TABLE IF EXISTS nghi_ngo_gia_mao;
DROP TABLE IF EXISTS canh_bao_danh_tieng;
DROP TABLE IF EXISTS danh_gia_chu_de;
DROP TABLE IF EXISTS danh_gia_khia_canh;
DROP TABLE IF EXISTS danh_gia;
DROP TABLE IF EXISTS mua_vu;
DROP TABLE IF EXISTS don_vi_cung_cap;
DROP TABLE IF EXISTS diem_den;
DROP TABLE IF EXISTS nguoi_dung_he_thong;
DROP TABLE IF EXISTS chu_de;
DROP TABLE IF EXISTS khia_canh;
DROP TABLE IF EXISTS nguon_du_lieu;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- 1. BẢNG NGUỒN DỮ LIỆU (nguon_du_lieu) - Bảng độc lập
-- Mô tả: Quản lý các nền tảng thu thập dữ liệu phản hồi (Google Maps, TripAdvisor...)
-- =============================================================================
CREATE TABLE nguon_du_lieu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_nguon VARCHAR(30) NOT NULL UNIQUE COMMENT 'Mã nhận diện: GOOGLE_MAPS, TRIPADVISOR, BOOKING, FACEBOOK, DIRECT',
    ten_nguon VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị nguồn dữ liệu',
    loai_nguon ENUM('ota', 'mang_xa_hoi', 'ban_do_so', 'bieu_mau_truc_tiep', 'khac') NOT NULL DEFAULT 'ota',
    trang_chu_url VARCHAR(255) NULL,
    mo_ta VARCHAR(255) NULL,
    trang_thai TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: Hoạt động, 0: Tạm ngừng thu thập',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh mục nguồn dữ liệu thu thập đánh giá';

-- =============================================================================
-- 2. BẢNG KHÍA CẠNH DỊCH VỤ (khia_canh) - Bảng độc lập
-- Mô tả: Danh mục khía cạnh dịch vụ du lịch (Aspects) phục vụ phân tích ABSA
-- Đặc thù du lịch: Gồm cả khía cạnh "sức tải/quá tải" để giám sát mức độ đông đúc
-- =============================================================================
CREATE TABLE khia_canh (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_khia_canh VARCHAR(50) NOT NULL UNIQUE COMMENT 'Mã khía cạnh: ve_sinh, gia_ca, thai_do_nv, canh_quan, an_ninh, qua_tai_dong_duc, am_thuc, tiep_can',
    ten_khia_canh VARCHAR(100) NOT NULL COMMENT 'Tên hiển thị tiếng Việt',
    tu_khoa_nhan_dien TEXT NULL COMMENT 'Tập từ điển/keyword nhận diện nhanh (Lexicon approach)',
    mo_ta TEXT NULL,
    thu_tu_hien_thi INT NOT NULL DEFAULT 0,
    trang_thai TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: Sử dụng, 0: Ẩn'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Từ điển khía cạnh dịch vụ du lịch';

-- =============================================================================
-- 3. BẢNG CHỦ ĐỀ NỔI BẬT (chu_de) - Bảng độc lập
-- Mô tả: Các cụm chủ đề phát sinh nổi bật từ thuật toán Topic Modeling (LDA/BERTopic)
-- =============================================================================
CREATE TABLE chu_de (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_chu_de VARCHAR(150) NOT NULL COMMENT 'Tên chủ đề tóm tắt (ví dụ: Chặt chém giá vé, Bãi biển sạch đẹp...)',
    tu_khoa_chinh TEXT NOT NULL COMMENT 'Danh sách từ khóa đại diện cho chủ đề (cách nhau bởi dấu phẩy)',
    ngay_phat_hien DATE NOT NULL COMMENT 'Ngày thuật toán trích xuất chủ đề',
    muc_do_quan_tam ENUM('thap', 'trung_binh', 'cao', 'nong') NOT NULL DEFAULT 'trung_binh',
    trang_thai ENUM('moi', 'dang_theo_doi', 'da_xu_ly') NOT NULL DEFAULT 'moi'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chủ đề dư luận nổi bật theo mô hình học máy';

-- =============================================================================
-- 4. BẢNG NGƯỜI DÙNG HỆ THỐNG (nguoi_dung_he_thong) - Bảng độc lập
-- Mô tả: Tài khoản phục vụ đăng nhập, phân quyền RBAC (Chương 4 / Mốc M1)
-- =============================================================================
CREATE TABLE nguoi_dung_he_thong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dang_nhap VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    mat_khau_hash VARCHAR(255) NOT NULL COMMENT 'Mật khẩu băm chuẩn bcrypt/Argon2 có muối',
    ho_ten VARCHAR(100) NOT NULL,
    so_dien_thoai VARCHAR(20) NULL,
    vai_tro ENUM('admin', 'quan_ly_diem_den', 'chuyen_vien_pt', 'du_khach') NOT NULL DEFAULT 'chuyen_vien_pt' COMMENT 'RBAC phục vụ kiểm thử phân quyền',
    trang_thai TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1: Hoạt động, 0: Bị khóa',
    lan_dang_nhap_cuoi DATETIME NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tài khoản người dùng và phân quyền hệ thống';

-- =============================================================================
-- 5. BẢNG ĐIỂM ĐẾN DU LỊCH (diem_den) - Bảng độc lập (có phi chuẩn hóa hợp lý)
-- Mô tả: Thông tin điểm đến, vị trí địa lý, loại hình du lịch
-- Phi chuẩn hóa: Lưu tong_luot_danh_gia và diem_danh_tieng_tb để tăng tốc truy vấn Dashboard
-- =============================================================================
CREATE TABLE diem_den (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ma_dinh_danh VARCHAR(50) NOT NULL UNIQUE COMMENT 'Mã nghiệp vụ: DD_PHUQUOC, DD_TRANGAN, DD_SAPA...',
    ten VARCHAR(150) NOT NULL COMMENT 'Tên điểm đến',
    tinh_thanh VARCHAR(100) NOT NULL COMMENT 'Tỉnh/Thành phố trực thuộc',
    loai_hinh VARCHAR(50) NOT NULL COMMENT 'Biển đảo, Di tích lịch sử, Sinh thái, Nghỉ dưỡng, Tâm linh...',
    vi_do DECIMAL(10,7) NULL COMMENT 'Tọa độ WGS84 Vĩ độ',
    kinh_do DECIMAL(10,7) NULL COMMENT 'Tọa độ WGS84 Kinh độ',
    mo_ta TEXT NULL,
    hinh_anh_url VARCHAR(255) NULL,
    tong_luot_danh_gia INT NOT NULL DEFAULT 0 COMMENT 'Phi chuẩn hóa: Cache tổng số review',
    diem_danh_tieng_tb DECIMAL(3,2) NOT NULL DEFAULT 0.00 COMMENT 'Phi chuẩn hóa: Chỉ số danh tiếng trung bình (1.00 - 5.00)',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh mục điểm đến du lịch và chỉ số danh tiếng tổng hợp';

-- =============================================================================
-- 6. BẢNG ĐƠN VỊ CUNG CẤP TẠI ĐIỂM ĐẾN (don_vi_cung_cap)
-- Mô tả: Cơ sở lưu trú, nhà hàng, đơn vị lữ hành hoạt động tại điểm đến
-- =============================================================================
CREATE TABLE don_vi_cung_cap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    diem_den_id INT NOT NULL,
    ma_don_vi VARCHAR(50) NOT NULL UNIQUE,
    ten_don_vi VARCHAR(150) NOT NULL,
    loai_dich_vu VARCHAR(50) NOT NULL COMMENT 'Khách sạn, Resort, Nhà hàng, Vận tải, Điểm tham quan cụ thể',
    dia_chi VARCHAR(255) NULL,
    so_dien_thoai VARCHAR(20) NULL,
    email VARCHAR(100) NULL,
    trang_thai TINYINT(1) NOT NULL DEFAULT 1,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_don_vi_diem_den FOREIGN KEY (diem_den_id) 
        REFERENCES diem_den(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Đơn vị dịch vụ trực thuộc điểm đến';

-- =============================================================================
-- 7. BẢNG MÙA VỤ DU LỊCH (mua_vu)
-- Mô tả: Giai đoạn mùa vụ theo điểm đến (Phủ đặc thù "Mùa vụ" trong du lịch)
-- =============================================================================
CREATE TABLE mua_vu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    diem_den_id INT NOT NULL,
    ten_mua VARCHAR(100) NOT NULL COMMENT 'Ví dụ: Mùa hoa tam giác mạch, Mùa cao điểm hè...',
    loai_mua ENUM('cao_diem', 'thap_diem', 'trung_binh', 'le_hoi') NOT NULL DEFAULT 'cao_diem',
    ngay_bat_dau DATE NOT NULL,
    ngay_ket_thuc DATE NOT NULL,
    mo_ta VARCHAR(255) NULL,
    CONSTRAINT fk_mua_vu_diem_den FOREIGN KEY (diem_den_id) 
        REFERENCES diem_den(id) ON DELETE CASCADE,
    CONSTRAINT chk_mua_vu_ngay CHECK (ngay_ket_thuc >= ngay_bat_dau)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giai đoạn mùa vụ phục vụ đối chiếu biến động danh tiếng';

-- =============================================================================
-- 8. BẢNG ĐÁNH GIÁ (danh_gia) - Bảng trung tâm của toàn bộ hệ thống
-- Mô tả: Dữ liệu văn bản đánh giá gốc từ du khách
-- Đặc thù: ngay_dang (phục vụ daily volume / tồn theo ngày), ngay_trai_nghiem (gắn giao dịch/chuyến đi)
-- =============================================================================
CREATE TABLE danh_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    diem_den_id INT NOT NULL,
    don_vi_id INT NULL,
    nguon_id INT NOT NULL,
    nguoi_dung_id INT NULL COMMENT 'Khóa ngoại tới tài khoản nếu do du khách trên web tự nhập',
    ma_danh_gia_goc VARCHAR(100) NULL COMMENT 'Mã ID từ nền tảng gốc để kiểm tra trùng lặp',
    tac_gia VARCHAR(100) NOT NULL DEFAULT 'Ẩn danh',
    tieu_de VARCHAR(255) NULL,
    noi_dung TEXT NOT NULL,
    diem_so TINYINT NOT NULL COMMENT 'Thang điểm đánh giá từ 1 đến 5 sao',
    ngay_dang DATE NOT NULL COMMENT 'Ngày đăng bài - căn cứ tính tồn theo ngày và phát hiện đột biến',
    ngay_trai_nghiem DATE NULL COMMENT 'Thời điểm chuyến đi thực tế - bản chất gắn giao dịch trải nghiệm',
    ngon_ngu VARCHAR(10) NOT NULL DEFAULT 'vi',
    luot_huu_ich INT NOT NULL DEFAULT 0,
    trang_thai_duyet ENUM('cho_duyet', 'da_duyet', 'tu_choi') NOT NULL DEFAULT 'da_duyet',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_danh_gia_diem_so CHECK (diem_so BETWEEN 1 AND 5),
    CONSTRAINT fk_danh_gia_diem_den FOREIGN KEY (diem_den_id) 
        REFERENCES diem_den(id) ON DELETE CASCADE,
    CONSTRAINT fk_danh_gia_don_vi FOREIGN KEY (don_vi_id) 
        REFERENCES don_vi_cung_cap(id) ON DELETE SET NULL,
    CONSTRAINT fk_danh_gia_nguon FOREIGN KEY (nguon_id) 
        REFERENCES nguon_du_lieu(id),
    CONSTRAINT fk_danh_gia_nguoi_dung FOREIGN KEY (nguoi_dung_id) 
        REFERENCES nguoi_dung_he_thong(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng dữ liệu trung tâm chứa các ý kiến đánh giá du khách';

-- =============================================================================
-- 9. BẢNG CHI TIẾT ĐÁNH GIÁ - KHÍA CẠNH (danh_gia_khia_canh)
-- Mô tả: Quan hệ nhiều-nhiều thực chất giữa đánh giá và khía cạnh dịch vụ
-- Lưu trữ kết quả mô hình AI ABSA: sắc thái ý kiến + độ tin cậy (Confidence Score)
-- =============================================================================
CREATE TABLE danh_gia_khia_canh (
    danh_gia_id INT NOT NULL,
    khia_canh_id INT NOT NULL,
    sac_thai ENUM('tich_cuc', 'tieu_cuc', 'trung_tinh') NOT NULL COMMENT 'Kết quả phân loại sắc thái',
    do_tin_cay DECIMAL(4,3) NOT NULL DEFAULT 1.000 COMMENT 'Mức độ tin cậy của mô hình AI: từ 0.000 đến 1.000 (không xem là tuyệt đối)',
    doan_trich_noi_dung VARCHAR(500) NULL COMMENT 'Bằng chứng trích xuất từ câu văn nhắc tới khía cạnh',
    phuong_phap ENUM('tu_dien', 'hoc_may', 'chuyen_gia_xac_nhan') NOT NULL DEFAULT 'hoc_may' COMMENT 'So sánh Lexicon vs Machine Learning',
    PRIMARY KEY (danh_gia_id, khia_canh_id),
    CONSTRAINT chk_do_tin_cay CHECK (do_tin_cay BETWEEN 0.000 AND 1.000),
    CONSTRAINT fk_dgkc_danh_gia FOREIGN KEY (danh_gia_id) 
        REFERENCES danh_gia(id) ON DELETE CASCADE,
    CONSTRAINT fk_dgkc_khia_canh FOREIGN KEY (khia_canh_id) 
        REFERENCES khia_canh(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng liên kết khía cạnh dịch vụ và sắc thái ABSA';

-- =============================================================================
-- 10. BẢNG CHI TIẾT ĐÁNH GIÁ - CHỦ ĐỀ (danh_gia_chu_de)
-- Mô tả: Quan hệ nhiều-nhiều giữa đánh giá và cụm chủ đề phát hiện được
-- =============================================================================
CREATE TABLE danh_gia_chu_de (
    danh_gia_id INT NOT NULL,
    chu_de_id INT NOT NULL,
    trong_so DECIMAL(4,3) NOT NULL DEFAULT 1.000 COMMENT 'Mức độ phù hợp của bài đánh giá đối với chủ đề (0.000 - 1.000)',
    PRIMARY KEY (danh_gia_id, chu_de_id),
    CONSTRAINT chk_chu_de_trong_so CHECK (trong_so BETWEEN 0.000 AND 1.000),
    CONSTRAINT fk_dgcd_danh_gia FOREIGN KEY (danh_gia_id) 
        REFERENCES danh_gia(id) ON DELETE CASCADE,
    CONSTRAINT fk_dgcd_chu_de FOREIGN KEY (chu_de_id) 
        REFERENCES chu_de(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng liên kết đánh giá và chủ đề dư luận';

-- =============================================================================
-- 11. BẢNG CẢNH BÁO DANH TIẾNG (canh_bao_danh_tieng)
-- Mô tả: Cảnh báo tự động phát hiện sụt giảm điểm danh tiếng hoặc bùng phát ý kiến tiêu cực
-- Phủ đặc thù: "Biến động theo thời gian" và "Phát hiện đột biến"
-- =============================================================================
CREATE TABLE canh_bao_danh_tieng (
    id INT AUTO_INCREMENT PRIMARY KEY,
    diem_den_id INT NOT NULL,
    khia_canh_id INT NULL COMMENT 'Gắn với khía cạnh cụ thể gây tụt hạng nếu xác định được',
    ngay_phat_hien DATE NOT NULL,
    muc_do ENUM('thap', 'trung_binh', 'cao', 'nghiem_trong') NOT NULL DEFAULT 'trung_binh',
    tieu_de VARCHAR(200) NOT NULL COMMENT 'Tiêu đề cảnh báo (ví dụ: Tỷ lệ phàn nàn về Vệ sinh tăng đột biến)',
    mo_ta TEXT NOT NULL COMMENT 'Chi tiết số liệu đối soát với giai đoạn trước',
    diem_suy_giam DECIMAL(5,2) NULL COMMENT 'Mức độ suy giảm danh tiếng theo % hoặc điểm số',
    trang_thai ENUM('chua_xu_ly', 'dang_xu_ly', 'da_khac_phuc', 'bo_qua') NOT NULL DEFAULT 'chua_xu_ly',
    nguoi_xu_ly_id INT NULL COMMENT 'Người dùng tiếp nhận xử lý cảnh báo',
    ghi_chu_khac_phuc TEXT NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_canh_bao_diem_den FOREIGN KEY (diem_den_id) 
        REFERENCES diem_den(id) ON DELETE CASCADE,
    CONSTRAINT fk_canh_bao_khia_canh FOREIGN KEY (khia_canh_id) 
        REFERENCES khia_canh(id) ON DELETE SET NULL,
    CONSTRAINT fk_canh_bao_nguoi_xu_ly FOREIGN KEY (nguoi_xu_ly_id) 
        REFERENCES nguoi_dung_he_thong(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Cảnh báo biến động tiêu cực và suy giảm danh tiếng điểm đến';

-- =============================================================================
-- 12. BẢNG PHÁT HIỆN ĐÁNH GIÁ NGHI NGỜ GIẢ MẠO (nghi_ngo_gia_mao)
-- Mô tả: Bảng phục vụ Thách thức nâng cao (Fake / Spam Review Detection)
-- =============================================================================
CREATE TABLE nghi_ngo_gia_mao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    danh_gia_id INT NOT NULL UNIQUE COMMENT 'Quan hệ 1-1 với bài đánh giá',
    diem_nghi_ngo DECIMAL(4,3) NOT NULL COMMENT 'Điểm bất thường do mô hình tính toán (0.000: Bình thường - 1.000: Giả mạo cao)',
    ly_do_nghi_ngo VARCHAR(255) NOT NULL COMMENT 'Quy tắc vi phạm: Trùng lặp nội dung, Tần suất IP bất thường, Phân bố điểm số cực đoan...',
    thuat_toan_phat_hien VARCHAR(100) NOT NULL DEFAULT 'rule_and_similarity',
    trang_thai_xac_minh ENUM('cho_kiem_tra', 'xac_nhan_that', 'xac_nhan_gia_mao') NOT NULL DEFAULT 'cho_kiem_tra',
    ngay_quet DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_diem_nghi_ngo CHECK (diem_nghi_ngo BETWEEN 0.000 AND 1.000),
    CONSTRAINT fk_gia_mao_danh_gia FOREIGN KEY (danh_gia_id) 
        REFERENCES danh_gia(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Theo dõi đánh giá có dấu hiệu gian lận phục vụ thách thức nâng cao';

-- =============================================================================
-- 13. LẬP CHỈ MỤC (INDEXES) TỐI ƯU HÓA HIỆU NĂNG TRUY VẤN
-- Phục vụ phần đo kiểm trước/sau chỉ mục của Dũng (V3) trong Buổi 3
-- =============================================================================
-- Chỉ mục cho câu truy vấn Dashboard: Lọc theo điểm đến và khoảng thời gian
CREATE INDEX idx_danh_gia_diem_den_ngay ON danh_gia (diem_den_id, ngay_dang);

-- Chỉ mục cho câu truy vấn tìm kiếm theo nguồn và ngày đăng
CREATE INDEX idx_danh_gia_nguon_ngay ON danh_gia (nguon_id, ngay_dang);

-- Chỉ mục cho câu truy vấn phân tích sắc thái theo khía cạnh (Query trọng tâm của ĐT-12)
CREATE INDEX idx_dgkc_khia_canh_sac_thai ON danh_gia_khia_canh (khia_canh_id, sac_thai);

-- Chỉ mục cho cảnh báo theo điểm đến và ngày phát hiện
CREATE INDEX idx_canh_bao_diem_den_ngay ON canh_bao_danh_tieng (diem_den_id, ngay_phat_hien);

-- Chỉ mục cho tra cứu mùa vụ
CREATE INDEX idx_mua_vu_khoang_ngay ON mua_vu (diem_den_id, ngay_bat_dau, ngay_ket_thuc);

-- Bổ sung cột người phụ trách cho bảng diem_den 
ALTER TABLE diem_den
  ADD COLUMN nguoi_phu_trach_id INT NULL
    COMMENT 'Người dùng vai trò quan_ly_diem_den được gán phụ trách điểm đến này',
  ADD CONSTRAINT fk_diem_den_nguoi_phu_trach FOREIGN KEY (nguoi_phu_trach_id)
    REFERENCES nguoi_dung_he_thong(id) ON DELETE SET NULL;

CREATE INDEX idx_diem_den_nguoi_phu_trach ON diem_den (nguoi_phu_trach_id);

-- Bổ sung 2 cột lưu kết quả phân tích sắc thái tổng thể (được F1 cập nhật ngược)
ALTER TABLE danh_gia
  ADD COLUMN sac_thai_tong ENUM('tich_cuc','tieu_cuc','trung_tinh') NULL
    COMMENT 'Sắc thái tổng thể của đánh giá, do mô-đun Python tổng hợp từ các khía cạnh',
  ADD COLUMN do_tin_cay_mo_hinh DECIMAL(4,3) NULL
    COMMENT 'Độ tin cậy trung bình của mô hình, 0.000-1.000';

CREATE INDEX idx_danh_gia_sac_thai ON danh_gia (diem_den_id, sac_thai_tong);

ALTER TABLE nguoi_dung_he_thong
  MODIFY COLUMN vai_tro ENUM('admin','quan_ly_diem_den','chuyen_vien_pt','du_khach')
  NOT NULL DEFAULT 'du_khach';

-- =============================================================================
-- KẾT THÚC KỊCH BẢN TẠO CẤU TRÚC (SCHEMA.SQL HOÀN CHỈNH CHO ĐT-12)
-- =============================================================================


-- =======================================================
-- BỔ SUNG BỔ DỤNG VÀO BUỔI 7 (MỐC M3): HYBRID & KHỦNG HOẢNG
-- =======================================================

-- 1. Bổ sung các cột xác suất và phiên bản mô hình cho bảng danh_gia
ALTER TABLE danh_gia
  ADD COLUMN xac_suat_tich_cuc   DECIMAL(5,4) NULL,
  ADD COLUMN xac_suat_trung_tinh DECIMAL(5,4) NULL,
  ADD COLUMN xac_suat_tieu_cuc   DECIMAL(5,4) NULL,
  ADD COLUMN phuong_phap_sac_thai VARCHAR(20) NULL COMMENT 'tu_dien | hoc_may | phobert',
  ADD COLUMN phien_ban_mo_hinh   VARCHAR(40) NULL,
  ADD CONSTRAINT chk_xac_suat CHECK (
    (xac_suat_tich_cuc   IS NULL OR xac_suat_tich_cuc   BETWEEN 0 AND 1) AND
    (xac_suat_trung_tinh IS NULL OR xac_suat_trung_tinh BETWEEN 0 AND 1) AND
    (xac_suat_tieu_cuc   IS NULL OR xac_suat_tieu_cuc   BETWEEN 0 AND 1));

-- 2. Tạo bảng từ khóa khủng hoảng
CREATE TABLE tu_khoa_khung_hoang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tu_khoa VARCHAR(80) NOT NULL UNIQUE,
  cap_do ENUM('nang','nhe') NOT NULL,
  nhom ENUM('an_toan','phap_ly','danh_tieng') NOT NULL,
  trang_thai ENUM('dang_dung','tam_dung') NOT NULL DEFAULT 'dang_dung',
  ty_le_dung_do_duoc DECIMAL(4,3) NULL COMMENT 'Ty le gan co dung khi nhom kiem tra tay',
  so_mau_kiem_tra SMALLINT UNSIGNED NULL,
  ghi_chu VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tạo bảng liên kết đánh giá và từ khóa khủng hoảng
CREATE TABLE danh_gia_khung_hoang (
  danh_gia_id INT NOT NULL,
  tu_khoa_id INT NOT NULL,
  doan_trich VARCHAR(250) NOT NULL,
  PRIMARY KEY (danh_gia_id, tu_khoa_id),
  FOREIGN KEY (danh_gia_id) REFERENCES danh_gia(id) ON DELETE CASCADE,
  FOREIGN KEY (tu_khoa_id) REFERENCES tu_khoa_khung_hoang(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tạo bảng kết quả định tuyến 4 trạng thái
CREATE TABLE ket_qua_dinh_tuyen (
  diem_den_id INT NOT NULL PRIMARY KEY,
  trang_thai ENUM('chua_du_du_lieu','diem_sang','binh_thuong','canh_bao') NOT NULL,
  so_review INT UNSIGNED NOT NULL,
  ty_le_tich_cuc DECIMAL(5,4) NOT NULL,
  ty_le_tieu_cuc DECIMAL(5,4) NOT NULL,
  can_duoi_wilson DECIMAL(5,4) NOT NULL,
  so_review_co_nang SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  ly_do VARCHAR(500) NOT NULL,
  ngay_neo DATE NULL COMMENT 'Ngay review moi nhat, moc tinh cua so',
  ngay_tinh DATETIME NOT NULL,
  FOREIGN KEY (diem_den_id) REFERENCES diem_den(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Cho phép khia_canh_id nhận NULL trong bảng cảnh báo
ALTER TABLE canh_bao_danh_tieng MODIFY khia_canh_id INT NULL;