const commando = require('discord.js-commando');
const accessPari = require('./access-pari.js');
const accessBank = require('./access-bank.js');

let pari = accessPari.get();
let bank = accessBank.get();

class PariOuiCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'parioui',
            group: 'bank',
            memberName: 'parioui',
            description: '  Permet de miser pour le pari en cours'
        });
    }
    async run(message, args) {
        var estDedans = false;
        var dansBanque = false;
        pari = accessPari.get();
        bank = accessBank.get();
        for (var i in pari) {
            if (i != 0 && message.member.id == pari[i].id) {
                estDedans = true;
                break;
            }
        }
        for (var i in bank) {
            if (message.member.id == bank[i].id) {
                dansBanque = true;
                break;
            }
        }
        if (estDedans) {
            message.reply("Vous avez déjâ voté pour ce pari");
        }
        else if (pari.length == 0) {
            message.reply("Aucun pari lancé");
        }
        else {
          if(dansBanque){
            console.log(pari);
            pari.push({ id: message.member.id, nom: message.member.user.tag, vote: 0 });
            for (var i in bank) {
                if (message.member.id == bank[i].id) {
                    bank[i].argent = bank[i].argent - pari[0].mise;
                    pari[0].tas = pari[0].tas + pari[0].mise;
                }
            }
            console.log("\n====   MODIFICATION DES PARIS   ====\n");
            console.log(pari);
            console.log("\n====   MODIFICATION DE LA BANQUE   ====\n");
            console.log(bank);
            accessPari.set(pari, (err) => {
                if (err) throw err;
                console.log('Pari saved!');
            });
            accessBank.set(bank, (err) => {
                if (err) throw err;
                console.log('Bank saved!');
            });
            message.reply("Vous avez mit " + pari[0].mise + " € sur le tas d'argent et vous avez voté en faveur du pari en cours.\n"
                + "Le tas est de " + pari[0].tas + " €");
          }
          else{
            message.reply("Vous n'avez pas de compte bancaire, b!inscrire pour en créer un");
          }

        }
        console.log(message.member.user.tag + " a fait la commande parioui");
    }
}
module.exports = PariOuiCommand;
