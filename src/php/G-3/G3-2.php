<?php
session_start();

require '../db.php';
$room_id = $_GET['room_id'];

// Roomデータを取得
$stm = $db->prepare('SELECT * FROM Room WHERE room_id = ?');
$stm->execute([$room_id]);
$roomData = $stm->fetch(PDO::FETCH_ASSOC);

if ($roomData === false) {
    echo "指定されたroom_idの部屋が見つかりません";
    exit;
}

// Eggsテーブルのレコード数を取得
$stm2 = $db->prepare('SELECT COUNT(*) as count FROM Eggs');
$stm2->execute();
$rowcount = $stm2->fetch(PDO::FETCH_ASSOC)['count'];

$count = 0;

// ユーザー数の確認
for ($i = 1; $i <= 4; $i++) {
    $userId = $roomData['room_user' . $i];
    if ($userId !== null && $userId !== 9999 && $userId !== 9998) {
        $count++;
    }
}

// レコード数からユーザー数を引く
$offset = $rowcount - $count;

// `LIMIT` と `OFFSET` を利用したEggsデータの取得
$sql = 'SELECT * FROM Eggs LIMIT ' . $count . ' OFFSET ' . $offset;
$stm3 = $db->prepare($sql);
$stm3->execute();
$EggData = $stm3->fetchAll(PDO::FETCH_ASSOC); 

$emptyArray = [];

for($i = 1; $i <= $count;$i++){

}




// echo json_encode($emptyArray);
// usort($emptyArray, function ($a, $b) {
//     return $b[1] <=> $a[1];
// });

// $score->execute([$userId]);
// $userScore = $score->fetch(PDO::FETCH_ASSOC);
// $score = $db->prepare('SELECT score FROM Eggs WHERE user_id = ?');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-3/G3-2.css">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/dot_font.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>リザルト画面</title>
</head>
<body>
    <div class="rank">
        <h1><img src="/kansho/JINTAMA/img/crown.png" alt=""><span class="ranktext">１位</span><img src="/kansho/JINTAMA/img/crown.png" alt=""></h1>
    </div>
    <div class="rankmain">
        <img src="/kansho/JINTAMA/img/takuicon.png" alt="" class="icon">
           



                <div class="ranksabu">
                        <h1 style="font-size: 50px;">たくろう</h1>
                        <h2 style="font-size: 30px;">幸福度：100</h2>
                        <h2 style="font-size: 30px;">体力：100</h2>
                        <h2 style="font-size: 30px;">センス：100</h2>
                        <h2 style="font-size: 30px;">魅力:100</h2>
                </div>
         
    </div>
    <a href="/src/html/G-3/G3-3.html" class="nexttext"><h2>次へ→</h2></a>
</body>
</html>