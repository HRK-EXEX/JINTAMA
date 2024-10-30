import DialogSelectBox from './dialogSelectBox.js';
import Player from './player.js';

let fieldMap;

// 変数名定義

var cursor;
var key;
var debugInfo;
const firstX = 16.5, firstY = 30, tileSize = 16;
var scale = 3, spd = 10;
var mapX = -firstX * tileSize * scale;
var mapY = -firstY * tileSize * scale;
var tileOffsetX = 0;
var tileOffsetY = 0;

var player = [null,null,null,null];

// 関数名定義
var input;
var loopMap;

var toRadian = (degrees) => {
    return degrees * Math.PI / 180;
}

export class MainScene extends Phaser.Scene {
    dialog;

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

        // fieldMap.setAlpha(1);
        // loopMap.alpha = 1;
        
        // ダイアログの作成
        this.dialog = new DialogSelectBox(this, 50, 50, 700, 300);
        
        // クリックでダイアログを表示
        // this.input.on('pointerdown', () => {
        //     this.dialog.showDialog('これは通常のダイアログメッセージです。');
        // });
        this.input.on('pointerdown', () => {
            this.dialog.showSelectDialog(
                '何をしますか？',
                [
                    '➤ 進む（ルーレットで決める）',
                    '➤ アイテムを使う',
                    '➤ マップ'
                ],
                (choice) => {
                    switch(choice) {
                        case 0:
                            this.dialog.showDialog('戦闘を開始します！');
                            break;
                        case 1:
                            this.dialog.showSelectDialog(
                                'どのアイテムを使用しますか？',
                                ['➤ ポーション', '➤ エーテル', '➤ 戻る'],
                                (itemChoice) => {
                                    if (itemChoice === 2) {
                                        this.dialog.hideDialog();
                                    } else {
                                        this.dialog.showDialog('アイテムを使用しました！');
                                    }
                                }
                            );
                            break;
                        case 2:
                            this.dialog.showDialog('逃げ出した！');
                            break;
                    }
                }
            );
        });

        // ESCキーでダイアログを非表示
        this.input.keyboard.on('keydown-ESC', () => {
            this.dialog.hideDialog();
        });

        this.player1 = new Player(this, this.game.config.width / 2, this.game.config.height / 2, 'Player 1');

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
        if (!this.dialog.visible) {
            if ((button & 1<<0)>0) this.moveMapGroup(spd * sprint, 0);
            if ((button & 1<<1)>0) this.moveMapGroup(-spd * sprint,0);
            if ((button & 1<<2)>0) this.moveMapGroup(0,spd * sprint );
            if ((button & 1<<3)>0) this.moveMapGroup(0,-spd * sprint);
        }

        debugInfo.setText(button)
        // console.log(button);
    }
}