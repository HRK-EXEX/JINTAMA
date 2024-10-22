<?php
    const SERVER = "localhost";
    const DBNAME = "test";
    const USER = "root";
    const PASS = "";
    const DBINFO = 'mysql:host='.SERVER.';dbname='.DBNAME.';charset=utf8';
    $db = new PDO(DBINFO, USER, PASS);

	$db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>