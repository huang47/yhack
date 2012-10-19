<?php
require_once __DIR__ . '/../main.inc.php';
?>
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
<body>
<div id="fb-root"></div>
<script>
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '<?=FB_APP_ID?>', // App ID from the App Dashboard
      //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here

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



<h3>Let's login</h3>
<div class="fb-login-button" data-show-faces="false" data-width="200" data-max-rows="1" 
    data-scope="<?=FB_APP_SCOPE?>"></div>

</body>
</html>
