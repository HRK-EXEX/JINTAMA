// var username = document.getElementById('username1').textContent;
// console.log(username);

import { MainScene } from "./mainScene.js";
// import { triggerRandomEvent } from './event.js';
 
const DEFAULT_WIDTH = window.innerWidth
const DEFAULT_HEIGHT = window.innerHeight // any height you want

function getSessionData() {
    try {
        const element = document.getElementById('session-data');
        const jsonText = element.textContent.trim();
        // console.log('JSON内容:', jsonText);
        return JSON.parse(jsonText);
    } catch (error) {
        console.error('JSONパースエラー:', error);
        return null;
    }
}

export const playerData = getSessionData();
export const playerJson = document.getElementById('session-data').textContent.trim();

// console.log(playerData);
// console.log(playerJson);


// const arr=username.split(',');
 
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