import re
import unicodedata

TACH_MENH_DE = re.compile(
    r"[.!?;,\n]+|\b(?:nhưng mà|nhưng|tuy nhiên|tuy vậy|thế nhưng|song)\b",
    flags=re.IGNORECASE,
)


def lam_sach_dau_vao(s) -> str:
    """Nhận mọi kiểu giá trị (None, NaN, số...) và luôn trả về chuỗi an toàn."""
    if not isinstance(s, str):
        return ""
    return unicodedata.normalize("NFC", s).strip()


def chuan_hoa(s) -> str:
    s = lam_sach_dau_vao(s).lower()
    s = re.sub(r"https?://\S+", " ", s)
    s = re.sub(r"[^\w\s]", " ", s).replace("_", " ")
    return re.sub(r"\s+", " ", s).strip()


def tach_menh_de(s) -> list[str]:
    """'Cảnh đẹp nhưng giá đắt' -> ['Cảnh đẹp', 'giá đắt']."""
    s = lam_sach_dau_vao(s)
    return [p.strip() for p in TACH_MENH_DE.split(s) if p and p.strip()]

from app import khung_hoang
from app.xu_ly_van_ban import chuan_hoa

DS = [{"id": 1, "tu_khoa": t, "tk": chuan_hoa(t).split(), "cap_do": c, "nhom": "an_toan"}
      for t, c in (("ngộ độc", "nang"), ("chặt chém", "nhe"))]

def test_phu_dinh_khong_gan_co_oan():
    assert khung_hoang.phat_hien("Giá hợp lý, không bị chặt chém", DS)["co_khung_hoang"] == []

def test_bat_duoc_tu_khoa_nang():
    kq = khung_hoang.phat_hien("Ăn xong cả nhà bị ngộ độc", DS)["co_khung_hoang"]
    assert [x["tu_khoa"] for x in kq] == ["ngộ độc"]