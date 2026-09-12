<?php
namespace App\Console\Commands;

use App\Models\DiemDen;
use App\Services\DinhTuyenService;
use Illuminate\Console\Command;

class DinhTuyenTinh extends Command
{
    protected $signature = 'dinh-tuyen:tinh {--chi-xem : Chi in ket qua, khong ghi CSDL} {--diem-den= : Chi tinh mot diem den (id)}
        {--a= : nguong ty le tich cuc} {--b= : tieu cuc toi da de la diem sang}
        {--c= : nguong tieu cuc canh bao} {--min= : so review toi thieu}';
    protected $description = 'Tinh trang thai danh tieng cho tung diem den';

    public function handle(DinhTuyenService $svc): int
    {
        $ghiDe = array_filter([
            'nguong_tich_cuc'      => $this->option('a') !== null ? (float) $this->option('a') : null,
            'nguong_tieu_cuc_sang' => $this->option('b') !== null ? (float) $this->option('b') : null,
            'nguong_canh_bao'      => $this->option('c') !== null ? (float) $this->option('c') : null,
            'min_review'           => $this->option('min') !== null ? (int) $this->option('min') : null,
        ], fn ($v) => $v !== null);
        $q = DiemDen::query()->orderBy('id');
        if ($this->option('diem-den')) $q->whereKey((int) $this->option('diem-den'));
        $tong = []; $bang = [];
        foreach ($q->get() as $d) {
            $kq = $svc->tinh($d, $ghiDe, ! $this->option('chi-xem'));
            $tong[$kq['trang_thai']] = ($tong[$kq['trang_thai']] ?? 0) + 1;
            $bang[] = [$d->id, $d->ten, $kq['so_review'], round($kq['ty_le_tich_cuc'] * 100) . '%',
                       round($kq['ty_le_tieu_cuc'] * 100) . '%', $kq['so_review_co_nang'], $kq['trang_thai']];
        }
        $this->table(['id', 'diem den', 'n', 'tich cuc', 'tieu cuc', 'co nang', 'trang thai'], $bang);
        $this->info('Tong hop: ' . json_encode($tong));
        return self::SUCCESS;
    }
}