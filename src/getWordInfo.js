const { db } = require('./dbCreator.js');
const { getAudioFile } = require('./getAudioFile.js');
const { searchWord } = require('./searchWord.js');

db.defaults({ wordDescriptors: [] })
    .write();


const createDescriptor = ({phonemics, definitions, word}) => {
    return {
        word,
        phonemics,
        definitions,
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
        
        if (data.definitions.length > 0) {
            const descriptor = createDescriptor({...data, word});
            
            saveDescriptorToDb(descriptor);
            getAudioFile({audio: data.audio, word: data.word});
            
            console.log('=====================')
            console.log(`Successfully searched ${word}, created its descriptor, saved it to db and retrieved its audio file`);
            console.log('=====================')
            console.log(' ');
            console.log(' ');
        } else {
            console.log(`Word "${word}" has not any definitions, so it wont be stored in the db`);
        }
    } catch (error) {
        throw new Error(`Error while getting word info for word: "${word}" --> ${error}`);
    }
};

module.exports = { getWordInfo };