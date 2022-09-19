<?php

namespace App\Http\Controllers;

use App\Libs\OgpUtil;
use App\Models\Like;
use App\Models\Word;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function Psy\debug;

class WordController extends Controller
{
    public function get() {
        $entries = Word::getEntries();
        $entries = $this->setLikeState($entries);
        return $entries;
    }

    public function getWordsByUser(Request $request, $name) {
        $entries = Word::getEntries($name, Word::FILTER_TYPE_NAME);
        $entries = $this->setLikeState($entries);
        return $entries;
    }

    public function getWordsByUserLikes(Request $request, $name) {
        $entries = Word::getLikeEntries($name);
        $entries = $this->setLikeState($entries);
        return $entries;
    }

    public function getWordsByPostId(Request $request, $postId) {
        $entries = Word::getEntries($postId, Word::FILTER_TYPE_POST_ID);
        $entries = $this->setLikeState($entries);
        $replies = Word::getEntries($postId, Word::FILTER_TYPE_REPLIES);
        $replies = $this->setLikeState($replies);
        return [
            "entries" => $entries,
            "replies" => $replies,
        ];
    }

    public function delete(Request $request) {
        $entry = Word::find($request->postId);
        $request->validate([
            'postId' => [
                function($attribute, $value, $fail) use($entry) {
                    if (!$entry) {
                        return $fail("対象の投稿が存在しません。");
                    }
                    if ((string)Auth::id() !== (string)$entry["user_id"]) {
                        return $fail("権限がありません。");
                    }
                }
            ],
        ]);

        $entry->delete();
    }

    public function post(Request $request)
    {
        // バリデーション
        $request->validate([
            'words' => 'required|max:100',
            'images' => [
                function($attribute, $value, $fail) {
                    if (count($value) > Word::MAX_IMAGES_COUNT) {
                        return $fail("画像は4つまでアップロード可能です。");
                    }
                }
            ]
        ]);

        // 内容をポスト
        $param = [
            "user_id" => Auth::id(),
            "words" => $request->words,
            "reply_to" => $request->reply_to,
        ];
        foreach($request->images as $index => $image) {
            $param["image_" . ($index+1)] = $image;
        }
        $word = Word::create($param);

        // OGP情報設定
        $url = OgpUtil::getURL($request->words);
        if (count($url) > 0) {
            $ogpInfo = OgpUtil::saveOgpImage($url);
            OgpUtil::post($request, $ogpInfo, $word->id);
        }
    }

    /**
     * 各投稿に対して、ログインユーザーのいいね状態を設定
     */
    private function setLikeState($entries) {
        // 未ログインの場合は[いいね]状態を設定せず終了
        if (!Auth::check()) {
            return $entries;
        }
        $likes = Like::getLikesByUserId(Auth::id());
        foreach($entries as $entry) {
            if(in_array($entry->id, $likes)) {
                $entry->isLike = true;
            } else {
                $entry->isLike = false;
            }
        }
        return $entries;
    }
}
