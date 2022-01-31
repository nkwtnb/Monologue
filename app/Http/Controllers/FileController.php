<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class FileController extends Controller
{
    public function get(Request $request, $fileName) {
        // $contents = Storage::get('upfiles/' . $fileName);
        
        // $path = public_path("storage/app/public/upfiles/" . $fileName);
        // return response()->$contents;
        // return $any;
        $path = storage_path('app/public/upfiles/' . $fileName);
        logger($path);
        if (!File::exists($path)) {
            abort(404);
        }
        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);    
        return $response;
    }

    public function action(Request $request)
    {
        $request->validate([
            'upload_file' => 'required | max:1024 | mimes:jpg,jpeg,png,gif'
        ]);
        // storage/app/upfiles配下にアップロード
        $basePath = "public/upfiles";
        $filePath = $request->upload_file->store($basePath);
        $fileName = substr($filePath, strlen($basePath) + 1);
        $downloadPath = $request->getUriForPath('') . "/upfiles/" . $fileName;
        return $downloadPath;
    }
}
