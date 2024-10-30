export class DialogClass extends Phaser.GameObjects.Container {
    x;
    y;
    width;
    height;
    message;
    
    _margin;
    _padding;

    /**
     * scene: Phaser.Scene, x:number, y:number, text:string, dialogProps: DialogProps
     * 
     */ 
    constructor(scene, x, y, width, height) {
        super(scene, x, y)

        if (width) {
            this._width = width;
        } else {
            this._width = typeof scene.game.config.width == "string" ? parseInt(scene.game.config.width): scene.game.config.width;
        }

        if (height) {
            this._height = height;
        } else {
            this._height = typeof scene.game.config.height == "string" ? parseInt(scene.game.config.height): scene.game.config.height;
        }
        this._margin = 10;
        this._padding = 10;

        this.box = new Phaser.GameObjects.Graphics(scene);
        this.box.fillStyle(0x0000ff, 1);
        this.box.fillRoundedRect(this._margin, this._margin, this._width - this._margin * 2, this._height - this._margin * 2, this._padding / 2);
        this.box.lineStyle(2, 0xffffff, 1);
        this.box.strokeRoundedRect(this._margin, this._margin, this._width - this._margin * 2, this._height - this._margin * 2, this._padding / 2);
        this.add(this.box);

        this.message = "";
        this.text = new Phaser.GameObjects.Text(scene, this._padding + this._margin, this._padding + this._margin, this._msg, { fontSize: "20px", color: "#fff" });
        this.add(this.text);

        scene.add.existing(this);
    }

    setMessage(text) {
        this.message = text;
        this.text.text = this._msg;
    }

    getMessage() {
        return this._msg;
    }
}