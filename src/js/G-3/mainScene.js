import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';

import { getRandomEvent } from './event.js';
import { UiScene } from './uiScene.js';
import { changeForm } from './form.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        
        // 初期ゲーム状態の設定
        this.gameBoard = null;
        this.currentPlayer = 0;
        this.turn = 1;
        this.yourTurn = false;
        this.state = 1;
        this.once = false;

        this.rouletteInterval = null;
        this.rouletteText = null;
        this.isRouletteRunning = false;
        this.isDialogActive = false;

        this.uiScene = null;
    }
 
    preload() {
        this.gameBoard = new GameBoard(this, 0); //マップ変更するために変える
        this.gameBoard.preloadAssets();
      
        this.utility = new Utility();
 
        // プレイヤーアイコンのロード
        const playerIcons = [
            '/kansho/JINTAMA/characters/melondog',
            '/kansho/JINTAMA/characters/takugorira',
            '/kansho/JINTAMA/characters/obake',
            '/kansho/JINTAMA/characters/bakemon',
        ];
        playerIcons.forEach((icon, index) => {
            this.load.image(`playericon${index + 1}`, icon + ".png");
            this.load.image(`playericon${index + 1}_up`, icon + "_back.png");
            this.load.image(`playericon${index + 1}_side1`, icon + "_yoko.png");
            this.load.image(`playericon${index + 1}_side2`, icon + "_yoko2.png");
        });
    }
 
    create() {
        let dialogW = 1000, dialogH = 500, dialogX = 500, dialogY = 1000;
        this.dialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
        this.selectDialog = new DialogSelectBox(this, dialogX, dialogY, dialogW, dialogH);
        
        this.gameBoard.createMap();

        this.initializeGame();
        this.registerInputHandlers();
        
        // changeForm(player); // playerを直接使用
    }
 
    // ゲーム初期化
    initializeGame() { 
        // ダイアログボックスの作成
        const dialogConfig = { width: 700, height: 300, x: 50, y: this.game.config.height - 350 };
        this.dialog = new DialogSelectBox(this, dialogConfig.x, dialogConfig.y, dialogConfig.width, dialogConfig.height);
        this.selectDialog = new DialogSelectBox(this, dialogConfig.x, dialogConfig.y, dialogConfig.width, dialogConfig.height);
 
        initializeInput(this);
        this.state = 1;
        this.once = false;
        this.showTurnOptions();

        // デバッグ情報の初期化
        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
        
        this.rouletteText = this.add.text(1000, 800,'',{fontSize:'60px',backgroundColor: '#333333'});

        // UiSceneを起動
        this.scene.launch('uiScene');
    }
 
    // 入力ハンドラの登録
    registerInputHandlers() {

        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isRouletteRunning) {
                this.stopRoulette(true);
              
            } else if(this.isDialogActive) {
                this.dialog.hideDialog();
                this.isDialogActive = false;

                this.rouletteText.setText(""); //ルーレットの数字を消す
                this.showNextTurnButton();

                this.rouletteText.setText(""); //ルーレットの数字を消す
                // this.showNextTurnButton();
                // this.endTurn(true);

            } else if(this.state === 2 && !this.isRouletteRunning){
                this.startRoulette();
            }
            // }else{
            //     this.startRoulette();
            // }
        
        });
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
        clearInterval(this.rouletteInterval);
        this.rouletteInterval = null;
      
        this.isRouletteRunning = false;
        const finalNumber = this.rouletteText.text;

        if (isEnterKey) {

            if (!this.isDialogActive) {
                this.isDialogActive = true;
                // currentPlayer が配列の範囲内かチェック
                const playerIndex = this.currentPlayer >= 0 && this.currentPlayer < player.length ? 
                    this.currentPlayer : 0;
                const currentPlayer = player[playerIndex];
                if (!currentPlayer) {
                    console.error('Player not found:', playerIndex);
                    return;
                }
 
                const event = getRandomEvent();
                const eventResult = event.action(currentPlayer);
                let eventLog = `${currentPlayer.name}のイベント: ${event.name}\n${eventResult}`;
 
                this.dialog.showDialog(eventLog, true, () => {});
            }
        } else {
            this.rouletteText.setText("");
            // this.endTurn(true);

        }
    }
    

    endTurn(forceHide) {
        if (forceHide) this.dialog.hideDialog();

        this.selectDialog.hideDialog();

        console.log("=== endTurn() 開始 ===");
        console.log(`現在のプレイヤー: Player ${this.currentPlayer + 1}`);
        this.currentPlayer = (this.currentPlayer + 1);
        this.currentPlayer %= player.length;
        // this.currentPlayer = (this.currentPlayer + 1) % player.length;
        console.log(`次のプレイヤー: Player ${this.currentPlayer + 1}`);
        console.log(`player.length: ${player.length}, currentPlayer: ${this.currentPlayer}`);
        console.log("=== endTurn() 終了 ===");

        this.turn = this.currentPlayer;
        this.yourTurn = (this.currentPlayer === 0);
        this.state =  1;
        // this.showNextTurnButton()
        this.yourTurn = (this.turn === this.currentPlayer);
      
        this.state = this.yourTurn ? 1 : 0;
    }
 
    update() {
        const button = input();
        
        if (!this.dialog.visible && !this.selectDialog.visible) {
            this.gameBoard.update(button);
        }
      
        debugInfo.setText(button + ", " + -this.gameBoard.mapX + ", " + -this.gameBoard.mapY)
 
        // 必要に応じて状態に応じた処理を追加
        // 繰り返し呼び出さないようにする
        // this.showTurnOptions();
    }
    showTurnOptions() {

        if(this.state !== 1) return;
        this.selectDialog.showSelectDialog(
            `プレイヤー${this.currentPlayer+1}のターンです。`,

            ['ルーレット', 'ステータス', 'ターンスキップ'],

            choice => {
                switch (choice) {
                    case 0:
                        this.dialog.showDialog('ルーレットを止めてください。', true, () => {
                            // this.isDialogActive = true;
                            // ルーレット停止後に選ばれた数字を表示するダイアログを表示
                            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, false,() =>{
                                // this.endTurn(true);
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
                        this.showTurnOptions();
                        this.state--;
                        });
                        break;
                    case 2:
                        this.rouletteText.setText("");
                        this.dialog.showDialog('つぎの人にターンを渡します。', true, () =>{
                        this.state = 0;
                        this.isRouletteRunning = false;
                        this.endTurn(true)
                        this.showTurnOptions();
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
            this.showTurnOptions();
            buttonBackground.destroy();  // ボタン背景の削除
            buttonText.destroy();  // ボタンテキストの削除
        });
    }
}