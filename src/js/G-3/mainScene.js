import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        this.gameBoard = null;
        this.currentPlayer = 1;
        this.turn = 1;
        this.yourTurn = false;
        this.state = 1;
        this.once = false;
        this.rouletteInterval = null;
        this.rouletteText = null;
        this.isRouletteRunning = false; // ルーレットが実行中かどうかを示すフラグ
        this.isDialogActive = false;
    }

    preload() {
        this.gameBoard = new GameBoard(this, 1);
        this.gameBoard.preloadAssets();
        this.utility = new Utility();
        this.load.image('playericon1', '/characters/melondog.png');
        this.load.image('playericon2', '/characters/takugorira.png');
        this.load.image('playericon3', '/characters/obake.png');
        this.load.image('playericon4', '/characters/bakemon.png');
    }

    create() {
        this.gameBoard.createMap();
        let dialogW = 700, dialogH = 300, dialogX = 50, dialogY = this.game.config.height - 50 - dialogH;

        this.dialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
        this.selectDialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);

        initializeInput(this); 
        this.state = 1;
        this.once = false;

        this.showTurnOptions();

        var username = document.getElementById('username1').textContent;
        console.log(username);
        const arr = username.split(',');

        for (let i = 0; i < 4; i++) {
            var p = player[i]
            p = new Player(this, 40, 40 + i * 40, arr[2]);
            p.modifyStats({
                score: arr[3] - p.stats.score,    // 幸福度
                hp: arr[4] - p.hp.score,     // 体力
                charm: arr[5] - p.charm.score,   // 魅力
                sense: arr[6] - p.sense.score    // センス
            });
        }
        // 基本ステータス
        this.stats = {
            score: 0,    // 幸福度
            hp: 100,     // 体力
            charm: 50,   // 魅力
            sense: 50    // センス
        };


        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
        this.rouletteText = this.add.text(75, 300);

        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isRouletteRunning) {
                // ルーレットが実行中の場合は停止
                this.stopRoulette(true);
            } else if(this.isDialogActive){
                this.dialog.hideDialog();
                this.isDialogActive = false;
                 this.rouletteText.setText(""); //ルーレットの数字を消す
                this.endTurn();
            }else{
                // ルーレットが停止中の場合は開始
                this.startRoulette();
            }
        });

        // this.dialog.showDialog('ルーレットを回すにはエンターキーを押してください。', true);
    }

    startRoulette() {
        this.isRouletteRunning = true; // ルーレット実行中フラグを設定
        this.rouletteInterval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 6) + 1;
            this.rouletteText.setText(randomNum);
        }, 100);
    }

    stopRoulette(isEnterKey) {
        clearInterval(this.rouletteInterval);  // ルーレットを停止
        this.rouletteInterval = null;
        this.isRouletteRunning = false;  // ルーレット実行中フラグをリセット
        const finalNumber = this.rouletteText.text;  // 最後の数字を取得
        this.dialog.hideDialog();
        console.log("最終的な数字:", finalNumber);
        console.log(isEnterKey);

        this.dialog.hideDialog();
    
        // ルーレット停止後にダイアログを表示
        if (isEnterKey) {
            this.isDialogActive = true;
            // ルーレット停止後に選ばれた数字を表示するダイアログを表示
            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, true, () => {}
            );
        } else {
            this.rouletteText.setText("");
            this.endTurn();  // ルーレット停止時に即座にターンを終了
        }
    }
    

    endTurn() {
        this.dialog.hideDialog();
        this.selectDialog.hideDialog();
        this.currentPlayer = (this.currentPlayer + 1) % player.length;
        this.yourTurn = (this.turn === this.currentPlayer);
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
            if (this.state === 1 && this.yourTurn) {
                this.showTurnOptions();
            }
            this.once = !this.once;
        }
    }

    showTurnOptions() {
        this.selectDialog.showSelectDialog(
            'あなたのターンです。',
            ['ルーレット', 'ステータス', 'ターンスキップ'],
            choice => {
                switch (choice) {
                    case 0:
                        this.dialog.showDialog('ルーレットを止めてください。', true, () => this.startRoulette());
                        this.state = 2;
                        break;
                    case 1:
                        this.dialog.showDialog('ステータスは以下のようになります。', true, () => this.endTurn());
                        this.state = 4;
                        break;
                    case 2:
                        this.dialog.showDialog('つぎの人にターンを渡します。', true, () => this.endTurn());
                        this.state = 2;
                        break;
                }
                this.selectDialog.hideDialog();
            }
        );
    }
}
