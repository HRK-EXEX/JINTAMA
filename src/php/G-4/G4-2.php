<?php require '../db.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-4/G4-2.css">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>管理者画面</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
    <h1 class="adminh1">ユーザー削除</h1>
    <table boder="1">
        <tr>
            <th>ID</th>
            <th>ユーザー名</th>
            <th>削除</th>
            <!-- <th>復旧</th> -->
        </tr>
        
        <?php
        $stm = $db->prepare("select * from User");
        $stm->execute();
        foreach($stm as $user){
            echo'<form action="/kansho/JINTAMA/src/php/G-4/G4-2-delete.php" method="post">';
            echo'<tr>';
            echo'<input type="hidden" name="userid" value="'.$user['user_id'].'">';
            echo'<td>'.$user['user_id'].'</td>';
            echo'<td>'.$user['user_name'].'</td>';
            echo'<td><button type="submit" class="delete">削除</button></td>';
            // echo'<td><button type="submit" class="f">復旧</button></td>';
            echo'</tr>';
            echo'</form>';
        }
        // <tr>
        //     <td>#11111</td>
        //     <td>たくろうくん</td>
        //     <td><button type="submit" class="delete">削除</button></td>
        //     <td><button type="submit" class="f">復旧</button></td>
        // </tr>
        // <tr>
        //     <td>#11111</td>
        //     <td>たくろうくん</td>
        //     <td><button type="submit" class="delete">削除</button></td>
        //     <td><button type="submit" class="f">復旧</button></td>
        // </tr>
        // <tr>
        //     <td>#11111</td>
        //     <td>たくろうくん</td>
        //     <td><button type="submit" class="delete">削除</button></td>
        //     <td><button type="submit" class="f">復旧</button></td>
        // </tr>
        ?>
        
    </table>
    </div>
    </div>
</body>
</html>