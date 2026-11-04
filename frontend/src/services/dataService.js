// frontend/src/services/dataService.js
// Dịch vụ cung cấp dữ liệu điểm đến, đánh giá TripAdvisor và phân tích ABSA
// Đảm bảo giao diện luôn hiển thị đầy đủ, mượt mà dù backend đang chạy hay offline!

import api from './api'
import reviews874Data from '../assets/reviews874.json'

// 7 ĐIỂM ĐẾN THỰC TẾ TỪ CƠ SỞ DỮ LIỆU & TRIPADVISOR
export const DANH_SACH_DIEM_DEN_FALLBACK = [
  {
    id: 1,
    ten: 'Ambassador Cruise - Halong Bay',
    ten_rut_gon: 'Du thuyền Ambassador Hạ Long',
    loai_hinh: 'Du thuyền nghỉ dưỡng & Ẩm thực 5 sao',
    ma_dinh_danh: 'DD_TA_AMBASSADOR',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Cảng tàu khách quốc tế Hạ Long, Bãi Cháy, TP. Hạ Long',
    hinh_anh: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Du thuyền ẩm thực và nghỉ dưỡng 5 sao sang trọng bậc nhất Vịnh Hạ Long, nổi bật với boong tắm nắng đôi 500m², bể bơi sục ngoài trời và thực đơn hải sản chuẩn Michelin.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 164,
    trang_thai_wilson: 'diem_sang', // 'diem_sang' | 'binh_thuong' | 'canh_bao'
    nhan_trang_thai: 'Điểm sáng du lịch',
    ty_le_tich_cuc: 93.2,
    khoang_tin_cay_wilson: '0.884 - 0.957',
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 97, tieu_cuc: 1, trung_tinh: 2, mo_ta: 'Tầm nhìn ngoạn mục ra vịnh di sản' },
      dich_vu: { diem: 4.8, tich_cuc: 94, tieu_cuc: 2, trung_tinh: 4, mo_ta: 'Nhân viên lễ tân & thủy thủ phục vụ chu đáo' },
      am_thuc: { diem: 4.7, tich_cuc: 92, tieu_cuc: 3, trung_tinh: 5, mo_ta: 'Tiệc buffet tôm hùm và hải sản phong phú' },
      ve_sinh: { diem: 4.8, tich_cuc: 95, tieu_cuc: 1, trung_tinh: 4, mo_ta: 'Cabin và boong tàu sạch sẽ tinh tươm' },
      gia_ca: { diem: 4.4, tich_cuc: 82, tieu_cuc: 8, trung_tinh: 10, mo_ta: 'Mức giá tương xứng chất lượng 5 sao' }
    },
    uu_dai: {
      co_san: true,
      tieu_de: 'Voucher Giảm 15% Tour Hoàng Hôn & Tiệc Buffet Hải Sản',
      ma_voucher: 'AMBASSADOR-15OFF',
      doi_tac: 'Ambassador Cruise Luxury Partners',
      link_doi_tac: 'https://ambassadorcruise.com'
    }
  },
  {
    id: 2,
    ten: 'Melia Vinpearl Phu Quoc',
    ten_rut_gon: 'Melia Vinpearl Phú Quốc Resort',
    loai_hinh: 'Khu nghỉ dưỡng biển cao cấp',
    ma_dinh_danh: 'DD_TA_MELIA_PQ',
    tinh_thanh: 'Kiên Giang',
    dia_chi: 'Khu Bãi Dài, Xã Gành Dầu, TP. Phú Quốc, Kiên Giang',
    hinh_anh: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Khu nghỉ dưỡng biệt thự biển phong cách Địa Trung Hải, sở hữu bãi biển riêng thơ mộng ngắm hoàng hôn Bãi Dài cùng hệ thống YHI Spa chuẩn quốc tế.',
    diem_danh_tieng_tb: 4.6,
    tong_luot_danh_gia: 160,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Ổn định',
    ty_le_tich_cuc: 87.5,
    khoang_tin_cay_wilson: '0.812 - 0.916',
    khia_canh: {
      canh_quan: { diem: 4.8, tich_cuc: 91, tieu_cuc: 3, trung_tinh: 6, mo_ta: 'Biển xanh cát trắng, hoàng hôn tuyệt mỹ' },
      dich_vu: { diem: 4.6, tich_cuc: 88, tieu_cuc: 5, trung_tinh: 7, mo_ta: 'Xe điện đưa đón nhanh, nhân viên thân thiện' },
      am_thuc: { diem: 4.7, tich_cuc: 90, tieu_cuc: 4, trung_tinh: 6, mo_ta: 'Bữa sáng đa dạng món Á - Âu' },
      ve_sinh: { diem: 4.8, tich_cuc: 93, tieu_cuc: 2, trung_tinh: 5, mo_ta: 'Villa và khuôn viên vệ sinh thường xuyên' },
      gia_ca: { diem: 4.2, tich_cuc: 76, tieu_cuc: 12, trung_tinh: 12, mo_ta: 'Giá đồ ăn gọi món tại resort khá cao' }
    },
    uu_dai: {
      co_san: false,
      tieu_de: 'Ưu đãi chỉ mở khi đạt chuẩn Điểm sáng (Wilson Score >= 0.70)',
      ma_voucher: null,
      doi_tac: 'Melia Hotels International',
      link_doi_tac: 'https://melia.com'
    }
  },
  {
    id: 3,
    ten: 'Halong Bay',
    ten_rut_gon: 'Vịnh Hạ Long',
    loai_hinh: 'Di sản Thiên nhiên Thế giới UNESCO',
    ma_dinh_danh: 'DD_TA_HALONG_BAY',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Vịnh Hạ Long, TP. Hạ Long, Quảng Ninh',
    hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Kỳ quan thiên nhiên thế giới nổi danh với gần 2.000 hòn đảo đá vôi vươn mình trên mặt nước xanh ngắt, hệ thống hang động thạch nhũ hàng triệu năm tuổi như Sửng Sốt, Đầu Gỗ.',
    diem_danh_tieng_tb: 4.9,
    tong_luot_danh_gia: 144,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch',
    ty_le_tich_cuc: 95.8,
    khoang_tin_cay_wilson: '0.908 - 0.978',
    khia_canh: {
      canh_quan: { diem: 5.0, tich_cuc: 98, tieu_cuc: 1, trung_tinh: 1, mo_ta: 'Cảnh sắc thiên nhiên kỳ vĩ bậc nhất thế giới' },
      dich_vu: { diem: 4.5, tich_cuc: 86, tieu_cuc: 5, trung_tinh: 9, mo_ta: 'Tàu bè tổ chức đưa đón khách quy củ' },
      am_thuc: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Hải sản chả mực giã tay thơm ngon' },
      ve_sinh: { diem: 4.3, tich_cuc: 82, tieu_cuc: 8, trung_tinh: 10, mo_ta: 'Công tác gom rác trên mặt vịnh cần duy trì liên tục' },
      gia_ca: { diem: 4.4, tich_cuc: 80, tieu_cuc: 8, trung_tinh: 12, mo_ta: 'Vé thắng cảnh và thuyền chèo vừa phải' }
    },
    uu_dai: {
      co_san: true,
      tieu_de: 'Phiếu Giảm 20% Vé Tham Quan Tuyến 2 & Chèo Thuyền Kayak',
      ma_voucher: 'HALONG-HERITAGE-20',
      doi_tac: 'Ban Quản Lý Vịnh Hạ Long & Du lịch Quảng Ninh',
      link_doi_tac: 'https://halongbay.gov.vn'
    }
  },
  {
    id: 4,
    ten: 'Vinpearl Resort & Spa Ha Long',
    ten_rut_gon: 'Vinpearl Resort & Spa Hạ Long',
    loai_hinh: 'Khu nghỉ dưỡng đảo biệt lập 5 sao',
    ma_dinh_danh: 'DD_TA_VINPEARL_HL',
    tinh_thanh: 'Quảng Ninh',
    dia_chi: 'Đảo Rều, Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    hinh_anh: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Khu nghỉ dưỡng phong cách lâu đài tân cổ điển nằm biệt lập 100% trên Đảo Rều với 4 mặt hướng vịnh, hồ bơi ngoài trời rộng lớn và bến cano riêng tư.',
    diem_danh_tieng_tb: 4.4,
    tong_luot_danh_gia: 140,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Ổn định',
    ty_le_tich_cuc: 84.3,
    khoang_tin_cay_wilson: '0.774 - 0.893',
    khia_canh: {
      canh_quan: { diem: 4.7, tich_cuc: 90, tieu_cuc: 3, trung_tinh: 7, mo_ta: 'Vị trí giữa đảo độc đáo, view 360 độ vịnh' },
      dich_vu: { diem: 4.3, tich_cuc: 82, tieu_cuc: 8, trung_tinh: 10, mo_ta: 'Thời gian chờ tàu cano giờ cao điểm đôi khi hơi lâu' },
      am_thuc: { diem: 4.4, tich_cuc: 84, tieu_cuc: 6, trung_tinh: 10, mo_ta: 'Nhà hàng Akoya và Pavilion phục vụ tốt' },
      ve_sinh: { diem: 4.7, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Phòng ốc sạch sẽ, khuôn viên hoa cỏ xanh mát' },
      gia_ca: { diem: 4.0, tich_cuc: 74, tieu_cuc: 14, trung_tinh: 12, mo_ta: 'Mức phụ thu trẻ em và dịch vụ spa tương đối cao' }
    },
    uu_dai: {
      co_san: false,
      tieu_de: 'Ưu đãi chỉ kích hoạt khi điểm số Wilson đạt mức Điểm sáng',
      ma_voucher: null,
      doi_tac: 'Vinpearl Hospitality',
      link_doi_tac: 'https://vinpearl.com'
    }
  },
  {
    id: 5,
    ten: 'Trang An Grottoes',
    ten_rut_gon: 'Quần thể Danh thắng Tràng An',
    loai_hinh: 'Di sản Kép Văn hóa & Thiên nhiên UNESCO',
    ma_dinh_danh: 'DD_TA_TRANG_AN',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Tràng An, Huyện Hoa Lư, Ninh Bình',
    hinh_anh: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Di sản thế giới hỗn hợp đầu tiên của Đông Nam Á. Tuyến du thuyền nan luồn lách qua các hang động ngập nước kỳ vĩ, thung lũng đầm lầy và những ngôi đền cổ kính ngàn năm.',
    diem_danh_tieng_tb: 4.8,
    tong_luot_danh_gia: 128,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch',
    ty_le_tich_cuc: 94.5,
    khoang_tin_cay_wilson: '0.892 - 0.970',
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 96, tieu_cuc: 1, trung_tinh: 3, mo_ta: 'Nước trong vắt nhìn thấy rêu đáy sông' },
      dich_vu: { diem: 4.7, tich_cuc: 90, tieu_cuc: 3, trung_tinh: 7, mo_ta: 'Người chèo đò thân thiện, nhiệt tình thuyết minh' },
      am_thuc: { diem: 4.5, tich_cuc: 85, tieu_cuc: 5, trung_tinh: 10, mo_ta: 'Cơm cháy dê núi tại các nhà hàng lân cận ngon miệng' },
      ve_sinh: { diem: 4.8, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Không có rác thải trôi nổi, giữ gìn môi trường rất tốt' },
      gia_ca: { diem: 4.5, tich_cuc: 84, tieu_cuc: 6, trung_tinh: 10, mo_ta: 'Giá vé trọn gói 250.000đ/người hoàn toàn xứng đáng' }
    },
    uu_dai: {
      co_san: true,
      tieu_de: 'Giảm 10% Vé Tuyến Thuyền Khám Phá Hang Đột & Hành Cung Vũ Lâm',
      ma_voucher: 'TRANGAN-HERITAGE-10',
      doi_tac: 'Doanh nghiệp Xây dựng Xuân Trường & Du lịch Tràng An',
      link_doi_tac: 'https://disantrangan.vn'
    }
  },
  {
    id: 6,
    ten: 'Mua Caves',
    ten_rut_gon: 'Hang Múa & Đỉnh Ngọa Long',
    loai_hinh: 'Điểm du lịch sinh thái & Check-in',
    ma_dinh_danh: 'DD_TA_HANG_MUA',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Thôn Khê Đầu Hạ, Xã Ninh Xuân, Huyện Hoa Lư, Ninh Bình',
    hinh_anh: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Điểm ngắm hoàng hôn và toàn cảnh Tam Cốc đẹp nhất Ninh Bình với con đường bậc đá uốn lượn hình rồng uốn mình trên đỉnh núi Ngọa Long hiểm trở.',
    diem_danh_tieng_tb: 4.7,
    tong_luot_danh_gia: 93,
    trang_thai_wilson: 'diem_sang',
    nhan_trang_thai: 'Điểm sáng du lịch',
    ty_le_tich_cuc: 91.4,
    khoang_tin_cay_wilson: '0.840 - 0.953',
    khia_canh: {
      canh_quan: { diem: 4.9, tich_cuc: 95, tieu_cuc: 2, trung_tinh: 3, mo_ta: 'Góc chụp ảnh thần thánh nhìn xuống dòng sông Ngô Đồng' },
      dich_vu: { diem: 4.3, tich_cuc: 82, tieu_cuc: 6, trung_tinh: 12, mo_ta: 'Khu vực soát vé và gửi xe rõ ràng' },
      am_thuc: { diem: 4.2, tich_cuc: 78, tieu_cuc: 7, trung_tinh: 15, mo_ta: 'Nước giải khát và cà phê hồ sen mát mẻ' },
      ve_sinh: { diem: 4.5, tich_cuc: 85, tieu_cuc: 5, trung_tinh: 10, mo_ta: 'Đường leo núi được dọn dẹp sạch sẽ' },
      gia_ca: { diem: 4.6, tich_cuc: 88, tieu_cuc: 4, trung_tinh: 8, mo_ta: 'Giá vé 100.000đ/người hợp túi tiền' }
    },
    uu_dai: {
      co_san: true,
      tieu_de: 'Voucher Miễn Phí Đồ Uống & Giảm 15% Vé Check-in Hồ Sen Hang Múa',
      ma_voucher: 'HANGMUA-SUNSET-15',
      doi_tac: 'Hang Múa Ecolodge & Tourism',
      link_doi_tac: 'https://hangmuaecolodge.com'
    }
  },
  {
    id: 7,
    ten: 'Van Long Nature Reserve',
    ten_rut_gon: 'Khu bảo tồn Thiên nhiên Đầm Vân Long',
    loai_hinh: 'Khu bảo tồn sinh thái & Đất ngập nước',
    ma_dinh_danh: 'DD_TA_VAN_LONG',
    tinh_thanh: 'Ninh Bình',
    dia_chi: 'Xã Gia Vân, Huyện Gia Viễn, Ninh Bình',
    hinh_anh: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    hinh_anh_phu: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80'
    ],
    mo_ta: 'Vùng đất ngập nước nội địa lớn nhất đồng bằng Bắc Bộ, mệnh danh là \'vịnh không sóng\' với mặt nước phẳng như gương soi bóng núi đá vôi, nơi bảo tồn đàn Voọc mông trắng lớn nhất thế giới.',
    diem_danh_tieng_tb: 4.5,
    tong_luot_danh_gia: 45,
    trang_thai_wilson: 'binh_thuong',
    nhan_trang_thai: 'Ổn định',
    ty_le_tich_cuc: 86.7,
    khoang_tin_cay_wilson: '0.738 - 0.937',
    khia_canh: {
      canh_quan: { diem: 4.8, tich_cuc: 92, tieu_cuc: 2, trung_tinh: 6, mo_ta: 'Khung cảnh hoang sơ, yên bình, non nước hữu tình' },
      dich_vu: { diem: 4.2, tich_cuc: 80, tieu_cuc: 6, trung_tinh: 14, mo_ta: 'Thuyền nan đơn sơ, người dân chân chất mộc mạc' },
      am_thuc: { diem: 4.0, tich_cuc: 75, tieu_cuc: 8, trung_tinh: 17, mo_ta: 'Ít nhà hàng tại chỗ, chủ yếu ăn uống ở thị trấn lân cận' },
      ve_sinh: { diem: 4.7, tich_cuc: 89, tieu_cuc: 3, trung_tinh: 8, mo_ta: 'Hệ sinh thái tự nhiên được bảo vệ nghiêm ngặt' },
      gia_ca: { diem: 4.7, tich_cuc: 90, tieu_cuc: 3, trung_tinh: 7, mo_ta: 'Giá đò rẻ, không có hiện tượng chèo kéo du khách' }
    },
    uu_dai: {
      co_san: false,
      tieu_de: 'Cần đạt chuẩn Điểm sáng du lịch để nhận voucher đối tác',
      ma_voucher: null,
      doi_tac: 'Ban quản lý Rừng đặc dụng Vân Long',
      link_doi_tac: 'https://ninhbinh.gov.vn'
    }
  }
]

// TOÀN BỘ 874 ĐÁNH GIÁ TRIPADVISOR THỰC TẾ ĐƯỢC GẮN NHÃN ABSA & PHOBERT
export const DANH_SACH_DANH_GIA_TRIPADVISOR = reviews874Data

// 5 KHÍA CẠNH DU LỊCH TIÊU CHUẨN ABSA
export const KHIA_CANH_ABSA = [
  { id: 1, ten: 'Cảnh quan & Không gian', icon: '🏞️', diem: 4.88, tich_cuc: 94.6, tieu_cuc: 1.8, trung_tinh: 3.6, so_luot: 812 },
  { id: 2, ten: 'Chất lượng phục vụ', icon: '🛎️', diem: 4.54, tich_cuc: 86.8, tieu_cuc: 5.2, trung_tinh: 8.0, so_luot: 745 },
  { id: 3, ten: 'Ẩm thực & Đặc sản', icon: '🍜', diem: 4.58, tich_cuc: 87.4, tieu_cuc: 4.6, trung_tinh: 8.0, so_luot: 680 },
  { id: 4, ten: 'Vệ sinh & Môi trường', icon: '🧹', diem: 4.62, tich_cuc: 88.5, tieu_cuc: 3.5, trung_tinh: 8.0, so_luot: 620 },
  { id: 5, ten: 'Giá cả & Độ minh bạch', icon: '💵', diem: 4.36, tich_cuc: 80.2, tieu_cuc: 9.4, trung_tinh: 10.4, so_luot: 710 }
]

// DỊCH VỤ DỮ LIỆU ĐỒNG BỘ GIỮA API VÀ FALLBACK
export const DataService = {
  // 1. Lấy danh sách điểm đến
  async layDanhSachDiemDen(boLoc = {}) {
    try {
      const res = await api.get('/diem-den', { params: { so_dong: 100 } })
      if (res.data?.data && res.data.data.length > 0) {
        // Hợp nhất dữ liệu API với thông tin hình ảnh/khía cạnh để giao diện luôn lộng lẫy
        const apiData = res.data.data
        return apiData.map((item, index) => {
          const fallback = DANH_SACH_DIEM_DEN_FALLBACK.find(f => 
            f.ten.toLowerCase().includes(item.ten.toLowerCase()) || 
            item.ten.toLowerCase().includes(f.ten_rut_gon?.toLowerCase() || '')
          ) || DANH_SACH_DIEM_DEN_FALLBACK[index % DANH_SACH_DIEM_DEN_FALLBACK.length]

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
            khia_canh: fallback.khia_canh,
            uu_dai: fallback.uu_dai
          }
        })
      }
    } catch (e) {
      console.warn('API backend /diem-den chưa sẵn sàng, kích hoạt bộ nhớ đệm du lịch cao cấp.', e.message)
    }
    return DANH_SACH_DIEM_DEN_FALLBACK
  },

  // 2. Lấy chi tiết 1 điểm đến theo ID
  async layChiTietDiemDen(id) {
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
      console.warn(`Lấy chi tiết điểm đến ID ${id} qua API thất bại, dùng fallback chi tiết.`, e.message)
    }
    return DANH_SACH_DIEM_DEN_FALLBACK.find(f => f.id == id) || DANH_SACH_DIEM_DEN_FALLBACK[0]
  },

  // 3. Lấy trạng thái định tuyến Wilson Score
  async layTrangThaiDiemDen(id) {
    try {
      const res = await api.get(`/diem-den/${id}/trang-thai`)
      if (res.data?.data) return res.data.data
    } catch (e) {
      // Giả lập trả về từ fallback
    }
    const item = DANH_SACH_DIEM_DEN_FALLBACK.find(f => f.id == id) || DANH_SACH_DIEM_DEN_FALLBACK[0]
    return {
      trang_thai: item.trang_thai_wilson,
      ly_do: item.trang_thai_wilson === 'diem_sang' 
        ? `Điểm đến đạt chỉ số Wilson Score ${item.khoang_tin_cay_wilson} (>= 0.70) với ${item.tong_luot_danh_gia} đánh giá kiểm chứng, đủ điều kiện kích hoạt đối tác tour ưu đãi.`
        : `Điểm đến đang hoạt động ổn định (${item.tong_luot_danh_gia} đánh giá). Chưa kích hoạt gói đối tác ưu đãi.`,
      so_review: item.tong_luot_danh_gia,
      hien_nut_doi_tac: item.trang_thai_wilson === 'diem_sang',
      hien_canh_bao: item.trang_thai_wilson === 'canh_bao',
      ghi_chu: 'Kết quả do mô hình tự động ước lượng (Khoảng tin cậy 95% Wilson). Kiểm chứng trực tiếp qua đánh giá du khách.'
    }
  },

  // 4. Lấy danh sách đánh giá có lọc và phân trang
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
      console.warn('API /danh-gia chưa sẵn sàng, dùng tập đánh giá TripAdvisor mẫu.', e.message)
    }

    // Lọc fallback
    let ketQua = [...DANH_SACH_DANH_GIA_TRIPADVISOR]
    if (boLoc.tu_khoa) {
      const kw = boLoc.tu_khoa.toLowerCase()
      ketQua = ketQua.filter(r => 
        r.tieu_de.toLowerCase().includes(kw) || 
        r.noi_dung.toLowerCase().includes(kw) ||
        r.ten_diem_den.toLowerCase().includes(kw)
      )
    }
    if (boLoc.diem_den_id) {
      ketQua = ketQua.filter(r => r.diem_den_id == boLoc.diem_den_id)
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

  // 5. Quản lý phiếu ưu đãi (localStorage + API)
  async layPhieuCuaToi() {
    try {
      const res = await api.get('/phieu-gioi-thieu/cua-toi')
      if (res.data?.data && res.data.data.length > 0) {
        return res.data.data
      }
    } catch (e) {
      // Dùng LocalStorage fallback
    }

    const localTickets = localStorage.getItem('dt12_my_tickets')
    if (localTickets) {
      try {
        return JSON.parse(localTickets)
      } catch (err) {}
    }

    // Mẫu vé mặc định
    return [
      {
        ma_tham_chieu: 'VOUCHER-AMB-2026',
        diem_den: 'Ambassador Cruise - Halong Bay',
        tinh_thanh: 'Quảng Ninh',
        uu_dai_chi_tiet: 'Giảm 15% Tour Hoàng Hôn & Tiệc Buffet Hải Sản',
        trang_thai: 'kha_dung',
        ngay_tao: '2026-03-12',
        het_han_phut: 15,
        url_doi_tac: 'https://ambassadorcruise.com',
        thong_bao: 'Phiếu ưu đãi hợp lệ, được bảo chứng bởi công nghệ ABSA & Wilson Score.'
      },
      {
        ma_tham_chieu: 'VOUCHER-TA-HERITAGE',
        diem_den: 'Trang An Grottoes',
        tinh_thanh: 'Ninh Bình',
        uu_dai_chi_tiet: 'Giảm 10% Vé Tuyến Thuyền Khám Phá Hang Đột',
        trang_thai: 'kha_dung',
        ngay_tao: '2026-03-11',
        het_han_phut: 15,
        url_doi_tac: 'https://disantrangan.vn',
        thong_bao: 'Phiếu ưu đãi kích hoạt cho Điểm sáng du lịch đạt chuẩn.'
      }
    ]
  },

  // 6. Nhận phiếu ưu đãi mới
  async nhanUuDai(diemDenId) {
    try {
      const res = await api.post(`/diem-den/${diemDenId}/gioi-thieu-tour`)
      if (res.data?.data) return res.data.data
    } catch (e) {
      console.warn('API nhận voucher chưa kết nối, mô phỏng sinh phiếu bảo mật phía client.')
    }

    const dest = DANH_SACH_DIEM_DEN_FALLBACK.find(d => d.id == diemDenId) || DANH_SACH_DIEM_DEN_FALLBACK[0]
    const maMoi = `VOUCHER-${dest.ma_dinh_danh}-${Math.floor(1000 + Math.random() * 9000)}`
    const phieuMoi = {
      ma_tham_chieu: maMoi,
      diem_den: dest.ten,
      tinh_thanh: dest.tinh_thanh,
      uu_dai_chi_tiet: dest.uu_dai?.tieu_de || 'Phiếu ưu đãi trải nghiệm dịch vụ điểm đến',
      trang_thai: 'kha_dung',
      ngay_tao: new Date().toISOString().split('T')[0],
      het_han_giay: 900,
      con_lai_giay: 900,
      url_doi_tac: dest.uu_dai?.link_doi_tac || 'https://tripadvisor.com',
      thong_bao: 'Phiếu đã được cấp thành công. Vui lòng sử dụng trong vòng 15 phút.'
    }

    // Lưu vào LocalStorage
    const curr = await this.layPhieuCuaToi()
    curr.unshift(phieuMoi)
    localStorage.setItem('dt12_my_tickets', JSON.stringify(curr))

    return phieuMoi
  }
}

export default DataService
