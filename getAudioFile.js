var http = require('http');
var https = require('https');
var fs = require('fs');

const getAudioFile = (data) => {
    let file = fs.createWriteStream(`./audioFiles/${data.word}.${data.extension}`);

    const protocol = data.protocol === 'http' ? http : https;

    protocol.get(data.url, function(response) {
        response.pipe(file);

        file.on('finish', function() {
            file.close();
        });
    });
};

const audioFiles = [
    {
        word: 'cathedral',
        url: 'https://www.wordreference.com/audio/en/us/us/en013432.mp3',
        extension: 'mp3',
        protocol: 'https',
    },
    {
        word: 'file',
        url: 'http://static1.grsites.com/archive/sounds/comic/comic002.wav',
        extension: 'wav',
        protocol: 'http',
    },
];


audioFiles.forEach(getAudioFile);
