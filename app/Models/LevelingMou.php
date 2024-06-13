<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LevelingMou extends Model
{
    use HasFactory;
    // use SoftDeletes;

    protected $table = 'leveling_doc';
    protected $guarded = ['id'];
}
