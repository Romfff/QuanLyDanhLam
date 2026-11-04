<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiemDenController;
use App\Http\Controllers\DanhGiaController;
use App\Http\Controllers\KhiaCanhController;
use App\Http\Controllers\GioiThieuTourController;
use Illuminate\Support\Facades\DB;

// Kiểm tra sức khỏe hệ thống (Health Check)
Route::get('/healthz', function () {
    $dbOk = false;
    try {
        DB::connection()->getPdo();
        $dbOk = true;
    } catch (\Exception $e) {}
    
    return response()->json([
        'status' => $dbOk ? 'healthy' : 'degraded',
        'app' => 'DT12-Sentiment-API',
        'database' => $dbOk ? 'connected' : 'disconnected',
        'timestamp' => now()->toIso8601String()
    ], $dbOk ? 200 : 503);
});

// Route công khai
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::get('diem-den', [DiemDenController::class, 'index']);
Route::get('diem-den/{id}', [DiemDenController::class, 'show']);
Route::get('diem-den/{diemDen}/trang-thai', [DiemDenController::class, 'trangThai']);
Route::get('diem-den/{diemDen}/du-dieu-kien-gioi-thieu', [GioiThieuTourController::class, 'duDieuKien']);

Route::get('danh-gia', [DanhGiaController::class, 'index']);
Route::post('danh-gia/phan-tich-thu', [DanhGiaController::class, 'phanTichThu']);
Route::get('khia-canh', [KhiaCanhController::class, 'index']);

// Route yêu cầu phải Đăng nhập (Có Bearer Token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);
    
    // Sửa điểm đến (Policy tự kiểm tra quyền theo phạm vi)
    Route::put('diem-den/{diemDen}', [DiemDenController::class, 'update']);

    // Giới thiệu tour & chuyển hướng đối tác
    Route::get('phieu-gioi-thieu/cua-toi', [GioiThieuTourController::class, 'cuaToi']);
    Route::post('diem-den/{diemDen}/gioi-thieu-tour', [GioiThieuTourController::class, 'tao'])->middleware('throttle:10,1');
    Route::post('phieu-gioi-thieu/{ma}/chuyen-huong', [GioiThieuTourController::class, 'chuyenHuong'])->middleware('throttle:20,1');
});

// Route chỉ dành riêng cho Admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('diem-den', [DiemDenController::class, 'store']);
    Route::delete('diem-den/{diemDen}', [DiemDenController::class, 'destroy']);
});
