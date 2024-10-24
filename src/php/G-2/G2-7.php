<?php require '../db.php';?>
<?php
session_start(); 


try {

    $current_username = $_SESSION['user_name'];

    
    $new_username = $_POST['new_username'];

    $sql = "UPDATE User SET user_name = :new_username WHERE user_name = :current_username";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':new_username', $new_username, PDO::PARAM_STR);
    $stmt->bindParam(':current_username', $current_username, PDO::PARAM_STR);

    
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $_SESSION['user_name'] = $new_username;
        echo "ユーザー名が更新されました。";
    } else {
        echo "更新に失敗しました。";
    }
} catch (PDOException $e) {
    echo "エラー: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/base/black_window.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/G-2/G2-7.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>設定画面</title>
</head>
<body>

    <div class="kuro">
        <a href="/src/html/G-2/G2-8.html"><p class="delete">アカウント削除</p></a>
        <form action="G2-8">
            <div class="username">
                ユーザー名 <input type="text"><br>
            </div>
            <div class="ranking">
                ランキングへの情報送信<br>
            <input type="radio" name="hozon" id="suru" class="radi" /><label for="suru">する？</label>
           <input type="radio" name="hozon" id="sinai" class="radi" /><label for="sinai">しない？</label>
        </div>
        </form>
        
    <form action="#">
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