// event.js
export function getRandomEvent() {
  const events = [ {
          name: '魅力減少',
          action: (player) => {
              if (player && typeof player.modifyStats === 'function') {
                  player.modifyStats({ charm: charm-5 });
                  return `魅力度: ${player.stats.charm}`;
              }
              console.error('Invalid player object:', player);
              return '魅力減少失敗';
          },
      },
      {
        name: '魅力増加',
        action: (player) => {
            if (player && typeof player.modifyStats === 'function') {
                player.modifyStats({ charm: charm+5 });
                return `魅力度: ${player.stats.charm}`;
            }
            console.error('Invalid player object:', player);
            return '魅力増加失敗';
        },
    },
  {
    name: '体力増加',
    action: (player) => {
        if (player && typeof player.modifyStats === 'function') {
            player.modifyStats({ hp: hp+5 });
            return `体力: ${player.stats.hp}`;
        }
        console.error('Invalid player object:', player);
        return '体力増加失敗';
    },
},
{
  name: '体力減少',
  action: (player) => {
      if (player && typeof player.modifyStats === 'function') {
          player.modifyStats({ hp: hp-5 });
          return `体力: ${player.stats.hp}`;
      }
      console.error('Invalid player object:', player);
      return '体力減少失敗';
  },
},
{
  name: 'センス増加',
  action: (player) => {
      if (player && typeof player.modifyStats === 'function') {
          player.modifyStats({ sense: sense+5 });
          return `魅力度: ${player.stats.sense}`;
      }
      console.error('Invalid player object:', player);
      return 'センス増加失敗';
  },
},
{
  name: 'センス減少',
  action: (player) => {
      if (player && typeof player.modifyStats === 'function') {
          player.modifyStats({ sense: sense-5 });
          return `センス減少: ${player.stats.sense}`;
      }
      console.error('Invalid player object:', player);
      return 'センス減少失敗';
  },
},

{
  name: '魅力激減少',
  action: (player) => {
      if (player && typeof player.modifyStats === 'function') {
          player.modifyStats({ charm: charm-20 });
          return `魅力度: ${player.stats.charm}`;
      }
      console.error('Invalid player object:', player);
      return '魅力減少失敗';
  },
},
{
name: '魅力激増加',
action: (player) => {
    if (player && typeof player.modifyStats === 'function') {
        player.modifyStats({ charm: charm+20 });
        return `魅力度: ${player.stats.charm}`;
    }
    console.error('Invalid player object:', player);
    return '魅力増加失敗';
},
},
{
name: '体力激増加',
action: (player) => {
if (player && typeof player.modifyStats === 'function') {
    player.modifyStats({ hp: hp+25 });
    return `体力: ${player.stats.hp}`;
}
console.error('Invalid player object:', player);
return '体力増加失敗';
},
},
{
name: '体力激減少',
action: (player) => {
if (player && typeof player.modifyStats === 'function') {
  player.modifyStats({ hp: hp-30 });
  return `体力: ${player.stats.hp}`;
}
console.error('Invalid player object:', player);
return '体力減少失敗';
},
},
{
name: 'センス激増加',
action: (player) => {
if (player && typeof player.modifyStats === 'function') {
  player.modifyStats({ sense: sense+30 });
  return `魅力度: ${player.stats.sense}`;
}
console.error('Invalid player object:', player);
return 'センス増加失敗';
},
},
{
name: 'センス激減少',
action: (player) => {
if (player && typeof player.modifyStats === 'function') {
  player.modifyStats({ sense: sense-25 });
  return `センス減少: ${player.stats.sense}`;
}
console.error('Invalid player object:', player);
return 'センス減少失敗';
},
},
{
  name: 'スペシャルイベント',
  action: (player) => {
  if (player && typeof player.modifyStats === 'function') {
    player.modifyStats({ charm: charm+15, hp: hp+15, sense: sense+15 });
    return `大幅にUP!!: ${player.stats.charm}`;
  }
  console.error('Invalid player object:', player);
  return 'スペシャル失敗';
  },
  },
  {
    name: 'アンラッキーイベント',
    action: (player) => {
    if (player && typeof player.modifyStats === 'function') {
      player.modifyStats({ charm: charm-10, hp: hp-10, sense: sense-10 });
      return `大幅にDown!!: ${player.stats.charm}`;
    }
    console.error('Invalid player object:', player);
    return 'スペシャル失敗';
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