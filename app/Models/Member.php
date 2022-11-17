<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'nip',
        'name',
        'golongan',
        'pangkat',
        'jabatan',
        'image',
    ];
}
