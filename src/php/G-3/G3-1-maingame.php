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

    // データを安全に出力するためのヘルパー関数
    function safeJsonEncode($data) {
        // 必要なデータのみを抽出
        $safeData = [
            'User' => [
                'user_id' => (int)$data['User']['user_id'],
                'user_name' => $data['User']['user_name'],
                'room_id' => (int)$data['User']['room_id'],  // 文字列から数値に変換
                'room_limit' => (int)$data['User']['room_limit']
            ],
            'User1' => [
                'room_id' => (int)$data['User1']['room_id'], // 文字列から数値に変換
                'user_id' => (int)$data['User1']['user_id'],
                'name' => $data['User1']['name'],
                'score' => (int)$data['User1']['score'],
                'hp' => (int)$data['User1']['hp'],
                'charm' => (int)$data['User1']['charm'],
                'sense' => (int)$data['User1']['sense']
            ]
        ];

        // nullのユーザーも含めて送信（追加ユーザー参加時の処理に必要かもしれないため）
        for ($i=2; $i<=4; $i++) {
            // NULL分岐
            if (isset($data["User$i"])) {
                array_push($safeData, 
                    ["User$i" => [
                        'room_id' => (int)$data["User$i"]['room_id'], // 文字列から数値に変換
                        'user_id' => (int)$data["User$i"]['user_id'],
                        'name' => $data["User$i"]['name'],
                        'score' => (int)$data["User$i"]['score'],
                        'hp' => (int)$data["User$i"]['hp'],
                        'charm' => (int)$data["User$i"]['charm'],
                        'sense' => (int)$data["User$i"]['sense']
                    ]]
                );
            } else $data["User$i"] = null;
        }
        
        return htmlspecialchars(json_encode($safeData), ENT_NOQUOTES, 'UTF-8');
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
    <script src="/kansho/JINTAMA/src/js/G-3/form.js" type="module"></script>
    <title>メインゲーム</title>
</head>
<body>
    <!-- データ出力用の要素 -->
    <div id="session-data" type="application/json">
        <?php echo safeJsonEncode($_SESSION)?>
    </div>
    <form id="resultForm" action="G3-2.php" method="POST">
        <input id="user1" type="hidden" name="player[]" value="null">
        <input id="user2" type="hidden" name="player[]" value="null">
        <input id="user3" type="hidden" name="player[]" value="null">
        <input id="user4" type="hidden" name="player[]" value="null">
        <button id="send" type="submit">send</button>
    </form>
</body>
</html>