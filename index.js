const { getWordInfo } = require('./src/getWordInfo.js');
const { getWaitSeconds } = require('./src/util/randomFromSet.js');
const { db } = require('./src/dbCreator.js');
const { getWrongWords } = require('./src/util/dbAnalysis.js');
const { words: allWords } = require('./db/source20kwords.json');

const isNotInDb = word => {
    const wordsWithDefInDb = db.get('wordDescriptors')
        .map('word')
        .value();

    const wordsWithNoDefInDb = db.get('noDef')
        .value();
    
    const wordsInDb = [...wordsWithDefInDb, ...wordsWithNoDefInDb];

    return !wordsInDb.includes(word);
}

const getWordsInfo = words => {
    let timeoutAcc = 0;
    let inDb = 0;
    let processedWords = 0;

    // Make sure that calls are sequential (one every 20-30 secs) to avoid penalizations from wr
    words.forEach(word => {
        if (isNotInDb(word)) {
            setTimeout(async () => {
                console.log(`--- Start searching for word "${word}" ---`);
                try {
                    const msg = await getWordInfo(word);
                    processedWords++;
                    console.log(`Info: Number of processed words: ${processedWords}`);
                    console.log(msg);
                } catch (error) {
                    console.log(error);
                }
            }, timeoutAcc);
        
            timeoutAcc += getWaitSeconds() * 1000;
        } else {
            inDb++;
            console.log(`Info: ${inDb} words already in db`);
            console.log(`Info: Word "${word}" is already present in db`);
        }
    });
};

// const words = getWrongWords();
const words = allWords.slice(1500, 1800);

getWordsInfo(words);



function run () {
    const soundList = [];
    const createId = i => {
        if (i < 11) {
            return `sym_000${i}`;
        } else {
            return `sym_00${i}`;
        }
    };

    for (let i = 0; i < 100; i++) {
        const soundId = createId(i);

        if (document.querySelector(`#${soundId}`)) {
            soundList.push(soundId);
        }
    }

    return soundList;
}

