<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public function get() {
        $entries = DB::select(
            "select
                a.created_at,
                b.id,
                b.name,
                b.avatar,
                a.id,
                a.words
            from
                words a,
                users b
            where
                a.user_id = b.id
            order by
                a.created_at desc;
            "
        );
        return $entries;
    }

    //
    public function postEntry(Request $request) {
        Word::create([
            "user_id" => Auth::id(),
            "words" => $request->words
        ]);
    }
}
