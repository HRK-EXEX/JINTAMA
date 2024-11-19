export function changeForm(players) {
    console.log(players[0]);
    var playerJson = [];

    for(let p in players) {
        var text = JSON.stringify(p);
        var json = JSON.parse(text);
        console.log(json);
        // json.data = JSON.parse(JSON.stringify(p.stats)); // データを文字列に変換してからJSONに変換
        playerJson.push(json);
    }

    // console.log(playerJson[0]);

    /*
    document.getElementById("user1").value = 
    document.getElementById("user2").value = JSON.stringify(players[1]);
    document.getElementById("user3").value = JSON.stringify(players[2]);
    document.getElementById("user4").value = JSON.stringify(players[3]);
    */

    const form = document.getElementById('resultForm');

    // フォーム要素が取得できているか確認
    if (!form || !(form instanceof HTMLFormElement)) {
        throw new Error('フォーム要素が見つかりません');
    }

    // FormDataを使用してデータを収集
    const formData = form;

    // Fetch APIを使用して送信
    fetch('./G3-2.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('送信成功:', data);
    })
    .catch(error => {
        console.error('エラー:', error);
    });
}