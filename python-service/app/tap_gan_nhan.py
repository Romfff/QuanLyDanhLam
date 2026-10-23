import glob
import sys

import pandas as pd

NHAN_HOP_LE = {"tich_cuc", "trung_tinh", "tieu_cuc"}


def doc_tap_gan_nhan(thu_muc: str = "data/gan_nhan") -> pd.DataFrame:
    cac_tep = sorted(glob.glob(f"{thu_muc}/gan_nhan_*.csv"))
    if not cac_tep:
        sys.exit("Khong thay tep gan_nhan_*.csv trong " + thu_muc)
    ds = []
    for t in cac_tep:
        try:
            ds.append(pd.read_csv(t, encoding="utf-8-sig", sep=None, engine="python"))
        except UnicodeDecodeError:
            sys.exit(f"{t}: khong phai UTF-8. Hay tai lai tu Google Sheets: File > Download > CSV")
    df = pd.concat(ds, ignore_index=True)
    df["nhan"] = df["nhan"].fillna("").astype(str).str.strip().str.lower()
    sai = df[(df["nhan"] != "") & (~df["nhan"].isin(NHAN_HOP_LE))]
    if len(sai):
        print("Nhan khong hop le (chi duoc tich_cuc, trung_tinh, tieu_cuc):")
        print(sai[["id", "nhan"]].to_string())
        sys.exit(1)
    chua = int((df["nhan"] == "").sum())
    if chua:
        print(f"Bo qua {chua} dong chua gan nhan")
    return df[df["nhan"] != ""].drop_duplicates(subset="id").reset_index(drop=True)