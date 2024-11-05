// DialogSelectBox.js
export class DialogSelectBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.canHide = true;
        
        // 背景
        this.background = scene.add.graphics();
        this.background.fillStyle(0x000000, 0.7);
        this.background.fillRect(0, 0, width, height);
        
        // 基本のテキストスタイル
        this.textStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            wordWrap: { width: width - 40 }
        };
        
        // 選択肢のスタイル
        this.choiceStyle = {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff'
        };
        
        this.selectedChoiceStyle = {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffff00'
        };
        
        // メッセージテキスト
        this.text = scene.add.text(20, 20, '', this.textStyle);
        
        // 選択肢コンテナ
        this.choicesContainer = scene.add.container(0, 0);
        
        // 選択関連の状態管理
        this.currentChoice = 0;
        this.choices = [];
        this.isSelectable = false;
        this.callback = null;
        
        // コンテナに追加
        this.add([this.background, this.text, this.choicesContainer]);
        
        // シーンに追加
        scene.add.existing(this);
        
        // キーボード入力の設定
        this.setupKeyboardInput();
        
        // 初期状態は非表示
        this.setVisible(false);
    }
    
    setupKeyboardInput() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        // キーボード入力のリスナーを設定
        this.keyboardListener = (event) => {
            if (!this.visible) return;
            
            if (event.code === 'ArrowUp' && this.isSelectable) {
                this.currentChoice = (this.currentChoice - 1 + this.choices.length) % this.choices.length;
                this.updateChoicesDisplay();
            } else if (event.code === 'ArrowDown' && this.isSelectable) {
                this.currentChoice = (this.currentChoice + 1) % this.choices.length;
                this.updateChoicesDisplay();
            } else if (event.code === 'Enter') {
                
                if (this.callback) {
                    this.callback(this.currentChoice);
                    this.canHide = true;
                }
            }
        };
    }
    
    // 下位互換性のある基本的なダイアログ表示
    showDialog(message, canHide = false, callback = null) {
        this.canHide = canHide;
        this.resetState();
        this.text.setText(message);
        this.setVisible(true);

        if (callback === null && this.canHide) {
            callback = () => {
                this.hideDialog();
            };
        }
        // キーボードリスナーを設定
        this.scene.input.keyboard.on('keydown', this.keyboardListener);

        this.callback = callback;
    }
    
    // 選択肢付きダイアログ表示（新機能）
    showSelectDialog(message, choices = null, callback = null) {
        this.canHide = false;
        this.resetState();
        this.text.setText(message);
        this.setVisible(true);
        
        if (choices && choices.length > 0) {
            this.setupChoices(choices, callback);
        }
    }
    
    setupChoices(choices, callback) {
        // 既存の選択肢をクリア
        this.choicesContainer.removeAll(true);
        this.choices = [];
        this.currentChoice = 0;
        this.isSelectable = true;
        this.callback = callback;
        
        // 選択肢を作成
        choices.forEach((choice, index) => {
            const choiceText = this.scene.add.text(
                40,
                this.text.height + 40 + (index * 30),
                choice,
                this.choiceStyle
            );
            
            this.choices.push(choiceText);
            this.choicesContainer.add(choiceText);
        });
        
        // 最初の選択肢をハイライト
        this.updateChoicesDisplay();
        
        // キーボードリスナーを設定
        this.scene.input.keyboard.on('keydown', this.keyboardListener);
    }
    
    updateChoicesDisplay() {
        this.choices.forEach((choice, index) => {
            choice.setStyle(index === this.currentChoice ? this.selectedChoiceStyle : this.choiceStyle);
        });
    }
    
    resetState() {
        this.choicesContainer.removeAll(true);
        this.choices = [];
        this.currentChoice = -1;
        this.isSelectable = false;
        this.callback = null;
        this.scene.input.keyboard.removeListener('keydown', this.keyboardListener);
    }
    
    hideDialog() {
        this.setVisible(false);
        this.resetState();
    }
    
    // スタイルのカスタマイズ用メソッド
    setTextStyle(style) {
        this.textStyle = { ...this.textStyle, ...style };
        this.text.setStyle(this.textStyle);
    }
    
    setChoiceStyle(style) {
        this.choiceStyle = { ...this.choiceStyle, ...style };
        this.selectedChoiceStyle = { ...this.selectedChoiceStyle, ...style };
        this.updateChoicesDisplay();
    }
    
    setBackgroundColor(color, alpha = 0.7) {
        this.background.clear();
        this.background.fillStyle(color, alpha);
        this.background.fillRect(0, 0, this.width, this.height);
    }
}

// // 使用例を含むGameScene.js
// import DialogSelectBox from './DialogSelectBox.js';

// export default class GameScene extends Phaser.Scene {
//     constructor() {
//         super({ key: 'GameScene' });
//     }

//     create() {
//         // ダイアログの作成
//         this.dialog = new DialogSelectBox(this, 50, 50, 700, 300);
        
//         // 通常のダイアログとして使用（下位互換性）
//         const showSimpleDialog = this.add.text(10, 10, '通常ダイアログ', {
//             fontSize: '24px',
//             backgroundColor: '#333'
//         })
//         .setInteractive()
//         .on('pointerdown', () => {
//             this.dialog.showDialog('これは通常のダイアログメッセージです。');
//         });
        
//         // 選択肢付きダイアログとして使用（新機能）
//         const showSelectDialog = this.add.text(10, 50, '選択ダイアログ', {
//             fontSize: '24px',
//             backgroundColor: '#333'
//         })
//         .setInteractive()
//         .on('pointerdown', () => {
//             this.dialog.showSelectDialog(
//                 '何をしますか？',
//                 [
//                     '➤ 戦う',
//                     '➤ アイテム',
//                     '➤ 逃げる'
//                 ],
//                 (choice) => {
//                     switch(choice) {
//                         case 0:
//                             this.dialog.showDialog('戦闘を開始します！');
//                             break;
//                         case 1:
//                             this.dialog.showSelectDialog(
//                                 'どのアイテムを使用しますか？',
//                                 ['➤ ポーション', '➤ エーテル', '➤ 戻る'],
//                                 (itemChoice) => {
//                                     if (itemChoice === 2) {
//                                         this.dialog.hideDialog();
//                                     } else {
//                                         this.dialog.showDialog('アイテムを使用しました！');
//                                     }
//                                 }
//                             );
//                             break;
//                         case 2:
//                             this.dialog.showDialog('逃げ出した！');
//                             break;
//                     }
//                 }
//             );
//         });
//     }
// }