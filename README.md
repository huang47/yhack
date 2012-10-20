yhack
=====

yhack

PREREQUISITE
============
1. node(0.8.\*)
2. npm (latest stable)

INSTALL DEPENDENCIES
====================
npm install gear gear-lib

PHASE
====
1. select text from tw.news.yahoo.com
2. select image template
3. share to facebook


URL
====
base url: http://yhack.piliapp.com
Login url: http://yhack.piliapp.com/share/login.php
*  GET /editor/?title={h1-title}&url={url}&text={selected-text}&p={paragraph}
*  POST /share/
  * img: datauri with base64 encoding
  * title
  * url
  * p: paragraph
*  /share/ response
  * 200: OK
  * 403 / 500: need facebook login
* link-back url
  * http://tw.news.yahoo.com/政院發言人懸缺-內定鄭麗文接任-042255521.html#21,123,456
  * ```{img_id},{x-position},{y-position}```
  * image url: http://yhack.piliapp.com/img/21.jpg

