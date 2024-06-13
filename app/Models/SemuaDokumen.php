<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemuaDokumen extends Model
{
    use HasFactory;


    protected $table = 'semua_dokumen';
    protected $guarded = ['id'];

    public function DokumenMou()
    {
        return $this->belongsTo(DokumenMou::class, 'mou_id', 'id');
    }
    public function DokumenMoa()
    {
        return $this->hasMany(DokumenMoa::class, 'moa_id', 'id');
    }
}
