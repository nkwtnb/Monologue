<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function get() {
        $likes = Like::getLikesByUserId(Auth::id());
        return response()->json($likes);
    }
    //
    public function post(Request $request) {
        Like::create([
            "entry_id" => $request->entryId,
            "user_id" => Auth::id(),
        ]);
        return;
    }

    public function delete(Request $request) {
        $like = Like::where([
            "entry_id" => $request->entryId,
            "user_id" => Auth::id(),
        ]);
        $like->delete();
    }
}
