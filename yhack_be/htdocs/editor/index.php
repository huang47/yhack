<!doctype html>
<html>
  <head>
    <title>Getting Started Extension's Popup</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="colorpicker/css/colorpicker.css" />
    <link rel="stylesheet" href="meme.css" />
  </head>
  <body>
    <h1><img src="img/logo.png"></h1>
    <div class="ct1"><?php echo $_GET['text']; ?></div>
    <div class="ct2"><?php echo $_GET['text']; ?></div>
    <div class="editor">


<form method="POST" action="/share/" id="form">
      <select id="fontfamily">
        <option value="Arial" selected="selected">--</option>
        <option value="ct1">王漢宗顏楷體</option>
        <option value="ct2">王漢宗超黑俏皮動物</option>
      </select>
      <select id="fontsize">
        <option value="24">24</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="60" selected="selected">60</option>
        <option value="72">72</option>
      </select>
      <input type="text" id="fontcolor" value="ffffff">
      <input type="button" value="Post" id="done">
        <input type="hidden" id="title" name="title" value="<?php echo $_GET['title'];?>">
        <input type="hidden" id="img-dataurl" name="img" value="">
        <input type="hidden" id="url" name="url" value="<?php echo $_GET['url'];?>">
        <input type="hidden" id="xy" name="xy" value="<?php echo $_GET['xy'];?>">
</form>
        <div class="icon">
            <img src="stickers/293.png">
            <img src="stickers/273.png">
            <img src="stickers/175.png">
            <img src="stickers/39.png">
            <img src="stickers/154.png">
            <img src="stickers/165.png">
            <img src="stickers/24.png">
            <img src="stickers/168.png">
            <img src="stickers/188.png">
            <img src="stickers/269.png">
            <img src="stickers/144.png">
            <img src="stickers/19.png">
            <img src="stickers/177.png">
            <img src="stickers/163.png">
            <img src="stickers/28.png">
            <img src="stickers/23.png">
        </div>
        <div class="picture">
            <div class="sticker"></div>
            <div class="textsection"><span><?php echo $_GET['text']; ?></span><input type="text" value="<?php echo $_GET['text']; ?>" id="text"></div>
            <canvas id="canvas2" width="403" height="403"></canvas>
        </div>
      <canvas id="canvas3" width="403" height="403"></canvas>
      <div class="thumb" id="thumb"><ul></ul></div>
    </div>
<script type="text/javascript">window.jfAsyncInit=function(){ctb.main({'appId':'6afbf2b6ikTS2NUSC5RMKSDCw48prFTp2PECe8UU0WI-BM06T4-2znhFnMr-1KTPStT0JgC3UHWbOZKDVFKviwgV6AHvt97yymsctqMWkqQFhvnD707fxszLs38MqoCeuofcCbHvDtfjGTBrxdKNgdl_w9tQzbyjYUC5Ly38uxnE9Ut8qxE='});};(function(){var jf=document.createElement('script');jf.type='text/javascript';jf.async=true;jf.src='http://ds.justfont.com/core/js/v1.0/6afbf2b6ikTS2NUSC5RMKSDCw48prFTp2PECe8UU0WI-BM06T4-2znhFnMr-1KTPStT0JgC3UHWbOZKDVFKviwgV6AHvt97yymsctqMWkqQFhvnD707fxszLs38MqoCeuofcCbHvDtfjGTBrxdKNgdl_w9tQzbyjYUC5Ly38uxnE9Ut8qxE=.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(jf,s);})();</script>
    <script src="jquery-1.8.2.js"></script>
    <script src="jquery-ui.js"></script>
    <script src="base64.js"></script>
    <script src="canvas2image.js"></script>
    <script src="colorpicker/js/colorpicker.js"></script>
    <script src="meme.js"></script>
  <?php require_once __DIR__ . '/../login.inc.php'; ?>
  </body>
</html>
