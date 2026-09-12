<?php

namespace App\Policies;

use App\Models\DiemDen;
use App\Models\NguoiDungHeThong;

class DiemDenPolicy
{
    public function update(NguoiDungHeThong $u, DiemDen $d): bool
    {
        return match ($u->vai_tro) {
            'admin' => true,
            'quan_ly_diem_den' => $d->nguoi_phu_trach_id === $u->id,
            default => false,
        };
    }

    public function delete(NguoiDungHeThong $u, DiemDen $d): bool
    {
        return $u->vai_tro === 'admin';
    }
}