<?php
function autoVer($url){
    $path = pathinfo($url);
    $ver = '.'.filemtime($_SERVER['DOCUMENT_ROOT'].$url).'.';
    echo $path['dirname'].'/'.str_replace('.', $ver, $path['basename']);
}
?>