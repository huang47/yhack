YUI({
    gallery: 'gallery-2012.10.03-20-02'
}).use('io', 'gallery-event-selection', function(Y) {
    // Fired only on text selection
    var sub = Y.Lang.sub,
        body = Y.one('body'),
        API = 'http://yhack.piliapp.com/editor/?title={title}&url={url}&text={text}';

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

    body.on('selection', function(e) {
        var data = {
            title: getTitle(),
            url: Y.config.win.location.href,
            text: e.selection
        };

        Y.on('io:complete', function (id, o) {
            console.log(o, 'result');
        });

        Y.io(sub(API, data));
    });
});
