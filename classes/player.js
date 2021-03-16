const Discord = require("discord.js");
const { Game } = require("./game.js");

class Player
{
    static addPlayer(message, args){
        
        let gameJSON = Game.getGameJSON();

        if (message.author.id != gameJSON.gameMasterId){
            return;
        }

        let userId = args[0];

        if (!userId){
            message.channel.send("Informe o UserId do jogador");
            return;
        }
        
        const newPlayer = {
            "id": gameJSON.currentId,
            "userId": userId,
            "name": "Personagem sem nome",
            "thumbnailURL": "",
            "class": "Sem classe",
            "race": "Sem raça",
            "health": 150,
            "maxHealth": 150,
            "attributes": {
                "charism": 0,
                "strength": 0,
                "dexterity": 0,
                "intelligence": 0,
                "wiseness": 0,
                "faith": 0,
            }
        }
        
        gameJSON.players.push(newPlayer);
        gameJSON.currentId += 1;
        
        Game.setGameJSON(gameJSON);

        Player.sendPlayerInfo(message, newPlayer);

    }

    static getPlayerIndex(id){

        let gameJSON = Game.getGameJSON();

        for (let i = 0; i < gameJSON.players.length; i++){
            if (gameJSON.players[i].id == id){
                return i;
            }
        }

    }

    static getPlayerIndexByUserId(userId){

        let gameJSON = Game.getGameJSON();

        for (let i = 0; i < gameJSON.players.length; i++){
            if (gameJSON.players[i].userId == userId){
                return i;
            }
        }

    }

    static printPlayerInfo(message, args){

        let gameJSON = Game.getGameJSON();

        let userId = message.mentions.users.size > 0 ?
        message.mentions.users.first().id : message.author.id;

        const playerIndex = Player.getPlayerIndexByUserId(userId);

        if (playerIndex == undefined){
            message.channel.send("Player não encontrado");
            return;
        }

        let player = gameJSON.players[playerIndex];

        Player.sendPlayerInfo(message, player);

    }

    static printPlayerInfoById(message, args){

        let gameJSON = Game.getGameJSON();

        const playerIndex = Player.getPlayerIndex(args[0]);

        if (playerIndex == undefined){
            message.channel.send("Player não encontrado");
            return;
        }

        let player = gameJSON.players[playerIndex];

        Player.sendPlayerInfo(message, player);

    }

    static sendPlayerInfo(message, player){

        const embed = new Discord.MessageEmbed();
        embed.setColor("#A4FF29");
        embed.setTitle(player.name + " ");
        embed.setDescription(`<@${player.userId}>`);
        embed.setImage(player.thumbnailURL);
        embed.addFields(
            { name: "Raça", value: player.race + " ", inline: true },
            { name: "Classe", value: player.class + " ", inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: "Vida", value: player.health + " ", inline: true },
            { name: "Vida máxima", value: player.maxHealth, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: "Atributos:" },
            { name: "Carisma", value: player.attributes.charism, inline: true },
            { name: "Força", value: player.attributes.strength, inline: true },
            { name: "Destreza", value: player.attributes.dexterity, inline: true },
            { name: "Inteligência", value: player.attributes.intelligence, inline: true },
            { name: "Sabedoria", value: player.attributes.wiseness, inline: true },
            { name: "Fé", value: player.attributes.faith, inline: true },
        );
        //embed.setThumbnail(player.thumbnailURL);
        embed.setFooter("Player ID: " + player.id.toString());

        message.channel.send(embed);

    }

    static editPlayer(message, args){

        let gameJSON = Game.getGameJSON();

        if (message.author.id != gameJSON.gameMasterId){
            return;
        }

        const id = args[0];

        args = args.slice(1);

        const playerIndex = Player.getPlayerIndex(id);

        if (playerIndex == undefined){
            message.channel.send("Player não encontrado");
            return;
        }

        let attribute = gameJSON.players[playerIndex];
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

                Player.sendPlayerInfo(message, gameJSON.players[Player.getPlayerIndex(id)]);

                return;
            } else {
                attribute = attribute[args[i]];
            }
        }

        message.channel.send("Você não pode alterar este atributo");

    }
}
module.exports.Player = Player;
