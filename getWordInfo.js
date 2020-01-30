const { wrDefinition } = require('wordreference-definition-api');
let def = wrDefinition();
const { db } = require('./dbCreator.js');
const { getAudioFile } = require('./getAudioFile.js');

db.defaults({ wordDescriptors: [] })
    .write();

const wordsInDb = db.get('wordDescriptors')
    .map('word')
    .value();

const searchWord = word => def.define(word);

const createDescriptor = ({audio, phonemics, definitions, word}) => {
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
    db.get('wordDescriptors')
        .push(descriptor)
        .write();
};

const getWordInfo = async word => {
    const wordIsNotInDb = !wordsInDb.includes(word);

    if (wordIsNotInDb) {
        try {
            const data = await searchWord(word);
            const descriptor = createDescriptor({...data, word});

            saveDescriptorToDb(descriptor);
            getAudioFile(descriptor);

            console.log('=====================')
            console.log(`Successfully searched ${word}, created its descriptor, saved it to db and retrieved its audio file`);
            console.log('=====================')
            console.log(' ');
            console.log(' ');
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = { getWordInfo };