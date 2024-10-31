import { 
    layerNames, tilemapNames, tileSize,
    firstX, firstY, scale, spd,
    tileOffsetX, tileOffsetY,
    updateFieldMap, updateLoopMap
} from './initialize.js';

export class GameBoard {
    constructor(scene) {
        this.scene = scene;
        this.fieldMap = null;
        this.loopMap = null;
        this.map = null;
        
        this.mapX = -firstX * tileSize * scale;
        this.mapY = -firstY * tileSize * scale;
    }

    preloadAssets() {
        this.scene.load.image('baseTileImage', '/map/mapchip2/MapChip/base.png');
        this.scene.load.image('dirtTileImage', '/map/mapchip2/MapChip/tuti1.png');
        this.scene.load.image('dirtTileImage2', '/map/mapchip2/MapChip/tuti2.png');
        this.scene.load.image('loopTile', '/map/loops/forestLoop+16Y.png');
        this.scene.load.tilemapTiledJSON('map', '/src/js/G-3/map-data/second-map.json');
    }

    createMap() {
        // マップを追加
        this.map = this.scene.make.tilemap({ key: 'map' });

        const baseTileSet = this.map.addTilesetImage(tilemapNames[0], 'baseTileImage');
        const dirtTileSet1 = this.map.addTilesetImage(tilemapNames[1], 'dirtTileImage');
        const dirtTileSet2 = this.map.addTilesetImage(tilemapNames[2], 'dirtTileImage2');

        const relatedTileSet = [
            baseTileSet,
            baseTileSet,
            dirtTileSet1,
            dirtTileSet2,
            baseTileSet,
            baseTileSet,
        ];

        // fieldMapの作成
        this.fieldMap = this.scene.add.group();
        updateFieldMap(this.fieldMap);
        
        // 背景リピートの作成
        this.loopMap = this.scene.add.tileSprite(
            0, 0, 
            this.scene.game.config.width / 2, 
            this.scene.game.config.height / 2, 
            "loopTile"
        );
        updateLoopMap(this.loopMap);
        
        this.loopMap.setScale(scale, scale);
        this.loopMap.setOrigin(0, 0);

        // レイヤーを追加
        for(let i = 0; i < layerNames.length; i++) {
            let tmpLayer = this.map.createLayer(i, relatedTileSet[i], 0, 0);
            tmpLayer.setScale(scale, scale);
            this.fieldMap.add(tmpLayer);
        }

        this.fieldMap.setAlpha(1);
        this.loopMap.alpha = 1;
        
        this.moveMapGroup(0, 0);
    }

    moveMapGroup(x, y) {
        this.mapX += x;
        this.mapY += y;
        this.fieldMap.setXY(this.mapX, this.mapY);
        this.loopMap.setTilePosition(-(this.mapX + tileOffsetX) / scale, -(this.mapY + tileOffsetY) / scale);
    }

    update(button) {
        const sprint = ((button & 1<<4) > 0) ? 4 : 1;
        
        if ((button & 1<<0) > 0) this.moveMapGroup(spd * sprint, 0);
        if ((button & 1<<1) > 0) this.moveMapGroup(-spd * sprint, 0);
        if ((button & 1<<2) > 0) this.moveMapGroup(0, spd * sprint);
        if ((button & 1<<3) > 0) this.moveMapGroup(0, -spd * sprint);
    }
}