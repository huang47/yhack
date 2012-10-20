<canvas id="editor" width="430" height="300" style="background:#000;">
</canvas>
<form method="POST" action="/share/">
    <input type="hidden" id="title" name="title" value="Hello World">
    <input type="hidden" id="img-dataurl" name="img" value="">
    <input type="hidden" id="url" name="url" value="http://tw.yahoo.com/">
    <input type="hidden" id="xy" name="xy" value="<?php echo '0';?>">
    <input type="submit" value="post">
</form>
<script>
    var canvasSetUp, getPara, 
    editor = document.getElementById('editor'), ctx,
    tpl = ['chen', 'cute', 'dog', 'gollum', 'shrek', 'soccer', 'steve', 'yenshi'];
    
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
        var r = Math.round((Math.random()*10000)) % tpl.length;
        img.src = 'img/meme/'+ tpl[r]+'.jpeg';
    };
    getDataURL = function() {
       document.getElementById('img-dataurl').value =  editor.toDataURL();
    };
    getPara = function(name) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        regexS = "[\\?&]"+ name +"=([^&#]*)";
        regex = new RegExp( regexS );
        results = regex.exec(window.location.href);
        if(results == null) {
            canvasSetUp('No text');
            return '';
        } else {
            canvasSetUp(results[1]);
        }
    };
    getPara('text');

</script>
