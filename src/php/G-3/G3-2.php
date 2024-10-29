<?php
session_start();

require '../db.php';
$room_id = $_GET['room_id'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/src/css/G-3/G3-2.css">
    <link rel="stylesheet" href="/src/css/base/dot_font.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リザルト画面</title>
</head>
<body>
    <div class="rank">
        <h1><img src="/img/crown.png" alt=""><span class="ranktext">１位</span><img src="/img/crown.png" alt=""></h1>
    </div>
    <div class="rankmain">
        <img src="/img/takuicon.png" alt="" class="icon">
            <?php
                $stm = $db->prepare('SELECT * FROM Room WHERE room_id = ?');
                $stm->execute([$room_id]);

                <div class="ranksabu">
                        <h1 style="font-size: 50px;">たくろう</h1>
                        <h2 style="font-size: 30px;">幸福度：100</h2>
                        <h2 style="font-size: 30px;">体力：100</h2>
                        <h2 style="font-size: 30px;">センス：100</h2>
                        <h2 style="font-size: 30px;">魅力:100</h2>
                </div>
            ?>
    </div>
    <a href="/src/html/G-3/G3-3.html" class="nexttext"><h2>次へ→</h2></a>
</body>
</html>