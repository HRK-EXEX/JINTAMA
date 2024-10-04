<?php
    const SERVER = "mysql309.phy.lolipop.lan";
    const DBNAME = "LAA1517439-kansho";
    const USER = "LAA1517439";
    const PASS = "Pass1234";
    const DBINFO = 'mysql:host='.SERVER.';dbname='.DBNAME.';charset=utf8';                
    $db = new PDO(DBINFO, USER, PASS);

	$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>