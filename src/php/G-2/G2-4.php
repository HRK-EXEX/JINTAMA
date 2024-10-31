<?php session_start();
    $userid= $_SESSION['User']['user_id'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-4.css">
    <title>ルーム一覧</title>
</head>
<body>
    <div class="all">
        <form action="G2-4-teaminsert.php" method="post">
            <?php echo'<input type="hidden" name="userid" value="'.$userid.'">';?>
        <div class="kuro">
            <h2 dotgothic16-regular>チーム名を入力してください。</h2>
            <input class="team_name" name="teamname"  required>
            <h2>参加人数の上限を入力してください。（４人まで）</h2><br>
            <table class="room_list">
                <tr>
                    <!-- <td><input id="1" name="humen" type="radio" class="radios"><label class="nums" for="1">１</label></td> -->
                    <td><input id="2" name="humen" type="radio" class="radios" value=2><label class="nums" for="2">２</label></td>
                    <td><input id="3" name="humen" type="radio" class="radios" value=3><label class="nums" for="3">３</label></td>
                    <td><input id="4" name="humen" type="radio" class="radios" value=4><label class="nums" for="4">４</label></td>
                </tr>
            </table>
            <div class="opration">
                <a class="modoru" href="G2-2-input.php" >戻る</a>
                <input type="submit" class="submitbtn" value="ルーム作成">
            </div>
        </div>
    </div>
    </form>
</body>
</html>