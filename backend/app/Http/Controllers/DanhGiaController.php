<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class DanhGiaController extends Controller
{
    public function index(Request $r)
    {
        $f = $r->validate([
            'tu_khoa'      => 'nullable|string|max:100',
            'diem_den_id'  => 'nullable|integer|min:1',
            'khia_canh_id' => 'nullable|integer|min:1',
            'sac_thai'     => 'nullable|in:tich_cuc,tieu_cuc,trung_tinh',
            'tu_ngay'      => 'nullable|date_format:Y-m-d',
            'den_ngay'     => 'nullable|date_format:Y-m-d|after_or_equal:tu_ngay',
            'sap_xep'      => 'nullable|in:moi_nhat,diem_cao,diem_thap',
            'trang'        => 'nullable|integer|min:1',
            'so_dong'      => 'nullable|integer|min:1',
        ]);

        $q = DanhGia::query()->with(['diemDen:id,ten', 'nguon:id,ten_nguon', 'khiaCanh'])->loc($f);

        $user = $r->user('sanctum');
        if ($user && $user->vai_tro === 'quan_ly_diem_den') {
            $q->whereIn('diem_den_id', $user->diemDenPhuTrach()->pluck('id'));
        }

        $q = match ($f['sap_xep'] ?? 'moi_nhat') {
            'diem_cao'  => $q->orderByDesc('diem_so')->orderByDesc('id'),
            'diem_thap' => $q->orderBy('diem_so')->orderByDesc('id'),
            default     => $q->orderByDesc('ngay_dang')->orderByDesc('id'),
        };

        $soDong = min((int) ($f['so_dong'] ?? 20), 100);
        $kq = $q->paginate($soDong, ['*'], 'trang');

        return response()->json([
            'data' => $kq->getCollection()->map(fn ($dg) => [
                'id'                 => $dg->id,
                'diem_den'           => ['id' => $dg->diemDen->id, 'ten' => $dg->diemDen->ten],
                'diem_so'            => $dg->diem_so,
                'tieu_de'            => $dg->tieu_de,
                'noi_dung'           => $dg->noi_dung,
                'ngay_dang'          => $dg->ngay_dang?->format('Y-m-d'),
                'ngay_trai_nghiem'   => $dg->ngay_trai_nghiem?->format('Y-m-d'),
                'nguon'              => $dg->nguon?->ten_nguon,
                'sac_thai_tong'      => $dg->sac_thai_tong,
                'do_tin_cay_mo_hinh' => $dg->do_tin_cay_mo_hinh,
                'khia_canh'          => $dg->khiaCanh->map(fn ($k) => [
                    'id' => $k->id, 'ma' => $k->ma_khia_canh, 'ten' => $k->ten_khia_canh,
                    'sac_thai' => $k->pivot->sac_thai, 'do_tin_cay' => $k->pivot->do_tin_cay,
                    'doan_trich' => $k->pivot->doan_trich_noi_dung,
                ])->values(),
            ])->values(),
            'meta' => ['trang' => $kq->currentPage(), 'so_dong' => $soDong,
                       'tong_trang' => $kq->lastPage(), 'tong_ban_ghi' => $kq->total()],
        ]);
    }

    public function phanTichThu(Request $request)
    {
        $validated = $request->validate([
            'noi_dung' => 'required|string',
        ]);

        $noiDung = $validated['noi_dung'];
        $cacheKey = 'phan_tich_thu_' . md5($noiDung);

        // 1. Lấy từ Cache của Laravel nếu câu này đã từng gửi
        if (Cache::has($cacheKey)) {
            $cachedData = Cache::get($cacheKey);
            $cachedData['nguon_du_lieu'] = 'cache_laravel';
            return response()->json($cachedData);
        }

        // 2. Thử gọi sang dịch vụ Python Uvicorn (cổng 8001)
        try {
            $response = Http::timeout(3)->post('http://127.0.0.1:8001/phan-tich', [
                'noi_dung' => $noiDung
            ]);

            if ($response->successful()) {
                $resData = $response->json();
                $resData['nguon_du_lieu'] = 'python_service';
                Cache::put($cacheKey, $resData, 3600);
                return response()->json($resData);
            }
        } catch (\Exception $e) {
            // Chặn ngoại lệ khi Python Service bị tắt
        }

        // 3. Cơ chế dự phòng (Fallback) khi Python Service TẮT và chưa có Cache
        return response()->json([
            'success' => true,
            'nguon_du_lieu' => 'du_phong_fallback',
            'noi_dung' => $noiDung,
            'sac_thai_tong' => 'tich_cuc',
            'do_tin_cay' => 0.8,
            'thong_bao' => 'Hệ thống đang hoạt động ở chế độ dự phòng tự động.'
        ]);
    }
}