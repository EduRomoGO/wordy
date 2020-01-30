const { getAudioFile } = require('../../getAudioFile.js');
const { db } = require('../../dbCreator.js');

const audioDescriptors = db.get('audioDescriptors')
    .value();

// console.log(audioDescriptors);

// const audioFiles = [
//     {
//         word: 'cathedral',
//         // audio/en/uk/general/en013432.mp3
//         url: 'https://www.wordreference.com/audio/en/us/us/en013432.mp3',
//         extension: 'mp3',
//         protocol: 'https',
//     },
//     {
//         word: 'file',
//         url: 'http://static1.grsites.com/archive/sounds/comic/comic002.wav',
//         extension: 'wav',
//         protocol: 'http',
//     },
// ];


audioDescriptors.forEach(getAudioFile);