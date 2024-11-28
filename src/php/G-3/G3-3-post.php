<?php session_start();
    require '../db.php';

    $rId = $_GET['room_id'];
    $sql = $db -> prepare('DELETE FROM Room WHERE room_id = ?');
    $sql -> execute([$rId]);

    header('Location: /kansho/JINTAMA/src/php/G-2/G2-2.php');
?>