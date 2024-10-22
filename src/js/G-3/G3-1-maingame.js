let title;
let info;

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

        info = this.add.text(0, 0, 'hello', {fontSize: '64px', fill: '#fff'});
    }

    update(time, delta) {
        // ゲームロジックの更新
        title.setScale(Math.cos(time * Math.PI / 1000));
        info.setText(time);
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