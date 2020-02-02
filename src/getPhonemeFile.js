var http = require('http');
var fs = require('fs');

const getAudioFile = ({ word, url }) => {
        let file = fs.createWriteStream(`./db/phonemesFiles/word${word}.mp3`);
                
        http.get(url, function(response) {
            response.pipe(file);
            
            file.on('finish', function() {
                console.log(`Success: Word "${word}" audio file has been created`);
                file.close();
            });
        });
};

// getAudioFile({url: 'http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/sym/img_0024.mp3'})
// getAudioFile({url: 'http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/word/img_0024.mp3'})

const getPhonemesListFiles = () => {
    for (let i = 1; i < 45; i++ ){
        const file = i < 10 ? `000${i}`:`00${i}`
        // console.log('file', file)
        getAudioFile(
            {
                word: `${file}`,
                url:`http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/word/img_${file}.mp3`
            }
            )
    }
}

getPhonemesListFiles()

module.exports = { getAudioFile };