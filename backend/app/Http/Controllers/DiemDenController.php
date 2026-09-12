<?php

namespace App\Http\Controllers;

use App\Models\DiemDen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiemDenController extends Controller
{
    public function index(Request $r)
    {
        $user = $r->user('sanctum');

        $query = DiemDen::query();

        if ($user && $user->vai_tro === 'quan_ly_diem_den') {
            $query->where('nguoi_phu_trach_id', $user->id);
        }

        $soDong = min((int) ($r->so_dong ?? 20), 100);
        $dsDiemDen = $query->paginate($soDong);

        return response()->json([
            'data' => $dsDiemDen->items(),
            'meta' => [
                'trang' => $dsDiemDen->currentPage(),
                'so_dong' => $soDong,
                'tong_trang' => $dsDiemDen->lastPage(),
                'tong_ban_ghi' => $dsDiemDen->total(),
            ]
        ]);
    }

    public function show($id)
    {
        $diemDen = DiemDen::find($id);

        if (!$diemDen) {
            return response()->json([
                'error' => 'khong_tim_thay',
                'message' => 'Không tìm thấy điểm đến'
            ], 404);
        }

        return response()->json(['data' => $diemDen]);
    }

    public function trangThai(DiemDen $diemDen)
    {
        $r = DB::table('ket_qua_dinh_tuyen')->where('diem_den_id', $diemDen->id)->first();

        if (! $r) {
            return response()->json(['data' => [
                'trang_thai' => 'chua_du_du_lieu',
                'ly_do' => 'Chưa có kết quả tính toán',
                'hien_nut_doi_tac' => false,
                'hien_canh_bao' => false
            ]]);
        }

        return response()->json(['data' => [
            'trang_thai' => $r->trang_thai,
            'ly_do' => $r->ly_do,
            'so_review' => (int) $r->so_review,
            'hien_nut_doi_tac' => $r->trang_thai === 'diem_sang',
            'hien_canh_bao' => $r->trang_thai === 'canh_bao',
            'ghi_chu' => 'Kết quả do mô hình tự động ước lượng và có thể sai. Xem các đánh giá gốc để kiểm chứng.',
        ]]);
    }
}