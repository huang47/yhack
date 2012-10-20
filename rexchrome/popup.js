$(document).ready(function() {
  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      text = $('#text'),
      fontfamily = $('#fontfamily'),
      fontsize = $('#fontsize'),
      fontcolor = $('#fontcolor'),
      backgroundcolor = $('#backgroundcolor');
      image = new Image();

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    image.src = 'test.jpg';
    image.onload = function(e) {
      context.drawImage(image, 0, 0);
    };    
    drawText();
  }

  function drawText() {
    var TEXT_X = 10,
        TEXT_Y = 50;
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

  draw();

  $('.textsection').draggable({containment: "parent"});
});