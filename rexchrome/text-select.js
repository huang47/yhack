/**
 * @private
 * @method attachImage
 * @param {Object} pos position object which contains pageX and pageY
 * @param {String} url image url
 **/
function attachImage(pos, url) {
    var img = new Image(),
        elem,
        parent;

    img.src = url;
    elem = elementFromPoint(pos.x, pos.y);
    parent = elem.get('parent');

    if (parent) {
        parent._node.insertBefore(img, elem._node);
    }
}

/**
 * @private
 * @method getTitle
 **/
function getTitle() {
    var d = document,
        h1 = d.getElementsByTagName('h1')[0],
        h2 = d.getElementsByTagName('h2')[0],
        title;

    if (h1) {
        title = h1.innerText;
    } else if (h2) {
        title = h2.innerText;
    }

    return title;
}

chrome.windows.getCurrent(function(w) {
    chrome.tabs.getSelected(w.id, function (tab) {
        chrome.tabs.sendRequest(tab.id, { method: "getSelection" }, function(response){
            console.log(response, 'response');
        });

        var url = tab.url,
            hash = url.substring(url.indexOf('#') + 1),
            id,
            x,
            y,
            iframe,
            selection = window.getSelection(),
            text = selection.toString(),
            result,
            box;

        result = {
            pos: [100, 200].join(','),
            text: text,
            title: tab.title,
            url: tab.url
        };

        if (hash) {
            hash = hash.split(',');
            id = hash[0];
            x = hash[1];
            y = hash[2];
        } else {
            // error
        }

        iframe = document.getElementsByTagName('iframe')[0];
        iframe.src = iframe.getAttribute('data-api')
            .replace('{title}', result.title)
            .replace('{pos}', result.pos)
            .replace('{text}', result.text)
            .replace('{url}', result.url);

        iframe.removeAttribute('data-src');
    });
});
