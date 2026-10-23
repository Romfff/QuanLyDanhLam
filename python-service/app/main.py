import logging
import os
import secrets

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

load_dotenv()
from . import khia_canh, khung_hoang, ml, phan_tich  # noqa: E402

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
app = FastAPI(title="Dich vu phan tich danh gia du lich CSE703073", version="1.0.0")
TOKEN = os.getenv("PY_SERVICE_TOKEN", "")


class YeuCau(BaseModel):
    noi_dung: str = Field(..., max_length=5000)


def kiem_tra_token(x_service_token: str | None) -> None:
    if not TOKEN or not x_service_token or not secrets.compare_digest(
            x_service_token.encode(), TOKEN.encode()):
        raise HTTPException(status_code=401, detail="Token khong hop le")


@app.get("/healthz")
def suc_khoe() -> dict:
    return {"status": "ok"}


@app.post("/phan-tich-sac-thai")
def api_phan_tich(yc: YeuCau, x_service_token: str | None = Header(default=None)) -> dict:
    kiem_tra_token(x_service_token)
    if not yc.noi_dung.strip():
        raise HTTPException(status_code=422, detail="noi_dung khong duoc rong")
    return phan_tich.phan_tich(yc.noi_dung)


@app.post("/cache/refresh")
def api_lam_moi(x_service_token: str | None = Header(default=None)) -> dict:
    kiem_tra_token(x_service_token)
    khia_canh.lam_moi()
    khung_hoang.lam_moi()
    ml.lam_moi()
    return {"status": "refreshed"}