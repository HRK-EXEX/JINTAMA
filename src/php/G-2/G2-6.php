<?php session_start();
require '../db.php';
$rank = 1;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-2/G2-6.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" />  

    <title>ランキング</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <a href="/kansho/JINTAMA/src/php/G-2/G2-1.php" class="Rankmodoru">戻る</a></button>
            <h1 class="rankh1"><img src="/kansho/JINTAMA/img/crown.png" width="40" height="40">　High Score　<img src="/kansho/JINTAMA/img/crown.png" width="40" height="40"></h1>
            <table boder="1" class="scroll">
                <?php
                    // $stm = $db->prepare("SELECT * FROM `Eggs` ORDER BY score desc");
                    // $stm->execute();
                    // foreach($stm as $rank){
                    //     $count++;
                    //     $ranking[]=$rank['score'];
                    //     $userid[]=$rank['user_id'];
                    // }
                ?>
                <tr>
                    <th>順位</th>
                    <th></th>
                    <th>名前</th>
                    <th>ポイント</th>
                </tr>
                <?php
                 $stm2 = $db->prepare("SELECT score,u.user_id,u.user_name FROM Eggs e Join User u ON e.user_id = u.user_id ORDER BY e.score desc");
                 $stm2-> execute();
                 foreach ($stm2 as $un) {
                    echo'<tr>';
                    echo'<td>'.$rank.'</td>';
                    echo'<td><img src="/kansho/JINTAMA/img/icon2.png" width="40" height="40"></td>';
                    echo'<td>'.$un['user_name'].'</td>';
                    echo'<td>'.$un['score'].'pt</td>';
                    echo'</tr>';
                    $rank++;
                   }
                
                ?>
                <!-- <tr>
                    <td>2</td>
                    <td><img src="/kansho/JINTAMA/img/icon2.png" width="40" height="40"></td>
                    <td>たくろうくん</td>
                    <td>○○○○pt</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td><img src="/kansho/JINTAMA/img/icon2.png" width="40" height="40"></td>
                    <td>たくろうくん</td>
                    <td>○○○○pt</td>
                </tr> -->
            </table>
        </div>
    </div>
</body>
</html>