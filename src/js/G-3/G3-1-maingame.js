
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

var cursors

var mapX = 0, mapY = 0, scale = 4, spd = 10;

var toRadian = (degrees) => {
    return degrees * Math.PI / 180;
}

class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    preload() {
        // // プラグインを参照
        // GAME.add.plugin(Phaser.Plugin.Tiled);

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

    // In our create() function, let's first add the background and scale it for our resolution:
    create() {
        // Let's add our map:
        const map = this.make.tilemap({ key: 'map' })

        // The key matches the name given in the preload() function when we loaded the Tiled JSON.
        // We also have to add the tileset image to our Phaser map object:
        const baseTileSet = map.addTilesetImage(tilemapNames[0], 'baseTileImage')
        const dirtTileSet1 = map.addTilesetImage(tilemapNames[1], 'dirtTileImage')
        const dirtTileSet2 = map.addTilesetImage(tilemapNames[2], 'dirtTileImage2')
        // The first argument of addTilesetImage is the name of the tileset we used in Tiled.
        // The second argument is the key of the image we loaded in the preload() function.

        // 地面レイヤー作成 DynamicTilemapLayerオブジェクト作成
        const layerWidth = 64 * 1 * 12
        const layerHeight = 64 * 1 * 12

        // レイヤーの左上X座標
        const layerOriginX = (this.game.config.width - layerWidth) / 2
        // レイヤーの左上Y座標
        const layerOriginY = (this.game.config.height - layerHeight) / 2

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
        cursors = this.input.keyboard.createCursorKeys()
    }

    moveMapGroup(x, y) {
        var sprint = cursors.shift.isDown ? 4 : 1
        mapX += x * sprint
        mapY += y * sprint
        fieldMap.setXY(mapX, mapY)
    }

    update() {
        
        var button = (cursors.left.isDown ? 1 : 0) + 
                     (cursors.right.isDown ? 2 : 0) + 
                     (cursors.up.isDown ? 4 : 0) + 
                     (cursors.down.isDown ? 8 : 0);

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
