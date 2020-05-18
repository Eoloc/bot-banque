const commando = require('discord.js-commando');
const accessBank = require('../banque/access-bank.js');
const wol = require('wakeonlan');

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
        wol('E4:5D:51:9E:3B:50').then(() => {
            console.log('wol sent!')
        })
        console.log(message.member.user.tag + " a fait la commande testdev");
    }
}
module.exports = TestDevCommand;
