<?php require '../db.php';?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css"/> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-1/G1-4.css" />
    
    <title>G1-4</title>
</head>
<?php
    $hashed_pass=password_hash($_POST['pass'],PASSWORD_DEFAULT);
     $stm = $db->prepare("INSERT INTO `User`(`user_id`, `user_name`, `password`) VALUES (null,?,?)");
     $stm->execute([$_POST['name'],$hashed_pass]);

?>
<body>
    <div class="all">
        <div class="kuro">
            
            <h1 class="complete">作成完了</h1><br>
            <div class="op_btn">
                <form action="/kansho/JINTAMA/src/html/G-3/G2-1.php" method="get">
                <button type="submit" class="btn1">メニュー画面へ</button><br>
            </div>
            </form>
        </div>
    </div>
</body>
</html>
<!-- require_once '../db.php';

try{
    $name=$_POST['user_name'] ?? '';
    $pass=$_POST['password'] ?? '';

    $hashed_pass=password_hash($pass,PASSWORD_DEFAULT);

    $stmt = $db->prepare('INSERT INTO User (user_name, password) VALUES (:name, :pass)');
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':pass', $hashed_pass, PDO::PARAM_STR);
    $stmt->execute();

    header('Location: G1-3.php?name=' .urlencode($name) . '&pass=' . urlencode($hashed_pass));
    exit;
}catch(Exception $e){
   echo 'エラー:'. $e->getMessage();
} -->