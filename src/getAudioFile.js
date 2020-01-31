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
                console.log(`Word "${word}" audio file has been created successfully`);
                file.close();
            });
        });
    } else {
        console.log(`Word "${word}" has no valid audio id, so it wont get an audio file`);
    }
};

module.exports = { getAudioFile };