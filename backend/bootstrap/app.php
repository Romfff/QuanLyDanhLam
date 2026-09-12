<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// 1. Thêm các class Exception cần thiết ở đầu file
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Giữ nguyên Middleware 'role' đã làm từ Buổi 5
        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // 2. Điền đoạn xử lý lỗi chuẩn hóa JSON cho API
        $exceptions->render(function (ValidationException $e, Request $r) {
            if (! $r->is('api/*')) return null;
            $get = $r->isMethod('GET');
            return response()->json([
                'error'   => $get ? 'yeu_cau_khong_hop_le' : 'du_lieu_khong_hop_le',
                'message' => collect($e->errors())->flatten()->first(),
            ], $get ? 400 : 422);
        });

        $exceptions->render(function (AuthenticationException $e, Request $r) {
            if (! $r->is('api/*')) return null;
            return response()->json(['error' => 'chua_dang_nhap', 'message' => 'Phiên đăng nhập không hợp lệ'], 401);
        });

        $exceptions->render(function (AccessDeniedHttpException $e, Request $r) {
            if (! $r->is('api/*')) return null;
            return response()->json(['error' => 'khong_co_quyen', 'message' => 'Không đủ quyền truy cập'], 403);
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $r) {
            if (! $r->is('api/*')) return null;
            return response()->json(['error' => 'khong_tim_thay', 'message' => 'Không tìm thấy tài nguyên'], 404);
        });
    })->create();