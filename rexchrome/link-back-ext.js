
var match = location.href.match(/#([\d,]+)/);
if(match)
{
$.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js",
function(){
   $.getScript("http://yhack.piliapp.com/lib/link-back.js?"+Math.random());
}
);
}

