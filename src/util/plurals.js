const { get20kWords } = require('./parse20kWords.js');
const { normal, superShort } = require('../../db/processed.json');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const allWords = [...normal, ...superShort];
// const allWords = get20kWords();
const wordsEndingInS = allWords.filter(word => word.slice(-1) === 's');

const adapter = new FileSync('./db/source20kwords.json');
const db = low(adapter);

db.defaults({ words: [], pluralWords: [] })
  .write();

const saveWords = words => {
    db.get('words')
        .push(...words)
        .write();
};

const savePluralWords = words => {
    db.get('pluralWords')
        .push(...words)
        .write();
};

const 

const getPluralWords = () => {
    const words = [];
    const pluralWords = [];

    wordsEndingInS
        .forEach(word => {
            if (word.length > 3) {
                singularWord = word.slice(0, -1);
                allWords.includes(singularWord) ? pluralWords.push(word) : words.push(word);
            } else {
                words.push(word);
            }
        });
    
    console.log(pluralWords.length)
    saveWords(words);
    savePluralWords(pluralWords);
};


// console.log(wordsEndingInS.length);

getPluralWords();
// console.log(superShort);
