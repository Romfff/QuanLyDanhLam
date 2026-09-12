<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string ...$vaiTroChoPhep)
    {
        $user = $request->user();
        if (! $user || ! in_array($user->vai_tro, $vaiTroChoPhep, true)) {
            return response()->json([
                'error' => 'khong_co_quyen',
                'message' => 'Không đủ quyền truy cập',
            ], 403);
        }
        return $next($request);
    }
}