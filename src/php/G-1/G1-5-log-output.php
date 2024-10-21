<?php
session_start(); // セッションを開始

unset($_SESSION['User']); // 既存のセッションデータを解除
session_regenerate_id(true); // セッションIDを再生成してセキュリティ強化

require '../db.php'; // データベース接続

try {
    // POSTデータが存在するか確認
    if (!empty($_POST['user_name']) && !empty($_POST['password'])) {
        // SQL文をプリペアドステートメントで準備
        $sql = $db->prepare('SELECT * FROM User WHERE user_name = ?');
        $sql->execute([$_POST['user_name']]);
        
        // ユーザー情報が見つかる場合の処理
        if ($row = $sql->fetch()) {
            // パスワードの検証
            if (password_verify($_POST['password'], $row['password'])) {
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
        header('Location: /kansho/JINTAMA/src/php/G-1/G1-5-log-input.php?hogeA=※ログイン名またはパスワードが違います');
        exit();
    }
} catch (PDOException $e) {
    // データベースエラーの処理
    echo "Database error: " . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
}
