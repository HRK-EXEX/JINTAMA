<?php session_start();
require '../db.php';

$userid = $_POST['userid'];
$teamname = $_POST['teamname'];
$human = 4;
$human = $_POST['humen'];

if($human==4){
$stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,null,null)");
     $stm->execute([$teamname,$userid]);
}elseif($human==3){
    $stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,null,'9999')");
     $stm->execute([$teamname,$userid]);
}else{
    $stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,'9999','9998')");
     $stm->execute([$teamname,$userid]);
}
$stm2 = $db->prepare("SELECT `room_id` FROM `Room` WHERE room_name = ?");
$stm2->execute([$teamname]);
foreach( $stm2 as $rm){
     $room_id = $rm['room_id'];
     $_SESSION['User']['room_id'] = $rm['room_id'];
}

     header("Location:/kansho/JINTAMA/src/php/G-2/G2-5.php?room_id=".$room_id."");
?>