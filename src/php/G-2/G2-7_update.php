<?php
session_start();
require '../db.php';


$current_username = $_SESSION['user_name'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_username = $_POST['new_user_name'] ?? '';

    if (!empty($new_username) && !empty($current_username)) {
        try {

            $sql = "UPDATE User SET user_name = :new_username WHERE user_name = :current_username";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':new_username', $new_username, PDO::PARAM_STR);
            $stmt->bindParam(':current_username', $current_username, PDO::PARAM_STR);
            $stmt->execute();

        
            $_SESSION['user_name'] = $new_username;

            echo "ユーザー名が変更されました。";
        } catch (Exception $e) {
            echo "エラー: " . $e->getMessage();
        }
    } else {
        echo "新しいユーザー名を入力してください。";
    }
}
?>i