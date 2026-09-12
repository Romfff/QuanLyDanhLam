<?php
namespace App\Http\Controllers;

use App\Exceptions\GioiThieuException;
use App\Models\{DiemDen, UuDaiDoiTac};
use App\Services\GioiThieuTourService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GioiThieuTourController extends Controller
{
    public function __construct(private GioiThieuTourService $svc) {}

    public function duDieuKien(DiemDen $diemDen)
    {
        $kq = $this->svc->kiemTraDieuKien($diemDen);
        $u = UuDaiDoiTac::where('diem_den_id', $diemDen->id)->where('trang_thai', 'dang_ap_dung')->orderBy('id')->first();
        $kq['uu_dai'] = $u ? [
            'ten' => $u->ten_uu_dai,
            'con_lai_hom_nay' => $u->ngay_dem->isToday()
                ? $u->so_luot_toi_da_moi_ngay - $u->so_luot_da_cap
                : $u->so_luot_toi_da_moi_ngay,
        ] : null;
        return response()->json(['data' => $kq]);
    }

    public function tao(Request $r, DiemDen $diemDen)
    {
        try {
            $kq = $this->svc->capPhieu($r->user(), $diemDen);
        } catch (GioiThieuException $e) {
            return response()->json(['error' => $e->ma, 'message' => $e->getMessage()], $e->status);
        }
        $p = $kq['phieu'];
        return response()->json([
            'data' => [
                'ma_tham_chieu' => $p->ma_tham_chieu,
                'han_hieu_luc'  => $p->han_hieu_luc->toIso8601String(),
                'con_lai_giay'  => max(0, $p->han_hieu_luc->timestamp - now()->timestamp),
            ],
            'message' => $kq['moi'] ? 'Đã giữ ưu đãi ' . config('gioi_thieu.hieu_luc_phut') . ' phút'
                                    : 'Bạn đang có phiếu còn hạn',
        ], $kq['moi'] ? 201 : 200);
    }

    public function chuyenHuong(Request $r, string $ma)
    {
        try {
            $kq = $this->svc->chuyenHuong($r->user(), $ma, $r->userAgent());
        } catch (GioiThieuException $e) {
            return response()->json(['error' => $e->ma, 'message' => $e->getMessage()], $e->status);
        }
        return response()->json(['data' => $kq]);
    }

    public function cuaToi(Request $r)
{
    $tb = [
        'moi_tao'         => 'Ưu đãi đang được giữ cho bạn.',
        'da_chuyen_huong' => 'Bạn đã sang trang đối tác, đang chờ đối tác xác nhận.',
        'da_mua'          => 'Đối tác đã xác nhận đơn của bạn. Cảm ơn bạn!',
        'da_hoan'         => 'Đơn đã được hoàn theo chính sách của đối tác.',
        'het_han'         => 'Phiếu ưu đãi đã hết hạn.',
    ];
    $ds = DB::table('phieu_gioi_thieu as p')->join('diem_den as d', 'd.id', '=', 'p.diem_den_id')
        ->where('p.nguoi_dung_id', $r->user()->id)->orderByDesc('p.id')->limit(50)
        ->get(['p.ma_tham_chieu', 'p.trang_thai', 'p.han_hieu_luc', 'p.ngay_mua', 'd.ten as diem_den'])
        ->map(fn ($p) => (array) $p + ['thong_bao' => $tb[$p->trang_thai] ?? '']);
    return response()->json(['data' => $ds]);
}
}

