$(document).ready(function() {

  var canvas2 = document.getElementById('canvas2'),
      canvas3 = document.getElementById('canvas3'),
      ctx2 = canvas2.getContext('2d'),
      ctx3 = canvas3.getContext('2d'),
      textsection = $('.textsection'),
      textinput = $('.textsection input'),
      textspan = $('.textsection span'),
      textsection2 = $('.textsection2'),
      textinput2 = $('.textsection2 input'),
      textspan2 = $('.textsection2 span'),
      fontfamily = $('#fontfamily'),
      fontsize = $('#fontsize'),
      fontcolor = $('#fontcolor'),
      tpl = ['chen', 'cute', 'dog', 'gollum', 'shrek', 'soccer', 'steve', 'yenshi'],
      img = new Image(),
      r,
      x = 0,
      y = 0,
      x2 = 0,
      y2 = 350,
      is_sticker = false,
      sticker_src,
      sticker_x = 0,
      sticker_y = 0,
      sticker = $('.sticker');

  var makeList = function(r) { 
      var html = '';
      for(var i=0;i<tpl.length;i++) {
              html += '<li data-image="'+tpl[i]+'" style="background-image:url(img/meme/'+tpl[i] + '.jpeg);"></li>';
      }
      $('#thumb ul').html(html);
      $('#thumb').bind('click', function(e){
          console.log(e.target.getAttribute('data-image'));
          initPicture(e.target.getAttribute('data-image'));
          e.preventDefault();
      });
  };
  var initPicture = function(pic) {
      var _img = new Image();
      _img.onload = function() {
          var tmp;
          if (_img.width > _img.height) {
              tmp = (403/_img.width) * _img.height;
              _img.width = '403';
              _img.height = tmp;
          } else {
              tmp = (403/_img.height) * _img.width;
              _img.height ='403px';
              _img.width = tmp;
          }
          if(pic===undefined) {
          ctx2.drawImage(_img, 0, (403 - _img.height)/2, _img.width, _img.height);
          } else {
              ctx2.clearRect(0, 0, 403, 403);
              ctx2.drawImage(_img, 0, (403 - _img.height)/2, _img.width, _img.height);
          }
          img = _img;
      };
      if(pic===undefined) {
      var r =0;
      r = Math.round((Math.random()*10001)) % tpl.length;
      _img.src = 'img/meme/'+ tpl[r]+'.jpeg';
      makeList();
      } else {
        _img.src = 'img/meme/'+pic+'.jpeg';
      }
  };

  //init color
  var changeFont = function(){
    textspan.css('font-size', fontsize.val()+'px');
    textspan.css('font-family', fontfamily.val());
    textspan.css('color', '#'+fontcolor.val());
    textinput.css('font-size', fontsize.val()+'px');
    textinput.css('font-family', fontfamily.val());
    textinput.css('color', '#'+fontcolor.val());

    textspan2.css('font-size', fontsize.val()+'px');
    textspan2.css('font-family', fontfamily.val());
    textspan2.css('color', '#'+fontcolor.val());
    textinput2.css('font-size', fontsize.val()+'px');
    textinput2.css('font-family', fontfamily.val());
    textinput2.css('color', '#'+fontcolor.val());
  };
  //init
  changeFont();
  initPicture();

  //bind event
  textsection.dblclick(function(e){
    textinput.show();
    textinput.focus();
    textinput.focus(function(){
      $(this).select();
    });
    textspan.hide();
  });
  textinput.keypress(function(event){
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
  //bind event
  textsection2.dblclick(function(e){
    textinput2.show();
    textinput2.focus();
    textinput2.focus(function(){
      $(this).select();
    });
    textspan2.hide();
  });
  textinput2.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      textinput2.hide();
      textspan2.text(textinput2.val());
      textspan2.show();
    }
  });
  textsection2.draggable({
    containment: "parent",
    stop: function(){
      var position = $(this).position();
      x2 = position.left;
      y2 = position.top;
    }
  });



  sticker.draggable({
    containment: "parent",
    stop: function(){
      var position = $(this).position();
      sticker_x = position.left;
      sticker_y = position.top;
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

  var is_add = false;
  $('#addtext').click(function(){
    if(!is_add){
      textsection2.show();
      is_add = true;
    }
  });


  $('.icon img').click(function(){
      is_sticker = true;
      sticker_src = $(this).attr('src');
      sticker.html('<img src="'+sticker_src+'">');
  });

  var finish = function(){
    if(is_sticker){
      var _img = new Image();
      _img.onload = function() {
        ctx3.drawImage(img, 0, (403 - img.height)/2, img.width, img.height);
        ctx3.drawImage(_img, sticker_x, sticker_y);
        ctx3.font = fontsize.val()+'px '+fontfamily.val();
        ctx3.fillStyle = '#'+fontcolor.val();
        ctx3.fillText(textinput.val(), x, parseInt(y)+parseInt(fontsize.val()));
        if(is_add){
          ctx3.fillText(textinput2.val(), x2, parseInt(y2)+parseInt(fontsize.val()));        
        }
        var _logo = new Image();
        _logo.onload = function(){
          ctx3.drawImage(_logo, 320, (403 - _logo.height +10));
          document.getElementById('img-dataurl').value =  canvas3.toDataURL();
          $('#form').submit();
        };
        _logo.src = "img/logo_s.png";

      };
      _img.src = sticker_src;
    }
    else{
      ctx3.drawImage(img, 0, (403 - img.height)/2, img.width, img.height);
      ctx3.font = fontsize.val()+'px '+fontfamily.val();
      ctx3.fillStyle = '#'+fontcolor.val();
      ctx3.fillText(textinput.val(), x, parseInt(y)+parseInt(fontsize.val()));
      if(is_add){
        ctx3.fillText(textinput2.val(), x2, parseInt(y2)+parseInt(fontsize.val()));        
      }
      var _logo = new Image();
      _logo.onload = function(){
        ctx3.drawImage(_logo, 320, (403 - _logo.height +10));
        document.getElementById('img-dataurl').value =  canvas3.toDataURL();
        $('#form').submit();
      };
      _logo.src = "img/logo_s.png";
    }
  };
  $('#done').click(function(e){

    
    if(window.FB_LOGIN!=='connected')
    {
        e.preventDefault();
        FB.login(function(response) {
            if (response.authResponse) {
                finish();
                // connected
            } else {
                // cancelled
            }
        });

        return false;
    }
    
    finish();

    //$('#form').submit();
  });
});
