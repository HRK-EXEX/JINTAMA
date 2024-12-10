<?php
    session_start();
    require '../db.php';
    $userid = $_SESSION['User']['user_id'];
    $error_message = $_SESSION['error_message'] ?? '';

    if (!isset($_SESSION['User'])) {
        $_SESSION['error_message'] = "ログインしていないため、このページにアクセスできません。";
        header("Location:/kansho/JINTAMA/src/php/G-1/G1-5-log-input.php");
        exit;
    }
    $userid = $_SESSION['User']['user_id'];

    $uname = '';
    $stm = $db->prepare("SELECT * FROM `User` WHERE user_id = ?");
    $stm->execute([$userid]);
    $userData = $stm->fetch(PDO::FETCH_ASSOC);

    if ($userData) {
        $uname = $userData['user_name'];
    } else {
        $error_message = "ユーザー情報が見つかりませんでした。";
    }
    unset($_SESSION['error_message']);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        include 'G2-7_ranking.php';
    }
    // foreach($stm as $un){
    //     $uname = $un['user_name'];
    // }

?>
<?php if (!empty($error_message)): ?>
    <div class="error">
        <?php echo htmlspecialchars($error_message, ENT_QUOTES, 'UTF-8'); ?>
    </div>
<?php endif; ?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/base/black_window.css" />
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-7.css" />
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/dot_font.css" />
    <title>設定画面</title>
</head>

<body>

    <div class="kuro">
        <p class="delete">
            <a href="G2-8.php" class="delete-color">
                アカウント削除
            </a>
        </p>

        <form action="G2-7_update.php" method="POST">
            <div class="username">
                ユーザー名 <input type="text" name="newname" <?php echo 'value="' . $uname . '"' ?> required><br>
            </div>
            <div class="ranking">
                ランキングへの情報送信<br>
                <div class="rank-ope">
                    <input type="radio" name="hozon" id="suru" class="radi" value="1" checked /><label for="suru">する？</label>
                    <input type="radio" name="hozon" id="sinai" class="radi" value="0" /><label for="sinai">しない？</label>
                </div>
            </div>
            <input type="hidden" name="egg_id" value="1">
            <input type="hidden" name="rank_num" value="1">
            <div class="operation">
                <button type="submit">保存</button>
                <button type="button" onclick="location.href='/kansho/JINTAMA/src/php/G-2/G2-1.php'">戻る</button>
            </div>
        </form>


    </div>

</body>

</html>