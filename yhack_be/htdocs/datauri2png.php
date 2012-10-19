<?php

list(, $png) = explode(',', $_POST['data'], 2);
file_put_contents('yo.png', base64_decode($png));
