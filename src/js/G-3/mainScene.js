import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';

let debug = false;

export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        this.gameBoard = null;
        this.currentPlayer = 1;
        this.turn = 1;
        this.yourTurn = false;
        /**
         * クライアントの状態を表すフィールド。  
         * 0: 待機中（他のクライアントのターン時）  
         * 1: 入力待機中（自分のターン開始時）  
         * 2: ルーレット  
         * 3: マップ移動  
         * 4: ステータス閲覧  
         */
        this.state = 1;
        this.once = false;
    }

    preload() {
        this.gameBoard = new GameBoard(this, 2);
        this.gameBoard.preloadAssets();

        // ユーティリティクラスを使用可能に
        this.utility = new Utility();
    }

    create() {
        // マップの作成
        this.gameBoard.createMap();

        let dialogW = 700;
        let dialogH = 300;
        let dialogX = 50;
        let dialogY = this.game.config.height - 50 - dialogH;

        // ダイアログの作成
        this.dialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
        this.selectDialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);

        // 入力の初期化
        initializeInput(this); 

        if (debug) {
            // Zキーでダイアログを表示
            this.input.keyboard.on('keydown-Z', () => {
                if (this.selectDialog.visible) this.selectDialog.hideDialog();
                this.dialog.showDialog('これはテストメッセージです。\nダイアログボックスのテストです。', false, null);
            });

            // Xキーで選択ダイアログを表示
            this.input.keyboard.on('keydown-X', () => {
                if (this.dialog.visible) this.dialog.hideDialog();
                this.selectDialog.showSelectDialog(
                    'これはテストメッセージです。\n選択ダイアログボックスのテストです。',
                    ['選択肢１', '選択肢２', '選択肢３'],
                    choice => {
                        switch (choice) {
                            case 0: this.dialog.showDialog('選択肢１が選択されました', true); break;
                            case 1: this.dialog.showDialog('選択肢２が選択されました', true); break;
                            case 2: this.dialog.showDialog('選択肢３が選択されました', true); break;
                        }
                        this.selectDialog.hideDialog();
                    }
                );
            });
        }

        // プレイヤーの表示
        for (let i=0; i<4; i++) {
            player[i] = new Player(this, 40, 40 + i*40, 'player'+(i+1));
        }        

        // デバッグ情報の初期化
        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
    }

    update() {
        const button = input();
        if (!this.dialog.visible && !this.selectDialog.visible) {
            this.gameBoard.update(button);
            
                this.once = !this.once;
            
        }
        debugInfo.setText(button + ", " + -this.gameBoard.mapX + ", " + -this.gameBoard.mapY);
        
        if (!this.once) {
            switch (this.state) {
                case 0: break;
                case 1:
                    if (this.yourTurn) {
                        this.selectDialog.showSelectDialog(
                            'あなたのターンです。',
                            ['ルーレット', 'ステータス', 'ターンスキップ'],
                            choice => {
                                switch (choice) {
                                    case 0: this.dialog.showDialog('ルーレットを止めてください。',       true, () => this.reselectable(true)); this.state = 2; break;
                                    case 1: this.dialog.showDialog('ステータスは以下のようになります。', true, () => this.reselectable()); this.state = 4; break;
                                    case 2: this.dialog.showDialog('つぎの人にターンを渡します。',       true, () => this.reselectable(true)); this.state = 2; break;
                                }
                                this.selectDialog.hideDialog();
                            }
                        );
                    } else {
                        this.selectDialog.showSelectDialog(
                            'ターン待機中です。Enterキーでスキップ',
                            ['ルーレット', 'ステータス', 'ターンスキップ'],
                            choice => {
                                switch (choice) {
                                    case 0: this.dialog.showDialog('ルーレットを止めてください。',       true, () => this.reselectable(true)); this.state = 2; break;
                                    case 1: this.dialog.showDialog('ステータスは以下のようになります。', true, () => this.reselectable()); this.state = 4; break;
                                    case 2: this.dialog.showDialog('つぎの人にターンを渡します。',       true, () => this.reselectable(true)); this.state = 2; break;
                                }
                                this.selectDialog.hideDialog();
                            }
                        );
                    }
            }
            this.once = !this.once;
        }
    }

    reselectable(nextTurn) {
        this.dialog.hideDialog();
        this.selectDialog.hideDialog();
        if (nextTurn)
            this.currentPlayer = ++this.currentPlayer % player.length;

        this.yourTurn = this.turn == this.currentPlayer;
        this.state = this.yourTurn ? 1 : 0;
        this.once = !this.once;
    }
}