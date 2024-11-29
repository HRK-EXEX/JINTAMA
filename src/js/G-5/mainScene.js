import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';
import { ImageMover } from './animer.js';






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
        this.gameBoard = new GameBoard(this, 1); //マップ変更するために変える
        this.gameBoard.preloadAssets();
        this.utility = new Utility();
        this.load.image('playericon1', '/characters/melondog.png');
        this.load.image('playericon2', '/characters/takugorira.png');
        this.load.image('playericon3', '/characters/obake.png');
        this.load.image('playericon4', '/characters/bakemon.png');
        this.load.image('playericon1_up', '/characters/melondog_back.png');
        this.load.image('playericon1_side1', '/characters/melondog_yoko.png');
        this.load.image('playericon1_side2', '/characters/melondog_yoko2.png');
        


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
                this.endTurn(true);
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
                this.gameBoard.movechar(this.currentPlayer,finalNumber)
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
        const imageMover = new ImageMover('/characters/eggs/egg6.png', 'movingImg');
        imageMover.startAnimation();

        this.selectDialog.showSelectDialog(
            'あなたのターンです。',
            ['ルーレット', 'ステータス', 'ターンスキップ'],
            choice => {
                switch (choice) {
                    case 0:
                        this.dialog.showDialog('ルーレットを止めてください。', true, () => {
                            // ダイアログが表示された後に非表示処理を実行
                            this.scene.tweens.add({
                                targets: this.dialog,    // ダイアログをターゲットに
                                alpha: 0,                // 完全に透明にする
                                duration: 1000,          // 1秒かけてフェードアウト
                                onComplete: () => {
                                    // フェードアウト後に完全に非表示にする
                                    this.scene.tweens.killTweensOf(this.dialog);  // 現在のアニメーションをキャンセル
                                    this.dialog.setVisible(false);
                        
                                    // 非表示後にルーレットを開始
                                   
                                }
                    });
                });
               
                // ルーレットを開始
                this.state = 4;
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
