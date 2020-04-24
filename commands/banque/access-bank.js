const fs = require('fs')

let bank = require('./bank.json');

module.exports = {
    get: function () {
        return bank;
    },
    getAsync: function (cb) {
        fs.readFile('commands/banque/bank.json', (err, r) => {  
            if (err) cb(err);
            cb(null, JSON.parse(r));
        });
    },
    set: function (n, cb) {
        bank = n;
        fs.writeFile('commands/banque/bank.json', JSON.stringify(n), (err) => {  
            if (err) cb(err);
            cb(null);
        });
    }
}