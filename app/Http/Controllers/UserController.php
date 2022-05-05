<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Ogp;
use App\Models\User;
use App\Models\Word;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule as ValidationRule;

class UserController extends Controller
{
    public static function getAuthenticatedUser(Request $request) {
        if (Auth::check()) {
            return User::find(Auth::id());
        } else {
            return User::getDefaultValue();
        }
    }

    public function getUserByName(Request $request, $name) {
        $user = User::where("name", $name)->first();
        return $user;
    }

    public function put(Request $request) {
        $this->validator($request->all())->validate();
        $user = User::find(Auth::id());
        $user->name = $request->name;
        $user->email = $request->email;
        $user->avatar = $request->avatar;
        $user->message = $request->message;
        
        $user->save();
        return $user;
    }

    public function delete(Request $request) {
        DB::transaction(function() { 
            $user_id = Auth::id();
            $words = Word::where('user_id', $user_id)->get();
            $deleteId = [];
            foreach($words as $word) {
                $deleteId[] = $word->id;
            }
            Ogp::whereIn("word_id", $deleteId)->delete();
            Word::where('user_id', $user_id)->delete();
            Like::where('user_id', $user_id)->delete();
            User::find($user_id)->delete();
        });
        return;
        // logger($user);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        $user = User::find(Auth::id());
        return Validator::make($data, [
            'name' => [
                'required',
                'string',
                'max:10',
                ValidationRule::unique("users")->ignore($user->id),
            ],
            'message' => [
                'nullable',
                'string',
                'max:100',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                ValidationRule::unique("users")->ignore($user->id),
            ],
        ]);
    }
}
