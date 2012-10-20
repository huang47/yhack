#!/usr/bin/php -q
<?php

$help = <<<STR
./install.php prod
./install.php dev

STR;

$type = empty($argv[1]) ?'prod' : $argv[1];
if('help' === $type) die($help);

$current_path = dirname(__FILE__);
$base_path = "/var/www/yhack_be";
$tmp = '/tmp/yhack_be_install';

// create target
`sudo mkdir -p $base_path;`;

// prepare tmp dir
`sudo rm -rf $tmp;`;
`sudo mkdir -p $tmp;`;

// copy files
$cmd = <<<CMD
sudo cp $current_path/htdocs/.htaccess $tmp\n
CMD;
foreach(glob("$current_path/htdocs/*.php") as $script)
{
    $cmd .= "sudo cp " . $script . ' ' . $tmp . "\n";
}
if($type==='dev')
    $cmd = preg_replace('/(cp)\s+(\/[^\s\.]+)\/([^\s\/]+)\s+([^\s;]+);?$/m', 'ln -s $2/$3 $4/$3', $cmd);
echo `$cmd`;

// (hard) copy conf
$cmd = <<<CMD
sudo cp $current_path/conf/yhack_be.conf /etc/apache2/sites-enabled/yhack_be
CMD;
echo `$cmd`;

// copy dirs
$cmd = <<<CMD
sudo cp -Rv $current_path/htdocs/test $tmp/test;
sudo cp -Rv $current_path/htdocs/lib $tmp/lib;
sudo cp -Rv $current_path/htdocs/editor $tmp/editor;
sudo cp -Rv $current_path/htdocs/share $tmp/share;
CMD;
if('dev' === $type)
    $cmd = str_replace('cp -Rv', 'ln -s', $cmd);
echo `$cmd`;


/*
sudo mkdir -p /home/wwwroot/cache/piliapp
sudo find /home/wwwroot/cache/piliapp/ -type f -exec rm {} \;
sudo chown -R www:www /home/wwwroot/cache/piliapp
*/

// post script
$cmd = <<<CMD
sudo mkdir $tmp/cache/
sudo chown -R www-data:www-data $tmp
sudo mv $base_path /tmp/trash/
sudo mv $tmp $base_path
sudo /etc/init.d/apache2 reload
sudo rm -rf /tmp/trash
CMD;

echo $cmd;
echo `$cmd`;

echo "\r\nDone\r\n";

