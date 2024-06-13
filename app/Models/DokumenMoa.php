<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenMoa extends Model
{
    use HasFactory;


    protected $table = 'dokumen_moa';
    protected $guarded = ['id'];

    public function doc_mou (){
        return $this->belongsTo(DokumenMou::class, 'nomor_mou', 'nomor_mou');
    }

    public function LevelDocMoa()
    {
        return $this->belongsTo(LevelingMou::class, 'level_moa', 'id');
    }
    public function KategoriMoa()
    {
        return $this->belongsTo(KategoriDoc::class, 'kategori_moa', 'id');
    }
    public function JenisMoa()
    {
        return $this->belongsTo(JenisDoc::class, 'jenis_doc', 'id');
    }
    public function RelevansiProdiMoa()
    {
        return $this->belongsTo(Prodi::class, 'relevansi_prodi', 'id');
    }
}
