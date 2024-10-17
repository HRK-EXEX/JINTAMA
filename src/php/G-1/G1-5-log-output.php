<?php
session_start(); // セッションを開始

unset($_SESSION['User']); // 既存のセッションデータを解除
session_regenerate_id(true); // セッションIDを再生成してセキュリティ強化

require '../db.php'; // 正しい相対パスを指定

try {
    // ユーザーアカウント情報を取得するためのSQL文を準備して実行
    $sql = $pdo->prepare('SELECT * FROM User WHERE user_id = ?');
    $sql->execute([$_POST['user_id']]);

    // 結果をループで処理
    foreach ($sql as $row) {
        // パスワードを検証
        if (password_verify($_POST['password'], $row['password'])) {
            // セッションにユーザー情報を設定（パスワードは除外）
            $_SESSION['User'] = [
                'user_id' => $row['user_id'],
                'user_name' => $row['user_name'],
            ];
        }
    }

    // ユーザー情報がセッションに設定されているか確認
    if (isset($_SESSION['User'])) {
        // ユーザー権限に応じてリダイレクト
        if ($_SESSION['User']['user_name'] == 'kanri' && $_POST['password'] == '1234') {
            header('Location:/kansho/JINTAMA/src/php/G-1/G1-5-log-output.php');
            echo '最強！';
        } else {
            header('Location: /src/html/G-2/G2-1_mainmenu.html');
        }
        exit();
    } else {
        // ログインページにエラーメッセージ付きでリダイレクト
        header('Location: login-input.php?hogeA=※ログイン名またはパスワードが違います');
        exit();
    }
} catch (PDOException $e) {
    // データベースエラー時の処理
    echo "Database error: " . $e->getMessage();
}
?>
