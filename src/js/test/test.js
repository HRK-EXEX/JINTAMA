// マップデータを読み込む
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // マップデータを読み込む
        this.load.json('mapData', '/src/js/G-3/map-data/second-map.json');
        this.scene.load.image('baseTile', '/map/mapchip2/MapChip/base.png');
        this.scene.load.image('dirtTile1', '/map/mapchip2/MapChip/tuti1.png');
        this.scene.load.image('dirtTile2', '/map/mapchip2/MapChip/tuti2.png');
        this.scene.load.image('loopTile', '/map/loops/forestLoop+16Y.png');
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
    }

    create() {
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
}