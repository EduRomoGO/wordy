var https = require('https');
var fs = require('fs');

const getAudioFile = ({ word, url }) => {
        let file = fs.createWriteStream(`./db/audioFiles/${word}.mp3`);
                
        https.get(url, function(response) {
            response.pipe(file);
            
            file.on('finish', function() {
                console.log(`Success: Word "${word}" audio file has been created`);
                file.close();
            });
        });
};

module.exports = { getAudioFile };