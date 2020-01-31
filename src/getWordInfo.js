const { db } = require('./dbCreator.js');
const { getAudioFile } = require('./getAudioFile.js');
const { searchWord } = require('./searchWord.js');

db.defaults({ wordDescriptors: [], noDef: [] })
    .write();


const createDescriptor = ({phonemics, definitions, word, url}) => {
    return {
        word,
        phonemics,
        definitions,
        url,
    };
};

const saveDescriptorToDb = descriptor => {
    // Update
    // db.get('wordDescriptors')
    //     .find({ word: descriptor.word })
    //     .assign(descriptor)
    //     .write()
    
    // Create
    db.get('wordDescriptors')
        .push(descriptor)
        .write();
};

const saveNoDef = word => {
    db.get('noDef')
        .push(word)
        .write();
};

const getWordInfo = async word => {
    try {
        const data = await searchWord(word);
        
        if (data.definitions.length > 0) {
            let url = '';

            if (data.audio) {
                const idAudio = data.audio.split('/').pop();
                url = `https://www.wordreference.com/audio/en/uk/general/${idAudio}`;

                getAudioFile({url, word});
            } else {
                console.log(`Word "${word}" has no valid audio id, so it wont get an audio file`);
            }

            const descriptor = createDescriptor({...data, word, url});

            saveDescriptorToDb(descriptor);
            
            return `Word "${word}" descriptor has been saved to db`;
        } else {
            saveNoDef(word);
            return `Word "${word}" has not any definitions, so it wont be stored in the db`;
        }
    } catch (error) {
        throw new Error(`Error while getting word info for word: "${word}" --> ${error}`);
    }
};

module.exports = { getWordInfo };