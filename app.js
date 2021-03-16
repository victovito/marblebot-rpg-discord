const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const commands = require("./commands.js");

const client = new Discord.Client();

client.login(token);

client.once("ready", () => {
    console.log("Bot running!");
});

client.on("message", message => {
    
    if (!message.content.startsWith(prefix)){
        return;
    }
    
    const args = message.content.split(" ");
    args[0] = args[0].replace(prefix, "");

    let actualCommand = null;
    let command = commands;
    let i = 0;
    for (i; i < args.length; i++){
        const nexCommand = command[args[i]];
        if (!nexCommand){
            message.channel.send("Comando não encontrado");
            return;
        }
        actualCommand = args[i];
        command = nexCommand;
        if (typeof(command) == "function"){
            break;
        }
    }
    if (typeof(command) == "function"){
        command(message, args.slice(i + 1));
    } else {
        message.channel.send(
            `Available commands in "${actualCommand}": ` +
            "```" + Object.keys(command).join(", ") + "```"
        );
    }

})
