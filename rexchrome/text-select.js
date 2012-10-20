YUI({
    gallery: 'gallery-2012.10.03-20-02'
}).use('io', 'gallery-event-selection', 'event-hover', function (Y, NAME) {
    // Fired only on text selection
    var sub = Y.Lang.sub,
        d = Y.config.doc,
        w = Y.config.win,
        body = Y.one('body'),
        API = 'http://yhack.piliapp.com/editor/?title={title}&url={url}&text={text}&pos={pos}';

    /**
     * @private
     * @method getTitle
     * @description return h1 or h2 or selected text
     **/
    function getTitle() {
        var h1 = Y.one('h1'),
            h2 = Y.one('h2'),
            title;

        if (h1) {
            title = h1.get('innerText');
        } else if (h2) {
            title = h2.get('innerText');
        } else {
            title = e.selection;
        }

        return title;
    }

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
     * @event selection
     **/
    body.on('selection', function(e) {
        var data = {
            title: getTitle(),
            url: w.location.href,
            text: e.selection,
            xy: [e.pageX, e.pageY].join(',')
        };

        Y.log(data, 'data');

        Y.on('io:complete', function (id, o) {
            console.log(o, 'result');
        });

        // should go to canvas editing page
        window.open(sub(API, data));
    });

    Y.on('hover', function (e) {
        var el = e.currentTarget;
        console.log(el.get('src'), 'src');
    }, function (e) {}, 'img');
});
