import {
    updateFieldMap, updateLoopMap
} from './initialize.js';

// マップ設定の定数と変数
let firstX = 16.5;
let firstY = 30;
const tileSize = 16;
const scale = 3;
const spd = 10;
let tileOffsetX = 0;
let tileOffsetY = 0;

export class GameBoard {
    constructor(scene, mapID) {
        this.scene = scene;
        this.fieldMap = null;
        this.loopMap = null;
        this.map = null;
        this.mapID = mapID;

        switch (mapID) {
            case 0:
                firstX = 0;
                firstY = 0;
                break;
            case 1:
                firstX = 16.5;
                firstY = 30;
                break;
            case 2:
                firstX = 0;
                firstY = 0;
                break;
        }
        
        this.mapX = -firstX * tileSize * scale;
        this.mapY = -firstY * tileSize * scale;
    }

    preloadAssets() {
        switch (this.mapID) {
            case 0:
                // マップ素材の画像をロード
                this.scene.load.image('base', '/map/mapchip2/MapChip/base.png');
                this.scene.load.image('hana', '/map/mapchip2/MapChip/hana.png');
                this.scene.load.image('koori2', '/map/mapchip2/MapChip/koori2.png');
                this.scene.load.image('kusa-tuti2', '/map/mapchip2/MapChip/kusa1-kusa2.png');
                this.scene.load.image('road', '/map/mapchip2/MapChip/tuti3.png');
                this.scene.load.image('tuti2', '/map/mapchip2/MapChip/tuti2.png');
                this.scene.load.image('tuti3', '/map/mapchip2/MapChip/tuti3.png');
                this.scene.load.image('water1', '/map/mapchip2/MapChip/mizu1_doukutu5.png');
                this.scene.load.image('water2', '/map/mapchip2/MapChip/mizu1_doukutu5.png');
                this.scene.load.image('waterfall', '/map/mapchip2/MapChip/tuti2.png');
                
                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/first-map.json');
                
                // レイヤー名を入力
                this.layerNames = [
                    'ground',
                    'road',
                    'houseWall',
                    'snow',
                    'houseDecoration',
                    'showCliffDark',
                    'showCliff',
                    'ice',
                    'icePoddle',
                    'fieldPlants',
                    'cliff',
                    'cliffLedge',
                    'newContinent',
                    'newContinentRoad',
                    'newContinentRoad2',
                    'bridge',
                    'water3',
                    'theOneYouPutOnTheWater'
                ];
                
                // タイルマップ名を入力
                this.tilemapNames = [
                    'base',
                    'hana',
                    'koori2',
                    'kusa-tuti2',
                    'road',
                    'tuti2',
                    'tuti3',
                    'water1',
                    'water2',
                    'waterfall',
                ];
                break;

            case 1:
                // マップ素材の画像をロード
                this.scene.load.image('baseTileImage', '/map/mapchip2/MapChip/base.png');
                this.scene.load.image('dirtTileImage', '/map/mapchip2/MapChip/tuti1.png');
                this.scene.load.image('dirtTileImage2', '/map/mapchip2/MapChip/tuti2.png');
                this.scene.load.image('loopTile', '/map/loops/forestLoop+16Y.png');

                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/second-map.json');

                // レイヤー名を入力
                this.layerNames = [
                    'ground',
                    'background',
                    'route',
                    'jump',
                    'grid',
                    'foreground',
                ];
                
                // タイルマップ名を入力
                this.tilemapNames = [
                    'baseTile',
                    'dirtTile1',
                    'dirtTile2',
                ];

                break;

            case 2:
                
                break;
        }
        
    }

    createMap() {
        // マップを追加
        this.map = this.scene.make.tilemap({ key: 'map' });

        let tiles = [];

        // It's for 2nd map
        let baseTileSet;
        let tutiTileSet1;
        let tutiTileSet2;

        let relatedTileSet;

        switch (this.mapID) {
            case 0:
            case 2:
                for (let i=0; i<this.tilemapNames.length; i++) {
                    // console.log(i);
                    tiles.push(this.map.addTilesetImage(this.tilemapNames[i], this.tilemapNames[i]));
                }

                relatedTileSet = tiles;
                break;

            case 1:
                baseTileSet = this.map.addTilesetImage(this.tilemapNames[0], 'baseTileImage');
                tutiTileSet1 = this.map.addTilesetImage(this.tilemapNames[1], 'dirtTileImage');
                tutiTileSet2 = this.map.addTilesetImage(this.tilemapNames[2], 'dirtTileImage2');

                relatedTileSet = [
                    baseTileSet,
                    tutiTileSet1,
                    tutiTileSet2,
                ];
                break;
        }

        // fieldMapの作成
        this.fieldMap = this.scene.add.group();
        updateFieldMap(this.fieldMap);
        
        // 背景リピートの作成
        if (this.mapID === 1) {
            this.loopMap = this.scene.add.tileSprite(
                0, 0, 
                this.scene.game.config.width / 2, 
                this.scene.game.config.height / 2, 
                "loopTile"
            );
            updateLoopMap(this.loopMap);

            this.loopMap.setScale(scale, scale);
            this.loopMap.setOrigin(0, 0);
            this.loopMap.alpha = 1; // it's for debug
        }
        if (this.loopMap === null) console.log("there is no looping map");

        // レイヤーを追加
        for(let i = 0; i < this.layerNames.length; i++) {
            let tmpLayer = this.map.createLayer(i, relatedTileSet, 0, 0);
            tmpLayer.setScale(scale, scale);
            this.fieldMap.add(tmpLayer);
        }

        this.fieldMap.setAlpha(1);
        
        this.moveMapGroup(0, 0);
    }

    moveMapGroup(x, y) {
        this.mapX += x;
        this.mapY += y;
        this.fieldMap.setXY(this.mapX, this.mapY);
        if (this.loopMap !== null) {
            this.loopMap.setTilePosition(-(this.mapX + tileOffsetX) / scale, -(this.mapY + tileOffsetY) / scale);
        }
    }

    update(button) {
        const sprint = ((button & 1<<4) > 0) ? 4 : 1;
        
        if ((button & 1<<0) > 0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1<<1) > 0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1<<2) > 0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1<<3) > 0) this.moveMapGroup(0, -spd * sprint);
    }
}