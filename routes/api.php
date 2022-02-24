<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\OgpController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
use Illuminate\Http\Request;
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

Route::group(['middleware' => ['auth:sanctum']], function() {
    // ユーザー情報
    Route::put("/user", [UserController::class, "put"]);
    // 投稿
    Route::post("/words", [WordController::class, "post"]);
    // いいね
    Route::post("/likes", [LikeController::class, "post"]);
    Route::delete("/likes", [LikeController::class, "delete"]);
    // 画像
    Route::post("/file/upload", [FileController::class, "action"]);
});
