<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-1/G1-1.css" />
    <link rel="stylesheet"  href="/kansho/JINTAMA/src/css/base/dot_font.css" /> 
    <title>タイトル画面</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@v3.85.2/dist/phaser.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@barba/core"></script>
</head>
<body>
<main data-barba="container" data-barba-namespace="home">

    <div class="title">
        <img src="/kansho/JINTAMA/img/JINTAMA.png" alt="タイトル画像" id="title">
    </div>
    <div class="kuro" id="show-later">
        <a href="G1-5-log-input.php"><h1>ログインへ</h1></a>
    </div>

</main>

<script>
    // グローバルに音楽オブジェクトを定義
    let music;

    // 音楽を再生または再生済みか確認
    function playMusic() {
        if (!music) {
            music = new Howl({
                src: ['/kansho/JINTAMA/sounds/sound.mp3'],
                autoplay: true,
                loop: true,
                volume: 0.5
            });
        }
        if (!music.playing()) {
            music.play();
        }
    }

    // ページ読み込み時の処理
    window.onload = function() {
        playMusic(); // 音楽を再生
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
            showLater.classList.add("visible");
        }, 3000);
    };

    // barba.js 初期化
    barba.init({
        transitions: [{
            leave(data) {
                return gsap.to(data.current.container, {
                    x: "100%",
                    duration: 0.5
                });
            },
            enter(data) {
                gsap.from(data.next.container, {
                    x: "-100%",
                    duration: 0.5
                });
                playMusic(); // ページ移動後も音楽を再生
            }
        }]
    });
</script>

</body>
</html>
