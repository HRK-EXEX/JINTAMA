<?php
    const SERVER = "mysql309.phy.lolipop.lan";
    const DBNAME = "LAA1517439-kansho";
    const USER = "LAA1517439";
    const PASS = "Pass1234";
    $connect = 'mysql:host='.SERVER.';dbname='.DBNAME.';charset=utf8';             
    $db = new PDO($connect, USER, PASS);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/css/G-4/G4-2.css">
    <link rel="stylesheet"  href="/src/css/base/dot_font.css" /> 
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
            <th>復旧</th>
        </tr>
        <?php
        $kanri_id = 1;
        $db->query("select * from User");
        // $db->execute([]);
        foreach($db as $user){
            echo'<tr>';
            echo'<td>'.$user['user_id'].'</td>';
            echo'<td>'.$user['user_name'].'</td>';
            echo'<td><button type="submit" class="delete">削除</button></td>';
            echo'<td><button type="submit" class="f">復旧</button></td>';
            echo'</tr>';
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