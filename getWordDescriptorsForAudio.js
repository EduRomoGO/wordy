const { wrDefinition } = require('wordreference-definition-api');
let def = wrDefinition();
const { db } = require('./dbCreator.js');

db.defaults({ audioDescriptors: [] })
  .write()

const searchWordAndCreateDescriptor = word => {
    const createDescriptor = ({audio, phonemics, definitions}) => {
        const idAudio = audio.split('/').pop();

        return {
            word,
            phonemics,
            definitions,
            protocol: 'https',
            extension: 'mp3',
            url: `https://www.wordreference.com/audio/en/uk/general/${idAudio}`,
        };
    };

    const saveDescriptorToDb = descriptor => {
        db.get('audioDescriptors')
            .push(descriptor)
            .write();
    };

    def.define(word)
        .then(data => {
            saveDescriptorToDb(createDescriptor(data));
        });
};

const wordsInDb = db.get('audioDescriptors')
    .map('word')
    .value();

const findWord = word => {
    if (!wordsInDb.includes(word)) {
        searchWordAndCreateDescriptor(word);
    }     
};

const words = ['school', 'bakery', 'swim', 'clear', 'blue', 'glass'];

words.forEach(findWord);


// const fullData = {
//     definitions: data,
//     audio: data.length ? $('#aud0').children()[0].attribs.src : '',
//     pronunciation: data.length ? $('.pronWR')[0].children[1].data : '',
// };

// return fullData;
