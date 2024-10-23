<?php
session_start();
$userid = $_SESSION['User']['user_id'];
$username = $_SESSION['User']['user_name'];
require '../db.php';?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-2.css">
    <title>ルーム一覧</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <table class="room_list dotgothic16-regular">
                <?php
        $stm = $db->prepare("select * from Room");
        $stm->execute();

        foreach($stm as $room){
            echo'<form action="/kansho/JINTAMA/src/php/G-2/G2-3.php" method="post">';
            echo'<tr>';
            echo'<input type="hidden" name="room_id" value="'.$room['room_id'].'">';

            $room_count = 0;

            // room_user1がNULLでない場合
            if (is_null($room['room_user1'])) {
          $room_count++;
        }

            // room_user2がNULLでない場合
            if (is_null($room['room_user2'])) {
            $room_count++;
        }
        // room_user3がNULLでない場合
        if (is_null($room['room_user3'])) {
            $room_count++;
        }
        // room_user4がNULLでない場合
        if (is_null($room['room_user4'])) {
            $room_count++;
        }

            echo '<td><button class="team_name" onclick="location.href=\'G2-3.html?id=1\'">'.$room['room_name'].'(あと'.$room_count.'人)</button></td>';
            echo'</tr>';
            echo'</form>';
        }
        ?>
            </table>
            <div class="opration">
                <button onclick="location.href='G2-1_mainmenu.html'">戻る</button>
                <button onclick="location.href='G2-3.html?rnd=1'">ランダム入室</button>
                <button onclick="location.href='G2-4.php'">ルームを作成</button>
            </div>
        </div>
    </div>
</body>
</html>