// FormDataを使用してデータを収集
var form = document.getElementById('resultForm');
var formData = new FormData(form);
var data = Object.fromEntries(formData.entries()); // JSON形式に変換

export function changeForm(players) {
    // console.log(players[0]);
    var playerJson = [];

    for(let pl in players) {
        var p = players[pl];
        if (p != null) {
            var text = JSON.stringify(p);
            var json = JSON.parse(text);
            console.log(p);
            console.log(text);
            json.stats = p.stats;
            console.log(json);
            // json.data = JSON.parse(JSON.stringify(p.stats)); // データを文字列に変換してからJSONに変換
            playerJson.push(json);
        }
    }

    document.getElementById("user1").value = 
    document.getElementById("user2").value = JSON.stringify(players[1]);
    document.getElementById("user3").value = JSON.stringify(players[2]);
    document.getElementById("user4").value = JSON.stringify(players[3]);

    form = document.getElementById('resultForm');

    // フォーム要素が取得できているか確認
    if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('フォーム要素が見つかりません');
    }

    // FormDataを使用してデータを収集
    formData = new FormData(form);
    data = Object.fromEntries(formData.entries()); // JSON形式に変換
}

export function sendForm() {
    // Fetch APIを使用して送信
    fetch('./G3-2.php', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            // エラーレスポンスをテキストとして読み取る
            return response.text().then(text => {
            throw new Error(`サーバーエラー: ${text}`);
            });
        }
        return response.json();
        
    })
    .then(data => {
        console.log('送信成功:', data);
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}