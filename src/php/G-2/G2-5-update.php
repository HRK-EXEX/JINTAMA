<?php
session_start();
ob_start();
$_SESSION['User']['room_id']=null;
require '../db.php';

if (!isset($_GET['room_id'])) {
    // room_idがセットされていない場合、エラーメッセージを表示して終了
    echo "エラー: room_idが指定されていません。";
    exit;
}

$userid = $_SESSION['User']['user_id'];  // ユーザーIDをセッションから取得
$room_id = $_GET['room_id'];             // GETパラメータからroom_idを取得



try {
    // トランザクション開始
    $db->beginTransaction();

    // 各カラムごとにNULLにするクエリを実行
    $queries = [
        "UPDATE Room SET room_user1 = NULL WHERE room_user1 = :userid AND room_id = :room_id",
        "UPDATE Room SET room_user2 = NULL WHERE room_user2 = :userid AND room_id = :room_id",
        "UPDATE Room SET room_user3 = NULL WHERE room_user3 = :userid AND room_id = :room_id",
        "UPDATE Room SET room_user4 = NULL WHERE room_user4 = :userid AND room_id = :room_id"
    ];

    foreach ($queries as $query) {
        $stmt = $db->prepare($query);
        $stmt->execute([':userid' => $userid, ':room_id' => $room_id]);
    }

    // コミットして変更を確定
    $db->commit();
    header("Location: /kansho/JINTAMA/src/php/G-2/G2-2-input.php");
    exit;
} catch (Exception $e) {
    // エラー発生時はロールバック
    $db->rollBack();
    echo "エラー: " . $e->getMessage();
}
ob_end_flush();
?>
