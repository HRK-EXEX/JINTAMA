<?php
    session_start();
    
    // echo "<pre>";
    // var_dump($_SESSION);
    // echo "</pre>";

    $roomId = $_SESSION['User']['room_id'];
    $_SESSION['User']['room_limit'] = 1;

    require "../db.php";
    $sql = $db -> query("SELECT * FROM Room WHERE room_id = $roomId");
    $result = $sql -> fetch();

    if (isset($result['room_user2'])) $_SESSION['User']['room_limit']++;
    if (isset($result['room_user3'])) $_SESSION['User']['room_limit']++;
    if (isset($result['room_user4'])) $_SESSION['User']['room_limit']++;

    // データを安全に出力するためのヘルパー関数
    function safeJsonEncode($data, $isPosted = false) {
        // 必要なデータのみを抽出
        // echo($data[0]);
        if ($isPosted) {
            $safeData = [
                'User' => [
                    'user_id' => $_SESSION['User']['user_id'],
                    'user_name' => $_SESSION['User']['user_name'],
                    'room_id' => $_SESSION['User']['room_id'],  // 文字列から数値に変換
                    'room_limit' => $_SESSION['User']['room_limit']
                ]
            ];

            // nullのユーザーも含めて送信（追加ユーザー参加時の処理に必要かもしれないため）
            for ($i=1; $i<=4; $i++) {
                // NULL分岐
                $keyName = 'User'.$i;
                
                $safeData += array($keyName => [
                    'room_id' => $_SESSION['User']['room_id'] ?? null, // 文字列から数値に変換
                    'user_id' => $_SESSION[$keyName]['user_id'] ?? null,
                    'name' => $_SESSION[$keyName]['name'] ?? null,
                    'score' => $data[$i-1]['score'] ?? null,
                    'hp' => $data[$i-1]['hp'] ?? null,
                    'charm' => $data[$i-1]['charm'] ?? null,
                    'sense' => $data[$i-1]['sense'] ?? null
                ]);
            }
        } else {
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
                $keyName = 'User'.$i;
                if (isset($data[$keyName])) {
                    $safeData += array($keyName => [
                        'room_id' => (int)$data[$keyName]['room_id'], // 文字列から数値に変換
                        'user_id' => (int)$data[$keyName]['user_id'],
                        'name' => $data[$keyName]['name'],
                        'score' => (int)$data[$keyName]['score'],
                        'hp' => (int)$data[$keyName]['hp'],
                        'charm' => (int)$data[$keyName]['charm'],
                        'sense' => (int)$data[$keyName]['sense']
                    ]);
                } else {
                    $data[$keyName] = null;
                }
            }
        }
        
        return json_encode($safeData);
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
    <script src="/kansho/JINTAMA/src/js/anime-master/lib/anime.min.js"></script>
    <script src="/kansho/JINTAMA/src/js/G-3/main.js" type="module"></script>
    <!-- <script src="/kansho/JINTAMA/src/js/G-3/form.js" type="module"></script> -->
    <title>メインゲーム</title>
</head>
<body>
    <!-- データ出力用の要素 -->
    <div id="session-data" type="application/json" style="display: none;">
        <?php echo safeJsonEncode(isset($_POST['userJson']) ? json_decode($_POST['userJson'], true) : $_SESSION, isset($_POST['userJson'])); ?>
    </div>
    <div style="display: none;">
        <?php echo isset($_POST['userJson']), ", ", isset($_SESSION); ?>
    </div>
    <form id="resultForm" action="G3-2.php" method="POST">
        <input id="userJson" type="hidden" name="userJson">
        <!-- <button id="send" type="submit">send</button> -->
    </form>
</body>
</html>