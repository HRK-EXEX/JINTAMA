<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-1/G1-5.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
   
    <title>G1-5</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <form action="/kansho/JINTAMA/src/php/G-1/G1-5-log-output.php" method="post">
            <h1 class="log">Login</h1><br>
            <h2 class="h2name">name<input type="text" name="user_name_form" id="user_name" class="textbox"></h2><br>
            <h2 class="h2password">password<input type="password" name="password_form" id="password" class="textbox"></h2><br>
            <div class="op_btn">
                <button type="submit" class="btn1">OK</button><br>
                <?php if(isset($_GET['hogeA'])): ?>
                <p class="error"><?php echo $_GET['hogeA']; ?></p>
                <?php endif; ?>
                <a href="/kansho/JINTAMA/src/php/G-1/G1-2.php" class="btn2">新規登録</a>
            </div>
            </form>
        </div>
    </div>
</body>
</html>