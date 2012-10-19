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
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=<?=FB_APP_ID?>";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<h3>Let's login</h3>
<div class="fb-login-button" data-show-faces="true" data-width="200" data-max-rows="1" 
    data-scope="user_likes,publish_stream,read_stream"></div>

</body>
</html>
