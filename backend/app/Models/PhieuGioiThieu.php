<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhieuGioiThieu extends Model
{
    protected $table = 'phieu_gioi_thieu';
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = null;
    protected $guarded = [];
    protected $casts = [
        'ngay_cap' => 'date',
        'han_hieu_luc' => 'datetime',
        'ngay_chuyen_huong' => 'datetime',
    ];
}