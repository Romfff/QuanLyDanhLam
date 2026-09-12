<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiemDen extends Model
{
    protected $table = 'diem_den';

    // Bắt buộc cấu hình lại cột thời gian đúng với MySQL của nhóm
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = 'ngay_cap_nhat';

    protected $guarded = [];
}