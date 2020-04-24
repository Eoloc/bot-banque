const commando = require('discord.js-commando');
const accessBank = require('./access-bank.js');

let bank = accessBank.get();


class MoneyUserGiveDayCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'salaire',
            group: 'bank',
            memberName: 'salaire',
            description: '  Donne votre salaire journalier.'
        });
    }

    async run(message, args) {
        for(var i in bank){
            if(message.member.id == bank[i].id){
                if((new Date()).getTime() - (new Date(bank[i].dateJourn)).getTime() > 8.64e7){
                    bank = accessBank.get();
                    console.log(bank);
                    bank[i].argent = bank[i].argent + 5;
                    bank[i].dateJourn = (new Date());
                    console.log("\n==== MODIFICATION DE LA BANQUE ====\n");
                    console.log(bank);
    
                    accessBank.set(bank, (err) => {  
                    if (err) throw err;
                        console.log('Bank saved!');
                    });
    
                    message.reply("Vous avez gagné 5 €"); 
                    break;
                }else{
                    message.reply("Vous avez déjâ récupéré votre salaire journalier");
                    break;
                }
            }
        }
        console.log(message.member.user.tag + " a fait la commande salaire");
    }
}

module.exports = MoneyUserGiveDayCommand;