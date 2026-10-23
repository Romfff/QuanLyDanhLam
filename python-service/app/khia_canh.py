import logging
import re

from sqlalchemy import text

from . import tu_dien
from .csdl import lay_engine
from .xu_ly_van_ban import chuan_hoa

log = logging.getLogger("khia_canh")
_cache = {"ds": None}


def _tach_tu_khoa(chuoi) -> list[str]:
    if not chuoi:
        return []
    ds = [chuan_hoa(t) for t in re.split(r"[,;|\n]+", str(chuoi))]
    return [t for t in ds if t]


def nap_tu_db() -> list[dict]:
    try:
        with lay_engine().connect() as c:
            rows = c.execute(text(
                "SELECT id, ma_khia_canh, ten_khia_canh, tu_khoa_nhan_dien FROM khia_canh"
            )).mappings().all()
    except Exception as e:
        log.error("Khong doc duoc khia_canh tu CSDL: %s", e)
        return []
    ds = []
    for r in rows:
        tk = _tach_tu_khoa(r["tu_khoa_nhan_dien"])
        if tk:
            ds.append({"id": r["id"], "ma": r["ma_khia_canh"], "ten": r["ten_khia_canh"], "tu_khoa": tk})
    return ds


def danh_sach() -> list[dict]:
    if _cache["ds"] is None:
        ds = nap_tu_db()
        if ds:                      # không lưu cache khi lỗi, lần sau thử lại
            _cache["ds"] = ds
        return ds
    return _cache["ds"]


def lam_moi() -> None:
    _cache["ds"] = None


def phat_hien(cac_menh_de: list[str], ds=None) -> list[dict]:
    """Mệnh đề nhắc tới khía cạnh nào thì khía cạnh đó nhận sắc thái của mệnh đề."""
    ds = danh_sach() if ds is None else ds
    gom: dict = {}
    for md in cac_menh_de:
        chuan = f" {chuan_hoa(md)} "
        diem, khop = tu_dien.diem_menh_de(md)
        for kc in ds:
            if not any(f" {t} " in chuan for t in kc["tu_khoa"]):
                continue
            m = gom.setdefault(kc["id"], {"kc": kc, "diem": 0.0, "khop": 0, "doan": md.strip(), "manh": -1.0})
            m["diem"] += diem
            m["khop"] += khop
            if abs(diem) > m["manh"]:
                m["manh"], m["doan"] = abs(diem), md.strip()
    kq = []
    for m in gom.values():
        nhan, tin_cay = tu_dien.phan_loai(m["diem"], m["khop"])
        kq.append({"khia_canh_id": m["kc"]["id"], "ma": m["kc"]["ma"], "ten": m["kc"]["ten"],
                   "sac_thai": nhan, "do_tin_cay": tin_cay, "doan_trich": m["doan"][:250],
                   "_manh": abs(m["diem"])})
    kq.sort(key=lambda x: x.pop("_manh"), reverse=True) if False else kq.sort(key=lambda x: -x["_manh"])
    for x in kq:
        x.pop("_manh")
    return kq