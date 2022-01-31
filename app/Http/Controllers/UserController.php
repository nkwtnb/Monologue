<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    public function get(Request $request) {
        return $request->user();
    }

    public function put(Request $request) {
        $user = User::find(Auth::id());
        $user->name = $request->name;
        $user->email = $request->email;
        $user->avatar = $request->avatar;
        
        $user->save();
        return $user;
    }
}
