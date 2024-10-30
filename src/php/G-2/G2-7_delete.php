<?php
session_start();
require '../db.php';
$userid = $_SESSION['User']['user_id'];


$roomCheck1 = $db->prepare("SELECT COUNT(*) FROM Room WHERE room_user1 = ?");
$roomCheck1->execute([$userid]);
$count1 = $roomCheck1->fetchColumn();


$roomCheck2 = $db->prepare("SELECT COUNT(*) FROM Room WHERE room_user2 = ?");
$roomCheck2->execute([$userid]);
$count2 = $roomCheck2->fetchColumn();


$roomCheck3 = $db->prepare("SELECT COUNT(*) FROM Room WHERE room_user3 = ?");
$roomCheck3->execute([$userid]);
$count3 = $roomCheck3->fetchColumn();


$roomCheck4 = $db->prepare("SELECT COUNT(*) FROM Room WHERE room_user4 = ?");
$roomCheck4->execute([$userid]);
$count4 = $roomCheck4->fetchColumn();

if ($count1 > 0 || $count2 > 0 || $count3 > 0 || $count4>0){
    $_SESSION['error_message']="このユーザーはルームに参加しているため、アカウントを削除できません。";
    header("Location:/kansho/JINTAMA/src/php/G-2/G2-7.php");
    exit;
}else{
    try{
        $db->beginTransaction();
        $eggsDelete = $db->prepare("DELETE FROM Eggs WHERE user_id = ?");
        $eggsDelete->execute([$userid]);

       
        $userDelete = $db->prepare("DELETE FROM `User` WHERE user_id = ?");
        $userDelete->execute([$userid]);
        $db->commit();
       
header("Location: /kansho/JINTAMA/src/php/G-2/G2-1.php");
        exit;
    }catch(PDOException $e){
        $db->rollBack();
        $_SESSION['error_message']="エラー：".$e->getMessage();
        header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
        exit;
    }
}


?>