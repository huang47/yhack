<?php

// login fb first: http://yhack.piliapp.com/test/fb.php
// check share page: http://yhack.piliapp.com/share/?dev=1
if(isset($_GET['dev']))
{
    $_POST = array(
        'img'=>trim(file_get_contents(__DIR__ . '/sample.txt')),
        'title'=>'this is title',
        'url'=>'http://tw.yahoo.com',
    );
}

$tmp_dir = '/tmp/yhack';
if(!is_dir($tmp_dir))
    mkdir($tmp_dir, 0755, true);
$tmp_file = $tmp_dir . '/' . time() . '_' . rand(1, 100000);
list(, $png) = explode(',', $_POST['img'], 2);
file_put_contents($tmp_file, base64_decode($png));

// push to facebook


@unlink($tmp_file);

$response = '200';
echo $response;
