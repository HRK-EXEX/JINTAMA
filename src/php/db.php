<?php    
    // $server = "localhost";
    // $dbName = "test";
    // $dbUser = "root";
    // $dbPass = "";
    // $dbInfo = 'mysql:host='.$server.';dbname='.$dbName.';charset=utf8';

    if ($_SERVER['SERVER_NAME'] == 'localhost') {
        // 仮想環境
        $server = "localhost";
        $dbName = "kansho";
        $dbUser = "root";
        $dbPass = "";
    } else {
        // 本番環境
        $server = "mysql309.phy.lolipop.lan";
        $dbName = "LAA1517439-kansho";
        $dbUser = "LAA1517439";
        $dbPass = "Pass1234";
    }
    $dbInfo = 'mysql:host='.$server.';dbname='.$dbName.';charset=utf8';
    $db = new PDO($dbInfo, $dbUser, $dbPass);

	$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>