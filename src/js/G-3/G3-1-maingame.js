//ゲームに関する設定
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
};
//ゲームオブジェクトの生成
var game = new Phaser.Game(config);

class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }
    
    preload() {
        this.load.image('title', '/img/phaser/phaser-logo.png');
    }
    
    create() {
        this.add.image(400, 300, 'sky');
    }
    
    update() {
        // ゲームロジックの更新
    }
}