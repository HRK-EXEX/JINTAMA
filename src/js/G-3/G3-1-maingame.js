
let fieldMap;

const layerNames = [
    'ground',
    'background',
    'route',
    'jump',
    'grid',
    'foreground',
]

const tilemapNames = [
    'baseTile',
    'dirtTile1',
    'dirtTile2',
]

// 変数名定義
var カーソル;
var キー;

// 関数名定義
var input;

var mapX = 0, mapY = 0, scale = 4, spd = 10;

var toRadian = (degrees) => {
    return degrees * Math.PI / 180;
}

class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    preload() {
        // /*
        //     ╔════════════════════════╗
        //     ║ ２つ目のマップをロード ║
        //     ╚════════════════════════╝
        // */

        this.load.image('baseTileImage', '/map/mapchip2/MapChip/base.png')
        this.load.image('dirtTileImage', '/map/mapchip2/MapChip/tuti1.png')
        this.load.image('dirtTileImage2', '/map/mapchip2/MapChip/tuti2.png')
        
        this.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/second-map.json')
    }

    create() {
        // マップを追加
        const map = this.make.tilemap({ key: 'map' })

        // キーは、Tiled JSONをロードしたときにpreload()関数で与えられた名前と一致する必要がある。
        // また、タイルセット画像をPhaserマップオブジェクトに追加する必要がある。
        const baseTileSet = map.addTilesetImage(tilemapNames[0], 'baseTileImage')
        const dirtTileSet1 = map.addTilesetImage(tilemapNames[1], 'dirtTileImage')
        const dirtTileSet2 = map.addTilesetImage(tilemapNames[2], 'dirtTileImage2')
        // addTilesetImageの第一引数は、Tiledで使ったタイルセットの名前。
        // 第二引数は、preload()関数で読み込んだ画像のキーである。

        const relatedTileSet = [
            baseTileSet,
            baseTileSet,
            dirtTileSet1,
            dirtTileSet2,
            baseTileSet,
            baseTileSet,
        ]

        fieldMap = this.add.group()

        // 位置の初期化
        scale = 4;
        mapX = -8 * 30 * scale;
        mapY = -8 * 72 * scale;

        // レイヤーを追加
        for(let i=0; i<layerNames.length; i++) {
            let tmpLayer = map.createLayer(i, relatedTileSet[i], mapX, mapY)
            tmpLayer.setScale(scale, scale)
            fieldMap.add(tmpLayer)
        }

        // 入力のハンドリング
        カーソル = this.input.keyboard.createCursorKeys()
        キー = this.input.keyboard.addKeys(
            {
                'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
                'ENTER': Phaser.Input.Keyboard.KeyCodes.ENTER,
                'BACKSPACE': Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
                'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
            }
        );

        input = function input() {
            // ボタン操作
            var button = (カーソル.left.isDown ? 1 : 0) + 
                        (カーソル.right.isDown ? 2 : 0) + 
                        (カーソル.up.isDown ? 4 : 0) + 
                        (カーソル.down.isDown ? 8 : 0) +
                        (キー.SPACE.isDown ? 16 : 0) +
                        (キー.ENTER.isDown ? 32 : 0) +
                        (キー.BACKSPACE.isDown ? 64 : 0) +
                        (キー.ESC.isDown ? 128 : 0);
            return button;
        }

        // 背景リピート
    }

    moveMapGroup(x, y) {
        var sprint = カーソル.shift.isDown ? 4 : 1
        mapX += x * sprint
        mapY += y * sprint
        fieldMap.setXY(mapX, mapY)
    }

    update() {
        
        // ボタン操作
        // var button = (cursors.left.isDown ? 1 : 0) + 
        //              (cursors.right.isDown ? 2 : 0) + 
        //              (cursors.up.isDown ? 4 : 0) + 
        //              (cursors.down.isDown ? 8 : 0);
        var button = input();
        if ((button & 1<<0)>0) this.moveMapGroup(spd, 0);
        if ((button & 1<<1)>0) this.moveMapGroup(-spd, 0);
        if ((button & 1<<2)>0) this.moveMapGroup(0, spd);
        if ((button & 1<<3)>0) this.moveMapGroup(0, -spd);

        // console.log(button);
    }
}

//ゲームに関する設定
const CONFIG = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: MainScene,
    antialias: false
}

//ゲームオブジェクトの生成
const GAME = new Phaser.Game(CONFIG)
