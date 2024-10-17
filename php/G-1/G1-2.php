<?php
require_once 'php/db.php';

try{
    $name=$_POST['name'] ?? '';
    $pass=$_POST['pass'] ?? '';

    $hashed_pass=password_hash($pass,PASSWORD_DEFAULT);

    $stmt = $db->prepare('INSERT INTO users (name, password) VALUES (:name, :pass)');
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':pass', $hashed_pass, PDO::PARAM_STR);
    $stmt->execute();

    header('Location: G1-3.html?name=' .urlencode($name));
    exit;
}catch(Exseption $e){
   echo 'エラー:'. $e->getMessage();
}

?>