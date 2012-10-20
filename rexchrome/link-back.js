/**
 * @private
 * @method attachImage
 * @param {Object} pos position object which contains pageX and pageY
 * @param {String} url image url
 **/
function attachImage(pos, url) {
    var img = new Image(), elem, div;
    
    img.src = url;
    elem = document.elementFromPoint(pos.x, pos.y);
    div = document.createElement('div');
    div.appendChild(img);
    div.style.textAlign='center';

    if(elem.parentNode)
    {
        elem.parentNode.insertBefore(div, elem);    
    }
}

var match = location.href.match(/#(\d+),(\d+),(\d+)/);
if(match)
{

    var img_id = match[1],
        x = match[2],
        y = match[3];
    attachImage({x:x,y:y}, 'http://yhack.piliapp.com/img/' + img_id + '.jpg');
}

