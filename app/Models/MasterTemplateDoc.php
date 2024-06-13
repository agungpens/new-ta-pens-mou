<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterTemplateDoc extends Model
{
    use HasFactory;


    protected $table = 'master_template_doc';
    protected $guarded = ['id'];
}
