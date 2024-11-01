<?php
session_start(); 
require '../db.php';
$room_id = $_SESSION['User']['room_id'] ;

$stm = $db->prepare('SELECT * FROM Room WHERE room_id = ?');
$stm->execute([$room_id]);
foreach($stm as $un){
    $userid=[$un['room_user1'],$un['room_user2'],$un['room_user3'],$un['room_user4']];
}
$stm1 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm1->execute([$userid[0]]);
foreach($stm1 as $un1){
    $_SESSION['User1'] = [
        'room_id' =>$room_id,
        'user_id' => $un1['user_id'],
        'name' => $un1['user_name'],
        'score' => 100,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}

$stm2 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm2->execute([$userid[1]]);
foreach($stm2 as $un2){
    $_SESSION['User2'] = [
        'room_id' =>$room_id,
        'user_id' => $un2['user_id'],
        'name' => $un2['user_name'],
        'score' => 100,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}

$stm3= $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm3->execute([$userid[2]]);
foreach($stm1 as $un3){
    $_SESSION['User3'] = [
        'room_id' =>$room_id,
        'user_id' => $un3['user_id'],
        'name' => $un3['user_name'],
        'score' => 100,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}
$stm4 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm4->execute([$userid[3]]);
foreach($stm4 as $un4){
    $_SESSION['User4'] = [
        'room_id' =>$room_id,
        'user_id' => $un4['user_id'],
        'name' => $un4['user_name'],
        'score' => 100,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>カリカリ</title>
</head>
<body>
    <button onclick="location.href='/kansho/JINTAMA/src/php/G-3/G3-2.php'">ゲーム終了</button>
</body>
</html>