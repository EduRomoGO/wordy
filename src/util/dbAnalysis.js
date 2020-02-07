const { db } = require('../dbCreator.js');

const allDescriptors = db.get('wordDescriptors')
    .value()

const isPhonemicsIncomplete = item => (item.phonemics.match(/\//g) || []).length < 2;

const toInvalidReason = (acc, next) => {
    let reason;

    if (next.definitions.length === 0) {
        reason = 'no-definitions';
    } else if (next.phonemics === undefined || next.phonemics.trim().length === 0) {
        reason = 'missing-phonetics';
    } else if (isPhonemicsIncomplete(next)) {
        reason = 'wrong-phonetics';
    } else if (next.url === '') {
        reason = 'missing-audio-url';
    }

    return {...acc, [next.word]: reason };
}

const isInvalid = item => {
    let isInvalid = false;

    if (item.definitions.length === 0) {
        isInvalid = true;
    } else if (item.phonemics === undefined || item.phonemics.trim().length === 0) {
        isInvalid = true;
    } else if (isPhonemicsIncomplete(item)) {
        isInvalid = true;
    } else if (item.url === '') {
        isInvalid = true;
    }
    
    return isInvalid;
};

const performAnalysis = () => {
    return allDescriptors
        .filter(isInvalid)
        .reduce(toInvalidReason, {});
};

const results = performAnalysis();

const getWrongWords = () => Object.keys(results);

// console.log(results);
// console.log(Object.keys(results).filter(key => results[key] === 'missing-audio-url'));
// console.log(Object.keys(results).filter(key => results[key] === 'missing-audio-url').length);
// console.log(Object.keys(results).length);

module.exports = { getWrongWords };