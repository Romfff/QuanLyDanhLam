<?php
namespace App\Http\Controllers;
use App\Models\KhiaCanh;

class KhiaCanhController extends Controller
{
    public function index()
    {
        return response()->json(['data' => KhiaCanh::orderBy('thu_tu_hien_thi')
            ->get(['id', 'ma_khia_canh', 'ten_khia_canh'])]);
    }
}