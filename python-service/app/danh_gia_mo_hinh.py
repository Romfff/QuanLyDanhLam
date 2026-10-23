"""So sanh cac phuong phap tren CUNG tap kiem tra. Chay: python -m app.danh_gia_mo_hinh"""
import json
from pathlib import Path

import pandas as pd
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split

from . import ml, tu_dien
from .tap_gan_nhan import doc_tap_gan_nhan
from .thong_ke import NHAN, ty_le_sac_thai


def nhan_theo_diem_so(d) -> str:
    d = int(d)
    return "tich_cuc" if d >= 4 else ("trung_tinh" if d == 3 else "tieu_cuc")


def tinh_chi_so(y_that, y_dd) -> dict:
    return {
        "accuracy": round(accuracy_score(y_that, y_dd), 4),
        "macro_f1": round(f1_score(y_that, y_dd, labels=list(NHAN), average="macro", zero_division=0), 4),
        "bao_cao": classification_report(y_that, y_dd, labels=list(NHAN), output_dict=True, zero_division=0),
        "ma_tran_nham_lan": confusion_matrix(y_that, y_dd, labels=list(NHAN)).tolist(),
    }


def main() -> None:
    df = doc_tap_gan_nhan()
    dem = df["nhan"].value_counts()
    print("So danh gia da gan nhan:", len(df))
    print(dem.to_string())
    if dem.min() < 5:
        print("CANH BAO: co nhan duoi 5 mau, ket qua se khong on dinh")

    train, test = train_test_split(df, test_size=0.3, random_state=42,
                                   stratify=df["nhan"] if dem.min() >= 2 else None)
    mo_hinh = ml.tao_pipeline().fit(train["noi_dung"], train["nhan"])
    y = test["nhan"].tolist()
    kq_pp = {
        "tu_dien": [tu_dien.phan_tich_tu_dien(t)[0] for t in test["noi_dung"]],
        "hoc_may": mo_hinh.predict(test["noi_dung"]).tolist(),
    }
    tep_diem = Path("data/gan_nhan/diem_so.csv")
    if tep_diem.exists():
        ds = pd.read_csv(tep_diem, encoding="utf-8-sig").set_index("id")["diem_so"]
        kq_pp["diem_so_co_so"] = [nhan_theo_diem_so(ds.get(i, 3)) for i in test["id"]]

    ket_qua = {"so_mau_huan_luyen": len(train), "so_mau_kiem_tra": len(test),
               "phan_bo_nhan_tap_kiem_tra": ty_le_sac_thai(y),
               "phuong_phap": {k: tinh_chi_so(y, v) for k, v in kq_pp.items()}}
    k = int(min(5, dem.min()))
    if k >= 2:
        cv = StratifiedKFold(n_splits=k, shuffle=True, random_state=42)
        diem = cross_val_score(ml.tao_pipeline(), df["noi_dung"], df["nhan"], cv=cv, scoring="f1_macro")
        ket_qua["hoc_may_cross_validation"] = {"so_fold": k, "macro_f1_tb": round(float(diem.mean()), 4),
                                               "do_lech_chuan": round(float(diem.std()), 4)}

    print(f"\n{'Phuong phap':<16}{'Accuracy':>10}{'Macro-F1':>10}")
    for ten, v in ket_qua["phuong_phap"].items():
        print(f"{ten:<16}{v['accuracy']:>10}{v['macro_f1']:>10}")

    loi = test.assign(du_doan_tu_dien=kq_pp["tu_dien"], du_doan_hoc_may=kq_pp["hoc_may"])
    loi = loi[(loi["nhan"] != loi["du_doan_tu_dien"]) | (loi["nhan"] != loi["du_doan_hoc_may"])]
    Path("bao_cao").mkdir(exist_ok=True)
    loi.to_csv("bao_cao/loi_phan_loai.csv", index=False, encoding="utf-8-sig")
    Path("bao_cao/ket_qua_danh_gia.json").write_text(
        json.dumps(ket_qua, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nGhi {len(loi)} truong hop sai vao bao_cao/loi_phan_loai.csv")


if __name__ == "__main__":
    main()