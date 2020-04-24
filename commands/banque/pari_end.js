const commando = require('discord.js-commando');
const accessPari = require('./access-pari.js');
const accessBank = require('./access-bank');

let pari = accessPari.get();
let bank = accessBank.get();

class PariEndCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'parifin',
            group: 'bank',
            memberName: 'parifin',
            description: '  b!parifin [oui/non] | Permet de finir un pari en entrant si oui ou non le pari était vrai.'
        });
    }
    async run(message, args) {
        pari = accessPari.get();
        if (message.content.startsWith("b!parifin ")) {
            var argument = message.content.substr("b!parifin ".length);
            var gagnant = [];
            var gagnantRempli = false;
            if( pari.length != 0){ 
            if (pari[0].id == message.member.id) {
                pari = accessPari.get();
                if (argument == "oui" || argument == "Oui" || argument == "OUI") {
                    for (var i in pari) {
                        if (i != 0 && pari[i].vote == 0) {
                            gagnant.push(pari[i].id);
                        }
                    }
                    gagnantRempli = true;
                    message.channel.sendMessage("Le pari est fermé et est vrai");
                }
                else if (argument == "non" || argument == "Non" || argument == "NON") {
                    for (var i in pari) {
                        if (i != 0 && pari[i].vote == 1) {
                            gagnant.push(pari[i].id);
                        }
                    }
                    gagnantRempli = true;
                    message.channel.sendMessage("Le pari est fermé et est faux");
                }
                else {
                    message.reply("Erreur, vous devez entrer soit oui, soit non");
                }
                if (gagnantRempli) {
                    if (gagnant.length == 0) {
                        message.channel.sendMessage("Il n'y a aucun gagnant !");
                    }
                    else {
                        var chaine = "Bien joué a : \n";
                        if(gagnant.length != 1){
                            for (var i in gagnant) {
                                if(i != gagnant.length - 1){
                                    chaine = chaine + "<@" + gagnant[i] + "> \n";
                                }
                            }
                        }
                        chaine = chaine + "<@" + gagnant[gagnant.length - 1] + "> \n";
                        chaine = chaine + "Vous remportez : " + pari[0].tas / gagnant.length + " € chacun, soit ";
                        chaine = chaine + ((pari[0].tas / gagnant.length) - pari[0].mise) + " € gagnés";
                        message.channel.sendMessage(chaine);
                        for (var i in bank) {
                            for (var j in gagnant) {
                                if (gagnant[j] == bank[i].id) {
                                    bank[i].argent = bank[i].argent + (pari[0].tas / gagnant.length);
                                }
                            }
                        }
                        console.log(bank);
                        console.log("\n====   MODIFICATION DE LA BANQUE   ====\n");
                        accessBank.set(bank, (err) => {
                            if (err) throw err;
                            console.log('Bank saved!');
                        });
                    }
                }
                console.log(pari);
                pari = [];
                accessPari.set(pari, (err) => {
                    if (err) throw err;
                    console.log('Pari saved!');
                });
                console.log(pari);
            }
            else {
                message.reply("Erreur, vous n'avez pas le droit de faire ca");
            }
        }
        else{
            message.reply("Il n'y a aucun pari en cours");
                
        }
    }
        else {
            message.reply("Erreur d'utilitation de la commande")
        }
        console.log(message.member.user.tag + " a fait la commande parifin");
    }
}
module.exports = PariEndCommand;
