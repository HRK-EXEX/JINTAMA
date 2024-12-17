import { playerData, queryParams } from './main.js';
 
export let phpSessionJson;
let formData; // ブロック外でも使いたいのでファイル内グローバル化

export function formSender() {   
    const form = document.getElementById("resultForm");
    const tmp = phpSessionJson;
    phpSessionJson = playerData;

    Object.keys(tmp).forEach(key => {
        phpSessionJson[key] = tmp[key];
    });
 
    if (!form) {
        console.error("フォームが見つかりません");
        return;
    }
 
    // console.log(form);
    // console.log(phpSessionJson);
 
    formData = new FormData(form); // FormDataを生成
    let json = new Array(); // 空のデータをJSON変換。実質初期化。
    
    // console.log(phpSessionJson);

    // JSON形式に変換
    for (let index=1; index<=phpSessionJson['User']['room_limit']; index++)
    {
        let data = phpSessionJson["User" + index];
        if (data !== null && data !== undefined) {
            // console.log(data);
            json.push(data);
        }
    }
    
    let text = JSON.stringify(json);
    // console.log("実データ:", json); // デバッグ用のログ
    // console.log("送信データ:", text); // デバッグ用のログ

    // これを使うことで、PHPの$_POSTからアクセスできる
    formData.append("userJson", text);

    // console.log(text);
    // フォームのデータを送信
    sendForm(text);
}

document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send");
    // 送信ボタンにイベントリスナーを追加
    sendButton.addEventListener("click", (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ
        if (!sendButton) {
            console.error("送信ボタンが見つかりません");
            return;
        }    
    });
});
 
export function changeForm(players) {
    // 新しいオブジェクトを作成
    const updatedSessionJson = { ...phpSessionJson };
 
    players.forEach((p, i) => {
        const userKey = "User" + (i + 1);
        updatedSessionJson[userKey] = {
            ...updatedSessionJson[userKey], 
            score: p.stats.score,
            hp: p.stats.hp,
            charm: p.stats.charm,
            sense: p.stats.sense
        };
    });
 
    // グローバル変数を更新
    phpSessionJson = updatedSessionJson;
 
    console.log("変更後のプレイヤーデータ:", phpSessionJson);
}
 
// フォームデータをサーバーに送信する関数
export function sendForm(text) {
    let mapID = parseInt(queryParams.mapId);
    postJson(mapID == 2 ? "./G3-2.php" : "./G3-1-maingame.php?mapId=" + ((mapID+1)), text);
    // fetch('./G3-2.php', {
    //     method: 'post', // 通信メソッド
	// 	// headers: {
	// 	// 	'Content-Type': 'application/json' // JSON形式のデータのヘッダー
	// 	// },
	// 	body: formData // FormDataオブジェクトを格納
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         return response.text().then((text) => {
    //             throw new Error(`サーバーエラー: ${text}`);
    //         });
    //     }
    //     return response.text();
    // })
    // .then(text => console.log(text))
    // .then(responseData => {
    //     console.log('送信成功:', responseData);
    // })
    // .catch((error) => {
    //     console.error('送信エラー:', error);
    // });
}

function postJson(path, text) {
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    const form = document.getElementById("resultForm");
    form.method = 'post';
    form.action = path;
  
    const hiddenField = document.getElementById('userJson');
    hiddenField.value = text;
  
    document.body.appendChild(form);
    console.log(path, text);
    // form.submit();
}