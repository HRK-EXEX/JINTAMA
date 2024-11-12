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
        this.state = 1;
        this.once = false;
        this.rouletteInterval = null; // ルーレット用のタイマーを保存
        this.rouletteText = null; // ルーレット結果を表示するテキスト
    }

    preload() {
        this.gameBoard = new GameBoard(this, 1);
        this.gameBoard.preloadAssets();
        this.utility = new Utility();
    }

    create() {
        this.gameBoard.createMap();
    
        let dialogW = 700;
        let dialogH = 300;
        let dialogX = 50;
        let dialogY = this.game.config.height - 50 - dialogH;
    
        this.dialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
        this.selectDialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
    
        initializeInput(this); 
    
        if (debug) {
            this.input.keyboard.on('keydown-Z', () => {
                if (this.selectDialog.visible) this.selectDialog.hideDialog();
                this.dialog.showDialog('これはテストメッセージです。\nダイアログボックスのテストです。', false, null);
            });
    
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
    
        for (let i = 0; i < 4; i++) {
            player[i] = new Player(this, 40, 40 + i * 40, 'player' + (i + 1));
        }
    
        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
    
        // ルーレット表示用のテキスト要素を作成
        this.rouletteText = this.add.text(400, 300, 'ルーレット', { fontSize: '48px', color: '#fff' });
    
        // ルーレット開始ボタンを作成
        const startButton = this.add.text(200, 500, 'Start Roulette', { fontSize: '32px', color: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.startRoulette());
    
        // ルーレット停止ボタンを作成
        const stopButton = this.add.text(400, 500, 'Stop Roulette', { fontSize: '32px', color: '#f00' })
            .setInteractive()
            .on('pointerdown', () => this.stopRoulette());

        this.reselectable(false);
    }

    // ルーレットを開始
    startRoulette() {
        this.rouletteInterval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            this.rouletteText.setText(randomNum); // ルーレットの数字を更新
        }, 100); // 100msごとに更新
    }

    // ルーレットを停止
    stopRoulette() {
        clearInterval(this.rouletteInterval); // ルーレットを停止
        const finalNumber = this.rouletteText.text;
        this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, true, () => this.reselectable(true));
    }

    // 自分のターンか判断する処理
    reselectable(nextTurn) {
        this.dialog.hideDialog();
        this.selectDialog.hideDialog();
        if (nextTurn)
            this.currentPlayer = ++this.currentPlayer % player.length;

        this.yourTurn = this.turn == this.currentPlayer;
        this.state = this.yourTurn ? 1 : 0;
        this.once = !this.once;
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
                                    case 0: 
                                        this.dialog.showDialog('ルーレットを止めてください。', true, () => {
                                            this.startRoulette();
                                        });
                                        this.state = 2;
                                        break;
                                    case 1: 
                                        this.dialog.showDialog('ステータスは以下のようになります。', true, () => this.reselectable());
                                        this.state = 4;
                                        break;
                                    case 2: 
                                        this.dialog.showDialog('つぎの人にターンを渡します。', true, () => this.reselectable(true));
                                        this.state = 2;
                                        break;
                                }
                                this.selectDialog.hideDialog();
                            }
                        );
                    }
            }
            this.once = !this.once;
        }
    }

}
