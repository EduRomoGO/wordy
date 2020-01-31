var https = require('https');
var fs = require('fs');

const getAudioFile = ({ word, audio }) => {
    if (audio) {
        const idAudio = audio.split('/').pop();
        const url = `https://www.wordreference.com/audio/en/uk/general/${idAudio}`;
        let file = fs.createWriteStream(`./db/audioFiles/${word}.mp3`);
                
        https.get(url, function(response) {
            response.pipe(file);
            
            file.on('finish', function() {
                file.close();
            });
        });
    }
};

module.exports = { getAudioFile };