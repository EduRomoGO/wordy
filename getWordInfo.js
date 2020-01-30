import { getAudioFile } from './getAudioFile';
const { wrDefinition } = require('wordreference-definition-api');
let def = wrDefinition();
const { db } = require('./dbCreator.js');
const { getAudioFile } = require('./getAudioFile.js');

db.defaults({ wordDescriptors: [] })
    .write();

const searchWord = word => def.define(word);

// const getWordDescriptor = word => {
//     searchWordAndCreateDescriptor(word);
// };



const wordsInDb = db.get('wordDescriptors')
    .map('word')
    .value();

// const getWordDescriptor = word => {
//     if (!wordsInDb.includes(word)) {
//         searchWordAndCreateDescriptor(word);
//     }     
// };


const getWordInfo = async word => {

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
        db.get('wordDescriptors')
            .push(descriptor)
            .write();
    };


    if (!wordsInDb.includes(word)) {
        try {
            const data = await searchWord(word);
            const descriptor = createDescriptor(data);
            saveDescriptorToDb(descriptor);
            getAudioFile(descriptor);
            console.log(desc);

        } catch (error) {
            console.error(error);
        }
            // .then(data => {
            //     saveDescriptorToDb(createDescriptor(data));
            // })
            // .

        // searchWordAndCreateDescriptor(word);
        // findWord
        // createDescriptor
        // downloadAudio
    }
};

getWordInfo('card');

module.exports = { getWordInfo };