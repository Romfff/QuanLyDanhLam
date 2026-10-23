from .xu_ly_van_ban import chuan_hoa, tach_menh_de

TICH_CUC = {
    "đẹp": 1, "tuyệt vời": 2, "tuyệt": 1.5, "tuyệt đẹp": 2, "tốt": 1, "xuất sắc": 2,
    "hoàn hảo": 2, "ấn tượng": 1.5, "thân thiện": 1.5, "nhiệt tình": 1.5, "chu đáo": 1.5,
    "lịch sự": 1, "chuyên nghiệp": 1.5, "sạch": 1, "sạch sẽ": 1.5, "thoải mái": 1.5,
    "rộng rãi": 1, "mát mẻ": 1, "trong lành": 1, "yên tĩnh": 1, "thơ mộng": 1.5,
    "ngon": 1.5, "hài lòng": 2, "thích": 1, "yêu thích": 2, "thú vị": 1.5, "đáng đi": 2,
    "đáng tiền": 2, "đáng nhớ": 1.5, "hợp lý": 1, "rẻ": 1, "tiện lợi": 1, "thuận tiện": 1,
    "an toàn": 1.5, "vui": 1, "ổn": 0.5, "nên đến": 1.5, "nên đi": 1.5,
}
TIEU_CUC = {
    "tệ": 2, "dở": 1.5, "kém": 1.5, "tồi": 2, "tệ hại": 2, "kinh khủng": 2, "thất vọng": 2,
    "chán": 1.5, "nhàm chán": 1.5, "bẩn": 1.5, "dơ": 1.5, "hôi": 1.5, "bẩn thỉu": 2,
    "mất vệ sinh": 2, "rác": 1, "ô nhiễm": 1.5, "xuống cấp": 1.5, "cũ kỹ": 1, "đắt": 1.5,
    "đắt đỏ": 2, "chặt chém": 2, "ép giá": 2, "cò mồi": 2, "lừa đảo": 2.5, "tốn kém": 1,
    "phí tiền": 2, "không đáng": 2, "đông đúc": 1, "quá đông": 1.5, "chen chúc": 1.5,
    "quá tải": 2, "ồn ào": 1.5, "ồn": 1, "lộn xộn": 1.5, "mất trật tự": 1.5, "chậm": 1,
    "thiếu": 1, "cáu gắt": 2, "thô lỗ": 2, "thiếu chuyên nghiệp": 2, "khó chịu": 1.5,
    "bực": 1.5, "nguy hiểm": 2, "mất an toàn": 2,
}
TU_DIEN = {chuan_hoa(k): float(v) for k, v in TICH_CUC.items()}
TU_DIEN.update({chuan_hoa(k): -float(v) for k, v in TIEU_CUC.items()})

PHU_DINH = {"không", "chẳng", "chả", "chưa", "ko"}
TANG = {"rất", "quá", "cực", "siêu"}
GIAM = {"hơi", "khá", "tạm"}


def diem_menh_de(menh_de: str) -> tuple[float, int]:
    """Trả về (điểm, số từ cảm xúc khớp). Có xử lý phủ định và từ nhấn mạnh."""
    toks = chuan_hoa(menh_de).split()
    diem, khop, i = 0.0, 0, 0
    while i < len(toks):
        tim = None
        for n in (3, 2, 1):
            if i + n <= len(toks) and " ".join(toks[i:i + n]) in TU_DIEN:
                tim = n
                break
        if not tim:
            i += 1
            continue
        w = TU_DIEN[" ".join(toks[i:i + tim])]
        truoc = toks[max(0, i - 2):i]
        if any(t in PHU_DINH for t in truoc):
            w = -w * 0.8          # "không đắt" -> tích cực nhẹ
        if truoc and truoc[-1] in TANG:
            w *= 1.5
        elif truoc and truoc[-1] in GIAM:
            w *= 0.7
        diem += w
        khop += 1
        i += tim
    return diem, khop


def phan_loai(diem: float, khop: int) -> tuple[str, float]:
    """Độ tin cậy ở đây là con số kinh nghiệm, KHÔNG phải xác suất."""
    if khop == 0:
        return "trung_tinh", 0.40
    if abs(diem) < 0.5:
        return "trung_tinh", 0.55
    tin_cay = 0.5 + 0.45 * abs(diem) / (abs(diem) + 1.5)
    return ("tich_cuc" if diem > 0 else "tieu_cuc"), round(tin_cay, 3)


def phan_tich_tu_dien(van_ban) -> tuple[str, float]:
    tong, khop = 0.0, 0
    for md in tach_menh_de(van_ban):
        d, k = diem_menh_de(md)
        tong += d
        khop += k
    return phan_loai(tong, khop)