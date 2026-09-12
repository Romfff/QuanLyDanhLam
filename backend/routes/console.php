<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Services\GioiThieuTourService;

// Câu lệnh mặc định của Laravel (Giữ nguyên)
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Tác vụ định kỳ: Thu hồi phiếu ưu đãi quá hạn mỗi 1 phút
Schedule::call(fn () => app(GioiThieuTourService::class)->giaiPhongPhieuHetHan())
    ->everyMinute()
    ->name('giai-phong-phieu-het-han')
    ->withoutOverlapping();
    

Schedule::command('dinh-tuyen:tinh')->dailyAt('01:00')->withoutOverlapping();