<?php

require_once __DIR__ . '/../main.inc.php';

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

// save image to temp file
$tmp_dir = '/tmp/yhack';
if(!is_dir($tmp_dir))
    mkdir($tmp_dir, 0755, true);
    $tmp_file = $tmp_dir . '/' . time() . '_' . rand(1, 100000);
    list(, $png) = explode(',', $_POST['img'], 2);
    file_put_contents($tmp_file, base64_decode($png));

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
        $photo = __DIR__ .'/yo.png';
        $ref_obj = $facebook->api('/me/photos', 'POST', array(
                    'source'=>'@' . $tmp_file,
                    'message'=>$_POST['title'] . "\r\n" . $_POST['url'],
                    ));
        // echo '<pre>';
        // var_dump($ref_obj);
    }
    catch(FacebookApiException $e) {
        $fb_err = true;
    }
}

// delete temp file
@unlink($tmp_file);

if(isset($ref_obj))
    $response = '200';
else if(isset($fb_err))
    $response = '403';
else 
    $response = '500';


echo $response;

