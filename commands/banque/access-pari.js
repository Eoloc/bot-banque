const fs = require('fs')

let pari = require('./pari.json');

module.exports = {
    get: function () {
        return pari;
    },
    getAsync: function (cb) {
        fs.readFile('commands/banque/pari.json', (err, r) => {  
            if (err) cb(err);
            cb(null, JSON.parse(r));
        });
    },
    set: function (n, cb) {
        pari = n;
        fs.writeFile('commands/banque/pari.json', JSON.stringify(n), (err) => {  
            if (err) cb(err);
            cb(null);
        });
    }
}