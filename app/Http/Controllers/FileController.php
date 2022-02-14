<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class FileController extends Controller
{
    public function get(Request $request, $fileName) {
        $path = storage_path('app/public/upfiles/' . $fileName);
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
        $path = FileController::upload($request, $request->upload_file);
        return $path;
        // // storage/app/upfiles配下にアップロード
        // $basePath = "public/upfiles";
        // $filePath = $request->upload_file->store($basePath);
        // $fileName = substr($filePath, strlen($basePath) + 1);
        // $downloadPath = $request->getUriForPath('') . "/upfiles/" . $fileName;
        // return $downloadPath;
    }

    public static function upload(Request $request, $file) {
        // storage/app/upfiles配下にアップロード
        $basePath = "public/upfiles";
        $filePath = $file->store($basePath);
        $fileName = substr($filePath, strlen($basePath) + 1);
        $downloadPath = $request->getUriForPath('') . "/upfiles/" . $fileName;
        return $downloadPath;
    }

    public static function uploadFromController(Request $request, $base64) {
        $basePath = base_path("public/storage/upfiles");
        $data = preg_replace('#data:image/[^;]+;base64,#', '' , $base64);
        logger("upload : " . $data);
        $image = base64_decode($data);
        $ret = file_put_contents($basePath. "/testaaa.png", $image);
        return $ret;
        // $filePath = $file->store($basePath);
        // $fileName = substr($filePath, strlen($basePath) + 1);
        // $downloadPath = $request->getUriForPath('') . "/upfiles/" . $fileName;
        // return $downloadPath;
    }
}
