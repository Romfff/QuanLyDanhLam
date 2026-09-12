<?php
return [
    'min_review'            => (int)   env('DINH_TUYEN_MIN_REVIEW', 20),
    'nguong_tich_cuc'       => (float) env('DINH_TUYEN_NGUONG_TICH_CUC', 0.80),
    'can_duoi_wilson'       => (float) env('DINH_TUYEN_CAN_DUOI_WILSON', 0.60),
    'nguong_tieu_cuc_sang'  => (float) env('DINH_TUYEN_NGUONG_TIEU_CUC_SANG', 0.10),
    'nguong_canh_bao'       => (float) env('DINH_TUYEN_NGUONG_CANH_BAO', 0.20),
    'min_tieu_cuc'          => (int)   env('DINH_TUYEN_MIN_TIEU_CUC', 3),
    'min_co_nang'           => (int)   env('DINH_TUYEN_MIN_CO_NANG', 2),
    'cua_so_ty_le_ngay'     => (int)   env('DINH_TUYEN_CUA_SO_TY_LE_NGAY', 365),
    'cua_so_co_nang_ngay'   => (int)   env('DINH_TUYEN_CUA_SO_CO_NANG_NGAY', 180),
    'cua_so_dot_bien_ngay'  => (int)   env('DINH_TUYEN_CUA_SO_DOT_BIEN_NGAY', 30),
    'dot_bien_min_review'   => (int)   env('DINH_TUYEN_DOT_BIEN_MIN_REVIEW', 8),
    'dot_bien_muc_tang'     => (float) env('DINH_TUYEN_DOT_BIEN_MUC_TANG', 0.15),
    'loai_gia_mao'          => (float) env('DINH_TUYEN_LOAI_GIA_MAO', 0.70),
];