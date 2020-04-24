const commando = require('discord.js-commando');
const accessBank = require('./access-bank.js');

let bank = accessBank.get();

class MoneyUserSendCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'argent',
            group: 'bank',
            memberName: 'argent',
            description: '  Permet de voir son argent.'
        });
    }

    async run(message, args) {
      var estDansBanque = false;
        for(var i in bank){
            if(message.member.id == bank[i].id){
                bank = accessBank.get();
                estDansBanque = true;
                break;
            }
        }
        if(estDansBanque){
          message.reply("Vous avez " + bank[i].argent + ' €');
        }
        else {
          message.reply("Vous n'avez pas de compte bancaire, b!inscrire pour en créer un");
        }
        console.log(message.member.user.tag + " a fait la commande argent");
    }
}

module.exports = MoneyUserSendCommand;
