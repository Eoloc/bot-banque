const commando = require('discord.js-commando');
const accessBank = require('./access-bank.js');

let bank = accessBank.get();

class PremierRegisterCommand extends commando.Command {
    
        constructor(client) {
            super(client, {
                name: 'inscrire',
                group: 'bank',
                memberName: 'inscrire',
                description: '  Permet de s\'inscrire dans la banque et d\'avoir un compte.'
            });
        }
    
        async run(message, args) {
            var estDedans = false;
            bank = accessBank.get();
            for(var i in bank){
                if(message.member.id == bank[i].id){
                    estDedans = true;
                    break;
                }
            }
            if(estDedans){
                message.reply("Vous êtes déjâ inscrit")
            }else{
                console.log(bank);
                bank.push({id: message.member.id, argent: 50, nom: message.member.user.tag, dateJourn: (new Date)});
                console.log("\n==== MODIFICATION DE LA BANQUE ====\n");
                console.log(bank);

                accessBank.set(bank, (err) => {  
                if (err) throw err;
                    console.log('Bank saved!');
                });
                message.reply("Vous avez bien été enregistré.");
            }
            console.log(message.member.user.tag + " a fait la commande inscrire");
        }
    }
    
    module.exports = PremierRegisterCommand;