$(document).ready(function() {

  var canvas2 = document.getElementById('canvas2'),
      canvas3 = document.getElementById('canvas3'),
      ctx2 = canvas2.getContext('2d'),
      ctx3 = canvas3.getContext('2d'),
      textsection = $('.textsection'),
      textinput = $('.textsection input'),
      textspan = $('.textsection span'),
      fontfamily = $('#fontfamily'),
      fontsize = $('#fontsize'),
      fontcolor = $('#fontcolor'),
      tpl = ['chen', 'cute', 'dog', 'gollum', 'shrek', 'soccer', 'steve', 'yenshi'],
      img = new Image(),
      r,
      x = 0,
      y = 0;

  var initPicture = function(str, pic) {
      img.onload = function() {
          var tmp;
          if (img.width > img.height) {
              tmp = (403/img.width) * img.height;
              img.width = '403';
              img.height = tmp;
          } else {
              tmp = (403/img.height) * img.width;
              img.height ='403px';
              img.width = tmp;
          }
          ctx2.drawImage(img, 0, (403 - img.height)/2, img.width, img.height);
      };
      r = Math.round((Math.random()*10001)) % tpl.length;
      img.src = 'img/meme/'+ tpl[r]+'.jpeg';
  };

  //init color
  var changeFont = function(){
    textspan.css('font-size', fontsize.val()+'px');
    textspan.css('font-family', fontfamily.val());
    textspan.css('color', '#'+fontcolor.val());
    textinput.css('font-size', fontsize.val()+'px');
    textinput.css('font-family', fontfamily.val());
    textinput.css('color', '#'+fontcolor.val());
  };
  //init
  changeFont();
  initPicture();

  //bind event
  textsection.click(function(){
    textinput.show();
    textspan.hide();
  });
  textinput.keypress(function(e){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      textinput.hide();
      textspan.text(textinput.val());
      textspan.show();
    }
  });
  textsection.draggable({
    containment: "parent",
    stop: function(){
      var position = $(this).position();
      x = position.left;
      y = position.top;
    }
  });
  fontcolor.ColorPicker({
    onSubmit: function(hsb, hex, rgb, el) {
      $(el).val(hex);
      $(el).ColorPickerHide();
      changeFont();
    },
      onBeforeShow: function () {
      $(this).ColorPickerSetColor(this.value);
    }
  })
  .bind('keyup', function(){
    $(this).ColorPickerSetColor(this.value);
  });

  fontfamily.bind({
    change: function(){
      changeFont();
    }
  });
  fontsize.bind({
    change: function(){
      changeFont();
    }
  });
  fontcolor.bind({
    change: function(){
      changeFont();
    }
  });

  var finish = function(){
    ctx3.drawImage(img, 0, (403 - img.height)/2, img.width, img.height);
    ctx3.font = fontsize.val()+'px '+fontfamily.val();
    ctx3.fillStyle = '#'+fontcolor.val();
    ctx3.fillText(textinput.val(), x, parseInt(y)+parseInt(fontsize.val()));
    document.getElementById('img-dataurl').value =  canvas3.toDataURL();
  };
  $('#done').click(function(){
    finish();
    $('#form').submit();
  });

});
