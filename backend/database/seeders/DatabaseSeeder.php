<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Loại bỏ created_at và updated_at để khớp chính xác với bảng trong schema.sql
        DB::table('nguoi_dung_he_thong')->insert([
            [
                'ten_dang_nhap' => 'admin_test',
                'ho_ten'        => 'Nguyễn Quản Trị',
                'email'         => 'admin@test.com',
                'mat_khau_hash' => Hash::make('12345678'),
                'vai_tro'       => 'admin',
            ],
            [
                'ten_dang_nhap' => 'qldd_test',
                'ho_ten'        => 'Trần Quản Lý',
                'email'         => 'qldd@test.com',
                'mat_khau_hash' => Hash::make('12345678'),
                'vai_tro'       => 'quan_ly_diem_den',
            ],
            [
                'ten_dang_nhap' => 'khach_test',
                'ho_ten'        => 'Lê Du Khách',
                'email'         => 'khach@test.com',
                'mat_khau_hash' => Hash::make('12345678'),
                'vai_tro'       => 'du_khach',
            ],
        ]);
    }
}