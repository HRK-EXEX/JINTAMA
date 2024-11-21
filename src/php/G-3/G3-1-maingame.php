<?php
    session_start();
    echo "<div id='users' style='display: none;'>".json_encode($_SESSION)."</div><br>";
    $roomId = $_SESSION['User1']['room_id'];

    require "../db.php";
    // $sql = $db -> query("SELECT * FROM Room");
    // $result = $sql -> fetchAll();    

    // echo "<div id='username1' style='display: none;'>".(isset($_SESSION['User1']) ? implode(",", $_SESSION['User1']) : "empty")."</div><br>";
    // if (isset($result['Room']['room_user2'])) echo "<div id='username2' style='display: none;'>".(isset($_SESSION['User2']) ? implode(",", $_SESSION['User2']) : "empty")."</div><br>";
    // if (isset($result['Room']['room_user3'])) echo "<div id='username3' style='display: none;'>".(isset($_SESSION['User3']) ? implode(",", $_SESSION['User3']) : "empty")."</div><br>";
    // if (isset($result['Room']['room_user4'])) echo "<div id='username4' style='display: none;'>".(isset($_SESSION['User4']) ? implode(",", $_SESSION['User4']) : "empty")."</div><br>";
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
    <form id="resultForm" action="G3-2.php" method="POST">
        <input id="user1" type="hidden" name="player[]" value="null">
        <input id="user2" type="hidden" name="player[]" value="null">
        <input id="user3" type="hidden" name="player[]" value="null">
        <input id="user4" type="hidden" name="player[]" value="null">
        <button id="send" type="submit">send</button>
    </form>
</body>
</html>