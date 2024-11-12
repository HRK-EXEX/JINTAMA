// マスにイベント情報を格納
const events = {
1: "イベント",
}

// プレイヤーの現在位置
let playerPosition = 1;


// プレイヤーがサイコロを振って進む
function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    playerPosition += diceRoll;
    handleEvent(playerPosition);
  }


  // 指定されたマスのイベントを処理する関数
function handleEvent(position) {
    const event = events[position];
    if (event) {
      console.log(`マス ${position}: ${event}`);
    } else {
      console.log(`マス ${position}: 特別なイベントはありません。`);
    }
  }