import {
    updateFieldMap, updateLoopMap, player
} from './initialize.js';

// マップ設定の定数と変数
let firstX = 16.5;
let firstY = 30;
const tileSize = 16;
const scale = 3;
const spd = 10;
let tileOffsetX = 0;
let tileOffsetY = 0;
let mapWidth = 0;
let mapHeight = 0;
let scrollLimit = 0;
// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");


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
                this.scene.load.image('base', '/kansho/JINTAMA/map/mapchip2/MapChip/base.png');
                this.scene.load.image('hana', '/kansho/JINTAMA/map/mapchip2/MapChip/hana.png');
                this.scene.load.image('koori2', '/kansho/JINTAMA/map/mapchip2/MapChip/koori2.png');
                this.scene.load.image('kusa-tuti2', '/kansho/JINTAMA/map/mapchip2/MapChip/kusa1-kusa2.png');
                this.scene.load.image('road', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti3.png');
                this.scene.load.image('tuti2', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti2.png');
                this.scene.load.image('tuti3', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti3.png');
                this.scene.load.image('water1', '/kansho/JINTAMA/map/mapchip2/MapChip/mizu1_doukutu5.png');
                this.scene.load.image('water2', '/kansho/JINTAMA/map/mapchip2/MapChip/mizu1_doukutu5.png');
                this.scene.load.image('waterfall', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti2.png');
                
                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/kansho/JINTAMA/src/js/G-3/map-data/first-map.json');
                
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
                this.scene.load.image('baseTile', '/kansho/JINTAMA/map/mapchip2/MapChip/base.png');
                this.scene.load.image('dirtTile1', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti1.png');
                this.scene.load.image('dirtTile2', '/kansho/JINTAMA/map/mapchip2/MapChip/tuti2.png');
                this.scene.load.image('loopTile', '/kansho/JINTAMA/map/loops/forestLoop+16Y.png');

                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/kansho/JINTAMA/src/js/G-3/map-data/second-map.json');

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
                    'loopTile',
                ];

                break;

            case 2: 
                this.scene.load.image('ArmillarySphere', '/kansho/JINTAMA/map/mapchip2/ArmillarySphere.png');
                this.scene.load.image('base', '/kansho/JINTAMA/map/mapchip2/MapChip/base.png');
                this.scene.load.image('byobu', '/kansho/JINTAMA/map/mapchip2/byobu.png');
                this.scene.load.image('eEJjt6AYWTepUfe1730082958', '/kansho/JINTAMA/map/mapchip2/eEJjt6AYWTepUfe1730082958.png');
                this.scene.load.image('goal2', '/kansho/JINTAMA/map/mapchip2/goal2.png');
                this.scene.load.image('gpiano', '/kansho/JINTAMA/map/mapchip2/gpiano.png');
                this.scene.load.image('Le Penseur', '/kansho/JINTAMA/map/mapchip2/Le Penseur.png');
                this.scene.load.image('manekineko2', '/kansho/JINTAMA/map/mapchip2/manekineko2.png');
                this.scene.load.image('mizu1', '/kansho/JINTAMA/map/mapchip2/MapChip/mizu1.png');
                this.scene.load.image('mizu2', '/kansho/JINTAMA/map/mapchip2/MapChip/mizu2.png');
                this.scene.load.image('patcar', '/kansho/JINTAMA/map/mapchip2/patcar.png');
                this.scene.load.image('syakanyorai2', '/kansho/JINTAMA/map/mapchip2/syakanyorai2.png');
                this.scene.load.image('taki2', '/kansho/JINTAMA/map/mapchip2/MapChip/taki2.png');
                this.scene.load.image('tigermat2', '/kansho/JINTAMA/map/mapchip2/tigermat2.png');
                this.scene.load.image('tuti2', '/kansho/JINTAMA/map/mapchip2/Mapchip/tuti2.png');
                this.scene.load.image('tuti3', '/kansho/JINTAMA/map/mapchip2/Mapchip/tuti3.png');
                this.scene.load.image('yougan', '/kansho/JINTAMA/map/mapchip2/MapChip/yougan.png');
                this.scene.load.image('kumo', '/kansho/JINTAMA/map/mapchip2/kumo.png');
                this.scene.load.image('sora', '/kansho/JINTAMA/map/mapchip2/sora.jpg');
            
                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/kansho/JINTAMA/src/js/G-3/map-data/third-map.json');
                
                // レイヤー名を入力
                this.layerNames = [
                    // 'sky', 画像レイヤーは無視される
                    'gake',
                    'zimenn',
                    'whitesuna',
                    'snow',
                    'ike',
                    'ikenomono',
                    'mizu',
                    'ki',
                    'okimono',
                    'saku',
                    'miti',
                    'kumo',
                    'hashi',
                    'nizi',
                    'goal!!',
                    // 'kumo2' 画像レイヤーは無視される
                ];
                
                // タイルマップ名を入力
                this.tilemapNames = [
                    'ArmillarySphere',
                    'base',
                    'byobu',
                    'eEJjt6AYWTepUfe1730082958',
                    'goal2',
                    'gpiano',
                    'Le Penseur',
                    'manekineko2',
                    'mizu1',
                    'mizu2',
                    'patcar',
                    'syakanyorai2',
                    'taki2',
                    'tigermat2',
                    'tuti2',
                    'tuti3',
                    'yougan'
                ];
                
                break;
        }
    }

    createMap() {
        // マップを追加
        this.map = this.scene.make.tilemap({ key: 'map' });

        let tiles = [];
        let relatedTileSet;

        for (let i=0; i<this.tilemapNames.length; i++) {
            // console.log(i);
            tiles.push(this.map.addTilesetImage(this.tilemapNames[i], this.tilemapNames[i]));
        }

        relatedTileSet = tiles;

        // fieldMapの作成
        this.fieldMap = this.scene.add.group();
        updateFieldMap(this.fieldMap);
        
        // 背景リピートの作成
        if (this.mapID === 2) {
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
            mapWidth = Math.max(mapWidth, tmpLayer.width);
            mapHeight = Math.max(mapHeight, tmpLayer.height);
            
            this.fieldMap.add(tmpLayer);
        }

        this.fieldMap.setAlpha(1);

        this.addCharacterIcons();

        this.moveMapGroup(0, 0);
    }

    addCharacterIcons() {
        // キャラ画像を追加
        if (this.mapID === 2) {
        // 初期位置（マップsecond)
        const playerPositions = [
            { x: 410, y: 560 }, // プレイヤー1
            { x: 410, y: 560 }, // プレイヤー2
            { x: 410, y: 560 }, // プレイヤー3
            { x: 410, y: 560 }  // プレイヤー4
        ];
        let i = 1;
        // キャラ画像を一つずつ配置
        playerPositions.forEach((pos, index) => {
            const sprite = this.scene.add.sprite(pos.x, pos.y, 'playericon'+(i));
            i =i+1;
            sprite.setScale(2); // サイズを調整
            sprite.setOrigin(0.5); // 中心に設定
            sprite.setDepth(0); // マップより前に表示されるように設定
    
            // プレイヤー情報に保存（必要ならグローバルな`player`にも保存可能）
            if (!this.players) this.players = [];
            this.players.push(sprite);
            
        });
    }
    }

    moveMapGroup(x, y) {
        scrollLimit = 0;
        this.mapX += x;
        this.mapY += y;


        let limitX = -mapWidth * scale + this.scene.game.config.width;
        let limitY = -mapHeight * scale + this.scene.game.config.height;

        var plimity = false;
        var plimitx = false;

        if (0 < this.mapX) { plimitx=true; this.mapX = 0; scrollLimit |= 1;}
        else if (limitX > this.mapX) {plimitx=true; this.mapX = limitX; scrollLimit |= 2;}
        
        if (0 < this.mapY) {plimity=true; this.mapY = 0; scrollLimit |= 4;}
        else if (limitY > this.mapY) {plimity=true; this.mapY = limitY; scrollLimit |= 8;}

        if (this.players != undefined && this.players != null) {
            this.players.forEach(p => {
                if (p != null) {
                    if(!plimitx)p.x += x;
                    if(!plimity)p.y += y;
                }
            });
        }

        this.fieldMap.setXY(this.mapX, this.mapY);
        if (this.loopMap !== null) {
            this.loopMap.setTilePosition(-(this.mapX + tileOffsetX) / scale, -(this.mapY + tileOffsetY) / scale);
        }
    }

    update(button) {
        const sprint = ((button & 1<<4) > 0) ? 4 : 1;

        if (scrollLimit > 0) {
            
        }
        
        if ((button & 1<<0) > 0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1<<1) > 0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1<<2) > 0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1<<3) > 0) this.moveMapGroup(0, -spd * sprint);
    }
}
