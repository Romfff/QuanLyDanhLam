<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Builder, Model};

class DanhGia extends Model
{
    protected $table = 'danh_gia';
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = null;
    protected $casts = ['ngay_dang' => 'date', 'ngay_trai_nghiem' => 'date'];

    public function diemDen() { return $this->belongsTo(DiemDen::class, 'diem_den_id'); }
    public function nguon()   { return $this->belongsTo(NguonDuLieu::class, 'nguon_id'); }
    public function khiaCanh()
    {
        return $this->belongsToMany(KhiaCanh::class, 'danh_gia_khia_canh', 'danh_gia_id', 'khia_canh_id')
            ->withPivot('sac_thai', 'do_tin_cay', 'doan_trich_noi_dung');
    }

    public function scopeLoc(Builder $q, array $f): Builder
    {
        return $q
            ->when($f['diem_den_id'] ?? null, fn ($q, $v) => $q->where('diem_den_id', $v))
            ->when($f['sac_thai'] ?? null, fn ($q, $v) => $q->where('sac_thai_tong', $v))
            ->when($f['khia_canh_id'] ?? null, fn ($q, $v) =>
                $q->whereHas('khiaCanh', fn ($k) => $k->where('khia_canh.id', $v)))
            ->when($f['tu_ngay'] ?? null, fn ($q, $v) => $q->where('ngay_dang', '>=', $v))
            ->when($f['den_ngay'] ?? null, fn ($q, $v) => $q->where('ngay_dang', '<=', $v))
            ->when($f['tu_khoa'] ?? null, function ($q, $v) {
                $mau = '%' . addcslashes($v, '%_\\') . '%';
                $q->where(fn ($k) => $k->where('noi_dung', 'like', $mau)->orWhere('tieu_de', 'like', $mau));
            });
    }
}