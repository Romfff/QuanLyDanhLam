from collections import Counter

NHAN = ("tich_cuc", "trung_tinh", "tieu_cuc")


def ty_le_sac_thai(danh_sach_nhan) -> dict:
    """Tập rỗng trả về toàn 0, không chia cho 0."""
    ds = list(danh_sach_nhan or [])
    n, dem = len(ds), Counter(ds)
    return {k: (round(dem.get(k, 0) / n, 4) if n else 0.0) for k in NHAN}