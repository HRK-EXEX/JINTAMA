// event.js
export function getRandomEvent() {
	const events = 
	[
		{
			name: '深爪になった',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: -5 });
					return `減少値: 5\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力減少失敗';
			},
		},
		{
			name: '群れを追い出される',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: -4 });
					return `減少値: 4\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力減少失敗';
			},
		},
		{
			name: '通行人に撫でられる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: +5 });
					return `増加値: 5\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力増加失敗';
			},
		},
		{
			name: 'ペットになる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: +3 });
					return `増加値: 3\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力増加失敗';
			},
		},
		{
			name: '群れに遭遇した',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: +4 });
					return `増加値: 4\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力増加失敗';
			},
		},
		{
			name: '大好物を食べた',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: +5 });
					return `増加値: 5\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力増加失敗';
			},
		},
		{
			name: '武器を拾う',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: +3 });
					return `増加値: 3\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力増加失敗';
			},
		},
		{
			name: '絶滅危惧種に指定されて保護される',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: +8 });
					return `増加値: 8\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力増加失敗';
			},
		},
		{
			name: 'リードは嫌だ！',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: +6 });
					return `増加値: 6\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力増加失敗';
			},
		},
		{
			name: '狩猟されかける',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -5 });
					return `減少値: 5\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力減少失敗';
			},
		},
		{
			name: '罠にかかる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -7 });
					return `減少値: 7\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力減少失敗';
			},
		},
		{
			name: '嫌いなものを食べた',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -7 });
					return `減少値: 7\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力減少失敗';
			},
		},
		{
			name: '雨が降る',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -4 });
					return `減少値: 4\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力減少失敗';
			},
		},
		{
			name: '強者に襲われる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -10 });
					return `減少値: 10\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力減少失敗';
			},
		},
		{
			name: 'ショーで優ショー',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: +5 });
					return `増加値: 5\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス増加失敗';
			},
		},
		{
			name: '毛づくろいをした',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: +3 });
					return `増加値: 3\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス増加失敗';
			},
		},
		{
			name: 'モンスターの友達ができる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: +8 });
					return `増加値: 8\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス増加失敗';
			},
		},
		{
			name: '俊足を履く',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: +10 });
					return `増加値: 10\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス増加失敗';
			},
		},
		{
			name: '詐欺にあう',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: -5 });
					return `減少値: 5\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス減少失敗';
			},
		},
		{
			name: '怒られる',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: -9 });
					return `減少値: 9\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス減少失敗';
			},
		},
		{
			name: 'すべてを無に帰す',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: -15 });
					return `減少値: 15\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス減少失敗';
			},
		},
		{
			name: '石橋を叩いたら割れた',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: -9 });
					return `減少値: 9\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス減少失敗';
			},
		},

		{
			name: 'ハゲてきた・・・',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: -20 });
					return `減少値: 20\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力激減少失敗';
			},
		},
		{
			name: '芸をおぼえた',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: +20 });
					return `増加値: 20\n現在の魅力度: ${player.stats.charm}`;
				}
				console.error('Invalid player object:', player);
				return '魅力激増加失敗';
			},
		},
		{
			name: '再生する',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: +25 });
					return `増加値: 25\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力激増加失敗';
			},
		},
		{
			name: '冬眠する',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ hp: -30 });
					return `減少値: 30\n現在の体力: ${player.stats.hp}`;
				}
				console.error('Invalid player object:', player);
				return '体力激減少失敗';
			},
		},
		{
			name: '協調性を覚える',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: +30 });
					return `増加値: 30\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス激増加失敗';
			},
		},
		{
			name: '自分が何者かわからなくなった',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ sense: -25 });
					return `減少値: 25\n現在のセンス: ${player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'センス激減少失敗';
			},
		},
		{
			name: '様子が変だぞ！？！？',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: +15, hp: +15, sense: +15 });
					return `大幅にUP!!（+15）: ${player.stats.charm, player.stats.hp, player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'スペシャル失敗';
			},
		},
		{
			name: '結婚する',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: -10, hp: -10, sense: -10 });
					return `大幅にDown!!（-10）: ${player.stats.charm, player.stats.hp, player.stats.sense}`;
				}
				console.error('Invalid player object:', player);
				return 'スペシャル失敗';
			},
		},
		{
			name: '処刑される',
			action: (player) => {
				if (player && typeof player.modifyStats === 'function') {
					player.modifyStats({ charm: -15, hp: -5, sense: -15 });
					return `大幅にDown!!（-10）: ${player.stats.charm, player.stats.hp, player.stats.sense}`;
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