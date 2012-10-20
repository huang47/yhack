yhack
=====

yhack

PREREQUISITE
============
1. node(0.8.*)
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
*  GET /editor/?title={h1-title}&url={url}&text={selected-text}
*  POST /share/
  * img
  * title
  * url
*  /share/ response
  * 200: OK
  * 403: need facebook auth


