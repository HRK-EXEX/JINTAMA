var username = document.getElementById('username1').textContent;
console.log(username);
import { MainScene } from "./mainScene.js";

const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight // any height you want

const arr=username.split(',');

//ゲームに関する設定
const CONFIG = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    scene: MainScene,
    antialias: false
}

//ゲームオブジェクトの生成
const GAME = new Phaser.Game(CONFIG)
