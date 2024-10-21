<?php require '../db.php' ?>
<?php

$id=$_POST['userid'];
$stm = $db->prepare("DELETE FROM `User` WHERE user_id = ?;");
$stm->execute([$id]);
header('Location:/kansho/JINTAMA/src/php/G-4/G4-2.php');
?>