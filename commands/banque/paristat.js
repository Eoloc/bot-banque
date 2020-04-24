const commando = require('discord.js-commando');
const accessPari = require('./access-pari.js');

let pari = accessPari.get();

class PariStatCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'paristat',
            group: 'bank',
            memberName: 'paristat',
            description: '  Permet de voir les statistiques du pari en cours.\n'
        });
    }
    async run(message, args) {
        pari = accessPari.get();
        if (pari.length == 0) {
			message.reply("Il n'y a aucun pari en cours");
        }
        else {
			var tab0 = [];
			var tab1 = [];
			var chainePour = "Pour :\n";
			var chaineContre = "Contre :\n";
			for(var i in pari){
				if(i != 0 && pari[i].vote == 0){
					tab0.push(pari[i].nom);
				}
				if(i != 0 && pari[i].vote == 1){
					tab1.push(pari[i].nom);
				}
			}
			for(var i in tab0){
				chainePour = chainePour + "  -" + tab0[i] + "\n";
			}
			for (var i in tab1){
				chaineContre = chaineContre + "  -" + tab1[i] + "\n";
			}
            message.channel.sendMessage(" Pari :\nQuestion : " + pari[0].questionPari + "\nMise : "
				+ pari[0].mise + "\nTas : " + pari[0].tas + "\n\n" + chainePour + "\n" + chaineContre);
        }
        console.log(message.member.user.tag + " a fait la commande paristat");
    }
}
module.exports = PariStatCommand;
