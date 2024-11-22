import { playerData } from './main.js';

let phpSessionJson;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resultForm");
    phpSessionJson = playerData;
    const sendButton = document.getElementById("send");

    if (!form || !sendButton) {
        console.error("フォームまたは送信ボタンが見つかりません");
        return;
    }

    console.log(form);
    console.log(phpSessionJson);

    // 送信ボタンにイベントリスナーを追加
    sendButton.addEventListener("click", (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        const formData = new FormData(form); // FormDataを生成
        var json = new Array(); // 空のデータをJSON変換。実質初期化。

        // JSON形式に変換
        formData.entries().forEach((data, index) => {
            console.log(data);
            if (data[1] != "null") {
                json.push(JSON.parse(data[1]));
            }
        });
        
        var text = JSON.stringify(json);
        console.log("実データ:", json); // デバッグ用のログ
        console.log("送信データ:", text); // デバッグ用のログ

        // フォームのデータを送信
        sendForm(text);
    });
});

// 循環構造用
const getCircularReplacer = () => {
	const seen = new WeakSet()
	return (key, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return
			}
			seen.add(value)
		}
		return value
	}
}

// フォームデータの変更を処理する関数
export function changeForm(players) {
    players.forEach((p, i) => {
        var json = phpSessionJson["User" + (i + 1)];
        var properies = ["score", "hp", "charm", "sense"];

        // console.log(p);
        // console.log(json);
        properies.forEach(v => json[v] = p.stats[v]);
        // json.score = p.stats.score;
        // json.hp = p.stats.hp;
        // json.charm = p.stats.charm;
        // json.sense = p.stats.sense;

        phpSessionJson["User" + (i + 1)] = json[i];
    });

    console.log("変更後のプレイヤーデータ:", phpSessionJson);
}

// フォームデータをサーバーに送信する関数
export function sendForm(text) {
    fetch('./G3-2.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'normal', // JSON形式で送信
        },
        body: text,
    })
    .then((response) => {
        if (!response.ok) {
            return response.text().then((text) => {
                throw new Error(`サーバーエラー: ${text}`);
            });
        }
        return response.json();
    })
    .then((responseData) => {
        console.log('送信成功:', responseData);
    })
    // .catch((error) => {
    //     console.error('送信エラー:', error);
    // });
}
