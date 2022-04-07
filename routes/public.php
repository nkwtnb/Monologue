<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\OgpController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix("api")->group(function() {
    // ユーザー関連
    Route::get("/user/{name}", [UserController::class, "getUserByName"]);
    // 投稿関連
    Route::get("/words/user/{name}/posts", [WordController::class, "getWordsByUser"]);
    Route::get("/words/user/{name}/likes", [WordController::class, "getWordsByUserLikes"]);
    Route::get("/words/post/{postId}", [WordController::class, "getWordsByPostId"]);
    Route::get("/words", [WordController::class, "get"]);
    // OGP
    Route::get("/ogp", [OgpController::class, "get"]);
});

Route::get("/images/{type}/{fileName}", [FileController::class, "get"])->where("fileName", ".*");
