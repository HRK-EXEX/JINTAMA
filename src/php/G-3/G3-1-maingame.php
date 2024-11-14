<?php
    session_start();
    $array = array(
        '1' => $_SESSION['User1'],
        '2' => $_SESSION['User2'],
        '3' => $_SESSION['User3'],
        '4' => $_SESSION['User4']
    );
    foreach ($array as $index => $arr) {
        echo "<div id='username$index' style='display: none;'>".!empty($arr) ? implode(",", $arr) : "empty"."</div>";
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-3/G3-1-game.css">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/phaser@v3.85.2/dist/phaser.min.js"></script>
    <script src="/kansho/JINTAMA/src/js/G-3/initialize.js" type="module"></script>
    <script src="/kansho/JINTAMA/src/js/G-3/gameBoard.js" type="module"></script>
    <script src="/kansho/JINTAMA/src/js/G-3/dialogSelectBox.js" type="module"></script>
    <script src="/kansho/JINTAMA/src/js/G-3/main.js" type="module"></script>
    <title>メインゲーム</title>
</head>
<body>
</body>
</html>