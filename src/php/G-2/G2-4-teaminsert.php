<?php
require '../db.php';

$userid = $_POST['userid'];
$teamname = $_POST['teamname'];
$human = $_POST['humen'];

if($human==4){
$stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,null,null)");
     $stm->execute([$teamname,$userid]);
}elseif($human==3){
    $stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,null,'9999')");
     $stm->execute([$teamname,$userid]);
}else{
    $stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,'9999','9999')");
     $stm->execute([$teamname,$userid]);
}

     header('Location:/kansho/JINTAMA/src/php/G-2/G2-5.php');
?>