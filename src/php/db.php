<?php
    var $db; // db用変数
    if ($_SERVER['SERVER_NAME'] == 'localhost') {
        // 仮想環境
        const SERVER = "localhost";
        const DBNAME = "test";
        const USER = "root";
        const PASS = "";
        const DBINFO = 'mysql:host='.SERVER.';dbname='.DBNAME.';charset=utf8';
        $db = new PDO(DBINFO, USER, PASS);
    } else {
        // 本番環境
        const SERVER = "mysql309.phy.lolipop.lan";
        const DBNAME = "LAA1517439-kansho";
        const USER = "LAA1517439";
        const PASS = "Pass1234";
        const DBINFO = 'mysql:host='.SERVER.';dbname='.DBNAME.';charset=utf8';
        $db = new PDO(DBINFO, USER, PASS);
    }

	$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>