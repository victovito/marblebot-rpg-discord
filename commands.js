const { Dice } = require("./classes/dices.js");
const { Player } = require("./classes/player.js");
const { Enemy } = require("./classes/enemy.js");

const commands = {
    "r": Dice.roll, //Roll a dice -> [DICE NAME] [ROLL COUNT]
    "ap": Player.addPlayer, //Add Player -> [USER ID]
    "ep": Player.editPlayer, //Edit player -> [PLAYER ID] [ATTRIBUTE] [VALUE]
    "player": Player.printPlayerInfo, //Show player card -> [MENTION] (shows own card if no one is mentioned)
    "playerId": Player.printPlayerInfoById, //Show player card -> [PLAYER ID]
    "ae": Enemy.addEnemy, //Add enemy
    "ee": Enemy.editEnemy, //Edit enemy -> [ENEMY ID] [ATTRIBUTE] [VALUE]
    "enemy": Enemy.printEnemyInfoById, //Show enemy card -> [ENEMY ID]
};

module.exports = commands;
