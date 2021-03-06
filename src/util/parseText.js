  
const { text } = require('../../info/text.js');
const { pipe } = require('ramda');

const leaveOnlyLetters = str => str.replace(/[^A-Za-z\s]/g, '');
const removeLineJumps = str => str.replace(/\n/g, " ");
const splitBySpaces = str => str.split(' ');
const removeEmptySpaces = arr => arr.filter(item => !!item);
const toLowerCase = arr => arr.map(item => item.toLowerCase());
const removeDuplicates = arr => [...new Set(arr)];

const getWordsFromText = () => {
    return pipe(
        leaveOnlyLetters,
        removeLineJumps,
        splitBySpaces,
        removeEmptySpaces,
        toLowerCase,
        removeDuplicates
    )(text);
};

module.exports = { getWordsFromText }