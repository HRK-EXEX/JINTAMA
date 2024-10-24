<?php
session_start();
ob_start();
require '../db.php';
$userid = $_SESSION['User']['user_id'];
$username = $_SESSION['User']['user_name'];

if (isset($_POST['back_button'])) {
    $room_id = $_POST['room_id']; 

    $db = "UPDATE Room SET room_user1 = NULL, room_user2 = NULL, room_user3 = NULL, room_user4 = NULL WHERE room_id = $room_id";


    if ($conn->query($db) === TRUE) {
        echo "ルームユーザーが正常に更新されました";
    } else {
        echo "エラー: " . $conn->error;
    }

    $conn->close();
}
?>