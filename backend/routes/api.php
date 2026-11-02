<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

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

Route::post('/auth/register', 'App\Http\Controllers\AuthController@register');
Route::post('/auth/login', 'App\Http\Controllers\AuthController@login');
Route::get('/diem-den', 'App\Http\Controllers\DiemDenController@index');
Route::get('/diem-den/{id}', 'App\Http\Controllers\DiemDenController@show');
Route::get('/danh-gia', 'App\Http\Controllers\DanhGiaController@index');
