//ゲームに関する設定
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//ゲームオブジェクトの生成
var game = new Phaser.Game(config);

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }
    
    preload() {
        this.load.image('title', 'assets/phaser-logo.png');
    }
    
    create() {
        this.add.image(0, 0, 'title');
    }
    
    update() {
        // ゲームロジックの更新
    }
}