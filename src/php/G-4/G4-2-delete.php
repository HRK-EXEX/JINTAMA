<?php
ob_start();
require '../db.php';
$id = $_POST['userid'];

// トランザクションを開始
$db->beginTransaction();

try {
    // Roomテーブルから関連するデータをクリア
    $roomClear = $db->prepare("
        UPDATE Room 
        SET room_user1 = NULLIF(room_user1, :id),
            room_user2 = NULLIF(room_user2, :id),
            room_user3 = NULLIF(room_user3, :id),
            room_user4 = NULLIF(room_user4, :id)
        WHERE :id IN (room_user1, room_user2, room_user3, room_user4);
    ");
    $roomClear->execute([':id' => $id]);

    // Eggsテーブルから関連するデータを削除
    $eggsDelete = $db->prepare("DELETE FROM Eggs WHERE user_id = ?");
    $eggsDelete->execute([$id]);

    // Userテーブルからユーザーを削除
    $stm = $db->prepare("DELETE FROM `User` WHERE user_id = ?");
    $stm->execute([$id]);

    // コミット
    $db->commit();

    // リダイレクト
    header('Location:/kansho/JINTAMA/src/php/G-4/G4-2.php');
    ob_end_flush();
    exit;
} catch (Exception $e) {
    // エラーが発生した場合はロールバック
    $db->rollBack();
    echo "エラーが発生しました: " . $e->getMessage();
}
?>
