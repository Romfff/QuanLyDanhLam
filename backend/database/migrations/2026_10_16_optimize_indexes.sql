-- Toi uu hoa chi muc cho cac cau truy van tim kiem va loc diem den
CREATE INDEX idx_diem_den_tinh_thanh ON diem_den(tinh_thanh);
CREATE INDEX idx_diem_den_danh_tieng ON diem_den(diem_danh_tieng_trung_binh);
CREATE INDEX idx_danh_gia_diem_den_id ON danh_gia(diem_den_id);
CREATE INDEX idx_danh_gia_ngay_tao ON danh_gia(ngay_danh_gia);
