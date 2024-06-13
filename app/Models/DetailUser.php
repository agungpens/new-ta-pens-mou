<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetailUser extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'detail_users';
    protected $guarded = ['id'];
}
