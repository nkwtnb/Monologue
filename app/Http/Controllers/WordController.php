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
            'select b.id, b.name, b.avatar, a.words from words a, users b where a.user_id = b.id;'
        );
        return $entries;
    }

    //
    public function postEntry(Request $request) {
        $word = new Word;
        $word->user_id = Auth::id();
        $word->words = $request->words;

        $word->save();
    }
}
