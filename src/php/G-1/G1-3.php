
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet"  href="/src/css/base/black_window.css" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-1/G1-3.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 

    <title>アカウント作成確認</title>
</head>
<body>

    <div class="all">
<div class="kuro">
        <button class="back" onclick="location.href='G1-2.php'">back</button>
        <div class="input-container">
    <h2 class="h2name">name </h2><span id="name" class="input-name"><?php echo $_POST['user_name']?></span></div>
    <div class="input-container">
    <h2 class="h2password">password </h2><span id="pass" class="input-pass"><?php echo $_POST['password']?></span></div>
    
    
    <form action="/kansho/JINTAMA/src/php/G-1/G1-4.php" method="post">
        <input type="hidden" name="name" <?php echo 'value="'.$_POST['user_name'].'"'?>>
        <input type="hidden" name="pass" <?php echo 'value="'.$_POST['password'].'"'?>>
        <div class="op_btn "><input type="submit" value="ok"></div>
    </form>
</div>  
</div>
</div>

</body>
</html>