<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;


    protected $table = 'kegiatan';

    public function NomorDocMou()
    {
        return $this->belongsTo(DokumenMou::class, 'nomor_mou', 'nomor_mou');
    }
    public function NomorDocMoa()
    {
        return $this->belongsTo(DokumenMoa::class, 'nomor_moa', 'nomor_moa');
    }
    public function Lampiran()
    {
        return $this->hasMany(LampiranKegiatan::class, 'kegiatan_id', 'id');
    }
}
