<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule as ValidationRule;

class UserController extends Controller
{
    //
    public function get(Request $request) {
        return $request->user();
    }

    public function put(Request $request) {
        $this->validator($request->all())->validate();
        $user = User::find(Auth::id());
        $user->name = $request->name;
        $user->email = $request->email;
        $user->avatar = $request->avatar;
        
        $user->save();
        return $user;
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
                'max:255',
                ValidationRule::unique("users")->ignore($user->id),
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
