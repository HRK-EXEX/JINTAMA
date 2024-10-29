<?php
session_start();
require '../db.php';


$current_username = $_SESSION['user_name'] ?? '';

error_log("現在のユーザー名: " . $current_username);


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $new_username = $_POST['new_user_name'] ?? '';
        error_log("新しいユーザー名: " . $new_username);

    
        if (!empty($new_username) && !empty($current_username)) {
            try {
                $sql = "UPDATE User SET user_name = :new_username WHERE user_name = :current_username";
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':new_username', $new_username, PDO::PARAM_STR);
                $stmt->bindParam(':current_username', $current_username, PDO::PARAM_STR);
                $stmt->execute();
                
                $_SESSION['user_name'] = $new_username;
                header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
                exit; // exitを追加して、スクリプトの実行を終了
            } catch (Exception $e) {
                // エラーメッセージをセッションに保存して次のページで表示する
                $_SESSION['error_message'] = "エラー: " . $e->getMessage();
                header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
                exit; // exitを追加
            }
        } else {
            // 新しいユーザー名が入力されていない場合
            $_SESSION['error_message'] = "新しいユーザー名を入力してください。";
            header("Location: /kansho/JINTAMA/src/php/G-2/G2-7.php");
            exit; // exitを追加
        }
    }
?>