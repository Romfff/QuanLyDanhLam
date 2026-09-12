<?php

namespace App\Console\Commands;

use App\Models\DanhGia;
use App\Services\PythonDataService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PhanTichDanhGia extends Command
{
    protected $signature = 'danh-gia:phan-tich {--tat-ca : Phân tích lại toàn bộ đánh giá}';
    protected $description = 'Gửi đánh giá sang Dịch vụ Python NLP để phân tích sắc thái và cờ khủng hoảng';

    public function handle(): int
    {
        $pyService = app(PythonDataService::class);

        $query = DanhGia::query();
        if (! $this->option('tat-ca')) {
            $query->whereNull('sac_thai_tong');
        }

        $danhGias = $query->get();
        if ($danhGias->isEmpty()) {
            $this->info("Không có đánh giá nào cần phân tích.");
            return self::SUCCESS;
        }

        $this->info("Bắt đầu phân tích " . $danhGias->count() . " đánh giá...");
        $bar = $this->output->createProgressBar($danhGias->count());
        $bar->start();

        foreach ($danhGias as $dg) {
            try {
                // Truyền false để bỏ qua bộ đệm (cache) khi phân tích hàng loạt
                $kq = $pyService->phanTich((string) $dg->noi_dung, false);

                if ($kq) {
                    DB::transaction(function () use ($dg, $kq) {
                        DanhGia::whereKey($dg->id)->update([
                            'sac_thai_tong'        => $kq['sac_thai_tong'] ?? null,
                            'do_tin_cay_mo_hinh'   => $kq['do_tin_cay'] ?? null,
                            'xac_suat_tich_cuc'    => $kq['xac_suat']['tich_cuc'] ?? null,
                            'xac_suat_trung_tinh'  => $kq['xac_suat']['trung_tinh'] ?? null,
                            'xac_suat_tieu_cuc'    => $kq['xac_suat']['tieu_cuc'] ?? null,
                            'phuong_phap_sac_thai' => $kq['phuong_phap'] ?? null,
                            'phien_ban_mo_hinh'    => $kq['phien_ban_mo_hinh'] ?? null,
                        ]);

                        DB::table('danh_gia_khia_canh')->where('danh_gia_id', $dg->id)->delete();
                        foreach ($kq['khia_canh_phat_hien'] ?? [] as $k) {
                            DB::table('danh_gia_khia_canh')->insert([
                                'danh_gia_id' => $dg->id,
                                'khia_canh_id' => $k['khia_canh_id'],
                                'sac_thai' => $k['sac_thai'],
                                'do_tin_cay' => $k['do_tin_cay'],
                                'doan_trich_noi_dung' => $k['doan_trich'],
                                'phuong_phap' => 'tu_dien',
                            ]);
                        }

                        DB::table('danh_gia_khung_hoang')->where('danh_gia_id', $dg->id)->delete();
                        foreach ($kq['co_khung_hoang'] ?? [] as $c) {
                            if (empty($c['tu_khoa_id'])) continue;
                            DB::table('danh_gia_khung_hoang')->insert([
                                'danh_gia_id' => $dg->id,
                                'tu_khoa_id' => $c['tu_khoa_id'],
                                'doan_trich' => $c['doan_trich'],
                            ]);
                        }
                    });
                } else {
                    $this->error("\nLỗi phân tích cho ID {$dg->id}");
                }
            } catch (\Exception $e) {
                $this->error("\nLỗi kết nối/xử lý khi phân tích ID {$dg->id}: " . $e->getMessage());
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Đã hoàn thành phân tích toàn bộ đánh giá!");

        return self::SUCCESS;
    }
}