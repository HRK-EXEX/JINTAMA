<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-1/G1-1.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>タイトル画面</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@v3.85.2/dist/phaser.min.js"></script>
    <audio id="bgm" src="/kansho/JINTAMA/sounds/sound.mp3" preload="auto" loop></audio>
    <audio id="hoverSound" src="/kansho/JINTAMA/sounds/sound.mp3" preload="auto"></audio>
</head>
<body>
    <div class="title">
        <img src="/kansho/JINTAMA/img/JINTAMA.png" alt="タイトル画像" id="title">
    </div>
    <div class="kuro" id="show-later">
        <a href="G1-5-log-input.php"><h1>ログインへ</h1></a>
    </div>

    <script>
        const bgm = document.getElementById('bgm');
        const hoverSound = document.getElementById('hoverSound');
        const loginButton = document.querySelector('.kuro a'); // ログインボタンを取得

        // ページ読み込み時の処理
        window.onload = function() {
            const image = document.getElementById('title');
            image.animate(
                [
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(28vw)' }
                ],
                {
                    fill: 'forwards',
                    duration: 3000
                }
            );

            const showLater = document.getElementById("show-later");
            setTimeout(() => {
                showLater.classList.add("visible"); // 3秒後に一気に表示
            }, 3000); // 3秒後にクラス追加

            // BGMの状態を確認
            const isPlaying = localStorage.getItem('bgmPlaying') === 'true';
            if (isPlaying) {
                bgm.play(); // BGMを再生
                loginButton.style.display = 'none'; // ボタンを隠す（必要に応じて）
            }
        };

        // ログインボタンがクリックされたときの処理
        loginButton.addEventListener('click', () => {
            bgm.play(); // BGMを再生
            localStorage.setItem('bgmPlaying', 'true'); // 状態を保存
            loginButton.style.display = 'none'; // ボタンを隠す
        });

        // マウスオーバー時に音を鳴らすイベント
        loginButton.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0; // 音声を先頭に戻す
            hoverSound.play(); // 音声を再生
        });

        // ページを離れる際の処理
        window.addEventListener('beforeunload', function() {
            bgm.pause(); // BGMを一時停止
            localStorage.setItem('bgmPlaying', 'false'); // 状態を保存
        });
    </script>
</body>
</html>
