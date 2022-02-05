<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public function get()
    {
        $entries = DB::select(
            "
            select
                a.created_at,
                b.id,
                b.name,
                b.avatar,
                a.id,
                a.words,
                IFNULL(c.likes, 0) as likes
            from
                words a
            inner join
                users b on a.user_id = b.id
            left join
                (
                    select
                        entry_id,
                        count(entry_id) as likes
                    FROM
                        likes l
                    group by
                        l.entry_id
                ) c ON a.id = c.entry_id
            order by
                a.created_at desc;        
            "
        );
        return $entries;
    }

    //
    public function post(Request $request)
    {
        Word::create([
            "user_id" => Auth::id(),
            "words" => $request->words
        ]);
    }
}
