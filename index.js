const { getWordInfo } = require('./getWordInfo.js');
const { getWaitSeconds } = require('./src/util/randomFromSet.js');

const words = ['school', 'bakery'];
// const words = ['school', 'bakery', 'swim', 'clear', 'blue', 'glass'];

let timeoutAcc = 0;

// Make sure that calls are sequential (one every 20-30 secs) to avoid penalizations from wr
words.forEach(word => {
    setTimeout(() => getWordInfo(word), timeoutAcc);

    timeoutAcc += getWaitSeconds() * 1000;
});



// const fullData = {
//     definitions: data,
//     audio: data.length ? $('#aud0').children()[0].attribs.src : '',
//     pronunciation: data.length ? $('.pronWR')[0].children[1].data : '',
// };

// return fullData;
