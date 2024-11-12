<?php
session_start(); 
require '../db.php';
$room_id = $_GET['room_id'];
$_SESSION['User']['room_id'] = $room_id;
$stm = $db->prepare('SELECT * FROM Room WHERE room_id = ?');
$stm->execute([$room_id]);
foreach($stm as $un){
    $u1=$un['room_user1'];
    $u2=$un['room_user2'];
    $u3=$un['room_user3'];
    $u4=$un['room_user4'];
}
$stm1 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm1->execute([$u1]);
foreach($stm1 as $un1){
    $_SESSION['User1'] = [
        'room_id' =>$room_id,
        'user_id' => $un1['user_id'],
        'name' => $un1['user_name'],
        'score' => 120,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}

$stm2 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm2->execute([$u2]);
foreach($stm2 as $un2){
    $_SESSION['User2'] = [
        'room_id' =>$room_id,
        'user_id' => $un2['user_id'],
        'name' => $un2['user_name'],
        'score' => 90,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}

$stm3= $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm3->execute([$u3]);
foreach($stm3 as $un3){
    $_SESSION['User3'] = [
        'room_id' =>$room_id,
        'user_id' => $un3['user_id'],
        'name' => $un3['user_name'],
        'score' => 70,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}
$stm4 = $db->prepare('SELECT * FROM User WHERE user_id = ?');
$stm4->execute([$u4]);
foreach($stm4 as $un4){
    $_SESSION['User4'] = [
        'room_id' =>$room_id,
        'user_id' => $un4['user_id'],
        'name' => $un4['user_name'],
        'score' => 50,
        'hp' => 100,
        'charm' => 100,
        'sence' => 100,
    ];
}
echo 'ルームID：'.$_SESSION['User']['room_id'].'<br>';
echo 'メンバー1：'.$_SESSION['User1']['user_id'].'('.$_SESSION['User1']['name'].')<br>';
echo 'メンバー2：'.$_SESSION['User2']['user_id'].'('.$_SESSION['User2']['name'].')<br>';
echo 'メンバー3：'.$_SESSION['User3']['user_id'].'('.$_SESSION['User3']['name'].')<br>';
echo 'メンバー4：'.$_SESSION['User4']['user_id'].'('.$_SESSION['User4']['name'].')<br>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>カリカリ</title>
</head>
<body>
<table border="2" style="border-collapse: collapse; border-color: black">
        <tr>
            <th>ID</th>
            <th>ユーザー名</th>
            <th>幸福度</th>
            <th>体力</th>
            <th>魅力</th>
            <th>センス</th>
        </tr>
        
        <?php
        for($i=1;$i<5;$i++){
            echo'<tr>';
            echo'<td>'.$_SESSION['User'.$i]['user_id'].'</td>';
            echo'<td>'.$_SESSION['User'.$i]['name'].'</td>';
            echo'<td>'.$_SESSION['User'.$i]['score'].'</td>';
            echo'<td>'.$_SESSION['User'.$i]['hp'].'</td>';
            echo'<td>'.$_SESSION['User'.$i]['charm'].'</td>';
            echo'<td>'.$_SESSION['User'.$i]['sence'].'</td>';
            echo'</tr>';}
        ?>
        
    </table>
    <button onclick="location.href='/kansho/JINTAMA/src/php/G-3/G3-2.php'">ゲーム終了</button>
    <script>
        var status=<?php json_encode($_SESSION['']);?>;
        </script>
</body>
</html>