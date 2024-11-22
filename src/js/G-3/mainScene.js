import { initializeInput, input, updateDebugInfo, debugInfo, player } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';
import Player from './player.js';
 

// function initialize() {
//     gc = document.getElementById("test").getContext("2d");
//     paint();
// }
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

        for (let i = 0; i < 4; i++) {
            player[i] = new Player(this, 40, 40 + i * 40, 'player' + (i + 1));
        }
        // updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
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

        // let json_data;
        // var xhr = new XMLHttpRequest();

        // var parentPath = '../../js/G-3/map-data/';
        // switch(this.gameBoard.mapID) {
        //     case 0:
        //         xhr.open('GET', parentPath + 'first-map.json');
        //         // json = FileSystem.require ('.map-data/first-map.json');
        //         break;
        //         case 1:
        //         xhr.open('GET', parentPath + 'second-map.json');
        //         break;
        //         case 2:
        //         xhr.open('GET', parentPath + 'third-map.json');
        //         break;
        //         default:
        //         console.error("未知のマップIDです！");
        //         return;
        // }
        // xhr.send();

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         json_data = JSON.parse(xhr.response);
        //         return console.log(json_data);
        //     };
        // }
        
        // var mapData = json_data.layers[0].data;
        // console(mapData);

        let playerPosition = 9385;

        function checkPlayerPosition() {
            // プレイヤーが最後の data 配列の特定の位置にいる場合
            if (lastLayerData[playerPosition] === 9385) {
                console.log("プレイヤーがマス9385に到達しました！");
                const eventMessage = triggerRandomEvent(); // ランダムイベントを実行
                displayEvent(eventMessage); // 結果を表示する関数
            }
        }


        function displayEvent(message) {
            console.log(`イベント: ${message}`);
            // 必要に応じてUIに反映する処理を追加
        }

        checkPlayerPosition();
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
                // GameBoard.movecharacter(finalNumber);
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
