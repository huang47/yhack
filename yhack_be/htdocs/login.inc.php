<?php
require_once __DIR__ . '/main.inc.php';
?>
<script>
  window.fbAsyncInit = function() {


    var login_button = document.getElementById('fb-login-button');
    login_button.style.visibility = 'hidden';
    // init the FB JS SDK
    FB.init({
      appId      : '<?=FB_APP_ID?>', // App ID from the App Dashboard
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected')
        {
            login_button.style.display='none';
        }
        else// if(response.status === 'not_authorized')
        {
            login_button.style.visibility = 'visible';
        }
        window.FB_LOGIN = response.status;
    });

  };
  // Load the SDK's source Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/zh_TW/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
</script>

<div id="fb-login-button" class="fb-login-button" data-show-faces="false"
  data-width="200" data-max-rows="1" data-scope="<?=FB_APP_SCOPE?>"></div>

