<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prodi extends Model
{
    use HasFactory;

    // use softDeletes
    // use SoftDeletes;

    protected $table = 'prodis';
    protected $guarded = ['id'];
}
