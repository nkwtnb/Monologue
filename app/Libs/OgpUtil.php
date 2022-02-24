<?php

namespace App\Libs;

use App\Models\Ogp;
use Illuminate\Http\Request;

class OgpUtil
{

  /**
   * 文字列中の URL文字列（https://〜〜〜）を返す
   */
  public static function getURL(String $value)
  {
    $result = [];
    preg_match("(https:\/\/\S+)", $value, $result);
    return $result;
  }

  public static function saveOgpImage(array $urlArray)
  {
    $result = [];
    $options['ssl']['verify_peer'] = false;
    $options['ssl']['verify_peer_name'] = false;

    foreach ($urlArray as $url) {
      $ogp = OgpUtil::get($url);
      $savedFilePath = "";
      if ($ogp["thumbnail"] !== "") {
        // 画像取得
        $contents = file_get_contents($ogp["thumbnail"], false, stream_context_create($options));
        // 拡張子取得
        $ext = OgpUtil::get_extension($contents);
        if ($ext !== false) {
          $tmpname = tempnam(storage_path('app/public/ogp'), "");
          $filePath = $tmpname . "." . $ext;
          $handle = fopen($filePath, "wb");
          fwrite($handle, $contents);
          fclose($handle);
          unlink($tmpname);
          $pathInfo = pathinfo($filePath);
          $savedFilePath = $pathInfo["basename"];
        }
      }
      $result[] = array(
        "title" => $ogp["title"],
        "description" => $ogp["description"],
        "thumbnail" => $savedFilePath,
      );
    }
    return $result;
  }

  public static function post(Request $request, array $ogpInfo, int $id)
  {
    foreach ($ogpInfo as $ogp) {
      Ogp::create([
        "word_id" => $id,
        "ogp_title" => substr($ogp["title"], 0, 200),
        "ogp_description" => mb_substr($ogp["description"], 0, 200, "utf-8"),
        // mb_substr($content, 0, 120, 'utf-8');
        "ogp_image" => $ogp["thumbnail"],
      ]);
    }
  }

  public static function get(string $url)
  {
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_MAXREDIRS, 3);
    $html = curl_exec($curl);
    $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    if ($status_code !== 200) {
      return null;
    }

    $dom = new \DOMDocument();
    $from_encoding = mb_detect_encoding(
      $html,
      [
        'ASCII',
        'UTF-8',
        'EUC-JP',
        'SJIS',
      ],
      true
    );
    if (!$from_encoding) {
      $from_encoding = 'UTF-8';
    }
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', $from_encoding));
    $xml_object = simplexml_import_dom($dom);

    $ogp = [];
    $ogp["title"] = OgpUtil::get_title($xml_object);
    $ogp["description"] = OgpUtil::get_description($xml_object);
    logger($from_encoding);
    logger($ogp["description"]);
    $ogp["thumbnail"] = OgpUtil::get_thumbnail($xml_object);
    curl_close($curl);
    return $ogp;
  }

  /**
   * タイトルの取得
   */
  private static function get_title($xml_object)
  {
    $value = "";
    $og_tag = $xml_object->xpath('//meta[@property="og:title"]/@content');
    if (count($og_tag) > 0) {
      $value = $og_tag[0];
    } else {
      $title_tag = $xml_object->xpath('//title/text()');
      if (count($title_tag) > 0) {
        $value = $title_tag[0];
      }
    }
    return (string)$value;
  }

  /**
   * 説明の取得
   */
  private static function get_description($xml_object)
  {
    $value = "";
    $og_tag = $xml_object->xpath('//meta[@property="og:description"]/@content');
    if (count($og_tag) > 0) {
      $value = $og_tag[0];
    } else {
      $meta_description_tag = $xml_object->xpath('//meta[@name="description"]/@content');
      if (count($meta_description_tag) > 0) {
        $value = $meta_description_tag[0];
      }
    }
    return (string)$value;
  }

  /**
   * サムネイルの取得
   */
  private static function get_thumbnail($xml_object)
  {
    $value = "";
    $og_tag = $xml_object->xpath('//meta[@property="og:image"]/@content');
    if (count($og_tag) > 0) {
      $value = $og_tag[0];
    } else {
      $meta_thubnail_tag = $xml_object->xpath('//meta[@name="thumbnail"]/@content');
      if (count($meta_thubnail_tag) > 0) {
        $value = $meta_thubnail_tag[0];
      }
    }
    return (string)$value;
  }

  public static function get_extension($contents)
  {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_buffer($finfo, $contents);
    $extension_array = array(
      'gif' => 'image/gif',
      'jpg' => 'image/jpeg',
      'png' => 'image/png'
    );
    //MIMEタイプから拡張子を出力
    if ($ext = array_search($mime_type, $extension_array, true)) {
      //拡張子の出力
      logger("拡張子 : " . $ext);
    } else {
      logger("拡張子が取得できませんでした。");
    }
    return $ext;
  }
}
