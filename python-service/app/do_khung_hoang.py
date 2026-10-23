from pathlib import Path
import pandas as pd

def main() -> None:
    d = Path("data/gan_nhan")
    co = pd.read_csv(d / "khung_hoang_gan_co.csv", encoding="utf-8-sig")
    for c in ("nguoi_1", "nguoi_2"):
        co[c] = co[c].fillna("").astype(str).str.strip().str.lower()
    ok = co[co["nguoi_1"].isin(["dung", "sai"]) & co["nguoi_2"].isin(["dung", "sai"])]
    dong_y = ok[ok["nguoi_1"] == ok["nguoi_2"]]
    print(f"Da kiem tra {len(ok)}/{len(co)} dong, bat dong {len(ok) - len(dong_y)} dong")
    rows = []
    for tk, g in dong_y.groupby("tu_khoa"):
        n, dung = len(g), int((g["nguoi_1"] == "dung").sum())
        p, cap = dung / n, g["cap_do"].iloc[0]
        de_xuat = ""
        if cap == "nang":
            de_xuat = "giu_nang" if (p >= 0.8 and n >= 5) else "ha_xuong_nhe_hoac_chua_du_mau"
        rows.append({"tu_khoa": tk, "cap_do": cap, "so_mau": n, "so_dung": dung,
                     "ty_le_dung": round(p, 3), "de_xuat": de_xuat})
    kq = pd.DataFrame(rows).sort_values("ty_le_dung")
    Path("bao_cao").mkdir(exist_ok=True)
    kq.to_csv("bao_cao/khung_hoang_do_luong.csv", index=False, encoding="utf-8-sig")
    print(kq.to_string(index=False))
    print("\n-- SQL cap nhat --")
    for r in rows:
        print("UPDATE tu_khoa_khung_hoang SET ty_le_dung_do_duoc = {:.3f}, so_mau_kiem_tra = {} "
              "WHERE tu_khoa = '{}';".format(r["ty_le_dung"], r["so_mau"], r["tu_khoa"]))

if __name__ == "__main__":
    main()