
var match = location.href.match(/#([\d,]+)/);

if(match)
{

function loadScript(e,b){var d=document.getElementsByTagName("head")[0];if(d){var c=document.createElement("script");c.setAttribute("src",e);c.setAttribute("type","text/javascript");var a=function(){if(this.readyState=="complete"||this.readyState=="loaded"){b()}};c.onreadystatechange=a;c.onload=b;d.appendChild(c)}};
if(typeof jQuery === 'undefined')
      loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js", function(){
          loadScript("http://yhack.piliapp.com/lib/link-back.js", function(){});
      });
}
