import {
    updateFieldMap, updateLoopMap, player
} from './initialize.js';
import { relatedX, relatedY } from './mainScene.js';
 
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

export let isMoving = false;
 
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
                firstY = 15;
                break;
            case 1:
                firstX = 6;
                firstY = 31;
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
                this.scene.load.image('baseTile', '/map/mapchip2/MapChip/base.png');
                this.scene.load.image('dirtTile1', '/map/mapchip2/MapChip/tuti1.png');
                this.scene.load.image('dirtTile2', '/map/mapchip2/MapChip/tuti2.png');
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
                    'loopTile',
                ];

                this.coordinates = [
                    { x: 410, y: 560 },
                    { x: 215, y: 560 },
                    { x: 215, y: 370 ,branches: [3, 23] },
                    { x: 20, y: 370 },
                    { x: 20, y: 170 },
                    { x: -220, y: 170 ,branches:[6,12] },
                    { x: -360, y: -20 },
                    { x: -220, y: -215 },
                    { x: -360, y: -410 },
                    { x: -220, y: -600 },
                    { x: -360, y: -410 },
                    { x: -220, y: -980 },
                    { x: 410, y: -1150 },
                    { x: 1030, y: -800 },
                    { x: 410, y: -1150 ,branches:[13,15]},
                    { x: 1270, y: -800 },
                    { x: 1270, y: -615 },
                    { x: 1150, y: -300 ,branches:[18,20]},
                    { x: 1030, y: 10 },
                    { x: 1030, y: 210 },
                    { x: 1270, y: 10 },
                    { x: 1270, y: 210 },
                    { x: 790, y: 560 },
                    // { x: 400, y: 370 },
                    { x: 410, y: 170 },
                    { x: 600, y: 170 },
                    { x: 790, y: -15 },
                    { x: 410, y: -15 },
                    { x: 20, y: -15 },
                    { x: 410, y: -450 },
                    { x: 575, y: -450 },
                    { x: 740, y: -450 },
                    { x: 240, y: -450 },
                    { x: 70, y: -450 },
                    { x: 740, y: -590 },
                    { x: 575, y: -590 },
                    { x: 410, y: -590 },
                    { x: 240, y: -590 },
                    { x: 70, y: -590 },
                    { x: 740, y: -730 },
                    { x: 575, y: -730 },
                    { x: 410, y: -730 },
                    { x: 240, y: -730 },
                    { x: 70, y: -730 }
                ];
               
 
                break;
 
            case 2:
                this.scene.load.image('ArmillarySphere', '/map/mapchip2/ArmillarySphere.png');
                this.scene.load.image('base', '/map/mapchip2/MapChip/base.png');
                this.scene.load.image('byobu', '/map/mapchip2/byobu.png');
                this.scene.load.image('eEJjt6AYWTepUfe1730082958', '/map/mapchip2/eEJjt6AYWTepUfe1730082958.png');
                this.scene.load.image('goal2', '/map/mapchip2/goal2.png');
                this.scene.load.image('gpiano', '/map/mapchip2/gpiano.png');
                this.scene.load.image('Le Penseur', '/map/mapchip2/Le Penseur.png');
                this.scene.load.image('manekineko2', '/map/mapchip2/manekineko2.png');
                this.scene.load.image('mizu1', '/map/mapchip2/MapChip/mizu1.png');
                this.scene.load.image('mizu2', '/map/mapchip2/MapChip/mizu2.png');
                this.scene.load.image('patcar', '/map/mapchip2/patcar.png');
                this.scene.load.image('syakanyorai2', '/map/mapchip2/syakanyorai2.png');
                this.scene.load.image('taki2', '/map/mapchip2/MapChip/taki2.png');
                this.scene.load.image('tigermat2', '/map/mapchip2/tigermat2.png');
                this.scene.load.image('tuti2', '/map/mapchip2/Mapchip/tuti2.png');
                this.scene.load.image('tuti3', '/map/mapchip2/Mapchip/tuti3.png');
                this.scene.load.image('yougan', '/map/mapchip2/MapChip/yougan.png');
                this.scene.load.image('kumo', '/map/mapchip2/kumo.png');
                this.scene.load.image('sora', '/map/mapchip2/sora.jpg');
           
                // Tiledで出力したJsonファイルをロード
                this.scene.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/third-map.json');
               
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
        
        let diffMapX = relatedX - this.mapX;
        let diffMapY = relatedY - this.mapY;

        switch (this.mapID) {
            case 0:
                this.coordinates = [ 
                    { x: 430, y: 1260 },
                    { x: 430, y: 1120 },
                    { x: 430, y: 970 },
                    { x: 430, y: 820 },
                    { x: 430, y: 680 },
                    { x: 430, y: 540 },
                    { x: 570, y: 540 },
                    { x: 720, y: 540 },
                    { x: 860, y: 540 },
                    { x: 1010, y: 540 },
                    { x: 1150, y: 540 },
                    { x: 1290, y: 540 },  
                    { x: 1440, y: 540 },
                    { x: 1580, y: 540 },
                    { x: 1730, y: 540 },
                    { x: 1730, y: 680 },
                    { x: 1730, y: 830 },
                    { x: 1730, y: 970 },
                    { x: 1730, y: 1120 },
                    { x: 1730, y: 1280 }
                ];
                break;

                case 1:
                    this.coordinates = [
                        { x: 410, y: 560 },
                        { x: 215, y: 560 },
                        { x: 215, y: 370 ,branches: [3, 23] },
                        { x: 20, y: 370 },
                        { x: 20, y: 170 },
                        { x: -220, y: 170 ,branches:[6,12] },
                        { x: -360, y: -20 },
                        { x: -220, y: -215 },
                        { x: -360, y: -410 },
                        { x: -220, y: -600 },
                        { x: -360, y: -410 },
                        { x: -220, y: -980 },
                        { x: 410, y: -1150 },
                        { x: 1030, y: -800 },
                        { x: 410, y: -1150 ,branches:[13,15]},
                        { x: 1270, y: -800 },
                        { x: 1270, y: -615 },
                        { x: 1150, y: -300 ,branches:[18,20]},
                        { x: 1030, y: 10 },
                        { x: 1030, y: 210 },
                        { x: 1270, y: 10 },
                        { x: 1270, y: 210 },
                        { x: 790, y: 560 },
                        // { x: 400, y: 370 },
                        { x: 410, y: 170 },
                        { x: 600, y: 170 },
                        { x: 790, y: -15 },
                        { x: 410, y: -15 },
                        { x: 20, y: -15 },
                        { x: 410, y: -450 },
                        { x: 575, y: -450 },
                        { x: 740, y: -450 },
                        { x: 240, y: -450 },
                        { x: 70, y: -450 },
                        { x: 740, y: -590 },
                        { x: 575, y: -590 },
                        { x: 410, y: -590 },
                        { x: 240, y: -590 },
                        { x: 70, y: -590 },
                        { x: 740, y: -730 },
                        { x: 575, y: -730 },
                        { x: 410, y: -730 },
                        { x: 240, y: -730 },
                        { x: 70, y: -730 }
                    ];
                   
     
                    break;
                }
     
        //プレイヤー1
        // const startPosition = coordinates[0]; // 初期位置
        const playerIcons = ['playericon1', 'playericon2', 'playericon3', 'playericon4']; // 各プレイヤーの画像キー
        this.playerPos =[0,0,0,0] ;//プレイヤー位置をいれておく
        if (!this.players) this.players = []; // プレイヤー配列を初期化
       
        // プレイヤー数分ループしてスプライトを作成
        for (let i = 0; i < playerIcons.length; i++) {
          	this.sprite = this.scene.add.sprite(this.coordinates[ this.playerPos[i] ].x - diffMapX, this.coordinates[ this.playerPos[i] ].y - diffMapY, playerIcons[i]);
            this.sprite.setScale(2); // サイズ調整
            this.sprite.setOrigin(0.5); // 中心設定
            this.sprite.setDepth(0); // 表示順序を設定
            // プレイヤー情報（スプライトと現在位置）を保存
            this.players.push(this.sprite);
        //     this.playerPositions.push({position: {            // 現在の座標
        //         x: startPosition.x,
        //         y: startPosition.y
        // }});
        }
        // キャラ画像を追加
        // const playerPositions = [
        //     { x: 410 , y: 560
        //     }, // 1プレイヤー1
        //     { x: 410, y: 560
           
        //     }, // プレイヤー2
        //     { x: 410, y: 560 }, // プレイヤー3
        //     { x: 410, y: 560 }  // プレイヤー4
        // ];
        // let i = 1;
        // // キャラ画像を一つずつ配置
        // playerPositions.forEach((pos, index) => {
        //     const sprite = this.scene.add.sprite(pos.x, pos.y, 'playericon'+(i));
        //     i =i+1;
        //     sprite.setScale(2); // サイズを調整
        //     sprite.setOrigin(0.5); // 中心に設定
        //     sprite.setDepth(0); // マップより前に表示されるように設定
   
        //     // プレイヤー情報に保存（必要ならグローバルな`player`にも保存可能）
        //     if (!this.players) this.players = [];
        //     this.players.push(sprite);
           
        // });
 
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
 
        this.players.forEach(p => {
            if (p != null) {
                if(!plimitx)p.x += x;
                if(!plimity)p.y += y;
            }
        });
 
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
    
    movechar(playernum, num) {
        const playerIndex = playernum;

        let diffMapX = relatedX - this.mapX;
        let diffMapY = relatedY - this.mapY;
    
        // プレイヤーの現在位置を取得
        let currentPosition = this.playerPos[playerIndex];
        const sprite = this.players[playerIndex];
    
        // 移動キューの確認または初期化
        if (!this.moveQueue) {
            this.moveQueue = {};
        }
        if (!this.moveQueue[playerIndex]) {
            this.moveQueue[playerIndex] = Promise.resolve();
        }
    
        // 非同期処理で移動を管理
        const move = async () => {
            if (isMoving) return;
            isMoving = true;
            for (let i = 0; i < num; i++) {
                currentPosition++;
                if (currentPosition >= this.coordinates.length) {
                    currentPosition = 0; // マップをループさせる場合
                }
    
                const targetX = this.coordinates[currentPosition].x - diffMapX;
                const targetY = this.coordinates[currentPosition].y - diffMapY;
    
                // XとYの移動量を比較して優先順位を決定
                const diffX = Math.abs(targetX - sprite.x);
                const diffY = Math.abs(targetY - sprite.y);
    
                if (diffY >= diffX) {
                    // Y方向を先に移動
                    await this.moveTo(sprite, { x: sprite.x, y: targetY }, playernum, 'up');
                    if (diffX > 0) {
                        // 次にX方向
                        await this.moveTo(sprite, { x: targetX, y: targetY }, playernum, 'side');
                    }
                } else {
                    // X方向を先に移動
                    await this.moveTo(sprite, { x: targetX, y: sprite.y }, playernum, 'side');
                    if (diffY > 0) {
                        // 次にY方向
                        await this.moveTo(sprite, { x: targetX, y: targetY }, playernum, 'up');
                    }
                }
    
                // 現在位置を更新
                this.playerPos[playerIndex] = currentPosition;
            }
    
            // 最終目的地に着いたら真正面を向く
            sprite.setTexture(`playericon${playernum + 1}`);
            isMoving = false;
        };
    
        // キューに移動を追加
        this.moveQueue[playerIndex] = this.moveQueue[playerIndex].then(move);
    }
    
    // スプライトを指定の座標に移動させる関数
    moveTo(sprite, target, playernum, direction) {
        return new Promise((resolve) => {
            const duration = 300;
            const textureBase = `playericon${playernum + 1}`;
    
            this.scene.tweens.add({
                targets: sprite,
                x: target.x,
                y: target.y,
                duration,
                onUpdate: (tween) => {
                    if (direction === 'side') {
                        if (Math.floor(tween.progress * 2) % 2 === 0) {
                            sprite.setTexture(`${textureBase}_side1`);
                        } else {
                            sprite.setTexture(`${textureBase}_side2`);
                        }
                        sprite.setFlipX(target.x < sprite.x);
                    } else if (direction === 'up') {
                        sprite.setTexture(`${textureBase}_up`);
                    }
                },
                onComplete: resolve
            });
        });
    }
}    