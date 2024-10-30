export class GameBoard {
    // Objects
    baseTileSet;
    dirtTileSet1;
    dirtTileSet2;
    relatedTileSet;

    // Defined Names
    layerNames;
    tilemapNames;

    // Other things
    loopTileSprite;
    layers;

    constructor(scene, mapKey) {
        this.scene = scene;
        
        /* ---------- PRELOADING AREA ---------- */

        /*                              
            ╔════════════════════════╗
            ║ ２つ目のマップをロード ║
            ╚════════════════════════╝
                                        */

        this.load.image('baseTileImage', '/map/mapchip2/MapChip/base.png')
        this.load.image('dirtTileImage', '/map/mapchip2/MapChip/tuti1.png')
        this.load.image('dirtTileImage2', '/map/mapchip2/MapChip/tuti2.png')
        this.load.image('loopTile', '/map/loops/forestLoop+16Y.png')

        /* ---------- PRELOADING AREA ---------- */
        
        this.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/second-map.json')
    
        // マップの作成
        this.map = scene.make.tilemap({ key: mapKey });
        
        // タイルセットの追加（'tiles'はTiledでのタイルセット名）
        // キーは、Tiled JSONをロードしたときにpreload()関数で与えられた名前と一致する必要がある。
        // また、タイルセット画像をPhaserマップオブジェクトに追加する必要がある。
        this.baseTileSet = this.map.addTilesetImage(tilemapNames[0], 'baseTileImage')
        this.dirtTileSet1 = this.map.addTilesetImage(tilemapNames[1], 'dirtTileImage')
        this.dirtTileSet2 = this.map.addTilesetImage(tilemapNames[2], 'dirtTileImage2')
        // addTilesetImageの第一引数は、Tiledで使ったタイルセットの名前。
        // 第二引数は、preload()関数で読み込んだ画像のキーである。
        
        // 関連するタイルセットの名前を定義
        switch (mapKey) {
            case "map2":
                this.layerNames = [
                    'ground',
                    'background',
                    'route',
                    'jump',
                    'grid',
                    'foreground',
                ];

                this.tilemapNames = [
                    'baseTile',
                    'dirtTile1',
                    'dirtTile2',
                ];

                this.relatedTileSet = [
                    baseTileSet,
                    baseTileSet,
                    dirtTileSet1,
                    dirtTileSet2,
                    baseTileSet,
                    baseTileSet,
                ];

                // 背景リピート
                this.loopTileSprite = scene.add.tileSprite(0, 0, this.game.config.width / 2, this.game.config.height / 2, "loopTile");
                this.loopTileSprite.setScale(scale, scale);
                this.loopTileSprite.setOrigin(0, 0);
                break;
        }

        this.layers = scene.add.group();

        // レイヤーを追加
        for(let i=0; i<layerNames.length; i++) {
            let tmpLayer = map.createLayer(i, relatedTileSet[i], 0, 0)
            tmpLayer.setScale(scale, scale)
            fieldMap.add(tmpLayer)
        }

        this.moveMapGroup(0, 0);
        
        // マスの位置を格納する配列
        this.cells = [];
        this.initializeCells();
        
        // イベントタイプの定義
        this.eventTypes = {
            0: 'normal',    // 通常マス
            1: 'work',      // 仕事マス
            2: 'rest',      // 休憩マス
            3: 'social',    // 社交マス
            4: 'study'      // 勉強マス
        };
    }
    
    initializeCells() {
        // pathレイヤーからマスの位置を取得
        this.pathLayer.forEachTile(tile => {
            if (tile.index !== -1) {  // -1は空のタイル
                this.cells.push({
                    x: tile.pixelX + tile.width / 2,
                    y: tile.pixelY + tile.height / 2,
                    index: this.cells.length,
                    type: this.getEventTypeFromTile(tile)
                });
            }
        });
    }
    
    getEventTypeFromTile(tile) {
        // タイルのプロパティからイベントタイプを取得
        // Tiledでカスタムプロパティ 'eventType' を設定している前提
        const eventType = tile.properties?.eventType ?? 0;
        return this.eventTypes[eventType] || 'normal';
    }
    
    getCellPosition(index) {
        return this.cells[index] || null;
    }
    
    getNextCellIndices(currentIndex) {
        // 現在のマスから移動可能なマスのインデックスを返す
        // この例では単純に次のマスを返していますが、
        // 実際のゲームでは分岐なども考慮する必要があります
        const nextIndex = currentIndex + 1;
        return nextIndex < this.cells.length ? [nextIndex] : [];
    }
}
