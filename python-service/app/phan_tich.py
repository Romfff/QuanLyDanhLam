import os
from . import khia_canh, khung_hoang, ml, tu_dien
from .xu_ly_van_ban import lam_sach_dau_vao, tach_menh_de

PHIEN_BAN = "1.1"

def phan_tich(noi_dung) -> dict:
    van_ban = lam_sach_dau_vao(noi_dung)
    if not van_ban:
        return {"sac_thai_tong": "trung_tinh", "do_tin_cay": 0.0, "xac_suat": None,
                "phuong_phap": "tu_dien", "phien_ban": PHIEN_BAN, "phien_ban_mo_hinh": "tu-dien-v1",
                "khia_canh_phat_hien": [], "co_khung_hoang": [], "so_lan_bi_phu_dinh": 0}
    xs = ml.du_doan_xac_suat(van_ban) if os.getenv("PHUONG_PHAP", "ml").lower() == "ml" else None
    if xs:
        nhan = max(xs, key=xs.get)
        tin_cay, phuong_phap, mo_hinh = xs[nhan], "hoc_may", "tfidf-lr-v1"
    else:
        nhan, tin_cay = tu_dien.phan_tich_tu_dien(van_ban)
        phuong_phap, mo_hinh = "tu_dien", "tu-dien-v1"
    return {"sac_thai_tong": nhan, "do_tin_cay": tin_cay, "xac_suat": xs,
            "phuong_phap": phuong_phap, "phien_ban": PHIEN_BAN, "phien_ban_mo_hinh": mo_hinh,
            "khia_canh_phat_hien": khia_canh.phat_hien(tach_menh_de(van_ban)),
            **khung_hoang.phat_hien(van_ban)}

