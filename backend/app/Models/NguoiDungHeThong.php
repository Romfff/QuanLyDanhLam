<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NguoiDungHeThong extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'nguoi_dung_he_thong';

    protected $fillable = [
        'ten_dang_nhap', 'ho_ten', 'email', 'mat_khau_hash', 'so_dien_thoai', 'vai_tro',
    ];

    protected $hidden = ['mat_khau_hash'];

    // Khai báo cột chứa mật khẩu đã băm
    public function getAuthPassword()
    {
        return $this->mat_khau_hash;
    }

    public function diemDenPhuTrach()
    {
        return $this->hasMany(DiemDen::class, 'nguoi_phu_trach_id');
    }
}
const CREATED_AT = 'ngay_tao';
const UPDATED_AT = 'ngay_cap_nhat';