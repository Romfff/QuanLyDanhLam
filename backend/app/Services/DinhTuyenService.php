<?php
namespace App\Services;

use App\Models\DiemDen;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DinhTuyenService
{
    /** Cận dưới khoảng tin cậy Wilson 95% */
    public static function wilsonLower(int $k, int $n, float $z = 1.96): float
    {
        if ($n <= 0) return 0.0;
        $p = $k / $n; $z2 = $z * $z;
        $tam = $p + $z2 / (2 * $n);
        $bien = $z * sqrt(($p * (1 - $p) + $z2 / (4 * $n)) / $n);
        return max(0.0, ($tam - $bien) / (1 + $z2 / $n));
    }

    private function loaiGiaMao($q, float $nguong)
    {
        return $q->whereNotExists(function ($s) use ($nguong) {
            $s->select(DB::raw(1))->from('nghi_ngo_gia_mao as n')
              ->whereColumn('n.danh_gia_id', 'g.id')->where('n.diem_nghi_ngo', '>=', $nguong);
        });
    }

    private function dem($q, string $tu, string $den): object
    {
        return (clone $q)->where('g.ngay_dang', '>', $tu)->where('g.ngay_dang', '<=', $den)
            ->selectRaw("COUNT(*) AS n,
                         COALESCE(SUM(g.sac_thai_tong = 'tich_cuc'), 0) AS tich,
                         COALESCE(SUM(g.sac_thai_tong = 'tieu_cuc'), 0) AS tieu")->first();
    }

    public function tinh(DiemDen $d, array $ghiDe = [], bool $ghi = true): array
    {
        $c = array_merge(config('dinh_tuyen'), $ghiDe);
        $max = DB::table('danh_gia')->where('diem_den_id', $d->id)->max('ngay_dang');
        $neo = $max ? Carbon::parse($max) : Carbon::today();
        $den = $neo->toDateString();
        $q = $this->loaiGiaMao(DB::table('danh_gia as g')->where('g.diem_den_id', $d->id)
                ->whereNotNull('g.sac_thai_tong'), (float) $c['loai_gia_mao']);
        $r = $this->dem($q, $neo->copy()->subDays($c['cua_so_ty_le_ngay'])->toDateString(), $den);
        $n = (int) $r->n; $tich = (int) $r->tich; $tieu = (int) $r->tieu;
        $tlTich = $n ? $tich / $n : 0.0;
        $tlTieu = $n ? $tieu / $n : 0.0;
        $wilson = self::wilsonLower($tich, $n);
        $nang = (int) $this->loaiGiaMao(
            DB::table('danh_gia_khung_hoang as k')
              ->join('tu_khoa_khung_hoang as t', 't.id', '=', 'k.tu_khoa_id')
              ->join('danh_gia as g', 'g.id', '=', 'k.danh_gia_id')
              ->where('g.diem_den_id', $d->id)->where('t.cap_do', 'nang')->where('t.trang_thai', 'dang_dung')
              ->where('g.ngay_dang', '>', $neo->copy()->subDays($c['cua_so_co_nang_ngay'])->toDateString()),
            (float) $c['loai_gia_mao'])->distinct()->count('k.danh_gia_id');

        $R = (int) $c['cua_so_dot_bien_ngay'];
        $gan = $this->dem($q, $neo->copy()->subDays($R)->toDateString(), $den);
        $truoc = $this->dem($q, $neo->copy()->subDays(2 * $R)->toDateString(), $neo->copy()->subDays($R)->toDateString());
        $dotBien = false; $muc = 0.0;
        if ((int) $gan->n >= $c['dot_bien_min_review'] && (int) $truoc->n >= $c['dot_bien_min_review']) {
            $muc = $gan->tieu / $gan->n - $truoc->tieu / $truoc->n;
            $dotBien = $muc >= $c['dot_bien_muc_tang'] && (int) $gan->tieu >= $c['min_tieu_cuc'];
        }
        $ly = [];
        if ($nang >= $c['min_co_nang']) {
            $ly[] = "Có {$nang} đánh giá độc lập nhắc tới sự cố nghiêm trọng trong {$c['cua_so_co_nang_ngay']} ngày gần nhất";
        }
        if ($n >= $c['min_review'] && $tlTieu >= $c['nguong_canh_bao'] && $tieu >= $c['min_tieu_cuc']) {
            $ly[] = sprintf('Có %d/%d đánh giá tiêu cực (%d%%), từ ngưỡng %d%%',
                $tieu, $n, round($tlTieu * 100), round($c['nguong_canh_bao'] * 100));
        }
        if ($dotBien) {
            $ly[] = sprintf('Tỷ lệ tiêu cực tăng %d điểm phần trăm so với %d ngày trước đó', round($muc * 100), $R);
        }
        $lyDoMang = $ly;
        if ($ly) {
            $tt = 'canh_bao';
        } elseif ($n < $c['min_review']) {
            $tt = 'chua_du_du_lieu';
            $ly[] = "Mới có {$n}/{$c['min_review']} đánh giá tối thiểu";
        } elseif ($tlTich >= $c['nguong_tich_cuc'] && $wilson >= $c['can_duoi_wilson']
                  && $tlTieu <= $c['nguong_tieu_cuc_sang'] && $nang === 0) {
            $tt = 'diem_sang';
            $ly[] = sprintf('Có %d đánh giá, tích cực %d%% (cận dưới %d%%), tiêu cực %d%%, không có cờ nghiêm trọng',
                $n, round($tlTich * 100), round($wilson * 100), round($tlTieu * 100));
        } else {
            $tt = 'binh_thuong';
            $ly[] = sprintf('Tích cực %d%% (cận dưới %d%%), tiêu cực %d%%: chưa đạt điều kiện điểm sáng và chưa chạm ngưỡng cảnh báo',
                round($tlTich * 100), round($wilson * 100), round($tlTieu * 100));
        }
        $kq = ['trang_thai' => $tt, 'so_review' => $n, 'ty_le_tich_cuc' => $tlTich, 'ty_le_tieu_cuc' => $tlTieu,
               'can_duoi_wilson' => $wilson, 'so_review_co_nang' => $nang, 'ly_do' => implode('; ', $ly),
               'ly_do_mang' => $lyDoMang, 'ngay_neo' => $max];
        if ($ghi) {
            DB::table('ket_qua_dinh_tuyen')->updateOrInsert(['diem_den_id' => $d->id], [
                'trang_thai' => $tt, 'so_review' => $n,
                'ty_le_tich_cuc' => round($tlTich, 4), 'ty_le_tieu_cuc' => round($tlTieu, 4),
                'can_duoi_wilson' => round($wilson, 4), 'so_review_co_nang' => $nang,
                'ly_do' => Str::limit($kq['ly_do'], 490, ''), 'ngay_neo' => $max, 'ngay_tinh' => now(),
            ]);
            if ($tt === 'canh_bao') $this->taoCanhBao($d, $kq, $nang);
        }
        return $kq;
    }

    private function taoCanhBao(DiemDen $d, array $kq, int $nang): void
    {
        $dangMo = DB::table('canh_bao_danh_tieng')->where('diem_den_id', $d->id)
            ->whereIn('trang_thai', ['chua_xu_ly', 'dang_xu_ly'])
            ->where('ngay_phat_hien', '>=', now()->subDays(7)->toDateString())->exists();
        if ($dangMo) return;
        $muc = $nang >= 3 ? 'nghiem_trong' : ($nang >= 2 ? 'cao' : ($kq['ty_le_tieu_cuc'] >= 0.40 ? 'cao' : 'trung_binh'));
        DB::table('canh_bao_danh_tieng')->insert([
            'diem_den_id' => $d->id, 'ngay_phat_hien' => now()->toDateString(), 'muc_do' => $muc,
            'tieu_de' => Str::limit('Nhiều đánh giá tiêu cực cần theo dõi: ' . $d->ten, 190, ''),
            'mo_ta' => implode('; ', $kq['ly_do_mang']) . '. Kết quả do mô hình tự động ước lượng, cần người xem xét.',
            'trang_thai' => 'chua_xu_ly',
        ]);
    }
}