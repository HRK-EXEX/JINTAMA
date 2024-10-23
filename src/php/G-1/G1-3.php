<?php
session_start(); 


$name = $_SESSION['user_name'] ?? '未入力';
$pass = $_SESSION['password'] ?? '未入力';
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-1/G1-3.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>アカウント作成確認</title>
</head>
<body>

    <div class="all">
        <div class="kuro">
            <button class="back" onclick="location.href='G1-2.php'">back</button>
            <div class="input-container">
                <h2 class="h2name">name: <span id="name" class="input-name"><?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?></span></h2>
            </div>
            <div class="input-container">
                <h2 class="h2password">password: <span id="pass" class="input-pass"><?php echo htmlspecialchars($pass, ENT_QUOTES, 'UTF-8'); ?></span></h2>
            </div>

            <form action="/kansho/JINTAMA/src/php/G-1/G1-4.php" method="post">
                <input type="hidden" name="name" value="<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>">
                <input type="hidden" name="pass" value="<?php echo htmlspecialchars($pass, ENT_QUOTES, 'UTF-8'); ?>">
                <div class="op_btn">
                    <input type="submit" value="ok">
                </div>
            </form>
        </div>  
    </div>

</body>
</html>
