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
var cursor;
var key;
var debugInfo;
var currentPlayer;

// 関数名定義
var input;
var loopMap;
var mapX = 0, mapY = 0, scale = 3, spd = 10;

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
        this.load.image('loopTile', '/map/loops/forestLoop.png')
        
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

        // 関連するタイルセットの名前を定義
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
        mapX = -8 * 23.4 * scale;
        mapY = -8 * 69 * scale;
        
        // 画面中央のX座標
        const worldX = this.game.config.width;
        // 画面中央のY座標
        const worldY = this.game.config.height;
        
        // 背景リピート
        loopMap = this.add.tileSprite(4 * scale, 4 * scale, worldX, worldY, "loopTile");
        loopMap.setScale(scale, scale);

        // レイヤーを追加
        for(let i=0; i<layerNames.length; i++) {
            let tmpLayer = map.createLayer(i, relatedTileSet[i], mapX, mapY)
            tmpLayer.setScale(scale, scale)
            fieldMap.add(tmpLayer)
        }

        // 入力のハンドリング
        cursor = this.input.keyboard.createCursorKeys()
        key = this.input.keyboard.addKeys(
            {
                'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
                'ENTER': Phaser.Input.Keyboard.KeyCodes.ENTER,
                'BACKSPACE': Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
                'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
            }
        );

        input = function input() {
            // ボタン操作
            var button = (cursor.left.isDown    ? 1<<0 : 0) + 
                         (cursor.right.isDown   ? 1<<1 : 0) + 
                         (cursor.up.isDown      ? 1<<2 : 0) + 
                         (cursor.down.isDown    ? 1<<3 : 0) +
                         (cursor.shift.isDown   ? 1<<4 : 0) +
                         (key.SPACE.isDown      ? 1<<5 : 0) +
                         (key.ENTER.isDown      ? 1<<6 : 0) +
                         (key.BACKSPACE.isDown  ? 1<<7 : 0) +
                         (key.ESC.isDown        ? 1<<8 : 0);
            return Number(button);
        }

        debugInfo = this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' })
    }

    moveMapGroup(x, y) {
        mapX += x; mapY += y
        fieldMap.setXY(mapX, mapY)
        loopMap.setTilePosition(-mapX / scale - 4 * scale, -mapY / scale - 8 * scale)
    }

    update() {
        // ボタン操作
        // var button = (cursors.left.isDown ? 1 : 0) + 
        //              (cursors.right.isDown ? 2 : 0) + 
        //              (cursors.up.isDown ? 4 : 0) + 
        //              (cursors.down.isDown ? 8 : 0);
        var button = input();
        var sprint = cursor.shift.isDown ? 4 : 1;
        if ((button & 1<<0)>0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1<<1)>0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1<<2)>0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1<<3)>0) this.moveMapGroup(0, -spd * sprint);

        debugInfo.setText(button)
        // console.log(button);
    }
}

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

//ゲームに関する設定
const CONFIG = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scene: MainScene,
    antialias: false
}

//ゲームオブジェクトの生成
const GAME = new Phaser.Game(CONFIG)
