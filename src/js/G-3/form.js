document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resultForm");
    const sendButton = document.getElementById("send");

    if (!form || !sendButton) {
        console.error("フォームまたは送信ボタンが見つかりません");
        return;
    }

    console.log(form);

    // 送信ボタンにイベントリスナーを追加
    sendButton.addEventListener("click", (event) => {
        event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        const formData = new FormData(form); // FormDataを生成
        var json = new Array(); // 空のデータをJSON変換。実質初期化。

        // JSON形式に変換
        formData.entries().forEach((data, index) => {
            console.log(data);
            if (data[1] != "null") {
                json[`user${index + 1}`] = JSON.parse(data[1]);
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

var userElements = new Array();

// フォームデータの変更を処理する関数
export function changeForm(players) {
    const playerJson = [];

    players.forEach((player, index) => {
        var userElement;
        if (player) {
            var json = JSON.parse(JSON.stringify(player));
            json.stats = player.stats;
            playerJson.push(json);

            userElement = document.getElementById(`user${index + 1}`);
            if (userElement) {
                userElement.value = JSON.stringify(json, getCircularReplacer()); // 各ユーザーのデータを埋め込む
            } else console.log("userElement is undefined");
        }

        userElements.push(userElement);

        if (userElement) console.log(userElement.value);
    });

    console.log("変更後のプレイヤーデータ:", playerJson);
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
