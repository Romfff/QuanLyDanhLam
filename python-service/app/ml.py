import logging
from pathlib import Path

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

from .xu_ly_van_ban import chuan_hoa, lam_sach_dau_vao

log = logging.getLogger("ml")
DUONG_DAN = Path(__file__).resolve().parent.parent / "mo_hinh" / "sac_thai_ml.joblib"
_trang_thai = {"mo_hinh": None, "da_thu": False}


def tao_pipeline() -> Pipeline:
    return Pipeline([
        ("tfidf", TfidfVectorizer(preprocessor=chuan_hoa, ngram_range=(1, 2), sublinear_tf=True)),
        ("clf", LogisticRegression(max_iter=2000, class_weight="balanced", C=3.0)),
    ])


def luu(pipeline: Pipeline) -> None:
    DUONG_DAN.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, DUONG_DAN)


def lam_moi() -> None:
    _trang_thai.update(mo_hinh=None, da_thu=False)


def lay_mo_hinh():
    if not _trang_thai["da_thu"]:
        _trang_thai["da_thu"] = True
        if DUONG_DAN.exists():
            try:
                _trang_thai["mo_hinh"] = joblib.load(DUONG_DAN)
            except Exception as e:
                log.error("Khong nap duoc mo hinh ML: %s", e)
        else:
            log.warning("Chua co mo hinh ML, tam dung tu dien")
    return _trang_thai["mo_hinh"]


def du_doan(van_ban):
    p = lay_mo_hinh()
    if p is None:
        return None
    xs = p.predict_proba([lam_sach_dau_vao(van_ban)])[0]
    i = int(xs.argmax())
    return str(p.named_steps["clf"].classes_[i]), round(float(xs[i]), 3)
def du_doan_xac_suat(van_ban):
    p = lay_mo_hinh()
    if p is None:
        return None
    xs = p.predict_proba([lam_sach_dau_vao(van_ban)])[0]
    return {str(c): round(float(x), 4) for c, x in zip(p.named_steps["clf"].classes_, xs)}