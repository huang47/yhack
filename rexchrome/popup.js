$(document).ready(function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      text = $('#text'),
      fontfamily = $('#fontfamily'),
      fontsize = $('#fontsize'),
      fontcolor = $('#fontcolor'),
      backgroundcolor = $('#backgroundcolor');
      image = new Image();
    var TEXT_X = 10,
        TEXT_Y = 50;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    image.src = 'test.jpg';
    context.drawImage(image, 0, 0);
    drawText();
  }

  function drawText() {

    context.font = fontsize.val()+'px '+fontfamily.val();
    context.fillStyle = fontcolor.val();
    context.fillText(text.val(), TEXT_X, TEXT_Y);

    text.css('font-size', fontsize.val()+'px');
    text.css('font-family', fontfamily.val());
    text.css('color', fontcolor.val());
  }

  //event
  text.bind({
    change: function(){
      draw();
    }
  });
  fontfamily.bind({
    change: function(){
      draw();
    }
  });
  //fontfamily.onchange = draw;
  //fontsize.onchange = draw;
  //fontcolor.onchange = draw;
  //backgroundcolor.onchange = draw;
  image.onload = function(e) {
    context.drawImage(image, 0, 0);
  };
  draw();

  $('.textsection').draggable({
    containment: "parent",
    stop: function(){
      var position = $(this).position();
      TEXT_X = position.left+10;
      TEXT_Y = position.top+$(this).height()-14;
      draw();
    }
  });
  $('#done').click(function(){
    Canvas2Image.saveAsPNG(canvas);
  });
});