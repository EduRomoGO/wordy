const { db } = require('./dbCreator.js');
const { getAudioFile } = require('./getAudioFile.js');
const { searchWord } = require('./searchWord.js');

db.defaults({ wordDescriptors: [] })
    .write();


const createDescriptor = ({audio, phonemics, definitions, word}) => {
    const idAudio = audio.split('/').pop();

    return {
        word,
        phonemics,
        definitions,
        protocol: 'https',
        extension: 'mp3',
        idAudio,
        url: `https://www.wordreference.com/audio/en/uk/general/${idAudio}`,
    };
};

const saveDescriptorToDb = descriptor => {
    db.get('wordDescriptors')
        .push(descriptor)
        .write();
};

const getWordInfo = async word => {
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
};

module.exports = { getWordInfo };