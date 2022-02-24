<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Word extends Model
{
    use HasFactory;

    const FILTER_TYPE_NOTHING = -1;
    const FILTER_TYPE_NAME = 0;
    const FILTER_TYPE_POST_ID = 1;
    const FILTER_TYPE_REPLIES = 2;

    const MAX_WORDS_LEN = 100;
    const MAX_IMAGES_COUNT = 4;

    protected $fillable = [
        "user_id",
        "words",
        "reply_to",
        "image_1",
        "image_2",
        "image_3",
        "image_4",
    ];

    public static function getLikeEntries($name) {
        $query = Word::makeQueryOfGetLikeEntries();
        $entries = DB::select($query, ["name" => $name]);
        $entries = Word::imagesToArray($entries);
        return $entries;
    }

    public static function getEntries($filterValue = "", $filterType = Word::FILTER_TYPE_NOTHING) {
        $query = Word::makeQueryOfGetEntries($filterType);
        if ($filterType == Word::FILTER_TYPE_NOTHING) {
            $entries = DB::select($query);
        } else {
            $entries = DB::select($query, ["filterValue" => $filterValue]);
        }
        $entries = Word::imagesToArray($entries);
        return $entries;
    }

    /**
     * [image_X] を配列に格納する
     */
    private static function imagesToArray($entries) {
        $MAX_COLUMN = 4;
        foreach($entries as $entryIndex => $value) {
            $images = [];
            for($i=1; $i<=$MAX_COLUMN; $i++) {
                if ($entries[$entryIndex]->{"image_$i"} !== NULL) {
                    $images[] = $entries[$entryIndex]->{"image_$i"};
                }
            }
            $entries[$entryIndex]->images = $images;
        }
        return $entries;
    }

    private static function makeQueryOfGetLikeEntries() {
        $query = 
        "
        select
            a.created_at,
            b.name,
            b.avatar,
            a.id,
            a.words,
            ogp.ogp_title,
            ogp.ogp_description,
            ogp.ogp_image,
            a.image_1,
            a.image_2,
            a.image_3,
            a.image_4,
            IFNULL(c.likes, 0) as likes,
            IFNULL(reply.count, 0) as replyCount
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
        left join (
            SELECT
                ogp_title,
                ogp_description,
                ogp_image,
                word_id
            FROM
                ogps
        ) ogp
            on word_id = a.id
        left join (
            SELECT 
                w.reply_to,
                count(w.reply_to) as count
            FROM 
                words w 
            Group by
                w.reply_to
        ) reply
            on a.id = reply.reply_to
        where
            a.reply_to IS NULL
        order by
            a.created_at desc;
        ";

        return $query;
    }

    private static function makeQueryOfGetEntries($filterType = "") {
        $query = 
        "
        select
            a.created_at,
            b.id,
            b.name,
            b.avatar,
            a.id,
            a.words,
            ogp.ogp_title,
            ogp.ogp_description,
            ogp.ogp_image,
            a.image_1,
            a.image_2,
            a.image_3,
            a.image_4,
            IFNULL(c.likes, 0) as likes,
            IFNULL(reply.count, 0) as replyCount
        from
            words a
        inner join
            users b on a.user_id = b.id
        left join (
            select
                entry_id,
                count(entry_id) as likes
            FROM
                likes l
            group by
                l.entry_id
        ) c ON a.id = c.entry_id
        left join (
            SELECT
                ogp_title,
                ogp_description,
                ogp_image,
                word_id
            FROM
                ogps
        ) ogp
            on word_id = a.id
        left join (
            SELECT 
                w.reply_to,
                count(w.reply_to) as count
            FROM 
                words w 
            Group by
                w.reply_to
        ) reply
            on a.id = reply.reply_to
        ";
        // 絞り込みなし
        if ($filterType === Word::FILTER_TYPE_NOTHING) {
            $query .= 
                "where
                    a.reply_to IS NULL
            ";
        // ユーザー名絞り込みの場合
        } else if ($filterType === Word::FILTER_TYPE_NAME) {
            $query .= 
            "where
                b.name = :filterValue
            and
                a.reply_to IS NULL
            ";
        // 投稿ID絞り込みの場合
        } else if($filterType === Word::FILTER_TYPE_POST_ID) {
            $query .= 
            "where
                a.id = :filterValue
            ";
        } else if($filterType === Word::FILTER_TYPE_REPLIES) {
            $query .= 
            "where
                a.reply_to = :filterValue
            ";
        }

        $query .=
        "order by
            a.created_at desc;
        ";

        return $query;
    }
}
