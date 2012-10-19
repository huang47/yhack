<?php

require_once __DIR__ . '/../main.inc.php';
require_once ROOT_PATH . '/lib/facebook/src/facebook.php';
$facebook = new Facebook(array(
            'appId'  => FB_APP_ID,
            'secret' => FB_APP_SECRET,
            'fileUpload' => true,
            ));

$user = $facebook->getUser();
if($user)
{
    //$profile = $facebook->api('/me?fields=email,name,birthday');

    // post a photo
    try{
        /*
        $photo = __DIR__ .'/yo.png';
        $ref_obj = $facebook->api('/me/photos', 'POST', array(
                    'source'=>'@' . $photo,
                    'message'=>'傳一張圖',
                    ));
        echo '<pre>';
        var_dump($ref_obj);
        */
    }
    catch(FacebookApiException $e) {
        // If the user is logged out, you can have a 
        // user ID even though the access token is invalid.
        // In this case, we'll get an exception, so we'll
        // just ask the user to login again here.
        $login_url = $facebook->getLoginUrl( array(
                    'scope' => FB_APP_SCOPE
                    )); 
        echo 'Please <a href="' . $login_url . '">login.</a>';
        error_log($e->getType());
        error_log($e->getMessage());
    }
}
