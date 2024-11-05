<?php session_start();
require '../db.php';
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>最終リザルト画面</title>
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-3/G3-3.css">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/dot_font.css">
</head>
<body>
    <!-- <audio controls autoplay src="/music/MusMus-BGM-155.mp3" ></audio> -->
    <div class="result">
    <h1><img src="/kansho/JINTAMA/img/crown.png" alt="" class="crown"><span class="ranktext">リザルト</span><img src="/kansho/JINTAMA/img/crown.png" alt="" class="crown"></h1>
    </div>
    <div class="container">
        <?php 
        for($i=0;$i < 4; $i++){
            $r = $i +1;
            echo'<div class="result-box">';
                echo'<img src="/kansho/JINTAMA/img/melondog.png" alt="" class="icon" style="image-rendering: pixelated;">';
                echo'<div class="resultsabu">';
                echo'<h2>'.$r.'.'.$_SESSION['User'.$r]['name'].'</p>';
                echo'<p>幸福度：'.$_SESSION['User'.$r]['score'].'</p>';
                echo'<p>体力：'.$_SESSION['User'.$r]['hp'].'</p>';
                echo'<p>センス：'.$_SESSION['User'.$r]['sence'].'<p>';
                echo'<p>魅力：'.$_SESSION['User'.$r]['charm'].'</p>';
                echo'</div>
            </div>';
        }
            ?>
            <!-- <div class="result-box">
                <img src="/kansho/JINTAMA/img/icon1.png" alt="" class="icon">
                <div class="resultsabu">
                <h2>2.ふかい</p>
                    <p>幸福度：500</p>
                    <p>体力：100</p>
                    <p>センス：100</p>
                    <p>魅力：100</p>
                </div>
            </div>
            <div class="result-box">
                <img src="/kansho/JINTAMA/img/icon2.png" alt="" class="icon">
                <div class="resultsabu">
                <h2>3.はやと</p>
                    <p>幸福度：100</p>
                    <p>体力：100</p>
                    <p>センス：100</p>
                    <p>魅力：100</p>
                </div>
            </div>
            <div class="result-box">
                <img src="/kansho/JINTAMA/img/icon3.png" alt="" class="icon">
                <div class="resultsabu">
                <h2>4.さちか</p>
                    <p>幸福度：10</p>
                    <p>体力：100</p>
                    <p>センス：100</p>
                    <p>魅力:100</p>
                </div>
            </div> -->
            </div>
            <a href="/kansho/JINTAMA/src/php/G-2/G2-1.php" class="mainnext">メインメニューへ</a>
</body>
</html>