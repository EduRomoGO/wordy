const { getWordInfo } = require('./src/getWordInfo.js');
const { getWaitSeconds } = require('./src/util/randomFromSet.js');
const { get20kWords } = require('./src/util/parse20kWords.js');
const { getWordsFromText } = require('./src/util/parseText.js');
const { db } = require('./src/dbCreator.js');

const isNotInDb = word => {
    const wordsInDb = db.get('wordDescriptors')
        .map('word')
        .value();

    return !wordsInDb.includes(word);
}

const getWordsInfo = words => {
    let timeoutAcc = 0;

    // Make sure that calls are sequential (one every 20-30 secs) to avoid penalizations from wr
    words.forEach(word => {
        if (isNotInDb(word)) {
            setTimeout(async () => {
                console.log(`Start searching for word "${word}"`);
                const msg = await getWordInfo(word);

                console.log(msg);
            }, timeoutAcc);
        
            timeoutAcc += getWaitSeconds() * 1000;
        } else {
            console.log(`"${word}" is already present in db`);
        }
    });
};


const words = get20kWords().slice(100, 500);
// const words = getWordsFromText();

getWordsInfo(words);