const fs = require("fs");

class Game
{
    
    static getGameJSON(){
        return JSON.parse(
            fs.readFileSync("game.json").toString()
        );
    }

    static setGameJSON(object){
        fs.writeFileSync("game.json", JSON.stringify(object, undefined, 4));
    }

}
module.exports.Game = Game;