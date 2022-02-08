<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public function get(Request $request, $name = "")
    {
        if ($request->filter === "like") {
            return $this->getEntriesFilterLikes($name);
        }
        $query = 
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
        ";

        $where = 
        "
        where
            b.name = :name
        ";

        $order = 
        "
        order by
            a.created_at desc;
        ";

        if ($name !== "") {
            $query = $query . $where . $order;
            $entries = DB::select($query, ["name" => $name]);
            return $entries;
        } else {
            $query = $query . $order;
            $entries = DB::select($query);
            return $entries;
        }
    }

    public function getEntriesFilterLikes($name) {
        $query = 
        "
        select
            a.created_at,
            b.name,
            b.avatar,
            a.id,
            a.words,
            IFNULL(c.likes, 0) as likes
        from
            words a
        inner join users b
            on a.user_id = b.id
        inner join (
            SELECT 
                a.id,
                a.entry_id ,
                a.user_id ,
                b.id as いいねした人,
                b.name
            from
                likes a,
                users b
            WHERE 
                a.user_id = b.id 
            and b.name = :name
        ) fil
            on  a.id = fil.entry_id
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
        ";
        $entries = DB::select($query, ["name" => $name]);
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
