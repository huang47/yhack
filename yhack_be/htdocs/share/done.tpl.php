<!doctype html>
<html>
  <head>
        <meta charset="utf-8">
        <title>【歪】新聞</title>
        <style type="text/css">
            body { text-align:center; }
            .img-wrap { text-align:center; }
            .img-wrap img { max-width:500px; }
        </style>
  </head>
  <body>
  <h4>成功發佈到 Facebook</h4>
  <div class="img-wrap">
    <img border=0 src="//yhack.piliapp.com/img/<?=$file_id?>.jpg" />
  </div>
  <a href="//www.facebook.com/photo.php?fbid=<?=$ref_obj['id']?>" target="_top">前往Facebook</a> | <a href="#" onclick="window.close();">完成</a>
  <script>
  setTimeout(function(){ window.close(); }, 3000);
  </script>
  </body>
</html>
