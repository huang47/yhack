
$(document).ready(function(){
    var d = document,
        params = match[1].split(','),
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
    div.innerHTML = '<div class="fb-like" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>';
    div.innerHTML += '<img src="' + src + '" />';

    if(elem === null)
    {
        jQuery(".yom-art-content .bd p:first").before(div);
    }
    else
    {
        elem.parentNode.insertBefore(div, elem);
    }
    
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
