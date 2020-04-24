const commando = require('discord.js-commando');
const accessBank = require('../banque/access-bank.js');

let bank = accessBank.get();

class TestDevCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'testdev',
            group: 'dev',
            memberName: 'testdev',
            description: '  Commande pour le developpeur de ce bot.',
        });
    }
    async run(message, args){
        message.channel.sendMessage("Salut <@Eoloc#6237>");
        console.log(message.member.user.tag + " a fait la commande testdev");
    }
}
module.exports = TestDevCommand;
