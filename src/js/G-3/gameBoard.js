
import { getRandomEvent } from './event.js';
import { updateFieldMap, updateLoopMap, player } from './initialize.js';
import Player from './player.js';

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
export class GameBoard {
    constructor(scene, mapID) {
        this.scene = scene;
        this.fieldMap = null;
        this.loopMap = null;
        this.map = null;
        this.mapID = mapID;

        this.playersData = [];
        this.eventLog = [];

        // タイルマップとレイヤーを配列で初期化
        this.tilemapNames = [];
        this.layerNames = [];

        this.coordinates = [];

        // GameBoardの初期化時にPlayerインスタンスを作成し、プレイヤーオブジェクトをシーンに追加
        this.playersData.forEach(player => {
            this.scene.add.existing(player);
        });

        switch (mapID) {
            case 0:
                firstX = 0;
                firstY = 0;
                break;
            case 1:
                firstX = 0;
                firstY = 0;
                break;
            case 2:
                firstX = 0;
                firstY = 0;
                break;
        }

        this.mapX = -firstX * tileSize * scale;
        this.mapY = -firstY * tileSize * scale;

        console.log("x", this.mapX, "y", this.mapY);
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
                this.coordinates = [
                    { x: 1200, y: 2010 },
                    { x: 1010, y: 2010 },
                    { x: 1010, y: 1830, branches: [3, 23] },
                    { x: 820, y: 1830 },
                    { x: 820, y: 1630, branches: [6, 12] },
                    { x: 570, y: 1630 },
                    { x: 430, y: 1450 },
                    { x: 570, y: 1260 },
                    { x: 430, y: 1050 },
                    { x: 570, y: 870 },
                    { x: 430, y: 670 },
                    { x: 570, y: 480, branches: [13, 15] },
                    { x: 1200, y: 300 },
                    { x: 1830, y: 630 },
                    { x: 1830, y: 840 },
                    { x: 2070, y: 630 },
                    { x: 2070, y: 840 },
                    { x: 1950, y: 1150, branches: [18, 20] },
                    { x: 1830, y: 1460 },
                    { x: 1830, y: 1650 },
                    { x: 2070, y: 1460 },
                    { x: 2070, y: 1650 },
                    { x: 1580, y: 2000 },
                    { x: 1200, y: 1630 },
                    { x: 1400, y: 1630 },
                    { x: 1590, y: 1440 },
                    { x: 1200, y: 1440 }
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

        for (let tileName of this.tilemapNames) {
            // console.log(i);
            tiles.push(this.map.addTilesetImage(tileName, tileName));
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
        for (let i = 0; i < this.layerNames.length; i++) {
            let tmpLayer = this.map.createLayer(i, relatedTileSet, 0, 0);
            tmpLayer.setScale(scale, scale);
            mapWidth = Math.max(mapWidth, tmpLayer.width);
            mapHeight = Math.max(mapHeight, tmpLayer.height);

            this.fieldMap.add(tmpLayer);
        }

        // const routeLayer = this.map.layers.find(layer => layer.name === 'route');
        // const shokiLayer = this.map.layers.find(layer => layer.name === 'grid');
        // this.shokiDate = shokiLayer.data;
        // if (routeLayer) {
        //     this.routeData = routeLayer.data; // routeデータを格納
        //     console.log("Route data:", this.routeData); // デバッグ用
        // } else {
        //     console.error('Route layer not found!');
        // }
        // console.log("Route data:", this.shokiDate);
        // for (let i = 0; i < this.shokiDate.length; i++) {
        //     for (let j = 0; j < this.shokiDate.length; j++) {
        //         if(this.shokiDate[i][j].index==430){
        //         console.log("なかみ:", this.shokiDate[i][j]);
        //         this.plx = (this.shokiDate[i][j].x* tileSize * scale)-this.mapX;
        //         this.ply = (this.shokiDate[i][j].y* tileSize * scale)-this.mapY;
        //         console.log("なかみ:", this.plx,"y",this.ply);
        //         }
        //     }
        // }

        // マップサイズを計算 (タイル数 × タイルサイズ × スケール)
        const mapPixelWidth = this.map.widthInPixels * scale;
        const mapPixelHeight = this.map.heightInPixels * scale;

        // カメラ設定を更新
        // this.adjustCamera(mapPixelWidth, mapPixelHeight);
        this.fieldMap.setAlpha(1);
        this.addCharacterIcons();
        this.moveMapGroup(0, 0);
    }

    adjustCamera(mapPixelWidth, mapPixelHeight) {
        const camera = this.scene.cameras.main;

        // ゲーム画面の幅と高さを取得
        const screenWidth = this.scene.game.config.width;
        const screenHeight = this.scene.game.config.height;

        // ズーム値を計算
        const zoomX = screenWidth / mapPixelWidth;
        const zoomY = screenHeight / mapPixelHeight;
        const zoom = Math.min(zoomX, zoomY); // 小さい方を採用

        camera.setZoom(zoom);

        // カメラをマップ中央に配置
        camera.centerOn(mapPixelWidth / 2, mapPixelHeight / 2);

        // 必要に応じてカメラのズームを調整


    }

    addCharacterIcons() {

        //プレイヤー1
        // const startPosition = coordinates[0]; // 初期位置
        const playerIcons = ['playericon1', 'playericon2', 'playericon3', 'playericon4']; // 各プレイヤーの画像キー
        this.playerPos = [0, 0, 0, 0];//プレイヤー位置をいれておく
        if (!this.players) this.players = []; // プレイヤー配列を初期化

        console.log(this.coordinates);
        // プレイヤー数分ループしてスプライトを作成
        for (let i = 0; i < playerIcons.length; i++) {
            this.sprite = this.scene.add.sprite(this.coordinates[0].x, this.coordinates[0].y, playerIcons[i]);
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

    }
    moveMapGroup(x, y) {
        scrollLimit = 0;
        this.mapX += x;
        this.mapY += y;


        let limitX = -mapWidth * scale + this.scene.game.config.width;
        let limitY = -mapHeight * scale + this.scene.game.config.height;

        var plimity = false;
        var plimitx = false;

        if (0 < this.mapX) { plimitx = true; this.mapX = 0; scrollLimit |= 1; }
        else if (limitX > this.mapX) { plimitx = true; this.mapX = limitX; scrollLimit |= 2; }

        if (0 < this.mapY) { plimity = true; this.mapY = 0; scrollLimit |= 4; }
        else if (limitY > this.mapY) { plimity = true; this.mapY = limitY; scrollLimit |= 8; }

        for (const p of player) {

            if (p != null) {
                if (!plimitx) p.x += x;
                if (!plimity) p.y += y;
            }

        }


        this.fieldMap.setXY(this.mapX, this.mapY);
        if (this.loopMap !== null) {
            this.loopMap.setTilePosition(-(this.mapX + tileOffsetX), -(this.mapY + tileOffsetY));
        }
    }

    update(button) {
        const sprint = ((button & 1 << 4) > 0) ? 4 : 1;

        if (scrollLimit > 0) {

        }

        if ((button & 1 << 0) > 0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1 << 1) > 0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1 << 2) > 0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1 << 3) > 0) this.moveMapGroup(0, -spd * sprint);
    }
    movechar(playernum, num) {
        console.log(`pure${playernum}`);
        const playerIndex = playernum;
        let i = 0;

        const movenext = async () => {
            if (i >= num) return;

            this.playerPos[playerIndex]++;
            console.log(`おるマス${this.playerPos[playerIndex]},x:${this.coordinates[this.playerPos[playerIndex]].x},y:${this.coordinates[this.playerPos[playerIndex]].y}`);
            if(this.playerPos[playerIndex]==14){
                this.playerPos[playerIndex]=16;
            }
            if (this.coordinates[this.playerPos[playerIndex] - 1].branches) {
                const branches = this.coordinates[this.playerPos[playerIndex] - 1].branches;
                let bunki = this.playerPos[playerIndex] - 1;
                console.log(`bunki${bunki}`);

                if (this.players[playerIndex]) {
                    this.players[playerIndex].destroy();
                }

                // 新しい位置にスプライトを配置
                const sprite = this.scene.add.sprite(this.coordinates[bunki].x, this.coordinates[bunki].y, `playericon${playerIndex + 1}`);
                sprite.setScale(2);  // サイズ調整
                sprite.setOrigin(0.5);  // 中心設定
                sprite.setDepth(0);  // 表示順序を設定
                this.players[playerIndex] = sprite;
                const event = getRandomEvent();
                // const result = event.action(player); // Playerインスタンスで処理
                // this.eventLog.push(`${player.name}のイベント: ${event.name} - ${result}`);
                console.log(`${player.name}のイベント: ${event.name} - 幸福度: ${player.stats.score}`);
                event.action(player);
                // this.updateLog();

                this.selectbunki(branches).then((choice) => {
                    console.log(`選ばれたルート: ${choice}`);
                    this.playerPos[playerIndex] = branches[choice];


                    this.playerPos[playerIndex] = branches[choice];

                    if (this.players[playerIndex]) {
                        this.players[playerIndex].destroy();
                    }
                    const pos = this.playerPos[playerIndex]

                    // 新しい位置にスプライトを配置
                    const sprite = this.scene.add.sprite(this.coordinates[pos].x, this.coordinates[pos].y, `playericon${playerIndex + 1}`);
                    sprite.setScale(2);  // サイズ調整
                    sprite.setOrigin(0.5);  // 中心設定
                    sprite.setDepth(0);  // 表示順序を設定
                    this.players[playerIndex] = sprite;
                    const event = getRandomEvent();
                    // const result = event.action(player); // Playerインスタンスで処理
                    // this.eventLog.push(`${player.name}のイベント: ${event.name} - ${result}`);
                    console.log(`${player.name}のイベント: ${event.name} - 幸福度: ${player.stats.score}`);
                    event.action(player);
                    // this.updateLog();
                    i++;
                    console.log(`おるマス${this.playerPos[playerIndex]},x:${this.coordinates[this.playerPos[playerIndex]].x},y:${this.coordinates[this.playerPos[playerIndex]].y}`);
                    movenext();
                });

            } else {
                console.log(`${i}`);
                const pos = this.playerPos[playerIndex];
                if (this.players[playerIndex]) {
                    this.players[playerIndex].destroy();
                }

                // 新しい位置にスプライトを配置
                const sprite = this.scene.add.sprite(this.coordinates[pos].x, this.coordinates[pos].y, `playericon${playerIndex + 1}`
                );
                sprite.setScale(2); // サイズ調整
                sprite.setOrigin(0.5); // 中心設定
                sprite.setDepth(0); // 表示順序を設定

                this.players[playerIndex] = sprite;
                const event = getRandomEvent();
                // const result = event.action(player); // Playerインスタンスで処理
                // this.eventLog.push(`${player.name}のイベント: ${event.name} - ${result}`);
                console.log(`${player.name}のイベント: ${event.name} - 幸福度: ${player.stats.score}`);
                event.action(player);
                // this.updateLog();

                i++
                console.log(`おるマス${this.playerPos[playerIndex]},x:${this.coordinates[this.playerPos[playerIndex]].x},y:${this.coordinates[this.playerPos[playerIndex]].y}`);
                movenext();

            }
        }
        movenext();
    }

    selectbunki(branches) {
        return new Promise((resolve) => {
            // ダイアログ背景
            const dialogBackground = this.scene.add.rectangle(800, 300, 500, 300, 0x000000)
                .setOrigin(0.5)
                .setAlpha(0.8);

            // ダイアログテキスト
            const dialogText = this.scene.add.text(600, 170, '分岐点に到達しました。\nどちらに進みますか？(クリック！)', {
                fontSize: '24px',
                fill: '#fff'
            });

            const buttons = [];
            branches.forEach((branchIndex, index) => {
                const button = this.scene.add.text(600, 250 + index * 70, `ルート ${branchIndex}`, {
                    fontSize: '20px',
                    fill: '#fff'
                })
                    .setInteractive()
                    .on('pointerdown', () => {
                        // 選択された分岐を返す
                        resolve(index);

                        // ダイアログ要素を削除
                        dialogBackground.destroy();
                        dialogText.destroy();
                        buttons.forEach(btn => btn.destroy());
                    })
                    .on('pointerover', () => {
                        // マウスオーバーで色を変更
                        button.setStyle({ fill: '#ff0' }); // 黄色に変更
                    })
                    .on('pointerout', () => {
                        // マウスが外れたら元の色に戻す
                        button.setStyle({ fill: '#fff' }); // 白色に戻す
                    });
                buttons.push(button);
            });
        });

    }
    updateLog() {
        // 最新のイベントログをコンソール表示
        console.clear();
        console.log('--- イベントログ ---');
        console.log(this.eventLog.join('\n'));
    }

}
