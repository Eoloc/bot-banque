const commando = require('discord.js-commando');
const accessPari = require('./access-pari.js');

let pari = accessPari.get();

class PariStartCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pari',
            group: 'bank',
            memberName: 'pari',
            description: '  Permet de lancer un pari.\n'
                + '-------Lancez la commande et le bot va vous demander une succession de phrase a saisir ou nombre.\n'
                + '-------Veuillez ne pas mettre b! après votre réponse mais tout de suite la réponse.',
            args: [
                {
                    key: 'question',
                    prompt: 'Quel pari voulez-vous proposer ?',
                    type: 'string'
                },
                {
                    key: 'argentMise',
                    prompt: 'A combien voulez-vous mettre la mise ?',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { question, argentMise }) {
        pari = accessPari.get();
        if (pari.length == 0) {
            var argentMiseInt = parseInt(argentMise);
            if(isNaN(argentMiseInt)){
              message.reply("la mise n'est pas valide");
            }
            else {
              message.channel.sendMessage("Pari : " + question + "\nMise imposée : " + argentMiseInt);
              console.log("\n=====   MISE EN PLACE DE LA MISE   =====\n");
              pari = ([{ id: message.member.id, nom: message.member.user.tag, mise: argentMiseInt, tas: 0, questionPari: question }]);
              console.log(pari);
              accessPari.set(pari, (err) => {
                  if (err) throw err;
                  console.log('Pari saved!');
              });
              message.reply("Vous avez bien démarré le pari.");
            }
        }
        else {
            message.reply("Un pari est déjâ en cours");
        }
        console.log(message.member.user.tag + " a fait la commande pari");
    }
}
module.exports = PariStartCommand;
