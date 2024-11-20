export function triggerRandomEvent() {
  const events = [
    { message: "アイテムを入手しました！", effect: () => console.log("アイテム追加処理を実行") },
    { message: "モンスターに遭遇しました！", effect: () => console.log("戦闘開始処理を実行") },
    { message: "トラップにかかりました！", effect: () => console.log("ダメージ計算処理を実行") },
    { message: "ボーナスポイントを獲得しました！", effect: () => console.log("ポイント追加処理を実行") },
    { message: "マスを3つ進む！", effect: () => console.log("プレイヤー位置更新処理を実行") }
];


// export function triggerRandomEvent() {
//   const randomIndex = Math.floor(Math.random() * events.length);
//   const selectedEvent = events[randomIndex];

//   console.log(`イベント発生: ${selectedEvent.message}`);
//   selectedEvent.effect(); // イベントの効果を実行
//   return selectedEvent.message; // メッセージを返す（UI表示などで利用可能）
// }


// マスにイベント情報を格納
// const events = {
// 1: "イベント",
// }

// プレイヤーの現在位置
 let playerPosition = 9394;


// プレイヤーがサイコロを振って進む
function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    playerPosition += diceRoll;
    console.log(`サイコロの目: ${diceRoll} | 新しい位置: ${playerPosition}`);
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

}