<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RootController extends Controller
{
    public function __construct()
    {
    }
    //
    public function index() {
        // logger("▼user▼");
        // logger(Auth::id());
        // logger("▲user▲");
        // logger("root です");
        // if (!Auth::check()) {
        //     return redirect("/login");
        // }
        // logger("認証済み");
        return view('root');
    }
}
