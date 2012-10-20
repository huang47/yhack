<?php

require_once __DIR__ . '/../main.inc.php';

// login fb first: http://yhack.piliapp.com/share/login.php
// check share page: http://yhack.piliapp.com/share/?dev=1
if(isset($_GET['dev']))
{
    $_POST = array(
            'img'=>trim(file_get_contents(__DIR__ . '/sample.txt')),
            'title'=>'this is title' . time(),
            'url'=>'http://tw.news.yahoo.com/%E6%94%BF%E9%99%A2%E7%99%BC%E8%A8%80%E4%BA%BA%E6%87%B8%E7%BC%BA-%E5%85%A7%E5%AE%9A%E9%84%AD%E9%BA%97%E6%96%87%E6%8E%A5%E4%BB%BB-042255521.html;_ylt=AiEsSXYRdE0bgo98ldUBnVuVBdF_;_ylu=X3oDMTNvdGR2MGIzBG1pdANKdW1ib3Ryb24gRlAgTUQEcGtnA2EzZmM3YTZlLTVjYWUtM2I5Yy05ZjY1LTY1OGQ3ZjkzZGE2OARwb3MDMQRzZWMDbWVnYXRyb24EdmVyA2RkZmUyMDAwLTFhNmUtMTFlMi1iM2ZkLWUxZGZjYTUyYWYyMQ--;_ylg=X3oDMTFucXJnOGdpBGludGwDdHcEbGFuZwN6aC1oYW50LXR3BHBzdGFpZAMEcHN0Y2F0A2hvbWUEcHQDc2VjdGlvbnM-;_ylv=3',
            'xy'=>'123,456',
            );
}

if(!isset($_POST['title']) || !isset($_POST['img']) || !isset($_POST['url']))
{
    die('500');
}

// get id
$index_file = '/var/www/img/index.txt';
$file_id = (int)trim(file_get_contents($index_file));
file_put_contents($index_file, $file_id + 1);

// clean up data
$_POST['url'] = preg_replace('/;_.+/', '', $_POST['url']);
$_POST['url'] = rawurldecode($_POST['url']);
$_POST['url'] .= '#' . $file_id;
if(isset($_POST['xy']))
    $_POST['url'] .= ',' . $_POST['xy'];

// save image to temp file
$img_dir_base = '/var/www/img';
$img_file = $img_dir_base . '/' . sprintf('%02d', $file_id % 100) . '/' . $file_id;
$img_dir = dirname($img_file);
if(!is_dir($img_dir))
{
    mkdir($img_dir, 0755, true);
}
list(, $png) = explode(',', $_POST['img'], 2);
file_put_contents($img_file . '.png', base64_decode($png));
$cmd = sprintf("/usr/bin/convert -quality 95 %s.png[0] %s.jpg", $img_file, $img_file);
shell_exec($cmd);
@unlink($img_file . '.png');

// push to facebook
require_once ROOT_PATH . '/lib/facebook/src/facebook.php';
$facebook = new Facebook(array(
            'appId'  => FB_APP_ID,
            'secret' => FB_APP_SECRET,
            'fileUpload' => true,
            ));

$user = $facebook->getUser();
if($user)
{
    // post a photo
    try{
        $ref_obj = $facebook->api('/me/photos', 'POST', array(
                    'source'=>'@' . $img_file . '.jpg',
                    'message'=>'▋' . $_POST['title'] . ' ▋' . "\r\n" . $_POST['url'],
                    ));
        // echo '<pre>';
        // var_dump($ref_obj);
    }
    catch(FacebookApiException $e) {
        $fb_err = true;
    }
}

if(isset($ref_obj))
    $response = '200';
else if(isset($fb_err))
    $response = '403';
else 
    $response = '401';

// delete temp file
if($response !== '200')
{
    @unlink($img_file . '.jpg');
}

if($response === '200')
{
    // echo "<pre>";
    // var_dump($ref_obj);
    require __DIR__ . '/done.tpl.php';
}
else
{
    echo $response;    
}


