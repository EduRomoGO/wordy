var http = require('http');
var fs = require('fs');

const getAudioFile = ({ title, url }) => {
        let file = fs.createWriteStream(`./db/phonemesFiles/${title}.mp3`);
                
        http.get(url, function(response) {
            response.pipe(file);
            
            file.on('finish', function() {
                console.log(`Success: Word "${word}" audio file has been created`);
                file.close();
            });
        });
};

// simple
// getAudioFile({url: 'http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/sym/img_0024.mp3'})
// getAudioFile({url: 'http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/word/img_0024.mp3'})

const getPhonemesListFiles = (items) => {
    items.map((item, index)=> {
    const file = index < 10 ? `000${index}`:`00${index}`
    return (
        getAudioFile({
            title: `${item}`,
            url:`http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/word/img_${file}.mp3`
        })
    )})
}

const phonems = ['p', 'b', 't', 'd','k', 'g', 'm', 'n','ŋ', 'f', 'v', 'θ','ð', 's', 'z', 'ʃ','ʒ', 'h', 'tʃ', 'dʒ', 'r', 'l', 'j', 'w', 'i:','ɪ','e','æ', 'ɑ:', 'ʌ','ɒ','ɔ:','ʊ','u:','ɜ:ʳ','ə','eɪ','aɪ','ɔɪ','oʊ','aʊ','eəʳ','ɪəʳ','ʊə']
const words = ['soup', 'bat', 'light', 'dog','cap', 'bag', 'man', 'rain','king', 'fish', 'van', 'thumb','mother', 'mouse', 'zebra', 'shoe','television', 'hand', 'cheese', 'jet', 'write', 'long', 'yo-yo', 'whale', 'sea','swim','bed','cat', 'car', 'cup','lock','ball','book','two','shirt','father','eight','eye','boy','arrow','house','chair','deer','tourist']

getPhonemesListFiles(phonems)
getPhonemesListFiles(words)

module.exports = { getAudioFile };