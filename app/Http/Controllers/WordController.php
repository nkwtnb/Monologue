<?php

namespace App\Http\Controllers;

use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WordController extends Controller
{
    public function get() {
        $entries = Word::getEntries();
        return $entries;
    }

    public function getWordsByUser(Request $request, $name) {
        $entries = Word::getEntries($name, Word::FILTER_TYPE_NAME);
        return $entries;
    }

    public function getWordsByUserLikes(Request $request, $name) {
        $entries = Word::getLikeEntries($name);
        return $entries;
    }

    public function getWordsByPostId(Request $request, $postId) {
        logger("getWordsByPostId : " . $postId);
        $entries = Word::getEntries($postId, Word::FILTER_TYPE_POST_ID);
        $replies = Word::getEntries($postId, Word::FILTER_TYPE_REPLIES);
        return [
            "entries" => $entries,
            "replies" => $replies
        ];
    }

    public function post(Request $request)
    {
        $param = [
            "user_id" => Auth::id(),
            "words" => $request->words,
            "reply_to" => $request->reply_to,
        ];
        foreach($request->images as $index => $image) {
            $param["image_" . ($index+1)] = $image;
        //     $ret = FileController::uploadFromController($request, $image);
        //     logger($ret);
        //     // $param["image_". $index] = $image;
        }
        // logger($request->images);
        logger($param);
        Word::create($param);
    }
}
