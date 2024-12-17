import { playerData } from './main.js';
import Player from './player.js';
import { changeForm } from './form.js';
import { player, playerUi } from './initialize.js'; // グローバルplayer配列をインポート

export class UiScene extends Phaser.Scene {
    constructor() {
        super("uiScene");
    }

    create() {
        // player配列をクリア
        playerUi.splice(0, playerUi.length);
        let playArray = [player, playerUi];
        
        for (let i = 0; i < playerData.User.room_limit; i++) {
            const username = playerData[`User${i + 1}`];
            if (username) {
                const plays = [
                    new Player(this, 40 + i * 180, 60, username.name),
                    new Player(this, 40 + i * 180, 60, username.name)
                ];

                plays.forEach((p, i) => {
                    p.modifyStats({
                        score: username.score - p.stats.score,
                        hp: username.hp - p.stats.hp,
                        charm: username.charm - p.stats.charm,
                        sense: username.sense - p.stats.sense,
                    });
                    p.setScrollFactor(0);
                    if (i == 0) p.alpha = 0;
                    playArray[i].push(p); // グローバルplayer, playerUi配列に追加
                });

                playerUi[i] = plays[1];
            }
        }
        // プレイヤーデータを更新
        changeForm(playerUi);
    }

    set(currentPlayer) {
        playerUi.forEach(p => {
            p.modifyStats({
                score: currentPlayer.stats.score - p.stats.score,
                hp: currentPlayer.stats.hp - p.stats.hp,
                charm: currentPlayer.stat.charm - p.stats.charm,
                sense: currentPlayer.stats.sense - p.stats.sense,
            });
        });
        this.updatePlayerStats(playerUi);
    }

    updatePlayerStats(playerUi) {
        playerUi.forEach((player, index) => {
            const uiText = document.getElementById(`player${index + 1}Stats`);
            if (uiText) {
                uiText.innerText = `
                    幸福度: ${player.stats.score}
                    体力: ${player.stats.hp}
                    魅力: ${player.stats.charm}
                    センス: ${player.stats.sense}
                `;
            }
        });
    }

    // このメソッドは不要になりますが、互換性のために残すことができます
    getPlayers() {
        return player;
    }
}