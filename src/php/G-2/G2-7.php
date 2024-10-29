
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/base/black_window.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-2/G2-7.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>設定画面</title>
</head>
<body>

    <div class="kuro">
        <a href="/src/html/G-2/G2-8.html"><p class="delete">アカウント削除</p></a>
        <form action="G2-4.update.php">
            <div class="username">
                ユーザー名 <input type="text"><br>
            </div>
            <div class="ranking">
                ランキングへの情報送信<br>
            <input type="radio" name="hozon" id="suru" class="radi" /><label for="suru">する？</label>
           <input type="radio" name="hozon" id="sinai" class="radi" /><label for="sinai">しない？</label>
        </div>
        </form>
        
    <form action="G2-7_update.php">
        <button type="submit">
            保存
        </button>
    </form>

            
        <button type="submit" onclick="location.href='/src/html/G-2/G2-1_mainmenu.html'">
            戻る
        </button>

</div>

</body>
</html>