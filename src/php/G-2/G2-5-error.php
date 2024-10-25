<?php session_start();
$error_id = $_GET['error_id'];
if($error_id == 1){
    echo'この部屋は満員です。';
}elseif($error_id == 2){
    echo'こ指定された部屋が見つかりません。';
}elseif($error_id==3){
    echo'空いている部屋がありません。';
}else{
    echo'この部屋には既にあなたが参加しています。';
}
?>
