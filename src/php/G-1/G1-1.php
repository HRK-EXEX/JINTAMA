<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/kansho/JINTAMA/src/css/G-1/G1-1.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
    <title>タイトル画面</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@v3.85.2/dist/phaser.min.js">
    const music = new Howl({
        src: '/kansho/JINTAMA/sounds/sound.mp3',
        autoplay: true,
        volume: 0.5,
        loop: true,
        });
        music.play();
    </script>
    <!-- <audio id="bgm" src="/kansho/JINTAMA/sounds/sound.mp3" preload="auto" loop></audio>
    <audio id="hoverSound" src="/kansho/JINTAMA/sounds/sound.mp3" preload="auto"></audio> -->
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

           
        };
        
        barba.init({
        transitions: [{
            leave(data) {
            return gsap.to(data.current.container, {
                x:"100%"
            });
            },
            enter(data) {
            gsap.from(data.next.container, {
                x: "-100%"
            });
            }
        }]
        });

        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"
    integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@barba/core"></script>
  <script src="./assets/base.js"></script>

      
    
</body>
</html>
