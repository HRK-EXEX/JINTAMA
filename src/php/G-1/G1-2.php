<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/black_window.css" />
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-1/G1-2.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>アカウント作成</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <form action="G1-3.php" method="post">
                <button class="back dotgothic16-regular" type="button" onclick="location.href='G1-1.php'">back</button>
                <h2 class="h2name">
                    name <input type="text" name="user_name" class="textbox" required><br>
                </h2>
                <h2 class="h2password">
                    password <input type="password" name="password" class="textbox" required><br>
                </h2>
        
                <div class="op_btn "><input class="dotgothic16-regular" type="submit" value="create"></div>
                
            </form>
        </div>
    </div>
</body>
</html>
