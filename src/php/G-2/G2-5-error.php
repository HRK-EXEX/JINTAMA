<?php session_start();
$error_id = $_GET['error_id'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-2.css">
    <title>エラー</title>
</head>
<body>
    <div class="all">
    <div class="kuro">
        <h1><?php
        if($error_id == 1){
            echo'この部屋は満員です。';
        }elseif($error_id == 2){
            echo'こ指定された部屋が見つかりません。';
        }elseif($error_id==3){
            echo'空いている部屋がありません。';
        }else{
            echo'この部屋には既にあなたが参加しています。';
        }
    ?></h1>
    <button  onclick="location.href='/kansho/JINTAMA/src/php/G-2/G2-2-input.php'">戻る</button>
    </div>
    
    </div>
</body>
</html>