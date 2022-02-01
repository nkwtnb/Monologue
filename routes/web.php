<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\RootController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WordController;
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

// 新規登録、ログイン
Route::get('/login', function () {
    logger("/login desu");
    return view('layouts.login');
});
Route::get('/register', function () {
    return view('layouts.register');
});

Route::get("/upfiles/{fileName}", [FileController::class, "get"])->where("fileName", ".*");
Route::get("/words", [WordController::class, "get"]);

Route::post('/register', [RegisterController::class, 'register'])->name('register');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::post("/user/get", [UserController::class, "get"]);
Route::post("/user/put", [UserController::class, "put"]);

Route::post("/words", [WordController::class, "postEntry"]);

Route::post("/file/upload", [FileController::class, "action"]);

// 認証済み画面
Route::get('/{any}', [RootController::class, "index"])->where("any", ".*")->name("home");

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
