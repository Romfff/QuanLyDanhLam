<?php

namespace App\Http\Controllers;

use App\Models\NguoiDungHeThong;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        $data = $r->validate([
            'ten_dang_nhap' => ['required','string','max:50', Rule::unique('nguoi_dung_he_thong')],
            'ho_ten'        => ['required','string','max:150'],
            'email'         => ['required','email','max:150', Rule::unique('nguoi_dung_he_thong')],
            'mat_khau'      => ['required','string','min:8'],
        ]);

        $user = NguoiDungHeThong::create([
            'ten_dang_nhap' => $data['ten_dang_nhap'],
            'ho_ten'        => $data['ho_ten'],
            'email'         => $data['email'],
            'mat_khau_hash' => Hash::make($data['mat_khau']),
            'vai_tro'       => 'du_khach',
        ]);

        return response()->json([
            'data' => ['id' => $user->id, 'ho_ten' => $user->ho_ten, 'vai_tro' => $user->vai_tro],
            'message' => 'Đăng ký thành công',
        ], 201);
    }

    public function login(Request $r)
    {
        $data = $r->validate([
            'email' => ['required','email'], 
            'mat_khau' => ['required','string']
        ]);

        $user = NguoiDungHeThong::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['mat_khau'], $user->mat_khau_hash)) {
            return response()->json([
                'error' => 'xac_thuc_that_bai',
                'message' => 'Email hoặc mật khẩu không đúng',
            ], 401);
        }

        $token = $user->createToken('phien-' . now()->timestamp)->plainTextToken;

        return response()->json([
            'data' => [
                'token' => $token,
                'nguoi_dung' => [
                    'id' => $user->id, 
                    'ho_ten' => $user->ho_ten, 
                    'vai_tro' => $user->vai_tro
                ],
            ],
        ]);
    }

    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function me(Request $r)
    {
        $u = $r->user();
        return response()->json([
            'data' => [
                'id' => $u->id, 
                'ho_ten' => $u->ho_ten, 
                'vai_tro' => $u->vai_tro,
                'diem_den_phu_trach' => $u->diemDenPhuTrach()->pluck('id'),
            ],
        ]);
    }
}