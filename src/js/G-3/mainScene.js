import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        this.gameBoard = null;
        this.currentPlayer = 0;
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
        this.scale.resize(window.innerWidth, window.innerHeight);

        
        player.splice(0, player.length);
        for (let i = 0; i < 4; i++) {
            player[i] = new Player(this, 40, 40 + i * 40, 'player' + (i + 1));
        }

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
                 this.showNextTurnButton();
            }else if(this.state === 2 && !this.isRouletteRunning){
                this.startRoulette();
            }
            // }else{
            //     this.startRoulette();
            // }
        
        });

        // this.dialog.showDialog('ルーレットを回すにはエンターキーを押してください。', true);
    }

    startRoulette() { 
        this.isRouletteRunning = true; // ルーレット実行中フラグを設定
        this.rouletteText.setText("");
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
        // this.dialog.hideDialog();
        // console.log("最終的な数字:", finalNumber);
        // console.log(isEnterKey);

        // this.dialog.hideDialog();
    
        // ルーレット停止後にダイアログを表示
        if (isEnterKey) {
            this.isDialogActive = true; 
            // ルーレット停止後に選ばれた数字を表示するダイアログを表示
            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, true,() =>{
                this.gameBoard.movechar(this.currentPlayer,finalNumber);
                // this.endTurn(false);
            });
        } else {
            this.rouletteText.setText("");
              // ルーレット停止時に即座にターンを終了
        }
    }
    

    endTurn(forceHide) {
        if (forceHide) this.dialog.hideDialog();
        this.selectDialog.hideDialog();

        console.log("=== endTurn() 開始 ===");
        console.log(`現在のプレイヤー: Player ${this.currentPlayer+1}`);

        this.currentPlayer = (this.currentPlayer);
        this.currentPlayer = (this.currentPlayer + 1) % player.length;;

        console.log(`次のプレイヤー: Player ${this.currentPlayer + 1 }`);
        console.log(`player.length: ${player.length}, currentPlayer: ${this.currentPlayer }`);
        console.log("=== endTurn() 終了 ===");

    
        this.turn=this.currentPlayer;
        this.yourTurn = (this.currentPlayer === 0);
        this.state =  1;
        this.showNextTurnButton
        // デバッグ用ログ
    
        
    }

    update() {
        const button = input();
         // 現在のターン情報を表示
    console.log(`Update中 - 現在のプレイヤー: Player ${this.currentPlayer +1}`);
        if (!this.dialog.visible && !this.selectDialog.visible) {
            this.gameBoard.update(button);
            this.once = !this.once;
        }
        debugInfo.setText(button + ", " + -this.gameBoard.mapX + ", " + -this.gameBoard.mapY);

        // 必要に応じて状態に応じた処理を追加
         // 繰り返し呼び出さないようにする
        this.showTurnOptions();
    
    }

    showTurnOptions() {
        if (this.state !== 1) return;
        this.selectDialog.showSelectDialog(
            `プレイヤー${this.currentPlayer +1}のターンです。`,
            ['ルーレット', 'ステータス', 'ターンスキップ'],
            choice => {
                switch (choice) {
                    case 0:
                        this.dialog.showDialog('ルーレットを止めてください。', true, () => {
                            // this.isDialogActive = true;
                            // ルーレット停止後に選ばれた数字を表示するダイアログを表示
                            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, false,() =>{
                                this.endTurn(false);
                            });
                        });


                        this.state = 2;
                        // this.isRouletteRunning = false;
                        this.startRoulette();

                        break;
                    case 1:
                        this.rouletteText.setText("");
                        this.dialog.showDialog('ステータスは以下のようになります。', true, () =>{
                        this.state = 4;
                        this.isRouletteRunning = false;
                        this.endTurn(true);
                        });
                        break;
                    case 2:
                        this.rouletteText.setText("");
                        this.dialog.showDialog('つぎの人にターンを渡します。', true, () =>{
                        this.state = 0;
                        this.isRouletteRunning = false;
                        this.endTurn(true)
                        });
                        break;
                }
                this.selectDialog.hideDialog();
            }
        );
    }
    showNextTurnButton() {
        // ボタンの背景
        const buttonBackground = this.add.rectangle(400, 300, 200, 50, 0x000000)
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setInteractive();
        
        // ボタンのテキスト
        const buttonText = this.add.text(400, 300, '次のターンへ!', {
            fontSize: '20px',
            fill: '#ffffff',
        }).setOrigin(0.5);
        buttonBackground.on('pointerover', () => {
            buttonText.setStyle({ fill: '#ff0' });
        });
    
        buttonBackground.on('pointerout', () => {
            buttonText.setStyle({ fill: '#ffffff' }); 
        });
    
        // ボタンがクリックされたら次のターンに移行
        buttonBackground.on('pointerdown', () => {
            this.endTurn(true);  // endTurnを呼び出して次のターンに進む
            buttonBackground.destroy();  // ボタン背景の削除
            buttonText.destroy();  // ボタンテキストの削除
        });
    }

}