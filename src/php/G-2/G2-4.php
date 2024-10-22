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
        <div class="kuro">
            <h2 dotgothic16-regular>チーム名を入力してください。</h2>
            <input class="team_name" name="teamname">
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
                <button onclick="location.href='G2-2.php'">戻る</button>
                <button onclick="location.href='G2-5.html?id=1'">ルームを作成する</button>
            </div>
        </div>
    </div>
</body>
</html>