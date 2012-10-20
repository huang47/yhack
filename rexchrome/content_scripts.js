chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if ('getSelection' === request.method) {
        var selection = window.getSelection(),
            range = selection.getRangeAt(0),
            dummy = document.createElement("span"),
            result,
            box;

        range.insertNode(dummy);
        box = document.getBoxObjectFor(dummy);
        dummy.parentNode.removeChild(dummy);
        result = {
            x: box.x,
            y: box.y,
            selection: selection.toString()
        };

        console.log(result, 'result');
        sendResponse(result);
    }
});
