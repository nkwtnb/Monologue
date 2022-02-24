<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Like extends Model
{
    use HasFactory;

    protected $visible = [
        "entry_id",
        "user_id"
    ];

    protected $fillable = [
        "entry_id",
        "user_id"
    ];

    public static function getLikesByUserId($id) {
        $filtered = [];
        $likes = Like::where("user_id", $id)->get();
        foreach ($likes as $value) {
            $filtered[] = $value["entry_id"];
        }
        return $filtered;
    }
}
