<?php
session_start();
ob_start();
require '../db.php';
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
        }

        if (isset($update_stm)) {
            $update_stm->bindParam(':userid', $userid, PDO::PARAM_INT);
            $update_stm->bindParam(':room_id', $room_id, PDO::PARAM_INT);
            $update_stm->execute();

            // 部屋に入った後、リダイレクトする
            header('Location: G2-5.php?room_id=' . $room_id);
            exit;
        }
        }
    } else {
        // 部屋が見つからない場合のエラー処理
        $room_error = "指定された部屋が見つかりません。";
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
    } else {
        // 空いている部屋がない場合
        $no_room_error = "空いている部屋がありません。";
    }
}

ob_end_flush();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/black_window.css" /> 
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-2/G2-2.css">
    <title>ルーム一覧</title>
</head>
<body>
    <div class="all">
        <div class="kuro">
            <table class="room_list dotgothic16-regular">
                <?php
                $stm = $db->prepare("SELECT * FROM Room");
                $stm->execute();

                foreach($stm as $room){
                    echo'<form action="/kansho/JINTAMA/src/php/G-2/G2-5.php" method="get">';
                    echo'<tr>';
                    echo'<input type="hidden" name="room_id" value="'.$room['room_id'].'">';

                    $room_count = 0;

                    // room_user1がNULLでない場合
                    if (is_null($room['room_user1'])) {
                        $room_count++;
                    }

                    // room_user2がNULLでない場合
                    if (is_null($room['room_user2'])) {
                        $room_count++;
                    }

                    // room_user3がNULLでない場合
                    if (is_null($room['room_user3'])) {
                        $room_count++;
                    }

                    // room_user4がNULLでない場合
                    if (is_null($room['room_user4'])) {
                        $room_count++;
                    }

                    echo '<td><button class="team_name" type="submit">'.$room['room_name'].'(あと'.$room_count.'人)</button></td>';
                    echo'</tr>';
                    echo'</form>';
                }
                ?>
            </table>
            <div class="opration">
                <button onclick="location.href='G2-1.php'">戻る</button>

                <!-- ランダム入室処理用のフォーム -->
                <form method="POST">
                    <button type="submit" name="random_enter">ランダム入室</button>
                </form>

                <button onclick="location.href='G2-4.php'">ルームを作成</button>
            </div>

            <?php
            // 空いている部屋がない場合のエラーメッセージを表示
            if (isset($no_room_error)) {
                echo "<p>$no_room_error</p>";
            }
            
            if (isset($room_full_error)) {
                echo "<p>$room_full_error</p>";
            }
            if (isset($duplicate_error)) {
                echo "<p>$duplicate_error</p>";
            }
            ?>
        </div>
    </div>
</body>
</html>
