<?php
session_start(); 
$name = $_SESSION['user_name'] ?? '';
$pass = $_SESSION['password'] ?? '';
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
                <h2 class="h2name">name: <span id="name"><?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?></span></h2>
            </div>
            <div class="input-container">
                <h2 class="h2password">password: <span id="pass"><?php echo htmlspecialchars($pass, ENT_QUOTES, 'UTF-8'); ?></span></h2>
            </div>
        </div>  
    </div>


</body>
</html>