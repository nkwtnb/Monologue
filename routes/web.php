<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RootController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix("api")->group(function() {
  Route::get("/user/{name}", [UserController::class, "getUserByName"]);

  Route::get("/words/user/{name}/posts", [WordController::class, "getWordsByUser"]);
  Route::get("/words/user/{name}/likes", [WordController::class, "getWordsByUserLikes"]);
  Route::get("/words/post/{postId}", [WordController::class, "getWordsByPostId"]);
  Route::get("/words", [WordController::class, "get"]);
  
  // Route::get("/likes", [LikeController::class, "get"]);
  
  Route::get("/authenticatedUser", [UserController::class, "getAuthenticatedUser"]);
});

Route::get("/upfiles/{fileName}", [FileController::class, "get"])->where("fileName", ".*");
Route::post('/register', [RegisterController::class, 'callRegister'])->name('register');
Route::post('/login', [LoginController::class, 'loginTest'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// 認証済み画面
Route::get('/{any}', [RootController::class, "index"])->where("any", ".*")->name("home");

// Auth::routes();
