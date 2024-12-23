import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard, isMoving } from './gameBoard.js';
import Player from './player.js';
import { ImageMover } from './animer.js';

export const relatedX = -792;
export const relatedY = -1440;

let mapId = 1;

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
        this.gameBoard = new GameBoard(this, mapId); //マップ変更するために変える
        this.gameBoard.preloadAssets();
        this.utility = new Utility();

        if (mapId == 0) {
            let chara = new Array();

            for (let i = 0; i < 8; i++) {
                let rnd = Math.random() * 8;
                chara[i] = 'egg' + (rnd.toFixed() + 1);

                this.load.image(chara[i], '/characters/eggs/' + chara[i] + '.png');
            }
        } else {
            let charaTable = [
                'bakemon',
                'fukurou',
                'ikari',
                'kaba',
                'kaeru',
                'koara',
                'melondog',
                'obake',
                'odebu',
                'takugorira'
            ];

            let chara = new Array();

            for (let i = 0; i < 4; i++) {
                let rnd = Math.random() * (charaTable.length - 1);
                chara[i] = charaTable[rnd.toFixed()];

                this.load.image('playericon' + (i + 1) + '', '/characters/' + chara[i] + '.png');
                this.load.image('playericon' + (i + 1) + '_up', '/characters/' + chara[i] + '_back.png');
                this.load.image('playericon' + (i + 1) + '_side1', '/characters/' + chara[i] + '_yoko.png');
                this.load.image('playericon' + (i + 1) + '_side2', '/characters/' + chara[i] + '_yoko2.png');
            }
        }
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
            } else if (this.isDialogActive) {
                this.dialog.hideDialog();
                this.isDialogActive = false;
                this.rouletteText.setText(""); //ルーレットの数字を消す
                this.showNextTurnButton();
            } else if (isMoving) {
            } else if (this.state === 2 && !this.isRouletteRunning) {
                this.startRoulette();
            }
            // }else{
            //     this.startRoulette();
            // }
        });

        console.log(relatedX, relatedY);
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
            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, true, () => {
                this.gameBoard.movechar(this.currentPlayer, finalNumber);
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
        console.log(`現在のプレイヤー: Player ${this.currentPlayer + 1}`);

        this.currentPlayer = (this.currentPlayer + 1) % player.length;;

        console.log(`次のプレイヤー: Player ${this.currentPlayer + 1}`);
        console.log(`player.length: ${player.length}, currentPlayer: ${this.currentPlayer}`);
        console.log("=== endTurn() 終了 ===");


        this.turn = this.currentPlayer;
        this.yourTurn = (this.currentPlayer === 0);
        this.state = 1;
        this.showNextTurnButton
        // デバッグ用ログ


    }

    update() {
        const button = input();
        // 現在のターン情報を表示
        // console.log(`Update中 - 現在のプレイヤー: Player ${this.currentPlayer +1}`);
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
            `プレイヤー${this.currentPlayer + 1}のターンです。`,
            ['ルーレット', 'ステータス', 'ターンスキップ'],
            choice => {
                switch (choice) {
                    case 0:
                        this.dialog.showDialog('ルーレットを止めてください。', true, () => {
                            // this.isDialogActive = true;
                            // ルーレット停止後に選ばれた数字を表示するダイアログを表示
                            this.dialog.showDialog(`選ばれた数字は: ${finalNumber}`, false, () => {
                                this.endTurn(false);
                            });
                        });


                        this.state = 2;
                        // this.isRouletteRunning = false;
                        this.startRoulette();

                        break;
                    case 1:
                        this.rouletteText.setText("");
                        this.dialog.showDialog('ステータスは以下のようになります。', true, () => {
                            this.state = 4;
                            this.isRouletteRunning = false;
                            this.endTurn(true);
                        });
                        break;
                    case 2:
                        this.rouletteText.setText("");
                        this.dialog.showDialog('つぎの人にターンを渡します。', true, () => {
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
