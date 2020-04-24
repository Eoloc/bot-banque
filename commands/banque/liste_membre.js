const commando = require('discord.js-commando');
const accessBank = require('./access-bank.js');

let bank = accessBank.get();

class MoneyUserListCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'liste',
            group: 'bank',
            memberName: 'liste',
            description: '  Permet de voir les joueurs avec qui on peut donner de l\'argent.'
        });
    }

    async run(message, args) {
        var chaine = "Liste des joueurs dans la banque :\n\n";
        for(var i in bank){
            if(message.member.id == bank[i].id){
                chaine = chaine + bank[i].nom + "   ( vous )\n";
            }
            else{
                chaine = chaine + bank[i].nom + "\n";
            }
            
        }
        message.reply(chaine);
        console.log(message.member.user.tag + " a fait la commande liste");
    }
}

module.exports = MoneyUserListCommand;