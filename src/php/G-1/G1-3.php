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

    header('Location: G1-3.php?name=' .urlencode($name));
    exit;
}catch(Exseption $e){
   echo 'エラー:'. $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet"  href="/src/css/base/black_window.css" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/src/css/G-1/G1-3.css" />
    <link rel="stylesheet"  href="/src/css/base/dot_font.css" /> 

    <title>アカウント作成確認</title>
</head>
<body>

    <div class="all">
<div class="kuro">
        <button class="back" onclick="location.href='G1-2.html'">back</button>
        <div class="input-container">
    <h2 class="h2name">name </h2><span id="name" class="input-name"></span></div>
    <div class="input-container">
    <h2 class="h2password">password </h2><span id="pass" class="input-pass"></span></div>
    
    
    <form action="/src/html/G-1/G1-4.html" method="GET">
        <input type="hidden" name="name" >
        <input type="hidden" name="pass" >
        <div class="op_btn "><input type="submit" value="ok"></div>
    </form>
</div>  
</div>
</div>
<script>
     const params = new URLSearchParams(location.search);
       document.getElementById('name').textContent = params.get('name') 
        document.getElementById('pass').textContent = params.get('pass')  
</script>
</body>
</html>