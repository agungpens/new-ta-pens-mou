<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisDoc extends Model
{
    use HasFactory;


    protected $table = 'jenis_doc';
    protected $guarded = ['id'];
}
