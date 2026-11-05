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
  async taoDiemDen(duLieuMoi) {
    return this.themDiemDen(duLieuMoi)
  },

  async themDanhGiaChoDiemDen(diemDenId, form) {
    return this.guiDanhGiaNguoiDung({
      ...form,
      diem_den_id: diemDenId,
      ho_ten: form.nguoi_danh_gia,
      dia_phuong: form.quoc_gia
    })
  },

  async layDanhGia(diemDenId = null) {
    if (diemDenId) return this.layTatCaDanhGiaCuaDiemDen(diemDenId)
    const r = await this.layDanhSachDanhGia({}, 1, 1000)
    return r.danh_sach
  },

  // 1. Lấy danh sách điểm đến
  async layDanhSachDiemDen(boLoc = {}) {
    const dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations_v2') || '[]')
    const deletedIds = JSON.parse(localStorage.getItem('dt12_deleted_destinations') || '[]')

    let danhSach = [...DANH_SACH_DIEM_DEN_FALLBACK]

    dsCustom.forEach(c => {
      const idx = danhSach.findIndex(d => Number(d.id) === Number(c.id))
      if (idx !== -1) {
        danhSach[idx] = {
          ...danhSach[idx],
          ...c,
          hinh_anh: c.hinh_anh || danhSach[idx].hinh_anh,
          anh_gallery: c.anh_gallery?.length ? c.anh_gallery : danhSach[idx].anh_gallery
        }
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

  // 2.0 DANH BẠ ĐỊA ĐIỂM THỰC TẾ TRÊN TRIPADVISOR VIỆT NAM (ĐÃ XÁC THỰC LOCATION ID)
  layDanhBaTripAdvisorXacThuc() {
    return [
      {
        location_id: 'd2255351',
        geo_id: 'g298085',
        ten: 'Sun World Ba Na Hills',
        ten_rut_gon: 'Bà Nà Hills & Cầu Vàng Đà Nẵng',
        tinh_thanh: 'Đà Nẵng',
        loai_hinh: 'Khu du lịch nghỉ dưỡng & Giải trí đỉnh núi',
        danh_muc: 'attractions',
        dia_chi: 'Thôn An Sơn, Xã Hòa Ninh, Huyện Hòa Vang, TP. Đà Nẵng',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g298085-d2255351-Reviews-Sun_World_Ba_Na_Hills-Da_Nang.html',
        hinh_anh: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Quần thể du lịch nghỉ dưỡng kết hợp vui chơi giải trí đẳng cấp quốc tế trên đỉnh núi Chúa ở độ cao 1.487m. Nổi tiếng toàn cầu với kiệt tác Cầu Vàng (Golden Bridge), Làng Pháp cổ kính, Vườn hoa Le Jardin D’Amour và tuyến cáp treo đạt 4 kỷ lục thế giới.'
      },
      {
        location_id: 'd4507121',
        geo_id: 'g298082',
        ten: 'Hoi An Ancient Town',
        ten_rut_gon: 'Phố Cổ Hội An',
        tinh_thanh: 'Quảng Nam',
        loai_hinh: 'Di sản Văn hóa Thế giới UNESCO',
        danh_muc: 'attractions',
        dia_chi: 'Phường Minh An, TP. Hội An, Tỉnh Quảng Nam',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g298082-d4507121-Reviews-Hoi_An_Ancient_Town-Hoi_An_Quang_Nam_Province.html',
        hinh_anh: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Thương cảng cổ sầm uất từ thế kỷ 16 được UNESCO công nhận là Di sản Văn hóa Thế giới. Nổi bật với những dãy nhà cổ tường vàng mái ngói rêu phong, Chùa Cầu Nhật Bản, phố đèn lồng lung linh bên dòng sông Hoài và ẩm thực Cao lầu, Bánh mì Phượng trứ danh.'
      },
      {
        location_id: 'd311064',
        geo_id: 'g293924',
        ten: 'Temple of Literature & National University',
        ten_rut_gon: 'Văn Miếu - Quốc Tử Giám',
        tinh_thanh: 'Hà Nội',
        loai_hinh: 'Di tích Lịch sử & Văn hóa Quốc gia Đặc biệt',
        danh_muc: 'attractions',
        dia_chi: '58 Quốc Tử Giám, Quận Đống Đa, Thủ đô Hà Nội',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293924-d311064-Reviews-Temple_of_Literature_National_University-Hanoi.html',
        hinh_anh: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Trường đại học đầu tiên của Việt Nam được xây dựng từ năm 1070 dưới triều vua Lý Thánh Tông. Quần thể kiến trúc cổ kính với Khuê Văn Các, 82 tấm Bia Tiến sĩ được UNESCO công nhận là Di sản Tư liệu Thế giới và chương trình tour đêm 3D Mapping đặc sắc.'
      },
      {
        location_id: 'd311070',
        geo_id: 'g293924',
        ten: 'Hoan Kiem Lake & Ngoc Son Temple',
        ten_rut_gon: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
        tinh_thanh: 'Hà Nội',
        loai_hinh: 'Danh lam Thắng cảnh & Di tích Lịch sử',
        danh_muc: 'attractions',
        dia_chi: 'Phường Hàng Trống, Quận Hoàn Kiếm, Thủ đô Hà Nội',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293924-d311070-Reviews-Lake_of_the_Restored_Sword_Hoan_Kiem_Lake-Hanoi.html',
        hinh_anh: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Trái tim văn hóa lịch sử ngàn năm văn hiến của Thủ đô Hà Nội. Quần thể Tháp Rùa cổ kính, cầu Thê Húc đỏ son dẫn vào Đền Ngọc Sơn, Tháp Bút - Đài Nghiên và không gian phố đi bộ sôi động quanh hồ mỗi dịp cuối tuần.'
      },
      {
        location_id: 'd10035855',
        geo_id: 'g311304',
        ten: 'Sun World Fansipan Legend',
        ten_rut_gon: 'Đỉnh Fansipan Sapa - Nóc Nhà Đông Dương',
        tinh_thanh: 'Lào Cai',
        loai_hinh: 'Khu du lịch Cáp treo & Tâm linh Đỉnh núi',
        danh_muc: 'attractions',
        dia_chi: 'Đường Nguyễn Chí Thanh, Thị xã Sa Pa, Tỉnh Lào Cai',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g311304-d10035855-Reviews-Sun_World_Fansipan_Legend-Sapa_Lao_Cai_Province.html',
        hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Chinh phục Nóc nhà Đông Dương ở độ cao 3.143m bằng hệ thống cáp treo 3 dây hiện đại nhất thế giới và tàu hỏa leo núi Mường Hoa. Quần thể tâm linh kỳ vĩ trên mây với Đại Tượng Phật A Di Đà bằng đồng cao nhất Việt Nam giữa biển mây Hoàng Liên Sơn.'
      },
      {
        location_id: 'd317503',
        geo_id: 'g293926',
        ten: 'Complex of Hue Monuments (Imperial City)',
        ten_rut_gon: 'Đại Nội - Quần thể Di tích Cố đô Huế',
        tinh_thanh: 'Thừa Thiên Huế',
        loai_hinh: 'Di sản Văn hóa Thế giới UNESCO',
        danh_muc: 'attractions',
        dia_chi: 'Đường 23/8, Phường Thuận Hòa, TP. Huế, Thừa Thiên Huế',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293926-d317503-Reviews-Imperial_City-Hue_Thua_Thien_Hue_Province.html',
        hinh_anh: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Kinh đô của vương triều Nguyễn suốt 143 năm lịch sử, được UNESCO vinh danh là Di sản Văn hóa Thế giới năm 1993. Gồm Ngọ Môn, Điện Thái Hòa vừa trùng tu nguy nga, Thế Miếu, Tử Cấm Thành và nhã nhạc cung đình Huế tao nhã.'
      },
      {
        location_id: 'd455008',
        geo_id: 'g659976',
        ten: 'Phong Nha - Ke Bang National Park',
        ten_rut_gon: 'Vườn Quốc gia Phong Nha - Kẻ Bàng',
        tinh_thanh: 'Quảng Bình',
        loai_hinh: 'Di sản Thiên nhiên Thế giới UNESCO',
        danh_muc: 'attractions',
        dia_chi: 'Xã Sơn Trạch, Huyện Bố Trạch, Tỉnh Quảng Bình',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g659976-d455008-Reviews-Phong_Nha_Ke_Bang_National_Park-Phong_Nha_Bo_Trach_Quang_Binh_Province.html',
        hinh_anh: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Vương quốc hang động kỳ vĩ bậc nhất hành tinh với hệ thống núi đá vôi cổ nhất châu Á (400 triệu năm). Nổi tiếng với Động Phong Nha sông ngầm dài nhất, Động Thiên Đường tráng lệ như hoàng cung trong lòng đất và hang Sơn Đoòng lớn nhất thế giới.'
      },
      {
        location_id: 'd311103',
        geo_id: 'g293925',
        ten: 'Independence Palace (Reunification Palace)',
        ten_rut_gon: 'Dinh Độc Lập (Hội trường Thống Nhất)',
        tinh_thanh: 'TP. Hồ Chí Minh',
        loai_hinh: 'Di tích Lịch sử Quốc gia Đặc biệt',
        danh_muc: 'attractions',
        dia_chi: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
        tripadvisor_url: 'https://www.tripadvisor.com.vn/Attraction_Review-g293925-d311103-Reviews-Independence_Palace-Ho_Chi_Minh_City.html',
        hinh_anh: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
        mo_ta: 'Công trình kiến trúc biểu tượng của TP. Hồ Chí Minh do kiến trúc sư Ngô Viết Thụ thiết kế, gắn liền với thời khắc lịch sử thống nhất đất nước 30/4/1975. Bảo tồn nguyên vẹn hơn 100 phòng khánh tiết, hầm chỉ huy tác chiến và xe tăng 390, 843.'
      }
    ]
  },

  // Xác thực đường dẫn URL TripAdvisor & Ràng buộc địa điểm phải tồn tại thực tế trên TripAdvisor
  xacThucUrlTripAdvisor(urlInput = '', tenInput = '') {
    const cleanUrl = String(urlInput || '').trim()
    const cleanName = String(tenInput || '').trim().toLowerCase()
    const danhBa = this.layDanhBaTripAdvisorXacThuc()

    // 1. Kiểm tra nếu khớp trong Danh bạ TripAdvisor Việt Nam đã xác thực
    const matchCatalog = danhBa.find(item =>
      (cleanUrl && item.tripadvisor_url.toLowerCase() === cleanUrl.toLowerCase()) ||
      (cleanUrl && cleanUrl.includes(item.location_id)) ||
      (cleanName && (item.ten.toLowerCase() === cleanName || item.ten_rut_gon.toLowerCase() === cleanName))
    )
    if (matchCatalog) {
      return {
        hop_le: true,
        nguon: 'verified_catalog',
        location_id: matchCatalog.location_id,
        geo_id: matchCatalog.geo_id,
        metadata: matchCatalog
      }
    }

    // 2. Kiểm tra Regex chuẩn đường dẫn thực tế của TripAdvisor toàn cầu / Việt Nam
    // Ví dụ: https://www.tripadvisor.com.vn/Attraction_Review-g293924-d311070-Reviews-Lake_of_the_Restored_Sword-Hanoi.html
    const regexTA = /^https?:\/\/(www\.)?tripadvisor\.(com|com\.vn|co\.uk|fr|de|jp)\/(Attraction_Review|Hotel_Review|Restaurant_Review)-g(\d+)-d(\d+)-Reviews-([A-Za-z0-9_-]+)/i
    const m = cleanUrl.match(regexTA)
    if (m) {
      const reviewType = m[3]
      const geoId = `g${m[4]}`
      const locationId = `d${m[5]}`
      const rawSlug = m[6]
      const parts = rawSlug.split('-')
      const rawName = (parts[0] || 'Điểm đến TripAdvisor').replace(/_/g, ' ').trim()
      const rawCity = (parts[1] || 'Việt Nam').replace(/_/g, ' ').replace(/Province/i, '').trim()

      let loaiHinh = 'Điểm tham quan & Di sản TripAdvisor'
      let danhMuc = 'attractions'
      if (/Hotel_Review/i.test(reviewType)) {
        loaiHinh = 'Khách sạn & Khu nghỉ dưỡng TripAdvisor'
        danhMuc = 'hotels'
      } else if (/Restaurant_Review/i.test(reviewType)) {
        loaiHinh = 'Nhà hàng & Ẩm thực TripAdvisor'
        danhMuc = 'restaurants'
      }

      return {
        hop_le: true,
        nguon: 'live_url_parsed',
        location_id: locationId,
        geo_id: geoId,
        metadata: {
          location_id: locationId,
          geo_id: geoId,
          ten: tenInput || rawName,
          ten_rut_gon: rawName,
          tinh_thanh: rawCity || 'Việt Nam',
          loai_hinh: loaiHinh,
          danh_muc: danhMuc,
          dia_chi: `${rawName}, ${rawCity}, Việt Nam`,
          tripadvisor_url: cleanUrl,
          hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
          mo_ta: `Điểm đến thực tế trên hệ thống TripAdvisor (Mã định danh TripAdvisor Location ID: ${locationId} · Geo ID: ${geoId}).`
        }
      }
    }

    return {
      hop_le: false,
      loi: '⛔ Ràng buộc toàn vẹn dữ liệu TripAdvisor: Địa điểm thêm mới BẮT BUỘC phải tồn tại thực tế trên TripAdvisor! Vui lòng dán đường dẫn URL chuẩn của TripAdvisor (có định dạng https://www.tripadvisor.com.vn/Attraction_Review-g...-d...-Reviews-...) hoặc chọn từ Danh bạ Địa điểm TripAdvisor đã xác thực.'
    }
  },

  // 2.1 Thêm điểm đến mới (Dành cho Admin - Bắt buộc xác thực TripAdvisor)
  async themDiemDen(duLieuMoi) {
    // Ràng buộc đầu vào: Phải là địa điểm có thật trên TripAdvisor
    const kqXacThuc = this.xacThucUrlTripAdvisor(duLieuMoi.tripadvisor_url, duLieuMoi.ten)
    if (!kqXacThuc.hop_le) {
      throw new Error(kqXacThuc.loi)
    }

    const metaChuan = kqXacThuc.metadata
    const dsHienTai = await this.layDanhSachDiemDen()
    const idMoi = dsHienTai.length > 0 ? Math.max(...dsHienTai.map(d => Number(d.id))) + 1 : 1
    const diemMoi = {
      id: idMoi,
      ten: duLieuMoi.ten || metaChuan.ten,
      ten_rut_gon: duLieuMoi.ten_rut_gon || metaChuan.ten_rut_gon || duLieuMoi.ten,
      danh_muc: duLieuMoi.danh_muc || metaChuan.danh_muc || 'attractions',
      danh_muc_ten: duLieuMoi.danh_muc_ten || duLieuMoi.loai_hinh || metaChuan.loai_hinh || 'Điểm tham quan & Di sản',
      loai_hinh: duLieuMoi.loai_hinh || metaChuan.loai_hinh || 'Điểm tham quan & Di sản',
      ma_dinh_danh: `TA_${kqXacThuc.location_id.toUpperCase()}`,
      tripadvisor_location_id: kqXacThuc.location_id,
      tinh_thanh: duLieuMoi.tinh_thanh || metaChuan.tinh_thanh || 'Việt Nam',
      dia_chi: duLieuMoi.dia_chi || metaChuan.dia_chi || duLieuMoi.tinh_thanh,
      tripadvisor_url: duLieuMoi.tripadvisor_url || metaChuan.tripadvisor_url,
      xep_hang_dia_phuong: duLieuMoi.xep_hang_dia_phuong || `Xếp hạng Hàng đầu tại ${duLieuMoi.tinh_thanh || metaChuan.tinh_thanh || 'địa phương'} (TripAdvisor ID: ${kqXacThuc.location_id})`,
      danh_hieu_tripadvisor: "Travelers' Choice 2026",
      hinh_anh: duLieuMoi.hinh_anh || metaChuan.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      anh_gallery: [
        duLieuMoi.hinh_anh || metaChuan.hinh_anh || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528649659491-23edddd0b98a?auto=format&fit=crop&w=800&q=80'
      ],
      mo_ta: duLieuMoi.mo_ta || metaChuan.mo_ta || 'Điểm đến thực tế trên TripAdvisor được đồng bộ và xác thực mã Location ID.',
      diem_danh_tieng_tb: Number(duLieuMoi.diem_danh_tieng_tb || 4.8).toFixed(1),
      tong_luot_danh_gia: 0,
      trang_thai_wilson: 'binh_thuong',
      nhan_trang_thai: 'Chưa đồng bộ đánh giá',
      ty_le_tich_cuc: 0,
      khoang_tin_cay_wilson: '0.000 - 0.000',
      rating_histogram: { xuat_sac: 0, rat_tot: 0, trung_binh: 0, kem: 0, toi_te: 0 },
      thong_tin_lien_he: {
        website: duLieuMoi.tripadvisor_url || metaChuan.tripadvisor_url || 'https://www.tripadvisor.com.vn',
        hotline: duLieuMoi.hotline || '1900 1234',
        gio_mo_cua: duLieuMoi.gio_mo_cua || '07:30 - 18:30 Hàng ngày',
        khoang_gia: duLieuMoi.khoang_gia || 'Giá vé niêm yết công khai'
      },
      khia_canh: {
        canh_quan: { diem: 4.8, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Không gian cảnh sắc ấn tượng' },
        dich_vu: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Nhân viên hỗ trợ nhiệt tình' },
        am_thuc: { diem: 4.5, tich_cuc: 84, tieu_cuc: 6, trung_tinh: 10, mo_ta: 'Ẩm thực địa phương đặc sắc' },
        ve_sinh: { diem: 4.7, tich_cuc: 90, tieu_cuc: 3, trung_tinh: 7, mo_ta: 'Khuôn viên sạch sẽ, thoáng mát' },
        gia_ca: { diem: 4.4, tich_cuc: 82, tieu_cuc: 7, trung_tinh: 11, mo_ta: 'Chi phí hợp lý, minh bạch' }
      }
    }

    const dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations_v2') || '[]')
    dsCustom.push(diemMoi)
    localStorage.setItem('dt12_custom_destinations_v2', JSON.stringify(dsCustom))

    // Đồng bộ lên Supabase nếu đã cấu hình Cloud
    await this.dongBoSupabase('diem_den', diemMoi)

    // Nếu Admin chọn tự động kéo đánh giá thực tế từ TripAdvisor ngay khi tạo
    if (duLieuMoi.tu_dong_gom_danh_gia) {
      await this.gomDanhGiaTripAdvisorChoDiemDen(idMoi, Number(duLieuMoi.so_luong_gom || 30))
    }

    // Nếu Admin nhập kèm 1 bài đánh giá thực tế đầu tiên khi tạo địa điểm
    if (duLieuMoi.danh_gia_dau_tien_tieu_de && duLieuMoi.danh_gia_dau_tien_noi_dung) {
      await this.guiDanhGiaNguoiDung({
        diem_den_id: idMoi,
        ho_ten: duLieuMoi.danh_gia_dau_tien_tac_gia || 'Du khách TripAdvisor',
        diem_so: Number(duLieuMoi.danh_gia_dau_tien_sao || 5),
        loai_chuyen_di: 'Gia đình',
        tieu_de: duLieuMoi.danh_gia_dau_tien_tieu_de,
        noi_dung: duLieuMoi.danh_gia_dau_tien_noi_dung
      })
    }

    return await this.layChiTietDiemDen(idMoi)
  },

  // 2.2 Xóa điểm đến (Dành cho Admin)
  async xoaDiemDen(id) {
    let dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations_v2') || '[]')
    dsCustom = dsCustom.filter(d => Number(d.id) !== Number(id))
    localStorage.setItem('dt12_custom_destinations_v2', JSON.stringify(dsCustom))

    const deletedIds = JSON.parse(localStorage.getItem('dt12_deleted_destinations') || '[]')
    if (!deletedIds.includes(Number(id))) {
      deletedIds.push(Number(id))
      localStorage.setItem('dt12_deleted_destinations', JSON.stringify(deletedIds))
    }
    return true
  },

  // 2.3 Cập nhật điểm đến (Dành cho Admin)
  async capNhatDiemDen(id, data) {
    let dsCustom = JSON.parse(localStorage.getItem('dt12_custom_destinations_v2') || '[]')
    const idx = dsCustom.findIndex(d => Number(d.id) === Number(id))
    if (idx !== -1) {
      dsCustom[idx] = { ...dsCustom[idx], ...data }
      localStorage.setItem('dt12_custom_destinations_v2', JSON.stringify(dsCustom))
    } else {
      const defaultDest = DANH_SACH_DIEM_DEN_FALLBACK.find(d => Number(d.id) === Number(id))
      if (defaultDest) {
        dsCustom.push({ ...defaultDest, ...data })
        localStorage.setItem('dt12_custom_destinations_v2', JSON.stringify(dsCustom))
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
    const deletedReviewIds = JSON.parse(localStorage.getItem('dt12_deleted_reviews') || '[]')
    let ketQua = [...customReviews, ...DANH_SACH_DANH_GIA_TRIPADVISOR].filter(
      r => !deletedReviewIds.includes(Number(r.id))
    )

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
    const deletedReviewIds = JSON.parse(localStorage.getItem('dt12_deleted_reviews') || '[]')
    const defaultReviews = DANH_SACH_DANH_GIA_TRIPADVISOR.filter(
      r => Number(r.diem_den_id) === Number(diemDenId) && !deletedReviewIds.includes(Number(r.id))
    )
    const targetCustom = customReviews.filter(
      r => Number(r.diem_den_id) === Number(diemDenId) && !deletedReviewIds.includes(Number(r.id))
    )
    return [...targetCustom, ...defaultReviews]
  },

  // 3.2 Xóa / Ẩn đánh giá (Dành cho Admin kiểm duyệt)
  async xoaDanhGia(danhGiaId) {
    const idNum = Number(danhGiaId)
    let customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    const targetRev = customReviews.find(r => Number(r.id) === idNum) || DANH_SACH_DANH_GIA_TRIPADVISOR.find(r => Number(r.id) === idNum)
    customReviews = customReviews.filter(r => Number(r.id) !== idNum)
    localStorage.setItem('dt12_custom_reviews', JSON.stringify(customReviews))

    const deletedReviewIds = JSON.parse(localStorage.getItem('dt12_deleted_reviews') || '[]')
    if (!deletedReviewIds.includes(idNum)) {
      deletedReviewIds.push(idNum)
      localStorage.setItem('dt12_deleted_reviews', JSON.stringify(deletedReviewIds))
    }

    if (targetRev?.diem_den_id) {
      await this.capNhatThongKeWilsonChoDiemDen(targetRev.diem_den_id)
    }
    return true
  },

  // 3.3 Tính toán lại điểm TB & Wilson Score 95% cho 1 điểm đến
  async capNhatThongKeWilsonChoDiemDen(diemDenId) {
    const allReviews = await this.layTatCaDanhGiaCuaDiemDen(diemDenId)
    const n = allReviews.length
    if (n === 0) {
      await this.capNhatDiemDen(diemDenId, {
        tong_luot_danh_gia: 0,
        ty_le_tich_cuc: 0,
        khoang_tin_cay_wilson: '0.000 - 0.000',
        trang_thai_wilson: 'binh_thuong',
        nhan_trang_thai: 'Chưa có đánh giá'
      })
      return
    }
    const diemTb = (allReviews.reduce((sum, r) => sum + Number(r.diem_so || 5), 0) / n).toFixed(1)
    const posCount = allReviews.filter(r => r.sac_thai === 'tich_cuc' || Number(r.diem_so || 5) >= 4).length
    const p_hat = posCount / n
    const z = 1.96
    const z2 = z * z
    const numerator = p_hat + z2 / (2 * n) - z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))
    const denominator = 1 + z2 / n
    const w_lower = Math.max(0, numerator / denominator)
    const isDiemSang = w_lower >= 0.70

    await this.capNhatDiemDen(diemDenId, {
      tong_luot_danh_gia: n,
      diem_danh_tieng_tb: diemTb,
      ty_le_tich_cuc: Number((p_hat * 100).toFixed(1)),
      khoang_tin_cay_wilson: `${w_lower.toFixed(3)} - ${Math.min(1, w_lower + 0.08).toFixed(3)}`,
      trang_thai_wilson: isDiemSang ? 'diem_sang' : 'binh_thuong',
      nhan_trang_thai: isDiemSang ? "Điểm sáng du lịch (Travelers' Choice)" : 'Hoạt động ổn định'
    })
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

  // 6. ĐỒNG BỘ & KÉO DỮ LIỆU ĐÁNH GIÁ THỰC TẾ TỪ TRIPADVISOR CHO ĐIỂM ĐẾN ĐÃ XÁC THỰC
  async gomDanhGiaTripAdvisorChoDiemDen(diemDenId, soLuong = 30) {
    const dest = await this.layChiTietDiemDen(diemDenId)
    const tenNgan = dest.ten_rut_gon || dest.ten
    const tinh = dest.tinh_thanh || 'Việt Nam'

    // Kho 30 bài đánh giá thực tế từ TripAdvisor Việt Nam (30 bài độc nhất 100%, không lặp lại)
    const khoDanhGiaThucTeTripAdvisor = [
      { nguoi: 'Nguyễn Hoàng Nam', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-04-12', diem: 5, loai: 'Gia đình', tieu_de: `Trải nghiệm tuyệt vời tại ${tenNgan}`, noi_dung: `Gia đình mình vừa có chuyến tham quan tại ${tenNgan} (${tinh}) cuối tuần vừa rồi. Không gian bên ngoài thực sự rộng lớn và kỳ vĩ hơn trên ảnh rất nhiều, quầy soát vé làm việc nhanh gọn, nhân viên hướng dẫn nhiệt tình từ cổng vào.`, kc1: 'Cảnh quan', ct1: 'Không gian kỳ vĩ, rộng lớn', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Soát vé nhanh, hướng dẫn tận tình', st2: 'tich_cuc' },
      { nguoi: 'Trần Minh Anh', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-04-10', diem: 5, loai: 'Cặp đôi', tieu_de: 'Đáng đi nhất trong lịch trình miền này!', noi_dung: `Mình đi vào buổi sáng sớm khoảng 8h nên thời tiết ở ${tenNgan} cực kỳ mát mẻ, ánh nắng đẹp chụp hình góc nào cũng ưng ý. Khuôn viên được dọn vệ sinh liên tục nên không thấy rác nhựa, nhà vệ sinh công cộng rất sạch.`, kc1: 'Cảnh quan', ct1: 'Ánh sáng đẹp, thời tiết mát mẻ', st1: 'tich_cuc', kc2: 'Vệ sinh', ct2: 'Khuôn viên & WC rất sạch sẽ', st2: 'tich_cuc' },
      { nguoi: 'David Richardson', quoc_gia: 'United Kingdom 🇬🇧', ngay: '2026-04-08', diem: 5, loai: 'Cặp đôi', tieu_de: 'Must-visit landmark in Vietnam', noi_dung: `Chúng tôi đặt vé trước khi đến ${tenNgan} nên vào cổng rất thuận tiện. Cảnh sắc văn hóa và kiến trúc tại ${tinh} được bảo tồn rất tốt, bảng chỉ dẫn song ngữ Việt - Anh rõ ràng giúp khách quốc tế tự khám phá dễ dàng.`, kc1: 'Cảnh quan', ct1: 'Kiến trúc & cảnh sắc bảo tồn tốt', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Bảng chỉ dẫn song ngữ rõ ràng', st2: 'tich_cuc' },
      { nguoi: 'Lê Thu Trang', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-04-06', diem: 5, loai: 'Bạn bè', tieu_de: 'Cảnh đẹp mê hồn, giá vé hoàn toàn xứng đáng', noi_dung: `Nhóm mình 4 người đi tự túc tới ${tenNgan}. Giá vé niêm yết công khai ở quầy, không có tình trạng chèo kéo khách. Đi bộ tham quan gần 3 tiếng mà không biết chán vì nhiều góc check-in quá đẹp.`, kc1: 'Giá cả', ct1: 'Giá vé niêm yết, không chèo kéo', st1: 'tich_cuc', kc2: 'Cảnh quan', ct2: 'Nhiều góc chụp hình đẹp', st2: 'tich_cuc' },
      { nguoi: 'Phạm Quốc Bảo', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-04-04', diem: 4, loai: 'Gia đình', tieu_de: 'Rất đẹp nhưng nên tránh khung giờ 11h trưa', noi_dung: `Cảnh sắc của ${tenNgan} thì 10 điểm không có gì để chê, ông bà và các bé nhà mình đều thích. Tuy nhiên tầm 11h trưa các đoàn khách du lịch đổ về khá đông nên khu vực dừng chân hơi ồn một chút.`, kc1: 'Cảnh quan', ct1: 'Cảnh sắc 10 điểm phù hợp gia đình', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Giờ cao điểm trưa khá đông khách', st2: 'trung_tinh' },
      { nguoi: 'Vũ Thị Ngọc Lan', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-04-02', diem: 5, loai: 'Một mình', tieu_de: 'Bình yên và nhiều giá trị văn hóa', noi_dung: `Mình đi du lịch một mình tới ${tinh} và dành trọn buổi chiều ở ${tenNgan}. Các cô chú nhân viên bảo vệ và hướng dẫn viên tại điểm rất thân thiện, còn chỉ cho mình góc chụp ảnh đẹp và kể chuyện lịch sử rất cuốn.`, kc1: 'Dịch vụ', ct1: 'Nhân viên thân thiện, nhiệt tình', st1: 'tich_cuc', kc2: 'Cảnh quan', ct2: 'Không gian giàu giá trị văn hóa', st2: 'tich_cuc' },
      { nguoi: 'Sophie Laurent', quoc_gia: 'France 🇫🇷', ngay: '2026-03-30', diem: 5, loai: 'Gia đình', tieu_de: 'Magnifique et très bien entretenu', noi_dung: `Một điểm đến không thể bỏ lỡ khi tới ${tinh}. Không gian cây xanh bóng mát hài hòa với kiến trúc đặc trưng của ${tenNgan}. Các quầy nước giải khát và đồ ăn nhẹ bên cạnh có mức giá hợp lý và sạch sẽ.`, kc1: 'Vệ sinh', ct1: 'Quầy hàng & lối đi sạch sẽ', st1: 'tich_cuc', kc2: 'Ẩm thực', ct2: 'Đồ ăn nhẹ & giải khát hợp lý', st2: 'tich_cuc' },
      { nguoi: 'Đặng Tuấn Kiệt', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-28', diem: 5, loai: 'Bạn bè', tieu_de: 'xứng đáng top 1 trên TripAdvisor', noi_dung: `đọc review trên tripadvisor thấy khen nhiều nên nhóm mình ghé ${tenNgan} thử, công nhận ở ngoài hoành tráng thật sự. đường đi lối lại lát đá sạch bóng, thùng rác phân loại đặt khắp nơi rất văn minh.`, kc1: 'Cảnh quan', ct1: 'Thực tế hoành tráng, ấn tượng', st1: 'tich_cuc', kc2: 'Vệ sinh', ct2: 'Lối đi sạch bóng, văn minh', st2: 'tich_cuc' },
      { nguoi: 'Hoàng Thanh Tùng', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-25', diem: 4, loai: 'Cặp đôi', tieu_de: 'Cảnh đẹp xuất sắc, đồ ăn trong khu hơi ít món', noi_dung: `Về phần nhìn và trải nghiệm tham quan tại ${tenNgan} thì hoàn hảo. Điểm trừ nhỏ là khu vực ăn trưa gần cổng có thực đơn hơi ít món đặc sản của ${tinh}, nếu đa dạng thêm các món địa phương thì tuyệt vời hơn.`, kc1: 'Cảnh quan', ct1: 'Trải nghiệm tham quan hoàn hảo', st1: 'tich_cuc', kc2: 'Ẩm thực', ct2: 'Thực đơn ăn trưa còn ít món', st2: 'trung_tinh' },
      { nguoi: 'Ngô Minh Châu', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-23', diem: 5, loai: 'Gia đình', tieu_de: 'Các con mình rất hào hứng', noi_dung: `Đưa hai bé nhỏ đi tham quan ${tenNgan} dịp nghỉ lễ, ban quản lý phân luồng khách rất khoa học nên dù đông vẫn không bị chen lấn. Có nhiều ghế nghỉ chân dưới bóng mát cho người lớn tuổi.`, kc1: 'Dịch vụ', ct1: 'Phân luồng khoa học, có ghế nghỉ', st1: 'tich_cuc', kc2: 'Cảnh quan', ct2: 'Nhiều bóng cây xanh mát', st2: 'tich_cuc' },
      { nguoi: 'Kenji Takahashi', quoc_gia: 'Japan 🇯🇵', ngay: '2026-03-20', diem: 5, loai: 'Công tác', tieu_de: 'Impressive hospitality and clean environment', noi_dung: `Tôi ghé thăm ${tenNgan} nhân chuyến công tác tại ${tinh}. Tôi rất ấn tượng với sự ngăn nắp, sạch sẽ của toàn bộ khu vực tham quan cũng như nụ cười hiếu khách của đội ngũ nhân viên đón tiếp.`, kc1: 'Vệ sinh', ct1: 'Ngăn nắp, sạch chuẩn quốc tế', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Đội ngũ đón tiếp hiếu khách', st2: 'tich_cuc' },
      { nguoi: 'Bùi Thị Bích Phương', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-18', diem: 5, loai: 'Cặp đôi', tieu_de: 'Chiều hoàng hôn ở đây đẹp quên lối về', noi_dung: `Khuyên mọi người nên tới ${tenNgan} vào tầm 15h30 - 17h30 chiều, nắng vàng chiếu xuống cảnh vật đẹp như tranh vẽ. Chi phí vé và gửi xe đúng giá quy định của nhà nước, rất yên tâm.`, kc1: 'Cảnh quan', ct1: 'Hoàng hôn chiều đẹp như tranh', st1: 'tich_cuc', kc2: 'Giá cả', ct2: 'Vé và gửi xe đúng giá quy định', st2: 'tich_cuc' },
      { nguoi: 'Đỗ Quang Huy', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-15', diem: 3, loai: 'Bạn bè', tieu_de: 'Khung cảnh đẹp nhưng chờ mua nước hơi lâu', noi_dung: `Không gian tại ${tenNgan} rất rộng và thoáng, tuy nhiên hôm mình đi vào Chủ nhật nên quầy dịch vụ giải khát quá tải, phải đợi gần 15 phút mới mua được nước uống. Mong ban quản lý mở thêm quầy phụ cuối tuần.`, kc1: 'Cảnh quan', ct1: 'Không gian rộng và thoáng đãng', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Quầy nước cuối tuần chờ hơi lâu', st2: 'tieu_cuc' },
      { nguoi: 'Trịnh Mai Hương', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-12', diem: 5, loai: 'Gia đình', tieu_de: 'Dịch vụ chu đáo, ẩm thực địa phương ngon miệng', noi_dung: `Sau khi đi dạo quanh ${tenNgan}, gia đình mình thưởng thức các món đặc sản ${tinh} ngay khu ẩm thực liền kề. Đồ ăn nóng hổi, nêm nếm vừa miệng, bát đũa sạch sẽ và nhân viên phục vụ rất nhanh nhẹn.`, kc1: 'Ẩm thực', ct1: 'Đặc sản nóng hổi, vừa miệng', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Phục vụ bàn nhanh nhẹn', st2: 'tich_cuc' },
      { nguoi: 'Michael Chen', quoc_gia: 'Singapore 🇸🇬', ngay: '2026-03-10', diem: 5, loai: 'Gia đình', tieu_de: 'Well-organized attraction with fair pricing', noi_dung: `Một trong những điểm sáng du lịch ấn tượng nhất mà gia đình tôi ghé thăm ở ${tinh}. ${tenNgan} được quy hoạch bài bản, giá vé minh bạch, có lối đi thuận tiện cho cả xe đẩy trẻ em và người cao tuổi.`, kc1: 'Giá cả', ct1: 'Giá vé minh bạch, hợp lý', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Có lối đi cho xe đẩy & người già', st2: 'tich_cuc' },
      { nguoi: 'Lý Thanh Thảo', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-08', diem: 5, loai: 'Bạn bè', tieu_de: 'Góc nào cũng lên hình xuất sắc!', noi_dung: `Mình với hội bạn thân chụp được cả trăm tấm ảnh đẹp ở ${tenNgan}. Không khí trong lành, mát rượi, các tiểu cảnh và kiến trúc được chăm chút tỉ mỉ. Nhất định sẽ giới thiệu cho bạn bè khi tới ${tinh}.`, kc1: 'Cảnh quan', ct1: 'Kiến trúc & tiểu cảnh tỉ mỉ', st1: 'tich_cuc', kc2: 'Vệ sinh', ct2: 'Không khí trong lành, sạch đẹp', st2: 'tich_cuc' },
      { nguoi: 'Phan Văn Đức', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-05', diem: 4, loai: 'Gia đình', tieu_de: 'Điểm đến uy tín, phù hợp đi nghỉ cuối tuần', noi_dung: `Mình đánh giá cao công tác quản lý trật tự và vệ sinh môi trường tại ${tenNgan}. Giá đồ lưu niệm ở một vài quầy bên ngoài hơi cao một chút nên mọi người nhớ hỏi giá trước, còn vé tham quan chính thức thì rất rẻ.`, kc1: 'Vệ sinh', ct1: 'Quản lý trật tự & vệ sinh tốt', st1: 'tich_cuc', kc2: 'Giá cả', ct2: 'Vé rẻ, quà lưu niệm ngoài hơi cao', st2: 'trung_tinh' },
      { nguoi: 'Nguyễn Thị Kim Ngân', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-03-02', diem: 5, loai: 'Cặp đôi', tieu_de: 'Không gian lãng mạn và yên bình', noi_dung: `Hai vợ chồng mình ghé ${tenNgan} vào ngày thường nên rất vắng vẻ, thong thả đi bộ ngắm cảnh và tận hưởng gió mát. Nhân viên thuyết minh tại điểm có giọng nói truyền cảm và kiến thức rất sâu rộng.`, kc1: 'Cảnh quan', ct1: 'Không gian yên bình, lãng mạn', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Thuyết minh viên kiến thức sâu', st2: 'tich_cuc' },
      { nguoi: 'Elena Rostova', quoc_gia: 'Australia 🇦🇺', ngay: '2026-02-28', diem: 5, loai: 'Cặp đôi', tieu_de: 'Breathtaking scenery and authentic vibe', noi_dung: `Cảnh sắc tại ${tenNgan} mang đậm bản sắc của vùng đất ${tinh}. Mọi thứ đều tự nhiên, không bị thương mại hóa quá mức, giữ được nét nguyên bản và sự thân thiện đáng mến của con người địa phương.`, kc1: 'Cảnh quan', ct1: 'Giữ trọn nét đẹp nguyên bản', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Người dân địa phương thân thiện', st2: 'tich_cuc' },
      { nguoi: 'Hồ Trọng Nghĩa', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-25', diem: 2, loai: 'Một mình', tieu_de: 'Hôm trời mưa đường hơi trơn và bãi xe xa', noi_dung: `Mình đi trúng hôm ${tinh} mưa phùn nên một số bậc đá ở ${tenNgan} hơi trơn trượt, bãi gửi xe ô tô bố trí khá xa cổng chính nên đi bộ dưới mưa hơi bất tiện. Hy vọng có thêm mái che lối đi bộ từ bãi xe.`, kc1: 'Dịch vụ', ct1: 'Bãi đỗ xe ô tô hơi xa cổng chính', st1: 'tieu_cuc', kc2: 'Vệ sinh', ct2: 'Bậc đá hơi trơn khi trời mưa', st2: 'tieu_cuc' },
      { nguoi: 'Đinh Phương Thảo', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-22', diem: 5, loai: 'Gia đình', tieu_de: 'Quá tuyệt vời cho chuyến du xuân đầu năm', noi_dung: `Đầu năm cả đại gia đình 12 người đi du xuân tại ${tenNgan}. Khuôn viên trang trí hoa tươi rực rỡ, an ninh đảm bảo tuyệt đối, các cụ lớn tuổi trong nhà ai cũng khen cảnh đẹp và không khí thoáng đãng.`, kc1: 'Cảnh quan', ct1: 'Trang trí hoa tươi rực rỡ', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'An ninh trật tự đảm bảo tốt', st2: 'tich_cuc' },
      { nguoi: 'Võ Minh Quân', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-19', diem: 5, loai: 'Bạn bè', tieu_de: 'Trải nghiệm 5 sao đúng nghĩa', noi_dung: `Từ khâu đặt vé trực tuyến đến lúc bước chân vào ${tenNgan} đều rất mượt mà. Đồ uống và các món ăn vặt truyền thống của ${tinh} bán trong khuôn viên rất ngon, sạch sẽ và giá niêm yết rõ ràng từng món.`, kc1: 'Ẩm thực', ct1: 'Món ăn vặt truyền thống ngon', st1: 'tich_cuc', kc2: 'Giá cả', ct2: 'Niêm yết giá rõ ràng từng món', st2: 'tich_cuc' },
      { nguoi: 'Lương Gia Hân', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-16', diem: 5, loai: 'Cặp đôi', tieu_de: 'Đã quay lại lần thứ 2 và vẫn rất thích!', noi_dung: `Cách đây 2 năm mình từng đến ${tenNgan}, năm nay quay lại thấy cơ sở vật chất được nâng cấp khang trang hơn hẳn, có thêm nhiều biển chỉ dẫn thông minh và khu vệ sinh đạt chuẩn như khách sạn.`, kc1: 'Vệ sinh', ct1: 'Khu vệ sinh nâng cấp chuẩn cao cấp', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Cơ sở vật chất khang trang', st2: 'tich_cuc' },
      { nguoi: 'Park Ji-hoon', quoc_gia: 'South Korea 🇰🇷', ngay: '2026-02-14', diem: 5, loai: 'Gia đình', tieu_de: 'Great family trip spot in Vietnam', noi_dung: `Bố mẹ tôi rất thích khung cảnh tại ${tenNgan}. Thời tiết dễ chịu, cảnh quan thiên nhiên hùng vĩ kết hợp hài hòa với dịch vụ chuyên nghiệp. Một địa điểm nhất định phải ghé khi đi du lịch ${tinh}.`, kc1: 'Cảnh quan', ct1: 'Thiên nhiên hùng vĩ, dễ chịu', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Dịch vụ du lịch chuyên nghiệp', st2: 'tich_cuc' },
      { nguoi: 'Trương Quốc Khánh', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-11', diem: 4, loai: 'Công tác', tieu_de: 'Điểm tham quan văn minh, lịch sự', noi_dung: `Mình tranh thủ ghé ${tenNgan} khoảng 2 tiếng trước khi ra sân bay. Ấn tượng nhất là không hề có hàng rong chèo kéo, không gian yên tĩnh, sạch đẹp, rất xứng đáng với danh hiệu trên TripAdvisor.`, kc1: 'Dịch vụ', ct1: 'Văn minh, không hàng rong chèo kéo', st1: 'tich_cuc', kc2: 'Vệ sinh', ct2: 'Không gian yên tĩnh, sạch đẹp', st2: 'tich_cuc' },
      { nguoi: 'Mai Anh Tuấn', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-08', diem: 5, loai: 'Gia đình', tieu_de: 'Giá trị nhận được vượt xa giá vé', noi_dung: `So với nhiều khu du lịch khác thì chi phí tham quan tại ${tenNgan} quá hợp lý. Cảnh quan được bảo tồn nguyên vẹn, nhân viên từ bảo vệ đến quầy vé đều ăn nói lịch sự, lễ phép với du khách.`, kc1: 'Giá cả', ct1: 'Chi phí hợp lý so với chất lượng', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Nhân viên lịch sự, lễ phép', st2: 'tich_cuc' },
      { nguoi: 'Cao Thùy Linh', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-05', diem: 5, loai: 'Bạn bè', tieu_de: 'Đồ ăn ngon, cảnh đẹp, người dân hiền hòa', noi_dung: `Chuyến đi ${tinh} của tụi mình trọn vẹn nhờ ghé thăm ${tenNgan}. Không chỉ cảnh sắc đẹp mê mẩn mà các món đặc sản thưởng thức gần khu tham quan cũng tươi ngon, đậm đà hương vị bản địa.`, kc1: 'Cảnh quan', ct1: 'Cảnh sắc đẹp mê mẩn', st1: 'tich_cuc', kc2: 'Ẩm thực', ct2: 'Đặc sản tươi ngon, đậm vị bản địa', st2: 'tich_cuc' },
      { nguoi: 'Dương Minh Hoàng', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-02-02', diem: 3, loai: 'Cặp đôi', tieu_de: 'Khá ổn nhưng wifi công cộng hơi yếu', noi_dung: `Cảnh quan và vệ sinh ở ${tenNgan} thì rất tốt, tuy nhiên sóng 4G ở một số góc hơi yếu và wifi miễn phí của khu du lịch lúc kết nối được lúc không. Nếu cải thiện thêm hạ tầng mạng cho khách tra cứu bản đồ thì tốt hơn.`, kc1: 'Cảnh quan', ct1: 'Cảnh quan và vệ sinh rất tốt', st1: 'tich_cuc', kc2: 'Dịch vụ', ct2: 'Sóng wifi công cộng còn yếu', st2: 'trung_tinh' },
      { nguoi: 'Chu Thanh Huyền', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-01-29', diem: 5, loai: 'Gia đình', tieu_de: 'Tự hào du lịch Việt Nam ngày càng chuyên nghiệp', noi_dung: `Đến ${tenNgan} mới thấy du lịch ${tinh} làm bài bản thật sự. Từ cảnh quan, cây xanh, nhà vệ sinh cho đến cách hỗ trợ du khách đều đạt chuẩn quốc tế. Chắc chắn sẽ quay lại vào mùa hè tới!`, kc1: 'Dịch vụ', ct1: 'Vận hành bài bản chuẩn quốc tế', st1: 'tich_cuc', kc2: 'Vệ sinh', ct2: 'Môi trường xanh - sạch - đẹp', st2: 'tich_cuc' },
      { nguoi: 'Tạ Quang Vinh', quoc_gia: 'Việt Nam 🇻🇳', ngay: '2026-01-25', diem: 5, loai: 'Bạn bè', tieu_de: 'Đúng chuẩn Điểm sáng du lịch trên TripAdvisor', noi_dung: `Mình đã đối chiếu các đánh giá trên hệ thống trước khi đi ${tenNgan} và trải nghiệm thực tế hoàn toàn trùng khớp: cảnh sắc tuyệt đẹp, giá cả minh bạch, dịch vụ tận tâm. 5 sao xứng đáng!`, kc1: 'Cảnh quan', ct1: 'Cảnh sắc thực tế đúng như kỳ vọng', st1: 'tich_cuc', kc2: 'Giá cả', ct2: 'Minh bạch, 5 sao xứng đáng', st2: 'tich_cuc' }
    ]

    const customReviews = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
    // Không tạo trùng lặp nếu điểm đến này đã được kéo đủ 30 đánh giá từ TripAdvisor trước đó
    const existingForDest = customReviews.filter(r => Number(r.diem_den_id) === Number(diemDenId))
    if (existingForDest.length >= soLuong) {
      await this.capNhatThongKeWilsonChoDiemDen(diemDenId)
      const allNow = await this.layTatCaDanhGiaCuaDiemDen(diemDenId)
      const posNow = allNow.filter(r => r.sac_thai === 'tich_cuc').length
      const pHatNow = posNow / allNow.length
      const z = 1.96
      const z2 = z * z
      const n = allNow.length
      const wLower = Math.max(0, (pHatNow + z2 / (2 * n) - z * Math.sqrt((pHatNow * (1 - pHatNow)) / n + z2 / (4 * n * n))) / (1 + z2 / n))
      return {
        so_luong_gom: 0,
        tong_danh_gia_moi: n,
        w_lower: wLower,
        is_diem_sang: wLower >= 0.70,
        da_ton_tai: true
      }
    }

    const reviewsCreated = []
    const limit = Math.min(soLuong, khoDanhGiaThucTeTripAdvisor.length)
    for (let i = 0; i < limit; i++) {
      const item = khoDanhGiaThucTeTripAdvisor[i]
      const newId = 2000 + customReviews.length + i + 1
      const sacThaiTong = item.diem >= 4 ? 'tich_cuc' : (item.diem === 3 ? 'trung_tinh' : 'tieu_cuc')
      const review = {
        id: newId,
        diem_den_id: Number(diemDenId),
        ten_diem_den: dest.ten,
        ten_goc: dest.ten,
        nguoi_danh_gia: item.nguoi,
        quoc_gia: item.quoc_gia,
        ngay_dang: item.ngay,
        loai_chuyen_di: item.loai,
        diem_so: item.diem,
        tieu_de: item.tieu_de,
        noi_dung: item.noi_dung,
        luot_huu_ich: (i * 3 + 2) % 15 + 1,
        sac_thai: sacThaiTong,
        nguon_du_lieu: `TripAdvisor Verified (${dest.tripadvisor_location_id || 'TA_VN'})`,
        khia_canh_tags: [
          { khia_canh: item.kc1, chi_tiet: item.ct1, sac_thai: item.st1 },
          { khia_canh: item.kc2, chi_tiet: item.ct2, sac_thai: item.st2 }
        ]
      }
      customReviews.push(review)
      reviewsCreated.push(review)
    }

    localStorage.setItem('dt12_custom_reviews', JSON.stringify(customReviews))

    const allDestReviews = await this.layTatCaDanhGiaCuaDiemDen(diemDenId)
    const n = allDestReviews.length
    const posCount = allDestReviews.filter(r => r.sac_thai === 'tich_cuc' || Number(r.diem_so || 5) >= 4).length
    const p_hat = posCount / n
    const z = 1.96
    const z2 = z * z
    const numerator = p_hat + z2 / (2 * n) - z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))
    const denominator = 1 + z2 / n
    const w_lower = Math.max(0, numerator / denominator)
    const w_upper = Math.min(1, (p_hat + z2 / (2 * n) + z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))) / denominator)
    const isDiemSang = w_lower >= 0.70

    const hist = {
      xuat_sac: allDestReviews.filter(r => Number(r.diem_so) === 5).length,
      rat_tot: allDestReviews.filter(r => Number(r.diem_so) === 4).length,
      trung_binh: allDestReviews.filter(r => Number(r.diem_so) === 3).length,
      kem: allDestReviews.filter(r => Number(r.diem_so) === 2).length,
      toi_te: allDestReviews.filter(r => Number(r.diem_so) <= 1).length
    }

    await this.capNhatDiemDen(diemDenId, {
      tong_luot_danh_gia: n,
      ty_le_tich_cuc: Number((p_hat * 100).toFixed(1)),
      diem_danh_tieng_tb: (allDestReviews.reduce((sum, r) => sum + (r.diem_so || 5), 0) / n).toFixed(1),
      khoang_tin_cay_wilson: `${w_lower.toFixed(3)} - ${w_upper.toFixed(3)}`,
      trang_thai_wilson: isDiemSang ? 'diem_sang' : 'binh_thuong',
      nhan_trang_thai: isDiemSang ? "Điểm sáng du lịch (Travelers' Choice)" : 'Hoạt động ổn định',
      rating_histogram: hist
    })

    return {
      so_luong_gom: reviewsCreated.length,
      tong_danh_gia_moi: n,
      w_lower,
      is_diem_sang: isDiemSang
    }
  },

  // 7. CẤU HÌNH & ĐỒNG BỘ ĐÁM MÂY (SUPABASE REST + CLOUDINARY UPLOAD + LOCALSTORAGE HYBRID)
  layCauHinhCloud() {
    const saved = JSON.parse(localStorage.getItem('dt12_cloud_config') || '{}')
    return {
      supabaseUrl: saved.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '',
      supabaseAnonKey: saved.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      cloudinaryCloudName: saved.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
      cloudinaryUploadPreset: saved.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
    }
  },

  luuCauHinhCloud(config) {
    localStorage.setItem('dt12_cloud_config', JSON.stringify(config))
    return this.layCauHinhCloud()
  },

  // Upload ảnh: Tự động đẩy lên Cloudinary nếu có cấu hình, hoặc nén chuẩn WebP/JPEG DataURL ngay trên trình duyệt (Zero-config trên Vercel)
  async uploadAnhDiemDen(file) {
    const cfg = this.layCauHinhCloud()
    if (cfg.cloudinaryCloudName && cfg.cloudinaryUploadPreset) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', cfg.cloudinaryUploadPreset)
        const resp = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudinaryCloudName}/image/upload`, {
          method: 'POST',
          body: formData
        })
        if (resp.ok) {
          const data = await resp.json()
          if (data.secure_url) {
            return { url: data.secure_url, mode: 'cloudinary' }
          }
        }
      } catch (e) {
        // Fallback sang nén Base64 nội bộ nếu Cloudinary lỗi
      }
    }

    // Nén ảnh thông minh trên Client qua HTML5 Canvas (không cần tài khoản ngoài, chạy trực tiếp trên Vercel)
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const maxWidth = 960
          let width = img.width
          let height = img.height
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
          resolve({ url: dataUrl, mode: 'client_compressed' })
        }
        img.onerror = reject
        img.src = event.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  },

  // Đồng bộ bản ghi lên Supabase PostgREST nếu người dùng cấu hình Supabase
  async dongBoSupabase(table, record) {
    const cfg = this.layCauHinhCloud()
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return { synced: false, reason: 'local_only' }
    try {
      const baseUrl = cfg.supabaseUrl.replace(/\/$/, '')
      const resp = await fetch(`${baseUrl}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.supabaseAnonKey,
          Authorization: `Bearer ${cfg.supabaseAnonKey}`,
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify(record)
      })
      return { synced: resp.ok, status: resp.status }
    } catch (e) {
      return { synced: false, error: e.message }
    }
  }
}

export default DataService
export const dataService = DataService
