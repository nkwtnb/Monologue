<?php

use App\Libs\OgpUtil;
try {
  $ogp = new OgpUtil("https://www.youtube.com/watch?v=xPkrSGCcEdI&list=RDxPkrSGCcEdI");
} catch(\Exception $e) {
  var_dump($e);
}

?>