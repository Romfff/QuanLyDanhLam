"""Xuat ngau nhien N danh gia de nhom gan nhan tay.
Chay: python -m app.xuat_tap_gan_nhan --so-luong 200 --so-nguoi 5"""
import argparse
from pathlib import Path

import pandas as pd
from sqlalchemy import text

from .csdl import lay_engine


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--so-luong", type=int, default=200)
    ap.add_argument("--so-nguoi", type=int, default=5)
    ap.add_argument("--hat-giong", type=str, default="2026")
    a = ap.parse_args()

    q = text("SELECT id, noi_dung, diem_so FROM danh_gia "
             "ORDER BY CRC32(CONCAT(id, '-', :seed)) LIMIT :n")
    df = pd.read_sql(q, lay_engine(), params={"seed": a.hat_giong, "n": a.so_luong})

    thu_muc = Path("data/gan_nhan")
    thu_muc.mkdir(parents=True, exist_ok=True)
    # Điểm sao để RIÊNG, người gán nhãn không được xem để khỏi bị ảnh hưởng
    df[["id", "diem_so"]].to_csv(thu_muc / "diem_so.csv", index=False, encoding="utf-8-sig")
    phieu = df[["id", "noi_dung"]].assign(nhan="")
    for i in range(a.so_nguoi):
        phieu.iloc[i::a.so_nguoi].to_csv(thu_muc / f"gan_nhan_{i + 1}.csv",
                                         index=False, encoding="utf-8-sig")
    print(f"Da xuat {len(df)} danh gia cho {a.so_nguoi} nguoi tai {thu_muc}")


if __name__ == "__main__":
    main()