const commando = require('discord.js-commando');
const jsonToken = require('./token.json');

const prefix = "b!";
const bot = new commando.Client({
    commandPrefix: prefix
});
var d = new Date();
var dateActu = d.getUTCDate()+ "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCFullYear();

bot.registry.registerGroup('dev', 'Dev');
bot.registry.registerGroup('bank', 'Banque');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(jsonToken.token);

bot.on('ready',() => {
    console.log('\nBot Banque prêt');
    bot.user.setAvatar(__dirname + "/avatar/CaisseEpargne.jpg")
    .then(() => console.log('Avatar Banque prêt'))
    .catch(() => console.error);
    console.log("Date Banque : " + dateActu);
    console.log('Log Banque terminé');
});