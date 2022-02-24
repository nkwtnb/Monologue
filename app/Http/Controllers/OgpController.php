<?php

namespace App\Http\Controllers;

use App\Libs\OgpUtil;
use Illuminate\Http\Request;

class OgpController extends Controller
{
    //
    public function get(Request $request) {
        $url = $request->url;
        $ogp = OgpUtil::get($url);

        return $ogp;
    }

    public function post(Request $request) {

    }
}
