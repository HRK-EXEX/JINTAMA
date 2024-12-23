<?php session_start();
require '../db.php';
$room_id = $_GET['room_id'];
// echo $_SESSION['User']['room_id'];
$memcount = 0;
$maxcount = 4;
$username =[];
// echo $room_id;
$stm = $db->prepare("SELECT `room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4` FROM `Room` WHERE room_id = ?");
     $stm->execute([$room_id]);
     foreach($stm as $rm){
        $roomname = $rm['room_name'];
        $user1 = $rm['room_user1'];
        $memcount = 1;
        $ucheck = $db->prepare("SELECT * FROM `User` WHERE user_id = ?");
        $ucheck->execute([$user1]);
        foreach($ucheck as $un){
                    $username[1] = $un['user_name'];
                }
        if(!is_null($rm['room_user2'])){
            $user2 = $rm['room_user2'];
            $memcount++;
            $ucheck =$db->prepare("SELECT * FROM `User` WHERE user_id = ?");
            $ucheck->execute([$user2]);
                foreach($ucheck as $un){
                    $username[2] = $un['user_name'];
                }
        }
        if(!is_null($rm['room_user3'])){
            $user3 = $rm['room_user3'];
            if($user3 != null){
                $memcount++;
                $ucheck =$db->prepare("SELECT * FROM `User` WHERE user_id = ?");
                $ucheck->execute([$user3]);
                    foreach($ucheck as $un){
                        $username[3] = $un['user_name'];
                    }
            }
        }
        if(!is_null($rm['room_user4'])){
            $user4 = $rm['room_user4'];
            if($user4 != null){
                $memcount++;
                $ucheck =$db->prepare("SELECT * FROM `User` WHERE user_id = ?");
                $ucheck->execute([$user4]);
                    foreach($ucheck as $un){
                        $username[4] = $un['user_name'];
                }
            }
        }
     }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-5.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
    <title>ルーム一覧</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <h2 dotgothic16-regular><?php echo$roomname ?> - メンバーを募集しています… (<?php echo $memcount?>/<?php echo $maxcount?>)</h2>
            <table class="room_list dotgothic16-regular">
                <?php for ($i=0; $i < $memcount; $i++) { 
                    echo'<tr><td><span class="member_name">'.$username[$i+1].'</span></td></tr>';
                }
                    ?>
            </table>
            <div class="opration">
            <form action="G2-5-update.php?room_id=<?php echo $room_id; ?>" method="post">
                <button type="submit" name="back_button">戻る</button>
            </form>

            <button onclick="location.href='/kansho/JINTAMA/src/php/G-3/G3-1-kari.php?room_id=<?php echo $room_id; ?>'">スタート！</button>
            </div>
        </div>
    </div>
</body>