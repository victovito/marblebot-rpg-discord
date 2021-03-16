const Discord = require("discord.js");
const { Game } = require("./game.js");

class Enemy
{

    static addEnemy(message, args){
        
        let gameJSON = Game.getGameJSON();

        // if (message.author.id != gameJSON.gameMasterId){
        //     return;
        // }
        
        const newEnemy = {
            "id": gameJSON.currentEId,
            "name": "Inimigo sem nome",
            "thumbnailURL": "",
            "type": "Sem tipo",
            "health": 150,
            "maxHealth": 150,
            "damage": 0,
        }
        
        gameJSON.enemies.push(newEnemy);
        gameJSON.currentEId += 1;
        
        Game.setGameJSON(gameJSON);

        Enemy.sendEnemyInfo(message, newEnemy);

    }

    static getEnemyIndex(id){

        let gameJSON = Game.getGameJSON();

        for (let i = 0; i < gameJSON.enemies.length; i++){
            if (gameJSON.enemies[i].id == id){
                return i;
            }
        }

    }

    static printEnemyInfoById(message, args){

        let gameJSON = Game.getGameJSON();

        const enemyIndex = Enemy.getEnemyIndex(args[0]);

        if (enemyIndex == undefined){
            message.channel.send("Inimigo não encontrado");
            return;
        }

        let enemy = gameJSON.enemies[enemyIndex];

        Enemy.sendEnemyInfo(message, enemy);

    }

    static sendEnemyInfo(message, enemy){

        const embed = new Discord.MessageEmbed();
        embed.setColor("#FF2929");
        embed.setTitle(enemy.name + " ");
        embed.setImage(enemy.thumbnailURL);
        embed.addFields(
            { name: "Tipo", value: enemy.type + " ", inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: "Vida", value: enemy.health + " ", inline: true },
            { name: "Vida máxima", value: enemy.maxHealth, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: "Dano", value: enemy.damage, inline: true }
        );
        //embed.setThumbnail(enemy.thumbnailURL);
        embed.setFooter("Enemy ID: " + enemy.id.toString());

        message.channel.send(embed);

    }

    static editEnemy(message, args){

        let gameJSON = Game.getGameJSON();

        // if (message.author.id != gameJSON.gameMasterId){
        //     return;
        // }

        const id = args[0];

        args = args.slice(1);

        const enemyIndex = Enemy.getEnemyIndex(id);

        if (enemyIndex == undefined){
            message.channel.send("Inimigo não encontrado");
            return;
        }

        let attribute = gameJSON.enemies[enemyIndex];
        for (let i = 0; i < args.length; i++){

            if (typeof(attribute[args[i]]) == "undefined"){
                message.channel.send("Este atributo não existe");
                return;
            }

            if (typeof(attribute[args[i]]) != "object"){

                if (args[i] == "id" || args[i] == "userId"){
                    message.channel.send("Você não pode alterar esse atributo");
                    return;
                }

                if (!args[i + 1]){
                    message.channel.send("Você não deu um valor de atributo");
                    return;
                }

                if (typeof(attribute[args[i]]) == "string"){
                    
                    attribute[args[i]] = args.slice(i + 1).join(" ");

                } else
                if (typeof(attribute[args[i]]) == "number") {
                    const value = Number.parseInt(args[i + 1]);

                    if (isNaN(value)){
                        message.channel.send(`O valor de atributo precisa ser do tipo "${typeof(attribute[args[i]])}"`);
                        return;
                    }

                    attribute[args[i]] = value;
                }

                Game.setGameJSON(gameJSON);

                Enemy.sendEnemyInfo(message, gameJSON.enemies[Enemy.getEnemyIndex(id)]);

                return;
            } else {
                attribute = attribute[args[i]];
            }
        }

        message.channel.send("Você não pode alterar este atributo");

    }

}
module.exports.Enemy = Enemy

