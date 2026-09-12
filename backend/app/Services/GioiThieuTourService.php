<?php
namespace App\Services;

use App\Exceptions\GioiThieuException;
use App\Models\{CanhBaoDanhTieng, DanhGia, DiemDen, NguoiDungHeThong, NhatKyClick, PhieuGioiThieu, UuDaiDoiTac};
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GioiThieuTourService
{
    public function kiemTraDieuKien(DiemDen $d): array
    {
        $kq = \DB::table('ket_qua_dinh_tuyen')->where('diem_den_id', $d->id)->first();
        if (! $kq) {
            return [
                'du_dieu_kien' => false,
                'ly_do' => ['Chưa có kết quả đánh giá danh tiếng cho điểm đến này'],
                'thong_ke' => []
            ];
        }

        $du = $kq->trang_thai === 'diem_sang';

        return [
            'du_dieu_kien' => $du,
            'ly_do' => $du ? [] : [$kq->ly_do],
            'thong_ke' => [
                'trang_thai' => $kq->trang_thai,
                'so_review' => (int) $kq->so_review,
                'ty_le_tich_cuc' => (float) $kq->ty_le_tich_cuc
            ]
        ];
    }

    public function capPhieu(NguoiDungHeThong $u, DiemDen $d): array
    {
        $dk = $this->kiemTraDieuKien($d);
        if (! $dk['du_dieu_kien']) {
            throw new GioiThieuException('khong_du_dieu_kien', implode('; ', $dk['ly_do']), 422);
        }

        return DB::transaction(function () use ($u, $d) {
            // Khóa hàng ưu đãi để chống tranh chấp đồng thời
            $uuDai = UuDaiDoiTac::where('diem_den_id', $d->id)
                ->where('trang_thai', 'dang_ap_dung')
                ->orderBy('id')
                ->lockForUpdate()
                ->first();

            if (! $uuDai) {
                throw new GioiThieuException('khong_co_uu_dai', 'Điểm đến này chưa có ưu đãi đối tác', 404);
            }

            $homNay = now()->toDateString();
            if ($uuDai->ngay_dem->toDateString() !== $homNay) {
                $uuDai->ngay_dem = $homNay;
                $uuDai->so_luot_da_cap = 0;
            }

            $conHan = PhieuGioiThieu::where('nguoi_dung_id', $u->id)
                ->where('uu_dai_id', $uuDai->id)
                ->where('trang_thai', 'moi_tao')
                ->where('han_hieu_luc', '>', now())
                ->first();

            if ($conHan) {
                if ($uuDai->isDirty()) $uuDai->save();
                return ['phieu' => $conHan, 'moi' => false];
            }

            if ($uuDai->so_luot_da_cap >= $uuDai->so_luot_toi_da_moi_ngay) {
                throw new GioiThieuException('het_luot_uu_dai', 'Ưu đãi hôm nay đã hết lượt, vui lòng quay lại ngày mai', 409);
            }

            $uuDai->so_luot_da_cap++;
            $uuDai->save();

            $phieu = PhieuGioiThieu::create([
                'ma_tham_chieu' => strtoupper(Str::random(12)),
                'nguoi_dung_id' => $u->id,
                'diem_den_id'   => $d->id,
                'uu_dai_id'     => $uuDai->id,
                'ngay_cap'      => $homNay,
                'han_hieu_luc'  => now()->addMinutes(config('gioi_thieu.hieu_luc_phut')),
                'trang_thai'    => 'moi_tao',
            ]);

            return ['phieu' => $phieu, 'moi' => true];
        });
    }

    public function chuyenHuong(NguoiDungHeThong $u, string $ma, ?string $userAgent = null): array
    {
        return DB::transaction(function () use ($u, $ma, $userAgent) {
            $p = PhieuGioiThieu::where('ma_tham_chieu', $ma)->lockForUpdate()->first();
            if (! $p || (int) $p->nguoi_dung_id !== (int) $u->id) {
                throw new GioiThieuException('khong_tim_thay', 'Không tìm thấy phiếu', 404);
            }

            if ($p->trang_thai === 'het_han' || ($p->trang_thai === 'moi_tao' && $p->han_hieu_luc->isPast())) {
                throw new GioiThieuException('phieu_het_han', 'Phiếu ưu đãi đã hết hạn', 410);
            }

            $uuDai = UuDaiDoiTac::with('doiTac')->findOrFail($p->uu_dai_id);
            $daGhiTruoc = $p->trang_thai === 'da_chuyen_huong';

            if (! $daGhiTruoc) {
                $p->update(['trang_thai' => 'da_chuyen_huong', 'ngay_chuyen_huong' => now()]);
                NhatKyClick::create([
                    'phieu_id'    => $p->id,
                    'doi_tac_id'  => $uuDai->doi_tac_id,
                    'diem_den_id' => $p->diem_den_id,
                    'user_agent'  => $userAgent ? Str::limit($userAgent, 250, '') : null,
                ]);
            }

            $dd = DiemDen::findOrFail($p->diem_den_id);
            $url = str_replace(
                ['{ma_tham_chieu}', '{ma_diem_den}'],
                [rawurlencode($p->ma_tham_chieu), rawurlencode($dd->ma_dinh_danh)],
                $uuDai->doiTac->mau_lien_ket
            );

            return ['url' => $url, 'da_ghi_nhan_truoc_do' => $daGhiTruoc];
        });
    }

    public function giaiPhongPhieuHetHan(): int
    {
        $n = 0;
        PhieuGioiThieu::where('trang_thai', 'moi_tao')
            ->where('han_hieu_luc', '<', now())
            ->chunkById(100, function ($rows) use (&$n) {
                foreach ($rows as $row) {
                    DB::transaction(function () use ($row, &$n) {
                        $p = PhieuGioiThieu::whereKey($row->id)->lockForUpdate()->first();
                        if (! $p || $p->trang_thai !== 'moi_tao') return;
                        $uuDai = UuDaiDoiTac::whereKey($p->uu_dai_id)->lockForUpdate()->first();
                        if ($uuDai && $uuDai->ngay_dem->toDateString() === $p->ngay_cap->toDateString()) {
                            $uuDai->update(['so_luot_da_cap' => max(0, $uuDai->so_luot_da_cap - 1)]);
                        }
                        $p->update(['trang_thai' => 'het_han']);
                        $n++;
                    });
                }
            });
        return $n;
    }
}