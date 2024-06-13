<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LampiranKegiatan extends Model
{
    use HasFactory;


    protected $table = 'lampiran_kegiatan';
    protected $guarded = ['id'];
}
