const { wrDefinition } = require('wordreference-definition-api');
let def = wrDefinition();
// const audioDescriptors = require('./db/audioDescriptors.js');
const { db } = require('./dbCreator.js');

db.defaults({ audioDescriptors: [] })
  .write()

const searchWordAndCreateDescriptor = word => {
    const createDescriptor = (audio) => {
        const idAudio = audio.split('/').pop();

        return {
            word,
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
        .then(({ audio }) => {
            saveDescriptorToDb(createDescriptor(audio));
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

findWord('school');

const words = ['school', 'bakery', 'swim', 'clear', 'blue'];

// Para cada palabra que se busque:
// mirar si existe descriptor para esa palabra
// si no existe, hacer busqueda e incluir descriptor