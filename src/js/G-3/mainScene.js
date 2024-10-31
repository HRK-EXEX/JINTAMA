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
        this.gameBoard = new GameBoard(this);
        this.gameBoard.preloadAssets();

        // ユーティリティクラスを使用可能に
        this.utility = new Utility();
    }

    create() {
        // マップの作成
        this.gameBoard.createMap();

        // 入力の初期化
        initializeInput(this);

        // クリックでダイアログを表示
        input.on('pointerdown', () => {
            DialogSelectBox.showDialog('これはテストメッセージです。\nダイアログボックスのテストです。');
        });
        
        // ESCキーでダイアログを非表示
        input.keyboard.on('keydown-ESC', () => {
            DialogSelectBox.hideDialog();
        });

        // デバッグ情報の初期化
        updateDebugInfo(this.add.text(0, 0, 'Hello World', { fontFamily: 'serif' }));
    }

    update() {
        const button = input();
        this.gameBoard.update(button);
        debugInfo.setText(button);
    }
}