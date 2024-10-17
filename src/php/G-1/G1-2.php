<?php
require_once '../db.php';

try{
    $name=$_POST['user_name'] ?? '';
    $pass=$_POST['password'] ?? '';

    $hashed_pass=password_hash($pass,PASSWORD_DEFAULT);

    $stmt = $db->prepare('INSERT INTO User (user_name, password) VALUES (:name, :pass)');
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':pass', $hashed_pass, PDO::PARAM_STR);
    $stmt->execute();

    header('Location: G1-3.html?name=' .urlencode($name));
    exit;
}catch(Exseption $e){
   echo 'エラー:'. $e->getMessage();
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/src/css/base/black_window.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Kansho/JINTAMA/src/css/G-1/G1-2.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
    <link rel="stylesheet"  href="/src/css/base/dot_font.css" /> 
    <title>アカウント作成</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <form action="G1-3.html" method="post">
                <button class="back dotgothic16-regular" type="button" onclick="location.href='G1-1_title.html'">back</button>
                <h2 class="h2name">
                    name <input type="text" name="name" class="textbox" required><br>
                </h2>
                <h2 class="h2password">
                    password <input type="password" name="pass" class="textbox" required><br>
                </h2>
        
                <div class="op_btn "><input class="dotgothic16-regular" type="submit" value="create"></div>
                
            </form>
        </div>
    </div>
</body>
</html>
