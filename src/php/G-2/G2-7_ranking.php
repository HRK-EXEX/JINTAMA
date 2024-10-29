<?php
session_start();
require '../db.php';

$userid = $_SESSION['User']['user_id'];
$error_message="";

$hozon=isset($_POST['hozon']) ? $_POST['hozon']:null;

$egg_id=isset($_POST['egg_id']) ? $_POST['egg_id'] : null;
$rank_num = isset($_POST['rank_num']) ? $_POST['rank_num'] : null; 

try {
    if ($hozon === 'suru') {
       
        $ranking = $db->prepare("INSERT INTO Ranking (user_id, egg_id, rank_num) VALUES (?, ?, ?)");
        $ranking->execute([$userid, $egg_id, $rank_num]);
    } elseif ($hozon === 'sinai') {
        
    } else {
        
        $error_message = "選択が無効です。";
    }
    
    
    header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
    exit;

} catch (PDOException $e) {
    $_SESSION['error_message'] = "エラー：" . $e->getMessage();
    header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
    exit;
}

?>
