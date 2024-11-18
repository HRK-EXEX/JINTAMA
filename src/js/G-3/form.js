import { player } from "./initialize";

export function changeForm() {
    console.log(player[0] != null);
    document.getElementById("user1").value = JSON.stringify(player[0]);
    document.getElementById("user2").value = JSON.stringify(player[1]);
    document.getElementById("user3").value = JSON.stringify(player[2]);
    document.getElementById("user4").value = JSON.stringify(player[3]);

    // FormDataを使用してデータを収集
    const formData = new FormData(document.getElementById('resultForm'));

    // Fetch APIを使用して送信
    fetch('/api/submit', {
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