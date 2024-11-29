<?php session_start();
require '../db.php';

$userid = $_POST['userid'];
$teamname = $_POST['teamname'];
$human = 4;
$human = $_POST['humen'];

$stm = $db->prepare("INSERT INTO `Room`(`room_id`, `room_name`, `room_user1`, `room_user2`, `room_user3`, `room_user4`) VALUES (null,?,?,null,null,null)");
$stm->execute([$teamname,$userid]);

$stm2 = $db->prepare("SELECT `room_id` FROM `Room` WHERE room_name = ?");
$stm2->execute([$teamname]);
$room_id = null;

foreach($stm2 as $rm){
     // 値が入るまで続ける
     if (is_null($room_id)) {
          $room_id = $rm['room_id'];
          if (is_null($room_id)) continue;
          $_SESSION['User']['room_id'] =$room_id;
     } else break;
}

     header("Location:/kansho/JINTAMA/src/php/G-2/G2-5.php?room_id=".$room_id."");
?>