<?php
        session_start();
        if (!empty($_SESSION['error_message'])) {
            
            echo '<div class="error-message">' . htmlspecialchars($_SESSION['error_message'], ENT_QUOTES, 'UTF-8') . '</div>';
            unset($_SESSION['error_message']);
        }
        ?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-8.css">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/dot_font.css">
    <title>アカウント削除確認画面</title>
</head>
<body>
    <div class="main">
        
       <h1 class="text">本当に削除しますか？</h1>
       <div class="command">
            
            <form action="G2-8_delete.php" method="POST">
                <button type="submit" class="delete">削除</button>
            </form>
            <button class="back" onclick="location.href='/kansho/JINTAMA/src/php/G-2/G2-7.php'">戻る</button>
       </div>
    </div>
</body>
</html>
