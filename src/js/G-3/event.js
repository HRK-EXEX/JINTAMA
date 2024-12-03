// event.js
export function getRandomEvent() {
  const events = [
      {
          name: '幸福度増加',
          action: (player) => {
              if (player && typeof player.modifyStats === 'function') {
                  player.modifyStats({ score: 10 });
                  return `幸福度: ${player.stats.score}`;
              }
              console.error('Invalid player object:', player);
              return '幸福度増加失敗';
          },
      },
      {
          name: '魅力減少',
          action: (player) => {
              if (player && typeof player.modifyStats === 'function') {
                  player.modifyStats({ charm: -5 });
                  return `魅力度: ${player.stats.charm}`;
              }
              console.error('Invalid player object:', player);
              return '魅力減少失敗';
          },
      },
  ];

  const randomIndex = Math.floor(Math.random() * events.length);
  return events[randomIndex];
}

export function triggerRandomEvent(player) {
  if (!player) {
      console.error('Player object is undefined');
      return;
  }
  const event = getRandomEvent();
  console.log(`ランダムイベント: ${event.name}`);
  const result = event.action(player);
  console.log(result);
}