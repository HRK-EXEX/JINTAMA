<?php
session_start(); // セッションを開始

//unset($_SESSION['User']); // 既存のセッションデータを解除

require '../db.php'; // データベース接続
// var_dump($_POST)

try {
    // POSTデータが存在するか確認

    echo "<hr>";
    var_dump($_POST);
    echo "<hr>";
    echo "u_name / ";
    echo $_POST['user_name'];
    echo "<hr>";
    echo "u_name(empty) / ";
    echo $_POST['user_name'];
    echo "<hr>";
    echo "pass / ";
    echo $_POST['password'];
    echo "<hr>";
    echo "pass(empty) / ";
    echo empty($_POST['password']);
    echo "<hr>";
    
    if (strlen($_POST['user_name']) > 0 && strlen($_POST['password']) > 0) {
        // SQL文をプリペアドステートメントで準備
        $sql = $db->prepare('SELECT * FROM User WHERE user_name = ?');
        $sql->execute([$_POST['user_name']]);
        
        // ユーザー情報が見つかる場合の処理
        if ($row = $sql->fetch()) {
            // パスワードの検証（ハッシュ化されていない場合）
            if ($_POST['password'] === $row['password']) {
                // セッションにユーザー情報を格納（パスワードは除外）
                $_SESSION['User'] = [
                    'user_id' => $row['user_id'],
                    'user_name' => $row['user_name']
                ];

                // 管理者の場合の処理
                if ($row['user_name'] === 'kanri') {
                    header('Location: /kansho/JINTAMA/src/php/G-1/G1-5-log-output.php');
                    exit();
                } else {
                    header('Location: /src/html/G-2/G2-1_mainmenu.html');
                    exit();
                }
            } else {
                // パスワードが違う場合
                header('Location: /kansho/JINTAMA/src/php/G-1/G1-5-log-input.php?hogeA=※ログイン名またはパスワードが違います');
                exit();
            }
        } else {
            // ユーザー名が見つからない場合
            header('Location: /kansho/JINTAMA/src/php/G-1/G1-5-log-input.php?hogeA=※ログイン名またはパスワードが違います');
            exit();
        }
    } else {
        // POSTデータが不足している場合の処理
        header('Location: /kansho/JINTAMA/src/php/G-1/G1-5-log-input.php?hogeA=※ログイン名またはパスワードを入力してください1');
        exit();
    }
} catch (PDOException $e) {
    // データベースエラーの処理
    echo "Database error: " . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
}
?>
