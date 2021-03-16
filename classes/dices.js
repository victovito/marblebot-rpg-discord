const Discord = require("discord.js");

class Dice
{
    constructor(sides){
        this.sides = sides
    }

    roll(){
        return Math.ceil(
            Math.random() * this.sides
        );
    }

    static roll(message, args){

        if (Object.keys(module.exports.dices).includes(args[0].toUpperCase())){
    
            let count = args[1] || 1;
            count = Number.parseInt(count);
    
            let lastResult = null;
    
            if (isNaN(count)){
                message.channel.send(`Quantidade de dados inválida: "${args[1]}"`);
                return;
            }

            if (count > 10){
                message.channel.send("Você não pode rolar mais de 10 dados simultâneos");
                return;
            }
    
            let responseMessage = new Discord.MessageEmbed();
            
            if (count == 1){
                responseMessage.setDescription(`O ${args[0].toUpperCase()} foi jogado!`)
                .setColor("#299AFF");
            } else {
                responseMessage.setTitle(args[0].toUpperCase())
                .setDescription(`${
                    count > 1 ? "Os" : "O"
                } ${args[0].toUpperCase()} ${
                    count > 1 ? "foram jogados" : "foi jogado"
                }!`)
                .setColor("#299AFF");
            }
    
            for (let i = 0; i < count; i++){
                const number = module.exports.dices[args[0].toUpperCase()].roll();
                lastResult = number;
                if (count == 1){
                    responseMessage.setTitle(number);
                } else {
                    responseMessage.addField(`#${i+1}`, number, true);
                }
            }
    
            message.channel.send(responseMessage);
    
            if (count == 1){
                if (Number.parseInt(args[0].toUpperCase().replace("D", "")) >= 20){
                    if (lastResult == 1){
                        message.channel.send(
                            "",
                            new Discord.MessageAttachment(
                                "https://media.makeameme.org/created/really-seriously-my.jpg"
                            )
                        );
                    }
                    if (lastResult == Number.parseInt(args[0].toUpperCase().replace("D", ""))){
                        message.channel.send(
                            "",
                            new Discord.MessageAttachment(
                                "https://scontent.fpoa8-2.fna.fbcdn.net/v/t1.0-9/104445826_145970940432967_8142539230436091155_n.jpg?_nc_cat=100&_nc_sid=8bfeb9&_nc_ohc=2ex-x1mITAoAX-Rfpxc&_nc_ht=scontent.fpoa8-2.fna&oh=e4c7a6c0373e0b68915c22884fbf8bcd&oe=5F17DB76"
                            )
                        );
                    }
                }
            }

            return;
    
        }

        message.channel.send("Esse dado não existir ok");

    }

}
module.exports.Dice = Dice;

module.exports.dices = {
    "D4": new Dice(4),
    "D6": new Dice(6),
    "D8": new Dice(8),
    "D10": new Dice(10),
    "D12": new Dice(12),
    "D20": new Dice(20),
    "D50": new Dice(50),
    "D100": new Dice(100)
};
