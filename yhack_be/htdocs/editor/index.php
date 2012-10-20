<canvas id="editor" width="430" height="300" style="background:#000;">
</canvas>
<script>
    var canvasSetUp, getPara, 
    editor = document.getElementById('editor'), ctx;
    ctx = editor.getContext('2d');
   
    canvasSetUp = function(str, pic) {
        img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);  
            ctx.font = '30px Arial';
            ctx.fillStyle = '#FFF'
            ctx.fillText(decodeURIComponent(str), 100, 100);
            ctx.save();
            setTimeout(getDataURL, 100);
        };
        img.src = 'img/jackie.jpg';
    };
    getDataURL = function() {
        console.log(editor.toDataURL(), 'data url');
    };
    getPara = function(name) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        regexS = "[\\?&]"+ name +"=([^&#]*)";
        regex = new RegExp( regexS );
        results = regex.exec( window.location.href );
        if(results == null) {
            alert('no text');
            return '';
        } else {
            canvasSetUp(results[1]);
        }
    };
    getPara('text');

</script>
