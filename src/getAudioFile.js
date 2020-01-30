var http = require('http');
var https = require('https');
var fs = require('fs');

const getAudioFile = (data) => {
    let file = fs.createWriteStream(`./db/audioFiles/${data.word}.${data.extension}`);

    const protocol = data.protocol === 'http' ? http : https;

    protocol.get(data.url, function(response) {
        response.pipe(file);

        file.on('finish', function() {
            file.close();
        });
    });
};

module.exports = { getAudioFile };