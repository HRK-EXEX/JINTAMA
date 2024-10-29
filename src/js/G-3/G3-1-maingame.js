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

const DEFAULT_HEIGHT = screen.height // any height you want
const DEFAULT_WIDTH = screen.width

var cursor;
var key;
var debugInfo;
var currentPlayer;
const firstX = 9, firstY = 8.5, tileSize = 16;
var scale = 3, spd = 10;
var mapX = firstX * tileSize * scale;
var mapY = firstY * tileSize * scale;
var tileOffsetX = 0;
var tileOffsetY = 0;

var dialog;
var player = [null,null,null,null];

// 関数名定義
var input;
var loopMap;

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
        this.load.image('loopTile', '/map/loops/forestLoop+16Y.png')
        
        this.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/second-map.json')
    }

    moveMapGroup(x, y) {
        mapX += x; mapY += y
        fieldMap.setXY(mapX, mapY)
        loopMap.setTilePosition(-(mapX + tileOffsetX) / scale, -(mapY + tileOffsetY) / scale)
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
        
        // 背景リピート
        loopMap = this.add.tileSprite(0, 0, this.game.config.width / 2, this.game.config.height / 2, "loopTile");
        loopMap.setScale(scale, scale);
        loopMap.setOrigin(0, 0);

        // レイヤーを追加
        for(let i=0; i<layerNames.length; i++) {
            let tmpLayer = map.createLayer(i, relatedTileSet[i], 0, 0)
            tmpLayer.setScale(scale, scale)
            fieldMap.add(tmpLayer)
        }

        this.moveMapGroup(0, 0);

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

        fieldMap.setAlpha(1);
        loopMap.alpha = 1;

        debugInfo = this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' })
    }

    update() {
        // ボタン操作
        // var button = (cursors.left.isDown ? 1 : 0) + 
        //              (cursors.right.isDown ? 2 : 0) + 
        //              (cursors.up.isDown ? 4 : 0) + 
        //              (cursors.down.isDown ? 8 : 0);
        var button = input();
        var sprint = ((button & 1<<4)>0) ? 4 : 1;
        if ((button & 1<<0)>0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1<<1)>0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1<<2)>0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1<<3)>0) this.moveMapGroup(0, -spd * sprint);

        debugInfo.setText(button)
        // console.log(button);
    }
}

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
