<?php session_start();
require '../db.php';
$error_id = 0;
$userid = $_SESSION['User']['user_id'];
$username = $_SESSION['User']['user_name'];
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['room_id'])) {
    $room_id = $_POST['room_id'];

    // 選択された部屋の情報を取得
    $stm = $db->prepare("SELECT * FROM Room WHERE room_id = :room_id");
    $stm->bindParam(':room_id', $room_id, PDO::PARAM_INT);
    $stm->execute();
    $room = $stm->fetch(PDO::FETCH_ASSOC);

    if ($room) {
        $roomname = $room['room_name'];
        if (in_array($userid, [$room['room_user1'], $room['room_user2'], $room['room_user3'], $room['room_user4']])) {
            $duplicate_error = "この部屋には既にあなたが参加しています。";
            $error_id = 4;
            header('Location: G2-5-error.php?error_id='.$error_id.'&room_id='.$room['room_id']);
            exit;
        } else {
            // 選ばれた部屋にユーザーを割り当てる処理
            if (is_null($room['room_user1'])) {
                $update_stm = $db->prepare("UPDATE Room SET room_user1 = :userid WHERE room_id = :room_id");
            } elseif (is_null($room['room_user2'])) {
                $update_stm = $db->prepare("UPDATE Room SET room_user2 = :userid WHERE room_id = :room_id");
            } elseif (is_null($room['room_user3'])) {
                $update_stm = $db->prepare("UPDATE Room SET room_user3 = :userid WHERE room_id = :room_id");
            } elseif (is_null($room['room_user4'])) {
                $update_stm = $db->prepare("UPDATE Room SET room_user4 = :userid WHERE room_id = :room_id");
            } else {
                // 全員埋まっている場合
                $room_full_error = "この部屋は満員です。";
                $error_id = 1;
                header('Location: G2-5-error.php?error_id=' . $error_id.'&room_id='.$room['room_id']);
                exit;
            }

            if (isset($update_stm)) {
                $update_stm->bindParam(':userid', $userid, PDO::PARAM_INT);
                $update_stm->bindParam(':room_id', $room_id, PDO::PARAM_INT);
                $update_stm->execute();

                $_SESSION['User']['room_id']=$room_id;
                // 部屋に入った後、リダイレクトする
                header('Location: G2-5.php?room_id='. $room_id);
                exit;
            }
        }
        
    } else {
        // 部屋が見つからない場合のエラー処理
        $room_error = "指定された部屋が見つかりません。";
        $error_id = 2;
            header('Location: G2-5-error.php?error_id=' . $error_id.'&room_id='.$room['room_id']);
            exit;
    }
}






// ランダム入室処理：POSTリクエストで「random_enter」が送られたときのみ実行する
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['random_enter'])) {
    // まず空いている部屋をランダムで選ぶ
    $stm = $db->prepare("
        SELECT * FROM Room
        WHERE room_user1 IS NULL 
        OR room_user2 IS NULL 
        OR room_user3 IS NULL 
        OR room_user4 IS NULL
        ORDER BY RAND() LIMIT 1
    ");
    $stm->execute();
    $room = $stm->fetch(PDO::FETCH_ASSOC);

    if ($room) {
        if (in_array($userid, [$room['room_user1'], $room['room_user2'], $room['room_user3'], $room['room_user4']])) {
            $duplicate_error = "この部屋には既にあなたが参加しています。";
            $error_id = 4;
            header('Location: G2-5-error.php?error_id='.$error_id.'&room_id='.$room['room_id']);
            exit;
        } else {
        // 選ばれた部屋にユーザーを割り当てる処理
        if (is_null($room['room_user1'])) {
            $update_stm = $db->prepare("UPDATE Room SET room_user1 = :userid WHERE room_id = :room_id");
        } elseif (is_null($room['room_user2'])) {
            $update_stm = $db->prepare("UPDATE Room SET room_user2 = :userid WHERE room_id = :room_id");
        } elseif (is_null($room['room_user3'])) {
            $update_stm = $db->prepare("UPDATE Room SET room_user3 = :userid WHERE room_id = :room_id");
        } elseif (is_null($room['room_user4'])) {
            $update_stm = $db->prepare("UPDATE Room SET room_user4 = :userid WHERE room_id = :room_id");
        }

        $update_stm->bindParam(':userid', $userid, PDO::PARAM_INT);
        $update_stm->bindParam(':room_id', $room['room_id'], PDO::PARAM_INT);
        $update_stm->execute();

        // 部屋に入った後、リダイレクトする
        header('Location: G2-5.php?room_id='.$room['room_id']);
        exit;
    }
    } else {
        // 空いている部屋がない場合
        $no_room_error = "空いている部屋がありません。";
        $error_id = 3;
            header('Location: G2-5-error.php?error_id=' . $error_id);
            exit;
    }

}
?>