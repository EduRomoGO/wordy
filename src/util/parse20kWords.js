const { wordsList } = require('./20kWords.js');
const { pipe } = require('ramda');

const removeLineJumps = str => str.replace(/\n/g, " ");
const splitBySpaces = str => str.split(' ');

const get20kWords = () => {
    return pipe(
        removeLineJumps,
        splitBySpaces,
    )(wordsList);
};

module.exports = { get20kWords }