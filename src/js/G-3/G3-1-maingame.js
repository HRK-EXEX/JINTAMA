let title;
let info;

var toRadian = function(degrees) {
    return degrees * Math.PI / 180;
};

class MainScene extends Phaser.Scene {
    preload() {
        this.load.image('title', '/assets/phaser-logo.png');
    }

    create() {
        let {width, height} = this.sys.game.canvas;
        console.log(width, height);
        title = this.add.image(
            width / 2,
            height / 2,
            'title'
        );
        title.setScale(0.5);

        info = this.add.text(0, 0, 'hello',
            {
                font: '64px',
                fill: '#fff',
            }
        );
        info.setFontFamily('dot-regular')
    }

    update(time, delta) {
        let realTime = time / 1000;
        // ゲームロジックの更新
        title.rotation = toRadian(realTime * 30);
        info.setText(realTime.toFixed(3));
    }
}

//ゲームに関する設定
const CONFIG = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: MainScene
};

//ゲームオブジェクトの生成
const GAME = new Phaser.Game(CONFIG);