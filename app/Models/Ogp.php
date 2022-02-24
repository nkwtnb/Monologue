<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ogp extends Model
{
    use HasFactory;

    protected $visible = [
        "word_id",
        "ogp_image",
        "ogp_title",
        "ogp_description",
    ];

    protected $fillable = [
        "word_id",
        "ogp_image",
        "ogp_title",
        "ogp_description",
    ];
}
