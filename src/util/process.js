const { get20kWords } = require('./parse20kWords.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const allWords = get20kWords();

const adapter = new FileSync('./db/processed.json');
const db = low(adapter);

db.defaults({ normal: [], superShort: [] })
  .write();


const saveWords = ({type, words}) => {
    db.get(type)
        .push(...words)
        .write();
};


const process = () => {
    const superShort = [];
    const normal = [];

    allWords.forEach(word => {
        if (word.length < 3) {
            superShort.push(word);
        } else {
            normal.push(word);
        }
    });

    saveWords({words: superShort, type: 'superShort'});
    saveWords({words: normal, type: 'normal'});
};

process();