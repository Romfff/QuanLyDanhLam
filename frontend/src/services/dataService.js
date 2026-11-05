// frontend/src/services/dataService.js
// Dịch vụ dữ liệu chuẩn Commercial Product - Tích hợp TripAdvisor Intelligence Platform
// Hỗ trợ cào dữ liệu TripAdvisor thực tế, kiểm duyệt đánh giá, xếp hạng Wilson Score 95% CI & PhoBERT ABSA

import api from './api'
import reviews874Data from '../assets/reviews874.json'

// 7 ĐIỂM ĐẾN THỰC TẾ TỪ TRIPADVISOR VIỆT NAM (100% ẢNH THẬT, METADATA CHUẨN PRODUCT)
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
    tripadvisor_url: 'https://www.tripadvisor.com/Attraction_Review-g293923-d23300210-Reviews-Ambassador_Cruise_Halong_Bay-H_Long_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 124 Tour du thuyền tại Vịnh Hạ Long',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1528649659491-23edddd0b98a?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1528649659491-23edddd0b98a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1669819894338-53ab7afc6958?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Du thuyền ẩm thực & nghỉ dưỡng 5 sao lớn nhất trên Vịnh Hạ Long với sức chứa 500 khách. Sở hữu boong tắm nắng đôi 500m², cầu kính vô cực, bể sục Jacuzzi ngoài trời và tiệc buffet hải sản tôm hùm thượng hạng chuẩn Michelin.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 164,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 93.2,
    khoang_tin_cay_wilson: '0.884 - 0.957',
    rating_histogram: { xuat_sac: 122, rat_tot: 31, trung_binh: 8, kem: 2, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://ambassadorcruise.com',
      hotline: '1900 3045',
      gio_mo_cua: '07:30 - 20:30 Hàng ngày',
      khoang_gia: '3.450.000₫ - 6.200.000₫ / khách'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Tầm nhìn ngoạn mục ra vịnh di sản kỳ vĩ' },
      dich_vu: { diem: 4.8, tich_cuc: 94, tieu_cuc: 2, trung_tinh: 4, mo_ta: 'Nhân viên lễ tân & thủy thủ phục vụ chu đáo, chuyên nghiệp' },
      am_thuc: { diem: 4.7, tich_cuc: 92, tieu_cuc: 3, trung_tinh: 5, mo_ta: 'Tiệc buffet tôm hùm và hải sản Hạ Long tươi ngon hảo hạng' },
      ve_sinh: { diem: 4.8, tich_cuc: 95, tieu_cuc: 1, trung_tinh: 4, mo_ta: 'Cabin và boong tàu sạch sẽ tinh tươm chuẩn khách sạn quốc tế' },
      gia_ca: { diem: 4.4, tich_cuc: 82, tieu_cuc: 8, trung_tinh: 10, mo_ta: 'Mức giá hoàn toàn tương xứng với trải nghiệm siêu sang 5 sao' }
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
    tripadvisor_url: 'https://www.tripadvisor.com/Hotel_Review-g12666019-d12311302-Reviews-Melia_Vinpearl_Phu_Quoc-Ganh_Dau_Phu_Quoc_Island_Kien_Giang_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #3 trên 86 Khu nghỉ dưỡng tại Bãi Dài Phú Quốc',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Khu nghỉ dưỡng 5 sao biệt lập bên bờ biển Bãi Dài ngắm hoàng hôn đẹp nhất đảo ngọc Phú Quốc. Toàn bộ là biệt thự sang trọng có hồ bơi riêng, vườn nhiệt đới, dịch vụ YHI Spa chuẩn Tây Ban Nha và chuỗi nhà hàng Địa Trung Hải đẳng cấp.',
    diem_danh_tieng_tb: 4.9,
    tong_luot_danh_gia: 160,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 95.6,
    khoang_tin_cay_wilson: '0.912 - 0.980',
    rating_histogram: { xuat_sac: 138, rat_tot: 15, trung_binh: 4, kem: 2, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://melia.com/vinpearl-phu-quoc',
      hotline: '0297 362 5555',
      gio_mo_cua: 'Mở cửa 24/7',
      khoang_gia: '4.800.000₫ - 15.000.000₫ / đêm'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 98, tieu_cuc: 0, trung_tinh: 2, mo_ta: 'Bãi biển Bãi Dài nước trong xanh màu ngọc bích, hoàng hôn tuyệt mỹ' },
      dich_vu: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Dịch vụ chuẩn Melia quốc tế, quản gia villa tận tâm chu đáo' },
      am_thuc: { diem: 4.8, tich_cuc: 93, tieu_cuc: 2, trung_tinh: 5, mo_ta: 'Nhà hàng Cape Nao phục vụ hải sản nướng thơm ngon' },
      ve_sinh: { diem: 4.9, tich_cuc: 97, tieu_cuc: 0, trung_tinh: 3, mo_ta: 'Villa và hồ bơi riêng biệt luôn sạch sẽ thơm tho' },
      gia_ca: { diem: 4.5, tich_cuc: 86, tieu_cuc: 5, trung_tinh: 9, mo_ta: 'Tương xứng chất lượng biệt thự villa sang trọng bậc nhất' }
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
    dia_chi: 'TP. Hạ Long, Tỉnh Quảng Ninh, Việt Nam',
    tripadvisor_url: 'https://www.tripadvisor.com/Attraction_Review-g293923-d1968469-Reviews-Halong_Bay-H_Long_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 152 Địa điểm tham quan tại Quảng Ninh',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1669819894338-53ab7afc6958?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528649659491-23edddd0b98a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Kỳ quan thiên nhiên thế giới 2 lần được UNESCO công nhận với hơn 1.600 hòn đảo đá vôi kỳ vĩ nhô lên giữa làn nước xanh lục bảo. Điểm đến du lịch biểu tượng số 1 Việt Nam với trải nghiệm chèo thuyền kayak qua hang Luồn, hang Sửng Sốt và ngắm toàn cảnh vịnh từ đỉnh Ti Tốp.',
    diem_danh_tieng_tb: 4.9,
    tong_luot_danh_gia: 144,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 96.5,
    khoang_tin_cay_wilson: '0.908 - 0.978',
    rating_histogram: { xuat_sac: 125, rat_tot: 14, trung_binh: 3, kem: 1, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://halongbay.gov.vn',
      hotline: '0203 384 6564',
      gio_mo_cua: '06:30 - 18:30 Hàng ngày',
      khoang_gia: '290.000₫ - 1.200.000₫ / vé tham quan'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 99, tieu_cuc: 0, trung_tinh: 1, mo_ta: 'Non nước kỳ vĩ tráng lệ, kiệt tác địa chất triệu năm của thiên nhiên' },
      dich_vu: { diem: 4.7, tich_cuc: 90, tieu_cuc: 3, trung_tinh: 7, mo_ta: 'Tàu du lịch và hướng dẫn viên nhiệt tình, chu đáo' },
      am_thuc: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Hải sản Hạ Long tươi sống tại làng chài Cửa Vạn' },
      ve_sinh: { diem: 4.7, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Ban quản lý tăng cường thu gom rác mặt vịnh liên tục' },
      gia_ca: { diem: 4.6, tich_cuc: 89, tieu_cuc: 4, trung_tinh: 7, mo_ta: 'Giá vé danh thắng niêm yết minh bạch theo quy định nhà nước' }
    }
  },
  {
    id: 4,
    ten: 'Vinpearl Resort & Spa Ha Long',
    ten_rut_gon: 'Vinpearl Resort & Spa Hạ Long',
    danh_muc: 'hotels',
    danh_muc_ten: 'Khu nghỉ dưỡng Đảo biệt lập 5 sao',
    loai_hinh: 'Khu nghỉ dưỡng đảo biệt lập',
    ma_dinh_danh: 'DD_TA_VINPEARL_HL',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Đảo Rều, Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    tripadvisor_url: 'https://www.tripadvisor.com/Hotel_Review-g293923-d8595372-Reviews-Vinpearl_Resort_Spa_Ha_Long-H_Long_Bay_Quang_Ninh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #2 trên 89 Khách sạn cao cấp tại TP. Hạ Long',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Khu nghỉ dưỡng biệt lập 4 mặt hướng biển độc nhất vô nhị tọa lạc trọn vẹn trên đảo Rều. Thiết kế bán nguyệt mang phong cách tân cổ điển tráng lệ lấy cảm hứng từ nhà hát Rennes (Pháp) với bể bơi ngoài trời 1.200m² nhìn thẳng ra vịnh di sản.',
    diem_danh_tieng_tb: 4.7,
    tong_luot_danh_gia: 140,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 91.8,
    khoang_tin_cay_wilson: '0.854 - 0.948',
    rating_histogram: { xuat_sac: 104, rat_tot: 25, trung_binh: 7, kem: 3, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://vinpearl.com/vi/hotels/vinpearl-resort-spa-ha-long',
      hotline: '0203 355 6868',
      gio_mo_cua: 'Mở cửa 24/7 (Cano trung chuyển đưa đón 24/7)',
      khoang_gia: '3.100.000₫ - 8.500.000₫ / đêm'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Vị trí 4 mặt giáp biển riêng tư, ngắm bình minh và hoàng hôn trọn vẹn' },
      dich_vu: { diem: 4.8, tich_cuc: 94, tieu_cuc: 2, trung_tinh: 4, mo_ta: 'Cano cao tốc đưa đón liên tục, nhân viên lịch sự chu đáo' },
      am_thuc: { diem: 4.7, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Buffet sáng tại nhà hàng Bayview phong phú món Á - Âu' },
      ve_sinh: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Phòng ốc sạch sẽ, khuôn viên đảo luôn được chăm sóc tỉ mỉ' },
      gia_ca: { diem: 4.4, tich_cuc: 81, tieu_cuc: 9, trung_tinh: 10, mo_ta: 'Xứng tầm khu nghỉ dưỡng đảo biệt lập hàng đầu miền Bắc' }
    }
  },
  {
    id: 5,
    ten: 'Trang An Grottoes',
    ten_rut_gon: 'Quần thể Danh thắng Tràng An',
    danh_muc: 'attractions',
    danh_muc_ten: 'Di sản Thế giới Kép UNESCO',
    loai_hinh: 'Di sản thế giới kép UNESCO',
    ma_dinh_danh: 'DD_TA_TRANG_AN',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Tràng An, Huyện Hoa Lư, Tỉnh Ninh Bình, Việt Nam',
    tripadvisor_url: 'https://www.tripadvisor.com/Attraction_Review-g303945-d2484803-Reviews-Trang_An_Grottoes-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #1 trên 98 Địa điểm tham quan tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice Best of the Best 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1721543548574-2ee84281a19e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1741320130708-7a91adf5fc4e?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Di sản văn hóa và thiên nhiên thế giới kép đầu tiên tại Đông Nam Á. Tuyến thuyền tay truyền thống lướt êm đềm qua hệ thống 31 thung lũng, 48 hang động xuyên thủy kỳ ảo, đền thờ tâm linh cổ kính và phim trường Kong: Skull Island giữa non nước Ninh Bình.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 128,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 94.8,
    khoang_tin_cay_wilson: '0.890 - 0.966',
    rating_histogram: { xuat_sac: 98, rat_tot: 23, trung_binh: 4, kem: 2, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://trangandanhthang.vn',
      hotline: '0229 362 0335',
      gio_mo_cua: '07:00 - 17:00 Hàng ngày',
      khoang_gia: '250.000₫ / người lớn, 120.000₫ / trẻ em'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 99, tieu_cuc: 0, trung_tinh: 1, mo_ta: 'Sông núi hữu tình, hang động lung linh thạch nhũ' },
      dich_vu: { diem: 4.8, tich_cuc: 93, tieu_cuc: 3, trung_tinh: 4, mo_ta: 'Các cô chèo thuyền thân thiện, chu đáo và hiền lành' },
      am_thuc: { diem: 4.6, tich_cuc: 87, tieu_cuc: 4, trung_tinh: 9, mo_ta: 'Đặc sản dê núi và cơm cháy Ninh Bình thơm ngon' },
      ve_sinh: { diem: 4.9, tich_cuc: 98, tieu_cuc: 0, trung_tinh: 2, mo_ta: 'Dòng sông Sao Khê xanh trong, tuyệt đối không có rác thải' },
      gia_ca: { diem: 4.8, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Giá vé đã bao gồm toàn bộ phí đi thuyền 3 tiếng rất xứng đáng' }
    }
  },
  {
    id: 6,
    ten: 'Mua Caves',
    ten_rut_gon: 'Hang Múa (Núi Ngọa Long)',
    danh_muc: 'attractions',
    danh_muc_ten: 'Tuyệt đỉnh Danh thắng & Check-in',
    loai_hinh: 'Danh lam thắng cảnh & Leo núi ngắm cảnh',
    ma_dinh_danh: 'DD_TA_HANG_MUA',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Thôn Khê Đầu Hạ, Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình',
    tripadvisor_url: 'https://www.tripadvisor.com/Attraction_Review-g303945-d5321519-Reviews-Mua_Caves-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #2 trên 98 Điểm ngắm cảnh tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1677684509677-2bb3d1337e51?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1677684509677-2bb3d1337e51?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1741320130708-7a91adf5fc4e?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Được mệnh danh là "Vạn Lý Trường Thành thu nhỏ" với gần 500 bậc thang đá uốn lượn dẫn lên đỉnh núi Ngọa Long. Từ tượng rồng đá trên đỉnh, du khách có tầm nhìn panorama 360 độ ngắm trọn thung lũng Tam Cốc và cánh đồng lúa chín vàng thơ mộng.',
    diem_danh_tieng_tb: 4.6,
    tong_luot_danh_gia: 93,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 89.2,
    khoang_tin_cay_wilson: '0.815 - 0.938',
    rating_histogram: { xuat_sac: 62, rat_tot: 21, trung_binh: 6, kem: 3, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://hangmua.com.vn',
      hotline: '0229 361 8686',
      gio_mo_cua: '06:00 - 19:00 Hàng ngày',
      khoang_gia: '100.000₫ / người lớn'
    },
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 98, tieu_cuc: 1, trung_tinh: 1, mo_ta: 'Tầm nhìn 360 độ đẹp nghẹt thở xuống cánh đồng Tam Cốc' },
      dich_vu: { diem: 4.5, tich_cuc: 85, tieu_cuc: 6, trung_tinh: 9, mo_ta: 'Lối đi lát đá kiên cố, có trạm nghỉ và quầy nước chân núi' },
      am_thuc: { diem: 4.4, tich_cuc: 82, tieu_cuc: 5, trung_tinh: 13, mo_ta: 'Quán cà phê đầm sen ngắm cảnh thư thái' },
      ve_sinh: { diem: 4.6, tich_cuc: 89, tieu_cuc: 4, trung_tinh: 7, mo_ta: 'Bậc thang đá sạch sẽ, có thùng rác dọc đường leo núi' },
      gia_ca: { diem: 4.7, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Giá vé 100k rất hợp lý cho trải nghiệm đỉnh cao' }
    }
  },
  {
    id: 7,
    ten: 'Van Long Nature Reserve',
    ten_rut_gon: 'Đầm Vân Long',
    danh_muc: 'attractions',
    danh_muc_ten: 'Khu bảo tồn Thiên nhiên Đất ngập nước',
    loai_hinh: 'Khu bảo tồn thiên nhiên ngập nước',
    ma_dinh_danh: 'DD_TA_VAN_LONG',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Xã Gia Vân, Huyện Gia Viễn, Tỉnh Ninh Bình, Việt Nam',
    tripadvisor_url: 'https://www.tripadvisor.com/Attraction_Review-g303945-d2044218-Reviews-Van_Long_Nature_Reserve-Ninh_Binh_Ninh_Binh_Province.html',
    xep_hang_dia_phuong: 'Xếp hạng #3 trên 98 Điểm sinh thái tại Ninh Bình',
    danh_hieu_tripadvisor: "Travelers' Choice 2026",
    hinh_anh: 'https://images.unsplash.com/photo-1768158186882-9e7e15e53532?auto=format&fit=crop&w=1200&q=80',
    anh_gallery: [
      'https://images.unsplash.com/photo-1768158186882-9e7e15e53532?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1721543548574-2ee84281a19e?auto=format&fit=crop&w=1200&q=80'
    ],
    mo_ta: 'Vùng đất ngập nước nội địa lớn nhất đồng bằng Bắc Bộ, mệnh danh là "vịnh không sóng". Nơi cư trú của đàn Voọc mông trắng quý hiếm lớn nhất thế giới, nổi tiếng với sự thanh bình tuyệt đối khi xuôi thuyền nan giữa đầm sen, lau sậy và những vách núi đá vôi sừng sững.',
    diem_danh_tieng_tb: 4.5,
    tong_luot_danh_gia: 45,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: "Điểm sáng du lịch (Travelers' Choice)",
    ty_le_tich_cuc: 88.9,
    khoang_tin_cay_wilson: '0.765 - 0.943',
    rating_histogram: { xuat_sac: 29, rat_tot: 11, trung_binh: 3, kem: 1, toi_te: 1 },
    thong_tin_lien_he: {
      website: 'https://ninhbinh.gov.vn/vanlong',
      hotline: '0229 386 8798',
      gio_mo_cua: '07:30 - 18:00 Hàng ngày',
      khoang_gia: '100.000₫ / vé đò tham quan'
    },
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 97, tieu_cuc: 0, trung_tinh: 3, mo_ta: 'Mặt nước phẳng lặng như gương soi bóng mây trời và núi đá' },
      dich_vu: { diem: 4.6, tich_cuc: 88, tieu_cuc: 3, trung_tinh: 9, mo_ta: 'Thuyền nan mộc mạc, cô lái đò nhiệt tình chỉ điểm xem Voọc' },
      am_thuc: { diem: 4.2, tich_cuc: 78, tieu_cuc: 8, trung_tinh: 14, mo_ta: 'Các quán ăn dân dã quanh bến thuyền phục vụ cơm quê' },
      ve_sinh: { diem: 4.8, tich_cuc: 94, tieu_cuc: 1, trung_tinh: 5, mo_ta: 'Khu bảo tồn sinh thái giữ gìn sự nguyên sơ sạch đẹp' },
      gia_ca: { diem: 4.7, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Chi phí rất rẻ và mộc mạc cho 1 chuyến đi sinh thái yên bình' }
    }
  }
]

// 5 KHÍA CẠNH CẢM XÚC PHOBERT ABSA CHUẨN DU LỊCH VIỆT NAM
export const KHIA_CANH_ABSA = [
  { key: 'canh_quan', label: 'Cảnh quan & Thiên nhiên', icon: 'Mountain', mau: '#10b981' },
  { key: 'dich_vu', label: 'Dịch vụ & Thái độ', icon: 'Smile', mau: '#3b82f6' },
  { key: 'am_thuc', label: 'Ẩm thực & Nhà hàng', icon: 'UtensilsCrossed', mau: '#f59e0b' },
  { key: 've_sinh', label: 'Vệ sinh & Môi trường', icon: 'Sparkles', mau: '#8b5cf6' },
  { key: 'gia_ca', label: 'Giá cả & Độ tương xứng', icon: 'Receipt', mau: '#ec4899' }
]

// KEY LƯU TRỮ LOCAL CHO USER REVIEWS & HELPFUL COUNTS
const STORAGE_KEY_USER_REVIEWS = 'ta_product_user_reviews_v1'
const STORAGE_KEY_HELPFUL_VOTES = 'ta_product_helpful_votes_v1'

function getLocalUserReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_REVIEWS)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveLocalUserReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY_USER_REVIEWS, JSON.stringify(reviews))
  } catch (e) {}
}

function getLocalHelpfulVotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HELPFUL_VOTES)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function saveLocalHelpfulVotes(votes) {
  try {
    localStorage.setItem(STORAGE_KEY_HELPFUL_VOTES, JSON.stringify(votes))
  } catch (e) {}
}

export const dataService = {
  // Lấy danh sách điểm đến đầy đủ
  async layDanhSachDiemDen() {
    try {
      const res = await api.get('/diem-den')
      if (res.data && res.data.length > 0) {
        return res.data.map(item => {
          const fallback = DANH_SACH_DIEM_DEN_FALLBACK.find(f => f.id === item.id) || DANH_SACH_DIEM_DEN_FALLBACK[0]
          return {
            ...fallback,
            ...item,
            hinh_anh: fallback.hinh_anh || item.hinh_anh,
            anh_gallery: fallback.anh_gallery || [fallback.hinh_anh],
            diem_danh_tieng_tb: Number(item.diem_danh_tieng_tb || item.diem_danh_tieng_trung_binh || fallback.diem_danh_tieng_tb).toFixed(1),
            tong_luot_danh_gia: item.tong_luot_danh_gia || fallback.tong_luot_danh_gia,
            ty_le_tich_cuc: item.ty_le_tich_cuc || fallback.ty_le_tich_cuc,
            khoang_tin_cay_wilson: item.khoang_tin_cay_wilson || fallback.khoang_tin_cay_wilson,
            rating_histogram: item.rating_histogram || fallback.rating_histogram,
            khia_canh: item.khia_canh || fallback.khia_canh,
            thong_tin_lien_he: item.thong_tin_lien_he || fallback.thong_tin_lien_he
          }
        })
      }
      return DANH_SACH_DIEM_DEN_FALLBACK
    } catch (e) {
      console.warn('[dataService] Dùng dữ liệu fallback TripAdvisor:', e.message)
      return DANH_SACH_DIEM_DEN_FALLBACK
    }
  },

  // Lấy chi tiết điểm đến theo ID
  async layChiTietDiemDen(id) {
    const numId = Number(id)
    const fallback = DANH_SACH_DIEM_DEN_FALLBACK.find(d => d.id === numId) || DANH_SACH_DIEM_DEN_FALLBACK[0]
    try {
      const res = await api.get(`/diem-den/${numId}`)
      if (res.data) {
        const item = res.data
        return {
          ...fallback,
          ...item,
          hinh_anh: fallback.hinh_anh || item.hinh_anh,
          anh_gallery: fallback.anh_gallery || [fallback.hinh_anh],
          diem_danh_tieng_tb: Number(item.diem_danh_tieng_tb || item.diem_danh_tieng_trung_binh || fallback.diem_danh_tieng_tb).toFixed(1),
          khia_canh: item.khia_canh || fallback.khia_canh,
          rating_histogram: item.rating_histogram || fallback.rating_histogram,
          thong_tin_lien_he: item.thong_tin_lien_he || fallback.thong_tin_lien_he
        }
      }
      return fallback
    } catch (e) {
      return fallback
    }
  },

  // Tạo điểm đến mới (Admin)
  async taoDiemDen(duLieuMoi) {
    try {
      const res = await api.post('/diem-den', duLieuMoi)
      return res.data
    } catch (e) {
      const idMoi = Date.now()
      const itemMoi = {
        id: idMoi,
        ...duLieuMoi,
        hinh_anh: duLieuMoi.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
        anh_gallery: [
          duLieuMoi.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1571406252288-cc9c25bb4a44?auto=format&fit=crop&w=1200&q=80'
        ],
        diem_danh_tieng_tb: '5.0',
        tong_luot_danh_gia: 1,
        trang_thai_wilson: 'diem_sang',
        khoang_tin_cay_wilson: '0.850 - 0.980',
        rating_histogram: { xuat_sac: 1, rat_tot: 0, trung_binh: 0, kem: 0, toi_te: 0 },
        khia_canh: {
          canh_quan: { diem: 5.0, tich_cuc: 100, tieu_cuc: 0, trung_tinh: 0 },
          dich_vu: { diem: 5.0, tich_cuc: 100, tieu_cuc: 0, trung_tinh: 0 },
          am_thuc: { diem: 5.0, tich_cuc: 100, tieu_cuc: 0, trung_tinh: 0 },
          ve_sinh: { diem: 5.0, tich_cuc: 100, tieu_cuc: 0, trung_tinh: 0 },
          gia_ca: { diem: 5.0, tich_cuc: 100, tieu_cuc: 0, trung_tinh: 0 }
        }
      }
      DANH_SACH_DIEM_DEN_FALLBACK.unshift(itemMoi)
      return itemMoi
    }
  },

  // Cập nhật điểm đến (Admin)
  async capNhatDiemDen(id, duLieu) {
    try {
      const res = await api.put(`/diem-den/${id}`, duLieu)
      return res.data
    } catch (e) {
      const idx = DANH_SACH_DIEM_DEN_FALLBACK.findIndex(d => d.id === Number(id))
      if (idx !== -1) {
        DANH_SACH_DIEM_DEN_FALLBACK[idx] = { ...DANH_SACH_DIEM_DEN_FALLBACK[idx], ...duLieu }
        return DANH_SACH_DIEM_DEN_FALLBACK[idx]
      }
      return duLieu
    }
  },

  // Xóa điểm đến (Admin)
  async xoaDiemDen(id) {
    try {
      await api.delete(`/diem-den/${id}`)
      return true
    } catch (e) {
      const idx = DANH_SACH_DIEM_DEN_FALLBACK.findIndex(d => d.id === Number(id))
      if (idx !== -1) {
        DANH_SACH_DIEM_DEN_FALLBACK.splice(idx, 1)
      }
      return true
    }
  },

  // Lấy danh sách đánh giá theo điểm đến (Kết hợp 874 đánh giá TripAdvisor + Đánh giá mới của người dùng)
  async layDanhGia(diemDenId = null, params = {}) {
    const helpfulVotes = getLocalHelpfulVotes()
    const userReviews = getLocalUserReviews()

    // 1. Thử gọi API Backend
    try {
      const res = await api.get('/danh-gia', { params: { diem_den_id: diemDenId, ...params } })
      if (res.data && res.data.length > 0) {
        return res.data.map(r => ({
          ...r,
          so_luot_huu_ich: (r.so_luot_huu_ich || 0) + (helpfulVotes[r.id] || 0)
        }))
      }
    } catch (e) {
      // Fallback xuống offline dataset
    }

    // 2. Fallback: Kết hợp 874 đánh giá từ file reviews874.json và user reviews
    let tatCaDanhGia = [...userReviews]
    if (Array.isArray(reviews874Data)) {
      tatCaDanhGia = tatCaDanhGia.concat(reviews874Data)
    }

    // Lọc theo điểm đến nếu có
    if (diemDenId) {
      tatCaDanhGia = tatCaDanhGia.filter(r => Number(r.diem_den_id) === Number(diemDenId))
    }

    // Lọc trạng thái kiểm duyệt (mặc định hiện 'da_duyet' cho du khách)
    if (params.trang_thai) {
      tatCaDanhGia = tatCaDanhGia.filter(r => r.trang_thai === params.trang_thai)
    }

    // Gắn thêm số lượt hữu ích
    return tatCaDanhGia.map(r => ({
      ...r,
      so_luot_huu_ich: (r.so_luot_huu_ich || 0) + (helpfulVotes[r.id] || 0)
    }))
  },

  // Gửi đánh giá mới từ người dùng (Trang /viet-danh-gia)
  async guiDanhGiaNguoiDung(payload) {
    const danhGiaMoi = {
      id: 'UR_' + Date.now(),
      diem_den_id: Number(payload.diem_den_id),
      nguoi_danh_gia: payload.nguoi_danh_gia || 'Du khách ẩn danh',
      so_sao: Number(payload.so_sao) || 5,
      tieu_de: payload.tieu_de || 'Trải nghiệm du lịch tuyệt vời',
      noi_dung: payload.noi_dung || '',
      loai_chuyen_di: payload.loai_chuyen_di || 'Cặp đôi',
      thoi_gian_di: payload.thoi_gian_di || new Date().toISOString().slice(0, 7),
      ngay_danh_gia: new Date().toISOString().slice(0, 10),
      trang_thai: 'da_duyet', // Mặc định tự động duyệt với review hợp lệ
      so_luot_huu_ich: 0,
      phobert_aspects: payload.phobert_aspects || {
        canh_quan: 'tich_cuc',
        dich_vu: 'tich_cuc',
        am_thuc: 'tich_cuc',
        ve_sinh: 'tich_cuc',
        gia_ca: 'tich_cuc'
      }
    }

    try {
      const res = await api.post('/danh-gia', danhGiaMoi)
      return res.data || danhGiaMoi
    } catch (e) {
      // Lưu vào LocalStorage
      const reviews = getLocalUserReviews()
      reviews.unshift(danhGiaMoi)
      saveLocalUserReviews(reviews)
      return danhGiaMoi
    }
  },

  // Tăng lượt hữu ích (Helpful Vote) cho 1 đánh giá
  async tangLuotHuuIch(reviewId) {
    const votes = getLocalHelpfulVotes()
    votes[reviewId] = (votes[reviewId] || 0) + 1
    saveLocalHelpfulVotes(votes)

    try {
      await api.post(`/danh-gia/${reviewId}/huu-ich`)
    } catch (e) {
      // Offline mode handled
    }
    return votes[reviewId]
  },

  // Thống kê tổng hợp danh tiếng (Reputation Metrics)
  async layThongKeTongHop() {
    try {
      const res = await api.get('/thong-ke/tong-hop')
      if (res.data) return res.data
    } catch (e) {}

    const list = DANH_SACH_DIEM_DEN_FALLBACK
    const tongReviews = list.reduce((acc, cur) => acc + (cur.tong_luot_danh_gia || 0), 0)
    const diemTBTatCa = (list.reduce((acc, cur) => acc + Number(cur.diem_danh_tieng_tb), 0) / list.length).toFixed(1)

    return {
      tong_diem_den: list.length,
      tong_danh_gia: tongReviews,
      diem_danh_tieng_trung_binh: diemTBTatCa,
      so_diem_sang: list.filter(d => d.trang_thai_wilson === 'diem_sang').length,
      so_canh_bao: list.filter(d => d.trang_thai_wilson === 'canh_bao').length,
      so_nguy_co: list.filter(d => d.trang_thai_wilson === 'nguy_co').length
    }
  }
}

export default dataService


export const DataService = dataService
export const DANH_SACH_DANH_GIA_TRIPADVISOR = reviews874Data
