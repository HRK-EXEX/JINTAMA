<?php
session_start(); // セッションを開始

//unset($_SESSION['User']); // 既存のセッションデータを解除

require '../db.php'; // データベース接続
// var_dump($_POST)

// try {
    // var_dump($_POST);
    // var_dump($_POST['user_name_form']);
    // var_dump($_POST['password_form']);

    $user = $_POST['user_name_form'];
    $pass = $_POST['password_form'];

    // echo $user."\n".$pass;

    // POSTデータが存在するか確認

    // echo "<hr>";
    // var_dump($_POST);
    // echo "<hr>";
    // echo "u_name / ";
    // echo $user;
    // echo "<hr>";
    // echo "u_name(empty) / ";
    // echo $user;
    // echo "<hr>";
    // echo "pass / ";
    // echo $pass;
    // echo "<hr>";
    // echo "pass(empty) / ";
    // echo empty($pass);
    // echo "<hr>";
    
    if (strlen($user) > 0 && strlen($pass) > 0) {
        // パスワードをハッシュ化して保存

        // SQL文をプリペアドステートメントで準備
        $sql = $db->prepare('SELECT * FROM User WHERE user_name = ?');
        $sql->execute([$user]);
        
        // ユーザー情報が見つかる場合の処理
        if ($row = $sql->fetch()) {
            // パスワードの検証
            if (password_verify($pass,$row['password']) || $pass == $row['password']) {
                // セッションにユーザー情報を格納（パスワードは除外）
                $_SESSION['User'] = [
                    'user_id' => $row['user_id'],
                    'user_name' => $row['user_name']
                ];

                // ハッシュ化されていない場合
                if ($pass === $row['password']) {
                    $row['password'] = password_hash($row['password'],PASSWORD_DEFAULT);

                    // SQL文をプリペアドステートメントで準備
                    $sql = $db->prepare('UPDATE User SET password = ? WHERE user_id = ?');
                    $sql->execute([$row['password'], $row['user_id']]);
                }
                
                if ($row['user_name'] === $user && $row['user_name'] != "kanri") {
                    header('Location: /kansho/JINTAMA/src/php/G-2/G2-1.php');
                    exit();
                } else if($row['user_name'] === $user && $row['user_name'] === "kanri"){
                    header('Location: /kansho/JINTAMA/src/php/G-4/G4-1.php');
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
// } catch (PDOException $e) {
//     // データベースエラーの処理
//     echo "Database error: " . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
// }
?>
