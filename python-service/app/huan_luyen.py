"""Huan luyen tren TOAN BO tap gan nhan va luu mo hinh. Chay: python -m app.huan_luyen"""
from . import ml
from .tap_gan_nhan import doc_tap_gan_nhan


def main() -> None:
    df = doc_tap_gan_nhan()
    ml.luu(ml.tao_pipeline().fit(df["noi_dung"], df["nhan"]))
    print(f"Da huan luyen tren {len(df)} mau, luu tai {ml.DUONG_DAN}")


if __name__ == "__main__":
    main()