<?php
namespace App\Services;

class BookingService {
    public function giuChoCoThoiHan($userId, $serviceId, $thoiGianGiuPhut = 15) {
        return [
            'booking_id' => uniqid('BK_'),
            'user_id' => $userId,
            'service_id' => $serviceId,
            'trang_thai' => 'dang_giu_cho',
            'het_han_luc' => now()->addMinutes($thoiGianGiuPhut)
        ];
    }
}
