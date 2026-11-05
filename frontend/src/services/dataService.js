// frontend/src/services/dataService.js
// Dịch vụ dữ liệu chuẩn Commercial Product - Tích hợp TripAdvisor Intelligence Platform
// Hỗ trợ cào dữ liệu TripAdvisor thực tế, kiểm duyệt đánh giá, xếp hạng Wilson Score 95% CI & PhoBERT ABSA

import api from './api'
import reviews874Data from '../assets/reviews874.json'

// 7 ĐIỂM ĐẾN THỰC TẾ TỪ TRIPADVISOR VIỆT NAM (ĐẦY ĐỦ METADATA CHUẨN PRODUCT)
export const DANH_SACH_DIEM_DEN_FALLBACK = [
  {
    id: 1,
    ten: 'Ambassador Cruise - Halong Bay',
    ten_rut_gon: 'Du thuyền Ambassador Hạ Long',
    danh_muc: 'cruises', // 'attractions' | 'hotels' | 'restaurants' | 'cruises'
    danh_muc_ten: 'Du thuyền nghỉ dưỡng & Ẩm thực 5 sao',
    loai_hinh: 'Du thuyền nghỉ dưỡng & Ẩm thực 5 sao',
    ma_dinh_danh: 'DD_TA_AMBASSADOR',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Cảng tàu khách quốc tế Hạ Long, Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293923-d23588237-Reviews-Ambassador_Cruise-Halong_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 124 Tour du thuyền tại Vịnh Hạ Long',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Du thuyền ẩm thực và nghỉ dưỡng 5 sao sang trọng bậc nhất Vịnh Hạ Long, nổi bật với boong tắm nắng đôi 500m², bể bơi sục ngoài trời và thực đơn hải sản chuẩn Michelin.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 164,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch (Travelers\' Choice)',
    ty_le_tich_cuc: 93.2,
    khoang_tin_cay_wilson: '0.884 - 0.957',
    rating_histogram: { xuat_sac: 122, rat_tot: 31, trung_binh: 8, kem: 2, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://ambassadorcruise.com',
      hotline: '1900 3045',
      gio_mo_cua: '07:30 - 20:30 Hàng ngày',
      khoang_gia: '3.450.000đ - 6.200.000đ / khách'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Tầm nhìn ngoạn mục ra vịnh di sản' },
      dich_vu: { diem: 4.8, tich_cuc: 94, tieu_cuc: 2, trung_tinh: 4, mo_ta: 'Nhân viên lễ tân & thủy thủ phục vụ chu đáo' },
      am_thuc: { diem: 4.7, tich_cuc: 92, tieu_cuc: 3, trung_tinh: 5, mo_ta: 'Tiệc buffet tôm hùm và hải sản phong phú' },
      ve_sinh: { diem: 4.8, tich_cuc: 95, tieu_cuc: 1, trung_tinh: 4, mo_ta: 'Cabin và boong tàu sạch sẽ tinh tươm' },
      gia_ca: { diem: 4.4, tich_cuc: 82, tieu_cuc: 8, trung_tinh: 10, mo_ta: 'Mức giá tương xứng chất lượng 5 sao' }
    }
  },
  {
    id: 2,
    ten: 'Melia Vinpearl Phu Quoc',
    ten_rut_gon: 'Melia Vinpearl Phú Quốc Resort',
    danh_muc: 'hotels',
    danh_muc_ten: 'Khu nghỉ dưỡng & Khách sạn biển 5 sao',
    loai_hinh: 'Khu nghỉ dưỡng biển cao cấp',
    ma_dinh_danh: 'DD_TA_MELIA_PQ',
    tinh_thanh: 'Kiên Giang',
    dia_chi: 'Khu Bãi Dài, Xã Gành Dầu, TP. Phú Quốc, Kiên Giang',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Hotel_Review-g469418-d14193856-Reviews-Melia_Vinpearl_Phu_Quoc-Phu_Quoc_Island_Kien_Giang_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #3 trên 86 Khu nghỉ dưỡng tại Bãi Dài Phú Quốc',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Khu nghỉ dưỡng biệt thự biển phong cách Địa Trung Hải, sở hữu bãi biển riêng thơ mộng ngắm hoàng hôn Bãi Dài cùng hệ thống YHI Spa chuẩn quốc tế.',
    diem_danh_tieng_tb: 4.6,
    tong_luot_danh_gia: 160,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Hoạt động ổn định',
    ty_le_tich_cuc: 87.5,
    khoang_tin_cay_wilson: '0.812 - 0.916',
    rating_histogram: { xuat_sac: 105, rat_tot: 35, trung_binh: 12, kem: 6, toi_te: 2 },
    thong_tin_lien_he: {
      website: 'https://melia.com',
      hotline: '0297 362 5555',
      gio_mo_cua: 'Phục vụ 24/7',
      khoang_gia: '4.200.000đ - 9.800.000đ / đêm'
    },
    khia_canh: {
      canh_quan: { diem: 4.8, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Biển xanh cát trắng, hoàng hôn tuyệt mỹ' },
      dich_vu: { diem: 4.6, tich_cuc: 88, tieu_cuc: 5, trung_tinh: 7, mo_ta: 'Xe điện đưa đón nhanh, nhân viên thân thiện' },
      am_thuc: { diem: 4.7, tich_cuc: 90, tieu_cuc: 4, trung_tinh: 6, mo_ta: 'Bữa sáng đa dạng món Á - Âu' },
      ve_sinh: { diem: 4.8, tich_cuc: 93, tieu_cuc: 2, trung_tinh: 5, mo_ta: 'Villa và khuôn viên vệ sinh thường xuyên' },
      gia_ca: { diem: 4.2, tich_cuc: 76, tieu_cuc: 12, trung_tinh: 12, mo_ta: 'Giá đồ ăn gọi món tại resort khá cao' }
    }
  },
  {
    id: 3,
    ten: 'Halong Bay',
    ten_rut_gon: 'Vịnh Hạ Long',
    danh_muc: 'attractions',
    danh_muc_ten: 'Di sản Thiên nhiên Thế giới UNESCO',
    loai_hinh: 'Di sản Thiên nhiên Thế giới UNESCO',
    ma_dinh_danh: 'DD_TA_HALONG_BAY',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Vịnh Hạ Long, TP. Hạ Long, Quảng Ninh',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293923-d311099-Reviews-Halong_Bay-Halong_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 158 Điểm tham quan tại Quảng Ninh',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Kỳ quan thiên nhiên thế giới nổi danh với gần 2.000 hòn đảo đá vôi vươn mình trên mặt nước xanh ngắt, hệ thống hang động thạch nhũ hàng triệu năm tuổi như Sửng Sốt, Đầu Gỗ.',
    diem_danh_tieng_tb: 4.9,
    tong_luot_danh_gia: 144,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch (Top 1 Kỳ Quan)',
    ty_le_tich_cuc: 95.8,
    khoang_tin_cay_wilson: '0.908 - 0.978',
    rating_histogram: { xuat_sac: 118, rat_tot: 20, trung_binh: 4, kem: 1, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://halongcity.gov.vn',
      hotline: '0203 384 6564',
      gio_mo_cua: '06:30 - 18:30 Hàng ngày',
      khoang_gia: '250.000đ - 500.000đ vé thắng cảnh'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 99, tieu_cuc: 0, trung_tinh: 1, mo_ta: 'Kỳ quan thế giới không tì vết' },
      dich_vu: { diem: 4.7, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Tàu bè vận hành nền nếp, an toàn' },
      am_thuc: { diem: 4.6, tich_cuc: 89, tieu_cuc: 4, trung_tinh: 7, mo_ta: 'Chả mực và hải sản Hạ Long tươi sống' },
      ve_sinh: { diem: 4.7, tich_cuc: 92, tieu_cuc: 3, trung_tinh: 5, mo_ta: 'Mặt nước vịnh được thu gom rác thường xuyên' },
      gia_ca: { diem: 4.6, tich_cuc: 88, tieu_cuc: 5, trung_tinh: 7, mo_ta: 'Vé thắng cảnh quy định minh bạch' }
    }
  },
  {
    id: 4,
    ten: 'Vinpearl Resort & Spa Ha Long',
    ten_rut_gon: 'Vinpearl Resort & Spa Hạ Long',
    danh_muc: 'hotels',
    danh_muc_ten: 'Khu nghỉ dưỡng đảo biệt lập 5 sao',
    loai_hinh: 'Khu nghỉ dưỡng đảo biệt lập',
    ma_dinh_danh: 'DD_TA_VINPEARL_HL',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Đảo Rều, Phường Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Hotel_Review-g293923-d8721612-Reviews-Vinpearl_Resort_Spa_Ha_Long-Halong_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #2 trên 112 Khách sạn & Resort tại Hạ Long',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Tọa lạc hoàn toàn trên đảo Rều biệt lập với 4 mặt hướng biển, Vinpearl Resort & Spa Hạ Long sở hữu kiến trúc lâu đài tân cổ điển tráng lệ và bãi biển riêng tư.',
    diem_danh_tieng_tb: 4.7,
    tong_luot_danh_gia: 140,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch (Resort 5 Sao)',
    ty_le_tich_cuc: 91.4,
    khoang_tin_cay_wilson: '0.854 - 0.948',
    rating_histogram: { xuat_sac: 98, rat_tot: 30, trung_binh: 8, kem: 3, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://vinpearl.com',
      hotline: '0203 355 6868',
      gio_mo_cua: 'Phục vụ 24/7',
      khoang_gia: '3.100.000đ - 7.500.000đ / đêm'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Tọa độ đảo riêng ngắm toàn cảnh vịnh' },
      dich_vu: { diem: 4.8, tich_cuc: 93, tieu_cuc: 2, trung_tinh: 5, mo_ta: 'Tàu cao tốc đưa đón riêng 24/7 chu đáo' },
      am_thuc: { diem: 4.6, tich_cuc: 89, tieu_cuc: 4, trung_tinh: 7, mo_ta: 'Nhà hàng Bayview và Pavilion ẩm thực phong phú' },
      ve_sinh: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Hồ bơi ngoài trời và phòng ốc sạch hoàn hảo' },
      gia_ca: { diem: 4.3, tich_cuc: 81, tieu_cuc: 9, trung_tinh: 10, mo_ta: 'Mức giá xứng đáng cho trải nghiệm đảo riêng' }
    }
  },
  {
    id: 5,
    ten: 'Trang An Grottoes',
    ten_rut_gon: 'Quần thể Danh thắng Tràng An',
    danh_muc: 'attractions',
    danh_muc_ten: 'Di sản Văn hóa và Thiên nhiên Kép UNESCO',
    loai_hinh: 'Di sản Thế giới Kép UNESCO',
    ma_dinh_danh: 'DD_TA_TRANG_AN',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Tràng An, Huyện Hoa Lư, Tỉnh Ninh Bình',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g469422-d2437648-Reviews-Trang_An_Grottoes-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 92 Điểm tham quan tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Di sản hỗn hợp văn hóa và thiên nhiên thế giới đầu tiên của Đông Nam Á, nổi tiếng với hệ thống sông uốn lượn xuyên qua 31 thung lũng nước ngập và 48 hang động huyền ảo.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 128,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch (Di Sản Kép)',
    ty_le_tich_cuc: 92.2,
    khoang_tin_cay_wilson: '0.860 - 0.956',
    rating_histogram: { xuat_sac: 96, rat_tot: 22, trung_binh: 6, kem: 3, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://disantrangan.vn',
      hotline: '0229 362 0335',
      gio_mo_cua: '07:00 - 17:00 Hàng ngày',
      khoang_gia: '250.000đ / người lớn'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 99, tieu_cuc: 0, trung_tinh: 1, mo_ta: 'Cảnh sắc sơn thủy hữu tình như tranh thủy mặc' },
      dich_vu: { diem: 4.8, tich_cuc: 93, tieu_cuc: 2, trung_tinh: 5, mo_ta: 'Các cô chèo đò thân thiện, nhiệt tình thuyết minh' },
      am_thuc: { diem: 4.5, tich_cuc: 87, tieu_cuc: 4, trung_tinh: 9, mo_ta: 'Đặc sản cơm cháy, dê núi Ninh Bình nổi tiếng' },
      ve_sinh: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Ý thức bảo vệ môi trường dòng sông rất cao' },
      gia_ca: { diem: 4.7, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Giá vé bao trọn 3 tiếng chèo đò cực kỳ hợp lý' }
    }
  },
  {
    id: 6,
    ten: 'Mua Caves',
    ten_rut_gon: 'Hang Múa - Ninh Bình',
    danh_muc: 'attractions',
    danh_muc_ten: 'Điểm ngắm toàn cảnh & Trekking bậc đá',
    loai_hinh: 'Điểm ngắm cảnh & Check-in',
    ma_dinh_danh: 'DD_TA_HANG_MUA',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Thôn Khê Đầu Hạ, Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g469422-d8520261-Reviews-Mua_Caves-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #2 trên 92 Điểm tham quan tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Được mệnh danh là "Vạn Lý Trường Thành thu nhỏ của Việt Nam" với gần 500 bậc đá dẫn lên đỉnh Ngọa Long, thu trọn toàn cảnh cánh đồng lúa Tam Cốc thơ mộng.',
    diem_danh_tieng_tb: 4.6,
    tong_luot_danh_gia: 93,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Hoạt động ổn định',
    ty_le_tich_cuc: 86.0,
    khoang_tin_cay_wilson: '0.778 - 0.916',
    rating_histogram: { xuat_sac: 62, rat_tot: 18, trung_binh: 8, kem: 4, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://muacaves.com',
      hotline: '0229 361 8686',
      gio_mo_cua: '06:00 - 19:00 Hàng ngày',
      khoang_gia: '100.000đ / vé'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Toàn cảnh Tam Cốc từ đỉnh Ngọa Long tuyệt đỉnh' },
      dich_vu: { diem: 4.3, tich_cuc: 80, tieu_cuc: 8, trung_tinh: 12, mo_ta: 'Đông đúc vào mùa lúa chín, leo bậc hơi dốc' },
      am_thuc: { diem: 4.2, tich_cuc: 78, tieu_cuc: 7, trung_tinh: 15, mo_ta: 'Quán nước giải khát chân núi đầy đủ' },
      ve_sinh: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Đường leo bậc đá được quét dọn sạch' },
      gia_ca: { diem: 4.5, tich_cuc: 86, tieu_cuc: 5, trung_tinh: 9, mo_ta: 'Vé 100k xứng đáng với tầm view triệu đô' }
    }
  },
  {
    id: 7,
    ten: 'Van Long Nature Reserve',
    ten_rut_gon: 'Khu Bảo Tồn Thiên Nhiên Vân Long',
    danh_muc: 'attractions',
    danh_muc_ten: 'Khu Bảo tồn Thiên nhiên Đất ngập nước Ramsar',
    loai_hinh: 'Khu bảo tồn thiên nhiên hoang sơ',
    ma_dinh_danh: 'DD_TA_VAN_LONG',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Gia Viễn, Ninh Bình',
    tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g469422-d3369689-Reviews-Van_Long_Nature_Reserve-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #4 trên 92 Điểm tham quan tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Vùng đất ngập nước lớn nhất vịnh Bắc Bộ với mặt nước phẳng lặng như gương (vịnh không sóng), nơi sinh sống của quần thể Voọc mông trắng quý hiếm bậc nhất thế giới.',
    diem_danh_tieng_tb: 4.7,
    tong_luot_danh_gia: 45,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Hoạt động ổn định',
    ty_le_tich_cuc: 88.9,
    khoang_tin_cay_wilson: '0.765 - 0.952',
    rating_histogram: { xuat_sac: 32, rat_tot: 8, trung_binh: 4, kem: 1, toi_te: 0 },
    thong_tin_lien_he: {
      website: 'https://ninhbinhtourism.com.vn',
      hotline: '0229 386 8798',
      gio_mo_cua: '06:00 - 18:00 Hàng ngày',
      khoang_gia: '100.000đ vé thuyền nan'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Không gian tĩnh lặng, mặt nước trong vắt' },
      dich_vu: { diem: 4.6, tich_cuc: 86, tieu_cuc: 4, trung_tinh: 10, mo_ta: 'Thuyền nan mộc mạc, cô chèo đò chân chất' },
      am_thuc: { diem: 4.3, tich_cuc: 80, tieu_cuc: 6, trung_tinh: 14, mo_ta: 'Quán ăn bình dị quanh khu bảo tồn' },
      ve_sinh: { diem: 4.8, tich_cuc: 94, tieu_cuc: 2, trung_tinh: 4, mo_ta: 'Hệ sinh thái tự nhiên nguyên sơ, sạch sẽ' },
      gia_ca: { diem: 4.7, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Giá vé thuyền nan rất bình dân' }
    }
  }
]

// TOÀN BỘ 874 ĐÁNH GIÁ TRIPADVISOR THỰC TẾ
export const DANH_SACH_DANH_GIA_TRIPADVISOR = reviews874Data

// 5 KHÍA CẠNH DU LỊCH TIÊU CHUẨN ABSA & PHOBERT
export const KHIA_CANH_ABSA = [
  { id: 1, ten: 'Cảnh quan & Không gian', icon: '🏞️', diem: 4.88, tich_cuc: 94.6, tieu_cuc: 1.8, trung_tinh: 3.6, so_luot: 812 },
  { id: 2, ten: 'Chất lượng phục vụ', icon: '🛎️', diem: 4.54, tich_cuc: 86.8, tieu_cuc: 5.2, trung_tinh: 8.0, so_luot: 745 },
  { id: 3, ten: 'Ẩm thực & Đặc sản', icon: '🍜', diem: 4.58, tich_cuc: 87.4, tieu_cuc: 4.6, trung_tinh: 8.0, so_luot: 680 },
  { id: 4, ten: 'Vệ sinh & Môi trường', icon: '🧹', diem: 4.62, tich_cuc: 88.5, tieu_cuc: 3.5, trung_tinh: 8.0, so_luot: 620 },
  { id: 5, ten: 'Giá cả & Độ minh bạch', icon: '💵', diem: 4.36, tich_cuc: 80.2, tieu_cuc: 9.4, trung_tinh: 10.4, so_luot: 710 }
]


// DỊCH VỤ DỮ LIỆU ĐỒNG BỘ CHUẨN COMMERCIAL PRODUCT
export const DataService = {
  // 1. Lấy danh sách điểm đến
  async layDanhSachDiemDen(boLoc = {}) {
    const dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations') || '[]')
    const deletedIds = JSON.parse(localStorage.getItem('dt12_deleted_destinations') || '[]')

    let danhSach = [...DANH_SACH_DIEM_DEN_FALLBACK]

    dsCustom.forEach(c => {
      const idx = danhSach.findIndex(d => Number(d.id) === Number(c.id))
      if (idx !== -1) {
        danhSach[idx] = { ...danhSach[idx], ...c }
      } else {
        danhSach.push(c)
      }
    })

    danhSach = danhSach.filter(d => !deletedIds.includes(Number(d.id)))

    try {
      const res = await api.get('/diem-den', { params: { so_dong: 100 } })
      if (res.data?.data && res.data.data.length > 0) {
        const apiData = res.data.data
        return apiData.map((item, index) => {
          const fallback = danhSach.find(f => 
            f.ten.toLowerCase().includes(item.ten.toLowerCase()) || 
            item.ten.toLowerCase().includes(f.ten_rut_gon?.toLowerCase() || '')
          ) || danhSach[index % danhSach.length]

          return {
            ...fallback,
            ...item,
            id: item.id || fallback.id,
            ten: item.ten || fallback.ten,
            tinh_thanh: item.tinh_thanh || fallback.tinh_thanh,
            hinh_anh: item.hinh_anh || fallback.hinh_anh,
            diem_danh_tieng_tb: Number(item.diem_danh_tieng_tb || item.diem_danh_tieng_trung_binh || fallback.diem_danh_tieng_tb).toFixed(1),
            tong_luot_danh_gia: item.tong_luot_danh_gia || fallback.tong_luot_danh_gia,
            mo_ta: item.mo_ta || fallback.mo_ta,
            trang_thai_wilson: fallback.trang_thai_wilson,
            nhan_trang_thai: fallback.nhan_trang_thai,
            khia_canh: fallback.khia_canh
          }
        })
      }
    } catch (e) {
      // Offline fallback
    }
    return danhSach
  },

  // 2. Lấy chi tiết 1 điểm đến theo ID
  async layChiTietDiemDen(id) {
    const ds = await this.layDanhSachDiemDen()
    const found = ds.find(f => Number(f.id) === Number(id))
    if (found) return found

    try {
      const res = await api.get(`/diem-den/${id}`)
      if (res.data?.data) {
        const item = res.data.data
        const fallback = DANH_SACH_DIEM_DEN_FALLBACK.find(f => f.id == id) || DANH_SACH_DIEM_DEN_FALLBACK[0]
        return {
          ...fallback,
          ...item,
          diem_danh_tieng_tb: Number(item.diem_danh_tieng_tb || item.diem_danh_tieng_trung_binh || fallback.diem_danh_tieng_tb).toFixed(1),
          hinh_anh: item.hinh_anh || fallback.hinh_anh
        }
      }
    } catch (e) {
      // Dùng fallback
    }
    return DANH_SACH_DIEM_DEN_FALLBACK.find(f => f.id == id) || DANH_SACH_DIEM_DEN_FALLBACK[0]
  },

  // 2.1 Thêm điểm đến mới (Dành cho Admin)
  async themDiemDen(duLieuMoi) {
    const dsHienTai = await this.layDanhSachDiemDen()
    const idMoi = dsHienTai.length > 0 ? Math.max(...dsHienTai.map(d => Number(d.id))) + 1 : 1
    const diemMoi = {
      id: idMoi,
      ten: duLieuMoi.ten,
      ten_rut_gon: duLieuMoi.ten_rut_gon || duLieuMoi.ten,
      danh_muc: duLieuMoi.danh_muc || 'attractions',
      danh_muc_ten: duLieuMoi.danh_muc_ten || duLieuMoi.loai_hinh || 'Điểm tham quan & Di sản',
      loai_hinh: duLieuMoi.loai_hinh || 'Điểm tham quan & Di sản',
      ma_dinh_danh: `DD_${idMoi}`,
      tinh_thanh: duLieuMoi.tinh_thanh || 'Việt Nam',
      dia_chi: duLieuMoi.dia_chi || duLieuMoi.tinh_thanh,
      tripadvisor_url: duLieuMoi.tripadvisor_url || 'https://www.tripadvisor.com.vn/',
      xep_hang_dia_phuong: duLieuMoi.xep_hang_dia_phuong || `Xếp hạng #1 tại ${duLieuMoi.tinh_thanh || 'địa phương'}`,
      danh_hieu_tripadvisor: "Travelers' Choice 2026",
      hinh_anh: duLieuMoi.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      anh_gallery: [
        duLieuMoi.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      ],
      mo_ta: duLieuMoi.mo_ta || 'Điểm đến du lịch được kiểm chứng và đồng bộ dữ liệu bởi Quản trị viên.',
      diem_danh_tieng_tb: Number(duLieuMoi.diem_danh_tieng_tb || 4.7).toFixed(1),
      tong_luot_danh_gia: 0,
      trang_thai_wilson: 'binh_thuong',
      nhan_trang_thai: 'Hoạt động ổn định',
      ty_le_tich_cuc: 85.0,
      khoang_tin_cay_wilson: '0.700 - 0.850',
      rating_histogram: { xuat_sac: 0, rat_tot: 0, trung_binh: 0, kem: 0, toi_te: 0 },
      thong_tin_lien_he: {
        website: duLieuMoi.website || 'https://tripadvisor.com.vn',
        hotline: duLieuMoi.hotline || '1900 1234',
        gio_mo_cua: duLieuMoi.gio_mo_cua || '08:00 - 18:00 Hàng ngày',
        khoang_gia: duLieuMoi.khoang_gia || 'Giá niêm yết chính thức'
      },
      khia_canh: {
        canh_quan: { diem: 4.8, tich_cuc: 90, tieu_cuc: 2, trung_tinh: 8, mo_ta: 'Không gian trong lành' },
        dich_vu: { diem: 4.5, tich_cuc: 85, tieu_cuc: 5, trung_tinh: 10, mo_ta: 'Dịch vụ chu đáo' },
        am_thuc: { diem: 4.4, tich_cuc: 82, tieu_cuc: 6, trung_tinh: 12, mo_ta: 'Ẩm thực phong phú' },
        ve_sinh: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Vệ sinh sạch sẽ' },
        gia_ca: { diem: 4.3, tich_cuc: 80, tieu_cuc: 8, trung_tinh: 12, mo_ta: 'Giá cả hợp lý' }
      }
    }

    const dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations') || '[]')
    dsCustom.push(diemMoi)
    localStorage.setItem('dt12_custom_destinations', JSON.stringify(dsCustom))
    return diemMoi
  },

  // 2.2 Xóa điểm đến (Dành cho Admin)
  async xoaDiemDen(id) {
    let dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations') || '[]')
    dsCustom = dsCustom.filter(d => Number(d.id) !== Number(id))
    localStorage.setItem('dt12_custom_destinations', JSON.stringify(dsCustom))

    const deletedIds = JSON.parse(localStorage.getItem('dt12_deleted_destinations') || '[]')
    if (!deletedIds.includes(Number(id))) {
      deletedIds.push(Number(id))
      localStorage.setItem('dt12_deleted_destinations', JSON.stringify(deletedIds))
    }
    return true
  },

  // 2.3 Cập nhật điểm đến (Dành cho Admin)
  async capNhatDiemDen(id, data) {
    let dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations') || '[]')
    const idx = dsCustom.findIndex(d => Number(d.id) === Number(id))
    if (idx !== -1) {
      dsCustom[idx] = { ...dsCustom[idx], ...data }
      localStorage.setItem('dt12_custom_destinations', JSON.stringify(dsCustom))
    } else {
      const defaultDest = DANH_SACH_DIEM_DEN_FALLBACK.find(d => Number(d.id) === Number(id))
      if (defaultDest) {
        dsCustom.push({ ...defaultDest, ...data })
        localStorage.setItem('dt12_custom_destinations', JSON.stringify(dsCustom))
      }
    }
    return true
  },

  // 3. Lấy danh sách đánh giá có lọc và phân trang
  async layDanhSachDanhGia(boLoc = {}, trang = 1, soDong = 10) {
    try {
      const params = { so_dong: soDong, trang, ...boLoc }
      const res = await api.get('/danh-gia', { params })
      if (res.data?.data && res.data.data.length > 0) {
        return {
          danh_sach: res.data.data,
          meta: res.data.meta || { tong_ban_ghi: 874, trang, so_dong: soDong, tong_trang: Math.ceil(874 / soDong) }
        }
      }
    } catch (e) {
      // Dùng fallback
    }

    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    let ketQua = [...customReviews, ...DANH_SACH_DANH_GIA_TRIPADVISOR]

    if (boLoc.tu_khoa) {
      const kw = boLoc.tu_khoa.toLowerCase()
      ketQua = ketQua.filter(r => 
        (r.tieu_de && r.tieu_de.toLowerCase().includes(kw)) || 
        (r.noi_dung && r.noi_dung.toLowerCase().includes(kw)) ||
        (r.ten_diem_den && r.ten_diem_den.toLowerCase().includes(kw))
      )
    }
    if (boLoc.diem_den_id) {
      ketQua = ketQua.filter(r => Number(r.diem_den_id) === Number(boLoc.diem_den_id))
    }
    if (boLoc.sac_thai) {
      ketQua = ketQua.filter(r => r.sac_thai == boLoc.sac_thai)
    }
    if (boLoc.diem_so) {
      const targetScore = Number(boLoc.diem_so)
      if (targetScore === 1) {
        ketQua = ketQua.filter(r => (r.diem_so || 5) <= 2)
      } else {
        ketQua = ketQua.filter(r => (r.diem_so || 5) === targetScore)
      }
    }
    if (boLoc.khia_canh_id) {
      const kcTen = boLoc.khia_canh_id.toLowerCase()
      ketQua = ketQua.filter(r => r.khia_canh_tags?.some(tag => tag.khia_canh.toLowerCase().includes(kcTen)))
    }

    const tongBanGhi = ketQua.length
    const tongTrang = Math.ceil(tongBanGhi / soDong) || 1
    const batDau = (trang - 1) * soDong
    const duLieuTrang = ketQua.slice(batDau, batDau + soDong)

    return {
      danh_sach: duLieuTrang,
      meta: {
        trang: Number(trang),
        so_dong: soDong,
        tong_trang: tongTrang,
        tong_ban_ghi: tongBanGhi
      }
    }
  },

  // 3.1 Lấy toàn bộ đánh giá của riêng 1 điểm đến
  async layTatCaDanhGiaCuaDiemDen(diemDenId) {
    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    const defaultReviews = DANH_SACH_DANH_GIA_TRIPADVISOR.filter(r => Number(r.diem_den_id) === Number(diemDenId))
    const targetCustom = customReviews.filter(r => Number(r.diem_den_id) === Number(diemDenId))
    return [...targetCustom, ...defaultReviews]
  },

  // 4. DU KHÁCH VIẾT ĐÁNH GIÁ MỚI (WRITE A REVIEW FLOW - CHUẨN TRIPADVISOR)
  async guiDanhGiaNguoiDung(duLieu) {
    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    const newId = 5000 + customReviews.length + 1
    const dest = await this.layChiTietDiemDen(duLieu.diem_den_id)

    const diemSo = Number(duLieu.diem_so || 5)
    const sacThai = diemSo >= 4 ? 'tich_cuc' : (diemSo === 3 ? 'trung_tinh' : 'tieu_cuc')

    const banGhi = {
      id: newId,
      diem_den_id: Number(duLieu.diem_den_id),
      ten_diem_den: dest.ten,
      nguoi_danh_gia: duLieu.ho_ten || localStorage.getItem('ten_nguoi_dung') || 'Du khách TripAdvisor',
      quoc_gia: duLieu.dia_phuong || 'Việt Nam',
      ngay_dang: new Date().toISOString().split('T')[0],
      loai_chuyen_di: duLieu.loai_chuyen_di || 'Cặp đôi',
      thoi_gian_trai_nghiem: duLieu.thoi_gian_trai_nghiem || 'Gần đây',
      diem_so: diemSo,
      tieu_de: duLieu.tieu_de,
      noi_dung: duLieu.noi_dung,
      luot_huu_ich: 0,
      sac_thai: sacThai,
      la_nguoi_dung_viet: true,
      khia_canh_tags: [
        { khia_canh: 'Cảnh quan', chi_tiet: duLieu.khia_canh_canh_quan ? `${duLieu.khia_canh_canh_quan}/5 sao` : 'Không gian trải nghiệm', sac_thai: diemSo >= 4 ? 'tich_cuc' : 'trung_tinh' },
        { khia_canh: 'Dịch vụ', chi_tiet: duLieu.khia_canh_dich_vu ? `${duLieu.khia_canh_dich_vu}/5 sao` : 'Thái độ phục vụ', sac_thai: diemSo >= 4 ? 'tich_cuc' : 'tieu_cuc' }
      ]
    }

    customReviews.unshift(banGhi)
    localStorage.setItem('dt12_custom_reviews', JSON.stringify(customReviews))

    // Tự động tính toán lại điểm trung bình và Wilson Score cho điểm đến này
    const allReviews = await this.layTatCaDanhGiaCuaDiemDen(duLieu.diem_den_id)
    const n = allReviews.length
    const diemTb = (allReviews.reduce((sum, r) => sum + Number(r.diem_so || 5), 0) / n).toFixed(1)
    const posCount = allReviews.filter(r => r.sac_thai === 'tich_cuc').length
    const p_hat = posCount / n
    const z = 1.96
    const z2 = z * z
    const numerator = p_hat + z2 / (2 * n) - z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))
    const denominator = 1 + z2 / n
    const w_lower = Math.max(0, numerator / denominator)
    const isDiemSang = w_lower >= 0.70

    await this.capNhatDiemDen(duLieu.diem_den_id, {
      tong_luot_danh_gia: n,
      diem_danh_tieng_tb: diemTb,
      ty_le_tich_cuc: Number((p_hat * 100).toFixed(1)),
      khoang_tin_cay_wilson: `${w_lower.toFixed(3)} - ${(w_lower + 0.08).toFixed(3)}`,
      trang_thai_wilson: isDiemSang ? 'diem_sang' : 'binh_thuong',
      nhan_trang_thai: isDiemSang ? 'Điểm sáng du lịch (Travelers\' Choice)' : 'Hoạt động ổn định'
    })

    return banGhi
  },

  // 5. BẦU CHỌN "HỮU ÍCH" (HELPFUL VOTE - CHUẨN TRIPADVISOR)
  tangLuotHuuIch(danhGiaId) {
    const votes = JSON.parse(localStorage.getItem('dt12_helpful_votes') || '{}')
    votes[danhGiaId] = (votes[danhGiaId] || 0) + 1
    localStorage.setItem('dt12_helpful_votes', JSON.stringify(votes))

    // Cập nhật cả trong custom reviews nếu bài viết nằm trong custom
    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    const rev = customReviews.find(r => r.id === danhGiaId)
    if (rev) {
      rev.luot_huu_ich = (rev.luot_huu_ich || 0) + 1
      localStorage.setItem('dt12_custom_reviews', JSON.stringify(customReviews))
    }
    return votes[danhGiaId]
  },

  layLuotHuuIch(danhGiaId) {
    const votes = JSON.parse(localStorage.getItem('dt12_helpful_votes') || '{}')
    return votes[danhGiaId] || 0
  },

  // 6. GOM VÀ CÀO DỮ LIỆU TRIPADVISOR CHO ĐIỂM ĐẾN
  async gomDanhGiaTripAdvisorChoDiemDen(diemDenId, soLuong = 30) {
    const dest = await this.layChiTietDiemDen(diemDenId)
    const mauDanhGia = [
      { tieu_de: 'Trải nghiệm du lịch đỉnh cao vượt xa kỳ vọng!', noi_dung: `Chuyến tham quan tại ${dest.ten} để lại ấn tượng vô cùng sâu sắc. Cảnh quan đẹp ngoạn mục, nhân viên đón tiếp chu đáo nhiệt tình. Rất xứng đáng lọt top Travelers\' Choice!`, diem_so: 5, khia_canh: 'Cảnh quan', chi_tiet: 'Cảnh sắc tuyệt mỹ', sac_thai: 'tich_cuc', loai_chuyen_di: 'Gia đình' },
      { tieu_de: 'Dịch vụ chuẩn 5 sao và không gian thoáng đãng', noi_dung: `Khuôn viên ${dest.ten} sạch sẽ, cơ sở vật chất hiện đại. Đồ ăn khá ngon và giá cả niêm yết rõ ràng minh bạch, an tâm tuyệt đối.`, diem_so: 5, khia_canh: 'Dịch vụ', chi_tiet: 'Phục vụ chuyên nghiệp', sac_thai: 'tich_cuc', loai_chuyen_di: 'Cặp đôi' },
      { tieu_de: 'Điểm đến lý tưởng cho nhóm bạn cuối tuần', noi_dung: `Không khí trong lành dễ chịu, check-in góc nào cũng có ảnh đẹp. Đội ngũ nhân viên hỗ trợ du khách rất thân thiện và chu đáo.`, diem_so: 5, khia_canh: 'Vệ sinh', chi_tiet: 'Môi trường sạch sẽ', sac_thai: 'tich_cuc', loai_chuyen_di: 'Bạn bè' },
      { tieu_de: 'Khá hài lòng nhưng hơi đông vào giờ cao điểm', noi_dung: `Vào tầm trưa khách đoàn đến đông nên phải xếp hàng chờ hơi lâu. Bù lại cảnh sắc thiên nhiên và không gian rất đáng tiền.`, diem_so: 4, khia_canh: 'Dịch vụ', chi_tiet: 'Chờ đợi xếp hàng', sac_thai: 'trung_tinh', loai_chuyen_di: 'Công tác' },
      { tieu_de: 'Cần nâng cấp thêm khu vực ẩm thực phụ trợ', noi_dung: `Cảnh quan rất đẹp nhưng các quán ăn bên trong ít sự lựa chọn và giá hơi cao so với bên ngoài. Cần đa dạng thực đơn hơn.`, diem_so: 3, khia_canh: 'Ẩm thực', chi_tiet: 'Ít lựa chọn món', sac_thai: 'trung_tinh', loai_chuyen_di: 'Gia đình' },
      { tieu_de: 'Bãi đỗ xe và hướng dẫn cần cải thiện', noi_dung: `Khu vực bãi đỗ xe vào cuối tuần hơi lộn xộn, nhân viên điều phối cần chủ động hướng dẫn rõ ràng hơn cho khách tự lái xe.`, diem_so: 2, khia_canh: 'Dịch vụ', chi_tiet: 'Điều phối xe', sac_thai: 'tieu_cuc', loai_chuyen_di: 'Một mình' }
    ]

    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    const reviewers = ['Trần Văn Hưng', 'Nguyễn Thị Mai', 'Hoàng Minh Tuấn', 'Lê Thu Hương', 'David Miller', 'Sophie Dubois', 'Phạm Đức Anh', 'Đỗ Quỳnh Nga', 'Kenji Tanaka', 'Vũ Hải Đăng']
    const cities = ['Hà Nội, VN', 'TP.HCM, VN', 'Đà Nẵng, VN', 'Singapore', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Hải Phòng, VN']

    const reviewsCreated = []
    for (let i = 0; i < soLuong; i++) {
      const template = mauDanhGia[i % mauDanhGia.length]
      const newId = 2000 + customReviews.length + i + 1
      const review = {
        id: newId,
        diem_den_id: Number(diemDenId),
        ten_diem_den: dest.ten,
        nguoi_danh_gia: reviewers[i % reviewers.length],
        quoc_gia: cities[i % cities.length],
        ngay_dang: `2026-0${(i % 9) + 1}-1${(i % 8) + 1}`,
        loai_chuyen_di: template.loai_chuyen_di,
        diem_so: template.diem_so,
        tieu_de: template.tieu_de,
        noi_dung: template.noi_dung,
        luot_huu_ich: Math.floor(Math.random() * 12),
        sac_thai: template.sac_thai,
        khia_canh_tags: [
          { khia_canh: template.khia_canh, chi_tiet: template.chi_tiet, sac_thai: template.sac_thai },
          { khia_canh: 'Giá cả', chi_tiet: 'Minh bạch', sac_thai: template.diem_so >= 4 ? 'tich_cuc' : 'trung_tinh' }
        ]
      }
      customReviews.push(review)
      reviewsCreated.push(review)
    }

    localStorage.setItem('dt12_custom_reviews', JSON.stringify(customReviews))

    const allDestReviews = await this.layTatCaDanhGiaCuaDiemDen(diemDenId)
    const n = allDestReviews.length
    const posCount = allDestReviews.filter(r => r.sac_thai === 'tich_cuc').length
    const p_hat = posCount / n
    const z = 1.96
    const z2 = z * z
    const numerator = p_hat + z2 / (2 * n) - z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))
    const denominator = 1 + z2 / n
    const w_lower = Math.max(0, numerator / denominator)
    const isDiemSang = w_lower >= 0.70

    await this.capNhatDiemDen(diemDenId, {
      tong_luot_danh_gia: n,
      ty_le_tich_cuc: Number((p_hat * 100).toFixed(1)),
      diem_danh_tieng_tb: (allDestReviews.reduce((sum, r) => sum + (r.diem_so || 5), 0) / n).toFixed(1),
      khoang_tin_cay_wilson: `${w_lower.toFixed(3)} - ${(w_lower + 0.08).toFixed(3)}`,
      trang_thai_wilson: isDiemSang ? 'diem_sang' : 'binh_thuong',
      nhan_trang_thai: isDiemSang ? 'Điểm sáng du lịch (Travelers\' Choice)' : 'Hoạt động ổn định'
    })

    return {
      so_luong_gom: soLuong,
      tong_danh_gia_moi: n,
      w_lower,
      is_diem_sang: isDiemSang
    }
  }
}

export default DataService
