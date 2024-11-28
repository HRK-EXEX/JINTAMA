export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y, name = 'Player 1') {
        super(scene, x, y);
        
        this.name = name;
        this.color = new Phaser.Display.Color(0, 0, 0);
        
        // 基本ステータス
        this.stats = {
            score: 0,    // 幸福度
            hp: 100,     // 体力
            charm: 50,   // 魅力
            sense: 50    // センス
        };
        
        // ステータスの最大・最小値
        this.maxStats = {
            score: 999,
            hp: 999,
            charm: 999,
            sense: 999
        };
        
        this.minStats = {
            score: 0,
            hp: 0,
            charm: 0,
            sense: 0
        };
        this.sprite = scene.add.sprite(70, 70, 'playericon'); // 画像の中心が(0, 0)になるように調整
        this.sprite.setScale(3,3);; // 画像サイズの調整
        this.add(this.sprite); // コンテナに画像を追加
        
        // プレイヤーの見た目の設定
        this.setupSprite();
        
        // ステータス表示テキスト
        this.statusText = scene.add.text(30, -10, '', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 5, y: 5 }
        });
        
        // コンテナに追加
        this.add([this.sprite, this.statusText]);
        
        // シーンに追加
        scene.add.existing(this);
        
        // ステータス表示を更新
        this.updateStatusDisplay();
    }

    setupSprite() {
        // プレイヤーの見た目（仮の円で表現）
        // this.sprite = this.scene.add.circle(0, 0, 15, this.color.random().color32);
        this.sprite = this.scene.add.sprite(0, 0, 'playericon');
        this.sprite.setInteractive();
       
    
        // ホバー効果
        this.sprite.on('pointerover', () => {
            // ホバー時に、たとえば画像の透明度を少し変えるなどの効果
            this.sprite.setAlpha(0.8);
            this.showDetailedStatus();
        });
        
        this.sprite.on('pointerout', () => {
            // ホバーを外したときに透明度を元に戻す
            this.sprite.setAlpha(1);
            this.hideDetailedStatus();
        // クリック可能にする
        // this.sprite.setInteractive();
        
        // // ホバー効果
        // this.sprite.on('pointerover', () => {
        //     this.sprite.setFillStyle(this.color.random().color32);
        //     this.showDetailedStatus();
        // });
        
        // this.sprite.on('pointerout', () => {
        //     this.sprite.setFillStyle(this.color.random().color32);
        //     this.hideDetailedStatus();
        });
    }
    
    // ステータスの変更メソッド（安全に値を変更）
    modifyStats(statChanges) {
        Object.entries(statChanges).forEach(([stat, change]) => {
            if (stat in this.stats) {
                this.stats[stat] = Math.max(
                    this.minStats[stat],
                    Math.min(
                        this.maxStats[stat],
                        this.stats[stat] + change
                    )
                );
            }
        });
        
        this.updateStatusDisplay();
        
        // ステータス変更後のイベントを発火
        this.emit('statsChanged', this.stats);
        
    }
    
    // 基本的なステータス表示の更新
    updateStatusDisplay() {
        this.statusText.setText(this.name);
    }
    
    // 詳細なステータス表示
    showDetailedStatus() {
        const detailedText = `
${this.name}
幸福度: ${this.stats.score}
体力: ${this.stats.hp}
魅力: ${this.stats.charm}
センス: ${this.stats.sense}`;
        
        this.statusText.setText(detailedText);
    }
    
    // 詳細表示を隠す
    hideDetailedStatus() {
        this.updateStatusDisplay();
    }
    
    // 移動メソッド（アニメーション付き）
    moveToPosition(x, y, duration = 500) {
        return new Promise((resolve) => {
            this.scene.tweens.add({
                targets: this,
                x: x,
                y: y,
                duration: duration,
                ease: 'Power2',
                onComplete: resolve
            });
        });
    }
    
    // ターン開始時の処理
    startTurn() {
        this.sprite.setFillStyle(0xffff00); // 黄色でハイライト
        this.showDetailedStatus();
    }
    
    // ターン終了時の処理
    endTurn() {
        this.sprite.setFillStyle(0x00ff00); // 通常の緑色に戻す
        this.hideDetailedStatus();
    }
    
    // 勝利条件のチェック
    checkWinCondition() {
        // 例: 幸福度が500以上で勝利
        return this.stats.score >= 500;
    }
    
    // セーブデータの作成
    getSaveData() {
        return {
            name: this.name,
            stats: { ...this.stats },
            position: { x: this.x, y: this.y }
        };
    }
    
    // セーブデータのロード
    loadSaveData(saveData) {
        this.name = saveData.name;
        this.stats = { ...saveData.stats };
        this.x = saveData.position.x;
        this.y = saveData.position.y;
        this.updateStatusDisplay();
    }
    
    // 各種ゲームイベントの処理メソッド
    onWorkEvent() {
        this.modifyStats({
            score: 10,
            hp: -5,
            sense: 2
        });
        return `${this.name}は仕事で成長した！`;
    }
    
    onRestEvent() {
        this.modifyStats({
            hp: 20,
            score: 5
        });
        return `${this.name}は休養をとった！`;
    }
    
    onSocialEvent() {
        this.modifyStats({
            charm: 5,
            sense: 3,
            score: 8
        });
        return `${this.name}は人脈を広げた！`;
    }
    
    onStudyEvent() {
        this.modifyStats({
            sense: 10,
            score: 3,
            hp: -2
        });
        return `${this.name}は勉強して成長した！`;
    }
}

