// グローバル変数の定義
export let fieldMap = null;
export let cursor;
export let key;
export let debugInfo;
export let loopMap = null;

// プレイヤー関連
export let player = [];
export let playerUi = [];

// 入力処理関数
export let input;

// 入力初期化関数
export function initializeInput(scene) {
    cursor = scene.input.keyboard.createCursorKeys();
    key = scene.input.keyboard.addKeys({
        'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
        'ENTER': Phaser.Input.Keyboard.KeyCodes.ENTER,
        'BACKSPACE': Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
        'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
    });

    input = function() {
        return (cursor.left.isDown    ? 1<<0 : 0) + 
               (cursor.right.isDown   ? 1<<1 : 0) + 
               (cursor.up.isDown      ? 1<<2 : 0) + 
               (cursor.down.isDown    ? 1<<3 : 0) +
               (cursor.shift.isDown   ? 1<<4 : 0) +
               (key.SPACE.isDown      ? 1<<5 : 0) +
               (key.ENTER.isDown      ? 1<<6 : 0) +
               (key.BACKSPACE.isDown  ? 1<<7 : 0) +
               (key.ESC.isDown        ? 1<<8 : 0);
    };
}

// グローバル変数を更新する関数
export function updateFieldMap(newFieldMap) {
    fieldMap = newFieldMap;
}

export function updateLoopMap(newLoopMap) {
    loopMap = newLoopMap;
}

export function updateDebugInfo(newDebugInfo) {
    debugInfo = newDebugInfo;
}