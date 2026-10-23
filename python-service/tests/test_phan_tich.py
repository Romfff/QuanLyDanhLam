from app import khia_canh
from app.phan_tich import phan_tich
from app.thong_ke import ty_le_sac_thai


def test_dau_vao_bat_thuong_khong_sap():            # PYMD-02
    for x in (None, float("nan"), "", "   ", 123):
        kq = phan_tich(x)
        assert kq["sac_thai_tong"] == "trung_tinh"
        assert kq["do_tin_cay"] <= 0.5


def test_thong_ke_tap_rong_khong_chia_cho_0():      # PYMD-03
    assert ty_le_sac_thai([]) == {"tich_cuc": 0.0, "trung_tinh": 0.0, "tieu_cuc": 0.0}


def test_gan_dung_sac_thai_cho_tung_khia_canh(monkeypatch):
    monkeypatch.setenv("PHUONG_PHAP", "tu_dien")
    monkeypatch.setattr(khia_canh, "danh_sach", lambda: [
        {"id": 1, "ma": "gia_ca", "ten": "Giá cả", "tu_khoa": ["giá"]},
        {"id": 2, "ma": "canh_quan", "ten": "Cảnh quan", "tu_khoa": ["cảnh"]}])
    kq = phan_tich("Cảnh rất đẹp nhưng giá quá đắt")
    theo_ma = {k["ma"]: k["sac_thai"] for k in kq["khia_canh_phat_hien"]}
    assert theo_ma == {"canh_quan": "tich_cuc", "gia_ca": "tieu_cuc"}

from app import khung_hoang
from app.xu_ly_van_ban import chuan_hoa

DS = [{"id": 1, "tu_khoa": t, "tk": chuan_hoa(t).split(), "cap_do": c, "nhom": "an_toan"}
      for t, c in (("ngộ độc", "nang"), ("chặt chém", "nhe"))]

def test_phu_dinh_khong_gan_co_oan():
    assert khung_hoang.phat_hien("Giá hợp lý, không bị chặt chém", DS)["co_khung_hoang"] == []

def test_bat_duoc_tu_khoa_nang():
    kq = khung_hoang.phat_hien("Ăn xong cả nhà bị ngộ độc", DS)["co_khung_hoang"]
    assert [x["tu_khoa"] for x in kq] == ["ngộ độc"]