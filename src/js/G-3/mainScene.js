import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';
import { changeForm } from './form.js';
import { playerData } from './main.js';
 
export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        this.initGameState();
    }
 
    // 初期ゲーム状態の設定
    initGameState() {
        this.gameBoard = null;
        this.currentPlayer = 1;
        this.turn = 1;
        this.yourTurn = false;
        this.state = 1;
        this.once = false;
        this.rouletteInterval = null;
        this.rouletteText = null;
        this.isRouletteRunning = false;
        this.isDialogActive = false;
    }
 
    preload() {
        this.utility = new Utility();
        this.gameBoard = new GameBoard(this, 1);
      
        this.gameBoard.preloadAssets();
 
        // プレイヤーアイコンのロード
        const playerIcons = [
            '/kansho/JINTAMA/characters/melondog.png',
            '/kansho/JINTAMA/characters/takugorira.png',
            '/kansho/JINTAMA/characters/obake.png',
            '/kansho/JINTAMA/characters/bakemon.png',
        ];
        playerIcons.forEach((icon, index) => {
            this.load.image(`playericon${index + 1}`, icon);
        });
    }
 
    create() {
        this.initializeGame();
        this.registerInputHandlers();

        // document.addEventListener("DOMContentLoaded", () => {
        //     const b = document.getElementById("cheat");

        //     b.addEventListener("click", event => {
        //         event.preventDefault(); // デフォルトのフォーム送信を防ぐ

        //         this.cheat();
        //     });
        // });
        
        // this.cheat();
        changeForm(player);
    }
 
    // ゲーム初期化
    initializeGame() {
        this.gameBoard.createMap();
 
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
        this.rouletteText = this.add.text(75, 300);
 
        this.initializePlayers();
    }
 
    // プレイヤーの初期化
    initializePlayers() {
        for (let i = 0; i < 4; i++) {
            const username = playerData[`User${i + 1}`];
            if (username) {
                const p = new Player(this, 40, 40 + i * 40, username.name);
                p.modifyStats({
                    score: username.score - p.stats.score,
                    hp: username.hp - p.stats.hp,
                    charm: username.charm - p.stats.charm,
                    sense: username.sense - p.stats.sense,
                });
                player.push(p);
            }
        }
        // プレイヤーデータを更新
        // console.log(player);
        changeForm(player);
    }
 
    // 入力ハンドラの登録
    registerInputHandlers() {
        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.isRouletteRunning) {
                this.stopRoulette(true);
              
            } else if(this.isDialogActive){
                this.dialog.hideDialog();
                this.isDialogActive = false;
                 this.rouletteText.setText(""); //ルーレットの数字を消す
                this.endTurn(true);
            }else if(this.state === 2 && !this.isRouletteRunning){
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
                this.endTurn(false);
            });
        } else {
            this.rouletteText.setText("");
            this.endTurn(true);  // ルーレット停止時に即座にターンを終了
        }
    }
    

    endTurn(forceHide) {
        if (forceHide) this.dialog.hideDialog();

        this.selectDialog.hideDialog();
        this.currentPlayer = (this.currentPlayer + 1) % player.length;
        this.yourTurn = this.turn === this.currentPlayer;
        this.state = this.yourTurn ? 1 : 0;
    }
 
    update() {
        const button = input();
        if (!this.dialog.visible && !this.selectDialog.visible) {
            this.gameBoard.update(button);
        }
        debugInfo.setText(`${button}, ${-this.gameBoard.mapX}, ${-this.gameBoard.mapY}`);
 
        if (!this.once && this.state === 1 && this.yourTurn) {
            this.showTurnOptions();
        }
    }
 
    showTurnOptions() {
        this.selectDialog.showSelectDialog(
            'あなたのターンです。',
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
}