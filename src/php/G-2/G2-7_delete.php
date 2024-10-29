<?php
session_start();
require '../db.php';
$userid = $_SESSION['User']['user_id'];

$roomcheck=$db->prepare("SELECT COUNT(*) FROM Room WHERE room_user1 = ? OR room_user2 = ? OR room_user3 = ? OR room_user4=?");
$roomcheck->execute([$userid]);
$count=$roomcheck->fetchColumn();

if($count>0){
    $_SESSION['error_message']="このユーザーはルームに参加しているため、アカウントを削除できません。";
    header("Location:/kansho/JINTAMA/src/php/G-2/G2-7.php");
    exit;
}else{
    try{
        $stm = $db->prepare("DELETE FROM `User` WHERE user_id=?");
        $stm->execute([$userid]);
header("Location: /kansho/JINTAMA/src/php/G-2/G2-1.php");
        exit;
    }catch(PDOException $e){
        $_SESSION['error_message']="エラー：".$e->getMessage();
        header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
        exit;
    }
}


?>