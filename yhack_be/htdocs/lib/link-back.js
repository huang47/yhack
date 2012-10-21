
$(document).ready(function(){
    var d = document,
        params = location.href.split('#')[1].split(','),
        img_id = params[0],
        x = params[1] || -999,
        y = params[2] || -999,
        pos = {x:x,y:y},
        src = 'http://yhack.piliapp.com/img/' + img_id + '.jpg',
        img = new Image(), elem, div;

    img.src = src;
    elem = d.elementFromPoint(pos.x, pos.y);
    console.log(elem);
    div = d.createElement('div');
    div.className  = div.id = "yhack-img";
    div.innerHTML = '<div class="yhack-img-content"><div class="fb-like" data-send="false" data-layout="button_count" data-width="55" data-show-faces="false"></div>' + '<img src="' + src + '" /></div>';

    if(true || elem === null)
    {
        jQuery(".yom-art-content .bd p:first").before(div);
    }
    else
    {
        elem.parentNode.insertBefore(div, elem);
    }

    var html = '',
        imgs = [135,119,110];
    html += '<div class="yom-mod" id="yhack-list">';
    html += '<div class="hd"><h3>熱門【歪】新聞</h3></div>';
    html += '<div class="bd"><ul>';
    html += '<li><a href="http://bit.ly/QHkZAu"><img src="http://yhack.piliapp.com/img/135.jpg" /></a></li>'
    html += '<li><a href="http://bit.ly/S9eTKQ"><img src="http://yhack.piliapp.com/img/119.jpg" /></a></li>'
    html += '<li><a href="http://bit.ly/UlgLVr"><img src="http://yhack.piliapp.com/img/142.jpg" /></a></li>'
    html += '</ul></div>';
    html += '</html>';
    console.log(html);
    $("#mediasocialfollow").before(html);

    
    var run_fb = function() {
        if($("#yhack-img .fb_iframe_widget").size() === 0)
        {
            // console.log('run');
            // FB.XFBML.parse(document.getElementById('yhack-img'));
            if(typeof FB === 'undefined')
            {
                setTimeout(function(){run_fb();}, 1500);
            }
            else
            {
                // alert('run');
                FB.XFBML.parse();
            }
        }
        else
            return;
    };
    run_fb();


     // FB.XFBML.parse(document.getElementById('foo'));
    // div.appendChild(img);


});
