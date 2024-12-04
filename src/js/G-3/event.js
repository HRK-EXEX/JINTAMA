// event.js
export function getRandomEvent(){
  const events = [
    {
        name: '幸福度増加',
        action: (player) => {
           player.modifyStats({ score: 10}); // プレイヤーのゴールドを増やす
            console.log(`${player.name}のイベント：幸福度増加 - 幸福度: ${player.stats.score}`);
        },
    },
    {
        name: '魅力減少',
        action: (player) => {
          player.modifyStats({ charm: -5}); // プレイヤーのゴールドを減らす
            console.log(`${player.name}のイベント：魅力減少 - 魅力度: ${player.stats.charm}`);
        },
    },
  ];
   
   
  // ランダムなイベントを取得
  const randomIndex = Math.floor(Math.random() * events.length);
    return  events[randomIndex];
  }
   
  export function triggerRandomEvent(player){
    const event = getRandomEvent();
    console.log(`ランダムイベント: ${event.name}`);
    event.action(player);
  }