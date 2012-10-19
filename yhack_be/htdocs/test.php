<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
      #myCanvas {
        border: 1px solid #9C9898;
      }
    </style>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script>
      window.onload = function() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");

        // draw cloud
        context.beginPath();
        // begin custom shape
        context.moveTo(170, 80);
        context.bezierCurveTo(130, 100, 130, 150, 230, 150);
        context.bezierCurveTo(250, 180, 320, 180, 340, 150);
        context.bezierCurveTo(420, 150, 420, 120, 390, 100);
        context.bezierCurveTo(430, 40, 370, 30, 340, 50);
        context.bezierCurveTo(320, 5, 250, 20, 250, 50);
        context.bezierCurveTo(200, 5, 150, 20, 170, 80);
        context.closePath();
        // complete custom shape
        context.lineWidth = 5;
        context.fillStyle = "#8ED6FF";
        context.fill();
        context.strokeStyle = "#0000ff";
        context.stroke();

        // save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL();
        var api = '/datauri2png.php';
        $.post(api, {'data':dataURL});
      };

    </script>
  </head>
  <body>
    <canvas id="myCanvas" width="578" height="200"></canvas>
  </body>
</html>

