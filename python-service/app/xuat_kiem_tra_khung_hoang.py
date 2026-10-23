from pathlib import Path
import pandas as pd
from sqlalchemy import text
from . import khung_hoang
from .csdl import lay_engine

def main() -> None:
    df = pd.read_sql(text("SELECT id, noi_dung FROM danh_gia"), lay_engine())
    ds = khung_hoang.danh_sach()
    gan_co, khong_co = [], []
    for r in df.itertuples(index=False):
        kq = khung_hoang.phat_hien(r.noi_dung, ds)
        if kq["co_khung_hoang"]:
            for c in kq["co_khung_hoang"]:
                gan_co.append({"id": r.id, "tu_khoa": c["tu_khoa"], "cap_do": c["cap_do"],
                               "doan_trich": c["doan_trich"], "nguoi_1": "", "nguoi_2": ""})
        else:
            khong_co.append({"id": r.id, "noi_dung": r.noi_dung, "co_khung_hoang_that": ""})
    thu_muc = Path("data/gan_nhan"); thu_muc.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(gan_co).to_csv(thu_muc / "khung_hoang_gan_co.csv", index=False, encoding="utf-8-sig")
    pd.DataFrame(khong_co).sample(n=min(40, len(khong_co)), random_state=2026) \
        .to_csv(thu_muc / "khung_hoang_khong_co.csv", index=False, encoding="utf-8-sig")
    print(f"Gan co: {len(gan_co)} dong; mau khong co: {min(40, len(khong_co))} dong")

if __name__ == "__main__":
    main()