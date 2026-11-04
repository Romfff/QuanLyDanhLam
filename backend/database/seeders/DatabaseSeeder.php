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
                'ten_dang_nhap' => 'admin_demo',
                'ho_ten'        => 'Nguyễn Quản Trị (Admin)',
                'email'         => 'admin@demo.test',
                'mat_khau_hash' => Hash::make('Admin@123456'),
                'vai_tro'       => 'admin',
            ],
            [
                'ten_dang_nhap' => 'analyst_demo',
                'ho_ten'        => 'Chuyên Viên Phân Tích',
                'email'         => 'analyst@demo.test',
                'mat_khau_hash' => Hash::make('Analyst@123456'),
                'vai_tro'       => 'chuyen_vien_pt',
            ],
            [
                'ten_dang_nhap' => 'partner_demo',
                'ho_ten'        => 'Chủ Cơ Sở Đối Tác',
                'email'         => 'partner@demo.test',
                'mat_khau_hash' => Hash::make('Partner@123456'),
                'vai_tro'       => 'quan_ly_diem_den',
            ],
            [
                'ten_dang_nhap' => 'mod_demo',
                'ho_ten'        => 'Nhân Viên Kiểm Duyệt',
                'email'         => 'moderator@demo.test',
                'mat_khau_hash' => Hash::make('Mod@123456'),
                'vai_tro'       => 'quan_ly_diem_den',
            ],
            [
                'ten_dang_nhap' => 'tourist_demo',
                'ho_ten'        => 'Du Khách Trải Nghiệm',
                'email'         => 'tourist@demo.test',
                'mat_khau_hash' => Hash::make('User@123456'),
                'vai_tro'       => 'du_khach',
            ],
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