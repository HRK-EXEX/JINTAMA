<?php
    session_start();
    $roomId = $_SESSION['User1']['room_id'];
    $_SESSION['User']['room_limit'] = 1;

    require "../db.php";
    $sql = $db -> query("SELECT * FROM Room WHERE room_id = $roomId");
    $result = $sql -> fetch();

    if (isset($result['Room']['room_user2'])) $_SESSION['User']['room_limit']++;
    if (isset($result['Room']['room_user3'])) $_SESSION['User']['room_limit']++;
    if (isset($result['Room']['room_user4'])) $_SESSION['User']['room_limit']++;

    var_dump($_SESSION);
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
    <script src="/kansho/JINTAMA/src/js/G-3/form.js" type="module"></script>
    <title>メインゲーム</title>
</head>
<body>
    <div id='json' style='display: none;'><?=mb_convert_encoding(json_encode($_SESSION, JSON_UNESCAPED_UNICODE), "utf-8")?></div>
    <form id="resultForm" action="G3-2.php" method="POST">
        <input id="user1" type="hidden" name="player[]" value="null">
        <input id="user2" type="hidden" name="player[]" value="null">
        <input id="user3" type="hidden" name="player[]" value="null">
        <input id="user4" type="hidden" name="player[]" value="null">
        <button id="send" type="submit">send</button>
    </form>
</body>
</html>