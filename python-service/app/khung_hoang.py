import logging
from sqlalchemy import text
from .csdl import lay_engine
from .xu_ly_van_ban import chuan_hoa, tach_menh_de

log = logging.getLogger("khung_hoang")

DU_PHONG = [
    ("ngộ độc", "nang", "an_toan"), ("lừa đảo", "nang", "phap_ly"),
    ("đánh người", "nang", "an_toan"), ("hành hung", "nang", "an_toan"),
    ("trộm cắp", "nang", "an_toan"), ("móc túi", "nang", "an_toan"),
    ("chất cấm", "nang", "phap_ly"), ("tẩy chay", "nang", "danh_tieng"),
    ("phốt", "nang", "danh_tieng"), ("chặt chém", "nhe", "phap_ly"),
    ("ép giá", "nhe", "phap_ly"), ("cò mồi", "nhe", "phap_ly"),
    ("bẩn", "nhe", "danh_tieng"), ("mất vệ sinh", "nhe", "an_toan"),
    ("thái độ tệ", "nhe", "danh_tieng"), ("thái độ kém", "nhe", "danh_tieng"),
]
PHU_DINH = {"không", "chẳng", "chả", "chưa", "ko"}
_cache = {"ds": None}

def _muc(id_, tu_khoa, cap_do, nhom):
    return {"id": id_, "tu_khoa": tu_khoa, "tk": chuan_hoa(tu_khoa).split(), "cap_do": cap_do, "nhom": nhom}

def _nap_tu_db() -> list[dict]:
    try:
        with lay_engine().connect() as c:
            rows = c.execute(text(
                "SELECT id, tu_khoa, cap_do, nhom FROM tu_khoa_khung_hoang WHERE trang_thai = 'dang_dung'"
            )).mappings().all()
        return [_muc(r["id"], r["tu_khoa"], r["cap_do"], r["nhom"]) for r in rows]
    except Exception as e:
        log.error("Khong doc duoc tu khoa khung hoang: %s", e)
        return []

def danh_sach() -> list[dict]:
    if _cache["ds"] is None:
        ds = _nap_tu_db()
        if not ds:
            return [_muc(None, t, c, n) for t, c, n in DU_PHONG]
        _cache["ds"] = ds
    return _cache["ds"]

def lam_moi() -> None:
    _cache["ds"] = None

def phat_hien(van_ban, ds=None) -> dict:
    ds = danh_sach() if ds is None else ds
    co, da_co, phu_dinh = [], set(), 0
    for md in tach_menh_de(van_ban):
        toks = chuan_hoa(md).split()
        for kw in ds:
            n = len(kw["tk"])
            for i in range(len(toks) - n + 1):
                if toks[i:i + n] != kw["tk"]:
                    continue
                if any(t in PHU_DINH for t in toks[max(0, i - 3):i]):
                    phu_dinh += 1
                    continue
                if kw["tu_khoa"] not in da_co:
                    da_co.add(kw["tu_khoa"])
                    co.append({"tu_khoa_id": kw["id"], "tu_khoa": kw["tu_khoa"], "cap_do": kw["cap_do"],
                               "nhom": kw["nhom"], "doan_trich": md.strip()[:250]})
                break
    return {"co_khung_hoang": co, "so_lan_bi_phu_dinh": phu_dinh}