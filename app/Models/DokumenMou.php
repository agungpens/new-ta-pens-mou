<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DokumenMou extends Model
{
    use HasFactory;


    protected $table = 'dokumen_mou';
    protected $guarded = ['id'];

    public function LevelDocMou()
    {
        return $this->belongsTo(LevelingMou::class, 'level_mou', 'id');
    }
    public function KategoriMou()
    {
        return $this->belongsTo(KategoriDoc::class, 'kategori_mou', 'id');
    }
    public function JenisMou()
    {
        return $this->belongsTo(JenisDoc::class, 'jenis_doc', 'id');
    }
    public function RelevansiProdiMou()
    {
        return $this->hasMany(Prodi::class, 'relevansi_prodi', 'id');
    }
    public function DokumenMoa()
    {
        return $this->hasMany(DokumenMoa::class, 'nomor_mou', 'nomor_mou');
    }
}
