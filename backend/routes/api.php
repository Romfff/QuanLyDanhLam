<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiemDenController;
use App\Http\Controllers\DanhGiaController;
use App\Http\Controllers\KhiaCanhController;
use App\Http\Controllers\GioiThieuTourController;

// Route công khai
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

Route::get('diem-den', [DiemDenController::class, 'index']);
Route::get('diem-den/{id}', [DiemDenController::class, 'show']);

Route::get('danh-gia', [DanhGiaController::class, 'index']);
Route::post('danh-gia/phan-tich-thu', [DanhGiaController::class, 'phanTichThu']);
Route::get('khia-canh', [KhiaCanhController::class, 'index']);

Route::get('diem-den/{diemDen}/du-dieu-kien-gioi-thieu', [GioiThieuTourController::class, 'duDieuKien']);

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

Route::get('diem-den/{diemDen}/trang-thai', [DiemDenController::class, 'trangThai']);