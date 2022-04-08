<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\CustomLoginController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\OgpController;
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
  Route::get("/authenticatedUser", [UserController::class, "getAuthenticatedUser"]);
});

Route::post('/register', [RegisterController::class, 'callRegister'])->name('register');
Route::post('/login', [LoginController::class, 'loginTest'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::post('password/email', [ForgotPasswordController::class, "sendResetLinkEmail"])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, "showResetForm"])->name('password.reset');
Route::post('password/reset',  [ResetPasswordController::class, "reset"])->name('password.update');

// 認証済み画面
Route::get('/{any}', [RootController::class, "index"])->where("any", ".*")->name("home");

// Auth::routes();
