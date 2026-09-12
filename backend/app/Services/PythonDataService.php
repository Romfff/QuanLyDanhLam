<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PythonDataService
{
    private function goc(): string
    {
        return config('services.python.url', 'http://127.0.0.1:8001');
    }

    public function phanTich(string $noiDung, bool $dungBoDem = true): ?array
    {
        $khoa = 'phan-tich:v1:' . hash('sha256', $noiDung);

        // 1. Lấy từ Cache nếu bật bộ đệm
        if ($dungBoDem && ($daCo = Cache::get($khoa))) {
            return $daCo;
        }

        // 2. Gọi sang Python Service nếu chưa có trong Cache
        try {
            $res = Http::withHeaders(['X-Service-Token' => (string) config('services.python.token')])
                ->acceptJson()
                ->connectTimeout(2)
                ->timeout(5)
                ->post($this->goc() . '/phan-tich-sac-thai', ['noi_dung' => $noiDung]);

            if ($res->successful()) {
                $kq = $res->json();
                // Lưu bộ đệm trong 30 phút (1800 giây)
                Cache::put($khoa, $kq, now()->addMinutes(30));
                return $kq;
            }

            Log::warning('Dich vu Python tra ve loi', ['status' => $res->status()]);
        } catch (\Throwable $e) {
            Log::error('Khong goi duoc dich vu Python', ['loi' => $e->getMessage()]);
        }

        // 3. Phương án dự phòng (Fallback) khi Python sập/lỗi
        return [
            'sac_thai_tong' => 'trung_tinh',
            'do_tin_cay' => 0.0,
            'xac_suat' => ['tich_cuc' => 0.33, 'trung_tinh' => 0.34, 'tieu_cuc' => 0.33],
            'phuong_phap' => 'du_phong',
            'phien_ban_mo_hinh' => 'fallback-v1',
            'khia_canh_phat_hien' => [],
            'co_khung_hoang' => [],
            'thong_bao' => 'Dịch vụ phân tích tạm thời gián đoạn. Đã dùng phương án dự phòng.'
        ];
    }
}