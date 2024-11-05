import { initializeInput, input, updateDebugInfo, debugInfo } from './initialize.js';
import { DialogSelectBox } from './dialogSelectBox.js';
import { Utility } from './utility.js';
import { GameBoard } from './gameBoard.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
        this.gameBoard = null;
    }

    preload() {
        this.gameBoard = new GameBoard(this, 1);
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

        // Zキーでダイアログを表示
        this.input.keyboard.on('keydown-Z', () => {
            if (this.selectDialog.visible) this.selectDialog.hideDialog();
            this.dialog.showDialog('これはテストメッセージです。\nダイアログボックスのテストです。', null);
        });

        // Xキーで選択ダイアログを表示
        this.input.keyboard.on('keydown-X', () => {
            if (this.dialog.visible) this.dialog.hideDialog();
            this.selectDialog.showSelectDialog(
                'これはテストメッセージです。\n選択ダイアログボックスのテストです。',
                ['選択肢１', '選択肢２', '選択肢３'],
                (choice) => {
                    switch (choice) {
                        case 0: this.dialog.showDialog('選択肢１が選択されました'); break;
                        case 1: this.dialog.showDialog('選択肢２が選択されました'); break;
                        case 2: this.dialog.showDialog('選択肢３が選択されました'); break;
                    }
                    this.selectDialog.hideDialog();
                }
            );
        });
        
        // ESCキーでダイアログを非表示
        this.input.keyboard.on('keydown-ESC', () => {
            this.dialog.hideDialog();
            this.selectDialog.hideDialog();
        });

        // デバッグ情報の初期化
        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
    }

    update() {
        const button = input();
        if (!this.dialog.visible && !this.selectDialog.visible)
            this.gameBoard.update(button);
        debugInfo.setText(button);
    }
}