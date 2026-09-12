<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UuDaiDoiTac extends Model
{
    protected $table = 'uu_dai_doi_tac';
    public $timestamps = false;
    protected $guarded = [];
    protected $casts = ['ngay_dem' => 'date'];

    public function doiTac()
    {
        return $this->belongsTo(DoiTacDuLich::class, 'doi_tac_id');
    }
}